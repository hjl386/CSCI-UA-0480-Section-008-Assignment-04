// foodz.js

const express = require('express');
const app = express();
const [PORT, HOST] = [8080, '127.0.0.1'];

app.use(express.static('public'));
app.set('view engine', 'hbs');

let dataGlobal = [{name:'chocoramen', description:'ramen noodles in a chocolate almond milk broth', category:'breakfast'}, {name:'lycheezy', description:'cheese pizza with lychee on top', category:'anytime'}, {name:'crazy cookie', description:'a 1 foot diameter cookie', category:'dinner'}];

app.get('/css/base.css', (req, res) => {
	res.render('base.css');
});

app.get('/', (req, res) => {
	let data = dataGlobal.filter((ele, index) => {
		if(req.query.filterCategory === ele.category){
			return ele;
		}
	});
	res.render('foodz', {'title':'Foodz', 'database':data, 'dataG':dataGlobal});
});

app.listen(PORT, HOST);
