using ProyectoFinal.Antares.Domain.Modelos;

namespace ProyectoFinal.Antares.Domain.Servicios;

public interface IProductoService : IReferenceService<Producto>
{
    Task<IList<Producto>> GetMenu();

    Task<Producto> GetProductoConImagen(int id);
}