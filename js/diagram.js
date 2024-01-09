const ids = [
  "action",
  "career_page",
  "validator_api",
  "validator_database",
  "down",
  "api",
  "web_server",
  "cloudflare",
  "test_case",
  "peviitor_page",
  "scrapers_peviitor",
  "zimbor_solr_database",
  "cluj_solr_database",
  "based_scraper_java",
  "Jmeter_Scrapers",
  "Scrapy_peviitor_jobs",
  "Scrapers_start_with_digi",
  "Scrapers_Job_PeViitor",
  "PeViitor_Scrapers_Melania",
  "based_scraper_js",
  "based_scraper_py",
  "JobsScrapers",
];

function reverseLine(from, to, line_active = false) {
  let fT = from.offsetTop + from.offsetHeight / 2;
  let fL = from.offsetLeft + from.offsetWidth / 2;

  const line_hovers = [];

  to.forEach((to) => {
    let tT = to.offsetTop + to.offsetHeight / 2;

    let tL = to.offsetLeft + to.offsetWidth / 2;

    let CA = Math.abs(tT - fT);
    let CO = Math.abs(tL - fL);
    let H = Math.sqrt(CA * CA + CO * CO);
    let ANG = (180 / Math.PI) * Math.acos(CA / H);

    let top;
    let left;

    if (tT > fT) {
      top = (tT - fT) / 2 + fT;
    } else {
      top = (fT - tT) / 2 + tT;
    }
    if (tL > fL) {
      left = (tL - fL) / 2 + fL;
    } else {
      left = (fL - tL) / 2 + tL;
    }

    if (
      (fT < tT && fL < tL) ||
      (tT < fT && tL < fL) ||
      (fT > tT && fL > tL) ||
      (tT > fT && tL > fL)
    ) {
      ANG *= -1;
    }
    top -= H / 2;

    const line = document.createElement("div");
    const line_hover = document.createElement("div");
    line_hover.classList.add("line-hover");
    line_hovers.push(line_hover);
    line.classList.add("line");

    if (line_active) {
      from.parentElement.appendChild(line);
    }

    [line, line_hover].forEach((line) => {
      line.style["-webkit-transform"] = "rotate(" + ANG + "deg)";
      line.style["-moz-transform"] = "rotate(" + ANG + "deg)";
      line.style["-ms-transform"] = "rotate(" + ANG + "deg)";
      line.style["-o-transform"] = "rotate(" + ANG + "deg)";
      line.style["-transform"] = "rotate(" + ANG + "deg)";
      line.style.top = top + "px";
      line.style.left = left + "px";
      line.style.height = H + "px";

      line.style.setProperty(
        "--random",
        Math.floor(Math.random() * 10) + 1 + "s"
      );
    });
  });

  // return [line_hover, ...to];
  return {
    line_hover: line_hovers,
    to: [from, ...to],
  };
}

