const express = require('express')
const jwt = require('jsonwebtoken');
const secretKey = '653trgd87uiaewfiugrw8o4yr';


function authMiddlware(req, res, next){
    const authHeader = req.headers.authorization;
    if (!authHeader) {
    return res.status(401).json({ 'message': "Not Authorized" });
  } 
  const token = authHeader && authHeader.split(" ")[1];
  try{
    const userData = jwt.verify(token, secretKey)
    req.user = userData
    next()
  }
  catch(err){
    console.log(err);
    res.json({err, "message": "Invalid User, Please LogIn again.."})
  }
}

module.exports = authMiddlware