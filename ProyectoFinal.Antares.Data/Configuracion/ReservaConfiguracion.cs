using System.Diagnostics.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ProyectoFinal.Antares.Domain.Modelos;

namespace ProyectoFinal.Antares.Data.Configuracion;

[ExcludeFromCodeCoverage]
public class ReservaConfiguracion : IEntityTypeConfiguration<Reserva>
{
    public void Configure(EntityTypeBuilder<Reserva> builder)
    {
        builder.HasKey(x => new { x.Id });
        
        builder.HasOne(x => x.Usuario);
        
        builder.HasOne(x => x.Mesa);
        
        builder.Property(x => x.CantidadComensales)
            .IsRequired();
    }
}