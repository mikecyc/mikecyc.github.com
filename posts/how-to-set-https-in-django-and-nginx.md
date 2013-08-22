<!-- 
.. link: 
.. description: 
.. tags: Nginx, Django, 设置
.. date: 2013/08/22 21:44:21
.. title: Nginx如何设置Django的https重定向
.. slug: how-to-set-https-in-django-and-nginx
-->

## 遇到的问题

出于网络安全的考虑，[欢迅干线](http://www.joyit.me/)增加了SSL协议的连接，但发现Django在重定向跳转的时候总是回到普通的HTTP协议，而不是HTTPS协议。查了资料看到`HttpRequest.is_secure()`方法用来判断是否https连接，如果是的话就返回`True`。在Django 1.4 之前只能在Python的环境上去设置，而1.4重新改写了is_secure()方法，可以自己指定判断的变量和值。

## 如何设置Nginx和Django

Google了好几篇文章，都说在Nginx配置文件中增加下面的设置：

    :::bash
    proxy_set_header X-Forwarded-Protocol $scheme;

<!-- TEASER_END -->

但因为我用的Nginx没有通过代理的方式，所以没有办法拿到值，需要修改为：

    :::bash
    uwsgi_param HTTP_X_FORWARDED_PROTOCOL $scheme;

加在`location /{}`里面。然后再在Django工程的`settings.py`里增加 `SECURE_PROXY_SSL_HEADER`变量：

    :::bash
    SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTOCOL', 'https')

这种方法就是Nginx会设置SSL连接`HTTP_X_FORWARDED_PROTOCOL`的值为`https`，当然也要告诉Django判断的名称和值，详细参考Django文档 [SECURE_PROXY_SSL_HEADER](https://docs.djangoproject.com/en/1.4/ref/settings/#secure-proxy-ssl-header) 。