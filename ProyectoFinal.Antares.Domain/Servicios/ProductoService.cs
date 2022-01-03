﻿using Microsoft.Extensions.Logging;
using ProyectoFinal.Antares.Domain.Modelos;
using ProyectoFinal.Antares.Domain.Repositories;

namespace ProyectoFinal.Antares.Domain.Servicios;

public class ProductoService : ReferenceService<Producto>, IProductoService
{
    public ProductoService(IProductoRepository repository, IUnitOfWork unitOfWork, ILogger<Producto> logger) : base(repository, unitOfWork, logger)
    { }
}