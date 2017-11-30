'use strict';

exports.isStar = false;
exports.runParallel = runParallel;

/** Функция паралелльно запускает указанное число промисов
 * @param {Array} jobs – функции, которые возвращают промисы
 * @param {Number} parallelNum - число одновременно исполняющихся промисов
 * @param {Number} timeout - таймаут работы промиса
 */

const queue = jobs.slice();
const results = new Map();
let runningCount = 0;
return new Promise((resolve) => {
    const result = [];
    let finishedJobs = 0;
    
    +        let currentJob = 0;
    +        const promises = makeArrOfPromises(jobs, timeout);
    +        promises.slice(0, parallelNum)
    +            .forEach((promise, idx) => start(promise, idx));
    +
    +        function start(promise) {
    +            const idx = currentJob++;
    +            const handler = data => finish(data, idx);
    +            promise().then(handler);
    +        }
    +
    +        function finish(data, idx) {
    +            result[idx] = data;
    +            finishedJobs++;
    +            if (jobs.length === finishedJobs) {
    +                resolve(result);
    +            }
    +            start(promises[currentJob]);
    +        }
    +    });
     }



function runParallel(jobs, parallelNum, timeout = 1000) {
    // асинхронная магия
    return new Promise((resolve, reject) => {
        job().then(resolve)
        .catch(reject);

    return new Promise((resolve) => {
        const queue = jobs.slice();
        const results = new Map();
        let runningCount = 0;
        
        function start(job) {
            runningCount++;

            Promise.race([job().catch(err => err),
                delay(timeout).then(() => new Error('Promise timeout'))])
                .then(result => {
                    results[job] = result;
                    runningCount--;
                    startNext();
                    if (runningCount === 0) {
                        onComplete();
                    }
                });
        }
        
        function startNext() {
            const job = queue.shift();
            if (!job) {
                return;
            }
            start(job);
        }
        function onComplete() {
            resolve(jobs.map(job => results[job]));
        }

        for (let i = 0; i < parallelNum; i++) {
            startNext();
        }
    });
}

function delay(timeout) {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
}