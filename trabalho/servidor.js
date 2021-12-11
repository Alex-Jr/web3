const express = require('express');
const cors = require("cors");
const app = express();
const PORT = 8000;
const { sequelize, Usuarios } = require('./models')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: '*' }));

// create
app.post('/usuarios', async (req, res) => {
  const {
    id,
    nome
  } = req.body;

  const usuario = await Usuarios.create({
    id,
    nome
  })

  res.send(usuario)
})

// read - list
app.get('/usuarios', async (req, res) => {
  const usuarios = await Usuarios.findAll();

  res.send(usuarios)
})

// read - one
app.get('/usuarios/:id', async (req, res) => {
  const usuario = await Usuarios.findByPk(req.params.id)

  if(!usuario) {
    res.status(404).end();
    return;
  }

  res.send(usuario)
})

// update
app.put('/usuarios/:id', async (req, res) => {
  const {
    params: {
      id
    },
    body: {
      nome
    }
  } = req;

  const usuario = await Usuarios.findByPk(id)

  if(!usuario) {
    res.status(404).end();
    return;
  }

  const updated = await usuario.update({ nome })

  res.send(updated)
})

// delete
app.delete('/usuarios/:id', async (req, res) => {
  const {
    id
  } = req.params

  const usuario = await Usuarios.findByPk(id)

  if(!usuario) {
    res.status(404).end();
    return;
  }

  const deleted = await usuario.destroy();

  res.send(deleted);
})


app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
  sequelize.sync();
});

