import os
from bs4 import BeautifulSoup

import re
import json
import html

path = os.path.dirname(os.path.abspath(__file__))


# get all the files from the src folder
files = os.listdir(f'{path}/src')

for folder in files:
    try:
        with open(f'{path}/src/{folder}/index.html', 'r') as f:
            soup = BeautifulSoup(f.read(), 'html.parser')

        header = soup.find('div', {'class': 'header'})

        anchors = header.find_all('a')

        if len(anchors) == 1:
            #create a new a tag
            a_tag = soup.new_tag('a', href='../../doc.html', style='margin-left: auto')
            a_tag.string = 'Documentation'
            header.append(a_tag)

        tagHtml = '''
            <div class="doc-container">
            <div class="open-doc"></div>
            <div class="doc-text">
                <div class="d-none">&#10060;</div>
                <h1>What is Web Scraping?</h1>

                <p>
                Web scraping refers to the
                <strong>extraction of data from a website</strong>. This information
                is collected and then exported into a format that is more useful for
                the user. Be it a spreadsheet or an API.
                </p>
                <p>
                Although web scraping can be done manually, in most cases, automated
                tools are preferred when scraping web data as they can be less costly
                and work at a faster rate.
                </p>
                <p>
                But in most cases, web scraping is not a simple task.
                <a
                    href="https://www.expertmarket.com/uk/web-design/different-types-of-websites"
                    target="_blank"
                    >Websites come in many shapes and forms,</a
                >
                as a result, web scrapers vary in functionality and features.
                </p>

                <h1>How do Web Scrapers Work?</h1>
                <p>
                So, how do web scrapers work? Automated web scrapers work in a rather
                simple but also complex way. After all, websites are built for humans
                to understand, not machines.
                </p>
                <p>
                First, the web scraper will be given one or more URLs to load before
                scraping. The scraper then loads the entire HTML code for the page in
                question. More advanced scrapers will render the entire website,
                including CSS and Javascript elements.
                </p>
                <p>
                Then the scraper will either extract all the data on the page or
                specific data selected by the user before the project is run.
                </p>
                <p>
                Ideally, the user will go through the process of selecting the
                specific data they want from the page. For example, you might want to
                scrape an Amazon product page for prices and models but are not
                necessarily interested in product reviews.
                </p>
                <p>
                Lastly, the web scraper will output all the data that has been
                collected into a format that is more useful to the user.
                </p>
                <p>
                Most web scrapers will output data to a CSV or Excel spreadsheet,
                while more advanced scrapers will support other formats such as JSON
                which can be used for an API.
                </p>
                <h1>See more about:</h1>
                <p>
                <a href="#WebScrapers1">Is web scraping legal?</a>
                </p>
                <p>
                <a href="#WebScrapers2">What Kind of Web Scrapers are There?</a>
                </p>
                <p>
                <a href="#WebScrapers3">What are Web Scrapers Used For?</a>
                </p>
                <p>
                <a href="#WebScrapers4">The Best Web Scraper</a>
                </p>
            </div>
            </div>
        '''

        if soup.find('div', {'class': 'doc-container'}) is None:
            soup.body.insert(2, BeautifulSoup(tagHtml, 'html.parser'))

        #create patter for const apiObj = {}
        pattern = re.compile(r'const apiObj = {.*};', re.DOTALL)
        script = soup.find('script').text

        data = pattern.findall(script)[0].replace('const apiObj = ', '').replace(';', '').replace('file', '"file"').replace('url', '"url"').replace('name', '"name"')
        #  replace last , with nothing
        data = data[::-1].replace(',', '', 1)[::-1]
        obj = json.loads(data)

        extensions = {
            'py': 'Python',
            'js': 'JavaScript',
        }

        tagHtml = f'''
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
                <div class="hr"></div>
                <div>
                <h5>Scraper</h5>
                <p id="scraper-lg">JavaScript</p>
                </div>
            </div>
        '''

        newsoup = BeautifulSoup(tagHtml, 'html.parser')

        extensio = extensions.get(obj['file'].split('.')[1].lower())
        newsoup.find('p', {'id': 'scraper-lg'}).string = extensio 

        soup.find('div', {'class': 'scraper-details'}).replace_with(newsoup)

        repos = {
            'Scrapers_start_with_digi': 'https://github.com/peviitor-ro/Scrapers_start_with_digi/tree/main/sites',
            'PeViitor_Scrapers_Melania': 'https://github.com/peviitor-ro/PeViitor_Scrapers_Melania/tree/main/sites',
            'JobsScrapers': 'https://github.com/peviitor-ro/JobsScrapers/tree/main/sites',
            'based_scraper_js': 'https://github.com/peviitor-ro/scrapers.js/tree/main/sites',
            'based_scraper_py': 'https://github.com/peviitor-ro/based_scraper_py/tree/main/sites',
            'Scrapers_Job_PeViitor': 'https://github.com/peviitor-ro/Scrapers_Job_PeViitor/tree/main/sites'
        }

        functionality = soup.find('div', {'class': 'functionality'})

        anchors = functionality.find_all('a')

        if len(anchors) == 1:

            repo = repos.get(obj['url'].split('/')[4])

            # create a new a tag
            a_tag = soup.new_tag('a', href=repo, target='_blank')
            a_tag.string = 'GitHub Repo'
            functionality.append(a_tag)

            # create a new a tag
            #set url to github issues
            issues = repo.replace('tree/main/sites', 'issues')
            a_tag = soup.new_tag('a', href=issues, target='_blank')
            char = '&#128030;'
            decode_char = html.unescape(char)
            string = soup.new_string(f'Report {decode_char}')
            a_tag.insert(0, string)
            functionality.append(a_tag)

        with open(f'{path}/src/{folder}/index.html', 'w') as f:
            f.write(str(soup))
    except Exception as e:
        print(f'Error with {folder}')
        print(e)
        continue
