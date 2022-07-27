//封装user类
class User{
    constructor(ID,name,typeid,password,roleID){
        this.ID=ID;
        this.name=name;
        this.typeid=typeid;
        this.password=password;
        this.roleID=roleID;
    }

    getID(){
        return this.ID;
    }

    getName(){
        return this.name;
    }

    getTypeID(){
        return this.typeID;
    }

    getPassword(){
        return this.password;
    }

    getRoleID(){
        return this.roleID
    }

    setPassword(password){
        this.password = password;
    }

    compare(other){
        if(this===other){
            return true
        }
        return false
    }
}

module.exports = User;