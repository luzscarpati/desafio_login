import express from "express";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
import productRouter from './routes/product.router.js';
import cartRouter from './routes/cart.router.js';
import viewRouter from './routes/views.router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// Rutas del cart y de prodcts
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

//Configuración de handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use('/', viewRouter);

const PORT = 8080;

app.listen(PORT, () => console.log(`Server ok on port ${PORT}`));
