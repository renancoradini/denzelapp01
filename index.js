const express = require('express')
const Sequelize = require('sequelize')
const app = express()
const port = 8080
app.use(express.json());


//Invoke the Sequelize object and pass in the database connection string to its constructor by doing the following:
const sequelize = new Sequelize('postgres://user:pass@example.com:5432')

//To test if the connection with the database is successful we can write the following code:
sequelize
.authenticate()
.then(() => {
console.log('Connection has been established successfully.');
})
.catch(err => {
console.error('Unable to connect to the database:', err);
});

//Model our User table:
const User = sequelize.define('user', {
// attributes
firstName: {
type: Sequelize.STRING,
allowNull: false
},
lastName: {
type: Sequelize.STRING
// allowNull defaults to true
}
}, {
// options
});

// Note: using `force: true` will drop the table if it already exists
User.sync({ force: true }) // Now the `users` table in the database corresponds to the model definition
app.get('/', (req, res) => res.json({ message: 'Hello World' }))

//Add a POST endpoint that contains the user in the request body:
app.post('/user', async (req, res) => {
try {
const newUser = new User(req.body)
await newUser.save()
res.json({ user: newUser }) // Returns the new user that is created in the database
} catch(error) {
console.error(error)
}
})
//This stores the user in the database, so let’s deﬁne an endpoint to retrieve the user from the database.
app.get('/user/:userId', async (req, res) => {
const userId = req.params.userId
try {
const user = await User.findAll({
where: {
id: userId
}
}
)
res.json({ user })
} catch(error) {
console.error(error)
}
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))