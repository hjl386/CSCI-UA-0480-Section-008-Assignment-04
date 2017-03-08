// foodz.js

const express = require('express');
const app = express();
const [PORT, HOST] = [8080, '127.0.0.1'];
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('public'));
app.set('view engine', 'hbs');

const dataGlobal = [{name:'chocoramen', description:'ramen noodles in a chocolate almond milk broth', category:'breakfast'}, {name:'lycheezy', description:'cheese pizza with lychee on top', category:'anytime'}, {name:'crazy cookie', description:'a 1 foot diameter cookie', category:'dinner'}];

app.get('/css/base.css', (req, res) => {
	res.render('base.css');
});

app.get('/', (req, res) => {
	const data = dataGlobal.filter(ele => {
		if(req.query.filterCategory === ele.category){
			return ele;
		} else if(req.query.filterCategory === undefined){
			return ele;
		}
	});
	let type ='';
	req.query.filterCategory !== undefined ? type = '(' + req.query.filterCategory + ' only)' : type = '';
	res.render('foodz', {'title':'Foodz', 'database':data, 'meal':type});
});

app.post('/', (req, res) => {
	const data = {name:req.body.name, description:req.body.description, category:req.body.category};
	dataGlobal.push(data);
//	console.log(req.body);
	res.redirect('/'); 
});

app.listen(PORT, HOST);
