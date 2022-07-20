const { COOLDOWN} = require('../../JSON/config.json')

module.exports = {
    name: 'guildMemberAdd',
    cooldown: COOLDOWN,
    aliases: ['Memberadd', 'Newmemberadd'],
    
    /**
     * @param {GuildMember} member 
     * @param {Client} client 
     */
    async execute(member, client) {
        const { guild } = member;
        console.log(`${member.username} join guilds ${guild.name}`);
    }
}