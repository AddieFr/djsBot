const { Client, Intents, Collection, MessageEmbed, MessageSelectMenu, MessageActionRow, Util } = require('discord.js');
const { aliases } = require('./commands/Public/user');
const { TOKEN, PREFIX } = require('./JSON/config.json');

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.DIRECT_MESSAGE_TYPING,
        Intents.FLAGS.GUILD_PRESENCES, 
    ]
});

client.commands = new Collection();
client.events = new Collection();

['commands', 'events'].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

// slowmode script
client.on('messageCreate', async (shyizen) => {
    if (shyizen.content.toLowerCase().startsWith(PREFIX + "slowmode")) { 
        if (!shyizen.member.permissions.has('ADMINISTRATOR')) return shyizen.reply({ embeds: [new MessageEmbed().setDescription(`:x: - You don't have \`ADMINISTRATOR\` permissions`)] })
     if (shyizen.author.bot) return;
     if (shyizen.channel.type == "dm") {
       return;
     }
     var args = shyizen.content.split(" ")
     let time = shyizen.channel.rateLimitPerUser
     if (isNaN(args[1])) return shyizen.reply(`This channel slowmode is **${time} second.**`) 
     shyizen.reply(`This channel slowmode has been set to **${args[1]}second.**`)
     shyizen.channel.setRateLimitPerUser(args[1])
   }
 })


  client.on('messageCreate',shyizen =>{
    if (shyizen.content.startsWith(PREFIX + "ban")) {
      if (!shyizen.member.permissions.has('ADMINISTRATOR'))  return shyizen.reply(`**:x: - You don't have \`ADMINISTRATOR\` permissions**`) 
          let args = shyizen.content.split(' ').slice(1);
          
          if (!args[0]) return shyizen.reply({ embeds: [new MessageEmbed()
            .setDescription(`\n\n\n\n**Banned usage ⬇**\n\n\.ban\  \[user]\ \(time m/h/d/mo/y) (reason)\n\n \**Examples:**\n ${PREFIX}ban <@${shyizen.author.id}>\n ${PREFIX}ban <@${shyizen.author.id}> 1h spamming\n ${PREFIX}ban <@${shyizen.author.id}> 1d spamming\n ${PREFIX}ban <@${shyizen.author.id}> 1w`)] })
          let member = shyizen.mentions.members.first() || shyizen.guild.members.cache.get(args[0]);
          
          if (member) {
          
            let reason = args.slice(1).join(' ');
          
            if (!reason) reason = 'none';
          
            let bangif = [
              "https://c.tenor.com/SglvezQEKnAAAAAC/discord-ban.gif",
            ]
            let aziz = bangif[Math.floor(Math.random() * bangif.length)];
          
            member.ban({ reason })
            
              .then(() =>  shyizen.reply({ embeds: [new MessageEmbed().setImage(`${aziz}`).setTitle("This member was banned!").setColor("RED") ] }))
              .catch(() => shyizen.reply('**:x: - I can\'t ban this member**'))
          } else {
            return shyizen.reply('**:x: - I can\'t find this member on the server**' )
          }
  
      }  
  })

  client.on('messageCreate', async message => {

    if (message.content === PREFIX + 'help') {
        const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('Select commands')
                    .setPlaceholder('select')
                    .addOptions([
                        {
                            label: 'General Commands',
                            description: 'general flamingo bot commands',
                            value: 'first_option',
                        },
                        {
                            label: 'Fun Commands',
                            description: 'Fun flamingo bot commands',
                            value: 'second_option',
                        },
                        {
                          label: 'Moderator Commands',
                          description: 'Moderator flamingo bot commands',
                          value: '3th_option',
                      },
                    ]),
            );

         message.channel.send({ content: 'Choose the commands you need help with:', components: [row] });
    }
});

client.on("interactionCreate" , interaction => {
  if(!interaction.isSelectMenu()) return;
  if(interaction.values == "first_option") {
    interaction.reply({content:` ${PREFIX}user [mention, id] \n ${PREFIX}avatar [mention, id]` , ephemeral : true})
  }
  if(interaction.values == "second_option") {
    interaction.reply({content:`${PREFIX}pat [mention, id] \n ${PREFIX}cat \n ${PREFIX}anime [ anime name ] \n ${PREFIX}kiss [mention, id] \n ${PREFIX}hug [mention, id]  \n ${PREFIX}meme` , ephemeral : true})
  }
  if(interaction.values == "3th_option") {
    interaction.reply({content:`${PREFIX}ban [mention, id] \n ${PREFIX}unban [id] \n ${PREFIX}mute [mention, id] \n ${PREFIX}kick [mention, id] \n ${PREFIX}timeout [mention, id] \n ${PREFIX}say [just for important events] \n ${PREFIX}hide [everyone can't see the channel] \n ${PREFIX}show [everyone can see the channel]` , ephemeral : true})
  }
});



client.on('messageCreate', message => {
  if (message.content.includes("https://")){
    message.delete()
    message.channel.send("Posting \`links`\ is prohibited here ❌").then(message => {
      setTimeout(() => message.delete(), 5000)
  })
  }
})

const { inviteTracker } = require("discord-inviter")

tracker = new inviteTracker(client)
tracker.on("guildMemberAdd", async (member, inviter, invite) => {
    try {
            const ch = member.guild.channels.cache.get("904437194217893898")
            await ch.send({ content: `**<@${member.user.id}>**<:933800665686376468:972383147171921920> Welcome to **${member.guild.name}**\n:wave:Your number: **${member.guild.memberCount}**\n:blue_heart: Invited by: <@!${inviter.id}> ` })


    } catch (err) {
       console.log(err)
    }
}) 



tracker = new inviteTracker(client)
tracker.on("guildMemberRemove", async (member, inviter, invite) => {
    try {
            const ch = member.guild.channels.cache.get("904437194217893898")
            await ch.send(`member has left in the server!!`)


    } catch (err) {
       console.log(err)
    }
}) 



client.login(TOKEN);