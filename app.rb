get '/' do
	erb :index
end

post '/signin' do
	user = User.where(username: params[:username]).first
	if user.password == params[:password]
		flash[:notice] = "Successfully Signed In"
		session[:user_id] = user.id
		redirect '/search'
	else
		flash[:error] = "Wrong password. 2 tries remaining."
		redirect '/'
	end

end

post '/signup' do
	user = User.new(params[:user])
	if user.save
		flash[:notice] = "Successfully Created New User"
		session[:user_id] = user.id
		redirect '/search'
	else
		flash[:error] = user.errors.full_messages
		redirect '/'
	end

end

get "/search" do
erb :search
end





#
