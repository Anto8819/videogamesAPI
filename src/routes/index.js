const { getAllVideogames, getVideogamesByName, getGameDetails, postGame } = require('../controller/videogameController.js')
const { getGenresDB } = require('../controller/genreController')
const { Router, response } = require('express');
const { Videogame, Genre } = require('../db.js')

           
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
//GET a list with all videogames from both external API and DB
router.get('/videogames', async (req,res)=>{
    try{
        let response = req.query.name?await getVideogamesByName(req,Videogame,Genre): await getAllVideogames(Videogame, Genre)
        if (response.length ===0) throw new Error('no matches found')
        res.json(response)
    }catch(error){
        
        res.status(500).send({msg: `${error}`})
        
    }
})

router.get('/videogames/:id', async(req,res)=>{
    try {
        res.json(await getGameDetails(req, Videogame, Genre))  
    } catch (error) {
        res.status(404).json({msg: `${error}`})
    }
          
}) 

router.get('/genres', async(req,res)=>{
    try {
        let genres = await getGenresDB(Genre)
        genres.length<19? res.json({msg: 'missing genres, please refresh'}):res.json(genres)  
    } catch (error) {
        res.status(404).json({msg: `${error} in get genres`})
    }
          
}) 

router.post('/videogame', async(req,res)=>{
    try {
        let newGame = await postGame(req, Videogame)
        res.json(newGame)
    } catch (error) {
        res.status(400).json({msg: `${error} in post new game`})        
    }
})

// router.get('/platforms', async (req,res)=>{
//     let response = await axios.get(`${API}/platforms?key=${API_KEY}&page=2`)
    
//     let platforms = response.data.results.map(element => {
//         return {
//             id: element.id, 
//             name: element.name 
//         }})
    
//     res.json(platforms) 
    
// })

module.exports = router;
