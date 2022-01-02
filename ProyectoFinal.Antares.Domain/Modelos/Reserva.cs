namespace ProyectoFinal.Antares.Domain.Modelos;

public class Reserva : BaseModel
{
    public Usuario Usuario { get; set; } = null!;

    public Mesa Mesa { get; set; } = null!;

    public int CantidadComensales { get; set; }
    
    public string Hora { get; set; } = null!;

    public string Clave { get; set; } = null!;
}