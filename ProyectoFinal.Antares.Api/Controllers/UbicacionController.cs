using Microsoft.AspNetCore.Mvc;
using ProyectoFinal.Antares.Domain.Modelos;
using ProyectoFinal.Antares.Domain.Servicios;

namespace ProyectoFinal.Antares.Api.Controllers;

[Route("api/v1/Ubicacion")]
public class UbicacionController : BaseController<Ubicacion>
{
    public UbicacionController(IUbicacionService ubicacionService) : base(ubicacionService)
    {
    }
}