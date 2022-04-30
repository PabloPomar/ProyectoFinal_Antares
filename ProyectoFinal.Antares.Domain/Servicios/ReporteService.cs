using System.Data;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json;
using ProyectoFinal.Antares.Domain.Modelos.Informes;
using ProyectoFinal.Antares.Domain.Recursos.Reportes;

namespace ProyectoFinal.Antares.Domain.Servicios;

public class ReporteService : IReporteService
{
    private readonly string _connectionString;

    public ReporteService(string connectionString)
    {
        _connectionString = connectionString;
    }

    public async Task<List<VentasDto>> TestReporteVentas()
    {
        var ventas1 = await GetJsonResult(QueriesReportes.Ventas.VentasQuery);

        var ventasCompletadas = new List<VentasDto>();

        var ventasCanceladas = new List<VentasDto>();
        
        if (ventas1 != null)
        {
            ventasCompletadas = JsonConvert.DeserializeObject<List<VentasDto>>(ventas1);
        }
        
        var ventas2 = await GetJsonResult(QueriesReportes.Ventas.VentasQueryCanceladas);
        
        if (ventas2 != null)
        {
            ventasCanceladas = JsonConvert.DeserializeObject<List<VentasDto>>(ventas2);
        }

        foreach (var venta in ventasCompletadas!)
        {
            var noCompletadas = ventasCanceladas?.FirstOrDefault(x => x.SalesYear == venta.SalesYear && x.SalesMonth == venta.SalesMonth)?.NoCompletadas;

            venta.NoCompletadas = noCompletadas ?? 0;
        }

        foreach (var venta in from venta in ventasCanceladas! 
                 let completadas = ventasCompletadas?.FirstOrDefault(x => x.SalesYear == venta.SalesYear && x.SalesMonth == venta.SalesMonth) 
                 where completadas == null select venta)
        {
            ventasCompletadas?.Add(venta);
        }

        return ventasCompletadas!;
    }
    
    public async Task<List<PedidosClientesDto>> TestPedidoClientes()
    {
        var ventas1 = await GetJsonResult(QueriesReportes.PedidosCLientes.PedidosCLientesQuery);

        var pedidosCompletados = new List<PedidosClientesDto>();

        var pedidosCancelados = new List<PedidosClientesDto>();
        
        if (ventas1 != null)
        {
            pedidosCompletados = JsonConvert.DeserializeObject<List<PedidosClientesDto>>(ventas1);
        }
        
        var ventas2 = await GetJsonResult(QueriesReportes.PedidosCLientes.PedidosCLientesCanceladas);
        
        if (ventas2 != null)
        {
            pedidosCancelados = JsonConvert.DeserializeObject<List<PedidosClientesDto>>(ventas2);
        }

        foreach (var pedidosClientes in pedidosCompletados!)
        {
            var noCompletadas = pedidosCancelados?.FirstOrDefault(x => x.SalesYear == pedidosClientes.SalesYear
                                                                       && x.SalesMonth == pedidosClientes.SalesMonth
                                                                       && x.IdUsuario == pedidosClientes.IdUsuario)?.Canceladas;

            pedidosClientes.Canceladas = noCompletadas?? 0;
        }

        foreach (var pedido in from pedido in pedidosCancelados! 
                 let completadas = pedidosCompletados?.FirstOrDefault(x => x.SalesYear == pedido.SalesYear
                     && x.SalesMonth == pedido.SalesMonth
                     && x.IdUsuario == pedido.IdUsuario) 
                 where completadas == null select pedido)
        {
            pedidosCompletados?.Add(pedido);
        }

        return pedidosCompletados!;
    }
    
    public async Task<List<DeliveriesDto>> TestDeliveries()
    {
        var ventas1 = await GetJsonResult(QueriesReportes.Deliveries.DeliveriesQuery);

        var deliveriesCompletados = new List<DeliveriesDto>();

        var deliveriesCancelados = new List<DeliveriesDto>();
        
        if (ventas1 != null)
        {
            deliveriesCompletados = JsonConvert.DeserializeObject<List<DeliveriesDto>>(ventas1);
        }
        
        var ventas2 = await GetJsonResult(QueriesReportes.Deliveries.DeliveriesQueryCanceladas);
        
        if (ventas2 != null)
        {
            deliveriesCancelados = JsonConvert.DeserializeObject<List<DeliveriesDto>>(ventas2);
        }

        foreach (var deliveriesDto in deliveriesCompletados!)
        {
            var noCompletadas = deliveriesCancelados?.FirstOrDefault(x => x.SalesYear == deliveriesDto.SalesYear
                                                                       && x.SalesMonth == deliveriesDto.SalesMonth
                                                                       && x.IdDelivery == deliveriesDto.IdDelivery)?.NoCompletadas;

            deliveriesDto.NoCompletadas = noCompletadas?? 0;
        }

        foreach (var deliveriesDto in from delivery in deliveriesCancelados! 
                 let completadas = deliveriesCompletados?.FirstOrDefault(x => x.SalesYear == delivery.SalesYear
                                                                           && x.SalesMonth == delivery.SalesMonth
                                                                           && x.IdDelivery == delivery.IdDelivery) 
                 where completadas == null select delivery)
        {
            deliveriesCompletados?.Add(deliveriesDto);
        }

        return deliveriesCompletados!;
    }
    
    
    /*public Task TestGetData()
    {
        var query = QueriesReportes.Ventas.VentasQuery;
            
        using var connection = new SqlConnection(_connectionString);
        
        var command = new SqlCommand(query, connection);

        connection.Open();
        
        var reader = command.ExecuteReader();

        var json = JsonConvert.SerializeObject(sqlDatoToJson(reader), Formatting.Indented);
        
        var first = JsonConvert.DeserializeObject<string>(json);
        
        if (first != null)
        {
            var ventas = JsonConvert.DeserializeObject<VentasDto[]>(first);
        }

        return Task.FromResult(json);
    }*/

    private async Task<string?> GetJsonResult(string queryCommand)
    {
        await using var connection = new SqlConnection(_connectionString);
        
        var command = new SqlCommand(queryCommand, connection);

        connection.Open();
        
        var reader = await command.ExecuteReaderAsync();

        var json = JsonConvert.SerializeObject(sqlDatoToJson(reader), Formatting.Indented);
        
        var jsonResult = JsonConvert.DeserializeObject<string>(json);

        return jsonResult;
    }
    
    private String sqlDatoToJson(SqlDataReader dataReader)
    {
        var dataTable = new DataTable();
        dataTable.Load(dataReader);
        var jsonString = JsonConvert.SerializeObject(dataTable);
        return jsonString;
    }
}