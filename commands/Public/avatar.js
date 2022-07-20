const { COOLDOWN } = require('../../JSON/config.json');
const discord = module.require("discord.js");


module.exports = {
  name: "avatar",
  cooldown: COOLDOWN,
  aliases: ["av"],
  category: "PUBLIC",
  botPerms: ["EMBED_LINKS", "MANAGE_MESSAGES"],
  execute: async (client, message, args) => {
    let user = message.mentions.users.first() || message.author;
    let embed = new discord.MessageEmbed()
      .setColor("RED")
      .setTitle(`${user.username}'s Avatar`)
      .setDescription(
        `[Avatar Link](${user.displayAvatarURL({
          size: 2048,
          dynamic: true,
          format: "png",
        })})`
      )
      .setImage(user.avatarURL({ size: 2048, dynamic: true, format: "png" }));

    message.channel.send({ embeds: [embed] });
    message.delete();
  },
};