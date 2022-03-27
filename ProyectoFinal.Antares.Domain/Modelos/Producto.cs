using ProyectoFinal.Antares.Domain.Enums;

namespace ProyectoFinal.Antares.Domain.Modelos;

public class Producto : BaseModel
{
    public string Nombre { get; set; } 
    
    public string Subtitulo { get; set; }

    public string Descripcion { get; set; }

    public int Stock { get; set; }
    
    public bool Activo { get; set; }
    
    public string Nota { get; set; }
    public ImagenProducto Imagen { get; set; }

    public decimal Precio { get; set; }
    
    public decimal? PorcentageAlcohol { get; set; }
    
    public TipoProducto TipoProducto { get; set; }
}