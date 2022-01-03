using Microsoft.AspNetCore.Mvc;
using ProyectoFinal.Antares.Domain.Modelos;
using ProyectoFinal.Antares.Domain.Servicios;

namespace ProyectoFinal.Antares.Api.Controllers
{
    [ApiController]
    public class BaseController<TEntity> : ControllerBase where TEntity : BaseModel
    {
        private readonly IReferenceService<TEntity> _referenceService;
        
        public BaseController(IReferenceService<TEntity> referenceService)
        {
            _referenceService = referenceService;
        }

        [HttpGet]
        public async Task<IEnumerable<TEntity>> GetAllAsync()
        {
            return await _referenceService.GetAllAsync();
        }

        [HttpGet("{id}")]
        public async Task<TEntity> GetAsync(int id)
        {
            return await _referenceService.FindAsync(id);
        }

        [HttpDelete("{id}")]
        public async Task DeleteAsync(int id)
        {
            await _referenceService.DeleteAsync(id);
        }

        [HttpPost]
        public async Task<TEntity> CreateAsync(TEntity entity)
        {           
            await _referenceService.SaveAsync(entity);
            return entity;
        }

        [HttpPut]
        public async Task<TEntity> UpdateAsync(TEntity entity)
        {           
            await _referenceService.SaveAsync(entity);
            return entity;
        }
    }
}