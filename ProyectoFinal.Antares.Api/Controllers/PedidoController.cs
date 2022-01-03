using Microsoft.AspNetCore.Mvc;
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
}