# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: http://doc.scrapy.org/en/latest/topics/item-pipeline.html
import datetime
import re

import pymongo

from datetime import date, timedelta


class MongoDBPipelineIdokep(object):
    collection_name = 'new_idokep'

    def __init__(self, mongo_uri, mongo_db):
        self.mongo_uri = mongo_uri
        self.mongo_db = mongo_db

    @classmethod
    def from_crawler(cls, crawler):
        return cls(
            mongo_uri=crawler.settings.get('MONGO_URI'),
            mongo_db=crawler.settings.get('MONGO_DATABASE')
        )

    def open_spider(self, spider):
        self.client = pymongo.MongoClient(self.mongo_uri)
        self.db = self.client[self.mongo_db]

    def close_spider(self, spider):
        self.client.close()

    def process_item(self, item, spider):
        item = format_item(item)
        self.db[self.collection_name].insert_one(dict(item))
        return item


def format_item(item):
    item['location'] = str(item['location']).split('/')[3]

    upload_time = str(item['time']).split(' ')
    upload_hour_min = [int(str(x).replace("'", "")) for x in upload_time[1].split(':')]

    if upload_time[0] == 'ma':
        today = date.today()
        item['time'] = datetime.datetime(year=today.year,
                                         month=today.month,
                                         day=today.day,
                                         hour=upload_hour_min[0],
                                         minute=upload_hour_min[1])
        # item['time'] = time.strftime("%Y-%m-%d") + " " + upload_time[1]
    else:
        yesterday = date.today() - timedelta(1)
        item['time'] = datetime.datetime(year=yesterday.year,
                                         month=yesterday.month,
                                         day=yesterday.day,
                                         hour=upload_hour_min[0],
                                         minute=upload_hour_min[1])

    item['sky_picture'] = re.search('[0-9]{3}.png', str(item['sky_picture'])).group()

    wind = re.search('[a-z|_]+.png', str(item['wind']))
    if wind is not None:
        item['wind'] = wind.group() if item['wind'] is not None else None
    else:
        item['wind'] = None

    return item
