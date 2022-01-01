using System.Diagnostics.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ProyectoFinal.Antares.Domain.Modelos;

namespace ProyectoFinal.Antares.Data.Configuracion;

[ExcludeFromCodeCoverage]
public class EmpleadoTurnoMesaConfiguracion : IEntityTypeConfiguration<EmpleadoTurnoMesa>
{
    public void Configure(EntityTypeBuilder<EmpleadoTurnoMesa> builder)
    {
        builder.HasKey(x => new { x.Id });
            
        builder.HasOne(x => x.EmpleadoTurno);
        
        builder.HasOne(x => x.Mesa);
    }
}