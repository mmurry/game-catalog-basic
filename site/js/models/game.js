var app = app || {};

app.Game = Backbone.Model.extend({
	defaults: {
		title: 'Game Title',
		system: 'Unknown',
		purchaseDate: 'Unknown',
		purchasePrice: 'Unknown'
	},

	parse: function(response) {
		response.id = response._id;
		return response;
	}
});