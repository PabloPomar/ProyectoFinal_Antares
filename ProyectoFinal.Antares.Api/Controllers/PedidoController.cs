using Microsoft.AspNetCore.Mvc;
using ProyectoFinal.Antares.Domain.Enums;
using ProyectoFinal.Antares.Domain.Modelos;
using ProyectoFinal.Antares.Domain.Servicios;

namespace ProyectoFinal.Antares.Api.Controllers;

[Route("api/v1/Pedido")]
public class PedidoController : BaseController<Pedido>
{
    private readonly IPedidoService _pedidoService;

    public PedidoController(IPedidoService pedidoService) : base(pedidoService)
    {
        _pedidoService = pedidoService;
    }

    [HttpPost]
    [Route("CrearPedido")]
    public new async Task<Pedido> CreateAsync(Pedido pedido)
    {
        await _pedidoService.SaveAsync(pedido);
        return pedido;
    }
    
    [HttpGet]
    [Route("PedidoEnCurso")]
    public async Task<bool> UserHasRequestInProgress(int userId)
    {           
        return await _pedidoService.UserHasRequestInProgress(userId);
    }
 
    [HttpPut]
    [Route("CambiarEstado")]
    public async Task EvolucionarPedido(int pedidoId, int? deliveryId = null)
    {
        if (deliveryId != null)
        {
            await _pedidoService.CambiarEstadoPedido(pedidoId, deliveryId.Value);
        }
        else
        {
            await _pedidoService.CambiarEstadoPedido(pedidoId);
        }
    }
    
    [HttpPost]
    [Route("CancelarPedido")]
    public async Task CancelarPedido([FromBody] int pedidoId)
    {
        await _pedidoService.CancelarPedido(pedidoId);
    }
    
    [HttpGet("id")]
    [Route("unPedido")]
    public async Task<Pedido> GetItemMenu(int id)
    {
        return await _pedidoService.FindAsync(id);
    }
    
    [HttpGet("idPedido")]
    [Route("getEstado")]
    public async Task<EstadoPedido> GetEstadoPedido(int idPedido)
    {   
        return await _pedidoService.GetEstadoPedidoAsync(idPedido);
    }
}