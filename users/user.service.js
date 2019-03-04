const config = require('config.json');
const jwt = require('jsonwebtoken');
const Role = require('_helpers/role');

// users hardcoded for simplicity, store in a db for production applications
const users = [
    { id: 1, username: 'admin', password: 'admin', firstName: 'Ashkan', lastName: 'Bashiri', role: Role.Admin },
    { id: 2, username: 'kamran', password: 'kamran', firstName: 'Kamran', lastName: 'Kowsari', role: Role.Admin },
    { id: 2, username: 'pedram', password: 'pedram', firstName: 'Pedram', lastName: 'Kanzi', role: Role.Admin },
    { id: 2, username: 'user', password: 'user', firstName: 'Random User', lastName: 'Random', role: Role.User }
];

module.exports = {
    authenticate,
    getAll,
    getById
};

async function authenticate({ username, password }) {
    const user = users.find(u => u.username == username && u.password == password);
    if (user) {
        const token = jwt.sign({ sub: user.id, role: user.role }, config.secret);
        const { password, ...userWithoutPassword } = user;
        return {
            ...userWithoutPassword,
            token
        };
    }
}

async function getAll() {
    return users.map(u => {
        const { password, ...userWithoutPassword } = u;
        return userWithoutPassword;
    });
}

async function getById(id) {
    const user = users.find(u => u.id === parseInt(id));
    if (!user) return;
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}
