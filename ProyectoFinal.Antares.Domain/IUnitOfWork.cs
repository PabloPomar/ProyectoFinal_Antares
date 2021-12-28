namespace ProyectoFinal.Antares.Domain
{
    public interface IUnitOfWork
    {
        Task<int> SaveAsync();
    }
}
