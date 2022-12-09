//g = new Grid(100,100);
//randomly create leafs
//and add to btree
//from there find leaves
//splits leaves vertically or horizontally at random
//get values of room
//draw walkways
//cut out of matrix
//display matrix

//checkout console.logs
//currently have x paths to display and meet rooms in array 
//still need to find a way to display to canvas without destroying data
//CONSTANTS
const bspWidth = 100;
const bspHeight = 100;
const bspWidthRatio = 0.46;
const bspHeightRatio = 0.46;
const kTimes=4;
const dontWant = true;
const pathways = [];
const arr = new Array(bspWidth);
for (let a = 0; a < bspWidth; a++) {
  arr[a] = new Array(bspHeight);
}
for(let i = 0; i < bspWidth; i++){
    for(let j = 0; j < bspHeight; j++){
        arr[i][j] = 0;
        //document.write(arr[i][j] + " ");
        //if(j==(bspWidth-1))document.write("<br>");
    }
} 
class Tree {
  constructor(leaf) {
    this.leaf = leaf;
    this.left = null;
    this.right = null;
    this.leaves = [];
  }
  rake(){
        if(this.left === null && this.right === null){
            return(this.leaf);
        }
        else{
            return this.leaves.concat(this.left.rake(),this.right.rake());
        }
    }
}
  class Container {
    constructor(x, y, w, h) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
}
}
//create 2d matrix
/*
class Grid{
    constructor(r, c){
        this.rows= r;
        this.cols= c;
        this.twod = [];
    for(let x = 0; x < this.cols; x++){
        for(let y = 0; y< this.rows; y++){
            this.twod[x][y].push(0);
        }
    }
}
}*/
class Range{
    constructor(f,s){
        this.first = f;
        this.second = s;
    }
}
function placerooms(room){
  var roomXstart = room.x;
  var roomXfinish = roomXstart+room.w;
  var roomYstart = room.y;
  var roomYfinish = roomYstart + room.h;
  for(var s = 1; s < bspWidth-1; s++){
    for(var t = 1; t < bspHeight-1; t++){
      if((s >=roomXstart && s <= roomXfinish) && (t >= roomYstart &&  t <= roomYfinish)){
        arr[s][t] = 1;
      }
    }
  }
}
function PathData(room){
    //console.log("");
        var rx1 = room.x;//room 1's x
        var rx2 = rx1+room.w;//+ room1's x + width to find x range
        var ry1 = room.y;
        var ry2 = ry1 + room.h;
        var rangex1 = new Range(rx1,rx2);
        var rangey1 = new Range(ry1,ry2);
        //console.log(rangex1,rangey1);
        var midpoint = (Math.floor((rx1+rx2)/2), Math.floor((ry1+ry2)/2)); 
        this.xrange = rangex1;
        this.yrange = rangey1;
        //this.mp = midpoint;
        return this;
}
function Room(container) {
    this.x=(container.x+1)+randomUtil(1, Math.floor(container.w/3));
    this.y=(container.y+1)+randomUtil(1, Math.floor(container.h/3));
    this.w=container.w-(this.x - container.x);
    this.h=container.h-(this.y - container.y);
    this.w -= randomUtil(0, this.w/3);
    this.h -= randomUtil(0, this.w/3);
    this.hasPath = false;
    return this;
}
function doesoverlap(val1, val2) {
    if(val2.first < val1.first) {
        return val2.second > val1.first;
    }
    else {
        return val2.first < val1.second;
    }
}
  function randomUtil(min,max){
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  function createsplit(container, i){
    //this.container = container;
    //console.log("container in find split " + container + " iterations in find split " + i);
    //var cont = this.container;
    //this.i = i;
    //var iter = this.i;
    var root = new Tree(container);
    if(i != 0){
      var fs = randomPartition(container);
      root.left = createsplit(fs[0],i-1);
      root.right = createsplit(fs[1],i-1);
    }
    return root;
  }
  function randomPartition(container){
    //console.log("container in random split " + container + " " + ctr);
    //this.container = container;
    //var cont = this;
    //vertical
    var tob, bot;//top or bottom
    if(randomUtil(0,1) == 0){
    tob = new Container(container.x, container.y, randomUtil(1,container.w),container.h);
    bot = new Container(container.x + tob.w, container.y, container.w - tob.w, container.h);
    
    if(dontWant){
      var ratioW1 = tob.w / tob.h;
      var ratioW2 = bot.w / bot.h;
      if(ratioW1 < bspWidthRatio || ratioW2 < bspWidthRatio){
        return randomPartition(container);
      }
    }
  }
  else {
    tob = new Container(container.x, container.y, container.w, randomUtil(1, container.h));
    bot = new Container(container.x, container.y + tob.h, container.w, (container.h - tob.h));
    if(dontWant){
      var ratioH1 = tob.h / tob.w;
      var ratioH2 = bot.h / bot.w;
      if(ratioH1 < bspHeightRatio || ratioH2 < bspHeightRatio){
        return randomPartition(container);
      }
}
}
//console.log(tob);
//console.log(bot);
return [tob, bot]
}
function placeit(shortestpath){
  if(shortestpath.sr.hasPath == false){
  for(var place = 0; place < pathways.length; place++){
    //loop through arr now and place
    if(shortestpath.lap === "x" && shortestpath.distance > 0){//going down
      console.log("going down");
      for(var i=1; i < bspWidth-1; i++){
        for(var j=1; j < bspHeight-1; j++){
          if((i == shortestpath.pp) && ((j >= shortestpath.sr.y+shortestpath.sr.h) &&  (j <= shortestpath.or.y))){
            arr[i][j] = 1;
          }
        }
      }
    }
    else if(shortestpath.lap === "x" && shortestpath.distance < 0){
      console.log("going up");
      console.log(shortestpath.sr);
      console.log(shortestpath.or);
      for(var i=1; i < bspWidth-1; i++){
        for(var j=1; j < bspHeight-1; j++){
          if((i == shortestpath.pp) && ((j <= shortestpath.sr.y) && (j >= shortestpath.or.y+shortestpath.or.h))){
            arr[i][j] = 1;
          }
        }
      }
    }
    else if(shortestpath.lap === "y" && shortestpath.distance > 0){//
      console.log("going right");
      console.log(shortestpath.sr);
      console.log(shortestpath.or);
      for(var i=1; i < bspWidth-1; i++){
        for(var j=1; j < bspHeight-1; j++){
          if((j == shortestpath.pp) && ((i >= shortestpath.sr.x+shortestpath.sr.w) && (i <= shortestpath.or.x))){
            arr[i][j] = 1;
          }
        }
      }
    }
    else{//
      console.log("going left");
      console.log(shortestpath.sr);
      console.log(shortestpath.or);
      for(var i=1; i < bspWidth-1; i++){
        for(var j=1; j < bspHeight-1; j++){
          if((j == shortestpath.pp) && ((i <= shortestpath.sr.x) && (i >= shortestpath.or.x + shortestpath.or.w))){
            arr[i][j] = 1;
          }
    }
  }
}
}
}
}
function lonelyRoom(room, index){
  var inn = index;
  var roomsCopy = rooms.slice(0);
  var lonely = room;
  var lonelyPathData = new PathData(lonely);
  roomsCopy.splice(inn,1);
  for(var lr = 0; lr < roomsCopy.length; lr++){
    if(roomsCopy[lr].hasPath){}
    else{
      var otherRoom = roomsCopy[lr];
      var othersPathData = new PathData(roomsCopy[lr]);
      xp = doesoverlap(lonelyPathData.xrange, othersPathData.xrange);
      yp = doesoverlap(lonelyPathData.yrange, othersPathData.yrange);
      var distance = 30;
      var orindex = lr;
      var shortestdist = 50;
      if( xp || yp){
        if(xp){
          var x1overlap = Math.max(lonelyPathData.xrange.first, lonelyPathData.xrange.second);
          var x2overlap = Math.min(othersPathData.xrange.first, othersPathData.xrange.second);
          var pickpoint = randomUtil(x1overlap,x2overlap);
          distance = otherRoom.y - lonelyPathData.yrange.second;
          if(distance < shortestdist){
            shortestdist = distance;
            this.pp = pickpoint;
            this.lap = "x";
            this.distance = distance;
            this.sri = inn;
            this.ori = orindex;
            this.sr = lonely;
            this.or = otherRoom;
            //pathways.push(this);
          }
      }
      else if(yp){
          var y1overlap = Math.max(lonelyPathData.yrange.first, lonelyPathData.yrange.second);
          var y2overlap = Math.min(othersPathData.xrange.first, othersPathData.xrange.second);
          var pickpoint = randomUtil(y1overlap,y2overlap);
          distance = otherRoom.x - lonelyPathData.xrange.second;
          if(distance < shortestdist){
            shortestdist = distance;
            this.pp = pickpoint;
            this.lap = "y";
            this.distance = distance;
            this.sri = inn;
            this.ori = orindex;
            this.sr = lonely;
            this.or = otherRoom;
            //pathways.push(this);
          }
      }else{}
    }
  }
    if(this.lap === "x"){
    //console.log("Overlaps on the "+ this.lap);
    //console.log("The Pickpoint on this axis: " + this.pp);
    //console.log("Shortest Path Distance by way of Y: " + shortestdist);
    pathways.push(this);
    placeit(this);
    rooms[this.sri].hasPath = true;
    rooms[this.ori].hasPath = true;
    //roomsCopy.splice(inn,1);
  }
    else if(this.lap === "y"){
      //console.log("Overlaps on the "+ this.lap);
      //console.log("The Pickpoint on this axis: " + this.pp);
      //console.log("Shortest Path Distance by way of X: " + shortestdist);
      pathways.push(this);
      placeit(this);
      rooms[this.sri].hasPath = true;
      rooms[this.ori].hasPath = true;
      //roomsCopy.splice(inn,1);
    }
  }
}
function shortestpath(){
  //for each room create a shortest path to another room
  //check overlap
  //ifdoesoverlap

  var roomsTo = rooms.slice(0);
  //console.log(roomsTo);
  var selectedRoom;
  var start = roomsTo.length - 1;
  while(start > 0){
    selectedRoom = roomsTo[start];
    var srPathData = new PathData(selectedRoom);
    var xp = false;
    var yp = false;
    //loop through current size of roomsTo and find closest room
    //then pass that to function paths to place it
    for(var p = 0; p < start-1; p++){
      var otherRoom = roomsTo[p];
      var othersPathData = new PathData(roomsTo[p]);
      xp = doesoverlap(srPathData.xrange, othersPathData.xrange);
      yp = doesoverlap(srPathData.yrange, othersPathData.yrange);
      var distance = 30;
      var srindex = start;
      var orindex = p;
      var shortestdist = 50;
      if( xp || yp){
        if(xp){
          var x1overlap = Math.max(srPathData.xrange.first, srPathData.xrange.second);
          var x2overlap = Math.min(othersPathData.xrange.first, othersPathData.xrange.second);
          var pickpoint = randomUtil(x1overlap,x2overlap);
          distance = otherRoom.y - srPathData.yrange.second;
          //console.log("Path Point: "+ pickpoint);
          //console.log("Y Distance to Cover "+ distance);
          //push pickpoint and distance to a path
          //track indices if smallest
          //after these ifs and for grab the shortest distance path
          //slice it out of the roomsTo and grid
          //then carry on with the next
          if(distance < shortestdist){
            shortestdist = distance;
            this.pp = pickpoint;
            this.lap = "x";
            this.distance = distance;
            this.sri = srindex;
            this.ori = orindex;
            this.sr = selectedRoom;
            this.or = otherRoom;
          }
      }
      else if(yp){
          var y1overlap = Math.max(srPathData.yrange.first, srPathData.yrange.second);
          var y2overlap = Math.min(othersPathData.xrange.first, othersPathData.xrange.second);
          var pickpoint = randomUtil(y1overlap,y2overlap);
          distance = otherRoom.x - srPathData.xrange.second;
          //console.log("Path Point: "+ pickpoint);
          //console.log("X Distance to Cover "+ distance);
          if(distance < shortestdist){
            shortestdist = distance;
            this.pp = pickpoint;
            this.lap = "y";
            this.distance = distance;
            this.sri = srindex;
            this.ori = orindex;
            this.sr = selectedRoom;
            this.or = otherRoom;
          }
      }else{}
    }
  }
    if(this.lap === "x"){
    //console.log("Overlaps on the "+ this.lap);
    //console.log("The Pickpoint on this axis: " + this.pp);
    //console.log("Shortest Path Distance by way of Y: " + shortestdist)
    rooms[this.sri].hasPath = true;
    rooms[this.ori].hasPath = true;
    pathways.push(this);
    placeit(this);
    roomsTo.splice(this.sri,1);;
  }
    else if(this.lap === "y"){
      //console.log("Overlaps on the "+ this.lap);
      //console.log("The Pickpoint on this axis: " + this.pp);
      //console.log("Shortest Path Distance by way of X: " + shortestdist);
      rooms[this.sri].hasPath = true;
      rooms[this.ori].hasPath = true;
      pathways.push(this);
      placeit(this);
      roomsTo.splice(this.sri,1);
    }
    else{}
    start = roomsTo.length - 1;
}
}
var mcontainer = new Container(0,0, bspWidth, bspHeight);
var ctree = createsplit(mcontainer, kTimes);
//var g = new Grid(bspWidth,bspHeight);
//console.log(ctree.rake());
var leafs = ctree.rake();
const rooms = [];
for(var l = 0; l<leafs.length; l++){
    rooms.push(new Room(leafs[l]));
}
for(var r = 0; r<rooms.length; r++){
  placerooms(rooms[r]);
}
//console.log(rooms);
//shortestpath();
for( var pathCheck = 0; pathCheck < rooms.length; pathCheck++){
  if(rooms[pathCheck].hasPath == false){
  lonelyRoom(rooms[pathCheck], pathCheck);
  //rooms[pathCheck].hasPath = true;
  }
}
//console.log(arr);
