using ProyectoFinal.Antares.Domain.Modelos;

namespace ProyectoFinal.Antares.Data.Repositories;

public class UsuarioRepository : BaseRepository<Usuario>
{
    public UsuarioRepository(ApplicationDbContext context) : base(context)
    {
    }
}