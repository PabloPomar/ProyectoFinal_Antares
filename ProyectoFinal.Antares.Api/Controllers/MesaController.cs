using Microsoft.AspNetCore.Mvc;
using ProyectoFinal.Antares.Domain.Modelos;
using ProyectoFinal.Antares.Domain.Servicios;

namespace ProyectoFinal.Antares.Api.Controllers;

[Route("api/v1/Mesa")]
public class MesaController : BaseController<Mesa>
{
    public MesaController(IMesaService mesaService) : base(mesaService)
    {
    }
}