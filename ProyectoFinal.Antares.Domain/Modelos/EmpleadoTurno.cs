namespace ProyectoFinal.Antares.Domain.Modelos;

public class EmpleadoTurno : BaseModel
{
     public Empleado Empleado { get; set; }
     
     public Turno Turno { get; set; }
     
     public bool Activo { get; set; }
}