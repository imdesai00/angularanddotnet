using System;
using System.Collections.Generic;

namespace corewebapiandangular.Models;

public partial class CityMaster
{
    public int CityId { get; set; }

    public string CityName { get; set; } = null!;

    public int StateId { get; set; }

    public int CountryId { get; set; }

}
