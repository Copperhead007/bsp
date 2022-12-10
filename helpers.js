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

/*
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
    //rooms[this.sri].hasPath = true;
    //rooms[this.ori].hasPath = true;
    pathways.push(this);
    placeit(this);
    roomsTo.splice(this.sri,1);;
  }
    else if(this.lap === "y"){
      //console.log("Overlaps on the "+ this.lap);
      //console.log("The Pickpoint on this axis: " + this.pp);
      //console.log("Shortest Path Distance by way of X: " + shortestdist);
      //rooms[this.sri].hasPath = true;
      //rooms[this.ori].hasPath = true;
      pathways.push(this);
      placeit(this);
      roomsTo.splice(this.sri,1);
    }
    else{}
    start = roomsTo.length - 1;
}
return;
}
*/
/*
$(document).ready(function(){
var btnHandler = document.getElementById("btnHandler");
btnHandler.onclick = buttonHandlers;
function buttonHandlers()
{
  console.log(arr);
    var strMsgHandler = "";
    for(let i = 0; i < bspWidth; i++){
      strMsgHandler+="\n"
        for(let j = 0; j < bspHeight; j++){
              strMsgHandler+=(arr[i][j]+" ");
              if(j==(bspWidth-1))
              strMsgHandler+="\n";
    }}
    console.log(strMsgHandler);
	captainsOrders("element1", strMsgHandler);
}
function captainsOrders(strId, strMsg){
	var elOutput = document.getElementById(strId);
	elOutput.textContent = strMsg;
}
});

 <button type="button" id="btnHandler">See the Dungeon</button>
    <br/><br/>
	<div id = "element1">Text to be Rewritten</div>

  var isConnect = 0;
          for(var checkon = 0; checkon < rooms.length; checkon++){
            if(rooms[checkon].hasPath){
              isConnect++;
          }}
          if(isConnect == rooms.length)
          {
            ctree.isConnected = true;
          }
*/