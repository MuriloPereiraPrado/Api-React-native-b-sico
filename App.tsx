
import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, Image, Button, TouchableOpacity } from 'react-native';

const pokemonList = [
  {id:1, nome:"Bulbasauro"},
  {id:4, nome:"Charmander"},
  {id:7, nome:"Squirtle"}
];

export default function App(){
  const[pokeEscolhido, setPokeescolhido] = useState(null);

  const getPokemonData = (idPokemon) => {
    const endpoint = `https://pokeapi.co/api/v2/pokemon/${idPokemon}`;

    fetch(endpoint).then(resposta => resposta.json()).then(json => {
      const pokemon = {
        nome : json.name,
        img : json.sprites.other["official-artwork"].front_default,
        peso : json.weight,
      };

      setPokeescolhido(pokemon);
    }).catch(() => {
      Alert.alert('erro', 'Não foi possível carregar os dados do pokemon');
    });
  }
  return(
    <View style={styles.container}>
      <ScrollView >
        <View style={styles.boxtitle}>
          <Text style={styles.title}> Escolha seu Pokemon</Text>
        </View>

        {pokeEscolhido != null && (
          <View style={styles.boxDados}>
            <View style={styles.boxPN}>
              <Text style={styles.text}>Nome : {pokeEscolhido.nome}</Text>
              <Text style={styles.text}>Peso : {pokeEscolhido.peso}</Text>
            </View>
            <View>
                <Image resizeMode='stretch' source={{uri:pokeEscolhido.img}} style={styles.Image}/>
            </View>
          </View>
        )}
        {pokemonList.map( pokemon => (
          <View style={styles.boxChoice}>
            <TouchableOpacity style={styles.button} onPress={ () => getPokemonData(pokemon.id) }>
              <Text>Dados do {pokemon.nome}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:"#ffffffff"
  },
  sroll:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  boxtitle:{
    width:400,
    height:50,
    alignItems:'center',
    justifyContent:'center',
    marginBottom:50,
    backgroundColor:"#000000e1",
    borderBottomLeftRadius:15,
    borderBottomRightRadius:15
  },
  title:{
    fontSize:20,
    color:"#ffffff"
  },
  boxDados:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    height:100,
    width:400,
    marginBottom:50,
    borderRadius:50,
    elevation:10,
    shadowColor:'#212422'
  },
  button:{
    width:200,
    height:50,
    margin:20,
    backgroundColor:'#fafafa',
    elevation:5,
    shadowColor:'#000000',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:10
  },
  boxChoice:{
    justifyContent:'center',
    alignItems:'center'
  },
  Image:{
    width:150,
    height:150
  },
  boxPN:{
    marginRight:20
  },
  text:{
    fontSize:20,
    color:'#000000'
  }
});

