$(document).ready(function() {
    //
    // Hidden admin functions -- catch these first
    //
    $('button.input-submit').click(function(event) {
        // Stop form from actually submitting on button click
        event.preventDefault();

        // Clear all localStorage data
        if ($('input.input-name').val() == 'DELETE_ALL_DATA') {
            // Clear all localStorage data
            localStorage.clear();

            // Show message when localStorage data has been cleared
            $('div.validation-messages').append('<label class="form-success">All stored data has been deleted!</label>');
        }

        // Loop through and show all localStorage data
        else if ($('input.input-name').val() == 'SHOW_ALL_DATA') {
            // Show number of displayed rows
            $('div.validation-messages').append('<label class="form-success">Displaying ' + localStorage.length + ' leads.</label>')

            // Loop through and show all stored data
            for (var i = 0; i < localStorage.length; i++) {
                var obj = JSON.parse(localStorage.getItem(localStorage.key(i)));
                $('div.validation-messages').append('<label class="form-success">EMAIL: ' + obj.email_address + ' ZIP: ' + obj.postal_code + '</label>');
            }
        }

        // Upload stored data via AJAX
        else if ($('input.input-name').val() == 'UPLOAD_ALL_DATA') {
            // Show number of leads being uploaded
            $('div.validation-messages').append('<label class="form-success">Uploading ' + localStorage.length + ' leads.</label>')

            // Loop through and upload all stored data
            for (var i = 0; i < localStorage.length; i++) {
                var obj = JSON.parse(localStorage.getItem(localStorage.key(i)));
                $.ajax({
                    type: 'POST',
                    url: 'https://api.hobiecat.com/lead-generation-tablet-post/',
                    data: obj,
                    async: false
                });
            }

            // Show message when localStorage data has been uploaded
            $('div.validation-messages').append('<label class="form-success">All stored data has been uploaded.</label>');
        }
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
            var name = $('input.input-name').val();
            var email = $('input.input-email').val();
            var phone = $('input.input-phone').val();

            // Create JSON object to pass along to localStorage
            var json_data = {'name': name, 'email_address': email, 'phone': phone, 'source_id': '12', 'mailpiece_slug': 'eclipse-email-newsletter'};

            // Get number of items stored in localStorage
            var num_rows = localStorage.length + 1;

            // Commit data to localStorage if form passes validation
            if ($('input.input-name').hasClass('valid') && $('input.input-email').hasClass('valid') && $('input.input-phone').hasClass('valid')) {
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
