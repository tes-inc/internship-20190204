const app = new Pokedex.Pokedex(); // ポケモンAPIを簡単に使えるようにするライブラリをnewする

const pokeList = new Vue( {
  el: '#mainWrap',
  data: {
    pokenames: [],            // leftListに出力する20体の名前
    id: '',                   // ID
    name: '',                 // 日本語名
    en_name: '',              // 英語名
    height: '',               // 身長
    weight: '',               // 体重
    type1: '',                // タイプ１
    type2: '',                // タイプ２
    ability1: '',             // 特性１
    ability2: '',             // 特性２
    sprites_default: '',      // ポケモンの画像
    sprites_front_default: '',// 前から見た姿
    sprites_female: '',       // 前から見たメス
    sprites_shiny: '',        // 前から見た色違い
    sprites_shiny_female: '', // 前から見た色違いのメス
    genera: '',               // 〇〇ポケモン
    flavor_text: '',          // ポケモンの説明文
    evolve1: '',              // 未進化状態の画像
    evolve2: [],              // １進化状態の名前と画像
    evolve3: '',              // ２進化状態の画像
    c_evo1: '',               // クリックされたポケモンの未進化状態の名前
    c_evo2: '',               // クリックされた１進化状態の名前
    c_evo3: '',               // クリックされた２進化状態の名前
    name_japa: [],             // {name:日本語名,name2:英語名}の形で保存
    nextPage: 'https://pokeapi.co/api/v2/pokemon-species/', // 図鑑No.1~20までのspecies
    previousPage: ''

  },
  methods: {
    // 画面左側に図鑑No.1~20までのポケモンのリストを表示
    initialize:async function(page) {
        await app.resource(page).then(function(response) {
        pokeList.nextPage = response.next; // 次のリストURL
        pokeList.previousPage = response.previous; // 前のリストURL
        let limit = pokeList.nextPage.replace('limit=20','limit=60');
        pokeList.nextPage = limit;
        console.log(response)
        console.log(pokeList.previousPage);
        for(let i = 0;i < 20; i++) {
          app.getPokemonSpeciesByName(response.results[i].name).then(function(species){
            let name_ja = species.names.find(function(value) {
              return value.language.name === "ja";
            })
            pokeList.name_japa.push({name:name_ja.name,name2:response.results[i].name});
          })
        }
      });
    },

    // クリックされたポケモンの情報を表示
    click: async function(listName) {
      pokeList.type2 = ''; // タイプ2の初期化

      let pokename = listName.replace(/\d?\d?\d\W+/,''); // 名前の前の数字と「.」を消去
      const poke = await app.getPokemonByName(pokename);
      // id・名前・たかさ・おもさ・タイプ1・タイプ2・とくせい1・とくせい2・front画像の取得
      pokeList.id = poke.id;
      pokeList.en_name = poke.name;
      pokeList.height = poke.height / 10; // メートルに変換
      pokeList.weight = poke.weight / 10; // キログラムに変換
      pokeList.type1 = poke.types[0].type.name;
      if (poke.types[1]) { // タイプ2があればその値を取得
        pokeList.type2 = poke.types[1].type.name;
      }
      pokeList.ability1 = poke.abilities[0].ability.name;
      if (poke.abilities[1]) { // とくせい2があればその値を取得
        pokeList.ability2 = poke.abilities[1].ability.name;
      }
      pokeList.sprites_default = poke.sprites.front_default;
      pokeList.sprites_front_default = poke.sprites.front_default;
      pokeList.sprites_female = poke.sprites.front_female;
      pokeList.sprites_shiny= poke.sprites.front_shiny;
      pokeList.sprites_shiny_female = poke.sprites.front_shiny_female;

      // ここからspeciesの情報取得
      await app.resource('https://pokeapi.co/api/v2/pokemon-species/'+pokeList.id+'/')
      .then(function(response){
        // 〇〇ポケモンの取得
        let genera = response.genera.find(function(value) {
          return value.language.name === "ja";
        })
        pokeList.genera = genera.genus;

        // フレーバーテキストの取得
        let flavor_text_ja = response.flavor_text_entries.find(function(value) {
          return value.language.name === "ja";
        })
        pokeList.flavor_text = flavor_text_ja.flavor_text;

        // 日本語名の取得
        let name_ja = response.names.find(function(value) {
          return value.language.name === "ja";
        })
        pokeList.name = name_ja.name;

        // 進化情報
        let res1  =  response.evolution_chain.url;
        app.resource(res1).then(function(res){
          pokeList.evolve1 = ''; // 進化画像の初期化
          pokeList.evolve2 = [];
          pokeList.evolve3 = '';

          // 現在表示しているポケモンと未進化状態の名前が一致したら
          if (res.chain.species.name != pokeList.en_name) {
            pokeList.c_evo1 = res.chain.species.name;
            app.getPokemonByName(pokeList.c_evo1).then(function(evoImg) {
            pokeList.evolve1 = evoImg.sprites.front_default
            })
          }
          for(let i = 0; i <= res.chain.evolves_to.length; i++){
            // 現在表示しているポケモンと1進化後の名前が一致したら
            if(res.chain.evolves_to[i] && res.chain.evolves_to[i].species.name != pokeList.en_name){
              pokeList.c_evo2 = res.chain.evolves_to[i].species.name;
              app.getPokemonByName(res.chain.evolves_to[i].species.name).then(function(evoImg) {
                pokeList.evolve2.push({name: res.chain.evolves_to[i].species.name, url:evoImg.sprites.front_default});
              })
            }
          }
          // 現在表示しているポケモンと2進化後の名前が一致したら
          if(res.chain.evolves_to[0].evolves_to[0] && res.chain.evolves_to[0].evolves_to[0].species.name != pokeList.en_name){
            pokeList.c_evo3 = res.chain.evolves_to[0].evolves_to[0].species.name;
            app.getPokemonByName(pokeList.c_evo3).then(function(evoImg) {
              pokeList.evolve3 = evoImg.sprites.front_default;
            })
          }
        })
      })
    },

    // オス・メス・それぞれの色違い画像クリック時にその画像を上に出力
    click2: function(c_img) {
      pokeList.sprites_default = c_img;
    },

    // 「▼」クリック時次の20体をリスト表示
    click3: function() {
      pokeList.name_japa = []; // リストの初期化
      pokeList.initialize(pokeList.nextPage);
    },

    //「▲」クリック時前の20体をリスト表示
    click4: function() {
      pokeList.name_japa = []; // リストの初期化
      pokeList.initialize(pokeList.previousPage);
    }
  }
})
// 画面ロード時図鑑No.1~20までのポケモンのリストを表示
pokeList.initialize(pokeList.nextPage);
