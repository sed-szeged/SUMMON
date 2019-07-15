import scrapy


class LiveTrafficSpider(scrapy.Spider):
    name = 'livetraffic'
    start_urls = ['https://www.theaa.com/route-planner/traffic-news/London']

    def parse(self, response):
        xpath = "//div[@class='container']"
        for element in response.xpath(xpath):
            item = dict()
            item['location'] = element.xpath('.//span[contains(@class, "iw-traffic-location")]/text()').extract_first()
            item['date'] = element.xpath('.//div[@class="iw-traffic-date"]/text()').extract_first()
            item['title'] = element.xpath('.//div[@class="iw-traffic-title"]/text()').extract_first()
            item['desc'] = element.xpath('.//div[@class="iw-traffic-desc"]/text()').extract_first()
            # item['alert_code'] = element.xpath('(.//p)[1]/text()').extract_first()
            # item['id'] = element.xpath('(.//p)[2]/text()').extract_first()
            # item['type'] = element.xpath('(.//p)[3]/text()').extract_first()
            # item['severity'] = element.xpath('(.//p)[4]/text()').extract_first()
            # item['dist_affected'] = element.xpath('(.//p)[5]/text()').extract_first()
            # item['delay_free_flow'] = element.xpath('(.//p)[6]/text()').extract_first()
            # item['delay_typical'] = element.xpath('(.//p)[7]/text()').extract_first()
            # item['impact'] = element.xpath('(.//p)[8]/text()').extract_first()
            yield item

