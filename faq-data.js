function clean(v) {
  return (v || "").toString().trim();
}

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

function init() {

  const faqContainer = document.getElementById("faqContainer");
  const searchBox = document.getElementById("searchBox");
  const legalFilter = document.getElementById("legalFilter");
  const testFilter = document.getElementById("testFilter");
  const categoryFilter = document.getElementById("categoryFilter");

  // Populate dropdowns
  const legalSet = new Set();
  const testSet = new Set();
  const catSet = new Set();

  faqData.forEach(f => {
    legalSet.add(clean(f.legalType));
    testSet.add(clean(f.testType));
    catSet.add(clean(f.category));
  });

  legalSet.forEach(v => legalFilter.innerHTML += `<option value="${v}">${v}</option>`);
  testSet.forEach(v => testFilter.innerHTML += `<option value="${v}">${v}</option>`);
  catSet.forEach(v => categoryFilter.innerHTML += `<option value="${v}">${v}</option>`);

  function render(list) {
    faqContainer.innerHTML = "";

    list.forEach(f => {
      const div = document.createElement("div");
      div.className = "faq-item";

      div.innerHTML = `
        <b>${f.question}</b>
        <div class="answer" style="display:none;">${f.answer}</div>
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

  const filtered = faqData.filter(f => {
    return (
      (clean(f.question).toLowerCase().includes(s) ||
       clean(f.answer).toLowerCase().includes(s)) &&
      (l === "" || clean(f.legalType) === l) &&
      (t === "" || clean(f.testType) === t) &&
      (c === "" || clean(f.category) === c)
    );
  });

  render(filtered);
}

  searchBox.addEventListener("input", filter);
  legalFilter.addEventListener("change", filter);
  testFilter.addEventListener("change", filter);
  categoryFilter.addEventListener("change", filter);

  render(faqData);
}

window.onload = init;
