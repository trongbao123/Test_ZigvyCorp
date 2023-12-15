import { Document } from "mongoose";

interface PostInterface extends Document {
    id: Number;
    userId: Number;
    title: String;
    body: String;
}

export default PostInterface;