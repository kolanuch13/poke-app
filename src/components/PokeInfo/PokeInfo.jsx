import {
  Container,
  Card,
  CardMedia,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box
} from '@mui/material'

const PokeInfo = ({pokemon}) => {
  const image = pokemon.sprites.other.dream_world.front_default;
  const name = pokemon.name;
  const abilities = pokemon.abilities;

  return (
    <Container>
      <Card sx={{p: "20px"}}>
        <CardMedia
          component="img"
          image={
            image ? 
            image : 
            "./Poke_Ball_icon.svg"
          }
        />
        <Box sx={{
          display: "flex", 
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center", 
        }}>
          <Typography variant='h3'>{name.toUpperCase()}</Typography>
          <List sx={{display: "flex", gap: "2px", flexDirection: "column",}}>
            {abilities.map((ability) => (
              <ListItem key={ability.ability.name} sx={{
                display: "flex", 
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center", 
                backgroundColor: "#eb2128a6",
                borderRadius: "10px"
              }}>
                <ListItemText primary={ability.ability.name}/>
              </ListItem>
            ))}
          </List>
        </Box>
      </Card>
    </Container>
  )
}

export default PokeInfo;