<html>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
  <script src="./static/js/ships.js"></script>
  <script src="./static/js/init.js"></script>
  <link rel="stylesheet" href="./static/css/index.css">


  <body bgcolor="lightblue">
    <div id="player_container">
      <canvas id="player_grid">
        Canvas not supported.
      </canvas>
      <center>
        <h2> PLAYER </h2>
      </center>

      <table>
        <tr>
            <th id="ac" class="unplaced" > Aircraft Carrier </th> <th id="cr" class="unplaced" > Cruiser </th> <th id="ctb" class="unplaced"> Counter Torpedo Boat </th> <th id="sub" class="unplaced"> Submarine </th> <th id="tb" class="unplaced"> Torpedo Boat </th>
        </tr>
      </table>
      <button id="back">Back..</button>
    </div>
    <div id="ai_container">
      <canvas id="ai_grid">
        Canvas not supported.
      </canvas>
      <center>
        <h2> IA </h2>
      </center>
  </div>
  </body>
  <script>
    $(document).ready(function() {
      document.getElementById("player_grid").setAttribute("width",25*$(document).width()/100);
      document.getElementById("player_grid").setAttribute("height",25*$(document).width()/100);

      document.getElementById("ai_grid").setAttribute("width",25*$(document).width()/100);
      document.getElementById("ai_grid").setAttribute("height",25*$(document).width()/100);
      $("#back").click(function() {
        draw_grid();
      })
      draw_grid();
    })

  </script>
</html>
