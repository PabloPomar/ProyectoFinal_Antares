using System.Linq.Expressions;
using ProyectoFinal.Antares.Domain.Dtos;

namespace ProyectoFinal.Antares.Domain.Repositories
{
    public interface IBaseRepository<T>
    {
        Task AddAsync(T entity);

        Task DeleteAsync(int id);

        Task<T?> FindAsync(int id, bool asNoTracking = false);

        Task<PageQueryResult<T>> GetAllAsync();

        Task RemoveRangeAsync(IEnumerable<T> items);

        Task<IEnumerable<T>> GetAsync(Expression<Func<T, bool>> filter);
    }
}
