import Ajv from "ajv";
import addFormats from "ajv-formats";

const ajv = new Ajv({ allErrors: true, coerceTypes: true });
addFormats(ajv);

export const validate = (schema: object) => {
    const validateFn = ajv.compile(schema);
    return (req: any, res: any, next: any) => {
        const valid = validateFn(req.body);
        if (!valid) {
            const errors = validateFn.errors?.map((err) => `${err.instancePath} ${err.message}`).join(", ");
            return res.status(400).json({ message: errors || "Invalid request body" });
        }
        next();
    };
};
