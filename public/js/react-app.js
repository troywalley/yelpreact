class App extends React.Component{
	constructor(props){
		super(props);
		this.state={
			results: [],
			favorites: []
		}
		this.changeResults=this.changeResults.bind(this);
		this.addToFavorites=this.addToFavorites.bind(this);
	}
	render(){
		return(
			<div>
			<YelpSearch changeResults={this.changeResults} />
			<YelpResults results={this.state.results} addToFavorites={this.addToFavorites}/>
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
				<input onChange={this.changeTerm}></input>
				<input onChange={this.changeLocation}></input>
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




ReactDOM.render(
<App apple="hello"/>,
document.getElementById("react-search")
)
