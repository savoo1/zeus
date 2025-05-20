$(".navbar .lines").click(function (e) {
  e.preventDefault();
  if ($(this).parent().parent().parent().parent().hasClass("active")) {
    $(this).parent().parent().parent().parent().removeClass("active");
  } else {
    $(this).parent().parent().parent().parent().addClass("active");
  }
});

$(".hero .changetab").click(function (e) {
  e.preventDefault();
  $(".hero .changetab.active").removeClass("active");
  var nameof = "." + $(this).attr("name");
  $(this).addClass("active");
  $(".hero .tabs").removeClass("active");
  $(nameof).addClass("active");
});

$(".coin-swipe").click(function (e) {
  e.preventDefault();
  $(".coin-swipe").removeClass("active");
  var nameof = "." + $(this).attr("name");
  $(this).addClass("active");
  $(".coins-swipe-tab .active-input").removeClass("active-input");
  $(nameof).addClass("active-input");
});

$(document).ready(function () {
  $(".videoplace").click(function () {
    if (!$(this).hasClass("active")) {
      // Add 'active' class to the videoplace div
      $(this).addClass("active");

      // Find and play the video inside this div
      // $(this).find(".videof")[0].play();
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  function setupMobileScrolling() {
    const boxesContainers = document.querySelectorAll(".logos-wrapper .boxes");

    boxesContainers.forEach((boxesContainer) => {
      if (!boxesContainer) return;

      if (window.innerWidth < 3000) {
        if (!boxesContainer.dataset.duplicated) {
          const boxes = boxesContainer.querySelectorAll(".box");
          boxes.forEach((box) => {
            const clone = box.cloneNode(true);
            boxesContainer.appendChild(clone);
          });
          boxesContainer.dataset.duplicated = "true";
        }
      } else {
        if (boxesContainer.dataset.duplicated) {
          const boxes = boxesContainer.querySelectorAll(".box");
          const originalCount = boxes.length / 2;
          for (let i = boxes.length - 1; i >= originalCount; i--) {
            boxesContainer.removeChild(boxes[i]);
          }
          boxesContainer.dataset.duplicated = "";
        }
      }
    });
  }

  setupMobileScrolling();
  window.addEventListener("resize", setupMobileScrolling);
});

$(window).on("scroll", function () {
  let scrollTop = $(this).scrollTop();

  if (scrollTop > 150) {
    $(".navbar").addClass("fixed");
  } else {
    $(".navbar").removeClass("fixed show");
  }

  if (scrollTop > 200) {
    $(".navbar").addClass("add2");
  } else {
    $(".navbar").removeClass("add2");
  }

  if (scrollTop > 300) {
    $(".navbar").addClass("show");
  } else {
    $(".navbar").removeClass("show");
  }
});

$(document).ready(function () {
  $(".language-switcher").each(function () {
    let $dropdown = $(this).find(".language-dropdown");
    let $chosen = $(this).find(".choosen");

    // Function to update the language icon based on the current language
    function updateLanguageIcon(lang) {
      // Get the selected language (can also be from localStorage or a default fallback)
      let $selectedItem = $dropdown.find(`li[data-lang="${lang}"]`);
      if ($selectedItem.length) {
        let flag = $selectedItem.find("img").attr("src");
        let text = $selectedItem.find("span").text().trim();

        // Update chosen language display
        $chosen.html(
          `<img src="${flag}" class="flag-icon"> ${text} <img src="img/arrow-down.svg" alt="arrow down">`
        );
      }
    }

    // Run on load to set the initial icon
    let initialLang = localStorage.getItem("language") || "en"; // Default to English
    updateLanguageIcon(initialLang);

    // Toggle dropdown
    $chosen.on("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      $dropdown.toggle();
      $("nav").removeClass("active");
    });

    // Hide dropdown when clicking outside
    $(document).on("click", function (event) {
      if (
        !$chosen.is(event.target) &&
        !$dropdown.is(event.target) &&
        $dropdown.has(event.target).length === 0
      ) {
        $dropdown.hide();
      }
    });

    // Change Language - Using event delegation for list items
    $dropdown.on("click", "li", function () {
      let lang = $(this).data("lang");

      // Check if selected language is English
      if (lang === "en") {
        // Reset language settings (ensure Google Translate is disabled or reset)
        localStorage.setItem("language", "en"); // Save English as the selected language
        updateLanguageIcon("en"); // Update the language icon to English

        // Disable Google Translate translation for English (force it to reset)
        let googleTranslateCombo = document.querySelector(".goog-te-combo");
        if (googleTranslateCombo) {
          googleTranslateCombo.value = "en";
          googleTranslateCombo.dispatchEvent(new Event("change"));

          // If Google Translate is applied, reset the page to English by reloading
          if (
            typeof google &&
            google.translate &&
            google.translate.TranslateElement
          ) {
            let translateElement = google.translate.TranslateElement;
            if (translateElement) {
              google.translate.TranslateElement(
                { pageLanguage: "en", includedLanguages: "en" },
                "google_translate_element"
              );
            }
          }
        }

        // Optionally, reload the page to reset Google Translate if needed
        // location.reload(); // Uncomment if you want to reload the page and reset Google Translate

        return; // Prevent the rest of the translation flow
      }

      // For other languages, update the icon and trigger Google Translate
      updateLanguageIcon(lang);

      // Save the selected language in localStorage
      localStorage.setItem("language", lang);

      // Force Google Translate to change language (for non-English languages)
      let googleTranslateCombo = document.querySelector(".goog-te-combo");
      if (googleTranslateCombo) {
        googleTranslateCombo.value = lang;
        googleTranslateCombo.dispatchEvent(new Event("change"));
      }

      $dropdown.hide(); // Hide dropdown after selection
    });
  });
});

$(document).ready(function () {
  // Function to detect the section in view and activate the corresponding navbar link
  function checkActiveSection() {
    var scrollPos = $(document).scrollTop();
    var sectionInView = false; // Flag to check if any section is in view

    // Loop through each navbar link
    $(".scroll").each(function () {
      var sectionID = $(this).attr("href"); // Get the href (section ID)

      // Skip links that don't have valid href (like #)
      if (sectionID === "#") return;

      // Get the section by using the 'href' attribute (this links to a specific section)
      var section = $(sectionID);

      // Check if the section is in view (considering the section's offset and height)
      if (
        section.offset().top - 100 <= scrollPos && // Adjust for offset
        section.offset().top + section.height() - 100 > scrollPos
      ) {
        sectionInView = true; // Set flag to true if section is in view
        $(".scroll").removeClass("active"); // Remove active from all links
        $(this).addClass("active"); // Add active to the current link
        $(".navbar").removeClass("active");
      }
    });

    // If no section is in view, remove active from all navbar links
    if (!sectionInView) {
      $(".scroll").removeClass("active");
    }
  }

  // Detect when the page is scrolled and check for the active section
  $(window).on("scroll", function () {
    checkActiveSection();
  });

  // Smooth scrolling when clicking on navbar links
  $(".scroll").click(function (e) {
    e.preventDefault();
    var targetSection = $(this).attr("href"); // Get the section linked by the anchor
    if (targetSection !== "#") {
      // Ensure we don't try to scroll to "#" if it's not a valid section
      $("html, body").animate(
        {
          scrollTop: $(targetSection).offset().top - 80, // Adjust scroll position for nav height
        },
        1000
      );
    }
  });

  // Initial check on page load
  checkActiveSection();
});

$(".scroll2").click(function (e) {
  e.preventDefault();
  $("nav").removeClass("nav_active");
  var nameof = "." + $(this).attr("name");
  $(".navbar").removeClass("active");
  $("html, body").animate(
    {
      scrollTop: $(nameof).offset().top - 150,
    },
    1000
  );
});
