using ProyectoFinal.Antares.Domain.Modelos;

namespace ProyectoFinal.Antares.Domain.Repositories;

public interface IUsuarioRepository : IBaseRepository<Usuario>
{
    Task<bool> ValidarNombreUsuarioAsync(string nombreUsuario);

    Task<bool> ValidarUsuarioContraseñaAsync(string nombreUsuario, string password);

    Task<Usuario?> GetUsuario(string nombreUsuario, string password);

    Task<bool> EmailEnUso(string email);

    Task<bool> NombreUsuarioEnUso(string nombre);

    Task<List<Usuario>> GetDeliveries();
}