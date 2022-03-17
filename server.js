const { app } = require('./app');

const { sequelize } = require('./utils/database');

sequelize
  .authenticate()
  .then(() => console.log('Server authenticated'))
  .catch((err) => console.log(err));

sequelize
  .sync()
  .then(() => console.log('Database sync'))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`connecting to express... server: ${PORT}`);
});
