using ProyectoFinal.Antares.Domain.Modelos;

namespace ProyectoFinal.Antares.Data.Repositories;

public class ProductoRepository : BaseRepository<Producto>
{
    public ProductoRepository(ApplicationDbContext context) : base(context)
    {
    }
}