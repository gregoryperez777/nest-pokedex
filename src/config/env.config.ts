// Este es el archivo de configuracion de la aplicacion
// basicamente mappea las variables de entornos
// para pasarselas a la app


// Esta configuracion se esta usando en los modulos dentro de nest

// Por lo general este tipo de archivo 
// es suficiente para el desarrollo de cualquier aplicacion 
// pero si queremos se mas extrictos entonces usamos JOI que es un ValidationSchema para las variables de entornos

// una nota importante JOI crea las variables de entornos con valores por default si estos
// no se encuentran en el archivo .env ahora al crearlos hay que tener cuidado con el tipado
// por ejemplo en DEFAULTLIMIT le colocamos un + a process.env.DEFAULT_LIMIT para convertir 
// un '6':string que es como llega de JOI a un 6:numerico como se espera en la app 

export const EnvConfiguration = () => ({
    environment: process.env.NODE_ENV || 'dev',
    mongodb: process.env.MONGODB,
    port: process.env.PORT || 3002,
    defaultLimit: +process.env.DEFAULT_LIMIT || 7
});