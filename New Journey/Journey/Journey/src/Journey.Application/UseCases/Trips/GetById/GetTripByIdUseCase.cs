using Journey.Communication.Responses;
using Journey.Exception;
using Journey.Exception.ExceptionsBase;
using Journey.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Journey.Application.UseCases.Trips.GetById
{
    public class GetTripByIdUseCase
    {
        public ResponseTripJson Execute(Guid id)
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

            return new ResponseTripJson
            {
                Id = trip.Id,
                Name = trip.Name,
                StartDate = trip.StartDate,
                EndDate = trip.EndDate,
                Activities = trip.Activities.Select(activity => new ResponseActivityJson
                {
                    Id = activity.Id,
                    Name = activity.Name,
                    Date = activity.Date,
                    Status = (Communication.Enums.ActivityStatus)activity.Status
                }).ToList()
            };

        }
    }
}
