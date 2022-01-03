using ProyectoFinal.Antares.Domain.Modelos;
using ProyectoFinal.Antares.Domain.Repositories;

namespace ProyectoFinal.Antares.Data.Repositories;

public class UbicacionRepository : BaseRepository<Ubicacion>, IUbicacionRepository
{
    public UbicacionRepository(ApplicationDbContext context) : base(context)
    {
    }
}