using ProyectoFinal.Antares.Domain.Modelos;

namespace ProyectoFinal.Antares.Data.Repositories;

public class ReservaRepository : BaseRepository<Reserva>
{
    public ReservaRepository(ApplicationDbContext context) : base(context)
    {
    }
}