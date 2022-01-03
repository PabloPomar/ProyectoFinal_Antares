using System.Linq.Expressions;

namespace ProyectoFinal.Antares.Domain.Servicios
{
    public interface IReferenceService<T>
    {
        Task AddRangeAsync(IEnumerable<T?> entities);

        Task DeleteAsync(int id);

        Task<IEnumerable<T>> GetAllAsync();

        Task SaveAsync(T entity);
        
        Task<T> FindAsync(int id);

        Task<IEnumerable<T>> GetAsync(Expression<Func<T, bool>> filter);
    }
}
