// Импорт необходимых модулей
const config = require('./config.json'); // Подключаем файл с параметрами и информацией
const Discord = require('discord.js'); // Подключаем библиотеку discord.js
const axios = require('axios'); // Подключаем библиотеку axios для выполнения HTTP-запросов

// Настройка конфигурации
const prefix = config.prefix; // «Вытаскиваем» префикс
const apiKey = 'AIzaSyDZCGL-PFl41iQyHaBGJklTn5iKRFPKtWo'; // Замените на ваш API ключ Google Custom Search
const searchEngineId = 'a59d12b4fabe248e0'; // Замените на ваш идентификатор поискового движка
const giphyApiKey = 'JK0FnAc38u43F9KOwapUax6r0D6661bn'; // Замените на ваш API ключ Giphy

// Функция для команды 'кто'
async function кто(robot, mess, args) {
    if (args.length === 0) {
        mess.channel.send('Пожалуйста, укажите запрос.');
        return;
    }

    const query = args.join(' '); // Собираем запрос
    const members = mess.guild.members.cache.filter(member => !member.user.bot); // Получаем всех участников сервера, игнорируя ботов

    if (members.size === 0) {
        mess.channel.send('Нет доступных участников для упоминания.');
        return;
    }

    const randomMember = members.random(); // Выбираем случайного участника
    const phrases = [
        `Я уверен, ${randomMember} ${query}!`,
        `Мне кажется, что ${randomMember} ${query}.`,
        `ЕБАНЫЙ ПИЗДЕЦ Я И ПОДУМАТЬ НЕ МОГ, ЧТО ${randomMember} ${query}`,
        `Ахренеть, так это ${randomMember} ${query}..`
    ];
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)]; // Выбираем случайную фразу

    mess.channel.send(randomPhrase); // Отправляем сообщение
}

// Новая функция для команды 'вероятность'
function вероятность(robot, mess, args) {
    if (args.length === 0) {
        mess.channel.send('Пожалуйста, укажите фразу для получения вероятности.');
        return;
    }

    const query = args.join(' '); // Собираем запрос
    const randomValue = Math.floor(Math.random() * 100) + 1; // Генерируем случайное значение от 1 до 100
    mess.channel.send(` ${query} составляет ${randomValue}%.`); // Отправляем ответ
}

// Функция для команды 'pic'
async function pic(robot, mess, args) {
    if (args.length === 0) {
        mess.channel.send('Пожалуйста, укажите запрос для поиска изображений.');
        return;
    }

    const query = args.join(' '); // Собираем запрос
    const searchUrl = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&cx=${searchEngineId}&key=${apiKey}&searchType=image`;

    try {
        const response = await axios.get(searchUrl);
        const items = response.data.items;

        if (items && items.length > 0) {
            const imageUrl = items[0].link;
            mess.channel.send(`Вот изображение по вашему запросу: ${imageUrl}`);
        } else {
            mess.channel.send('Не удалось найти изображения по вашему запросу.');
        }
    } catch (error) {
        console.error('Ошибка при поиске изображений:', error);
        mess.channel.send('Произошла ошибка при поиске изображений.');
    }
}

// Функция для команды 'gif'
async function gif(robot, mess, args) {
    if (args.length === 0) {
        mess.channel.send('Пожалуйста, укажите запрос для поиска GIF.');
        return;
    }

    const query = args.join(' '); // Собираем запрос
    const searchUrl = `https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&q=${encodeURIComponent(query)}&limit=1`;

    try {
        const response = await axios.get(searchUrl);
        const items = response.data.data;

        if (items && items.length > 0) {
            const gifUrl = items[0].images.original.url;
            mess.channel.send(`Вот GIF по вашему запросу: ${gifUrl}`);
        } else {
            mess.channel.send('Не удалось найти GIF по вашему запросу.');
        }
    } catch (error) {
        console.error('Ошибка при поиске GIF:', error);
        mess.channel.send('Произошла ошибка при поиске GIF.');
    }
}

// Функция для команды 'vid'
async function vid(robot, mess, args) {
    if (args.length === 0) {
        mess.channel.send('Пожалуйста, укажите запрос для поиска видео.');
        return;
    }

    const query = args.join(' '); // Собираем запрос
    const searchUrl = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&cx=${searchEngineId}&key=${apiKey}&searchType=video`;

    try {
        const response = await axios.get(searchUrl);
        const items = response.data.items;

        if (items && items.length > 0) {
            const videoUrl = items[0].link;
            mess.channel.send(`Вот видео по вашему запросу: ${videoUrl}`);
        } else {
            mess.channel.send('Не удалось найти видео по вашему запросу.');
        }
    } catch (error) {
        console.error('Ошибка при поиске видео:', error);
        mess.channel.send('Произошла ошибка при поиске видео.');
    }
}

// Определение команд
// Функция для команды 'test'
function test(robot, mess, args) {
    mess.channel.send('Test!'); // Реакция на команду 'test'
}

// Функция для команды 'заебал'
function test1(robot, mess, args) {
    mess.channel.send('мать твою ебал'); // Реакция на команду 'заебал'
}

// Функция для команды 'заебала'
function test2(robot, mess, args) {
    mess.channel.send('мать твою ебала'); // Реакция на команду 'заебала'
}

// Функция для команды 'заебали'
function test3(robot, mess, args) {
    mess.channel.send('мать твою ебали'); // Реакция на команду 'заебали'
}

// Список команд
var comms_list = [
    {
        name: "кто",  // Название команды, на которую будет реагировать бот
        out: кто,     // Название функции с командой
        about: "определить случайного участника" // Описание команды
    },
    {
        name: "вероятность",  // Название команды, на которую будет реагировать бот
        out: вероятность,     // Название функции с командой
        about: "Получить вероятность события по фразе" // Описание команды
    },

    {
        name: "test",  // Название команды, на которую будет реагировать бот
        out: test,     // Название функции с командой
        about: "Тестовая команда" // Описание команды
    },
    {
        name: "заебал",  // Название команды, на которую будет реагировать бот
        out: test1,    // Название функции с командой
        about: "Команда прощания" // Описание команды
    },
    {
        name: "заебала",  // Название команды, на которую будет реагировать бот
        out: test2,    // Название функции с командой
        about: "Команда прощания" // Описание команды
    },
    {
        name: "заебали",  // Название команды, на которую будет реагировать бот
        out: test3,    // Название функции с командой
        about: "Команда прощания" // Описание команды
    },
    {
        name: "pic",  // Название команды для поиска изображений
        out: pic,    // Название функции с командой
        about: "Поиск изображений по запросу" // Описание команды
    },
    {
        name: "gif",  // Название команды для поиска GIF
        out: gif,    // Название функции с командой
        about: "Поиск GIF по запросу" // Описание команды
    },
    {
        name: "vid",  // Название команды для поиска видео
        out: vid,    // Название функции с командой
        about: "Поиск видео по запросу" // Описание команды
    }
];

// Экспорт списка команд
module.exports.comms = comms_list;
