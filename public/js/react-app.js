class App extends React.Component{
	constructor(props){
		super(props);
		this.state={
			results: [],
			favorites: [],
			favoritesShow: false
		}
		this.changeResults=this.changeResults.bind(this);
		this.addToFavorites=this.addToFavorites.bind(this);
		this.getFavorites=this.getFavorites.bind(this);
		this.showFavorites=this.showFavorites.bind(this);
	}
	render(){
		if(this.state.favoritesShow===true){
				var showdiv=<ShowFavorites favorites={this.state.favorites}/>
		}else{
				var showdiv=<div>
					<YelpSearch changeResults={this.changeResults} />
					<YelpResults results={this.state.results} addToFavorites={this.addToFavorites}/>
				</div>
		}
		return(
			<div>
			<ShowFavoritesButton showFavorites={this.showFavorites}/>
			<div>{showdiv}</div>
			</div>
		)
	}
	changeResults(term, location){
		let res=this;
		axios.get("https://yelp-search.herokuapp.com/search",{
			params: {
				location: location,
				term: term
			}
		}).then(function(response){
			console.log(response);
			let businesses = response.data.businesses
			res.setState({results: businesses})

		})
	}
	addToFavorites(index){
		let favorite=this.state.results[index];
		axios({
			method: "post",
			url: '/addToFavorites',
			params: {
				name: favorite.name,
				image: favorite.image_url,
				categories: favorite.categories
			}

		}).then(function(response){
			console.log("success");
		})
	}
	showFavorites(){
		if(this.state.favoritesShow===false){
			this.setState({favoritesShow: true})
			this.getFavorites()
		}else{
			this.setState({favoritesShow: false})
		}
	}
	getFavorites(){
		let res=this;
		axios({
			method: "post",
			url: '/getFavorites',
			params: {

			}

		}).then(function(response){
			res.setState({favorites: response.data})
		})
	}
}
function YelpResults(props){
  // console.log(props.results);
  let results=props.results;

  results=results.map(function(result, index){
    let divStyles={
      backgroundImage: "url('" + result.image_url + "')"
    }
    return(
      <div className="flex" id={index}>
      	<div className="result">{result.name}</div>
      	<div className="yelp-image" style={divStyles}></div>
				<button onClick={handleAddToFavorites} value={index}>Add To Favorites</button>
      </div>
    )
  })
  return(
    <div>{results}</div>
  )
	function handleAddToFavorites(event){
		props.addToFavorites(event.target.value)
	}

}

class YelpSearch extends React.Component{
	constructor(props){
		super(props);
		this.state={
			location: "",
			term: "",

		}
		this.handleResults=this.handleResults.bind(this);
		this.changeLocation=this.changeLocation.bind(this);
		this.changeTerm=this.changeTerm.bind(this);

	}
	render(){

		return(
			<div>
				<input onChange={this.changeTerm} placeholder="Search Term"></input>
				<input onChange={this.changeLocation} placeholder="Location"></input>
				<button onClick={this.handleResults}>Search</button>


			</div>
		)
	}
	changeLocation(event){
		this.setState({location: event.target.value})
	}
	changeTerm(event){
		this.setState({term: event.target.value})
	}
	handleResults(){
		this.props.changeResults(this.state.term, this.state.location)
	}

}
function ShowFavoritesButton(props){
	return(
		<div>
			<button onClick={props.showFavorites}>Show Favorites</button>
		</div>
	)
}
class ShowFavorites extends React.Component{
	constructor(props){
		super(props);

	}

	render(){
		console.log(this.props.favorites);
		let favDiv=this.props.favorites.map(function(favorite, index){
			let divStyles={
				backgroundImage: "url('" + favorite.image + "')"
			}
			return(
				<div className="flex" id={index}>
					<div className="result">{favorite.name}</div>
					<div className="yelp-image" style={divStyles}></div>

				</div>
			)
		})
		return(
			<div>{favDiv}</div>
		)
	}
}



ReactDOM.render(
<App apple="hello"/>,
document.getElementById("react-search")
)
