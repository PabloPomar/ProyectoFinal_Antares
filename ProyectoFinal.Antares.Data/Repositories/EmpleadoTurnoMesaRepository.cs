using ProyectoFinal.Antares.Domain.Modelos;

namespace ProyectoFinal.Antares.Data.Repositories;

public class EmpleadoTurnoMesaRepository : BaseRepository<EmpleadoTurnoMesa>
{
    public EmpleadoTurnoMesaRepository(ApplicationDbContext context) : base(context)
    {
    }
}