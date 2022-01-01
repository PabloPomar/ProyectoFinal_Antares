# ProyectoFinal_Antares
Proyecto Final UTN Rosario

Agregar migración para cambiar base de datos

Tienen que ejecutar este comando en terminal en donde tengan la carpeta 

(o usen el comando: cd ..\ProyectoFinal_Antares\ProyectoFinal.Antares.Api) 

Necesitan tener instalado SQL server con dblocal

```bash
dotnet ef migrations add vX -p ..\ProyectoFinal.Antares.Data -c ApplicationDbContext
```

Actualizar base de datos 

```bash
dotnet ef database update -p ..\ProyectoFinal.Antares.Data -c ApplicationDbContext
```