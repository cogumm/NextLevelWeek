import { celebrate, Joi } from "celebrate";

export default {
    celebrate: celebrate(
        {
            body: Joi.object().keys({
                name: Joi.string().required(),
                email: Joi.string().required().email(),
                whatsapp: Joi.number().required(),
                latitude: Joi.number().required(),
                longitude: Joi.number().required(),
                uf: Joi.string().required().max(2),
                city: Joi.string().required(),
                items: Joi.string().required(),
            }),
        },
        {
            abortEarly: false,
        }
    ),
};
