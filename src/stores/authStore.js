import { decorate, observable, computed } from "mobx";
import axios from "axios";

class AuthStore {
  constructor() {
    user: {
    }
  }

  login(user) {
    axios
      .post("https://the-index-api.herokuapp.com/login/", user)
      .then(res => res.data)
      .then(tokenObj => localStorage.setItem("token", tokenObj.token))
      .catch(err => {
        console.error(err.data);
        console.log(user);
      });
  }

  signUp(user) {
    axios
      .post("https://the-index-api.herokuapp.com/signup/", user)
      .then(res => res.data)
      .then(tokenObj => console.log(tokenObj.token))
      .catch(err => {
        console.error(err.data);
        console.log(user);
      });
  }
}

const authStore = new AuthStore();
export default authStore;
