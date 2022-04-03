using Microsoft.Extensions.Logging;
using ProyectoFinal.Antares.Domain.Modelos;
using ProyectoFinal.Antares.Domain.Repositories;

namespace ProyectoFinal.Antares.Domain.Servicios;

public class PedidoService : ReferenceService<Pedido>, IPedidoService
{
    private readonly IPedidoRepository _repository;
    
    public PedidoService(IPedidoRepository repository, IUnitOfWork unitOfWork, ILogger<Pedido> logger) : base(repository, unitOfWork, logger)
    {
        _repository = repository;
    }
    
    public override async Task SaveAsync(Pedido pedido)
    {
        await _repository.AddAsync(pedido);
    }

    public async Task<bool> UserHasRequestInProgress(int userId)
    {
        return await _repository.UserHasRequestInProgress(userId);
    }
    
    public async Task CambiarEstadoPedido(int pedidoId)
    {
        await _repository.CambiarEstadoPedido(pedidoId);
    }

    public async Task CambiarEstadoPedido(int pedidoId, int deliveryId)
    {
        await _repository.CambiarEstadoPedido(pedidoId, deliveryId);
    }
    
    public async Task CancelarPedido(int pedidoId)
    {
        await _repository.CancelarPedido(pedidoId);
    }
}
