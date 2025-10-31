// script.js (fixed MD5 converter)
document.addEventListener("DOMContentLoaded", async () => {
  const inputText = document.getElementById("inputText");
  const outputText = document.getElementById("outputText");
  const copyBtn = document.getElementById("copyBtn");
  const clearBtn = document.getElementById("clearBtn");
  const copyMsg = document.getElementById("copyMsg");
  const yearEl = document.getElementById("year");
  const menuToggle = document.getElementById("menuToggle");
  const navList = document.querySelector(".nav-list");

  // Set current year
  yearEl.textContent = new Date().getFullYear();

  // --- Load CryptoJS dynamically ---
  await new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.2.0/crypto-js.min.js";
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });

  // --- Real MD5 hash function ---
  const md5Hash = (value) => CryptoJS.MD5(value).toString();

  // Live hash update
  inputText.addEventListener("input", () => {
    const val = inputText.value.trim();
    outputText.value = val ? md5Hash(val) : "";
  });

  // Copy hash result
  copyBtn.addEventListener("click", () => {
    if (!outputText.value.trim()) return;
    outputText.select();
    document.execCommand("copy");
    copyMsg.textContent = "Copied to clipboard!";
    copyMsg.style.display = "block";
    setTimeout(() => (copyMsg.style.display = "none"), 2000);
  });

  // Clear inputs
  clearBtn.addEventListener("click", () => {
    inputText.value = "";
    outputText.value = "";
    copyMsg.style.display = "none";
  });

  // Responsive navigation
  menuToggle.addEventListener("click", () => {
    const isOpen = navList.style.display === "flex";
    navList.style.display = isOpen ? "none" : "flex";
  });

  document.querySelectorAll(".nav-list a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 900) navList.style.display = "none";
    });
  });
});
