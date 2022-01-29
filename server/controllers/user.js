const bcrypt = require('bcryptjs');

module.exports = {
    register: async (req, res) => {
        const { username, firstname, lastname, password } = req.body;
        const db = req.app.get('db');
        const result = await db.user.find_user_by_username([username]);
        
        const existingUser = result[0];
        if(existingUser) {
            return res.status(409).send('Username taken');
        }
        
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const registeredUser = await db.user.create_user([ username, firstname, lastname, hash]);
    const user = registeredUser[0];

    req.session.user = { username: user.username, userid: user.id };
    return res.status(201).send(req.session.user);
    },

    login: async (req, res) => {
        const { username, password } = req.body;
        const db = req.app.get('db');
        const result = await db.user.find_user_by_username([username]);
        const user = result[0];
        if(!user) {
            return res.status(201).send("No such user.");
        }

        const isAuthenticated = bcrypt.compareSync(password, user.password);

        if(!isAuthenticated){
            return res.status(403).send('Incorrect Password!');
        }

        req.session.user = { username: user.username, userid: user.id };
        return res.status(200).send(req.session.user);
        
    
    },

    logout: (req, res) => {
        if(req.session.user){
            req.session.destroy();
        return res.status(200).send('User Logged Out!');
        } else {
            return res.status(403).send('Please Log In First!');
        }
        

    },

    getUser: async (req, res) => {
        
        if(req.session.user){
        const {username} = req.session.user
        const db = req.app.get('db');
        const result = await db.user.find_user_by_username([username]);
        const user = result[0];
            return res.send(user)
        }
        else {
            return res.status(404).send('Error, No User Logged In!');
        }
        
    },
    updateUsername: async (req,res) => {
        const {username, user} = req.body
        const db = req.app.get('db');
        await db.user.updateUsername([username, user.id])
        res.sendStatus(200)
    },

    updateFirstname: async (req, res) => {
        const {firstname, user} = req.body
        const db = req.app.get('db');
        await db.user.updateFirstname([firstname,user.id])
        const updatedUser = await db.user.find_user_by_id([user.id])
        res.status(200).send(updatedUser)
    },
    updateLastname: async (req, res) => {
        const {lastname, user} = req.body
        const db = req.app.get('db');
        await db.user.updateLastname([lastname,user.id])
        const updatedUser = await db.user.find_user_by_id([user.id])
        res.status(200).send(updatedUser)
    },
    updatePassword: async (req, res) => {
        const {password, user} = req.body
        const db = req.app.get('db');
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        await db.user.updatePassword([hash,user.id])
        console.log(hash, password)
        const updatedUser = await db.user.find_user_by_id([user.id])
        res.status(200).send(updatedUser)
    }
}