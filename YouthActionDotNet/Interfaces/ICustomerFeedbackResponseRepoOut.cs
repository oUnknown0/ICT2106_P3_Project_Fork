namespace YouthActionDotNet.Controllers
{
    internal interface ICustomerFeedbackResponseRepoOut<T> where T : class
    {
        T GenericRepositoryOut();
        T GetAll();
        T GetByID(object id);
        T GetAllAsync();
        T GetByIDAsync(object id);
    }
}