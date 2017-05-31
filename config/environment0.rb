require 'sinatra'
require 'sinatra/activerecord'

require 'sinatra/flash'

set :database, 'sqlite3:app.sqlite3'
set :sessions, true

require './models'
require './app'
