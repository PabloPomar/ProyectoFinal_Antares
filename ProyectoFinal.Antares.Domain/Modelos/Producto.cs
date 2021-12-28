namespace ProyectoFinal.Antares.Domain.Models;

public class Producto
{
    public int Id { get; set; }
    
    public string Descripcion { get; set; }
    
    public int Stock { get; set; }
    
    public bool Activo { get; set; }
    
    public string Nota { get; set; }
}