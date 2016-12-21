var messagesRef;

function loadMessages() {
    // Reference to the /messages/ database path.
    messagesRef = firebase.database().ref('messages');
    // Make sure we remove all previous listeners.
    messagesRef.off();

    // Loads the last 12 messages and listen for new ones.
    var setMessage = function (data) {
        $('#message-list').append('<li>' + JSON.stringify(data.val()) + '</li>');
    };

    messagesRef.limitToLast(12).on('child_added', setMessage);
    // messagesRef.limitToLast(12).on('child_changed', setMessage);
}

function saveMessage() {
    // Check that the user entered a message and is signed in.
    var $messageInput = $('input[name="message"]');
    if ($messageInput.val() /* && this.checkSignedInWithMessage()*/) {
        var currentUser = firebase.auth().currentUser;

        // Add a new message entry to the Firebase Database.
        messagesRef.push({
            name: currentUser.displayName,
            text: $messageInput.val()
        }).then(function () {
            // Clear message text field and SEND button state.
            $messageInput.val('');
        }.bind(this)).catch(function (error) {
            console.error('Error writing new message to Firebase Database', error);
        });
    }
};

firebase.auth().onAuthStateChanged(function (currentUser) {
    if (currentUser) {
        $('#hello').text('Hello ' + currentUser.displayName);

        loadMessages();
    } else {
        window.location.href = window.location.origin + '/http-status-chat/web/auth.html';
    }
});