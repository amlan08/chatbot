self.addEventListener('message', (event) => {
    const getAnswer = (data) => {
        const words = data.split(" ");
        const salutations = ["hi", "greetings", "hello"];
        const questions = ["what", "where", "when", "who", "how", "?"];
        const pandaquests = ["bye", "good bye", "goodnight", "cool"];
        let isGreeting = false;
        let isAsking = false;
        let isPandaquests = false;
        
        words.forEach(element => {
            const elementSanitized = element.toLowerCase();
            
            if (salutations.includes(elementSanitized)) {
                isGreeting = true;
            }
            if (questions.includes(elementSanitized)) {
                isAsking = true;
            }
            if (pandaquests.includes(elementSanitized)) {
                isPandaquests = true;
            }
        });
    
        if (isPandaquests) {
                return `Thank You`;
                        
        } else if (isGreeting) {
            return `Oh, hello there. How can i assist you.`;
        } else {
            const url = `/api/v1.0/get-cluster/${encodeURIComponent(data)}`;
            return fetch(url)
            .then(response => response.json()) // parse the JSON response
            .then(json => {
              const answer = json.answer;
              const returnValue = `
                  ${answer}
                `;
                return returnValue;
            // const lines = answer.split('\n'); // split the answer into individual lines
            // for (let i = 0; i < lines.length; i++) {
            // const newAnswerContainer = document.createElement("div");
            // newAnswerContainer.className = "answerContainer";
            // const newParagraph = document.createElement("p");
            // newParagraph.className = "answer";
            // newParagraph.innerHTML = lines[i];
            // newParagraph.style.width = `${lines[i].length}ch`;
            // newParagraph.style.WebkitAnimation = `typing 2s steps(${lines[i].length}, end), blink-caret .3s steps(${lines[i].length}, end) alternate`;
            // newAnswerContainer.appendChild(newParagraph);

            //  const span = document.createElement("span");
            //  newAnswerContainer.appendChild(span);

            // chatGPTResp.appendChild(newAnswerContainer);
            // }
            // return answer;
             })
            .catch(error => {
              return "Sorry, I couldn't find an answer to your question.";
            });
        }
        //return "The answer is 42";
    }   
    const { data } = event;
    console.log("received: data", data);
    
    const answer = getAnswer(data);
    if (answer instanceof Promise) {
        answer.then(result => self.postMessage(result));
    } else {
        self.postMessage(answer);
    }
});

// self.addEventListener('message', (event) => {
//     const getAnswer = (data) => {
//         const words = data.split(" ");
//         const salutations = ["hi", "greetings", "hello"];
//         const questions = ["what", "where", "when", "who", "how", "?"];
//         const pandaquests = ["bye", "good bye", "goodnight", "cool"];
//         let isGreeting = false;
//         let isAsking = false;
//         let isPandaquests = false;
        
//         words.forEach(element => {
//             const elementSanitized = element.toLowerCase();
            
//             if (salutations.includes(elementSanitized)) {
//                 isGreeting = true;
//             }
//             if (questions.includes(elementSanitized)) {
//                 isAsking = true;
//             }
//             if (pandaquests.includes(elementSanitized)) {
//                 isPandaquests = true;
//             }
//         });
    
//         if (isPandaquests) {
//                 return `Thank You`;
                        
//         } else if (isGreeting) {
//             return `Oh, hello there. How can i assist you.`;
//         } else {
//             const url = `/api/v1.0/get-cluster/${encodeURIComponent(data)}`;
//             return fetch(url)
//             .then(response => response.json()) // parse the JSON response
//             .then(json => {
//               const answer = json.answer;
//             //   const chatContainer = document.getElementById("chat-container");
//             //     const newAnswerContainer = document.createElement("div");
//             //     newAnswerContainer.className = "answerContainer";
//             //    const sentences = answer.split(". ");
//             //    sentences.forEach(sentence => {
//             // //   const chatMessage = document.createElement("p");
//             // const newParagraph = document.createElement("p");
//             // newParagraph.className = "answer";
//             // newParagraph.innerHTML = event.data;
//             // newParagraph.style.width = `${event.data.length}ch`;
//             // newParagraph.textContent = sentence.trim();
//             // newParagraph.style.WebkitAnimation = `typing 2s steps(${event.data.length}, end), blink-caret .3s steps(${event.data.length}, end) alternate`;
//             // newAnswerContainer.appendChild(newParagraph);

//             // const span = document.createElement("span");
//             // newAnswerContainer.appendChild(span);

//             // chatGPTResp.appendChild(newAnswerContainer);
//             // window.scrollTo(0, document.body.scrollHeight);

//             // arrowSend.style.display = "none";
//             // loadingDot1.style.animation = `load 1s steps(${event.data.length})`;

//             // loadingDot2.style.animation = `load 1s steps(${event.data.length})`;
//             // loadingDot2.style.animationDelay = `0.2s`;

//             // loadingDot3.style.animation = `load 1s steps(${event.data.length})`;
//             // loadingDot3.style.animationDelay = `0.4s`;
//             //  //  newParagraph.classList.add("chat-message");
//             // //   chatContainer.appendChild(chatMessage);
//             // });
//                 return '${answer}';
//              })

//             .catch(error => {
//               return "Sorry, I couldn't find an answer to your question.";
//             });
//         }
        
//         //return "The answer is 42";
//     }
//     const { data } = event;
//     console.log("received: data", data);
//     }
//     const answer = getAnswer(data);
//     if (answer instanceof Promise) {
//         answer.then(result => self.postMessage(result));
//     } else {
//         self.postMessage(answer);
//     }
// });
