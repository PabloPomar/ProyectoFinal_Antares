using ProyectoFinal.Antares.Domain.Modelos;

namespace ProyectoFinal.Antares.Data.Repositories;

public class PedidoProductoRepository : BaseRepository<PedidoProducto>
{
    public PedidoProductoRepository(ApplicationDbContext context) : base(context)
    {
    }
}