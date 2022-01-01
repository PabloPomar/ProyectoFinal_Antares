using ProyectoFinal.Antares.Domain.Enums;

namespace ProyectoFinal.Antares.Domain.Modelos;

public class Usuario : BaseModel
{
    public string NombreUsuario { get; set; }
    
    public TipoUsuario Tipo { get; set; }
    
    public int Dni { get; set; }
    
    public string Mail { get; set; }
    
    public string Telefono { get; set; }
}