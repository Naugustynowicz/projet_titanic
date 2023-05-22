import { Schema, SchemaTypes, Types, model } from "mongoose"

const authorSchema = Schema(
  {
    _id: { type: SchemaTypes.ObjectId, default: () => new Types.ObjectId() },
    name: { type: String, required: true },
  }
  // { versionKey: false } // Permet de supprimer le "__v" si besoin
)

const collectionName = "authors"
export default model("Author", authorSchema, collectionName)
