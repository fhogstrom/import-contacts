const express = require('express');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();
const port = 3000;
const path = require('path');

require('dotenv').config();

const salesforceAuth = require('./routes/SFauth');
const index = require('./routes/index');
const importComplete = require('./routes/importComplete');
const googleSignIn = require('./routes/googleSignIn');
const googleAuth = require('./routes/googleAuthCB');



app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());


app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', salesforceAuth);
app.use('/', index);
app.use('/', importComplete);
app.use('/', googleSignIn);
app.use('/', googleAuth);

// -- 404 and error handler

app.use((req, res, next) => {
  console.log('404 - page not found');
  res.status(404);
  res.render('not-found');
});

app.use((err, req, res, next) => {
  // always log the error
  console.error('ERROR', req.method, req.path, err);

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    res.status(500);
    res.render('server-error');
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
