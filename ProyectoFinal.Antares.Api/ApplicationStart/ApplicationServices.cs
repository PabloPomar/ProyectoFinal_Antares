﻿using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Newtonsoft.Json;
using NSwag.Generation.Processors.Security;
using ProyectoFinal.Antares.Api.Perfiles;
using ProyectoFinal.Antares.Data;
using ProyectoFinal.Antares.Data.Repositories;
using ProyectoFinal.Antares.Domain;
using ProyectoFinal.Antares.Domain.Repositories;
using ProyectoFinal.Antares.Domain.Servicios;

namespace ProyectoFinal.Antares.Api.ApplicationStart
{
    internal static class ApplicationServices
    {
        public static void ConfigureApplicationServices(IServiceCollection services, IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("Application");

            services.AddDbContext<ApplicationDbContext>(c =>
            {
                c.UseSqlServer(connectionString);
                c.ConfigureWarnings(w =>
                {
                    w.Throw(RelationalEventId.MultipleCollectionIncludeWarning);
                    w.Ignore(CoreEventId.RowLimitingOperationWithoutOrderByWarning);
                });
            });

            services.AddControllers()
                .AddNewtonsoftJson(
                    options => options.SerializerSettings.DateTimeZoneHandling = DateTimeZoneHandling.Utc);

            services.AddAutoMapper(typeof(ApplicationMappingProfile));
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped(typeof(IBaseRepository<>), typeof(BaseRepository<>));
            services.AddScoped(typeof(IReferenceService<>), typeof(ReferenceService<>));
            
            services.AddScoped<ITurnoRepository, TurnoRepository>();
            services.AddScoped<ITurnoService, TurnoService>();
            
            services.AddHealthChecks();

            services.AddHttpContextAccessor();
            
            services.AddOpenApiDocument(doc =>
            {
                doc.Title = Recursos.ApiDescription.Titulo;
                doc.Description = Recursos.ApiDescription.Descripcion;
                doc.OperationProcessors.Add(new AspNetCoreOperationSecurityScopeProcessor("bearer"));
            });
        }
    }
}
