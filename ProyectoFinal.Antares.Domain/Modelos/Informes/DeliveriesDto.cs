using System.Text.Json.Serialization;

namespace ProyectoFinal.Antares.Domain.Modelos.Informes;

public class DeliveriesDto
{
    [JsonPropertyName("SalesYear")]
    public int SalesYear { get; set; }
    
    [JsonPropertyName("SalesMonth")]
    public int SalesMonth { get; set; }
    
    [JsonPropertyName("IdDelivery")]
    public int IdDelivery { get; set; }

    [JsonPropertyName("Nombre")]
    public string Nombre { get; set; }

    [JsonPropertyName("Completadas")]
    public int Completadas { get; set; }
    
    [JsonPropertyName("NoCompletadas")]
    public int NoCompletadas { get; set; }
}