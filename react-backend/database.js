const pg = require('pg');

const pool = new pg.Pool({
    user: 'thomas',
    host: 'localhost',
    database: 'fileserver_dev',
    port: 5432,
  });

class Database {
    constructor(){

    }

    getAllUsers(){
      return new Promise(async function(resolve,reject) {
        pool
        .connect()
        .then(client => {
        client.query('select username,email from users')
        .then(selection => {
          client.release();
          resolve(selection.rows);
        })
        .catch(err => {
            client.release();
            reject(err);
        })
        })
      })
        
    }

    addUser(username,email,passhash){
      console.log(`Inserting user ${JSON.stringify({username,email,passhash})}`);
      return new Promise(async function(resolve, reject) {
        pool
        .connect()
        .then(client => {
          client
            .query('insert into users (username,email,passhash) values ($1, $2, $3) returning id;', [username,email,passhash])
            .then(res => {
              client.release();
              resolve(res.rows[0]);
            })
            .catch(err => {
              client.release();
              reject(err);
            })
        })
      })        
    }

    getUserByID(id){
      return new Promise(async function(resolve, reject) {
        pool
        .connect
        .then(client => {
          client.query("select id,username,email from users where id=$1",[id])
          .then(user => {
            client.release();
            resolve(user.rows[0])
          })
          .catch(err => {
            client.release();
            reject(err);
          })
        })
      })
    }

    getUserByUsername(username){
      return new Promise(async function(resolve, reject) {
        pool
        .connect
        .then(client => {
          client.query("select id,username,email,passhash from users where username=$1",[username])
          .then(user => {
            client.release();
            resolve(user.rows[0])
          })
          .catch(err => {
            client.release();
            reject(err);
          })
        })
      })
    }
   

}




module.exports = new Database();