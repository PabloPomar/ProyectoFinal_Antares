using ProyectoFinal.Antares.Domain.Modelos;
using ProyectoFinal.Antares.Domain.Repositories;

namespace ProyectoFinal.Antares.Data.Repositories;

public class ReservaRepository : BaseRepository<Reserva>, IReservaRepository
{
    public ReservaRepository(ApplicationDbContext context) : base(context)
    {
    }
}