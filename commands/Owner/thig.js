const Discord = module.require("discord.js");
const NSFW = require("discord-nsfw");
const { COOLDOWN } = require  ('../../JSON/config.json')
const nsfw = new NSFW();


module.exports = {
  name: "thig",
  cooldown : COOLDOWN,
  description: "Sends hentai thigh pictures.",
  execute: async (client, message, args) => {
    var errMessage = "This is not an NSFW Channel";
    if (!message.channel.nsfw) {
      message.react("💢");

      return message.reply(errMessage).then((msg) => {
        setTimeout(() => msg.delete(), 3000);
      });
    }

    const image = await nsfw.hentaithigh();
    const embed = new Discord.MessageEmbed()
    .setTitle(`Hentai thigh`)
    .setColor("GREEN")
    .setImage(image);
    message.channel.send({ embeds: [embed] });
  },
};