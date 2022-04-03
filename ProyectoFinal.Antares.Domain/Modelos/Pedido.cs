using ProyectoFinal.Antares.Domain.Enums;

namespace ProyectoFinal.Antares.Domain.Modelos;

public class Pedido : BaseModel
{
    public Usuario Usuario { get; set; } = null!;

    public EstadoPedido EstadoPedido { get; set; }

    public List<PedidoProducto> ListaPedido { get; set; } = null!;
    
    public Usuario? Delivery { get; set; } = null!;

    public decimal PrecioTotal { get; set; }

    public string Nota { get; set; } = null!;
}