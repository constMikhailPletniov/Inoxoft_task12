const { OAuth, Action } = require('../database');

const dayJs = require('dayjs');
const utc = require('dayjs/plugin/utc');

const year = new Date().getFullYear();
const month = new Date().getMonth() + 1;
const day = new Date().getDate();


dayJs.extend(utc);

module.exports = async () => {
    const prevMonth = dayJs.utc(`${year}-${month}-${day}`).subtract(1, 'month');
    await OAuth.deleteMany({ createdAt: { $lse: prevMonth } });
    await Action.deleteMany({ createAt: { $lse: prevMonth } });
};
