// dicey.js

const express = require('express');
const app = express();
const [PORT, HOST] = [8080, '127.0.0.1']
const fs = require('fs');

app.set('view engine', 'hbs');

app.use(express.static('public'));

function getRando(min, max){
	return Math.random() * (max - min) + min;
}

function read(){
	const data = fs.readFileSync('./diceware.wordlist.txt', 'utf8');
	return data;
}

function makeArr(){
	const data = read();
	const dLine = data.split('\n');
	const dToken = dLine.map(cur => {
		return cur.split('\t');
	});
	return dToken;
}

function makeData(){
	const arr = makeArr();
	const dMerged = [].concat.apply([], arr);
	const dFilter = dMerged.filter((ele, index) => {
		if(index % 2 !== 0 && index !== 0){
			return ele;
		}
	});
	return dFilter;
}

function choosePassPhrase(){
	const dCom = makeData();
	const len = dCom.length;
	const rand = Math.round(getRando(0, len));
	return dCom[rand];
}

function diceValue(word){
	const dToken = makeArr();
	for(let i = 0; i < dToken.length; i++){
		if(dToken[i][1] === word){
			return dToken[i][0];
		}
	}
}

app.get('/dice', (req, res) => {
	const num = req.query.numWords;
	const delim = req.query.glue;
	const glue = {'space':' ', 'dash':'-', 'comma':',', 'star':'*', 'none':''};
	let passPhrase = [];
	let passNumber = [];
	for(let i = 0; i < num; i++){
		passPhrase[i] = choosePassPhrase();
		passNumber[i] = diceValue(passPhrase[i]);
	}
	res.render('dice', {'title':'Dice', 'Data':passPhrase.join(glue[delim]), 'Delim':glue[delim], 'passP':passPhrase, 'passN':passNumber});
});

app.get('/about', (req, res) => {
	res.render('about', {'title':'About'});
});

app.get('/', (req, res) => {
	res.redirect(301, '/dice');
});

app.get('/css/base.css', (req, res) => {
	res.render('base.css');
});

app.listen(PORT, HOST);
