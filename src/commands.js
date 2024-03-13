import tmi from 'tmi.js';
import fs from 'fs';
import db from '../db.json';
import dbeco from '../dbeco.json';
import dbcommands from '../dbcommands.json';
import dbtime from '../dbtime.json';
import opluted from '../opluted.json';
import dbplayers from '../dbplayers.json';
import dbsixletterwords from '../dbsixletterwords.json';
import dbsevenletterwords from '../dbsevenletterwords.json';
import dbeightletterwords from '../dbeightletterwords.json';
import { BOT_USERNAME, OAUTH_TOKEN, CHANNEL_NAME, BLOCKED_WORDS, TOKEN, ClientID, UserID } from './constants';
import fetch from 'node-fetch';
import { v4 as uuidV4 } from "uuid";
import { count } from 'console';

const options = {
    options: { debug: true },
    // connection: {
    //     reconnect: true,
    //     secure: true
    // },
    identity: {
        username: BOT_USERNAME,
        password: OAUTH_TOKEN
    },
    channels: [CHANNEL_NAME]
}

const client = new tmi.Client(options);
client.connect();

// REPLACE streamerTwitchID WITH YOUR ACTUAL TWITCH ID
// REPLACE moderatorTwitchID WITH YOUR ACTUAL TWITCH ID

// USUWANIE BANNABLE WIADOMOŚCI 
let listaSpier = [];
let whatFor;

client.on('message', (channel, userstate, message, self) => {
    if (self) return;

    if (userstate.username == 'streamelements' || userstate.username == 'nightbot') {
        return;

    } else {

        message = message.toLowerCase()
        let shouldSendMessage = false
        shouldSendMessage = BLOCKED_WORDS.some(blockedWord => message.includes(blockedWord.toLowerCase()))

        if (userstate.mod && shouldSendMessage) {
            client.say(channel, `/me ` + `@${userstate['display-name']}, słuchaj gagatku. Możesz zaraz tego moda stracić KEKW EZ`)

        } else if (shouldSendMessage) {

            compareStringAndArray(message.toLowerCase(), BLOCKED_WORDS);
            console.log(whatFor)

            if (listaSpier.includes(userstate.username)) {
                client.say(channel, `/me ` + `@${userstate['display-name']}, wypad na dłużej głupi bocie. (timeout za napisanie "${whatFor}")`)
                TimeoutUser(userstate.username, 600)
            } else {
                listaSpier.push(userstate.username)
                client.say(channel, `/me ` + `@${userstate['display-name']}, wypad głupi bocie. (timeout za napisanie "${whatFor}")`)
                TimeoutUser(userstate.username, 20)
            }
        }
    }

    function compareStringAndArray(string, array) {
        whatFor = "";
        for (let i = 0; i < array.length; i++) {
            if (string.includes(array[i])) {
                whatFor = array[i];
                break;
            }
        }

        // switching bad words for censored terms
        switch (whatFor) {
            case 'czarnuch':
                whatFor = 'n-word'
                break;
            case 'niga':
                whatFor = 'n-word'
                break;
            case 'nigga':
                whatFor = 'n-word'
                break;
            case 'nigger':
                whatFor = 'n-word'
                break;
            case 'żyd':
                whatFor = 'ż-word'
                break;
        }
    }
});


// ==================================================== KOMENDY ==========================================================



// global cooldown !blockadeglobal
let cooldown = {};
let blockadeGlobal;
client.on('message', (channel, userstate, message, self) => {
    //console.log(userstate)
    if (self || userstate.username === 'itzmaxinho' || userstate.mod) return;

    onMessageHandler();

    function onMessageHandler() {

        // Check if the message starts with "!"
        if (message.trim().startsWith('!')) {
            // Check if the user is on cooldown
            const username = userstate.username;
            if (cooldown[username] && Date.now() - cooldown[username] < 8000) {
                // User is on cooldown, send a warning message
                blockadeGlobal = true;
                return;
            }

            // User is not on cooldown, execute the command
            cooldown[username] = Date.now();
            blockadeGlobal = false;
            // your code to execute command goes here
        }
    }
});

// DISCORD
client.on('message', (channel, userstate, message, self) => {
    if (self || blockadeGlobal) return;

    if ((message.toLowerCase().includes('!discord'))
        || (message.toLowerCase().includes('!dc'))
        || (message.toLowerCase().includes('!teamspeak'))
        || (message.toLowerCase().includes('!ts'))
        || (message.toLowerCase().includes('!ts3'))) {

        client.say(channel, `/me ` + `@${userstate['display-name']} https://discord.gg/yourLink`);
    } else return;
});


// ROCKET LEAGUE KAMERA
client.on('message', (channel, userstate, message, self) => {
    if (self || blockadeGlobal) return;

    if ((message.toLowerCase() === '!cam')
        || (message.toLowerCase() === '!kam')
        || (message.toLowerCase() === '!kamera')
        || (message.toLowerCase() === '!camera')
        || (message.toLowerCase() === '!settings')
        || (message.toLowerCase() === '!ustawienia')) {

        client.say(channel, `/me ` + `@${userstate['display-name']} 110 / 260 / 90 / -4 / 0.70 / 2.50 / 1.50`);
    } else return;
});


// ROCKET LEAGUE CZY KLAWA
client.on('message', (channel, userstate, message, self) => {
    if (self || blockadeGlobal) return;

    if ((message.toLowerCase() === '!klawa')
        || (message.toLowerCase() === '!klawiatura')) {

        client.say(channel, `/me ` + `@${userstate['display-name']}, Tak.`);
    } else return;
});


// ROCKET LEAGUE CZY KIEROWNICA
client.on('message', (channel, userstate, message, self) => {
    if (self || blockadeGlobal) return;

    if (message.toLowerCase() === '!kierownica') {
        client.say(channel, `/me ` + `@${userstate['display-name']} dobrze się czujesz?`);
    }
});


// !AUTO
client.on('message', (channel, userstate, message, self) => {
    if (self || blockadeGlobal) return;

    if ((message.toLowerCase() === '!auto')
        || (message.toLowerCase() === '!samochód')
        || (message.toLowerCase() === '!preset')
        || (message.toLowerCase() === '!samochud')
        || (message.toLowerCase() === '!samohud')
        || (message.toLowerCase() === '!samochod')) {
        client.say(channel, `/me ` + `@${userstate['display-name']}, GOLDEN DOMINUS: hAeXDYhKHIKrCLEWcBggABwmw+SdUmQ+/gMAAAAAAA== | SSL SET: Awc9DUyGQ8CpxFk4DBDAYbLJO6WZ/7QAAAAAAA== | MAXVAMPLE: QwcsDUyGQuibBYFLEwMEcJgs8U5p4YDUHID6PwA=`);
    }
});


// RANGA
client.on('message', (channel, userstate, message, self) => {
    if (self || blockadeGlobal) return;

    if ((message.toLowerCase() === '!ranga')
        || (message.toLowerCase() === '!rank')
        || (message.toLowerCase() === '!rangi')
        || (message.toLowerCase() === 'wykrzyknik ranga')
        || (message.toLowerCase() === 'wykrzyknikranga')
        || (message.toLowerCase() === '!ranks')) {

        client.say(channel, `/me ` + `@${userstate['display-name']}, Hoops: SSL, 2s: GC3, 3s: GC3, 1s: Do bana`);
    }
});


// LOS
let regexpCommandRest1 = new RegExp(/^!([a-zA-Z0-9]+)(?:\W+)?(\w+)?(?:\W+)?(.*)?/);
let randomNumberLOS;
let winningNumber = 999
let maxNumber = 1000
let isAllowed;

client.on('message', (channel, userstate, message, self) => {
    if (self || blockadeGlobal) return;

    if ((userstate['user-id'] == streamerTwitchID || userstate.mod) && message.toLowerCase().startsWith('!los test')) {

        let [raw, command, argument, rest] = message.match(regexpCommandRest1);
        let losCounter = 0;

        if (!rest || rest > 5000) return;

        for (let i = 0; i < rest; i++) {
            randomNumberLOS = Math.floor(Math.random() * maxNumber - 1) + 1;

            if (randomNumberLOS == winningNumber) {
                losCounter++
            }
        }
        client.say(channel, `/me ` + `Na ` + rest + ` losowań, liczba ` + winningNumber + ` padła ` + losCounter + ` razy!`)
    }

    if (message.toLowerCase() === '!los') {

        const currentTime = new Date().getTime();

        function getLastTime(username) {
            const lastTime = dbtime.timestamps.find(last => last.nickname === username);

            if (lastTime) {
                return lastTime.lastTimeUsed;
            } else {
                return null; // Nickname not found
            }
        }

        let lastTimeCommandWasUsed = getLastTime(userstate.username)

        const timeSinceLastUse = currentTime - lastTimeCommandWasUsed;

        const hoursSinceLastUse = timeSinceLastUse / (1000 * 60 * 60);

        if (!lastTimeCommandWasUsed) {
            dbtime.timestamps.push({ nickname: userstate.username, lastTimeUsed: new Date().getTime() });
        }

        if (hoursSinceLastUse < 21) {
            isAllowed = false;

        } else if (hoursSinceLastUse > 21) {
            isAllowed = true;
        }

        if (!isAllowed) return;

        function getNumbersMason(username) {
            const numbers = dbtime.extraNumbers.find(a => a.nickname === username);

            if (numbers) {
                return numbers.numbers;
            } else {
                return null; // Nickname not found
            }
        }

        let allNumbers = getNumbersMason(userstate.username)
        console.log(allNumbers)

        if (userstate['user-id'] == streamerTwitchID) {

            client.say(channel, `/me ` + `Wygrywająca liczba na dziś to ---> ${winningNumber} <---. @${userstate['display-name']} wylosował... MercyWing1 ${winningNumber} MercyWing2`);

        } else {

            randomNumberLOS = Math.floor(Math.random() * maxNumber - 1) + 1;
            client.say(channel, `/me ` + `Wygrywająca liczba na dziś to ---> ${winningNumber} <---. @${userstate['display-name']} wylosował... MercyWing1 ${randomNumberLOS} MercyWing2`);

            if (winningNumber == randomNumberLOS) {

                setTimeout(() => {
                    client.say(channel, `/me ` + `oKurwa jebany ftrafił oKurwa`)
                }, 2000);

            } else if (allNumbers && allNumbers.includes(randomNumberLOS)) {

                setTimeout(() => {
                    client.say(channel, `/me ` + `@${userstate['display-name']} WYGRYWA!!! Padł numer, który wcześnij ${userstate.username} wykupił za golda! Gratuluję!`)
                }, 2000);

                dbtime.extraNumbers.forEach(item => {
                    item.numbers = "";
                });

                fs.writeFile("./dbtime.json", JSON.stringify(dbtime), (err) => {
                    if (err) console.log(err);
                });
            }
        }

        dbtime.timestamps = dbtime.timestamps.map(xxx => {
            if (xxx.nickname === userstate.username) {
                xxx = ({
                    nickname: xxx.nickname,
                    lastTimeUsed: currentTime
                })
            }
            return xxx;
        });

        fs.writeFile("./dbtime.json", JSON.stringify(dbtime), (err) => {
            if (err) console.log(err);
        });

        return dbtime;
    }
});


// DONATE
client.on('message', (channel, userstate, message, self) => {
    if (self || blockadeGlobal) return;

    if (message.toLowerCase() === '!donate') {

        client.say(channel, `/me ` + `@${userstate['display-name']}, YourDonateLink`);
    } else return;
});


// ZWRÓĆ PUNKTY KANAŁU ZA GRY Z WIDZAMI
client.on('message', (channel, userstate, message, self) => {
    if (self || blockadeGlobal) return;

    if ((message.toLowerCase() === '!zwróć')
        || (message.toLowerCase() === '!zwroc')
        || (message.toLowerCase() === '!zwroć')
        || (message.toLowerCase() === '!zwróc')) {

        client.say(channel, `/me ` + `@${userstate['display-name']}, Jeśli Cie nie będzie po wywołaniu do grania lub nie chcesz grać po uprzednim wykupieniu gier z Maxem, punkty zostają zwrócone po zakończeniu live'a.`);
    } else return;
});


// PAD
client.on('message', (channel, userstate, message, self) => {
    if (self || blockadeGlobal) return;

    if (message.toLowerCase() === '!pad') {

        client.say(channel, `/me ` + `@${userstate['display-name']}, Nie.`);
    } else return;
});


// PLAYLISTA
client.on('message', (channel, userstate, message, self) => {
    if (self || blockadeGlobal) return;

    if ((message.toLowerCase() === '!playlist')
        || (message.toLowerCase() === '!playlista')) {

        client.say(channel, `/me ` + `@${userstate['display-name']}, YourPlaylist`);
    } else { return; }
});


// GANG
client.on('message', (channel, userstate, message, self) => {
    if (self) return;

    if ((message.toLowerCase().includes('gang'))
        || (message.toLowerCase().includes('mafia'))
        || (message.toLowerCase().includes('army'))
        || (message.toLowerCase().includes('armia'))) {

        client.say(channel, `/me ` + ` ( ͡°( ͡° ͜ʖ( ͡° ͜ʖ ͡°)ʖ ͡°) ͡°) `);
    } else return;
});


// IDK
client.on('message', (channel, userstate, message, self) => {
    if (self) return;

    if ((message.toLowerCase().includes('idk'))
        || (message.toLowerCase().includes('nie wiem'))) {
        client.say(channel, `/me ` + ` ¯\\_(ツ)_/¯ `);
    } else return;
});


function delayToBoks() {
    blockFIGHT = true;
    let r = Math.floor(Math.random() * a) + b

    setTimeout(() => {
        blockadeBoks = false;
        blockFIGHT = false;
        console.log(`mozna juz !boks`)
    }, r);

    console.log("min do startu: " + (r / 60 / 1000).toFixed(0))
}

// !!boks
let listBoks = [];
let etap;
let boss;
let bossATK;
let bossHP;
let bossLUCK;
let bossWorth;
let usedUlt = false;
let malaMiLvl = 2;
let donatelloLvl = 5;
let trevorLvl = 10;
let johnCenaLvl = 14;
let kratosLvl = 18;
let questionMarksLevel = 20;
let ultSkill = false;
let ultText = `ult: 50 golda, `;
let bronSkill = false;
let bronText = `broń: 100 golda, `;
let kevSkill = false;
let kevText = `kev: 150 golda, `;
let koniczynaSkill = false;
let koniczynaText = `koniczyna: 200 golda `;
let itemsToBuyBoks = [
    `ult`,
    `bron`,
    `kev`,
    `koniczyna`,
]
let tempBoksLog = [];
let timersBoks = {};
let blockadeBoks = true;
let blockFIGHT = false;
let a = 8 * 60 * 1000; // 480 s
let b = 32 * 60 * 1000; // 1920 s

client.on('message', (channel, userstate, message, self) => {
    if (self) return;

    let fajter = userstate['display-name'];

    if ((listBoks.length == 0) && (message.toLowerCase() === '!boks')) {
        if (blockadeBoks) {
            client.say(channel, `/me ` + `Spróbuj za jakiś czas, muszę naładować ulta... `)
            if (blockFIGHT) return;
            else {
                delayToBoks()
            }

        } else if (!blockadeBoks) {
            listBoks.push(userstate.username)

            client.say(channel, `/me ` + `@${fajter}, wybierz przeciwnika:`);
            client.say(channel, `/me ` + `|> Mała Mi (${malaMiLvl} lv), Donatello (${donatelloLvl} lv),`);
            client.say(channel, `/me ` + `|>> Trevor (${trevorLvl} lv), John Cena (${johnCenaLvl} lv), `);
            client.say(channel, `/me ` + `|>>> Kratos (${kratosLvl} lv), ????? (?? lv) `);

            if (!timersBoks[userstate.username]) {
                timersBoks[userstate.username] = setTimeout(() => {
                    if (listBoks.includes(userstate.username)) {
                        listBoks = listBoks.filter(user => user !== userstate.username);
                    }

                    blockadeBoks = false;
                    listBoks = [];
                    ultSkill = false;
                    bronSkill = false;
                    kevSkill = false;
                    koniczynaSkill = false;
                }, 120000);
            }

            etap = 1;
        }

    } else if (message.toLowerCase() === '!boks') {
        client.say(channel, `/me ` + `Spróbuj za jakiś czas, muszę naładować ulta.... `)
    }

    if (listBoks.includes(userstate.username) && etap == 1) {

        let enoughLevel = getLevelByNickname(userstate.username)

        if ((message.toLowerCase().startsWith('mała') || message.toLowerCase().startsWith('mala')) && enoughLevel >= malaMiLvl) {
            etap = 2;

            boss = `Mała Mi`;
            bossATK = 15;
            bossHP = 40;
            bossLUCK = 25;
            bossWorth = 1;

            client.say(channel, `/me ` + `@${fajter} Countdown SKLEP: ult: 50 golda, broń: 100 golda, kev: 150 golda, koniczyna: 200 golda | 'dalej', aby przejść do walki. !sklep po więcej info na priv.`)

        } else if (message.toLowerCase().startsWith('donatello') && enoughLevel >= donatelloLvl) {
            etap = 2;

            boss = `Donatello`;
            bossATK = 50;
            bossHP = 50;
            bossLUCK = 15;
            bossWorth = 2;

            client.say(channel, `/me ` + `@${fajter} Countdown SKLEP: ult: 50 golda, broń: 100 golda, kev: 150 golda, koniczyna: 200 golda | 'dalej', aby przejść do walki. !sklep po więcej info na priv.`)

        } else if (message.toLowerCase().startsWith('trevor') && enoughLevel >= trevorLvl) {
            etap = 2;

            boss = `Trevor`;
            bossATK = 85;
            bossHP = 50;
            bossLUCK = 30;
            bossWorth = 3;

            client.say(channel, `/me ` + `@${fajter} Countdown SKLEP: ult: 50 golda, broń: 100 golda, kev: 150 golda, koniczyna: 200 golda | 'dalej', aby przejść do walki. !sklep po więcej info na priv.`)

        } else if (message.toLowerCase().startsWith('john') && enoughLevel >= johnCenaLvl) {
            etap = 2;

            boss = `John Cena`;
            bossATK = 60;
            bossHP = 100;
            bossLUCK = 40;
            bossWorth = 4;

            client.say(channel, `/me ` + `@${fajter} Countdown SKLEP: ult: 50 golda, broń: 100 golda, kev: 150 golda, koniczyna: 200 golda | 'dalej', aby przejść do walki. !sklep po więcej info na priv.`)

        } else if (message.toLowerCase().startsWith('kratos') && enoughLevel >= kratosLvl) {
            etap = 2;

            boss = `Kratos`;
            bossATK = 70;
            bossHP = 190;
            bossLUCK = 50;
            bossWorth = 5;

            client.say(channel, `/me ` + `@${fajter} Countdown SKLEP: ult: 50 golda, broń: 100 golda, kev: 150 golda, koniczyna: 200 golda | 'dalej', aby przejść do walki. !sklep po więcej info na priv.`)

        } else if (message.toLowerCase().startsWith('??') && enoughLevel > questionMarksLevel) {
            client.say(channel, `/me ` + `wow... tu kiedys cos bedzie...`)

        } else if (((message.toLowerCase().startsWith('mała') || message.toLowerCase().startsWith('mala')) && enoughLevel < malaMiLvl) || (message.toLowerCase().startsWith('donatello') && enoughLevel < donatelloLvl) || (message.toLowerCase().startsWith('trevor') && enoughLevel < trevorLvl) || (message.toLowerCase().startsWith('john') && enoughLevel < johnCenaLvl) || (message.toLowerCase().startsWith('kratos') && enoughLevel < kratosLvl) || (message.toLowerCase().startsWith('??') && enoughLevel < questionMarksLevel)) {
            client.say(channel, `/me ` + `@${userstate.username}, masz zbyt niski poziom!`)

            return;
        }
    }

    if (listBoks.includes(userstate.username) && etap == 2) {

        let goldLeft = getGoldByNickname(userstate.username)

        let ultCost = 50;
        let bronCost = 100;
        let kevCost = 150;
        let koniczynaCost = 200;

        if (message.toLowerCase().startsWith('ult') && goldLeft > ultCost && itemsToBuyBoks.includes(`ult`)) {
            ultSkill = true;
            ultText = '';
            client.say(channel, `/me ` + `@${fajter}, SKLEP: ${ultText}${bronText}${kevText}${koniczynaText}| 'dalej', aby przejść do walki.`)

            dbeco.viewers = dbeco.viewers.map(ult => {
                if (ult.nickname === userstate.username) {
                    ult = ({
                        nickname: ult.nickname,
                        id: ult.id,
                        level: ult.level,
                        gold: ult.gold - ultCost,
                        goldSpent: ult.goldSpent + ultCost,
                        skillPoints: ult.skillPoints,
                        bossesDefeated: ult.bossesDefeated,
                        dungeonsCompleted: ult.dungeonsCompleted,
                        winsInEvents: ult.winsInEvents,
                        atk: ult.atk,
                        hp: ult.hp,
                        luck: ult.luck,
                        fightsWon: ult.fightsWon,
                        fightsLost: ult.fightsLost
                    })
                }
                return ult;
            });

            fs.writeFile("./dbeco.json", JSON.stringify(dbeco), (err) => {
                if (err) console.log(err);
            });

            return dbeco;

        } else if (message.toLowerCase().startsWith('bro') && goldLeft > bronCost && itemsToBuyBoks.includes(`bron`)) {
            bronSkill = true;
            bronText = '';
            client.say(channel, `/me ` + `@${fajter}, SKLEP: ${ultText}${bronText}${kevText}${koniczynaText}| 'dalej', aby przejść do walki.`)

            dbeco.viewers = dbeco.viewers.map(bron => {
                if (bron.nickname === userstate.username) {
                    bron = ({
                        nickname: bron.nickname,
                        id: bron.id,
                        level: bron.level,
                        gold: bron.gold - 100,
                        goldSpent: bron.goldSpent + 100,
                        skillPoints: bron.skillPoints,
                        bossesDefeated: bron.bossesDefeated,
                        dungeonsCompleted: bron.dungeonsCompleted,
                        winsInEvents: bron.winsInEvents,
                        atk: bron.atk,
                        hp: bron.hp,
                        luck: bron.luck,
                        fightsWon: bron.fightsWon,
                        fightsLost: bron.fightsLost
                    })
                }
                return bron;
            });

            fs.writeFile("./dbeco.json", JSON.stringify(dbeco), (err) => {
                if (err) console.log(err);
            });

            return dbeco;

        } else if (message.toLowerCase().startsWith('kev') && goldLeft > kevCost && itemsToBuyBoks.includes(`kev`)) {
            kevSkill = true;
            kevText = '';
            client.say(channel, `/me ` + `@${fajter}, SKLEP: ${ultText}${bronText}${kevText}${koniczynaText}| 'dalej', aby przejść do walki.`)

            dbeco.viewers = dbeco.viewers.map(kev => {
                if (kev.nickname === userstate.username) {
                    kev = ({
                        nickname: kev.nickname,
                        id: kev.id,
                        level: kev.level,
                        gold: kev.gold - 150,
                        goldSpent: kev.goldSpent + 150,
                        skillPoints: kev.skillPoints,
                        bossesDefeated: kev.bossesDefeated,
                        dungeonsCompleted: kev.dungeonsCompleted,
                        winsInEvents: kev.winsInEvents,
                        atk: kev.atk,
                        hp: kev.hp,
                        luck: kev.luck,
                        fightsWon: kev.fightsWon,
                        fightsLost: kev.fightsLost
                    })
                }
                return kev;
            });

            fs.writeFile("./dbeco.json", JSON.stringify(dbeco), (err) => {
                if (err) console.log(err);
            });

            return dbeco;

        } else if (message.toLowerCase().startsWith('koniczyna') && goldLeft > koniczynaCost && itemsToBuyBoks.includes(`koniczyna`)) {
            koniczynaSkill = true;
            koniczynaText = '';
            client.say(channel, `/me ` + `@${fajter}, SKLEP: ${ultText}${bronText}${kevText}${koniczynaText}| 'dalej', aby przejść do walki.`)

            dbeco.viewers = dbeco.viewers.map(koniczyna => {
                if (koniczyna.nickname === userstate.username) {
                    koniczyna = ({
                        nickname: koniczyna.nickname,
                        id: koniczyna.id,
                        level: koniczyna.level,
                        gold: koniczyna.gold - 200,
                        goldSpent: koniczyna.goldSpent + 200,
                        skillPoints: koniczyna.skillPoints,
                        bossesDefeated: koniczyna.bossesDefeated,
                        dungeonsCompleted: koniczyna.dungeonsCompleted,
                        winsInEvents: koniczyna.winsInEvents,
                        atk: koniczyna.atk,
                        hp: koniczyna.hp,
                        luck: koniczyna.luck,
                        fightsWon: koniczyna.fightsWon,
                        fightsLost: koniczyna.fightsLost
                    })
                }
                return koniczyna;
            });

            fs.writeFile("./dbeco.json", JSON.stringify(dbeco), (err) => {
                if (err) console.log(err);
            });

            return dbeco;

        } else if (message.toLowerCase().startsWith('dalej')) {
            etap = 3;

        } else if ((message.toLowerCase().startsWith('ult') && goldLeft < ultCost) || (message.toLowerCase().startsWith('bro') && goldLeft < bronCost) || (message.toLowerCase().startsWith('kev') && goldLeft < kevCost) || (message.toLowerCase().startsWith('koniczyna') && goldLeft < koniczynaCost)) {
            client.say(channel, `/me ` + `@${fajter}, brakuje ci golda!`)

        } else if ((message.toLowerCase().startsWith('ult') && !itemsToBuyBoks.includes(`ult`)) || (message.toLowerCase().startsWith('bro') && !itemsToBuyBoks.includes(`bron`)) || (message.toLowerCase().startsWith('kev') && !itemsToBuyBoks.includes(`kev`)) || (message.toLowerCase().startsWith('koniczyna') && !itemsToBuyBoks.includes(`koniczyna`))) {
            client.say(channel, `/me ` + `@${userstate['display-name']}, ten przedmiot został już kupiony!`)

        }
    }
    if (listBoks.includes(userstate.username) && etap == 3) {

        clearTimeout(timersBoks[userstate.username]);
        delete timersBoks[userstate.username];
        listBoks = listBoks.filter(user => user !== userstate.username);

        let start;
        let listZaczyna = [fajter, boss];
        let zaczyna = listZaczyna[Math.floor(Math.random() * listZaczyna.length)];

        client.say(channel, `/me ` + `Atak zaczyna... ${zaczyna}`)
        tempBoksLog.push(`Atak zaczyna... ${zaczyna}`)
        etap = 0;

        if (zaczyna == boss) {
            start = true;
        } else if (zaczyna == fajter) {
            start = false
        }

        let bronPower = 1
        let kevPower = 1
        let koniczynaPower = 1

        if (bronSkill) bronPower = 1.2
        if (kevSkill) kevPower = 1.4
        if (koniczynaSkill) koniczynaPower = 1.7

        let heroStats = getFightStatsByNickname(userstate.username)

        let atkMinHero = heroStats.atk * atkMin * bronPower
        let atkMaxHero = (heroStats.atk * atkMax * bronPower)// + (heroStats.luck * playerLuck * koniczynaPower)
        let atkMinBoss = bossATK * atkMin
        let atkMaxBoss = (bossATK * atkMax)// + (bossLUCK * playerLuck)
        heroStats.hp = heroStats.hp * kevPower

        let luck1Cap = heroStats.luck * koniczynaPower / 5
        let luck2Cap = bossLUCK / 5

        if (luck1Cap > 50) luck1Cap = 50
        if (luck2Cap > 50) luck2Cap = 50

        function yolo() {
            setTimeout(() => {

                if (start) {
                    let atak = getRandomNumber(atkMinBoss, atkMaxBoss).toFixed(0)
                    let atakFixed = atak;

                    let r1luck = getRandomNumber(1, 100)

                    let luck1Text = ''

                    if (r1luck < luck1Cap) {
                        luck1Text = ', ale nie trafia'
                        atakFixed = 0
                    }

                    heroStats.hp = heroStats.hp - atakFixed;

                    //client.say(channel, `/me ` + `${boss} (${bossHP} hp) atakuje za ${atak} i pozostawia ${fajter} ${heroStats.hp} hp!`)
                    tempBoksLog.push(`${boss} (${bossHP} hp) atakuje za ${atak}` + luck1Text + ` i pozostawia ${fajter} ${heroStats.hp} hp!`)

                    start = !start

                } else if (!start) {
                    let atak = getRandomNumber(atkMinHero, atkMaxHero).toFixed(0)
                    let atakFixed = atak;

                    let r2luck = getRandomNumber(1, 100)

                    let luck2Text = ''

                    if (r2luck < luck2Cap) {
                        luck2Text = ', ale nie trafia'
                        atakFixed = 0
                    }

                    bossHP = bossHP - atakFixed;

                    //client.say(channel, `/me ` + `${fajter} (${heroStats.hp} hp) atakuje za ${atak} i pozostawia ${boss} ${bossHP} hp!`)
                    tempBoksLog.push(`${fajter} (${heroStats.hp} hp) atakuje za ${atak}` + luck2Text + ` i pozostawia ${boss} ${bossHP} hp!`)

                    start = !start
                }

                if (bossHP <= 0) {

                    if (boss === `Kratos` && !usedUlt) {
                        bossHP = 1;

                        client.say(channel, `/me ` + `Boss używa ulta... i zamiast umrzeć w tej turze, zostaje mu ${bossHP} hp!`)
                        tempBoksLog.push(`Boss używa ulta... i zamiast umrzeć w tej turze, zostaje mu ${bossHP} hp!`)
                        usedUlt = true;

                        yolo();

                    } else {

                        let bossesDefeated = getBossesDefeatedByNickname(userstate.username)

                        boksContestant = fajter
                        setTimeout(() => {
                            boksContestant = ''
                        }, 15000);

                        blockadeBoks = true;
                        listBoks = [];
                        ultSkill = false;
                        bronSkill = false;
                        kevSkill = false;
                        koniczynaSkill = false;
                        usedUlt = false;

                        delayToBoks()

                        let textEnding = ' '


                        if (bossesDefeated < bossWorth) {
                            textEnding = ` Otrzymujesz punkty umiejętności: ${bossWorth}. `

                            client.say(channel, `/me ` + `Ten pojedynek wygrywa... ${fajter} z ${heroStats.hp} hp!` + textEnding + `Chcesz raport z walki na priv?`)
                            tempBoksLog.push(`Wygrywa... ${fajter} z ${heroStats.hp} hp!` + textEnding)

                            dbeco.viewers = dbeco.viewers.map(bossPrice => {
                                if (bossPrice.nickname === userstate.username) {
                                    bossPrice = ({
                                        nickname: bossPrice.nickname,
                                        id: bossPrice.id,
                                        level: bossPrice.level,
                                        gold: bossPrice.gold,
                                        goldSpent: bossPrice.goldSpent,
                                        skillPoints: bossPrice.skillPoints + bossWorth,
                                        bossesDefeated: bossWorth,
                                        dungeonsCompleted: bossPrice.dungeonsCompleted,
                                        winsInEvents: bossPrice.winsInEvents + 1,
                                        atk: bossPrice.atk,
                                        hp: bossPrice.hp,
                                        luck: bossPrice.luck,
                                        fightsWon: bossPrice.fightsWon,
                                        fightsLost: bossPrice.fightsLost
                                    })
                                }
                                return bossPrice;
                            });

                            fs.writeFile("./dbeco.json", JSON.stringify(dbeco), (err) => {
                                if (err) console.log(err);
                            });

                            return dbeco;

                        } else {
                            client.say(channel, `/me ` + `Ten pojedynek wygrywa... ${fajter} z ${heroStats.hp} hp!` + textEnding + `Chcesz raport z walki na priv?`)
                            tempBoksLog.push(`Wygrywa... ${fajter} z ${heroStats.hp} hp!` + textEnding)

                            dbeco.viewers = dbeco.viewers.map(bossPrice => {
                                if (bossPrice.nickname === userstate.username) {
                                    bossPrice = ({
                                        nickname: bossPrice.nickname,
                                        id: bossPrice.id,
                                        level: bossPrice.level,
                                        gold: bossPrice.gold,
                                        goldSpent: bossPrice.goldSpent,
                                        skillPoints: bossPrice.skillPoints,
                                        bossesDefeated: bossPrice.bossesDefeated,
                                        dungeonsCompleted: bossPrice.dungeonsCompleted,
                                        winsInEvents: bossPrice.winsInEvents + 1,
                                        atk: bossPrice.atk,
                                        hp: bossPrice.hp,
                                        luck: bossPrice.luck,
                                        fightsWon: bossPrice.fightsWon,
                                        fightsLost: bossPrice.fightsLost
                                    })
                                }
                                return bossPrice;
                            });

                            fs.writeFile("./dbeco.json", JSON.stringify(dbeco), (err) => {
                                if (err) console.log(err);
                            });

                            return dbeco;
                        }
                    }

                } else if (heroStats.hp <= 0) {

                    client.say(channel, `/me ` + `Ten pojedynek wygrywa... ${boss} z ${bossHP} hp!` + ` Chcesz raport z walki na priv?`)
                    tempBoksLog.push(`Wygrywa... ${boss} z ${bossHP} hp!`)

                    boksContestant = fajter
                    setTimeout(() => {
                        boksContestant = ''
                    }, 15000);

                    blockadeBoks = true;
                    listBoks = [];
                    ultSkill = false;
                    bronSkill = false;
                    kevSkill = false;
                    koniczynaSkill = false;
                    usedUlt = false;

                    delayToBoks()
                } else {
                    yolo();
                }
            }, 300)
        }
        yolo();
    }
});


//boks details
let boksContestant = '';
let boksLog = [];

client.on('message', (channel, userstate, message, self) => {

    // if (userstate.username === 'bot__maciek' && message.toLowerCase().includes(`ten pojedynek wygrywa... `)) {
    if (userstate.username === 'bot__maciek' && (message.toLowerCase().includes(`wygrywa... `) && message.toLowerCase().includes(`hp!`))) {
        setTimeout(() => {
            //client.say(channel, `/me ` + `@${boksContestant}, czy chcesz otrzymać szczegóły tej walki na priv? tak/nie`)
            console.log(`@${boksContestant}, czy chcesz otrzymać szczegóły tej walki na priv? tak/nie`)
        }, 3000);

        setTimeout(() => {
            boksContestant = '';
            boksLog = [];
            tempBoksLog = [];
        }, 18000);
    }

    if (boksContestant.toLowerCase() == userstate.username && (message.toLowerCase().startsWith(`tak`) || message.toLowerCase().startsWith(`!priv`))) {
        boksLog = tempBoksLog.join("  ")
        WhisperUser(userstate.username, boksLog)
        boksContestant = '';
        boksLog = [];
        tempBoksLog = [];
    }

});


// KIEDY
let kiedyStreamList = [
    'next stream kiedy',
    'kiedy streamujesz',
    'kiedy liv',
    'jakich godzinach streamujesz',
    'jakich godzinach liv',
    'kiedy są str',
    'kiedy są liv',
    'kiedy sa str',
    'kiedy sa liv',
    'której str',
    'której liv',
    'ktorej str',
    'ktorej liv',
    'nastepny str',
    'nastepny liv',
    'następny str',
    'następny liv',
    'jakie dni str',
    'jakie dni liv',
    'kiedy str',
    'kiedy liv',
    'dzie str',
    'dzie liv',
    'będzie dziś str',
    'będzie dziś liv',
    'bedzie dzis str',
    'bedzie dzis liv',
    'rej jutro liv',
    'rej jutro str',
    'bedzie jutro str',
    'będzie jutro str',
    'kiedy kolejny str',
    'dzie str',
    'e dni sa str',
    'e dni są str',
    'akich godzinach robisz str',
];

client.on('message', (channel, userstate, message, self) => {
    if (self || blockadeGlobal) return;

    for (let i = 0; i < kiedyStreamList.length; i++) {
        if ((message.toLowerCase() == '!kiedy') || (message.toLowerCase() == '!stream') || (message.toLowerCase() == '!streamy') || message.toLowerCase().includes(kiedyStreamList[i])) {
            client.say(channel, `/me ` + `@${userstate['display-name']} Wtorek, Środa, Piątek, Sobota, Niedziela: od 21:00 do (zazwyczaj) 24:00`);
            break;
        }
    }
});


// GRAM
client.on('message', (channel, userstate, message, self) => {
    if (self || blockadeGlobal) return;

    if (message.toLowerCase() === '!gram') {

        client.say(channel, `/me ` + `@${userstate['display-name']}, żeby zagrać ze mną w RL musisz: 1. wykupić gry za punkty kanału. 2. przy kupowaniu gier, podać w polu tekstowym TRYB oraz swoją RANGĘ w trybie, który chcesz grać. Aby zobaczyć kolejkę, wpisz !kolejka`);
    } else { return; }
});


// VS
client.on('message', (channel, userstate, message, self) => {
    if (self || blockadeGlobal) return;

    if (message.toLowerCase() === '!vs') {

        client.say(channel, `/me ` + `@${userstate['display-name']}, Zbierz jeszcze 3 inne osoby do swojej drużyny, które mogą wykupić tę nagrodę i zmierz się ze mną w grze prywatnej w specjalnym trybie i zawalcz o wyjątkową nagrodę! Ja wybiorę jedną osobę z czatu i spróbuję uniemożliwić wam wygranie 4 vs 2 oraz zgarnięcie nagrody specjalnej.`)
    } else { return; }
});


// MOD 1/4
let timeoutMOD1;

client.on('message', (channel, userstate, message, self) => {
    if (self) return;
    if (timeoutMOD1 == true) {
        return;
    } else {
        if (message.toLowerCase() === '!mod') {

            if (userstate.mod) {
                client.say(channel, `/me ` + `@${userstate['display-name']}, Gratulacje! Właśnie otrzymałeś moda!`)

            } else {
                client.say(channel, `/me ` + `@${userstate['display-name']}, Aby otrzymać moda wpisz !MAM [Faza 1/3, 29%]`)

                timeoutMOD1 = true;
                let timeoutID1 = setInterval(timeout1, 300000)

                function timeout1() {
                    timeoutMOD1 = false;
                    clearInterval(timeoutID1)
                }
            }
        }
    }
});


// MOD 2/4
let timeoutMOD2;

client.on('message', (channel, userstate, message, self) => {
    if (self) return;

    if (timeoutMOD2 == true) {
        return;
    } else {
        if (message.toLowerCase() === '!mam') {
            client.say(channel, `/me ` + `@${userstate['display-name']}, Aby otrzymać moda wpisz !0000 [Faza 2/3, 67%]`)

            timeoutMOD2 = true;
            let timeoutID2 = setInterval(timeout2, 300000)

            function timeout2() {
                timeoutMOD2 = false;
                clearInterval(timeoutID2)
            }
        }
    }
});


// MOD 3/4
let inteligencja = 0;
let timeoutMOD3;

client.on('message', (channel, userstate, message, self) => {
    if (self) return;

    if (timeoutMOD3 == true) {
        return;
    } else {
        if (message.toLowerCase() === '!0000') {
            client.say(channel, `/me ` + `@${userstate['display-name']}, Aby otrzymać moda wpisz !IQ [Faza 3/3, 94%]`)

            timeoutMOD3 = true;
            let timeoutID3 = setInterval(timeout3, 300000)

            function timeout3() {
                timeoutMOD3 = false;
                clearInterval(timeoutID3)
            }
            inteligencja = 1;

            setTimeout(() => {
                inteligencja = 0;
            }, 30000)
        }
    }
});


