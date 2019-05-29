const q = [
    {
        question: "1. Melyik szóból származik a romantika?",
        answers: [
            {
                text: "Alma",
                correct: false
            },
            {
                text: "Regény",
                correct: true
            },
            {
                text: "Művászet",
                correct: false
            },
            {
				text: "Irodalom",
				correct: false
			}
        ]
    },
    {
        question: "2. Mikor terjedt el?",
        answers: [
            {
                text: "XVIII. század vége",
                correct: true
            },
            {
                text: "XIX. század eleje",
                correct: false
            },
            {
                text: "XX. század vége",
                correct: false
            },
			{
				text: "XVIII. század eleje",
				correct: false
			}
        ]
    },
    {
        question: '3. Melyik ország(okból) indult?',
        answers: [
            {
                text: "Franciaország",
                correct: false
            },
            {
                text: "Magyarország",
                correct: false
            },
            {
                text: "Anglia",
                correct: true
            },
            {
				text: "Németország",
				correct: true
			},
			{
				text: "Itália",
				correct: false
			}
        ]
    },
    {
        question: "4. Mi volt a közvetlen előzménye?",
        answers: [
            {
                text: "Barokk kor",
                correct: false
            },
            {
                text: "Klasszicizmus",
                correct: true
            },
            {
                text: "Reneszánsz",
                correct: false
            }
        ]
    },
    {
        question: "5. Mi a romantikus alkotó alapvető életérzése?",
        answers: [
            {
                text: "Boldogság",
                correct: false
            },
            {
                text: "Gonoszság",
                correct: false
            },
            {
                text: "Csalódottság",
                correct: true
            }
        ]
    },
    {
        question: "6. Az alábbi forradalmak közül melyik(ek) forradalom kapcsolódik ehhez a korhoz?",
        answers: [
            {
                text: "1848-as",
                correct: false
            },
            {
                text: "Társadalmi",
                correct: true
            },
            {
                text: "Gazdasági",
                correct: false
            },
            {
				text: "Ipari",
				correct: true
			},
			{
				text: "Közlekedési",
				correct: false
			}
        ]
    },
    {
        question: "7. Hova menekülnek a romantikus költők saját világuk elől?",
        answers: [
            {
                text: "Haza",
                correct: false
            },
            {
                text: "Jövő",
                correct: false
            },
            {
                text: "Múlt",
                correct: true
            }
        ]
    },
    {
        question: '8. Lezárják a művet a költők ebben a korban?',
        answers: [
            {
                text: "Igen",
                correct: false
            },
            {
                text: "Nem",
                correct: true
            }
        ]
    },
    {
        question: '9. Mi jellemzi a romantikát?',
        answers: [
            {
                text: "Ellentétek",
                correct: true
            },
            {
                text: "Szenedély",
                correct: false
            },
            {
                text: "Humor",
                correct: false
            }
        ]
    },
    {
        question: "10. Mely ezköz kedvelt a költői nyelvben",
        answers: [
            {
                text: "Metafora",
                correct: false
            },
            {
                text: "Allegória",
                correct: true
            },
            {
                text: "Líra",
                correct: false
            }
        ]
    }
]

let score = 0
let answered = 0
let maxScore = q.length

function validate(i, n) {
    if(q[i].validated) return
    q[i].validated = true
    let corr = q[i].answers[n].correct
    let me = document.querySelectorAll('.qclass')[i]
    if(corr) {
        me.style.backgroundColor = "#00ff00"
        score++
    } else {
        me.style.backgroundColor = "#ff0000"
    }
    answered++
    setTimeout(_ => {
        me.style.display = "none"
        if(answered == maxScore) {
            let main = document.getElementById("injectionDiv")
    
            let grade = 0
            let message = ""
            let k = score / maxScore

            // 40 55 70 80
            if(k < 0.4) {
                grade = 1
                message = "TANUJJÁ"
            } else if(k < 0.55) {
                grade = 2
                message = "júr a dzséniusz"
            } else if(k < 0.70) {
                grade = 3
                message = "júr ívön mór dzsíniüsz"
            } else if(k < 0.80) {
                grade = 4
                message = "júr dö mószt dszínüször"
            } else {
                grade = 5
                message = "GG"
            }

            let scoreText = document.createElement("div")
            scoreText.setAttribute("class", "score")
            scoreText.innerHTML = `Elért eredményed<br>${score} / ${maxScore}<br>Érdemjegy: ${grade}<br>${message}`

            main.insertBefore(scoreText, main.childNodes[0])
            
            let n = 1
            document.querySelectorAll('.qclass').forEach(r => {
                setTimeout(function() {
                    r.style.display = "flex"
                }, 1000 * n)
                n++
            })
        }
    }, 600)
}

function render(e) {
    for(var i in e) {
        let main = document.getElementById("injectionDiv")

        let qclass = document.createElement("div")
        qclass.setAttribute("class", "qclass")


        let qtext = document.createElement("p")
        qtext.setAttribute("class", "qtext")
        qtext.innerHTML = e[i].question
        qclass.appendChild(qtext)

        let aclass = document.createElement("div")
        aclass.setAttribute("class", "aclass")

        let c = 0

        e[i].answers.forEach(j => {
            let tmp = document.createElement("div")
            tmp.setAttribute("class", "atext")
            tmp.setAttribute("onclick", `validate(${i}, ${c})`)
            tmp.innerHTML = j.text
            
            aclass.appendChild(tmp)
            c++
        })
        
        qclass.appendChild(aclass)
        main.appendChild(qclass)
    }
}

window.onload = function() {
    render(q)
}

