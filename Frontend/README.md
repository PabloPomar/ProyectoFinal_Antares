# Build

```
eas build -p android --profile preview1
```

PD: se necesita tener una cuenta en https://expo.dev y estar logeado desde el cliente de la terminal (`expo login`)

## Builds publicadas

Pueden acceder a las builds ya creadas en el siguiente link:
https://expo.dev/accounts/andybotpre/projects/Frontend/builds. Se pueden descargar el .apk para instalarlo en Android

# Dependencias
Link a la documentación:
* React Native: https://reactnative.dev/docs/components-and-apis
* React Native Elements: https://reactnativeelements.com/docs/3.4.2/getting_started
* React Navigation: https://reactnavigation.org/docs/getting-started
* Redux: https://redux.js.org/
* ...


# Para correr la app
Deben crear un archivo .env en la raíz del proyecto Frontend (copiando .env.example), donde ponen el link que les genera el ngrok (para el certificado SSL).

Para el certificado de ngrok...
```<ruta-de-ngrok>/ngrok http https://localhost:7001 -host-header="localhost:7001"```