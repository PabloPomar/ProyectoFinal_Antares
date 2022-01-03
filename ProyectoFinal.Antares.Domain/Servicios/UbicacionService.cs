using Microsoft.Extensions.Logging;
using ProyectoFinal.Antares.Domain.Modelos;
using ProyectoFinal.Antares.Domain.Repositories;

namespace ProyectoFinal.Antares.Domain.Servicios;

public class UbicacionService : ReferenceService<Ubicacion>, IUbicacionService
{
    public UbicacionService(IUbicacionRepository repository, IUnitOfWork unitOfWork, ILogger<Ubicacion> logger) : base(repository, unitOfWork, logger)
    { }
}