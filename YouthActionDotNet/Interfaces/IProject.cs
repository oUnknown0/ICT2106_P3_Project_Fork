namespace YouthActionDotNet.Controllers
{
    internal interface IProjects<T> where T : class
    {
        T getProject(string projectID, string projectName, int serviceCentreID);
        T setProjectDetails(string projectID, string projectStartDate, string projectEndDate, int[] contributorsID, string projectStatus, string projectDescription, double projectBudget, double actualExpenses, string projectCompletionDate, int serviceCenterID);
        T getProjectDetails(string projectID);
        T getAllProjectStatus();
    }
}