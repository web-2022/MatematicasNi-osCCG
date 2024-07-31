// HEADER


function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
  navLinks.classList.toggle('active');
}



//SUMAS
function getRandomNumber(max) {
    return Math.floor(Math.random() * max) + 1;
}

function getRandomOptions(correctResult, limit) {
    let options = new Set();
    options.add(correctResult);
    
    while (options.size < 5) {
        let randomOption = getRandomNumber(limit * 2) - 1;
        if (randomOption !== correctResult && randomOption > 0 && randomOption < limit) {
            options.add(randomOption);
        }
    }
    
    return Array.from(options).sort(() => Math.random() - 0.5);
}

function updateResult(limit) {
    let num1, num2, result;
    do {
        num1 = getRandomNumber(limit);
        num2 = getRandomNumber(limit);
        result = num1 + num2;
    } while (result <= limit);

    document.getElementById('result').textContent = `${num1} + ${num2} = ?`;

    const options = getRandomOptions(result, limit);
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';
    const feedbackContainer = document.getElementById('feedback');
    feedbackContainer.textContent = '';
    options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.className = 'btn btn-primary m-2';
        button.addEventListener('click', () => {
            if (option === result) {
                feedbackContainer.textContent = '¡Correcto!';
                feedbackContainer.className = 'feedback text-success';
                setTimeout(() => updateResult(limit), 2000); // Espera 2 segundos y genera una nueva suma
            } else {
                feedbackContainer.textContent = 'Incorrecto. Inténtalo de nuevo.';
                feedbackContainer.className = 'feedback text-danger';
            }
        });
        optionsContainer.appendChild(button);
    });
}

document.querySelectorAll('.clickImg').forEach(function(image) {
    image.addEventListener('click', function() {
        let limit;
        if (this.id === 'img1') {
            limit = 10;
        } else if (this.id === 'img2') {
            limit = 20;
        } else if (this.id === 'img3') {
            limit = 100;
        }
        updateResult(limit);
    });
});
//.....Fin de SUMAS

//CONTAR-PELOTAS
document.getElementById('generate-btn-10').addEventListener('click', () => generateBalls(10));
document.getElementById('generate-btn-20').addEventListener('click', () => generateBalls(20));
document.getElementById('generate-btn-30').addEventListener('click', () => generateBalls(30));

function generateBalls(maxBalls) {
  const ballContainer = document.getElementById('ball-container');
  const optionsContainer = document.getElementById('options');
  const resultContainer = document.getElementById('result');
  
  ballContainer.innerHTML = ''; // Clear existing balls
  optionsContainer.innerHTML = ''; // Clear existing options
  resultContainer.innerHTML = ''; // Clear existing result message
  
  const numBalls = Math.floor(Math.random() * maxBalls) + 1; // Random number between 1 and maxBalls
  const rows = 3; // Number of rows
  const ballsPerRow = Math.ceil(numBalls / rows); // Number of balls per row

  for (let i = 0; i < numBalls; i++) {
    const ball = document.createElement('div');
    ball.className = 'ball';
    ball.style.width = '40px'; // Fixed size for uniformity
    ball.style.height = '40px'; // Fixed size for uniformity

    // Calculate position in grid
    const row = Math.floor(i / ballsPerRow);
    const column = i % ballsPerRow;

    // Adjust position and size
    ball.style.top = `${row * 60}px`; // 80px gap between rows
    ball.style.left = `${column * 60}px`; // 80px gap between columns

    ballContainer.appendChild(ball);
  }

  // Generate random options
  const correctAnswer = numBalls;
  const options = new Set();

  while (options.size < 4) {
    const randomOption = Math.floor(Math.random() * maxBalls) + 1;
    options.add(randomOption);
  }

  // Ensure the correct answer is included
  options.add(correctAnswer);

  // Shuffle options
  const shuffledOptions = Array.from(options).sort(() => Math.random() - 0.5);

  // Create option buttons
  shuffledOptions.forEach(option => {
    const button = document.createElement('button');
    button.className = 'option-btn';
    button.textContent = option;
    
    button.addEventListener('click', () => {
      if (option === correctAnswer) {
        resultContainer.textContent = '¡Correcto!';
        resultContainer.style.color = '#007bff'; // Use the same color as the buttons
        
        // Generate new balls after 3 seconds
        setTimeout(() => generateBalls(maxBalls), 3000);
      } else {
        resultContainer.textContent = 'Intenta de nuevo.';
        resultContainer.style.color = '#007bff'; // Use the same color as the buttons
      }
    });

    optionsContainer.appendChild(button);
  });
}
