#!/usr/local/bin/lua

local json = require'carlos.json'

print( json.sql2json{dbname='/db/inr.db', tbname='nombres', clause='', QRY='SELECT * FROM nombres' } )

