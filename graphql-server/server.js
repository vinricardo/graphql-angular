var express = require('express');
var express_graphql = require('express-graphql').graphqlHTTP;
var {buildSchema} = require('graphql');
const cors = require('cors');
var schema = buildSchema(`
    type Query {
        game(id: Int!): Game
        games(genre: String): [Game]
        allGames: [Game]
    } 

    type Mutation{
        updateGameGenre(id: Int!, genre: String!): Game
         addGame(title: String!, genre: String!, developed: String!): Game
    }

    type Game {
        id: Int,
        title: String,
        genre: String,
        developed: String
    }
`);

var gamesData = [
    {
        id: 1,
        title: 'Crysis 2',
        genre: 'FPS and Sci-fi',
        developed: 'Crytek'
    },
    {
        id: 2,
        title: 'Far Cry 3',
        genre: 'FPS',
        developed: 'Ubisoft'
    },
    {
        id: 3,
        title: 'Grand Theft Auto',
        genre: 'Action',
        developed: 'Rockstar Games'
    }
];

var getGame = function(args){
    var id = args.id;
    return gamesData.filter(game => {
        return  game.id == id;
    })[0];
}

var getGames = function(args){
    if (args.genre){
        var genre = args.genre;
        return gamesData.filter(games => games.genre === genre)
    } else {
        return gamesData;
    }
}

var allGames = function(){
    return gamesData;
}

var updateGameGenre = function({id, genre}){
    gamesData.map(game => {
        if(game.id === id){
            game.genre = genre;
            return game;
        }
    });
    return gamesData.filter(game => game.id === id)[0];
}

var addGame = function({title, genre,developed}){
    const id = gamesData.length+1;
    const game = {
        id: id,
        title: title,
        genre: genre,
        developed: developed
    }
    gamesData.push(game)
    return gamesData;
}

var root = {
    game: getGame,
    games: getGames,
    updateGameGenre: updateGameGenre,
    allGames: allGames,
    addGame: addGame
};

var app = express();
app.use(cors());
app.use('/games', express_graphql({schema:schema, rootValue:root, graphiql:true}));

  


app.listen(4000, () => console.log('Express GraphQL Server Now Running'))