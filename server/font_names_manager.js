const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();

const FONT_NAMES_FILE_PATH = '../config/font_names.txt';

app.use(cors());
app.use(bodyParser());

app.listen(5000, () => console.log('Listening on port 5000 ...'));

app.get('/', (req, res) => {
	fs.readFile(FONT_NAMES_FILE_PATH, (err, data) => {
		if (err) console.log('ERROR: ', err);
		else res.send(data);
	});
});

app.post('/update', (req, res) => {
	fs.writeFile(FONT_NAMES_FILE_PATH, req.body.content, (err) => {
		if (err) console.log('ERROR: ', err);
		else console.log('Font names has been successfully updated!');
	});

	res.send();
});
