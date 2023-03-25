using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using YouthActionDotNet.Controllers;
using YouthActionDotNet.DAL;
using YouthActionDotNet.Data;
using YouthActionDotNet.Models;

namespace YouthActionDotNet.Control
{
    public class FeedbackControl : IUserInterfaceCRUD<Feedback>
    {
        private GenericRepositoryIn<Feedback> FeedbackRepositoryIn;
        private GenericRepositoryOut<Feedback> FeedbackRepositoryOut;
        private GenericRepositoryIn<ServiceCenter> ServiceCenterRepositoryIn;
        private GenericRepositoryOut<ServiceCenter> ServiceCenterRepositoryOut;

        JsonSerializerSettings settings = new JsonSerializerSettings { ReferenceLoopHandling = ReferenceLoopHandling.Ignore };

        public FeedbackControl(DBContext context)
        {
            FeedbackRepositoryIn = new GenericRepositoryIn<Feedback>(context);
            FeedbackRepositoryOut = new GenericRepositoryOut<Feedback>(context);
            ServiceCenterRepositoryIn = new GenericRepositoryIn<ServiceCenter>(context);
            ServiceCenterRepositoryOut = new GenericRepositoryOut<ServiceCenter>(context);
        }

        public bool Exists(string id)
        {
            return FeedbackRepositoryOut.GetByID(id) != null;
        }

        public async Task<ActionResult<string>> Create(Feedback template)
        {

            var project = await FeedbackRepositoryIn.InsertAsync(template);
            return JsonConvert.SerializeObject(new { success = true, message = "Feedback Created", data = project }, settings);
        }

        public async Task<ActionResult<string>> Get(string id)
        {
            var project = await FeedbackRepositoryOut.GetByIDAsync(id);
            if (project == null)
            {
                return JsonConvert.SerializeObject(new { success = false, message = "Feedback Not Found" });
            }
            return JsonConvert.SerializeObject(new { success = true, data = project, message = "Feedback Successfully Retrieved" });
        }

        public async Task<ActionResult<string>> Update(string id, Feedback template)
        {
            if (id != template.FeedbackId)
            {
                return JsonConvert.SerializeObject(new { success = false, data = "", message = "Feedback Id Mismatch" });
            }
            await FeedbackRepositoryIn.UpdateAsync(template);
            try
            {
                return JsonConvert.SerializeObject(new { success = true, data = template, message = "Feedback Successfully Updated" });
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Exists(id))
                {
                    return JsonConvert.SerializeObject(new { success = false, data = "", message = "Feedback Not Found" });
                }
                else
                {
                    throw;
                }
            }
        }

        public async Task<ActionResult<string>> UpdateAndFetchAll(string id, Feedback template)
        {
            if (id != template.FeedbackId)
            {
                return JsonConvert.SerializeObject(new { success = false, data = "", message = "Feedback Id Mismatch" });
            }
            await FeedbackRepositoryIn.UpdateAsync(template);
            try
            {
                var projects = await FeedbackRepositoryOut.GetAllAsync();
                return JsonConvert.SerializeObject(new { success = true, data = projects, message = "Feedback Successfully Updated" });
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Exists(id))
                {
                    return JsonConvert.SerializeObject(new { success = false, data = "", message = "Feedback Not Found" });
                }
                else
                {
                    throw;
                }
            }
        }

        public async Task<ActionResult<string>> Delete(string id)
        {
            var project = await FeedbackRepositoryOut.GetByIDAsync(id);
            if (project == null)
            {
                return JsonConvert.SerializeObject(new { success = false, data = "", message = "Feedback Not Found" });
            }
            await FeedbackRepositoryIn.DeleteAsync(id);
            return JsonConvert.SerializeObject(new { success = true, data = "", message = "Feedback Successfully Deleted" });
        }

        public async Task<ActionResult<string>> Delete(Feedback template)
        {
            var project = await FeedbackRepositoryOut.GetByIDAsync(template.FeedbackId);
            if (project == null)
            {
                return JsonConvert.SerializeObject(new { success = false, data = "", message = "Feedback Not Found" });
            }
            await FeedbackRepositoryIn.DeleteAsync(template);
            return JsonConvert.SerializeObject(new { success = true, data = "", message = "Feedback Successfully Deleted" });
        }

        public async Task<ActionResult<string>> All()
        {
            var projects = await FeedbackRepositoryOut.GetAllAsync();
            return JsonConvert.SerializeObject(new { success = true, data = projects, message = "Feedbacks Successfully Retrieved" });
        }

        public string Settings()
        {
            Settings settings = new Settings();
            settings.ColumnSettings = new Dictionary<string, ColumnHeader>();
            settings.FieldSettings = new Dictionary<string, InputType>();

            // settings.ColumnSettings.Add("ActualExpenses", new ColumnHeader { displayHeader = "Feedback Feedback" });
            // settings.FieldSettings.Add("ActualExpenses", new InputType { type = "text", displayLabel = "Feedback Id", editable = false, primaryKey = true });
            // settings.FieldSettings.Add("FeedbackId", new InputType { type = "number", displayLabel = "Feedback Feedback", editable = true, primaryKey = false });

          
            return JsonConvert.SerializeObject(new { success = true, data = settings, message = "Settings Successfully Retrieved" });
        }


    }
}