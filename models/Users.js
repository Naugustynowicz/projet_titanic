import { Schema, SchemaTypes, Types, model } from "mongoose"

const usersSchema = Schema(
  {
    _id: { type: SchemaTypes.ObjectId, default: () => new Types.ObjectId() },
    pseudo: { type: String, required: true },
    motDePasse: { type: String, required: true },
    nom: String,
    prenom: String,
    email: String,
    phoneNumber: String,
    age: String,
    birthDate: String,
    nationnalite: String,
  }
  // { versionKey: false } // Permet de supprimer le "__v" si besoin
)

const collectionName = "users"
export default model("Users", usersSchema, collectionName)
