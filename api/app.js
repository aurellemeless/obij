
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3001;
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');

crypto = require('crypto'),
jwt = require('jsonwebtoken'),
jwtParams = require('./config/jwt'),

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const database = require('./config/database');
const config = require('./config/config');

app.get('/', (req, res) => {
  res.send('Obij API');
})

app.get('/meals', (req, res) => {
  let SQL = `SELECT * FROM meal ORDER BY id DESC`;
  database.query(SQL, function (err, meals) {
    if(err){
      console.log('Error with database: ' + err);
      return res.sendStatus(500);
     }else{
      res.json(meals);
     }

  });
})

app.get('/meals/:id', (req, res) => {
  let SQL = `SELECT * FROM meal WHERE id=${req.params.id}`;
  database.query(SQL, function (err, meals) {
    if(err){
      console.log('Error with database: ' + err);
      return res.sendStatus(500);
     }else{
       if(meals.length == 0){
         return res.sendStatus(404);
       }
       res.json(meals[0]);
     }

  });
})


app.put('/meals/:id', (req, res) => {
  const body = req.body;
    if( body.name === undefined || body.name =='' || body.price === undefined || body.price =='' || body.qty === undefined || body.qty ==''){
      return res.sendStatus(411);
    }
  let mealSQL = `UPDATE meal SET name="${body.name}", price=${body.price}, qty=${body.qty} WHERE id=${req.params.id}`;
    database.query(mealSQL, function (err, resultats) {
            if (err) {
                res.send("There was a problem updating meal on the database.");
                console.log('Error updating  meal: ' + err);
                return res.status(500).send(err);
            } else {
                //User has been created
                return res.sendStatus(200);
                 
            }
      });
})


app.post('/meals', (req, res) => {
  const body = req.body;
    if( body.name === undefined || body.name =='' || body.price === undefined || body.price =='' || body.qty === undefined || body.qty ==''){
      return res.sendStatus(411);
    }
  let mealSQL = `INSERT INTO meal(name,price, qty) VALUES('${body.name}', '${body.price}', '${body.qty}')`;
    database.query(mealSQL, function (err, resultats) {
            if (err) {
                res.send("There was a problem creating meal on the database.");
                console.log('Error creating new meal: ' + err);
                res.status(500).send(err);
            } else {
                //User has been created
                return res.sendStatus(200);
                 
            }
      });
})

app.delete('/meals/:id', (req, res) => {
    
  let mealSQL = `DELETE FROM meal WHERE id=${req.params.id}`;
    database.query(mealSQL, function (err, resultats) {
            if (err) {
                res.send("There was a problem removing meal on the database.");
                console.log('Error removing  meal: ' + err);
                res.status(500).send(err);
            } else {
                //User has been created
                return res.sendStatus(200);
            }
      });
})
app.post('/login', (req, res) => {
    const body = req.body;
    if( body.email === undefined || body.email =='' || body.password === undefined || body.password ==''){
      return res.sendStatus(411);
    }
  
 
    let SQL = `SELECT * FROM user WHERE email = '${body.email}'`;
    database.query(SQL, function (err, user) {
      if(err){
        console.log('Error with credentials: ' + err);
        return res.sendStatus(500);
       }else{
         if(user){
            bcrypt.compare(body.password, user[0].password, function(err, match) {
              if(err){
                console.log('Error with credentials: ' + err);
                return res.sendStatus(500);
              }else{
                if(match){
                    jwt.sign({email : user[0].email, id : user[0].id, ability : user[0].ability}, jwtParams.PRIVATE_KEY, function(err, token) {
                      if(err){
                        console.log(err);
                        return res.sendStatus(500);
                      }else{
                        var data = {
                          access_token : token,
                          user : {
                            id : user[0].id,
                            email : user[0].email,
                            name : user[0].name,
                            ability : user[0].ability
                          }
                        };
                        res.json(data);
                      }
  
                  });
  
                }else{
                  return res.sendStatus(404);
                }
              }
            });
         }else{
            return res.sendStatus(404);
         }
  
       }
  
    });
  
});
  

app.post('/register', (req, res) => {

  const body = req.body;
  if(body.name === undefined || body.name =='' 
        || body.email === undefined || body.email =='' 
        || body.password === undefined || body.password =='' ){
        return res.sendStatus(422);
    }
  //
  let newUser = {
    name : body.name,
    email: body.email,
    password: body.password,
    ability:1 // common user -> clients
  };
  //
  bcrypt.hash(newUser.password, config.bcrypt.saltRounds, function(err, hash) {
    newUser.password = hash;
    let SQL = `INSERT INTO user(name,email, password, ability) VALUES('${newUser.name}', '${newUser.email}', '${newUser.password}', ${newUser.ability})`;
    database.query(SQL, function (err, user) {
            if (err) {
                res.send("There was a problem creating user on the database.");
                console.log('Error creating new user: ' + err);
            } else {
                //User has been created
                return res.sendStatus(200);
                 
            }
      });
  });
})

app.post('/checkout', (req, res) => {  
  const body = req.body;
  if(body.cart === undefined || body.cart ==''
    || body.user === undefined || body.user =='' 
    || body.user.name === undefined || body.user.name ==''
    || body.user.email === undefined || body.user.email ==''
    || body.user.phone === undefined || body.user.phone ==''  ){
        return res.sendStatus(422);
    }
  //
  let meals = [];
  let mealSQL = "SELECT * FROM meal WHERE id IN (";
  let invoiceRows = [];
  let amount = 0;
  // check all the valid of row of the invoice
  for(let item of body.cart){
    if(item.id !== undefined && item.id !== null
      && item.qty !== undefined && item.qty !== null){
        meals = [...meals, item] ;
        mealSQL +=item.id+",";
    }else{
      return res.sendStatus(422);
    }
  }
  mealSQL = mealSQL.slice(0, -1); // remove the last comma
  mealSQL+=")";
  console.log("mealSQL", mealSQL);
  database.query(mealSQL, function(err, validMeals){
    if(err){
      return res.sendStatus(422);
    }else{
      for(let invoiceRow of validMeals){
        for(let item of body.cart){
          if(item.id  === invoiceRow.id ){
              invoiceRows.push(
                {
                  id : invoiceRow.id ,
                  price : invoiceRow.price ,
                  qty : item.qty 
                }
              );
              amount += parseInt(item.qty) * parseInt(item.price);
          }
        }
      }
      // 
      let newInvoice = {
        reference :  crypto.randomBytes(6).toString('hex'),
        amount: amount,
        name: body.user.name,
        email: body.user.email,
        phone: body.user.phone
      };
      const invoiceSQL =  `INSERT INTO invoice(name,email, phone,reference,amount, created_at) VALUES('${newInvoice.name}', '${newInvoice.email}', '${newInvoice.phone}', '${newInvoice.reference}', '${newInvoice.amount}', NOW())`;
    
      database.query(invoiceSQL, function(err, results){
        if(err){
          console.error(err);
          return res.sendStatus(422);
        }else{
          let rowsSQL = "";
          for(let row of invoiceRows){
              rowsSQL +=`INSERT INTO invoice_row(invoice_id,meal_id, qty, price) VALUES(${results.insertId}, ${row.id}, ${row.qty}, ${row.price});`;
          }
          
          console.log("rowsSQL", rowsSQL);
          database.query(rowsSQL, function(err, results){
            if(err){
              console.error(err);
              return res.status(500).send(err);
            }else{
              return res.sendStatus(200);
            }
          });
        }
      });

    }
  });
  
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})