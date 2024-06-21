
//Esta es Funcion que esta flotando y retornalos valores sin necesitadad del return debido a ({})
export const EnvConfiguration = ( ) => ({

    port         : process.env.PORT || 3000,
    enviroment   : process.env.NODE_ENV || 'dev',
    mongodb      : process.env.MONGO_DB,
    apiPokeApi   : process.env.API_POKEAPI || 'https://pokeapi.co/api/v2/pokemon?limit=150&offset=0',
    defaultLimit : process.env.DEFAULT_LIMIT || 7,

})