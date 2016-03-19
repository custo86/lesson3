var userList = [];
module.exports = {
    addUser: function(user){
        if (userList.length > 0){
            for (var i in userList){
                console.log("Текущий индекс: " + i + " Текущая длинна массива: " + userList.length);
                if (userList[i].nick == user.nick){
                    console.log(userList[i].nick + " : " + user.nick);
                    userList[i] = user;
                    console.log("user was changed");
                    break;
                } else {
                    if (userList.length == parseInt(i)+1){
                        userList.push(user);
                        console.log("new user was added");
                    }
                }
            }
        } else {
            userList.push(user);
            console.log("user was added first time");
        }
    },
    getUsers: function(){
        return userList;
    }
}
