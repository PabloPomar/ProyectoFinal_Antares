using Microsoft.EntityFrameworkCore;
using ProyectoFinal.Antares.Domain.Enums;
using ProyectoFinal.Antares.Domain.Helpers;
using ProyectoFinal.Antares.Domain.Modelos;
using ProyectoFinal.Antares.Domain.Repositories;

namespace ProyectoFinal.Antares.Data.Repositories;

public class UsuarioRepository : BaseRepository<Usuario>, IUsuarioRepository
{
    private readonly ApplicationDbContext _context;
    
    public UsuarioRepository(ApplicationDbContext context) : base(context)
    {
        _context = context;
    }

    public async Task<bool> ValidarNombreUsuarioAsync(string nombreUsuario)
    {
        var usuario = await _context.Set<Usuario>().FirstOrDefaultAsync(x => x.NombreUsuario == nombreUsuario || 
                                                                             x.Mail == nombreUsuario);

        return usuario != null;
    }

    public async Task<List<Usuario>> GetDeliveries()
    {
        return await _context.Set<Usuario>()
            .Where(x => x.Tipo == TipoUsuario.Delivery)
            .ToListAsync();
    }

    public async Task<bool> ValidarUsuarioContraseñaAsync(string nombreUsuario, string password)
    {
        var usuario = await _context.Set<Usuario>().FirstOrDefaultAsync(x => x.NombreUsuario == nombreUsuario || 
                                                                             x.Mail == nombreUsuario);

        return usuario != null && PasswordHash.ValidatePassword(password, usuario.Password);
    }
    
    public async Task<bool> EmailEnUso(string email)
    {
        var usuario = await _context.Set<Usuario>().FirstOrDefaultAsync(x => x.Mail == email);

        return usuario != null;
    }
    
    public async Task<bool> NombreUsuarioEnUso(string nombre)
    {
        var usuario = await _context.Set<Usuario>().FirstOrDefaultAsync(x => x.NombreUsuario == nombre);

        return usuario != null;
    }
    
    public async Task<Usuario?> GetUsuario(string nombreUsuario, string password)
    {
        var usuario = await _context.Set<Usuario>().FirstOrDefaultAsync(x => x.NombreUsuario == nombreUsuario || 
                                                                             x.Mail == nombreUsuario);

        if (usuario != null && PasswordHash.ValidatePassword(password, usuario.Password))
            return usuario;

        return null;
    }
}