music.startMelody(music.builtInMelody(Melodies.Dadadadum), MelodyOptions.Once);
basic.pause(3000);
// initialisation des variables

let enemyY = 0;
let random2 = 0;
let random = 0;
let starship = game.createSprite(2, 4);
let enemy = game.createSprite(5, 5);
// on rend le premier sprite init invisible
enemy.set(LedSpriteProperty.Brightness, 0);
// commencement du score
game.setScore(0);
let countDown = 0;
let difficult = 0;
let level = 0;


basic.forever(function () {
    let count = 0;
    random = randint(0, 5);
    random2 = randint(-1, 1);
    enemy = game.createSprite(random, -1);
    input.onButtonPressed(Button.A, function () {
        starship.move(-1);
    })
    input.onButtonPressed(Button.B, function () {
        starship.move(1);
    })
    input.onButtonPressed(Button.AB, function () {
        tir();
    })
    difficult++;
while (count < 5 && ++count) {
    let alive = !enemy.isDeleted();
    let destroyed = enemy.isDeleted();
    if (destroyed && (difficult > 10)) {
        level += 10;
    }
    if (alive) {
        enemyY = enemy.get(LedSpriteProperty.Y);
        if (enemyY == 4 && alive) {
            countDown++;
            music.playMelody("C - F - B - A - ", 800);
            basic.showLeds(`
            # . . . #
            . # . # .
            . . # . .
            . # . # .
            # . . . #
            `, 1000);
            enemy.delete();
            if (countDown == 3) {
                music.playMelody("C5 B A G F E D C ", 700);
                music.playMelody("C5 B A G F E D C ", 700);
                game.gameOver();
            }

        }
        random2 = randint(-1, 1);
        random = randint(0, 5);
        enemy.changeXBy(random2);
        if(difficult <= 10){
            basic.pause(1000);
        }else{
            basic.pause(1000-level);
        }
        
        enemy.changeYBy(1);
    }
   

}
enemy.delete();

    function tir() {
        let starshipX = starship.get(LedSpriteProperty.X);
        let starshipY = starship.get(LedSpriteProperty.Y);
        let shoot = game.createSprite(starshipX, starshipY);
        let count2 = 0;
        music.playMelody("C5", 500);
        while (count2 < 4 && ++count2) {
            shoot.change(LedSpriteProperty.Y, -1);
            let shootY = shoot.get(LedSpriteProperty.Y);
            let shootX = shoot.get(LedSpriteProperty.X);
            let enemyY = enemy.get(LedSpriteProperty.Y);
            let enemyX = enemy.get(LedSpriteProperty.X);

            if ((shootY == enemyY) && (shootX == enemyX)) {
                music.playMelody("E4", 500);
                game.addScore(1);
                enemy.delete();
            }
            basic.pause(100);
        }
        shoot.delete();
    }

})

