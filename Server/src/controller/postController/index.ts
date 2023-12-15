import { Request, Response } from "express";
import { HttpStatus } from "../../utils/http-status";
import PostInterface from "../../utils/interface/PostInterface";
import PostModel from "../../model/postModel";
import CommentModel from "../../model/commentModel";
import UserModel from '../../model/userModel/index';

class PostController {
    //[GET] /post-list
    getPostList = async (req: Request, res: Response, next: any) => {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const size = parseInt(req.query.size as string) || 20;
            const keyword = req.query.keyword as string || '';

            const query = {
                $or: [
                    { title: { $regex: keyword, $options: 'i' } },
                    { body: { $regex: keyword, $options: 'i' } },
                ],
            };

            const paginatedPosts = await PostModel.paginate(query, {
                page,
                limit: size,
            });

            const postIds = paginatedPosts.docs.map(post => post.id);

            const userIds = paginatedPosts.docs.map(post => (post as any).userId);
            const uniqueUserIds = [...new Set(userIds)];

            for (const userId of uniqueUserIds) {
                const user = await UserModel.find({ id: userId });
                const postsByUser = paginatedPosts.docs.filter(post => (post as any).userId === userId);

                for (const post of postsByUser) {
                    const postId = post.id;
                    const comments = await CommentModel.find({ postId });

                    (post as any).comments = comments;
                    (post as any).user = user;
                }
            }

            res.status(HttpStatus.OK).json({
                success: true,
                statusCode: HttpStatus.OK,
                result: paginatedPosts,
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

    //[POST] /create-post-list
    createPostList = async (req: Request, res: Response, next: any) => {

        try {
            const post = await new PostModel<PostInterface>(req?.body).save();

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
    updatePostList = async (req: Request, res: Response, next: any) => {

        try {
            const id = req?.params?.id;
            const updates = req.body;
            const updatedPost = await PostModel.findByIdAndUpdate<PostInterface>(
                id,
                { $set: updates },
                { new: true }
            ).lean();

            if (!updatedPost) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    success: false,
                    statusCode: HttpStatus.NOT_FOUND,
                    message: "Post does not exist!",
                    result: undefined
                });
            }

            return res.status(HttpStatus.OK).json({
                success: true,
                statusCode: HttpStatus.OK,
                data: updatedPost,
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


    //[PATCH] /patch-post/:id
    patchPost = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const updates = req.body;

            const post = await PostModel.findByIdAndUpdate<PostInterface>(
                id,
                { $set: updates },
                { new: true }
            ).lean();

            if (!post) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    success: false,
                    statusCode: HttpStatus.NOT_FOUND,
                    message: 'Post not found',
                    result: undefined,
                });
            }

            return res.status(HttpStatus.OK).json({
                success: true,
                statusCode: HttpStatus.OK,
                data: post,
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

    //[DELETE] /delete-post/:id
    deletePost = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;

            const deletedPost = await PostModel.findByIdAndDelete(id).lean();

            return res.status(HttpStatus.OK).json({
                success: true,
                statusCode: HttpStatus.OK,
                message: 'Post deleted successfully',
                data: deletedPost,
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

    //[GET] /post-detail/:id
    getPostDetail = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;

            const post = await PostModel.findById(id).lean();

            if (!post) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    success: false,
                    statusCode: HttpStatus.NOT_FOUND,
                    message: 'Post not found',
                    result: undefined,
                });
            }

            return res.status(HttpStatus.OK).json({
                success: true,
                statusCode: HttpStatus.OK,
                data: post,
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

export const post = new PostController();
