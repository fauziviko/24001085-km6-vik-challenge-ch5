const crypto = require("crypto");
const path = require("path");
const { specs, cars } = require("../../models");
const { uploader } = require("../../helper/cloudinary");
const { getData, setData, deleteData } = require("../../helper/redis");

exports.getCars = async () => {
    const data = await cars.findAll({
        include: {
            model: specs,
        },
    });
    return data;
};

exports.getCar = async (id) => {
    const key = `cars:${id}`;
        let data = await getData(key);
        if (data) {
            return data;
        }
        data = await cars.findAll({
            where: {
                id,
            },
            include: {
                model: specs,
            },
        });
        if (data.length > 0) {
            await setData(key, data[0], 300);
            return data[0];
        }
        throw new Error(`Car is not found!`);
};
   
exports.createCar = async (payload) => {
    if (payload.image) {

        const { image } = payload;

        image.publicId = crypto.randomBytes(16).toString("hex");

        image.name = `${image.publicId}${path.parse(image.name).ext}`;

        const imageUpload = await uploader(image);
        payload.image = imageUpload.secure_url;
    }
       const data = await cars.create(payload);

        const key = `cars:${data.id}`;
        await setData(key, data, 300);
 
    return data;
};

exports.updateCar = async (id, payload) => {
    const key = `cars:${id}`;

    if (payload.image) {
        // upload image to cloudinary
        const { image } = payload;

        // make unique filename -> 213123128uasod9as8djas
        image.publicId = crypto.randomBytes(16).toString("hex");

        // rename the file -> 213123128uasod9as8djas.jpg / 213123128uasod9as8djas.png
        image.name = `${image.publicId}${path.parse(image.name).ext}`;

        // Process to upload image
        const imageUpload = await uploader(image);
        payload.image = imageUpload.secure_url;
    }
   
        await cars.update(payload, {
            where: {
                id,
            },
        });

        const data =  await cars.findAll({
            where: {
                id,
            },
            include: {
                model: specs,
            },
        });
        if (data.length > 0) {
            await setData(key, data, 300); 
            return data [0];
    }
    throw new Error(`Car is not found!`);
};

exports.deleteCar = async (id) => {
    const key = `cars:${id}`;
        data = await cars.destroy({ where: { id } });

        await deleteData(key);
        return null;  
};