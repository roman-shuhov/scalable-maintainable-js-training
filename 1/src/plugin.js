(function ($) {
	var quiz = null;
	
	function Quiz(element) {
		this.container = element;
	}
	
	Quiz.prototype.showQuestion = function(index) {
		$(this.element).child('.question').html(questions[i])
	}
	
	Quiz.prototype.init = function() {
		var jsonResult = $.getJSON('questions.json');
		if (jsonResult && jsonResult.responseJson) {
			this.questions = jsonResult.responseJSON;
		}
		this.current = 0;
		showQuestion();
	}

  	$.fn.quiz = function () {
		if (!quiz) {
			quiz = new Quiz(this);
		}
	};

}(jQuery));
