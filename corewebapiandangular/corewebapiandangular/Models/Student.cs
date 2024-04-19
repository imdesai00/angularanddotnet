using System;
using System.Collections.Generic;

namespace corewebapiandangular.Models;

public partial class Student
{
    public int StudentId { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public int? Age { get; set; }

    public string? Gender { get; set; }

    public double? Grade { get; set; }
}
