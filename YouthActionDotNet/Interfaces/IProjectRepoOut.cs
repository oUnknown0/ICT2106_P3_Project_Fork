namespace YouthActionDotNet.Controllers
{
    internal interface IProjectRepoOut<T> where T : class
    {
        T GenericRepositoryOut();
        T GetAll();
        T GetByID(object id);
        T GetAllAsync();
        T GetByIDAsync(object id);
    }
}