using Microsoft.Extensions.Logging;
using ProyectoFinal.Antares.Domain.Helpers;
using ProyectoFinal.Antares.Domain.Modelos;
using ProyectoFinal.Antares.Domain.Repositories;

namespace ProyectoFinal.Antares.Domain.Servicios;

public class UsuarioService : ReferenceService<Usuario>, IUsuarioService
{
    private readonly IUsuarioRepository _repository;
    private readonly IUnitOfWork _unitOfWork;

    public UsuarioService(IUsuarioRepository repository, IUnitOfWork unitOfWork, ILogger<Usuario> logger) : base(repository, unitOfWork, logger)
    {
        _repository = repository;
        _unitOfWork = unitOfWork;
    }

    public override async Task SaveAsync(Usuario usuario)
    {
        usuario.Password = PasswordHash.HashPassword(usuario.Password);
        
        if (usuario.Id == 0)
        {
            var userExist = await _repository.ValidarNombreUsuarioAsync(usuario.NombreUsuario);

            if (userExist)
            {
                throw new Exception("Un usuario con ese nombre ya existe");
            }
            
            await _repository.AddAsync(usuario);
        }
        else
        {
            await _repository.UpdateAsync(usuario);
        }
        await _unitOfWork.SaveAsync();
    }

    public async Task<bool> ValidarUsuario(string nombreUsuario, string password)
    {
        return await _repository.ValidarUsuarioContraseñaAsync(nombreUsuario, password);
    }
}