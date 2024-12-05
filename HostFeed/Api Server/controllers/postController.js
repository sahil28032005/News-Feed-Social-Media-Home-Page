const prisma = require('../config/prismaClient');

//all api controllers required

//for creating post

const createPost = async (req, res) => {
    try {
        const { title, content, userId } = req.body;
        let mediaUri = null;

        //check weather media is found in request headers or not
        if (req.file) {
            //handle aws s3 file upload here

        }

        //create post
        const post = await prisma.post.create({
            data: {
                title,
                content,
                mediaUrl: mediaUri,
                userId: parseInt(userId)
            }
        });

        //handle cashing if necessary
    }
    catch (e) {
        return res.status(401).send({
            success: false,
            message: 'status code error from api while creating post',
            error: e.message
        });
    }
}

//controller for fetching the posts
const getPosts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        //here optional check cache and return cached post as per priority basis

        //if not cached then fetch from the database

        const posts = await prisma.post.findMany({
            skip,
            include: {
                user: true,
                comments: true,
                likes: true
            },
        });

        //cache the result set for next time skip request to the database

        res.status(201).send({
            success: true,
            message: 'posts are fatched successfullly!',
            posts: posts
        });
    }
    catch (err) {
        return res.status(401).send({
            success: false,
            message: 'status code error from api while getting post',
            error: err.message
        });
    }
}

//controller for likking the post 

const likePost = async (req, res) => {
    try {
        const { userId } = req.body;
        const { postId } = req.params;

        //check weather user has already liked the post

        const existingLike = await prisma.like.findUnique({
            where: {
                userId_postId: { userId: parseInt(userId), postId: parseInt(postId) }
            }
        });

        //if already liked return ststus as already liked
        if (existingLike) {
            return res.status(400).send({
                messsage: 'already liked'
            });
        }

        //otherwise mark the post as like by that user

        const like = await prisma.like.create({
            data: {
                userId: parseInt(userId),
                postId: parseInt(postId),
            }
        });

        //mark it as liked

        return res.status(200).send({
            success: true,
            message: 'liked post successfully',
            data: like
        });
    }
    catch (e) {
        return res.status(401).send({
            success: false,
            message: 'problem from api cant connect',
            error: e.message
        });
    }

}

//controller for commmenting of the post
const commentPost = async (req, res) => {
    try {

        const { content, userId } = req.body;
        const { postId } = req.params;
        //writing data for comment 
        const comment = await prisma.comment.create({
            data: {
                userId: parseInt(userId),
                postId: parseInt(postId),
            }
        });

        //add comment to be created

        res.status(201).send({
            success: true,
            message: 'comment written successfully',
            data: comment
        });

    }
    catch (err) {
        return res.status(401).send({
            success: false,
            message: 'problem from api cant comment',
            error: err.message
        });
    }
}

module.exports = {
    createPost,
    getPosts,
    likePost,
    commentPost,
};






