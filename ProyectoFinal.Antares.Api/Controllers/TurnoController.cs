using Microsoft.AspNetCore.Mvc;
using ProyectoFinal.Antares.Domain.Modelos;
using ProyectoFinal.Antares.Domain.Servicios;

namespace ProyectoFinal.Antares.Api.Controllers;

[Route("api/v1/Turno")]
public class TurnoController : BaseController<Turno>
{
    public TurnoController(ITurnoService turnoService) : base(turnoService)
    {
    }
}