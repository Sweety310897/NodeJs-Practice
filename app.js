const express=require('express');
const app = express();
const userRouter = require('./routes/users');

const port = process.env.PORT || 3000;

const config = require('config');

console.log('Application name: '+ config.get('name'));

app.use("/api", userRouter);
app.listen(port, () => console.log('listening on port' + port));
