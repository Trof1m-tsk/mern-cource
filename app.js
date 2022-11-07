const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = config.get('port') || 5050;
const mongoURI = config.get('mongoURI');

app.use(express.json({ extended: true }));

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/link', require('./routes/link.routes'));
app.use('/to', require('./routes/redirect.routes'));

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')));

  app.get('*', ( req, res ) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

async function start() {
  try {
    await mongoose.connect(mongoURI, {});

    app.listen(PORT, () => console.log(`Application has been started on port ${ PORT }!!!`));
  } catch (e) {
    console.error('Server error: ', e);
    process.exit(1);
  }
}

start().then(() => console.log('Application is working'));
