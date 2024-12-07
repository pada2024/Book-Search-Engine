// import user model
const { User } = require('../models');
// import sign token function from auth
const { signToken } = require('../utils/auth');

module.exports = {
    Query: {
        getSingleUser: async function (parent, args, context) {
            const foundUser = await User.findOne(
                { _id:  context.user._id }
            );

            if (!foundUser) {
                return null;
            }

            return (foundUser);
        },
    },
    Mutation: {

        createUser: async function (parent, args, context) {
            const user = await User.create(args);

            if (!user) {
                return null;
            }
            const token = signToken(user);
            return ({ token, user });
        },

        login: async function (parent, args, context) {
            const user = await User.findOne({ $or: [{ username: args.username }, { email: args.email }] });
            if (!user) {
                return null;
            }

            const correctPw = await user.isCorrectPassword(args.password);

            if (!correctPw) {
                return null;
            }
            const token = signToken(user);
            return ({ token, user });
        },

        saveBook: async function (parent, args, context) {
            try {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: args } },
                    { new: true, runValidators: true }
                );
                return (updatedUser);
            } catch (err) {
                console.log(err);
                return null;
            }
        },


        deleteBook: async function (parent, args, context) {
            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: { bookId: args.bookId } } },
                { new: true }
            );
            if (!updatedUser) {
                return null
            }
            return (updatedUser);
        },
    }
}