namespace ProyectoFinal.Antares.Domain.Models;

public class Turno
{
    public int Id { get; set; }
    
    public string Descripcion { get; set; }

    public int Dia { get; set; }
    
    public string HoraComienzo { get; set; }
    
    public string HoraFin { get; set; }
    
    public bool Activo { get; set; }
}