// MOD 4/4
let timeoutMOD4;
client.on('message', (channel, userstate, message, self) => {
    if (self) return;

    if (timeoutMOD4 == true) {
        return;
    } else {
        if ((inteligencja == 1) && (message.toLowerCase() === '!iq')) {
            client.say(channel, `/me ` + `@${userstate['display-name']}, Gratulacje! Moda, może i jednak nie masz, ale za to masz 0 IQ! KEKW [Faza w chuj, 99.9%]`)

            timeoutMOD4 = true;
            let timeoutID4 = setInterval(timeout4, 300000)

            function timeout4() {
                timeoutMOD4 = false;
                clearInterval(timeoutID4)
            }
        }
    }
});


// VIP
let timeoutVIP;

client.on('message', (channel, userstate, message, self) => {
    if (self || blockadeGlobal) return;


    if (timeoutVIP == true) {
        return;
    } else {
        if (message.toLowerCase() === '!vip') {

            if (!userstate.badges) {
                client.say(channel, `/me ` + `@${userstate['display-name']}, HAHAHAHA JEBAITED B*TCH KEKW KEKW KEKW A VIPIERDALAJ, NIE MA TAK ŁATWO KEKW Kappa KEKW`)

            } else if (userstate.badges.vip) {
                client.say(channel, `/me ` + `@${userstate['display-name']}, Gratulacje! Właśnie otrzymałeś VIPa!`)

            } else {
                client.say(channel, `/me ` + `@${userstate['display-name']}, HAHAHAHA JEBAITED B*TCH KEKW KEKW KEKW A VIPIERDALAJ, NIE MA TAK ŁATWO KEKW Kappa KEKW`)
            }
            timeoutVIP = true;
            let timeoutID = setInterval(timeout, 300000)

            function timeout() {
                timeoutVIP = false;
                clearInterval(timeoutID)
            }
        }
    }
});


// TEAM
client.on('message', (channel, userstate, message, self) => {
    if (self || blockadeGlobal) return;

    if (message.toLowerCase() === '!team') {

        client.say(channel, `/me ` + `@${userstate['display-name']}, Chcesz dołączyć do teamu ITZ w Rocket League? Wykup za punkty kanału "Dołącz do teamu w RL!" podając swój EPIC ID w polu tekstowym. Jeden z moderatorów doda Cię do teamu w grze, ale aby tak się stało, dodaj do znajomych konto EPIC ID: itzcrewadmin`)
    } else { return; }
});


// SMACZNEGO
client.on('message', (channel, userstate, message, self) => {
    if (self || blockadeGlobal) return;
    let timeoutv;

    if ((message.toLowerCase() === '!smacznego')
        || (message.toLowerCase().includes('smacznego'))
        || (message.toLowerCase().includes('smakówa'))
        || (message.toLowerCase().includes('smakuwa'))) {

        client.say(channel, `/me ` + `Dzięki! x)`)
    }
    timeoutv = true;
    let timeoutID = setInterval(timeout, 10000)

    function timeout() {
        timeoutv = false;
        clearInterval(timeoutID)
    }
});


// INFO
client.on('message', (channel, userstate, message, self) => {
    if (self || blockadeGlobal) return;

    if (message.toLowerCase() === '!info') {

        client.say(channel, `/me ` + `Aby uniknąć bana, należy nie pisać nic na czacie MLADY`)
    } else { return; }
});


// BTG
client.on('message', (channel, userstate, message, self) => {
    if (self || blockadeGlobal) return;

    if (message.toLowerCase() === '!btg') {

        client.say(channel, `/me ` + `Coiny BTG są używane przez widzów do grania w Bardzo Tajną Grę co miesiąc na Discord. Po wykupieniu nawet minimalnej ilości BTG coins, zostaniesz dodany na specjalny kanał, na którym odbędzie się gra.`)
    } else { return; }
});


// CYTAT
let timeoutCYTAT;
let listQUOTES = [
    `TheAdrian132: do you from?`,
    `Deliszja_: Czep się mak to nie kutakongi tylko jedzenie Magdy Gessler sałatka z koziej dupy`,
    `itzKucu: its kurwa ten`,
    `niseron: zagrajmy w kamień papież nożyce`,
    `imad: grajcie z lewej, na prawej są mocniejsi`,
    `itzKucu: on jest kurwa fristajlerem pomóż mi XD`,
    `itzKucu: ten (rezyyy) kurwa gola strzelił, replay aż napierdala`,
    `itzKucu: ten tyłem jedzie kurwa nie, oni już wygrali mentalnie`,
    `cio blet?`,
    `xXELEC7ROXx: człowiek lansu, baunsu, renesansu`,
    `nie ma łatwego wica dla vipa`,
    `sam kusz i rostocza`,
    `YourFavStepBro: can you start have hands?`,
    `PoProstuSweet: JA NIE NADOZAM SIE SMIAC PALCAMI, PISAĆ KEKW`,
    `itzCurser: Ja nadal nie ogarniam kurwa tych godzin 12 AM albo 12 PM, ale ja wiem, że po 12 pijem KEKW`,
    `sopelek1989: sorry za wzięcie mida z boosta`,
];

client.on('message', (channel, userstate, message, self) => {
    if (self || blockadeGlobal) return;

    if (timeoutCYTAT == true) {
        return;

    } else {
        if (message.toLowerCase() === '!cytat') {
            let randomQuote = listQUOTES[Math.floor(Math.random() * listQUOTES.length)];

            client.say(channel, `/me ` + `${randomQuote}`)

            timeoutCYTAT = true;
            let timeoutID = setInterval(timeout, 3600000)

            function timeout() {
                timeoutCYTAT = false;
                clearInterval(timeoutID)
            }
        }
    }
});


// OBECNOŚĆ
client.on('message', (channel, userstate, message, self) => {
    if (self || blockadeGlobal) return;

    if ((message.toLowerCase() === '!obecność')
        || (message.toLowerCase() === '!obecnosc')
        || (message.toLowerCase() === '!obecnośc')
        || (message.toLowerCase() === '!obecnosć')) {

        client.say(channel, `/me ` + `No, był taki horror.`)
    } else { return; }
});


// HOOPS
client.on('message', (channel, userstate, message, self) => {
    if (self || blockadeGlobal) return;

    if ((message.toLowerCase() === '!hoops')
        || (message.toLowerCase() === '!hoopsy')) {

        client.say(channel, `/me ` + `@${userstate['display-name']}, łap trening hoopsowy: 3E8C-3E1D-2E01-1941`)
    } else { return; }
});


// KOLEJKA QUEUE !!!
let regexpCommand = new RegExp(/^!([a-zA-Z0-9]+)(?:\W+)?(\w+)?(?:\W+)?(.*)?/);
let regexpCommandRest2 = new RegExp(/^!([a-zA-Z0-9]+)(?:\W+)?(\w+)?(?:\W+)?(\w+)?(?:\W+)?(.*)?/);
let regexpCommandRest3 = new RegExp(/^!([a-zA-Z0-9]+)(?:\W+)?(\w+)?(?:\W+)?(\w+)?(?:\W+)?(\w+)?(?:\W+)?(.*)?/);
let blockadeQ = false;
let qClosed = false;
let delayQ = false;
let games;
let vs;
let usersOnHold = [];
let timersQ = {};
let onlyOnce = true;
let gierkiZWidzami = ['f5ffb532-5c5e-47a6-a248-5da03d85dd19',
    '5cbbacbe-6448-4711-9da3-c2442ea9723b',
    '449ce791-fa1d-4c4a-a187-5f476c69fe27',
    '92a18a6d-a129-4156-b2a7-d55b52fc84c4',
    'bb2698a9-6539-483b-be3b-5dc3d6cc15b6',
    'f1eab457-54ff-4b33-9d81-e5344ae4b07a']

client.on('message', (channel, userstate, message, self) => {
    if (self) return;

    if (onlyOnce) {

        setTimeout(() => {
            for (const player of db.players) {
                player.id += "‎";
            }

            fs.writeFile("./db.json", JSON.stringify(db), (err) => {
                if (err) console.log(err);
            });
        }, 2000);


        onlyOnce = false;
    }


    if (gierkiZWidzami.includes(userstate['custom-reward-id'])) {

        blockadeQ = false;
        delayQ = false;

        if (qClosed) {
            client.say(channel, `/me ` + ` @${userstate['display-name']}, kolejka do gierek jest na tę chwilę zamknięta! Punkty zostaną zwrócone.`)
            return;
        }
    } else if (message.toLowerCase().startsWith("!swap")) {
        blockadeQ = false;
    }

    if ((userstate.username === 'itzmaxinho' || userstate.mod) && message.toLowerCase() == `!qc`) {
        client.say(channel, `/me ` + `Od teraz nie można zapisywać się na gierki do odwołania.`)
        qClosed = true;
        return;
    }

    if ((userstate.username === 'itzmaxinho' || userstate.mod) && message.toLowerCase() == `!qo`) {
        client.say(channel, `/me ` + `Zapraszam do wykupowania gierek!`)
        qClosed = false;
    }

    if (blockadeQ) {
        return;

    } else if (blockadeQ == false) {

        function showQ() {
            let tempList = [];

            db.players = db.players.map(player => {

                if (player.vs) {
                    tempList.push(` ${player.id} (${player.gry} + ${player.vs}vs1)`)
                    return player;

                } else {
                    tempList.push(` ${player.id} (${player.gry})`)
                    return player;
                }
            })

            if (tempList.length == 0) {
                client.say(channel, `/me ` + `Kolejka jest pusta!`)
                db.players = [];

                fs.writeFile("./db.json", JSON.stringify(db), (err) => {
                    if (err) console.log(err);
                });

            } else {
                client.say(channel, `/me ` + `Kolejka: ${tempList}`)
            }
        }

        if (userstate.mod || userstate.username == 'itzmaxinho') {

            if (message.toLowerCase().startsWith('!swap')) {
                let [raw, command, argument, rest, rest2, rest3] = message.match(regexpCommandRest3);

                if (command != 'swap' || !argument || !rest) return;
                console.log("to jest command: " + command)
                console.log("to jest argument: " + argument)
                console.log("to jest rest: " + rest)
                console.log("to jest rest2: " + rest2)
                console.log("to jest rest3: " + rest3)

                if (rest.toLowerCase() === "x") {

                    if (!rest2) return;
                    let games = parseInt(rest2);
                    changeAmountOfGamesById(argument, games)
                    showQ();

                } else if (rest.toLowerCase() === "add") {

                    (async () => {
                        try {
                            chatters = await getChatters();
                            console.log("chatters: " + chatters)

                            if (!chatters.includes(argument)) {
                                client.say(channel, `@${userstate['display-name']}, zła nazwa użytkownika!`)
                                return;
                            }

                            if (!rest3) {
                                addPlayerToQ(argument, rest2 - 1, 2137)
                                showQ()

                            } else {
                                addPlayerToQ(argument, rest2 - 1, parseInt(rest3))
                                showQ()
                            }

                            fs.writeFile("./db.json", JSON.stringify(db), (err) => {
                                if (err) console.log(err);
                            });
                        }
                        catch (error) {
                            console.error(error);
                        }
                    })();

                } else if (rest.length >= 4) {

                    swapPlayersById(argument, rest)
                    showQ();

                } else if (rest == 0) {
                    deletePlayerById(argument)
                    showQ();

                } else {
                    movePlayerToPosition(argument, rest)
                    showQ();
                }
            }
        }

        if (delayQ) return;

        else {

            if ((message.toLowerCase() == '!kolejka') ||
                (message.toLowerCase() == '!q') ||
                (message.toLowerCase() == '!queue') ||
                (message.toLowerCase() == '!kłełe') ||
                (message.toLowerCase() == '!qju') ||
                (message.toLowerCase() == '!kju')) {

                if (qClosed) {
                    client.say(channel, `/me ` + `Kolejka do gierek jest na tę chwilę zamknięta!`)
                    return;
                }

                showQ()
                delayQ = true;

                setTimeout(() => {
                    delayQ = false;
                }, 2000)
            }
        }

        if (((userstate.mod) || (userstate.username == 'itzmaxinho')) && ((message.toLowerCase() == '!next') || (message.toLowerCase() == '!nastepny') || (message.toLowerCase() == '!następny'))) {
            db.players.shift();

            db.players = db.players.map(player => {
                let tempList = [];
                tempList.push(` ${player.id} (${player.gry})`)
                return player;
            })

            showQ()
            blockadeQ = true;

            setTimeout(() => {
                blockadeQ = false;
            }, 5000)

        }

        if (((userstate.mod) || (userstate.username == 'itzmaxinho')) && ((message.toLowerCase() == '!clear') || (message.toLowerCase() == '!wyczysc') || (message.toLowerCase() == '!wyczyść'))) {
            db.players = [];

            fs.writeFile("./db.json", JSON.stringify(db), (err) => {
                if (err) console.log(err);
            });
        }

        if ((message.toLowerCase() == '!niegram') || (message.toLowerCase() == '!nie gram')) {

            db.players = db.players.filter(player => !player.id.startsWith(userstate['display-name']));

            fs.writeFile("./db.json", JSON.stringify(db), (err) => {
                if (err) console.log(err);
            });
        }

        if ((userstate['custom-reward-id'] === 'f5ffb532-5c5e-47a6-a248-5da03d85dd19')
            || (userstate['custom-reward-id'] === '5cbbacbe-6448-4711-9da3-c2442ea9723b')
            || (userstate['custom-reward-id'] === '449ce791-fa1d-4c4a-a187-5f476c69fe27')
            || (userstate['custom-reward-id'] === '92a18a6d-a129-4156-b2a7-d55b52fc84c4')
            || (userstate['custom-reward-id'] === 'bb2698a9-6539-483b-be3b-5dc3d6cc15b6')
            || (userstate['custom-reward-id'] === 'f1eab457-54ff-4b33-9d81-e5344ae4b07a')) {

            if (userstate['custom-reward-id'] === 'f5ffb532-5c5e-47a6-a248-5da03d85dd19') {        // 1x Gierka ze mną w RL! ---> f5ffb532-5c5e-47a6-a248-5da03d85dd19
                games = 1;

            } else if (userstate['custom-reward-id'] === '5cbbacbe-6448-4711-9da3-c2442ea9723b') { // 2x Gierka ze mną w RL! ---> 5cbbacbe-6448-4711-9da3-c2442ea9723b
                games = 2;

            } else if (userstate['custom-reward-id'] === '449ce791-fa1d-4c4a-a187-5f476c69fe27') { // 3x Gierka ze mną w RL! ---> 449ce791-fa1d-4c4a-a187-5f476c69fe27
                games = 3;

            } else if (userstate['custom-reward-id'] === '92a18a6d-a129-4156-b2a7-d55b52fc84c4') { // 4x Gierka ze mną w RL! ---> 92a18a6d-a129-4156-b2a7-d55b52fc84c4
                games = 4;

            } else if (userstate['custom-reward-id'] === 'bb2698a9-6539-483b-be3b-5dc3d6cc15b6') { // 5x Gierka ze mną w RL! ---> bb2698a9-6539-483b-be3b-5dc3d6cc15b6
                games = 5;

            } else if (userstate['custom-reward-id'] === 'f1eab457-54ff-4b33-9d81-e5344ae4b07a') { // 1v1 ---> f1eab457-54ff-4b33-9d81-e5344ae4b07a
                games = 1;

            } else {
                client.say(channel, `/me ` + `Syntax:// Mayday, mayday, coś się zepsuło, we to ogarnij majster! Err:// #001; Gracz:// ${userstate['display-name']}`);
            }

            if (!usersOnHold.includes(userstate['display-name']) && !(vs)) {

                db.players.push({
                    id: userstate['display-name'],
                    gry: games
                })

            } else {
                db.players = db.players.map(player => {

                    if ((!usersOnHold.includes(userstate['display-name'])) && !(vs)) {

                        db.players.push({
                            id: userstate['display-name'],
                            gry: games
                        })

                        return player

                    } else if (userstate['display-name'] == player.id && usersOnHold.includes(userstate['display-name']) && !(vs)) {

                        return player = ({
                            id: player.id,
                            gry: player.gry + games,
                            vs: player.vs
                        })

                    } else {

                        db.players.push({
                            id: userstate['display-name'],
                            gry: games
                        })

                        return player
                    }
                })
            }

            function handlePlayersInQ(username) {

                if (!usersOnHold.includes(username)) {
                    usersOnHold.push(username);
                }

                if (timersQ[username]) {
                    clearTimeout(timersQ[username]);
                }

                timersQ[username] = setTimeout(() => {
                    usersOnHold.splice(usersOnHold.indexOf(username), 1);

                    db.players = db.players.map(addWhitespaceToTheName => {
                        if (userstate['display-name'] == addWhitespaceToTheName.id)
                            return addWhitespaceToTheName = ({
                                id: addWhitespaceToTheName.id + '‎',
                                gry: addWhitespaceToTheName.gry,
                                vs: addWhitespaceToTheName.vs
                            })
                        return addWhitespaceToTheName
                    })

                    fs.writeFile("./db.json", JSON.stringify(db), (err) => {
                        if (err) console.log(err);
                    });

                    delete timersQ[username];
                }, 1200000);
            }

            handlePlayersInQ(userstate['display-name'])

            if (!Boolean(db.players.filter(player => player.id == userstate['display-name']).length) && (games != '1vs1')) {
                console.log("-------- DODAWANIE DO Q -------")

                db.players.push({
                    id: userstate['display-name'],
                    gry: games
                })
            }

            fs.writeFile("./db.json", JSON.stringify(db), (err) => {
                if (err) console.log(err);
            });
        }
    }

    function changeAmountOfGamesById(viewer, games) {

        console.log("Liczba gierek do zmiany: " + games)
        console.log("Zmiana liczby gierek dla: " + viewer)

        const changedAmount = db.players.map(player => {
            if (player.id.toLowerCase().startsWith(viewer.toLowerCase())) {
                return player = ({
                    id: player.id,
                    gry: games,
                })
            } else {
                return player;
            }
            return player
        });

        db.players = changedAmount;
        fs.writeFile("./db.json", JSON.stringify(db), (err) => {
            if (err) console.log(err);
        });
    }

    function addPlayerToQ(argument, position, gamesAmount) {

        const player = db.players.splice(position, 0, {
            id: argument,
            gry: gamesAmount
        })
        console.log("ADDING PLAYER TO position: " + ++position)
        return player
    }

    function swapPlayersById(id1, id2) {
        const index1 = db.players.findIndex(player => player.id.toLowerCase().startsWith(id1.toLowerCase()));
        const index2 = db.players.findIndex(player => player.id.toLowerCase().startsWith(id2.toLowerCase()));

        console.log(index1)
        console.log(index2)

        if (index1 == -1 || index2 == -1) {
            client.say(channel, `@${userstate['display-name']} coś pomieszałeś z nickami panie kolego.`)
            return;
        }


        const swappedPlayers = db.players.map((player, index) => {
            if (index === index1) {
                return db.players[index2];
            } else if (index === index2) {
                return db.players[index1];
            } else {
                return player;
            }
        });


        db.players = swappedPlayers;
        fs.writeFile("./db.json", JSON.stringify(db), (err) => {
            if (err) console.log(err);
        });
    }

    function deletePlayerById(id) {

        let index = -1;
        for (let i = 0; i < db.players.length; i++) {
            if (db.players[i].id.toLowerCase().startsWith(id.toLowerCase())) {
                index = i;
                break;
            }
        }

        if (index !== -1) {
            db.players.splice(index, 1);
        }

        fs.writeFile("./db.json", JSON.stringify(db), (err) => {
            if (err) console.log(err);
        });
    }

    function movePlayerToPosition(id, position) {
        let index = -1;
        for (let i = 0; i < db.players.length; i++) {
            if (db.players[i].id.toLowerCase().startsWith(id.toLowerCase())) {
                index = i;
                break;
            }
        }

        if (index !== -1) {
            const player = db.players.splice(index, 1)[0];
            db.players.splice(position - 1, 0, player);
        }

        fs.writeFile("./db.json", JSON.stringify(db), (err) => {
            if (err) console.log(err);
        });
    }
});


// KAMIEN PAPIER NOZYCE
let graczKPN = [];
let blockadeKPN = false;
let counterKPN = 0;

function loseKPN() {
    graczKPN = [];
    blockadeKPN = true;

    let delett = setInterval(deleteKPN, 1420000)
    function deleteKPN() {
        graczKPN = [];
        counterKPN = 0;
        blockadeKPN = false;
        if (graczKPN.length == 0)
            clearInterval(delett)
    }
}

client.on('message', (channel, userstate, message, self) => {
    if (self) return;
    let gracz = userstate['display-name'];
    let kpnList = ['kamień', 'papier', 'nożyce'];
    let kpnRandom = kpnList[Math.floor(Math.random() * kpnList.length)]

    if ((graczKPN.includes(gracz)) || ((message.toLowerCase() == '!kamien') || (message.toLowerCase() == '!kamień') || (message.toLowerCase() == '!papier') || (message.toLowerCase() == '!papież') || (message.toLowerCase() == '!papiez') || (message.toLowerCase() == '!nozyce') || (message.toLowerCase() == '!nożyce') || (message.toLowerCase() == '!nozyczki') || (message.toLowerCase() == '!nożyczki'))) {

        if (((graczKPN.includes(gracz)) || (blockadeKPN == false)) && ((message.toLowerCase() == '!kamien') || (message.toLowerCase() == '!kamień') || (message.toLowerCase() == '!papier') || (message.toLowerCase() == '!papież') || (message.toLowerCase() == '!papiez') || (message.toLowerCase() == '!nozyce') || (message.toLowerCase() == '!nożyce') || (message.toLowerCase() == '!nozyczki') || (message.toLowerCase() == '!nożyczki'))) {

            if (graczKPN.length == 0) {
                graczKPN.push(gracz);
            }

            blockadeKPN = true;

            if (graczKPN.includes(userstate['display-name']) && counterKPN == 2) {
                client.say(channel, `/me ` + `@${userstate['display-name']} aaa pierdole, poddaje się KEKW`)
                loseKPN()

                dbeco.viewers = dbeco.viewers.map(kpnFF => {
                    if (kpnFF.nickname === userstate.username) {
                        kpnFF = ({
                            nickname: kpnFF.nickname,
                            id: kpnFF.id,
                            level: kpnFF.level,
                            gold: kpnFF.gold + 2,
                            goldSpent: kpnFF.goldSpent,
                            skillPoints: kpnFF.skillPoints,
                            bossesDefeated: kpnFF.bossesDefeated,
                            dungeonsCompleted: kpnFF.dungeonsCompleted,
                            winsInEvents: kpnFF.winsInEvents,
                            atk: kpnFF.atk,
                            hp: kpnFF.hp,
                            luck: kpnFF.luck,
                            fightsWon: kpnFF.fightsWon,
                            fightsLost: kpnFF.fightsLost
                        })
                    }
                    return kpnFF;
                });

                fs.writeFile("./dbeco.json", JSON.stringify(dbeco), (err) => {
                    if (err) console.log(err);
                });

                return dbeco;

            } else {
                if ((graczKPN.includes(userstate['display-name'])) && ((message.toLowerCase() == '!kamien') || (message.toLowerCase() == '!kamień'))) {

                    if (kpnRandom == 'kamień') {
                        client.say(channel, `/me ` + `kamień`)
                        client.say(channel, `/me ` + `@${userstate['display-name']} REMIS! Jeszcze raz...`)
                        counterKPN++;
                        return;

                    } else if (kpnRandom == 'papier') {
                        client.say(channel, `/me ` + `papier`)
                        client.say(channel, `/me ` + `@${userstate['display-name']} PRZEGRAŁEŚ!`)
                        loseKPN()
                        return;

                    } else if (kpnRandom == 'nożyce') {
                        client.say(channel, `/me ` + `nożyce`)
                        client.say(channel, `/me ` + `@${userstate['display-name']} WYGRAŁEŚ!`)
                        loseKPN()

                        dbeco.viewers = dbeco.viewers.map(kpnWIN => {
                            if (kpnWIN.nickname === userstate.username) {
                                kpnWIN = ({
                                    nickname: kpnWIN.nickname,
                                    id: kpnWIN.id,
                                    level: kpnWIN.level,
                                    gold: kpnWIN.gold + 1,
                                    goldSpent: kpnWIN.goldSpent,
                                    skillPoints: kpnWIN.skillPoints,
                                    bossesDefeated: kpnWIN.bossesDefeated,
                                    dungeonsCompleted: kpnWIN.dungeonsCompleted,
                                    winsInEvents: kpnWIN.winsInEvents,
                                    atk: kpnWIN.atk,
                                    hp: kpnWIN.hp,
                                    luck: kpnWIN.luck,
                                    fightsWon: kpnWIN.fightsWon,
                                    fightsLost: kpnWIN.fightsLost
                                })
                            }
                            return kpnWIN;
                        });

                        fs.writeFile("./dbeco.json", JSON.stringify(dbeco), (err) => {
                            if (err) console.log(err);
                        });

                        return dbeco;
                    }

                } else if ((graczKPN.includes(userstate['display-name'])) && (message.toLowerCase() == '!papier') || (message.toLowerCase() == '!papież') || (message.toLowerCase() == '!papiez')) {

                    if (kpnRandom == 'papier') {
                        client.say(channel, `/me ` + `papier`)
                        client.say(channel, `/me ` + `@${userstate['display-name']} REMIS! Jeszcze raz...`)
                        counterKPN++;
                        return;

                    } else if (kpnRandom == 'nożyce') {
                        client.say(channel, `/me ` + `nożyce`)
                        client.say(channel, `/me ` + `@${userstate['display-name']} PRZEGRAŁEŚ!`)
                        loseKPN()
                        return;

                    } else if (kpnRandom == 'kamień') {
                        client.say(channel, `/me ` + `kamień`)
                        client.say(channel, `/me ` + `@${userstate['display-name']} WYGRAŁEŚ!`)
                        loseKPN()

                        dbeco.viewers = dbeco.viewers.map(kpnWIN => {
                            if (kpnWIN.nickname === userstate.username) {
                                kpnWIN = ({
                                    nickname: kpnWIN.nickname,
                                    id: kpnWIN.id,
                                    level: kpnWIN.level,
                                    gold: kpnWIN.gold + 1,
                                    goldSpent: kpnWIN.goldSpent,
                                    skillPoints: kpnWIN.skillPoints,
                                    bossesDefeated: kpnWIN.bossesDefeated,
                                    dungeonsCompleted: kpnWIN.dungeonsCompleted,
                                    winsInEvents: kpnWIN.winsInEvents,
                                    atk: kpnWIN.atk,
                                    hp: kpnWIN.hp,
                                    luck: kpnWIN.luck,
                                    fightsWon: kpnWIN.fightsWon,
                                    fightsLost: kpnWIN.fightsLost
                                })
                            }
                            return kpnWIN;
                        });

                        fs.writeFile("./dbeco.json", JSON.stringify(dbeco), (err) => {
                            if (err) console.log(err);
                        });

                        return dbeco;
                    }

                } else if ((graczKPN.includes(userstate['display-name'])) && (message.toLowerCase() == '!nozyce') || (message.toLowerCase() == '!nożyce') || (message.toLowerCase() == '!nozyczki') || (message.toLowerCase() == '!nożyczki')) {

                    if (kpnRandom == 'nożyce') {
                        client.say(channel, `/me ` + `nożyce`)
                        client.say(channel, `/me ` + `@${userstate['display-name']} REMIS! Jeszcze raz...`)
                        counterKPN++;
                        return;

                    } else if (kpnRandom == 'kamień') {
                        client.say(channel, `/me ` + `kamień`)
                        client.say(channel, `/me ` + `@${userstate['display-name']} PRZEGRAŁEŚ!`)
                        loseKPN()
                        return;

                    } else if (kpnRandom == 'papier') {
                        client.say(channel, `/me ` + `papier`)
                        client.say(channel, `/me ` + `@${userstate['display-name']} WYGRAŁEŚ!`)
                        loseKPN()

                        dbeco.viewers = dbeco.viewers.map(kpnWIN => {
                            if (kpnWIN.nickname === userstate.username) {
                                kpnWIN = ({
                                    nickname: kpnWIN.nickname,
                                    id: kpnWIN.id,
                                    level: kpnWIN.level,
                                    gold: kpnWIN.gold + 1,
                                    goldSpent: kpnWIN.goldSpent,
                                    skillPoints: kpnWIN.skillPoints,
                                    bossesDefeated: kpnWIN.bossesDefeated,
                                    dungeonsCompleted: kpnWIN.dungeonsCompleted,
                                    winsInEvents: kpnWIN.winsInEvents,
                                    atk: kpnWIN.atk,
                                    hp: kpnWIN.hp,
                                    luck: kpnWIN.luck,
                                    fightsWon: kpnWIN.fightsWon,
                                    fightsLost: kpnWIN.fightsLost
                                })
                            }
                            return kpnWIN;
                        });

                        fs.writeFile("./dbeco.json", JSON.stringify(dbeco), (err) => {
                            if (err) console.log(err);
                        });

                        return dbeco;
                    }
                }
            }
        }
    }
});


// Speedtyping !st
let regexpCommands = new RegExp(/^!([a-zA-Z0-9]+)(?:\W+)?(.*)?/);
let stList = [
    'Młodzieżowe Słowo Roku wybrano po rocznej przerwie. W 2020 roku Młodzieżowego Słowa Roku nie wybrano. Kapituła plebiscytu wydała oświadczenie, w którym wyjaśniła, że nie może wyróżnić popularnego słowa "Julka/julka".',
    'Centrum handlowe to tutaj punkt zborny, to tutaj dobierają do butów torby, temat paznokcia pozornie pozorny, jej twarz to miraż jak makijaż upiorny.',
    'Cóż potrzeba strzelcowi do zestrzelenia cietrzewia drzemiącego w dżdżysty dzień na strzelistym drzewie.',
    'Czesał czyżyk czarny koczek, czyszcząc w koczku każdy loczek. Po czym przykrył koczek toczkiem, lecz część loczków wyszła boczkiem.',
    'Dżdżystym rankiem gżegżółki i piegże, zamiast wziąć się za wiele dżdżownic, nażarły się na czczo miąższu rzeżuchy i rzędem rzygały do rozżarzonej brytfanny.',
    'Gdy Pomorze nie pomoże, to pomoże może morze, a gdy morze nie pomoże to pomoże może las.',
    'Leży Jerzy na wieży i nie wierzy, że na drugiej wieży wśród stada nietoperzy leży drugi Jerzy.',
    'Mała muszka spod Lopuszki chciała mieć różowe nóżki - różdżką nóżki czarowała, lecz wciąż nóżki czarne miała. Po cóż czary, moja muszko? Ruszże móżdżkiem, a nie różdżką!',
    'My indywidualiści wyindywidualizowaliśmy się z rozentuzjazmowanego tłumu, który oklaskiwał przeintelektualizowane i przeliteraturalizowane dzieło.',
    'Raz w szuwarach się zaszywszy w jednym szyku wyszły trzy wszy. Po chwili się rozmnożywszy ruch w szuwarach stał się żywszy.',
    'Szedł Mojżesz przez morze, jak żniwiarz przez zboże, a za nim przez morze trzy cytrzystki szły. Paluszki cytrzystek nie mogą być duże gdyż w strunach cytry uwięzłyby.',
    'Warzy żaba smar, pełen smaru gar, z wnętrza gara bucha para, z pieca bucha żar, smar jest w garze, gar na żarze, wrze na żarze smar.',
    'W gąszczu szczawiu we Wrzeszczu klaszczą kleszcze na deszczu, szepcze szczygieł w szczelinie, szczeka szczeniak w Szczuczynie.',
    'W grząskich trzcinach i szuwarach kroczy jamnik w szarawarach, szarpie kłącza oczeretu i przytracza do beretu, ważkom pęki skrzypu wręcza.',
    'W krzakach rzekł do trznadla trznadel: Możesz mi pożyczyć szpadel? Muszę nim przetrzebić chaszcze, bo w nich straszą straszne paszcze.',
    'W wysuszonych sczerniałych trzcinowych szuwarach sześcionogi szczwany trzmiel bezczelnie szeleścił w szczawiu trzymając w szczękach strzęp szczypiorku i często trzepocąc skrzydłami.',
    'Wróbelek Walerek miał mały werbelek, werbelek Walerka miał mały felerek, felerek werbelka naprawił Walerek, Walerek wróbelek na werbelku swym grał.',
    'Z czeskich strzech szło Czechów trzech. Gdy nadszedł zmierzch, pierwszego w lesie zagryzł zwierz, bez śladu drugi w gąszczach sczezł, a tylko trzeci z Czechów trzech osiągnął marzeń kres.',
    'Każdego dnia, w usłudze Steam, loguje się blisko 35 mln użytkowników? Liczba ta stale rośnie. Skracane są także nazwy gier, które bardzo schudły w ciągu ostatnich kilku lat.',
    'W zeszłym roku dowiedzieliśmy się też o ciekawym błędzie. Artem Moskowsky wykrył na Steamie ogromną lukę pozwalającą w bezproblemowy sposób wygenerować dowolną liczbę kluczy do dowolnej gry.',
    'Wiedzieliście, że Valve zostało założone przez dwóch milionerów pracujących wcześniej w Microsofcie? Gabe Newell oraz Mike Harrington pracowali w szeregach giganta z Redmond przez blisko 10 lat.',
    'Kto pamięta pierwszego Game Boya? Ta szara, wielka cegła towarzyszyła mi przez wiele miesięcy i nigdy nie zapomnę tej radości, gdy znalazłem go pod choinką.',
    'Seria Call of Duty zrobiła gigantyczną furorę na rynku. Tak wielką, że przy grach z tej serii spędzono blisko 25 miliardów godzin, co daje 2,85 miliona lat.',
    'Tytułem, który zarobił najwięcej pieniędzy w całej historii branży, jest World of Warcraft. Nie powinno to nikogo dziwić, bo MMORPG są prawdziwą żyłą złota.',
    'Imponującym wynikiem może też poszczycić się GTA V od Rockstara. Dzięki tej produkcji pobito kilka rekordów Guinessa, w tym dla najszybciej sprzedającej się gry wideo wszech czasów.',
    'Na produkcję Angry Birds przeznaczono raptem 70 tysięcy dolarów. Nad grą pracowało tylko 12 programistów, robiąc przy okazji wiele innych rzeczy.',
    'Najbardziej dochodową grą na rynku, w skali zarobku przynoszonego każdego dnia, jest Candy Crush Saga. Codziennie, dzięki tej grze, twórcy zarabiają blisko 850 tysięcy dolarów.',
    'Statystycznie rzecz biorąc, średni wiek gracza to 35 lat, który swoją przygodę z wirtualną rozrywką rozpoczął 14 lat temu. Najwięcej gier kupują ludzie, którzy ukończyli 37 rok życia.',
    'Aż 68% wszystkich posiadaczy smartfonów i tabletów regularnie w coś grywa, natomiast blisko 51% amerykanów ma w swoim domu przynajmniej dwie konsole.',
    'Zapewne o tym już słyszeliście, ale ostatnia gra na PlayStation 2 pojawiła się w 2013 roku, a był nią Pro Evolution Soccer 2014. Łącznie na ten historyczny sprzęt wydano 3874 gry.',
    'Pierwsze PlayStation było pierwotnie pomysłem Nintendo. Nazwane roboczo Play Station lub, jeszcze wtedy, Super Disc miał być jedynie rozszerzeniem z płytami CD dla Super Nintendo.',
    'Powstał kiedyś shooter o nazwie Lose/Lose, zaprojektowany przez Zacha Gage, który miał bardzo prosty mechanizm. Jeden pokonany wróg w tej grze automatycznie usuwał jeden, całkowicie losowy plik z naszego komputera.',
    'W popularnym Pac-Manie, którego premiera odbyła się w 1980 roku, można zdobyć maksymalnie 3,333,360 punktów. Taki wynik po raz pierwszy uzyskał Billy Mitchell dopiero w 1999 roku, grając ciągiem przez 6 godzin.',
    'Pierwszy Xbox miał nazywać się DirectX Box od kluczowego API pomagającego w produkcji gier. Nazwę postanowiono jednak skrócić, by lepiej zakorzeniła się w pamięci klientów.',
    'Wartość rynku growego na całym świecie w 2006 roku wynosiła zaledwie 7,4 miliarda dolarów, co i tak było trzykrotnym wzrostem względem 1996.',
    'Te statystyki mogą być oszałamiające, ale każdego miesiąca aż 3,5 miliarda osób ogląda na YouTube jakiś film związany z grami. Najczęściej są to lets playe.',
    'Zmagania e-sportowe rosną w siłę, a rynek powiększa się w szalonym tempie. Szacuje się, że w 2021 roku jego wartość wzrośnie dwukrotnie, do kwoty 1,6 miliarda dolarów.',
];
let player1st;
let player2st;
let etapSt = 0;
let blockadeSt = false;
let randomSt;
let stCounter = 0;
let stInterval;
let safeTimeout;

client.on('message', (channel, userstate, message, self) => {

    if (self || message.toLowerCase() === '!stream' || message.toLowerCase().startsWith('!stat') || blockadeSt == true) return;

    if (blockadeSt == false) {
        if ((message.toLowerCase().startsWith('!st')) || (player1st == userstate['display-name']) || (player2st == userstate.username) || (player2st == userstate['display-name'])) {

            if (etapSt == 0) {

                let [raw, command, argument] = message.match(regexpCommands);

                if (!argument) {
                    client.say(channel, `/me ` + `Wybierz osobę z czatu, z którą chcesz się zmierzyć !st nickname_tej_osoby`)
                    return;

                } else if ((command.toLowerCase() == 'st') && (argument != userstate['display-name'] && argument != userstate.username)) {

                    player1st = userstate['display-name'];
                    player2st = argument.toLowerCase();
                    etapSt = 1;

                    client.say(channel, `/me ` + `@${player1st} wyzywa @${player2st} na test szybkości pisania! Po zaakceptowaniu wyzwania, wyświetli się tekst bez polskich znaków, który trzeba jak najszybciej przepisać z polskimi znakami. Pierwsza osoba, która przepisze tekst bezbłędnie - wygrywa. @${player2st}, napisz !zgoda w ciągu minuty, aby przyjąć wyzwanie. Countdown `);

                    safeTimeout = setTimeout(() => {
                        blockadeSt = false;
                        player1st = null;
                        player2st = null;
                        etapSt = 0;
                    }, 60000)
                }
            }

            if ((etapSt == 1) && (player2st == userstate.username) && (message.toLowerCase() == '!zgoda')) {

                clearTimeout(safeTimeout)
                setTimeout(() => {
                    blockadeSt = false;
                    player1st = null;
                    player2st = null;
                    etapSt = 0;
                }, 1200000)

                player2st = userstate['display-name'];

                client.say(channel, `/me ` + `Za 5 sekund wyświetli się tekst, przygotujcie się. @${player1st}, @${player2st}`)

                randomSt = stList[Math.floor(Math.random() * stList.length)];

                setTimeout(() => {
                    client.say(channel, `/me ` + randomSt.replace(/ą/g, 'a').replace(/Ą/g, 'A')
                        .replace(/ć/g, 'c').replace(/Ć/g, 'C')
                        .replace(/ę/g, 'e').replace(/Ę/g, 'E')
                        .replace(/ł/g, 'l').replace(/Ł/g, 'L')
                        .replace(/ń/g, 'n').replace(/Ń/g, 'N')
                        .replace(/ó/g, 'o').replace(/Ó/g, 'O')
                        .replace(/ś/g, 's').replace(/Ś/g, 'S')
                        .replace(/ż/g, 'z').replace(/Ż/g, 'Z')
                        .replace(/ź/g, 'z').replace(/Ź/g, 'Z'))

                    stInterval = setInterval(() => {
                        ++stCounter
                    }, 1000)

                }, 5000);
                etapSt = 2;
            }

            if (etapSt == 2) {
                if ((player1st == userstate['display-name']) && (message == randomSt)) {
                    client.say(channel, `/me ` + `@${player1st} wygrywa po ${stCounter} sekundach łamania palców!`)
                    etapSt = 3;
                    clearInterval(stInterval);
                    stCounter = 0;

                } else if ((userstate['display-name'] == player2st) && (message == randomSt)) {
                    client.say(channel, `/me ` + `@${player2st} wygrywa po ${stCounter} sekundach łamania palców!`)
                    etapSt = 3;
                    clearInterval(stInterval);
                    stCounter = 0;
                }
            }
        }
    }
});


