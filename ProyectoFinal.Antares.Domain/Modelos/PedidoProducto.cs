namespace ProyectoFinal.Antares.Domain.Modelos;

public class PedidoProducto : BaseModel
{
    public Usuario Usuario { get; set; }
    
    public Producto Producto { get; set; }
    
    public int Cantidad { get; set; }
}