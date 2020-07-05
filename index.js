const express = require('express');
const { Client } = require('pg');
var cors = require('cors');
var bodyParser = require("body-parser");
const port = process.env.PORT || 5000;
const app = express();

const DATABASE_URL = 'postgres://kclekgjadrvndx:4a00f9a9cba0548965fa8266c5bc7317ff3608d6a92eaef6e1905ae73ecdda34@ec2-3-216-129-140.compute-1.amazonaws.com:5432/d4u16pqgvpstgg'

app.use(bodyParser.json());
app.use(cors());

app.get('/api/get_plates', (req, res) => {
    const client = new Client({
        connectionString: DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
    client.connect();
    client.query('SELECT*FROM plates;', (err, response) => {
        if (err)
            res.json(err);
        else {
            const plates = [];
            for (let row of response.rows) {
                plates.push(row);
            }
            client.end();
            res.json(plates);
        }
    });
})

app.delete('/api/delete_plate/:id', (req, res) => {
    let data = req.params.id
    const client = new Client({
        connectionString: DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
    client.connect();
    client.query('DELETE FROM plates WHERE list_id = '+data+';', (err, response) => {
        if (err)
            res.json(err);
        else {
            res.json(true);
            client.end();
        }
    });
})

app.post('/api/add_plate/', (req, res) => {
    let data = req.body.info
    const client = new Client({
        connectionString: DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
    client.connect();
    client.query("INSERT INTO plates(owner_name, plate) VALUES('"+data.owner_name+"','"+data.plate+"') RETURNING list_id;", (err, response) => {
        if (err)
            res.json(err);
        else {
            res.json(response);
        }
    });
})

app.post('/api/edit_plate/', (req, res) => {
    let data = req.body.info
    const client = new Client({
        connectionString: DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
    client.connect();
    client.query("UPDATE plates SET owner_name ='"+data.owner_name+"',plate ='"+data.plate+"' WHERE list_id ='"+data.list_id+"';", (err, response) => {
        if (err)
            res.json(err);
        else {
            res.json(response);
        }
    });
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/react_app/build/index.html'));
});



app.listen(port, () => console.log(`app listening on port ${port}!`))