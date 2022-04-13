using System.Diagnostics.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ProyectoFinal.Antares.Domain.Modelos;

namespace ProyectoFinal.Antares.Data.Configuracion;

[ExcludeFromCodeCoverage]
public class PedidoConfiguracion : IEntityTypeConfiguration<Pedido>
{
    public void Configure(EntityTypeBuilder<Pedido> builder)
    {
        builder.HasKey(x => new { x.Id });

        builder.HasOne(x => x.Usuario)
            .WithMany()
            .HasForeignKey(y => y.IdUsuario)
            .OnDelete(DeleteBehavior.NoAction);
        
        builder.HasOne(x => x.Delivery)
            .WithMany()
            .HasForeignKey(y => y.IdDelivery)
            .OnDelete(DeleteBehavior.NoAction);
            
    }
}