'use strict';
//require('dotenv').config();


const koa = require('koa');
const koaRouter = require('koa-router');
//var cors = require('@koa/cors');
const routes = require('./routes');

const app = new koa()
const router = new koaRouter()

//app.use(cors());
//app.use(session(app)); 

const db = require('./models');
const PORT = process.env.PORT || 3000;

app.context.db = db;
app.use(routes.routes())

router.get('texto', '/', (ctx) => {
   ctx.body = "Tarea 2 "
})
db.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
    app.listen(PORT, (err) => {
      if (err) {
        return console.error('Failed', err);
      }
      console.log(`Listening on port ${PORT}`);
      return app;
    });
  })
  .catch((err) => console.error('Unable to connect to the database:', err));
app.use(router.routes())
    .use(router.allowedMethods())

