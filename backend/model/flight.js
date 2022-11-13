const {Schema, model, default: mongoose} = require('mongoose');

const flightSchema = new Schema({
    id:String,
    name:String,
    flight_no:String,
    date : Date,
    from: String,
    to: String,
    passenger_list : [{type:mongoose.SchemaTypes.ObjectId, ref:'User'}]
});

const Flight = model("Flight", flightSchema);
module.exports = Flight;