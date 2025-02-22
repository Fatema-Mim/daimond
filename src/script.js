document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
document.addEventListener("DOMContentLoaded", function () {
  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: "smooth" });
      }, 4000);
    }
  }
});



$(".responsive").slick({
  dots: false,
  infinite: true,
  speed: 300,
  slidesToShow: 3,
  slidesToScroll: 3,
  arrows: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
});

document.getElementById("ringForm").addEventListener("submit", function (event) {
  event.preventDefault();

  let isValid = true;
  let responseMessage = document.querySelector(".response");

  function validateField(id, errorId) {
    let field = document.getElementById(id);
    let errorMsg = document.getElementById(errorId);
    if (!field.value.trim()) {
      errorMsg.classList.remove("hidden");
      isValid = false;
    } else {
      errorMsg.classList.add("hidden");
    }
  }

  validateField("fullName", "nameError");
  validateField("email", "emailError");
  validateField("phone", "phoneError");
  validateField("address", "addressError");
  validateField("metalType", "metalError");
  validateField("budget", "budgetError");
  validateField("shape", "shapeError");
  validateField("timeline", "timelineError");
  validateField("message", "messageError");

  if (!isValid) return;

  let formData = new FormData(this);

  fetch("./src/sendmail.php", {
    method: "POST",
    body: formData,
  })
    .then(response => response.text())
    .then(data => {
      responseMessage.textContent = "Your request has been sent successfully!";
      responseMessage.classList.remove("text-red-500");
      responseMessage.classList.add("text-green-500");
      document.getElementById("ringForm").reset();
    })
    .catch(error => {
      responseMessage.textContent = "Error sending message. Try again later.";
      responseMessage.classList.remove("text-green-500");
      responseMessage.classList.add("text-red-500");
    });
});


