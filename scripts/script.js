const startButton = document.getElementById("start-button");
const mainWindow = document.getElementById("main");

startButton.addEventListener('click', function(){
    mainWindow.style.display = "flex";
    startButton.style.display = "none"
})

let currQuestion = 0;

const question = document.getElementById("question-title");
const choice1 = document.getElementById("choice1");
const choice2 = document.getElementById("choice2");
const choice3 = document.getElementById("choice3");
const choice4 = document.getElementById("choice4");

choice1.addEventListener('click', function(){
    answers[currQuestion] = "choice1";
    choice1.style.backgroundColor = "#6C63FF";
    choice2.style.backgroundColor = "#1A1A1A";
    choice3.style.backgroundColor = "#1A1A1A";
    choice4.style.backgroundColor = "#1A1A1A";
})

choice2.addEventListener('click', function(){
    answers[currQuestion] = "choice2";
    choice2.style.backgroundColor = "#6C63FF";
    choice1.style.backgroundColor = "#1A1A1A";
    choice3.style.backgroundColor = "#1A1A1A";
    choice4.style.backgroundColor = "#1A1A1A";
})

choice3.addEventListener('click', function(){
    answers[currQuestion] = "choice3";
    choice3.style.backgroundColor = "#6C63FF";
    choice1.style.backgroundColor = "#1A1A1A";
    choice2.style.backgroundColor = "#1A1A1A";
    choice4.style.backgroundColor = "#1A1A1A";
})

choice4.addEventListener('click', function(){
    answers[currQuestion] = "choice4";
    choice4.style.backgroundColor = "#6C63FF";
    choice1.style.backgroundColor = "#1A1A1A";
    choice2.style.backgroundColor = "#1A1A1A";
    choice3.style.backgroundColor = "#1A1A1A";
})

function updateQuestion(){
    const questionNumber = document.getElementById("question-number");
    questionNumber.innerText = (currQuestion + 1) + "/" + questions.length;

    question.innerText = questions[currQuestion].question;
    choice1.innerText = questions[currQuestion].answers.choice1.text;
    choice2.innerText = questions[currQuestion].answers.choice2.text;
    choice3.innerText = questions[currQuestion].answers.choice3.text;
    choice4.innerText = questions[currQuestion].answers.choice4.text;

    choice1.style.backgroundColor = "#1A1A1A";
    choice2.style.backgroundColor = "#1A1A1A";
    choice3.style.backgroundColor = "#1A1A1A";
    choice4.style.backgroundColor = "#1A1A1A";

    if (answers[currQuestion] != ""){
        document.getElementById(answers[currQuestion]).style.backgroundColor = "#6C63FF";
    }
}

const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
const submitButton = document.getElementById("submit-button")

prevButton.addEventListener('click', function(){
    currQuestion = (currQuestion - 1 >= 0) ? currQuestion - 1 : questions.length - 1;
    updateQuestion();

    if (currQuestion == questions.length - 1){
        submitButton.innerText = "Submit";
    }else{
        submitButton.innerText = "Next";
    }
})

nextButton.addEventListener('click', function(){
    currQuestion = (currQuestion + 1 <= questions.length - 1) ? currQuestion + 1 : 0;
    updateQuestion();

    if (currQuestion == questions.length - 1){
        submitButton.innerText = "Submit";
    }else{
        submitButton.innerText = "Next";
    }
})

function getScores(){
    const scores = {
        Analytical: 0,
        Creative: 0,
        Practical: 0,
        Social: 0
    };

    for (let i = 0; i < answers.length; i++){
        const selectedChoice = answers[i];
        const answerObj = questions[i].answers[selectedChoice];

        if (answerObj && answerObj.type){
            scores[answerObj.type]++;
        }
    }

    return scores;
}

function showMainIntelligence(scores) {
    // Find the highest score
    const maxScore = Math.max(...Object.values(scores));

    // Get all types with that score (handles ties)
    const topTypes = Object.keys(scores).filter(
        key => scores[key] === maxScore
    );

    // Create friendly text
    let text;
    if (topTypes.length === 1) {
        text = topTypes[0];
    } else {
        text = topTypes.join(', ');
    }

    // Display in the page
    document.getElementById('primary').innerText = text;
}

const postSubmitWindow = document.getElementById("post-submit-window");

submitButton.addEventListener('click', function(){
    currQuestion = (currQuestion + 1 <= questions.length - 1) ? currQuestion + 1 : currQuestion;
    updateQuestion();

    if (currQuestion == questions.length - 1){
        if (submitButton.innerText != "Submit"){
            submitButton.innerText = "Submit";
        }else{
            mainWindow.style.display = "none"
            postSubmitWindow.style.display = "flex";

            const scores = getScores();

            showMainIntelligence(scores);

            const ctx = document.getElementById('graph');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Analytical', 'Creative', 'Practical', 'Social'],
                    datasets: [{
                        label: 'Your Intelligence Profile',
                        data: [scores.Analytical, scores.Creative, scores.Practical, scores.Social],
                        backgroundColor: [
                            '#4A90E2', // Analytical - Blue
                            '#F5A623', // Creative - Orange
                            '#7ED321', // Practical - Green
                            '#BD10E0'  // Social - Purple
                        ],
                        borderRadius: 8,
                        borderWidth: 0,
                        barThickness: 60
                    }]
                },
                options: {
                    plugins: {
                        legend: {
                            display: false,
                        },
                        title: {
                            display: true,
                            text: 'Your Intelligence Profile',
                            font: {
                                size: 18,
                                weight: 'bold'
                            },
                            padding: 20
                        }

                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: { display: false }, // ❌ Hide horizontal gridlines
                            ticks: { display: false } // ❌ Remove y-axis numbers
                        },
                        x: {
                            grid: { display: false } // ❌ Hide vertical gridlines
                        }
                    },
                    animation: {
                        duration: 800,
                        easing: 'ease'
                    }
                }
            });
        }
    }
})

function loadQuestion(question){
    return `<div class="faq-question">
        <p class="faq-question-title">Q: ${question.question}</p>
        <p class="faq-answer">A: ${question.answer}</p>
    </div>`;
}

function loadFAQ(){
    const faqContainer = document.getElementById('explanation-window');

    faqContainer.innerHTML += faqQuestions.map(loadQuestion).join("");
}

document.addEventListener("DOMContentLoaded", () => {
    updateQuestion();
    loadFAQ();
})