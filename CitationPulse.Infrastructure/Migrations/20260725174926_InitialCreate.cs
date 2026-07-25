using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CitationPulse.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Businesses",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Address = table.Column<string>(type: "TEXT", nullable: true),
                    PhoneNumber = table.Column<string>(type: "TEXT", nullable: true),
                    Website = table.Column<string>(type: "TEXT", nullable: true),
                    Latitude = table.Column<double>(type: "REAL", nullable: true),
                    Longitude = table.Column<double>(type: "REAL", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Businesses", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CitationChecks",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "TEXT", nullable: false),
                    BusinessId = table.Column<Guid>(type: "TEXT", nullable: false),
                    CoverageScore = table.Column<int>(type: "INTEGER", nullable: false),
                    ConsistencyScore = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CitationChecks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CitationChecks_Businesses_BusinessId",
                        column: x => x.BusinessId,
                        principalTable: "Businesses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CitationResults",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    ProviderName = table.Column<string>(type: "TEXT", nullable: false),
                    Status = table.Column<int>(type: "INTEGER", nullable: false),
                    MatchScore = table.Column<int>(type: "INTEGER", nullable: true),
                    NameMatches = table.Column<bool>(type: "INTEGER", nullable: true),
                    AddressMatches = table.Column<bool>(type: "INTEGER", nullable: true),
                    PhoneMatches = table.Column<bool>(type: "INTEGER", nullable: true),
                    WebsiteMatches = table.Column<bool>(type: "INTEGER", nullable: true),
                    DistanceInMeters = table.Column<double>(type: "REAL", nullable: true),
                    Notes = table.Column<string>(type: "TEXT", nullable: true),
                    FoundName = table.Column<string>(type: "TEXT", nullable: true),
                    FoundAddress = table.Column<string>(type: "TEXT", nullable: true),
                    FoundPhoneNumber = table.Column<string>(type: "TEXT", nullable: true),
                    FoundWebsite = table.Column<string>(type: "TEXT", nullable: true),
                    FoundLatitude = table.Column<double>(type: "REAL", nullable: true),
                    FoundLongitude = table.Column<double>(type: "REAL", nullable: true),
                    CitationCheckId = table.Column<Guid>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CitationResults", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CitationResults_CitationChecks_CitationCheckId",
                        column: x => x.CitationCheckId,
                        principalTable: "CitationChecks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CitationChecks_BusinessId",
                table: "CitationChecks",
                column: "BusinessId");

            migrationBuilder.CreateIndex(
                name: "IX_CitationResults_CitationCheckId",
                table: "CitationResults",
                column: "CitationCheckId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CitationResults");

            migrationBuilder.DropTable(
                name: "CitationChecks");

            migrationBuilder.DropTable(
                name: "Businesses");
        }
    }
}
