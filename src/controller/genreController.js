require('dotenv').config();
const axios = require('axios');

const { API_KEY } = process.env;

const API = "https://api.rawg.io/api"

async function mapGenresApiDB (model){
        let response = await axios.get(`${API}/genres?key=${API_KEY}`)
        
        response.data.results.forEach(element => {
                  model.findOrCreate( {
                      where: {name: element.name},
                      defaults:{ id: element.id}
                  })
          })
        
        return {msg:'success: genres loaded in DB'}
        
}

async function getGenresDB(model){
    let genres = await model.findAll()
        
    return genres
}


module.exports ={
    mapGenresApiDB,
    getGenresDB
}