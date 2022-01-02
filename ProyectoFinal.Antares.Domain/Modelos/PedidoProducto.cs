namespace ProyectoFinal.Antares.Domain.Modelos;

public class PedidoProducto : BaseModel
{
    public Usuario Usuario { get; set; } = null!;

    public Producto Producto { get; set; } = null!;

    public int Cantidad { get; set; }
}