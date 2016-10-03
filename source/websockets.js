var ws;
var user = {}, sector;
var interval;
var DEBUG = false;

function connect() {
   if ("WebSocket" in window) {
      log("Opening websocket!");
      ws = new WebSocket("ws://localhost:8001/");

      ws.onopen = function(){
         //ws.send("ping");
         log("Connection opened !!");

         interval= setInterval(function(){

           // TODO Update with values from memory

           user.position = [0,0];
           user.level  =  [0,0];

           sendJson({
             type: 'update',
             user: user,
           });
         }, 100);
      };

      ws.onmessage = function (evt){
        log("Message received: " + evt.data);
        try {
           var json = JSON.parse(evt.data);
           switch(json.type) {
             case 'connection':
                 user.id = json.id;
                 break;
             case 'update':
                 sector = json.sector;
                 break;
             default: log("Message not recognized " + evt.data);
           }
         } catch (e){
           log("Unable to parse evt  "+evt.data+ ": "+ e);
         }
      };

      ws.onclose = function() {
         log("Connection is closed.");

        clearInterval(interval);
         setTimeout(function(){
           connect();
         }, 1000);
      };
   } else log("WebSocket NOT supported by your Browser!");
}


function log(text){
  if (DEBUG) console.log(text);
  //$("#log").append(text+"\n");
}
function sendJson(json){
  //json.connection = connectionId;
  //console.log("Sending",json);
  ws.send(JSON.stringify(json));
}

connect();
