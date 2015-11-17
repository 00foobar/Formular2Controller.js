	/* Formular2Controller */
	function Formular2Controller(formular, controller_action, controller_path)
	{
		// reference to the "object" itself because this is context-based
		var that = this;

		this.formular = formular;
		this.controller_action = controller_action;
		this.controller_path = controller_path;
		this.formular_elements = {};

		// fire
		this.requestPublic = function()
		{
			var result = requestController();

			return result;
		}

		// private method - calling (POST) the controller with an AJAX-request
		function requestController()
		{
			// add the form elements to that.formular_elements
			getFormElements();

			// get the property-count of the object (used as assoc array)
			var size = getObjectSize(that.formular_elements);

			// if no elements where send dont do the request
			if ( size > 0 )
			{
				// add the action parameter
				that.formular_elements['action'] = controller_action;

				// clear object (assoc array) from empty properties (keys) exp. submit button field
				delete that.formular_elements[''];

				// do the POST request
				$.ajax({
					type: "POST",
					url: that.controller_path,
					data: that.formular_elements,
					success: function(result) {
						// success code
						var success = $.parseJSON(result);

						if ( success === true )
						{
							successReaction();
							return true;
						}
						else
						{
							failureReaction();
							return false;
						}
					},
					error: function(result) {
						// failure code
						console.log('Error: ');
						console.log(result);
						return false;
					}

				});
			}
			else
			{
				return false;
			}
		}

		// private method - add the form elements with element-id and element-value to the object (used as assoc array)
		function getFormElements()
		{
			$(that.formular).filter(':input').each(function()
			{
				that.formular_elements[this.id] = this.value;
			});
		}

		// private method - count properties of the object 
		function getObjectSize(obj)
		{
			var size = 0, key;
					
			for (key in obj)
			{
				if (obj.hasOwnProperty(key)) size++;
			}

			return size;
		};

		// private method - stuff to do if AJAX-request was successfull
		function successReaction()
		{
			// maybe add code here
		}

		// private method - stuff to do if AJAX-request was NOT successfull
		function failureReaction()
		{
			// maybe add code here
		}

	}