class GoldRush extends Matrix{
    constructor(rows, columns){
        super()
        this.matrix= []
        //probabilities: s-stone, c-coin, n-nothing
        this.distribution = {
            S: 30,
            N: 10,
            C: 60
        }
        this.coinsSum = 0;
        this.createBoard(rows, columns)
        this.player1 = {x:0, y:0, score: 0, turn: true}
        this.player2 = {x: columns - 1, y: rows - 1, score: 0, turn:true}
    }
    createBoard(columns, rows){
        for(let i=0; i<rows; i++){
            this.matrix[i] = []
            for(let j=0; j< columns; j++){
                this.matrix[i][j] = this.getRandomValue(i, j)
            }
            const isRowAllS = this.printRow(i).every(r => r==='S')
            if(isRowAllS){
                this.matrix[i][Math.floor(columns/2)]= 'C' 
                this.coinsSum += 10
            } 
        }
        let isColumnAllS
        for(let i=0; i< this.matrix[0].length; i++){
            isColumnAllS = this.printColumn(i).every(c => c === 'S')
            if(isColumnAllS) this.matrix[i][Math.floor(rows/2)]
        }
        if(this.matrix[0][0] === 'C') this.coinsSum -= 10
        this.matrix[0][0] = 1
        if(this.matrix[rows-1][columns-1] === 'C') this.coinsSum -= 10 
        this.matrix[rows-1][columns-1] = 2
    }
    movePlayer(player, direction){
        let currentPlayer
        if(player === 1){
            currentPlayer = this.player1
        }else{
            currentPlayer = this.player2
        }
        if(currentPlayer.turn){
            if(direction === 'left'){
                if(currentPlayer.y !== 0 && 
                    this.matrix[currentPlayer.x][currentPlayer.y - 1] !== 'S' &&
                    !Number.isInteger(this.matrix[currentPlayer.x][currentPlayer.y - 1])){
                    this.matrix[currentPlayer.x][currentPlayer.y] = '.'
                    if(this.matrix[currentPlayer.x][currentPlayer.y - 1] === 'C'){
                        currentPlayer.score += 10    
                    }
                    currentPlayer.y -= 1
                    this.matrix[currentPlayer.x][currentPlayer.y] = player
                }
            }else if(direction === 'right'){
                if(currentPlayer.y < this.matrix[currentPlayer.x].length - 1 && 
                    this.matrix[currentPlayer.x][currentPlayer.y + 1] !== 'S' &&
                    !Number.isInteger(this.matrix[currentPlayer.x][currentPlayer.y + 1])){
                    this.matrix[currentPlayer.x][currentPlayer.y] = '.'
                    if(this.matrix[currentPlayer.x][currentPlayer.y + 1] === 'C'){
                        currentPlayer.score += 10    
                    }
                    currentPlayer.y += 1
                    this.matrix[currentPlayer.x][currentPlayer.y] = player
                }
            }else if(direction === 'up'){
                if(currentPlayer.x !== 0 && 
                    this.matrix[currentPlayer.x - 1][currentPlayer.y] !== 'S' &&
                    !Number.isInteger(this.matrix[currentPlayer.x - 1][currentPlayer.y])){
                    this.matrix[currentPlayer.x][currentPlayer.y] = '.'
                    if(this.matrix[currentPlayer.x - 1][currentPlayer.y] === 'C'){
                        currentPlayer.score += 10    
                    }
                    currentPlayer.x -= 1
                    this.matrix[currentPlayer.x][currentPlayer.y] = player
                }
            }else {
                if(currentPlayer.x < this.matrix.length - 1 && 
                    this.matrix[currentPlayer.x + 1][currentPlayer.y] !== 'S' && 
                    !Number.isInteger(this.matrix[currentPlayer.x + 1][currentPlayer.y])){
                    this.matrix[currentPlayer.x][currentPlayer.y] = '.'
                    if(this.matrix[currentPlayer.x + 1][currentPlayer.y] === 'C'){
                        currentPlayer.score += 10    
                    }
                    currentPlayer.x += 1
                    this.matrix[currentPlayer.x][currentPlayer.y] = player
                }
            }
        }
    }
    getRandomValue(i, j){
        let value
        let num = Math.random()*100
        if(num < this.distribution.C){
            this.coinsSum += 10
            value = 'C'
        }else if(num < this.distribution.C + this.distribution.S){
            if(i !== 0 && (this.matrix[i-1][j+1] === 'S' || (j !==0 && this.matrix[i-1][j-1] === 'S'))){
                this.coinsSum += 10
                value = 'C'
            }else{
                value = 'S'
            }
        }else{
            value = '.'
        }
        return value
    }
    checkWinning(){
        const sum = this.player1.score + this.player2.score
        if(sum === this.coinsSum){
            if(this.player1.score > this.player2.score){
                return 1
            }else if(this.player1.score < this.player2.score){
                return 2
            }else{
                return 'both'
            }
            // return this.player1.score > this.player2.score ? 1 : 2
        }else { return false }
        
    }
}
