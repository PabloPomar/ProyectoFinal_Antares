using ProyectoFinal.Antares.Domain.Modelos;

namespace ProyectoFinal.Antares.Domain.Servicios;

public interface IUsuarioService : IReferenceService<Usuario>
{
    Task<bool> ValidarUsuario(string nombreUsuario, string contraseña);
}