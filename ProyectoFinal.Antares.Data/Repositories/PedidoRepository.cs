using Microsoft.EntityFrameworkCore;
using ProyectoFinal.Antares.Domain.Enums;
using ProyectoFinal.Antares.Domain.Modelos;
using ProyectoFinal.Antares.Domain.Repositories;

namespace ProyectoFinal.Antares.Data.Repositories;

public class PedidoRepository : BaseRepository<Pedido>, IPedidoRepository
{
    private ApplicationDbContext _context;
    public PedidoRepository(ApplicationDbContext context) : base(context)
    {
        _context = context;
    }

    public override async Task<Pedido?> FindAsync(int id, bool asNoTracking = false)
    {
        return await _context.Set<Pedido>()
            .Include(x => x.Usuario)
            .Include(x => x.Delivery)
            .Include(x => x.ListaPedido).ThenInclude(y => y.Producto)
            .Where(x => x.Id == id)
            .FirstOrDefaultAsync();
    }

    public override async Task<IEnumerable<Pedido>> GetAllAsync()
    {
        return await _context.Set<Pedido>()
            .Include(x => x.Usuario)
            .Include(x => x.Delivery)
            .Include(x => x.ListaPedido).ThenInclude(y => y.Producto)
            .OrderByDescending(x => x.HoraPedido)
            .ToListAsync();
    }

    public new async Task AddAsync(Pedido pedido)
    {
        var pedidoEnCurso = await UserHasRequestInProgress(pedido.IdUsuario);

        if (pedidoEnCurso)
            throw new Exception("El usuario ya tiene un pedido en curso");
        
        pedido.HoraPedido = DateTime.Now;

        foreach (var item in pedido.ListaPedido)
        {
            var producto = await _context.Set<Producto>().FirstOrDefaultAsync(x => x.Id == item.IdProducto);

            if (producto == null)
                throw new Exception("El producto no existe");

            if (producto.Stock < item.Cantidad && producto.TipoProducto != TipoProducto.ServicioDelivery)
                throw new Exception("No hay stock suficiente");

            if (producto.TipoProducto != TipoProducto.ServicioDelivery)
                producto.Stock -= item.Cantidad;
        }

        if(pedido.ListaPedido.All(x => x.IdProducto != 6))
            await AgregarServicioDelivery(pedido);

        await _context.Set<Pedido>().AddAsync(pedido);

        await _context.SaveChangesAsync();
    }
    

    public async Task<bool> UserHasRequestInProgress(int userId)
    {
        var pedido = await _context.Set<Pedido>()
            .Include(x => x.Usuario)
            .Where(x => x.IdUsuario == userId && 
                        (x.EstadoPedido != EstadoPedido.Finalizado && x.EstadoPedido != EstadoPedido.Cancelado))
            .FirstOrDefaultAsync();

        return pedido != null;
    }
    
    public async Task CambiarEstadoPedido(int pedidoId)
    {
        var pedido = await _context.Set<Pedido>()
            .Include(x => x.Usuario)
            .Where(x => x.Id == pedidoId)
            .FirstOrDefaultAsync();

        if (pedido == null)
        {
            throw new HttpRequestException("El pedido no existe");
        }
        
        if (pedido.EstadoPedido == EstadoPedido.Finalizado)
        {
            throw new HttpRequestException("El pedido ya está finalizado");
        }

        switch (pedido.EstadoPedido)
        {
            case EstadoPedido.Creado:
                pedido.EstadoPedido = EstadoPedido.Pagado;
                break;
            case EstadoPedido.Pagado:
                pedido.EstadoPedido = EstadoPedido.Preparando;
                break;
            case EstadoPedido.Preparando:
                pedido.EstadoPedido = EstadoPedido.EnCamino;
                break;
            case EstadoPedido.EnCamino:
                pedido.EstadoPedido = EstadoPedido.Entregado;
                break;
            case EstadoPedido.Entregado:
                pedido.EstadoPedido = EstadoPedido.Finalizado;
                break;
        }
        
        await Context.SaveChangesAsync();
    }
    
    public async Task CambiarEstadoPedido(int pedidoId, int deliveryId)
    {
        var pedido = await Context.Set<Pedido>()
            .Include(x => x.Usuario)
            .Where(x => x.Id == pedidoId)
            .FirstOrDefaultAsync();

        if (pedido == null)
        {
            throw new HttpRequestException("El pedido no existe");
        }
        
        if (pedido.EstadoPedido == EstadoPedido.Finalizado)
        {
            throw new HttpRequestException("El pedido ya está finalizado");
        }
        
        var delivery = await Context.Set<Usuario>()
            .Where(x => x.Id == deliveryId)
            .Where(x => x.Tipo == TipoUsuario.Delivery)
            .FirstOrDefaultAsync();
        
        if (delivery == null)
        {
            throw new HttpRequestException("El delivery no existe");
        }

        switch (pedido.EstadoPedido)
        {
            case EstadoPedido.Creado:
                pedido.EstadoPedido = EstadoPedido.Pagado;
                break;
            case EstadoPedido.Pagado:
                pedido.EstadoPedido = EstadoPedido.Preparando;
                break;
            case EstadoPedido.Preparando:
                pedido.EstadoPedido = EstadoPedido.EnCamino;
                break;
            case EstadoPedido.EnCamino:
                pedido.EstadoPedido = EstadoPedido.Entregado;
                break;
            case EstadoPedido.Entregado:
                pedido.EstadoPedido = EstadoPedido.Finalizado;
                break;
        }

        if (pedido.EstadoPedido == EstadoPedido.EnCamino)
        {
            pedido.HoraEntrega = DateTime.Now;
        }

        pedido.Delivery = delivery;
        
        await Context.SaveChangesAsync();
    }
    
    public async Task CancelarPedido(int pedidoId)
    {
        var pedido = await Context.Set<Pedido>()
            .Include(x => x.Usuario)
            .Where(x => x.Id == pedidoId)
            .FirstOrDefaultAsync();
        
        if (pedido == null)
        {
            throw new HttpRequestException("El pedido no existe");
        }
        
        if (pedido.EstadoPedido == EstadoPedido.Finalizado)
        {
            throw new HttpRequestException("El pedido ya está finalizado");
        }

        pedido.EstadoPedido = EstadoPedido.Cancelado;

        await Context.SaveChangesAsync();
    }
    
    public async Task<EstadoPedido> GetEstadoPedidoAsync(int id)
    {
        var pedido = await Context.Set<Pedido>()
            .Where(x => x.Id == id)
            .FirstOrDefaultAsync();
        
        return pedido.EstadoPedido;
    }

    private async Task AgregarServicioDelivery(Pedido pedido)
    {
        var servicioDelivery = await GetServicioDeliveryAsync();
        
        if(servicioDelivery == null)
            throw new Exception("No hay servicio de delivery");
        
        var delivery = new PedidoProducto()
        {   IdPedido = pedido.Id,   
            IdProducto = servicioDelivery.Id,
            Cantidad = 1
        };
        
        pedido.ListaPedido.Add(delivery);
        
        pedido.PrecioTotal += servicioDelivery.Precio;
    }

    private async Task<Producto?> GetServicioDeliveryAsync()
    {
        return await _context.Set<Producto>()
            .Where(x => x.TipoProducto == TipoProducto.ServicioDelivery)
            .FirstOrDefaultAsync();
    }
}