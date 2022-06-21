/* Création d'une application express. */
const app = require("express")();

/* Il crée un serveur en utilisant le module http et en passant dans l'application express. */
const server = require("http").createServer(app);
const port = 3000;
/* Il crée un serveur socket.io. */
const io = require("socket.io")(server);

/* C'est un itinéraire. */
app.get("/", (requetes, results) => {
  results.sendFile(`${__dirname}/public/index.html`);
});

let users = 0;

io.on("connection", (socket) => {
  users++;
  console.log(socket.id);
  console.log("un user s'est connecté :)");

  console.log(`il y a ${users} connecté(e.s)`);

  socket.on("disconnect", () => {
    users--;
    console.log("un user est parti ....");
    console.log(`il y a ${users} connecté(e.s)`);
  });

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

server.listen(port, () => {
  console.log(`serveur en ligne : http://localhost:${port}`);
});
