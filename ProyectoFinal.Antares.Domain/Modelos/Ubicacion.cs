namespace ProyectoFinal.Antares.Domain.Modelos;

public class Ubicacion : BaseModel
{
    public string Descripcion { get; set; } = null!;

    public decimal Superficie { get; set; }
    
    public bool Activo { get; set; }
    
    public string Nota { get; set; } = null!;
}