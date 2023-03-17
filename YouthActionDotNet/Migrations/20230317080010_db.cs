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

            migrationBuilder.RenameColumn(
                name: "ProjectType",
                table: "Project",
                newName: "TimelineId");

            migrationBuilder.RenameColumn(
                name: "ProjectStartDate",
                table: "Project",
                newName: "BudgetId");

            migrationBuilder.CreateTable(
                name: "Budget",
                columns: table => new
                {
                    BudgetId = table.Column<string>(type: "TEXT", nullable: false),
                    ProjectBudget = table.Column<double>(type: "REAL", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Budget", x => x.BudgetId);
                });

            migrationBuilder.CreateTable(
                name: "Timeline",
                columns: table => new
                {
                    TimelineId = table.Column<string>(type: "TEXT", nullable: false),
                    ProjectStartDate = table.Column<string>(type: "TEXT", nullable: true),
                    ProjectEndDate = table.Column<string>(type: "TEXT", nullable: true),
                    ProjectCompletionDate = table.Column<string>(type: "TEXT", nullable: true),
                    ProjectStatus = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Timeline", x => x.TimelineId);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Project_BudgetId",
                table: "Project",
                column: "BudgetId");

            migrationBuilder.CreateIndex(
                name: "IX_Project_TimelineId",
                table: "Project",
                column: "TimelineId");

            migrationBuilder.AddForeignKey(
                name: "FK_Project_Budget_BudgetId",
                table: "Project",
                column: "BudgetId",
                principalTable: "Budget",
                principalColumn: "BudgetId");

            migrationBuilder.AddForeignKey(
                name: "FK_Project_Timeline_TimelineId",
                table: "Project",
                column: "TimelineId",
                principalTable: "Timeline",
                principalColumn: "TimelineId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Project_Budget_BudgetId",
                table: "Project");

            migrationBuilder.DropForeignKey(
                name: "FK_Project_Timeline_TimelineId",
                table: "Project");

            migrationBuilder.DropTable(
                name: "Budget");

            migrationBuilder.DropTable(
                name: "Timeline");

            migrationBuilder.DropIndex(
                name: "IX_Project_BudgetId",
                table: "Project");

            migrationBuilder.DropIndex(
                name: "IX_Project_TimelineId",
                table: "Project");

            migrationBuilder.RenameColumn(
                name: "TimelineId",
                table: "Project",
                newName: "ProjectType");

            migrationBuilder.RenameColumn(
                name: "BudgetId",
                table: "Project",
                newName: "ProjectStartDate");

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
        }
    }
}