function adjustLine(from, to, reverse = []) {
  let fT = from.offsetTop + from.offsetHeight / 2;
  let fL = from.offsetLeft + from.offsetWidth / 2;

  // create a unique id for each line
  const line_hovers = [];
  if (reverse) {
    reverse.forEach((to) => {
      to.line_hover.forEach((line) => {
        line_hovers.push(line);
      });
    });
  }

  to.forEach((to) => {
    let tT = to.offsetTop + to.offsetHeight / 2;

    let tL = to.offsetLeft + to.offsetWidth / 2;

    let CA = Math.abs(tT - fT);
    let CO = Math.abs(tL - fL);
    let H = Math.sqrt(CA * CA + CO * CO);
    let ANG = (180 / Math.PI) * Math.acos(CA / H);

    let top;
    let left;

    if (tT > fT) {
      top = (tT - fT) / 2 + fT;
    } else {
      top = (fT - tT) / 2 + tT;
    }
    if (tL > fL) {
      left = (tL - fL) / 2 + fL;
    } else {
      left = (fL - tL) / 2 + tL;
    }

    if (
      (fT < tT && fL < tL) ||
      (tT < fT && tL < fL) ||
      (fT > tT && fL > tL) ||
      (tT > fT && tL > fL)
    ) {
      ANG *= -1;
    }
    top -= H / 2;

    const line = document.createElement("div");
    const line_hover = document.createElement("div");
    line_hover.classList.add("line-hover");
    line_hovers.push(line_hover);
    line.classList.add("line");
    from.parentElement.appendChild(line);

    [line, line_hover].forEach((line) => {
      line.style["-webkit-transform"] = "rotate(" + ANG + "deg)";
      line.style["-moz-transform"] = "rotate(" + ANG + "deg)";
      line.style["-ms-transform"] = "rotate(" + ANG + "deg)";
      line.style["-o-transform"] = "rotate(" + ANG + "deg)";
      line.style["-transform"] = "rotate(" + ANG + "deg)";
      line.style.top = top + "px";
      line.style.left = left + "px";
      line.style.height = H + "px";

      line.style.setProperty(
        "--random",
        Math.floor(Math.random() * 10) + 1 + "s"
      );
    });
  });
  // set hover
  let remved_ids;
  if (reverse) {
    remved_ids = ids.filter(
      (id) =>
        id !== from.id &&
        !to.includes(document.getElementById(id)) &&
        !reverse
          .map((el) => el.to)
          .flat()
          .includes(document.getElementById(id))
    );
  } else {
    remved_ids = ids.filter(
      (id) => id !== from.id && !to.includes(document.getElementById(id))
    );
  }

  from.addEventListener("mouseover", function () {
    from.classList.add("hover");
    if (reverse) {
      reverse.forEach((el) => {
        el.to.forEach((to) => {
          to.classList.add("hover");
        });
      });
    }

    to.forEach((el) => {
      el.classList.add("hover");
    });
    document.querySelectorAll(".line").forEach((line) => {
      line.classList.add("hidden");
    });

    line_hovers.forEach((line) => {
      from.parentElement.appendChild(line);
    });

    remved_ids.forEach((id) => {
      const element = document.getElementById(id);
      element.classList.add("hidden");
    });
  });

  from.addEventListener("mouseout", function () {
    from.classList.remove("hover");
    if (reverse) {
      reverse.forEach((el) => {
        el.to.forEach((to) => {
          to.classList.remove("hover");
        });
      });
    }
    to.forEach((el) => {
      el.classList.remove("hover");
    });

    document.querySelectorAll(".line").forEach((line) => {
      line.classList.remove("hidden");
    });

    line_hovers.forEach((line) => {
      line.remove();
    });

    remved_ids.forEach((id) => {
      const element = document.getElementById(id);
      element.classList.remove("hidden");
    });
  });
}

const action = document.getElementById("action");
const career_page = document.getElementById("career_page");
const validator_api = document.getElementById("validator_api");
const validator_database = document.getElementById("validator_database");
const down = document.getElementById("down");
const api = document.getElementById("api");
const web_server = document.getElementById("web_server");
const cloudflare = document.getElementById("cloudflare");
const test_case = document.getElementById("test_case");
const peviitor_page = document.getElementById("peviitor_page");
const scrapers_peviitor = document.getElementById("scrapers_peviitor");
const zimbor_solr_database = document.getElementById("zimbor_solr_database");
const cluj_solr_database = document.getElementById("cluj_solr_database");
const based_scraper_java = document.getElementById("based_scraper_java");
const based_scraper_js = document.getElementById("based_scraper_js");
const based_scraper_py = document.getElementById("based_scraper_py");
const Jmeter_Scrapers = document.getElementById("Jmeter_Scrapers");
const Scrapy_peviitor_jobs = document.getElementById("Scrapy_peviitor_jobs");
const Scrapers_start_with_digi = document.getElementById(
  "Scrapers_start_with_digi"
);
const Scrapers_Job_PeViitor = document.getElementById("Scrapers_Job_PeViitor");
const PeViitor_Scrapers_Melania = document.getElementById(
  "PeViitor_Scrapers_Melania"
);
const JobsScrapers = document.getElementById("JobsScrapers");

