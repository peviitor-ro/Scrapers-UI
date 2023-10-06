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
    'osfdigital',
    '000',
    'test',
    'smarttech'
]

# scrapers urls
urls = [
    'https://dev.laurentiumarian.ro/scraper/PeViitor_Scrapers_Melania/',
    'https://dev.laurentiumarian.ro/scraper/Scrapers_start_with_digi/',
    'https://dev.laurentiumarian.ro/scraper/Scrapers_Job_PeViitor/',
    'https://dev.laurentiumarian.ro/scraper/based_scraper_py/',
    'https://dev.laurentiumarian.ro/scraper/based_scraper_js/',
    'https://dev.laurentiumarian.ro/scraper/JobsScrapers/'
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
                    <h3>
                        <i>Scraper-UI.</i>
                    </h3>
                    <img
                        width="100"
                        height="30"
                        src="https://peviitor.ro/static/media/peviitor_logo.df4cd2d4b04f25a93757bb59b397e656.svg"
                        alt="logo"
                    />
                </div>
            </a>
            <a href="../../doc.html" style="margin-left: auto">
                Documentation
            </a>
        </div>
        <section class="company">
            <div class="company-container">
                <img
                width="320"
                height="120"
                src="{logos.get(company.lower())}" 
                alt="{company.lower()}"
                />
                <!-- De Modificat -->
                <div class="about">
                    <h2>About us</h2>
                    <p class="content hideContent" id="text-company">
                        <strong>About Company</strong> <br />
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
                        voluptatum, quas, quos voluptatibus, voluptas voluptate
                        exercitationem quia consequatur doloribus quod voluptatem
                        accusantium?
                    </p>
                    <p class="show-more">Show More</p>
                    <div>
                        <a
                        href="#" 
                        target="_blank"
                        >{company.lower().capitalize()} Careers</a
                        >
                    </div>
                </div>
                <!-- ################################ -->
            </div>
        </section>
        <div class="container-details">
            <div class="scraper-details">
                <div>
                    <h5>Company</h5>
                    <p id="company"></p>
                </div>
                <div class="hr"></div>
                <div>
                    <h5>Status</h5>
                    <p id="status">Uknown</p>
                </div>
                <div class="hr"></div>
                <div>
                    <h5>Jobs</h5>
                    <p id="jobs">Uknown</p>
                </div>
                <div class="hr"></div>
                <div>
                    <h5>Last Update</h5>
                    <p id="last-update">Uknown</p>
                </div>
                <div>
                    <h5>
                        Scraper
                    </h5>
                    <p id="scraper-lg">
                        {extensions.get(value.split(".")[-1])}
                    </p>
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
                href="https://peviitor.ro/rezultate?q={company}&country=Rom%C3%A2nia&page=1"
                target="_blank"
                >See Jobs</a
                >

                <p class="delete-storage">Delete Local Storage</p>

                <a href="https://github.com/peviitor-ro/{url.split("/")[-2]}/tree/main/sites" target="_blank">
                    GitHubRepo
                </a>
                <a href="https://github.com/peviitor-ro/{url.split("/")[-2]}/issues" target="_blank">
                    Report 🐞
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
        <div onclick="toTop()" class="button-to-top-parent">
            <div class="button-to-top">&#8679;</div>
        </div>
        <script>
            // De Modificat
            const apiObj = {{
                file: "{value}",
                url: "{url}",
            }};
            // ##########################################
        </script>
        <script src="../../js/countries.js"></script>
        <script src="../../js/scraper.js"></script>
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
    f.write(f'let scrapers = {json.dumps(result, indent=4)};')



    