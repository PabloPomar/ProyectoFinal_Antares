using ProyectoFinal.Antares.Domain.Enums;

namespace ProyectoFinal.Antares.Domain.Models;

public class Empleado
{
    public int Id { get; set; }
    
    public string Nombre { get; set; }
    
    public string Dni { get; set; }
    
    public bool Activo { get; set; }
    
    public TipoEmpleado Tipo { get; set; }
}