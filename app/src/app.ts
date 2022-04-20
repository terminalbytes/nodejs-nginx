import "module-alias/register";
require("dotenv").config({ path: "../.env" }); // Only used for development, when not running in a container
import http from "http";

import { AddressInfo } from "net";
import { sequelize } from "@db/index";
import { seedDatabase } from "@db/seeders";
import parseBodyAndRouteRequest from "@routes/index";
import { LISTEN_INET, PORT } from "@utils/constants";
import { logger } from "@utils/logger";



const server = http.createServer((req, res) => {
    parseBodyAndRouteRequest(req, res);
});

// Catch global errors
server.on("error", (e) => {
    logger.error({ error: e }, "Unhandled error on server");
});


const app = server.listen(PORT, LISTEN_INET, async () => {
    const { address, port } = app.address() as AddressInfo;
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });
        logger.info("Database is reachable");
    } catch (error) {
        logger.info({ error }, "Unable to reach the database");
        process.exit(1);
    }

    /**
     * DEMO SPECIFIC THINGS
     */
    await seedDatabase();

    /**
     * END
     */
    logger.info(`Server is listening at http://${address}:${port}`);
});