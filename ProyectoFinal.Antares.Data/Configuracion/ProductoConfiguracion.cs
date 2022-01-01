using System.Diagnostics.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ProyectoFinal.Antares.Domain.Modelos;

namespace ProyectoFinal.Antares.Data.Configuracion;

[ExcludeFromCodeCoverage]
public class ProductoConfiguracion : IEntityTypeConfiguration<Producto>
{
    public void Configure(EntityTypeBuilder<Producto> builder)
    {
        builder.HasKey(x => new { x.Id });

        builder.HasOne(x => x.Imagen).WithMany().IsRequired(false);
    }
}