# Questions-Page

## Getting Started

1. Clone the repository
2. Join to the correct path of the clone
3. Install LiveServer extension from Visual Studio Code [OPTIONAL]
4. Click in "Go Live" from LiveServer extension

---

1. Clone the repository
2. Join to the correct path of the clone
3. Open index.html in your favorite navigator

---

1. Clone the repository
2. Join to the correct path of the clone
3. Execute: `yarn install`
4. Execute: `yarn dev`

## Description

I made a web page that works as a section of a future page which is a section of frequently asked questions or faq. When a question is opened it closes a question that was open.

## Technologies used

1. Typescript
2. CSS3
3. HTML5

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/106`](https://www.diegolibonati.com.ar/#/project/106)

## Video

https://user-images.githubusercontent.com/99032604/198900580-577c4f08-4686-4de3-99a7-d2fdc5e43465.mp4

## Documentation

Here we get all the buttons of all the questions that will help us to display the information of each question:

```
const btnsOpenQuestions = document.querySelectorAll(".question-btn") as NodeList;
```

Here is each question with all its elements:

```
const questionContainer = document.querySelectorAll(".question") as NodeList;
```

In this case we go through all the buttons and for each button we make an addEventListener that will be when the button is clicked. When you click on a button, the text element inside the question that is hidden, it will first check if there is any open answer. If there is it will take out the class to show and it will add this class to the question that the button was touched to show:

```
btnsOpenQuestions.forEach(function (btn) {
  btn.addEventListener("click", (e) => {
    const target = e.currentTarget as HTMLElement
    const oldQuestionOpen = target.parentElement?.parentElement;

    questionContainer.forEach(function (newQuestion) {
      const openNewQuestion = newQuestion as HTMLElement
      if (openNewQuestion !== oldQuestionOpen) {
        openNewQuestion.classList.remove("show-text");
      }
    });

    oldQuestionOpen?.classList.toggle("show-text");
  });
});
```
