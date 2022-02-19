using Microsoft.AspNetCore.Mvc;
using ProyectoFinal.Antares.Domain.Modelos;
using ProyectoFinal.Antares.Domain.Servicios;

namespace ProyectoFinal.Antares.Api.Controllers;

[Route("api/v1/Empleado")]
public class EmpleadoController : BaseController<Empleado>
{
    public EmpleadoController(IEmpleadoService empleadoService) : base(empleadoService)
    {
    }
}