using System.Linq.Expressions;
using ProyectoFinal.Antares.Domain.Dtos;

namespace ProyectoFinal.Antares.Domain.Servicios
{
    public interface IReferenceService<T>
    {
        Task AddRangeAsync(IEnumerable<T?> entities);

        Task DeleteAsync(int id);

        Task<PageQueryResult<T>> GetAllAsync();

        Task SaveAsync(T entity);
        
        Task<T> FindAsync(int id);

        Task<IEnumerable<T>> GetAsync(Expression<Func<T, bool>> filter);
    }
}
