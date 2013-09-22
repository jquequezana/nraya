$(document).ready(function() {
   $('form').submit(function(event) {
        event.preventDefault();
        var level = $('#levelInput').val();
        var size = $('#dimensionInput').val() - 0;
        size = (!size) ? 3 : size;
        var computerStart = $('#computerStartInput').is(":checked");
        initNRaya(size, level, computerStart);
   }); 
});

function initNRaya(size, level, computerStart) {
    var nraya = new NRaya(size, level);
    printBoard(nraya.board);
   
    if (computerStart) {
        var computerChoise = nraya.getNextStep();
        nraya.board[computerChoise.x][computerChoise.y] = true;
        $('#' + computerChoise.x + '-' + computerChoise.y).html('<span class="btn btn-danger btn-large disabled">C</span>');
    }
 
    $('tr > td').click(function(event) {
        var index = $(this).attr('id').split('-');
        if (nraya.board[index[0]][index[1]] !== null) {
            return;
        }
        /* Human option */
        nraya.board[index[0]][index[1]] = false;
        $(this).html('<span class="btn btn-success btn-large disabled">I</span>');
        /* Computer option */
        var computerChoise = nraya.getNextStep();
        nraya.board[computerChoise.x][computerChoise.y] = true;
        $('#' + computerChoise.x + '-' + computerChoise.y).html('<span class="btn btn-danger btn-large disabled">C</span>');
    });
}

function printBoard(board) {
    $('body').html('<div id="content"></div>');
    $('#content').html('<table id="board" class="table table-bordered"></table>'); 
    for (var i = 0; i < board.length; i++) {
        var line = "<tr>";
        for (var j = 0; j < board.length; j++) {
            line += '<td id="' + i + '-' + j + '">';
            line += '<span class="btn btn-large disabled">?</span>';
            line += '</td>';    
        }
        line += '</tr>';
        $('#board').append(line);
    }
}
