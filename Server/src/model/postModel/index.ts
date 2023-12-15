import { Document, Schema, model, Model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import PostInterface from '../../utils/interface/PostInterface';


// Định nghĩa schema
const PostSchema: Schema = new Schema(
    {
        id: { type: Number, unique: true, required: true },
        userId: { type: Number, required: true, },
        body: { type: String, required: true },
        title: { type: String, required: true },
        comments: [{ type: Number, ref: 'comment' }],
        user: [{ type: Number, required: true, ref: 'user' }],
        dateCreate: { type: Date }
    },
    { timestamps: true, collection: 'post' }
);

// Áp dụng plugin paginate vào schema
PostSchema.plugin(mongoosePaginate);

// Định nghĩa interface cho PostModel
interface PostModelInterface extends Model<PostInterface> {
    paginate: (
        query: any,
        options: any
    ) => Promise<{ docs: Document<any, any>[]; total: number; limit: number; page: number; pages: number }>;
}

// Định nghĩa model
const PostModel: PostModelInterface = model<PostInterface, PostModelInterface>('post', PostSchema);

export default PostModel;