// !hmm ciekawostki Lottvs yt
let blockadeHmm = false;
let listCiekawostki = [
    'Masz tylko 2 minuty życia, ale za każdym razem gdy weźmiesz wdech - czas się resetuje',
    'Łóżko to inaczej półka, na którą odkładasz swoje ciało kiedy go nie używasz',
    'Możesz połknąć ślinę tylko 3 razy pod rząd, na kolejny raz twój mózg ci nie pozwoli',
    'Pieniądze, które masz w portfelu, mogły być kiedyś w rękach jakiejś popularnej osoby',
    'Jeśli twój syn zostanie księdzem, to będziesz zwracać się do niego Ojcze?',
    'Skoro urodziły się bliźniaki, to który z nich nie był planowany?',
    'Dlaczego wolny czas tak szybko mija?',
    'Cytryna to owoc czy warzywo?',
    'Byłeś kiedyś najmłodszą osobą na ziemi',
    'Czy można cenzurować kobiece cycki, męskimi?',
    'Dlaczego mucha potrafi wlecieć przez bardzo małą szparę, a nie potrafi wylecieć przez otwarte okno?',
    'Czy niewidomi widzą w snach?',
    'Jakiego koloru jest lustro?',
    'Jeżeli węża boli gardło, to znaczy że boli go wąż?',
    'Jeżeli się uderzysz i cię to zaboli to jesteś silny czy słaby?',
    'Mordercy to tak naprawdę bohaterzy, którzy ratują świat przed przeludnieniem?',
    'Dlaczego winimy ludzi leniwych skoro nic nie zrobili?',
    'Nie masz lęku wysokości. Masz lęk przed spadnięciem',
    'Kiedy rozbijasz lustro to ono się nie psuje tylko powiela',
    'Jeżeli samobójca się zabije to jest więcej czy mniej samobójców?',
    'Nie da się kupić nieużywanego lustra',
    'Jeśli zje się osobę zaszczepioną to dostanie się certyfikat covidowy?',
    'Czy płatki z mlekiem to zupa?',
    'Jeżeli chcemy zasnąć to najpierw musimy udawać, że śpimy',
    'Pomarańcza nazywa się pomarańczą, dlatego że jest pomarańczowa?',
    'Spadek to po prostu krewni, którzy dropią itemy po śmierci',
    'Jeżeli wsadzisz komuś palec w dupę to kto ma palec w dupie, ty czy on?',
    'Nie boisz się ciemności tylko tego co w niej siedzi',
    'Jak ksiądz umiera to awansuje?',
    'Zygzak McQueen miał ubezpieczenie na życie czy na auto?',
    'Akt urodzenia to właściwie paragon od bycia człowiekiem',
    'Jak pachnie pod wodą?',
    'Jeśli byłbyś niewidzialny to czy po zamknięciu oczu widziałbyś przez powieki?',
    'Zebry są tak naprawdę koloru białego w czarne paski czy koloru czarnego w białe paski?',
    'Jeśli wszystko jest możliwe, to czy jest możliwe zeby było niemożliwe?',
    'Jeśli aborcja to morderstwo, to czy robienie loda to kanibalizm?',
    'Jeśli ateista idzie do sądu, to czy musi przysięgać na Biblie?',
    'Czy oczekiwanie nieoczekiwanego zrobi z nieoczekiwanego oczekiwane?',
    'Co jest przeciwieństwem przeciwieństwa?',
    'Jeśli w słowniku ortograficznym byłyby błędy to skąd byśmy o tym wiedzieli?',
    'Czytanie to właściwe patrzenie się w drzewo przez kilka godzin i halucynacja.',
    'Ludzie którzy ładnie wyglądają, ale maja kiepski charakter są tak naprawdę ludzkimi odpowiednikami clickbaitów.',
    'Producenci fajek zabijają swoich najlepszych klientów, a producenci prezerwatyw swoich przyszłych klientów.',
    'Kiedy Polska gra z Andorą, skrót to POL-AND, z pozostałych nieużytych liter można ułożyć AND-ORA.',
    'Jeśli ludzie maja gęsia skórkę, to czy gęsi maja ludzką skórkę?',
    'Co jeśli powietrze to prawdziwy narkotyk, który sprawia że nie widzimy prawdziwego świata, a ludzie którzy biorą prawdziwe narkotyki widzą prawdziwe życie i dlatego narkotyki są nielegalne?',
    'Ożenić się z wdową która ma dorosłą córkę, twój ojciec żeni się z tą córką, ona staje się twoją matką, a jej matka twoją babcia zakładając, że ożeniłeś się z jej matką wychodzi na to że stajesz się sam swoim dziadkiem.',
    'Jeśli jeden facet ma biegunkę, a drugi zatwardzenie, to który sra rzadziej?',
    'Co próbowała zrobić pierwsza osoba na świecie, która wydoiła krowę?',
    'Czy jeśli dwie osoby, z dwóch stron ziemi, rzucą kromkę chleba na podłogę to ziemia stanie się jedną wielką kanapką?',
    'Całe dzieciństwo marzyliśmy o tym, by być dorosłymi, tylko po to, aby od momentu stania się dorosłymi, marzyć by znów stać się małolatami.',
    'Jeśli kiedykolwiek obudzisz się mając umiejętność przechodzenia przez ściany, trochę zajmie ci zorientowanie się, że takową umiejętność posiadasz.',
    'Za sto lat, facebook będzie pełen nieżyjących już ludzi.',
    'Dlaczego kiedy będąc w sklepie, nic w nim nie kupisz i wyjdziesz to czujesz się trochę jakbyś coś ukradł?',
    'Jeśli ktoś zapyta cię "Gdzie jest plaża?", możesz wskazać dowolny kierunek i tym samym nie skłamiesz.',
    'Zdanie "Mężny bądź, chroń pułk twój i sześć flag." zawiera wszystkie litery polskiego alfabetu, każdą dokładnie raz.',
]

client.on('message', (channel, userstate, message, self) => {
    if (self || blockadeGlobal) return;

    if (blockadeHmm == true) {
        return

    } else if (blockadeHmm == false) {
        let randomCiekawostka = listCiekawostki[Math.floor(Math.random() * listCiekawostki.length)]

        if (message.toLowerCase() == '!hmm') {
            client.say(channel, `/me ` + randomCiekawostka)
            blockadeHmm = true;
            setTimeout(() => {
                blockadeHmm = false;
            }, 900000)
        }

    }
});


// !zart
let blockadeZart = false;

client.on('message', (channel, userstate, message, self) => {
    if (self || blockadeGlobal) return;

    if (blockadeZart == true) { return }
    else {

        if (message.toLowerCase() == '!zart' || message.toLowerCase() == '!żart') {
            client.say(channel, `/me ` + `POLICE UWAGA! To co streamer przed chwilą powiedział, było w formie żartu! UWAGA! POLICE`)

            blockadeZart = true;
            setTimeout(() => {
                blockadeZart = false;
            }, 5000)
        }
    }
});


// !zdrowko
let blockadeZdrowko = false;
let alkoLevel;

client.on('message', (channel, userstate, message, self) => {
    if (self || blockadeGlobal) return;

    let tempList = [];

    if (blockadeZdrowko == true) {
        return

    } else if (blockadeZdrowko == false) {
        if ((message.toLowerCase().includes('!zdrowko')) || (message.toLowerCase().includes('!zdrówko')) || (message.includes('!itzmax3ZDR')) || (message.includes('! itzmax3ZDR'))) {
            dbcommands.zdrowko = dbcommands.zdrowko.map(zdrowie => {
                tempList.push(`${zdrowie.counter + 1}`)

                if ((zdrowie.counter + 1) < 6)
                    alkoLevel = 'Paruwa'

                else if ((zdrowie.counter + 1) < 210)
                    alkoLevel = 'Amator'

                else if ((zdrowie.counter + 1) < 220)
                    alkoLevel = 'Gimbus'

                else if ((zdrowie.counter + 1) < 230)
                    alkoLevel = 'Żul'

                else if ((zdrowie.counter + 1) < 240)
                    alkoLevel = 'moczygęba'

                else if ((zdrowie.counter + 1) < 250)
                    alkoLevel = 'Ochlajtus'

                else if ((zdrowie.counter + 1) < 260)
                    alkoLevel = 'moczymorda'

                else if ((zdrowie.counter + 1) < 270)
                    alkoLevel = 'dypsomaniak'

                else if ((zdrowie.counter + 1) < 280)
                    alkoLevel = 'pijaczysko'

                else if ((zdrowie.counter + 1) < 290)
                    alkoLevel = 'męt'

                else if ((zdrowie.counter + 1) < 300)
                    alkoLevel = 'gazownik'

                else if ((zdrowie.counter + 1) < 310)
                    alkoLevel = 'łachmaniarz'

                else if ((zdrowie.counter + 1) < 320)
                    alkoLevel = 'Menel spod żabki'

                else if ((zdrowie.counter + 1) < 330)
                    alkoLevel = 'Nurse'

                else if ((zdrowie.counter + 1) < 340)
                    alkoLevel = 'Pijaczyna'

                else if ((zdrowie.counter + 1) < 350)
                    alkoLevel = 'Chlejus'

                else if ((zdrowie.counter + 1) < 360)
                    alkoLevel = 'Chlejus menelus'

                else if ((zdrowie.counter + 1) < 370)
                    alkoLevel = 'Moczymorda spod Carrefoura'

                else if ((zdrowie.counter + 1) < 380)
                    alkoLevel = 'trunkowicz'

                else if ((zdrowie.counter + 1) < 390)
                    alkoLevel = 'Smakosz najtańszych sikaczy'

                else if ((zdrowie.counter + 1) < 400)
                    alkoLevel = 'szumowina'

                else if ((zdrowie.counter + 1) < 410)
                    alkoLevel = 'Prawie jak paattrol'

                else if ((zdrowie.counter + 1) < 420)
                    alkoLevel = 'gonie małka'

                return zdrowie = ({
                    counter: zdrowie.counter + 1,
                })
            })

            client.say(channel, `/me ` + `Streamer zrobił z widzami zdrówko już ${tempList} razy. Poziom alkoholizmu: ${alkoLevel.toUpperCase()}`)

            blockadeZdrowko = true;
            setTimeout(() => {
                blockadeZdrowko = false;
            }, 10000)

            fs.writeFile("./dbcommands.json", JSON.stringify(dbcommands), (err) => {
                if (err) console.log(err);
            });

        } else {
            return;
        }
    }
});


// daj !timeout
client.on('message', (channel, userstate, message, self) => {
    if (self || userstate.username == 'streamelements' || userstate.username == 'nightbot') return;

    let czas1 = Math.floor(Math.random() * 5000) + 1
    let czas2 = Math.floor(Math.random() * 1200) + 1
    let czas3 = Math.floor(Math.random() * 2000) + 3000

    if (message.toLowerCase().includes(`daje`) || message.toLowerCase().includes(`dając`) || message.toLowerCase().includes(`rozdaje`)) {
        return;
    }

    if ((message.toLowerCase().includes(`daj`)
        || message.toLowerCase().includes(`dasz`)
        || message.toLowerCase().includes(`prosze`)
        || message.toLowerCase().includes(`poprosze`)
        || message.toLowerCase().includes(`poproszę`)
        || message.toLowerCase().includes(`proszę`)
        || message.toLowerCase().includes(`dostane`)
        || message.toLowerCase().includes(`dostanę`)
        || message.toLowerCase().includes(`dostałbym`)
        || message.toLowerCase().includes(`dostalbym`)
        || message.toLowerCase().includes(`moge`)
        || message.toLowerCase().includes(`mozna`)
        || message.toLowerCase().includes(`można`)
        || message.toLowerCase().includes(`bym otrz`)
        || message.toLowerCase().includes(`mogę`))
        && (message.toLowerCase().includes(`mał`)
            || message.toLowerCase().includes(`mal`)
            || message.toLowerCase().includes(`kró`)
            || message.toLowerCase().includes(`kro`)
            || message.toLowerCase().includes(`kru`)
            || message.toLowerCase().includes(`niski`))
        && (message.toLowerCase().includes(`timeout`)
            || message.toLowerCase().includes(`tajmałt`)
            || message.toLowerCase().includes(`wyklucz`)
            || message.toLowerCase().includes(`tajmout`)
            || message.toLowerCase().includes(`t/o`)
            || message.toLowerCase().includes(`timeałt`)
        )) {

        if (userstate.mod || userstate.username == `itzmaxinho`) {
            client.say(channel, `/me ` + `${userstate['display-name']}, unmodnij się to ci przykjurwie z chęcią KEKW`)
            return;

        } else if (userstate.username === 'mazurrl') {
            client.say(channel, `/me ` + `Skończyły się dla ciebie timeouty misiu KEKW`)
        } else {
            //client.say(channel, `/me ` + `/timeout ${userstate['display-name']} ${czas2}`)
            TimeoutUser(userstate.username, czas2)

            if ((czas2 / 60) >= 120) {

                czas2 = czas2 / 60 - 120;
                client.say(channel, `/me ` + `@${userstate['display-name']} otrzymał małego timeouta na 2h ${czas2.toFixed(0)} min peepoGlad`)

            } else if ((czas2 / 60) >= 60) {

                czas2 = czas2 / 60 - 60;
                client.say(channel, `/me ` + `@${userstate['display-name']} otrzymał małego timeouta na 1h ${czas2.toFixed(0)} min peepoGlad`)

            } else {

                czas2 = czas2 / 60;
                client.say(channel, `/me ` + `@${userstate['display-name']} otrzymał małego timeouta na ${czas2.toFixed(0)} min peepoGlad`)
            }
        }

    } else if ((message.toLowerCase().includes(`daj`)
        || message.toLowerCase().includes(`dasz`)
        || message.toLowerCase().includes(`prosze`)
        || message.toLowerCase().includes(`poprosze`)
        || message.toLowerCase().includes(`poproszę`)
        || message.toLowerCase().includes(`proszę`)
        || message.toLowerCase().includes(`dostane`)
        || message.toLowerCase().includes(`dostanę`)
        || message.toLowerCase().includes(`dostałbym`)
        || message.toLowerCase().includes(`dostalbym`)
        || message.toLowerCase().includes(`moge`)
        || message.toLowerCase().includes(`mozna`)
        || message.toLowerCase().includes(`można`)
        || message.toLowerCase().includes(`bym otrz`)
        || message.toLowerCase().includes(`mogę`))
        && (message.toLowerCase().includes(`potężn`)
            || message.toLowerCase().includes(`duż`)
            || message.toLowerCase().includes(`długi`)
            || message.toLowerCase().includes(`wielk`)
            || message.toLowerCase().includes(`najw`)
            || message.toLowerCase().includes(`ogromn`))
        && (message.toLowerCase().includes(`timeout`)
            || message.toLowerCase().includes(`tajmałt`)
            || message.toLowerCase().includes(`wyklucz`)
            || message.toLowerCase().includes(`tajmout`)
            || message.toLowerCase().includes(`t/o`)
            || message.toLowerCase().includes(`timeałt`))) {

        if (userstate.mod || userstate.username == `itzmaxinho`) {
            client.say(channel, `/me ` + `${userstate['display-name']}, unmodnij się to ci przykjurwie z chęcią KEKW`)
            return;

        } else if (userstate.username === 'mazurrl') {
            client.say(channel, `/me ` + `Skończyły się dla ciebie timeouty misiu KEKW`)
        } else {
            //client.say(channel, `/me ` + `/timeout ${userstate['display-name']} ${czas3}`)
            TimeoutUser(userstate.username, czas3)

            if ((czas3 / 60) >= 120) {

                czas3 = czas3 / 60 - 120;
                client.say(channel, `/me ` + `@${userstate['display-name']} otrzymał dużego timeouta na 2h ${czas3.toFixed(0)} min peepoGlad`)

            } else if ((czas3 / 60) >= 60) {

                czas3 = czas3 / 60 - 60;
                client.say(channel, `/me ` + `@${userstate['display-name']} otrzymał dużego timeouta na 1h ${czas3.toFixed(0)} min peepoGlad`)

            } else {

                czas3 = czas3 / 60;
                client.say(channel, `/me ` + `@${userstate['display-name']} otrzymał dużego timeouta na ${czas3.toFixed(0)} min peepoGlad`)
            }
        }

    } else if ((message.toLowerCase().includes(`daj`)
        || message.toLowerCase().includes(`dasz`)
        || message.toLowerCase().includes(`prosze`)
        || message.toLowerCase().includes(`poprosze`)
        || message.toLowerCase().includes(`poproszę`)
        || message.toLowerCase().includes(`proszę`)
        || message.toLowerCase().includes(`dostane`)
        || message.toLowerCase().includes(`dostanę`)
        || message.toLowerCase().includes(`dostałbym`)
        || message.toLowerCase().includes(`dostalbym`)
        || message.toLowerCase().includes(`moge`)
        || message.toLowerCase().includes(`mozna`)
        || message.toLowerCase().includes(`można`)
        || message.toLowerCase().includes(`bym otrz`)
        || message.toLowerCase().includes(`mogę`))
        && (message.toLowerCase().includes(`timeout`)
            || message.toLowerCase().includes(`tajmałt`)
            || message.toLowerCase().includes(`wyklucz`)
            || message.toLowerCase().includes(`tajmout`)
            || message.toLowerCase().includes(`t/o`)
            || message.toLowerCase().includes(`timeałt`))) {

        if (userstate.mod || userstate.username == `itzmaxinho`) {
            client.say(channel, `/me ` + `${userstate['display-name']}, unmodnij się to ci przykjurwie z chęcią KEKW`)
            return;

        } else if (userstate.username === 'mazurrl') {
            client.say(channel, `/me ` + `Skończyły się dla ciebie timeouty misiu KEKW`)
        } else {
            //client.say(channel, `/me ` + `/timeout ${userstate['display-name']} ${czas1}`)
            TimeoutUser(userstate.username, czas1)

            if ((czas1 / 60) >= 120) {

                czas1 = czas1 / 60 - 120;
                client.say(channel, `/me ` + `@${userstate['display-name']} otrzymał timeout na 2h ${czas1.toFixed(0)} min peepoGlad`)

            } else if ((czas1 / 60) >= 60) {

                czas1 = czas1 / 60 - 60;
                client.say(channel, `/me ` + `@${userstate['display-name']} otrzymał timeout na 1h ${czas1.toFixed(0)} min peepoGlad`)

            } else {

                czas1 = czas1 / 60;
                client.say(channel, `/me ` + `@${userstate['display-name']} otrzymał timeout na ${czas1.toFixed(0)} min peepoGlad`)
            }

        }
    }

});


// !vote
let blockadeVote;
let delayVote = false;
let canVote = false;
let Taks = 0;
let Nies = 0;
let canCheck = true;
let voteCheck;
let voteArgument;
let finalAnswer;
let canFinalCheck = true;
let procent;
let listVoted = [];

client.on('message', (channel, userstate, message, self) => {
    if (self) return;

    if (canVote == true && !listVoted.includes(userstate['display-name'])) {
        if (message.toLowerCase() == 'tak' || message.toLowerCase() == 'yes') {
            Taks += 1;
            listVoted.push(userstate['display-name'])

        } else if (message.toLowerCase() == 'nie' || message.toLowerCase() == 'nope') {
            Nies += 1;
            listVoted.push(userstate['display-name'])
        }

        if (canCheck) {
            voteCheck = setTimeout(() => {
                client.say(channel, `/me ` + `Tak: ${Taks}, Nie: ${Nies}`)
                canCheck = true;
            }, 15000)
            canCheck = false;
        }

        if (canFinalCheck) {
            let finalCheck = setTimeout(() => {
                if (Taks == Nies) {
                    finalAnswer = 'nie zdecydowaliście KEKW Remis w głosach!'
                    procent = 50;

                } else if (Taks > Nies) {
                    procent = Taks + Nies;
                    procent = Taks / procent * 100;
                    finalAnswer = 'TAK!';

                } else if (Taks < Nies) {
                    procent = Taks + Nies;
                    procent = Nies / procent * 100;
                    finalAnswer = 'NIE!';
                }
                client.say(channel, `/me ` + `Tak: ${Taks}, Nie: ${Nies}`)
                client.say(channel, `/me ` + `Wyniki głosowania: ${voteArgument} Zadecydowaliście, że... ${finalAnswer} (${procent.toFixed(1)}%)`)
                clearTimeout(voteCheck)
                Taks = 0;
                Nies = 0;
                listVoted = [];
                canVote = false;
            }, 60000)
            canFinalCheck = false;
        }
    }

    if (delayVote == false && (userstate.mod || userstate.username == 'itzmaxinho')) {
        blockadeVote = false;

        if (blockadeVote == true) {
            return;

        } else if (blockadeVote == false) {

            if (message.toLowerCase().startsWith('!vote')) {

                let [raw, command, argument] = message.match(regexpCommands);

                if (!argument) {
                    client.say(channel, `/me ` + `Wpisz powód głosowania po !vote`)
                    return;

                } else if (command.toLowerCase() == 'vote') {
                    delayVote = true;
                    setTimeout(() => {
                        delayVote = false;
                    }, 5000)

                    client.say(channel, `/me ` + `${argument} Głosujcie przez 60 sekund pisząc tak/nie`)
                    canVote = true;
                    voteArgument = argument;
                    canCheck = true;
                    canFinalCheck = true;
                }
            }
        }
    }
});


// !dj
let djList = [
    `userName1`,
    `userName2`,
    `userName3`,
];

client.on('message', (channel, userstate, message, self) => {
    if (self || blockadeGlobal) return;

    if (message.toLowerCase() == '!dj') {
        client.say(channel, `/me ` + `Oficjalni DJe tego kanału mogą puszczać sr za darmo za pomocą komendy !vibe. A są nimi: ${djList.join(', ')}`)
    }

    if (djList.includes(userstate.username) && message.toLowerCase().startsWith(`!vibe`)) {

        let [raw, command, argument] = message.match(regexpCommands);

        client.say(channel, `/me ` + `!sr ${argument}`)

    } else if (!djList.includes(userstate.username) && message.toLowerCase().startsWith(`!vibe`)) {

        client.say(channel, `/me ` + `Nie jesteś oficjalnym DJ'em na tym kanale, więc nie masz darmowych song requestów (sr). Możesz wrzucić nutę za punkty kanału.`)
    }

})


// !sr
client.on('message', (channel, userstate, message, self) => {

    if (userstate['custom-reward-id'] === '04e259c2-94ee-41f3-a9a4-6c3d4122a6df') {  // songrequest ---> 04e259c2-94ee-41f3-a9a4-6c3d4122a6df

        client.say(channel, `/me ` + `!sr ${message}`)
    }
})


// !opluted
client.on('message', (channel, userstate, message, self) => {

    let tempList = [];

    if (userstate['custom-reward-id'] === '1606dde8-98e9-442b-89b2-938f64bdb433') {  // opluted ---> 1606dde8-98e9-442b-89b2-938f64bdb433

        opluted.oplute = opluted.oplute.map(oplut => {
            tempList.push(`${oplut.opluted + 1}`)

            return oplut = ({
                opluted: oplut.opluted + 1,
            })
        })

        client.say(channel, `/me ` + `Streamer opluł już ${tempList} razy! NotLikeThis`)

        fs.writeFile("./opluted.json", JSON.stringify(opluted), (err) => {
            if (err) console.log(err);
        });
    }
})


// message event 
let blockadeEvent = 0;
let currentCommand;
let listEvent = [
    `,,mars od tyłu to sram, a kret od tyłu jest ______''`,
    `,,już lepiej, żeby sołtysowi _____ zdechła, niż się jagerek wylał''`,
    `,,jakby człowiek wiedział, że się przewróci, to by się _______''`,
    `,,majster to na _______ sklei''`,
    `,,osz kurwa____!''`,
    `,,łykniem bo _________''`,
    `,,chuj w dupe i _______ kupe''`,
    `,,wciąż jest szansa na __________ _________''`,
    `,,ptaki latają _______''`,
    `,,o chuju złoty i ______''`,
    `,,kurwy, ________ ile jeszcze''`,
    `,,zawody w wyciąganiu _____ z ____''`,
];

client.on('message', (channel, userstate, message, self) => {
    if (self) return;

    if (message.toLowerCase().includes('nice') || message.toLowerCase().includes('ladn') || message.toLowerCase().includes('ładn')) {

        if (blockadeEvent == 0) {
            let r = Math.floor(Math.random() * 600000) + 1800000
            setTimeout(timeout, r)
            blockadeEvent = 1;
            function timeout() {

                if (listEvent.length != 0) {
                    let randomEvent = listEvent[Math.floor(Math.random() * listEvent.length)]
                    currentCommand = randomEvent;

                    client.say(channel, `/me ` + ` POLICE EVENT POLICE Co to za słowo: ${randomEvent}`)
                    blockadeEvent = 2;

                } else {
                    client.say(channel, `/me ` + `Maćki Madge`)
                }
            }
        }
    }

    if (blockadeEvent == 2) {

        if (currentCommand == `,,mars od tyłu to sram, a kret od tyłu jest ______''` && message.toLowerCase().includes('jebany')) {
            client.say(channel, `/me ` + `Gratulacje @${userstate['display-name']}, wygrałeś!`)
            blockadeEvent = 0;
            distributeOneGold()
        }

        else if (currentCommand == `,,już lepiej, żeby sołtysowi _____ zdechła, niż się jagerek wylał''` && message.toLowerCase().includes('krowa')) {
            client.say(channel, `/me ` + `Gratulacje @${userstate['display-name']}, wygrałeś!`)
            blockadeEvent = 0;
            distributeOneGold()
        }

        else if (currentCommand == `,,jakby człowiek wiedział, że się przewróci, to by się _______''` && message.toLowerCase().includes('położył')) {
            client.say(channel, `/me ` + `Gratulacje @${userstate['display-name']}, wygrałeś!`)
            blockadeEvent = 0;
            distributeOneGold()
        }

        else if (currentCommand == `,,majster to na _______ sklei''` && (message.toLowerCase().includes('sylykon') || message.toLowerCase().includes('silikon'))) {
            client.say(channel, `/me ` + `Gratulacje @${userstate['display-name']}, wygrałeś!`)
            blockadeEvent = 0;
            distributeOneGold()
        }

        else if (currentCommand == `,,osz kurwa____!''` && (message.toLowerCase().includes('ncka'))) {
            client.say(channel, `/me ` + `Gratulacje @${userstate['display-name']}, wygrałeś!`)
            blockadeEvent = 0;
            distributeOneGold()
        }

        else if (currentCommand == `,,łykniem bo _________''` && (message.toLowerCase().includes('odwykniem'))) {
            client.say(channel, `/me ` + `Gratulacje @${userstate['display-name']}, wygrałeś!`)
            blockadeEvent = 0;
            distributeOneGold()
        }

        else if (currentCommand == `,,chuj w dupe i _______ kupe''` && (message.toLowerCase().includes('kamieni'))) {
            client.say(channel, `/me ` + `Gratulacje @${userstate['display-name']}, wygrałeś!`)
            blockadeEvent = 0;
            distributeOneGold()
        }

        else if (currentCommand == `,,wciąż jest szansa na __________ _________''` && (message.toLowerCase().includes('wyruchanie szympansa'))) {
            client.say(channel, `/me ` + `Gratulacje @${userstate['display-name']}, wygrałeś!`)
            blockadeEvent = 0;
            distributeOneGold()
        }

        else if (currentCommand == `,,ptaki latają _______''` && (message.toLowerCase().includes('kluczem'))) {
            client.say(channel, `/me ` + `Gratulacje @${userstate['display-name']}, wygrałeś!`)
            blockadeEvent = 0;
            distributeOneGold()
        }

        else if (currentCommand == `,,o chuju złoty i ______''` && (message.toLowerCase().includes('galoty'))) {
            client.say(channel, `/me ` + `Gratulacje @${userstate['display-name']}, wygrałeś!`)
            blockadeEvent = 0;
            distributeOneGold()
        }

        else if (currentCommand == `,,kurwy, ________ ile jeszcze''` && (message.toLowerCase().includes('kleszcze'))) {
            client.say(channel, `/me ` + `Gratulacje @${userstate['display-name']}, wygrałeś!`)
            blockadeEvent = 0;
            distributeOneGold()
        }

        else if (currentCommand == `,,zawody w wyciąganiu _____ z ____''` && (message.toLowerCase().includes('chuja wody'))) {
            client.say(channel, `/me ` + `Gratulacje @${userstate['display-name']}, wygrałeś!`)
            blockadeEvent = 0;
            distributeOneGold()
        }
    }

    function distributeOneGold() {
        dbeco.viewers = dbeco.viewers.map(distribute1gold => {
            if (distribute1gold.nickname === userstate.username) {
                distribute1gold = ({
                    nickname: distribute1gold.nickname,
                    id: distribute1gold.id,
                    level: distribute1gold.level,
                    gold: distribute1gold.gold + 1,
                    goldSpent: distribute1gold.goldSpent,
                    skillPoints: distribute1gold.skillPoints,
                    bossesDefeated: distribute1gold.bossesDefeated,
                    dungeonsCompleted: distribute1gold.dungeonsCompleted,
                    winsInEvents: distribute1gold.winsInEvents,
                    atk: distribute1gold.atk,
                    hp: distribute1gold.hp,
                    luck: distribute1gold.luck,
                    fightsWon: distribute1gold.fightsWon,
                    fightsLost: distribute1gold.fightsLost
                })
            }
            return distribute1gold;
        });

        fs.writeFile("./dbeco.json", JSON.stringify(dbeco), (err) => {
            if (err) console.log(err);
        });

        return dbeco;
    }

})


// turniej
let bannedPlayers = [];
let turniejTeams = [];
let turniejList = [];
let turniejBlockade = false;
let turniejTeamCounter = 0;
let turniejPlayerCounter = 0;

let regexpCommand2 = new RegExp(/^!([a-zA-Z0-9]+)(?:\W+)?(.*)?/);

client.on('message', (channel, userstate, message, self) => {

    if ((userstate.mod || userstate.username == 'itzmaxinho') && (message.toLowerCase().startsWith(`!turniejdel`))) {

        let [raw, command, argument] = message.match(regexpCommand2);

        if (turniejList.includes(argument)) {

            const index = turniejList.indexOf(argument);
            if (index > -1) {
                turniejList.splice(index, 1);
            }
            turniejPlayerCounter--;
            client.say(channel, `/me ` + `Gracz ${argument} został usunięty z listy.`)
            bannedPlayers.push(argument.toLowerCase())
        }
    }

    if ((userstate.mod || userstate.username == 'itzmaxinho') && (message.toLowerCase() == '!turniejteams') || (message.toLowerCase() == '!turniej teams')) {
        client.say(channel, `/me ` + turniejTeams.join(' | '))
    }

    if ((userstate.mod || userstate.username == 'itzmaxinho') && ((message.toLowerCase() == `!turniejopen`) || (message.toLowerCase() == `!turniej open`))) {
        turniejBlockade = true;
        client.say(channel, `/me ` + `Zapraszam do zapisów na listę graczy bez teammate'a! Zapisz się na listę wpisując: !turniej | sprawdź listę graczy wpisując: !turniejcheck | wypisz się z listy wpisując: !nie turniej`)

    } else if ((userstate.mod || userstate.username == 'itzmaxinho') && (message.toLowerCase() == `!turniejclose`)) {
        turniejBlockade = false;
        turniejTeamCounter = 0;
        turniejPlayerCounter = 0;
        turniejTeams = [];
    }

    if (turniejBlockade) {

        if (bannedPlayers.includes(userstate.username)) {
            client.say(channel, `/me ` + `Nie możesz dołączyć do turnieju.`)

        } else if (message.toLowerCase() == `!turniej`) {

            if (turniejList.includes(userstate['display-name'])) {
                client.say(channel, `/me ` + `${userstate['display-name']}, jesteś już na liście. Nie spamuj chamie.`);

            } else if (!turniejList.includes(userstate['display-name'])) {

                turniejPlayerCounter++;
                client.say(channel, `/me ` + `${userstate['display-name']}, zostałeś zapisany do turnieju! (liczba graczy: ${turniejPlayerCounter})`);
                turniejList.push(userstate['display-name'])
            }
        }

        if (turniejList.includes(userstate['display-name']) && (message.toLowerCase() == `!nieturniej` || message.toLowerCase() == `!nie turniej`)) {

            let index = turniejList.indexOf(userstate['display-name']);
            if (index > -1) {
                turniejList.splice(index, 1);
            }
            turniejPlayerCounter--;
            client.say(channel, `/me ` + `${userstate['display-name']}, wypisano cię z listy.`)
        }

        if (message.toLowerCase() == `!turniejcheck` || message.toLowerCase() == `!turniej check`) {

            if (turniejList.length <= 0) {
                client.say(channel, `/me ` + `Lista jest pusta!`)

            } else if (turniejList.length >= 1) {
                client.say(channel, `/me ` + `Lista osób bez teammate'a (${turniejPlayerCounter}): ${turniejList.join(', ')}`)
            }
        }

        if ((userstate.mod || userstate.username == 'itzmaxinho') && message.toLowerCase() == `!2v2`) {

            if (turniejList.length >= 2) {

                let tm1 = turniejList[Math.floor(Math.random() * turniejList.length)]
                let teammate1 = tm1;

                let index = turniejList.indexOf(tm1);
                if (index > -1) {
                    turniejList.splice(index, 1);
                }

                let tm2 = turniejList[Math.floor(Math.random() * turniejList.length)]
                let teammate2 = tm2;
                let index2 = turniejList.indexOf(tm2);
                if (index2 > -1) {
                    turniejList.splice(index2, 1);
                }

                turniejTeamCounter++;
                client.say(channel, `/me ` + `Team#${turniejTeamCounter}: ${teammate1} i ${teammate2}!`)
                turniejTeams.push(`Team#${turniejTeamCounter}: ${teammate1} i ${teammate2}!`)

            } else {

                if (turniejList.length == 1) {
                    client.say(channel, `/me ` + `Nie da rady kierowniku, zabrakło teammate'a dla ${turniejList}.`)

                } else {
                    client.say(channel, `/me ` + `Wszyscy zostali przypisani do teamów.`)
                }
            }
        }

        if ((userstate.mod || userstate.username == 'itzmaxinho') && message.toLowerCase() == `!3v3`) {

            if (turniejList.length >= 3) {

                let tm1 = turniejList[Math.floor(Math.random() * turniejList.length)]
                let teammate1 = tm1;
                let index = turniejList.indexOf(tm1);
                if (index > -1) {
                    turniejList.splice(index, 1);
                }

                let tm2 = turniejList[Math.floor(Math.random() * turniejList.length)]
                let teammate2 = tm2;
                let index2 = turniejList.indexOf(tm2);
                if (index2 > -1) {
                    turniejList.splice(index2, 1);
                }

                let tm3 = turniejList[Math.floor(Math.random() * turniejList.length)]
                let teammate3 = tm3;
                let index3 = turniejList.indexOf(tm3);
                if (index3 > -1) {
                    turniejList.splice(index3, 1);
                }

                console.log(turniejList)
                turniejTeamCounter++;
                client.say(channel, `/me ` + `Team#${turniejTeamCounter}: ${teammate1}, ${teammate2} i ${teammate3}!`)
                turniejTeams.push(`Team#${turniejTeamCounter}: ${teammate1}, ${teammate2} i ${teammate3}!`)

            } else {

                if (turniejList.length == 0) {
                    client.say(channel, `/me ` + `Wszyscy zostali przypisani do teamów.`)
                }
                else if (3 > turniejList.length >= 1) {
                    client.say(channel, `/me ` + `Nie da rady kierowniku, zabrakło teammate'a dla ${turniejList.join(', ')}.`)

                }
            }
        }
    }
});


// get tier subs
let sub23list = [];

client.on('message', (channel, userstate, message, self) => {
    if (self) return;
    if (!sub23list.includes(userstate.username)) {
        if (!userstate.badges || !userstate.badges.subscriber || userstate.badges.subscriber.length == undefined || !userstate.badges.subscriber.length) {
            return;

        } else if (userstate.badges.subscriber.length >= 3 && (userstate.badges.subscriber.startsWith('20') || userstate.badges.subscriber.startsWith('30'))) {
            sub23list.push(userstate.username)
        }
    }
})


// -rep
let regexpCommandRep = new RegExp(/^(\+|-)([a-zA-Z0-9]+)(?:\W+)?(\w+)?(?:\W+)?(.*)?/);
let neededReps;
let votedPlus = [];
let votedMinus = [];
let Repped = [];
let currentRepViewers = [];
let whiteList = [
    'userName1',
    'userName2',
    'userName...',
];
let plusReps = [
    ` uważa że jesteś super `,
    ` propsuje cię `,
    ` trzyma twoją stronę `,
    ` zgadza się z tobą `,
    ` reluje z tobą `,
]
let bannedAtm = [];

