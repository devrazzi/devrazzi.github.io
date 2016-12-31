$(document).ready(function () {

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
    for (var i = 0; i < devrazzi.gitHubDailyTrendingRepositories.length; i++) {
        var eachRepository = devrazzi.gitHubDailyTrendingRepositories[i];
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
    var rowTemplate = '<div class="row"></div>';
    var $row;
    for (var i = 0; i < repositoryComponents.length; i++) {
        if (i % 2 == 0) {
            $row = $(rowTemplate);
        }
        $row.append($(repositoryComponents[i]));
        $footer.before($row);
    }

});