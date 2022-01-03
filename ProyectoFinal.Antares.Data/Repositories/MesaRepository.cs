using ProyectoFinal.Antares.Domain.Modelos;
using ProyectoFinal.Antares.Domain.Repositories;

namespace ProyectoFinal.Antares.Data.Repositories;

public class MesaRepository : BaseRepository<Mesa>, IMesaRepository
{
    public MesaRepository(ApplicationDbContext context) : base(context)
    {
    }
}