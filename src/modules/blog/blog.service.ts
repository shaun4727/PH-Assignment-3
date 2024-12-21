import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../app/utils/AppError';
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';
import QueryBuilder from '../../app/builder/QueryBuilder';
import { blogSearchableFields } from './blog.constant';

const createBlogIntoDB = async (blog: TBlog) => {
    const result = await Blog.create(blog);

    return {
        _id: result._id,
        title: result.title,
        content: result.content,
        author: result.author
    };
};

const updateSingleBlogIntoDB = async (id: string, payload: Partial<TBlog>, user: JwtPayload) => {
    const blog = await Blog.findById({ _id: id });
    if (!blog) {
        throw new AppError(404, 'Blog not found');
    }
    if (blog?.author != user.userId) {
        throw new AppError(403, 'You are not authorized to update this blog');
    }
    const result = await Blog.findOneAndUpdate({ _id: id }, payload, {
        new: true
    }).populate('author', '-password -__v -_id -createdAt -updatedAt');

    if (!result) {
        throw new AppError(404, 'Blog not found');
    }

    return {
        _id: result._id,
        title: result.title,
        content: result.content,
        author: result.author
    };
};

const deleteSingleBlogIntoDB = async (id: string, user: JwtPayload) => {
    const blog = await Blog.findById({ _id: id });
    if (!blog) {
        throw new AppError(404, 'Blog not found');
    }

    if (blog?.author != user.userId) {
        throw new AppError(403, 'You are not authorized to delete this blog');
    }
    const result = await Blog.findOneAndUpdate({ _id: id }, { isPublished: false }, { new: true });

    if (!result) {
        throw new AppError(400, 'Failed to delete Blog');
    }
};

const getAllBlogFromDB = async (query: Record<string, unknown>) => {
    const blogQuery = new QueryBuilder(
        Blog.find()
            .populate('author', '-password -__v -_id -createdAt -updatedAt')
            .select('-__v -createdAt -updatedAt'),
        query
    )
        .search(blogSearchableFields)
        .sort()
        .filter();

    const result = blogQuery.modelQuery;
    return result;
};

export const BlogServices = {
    createBlogIntoDB,
    updateSingleBlogIntoDB,
    deleteSingleBlogIntoDB,
    getAllBlogFromDB
};
