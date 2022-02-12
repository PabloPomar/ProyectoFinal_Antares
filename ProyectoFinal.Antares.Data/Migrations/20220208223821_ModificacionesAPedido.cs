using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProyectoFinal.Antares.Data.Migrations
{
    public partial class ModificacionesAPedido : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PedidoProducto_Usuario_UsuarioId",
                table: "PedidoProducto");

            migrationBuilder.DropIndex(
                name: "IX_PedidoProducto_UsuarioId",
                table: "PedidoProducto");

            migrationBuilder.DropColumn(
                name: "UsuarioId",
                table: "PedidoProducto");

            migrationBuilder.DropColumn(
                name: "Activo",
                table: "Pedido");

            migrationBuilder.AddColumn<decimal>(
                name: "Precio",
                table: "Producto",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<int>(
                name: "EstadoPedido",
                table: "Pedido",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "ListaPedido",
                table: "Pedido",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<decimal>(
                name: "PrecioTotal",
                table: "Pedido",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Precio",
                table: "Producto");

            migrationBuilder.DropColumn(
                name: "EstadoPedido",
                table: "Pedido");

            migrationBuilder.DropColumn(
                name: "ListaPedido",
                table: "Pedido");

            migrationBuilder.DropColumn(
                name: "PrecioTotal",
                table: "Pedido");

            migrationBuilder.AddColumn<int>(
                name: "UsuarioId",
                table: "PedidoProducto",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "Activo",
                table: "Pedido",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateIndex(
                name: "IX_PedidoProducto_UsuarioId",
                table: "PedidoProducto",
                column: "UsuarioId");

            migrationBuilder.AddForeignKey(
                name: "FK_PedidoProducto_Usuario_UsuarioId",
                table: "PedidoProducto",
                column: "UsuarioId",
                principalTable: "Usuario",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
