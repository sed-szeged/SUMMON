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


class LiveTrafficWindow(object):

    def __init__(self):
        options = webdriver.ChromeOptions()
        options.add_argument('--headless')
        options.add_argument('--no-sandbox')
        # self.driver = webdriver.Chrome(chrome_options=options)
        self.driver = webdriver.Chrome('c:\\chromedriver.exe')
        self.driver.implicitly_wait(1)

    def process_request(self, request, spider):
        self.driver.get(request.url)
        cookie_button = self.driver.find_element_by_xpath('//button[@class="qc-cmp-button"]')
        cookie_button.click()
        #
        # self.driver.find_element_by_xpath('//input[@id="dispRoadworks"]').click()
        # self.driver.find_element_by_xpath('//input[@id="dispCongestion"]').click()
        # sleep(1)

        # xpath = "//aa-hybrid-google-map[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[3]/div[1]"
        xpath = "//map/area"
        divs = self.driver.find_elements_by_xpath(xpath)
        body = ""

        for div in divs:
            sleep(0.2)
            # div = div.find_element_by_xpath('.//map/area')
            self.driver.execute_script("arguments[0].click();", div)

            xpath = "//div[@id='aa-iwindow']"
            source = self.driver.find_element_by_xpath(xpath).get_attribute('innerHTML')

            body += "<div class='container'>"
            body += source
            body += "</div>"

        body = str(body).replace('<!--', '').replace('-->', '</p>')
        print(body)
        return HtmlResponse(self.driver.current_url, body=body, encoding='utf-8', request=request)
