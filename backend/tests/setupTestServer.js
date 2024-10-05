// setupTestServer.js
import app from '../app';
import mongoose from 'mongoose';

let appServer;

// Create a function to start the server and return a promise
const initializeServer = () => {
    return new Promise((resolve) => {
        appServer = app.listen(0, () => {
            resolve(appServer); // Resolve the promise with the appServer
        });
    });
};

// Clean up the server and close the database connection
const closeServer = async () => {
    await mongoose.connection.close();
    if (appServer) appServer.close();
};

export { initializeServer, closeServer };
