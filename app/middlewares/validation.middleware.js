export default (schema, requestProperty) => async (req, _, next) => {
    console.log("Je suis dans le middleware validation", req[requestProperty]);
    try {
        await schema.validateAsync(req[requestProperty]);
        next();
    } catch (err) {
        next(err);
    }
};

