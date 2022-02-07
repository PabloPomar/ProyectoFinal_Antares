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
    
    [HttpGet]
    [Route("Menu")]
    public async Task<IList<Producto>> GetMenu()
    {
        return await _productoService.GetMenu();
    }
    
    [HttpGet("id")]
    [Route("ItemMenu")]
    public async Task<Producto> GetItemMenu(int id)
    {
        return await _productoService.GetProductoConImagen(id);
    }
}