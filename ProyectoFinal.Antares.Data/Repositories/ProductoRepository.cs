using Microsoft.EntityFrameworkCore;
using ProyectoFinal.Antares.Domain.Modelos;
using ProyectoFinal.Antares.Domain.Repositories;

namespace ProyectoFinal.Antares.Data.Repositories;

public class ProductoRepository : BaseRepository<Producto>, IProductoRepository
{
    public ProductoRepository(ApplicationDbContext context) : base(context)
    {
    }

    public Task<IQueryable<Producto>> GetMenu()
    {
        return Task.FromResult(Context.Set<Producto>()
            .Include(x => x.Imagen).AsQueryable());
    }
    
    public async Task<Producto?> GetProductoConImagen(int id)
    {
         return await Context.Set<Producto>()
            .Include(x => x.Imagen)
            .Where(x => x.Id == id).FirstOrDefaultAsync();
    }
    
    public async Task<bool> ValidarNombreProducto(string nombre, string? nombreActual = null)
    {
        if (nombreActual == null)
        {
            var producto = await Context.Set<Producto>()
                .Where(x => x.Nombre.ToLower() == nombre).FirstOrDefaultAsync();

            return producto != null;
        }
        else
        {
            var producto = await Context.Set<Producto>()
                .Where(x => x.Nombre.ToLower() == nombre).FirstOrDefaultAsync();

            if (producto?.Nombre.ToLower() == nombreActual)
                return false;
            
            return producto != null;
        }
    }
    
    public async Task DesactivarProducto(int id)
    {
        var producto = await Context.Set<Producto>()
            .Where(x => x.Id == id).FirstOrDefaultAsync();

        if(producto != null)
            producto.Activo = !producto.Activo;
    }
}