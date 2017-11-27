function renderChannelSelectionDropdown() {
    $(".dropdownChannelLi").remove();
    //ALSO REMOVE CATEGORY LIS

    //sort by name
    clientSubscribedChannelObjects.sort(function (a, b) {
        if (a.channel_title.toLowerCase() < b.channel_title.toLowerCase()) {
            return -1
        }
        if (a.channel_title.toLowerCase() > b.channel_title.toLowerCase()) {
            return 1
        }
    });


    var clientSubsClone = deepCopy(clientSubscribedChannelObjects);
    var categories = [];
    for (var cat in clientCategories){
        if(categories.indexOf(cat) === -1) {
            categories.push(cat)
        }
    }

    categories.sort(function (a, b) {
        if (a.toLowerCase() < b.toLowerCase()) {
            return -1
        }
        if (a.toLowerCase() > b.toLowerCase()) {
            return 1
        }
    });

    for(var cat = 0; cat <= categories.length; cat++){
        //Category Label
        if(cat === categories.length && clientSubsClone.length){
            //uncategorized label
            let unCatLi = $('<li>', {
                'class': 'dropdownChannelLi row'
            });
            const icon = $("<i>").addClass("fa fa-cubes").attr("aria-hidden", true);

            // let unCatLiMain = $('<div>', {
            //     class: 'channelLiChannel col-xs-10'
            // }).css({
            //     padding: '0',
            //     'overflow': 'hidden',
            //     'text-overflow': 'ellipsis',
            //     'white-space': 'nowrap',
            //     'line-height': '200%'
            // }).text("uncategorized");
            unCatLi.append(icon).text("uncategorized");
            $('#dropdownChannelUl').append(unCatLi);
        }
        else{
            let catLi = $('<li>', {
                'class': 'dropdownChannelLi row'
            });
            const icon = $("<i>").addClass("fa fa-cubes").attr("aria-hidden", true);

            // let catLiMain = $('<div>', {
            //     class: 'channelLiChannel col-xs-10'
            // }).css({
            //     padding: '0',
            //     'overflow': 'hidden',
            //     'text-overflow': 'ellipsis',
            //     'white-space': 'nowrap',
            //     'line-height': '200%'
            // }).text(categories[cat]);
            catLi.append(icon).text(categories[cat]);
            $('#dropdownChannelUl').append(catLi);
        }
        for (var i = 0; i < clientSubsClone.length; i++) {
            if(cat === categories.length || clientCategories[categories[cat]].indexOf(clientSubsClone[i].youtube_channel_id) !== -1){
                let channelLi = $('<li>', {
                    'class': 'dropdownChannelLi row'
                });
                //let channelSettings = $("<div style='display: inline-block'><a class='btn hidden-xs' role='button' data-trigger='focus' data-container='body' data-toggle='popover'><i class='fa fa-cog fa-lg'></i></a></div>")
                const cog = $('<i>', {
                    class: 'fa fa-cog'
                });
                // var settingsContent = $('<div channelId='+clientSubsClone[i].youtube_channel_id+'>');
                var settingsContent = $('<div>', {
                    'channelId': clientSubsClone[i].youtube_channel_id
                });

                var browseButton = $('<button class="btn-primary btn-block">Browse</button>').css("display", "block");
                var removeButton = $('<button class="btn-danger btn-block">Unsubscribe</button>').css("display", "block").css("margin-top", "5px");
                var changeCategoryButton = $('<button class="btn-success btn-block">Change Category</button>').css("display", "block").css("margin-top", "5px");

                browseButton.on("click touchend", handleBrowseButton);
                removeButton.on("click touchend", handleRemoveButton);
                changeCategoryButton.on("click touchend", handleChangeCategory);

                settingsContent.append(browseButton, removeButton, changeCategoryButton);

                let channelSettingsButton = $('<a>').attr({
                    'role': 'button',
                    'class': 'dropdownSettingsPopover'
                }).css({
                    padding: '0',
                    'line-height': '180%'
                }).popover({
                    html: true,
                    'content': settingsContent,
                    'placement': 'left',
                    'container': 'body',
                    'toggle': 'focus'
                }).append(cog);

                const channelSettingsSpan = $('<div>', {
                    class: 'channelSettingButton col-xs-2 text-center'
                }).css({
                    padding: '0'
                }).append(channelSettingsButton);

                let channelCheckbox = $('<input>').attr({
                    'type': 'checkbox',
                    'name': clientSubsClone[i].channel_title,
                    'channel_id': clientSubsClone[i].youtube_channel_id,
                    'class': 'dropdownChannel'
                });
                //check if channel is selected
                if (clientSelectedChannelIds.indexOf(clientSubsClone[i].youtube_channel_id) !== -1) {
                    channelCheckbox.attr("checked", "checked")
                }
                let channelLiMain = $('<div>', {
                    class: 'channelLiChannel col-xs-10'
                }).css({
                    padding: '0',
                    'overflow': 'hidden',
                    'text-overflow': 'ellipsis',
                    'white-space': 'nowrap',
                    'line-height': '200%'
                }).text(clientSubsClone[i].channel_title);
                channelLiMain.prepend(channelCheckbox);
                // let channelText = $('<span style="display: inline-block" style="margin-left: 5px">').text(clientSubsClone[i].channel_title);

                channelLi.append(channelLiMain, channelSettingsSpan);
                $('#channelCategoryUl').append(channelLi);
                channelLi.append(channelSettingsSpan, channelLiMain);

                // $('#channelCategoryUl').append(channelLi)
                $('#dropdownChannelUl').append(channelLi);

                clientSubsClone.splice(i, 1)
            }
        }
    }
}

function compileSelectedChannelsFromDropdown() {
    var selectedInputs = $(".dropdownChannel:checked")
    clientSelectedChannelIds = [];
    for (var i = 0; i < selectedInputs.length; i++) {
        clientSelectedChannelIds.push($(selectedInputs[i]).attr("channel_id"))
    }
    clientSelectedChannelObjects = [];
    for (var i = 0; i < clientSubscribedChannelObjects.length; i++) {
        if (clientSelectedChannelIds.indexOf(clientSubscribedChannelObjects[i].youtube_channel_id) !== -1) {
            clientSelectedChannelObjects.push(clientSubscribedChannelObjects[i])
        }
    }
}
