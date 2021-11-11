import { UserModel } from "./user.model";

export interface RequestModel {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
    status: number;
    cost: number;
    requestto: UserModel;
    requestby: UserModel;
    city: string;
}