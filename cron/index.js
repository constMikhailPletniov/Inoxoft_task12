const cron = require('node-cron');
const removeTokens = require('./removeOldTokens');

module.exports = () => {
    cron.schedule(' 0 0 * * *', () => {
        removeTokens();
    });
}
