(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner();

  // Initiate the wowjs
  new WOW().init();

  // Sticky Navbar
  $(window).scroll(function () {
    if ($(this).scrollTop() > 45) {
      $(".navbar").addClass("sticky-top shadow-sm");
    } else {
      $(".navbar").removeClass("sticky-top shadow-sm");
    }
  });

  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  function updateActiveLink() {
    let scrollPos = window.scrollY + 150;
    let currentId = "";

    sections.forEach((section) => {
      const offsetTop = section.offsetTop;
      const offsetHeight = section.offsetHeight;
      if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
        currentId = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentId}`) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveLink);

  // Dropdown on mouse hover
  const $dropdown = $(".dropdown");
  const $dropdownToggle = $(".dropdown-toggle");
  const $dropdownMenu = $(".dropdown-menu");
  const showClass = "show";

  $(window).on("load resize", function () {
    if (this.matchMedia("(min-width: 992px)").matches) {
      $dropdown.hover(
        function () {
          const $this = $(this);
          $this.addClass(showClass);
          $this.find($dropdownToggle).attr("aria-expanded", "true");
          $this.find($dropdownMenu).addClass(showClass);
        },
        function () {
          const $this = $(this);
          $this.removeClass(showClass);
          $this.find($dropdownToggle).attr("aria-expanded", "false");
          $this.find($dropdownMenu).removeClass(showClass);
        }
      );
    } else {
      $dropdown.off("mouseenter mouseleave");
    }
  });

  // Facts counter
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 2000,
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });









document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent default form submission

  const form = e.target;
  const formData = new FormData(form);

  fetch('send_mail.php', {
    method: 'POST',
    body: formData
  })
  .then(response => response.text())
  .then(data => {
    if (data.trim() === 'success') {
      showToast("Email sent successfully");
      form.reset(); // Clear form fields
    } else {
      showToast("Failed to send email. Try again.");
    }
  })
  .catch(error => {
    console.error('Error:', error);
    showToast("Something went wrong. Try again later.");
  });
});

function showToast(message) {
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #28a745;
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    z-index: 9999;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    font-size: 16px;
    animation: fadeInOut 3s forwards;
  `;
  document.body.appendChild(toast);

  setTimeout(() => toast.remove(), 3000);
}

// Simple animation (optional)
const style = document.createElement('style');
style.textContent = `
@keyframes fadeInOut {
  0% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
  10% { opacity: 1; transform: translateX(-50%) translateY(0); }
  90% { opacity: 1; transform: translateX(-50%) translateY(0); }
  100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
}`;
document.head.appendChild(style);


})(jQuery);
