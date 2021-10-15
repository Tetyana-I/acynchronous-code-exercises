// Part 1: Number Facts
// Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number. 

// Figure out how to get data on multiple numbers in a single request.
// Make that request and when you get the data back, put all of the number facts on the page.

// Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page. 
// It’s okay if some of the facts are repeats.

const taskOneResult = document.getElementById("first-result");
const taskTwoResult = document.getElementById("second-result");
const taskThirdResult = document.getElementById("third-result");

$('#sbmBtn').on('click', async function handleSubmitAsync(evt) {
    evt.preventDefault();
    let num1=$("#numberOneInput").val();
    let num2 = $("#numberTwoInput").val();
    let num3 = $("#numberThreeInput").val();
    let num4 = $("#numberFourInput").val();
    
    try {
        let n1 = await $.getJSON(`http://numbersapi.com/${num1}?json`);
        taskOneResult.innerHTML = n1.text;
        
        let n2 = await $.getJSON(`http://numbersapi.com/${num1},${num2},${num3},${num4}`);
        taskTwoResult.innerHTML = `${n2[num1]} <br> ${n2[num2]} <br> ${n2[num3]} <br> ${n2[num4]}`;

        let n3 = await Promise.all([
            $.getJSON(`http://numbersapi.com/${num1}?json`),
            $.getJSON(`http://numbersapi.com/${num1}?json`),
            $.getJSON(`http://numbersapi.com/${num1}?json`),
            $.getJSON(`http://numbersapi.com/${num1}?json`)
        ]);
        taskThirdResult.innerHTML = `${n3[0].text} <br> ${n3[1].text} <br> ${n3[2].text} <br> ${n3[3].text}`;
    }
    catch {
        console.log("No facts for you!", err);
    }
})    

