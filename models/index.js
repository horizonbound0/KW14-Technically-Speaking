const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');

Blog.belongsTo(User, {
    foreignKey: 'user_id',
});

User.hasMany(Blog, {
    foreignKey: 'user_id',
});

module.exports = { Blog, User };