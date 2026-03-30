const quotes = [
    { text: "삶이 있는 한 희망은 있다.", author: "키케로" },
    { text: "산다는 것 그것은 치열한 전투이다.", author: "로망로랑" },
    { text: "언제나 현재에 집중할수 있다면 행복할것이다.", author: "파울로 코엘료" },
    { text: "진정으로 웃으려면 고통을 참아야하며, 나아가 고통과 함께 놀 줄 알아야 한다.", author: "찰리 채플린" },
    { text: "직업에서 행복을 찾아라. 아니면 행복이 무엇인지 절대 모를 것이다.", author: "엘버트 허버드" },
    { text: "신은 용기있는자를 결코 버리지 않는다.", author: "켄러" },
    { text: "피할수 없으면 즐겨라.", author: "로버트 엘리엇" },
    { text: "먼저 자신을 비웃어라. 다른 사람에게 비웃음 사기 전에.", author: "엘사 맥스웰" },
    { text: "어리석은 자는 멀리서 행복을 찾고, 현명한 자는 자신의 발치에서 행복을 키워간다.", author: "제임스 오펜하임" },
    { text: "한번의 실패와 영원한 실패를 혼동하지 마라.", author: "F.스콧 피츠제럴드" }
];

const quoteCard = document.getElementById('quote-card');
const quoteText = document.getElementById('quote-text');
const authorText = document.getElementById('author-text');
const hintText = document.getElementById('hint-text');
const newQuoteBtn = document.getElementById('new-quote-btn');

let currentQuoteIndex = -1;

function getRandomQuote() {
    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * quotes.length);
    } while (newIndex === currentQuoteIndex);
    
    currentQuoteIndex = newIndex;
    return quotes[currentQuoteIndex];
}

function displayQuote() {
    const quote = getRandomQuote();
    
    // Reset state
    authorText.classList.add('hidden');
    hintText.style.opacity = '1';
    
    // Set text
    quoteText.textContent = `"${quote.text}"`;
    authorText.textContent = `- ${quote.author}`;
}

quoteCard.addEventListener('click', () => {
    if (authorText.classList.contains('hidden')) {
        authorText.classList.remove('hidden');
        hintText.style.opacity = '0';
    }
});

newQuoteBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent card click event
    displayQuote();
});

// Initial display
displayQuote();
