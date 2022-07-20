const Discord = module.require("discord.js");
const { COOLDOWN } = require('../../JSON/config.json');

module.exports = {
  name: "meme",
  category: "FUN",
  cooldown: COOLDOWN,
  botPerms: ["ATTTACH_FILES"],
  execute: async (client, message, args) => {
    var num = Math.floor(Math.random() * (500 - 1) + 1);
    message.reply({
      files: [
        {
          attachment: `https://ctk-api.herokuapp.com/meme/${num}`,
          name: "meme.jpg",
        },
      ],
    });
  },
};