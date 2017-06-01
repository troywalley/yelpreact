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
			results: []
		}
		this.changeLocation=this.changeLocation.bind(this);
		this.changeTerm=this.changeTerm.bind(this);
		this.changeResults=this.changeResults.bind(this);
	}
	render(){

		return(
			<div>
				<input onChange={this.changeTerm}></input>
				<input onChange={this.changeLocation}></input>
				<button onClick={this.changeResults}>Search</button>
				<YelpResults results={this.state.results} />

			</div>
		)
	}
	changeLocation(event){
		this.setState({location: event.target.value})
	}
	changeTerm(event){
		this.setState({term: event.target.value})
	}
	changeResults(){
		let res=this;
		axios.get("https://yelp-search.herokuapp.com/search",{
		  params: {
		    location: this.state.location,
		    term: this.state.term
		  }
		}).then(function(response){
		  console.log(response);
		  let businesses = response.data.businesses
			res.setState({results: businesses})

		})
	}
}


ReactDOM.render(
<YelpSearch />,
document.getElementById("react-search")
)
