---
title: Embed Google Analytics in Your Admin Page
date: 2016-07-24
description: Having Google analytics visualization on your dashboard could be very handy. In this article you can see an easy way of adding analytics graphs with the use of Google spreadsheets.
---

I find it nice and useful to have some statistics on your admin dashboard. To do this you don't have to necessary use Google Analytics API on your site but create reports on Google Spreadsheet and then embed the graphs on your page. In this video is very well explained how to create reports and then graphs representing the data from the reports. Watch the video and create the graphs you want to have for your website.

[![Youtube clip](/images/google-analytics-spreadsheet-frame.png#center)](https://www.youtube.com/watch?v=N_Ok0rJwj2U)

Having all reports and graphs ready it's time to embed them on your site. Google gives you two options to do this. First option is iframe snippet and the second is an image. I've played around with the iframe snippet and although I've customized it to be responsive the content inside wasn't, meaning that if you open your page in mobile view some parts of the graph won't be visible and you'll have to scroll. I wasn't happy with the result and decided to use the image option instead but in order to still have the option to interact with the graphs I've created a link from the image opening the interactive graph in a new page .

```html
<a
  href="https://docs.google.com/spreadsheets/d/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-17K0WwQ/pubchart?oid=xxxxxxxxxxxx1&amp;format=interactive"
  target="_blank"
>
  <img
    src="https://docs.google.com/spreadsheets/d/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-17K0WwQ/pubchart?oid=xxxxxxxxxxxx&amp;format=image"
    alt="Top countries chart"
  />
</a>
```
