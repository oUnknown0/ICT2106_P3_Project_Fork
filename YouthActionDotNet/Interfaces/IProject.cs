using System;
using Microsoft.AspNetCore.Mvc;

namespace YouthActionDotNet.Models
{
    public interface IProject
    {
        string getProject(string ProjectId, string ProjectName, string ProjectDescription, string ProjectStatus, string ProjectVolunteer, string ServiceCenterId, string TimelineId, string BudgetId);
        string getProjectDetails(string ProjectId);
        string[] getAllProjectStatus();


    }
}