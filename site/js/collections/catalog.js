var app = app || {};

app.Catalog = Backbone.Collection.extend({
	model: app.Game,
	url: '/api/games'
});