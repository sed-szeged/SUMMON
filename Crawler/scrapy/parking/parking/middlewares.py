# -*- coding: utf-8 -*-

# Define here the models for your spider middleware
#
# See documentation in:
# https://doc.scrapy.org/en/latest/topics/spider-middleware.html
from time import sleep

from scrapy.http import HtmlResponse
from selenium import webdriver


class ParkingWindow(object):

    def __init__(self):
        options = webdriver.ChromeOptions()
        options.add_argument('--headless')
        options.add_argument('--no-sandbox')
        self.driver = webdriver.Chrome(chrome_options=options)
        self.driver.implicitly_wait(1)

    def process_request(self, request, spider):
        self.driver.get(request.url)
        sleep(4)

        body = self.driver.page_source
        return HtmlResponse(self.driver.current_url, body=body, encoding='utf-8', request=request)
