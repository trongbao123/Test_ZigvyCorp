import { Request, Response } from "express";
import { HttpStatus } from "../../utils/http-status";
import UserInterface from "../../utils/interface/userInterface";
import UserModel from "../../model/userModel";


class UserController {
    //[GET] /user-list
    getUserList = async (req: Request, res: Response, next: any) => {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const size = parseInt(req.query.size as string) || 20;
            const searchTerm = req.query.searchTerm as string || '';

            const query = {
                $or: [
                    { name: { $regex: searchTerm, $options: 'i' } },
                    { username: { $regex: searchTerm, $options: 'i' } },
                ],
            };

            const paginatedUser = await UserModel.paginate(query, {
                page,
                limit: size,
            });
            res.status(HttpStatus.OK).json({
                success: true,
                statusCode: HttpStatus.OK,
                result: paginatedUser,
            });
        } catch (error: any) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: error,
                result: undefined
            });
        }
    };

    //[POST] /create-user
    createUser = async (req: Request, res: Response, next: any) => {

        try {
            const post = await new UserModel<UserInterface>(req?.body).save();

            res.status(HttpStatus.OK).json({
                success: true,
                statusCode: HttpStatus.OK,
                data: post,
            });
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: error,
                result: undefined
            });
        }
    };

    //[PUT] /update-user/:id
    updateUser = async (req: Request, res: Response, next: any) => {

        try {
            const id = req?.params?.id;
            const updates = req.body;
            const user = await UserModel.findByIdAndUpdate<UserInterface>(
                id,
                { $set: updates },
                { new: true }
            ).lean();

            if (!user) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    success: false,
                    statusCode: HttpStatus.NOT_FOUND,
                    message: "User does not exist!",
                    result: undefined
                });
            }

            return res.status(HttpStatus.OK).json({
                success: true,
                statusCode: HttpStatus.OK,
                data: user,
            });
        } catch (error: any) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: error,
                result: undefined
            });
        }
    };


    //[PATCH] /patch-user/:id
    patchUser = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const updates = req.body;

            const post = await UserModel.findByIdAndUpdate<UserInterface>(
                id,
                { $set: updates },
                { new: true }
            ).lean();

            if (!post) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    success: false,
                    statusCode: HttpStatus.NOT_FOUND,
                    message: 'User not found',
                    result: undefined,
                });
            }

            return res.status(HttpStatus.OK).json({
                success: true,
                statusCode: HttpStatus.OK,
                data: post,
            });
        } catch (error: any) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: error,
                result: undefined,
            });
        }
    };

    //[DELETE] /delete-user/:id
    deleteUser = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;

            const deletedUser = await UserModel.findByIdAndDelete(id).lean();

            return res.status(HttpStatus.OK).json({
                success: true,
                statusCode: HttpStatus.OK,
                message: 'User deleted successfully',
                data: deletedUser,
            });
        } catch (error: any) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: error,
                result: undefined,
            });
        }
    };

    //[GET] /post-detail/:id
    getUserDetail = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;

            const user = await UserModel.findById(id).lean();

            if (!user) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    success: false,
                    statusCode: HttpStatus.NOT_FOUND,
                    message: 'User not found',
                    result: undefined,
                });
            }

            return res.status(HttpStatus.OK).json({
                success: true,
                statusCode: HttpStatus.OK,
                data: user,
            });
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: error,
                result: undefined,
            });
        }
    };
}

export const user = new UserController();
