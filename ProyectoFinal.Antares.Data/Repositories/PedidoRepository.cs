using Microsoft.EntityFrameworkCore;
using ProyectoFinal.Antares.Domain.Enums;
using ProyectoFinal.Antares.Domain.Modelos;
using ProyectoFinal.Antares.Domain.Repositories;

namespace ProyectoFinal.Antares.Data.Repositories;

public class PedidoRepository : BaseRepository<Pedido>, IPedidoRepository
{
    public PedidoRepository(ApplicationDbContext context) : base(context)
    { }
    
    public new async Task AddAsync(Pedido pedido)
    {
        var pedidoEnCurso = await UserHasRequestInProgress(pedido.Usuario.Id);

        if (pedidoEnCurso)
            throw new Exception("El usuario ya tiene un pedido en curso");

        await Context.Set<Pedido>().AddAsync(pedido);
    }
    

    public async Task<bool> UserHasRequestInProgress(int userId)
    {
        var pedido = await Context.Set<Pedido>()
            .Include(x => x.Usuario)
            .Where(x => x.Usuario.Id == userId && x.EstadoPedido != EstadoPedido.Finalizado)
            .FirstOrDefaultAsync();

        return pedido != null;
    }
    
    public async Task CambiarEstadoPedido(int pedidoId, EstadoPedido newState)
    {
        var pedido = await Context.Set<Pedido>()
            .Include(x => x.Usuario)
            .Where(x => x.Id == pedidoId)
            .FirstOrDefaultAsync();

        if (pedido == null)
        {
            throw new HttpRequestException("El pedido no existe");
        }
        
        if (pedido.EstadoPedido == newState)
        {
            throw new HttpRequestException("El nuevo estado es el mismo que el anterior");
        }

        pedido.EstadoPedido = newState;
        
        await Context.SaveChangesAsync();
    }
    
    
}