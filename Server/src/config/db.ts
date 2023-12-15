import mongoose, { ConnectOptions } from "mongoose";

async function connect() {
    try {

        await mongoose.connect("mongodb+srv://phambao11062001:6Tl2CoeTICjEJGGS@phambao11062001.ihd100b.mongodb.net/?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as any);
        console.log("connect success");
    } catch (error) {
        console.log(error, "connect fail");
    }
}

export { connect }