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
    public class TimelineControl : IUserInterfaceCRUD<Timeline>
    {
        private GenericRepositoryIn<Timeline> TimelineRepositoryIn;
        private GenericRepositoryOut<Timeline> TimelineRepositoryOut;
        private GenericRepositoryIn<ServiceCenter> ServiceCenterRepositoryIn;
        private GenericRepositoryOut<ServiceCenter> ServiceCenterRepositoryOut;

        JsonSerializerSettings settings = new JsonSerializerSettings { ReferenceLoopHandling = ReferenceLoopHandling.Ignore };

        public TimelineControl(DBContext context)
        {
            TimelineRepositoryIn = new GenericRepositoryIn<Timeline>(context);
            TimelineRepositoryOut = new GenericRepositoryOut<Timeline>(context);
            ServiceCenterRepositoryIn = new GenericRepositoryIn<ServiceCenter>(context);
            ServiceCenterRepositoryOut = new GenericRepositoryOut<ServiceCenter>(context);
        }

        public bool Exists(string id)
        {
            return TimelineRepositoryOut.GetByID(id) != null;
        }

        public async Task<ActionResult<string>> Create(Timeline template)
        {

            var project = await TimelineRepositoryIn.InsertAsync(template);
            return JsonConvert.SerializeObject(new { success = true, message = "Timeline Created", data = project }, settings);
        }

        public async Task<ActionResult<string>> Get(string id)
        {
            var project = await TimelineRepositoryOut.GetByIDAsync(id);
            if (project == null)
            {
                return JsonConvert.SerializeObject(new { success = false, message = "Timeline Not Found" });
            }
            return JsonConvert.SerializeObject(new { success = true, data = project, message = "Timeline Successfully Retrieved" });
        }

        public async Task<ActionResult<string>> Update(string id, Timeline template)
        {
            if (id != template.TimelineId)
            {
                return JsonConvert.SerializeObject(new { success = false, data = "", message = "Timeline Id Mismatch" });
            }
            await TimelineRepositoryIn.UpdateAsync(template);
            try
            {
                return JsonConvert.SerializeObject(new { success = true, data = template, message = "Timeline Successfully Updated" });
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Exists(id))
                {
                    return JsonConvert.SerializeObject(new { success = false, data = "", message = "Timeline Not Found" });
                }
                else
                {
                    throw;
                }
            }
        }

        public async Task<ActionResult<string>> UpdateAndFetchAll(string id, Timeline template)
        {
            if (id != template.TimelineId)
            {
                return JsonConvert.SerializeObject(new { success = false, data = "", message = "Timeline Id Mismatch" });
            }
            await TimelineRepositoryIn.UpdateAsync(template);
            try
            {
                var projects = await TimelineRepositoryOut.GetAllAsync();
                return JsonConvert.SerializeObject(new { success = true, data = projects, message = "Timeline Successfully Updated" });
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Exists(id))
                {
                    return JsonConvert.SerializeObject(new { success = false, data = "", message = "Timeline Not Found" });
                }
                else
                {
                    throw;
                }
            }
        }

        public async Task<ActionResult<string>> Delete(string id)
        {
            var project = await TimelineRepositoryOut.GetByIDAsync(id);
            if (project == null)
            {
                return JsonConvert.SerializeObject(new { success = false, data = "", message = "Timeline Not Found" });
            }
            await TimelineRepositoryIn.DeleteAsync(id);
            return JsonConvert.SerializeObject(new { success = true, data = "", message = "Timeline Successfully Deleted" });
        }

        public async Task<ActionResult<string>> Delete(Timeline template)
        {
            var project = await TimelineRepositoryOut.GetByIDAsync(template.TimelineId);
            if (project == null)
            {
                return JsonConvert.SerializeObject(new { success = false, data = "", message = "Timeline Not Found" });
            }
            await TimelineRepositoryIn.DeleteAsync(template);
            return JsonConvert.SerializeObject(new { success = true, data = "", message = "Timeline Successfully Deleted" });
        }

        public async Task<ActionResult<string>> All()
        {
            var projects = await TimelineRepositoryOut.GetAllAsync();
            return JsonConvert.SerializeObject(new { success = true, data = projects, message = "Timelines Successfully Retrieved" });
        }

        public string Settings()
        {
            Settings settings = new Settings();
            settings.ColumnSettings = new Dictionary<string, ColumnHeader>();
            settings.FieldSettings = new Dictionary<string, InputType>();

            settings.ColumnSettings.Add("ProjectStartDate", new ColumnHeader { displayHeader = "Project Start Date" });
            settings.ColumnSettings.Add("ProjectEndDate", new ColumnHeader { displayHeader = "Project End Date" });
            settings.ColumnSettings.Add("ProjectCompletionDate", new ColumnHeader { displayHeader = "Project Completion Date" });
            settings.FieldSettings.Add("ProjectStartDate", new InputType { type = "datetime", displayLabel = "Project Start Date", editable = true, primaryKey = false });
            settings.FieldSettings.Add("ProjectEndDate", new InputType { type = "datetime", displayLabel = "Project End Date", editable = true, primaryKey = false });
            settings.FieldSettings.Add("ProjectCompletionDate", new InputType { type = "datetime", displayLabel = "Project Completion Date", editable = true, primaryKey = false });

            return JsonConvert.SerializeObject(new { success = true, data = settings, message = "Settings Successfully Retrieved" });
        }


    }
}