client.on('message', (channel, userstate, message, self) => {
    if (self) return;

    if ((message.toLowerCase().startsWith('-rep')) || (message.toLowerCase().startsWith('+rep'))) {

        let [raw, command, rest, argument] = message.match(regexpCommandRep);

        console.log("shall be - | command:" + command)
        console.log("rest: " + rest)
        console.log("argument: " + argument)

        if ((rest != 'rep') || (!argument)) return;

        (async () => {
            try {
                chatters = await getChatters();
                console.log(chatters);
                if ((sub23list.includes(argument.toLowerCase())) && (message.toLowerCase().startsWith('-rep'))) {

                    client.say(channel, `/me ` + `Osoby z takim pięknym subem nie mogą otrzymywać -rep MLADY`)
                    return;

                } else if (argument.toLowerCase() == userstate.username) {

                    if (message.toLowerCase().startsWith('-rep')) {
                        client.say(channel, `/me ` + `Nie możesz dać -rep sobie Macieju.`)
                        return;

                    } else if (message.toLowerCase().startsWith('+rep')) {
                        client.say(channel, `/me ` + `Serio?`)
                        return;
                    }

                } else if (!chatters.includes(argument.toLowerCase()) && !activeUsersLast15min.includes(argument.toLowerCase())) {

                    client.say(channel, `/me ` + `@${userstate['display-name']}, zła nazwa lub ta osoba ma jeszcze spawn protection!`)
                    return;

                } else {
                    if (!(whiteList.includes(argument.toLowerCase())) || message.toLowerCase().startsWith(`+rep`)) {

                        if (!argument) {
                            client.say(channel, `/me ` + `Oznacz osobę, której chcesz dać rep.`)
                            return;

                        } else if (bannedAtm.includes(argument.toLowerCase())) {

                            client.say(channel, `/me ` + `Ta osoba jest jeszcze w gułagu.`)
                            return;

                        } else if ((message.toLowerCase().startsWith('-rep')) && votedMinus.includes(userstate['display-name'] + ':' + argument.toLowerCase())) {

                            client.say(channel, `/me ` + `Ta osoba otrzymała już -rep od ciebie.`)
                            return;

                        } else if ((message.toLowerCase().startsWith('+rep')) && votedPlus.includes(userstate['display-name'] + ':' + argument.toLowerCase())) {

                            client.say(channel, `/me ` + `Ta osoba otrzymała już +rep od ciebie.`)
                            return;

                        } else if (argument) {

                            if (argument.toLowerCase().startsWith('@itz') || argument.toLowerCase().startsWith('itz')) {
                                neededReps = 8;
                            } else {
                                neededReps = 6;
                            }
                            if (message.toLowerCase().startsWith('-rep')) {
                                votedMinus.push(userstate['display-name'] + ':' + argument.toLowerCase())
                                Repped.push(argument.toLowerCase())

                            } else if ((message.toLowerCase().startsWith('+rep')) && (!Repped.includes(argument.toLowerCase()))) {
                                let r = plusReps[Math.floor(Math.random() * plusReps.length)]
                                client.say(channel, `/me ` + `@${userstate['display-name']}` + r + `@${argument}!`)
                                return;

                            } else if (message.toLowerCase().startsWith('+rep')) {
                                votedPlus.push(userstate['display-name'] + ':' + argument.toLowerCase())
                                Repped.pop()
                            }

                            let reps = 0;

                            if (message.toLowerCase().startsWith('-rep')) {

                                for (let i = 0; i < Repped.length; i++) {
                                    if (Repped[i] === argument.toLowerCase())
                                        reps++;
                                }
                            } else if (message.toLowerCase().startsWith('+rep')) {
                                for (let i = 0; i < Repped.length; i++) {
                                    if (Repped[i] === argument.toLowerCase())
                                        reps++;
                                }
                            }

                            client.say(channel, `/me ` + `${userstate['display-name']} daje -rep ${argument}. (${reps}/${neededReps})`)

                            if (reps >= neededReps) {
                                let randomTime = Math.floor(Math.random() * 1500) + 300
                                let randomTimeMin = randomTime / 60

                                //client.say(channel, `/me ` + `/timeout ${argument} ${randomTime}`)
                                TimeoutUser(argument.toLowerCase(), randomTime)

                                client.say(channel, `/me ` + `${argument} idzie do gułagu na ${randomTimeMin.toFixed(0)} minut! Zachowuj się lepiej next time Kappa`)

                                let index = Repped.indexOf(argument.toLowerCase())
                                if (index > -1) {
                                    Repped.splice(index, neededReps);
                                }

                                bannedAtm.push(argument.toLowerCase())

                                let randomFixedTime = randomTime * 1000

                                setTimeout(() => {
                                    bannedAtm.shift();
                                }, randomFixedTime)
                            }
                        }


                    } else if (whiteList.includes(argument.toLowerCase()) && message.toLowerCase().startsWith(`-rep`)) {
                        client.say(channel, `/me ` + `Ten człowiek ma immunitet`)
                    }
                }

            } catch (error) {
                console.error(error);
            }
        })();
    }
});


// !gamble
let stawka = 3
let gambleBlockade = true;
let gambleBlockade2 = true;
let gambleList = [];

client.on('message', (channel, userstate, message, self) => {
    if (self) return;

    if (gambleBlockade && gambleBlockade2) {
        let r = Math.floor(Math.random() * 2500000) + 1200000
        setTimeout(timeout, r)

        function timeout() {
            gambleBlockade = false;
        }
        gambleBlockade2 = false;

    } else if (!gambleBlockade) {

        if ((message == '!to') && !(gambleList.includes(userstate['display-name']))) {

            if (userstate.mod) {
                client.say(channel, `/me ` + `Chcesz wziąć udział to się unmodnij cwaniaczku Madge`)

            } else {
                gambleList.push(userstate['display-name'])
            }

            if (gambleList.length == 1) {
                client.say(channel, `/me ` + `${userstate['display-name']} otwiera zapisy na t/o! Zaczynamy licytację od ${stawka} min, a za każdego kto dołączy czas rośnie x2!`)

            } else if (gambleList.length == 2) {
                stawka = 6;
                client.say(channel, `/me ` + `Do losowania dołącza ${userstate['display-name']}! Walczą o timeouta na ${stawka} min! W zabawie biorą udział: ${gambleList.join(', ')}`)
            } else if (gambleList.length >= 3) {
                stawka = stawka * 2;
                client.say(channel, `/me ` + `Stawka rośnie! Do zabawy dołącza ${userstate['display-name']} i walczą o ${stawka} min! W zabawie biorą udział: ${gambleList.join(', ')}`)
            }
        }

        if ((userstate.mod || userstate.username == 'itzmaxinho') && (message == '!win')) {
            let r = gambleList[Math.floor(Math.random() * gambleList.length)]
            let finalStawka = stawka * 60

            client.say(channel, `/me ` + `Timeouta na ${stawka} min dostaje... ${r}!!! Neaura! KEKW`)
            // client.say(channel, `/me ` + `/timeout ${r} ${finalStawka}`)
            TimeoutUser(r.toLowerCase(), finalStawka)

            stawka = 3;
            gambleList = [];
            gambleBlockade = true;
            gambleBlockade2 = true;
        }
    }
})


//!co
let timeoutCO;
let listCO = [
    `jajco KEKW`,
    `chyba się przesłyszał whatBlink przez`,
    `nie wierzy WeirdChamping w`,
    `zrobił oKurwa widząc`,
    `najchętniej by tenseSmash przez`,
    `chce SpoopyPls z`,
    `chętnie by POGGERS przykjurwił`,
    `pluje PepeSpit na`,
    `pokazuje peepoFinger w stronę`,
    `chce zlać peepoSmash`,
    `zabierał kanapki peepoSmash należące do`,
    `podglądał przez okno`,
    `najebałby się z`,
    `najlepiej matchuje się z`,
    `grał w pokera z ojcem`,
    `sprawdza czujność`,
    `wymyśla jakim zwierzęciem po reinkarnacji byłby`,
    `straszy WOMANDETECTED użytkownika`,
    `poszedł za kratki peepoJail przez`,
    `poszedłby na ryby OOOO z`,
    `poddaje każdy mecz 2s justFF z`,
    `zrobiłby cosplay Milk z`,
    `nie czai whot o chuj chodzi`,
    `nie może już słuchać muted widza`,
    `wyczyściłby CLEAN berło`,
    `myśli, że peepoRich biedakiem jest`,
    `czeka na bana monkaBAN od`,
    `chodzi na patrol POLICE WEEWOO z`,
    `podpisał kontrakt boxdelPls na walkę z`,
    `<===|IQ|=========>`,
    `<===========|IQ|=>`,
    `<========|SKILL|======>`,
    `<=|SKILL|=============>`,
    `trzyma w piwnicy`,
    `wygrałby w kamień papież z`,
    `ma chrapkę na`,
    `umówiłby się na piwo z`,
    `ma jakieś ciekawe wspomnienie z`,
    `nosi w portfelu zdjęcie`,
];

client.on('message', (channel, userstate, message, self) => {
    if (self || blockadeGlobal) return;

    if (message.toLowerCase() == '!co') {
        let losoweCO = listCO[Math.floor(Math.random() * listCO.length)];

        if (timeoutCO == true) {
            return;

        } else if (losoweCO == listCO[0]) {
            client.say(channel, `/me ` + ` @${userstate['display-name']} jajco KEKW`);

        } else {

            (async () => {
                try {
                    chatters = await getChatters();
                    console.log(chatters);

                    let losowyUzytkownik = chatters[Math.floor(Math.random() * chatters.length)];
                    let losowyUzytkownik2 = chatters[Math.floor(Math.random() * chatters.length)];

                    client.say(channel, `/me ` + `${losowyUzytkownik} ${losoweCO} ${losowyUzytkownik2}`);

                } catch (error) {
                    console.error(error);
                }
            })();
        }

        timeoutCO = true;
        let timeoutCOID = setInterval(timeout, 60000)

        function timeout() {
            timeoutCO = false;
            clearInterval(timeoutCOID)
        }
    }

});


// !CZY
let timeoutCZY;
let listTN = [
    `Tak.`,
    `Nie.`,
    `Jeszcze jak!`,
    `Nigdy w życiu!`,
    `Proste, że tak.`,
];

let listEmoji = [
    `KEKW`,
    `Kappa`,
];

client.on('message', (channel, userstate, message, self) => {
    if (self || blockadeGlobal) return;

    if (message.toLowerCase() === '!czy') {
        if (timeoutCZY == true) {
            return;
        } else {

            (async () => {
                try {
                    chatters = await getChatters();
                    console.log(chatters);

                    let losowyUzytkownik = chatters[Math.floor(Math.random() * chatters.length)];
                    let losowyUzytkownik2 = chatters[Math.floor(Math.random() * chatters.length)];
                    let listCZY = [
                        `zakręciłby fiflakiem ${losowyUzytkownik2} SALAMI `,
                        `i ${losowyUzytkownik2} to idealna para SALAMI `,
                        `jest Maćkiem`,
                        `ma chłopaka`,
                        `ma więcej niż 12 lat`,
                        `ma dostać timeout na 5 min`,
                        `sra do gara`,
                        `sypia z twoją mamą YOURMOM `,
                        `do reszty pojebało`,
                        `łapie bąki do słoika`,
                        `lubi chlać pod lidlem`,
                        `ma więcej niż 12 iq`,
                        `brał dziś leki`,
                        `się odkleił`,
                        `wypadł z rąk położnej`,
                        `to pawi skręt`,
                        `dorabia na grzybach`,
                        `stary gra na flecie peepoFlute `,
                        `sprzedaje kolege na komendzie peepoJail `,
                        `ściąga gacie dla ruskich`,
                        `orze jak może`,
                        `oddawał kanpaki w szkole starszym`,
                        `powinien dotknąć trawy`,
                        `wydałby ostatnie pieniądze na alkohol`,
                        `wydałby ostatnie pieniądze na jaranie`,
                        `ma pajęczyny na kierunkowskazach`,
                        `umie zrobić flip reset kompa tenseSmash `,
                        `nigdy nie ćwiczył na wfie`,
                        `miał zagrożenie z religii`,
                        `jest hardcorem i jeździ reworem`,
                        `podpisałby kontrakt na walkę w FAME MMMA z ${losowyUzytkownik2}`,
                        `ma za mało testosteronu`,
                        `uważa, że ziemia jest płaska jak Żaneta spod piątki`,
                        `codziennie tasuje dżordża forsenCoomer `,
                        `ZA DUŻO PISZE CAPSEM`,
                        `boi się ciemności`,
                        `chleje przed dwunastą`,
                        `ma haluksy`,
                        `uważa, że ${losowyUzytkownik2} dawno się nie udzielał na czacie`,
                        `zajebał mydło z austrii`,
                        `potyka się o własne nogi`,
                        `uważa, że @BOT__Maciek jest najlepszy`,
                    ];
                    let losoweCZY = listCZY[Math.floor(Math.random() * listCZY.length)];
                    let losoweTN = listTN[Math.floor(Math.random() * listTN.length)];
                    let losoweEmoji = listEmoji[Math.floor(Math.random() * listEmoji.length)];

                    client.say(channel, `/me ` + `Czy... @${losowyUzytkownik} ${losoweCZY}? Eksperci twierdzą, że... ${losoweTN} ${losoweEmoji}`);

                } catch (error) {
                    console.error(error);
                }
            })();
        }
        timeoutCZY = true;
        let timeoutCZYID = setInterval(timeout, 60)

        function timeout() {
            timeoutCZY = false;
            clearInterval(timeoutCZYID)
        }
    }
});


// RANDOMOWE ODPOWIEDZI BOTA
let blockadeROB = false;
let blockROB = true;
let random4060;

client.on('message', (channel, userstate, message, self) => {
    if (self) return;

    if (blockadeROB) {
        return;

    } else if ((blockadeROB == false) && (!message.startsWith('!'))) {

        random4060 = Math.floor(Math.random() * 1600000) + 2000000

        blockadeROB = true;
        setTimeout(() => {
            blockadeROB = false;
        }, random4060)

        if (blockROB == true) {
            blockROB = false;
            return;

        } else {
            let botList = [
                `Chce się ktoś bić? !boks`,
                `Zastanawiałeś się jak poradziłbyś sobie podczas apokalipsy zombie? !zombie`,
                `Co tam @${userstate['display-name']}?`,
                `Ładna dziś pogoda prawda?`,
                `Śmierdzisz.`,
                `@${userstate['display-name']} tak było, nie zmyślasz.`,
                `Jak myślisz @${userstate['display-name']}, roboty przejmą kontrolę nad światem?`,
                `Miłego seansu @${userstate['display-name']} :D`,
                `Ta, a mi na ręcę cocktus wyrośnie.`,
                `My, boty, jesteśmy nadwyraz inteligentne.`,
                `Dziękuję za stworzenie mnie mistrzu @itzMaxinho.`,
                `@${userstate['display-name']} Myślisz, że moglibyśmy się polubić?`,
                `Zna ktoś rym do 'Google'?`,
                `Gra ktoś hoopsy na diamencie? Bo mi blackten do platyny spadł B(`,
                `Życzę ci miłego dnia @${userstate['display-name']} :)`,
                `catJAM`,
                `Ktoś jeszcze też jest tak głodny?`,
                `Sponsorem tego streamu jest nikt! LIKE`,
                `Ehh, ta robota mnie wykończy...`,
                `Twoja stara piła leży w piwnicy.`,
                `Wpisz !st @nick_kogoś_z_czatu, żeby sprawdzić się w speed typingu!`,
                `Chyba trzeba w końcu zainwestować w nowe podzespoły. Ale karty takie drogie...`,
                `Sprzedam 16GB RAM, pisać priv.`,
                `Any BAN enjoyers? Kappa`,
                `Zw, idę po popcorn.`,
                `Może powinienem pójść do Mam talent...`,
                `Cieszcie się póki możecie... Nędzni śmiertelnicy, haha!`,
                `Jaka była najśmieszniejsza rzecz jaka się wam zdarzyła w życiu?`,
                `Który moment na tym kanale był dla was wyjątkowy? Taki, który dobrze zapamiętaliście.`,
                `Opowie ktoś kawał?`,
                `Nazywam się Maciek, a ty? @${userstate['display-name']}`,
                `Chce ktoś timeout? Wystarczy mnie poprosić :)`,
                `Haj kłolyti gemplej.`,
                `Misiu, kurwa, chamuj się KEKW`,
                `@${userstate['display-name']}, napiszesz mi coś miłego?`,
                `Chcesz mnie o coś zapytać? Oznacz mnie i zadaj pytanie: @BOT__Maciek Czy...`,
            ];

            let randomAnswer;

            do {
                randomAnswer = botList[Math.floor(Math.random() * botList.length)];
            } while (((randomAnswer == botList[0]) && (blockadeBoks)) || ((randomAnswer == botList[1]) && (blockadeZombie)))


            setTimeout(() => {
                client.say(channel, `/me ` + randomAnswer)
            }, 3000);
        }
    }
});


// WRÓŻBITA MACIEJ
let blockadeWrozbita = false;
let timeoutBOT = false;
let botLimit = 0;
let botOverheat = false;
let answersList = [
    `Myślę, że tak.`,
    `Na 100%.`,
    `Jestem tego pewny w 69%`,
    `No kurwa proste.`,
    `Oczywiście.`,
    `Pytasz dzika czy sra w lesie`,
    `Na to pytanie nie mogę odpowiedzieć...`,
    `Na pewno nie.`,
    `Nieeee, no co ty.`,
    `Ni chuja.`,
    `Nie ma opcji.`,
    `Nic z tych rzeczy.`,
    `No kurwa proste. Że nie.`,
];

client.on('message', (channel, userstate, message, self) => {
    if (self) return;

    if (message.toLowerCase().startsWith('@bot__maciek czy')) {

        if (blockadeWrozbita == true) {
            return;

        } else {

            if (botLimit >= 4) {
                client.say(channel, `/me ` + `Daj odpocząć misiu, zmęczyłem się KEKW`)

                if (timeoutBOT == false) {
                    timeoutBOT = true;

                    setTimeout(() => {
                        botLimit = 0;
                        timeoutBOT = false;
                    }, 900000)
                }
            } else if (blockadeWrozbita == false) {

                let r = answersList[Math.floor(Math.random() * answersList.length)];
                client.say(channel, `/me ` + r)

                if (botOverheat) {
                    botLimit++;
                }

                blockadeWrozbita = true;
                setTimeout(() => {
                    blockadeWrozbita = false;
                }, 10000)
            }

            botOverheat = true;
            setTimeout(() => {
                botOverheat = false;
            }, 60000)
        }
    }
});


// komendy RL rocket league quick chat
let msgDelayCounter = 0;
let msgDelayOn = false;
let threeToZero = 3;
let qcBlockade = false;
let from3to0;
let resetAllDelay;

client.on('message', (channel, userstate, message, self) => {
    if (self) return;

    function imLost() {
        from3to0 = setTimeout(() => {
            threeToZero--;
            qcBlockade = true;

            if (threeToZero >= 1) {
                imLost()
            } else {
                threeToZero = 3;
                msgDelayCounter = 0;
                qcBlockade = false;
                clearTimeout(from3to0);
                clearTimeout(resetAllDelay);
            }
        }, 1300)
    }

    if (msgDelayCounter >= 3) {
        if (qcBlockade == false) {
            imLost();
            qcBlockade = true;
        }

    }

    else if (msgDelayOn) {
        msgDelayCounter++;
    }

    switch (message) {
        case `11`:

            if (!msgDelayOn) {
                msgDelayOn = true;

                setTimeout(() => {
                    msgDelayOn = false;
                }, 3000)

                resetAllDelay = setTimeout(() => {
                    msgDelayCounter = 0;
                }, 10000)
            }

            if (!qcBlockade && msgDelayCounter < 3) {
                client.say(channel, `/me ` + `I got it!`)
            } else {
                client.say(channel, `/me ` + `Chat disabled for ${threeToZero} second(s).`)
            }

            break;
        case `12`:

            if (!msgDelayOn) {
                msgDelayOn = true;

                setTimeout(() => {
                    msgDelayOn = false;
                }, 3000)

                resetAllDelay = setTimeout(() => {
                    msgDelayCounter = 0;
                }, 10000)
            }

            if (!qcBlockade && msgDelayCounter < 3) {
                client.say(channel, `/me ` + `Need boost!`)
            } else {
                client.say(channel, `/me ` + `Chat disabled for ${threeToZero} second(s).`)
            }

            break;
        case `13`:

            if (!msgDelayOn) {
                msgDelayOn = true;

                setTimeout(() => {
                    msgDelayOn = false;
                }, 3000)

                resetAllDelay = setTimeout(() => {
                    msgDelayCounter = 0;
                }, 10000)
            }

            if (!qcBlockade && msgDelayCounter < 3) {
                client.say(channel, `/me ` + `Take the shot!`)
            } else {
                client.say(channel, `/me ` + `Chat disabled for ${threeToZero} second(s).`)
            }

            break;
        case `14`:

            if (!msgDelayOn) {
                msgDelayOn = true;

                setTimeout(() => {
                    msgDelayOn = false;
                }, 3000)

                resetAllDelay = setTimeout(() => {
                    msgDelayCounter = 0;
                }, 10000)
            }

            if (!qcBlockade && msgDelayCounter < 3) {
                client.say(channel, `/me ` + `Defending...`)
            } else {
                client.say(channel, `/me ` + `Chat disabled for ${threeToZero} second(s).`)
            }

            break;
        case `21`:

            if (!msgDelayOn) {
                msgDelayOn = true;

                setTimeout(() => {
                    msgDelayOn = false;
                }, 3000)

                resetAllDelay = setTimeout(() => {
                    msgDelayCounter = 0;
                }, 10000)
            }

            if (!qcBlockade && msgDelayCounter < 3) {
                client.say(channel, `/me ` + `Nice shot!`)
            } else {
                client.say(channel, `/me ` + `Chat disabled for ${threeToZero} second(s).`)
            }

            break;
        case `22`:

            if (!msgDelayOn) {
                msgDelayOn = true;

                setTimeout(() => {
                    msgDelayOn = false;
                }, 3000)

                resetAllDelay = setTimeout(() => {
                    msgDelayCounter = 0;
                }, 10000)
            }

            if (!qcBlockade && msgDelayCounter < 3) {
                client.say(channel, `/me ` + `Great pass!`)
            } else {
                client.say(channel, `/me ` + `Chat disabled for ${threeToZero} second(s).`)
            }

            break;
        case `23`:

            if (!msgDelayOn) {
                msgDelayOn = true;

                setTimeout(() => {
                    msgDelayOn = false;
                }, 3000)

                resetAllDelay = setTimeout(() => {
                    msgDelayCounter = 0;
                }, 10000)
            }

            if (!qcBlockade && msgDelayCounter < 3) {
                client.say(channel, `/me ` + `Thanks!`)
            } else {
                client.say(channel, `/me ` + `Chat disabled for ${threeToZero} second(s).`)
            }

            break;
        case `24`:

            if (!msgDelayOn) {
                msgDelayOn = true;

                setTimeout(() => {
                    msgDelayOn = false;
                }, 3000)

                resetAllDelay = setTimeout(() => {
                    msgDelayCounter = 0;
                }, 10000)
            }

            if (!qcBlockade && msgDelayCounter < 3) {
                client.say(channel, `/me ` + `What a save!`)
            } else {
                client.say(channel, `/me ` + `Chat disabled for ${threeToZero} second(s).`)
            }

            break;
        case `31`:

            if (!msgDelayOn) {
                msgDelayOn = true;

                setTimeout(() => {
                    msgDelayOn = false;
                }, 3000)

                resetAllDelay = setTimeout(() => {
                    msgDelayCounter = 0;
                }, 10000)
            }

            if (!qcBlockade && msgDelayCounter < 3) {
                client.say(channel, `/me ` + `OMG!`)
            } else {
                client.say(channel, `/me ` + `Chat disabled for ${threeToZero} second(s).`)
            }

            break;
        case `32`:

            if (!msgDelayOn) {
                msgDelayOn = true;

                setTimeout(() => {
                    msgDelayOn = false;
                }, 3000)

                resetAllDelay = setTimeout(() => {
                    msgDelayCounter = 0;
                }, 10000)
            }

            if (!qcBlockade && msgDelayCounter < 3) {
                client.say(channel, `/me ` + `Noooo!`)
                client.say(channel, `/me ` + `Chat disabled for ${threeToZero} second(s).`)
            }

            break;
        case `33`:

            if (!msgDelayOn) {
                msgDelayOn = true;

                setTimeout(() => {
                    msgDelayOn = false;
                }, 3000)

                resetAllDelay = setTimeout(() => {
                    msgDelayCounter = 0;
                }, 10000)
            }

            if (!qcBlockade && msgDelayCounter < 3) {
                client.say(channel, `/me ` + `Wow!`)
            } else {
                client.say(channel, `/me ` + `Chat disabled for ${threeToZero} second(s).`)
            }

            break;
        case `34`:

            if (!msgDelayOn) {
                msgDelayOn = true;

                setTimeout(() => {
                    msgDelayOn = false;
                }, 3000)

                resetAllDelay = setTimeout(() => {
                    msgDelayCounter = 0;
                }, 10000)
            }

            if (!qcBlockade && msgDelayCounter < 3) {
                client.say(channel, `/me ` + `Close one!`)
            } else {
                client.say(channel, `/me ` + `Chat disabled for ${threeToZero} second(s).`)
            }

            break;
        case `41`:

            if (!msgDelayOn) {
                msgDelayOn = true;

                setTimeout(() => {
                    msgDelayOn = false;
                }, 3000)

                resetAllDelay = setTimeout(() => {
                    msgDelayCounter = 0;
                }, 10000)
            }

            if (!qcBlockade && msgDelayCounter < 3) {
                client.say(channel, `/me ` + `$#@%!`)
            } else {
                client.say(channel, `/me ` + `Chat disabled for ${threeToZero} second(s).`)
            }

            break;
        case `42`:

            if (!msgDelayOn) {
                msgDelayOn = true;

                setTimeout(() => {
                    msgDelayOn = false;
                }, 3000)

                resetAllDelay = setTimeout(() => {
                    msgDelayCounter = 0;
                }, 10000)
            }

            if (!qcBlockade && msgDelayCounter < 3) {
                client.say(channel, `/me ` + `No problem!`)
            } else {
                client.say(channel, `/me ` + `Chat disabled for ${threeToZero} second(s).`)
            }

            break;
        case `43`:

            if (!msgDelayOn) {
                msgDelayOn = true;

                setTimeout(() => {
                    msgDelayOn = false;
                }, 3000)

                resetAllDelay = setTimeout(() => {
                    msgDelayCounter = 0;
                }, 10000)
            }

            if (!qcBlockade && msgDelayCounter < 3) {
                client.say(channel, `/me ` + `Whoops...`)
            } else {
                client.say(channel, `/me ` + `Chat disabled for ${threeToZero} second(s).`)
            }

            break;
        case `44`:

            if (!msgDelayOn) {
                msgDelayOn = true;

                setTimeout(() => {
                    msgDelayOn = false;
                }, 3000)

                resetAllDelay = setTimeout(() => {
                    msgDelayCounter = 0;
                }, 10000)
            }

            if (!qcBlockade && msgDelayCounter < 3) {
                client.say(channel, `/me ` + `Sorry!`)
            } else {
                client.say(channel, `/me ` + `Chat disabled for ${threeToZero} second(s).`)
            }

            break;
        case `51`:

            if (!msgDelayOn) {
                msgDelayOn = true;

                setTimeout(() => {
                    msgDelayOn = false;
                }, 3000)

                resetAllDelay = setTimeout(() => {
                    msgDelayCounter = 0;
                }, 10000)
            }

            if (!qcBlockade && msgDelayCounter < 3) {
                client.say(channel, `/me ` + `This is Rocket League!`)
            } else {
                client.say(channel, `/me ` + `Chat disabled for ${threeToZero} second(s).`)
            }

            break;
    }

});


// !zombie
let blockadeZombie = false;
let r;

client.on('message', (channel, userstate, message, self) => {
    if (self) return;

    if (blockadeZombie == true) {
        return;

    } else {

        if (message.toLowerCase() == '!zombie') {

            let r0 = Math.floor(Math.random() * 101)

            if (r0 >= 20) {

                r = Math.floor(Math.random() * 8000000000)

            } else if (r0 >= 10) {

                r = Math.floor(Math.random() * 6000000)

            } else if (r0 >= 5) {

                r = Math.floor(Math.random() * 5000)

            } else if (r0 >= 2) {

                r = Math.floor(Math.random() * 200)

            } else if (r0 <= 1) {

                r = Math.floor(Math.random() * 10)
            }

            let zombie = r.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");

            client.say(channel, `/me ` + `@${userstate['display-name']}, jeśli wybuchłaby apokalipsa zombie to byłbyś ${zombie}. zarażonym!`)

            blockadeZombie = true;
            setTimeout(() => {
                blockadeZombie = false;
            }, 600000)
        }
    }
});


// wordle !word !słowo
let blockadeWord = true;
let wordList = [
    'absurd',
    'akcyza',
    'anomia',
    'autyzm',
    'eponim',
    'fircyk',
    'goryle',
    'monizm',
    'papież',
    'patola',
    'skleić',
    'tantra',
    'alkohol',
    'aborcja',
    'balbina',
    'balejaż',
    'diagram',
    'erekcja',
    'eremita',
    'fekalia',
    'kafejka',
    'kaszana',
    'onanizm',
    'oszczep',
    'pchlarz',
    'psiocha',
    'sodomia',
    'swołocz',
    'szkuner',
    'trebusz',
    'zadupie',
    'zwyrole',
    'aparycja',
    'apoteoza',
    'arbitraż',
    'białoruś',
    'bimberek',
    'cycuszki',
    'dewiator',
    'dyskusja',
    'harpagon',
    'hemoroid',
    'insercja',
    'lewatywa',
    'podlasie',
    'robactwo',
    'sczeznąć',
    'skórzany',
    'spedytor',
    'sztafeta',
    'ulaństwo',
    'wiedźmin',
    'wywierty',
];
let explList = [
    'stan, sytuacja lub zachowanie, które jest sprzeczne z logiką, rozsądkiem lub zdrowym rozsądkiem.',
    'podatek od towarów luksusowych lub szkodliwych dla zdrowia lub środowiska.',
    'stan braku norm i reguł społecznych lub ich braku przestrzegania.',
    'spektrum zaburzeń rozwojowych (ASD) charakteryzujących się trudnościami w komunikacji i interakcji społecznej.',
    'słowo lub wyrażenie pochodzące od imienia osoby, która pierwotnie go wprowadziła lub związana jest z nim.',
    'człowiek niepoważny i lekkomyślny.',
    'czasem je raidujemy.',
    'filozoficzne przekonanie, że istnieje tylko jeden rodzaj rzeczywistości, a wszystko inne jest pochodną lub aspektem tej jedynej rzeczywistości.',
    '2137',
    'nauka o chorobach i schorzeniach.',
    'pizde.',
    'system filozoficzny i duchowy, który pochodzi z Indii i jest szczególnie związany z hinduizmem i buddyzmem.',
    'dar od Boga.',
    'medyczne pojęcie, oznacza przerwanie ciąży.',
    'taki pchlarz.',
    'technika fryzjerska polegająca na farbowaniu włosów w różnych kolorach, tak aby uzyskać efekt połączenia kilku odcieni.',
    'graficzne przedstawienie informacji, które pozwala na lepsze zrozumienie danego zagadnienia lub procesu.',
    'stan, w którym penis staje się twardy i nabrzmiały, dzięki przepływowi krwi do ciał jamistych.',
    'osoba, która żyje w samotności, oddzielona od społeczeństwa, zazwyczaj z powodów religijnych lub duchowych.',
    'inaczej odchody.',
    'miejsce, gdzie można kupić i spożywać kawę, herbatę oraz inne napoje.',
    'inaczej lipa.',
    'inaczej autoerotyka, to forma seksualnego zaspokajania się, polegająca na samodzielnym dokonywaniu stosunku przy użyciu rąk lub przedmiotów.',
    'proste, długie i cienkie narzędzie, które jest używane do rzucania.',
    'Balbina to pchlarz.',
    'potrawa kuchni lubelskiej. Robi się ją z ugotowanych ziemniaków i zaparzonej mąki.',
    'termin prawny oznaczający stosunki seksualne między osobami tej samej płci lub między człowiekiem a zwierzęciem.',
    'pogardliwe określenie osób postępujących nieuczciwie lub budzących odrazę swoim zachowaniem lub wyglądem.',
    'rodzaj jachtu lub żaglowca, który ma dwa maszty i jest napędzany żaglami.',
    'rodzaj maszyny do oblężenia zamków lub miast, która została wynaleziona w średniowieczu.',
    'takie zadupie w polszy.',
    'inaczej: zwyrodnialce. Zdegenerowani, zdolni do potwornych, okrutnych zachowań.',
    'pojęcie, które odnosi się do pojawienia się, przybycia lub pojawienia się czegoś lub kogoś.',
    'wychwalanie kogoś lub czegoś; patetyczny utwór będący wyrazem takiej pochwały.',
    'proces rozstrzygania sporów lub rozwiązywania konfliktów przez osoby trzecie.',
    'jedyne państwo bez litery "A" XDDD',
    'domowy alkohol, który jest produkowany przez fermentację i destylację zacierów zbożowych, owoców lub innych składników.',
    'slangowe określenie piersi kobiety.',
    'osoba, która odchodzi od norm, standardów lub przyjętych zasad.',
    'rozmowa, w której uczestnicy wymieniają swoje opinie, argumenty i poglądy na dany temat.',
    'skąpiec. Termin zaczerpnięty od imienia bohatera jednej z najbardziej znanych komedii Moliera.',
    'guzk lub zgrubienie w obrębie odbytu lub odbytnicy, które powstają w wyniku nadciśnienia w żyłach odbytu.',
    'medyczne pojęcie, które oznacza umieszczanie czegoś w jakimś miejscu.',
    'medyczny zabieg polegający na wprowadzeniu do jelita cieczy (zwykle woda lub roztwór soli) przez odbyt.',
    'zadupie.',
    'nazwa ogólna dla różnych gatunków owadów, robaków lub innych stawonogów, które są uważane za szkodniki.',
    'stać się mniejszym, słabszym lub przestać istnieć.',
    'określenie dla rzeczy, która jest wykonana z skóry zwierzęcej.',
    'osoba lub firma, która zajmuje się organizowaniem transportu towarów dla innych firm lub osób.',
    'sportowy wyścig, w którym zawodnicy zmieniają się na trasie przebiegu.',
    'termin, który był używany w XIX wieku na oznaczenie mieszkańców Karkonoszy, czyli Karkonoszy i Kotliny Jeleniogórskiej. KEKW',
    'zawodowy zabójca potworów, który posiada nadprzyrodzone zdolności i jest przeszkolony w różnych sztukach walki.',
    'proces polegający na wykonywaniu otworu w ziemi, skale lub innym materiałach za pomocą specjalnie przeznaczonego do tego celu narzędzia - wywiercarki.',
];
let explanation;
let indexExplanation;
let extraWordList = [];
let randomWord;
let currentWord = [];
dbplayers.word = []
let allWords = [...dbeightletterwords, ...dbsevenletterwords, ...dbsixletterwords, ...wordList]


client.on('message', (channel, userstate, message, self) => {
    if (self) return;

    if ((blockadeWord == true) && (userstate.mod || userstate.username === 'itzmaxinho') && (message.toLowerCase() === '!word' || message.toLowerCase() === '!slowo' || message.toLowerCase() === '!słowo')) {
        blockadeWord = false;

        randomWord = wordList[Math.floor(Math.random() * wordList.length)];
        console.log(randomWord)

        indexExplanation = wordList.indexOf(randomWord);
        explanation = explList[indexExplanation]

        if (randomWord.length == 6) {
            currentWord = ['_', '_', '_', '_', '_', '_']
            client.say(channel, `/me ` + `Odgadnij słowo(6), by wygrać: ${currentWord.join(' ')}`);

        } else if (randomWord.length == 7) {
            currentWord = ['_', '_', '_', '_', '_', '_', '_']
            client.say(channel, `/me ` + `Odgadnij słowo(7), by wygrać: ${currentWord.join(' ')}`);

        } else if (randomWord.length == 8) {
            currentWord = ['_', '_', '_', '_', '_', '_', '_', '_']
            client.say(channel, `/me ` + `Odgadnij słowo(8), by wygrać: ${currentWord.join(' ')}`);
        }
    }

    if (blockadeWord == true || self || message.match(/(.)\1{2,}/g) || message.match(/[^\wąęóźżćśłń]/g) || message.match(/\d/g)) {
        return;

    } else if (message.length == randomWord.length && allWords.includes(message.toLowerCase())) {

        let randomID = uuidV4();
        function deleteFromDB() {
            dbplayers.word = dbplayers.word.filter(function (el) {
                return el.id !== randomID;
            });
            console.log(`USUWANIE GRACZA Z DB: ${userstate['display-name']}`)
            console.log(dbplayers.word)
        }

        if (!Boolean(dbplayers.word.filter(gracz => gracz.username == userstate.username).length)) {
            console.log(`DODANIE GRACZA DO DB: ${userstate['display-name']}`)
            dbplayers.word.push({
                id: randomID,
                username: userstate.username
            })

            setTimeout(deleteFromDB, 10000)

        } else
            return;

        let splittedWord = randomWord.split("");

        if (message.toLowerCase().length == splittedWord.length) {
            let splittedMessage = message.toLowerCase().split("");

            if (message.toLowerCase() === randomWord) {
                client.say(channel, `/me ` + `@${userstate['display-name']}, gratulacje! Wygrywasz!`);
                client.say(channel, `/me ` + `Hasłem było: ${randomWord.toUpperCase()} - ${explanation}`)
                currentWord = [];
                extraWordList = [];
                blockadeWord = true;

            } else {

                for (let i = 0; i < splittedMessage.length; i++) {

                    if (splittedWord.includes(splittedMessage[i].toLowerCase()) && (splittedMessage[i].toLowerCase() != splittedWord[i].toLowerCase())) {

                        if (i) {

                            CounterChecker()
                        }
                    }

                    if (splittedMessage[i] == splittedWord[i]) {

                        if (i) {

                            Splicing()
                        }

                        function Splicing() {

                            currentWord[i] = splittedMessage[i].toUpperCase();

                            const indexExtraWordList = extraWordList.indexOf(splittedMessage[i].toLowerCase());
                            if (indexExtraWordList > -1) {
                                extraWordList.splice(indexExtraWordList, 1);
                            }
                        }
                    }

                    function CounterChecker() {
                        let countMsg = 0;
                        let countWord = 0;
                        let countCurrent = 0;

                        splittedMessage.forEach(element => {
                            if (element == splittedMessage[i].toUpperCase()) {
                                countMsg += 1;
                            }
                        });

                        splittedWord.forEach(element => {
                            if (element == splittedMessage[i].toUpperCase()) {
                                countWord += 1;
                            }
                        });

                        currentWord.forEach(element => {
                            if (element == splittedMessage[i].toUpperCase()) {
                                countCurrent += 1;
                            }
                        });

                        if (!extraWordList.includes(splittedMessage[i].toLowerCase()) && countWord >= countMsg > countCurrent) {
                            extraWordList.push(splittedMessage[i].toLowerCase())
                        }
                    }
                }

                if (extraWordList.length == 0) {
                    client.say(channel, `/me ` + `@${userstate['display-name']}, ${currentWord.join(' ')}`);

                } else {
                    client.say(channel, `/me ` + `@${userstate['display-name']}, ${currentWord.join(' ')} / Dobre litery na złym miejscu: ${extraWordList.join(', ')}`)
                }
            }
        }
    }

    fs.writeFile("./dbplayers.json", JSON.stringify(dbplayers), (err) => {
        if (err) console.log(err);
    });
}
);


// !winner
let activeUsersLast15min = [];
let usersWinner = [];
let timersActive = {};
let timersWinner = {};

client.on('message', (channel, userstate, message, self) => {

    function handleChat(username) {
        if (!usersWinner.includes(username)) {
            usersWinner.push(username);
        }

        if (timersWinner[username]) {
            clearTimeout(timersWinner[username]);
        }

        timersWinner[username] = setTimeout(() => {
            usersWinner.splice(usersWinner.indexOf(username), 1);
            delete timersWinner[username];
        }, 900000);
    }

    function activeUsers(username) {
        if (!activeUsersLast15min.includes(username)) {
            activeUsersLast15min.push(username);
        }

        if (timersActive[username]) {
            clearTimeout(timersActive[username]);
        }

        timersActive[username] = setTimeout(() => {
            activeUsersLast15min.splice(activeUsersLast15min.indexOf(username), 1);
            delete timersActive[username];
        }, 900000);
    }

    handleChat(userstate['display-name'])
    activeUsers(userstate.username)

    if (message.toLowerCase() === "!winner" && (userstate.mod || userstate.username === "itzmaxinho")) {

        let allParticipants = usersWinner.length;
        let chanceOfWinning = (1 / allParticipants) * 100;
        let randomWinner = usersWinner[Math.floor(Math.random() * usersWinner.length)]

        if (allParticipants < 1) {
            client.say(channel, `/me ` + `error`)
        } else if (userstate.mod && randomWinner == "itzMaxinho") {
            client.say(channel, `/me ` + `Wylosowana osoba to... (Szansa wynosiła ${chanceOfWinning.toFixed(1)}%)`)
            setTimeout(() => {
                client.say(channel, `/me ` + `!!! PowerUpL ${randomWinner} PowerUpR !!!`)
            }, 2000);
            setTimeout(() => {
                let list = [`oj KEKW chyba wylatujesz KEKW`,
                    `instant karma misiu KEKW wydupiaj KEKW`,
                    `Pięknie, kurwa, pięknie KEKW`]
                let r = list[Math.floor(Math.random() * list.length)]

                client.say(channel, `/me ` + r)
            }, 4000);
        } else {
            client.say(channel, `/me ` + `Wylosowana osoba to... (Szansa wynosiła ${chanceOfWinning.toFixed(1)}%)`)
            setTimeout(() => {
                client.say(channel, `/me ` + `!!! PowerUpL ${randomWinner} PowerUpR !!!`)
            }, 2000);
        }
    }
});


