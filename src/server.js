import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import { __dirname } from "./utils.js";
import MongoStore from 'connect-mongo';
import userRouter from './routes/user.router.js'
import viewRouter from './routes/views.router.js';
import './db/connection.js';
import { MONGOATLAS } from "./db/connection.js";
import handlebars from "express-handlebars";
import productRouter from './routes/product.router.js';
import cartRouter from './routes/cart.router.js';

const app = express();

const mongoStoreOptions = {
  store: MongoStore.create({
    mongoUrl: MONGOATLAS,
    ttl: 120,
    crypto: {
      secret: '1234'
    }
  }),
  secret: "1234",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 120000,
  },
};

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//Configuración de handlebars
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

app.use(session(mongoStoreOptions));


app.use('/views', viewRouter);
app.use('/users', userRouter);
app.use('products', productRouter);
app.use('cart', cartRouter);

const PORT = 8080;
app.listen(PORT, () => console.log(`Server ok on port ${PORT}`));
