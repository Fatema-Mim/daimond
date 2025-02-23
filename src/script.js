document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
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

document
  .getElementById("ringForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let isValid = true;
    let responseMessage = document.querySelector(".response");
    let submitButton = document.querySelector("button[type='submit']");

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

    // Disable button and show loading text
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    fetch("./sendMail.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json()) // Expecting JSON response
      .then((data) => {
        if (data.status === "success") {
          responseMessage.textContent =
            "Your request has been sent successfully!";
          responseMessage.classList.remove("text-red-500");
          responseMessage.classList.add("text-green-500");
          document.getElementById("ringForm").reset();
        } else {
          responseMessage.textContent =
            "Error sending message. Try again later.";
          responseMessage.classList.remove("text-green-500");
          responseMessage.classList.add("text-red-500");
        }
      })
      .catch(() => {
        responseMessage.textContent = "Error sending message. Try again later.";
        responseMessage.classList.remove("text-green-500");
        responseMessage.classList.add("text-red-500");
      })
      .finally(() => {
        // Restore button text after 3 seconds
        setTimeout(() => {
          submitButton.disabled = false;
          submitButton.textContent = "Submit";
          responseMessage.textContent = "";
          responseMessage.classList.remove("text-green-500", "text-red-500");
        }, 3000);
      });
  });

