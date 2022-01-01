using ProyectoFinal.Antares.Domain.Modelos;

namespace ProyectoFinal.Antares.Data.Repositories;

public class PedidoRepository : BaseRepository<Pedido>
{
    public PedidoRepository(ApplicationDbContext context) : base(context)
    {
    }
}