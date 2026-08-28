const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

const scriptURL =
  "https://script.google.com/macros/s/AKfycbysQH8mz8hgRpEC_O9JvbQMg_NRqTtH6Bfl6gUOCrcOLu8rgwSUxMAGhol7ILjvPw/exec";

contactForm.addEventListener("submit", async function (event) {

  event.preventDefault();

  const submitButton =
    contactForm.querySelector(".contact-submit-btn");

  submitButton.disabled = true;
  submitButton.innerHTML = "Sending...";

  const formData = new FormData(contactForm);

  try {

    await fetch(scriptURL, {
      method: "POST",
      mode: "no-cors",
      body: new URLSearchParams(formData)
    });

    formMessage.textContent =
      "Thank you! Your message has been sent successfully.";

    contactForm.reset();

  } catch (error) {

    console.error("Form Error:", error);

    formMessage.textContent =
      "Unable to send your message. Please try again.";

  } finally {

    submitButton.disabled = false;

    submitButton.innerHTML =
      'Send Message <i class="fas fa-arrow-right"></i>';
  }

});