function adjustLine(from, to, line) {
    let fT = from.offsetTop + from.offsetHeight / 2;
    let tT = to.offsetTop + to.offsetHeight / 2;
    let fL = from.offsetLeft + from.offsetWidth / 2;
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
  
    line.style["-webkit-transform"] = "rotate(" + ANG + "deg)";
    line.style["-moz-transform"] = "rotate(" + ANG + "deg)";
    line.style["-ms-transform"] = "rotate(" + ANG + "deg)";
    line.style["-o-transform"] = "rotate(" + ANG + "deg)";
    line.style["-transform"] = "rotate(" + ANG + "deg)";
    line.style.top = top + "px";
    line.style.left = left + "px";
    line.style.height = H + "px";

  }

// Scrapers
let based_scraper_java = document.getElementById("based_scraper_java");
let Jmeter_Scrapers = document.getElementById("Jmeter_Scrapers");
let Scrapy_peviitor_jobs = document.getElementById("Scrapy_peviitor_jobs");
let Scrapers_start_with_digi = document.getElementById(
  "Scrapers_start_with_digi"
);
let Scrapers_Job_PeViitor = document.getElementById("Scrapers_Job_PeViitor");
let PeViitor_Scrapers_Melania = document.getElementById(
  "PeViitor_Scrapers_Melania"
);
let based_scraper_js = document.getElementById("based_scraper_js");
let based_scraper_py = document.getElementById("based_scraper_py");
let JobsScrapers = document.getElementById("JobsScrapers");

// Action
let action = document.getElementById("action");
// Career Page
let career_page = document.getElementById("career_page");

// Lines
// scraper to action
let action_based_scraper_java = document.getElementById(
  "action_based_scraper_java"
);
let action_Scrapy_peviitor_jobs = document.getElementById(
  "action_Scrapy_peviitor_jobs"
);
let action_Jmeter_Scrapers = document.getElementById("action_Jmeter_Scrapers");
let action_Scrapers_start_with_digi = document.getElementById(
  "action_Scrapers_start_with_digi"
);
let action_Scrapers_Job_PeViitor = document.getElementById(
  "action_Scrapers_Job_PeViitor"
);
let action_PeViitor_Scrapers_Melania = document.getElementById(
  "action_PeViitor_Scrapers_Melania"
);
let action_based_scraper_js = document.getElementById(
  "action_based_scraper_js"
);
let action_based_scraper_py = document.getElementById(
  "action_based_scraper_py"
);
let action_JobsScrapers = document.getElementById("action_JobsScrapers");

// scraper to career_page
let career_page_based_scraper_java = document.getElementById(
  "career_page_based_scraper_java"
);
let career_page_Jmeter_Scrapers = document.getElementById(
  "career_page_Jmeter_Scrapers"
);
let career_page_Scrapy_peviitor_jobs = document.getElementById(
  "career_page_Scrapy_peviitor_jobs"
);
let career_page_Scrapers_start_with_digi = document.getElementById(
  "career_page_Scrapers_start_with_digi"
);
let career_page_Scrapers_Job_PeViitor = document.getElementById(
  "career_page_Scrapers_Job_PeViitor"
);
let career_page_PeViitor_Scrapers_Melania = document.getElementById(
  "career_page_PeViitor_Scrapers_Melania"
);
let career_page_based_scraper_js = document.getElementById(
  "career_page_based_scraper_js"
);
let career_page_based_scraper_py = document.getElementById(
  "career_page_based_scraper_py"
);
let career_page_JobsScrapers = document.getElementById(
  "career_page_JobsScrapers"
);

// scrapers to api_control_scrapers
let api_control_scrapers_Scrapers_start_with_digi = document.getElementById(
  "api_control_scrapers_Scrapers_start_with_digi"
);
let api_control_scrapers_Scrapers_Job_PeViitor = document.getElementById(
  "api_control_scrapers_Scrapers_Job_PeViitor"
);
let api_control_scrapers_PeViitor_Scrapers_Melania = document.getElementById(
  "api_control_scrapers_PeViitor_Scrapers_Melania"
);
let api_control_scrapers_based_scraper_js = document.getElementById(
  "api_control_scrapers_based_scraper_js"
);
let api_control_scrapers_based_scraper_py = document.getElementById(
  "api_control_scrapers_based_scraper_py"
);
let api_control_scrapers_JobsScrapers = document.getElementById(
  "api_control_scrapers_JobsScrapers"
);

// databases to down
let down_zimbor_solr_database = document.getElementById(
  "down_zimbor_solr_database"
);
let down_cluj_solr_database = document.getElementById(
  "down_cluj_solr_database"
);

// api to down
let down_api = document.getElementById("down_api");

// action to api
let action_api = document.getElementById("action_api");

// api to web_server
let api_web_server = document.getElementById("api_web_server");

// web_server to cloudflare
let web_server_cloudflare = document.getElementById("web_server_cloudflare");

// test_case to api_control_scrapers
let api_control_scrapers_test_case = document.getElementById(
  "api_control_scrapers_test_case"
);
// test_case to action
let action_test_case = document.getElementById("action_test_case");

