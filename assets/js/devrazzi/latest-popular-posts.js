var menu = [
    {
        name: "source",
        options: [
            {
                name: "Twitter",
                icon: "fa fa-twitter",
                value: "twitter",
                active: true,
                available: true
            },
            {
                name: "LinkedIn",
                icon: "fa fa-linkedin",
                value: "linkedin",
                active: false,
                available: false
            },
            {
                name: "All",
                icon: "fa fa-list-ol",
                value: "all",
                active: false,
                available: false
            }
        ]
    },
    {
        name: "period",
        options: [
            {
                name: "Daily",
                icon: "fa fa-calendar",
                value: "daily",
                active: false,
                available: true
            },
            {
                name: "Weekly",
                icon: "fa fa-calendar",
                value: "weekly",
                active: true,
                available: true
            }
        ]
    }
];

$(document).ready(function () {
    devrazzi.createMenu(menu, refreshContentByFilteringMenu);

    refreshContentByFilteringMenu();
});

function refreshContentByFilteringMenu() {
    // Update content title by new filter
    var sourceFilter = JSON.search(window.menu, '//*[name="source"]/options[active="true"]/name')[0];
    var periodFilter = JSON.search(window.menu, '//*[name="period"]/options[active="true"]/name')[0];
    var contentTypeFilter = (sourceFilter == 'Twitter' ? 'Tweets' : 'Posts') + ' for Developers';
    devrazzi.updateContentTitle(sourceFilter, periodFilter, 'Popular', contentTypeFilter);

    // First, remove old contents
    $('div.card div.content div.row.listing-row').remove();

    var selectedContent = devrazzi.getSelectedContentByFilteringMenu(menu);

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
    var rowTemplate = '<div class="row listing-row"></div>';
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
}