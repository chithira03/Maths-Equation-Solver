const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});

signInButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});

// Get elements for sign-up and sign-in forms
const signUpForm = document.getElementById('signUpForm');
const signInForm = document.getElementById('signInForm');

// Redirect after successful signup
signUpForm?.addEventListener('submit', (e) => {
    e.preventDefault();  // Prevent actual form submission
    window.location.href = 'homepage.html';  // Redirect to the homepage
});

// Redirect after successful login
signInForm?.addEventListener('submit', (e) => {
    e.preventDefault();  // Prevent actual form submission
    window.location.href = 'homepage.html';  // Redirect to the homepage
});


function showSolution() {
    // Slide the answer panel over and resize the input canvas
    document.getElementById("answerCanvas").style.right = "0";
    document.getElementById("canvasContainer").style.width = "50%";
  }

  function closeSolution() {
    document.getElementById("answerCanvas").style.right = "-100%";
    document.getElementById("canvasContainer").style.width = "100%";
  }
  
// Set up variables and references to elements
const canvas = document.getElementById("inputCanvas");
const ctx = canvas.getContext("2d");
let drawing = false;
let snapshots = []; // Array to hold snapshots for undo

// Set canvas dimensions based on CSS size
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

// Event listeners for drawing
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);

// Event listener for Undo button
document.getElementById("undoBtn")?.addEventListener("click", undo);

// Function to start drawing
function startDrawing(event) {
    drawing = true;
    saveSnapshot(); // Save current state for undo
    ctx.beginPath();
    const { x, y } = getMousePos(event);
    ctx.moveTo(x, y); // Start drawing from current mouse position
}

// Function to draw on canvas
function draw(event) {
    if (!drawing) return;

    const { x, y } = getMousePos(event);
    ctx.lineTo(x, y);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#333";
    ctx.lineCap = "round"; // Rounded edges for smoother handwriting effect
    ctx.stroke();
}

// Stop drawing when mouse is released or exits canvas
function stopDrawing() {
    drawing = false;
    ctx.closePath();
}

// Function to save current canvas state for undo
function saveSnapshot() {
    snapshots.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
}

// Undo function to restore the last saved canvas state
function undo() {
    if (snapshots.length > 0) {
        const lastSnapshot = snapshots.pop();
        ctx.putImageData(lastSnapshot, 0, 0); // Restore last saved state
    }
}

// Function to get the accurate cursor position within the canvas
function getMousePos(event) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}
