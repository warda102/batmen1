$(document).ready(function() {

    /*Start */ 
    $('#btn-start').click(function() {
        $('#quiz-container').slideDown(1000);
        $('#quiz').slideUp(2000);
    });

    /*Api*/ 
    $.ajax({
        url: 'https://batman-api.sayna.space/questions',
        datatype: 'json',
        success: function(questions) {

            let index = 0, point = 0; 
            let total = questions.length;

            $('#total').text(total); 
            setForm(questions[index].question, questions[index].response, 1); 

            
            $('#formulaire').submit(function(e) {
                e.preventDefault();

                let chooseResponse = isChooseResponse(questions, index);
                let isChoose = chooseResponse[0];
                let userResponse = chooseResponse[1];

                 
                if($('#index').text()==total-1){
                    $('#btn-next').val("Voir mon résultat");
                }
                
                if (index < (total - 1)) {

                    if (isChoose) { 
                        $('#quiz-container').slideUp(1000).slideDown(1000);
                        index++; 

                        setTimeout(() => {
                            if (index < total) {
                                setForm(questions[index].question, questions[index].response, (index + 1)); 
                            }
                        }, 200);
                        point = userResponse === true ? (point + 1) : point; 
                        userResponse = "false"; 
                        console.log(point);
                    }
                } else {

                    
                    if (isChoose) {
                        console.log(userResponse);
                        point = userResponse === true ? (point + 1) : point; 
                        console.log(point);
                        if (point <= (total / 3)) {
                            $('#titre').text("0" + point + "/" + total + " c'est pas tout à fait ça...");
                            $('#appreciation').text("Oula ! Heureusement que le Riddler est sous verrous... Il faut que vous vous repassiez les films, cette fois en enlevant peut-être le masque qui vous a bloqué la vue! Aller, rien n'est perdu !");
                        } else if (point <= (total / 2)) {
                            $('#titre').text(point + "/" + total + " pas mal !");
                            $('#appreciation').text("Encore un peu d'entraînement avec le Chevalier Noir vous serait bénéfique, mais vous pouvez marcher la tête haute, vos connaissances sont là. A vous de les consolider, foncez Gotham est votre de chasse !");
                        } else {
                            $('#titre').text(point + "/" + total + " bravo !");
                            $('#appreciation').text("Vous êtes véritablement un super fan de l'univers de Batman ! Comics, films, rien ne vous échappe. Bruce Wayne a de quoi être fier, Gotham est en paix et Batman peut prendre sa retraite, vous veillez aux grains");
                        }
                        $('#popup-result').css("display", "flex");
                    }
                }
            }); 
        },
        error: function(questions) {
            console.log(questions);
        },
    });

    /*Choix de reponse*/  

    function isChooseResponse(questions, index) {
        let userResponse = false; 
        /*Reponse checked */
        for (let i = 0; i < questions[index].response.length; i++) {
            if ($('#checkbox' + i).is(":checked")) {
                
                userResponse = questions[index].response[i].isGood;
                console.log(questions[index].response[i].isGood);
            }
        }
        return [true, userResponse];
    }

    
    function setForm(question, response, nbreQuiz) {
        $('#img-illustrate').attr("src", "img/Illustrations_game/Batgame_" + (2 + nbreQuiz) + ".png");
        $('#index').text(nbreQuiz);
        $('#quiz-question').empty();
        $('#quiz-question').append("<p class='question' id='question'></p>");
        $('#question').text(question);

        for (let i = 0; i < response.length; i++) {
            $('#quiz-question').append("<label for='checkbox" + i + "' class='response' id ='" + i + "'></label>");
            $('#' + i).append("<input type='checkbox' name='choix' id='checkbox" + i + "'>");
            $('#' + i).append("<p id='response" + i + "' > " + response[i].text + " </p>");
        }
        $('#quiz-question').append("<span id='error-message'></span>");
    }

});