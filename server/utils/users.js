class Users{
  constructor(){
    this.users = [];
  }
  addUser(id,name){
    var user = {id,name};
    this.users.push(user);
    return user;
  }
  removeUser(id){
    var user = this.users.filter((user) => user.id == id);
    if(user){
      this.users = this.users.filter((user) => user.id != id);
    }
  }
  getUser(id){
    return this.users.filter((user) => user.id == id)[0];
  }
  getUserList(){
    return this.users;
  }
}

module.exports = {Users};
