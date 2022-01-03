using Microsoft.Extensions.Logging;
using ProyectoFinal.Antares.Domain.Modelos;
using ProyectoFinal.Antares.Domain.Repositories;

namespace ProyectoFinal.Antares.Domain.Servicios;

public class PedidoService : ReferenceService<Pedido>, IPedidoService
{
    public PedidoService(IPedidoRepository repository, IUnitOfWork unitOfWork, ILogger<Pedido> logger) : base(repository, unitOfWork, logger)
    { }
}