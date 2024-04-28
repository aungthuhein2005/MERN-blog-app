const express = require("express");
const { connectToDb, getDb } = require("./db");
const {ObjectId} = require("mongodb");
const cors = require("cors");
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { authors } = require("./data");
const OTP = require('otplib');
const nodemailer = require('nodemailer');
const compression = require('compression');
const multer = require('multer');

const app = express();
app.use(express.json({limit: '10mb'}))
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret : 'blogs',
    resave : false,
    saveUninitialized: true,
    cookie: {secure: false},
}))

const storage = multer.memoryStorage();
const upload = multer({storage: storage});

dotenv.config();

//set secret 
const secret = 'FSDRETVXFERWER#%$TDGCV^$$%#';

//nodemailer setup

const transporter = nodemailer.createTransport({ //done
    service: 'gmail',
    auth: {
        user: 'aaron547456@gmail.com',
        pass: 'emos wvpo kvij fcyu',
    }
})

connectToDb((err)=>{
    if(!err){
        app.listen(5000,()=>{
            console.log("Server is running on port 5000");
        });
        db = getDb();
    }else{
        console.log(err);
    }
})

//middleware
const authenticateUser = (req,res,next) => { //done
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];
    if(token){
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        const verified = jwt.verify(token,jwtSecretKey);
        if(verified){
            next();
        }else{
            return res.status(401).json({ message: 'Unauthorized - Missing token' });
        }
    }
}

//get all users
app.get('/users',(req,res)=>{ //done
    let users = [];

    db.collection('users')
    .find()
    .forEach(user => users.push(user))
    .then(()=>{
        res.status(200).json(users);
    })
    .catch(()=>{
        res.status(500).json({error: "Could't fetch users data"});
    })
})

//create new user
app.post('/users',(req,res)=>{ //done
    let user = req.body;

    db.collection('users')
    .insertOne(user)
    .then((result)=>{
        res.status(200).json(result)
    })
    .catch(err=>res.status(500).json({error: "Colud't create new user"}))
})

//login user
app.post('/users/login',(req,res)=>{ //done
    let {email,password} = req.body;
    console.log(email);
    db.collection('users')
    .findOne({email: email})
    .then((response)=>{
        bcrypt.compare(password,response.password,(err,result)=>{
            if(err) console.error('Error comparing password :', err);
            if(result){
                let jwtSecretKey = process.env.JWT_SECRET_KEY;
                const token = jwt.sign({userID: response.email},jwtSecretKey);
                res.status(200).json({response,token});
            }else{
                res.status(500).json({Error: "Password or email is invalid"})
            }
        })
        console.log(response);
    })
})

//get user with specific id
app.get('/users/:id'    ,authenticateUser,(req,res)=>{ //done
    if(ObjectId.isValid(req.params.id)){
        db.collection('users')
        .findOne({_id: new ObjectId(req.params.id)})
        .then((user)=>res.status(200).json(user))
        .catch((err)=>res.status(500).json({error: "Could't  fetch user data"}))
    }else{
        res.json({error : "User id is not valid"});
    }
})

//get subscribed list
app.get('/subscribed/:id',authenticateUser,(req,res)=>{ //done
    getSubscribedAuthors(req.params.id)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(error => {
      res.status(500).json(error);
    });
})

//unsubscribe
app.patch('/subscribed/:id',authenticateUser,(req,res)=>{ //done
    console.log(req.body);
    db.collection('users')
    .updateOne({_id: new ObjectId(req.params.id)},{$pull: {subscribed: new ObjectId(req.body.id)}})
    .then(response=>res.status(200).json(response))
    .catch(err=>res.status(500).json({err: err}));
})

//edit user 
app.patch('/users/:id',authenticateUser,(req,res)=>{ //done
    console.log(req.params.id,req.body);
    if(ObjectId.isValid(req.params.id)){
        let update = req.body;
        db.collection('users')
        .updateOne({_id: new ObjectId(req.params.id)},{$set: update})
        .then(result=>res.status(200).json(result))
        .catch(error=>res.status(500).json({error: "Could't update the document"}))
    }
})

//delete user
app.delete('/users/:id',(req,res)=>{//done
    if(ObjectId.isValid(req.params.id)){
        db.collection('users')
        .deleteOne({_id: new ObjectId(req.params.id)})
        .then(result=>res.status(200).json(result))
        .catch(error=>res.status(500).json({error: "Could't delete the document"}))
    }else{
        res.status.json({error: "Id is not valid"});
    }
})

