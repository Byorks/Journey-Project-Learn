using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Journey.Communication.Responses
{
    public class ResponseErrorsJson
    {
        public IList<string> Errors { get; set; } = []; // Sempre inicia Vazia e não Null
        // Simplicação de  new List<string>();

        // Obrigando a sempre que instanciar, receber os errors
        public ResponseErrorsJson(IList<string> errors)
        {
            Errors = errors;
        }
    }
}
