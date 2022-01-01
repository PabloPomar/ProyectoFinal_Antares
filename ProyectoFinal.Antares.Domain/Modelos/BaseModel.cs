using System.Diagnostics.CodeAnalysis;

namespace ProyectoFinal.Antares.Domain.Modelos;

[ExcludeFromCodeCoverage]
public abstract class BaseModel
{
    public int Id { get; set; }
}