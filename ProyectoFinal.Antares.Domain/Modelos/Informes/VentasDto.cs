using System.Text.Json.Serialization;

namespace ProyectoFinal.Antares.Domain.Modelos.Informes;

public class VentasDto
{
    [JsonPropertyName("SalesYear")]
    public int SalesYear { get; set; }
    
    [JsonPropertyName("SalesMonth")]
    public int SalesMonth { get; set; }
    
    [JsonPropertyName("TotalSales")]
    public double TotalSales { get; set; }
    
    [JsonPropertyName("Completadas")]
    public int Completadas { get; set; }
    
    [JsonPropertyName("NoCompletadas")]
    public int NoCompletadas { get; set; }
}