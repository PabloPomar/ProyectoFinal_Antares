namespace ProyectoFinal.Antares.Domain.Models;

public class Usuario
{
    public int Id { get; set; }
    
    public string NombreUsuario { get; set; }
    
    public int Tipo { get; set; }
    
    public int Dni { get; set; }
    
    public string Mail { get; set; }
    
    public string Telefono { get; set; }
}