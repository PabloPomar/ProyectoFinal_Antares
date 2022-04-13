using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProyectoFinal.Antares.Data.Migrations
{
    public partial class IdsEnPedido2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Pedido_Usuario_DeliveryId",
                table: "Pedido");

            migrationBuilder.DropForeignKey(
                name: "FK_Pedido_Usuario_UsuarioId",
                table: "Pedido");

            migrationBuilder.DropForeignKey(
                name: "FK_PedidoProducto_Producto_ProductoId",
                table: "PedidoProducto");

            migrationBuilder.DropIndex(
                name: "IX_Pedido_DeliveryId",
                table: "Pedido");

            migrationBuilder.DropIndex(
                name: "IX_Pedido_UsuarioId",
                table: "Pedido");

            migrationBuilder.DropColumn(
                name: "DeliveryId",
                table: "Pedido");

            migrationBuilder.DropColumn(
                name: "UsuarioId",
                table: "Pedido");

            migrationBuilder.RenameColumn(
                name: "ProductoId",
                table: "PedidoProducto",
                newName: "IdProducto");

            migrationBuilder.RenameIndex(
                name: "IX_PedidoProducto_ProductoId",
                table: "PedidoProducto",
                newName: "IX_PedidoProducto_IdProducto");

            migrationBuilder.CreateIndex(
                name: "IX_Pedido_IdDelivery",
                table: "Pedido",
                column: "IdDelivery");

            migrationBuilder.CreateIndex(
                name: "IX_Pedido_IdUsuario",
                table: "Pedido",
                column: "IdUsuario");

            migrationBuilder.AddForeignKey(
                name: "FK_Pedido_Usuario_IdDelivery",
                table: "Pedido",
                column: "IdDelivery",
                principalTable: "Usuario",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Pedido_Usuario_IdUsuario",
                table: "Pedido",
                column: "IdUsuario",
                principalTable: "Usuario",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PedidoProducto_Producto_IdProducto",
                table: "PedidoProducto",
                column: "IdProducto",
                principalTable: "Producto",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Pedido_Usuario_IdDelivery",
                table: "Pedido");

            migrationBuilder.DropForeignKey(
                name: "FK_Pedido_Usuario_IdUsuario",
                table: "Pedido");

            migrationBuilder.DropForeignKey(
                name: "FK_PedidoProducto_Producto_IdProducto",
                table: "PedidoProducto");

            migrationBuilder.DropIndex(
                name: "IX_Pedido_IdDelivery",
                table: "Pedido");

            migrationBuilder.DropIndex(
                name: "IX_Pedido_IdUsuario",
                table: "Pedido");

            migrationBuilder.RenameColumn(
                name: "IdProducto",
                table: "PedidoProducto",
                newName: "ProductoId");

            migrationBuilder.RenameIndex(
                name: "IX_PedidoProducto_IdProducto",
                table: "PedidoProducto",
                newName: "IX_PedidoProducto_ProductoId");

            migrationBuilder.AddColumn<int>(
                name: "DeliveryId",
                table: "Pedido",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UsuarioId",
                table: "Pedido",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Pedido_DeliveryId",
                table: "Pedido",
                column: "DeliveryId");

            migrationBuilder.CreateIndex(
                name: "IX_Pedido_UsuarioId",
                table: "Pedido",
                column: "UsuarioId");

            migrationBuilder.AddForeignKey(
                name: "FK_Pedido_Usuario_DeliveryId",
                table: "Pedido",
                column: "DeliveryId",
                principalTable: "Usuario",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Pedido_Usuario_UsuarioId",
                table: "Pedido",
                column: "UsuarioId",
                principalTable: "Usuario",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PedidoProducto_Producto_ProductoId",
                table: "PedidoProducto",
                column: "ProductoId",
                principalTable: "Producto",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
