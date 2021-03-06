using ProyectoFinal.Antares.Domain.Modelos;

namespace ProyectoFinal.Antares.Domain.Servicios;

public interface IUsuarioService : IReferenceService<Usuario>
{
    Task<bool> ValidarUsuario(string nombreUsuario, string contraseña);

    string GenerateToken(Usuario usuario);
    
    Task<Usuario?> GetUsuario(string nombreUsuario, string password);

    Task<bool> EmailEnUso(string email);

    Task<bool> NombreUsuarioEnUso(string nombre);

    Task<List<Usuario>> GetDeliveries();
}