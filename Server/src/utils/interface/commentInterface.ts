import { Document } from "mongoose";

interface CommentInterface extends Document {
    postId: Number;
    id: Number;
    name: String;
    body: String;
    email: String
}

export default CommentInterface;