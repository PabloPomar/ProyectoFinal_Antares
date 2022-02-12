namespace ProyectoFinal.Antares.Domain.Modelos;

public class Producto : BaseModel
{
    public string Descripcion { get; set; } = null!;

    public int Stock { get; set; }
    
    public bool Activo { get; set; }
    
    public string Nota { get; set; } = null!;

    public ImagenProducto Imagen { get; set; } = null!;
    
    public decimal Precio { get; set; }
}