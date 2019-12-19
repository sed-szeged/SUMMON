# coding=utf-8
import datetime

import scrapy

from ..items import IdokepItem


class IdoKepSpider(scrapy.Spider):
    name = 'idokep'
    start_urls = ['https://www.idokep.hu/eszlel']

    def parse(self, response):
        current_time = datetime.datetime.now()

        for observation in response.xpath('//ul[@class="commentlist"]/li'):
            item = IdokepItem()
            item['save_time'] = current_time
            item['location'] = str(observation.xpath('.//a[@class="helyseg"]/@href').extract_first()).encode('utf-8')
            item['time'] = str(observation.xpath('.//div[@class="mikor"]/text()').extract_first()).encode('utf-8')
            item['sky_picture'] = str(observation.xpath('.//div[@class="sor"][1]/div[2]').extract_first()).encode('utf-8')
            item['temperature'] = str(observation.xpath('.//div[@class="fok"]/text()').extract_first()).encode('utf-8')
            item['air_pressure'] = str(observation.xpath('.//div[text()="Légnyomás: "]/strong/text()').extract_first()).encode('utf-8')
            item['humidity'] = str(observation.xpath('.//div[text()="Páratartalom: "][2]/strong/text()').extract_first()).encode('utf-8')
            item['max_temperature'] = str(observation.xpath('.//div[text()="Tmax: "]/strong/text()').extract_first()).encode('utf-8')
            item['rain'] = str(observation.xpath('.//div[text()="Csapadék: "]/strong/text()').extract_first()).encode('utf-8')
            item['wind'] = str(observation.xpath('.//div[text()="Szél: "]/img/@src').extract_first()).encode('utf-8')
            yield item
