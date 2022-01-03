using System.Linq.Expressions;
using ProyectoFinal.Antares.Domain.Modelos;
using ProyectoFinal.Antares.Domain.Repositories;
using Microsoft.Extensions.Logging;
using ProyectoFinal.Antares.Domain.Recursos;

namespace ProyectoFinal.Antares.Domain.Servicios
{
    public class ReferenceService<T> : IReferenceService<T>
        where T : BaseModel
    {
        private readonly IBaseRepository<T> _repository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<T> _logger;

        protected ReferenceService(IBaseRepository<T> repository, IUnitOfWork unitOfWork, ILogger<T> logger)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
            _unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
            _logger = logger;
        }

        public virtual async Task SaveAsync(T entity)
        {
            _logger.LogInformation(LogStrings.ReferenceService.RequestedSave, typeof(T).Name, entity);

            if (entity.Id == 0)
            {
                await _repository.AddAsync(entity);
                _logger.LogInformation(LogStrings.ReferenceService.AddedNewValue, typeof(T).Name, entity);
            }
            else
            {
                var existingEntity = await _repository.FindAsync(entity.Id, true);

                await _repository.UpdateAsync(entity);

                _logger.LogInformation(LogStrings.ReferenceService.EditedValue, typeof(T).Name, existingEntity,
                    entity);
            }

            await _unitOfWork.SaveAsync();
            _logger.LogInformation(LogStrings.ReferenceService.Saved, typeof(T).Name);
        }

        public async Task DeleteAsync(int id)
        {
            _logger.LogInformation(LogStrings.ReferenceService.RequestedDelete, typeof(T).Name, id);
            await _repository.DeleteAsync(id);
            await _unitOfWork.SaveAsync();
            _logger.LogInformation(LogStrings.ReferenceService.Deleted, typeof(T).Name, id);
        }
        
        public async Task<T> FindAsync(int id)
        {
            _logger.LogInformation(LogStrings.ReferenceService.RequestedOne, typeof(T).Name, id); 
            return await _repository.FindAsync(id) ?? throw new InvalidOperationException();
        }
        
        public async Task<IEnumerable<T>> GetAsync(Expression<Func<T, bool>> filter)
        {
            _logger.LogInformation(LogStrings.ReferenceService.RequestedFind, typeof(T).Name, filter); 
            return await _repository.GetAsync(filter);
        } 
        
        public async Task<IEnumerable<T>> GetAllAsync()
        {
            _logger.LogInformation(LogStrings.ReferenceService.RequestedAll, typeof(T).Name); 
            return await _repository.GetAllAsync();
        } 

        public async Task AddRangeAsync(IEnumerable<T?> entities)
        {
            _logger.LogInformation(LogStrings.ReferenceService.RequestedAddRange, typeof(T).Name);

            var baseModels = entities as T?[] ?? entities.ToArray();
            
            foreach (var entity in baseModels)
            {
                if (entity == null) continue;

                await _repository.AddAsync(entity);
            }

            await _unitOfWork.SaveAsync();
            
            _logger.LogInformation(LogStrings.ReferenceService.RangeAdded, typeof(T).Name, baseModels);
        }
    }
}
