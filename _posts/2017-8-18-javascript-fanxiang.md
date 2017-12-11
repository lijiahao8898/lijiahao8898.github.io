---
layout: post
title: javascript - !~
categories:
- ES5
---

### javascript - 按位取反

过滤market标签的数据

```js
        /**
         * 过滤掉营销组件
         *
         * @param {Array} modList
         * @returns
         */

        function filterMods(modList) {
            return modList.filter(function(item) {
                return item.tag && (!~item.tag.indexOf('market'));
            });
        }
```
<!--break-->