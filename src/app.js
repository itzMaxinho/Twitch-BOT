// import tmi from 'tmi.js'
// import { BOT_USERNAME, OAUTH_TOKEN, CHANNEL_NAME, BLOCKED_WORDS } from './constants';

// const options = {
//     options: { debug: true },
    
//     identity: {
//         username: BOT_USERNAME,
//         password: OAUTH_TOKEN
//     },
//     channels: [CHANNEL_NAME]
// }

// const client = new tmi.Client(options);

// client.connect();

// client.on('message', (channel, userstate, message, self) => {
   
//     message = message.toLowerCase()
//     let shouldSendMessage = false
//     // check message
//     shouldSendMessage = BLOCKED_WORDS.some(blockedWord => message.includes(blockedWord.toLowerCase()))


//     if (shouldSendMessage) {
//         //tell user
//         client.say(channel, `@${userstate.username}, spierdalaj głupi bocie.`)

//         //delete message
//         client.deletemessage(channel, userstate.id)
//     }

// });


