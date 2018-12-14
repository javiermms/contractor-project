const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const Post = require('../models/post')

chai.use(chaiHttp);

describe('Post', () => {

    const testPost = {

        "charityName": "Dog Helpers",
        "name": "Bob",
        "amountGiven": "$1000000.00",
        "description": "I really love dogs!"

    }

    //TEST: INDEX
    it('should index all posts on /posts GET', (done) => {
        chai.request(server)
            .get('/posts')
            .end((err, res) => {
                res.should.have.status(200)
                res.should.be.html
                done();
            });
    });

    //TEST: NEW
    it('should display a new form on /posts/new GET', (done) => {
        chai.request(server)
            .get('/posts/new')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.should.be.html
                    done();
                });
    });

    //TEST: CREATE
    it('should create a new post on /posts POST', (done) => {
        chai.request(server)
            .get('/posts')
            .send(testPost)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.should.be.html
                    done();
                });
    });

    //TEST: SHOW
    it('should show newly created post on /posts/<id> GET', (done) => {
        var post = new Post(testPost)
        post.save((err, post) => {
            chai.request(server)
                .get(`/posts/${post._id}`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.should.be.html
                    done();
                });
        });   
    });

    //TEST: EDIT
    it('should display an edit form on /posts/<id>/edit GET', (done) => {
        var post = new Post(testPost)
        post.save((err, post) => {
            chai.request(server)
            .get(`/posts/${post._id}/edit`)
            .end((err, res) => {
                res.should.have.status(200)
                res.should.be.html
                done();
            });
        });
    });

    //TEST: UPDATE
    it('should update a single post on /posts/<id> PUT', (done) => {
        var post = new Post(testPost)
        post.save((err, post) => {
            chai.request(server)
            .put(`/posts/${post._id}`)
            .send({ 'charityName': 'Cat Shelter'})
                .end((err, res) => {
                    res.should.have.status(200)
                    res.should.be.html
                    done();
                });
        });
    });

    //TEST: DELETE
    it('should delete a single post on /posts/<id> DELETE', (done) => {
        var post = new Post(testPost)
        post.save((err, post) => {
            chai.request(server)
            .delete(`/posts/${post._id}`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.should.be.html
                    done();
                });
        });
    });

    after(() => {
        Post.deleteMany({ charityName: 'Dog Helpers', charityName: 'Cat Shelter' })
            .exec((err, post) => {
                console.log(post)
                post.remove();
        });
    });
});