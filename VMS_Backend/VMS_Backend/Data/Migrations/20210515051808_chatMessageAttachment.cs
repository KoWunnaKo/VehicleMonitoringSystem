using Microsoft.EntityFrameworkCore.Migrations;

namespace VMS_Backend.Data.Migrations
{
    public partial class chatMessageAttachment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "attachment_path",
                table: "chat_message",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "attachment_path",
                table: "chat_message");
        }
    }
}
