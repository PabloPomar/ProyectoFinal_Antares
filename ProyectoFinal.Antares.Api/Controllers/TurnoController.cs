using Microsoft.AspNetCore.Mvc;
using ProyectoFinal.Antares.Domain.Modelos;
using ProyectoFinal.Antares.Domain.Servicios;

namespace ProyectoFinal.Antares.Api.Controllers;

[Route("api/v1/Turno")]
public class TurnoController : ControllerBase
{
    private readonly ITurnoService _turnoService;
    
    public TurnoController(ITurnoService turnoService)
    {
        _turnoService = turnoService;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        if (id <= 0)
            return BadRequest();

        var data = await _turnoService.FindAsync(id);

        if (data.Id == 0)
            return NotFound();
        
        return Ok(data);
    }
    
    [HttpPost]
    public async Task<IActionResult> Post([FromBody] Turno turno)
    {
        try
        {
            await _turnoService.SaveAsync(turno);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex);
        }
        
        return Ok(turno);
    }
}