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
        const results = [];

        if (jobs.length === 0) {
            resolve([]);

            return;
        }

        let value = 0;
        while (value < parallelNum) {
            value += 1;
            main(value - 1);
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
            if (results.length === jobs.length) {
                resolve(results);

                return true;
            }

            if (value < jobs.length) {
                main(value += 1);
            }
        }
    });
}
