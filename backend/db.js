const mongoose = require('mongoose');
const mongoURI="mongodb+srv://arpitshirishhamjade:cIUr18cWWh1UdXM0@cluster0.ltpmubd.mongodb.net/"
async function connectToMongo() {
    await mongoose.connect(mongoURI).then(()=> console.log("Connected to Mongo Successfully")).catch(err => console.log(err));
}
module.exports=connectToMongo;
// mongoose.connect('mongodb://127.0.0.1:27017/test');

// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));