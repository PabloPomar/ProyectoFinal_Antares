namespace ProyectoFinal.Antares.Domain.Modelos;

public class Turno : BaseModel
{
    public string Descripcion { get; set; }

    public int Dia { get; set; }
    
    public string HoraComienzo { get; set; }
    
    public string HoraFin { get; set; }
    
    public bool Activo { get; set; }
}