import express from "express";
import cors from "cors";
import helmet from "helmet";
import authRouter from "./modules/auth/auth.routes.js";
import loadsRouter from "./modules/loads/loads.routes.js";
import shipperRouter from "./modules/shipper/shipper.routes.js";
import carrierRouter from "./modules/carrier/carrier.routes.js";

const app: express.Express = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/loads", loadsRouter);
app.use("/api/shipper", shipperRouter);
app.use("/api/carrier", carrierRouter);

// app.use(errorHandler);

export default app;
