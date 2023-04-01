const { Book, User } = require("../models");
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    books: async () => {
      return Book.find();
    },
    users: async () => {
      return User.find();
    },
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      let isUser = User.findOne({ email: email });
      if (!isUser) {
        throw new AuthenticationError("No profile with this email found!");
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }

      const token = signToken(isUser);
      return { token, isUser };
    },

    addUser: async (parent, { username, email, password }) => {
      return User.create({ username, email, password });
    },
  },
};

module.exports = resolvers;
