$(document).ready(function() {
    var nraya = new NRaya(4, 4);
    printBoard(nraya.board);

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

});

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
