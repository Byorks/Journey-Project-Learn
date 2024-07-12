using FluentValidation.Results;
using Journey.Communication.Requests;
using Journey.Communication.Responses;
using Journey.Exception;
using Journey.Exception.ExceptionsBase;
using Journey.Infrastructure;
using Journey.Infrastructure.Entities;
using Microsoft.EntityFrameworkCore;

namespace Journey.Application.UseCases.Activities.Register
{
    public class RegisterActivityForTripUseCase
    {
        public ResponseActivityJson Execute(Guid tripId, RequestRegisterActivityJson request)
        {
            var dbContext = new JourneyDbContext();

            var trip = dbContext
                .Trips
                .FirstOrDefault(trip => trip.Id == tripId);

            if (trip == null)
            {
                throw new NotFoundException(ResourceErrorMessages.TRIP_NOT_FOUND);
            }

            Validate(trip, request);

            var entity = new Activity
            {
                Name = request.Name,
                Date = request.Date,
                // TripId não precisa porque o entityFramework faz automaticamente
                //Status já foi definido na instancia
                TripId = tripId
            };

            // Acessando Atividades de Viagens
            // Quando colocamos o ! queremos dizer que o compilador pode confiar que nãos erá null
            //trip!.Activities.Add(entity); // Essa linha não dá certo no SQLite, por conta de bug, terá que atualizar

            // Ele automaticamente vai colocar o Trip.Id como idTrip
            dbContext.Activities.Add(entity);
            dbContext.SaveChanges();

            return new ResponseActivityJson
            {
                Date = entity.Date,
                Id = entity.Id,
                Name = entity.Name,
                Status = (Communication.Enums.ActivityStatus)entity.Status 
            };
        }

        // ? - Serve para dizer que a Trip pode ser null
        private void Validate(Trip? trip,RequestRegisterActivityJson request)
        {
            if (trip == null)
            {
                throw new NotFoundException(ResourceErrorMessages.TRIP_NOT_FOUND);
            }

            var validator = new RegisterActivityValidator();

            var result = validator.Validate(request);

            if ((request.Date >= trip.StartDate && request.Date <= trip.EndDate) == false) // Ele deixou dessa maneira porque acha mais fácil de ler
            {
                result.Errors.Add(new ValidationFailure("Date", ResourceErrorMessages.DATE_NOT_WITHIN_TRAVEL_PERIOD));
            }

            if(result.IsValid == false)
            {
                // Trazendo as mensagens que estão na lista de tipo ValidationFailure, selecionando as ErrorMessage e transformando em lista
                var errorMessages = result.Errors.Select(error => error.ErrorMessage).ToList();

                throw new ErrorOnValidationException(errorMessages);
            }
        }
    }
}
