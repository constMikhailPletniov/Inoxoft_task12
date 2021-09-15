const User = require('../database/User');

module.exports = {
    findDynamic: async (query = {}) => {

        const {
            page = 1,
            perPage = 1,
            sortBy = 'createdAt',
            order = 'asc',
            ...filters
        } = query;

        const skip = (page - 1) * perPage;

        const orderBy = async (order) => {
            try {

                if (order === 'asc') return 1;
                if (order === 'desc') return -1;

            } catch (err) {
                return err;
            }
        }

        const sort = { [sortBy]: await orderBy(order) };

        const filterObj = {};
        const ageFilter = {};

        Object.keys(filters).forEach((key) => {

            if (key === 'role') {
                const ArrRole = filters.role.split(';');
                filterObj.role = { $in: ArrRole };
            } else if (key === 'email') {
                filterObj.email = filters.email;
            } else if (key === 'name') {
                filterObj.name = { $regex: `^${filters.name}`, $options: 'i' };
            } else if (key === 'age.gte') {
                Object.assign(ageFilter, { $gte: +filters['age.gte'] });
            } else if (key === 'age.lte') {
                Object.assign(ageFilter, { $lte: +filters['age.lte'] });
            }

        });

        if (Object.keys(ageFilter).length) {
            filterObj.age = ageFilter;
        }

        const user = await User.
            find(filterObj).
            select('-__v -password').
            limit(+perPage).
            skip(skip).
            sort(sort);

        const count = await User.countDocuments(filterObj);

        return {
            data: user,
            page,
            limit: +perPage,
            count,
            pageCount: Math.ceil(count / perPage)
        };
    }
}
