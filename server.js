const express = require('express');
const app = express();
const PORT = process.env.PORT || 4001;
const fs = require('fs');
const path = require('path');
const allNotes = require('./db/db.json');