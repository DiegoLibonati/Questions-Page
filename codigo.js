const btnsOpen = document.querySelectorAll(".question-btn");
const newsText = document.querySelectorAll(".question");



btnsOpen.forEach(function(btn){
    btn.addEventListener("click", (e)=>{

        const question = e.currentTarget.parentElement.parentElement;

        newsText.forEach(function(newQuestion){
            if (newQuestion !== question){
                newQuestion.classList.remove("show-text");
            }
        });

        question.classList.toggle("show-text");
});
});