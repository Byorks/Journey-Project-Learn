using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Journey.Exception.ExceptionsBase
{
    public class JourneyException : SystemException
    {
        public JourneyException(string message) : base(message) // Estou repassando a message para o construtor da SystemException
        {
            
        }
    }
}
