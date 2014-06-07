var app = app || {};

$(function() {
	$('#purchaseDate').datepicker();
	new app.CatalogView();
});