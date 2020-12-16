Handlebars.registerHelper('ifCond', function(v1, v2, options) {
    if(v1 === v2) {
      return options.fn(this);
    }
});

let gr
let renderer

$('#start').on('click', ()=>{
    const rows = $('#rows').val()
    const columns = $('#columns').val()
    if(rows < 2 || columns < 2){
        alert('please write a reasonable number')
    }else{
        gr = new GoldRush(rows, columns)
        $('#matrix').css('grid-template-columns', `repeat(${columns}, 1fr)`)
        $('#matrix').css('grid-template-columns', `repeat(${rows}, 1fr)`)
        renderer = new Renderer()
        const score1 = gr.player1.score
        const score2 = gr.player2.score
        renderer.renderBoard(gr.matrix, score1, score2)
    }
})

$(document).keypress(function (e) {
    let player 
    let direction
    if (e.which == 119 || e.which ==105) { 
        e.which == 105 ? player = 2: player = 1
        direction = 'up'
    }else if(e.which == 97 || e.which == 106){
        e.which == 106 ? player =2: player = 1
        direction = 'left'
    }else if(e.which == 115|| e.which == 107){
        e.which == 107 ? player =2: player = 1
        direction = 'down'
    }else if(e.which == 100|| e.which == 108){
        e.which == 108 ? player =2: player = 1
        direction = 'right'
    }
    if(gr){
        gr.movePlayer(player, direction)
        renderer.renderBoard(gr.matrix, gr.player1.score, gr.player2.score)
        const playerWin = gr.checkWinning() 
        if(playerWin){
            renderer.renderWin(playerWin)
        }
    }
})
