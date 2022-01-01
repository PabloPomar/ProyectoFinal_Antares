namespace ProyectoFinal.Antares.Domain.Modelos;

public class Reserva : BaseModel
{
    public Usuario Usuario { get; set; }
    
    public Mesa Mesa { get; set; }
    
    public int CantidadComensales { get; set; }
    
    public string Hora { get; set; }
    
    public string Clave { get; set; }
}