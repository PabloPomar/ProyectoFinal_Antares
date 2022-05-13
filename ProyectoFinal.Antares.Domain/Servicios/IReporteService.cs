using ProyectoFinal.Antares.Domain.Modelos.Informes;

namespace ProyectoFinal.Antares.Domain.Servicios;

public interface IReporteService
{
    Task<List<VentasDto>> GetReporteVentas();

    Task<List<PedidosClientesDto>> GetReportePedidoClientes();

    Task<List<DeliveriesDto>> GetReporteDeliveries();
}