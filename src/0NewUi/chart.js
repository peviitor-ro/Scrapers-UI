const ctx = document.getElementById("myChart");

new Chart(ctx, {
  type: "line",
  data: {
    labels: [
      "1 Oct",
      "2 Oct",
      "3 Oct",
      "4 Oct",
      "5 Oct",
      "6 Oct",
      "7 Oct",
      "8 Oct",
      "9 Oct",
      "10 Oct",
      "11 Oct",
      "12 Oct",
      "13 Oct",
      "14 Oct",
      "15 Oct",
      "16 Oct",
      "17 Oct",
      "18 Oct",
      "19 Oct",
      "20 Oct",
      "21 Oct",
      "22 Oct",
      "23 Oct",
      "24 Oct",
      "25 Oct",
      "26 Oct",
      "27 Oct",
      "28 Oct",
      "29 Oct",
      "30 Oct",
      "31 Oct",
    ],
    datasets: [
      {
        borderColor: "black",
        backgroundColor: "#e08d21",
        label: "Number of Jobs",
        data: [
          12, 2, 30, 14, 22, 26, 17, 18, 9, 12, 11, 15, 22, 23, 23, 14, 2, 5,
          19, 20, 12, 22, 23, 22, 20, 16, 16, 17, 10, 10, 25,
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    datasets: {
      line: {
        pointRadius: 4,
      },
    },
  },
});
