import { Document } from "mongoose";

interface GeoLocation extends Document {
    lat: string;
    lng: string;
}

interface Address extends Document {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: GeoLocation;
}

interface Company extends Document {
    name: string;
    catchPhrase: string;
    bs: string;
}

interface UserInterface extends Document {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: Company;
}


export default UserInterface;