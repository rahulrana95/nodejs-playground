import express,{ Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import router from '../routes';
import loginHandler from '../handlers/login';
import signupHandler from '../handlers/signup';
import prisma, { ensureDbConnectedMiddleware } from '../prisma';


// Define a custom interface for the Express Request object
interface CustomRequest extends Request {
    db: typeof prisma;
  }

  
const app = express();

app.use(ensureDbConnectedMiddleware);

app.use(cors());
app.use(morgan('combined'));
// Parse JSON bodies
app.use(bodyParser.json());

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res)  => {
    res.status(200);
    res.json({
        health: 'ok1'
    })
})

app.use('/api', router);
app.post('/login', loginHandler)
app.post('/signup', signupHandler)


export default app;