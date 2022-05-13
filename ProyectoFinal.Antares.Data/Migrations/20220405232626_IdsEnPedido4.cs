using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProyectoFinal.Antares.Data.Migrations
{
    public partial class IdsEnPedido4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ListaPedido",
                table: "Pedido");

            migrationBuilder.AddColumn<int>(
                name: "IdPedido",
                table: "PedidoProducto",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_PedidoProducto_IdPedido",
                table: "PedidoProducto",
                column: "IdPedido");

            migrationBuilder.AddForeignKey(
                name: "FK_PedidoProducto_Pedido_IdPedido",
                table: "PedidoProducto",
                column: "IdPedido",
                principalTable: "Pedido",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PedidoProducto_Pedido_IdPedido",
                table: "PedidoProducto");

            migrationBuilder.DropIndex(
                name: "IX_PedidoProducto_IdPedido",
                table: "PedidoProducto");

            migrationBuilder.DropColumn(
                name: "IdPedido",
                table: "PedidoProducto");

            migrationBuilder.AddColumn<string>(
                name: "ListaPedido",
                table: "Pedido",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
