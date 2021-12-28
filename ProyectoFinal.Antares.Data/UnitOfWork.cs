using ProyectoFinal.Antares.Domain;

namespace ProyectoFinal.Antares.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _context;

        public UnitOfWork(ApplicationDbContext context) => _context = context;

        public Task<int> SaveAsync() => _context.SaveChangesAsync();
    }
}
