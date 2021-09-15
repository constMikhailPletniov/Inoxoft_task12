const Pest = require('../database/Pest');

module.exports = {
    findDynamicPest: async (query = {}) => {
        const {
            numbers = 1,
            page = 1,
            sortBy = 'createdAt',
            order = 'asc',
            ...filters
        } = query;

        const pestSkip = (page - 1) * numbers;

        const orderBy = async (order) => {
            try {

                if (order === 'asc') return 1;
                if (order === 'desc') return -1;

            } catch (err) {
                return err;
            }
        }
        const sortPests = { [sortBy]: await orderBy(order) };

        const filterObj = {};
        const numFilter = {};

        const arrGte = ['price', 'purchase', 'number'];
        let out = '';

        Object.keys(filters).forEach((key) => {

            arrGte.forEach((item) => {
                const result = key.split('.').splice(0, 1).toString();
                if (result === item) {
                    out = item;
                    return out;
                }
            });

            if (key === 'clasification') {
                const Arrclass = filters.clasification.split(';');
                filterObj.clasification = { $in: Arrclass };
            } else if (key === 'name') {
                filterObj.name = { $regex: `^${filters.name}`, $options: 'i' };
            } else if (key === `${out}.gte`) {
                Object.assign(numFilter, { $gte: +filters[`${out}.gte`] });
            } else if (key === `${out}.lte`) {
                Object.assign(numFilter, { $lte: +filters[`${out}.lte`] });
            }
        });

        if (Object.keys(numFilter).length) {
            filterObj[`${out}`] = numFilter;
        }

        const pests = await Pest
            .find(filterObj)
            .select('-__v -user')
            .limit(+numbers)
            .skip(pestSkip)
            .sort(sortPests);

        const count = await Pest.countDocuments(filterObj);

        return {
            data: pests,
            page,
            limit: +numbers,
            count,
            pageCount: Math.ceil(count / numbers)
        };
    }
}
