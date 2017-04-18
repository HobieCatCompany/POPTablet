$(document).ready(function() {
    //
    // Hidden admin functions -- catch these first
    //
    $('button.input-submit').click(function(event) {
        // Stop form from actually submitting on button click
        event.preventDefault();

        // Clear all localStorage data
        if ($('input.input-email').val() == 'DELETE_ALL_DATA') {
            // Clear all localStorage data
            localStorage.clear();

            // Show message when localStorage data has been cleared
            $('div.validation-messages').append('<label class="form-success">All stored data has been deleted!</label>').delay(3000).fadeOut(500, function() {
                location.reload();
            });

            // Stop execution of script and log an error
            throw new Error('All stored data has been deleted!');
        }

        // Loop through and show all localStorage data
        else if ($('input.input-email').val() == 'SHOW_ALL_DATA') {
            for (var i = 0; i < localStorage.length; i++) {
                var data = JSON.parse(localStorage.getItem(localStorage.key(i)));
                $('div.validation-messages').append('<label class="form-success">EMAIL: ' + data.email + ' ZIP: ' + data.zip + '</label>');
            }

            // Stop execution of script and log an error
            throw new Error('All stored data has been displayed.');
        }

        // Upload stored data
        // Coming soon...
    });

    //
    // Validate form using jQuery plugin
    //
    $('form.lead-form').validate({
        errorPlacement: function(error, element) {
            error.appendTo('div.validation-messages');
        }
    });

    //
    // Check if we can use browser based localStorage
    //
    if (typeof(Storage) != 'undefined') {
        // Collect form submitted data on submit and write it to localStorage
        $('button.input-submit').click(function(event) {
            // Stop form from actually submitting on button click
            event.preventDefault();

            // Get form's submitted email & zip field data
            var email = $('input.input-email').val();
            var zip = $('input.input-zip').val();

            // Create JSON object to pass along to localStorage
            var json_data = {'email': email, 'zip': zip};

            // Get number of items stored in localStorage
            var num_rows = localStorage.length + 1;

            // Commit data to localStorage if form passes validation
            if ($('input.input-email').hasClass('valid') && $('input.input-zip').hasClass('valid')) {
                // Write JSON data to localStorage
                localStorage.setItem(num_rows, JSON.stringify(json_data));

                // Show success message and reload page (clear form fields) after data written to localStorage
                $('div.validation-messages').append('<label class="form-success">Thanks for signing up!</label>').delay(3000).fadeOut(500, function() {
                    location.reload();
                });
            }
        });
    }

    //
    // Can't use browser based localStorage? Show JS alert message.
    //
    else {
        alert('***** Browser based localStorage is not available. Collected data will not be saved! *****');
    }
});
