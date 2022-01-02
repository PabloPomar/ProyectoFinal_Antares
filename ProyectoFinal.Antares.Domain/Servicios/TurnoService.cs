using Microsoft.Extensions.Logging;
using ProyectoFinal.Antares.Domain.Modelos;
using ProyectoFinal.Antares.Domain.Repositories;

namespace ProyectoFinal.Antares.Domain.Servicios;

public class TurnoService : ReferenceService<Turno>, ITurnoService
{
    public TurnoService(ITurnoRepository repository, IUnitOfWork unitOfWork, ILogger<Turno> logger) : base(repository, unitOfWork, logger)
    { }
}