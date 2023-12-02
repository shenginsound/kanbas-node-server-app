import * as dao from "./dao.js";
// let currentUser = null;
function UserRoutes(app) {
const createUser = async (req, res) => {
    const user = await dao.createUser(req.body);
    res.json(user);
    };
    app.post("/api/users", createUser);

  const deleteUser = async (req, res) => {
      const status = await dao.deleteUser(req.params.userId);
      res.json(status);
  };

  const findAllUsers = async (req, res) => {
    const users = await dao.findAllUsers();
    res.json(users);
  };

  const findUserById = async (req, res) => {
    const user = await dao.findUserById(req.params.userId);
    res.json(user);
  };

  const updateUser = async (req, res) => {
    const { userId } = req.params;
    const status = await dao.updateUser(userId, req.body);
    const currentUser = await dao.findUserById(userId);
    req.session["currentUser"] = currentUser;
    res.json(status);
  };

  const signup = async (req, res) => {
    const user = await dao.findUserByUsername(
      req.body.username);
    if (user) {
      res.sendStatus(400);
    //   .json(
    //     { message: "Username already taken" });
    }
    const currentUser = await dao.createUser(req.body);
    req.session['currentUser'] = currentUser;
    res.json(currentUser);
  };

  const signin = async (req, res) => {
    const { username, password } = req.body;
    // const currentUser = await dao.findUserByCredentials(username, password);
    // req.session['currentUser'] = currentUser;
    // res.json(currentUser);
    const user = await dao.findUserByCredentials(username, password);
    if (user) {
      const currentUser = user;
      req.session["currentUser"] = currentUser;
      res.json(user);
    } else {

      res.sendStatus(403);
    }
   };
   
   const signout = (req, res) => {
    try{
        console.log("Inside signout");

    req.session.destroy();
    res.json(200);

    }
    catch(error)
    {
        console.error('Error during sign-out:', error);
    // Send an error response
    res.sendStatus(500);
    // .json({ error: 'Internal server error' });

    }
    
  };

  const account = async (req, res) => {res.json(req.session['currentUser']);
  };
  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/account", account);
}
export default UserRoutes;