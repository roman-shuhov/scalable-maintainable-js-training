(function ($) {
	var pluginName = "Quiz",
		JSON_FILE_QUESTIONS = 'questions.json',
		defaults = {
			resultComponent: 'results'
		};
	
	function Quiz(element, options) {
		this.container = $(element);
		this.options = $.extend({}, defaults, options);
		var jsonResult = $.getJSON(JSON_FILE_QUESTIONS, function(data) {
			// save data from json
			this.questions = data;
			
			// initialize plugin
			this.init();
		}.bind(this));
	}
	
	Quiz.prototype.init = function() {
		// create html blocks
		this.questionBlock = $('<div\>', {
			className: 'question-title'
		});
		this.container.append(this.questionBlock);
		
		this.answersBlock = $('<div\>', {
			className: 'answer-list'
		});
		this.container.append(this.answersBlock);
	
		this.totalPoints = 0;
		this.showQuestion(0);
	}
	
	Quiz.prototype.chooseAnswer = function(answer) {
		var index = $(answer).data('index');
		if (typeof this.questions[this.current].points[index] != 'undefined') {
			this.totalPoints += this.questions[this.current].points[index];
			console.log(this.totalPoints);
			this.current += 1;
			if (this.isLastQuestion()) {
				this.showResult();
			} else {
				this.showQuestion(this.current);
			}
		}
	}
	
	Quiz.prototype.showResult = function() {
		var resultComponentName = this.options.resultComponent;
		
		if (typeof this.container[resultComponentName] == 'function') {
			this.container[resultComponentName]({
				totalPoints: this.totalPoints
			});
		} else {
			this.container.html('Result is unknown!');
		}
	}
	
	Quiz.prototype.isLastQuestion = function() {
		return this.current == this.questions.length;
	}
	
	Quiz.prototype.showQuestion = function(index) {
		this.current = index;
		var currentQuestion = this.questions[this.current];
		this.questionBlock.html(currentQuestion.question)
		this.answersBlock.html('');
		for (var i in currentQuestion.answers) {
			var block = $('<li/>', {
				text: currentQuestion.answers[i],
				'data-index': i,
				click: function (event) {
					this.chooseAnswer(event.currentTarget)
				}.bind(this)
			});
			this.answersBlock.append(block);
		}
	}

	$.fn.quiz = function (options) {
		return this.each(function () {
			if (!$.data(this, "plugin_" + pluginName)) {
				$.data(this, "plugin_" + pluginName, new Quiz(this, options));
			}
		});
	}
}(jQuery));
