using System.Net;

namespace Journey.Exception.ExceptionsBase
{
    public class NotFoundException : JourneyException
    {
        public NotFoundException(string message) : base(message)
        {
        }

        public override IList<string> GetErrorMessages()
        {   
            // Lista de string simplificada
            return [ Message ];
        }

        public override HttpStatusCode GetStatusCode()
        {
            return HttpStatusCode.NotFound;
        }
    }
}
