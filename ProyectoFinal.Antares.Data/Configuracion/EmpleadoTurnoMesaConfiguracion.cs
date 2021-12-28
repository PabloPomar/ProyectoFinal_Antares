using System.Diagnostics.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ProyectoFinal.Antares.Domain.Models;

namespace ProyectoFinal.Antares.Data.Configuracion;

[ExcludeFromCodeCoverage]
public class EmpleadoTurnoMesaConfiguracion : IEntityTypeConfiguration<EmpleadoTurnoMesa>
{
    public void Configure(EntityTypeBuilder<EmpleadoTurnoMesa> builder)
    {
        builder.HasKey(x => new { x.Id });
            
        builder.Property(x => x.IdEmpleado)
            .IsRequired();
        
        builder.Property(x => x.IdTurno)
            .IsRequired();
        
        builder.Property(x => x.IdMesa)
            .IsRequired();
    }
}