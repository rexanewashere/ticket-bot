const { Client, EmbedBuilder, ActionRowBuilder,
  StringSelectMenuBuilder,
  ButtonBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  StringSelectMenuOptionBuilder,
  PermissionFlagsBits,
  ComponentType, 
  messageLink} = require('discord.js');
const config = require('./config.json');
const client = new Client({intents: [3276799]});

client.on('messageCreate', (msg) => {
    if (msg.author.id === client.user.id){
        return
    }
    if (msg.content === "!ticket"){
      if (msg.member.roles.cache.has(config.kurucurol)){
        const embed = new EmbedBuilder()
        .setTitle(":ticket: __Hostawex Destek Sistemi__")
        .setDescription("```diff\n+Discord'un En Güvenilir Hosting Yeri```\n**Aşağıdaki menüyü kullanarak ihtiyacınız olan destek kategorisini seçebilirsiniz.** \n \n _Talebiniz en kısa sürede destek ekibimiz tarafından yanıtlanacaktır._ \n \n :pencil: **Genel Destek** \n > Genel sorular, bilgi alma ve diğer talepler için. \n :video_game: **Oyun Destek** \n > Oyun ile ilgili sorunları için. \n :question: **Diğer** \n > Bu Kategorilere Girmeyen Diğer Konular İçin");
        embed.setImage("https://r.resimlink.com/GO8ai.png");
        embed.setColor(0x00ff000)
        embed.setThumbnail("https://r.resimlink.com/iN-fqS9YOdz4.png");
        const embed2 = new EmbedBuilder()
        .setTitle(":alarm_clock: __Mesai Saatleri__")
        .setDescription("## Destek ekibimiz aşağıdaki saatlerde hizmet vermektedir:")
        .addFields(
            { name: ":man_office_worker: Hafta İçi", value: "```09:00 - 23:00```", inline: true },
            { name: ":beach: Hafta Sonu", value: "```10:00 - 22:30```", inline: true },
            { name: ":clock3: Saat Dilimi", value: "```UTC+3 (Türkiye)```", inline: true },
            { name: ":loudspeaker: Önemli Not", value: "> Resmi tatillerde destek hizmeti kısıtlı olabilir.", inline: true }
        );
        embed2.setColor(0x00ffff);
        const selmenu = new StringSelectMenuBuilder()
        .setCustomId("category")
        .setPlaceholder("Aşağıdaki Kısımdan Kategoriyi Seçebilirsiniz 👇")
        .addOptions(
            new StringSelectMenuOptionBuilder()
            .setLabel("Genel Destek")
            .setDescription("Genel sorular, bilgi alma ve diğer talepler için.")
            .setEmoji("📝")
            .setValue("genel"),
            new StringSelectMenuOptionBuilder()
            .setLabel("Oyun Destek")
            .setDescription("Oyun ile ilgili sorunları için.")
            .setEmoji("🎮")
            .setValue("oyun"),
            new StringSelectMenuOptionBuilder()
            .setLabel("Diğer")
            .setDescription("Bu Kategorilere Girmeyen Diğer Konular İçin.")
            .setEmoji("❓")
            .setValue("diger"),
        );
        const row = new ActionRowBuilder().addComponents(selmenu);
        msg.channel.send({ embeds: [embed, embed2], components: [row]})
    }
  }
});

