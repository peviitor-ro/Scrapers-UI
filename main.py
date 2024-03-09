import requests
import os
import json
import re 

# curent path
path = os.getcwd()

# this folders will be excluded
exclude = [
    '', 
    'a', 
    'l', 
    'website',
    'update', 
    'setup', 
    'script', 
    '__pycache__',
    'main',
    '000',
    'test',
    'smarttech',
    'getcounty',
    'proctergamble',
    'jmeter',
    'java',
    'osf'
]

# scrapers urls
urls = [
     'https://dev.laurentiumarian.ro/scraper/PeViitor_Scrapers_Melania/',
     'https://dev.laurentiumarian.ro/scraper/Scrapers_start_with_digi/',
     'https://dev.laurentiumarian.ro/scraper/Scrapers_Job_PeViitor/',
    'https://dev.laurentiumarian.ro/scraper/based_scraper_py/',
     'https://dev.laurentiumarian.ro/scraper/based_scraper_js/',
     'https://dev.laurentiumarian.ro/scraper/JobsScrapers/',
     'https://dev.laurentiumarian.ro/scraper/Scrapers_Cristi_Olteanu/',
     'https://dev.laurentiumarian.ro/scraper/Scrapers_canghelet/',
     'https://dev.laurentiumarian.ro/scraper/scrapers_david/',
     'https://dev.laurentiumarian.ro/scraper/Scrapers_Dan_Marius/',
     'https://dev.laurentiumarian.ro/scraper/scrapers_Larisa_M16/',
     'https://dev.laurentiumarian.ro/scraper/Scrapers_Matei/',
     'https://dev.laurentiumarian.ro/scraper/spider_web_scraper_jmeker/'
]

# make a request to get the scrapers
def get_scrapers(url):
    """Returns a list of scrapers."""
    response = requests.get(url)

    return response.json()

# make a request to get the logos
def get_logos():
    """Returns a list of logos."""
    url = 'https://api.peviitor.ro/v1/logo/'

    response = requests.get(url)

    obj = response.json().get('companies')
    data = {}
    
    for company in obj:
        name = company.get('name').lower()
        data[name] = company.get('logo')

    return data

# list of new companies for scrapers.js
json_file = []

# get the logos
logos = get_logos()

