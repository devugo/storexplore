class User {
    constructor(name, email, photoURL, uid, role, hasStore){
        this.name = name;
        this.email = email;
        this.photoURL = photoURL;
        this.uid = uid;
        this.role = role;
        this.hasStore = hasStore;
    }
}

export default User;