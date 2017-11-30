'use strict';

exports.isStar = true;
exports.runParallel = runParallel;

/** Функция паралелльно запускает указанное число промисов
 * @param {Array} jobs – функции, которые возвращают промисы
 * @param {Number} parallelNum - число одновременно исполняющихся промисов
 * @param {Number} timeout - таймаут работы промиса
 */

function runParallel(jobs, parallelNum, timeout = 1000) {
    // асинхронная магия
    return new Promise(resolve => {
        let countFinish = 0;
        const results = [];

        if (jobs.length === 0) {
            resolve([]);

            return;
        }

        let value = 0;
        while (value < parallelNum) {
            main(countFinish += 1);
            value += 1;
        }

        function main(count) {
            let index = result => finish(result, count);
            new Promise((allow, ignore) => {
                jobs[count]().then(allow, ignore);
                setTimeout(ignore, timeout, new Error('Promise timeout'));
            })
                .then(index, index);
        }

        function finish(result, index) {
            results[index] = result;
            if (countFinish === jobs.length) {
                resolve(results);

                return true;
            }

            if (countFinish < jobs.length) {
                countFinish += 1;
                main(countFinish);
            }
        }
    });
}
