using ProyectoFinal.Antares.Domain.Enums;

namespace ProyectoFinal.Antares.Domain.Modelos;

public class Usuario : BaseModel
{
    public string NombreUsuario { get; set; } = null!;
    
    public string Password { get; set; } = null!;

    public TipoUsuario Tipo { get; set; }
    
    public int Dni { get; set; }
    
    public string Direccion { get; set; } = null!;
    
    public string Mail { get; set; } = null!;

    public string Telefono { get; set; } = null!;
}