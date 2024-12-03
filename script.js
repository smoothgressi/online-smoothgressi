document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById("popup-overlay");
    const popup = document.getElementById("graph-popup");
    const newGraphLink = document.getElementById("new-graph");
    const closeButtons = document.querySelectorAll(".close-btn");
    const form = document.getElementById("data-form");
    const chartCanvas = document.getElementById("chart");
    const introText = document.getElementById("intro-text");
    const graphOutput = document.getElementById("graph-output");
    let chart = null;
    let unsavedChanges = false;
  
    // Show popup when "New" is clicked
    newGraphLink.addEventListener("click", (e) => {
      e.preventDefault();
      popup.classList.add("visible");
      overlay.classList.add("visible");
    });
  
    // Close popup
    closeButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        popup.classList.remove("visible");
        overlay.classList.remove("visible");
      });
    });
  
    overlay.addEventListener("click", () => {
      popup.classList.remove("visible");
      overlay.classList.remove("visible");
    });
  
    // Handle form submission
    form.addEventListener("submit", (event) => {
      event.preventDefault();
  
      const xValues = document.getElementById("x-values").value.split(",").map(Number);
      const yValues = document.getElementById("y-values").value.split(",").map(Number);
  
      if (xValues.length !== yValues.length) {
        alert("Les valeurs X et Y doivent avoir le même nombre d'éléments !");
        return;
      }
  
      const graphTitle = document.getElementById("graph-title").value || "Graphique";
      const xAxisLabel = document.getElementById("x-axis-label").value || "Axe X";
      const yAxisLabel = document.getElementById("y-axis-label").value || "Axe Y";
  
      if (chart) {
        chart.destroy();
      }
  
      chart = new Chart(chartCanvas, {
        type: "line",
        data: {
          labels: xValues,
          datasets: [
            {
              label: "Données",
              data: yValues,
              borderColor: "blue",
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: graphTitle,
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: xAxisLabel,
              },
            },
            y: {
              title: {
                display: true,
                text: yAxisLabel,
              },
            },
          },
        },
      });
  
      // Show the graph and hide the intro text
      graphOutput.style.display = "block";
      introText.style.display = "none";
      unsavedChanges = true;
  
      // Close popup after creating the graph
      popup.classList.remove("visible");
      overlay.classList.remove("visible");
    });
  
    // Confirm before leaving the page if there are unsaved changes
    window.addEventListener("beforeunload", (e) => {
      if (unsavedChanges) {
        e.preventDefault();
        e.returnValue = "";
      }
    });
  });

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the default prompt from appearing
  e.preventDefault();
  
  // Stash the event so it can be triggered later
  deferredPrompt = e;

  // Create a custom install button with your desired text
  const installButton = document.createElement("button");
  installButton.innerText = "Installer Online Smoothgressi en tant qu'app";  // Customize the button text
  installButton.style.position = "fixed";
  installButton.style.bottom = "20px";
  installButton.style.left = "20px";
  installButton.style.padding = "10px 20px";
  installButton.style.backgroundColor = "#28a745";
  installButton.style.color = "#fff";
  installButton.style.border = "none";
  installButton.style.borderRadius = "5px";
  installButton.style.fontSize = "16px";
  installButton.style.cursor = "pointer";

  document.body.appendChild(installButton);

  installButton.addEventListener('click', () => {
    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }

      // Hide the button after the user responds
      installButton.style.display = 'none';

      // Reset the deferredPrompt variable
      deferredPrompt = null;
    });
  });
});



// Register the service worker (optional for offline functionality)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/online-smoothgressi/service-worker.js', {
      scope: '/online-smoothgressi/'  // Register with the correct scope
    })
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch((error) => {
      console.log('Service Worker registration failed:', error);
    });
  });
}

window.addEventListener('load', () => {
  // Detect if the app is running in standalone mode (installed as a PWA)
  if (window.matchMedia('(display-mode: standalone)').matches) {
    // The app is running in standalone mode, so hide the "Retourner à l'accueil" button
    const homeButton = document.querySelector('.navbar .nav-link'); // Assuming the button has this class
    if (homeButton) {
      homeButton.style.display = 'none'; // Hide the button
    }
  }
});

if ('windowControlsOverlay' in navigator) {
  const isOverlayEnabled = navigator.windowControlsOverlay.visible;

  if (isOverlayEnabled) {
    document.body.classList.add('with-overlay');
  }
}
