namespace Journey.Exception.ExceptionsBase
{
    public abstract class JourneyException : SystemException
    {
        public JourneyException(string message) : base(message) // Estou repassando a message para o construtor da SystemException
        {
            
        }
    }
}
