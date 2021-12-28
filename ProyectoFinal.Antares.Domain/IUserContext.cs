namespace Netto.Vertragsmanagement.Domain
{
    public interface IUserContext
    {
        /// <summary>
        ///     Determines the user name.
        /// </summary>
        /// <returns>The current users name.</returns>
        string GetPrincipalName();

        /// <summary>
        ///     Gets the sid of the current user.
        /// </summary>
        /// <returns>The sid of the current user.</returns>
        string GetSid();
    }
}
