const app = require('express')();
const FormData = require('form-data');

app.get('/', (req, res) => {
  const form = new FormData();
  form.append('author', 'Chanshi');
  // form.append('location', { lat: 453.563, lon: 34.453 });
  form.append('content', 'dgs');
  form.append('img', new Buffer('gfdgfdgds'));

  // res.set('Content-Type', `multipart/form-data; boundary=${form.getBoundary()}`);
  form.pipe(res);
});

app.listen(8000);
