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
axios.get("https://yelp-search.herokuapp.com/search",{
  params: {
    location: "Philadelphia",
    term: "pizza"
  }
}).then(function(response){
  console.log(response);
  let businesses = response.data.businesses
  ReactDOM.render(
  <YelpResults results={businesses} />,
  document.getElementById("react-search")
  )
})
