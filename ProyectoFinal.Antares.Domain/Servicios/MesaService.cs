using Microsoft.Extensions.Logging;
using ProyectoFinal.Antares.Domain.Modelos;
using ProyectoFinal.Antares.Domain.Repositories;

namespace ProyectoFinal.Antares.Domain.Servicios;

public class MesaService : ReferenceService<Mesa>, IMesaService
{
    public MesaService(IMesaRepository repository, IUnitOfWork unitOfWork, ILogger<Mesa> logger) : base(repository, unitOfWork, logger)
    { }
}