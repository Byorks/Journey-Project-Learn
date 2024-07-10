using Journey.Infrastructure.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Journey.Infrastructure
{
    // Classe responsável por traduzir uma entidade em query e o contrário também
    public class JourneyDbContext : DbContext
    {
        // Classes trip é um espelho do que tem no Banco de Dados
        public DbSet<Trip> Trips { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // Configurando para traduzir uma entidade para terem acesso a um Banco de Dados
            optionsBuilder.UseSqlite("Data Source=C:\\Users\\vanes\\OneDrive\\Documentos\\Estudos\\RocketSeat\\New Journey\\Journey\\JourneyDatabase.db");
        }
    }
}
