# -*- coding: utf-8 -*-

# Scrapy settings for parking project
#
# For simplicity, this file contains only settings considered important or
# commonly used. You can find more settings consulting the documentation:
#
#     https://doc.scrapy.org/en/latest/topics/settings.html
#     https://doc.scrapy.org/en/latest/topics/downloader-middleware.html
#     https://doc.scrapy.org/en/latest/topics/spider-middleware.html

BOT_NAME = 'parking'

SPIDER_MODULES = ['parking.spiders']
NEWSPIDER_MODULE = 'parking.spiders'


ROBOTSTXT_OBEY = True
TELNETCONSOLE_ENABLED = False

ITEM_PIPELINES = {
    'parking.pipelines.MongoDBPipelineIdokep': 200,
}

DOWNLOADER_MIDDLEWARES = {
    'parking.middlewares.ParkingWindow': 2,
}

# FEED_EXPORTERS = {
# #     'jsonlines': 'scrapy.exporters.JsonLinesItemExporter'
# # }
# #
# # FEED_STORAGES = {
# #     'file': 'scrapy.extensions.feedexport.FileFeedStorage',
# # }
FEED_EXPORT_ENCODING = 'utf-8'

MONGO_URI = 'mongodb://localhost:27017'
MONGO_DATABASE = 'iot_mining'
