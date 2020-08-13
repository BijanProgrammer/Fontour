const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser());

app.listen(5000, () => console.log('Listening on port 5000 ...'));

app.post('/update', (req, res) => {
	fs.writeFile('../config/font_names.txt', req.body.content, (err) => {
		if (err) console.log('ERROR: ', err);
		else console.log('Font names has been successfully updated!');
	});

	res.send();
});
