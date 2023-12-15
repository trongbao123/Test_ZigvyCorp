import { Document, Schema, model, Model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import UserInterface from '../../utils/interface/userInterface';


const UserSchema: Schema = new Schema(
    {
        id: { type: Number, unique: true, required: true },
        name: { type: String, required: true },
        username: { type: String, required: true },
        email: { type: String, required: true },
        address: { type: Object, required: true },
        phone: { type: String, required: true },
        website: { type: String },
        company: { type: Object, required: true },
    },
    {
        timestamps: true, collection: "user"
    }
);

// Áp dụng plugin paginate vào schema
UserSchema.plugin(mongoosePaginate);

// Định nghĩa interface cho UserModel
interface PostModelInterface extends Model<UserInterface> {
    paginate: (
        query: any,
        options: any
    ) => Promise<{ docs: Document<any, any>[]; total: number; limit: number; page: number; pages: number }>;
}

// Định nghĩa model
const UserModel: PostModelInterface = model<UserInterface, PostModelInterface>('user', UserSchema);

export default UserModel;

