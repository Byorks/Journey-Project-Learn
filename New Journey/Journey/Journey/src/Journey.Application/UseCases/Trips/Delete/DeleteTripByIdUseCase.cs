using Journey.Communication.Responses;
using Journey.Exception.ExceptionsBase;
using Journey.Exception;
using Journey.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Journey.Application.UseCases.Trips.Delete
{
    public class DeleteTripByIdUseCase
    {
        public void Execute(Guid id)
        {
            var dbContext = new JourneyDbContext();

            // Função que devolve a primeira entidade salve no DB que corresponda em ID
            // Se for apenas First, caso não ache o ID correspondente, ele entrara como exceção
            var trip = dbContext
                .Trips
                .Include(trip => trip.Activities) // Precisa desse include para ele pegar as lista de activities
                .FirstOrDefault(trip => trip.Id == id);

            if (trip is null)
            {
                // Se entrar com ID inválido, ele sera enviado essa exceção
                // Foi alterado para NotFoundException para eu direcionar corretamnete as exceções
                throw new NotFoundException(ResourceErrorMessages.TRIP_NOT_FOUND);
            }

            dbContext.Remove(trip);
            dbContext.SaveChanges();
        }
    }
}
