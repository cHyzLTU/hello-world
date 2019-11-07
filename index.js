const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, RichEmbed } = require('discord.js');
const PREFIX = '!';
const ms = require('ms');
const {prefix} = require('./config.json');
const token = 'NjM5Mzk2ODA2NjM1MTU5NTUy.XcHEzw.7Cdmn5yNGfcHY1RCVXulzh3CipA';

client.on('ready', () =>{
    console.log('Botas paleistas!');
    client.user.setActivity('GTAKaimeliai.lt', { type: "PLAYING"}).catch(console.error);
})
/////////////////////////////////////////////////////////////////////////////////////////////////////////// time mute
client.on('message', message => {
  let args = message.content.substring(PREFIX.length).split(" ");

  switch (args[0]) {
      case 'mute':
          var person  = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));
          if(!person) return  message.channel.send("Nerastas **narys.**")

          let role = message.guild.roles.find(role => role.name === "Muted");
         

          if(!role) return message.channel.send("Nerasta **rolė.**")


          let time = args[2];
          if(!time){
              return message.channel.send("Nenurodytas **laikas**!");
          }

          person.addRole(role.id);

          message.channel.send(`> **@${person.user.tag}** buvo užtildytas **${ms(ms(time))}** administratoriaus.`)

          setTimeout(function(){
             
              person.removeRole(role.id);
              console.log(role.id)
              message.channel.send(`> **@${person.user.tag}** buvo atitildytas.`)
          }, ms(time));


 
      break;
  }


});
/////////////////////////////////////////////////////////////////////////////////////////////////////////// CUSTOM KOMANDOS
client.on('message', message=>{

  let args = message.content.substring(PREFIX.length).split(" ");

  switch(args[0]){
    case 'valyti':
      if(!args[1]) return message.channel.send('**Klaida.** Nenurodytas kiekis.')
      message.channel.bulkDelete(args[1]);
      break;
  }
})
/////////////////////////////////////////////////////////////////////////////////////////////////////////// embed zinute apie ip
client.on('message', message => {
  if (message.content === '!ip'){
    const embed = new Discord.RichEmbed()
      .setTitle('**SERVERIO IP ADRESAS:**')
      .setColor(0xd42d2d)
      .setDescription('**IP:** 89.40.15.89:30120')
      .addField('••• Serveris yra **išjungtas.**', 'Kita informacija kanale **#informacija**.')
      .setFooter('GTAKaimeliai.lt © 2019')
    message.channel.sendEmbed(embed);
  }
  }
);
///////////////////////////////////////////////////////////////////////////////////////////////////////////

client.login(token);