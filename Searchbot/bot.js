const Telegraf = require('telegraf');
const axios = require('axios');

const bot = new Telegraf('1248809051:AAHEeQ3KYcFU6ow-recp3FveR1ujhUsgfsg');

const apikey=`17294299-6fff59dbd40a64ff8d3ee8cd5`;

bot.on('inline_query',async ctx=>{
    let query=ctx.inlineQuery.query;
    let res=await axios.get(`https://pixabay.com/api/?key=${apikey}&q=${query}`);
    let data=res.data.hits;
    console.log(data);
    let results=data.map((item,index)=>{
        return{
            type:'photo',
            id:String(index),
            photo_url:item.webformatURL,
            thumb_url:item.previewURL,
            photo_width:300,
            photo_height:200
        } 
    })

    ctx.answerInlineQuery(results)
})

bot.launch();