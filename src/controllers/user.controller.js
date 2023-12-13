import UserServices from "../services/user.services.js";

const userService = new UserServices();

export default class UserController {
  async getUsers(req, res, next) {
    try {
      const users = await userService.getUsers();
      const usersPlain = users.map(user => user.toObject());
      return res.render('users', { users: usersPlain });
    } catch (error) {
      next(error);
    }
  };

  async register (req, res, next) {
    console.log(req.body);
    try{
      const user = await userService.register(req.body);
      if(user) res.redirect('/views');
      else res.redirect('/views/errorRegister')
    }catch(error){
      next(error);
    };
  };

  async login (req, res, next) {
    try{
      const { email, password } = req.body;
      const user = await userService.login(email, password);
      if(user) {
        req.session.email = email;
        req.session.password = password;
        req.session.user = user;
        res.redirect('/views/profile')
      } else res.redirect('/views/errorLogin')
    }catch(error){
      next(error)
    };
  };

  async getByEmail(email){
    try{
      const userExist = await userService.findByEmail({email}); 
      if(userExist) return userExist
      else return false

    }catch(error){
      console.log(error);
      throw new Error(error);
    };
  };


};
