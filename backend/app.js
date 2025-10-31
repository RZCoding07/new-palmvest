import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import { db_master } from './config/database.js'; // Adjust the path as necessary
import { rateLimit } from 'express-rate-limit'
import compression from "compression";
import router from './routes/index.js';
import PicaParams from './models/PicaParamsModel.js';
import Users from './models/UserModel.js';
import PicaRules from './models/PicaRulesModel.js';

dotenv.config();

const app = express();
app.use(compression());
// Allow all origins (or specify specific origins if needed)
app.use(cors({
    origin: "*", // Frontend origins
    methods: 'GET, POST, PUT, DELETE, OPTIONS', // Allowed methods
    allowedHeaders: 'Content-Type, Authorization, X-Requested-With', // Allowed headers
    credentials: true, // If you need cookies to be included in requests
}));

app.use(bodyParser.json({ limit: '50mb' }));  // Increase the limit as needed
app.use(helmet());  // Security middleware
app.use(morgan('dev'));

const initializeDatabaseMaster = async () => {
    try {
        await db_master.authenticate(); // Test connection
        // await db_master.sync({ alter: true }); // Sync models with the database
    
        console.log('Connection master has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

initializeDatabaseMaster();


app.use(express.json());  // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));  // Parse URL-encoded bodies\
app.use(cookieParser());  // Parse Cookie header and populate req.cookies

app.set('trust proxy', 1);

app.use((err, req, res, next) => {
    console.error('Error occurred:', err);
    res.status(err.status || 500).json({
        error: {
            message: err.message || 'Internal Server Error'
        }
    });
});

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 menit
    max: 100, // Maksimal 100 permintaan per menit per IP
    message: "Terlalu banyak permintaan dari IP ini. Salam dari RZ Security Protocol!",
})

// Apply the rate limiting middleware to all requests.
app.use(limiter)
app.use('/api', router); // Use your router for API routes

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
  });
  