var app = app || {};

app.CatalogView = Backbone.View.extend({
	el: '#game',

	initialize: function(initialGames) {
		this.collection = new app.Catalog(initialGames);
		this.render;

		this.listenTo(this.collection, 'add', this.renderGame);
	},

	events: {
		'click #add': 'addGame'
	},

	addGame: function(e) {
	    e.preventDefault();

	    var formData = {};

	    $('#addGame').find('input, select').each(function(i, el) {
	        if($(el).val() != '') {
	            formData[el.id] = $(el).val();
	        }
	    });

	    this.collection.add(new app.Game(formData));
	},

	render: function() {
		this.collection.each(function(item) {
			this.renderGame(item);
		}, this);
	},

	renderGame: function(item) {
		var gameView = new app.GameView({
			model: item
		});
		this.$el.append(gameView.render().el);
	}
});