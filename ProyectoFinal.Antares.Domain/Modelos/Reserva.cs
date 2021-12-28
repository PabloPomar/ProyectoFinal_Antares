namespace ProyectoFinal.Antares.Domain.Models;

public class Reserva
{
    public int Id { get; set; }
    
    public int IdUsuario { get; set; }
    
    public int IdMesa { get; set; }
    
    public int CantidadComensales { get; set; }
    
    public string Hora { get; set; }
    
    public string Clave { get; set; }
}