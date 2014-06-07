var app = app || {};

app.CatalogView = Backbone.View.extend({
	el: '#game',

	initialize: function(initialGames) {
		this.collection = new app.Catalog(initialGames);
		this.collection.fetch({reset: true});
		this.render;

		this.listenTo(this.collection, 'add', this.renderGame);
		this.listenTo(this.collection, 'reset', this.render);
	},

	events: {
		'click #add': 'addGame'
	},

	addGame: function(e) {
	    e.preventDefault();

	    var formData = {};

	    $('#addGame').find('input, select').each(function(i, el) {
	        if($(el).val() != '') {
	        	if(el.id === 'purchaseDate') {
	        		formData[el.id] = $('#purchaseDate').datepicker('getDate').getTime();
	        	} else {
	        		formData[el.id] = $(el).val();
	        	}
	        }
	        $(el).val('');
	    });

	    this.collection.create(formData);
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