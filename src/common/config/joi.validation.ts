import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
    PORT: Joi.number().default(3000),
    NODE_ENV: Joi.string().default('dev'),
    MONGO_DB: Joi.string().required(),
    API_POKEAPI: Joi.string().default('https://pokeapi.co/api/v2/pokemon?limit=150&offset=0'),
    DEFAULT_LIMIT: Joi.number().default(7),
})