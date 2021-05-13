using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace VMS_Backend.Data.Migrations
{
    public partial class workTaskComment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_vehicle_data_employee_user_id",
                table: "vehicle_data");

            migrationBuilder.RenameColumn(
                name: "user_id",
                table: "vehicle_data",
                newName: "employee_id");

            migrationBuilder.RenameIndex(
                name: "IX_vehicle_data_user_id",
                table: "vehicle_data",
                newName: "IX_vehicle_data_employee_id");

            migrationBuilder.CreateTable(
                name: "work_task_comment",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    company_id = table.Column<int>(type: "integer", nullable: false),
                    author_id = table.Column<string>(type: "text", nullable: true),
                    text = table.Column<string>(type: "character varying(5000)", maxLength: 5000, nullable: true),
                    date = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    task_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_work_task_comment", x => x.id);
                    table.ForeignKey(
                        name: "FK_work_task_comment_company_company_id",
                        column: x => x.company_id,
                        principalTable: "company",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_work_task_comment_employee_author_id",
                        column: x => x.author_id,
                        principalTable: "employee",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_work_task_comment_work_task_task_id",
                        column: x => x.task_id,
                        principalTable: "work_task",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_work_task_comment_author_id",
                table: "work_task_comment",
                column: "author_id");

            migrationBuilder.CreateIndex(
                name: "IX_work_task_comment_company_id",
                table: "work_task_comment",
                column: "company_id");

            migrationBuilder.CreateIndex(
                name: "IX_work_task_comment_task_id",
                table: "work_task_comment",
                column: "task_id");

            migrationBuilder.AddForeignKey(
                name: "FK_vehicle_data_employee_employee_id",
                table: "vehicle_data",
                column: "employee_id",
                principalTable: "employee",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_vehicle_data_employee_employee_id",
                table: "vehicle_data");

            migrationBuilder.DropTable(
                name: "work_task_comment");

            migrationBuilder.RenameColumn(
                name: "employee_id",
                table: "vehicle_data",
                newName: "user_id");

            migrationBuilder.RenameIndex(
                name: "IX_vehicle_data_employee_id",
                table: "vehicle_data",
                newName: "IX_vehicle_data_user_id");

            migrationBuilder.AddForeignKey(
                name: "FK_vehicle_data_employee_user_id",
                table: "vehicle_data",
                column: "user_id",
                principalTable: "employee",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
