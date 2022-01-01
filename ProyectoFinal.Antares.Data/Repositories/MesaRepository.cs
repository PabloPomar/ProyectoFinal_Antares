using ProyectoFinal.Antares.Domain.Modelos;

namespace ProyectoFinal.Antares.Data.Repositories;

public class MesaRepository : BaseRepository<Mesa>
{
    public MesaRepository(ApplicationDbContext context) : base(context)
    {
    }
}