
(function() {
    var questions = [
        {
            question: "Melyik állat a világ legnagyobb rágcsálója?",
            choices: ["Jaguár", "Kapibara", "Lajhár", "Gyűrűsfarkú maki"],
            correctAnswer: 1
        },
        {
            question: "Melyik a világ legnagyobb virága?",
            choices: ["Orchidea", "Bromélia", "Rafflesia", "Óriás-tündérrózsa"],
            correctAnswer: 2
        },
        {
            question: "Melyik madár képes hátrafelé is repülni?",
            choices: ["Ara papagáj", "Tarka tukán", "Hárpiasas", "Smaragd kolibri"],
            correctAnswer: 3
        },
        {
            question: "Milyen magasra nőhet meg a kapokfa?",
            choices: ["30 méterre", "50 méterre", "70 méterre", "100 méterre"],
            correctAnswer: 2
        },
        {
            question: "Melyik állat bundájában telepednek meg apró algák?",
            choices: ["Háromujjú lajhár", "Bengáli tigris", "Kapibara", "Jaguár"],
            correctAnswer: 0
        },
        {
            question: "Hogyan ejti csapdába a rovarokat a kancsóka?",
            choices: [
                "Ragacsos virágaival",
                "Csőszerű leveleivel",
                "Tüskés száraival",
                "Nagy leveleivel"
            ],
            correctAnswer: 1
        },
        {
            question: "Melyik állat képes külön-külön forgatni a szemeit?",
            choices: ["Zöld leguán", "Párduckaméleon", "Levelibéka", "Kvézál"],
            correctAnswer: 1
        },
        {
            question: "Mit gyűjtenek a broméliák a levélrózsáikban?",
            choices: ["Homokot", "Nektárt", "Esővizet", "Leveleket"],
            correctAnswer: 2
        },
        {
            question: "Milyen messzire hallatszik el a vörös bőgőmajom hangja?",
            choices: [
                "500 méterre",
                "1 kilométerre",
                "5 kilométerre",
                "10 kilométerre"
            ],
            correctAnswer: 2
        },
        {
            question: "Melyik folyóban található az óriás-tündérrózsa?",
            choices: ["Nílus", "Amazonas", "Duna", "Mississippi"],
            correctAnswer: 1
        }
    ];

    var questionCounter = 0;
    var selections = [];
    var quiz = $('#quiz');

    displayNext();

    $('#next').off('click').on('click', function(e) {
        e.preventDefault();

        if (quiz.is(':animated')) {
            return false;
        }

        choose();

        if (isNaN(selections[questionCounter])) {
            alert('Kérlek, válassz egy választ!');
            return false;
        }

        questionCounter++;
        displayNext();
    });

    $('#start').off('click').on('click', function(e) {
        e.preventDefault();

        if (quiz.is(':animated')) {
            return false;
        }

        questionCounter = 0;
        selections = [];

        $('#next').show();
        $('#start').hide();

        displayNext();
    });

    function createQuestionElement(index) {
        var qElement = $('<div>', {
            id: 'question'
        });

        var header = $('<h2>').text(
            'Kérdés ' + (index + 1) + ' / ' + questions.length
        );

        qElement.append(header);

        var question = $('<p>').text(questions[index].question);
        qElement.append(question);

        var radioButtons = createRadios(index);
        qElement.append(radioButtons);

        return qElement;
    }

    function createRadios(index) {
        var radioList = $('<ul>');

        for (var i = 0; i < questions[index].choices.length; i++) {
            var item = $('<li>');

            var input = $('<input>', {
                type: 'radio',
                name: 'answer',
                value: i,
                id: 'answer-' + index + '-' + i
            });

            var label = $('<label>', {
                for: 'answer-' + index + '-' + i
            }).text(questions[index].choices[i]);

            item.append(input);
            item.append(label);

            item.on('click', function(e) {
                if (!$(e.target).is('input')) {
                    $(this).find('input').prop('checked', true);
                }
            });

            radioList.append(item);
        }

        return radioList;
    }

    function choose() {
        var selected = $('input[name="answer"]:checked').val();

        if (selected !== undefined) {
            selections[questionCounter] = Number(selected);
        }
    }

    function displayNext() {
        quiz.fadeOut(150, function() {
            quiz.empty();

            if (questionCounter < questions.length) {
                var nextQuestion = createQuestionElement(questionCounter);

                quiz.append(nextQuestion);

                $('#next').show();

                if (questionCounter === questions.length - 1) {
                    $('#next a').text('Befejezés');
                } else {
                    $('#next a').text('Következő');
                }

            } else {
                quiz.append(displayScore());

                $('#next').hide();
                $('#start').show();
            }

            quiz.fadeIn(150);
        });
    }

    function displayScore() {
        var score = $('<div>', {
            id: 'question'
        });

        var numCorrect = 0;

        for (var i = 0; i < questions.length; i++) {
            if (selections[i] === questions[i].correctAnswer) {
                numCorrect++;
            }
        }

        var percentage = Math.round(
            (numCorrect / questions.length) * 100
        );

        score.append(
            $('<h2>').text('Kvíz befejezve!')
        );

        score.append(
            $('<p>').text(
                'Eredményed: ' + numCorrect + ' / ' +
                questions.length
            )
        );

        var message;

        if (percentage === 100) {
            message = 'Tökéletes! Minden kérdésre helyesen válaszoltál!';
        } else if (percentage >= 80) {
            message = 'Nagyszerű munka! Nagyon jól ismered az esőerdőket!';
        } else if (percentage >= 60) {
            message = 'Szép eredmény! Már nagyon sokat tudsz!';
        } else if (percentage >= 40) {
            message = 'Nem rossz! Érdemes még tanulnod!';
        } else {
            message = 'Ne csüggedj! Olvasd át újra az oldalakat!';
        }

        score.append(
            $('<p>').text(message)
        );

        return score;
    }

})();