// peviitor_page to cloudflare
let cloudflare_peviitor_page = document.getElementById(
  "cloudflare_peviitor_page"
);
// peviitor_page to test_case
let test_case_peviitor_page = document.getElementById(
  "test_case_peviitor_page"
);

// api to dev_peviitor
let api_dev_peviitor = document.getElementById("api_dev_peviitor");

// firme_peviitor to peviitor_page
let peviitor_page_firme_peviitor = document.getElementById(
  "peviitor_page_firme_peviitor"
);

// scrapers_peviitor to peviitor_page
let peviitor_page_scrapers_peviitor = document.getElementById(
  "peviitor_page_scrapers_peviitor"
);
// scrapers_peviitor to api_control_scrapers
let api_control_scrapers_scrapers_peviitor = document.getElementById(
  "api_control_scrapers_scrapers_peviitor"
);

// Scrapers to action
adjustLine(based_scraper_java, action, action_based_scraper_java);
adjustLine(action, Jmeter_Scrapers, action_Jmeter_Scrapers);
adjustLine(action, Scrapy_peviitor_jobs, action_Scrapy_peviitor_jobs);
adjustLine(action, Scrapers_start_with_digi, action_Scrapers_start_with_digi);
adjustLine(action, Scrapers_Job_PeViitor, action_Scrapers_Job_PeViitor);
adjustLine(action, PeViitor_Scrapers_Melania, action_PeViitor_Scrapers_Melania);
adjustLine(action, based_scraper_js, action_based_scraper_js);
adjustLine(action, based_scraper_py, action_based_scraper_py);
adjustLine(action, JobsScrapers, action_JobsScrapers);

// scrapers to career_page
adjustLine(based_scraper_java, career_page, career_page_based_scraper_java);
adjustLine(Jmeter_Scrapers, career_page, career_page_Jmeter_Scrapers);
adjustLine(Scrapy_peviitor_jobs, career_page, career_page_Scrapy_peviitor_jobs);
adjustLine(
  Scrapers_start_with_digi,
  career_page,
  career_page_Scrapers_start_with_digi
);
adjustLine(
  Scrapers_Job_PeViitor,
  career_page,
  career_page_Scrapers_Job_PeViitor
);
adjustLine(
  PeViitor_Scrapers_Melania,
  career_page,
  career_page_PeViitor_Scrapers_Melania
);
adjustLine(based_scraper_js, career_page, career_page_based_scraper_js);
adjustLine(based_scraper_py, career_page, career_page_based_scraper_py);
adjustLine(JobsScrapers, career_page, career_page_JobsScrapers);

// scrapers to api_control_scrapers
adjustLine(
  Scrapers_start_with_digi,
  api_control_scrapers,
  api_control_scrapers_Scrapers_start_with_digi
);
adjustLine(
  Scrapers_Job_PeViitor,
  api_control_scrapers,
  api_control_scrapers_Scrapers_Job_PeViitor
);
adjustLine(
  PeViitor_Scrapers_Melania,
  api_control_scrapers,
  api_control_scrapers_PeViitor_Scrapers_Melania
);
adjustLine(
  based_scraper_js,
  api_control_scrapers,
  api_control_scrapers_based_scraper_js
);
adjustLine(
  based_scraper_py,
  api_control_scrapers,
  api_control_scrapers_based_scraper_py
);
adjustLine(
  JobsScrapers,
  api_control_scrapers,
  api_control_scrapers_JobsScrapers
);

// api_control_scrapers to action
adjustLine(api_control_scrapers, action, action_Scrapers_start_with_digi);

// api_control_scrapers to database_logs
adjustLine(
  api_control_scrapers,
  database_logs,
  database_logs_api_control_scrapers
);

// databases to down
adjustLine(zimbor_solr_database, down, down_zimbor_solr_database);
adjustLine(cluj_solr_database, down, down_cluj_solr_database);

// api to down
adjustLine(api, down, down_api);

// action to api
adjustLine(action, api, action_api);

// api to web_server
adjustLine(api, web_server, api_web_server);

// web_server to cloudflare
adjustLine(web_server, cloudflare, web_server_cloudflare);

// test_case to api_control_scrapers
adjustLine(test_case, api_control_scrapers, api_control_scrapers_test_case);
// test_case to action
adjustLine(test_case, action, action_test_case);

// peviitor_page to cloudflare
adjustLine(peviitor_page, cloudflare, cloudflare_peviitor_page);
// peviitor_page to test_case
adjustLine(peviitor_page, test_case, test_case_peviitor_page);

// api to dev_peviitor
adjustLine(api, dev_peviitor, api_dev_peviitor);

// firme_peviitor to peviitor_page
adjustLine(firme_peviitor, peviitor_page, peviitor_page_firme_peviitor);

// scrapers_peviitor to peviitor_page
adjustLine(scrapers_peviitor, peviitor_page, peviitor_page_scrapers_peviitor);
// scrapers_peviitor to api_control_scrapers
adjustLine(
  scrapers_peviitor,
  api_control_scrapers,
  api_control_scrapers_scrapers_peviitor
);
