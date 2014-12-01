---
layout: default
title: 别抢我的糖丶
tagline: 
---
{% include JB/setup %}
<style>
	.m-section{
		padding-bottom: 20px;
	}
	.m-section .content{
		margin-left: 20px;
		border:2px solid #8E8E8E;
		border-radius: 15px 15px;
		padding: 10px;
	}
	.m-section .content h3{
		color: #000;
		font-size:18px;
	}
	.m-section .content h4{
		color: #000;
		font-size:16px;
	}
	.m-section .content .readmore{
		margin-left: 80%;
	}
</style>
<div class="m-section">
  {% for post in site.posts %}
    <div class="section-box">
	  	<div class="section-inner">
			<h3 class="title">
				<span>{{ post.date | date_to_string }}</span>&raquo;
				<a href="{{ post.url }}">{{ post.title }}</a>
				<span class="author">{{ post.tagline }}</span>
			</h3>
			<div class="content">
				{% case site.excerpt %}
				{% when "truncate_words" %}
				<span class="teaser"><p>{{ post.content | strip_html | truncatewords: 20 }}</p>
				{% when "teaser" %}
				<span class="teaser">{{ post.content  | split:'<!--more-->' | first }}
				{% endcase %}
				</span>
				<span class="readmore"><a href="{{ post.url }}">Read More</a></span>
			</div>
		</div>
	</div>
  {% endfor %}
</div>


