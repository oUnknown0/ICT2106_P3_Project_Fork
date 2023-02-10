namespace YouthActionDotNet.Controllers
{
    internal interface IProjectRepoIn<T> where T : class
    {
        T GenericRepositoryIn();
        bool Insert();
        bool Update();
        bool Delete(object id);
        bool Delete();
        bool InsertAsync();
        bool UpdateAsync();
        bool DeleteAsync(object id);
        bool DeleteAsync();
    }
}