const ctx = document.getElementById("Chart");
ctx.height = 300;

const get_data = async () => {
  const response = await fetch(apiObj.dataSetUrl);
  const data = await response.json();
  return data;
};

get_data().then((data) => {
  let labels = [];
  let values = [];

  data.forEach((element) => {
    labels.push(element.formated_date);
    values.push(element.data);
  });

  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          borderColor: "rgba(224, 141, 33, 0.769)",
          backgroundColor: "#e08d21",
          label: "Number of Jobs",
          data: values,
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
          pointRadius: 3,
        },
      },
    },
  });
});
