---
layout: post
category : lessons
tagline: ""
tags : [markdown, package, sublime text2]
---
{% include JB/setup %}

## sublime text2 配置支持 markdown

### 一、安装 markdown:

*   ctrl+ ‘ 打开命令控制台 输入如下命令（或者点击sublime的菜单栏 view->show console）.

>     import urllib2,os; pf='Package Control.sublime-package'; ipp = sublime.installed_packages_path(); os.makedirs( ipp ) if not os.path.exists(ipp) else None; urllib2.install_opener( urllib2.build_opener( urllib2.ProxyHandler( ))); open( os.path.join( ipp, pf), 'wb' ).write( urllib2.urlopen( 'http://sublime.wbond.net/' +pf.replace( ' ','%20' )).read()); print( 'Please restart Sublime Text to finish installation')

*   ps:sublime text3 请使用输入以下命令.

>     import urllib.request,os; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); open(os.path.join(ipp, pf), 'wb').write(urllib.request.urlopen( 'http://sublime.wbond.net/' + pf.replace(' ','%20')).read())

*   然后重启sublime.

*   接着安装 markdown preview.
     
     - ctrl+shift+p 唤出 package control.

     - 查找到 install package回车，如下图所示.

     ![markdown](/images/markdown.png)

     - 输入 markdown preview 回车.

     - 最后重启 sublime text 生效.

###二、让markdown高亮显示:


*    下载高亮语法:[Monokai-custom.tmTheme](https://github.com/Bubblings/tools/blob/master/Monokai-custom.tmTheme "Monokai-custom.tmTheme").

*    将Monokai-custom.tmTheme文件解压放置“Sublime Text\Data\Packages”目录下.

*    在Preferences–>Color Scheme–>User–>Monokai-custom 或者如下图所示.

      ![markdown](/images/markdown_2.jpg)

*    最后大功告成！






