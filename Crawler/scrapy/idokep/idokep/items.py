# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# http://doc.scrapy.org/en/latest/topics/items.html

import scrapy


class IdokepItem(scrapy.Item):
    location = scrapy.Field()
    sky_picture = scrapy.Field()
    time = scrapy.Field()
    temperature = scrapy.Field()
    air_pressure = scrapy.Field()
    humidity = scrapy.Field()
    max_temperature = scrapy.Field()
    rain = scrapy.Field()
    wind = scrapy.Field()


class TrafficItem(scrapy.Item):
    img = scrapy.Field()
