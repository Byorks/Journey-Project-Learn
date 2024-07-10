using Journey.Application.UseCases.Trips.GetAll;
using Journey.Application.UseCases.Trips.Register;
using Journey.Communication.Requests;
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
        public IActionResult GetAll()
        {
            var UseCase = new GetAllTripsUseCase();

            var result = UseCase.Execute();

            return Ok(result);
        }
    }
}
