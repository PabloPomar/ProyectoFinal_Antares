using Microsoft.Extensions.Logging;
using ProyectoFinal.Antares.Domain.Modelos;
using ProyectoFinal.Antares.Domain.Repositories;

namespace ProyectoFinal.Antares.Domain.Servicios;

public class ReservaService : ReferenceService<Reserva>, IReservaService
{
    public ReservaService(IReservaRepository repository, IUnitOfWork unitOfWork, ILogger<Reserva> logger) : base(repository, unitOfWork, logger)
    { }
}