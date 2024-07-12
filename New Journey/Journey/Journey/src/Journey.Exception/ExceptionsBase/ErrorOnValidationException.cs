using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Journey.Exception.ExceptionsBase
{
    public class ErrorOnValidationException : JourneyException
    {
        // Customizando para salvar uma lista de erros
        private readonly IList<string> _errors;
        public ErrorOnValidationException(IList<string> messages) : base(string.Empty) // Nesse caso específico, será o unico a passar uma string vazia
        {
            _errors = messages;
        }

        public override IList<string> GetErrorMessages()
        {
           return _errors;
        }

        public override HttpStatusCode GetStatusCode()
        {
            return HttpStatusCode.BadRequest;
        }
    }
}
