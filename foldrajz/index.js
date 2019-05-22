const q = [
    {
        question: "1. Melyik égtáj nincs benne egyik gazdasági körzet nevében sem? (USA)",
        answers: [
            {
                text: "Észak",
                correct: false
            },
            {
                text: "Dél",
                correct: false
            },
            {
                text: "Kelet",
                correct: true
            },
            {
				text: "Nyugat",
				correct: false
			}
        ]
    },
    {
        question: "2. Melyik körzetben található a Missisippi folyó?",
        answers: [
            {
                text: "Északi",
                correct: false
            },
            {
                text: "Déli",
                correct: false
            },
            {
                text: "Keleti",
                correct: false
            },
			{
				text: "Nyugati",
				correct: true
			}
        ]
    },
    {
        question: '3. Miről "híres" Los Alamos?',
        answers: [
            {
                text: "Vegyipar",
                correct: false
            },
            {
                text: "Atomkutatások",
                correct: true
            },
            {
                text: "Kereskedelem",
                correct: false
            },
            {
				text: "Holywood",
				correct: false
			}
        ]
    },
    {
        question: "4. Mi a Grand Canyon természeti értéke az alábbiak közül?",
        answers: [
            {
                text: "Hőenergia",
                correct: true
            },
            {
                text: "Szélenergia",
                correct: false
            },
            {
                text: "Vízenergia",
                correct: false
            }
        ]
    },
    {
        question: "5. Mi a Déli körzet éghajlata??",
        answers: [
            {
                text: "Mediterrán",
                correct: false
            },
            {
                text: "Óceáni",
                correct: false
            },
            {
                text: "Szubtrópusi monszun",
                correct: true
            }
        ]
    },
    {
        question: "6. Melyik városban található a világ legnagyobbb gabonatősdéje?",
        answers: [
            {
                text: "Dallas",
                correct: false
            },
            {
                text: "Chicago",
                correct: true
            },
            {
                text: "Florida",
                correct: false
            },
            {
				text: "New York",
				correct: false
			},
			{
				text: "Boston",
				correct: false
			}
        ]
    },
    {
        question: "7. Melyik évben lépett érvénybe az alkoholtilalom??",
        answers: [
            {
                text: "1918",
                correct: false
            },
            {
                text: "1919",
                correct: false
            },
            {
                text: "1920",
                correct: true
            },
            {
				text: "1921",
				correct: false
			},
			{
				text: "1922",
				correct: false
			},
			{
				text: "1967",
				correct: false
			}
        ]
    },
    {
        question: '8. Miről "híres" Detroit?',
        answers: [
            {
                text: "Textilipar",
                correct: false
            },
            {
                text: "Vegyipar",
                correct: false
            },
            {
                text: "Petrolkémia",
                correct: false
            },
            {
				text: "Autógyártás",
				correct: true
			}
        ]
    },
    {
        question: '9. Milyen színű a talaj a Középnyugati körzetben?',
        answers: [
            {
                text: "Fekete",
                correct: true
            },
            {
                text: "Barna",
                correct: false
            },
            {
                text: "Vörös",
                correct: false
            }
        ]
    },
    {
        question: "10. Melyik népcsoport él Salt Lake City környékén?",
        answers: [
            {
                text: "Zambó",
                correct: false
            },
            {
                text: "Mormonok",
                correct: true
            },
            {
                text: "Keresztények",
                correct: false
            },
            {
				text: "Baptisták",
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

