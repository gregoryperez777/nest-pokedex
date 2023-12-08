import * as Joi from 'joi';


/**
 * JOI valida las variables de entornos requeridas
 * sino existen y se le coloca valores por defectos entonces
 * las crea y asi cuando lleguen al archivo EnvConfiguration
 * ya tienen un valor
 */

export const JoiValidationSchema = Joi.object({
    MONGODB: Joi.required(),
    PORT: Joi.number().default(3005),
    DEFAULT_LIMIT: Joi.number().default(6)
});