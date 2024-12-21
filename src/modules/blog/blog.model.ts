import { model, Schema } from 'mongoose';
import { TBlog } from './blog.interface';

const blogSchema = new Schema<TBlog>(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        isPublished: { type: Boolean, default: true },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
);

blogSchema.post('save', async function (doc, next) {
    await doc.populate('author', '-password -__v -_id -createdAt -updatedAt');
    next();
});

export const Blog = model<TBlog>('Blog', blogSchema);
