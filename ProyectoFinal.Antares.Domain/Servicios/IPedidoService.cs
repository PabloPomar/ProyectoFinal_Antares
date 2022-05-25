using ProyectoFinal.Antares.Domain.Enums;
using ProyectoFinal.Antares.Domain.Modelos;

namespace ProyectoFinal.Antares.Domain.Servicios;

public interface IPedidoService : IReferenceService<Pedido>
{
    new Task SaveAsync(Pedido pedido);

    Task<bool> UserHasRequestInProgress(int userId);

    Task CambiarEstadoPedido(int pedidoId);

    Task CambiarEstadoPedido(int pedidoId, int deliveryId);

    Task CancelarPedido(int pedidoId);

    Task<EstadoPedido> GetEstadoPedidoAsync(int id);
}