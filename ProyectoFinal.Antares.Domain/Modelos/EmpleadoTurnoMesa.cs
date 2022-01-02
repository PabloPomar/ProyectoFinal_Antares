namespace ProyectoFinal.Antares.Domain.Modelos;

public class EmpleadoTurnoMesa : BaseModel
{
    public EmpleadoTurno EmpleadoTurno { get; set; } = null!;

    public Mesa Mesa { get; set; } = null!;

    public bool Activo { get; set; }
}