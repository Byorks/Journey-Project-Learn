using Journey.Application.UseCases.Trips.GetAll;
using Journey.Application.UseCases.Trips.GetById;
using Journey.Application.UseCases.Trips.Register;
using Journey.Communication.Requests;
using Journey.Communication.Responses;
using Journey.Exception.ExceptionsBase;
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
        [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
        public IActionResult Register([FromBody] RequestRegisterTripJson request)
        {
            try
            {
                // Verificação se tudo da request está de acordo
                // var é somente uma forma simplificada de dizer o tipo de RegisterTripUseCase
                var useCase = new RegisterTripUseCase();

                var response = useCase.Execute(request);

                return Created(string.Empty, response); // Devolvendo resposta status code 201
            }
            catch (JourneyException ex) // Apenas as excessões do Journey entrarão nesse catch
            {
                return BadRequest(ex.Message);
            }

            catch // Se for qualquer outra exceção, quando ainda não foi tratado
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro desconhecido");
            }
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
        [ProducesResponseType(typeof(string), StatusCodes.Status404NotFound)]
        public IActionResult GetById([FromRoute] Guid id)
        {
            try
            {
                var useCase = new GetTripByIdUseCase();

                var response = useCase.Execute(id);

                return Ok(response);
            }
            catch (JourneyException ex)
            {
                return NotFound(ex.Message);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro desconhecido");
            }
        }
    }
}
