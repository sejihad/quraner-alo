const searchInput = document.querySelector("#search-input");
const submitBtn = document.querySelector("#submit-btn");
const suggestionsBox = document.querySelector(".suggetions");
const chatContainer = document.querySelector(".chat-container");
const deleteBtn = document.querySelector("#delete-btn");
const bodyTop = document.querySelector(".body-top");

const questions = [
  {
    question:
      "সূরা আল-ফাতিহা (১), আয়াত ১: শুরু করছি আল্লাহর নামে যিনি পরম করুণাময়, অতি দয়ালু।।",
    answer: {
      anal: `𝐀𝐧𝐚𝐥𝐲𝐬𝐢𝐬: এ আয়াতে আল্লাহর দুটো গুণ— 'পরম করুণাময়' এবং 'অতি দয়ালু'— উল্লেখ করা হয়েছে। অর্থাৎ, আল্লাহ সবসময় দয়ালু এবং আমাদের সাহায্যকারী।`,
      real: `𝐑𝐞𝐚𝐥𝐢𝐳𝐚𝐭𝐢𝐨𝐧: যে কোন কাজ শুরু করার আগে আল্লাহর নাম নিতে হবে, কারণ তিনি দয়ালু এবং করুণাময়।`,
    },
  },
  {
    question:
      "সূরা আল-ফাতিহা (১), আয়াত ২: যাবতীয় প্রশংসা আল্লাহ তাআলার যিনি সকল সৃষ্টি জগতের পালনকর্তা।",
    answer: {
      anal: "𝐀𝐧𝐚𝐥𝐲𝐬𝐢𝐬: এ আয়াতে আল্লাহকে সৃষ্টির মালিক বলা হয়েছে। আল্লাহ একমাত্র সৃষ্টির স্রষ্টা এবং তিনি সবকিছুর পালনকর্তা।",
      real: "𝐑𝐞𝐚𝐥𝐢𝐳𝐚𝐭𝐢𝐨𝐧: আল্লাহ সৃষ্টির মালিক, তাই তাঁরই সমস্ত প্রশংসা করা উচিত।",
    },
  },
  {
    question: "সূরা আল-ফাতিহা (১), আয়াত ৩: যিনি নিতান্ত মেহেরবান ও দয়ালু।",
    answer: {
      anal: " 𝐀𝐧𝐚𝐥𝐲𝐬𝐢𝐬: এ আয়াতে আল্লাহর মেহেরবান এবং দয়ালু গুণের কথা বলা হয়েছে। আল্লাহ আমাদের প্রতি অত্যন্ত দয়ালু এবং তিনি আমাদের সাহায্য করবেন।",
      real: "𝐑𝐞𝐚𝐥𝐢𝐳𝐚𝐭𝐢𝐨𝐧: আল্লাহ আমাদের জন্য দয়ালু, তাই তাঁর কাছে সাহায্য চাইতে হবে।",
    },
  },
];

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase().trim();

  // Clear the suggestion box
  suggestionsBox.innerHTML = "";

  if (query === "") {
    suggestionsBox.style.display = "none"; // Hide if input is empty
    return;
  }

  // Filter questions based on the input
  const filteredQuestions = questions.filter((item) =>
    item.question.toLowerCase().includes(query)
  );

  // Show suggestions if matches found
  if (filteredQuestions.length > 0) {
    filteredQuestions.forEach((item) => {
      const li = document.createElement("li");

      li.textContent = item.question;
      li.addEventListener("click", () => {
        searchInput.value = item.question; // Set clicked suggestion to input
        suggestionsBox.style.display = "none"; // Hide suggestions
      });
      suggestionsBox.appendChild(li);
    });
    suggestionsBox.style.display = "block";
  } else {
    suggestionsBox.style.display = "none"; // Hide if no matches found
  }
});

// Event listener for the submit button
submitBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();

  if (query === "") {
    alert("Please type a question before submitting.");
    return;
  }

  // Find the answer for the question
  const matchedQuestion = questions.find(
    (item) => item.question.toLowerCase() === query.toLowerCase()
  );

  if (matchedQuestion) {
    // Display the chat container and hide the body top
    chatContainer.style.display = "flex";
    bodyTop.style.display = "none";

    // Create a new ul element
    const ul = document.createElement("ul");

    // Create the question list item
    const questionLi = document.createElement("li");
    const questionP = document.createElement("p");
    const quesImg = document.createElement("img");
    questionLi.classList.add("ques"); // Add a class for styling
    questionP.textContent = matchedQuestion.question; // Set the question text
    questionLi.appendChild(questionP); // Add the question paragraph to the list item
    quesImg.src = "./img/user-fill.png"; // Set the user icon
    questionLi.appendChild(quesImg); // Add the icon to the list item

    // Create the answer list item
    const answerLi = document.createElement("li");
    const answerP = document.createElement("p");
    const ansImg = document.createElement("img");
    ansImg.src = "./img/icon.jpg"; // Set the answer icon
    answerLi.classList.add("ans"); // Add a class for styling

    // Initially set "Loading..." text
    answerP.textContent = "Loading...";
    answerLi.appendChild(ansImg); // Add the answer icon
    // Add the answer paragraph to the list item

    // Append question and answer list items to the ul
    ul.appendChild(questionLi);
    ul.appendChild(answerLi);

    // Append the ul to the chat container
    chatContainer.appendChild(ul);

    // Smooth scrolling to the newly added content
    chatContainer.scrollIntoView({ behavior: "smooth", block: "end" });

    // Clear the search input and hide suggestions box
    searchInput.value = "";
    suggestionsBox.style.display = "none";

    const fullAnswer = matchedQuestion.answer; // The answer object
    let currentIndex = 0;

    // Show "Loading..." initially
    answerP.textContent = "Loading...";
    answerLi.appendChild(answerP);

    // After 1 second, clear "Loading..." and start displaying the answer word-by-word
    setTimeout(() => {
      answerP.textContent = ""; // Clear "Loading..."
      const answers = [fullAnswer.anal, fullAnswer.real]; // Extract both 'anal' and 'real' answers
      let answerIndex = 0; // Start with the first answer (anal)

      // Create two separate <p> tags for each answer
      const analP = document.createElement("p");
      const realP = document.createElement("p");
      answerP.appendChild(analP);
      answerP.appendChild(realP);

      const wordInterval = setInterval(() => {
        const words = answers[answerIndex].split(" "); // Split the current answer into words
        if (currentIndex < words.length) {
          // Add one word at a time to the correct <p> tag
          if (answerIndex === 0) {
            analP.textContent += words[currentIndex] + " ";
          } else {
            realP.textContent += words[currentIndex] + " ";
          }
          currentIndex++;
        } else {
          // Move to the next answer (real) and add a line break between them
          if (answerIndex < answers.length - 1) {
            answerIndex++;
            currentIndex = 0; // Reset the index for the next answer
          } else {
            // Stop the interval once all answers are displayed
            clearInterval(wordInterval);
          }
        }

        // Ensure scrolling remains consistent as words are added
        chatContainer.scrollIntoView({ behavior: "smooth", block: "end" });
      }, 30); // Adjust the interval time (30ms per word)
    }, 500); // Show "Loading..." for 1 second before starting
  } else {
    // Alert if no matching question is found
    alert("No matching question found.");
  }
});
// ডিলিট বাটন ক্লিক করলে ইনপুট ক্লিয়ার এবং সাজেশন লুকানো
deleteBtn.addEventListener("click", () => {
  location.reload(); // Reloads the page
});