// based_scraper_java
adjustLine(
  based_scraper_java,
  [career_page, action, validator_api],
  [
    reverseLine(
      validator_api,
      [validator_database, api, scrapers_peviitor],
      true
    ),
    reverseLine(api, [down], true),
    reverseLine(down, [zimbor_solr_database, cluj_solr_database], true),
  ]
);

// Jmeter_Scrapers
adjustLine(
  Jmeter_Scrapers,
  [career_page, action, validator_api],
  [
    reverseLine(validator_api, [validator_database, api, scrapers_peviitor]),
    reverseLine(api, [down]),
    reverseLine(down, [zimbor_solr_database, cluj_solr_database]),
  ]
);

// Scrapy_peviitor_jobs
adjustLine(
  Scrapy_peviitor_jobs,
  [career_page, action, validator_api],
  [
    reverseLine(validator_api, [validator_database, api, scrapers_peviitor]),
    reverseLine(api, [down]),
    reverseLine(down, [zimbor_solr_database, cluj_solr_database]),
  ]
);

// Scrapers_start_with_digi
adjustLine(
  Scrapers_start_with_digi,
  [career_page, action, validator_api],
  [
    reverseLine(validator_api, [validator_database, api, scrapers_peviitor]),
    reverseLine(api, [down]),
    reverseLine(down, [zimbor_solr_database, cluj_solr_database]),
  ]
);

// Scrapers_Job_PeViitor
adjustLine(
  Scrapers_Job_PeViitor,
  [career_page, action, validator_api],
  [
    reverseLine(validator_api, [validator_database, api, scrapers_peviitor]),
    reverseLine(api, [down]),
    reverseLine(down, [zimbor_solr_database, cluj_solr_database]),
  ]
);

// PeViitor_Scrapers_Melania
adjustLine(
  PeViitor_Scrapers_Melania,
  [career_page, action, validator_api],
  [
    reverseLine(validator_api, [validator_database, api, scrapers_peviitor]),
    reverseLine(api, [down]),
    reverseLine(down, [zimbor_solr_database, cluj_solr_database]),
  ]
);

// based_scraper_js
adjustLine(
  based_scraper_js,
  [career_page, action, validator_api],
  [
    reverseLine(validator_api, [validator_database, api, scrapers_peviitor]),
    reverseLine(api, [down]),
    reverseLine(down, [zimbor_solr_database, cluj_solr_database]),
  ]
);

// based_scraper_py
adjustLine(
  based_scraper_py,
  [career_page, action, validator_api],
  [
    reverseLine(validator_api, [validator_database, api, scrapers_peviitor]),
    reverseLine(api, [down]),
    reverseLine(down, [zimbor_solr_database, cluj_solr_database]),
  ]
);

// JobsScrapers
adjustLine(
  JobsScrapers,
  [career_page, action, validator_api],
  [
    reverseLine(validator_api, [validator_database, api, scrapers_peviitor]),
    reverseLine(api, [down]),
    reverseLine(down, [zimbor_solr_database, cluj_solr_database]),
  ]
);

// action
adjustLine(
  action,
  [
    based_scraper_java,
    based_scraper_js,
    based_scraper_py,
    Jmeter_Scrapers,
    Scrapy_peviitor_jobs,
    Scrapers_start_with_digi,
    Scrapers_Job_PeViitor,
    PeViitor_Scrapers_Melania,
    JobsScrapers,
  ],
  [
    reverseLine(based_scraper_java, [career_page, validator_api]),
    reverseLine(based_scraper_js, [career_page, validator_api]),
    reverseLine(based_scraper_py, [career_page, validator_api]),
    reverseLine(Jmeter_Scrapers, [career_page, validator_api]),
    reverseLine(Scrapy_peviitor_jobs, [career_page, validator_api]),
    reverseLine(Scrapers_start_with_digi, [career_page, validator_api]),
    reverseLine(Scrapers_Job_PeViitor, [career_page, validator_api]),
    reverseLine(PeViitor_Scrapers_Melania, [career_page, validator_api]),
    reverseLine(JobsScrapers, [career_page, validator_api]),
    reverseLine(validator_api, [validator_database, api, scrapers_peviitor]),
    reverseLine(api, [down]),
    reverseLine(down, [zimbor_solr_database, cluj_solr_database]),
  ]
);