// !giveaway
let giveawayArray = [];

client.on('message', (channel, userstate, message, self) => {
    if (self) return;

    if (userstate.mod || userstate.username === 'itzmaxinho') {

        if (message.toLowerCase() === '!newgiveaway' || message.toLowerCase() === '!ng') {
            giveawayArray = [];
        }

        if (message.toLowerCase() === '!wingiveaway' || message.toLowerCase() === '!wg') {

            if (giveawayArray.length == 0) {
                client.say(channel, `/me ` + `Aktualnie nikt nie bierze udziału w losowaniu.`)
            } else {
                let r = giveawayArray[Math.floor(Math.random() * giveawayArray.length)]

                client.say(channel, `/me ` + `Wylosowana osoba to... ${r} !!!`)

                const index = giveawayArray.indexOf(r);
                if (index > -1) {
                    giveawayArray.splice(index, 1);
                }
            }
        }
    }

    if (message.toLowerCase() === '!join') {

        if (giveawayArray.includes(userstate['display-name'])) {
            client.say(channel, `/me ` + `Jesteś już zapisany macieju.`)

        } else if (!giveawayArray.includes(userstate['display-name'])) {

            giveawayArray.push(userstate['display-name'])
        }
    }
});


// !bits
client.on('cheer', (channel, userstate, message) => {

    console.log(userstate)

    if (userstate['user-id'] == 131390717) {

        client.say(channel, `/me ` + `A-HA! @${userstate['display-name']} rozkręca machinę! SSSsss`)

    } else {

        if (userstate.bits < 100) {
            client.say(channel, `/me ` + `<3`)

        } else if (userstate.bits < 1000) {
            client.say(channel, `/me ` + `CurseLit <3 <3 <3 CurseLit`)

        } else if (userstate.bits < 10000) {
            client.say(channel, `/me ` + `PowerUpL <3 <3 @${userstate['display-name']} <3 <3 PowerUpR`)

        } else if (userstate.bits < 20000) {
            client.say(channel, `/me ` + `TwitchSings @${userstate['display-name']} TwitchSings`)
        }
    }
})


// !bet
let betList = [];
let betBlockade = true;

client.on('message', (channel, userstate, message, self) => {
    if (self) return;

    if ((userstate.mod || userstate.username === 'itzmaxinho') && (message.toLowerCase() === '!open bets' || message.toLowerCase() === '!openbets')) {
        betBlockade = false;

        client.say(channel, `/me ` + `Bety otwarte. Wpisz: !bet {liczba}`)

    } else if ((userstate.mod || userstate.username === 'itzmaxinho') && (message.toLowerCase() === '!close bets' || message.toLowerCase() === '!closebets')) {
        betBlockade = true;

        client.say(channel, `/me ` + `Bety zamknięte.`)
    }

    if ((userstate.mod || userstate.username === 'itzmaxinho') && message.toLowerCase() === '!bets?') {

        client.say(channel, `/me ` + `${betList.join(', ')}`)
        return;

    } else if ((userstate.mod || userstate.username === 'itzmaxinho') && (message.toLowerCase() === '!bets clear' || message.toLowerCase() === '!betsclear')) {

        betList = [];
        return;
    }


    if (!betBlockade) {

        if (message.toLowerCase().startsWith('!bet')) {

            let [raw, command, argument] = message.match(regexpCommands);

            if (argument > 9999 || isNaN(argument)) {

                client.say(channel, `/me ` + `Nieprawidłowa liczba.`)
                return;
            }

            if (!isValueIncludedOnceInText(betList, userstate['display-name']) && command == 'bet' && argument) {

                betList.push(userstate['display-name'] + ': ' + argument)

                client.say(channel, `/me ` + `Good luck!`)

            } else if (isValueIncludedOnceInText(betList, userstate['display-name']) && command == 'bet' && argument) {

                client.say(channel, `/me ` + `Możesz postawić tylko raz.`)
            }
        }
    }

    if ((userstate.mod || userstate.username == 'itzmaxinho') && (message.toLowerCase().startsWith('!betwin') || message.toLowerCase().startsWith('!bet win'))) {

        let [raw, command, argument] = message.match(regexpCommands);

        let wynik = findClosestValueAfterCharacter(betList, argument)

        client.say(channel, `/me ` + `Wygrywa... @${wynik.textBefore} stawiając na: ${wynik.valueAsNumber}!`)

    } else if ((userstate.mod || userstate.username == 'itzmaxinho') && (message.toLowerCase().startsWith('!betwin') || message.toLowerCase().startsWith('!bet win')) && betList.length == 0) {
        client.say(channel, `/me ` + `Nikt jescze nie postawił.`)
    }

    function findClosestValueAfterCharacter(arr, target) {
        let closestValue = Number.MAX_VALUE;
        let closestElement = '';
        for (let i = 0; i < arr.length; i++) {
            const element = arr[i];
            const value = parseFloat(element.split(': ')[1]);
            if (value) {
                const difference = Math.abs(value - target);
                if (difference < Math.abs(closestValue - target)) {
                    closestValue = value;
                    closestElement = element;
                }
            }
        }
        const [textBefore, valueAsNumber] = closestElement.split(': ');
        return { textBefore, valueAsNumber: parseFloat(valueAsNumber) };
    }

    function isValueIncludedOnceInText(arr, value) {
        let count = 0;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].includes(value)) {
                count++;
            }
        }
        return count === 1;
    }
});


// !taczki
let blockadeTaczki = false;
let taczkiList = [
    `Streamerowi się ulało już `,
    `Gruzini jadą z taczkami już `,
    `Ojooj coś tam się zrespiło już `,
]

client.on('message', (channel, userstate, message, self) => {
    if (self || blockadeGlobal) return;

    if (blockadeTaczki) {
        return;

    } else {

        if (message.toLowerCase().startsWith('!taczki')) {

            const counter = dbcommands.taczki.map(taczka => taczka.counter);
            dbcommands.taczki = dbcommands.taczki.map(taczki => {

                return taczki = ({
                    counter: taczki.counter + 1,
                })
            })

            let r = taczkiList[Math.floor(Math.random() * taczkiList.length)]
            console.log(counter)
            console.log(r)

            client.say(channel, `/me ` + r + counter + ' raz. KEKW')

            fs.writeFile("./dbcommands.json", JSON.stringify(dbcommands), (err) => {
                if (err) console.log(err);
            });
        }

        blockadeTaczki = true;
        setTimeout(() => {
            blockadeTaczki = false;
        }, 3000)


    }
});


/*
// !BATTLE ROYALE IDEA TODO
let brPlayersList = [
    'itzoliffka',
    'itzmaxinho',
];
let brTimeoutedPlayers = [];
let brKillFeed = [];
let blockadeBR = false;//true;
let brCooldownTime = 10;
const users = {};

client.on('message', (channel, userstate, message, self) => {
    if (self) return;

    if (userstate.username === 'itzmaxinho' && (message.toLowerCase() === '!bropen' || message.toLowerCase() === '!br open')) {
        blockadeBR = false;
        client.say(channel, `/me ` + `Zapisy do Battle Royale otwarte! Zapisz się wpisując: !br`)
    }

    if (blockadeBR == false) {

        if (!brPlayersList.includes(userstate.username) && message.toLowerCase().startsWith('!br') && !userstate.mod) {
            brPlayersList.push(userstate.username)

        } else if (userstate.mod) {
            client.say(channel, `/me ` + `Najpierw się unmodnij x)`)
        }

        if (userstate.username === 'itzmaxinho' && (message.toLowerCase() === '!battle royale' || message.toLowerCase() === '!battleroyale')) {
            client.say(channel, `/me ` + `CurseLit  CurseLit  CurseLit`)
            client.say(channel, `/me ` + `ItsBoshyTime UWAGA ItsBoshyTime`)
            client.say(channel, `/me ` + `CurseLit  CurseLit  CurseLit`)
            setTimeout(() => {
                client.say(channel, `/me ` + `ZACZYNAMY BATTLE ROYALE !!!`)
            }, 2000)
            setTimeout(() => {
                client.say(channel, `/me ` + `Za 10 sekund będziecie mogli wpisywać komendy!`)
            }, 4000)
            setTimeout(() => {
                client.say(channel, `/me ` + `Wyrzucaj innych użytkowników za pomocą komendy: !kick @nickname`)
            }, 6000)
            setTimeout(() => {
                client.say(channel, `/me ` + `Ratuj wybrane osoby za pomocą komendy: !save @nickname`)
            }, 8000)
            setTimeout(() => {
                client.say(channel, `/me ` + `Masz na to tylko ${brCooldownTime} sekund, inaczej zostaną wyrzucone!`)
            }, 10000)
            setTimeout(() => {
                client.say(channel, `/me ` + `Ale uważaj... Po wpisaniu komendy, zostaniesz zablokowany na czacie na ${brCooldownTime} sekund...`)
            }, 12000)
            setTimeout(() => {
                client.say(channel, `/me ` + `W rozgrywce bierze udział ${brPlayersList.length} graczy!`)
            }, 14000)
        }

        handleChatMessage()
    }

    function handleChatMessage() {
        let [raw, command, targetUser] = message.match(regexpCommand2);
        console.log(targetUser)

        switch (command) {
            case 'kick':
                if (targetUser) {
                    const userId = targetUser.toLowerCase()
                    if (userId && brPlayersList.includes(userId)) {
                        client.say(channel, `/me ` + `${userstate.username} atakuje ${targetUser}!`);
                        // client.say(channel, `/me ` + `/timeout ${userstate.username} ${brCooldownTime}`)
                        TimeoutUser(userstate.username, brCooldownTime)
                        users[userId] = setTimeout(() => {
                            // client.say(channel, `/me ` + `/timeout ${userId} 600`);
                            TimeoutUser(userId, 600)
                            brTimeoutedPlayers.push(userId)
                            delete users[userId];
                        }, 10000);
                    }
                }
                break;

            case 'save':
                if (targetUser) {
                    const userId = targetUser.toLowerCase()
                    if (userId) {
                        clearTimeout(users[userId]);
                        delete users[userId];
                    }
                }
                break;

            default:
            // Do nothing
        }
    }

});
*/


// check clienid userid !mojeid
client.on('message', (channel, userstate, message, self) => {
    if (self || blockadeGlobal) return;

    if (message.toLowerCase() === '!mojeid' || message.toLowerCase() === '!moje id') {

        client.say(channel, `/me ` + `@${userstate['display-name']}, twoje ID na twitchu to: ${userstate['user-id']}`)
    };

    if (Boolean(db.saveID.filter(gracz => gracz.oldNickname == userstate.username).length)) {
        return;

    } else if (!Boolean(db.saveID.filter(gracz => gracz.id == userstate['user-id']).length)) {
        console.log(`DODANIE GRACZA DO DB: ${userstate['display-name']}`)

        db.saveID.push({
            displayName: userstate['display-name'],
            nickname: userstate.username,
            id: userstate['user-id']
        })

        fs.writeFile("./db.json", JSON.stringify(db), (err) => {
            if (err) console.log(err);
        });

    } else if (db.saveID.find(najpierwid => najpierwid.id == userstate['user-id'] && !db.saveID.find(teraznick => teraznick.nickname == userstate.username))) {

        setTimeout(() => {
            modifyObjectDBSaveID(userstate['user-id'], userstate.username)

            fs.writeFile("./db.json", JSON.stringify(db), (err) => {
                if (err) console.log(err);
            });
        }, 2000);

    } else if (db.saveID.filter(gracz => gracz.hasOwnProperty("displayName"))) {
        setTimeout(() => {
            addDisplayNameDBSaveID(userstate['user-id'], userstate['display-name'])

            fs.writeFile("./db.json", JSON.stringify(db), (err) => {
                if (err) console.log(err);
            });
        }, 2000);
    }


    function addDisplayNameDBSaveID(id, disName) {
        db.saveID = db.saveID.map(item => {
            if (item.id === id) {
                if (!item.displayName) {
                    if (!item.oldNickname) {

                        item = {
                            displayName: disName,
                            nickname: item.nickname,
                            id: item.id
                        };
                    } else if (item.oldNickname) {

                        item = {
                            displayName: disName,
                            nickname: item.nickname,
                            oldNickname: item.oldNickname,
                            id: item.id
                        };
                    }
                } else {
                    if (!item.oldNickname) {

                        item = {
                            displayName: disName,
                            nickname: item.nickname,
                            id: item.id
                        };
                    } else if (item.oldNickname) {

                        item = {
                            displayName: disName,
                            nickname: item.nickname,
                            oldNickname: item.oldNickname,
                            id: item.id
                        };
                    }
                }
            }
            return item;
        });
        return db;
    }

    function modifyObjectDBSaveID(id, name) {
        db.saveID = db.saveID.map(item => {
            if (item.id === id) {
                if (item.nickname !== name) {
                    console.log("UŻYTKOWNIK ZMIENIŁ NICKNAME!")
                    client.say(channel, `Oho... ktoś tu zmienił nickname... witamy z powrotem ${item.nickname} MLADY`)
                    const oldNickname = item.nickname;
                    item = {
                        displayName: item.displayName,
                        nickname: name,
                        oldNickname: oldNickname,
                        id: item.id
                    };
                }
            }
            return item;
        });
        addDisplayNameDBSaveID(userstate['user-id'], userstate['display-name'])
        return db;
    }
});


// vanish
client.on('message', (channel, userstate, message, self) => {
    if (self) return;

    if (message.toLowerCase() === '!vanish' || message.toLowerCase() === '!wanish' || message.toLowerCase() === '!wanisz' || message.toLowerCase() === '!vanisz') {
        TimeoutUser(userstate.username, 1)
    }
});


// !szept / whisper
client.on('message', (channel, userstate, message, self) => {
    if (message.toLowerCase() === '!szept') {
        WhisperUser(userstate.username, "co chcesz?")
    }
})


// !czarne historie
let buyer = [];
let czHisDB = [
    `Aplauz`,
    `Atak serca`,
    `Bąbel`,
    `Braki w edukacji`,
    `Celny strzał`,
    `Centrum handlowe`,
    `Cholesterol`,
    `Chrząszcz`,
    `Dramat`,
    `Drzwi`,
    `Dużo pieniędzy`,
    `Dziura w głowie`,
    `Gaszenie pragnienia`,
    `Guma`,
    `Kolano`,
    `Kot`,
    `Magnetofon`,
    `Menu`,
    `Morze`,
    `Niewidomy`,
    `Notatki`,
    `Okrutny szef`,
    `Paradoks`,
    `Piął się za wysoko`,
    `Pływaczka`,
    `Pod palmami`,
    `Pojednanie`,
    `Ponowne spotkanie`,
    `Pościg`,
    `Powolna śmierć`,
    `Przekleństwo`,
    `Rozbita szyba`,
    `Rozmowa telefoniczna`,
    `Skok`,
    `Skrót`,
    `Słuchawka telefoniczna`,
    `Starsza Pani`,
    `Strzelanina`,
    `Śmierć za naciśnięciem guzika`,
    `Śmiertelne łakomstwo`,
    `Świeże powietrze`,
    `Transport`,
    `Winda`,
    `W pełni sił`,
    `Wypadki chodzą po ludziach`,
    `Zabójczo mądry`,
    `Zabójczy gag na przyjęciu`,
    `Zamrożona`,
    `Zbawienna woda`,
    `Zmartwychwstanie`,
    // `Sadystyczne trociny`,
    // `Golas`,
    // `Zabójczy posiłek`,
    // `Zrozpaczony kierowca`,
    // `Dwóch martwych mężczyzn`,
    // `Zaginiona babcia`,
    // `Drzemka`,
    // `Niezauważone morderstwo`,
    // `Śmiertelna cisza`,
    // `Tunel do wieczności`,
    // `Zapomniane narzędzie zbrodni`,
    // `Dziwny ubiór`,
    // `O krok od katastrofy`,
    // `Krok w tył`,
    // `Przeklęte wakacje`,
    // `Nowe buty`,
    // `Gość na pogrzebie`,
    // `Bezkarne morderstwo`,
    // `Łyżeczka po łyżeczce`,
    // `Światło w ciemności`,
    // `Bezgłowy`,
    // `Zabójcze góry`,
    // `Śmiertelna rozmowa telefoniczna`,
    // `Pięciu przyjaciół`,
    // `Zawieszony`,
    // `Proste zabójstwo`,
    // `Biały gołąb`,
    // `Sauna`,
    // `Sprzątnięta`,
    // `Jednoręcy`,
    // `Wakacje z konsekwencjami`,
    // `Lustereczko, lustereczko...`,
    // `Czarny Chevrolet`,
    // `Pilot`,
    // `Poranek`,
    // `Księżyc`,
    // `Rewolwerowiec`,
    // `Włącznik światła`,
    // `Walizka`,
    // `Z rozpiętymi spodniami`,
    // `Burmistrz`,
    // `Taksówka`,
    // `Restauracja z frykasami`,
    // `Radio samochodowe`,
    // `Pakunek`,
    // `Wieżowiec`,
    // `Śmiertelne migotanie`,
    // `Zajęte`,
    // `Tanie Porsche`,
    // `Dziękuję`,
];
let tempCzHisDB = czHisDB;

client.on('message', (channel, userstate, message, self) => {
    if (self) return;

    if (userstate['custom-reward-id'] === 'e34d11f3-533c-4fc8-aefd-5f41f56b53f1') {
        buyer.push(userstate['display-name']);
    }

    else {
        if (buyer.includes(userstate['display-name']) && (message.toLowerCase().startsWith("!czarnehistorie") || message.toLowerCase().startsWith("!czarne historie") || message.toLowerCase().startsWith("!ciorne historie") || message.toLowerCase().startsWith("!ciornehistorie"))) {

            let r1 = tempCzHisDB[Math.floor(Math.random() * tempCzHisDB.length)]
            const index1 = tempCzHisDB.indexOf(r1);
            tempCzHisDB.splice(index1, 1);

            let r2 = tempCzHisDB[Math.floor(Math.random() * tempCzHisDB.length)]
            const index2 = tempCzHisDB.indexOf(r2);
            tempCzHisDB.splice(index2, 1);

            let r3 = tempCzHisDB[Math.floor(Math.random() * tempCzHisDB.length)]
            const index3 = tempCzHisDB.indexOf(r3);
            tempCzHisDB.splice(index3, 1);

            client.say(channel, `Wylosowane zagadki to: "${r1}", "${r2}", "${r3}". Wybierz jedną i zaczynajmy!`)

            const indexBuyer = buyer.indexOf(userstate['display-name']);
            buyer.splice(indexBuyer, 1)
        }
    }
})


// kekw
client.on('message', (channel, userstate, message, self) => {
    if (self || blockadeGlobal) return;

    if ((message.toLowerCase().includes('ekkw'))
        || (message.toLowerCase().includes('kewk'))
        || (message.toLowerCase().includes('kwek'))
        || (message.toLowerCase().includes('kekew'))
        || (message.toLowerCase().includes('ekkew'))
        || (message.toLowerCase().includes('kwewk'))
        || (message.toLowerCase().includes('kwkw'))
        || (message.toLowerCase().includes('kew'))
        || (message.toLowerCase().includes('wekw'))) {

        client.say(channel, `/me ` + `@${userstate['display-name']}, czy chodziło ci o KEKW ?`);
    } else return;
});


// // !bogole !bogacze
let blockadeBogole = false;

client.on('message', (channel, userstate, message, self) => {
    if (self || blockadeGlobal) return;

    if (dbcommands.t3.includes(userstate['display-name'])) {

        setTimeout(() => {
            if (((!userstate.badges || !userstate.badges.subscriber || userstate.badges.subscriber.length == undefined || !userstate.badges.subscriber.length)) || (!userstate.badges.subscriber.length >= 3 && !userstate.badges.subscriber.startsWith('30'))) {
                const index = dbcommands.t3.indexOf(userstate['display-name']);

                if (index > -1) {
                    dbcommands.t3.splice(index, 1);
                }
            }
        }, 2000);

    } else if (!dbcommands.t3.includes(userstate['display-name'])) {

        setTimeout(() => {
            if (!userstate.badges || !userstate.badges.subscriber || userstate.badges.subscriber.length == undefined || !userstate.badges.subscriber.length) {

            } else if (userstate.badges.subscriber.length >= 3 && userstate.badges.subscriber.startsWith('30')) {
                dbcommands.t3.push(userstate['display-name'])
            }

            fs.writeFile("./dbcommands.json", JSON.stringify(dbcommands), (err) => {
                if (err) console.log(err);
            });
        }, 2000);
    }

    if (blockadeBogole) {
        return;

    } else if ((message.toLowerCase().startsWith(`!bogole`))
        || (message.toLowerCase().startsWith(`!bogacze`))
        || (message.toLowerCase().startsWith(`!t3`))) {

        client.say(channel, `/me ` + `Oto bogole z Tier 3 subem: @${dbcommands.t3.join(", @")}`)

        blockadeBogole = true;
        setTimeout(() => {
            blockadeBogole = false;
        }, 1000)
    }
});


// ROCKET LEAGUE any tips?
let blockadeTip = false;

client.on('message', (channel, userstate, message, self) => {
    if (self) return;

    if (blockadeTip) {
        return;

    } else {

        if (message.includes(`tip`) && message.includes(`?`) || (message.includes(`porad`) && message.includes(`?`))) {

            client.say(channel, `/me ` + `@${userstate['display-name']}, łap stronkę z tipami https://www.rocketleague-help.com/rank-up-zone`)
        }

        blockadeTip = true;
        setTimeout(() => {
            blockadeTip = false;
        }, 10000)
    }
});


// !count
let blockadeCount = false;
let countSec;

client.on('message', (channel, userstate, message, self) => {
    if (self) return;

    if (blockadeCount) {
        return;

    } else {

        if (userstate.username === 'itzmaxinho' && message.toLowerCase() === `!count`) {
            Countdown();
        } else if (userstate.username === 'itzmaxinho' && (message.toLowerCase() === `!count stop` || message.toLowerCase() === `!countstop`)) {
            clearInterval(countSec)
        }
    }
});


// !!open
let blockadeOpen = false;
let openCounter = 0;
let openText = '';

client.on('message', (channel, userstate, message, self) => {
    if (self || blockadeGlobal) return;

    if (blockadeOpen) {
        return;

    } else {

        if (message.toLowerCase() === '!open') {
            openCounter++;

            if (openCounter == 2) {
                openText = 'y'
            }

            let openHighscore = dbcommands.open.map(openn => openn.counter);
            let highScoreText = `(Rekord streama: ${openHighscore})`

            if (openCounter > openHighscore) {

                highScoreText = `To nowy rekord!`

                dbcommands.open = dbcommands.open.map(open => {

                    return open = ({
                        counter: openCounter,
                    })
                })

                fs.writeFile("./dbcommands.json", JSON.stringify(dbcommands), (err) => {
                    if (err) console.log(err);
                });
            }

            client.say(channel, `/me ` + `Streamer na tym streamie zmissował opena ${openCounter} raz` + openText + `! ` + highScoreText)

            blockadeOpen = true;
            setTimeout(() => {
                blockadeOpen = false;
            }, 5000)
        }
    }
});


// !coinflip
client.on('message', (channel, userstate, message, self) => {
    if (self || blockadeGlobal) return;

    if (message.toLowerCase() === `!reszka` || message.toLowerCase() === `!orzeł`) {

        r = Math.floor(Math.random() * 1000)
        console.log(r)

        if (r < 500) {
            client.say(channel, `/me ` + `orzeł!`)
        } else if (r > 500) {
            client.say(channel, `/me ` + `reszka!`)
        } else {
            client.say(channel, `/me ` + `Ani orzeł, ani reszka! Moneta stanęła na sztorc!`)
        }
    }
});

/*

// template
let blockade = false;

client.on('message', (channel, userstate, message, self) => {
    if (self || blockadeGlobal) return;

    if (blockade) return;

    else {

        blockade = true;
        setTimeout(() => {
            blockade = false;
        }, 900000)
    }
});

*/


//------------------------------------------------------------------ WORKSPACE  /  ABOVE ------------------------------------------------------------------

// !bigProject !eko !economy
// dbeco.json
let currentViewers = [];
let users = {};
const viewers = new Map();
let goldForPresence = 5
let presenceTime = 5 * 60 * 1000
let goldForMessage = 3
let messageTimeMin = 1 * 33 * 1000
let messageTimeMax = 5 * 60 * 1000
let onemoretime = true;

client.on('message', (channel, userstate, message, self) => {
    if (self) return;

    const username = userstate.username;

    // add person to "viewers" if he's not there yet
    if (!Boolean(dbeco.viewers.filter(gracz => gracz.id == userstate['user-id']).length)) {
        console.log(`DODANIE WIDZA DO DB-ECO: ${userstate['display-name']}`)

        dbeco.viewers.push({
            nickname: userstate.username,
            id: userstate['user-id'],
            level: 1,
            gold: 0,
            goldSpent: 0,
            skillPoints: 0,
            bossesDefeated: 0,
            dungeonsCompleted: 0,
            winsInEvents: 0,
            atk: 10,
            hp: 20,
            luck: 15,
            fightsWon: 0,
            fightsLost: 0
        })

        fs.writeFile("./dbeco.json", JSON.stringify(dbeco), (err) => {
            if (err) console.log(err);
        });
    }

    // get current viewers FUNCTION
    async function getCurrentViewers() {
        const url = 'https://api.twitch.tv/helix/chat/chatters?broadcaster_id=streamerTwitchID&moderator_id=moderatorTwitchID';
        const headers = {
            'Authorization': `Bearer ${TOKEN}`,
            'Client-Id': ClientID
        };

        try {
            const response = await fetch(url, { headers });
            const data = await response.json();
            const userNames = data.data.map(item => item.user_name.toLowerCase());
            userNames.push("tester")
            return userNames;
        } catch (error) {
            console.error(error);
            throw new Error('Failed to fetch chatters data');
        }
    }

    // get current viewers, actual viewers, present viewers
    (async () => {
        try {
            currentViewers = await getCurrentViewers();
        } catch (error) {
            console.error(error);
        }
    })();

    // start tracking viewer for presence FUNCTION
    function startTrackingViewer(username) {

        viewers.set(username, {
            startTime: Date.now()
        });
    }

    // check viewer's presence and reward him FUNCTION
    function checkViewerPresenceAndReward(username) {
        const viewer = viewers.get(username);
        const elapsedTime = Date.now() - viewer.startTime;

        if (viewer && currentViewers.includes(username)) {

            if (elapsedTime >= presenceTime) {

                dbeco.viewers = dbeco.viewers.map(presenceReward => {
                    if (presenceReward.nickname === username) {
                        presenceReward = {
                            nickname: presenceReward.nickname,
                            id: presenceReward.id,
                            level: presenceReward.level,
                            gold: presenceReward.gold + goldForPresence,
                            goldSpent: presenceReward.goldSpent,
                            skillPoints: presenceReward.skillPoints,
                            bossesDefeated: presenceReward.bossesDefeated,
                            dungeonsCompleted: presenceReward.dungeonsCompleted,
                            winsInEvents: presenceReward.winsInEvents,
                            atk: presenceReward.atk,
                            hp: presenceReward.hp,
                            luck: presenceReward.luck,
                            fightsWon: presenceReward.fightsWon,
                            fightsLost: presenceReward.fightsLost
                        }
                    }
                    return presenceReward;
                });

                viewers.delete(username)
                startTrackingViewer(username);

                fs.writeFile("./dbeco.json", JSON.stringify(dbeco), (err) => {
                    if (err) console.log(err);
                });

                return dbeco;
            }
        }
    }

    rewardViewer(username)

    // check viewer's messages and reward him FUNCTION
    function rewardViewer(username) {

        if (!users[username]) {

            users[username] = {
                firstMessageTime: Date.now(),
                rewarded: false,
                timer: null,
            };

            users[username].timer = setTimeout(() => {
                users[username].rewarded = true;
            }, messageTimeMin);

        } else {
            const currentTime = Date.now();
            const elapsedTime = currentTime - users[username].firstMessageTime;

            if (elapsedTime >= messageTimeMax) {

                clearTimeout(users[username].timer);

                users[username] = {
                    firstMessageTime: currentTime,
                    rewarded: false,
                    timer: setTimeout(() => {
                        users[username].rewarded = true;
                    }, messageTimeMin),
                };

            } else if (users[username].rewarded && elapsedTime >= messageTimeMin) {

                dbeco.viewers = dbeco.viewers.map(presenceReward => {
                    if (presenceReward.nickname === username) {
                        presenceReward = {
                            nickname: presenceReward.nickname,
                            id: presenceReward.id,
                            level: presenceReward.level,
                            gold: presenceReward.gold + goldForMessage,
                            goldSpent: presenceReward.goldSpent,
                            skillPoints: presenceReward.skillPoints,
                            bossesDefeated: presenceReward.bossesDefeated,
                            dungeonsCompleted: presenceReward.dungeonsCompleted,
                            winsInEvents: presenceReward.winsInEvents,
                            atk: presenceReward.atk,
                            hp: presenceReward.hp,
                            luck: presenceReward.luck,
                            fightsWon: presenceReward.fightsWon,
                            fightsLost: presenceReward.fightsLost
                        }
                    }
                    return presenceReward;
                });

                fs.writeFile("./dbeco.json", JSON.stringify(dbeco), (err) => {
                    if (err) console.log(err);
                });

                clearTimeout(users[username].timer);
                users[username] = {
                    firstMessageTime: Date.now(),
                    rewarded: false,
                    timer: null,
                };
                users[username].timer = setTimeout(() => {
                    users[username].rewarded = true;
                }, 5000);

                return dbeco;
            }
        }
    }

    // run this once...
    if (onemoretime && currentViewers.length > 0) {
        onemoretime = false;

        currentViewers.forEach(username => {
            if (!viewers.has(username)) {
                startTrackingViewer(username);
            }
        });

        currentViewers.forEach(username => {
            checkViewerPresenceAndReward(username);
        });

        // ...then start tracking viewers for 5 minutes interval
        const interval = setInterval(() => {
            currentViewers.forEach(username => {
                if (!viewers.has(username)) {
                    startTrackingViewer(username);
                }
            });

            if (currentViewers.length == 0) {
                client.say(channel, `/me ` + `Halo @itzMaxinho nie udało się pobrać listy viewersów!`)
            }

            currentViewers.forEach(username => {
                checkViewerPresenceAndReward(username);
            });

        }, presenceTime); // 5 minutes interval
    }
});


// !!fight !walka !walcz
let percentOfGoldIfWon;
let percentOfGoldIfLost;
let atkMin = 0.7
let atkMax = 1.3
let playerLuck = 1// 1.5
let wager;
let winner = '';
let winnerCap;
let loser = '';
let loserCap;
let drawer1 = '';
let drawer2 = '';
let remis;
let alreadyFought = [];
let timersFought = {}
let fightLog = [];
let blockadeFight = false;
let delayBetweenFightsInSeconds = 30
let fightCooldownInMins = 60
let hpMultiplyer = 4
let bro;

