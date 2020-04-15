const config = require('./config')
const twit = require('twit')
const cliente = new twit(config)

function pesquisa() {
  let params = {
    q: 'opnião',
    count: 10
  }
  cliente.get('search/tweets', params, (err, data, response) => {
    let tweets = data.statuses


    if (!err) {

      for (let dat of tweets) {
        let id = dat.id_str
        let txt = dat.text
        let name = dat.user.screen_name

        if (txt.includes("opnião")) {
          var txt_correto = txt.replace("opnião", "OPINIÃO")
        }
        else if (txt.includes("opniao")) {
          var txt_correto = txt.replace("opniao", "OPINIÃO")
        }

        if (txt_correto == undefined) {
          txt_correto = "OPINIÃO"
        }
        txt = txt.replace(/@Bot_Opiniao/g, '');
        var replyText = '@' + name + ' ' + txt_correto;


        cliente.post('statuses/update', { status: replyText, in_reply_to_status_id: id }, tweeted);
        function tweeted(err, reply) {
          if (err) {
            console.log(err.message);
          } else {
            console.log('Tweeted: ' + reply.text);
          }
        }

      }
    }
  }
  )
}

cliente.Followback = function(msg){
  //console.log('Seguindo @' +msg)
  cliente.get("followers/list", { screen_name: "Bot_Opiniao"},function (error, data, response) {
    if (!error) {
      const teste = data.users.splice(0,1)
      var teste1 = teste[0]
      var usuario = teste1.screen_name
      //console.log(usuario);
      //cliente.tweetar("@"+usuario+" testando")
    }  
})
  //cliente.post("friendships/create", {user_id: })
}

cliente.tweetar = function(msg){
  cliente.post("statuses/update", { status : msg}, function (error, tweet, response) {
    if (!error) console.log("Tweet enviado.");
})
}

cliente.tweetar("Iniciando.")

//cliente.Followback()
setInterval(pesquisa, 480.000)