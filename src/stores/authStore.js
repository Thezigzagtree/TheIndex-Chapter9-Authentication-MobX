import { decorate, observable, computed } from "mobx";
import axios from "axios";
import jwt_decode from "jwt-decode";

class AuthStore {
  constructor() {
    this.user = null;
  }

  Authenticate(token) {
    if (token) {
      axios.defaults.headers.common.Authorization = `jwt ${token}`;
      this.user = jwt_decode(token);
    } else {
      delete axios.defaults.headers.common.Authorization;
      localStorage.removeItem("token");
    }
  }

  login(user, history) {
    axios
      .post("https://the-index-api.herokuapp.com/login/", user)
      .then(res => res.data)
      .then(tokenObj => {
        localStorage.setItem("token", tokenObj.token);
        this.Authenticate(tokenObj.token);
        this.user = jwt_decode(tokenObj.token);
        console.log(this.user);
        history.push("/");
      })
      .catch(err => {
        console.error(err.data);
        console.log(user);
      });
  }

  logout() {
    this.user = null;
    this.Authenticate("");
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

decorate(AuthStore, {
  user: observable
});

const authStore = new AuthStore();
if (localStorage.getItem("token")) {
  console.log("THERE IS A TOKEN");
  authStore.Authenticate(localStorage.getItem("token"));
}
export default authStore;
