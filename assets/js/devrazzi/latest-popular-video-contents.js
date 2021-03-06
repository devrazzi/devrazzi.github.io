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
                name: "Vimeo",
                icon: "fa fa-vimeo",
                value: "vimeo",
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
                active: false,
                available: true
            },
            {
                name: "Monthly",
                icon: "fa fa-calendar",
                value: "monthly",
                active: true,
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
    // Update content title by new filter
    var sourceFilter = JSON.search(window.menu, '//*[name="source"]/options[active="true"]/name')[0];
    var periodFilter = JSON.search(window.menu, '//*[name="period"]/options[active="true"]/name')[0];
    devrazzi.updateContentMetaData(sourceFilter, periodFilter, 'Most Popular', 'Videos for Developers');

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
        '       <a href="{{videoUrl}}" target="_blank">' +
        '           <img class="img-thumbnail" src="{{videoImageUrl}}" alt="{{videoTitle}}">' +
        '       </a>' +
        '   </p>' +
        '   <p class="github-repo-stats">' +
        '       <span style="margin-right: 15px">' +
        '           <i class="fa fa-eye"></i> {{videoViewCount}}' +
        '       </span>' +
        '       <span style="margin-right: 15px">' +
        '           <i class="fa fa-thumbs-up"></i> {{videoLikeCount}}' +
        '       </span>' +
        '       <span style="margin-right: 15px">' +
        '           {{publishedAt}}' +
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
            .replace('{{videoUrl}}', eachVideo.url)
            .replace('{{videoTitle}}', eachVideo.title)
            .replace('{{videoTitle}}', eachVideo.title)
            .replace('{{videoImageUrl}}', eachVideo.thumbnailImageUrl)
            .replace('{{videoEmbedUrl}}', eachVideo.embedUrl)
            .replace('{{videoViewCount}}', eachVideo.viewCount)
            .replace('{{videoLikeCount}}', eachVideo.likeCount)
            .replace('{{publishedAt}}', moment(eachVideo.publishedAt).fromNow());

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