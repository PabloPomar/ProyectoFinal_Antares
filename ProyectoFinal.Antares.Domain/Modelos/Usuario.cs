using ProyectoFinal.Antares.Domain.Enums;

namespace ProyectoFinal.Antares.Domain.Models;

public class Usuario
{
    public int Id { get; set; }
    
    public string NombreUsuario { get; set; }
    
    public TipoUsuario Tipo { get; set; }
    
    public int Dni { get; set; }
    
    public string Mail { get; set; }
    
    public string Telefono { get; set; }
}