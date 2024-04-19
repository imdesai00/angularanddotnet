using corewebapiandangular.Models;
using Npgsql;
using System.Data;

namespace corewebapiandangular.Data
{
    public class CityDataAccess
    {
        private readonly string? _connectionString;

        public CityDataAccess(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("postgre");
        }
        public IEnumerable<CityMaster> getallCity()
        {
            var cityMasters = new List<CityMaster>();
            DataSet ds = new DataSet();

            using (var connection = new NpgsqlConnection(_connectionString))
            {
                using (var command = new NpgsqlCommand("select * from \"GetAllCityMasterData\"('ref001'); fetch all in \"ref001\";", connection))
                {
                    command.CommandType = CommandType.Text;
                    connection.Open();
                    NpgsqlDataAdapter adapter = new NpgsqlDataAdapter(command);
                    {
                        adapter.Fill(ds);
                        foreach (DataRow reader in ds.Tables[1].Rows)
                        {
                            var cityMaster = new CityMaster
                            {
                                CityId = Convert.ToInt32(reader["CityID"]),
                                CityName = Convert.ToString(reader["CityName"]),
                                StateId = Convert.ToInt32(reader["StateID"]),
                                CountryId = Convert.ToInt32(reader["CountryID"])
                            };
                            cityMasters.Add(cityMaster);
                        }
                    }
                }
            }
            return cityMasters;
        }

        public IEnumerable<CityMaster> getallCitybyid(int id)
        {
            var cityMasters = new List<CityMaster>();
            DataSet ds = new DataSet();

            using (var connection = new NpgsqlConnection(_connectionString))
            {
                using (var command = new NpgsqlCommand("select * from \"getCityByID\"(@ids,'ref0'); fetch all in \"ref0\";", connection))
                {
                    command.Parameters.AddWithValue("@ids", id);
                    command.CommandType = CommandType.Text;
                    connection.Open();
                    NpgsqlDataAdapter adapter = new NpgsqlDataAdapter(command);
                    {
                        adapter.Fill(ds);
                        foreach (DataRow reader in ds.Tables[1].Rows)
                        {
                            var cityMaster = new CityMaster
                            {
                                CityId = Convert.ToInt32(reader["CityID"]),
                                CityName = Convert.ToString(reader["CityName"]),
                                StateId = Convert.ToInt32(reader["StateID"]),
                                CountryId = Convert.ToInt32(reader["CountryID"])
                            };
                            cityMasters.Add(cityMaster);
                            return cityMasters;
                        }
                    }
                }
            }
            return null;
        }

        public void insertCitymaster(CityMaster cm)
        {
            using (var connection = new NpgsqlConnection(_connectionString))
            {
                connection.Open();
                using (var command = new NpgsqlCommand("call \"insertCityMaster\"(@cityname,@stateid,@countryid)", connection))
                {
                    command.Parameters.AddWithValue("@cityname", cm.CityName);
                    command.Parameters.AddWithValue("@stateid", cm.StateId);
                    command.Parameters.AddWithValue("@countryid", cm.CountryId);
                    command.ExecuteNonQuery();
                }
            }
        }
        public void updateCitymaster(CityMaster cm)
        {
            using (var connection = new NpgsqlConnection(_connectionString))
            {
                connection.Open();
                using (var command = new NpgsqlCommand("UPDATE \"CityMaster\" SET \"CityName\"=@cityname,  \"StateID\"=@stateid,  \"CountryID\"=@countryid WHERE \"CityID\" = @cityid", connection))
                {
                    command.Parameters.AddWithValue("@cityid", cm.CityId);
                    command.Parameters.AddWithValue("@CityName", cm.CityName);
                    command.Parameters.AddWithValue("@stateid", cm.StateId);
                    command.Parameters.AddWithValue("@countryid", cm.CountryId);
                    command.ExecuteNonQuery();
                }
            }
        }
        public void deleteCitymaster(int id)
        {
            using (var connection = new NpgsqlConnection(_connectionString))
            {
                connection.Open();
                using (var command = new NpgsqlCommand("call \"deleteCityMaster\"(@cityid)", connection))
                {
                    command.Parameters.AddWithValue("@cityid", DbType.Int16).Value = id;
                    command.ExecuteNonQuery();
                }
            }
        }

        public IEnumerable<StateMaster> getallstate()
        {
            var stateMasters = new List<StateMaster>();
            DataSet ds = new DataSet();

            using (var connection = new NpgsqlConnection(_connectionString))
            {
                connection.Open();
                using (var command = new NpgsqlCommand("select * from \"StateMaster\";", connection))
                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        var stateMaster = new StateMaster
                        {
                            StateId = Convert.ToInt32(reader["StateID"]),
                            StateName = Convert.ToString(reader["StateName"]),
                            CountryId = Convert.ToInt32(reader["CountryID"])
                        };
                        stateMasters.Add(stateMaster);
                    }
                }
            }
            return stateMasters;
        }

        public IEnumerable<CountryMaster> getcountrybystate(int id)
        {
            var countryMasters = new List<CountryMaster>();
            DataSet ds = new DataSet();

            using (var connection = new NpgsqlConnection(_connectionString))
            {
                connection.Open();
                using (var command = new NpgsqlCommand("select * from \"CountryMaster\" cm where cm.\"CountryID\" = (select \"CountryID\" from \"StateMaster\" sm where sm.\"StateID\" = @ids);", connection))
                {
                    command.Parameters.AddWithValue("@ids", id);
                    using (var reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            var countryMaster = new CountryMaster
                            {
                                CountryId = Convert.ToInt32(reader["CountryID"]),
                                CountryName = Convert.ToString(reader["CountryName"])
                            };
                            countryMasters.Add(countryMaster);
                        }
                    }
                }
            }
            return countryMasters;
        }

        public IEnumerable<CountryMaster> getcountrybyid(int id)
        {
            var countryMasters = new List<CountryMaster>();
            DataSet ds = new DataSet();


            using (var connection = new NpgsqlConnection(_connectionString))
            {
                connection.Open();
                using (var command = new NpgsqlCommand("select * from \"CountryMaster\" sm where sm.\"CountryID\" = @ids;", connection))
                {
                    command.Parameters.AddWithValue("@ids", id);
                    using (var reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            var countryMaster = new CountryMaster
                            {
                                CountryId = Convert.ToInt32(reader["CountryID"]),
                                CountryName = Convert.ToString(reader["CountryName"])

                            };
                            countryMasters.Add(countryMaster);
                            return countryMasters;
                        }
                    }
                }
            }
            return null;
        }

        public IEnumerable<CountryMaster> getallcountry()
        {
            var countryMasters = new List<CountryMaster>();
            DataSet ds = new DataSet();


            using (var connection = new NpgsqlConnection(_connectionString))
            {
                connection.Open();
                using (var command = new NpgsqlCommand("select * from \"CountryMaster\"", connection))
                {
                    using (var reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            var countryMaster = new CountryMaster
                            {
                                CountryId = Convert.ToInt32(reader["CountryID"]),
                                CountryName = Convert.ToString(reader["CountryName"])

                            };
                            countryMasters.Add(countryMaster);
                            ;
                        }
                    }
                }
            }
            return countryMasters;
        }
    }
}
