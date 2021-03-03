import Joi from 'Joi';

export const signUpValidation = (data) => {
    //validation
    const signUpSchema = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(256).required()
    });

    //options for validation schema
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };

    const {error} = signUpSchema.validate(data, options);

    if(error){
        return error.details;
    }else{
        return false;
    }
}

export const signInValidation = (data) => {
    //validation
    const signInSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(256).required()
    });

    //options for validation schema
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };

    const {error} = signInSchema.validate(data, options);

    if(error){
        return error.details;
    }else{
        return false;
    }
}

export const postsValidation = (data) => {
    //validation
    const postSchema = Joi.object({
        body: Joi.string().required(),
        username: Joi.string().required(),
        user_id: Joi.required(),
    });

    //options for validation schema
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };

    const {error} = postSchema.validate(data, options);

    if(error){
        return error.details;
    }else{
        return false;
    }
}