# -*- coding: utf-8 -*-

# Define here the models for your spider middleware
#
# See documentation in:
# http://doc.scrapy.org/en/latest/topics/spider-middleware.html

# -*- coding: utf-8 -*-

# Define here the models for your spider middleware
#
# See documentation in:
# http://doc.scrapy.org/en/latest/topics/spider-middleware.html
import logging
from time import sleep

from scrapy.http import HtmlResponse
from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException


class LiveTrafficWindow(object):

    def __init__(self):
        options = webdriver.ChromeOptions()
        options.add_argument('--headless')
        options.add_argument('--no-sandbox')
        options.add_argument('--window-size=1920,1080')
        self.driver = webdriver.Chrome(executable_path='c:\\chromedriver.exe', chrome_options=options)
        # self.driver = webdriver.Chrome('c:\\chromedriver.exe')
        self.driver.implicitly_wait(1)

    def process_request(self, request, spider):
        self.driver.get(request.url)
        cookie_button = self.driver.find_element_by_xpath('//button[@class="qc-cmp-button"]')
        cookie_button.click()

        divs = self.driver.find_elements_by_xpath("//body//div[@class='gm-style']//div//div//div[3]//div[map]")
        body = ""

        for div in divs:
            try:
                sleep(0.2)
                div = div.find_element_by_xpath('.//area')
                self.driver.execute_script("arguments[0].click();", div)

                xpath = "//div[@id='aa-iwindow']"
                source = self.driver.find_element_by_xpath(xpath).get_attribute('innerHTML')

                body += "<div class='container'>"
                body += source
                body += "</div>"
                body = str(body).replace('<!--', '').replace('-->', '</p>')
            except NoSuchElementException as e:
                logging.info("Empty div found")
        return HtmlResponse(self.driver.current_url, body=body, encoding='utf-8', request=request)
