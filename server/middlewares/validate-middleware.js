// await schema.parseAsync(req.body) is the line used for async parsing and validation of the zod form
//Use .parse(data:unknown) T for a sync version which returns full information if valid else an error
const validate = (schema) => async (req, res, next) => {
    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next();
    } catch (err) {
        // res.status(400).json({ msg: error['issues'][0]['message'] });
        const status = 422;
        const message = err["issues"][0]["message"];
        const error = {
            status,
            message,
        };
        next(error);
    }
};

module.exports = validate;
