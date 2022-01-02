using Microsoft.Extensions.Logging;
using ProyectoFinal.Antares.Domain.Modelos;
using ProyectoFinal.Antares.Domain.Repositories;

namespace ProyectoFinal.Antares.Domain.Servicios;

public class TurnoService : ReferenceService<Turno>, ITurnoService
{
    private readonly ITurnoRepository _repository;
    private readonly ILogger<Turno> _logger;

    public TurnoService(ITurnoRepository repository, IUnitOfWork unitOfWork, ILogger<Turno> logger) : base(repository, unitOfWork, logger)
    {
        _repository = repository;
        _logger = logger;
    }
}