const { Actor } = require('../models/actor.model');
const { User } = require('../models/user.model');
const { Movie } = require('../models/movie.model');
const { Review } = require('../models/review.model');
const { ActorInMovie } = require('../models/actorInMovie.model');

const initModels = () => {
  User.hasMany(Review);
  Review.belongsTo(User);

  Movie.hasMany(Review);
  Review.belongsTo(Movie);

  //relation many to many with intermediate ActorInMovie
  Movie.belongsToMany(Actor, { through: ActorInMovie });
  Actor.belongsToMany(Movie, { through: ActorInMovie });
};
