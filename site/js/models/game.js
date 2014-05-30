var app = app || {};

app.Game = Backbone.Model.extend({
	defaults: {
		title: 'Game Title',
		system: 'Unknown',
		purchaseDate: 'Unknown',
		purchasePrice: 'Unknown'
	}
});