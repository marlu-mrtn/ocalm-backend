export default (schema, requestProperty) => async (req, _, next) => {
    try {
        await schema.validateAsync(req[requestProperty]);
        next();
    } catch (err) {
        next(err);
    }
};

