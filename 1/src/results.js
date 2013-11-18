(function ($) {
	var pluginName = "Results",
		JSON_FILE_RESULTS = 'results.json',
		defaults = {
			totalPoints: 0
		};

	function Results(element, options) {
		this.container = $(element);
		this.options = $.extend({}, defaults, options);
		var jsonResult = $.getJSON(JSON_FILE_RESULTS, function(data) {
			this.results = data;
			this.showResults();
		}.bind(this));
	}
	
	Results.prototype.showResults = function() {
		// determine result text based on points count
		var resultText = 'too damn high!';
		for (var i in this.results) {
			var result = this.results[i];
			if (this.options.totalPoints < result.to) {
				var resultText = result.status;
				break;
			}
		}

		// display quiz results
		this.container.html($('<div/>', {
			text: 'Your result is ' + resultText
		}));
	}

	$.fn.results = function(options) {
		return this.each(function () {
			if (!$.data(this, "plugin_" + pluginName)) {
				$.data(this, "plugin_" + pluginName, new Results(this, options));
			}
		});
	}
}(jQuery));