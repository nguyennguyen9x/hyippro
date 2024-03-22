window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
        o = b;
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  BackgroundScaler: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3449etwP65PJqiB1MHTP1E3", "BackgroundScaler");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const {ccclass: ccclass, property: property} = cc._decorator;
    let BackgroundScaler = class BackgroundScaler extends cc.Component {
      constructor() {
        super(...arguments);
        this.designResolution = new cc.Size(720, 1280);
        this.fitX = false;
        this.fitY = false;
        this.lastWitdh = 0;
        this.lastHeight = 0;
        this.canvas = null;
      }
      start() {
        this.canvas = this.getCanvas();
        this.updateSize();
      }
      update(dt) {
        this.updateSize();
      }
      updateSize() {
        var frameSize = cc.view.getFrameSize();
        if (this.lastWitdh !== frameSize.width || this.lastHeight !== frameSize.height) {
          this.lastWitdh = frameSize.width;
          this.lastHeight = frameSize.height;
          if (null != this.canvas && this.fitX && !this.fitY) this.node.scaleX = this.canvas.designResolution.width / this.designResolution.width; else if (null != this.canvas && this.fitY && !this.fitX) this.node.scaleY = this.canvas.designResolution.height / this.designResolution.height; else {
            var frameScale = frameSize.width / frameSize.height;
            var designScale = this.designResolution.width / this.designResolution.height;
            this.designResolution.width / this.designResolution.height > frameSize.width / frameSize.height ? this.node.setScale(designScale / frameScale) : this.node.setScale(frameScale / designScale);
          }
        }
      }
      getCanvas(node = null) {
        null == node && (node = this.node);
        if (null != node.parent) {
          let canvas = node.parent.getComponent(cc.Canvas);
          return null != canvas ? canvas : this.getCanvas(node.parent);
        }
        return null;
      }
    };
    __decorate([ property ], BackgroundScaler.prototype, "designResolution", void 0);
    __decorate([ property ], BackgroundScaler.prototype, "fitX", void 0);
    __decorate([ property ], BackgroundScaler.prototype, "fitY", void 0);
    BackgroundScaler = __decorate([ ccclass ], BackgroundScaler);
    exports.default = BackgroundScaler;
    cc._RF.pop();
  }, {} ],
  LoadingController: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7fef7cAAapBiKsNOFgvVVaC", "LoadingController");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var REMOTE_CONFIG = "https://hzcdzdx59b.execute-api.ap-southeast-1.amazonaws.com/update/";
    const {ccclass: ccclass, property: property} = cc._decorator;
    let LoadingController = class LoadingController extends cc.Component {
      constructor() {
        super(...arguments);
        this.lblStatus = null;
        this.fireWorks = null;
      }
      start() {
        cc.sys.isNative && true ? this.getRemoteConfig() : this.alreadyUpToDate();
        let month = new Date().getMonth();
        if (0 === month || 1 === month) {
          this.fireWorks.active = true;
          this.fireWorks.getComponent(sp.Skeleton).setAnimation(0, "animation", true);
        }
      }
      getRemoteConfig() {
        let self = this;
        this.lblStatus.string = "\u0110ang t\u1ea3i ...";
        if (cc.sys.isNative) {
          let url = REMOTE_CONFIG;
          let xhr = new XMLHttpRequest();
          xhr.onreadystatechange = function() {
            if (4 === xhr.readyState) if (200 === xhr.status) {
              var response = JSON.parse(xhr.responseText);
              console.log(JSON.stringify(response));
              response.hasOwnProperty("is_ud") && response["is_ud"] ? self.getRemoteVersion(response["remote_url"]) : self.alreadyUpToDate();
            } else console.log("cfg err:", xhr.status, xhr.statusText, xhr.responseText);
          };
          xhr.onerror = function() {
            self.alreadyUpToDate();
          };
          xhr.ontimeout = function() {
            self.alreadyUpToDate();
          };
          xhr.open("POST", url, true);
          xhr.setRequestHeader("Content-type", "application/json");
          xhr.send();
        } else this.alreadyUpToDate();
      }
      getRemoteVersion(versionUrl) {
        let self = this;
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
          if (4 === xhr.readyState) if (200 === xhr.status) {
            let bundles = JSON.parse(xhr.responseText);
            let mainBundle = bundles["mainbundle"];
            let mainScene = bundles["mainscene"];
            let url = bundles["url"];
            let versionLobby = bundles[mainBundle];
            if (!url || "" === url || !versionLobby || "" === versionLobby) {
              self.alreadyUpToDate();
              return;
            }
            cc.sys.localStorage.setItem("version", JSON.stringify(bundles));
            cc.assetManager.loadBundle(url + mainBundle, {
              version: versionLobby
            }, (err, bundle) => {
              if (err) {
                self.sendLogError("Load bundle error", url + mainBundle, JSON.stringify(err));
                return;
              }
              bundle.loadScene(mainScene, (c, t, item) => {
                self.lblStatus.string = "\u0110ang t\u1ea3i..." + Math.round(c / t * 100) + "%";
              }, (error, scene) => {
                if (error) {
                  self.sendLogError("Load scene error", mainScene, JSON.stringify(err));
                  return;
                }
                cc.director.runScene(scene);
              });
            });
          } else self.alreadyUpToDate();
        };
        xhr.onerror = function() {
          self.alreadyUpToDate();
        };
        xhr.ontimeout = function() {
          self.alreadyUpToDate();
        };
        xhr.open("GET", versionUrl, true);
        xhr.send();
      }
      alreadyUpToDate() {
        this.lblStatus.string = "\u0110ang t\u1ea3i...0%";
        cc.assetManager.loadBundle("maingame", (err, bundle) => {
          if (err) {
            this.sendLogError("Load bundle error", "maingame", JSON.stringify(err));
            return;
          }
          bundle.loadScene("Lobby", (c, t, item) => {
            this.lblStatus.string = "\u0110ang t\u1ea3i..." + Math.round(c / t * 100) + "%";
          }, (error, scene) => {
            if (error) {
              this.sendLogError("Load scene error", "Lobby", JSON.stringify(err));
              return;
            }
            cc.director.runScene(scene);
          });
        });
      }
      getWebVersion() {
        true;
        return "";
      }
      sendLogError(name, service, err) {
        var params = {
          c: 6017,
          name: name,
          service: service,
          message: err,
          os: cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS ? "ios" : cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID ? "android" : "web",
          osVersion: cc.sys.osVersion,
          client: cc.sys.isNative ? JSON.parse(cc.sys.localStorage.getItem("version")).provider : "web",
          version: cc.sys.isNative ? JSON.parse(cc.sys.localStorage.getItem("version")).version : this.getWebVersion(),
          nn: "No nickname in loading"
        };
        var str = [];
        for (var p in params) params.hasOwnProperty(p) && str.push(encodeURIComponent(p) + "=" + encodeURIComponent(params[p]));
        var _params = str.join("&");
        var url = "https://portal.nhanhnhanhlen.com/api";
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
          4 === xhr.readyState && (200 === xhr.status ? cc.log("Send log success") : cc.log("Send log error"));
        };
        xhr.open("GET", url + "?" + _params, true);
        xhr.send();
      }
    };
    __decorate([ property(cc.Label) ], LoadingController.prototype, "lblStatus", void 0);
    __decorate([ property(cc.Node) ], LoadingController.prototype, "fireWorks", void 0);
    LoadingController = __decorate([ ccclass ], LoadingController);
    exports.default = LoadingController;
    cc._RF.pop();
  }, {} ],
  use_reversed_rotateTo: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c8780wu9f5DpIMOyB+Tk+tk", "use_reversed_rotateTo");
    "use strict";
    cc.RotateTo._reverse = true;
    cc._RF.pop();
  }, {} ]
}, {}, [ "BackgroundScaler", "LoadingController", "use_reversed_rotateTo" ]);