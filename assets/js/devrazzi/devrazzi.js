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

    createMenu: function (menu, callbackAfterFilterChanged) {
        // First, remove old menu items
        $('.menu-option').parents('li.dropdown').remove();

        var menuItemTemplate =
            '<li class="dropdown" data-option-item="{{menuItemName}}">' +
            '    <a href="#" class="dropdown-toggle" data-toggle="dropdown">' +
            '        <i class="{{activeOptionIcon}}"></i>' +
            '        <p>{{activeOptionName}}</p>' +
            '        <b class="caret"></b>' +
            '    </a>' +
            '    <ul class="dropdown-menu">' +
            '        {{options}}' +
            '    </ul>' +
            '</li>';

        var optionTemplate =
            '<li>' +
            '    <a href="#" class="{{optionClass}}" data-option-value="{{optionValue}}">' +
            '        <i class="{{optionIcon}}"></i> {{optionName}}' +
            '    </a>' +
            '</li>';

        var renderedMenuItems = "";
        for (var menuItemIndex = 0; menuItemIndex < menu.length; menuItemIndex++) {
            var menuItem = menu[menuItemIndex];
            var renderedOptions = "";
            for (var optionIndex = 0; optionIndex < menuItem.options.length; optionIndex++) {
                var option = menuItem.options[optionIndex];
                if (!option.active) {
                    renderedOptions += optionTemplate
                        .replace("{{optionClass}}", option.available ? 'menu-option' : 'menu-option coming-soon')
                        .replace("{{optionValue}}", option.value)
                        .replace("{{optionIcon}}", option.icon)
                        .replace("{{optionName}}", option.available ? option.name : '<del>' + option.name + '</del>');
                }
            }

            var activeOption = JSON.search(menuItem.options, '//*[active="true"]')[0];

            renderedMenuItems += menuItemTemplate
                .replace("{{menuItemName}}", menuItem.name)
                .replace("{{activeOptionIcon}}", activeOption.icon)
                .replace("{{activeOptionName}}", activeOption.name)
                .replace("{{options}}", renderedOptions);
        }

        var $navbars = $('ul.nav.navbar-nav');
        $.each($navbars, function (i, $each) {
            $($each).html(renderedMenuItems + $each.innerHTML);
        });

        $navbars.find('.menu-option').click(function (e) {
            var $that = $(this);
            if ($that.hasClass('coming-soon')) {
                return;
            }

            e.preventDefault();

            // Update menu selection
            var selectedMenuItem = $that.parents('li.dropdown').data('option-item');
            var selectedOption = $that.data('option-value');
            var menuItem = JSON.search(window.menu, '//*[name="' + selectedMenuItem + '"]')[0];
            $.each(menuItem.options, function (i, eachOption) {
                eachOption.active = eachOption.value == selectedOption;
            });

            // Re-create the menu
            devrazzi.createMenu(window.menu, callbackAfterFilterChanged);

            // Refresh content by new filter
            callbackAfterFilterChanged && callbackAfterFilterChanged();
        });
    },

    getSelectedContentByFilteringMenu: function (menu) {
        var selectedOptions = JSON.search(menu, '//*[active="true"]').map(function (each) {
            return each.value
        });

        console.log("Filtering by: " + selectedOptions);

        var selectedContent = devrazzi.contents;
        $.each(selectedOptions, function (i, each) {
            selectedContent = selectedContent[each];
        });

        return selectedContent;
    },

    updateContentTitle: function (sourceFilter, periodFilter, sortingFilter, contentTypeFilter) {
        $('div.card p.category').text(sourceFilter);
        $('div.card h4.title').text(periodFilter + ' ' + sortingFilter + ' ' + contentTypeFilter);
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