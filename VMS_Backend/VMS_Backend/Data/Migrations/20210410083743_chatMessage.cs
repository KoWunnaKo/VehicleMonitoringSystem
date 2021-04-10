using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace VMS_Backend.Data.Migrations
{
    public partial class chatMessage : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "chat_message",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    company_id = table.Column<int>(type: "integer", nullable: false),
                    text = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    date = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    unread = table.Column<bool>(type: "boolean", nullable: false),
                    sender_id = table.Column<string>(type: "text", nullable: true),
                    receiver_id = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_chat_message", x => x.id);
                    table.ForeignKey(
                        name: "FK_chat_message_company_company_id",
                        column: x => x.company_id,
                        principalTable: "company",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_chat_message_employee_receiver_id",
                        column: x => x.receiver_id,
                        principalTable: "employee",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_chat_message_employee_sender_id",
                        column: x => x.sender_id,
                        principalTable: "employee",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_work_task_driver_id",
                table: "work_task",
                column: "driver_id");

            migrationBuilder.CreateIndex(
                name: "IX_work_task_operator_id",
                table: "work_task",
                column: "operator_id");

            migrationBuilder.CreateIndex(
                name: "IX_work_task_status_id",
                table: "work_task",
                column: "status_id");

            migrationBuilder.CreateIndex(
                name: "IX_chat_message_company_id",
                table: "chat_message",
                column: "company_id");

            migrationBuilder.CreateIndex(
                name: "IX_chat_message_receiver_id",
                table: "chat_message",
                column: "receiver_id");

            migrationBuilder.CreateIndex(
                name: "IX_chat_message_sender_id",
                table: "chat_message",
                column: "sender_id");

            migrationBuilder.AddForeignKey(
                name: "FK_work_task_employee_driver_id",
                table: "work_task",
                column: "driver_id",
                principalTable: "employee",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_work_task_employee_operator_id",
                table: "work_task",
                column: "operator_id",
                principalTable: "employee",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_work_task_work_task_status_status_id",
                table: "work_task",
                column: "status_id",
                principalTable: "work_task_status",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_work_task_employee_driver_id",
                table: "work_task");

            migrationBuilder.DropForeignKey(
                name: "FK_work_task_employee_operator_id",
                table: "work_task");

            migrationBuilder.DropForeignKey(
                name: "FK_work_task_work_task_status_status_id",
                table: "work_task");

            migrationBuilder.DropTable(
                name: "chat_message");

            migrationBuilder.DropIndex(
                name: "IX_work_task_driver_id",
                table: "work_task");

            migrationBuilder.DropIndex(
                name: "IX_work_task_operator_id",
                table: "work_task");

            migrationBuilder.DropIndex(
                name: "IX_work_task_status_id",
                table: "work_task");
        }
    }
}
