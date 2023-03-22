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
    public class BudgetControl : IUserInterfaceCRUD<Budget>
    {
        private GenericRepositoryIn<Budget> BudgetRepositoryIn;
        private GenericRepositoryOut<Budget> BudgetRepositoryOut;
        private GenericRepositoryIn<ServiceCenter> ServiceCenterRepositoryIn;
        private GenericRepositoryOut<ServiceCenter> ServiceCenterRepositoryOut;

        JsonSerializerSettings settings = new JsonSerializerSettings { ReferenceLoopHandling = ReferenceLoopHandling.Ignore };

        public BudgetControl(DBContext context)
        {
            BudgetRepositoryIn = new GenericRepositoryIn<Budget>(context);
            BudgetRepositoryOut = new GenericRepositoryOut<Budget>(context);
            ServiceCenterRepositoryIn = new GenericRepositoryIn<ServiceCenter>(context);
            ServiceCenterRepositoryOut = new GenericRepositoryOut<ServiceCenter>(context);
        }

        public bool Exists(string id)
        {
            return BudgetRepositoryOut.GetByID(id) != null;
        }

        public async Task<ActionResult<string>> Create(Budget template)
        {

            var project = await BudgetRepositoryIn.InsertAsync(template);
            return JsonConvert.SerializeObject(new { success = true, message = "Budget Created", data = project }, settings);
        }

        public async Task<ActionResult<string>> Get(string id)
        {
            var project = await BudgetRepositoryOut.GetByIDAsync(id);
            if (project == null)
            {
                return JsonConvert.SerializeObject(new { success = false, message = "Budget Not Found" });
            }
            return JsonConvert.SerializeObject(new { success = true, data = project, message = "Budget Successfully Retrieved" });
        }

        public async Task<ActionResult<string>> Update(string id, Budget template)
        {
            if (id != template.BudgetId)
            {
                return JsonConvert.SerializeObject(new { success = false, data = "", message = "Budget Id Mismatch" });
            }
            await BudgetRepositoryIn.UpdateAsync(template);
            try
            {
                return JsonConvert.SerializeObject(new { success = true, data = template, message = "Budget Successfully Updated" });
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Exists(id))
                {
                    return JsonConvert.SerializeObject(new { success = false, data = "", message = "Budget Not Found" });
                }
                else
                {
                    throw;
                }
            }
        }

        public async Task<ActionResult<string>> UpdateAndFetchAll(string id, Budget template)
        {
            if (id != template.BudgetId)
            {
                return JsonConvert.SerializeObject(new { success = false, data = "", message = "Budget Id Mismatch" });
            }
            await BudgetRepositoryIn.UpdateAsync(template);
            try
            {
                var projects = await BudgetRepositoryOut.GetAllAsync();
                return JsonConvert.SerializeObject(new { success = true, data = projects, message = "Budget Successfully Updated" });
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Exists(id))
                {
                    return JsonConvert.SerializeObject(new { success = false, data = "", message = "Budget Not Found" });
                }
                else
                {
                    throw;
                }
            }
        }

        public async Task<ActionResult<string>> Delete(string id)
        {
            var project = await BudgetRepositoryOut.GetByIDAsync(id);
            if (project == null)
            {
                return JsonConvert.SerializeObject(new { success = false, data = "", message = "Budget Not Found" });
            }
            await BudgetRepositoryIn.DeleteAsync(id);
            return JsonConvert.SerializeObject(new { success = true, data = "", message = "Budget Successfully Deleted" });
        }

        public async Task<ActionResult<string>> Delete(Budget template)
        {
            var project = await BudgetRepositoryOut.GetByIDAsync(template.BudgetId);
            if (project == null)
            {
                return JsonConvert.SerializeObject(new { success = false, data = "", message = "Budget Not Found" });
            }
            await BudgetRepositoryIn.DeleteAsync(template);
            return JsonConvert.SerializeObject(new { success = true, data = "", message = "Budget Successfully Deleted" });
        }

        public async Task<ActionResult<string>> All()
        {
            var projects = await BudgetRepositoryOut.GetAllAsync();
            return JsonConvert.SerializeObject(new { success = true, data = projects, message = "Budgets Successfully Retrieved" });
        }

        public string Settings()
        {
            Settings settings = new Settings();
            settings.ColumnSettings = new Dictionary<string, ColumnHeader>();
            settings.FieldSettings = new Dictionary<string, InputType>();

            settings.ColumnSettings.Add("ActualExpenses", new ColumnHeader { displayHeader = "Budget Budget" });
            settings.FieldSettings.Add("ActualExpenses", new InputType { type = "text", displayLabel = "Budget Id", editable = false, primaryKey = true });
            settings.FieldSettings.Add("BudgetId", new InputType { type = "number", displayLabel = "Budget Budget", editable = true, primaryKey = false });

          
            return JsonConvert.SerializeObject(new { success = true, data = settings, message = "Settings Successfully Retrieved" });
        }


    }
}