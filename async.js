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

        if (jobs.length == 0) {
            resolve([]);

            return;
        }

        while (countRun < parallelNum) {
            countRun += 1;
        }

        function finish(result, index) {
            results[index] = result;
            countFinish += 1;
            if (countFinish === jobs.length) {
                resolve(results);

                return true;
            }

            if (countRun < jobs.length) {
                main(jobs[countRun], countRun);
                countRun += 1;
            }
        }
        function main(jobNumber, countRun) {
            let index = result => finish(result, countRun);
            new Promise((allow, ignore) => {
                jobs[jobNumber]().then(allow, ignore);
                setTimeout(ignore, timeout, new Error('Promise timeout'));
            }).then(index, index);
        }
    });
}
