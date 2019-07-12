#!/usr/bin/env node
var nodemailer = require('nodemailer');
var Client = require('node-rest-client').Client;
var client = new Client();
var mail_message = require('./lib/mail-message');
var config = require(process.env.CONFIG || './config');
var cron = require('node-cron');


var muellstorage = {};

var muelltypes = config.muellshack.types;
for (var i = 0; i < muelltypes.length; i++) {
  muellstorage[muelltypes[i]] = Object.assign({},{date:null, main_action_done: null, mail_sended: null});
}

console.log(muellstorage);



function getMUELL () {
  var muelltypes = config.muellshack.types;
  for (var i = 0; i < muelltypes.length; i++) {
    console.log('GET Request: ' + muelltypes[i]);
    var req = client.get(config.muellshack.url + muelltypes[i], function (data, response) {
      Object.assign(muellstorage[data.muelltype], data);
      checkSendEmail(data.muelltype);
    });
  }
}

function checkSendEmail(muelltype) {

  //  if(muelltype !== 'gelber_sack') return;

  const limit   = 1;
  var dat_limit = new Date(muellstorage[muelltype].date);
  dat_limit = new Date(dat_limit.setDate(dat_limit.getDate() - limit));

  var min_limit = new Date(dat_limit);
  min_limit.setHours(19,00);
  //  min_limit.setHours(18,44);
  var max_limit = new Date(dat_limit);
  max_limit.setHours(20,00);
  //  max_limit.setHours(18,46);


  console.log(dat_limit);
  console.log(min_limit);
  console.log(max_limit);

  console.log(new Date());
  if (min_limit < new Date() && max_limit > new Date())
  {
    console.log('Mail senden')

    if(muellstorage[muelltype].mail_sended === true) {
      console.log('Mail ist bereits gesendet');
      return;
    }
    if(muellstorage[muelltype].main_action_done === true) {
      console.log('main_action_done is true, no action needed');
      return;
    }

    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport(config.email);

    var mailOptions = mail_message.get_mail_options(muelltype, muellstorage[muelltype].date);

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
      if(error){
        return console.log(error);
      }
      console.log('Message sent: ' + info.response);
      muellstorage[muelltype].mail_sended = true;

      var args = {
        data: {mail_sended: true},
        headers: { "Content-Type": "application/json" }
      };

      client.post(config.muellshack.url + muelltype, args, function (data, response) {
        // parsed response body as js object
        console.log('POST {mail_sended: true}');
      });

    });


  } else {
    console.log('Mail nicht senden')
  }

}


getMUELL();

cron.schedule('0 */5 * * * *', function(){
  getMUELL();
});


cron.schedule('0 31 17 * * *', function(){
  console.log('daily trigger started', new Date());
  getMUELL();
});

cron.schedule('0 */5 * * * *', function(){
  console.log(muellstorage);
});

