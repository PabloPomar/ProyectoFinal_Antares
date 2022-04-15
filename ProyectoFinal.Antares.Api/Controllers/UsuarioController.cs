using Microsoft.AspNetCore.Mvc;
using ProyectoFinal.Antares.Domain.Modelos;
using ProyectoFinal.Antares.Domain.Servicios;

namespace ProyectoFinal.Antares.Api.Controllers;

[Route("api/v1/Usuario")]
public class UsuarioController : BaseController<Usuario>
{
    private readonly IUsuarioService _usuarioService;

    public UsuarioController(IUsuarioService usuarioService) : base(usuarioService)
    {
        _usuarioService = usuarioService;
    }
    
    [HttpPost("validarUsuario")]
    public async Task<bool> ValidarUsuario(GetUsuarioRequest request)
    {
        return await _usuarioService.ValidarUsuario(request.Usuario, request.Contrasenia);
    }
    
    [HttpGet("nombre")]
    [Route("ValidarNombre")]
    public async Task<IActionResult> ValidarNombreUsuario(string nombre)
    {
        bool existe;

        existe = await _usuarioService.NombreUsuarioEnUso(nombre);
        
        return Ok(existe);
    }
    
    [HttpGet]
    [Route("deliveries")]
    public async Task<IActionResult> GetDeliveries()
    {
        var deliveries = await _usuarioService.GetDeliveries();
        
        return Ok(deliveries);
    }
    
    [HttpGet("mail")]
    [Route("ValidarMail")]
    public async Task<IActionResult> ValidarEmailUsuario(string email)
    {
        bool existe;

        existe = await _usuarioService.EmailEnUso(email);
        
        return Ok(existe);
    }
    
    [HttpPost("token")]
    public async Task<IActionResult> GenerarTokenDeUsuario(GetUsuarioRequest request)
    {
        var validUser = await _usuarioService.ValidarUsuario(request.Usuario, request.Contrasenia);

        if (!validUser)
            return Ok(false);

        var user = await _usuarioService.GetUsuario(request.Usuario, request.Contrasenia);
        
        if(user == null)
            return Ok(false);

        var token = _usuarioService.GenerateToken(user);

        return Ok(token);
    }
}
