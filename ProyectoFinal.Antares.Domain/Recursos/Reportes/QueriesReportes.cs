namespace ProyectoFinal.Antares.Domain.Recursos.Reportes;

public static class QueriesReportes
{
    public static class Ventas
    {
        public static string VentasQuery = 
            @"SELECT YEAR([HoraPedido]) as SalesYear,
				         MONTH([HoraPedido]) as SalesMonth,
				         SUM([PrecioTotal]) AS TotalSales,
						 Count([EstadoPedido]) as Completadas 
				      FROM [Antares].[dbo].[Pedido]
					  where EstadoPedido = 5
				GROUP BY YEAR([HoraPedido]), MONTH([HoraPedido])
				ORDER BY YEAR([HoraPedido]), MONTH([HoraPedido])";

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
            @"SELECT YEAR([HoraPedido]) as SalesYear,
			         MONTH([HoraPedido]) as SalesMonth,
					 [IdDelivery], u.NombreUsuario as Nombre,
					 Count([EstadoPedido]) as Completadas 
			      FROM [Antares].[dbo].[Pedido]
				  Inner Join Usuario u on IdDelivery = u.Id
				  where EstadoPedido = 5
			GROUP BY YEAR([HoraPedido]), MONTH([HoraPedido]), [IdDelivery], u.NombreUsuario
			ORDER BY YEAR([HoraPedido]), MONTH([HoraPedido]), [IdDelivery], Completadas desc";

        public static string DeliveriesQueryCanceladas =
            @"SELECT YEAR([HoraPedido]) as SalesYear,
			         MONTH([HoraPedido]) as SalesMonth,
					 [IdDelivery], u.NombreUsuario as Nombre,
					 Count([EstadoPedido]) as NoCompletadas 
			      FROM [Antares].[dbo].[Pedido]
				  Inner Join Usuario u on IdDelivery = u.Id
				  where EstadoPedido != 5
			GROUP BY YEAR([HoraPedido]), MONTH([HoraPedido]), [IdDelivery], u.NombreUsuario
			ORDER BY YEAR([HoraPedido]), MONTH([HoraPedido]), [IdDelivery], NoCompletadas desc";
    }

    public static class PedidosCLientes
    {
	    public static string PedidosCLientesQuery =
		    @"SELECT YEAR([HoraPedido]) as SalesYear,
			         MONTH([HoraPedido]) as SalesMonth,
					 [IdUsuario], u.NombreUsuario as Nombre,
					 Count([EstadoPedido]) as Completadas 
			      FROM [Antares].[dbo].[Pedido]
				  Inner Join Usuario u on [IdUsuario] = u.Id
				  where EstadoPedido = 5
			GROUP BY YEAR([HoraPedido]), MONTH([HoraPedido]), [IdUsuario], u.NombreUsuario
			ORDER BY YEAR([HoraPedido]) asc, MONTH([HoraPedido]) asc, Completadas desc";

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