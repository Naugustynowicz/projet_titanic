import { Schema, model } from "mongoose";

const passengerSchema = Schema({
    PassengerId: { type: Number, required: true },
    Name: { type: String, required: true },
    Pclass: { type: Number, required: true },
    Sex: { type: String, required: true },
    Age: { type: Number, required: true },
}, { collection: 'passengers' });

const Passenger = model("Passenger", passengerSchema);

export default Passenger;