//get blogs
app.get('/blogs',(req,res)=>{//done
    let posts = [];
    const page = req.query.p || 0;
    // console.log(page);
    const blogPerPage = 3;
    db.collection('posts')
    .find()
    // .skip(page*blogPerPage)
    // .limit(blogPerPage)
    .forEach(post => posts.push(post))
    .then(()=>{
        res.status(200).json(posts);
    })
    .catch(()=>{
        res.status(500).json({error: "Could't fetch blogs"})
    })
})

app.get('/blogs/latest',(req,res)=>{ //done
    let posts = [];
    const blogs = 3;
    db.collection('posts')
    .find()
    .sort({date: -1})
    .limit(3)
    .forEach(post=> posts.push(post))
    .then(()=>{
        res.status(200).json(posts);
    })
    .catch(()=>{
        res.status(500).json({error: "Could't fetch blogs"});
    })
})

//create new blog post
app.post('/blogs',(req,res)=>{//done
    let blog = req.body;
    db.collection('posts')
    .insertOne(blog)
    .then(result=>res.status(200).json(result))
    .catch(err=>res.status(500).json({error: "Could't create post"}))
})

//get blogs with id
app.get('/blogs:id',(req,res)=>{//done
    if(ObjectId.isValid(req.params.id)){
        db.collection("posts")
        .findOne({_id: new ObjectId(req.params.id)})
        .then(post => res.status(200).json(post))
        .catch(err=> res.status(500).json({error : "Could't fetch blog"}))
    }
})

//filter blogs
app.get('/blogs/filter',(req,res)=>{ //
    console.log(req.query);
    let posts = [];
    if(req.query.author){
        db.collection("posts")
        .find({author: parseInt(req.query.author)})
        .forEach(post => posts.push(post))
        .then(()=>{res.status(200).json(posts)})
        .catch(err=>res.status(500).json({error: "Could't fetch post with author"}))
    }else if(req.query.category){ //done
        console.log(req.query.category);
        db.collection("posts")
        .find({category: req.query.category})
        .forEach(post => posts.push(post))
        .then(()=>{res.status(200).json(posts)})
        .catch(err=>res.status(500).json({error: "Could't fetch post with category"}))
    }else if(req.query.time){
        db.collection("posts")
        .find({date: req.query.time})
        .forEach(post => posts.push(post))
        .then(()=>{res.status(200).json(posts)})
        .catch(err=>res.status(500).json({error: "Could't fetch post with category"}))
    }
})

//edit blog 
app.patch('/blogs/:id',(req,res)=>{//done
    if(ObjectId.isValid(req.params.id)){
        let update = req.body;
        db.collection('blogs')
        .updateOne({_id: new ObjectId(req.params.id)},{$set: update})
        .then(result=>res.status(200).json(result))
        .catch(error=>res.status(500).json({error: "Could't update the document"}))
    }
})

//delete user
app.delete('/users/:id',(req,res)=>{//done
    if(ObjectId.isValid(req.params.id)){
        // req.session.search = [];
        db.collection('blogs')
        .deleteOne({_id: new ObjectId(req.params.id)})
        .then(result=>res.status(200).json(result))
        .catch(error=>res.status(500).json({error: "Could't delete the document"}))

    }else{
        res.status.json({error: "Id is not valid"});
    }
})


//get comment with specific id
app.get('/blogs/comments:id',(req,res)=>{//done
    const comments = [];
    if(ObjectId.isValid(req.params.id)){
        db.collection("comments")
        .find({blogId: req.params.id})
        .forEach(comment=> comments.push(comment))
        .then(()=>res.status(200).json(comments))
        .catch(err=>res.status(500).json({error: "Could't fetch this blog"}))
    }
})

//insert comment 
app.post('/blogs/comments',(req,res)=>{//done
    const comment = req.body;
    db.collection("comments")
    .insertOne(comment)
    .then((result)=>res.status(200).json(result))
    .catch(err=>res.status(500).json({error: "Could't insert new comment"}))
})

//edit comment 
app.patch('/blogs/comments/:id',(req,res)=>{//done
    if(ObjectId.isValid(req.params.id)){
        let update = req.body;
        db.collection('comments')
        .updateOne({_id: new ObjectId(req.params.id)},{$set: update})
        .then(result=>res.status(200).json(result))
        .catch(error=>res.status(500).json({error: "Could't update the document"}))
    }
})

