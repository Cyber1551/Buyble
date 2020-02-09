import Client from '../client.js';
import { NavMenu } from './NavMenu.js';
const LOCAL_STORAGE_KEY = "auth_key";

 
class Auth {
  constructor() {
    this.useLocalStorage = (typeof localStorage !== 'undefined');

    if (this.useLocalStorage) {
      this.token = localStorage.getItem(LOCAL_STORAGE_KEY);

      if (this.token) {
        this.isTokenNotValid(function()
        {
            this.token = null;
        })
        
      }
    }
    console.log("TOKEN: " + this.token)
  }

  isLoggedIn() {
    return !!this.token;
  }


  setToken(token) {
    this.token = token;

    if (this.useLocalStorage) {
      localStorage.setItem(LOCAL_STORAGE_KEY, token);
    }
  }

  removeToken() {
    this.token = null;

    if (this.useLocalStorage) {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
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
            this.setToken(data.info)
        }

        
        if (cb) cb(data);
    })
    
    
  }

  logout() {
    this.removeToken();
    //new NavMenu().checkLoggedIn();
  }

}

export const auth = new Auth();
