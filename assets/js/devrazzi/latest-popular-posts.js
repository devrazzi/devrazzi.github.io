$(document).ready(function () {

    var selectedContent = devrazzi.popularPosts['twitter']['weekly'];

    var tweetComponentTemplate =
        '<div class="col-lg-6 col-sm-12 repo-listing-item">' +
        '    <div id="{{tweetId}}"></div>' +
        '</div>';

    var tweetComponents = [];
    for (var i = 0; i < selectedContent.length; i++) {
        var eachVideo = selectedContent[i];
        var renderedComponent = tweetComponentTemplate
            .replace('{{tweetId}}', eachVideo.id);

        tweetComponents.push(renderedComponent);
    }

    var $footer = $('div.card div.content').find('.footer');
    var rowTemplate = '<div class="row"></div>';
    var $row;
    for (var i = 0; i < tweetComponents.length; i++) {
        if (i % 2 == 0) {
            $row = $(rowTemplate);
        }
        $row.append($(tweetComponents[i]));
        $footer.before($row);
    }

    // When Twitter ready
    twttr.ready(
        function (twttr) {
            // Render tweets
            for (var i = 0; i < selectedContent.length; i++) {
                var tweetId = selectedContent[i].id;
                twttr.widgets.createTweet(
                    tweetId,
                    document.getElementById(tweetId),
                    {
                        "cards": "hidden"
                    }
                );
            }
        }
    );

});