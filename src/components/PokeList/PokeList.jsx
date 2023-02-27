import {
  Container, 
  List,
  ListItem,
  Grid, 
  Card, 
  CardMedia,
  Typography
} from '@mui/material'

const PokeList = ({pokemonArray, onClick}) => {

  const handleClick = (e) => {
    e.preventDefault();
    onClick(e.currentTarget.textContent);
  }

  return (
    <Container>
      <List sx={{
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center"
    }}>
        <Grid container spacing={2} sx={{
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center",
          ml: '0'}}>
          {pokemonArray.map(poke => (
            <ListItem 
              onClick={handleClick} 
              name={poke.name} 
              key={poke.name} 
              sx={{width: "calc(50vw/4)", minWidth:"180px"}} 
            >
              <Card sx={{ 
                  display: "flex", 
                  flexDirection: "column",
                  alignItems: "center",
                  borderRadius: "75px 75px 10px 10px",
                  backgroundColor: "#eb2128a6",
                }}
              >
              <CardMedia 
                component="img" 
                image="./Poke_Ball_icon.svg" 
                alt="Poke ball"
                sx={{
                  position: 'relative', 
                  '&:hover': {
                    transform: "rotate(360deg)",
                    transition: "all 1s ease-out"
                  }
                }}
              />
              <Typography variant='h6' sx={{color: "black"}}>{poke.name.toUpperCase()}</Typography>
              </Card>
            </ListItem>)
          )}
        </Grid>
      </List>
    </Container>
  )
}

export default PokeList;