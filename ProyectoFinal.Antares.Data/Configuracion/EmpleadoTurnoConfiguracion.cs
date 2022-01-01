using System.Diagnostics.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ProyectoFinal.Antares.Domain.Modelos;

namespace ProyectoFinal.Antares.Data.Configuracion;

[ExcludeFromCodeCoverage]
public class EmpleadoTurnoConfiguracion : IEntityTypeConfiguration<EmpleadoTurno>
{
    public void Configure(EntityTypeBuilder<EmpleadoTurno> builder)
    {
        builder.HasKey(x => new { x.Id });

        builder.HasOne(x => x.Empleado);
        
        builder.HasOne(x => x.Turno);
    }
}