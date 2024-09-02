const Discord = require('discord.js'); // Подключаем библиотеку Discord.js
const { Client, GatewayIntentBits } = require('discord.js'); // Импортируем необходимые элементы
const comms = require("./comms.js"); // Подключаем файл с командами для бота
const fs = require('fs'); // Подключаем модуль файловой системы
let config = require('./config.json'); // Подключаем файл с параметрами и информацией

let token = config.token; // «Вытаскиваем» из него токен
let prefix = config.prefix; // «Вытаскиваем» из него префикс

const robot = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent // Эта директива необходима, чтобы бот реагировал на тело сообщения
    ]
}); // Объявляем, что robot — бот.

robot.on("ready", function() {
    /* При успешном запуске в консоли появится сообщение «[Имя бота] запустился!» */    
    console.log(robot.user.username + " запустился!");
});

robot.on('messageCreate', (msg) => { // Реагирование на сообщения    
    if (msg.author.id !== robot.user.id) { // Изменено на id для более надежной проверки
        let comm = msg.content.trim() + " ";        
        let comm_name = comm.slice(0, comm.indexOf(" "));        
        let messArr = comm.split(" ");        
        
        for (let comm_count in comms.comms) {            
            let comm2 = prefix + comms.comms[comm_count].name;            
            if (comm2 === comm_name) {                
                comms.comms[comm_count].out(robot, msg, messArr);
            }
        }
    }
});

robot.login(token); // Авторизация бота
