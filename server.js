// Module dependencies.
var application_root = __dirname,
    express = require( 'express' ), //Web framework
    path = require( 'path' ), //Utilities for dealing with file paths
    mongoose = require( 'mongoose' ); //MongoDB integration

//Create server
var app = express();

//Connect to database
mongoose.connect( 'mongodb://localhost/library_database' );

//Schemas
var Game = new mongoose.Schema({
    title: String,
    system: String,
    purchaseDate: Date,
    purchasePrice: String
});

//Models
var GameModel = mongoose.model( 'Game', Game );

// Configure server
app.configure( function() {
    //parses request body and populates request.body
    app.use( express.bodyParser() );

    //checks request.body for HTTP method overrides
    app.use( express.methodOverride() );

    //perform route lookup based on url and HTTP method
    app.use( app.router );

    //Where to serve static content
    app.use( express.static( path.join( application_root, 'site') ) );

    //Show all errors in development
    app.use( express.errorHandler({ dumpExceptions: true, showStack: true }));
});

// Routes
app.get( '/api', function( request, response ) {
    response.send( 'Library API is running' );
});

//Get a list of all games
app.get( '/api/games', function( request, response ) {
    return GameModel.find( function( err, games ) {
        if( !err ) {
            return response.send( games );
        } else {
            return console.log( err );
        }
    });
});

//Insert a new game
app.post( '/api/games', function( request, response ) {
    var game = new GameModel({
        title: request.body.title,
        system: request.body.system,
        purchaseDate: request.body.purchaseDate,
        purchasePrice: request.body.purchasePrice
    });

    return game.save( function( err ) {
        if( !err ) {
            console.log( 'created' );
            return response.send( game );
        } else {
            console.log( err );
        }
    });
});

//Get a single book by id
app.get( '/api/games/:id', function( request, response ) {
    return GameModel.findById( request.params.id, function( err, game ) {
        if( !err ) {
            return response.send( game );
        } else {
            return console.log( err );
        }
    });
});

//Update a book
app.put( '/api/games/:id', function( request, response ) {
    console.log( 'Updating game ' + request.body.title );
    return GameModel.findById( request.params.id, function( err, game ) {
        game.title = request.body.title;
        game.system = request.body.system;
        game.purchaseDate = request.body.purchaseDate;
        game.purchasePrice = request.body.purchasePrice;

        return game.save( function( err ) {
            if( !err ) {
                console.log( 'Game updated' );
                return response.send( game );
            } else {
                console.log( err );
            }
        });
    });
});

//Delete a book
app.delete( '/api/games/:id', function( request, response ) {
    console.log( 'Deleting game with id: ' + request.params.id );
    return GameModel.findById( request.params.id, function( err, game ) {
        return game.remove( function( err ) {
            if( !err ) {
                console.log( 'Game removed' );
                return response.send( '' );
            } else {
                console.log( err );
            }
        });
    });
});

//Start server
var port = 4711;
app.listen( port, function() {
    console.log( 'Express server listening on port %d in %s mode', port, app.settings.env );
});