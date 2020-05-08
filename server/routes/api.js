/*
Author: Anas Nasrallah.
Purpose: practicing servers.
Date: 04.05.20
*/

const express = require('express')
const urllib = require('urllib')
const router = express.Router()

const teamToIDs = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756"
}
class Player {
    constructor(name, jersey, position) {
        this.name = name;
        this.jersey = jersey;
        this.position = position;
    }
}

const dreamTeam = [];

const NBAurl = 'http://data.nba.net/10s/prod/v1/2016/players.json';

let data = null
urllib.request(NBAurl, function (err, response) {
    data = JSON.parse(response.toString())
})

router.get('/teams/:teamName', function (request, response) {
    const inputTeam = request.params.teamName
    const teamId = teamToIDs[inputTeam]
    const players = data.league.standard.filter(player => player.draft.teamId == teamId)
    response.send(players)
})

router.put('/team', function (request, response) {
    const teamName = request.body['teamName']
    const teamId = request.body['teamId']
    teamToIDs[teamName] = teamId
    response.end()
})

router.get('/dreamTeam', function (request, response) {
    response.send(dreamTeam)
})

router.post('/roster', function (request, response) {

    if (dreamTeam.length < 5) {
        const name = request.body['name'];
        const jersey = request.body['jersey'];
        const position = request.body['position'];

        const player = data.league.standard.
            filter(player => (player['firstName'] === name &&
                player['jersey'] == jersey &&
                player['pos'] === position))
        const playerToAdd = new Player(
            `${player[0]["firstName"]} ${player[0]["lastName"]}`,
            player[0]['jersey'],
            player[0]['pos'])

        dreamTeam.push(playerToAdd)
    }
    response.end()
})

module.exports = router