namespace ProyectoFinal.Antares.Domain.Models;

public class Mesa
{
    public int Id { get; set; }
    
    public string Descripcion { get; set; }
    
    public int IdMozo { get; set; }
    
    public bool Activo { get; set; }
    
    public int IdUbicacion { get; set; }
}