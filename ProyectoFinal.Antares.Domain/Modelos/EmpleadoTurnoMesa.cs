namespace ProyectoFinal.Antares.Domain.Modelos;

public class EmpleadoTurnoMesa : BaseModel
{
    public EmpleadoTurno EmpleadoTurno { get; set; }
    
    public Mesa Mesa { get; set; }
    
    public bool Activo { get; set; }
}