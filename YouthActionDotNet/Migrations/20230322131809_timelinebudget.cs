using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace YouthActionDotNet.Migrations
{
    /// <inheritdoc />
    public partial class timelinebudget : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "BudgetId",
                table: "Project",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TimelineId",
                table: "Project",
                type: "TEXT",
                nullable: true);

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

            migrationBuilder.DropColumn(
                name: "BudgetId",
                table: "Project");

            migrationBuilder.DropColumn(
                name: "TimelineId",
                table: "Project");
        }
    }
}
