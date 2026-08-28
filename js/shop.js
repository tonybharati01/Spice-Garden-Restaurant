
document.addEventListener("DOMContentLoaded", () => {

  const checkoutBtn = document.getElementById("checkout-btn");
  const shopSlider = document.getElementById("shop-slider");

  const locationForm = document.getElementById("location-form");
  const paymentBack = document.getElementById("payment-back");


  /* =========================================================
     STEP 0 → STEP 1
     ORDER SUMMARY → DELIVERY LOCATION
  ========================================================= */

  checkoutBtn.addEventListener("click", () => {

    shopSlider.classList.remove("payment-active");

    shopSlider.classList.add("location-active");

    window.scrollTo({
      top: shopSlider.offsetTop,
      behavior: "smooth"
    });

  });


  /* =========================================================
     STEP 1 → STEP 2
     DELIVERY LOCATION → PAYMENT
  ========================================================= */

  locationForm.addEventListener("submit", (e) => {

    e.preventDefault();


    const name =
      document.getElementById("customer-name").value.trim();

    const phone =
      document.getElementById("customer-phone").value.trim();

    const pincode =
      document.getElementById("customer-pincode").value.trim();

    const address =
      document.getElementById("customer-address").value.trim();

    const city =
      document.getElementById("customer-city").value.trim();

    const state =
      document.getElementById("customer-state").value.trim();


    /* ---------- EMPTY CHECK ---------- */

    if (
      !name ||
      !phone ||
      !pincode ||
      !address ||
      !city ||
      !state
    ) {

      alert("Please fill in all delivery details.");

      return;
    }


    /* ---------- PHONE VALIDATION ---------- */

    if (!/^[6-9]\d{9}$/.test(phone)) {

      alert("Please enter a valid 10-digit phone number.");

      return;
    }


    /* ---------- PINCODE VALIDATION ---------- */

    if (!/^\d{6}$/.test(pincode)) {

      alert("Please enter a valid 6-digit pincode.");

      return;
    }


    /* ---------- GO TO PAYMENT ---------- */

    shopSlider.classList.remove("location-active");

    shopSlider.classList.add("payment-active");


    window.scrollTo({
      top: shopSlider.offsetTop,
      behavior: "smooth"
    });

  });


  /* =========================================================
     STEP 2 → STEP 1
     PAYMENT → DELIVERY LOCATION
  ========================================================= */

  paymentBack.addEventListener("click", () => {

    shopSlider.classList.remove("payment-active");

    shopSlider.classList.add("location-active");

    window.scrollTo({
      top: shopSlider.offsetTop,
      behavior: "smooth"
    });

  });

});

