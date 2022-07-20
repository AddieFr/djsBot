module.exports = {
    name: 'guildMemberremoval', 
    cooldown: 5000,
    
    /**
     * @param {GuildMember} member 
     * @param {Client} client 
     */
    async execute(member, client) {
        const { guild } = member;
        console.log(`${member.username} leave guilds ${guild.name}`);
    }
}