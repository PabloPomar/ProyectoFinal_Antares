namespace ProyectoFinal.Antares.Domain.Modelos;

public class PedidoProducto : BaseModel
{
    public Producto Producto { get; set; } = null!;

    public int Cantidad { get; set; }
}