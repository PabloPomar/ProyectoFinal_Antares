namespace ProyectoFinal.Antares.Domain.Modelos;

public class Producto : BaseModel
{
    public string Descripcion { get; set; }
    
    public int Stock { get; set; }
    
    public bool Activo { get; set; }
    
    public string Nota { get; set; }
    
    public ImagenProducto Imagen { get; set; }
}