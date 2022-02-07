using Microsoft.Extensions.Logging;
using ProyectoFinal.Antares.Domain.Modelos;
using ProyectoFinal.Antares.Domain.Repositories;

namespace ProyectoFinal.Antares.Domain.Servicios;

public class ProductoService : ReferenceService<Producto>, IProductoService
{
    private readonly IProductoRepository _repository;

    public ProductoService(IProductoRepository repository, IUnitOfWork unitOfWork, ILogger<Producto> logger) : base(repository, unitOfWork, logger)
    {
        _repository = repository;
    }

    public async Task<IList<Producto>> GetMenu()
    {
        var menu = await _repository.GetMenu();
        
        return menu.ToList();
    }
    
    public async Task<Producto> GetProductoConImagen(int id)
    {
        var menu = await _repository.GetProductoConImagen(id);

        if (menu == null)
            throw new FileNotFoundException();
        
        return menu;
    }

}