client.on('interactionCreate', async (inter) => {
    if (inter.customId === "category"){
    const secim = inter.values[0];
    if (secim === 'genel'){
        const ticketchannel = await inter.guild.channels.create({
            name: `genel-${inter.user.username}`,
            type: 0,
            permissionOverwrites: [
        {
          id: inter.guild.roles.everyone,
          deny: [PermissionFlagsBits.ViewChannel],
        },
        {
          id: inter.user.id,
          allow: [PermissionFlagsBits.ViewChannel],
        },
        {
            id: config.yetkilirol,
            allow: [PermissionFlagsBits.ViewChannel],
        }
      ]
        });
        const now = new Date();

const sonuc = Math.floor(Date.now() / 1000);
        const embed = new EmbedBuilder()
        .setTitle(":ticket: Hostawex Destek Sistemi")
        .setDescription(`> :wave: Merhaba <@${inter.user.id}>, \n > Destek talebiniz başarıyla oluşturuldu. Personel ekibimiz kısa süre içinde size yardımcı olacaktır. \n \n :pencil: **Talep Bilgisi:** \n \n`)
        .addFields(
            {name: "Ticket Bölümü", value: "__Genel__", inline: true},
            {name: "İlgilenen Yetkili", value: "", inline: true},
            {name: "Oluşturulma Zamanı", value: `<t:${sonuc}:R>`, inline: true},
        );
        const button = new ButtonBuilder()
        .setCustomId(`sahiplen-${sonuc}-${inter.user.id}`)
        .setLabel("Ticket'i Sahiplen")
        .setStyle("Primary")
        .setEmoji("👥");
        const button1 = new ButtonBuilder()
        .setCustomId(`kullanıcı`)
        .setLabel("Kullanıcı Ekle/Çıkar")
        .setStyle("Success")
        .setEmoji("✨");
        const button2 = new ButtonBuilder()
        .setCustomId(`iban`)
        .setLabel("IBAN Yolla")
        .setStyle("Secondary")
        .setEmoji("👥");
        const button3 = new ButtonBuilder()
        .setCustomId(`kapat-${inter.user.id}`)
        .setLabel("Desteği kapat")
        .setStyle("Danger")
        .setEmoji("⛔");
        const row = new ActionRowBuilder().addComponents(button, button1, button2, button3);
        await inter.reply({ content: `Kanalınız Başarıyla Oluşturuldu: <#${ticketchannel.id}>`, ephemeral: true});
        await ticketchannel.send({ content: `<@${inter.user.id}> | <@&${config.yetkilirol}>`, embeds: [embed], components: [row] })

        const perms = await inter.guild.roles.cache.get("1374092445922496523");
        const admins = perms.members.map(member => member.user.id);
        admins.forEach(adm => {
          const user = client.users.cache.get(adm);
          const embed = new EmbedBuilder()
          .setTitle(`Merhaba ${user.username}`)
          .setColor(0x0000ff)
          .setDescription(`Şuanda **${inter.guild.name}** Sunucumuzda Aktif Bir Destek Talebi Bekliyor. \n Lütfen En Kısa Zamanda İlgileniniz. \n => <#${ticketchannel.id}>`);
          user.send({ embeds: [embed] });
        });
      }
    else if (secim === 'oyun'){
        const ticketchannel = await inter.guild.channels.create({
            name: `oyun-${inter.user.username}`,
            type: 0,
            permissionOverwrites: [
        {
          id: inter.guild.roles.everyone,
          deny: [PermissionFlagsBits.ViewChannel],
        },
        {
          id: inter.user.id,
          allow: [PermissionFlagsBits.ViewChannel],
        },
        {
            id: config.yetkilirol,
            allow: [PermissionFlagsBits.ViewChannel],
        }
      ]
        });
        const sonuc = Math.floor(Date.now() / 1000);
        const embed = new EmbedBuilder()
        .setTitle(":ticket: Hostawex Destek Sistemi")
        .setDescription(`> :wave: Merhaba <@${inter.user.id}>, \n > Destek talebiniz başarıyla oluşturuldu. Personel ekibimiz kısa süre içinde size yardımcı olacaktır. \n \n :pencil: **Talep Bilgisi:** \n \n`)
        .addFields(
            {name: "Ticket Bölümü", value: "__Oyun__", inline: true},
            {name: "İlgilenen Yetkili", value: "", inline: true},
            {name: "Oluşturulma Zamanı", value: `<t:${sonuc}:R>`, inline: true},
        );
        const button = new ButtonBuilder()
        .setCustomId(`sahiplen-${sonuc}-${inter.user.id}`)
        .setLabel("Ticket'i Sahiplen")
        .setStyle("Primary")
        .setEmoji("👥");
        const button1 = new ButtonBuilder()
        .setCustomId(`kullanıcı`)
        .setLabel("Kullanıcı Ekle/Çıkar")
        .setStyle("Success")
        .setEmoji("✨");
        const button2 = new ButtonBuilder()
        .setCustomId(`iban`)
        .setLabel("IBAN Yolla")
        .setStyle("Secondary")
        .setEmoji("👥");
        const button3 = new ButtonBuilder()
        .setCustomId(`kapat-${inter.user.id}`)
        .setLabel("Desteği kapat")
        .setStyle("Danger")
        .setEmoji("⛔");
        const row = new ActionRowBuilder().addComponents(button, button1, button2, button3);
        await inter.reply({ content: `Kanalınız Başarıyla Oluşturuldu: <#${ticketchannel.id}>`, ephemeral: true});
        await ticketchannel.send({ content: `<@${inter.user.id}> | <@&${config.yetkilirol}>`, embeds: [embed], components: [row] })

        const perms = await inter.guild.roles.cache.get("1374092445922496523");
        const admins = perms.members.map(member => member.user.id);
        admins.forEach(adm => {
          const user = client.users.cache.get(adm);
          const embed = new EmbedBuilder()
          .setTitle(`Merhaba ${user.username}`)
          .setColor(0x0000ff)
          .setDescription(`Şuanda **${inter.guild.name}** Sunucumuzda Aktif Bir Destek Talebi Bekliyor. \n Lütfen En Kısa Zamanda İlgileniniz. \n => <#${ticketchannel.id}>`);
          user.send({ embeds: [embed] });
        });
    }
    else if (secim === 'diger'){
        const ticketchannel = await inter.guild.channels.create({
            name: `diger-${inter.user.username}`,
            type: 0,
            permissionOverwrites: [
        {
          id: inter.guild.roles.everyone,
          deny: [PermissionFlagsBits.ViewChannel],
        },
        {
          id: inter.user.id,
          allow: [PermissionFlagsBits.ViewChannel],
        },
        {
            id: config.yetkilirol,
            allow: [PermissionFlagsBits.ViewChannel],
        }
      ]
        });
        const sonuc = Math.floor(Date.now() / 1000);
        const embed = new EmbedBuilder()
        .setTitle(":ticket: Hostawex Destek Sistemi")
        .setDescription(`> :wave: Merhaba <@${inter.user.id}>, \n > Destek talebiniz başarıyla oluşturuldu. Personel ekibimiz kısa süre içinde size yardımcı olacaktır. \n \n :pencil: **Talep Bilgisi:** \n \n`)
        .addFields(
            {name: "Ticket Bölümü", value: "__Diğer__", inline: true},
            {name: "İlgilenen Yetkili", value: "", inline: true},
            {name: "Oluşturulma Zamanı", value: `<t:${sonuc}:R>`, inline: true},
        );
        const button = new ButtonBuilder()
        .setCustomId(`sahiplen-${sonuc}-${inter.user.id}`)
        .setLabel("Ticket'i Sahiplen")
        .setStyle("Primary")
        .setEmoji("👥");
        const button1 = new ButtonBuilder()
        .setCustomId(`kullanıcı`)
        .setLabel("Kullanıcı Ekle/Çıkar")
        .setStyle("Success")
        .setEmoji("✨");
        const button2 = new ButtonBuilder()
        .setCustomId(`iban`)
        .setLabel("IBAN Yolla")
        .setStyle("Secondary")
        .setEmoji("👥");
        const button3 = new ButtonBuilder()
        .setCustomId(`kapat-${inter.user.id}`)
        .setLabel("Desteği kapat")
        .setStyle("Danger")
        .setEmoji("⛔");
        const row = new ActionRowBuilder().addComponents(button, button1, button2, button3);
        await inter.reply({ content: `Kanalınız Başarıyla Oluşturuldu: <#${ticketchannel.id}>`, ephemeral: true});
        await ticketchannel.send({ content: `<@${inter.user.id}> | <@&${config.yetkilirol}>`, embeds: [embed], components: [row] })

        const perms = await inter.guild.roles.cache.get("1374092445922496523");
        const admins = perms.members.map(member => member.user.id);
        admins.forEach(adm => {
          const user = client.users.cache.get(adm);
          const embed = new EmbedBuilder()
          .setTitle(`Merhaba ${user.username}`)
          .setColor(0x0000ff)
          .setDescription(`Şuanda **${inter.guild.name}** Sunucumuzda Aktif Bir Destek Talebi Bekliyor. \n Lütfen En Kısa Zamanda İlgileniniz. \n => <#${ticketchannel.id}>`);
          user.send({ embeds: [embed] });
        });
    }
}
else if (inter.customId.includes("sahiplen")){
      const time = inter.customId.split("-");
    if (inter.user.id !== time[2] && inter.member.roles.cache.has(config.yetkilirol)){
    const unix = time[1];
    const embed = new EmbedBuilder()
        .setTitle(":ticket: Hostawex Destek Sistemi")
        .setDescription(`> :wave: Merhaba <@${inter.user.id}>, \n > Destek talebiniz başarıyla oluşturuldu. Personel ekibimiz kısa süre içinde size yardımcı olacaktır. \n \n :pencil: **Talep Bilgisi:** \n \n`)
        .addFields(
            {name: "Ticket Bölümü", value: "__Genel__", inline: true},
            {name: "İlgilenen Yetkili", value: `<@${inter.user.id}>`, inline: true},
            {name: "Oluşturulma Zamanı", value: `<t:${unix}:R>`, inline: true},
        );

    await inter.update({ embeds: [embed] });
}else{
  await inter.reply({ content: ":x: **Bu Ticketi Sahiplenemezsin!**", ephemeral: true })
}
}
else if (inter.customId === "iban"){
  const embed = new EmbedBuilder()
  .setTitle("💸 İşte IBAN Bilgileri")

  .setDescription(`\`\`\`${config.iban}\`\`\``)
  .setFooter({ text: "Hostawex Servisleri", iconURL: "https://r.resimlink.com/iN-fqS9YOdz4.png" })
  .setTimestamp()
  .setColor(0xff0000);
  inter.channel.send({ embeds: [embed] });
}
else if(inter.customId.includes("kapat")){
  const time = inter.customId.split('-');
  if (inter.user.id !== time[1] && inter.member.roles.cache.has(config.yetkilirol)){
    const btn = new ButtonBuilder()
    .setCustomId(`onay-${time[1]}`)
    .setLabel('Onayla')
    .setEmoji('✅')
    .setStyle('Success');
    const btn2 = new ButtonBuilder()
    .setCustomId("ret")
    .setLabel('Vazgeç')
    .setEmoji('❌')
    .setStyle('Danger');
    const row = new ActionRowBuilder().addComponents(btn, btn2);
    const resp = await inter.reply({ content: "Ticketi Kapatmayı Onaylıyormusunuz?", components: [row]})
  }
}
else if (inter.customId.includes("onay")){
  const kw = inter.customId.split('-');
  const user = client.users.cache.get(kw[1])
  await inter.channel.delete();
  const embed = new EmbedBuilder()
  .setTitle("Bizimle Deneyiminizi Paylaşın")
  .setDescription(`Merhaba <@${user.id}> En Son Açmış Olduğunuz Ticket'taki Deneyiminizi Bizimle Aşağıdaki Form Butonu İle Paylaşın.`)
  embed.setImage("https://r.resimlink.com/GO8ai.png");
        embed.setColor(0x00ff000)
        embed.setThumbnail("https://r.resimlink.com/iN-fqS9YOdz4.png");
  const btn = new ButtonBuilder()
  .setCustomId('formbtn')
  .setLabel('Formu Aç')
  .setStyle('Success');
  const row = new ActionRowBuilder().addComponents(btn);
  await user.send({ embeds: [embed], components: [row] });
}
else if (inter.customId === "ret"){
  const message = await inter.reply({ content: ":x: **Kapatma Talebiniz Geri Çekildi**" })
  await inter.message.delete();
  setTimeout(() => {
    message.delete();
  }, 2000)
}
else if (inter.customId === "kullanıcı"){
  const modal = new ModalBuilder()
  .setTitle('Kullanıcı Ekle veya Çıkar')
  .setCustomId("kullanıcıislem");

  const inp1 = new TextInputBuilder()
  .setLabel('Kullanıcı ID\'si')
  .setCustomId('id')
  .setPlaceholder('Örn: 12345678123')
  .setRequired(true)
  .setStyle(TextInputStyle.Short);

  const row = new ActionRowBuilder().addComponents(inp1);
  modal.setComponents(row);
  inter.showModal(modal);
}
else if  (inter.customId === "kullanıcıislem"){
  const text = inter.fields.getTextInputValue('id');
  const mevcutIzinler = inter.channel.permissionOverwrites.cache.map(overwrite => ({
  id: overwrite.id,
  allow: overwrite.allow.bitfield,
  deny: overwrite.deny.bitfield,
}));
const overwrites = inter.channel.permissionOverwrites.cache;
const user2Overwrite = overwrites.get(text);

if (user2Overwrite && user2Overwrite.allow.has('ViewChannel')){
  mevcutIzinler.push({
  id: text,
  allow: [],
  deny: ["ViewChannel", "SendMessages"],
});

await inter.channel.edit({
  permissionOverwrites: mevcutIzinler
});
await inter.reply({ content: `:white_check_mark: Başarıyla <@${text}> Kullanıcısı Destekten Çıkarıldı.` })
}else{
  mevcutIzinler.push({
  id: text,
  allow: ["ViewChannel", "SendMessages"],
  deny: [],
});
  await inter.channel.edit({
  permissionOverwrites: mevcutIzinler
});
await inter.reply({ content: `:white_check_mark: Başarıyla <@${text}> Kullanıcısı Desteğe Eklendi.` })
}
}
else if(inter.customId === "formbtn"){
  const modal = new ModalBuilder()
  .setCustomId("degerform")
  .setTitle("Değerlendirme Formu");

  const inp1 = new TextInputBuilder()
  .setCustomId("puan")
  .setLabel('Puanınınız')
  .setPlaceholder("1-10?")
  .setStyle(TextInputStyle.Short)
  .setMinLength(0)
  .setRequired(false)
  .setMaxLength(2);
  const inp2 = new TextInputBuilder()
  .setCustomId("yorum")
  .setLabel('Yorumunuz')
  .setPlaceholder("1-10?")
  .setStyle(TextInputStyle.Paragraph)
  .setRequired(false);

  const row = new ActionRowBuilder().addComponents(inp1);
  const row2 = new ActionRowBuilder().addComponents(inp2);
  modal.addComponents(row, row2);
  inter.showModal(modal);
}
else if (inter.customId === "degerform"){
  const puan = inter.fields.getTextInputValue('puan');
const yorum = inter.fields.getTextInputValue('yorum');

if (Number(puan) && Number(puan) <= 10 && Number(puan >= 0)){
const embed = new EmbedBuilder()
  .setTitle(`${inter.user.username} Kullanıcısının Değerlendirmesi`)
  .setDescription(`**Puanı:**\n\`\`\`${'⭐'.repeat(Number(puan))}\`\`\`\n\n**Yorumu:**\n\`\`\`${yorum}\`\`\``)
  .setFooter({
    text: `${inter.user.username} tarafından kullanıldı`,
    iconURL: inter.user.avatarURL({ dynamic: true, size: 1024 })
  })
  .setColor(0xffff00)
  .setThumbnail(inter.user.avatarURL({ dynamic: true, size: 1024 }))
  .setImage("https://r.resimlink.com/GO8ai.png")
  .setTimestamp();

const logChannel = inter.client.channels.cache.get(config.kullanicilog);
  const msg = await logChannel.send({ embeds: [embed] });
  const msglink = `https://discord.com/channels/@me/${config.kullanicilog}/${msg.id}`;
  inter.reply(`Değerlendirmeniz Başarıyla İletildi => ${msglink}`)
}
}
});


client.on('ready', () => {
    console.log("hazır");
});

client.login(config.token);