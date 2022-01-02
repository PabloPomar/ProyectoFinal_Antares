namespace ProyectoFinal.Antares.Domain.Modelos;

public class EmpleadoTurno : BaseModel
{
     public Empleado Empleado { get; set; } = null!;

     public Turno Turno { get; set; } = null!;

     public bool Activo { get; set; }
}