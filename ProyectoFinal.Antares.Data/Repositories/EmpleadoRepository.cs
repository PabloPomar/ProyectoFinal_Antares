using ProyectoFinal.Antares.Domain.Modelos;
using ProyectoFinal.Antares.Domain.Repositories;

namespace ProyectoFinal.Antares.Data.Repositories;

public class EmpleadoRepository : BaseRepository<Empleado>, IEmpleadoRepository
{
    public EmpleadoRepository(ApplicationDbContext context) : base(context)
    {
    }
}