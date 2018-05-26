    
        $(document).ready(function() {

            var total;                  //this should be the total that you've got so far (the sum off all the gems)
            var gem1;                   //this is the value of the purple gem
            var gem2;                   //this is the value of the red gem
            var gem3;                   //this is the value of the green gem
            var gem4;                   //this is the value of the orange gem
            var gemGoal;                //this is the diamond's number
            var gamesTotal = 0;         //total number of games
            var winsTotal = 0;          //total number of wins
            var bustaBusta = false;     //have we busted?
            var fillingProgressBarPercentage;           // this was not needed globally at all i can probably delete it later
            var gameIsPlaying = true;   //is the game currently playing


            //this function should set all of our starting game conditions on page load or game reset

            function gameConditionStart() {

                total = 0;
                gemGoal = Math.floor(Math.random() * 100) + 12;
                console.log("GOAL: " + gemGoal);

                gem1 = Math.floor(Math.random() * 11) + 1;
                $('.gem1div').attr('value', gem1);                  //sets gem1div's value to the roll
                $('.gem1value').html(gem1);                         //sets the unrevealed popup to the value as well
                console.log("gem1: " + gem1);

                gem2 = Math.floor(Math.random() * 11) + 1;
                $('.gem2div').attr('value', gem2);
                $('.gem2value').html(gem2);
                console.log("gem1: " + gem2);


                //gems 3 and 4 will always be even and odd, respectively, to contribute to fewer "impossible" game states

                gem3 = Math.floor(Math.random() * 5) + 1;
                gem3 = gem3 * 2;
                $('.gem3div').attr('value', gem3);
                $('.gem3value').html(gem3);
                console.log("gem1: " + gem3);

                gem4 = Math.floor(Math.random() * 11) + 1;
                    while(gem4 % 2 == 0)
                        { gem4 = Math.floor(Math.random() * 11) + 1; }
                $('.gem4div').attr('value', gem4);
                $('.gem4value').html(gem4);
                console.log("gem1: " + gem4);

                bustaBusta = false;

                //reset some display states

                $('.bustMessage').css('visibility', 'hidden');
                
                if ($('.bustMessage').hasClass('bounceIn')) {
                    $('.bustMessage').removeClass('bounceIn');
                }

                if ($('.customModal').css('display', 'show')) {
                    $('.customModal').css('display', 'none');
                }

                //animate the gems falling off and being replaced
                $('.gem1div').addClass("fadeOutDown");
                $('.gem2div').addClass("fadeOutDown");
                $('.gem3div').addClass("fadeOutDown");
                $('.gem4div').addClass("fadeOutDown");

                setTimeout(function(){

                    var gem1RandomSrc = Math.floor(Math.random()*3);
                    console.log(gem1RandomSrc);
                    if (gem1RandomSrc == 0) { $('.gem1img').attr('src', 'assets/images/purplegem1.png');}
                    if (gem1RandomSrc == 1) { $('.gem1img').attr('src', 'assets/images/bluegem1.png');}
                    if (gem1RandomSrc == 2) { $('.gem1img').attr('src', 'assets/images/pinkgem1.png');}

                    var gem2RandomSrc = Math.floor(Math.random()*3);
                    console.log(gem2RandomSrc);
                    if (gem2RandomSrc == 0) { $('.gem2img').attr('src', 'assets/images/redgem2.png');}
                    if (gem2RandomSrc == 1) { $('.gem2img').attr('src', 'assets/images/yellowgem2.png');}
                    if (gem2RandomSrc == 2) { $('.gem2img').attr('src', 'assets/images/tealgem2.png');}

                    var gem3RandomSrc = Math.floor(Math.random()*3);
                    console.log(gem3RandomSrc);
                    if (gem3RandomSrc == 0) { $('.gem3img').attr('src', 'assets/images/greengem3.png');}
                    if (gem3RandomSrc == 1) { $('.gem3img').attr('src', 'assets/images/pinkgem3.png');}
                    if (gem3RandomSrc == 2) { $('.gem3img').attr('src', 'assets/images/goldgem3.png');}

                    var gem4RandomSrc = Math.floor(Math.random()*3);
                    console.log(gem4RandomSrc);
                    if (gem4RandomSrc == 0) { $('.gem4img').attr('src', 'assets/images/orangegem4.png');}
                    if (gem4RandomSrc == 1) { $('.gem4img').attr('src', 'assets/images/violetgem4.png');}
                    if (gem4RandomSrc == 2) { $('.gem4img').attr('src', 'assets/images/seafoamgem4.png');}

                    //let's put the gems back up now that we've swapped them
                    $('.gem1div').removeClass("fadeOutDown").addClass('fadeInUp');
                    $('.gem2div').removeClass("fadeOutDown").addClass('fadeInUp');
                    $('.gem3div').removeClass("fadeOutDown").addClass('fadeInUp');
                    $('.gem4div').removeClass("fadeOutDown").addClass('fadeInUp');

                    setTimeout(function(){$('.gem1div').removeClass('fadeInUp');}, 500);
                    setTimeout(function(){$('.gem2div').removeClass('fadeInUp');}, 500);
                    setTimeout(function(){$('.gem3div').removeClass('fadeInUp');}, 500);
                    setTimeout(function(){$('.gem4div').removeClass('fadeInUp');}, 500);

                }, 500);

                gameIsPlaying = true;

            }


            //this is the function to update all of our displayed values

            function displayOutputUpdate() {

                $('#bigGemMessage').html(gemGoal);
                $('.currentTotalOutput').html(total);
                $('.winCounter').html("WINS: "+ winsTotal);
                $('.gameCounter').html("GAMES: "+ gamesTotal);

                //$('.')
                
                var barHolder = Math.floor((total/gemGoal)*100);

                //                  this took entirely too long and it would've worked the way I wrote it originally
                // (╯°□°）╯︵ ┻━┻   if i'd actually looked at the we3 examples and seen they used bootstrap 3 and the 
                //                  class names had changed in bootstrap 4

                if (barHolder < 100) {

                    $('.progress-bar').attr('aria-valuenow', barHolder).css('width', barHolder+"%");
                    $('.progress-bar').css('background-color', "#007bff");

                } else if ( barHolder == 100) {

                    if (gemGoal == total) {

                        $('.progress-bar').attr('aria-valuenow', 100).css('width', 100+"%");
                        $('.progress-bar').css('background-color', "orange");
                        gameIsPlaying = false;
                        bustaBusta = false;
                        checkThisVictory();

                    } else {
                        
                        $('.progress-bar').attr('aria-valuenow', 100).css('width', 100+"%");
                        $('.progress-bar').css('background-color', "darkred");
                        bustaBusta = true;
                        gameIsPlaying = false;
                        checkThisVictory();

                    }

                } else {

                    $('.progress-bar').attr('aria-valuenow', 100).css('width', 100+"%");
                    $('.progress-bar').css('background-color', "darkred");
                    bustaBusta = true;
                    gameIsPlaying = false;
                    checkThisVictory();

                }
            }


            //an event listener waiting for someone to click on a gem

            $(".geminput").on("click", function() {

                if (gameIsPlaying == true) {
            
                    var buttonClick = $(this).attr("value");
                    buttonClick = parseInt(buttonClick);
                    total = buttonClick + total;

                    displayOutputUpdate();


                    //this is where that pretty text pop-up comes from, I probably could've written this as a function somehow ¯\_(ツ)_/¯

                    if ($(this).hasClass('gem1div')) {
                        $('.gem1value').removeClass('slideInUp');                                                   //removes the animation if you're clicking rapidly to restart it - this does not seem to work the way I want it to
                        $('.gem1value').css('visibility','visible').fadeIn("fast").addClass('slideInUp');           //adds in the slide animation and fades in the value
                        setTimeout(function() {$('.gem1value').fadeOut("fast").removeClass('slideInUp');}, 900);    //waits .9s and fades the value you back out
                    }
                    if ($(this).hasClass('gem2div')) {
                        $('.gem2value').removeClass('slideInUp');
                        $('.gem2value').css('visibility','visible').fadeIn("fast").addClass('slideInUp');
                        setTimeout(function() {$('.gem2value').fadeOut("fast").removeClass('slideInUp');}, 900);
                    }
                    if ($(this).hasClass('gem3div')) {
                        $('.gem3value').removeClass('slideInUp');
                        $('.gem3value').css('visibility','visible').fadeIn("fast").addClass('slideInUp');
                        setTimeout(function() {$('.gem3value').fadeOut("fast").removeClass('slideInUp');}, 900);
                    }
                    if ($(this).hasClass('gem4div')) {
                        $('.gem4value').removeClass('slideInUp');
                        $('.gem4value').css('visibility','visible').fadeIn("fast").addClass('slideInUp');
                        setTimeout(function() {$('.gem4value').fadeOut("fast").removeClass('slideInUp');}, 900);
                    }

                }

            });


            function checkThisVictory() {

                if (bustaBusta == true) {

                    $('.bustMessage').css('visibility', 'visible').css('color', 'red').css('-webkit-text-stroke-color', 'darkred').text('BUST!');

                } else if (bustaBusta == false) {

                    $('.bustMessage').css('visibility', 'visible').css('color', 'palegoldenrod').css('-webkit-text-stroke-color', 'white').text('WIN!');

                }

                 $('.bustMessage').addClass('bounceIn');


                //modal popup
                setTimeout(function() {
                    if (bustaBusta == true) {

                        $('.customModal').css('display', 'block');
                        $('.modalBannerText').html('YOU BUSTED!').attr('id', 'modalTextBusted');
                        $('#modalBodyText').html("BETTER LUCK NEXT TIME!");
                        gamesTotal++;                        
                        
                    } else {

                        $('.customModal').css('display', 'block');
                        $('.modalBannerText').html('YOU WON!').attr('id', 'modalTextVictory');
                        $('#modalBodyText').html("YOU MATCHED THE DIAMOND!");
                        gamesTotal++;
                        winsTotal++;

                    }

                }, 800)

            }


            $(".buttonforreset").on("click", function() {

                gameConditionStart();
                displayOutputUpdate();

                
            });
 
                var modal = document.getElementById('myModal');

                var span = document.getElementsByClassName("modalClose")[0];


                span.onclick = function() {
                    modal.style.display = "none";
                    
                    gameConditionStart();
                    displayOutputUpdate()

                }

                window.onclick = function(event) {
                    if (event.target == modal) {
                        modal.style.display = "none";
                        
                        gameConditionStart();
                        displayOutputUpdate();
                    }
                } 

            gameConditionStart();
            displayOutputUpdate();

        });