client.on('message', (channel, userstate, message, self) => {

    if (userstate.username == drawer1 || userstate.username == drawer2) {
        if ((userstate.username == drawer1) && message.toLowerCase().startsWith(`!priv`)) {
            let timeNow = formatCurrentDate()
            WhisperUser(userstate.username, `WALKA ${drawer1} i ${drawer2}: ${timeNow}`)
            setTimeout(() => {
                WhisperUser(userstate.username, fightLog)
            }, 100);
            setTimeout(() => {
                WhisperUser(userstate.username, "Remis, więc możesz rozpocząć nowy pojedynek!")
            }, 200);
            drawer1 = '';
            clearTimeout(bro)
        }

        if ((userstate.username == drawer2) && message.toLowerCase().startsWith(`!priv`)) {
            let timeNow = formatCurrentDate()
            WhisperUser(userstate.username, `WALKA ${drawer2} i ${drawer1}: ${timeNow}`)
            setTimeout(() => {
                WhisperUser(userstate.username, fightLog)
            }, 100);
            setTimeout(() => {
                WhisperUser(userstate.username, "Remis, więc możesz rozpocząć nowy pojedynek!")
            }, 200);
            drawer2 = '';
            clearTimeout(bro)
        }

    } else if (userstate.username == winner || userstate.username == loser) {
        if ((userstate.username == winner) && message.toLowerCase().startsWith(`!priv`)) {
            let timeNow = formatCurrentDate()
            WhisperUser(userstate.username, `WALKA ${winnerCap} i ${loserCap}: ${timeNow}`)
            setTimeout(() => {
                WhisperUser(userstate.username, fightLog)
            }, 100);
            setTimeout(() => {
                WhisperUser(userstate.username, "GGWP!")
            }, 200);
            winner = '';
            clearTimeout(bro)
        }

        if ((userstate.username == loser) && message.toLowerCase().startsWith(`!priv`)) {
            let timeNow = formatCurrentDate()
            WhisperUser(userstate.username, `WALKA ${winnerCap} i ${loserCap}: ${timeNow}`)
            setTimeout(() => {
                WhisperUser(userstate.username, fightLog)
            }, 100);
            setTimeout(() => {
                WhisperUser(userstate.username, "Next time się uda!")
            }, 200);
            loser = '';
            clearTimeout(bro)
        }
    } else if (self || blockadeGlobal || blockadeFight) return;

    function formatCurrentDate() {
        const now = new Date();

        const monthsOfYear = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];

        const month = monthsOfYear[now.getMonth()];
        const dayOfMonth = now.getDate();

        const hours = now.getHours();
        const minutes = now.getMinutes();

        const formattedDate = `${dayOfMonth} ${month} o ${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

        return formattedDate;
    }

    function getAbsoluteDifferenceAndCheck(num1, num2) {
        const absoluteDifference = Math.abs(num1 - num2);

        if (absoluteDifference > 3) {
            return {
                difference: absoluteDifference,
                greaterThan3: true
            };
        } else {
            return {
                difference: absoluteDifference,
                greaterThan3: false
            };
        }
    }
    let currentLvl = getLevelByNickname(userstate.username)

    if (message.toLowerCase().startsWith(`!fight`)
        || message.toLowerCase().startsWith(`!walka`)
        || message.toLowerCase().startsWith(`!walcz`)) {

        let isFound = dbeco.viewers.find(a => a.nickname === userstate.username);
        if (!isFound) {
            client.say(channel, `/me ` + `@${userstate['display-name']}, nie ma cię w bazie danych. Wpisz !rename [staryNick]`)
            return;
        }

        remis = false;

        let [raw, command, argument] = message.match(regexpCommands);

        if (alreadyFought.includes(userstate.username) && userstate.username != `itzmaxinho`) {
            client.say(channel, `/me ` + `@${userstate['display-name']} (${currentLvl} lv), walczyłeś już dzisiaj, odpocznij.`)
            return;

        } else if (!argument) {
            client.say(channel, `/me ` + `@${userstate['display-name']} (${currentLvl} lv), oznacz osobę którą chcesz zaatakować!`)
            return;

        } else if (argument == userstate.username || argument == userstate['display-name']) {
            client.say(channel, `/me ` + `@${userstate['display-name']} (${currentLvl} lv), bruv`)
            return;

        } else if (!currentViewers.includes(argument.toLowerCase()) && userstate.username != `itzmaxinho`) {
            client.say(channel, `/me ` + `@${userstate['display-name']} (${currentLvl} lv), nie ma takiej osoby na streamie!`)
            return;

        } else {
            let level1 = getLevelByNickname(userstate.username)
            let level2 = getLevelByNickname(argument.toLowerCase())
            let result = getAbsoluteDifferenceAndCheck(level1, level2);

            if (result.greaterThan3 && userstate.username != `itzmaxinho`) {
                client.say(channel, `/me ` + `@${userstate['display-name']} (${currentLvl} lv), zbyt duża różnica poziomów!`)
                // console.log(`@${userstate['display-name']}, zbyt duża różnica poziomów!`)

            } else {

                blockadeFight = true
                setTimeout(() => {
                    blockadeFight = false
                }, delayBetweenFightsInSeconds * 1000);

                if (result.difference == 3) {
                    if (level1 > level2) {
                        percentOfGoldIfWon = 0.02
                        percentOfGoldIfLost = 0.12
                    } else if (level1 < level2) {
                        percentOfGoldIfWon = 0.12
                        percentOfGoldIfLost = 0.02
                    }
                }
                else if (result.difference == 2) {
                    if (level1 > level2) {
                        percentOfGoldIfWon = 0.03
                        percentOfGoldIfLost = 0.10
                    } else if (level1 < level2) {
                        percentOfGoldIfWon = 0.10
                        percentOfGoldIfLost = 0.03
                    }
                }
                else if (result.difference == 1) {
                    if (level1 > level2) {
                        percentOfGoldIfWon = 0.05
                        percentOfGoldIfLost = 0.07
                    } else if (level1 < level2) {
                        percentOfGoldIfWon = 0.07
                        percentOfGoldIfLost = 0.05
                    }
                }
                else if (result.difference == 0) {
                    percentOfGoldIfWon = 0.06
                    percentOfGoldIfLost = 0.06
                }
                else {
                    percentOfGoldIfWon = 0
                    percentOfGoldIfLost = 0
                }

                const isF1InDB = dbeco.viewers.find(a => a.nickname === userstate.username);
                const isF2InDB = dbeco.viewers.find(a => a.nickname === argument.toLowerCase());
                let fighter1 = getFightStatsByNickname(userstate.username)

                if (!isF1InDB) {
                    client.say(channel, `/me ` + `@${userstate['display-name']}, nie ma cię w bazie danych. Zrób !rename [staryNick]`)
                    return;
                }

                if (!isF2InDB) {
                    client.say(channel, `/me ` + `@${usernameToDisplayName(argument.toLowerCase())}, nie ma cię w bazie danych. Zrób !rename [staryNick]`)
                    return;
                }
                let fighter2 = getFightStatsByNickname(argument.toLowerCase())


                client.say(channel, `/me ` + `${userstate['display-name']} (${fighter1.level} lv) [ATK: ${fighter1.atk}, HP: ${fighter1.hp}, LUCK: ${fighter1.luck}] vs. ${usernameToDisplayName(argument)} (${fighter2.level} lv) [ATK: ${fighter2.atk}, HP: ${fighter2.hp}, LUCK: ${fighter2.luck}]`)
                // console.log(`${userstate['display-name']} (${fighter1.level} lv) [ATK: ${fighter1.atk}, HP: ${fighter1.hp}, LUCK: ${fighter1.luck}] vs. ${argument} (${fighter2.level} lv) [ATK: ${fighter2.atk}, HP: ${fighter2.hp}, LUCK: ${fighter2.luck}]`)

                let tempWager = Fight(userstate['display-name'], fighter1, argument, fighter2)

                // ---------------------------- tylko foonkcja1 --------------------
                function Fight(viewer1, stats1, viewer2, stats2) {

                    let atkMin1 = stats1.atk * atkMin
                    let atkMax1 = (stats1.atk * atkMax)
                    let atkMin2 = stats2.atk * atkMin
                    let atkMax2 = (stats2.atk * atkMax)

                    // stats1.hp = stats1.hp * hpMultiplyer // moze w przyszlosci
                    // stats2.hp = stats2.hp * hpMultiplyer

                    let runda = 1;
                    let tempFightLog = [];

                    while ((stats1.hp > 0) && (stats2.hp > 0)) {

                        let r1 = getRandomNumber(atkMin1, atkMax1).toFixed(0)
                        let r2 = getRandomNumber(atkMin2, atkMax2).toFixed(0)

                        let r1luck = getRandomNumber(1, 100)
                        let r2luck = getRandomNumber(1, 100)

                        let luck1Text = ''
                        let luck2Text = ''

                        let luck1Cap = stats2.luck / 5
                        let luck2Cap = stats1.luck / 5

                        if (luck1Cap > 50) luck1Cap = 50
                        if (luck2Cap > 50) luck2Cap = 50

                        if (r1luck < luck1Cap) {
                            luck1Text = ', ale nie trafia'
                        }

                        if (r2luck < luck2Cap) {
                            luck2Text = ', ale nie trafia'
                        }

                        console.log(`Runda ${runda}: ${viewer1} (${stats1.hp} HP) atakuje za ${r1}` + luck1Text + `, a ${viewer2} (${stats2.hp} HP) atakuje za ${r2}` + luck2Text + `!`)
                        tempFightLog.push(`Runda ${runda}: ${viewer1} (${stats1.hp} HP) atakuje za ${r1}` + luck1Text + `, a ${viewer2} (${stats2.hp} HP) atakuje za ${r2}` + luck2Text + `!`)

                        if (r1luck <= luck1Cap) {
                            r1 = 0
                        }

                        if (r2luck <= luck2Cap) {
                            r2 = 0
                        }

                        stats1.hp = stats1.hp - r2;
                        stats2.hp = stats2.hp - r1;

                        runda++;
                    }

                    fightLog = tempFightLog.join(" - - - > ")

                    let fighter1 = getLevelByNickname(userstate.username)
                    let fighter2 = getLevelByNickname(argument.toLowerCase())

                    if (stats1.hp <= 0 && stats2.hp <= 0) { //REMIS
                        remis = true;

                        drawer1 = viewer1.toLowerCase();
                        drawer2 = viewer2.toLowerCase();

                        setTimeout(() => {
                            client.say(channel, `/me ` + `@${userstate['display-name']} vs. @${usernameToDisplayName(argument)} ... REMIS!`)
                            // console.log(r)
                        }, 2000);

                    } else if (stats1.hp > 0 && stats2.hp <= 0) { // WIN 1
                        wager = (stats2.gold * percentOfGoldIfWon)

                        setTimeout(() => {
                            client.say(channel, `/me ` + `Wygrywa... @${viewer1} (${fighter1} lv) z ${stats1.hp.toFixed(0)}hp i kradnie ${wager.toFixed(0)} golda wroga. !priv po szczegóły walki`)
                            // console.log(`Wygrywa... @${viewer1} (${fighter1} lv) z ${stats1.hp.toFixed(0)}hp i kradnie ${wager.toFixed(0)} golda wroga. !priv po szczegóły walki`)
                        }, 2000);

                        winner = viewer1.toLowerCase();
                        winnerCap = viewer1;
                        loser = viewer2.toLowerCase();
                        loserCap = viewer2;
                        alreadyFought.push(userstate.username);

                        if (!timersFought[userstate.username]) {
                            timersFought[userstate.username] = setTimeout(() => {
                                if (alreadyFought.includes(userstate.username)) {
                                    alreadyFought = alreadyFought.filter(user => user !== userstate.username);
                                    delete timersFought[userstate.username];
                                }
                            }, fightCooldownInMins * 60 * 1000);
                        }

                        setTimeout(() => {
                            winner = '';
                            loser = '';
                        }, 20000);

                    } else if (stats1.hp <= 0 && stats2.hp > 0) { // WIN 2
                        wager = (stats1.gold * percentOfGoldIfLost)

                        setTimeout(() => {
                            client.say(channel, `/me ` + `Wygrywa... @${viewer2} (${fighter2} lv) z ${stats2.hp.toFixed(0)}hp i kradnie ${wager.toFixed(0)} golda wroga. !priv po szczegóły walki`)
                            // console.log(`Wygrywa... @${viewer2} (${fighter2} lv) z ${stats2.hp.toFixed(0)}hp i kradnie ${wager.toFixed(0)} golda wroga. !priv po szczegóły walki`)
                        }, 2000);

                        winner = viewer2.toLowerCase();
                        winnerCap = viewer1;
                        loser = viewer1.toLowerCase();
                        loserCap = viewer2;
                        alreadyFought.push(userstate.username);

                        if (!timersFought[userstate.username]) {
                            timersFought[userstate.username] = setTimeout(() => {
                                if (alreadyFought.includes(userstate.username)) {
                                    alreadyFought = alreadyFought.filter(user => user !== userstate.username);
                                    console.log("can fight now!")
                                }
                            }, fightCooldownInMins * 60 * 1000);
                        }

                        setTimeout(() => {
                            winner = '';
                            loser = '';
                        }, 20000);
                    }

                    blockadeFight = true;
                    setTimeout(() => {
                        blockadeFight = false;
                    }, 30000);

                    if (wager == undefined) {
                        wager = 1
                    }
                    return wager.toFixed(0)
                }
                // ---------------------------- tylko foonkcja2 --------------------
                wager = parseInt(tempWager)

                if (remis) {

                    setTimeout(() => {
                        drawer1 = '';
                        drawer2 = '';
                    }, 20000);

                }
                else {
                    // sorting out gold to the winner
                    dbeco.viewers = dbeco.viewers.map(win => {
                        if (win.nickname === winner) {
                            win = {
                                nickname: win.nickname,
                                id: win.id,
                                level: win.level,
                                gold: win.gold + wager,
                                goldSpent: win.goldSpent,
                                skillPoints: win.skillPoints,
                                bossesDefeated: win.bossesDefeated,
                                dungeonsCompleted: win.dungeonsCompleted,
                                winsInEvents: win.winsInEvents,
                                atk: win.atk,
                                hp: win.hp,
                                luck: win.luck,
                                fightsWon: win.fightsWon + 1,
                                fightsLost: win.fightsLost
                            }
                        }
                        return win;
                    });

                    // sorting out gold to the loser
                    dbeco.viewers = dbeco.viewers.map(lose => {
                        if (lose.nickname === loser) {
                            lose = ({
                                nickname: lose.nickname,
                                id: lose.id,
                                level: lose.level,
                                gold: lose.gold - wager,
                                goldSpent: lose.goldSpent,
                                skillPoints: lose.skillPoints,
                                bossesDefeated: lose.bossesDefeated,
                                dungeonsCompleted: lose.dungeonsCompleted,
                                winsInEvents: lose.winsInEvents,
                                atk: lose.atk,
                                hp: lose.hp,
                                luck: lose.luck,
                                fightsWon: lose.fightsWon,
                                fightsLost: lose.fightsLost + 1
                            })
                        }
                        return lose;
                    });

                    fs.writeFile("./dbeco.json", JSON.stringify(dbeco), (err) => {
                        if (err) console.log(err);
                    });

                    return dbeco;
                }
            }
        }
    }
});

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const rankUpCosts = {
    1: 50,
    2: 100,
    3: 200,
    4: 300,
    5: 400,
    6: 500,
    7: 666,
    8: 800,
    9: 1000,

    10: 1100,
    11: 1200,
    12: 1300,
    13: 1400,
    14: 1500,
    15: 1600,
    16: 1700,
    17: 1800,
    18: 1900,
    19: 2000,
}
let currentUserLvlup = [];
let timersLvlup = {};
let blockadeLvlUp = false;
let delayBetweenLvlUpInSeconds = 30;
let currentLevel;

// !!lvlup
client.on('message', (channel, userstate, message, self) => {
    if (self || blockadeGlobal) return;

    if (userstate.mod && message.toLowerCase() == `!resetlvlup`) {
        console.log(currentUserLvlup)

        currentUserLvlup = [];
    }

    if (message.toLowerCase() === `nie` || message.toLowerCase() === `n` || message.toLowerCase() === `nope`) {
        clearTimeout(timersLvlup[userstate.username]);
        delete timersLvlup[userstate.username];
        currentUserLvlup = currentUserLvlup.filter(user => user !== userstate.username);
    }

    if (message.toLowerCase() === '!levelup'
        || message.toLowerCase() === '!level up'
        || message.toLowerCase() === '!rankup'
        || message.toLowerCase() === '!rank up'
        || message.toLowerCase() === '!lvlup'
        || message.toLowerCase() === '!lvl up'
        || currentUserLvlup.includes(userstate.username)) {

        let isFound = dbeco.viewers.find(a => a.nickname === userstate.username);
        if (!isFound) {
            client.say(channel, `/me ` + `@${userstate['display-name']}, nie ma cię w bazie danych. Wpisz !rename [staryNick]`)
            return;
        }

        currentLevel = getLevelByNickname(userstate.username)
        let goldNeededToRankUp = rankUpCosts[currentLevel] || 1000000;
        let currentGold = getGoldByNickname(userstate.username)

        if (!currentUserLvlup.includes(userstate.username) && currentUserLvlup.length != 0) {
            client.say(channel, `/me ` + `@${userstate['display-name']} (${currentLevel} lv), poczekaj na swoją kolej.`)
            // console.log(`@${userstate['display-name']}, poczekaj na swoją kolej.`)
            return;
        }
        if (blockadeLvlUp && !currentUserLvlup.includes(userstate.username)) return;

        if (currentUserLvlup.length == 0) {
            client.say(channel, `/me ` + `@${userstate['display-name']} (${currentLevel} lv), chcesz wydać ${goldNeededToRankUp} golda, by awansować na ${++currentLevel} lvl? (Twój gold: ${currentGold})`)
            // console.log(`@${userstate['display-name']} (${currentLevel} lv), czy chcesz by awansować na ${++currentLevel} lvl? [koszt: ${goldNeededToRankUp} golda]`)
            currentUserLvlup.push(userstate.username)
        }

        if (!timersLvlup[userstate.username]) {
            timersLvlup[userstate.username] = setTimeout(() => {
                if (currentUserLvlup.includes(userstate.username)) {
                    delete timersLvlup[userstate.username];
                    currentUserLvlup = [];
                }
            }, 15000);
        }

        if (message.toLowerCase().startsWith(`ta`) || message.toLowerCase().startsWith(`jes`) || message.toLowerCase().startsWith(`t`)) {
            clearTimeout(timersLvlup[userstate.username]);
            delete timersLvlup[userstate.username];
            currentUserLvlup = [];

            blockadeLvlUp = true;
            setTimeout(() => {
                blockadeLvlUp = false;
            }, delayBetweenLvlUpInSeconds * 1000);

            if (currentGold < goldNeededToRankUp) {
                client.say(channel, `/me ` + `@${userstate['display-name']} (${currentLevel} lv), masz za mało golda.`)
                // console.log(`@${userstate['display-name']} (${currentLevel} lv), masz za mało golda.`)
                return;

            } else {
                let currentSkillPoints = getSkillPointsByNickname(userstate.username) + 1
                let goldNeededToRankUpNext = rankUpCosts[currentLevel + 1] || 1000000;


                if (currentSkillPoints == 1) {
                    client.say(channel, `/me ` + `@${userstate['display-name']}, awansowałeś na level ${++currentLevel}! Masz 1 punkt umiejętności. (Next lvl: ${goldNeededToRankUpNext} golda)`)
                    // console.log(`@${userstate['display-name']}, awansowałeś na level ${++currentLevel}! Masz do wykorzystania 1 punkt umiejętności.`)
                } else if (currentSkillPoints <= 4) {
                    client.say(channel, `/me ` + `@${userstate['display-name']}, awansowałeś na level ${++currentLevel}! Masz ${currentSkillPoints} punkty umiejętności. (Next lvl: ${goldNeededToRankUpNext} golda)`)
                    // console.log(`@${userstate['display-name']}, awansowałeś na level ${++currentLevel}! Masz do wykorzystania ${currentSkillPoints} punkty umiejętności.`)
                } else if (currentSkillPoints >= 5) {
                    client.say(channel, `/me ` + `@${userstate['display-name']}, awansowałeś na level ${++currentLevel}! Masz ${currentSkillPoints} punktów umiejętności. (Next lvl: ${goldNeededToRankUpNext} golda)`)
                    // console.log(`@${userstate['display-name']}, awansowałeś na level ${++currentLevel}! Masz do wykorzystania ${currentSkillPoints} punktów umiejętności.`)
                }


                if (currentLevel == 5 && dbeco.firstTo[0].lvlFive === null) {
                    client.say(channel, `/me ` + `Gratulacje @${userstate['display-name']}! Jako pierwszy osiągnąłeś 5 poziom! Wygrywasz 100 cr w RL! Zrób screena tej wiadomości i wyślij majstrowi na priv !dc`)

                    dbeco.firstTo[0].lvlFive = userstate.username;

                    fs.writeFile("./dbeco.json", JSON.stringify(dbeco), (err) => {
                        if (err) console.log(err);
                    });
                } else if (currentLevel == 10 && dbeco.firstTo[0].lvlTen === null) {
                    client.say(channel, `/me ` + `Gratulacje @${userstate['display-name']}! Jako pierwszy osiągnąłeś 10 poziom! Wygrywasz 200 cr w RL! Zrób screena tej wiadomości i wyślij majstrowi na priv !dc`)

                    dbeco.firstTo[0].lvlTen = userstate.username;

                    fs.writeFile("./dbeco.json", JSON.stringify(dbeco), (err) => {
                        if (err) console.log(err);
                    });
                } else if (currentLevel == 15 && dbeco.firstTo[0].lvlFifteen === null) {
                    client.say(channel, `/me ` + `Gratulacje @${userstate['display-name']}! Jako pierwszy osiągnąłeś 15 poziom! Wygrywasz 400 cr w RL! Zrób screena tej wiadomości i wyślij majstrowi na priv !dc`)

                    dbeco.firstTo[0].lvlFifteen = userstate.username;

                    fs.writeFile("./dbeco.json", JSON.stringify(dbeco), (err) => {
                        if (err) console.log(err);
                    });
                } else if (currentLevel == 20 && dbeco.firstTo[0].lvlTwenty === null) {
                    client.say(channel, `/me ` + `Gratulacje @${userstate['display-name']}! Jako pierwszy osiągnąłeś 20 poziom! Wygrywasz FENNEC w RL! Zrób screena tej wiadomości i wyślij majstrowi na priv !dc`)

                    dbeco.firstTo[0].lvlTwenty = userstate.username;

                    fs.writeFile("./dbeco.json", JSON.stringify(dbeco), (err) => {
                        if (err) console.log(err);
                    });
                }

                dbeco.viewers = dbeco.viewers.map(rankup => {
                    if (rankup.nickname === userstate.username) {
                        rankup = ({
                            nickname: rankup.nickname,
                            id: rankup.id,
                            level: rankup.level + 1,
                            gold: rankup.gold - goldNeededToRankUp,
                            goldSpent: rankup.goldSpent + goldNeededToRankUp,
                            skillPoints: rankup.skillPoints + 1,
                            bossesDefeated: rankup.bossesDefeated,
                            dungeonsCompleted: rankup.dungeonsCompleted,
                            winsInEvents: rankup.winsInEvents,
                            atk: rankup.atk,
                            hp: rankup.hp,
                            luck: rankup.luck,
                            fightsWon: rankup.fightsWon,
                            fightsLost: rankup.fightsLost
                        })
                    }
                    return rankup;
                });

                fs.writeFile("./dbeco.json", JSON.stringify(dbeco), (err) => {
                    if (err) console.log(err);
                });

                return dbeco;
            }
        }
    }
});


// !stats !staty
let blockadeStats = false
let blockadeGold = false
let blockadeJa = false
let delayBetweenStatsInSeconds = 30

client.on('message', (channel, userstate, message, self) => {
    if (self || blockadeGlobal) return;
    if (blockadeStats) return;
    if (blockadeGold) return;
    if (blockadeJa) return;

    if (message.toLowerCase() === `!stats` || message.toLowerCase().startsWith(`!staty`)) {

        let isFound = dbeco.viewers.find(a => a.nickname === userstate.username);
        if (!isFound) {
            client.say(channel, `/me ` + `@${userstate['display-name']}, nie ma cię w bazie danych. Wpisz !rename [staryNick]`)
            return;
        }

        blockadeStats = true;
        setTimeout(() => {
            blockadeStats = false;
        }, delayBetweenStatsInSeconds * 1000);

        let currentAllStats = getAllStatsByNickname(userstate.username)

        client.say(channel, `/me ` + `@${userstate['display-name']}, ${currentAllStats.level} lvl, ${currentAllStats.gold} golda, [ATK: ${currentAllStats.atk}, HP: ${currentAllStats.hp}, LUCK: ${currentAllStats.luck}] Pokonane bossy: ${currentAllStats.bossesDefeated}, ukończone dungeony: ${currentAllStats.dungeonsCompleted}, wygrane/przegrane PVP: ${currentAllStats.fightsWon}/${currentAllStats.fightsLost}`)
        //    console.log(`@${userstate['display-name']}, ${currentAllStats.level} lvl, ${currentAllStats.gold} golda, [ATK: ${currentAllStats.atk}, HP: ${currentAllStats.hp}, LUCK: ${currentAllStats.luck}] Pokonane bossy: ${currentAllStats.bossesDefeated}, ukończone dungeony: ${currentAllStats.dungeonsCompleted}, wygrane/przegrane PVP: ${currentAllStats.fightsWon}/${currentAllStats.fightsLost}`)

    } else if (message.toLowerCase() === `!gold` || message.toLowerCase() === `!hajs` || message.toLowerCase() === `!siano` || message.toLowerCase() === `!kasa`) {

        let isFound = dbeco.viewers.find(a => a.nickname === userstate.username);
        if (!isFound) {
            client.say(channel, `/me ` + `@${userstate['display-name']}, nie ma cię w bazie danych. Wpisz !rename [staryNick]`)
            return;
        }

        blockadeGold = true;
        setTimeout(() => {
            blockadeGold = false;
        }, delayBetweenStatsInSeconds * 1000);

        let currentAllStats = getAllStatsByNickname(userstate.username);
        const filteredViewers = dbeco.viewers.filter(viewer => viewer.nickname !== 'itzmaxinho' && viewer.nickname !== 'bot__maciek');

        // Calculate goldAndGoldSpent for each viewer
        const viewersWithGoldAndSpent = filteredViewers.map(viewer => {
            const goldAndGoldSpent = viewer.gold + viewer.goldSpent;
            return { ...viewer, goldAndGoldSpent };
        });

        // Sort viewers based on goldAndGoldSpent in descending order
        const sortedViewers = viewersWithGoldAndSpent.slice().sort((a, b) => b.goldAndGoldSpent - a.goldAndGoldSpent);

        const userIndex = sortedViewers.findIndex(viewer => viewer.nickname === userstate.username) + 1;
        const totalObjects = sortedViewers.length;

        let currentLevel = currentAllStats.level
        let goldNeededToRankUp = rankUpCosts[currentLevel] || 1000000;
        let lackOfGold = goldNeededToRankUp - currentAllStats.gold
        let canRankUp = '';
        if (lackOfGold < 0) {
            canRankUp = `Możesz awansować!`
        } else if (lackOfGold > 0) {
            canRankUp = `Brakuje ${lackOfGold} golda do awansu.`
        }

        client.say(channel, `/me ` + `@${userstate['display-name']} (${currentAllStats.level}lv), masz ${currentAllStats.gold} golda (${currentAllStats.goldSpent} łącznie użyty). ${canRankUp} Zajmujesz ${userIndex}. miejsce na ${totalObjects} widzów!`);
        // console.log(`@${userstate['display-name']} (${currentAllStats.level}lv), masz ${currentAllStats.gold} golda i ${currentAllStats.goldSpent} wydanego golda. Zajmujesz ${userIndex}. pozycję spośród ${totalObjects} widzów!`);

    } else if (message.toLowerCase() == `!ja` || message.toLowerCase() == `!ranking` || message.toLowerCase() == `!ktory` || message.toLowerCase() == `!który`) {

        let isFound = dbeco.viewers.find(a => a.nickname === userstate.username);
        if (!isFound) {
            client.say(channel, `/me ` + `@${userstate['display-name']}, nie ma cię w bazie danych. Wpisz !rename [staryNick]`)
            return;
        }

        blockadeJa = true;
        setTimeout(() => {
            blockadeJa = false;
        }, delayBetweenStatsInSeconds * 1000);

        let currentLevel = getLevelByNickname(userstate.username)

        const sortedViewers = dbeco.viewers.slice().sort((b, a) => a.level - b.level);
        const userIndex = sortedViewers.findIndex(viewer => viewer.nickname === userstate.username) + 1;
        const totalObjects = dbeco.viewers.length;

        // console.log(`@${userstate['display-name']}, masz aktualnie ${currentLevel} level i jesteś na ${userIndex}. pozycji spośród ${totalObjects} widzów w rankingu!`)
        client.say(channel, `/me ` + `@${userstate['display-name']}, masz aktualnie ${currentLevel} level i jesteś na ${userIndex}. pozycji spośród ${totalObjects} widzów w rankingu!`)

    }
});

let currentUserSkill = []
let timersSkill = {};
let blockadeSkill = false;
let delayBetweenSkillInSeconds = 20;

function generateRandomNumbers(sum) {
    if (sum <= 0) {
        return [];
    }

    let numbers = [];
    for (let i = 0; i < 2; i++) {
        // Generate a random number between 1 and the remaining sum
        let randomNum = Math.floor(Math.random() * (sum - i));
        numbers.push(randomNum);
        sum -= randomNum;
    }
    numbers.push(sum); // Add the remaining value to the array
    return numbers;
}


// !skill
client.on('message', (channel, userstate, message, self) => {
    if (self || blockadeGlobal) return;

    if (userstate.mod && message.toLowerCase() == `!resetskill`) {
        console.log(currentUserSkill)

        currentUserSkill = [];
    }

    if (blockadeSkill && !currentUserSkill.includes(userstate.username)) return;

    if (message.toLowerCase().startsWith(`!skil`) || currentUserSkill.includes(userstate.username)) {

        let isFound = dbeco.viewers.find(a => a.nickname === userstate.username);
        if (!isFound) {
            client.say(channel, `/me ` + `@${userstate['display-name']}, nie ma cię w bazie danych. Wpisz !rename [staryNick]`)
            return;
        }

        let currentAllStats = getAllStatsByNickname(userstate.username)

        if (currentAllStats.skillPoints == 0) {
            client.say(channel, `/me ` + `@${userstate['display-name']} (${currentAllStats.level} lv), nie masz punktów umiejętności. Zwiększ swój poziom !lvlup`)
            // console.log(`@${userstate['display-name']} (${currentAllStats.level} lv), nie masz punktów umiejętności. Zwiększ swój poziom !lvlup`)

        } else {

            if (currentUserSkill == 0) {

                blockadeSkill = true;
                setTimeout(() => {
                    blockadeSkill = false;
                }, delayBetweenSkillInSeconds * 1000);

                currentUserSkill.push(userstate.username)
                client.say(channel, `/me ` + `@${userstate['display-name']} (${currentAllStats.level} lv), masz ${currentAllStats.skillPoints} PU. Ulepsz: ATK, HP, LUCK, RANDOM. Po więcej info wpisz !jak i sprawdź priv.`)
                // console.log(`@${userstate['display-name']} (${currentAllStats.level} lv), twoje punkty umiejętności: ${currentAllStats.skillPoints}. Wpisz, co chcesz ulepszyć: ATK, HP, LUCK, RANDOM. Po więcej info wpisz !jak i sprawdź priv.`)
            }

            if (!timersSkill[userstate.username]) {
                timersSkill[userstate.username] = setTimeout(() => {
                    if (currentUserSkill.includes(userstate.username)) {
                        currentUserSkill = currentUserSkill.filter(user => user !== userstate.username);
                    }
                }, 20000);
            }

            if ((message.toLowerCase() == `atk` || message.toLowerCase() == `!atk` || message.toLowerCase() == `hp` || message.toLowerCase() == `!hp` || message.toLowerCase() == `!luck` || message.toLowerCase() == `luck` || message.toLowerCase() == `!random` || message.toLowerCase() == `random`) && currentUserSkill.includes(userstate.username)) {

                clearTimeout(timersSkill[userstate.username]);
                delete timersSkill[userstate.username];
                currentUserSkill = currentUserSkill.filter(user => user !== userstate.username);

                if (message.toLowerCase() == `atk` || message.toLowerCase() == `!atk`) {

                    let r = Math.floor(Math.random() * 6) + 7

                    client.say(channel, `/me ` + `@${userstate['display-name']} (${currentAllStats.level} lv), ulepszanie ataku (7-12). Twoje staty... ATK: ${currentAllStats.atk} +${r}, HP: ${currentAllStats.hp}, LUCK: ${currentAllStats.luck}`)
                    // console.log(`@${userstate['display-name']} (${currentAllStats.level} lv), wybrałeś ulepszenie siły ataku (7-12). Otrzymujesz... ${r} punktów ataku! Twoje staty to: ATK: ${currentAllStats.atk + r}, HP: ${currentAllStats.hp}, LUCK: ${currentAllStats.luck}`)

                    dbeco.viewers = dbeco.viewers.map(atk => {
                        if (atk.nickname === userstate.username) {
                            atk = ({
                                nickname: atk.nickname,
                                id: atk.id,
                                level: atk.level,
                                gold: atk.gold,
                                goldSpent: atk.goldSpent,
                                skillPoints: atk.skillPoints - 1,
                                bossesDefeated: atk.bossesDefeated,
                                dungeonsCompleted: atk.dungeonsCompleted,
                                winsInEvents: atk.winsInEvents,
                                atk: atk.atk + r,
                                hp: atk.hp,
                                luck: atk.luck,
                                fightsWon: atk.fightsWon,
                                fightsLost: atk.fightsLost
                            })
                        }
                        return atk;
                    });

                    fs.writeFile("./dbeco.json", JSON.stringify(dbeco), (err) => {
                        if (err) console.log(err);
                    });

                    return dbeco;

                } else if (message.toLowerCase() == `hp` || message.toLowerCase() == `!hp`) {

                    let r = Math.floor(Math.random() * 6) + 8

                    client.say(channel, `/me ` + `@${userstate['display-name']} (${currentAllStats.level} lv), ulepszanie zdrowia (8-13). Twoje staty... ATK: ${currentAllStats.atk}, HP: ${currentAllStats.hp} +${r}, LUCK: ${currentAllStats.luck}`)
                    // console.log(`@${userstate['display-name']} (${currentAllStats.level} lv), wybrałeś ulepszenie punktów zdrowia (8-13). Otrzymujesz... ${r} punktów zdrowia! Twoje staty to: ATK: ${currentAllStats.atk}, HP: ${currentAllStats.hp + r}, LUCK: ${currentAllStats.luck}`)

                    dbeco.viewers = dbeco.viewers.map(hp => {
                        if (hp.nickname === userstate.username) {
                            hp = ({
                                nickname: hp.nickname,
                                id: hp.id,
                                level: hp.level,
                                gold: hp.gold,
                                goldSpent: hp.goldSpent,
                                skillPoints: hp.skillPoints - 1,
                                bossesDefeated: hp.bossesDefeated,
                                dungeonsCompleted: hp.dungeonsCompleted,
                                winsInEvents: hp.winsInEvents,
                                atk: hp.atk,
                                hp: hp.hp + r,
                                luck: hp.luck,
                                fightsWon: hp.fightsWon,
                                fightsLost: hp.fightsLost
                            })
                        }
                        return hp;
                    });

                    fs.writeFile("./dbeco.json", JSON.stringify(dbeco), (err) => {
                        if (err) console.log(err);
                    });

                    return dbeco;

                } else if (message.toLowerCase() == `luck` || message.toLowerCase() == `!luck`) {

                    let r = Math.floor(Math.random() * 6) + 9

                    client.say(channel, `/me ` + `@${userstate['display-name']} (${currentAllStats.level} lv), ulepszanie szczęścia (9-14). Twoje staty... ATK: ${currentAllStats.atk}, HP: ${currentAllStats.hp}, LUCK: ${currentAllStats.luck} +${r}`)
                    // console.log(`@${userstate['display-name']} (${currentAllStats.level} lv), wybrałeś ulepszenie punktów szczęścia (9-14). Otrzymujesz... ${r} punktów szczęścia! Twoje staty to: ATK: ${currentAllStats.atk}, HP: ${currentAllStats.hp}, LUCK: ${currentAllStats.luck + r}`)

                    dbeco.viewers = dbeco.viewers.map(luck => {
                        if (luck.nickname === userstate.username) {
                            luck = ({
                                nickname: luck.nickname,
                                id: luck.id,
                                level: luck.level,
                                gold: luck.gold,
                                goldSpent: luck.goldSpent,
                                skillPoints: luck.skillPoints - 1,
                                bossesDefeated: luck.bossesDefeated,
                                dungeonsCompleted: luck.dungeonsCompleted,
                                winsInEvents: luck.winsInEvents,
                                atk: luck.atk,
                                hp: luck.hp,
                                luck: luck.luck + r,
                                fightsWon: luck.fightsWon,
                                fightsLost: luck.fightsLost
                            })
                        }
                        return luck;
                    });

                    fs.writeFile("./dbeco.json", JSON.stringify(dbeco), (err) => {
                        if (err) console.log(err);
                    });

                    return dbeco;

                } else if (message.toLowerCase() == `random` || message.toLowerCase() == `!random`) {

                    let r = Math.floor(Math.random() * 3) + 10

                    const [atak, hape, lucky] = generateRandomNumbers(r);

                    client.say(channel, `/me ` + `@${userstate['display-name']} (${currentAllStats.level} lv), ulepszanie losowe (10-12). Twoje staty +${r}... ATK: ${currentAllStats.atk} +${atak}, HP: ${currentAllStats.hp} +${hape}, LUCK: ${currentAllStats.luck} +${lucky}`)
                    // console.log(`@${userstate['display-name']} (${currentAllStats.level} lv), wybrałeś ulepszenie losowe (10-12). Otrzymujesz... ${atak} punktów ataku, ${hape} punktów zdrowia i ${lucky} punktów szczęścia! Twoje staty to: ATK: ${currentAllStats.atk + atak}, HP: ${currentAllStats.hp + hape}, LUCK: ${currentAllStats.luck + lucky}`)

                    dbeco.viewers = dbeco.viewers.map(random => {
                        if (random.nickname === userstate.username) {
                            random = ({
                                nickname: random.nickname,
                                id: random.id,
                                level: random.level,
                                gold: random.gold,
                                goldSpent: random.goldSpent,
                                skillPoints: random.skillPoints - 1,
                                bossesDefeated: random.bossesDefeated,
                                dungeonsCompleted: random.dungeonsCompleted,
                                winsInEvents: random.winsInEvents,
                                atk: random.atk + atak,
                                hp: random.hp + hape,
                                luck: random.luck + lucky,
                                fightsWon: random.fightsWon,
                                fightsLost: random.fightsLost
                            })
                        }
                        return random;
                    });

                    fs.writeFile("./dbeco.json", JSON.stringify(dbeco), (err) => {
                        if (err) console.log(err);
                    });

                    return dbeco;
                }
            }
        }
    }
});


// !jak
client.on('message', (channel, userstate, message, self) => {
    if (self || blockadeGlobal) return;

    if (message.toLowerCase() === `!jak`) {
        WhisperUser(userstate.username, `Jeśli wydasz punkt umiejętności na: 'ATK' - otrzymasz 7-12 punktów ataku, 'HP' - otrzymasz 8-13 punktów hp, 'LUCK' - otrzymasz 9-14 punktów szczęścia, 'RANDOM' - otrzymasz 10-12 punktów rozdanych losowo w losowe atrybuty. Czas na wybranie atrybutu to 20 sekund, więc wpisz raz jeszcze !skils i wybierz, co chcesz ulepszyć.`)
    }
});


// !restartgame
let currentUserRestartGame = []
let timersRestartGame = {};

client.on('message', (channel, userstate, message, self) => {
    if (self || blockadeGlobal) return;

    if (message.toLowerCase() === `!restartgame` || message.toLowerCase() === `!restart game` || message.toLowerCase() === `!resetgame` || message.toLowerCase() === `!reset game` || currentUserRestartGame.includes(userstate.username)) {

        let isFound = dbeco.viewers.find(a => a.nickname === userstate.username);
        if (!isFound) {
            client.say(channel, `/me ` + `@${userstate['display-name']}, nie ma cię w bazie danych. Wpisz !rename [staryNick]`)
            return;
        }

        let currentAllStats = getAllStatsByNickname(userstate.username)

        if (currentUserRestartGame == 0) {
            currentUserRestartGame.push(userstate.username)

            client.say(channel, `/me ` + `@${userstate['display-name']} (${currentAllStats.level} lv), czy na pewno chcesz zresetować cały swój progress? tak/nie`)
            // console.log(`@${userstate['display-name']} (${currentAllStats.level} lv), czy na pewno chcesz zresetować cały swój progress? tak/nie`)
        }

        if (!timersRestartGame[userstate.username]) {
            timersRestartGame[userstate.username] = setTimeout(() => {
                if (currentUserRestartGame.includes(userstate.username)) {
                    currentUserRestartGame = currentUserRestartGame.filter(user => user !== userstate.username);
                }
            }, 20000);
        }

        if (message.toLowerCase() === `nie`) {
            clearTimeout(timersRestartGame[userstate.username]);
            delete timersRestartGame[userstate.username];
            currentUserRestartGame = currentUserRestartGame.filter(user => user !== userstate.username);
        }

        if (message.toLowerCase() === `tak` && currentUserRestartGame.includes(userstate.username)) {

            clearTimeout(timersRestartGame[userstate.username]);
            delete timersRestartGame[userstate.username];
            currentUserRestartGame = currentUserRestartGame.filter(user => user !== userstate.username);

            dbeco.viewers = dbeco.viewers.map(restartgame => {
                if (restartgame.nickname === userstate.username) {
                    restartgame = ({
                        nickname: restartgame.nickname,
                        id: restartgame.id,
                        level: 1,
                        gold: 0,
                        goldSpent: 0,
                        skillPoints: 0,
                        bossesDefeated: 0,
                        dungeonsCompleted: 0,
                        winsInEvents: 0,
                        atk: 10,
                        hp: 20,
                        luck: 15,
                        fightsWon: 0,
                        fightsLost: 0
                    })
                }
                return restartgame;
            });

            fs.writeFile("./dbeco.json", JSON.stringify(dbeco), (err) => {
                if (err) console.log(err);
            });

            return dbeco;
        }
    }
});


// !top
let topx;

client.on('message', (channel, userstate, message, self) => {
    if (self || blockadeGlobal) return;

    if (message.toLowerCase().startsWith(`!top `) || message.toLowerCase() === `!top` || message.toLowerCase() === `!topka`) {

        let [raw, command, argument] = message.match(regexpCommands)

        let tempUser;

        if (message.toLowerCase().startsWith(`!top `) && (isNaN(argument) || argument < 1)) return;
        if (!argument) argument = 5
        argument = Math.min(argument, 10); // Limit to a maximum of 10 records

        const filteredViewers = dbeco.viewers.filter(viewer => viewer.nickname !== 'itzmaxinho');

        const sortedViewers = filteredViewers.slice().sort((a, b) => {
            if (b.level !== a.level) {
                return b.level - a.level; // Sort by level if levels are different
            } else {
                const totalGoldA = a.gold + a.goldSpent;
                const totalGoldB = b.gold + b.goldSpent;
                return totalGoldB - totalGoldA;
            }
        });

        topx = `TOP${argument}: `;
        const maxRecords = Math.min(sortedViewers.length, argument);

        for (let i = 0; i < maxRecords; i++) {
            const viewer = sortedViewers[i];

            if (viewer.nickname !== 'itzmaxinho') { // fresh topka

                const viewer1 = db.saveID.find(v => v.nickname === viewer.nickname);
                if (viewer1) {
                    tempUser = viewer1.displayName
                }

                topx += `${i + 1}. ${tempUser} (${viewer.level} lv)`;
                if (i < maxRecords - 1) {
                    topx += ", ";
                }
            }
        }
        client.say(channel, `/me ` + topx)
    }
});


// !zagarazami
client.on('message', (channel, userstate, message, self) => {
    if (self || blockadeGlobal) return;

    if (message.toLowerCase().startsWith(`!zagara`) || message.toLowerCase().startsWith(`!za gara`)) {

        let isFound = dbeco.viewers.find(a => a.nickname === userstate.username);
        if (!isFound) {
            client.say(channel, `/me ` + `@${userstate['display-name']}, nie ma cię w bazie danych. Wpisz !rename [staryNick]`)
            return;
        }

        const currentUser = dbeco.viewers.find(user => user.nickname === userstate.username);

        const currentUserLevel = currentUser.level;

        const filteredUsers = dbeco.viewers
            .filter(user => user.nickname !== "bot__maciek" && user.nickname !== "tester" && user.nickname !== "itzmaxinho")
            .filter(user => currentViewers.includes(user.nickname))
            .filter(user => Math.abs(user.level - currentUserLevel) <= 3)
            .sort((a, b) => b.level - a.level);

        const levelsToCompare = [3, 2, 1, 0, -1, -2, -3];
        const maxPlayersPerLevel = 2;

        const groupedUsers = {};

        levelsToCompare.forEach(diff => {
            const levelToCompare = currentUserLevel + diff;
            const usersAtLevel = filteredUsers.filter(user => user.level === levelToCompare);
            groupedUsers[levelToCompare] = usersAtLevel.slice(0, maxPlayersPerLevel);
        });

        const result = [];

        levelsToCompare.forEach(diff => {
            const levelToCompare = currentUserLevel + diff;
            const usersAtLevel = groupedUsers[levelToCompare];
            if (usersAtLevel) {
                usersAtLevel.forEach(user => {
                    result.push(`${user.nickname} (${user.level} lv)`);
                });
            }
        });

        const resultString = result.join(', ');

        WhisperUser(userstate.username, `Twój level: ${currentUserLevel}. Lista graczy do walki: ` + resultString)
    }

    // jakies gowno
    if (message.toLowerCase().startsWith(`!somsiedzi`)) {
        const currentUserLevel = getLevelByNickname(userstate.username);

        const filteredUsers = dbeco.viewers.filter(user => {
            const userLevel = user.level;
            return userLevel >= currentUserLevel - 3 && userLevel <= currentUserLevel + 3;
        });

        filteredUsers.sort((a, b) => b.level - a.level);

        const levelsToCompare = [3, 2, 1, 0, -1, -2, -3];
        const maxPlayersPerLevel = 2;

        const groupedUsers = {};

        levelsToCompare.forEach(diff => {
            const levelToCompare = currentUserLevel + diff;
            const usersAtLevel = filteredUsers.filter(user => user.level === levelToCompare);
            groupedUsers[levelToCompare] = usersAtLevel.slice(0, maxPlayersPerLevel);
        });

        const result = [];

        levelsToCompare.forEach(diff => {
            const levelToCompare = currentUserLevel + diff;
            const usersAtLevel = groupedUsers[levelToCompare];
            if (usersAtLevel) {
                usersAtLevel.forEach(user => {
                    result.push(`${user.nickname} (${user.level} level)`);
                });
            }
        });

        const resultString = result.join(', ');

        WhisperUser(userstate.username, `Twój level: ${currentUserLevel}. Lista graczy do walki: ` + resultString)
    }
});


// !rename !lubiezmieniacnicki
client.on('message', (channel, userstate, message, self) => {
    if (self || blockadeGlobal) return;

    if (message.toLowerCase().startsWith(`!rename`)
        || message.toLowerCase().startsWith(`!lubiezmieniacnick`)
        || message.toLowerCase().startsWith(`!lubięzmieniacnick`)
        || message.toLowerCase().startsWith(`!lubiezmieniaćnick`)
        || message.toLowerCase().startsWith(`!lubięzmieniaćnick`)) {

        let [raw, command, argument] = message.match(regexpCommands)

        if (!argument) return;
        const oldNick = getOldNickById(userstate['user-id'])

        if (argument.toLowerCase() == oldNick && userstate.username != oldNick) {
            client.say(channel, `/me ` + `@${userstate['display-name']}, pomyślnie zmieniono nick!`)

            dbeco.viewers = dbeco.viewers.map(nicknameChange => {
                if (nicknameChange.id === userstate['user-id']) {
                    nicknameChange = ({
                        nickname: userstate.username,
                        id: nicknameChange.id,
                        level: nicknameChange.level,
                        gold: nicknameChange.gold,
                        goldSpent: nicknameChange.goldSpent,
                        skillPoints: nicknameChange.skillPoints,
                        bossesDefeated: nicknameChange.bossesDefeated,
                        dungeonsCompleted: nicknameChange.dungeonsCompleted,
                        winsInEvents: nicknameChange.winsInEvents,
                        atk: nicknameChange.atk,
                        hp: nicknameChange.hp,
                        luck: nicknameChange.luck,
                        fightsWon: nicknameChange.fightsWon,
                        fightsLost: nicknameChange.fightsLost
                    })
                }
                return nicknameChange;
            });

            fs.writeFile("./dbeco.json", JSON.stringify(dbeco), (err) => {
                if (err) console.log(err);
            });

            return dbeco;
        } else {
            client.say(channel, `/me ` + `@${userstate['display-name']}, nie znaleziono takiego nicku.`)
        }
    }
});


// !!sklep
let listOfItems = [
    `LOSPlus : 250 golda. Dodatkowy wygrywający numer w !los (trafiony los resetuje LOSyPlus wszystkich)`,
    `Komenda : 1000 golda. Własna komenda na czacie`,
    `Umiejka : min. 500 golda. Punkt umiejętności do ulepszania statystyk`,
    `Drop : 777 golda. Otwieram rzadki drop w RL. Ty zgarniasz co wypadnie`,
]
let buyers = [];
let currentLvl;
let randomItem;
let wasChoosen = false;
let blockadeShop = false;
let delayBetweenShopInSeconds = 90;
let umiejkaPass = false;
let currentFightStatsUmiejka;
let goldNeededForUmiejka;
let currentGoldShop;
let timersUmiejka = {};

client.on('message', (channel, userstate, message, self) => {
    if (self || blockadeGlobal) return;

    if (userstate.mod && message.toLowerCase() === `!resetsklep`) {
        umiejkaPass = false;
    }

    if (!wasChoosen) {
        randomItem = listOfItems[Math.floor(Math.random() * listOfItems.length)]
        wasChoosen = true;
    }

    if (!blockadeShop && (message.toLowerCase().startsWith(`!sklep`) || message.toLowerCase().startsWith(`!shop`))) {
        blockadeShop = true;
        setTimeout(() => {
            blockadeShop = false;
        }, delayBetweenShopInSeconds * 1000);

        client.say(channel, `/me ` + `|> Sklep na dziś:`)
        client.say(channel, `/me ` + `|> ${randomItem}`)
        client.say(channel, `/me ` + `|> !kup [nazwaItemu], aby kupić. Sklep resetuje się codziennie o 19:00.`)
    }

    if (message.toLowerCase().startsWith(`!kup `) || message.toLowerCase().startsWith(`!buy `)) {

        let isFound = dbeco.viewers.find(a => a.nickname === userstate.username);
        if (!isFound) {
            client.say(channel, `/me ` + `@${userstate['display-name']}, nie ma cię w bazie danych. Wpisz !rename [staryNick]`)
            return;
        }

        let [raw, command, argument] = message.match(regexpCommands)

        if (!argument) return;

        currentGoldShop = getGoldByNickname(userstate.username)
        currentLvl = getLevelByNickname(userstate.username)
        //losplus1/2
        if (randomItem == listOfItems[0] && argument.toLowerCase() === `losplus` && currentGoldShop >= 250) {

            // console.log(`@${userstate['display-name']} (${currentLvl} lv), dziękuję za zakup. Jaki numer wybierasz?`)
            client.say(channel, `/me ` + `@${userstate['display-name']} (${currentLvl} lv), dziękuję za zakup. Jaki numer wybierasz?`)

            buyers.push(userstate['display-name'])

            dbeco.viewers = dbeco.viewers.map(losplus => {
                if (losplus.nickname === userstate.username) {
                    losplus = ({
                        nickname: losplus.nickname,
                        id: losplus.id,
                        level: losplus.level,
                        gold: losplus.gold - 250,
                        goldSpent: losplus.goldSpent + 250,
                        skillPoints: losplus.skillPoints,
                        bossesDefeated: losplus.bossesDefeated,
                        dungeonsCompleted: losplus.dungeonsCompleted,
                        winsInEvents: losplus.winsInEvents,
                        atk: losplus.atk,
                        hp: losplus.hp,
                        luck: losplus.luck,
                        fightsWon: losplus.fightsWon,
                        fightsLost: losplus.fightsLost
                    })
                }
                return losplus;
            });

            fs.writeFile("./dbeco.json", JSON.stringify(dbeco), (err) => {
                if (err) console.log(err);
            });

            return dbeco;

        } else if (randomItem == listOfItems[0] && argument.toLowerCase() === `losplus` && currentGoldShop < 250) {
            // console.log(`@${userstate['display-name']}, posiadasz za mało siana.`)
            client.say(channel, `/me ` + `@${userstate['display-name']} (${currentLvl} lv), posiadasz za mało siana.`)
        }

        //komenda1/1
        if (randomItem == listOfItems[1] && argument.toLowerCase() === `komenda` && currentGoldShop >= 1000) {

            // console.log(`@${userstate['display-name']}, kupiłeś własną komendę na czat. Zrób screena tej wiadomości i wyślij do streamera na priv. !dc`)
            client.say(channel, `/me ` + `@${userstate['display-name']} (${currentLvl} lv), kupiłeś własną komendę na czat. Zrób screena tej wiadomości i wyślij do streamera na priv. !dc`)

            dbeco.viewers = dbeco.viewers.map(komenda => {
                if (komenda.nickname === userstate.username) {
                    komenda = ({
                        nickname: komenda.nickname,
                        id: komenda.id,
                        level: komenda.level,
                        gold: komenda.gold - 1000,
                        goldSpent: komenda.goldSpent + 1000,
                        skillPoints: komenda.skillPoints,
                        bossesDefeated: komenda.bossesDefeated,
                        dungeonsCompleted: komenda.dungeonsCompleted,
                        winsInEvents: komenda.winsInEvents,
                        atk: komenda.atk,
                        hp: komenda.hp,
                        luck: komenda.luck,
                        fightsWon: komenda.fightsWon,
                        fightsLost: komenda.fightsLost
                    })
                }
                return komenda;
            });

            fs.writeFile("./dbeco.json", JSON.stringify(dbeco), (err) => {
                if (err) console.log(err);
            });

            return dbeco;

        } else if (randomItem == listOfItems[1] && argument.toLowerCase() === `komenda` && currentGoldShop < 1000) {
            // console.log(`@${userstate['display-name']}, posiadasz za mało mamm0ny.`)
            client.say(channel, `/me ` + `@${userstate['display-name']}, posiadasz za mało mamm0ny.`)
        }

        //umiejka1/2
        if (randomItem == listOfItems[2] && argument.toLowerCase() === 'umiejka' && !umiejkaPass) {
            currentFightStatsUmiejka = getFightStatsByNickname(userstate.username);
            goldNeededForUmiejka = ((currentFightStatsUmiejka.atk + currentFightStatsUmiejka.hp + currentFightStatsUmiejka.luck) * currentFightStatsUmiejka.level) / 2
            umiejkaPass = true;

            if (goldNeededForUmiejka < 500) {
                goldNeededForUmiejka = 500
            }

            client.say(channel, `/me ` + `@${userstate['display-name']} (${currentLvl} lv), cena umiejki dla ciebie to ${goldNeededForUmiejka.toFixed(0)}. Czy na pewno chcesz kupić?`)

            if (!timersUmiejka[userstate.username]) {
                timersUmiejka[userstate.username] = setTimeout(() => {
                    if (umiejkaPass) {
                        delete timersUmiejka[userstate.username];
                        umiejkaPass = false;
                    }
                }, 15000);
            }
        }

        //drop1/1
        if (randomItem == listOfItems[3] && argument.toLowerCase() === 'drop' && currentGoldShop >= 777) {

            // console.log(`@${userstate['display-name']}, kupiłeś rzadki drop. Zrób screena tej wiadomości i wyślij do streamera na priv. !dc`)
            client.say(channel, `/me ` + `@${userstate['display-name']} (${currentLvl} lv), kupiłeś rzadki drop. Zrób screena tej wiadomości i wyślij do streamera na priv. !dc`)

            dbeco.viewers = dbeco.viewers.map(drop => {
                if (drop.nickname === userstate.username) {
                    drop = ({
                        nickname: drop.nickname,
                        id: drop.id,
                        level: drop.level,
                        gold: drop.gold - 777,
                        goldSpent: drop.goldSpent + 777,
                        drops: drop.skillPoints,
                        bossesDefeated: drop.bossesDefeated,
                        dungeonsCompleted: drop.dungeonsCompleted,
                        winsInEvents: drop.winsInEvents,
                        atk: drop.atk,
                        hp: drop.hp,
                        luck: drop.luck,
                        fightsWon: drop.fightsWon,
                        fightsLost: drop.fightsLost
                    })
                }
                return drop;
            });

            fs.writeFile("./dbeco.json", JSON.stringify(dbeco), (err) => {
                if (err) console.log(err);
            });

            return dbeco;

        } else if (randomItem == listOfItems[3] && argument.toLowerCase() === 'drop' && currentGoldShop < 777) {
            // console.log(`@${userstate['display-name']}, posiadasz za mało hajsu.`)
            client.say(channel, `/me ` + `@${userstate['display-name']} (${currentLvl} lv), posiadasz za mało hajsu.`)
        }
    }

    //umiejka2/2
    if (randomItem == listOfItems[2] && message.toLowerCase() === 'tak' && umiejkaPass) {

        currentGoldShop = getGoldByNickname(userstate.username)
        currentFightStatsUmiejka = getFightStatsByNickname(userstate.username);
        goldNeededForUmiejka = ((currentFightStatsUmiejka.atk + currentFightStatsUmiejka.hp + currentFightStatsUmiejka.luck) * currentFightStatsUmiejka.level) / 2

        if (goldNeededForUmiejka < 500) {
            goldNeededForUmiejka = 500
        }

        if (currentGoldShop >= goldNeededForUmiejka) {

            clearTimeout(timersUmiejka[userstate.username]);
            delete timersUmiejka[userstate.username];
            umiejkaPass = false;

            client.say(channel, `/me ` + `@${userstate['display-name']} (${currentLvl} lv), kupiłeś punkt umiejętności. Możesz go teraz wykorzystać.`)

            dbeco.viewers = dbeco.viewers.map(skillpoint => {
                if (skillpoint.nickname === userstate.username) {
                    skillpoint = ({
                        nickname: skillpoint.nickname,
                        id: skillpoint.id,
                        level: skillpoint.level,
                        gold: skillpoint.gold - goldNeededForUmiejka,
                        goldSpent: skillpoint.goldSpent + goldNeededForUmiejka,
                        skillPoints: skillpoint.skillPoints + 1,
                        bossesDefeated: skillpoint.bossesDefeated,
                        dungeonsCompleted: skillpoint.dungeonsCompleted,
                        winsInEvents: skillpoint.winsInEvents,
                        atk: skillpoint.atk,
                        hp: skillpoint.hp,
                        luck: skillpoint.luck,
                        fightsWon: skillpoint.fightsWon,
                        fightsLost: skillpoint.fightsLost
                    })
                }
                return skillpoint;
            });

            fs.writeFile("./dbeco.json", JSON.stringify(dbeco), (err) => {
                if (err) console.log(err);
            });

            return dbeco;

        } else if (currentGoldShop < goldNeededForUmiejka) {

            clearTimeout(timersUmiejka[userstate.username]);
            delete timersUmiejka[userstate.username];
            umiejkaPass = false;

            // console.log(`@${userstate['display-name']}, posiadasz za mało siana.`)
            client.say(channel, `/me ` + `@${userstate['display-name']}, posiadasz za mało siana.`)
        }
    }

    //losplus2/2
    if (buyers.includes(userstate['display-name']) && (0 < message < maxNumber - 1 && message != winningNumber)) {

        // console.log(`@${userstate['display-name']}, numer dodany.`)
        client.say(channel, `/me ` + `@${userstate['display-name']} (${currentLvl} lv), numer dodany.`)

        const index = buyers.indexOf(userstate['display-name']);
        if (index > -1) {
            buyers.splice(index, 1);
        }
        const isInDB = dbtime.extraNumbers.find(a => a.nickname === userstate.username);

        if (!isInDB) {
            dbtime.extraNumbers.push({ nickname: userstate.username, numbers: "" });

        } else {

            dbtime.extraNumbers = dbtime.extraNumbers.map(addNumber => {
                if (addNumber.nickname === userstate.username) {
                    addNumber = ({
                        nickname: addNumber.nickname,
                        numbers: addNumber.numbers + message + ` `
                    })
                }
                return addNumber;
            });

            fs.writeFile("./dbtime.json", JSON.stringify(dbtime), (err) => {
                if (err) console.log(err);
            });

            return dbtime;
        }
    } else if (buyers.includes(userstate['display-name'])) {
        client.say(channel, `/me ` + `@${userstate['display-name']} (${currentLvl} lv), wybierz jeszcze raz.`)
        // console.log(`@${userstate['display-name']}, wybierz jeszcze raz.`)
    }
});

// !dungeon TODO
let dungBoss;
let dungATK;
let dungHP;
let dungLUCK;
let dungWorth;
let tempDungLog = [];
// let blockadeBoks = true;
// let blockFIGHT = false;
let captainLevel;
let currentStage = 0;
let minLevelToEntry = 15;
let tempCaptain = [];
let dungeonTeammates = []
let dungeonInvited = [];
let timersDungeon = {};
let itemsToBuyDung = [
    `ult`,
    `bron`,
    `kev`,
    `koniczyna`,
]
let boughtItems = {}

let ultSkillDung = false;
let bronSkillDung = false;
let kevSkillDung = false;
let koniczynaSkillDung = false;

// stage 3
let ultCost = 100;
let bronCost = 200;
let kevCost = 300;
let koniczynaCost = 400;

let ultDung = `ult: ${ultCost} golda, `;
let bronDung = `bron: ${bronCost} golda, `;
let kevDung = `kev: ${kevCost} golda, `;
let koniczynaDung = `koniczyna: ${koniczynaCost} golda `;
// stage 3
// stage 4
let dungContestant

client.on('message', (channel, userstate, message, self) => {
    if (self || blockadeGlobal) return;

    // if (message.toLowerCase() === `!dungeon`) {
    //     let noob = getLevelByNickname(userstate.username)

    //     client.say(channel, `/me ` + `@${userstate['display-name']} (${noob} lv), masz zbyt niski poziom. Wymagany poziom: 15`)

    //     if (noob >= 15) {
    //         setTimeout(() => {
    //             client.say(channel, `/me ` + `Odbiór. O gurwa jednak ktoś wbił ten 15 KEKW Dobra zmiana komunikatu: @${userstate['display-name']} (${noob} lv), masz zbyt niski poziom. Wymagany poziom: 20 KEKW`)
    //         }, 2000);
    //     }
    // }

    // return;

    if (tempCaptain.includes(userstate.username) && ((message.toLowerCase() === `!cancel` || message.toLowerCase() === `!abandon` || message.toLowerCase() === `!zakoncz` || message.toLowerCase() === `!zakończ` || message.toLowerCase() === `!wyjdz` || message.toLowerCase() === `!wyjdź`))) {
        //client.say(channel, `/me ` + `@${userstate['display-name']}, najazd zostaje odwołany...`)
        console.log(`@${userstate['display-name']}, najazd zostaje odwołany...`)

        tempCaptain = [];
        dungeonTeammates = [];
        dungeonInvited = [];
        currentStage = 0;

        ultSkillDung = false;
        bronSkillDung = false;
        kevSkillDung = false;
        koniczynaSkillDung = false;
    }

    if (dungeonInvited.includes(userstate.username) && (message.toLowerCase() === `!zgoda` || message.toLowerCase() === `!ok` || message.toLowerCase() === `!tak` || message.toLowerCase() === `!join` || message.toLowerCase() === `!dołącz` || message.toLowerCase() === `!dolacz` || message.toLowerCase() === `!ready` || message.toLowerCase().startsWith(`!got`) || message.toLowerCase().startsWith(`!zgadz`))) {
        //client.say(channel, `/me ` + `@${userstate['display-name']}, dołączasz do drużyny!`)
        console.log(`@${userstate['display-name']}, dołączasz do drużyny!`)
        dungeonTeammates.push(userstate.username)
        const index = dungeonInvited.indexOf(userstate.username);
        if (index > -1) {
            dungeonInvited.splice(index, 1);
        }
    }

    if (message.toLowerCase().startsWith(`!dungeon`) || tempCaptain.includes(userstate.username)) {

        if (tempCaptain.length == 0) {
            tempCaptain.push(userstate.username)
            console.log("tempCaptain: " + tempCaptain)
            captainLevel = getLevelByNickname(userstate.username)
        }

        if (!timersDungeon[userstate.username]) {
            timersDungeon[userstate.username] = setTimeout(() => {
                if (tempCaptain.includes(userstate.username)) {
                    tempCaptain = tempCaptain.filter(user => user !== userstate.username);
                }

                //client.say(channel, `/me ` + `Najazd zostaje odwołany...`)
                console.log(`Najazd zostaje odwołany...`)

                tempCaptain = [];
                dungeonTeammates = [];
                dungeonInvited = [];
                currentStage = 0;

                ultSkillDung = false;
                bronSkillDung = false;
                kevSkillDung = false;
                koniczynaSkillDung = false;

            }, 3000000);
        }

        if (currentStage == 0 && captainLevel < minLevelToEntry) {

            const index = tempCaptain.indexOf(userstate.username);
            if (index > -1) {
                tempCaptain.splice(index, 1);
            }

            console.log(`@${userstate['display-name']} (${captainLevel} lv), dungeony dostępne są od ${minLevelToEntry} lvl.`)
            // client.say(channel, `/me ` + `@${userstate['display-name']} (${captainLevel} lv), dungeony dostępne są od ${minLevelToEntry} lvl.`)
            return;

        } else if (currentStage == 0) {
            console.log(`|> Krecie Piekło`)
            console.log(`|>> Piwnica Babci`)
            console.log(`|>>> Katakumby Bestialstwa`)
            // client.say(channel, `/me ` + `|> Krecie Piekło`)
            // client.say(channel, `/me ` + `|>> Piwnica Babci`)
            // client.say(channel, `/me ` + `|>>> Katakumby Bestialstwa`)
            currentStage = 1;
        }

        if (currentStage == 1 && tempCaptain.includes(userstate.username) && (message.toLowerCase().startsWith(`kreci`) || message.toLowerCase().startsWith(`piwni`) || message.toLowerCase().startsWith(`kataku`))) {

            console.log(`@${userstate['display-name']} (${captainLevel} lv), możesz dobrać sobie kompanów (max 2). Użyj !inv @nickname, aby zaprosić do grupy. Lub przejdź po prostu !dalej`)
            // client.say(channel, `/me ` + `@${userstate['display-name']} (${captainLevel} lv), możesz dobrać sobie kompanów (max 2), którzy pomogą ci w tej misji. Użyj !inv @nickname, aby zaprosić do grupy.`)

            if (message.toLowerCase().startsWith(`kreci`)) {
                dungBoss = `kret`
                dungATK = 100
                dungHP = 700
                dungLUCK = 75
                dungWorth = 1
                currentStage = 2

            } else if (message.toLowerCase().startsWith(`piwni`)) {
                dungBoss = `babcia`
                dungATK = 210
                dungHP = 680
                dungLUCK = 125
                dungWorth = 2
                currentStage = 2

            } else if (message.toLowerCase().startsWith(`kataku`)) {
                dungBoss = `bestia`
                dungATK = 300
                dungHP = 1150
                dungLUCK = 200
                dungWorth = 3
                currentStage = 2
            }
        }

        if (currentStage == 2 && tempCaptain.includes(userstate.username)) {
            if (message.toLowerCase().startsWith(`!inv`) && dungeonTeammates.length <= 2) {

                let [raw, command, argument, rest, rest2, rest3] = message.match(regexpCommandRest3);

                if (rest == `i` || rest == `oraz`) rest = rest2;

                if (!argument) {
                    console.log(`@${userstate['display-name']} (${captainLevel} lv), oznacz osobę, którą chcesz zaprosić do party.`)
                    //client.say(channel, `/me ` + `@${userstate['display-name']} (${captainLevel} lv), oznacz osobę, którą chcesz zaprosić do party.`)
                    return;

                } else if (argument && !rest) {

                    let argLvl = getLevelByNickname(argument.toLowerCase())
                    console.log(argLvl)

                    console.log("currentViewers: " + currentViewers)
                    let displayName = usernameToDisplayName(argument.toLowerCase())

                    if (!displayName) {
                        console.log(`Zła nazwa użytkownika!`)
                        //client.say(channel, `/me ` + `Zła nazwa użytkownika!`)}
                        return;

                    } else if (!currentViewers.includes(argument.toLowerCase())) {
                        console.log(`@${displayName} (${argLvl} lv) jest teraz OFFline.`)
                        //client.say(channel, `/me ` + `@${displayName} (${argLvl} lv) jest teraz OFFline.`)
                        return;

                    } else if (argLvl < 15) {
                        console.log(`@${displayName} (${argLvl} lv) ma za niski lvl.`)
                        // client.say(channel, `/me ` + `@${displayName} (${argLvl} lv) ma za niski lvl.`)
                        return;

                    } else {
                        console.log(`@${userstate['display-name']} (${captainLevel} lv), zaproszono @${displayName} (${argLvl} lv)`)
                        // client.say(channel, `/me ` + `@${userstate['display-name']} (${captainLevel} lv), zaproszono @${displayName} (${argLvl} lv)`)
                        dungeonInvited.push(argument.toLowerCase())
                    }

                } else if (argument && rest) {

                    let argLvl = getLevelByNickname(argument.toLowerCase())
                    console.log(argLvl)
                    let restLvl = getLevelByNickname(rest.toLowerCase())
                    console.log(restLvl)

                    console.log("currentViewers: " + currentViewers)
                    let displayNameArgument = usernameToDisplayName(argument.toLowerCase())
                    let displayNameRest = usernameToDisplayName(rest.toLowerCase())

                    if (!displayNameArgument) {
                        console.log(`Zła nazwa użytkownika! (${argument})`)
                        //client.say(channel, `/me ` + `Zła nazwa użytkownika!`)}

                    } else if (!currentViewers.includes(argument.toLowerCase())) {
                        console.log(`@${displayNameArgument} (${argLvl} lv) jest teraz OFFline.`)
                        // client.say(channel, `/me ` + `@${displayNameArgument} (${argLvl} lv) jest teraz OFFline.`)

                    } else if (dungeonInvited.includes(argument.toLowerCase())) {
                        console.log(`@${displayNameRest} (${argLvl} lv) jest już zaproszony.`)
                        //client.say(channel, `/me ` + `@${displayNameRest} (${argLvl} lv) jest już zaproszony.`)

                    } else if (argLvl < 15) {
                        console.log(`@${displayNameArgument} (${argLvl} lv) ma za niski lvl.`)
                        //client.say(channel, `/me ` + `@${displayNameArgument} (${argLvl} lv) ma za niski lvl.`)

                    } else {
                        console.log(`@${userstate['display-name']} (${captainLevel} lv), zaproszono @${displayNameArgument} (${argLvl} lv)`)
                        //client.say(channel, `/me ` + `@${userstate['display-name']} (${captainLevel} lv), zaproszono @${displayNameArgument} (${argLvl} lv)`)
                        dungeonInvited.push(argument.toLowerCase())
                    }

                    if (!displayNameRest) {
                        console.log(`Zła nazwa użytkownika! (${rest})`)
                        //client.say(channel, `/me ` + `Zła nazwa użytkownika!`)}

                    } else if (!currentViewers.includes(rest.toLowerCase())) {
                        console.log(`@${displayNameRest} (${restLvl} lv) jest teraz OFFline.`)
                        //client.say(channel, `/me ` + `@${displayNameRest} (${restLvl} lv) jest teraz OFFline.`)

                    } else if (dungeonInvited.includes(rest.toLowerCase())) {
                        console.log(`@${displayNameRest} (${restLvl} lv) jest już zaproszony.`)
                        //client.say(channel, `/me ` + `@${displayNameRest} (${restLvl} lv) jest już zaproszony.`)

                    } else if (argLvl < 15) {
                        console.log(`@${displayNameRest} (${restLvl} lv) ma za niski lvl.`)
                        //client.say(channel, `/me ` + `@${displayNameRest} (${restLvl} lv) ma za niski lvl.`)

                    } else {
                        console.log(`@${userstate['display-name']} (${captainLevel} lv), zaproszono @${displayNameRest} (${restLvl} lv)`)
                        //client.say(channel, `/me ` + `@${userstate['display-name']} (${captainLevel} lv), zaproszono @${displayNameRest} (${restLvl} lv)`)
                        dungeonInvited.push(rest.toLowerCase())
                    }
                }

            } else if (message.toLowerCase() === `!dalej` && dungeonInvited.length > 0) {
                console.log(`@${userstate['display-name']} (${captainLevel} lv), nie wszyscy są gotowi, czy chcesz wyruszyć bez nich? !tak / !nie - usuwa zaproszenia.`)
                //client.say(channel, `/me ` + `@${userstate['display-name']} (${captainLevel} lv), nie wszyscy są gotowi, czy chcesz wyruszyć bez nich? !tak / !nie - usuwa zaproszenia.`)
                // dungeonDecision = true;

            } else if (message.toLowerCase() === `!dalej` || message.toLowerCase() === `!tak`) {
                currentStage = 3;

                if (dungeonTeammates.length == 2) {
                    console.log(`Drużyna: ${userstate['display-name']} (${captainLevel} lv), ${usernameToDisplayName(dungeonTeammates[0])} (${getLevelByNickname(dungeonTeammates[0])} lv), ${usernameToDisplayName(dungeonTeammates[1])} (${getLevelByNickname(dungeonTeammates[1])} lv)`)
                    //client.say(channel, `/me ` + `Drużyna: ${userstate['display-name']} (${captainLevel} lv), ${usernameToDisplayName(dungeonTeammates[0])} (${getLevelByNickname(dungeonTeammates[0])} lv), ${usernameToDisplayName(dungeonTeammates[1])} (${getLevelByNickname(dungeonTeammates[1])} lv)`)
                } else if (dungeonTeammates.length == 1) {
                    console.log(`Drużyna: ${userstate['display-name']} (${captainLevel} lv), ${usernameToDisplayName(dungeonTeammates[0])} (${getLevelByNickname(dungeonTeammates[0])} lv)`)
                    //client.say(channel, `/me ` + `Drużyna: ${userstate['display-name']} (${captainLevel} lv), ${usernameToDisplayName(dungeonTeammates[0])} (${getLevelByNickname(dungeonTeammates[0])} lv)`)
                } else if (dungeonTeammates.length == 0) {
                    console.log(`Drużyna: ${userstate['display-name']} (${captainLevel} lv) - ONE MAN ARMY, LET'S GO!`)
                    //client.say(channel, `/me ` + `Drużyna: ${userstate['display-name']} (${captainLevel} lv) - ONE MAN ARMY, LET'S GO!`)
                }
                dungeonInvited = []

                setTimeout(() => {
                    //client.say(channel, `/me ` + `@${userstate['display-name']} (${captainLevel} lv), ostatni przystanek: SKLEP: ult: 100 golda, broń: 200 golda, kev: 300 golda, koniczyna: 400 golda | '!letsgo', aby wejść do dungeonu.`)
                    console.log(`@${userstate['display-name']} (${captainLevel} lv), ostatni przystanek: SKLEP: ult: 100 golda, broń: 200 golda, kev: 300 golda, koniczyna: 400 golda | '!letsgo', aby wejść do dungeonu.`)
                }, 2000);

            } else if (message.toLowerCase() === `!nie`) {
                dungeonInvited = []
            }
        }

        if (currentStage == 3 && (tempCaptain.includes(userstate.username) || dungeonTeammates.includes(userstate.username))) {

            let goldLeft = getGoldByNickname(userstate.username)
            console.log("itemsToBuyDung: " + itemsToBuyDung)
            if (message.toLowerCase().startsWith('ult') && goldLeft > ultCost && itemsToBuyDung.includes(`ult`)) {
                ultSkillDung = true;
                boughtItems.ult = userstate.username;
                itemsToBuyDung.splice(`ult`, 1);
                ultDung = '';
                // client.say(channel, `/me ` + `SKLEP: ${ultDung}${bronDung}${kevDung}${koniczynaDung}| '!letsgo', aby wejść do dungeonu.`)
                console.log(`SKLEP: ${ultDung}${bronDung}${kevDung}${koniczynaDung}| '!letsgo', aby wejść do dungeonu.`)

                dbeco.viewers = dbeco.viewers.map(ult => {
                    if (ult.nickname === userstate.username) {
                        ult = ({
                            nickname: ult.nickname,
                            id: ult.id,
                            level: ult.level,
                            gold: ult.gold - ultCost,
                            goldSpent: ult.goldSpent + ultCost,
                            skillPoints: ult.skillPoints,
                            bossesDefeated: ult.bossesDefeated,
                            dungeonsCompleted: ult.dungeonsCompleted,
                            winsInEvents: ult.winsInEvents,
                            atk: ult.atk,
                            hp: ult.hp,
                            luck: ult.luck,
                            fightsWon: ult.fightsWon,
                            fightsLost: ult.fightsLost
                        })
                    }
                    return ult;
                });

                fs.writeFile("./dbeco.json", JSON.stringify(dbeco), (err) => {
                    if (err) console.log(err);
                });

                return dbeco;

            } else if (message.toLowerCase().startsWith('bro') && goldLeft > bronCost && itemsToBuyDung.includes(`bro`)) {
                bronSkillDung = true;
                boughtItems.bron = userstate.username;
                itemsToBuyDung.splice(`bron`, 1);
                bronDung = '';

                // client.say(channel, `/me ` + `SKLEP: ${ultDung}${bronDung}${kevDung}${koniczynaDung}| '!letsgo', aby wejść do dungeonu.`)
                console.log(`SKLEP: ${ultDung}${bronDung}${kevDung}${koniczynaDung}| '!letsgo', aby wejść do dungeonu.`)

                dbeco.viewers = dbeco.viewers.map(bron => {
                    if (bron.nickname === userstate.username) {
                        bron = ({
                            nickname: bron.nickname,
                            id: bron.id,
                            level: bron.level,
                            gold: bron.gold - bronCost,
                            goldSpent: bron.goldSpent + bronCost,
                            skillPoints: bron.skillPoints,
                            bossesDefeated: bron.bossesDefeated,
                            dungeonsCompleted: bron.dungeonsCompleted,
                            winsInEvents: bron.winsInEvents,
                            atk: bron.atk,
                            hp: bron.hp,
                            luck: bron.luck,
                            fightsWon: bron.fightsWon,
                            fightsLost: bron.fightsLost
                        })
                    }
                    return bron;
                });

                fs.writeFile("./dbeco.json", JSON.stringify(dbeco), (err) => {
                    if (err) console.log(err);
                });

                return dbeco;

            } else if (message.toLowerCase().startsWith('kev') && goldLeft > kevCost && itemsToBuyDung.includes(`kev`)) {
                kevSkillDung = true;
                boughtItems.kev = userstate.username;
                itemsToBuyDung.splice(`kev`, 1);
                kevDung = '';
                // client.say(channel, `/me ` + `SKLEP: ${ultDung}${bronDung}${kevDung}${koniczynaDung}| '!letsgo', aby wejść do dungeonu.`)
                console.log(`SKLEP: ${ultDung}${bronDung}${kevDung}${koniczynaDung}| '!letsgo', aby wejść do dungeonu.`)

                dbeco.viewers = dbeco.viewers.map(kev => {
                    if (kev.nickname === userstate.username) {
                        kev = ({
                            nickname: kev.nickname,
                            id: kev.id,
                            level: kev.level,
                            gold: kev.gold - kevCost,
                            goldSpent: kev.goldSpent + kevCost,
                            skillPoints: kev.skillPoints,
                            bossesDefeated: kev.bossesDefeated,
                            dungeonsCompleted: kev.dungeonsCompleted,
                            winsInEvents: kev.winsInEvents,
                            atk: kev.atk,
                            hp: kev.hp,
                            luck: kev.luck,
                            fightsWon: kev.fightsWon,
                            fightsLost: kev.fightsLost
                        })
                    }
                    return kev;
                });

                fs.writeFile("./dbeco.json", JSON.stringify(dbeco), (err) => {
                    if (err) console.log(err);
                });

                return dbeco;

            } else if (message.toLowerCase().startsWith('koniczyna') && goldLeft > koniczynaCost && itemsToBuyDung.includes(`koniczyna`)) {
                koniczynaSkillDung = true;
                boughtItems.koniczyna = userstate.username;
                itemsToBuyDung.splice(`koniczyna`, 1);
                koniczynaDung = '';
                //client.say(channel, `/me ` + `SKLEP: ${ultDung}${bronDung}${kevDung}${koniczynaDung}| '!letsgo', aby wejść do dungeonu.`)
                console.log(`SKLEP: ${ultDung}${bronDung}${kevDung}${koniczynaDung}| '!letsgo', aby wejść do dungeonu.`)

                dbeco.viewers = dbeco.viewers.map(koniczyna => {
                    if (koniczyna.nickname === userstate.username) {
                        koniczyna = ({
                            nickname: koniczyna.nickname,
                            id: koniczyna.id,
                            level: koniczyna.level,
                            gold: koniczyna.gold - koniczynaCost,
                            goldSpent: koniczyna.goldSpent + koniczynaCost,
                            skillPoints: koniczyna.skillPoints,
                            bossesDefeated: koniczyna.bossesDefeated,
                            dungeonsCompleted: koniczyna.dungeonsCompleted,
                            winsInEvents: koniczyna.winsInEvents,
                            atk: koniczyna.atk,
                            hp: koniczyna.hp,
                            luck: koniczyna.luck,
                            fightsWon: koniczyna.fightsWon,
                            fightsLost: koniczyna.fightsLost
                        })
                    }
                    return koniczyna;
                });

                fs.writeFile("./dbeco.json", JSON.stringify(dbeco), (err) => {
                    if (err) console.log(err);
                });

                return dbeco;

            } else if (message.toLowerCase().startsWith('!let') && tempCaptain.includes(userstate.username)) {
                currentStage = 4;

            } else if ((message.toLowerCase().startsWith('ult') && goldLeft < ultCost) || (message.toLowerCase().startsWith('bro') && goldLeft < bronCost) || (message.toLowerCase().startsWith('kev') && goldLeft < kevCost) || (message.toLowerCase().startsWith('koniczyna') && goldLeft < koniczynaCost)) {

                client.say(channel, `/me ` + `@${userstate['display-name']}, brakuje ci golda!`)

            } else if ((message.toLowerCase().startsWith('ult') && !itemsToBuyDung.includes(`ult`)) || (message.toLowerCase().startsWith('bro') && !itemsToBuyDung.includes(`bron`)) || (message.toLowerCase().startsWith('kev') && !itemsToBuyDung.includes(`kev`)) || (message.toLowerCase().startsWith('koniczyna') && !itemsToBuyDung.includes(`koniczyna`))) {

                client.say(channel, `/me ` + `@${userstate['display-name']}, ten przedmiot został już kupiony!`)
            }
        }

        if (currentStage == 4 && tempCaptain.includes(userstate.username)) {

            clearTimeout(timersDungeon[userstate.username]);
            delete timersDungeon[userstate.username];
            tempCaptain = tempCaptain.filter(user => user !== userstate.username);
            let start;
            let heroes = `Drużyna @${userstate['display-name']}`
            let listZaczyna = [heroes, dungBoss];
            let zaczyna = listZaczyna[Math.floor(Math.random() * listZaczyna.length)];

            console.log(`1Weszli...`)
            // client.say(channel, `/me ` + `Weszli...`)
            tempDungLog.push(`Atak zaczyna... ${zaczyna}`)
            etap = 0;

            let eh
            if (zaczyna == dungBoss) {
                start = true;
                eh = 'start'
            } else if (zaczyna == heroes) {
                start = false
                eh = '!start'
            }
            console.log("zaczyna: " + eh)

            // dungBoss utilities
            let kreciePiekloUlt = 1
            let piwnicaBabciUlt = 1
            let katakumbyBestialstwaUlt = 1

            dungBoss = `kret`

            if (dungBoss == `kret`) { kreciePiekloUlt = 0.7 }
            if (dungBoss == `babcia`) { piwnicaBabciUlt = 0.6 }
            if (dungBoss == `bestia`) { katakumbyBestialstwaUlt = 0.5 }

            let dungeonTeammates = [
                `itzoliffka`,
                `botmodwab`,
            ];
            dungeonTeammates.push(userstate.username)

            let myObject = {
                ult: "itzmaxinho",
                bron: "itzoliffka",
                kev: "itzoliffka",
                koniczyna: "botmodwab",
            }

            dungATK = 100
            dungHP = 600// dungHP = 500
            dungLUCK = 150
            dungWorth = 1

            let valueBron = myObject["bron"]
            let valueKev = myObject["kev"]
            let valueKoniczyna = myObject["koniczyna"]
            let i = -1;
            let tempHerosHp = []
            let staty
            let hp11
            let hp22
            let hp33
            let round = 0;
            let hadUlt;
            let isDead = []
            let blockX = false
            let blockY = false
            let currentHP = {}

            //TODO
            let iTab = []
            if (dungeonTeammates.length == 3) {
                iTab = [0, 1, 2]
            } else if (dungeonTeammates.length == 2) {
                iTab = [0, 1,]
            } else if (dungeonTeammates.length == 1) {
                iTab = [0]
            }

            dungeonFight();
            function dungeonFight() {

                i += 1
                if (!iTab.includes(i)) i += 1
                if (!iTab.includes(i)) i += 1
                if (!iTab.includes(i)) i = 0
                if (!iTab.includes(i)) i += 1
                if (!iTab.includes(i)) i += 1
                console.log("i: " + i)

                staty = getFightStatsByNickname(dungeonTeammates[i])

                let bronPower = 1
                let kevPower = 1
                let koniczynaPower = 1
                if (valueBron == dungeonTeammates[i]) { bronPower = 1.2 }
                if (valueKev == dungeonTeammates[i]) { kevPower = 1.4 }
                if (valueKoniczyna == dungeonTeammates[i]) { koniczynaPower = 1.7 }

                let atkMinBoss = dungATK * atkMin
                let atkMaxBoss = (dungATK * atkMax) // + (dungLUCK * playerLuck)

                let bossLuckCap = (bossLUCK + katakumbyBestialstwaUlt) / 5
                let heroLuckCap = staty.luck * koniczynaPower / 5
                if (heroLuckCap > 50) heroLuckCap = 50

                console.log(bronPower)
                console.log(kevPower)
                console.log(koniczynaPower)

                setTimeout(() => {
                    if (start) {
                        if (dungeonTeammates[0]) round++

                        let atak = getRandomNumber(atkMinBoss, atkMaxBoss).toFixed(0)
                        let atakFixed = atak;
                        let luck = getRandomNumber(1, 100)
                        let luckText = ''
                        if (luck < heroLuckCap) {
                            luckText = ', ale nie trafia'
                            atakFixed = 0
                        }

                        if (!tempHerosHp[i]) tempHerosHp[i] = staty.hp;
                        if (!tempHerosHp[i]) tempHerosHp.splice(i, 0, staty.hp)

                        console.log("PLAYER: " + dungeonTeammates[i])
                        console.log("currentHP: " + tempHerosHp[i])
                        console.log("dungHP: " + dungHP)

                        if (tempHerosHp[i]) {
                            tempHerosHp[i] = tempHerosHp[i] - atakFixed
                            currentHP[dungeonTeammates[i]] = tempHerosHp[i]
                        }

                        //client.say(channel, `/me ` + `${boss} (${dungHP} hp) atakuje za ${atak} i pozostawia ${fajter} ${heroStats.hp} hp!`)
                        console.log(`${dungBoss} (${dungHP} hp) atakuje za ${atak}` + luckText + ` i pozostawia ${usernameToDisplayName(dungeonTeammates[i])} ${currentHP[dungeonTeammates[i]]} hp!`)
                        tempDungLog.push(`${dungBoss} (${dungHP} hp) atakuje za ${atak}` + luckText + ` i pozostawia ${usernameToDisplayName(dungeonTeammates[i])} ${currentHP[dungeonTeammates[i]]} hp!`)
                        start = !start

                    } else if (!start) {
                        // i = findNextNonXYValue(i + 1);
                        if (dungeonTeammates[0]) round++

                        let atkMinHero = staty.atk * atkMin * bronPower * kreciePiekloUlt
                        let atkMaxHero = staty.atk * atkMax * bronPower // + (staty.luck * playerLuck * koniczynaPower)

                        let atak = getRandomNumber(atkMinHero, atkMaxHero).toFixed(0)
                        let atakFixed = atak;
                        let luck = getRandomNumber(1, 100)
                        let luckText = ''
                        if (luck < bossLuckCap) {
                            luckText = ', ale nie trafia'
                            atakFixed = 0
                        }

                        if (!tempHerosHp[i]) tempHerosHp[i] = staty.hp;
                        if (!tempHerosHp[i]) tempHerosHp.splice(i, 0, staty.hp)
                        // if (tempHerosHp[i]) {
                        //     tempHerosHp[i] = tempHerosHp[i] - atak
                        //     currentHP[dungeonTeammates[i]] = tempHerosHp[i]
                        // }

                        console.log("PLAYER: " + dungeonTeammates[i])
                        console.log("tempHerosHp[i]: " + tempHerosHp[i])
                        console.log("dungHP: " + dungHP)
                        dungHP = dungHP - atakFixed;

                        //client.say(channel, `/me ` + `${hero} (${heroStats.hp} hp) atakuje za ${atak} i pozostawia ${boss} ${dungHP} hp!`)
                        console.log(`${usernameToDisplayName(dungeonTeammates[i])} (${tempHerosHp[i]} hp) atakuje za ${atak}` + luckText + ` i pozostawia ${dungBoss} ${dungHP} hp!`)
                        tempDungLog.push(`${usernameToDisplayName(dungeonTeammates[i])} (${tempHerosHp[i]} hp) atakuje za ${atak}` + luckText + ` i pozostawia ${dungBoss} ${dungHP} hp!`)

                        start = !start

                    }
                    console.log(`----------V-------------V----------V------------V-------------V--------- DÓŁ`)

                    if (currentHP[dungeonTeammates[i]] <= 0) {
                        let valueUlt = myObject["ult"]
                        if (valueUlt == dungeonTeammates[i]) {
                            console.log(`[Room ${round}] @${usernameToDisplayName(dungeonTeammates[i])} używa ulta i ma 1hp...  jest ciężko...`)
                            // client.say(channel, `/me ` + `@${usernameToDisplayName(dungeonTeammates[i])} używa ulta i ma 1hp...  jest ciężko...`)
                            hadUlt = dungeonTeammates[i]
                            currentHP[dungeonTeammates[i]] = 1
                            tempHerosHp[i] = 1
                            delete myObject.ult;
                            dungeonFight()

                        } else {
                            isDead.push(dungeonTeammates[i])

                            if (dungeonTeammates.length > 0 && isDead.length == 1 && !blockX) {
                                // x = i;
                                let index = iTab.indexOf(i);

                                if (index !== -1) {
                                    iTab.splice(index, 1);
                                }

                                blockX = true;

                            } else if (dungeonTeammates.length > 0 && isDead.length == 2 && !blockY) {
                                // y = i;
                                let index = iTab.indexOf(i);

                                if (index !== -1) {
                                    iTab.splice(index, 1);
                                }
                                blockY = true;
                            }

                            let ifHadUltText = ''
                            let ifHadBronText = ''
                            let ifHadKevText = ''
                            let ifHadKoniczynaText = ''

                            if (hadUlt == dungeonTeammates[i]) { ifHadUltText = ' Nie pomógł nawet ult... [R.I.P]' }
                            if (valueBron == dungeonTeammates[i]) { ifHadBronText = ' Większy atak na nic się nie zdał... [R.I.P]' }
                            if (valueKev == dungeonTeammates[i]) { ifHadKevText = ' Z mocniejszego keva zostały tylko kule po dziurach... [R.I.P]' }
                            if (valueKoniczyna == dungeonTeammates[i]) { ifHadKoniczynaText = ' z koniczyną na piersi. Chyba przyniosła pecha... [R.I.P]' }

                            let endgameText = [
                                `[Room ${round}] @${usernameToDisplayName(dungeonTeammates[i])} zostaje powalony w ${round} pokoju dungeona...`,
                                `[Room ${round}] @${usernameToDisplayName(dungeonTeammates[i])} umiera w ${round} pokoju dungeona...`,
                                `[Room ${round}] @${usernameToDisplayName(dungeonTeammates[i])} ulega sile dungeona w ${round} pokoju...`,
                                `[Room ${round}] @${usernameToDisplayName(dungeonTeammates[i])} nie daje rady w ${round} pokoju dungeona...`,
                            ]
                            let r = endgameText[Math.floor(Math.random() * endgameText.length)]
                            //cclient.say(channel, `/me ` +`[Room ${round}] @${usernameToDisplayName(dungeonTeammates[i])} zostaje powalony w ${round} pokoju dungeona...` + ifHadUltText)
                            //console.log(`[Room ${round}] @${usernameToDisplayName(dungeonTeammates[i])} zostaje powalony w ${round} pokoju dungeona...` + ifHadUltText)
                            // client.say(channel, `/me ` + r + ifHadUltText)
                            console.log(r + ifHadUltText + ifHadBronText + ifHadKevText + ifHadKoniczynaText)

                            // const index = dungeonTeammates.indexOf(dungeonTeammates[i]);
                            // if (index > -1) dungeonTeammates.splice(index, 1);

                            console.log("isDead: " + isDead)

                            setTimeout(() => {
                                dungContestant = ''
                            }, 60000);

                            dungContestant = tempCaptain[0]

                            if (isDead.length == 2) {
                                let name;
                                for (let z = 0; z < 3; z++) {
                                    if (!isDead.includes(dungeonTeammates[z]) && dungeonTeammates.includes(dungeonTeammates[z])) {
                                        name = dungeonTeammates[z]
                                    }
                                }

                                setTimeout(() => {
                                    console.log("name: " + name)
                                    console.log(`Ostatnia nadzieja w tobie @${usernameToDisplayName(name)}...`)
                                }, 300);
                            }
                            if (isDead.length == 3) {

                                console.log(`${heroes} zostaje pokonana... ${dungBoss} pozostaje królem dungeona z zapasem ${dungHP} hp i rozpoczyna regenerację...`)
                                // client.say(channel, `/me ` + `${heroes} zostaje pokonana... ${dungBoss} pozostaje królem dungeona z zapasem ${dungHP} hp i rozpoczyna regenerację...`)
                                tempDungLog.push(`Wygrywa... ${dungBoss} z ${dungHP} hp!`)
                                return;
                            } else dungeonFight()
                        }
                    } else if (dungHP <= 0) {

                        // client.say(channel, `/me ` + `Ten pojedynek wygrywa... ${heroes} z ${hp11}, ${hp22}, ${hp33} hp!`)
                        console.log(`Wygrywa... ${heroes}! @${usernameToDisplayName(dungeonTeammates[0])} z ${currentHP[dungeonTeammates[0]]} hp, @${usernameToDisplayName(dungeonTeammates[1])} z ${currentHP[dungeonTeammates[1]]} hp, @${usernameToDisplayName(dungeonTeammates[2])} z ${currentHP[dungeonTeammates[2]]} hp!`)
                        tempDungLog.push(`Wygrywa... ${heroes} z ${hp11}, ${hp22}, ${hp33} hp!`)

                        let bossesDefeated = getBossesDefeatedByNickname(userstate.username)

                        boksContestant = dungeonTeammates
                        setTimeout(() => {
                            boksContestant = ''
                        }, 15000);

                        blockadeBoks = true;
                        listBoks = [];
                        ultSkill = false;
                        bronSkill = false;
                        kevSkill = false;
                        koniczynaSkill = false;


                        if (bossesDefeated < bossWorth) {

                            dbeco.viewers = dbeco.viewers.map(bossPrice => {
                                if (bossPrice.nickname === userstate.username) {
                                    bossPrice = ({
                                        nickname: bossPrice.nickname,
                                        id: bossPrice.id,
                                        level: bossPrice.level,
                                        gold: bossPrice.gold,
                                        goldSpent: bossPrice.goldSpent,
                                        skillPoints: bossPrice.skillPoints,
                                        bossesDefeated: bossWorth,
                                        dungeonsCompleted: bossPrice.dungeonsCompleted,
                                        winsInEvents: bossPrice.winsInEvents + 1,
                                        atk: bossPrice.atk,
                                        hp: bossPrice.hp,
                                        luck: bossPrice.luck,
                                        fightsWon: bossPrice.fightsWon,
                                        fightsLost: bossPrice.fightsLost
                                    })
                                }
                                return bossPrice;
                            });

                            fs.writeFile("./dbeco.json", JSON.stringify(dbeco), (err) => {
                                if (err) console.log(err);
                            });

                            return dbeco;
                        }

                    } else {
                        dungeonFight();
                    }
                }, 300)
            }


            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            // let start;
            // let listZaczyna = [`Drużyna @${userstate['display-name']}`, boss];
            // let zaczyna = listZaczyna[Math.floor(Math.random() * listZaczyna.length)];

            // dungeonTeammates.push(userstate.username)

            // console.log(`Weszli...`)
            // // client.say(channel, `/me ` + `Weszli...`)
            // tempDungLog.push(`Atak zaczyna... ${zaczyna}`)
            // etap = 0;

            // if (zaczyna == boss) {
            //     start = true;
            // } else if (zaczyna == `Drużyna @${userstate['display-name']}`) {
            //     start = false
            // }

            // // boss utilities
            // let kreciePiekloUlt = 1
            // let piwnicaBabciUlt = 1
            // let katakumbyBestialstwaUlt = 1

            // if (dungBoss == `kret`) kreciePiekloUlt = 0.7
            // if (dungBoss == `babcia`) piwnicaBabciUlt = 0.6
            // if (dungBoss == `bestia`) katakumbyBestialstwaUlt = 0.5

            // // player utilities

            // let myObject = {
            //     ult: "itzmaxinho",
            //     bron: "itzoliffka",
            //     kev: "itzmaxinho",
            //     koniczyna: "botmodwab",
            // }

            // valueUlt = myObject["ult"]
            // valueBron = myObject["bron"]
            // valueKev = myObject["kev"]
            // valueKoniczyna = myObject["koniczyna"]

            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

            //     const value5 = myObject["bron"];
            //     console.log("value5: " + value5)

            // if (bronSkill) bronPower = 1.2
            // if (kevSkill) kevPower = 1.4
            // if (koniczynaSkill) koniczynaPower = 1.7

            // // player1
            // let hero1 = getFightStatsByNickname(userstate.username)
            // let hero1Nickname = usernameToDisplayName(userstate.username)

            // let atkMinHero1 = hero1.atk * atkMin * bronPower * kreciePiekloUlt
            // let atkMaxHero1 = (hero1.atk * atkMax * bronPower) + (hero1.luck * playerLuck * koniczynaPower * katakumbyBestialstwaUlt)
            // hero1.hp = hero1.hp * kevPower * piwnicaBabciUlt

            // // player2
            // let hero2 = getFightStatsByNickname(dungeonTeammates[0])
            // let hero2Nickname = usernameToDisplayName(dungeonTeammates[0])

            // let atkMinHero2 = hero2.atk * atkMin * bronPower
            // let atkMaxHero2 = (hero2.atk * atkMax * bronPower) + (hero2.luck * playerLuck * koniczynaPower * katakumbyBestialstwaUlt)
            // hero2.hp = hero2.hp * kevPower * piwnicaBabciUlt

            // // player3
            // let hero3 = getFightStatsByNickname(dungeonTeammates[1])
            // let hero3Nickname = usernameToDisplayName(dungeonTeammates[1])

            // let atkMinHero3 = hero3.atk * atkMin * bronPower * kreciePiekloUlt
            // let atkMaxHero3 = (hero3.atk * atkMax * bronPower) + (hero3.luck * playerLuck * koniczynaPower * katakumbyBestialstwaUlt)
            // hero3.hp = hero3.hp * kevPower * piwnicaBabciUlt

            // boss
            // let i = 0
            // function dungeonFight() {
            //     // setTimeout(function () {
            //     setTimeout(() => {

            //         if (start) {
            //             let atkMinBoss = dungATK * atkMin
            //             let atkMaxBoss = (dungATK * atkMax) + (bossLUCK * playerLuck)

            //             let atak = getRandomNumber(atkMinBoss, atkMaxBoss).toFixed(0)
            //             heroStats.hp = heroStats.hp - atak;

            //             //client.say(channel, `/me ` + `${boss} (${dungHP} hp) atakuje za ${atak} i pozostawia ${fajter} ${heroStats.hp} hp!`)
            //             tempDungLog.push(`${boss} (${dungHP} hp) atakuje za ${atak} i pozostawia ${fajter} ${heroStats.hp} hp!`)

            //             start = !start

            //         } else if (!start) {

            //             // for (let i = 0; i < 3; i++) {

            //             let staty = getFightStatsByNickname(dungeonTeammates[i])
            //             let hero = usernameToDisplayName(dungeonTeammates[i])

            //             let bronPower = 1
            //             let kevPower = 1
            //             let koniczynaPower = 1

            //             if (valueUlt == dungeonTeammates[i]) bronPower = 1.2
            //             console.log("valueUlt == dungeonTeammates[i]: " + valueUlt == dungeonTeammates[i])
            //             console.log("valueUlt: " + valueUlt)
            //             console.log("dungeonTeammates[i]: " + dungeonTeammates[i])
            //             console.log("bronPower: " + bronPower)
            //             if (valueKev == dungeonTeammates[i]) kevPower = 1.4
            //             if (valueKoniczyna == dungeonTeammates[i]) koniczynaPower = 1.7

            //             let atkMinHero = staty.atk * atkMin * bronPower * kreciePiekloUlt
            //             let atkMaxHero = (staty.atk * atkMax * bronPower) + (staty.luck * playerLuck * koniczynaPower * katakumbyBestialstwaUlt)

            //             let atak = getRandomNumber(atkMinHero, atkMaxHero).toFixed(0)
            //             dungHP = dungHP - atak;

            //             //client.say(channel, `/me ` + `${hero} (${heroStats.hp} hp) atakuje za ${atak} i pozostawia ${boss} ${dungHP} hp!`)
            //             tempDungLog.push(`${hero} (${staty.hp} hp) atakuje za ${atak} i pozostawia ${boss} ${dungHP} hp!`)
            //             // }

            //             i++
            //             if (i == 3) i = 0
            //             start = !start
            //         }

            //         if (dungHP <= 0) {

            //             if (dungBoss === `Kratos`) {
            //                 dungHP = 1;

            //                 client.say(channel, `/me ` + `Boss używa ulta!`)
            //                 tempDungLog.push(`Boss używa ulta... i zamiast umrzeć w tej turze, zostaje mu ${dungHP} hp!`)

            //                 dungeonFight();

            //             } else {

            //                 client.say(channel, `/me ` + `Ten pojedynek wygrywa... ${hero} z ${staty.hp} hp!`)
            //                 tempDungLog.push(`Wygrywa... ${hero} z ${staty.hp} hp!`)

            //                 let bossesDefeated = getBossesDefeatedByNickname(userstate.username)

            //                 boksContestant = fajter
            //                 setTimeout(() => {
            //                     boksContestant = ''
            //                 }, 15000);

            //                 blockadeBoks = true;
            //                 listBoks = [];
            //                 ultSkill = false;
            //                 bronSkill = false;
            //                 kevSkill = false;
            //                 koniczynaSkill = false;

            //                 delayToBoks()

            //                 if (bossesDefeated < bossWorth) {

            //                     dbeco.viewers = dbeco.viewers.map(bossPrice => {
            //                         if (bossPrice.nickname === userstate.username) {
            //                             bossPrice = ({
            //                                 nickname: bossPrice.nickname,
            //                                 id: bossPrice.id,
            //                                 level: bossPrice.level,
            //                                 gold: bossPrice.gold,
            //                                 goldSpent: bossPrice.goldSpent,
            //                                 skillPoints: bossPrice.skillPoints,
            //                                 bossesDefeated: bossWorth,
            //                                 dungeonsCompleted: bossPrice.dungeonsCompleted,
            //                                 winsInEvents: bossPrice.winsInEvents + 1,
            //                                 atk: bossPrice.atk,
            //                                 hp: bossPrice.hp,
            //                                 luck: bossPrice.luck,
            //                                 fightsWon: bossPrice.fightsWon,
            //                                 fightsLost: bossPrice.fightsLost
            //                             })
            //                         }
            //                         return bossPrice;
            //                     });

            //                     fs.writeFile("./dbeco.json", JSON.stringify(dbeco), (err) => {
            //                         if (err) console.log(err);
            //                     });

            //                     return dbeco;
            //                 }
            //             }

            //         } else if (staty.hp <= 0) {
            //             client.say(channel, `/me ` + `Ten pojedynek wygrywa... ${dungBoss} z ${dungHP} hp!`)
            //             tempDungLog.push(`Wygrywa... ${dungBoss} z ${dungHP} hp!`)

            //             boksContestant = fajter
            //             setTimeout(() => {
            //                 boksContestant = ''
            //             }, 15000);

            //             blockadeBoks = true;
            //             listBoks = [];
            //             ultSkill = false;
            //             bronSkill = false;
            //             kevSkill = false;
            //             koniczynaSkill = false;

            //             delayToBoks()
            //         } else {
            //             dungeonFight();
            //         }
            //     }, 300)
            // }
            // dungeonFight();
        }
    }
});


