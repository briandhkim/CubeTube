$(document).ready(function(){
	
	/**
		function for preventing page refresh with search button; 
		only did it because page refresh was annoying
	 **/
	$('#mainNav-option form button, #midNav-option form button').click(function(event){
		event.preventDefault();
	});

	/*** button target for opening theater mode ***/
	$('.lightBoxMode').click(function(){
		$('#lightBoxModal').modal('show');
	});
	/*** ***/
	$('[data-toggle="tooltip"]').tooltip();	//needed for tooltip
	// $('[data-toggle="popover"]').popover();
	// $('.videoStats').click(function(){
	// 	$('.videoStats').popover('toggle');
	// });
	// $('#videoStats').popover('hover focus');

	//Click handler to console log search results
	function clickHandler() {
		console.log('Search button was clicked');
		$(".btn-danger").on('click', searchChannelsByName);
    }

    //Channel Search by Name
    function searchChannelsByName() {
        string = $('#channelSearchInput').val();
        $.ajax({
            url: 'https://www.googleapis.com/youtube/v3/search',
            dataType: 'json',
            method: 'get',
            data: {
                key: "AIzaSyAOr3VvEDRdI5u9KGTrsJ7usMsG5FWcl6s",
                q: string,
                type: 'channel',
                part: 'snippet',
                maxResults: 10
            },
            success: function (data) {
                console.log('Youtube success',data);
            },
            error: function (data) {
                console.log('something went wrong with YT', data);
            }
        })
    }
});
