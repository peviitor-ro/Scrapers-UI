const ctx = document.getElementById("myChart");

new Chart(ctx, {
  type: "bar",
  data: {
    labels: [
      "6 Oct",
      "9 Oct",
      "13 Oct",
      "16 Oct",
      "18 Oct",
      "20 Oct",
      "23 Oct",
    ],
    datasets: [
      {
        borderColor: "black",
        backgroundColor: "#e08d21",
        label: "Number of Jobs",
        data: [12, 19, 3, 5, 2, 3, 26],
        borderWidth: 2,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});
