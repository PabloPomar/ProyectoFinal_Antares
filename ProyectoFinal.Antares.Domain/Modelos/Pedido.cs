namespace ProyectoFinal.Antares.Domain.Modelos;

public class Pedido : BaseModel
{
    public Usuario Usuario { get; set; }
    
    public bool Activo { get; set; }
    
    public string Nota { get; set; }
}