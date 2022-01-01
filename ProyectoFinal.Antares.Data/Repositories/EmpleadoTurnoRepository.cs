using ProyectoFinal.Antares.Domain.Modelos;

namespace ProyectoFinal.Antares.Data.Repositories;

public class EmpleadoTurnoRepository : BaseRepository<EmpleadoTurno>
{
    public EmpleadoTurnoRepository(ApplicationDbContext context) : base(context)
    {
    }
}