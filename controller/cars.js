const carUsecase = require("../usecase/car");

exports.getCars = async (req, res, next) => {
    try {
    const data = await carUsecase.getCars();

    res.status(200).json({
        message: "Successs",
        data,
    });
} catch (error){
    next(error);
}
};

exports.getCar = async (req, res, next) => {
    try{
    const { id } = req.params;
    const data = await carUsecase.getCar(id);
    if (!data) {
        return next({
            message: `Car with id ${id} is not found!`,
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

exports.createCar = async (req, res, next) => {
    try{
    const { name, spec_id, rentPerDay, size } = req.body;
    const {image} = req.files;
    if (!name || name == "") {
        return next({
            message: "name must be provided!",
            statusCode: 400,
        });
    }
    if (!spec_id || spec_id == "") {
        return next({
            message: "spec_id must be provided!",
            statusCode: 400,
        });
    }

    if (!rentPerDay || rentPerDay == "") {
        return next({
            message: "rentPerDay must be provided!",
            statusCode: 400,
        });
    }
    if (!size|| size== "") {
        return next({
            message: "size must be provided!",
            statusCode: 400,
        });
    }

    const data = await carUsecase.createCar({
        name, spec_id, image, rentPerDay, size,
    });

    res.status(201).json({
        message: "Successs",
        data,
    });
}catch (error){
    next(error);
}
};

exports.updateCar = async (req, res, next) => {
    try{
    const { id } = req.params;
    const { name, spec_id, rentPerDay, size } = req.body;
    const {image} = req.files;
    if (!name || name == "") {
        return next({
            message: "name must be provided!",
            statusCode: 400,
        });
    }
    if (!spec_id || spec_id == "") {
        return next({
            message: "spec_id must be provided!",
            statusCode: 400,
        });
    }
    if (!rentPerDay || rentPerDay == "") {
        return next({
            message: "rentPerDay must be provided!",
            statusCode: 400,
        });
    }
    if (!size|| size== "") {
        return next({
            message: "size must be provided!",
            statusCode: 400,
        });
    }

    const data = await carUsecase.updateCar(id, { name, spec_id, image, rentPerDay, size });

    res.status(200).json({
        message: "Successs",
        data,
    });
}catch (error){
    next(error);
}
};

exports.deleteCar = async (req, res, next) => {
    try{
    const { id } = req.params;
        
    const data = await carUsecase.deleteCar(id);

    res.status(200).json({
        message: "Successs",
        data,
    });
} catch (error){
    next(error);
}
};