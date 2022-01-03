using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using ProyectoFinal.Antares.Domain.Dtos;
using ProyectoFinal.Antares.Domain.Modelos;
using ProyectoFinal.Antares.Domain.Repositories;

namespace ProyectoFinal.Antares.Data.Repositories
{
    public class BaseRepository<T> : IBaseRepository<T> where T : BaseModel
    {
        protected readonly ApplicationDbContext Context;

        public BaseRepository(ApplicationDbContext context) =>
            Context = context ?? throw new ArgumentNullException(nameof(context));

        public async Task AddAsync(T entity)
        {
            await Context.Set<T>().AddAsync(entity);
        }

        public async Task<T?> FindAsync(int id, bool asNoTracking = false)
        {
            if (asNoTracking)
                return await Context.Set<T>().AsNoTracking().AsSplitQuery().FirstOrDefaultAsync(x => x.Id == id);
            else
                return await Context.Set<T>().AsSplitQuery().FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task DeleteAsync(int id)
        {
            var entity = await FindAsync(id);

            if (entity != null) Context.Set<T>().Remove(entity);
        }

        public async Task<PageQueryResult<T>> GetAllPagedAsync()
        {
            var list = await Context.Set<T>().AsSplitQuery().ToListAsync();

            return new PageQueryResult<T>(list, list.Count);
        }
        
        public async Task<IEnumerable<T>> GetAllAsync()
        {
            var list = await Context.Set<T>().AsSplitQuery().ToListAsync();

            return list;
        }

        public async Task RemoveRangeAsync(IEnumerable<T> items)
        {
            Context.Set<T>().RemoveRange(items);
            await Task.CompletedTask;
        }

        public async Task<IEnumerable<T>> GetAsync(Expression<Func<T, bool>> filter)
        {
            return await Context.Set<T>().Where(filter).AsSplitQuery().ToListAsync();
        }
        
        public async Task UpdateAsync(T entity)
        {
            Context.Update(entity);
            await Context.SaveChangesAsync();
        }
    }
}
