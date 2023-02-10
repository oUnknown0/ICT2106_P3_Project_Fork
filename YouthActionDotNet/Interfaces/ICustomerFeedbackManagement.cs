namespace YouthActionDotNet.Controllers
{
    internal interface ICustomerFeedbackManagement<T> where T : class
    {
        T getCustomerFeedback(string customerFeedbackID, string customerFeedbackDate,
       int customerContact);
        T doFeedbackAnalysis(string feedbackID);
    }
}