firebase.auth().onAuthStateChanged(function (currentUser) {
    if (currentUser) {
        window.location.href = window.location.origin + '/http-status-chat/web/index.html'
    } else {
        var uiConfig = {
            signInSuccessUrl: window.location.origin + '/http-status-chat/web/index.html',
            signInOptions: [
                // Leave the lines as is for the providers you want to offer your users.
                firebase.auth.GoogleAuthProvider.PROVIDER_ID
            ]
        };

        // Initialize the FirebaseUI Widget using Firebase.
        var ui = new firebaseui.auth.AuthUI(firebase.auth());
        // The start method will wait until the DOM is loaded.
        ui.start('#firebaseui-auth-container', uiConfig);
    }
});