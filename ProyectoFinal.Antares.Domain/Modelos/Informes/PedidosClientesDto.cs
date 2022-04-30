using System.Text.Json.Serialization;

namespace ProyectoFinal.Antares.Domain.Modelos.Informes;

public class PedidosClientesDto
{
    [JsonPropertyName("SalesYear")]
    public int SalesYear { get; set; }
    
    [JsonPropertyName("SalesMonth")]
    public int SalesMonth { get; set; }

    [JsonPropertyName("IdUsuario")]
    public int IdUsuario { get; set; }

    [JsonPropertyName("Nombre")]
    public string Nombre { get; set; }
    
    [JsonPropertyName("Completadas")]
    public int Completadas { get; set; }
    
    [JsonPropertyName("Canceladas")]
    public int Canceladas { get; set; }
}