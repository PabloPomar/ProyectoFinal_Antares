using Microsoft.AspNetCore.Mvc;
using ProyectoFinal.Antares.Domain.Modelos;
using ProyectoFinal.Antares.Domain.Servicios;

namespace ProyectoFinal.Antares.Api.Controllers;

[Route("api/v1/Producto")]
public class ProductoController : BaseController<Producto>
{
    private readonly IProductoService _productoService;

    public ProductoController(IProductoService productoService) : base(productoService)
    {
        _productoService = productoService;
    }
}