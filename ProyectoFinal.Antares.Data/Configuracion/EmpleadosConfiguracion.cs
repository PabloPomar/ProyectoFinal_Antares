using System.Diagnostics.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ProyectoFinal.Antares.Domain.Models;

namespace ProyectoFinal.Antares.Data.Configuracion;

[ExcludeFromCodeCoverage]
public class EmpleadosConfiguracion : IEntityTypeConfiguration<Empleado>
{
    public void Configure(EntityTypeBuilder<Empleado> builder)
    {
        builder.HasKey(x => new { x.Id });
            
        builder.Property(x => x.Nombre)
            .HasMaxLength(120);
        
        builder.Property(x => x.Dni)
            .HasMaxLength(12);
    }
}