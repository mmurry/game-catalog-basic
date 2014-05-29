var app = app || {};

$(function() {
	var games = [
		{title: 'New Game', system: 'XBox', purchaseDate: '1/1/2000', purchasePrice: '$20.00'}
	];
	new app.CatalogView(games);
});