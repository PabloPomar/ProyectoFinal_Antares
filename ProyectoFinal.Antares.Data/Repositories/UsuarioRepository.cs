using Microsoft.EntityFrameworkCore;
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
        var usuario = await Context.Set<Usuario>().AsSplitQuery().FirstOrDefaultAsync(x => x.NombreUsuario == nombreUsuario);

        return usuario != null;
    }
    
    public async Task<bool> ValidarUsuarioContraseñaAsync(string nombreUsuario, string password)
    {
        var usuario = await Context.Set<Usuario>().AsSplitQuery().FirstOrDefaultAsync(x => x.NombreUsuario == nombreUsuario);

        return usuario != null && PasswordHash.ValidatePassword(password, usuario.Password);
    }
}