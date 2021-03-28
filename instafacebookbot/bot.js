/*const Telegraf=require('telegraf');
const bot=new Telegraf('1254390243:AAGlsiZoGA5dZFCf4MH41Pm6_daQ2lY3S-o');

bot.use(ctx=>{
    console.log(ctx.chat);
})

bot.launch();
*/

const fetch=require('node-fetch');

let token ="1254390243:AAGlsiZoGA5dZFCf4MH41Pm6_daQ2lY3S-o";
let data = {
  chat_id: "1145357919",
  text: "text"
};

(async()=>{
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    )
    

})();


