const mysql = require('mysql');
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'Aajy8094!',
	database: 'memos'
});

module.exports= {
  async run(query) {
    return new Promise((resolve) => {
      // connection.connect(); connect이 중복되었다는 에러로 인한 주석처리
      
      connection.query(query, (error, rows, fields) => {
        resolve(rows)
        if (error) { console.log(error)};
        // console.log('Users info is: ', rows);
        // console.log('fields: ', fields);
      });
     
    })
    connection.end();
  }
}