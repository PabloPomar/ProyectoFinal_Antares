namespace ProyectoFinal.Antares.Domain.Modelos;

public class Pedido : BaseModel
{
    public Usuario Usuario { get; set; } = null!;

    public bool Activo { get; set; }
    
    public string Nota { get; set; } = null!;
}