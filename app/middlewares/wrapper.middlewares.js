export default (controller) => async (req, res, next) => {
    console.log("je suis dans mon wrapper");
    try {
        await controller(req, res, next);
    } catch (error) {
        next(error);
    }
};

