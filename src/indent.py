import os
from bs4 import BeautifulSoup

# Function to format an HTML document
def format_html_document(file_path, output_path=None):
    with open(file_path, 'r', encoding='utf-8') as file:
        soup = BeautifulSoup(file, 'html.parser')
    
    # Use prettify to add consistent indentation
    indented_html = soup.prettify()
    
    # Write the formatted HTML to the same file or a different output file
    output_file_path = output_path or file_path
    with open(output_file_path, 'w', encoding='utf-8') as file:
        file.write(indented_html)

# Function to find and format all index.html files in sub-folders of a directory
def format_all_index_html_files(base_folder):
    for root, _, files in os.walk(base_folder):
        for file_name in files:
            if file_name == "index.html":
                file_path = os.path.join(root, file_name)
                print(f"Formatting: {file_path}")
                format_html_document(file_path)

if __name__ == "__main__":
    base_folder = r"D:\Projects\Scrapers-UI\src"
    format_all_index_html_files(base_folder)
    print("Formatting complete.")
