using Microsoft.Extensions.Logging;
using ProyectoFinal.Antares.Domain.Modelos;
using ProyectoFinal.Antares.Domain.Repositories;

namespace ProyectoFinal.Antares.Domain.Servicios;

public class ProductoService : ReferenceService<Producto>, IProductoService
{
    private readonly IProductoRepository _repository;
    private readonly IUnitOfWork _unitOfWork;

    public ProductoService(IProductoRepository repository, IUnitOfWork unitOfWork, ILogger<Producto> logger) : base(repository, unitOfWork, logger)
    {
        _repository = repository;
        _unitOfWork = unitOfWork;
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
    
    public async Task DesactivarProducto(int id)
    {
        await _repository.DesactivarProducto(id);
        await _unitOfWork.SaveAsync();
    }
    
    public async Task<bool> ValidarProducto(string nombre, string? nombreActual = null)
    {
        return await _repository.ValidarNombreProducto(nombre, nombreActual);
    }
}