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
    
    [HttpPost("token")]
    public async Task<IActionResult> GenerarTokenDeUsuario(GetUsuarioRequest request)
    {
        var validUser = await _usuarioService.ValidarUsuario(request.Usuario, request.Contrasenia);

        if (!validUser)
            return NotFound();

        var user = await _usuarioService.GetUsuario(request.Usuario, request.Contrasenia);
        
        if(user == null)
            return NotFound();

        var token = _usuarioService.GenerateToken(user);

        return Ok(token);
    }
}
