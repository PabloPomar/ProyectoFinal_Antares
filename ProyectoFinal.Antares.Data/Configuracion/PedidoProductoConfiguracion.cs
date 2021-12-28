using System.Diagnostics.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ProyectoFinal.Antares.Domain.Models;

namespace ProyectoFinal.Antares.Data.Configuracion;

[ExcludeFromCodeCoverage]
public class PedidoProductoConfiguracion : IEntityTypeConfiguration<PedidoProducto>
{
    public void Configure(EntityTypeBuilder<PedidoProducto> builder)
    {
        builder.HasKey(x => new { x.Id });
        
        builder.Property(x => x.IdUsuario)
            .IsRequired();
        
        builder.Property(x => x.IdProducto)
            .IsRequired();

        builder.Property(x => x.Cantidad)
            .IsRequired();
    }
}