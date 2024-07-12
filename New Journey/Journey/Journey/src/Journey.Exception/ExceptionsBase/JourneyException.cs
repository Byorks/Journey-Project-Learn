using System.Net;

namespace Journey.Exception.ExceptionsBase
{
    public abstract class JourneyException : SystemException
    {
        public JourneyException(string message) : base(message) // Estou repassando a message para o construtor da SystemException
        {
            
        }

        // Todas as classes que herdam essa classe devem implementar esse método
        public abstract HttpStatusCode GetStatusCode();

        // obrigando a devolver uma lista de errors
        public abstract IList<string> GetErrorMessages();
    }
}
