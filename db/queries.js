const inquirer = require('inquirer');
const express = require('express');
const cTable = require('console.table');
const mysql = require('mysql2/promise');
const chalk = require('chalk');
const conx = require('./database');


databaseConx = async () => {
    return await mysql.createConnection({
        host: 'localhost',
        user: 'employee_tracker',
        password: 'password',
        database: 'employee_db'
    });
}

getRoles = async () => {
    const conx = await databaseConx();



}