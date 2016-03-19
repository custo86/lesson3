module.exports = {
  "get": {
    "/users": require("./controllers/usersController").getAction
  },
  "post": {
    "/users": require("./controllers/usersController").postAction
    }
};
