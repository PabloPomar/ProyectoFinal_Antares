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
}