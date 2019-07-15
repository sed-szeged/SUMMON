import datetime

import scrapy

from ..items import ParkingItem


class ParkingSpider(scrapy.Spider):
    name = 'parking'
    start_urls = ['https://www.parkme.com/map?q=#budapest']

    def parse(self, response):
        for observation in response.xpath('//div[@class="featured_lot_container"]'):
            item = ParkingItem()
            item['time'] = datetime.datetime.now()
            item['address'] = observation.xpath('.//div[@class="fle_lot_address"]/text()').extract_first()
            item['location'] = observation.xpath('.//div[@class="fle_lot_name"]/text()').extract()[1]
            item['used'] = observation.xpath('.//div[contains(@class, "occupancy-bar")]/text()').extract_first()
            yield item
