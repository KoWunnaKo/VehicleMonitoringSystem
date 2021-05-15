using Microsoft.EntityFrameworkCore.Migrations;

namespace VMS_Backend.Data.Migrations
{
    public partial class chatAttachmentsFieldsRenaming : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "type",
                table: "chat_message",
                newName: "content_type");

            migrationBuilder.RenameColumn(
                name: "attachment_path",
                table: "chat_message",
                newName: "attachment_name");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "content_type",
                table: "chat_message",
                newName: "type");

            migrationBuilder.RenameColumn(
                name: "attachment_name",
                table: "chat_message",
                newName: "attachment_path");
        }
    }
}
