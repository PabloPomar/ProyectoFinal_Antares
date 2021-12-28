namespace ProyectoFinal.Antares.Domain.Models;

public class Ubicacion
{
    public int Id { get; set; }
    
    public string Descripcion { get; set; }
    
    public decimal Superficie { get; set; }
    
    public bool Activo { get; set; }
    
    public string Nota { get; set; }
}