var menu = [
    {
        name: "source",
        options: [
            {
                name: "YouTube",
                icon: "fa fa-youtube",
                value: "youTube",
                active: true,
                available: true
            },
            {
                name: "All",
                icon: "fa fa-list-ol",
                value: "all",
                active: false,
                available: false
            },
            {
                name: "Vimeo",
                icon: "fa fa-vimeo",
                value: "vimeo",
                active: false,
                available: false
            }
        ]
    },
    {
        name: "period",
        options: [
            {
                name: "Monthly",
                icon: "fa fa-calendar",
                value: "monthly",
                active: true,
                available: true
            },
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
                active: false,
                available: true
            },
            {
                name: "Yearly",
                icon: "fa fa-calendar",
                value: "yearly",
                active: false,
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
    // First, remove old contents
    $('div.card div.content div.row.listing-row').remove();

    var selectedContent = devrazzi.getSelectedContentByFilteringMenu(menu);

    var videoComponentTemplate =
        '<div class="col-lg-6 col-sm-12 repo-listing-item">' +
        '   <p class="github-repo-name">' +
        '       <span class="place">#{{index}}</span>' +
        '       <a href="{{channelUrl}}" target="_blank">{{channelTitle}}</a>' +
        '       <span> / </span>' +
        '       <a href="{{videoUrl}}" target="_blank">' +
        '           <b>{{videoTitle}}</b>' +
        '       </a>' +
        '   </p>' +
        '   <p>' +
        '       <div class="embed-responsive embed-responsive-16by9">' +
        '           <iframe class="embed-responsive-item" src="{{videoEmbedUrl}}"></iframe>' +
        '       </div>' +
        '   </p>' +
        '   <p class="github-repo-stats">' +
        '       <span style="margin-right: 15px">' +
        '           <i class="fa fa-eye"></i> {{videoViewCount}}' +
        '       </span>' +
        '       <span style="margin-right: 15px">' +
        '           <i class="fa fa-thumbs-up"></i> {{videoLikeCount}}' +
        '       </span>' +
        '   </p>' +
        '</div>';

    var videoComponents = [];
    for (var i = 0; i < selectedContent.length; i++) {
        var eachVideo = selectedContent[i];
        var renderedComponent = videoComponentTemplate
            .replace('{{index}}', i + 1)
            .replace('{{channelUrl}}', eachVideo.youTubeChannel.url)
            .replace('{{channelTitle}}', eachVideo.youTubeChannel.title)
            .replace('{{videoUrl}}', eachVideo.url)
            .replace('{{videoTitle}}', eachVideo.title)
            .replace('{{videoEmbedUrl}}', eachVideo.embedUrl)
            .replace('{{videoViewCount}}', eachVideo.viewCount)
            .replace('{{videoLikeCount}}', eachVideo.likeCount);

        videoComponents.push(renderedComponent);
    }

    var $footer = $('div.card div.content').find('.footer');
    var rowTemplate = '<div class="row listing-row"></div>';
    var $row;
    for (var i = 0; i < videoComponents.length; i++) {
        if (i % 2 == 0) {
            $row = $(rowTemplate);
        }
        $row.append($(videoComponents[i]));
        $footer.before($row);
    }
}