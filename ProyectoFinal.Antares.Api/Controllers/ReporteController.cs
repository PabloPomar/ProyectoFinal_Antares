using Microsoft.AspNetCore.Mvc;
using ProyectoFinal.Antares.Domain.Servicios;

namespace ProyectoFinal.Antares.Api.Controllers;

[Route("api/v1/Reporte")]
public class ReporteController : ControllerBase
{
    private readonly IReporteService _reporteService;

    public ReporteController(IReporteService reporteService)
    {
        _reporteService = reporteService;
    }
    
    [HttpGet]
    [Route("ventas")]
    public async Task<IActionResult> GetVentasReporte()
    {
        var reporte = await _reporteService.GetReporteVentas();

        return Ok(reporte);
    }
    
    [HttpGet]
    [Route("deliveries")]
    public async Task<IActionResult> GetDeliveriesReporte()
    {
        var reporte = await _reporteService.GetReporteDeliveries();

        return Ok(reporte);
    }
    
    [HttpGet]
    [Route("clientes")]
    public async Task<IActionResult> GetClientesReporte()
    {
        var reporte = await _reporteService.GetReportePedidoClientes();

        return Ok(reporte);
    }
}