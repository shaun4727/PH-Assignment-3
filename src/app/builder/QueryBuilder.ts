import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
    public modelQuery: Query<T[], T>;
    public query: Record<string, unknown>;

    constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
        this.modelQuery = modelQuery;
        this.query = query;
    }

    search(searchableFields: string[]) {
        if (this.query?.search) {
            const { search } = this.query;
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map(
                    (field) =>
                        ({
                            [field]: { $regex: search, $options: 'i' }
                        }) as FilterQuery<T>
                )
            });
        }

        return this;
    }

    filter() {
        if (this.query?.filter) {
            this.modelQuery = this.modelQuery.find({ author: this.query.filter });
        }

        return this;
    }

    sort() {
        let order = '';
        if (this.query?.sortOrder) {
            order = this.query.sortOrder == 'asc' ? '' : '-';
        }
        let sort = (this.query?.sortBy as string)?.split(',')?.join(` ${order}`) || 'createdAt';
        sort = order + sort;

        this.modelQuery = this.modelQuery?.sort(sort as string);
        return this;
    }
}

export default QueryBuilder;
