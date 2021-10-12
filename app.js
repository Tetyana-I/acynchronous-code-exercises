// Part 1: Number Facts
// Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number. 

// Figure out how to get data on multiple numbers in a single request.
// Make that request and when you get the data back, put all of the number facts on the page.

// Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page. 
// It’s okay if some of the facts are repeats.

$('#sbmBtn').on('click', function handleSubmit(evt) {
    evt.preventDefault();
    let num1=$("#numberOneInput").val();
    let num2 = $("#numberTwoInput").val();
    let num3 = $("#numberThreeInput").val();
    let num4 = $("#numberFourInput").val();
    // first task
    axios.get(`http://numbersapi.com/${num1}?json`)
    .then(res => {
        const taskOneResult = document.getElementById("first-result");
        taskOneResult.innerHTML = res.data.text;
    })
    .catch(err => {
        console.log("No facts for you!", err);
    })
    // second task
    axios.get(`http://numbersapi.com/${num1},${num2},${num3},${num4}`)
    .then(multi => {
        const taskTwoResult = document.getElementById("second-result");
        taskTwoResult.innerHTML = `${multi.data[num1]} <br> ${multi.data[num2]} <br> ${multi.data[num3]} <br> ${multi.data[num4]}`;
        console.log("It's really interesting that ", multi.data['13']);
    })
    .catch(err => {
        console.log("No facts for you!", err);
    })

    // third task
    let allFactsPromises = [];
    res = "";
    const taskThirdResult = document.getElementById("third-result");
    for (let i = 1; i < 5; i++) {
        allFactsPromises.push(axios.get(`http://numbersapi.com/${num1}?json`));
    }
    
    Promise.all(allFactsPromises)
    .then(facts => {
        facts.forEach(fact => {
            res = res + `${fact.data.text} <br>`
            });
        taskThirdResult.innerHTML = res
        })
    .catch(err => console.log(err));
    })

