import { useEffect, useState } from 'react';
import PokeList from './PokeList/PokeList';
import PokeInfo from './PokeInfo/PokeInfo'
import {
  AppBar, 
  Toolbar,
  Icon,
  Typography,
  Box, 
  Container, 
  Button
} from '@mui/material'

const App = () => {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemon, setPokemon] = useState();
  const [isLoadedPokemon, setIsLoadedPokemon] = useState(false);

  const [pokemonArray, setPokemonArray] = useState([]);
  const [pokemonArrayLength, setPokemonArrayLength] = useState(0);
  const [isLoadedArray, setIsLoadedArray] = useState(false);
  const [page, setPage] = useState(0)

  useEffect(() => {
    setIsLoadedArray(true);
    fetch(`https://pokeapi.co/api/v2/pokemon/?limit=12&offset=${page}`)
      .then(res => res.json())
      .then(result => {
        setPokemonArray(result.results)
        setPokemonArrayLength(result.count - 12)
      })
      .finally(setIsLoadedArray(false))
  }, [page])

  useEffect(()=>{
    setIsLoadedPokemon(true);
    if (pokemonName) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`)
        .then(res => res.json())
        .then(result => {
          setPokemon(result)
        })
        .finally(setIsLoadedPokemon(false))
    }
  },[pokemonName])

  const handleClick = (e) => {
    const way = e.target.name
    switch(way) {
      case 'prev':
        setPage(page - 12);     
        break;
      case 'next':
        setPage(page + 12);
        break;
      default:
        break;
    }
  }
  
  return (
    <div className="App">
      <AppBar position="relative" sx={{backgroundColor: "#eb2128a6"}}>
        <Toolbar sx={{ display: "flex", alignItems: "center"}}>
          <Icon sx={{ mr: 2, pd: "0px", width: "30px", height: "30px" }}>
            <img src="./Poke_Ball_mini.svg" alt='Pokeball'/>
          </Icon>
          <Typography variant="h6" color="inherit" noWrap>
            Pokemons
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{
        display: "flex", 
        flexDirection: "row", 
        justifyContent: "center", 
        alignItems: "center",
        minHeight: "90vh",
      }}>
        <Container sx={{
          display: "flex", 
          flexDirection: "column", 
          justifyContent: "center", 
          alignItems: "center"
        }}>
          {
            !isLoadedArray && 
            <PokeList 
              pokemonArray={pokemonArray} 
              onClick={(name) => setPokemonName(name.toLowerCase())}
            />
          }
          <Box
            sx={{
              width: "130px",
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            {
              page ? 
                <Button 
                  type='button' 
                  name='prev' 
                  onClick={handleClick} 
                  sx={{
                    width: "50%", 
                    backgroundColor: "#eb2128a6", 
                    borderRadius: "10px 0 0 10px", 
                    color: "black"
                  }}
                >
                  Prev
                </Button> :
              <Box sx={{
                width: "50%", 
                backgroundColor: "#2e2b2ba6", 
                borderRadius: "10px 0 0 10px", 
                color: "black"
              }}/>
            }
            {
              page < pokemonArrayLength ?
                <Button 
                  type='button' 
                  name='next' 
                  onClick={handleClick} 
                  sx={{
                    width: "50%", 
                    backgroundColor: "#eb2128a6", 
                    borderRadius: "0 10px 10px 0", 
                    color: "black"
                  }}
                >
                  Next
                </Button> :
              <Box sx={{
                width: "50%", 
                backgroundColor: "#2e2b2ba6", 
                borderRadius: "10px 0 0 10px", 
                color: "black"
              }}/>
            }
          </Box>
        </Container>

        <Container>
          {pokemon && !isLoadedPokemon && <PokeInfo pokemon={pokemon}/>}
        </Container>
      </Box>

    </div>
  );
}

export default App;
