namespace ProyectoFinal.Antares.Domain.Modelos;

public class PedidoProducto : BaseModel
{
    public virtual Producto? Producto { get; set; }
    
    public int IdProducto { get; set; }

    public int Cantidad { get; set; }
}