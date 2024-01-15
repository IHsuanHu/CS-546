/* 
All of the functionality will be done in this client-side JS file.  
You will make client - side AJAX requests to the API and use jQuery to target and create elements on the page.
*/
(function ($) {
    let requestConfig = { method: "GET", url:"https://api.tvmaze.com/shows"}
    let search = $('#show_search_term'),
    twShowList = $('#tvShowList'), 
    showDetails = $('#showDetails'),
    errorbar = $('#404'),
    rootLink = $('#rootLink');
    
    $.ajax(requestConfig).then(function (responseMessage) {
        rootLink.hide()
        errorbar.hide()
        twShowList.show()
        for (let i of responseMessage) {
            let name = i.name
            let li = $('<a class="tv" href=' + i._links.self.href+'><li>'+ name +'</li></a>')
            twShowList.append(li)}
        $('a.tv').on('click', function (event) {
            event.preventDefault()
            twShowList.hide()
            showDetails.empty()
            let url = $(this).attr('href')
            linkClick(url)
            showDetails.show()
            rootLink.show()
        })
    })
    
    function linkClick(link) {
        let requestConfigClick = { method: "GET", url:link}
        $.ajax(requestConfigClick).then(function (responseMessage) {
            if (!responseMessage.name || responseMessage.name.trim() == '') { responseMessage.name = 'N/A'}
            if (!responseMessage.image || !responseMessage.image.medium) {
                responseMessage.image = {medium:'/public/no_image.jpeg'}}
            if (!responseMessage.language || responseMessage.language.trim() == '') {responseMessage.language = 'N/A'}
            if (!responseMessage.genres.length === 0) {responseMessage.genres = ['N/A']}
            if (!responseMessage.rating || !responseMessage.rating.average) {
                responseMessage.rating = {average:'N/A'}}
            if (!responseMessage.network || !responseMessage.network.name || responseMessage.network.name.trim() == '' ) {
                responseMessage.network = {name:'N/A'}}
            if (!responseMessage.summary || responseMessage.summary.trim() == '') {responseMessage.summary = 'N/A'}
            $('#showDetails').append(`<h1> ${responseMessage.name} </h1>
                    <img src="${responseMessage.image.medium}">
                    <dl>
                    <dt>Language</dt>
                    <dd>${responseMessage.language}</dd>
                    <dt>Genres</dt>
                    <ul>${responseMessage.genres.map((i) => `<li>${i}</li>`).join('')}</ul>
                    <dt>Average Rating</dt>
                    <dd>${responseMessage.rating.average}</dd>
                    <dt>Network</dt>
                    <dd>${responseMessage.network.name}</dd>
                    <dt>Summary</dt>
                    <dd>${responseMessage.summary}</dd>
                    </dl> ` )
        })}

    $('#searchShows').submit(function (event) {
        event.preventDefault()
        errorbar.hide()
        showDetails.empty()
        showDetails.hide()
        if (search.val().trim() == ''){ 
            alert('Empty input')
            search.val('')}
        else {
            let requestConfigSearch = {method:"GET", 
            url:"http://api.tvmaze.com/search/shows?q=" + search.val()}

            $.ajax(requestConfigSearch).then(function (responseMessage) {
                rootLink.show()
                twShowList.empty()
                twShowList.show()
                if (responseMessage.length == 0) {
                    errorbar.show()
                }
                else {
                    for (let i of responseMessage) {
                        let name = i.show.name
                        let li = $('<a class="tv" href=' + i.show._links.self.href+'><li>'+ name +'</li></a>')
                        twShowList.append(li)
                    }
                    $('a.tv').on('click', function (event) {
                        event.preventDefault()
                        twShowList.hide()
                        showDetails.empty()
                        let url = $(this).attr('href')
                        linkClick(url)
                        showDetails.show()
                        rootLink.show() 
            })}})}
    })
})(window.jQuery)