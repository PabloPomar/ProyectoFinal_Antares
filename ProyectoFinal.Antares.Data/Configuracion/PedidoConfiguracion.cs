﻿using System.Diagnostics.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Newtonsoft.Json;
using ProyectoFinal.Antares.Domain.Modelos;

namespace ProyectoFinal.Antares.Data.Configuracion;

[ExcludeFromCodeCoverage]
public class PedidoConfiguracion : IEntityTypeConfiguration<Pedido>
{
    public void Configure(EntityTypeBuilder<Pedido> builder)
    {
        builder.HasKey(x => new { x.Id });

        builder.Property(user => user.ListaPedido)
            .HasConversion(
                a => (string)JsonConvert.SerializeObject(a),
                a => JsonConvert.DeserializeObject<List<PedidoProducto>>(a) ?? new List<PedidoProducto>());
        
        builder.HasOne(x => x.Usuario);
    }
}