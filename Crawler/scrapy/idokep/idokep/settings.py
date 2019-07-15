# -*- coding: utf-8 -*-

# Scrapy settings for idokep project
#
# For simplicity, this file contains only settings considered important or
# commonly used. You can find more settings consulting the documentation:
#
#     http://doc.scrapy.org/en/latest/topics/settings.html
#     http://scrapy.readthedocs.org/en/latest/topics/downloader-middleware.html
#     http://scrapy.readthedocs.org/en/latest/topics/spider-middleware.html

BOT_NAME = 'idokep'

SPIDER_MODULES = ['idokep.spiders']
NEWSPIDER_MODULE = 'idokep.spiders'

ROBOTSTXT_OBEY = True
TELNETCONSOLE_ENABLED = False

ITEM_PIPELINES = {
    'idokep.pipelines.MongoDBPipelineIdokep': 200,
}

# FEED_EXPORTERS = {
#     'jsonlines': 'scrapy.exporters.JsonLinesItemExporter'
# }

# FEED_STORAGES = {
#     'file': 'scrapy.extensions.feedexport.FileFeedStorage',
# }
# FEED_URI = 'file:///C:/Users/Fehér Zoltán/Documents/szte/szakdolgozat/iot-datamining/idokep/result.jl'
# FEED_EXPORT_ENCODING = 'utf-8'

MONGO_URI = 'mongodb://mongodb:27017'
MONGO_DATABASE = 'iot_mining'
