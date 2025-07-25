import express from 'express';
import routes from './routes';
import { errorHandler } from './middlewares/error.middleware';
import cors from 'cors'

const app = express();

app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true,
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

// Error middleware
app.use(errorHandler);

export default app;
