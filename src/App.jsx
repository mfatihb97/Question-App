import React, { useState, useEffect } from 'react';
import './App.css';

const questions = [
  {
    question: "Çin Seddini oluşturan taşlar birbirine ne ile tutturulmuştur?",
    options: ["Bambu Harcı", "Anne Duası", "Pirinç Unu", "Noodle"],
    answer: "Pirinç Unu",
    media: "cin-seddi.jpg",
  },
  {
    question: "İlk Pamuk şekeri bulan kişinin mesleği nedir?",
    options: ["Gıda Mühendisi", "Diş Doktoru", "Ev Hanımı", "Güzellik Uzmanı"],
    answer: "Diş Doktoru",
    media: "pamuk.jpg",
  },
  {
    question:
      "Tarkan'ın 'Hüp' klibini izledikten sonra gaza gelip 'Tarkan keşke beni hüpletseydi' diye açıklamda bulunan kişi kimdir?",
    options: ["Gülben Ergen", "Hülya Avşar", "Harika Avcı", "Sevtap Parman"],
    answer: "Gülben Ergen",
    media: "tarkan.jpg",
  },
  {
    question: "Pteronofobi nedir?",
    options: [
      "Yeşil ışık yanar yanmaz korna çalacak korkusu",
      "Fakir kalma korkusu",
      "Taksi bulamama korkusu",
      "Kuş tüyüyle gıdıklanma korkusu",
    ],
    answer: "Kuş tüyüyle gıdıklanma korkusu",
    media: "fobi.jpg",
  },
  {
    question:
      "Ortalama ömürleri 5 yıl olan Japon balıklarının en uzun yaşayanı Tish, bütün istatistikleri alt üst ederek kaç yıl boyunca hayata tutunmayı başarmıştır?",
    options: ["43", "78", "23", "99"],
    answer: "43",
    media: "balik.jpg",
  },
  {
    question:
      "90'lara damgasını vuran 'Bandıra Bandıra' şarkısının söz yazarı kimdir?",
    options: ["Sezen Aksu", "Sibel Can", "Mustafa Sandal", "Bülent Ersoy"],
    answer: "Mustafa Sandal",
    media: "bandira.jpg",
  },
  {
    question:
      "Hangi şarkıcımız yine kendisi gibi şarkıcı olan sevgilisinden ayrıldıktan sonra tam evinin karşısındaki apartmanın tamamını kendi posteriyle kaplatmıştır?",
    options: ["Hande Yener", "Hadise", "Gülşen", "Simge"],
    answer: "Hadise",
    media: "billboard.jpg",
  },
  {
    question: "Antik Roma'da kadınlar parfüm olarak ne kullanıyordu?",
    options: ["Gül Suyu", "Bal", "Gladyatör Teri", "Kan"],
    answer: "Gladyatör Teri",
    media: "parfum.jpg",
  },
  {
    question: "T-Rex'in yaşayan en yakın akrabası aşağıdakilerden hangisidir?",
    options: ["İnekler", "Tavuklar", "Timsahlar", "Köpekler"],
    answer: "Tavuklar",
    media: "trex.jpg",
  },
  {
    question:
      "Her şeyin olduğu gibi mutluluğun da fobisi varmış. Bu fobiye ne ad verilir?",
    options: ["Çerofobi", "Euphobia", "Felicifobia", "Mutluluk Korkusu"],
    answer: "Çerofobi",
    media: "fobi.jpg",
  },
];

function App() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timer, setTimer] = useState(30);
  const [optionsDisplayed, setOptionsDisplayed] = useState(false);
  const [resultMessage, setResultMessage] = useState("");
  const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(''));

  useEffect(() => {
    let interval;

    if (quizStarted && !showScore) {
      interval = setInterval(() => {
        if (timer > 0) {
          setTimer(timer - 1);
        } else {
          handleAnswerButtonClick('');
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [quizStarted, showScore, timer]);

  useEffect(() => {
    if (quizStarted && !showScore) {
      setOptionsDisplayed(false);

      const optionsDisplayTimeout = setTimeout(() => {
        setOptionsDisplayed(true);
      },1000) 

      return () => clearTimeout(optionsDisplayTimeout);
    }
  }, [currentQuestion, quizStarted, showScore]);

  useEffect(() => {
    if (showScore) {
      let resultMessage;

      if (score >= 7) {
        resultMessage = "Akıl sağlığın yerinde değil, bir doktora görün istersen.";
      } else if (score >= 3) {
        resultMessage = "Kendine gel, bu gidiş hiç iyi bir gidiş değil !!";
      } else {
        resultMessage = "Merhaba normal insan, bu mentaliteni umarım ömrünün sonuna kadar sürdürürsün :)";
      }

      setResultMessage(resultMessage);
    }
  }, [score, showScore]);

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const handleAnswerButtonClick = (selectedAnswer) => {
    if (selectedAnswer === questions[currentQuestion].answer) {
      setScore(score + 1);

      setUserAnswers(prevUserAnswers => {
        const newUserAnswers = [...prevUserAnswers];
        newUserAnswers[currentQuestion] = selectedAnswer;
        return newUserAnswers;
      });
    }

    setTimer(30); 

    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const handleRestartQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setTimer(30);
    setOptionsDisplayed(false);
    setResultMessage("");
  };

  

  return (
    <div className="app">
      {!quizStarted ? (
        <div className="start-screen">
          <h1>Kendini Denemeye Hazır mısın?</h1>
          <p>Şimdi 10 tane soruluk bir teste başlayacaksın. Soruları ÖSYM başkanı haz..Şaka şaka zart zurt 10 soru var. Alabileceğin en iyi sonuç hepsini yanlış yapman.
             Bu soruların cevaplarını biliyorsan kendini bir sorgulamanı tavsiye ederim.</p>
          <button id='start' onClick={handleStartQuiz}>Quize Başla</button>
        </div>
      ) : showScore ? (
        <div className="score-section">
          <h2>Quiz Tamamlandı</h2>
          <p>Puanınız: {score} / {questions.length}</p>
          <div className="result-section">
              <p>{resultMessage}</p>
            </div>
        <div className="answers-section">
          <h3>Verilen Cevaplar:</h3>
          <ul>
            {questions.map((question, index) => (
              <li key={index}>
                <strong>{index + 1}.</strong> {question.question}
                <div>
                  <strong>Verilen Cevap:</strong> {question.options.find(option => option === userAnswers[index]) || "Cevap verilmedi"}
                </div>
                <div>
                  <strong>Doğru Cevap:</strong> {question.answer}
                </div>
              </li>
            ))}
          </ul>
        </div>
          <button onClick={handleRestartQuiz}>Yeniden Başlat</button>  
        </div>
      ) : (
        <div>
          <div className="question-section">
            <div className="current-question">Şu anki Soru: {currentQuestion + 1}</div>
            <div className="question-text">{questions[currentQuestion].question}</div>
            <img
              src={`assets/pictures/${questions[currentQuestion].media}`}
              alt={`Question ${currentQuestion + 1}`}
              className="question-image"
            />
            <p>Süre: {timer} saniye</p>
            {optionsDisplayed && (
              <div className="answer-section">
                {questions[currentQuestion].options.map((option, index) => (
                  <button key={index} onClick={() => handleAnswerButtonClick(option)}>
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
