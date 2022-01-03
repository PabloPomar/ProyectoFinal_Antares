﻿using Microsoft.AspNetCore.Mvc;
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
}