//delete user
app.delete('/blogs/comments/:id',(req,res)=>{//done
    if(ObjectId.isValid(req.params.id)){
        db.collection('comments')
        .deleteOne({_id: new ObjectId(req.params.id)})
        .then(result=>res.status(200).json(result))
        .catch(error=>res.status(500).json({error: "Could't delete the document"}))
    }else{
        res.status.json({error: "Id is not valid"});
    }
})


//get like count
app.get('/blogs/likes:id',(req,res)=>{//done
    if(ObjectId.isValid(req.params.id)){
        db.collection('likes')
        .find({blogId: req.params.id})
        .count()
        .then((result)=>res.status(200).json(result))
        .catch(err=>res.status(500).json({error: "Could't get like"}))
    }
    else{
        res.status(500).json({error: "Blog is not valid"})
    }
})

//like
app.post("/blogs/like",(req,res)=>{//done
    const like = req.body;
    db.collection('likes')
    .insertOne(req.body)
    .then(result=>res.status(200).json(result))
    .catch(err=>res.status(500).json({error: "Could't fetch like count"}))
})

//dislike
app.delete('/blogs/like/:id',(req,res)=>{//done
    if(ObjectId.isValid(req.params.id)){
        db.collection('likes')
        .deleteOne({_id: new ObjectId(req.params.id),userId: req.body.userId})
        .then(result=>res.status(200).json(result))
        .catch(error=>res.status(500).json({error: "Could't delete the document"}))
    }else{
        res.status.json({error: "Id is not valid"});
    }
})

//search
app.get('/search',(req,res)=>{ //done
    // req.session.search.push()
    let search = req.query.search;
    let results = [];
    db.collection('posts')
    .find({title: { $regex: new RegExp(search, 'i') } })
    .forEach(result=>results.push(result))
    .then(()=>{
        console.log(results);
        res.status(200).json(results)
    })
    .catch(err=>res.status(500).json({error: "Could't fetch search"}))
}) 


//subscribe
app.post('/subscribe',(req,res)=>{//done
    const {userId, authorId,subscribe} = req.body;
    if(subscribe){
        db.collection('authors')
        .updateOne({_id: new ObjectId(authorId)},{
            $push : {subscribed: userId}
        })
        .then((response)=>res.status(200).json(response))
        .catch(err=>res.status(500).json(err));
    }else{
        console.log("unsubscribe");
        db.collection('authors')
        .updateOne({_id: new ObjectId(authorId)},{
            $pull : {subscribed: userId}
        })
        .then((response)=>res.status(200).json(response))
        .catch(err=>res.status(500).json(err));
    }
})

//get with specific userid and author id
app.get('/subscribe',(req,res)=>{//done
    let {userId,authorId} = req.query;
    db.collection('authors')
    .findOne({_id: new ObjectId(authorId),subscribed: [userId]})
    .then((response)=>{
        res.status(200).json(response)
    })
    .catch(err=>res.status(500).json({err: "Error can't fetch"}))
})



app.post('/likes',(req,res)=>{//done
    const {like,postId,userId} = req.body;
    if(like){
        db.collection('posts')
        .updateOne({_id: new ObjectId(postId)},{
            $push : {likes: userId}
        })
        .then((response)=>res.status(200).json(response))
        .catch(err=>res.status(500).json(err));
    }else{
        db.collection('posts')
        .updateOne({_id: new ObjectId(postId)},{
            $pull : {likes: userId}
        })
        .then((response)=>res.status(200).json(response))
        .catch(err=>res.status(500).json(err));
    }
})

app.get('/likes',(req,res)=>{//done
    const {postId,userId} = req.query;
    db.collection('posts')
    .findOne({_id: new ObjectId(postId),likes: [userId]})
    .then((response)=>{
        res.status(200).json(response)
    })
    .catch(err=>console.error(err))
})

app.post('/comments',async (req,res)=>{//done
    const {postId,userId,description,create,commentId} = req.body;
    if(create){
        let name = await getUserNameById(userId);
        db.collection('posts')
        .updateOne({_id: new ObjectId(postId)},{
            $push: {comments: {userId: userId,description: description,id: new ObjectId(),name: name}}
        })
        .then((response)=>res.status(200).json(response))
        .catch(err=>res.status(500).json(err));
    }else{
        db.collection('posts')
        .updateOne({
            _id: new ObjectId(postId),
            comments: {id: new ObjectId(commentId)}
        },{
            $pull: {comments: {
                userId: userId  
            }}
        })
        .then((response=>req.status(200).json(response)))
        .catch((err)=>res.status(500).json({err: err}))
    }
})