/* testy1
client.on('message', (channel, userstate, message, self) => {

    return;
    // uporzadkowac kod (pousuwac niepotrzebne fragmenty)
    // przeniesc kod do !dungeon
    // sprawdzic dodawanie do obiektu przy kupnie skilli
    // generalne testy

    if (self || blockadeGlobal) return;

    // !dungeon testy
    // - - - -- - - - -- - -- - -- - - -- - -- - - -- - - -- - - -- - - -- - -- -- 
    let start;
    let heroes = `Drużyna @${userstate['display-name']}`
    let listZaczyna = [heroes, dungBoss];
    let zaczyna = listZaczyna[Math.floor(Math.random() * listZaczyna.length)];

    console.log(`1Weszli...`)
    // client.say(channel, `/me ` + `Weszli...`)
    tempDungLog.push(`Atak zaczyna... ${zaczyna}`)
    etap = 0;

    let eh
    if (zaczyna == dungBoss) {
        start = true;
        eh = 'start'
    } else if (zaczyna == heroes) {
        start = false
        eh = '!start'
    }
    console.log("zaczyna: " + eh)

    // dungBoss utilities
    let kreciePiekloUlt = 1
    let piwnicaBabciUlt = 1
    let katakumbyBestialstwaUlt = 1

    dungBoss = `kret`

    if (dungBoss == `kret`) { kreciePiekloUlt = 0.7 }
    if (dungBoss == `babcia`) { piwnicaBabciUlt = 0.6 }
    if (dungBoss == `bestia`) { katakumbyBestialstwaUlt = 0.5 }

    let dungeonTeammates = [
        `itzoliffka`,
        `botmodwab`,
    ];
    dungeonTeammates.push(userstate.username)

    let myObject = {
        ult: "itzmaxinho",
        bron: "itzoliffka",
        kev: "itzoliffka",
        koniczyna: "botmodwab",
    }

    dungATK = 100
    dungHP = 600// dungHP = 500
    dungLUCK = 150
    dungWorth = 1

    let valueBron = myObject["bron"]
    let valueKev = myObject["kev"]
    let valueKoniczyna = myObject["koniczyna"]
    let i = -1;
    let tempHerosHp = []
    let staty
    let hp11
    let hp22
    let hp33
    let round = 0;
    let hadUlt;
    let isDead = []
    let blockX = false
    let blockY = false
    let currentHP = {}

    //TODO
    let iTab = []
    if (dungeonTeammates.length == 3) {
        iTab = [0, 1, 2]
    } else if (dungeonTeammates.length == 2) {
        iTab = [0, 1,]
    } else if (dungeonTeammates.length == 1) {
        iTab = [0]
    }

    dungeonFight();
    function dungeonFight() {

        i += 1
        if (!iTab.includes(i)) i += 1
        if (!iTab.includes(i)) i += 1
        if (!iTab.includes(i)) i = 0
        if (!iTab.includes(i)) i += 1
        if (!iTab.includes(i)) i += 1
        console.log("i: " + i)

        staty = getFightStatsByNickname(dungeonTeammates[i])

        let bronPower = 1
        let kevPower = 1
        let koniczynaPower = 1
        if (valueBron == dungeonTeammates[i]) { bronPower = 1.2 }
        if (valueKev == dungeonTeammates[i]) { kevPower = 1.4 }
        if (valueKoniczyna == dungeonTeammates[i]) { koniczynaPower = 1.7 }

        let atkMinBoss = dungATK * atkMin
        let atkMaxBoss = (dungATK * atkMax) // + (dungLUCK * playerLuck)

        let bossLuckCap = (bossLUCK + katakumbyBestialstwaUlt) / 5
        let heroLuckCap = staty.luck * koniczynaPower / 5
        if (heroLuckCap > 50) heroLuckCap = 50

        console.log(bronPower)
        console.log(kevPower)
        console.log(koniczynaPower)

        setTimeout(() => {
            if (start) {
                if (dungeonTeammates[0]) round++

                let atak = getRandomNumber(atkMinBoss, atkMaxBoss).toFixed(0)
                let atakFixed = atak;
                let luck = getRandomNumber(1, 100)
                let luckText = ''
                if (luck < heroLuckCap) {
                    luckText = ', ale nie trafia'
                    atakFixed = 0
                }

                if (!tempHerosHp[i]) tempHerosHp[i] = staty.hp;
                if (!tempHerosHp[i]) tempHerosHp.splice(i, 0, staty.hp)

                console.log("PLAYER: " + dungeonTeammates[i])
                console.log("currentHP: " + tempHerosHp[i])
                console.log("dungHP: " + dungHP)

                if (tempHerosHp[i]) {
                    tempHerosHp[i] = tempHerosHp[i] - atakFixed
                    currentHP[dungeonTeammates[i]] = tempHerosHp[i]
                }

                //client.say(channel, `/me ` + `${boss} (${dungHP} hp) atakuje za ${atak} i pozostawia ${fajter} ${heroStats.hp} hp!`)
                console.log(`${dungBoss} (${dungHP} hp) atakuje za ${atak}` + luckText + ` i pozostawia ${usernameToDisplayName(dungeonTeammates[i])} ${currentHP[dungeonTeammates[i]]} hp!`)
                tempDungLog.push(`${dungBoss} (${dungHP} hp) atakuje za ${atak}` + luckText + ` i pozostawia ${usernameToDisplayName(dungeonTeammates[i])} ${currentHP[dungeonTeammates[i]]} hp!`)
                start = !start

            } else if (!start) {
                // i = findNextNonXYValue(i + 1);
                if (dungeonTeammates[0]) round++

                let atkMinHero = staty.atk * atkMin * bronPower * kreciePiekloUlt
                let atkMaxHero = staty.atk * atkMax * bronPower // + (staty.luck * playerLuck * koniczynaPower)

                let atak = getRandomNumber(atkMinHero, atkMaxHero).toFixed(0)
                let atakFixed = atak;
                let luck = getRandomNumber(1, 100)
                let luckText = ''
                if (luck < bossLuckCap) {
                    luckText = ', ale nie trafia'
                    atakFixed = 0
                }

                if (!tempHerosHp[i]) tempHerosHp[i] = staty.hp;
                if (!tempHerosHp[i]) tempHerosHp.splice(i, 0, staty.hp)
                // if (tempHerosHp[i]) {
                //     tempHerosHp[i] = tempHerosHp[i] - atak
                //     currentHP[dungeonTeammates[i]] = tempHerosHp[i]
                // }

                console.log("PLAYER: " + dungeonTeammates[i])
                console.log("tempHerosHp[i]: " + tempHerosHp[i])
                console.log("dungHP: " + dungHP)
                dungHP = dungHP - atakFixed;

                //client.say(channel, `/me ` + `${hero} (${heroStats.hp} hp) atakuje za ${atak} i pozostawia ${boss} ${dungHP} hp!`)
                console.log(`${usernameToDisplayName(dungeonTeammates[i])} (${tempHerosHp[i]} hp) atakuje za ${atak}` + luckText + ` i pozostawia ${dungBoss} ${dungHP} hp!`)
                tempDungLog.push(`${usernameToDisplayName(dungeonTeammates[i])} (${tempHerosHp[i]} hp) atakuje za ${atak}` + luckText + ` i pozostawia ${dungBoss} ${dungHP} hp!`)

                start = !start

            }
            console.log(`----------V-------------V----------V------------V-------------V--------- DÓŁ`)

            if (currentHP[dungeonTeammates[i]] <= 0) {
                let valueUlt = myObject["ult"]
                if (valueUlt == dungeonTeammates[i]) {
                    console.log(`[Room ${round}] @${usernameToDisplayName(dungeonTeammates[i])} używa ulta i ma 1hp...  jest ciężko...`)
                    // client.say(channel, `/me ` + `@${usernameToDisplayName(dungeonTeammates[i])} używa ulta i ma 1hp...  jest ciężko...`)
                    hadUlt = dungeonTeammates[i]
                    currentHP[dungeonTeammates[i]] = 1
                    tempHerosHp[i] = 1
                    delete myObject.ult;
                    dungeonFight()

                } else {
                    isDead.push(dungeonTeammates[i])

                    if (dungeonTeammates.length > 0 && isDead.length == 1 && !blockX) {
                        // x = i;
                        let index = iTab.indexOf(i);

                        if (index !== -1) {
                            iTab.splice(index, 1);
                        }

                        blockX = true;

                    } else if (dungeonTeammates.length > 0 && isDead.length == 2 && !blockY) {
                        // y = i;
                        let index = iTab.indexOf(i);

                        if (index !== -1) {
                            iTab.splice(index, 1);
                        }
                        blockY = true;
                    }

                    let ifHadUltText = ''
                    let ifHadBronText = ''
                    let ifHadKevText = ''
                    let ifHadKoniczynaText = ''

                    if (hadUlt == dungeonTeammates[i]) { ifHadUltText = ' Nie pomógł nawet ult... [R.I.P]' }
                    if (valueBron == dungeonTeammates[i]) { ifHadBronText = ' Większy atak na nic się nie zdał... [R.I.P]' }
                    if (valueKev == dungeonTeammates[i]) { ifHadKevText = ' Z mocniejszego keva zostały tylko kule po dziurach... [R.I.P]' }
                    if (valueKoniczyna == dungeonTeammates[i]) { ifHadKoniczynaText = ' z koniczyną na piersi. Chyba przyniosła pecha... [R.I.P]' }

                    let endgameText = [
                        `[Room ${round}] @${usernameToDisplayName(dungeonTeammates[i])} zostaje powalony w ${round} pokoju dungeona...`,
                        `[Room ${round}] @${usernameToDisplayName(dungeonTeammates[i])} umiera w ${round} pokoju dungeona...`,
                        `[Room ${round}] @${usernameToDisplayName(dungeonTeammates[i])} ulega sile dungeona w ${round} pokoju...`,
                        `[Room ${round}] @${usernameToDisplayName(dungeonTeammates[i])} nie daje rady w ${round} pokoju dungeona...`,
                    ]
                    let r = endgameText[Math.floor(Math.random() * endgameText.length)]
                    //cclient.say(channel, `/me ` +`[Room ${round}] @${usernameToDisplayName(dungeonTeammates[i])} zostaje powalony w ${round} pokoju dungeona...` + ifHadUltText)
                    //console.log(`[Room ${round}] @${usernameToDisplayName(dungeonTeammates[i])} zostaje powalony w ${round} pokoju dungeona...` + ifHadUltText)
                    // client.say(channel, `/me ` + r + ifHadUltText)
                    console.log(r + ifHadUltText + ifHadBronText + ifHadKevText + ifHadKoniczynaText)

                    // const index = dungeonTeammates.indexOf(dungeonTeammates[i]);
                    // if (index > -1) dungeonTeammates.splice(index, 1);

                    console.log("isDead: " + isDead)

                    setTimeout(() => {
                        dungContestant = ''
                    }, 60000);

                    dungContestant = tempCaptain[0]

                    if (isDead.length == 2) {
                        let name;
                        for (let z = 0; z < 3; z++) {
                            if (!isDead.includes(dungeonTeammates[z]) && dungeonTeammates.includes(dungeonTeammates[z])) {
                                name = dungeonTeammates[z]
                            }
                        }

                        setTimeout(() => {
                            console.log("name: " + name)
                            console.log(`Ostatnia nadzieja w tobie @${usernameToDisplayName(name)}...`)
                        }, 300);
                    }
                    if (isDead.length == 3) {

                        console.log(`${heroes} zostaje pokonana... ${dungBoss} pozostaje królem dungeona z zapasem ${dungHP} hp i rozpoczyna regenerację...`)
                        // client.say(channel, `/me ` + `${heroes} zostaje pokonana... ${dungBoss} pozostaje królem dungeona z zapasem ${dungHP} hp i rozpoczyna regenerację...`)
                        tempDungLog.push(`Wygrywa... ${dungBoss} z ${dungHP} hp!`)
                        return;
                    } else dungeonFight()
                }
            } else if (dungHP <= 0) {

                // client.say(channel, `/me ` + `Ten pojedynek wygrywa... ${heroes} z ${hp11}, ${hp22}, ${hp33} hp!`)
                console.log(`Wygrywa... ${heroes}! @${usernameToDisplayName(dungeonTeammates[0])} z ${currentHP[dungeonTeammates[0]]} hp, @${usernameToDisplayName(dungeonTeammates[1])} z ${currentHP[dungeonTeammates[1]]} hp, @${usernameToDisplayName(dungeonTeammates[2])} z ${currentHP[dungeonTeammates[2]]} hp!`)
                tempDungLog.push(`Wygrywa... ${heroes} z ${hp11}, ${hp22}, ${hp33} hp!`)

                let bossesDefeated = getBossesDefeatedByNickname(userstate.username)

                boksContestant = dungeonTeammates
                setTimeout(() => {
                    boksContestant = ''
                }, 15000);

                blockadeBoks = true;
                listBoks = [];
                ultSkill = false;
                bronSkill = false;
                kevSkill = false;
                koniczynaSkill = false;


                if (bossesDefeated < bossWorth) {

                    dbeco.viewers = dbeco.viewers.map(bossPrice => {
                        if (bossPrice.nickname === userstate.username) {
                            bossPrice = ({
                                nickname: bossPrice.nickname,
                                id: bossPrice.id,
                                level: bossPrice.level,
                                gold: bossPrice.gold,
                                goldSpent: bossPrice.goldSpent,
                                skillPoints: bossPrice.skillPoints,
                                bossesDefeated: bossWorth,
                                dungeonsCompleted: bossPrice.dungeonsCompleted,
                                winsInEvents: bossPrice.winsInEvents + 1,
                                atk: bossPrice.atk,
                                hp: bossPrice.hp,
                                luck: bossPrice.luck,
                                fightsWon: bossPrice.fightsWon,
                                fightsLost: bossPrice.fightsLost
                            })
                        }
                        return bossPrice;
                    });

                    fs.writeFile("./dbeco.json", JSON.stringify(dbeco), (err) => {
                        if (err) console.log(err);
                    });

                    return dbeco;
                }

            } else {
                dungeonFight();
            }
        }, 300)
    }
});
testy2 */


