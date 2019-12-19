# -*- coding: utf-8 -*-

# Scrapy settings for livetraffic project
#
# For simplicity, this file contains only settings considered important or
# commonly used. You can find more settings consulting the documentation:
#
#     https://doc.scrapy.org/en/latest/topics/settings.html
#     https://doc.scrapy.org/en/latest/topics/downloader-middleware.html
#     https://doc.scrapy.org/en/latest/topics/spider-middleware.html

BOT_NAME = 'livetraffic'

SPIDER_MODULES = ['livetraffic.spiders']
NEWSPIDER_MODULE = 'livetraffic.spiders'

ROBOTSTXT_OBEY = True
TELNETCONSOLE_ENABLED = False

DOWNLOADER_MIDDLEWARES = {
    'livetraffic.middlewares.LiveTrafficWindow': 2,
}

ITEM_PIPELINES = {
    'livetraffic.pipelines.MongoDBPipelineIdokep': 200,
}
#
# FEED_EXPORTERS = {
#     'jsonlines': 'scrapy.exporters.JsonLinesItemExporter'
# }
#
# FEED_STORAGES = {
#     'file': 'scrapy.extensions.feedexport.FileFeedStorage',
# }

FEED_EXPORT_ENCODING = 'utf-8'

MONGO_URI = 'mongodb://localhost:27017'
MONGO_DATABASE = 'iot_mining'
