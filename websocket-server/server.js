
var ws = require("nodejs-websocket");

global.redis = require('redis').createClient();

var SECTOR_SIZE = 100;

var clients = {};
var sectors = {
  "0,0": { id: "0,0", users:[]}
};

var server = ws.createServer(function (conn) {

  var connectionId = conn.key;

    console.log("New connection: " +connectionId);
    sendJson(conn, {type: 'connection', id: connectionId});

    clients[connectionId] = {
      id: connectionId,
      created: new Date().getTime(),
      connection: conn,
      user: {
        id: connectionId,
        position: [50,50],
        level: [0,0]
      },
      status: 'connected'
    };

    conn.on("text", function (str) {
        //console.log("Received from "+connectionId+ ": "+str);

        try {
          var json = JSON.parse(str);
          processJson(conn, json);
        } catch(e){
          console.error("Unable to parse json "+ str);
        }
    });

    conn.on("close", function (code, reason) {
        console.log("Connection closed ", connectionId);

        //delete clients[connectionId];
        clients[connectionId].status = 'disconnected';
        //clearInterval(interval);
    });

}).listen(8001);

var getOrCreateSector = function(level) {
  var index = level[0] +","+level[1];
  if (sectors[index]) {
     return sectors[index];
  } else {
     return createSector(pos);
  }
};

var createSector = function(level){
  var index = level[0] +","+ level[1];
  sectors[index] = {
    id: index,
    users:[]
  };
  return sectors[index];
};

//Send messages to all connected clients at the same time every 5 seconds
var interval = setInterval(function(){
  var clientIds = Object.keys(clients);

  //console.log("Sending data to clients: "+ clientIds);
  for (var c in clientIds ){
    var client = clients[clientIds[c]];
    if (client && client.connection && client.status == "connected") {
      var conn = client.connection;
      var sector = getOrCreateSector(client.user.level);
      sendJson(conn, {type: 'update', user: client.user, sector: sector});
    }
  }
},100);

console.log("Websocket server started");

var processJson = function(connection, json) {
  var connectionId = connection.key;
  var type = json.type;
  switch(type){
   case 'update':
      oldLevel = getOrCreateSector(clients[connectionId].user.level);
      newLevel = getOrCreateSector(json.user.level);

      clients[connectionId].user = json.user;

      //Update sector with user info

      // Remove user from old sector
      for(var i = 0; i< oldLevel.users.length; i++){
          if(oldLevel.users[i].id == connectionId){
              oldLevel.users.splice(i,1);
          }
      }
      // Add user to new sector
      newLevel.users.push(json.user);
      break;
    default:
        console.error("Json type not recognized: "+type);
  }
};

var sendJson = function(conn, json){
  conn.sendText(JSON.stringify(json));
};
