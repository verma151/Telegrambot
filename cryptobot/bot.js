const Telegraf = require('telegraf');
const axios = require('axios');

const bot = new Telegraf('1075634441:AAHi3RczhS05sxfBmHsjBDHKqL_dF7nSIH8');

const apikey = "7935b462d6723548c3ed085df94cf43c55765da78fa94e45367abd50bce3039c";

bot.command('start', ctx => {
  let startMessage = `Welcome, this bot gives you cryptocurrency information`;
  bot.telegram.sendMessage(ctx.chat.id, startMessage,
    {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "Crypto Prices", callback_data: 'price' }
          ],
          [
            { text: "CoinMarketCap", url: 'https://coinmarketcap.com/' }
          ]
        ]
      }
    })

})

bot.action('start', ctx => {
    ctx.deleteMessage();
    sendStartMessage(ctx);
  })
  
  function sendStartMessage(ctx) {
    let startMessage = `Welcome, this bot gives you cryptocurrency information`;
    bot.telegram.sendMessage(ctx.chat.id, startMessage,
      {
        reply_markup: {
          inline_keyboard: [
            [
              { text: "Crypto Prices", callback_data: 'price' }
            ],
            [
              { text: "CoinMarketCap", url: 'https://coinmarketcap.com/' }
            ]
          ]
        }
      })
  }
  
  bot.action('price', ctx => {
    let priceMessage = `Get Price Information. Select one of the cryptocurrencies below`;
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, priceMessage,
      {
        reply_markup: {
          inline_keyboard: [
            [
              { text: "BTC", callback_data: 'price-BTC' },
              { text: "ETH", callback_data: 'price-ETH' }
            ],
            [
              { text: "BCH", callback_data: 'price-BCH' },
              { text: "LTC", callback_data: 'price-LTC' }
            ],
            [
              { text: "Back to Menu", callback_data: 'start' },
            ],
          ]
        }
      })
  })
  
  let priceActionList = ['price-BTC', 'price-ETH', 'price-BCH', 'price-LTC'];
  bot.action(priceActionList, async ctx => {
    let symbol = ctx.match.split('-')[1];
    console.log(symbol);
  
    try {
      let res = await axios.get(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${symbol}&tsyms=USD&api_key=${apikey}`)
      let data = res.data.DISPLAY[symbol].USD
  
      console.log(data);
  
      let message =
        `
  Symbol: ${symbol}
  Price: ${data.PRICE}
  Open: ${data.OPENDAY}
  High: ${data.HIGHDAY}
  Low: ${data.LOWDAY}
  Supply: ${data.SUPPLY}
  Market Cap: ${data.MKTCAP}
  `;
  
      ctx.deleteMessage();
      bot.telegram.sendMessage(ctx.chat.id, message, {
        reply_markup: {
          inline_keyboard: [
            [
              { text: 'Back to prices', callback_data: 'price' }
            ]
          ]
        }
      })
  
    } catch (err) {
      console.log(err);
      ctx.reply('Error Encountered');
    }
  
  })
  
  bot.launch();

















/*
bot.command('test',ctx=>{
    bot.telegram.sendMessage(ctx.chat.id,'Main Menu',
    {
        reply_markup:{
            inline_keyboard:[
                [
                    {text:'See Fruits List',callback_data:'fruits'}
                    
                ],
                [
                    { text:'See Meats List',callback_data:'meats'}
                    
                ]
                
            ]
        }

    })
})

bot.action('fruits',ctx=>{
    ctx.deleteMessage();
    ctx.answerCbQuery('Hello world');
    //ctx.reply('You clicked the button');
    bot.telegram.sendMessage(ctx.chat.id,'List of fruits:\n-Apples\n-Oranges\n-Pears',
    {
        reply_markup:{
            inline_keyboard:[
                [
                    { text:'Back to menu',callback_data:'menu'}
                    
                ]
                
            ]
        }

    })
})
bot.action('menu',ctx=>{
    ctx.deleteMessage();
    ctx.answerCbQuery('Main menu');
    bot.telegram.sendMessage(ctx.chat.id,'Main Menu',
    {
        reply_markup:{
            inline_keyboard:[
                [
                    {text:'See Fruits List',callback_data:'fruits'}
                    
                ],
                [
                    { text:'See Meats List',callback_data:'meats'}
                    
                ]
                
            ]
        }

    })

})

*/


