/*Copyright (c) 2017 Daniel Gray
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/



const discord = require("discord.js");
const MongoClient = require('mongodb').MongoClient;
const assert = require("assert");
const moment = require("moment");
require("moment-duration-format");
const url = 'mongodb://danielserver.local:27017/DanBot';
const client = new discord.Client();
const config = require("./config.json")
const version = "V1.0.0"
const footermessage = `DanBot, ${version}`

process.on("unhandledRejection", err => {
    console.error("Uncaught Promise Error: \n" + err.stack);
});

client.on('ready', () => {
  console.log("Bot is online!");
});

client.on('message', (message) => {
  let args = message.content.split(" ").slice(1);
  let usermessage = message.content.toLowerCase()
  if (message.author.bot) return;
  if (usermessage == config.prefix + "areyoualive?") {
    message.channel.sendMessage("", {
      embed: {
        title: "Am I alive?",
        color: 0x06DF00,
        description: "Yes, I am still alive!",
        footer: {
          iconURL: client.avatarURL,
          text: "DanBot, " + version
        }
      }
    });
  };

  //Leave this command in here or you will be copyright claimed!!
  if (usermessage == config.prefix + "credits") {
    message.channel.sendMessage("", {
      embed: {
        title: "Credits?",
        color: 0x06DF00,
        description: "This bot was made by Daniel Gray. You can find him here: [danielgray.me](https://danielgray.me)",
        footer: {
          iconURL: client.avatarURL,
          text: "DanBot, " + version
        }
      }
    });
  };

  if (usermessage == config.prefix + "credits") {
    message.channel.sendMessage("", {
      embed: {
        title: "Credits?",
        color: 0x06DF00,
        description: "This bot was made by Daniel Gray. You can find him here: [danielgray.me](https://danielgray.me)",
        footer: {
          iconURL: client.avatarURL,
          text: "DanBot, " + version
        }
      }
    });
  };

  if(usermessage == config.prefix + "stats") {
    message.channel.sendMessage("", {
      title: "Statistics",
      color: 0x06DF00,
      fields: [{
        name: 'Uptime',
        value: `${moment.duration(client.uptime).format("D [days], H [hrs], M[mins], s [secs]")}`
      }, {
        name: "Discord API ver:",
        value: `${discord.version}`
      }, {
        name: "Servers:",
        value: `I'm on ${client.guilds.size}!`
      }, {
        name: "Memory Usage:",
        value: `I'm currently using ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`
      }],
    })
  }
});


client.login(config.botToken);
