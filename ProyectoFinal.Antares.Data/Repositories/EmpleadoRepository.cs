using ProyectoFinal.Antares.Domain.Modelos;

namespace ProyectoFinal.Antares.Data.Repositories;

public class EmpleadoRepository : BaseRepository<Empleado>
{
    public EmpleadoRepository(ApplicationDbContext context) : base(context)
    {
    }
}