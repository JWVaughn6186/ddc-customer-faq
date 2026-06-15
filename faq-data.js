const faqData = [
  {
    question: "How long does testing take?",
    answer: "2 business days.",
    legalType: "Legal",
    testType: "Paternity",
    category: "Turnaround"
  },
  {
    question: "What is required for immigration testing?",
    answer: "Valid ID and chain of custody required.",
    legalType: "Legal",
    testType: "Immigration",
    category: "Requirements"
  }
];

// Wait until DOM is fully ready
document.addEventListener("DOMContentLoaded", function () {

  const faqContainer = document.getElementById("faqContainer");
  const searchBox = document.getElementById("searchBox");
  const legalFilter = document.getElementById("legalFilter");
  const testFilter = document.getElementById("testFilter");
  const categoryFilter = document.getElementById("categoryFilter");

  function populateFilters() {
    const legalSet = new Set();
    const testSet = new Set();
    const catSet = new Set();

    faqData.forEach(item => {
      legalSet.add(item.legalType);
      testSet.add(item.testType);
      catSet.add(item.category);
    });

    legalSet.forEach(v => legalFilter.innerHTML += `<option value="${v}">${v}</option>`);
    testSet.forEach(v => testFilter.innerHTML += `<option value="${v}">${v}</option>`);
    catSet.forEach(v => categoryFilter.innerHTML += `<option value="${v}">${v}</option>`);
  }

  function renderFAQs(data) {
    faqContainer.innerHTML = "";

    data.forEach(item => {
      const div = document.createElement("div");
      div.className = "faq-item";

      div.innerHTML = `
        <strong>${item.question}</strong>
        <div class="answer" style="display:none;">${item.answer}</div>
      `;

      div.addEventListener("click", function () {
        const ans = div.querySelector(".answer");
        ans.style.display = ans.style.display === "block" ? "none" : "block";
      });

      faqContainer.appendChild(div);
    });
  }

  function filterFAQs() {
    const search = searchBox.value.toLowerCase();
    const legal = legalFilter.value;
    const test = testFilter.value;
    const category = categoryFilter.value;

    const filtered = faqData.filter(item => {
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

  // Hook events
  searchBox.addEventListener("keyup", filterFAQs);
  legalFilter.addEventListener("change", filterFAQs);
  testFilter.addEventListener("change", filterFAQs);
  categoryFilter.addEventListener("change", filterFAQs);

  // INIT
  populateFilters();
  renderFAQs(faqData);
});
