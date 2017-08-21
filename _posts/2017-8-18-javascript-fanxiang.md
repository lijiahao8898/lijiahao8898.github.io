---
layout: post
title: javascript - !~
categories: [javascript]
---

### javascript - 按位取反

// 过滤market标签的数据

```
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