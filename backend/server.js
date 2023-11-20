import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRoute from './routes/userRoutes.js';
import connectDB from './config/db.js'
import { notFound,errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();
const port = process.env.PORT || 5000;

connectDB();
const app = express();
app.use(express.json()); // to allow json data
app.use(express.urlencoded({extended:true})) // to allow form data

app.use(cookieParser);

app.use('/api/users',userRoute);

if(process.env.NODE_ENV ==='production'){
    const __dirname = path.resolve()
    app.use(express.static(path.join(__dirname,'frontend/dist')))
    app.get('*',(req,res) =>{
        res.sendFile(path.resolve(__dirname,'frontend/dist'))
    })
}
app.get('/',(req,res) => res.send('Srever is ready'))

app.use(notFound);
app.use(errorHandler);

app.listen(port, () =>{
    console.log(`Server started on Port: ${port}`)
})