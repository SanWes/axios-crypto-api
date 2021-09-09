import React, {useState, useEffect} from 'react';
import axios from 'axios';

const CoinsWithAxios = () => {

  //useEffect is  "hook"/function that accepts a function to run as soon as the page loads up /renders 
  //api gets loaded without button being pressed
  useEffect(() => {
    console.log("page loaded!");
    //make api call using axios to the coingecko api 
    axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")
      .then(res=>{
        console.log("the response looks like this")
        console.log(res)

        //based on how  the API data is structured. Need to parse data with res."enterItemToBeParsed"

        // setAllCoins(res.results)

        //save the response into my state variable

        setAllCoins(res.data)
      })
      .catch(err=>{
        console.log(err)
      }) //.catch() means if there were any errors that came up in our api request, this is where we will handle those errors

  },[])

    const [allCoins, setAllCoins] = useState([])
    // const [allPokemon, setAllPokemon] = useState([])


    const clickHandler = ()=>{
    console.log("clicked!")

    let coins = [...allCoins];

    coins.sort(function (a,b) {
        return b.current_price - a.current_price;
    })

    setAllCoins(coins);


    axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")
      .then(res=>{
        console.log("the response looks like this")
        console.log(res)
        // setAllCoins(res.results)

        //save the response into my state variable

        res.data.sort(function (a, b) {
            return b.current_price - a.current_price;
          });
        
        setAllCoins(res.data)
      })
      .catch(err=>{
        console.log(err)
      }) //.catch() means if there were any errors that came up in our api request, this is where we will handle those errors

  }


  
    return (
        <div>
            <button onClick= {clickHandler} className="btn btn-success">Show me the money!</button>

            

            {
                allCoins.map((coin, idx)=>{
                    return <div style = {{boxShadow: "5px 5px navy", margin: 10, height: 150 ,  backgroundColor: "#f8f8ff", backgroundImage: `url(${coin.image})`,  fontWeight: "bold", fontSize: "20px", color: "navy"}} key = {idx} className="card img-thumbnail">
                    <div className="card-body">
                    <h4 style={{backgroundColor:"linen"}}  className="card-title">{coin.name}</h4>
                    {/* <img src={coin.image} alt="" /> */}
                    <p style={{backgroundColor:"lightcyan"}}  className="card-text">Current Price: ${coin.current_price}</p>
                    {/* <a href="#!" className="btn btn-primary mb-3">Go somewhere</a> */}
                    </div>
                </div>
                })
            }

                

            
        </div>
    );
};


export default CoinsWithAxios;