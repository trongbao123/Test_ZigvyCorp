import { Document, Schema, model, Model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import CommentInterface from '../../utils/interface/commentInterface';

const CommentSchema: Schema = new Schema(
    {
        id: { type: Number, unique: true, required: true },
        postId: { type: Number, ref: 'post', required: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
        body: { type: Object, required: true },

    },
    {
        timestamps: true, collection: "comment"
    }
);

// Áp dụng plugin paginate vào schema
CommentSchema.plugin(mongoosePaginate);

// Định nghĩa interface cho UserModel
interface CommentModelInterface extends Model<CommentInterface> {
    paginate: (
        query: any,
        options: any
    ) => Promise<{ docs: Document<any, any>[]; total: number; limit: number; page: number; pages: number }>;
}

// Định nghĩa model
const CommentModel: CommentModelInterface = model<CommentInterface, CommentModelInterface>('comment', CommentSchema);

export default CommentModel;
