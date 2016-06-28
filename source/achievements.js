JSNES.achievements = function(nes) {
  this.nes = nes;
  this.start();
};

JSNES.achievements.prototype = {
  start: function(){
    var self = this;

    //Delayed start to avoid empty memory on startup
    setTimeout(function(){
      setInterval(function(){
          self.memoryCheck();
      }, 100);
    }, 1000);
  },

  memoryCheck: function(){
    var debug = false;
    for (var i in achievements) {
      var a = achievements[i];
      var memoryValue = this.nes.cpu.mem[a[0]];
      if (debug) console.log("Checking achievement "+ a[2]+ ": "+memoryValue);
      if (memoryValue == a[1] && !a[5]) {
          achievements[i][5] = true;
          this.triggerAchievement(a);
      }
    }
  },

  triggerAchievement: function(achievement){
    console.log("Got achievement "+ achievement[2]);
  //alert("Got achievement "+achievement[2] + "\n" + achievement[3]);
    nes.ui.achievementPopup(achievement);
  }
};

console.log("Loading achievement prototype");

// Achievements ae a list of values (easier/short to define than a JSON object)
var achievements = [
  //[Memory (0), Value (1) , Title (2), Description (3), Img (4), Triggered (5)]
  [0x0748, 3, "Gold mine", "Collect 3 coins", "coin", false],
  [0x075A, 7, "More lives than a cat", "Get 8 lives", "1up", false],
  [0x0748, 64, "Buy yourself a life", "Get your first life by coins", "1up", false],
  [0x079f, 23, "Starman", "Collect a star", "star", false],
  [0x0756, 2, "Fire flower power", "Collect a fire flower", "flower", false],
  [0x07DF, 1, "High score", "Collect more than 10000 points", "coin", false],
  [0x07DE, 1, "Huge score", "Collect more than 100000 points", "coin", false],
  [0x000e, 1, "Magic beans", "Climb a vine", "vine", false],
  [0x000e, 3, "Plumber work", "Go down on a pipe", "pipe", false],
//  [0x074E, 0, "Under the sea", "Go swimming", "fish", false], //Conflict with demo mode
//  [0x000e, 6, "Game over", "Lose all your lives", "1up", false], //Conflict with demo mode
  [0x07F8, 0, "Hurry up", "Less than 99 seconds remaining", "mario", false],
  [0x0753, 1, "Green Mario", "Play as Luigi", "luigi", false],
  [0x0770, 2, "Sorry mario", "But your princess in in another castle", "toad", false],
  [0x075F, 1, "1 down, 7 to go", "Reach world 2", "axe", false],
  [0x075F, 2, "Nightlife", "Reach world 3", "axe", false],
  [0x075F, 3, "Half way through", "Reach world 4", "axe", false],
  [0x075F, 4, "High five", "Reach world 5", "axe", false],
  [0x075F, 5, "One third remaining", "Reach world 6", "axe", false],
  [0x075F, 6, "Almost there", "Reach world 7", "axe", false],
  [0x075F, 7, "Last one", "Reach world 8", "axe", false]

];
//TODO store and provide list of achievements per game (this is exclusive to Mario)
