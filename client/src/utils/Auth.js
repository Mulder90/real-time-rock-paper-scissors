class Auth {
  static authenticateUser(token, username) {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
  }

  static isUserAuthenticated() {
    return localStorage.getItem('token') !== null;
  }

  static deauthenticateUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }

  static getToken() {
    return localStorage.getItem('token');
  }
}

export default Auth;
