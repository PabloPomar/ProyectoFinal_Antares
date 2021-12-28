using System.Diagnostics.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ProyectoFinal.Antares.Domain.Models;

namespace ProyectoFinal.Antares.Data.Configuracion;

[ExcludeFromCodeCoverage]
public class EmpleadoTurnoConfiguracion : IEntityTypeConfiguration<EmpleadoTurno>
{
    public void Configure(EntityTypeBuilder<EmpleadoTurno> builder)
    {
        builder.HasKey(x => new { x.Id });
            
        builder.Property(x => x.IdEmpleado)
            .IsRequired();
        
        builder.Property(x => x.IdTurno)
            .IsRequired();
    }
}