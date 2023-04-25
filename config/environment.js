const fs = require('fs');
const rfs = require('rotating-file-stream');
const path= require('path');

const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLog = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory
});

const development = {
    name: 'development',
    asset_path: './assets',
    session_cookie_key: 'keyboardDog',
    db: 'codeial_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'sanskarbhutani100@gmail.com',
            pass: 'njqkstwwylxjxhsl'
        }
    },
    google_client_Id:'872425628813-e67rnig37j4rj5d67ne0fn28g6jhieg9.apps.googleusercontent.com',
    google_client_Secret: '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',
    google_callback_Url:'http://localhost:8000/users/auth/google/callback',
    JWT_secret_key: 'codeial',
    morgan: {
        mode: 'dev',
        options: {stream: accessLog}
    }
}

const production = {
    name: 'production',
    asset_path: process.env.Asset_path,
    session_cookie_key: process.env.Codeial_session_Cookie,
    db: process.env.Codeial_Database,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.Codeial_Gmail_Username,
            pass: process.env.Codeial_Gmail_Pass
        }
    },
    google_client_Id: process.env.Codeial_Google_ClientId,
    google_client_Secret: process.env.Codeial_Client_Secret,
    google_callback_Url: process.env.Codeial_Callback,
    JWT_secret_key: process.env.Codeial_JWT,
    morgan: {
        mode: 'combined',
        options: {stream: accessLog}
    }
}

module.exports = eval(process.env.Codeial_Environment) == undefined ? development: eval(process.env.Codeial_Environment);
// module.exports = development;