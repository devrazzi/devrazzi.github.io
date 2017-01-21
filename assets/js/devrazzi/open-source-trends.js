var menu = [
    {
        name: "source",
        options: [
            {
                name: "GitHub",
                icon: "fa fa-github",
                value: "gitHub",
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
                name: "GitLab",
                icon: "fa fa-gitlab",
                value: "gitLab",
                active: false,
                available: false
            }
        ]
    },
    {
        name: "sorting",
        options: [
            {
                name: "Trending",
                icon: "fa fa-rocket",
                value: "trending",
                active: true,
                available: true
            },
            {
                name: "Most Popular",
                icon: "fa fa-star",
                value: "mostPopular",
                active: false,
                available: false
            }
        ]
    },
    {
        name: "contentType",
        options: [
            {
                name: "Repositories",
                icon: "fa fa-archive",
                value: "repositories",
                active: true,
                available: true
            },
            {
                name: "Developers",
                icon: "fa fa-user-circle-o",
                value: "developers",
                active: false,
                available: false
            }
        ]
    },
    {
        name: "period",
        options: [
            {
                name: "Weekly",
                icon: "fa fa-calendar",
                value: "weekly",
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
                name: "Monthly",
                icon: "fa fa-calendar",
                value: "monthly",
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
    var sortingFilter = JSON.search(window.menu, '//*[name="sorting"]/options[active="true"]/name')[0];
    var contentTypeFilter = JSON.search(window.menu, '//*[name="contentType"]/options[active="true"]/name')[0];
    devrazzi.updateContentTitle(sourceFilter, periodFilter, sortingFilter, contentTypeFilter);

    // First, remove old contents
    $('div.card div.content div.row.listing-row').remove();

    var selectedContent = devrazzi.getSelectedContentByFilteringMenu(menu);

    var repositoryComponentTemplate =
        '<div class="col-lg-6 col-sm-12 repo-listing-item">' +
        '    <p class="github-repo-name">' +
        '        <span class="place">#{{index}}</span>' +
        '        <a href="{{developerUrl}}" target="_blank">{{developerName}}</a>' +
        '        <span> / </span>' +
        '        <a href="{{repoUrl}}" target="_blank">' +
        '            <b>{{repoName}}</b>' +
        '        </a>' +
        '    </p>' +
        '    <p class="github-repo-desc">{{description}}</p>' +
        '    <p class="github-repo-stats">' +
        '        {{programmingLanguage}}' +
        '        <span style="margin-right: 15px">' +
        '            <i class="fa fa-star"></i> {{totalStars}} stars total' +
        '        </span>' +
        '        <span>' +
        '            <i class="fa fa-star"></i> {{newStars}} stars {{period}}' +
        '        </span>' +
        '    </p>' +
        '</div>';

    var repositoryComponents = [];
    for (var i = 0; i < selectedContent.length; i++) {
        var eachRepository = selectedContent[i];
        var renderedComponent = repositoryComponentTemplate
            .replace('{{index}}', i + 1)
            .replace('{{developerUrl}}', eachRepository.developerUrl)
            .replace('{{developerName}}', eachRepository.developer)
            .replace('{{repoUrl}}', eachRepository.repositoryUrl)
            .replace('{{repoName}}', eachRepository.name)
            .replace('{{description}}', eachRepository.description || "")
            .replace('{{programmingLanguage}}', eachRepository.programmingLanguage ? ('<span style="margin-right: 15px">' + eachRepository.programmingLanguage + '</span>') : "")
            .replace('{{totalStars}}', eachRepository.totalStars)
            .replace('{{newStars}}', eachRepository.newStarsInPeriod)
            .replace('{{period}}', 'today');

        repositoryComponents.push(renderedComponent);
    }

    var $footer = $('div.card div.content').find('.footer');
    var rowTemplate = '<div class="row listing-row"></div>';
    var $row;
    for (var i = 0; i < repositoryComponents.length; i++) {
        if (i % 2 == 0) {
            $row = $(rowTemplate);
        }
        $row.append($(repositoryComponents[i]));
        $footer.before($row);
    }
}