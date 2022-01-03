﻿using Microsoft.AspNetCore.Mvc;
using ProyectoFinal.Antares.Domain.Modelos;
using ProyectoFinal.Antares.Domain.Servicios;

namespace ProyectoFinal.Antares.Api.Controllers;

[Route("api/v1/Reserva")]
public class ReservaController : BaseController<Reserva>
{
    private readonly IReservaService _reservaService;

    public ReservaController(IReservaService reservaService) : base(reservaService)
    {
        _reservaService = reservaService;
    }
}