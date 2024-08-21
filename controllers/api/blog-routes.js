const router = require('express').Router();
const { Blog } = require('../../models');

// adding a new blog!
router.post('/submit', async (req, res) => {
    console.log(`user_id is: ${req.session.user_id}`);
    try {
        // create the new blog
        const newBlog = await Blog.create({
            blog_title: req.body.title,
            blog_body: req.body.blog,
            user_id: req.session.user_id,
        });
        
        req.session.save(() => {
            res.status(200).json({
                blog: newBlog,
                message: 'You just saved a blog!',
            });
        })
        console.log('Blog saved!');
        
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;