

export const Validations = (schema) => async (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false })
    if (error) {
        return res.status(400).send({ errors: error.details.map((err) => err.message) });
    }
    next()
}