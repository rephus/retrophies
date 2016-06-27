JSNES.achievements = function(nes) {
  this.nes = nes;
  this.start();
};

JSNES.achievements.prototype = {
  start: function(){
    var self = this;

    setInterval(function(){
        self.memoryCheck();
    }, 100);
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
    alert("Got achievement "+achievement[2] + "\n" + achievement[3]);
  }
};

console.log("Loading achievement prototype");

// Achievements ae a list of values (easier/short to define than a JSON object)
var achievements = [
  //[Memory (0), Value (1) , Title (2), Description (3), Img (4), Triggered (5)]
  [0x0748, 3, "Mine gold", "Collect 3 coins", "", false],
  [0x075A, 7, "More lives than a cat", "Get 8 lives", "", false],
  [0x0748, 64, "Buy yourself a life", "Get your first life by coins", "", false],

];
//TODO store and provide list of achievements per game (this is exclusive to Mario)
