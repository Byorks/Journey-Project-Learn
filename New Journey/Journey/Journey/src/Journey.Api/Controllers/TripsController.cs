using Journey.Application.UseCases.Activities.Complete;
using Journey.Application.UseCases.Activities.Register;
using Journey.Application.UseCases.Trips.Delete;
using Journey.Application.UseCases.Trips.GetAll;
using Journey.Application.UseCases.Trips.GetById;
using Journey.Application.UseCases.Trips.Register;
using Journey.Communication.Requests;
using Journey.Communication.Responses;
using Microsoft.AspNetCore.Mvc;
// Ctrl + R + G -> Coloca os using em ordem alfabética e remove os não utilizados
namespace Journey.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TripsController : ControllerBase
    {
        //EndPoint é uma função especial, precisa do nome [HttpPost]
        // FromBody serve para direcionar onde será lido os dados que vão ser transformados em atributos
        [HttpPost]
        [ProducesResponseType(typeof(ResponseShortTripJson), StatusCodes.Status201Created)] // Exemplos de boa documentação dando exemplos de resposta
        [ProducesResponseType(typeof(ResponseErrorsJson), StatusCodes.Status400BadRequest)]
        public IActionResult Register([FromBody] RequestRegisterTripJson request)
        {
            // Verificação se tudo da request está de acordo
            // var é somente uma forma simplificada de dizer o tipo de RegisterTripUseCase
            var useCase = new RegisterTripUseCase();

            var response = useCase.Execute(request);

            return Created(string.Empty, response); // Devolvendo resposta status code 201

            #region Try Catch Retirado
            // ---- Essa parte não é mais necessária por conta da implementação do Filter  ----
            //catch (JourneyException ex) // Apenas as excessões do Journey entrarão nesse catch
            //{
            //    return BadRequest(ex.Message);
            //}

            //catch // Se for qualquer outra exceção, quando ainda não foi tratado
            //{
            //    return StatusCode(StatusCodes.Status500InternalServerError, "Erro desconhecido");
            //}
            #endregion
        }

        [HttpGet]
        [ProducesResponseType(typeof(ResponseTripsJson), StatusCodes.Status200OK)]

        public IActionResult GetAll()
        {
            var UseCase = new GetAllTripsUseCase();

            var result = UseCase.Execute();

            return Ok(result);
        }

        //[HttpGet("by-id")] // Precisa de um endereço diferente quando a mais do mesmo método sendo executado
        [HttpGet]
        [Route("{id}")]
        [ProducesResponseType(typeof(ResponseTripJson), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ResponseErrorsJson), StatusCodes.Status404NotFound)]
        public IActionResult GetById([FromRoute] Guid id)
        {
            var useCase = new GetTripByIdUseCase();

            var response = useCase.Execute(id);

            return Ok(response);
        }

        [HttpDelete]
        [Route("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(ResponseErrorsJson), StatusCodes.Status404NotFound)]
        public IActionResult DeleteById([FromRoute] Guid id)
        {
            var useCase = new DeleteTripByIdUseCase();

            useCase.Execute(id);

            return NoContent();
        }

        [HttpPost]
        [Route("{tripId}/activity")]
        [ProducesResponseType(typeof(ResponseActivityJson), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(ResponseErrorsJson), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ResponseErrorsJson), StatusCodes.Status404NotFound)]
        public IActionResult RegisterActivity (
            [FromRoute] Guid tripId,
            [FromBody] RequestRegisterActivityJson request)
        {
            var useCase = new RegisterActivityForTripUseCase();

            var response = useCase.Execute(tripId, request);

            return Created(string.Empty, response);
        }


        [HttpPut]
        [Route("{tripId}/activity/{activityId}/complete")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(ResponseErrorsJson), StatusCodes.Status404NotFound)]
        public IActionResult CompleteActivity(
            [FromRoute] Guid tripId,
            [FromRoute] Guid activityId)
        {
            var useCase = new CompleteActivityForTripUseCase();

            useCase.Execute(tripId, activityId);

            return NoContent();
        }
    }
}
