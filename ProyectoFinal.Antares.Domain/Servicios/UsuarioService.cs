using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using ProyectoFinal.Antares.Domain.Helpers;
using ProyectoFinal.Antares.Domain.Modelos;
using ProyectoFinal.Antares.Domain.Repositories;

namespace ProyectoFinal.Antares.Domain.Servicios;

public class UsuarioService : ReferenceService<Usuario>, IUsuarioService
{
    private readonly IUsuarioRepository _repository;
    private readonly IUnitOfWork _unitOfWork;

    public UsuarioService(IUsuarioRepository repository, IUnitOfWork unitOfWork, ILogger<Usuario> logger) : base(repository, unitOfWork, logger)
    {
        _repository = repository;
        _unitOfWork = unitOfWork;
    }

    public override async Task SaveAsync(Usuario usuario)
    {
        usuario.Password = PasswordHash.HashPassword(usuario.Password);
        
        if (usuario.Id == 0)
        {
            var userExist = await _repository.ValidarNombreUsuarioAsync(usuario.NombreUsuario);

            if (userExist)
            {
                throw new Exception("Un usuario con ese nombre ya existe");
            }
            
            await _repository.AddAsync(usuario);
        }
        else
        {
            await _repository.UpdateAsync(usuario);
        }
        await _unitOfWork.SaveAsync();
    }

    public async Task<bool> ValidarUsuario(string nombreUsuario, string password)
    {
        return await _repository.ValidarUsuarioContraseñaAsync(nombreUsuario, password);
    }
    
    public async Task<Usuario?> GetUsuario(string nombreUsuario, string password)
    {
        return await _repository.GetUsuario(nombreUsuario, password);
    }
    
    public string GenerateToken(Usuario usuario)
    {
        const string mySecret = "asdv234234^&%&^%&^hjsdfb2%%%";
        var mySecurityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(mySecret));
        const string myIssuer = "https://localhost:7001";
        const string myAudience = "https://localhost:7001";
        var tokenHandler = new JwtSecurityTokenHandler();
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new Claim[]
            {
                new("userId", usuario.Id.ToString()),
                new("userName", usuario.NombreUsuario),
                new("userType", usuario.Tipo.ToString())
            }),
            Expires = DateTime.UtcNow.AddDays(7),
            Issuer = myIssuer,
            Audience = myAudience,
            SigningCredentials = new SigningCredentials(mySecurityKey, SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
}