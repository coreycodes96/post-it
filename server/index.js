import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import postRoutes from './routes/posts.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
//initialise express
const app = express();

dotenv.config();

//middleware info
app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));
app.use(cors());

//routes
app.use('/user', authRoutes);
app.use('/posts', postRoutes);

//connect to mongoDB
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    app.listen(PORT, () => console.log(`Server on: ${PORT}`));
})
.catch((err) => {
    console.log(err);
});