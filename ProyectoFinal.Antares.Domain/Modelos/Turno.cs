namespace ProyectoFinal.Antares.Domain.Modelos;

public class Turno : BaseModel
{
    public string Descripcion { get; set; } = null!;

    public int Dia { get; set; }
    
    public string HoraComienzo { get; set; } = null!;

    public string HoraFin { get; set; } = null!;

    public bool Activo { get; set; }
}