const { createClient } = require("redis");

const client = async () => {
    const connection = createClient({
        password: "Gg5Wi1ICInZfgG2VD5JgewuFnxcIGjAI",
        socket: {
            host: "redis-14918.c292.ap-southeast-1-1.ec2.cloud.redislabs.com",
            port: 14918,
        },
    });
    await connection.connect();
    return connection;
};

module.exports = client;