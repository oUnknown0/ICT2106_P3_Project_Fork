using System;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace YouthActionDotNet.Models
{
    public class Budget
    {
        public Budget()
        {
            this.BudgetId = Guid.NewGuid().ToString();
        }
        public string BudgetId { get; set; }

        // public string ProjectName { get; set; }

        // public string ProjectDescription { get; set; }

        // public string ProjectStartDate { get; set; }

        // public string ProjectEndDate { get; set; }

        // public string ProjectCompletionDate { get; set; }

        // public string ProjectStatus { get; set; }

        // public string ProjectType { get; set; }

        public double ProjectBudget { get; set; }


    }
}