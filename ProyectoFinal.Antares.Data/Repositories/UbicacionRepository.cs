using ProyectoFinal.Antares.Domain.Modelos;

namespace ProyectoFinal.Antares.Data.Repositories;

public class UbicacionRepository : BaseRepository<Ubicacion>
{
    public UbicacionRepository(ApplicationDbContext context) : base(context)
    {
    }
}