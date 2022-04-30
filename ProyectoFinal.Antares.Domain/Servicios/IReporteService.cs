using ProyectoFinal.Antares.Domain.Modelos.Informes;

namespace ProyectoFinal.Antares.Domain.Servicios;

public interface IReporteService
{
    Task<List<VentasDto>> TestReporteVentas();

    Task<List<PedidosClientesDto>> TestPedidoClientes();

    Task<List<DeliveriesDto>> TestDeliveries();
}