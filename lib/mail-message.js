
'use strict'

var moment = require('moment');
moment.locale('de-DE');

function get_mail_options(muellarg, date, send_to) {
	var muellname = false;

	switch (muellarg) {
		case 'gelber_sack':
			muellname = 'Gelber Sack';
			break;
		case 'restmuell':
			muellname = 'Restmüll';
			break;
		case 'papiermuell':
			muellname = 'Papiermüll';
			break;
		default:
			return false;
	}

	var datestr = moment(date).format("dddd, DD. MMMM YYYY")

	var mailOptions = {
		from: '"shack Muell Mailer Service " <cube8cup@gmail.com>', // sender address
		//to: 'blablub@uescher.de', // list of receivers
		to: send_to, // list of receivers
		subject: '[SMMS] ' + muellname + ' wird morgen abgeholt', // Subject line
		text: 'Hallo shack,\n\nMorgen ( ' + datestr + ' ) wird der ' + muellname + ' abgeholt.\n' +
		'\nBitte bringe den Müll nach unten und lass die Mülltone aufgeschlossen!\n\n' +
		'Dieser Service wird präsentiert von:\n[SMMS] shack Muell Mailer Service [0]\n\n' +
		'[0] http://shackspace.de/wiki/doku.php?id=muellabholung'
	};

	if (muellarg === 'gelber_sack') {
		mailOptions.text = 'Hallo shack,\n\nMorgen ( ' + datestr + ' ) wird der ' + muellname + ' abgeholt.\n' +
		'\nBitte bringe den Müll nach unten und die Gelben Säcke die im Aufzugsvorraum stehen\nvor an die Ulmer Straße neben den Laternenmast!\n\n' +
		'Dieser Service wird präsentiert von:\n[SMMS] shack Muell Mailer Service [0]\n\n' +
		'[0] https://wiki.shackspace.de/infrastruktur/muellabholung'
	}

	return mailOptions;
};

module.exports = {
	get_mail_options:get_mail_options
};

