const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review');

const CampgroundSchema = new Schema({
    title: String,
    image: String,
    price: Number,
    description: String,
    location: String,

    //for saving author id 
    author : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    images : [{
        url:String,
        imagename : String
    }],
    reviews : [
        {
            type : Schema.Types.ObjectId,
            ref : 'Review'
        }
    ]
});


//this is to delete the review associated with the campground which is going to be deleted
CampgroundSchema.post('findOneAndDelete', async function(doc){
    if(doc){
        await Review.deleteMany({_id: {$in: doc.reviews}})
    }
})


module.exports = mongoose.model('Campground', CampgroundSchema);