// down
adjustLine(down, [zimbor_solr_database, cluj_solr_database]);

// api
adjustLine(
  api,
  [down],
  [reverseLine(down, [zimbor_solr_database, cluj_solr_database])]
);

// web_server
adjustLine(
  web_server,
  [api, cloudflare],
  [
    reverseLine(api, [down]),
    reverseLine(down, [zimbor_solr_database, cluj_solr_database]),
    reverseLine(cloudflare, [peviitor_page], true),
  ]
);

// cloudflare
adjustLine(
  cloudflare,
  [api, web_server],
  [
    reverseLine(api, [down]),
    reverseLine(down, [zimbor_solr_database, cluj_solr_database]),
    reverseLine(cloudflare, [peviitor_page]),
  ]
);

// peviitor_page
adjustLine(
  peviitor_page,
  [cloudflare],
  [
    reverseLine(cloudflare, [web_server]),
    reverseLine(web_server, [api]),
    reverseLine(api, [down]),
    reverseLine(down, [zimbor_solr_database, cluj_solr_database]),
  ]
);

// validator_api
adjustLine(
  validator_api,
  [
    based_scraper_java,
    based_scraper_js,
    based_scraper_py,
    Jmeter_Scrapers,
    Scrapy_peviitor_jobs,
    Scrapers_start_with_digi,
    Scrapers_Job_PeViitor,
    PeViitor_Scrapers_Melania,
    JobsScrapers,
    validator_database,
    api,
    scrapers_peviitor,
  ],
  [
    reverseLine(based_scraper_java, [career_page]),
    reverseLine(based_scraper_js, [career_page]),
    reverseLine(based_scraper_py, [career_page]),
    reverseLine(Jmeter_Scrapers, [career_page]),
    reverseLine(Scrapy_peviitor_jobs, [career_page]),
    reverseLine(Scrapers_start_with_digi, [career_page]),
    reverseLine(Scrapers_Job_PeViitor, [career_page]),
    reverseLine(PeViitor_Scrapers_Melania, [career_page]),
    reverseLine(JobsScrapers, [career_page]),
    reverseLine(api, [down]),
    reverseLine(down, [zimbor_solr_database, cluj_solr_database]),
  ]
);

// scrapers_peviitor
adjustLine(
  scrapers_peviitor,
  [validator_api],
  [
    reverseLine(validator_api, [
      validator_database,
      api,
      based_scraper_java,
      based_scraper_js,
      based_scraper_py,
      Jmeter_Scrapers,
      Scrapy_peviitor_jobs,
      Scrapers_start_with_digi,
      Scrapers_Job_PeViitor,
      PeViitor_Scrapers_Melania,
      JobsScrapers,
    ]),
    reverseLine(api, [down]),
    reverseLine(down, [zimbor_solr_database, cluj_solr_database]),
    reverseLine(based_scraper_java, [career_page]),
    reverseLine(based_scraper_js, [career_page]),
    reverseLine(based_scraper_py, [career_page]),
    reverseLine(Jmeter_Scrapers, [career_page]),
    reverseLine(Scrapy_peviitor_jobs, [career_page]),
    reverseLine(Scrapers_start_with_digi, [career_page]),
    reverseLine(Scrapers_Job_PeViitor, [career_page]),
    reverseLine(PeViitor_Scrapers_Melania, [career_page]),
    reverseLine(JobsScrapers, [career_page]),
  ]
);

// test_case
adjustLine(
  test_case,
  [validator_api, api, scrapers_peviitor, career_page, peviitor_page],
  [
    reverseLine(validator_api, [validator_database]),
    reverseLine(api, [down]),
    reverseLine(down, [zimbor_solr_database, cluj_solr_database]),
    reverseLine(scrapers_peviitor, [validator_api]),
  ]
);

function zoom() {
  document.body.classList.toggle("zoom");
}

document.querySelector("body").addEventListener("click", zoom);
