namespace Netto.Vertragsmanagement.Domain
{
    public interface IUnitOfWork
    {
        Task<int> SaveAsync();
    }
}
