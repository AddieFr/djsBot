const { COOLDOWN } = require('../../JSON/config.json');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'server',
    cooldown: COOLDOWN,
    aliases: [],
    execute(client, message, args) {

        let Embed = new MessageEmbed()
            .setColor('RED')
            .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
            .setDescription(`**Owner** <@${message.guild.ownerId}> | ${message.guild.ownerId}\n**Created at** ${message.guild.createdAt.toLocaleString()}`)
            .addFields(
                {name: 'Members', value: `${message.guild.memberCount}`, inline: true},
                {name: 'Channels', value: `${message.guild.channels.cache.size}`, inline: true}
            )
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setImage(message.guild.iconURL({ dynamic: true }))
            .setFooter({ text: `Tasked from: ${message.author.username}`, iconURL: message.author.avatarURL({ dynamic: true }) })
            .setTimestamp()

        message.reply({ embeds: [Embed] });

    }
}