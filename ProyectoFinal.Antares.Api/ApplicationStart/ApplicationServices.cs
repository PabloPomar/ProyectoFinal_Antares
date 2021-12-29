using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using NSwag.Generation.Processors.Security;
using ProyectoFinal.Antares.Api.Perfiles;
using ProyectoFinal.Antares.Data;
using ProyectoFinal.Antares.Domain;

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
            
            services.AddAutoMapper(typeof(ApplicationMappingProfile));
            services.AddScoped<IUnitOfWork, UnitOfWork>();
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
