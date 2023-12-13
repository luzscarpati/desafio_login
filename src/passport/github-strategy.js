import { Strategy as GithubStrategy } from "passport-github2";
import passport from "passport";
import UserController from "../controllers/user.controller.js";
const userController = new UserController();

const strategyOptions = {
  clientID: "Iv1.7cf6a5a748ebe4db", //check
  clientSecret: "d844e9ad41157aa2e76d1368a8278adb839ce57b", //Check
  callbackURL: "http://localhost:8080/users/github", //check
};
/*
App ID: 681921
*/


const registerOrLogin = async (accessToken, refreshToken, profile, done) => {
    console.log(profile);
   
};

passport.use("github", new GithubStrategy(strategyOptions, registerOrLogin));