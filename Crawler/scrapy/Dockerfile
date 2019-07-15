# As Scrapy runs on Python, I choose the official Python 3 Docker image.
FROM python:3
 
# Set the working directory to /usr/src/app.
WORKDIR /usr/src/app

RUN apt-get install -y unzip \ 
 && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
 && echo 'deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main' | tee /etc/apt/sources.list.d/google-chrome.list \
 && apt-get update -y \
 && apt-get install -y  google-chrome-stable \
 && wget https://chromedriver.storage.googleapis.com/2.35/chromedriver_linux64.zip \
 && unzip chromedriver_linux64.zip \
 && rm -rf chromedriver_linux64.zip \
 && mv chromedriver /usr/local/bin
 
# Copy the file from the local host to the filesystem of the container at the working directory.
COPY requirements.txt ./
COPY scrapyd.conf /etc/scrapyd/

#COPY docker_entrypoint.sh ./
#RUN ["chmod", "+x", "/usr/src/app/docker_entrypoint.sh"]
 
# Install Scrapy specified in requirements.txt.
RUN pip3 install --no-cache-dir -r requirements.txt

# Copy the project source code from the local host to the filesystem of the container at the working directory.
COPY . .

EXPOSE 6800
# Run the crawler when the container launches.
# CMD [ "python3", "./go-spider.py" ]
CMD ["scrapyd"]