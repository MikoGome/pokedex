package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strings"
	"os"
)

type Pokemon struct {
	Name string `json:"name"`
	Url  string `json:"url"`
}

type Pokemons struct {
	Count   int       `json:"count"`
	Results []Pokemon `json:"results"`
}

type PokemonInfo struct {
	Name     string `json:"name"`
	Sprite   string `json:"sprite"`
	Portrait string `json:"portrait"`
	ID       int    `json:"id"`
}

var pokedexInfo string

var nameToID = make(map[string]int)

func getPokemons(w http.ResponseWriter, r *http.Request) {
	if r.Method != "GET" {
		w.WriteHeader(http.StatusNotFound)
		return
	}

	if pokedexInfo != "" {
		fmt.Fprintf(w, pokedexInfo)
		return
	}

	resp, err := http.Get("https://pokeapi.co/api/v2/pokemon-species?limit=10000&offset=0")
	if err != nil {
		fmt.Println(err)
	}

	defer resp.Body.Close()
	// body, err := ioutil.ReadAll(resp.Body)
	// if err != nil {
	// 	fmt.Println(err)
	// }
	var pokemons Pokemons

	// if err := json.Unmarshal([]byte(body), &pokemons); err != nil {
	// 	fmt.Println(err)
	// }
	json.NewDecoder(resp.Body).Decode(&pokemons)

	var response []PokemonInfo
	for index, value := range pokemons.Results {
		// if value.Name == "deoxys-attack" {
		// 	break
		// }
		pokemonID := index + 1
		sprite := fmt.Sprintf("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/%d.png", pokemonID)
		art := fmt.Sprintf("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/%d.png", pokemonID)
		response = append(response, PokemonInfo{value.Name, sprite, art, pokemonID})
		nameToID[value.Name] = pokemonID
	}
	byteArray, err := json.Marshal(response)

	if err != nil {
		fmt.Println(err)
	}

	pokedexInfo = string(byteArray)
	fmt.Fprintf(w, pokedexInfo)
}

func getPokemon(w http.ResponseWriter, r *http.Request) {
	id := strings.TrimPrefix(r.URL.Path, "/api/pokemon/")
	resp, err := http.Get("https://pokeapi.co/api/v2/pokemon/" + id)
	if err != nil {
		fmt.Println(err)
	}
	defer resp.Body.Close()

	var info map[string]interface{}

	json.NewDecoder(resp.Body).Decode(&info)
	byteArray, err := json.Marshal(info)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Fprintf(w, string(byteArray))
}

func main() {
	PORT := os.Getenv("PORT")
	if PORT == "" {
		PORT = fmt.Sprint(3000)
	}
	http.Handle("/", http.FileServer(http.Dir("./build/")))
	http.HandleFunc("/api/pokemons", getPokemons)
	http.HandleFunc("/api/pokemon/", getPokemon)
	fmt.Printf("Staring server at PORT %s \n", PORT)

	log.Fatal(http.ListenAndServe(":"+PORT, nil))
}
