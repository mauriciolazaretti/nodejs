import express from "express";
import User from "./model/User";

const app = express();
app.use(express.json());

app.get("/users", async (req, resp) => {
  const list = await User.findAll({
    attributes: ["id", "name", "email"],
  });
  resp.send(list);
});

app.put('/user/:id', async (req, res) => {
    const user = await User.findByPk(req.body.id);
    user.set("name", req.body.name);
    user.set("email", req.body.email);
    user.set("password", req.body.password);
    await user.save();
    
    res.statusCode = 201;
    return res.send(user);
  }
  
  );
  app.get('/user/:id', async (req, res) => {
    let resultado = await User.findByPk(req.body.id);
    res.statusCode = 200;
    if(!resultado){
  
      res.statusCode = 400;
      return res.send("");
    }
    return res.send( resultado);
  });
  
  app.delete('/user/:id', async (req, res) => {
    const user = await User.findByPk(req.body.id);
    await user.destroy();
    res.statusCode = 200;
    return res.send("");
  }
  );
app.post("/user", async (req, resp) => {
  const { body } = req;

  const { count } = await User.findAndCountAll({
    where: {
      email: email,
    },
  });

  if (count) {
    return resp.status(400).send({
      error: "email existente",
    });
  }


  const user = await User.create({ name, email, password: body.password });
  resp.status(201).send({
    id: user.id,
    name: user.name,
    email: user.email,
  });
});

app.listen(3000, () => console.log("server is running..."));