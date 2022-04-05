using System.Diagnostics.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ProyectoFinal.Antares.Domain.Modelos;

namespace ProyectoFinal.Antares.Data.Configuracion;

[ExcludeFromCodeCoverage]
public class PedidoProductoConfiguracion : IEntityTypeConfiguration<PedidoProducto>
{
    public void Configure(EntityTypeBuilder<PedidoProducto> builder)
    {
        builder.HasKey(x => new { x.Id });

        builder.HasOne(x => x.Producto)
            .WithMany()
            .HasForeignKey(x => x.IdProducto);

        builder.Property(x => x.Cantidad)
            .IsRequired();
    }
}