const Post = require('../models/post')
const Comment = require('../models/comment')

module.exports = (app) => {

    //HOME
    app.get('/', (req, res) => {
        Post.find()
            .then((posts) => {
                res.render('posts-index', { posts: posts });
            }).catch((err) => {
                console.log('Error', err)
            });
    });

    //INDEX
    app.get('/posts', (req, res) => {
        Post.find()
            .then((posts) => {
                res.render('posts-index', { posts: posts });
            }).catch((err) => {
                console.log('Error', err)
            });
    });

    //NEW
    app.get('/posts/new', (req, res) => {
        res.render('posts-new', {} );
    });

    //CREATE
    app.post('/posts', (req, res) => {
        console.log(req.body)
        Post.create(req.body)
            .then((post) => {
                res.redirect(`/posts/${post._id}`)
            }).catch((err) => {
                console.log('Error', err);
            });
    });

    //SHOW
    app.get('/posts/:id', (req, res) => {
        Post.findById(req.params.id)
            .then((post) => {
                Comment.find({ postId: req.params.id })
                    .then((comments) => {
                        res.render('posts-show', { post: post, comments: comments })
                    }).catch((err) => {
                        console.log('Error', err)
                    })
            }).catch((err) => {
                console.log('Error', err)
            });
    });
    
    
    //EDIT
    app.get('/posts/:id/edit', (req, res) => {
        Post.findById(req.params.id)
            .then((post) => {
                res.render('posts-edit', { post: post });
            }).catch((err) => {
                console.log('Error', err)
            });
    });

    //UPDATE
    app.put('/posts/:id', (req, res) => {
        Post.findByIdAndUpdate({ _id: req.params.id }, req.body)
        .then((post) => {
            console.log(req.params.id)
            res.redirect(`/posts/${post._id}`)
        }).catch((err) => {
            console.log('Error', err)
        });
    });
    
    //DELETE
    app.delete('/posts/:id', (req, res) => {
        Post.findByIdAndDelete({ _id: req.params.id })
            .then((post) => {
                res.redirect('/posts');
            }).catch((err) => {
                console.log('Error', err)
            }); 
    });
}