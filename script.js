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
  