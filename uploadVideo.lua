#!/usr/local/bin/lua

local env = os.getenv
local fs = require'carlos.files'
local fd = require'carlos.fold'

local lng = math.tointeger(env'CONTENT_LENGTH')
local uri = env'QUERY_STRING'

if env('REQUEST_METHOD'):match'POST' and lng > 0 then
    local s = io.read(lng)
    assert( fs.dump("file.xtx", s) )
end

print'Content-Type: text/plain; charset=utf-8\r\n\r\nOK\n'
