using ProyectoFinal.Antares.Domain.Enums;

namespace ProyectoFinal.Antares.Domain.Modelos;

public class Pedido : BaseModel
{
    public int IdUsuario { get; set; }
    
    public int? IdDelivery { get; set; }
    
    public virtual Usuario? Usuario { get; set; }

    public EstadoPedido EstadoPedido { get; set; }

    public List<PedidoProducto> ListaPedido { get; set; } 
    public virtual Usuario? Delivery { get; set; }
    
    public DateTime? HoraPedido { get; set; }
    
    public DateTime? HoraEntrega { get; set; }

    public decimal PrecioTotal { get; set; }

    public string Nota { get; set; } = null!;
}