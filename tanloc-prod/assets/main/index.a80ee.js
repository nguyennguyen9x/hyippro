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
            cc.assetManager.loadBundle(mainBundle, {
              version: ""
            }, (err, bundle) => {
              if (err) {
                self.sendLogError("Load bundle error", mainBundle, JSON.stringify(err));
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
  "Vietlott.Cmd": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4e911yywuRPkYDYY3a+jtSH", "Vietlott.Cmd");
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
    let VietlottCmd = class VietlottCmd extends cc.Component {
      start() {}
    };
    VietlottCmd = __decorate([ ccclass ], VietlottCmd);
    exports.default = VietlottCmd;
    cc._RF.pop();
  }, {} ],
  "Vietlott.Controller": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "745b8/J1OxLzY7vJV6hx8fd", "Vietlott.Controller");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Vietlott_Lobby_1 = require("./Vietlott.Lobby");
    const Vietlott_Result_1 = require("./Vietlott.Result");
    const Vietlott_Search_1 = require("./Vietlott.Search");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let VietlottController = class VietlottController extends cc.Component {
      constructor() {
        super(...arguments);
        this.lobby = null;
        this.search = null;
        this.result = null;
      }
      start() {
        this.lobby.node.active = false;
        this.search.node.active = false;
        this.result.node.active = false;
      }
    };
    __decorate([ property(Vietlott_Lobby_1.default) ], VietlottController.prototype, "lobby", void 0);
    __decorate([ property(Vietlott_Search_1.default) ], VietlottController.prototype, "search", void 0);
    __decorate([ property(Vietlott_Result_1.default) ], VietlottController.prototype, "result", void 0);
    VietlottController = __decorate([ ccclass ], VietlottController);
    exports.default = VietlottController;
    cc._RF.pop();
  }, {
    "./Vietlott.Lobby": "Vietlott.Lobby",
    "./Vietlott.Result": "Vietlott.Result",
    "./Vietlott.Search": "Vietlott.Search"
  } ],
  "Vietlott.Data": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8174cmZvahIG7qkn9q66uQ+", "Vietlott.Data");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.InfoModeVietlott = exports.Mode = void 0;
    class Mode {
      constructor(name) {
        this.name = name;
        switch (name) {
         case "Mega 6/45":
          this.listNumber = [];
          for (let i = 1; i <= 45; i++) this.listNumber.push(i);
          this.sizesTicket = [];
          for (let i = 5; i <= 18; i++) this.sizesTicket.push(i);
          break;

         case "Max 3D":
          this.listNumber = [];
          for (let i = 0; i <= 999; i++) this.listNumber.push(i);
          this.sizesTicket = [ 1 ];
          break;

         case "Power 6/55":
          this.listNumber = [];
          for (let i = 1; i <= 55; i++) this.listNumber.push(i);
          this.sizesTicket = [];
          for (let i = 5; i <= 18; i++) this.sizesTicket.push(i);
          break;

         case "Max 3D Pro":
          this.listNumber = [];
          for (let i = 0; i <= 999; i++) this.listNumber.push(i);
          this.sizesTicket = [];
          for (let i = 1; i <= 20; i++) this.sizesTicket.push(i);
          break;

         case "Keno":
          this.listNumber = [];
          for (let i = 0; i <= 80; i++) this.listNumber.push(i);
          this.sizesTicket = [ 6 ];
          for (let i = 21; i <= 28; i++) this.sizesTicket.push(i);
          break;

         case "BINGO18":
          this.listNumber = [];
          for (let i = 1; i <= 6; i++) this.listNumber.push(i);
          this.sizesTicket = [ 21, 23, 29 ];
          for (let i = 1; i <= 3; i++) this.sizesTicket.push(i);
          break;

         default:
          cc.error("init mode error");
        }
      }
    }
    exports.Mode = Mode;
    class InfoModeVietlott {}
    exports.InfoModeVietlott = InfoModeVietlott;
    InfoModeVietlott.MEGA_645 = new Mode("Mega 6/45");
    InfoModeVietlott.MAX_3D = new Mode("Max 3D");
    InfoModeVietlott.POWER_645 = new Mode("Power 6/55");
    InfoModeVietlott.MAX_3D_PRO = new Mode("Max 3D Pro");
    InfoModeVietlott.KENO = new Mode("Keno");
    InfoModeVietlott.BINGO_18 = new Mode("BINGO18");
    cc._RF.pop();
  }, {} ],
  "Vietlott.Lobby.3DPro": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ee281LSpBhLq5YSdiZAc7LL", "Vietlott.Lobby.3DPro");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const Vietlott_Lobby_Result_1 = require("./Vietlott.Lobby.Result");
    const Vietlott_Lobby_Tab_1 = require("./Vietlott.Lobby.Tab");
    const {ccclass: ccclass, property: property} = cc._decorator;
    var LB_INFO = "<color=#00ff00>M\xe3 k\u1ef3 QSMT: 05/04/2024</c><br/><br/>\u0110\u1ebfm ng\u01b0\u1ee3c<br/><br/><size=30><b>00:00:00</b></size><br/><br/>";
    var LB_AWARD = "<color=#00ff00>M\xe3 k\u1ef3 QSMT: 05/04/2024 - # 00752</c><br/>T\u1ed5ng s\u1ed1 v\xe9 tr\xfang th\u01b0\u1edfng: <color=#FF01F0>20</c> <br/>S\u1ed1 v\xe9 tr\xfang gi\u1ea3i \u0111\u1eb7c bi\u1ec7t: <color=#FF01F0>20</c> ";
    let VietlottLobby3DPro = class VietlottLobby3DPro extends Vietlott_Lobby_Tab_1.default {
      constructor() {
        super(...arguments);
        this.content = null;
        this.preResult = null;
      }
      setup(day, time, section, number1, number2, Awards) {
        this.node.active = true;
        this.content.removeAllChildren(true);
        this.lbInfo.string = LB_INFO.replace("%day", day).replace("%time", time);
        this.lbAward.string = LB_AWARD.replace("%section", section).replace("%number1", Utils_1.default.formatNumber(number1)).replace("%number2", Utils_1.default.formatNumber(number2));
        for (const key in Awards) if (Object.prototype.hasOwnProperty.call(Awards, key)) {
          let result = cc.instantiate(this.preResult).getComponent(Vietlott_Lobby_Result_1.default);
          this.content.addChild(result.node);
          result.setup(key, Awards[key]);
        }
      }
    };
    __decorate([ property(cc.Node) ], VietlottLobby3DPro.prototype, "content", void 0);
    __decorate([ property(cc.Prefab) ], VietlottLobby3DPro.prototype, "preResult", void 0);
    VietlottLobby3DPro = __decorate([ ccclass ], VietlottLobby3DPro);
    exports.default = VietlottLobby3DPro;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/Utils": void 0,
    "./Vietlott.Lobby.Result": "Vietlott.Lobby.Result",
    "./Vietlott.Lobby.Tab": "Vietlott.Lobby.Tab"
  } ],
  "Vietlott.Lobby.3D": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7d0d9Rc60dMr6K644dgw42O", "Vietlott.Lobby.3D");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const Vietlott_Lobby_Result_1 = require("./Vietlott.Lobby.Result");
    const Vietlott_Lobby_Tab_1 = require("./Vietlott.Lobby.Tab");
    const {ccclass: ccclass, property: property} = cc._decorator;
    var LB_INFO = "<color=#00ff00>M\xe3 k\u1ef3 QSMT: %day</c><br/><br/>\u0110\u1ebfm ng\u01b0\u1ee3c<br/><br/><size=30><b>%time</b></size><br/><br/>";
    var LB_AWARD = "<color=#00ff00>M\xe3 k\u1ef3 QSMT: %section</c><br/>T\u1ed5ng s\u1ed1 v\xe9 tr\xfang th\u01b0\u1edfng: <color=#FF01F0>%number1</c> <br/>S\u1ed1 v\xe9 tr\xfang gi\u1ea3i \u0111\u1eb7c bi\u1ec7t: <color=#FF01F0>%number2</c> ";
    let VietlottLobby3D = class VietlottLobby3D extends Vietlott_Lobby_Tab_1.default {
      constructor() {
        super(...arguments);
        this.content = null;
        this.preResult = null;
      }
      setup(day, time, section, number1, number2, Awards) {
        this.node.active = true;
        this.content.removeAllChildren(true);
        this.lbInfo.string = LB_INFO.replace("%day", day).replace("%time", time);
        this.lbAward.string = LB_AWARD.replace("%section", section).replace("%number1", Utils_1.default.formatNumber(number1)).replace("%number2", Utils_1.default.formatNumber(number2));
        for (const key in Awards) if (Object.prototype.hasOwnProperty.call(Awards, key)) {
          let result = cc.instantiate(this.preResult).getComponent(Vietlott_Lobby_Result_1.default);
          this.content.addChild(result.node);
          result.setup(key, Awards[key]);
        }
      }
    };
    __decorate([ property(cc.Node) ], VietlottLobby3D.prototype, "content", void 0);
    __decorate([ property(cc.Prefab) ], VietlottLobby3D.prototype, "preResult", void 0);
    VietlottLobby3D = __decorate([ ccclass ], VietlottLobby3D);
    exports.default = VietlottLobby3D;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/Utils": void 0,
    "./Vietlott.Lobby.Result": "Vietlott.Lobby.Result",
    "./Vietlott.Lobby.Tab": "Vietlott.Lobby.Tab"
  } ],
  "Vietlott.Lobby.Bingo": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6e71146tlJG3rjlVSTt4oE1", "Vietlott.Lobby.Bingo");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Vietlott_Lobby_Numbers_1 = require("./Vietlott.Lobby.Numbers");
    const Vietlott_Lobby_Tab_1 = require("./Vietlott.Lobby.Tab");
    const {ccclass: ccclass, property: property} = cc._decorator;
    var LB_INFO = "<color=#00ff00>M\xe3 k\u1ef3 QSMT:<br/>%section</c>";
    let VietlottLobbyBingo = class VietlottLobbyBingo extends Vietlott_Lobby_Tab_1.default {
      constructor() {
        super(...arguments);
        this.preNumbers = null;
        this.typeResult = null;
        this.countResult = null;
      }
      setup(section, numbers) {
        this.node.active = true;
        this.lbInfo.string = LB_INFO.replace("%section", section);
        let result = this.node.getComponentInChildren(Vietlott_Lobby_Numbers_1.default);
        if (!result) {
          let node = cc.instantiate(this.preNumbers);
          this.node.addChild(node);
          result = node.getComponent(Vietlott_Lobby_Numbers_1.default);
        }
        if (result) {
          result.node.position = cc.v3(95, 30);
          result.set(numbers, false);
        }
        let sum = 0;
        numbers.forEach(value => {
          sum += value;
        });
        this.typeResult.string = sum < 11 ? "Nh\u1ecf" : sum > 12 ? "L\u1edbn" : "H\xf2a";
        this.countResult.string = "T\u1ed5ng: " + sum;
      }
    };
    __decorate([ property(cc.Prefab) ], VietlottLobbyBingo.prototype, "preNumbers", void 0);
    __decorate([ property(cc.Label) ], VietlottLobbyBingo.prototype, "typeResult", void 0);
    __decorate([ property(cc.Label) ], VietlottLobbyBingo.prototype, "countResult", void 0);
    VietlottLobbyBingo = __decorate([ ccclass ], VietlottLobbyBingo);
    exports.default = VietlottLobbyBingo;
    cc._RF.pop();
  }, {
    "./Vietlott.Lobby.Numbers": "Vietlott.Lobby.Numbers",
    "./Vietlott.Lobby.Tab": "Vietlott.Lobby.Tab"
  } ],
  "Vietlott.Lobby.Keno": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4493ap/ChZHbLWNPkTXgQxE", "Vietlott.Lobby.Keno");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Vietlott_Lobby_Numbers_1 = require("./Vietlott.Lobby.Numbers");
    const Vietlott_Lobby_Tab_1 = require("./Vietlott.Lobby.Tab");
    const {ccclass: ccclass, property: property} = cc._decorator;
    var LB_INFO = "<color=#00ff00>M\xe3 k\u1ef3 QSMT:<br/> %section</c>";
    var AWARD = "<br/><b>%number</b><br/>%type<br/>";
    let VietlottLobbyKeno = class VietlottLobbyKeno extends Vietlott_Lobby_Tab_1.default {
      constructor() {
        super(...arguments);
        this.content = null;
        this.preNumbers = null;
        this.lbBig = null;
        this.lbSmall = null;
        this.lbEven = null;
        this.lbOdd = null;
      }
      setup(section, numbers) {
        this.node.active = true;
        this.lbInfo.string = LB_INFO.replace("%section", section);
        let result = [];
        numbers.forEach(number => {
          let fourNumber = result.pop() || [];
          if (4 == fourNumber.length) {
            result.push(fourNumber);
            fourNumber = [];
          }
          fourNumber.push(number);
          result.push(fourNumber);
        });
        cc.log(result);
        result.forEach(numbers => {
          let node = cc.instantiate(this.preNumbers);
          this.content.addChild(node);
          node.x = 0;
          let nodeResult = node.getComponent(Vietlott_Lobby_Numbers_1.default);
          nodeResult && nodeResult.set(numbers);
        });
        let length = numbers.length;
        let big = numbers.filter(a => a > 40).length;
        let even = numbers.filter(a => a % 2 == 0).length;
        this.lbBig.string = AWARD.replace("%number", big + "").replace("%type", "L\u1edbn");
        this.lbSmall.string = AWARD.replace("%number", length - big + "").replace("%type", "Nh\u1ecf");
        this.lbEven.string = AWARD.replace("%number", even + "").replace("%type", "Ch\u1eb5n");
        this.lbOdd.string = AWARD.replace("%number", length - even + "").replace("%type", "L\u1ebb");
      }
    };
    __decorate([ property(cc.Node) ], VietlottLobbyKeno.prototype, "content", void 0);
    __decorate([ property(cc.Prefab) ], VietlottLobbyKeno.prototype, "preNumbers", void 0);
    __decorate([ property(cc.RichText) ], VietlottLobbyKeno.prototype, "lbBig", void 0);
    __decorate([ property(cc.RichText) ], VietlottLobbyKeno.prototype, "lbSmall", void 0);
    __decorate([ property(cc.RichText) ], VietlottLobbyKeno.prototype, "lbEven", void 0);
    __decorate([ property(cc.RichText) ], VietlottLobbyKeno.prototype, "lbOdd", void 0);
    VietlottLobbyKeno = __decorate([ ccclass ], VietlottLobbyKeno);
    exports.default = VietlottLobbyKeno;
    cc._RF.pop();
  }, {
    "./Vietlott.Lobby.Numbers": "Vietlott.Lobby.Numbers",
    "./Vietlott.Lobby.Tab": "Vietlott.Lobby.Tab"
  } ],
  "Vietlott.Lobby.Mega": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4dc1aU4M99HfJLJ1zH5WDPh", "Vietlott.Lobby.Mega");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const Vietlott_Lobby_Numbers_1 = require("./Vietlott.Lobby.Numbers");
    const Vietlott_Lobby_Tab_1 = require("./Vietlott.Lobby.Tab");
    var LB_INFO = "<color=#00ff00>K\u1ef3 QSMT: %day</c><br/>\u0110\u1ebfm ng\u01b0\u1ee3c<br/><br/><size=30><b>%time</b></size><br/><br/>Gi\xe1 tr\u1ecb Jackpot t\u1ed1i thi\u1ec3u:<br/><size=28><b>%award</b></size>";
    var LB_AWARD = "<color=#00ff00>K\u1ebft qu\u1ea3 k\u1ef3 QSMT: %section</c><br/>S\u1ed1 v\xe9 tr\xfang th\u01b0\u1edfng Jackpot 2: <color=#FF01F0>%number</c>";
    const {ccclass: ccclass, property: property} = cc._decorator;
    let VietlottLobbyMega = class VietlottLobbyMega extends Vietlott_Lobby_Tab_1.default {
      constructor() {
        super(...arguments);
        this.preNumbers = null;
      }
      setup(day, time, award, section, number, numbers) {
        this.node.active = true;
        this.lbInfo.string = LB_INFO.replace("%day", day).replace("%time", time).replace("%award", Utils_1.default.formatNumber(award));
        this.lbAward.string = LB_AWARD.replace("%section", section).replace("%number", Utils_1.default.formatNumber(number));
        let result = this.node.getComponentInChildren(Vietlott_Lobby_Numbers_1.default);
        if (!result) {
          let node = cc.instantiate(this.preNumbers);
          this.node.addChild(node);
          result = node.getComponent(Vietlott_Lobby_Numbers_1.default);
        }
        if (result) {
          result.node.position = cc.v3(0, -115);
          result.set(numbers);
        }
      }
    };
    __decorate([ property(cc.Prefab) ], VietlottLobbyMega.prototype, "preNumbers", void 0);
    VietlottLobbyMega = __decorate([ ccclass ], VietlottLobbyMega);
    exports.default = VietlottLobbyMega;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/Utils": void 0,
    "./Vietlott.Lobby.Numbers": "Vietlott.Lobby.Numbers",
    "./Vietlott.Lobby.Tab": "Vietlott.Lobby.Tab"
  } ],
  "Vietlott.Lobby.Numbers": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c36f8ajY8hILIiW8ad7MLjm", "Vietlott.Lobby.Numbers");
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
    let VietlottLobbyNumber = class VietlottLobbyNumber extends cc.Component {
      onLoad() {
        this.reset();
      }
      reset() {
        this.node.children.forEach(node => {
          node.active = false;
        });
      }
      set(numbers = [], isTwoNumber = true) {
        this.reset();
        if (numbers.length > this.node.children.length) return cc.error("input set numbers");
        numbers.forEach((number, idx) => {
          let node = this.node.getChildByName(idx + "");
          if (!node) return cc.error("set numbers ", idx);
          if (number < 0) return cc.warn("skip numbers " + idx);
          node.active = true;
          node.getComponentInChildren(cc.Label).string = (number < 10 && isTwoNumber ? "0" : "") + number;
        });
      }
    };
    VietlottLobbyNumber = __decorate([ ccclass ], VietlottLobbyNumber);
    exports.default = VietlottLobbyNumber;
    cc._RF.pop();
  }, {} ],
  "Vietlott.Lobby.Power": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "961c7KyoitP1rbrxraW2F0a", "Vietlott.Lobby.Power");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const Vietlott_Lobby_Numbers_1 = require("./Vietlott.Lobby.Numbers");
    const Vietlott_Lobby_Tab_1 = require("./Vietlott.Lobby.Tab");
    const {ccclass: ccclass, property: property} = cc._decorator;
    var LB_INFO = "<color=#00ff00>M\xe3 k\u1ef3 QSMT: %day</c><br/>\u0110\u1ebfm ng\u01b0\u1ee3c<br/><br/><size=30><b>%time</b></size><br/><br/><color=#00ff00>Gi\xe1 tr\u1ecb Jackpot 1 hi\u1ec7n t\u1ea1i:</c><br/><size=30> %award1</size><br/>Gi\xe1 tr\u1ecb Jackpot 2 hi\u1ec7n t\u1ea1i:<br/> %award2";
    var LB_AWARD = "<color=#00ff00>M\xe3 k\u1ef3 QSMT: %section</c><br/>T\u1ed5ng s\u1ed1 v\xe9 tr\xfang th\u01b0\u1edfng: <color=#FF01F0>%number1</c><br/>S\u1ed1 v\xe9 tr\xfang gi\u1ea3i \u0111\u1eb7c bi\u1ec7t: <color=#FF01F0>%number2</c>";
    let VietlottLobbyPower = class VietlottLobbyPower extends Vietlott_Lobby_Tab_1.default {
      constructor() {
        super(...arguments);
        this.preNumbers = null;
      }
      setup(day, time, award1, award2, section, number1, number2, numbers) {
        this.node.active = true;
        this.lbInfo.string = LB_INFO.replace("%day", day).replace("%time", time).replace("%award1", Utils_1.default.formatNumber(award1)).replace("%award2", Utils_1.default.formatNumber(award2));
        this.lbAward.string = LB_AWARD.replace("%section", section).replace("%number1", Utils_1.default.formatNumber(number1)).replace("%number2", Utils_1.default.formatNumber(number2));
        let result = this.node.getComponentInChildren(Vietlott_Lobby_Numbers_1.default);
        if (!result) {
          let node = cc.instantiate(this.preNumbers);
          this.node.addChild(node);
          result = node.getComponent(Vietlott_Lobby_Numbers_1.default);
        }
        if (result) {
          result.node.position = cc.v3(0, -142);
          result.set(numbers);
        }
      }
    };
    __decorate([ property(cc.Prefab) ], VietlottLobbyPower.prototype, "preNumbers", void 0);
    VietlottLobbyPower = __decorate([ ccclass ], VietlottLobbyPower);
    exports.default = VietlottLobbyPower;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/Utils": void 0,
    "./Vietlott.Lobby.Numbers": "Vietlott.Lobby.Numbers",
    "./Vietlott.Lobby.Tab": "Vietlott.Lobby.Tab"
  } ],
  "Vietlott.Lobby.Result": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d6adaDXsE5MiKhvqxF70Baa", "Vietlott.Lobby.Result");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Vietlott_Lobby_Numbers_1 = require("./Vietlott.Lobby.Numbers");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let VietlottLobbyResult = class VietlottLobbyResult extends cc.Component {
      constructor() {
        super(...arguments);
        this.nameAward = null;
        this.numbers1 = null;
        this.numbers2 = null;
        this.numbers3 = null;
        this.preNumbers = null;
        this.gach = null;
      }
      onLoad() {
        this.reset();
      }
      setup(name, result = []) {
        this.reset();
        this.nameAward.string = name;
        cc.log(result);
        switch (result.length % 3) {
         case 0:
          this.init3(result);
          break;

         case 1:
          this.init1(result.shift());
          this.init3(result);
          break;

         case 2:
          this.init2([ result.pop(), result.pop() ]);
          this.init3(result);
        }
        this.numbers1.active = this.numbers1.childrenCount > 0;
        this.numbers2.active = this.numbers2.childrenCount > 0;
        this.numbers3.active = this.numbers3.childrenCount > 0;
      }
      init1(number) {
        let node = cc.instantiate(this.preNumbers);
        this.numbers1.addChild(node);
        let nodeResult = node.getComponent(Vietlott_Lobby_Numbers_1.default);
        nodeResult && nodeResult.set((number + "").split("").map(a => parseInt(a)), false);
      }
      init2(result) {
        result.forEach((number, idx) => {
          let node = cc.instantiate(this.preNumbers);
          this.numbers2.addChild(node);
          let nodeResult = node.getComponent(Vietlott_Lobby_Numbers_1.default);
          nodeResult && nodeResult.set((number + "").split("").map(a => parseInt(a)), false);
          if (idx % 2 != 1) {
            let gach = cc.instantiate(this.gach);
            this.numbers2.addChild(gach);
            gach.active = true;
            gach.y = 0;
          }
        });
      }
      init3(result) {
        result.forEach((number, idx) => {
          let node = cc.instantiate(this.preNumbers);
          this.numbers3.addChild(node);
          let nodeResult = node.getComponent(Vietlott_Lobby_Numbers_1.default);
          nodeResult && nodeResult.set((number + "").split("").map(a => parseInt(a)), false);
          if (idx % 3 != 2) {
            let gach = cc.instantiate(this.gach);
            this.numbers3.addChild(gach);
            gach.active = true;
            gach.y = 0;
          }
        });
      }
      reset() {
        this.nameAward.string = "Gi\u1ea3i...";
        this.numbers1.getComponentsInChildren(Vietlott_Lobby_Numbers_1.default).forEach(node => {
          node.set([]);
        });
        this.numbers2.getComponentsInChildren(Vietlott_Lobby_Numbers_1.default).forEach(node => {
          node.set([]);
        });
        this.numbers3.getComponentsInChildren(Vietlott_Lobby_Numbers_1.default).forEach(node => {
          node.set([]);
        });
      }
    };
    __decorate([ property(cc.RichText) ], VietlottLobbyResult.prototype, "nameAward", void 0);
    __decorate([ property(cc.Node) ], VietlottLobbyResult.prototype, "numbers1", void 0);
    __decorate([ property(cc.Node) ], VietlottLobbyResult.prototype, "numbers2", void 0);
    __decorate([ property(cc.Node) ], VietlottLobbyResult.prototype, "numbers3", void 0);
    __decorate([ property(cc.Prefab) ], VietlottLobbyResult.prototype, "preNumbers", void 0);
    __decorate([ property(cc.Node) ], VietlottLobbyResult.prototype, "gach", void 0);
    VietlottLobbyResult = __decorate([ ccclass ], VietlottLobbyResult);
    exports.default = VietlottLobbyResult;
    cc._RF.pop();
  }, {
    "./Vietlott.Lobby.Numbers": "Vietlott.Lobby.Numbers"
  } ],
  "Vietlott.Lobby.Tab": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8f67cwuIFlCtqs2yEXhaTma", "Vietlott.Lobby.Tab");
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
    let VietlottLobbyTab = class VietlottLobbyTab extends cc.Component {
      constructor() {
        super(...arguments);
        this.lbInfo = null;
        this.lbAward = null;
      }
      getDay() {
        let day = new Date().getDay();
        let month = new Date().getMonth();
        let year = new Date().getFullYear();
        return (day < 10 ? "0" + day : day) + ":" + (month < 10 ? "0" + month : month) + "/" + (year < 10 ? "0" + year : year);
      }
      getTime() {
        let hours = new Date().getHours();
        let minutes = new Date().getMinutes();
        let seconds = new Date().getSeconds();
        return (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
      }
    };
    __decorate([ property(cc.RichText) ], VietlottLobbyTab.prototype, "lbInfo", void 0);
    __decorate([ property(cc.RichText) ], VietlottLobbyTab.prototype, "lbAward", void 0);
    VietlottLobbyTab = __decorate([ ccclass ], VietlottLobbyTab);
    exports.default = VietlottLobbyTab;
    cc._RF.pop();
  }, {} ],
  "Vietlott.Lobby": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e67b1jNteZEfbaYZwvaePDO", "Vietlott.Lobby");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Vietlott_Lobby_3D_1 = require("./Vietlott.Lobby.3D");
    const Vietlott_Lobby_3DPro_1 = require("./Vietlott.Lobby.3DPro");
    const Vietlott_Lobby_Bingo_1 = require("./Vietlott.Lobby.Bingo");
    const Vietlott_Lobby_Keno_1 = require("./Vietlott.Lobby.Keno");
    const Vietlott_Lobby_Mega_1 = require("./Vietlott.Lobby.Mega");
    const Vietlott_Lobby_Power_1 = require("./Vietlott.Lobby.Power");
    const Vietlott_Lobby_Tab_1 = require("./Vietlott.Lobby.Tab");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let VietlottLobby = class VietlottLobby extends cc.Component {
      constructor() {
        super(...arguments);
        this.content = null;
      }
      start() {
        this.content.getComponentsInChildren(Vietlott_Lobby_Tab_1.default).forEach(tab => {
          cc.log(tab.node.name);
          tab.node.active = false;
        });
        this.content.getComponentInChildren(Vietlott_Lobby_Mega_1.default).setup("1/1/1990", "00:00:00", 3e9, "1/1/1990 - #0001", 10, [ 1, 22, 33, 44, 55, 66 ]);
        this.content.getComponentInChildren(Vietlott_Lobby_Power_1.default).setup("1/1/1990", "00:00:00", 3e9, 2e9, "1/1/1990 - #0001", 10, 5, [ 1, 22, 33, 44, 55, 66 ]);
        this.content.getComponentInChildren(Vietlott_Lobby_3D_1.default).setup("1/1/1990", "00:00:00", "1/1/1990 - #0001", 15, 10, {
          "Gi\u1ea3i \u0110\u1eb7c bi\u1ec7t": [ 123, 456 ],
          "Gi\u1ea3i nh\u1ea5t": [ 123, 456, 789, 123 ],
          "Gi\u1ea3i nh\xec": [ 123, 456, 789, 123, 456, 789 ],
          "Gi\u1ea3i ba": [ 123, 456, 789, 123, 456, 789, 456, 789 ]
        });
        this.content.getComponentInChildren(Vietlott_Lobby_3DPro_1.default).setup("1/1/1990", "00:00:00", "1/1/1990 - #0001", 15, 10, {
          "Gi\u1ea3i \u0110\u1eb7c bi\u1ec7t": [ 123, 456 ],
          "Gi\u1ea3i nh\u1ea5t": [ 123, 456, 789, 123 ],
          "Gi\u1ea3i nh\xec": [ 123, 456, 789, 123, 456, 789 ],
          "Gi\u1ea3i ba": [ 123, 456, 789, 123, 456, 789, 456, 789 ]
        });
        this.content.getComponentInChildren(Vietlott_Lobby_Keno_1.default).setup("1/1/1990 - #0001", [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 8, 7, 6, 5, 4, 3, 2, 1, 50, 63 ]);
        this.content.getComponentInChildren(Vietlott_Lobby_Bingo_1.default).setup("1/1/1990 - #0001", [ 6, 2, 3 ]);
      }
    };
    __decorate([ property(cc.Node) ], VietlottLobby.prototype, "content", void 0);
    VietlottLobby = __decorate([ ccclass ], VietlottLobby);
    exports.default = VietlottLobby;
    cc._RF.pop();
  }, {
    "./Vietlott.Lobby.3D": "Vietlott.Lobby.3D",
    "./Vietlott.Lobby.3DPro": "Vietlott.Lobby.3DPro",
    "./Vietlott.Lobby.Bingo": "Vietlott.Lobby.Bingo",
    "./Vietlott.Lobby.Keno": "Vietlott.Lobby.Keno",
    "./Vietlott.Lobby.Mega": "Vietlott.Lobby.Mega",
    "./Vietlott.Lobby.Power": "Vietlott.Lobby.Power",
    "./Vietlott.Lobby.Tab": "Vietlott.Lobby.Tab"
  } ],
  "Vietlott.Play": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0bbb3MjsQdIjKXeOOYW/47f", "Vietlott.Play");
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
    var listPosition = [ {
      time: 0,
      position: cc.v2(0, 0)
    }, {
      time: 60,
      position: cc.v2(-0, -60)
    }, {
      time: 10,
      position: cc.v2(-10, -60)
    }, {
      time: 5,
      position: cc.v2(-15, -60)
    }, {
      time: 5,
      position: cc.v2(-20, -60)
    }, {
      time: 5,
      position: cc.v2(-25, -60)
    }, {
      time: 5,
      position: cc.v2(-30, -60)
    }, {
      time: 5,
      position: cc.v2(-35, -60)
    }, {
      time: 5,
      position: cc.v2(-40, -60)
    }, {
      time: 5,
      position: cc.v2(-45, -60)
    }, {
      time: 5,
      position: cc.v2(-50, -60)
    }, {
      time: 5,
      position: cc.v2(-55, -60)
    }, {
      time: 5,
      position: cc.v2(-60, -61)
    }, {
      time: 5,
      position: cc.v2(-65, -62)
    }, {
      time: 5,
      position: cc.v2(-70, -62)
    }, {
      time: 5,
      position: cc.v2(-75, -63)
    }, {
      time: 5,
      position: cc.v2(-80, -63)
    }, {
      time: 5,
      position: cc.v2(-85, -64)
    }, {
      time: 5,
      position: cc.v2(-90, -65)
    }, {
      time: 5,
      position: cc.v2(-95, -66)
    }, {
      time: 5,
      position: cc.v2(-100, -66)
    }, {
      time: 5,
      position: cc.v2(-105, -68.5)
    }, {
      time: 5,
      position: cc.v2(-110, -70)
    } ];
    let VietlottPlay = class VietlottPlay extends cc.Component {
      constructor() {
        super(...arguments);
        this.ball = null;
        this.balls = [];
        this.poll = [];
      }
      start() {
        for (let i = 0; i < 7; i++) {
          let ball = cc.instantiate(this.ball);
          ball.parent = this.ball.parent;
          let action = [];
          let time = .01;
          const positionBasic = cc.v2(45, 70);
          listPosition.forEach((position, idx) => {
            listPosition.length - 3 * i > idx && action.push(cc.moveTo(position.time * time, positionBasic.add(position.position)));
          });
          cc.tween(ball).sequence(cc.delayTime(i), ...action).start();
        }
        this.balls.forEach((node, index) => {
          cc.tween(node).set({
            position: cc.v3(0, 25)
          }).to(.2, {
            position: cc.v3(0, 90)
          }).delay(1).to(.2, {
            scale: .5,
            position: cc.v3(0, 170)
          }).start();
        });
        this.poll.forEach((node, index) => {
          cc.tween(node).set({
            angle: 0
          }).to(5, {
            angle: 1800
          }).start();
        });
      }
    };
    __decorate([ property(cc.Node) ], VietlottPlay.prototype, "ball", void 0);
    __decorate([ property([ cc.Node ]) ], VietlottPlay.prototype, "balls", void 0);
    __decorate([ property([ cc.Node ]) ], VietlottPlay.prototype, "poll", void 0);
    VietlottPlay = __decorate([ ccclass ], VietlottPlay);
    exports.default = VietlottPlay;
    cc._RF.pop();
  }, {} ],
  "Vietlott.Result.History": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a1f3b49eGFMrbNiU3AXn8lX", "Vietlott.Result.History");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Vietlott_Lobby_Numbers_1 = require("./Vietlott.Lobby.Numbers");
    const Vietlott_Lobby_Result_1 = require("./Vietlott.Lobby.Result");
    const {ccclass: ccclass, property: property} = cc._decorator;
    var LB_INFO = "<color=#00ff00>M\xe3 k\u1ef3 QSMT: %section</c><br/>S\u1ed1 v\xe9 tr\xfang th\u01b0\u1edfng Jackpot 2: <color=#FF01F0>%number</c><br/><br/><br/><color=#00ff00>Gi\xe1 tr\u1ecb Jackpot 1 hi\u1ec7n t\u1ea1i:</c><br/><size=40>%award1</size><br/>Gi\xe1 tr\u1ecb Jackpot 2 hi\u1ec7n t\u1ea1i:<br/> %award2";
    let VietlottResultHistory = class VietlottResultHistory extends cc.Component {
      constructor() {
        super(...arguments);
        this.preResult = null;
        this.preNumber = null;
      }
      start() {
        this.setup({
          spectial: {
            name: "Gi\u1ea3i \u0110\u1eb7c bi\u1ec7t",
            type: 0,
            result: [ 123, 456 ]
          },
          other: {
            name: "Gi\u1ea3i \u0110\u1eb7c bi\u1ec7t",
            type: 1,
            result: [ 11, 12, 13, 14, 15, 16, 17 ]
          },
          other2: {
            name: "Gi\u1ea3i \u0110\u1eb7c bi\u1ec7t",
            type: 1,
            result: [ 11, 12, 13, 14, 15, 16 ]
          }
        });
      }
      setup(award) {
        for (const key in award) if (Object.prototype.hasOwnProperty.call(award, key)) switch (award[key].type) {
         case 0:
          let result = cc.instantiate(this.preResult).getComponent(Vietlott_Lobby_Result_1.default);
          this.node.addChild(result.node);
          result.setup(award[key].name.replace("%award", award[key].award), award[key].result);
          break;

         case 1:
          let node = cc.instantiate(this.preNumber);
          this.node.addChild(node);
          node.x = 0;
          node.getComponent(Vietlott_Lobby_Numbers_1.default).set(award[key].result);
        }
      }
    };
    __decorate([ property(cc.Prefab) ], VietlottResultHistory.prototype, "preResult", void 0);
    __decorate([ property(cc.Prefab) ], VietlottResultHistory.prototype, "preNumber", void 0);
    VietlottResultHistory = __decorate([ ccclass ], VietlottResultHistory);
    exports.default = VietlottResultHistory;
    cc._RF.pop();
  }, {
    "./Vietlott.Lobby.Numbers": "Vietlott.Lobby.Numbers",
    "./Vietlott.Lobby.Result": "Vietlott.Lobby.Result"
  } ],
  "Vietlott.Result.Mega": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "97d21T7iA5DXJWThWH6kiKl", "Vietlott.Result.Mega");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const {ccclass: ccclass, property: property} = cc._decorator;
    var LB_INFO = "<color=#00ff00>M\xe3 k\u1ef3 QSMT: %section</c><br/>S\u1ed1 v\xe9 tr\xfang th\u01b0\u1edfng Jackpot 2: <color=#FF01F0>%number</c><br/><br/><br/><color=#00ff00>Gi\xe1 tr\u1ecb Jackpot 1 hi\u1ec7n t\u1ea1i:</c><br/><size=40>%award1</size><br/>Gi\xe1 tr\u1ecb Jackpot 2 hi\u1ec7n t\u1ea1i:<br/> %award2";
    let VietlottResultMega = class VietlottResultMega extends cc.Component {
      constructor() {
        super(...arguments);
        this.lbJackpot = null;
        this.lbAward1 = null;
        this.lbAward2 = null;
        this.lbAward3 = null;
      }
      start() {
        this.setup(10, 3, 2, 1);
      }
      setup(lbJackpot, lbAward1, lbAward2, lbAward3) {
        this.lbJackpot.string = Utils_1.default.formatNumber(lbJackpot);
        this.lbAward1.string = Utils_1.default.formatNumber(lbAward1);
        this.lbAward2.string = Utils_1.default.formatNumber(lbAward2);
        this.lbAward3.string = Utils_1.default.formatNumber(lbAward3);
      }
    };
    __decorate([ property(cc.Label) ], VietlottResultMega.prototype, "lbJackpot", void 0);
    __decorate([ property(cc.Label) ], VietlottResultMega.prototype, "lbAward1", void 0);
    __decorate([ property(cc.Label) ], VietlottResultMega.prototype, "lbAward2", void 0);
    __decorate([ property(cc.Label) ], VietlottResultMega.prototype, "lbAward3", void 0);
    VietlottResultMega = __decorate([ ccclass ], VietlottResultMega);
    exports.default = VietlottResultMega;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/Utils": void 0
  } ],
  "Vietlott.Result.Other": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "45608sbcRJNEodNke2tNGJp", "Vietlott.Result.Other");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Vietlott_Lobby_Result_1 = require("./Vietlott.Lobby.Result");
    const {ccclass: ccclass, property: property} = cc._decorator;
    var LB_INFO = "<color=#00ff00>M\xe3 k\u1ef3 QSMT: %section</c><br/>S\u1ed1 v\xe9 tr\xfang th\u01b0\u1edfng Jackpot 2: <color=#FF01F0>%number</c><br/><br/><br/><color=#00ff00>Gi\xe1 tr\u1ecb Jackpot 1 hi\u1ec7n t\u1ea1i:</c><br/><size=40>%award1</size><br/>Gi\xe1 tr\u1ecb Jackpot 2 hi\u1ec7n t\u1ea1i:<br/> %award2";
    let VietlottResultOther = class VietlottResultOther extends cc.Component {
      constructor() {
        super(...arguments);
        this.preResult = null;
      }
      start() {
        this.setup({
          spectial: {
            name: "Gi\u1ea3i \u0110\u1eb7c bi\u1ec7t: %award",
            award: 1e9,
            type: 0,
            result: [ 123, 456 ]
          },
          one: {
            name: "Gi\u1ea3i nh\u1ea5t: %award",
            award: 1e9,
            type: 0,
            result: [ 123, 456, 789, 123 ]
          },
          two: {
            name: "Gi\u1ea3i nh\xec: %award",
            award: 1e9,
            type: 0,
            result: [ 123, 456, 789, 123, 456, 789 ]
          },
          three: {
            name: "Gi\u1ea3i ba: %award",
            award: 1e9,
            type: 0,
            result: [ 123, 456, 789, 123, 456, 789, 456, 789 ]
          },
          four: {
            name: "Gi\u1ea3i t\u01b0: %award",
            award: 1e9,
            type: 1,
            result: [ 123, 456, 789, 123, 456, 123, 456, 789, 123, 456, 123, 456, 789, 123, 456, 123, 456, 789, 123, 456 ]
          },
          five: {
            name: "Gi\u1ea3i n\u0103m: %award",
            award: 1e9,
            type: 1,
            result: [ 123, 456 ]
          },
          six: {
            name: "Gi\u1ea3i s\xe1u: %award",
            award: 1e9,
            type: 1,
            result: [ 123, 456, 789, 123, 456, 123, 456, 789, 123, 456, 123, 456, 789, 123, 456, 123, 456, 789 ]
          }
        });
      }
      setup(award) {
        for (const key in award) if (Object.prototype.hasOwnProperty.call(award, key)) {
          let result = cc.instantiate(this.preResult).getComponent(Vietlott_Lobby_Result_1.default);
          this.node.addChild(result.node);
          switch (award[key].type) {
           case 0:
            result.setup(award[key].name.replace("%award", award[key].award), award[key].result);
            break;

           case 1:
            let lb = award[key].name.replace("%award", award[key].award);
            lb += "<br/><br/>";
            award[key].result.forEach((number, idx) => {
              lb += number + ((idx + 1) % 5 != 0 ? idx == award[key].result.length - 1 ? "" : "      " : "<br/>");
            });
            result.setup(lb, []);
          }
        }
      }
    };
    __decorate([ property(cc.Prefab) ], VietlottResultOther.prototype, "preResult", void 0);
    VietlottResultOther = __decorate([ ccclass ], VietlottResultOther);
    exports.default = VietlottResultOther;
    cc._RF.pop();
  }, {
    "./Vietlott.Lobby.Result": "Vietlott.Lobby.Result"
  } ],
  "Vietlott.Result.Power": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b28acWaeDdIZqcuVO4042Jb", "Vietlott.Result.Power");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const {ccclass: ccclass, property: property} = cc._decorator;
    var LB_INFO = "<color=#00ff00>M\xe3 k\u1ef3 QSMT: %section</c><br/>S\u1ed1 v\xe9 tr\xfang th\u01b0\u1edfng Jackpot 2: <color=#FF01F0>%number</c><br/><br/><br/><color=#00ff00>Gi\xe1 tr\u1ecb Jackpot 1 hi\u1ec7n t\u1ea1i:</c><br/><size=40>%award1</size><br/>Gi\xe1 tr\u1ecb Jackpot 2 hi\u1ec7n t\u1ea1i:<br/> %award2";
    let VietlottResultPower = class VietlottResultPower extends cc.Component {
      constructor() {
        super(...arguments);
        this.lbJackpot1 = null;
        this.lbJackpot2 = null;
        this.lbAward1 = null;
        this.lbAward2 = null;
        this.lbAward3 = null;
      }
      start() {
        this.setup(10, 5, 3, 2, 1);
      }
      setup(lbJackpot1, lbJackpot2, lbAward1, lbAward2, lbAward3) {
        this.lbJackpot1.string = Utils_1.default.formatNumber(lbJackpot1);
        this.lbJackpot2.string = Utils_1.default.formatNumber(lbJackpot2);
        this.lbAward1.string = Utils_1.default.formatNumber(lbAward1);
        this.lbAward2.string = Utils_1.default.formatNumber(lbAward2);
        this.lbAward3.string = Utils_1.default.formatNumber(lbAward3);
      }
    };
    __decorate([ property(cc.Label) ], VietlottResultPower.prototype, "lbJackpot1", void 0);
    __decorate([ property(cc.Label) ], VietlottResultPower.prototype, "lbJackpot2", void 0);
    __decorate([ property(cc.Label) ], VietlottResultPower.prototype, "lbAward1", void 0);
    __decorate([ property(cc.Label) ], VietlottResultPower.prototype, "lbAward2", void 0);
    __decorate([ property(cc.Label) ], VietlottResultPower.prototype, "lbAward3", void 0);
    VietlottResultPower = __decorate([ ccclass ], VietlottResultPower);
    exports.default = VietlottResultPower;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/Utils": void 0
  } ],
  "Vietlott.Result.Special.3DPlus": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d0f64FCdZBEKr3w7iHQXnJK", "Vietlott.Result.Special.3DPlus");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const Vietlott_Lobby_Result_1 = require("./Vietlott.Lobby.Result");
    const {ccclass: ccclass, property: property} = cc._decorator;
    var LB_INFO = "<color=#00ff00>M\xe3 k\u1ef3 QSMT: %section</c><br/>T\u1ed5ng s\u1ed1 v\xe9 tr\xfang th\u01b0\u1edfng: <color=#FF01F0>%number</c> <br/><color=#00ff00>Gi\u1ea3i \u0111\u1eb7c bi\u1ec7t:</c><br/>Tr\xfang 2 b\u1ed9 ba s\u1ed1 \u0111\xfang th\u1ee9 t\u1ef1<br/><br/><br/>ho\u1eb7c<br/><br/>";
    let VietlottResultSpecial3DPlus = class VietlottResultSpecial3DPlus extends cc.Component {
      constructor() {
        super(...arguments);
        this.lbInfo = null;
        this.preResult = null;
      }
      start() {
        this.setup("1/1/1990 - #0001", 11, [ 525, 654 ], [ 525, 654 ]);
      }
      setup(section, number, result1, result2) {
        this.lbInfo.string = LB_INFO.replace("%section", section).replace("%number", Utils_1.default.formatNumber(number));
        let node1 = cc.instantiate(this.preResult);
        this.lbInfo.node.addChild(node1);
        node1.y = -20;
        node1.getComponent(Vietlott_Lobby_Result_1.default).setup("", result1);
        let node2 = cc.instantiate(this.preResult);
        this.lbInfo.node.addChild(node2);
        node2.y = -150;
        node2.getComponent(Vietlott_Lobby_Result_1.default).setup("", result2);
      }
    };
    __decorate([ property(cc.RichText) ], VietlottResultSpecial3DPlus.prototype, "lbInfo", void 0);
    __decorate([ property(cc.Prefab) ], VietlottResultSpecial3DPlus.prototype, "preResult", void 0);
    VietlottResultSpecial3DPlus = __decorate([ ccclass ], VietlottResultSpecial3DPlus);
    exports.default = VietlottResultSpecial3DPlus;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/Utils": void 0,
    "./Vietlott.Lobby.Result": "Vietlott.Lobby.Result"
  } ],
  "Vietlott.Result.Special.3DPro": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "51de4FbJHlO1LBtOsSPdTHl", "Vietlott.Result.Special.3DPro");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const Vietlott_Lobby_Result_1 = require("./Vietlott.Lobby.Result");
    const {ccclass: ccclass, property: property} = cc._decorator;
    var LB_INFO1 = "<color=#00ff00>M\xe3 k\u1ef3 QSMT: %section</c><br/>T\u1ed5ng s\u1ed1 v\xe9 tr\xfang th\u01b0\u1edfng: <color=#FF01F0>%number</c> <br/><color=#00ff00><br/>Gi\u1ea3i \u0111\u1eb7c bi\u1ec7t:</c><br/><b><size=45>%award</size></b><br/>Tr\xfang 2 b\u1ed9 ba s\u1ed1 \u0111\xfang th\u1ee9 t\u1ef1<br/><br/> ";
    var LB_INFO2 = "Gi\u1ea3i ph\u1ee5 \u0111\u1eb7c bi\u1ec7t:</c><br/><b><size=45>%award</size></b><br/>Tr\xfang 2 b\u1ed9 ba s\u1ed1 \u0111\xfang th\u1ee9 t\u1ef1<br/><br/> ";
    let VietlottResultSpecial3DPro = class VietlottResultSpecial3DPro extends cc.Component {
      constructor() {
        super(...arguments);
        this.lbInfo1 = null;
        this.lbInfo2 = null;
        this.preResult = null;
      }
      start() {
        this.setup("1/1/1990 - #0001", 11, 1e9, 5e8, [ 123, 654 ], [ 789, 654 ]);
      }
      setup(section, number, award1, award2, result1, result2) {
        this.lbInfo1.string = LB_INFO1.replace("%section", section).replace("%number", number).replace("%award", Utils_1.default.formatNumber(award1));
        let node1 = cc.instantiate(this.preResult);
        this.lbInfo1.node.addChild(node1);
        node1.position = cc.v3(0, -140);
        node1.getComponent(Vietlott_Lobby_Result_1.default).setup("", result1);
        this.lbInfo2.string = LB_INFO2.replace("%award", Utils_1.default.formatNumber(award2));
        let node2 = cc.instantiate(this.preResult);
        this.lbInfo2.node.addChild(node2);
        node2.position = cc.v3(0, -60);
        node2.getComponent(Vietlott_Lobby_Result_1.default).setup("", result2);
      }
    };
    __decorate([ property(cc.RichText) ], VietlottResultSpecial3DPro.prototype, "lbInfo1", void 0);
    __decorate([ property(cc.RichText) ], VietlottResultSpecial3DPro.prototype, "lbInfo2", void 0);
    __decorate([ property(cc.Prefab) ], VietlottResultSpecial3DPro.prototype, "preResult", void 0);
    VietlottResultSpecial3DPro = __decorate([ ccclass ], VietlottResultSpecial3DPro);
    exports.default = VietlottResultSpecial3DPro;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/Utils": void 0,
    "./Vietlott.Lobby.Result": "Vietlott.Lobby.Result"
  } ],
  "Vietlott.Result.Special.3D": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c80b0XHCXJOZYv6MF5ECpzU", "Vietlott.Result.Special.3D");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const Vietlott_Lobby_Result_1 = require("./Vietlott.Lobby.Result");
    const {ccclass: ccclass, property: property} = cc._decorator;
    var LB_INFO = "<color=#00ff00>M\xe3 k\u1ef3 QSMT: %section</c><br/>T\u1ed5ng s\u1ed1 v\xe9 tr\xfang th\u01b0\u1edfng: <color=#FF01F0>%number1</c> <br/>S\u1ed1 v\xe9 tr\xfang gi\u1ea3i \u0111\u1eb7c bi\u1ec7t: <color=#FF01F0>%number2</c> <br/><color=#00ff00>Gi\u1ea3i \u0111\u1eb7c bi\u1ec7t:</c><br/>Tr\xfang 1 trong 2 b\u1ed9 ba s\u1ed1<br/><br/>";
    let VietlottResultSpecial3D = class VietlottResultSpecial3D extends cc.Component {
      constructor() {
        super(...arguments);
        this.lbInfo = null;
        this.preResult = null;
      }
      start() {
        this.setup("1/1/1990 - #0001", 11, 11, [ 525, 654 ]);
      }
      setup(section, number1, number2, result) {
        this.lbInfo.string = LB_INFO.replace("%section", section).replace("%number1", Utils_1.default.formatNumber(number1)).replace("%number2", Utils_1.default.formatNumber(number2));
        let node2 = cc.instantiate(this.preResult);
        this.lbInfo.node.addChild(node2);
        node2.y = -115;
        node2.getComponent(Vietlott_Lobby_Result_1.default).setup("", result);
      }
    };
    __decorate([ property(cc.RichText) ], VietlottResultSpecial3D.prototype, "lbInfo", void 0);
    __decorate([ property(cc.Prefab) ], VietlottResultSpecial3D.prototype, "preResult", void 0);
    VietlottResultSpecial3D = __decorate([ ccclass ], VietlottResultSpecial3D);
    exports.default = VietlottResultSpecial3D;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/Utils": void 0,
    "./Vietlott.Lobby.Result": "Vietlott.Lobby.Result"
  } ],
  "Vietlott.Result.Special.Mega": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1df48LDhSJJwayg0+GL2M+k", "Vietlott.Result.Special.Mega");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const Vietlott_Lobby_Numbers_1 = require("./Vietlott.Lobby.Numbers");
    const {ccclass: ccclass, property: property} = cc._decorator;
    var LB_INFO = "<color=#00ff00>M\xe3 k\u1ef3 QSMT: %section</c><br/><br/><br/>Gi\xe1 tr\u1ecb Jackpot hi\u1ec7n t\u1ea1i:<br/><size=40><b>%award</b></size>";
    let VietlottResultSpecial3D = class VietlottResultSpecial3D extends cc.Component {
      constructor() {
        super(...arguments);
        this.lbInfo = null;
        this.preNumber = null;
      }
      start() {
        this.setup("1/1/1990 - #0001", 1e11, [ 11, 12, 13, 14, 15, 16 ]);
      }
      setup(section, award, result) {
        this.lbInfo.string = LB_INFO.replace("%section", section).replace("%award", Utils_1.default.formatNumber(award));
        let node = cc.instantiate(this.preNumber);
        this.lbInfo.node.addChild(node);
        node.position = cc.v3(0, 20);
        node.getComponent(Vietlott_Lobby_Numbers_1.default).set(result);
      }
    };
    __decorate([ property(cc.RichText) ], VietlottResultSpecial3D.prototype, "lbInfo", void 0);
    __decorate([ property(cc.Prefab) ], VietlottResultSpecial3D.prototype, "preNumber", void 0);
    VietlottResultSpecial3D = __decorate([ ccclass ], VietlottResultSpecial3D);
    exports.default = VietlottResultSpecial3D;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/Utils": void 0,
    "./Vietlott.Lobby.Numbers": "Vietlott.Lobby.Numbers"
  } ],
  "Vietlott.Result.Special.Power": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b04773AMJdIUJoRG0EaPLrQ", "Vietlott.Result.Special.Power");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const Vietlott_Lobby_Numbers_1 = require("./Vietlott.Lobby.Numbers");
    const {ccclass: ccclass, property: property} = cc._decorator;
    var LB_INFO = "<color=#00ff00>M\xe3 k\u1ef3 QSMT: %section</c><br/>S\u1ed1 v\xe9 tr\xfang th\u01b0\u1edfng Jackpot 2: <color=#FF01F0>%number</c><br/><br/><br/><color=#00ff00>Gi\xe1 tr\u1ecb Jackpot 1 hi\u1ec7n t\u1ea1i:</c><br/><size=40>%award1</size><br/>Gi\xe1 tr\u1ecb Jackpot 2 hi\u1ec7n t\u1ea1i:<br/> %award2";
    let VietlottResultSpecialPower = class VietlottResultSpecialPower extends cc.Component {
      constructor() {
        super(...arguments);
        this.lbInfo = null;
        this.preNumbers = null;
      }
      start() {
        this.setup("1/1/1990 - #0001", 11, [ 11, 12, 13, 14, 15, 16, 17 ], 25e10, 2e9);
      }
      setup(section, number, result, award1, award2) {
        this.lbInfo.string = LB_INFO.replace("%section", section).replace("%number", Utils_1.default.formatNumber(number)).replace("%award1", Utils_1.default.formatNumber(award1)).replace("%award2", Utils_1.default.formatNumber(award2));
        let node = cc.instantiate(this.preNumbers);
        this.lbInfo.node.addChild(node);
        node.position = cc.v3(0, 50);
        let nodeResult = node.getComponent(Vietlott_Lobby_Numbers_1.default);
        nodeResult && nodeResult.set(result);
      }
    };
    __decorate([ property(cc.RichText) ], VietlottResultSpecialPower.prototype, "lbInfo", void 0);
    __decorate([ property(cc.Prefab) ], VietlottResultSpecialPower.prototype, "preNumbers", void 0);
    VietlottResultSpecialPower = __decorate([ ccclass ], VietlottResultSpecialPower);
    exports.default = VietlottResultSpecialPower;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/Utils": void 0,
    "./Vietlott.Lobby.Numbers": "Vietlott.Lobby.Numbers"
  } ],
  "Vietlott.Result": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5c6acEZe/JLL7/AEQsyD35z", "Vietlott.Result");
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
    let VietlottResult = class VietlottResult extends cc.Component {
      start() {}
    };
    VietlottResult = __decorate([ ccclass ], VietlottResult);
    exports.default = VietlottResult;
    cc._RF.pop();
  }, {} ],
  "Vietlott.Search.Chose": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d0f3dAg4ixBUYaH9paVpSDh", "Vietlott.Search.Chose");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Vietlott_Data_1 = require("./Vietlott.Data");
    const Vietlott_Search_1 = require("./Vietlott.Search");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let VietlottSearchChose = class VietlottSearchChose extends cc.Component {
      constructor() {
        super(...arguments);
        this.title = null;
        this.pros = null;
        this.contentVertical = null;
        this.contentGird = null;
        this.preGame = null;
        this.preNumber = null;
        this.preType = null;
        this.btnConfirm = null;
      }
      onLoad() {}
      show(evt, data) {
        cc.tween(this.node).to(.2, {
          scaleY: 1
        }).start();
        this.contentVertical.node.parent.active = false;
        this.contentGird.node.parent.active = false;
        switch (data) {
         case "changeGame":
          this.contentVertical.node.parent.active = true;
          this.title.string = "";
          this.pros.string = "";
          this.btnConfirm.active = false;
          this.contentVertical.node.removeAllChildren();
          [ Vietlott_Data_1.InfoModeVietlott.MEGA_645, Vietlott_Data_1.InfoModeVietlott.MAX_3D, Vietlott_Data_1.InfoModeVietlott.POWER_645, Vietlott_Data_1.InfoModeVietlott.MAX_3D_PRO, Vietlott_Data_1.InfoModeVietlott.KENO, Vietlott_Data_1.InfoModeVietlott.BINGO_18 ].forEach(mode => {
            let game = cc.instantiate(this.preGame);
            game.getComponentInChildren(cc.Label).string = mode.name;
            game.getComponent(cc.Toggle).toggleGroup = this.contentVertical;
            let eventHandler = new cc.Component.EventHandler();
            eventHandler.target = this.node;
            eventHandler.component = "Vietlott.Search.Chose";
            eventHandler.handler = "choseType";
            eventHandler.customEventData = mode.name;
            game.getComponent(cc.Toggle).checkEvents.push(eventHandler);
            this.contentVertical.node.addChild(game);
          });
          break;

         case "changeSection":
          this.contentVertical.node.parent.active = true;
          this.title.string = "";
          this.pros.string = "";
          this.btnConfirm.active = false;
          this.contentVertical.node.removeAllChildren();
          [ "15/04/2024(#1001)", "15/04/2024(#1001)", "15/04/2024(#1001)", "15/04/2024(#1001)", "15/04/2024(#1001)", "15/04/2024(#1001)", "15/04/2024(#1001)", "15/04/2024(#1001)", "15/04/2024(#1001)", "15/04/2024(#1001)", "15/04/2024(#1001)", "15/04/2024(#1001)" ].forEach(mode => {
            let game = cc.instantiate(this.preGame);
            game.getComponentInChildren(cc.Label).string = mode;
            game.getComponent(cc.Toggle).toggleGroup = this.contentVertical;
            let eventHandler = new cc.Component.EventHandler();
            eventHandler.target = this.node;
            eventHandler.component = "Vietlott.Search.Chose";
            eventHandler.handler = "choseSection";
            eventHandler.customEventData = mode;
            game.getComponent(cc.Toggle).checkEvents.push(eventHandler);
            this.contentVertical.node.addChild(game);
          });
          break;

         case "changeTypePlay":
          this.contentGird.node.parent.active = true;
          this.title.string = "";
          this.pros.string = "";
          this.btnConfirm.active = false;
          this.contentGird.node.removeAllChildren();
          [ "Bao ...", "Bao ...", "Bao ...", "Bao ...", "Bao ...", "Bao ...", "Bao ...", "Bao ...", "Bao ...", "Bao ...", "Bao ...", "Bao ..." ].forEach(mode => {
            let game = cc.instantiate(this.preType);
            game.getComponentInChildren(cc.Label).string = mode;
            game.getComponent(cc.Toggle).toggleGroup = this.contentGird;
            let eventHandler = new cc.Component.EventHandler();
            eventHandler.target = this.node;
            eventHandler.component = "Vietlott.Search.Chose";
            eventHandler.handler = "choseTypePlay";
            eventHandler.customEventData = mode;
            game.getComponent(cc.Toggle).checkEvents.push(eventHandler);
            this.contentGird.node.addChild(game);
          });
          break;

         case "editTicket":
          this.contentGird.node.parent.active = true;
          this.title.string = "C\u01a1 B\u1ea3n";
          this.pros.string = "3/6";
          this.btnConfirm.active = false;
          this.contentGird.node.removeAllChildren();
          let numbers = [];
          for (let i = 1; i <= 45; i++) numbers.push(i);
          numbers.forEach(num => {
            let game = cc.instantiate(this.preNumber);
            game.getComponentInChildren(cc.Label).string = num;
            game.getComponent(cc.Toggle).isChecked = false;
            let eventHandler = new cc.Component.EventHandler();
            eventHandler.target = this.node;
            eventHandler.component = "Vietlott.Search.Chose";
            eventHandler.handler = "choseNumber";
            eventHandler.customEventData = num;
            game.getComponent(cc.Toggle).checkEvents.push(eventHandler);
            this.contentGird.node.addChild(game);
          });
          break;

         default:
          cc.error("type click error", data);
        }
      }
      hide(evt, data) {
        cc.tween(this.node).to(.2, {
          scaleY: 0
        }).start();
      }
      choseType(evt, data) {
        cc.log("click", data);
        Vietlott_Search_1.default.instance.changeType(data);
        switch (data) {
         case Vietlott_Data_1.InfoModeVietlott.MEGA_645.name:
        }
        this.hide(null, data);
      }
      choseSection(evt, data) {
        cc.log("click", data);
        Vietlott_Search_1.default.instance.changeSection(data);
        this.hide(null, data);
      }
      choseTypePlay(evt, data) {
        cc.log("click", data);
        Vietlott_Search_1.default.instance.changeTypePlay(data);
        this.hide(null, data);
      }
      choseNumber(evt, data) {
        cc.log("click", data);
      }
      showDate() {}
    };
    __decorate([ property(cc.Label) ], VietlottSearchChose.prototype, "title", void 0);
    __decorate([ property(cc.Label) ], VietlottSearchChose.prototype, "pros", void 0);
    __decorate([ property(cc.ToggleGroup) ], VietlottSearchChose.prototype, "contentVertical", void 0);
    __decorate([ property(cc.ToggleGroup) ], VietlottSearchChose.prototype, "contentGird", void 0);
    __decorate([ property(cc.Prefab) ], VietlottSearchChose.prototype, "preGame", void 0);
    __decorate([ property(cc.Prefab) ], VietlottSearchChose.prototype, "preNumber", void 0);
    __decorate([ property(cc.Prefab) ], VietlottSearchChose.prototype, "preType", void 0);
    __decorate([ property(cc.Node) ], VietlottSearchChose.prototype, "btnConfirm", void 0);
    VietlottSearchChose = __decorate([ ccclass ], VietlottSearchChose);
    exports.default = VietlottSearchChose;
    cc._RF.pop();
  }, {
    "./Vietlott.Data": "Vietlott.Data",
    "./Vietlott.Search": "Vietlott.Search"
  } ],
  "Vietlott.Search.Date": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2e70dTKp3lOcY+dKNiUTL63", "Vietlott.Search.Date");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Vietlott_Search_1 = require("./Vietlott.Search");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let VietlottSearchDate = class VietlottSearchDate extends cc.Component {
      constructor() {
        super(...arguments);
        this.days = null;
        this.lbTime = null;
      }
      onLoad() {
        this.year = new Date().getFullYear();
        this.month = new Date().getMonth();
      }
      showDate(month, year) {
        this.node.active = true;
        this.initDate(month, year);
      }
      initDate(month, year) {
        this.month = month;
        this.year = year;
        this.days.children.forEach(chil => {
          chil.opacity = 0;
        });
        this.lbTime.string = "Th\xe1ng " + (month + 1) + "/" + year;
        let days = this.getDaysInMonth(month, year);
        let startDay = days[0].getDay() || 7;
        for (let index = 0; index < startDay; index++) {
          let node = this.days.children[index];
          if (!node) {
            node = cc.instantiate(this.days.children[0]);
            this.days.addChild(node);
          }
          node.opacity = 0;
        }
        cc.log(startDay, days);
        days.forEach((day, idx) => {
          let node = this.days.children[idx + startDay - 1];
          node || (node = cc.instantiate(this.days.children[0]));
          node.getComponent(cc.Toggle).isChecked = false;
          node.off("toggle");
          node.on("toggle", () => {
            cc.log(day);
            Vietlott_Search_1.default.instance.changeTime(day);
            this.hide();
          });
          node.opacity = 255;
          node.getComponentInChildren(cc.Label).string = day.getDate() + "";
          node.parent || this.days.addChild(node);
        });
      }
      nextMonth() {
        this.initDate((this.month + 1) % 12 || 0, (11 == this.month ? 1 : 0) + this.year);
      }
      preMonth() {
        this.initDate(this.month - 1 < 0 ? 11 : this.month - 1, this.year - (0 == this.month ? 1 : 0));
      }
      getDaysInMonth(month, year) {
        var date = new Date(year, month, 1);
        var days = [];
        while (date.getMonth() === month) {
          days.push(new Date(date));
          date.setDate(date.getDate() + 1);
        }
        return days;
      }
      hide() {
        this.node.active = false;
      }
    };
    __decorate([ property(cc.Node) ], VietlottSearchDate.prototype, "days", void 0);
    __decorate([ property(cc.Label) ], VietlottSearchDate.prototype, "lbTime", void 0);
    VietlottSearchDate = __decorate([ ccclass ], VietlottSearchDate);
    exports.default = VietlottSearchDate;
    cc._RF.pop();
  }, {
    "./Vietlott.Search": "Vietlott.Search"
  } ],
  "Vietlott.Search.Result": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "89ee4sPo01PQq978HMmYFWx", "Vietlott.Search.Result");
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
    let VietlottSearchResult = class VietlottSearchResult extends cc.Component {};
    VietlottSearchResult = __decorate([ ccclass ], VietlottSearchResult);
    exports.default = VietlottSearchResult;
    cc._RF.pop();
  }, {} ],
  "Vietlott.Search": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2518duonw1Ne5nZzFZLbXjs", "Vietlott.Search");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var VietlottSearch_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Vietlott_Search_Date_1 = require("./Vietlott.Search.Date");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let VietlottSearch = VietlottSearch_1 = class VietlottSearch extends cc.Component {
      constructor() {
        super(...arguments);
        this.logo = null;
        this.lbGame = null;
        this.lbTime = null;
        this.lbSection = null;
        this.lbTypePlay = null;
        this.popupDate = null;
        this.tickets = null;
        this.ticketChose = null;
        this.ticketInput = null;
        this.dropDown = null;
      }
      onLoad() {
        VietlottSearch_1.instance = this;
      }
      changeType(data) {
        this.lbGame.string = data;
      }
      changeSection(data) {
        this.lbSection.string = data;
      }
      changeTypePlay(data) {
        this.lbTypePlay.string = data;
      }
      changeTime(day) {
        let textDay = day.getDate();
        let textMonth = day.getMonth();
        let textYear = day.getFullYear();
        let str = (textDay < 10 ? "0" : "") + textDay + "/" + (textMonth < 10 ? "0" : "") + textMonth + "/" + textYear;
        this.lbTime.string = str;
      }
      showDate() {
        let date = new Date();
        this.popupDate.showDate(date.getMonth(), date.getFullYear());
      }
      addTicket() {
        let ticketChose = cc.instantiate(this.ticketChose);
        this.tickets.addChild(ticketChose);
        let ticketInput = cc.instantiate(this.ticketInput);
        this.tickets.addChild(ticketInput);
      }
    };
    VietlottSearch.instance = null;
    __decorate([ property(cc.Sprite) ], VietlottSearch.prototype, "logo", void 0);
    __decorate([ property(cc.Label) ], VietlottSearch.prototype, "lbGame", void 0);
    __decorate([ property(cc.Label) ], VietlottSearch.prototype, "lbTime", void 0);
    __decorate([ property(cc.Label) ], VietlottSearch.prototype, "lbSection", void 0);
    __decorate([ property(cc.Label) ], VietlottSearch.prototype, "lbTypePlay", void 0);
    __decorate([ property(Vietlott_Search_Date_1.default) ], VietlottSearch.prototype, "popupDate", void 0);
    __decorate([ property(cc.Node) ], VietlottSearch.prototype, "tickets", void 0);
    __decorate([ property(cc.Prefab) ], VietlottSearch.prototype, "ticketChose", void 0);
    __decorate([ property(cc.Prefab) ], VietlottSearch.prototype, "ticketInput", void 0);
    __decorate([ property(cc.Node) ], VietlottSearch.prototype, "dropDown", void 0);
    VietlottSearch = VietlottSearch_1 = __decorate([ ccclass ], VietlottSearch);
    exports.default = VietlottSearch;
    cc._RF.pop();
  }, {
    "./Vietlott.Search.Date": "Vietlott.Search.Date"
  } ],
  use_reversed_rotateTo: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c8780wu9f5DpIMOyB+Tk+tk", "use_reversed_rotateTo");
    "use strict";
    cc.RotateTo._reverse = true;
    cc._RF.pop();
  }, {} ]
}, {}, [ "BackgroundScaler", "LoadingController", "use_reversed_rotateTo", "Vietlott.Cmd", "Vietlott.Controller", "Vietlott.Data", "Vietlott.Lobby.3D", "Vietlott.Lobby.3DPro", "Vietlott.Lobby.Bingo", "Vietlott.Lobby.Keno", "Vietlott.Lobby.Mega", "Vietlott.Lobby.Numbers", "Vietlott.Lobby.Power", "Vietlott.Lobby.Result", "Vietlott.Lobby.Tab", "Vietlott.Lobby", "Vietlott.Play", "Vietlott.Result.History", "Vietlott.Result.Mega", "Vietlott.Result.Other", "Vietlott.Result.Power", "Vietlott.Result.Special.3D", "Vietlott.Result.Special.3DPlus", "Vietlott.Result.Special.3DPro", "Vietlott.Result.Special.Mega", "Vietlott.Result.Special.Power", "Vietlott.Result", "Vietlott.Search.Chose", "Vietlott.Search.Date", "Vietlott.Search.Result", "Vietlott.Search" ]);