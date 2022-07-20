const { COOLDOWN } = require('../../JSON/config.json');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'user',
    cooldown: COOLDOWN,
    aliases: [],
    execute(client, message, args) {

        let target = message.mentions.users.first() || message.author;
        let member = message.guild.members.cache.get(target.id);

        let Embed = new MessageEmbed()
            .setColor('RED')
            .setFields(
                { name: '👤 Username:', value: member.user.username, inline: true },
                { name: '🆔 ID:', value: member.user.id, inline: true },
                { name: '🏓 Tag:', value: `#${member.user.discriminator}`, inline: true },
                { name: '🌐 Mention:', value: `<@${member.user.id}>`, inline: true },
                { name: '🔨 Created at:', value: `${member.user.createdAt.toLocaleString()}`, inline: true },
                { name: '🎉 Joined at:', value: `${member.joinedAt.toLocaleString()}`, inline: true },
            )
            .setThumbnail(member.user.avatarURL({ dynamic: true }))
            .setAuthor({ name: member.user.tag, iconURL: member.user.avatarURL({ dynamic: true }) })
            .setFooter({ text: `Tasked from: ${message.author.username}`, iconURL: message.author.avatarURL({ dynamic: true }) })
            .setTimestamp()
        message.reply({ embeds: [Embed] });

    }
}