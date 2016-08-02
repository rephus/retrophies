/*
Retrophies, based on Ben Firshman' JSNES
Copyright (C) 2016 Javier Rengel

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
JSNES.achievements = function(nes) {
  this.nes = nes;
};

JSNES.achievements.prototype = {

  JSON_PROPERTIES: [
    'list'
  ],
  // Achievements as a list of values (easier/short to define than a JSON object)
  list: [
    //[Memory (0), Value (1) , Title (2), Description (3), Img (4), Triggered (5)]
    [0x0770, 1, "Enjoy Retrophies", "Play Super Mario Bros", "mario", false],
    [0x0748, 10, "Gold mine", "Collect 10 coins", "coin", false],
    [0x075A, 7, "More lives than a cat", "Get 8 lives", "1up", false],
    [0x0748, 64, "Buy yourself a life", "Get your first life by coins", "1up", false],
    [0x079f, 23, "Starman", "Collect a star", "star", false],
    [0x0756, 2, "Fire flower power", "Collect a fire flower", "flower", false],
    [0x0756, 1, "Is this legal?", "Pick a mushroom", "mushroom", false],
    [0x000E, 4, "Level end", "Finish a level", "flower", false],
    [0x07DF, 1, "High score", "Collect more than 10000 points", "coin", false],
    [0x07DE, 1, "Huge score", "Collect more than 100000 points", "coin", false],
    [0x000e, 1, "Magic beans", "Climb a vine", "vine", false],
    [0x000e, 3, "Plumber work", "Go down on a pipe", "pipe", false],
    [0x0704, 1, "Under the sea", "Go swimming", "fish", false],
    //[0x000e, 6, "Game over", "Lose all your lives", "1up", false], //triggered  multiple times
    [0x07C4, 8, "Hurry up", "Less than 99 seconds remaining", "mario", false],
    [0x0753, 1, "Green Mario", "Play as Luigi", "luigi", false],
    [0x0770, 2, "Sorry mario", "But your princess in in another castle", "toad", false],
    [0x075F, 1, "1 down, 7 to go", "Reach world 2", "axe", false],
    [0x075F, 2, "Nightlife", "Reach world 3", "axe", false],
    [0x075F, 3, "Half way through", "Reach world 4", "axe", false],
    [0x075F, 4, "High five", "Reach world 5", "axe", false],
    [0x075F, 5, "One third remaining", "Reach world 6", "axe", false],
    [0x075F, 6, "Almost there", "Reach world 7", "axe", false],
    [0x075F, 7, "Last one", "Reach world 8", "axe", false],
    [0x075F, 35, "Going down", "Find the minus world", "axe", false]
  ],
  //TODO store and provide list of achievements per game (this is exclusive to Mario)

  start: function(){
    var self = this;

    console.log("Starting achievements...");
    //Delayed start to avoid empty memory on startup
    setTimeout(function(){
      console.log("Scanning achievements...");

      setInterval(function(){
          self.memoryCheck();
      }, 100);
    }, 5000);
  },

  memoryCheck: function(){
    var debug = false;
    for (var i in this.list) {
      var a = this.list[i];
      if (this.nes.cpu.mem[0x0770] > 0){ // 0 is demo mode
        var memoryValue = this.nes.cpu.mem[a[0]];
        if (debug) console.log("Checking achievement "+ a[2]+ ": "+memoryValue);
        if (memoryValue == a[1] && !a[5]) {
            this.list[i][5] = true;
            this.triggerAchievement(a);
        }
      }
    }
  },

  triggerAchievement: function(achievement){

    console.log("Got achievement "+ achievement[2]);
    nes.ui.achievementPopup(achievement);
  },

  toJSON: function() {
      return JSNES.Utils.toJSON(this);
  },

  fromJSON: function(s) {
      JSNES.Utils.fromJSON(this, s);
  }
};

console.log("Loading achievement prototype");