app.delete('/comments',(req,res)=>{//done
    const {postId,commentId,userId} = req.query;
    db.collection('posts')
    .updateOne({
        _id: new ObjectId(postId)
    },{
        $pull: {
            comments: {
                userId: userId,
                id: new ObjectId(commentId)
            }
        }
    })
    .then((response)=>res.status(200).json(response))
    .catch(err=>res.status(500).json(err))
})

// app.get('/comments',(req,res)=>{
//     const {postId} = req.query;
//     db.collection("posts")
//     .findOne({_id: new ObjectId(postId)})
//     .then(response=>res.tat)
// })

app.post('/subscribe_channel',(req,res)=>{
    console.log(req.body.email);
    db.collection('subscribes')
    .insertOne({email: req.body.email})
    .then(response=>res.status(200).json(response))
    .catch(err=>res.status(500).json({err: err}))
})

app.get('/subscribe_channel',(req,res)=>{
    let subscribers = [];
    db.collection("subscribes")
    .find()
    .forEach(subscriber=>subscribers.push(subscriber))
    .then(()=>res.status(200).json(subscribers))
    .catch(err=>res.status(500).json(err))
})

app.get('/favourite/:id',authenticateUser,(req,res)=>{
    fetchLike(req.params.id)
    .then(response=>res.status(200).json(response))
    .catch(err=>res.status(500).json({err: err}));
})

app.patch('/favourite/:id',authenticateUser,(req,res)=>{
    console.log(req.body.post_id,req.params.id);
    db.collection("posts")
    .updateOne(
        { "_id": new ObjectId(req.body.post_id) },
        { $pull: { likes: req.params.id } }
    )
    .then(response=>res.status(200).json(response))
    .catch(err=>res.status(500).json({err: err}));
})


const getUserNameById = async (id) => {
    const result = await db.collection('users').findOne({_id: new ObjectId(id)});
    return result.name;
}

//related blog
app.get('/related',(req,res)=>{ //done
    let {category} = req.query;
    let posts = [];
    db.collection("posts")
    .find({category: category})
    .limit(8)
    .toArray()
    .then(response=>res.status(200).json(response))
    .catch(err=>res.status(500).json(err));
})

//get all categories
app.get('/categories',(req,res)=>{//done
    let categories = [];
    db.collection('category')
    .find()
    .forEach(category => {
        categories.push(category)
    })
    .then(()=>res.status(200).json(categories))
    .catch(err=>res.status(500).json({err: "Error in category fetch"}))
})

//send OTP
app.get('/send-otp-email/:email',(req,res)=>{//done
    const email = req.params.email;
    console.log(email);
    //generate and send a OTP via email
    const totp = OTP.authenticator.generate(secret);
    const mailOptions = {
        from: "Blog",
        to: email,
        subject: `OTP for Password Recovery`,
        text: `Your OTP is ${totp}`,
    }
    console.log(totp);
    transporter.sendMail(mailOptions,(err,info)=>{
        if(err){
            return res.status(500).json({error: "Field to send OTP via email"})
        }
        res.status(200).json({message: 'OTP sent successfully via email'});
    })
})

//verify OTP
app.get('/verify-otp/:otp',(req,res)=>{//done
    const userEnterdOTP = req.params.otp;
    console.log(userEnterdOTP);
    const isValidOTP = OTP.authenticator.check(userEnterdOTP,secret);
    console.log(isValidOTP);
    if(isValidOTP){
        // console.log('success');
        res.status(200).json({message: 'OTP verification successfull'});
    }else{
        // console.log('fail');
        res.status(400).json({error: 'Invalid OTP'});
    }
})

app.get('/send-otp-sms/:phoneNumber',(req,res)=>{
    const phoneNumber = req.params.phoneNumber;
})

//help functions //done
async function getSubscribedAuthors(userId) {
    try {
      const result = await db.collection('users').aggregate([
        {
          $match: {
            "_id": new ObjectId(userId)
          }
        },
        {
          $lookup: {
            from: "authors",
            localField: "subscribed",
            foreignField: "_id",
            as: "subscribedAuthors"
          }
        },
        {
          $unwind: "$subscribedAuthors"
        },
        {
          $project: {
            "subscribedAuthors.name": 1,
            "subscribedAuthors._id": 1,
            _id: 0,
          }
        }
      ]).toArray();
  
      return result;
    } catch(err) {
      console.log(err);
    }
  }


//get liked post
async function fetchLike(userId) {
    try {
        const result = await db.collection('posts')
                                .find({ likes: userId})
                                .project({title:1})
                                .toArray();
        return result;
    } catch (err) {
        console.error(err);
        throw err;
    }
}
