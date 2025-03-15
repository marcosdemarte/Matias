// Constants.js
const prod = {
    url: {
        API_URL: 'https://myapp.herokuapp.com',
        API_URL_USERS: 'https://myapp.herokuapp.com/users'
    }
};
const dev = {
    url: {
        API_URL: 'http://localhost:3000'
    }
};

/*var url = config.url.API_URL;
var url_users = config.url.API_URL_USERS;*/
export const config = process.env.NODE_ENV === 'development' ? dev : prod;


/*
const { 
    DEV_MAIL_HOST, 
    DEV_MAIL_PORT, 
    DEV_MAIL_USER,
    DEV_MAIL_PASSWORD,
    LIVE_MAIL_HOST, 
    LIVE_MAIL_PORT, 
    LIVE_MAIL_USER, 
    LIVE_MAIL_PASSWORD
} = process.env;

npm start or in production when deployed running npm run deploy
*/