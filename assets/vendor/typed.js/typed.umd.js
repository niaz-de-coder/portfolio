// Ensure the Typed.js script is correctly linked
(function (t, s) {
    if ("object" == typeof exports && "undefined" != typeof module) {
      module.exports = s();
    } else if ("function" == typeof define && define.amd) {
      define(s);
    } else {
      (t || self).Typed = s();
    }
  })(this, function () {
    function t() {
      return t = Object.assign ? Object.assign.bind() : function (t) {
        for (var s = 1; s < arguments.length; s++) {
          var e = arguments[s];
          for (var n in e) {
            if (Object.prototype.hasOwnProperty.call(e, n)) {
              t[n] = e[n];
            }
          }
        }
        return t;
      }, t.apply(this, arguments);
    }

    var s = {
      strings: ["These are the default values...", "You know what you should do?", "Use your own!", "Have a great day!"],
      typeSpeed: 0,
      startDelay: 0,
      backSpeed: 0,
      smartBackspace: true,
      shuffle: false,
      backDelay: 700,
      fadeOut: false,
      fadeOutClass: "typed-fade-out",
      fadeOutDelay: 500,
      loop: false,
      loopCount: Infinity,
      showCursor: true,
      cursorChar: "|",
      autoInsertCss: true,
      attr: null,
      bindInputFocusEvents: false,
      contentType: "html",
      onBegin: function () { },
      onComplete: function () { },
      preStringTyped: function () { },
      onStringTyped: function () { },
      onLastStringBackspaced: function () { },
      onTypingPaused: function () { },
      onTypingResumed: function () { },
      onReset: function () { },
      onStop: function () { },
      onStart: function () { },
      onDestroy: function () { }
    };

    var e = new (function () {
      function e() {}

      var n = e.prototype;

      n.load = function (e, n, i) {
        if (e.el = "string" == typeof i ? document.querySelector(i) : i,
          e.options = t({}, s, n),
          e.isInput = "input" === e.el.tagName.toLowerCase(),
          e.attr = e.options.attr,
          e.bindInputFocusEvents = e.options.bindInputFocusEvents,
          e.showCursor = !e.isInput && e.options.showCursor,
          e.cursorChar = e.options.cursorChar,
          e.cursorBlinking = true,
          e.elContent = e.attr ? e.el.getAttribute(e.attr) : e.el.textContent,
          e.contentType = e.options.contentType,
          e.typeSpeed = e.options.typeSpeed,
          e.startDelay = e.options.startDelay,
          e.backSpeed = e.options.backSpeed,
          e.smartBackspace = e.options.smartBackspace,
          e.backDelay = e.options.backDelay,
          e.fadeOut = e.options.fadeOut,
          e.fadeOutClass = e.options.fadeOutClass,
          e.fadeOutDelay = e.options.fadeOutDelay,
          e.isPaused = false,
          e.strings = e.options.strings.map(function (t) { return t.trim(); }),
          e.stringsElement = "string" == typeof e.options.stringsElement ? document.querySelector(e.options.stringsElement) : e.options.stringsElement,
          e.stringsElement) {
          e.strings = [];
          e.stringsElement.style.cssText = "clip: rect(0 0 0 0);clip-path:inset(50%);height:1px;overflow:hidden;position:absolute;white-space:nowrap;width:1px;";
          var r = Array.prototype.slice.apply(e.stringsElement.children),
            o = r.length;
          if (o)
            for (var a = 0; a < o; a += 1)
              e.strings.push(r[a].innerHTML.trim());
        }

        for (var u in e.strPos = 0, e.currentElContent = this.getCurrentElContent(e),
          e.currentElContent && e.currentElContent.length > 0 && (e.strPos = e.currentElContent.length - 1,
            e.strings.unshift(e.currentElContent)),
          e.sequence = [],
          e.strings)
          e.sequence[u] = u;

        e.arrayPos = 0;
        e.stopNum = 0;
        e.loop = e.options.loop;
        e.loopCount = e.options.loopCount;
        e.curLoop = 0;
        e.shuffle = e.options.shuffle;
        e.pause = { status: false, typewrite: true, curString: "", curStrPos: 0 };
        e.typingComplete = false;
        e.autoInsertCss = e.options.autoInsertCss;
        e.autoInsertCss && (this.appendCursorAnimationCss(e), this.appendFadeOutAnimationCss(e));
      };

      n.getCurrentElContent = function (t) { return t.attr ? t.el.getAttribute(t.attr) : t.isInput ? t.el.value : "html" === t.contentType ? t.el.innerHTML : t.el.textContent; };
      n.appendCursorAnimationCss = function (t) {
        var s = "data-typed-js-cursor-css";
        if (t.showCursor && !document.querySelector("[" + s + "]")) {
          var e = document.createElement("style");
          e.setAttribute(s, "true");
          e.innerHTML = `
            .typed-cursor {
              opacity: 1;
            }
            .typed-cursor.typed-cursor--blink {
              animation: typedjsBlink 0.7s infinite;
              -webkit-animation: typedjsBlink 0.7s infinite;
            }
            @keyframes typedjsBlink {
              50% { opacity: 0.0; }
            }
            @-webkit-keyframes typedjsBlink {
              0% { opacity: 1; }
              50% { opacity: 0.0; }
              100% { opacity: 1; }
            }
          `;
          document.body.appendChild(e);
        }
      };

      n.appendFadeOutAnimationCss = function (t) {
        var s = "data-typed-fadeout-js-css";
        if (t.fadeOut && !document.querySelector("[" + s + "]")) {
          var e = document.createElement("style");
          e.setAttribute(s, "true");
          e.innerHTML = `
            .typed-fade-out {
              opacity: 0;
              transition: opacity .25s;
            }
            .typed-cursor.typed-cursor--blink.typed-fade-out {
              -webkit-animation: 0;
              animation: 0;
            }
          `;
          document.body.appendChild(e);
        }
      };

      return e;
    })();

    return function () {
      function t(t, s) {
        e.load(this, s, t);
        this.begin();
      }

      var s = t.prototype;

      s.toggle = function () {
        this.pause.status ? this.start() : this.stop();
      };

      s.stop = function () {
        this.typingComplete || this.pause.status || (this.toggleBlinking(true), this.pause.status = true, this.options.onStop(this.arrayPos, this));
      };

      s.start = function () {
        this.typingComplete || this.pause.status && (this.pause.status = false, this.pause.typewrite ? this.typewrite(this.pause.curString, this.pause.curStrPos) : this.backspace(this.pause.curString, this.pause.curStrPos), this.options.onStart(this.arrayPos, this));
      };

      s.destroy = function () {
        this.reset(false);
        this.options.onDestroy(this);
      };

      s.reset = function (t) {
        void 0 === t && (t = true);
        clearInterval(this.timeout);
        this.replaceText("");
        this.cursor && this.cursor.parentNode && (this.cursor.parentNode.removeChild(this.cursor), this.cursor = null);
        this.strPos = 0;
        this.arrayPos = 0;
        this.curLoop = 0;
        t && (this.options.onReset(), this.showCursor && this.toggleBlinking(true));
      };

      s.begin = function () {
        var t = this;
        this.strings = [].concat(this.strings);
        this.strings.push("");
        this.strings[this.strings.length - 1] = "";
        this.autoInsertCss && this.appendCursorAnimationCss(this);
        this.startDelayed();
      };

      return t;
    };
  })();
  
  // Example of initializing Typed.js
  const options = {
    strings: ["Welcome to Typed.js!", "This is an animated typing effect.", "Enjoy!"],
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
    loop: true,
    showCursor: true,
    cursorChar: "|",
  };
  
  const typed = new Typed("#typed-output", options);