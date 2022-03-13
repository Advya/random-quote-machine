function App() {
  
  const [quotes, setQuotes] = React.useState([]);
  const [randomQuote, setRandomQuote] = React.useState("");
  const [randomColor, setRandomColor] = React.useState("#fff");
  
  React.useEffect(()=>{
    async function fetchData() {
      const response = await fetch("https://type.fit/api/quotes");
      const data = await response.json();
      
      setQuotes(data);
      let randIndex = Math.floor(Math.random() * (data.length - 1));
      setRandomQuote(data[randIndex]);
    }
    fetchData();
  }, [])

  const getNewQuote = () => {
      const colors =[
        "#16a085",
        "#27ae60",
        "#2c3e50",
        "#f39c12",
        "#e74c3c",
        "#9b59b6",
        "#FB6964",
        "#342224",
        "#472E32",
        "#BDBB99",
        "#77B1A9",
        "#73A857",
      ];
    
    let randIndex = Math.floor(Math.random() * (quotes.length - 1));
    let randColorIndex = Math.floor(Math.random() * (colors.length - 1));
    setRandomQuote(quotes[randIndex]);
    setRandomColor(colors[randColorIndex]);
  }

  return (
    <div style={{backgroundColor: randomColor, minHeight: "100vh"}}>
      <div className="container pt-5">
        <div className="mt-5 p-5 rounded">
          <div className="card">
            <div className="card-header">Inspirational quotes</div>
            <div className="card-body">
              {randomQuote ? (
                <>
                  <h5 className="card-title">- {randomQuote.author || "No author"}</h5>
                  <p className="card-text">&quot;{randomQuote.text}&quot;</p>
                </>
              ) : (
                <h2>Loading..</h2>
              )}

              <div className="container">
                <button onClick={getNewQuote} className="btn btn-primary">New Quote</button>
                <a href={"https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" + 
                          encodeURIComponent('"' + randomQuote.text + '"' + randomQuote.author)
                        }
                        className="btn btn-warning"
                        target="_blank">
                  <i className="fa fa-twitter"></i>
                </a>
                <a href="https://facebook.com/share/" className="btn btn-danger" target="_blank">
                  <i className="fa fa-facebook"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div>This is one of {quotes.length} quotes</div>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));