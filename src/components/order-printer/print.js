class Print {
  constructor(dom, options) {
    if (!(this instanceof Print)) return new Print(dom, options);

    this.options = this.extend(options);

    if (typeof dom === 'string') {
      this.dom = document.querySelector(dom);
    } else {
      this.isDOM(dom);
      this.dom = this.isDOM(dom) ? dom : dom.$el;
    }

    this.init();
  }

  init() {
    const content = this.getStyle() + this.getHtml();
    this.writeIframe(content);
  }

  extend(obj, obj2) {
    for (const k in obj2) {
      obj[k] = obj2[k];
    }
    return obj;
  }

  getStyle() {
    let str = '';
    const styles = document.querySelectorAll('style,link');
    for (let i = 0; i < styles.length; i++) {
      str += styles[i].outerHTML;
    }
    str +=
      this.options.size &&
      '<style>' +
        `@page { margin: 0; size: ${this.options.size.paper || 'A5'} ${this
          .options.size.direction ||
          'landscape'}; /*portrait： 纵向打印,  landscape: 横向*/ } ` +
        '</style>';

    return str;
  }

  getHtml() {
    const inputs = document.querySelectorAll('input');
    const textareas = document.querySelectorAll('textarea');
    const selects = document.querySelectorAll('select');

    for (let k = 0; k < inputs.length; k++) {
      if (inputs[k].type === 'checkbox' || inputs[k].type === 'radio') {
        if (inputs[k].checked === true) {
          inputs[k].setAttribute('checked', 'checked');
        } else {
          inputs[k].removeAttribute('checked');
        }
      } else if (inputs[k].type === 'text') {
        inputs[k].setAttribute('value', inputs[k].value);
      } else {
        inputs[k].setAttribute('value', inputs[k].value);
      }
    }

    for (let k2 = 0; k2 < textareas.length; k2++) {
      if (textareas[k2].type === 'textarea') {
        textareas[k2].innerHTML = textareas[k2].value;
      }
    }

    for (let k3 = 0; k3 < selects.length; k3++) {
      if (selects[k3].type === 'select-one') {
        const child = selects[k3].children;
        for (const i in child) {
          if (child[i].tagName === 'OPTION') {
            if (child[i].selected === true) {
              child[i].setAttribute('selected', 'selected');
            } else {
              child[i].removeAttribute('selected');
            }
          }
        }
      }
    }

    return this.dom.outerHTML;
  }

  writeIframe(content) {
    const iframe = document.createElement('iframe');
    const f = document.body.appendChild(iframe);
    iframe.id = 'myIframe';
    iframe.setAttribute(
      'style',
      'position:absolute;width:0;height:0;top:-10px;left:-10px;'
    );
    const w = f.contentWindow || f.contentDocument;
    const doc = f.contentDocument || f.contentWindow.document;
    doc.open();
    doc.write(content);
    doc.close();
    const _this = this;
    iframe.onload = function() {
      _this.toPrint(w);
      setTimeout(function() {
        document.body.removeChild(iframe);
      }, 100);
    };
  }

  toPrint(frameWindow) {
    try {
      setTimeout(function() {
        frameWindow.focus();
        try {
          if (!frameWindow.document.execCommand('print', false, null)) {
            frameWindow.print();
          }
        } catch (e) {
          frameWindow.print();
        }
        frameWindow.close();
      }, 10);
    } catch (err) {
      console.log('err', err);
    }
  }

  isDOM(obj) {
    if (typeof HTMLElement === 'object') {
      return obj instanceof HTMLElement;
    } else {
      return (
        obj &&
        typeof obj === 'object' &&
        obj.nodeType === 1 &&
        typeof obj.nodeName === 'string'
      );
    }
  }
}

export default Print;
