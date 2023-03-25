using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace YouthActionDotNet.Migrations
{
    /// <inheritdoc />
    public partial class db : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProjectBudget",
                table: "Project");

            migrationBuilder.DropColumn(
                name: "ProjectCompletionDate",
                table: "Project");

            migrationBuilder.DropColumn(
                name: "ProjectEndDate",
                table: "Project");

            migrationBuilder.DropColumn(
                name: "ProjectStartDate",
                table: "Project");

            migrationBuilder.DropColumn(
                name: "ProjectType",
                table: "Project");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "ProjectBudget",
                table: "Project",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<string>(
                name: "ProjectCompletionDate",
                table: "Project",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProjectEndDate",
                table: "Project",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProjectStartDate",
                table: "Project",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProjectType",
                table: "Project",
                type: "TEXT",
                nullable: true);
        }
    }
}
