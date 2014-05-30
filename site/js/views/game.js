var app = app || {};

app.GameView = Backbone.View.extend({
	tagName: 'div',
	className: 'col-md-4',
	template: _.template($('#gameTemplate').html()),

	events: {
		'click .delete': 'deleteGame'
	},

	deleteGame: function() {
		this.model.destroy();
		this.remove();
	},

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});