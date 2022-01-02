using ProyectoFinal.Antares.Domain.Enums;

namespace ProyectoFinal.Antares.Domain.Modelos;

public class Empleado : BaseModel
{
    public string Nombre { get; set; } = null!;

    public string Dni { get; set; } = null!;

    public bool Activo { get; set; }
    
    public TipoEmpleado Tipo { get; set; }
}