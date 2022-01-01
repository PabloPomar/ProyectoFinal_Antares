namespace ProyectoFinal.Antares.Domain.Modelos;

public class Mesa : BaseModel
{
    public string Descripcion { get; set; }
    
    public bool Activo { get; set; }
    
    public int IdUbicacion { get; set; }
}