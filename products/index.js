const server = require('./src/server.js');
const { conn} = require('./src/data/index.js');
const port = 8001;


conn.sync({ force: true }).then(() => {
  server.listen(port, () => {
    console.log(`%s listening at ${port}`); 
  });
});