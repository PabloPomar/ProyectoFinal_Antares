using System.Diagnostics.CodeAnalysis;

namespace ProyectoFinal.Antares.Domain.Dtos
{
    [ExcludeFromCodeCoverage]
    public class PageQueryResult<T>
    {
        public PageQueryResult(IEnumerable<T> items, in int totalCount)
        {
            Items = items;
            TotalCount = totalCount;
        }
        
        public IEnumerable<T> Items { get; set; }

        public int TotalCount { get; set; }
    }
}
