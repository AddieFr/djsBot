const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'unmute',
    aliases: ['um', 'تكلم'],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    execute: async (client, message, args, Discord) => {

        const member = message.mentions.members.first();
        let target = message.guild.members.cache.get(member.id)
        const role = message.guild.roles.cache.find(role => role.name === 'Muted')

        target.roles.remove(role.id);
        message.reply('Member has been unmuted')


    }
}