class Renderer{
    constructor(){

    }
    renderBoard(matrix, score1, score2){
        const source = $("#matrix-template").html();
        const template = Handlebars.compile(source);
        const newHTML = template({matrix, score1, score2});
        $("#matrix").empty();
        $("#matrix").append(newHTML);
        const size = 78/matrix.length
        $('.item').css('max-height', `${size}vh`)
        this.renderScores(score1,score2)
    }
    renderScores(score1, score2){
        const source = $("#scores-template").html();
        const template = Handlebars.compile(source);
        const newHTML = template({score1, score2});
        $('#scores').empty()
        $('#scores').append(newHTML)
    }
    renderWin(player){
        const source = $("#win-template").html();
        const template = Handlebars.compile(source);
        const newHTML = template({player});
        $(".win").append(newHTML);
        $(".win").show()
    }
}