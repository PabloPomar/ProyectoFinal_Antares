using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProyectoFinal.Antares.Data.Migrations
{
    public partial class fechaHoraPedido : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "HoraEntrega",
                table: "Pedido",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "HoraPedido",
                table: "Pedido",
                type: "datetime2",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HoraEntrega",
                table: "Pedido");

            migrationBuilder.DropColumn(
                name: "HoraPedido",
                table: "Pedido");
        }
    }
}
