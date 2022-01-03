using Microsoft.Extensions.Logging;
using ProyectoFinal.Antares.Domain.Modelos;
using ProyectoFinal.Antares.Domain.Repositories;

namespace ProyectoFinal.Antares.Domain.Servicios;

public class UsuarioService : ReferenceService<Usuario>, IUsuarioService
{
    public UsuarioService(IUsuarioRepository repository, IUnitOfWork unitOfWork, ILogger<Usuario> logger) : base(repository, unitOfWork, logger)
    { }
}