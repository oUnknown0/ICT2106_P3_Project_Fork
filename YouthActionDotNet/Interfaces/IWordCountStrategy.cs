using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace YouthActionDotNet.Models
{
    internal interface IWordCountStrategy<T>
    {
        public Dictionary<string, int> wordCounter();
    }
}