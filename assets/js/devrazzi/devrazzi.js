devrazzi = {

    showWelcome: function () {
        var cookieName = 'devrazzi-welcome-shown';
        if (!Cookies.get(cookieName)) {
            $.notify(
                {
                    icon: 'ti-thumb-up',
                    message: "Welcome to developer's new home page <b>devrazzi</b>. Choose a topic to dive in."
                }, {
                    type: 'success',
                    timer: 1000,
                    allow_dismiss: false,
                    placement: {
                        from: "top",
                        align: "center"
                    }
                }
            );
            Cookies.set(cookieName, 'true', {expires: 1});
        }

    }
}

$(document).ready(function () {

    $('.coming-soon').click(function (e) {
        e.preventDefault();
        $.notify(
            {
                icon: 'ti-announcement',
                message: 'Coming soon to <b>devrazzi</b>'

            }, {
                type: 'info',
                timer: 1000,
                allow_dismiss: true,
                z_index: 1033,
                placement: {
                    from: "top",
                    align: "center"
                }
            }
        );
    });

});