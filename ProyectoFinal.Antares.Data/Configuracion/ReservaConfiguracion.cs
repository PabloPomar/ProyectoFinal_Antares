using System.Diagnostics.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ProyectoFinal.Antares.Domain.Models;

namespace ProyectoFinal.Antares.Data.Configuracion;

[ExcludeFromCodeCoverage]
public class ReservaConfiguracion : IEntityTypeConfiguration<Reserva>
{
    public void Configure(EntityTypeBuilder<Reserva> builder)
    {
        builder.HasKey(x => new { x.Id });
        
        builder.Property(x => x.IdUsuario)
            .IsRequired();
        
        builder.Property(x => x.IdMesa)
            .IsRequired();
        
        builder.Property(x => x.CantidadComensales)
            .IsRequired();
    }
}