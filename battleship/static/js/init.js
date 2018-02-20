var boat_name;//name of the boat
var boat_size;//size of the boat to place
var start_ship;//start of the ship to use in click function
var end_ship;//end of the ship to use in click function
var grid = new Grid();//the grid variable
grid.init();

function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}

function isIn(x,y,origin_x,origin_y) {
  var size = document.getElementById("player_grid").width;

  //this verifies if the boat is inside of the grid
  if ((x>=size || y>=size || y<0 || x<0)) {
    return false;
  }
  // this whole part verifies if the boat could cross another
  origin_x = Math.floor(10*origin_x/size);
  origin_y = Math.floor(10*origin_y/size);

  x = Math.floor(10*x/size);
  y = Math.floor(10*y/size);
  if (origin_x == x) {
    if (origin_y>y) {
      y += origin_y;
      origin_y = y - origin_y;
      y -= origin_y;
    }
    for (var i=0;i<boat_size;i++) {
      if (grid.array[origin_x+(origin_y+i)*10]._occupied == true) {
        return false;
      }
    }
  } else if (origin_y == y) {
    if (origin_x>x) {
      x += origin_x;
      origin_x = x - origin_x;
      x -= origin_x;
    }
    for (var i=0;i<boat_size;i++) {
      if (grid.array[origin_x+i+(origin_y)*10]._occupied == true) {
        return false;
      }
    }
  }
  return true;
}

/**
  * Draw the given Grid Constructor
  * @function draw_grid
*/
function draw_grid() {
  $(".unplaced").css("background-color","white");
  $(".unplaced").click(function() {
    placing(this.id);
  })
  c1 = document.getElementById("player_grid");
  ctx1 = c1.getContext("2d");
//  c1.addEventListener('click',handleClickOnPlayer);

  c2 = document.getElementById("ai_grid");
  ctx2 = c2.getContext("2d");
//  c2.addEventListener('click',handleClickOnAI);

  size=document.getElementById("player_grid").width/10;
  for (var x = 0; x < 10; x++) {
    for (var y = 0; y < 10; y++) {
      ctx1.strokeStyle="#E0E0E0";
      ctx1.strokeRect(size*x,size*y,size,size);
      ctx1.fillStyle="#FFFFFF";
      ctx1.fillRect(size*x,size*y,size,size);
      if (grid.array[x+10*y]._occupied == true) {
        ctx1.fillStyle="#660000";
        ctx1.fillRect(size*x,size*y,size,size);
      }
      if (grid.array[x+10*y]._hit == true) {
        ctx1.fillStyle="#FF0000";
        ctx1.fillRect(size*x,size*y,size,size);
      }

      ctx2.fillStyle="#E0E0E0";
      ctx2.fillRect(size*x,size*y,size,size);
      ctx2.strokeStyle="#FFFFFF";
      ctx2.strokeRect(size*x,size*y,size,size);
    }
  }
}

/** Common Mouse Position getter
* @function getMousePos
* @param {c} some context
* @param {evt} some event
*/
function getMousePos(c, evt) {
  var rect = c.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

/** Handle the positioning click : draw a square to the destination and draw up to 4 others squares in order to place the other parts of the boat
* @function handlePositioningClickOnPlayer
* @param {e} some event
*/
function handlePositioningClickOnPlayer(e) {
  var c1 = document.getElementById("player_grid");
  ctx1 = c1.getContext("2d");
  var pos = getMousePos(player_grid, e);
  posx = pos.x;
  posy = pos.y;
  size =  c1.width/10;
  square_x = Math.floor(posx / size);
  square_y = Math.floor(posy / size);
  start_ship = new Point(square_x,square_y,false,false);
  ctx1.strokeStyle="#E0E0E0";
  ctx1.strokeRect(size*square_x,size*square_y,size,size);
  ctx1.fillStyle="#CCCCFF";
  ctx1.fillRect(size*square_x,size*square_y,size,size);

  //top
  if (isIn(size*square_x,size*(square_y-boat_size+1),size*square_x,size*square_y) == true ) {
    ctx1.strokeStyle="#E0E0E0";
    ctx1.strokeRect(size*square_x,size*square_y,size,size);
    ctx1.fillStyle="#3399FF";
    ctx1.fillRect(size*square_x,size*(square_y-boat_size+1),size,size);
  }

  //bottom
  if (isIn(size*square_x,size*(square_y+boat_size-1),size*square_x,size*square_y) == true ) {
    ctx1.strokeStyle="#E0E0E0";
    ctx1.strokeRect(size*square_x,size*square_y,size,size);
    ctx1.fillStyle="#3399FF";
    ctx1.fillRect(size*square_x,size*(square_y+boat_size-1),size,size);
  }

  //left
  if (isIn(size*(square_x-boat_size+1),size*square_y,size*square_x,size*square_y) == true ) {
    ctx1.strokeStyle="#E0E0E0";
    ctx1.strokeRect(size*square_x,size*square_y,size,size);
    ctx1.fillStyle="#3399FF";
    ctx1.fillRect(size*(square_x-boat_size+1),size*square_y,size,size);
  }

  //right
  if (isIn(size*(square_x+boat_size-1),size*square_y,size*square_x,size*square_y) == true ) {
    ctx1.strokeStyle="#E0E0E0";
    ctx1.strokeRect(size*square_x,size*square_y,size,size);
    ctx1.fillStyle="#3399FF";
    ctx1.fillRect(size*(square_x+boat_size-1),size*square_y,size,size);
  }

  c1.removeEventListener('click',handlePositioningClickOnPlayer);
  c1.addEventListener('click',handleSelectingClickOnPlayer);
}

/** Handle the selecting click : handle the selection of the other part of the boat
* @function handlePositioningClickOnPlayer
* @param {e} some event
*/
function handleSelectingClickOnPlayer(e) {
  var pos = getMousePos(player_grid, e);
  var c1 = document.getElementById("player_grid");
  ctx1 = c1.getContext("2d");
  size =  c1.width/10;
  posx = pos.x;
  posy = pos.y;

  square_x = Math.floor(posx / size);
  square_y = Math.floor(posy / size);
  end_ship = new Point(square_x,square_y,false,false);
  var pos = getMousePos(player_grid, e);
  var p = ctx1.getImageData(posx,posy,1,1).data;//get the color value of the clicked pixel to verify if its blue
  var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);//change to hex
  if (hex == "#3399ff") {
    var ship = new Ship(boat_size,start_ship,end_ship);
    grid.addShip(ship);
    $("#"+boat_name).attr("class","placed");
  }
  c1.removeEventListener('click',handleSelectingClickOnPlayer);
  draw_grid();
  size =  c1.width/10;
}

function handleClickOnAI(e) {
  var pos = getMousePos(ai_grid, e);
  posx = pos.x;
  posy = pos.y;
  alert(posx+" "+posy);
}

function placing(name) {
  $("#"+name).css("background-color","rgb(224,224,224)");
  $("th").off('click');
  c1.addEventListener('click',handlePositioningClickOnPlayer);
  switch (name) {
    case "ac":
      boat_size = 5;
      boat_name = "ac";
      break;
    case "cr":
      boat_size = 4;
      boat_name = "cr";
      break;
    case "ctb":
      boat_size = 3;
      boat_name = "ctb";
      break;
    case "sub":
      boat_size = 3;
      boat_name = "sub";
      break;
    case "tb":
      boat_size = 2;
      boat_name = "tb";
      break;
  }
}
