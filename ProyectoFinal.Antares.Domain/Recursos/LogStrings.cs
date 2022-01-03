using System.Diagnostics.CodeAnalysis;

namespace ProyectoFinal.Antares.Domain.Recursos;

[ExcludeFromCodeCoverage]
public static class LogStrings
{
    
    public static class ReferenceService
    {
        public const string RequestedAll = "Buscando todos los elemento de tipo: {entity}.";

        public const string RequestedFind = "Buscando elemento de tipo: {entity} con filtro: {@filter}.";

        public const string RequestedOne = "Buscando elemento de tipo: {entity} con id: {id}.";

        public const string RequestedSave = "Guardado de entidad: {entity} demandada. Valor {@value}.";

        public const string RequestedAddRange = "Guardado de entidad: {entity} demandada.";

        public const string RequestedDelete = "Borrado de entidad {entity} con id {id} requerida.";

        public const string AddedNewValue = "Agregado de entidad {entity} con valor {@value} requerida.";

        public const string EditedValue =
            "Demandada edicion de entidad {entity}. Viejo valor: {@oldValue}. Nuevo valor {@value}.";

        public const string Saved = "Base de datos actualizada. Entidad: {entity}.";

        public const string Deleted = "Base de datos actualizada. Borrado {entity} con Id {id}.";

        public const string RangeAdded = "Agregando elementos de entidad {entity}. Entidades: {@entities}.";

        public const string VerifyExistence =
            "Buscando si entidad {entity} con Id: {id} existe.";

        public const string ElementExist =
            "Elemento de entidad {entity} con Id: {id} existe.";
    }
}