const faqData = [
  {
    question: "How long does testing take?",
    answer: "Results are available in 2 business days.",
    legalType: "Legal",
    testType: "Paternity",
    category: "Turnaround Time",
    helpful: 0,
    notHelpful: 0
  },
  {
    question: "What is required for immigration testing?",
    answer: "Valid identification and chain of custody documentation are required.",
    legalType: "Legal",
    testType: "Immigration",
    category: "Requirements",
    helpful: 0,
    notHelpful: 0
  }
];

// --- DOM Elements ---
const faqContainer = document.getElementById("faqContainer");
const searchBox = document.getElementById("searchBox");
const legalFilter = document.getElementById("legalFilter");
const testFilter = document.getElementById("testFilter");
const categoryFilter = document.getElementById("categoryFilter");

// --- INIT ---
window.onload = function () {
  populateFilters();
  renderFAQs(faqData);
};

// --- Populate dropdowns dynamically ---
function populateFilters() {
  let legalSet = new Set();
  let testSet = new Set();
  let categorySet = new Set();

  faqData.forEach(item => {
    legalSet.add(item.legalType);
    testSet.add(item.testType);
    categorySet.add(item.category);
  });

  legalSet.forEach(val => {
    legalFilter.innerHTML += `<option value="${val}">${val}</option>`;
  });

  testSet.forEach(val => {
    testFilter.innerHTML += `<option value="${val}">${val}</option>`;
  });

  categorySet.forEach(val => {
    categoryFilter.innerHTML += `<option value="${val}">${val}</option>`;
  });
}

// --- Main filter function ---
function filterFAQs() {
  let search = searchBox.value.toLowerCase();
  let legal = legalFilter.value;
  let test = testFilter.value;
  let category = categoryFilter.value;

  let filtered = faqData.filter(item => {
    return (
      (item.question.toLowerCase().includes(search) ||
       item.answer.toLowerCase().includes(search)) &&
      (legal === "" || item.legalType === legal) &&
      (test === "" || item.testType === test) &&
      (category === "" || item.category === category)
    );
  });

  renderFAQs(filtered);
}

// --- Render FAQ cards ---
function renderFAQs(data) {
  faqContainer.innerHTML = "";

  data.forEach(item => {
    faqContainer.innerHTML += `
      <div class="faq-item" onclick="toggleAnswer(this)">
        <strong>${item.question}</strong>
        <div class="answer">${item.answer}</div>
        <div class="feedback">
          <button onclick="event.stopPropagation(); feedback(true)">👍</button>
          <button onclick="event.stopPropagation(); feedback(false)">👎</button>
        </div>
      </div>
    `;
  });
}

// --- Toggle answer visibility ---
function toggleAnswer(el) {
  let answer = el.querySelector(".answer");
  answer.style.display = answer.style.display === "block" ? "none" : "block";
}

// --- Feedback (placeholder for now) ---
function feedback(helpful) {
  alert(helpful ? "Thanks for your feedback!" : "We'll improve this answer.");
}
