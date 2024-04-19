using corewebapiandangular.Data;
using corewebapiandangular.Models;
using corewebapiandangular.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Npgsql;
using System.Text;
using static System.Net.WebRequestMethods;

namespace corewebapiandangular
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigin",
                 builder => builder
                     .WithOrigins("http://localhost:4200")
                     .AllowAnyMethod()
                     .AllowAnyHeader());
            });

            services.AddAuthentication(opt =>
            {
                opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = "https://localhost:5050",
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("abcdefghijklmnopqrstuvwxyzsuperSecretKey@345")),
                    ClockSkew = TimeSpan.Zero
                };
            });

            services.AddControllers();
            var smtpSettings = Configuration.GetSection("SmtpSettings").Get<SmtpSettings>();
            services.AddSingleton(smtpSettings);
            services.AddSingleton<AuthDataAccess>();
            services.AddTransient<EmailService, EmailService>();
            services.AddTransient<TokenService, TokenService>();
            services.AddTransient<IJwtService, JwtService>();
            services.AddTransient<HashService, HashService>();
            services.AddSingleton<CityDataAccess>();
            services.AddSwaggerGen();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Your API", Version = "v1" });

                // Adding JWT Authentication to Swagger
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer"
                });

                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            },
                            Scheme = "oauth2",
                            Name = "Bearer",
                            In = ParameterLocation.Header,
                        },
                        new List<string>()
                    }
                });
            });
        }
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
            {
                app.UseCors("AllowSpecificOrigin");
                if (env.IsDevelopment())
                {
                    app.UseDeveloperExceptionPage();
                    app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Your API v1"));
                //app.UseSwaggerUI();
            }
                else
                {
                    app.UseExceptionHandler();
                }

                app.UseRouting();

                app.UseAuthentication();
                app.UseAuthorization();

                app.UseEndpoints(endpoints =>
                {
                    endpoints.MapControllers();
                });
            }
        }
    }
