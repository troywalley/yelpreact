class App extends React.Component{
	constructor(props){
		super(props);
		this.state={
			results: []
		}
		this.changeResults=this.changeResults.bind(this);

	}
	render(){
		return(
			<div>
			<YelpSearch changeResults={this.changeResults} />
			<YelpResults results={this.state.results} />
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
}
function YelpResults(props){
  // console.log(props.results);
  let results=props.results;
  results=results.map(function(result, index){
		console.log(result.image_url);
    let divStyles={
      backgroundImage: "url('" + result.image_url + "')"
    }
		console.log(divStyles);
    return(
      <div className="flex" id={index}>
      <div className="result">{result.name}</div>
      <div className="yelp-image" style={divStyles}>
      </div>
      </div>
    )
  })
  return(
    <div>{results}</div>
  )
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
