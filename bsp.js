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
//driver code
//I have leafs, rooms, and paths
//couple of wrap up functions and will be altogether
var mcontainer = new Container(0,0, bspWidth, bspHeight);
var ctree = createsplit(mcontainer, kTimes);
//var g = new Grid(bspWidth,bspHeight);
console.log(ctree.rake());
var leafs = ctree.rake();
var rooms = [];
for(var l = 0; l<leafs.length; l++){
    rooms.push(new Room(leafs[l]));
}
for(var r = 0; r<rooms.length; r++){
  placerooms(rooms[r]);
}
//console.log(rooms.length);
//const paths = [];
//for(var i = 0; i<=(rooms.length-2); i+=2){
//        paths.push(());
//        new Paths(rooms[i], rooms[i+1])
//}
//paths.push(new Paths(rooms[0],rooms[1]));
console.log(rooms);
//console.log(paths);
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
function Paths(room1, room2){
    console.log("")
        var r1x1 = room1.x;//room 1's x
        var r1x2 = r1x1+room1.w;//+ room1's bspWidth to find x range
        var r1y1 = room1.y;
        var r1y2 = r1y1 + room1.h;
        var r2x1 = room2.x;
        var r2x2 = r2x1+room2.w;
        var r2y1 = room2.y;
        var r2y2 = r2y1 + room2.h;
        var rangex1 = new Range(r1x1,r1x2);
        var rangey1 = new Range(r1y1,r1y2);
    
        console.log("Room 1's X's: "+r1x1+"-"+r1x2);
        console.log("Room 2's X's: "+r2x1+"-"+r2x2);
        console.log("Room 1's Y's: "+r1y1+"-"+r1y2);
        console.log("Room 2's Y's: "+r2y1+"-"+r2y2);
    
        var rangex2 = new Range(r2x1,r2x2);
        var rangey2 = new Range(r2y1,r2y2);
        var xlaps = doesoverlap(rangex1, rangex2);
        var ylaps = doesoverlap(rangey1,rangey2);
        if(xlaps){
            var x1overlap = Math.max(r1x1,r2x1);
            var x2overlap = Math.min(r1x2,r2x2);
            var pickpoint = randomUtil(x1overlap,x2overlap);
            var xdistance = r2y1 - r1y2;
            console.log("Path Point: "+ pickpoint);
            console.log("Y Distance to Cover "+ xdistance);
        }else{
            var y1overlap = Math.max(r1y1,r2y1);
            var y2overlap = Math.min(r1y2,r2y2);
            var pickpoint = randomUtil(y1overlap,y2overlap);
            var ydistance = r2x1 - r1x2;
            console.log("Path Point: "+ pickpoint);
            console.log("X Distance to Cover "+ ydistance);
        }
        var distance;
        console.log("X-overlap: "+ xlaps);
        console.log("Y-overlap: "+ylaps);
        this.first = room1;
        this.second = room2;
        this.xlap = xlaps;
        this.ylap = ylaps;
        this.pp = pickpoint;
        this.dist = distance;
        if(xlaps){
            distance = xdistance;
            for(let x = 0; x < bspWidth; x++){
                for(let y=0; y< bspHeight; y++){
                    if(x==this.pp && (y<=r1y2+distance && y>=r1y2)){
                        arr[x][y]=1;
                        console.log(arr[x][y]);
                    }
                }
            }
        }
        else{
            distance = ydistance;
        }
        //console.log(arr);
        return this;
    }
function Room(container) {
    this.x=(container.x+1)+randomUtil(1, Math.floor(container.w/3));
    this.y=(container.y+1)+randomUtil(1, Math.floor(container.h/3));
    this.w=container.w-(this.x - container.x);
    this.h=container.h-(this.y - container.y);
    this.w -= randomUtil(0, this.w/3);
    this.h -= randomUtil(0, this.w/3);
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
//console.log(arr);



