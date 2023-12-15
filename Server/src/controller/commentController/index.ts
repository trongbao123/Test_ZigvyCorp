import { Request, Response } from "express";
import { HttpStatus } from "../../utils/http-status";
import CommentModel from "../../model/commentModel";
import CommentInterface from "../../utils/interface/commentInterface";

class CommentController {
    //[GET] /commnet-list
    getCommentList = async (req: Request, res: Response, next: any) => {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const size = parseInt(req.query.size as string) || 50;
            const searchTerm = req.query.searchTerm as string || '';

            const query = {
                $or: [
                    { name: { $regex: searchTerm, $options: 'i' } },
                    { body: { $regex: searchTerm, $options: 'i' } },
                    { email: { $regex: searchTerm, $options: 'i' } },
                ],
            };

            const comments = await CommentModel.paginate(query, {
                page,
                limit: size,
            });
            res.status(HttpStatus.OK).json({
                success: true,
                statusCode: HttpStatus.OK,
                result: comments,
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

    //[POST] /create-comment
    createComment = async (req: Request, res: Response, next: any) => {

        try {
            const post = await new CommentModel<CommentInterface>(req?.body).save();

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

    //[PUT] /update-post/:id
    updateComment = async (req: Request, res: Response, next: any) => {

        try {
            const id = req?.params?.id;
            const updates = req.body;
            const comment = await CommentModel.findByIdAndUpdate<CommentInterface>(
                id,
                { $set: updates },
                { new: true }
            ).lean();

            if (!comment) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    success: false,
                    statusCode: HttpStatus.NOT_FOUND,
                    message: "Comment does not exist!",
                    result: undefined
                });
            }

            return res.status(HttpStatus.OK).json({
                success: true,
                statusCode: HttpStatus.OK,
                data: comment,
            });
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: error,
                result: undefined
            });
        }
    };


    //[PATCH] /patch-comment/:id
    patchComment = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const updates = req.body;

            const comment = await CommentModel.findByIdAndUpdate<CommentInterface>(
                id,
                { $set: updates },
                { new: true }
            ).lean();

            if (!comment) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    success: false,
                    statusCode: HttpStatus.NOT_FOUND,
                    message: 'Comment not found',
                    result: undefined,
                });
            }

            return res.status(HttpStatus.OK).json({
                success: true,
                statusCode: HttpStatus.OK,
                data: comment,
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

    //[DELETE] /delete-comment/:id
    deleteComment = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;

            const comment = await CommentModel.findByIdAndDelete(id).lean();

            return res.status(HttpStatus.OK).json({
                success: true,
                statusCode: HttpStatus.OK,
                message: 'Comment deleted successfully',
                data: comment,
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

    //[GET] /comment-detail/:id
    getCommentDetail = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;

            const comment = await CommentModel.findById(id).lean();

            if (!comment) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    success: false,
                    statusCode: HttpStatus.NOT_FOUND,
                    message: 'Comment not found',
                    result: undefined,
                });
            }

            return res.status(HttpStatus.OK).json({
                success: true,
                statusCode: HttpStatus.OK,
                data: comment,
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

export const commnet = new CommentController();
