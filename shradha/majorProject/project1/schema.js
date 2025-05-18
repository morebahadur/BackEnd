const Joi = require("joi");
const listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.object({
            url: Joi.string().optional().allow("", null)
        }).optional(),
        price: Joi.number().required().min(0),
        country: Joi.string().required(),
        location: Joi.string().required(),
    }).required()
});
module.exports = { listingSchema };