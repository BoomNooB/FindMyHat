const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field){
        this._field = field;
        this.currentX = 0;
        this.currentY = 0;
        this.selectWay = '';
    }
    get field(){
        return this._field
    }

    printCurrentMap(){
        let map = [];
        for(let i = 0; i < this._field.length; i++){
            map += '\n'
            for(let j = 0; j < this._field[i].length;j++){
                map+=(this._field[i][j])
            }
        }
        console.log(map);
        this.selectWay = prompt(`Which way do you want to go\nPlease Type only u,d,r,l:`);
        switch(this.selectWay){
            case 'u':
                this.goUp();
                break;
            case 'd':
                this.goDown();
                break;
            case 'l':
                this.goLeft();
                break;
            case 'r':
                this.goRight();
                break;
            default:
                console.log("Please type Again in CORRECT format");
                this.printCurrentMap();
        }
    }

    findCurrentChar(char){
        let x = [];
        let y = [];
        for(let i = 0; i < this._field.length; i++){
            for(let j = 0; j < this._field[i].length;j++){
                // console.log(`i = ${i}, j = ${j}`)
                if(this._field[i][j] === char){
                    x.push(i);
                    y.push(j);
                    }
                }
            }
        console.log(`x = ${x}\ny = ${y}`);
        
    }

    goUp(){
        console.log(`\nGo Up`);
        this.currentX--;
        this.gameLogicCheck();
        this._field[this.currentX][this.currentY] = '*';
        this.printCurrentMap();
    }
    goDown(){
        //it's gonna be in format of [i][j] 
        // i === แนวนอน === x
        // j === แนวตั้ง  === y
        //ถ้าเดินลงล่าง ต้องเพิ่มแนวนอน1ตัว -> i+1
        console.log(`\nGo Down`);
        this.currentX++;
        this.gameLogicCheck();
        this._field[this.currentX][this.currentY] = '*';
        this.printCurrentMap();
    }
    goLeft(){
        //it's gonna be in format of [i][j] 
        // i === แนวนอน === x
        // j === แนวตั้ง  === y
        //ถ้าเดินไปซ้าย ต้องเพิ่มแนวนอน1ตัว -> i+1
        console.log(`\nGo Left`);
        this.currentY--;
        this.gameLogicCheck();
        this._field[this.currentX][this.currentY] = '*';
        this.printCurrentMap();
    }
    goRight(){
        console.log(`\nGo Right`);
        this.currentY++;
        this.gameLogicCheck();
        this._field[this.currentX][this.currentY] = '*';
        this.printCurrentMap();
    }

    gameLogicCheck(){
        //กำหนดค่ากว้างสุดในตัวแปร x,y 
        let x = this._field.length - 1;
        let y = this._field[0].length - 1;
        // เช็คตกแมพ
        if(this.currentX>x || this.currentY>y ||this.currentY<0 || this.currentX<0){
            console.log(`You are fall from the map ,lol`)
            return this.endGame();
        //เช็คตกหลุม
        } else if(this._field[this.currentX][this.currentY] === 'O'){
            console.log(`You've fall into the HOLE ,lol`);
            return this.endGame();
        //เช็คชนะ
        } else if(this._field[this.currentX][this.currentY] === '^'){
            console.log(`Congratulations ! , You've reached the hat`);
            return this.endGame();
        } else {
            console.log(`Nicely done,Go on!`);
        }
    }

    endGame(){
        console.log(`End Game!,Please run the file again if you want to play`)
        process.exit();
    }
}


const myField = new Field([
    ['*', '░', '░', '░'],
    ['░', 'O', '░', '░'],
    ['░', '^', '░', 'O']
  ]);
  
console.log(`u is up\nd is down\nr is right\nl is left`)
// myField.gameLogicCheck();
myField.printCurrentMap();
