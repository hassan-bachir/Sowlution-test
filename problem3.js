class JackpotMachine {
  constructor(username, password, balance) {
    this.currentUser = username;
    this.password = password;
  }
}

const user = new JackpotMachine("hassan");

console.log(user);
