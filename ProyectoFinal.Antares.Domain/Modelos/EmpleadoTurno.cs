namespace ProyectoFinal.Antares.Domain.Models;

public class EmpleadoTurno
{
     public int Id { get; set; }
     
     public int IdEmpleado { get; set; }
     
     public int IdTurno { get; set; }
     
     public bool Activo { get; set; }
}