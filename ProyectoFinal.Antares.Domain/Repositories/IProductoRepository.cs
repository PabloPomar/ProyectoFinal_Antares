using ProyectoFinal.Antares.Domain.Modelos;

namespace ProyectoFinal.Antares.Domain.Repositories;

public interface IProductoRepository : IBaseRepository<Producto>
{
    Task<IQueryable<Producto>> GetMenu();

    Task<Producto?> GetProductoConImagen(int id);
    
    Task DesactivarProducto(int id);

    Task<bool> ValidarNombreProducto(string nombre, string? nombreActual = null);
}