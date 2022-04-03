using ProyectoFinal.Antares.Domain.Modelos;

namespace ProyectoFinal.Antares.Domain.Repositories;

public interface IPedidoRepository : IBaseRepository<Pedido>
{
    new Task AddAsync(Pedido pedido);
    
    Task<bool> UserHasRequestInProgress(int userId);
    
    Task CambiarEstadoPedido(int pedidoId);

    Task CambiarEstadoPedido(int pedidoId, int deliveryId);

    Task CancelarPedido(int pedidoId);
}