const express = require('express');
const cors = require('cors');
//
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');
//
const app = express();
app.use(cors());
app.use(bodyParser.json());
//
const os = require('os');
const fs = require('fs');
const dotenv = require('dotenv');
//
const rootDir = path.resolve(__dirname, "..");
dotenv.config({ path: `${rootDir}/.env` });
//
function getIp(){
  const interfaces = os.networkInterfaces();
  for (const itface of Object.values(interfaces)) {
    for (const { family, address, internal } of itface) {
      if (family === 'IPv4' && !internal) {
        return address;
      }
    }
  }
}
function envEdit(_key,_value){
  const envConfig = dotenv.parse(fs.readFileSync(`${rootDir}/.env`));
  envConfig[_key] = _value;
  fs.writeFileSync('.env', Object.entries(envConfig).map(([key, value]) => `${key}=${value}`).join('\n'));
}

//建立 資料庫
const db = new sqlite3.Database('../data.db'); 
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS code_data
    (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      language TEXT,
      readme TEXT,
      content TEXT
    )`
  );
});

//資料庫 寫入功能
app.post('/upload', (req, res) => {
  const { title, language, readme, content } = req.body;
  db.run(`INSERT INTO code_data (title, language, readme, content) VALUES (?, ?, ?, ?)`,
    [title, language, readme, content],function (err) {
      if (err) {}
      else{
        const data = {
          id: this.lastID,
          title: title,
          language: language,
          readme: readme,
          content: content
        }
        res.json({ data });
      }
    });
});

//資料庫 收尋功能
app.post('/search', (req, res) => {
  const { title , id } = req.body;
  if(id!=''){
    db.all(`SELECT * FROM code_data WHERE id = ?`, [id], (err, rows) => {
      if (err) {}
      else{
        res.json(rows);
      }
    });
  }else{
    db.all(`SELECT * FROM code_data WHERE title LIKE ?`, [`%${title}%`], (err, rows) => {
      if (err) {}
      else{
        res.json(rows);
      }
    });
  }
});

//資料庫 修改功能
app.post('/edit', (req, res) => {
  const { title,language,readme,content,id } = req.body;
  db.run(`UPDATE code_data SET title = ?, language = ?, readme = ? , content = ? WHERE id = ?`, [title,language,readme,content,id ], function (err) {
    if (err) {}
    else {
      res.json({ success: true });
    }
  });
});

//修改env
if(process.env.VITE_ip!==getIp()){
  envEdit('VITE_ip',getIp())
}

//讀env
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

//資料庫 端口
const port = process.env.VITE_SQport;
const ip = process.env.VITE_ip;
app.listen(
  port,ip,
  () => {
      
  }
);