# loop through the urls
for url in urls:
    # get the data
    data = get_scrapers(url)[1].items()

    # identify the extensions
    extensions = {
        "py": "Python",
        "js": "JavaScript",
        "jmx": "JMeter",
    }

    # loop through the data
    for key, value in data:
        company = key.lower().split('_')[0]
        
        # html template
        html = f'''
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="../../css/scraper.css" />
        <title></title>
    </head>
    <body>
        <div class="header">
            <a href="/">
                <div class="logo">
                    <h3><i>Scraper-UI.</i></h3>
                    <img alt="logo" height="30" src="../../images/svg/peviitor.svg" width="100"/>
                </div>
            </a>
            <div class="nav-links">
                <a href="https://firme.peviitor.ro/" target="_blank">Firme PeViitor</a>
                <a href="../../doc.html">Documentation</a>
            </div>
        </div>
        <!-- Start Section Alert -->
        <div class="alertPopUp active">
            <div class="alertPopUp-content">
                <img alt="Check" class="alert-img" id="image-alert" src="" />
                <div class="message">
                    <span class="alert-text-1"> </span>
                    <span class="alert-text-2"> </span>
                </div>
            </div>
            <p class="close">X</p>
            <div class="progress active"></div>
        </div>
        <!-- End Section Alert -->
        <section class="company">
            <div class="company-container">
                <div class="flip-card-container">
                    <div class="flip-card">
                        <div class="box">
                            <img alt="{company.lower()}"  src="{logos.get(company.lower())}" />
                        </div>
                        <div class="box2">
                            <a href="#" target="_blank">
                            Careers
                            </a>
                            <a href="#" target="_blank">
                            Targetare.ro
                            </a>
                        </div>
                    </div>
                </div>
                <div class="chart-container">
                    <canvas id="Chart"> </canvas>
                </div>
            </div>
        </section>
        <div class="container-details">
            <div class="scraper-details">
                <div class="details">
                    <h5>Company</h5>
                    <p id="company"></p>
                </div>
                <div class="hr"></div>
                <div class="details">
                    <h5>Status</h5>
                    <p id="status">Uknown</p>
                </div>
                <div class="hr"></div>
                <div class="details">
                    <h5>Jobs</h5>
                    <p id="jobs">Uknown</p>
                </div>
                <div class="hr"></div>
                <div class="details">
                    <h5>Last Update</h5>
                    <p id="last-update">Uknown</p>
                </div>
                <div class="hr"></div>
                <div class="details">
                    <h5>
                        Scraper
                    </h5>
                    <p id="scraper-lg">
                        {extensions.get(value.split(".")[-1])}
                    </p>
                </div>
                <div class="hr"></div>
                  <div class="details">
                        <h5>Contributors</h5>
                        <div id="contributors"></div>
                    </div>
                <div class="hr"></div>
                 <div class="details">
                     <h5>Testers</h5>
                         <div id="testers"></div>
                </div>
            </div>
            <div class="functionality">
                <button>
                    <div>Run Scraper</div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16px"
                        height="16px"
                        viewbox="0 0 16 16"
                        fill="white"
                        class="bi bi-gear"
                    >
                        <path
                        d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"
                        />
                        <path
                        d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"
                        />
                    </svg>
                </button>
                
                <a
                href="https://peviitor.ro/rezultate?company={company}&country=Rom%C3%A2nia&page=1"
                target="_blank"
                class="functionality-buttons"
                >See Jobs</a
                >

                <p class="delete-storage">Delete Local Storage</p>

                <a href="https://github.com/peviitor-ro/{url.split("/")[-2]}/blob/main/sites/{value}" target="_blank" class="functionality-buttons">
                    GitHubRepo
                </a>
                <a href="https://github.com/peviitor-ro/{url.split("/")[-2]}/issues" target="_blank">
                    Report 🐞
                </a>
                <a
                href="https://www.google.com/url?q=https%3A%2F%2Fdiscord.gg%2Ft2aEdmR52a&sa=D&sntz=1&usg=AOvVaw2T-L7jAgzen0J-qResoTGU"
                target="_blank"
                class="functionality-buttons"
                >
                    Join Discord
                </a>
            </div>
        </div>
        <div class="jobs"></div>
        <div class="skeleton-jobs">
            <template id="card-template">
                <div class="skeleton-job">
                    <div>
                        <p class="skeleton-job-title"></p>
                        <p class="skeleton-job-company"></p>
                        <p class="skeleton-job-location"></p>
                    </div>
                    <div class="skeleton-job-post">
                        <p></p>
                    </div>
                </div>
            </template>
        </div>
        <div class="console hidden">
            <button class="close-console" onclick="closeConsole()">x</button>
            <div class="console-content"></div>
        </div>
        <div onclick="toTop()" class="button-to-top-parent">
            <div class="button-to-top">&#8679;</div>
        </div>
        <script>
            // De Modificat
            const apiObj = {{
                file: "{value}",
                url: "{url}",
                dataSetUrl: "{url.replace('scraper', 'dataset')}{value}/",
            }};
            // ##########################################
        </script>
        <script src="../../js/countries.js"></script>
        <script src="../../js/counties.js"></script>
        <script src="../../js/scraper.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
        <script src="../../js/chart.js"></script>
    </body>
</html>
        '''
        
        # Create folder
        try:
            # if the folder exists, continue
            folder = company.lower()
            if folder not in exclude:
                os.mkdir(f'{path}/src/{company.lower()}')

                with open(f'{path}/src/{company.lower()}/index.html', 'w',encoding='utf-8') as f:
                    f.write(html)

                    json_file.append({"name": company})
                    print(f'Folder {folder} created.')
        except FileExistsError:
            continue

# set the pattern 
pattern = re.compile(r'let scrapers = \[(.*?)\];', re.DOTALL)

# get the content of the file
with open('js/scrapers.js', 'r') as f:
    content = f.read()

# find the pattern
result = '[' + pattern.search(content).group(1).replace('name:', '"name":').replace(' ', '').replace('\n', '') + ']'

# convert to  dict
result = json.loads(result.replace('",}', '"}').replace('},]', '}]')) + json_file

# add new results in file
with open('js/scrapers.js', 'w') as f:
    f.write(f'let scrapers = {json.dumps(result, indent=2)};')



    
