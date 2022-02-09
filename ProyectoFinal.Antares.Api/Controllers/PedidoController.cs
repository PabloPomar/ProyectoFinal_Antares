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
 
    [HttpPost]
    [Route("CambiarEstado")]
    public async Task UserHasRequestInProgress(int pedidoId, EstadoPedido newState)
    {           
        await _pedidoService.CambiarEstadoPedido(pedidoId, newState);
    }
}