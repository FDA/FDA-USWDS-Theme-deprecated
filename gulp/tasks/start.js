// modules
const { spawn } = require('child_process');

/**
 * Runs express server in a child process
 * To use, launch Node.js using the --experimental-abortcontroller flag.
 * 
 * @see https://nodejs.org/docs/latest-v14.x/api/globals.html
 * @returns {ChildProcess} A spawned child process
 */
function createStartTask() {
    const controller = new AbortController();
    const { signal } = controller;
    const env = {
        ...process.env,
        NODE_ENV: 'development'
    }

    const express = spawn('node', ['./server.js'],
        {
            env, 
            signal
        });

    express.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    express.on('error', (err) => {
        throw err;
    });

    return express;
}

module.exports = createStartTask;
