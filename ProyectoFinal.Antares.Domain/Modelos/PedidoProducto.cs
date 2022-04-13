using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace ProyectoFinal.Antares.Domain.Modelos;

public class PedidoProducto : BaseModel
{
    public virtual Producto? Producto { get; set; }
    
    [JsonIgnore] 
    [IgnoreDataMember] 
    public virtual Pedido? Pedido { get; set; }
    
    public int IdPedido { get; set; }
    
    public int IdProducto { get; set; }

    public int Cantidad { get; set; }
}