/**
 * @description 去除空格
 * @param String str 需要去除空格的字符串
 * @param String pos both(左右)|left|right|all 默认both
 */
function trim(str, pos = 'both') {
  str = String(str);
  if (pos === 'both') {
    return str.replace(/^\s+|\s+$/g, '');
  }
  if (pos === 'left') {
    return str.replace(/^\s*/, '');
  }
  if (pos === 'right') {
    return str.replace(/(\s*$)/g, '');
  }
  if (pos === 'all') {
    return str.replace(/\s+/g, '');
  }
  return str;
}

const test = {

  /**
 * 验证十进制数字
 */
  number(value) {
    return /^[\+-]?(\d+\.?\d*|\.\d+|\d\.\d+e\+\d+)$/.test(value);
  },
  empty(value) {
    switch (typeof value) {
      case 'undefined':
        return true;
      case 'string':
        if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length === 0) return true;
        break;
      case 'boolean':
        if (!value) return true;
        break;
      case 'number':
        if (value === 0 || isNaN(value)) return true;
        break;
      case 'object':
        if (value === null || value.length === 0) return true;
        for (const i in value) {
          return false;
        }
        return true;
    }
    return false;
  }

};

export default {
  addStyle(customStyle, target = 'object') {
    // 字符串转字符串，对象转对象情形，直接返回
    if (test.empty(customStyle) || typeof customStyle === 'object' && target === 'object' || target === 'string' &&
		typeof customStyle === 'string') {
      return customStyle;
    }
    // 字符串转对象
    if (target === 'object') {
      // 去除字符串样式中的两端空格(中间的空格不能去掉，比如padding: 20px 0如果去掉了就错了)，空格是无用的
      customStyle = trim(customStyle);
      // 根据";"将字符串转为数组形式
      const styleArray = customStyle.split(';');
      const style = {};
      // 历遍数组，拼接成对象
      for (let i = 0; i < styleArray.length; i++) {
        // 'font-size:20px;color:red;'，如此最后字符串有";"的话，会导致styleArray最后一个元素为空字符串，这里需要过滤
        if (styleArray[i]) {
          const item = styleArray[i].split(':');
          style[trim(item[0])] = trim(item[1]);
        }
      }
      return style;
    }
    // 这里为对象转字符串形式
    let string = '';
    for (const i in customStyle) {
      // 驼峰转为中划线的形式，否则css内联样式，无法识别驼峰样式属性名
      const key = i.replace(/([A-Z])/g, '-$1')
        .toLowerCase();
      string += `${key}:${customStyle[i]};`;
    }
    // 去除两端空格
    return trim(string);
  },
  deepClone(obj) {
    // 对常见的“非”值，直接返回原来值
    if ([null, undefined, NaN, false].includes(obj)) return obj;
    if (typeof obj !== 'object' && typeof obj !== 'function') {
      // 原始类型直接返回
      return obj;
    }
    const o = test.array(obj) ? [] : {};
    for (const i in obj) {
      if (obj.hasOwnProperty(i)) {
        o[i] = typeof obj[i] === 'object' ? this.deepClone(obj[i]) : obj[i];
      }
    }
    return o;
  },
  deepMerge(target = {}, source = {}) {
    target = this.deepClone(target);
    if (typeof target !== 'object' || typeof source !== 'object') return false;
    for (const prop in source) {
      if (!source.hasOwnProperty(prop)) continue;
      if (prop in target) {
        if (typeof target[prop] !== 'object') {
          target[prop] = source[prop];
        } else if (typeof source[prop] !== 'object') {
          target[prop] = source[prop];
        } else if (target[prop].concat && source[prop].concat) {
          target[prop] = target[prop].concat(source[prop]);
        } else {
          target[prop] = this.deepMerge(target[prop], source[prop]);
        }
      } else {
        target[prop] = source[prop];
      }
    }
    return target;
  },
  getPx(value, unit = false) {
    if (test.number(value)) {
      return unit ? `${value}px` : Number(value);
    }
    // 如果带有rpx，先取出其数值部分，再转为px值
    if (/(rpx|upx)$/.test(value)) {
      return unit ? `${uni.upx2px(parseInt(value))}px` : Number(uni.upx2px(parseInt(value)));
    }
    return unit ? `${parseInt(value)}px` : parseInt(value);
  },
  sleep(value = 30) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, value);
    });
  },
  sys() {
    return uni.getSystemInfoSync();
  },
  props: {},

};
