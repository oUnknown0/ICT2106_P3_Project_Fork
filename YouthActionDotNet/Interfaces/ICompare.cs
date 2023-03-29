using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace YouthActionDotNet.Models
{
    internal interface ICompare<T>
    {
        int CompareById(T y);
    }
}