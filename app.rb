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
post '/addToFavorites' do
name = params[:name]
image = params[:image]
categories = params[:categories]
if Business.where(name: name).first
	business=Business.where(name: name).first
else
	business=Business.create(name: name, image: image, category: categories)
end
Favorite.create(user_id: session[:user_id], business_id: business.id) if Favorite.where.not(user_id: session[:user_id], business_id: business.id)
end
get "/search" do
erb :search
end
post '/getFavorites' do
User.find(session[:user_id]).businesses.to_json
end




#
