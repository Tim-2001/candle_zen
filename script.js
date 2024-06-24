document.addEventListener('DOMContentLoaded', () => {
  const radioButtons = document.querySelectorAll('.radio-buttons input[type="radio"]');
  const slides = document.querySelectorAll('.slide');
 
  radioButtons.forEach(radio => {
    radio.addEventListener('change', () => {
      slides.forEach(slide => slide.classList.remove('active'));
      document.getElementById(radio.value).classList.add('active');
    });
  });
 
  if (radioButtons.length > 0) {
    radioButtons[0].dispatchEvent(new Event('change'));
  }
 });
 
 function redirectToPage(value) {
 
  if (value === "faq_two") {
      window.location.href = "index.html"; 
  } else if (value === "faq_three") {
      window.location.href = "index.html"; 
  } else if (value === "faq_four") {
      window.location.href = "index.html"; 
  } else if (value === "faq_five") {
      window.location.href = "index.html"; 
  } else if (value === "faq_six") {
      window.location.href = "index.html"; 
  }
}