---
layout: default
title: 别抢我的糖丶
tagline: 
---
{% include JB/setup %}

<div class="m-section m-section-index">
  {% for post in site.posts %}
    <div class="section-box">
	  	<div class="section-inner">
			<h2 class="title">
				<a href="{{ post.url }}">{{ post.title }}</a>
				<span class="author">{{ post.tagline }}</span>
			</h2>
			<p>
				<span class="glyphicon glyphicon-time"></span> Posted on {{ post.date | date_to_string }}
			</p>
			<hr>
			<div class="content">
				{% case site.excerpt %}
				{% when "truncate_words" %}
				{ post.content | strip_html | truncatewords: 20 }}</p>
				{% when "teaser" %}
				{{ post.content  | split:'<!--more-->' | first }}
				{% endcase %}
				<!-- <span class="readmore"><a href="{{ post.url }}">Read More</a></span> -->
			<a class="btn btn-primary" href="{{ post.url }}">Read More
				<span class="glyphicon glyphicon-chevron-right"></span>
			</a>
			</div>
			<hr>
		</div>
	</div>
  {% endfor %}
</div>


