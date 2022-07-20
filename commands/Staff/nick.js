const { COOLDOWN } = require('../../JSON/config.json');
const Discord = module.require("discord.js");

module.exports = {
  name: "nick",
  cooldown: COOLDOWN,
  aliases: ["changename", "cname", "اسم"],
  category: "Staff",
  execute: async (client, message, args) => {
    let mentionMember = message.mentions.members.first();
    let newNickname = args.slice(1).join(" ");
    if (!mentionMember) {
      return message.reply("Mention the user you want to change the nickname");
    }
    if (!newNickname) {
      return message.reply("Input the new nickname for the user you mentioned");
    }
    try {
      mentionMember.setNickname(newNickname);
    } catch (error) {
      message.reply(
        "Can't change nickname of this user, does he have a higher role? Is the server creator? Have I got the permission to change his nickname?"
      );
    }
    message.channel.send(
      `Member changed nickname to **${newNickname}**`
    );
  },
};