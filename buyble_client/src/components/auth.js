import Client from '../client.js';
import { NavMenu } from './NavMenu.js';
const LOCAL_STORAGE_KEY = "auth_key";

 
class Auth {
  constructor() {
    this.useLocalStorage = (typeof localStorage !== 'undefined');
    if (this.useLocalStorage) {
      this.token = localStorage.getItem(LOCAL_STORAGE_KEY);
      this.user = localStorage.getItem("user");
      if (this.token) {
        this.isTokenNotValid(function()
        {
            this.token = null;
            this.user = null;
        })
        
      }
    }
    console.log("TOKEN: " + this.token)
  }

  isLoggedIn() {
    return !!this.token;
  }


  setToken(token, user) {
    this.token = token;
     this.user = user;
    if (this.useLocalStorage) {
      localStorage.setItem(LOCAL_STORAGE_KEY, token);
      localStorage.setItem("user", user);
    }
  }

  removeToken() {
    this.token = null;
    this.user = null
    if (this.useLocalStorage) {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      localStorage.removeItem("user");
    }
  }

  isTokenNotValid(cb) {
    Client.SendToServer("POST", "authenticateToken", {"key": this.token}, (data) => {
      if (!data.res)
      {
        if (cb) cb();
      }
       
    })

    
  }

  login(data, cb) {
    Client.SendToServer("POST", "login", data, (data) => {
        if (data.res)
        {
            this.setToken(data.info, data.user)
        }
        if (cb) cb(data);
    })
  }
  getUsername() 
  {
    return this.user;
  }

  logout() {
    this.removeToken();
    //new NavMenu().checkLoggedIn();
  }

}

export const auth = new Auth();
