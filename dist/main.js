/*
Author: Anas Nasrallah.
Purpose: practicing servers.
Date: 04.05.20
*/

/*
To Ask Danny before Submitting:
 - to get the object when click
 - to import/export classes
*/

class Player {
    constructor(name, jersey, position) {
        this.name = name;
        this.jersey = jersey;
        this.position = position;
    }
}

const renderPlayers = function (players, container, temp, isDreamTeam) {
    const source = $(temp).html();
    const template = Handlebars.compile(source)
    let playerHTML = template({ players, isDreamTeam })
    $(container).empty().append(playerHTML)
}


$('#btnSearch').on('click', function () {
    const input = $('#input').val()
    $.get(`/teams/${input}`, function (players) {
        renderPlayers(players.map(player => new Player(
            `${player.firstName} ${player.lastName}`,
            player.jersey,
            player.pos)
        ), "#players", "#players-temp", false)
    })
})

$('#dreamTeamBtn').on('click', function(){
    dreamTeamPromise = $.get('/dreamTeam')
    dreamTeamPromise.then(function(dreamTeam){
        renderPlayers(dreamTeam, "#dreamTeam", "#players-temp", true)
    })
})

$('body').on('click', '.player', function(){
    
    const name = $(this).data().name;
    const jersey = $(this).data().jersey;
    const position = $(this).data().position;
    $.post('/roster', {name, jersey, position})
})