var r1x1 = room1.x;//room 1's x
var r1x2 = r1x1+room1.w;//+ room1's x + width to find x range
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
//console.log(arr);
return this;