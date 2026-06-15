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

function initFAQ() {
  const faqContainer = document.getElementById("faqContainer");
  const searchBox = document.getElementById("searchBox");
  const legalFilter = document.getElementById("legalFilter");
  const testFilter = document.getElementById("testFilter");
  const categoryFilter = document.getElementById("categoryFilter");

  if (!faqContainer || !searchBox) {
    console.log("DOM not ready yet");
    return;
  }

  // Populate dropdowns
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

  function render(data) {
    faqContainer.innerHTML = "";
    data.forEach(item => {
      const div = document.createElement("div");
      div.className = "faq-item";

      div.innerHTML = `
        <b>${item.question}</b>
        <div class="answer" style="display:none;">${item.answer}</div>
      `;

      div.onclick = () => {
        const ans = div.querySelector(".answer");
        ans.style.display = ans.style.display === "block" ? "none" : "block";
      };

      faqContainer.appendChild(div);
    });
  }

  function filter() {
    const s = searchBox.value.toLowerCase();
    const l = legalFilter.value;
    const t = testFilter.value;
    const c = categoryFilter.value;

    const filtered = faqData.filter(i =>
      (i.question.toLowerCase().includes(s) ||
       i.answer.toLowerCase().includes(s)) &&
      (l === "" || i.legalType === l) &&
      (t === "" || i.testType === t) &&
      (c === "" || i.category === c)
    );

    render(filtered);
  }

  searchBox.onkeyup = filter;
  legalFilter.onchange = filter;
  testFilter.onchange = filter;
  categoryFilter.onchange = filter;

  render(faqData);
}

document.addEventListener("DOMContentLoaded", initFAQ);
