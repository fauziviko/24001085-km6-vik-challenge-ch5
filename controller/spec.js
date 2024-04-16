const specUsecase = require("../usecase/spec");

exports.getSpecs = async (req, res, next) => {
    try {
    const data = await specUsecase.getSpecs();

    res.status(200).json({
        message: "Successs",
        data,
    });
} catch (error){
    next(error);
}
};

exports.getSpec = async (req, res, next) => {
    try{
    const { id } = req.params;
    const data = await specUsecase.getSpec(id);
    if (!data) {
        return next({
            message: `Spec with id ${id} is not found!`,
            statusCode: 404,
        });
    }

    res.status(200).json({
        message: "Successs",
        data,
    });
}catch (error) {
    next(error);
}
};

exports.createSpec = async (req, res, next) => {
    try{
    const { type } = req.body;
    if (!type || type == "") {
        return next({
            message: "type must be provided!",
            statusCode: 400,
        });
    }

    const data = await specUsecase.createSpec({
        type,
    });

    res.status(201).json({
        message: "Successs",
        data,
    });
}catch (error){
    next(error);
}
};

exports.updateSpec= async (req, res, next) => {
    try{
    const { id } = req.params;
    const { type } = req.body;
    if (!type || type == "") {
        return next({
            message: "type must be provided!",
            statusCode: 400,
        });
    }

    const data = await specUsecase.updateSpec(id, { type });

    res.status(200).json({
        message: "Successs",
        data,
    });
}catch (error){
    next(error);
}
};

exports.deleteSpec = async (req, res, next) => {
    try{
    const { id } = req.params;

    const data = await specUsecase.deleteSpec(id);

    res.status(200).json({
        message: "Successs",
        data,
    });
} catch (error){
    next(error);
}
};