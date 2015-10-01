jQuery(document).ready(function($) {
	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	var alertMessage = function(type, message) {
		return "<div class='alert alert-" + type + " alert-dismissible' role='alert'>" +
			"<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>" +
			"<strong>" + capitalizeFirstLetter(type) + "</strong> " + message + "</div>";
	};
	$('#submit-trigger').on('click', function(e) {
		e.preventDefault();
		var email = $('#subscribe-email').val(),
			container = $('body'),
			pattern = /^[a-z]+@[a-z]+\.[a-z]{2,6}$/i,
			loaderTemplate = '<div id="loader-back"><div class="preview-area">' +
				'<div class="spinner-jx">' +
				'<div class="bounce1"></div>' +
				'<div class="bounce2"></div>' +
				'<div class="bounce3"></div></div></div></div>';

		if(email.search(pattern) === -1 || email === '') {
			container.find('.alert').remove();
			return container.find('.container').prepend(alertMessage("warning", "Please enter a valid email address"));
		}

		container.append(loaderTemplate);

		$.ajax({
			url    : 'maintenance_pack/form.php',
			type   : 'POST',
			data   : {
				mailto_20154414064435: 'yes',
				subscribe_email      : email
			},
			success: function(data) {
				var inputHndlr = $('#subscribe-email');
				if (data === 'success') {
					container.find('#loader-back').remove();
					container.find('.alert').remove();
					container.find('.container').prepend(alertMessage("success", "You successfully subscribed!"));
					inputHndlr.val(inputHndlr.attr('data-placeholder'));
				} else {
					container.find('#loader-back').remove();
					container.find('.alert').remove();
					container.find('.container').prepend(alertMessage("danger", "Something Wrong! Try again later"));
				}
			},
			error  : function(jqXHR, textStatus, errorThrown) {
				alert(jqXHR + " :: " + textStatus + " :: " + errorThrown);
			}
		})
	});

	var focusBlurInput = function(selector){
		var inputHandler = $(selector),
			pattern = /^[a-z]+@[a-z]+\.[a-z]{2,6}$/i,
			baseValue = inputHandler.attr('data-placeholder');

		inputHandler.on('focus', function(e){
			if(inputHandler.val() === baseValue) {
				$(this).val('');
			}
		});
		inputHandler.on('blur', function(){
			if($(this).val() === '') {
				$(this).val(baseValue);
			}
		});
	};
	focusBlurInput('#subscribe-email');

});