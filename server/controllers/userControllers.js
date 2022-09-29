const mysql = require('mysql2')

const pool = mysql.createPool({
    host: process.env.DB_HOST ,
    user: process.env.DB_USER ,
    port: process.env.DB_PORT,
    password: '',
    database: process.env.DB_NAME
})
exports.view = (req, res)=>{
//Error Check
    pool.getConnection((error, result)=>{  
        if (error) throw error
         console.log('DataBase is Connected1')
        result.query('SELECT * FROM staff', (err, table)=>{
          result.release()
          if(!err){
            res.render('index', { table })   
          }else{
            console.log(err)
          }
        })
    })  
 }
 exports.find = (req, res)=>{
   pool.getConnection((error, result)=>{
    if (error) throw error
    console.log('DataBase is Connected2')
    let value = req.body.Search
        result.query('SELECT * FROM staff WHERE first_name LIKE ?', ['%' + value + '%'], (err, table)=>{
            result.release()
            if (!err) {
                res.render('index', {table})
            } else {
                console.log(err);
            }
            console.log(table);
       })
    })
}
 exports.form  = (req, res)=>{
  //pool.getConnection((error, result)=>{
    //if (error) throw error
    //console.log('DataBase is Connected3')
    res.render('add-user')
 }
 //}
 exports.create = (req, res)=>{
    const {firstName, lastName , email, phone} = req.body
    console.log(firstName ,lastName, email, phone);
    //Error Check
        pool.getConnection((error, result)=>{  
            if (error) throw error
            console.log('DataBase is Connected4')
            let value = req.body.search
            result.query('INSERT INTO staff SET first_name = ?, last_name = ?, email = ?, phone = ?',
            [firstName, lastName, email, phone], (err, table)=>{
              result.release()
              if(!err){
                res.render('add-user' ,{alert: 'A NEW USER HAS BEEN ADDED ✅✅✅'})   
              }else{
                console.log(err)
              }
              console.log(table)
            })
        })  
     }
exports.edit = (req, res)=>{
    //Error Check
        pool.getConnection((error, result)=>{  
            if (error) throw error
            console.log('DataBase is Connected5')
            result.query('SELECT * FROM staff WHERE id = ?', [req.params.id], (err, table)=>{
              result.release()
              if(!err){
                res.render('edit-user', { table })   
              }else{
                console.log(err)
              }
              console.log(table)
            })
        })  
     }
    exports.update = (req, res)=>{
      const {firstName, lastName , email, phone} = req.body
      //Error Check
          pool.getConnection((error, result)=>{  
              if (error) throw error
              console.log('DataBase is Connected6')
              result.query('UPDATE staff SET first_name = ?, last_name = ?, email = ?, phone = ? WHERE id = ?', 
              [firstName, lastName, email, phone, req.params.id], (err, table)=>{
                result.release()
                if(!err){
                  pool.getConnection((error, result)=>{  
                    if (error) throw error
                    console.log('DataBase is Connected7')
                    result.query('SELECT * FROM staff WHERE id = ?', [req.params.id], (err, table)=>{
                      result.release()
                      if(!err){
                        res.render('edit-user', {table , alert:`${firstName} Has Been Updated`})   
                      }else{
                        console.log(err)
                      }
                      console.log(table)
                    })
                })   
                }else{
                  console.log(err)
                }
                console.log(table)
              })
          })  
       }
  
       exports.delete = (req, res)=>{
        pool.getConnection((error, result)=>{  
          if (error) throw error
          console.log('DataBase is Connected8')
          result.query('DELETE FROM  staff WHERE id = ?', [req.params.id], (err, table)=>{
            result.release()
            if(!err){
              res.redirect('/')
            }else{
              console.log(err)
            }
            console.log(table)
          })
       })
      }
    
      exports.viewall = (req, res)=>{
        //Error Check
            pool.getConnection((error, result)=>{  
                if (error) throw error
                console.log('DataBase is Connected!!9')
                result.query('SELECT * FROM staff WHERE id = ?', [req.params.id], (err, table)=>{
                  result.release()
                  if(!err){
                    console.log(table);
                    res.render('view-user', { table })   
                  }else{
                    console.log(err)
                  }
                  console.log(table)
                })
            })  
         }
