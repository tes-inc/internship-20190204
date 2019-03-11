const app = new Pokedex.Pokedex(); // ポケモンApiを簡単に使えるようにするライブラリをnewする


const pokeList = new Vue({
  el: '#mainWrap', // bodyタグ内全部
  data: {
    pokenames:[], // leftListに出力する20体の名前
    id: '',
    name: '',
    en_name: '',
    height: '',
    weight: '',
    type1: '',
    type2: '',
    ability1: '',
    ability2: '',
    sprites_default: '',
    sprites_front_default: '',
    sprites_female: '',
    sprites_shiny: '',
    sprites_shiny_female: '',
    genera:'',
    flavor_text: '',
    evolve1: '',
    evolve2: '',
    evolve3: '',
    a: '',
    b: '',
    c: '',
    changeList: 0,
  },
  methods: {
    initialize: async function(e) {
      let interval = {
        limit:20,
        offset:pokeList.changeList
      }
      app.getPokemonsList(interval)
        .then(function(response){
          for(let i = 0;i < response.results.length; i++){
            pokeList.pokenames.push(pokeList.changeList+i+1 + '.' + response.results[i].name);
          }
        });
    },
    click:async function(pokename) {
      console.log('a')
      const poke = await app.getPokemonByName(pokename);
      pokeList.id = poke.id;
      pokeList.en_name = poke.name;
      pokeList.height = poke.height;
      pokeList.weight = poke.weight;
      pokeList.type1 = poke.types[0].type.name;
      if (poke.types[1]) {
        pokeList.type2 = poke.types[1].type.name;
      }
      pokeList.ability1 = poke.abilities[0].ability.name;
      if (poke.abilities[1]) {
        pokeList.ability2 = poke.abilities[1].ability.name;
      }
      pokeList.sprites_default = poke.sprites.front_default;
      pokeList.sprites_front_default = poke.sprites.front_default;
      pokeList.sprites_female = poke.sprites.front_female;
      pokeList.sprites_shiny= poke.sprites.front_shiny;
      pokeList.sprites_shiny_female = poke.sprites.front_shiny_female;


      await app.resource('https://pokeapi.co/api/v2/pokemon-species/'+pokeList.id+'/')
      .then(function(response){
        console.log(response)
        let genera = response.genera.find(function(value) {
          return value.language.name === "ja";
        })
        pokeList.genera = genera.genus;

        let flavor_text_ja = response.flavor_text_entries.find(function(value) {
          return value.language.name === "ja";
        })
        pokeList.flavor_text = flavor_text_ja.flavor_text;

        let name_ja = response.names.find(function(value) {
          return value.language.name === "ja";
        })
        pokeList.name = name_ja.name;

          let res1  =  response.evolution_chain.url;

          app.resource(res1)
        .then(function(res){

          pokeList.evolve1 = '';
          pokeList.evolve2 = '';
          pokeList.evolve3 = '';

          if (res.chain.species.name != pokeList.en_name) {
            pokeList.a = res.chain.species.name;
              app.getPokemonByName(pokeList.a)
              .then(function(evoImg){
              console.log(evoImg)
              pokeList.evolve1 = evoImg.sprites.front_default
            })
          }
          if(res.chain.evolves_to[0] && res.chain.evolves_to[0].species.name != pokeList.en_name){
            pokeList.b = res.chain.evolves_to[0].species.name;
            app.getPokemonByName(pokeList.b)
            .then(function(evoImg){
            console.log(evoImg)
            pokeList.evolve2 = evoImg.sprites.front_default;
            // pokeList.evolve2 = res.chain.evolves_to[0].species.name;
          })
          }
          if(res.chain.evolves_to[0].evolves_to[0] && res.chain.evolves_to[0].evolves_to[0].species.name != pokeList.en_name){
            pokeList.c = res.chain.evolves_to[0].evolves_to[0].species.name;
            app.getPokemonByName(pokeList.c)
            .then(function(evoImg){
            console.log(evoImg)
            pokeList.evolve3 = evoImg.sprites.front_default;
            // pokeList.evolve3 = res.chain.evolves_to[0].evolves_to[0].species.name;
          })}
        })
      })
    },
    click2:function(pokename) {
      pokeList.sprites_default = pokename;
    },
    click3:function() {
      pokeList.pokenames = [];
      pokeList.changeList += 20;

      pokeList.initialize();
    },
    click4:function() {
      pokeList.pokenames = [];
      pokeList.changeList -= 20;

      pokeList.initialize();
    }
  }
})

pokeList.initialize()
