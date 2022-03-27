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
    
    [HttpGet("nombre")]
    [Route("ValidarNombre")]
    public async Task<IActionResult> ValidarNombreProducto(string nombre, string? nombreActual = null)
    {
        nombre = nombre.Trim();
        nombre = nombre.ToLower();
        bool existe;

        if (nombreActual == null)
        {
            existe = await _productoService.ValidarProducto(nombre);
            return Ok(existe);
        }
        
        nombreActual = nombreActual.Trim();
        nombreActual = nombreActual.ToLower();

        existe = await _productoService.ValidarProducto(nombre, nombreActual);
        return Ok(existe);
    }

    [HttpGet("id")]
    [Route("ItemMenu")]
    public async Task<Producto> GetItemMenu(int id)
    {
        return await _productoService.GetProductoConImagen(id);
    }

    [HttpDelete("id")]
    [Route("DeleteProducto")]
    public async Task DeleteProducto(int id)
    { 
        await _productoService.DesactivarProducto(id);
    }

}