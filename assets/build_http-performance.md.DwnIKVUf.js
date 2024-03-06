import{_ as s,c as i,o as a,a4 as n}from"./chunks/framework.Bl20_RFa.js";const e="/assets/http-performance.BTMPPybW.png",l="/assets/http-tcp.DJ6GYXK0.png",m=JSON.parse('{"title":"HTTP Performance Optimization","description":"","frontmatter":{},"headers":[],"relativePath":"build/http-performance.md","filePath":"build/http-performance.md","lastUpdated":1709714163000}'),t={name:"build/http-performance.md"},p=n(`<h1 id="http-performance-optimization" tabindex="-1">HTTP Performance Optimization <a class="header-anchor" href="#http-performance-optimization" aria-label="Permalink to &quot;HTTP Performance Optimization&quot;">​</a></h1><h2 id="dns" tabindex="-1">DNS <a class="header-anchor" href="#dns" aria-label="Permalink to &quot;DNS&quot;">​</a></h2><p>在载入URL后，首先会去请求加载URL的IP，这就涉及到DNS解析时间，DNS优化则可总结为以下两点：</p><ol><li>减少DNS请求次数 <ol><li>在同一个网站中，减少不同域名的使用，使其降低DNS解析的时间</li></ol></li><li>缩短DNS解析时间 <ol><li>采用<code>dns-prefetch</code>，<strong>提前解析第三方服务器的IP地址</strong>，当之后有请求用到该IP时将不再耗费DNS解析时间</li><li>能够有效帮助缩短DNS解析产生的延迟</li></ol></li></ol><div class="language-html vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">link</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> rel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;dns-prefetch&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> href</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;https://baidu.com/&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>参考链接：<a href="https://developer.mozilla.org/zh-CN/docs/Web/Performance/dns-prefetch" target="_blank" rel="noreferrer">https://developer.mozilla.org/zh-CN/docs/Web/Performance/dns-prefetch</a></p><h2 id="gzip" tabindex="-1">GZIP <a class="header-anchor" href="#gzip" aria-label="Permalink to &quot;GZIP&quot;">​</a></h2><p>HTTP请求头: Accept-Encoding: gzip, deflate, br<br> HTTP响应头: Content-Encoding: gzip</p><ol><li>动态压缩: 在nginx.conf配置动态开启gzip，请求发生时nginx实时压缩返回文件</li></ol><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">#开启gzip</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">gzip  on;  </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">#低于1kb的资源不压缩 </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">gzip_min_length 1k;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">#压缩级别1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">9</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">，越大压缩率越高，同时消耗cpu资源也越多，建议设置在5左右。 </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">gzip_comp_level </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">5</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">#需要压缩哪些响应类型的资源，多个空格隔开。不建议压缩图片.</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">gzip_types text</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">plain application</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">javascript application</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">x</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">javascript text</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">javascript text</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">xml text</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">css;  </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">#配置禁用gzip条件，支持正则。此处表示ie6及以下不启用gzip（因为ie低版本不支持）</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">gzip_disable </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;MSIE [1-6]</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\.</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;  </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">#是否添加“</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Vary</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: Accept</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Encoding”响应头</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">gzip_vary on;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><ol start="2"><li><strong>静态压缩</strong>: 提前将文件压缩成 .gz 格式，请求来了，直接返回即可</li></ol><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"># 开启gzip静态文件返回，请求文件中有匹配到 .gz 则返回，无则返回请求文件</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">gzip_static on;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="缓存" tabindex="-1">缓存 <a class="header-anchor" href="#缓存" aria-label="Permalink to &quot;缓存&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 开启强制缓存</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 300秒内加载本地缓存，不会去请求服务器，超过时间后会去请求，匹配文件是否修改，无修改则304，有修改则200</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">add_header Cache</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Control max</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">age</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">300</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 开启协商缓存</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 请求会通过 ETag/If-None-Match 或者 Last-Modified/If-Modified-Since 匹配文件是否修改，无修改则304，有修改则200</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">add_header Cache</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Control max</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">age</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h2 id="针对协议版本采取优化措施" tabindex="-1">针对协议版本采取优化措施 <a class="header-anchor" href="#针对协议版本采取优化措施" aria-label="Permalink to &quot;针对协议版本采取优化措施&quot;">​</a></h2><p><img src="`+e+'" alt=""><img src="'+l+'" alt=""></p><h3 id="connection-keep-live" tabindex="-1">connection: keep-live <a class="header-anchor" href="#connection-keep-live" aria-label="Permalink to &quot;connection: keep-live&quot;">​</a></h3><p>持久化HTTP，通过重用TCP连接，减少HTTP响应时间</p><h2 id="http2" tabindex="-1">HTTP2 <a class="header-anchor" href="#http2" aria-label="Permalink to &quot;HTTP2&quot;">​</a></h2><h3 id="头部压缩" tabindex="-1">头部压缩 <a class="header-anchor" href="#头部压缩" aria-label="Permalink to &quot;头部压缩&quot;">​</a></h3><ol><li>HTTP2 中对 HTTP 的头部进行压缩，常用头部使用数字类似的字典替代，节省头部传输流量</li></ol><h3 id="server-push" tabindex="-1">Server Push <a class="header-anchor" href="#server-push" aria-label="Permalink to &quot;Server Push&quot;">​</a></h3><ol><li>HTTP2 会对比如HTML中的引用css或js等资源，在服务端就提前简析并<strong>主动Push发送请求</strong>，减少客户端的解析请求时间</li><li>服务端会根据静态资源的依赖关系，主动向客户端推送可用用的静态资源，减少请求交互次数</li></ol><h3 id="多路复用" tabindex="-1">多路复用 <a class="header-anchor" href="#多路复用" aria-label="Permalink to &quot;多路复用&quot;">​</a></h3><ol><li>HTTP2 开启TCP connection，通过stream和frame进行传输，frame中的字段identifier标识此帧属于哪一个stream</li><li>identifier相同的frame属于同一流，服务端将identifier相同的帧解析成可用数据</li><li>在这个TCP connection中，同时传输了多个stream的帧数据，这就是HTTP/2的多路复用</li><li>相对于HTTP1.1，请求响应是有序的，而HTTP2多路复用通过流来传输，是无序的，这也是更快的一个点</li><li>提高请求并发数量，节省响应时间</li></ol>',25),h=[p];function r(k,d,o,c,E,g){return a(),i("div",null,h)}const u=s(t,[["render",r]]);export{m as __pageData,u as default};
