const Comment = require('../models/comment');

module.exports = (app) => {

    //CREATE: COMMENT
    app.post('/posts/comments', (req, res) => {
        Comment.create(req.body)
            .then((comment) => {
                console.log(req.body)
                res.redirect(`/posts/${comment.postId}`)
            }).catch((err) => {
                console.log('Error', err)
            });
    });

    //DELETE: COMMENT
    app.delete('/posts/comments/:id', (req, res) => {
        Comment.findByIdAndDelete(req.params.id)
            .then((comment) => {
                console.log('DELETED Comment')
                res.redirect(`/posts`)
            }).catch((err) => {
                console.log('Error', err)
            });
    });

}