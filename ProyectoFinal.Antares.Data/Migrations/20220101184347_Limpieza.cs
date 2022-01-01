using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProyectoFinal.Antares.Data.Migrations
{
    public partial class Limpieza : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IdProducto",
                table: "PedidoProducto");

            migrationBuilder.DropColumn(
                name: "IdMozo",
                table: "Mesa");

            migrationBuilder.DropColumn(
                name: "IdEmpleado",
                table: "EmpleadoTurnoMesa");

            migrationBuilder.RenameColumn(
                name: "IdUsuario",
                table: "Reserva",
                newName: "UsuarioId");

            migrationBuilder.RenameColumn(
                name: "IdMesa",
                table: "Reserva",
                newName: "MesaId");

            migrationBuilder.RenameColumn(
                name: "IdUsuario",
                table: "PedidoProducto",
                newName: "UsuarioId");

            migrationBuilder.RenameColumn(
                name: "IdUsuario",
                table: "Pedido",
                newName: "UsuarioId");

            migrationBuilder.RenameColumn(
                name: "IdTurno",
                table: "EmpleadoTurnoMesa",
                newName: "MesaId");

            migrationBuilder.RenameColumn(
                name: "IdMesa",
                table: "EmpleadoTurnoMesa",
                newName: "EmpleadoTurnoId");

            migrationBuilder.RenameColumn(
                name: "IdTurno",
                table: "EmpleadoTurno",
                newName: "TurnoId");

            migrationBuilder.RenameColumn(
                name: "IdEmpleado",
                table: "EmpleadoTurno",
                newName: "EmpleadoId");

            migrationBuilder.AddColumn<int>(
                name: "ImagenId",
                table: "Producto",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ProductoId",
                table: "PedidoProducto",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "ImagenProducto",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Base64Image = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ImagenProducto", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Reserva_MesaId",
                table: "Reserva",
                column: "MesaId");

            migrationBuilder.CreateIndex(
                name: "IX_Reserva_UsuarioId",
                table: "Reserva",
                column: "UsuarioId");

            migrationBuilder.CreateIndex(
                name: "IX_Producto_ImagenId",
                table: "Producto",
                column: "ImagenId");

            migrationBuilder.CreateIndex(
                name: "IX_PedidoProducto_ProductoId",
                table: "PedidoProducto",
                column: "ProductoId");

            migrationBuilder.CreateIndex(
                name: "IX_PedidoProducto_UsuarioId",
                table: "PedidoProducto",
                column: "UsuarioId");

            migrationBuilder.CreateIndex(
                name: "IX_Pedido_UsuarioId",
                table: "Pedido",
                column: "UsuarioId");

            migrationBuilder.CreateIndex(
                name: "IX_EmpleadoTurnoMesa_EmpleadoTurnoId",
                table: "EmpleadoTurnoMesa",
                column: "EmpleadoTurnoId");

            migrationBuilder.CreateIndex(
                name: "IX_EmpleadoTurnoMesa_MesaId",
                table: "EmpleadoTurnoMesa",
                column: "MesaId");

            migrationBuilder.CreateIndex(
                name: "IX_EmpleadoTurno_EmpleadoId",
                table: "EmpleadoTurno",
                column: "EmpleadoId");

            migrationBuilder.CreateIndex(
                name: "IX_EmpleadoTurno_TurnoId",
                table: "EmpleadoTurno",
                column: "TurnoId");

            migrationBuilder.AddForeignKey(
                name: "FK_EmpleadoTurno_Empleado_EmpleadoId",
                table: "EmpleadoTurno",
                column: "EmpleadoId",
                principalTable: "Empleado",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_EmpleadoTurno_Turno_TurnoId",
                table: "EmpleadoTurno",
                column: "TurnoId",
                principalTable: "Turno",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_EmpleadoTurnoMesa_EmpleadoTurno_EmpleadoTurnoId",
                table: "EmpleadoTurnoMesa",
                column: "EmpleadoTurnoId",
                principalTable: "EmpleadoTurno",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_EmpleadoTurnoMesa_Mesa_MesaId",
                table: "EmpleadoTurnoMesa",
                column: "MesaId",
                principalTable: "Mesa",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Pedido_Usuario_UsuarioId",
                table: "Pedido",
                column: "UsuarioId",
                principalTable: "Usuario",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PedidoProducto_Producto_ProductoId",
                table: "PedidoProducto",
                column: "ProductoId",
                principalTable: "Producto",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PedidoProducto_Usuario_UsuarioId",
                table: "PedidoProducto",
                column: "UsuarioId",
                principalTable: "Usuario",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Producto_ImagenProducto_ImagenId",
                table: "Producto",
                column: "ImagenId",
                principalTable: "ImagenProducto",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Reserva_Mesa_MesaId",
                table: "Reserva",
                column: "MesaId",
                principalTable: "Mesa",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Reserva_Usuario_UsuarioId",
                table: "Reserva",
                column: "UsuarioId",
                principalTable: "Usuario",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EmpleadoTurno_Empleado_EmpleadoId",
                table: "EmpleadoTurno");

            migrationBuilder.DropForeignKey(
                name: "FK_EmpleadoTurno_Turno_TurnoId",
                table: "EmpleadoTurno");

            migrationBuilder.DropForeignKey(
                name: "FK_EmpleadoTurnoMesa_EmpleadoTurno_EmpleadoTurnoId",
                table: "EmpleadoTurnoMesa");

            migrationBuilder.DropForeignKey(
                name: "FK_EmpleadoTurnoMesa_Mesa_MesaId",
                table: "EmpleadoTurnoMesa");

            migrationBuilder.DropForeignKey(
                name: "FK_Pedido_Usuario_UsuarioId",
                table: "Pedido");

            migrationBuilder.DropForeignKey(
                name: "FK_PedidoProducto_Producto_ProductoId",
                table: "PedidoProducto");

            migrationBuilder.DropForeignKey(
                name: "FK_PedidoProducto_Usuario_UsuarioId",
                table: "PedidoProducto");

            migrationBuilder.DropForeignKey(
                name: "FK_Producto_ImagenProducto_ImagenId",
                table: "Producto");

            migrationBuilder.DropForeignKey(
                name: "FK_Reserva_Mesa_MesaId",
                table: "Reserva");

            migrationBuilder.DropForeignKey(
                name: "FK_Reserva_Usuario_UsuarioId",
                table: "Reserva");

            migrationBuilder.DropTable(
                name: "ImagenProducto");

            migrationBuilder.DropIndex(
                name: "IX_Reserva_MesaId",
                table: "Reserva");

            migrationBuilder.DropIndex(
                name: "IX_Reserva_UsuarioId",
                table: "Reserva");

            migrationBuilder.DropIndex(
                name: "IX_Producto_ImagenId",
                table: "Producto");

            migrationBuilder.DropIndex(
                name: "IX_PedidoProducto_ProductoId",
                table: "PedidoProducto");

            migrationBuilder.DropIndex(
                name: "IX_PedidoProducto_UsuarioId",
                table: "PedidoProducto");

            migrationBuilder.DropIndex(
                name: "IX_Pedido_UsuarioId",
                table: "Pedido");

            migrationBuilder.DropIndex(
                name: "IX_EmpleadoTurnoMesa_EmpleadoTurnoId",
                table: "EmpleadoTurnoMesa");

            migrationBuilder.DropIndex(
                name: "IX_EmpleadoTurnoMesa_MesaId",
                table: "EmpleadoTurnoMesa");

            migrationBuilder.DropIndex(
                name: "IX_EmpleadoTurno_EmpleadoId",
                table: "EmpleadoTurno");

            migrationBuilder.DropIndex(
                name: "IX_EmpleadoTurno_TurnoId",
                table: "EmpleadoTurno");

            migrationBuilder.DropColumn(
                name: "ImagenId",
                table: "Producto");

            migrationBuilder.DropColumn(
                name: "ProductoId",
                table: "PedidoProducto");

            migrationBuilder.RenameColumn(
                name: "UsuarioId",
                table: "Reserva",
                newName: "IdUsuario");

            migrationBuilder.RenameColumn(
                name: "MesaId",
                table: "Reserva",
                newName: "IdMesa");

            migrationBuilder.RenameColumn(
                name: "UsuarioId",
                table: "PedidoProducto",
                newName: "IdUsuario");

            migrationBuilder.RenameColumn(
                name: "UsuarioId",
                table: "Pedido",
                newName: "IdUsuario");

            migrationBuilder.RenameColumn(
                name: "MesaId",
                table: "EmpleadoTurnoMesa",
                newName: "IdTurno");

            migrationBuilder.RenameColumn(
                name: "EmpleadoTurnoId",
                table: "EmpleadoTurnoMesa",
                newName: "IdMesa");

            migrationBuilder.RenameColumn(
                name: "TurnoId",
                table: "EmpleadoTurno",
                newName: "IdTurno");

            migrationBuilder.RenameColumn(
                name: "EmpleadoId",
                table: "EmpleadoTurno",
                newName: "IdEmpleado");

            migrationBuilder.AddColumn<bool>(
                name: "IdProducto",
                table: "PedidoProducto",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "IdMozo",
                table: "Mesa",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "IdEmpleado",
                table: "EmpleadoTurnoMesa",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
