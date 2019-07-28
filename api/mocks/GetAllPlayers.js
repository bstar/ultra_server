'use strict';

function GetAllPlayers(req, res, next) {
  res.json([
    { id: 1,
      name: 'Bob',
      nation: 'USA',
      position: 'LW',
      age: 40,
      speed: 18,
      strength: 8,
      shot: 18,
      createdAt: "2017-05-16T07:23:24.904Z",
      updatedAt: "2017-05-17T02:23:10.068Z" },
      { id: 2,
        name: 'Gab',
        nation: 'Quebec',
        position: 'C',
        age: 29,
        speed: 10,
        strength: 15,
        shot: 12,
        createdAt: "2017-05-16T07:23:24.904Z",
        updatedAt: "2017-05-17T02:23:10.068Z" }
  ])
}

module.exports = {
  GetAllPlayers : GetAllPlayers
}
