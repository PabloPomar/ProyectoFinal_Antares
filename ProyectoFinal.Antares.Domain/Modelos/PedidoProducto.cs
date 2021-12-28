namespace ProyectoFinal.Antares.Domain.Models;

public class PedidoProducto
{
    public int Id { get; set; }
    
    public int IdUsuario { get; set; }
    
    public bool Activo { get; set; }
    
    public string Nota { get; set; }
}