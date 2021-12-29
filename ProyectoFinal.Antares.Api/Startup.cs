using System.Diagnostics.CodeAnalysis;
using FluentValidation.AspNetCore;
using Microsoft.EntityFrameworkCore;
using ProyectoFinal.Antares.Api.ApplicationStart;
using ProyectoFinal.Antares.Data;

namespace ProyectoFinal.Antares.Api;

    [ExcludeFromCodeCoverage]
    public class Startup
    {
        public Startup(IConfiguration configuration, IHostEnvironment environment)
        {
            Configuration = configuration;
            Environment = environment;
        }

        public IConfiguration Configuration { get; }

        public IHostEnvironment Environment { get; }

        public static void Configure(IApplicationBuilder app, IHostEnvironment env)
        {
            MigrateDbToLatestVersion(app);

            if (env.IsDevelopment())
                app.UseDeveloperExceptionPage();
            else
                app.UseHsts();

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();
            
            app.UseOpenApi();
            app.UseSwaggerUi3();
            app.UseReDoc(options => options.Path = "/redoc");
            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers()
                .AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<Startup>(t => t.ValidatorType.Name.EndsWith("Validator")));

            ApplicationServices.ConfigureApplicationServices(services, Configuration);
        }
        
        private static void MigrateDbToLatestVersion(IApplicationBuilder app)
        {
            using var scope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope();
            using var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
            context.Database.Migrate();
        }
    }