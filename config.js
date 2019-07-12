/*jslint node: true */
"use strict";

var config = {};

config.email = {};
config.email.auth = {};

config.email.host = 'smtp.gmail.com';
config.email.port = 465;
config.email.secure = true;
config.email.auth.user = '';
config.email.auth.pass = '';

config.muellshack = {};
config.muellshack.send_to = '"Mitgliedermailingliste shack e.V." <mitglieder@lists.shackspace.de>';
config.muellshack.url = 'http://openhab.shack/muellshack/';
config.muellshack.types = ['gelber_sack', 'papiermuell', 'restmuell'];

module.exports = config;

