using Microsoft.Extensions.Logging;
using ProyectoFinal.Antares.Domain.Modelos;
using ProyectoFinal.Antares.Domain.Repositories;

namespace ProyectoFinal.Antares.Domain.Servicios;

public class EmpleadoService : ReferenceService<Empleado>, IEmpleadoService
{
    public EmpleadoService(IEmpleadoRepository repository, IUnitOfWork unitOfWork, ILogger<Empleado> logger) : base(repository, unitOfWork, logger)
    { }
}