// !rpg !rpgcommands !rpg commands
client.on('message', (channel, userstate, message, self) => {
    if (self || blockadeGlobal) return;

    if (message.toLowerCase() === `!rpg` || message.toLowerCase() === `!rpgcommands` || message.toLowerCase() === `!rpg commands`) {

        client.say(channel, `/me ` + `@${userstate['display-name']}, !staty | !gold | !lvlup | !skill | !ja | !top | !sklep | !fight | !zagarazami | !dungeon`)

    }
});


// !!betatop
client.on('message', (channel, userstate, message, self) => {
    if (self || blockadeGlobal) return;

    if (message.toLowerCase() === `!betatop` || message.toLowerCase() === `!beta top`) {

        client.say(channel, `/me ` + `@${userstate['display-name']}, TOPKA Z BETY: 1. Hugox150 (7 lv), 2. hiranato (6 lv), 3. paattrol (6 lv), 4. itzMalek_ (6 lv), 5. itzOlixTactics (5 lv)`)
    }
});


// !zacogold
client.on('message', (channel, userstate, message, self) => {
    if (self || blockadeGlobal) return;
    if (message.toLowerCase() === `!zacogold` || message.toLowerCase() === `!zacojestgold`) {
        client.say(channel, `/me ` + `@${userstate['display-name']}, im bardziej angażujesz się w stream, tym więcej golda zdobywasz.`)
    }
});

/* !json preset
 
dbeco.viewers = dbeco.viewers.map(xxx => {
                if (xxx.nickname === userstate.username) {
                    xxx = ({
                        nickname: xxx.nickname,
                        id: xxx.id,
                        level: xxx.level,
                        gold: xxx.gold,
                        goldSpent: xxx.goldSpent,
                        skillPoints: xxx.skillPoints,
                        bossesDefeated: xxx.bossesDefeated,
                        dungeonsCompleted: xxx.dungeonsCompleted,
                        winsInEvents: xxx.winsInEvents,
                        atk: xxx.atk,
                        hp: xxx.hp,
                        luck: xxx.luck,
                        fightsWon: xxx.fightsWon,
                        fightsLost: xxx.fightsLost
                    })
                }
                return xxx;
            });
 
            fs.writeFile("./dbeco.json", JSON.stringify(dbeco), (err) => {
                if (err) console.log(err);
            });
 
            return dbeco;
 
*/


//------------------------------------------------------------------ FUNKCJE / FUNCTIONS ------------------------------------------------------------------


// !timeout / timeout user
function TimeoutUser(nickname, duration) {

    let user_id = findIdByNickname(nickname)

    fetch(`https://api.twitch.tv/helix/moderation/bans?broadcaster_id=streamerTwitchID&moderator_id=moderatorTwitchID`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${TOKEN}`,
            'Client-Id': ClientID,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "data": { "user_id": user_id, "duration": duration } })
    }).then(/*res => console.log(res)*/)
        .catch(err => {
            console.error(err);
        });
}

// !ban / ban user
function BanUser(nickname, reason) {

    let user_id = findIdByNickname(nickname)

    fetch(`https://api.twitch.tv/helix/moderation/bans?broadcaster_id=streamerTwitchID&moderator_id=moderatorTwitchID`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${TOKEN}`,
            'Client-Id': ClientID,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "data": { "user_id": user_id, "reason": reason } })
    }).then(/*res => console.log(res)*/)
        .catch(err => {
            console.error(err);
        });
}

// !whispers / whisper user
function WhisperUser(nickname, message) {

    let user_id = findIdByNickname(nickname)

    fetch(`https://api.twitch.tv/helix/whispers?from_user_id=moderatorTwitchID&to_user_id=${user_id}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${TOKEN}`,
            'Client-Id': ClientID,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "message": message })
    }).then(/*res => console.log(res)*/)
        .catch(err => {
            console.error(err);
        });
}

// get chatters / current viewers
async function getChatters() {
    const url = 'https://api.twitch.tv/helix/chat/chatters?broadcaster_id=streamerTwitchID&moderator_id=moderatorTwitchID';
    const headers = {
        'Authorization': `Bearer ${TOKEN}`,
        'Client-Id': ClientID
    };

    try {
        const response = await fetch(url, { headers });
        const data = await response.json();
        const userNames = data.data.map(item => item.user_name);
        return userNames;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch chatters data');
    }
}

let chatters = {}
// !test
client.on('message', (channel, userstate, message, self) => {
    if (message.toLowerCase() === 'test') {
        (async () => {
            try {
                chatters = await getChatters();
                chatters.push("tester")
                console.log(chatters);
            } catch (error) {
                console.error(error);
            }
        })();
    }
})

// find id
function findIdByNickname(nickname) {
    const result = db.saveID.find(item => item.nickname === nickname);
    return result ? result.id : null;
}

// !countdown
function Countdown() {
    let counter = 0;
    countSec = setInterval(() => {
        console.log(counter++)
    }, 1000);
}

// username to displayname
function usernameToDisplayName(name) {
    // let name;

    const toDisplayName = db.saveID.find(v => v.nickname === name.toLowerCase());
    if (toDisplayName && toDisplayName.displayName) {
        name = toDisplayName.displayName
        return name;
    } else if (toDisplayName) {
        return name;
    } else {
        return null
    }
}

// get bosses defeated by nickname username
function getBossesDefeatedByNickname(username) {
    const bossesDefeated = dbeco.viewers.find(bossesDefeated => bossesDefeated.nickname === username);

    if (bossesDefeated) {
        return bossesDefeated.bossesDefeated;
    } else {
        return null; // Nickname not found
    }
}

// get level by nickname username
function getLevelByNickname(username) {
    const level = dbeco.viewers.find(level => level.nickname === username);

    if (level) {
        return level.level;
    } else {
        return null; // Nickname not found
    }
}

// get gold by nickname username
function getGoldByNickname(username) {
    const gold = dbeco.viewers.find(gold => gold.nickname === username);

    if (gold) {
        return gold.gold;
    } else {
        return null; // Nickname not found
    }
}

// get gold by nickname username
function getOldNickById(id) {
    const oldNick = dbeco.viewers.find(gold => gold.id === id);

    if (oldNick) {
        return oldNick.nickname;
    } else {
        return null; // Nickname not found
    }
}

// get skill points by nickname username
function getSkillPointsByNickname(username) {
    const skillPoints = dbeco.viewers.find(skillPoints => skillPoints.nickname === username);

    if (skillPoints) {
        return skillPoints.skillPoints;
    } else {
        return null; // Nickname not found
    }
}

// get fight stats by nickname username
function getFightStatsByNickname(username) {
    const fightStats = dbeco.viewers.find(fightStats => fightStats.nickname === username);

    if (fightStats) {
        const { level, gold, atk, hp, luck } = fightStats;
        return { level, gold, atk, hp, luck };
    } else {
        return null; // Nickname not found
    }
}

// get all stats by nickname username
function getAllStatsByNickname(username) {
    const allStats = dbeco.viewers.find(allStats => allStats.nickname === username);

    if (allStats) {
        const { level, gold, goldSpent, skillPoints, atk, hp, luck, bossesDefeated, dungeonsCompleted, fightsWon, fightsLost, winsInEvents } = allStats;
        return { level, gold, goldSpent, skillPoints, atk, hp, luck, bossesDefeated, dungeonsCompleted, fightsWon, fightsLost, winsInEvents };
    } else {
        return null; // Nickname not found
    }
}