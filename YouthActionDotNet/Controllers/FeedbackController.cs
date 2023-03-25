using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using YouthActionDotNet.Control;
using YouthActionDotNet.DAL;
using YouthActionDotNet.Data;
using YouthActionDotNet.Models;

namespace YouthActionDotNet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedbackController : ControllerBase, IUserInterfaceCRUD<Feedback>
    {
        private FeedbackControl FeedbackControl;
        JsonSerializerSettings settings = new JsonSerializerSettings { ReferenceLoopHandling = ReferenceLoopHandling.Ignore };

        public FeedbackController(DBContext context)
        {
            FeedbackControl = new FeedbackControl(context);
        }

        public bool Exists(string id)
        {
            return FeedbackControl.Get(id) != null;
        }

        [HttpPost("Create")]
        public async Task<ActionResult<string>> Create(Feedback template)
        {
            return await FeedbackControl.Create(template);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<string>> Get(string id)
        {
            return await FeedbackControl.Get(id);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<string>> Update(string id, Feedback template)
        {
            return await FeedbackControl.Update(id, template);
        }

        [HttpPut("UpdateAndFetch/{id}")]
        public async Task<ActionResult<string>> UpdateAndFetchAll(string id, Feedback template)
        {
            return await FeedbackControl.UpdateAndFetchAll(id, template);
        }

        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult<string>> Delete(string id)
        {
            return await FeedbackControl.Delete(id);
        }

        [HttpDelete("Delete")]
        public async Task<ActionResult<string>> Delete(Feedback template)
        {
            return await FeedbackControl.Delete(template);
        }

        [HttpGet("All")]
        public async Task<ActionResult<string>> All()
        {
            return await FeedbackControl.All();
        }

        [HttpGet("Settings")]
        public string Settings()
        {
            return FeedbackControl.Settings();
        }
    }
}