const { specs, cars } = require("../../models");
const { getData, setData, deleteData } = require("../../helper/redis");

exports.getSpecs = async () => {
    const data = await specs.findAll({
        include: {
            model: cars,
        },
    });
    return data;
};

exports.getSpec = async (id) => {
    const key = `specs:${id}`;
  
        let data = await getData(key);
        if (data) {
            return data;
        }
        data = await specs.findAll({
            where: {
                id,
            },
            include: {
                model: cars,
            },
        });
        if (data.length > 0) {
            await setData(key, data, 300);
            return data[0];
        }

        throw new Error(`Spec is not found!`);
};

exports.createSpec = async (payload) => {
 
        // Create data to postgres
        const data = await specs.create(payload);

        // Save to redis (cache)
        const key = `specs:${data.id}`;
        await setData(key, data, 300);

        return data;
};

exports.updateSpec = async (id, payload) => {
    const key = `specs:${id}`;
   
        // update data to postgres
        await specs.update(payload, {
            where: {
                id,
            },
        });

        // get data from postgres
        const data = await specs.findAll({
            where: {
                id,
            },
            include: {
                model: cars,
            },
        });
        if (data.length > 0) {
            // save to redis (cache)
            await setData(key, data[0], 300);

            return data[0];
        }

        throw new Error(`Spec is not found!`);

};

exports.deleteSpec = async (id) => {
    const key = `specs:${id}`;

        const data = await specs.destroy({ where: { id } });
        await deleteData(key);
        return null;

    
};