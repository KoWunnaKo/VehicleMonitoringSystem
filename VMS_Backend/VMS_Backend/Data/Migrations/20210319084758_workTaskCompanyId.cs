using Microsoft.EntityFrameworkCore.Migrations;

namespace VMS_Backend.Data.Migrations
{
    public partial class workTaskCompanyId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "task_description",
                table: "work_task",
                newName: "description");

            migrationBuilder.RenameColumn(
                name: "task_comment",
                table: "work_task",
                newName: "comment");

            migrationBuilder.AddColumn<int>(
                name: "company_id",
                table: "work_task",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_work_task_company_id",
                table: "work_task",
                column: "company_id");

            migrationBuilder.AddForeignKey(
                name: "FK_work_task_company_company_id",
                table: "work_task",
                column: "company_id",
                principalTable: "company",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_work_task_company_company_id",
                table: "work_task");

            migrationBuilder.DropIndex(
                name: "IX_work_task_company_id",
                table: "work_task");

            migrationBuilder.DropColumn(
                name: "company_id",
                table: "work_task");

            migrationBuilder.RenameColumn(
                name: "description",
                table: "work_task",
                newName: "task_description");

            migrationBuilder.RenameColumn(
                name: "comment",
                table: "work_task",
                newName: "task_comment");
        }
    }
}
