using System;
using Newtonsoft.Json;
namespace YouthActionDotNet.Models
{
    public class Feedback
    {
        public Feedback()
        {
            this.FeedbackId = Guid.NewGuid().ToString();
        }

        public string FeedbackId { get; set; }

        public string ProjectName { get; set; }

        public int Satisfaction { get; set; }

        public bool Recommend { get; set; }

        public string FeedbackText { get; set; }

        public int PhoneNumber {get;set;}

        

        

        
    }
}