using ProyectoFinal.Antares.Domain.Modelos;

namespace ProyectoFinal.Antares.Data.Repositories;

public class TurnoRepository : BaseRepository<Turno>
{
    public TurnoRepository(ApplicationDbContext context) : base(context)
    {
    }
}