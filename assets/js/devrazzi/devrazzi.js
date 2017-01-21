devrazzi = {

    contents: {},

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
    },

    createMenu: function (menu) {
        var menuItemTemplate =
            '<li class="dropdown" data-option-item="{{menuItemName}}">' +
            '    <a href="#" class="dropdown-toggle" data-toggle="dropdown">' +
            '        <i class="{{activeOptionIcon}}"></i>' +
            '        <p>{{activeOptionName}}</p>' +
            '        <b class="caret"></b>' +
            '    </a>' +
            '    <ul class="dropdown-menu">' +
            '       {{options}}' +
            '    </ul>' +
            '</li>';

        var optionTemplate =
            '<li>' +
            '   <a href="#" class="{{optionClass}}" data-option-value="{{optionValue}}">' +
            '      <i class="{{optionIcon}}"></i> {{optionName}}' +
            '   </a>' +
            '</li>';

        var renderedMenuItems = "";
        for (var menuItemIndex = 0; menuItemIndex < menu.length; menuItemIndex++) {
            var menuItem = menu[menuItemIndex];
            var renderedOptions = "";
            for (var optionIndex = 0; optionIndex < menuItem.options.length; optionIndex++) {
                var option = menuItem.options[optionIndex];
                if (!option.active) {
                    renderedOptions += optionTemplate
                        .replace("{{optionClass}}", option.available ? '' : 'coming-soon')
                        .replace("{{optionValue}}", option.value)
                        .replace("{{optionIcon}}", option.icon)
                        .replace("{{optionName}}", option.name);
                }
            }

            var activeOption = JSON.search(menuItem.options, '//*[active="true"]')[0];

            renderedMenuItems += menuItemTemplate
                .replace("{{menuItemName}}", menuItem.name)
                .replace("{{activeOptionIcon}}", activeOption.icon)
                .replace("{{activeOptionName}}", activeOption.name)
                .replace("{{options}}", renderedOptions);
        }

        $.each($('ul.nav.navbar-nav'), function (i, $each) {
            $($each).html(renderedMenuItems + $each.innerHTML);
        });
    },

    getSelectedContentByFilteringMenu: function (menu) {
        var selectedOptions = JSON.search(menu, '//*[active="true"]').map(function (each) {
            return each.value
        });

        var selectedContent = devrazzi.contents;
        $.each(selectedOptions, function (i, each) {
            selectedContent = selectedContent[each];
        });

        return selectedContent;
    }

};

$(document).ready(function () {

    if ($('.off-canvas-sidebar .sidebar-wrapper ul li').first().hasClass('divider')) {
        $('.sidebar-wrapper .logo').css('border-bottom', '0');
    }

    $('body').on('click', '.coming-soon', function (e) {
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