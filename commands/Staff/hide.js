const Discord = require("discord.js")
const { COOLDOWN } = require('../../JSON/config.json');


module.exports = {
    name: "hide",   
    aliases: ["أخفاء"],   
    cooldown: COOLDOWN,

   async execute(client, message, args) {
      let target = message.guild.members.cache.get(message.author.id)
      let author = `${target.user.tag}`
    
     
      let channel = message.guild.channels.cache.get(args[0])
      if(!channel) channel = message.channel;
      const role = message.guild.roles.cache.find(r => r.name === '@everyone')
    
  
      if (!message.member.permissions.has("ADMINISTRATOR")) {
            return message.reply(`  <@${target.user.id}> You need **ADMINISTRATOR** permission for this command`)
            .then(msg => {
                setTimeout(() => msg.delete(), 5000)
            })
            .catch("Eror")
        } 

        if (!message.guild.me.permissions.has("ADMINISTRATOR")) {
            return message.reply(`I don't have **ADMINISTRATOR** permission for this command`)
            .then(msg => {
                setTimeout(() => msg.delete(), 5000)
            })
            .catch("Eror")
        } 
        
        if (channel.permissionsFor(message.guild.id ).has( 'VIEW_CHANNEL') === false){
          return message.channel.send(`${channel} is already hidden!`);
        }
        
        await  message.channel.permissionOverwrites.edit(message.guild.id, { VIEW_CHANNEL: false }).catch(() => {})

        await  message.channel.permissionOverwrites.edit(role, { VIEW_CHANNEL: false }).catch(() => {})


         message.react('✅')


        

    }
}