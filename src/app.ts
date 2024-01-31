import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/gobalErrorHandler';
import rootRoute from './app/routes';
const app = express();

//parser
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Test if api working
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'successfully working Express Backend setup Application',
  });
});

app.use('/api/v1', rootRoute)

//Handle errors globally
app.use(globalErrorHandler);


//page not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: {
      path: req.originalUrl,
      message: 'Not Found',
    },
  });
  next();
});
export default app;
