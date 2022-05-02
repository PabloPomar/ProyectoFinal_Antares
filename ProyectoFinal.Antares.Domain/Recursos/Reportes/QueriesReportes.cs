namespace ProyectoFinal.Antares.Domain.Recursos.Reportes;

public static class QueriesReportes
{
    public static class Ventas
    {
        public static string VentasQuery = 
            @"SELECT YEAR([HoraEntrega]) as SalesYear,
				         MONTH([HoraEntrega]) as SalesMonth,
				         SUM([PrecioTotal]) AS TotalSales,
						 Count([EstadoPedido]) as Completadas 
				      FROM [Antares].[dbo].[Pedido]
					  where EstadoPedido = 5
				GROUP BY YEAR([HoraEntrega]), MONTH([HoraEntrega])
				ORDER BY YEAR([HoraEntrega]), MONTH([HoraEntrega])";

        public static string VentasQueryCanceladas =
            @"SELECT YEAR([HoraPedido]) as SalesYear,
				MONTH([HoraPedido]) as SalesMonth,
				Count([EstadoPedido]) as NoCompletadas 
					  FROM [Antares].[dbo].[Pedido] 
					  where EstadoPedido != 5
				GROUP BY YEAR([HoraPedido]), MONTH([HoraPedido])
				ORDER BY YEAR([HoraPedido]), MONTH([HoraPedido])";
    }

    public static class Deliveries
    {
        public static string DeliveriesQuery =
            @"SELECT YEAR([HoraEntrega]) as SalesYear,
			         MONTH([HoraEntrega]) as SalesMonth,
					 [IdDelivery], u.NombreUsuario as Nombre,
					 Count([EstadoPedido]) as Completadas 
			      FROM [Antares].[dbo].[Pedido]
				  Inner Join Usuario u on IdDelivery = u.Id
				  where EstadoPedido = 5
			GROUP BY YEAR([HoraEntrega]), MONTH([HoraEntrega]), [IdDelivery], u.NombreUsuario
			ORDER BY YEAR([HoraEntrega]), MONTH([HoraEntrega]), [IdDelivery], Completadas desc";

        public static string DeliveriesQueryCanceladas =
            @"SELECT YEAR([HoraEntrega]) as SalesYear,
			         MONTH([HoraEntrega]) as SalesMonth,
					 [IdDelivery], u.NombreUsuario as Nombre,
					 Count([EstadoPedido]) as NoCompletadas 
			      FROM [Antares].[dbo].[Pedido]
				  Inner Join Usuario u on IdDelivery = u.Id
				  where EstadoPedido != 5
			GROUP BY YEAR([HoraEntrega]), MONTH([HoraEntrega]), [IdDelivery], u.NombreUsuario
			ORDER BY YEAR([HoraEntrega]), MONTH([HoraEntrega]), [IdDelivery], NoCompletadas desc";
    }

    public static class PedidosCLientes
    {
	    public static string PedidosCLientesQuery =
		    @"SELECT YEAR([HoraEntrega]) as SalesYear,
			         MONTH([HoraEntrega]) as SalesMonth,
					 [IdUsuario], u.NombreUsuario as Nombre,
					 Count([EstadoPedido]) as Completadas 
			      FROM [Antares].[dbo].[Pedido]
				  Inner Join Usuario u on [IdUsuario] = u.Id
				  where EstadoPedido = 5
			GROUP BY YEAR([HoraEntrega]), MONTH([HoraEntrega]), [IdUsuario], u.NombreUsuario
			ORDER BY YEAR([HoraEntrega]) asc, MONTH([HoraEntrega]) asc, Completadas desc";

	    public static string PedidosCLientesCanceladas =
		    @"SELECT YEAR([HoraPedido]) as SalesYear,
			         MONTH([HoraPedido]) as SalesMonth,
					 [IdUsuario], u.NombreUsuario as Nombre,
					 Count([EstadoPedido]) as Canceladas 
			      FROM [Antares].[dbo].[Pedido]
				  Inner Join Usuario u on [IdUsuario] = u.Id
				  where EstadoPedido = 6
			GROUP BY YEAR([HoraPedido]), MONTH([HoraPedido]), [IdUsuario], u.NombreUsuario
			ORDER BY YEAR([HoraPedido]) asc, MONTH([HoraPedido]) asc, Canceladas desc";
    }
}