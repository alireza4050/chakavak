const FormData = require('form-data');

async function respond(data, res) {
  const form = new FormData();
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const val = data[key];
      if (typeof val === 'object') {
        if (val.contentType && val.data) {
          form.append(key, val.data, { contentType: val.contentType });
        } else {
          form.append(key, JSON.stringify(val));
        }
      } else {
        form.append(key, val);
      }
    }
  }
  res.set('Content-Type', `multipart/form-data; boundary=${form.getBoundary()}`);
  form.pipe(res);
}

module.exports = respond;
