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
  ActionDialog: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3ae44MiEGpHjo0vtIe4ct3V", "ActionDialog");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const App_1 = require("./App");
    const Common_AudioManager_1 = require("./Common.AudioManager");
    const Constants_1 = require("./Constants");
    const Dialog_1 = require("./Dialog");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let ActionDialog = class ActionDialog extends Dialog_1.default {
      constructor() {
        super(...arguments);
        this.lblMessage = null;
        this.lblDone = null;
        this.onDismissed = null;
        this.layoutAction = null;
        this.btnActionItem = null;
      }
      show() {
        super.show();
        Common_AudioManager_1.default.getInstance().playEffect(App_1.default.instance.soundWarning, .7);
      }
      showMsgWithAction(msg, doneTitle, onAction) {
        this.lblDone.node.parent.active = true;
        this.layoutAction.node.active = false;
        this.lblDone.string = doneTitle || "\u0110\xf3ng";
        this.lblMessage.string = msg;
        "function" === typeof onAction && this.lblDone.node.getParent().once(cc.Node.EventType.TOUCH_END, () => {
          this.dismiss();
          onAction();
        });
        this.show();
      }
      showMsgWithActions(msg, suggestionActions) {
        this.lblMessage.string = msg;
        const avaiableSuggestionActions = suggestionActions.filter(action => action);
        if (0 === avaiableSuggestionActions.length) {
          this.lblDone.node.getParent().once(cc.Node.EventType.TOUCH_END, () => {
            this.dismiss();
          });
          return;
        }
        this.lblDone.node.getParent().active = false;
        this.layoutAction.node.active = true;
        this.layoutAction.node.removeAllChildren();
        avaiableSuggestionActions.forEach(action => {
          let btn = cc.instantiate(this.btnActionItem);
          btn.y = 0;
          btn.active = true;
          btn.getComponentInChildren(cc.Label).string = Constants_1.UserActions.toName(action);
          btn.once(cc.Node.EventType.TOUCH_END, () => {
            this.dismiss();
            App_1.default.instance.navigateByAction(action);
          });
          btn.parent = this.layoutAction.node;
          switch (avaiableSuggestionActions.length) {
           case 1:
            btn.getComponentInChildren(cc.Label).node.once("size-changed", () => {
              btn.width = btn.getComponentInChildren(cc.Label).node.width + 60;
            });
            btn.getComponentInChildren(cc.Label).overflow = cc.Label.Overflow.NONE;
            break;

           case 2:
            this.layoutAction.spacingX = 0;
            btn.getComponentInChildren(cc.Label).overflow = cc.Label.Overflow.SHRINK;
            btn.getComponentInChildren(cc.Label).node.width = 160;
            btn.width = 220;
            break;

           default:
            this.layoutAction.spacingX = -20;
            btn.getComponentInChildren(cc.Label).overflow = cc.Label.Overflow.SHRINK;
            btn.getComponentInChildren(cc.Label).node.width = 160;
            btn.width = 190;
          }
        });
        this.show();
      }
      _onDismissed() {
        super._onDismissed();
        "function" === typeof this.onDismissed && this.onDismissed();
        this.lblDone.node.getParent().off(cc.Node.EventType.TOUCH_END);
      }
      dismiss() {
        if (!this.isAnimated) return;
        super.dismiss();
      }
      forceDismiss() {
        super.dismiss();
      }
    };
    __decorate([ property(cc.Label) ], ActionDialog.prototype, "lblMessage", void 0);
    __decorate([ property(cc.Label) ], ActionDialog.prototype, "lblDone", void 0);
    __decorate([ property(cc.Layout) ], ActionDialog.prototype, "layoutAction", void 0);
    __decorate([ property(cc.Node) ], ActionDialog.prototype, "btnActionItem", void 0);
    ActionDialog = __decorate([ ccclass ], ActionDialog);
    exports.default = ActionDialog;
    cc._RF.pop();
  }, {
    "./App": "App",
    "./Common.AudioManager": "Common.AudioManager",
    "./Constants": "Constants",
    "./Dialog": "Dialog"
  } ],
  AlertDialog: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1f198ZBwStLe5rFEKOd4Xci", "AlertDialog");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const App_1 = require("./App");
    const Common_AudioManager_1 = require("./Common.AudioManager");
    const Dialog_1 = require("./Dialog");
    const {ccclass: ccclass, property: property} = cc._decorator;
    class AlertDialogQueueItem {
      constructor(msg, doneTitle, onDismissed) {
        this.msg = msg;
        this.doneTitle = doneTitle;
        this.onDismissed = onDismissed;
      }
    }
    let AlertDialog = class AlertDialog extends Dialog_1.default {
      constructor() {
        super(...arguments);
        this.lblMessage = null;
        this.lblDone = null;
        this.onDismissed = null;
        this.queue = new Array();
      }
      showMsg(msg) {
        this.show4(msg, null, null, false);
      }
      showMsgWithOnDismissed(msg, onDismissed) {
        this.show4(msg, null, onDismissed);
      }
      show3(msg, onDismissed, addQueue = false) {
        this.show4(msg, null, onDismissed, addQueue);
      }
      show4(msg, doneTitle, onDismissed, addQueue = false, forceAddQueue = true) {
        if (addQueue) {
          this.queue.push(new AlertDialogQueueItem(msg, doneTitle, onDismissed));
          if (1 == this.queue.length) {
            this.lblDone.string = doneTitle || "\u0110\xf3ng";
            this.onDismissed = onDismissed;
            this.lblMessage.string = msg;
            super.show();
          }
        } else if (this.queue.length > 0 && forceAddQueue) this.queue.push(new AlertDialogQueueItem(msg, doneTitle, onDismissed)); else {
          this.lblDone.string = doneTitle || "\u0110\xf3ng";
          this.onDismissed = onDismissed;
          this.lblMessage.string = msg;
          super.show();
        }
      }
      _onShowed() {
        super._onShowed();
        Common_AudioManager_1.default.getInstance().playEffect(App_1.default.instance.soundWarning, .7);
      }
      _onDismissed() {
        super._onDismissed();
        "function" === typeof this.onDismissed && this.onDismissed();
        if (this.queue.length > 0) {
          this.queue.splice(0, 1);
          this.queue.length > 0 && this.show4(this.queue[0].msg, this.queue[0].doneTitle, this.queue[0].onDismissed, false, false);
        }
      }
      dismiss() {
        if (!this.isAnimated) return;
        super.dismiss();
      }
    };
    __decorate([ property(cc.Label) ], AlertDialog.prototype, "lblMessage", void 0);
    __decorate([ property(cc.Label) ], AlertDialog.prototype, "lblDone", void 0);
    AlertDialog = __decorate([ ccclass ], AlertDialog);
    exports.default = AlertDialog;
    cc._RF.pop();
  }, {
    "./App": "App",
    "./Common.AudioManager": "Common.AudioManager",
    "./Dialog": "Dialog"
  } ],
  AnimResizer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a7753f6YUNB0Kql8ybfHtYe", "AnimResizer");
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
    let BgResizer = class BgResizer extends cc.Component {
      constructor() {
        super(...arguments);
        this.designResolution = new cc.Size(720, 1280);
        this.isFullScene = false;
        this.lastWitdh = 720;
        this.lastHeight = 1280;
      }
      start() {
        this.updateSize();
      }
      update(dt) {
        cc.sys.isBrowser && false;
      }
      updateSize() {
        var frameSize = cc.view.getFrameSize();
        var winSize = this.isFullScene ? Math.max(frameSize.width / this.lastWitdh, frameSize.height / this.lastHeight) : Math.min(frameSize.width / this.lastWitdh, frameSize.height / this.lastHeight);
        if (this.lastWitdh !== frameSize.width || this.lastHeight !== frameSize.height) {
          this.lastWitdh = frameSize.width;
          this.lastHeight = frameSize.height;
          this.node.setScale(winSize);
        }
      }
    };
    __decorate([ property ], BgResizer.prototype, "designResolution", void 0);
    __decorate([ property(cc.Boolean) ], BgResizer.prototype, "isFullScene", void 0);
    BgResizer = __decorate([ ccclass ], BgResizer);
    exports.default = BgResizer;
    cc._RF.pop();
  }, {} ],
  AppearanceUtil: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "15efdVqubpLnpG2/LvKNVZ0", "AppearanceUtil");
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
    let AppearanceUtil = class AppearanceUtil extends cc.Component {
      constructor() {
        super(...arguments);
        this.currentOrChildren = false;
        this.listNodeRunAction = [];
        this.opacityFrom = 255;
        this.opacityTo = 255;
        this.timeOpacity = 0;
        this.idEasingOpacity = 0;
        this.scaleFrom = 1;
        this.scaleTo = 1;
        this.timeScale = 0;
        this.idEasingScale = 0;
        this.addPositionToStart = cc.v3(0, 0, 0);
        this.moveHorizontal = true;
        this.addPositionToEnd = cc.v3(0, 0, 0);
        this.timeMoveToPostion = 0;
        this.idEasingMove = 0;
        this.factorDelayTime = .5;
      }
      start() {
        this.node.active && (this.currentOrChildren ? this.listNodeRunAction.forEach((children, index) => {
          children.active && this.moveNode(children, index * this.factorDelayTime);
        }) : this.moveNode(this.node, this.factorDelayTime));
      }
      checkModeAction(idMode) {
        switch (idMode) {
         case 0:
          return cc.easing.elasticInOut;

         case 1:
          return cc.easing.quartInOut;

         case 2:
          return cc.easing.bounceOut;

         case 3:
          return cc.easing.cubicOut;

         default:
          return cc.easing.elasticInOut;
        }
      }
      getPosByScene(pos) {
        return cc.v3(pos.x *= this.node.getContentSize().width / 720, pos.y *= this.node.getContentSize().height / 1280);
      }
      getPosYByScene(pos) {
        return pos * (this.node.getContentSize().height / 1280);
      }
      getPosXByScene(pos) {
        return pos * (this.node.getContentSize().width / 720);
      }
      moveNode(node, delayTime = 0) {
        let t = cc.tween;
        let listAction = [];
        let posEnd = this.getPosByScene(node.position.add(this.addPositionToEnd));
        if (this.timeMoveToPostion) {
          let modeMove = this.checkModeAction(this.idEasingMove);
          0 == this.addPositionToStart.x && 0 == this.addPositionToStart.y ? this.moveHorizontal ? node.x = node.x < 0 ? -this.getPosXByScene(this.node.getContentSize().width + node.width * node.anchorX) : this.getPosXByScene(this.node.getContentSize().width + node.width * node.anchorX) : node.y = this.getPosYByScene(this.node.getContentSize().height + node.height * node.anchorY) : node.position = node.position.add(this.addPositionToStart);
          cc.tween(node).sequence(cc.tween().delay(delayTime), cc.tween().to(this.timeMoveToPostion, {
            position: posEnd
          }, {
            easing: modeMove
          })).start();
        }
        if (this.timeScale) {
          let modeScale = this.checkModeAction(this.idEasingScale);
          this.scaleFrom == this.scaleTo ? node.scale = 0 : node.scale = this.scaleFrom;
          cc.tween(node).sequence(cc.tween().delay(delayTime), cc.tween().to(this.timeScale, {
            scale: this.scaleTo
          }, {
            easing: modeScale
          })).start();
        }
        if (this.timeOpacity) {
          let modeOpacity = this.checkModeAction(this.idEasingOpacity);
          this.opacityFrom == this.opacityTo ? node.opacity = 0 : node.opacity = this.opacityFrom;
          cc.tween(node).sequence(cc.tween().delay(delayTime), cc.tween().to(this.timeOpacity, {
            opacity: this.opacityTo
          }, {
            easing: modeOpacity
          })).start();
        }
      }
    };
    __decorate([ property() ], AppearanceUtil.prototype, "currentOrChildren", void 0);
    __decorate([ property([ cc.Node ]) ], AppearanceUtil.prototype, "listNodeRunAction", void 0);
    __decorate([ property() ], AppearanceUtil.prototype, "opacityFrom", void 0);
    __decorate([ property() ], AppearanceUtil.prototype, "opacityTo", void 0);
    __decorate([ property() ], AppearanceUtil.prototype, "timeOpacity", void 0);
    __decorate([ property() ], AppearanceUtil.prototype, "idEasingOpacity", void 0);
    __decorate([ property() ], AppearanceUtil.prototype, "scaleFrom", void 0);
    __decorate([ property() ], AppearanceUtil.prototype, "scaleTo", void 0);
    __decorate([ property() ], AppearanceUtil.prototype, "timeScale", void 0);
    __decorate([ property() ], AppearanceUtil.prototype, "idEasingScale", void 0);
    __decorate([ property() ], AppearanceUtil.prototype, "addPositionToStart", void 0);
    __decorate([ property() ], AppearanceUtil.prototype, "moveHorizontal", void 0);
    __decorate([ property() ], AppearanceUtil.prototype, "addPositionToEnd", void 0);
    __decorate([ property() ], AppearanceUtil.prototype, "timeMoveToPostion", void 0);
    __decorate([ property() ], AppearanceUtil.prototype, "idEasingMove", void 0);
    __decorate([ property() ], AppearanceUtil.prototype, "factorDelayTime", void 0);
    AppearanceUtil = __decorate([ ccclass ], AppearanceUtil);
    exports.default = AppearanceUtil;
    cc._RF.pop();
  }, {} ],
  App: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "28249+WEXpPF7gjoWi2hRVw", "App");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var App_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const AlertDialog_1 = require("./AlertDialog");
    const ConfirmDialog_1 = require("./ConfirmDialog");
    const SubpackageDownloader_1 = require("./SubpackageDownloader");
    const MiniGameNetworkClient_1 = require("../networks/MiniGameNetworkClient");
    const Configs_1 = require("./Configs");
    const MiniGame_1 = require("../../../Lobby/src/MiniGame");
    const ButtonMiniGame_1 = require("../../../Lobby/src/ButtonMiniGame");
    const Lobby_LobbyController_1 = require("../../../Lobby/src/Lobby.LobbyController");
    const Toast_1 = require("./Toast");
    const TXMD5NetworkClient_1 = require("../networks/TXMD5NetworkClient");
    const Lobby_PopupShop_1 = require("../../../Lobby/src/Lobby.PopupShop");
    const Constants_1 = require("./Constants");
    const ActionDialog_1 = require("./ActionDialog");
    const Lobby_PopupVippoint_1 = require("../../../Lobby/src/Vippoint/Lobby.PopupVippoint");
    const BroadcastReceiver_1 = require("./BroadcastReceiver");
    const Common_AudioManager_1 = require("./Common.AudioManager");
    const ErrorLogger_1 = require("./ErrorLogger");
    const AuthorizationController_1 = require("../../../Lobby/src/Authorization/AuthorizationController");
    const SPUtils_1 = require("./SPUtils");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let App = App_1 = class App extends cc.Component {
      constructor() {
        super(...arguments);
        this.designResolution = new cc.Size(720, 1280);
        this.loading = null;
        this.loadingIcon = null;
        this.loadingLabel = null;
        this.alertDialog = null;
        this.actiontDialog = null;
        this.confirmDialog = null;
        this.sprFrameAvatars = new Array();
        this.buttonMiniGameNode = null;
        this.miniGame = null;
        this.popups = null;
        this.lobby = null;
        this.soundClick = null;
        this.soundWarning = null;
        this.toast = null;
        this.lastWitdh = 0;
        this.lastHeight = 0;
        this.timeOutLoading = null;
        this.isFisrtNetworkConnected = false;
        this.subpackageLoaded = {};
        this.taiXiu = null;
        this.taiXiuMD5 = null;
        this.miniPoker = null;
        this.caoThap = null;
        this.bauCua = null;
        this.pokerGo = null;
        this.oanTuTi = null;
        this.pendingCmdIds = new Set();
      }
      onLoad() {
        if (null != App_1.instance) {
          this.node.destroy();
          return;
        }
        App_1.instance = this;
        cc.game.addPersistRootNode(App_1.instance.node);
        this.buttonMiniGame = this.buttonMiniGameNode.getComponent(ButtonMiniGame_1.default);
      }
      start() {
        var _a, _b, _c;
        BroadcastReceiver_1.default.register(BroadcastReceiver_1.default.SET_SOUND, node => {
          this.checkBtn(node);
        }, this);
        this.checkBtn();
        this.updateSize();
        if (cc.sys.isBrowser) {
          window.addEventListener("message", function(e) {
            const data = JSON.parse(e.data);
            !Configs_1.default.Login.IsLogin && data.hasOwnProperty("event") && "auth_user" === data.event && AuthorizationController_1.AuthorizationController.getInstance().loginTelegram(data.auth_data);
          });
          if (!Configs_1.default.Login.IsLogin && 0 == SPUtils_1.default.getUserPass().length && (null === (_c = null === (_b = null === (_a = window["Telegram"]) || void 0 === _a ? void 0 : _a.WebApp) || void 0 === _b ? void 0 : _b.initDataUnsafe) || void 0 === _c ? void 0 : _c.user)) {
            let telegramAuthData = {
              botUserName: "win365_52_bot",
              query_id: window["Telegram"].WebApp.initDataUnsafe.query_id,
              id: window["Telegram"].WebApp.initDataUnsafe.user.id,
              first_name: window["Telegram"].WebApp.initDataUnsafe.user.first_name,
              last_name: window["Telegram"].WebApp.initDataUnsafe.user.last_name,
              username: window["Telegram"].WebApp.initDataUnsafe.user.username,
              language_code: window["Telegram"].WebApp.initDataUnsafe.user.language_code,
              allows_write_to_pm: window["Telegram"].WebApp.initDataUnsafe.user.allows_write_to_pm,
              auth_date: window["Telegram"].WebApp.initDataUnsafe.auth_date,
              hash: window["Telegram"].WebApp.initDataUnsafe.hash,
              initDataUnsafe: window["Telegram"].WebApp.initDataUnsafe,
              url: window.location.href
            };
            AuthorizationController_1.AuthorizationController.getInstance().loginTelegramWebApp(telegramAuthData);
          }
          cc.sys.os === cc.sys.BROWSER_TYPE_ANDROID && this.setStateAnimation(false);
        }
      }
      showLoading(isShow, timeOut = 15, cmdId = null) {
        isShow && cmdId ? this.pendingCmdIds.add(cmdId) : !isShow && cmdId && this.pendingCmdIds.delete(cmdId);
        if (!isShow && this.pendingCmdIds.size > 0) return;
        this.loading.active = isShow;
        this.loadingLabel.string = "\u0110ang t\u1ea3i...";
        null != this.timeOutLoading && this.unschedule(this.timeOutLoading);
        if (timeOut > 0) {
          this.timeOutLoading = () => {
            this.showLoading(false, timeOut, cmdId);
          };
          this.scheduleOnce(this.timeOutLoading, timeOut);
        }
      }
      showErrLoading(msg) {
        this.showLoading(true, -1);
        this.loadingLabel.string = msg || "M\u1ea5t k\u1ebft n\u1ed1i, \u0111ang th\u1eed l\u1ea1i...";
      }
      update(dt) {
        if (cc.sys.isNative) return;
        this.updateSize();
      }
      updateSize() {
        var frameSize = cc.view.getFrameSize();
        if (this.lastWitdh !== frameSize.width || this.lastHeight !== frameSize.height) {
          this.lastWitdh = frameSize.width;
          this.lastHeight = frameSize.height;
          var newDesignSize = cc.Size.ZERO;
          newDesignSize = this.designResolution.width / this.designResolution.height > frameSize.width / frameSize.height ? cc.size(this.designResolution.width, this.designResolution.width * (frameSize.height / frameSize.width)) : cc.size(this.designResolution.height * (frameSize.width / frameSize.height), this.designResolution.height);
          this.node.setContentSize(newDesignSize);
          this.node.setPosition(cc.v2(newDesignSize.width / 2, newDesignSize.height / 2));
        }
      }
      getAvatarSpriteFrame(avatar) {
        let avatarInt = parseInt(avatar);
        if (isNaN(avatarInt) || avatarInt < 0 || avatarInt >= this.sprFrameAvatars.length) return this.sprFrameAvatars[0];
        return this.sprFrameAvatars[avatarInt];
      }
      loadScene(sceneName, onLaunched) {
        if (sceneName === cc.director.getScene().name) return;
        cc.director.preloadScene(sceneName, (c, t, item) => {
          this.showErrLoading("\u0110ang t\u1ea3i..." + parseInt("" + c / t * 100) + "%");
        }, err => {
          this.showLoading(false);
          cc.director.loadScene(sceneName, () => {
            onLaunched && onLaunched();
          });
        });
      }
      loadSceneInSubpackage(subpackageName, sceneName) {
        if (this.subpackageLoaded.hasOwnProperty(subpackageName) && this.subpackageLoaded[subpackageName]) cc.director.preloadScene(sceneName, (c, t, item) => {
          this.showErrLoading("\u0110ang t\u1ea3i..." + parseInt("" + c / t * 100) + "%");
        }, err => {
          this.showLoading(false);
          cc.director.loadScene(sceneName);
        }); else {
          this.showLoading(true, -1);
          SubpackageDownloader_1.default.downloadSubpackage(subpackageName, (err, progress) => {
            if ("progress" == err) {
              this.showErrLoading("\u0110ang t\u1ea3i..." + parseInt("" + 100 * progress) + "%");
              return;
            }
            if (err) {
              this.alertDialog.showMsg(err);
              return;
            }
            this.subpackageLoaded[subpackageName] = true;
            cc.director.preloadScene(sceneName, (c, t, item) => {
              this.showErrLoading("\u0110ang t\u1ea3i..." + parseInt("" + c / t * 100) + "%");
            }, err => {
              this.showLoading(false);
              cc.director.loadScene(sceneName);
            });
          });
        }
      }
      loadPrefabInSubpackage(subpackageName, prefabPath, onLoaded) {
        if (this.subpackageLoaded.hasOwnProperty(subpackageName) && this.subpackageLoaded[subpackageName]) {
          this.showLoading(true, -1);
          cc.loader.loadRes(prefabPath, cc.Prefab, (c, t, item) => {
            this.showErrLoading("\u0110ang t\u1ea3i..." + parseInt("" + c / t * 100) + "%");
          }, (err, prefab) => {
            this.showLoading(false);
            onLoaded(null == err ? null : err.message, prefab);
          });
        } else {
          this.showLoading(true, -1);
          SubpackageDownloader_1.default.downloadSubpackage(subpackageName, (err, progress) => {
            if ("progress" == err) {
              this.showErrLoading("\u0110ang t\u1ea3i..." + parseInt("" + 100 * progress) + "%");
              return;
            }
            this.showLoading(false);
            if (err) {
              this.alertDialog.showMsg(err);
              return;
            }
            this.subpackageLoaded[subpackageName] = true;
            cc.loader.loadRes(prefabPath, cc.Prefab, (c, t, item) => {
              this.showErrLoading("\u0110ang t\u1ea3i..." + parseInt("" + c / t * 100) + "%");
            }, (err, prefab) => {
              this.showLoading(false);
              onLoaded(null == err ? null : err.message, prefab);
            });
          });
        }
      }
      openGameBauCua() {
        App_1.instance.loadPrefabInBundle("baucua", Configs_1.default.App.UPDATE_INFO["baucua"], true, "res/prefabs/BauCua", (err, prefab) => {
          MiniGameNetworkClient_1.default.getInstance().checkConnect(() => {
            if (null != prefab) {
              if (null == this.bauCua) {
                let node = cc.instantiate(prefab);
                node.parent = this.miniGame;
                node.active = false;
                this.bauCua = node.getComponent(MiniGame_1.default);
              }
              this.bauCua.show();
            } else cc.log(err);
          });
        });
      }
      openGamePokerGo() {
        App_1.instance.loadPrefabInBundle("pokergo", Configs_1.default.App.UPDATE_INFO["pokergo"], true, "res/prefabs/PokerGo", (err, prefab) => {
          MiniGameNetworkClient_1.default.getInstance().checkConnect(() => {
            if (null != prefab) {
              if (null == this.pokerGo) {
                let node = cc.instantiate(prefab);
                node.parent = this.miniGame;
                node.active = false;
                this.pokerGo = node.getComponent(MiniGame_1.default);
              }
              this.pokerGo.show();
            } else cc.log(err);
          });
        });
      }
      openGameTaiXiuMini() {
        App_1.instance.loadPrefabInBundle("taixiu", Configs_1.default.App.UPDATE_INFO["taixiu"], true, "res/prefabs/TaiXiu", (err, prefab) => {
          MiniGameNetworkClient_1.default.getInstance().checkConnect(() => {
            if (null != prefab) {
              if (null == this.taiXiu) {
                let node = cc.instantiate(prefab);
                node.parent = this.miniGame;
                node.active = false;
                this.taiXiu = node.getComponent(MiniGame_1.default);
              }
              this.taiXiu.show();
            } else cc.log(err);
          });
        });
      }
      openGameTaiXiuMD5() {
        App_1.instance.loadPrefabInBundle("taixiumd5", Configs_1.default.App.UPDATE_INFO["taixiumd5"], true, "res/prefabs/TaiXiuMD5", (err, prefab) => {
          err && cc.log(err);
          TXMD5NetworkClient_1.default.getInstance().checkConnect(() => {
            if (null != prefab) {
              if (null == this.taiXiuMD5) {
                let node = cc.instantiate(prefab);
                node.parent = this.miniGame;
                node.active = false;
                this.taiXiuMD5 = node.getComponent(MiniGame_1.default);
              }
              this.taiXiuMD5.show();
            } else cc.log(err);
          });
        });
      }
      openGameMiniPoker() {
        App_1.instance.loadPrefabInBundle("minipoker", Configs_1.default.App.UPDATE_INFO["minipoker"], true, "res/prefabs/MiniPoker", (err, prefab) => {
          MiniGameNetworkClient_1.default.getInstance().checkConnect(() => {
            if (null != prefab) {
              if (null == this.miniPoker) {
                let node = cc.instantiate(prefab);
                node.parent = this.miniGame;
                node.active = false;
                this.miniPoker = node.getComponent(MiniGame_1.default);
              }
              this.miniPoker.show();
            } else cc.log(err);
          });
        });
      }
      openGameCaoThap() {
        App_1.instance.loadPrefabInBundle("caothap", Configs_1.default.App.UPDATE_INFO["caothap"], true, "res/prefabs/CaoThap", (err, prefab) => {
          MiniGameNetworkClient_1.default.getInstance().checkConnect(() => {
            if (null != prefab) {
              if (null == this.caoThap) {
                let node = cc.instantiate(prefab);
                node.parent = this.miniGame;
                node.active = false;
                this.caoThap = node.getComponent(MiniGame_1.default);
              }
              this.caoThap.show();
            } else cc.log(err);
          });
        });
      }
      openGameOanTuTi() {
        App_1.instance.loadPrefabInBundle("oantuti", Configs_1.default.App.UPDATE_INFO["oantuti"], true, "res/prefabs/OanTuTi", (err, prefab) => {
          MiniGameNetworkClient_1.default.getInstance().checkConnect(() => {
            if (null != prefab) {
              if (null == this.oanTuTi) {
                let node = cc.instantiate(prefab);
                node.parent = this.miniGame;
                node.active = false;
                this.oanTuTi = node.getComponent(MiniGame_1.default);
              }
              this.oanTuTi.show();
            } else cc.log(err);
          });
        });
      }
      openTanLoc() {
        App_1.instance.loadSceneInBundle("tanloc", Configs_1.default.App.UPDATE_INFO["tanloc"], true, "TanLoc");
      }
      openTelegram(name = null) {
        if (!Configs_1.default.Login.IsLogin) {
          App_1.instance.alertDialog.showMsg("B\u1ea1n ch\u01b0a \u0111\u0103ng nh\u1eadp.");
          return;
        }
        null == name && (name = Configs_1.default.App.getLinkTelegram());
        let url = "http://www.telegram.me/" + name + "?start=" + Configs_1.default.Login.telegramAccessToken;
        cc.sys.isNative && (url = "tg://resolve?domain=" + name + "&start=" + Configs_1.default.Login.telegramAccessToken);
        cc.sys.openURL(url);
      }
      openShop(index) {
        Lobby_PopupShop_1.default.createAndShow(this.popups, null, index);
      }
      loadPrefab(prefabPath, onLoaded) {
        this.showErrLoading("\u0110ang t\u1ea3i...");
        cc.assetManager.getBundle(Configs_1.default.App.BUNDLE_NAME.MAIN).load(prefabPath, cc.Prefab, (c, t, item) => {
          this.showErrLoading("\u0110ang t\u1ea3i..." + parseInt("" + c / t * 100) + "%");
        }, (err, prefab) => {
          this.showLoading(false);
          onLoaded(null == err ? null : err.message, prefab);
        });
      }
      loadPrefabInBundle(bundleName, bundleVersion, isRemote, prefabPath, onLoaded) {
        this.showLoading(true, -1);
        isRemote = isRemote && cc.sys.isNative && true;
        let _bundleName = isRemote ? Configs_1.default.App.UPDATE_INFO["url"] + bundleName : bundleName;
        let _bundleVersion = (isRemote || cc.sys.isBrowser) && bundleVersion ? bundleVersion : "";
        cc.assetManager.loadBundle(_bundleName, {
          version: _bundleVersion
        }, (err, bundle) => {
          this.showLoading(false);
          if (err) {
            this.alertDialog.showMsg(err.message);
            return;
          }
          bundle.load(prefabPath, cc.Prefab, (c, t, item) => {
            this.showErrLoading("\u0110ang t\u1ea3i..." + parseInt("" + c / t * 100) + "%");
          }, (err, prefab) => {
            this.showLoading(false);
            onLoaded(null == err ? null : err.message, prefab);
          });
        });
      }
      loadSceneInBundle(bundleName, bundleVersion, isRemote, sceneName) {
        this.showLoading(true, -1);
        isRemote = isRemote && cc.sys.isNative && true;
        let _bundleName = isRemote ? Configs_1.default.App.UPDATE_INFO["url"] + bundleName : bundleName;
        let _bundleVersion = (isRemote || cc.sys.isBrowser) && bundleVersion ? bundleVersion : "";
        cc.assetManager.loadBundle(_bundleName, {
          version: _bundleVersion
        }, (err, bundle) => {
          if (err) {
            this.showLoading(false);
            ErrorLogger_1.ErrorLogger.sendLogError("Load bundle error", _bundleName, err.message);
            return;
          }
          bundle.preloadScene(sceneName, (c, t, item) => {
            this.showErrLoading("\u0110ang t\u1ea3i..." + parseInt("" + c / t * 100) + "%");
          }, err => {
            if (err) {
              this.showLoading(false);
              ErrorLogger_1.ErrorLogger.sendLogError("Preload scene error", sceneName, err.message);
              return;
            }
            bundle.loadScene(sceneName, (err, scene) => {
              this.showLoading(false);
              if (err) {
                ErrorLogger_1.ErrorLogger.sendLogError("Load scene error", sceneName, err.message);
                return;
              }
              cc.director.runScene(scene);
            });
          });
        });
      }
      getBundle(bundleName) {
        return cc.assetManager.getBundle(bundleName);
      }
      navigateByAction(action) {
        switch (action) {
         case Constants_1.UserActions.ENUM.RECHARGE:
         case Constants_1.UserActions.ENUM.RECHARGE_CARD:
          this.openShop(0);
          break;

         case Constants_1.UserActions.ENUM.RECHARGE_MOMO:
          this.openShop(2);
          break;

         case Constants_1.UserActions.ENUM.RECHARGE_BANK:
          this.openShop(3);
          break;

         case Constants_1.UserActions.ENUM.PLAY_GAME:
          break;

         case Constants_1.UserActions.ENUM.PLAY_GAME_TAI_XIU:
          this.openGameTaiXiuMini();
          break;

         case Constants_1.UserActions.ENUM.PLAY_GAME_MINI_POKER:
          this.openGameMiniPoker();
          break;

         case Constants_1.UserActions.ENUM.PLAY_GAME_BAU_CUA:
          this.openGameBauCua();
          break;

         case Constants_1.UserActions.ENUM.PLAY_GAME_CAO_THAP:
          this.openGameCaoThap();
          break;

         case Constants_1.UserActions.ENUM.PLAY_GAME_POKE_GO:
          this.openGamePokerGo();
          break;

         case Constants_1.UserActions.ENUM.PLAY_GAME_VQMM:
          break;

         case Constants_1.UserActions.ENUM.VERIFY_TELEGRAM:
          this.openTelegram();
          break;

         case Constants_1.UserActions.ENUM.OPEN_VIPPOINT:
          Lobby_PopupVippoint_1.default.createAndShow(this.popups);
          break;

         case Constants_1.UserActions.ENUM.TELE_SUPPORT:
          this.openTelegram(Configs_1.default.App.TELE_SUPPORT);
          break;

         case Constants_1.UserActions.ENUM.FB_MESSENGER:
          cc.sys.openURL(Configs_1.default.App.FB_MESSENGER);
        }
      }
      setStateAnimation(isStopAnimation = false) {
        var _a;
        null === (_a = this.lobby) || void 0 === _a ? void 0 : _a.setStateAnimation(isStopAnimation);
      }
      playSoundClick() {
        Common_AudioManager_1.default.getInstance().playEffect(this.soundClick, .7);
      }
      checkBtn(node = null) {
        let nodeCheck = node && node.name ? node : cc.find("Canvas");
        let findBtn = (node, path) => {
          try {
            let btn = node.getComponent(cc.Button) || node.getComponent(cc.Toggle);
            if (btn && 0 == btn.clickEvents.filter(evt => evt && "playSoundClick" == evt.handler).length) {
              let eventHandler = new cc.Component.EventHandler();
              eventHandler.target = this.node;
              eventHandler.component = "App";
              eventHandler.handler = "playSoundClick";
              eventHandler.customEventData = "";
              btn.clickEvents.push(eventHandler);
            }
          } catch (error) {
            cc.warn(path, error);
          }
          node.children.forEach(child => {
            findBtn(child, path + "/" + child.name);
          });
        };
        findBtn(nodeCheck, "canvas");
        node && node.name && findBtn(this.node, "app");
      }
    };
    App.instance = null;
    __decorate([ property ], App.prototype, "designResolution", void 0);
    __decorate([ property(cc.Node) ], App.prototype, "loading", void 0);
    __decorate([ property(cc.Node) ], App.prototype, "loadingIcon", void 0);
    __decorate([ property(cc.Label) ], App.prototype, "loadingLabel", void 0);
    __decorate([ property(AlertDialog_1.default) ], App.prototype, "alertDialog", void 0);
    __decorate([ property(ActionDialog_1.default) ], App.prototype, "actiontDialog", void 0);
    __decorate([ property(ConfirmDialog_1.default) ], App.prototype, "confirmDialog", void 0);
    __decorate([ property([ cc.SpriteFrame ]) ], App.prototype, "sprFrameAvatars", void 0);
    __decorate([ property(cc.Node) ], App.prototype, "buttonMiniGameNode", void 0);
    __decorate([ property(cc.Node) ], App.prototype, "miniGame", void 0);
    __decorate([ property(cc.Node) ], App.prototype, "popups", void 0);
    __decorate([ property(Lobby_LobbyController_1.default) ], App.prototype, "lobby", void 0);
    __decorate([ property(cc.AudioClip) ], App.prototype, "soundClick", void 0);
    __decorate([ property(cc.AudioClip) ], App.prototype, "soundWarning", void 0);
    __decorate([ property(Toast_1.default) ], App.prototype, "toast", void 0);
    App = App_1 = __decorate([ ccclass ], App);
    exports.default = App;
    cc._RF.pop();
  }, {
    "../../../Lobby/src/Authorization/AuthorizationController": "AuthorizationController",
    "../../../Lobby/src/ButtonMiniGame": "ButtonMiniGame",
    "../../../Lobby/src/Lobby.LobbyController": "Lobby.LobbyController",
    "../../../Lobby/src/Lobby.PopupShop": "Lobby.PopupShop",
    "../../../Lobby/src/MiniGame": "MiniGame",
    "../../../Lobby/src/Vippoint/Lobby.PopupVippoint": "Lobby.PopupVippoint",
    "../networks/MiniGameNetworkClient": "MiniGameNetworkClient",
    "../networks/TXMD5NetworkClient": "TXMD5NetworkClient",
    "./ActionDialog": "ActionDialog",
    "./AlertDialog": "AlertDialog",
    "./BroadcastReceiver": "BroadcastReceiver",
    "./Common.AudioManager": "Common.AudioManager",
    "./Configs": "Configs",
    "./ConfirmDialog": "ConfirmDialog",
    "./Constants": "Constants",
    "./ErrorLogger": "ErrorLogger",
    "./SPUtils": "SPUtils",
    "./SubpackageDownloader": "SubpackageDownloader",
    "./Toast": "Toast"
  } ],
  AuthorizationController: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f2a7fgQCPBHzKbFiGxyZfpB", "AuthorizationController");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.AuthorizationController = exports.LOGIN_SOURCE = void 0;
    const App_1 = require("../../../Game/src/common/App");
    const BroadcastReceiver_1 = require("../../../Game/src/common/BroadcastReceiver");
    const Configs_1 = require("../../../Game/src/common/Configs");
    const ErrorLogger_1 = require("../../../Game/src/common/ErrorLogger");
    const Http_1 = require("../../../Game/src/common/Http");
    const SPUtils_1 = require("../../../Game/src/common/SPUtils");
    const Utils_1 = require("../../../Game/src/common/Utils");
    const MiniGameNetworkClient_1 = require("../../../Game/src/networks/MiniGameNetworkClient");
    const SlotNetworkClient_1 = require("../../../Game/src/networks/SlotNetworkClient");
    const Lobby_Cmd_1 = require("../Lobby.Cmd");
    const Lobby_PopupUpdateNickname_1 = require("../Lobby.PopupUpdateNickname");
    const AuthorizationResponseData_1 = require("./AuthorizationResponseData");
    const Lobby_PopupLogin_1 = require("./Lobby.PopupLogin");
    let FB = window.FB;
    var LOGIN_SOURCE;
    (function(LOGIN_SOURCE) {
      LOGIN_SOURCE["NORMAl"] = "normal";
      LOGIN_SOURCE["PLAY_NOW"] = "dev";
      LOGIN_SOURCE["FACEBOOK"] = "fb";
      LOGIN_SOURCE["APPLE"] = "apple";
      LOGIN_SOURCE["TELEGRAM"] = "telegram";
    })(LOGIN_SOURCE = exports.LOGIN_SOURCE || (exports.LOGIN_SOURCE = {}));
    class AuthorizationController {
      constructor() {
        this.username = "";
        this.password = "";
        this.source = "";
        this.token = "";
        this.telegramAuthData = null;
        this.telegramWebAppAuthData = null;
      }
      static getInstance() {
        null == this.instance && (this.instance = new AuthorizationController());
        return this.instance;
      }
      initFacebookSdk() {
        cc.sys.isBrowser && true && FB.init({
          appId: "3430276357225209",
          autoLogAppEvents: true,
          xfbml: true,
          version: "v17.0"
        });
      }
      autoLogin() {
        if (!Configs_1.default.Login.IsLogin && Configs_1.default.Login.IsAutoLogin && SPUtils_1.default.getUserName().length > 0 && SPUtils_1.default.getUserPass().length > 0) {
          App_1.default.instance.showLoading(true);
          Http_1.default.post(Configs_1.default.App.API + "?c=3", {
            un: SPUtils_1.default.getUserName(),
            pw: md5(SPUtils_1.default.getUserPass()),
            otp: "",
            app_id: Configs_1.default.App.UPDATE_INFO.provider,
            c_v: Configs_1.default.App.UPDATE_INFO.version,
            vt: md5(SPUtils_1.default.getUserName() + "|" + Configs_1.default.App.PRIVATE_KEY)
          }, (err, res) => {
            if (err) {
              App_1.default.instance.showLoading(false);
              ErrorLogger_1.ErrorLogger.sendLogError("Http request error", "Login", JSON.stringify(err));
              return;
            }
            let loginRes = new AuthorizationResponseData_1.LoginResponse(Object.assign(res, {
              error: err
            }));
            this.loginHandler(loginRes, SPUtils_1.default.getUserName(), SPUtils_1.default.getUserPass(), LOGIN_SOURCE.NORMAl);
          });
        }
      }
      loginNormal(username, password, onSuccess = null) {
        App_1.default.instance.showLoading(true);
        this.onSuccess = onSuccess;
        Http_1.default.post(Configs_1.default.App.API + "?c=3", {
          un: username,
          pw: md5(password),
          otp: "",
          app_id: Configs_1.default.App.UPDATE_INFO.provider,
          c_v: Configs_1.default.App.UPDATE_INFO.version,
          vt: md5(username + "|" + Configs_1.default.App.PRIVATE_KEY)
        }, (err, res) => {
          if (err) {
            App_1.default.instance.showLoading(false);
            ErrorLogger_1.ErrorLogger.sendLogError("Http request error", "Login", JSON.stringify(err));
            return;
          }
          let loginRes = new AuthorizationResponseData_1.LoginResponse(Object.assign(res, {
            error: err
          }));
          this.loginHandler(loginRes, username, password, LOGIN_SOURCE.NORMAl);
        });
      }
      loginFacebook(onSuccess) {
        this.onSuccess = onSuccess;
        if (cc.sys.isNative) Utils_1.default.loginFacebook(); else {
          let self = this;
          FB.getLoginStatus(function(response) {
            if ("connected" === response.status) {
              var uid = response.authResponse.userID;
              var accessToken = response.authResponse.accessToken;
              cc.log("accessToken : ", accessToken);
              self.onLoginFacebook(accessToken);
            } else FB.login(function(response) {
              response.authResponse ? FB.api("/me", "get", {
                fields: "name,email,gender,verified,link"
              }, function(response) {
                cc.log("fbID : " + response.id);
                var accessToken = FB.getAuthResponse()["accessToken"];
                cc.log("accessToken : ", accessToken);
                self.onLoginFacebook(accessToken);
              }) : cc.log("User cancelled login or did not fully authorize.");
            });
          });
        }
      }
      onLoginFacebook(token) {
        if (!token) {
          App_1.default.instance.alertDialog.showMsg("\u0110\u0103ng nh\u1eadp kh\xf4ng th\xe0nh c\xf4ng, vui l\xf2ng th\u1eed l\u1ea1i.");
          return;
        }
        App_1.default.instance.showLoading(true);
        Http_1.default.post(Configs_1.default.App.API + "?c=3", {
          at: token,
          s: LOGIN_SOURCE.FACEBOOK,
          app_id: Configs_1.default.App.UPDATE_INFO.provider,
          c_v: Configs_1.default.App.UPDATE_INFO.version
        }, (err, res) => {
          if (err) {
            App_1.default.instance.showLoading(false);
            ErrorLogger_1.ErrorLogger.sendLogError("Http request error", "Login", JSON.stringify(err));
            return;
          }
          let loginRes = new AuthorizationResponseData_1.LoginResponse(Object.assign(res, {
            error: err
          }));
          this.loginHandler(loginRes, "", "", LOGIN_SOURCE.FACEBOOK, token);
        });
      }
      loginWithDeviceId() {
        let deviceId = Utils_1.default.getDeviceId();
        if (!deviceId) {
          App_1.default.instance.alertDialog.showMsg("\u0110\u0103ng nh\u1eadp kh\xf4ng th\xe0nh c\xf4ng vui l\xf2ng th\u1eed l\u1ea1i sau - (id error)");
          return;
        }
        while (deviceId.length <= 10) deviceId += deviceId;
        App_1.default.instance.showLoading(true);
        Http_1.default.post(Configs_1.default.App.API + "?c=3", {
          at: deviceId,
          s: LOGIN_SOURCE.PLAY_NOW,
          app_id: Configs_1.default.App.UPDATE_INFO.provider,
          c_v: Configs_1.default.App.UPDATE_INFO.version
        }, (err, res) => {
          if (err) {
            App_1.default.instance.showLoading(false);
            ErrorLogger_1.ErrorLogger.sendLogError("Http request error", "Login", JSON.stringify(err));
            return;
          }
          let loginRes = new AuthorizationResponseData_1.LoginResponse(Object.assign(res, {
            error: err
          }));
          this.loginHandler(loginRes, "", "", LOGIN_SOURCE.PLAY_NOW, deviceId);
        });
      }
      loginTelegram(telegramAuthData) {
        App_1.default.instance.showLoading(true);
        Http_1.default.post(Configs_1.default.App.API + "?c=3", {
          s: LOGIN_SOURCE.TELEGRAM,
          telegramUser: telegramAuthData,
          app_id: Configs_1.default.App.UPDATE_INFO.provider,
          c_v: Configs_1.default.App.UPDATE_INFO.version
        }, (err, res) => {
          if (err) {
            App_1.default.instance.showLoading(false);
            ErrorLogger_1.ErrorLogger.sendLogError("Http request error", "Login", JSON.stringify(err));
            return;
          }
          let loginRes = new AuthorizationResponseData_1.LoginResponse(Object.assign(res, {
            error: err
          }));
          this.loginHandler(loginRes, "", "", LOGIN_SOURCE.TELEGRAM, "", telegramAuthData);
        });
      }
      loginTelegramWebApp(telegramWebAppAuthData) {
        App_1.default.instance.showLoading(true);
        Http_1.default.post(Configs_1.default.App.API + "?c=3", {
          s: LOGIN_SOURCE.TELEGRAM,
          telegramWebAppUser: telegramWebAppAuthData,
          app_id: Configs_1.default.App.UPDATE_INFO.provider,
          c_v: Configs_1.default.App.UPDATE_INFO.version
        }, (err, res) => {
          if (err) {
            App_1.default.instance.showLoading(false);
            ErrorLogger_1.ErrorLogger.sendLogError("Http request error", "Login", JSON.stringify(err));
            return;
          }
          let loginRes = new AuthorizationResponseData_1.LoginResponse(Object.assign(res, {
            error: err
          }));
          this.loginHandler(loginRes, "", "", LOGIN_SOURCE.TELEGRAM, "", null, telegramWebAppAuthData);
        });
      }
      loginWithOtp(otp, onSuccess = null) {
        App_1.default.instance.showLoading(true);
        this.onSuccess = onSuccess;
        switch (this.source) {
         case LOGIN_SOURCE.NORMAl:
          Http_1.default.post(Configs_1.default.App.API + "?c=3", {
            un: this.username,
            pw: md5(this.password),
            otp: otp,
            app_id: Configs_1.default.App.UPDATE_INFO.provider,
            c_v: Configs_1.default.App.UPDATE_INFO.version,
            vt: md5(this.username + "|" + Configs_1.default.App.PRIVATE_KEY)
          }, (err, res) => {
            if (err) {
              App_1.default.instance.showLoading(false);
              ErrorLogger_1.ErrorLogger.sendLogError("Http request error", "Login", JSON.stringify(err));
              return;
            }
            let loginRes = new AuthorizationResponseData_1.LoginResponse(Object.assign(res, {
              error: err
            }));
            this.loginHandler(loginRes, this.username, this.password, LOGIN_SOURCE.NORMAl);
          });
          break;

         case LOGIN_SOURCE.FACEBOOK:
          Http_1.default.post(Configs_1.default.App.API + "?c=3", {
            at: this.token,
            s: LOGIN_SOURCE.FACEBOOK,
            otp: otp,
            app_id: Configs_1.default.App.UPDATE_INFO.provider,
            c_v: Configs_1.default.App.UPDATE_INFO.version
          }, (err, res) => {
            if (err) {
              App_1.default.instance.showLoading(false);
              ErrorLogger_1.ErrorLogger.sendLogError("Http request error", "Login", JSON.stringify(err));
              return;
            }
            let loginRes = new AuthorizationResponseData_1.LoginResponse(Object.assign(res, {
              error: err
            }));
            this.loginHandler(loginRes, this.username, this.password, LOGIN_SOURCE.FACEBOOK, this.token);
          });
          break;

         case LOGIN_SOURCE.PLAY_NOW:
          Http_1.default.post(Configs_1.default.App.API + "?c=3", {
            at: this.token,
            s: LOGIN_SOURCE.PLAY_NOW,
            otp: otp,
            app_id: Configs_1.default.App.UPDATE_INFO.provider,
            c_v: Configs_1.default.App.UPDATE_INFO.version
          }, (err, res) => {
            if (err) {
              App_1.default.instance.showLoading(false);
              ErrorLogger_1.ErrorLogger.sendLogError("Http request error", "Login", JSON.stringify(err));
              return;
            }
            let loginRes = new AuthorizationResponseData_1.LoginResponse(Object.assign(res, {
              error: err
            }));
            this.loginHandler(loginRes, this.username, this.password, LOGIN_SOURCE.PLAY_NOW, this.token);
          });
          break;

         case LOGIN_SOURCE.TELEGRAM:
          Http_1.default.post(Configs_1.default.App.API + "?c=3", {
            s: LOGIN_SOURCE.TELEGRAM,
            telegramUser: this.telegramAuthData,
            telegramWebAppUser: this.telegramWebAppAuthData,
            otp: otp,
            app_id: Configs_1.default.App.UPDATE_INFO.provider,
            c_v: Configs_1.default.App.UPDATE_INFO.version
          }, (err, res) => {
            if (err) {
              App_1.default.instance.showLoading(false);
              ErrorLogger_1.ErrorLogger.sendLogError("Http request error", "Login", JSON.stringify(err));
              return;
            }
            let loginRes = new AuthorizationResponseData_1.LoginResponse(Object.assign(res, {
              error: err
            }));
            this.loginHandler(loginRes, this.username, this.password, LOGIN_SOURCE.TELEGRAM, this.token, this.telegramAuthData, this.telegramWebAppAuthData);
          });
        }
      }
      loginHandler(loginRes, username, password = null, source, token = null, telegramAuthData = null, telegramWebAppAuthData = null) {
        App_1.default.instance.showLoading(false);
        this.username = username;
        this.password = password;
        this.source = source;
        this.token = token;
        this.telegramAuthData = telegramAuthData;
        this.telegramWebAppAuthData = telegramWebAppAuthData;
        if (null != loginRes.error) {
          App_1.default.instance.alertDialog.showMsg("\u0110\u0103ng nh\u1eadp kh\xf4ng th\xe0nh c\xf4ng, vui l\xf2ng ki\u1ec3m tra l\u1ea1i k\u1ebft n\u1ed1i.");
          return;
        }
        cc.log(JSON.stringify(loginRes));
        switch (parseInt(loginRes.errorCode)) {
         case 0:
          Configs_1.default.Login.initialize(loginRes, source);
          switch (Configs_1.default.Login.socialSource) {
           case LOGIN_SOURCE.NORMAl:
            Configs_1.default.Login.Password = password;
            break;

           default:
            Configs_1.default.Login.Password = "";
          }
          MiniGameNetworkClient_1.default.getInstance().sendCheck(new Lobby_Cmd_1.default.ReqSubcribeJackpots());
          SlotNetworkClient_1.default.getInstance().sendCheck(new Lobby_Cmd_1.default.ReqSubcribeHallSlot());
          BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_INFO_UPDATED);
          SPUtils_1.default.setUserName(Configs_1.default.Login.Username);
          SPUtils_1.default.setUserPass(Configs_1.default.Login.Password);
          App_1.default.instance.buttonMiniGame.show();
          App_1.default.instance.lobby.loginCallback();
          this.onSuccess && this.onSuccess();
          break;

         case 1012:
          Lobby_PopupLogin_1.default.createAndShow(App_1.default.instance.popups, true);
          break;

         case 2001:
          switch (source) {
           case LOGIN_SOURCE.NORMAl:
            Lobby_PopupUpdateNickname_1.default.createAndShow(App_1.default.instance.popups, username, password, source);
            break;

           case LOGIN_SOURCE.FACEBOOK:
           case LOGIN_SOURCE.PLAY_NOW:
           case LOGIN_SOURCE.TELEGRAM:
            Lobby_PopupUpdateNickname_1.default.createAndShow(App_1.default.instance.popups, "", "", source, token, telegramAuthData, telegramWebAppAuthData);
          }
          break;

         default:
          App_1.default.instance.alertDialog.showMsg(loginRes.desc || "\u0110\u0103ng nh\u1eadp kh\xf4ng th\xe0nh c\xf4ng vui l\xf2ng th\u1eed l\u1ea1i sau.");
        }
      }
      onUpdateNicknameSuccess(username, password, source = null, token = null, telegramAuthData = null, telegramWebAppAuthData = null) {
        switch (source) {
         case LOGIN_SOURCE.NORMAl:
          this.loginNormal(username, password);
          break;

         case LOGIN_SOURCE.FACEBOOK:
          this.onLoginFacebook(token);
          break;

         case LOGIN_SOURCE.PLAY_NOW:
          this.loginWithDeviceId();
          break;

         case LOGIN_SOURCE.TELEGRAM:
          telegramAuthData ? this.loginTelegram(telegramAuthData) : telegramWebAppAuthData && this.loginTelegramWebApp(telegramWebAppAuthData);
        }
      }
    }
    exports.AuthorizationController = AuthorizationController;
    AuthorizationController.instance = null;
    cc._RF.pop();
  }, {
    "../../../Game/src/common/App": "App",
    "../../../Game/src/common/BroadcastReceiver": "BroadcastReceiver",
    "../../../Game/src/common/Configs": "Configs",
    "../../../Game/src/common/ErrorLogger": "ErrorLogger",
    "../../../Game/src/common/Http": "Http",
    "../../../Game/src/common/SPUtils": "SPUtils",
    "../../../Game/src/common/Utils": "Utils",
    "../../../Game/src/networks/MiniGameNetworkClient": "MiniGameNetworkClient",
    "../../../Game/src/networks/SlotNetworkClient": "SlotNetworkClient",
    "../Lobby.Cmd": "Lobby.Cmd",
    "../Lobby.PopupUpdateNickname": "Lobby.PopupUpdateNickname",
    "./AuthorizationResponseData": "AuthorizationResponseData",
    "./Lobby.PopupLogin": "Lobby.PopupLogin"
  } ],
  AuthorizationResponseData: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0b8a35DGf9C7pUbwB/b0mZE", "AuthorizationResponseData");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.LoginResponse = exports.UserVippointRewards = exports.SecurityPublicAttributes = exports.SecurityUserSettings = exports.UserInfoResponse = void 0;
    class UserInfoResponse {
      constructor(params) {
        var _a;
        this.success = null === params || void 0 === params ? void 0 : params.success;
        this.errorCode = null === params || void 0 === params ? void 0 : params.errorCode;
        this.desc = null === params || void 0 === params ? void 0 : params.desc;
        this.appSecure = null === params || void 0 === params ? void 0 : params.appSecure;
        this.cmt = null === params || void 0 === params ? void 0 : params.cmt;
        this.configGame = null === params || void 0 === params ? void 0 : params.configGame;
        this.email = null === params || void 0 === params ? void 0 : params.email;
        this.emailSecure = null === params || void 0 === params ? void 0 : params.emailSecure;
        this.loginSecure = null === params || void 0 === params ? void 0 : params.loginSecure;
        this.mobile = null === params || void 0 === params ? void 0 : params.mobile;
        this.mobileSecure = null === params || void 0 === params ? void 0 : params.mobileSecure;
        this.moneyLoginotp = null === params || void 0 === params ? void 0 : params.moneyLoginotp;
        this.moneyUse = null === params || void 0 === params ? void 0 : params.moneyUse;
        this.safe = null === params || void 0 === params ? void 0 : params.safe;
        this.username = null === params || void 0 === params ? void 0 : params.username;
        this.userSettings = new SecurityUserSettings(null === params || void 0 === params ? void 0 : params.userSettings);
        this.userVippointRewards = [];
        null === (_a = null === params || void 0 === params ? void 0 : params.userVippointRewards) || void 0 === _a ? void 0 : _a.forEach(reward => this.userVippointRewards.push(new UserVippointRewards(reward)));
      }
    }
    exports.UserInfoResponse = UserInfoResponse;
    class SecurityUserSettings {
      constructor(params) {
        this.publicAttributes = new SecurityPublicAttributes(null === params || void 0 === params ? void 0 : params.publicAttributes);
      }
    }
    exports.SecurityUserSettings = SecurityUserSettings;
    class SecurityPublicAttributes {
      constructor(params) {
        this.autoApproveCashout = null === params || void 0 === params ? void 0 : params.AUTO_APPROVE_CASHOUT;
        this.isLoginOtp = null === params || void 0 === params ? void 0 : params.IS_LOGIN_OTP;
      }
    }
    exports.SecurityPublicAttributes = SecurityPublicAttributes;
    class UserVippointRewards {
      constructor(params) {
        this.createTime = null === params || void 0 === params ? void 0 : params.createTime;
        this.id = null === params || void 0 === params ? void 0 : params.id;
        this.nickName = null === params || void 0 === params ? void 0 : params.nickName;
        this.rewardName = null === params || void 0 === params ? void 0 : params.rewardName;
        this.rewardDesc = null === params || void 0 === params ? void 0 : params.rewardDesc;
        this.rewardValue = null === params || void 0 === params ? void 0 : params.rewardValue;
      }
    }
    exports.UserVippointRewards = UserVippointRewards;
    class LoginResponse {
      constructor(params) {
        this.error = null === params || void 0 === params ? void 0 : params.error;
        this.accessToken = null === params || void 0 === params ? void 0 : params.accessToken;
        this.avatar = null === params || void 0 === params ? void 0 : params.avatar;
        this.desc = null === params || void 0 === params ? void 0 : params.desc;
        this.errorCode = null === params || void 0 === params ? void 0 : params.errorCode;
        this.sessionKey = null === params || void 0 === params ? void 0 : params.sessionKey;
        this.success = null === params || void 0 === params ? void 0 : params.success;
        this.username = null === params || void 0 === params ? void 0 : params.username;
      }
    }
    exports.LoginResponse = LoginResponse;
    cc._RF.pop();
  }, {} ],
  BgResizer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cbf1dlYiXRG35Ei6K+I4cFm", "BgResizer");
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
    let BgResizer = class BgResizer extends cc.Component {
      constructor() {
        super(...arguments);
        this.designResolution = new cc.Size(720, 1280);
        this.lastWitdh = 0;
        this.lastHeight = 0;
      }
      start() {
        this.updateSize();
      }
      update(dt) {
        cc.sys.isBrowser && false;
      }
      updateSize() {
        var frameSize = cc.view.getFrameSize();
        if (this.lastWitdh !== frameSize.width || this.lastHeight !== frameSize.height) {
          this.lastWitdh = frameSize.width;
          this.lastHeight = frameSize.height;
          if (this.designResolution.width / this.designResolution.height > frameSize.width / frameSize.height) {
            var height = this.designResolution.width * frameSize.height / frameSize.width;
            var width = height * this.designResolution.width / this.designResolution.height;
            var newDesignSize = cc.size(width, height);
            this.node.setContentSize(newDesignSize);
          } else {
            var width = this.designResolution.height * frameSize.width / frameSize.height;
            var height = width * this.designResolution.height / this.designResolution.width;
            var newDesignSize = cc.size(width, height);
            var newDesignSize = cc.size(width, height);
            this.node.setContentSize(newDesignSize);
          }
        }
      }
    };
    __decorate([ property ], BgResizer.prototype, "designResolution", void 0);
    BgResizer = __decorate([ ccclass ], BgResizer);
    exports.default = BgResizer;
    cc._RF.pop();
  }, {} ],
  BroadcastReceiver: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8831e6G+6NKPKJ3bcB/6OEn", "BroadcastReceiver");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const ErrorLogger_1 = require("./ErrorLogger");
    var common;
    (function(common) {
      class BroadcastListener {
        constructor(action, callback, target) {
          this.action = action;
          this.target = target;
          this.callback = callback;
        }
      }
      common.BroadcastListener = BroadcastListener;
      class BroadcastReceiver {
        static register(action, callback, target) {
          this.listeners.push(new BroadcastListener(action, callback, target));
        }
        static unRegisterByAction(action) {
          for (var i = 0; i < this.listeners.length; i++) this.listeners[i].action == action && this.listeners.splice(i--, 1);
        }
        static unRegisterByTarget(target) {
          for (var i = 0; i < this.listeners.length; i++) this.listeners[i].target == target && this.listeners.splice(i--, 1);
        }
        static send(action, data = null) {
          try {
            for (var i = 0; i < this.listeners.length; i++) {
              let listener = this.listeners[i];
              listener.action == action && (listener.target && listener.target instanceof Object && listener.target.node ? listener.callback(data) : this.listeners.splice(i--, 1));
            }
          } catch (error) {
            ErrorLogger_1.ErrorLogger.sendLogError("Object error", "BroadcastReceiver", action + "\n" + JSON.stringify(error.stack));
          }
        }
      }
      BroadcastReceiver.UPDATE_NICKNAME_SUCCESS = "UPDATE_NICKNAME_SUCCESS";
      BroadcastReceiver.LOGINED = "LOGINED";
      BroadcastReceiver.USER_INFO_UPDATED = "USER_INFO_UPDATED";
      BroadcastReceiver.USER_LOGOUT = "USER_LOGOUT";
      BroadcastReceiver.USER_UPDATE_COIN = "USER_UPDATE_COIN";
      BroadcastReceiver.ON_AUDIO_CHANGED = "ON_AUDIO_CHANGED";
      BroadcastReceiver.ON_SHOW_ANIM_CHANGED = "ON_SHOW_ANIM_CHANGED";
      BroadcastReceiver.SET_SOUND = "SET_SOUND";
      BroadcastReceiver.UPDATE_MAIL_COUNT = "UPDATE_MAIL_COUNT";
      BroadcastReceiver.USER_VIP_UPDATED = "USER_VIP_UPDATED";
      BroadcastReceiver.USER_DISCONNECTED = "USER_DISCONNECTED";
      BroadcastReceiver.SLOT_WS_SEND = "SLOT_WS_SEND";
      BroadcastReceiver.X3_DEPOSIT = "X3_DEPOSIT";
      BroadcastReceiver.listeners = new Array();
      common.BroadcastReceiver = BroadcastReceiver;
    })(common || (common = {}));
    exports.default = common.BroadcastReceiver;
    cc._RF.pop();
  }, {
    "./ErrorLogger": "ErrorLogger"
  } ],
  ButtonMiniGame: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "43933Wy759F+qsbqvxc3BMb", "ButtonMiniGame");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const MiniGameNetworkClient_1 = require("../../Game/src/networks/MiniGameNetworkClient");
    const Network_InPacket_1 = require("../../Game/src/networks/Network.InPacket");
    const App_1 = require("../../Game/src/common/App");
    const Lobby_Cmd_1 = require("./Lobby.Cmd");
    const Network_Cmd_1 = require("../../Game/src/networks/Network.Cmd");
    const TXMD5NetworkClient_1 = require("../../Game/src/networks/TXMD5NetworkClient");
    const BroadcastReceiver_1 = require("../../Game/src/common/BroadcastReceiver");
    const Constants_1 = require("../../Game/src/common/Constants");
    const Configs_1 = require("../../Game/src/common/Configs");
    const AuthorizationController_1 = require("./Authorization/AuthorizationController");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let ButtonMiniGame = class ButtonMiniGame extends cc.Component {
      constructor() {
        super(...arguments);
        this.labelTime = null;
        this.button = null;
        this.panel = null;
        this.taiNode = null;
        this.xiuNode = null;
        this.buttonClicked = true;
        this.buttonMoved = cc.Vec2.ZERO;
      }
      start() {
        this.panel.parent.active = false;
        this.button.active = false;
        this.labelTime.string = "00";
        this.button.on(cc.Node.EventType.TOUCH_START, event => {
          this.buttonClicked = true;
          this.buttonMoved = cc.Vec2.ZERO;
        }, this);
        this.button.on(cc.Node.EventType.TOUCH_MOVE, event => {
          this.buttonMoved = this.buttonMoved.add(event.getDelta());
          if (this.buttonClicked) {
            if (Math.abs(this.buttonMoved.x) > 30 || Math.abs(this.buttonMoved.y) > 30) {
              let pos = this.button.position;
              pos.x += this.buttonMoved.x;
              pos.y += this.buttonMoved.y;
              this.button.position = pos;
              this.buttonClicked = false;
            }
          } else {
            let pos = this.button.position;
            pos.x += event.getDeltaX();
            pos.y += event.getDeltaY();
            this.button.position = pos;
          }
        }, this);
        this.button.on(cc.Node.EventType.TOUCH_END, event => {
          this.buttonClicked && this.actButton();
        }, this);
        MiniGameNetworkClient_1.default.getInstance().addListener(data => {
          let inpacket = new Network_InPacket_1.default(data);
          switch (inpacket.getCmdId()) {
           case Lobby_Cmd_1.default.TxCode.UPDATE_TIME:
            {
              let res = new Lobby_Cmd_1.default.ReceiveUpdateTime(data);
              this.labelTime.string = res.remainTime > 9 ? res.remainTime.toString() : "0" + res.remainTime;
              if (res.bettingState) {
                this.xiuNode.stopAllActions();
                this.taiNode.active = false;
                this.taiNode.stopAllActions();
                this.xiuNode.active = false;
              }
            }
            break;

           case Lobby_Cmd_1.default.TxCode.DICES_RESULT:
            {
              let res = new Lobby_Cmd_1.default.ReceiveDicesResult(data);
              var lastScore = res.dice1 + res.dice2 + res.dice3;
              if (lastScore < 11) {
                this.xiuNode.active = true;
                this.xiuNode.stopAllActions();
                this.xiuNode.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(.2, 1.1), cc.scaleTo(.2, .9))));
                this.taiNode.active = false;
              } else {
                this.taiNode.active = true;
                this.taiNode.stopAllActions();
                this.taiNode.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(.2, 1.1), cc.scaleTo(.2, .9))));
                this.xiuNode.active = false;
              }
            }
            break;

           case Network_Cmd_1.default.Code.NOTIFY_DISCONNECT:
            {
              let res = new Network_Cmd_1.default.ReceivedNotifyDisconnect(data);
              cc.log(res);
              Configs_1.default.Login.clear(true);
              App_1.default.instance.actiontDialog.forceDismiss();
              App_1.default.instance.alertDialog.dismiss();
              App_1.default.instance.confirmDialog.dismiss();
              App_1.default.instance.popups.children.forEach(popup => popup.active = false);
              BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_DISCONNECTED);
              this.scheduleOnce(() => {
                switch (res.reason) {
                 case Constants_1.Network.DisconnectReason.IDLE:
                 case Constants_1.Network.DisconnectReason.UNKNOWN:
                 case Constants_1.Network.DisconnectReason.HANDSHAKE:
                  {
                    let msg = "T\xe0i kho\u1ea3n c\u1ee7a b\u1ea1n b\u1ecb ng\u1eaft k\u1ebft n\u1ed1i!";
                    App_1.default.instance.actiontDialog.showMsgWithAction(msg, "Th\u1eed l\u1ea1i", () => {
                      AuthorizationController_1.AuthorizationController.getInstance().autoLogin();
                    });
                  }
                  break;

                 case Constants_1.Network.DisconnectReason.KICK:
                  {
                    let msg = "T\xe0i kho\u1ea3n c\u1ee7a b\u1ea1n b\u1ecb kick ra ngo\xe0i! Vui l\xf2ng li\xean h\u1ec7 CSKH.";
                    Configs_1.default.App.TELE_SUPPORT ? App_1.default.instance.actiontDialog.showMsgWithAction(msg, Constants_1.UserActions.toName(Constants_1.UserActions.ENUM.TELE_SUPPORT), () => {
                      App_1.default.instance.navigateByAction(Constants_1.UserActions.ENUM.TELE_SUPPORT);
                    }) : App_1.default.instance.alertDialog.showMsg(msg);
                  }
                  break;

                 case Constants_1.Network.DisconnectReason.BAN:
                  {
                    let msg = "T\xe0i kho\u1ea3n c\u1ee7a b\u1ea1n b\u1ecb kh\xf3a! Vui l\xf2ng li\xean h\u1ec7 CSKH.";
                    Configs_1.default.App.TELE_SUPPORT ? App_1.default.instance.actiontDialog.showMsgWithAction(msg, Constants_1.UserActions.toName(Constants_1.UserActions.ENUM.TELE_SUPPORT), () => {
                      App_1.default.instance.navigateByAction(Constants_1.UserActions.ENUM.TELE_SUPPORT);
                    }) : App_1.default.instance.alertDialog.showMsg(msg);
                  }
                  break;

                 case Constants_1.Network.DisconnectReason.LOGIN:
                  {
                    let msg = "T\xe0i kho\u1ea3n c\u1ee7a b\u1ea1n \u0111\u01b0\u1ee3c \u0111\u0103ng nh\u1eadp tr\xean m\u1ed9t thi\u1ebft b\u1ecb kh\xe1c!";
                    App_1.default.instance.alertDialog.showMsg(msg);
                  }
                }
              }, 2);
            }
          }
        }, this);
        MiniGameNetworkClient_1.default.getInstance().send(new Lobby_Cmd_1.default.SendScribe());
        TXMD5NetworkClient_1.default.getInstance().send(new Lobby_Cmd_1.default.SendScribe());
        for (let i = 0; i < this.panel.childrenCount; i++) {
          let btnMini = this.panel.children[i];
          btnMini.stopAllActions();
          btnMini.active && btnMini.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(.2, 1), cc.scaleTo(.2, .9))));
        }
      }
      show() {
        this.panel.parent.active = false;
        this.button.active = true;
        this.labelTime.string = "00";
      }
      hidden() {
        this.panel.parent.active = false;
        this.button.active = false;
      }
      actButton() {
        this.panel.parent.active = true;
        this.panel.stopAllActions();
        this.panel.setScale(1, 0);
        this.panel.runAction(cc.sequence(cc.callFunc(() => {
          this.button.getComponent(cc.Sprite).enabled = false;
        }), cc.scaleTo(.3, 1, 1).easing(cc.easeBackOut())));
      }
      actHidden() {
        this.panel.stopAllActions();
        this.panel.runAction(cc.sequence(cc.callFunc(() => {}), cc.scaleTo(.3, 1, 0).easing(cc.easeBackIn()), cc.callFunc(() => {
          this.button.getComponent(cc.Sprite).enabled = true;
          this.panel.parent.active = false;
        })));
      }
      actTaiXiu() {
        App_1.default.instance.openGameTaiXiuMini();
        this.actHidden();
      }
      actTaiXiuMD5() {
        App_1.default.instance.openGameTaiXiuMD5();
        this.actHidden();
      }
      actMiniPoker() {
        App_1.default.instance.openGameMiniPoker();
        this.actHidden();
      }
      actPokerGo() {
        App_1.default.instance.openGamePokerGo();
        this.actHidden();
      }
      actCaoThap() {
        App_1.default.instance.openGameCaoThap();
        this.actHidden();
      }
      actBauCua() {
        App_1.default.instance.openGameBauCua();
        this.actHidden();
      }
      actChimDien() {
        App_1.default.instance.alertDialog.showMsg("Game s\u1eafp ra m\u1eaft.");
        this.actHidden();
      }
      actOanTuTi() {
        App_1.default.instance.openGameOanTuTi();
        this.actHidden();
      }
    };
    __decorate([ property(cc.Label) ], ButtonMiniGame.prototype, "labelTime", void 0);
    __decorate([ property(cc.Node) ], ButtonMiniGame.prototype, "button", void 0);
    __decorate([ property(cc.Node) ], ButtonMiniGame.prototype, "panel", void 0);
    __decorate([ property(cc.Node) ], ButtonMiniGame.prototype, "taiNode", void 0);
    __decorate([ property(cc.Node) ], ButtonMiniGame.prototype, "xiuNode", void 0);
    ButtonMiniGame = __decorate([ ccclass ], ButtonMiniGame);
    exports.default = ButtonMiniGame;
    cc._RF.pop();
  }, {
    "../../Game/src/common/App": "App",
    "../../Game/src/common/BroadcastReceiver": "BroadcastReceiver",
    "../../Game/src/common/Configs": "Configs",
    "../../Game/src/common/Constants": "Constants",
    "../../Game/src/networks/MiniGameNetworkClient": "MiniGameNetworkClient",
    "../../Game/src/networks/Network.Cmd": "Network.Cmd",
    "../../Game/src/networks/Network.InPacket": "Network.InPacket",
    "../../Game/src/networks/TXMD5NetworkClient": "TXMD5NetworkClient",
    "./Authorization/AuthorizationController": "AuthorizationController",
    "./Lobby.Cmd": "Lobby.Cmd"
  } ],
  CanvasResizer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2a33dcxF+NBW6IzkrkZ/0RB", "CanvasResizer");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const {ccclass: ccclass, property: property, requireComponent: requireComponent} = cc._decorator;
    let CanvasResizer = class CanvasResizer extends cc.Component {
      constructor() {
        super(...arguments);
        this.designResolution = new cc.Size(720, 1280);
        this.lastWitdh = 0;
        this.lastHeight = 0;
      }
      onLoad() {
        this.canvas = this.node.getComponent(cc.Canvas);
        this.updateCanvas();
      }
      update(dt) {
        cc.sys.isBrowser && false;
      }
      updateCanvas() {
        var frameSize = cc.view.getFrameSize();
        if (this.lastWitdh !== frameSize.width || this.lastHeight !== frameSize.height) {
          this.lastWitdh = frameSize.width;
          this.lastHeight = frameSize.height;
          if (this.designResolution.width / this.designResolution.height > frameSize.width / frameSize.height) {
            var newDesignSize = cc.size(this.designResolution.width, this.designResolution.width * (frameSize.height / frameSize.width));
            this.canvas.designResolution = newDesignSize;
          } else {
            var newDesignSize = cc.size(this.designResolution.height * (frameSize.width / frameSize.height), this.designResolution.height);
            this.canvas.designResolution = newDesignSize;
          }
        }
      }
    };
    __decorate([ property ], CanvasResizer.prototype, "designResolution", void 0);
    CanvasResizer = __decorate([ ccclass, requireComponent(cc.Canvas) ], CanvasResizer);
    exports.default = CanvasResizer;
    cc._RF.pop();
  }, {} ],
  "CardGame.Cmd": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a7c6afh+XBMeoI7bhZgC4XY", "CardGame.Cmd");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.CardGameCmd = void 0;
    const Network_OutPacket_1 = require("./Network.OutPacket");
    const Network_InPacket_1 = require("./Network.InPacket");
    const {ccclass: ccclass} = cc._decorator;
    var CardGameCmd;
    (function(CardGameCmd) {
      class Code {}
      Code.LOGIN = 1;
      Code.NOTIFY_DISCONNECT = 37;
      Code.PING_PONG = 50;
      Code.TOP_SERVER = 1001;
      Code.PING_TEST = 1050;
      Code.JOIN_ROOM = 3001;
      Code.RECONNECT_GAME_ROOM = 3002;
      Code.MONEY_BET_CONFIG = 3003;
      Code.JOIN_ROOM_FAIL = 3004;
      Code.NO_HU_VANG = 3007;
      Code.CHAT_ROOM = 3008;
      Code.THONG_TIN_HU_VANG = 3009;
      Code.REQUEST_INFO_MOI_CHOI = 3010;
      Code.MOI_CHOI = 3011;
      Code.ACCEPT_MOI_CHOI = 3012;
      Code.CREATE_ROOM = 3013;
      Code.GET_LIST_ROOM = 3014;
      Code.JOIN_GAME_ROOM_BY_ID = 3015;
      Code.FIND_ROOM_LOBBY = 3016;
      Code.GET_XOCDIA_CONFIG = 3017;
      Code.CREATE_ROOM_FAIL = 3018;
      Code.CHEAT_CARDS = 3115;
      Code.HOLD = 3116;
      CardGameCmd.Code = Code;
      class CardDefination {
        constructor(card) {
          this.id = null === card || void 0 === card ? void 0 : card.ID;
          this.name = null === card || void 0 === card ? void 0 : card.name;
          this.number = null === card || void 0 === card ? void 0 : card.SO;
          this.suit = null === card || void 0 === card ? void 0 : card.CHAT;
        }
      }
      CardGameCmd.CardDefination = CardDefination;
      class SendMoneyBetConfig extends Network_OutPacket_1.default {
        constructor() {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.MONEY_BET_CONFIG);
          this.packHeader();
          this.updateSize();
        }
      }
      CardGameCmd.SendMoneyBetConfig = SendMoneyBetConfig;
      class ResMoneyBetConfig extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.list = [];
          this.rules = [];
          let listSize = this.getShort();
          for (var a = 0; a < listSize; a++) {
            var b = {
              maxUserPerRoom: this.getInt(),
              moneyType: this.getByte(),
              moneyBet: this.getLong(),
              moneyRequire: this.getLong(),
              nPersion: this.getInt()
            };
            this.list.push(b);
          }
          for (a = 0; a < listSize; a++) this.rules.push(this.getByte());
        }
      }
      CardGameCmd.ResMoneyBetConfig = ResMoneyBetConfig;
      class SendGetListRoom extends Network_OutPacket_1.default {
        constructor(moneyType, maxPlayer, param3, param4, cardFrom, cardTo) {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.GET_LIST_ROOM);
          this.packHeader();
          this.putByte(moneyType);
          this.putByte(maxPlayer);
          this.putByte(param3);
          this.putByte(param4);
          this.putByte(cardFrom);
          this.putByte(cardTo);
          this.updateSize();
        }
      }
      CardGameCmd.SendGetListRoom = SendGetListRoom;
      class SendJoinRoom extends Network_OutPacket_1.default {
        constructor(type, max, bet, rule) {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.JOIN_ROOM);
          this.packHeader();
          this.putInt(type);
          this.putInt(max);
          this.putLong(bet);
          this.putInt(rule);
          this.updateSize();
        }
      }
      CardGameCmd.SendJoinRoom = SendJoinRoom;
      class ReceivedJoinRoomFail extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.error = 0;
          this.error = this.getError();
        }
      }
      CardGameCmd.ReceivedJoinRoomFail = ReceivedJoinRoomFail;
    })(CardGameCmd = exports.CardGameCmd || (exports.CardGameCmd = {}));
    exports.default = CardGameCmd;
    cc._RF.pop();
  }, {
    "./Network.InPacket": "Network.InPacket",
    "./Network.OutPacket": "Network.OutPacket"
  } ],
  CardGameNetworkClient: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bb718MKBZ5MFrCvutTYb1Eh", "CardGameNetworkClient");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Network_NetworkClient_1 = require("./Network.NetworkClient");
    const Network_NetworkListener_1 = require("./Network.NetworkListener");
    const Configs_1 = require("../common/Configs");
    const Network_InPacket_1 = require("./Network.InPacket");
    const Network_Cmd_1 = require("./Network.Cmd");
    class CardGameNetworkClient extends Network_NetworkClient_1.default {
      constructor() {
        super();
        this.listeners = new Array();
        this.isLogin = false;
        this.autoReconnectCount = 0;
        this.onLogined = null;
        this.isUseWSS = Configs_1.default.App.USE_WSS;
        this.isAutoReconnect = Configs_1.default.App.AUTO_RECONNECT;
      }
      static getInstance() {
        null == this.instance && (this.instance = new CardGameNetworkClient());
        return this.instance;
      }
      checkConnect(onLogined) {
        this.onLogined = onLogined;
        if (null != this.ws && this.ws.readyState == WebSocket.CONNECTING) return;
        if (!this.isConnected()) {
          this._connect();
          return;
        }
        this.isLogin && null != this.onLogined && this.onLogined();
      }
      _connect() {
        cc.log("start connect card game");
      }
      onOpen(ev) {
        super.onOpen(ev);
        this.send(new Network_Cmd_1.default.SendLogin(Configs_1.default.Login.Nickname, Configs_1.default.Login.AccessToken));
        this.autoReconnectCount = 0;
      }
      onMessage(ev) {
        var data = new Uint8Array(ev.data);
        for (var i = 0; i < this.listeners.length; i++) {
          var listener = this.listeners[i];
          if (listener.target && listener.target instanceof Object && listener.target.node) listener.callback(data); else {
            this.listeners.splice(i, 1);
            i--;
          }
        }
        let inpacket = new Network_InPacket_1.default(data);
        switch (inpacket.getCmdId()) {
         case Network_Cmd_1.default.Code.LOGIN:
          this.isLogin = true;
          if (null != this.onLogined) {
            this.onLogined();
            this.onLogined = null;
          }
        }
      }
      addListener(callback, target) {
        this.listeners.push(new Network_NetworkListener_1.default(target, callback));
      }
      send(packet) {
        if (0 === packet._cmdId) return;
        for (var b = new Int8Array(packet._length), c = 0; c < packet._length; c++) b[c] = packet._data[c];
        null != this.ws && this.isConnected() && this.ws.send(b.buffer);
      }
      sendCheck(packet) {
        this.checkConnect(() => {
          this.send(packet);
        });
      }
      setLoginCallback(onLogined) {
        this.onLogined = onLogined;
        this.autoReconnectCount++;
      }
      setForceClose(isForceClose) {
        this.isForceClose = isForceClose;
        this.autoReconnectCount = 0;
      }
      shouldAutoReconnect() {
        return this.autoReconnectCount < 5;
      }
    }
    exports.default = CardGameNetworkClient;
    cc._RF.pop();
  }, {
    "../common/Configs": "Configs",
    "./Network.Cmd": "Network.Cmd",
    "./Network.InPacket": "Network.InPacket",
    "./Network.NetworkClient": "Network.NetworkClient",
    "./Network.NetworkListener": "Network.NetworkListener"
  } ],
  CardGameUtils: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "aaee5+Mi4xE4pZz1s/+rF3h", "CardGameUtils");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.CardGameUtils = void 0;
    class CardGameUtils {
      static getCardCheatIdsFromChat(cardDefinations, chatContent) {
        let chatContentLowerCase = chatContent.toLowerCase().replace(/\s/g, "");
        if (!chatContentLowerCase.includes("##cheat") || !cardDefinations) return null;
        let cardCheatIds = [];
        let cardName = "";
        let cardNames = chatContentLowerCase.replace("##cheat", "");
        for (let i = 0; i < cardNames.length; i++) {
          let char = cardNames[i];
          cardName += char;
          if (this.SUITS.indexOf(char) > -1) {
            cc.log(cardName);
            cardCheatIds.push(cardDefinations.find(card => card.name.toLowerCase() === cardName).id);
            cardName = "";
          }
        }
        cc.log(cardCheatIds);
        return cardCheatIds;
      }
    }
    exports.CardGameUtils = CardGameUtils;
    CardGameUtils.SUITS = [ "c", "r", "t", "b" ];
    exports.default = CardGameUtils;
    cc._RF.pop();
  }, {} ],
  "Common.AudioManager": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "dd656ny0zpC6q+M7t8zKmpW", "Common.AudioManager");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var AudioManager_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const BroadcastReceiver_1 = require("./BroadcastReceiver");
    const SPUtils_1 = require("./SPUtils");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let AudioManager = AudioManager_1 = class AudioManager extends cc.Component {
      constructor() {
        super(...arguments);
        this.audioSource = null;
        this.isOnMusic = true;
        this.isOnSound = true;
      }
      static getInstance() {
        if (null == this.instance) {
          let node = new cc.Node("AudioManager");
          this.instance = node.addComponent(AudioManager_1);
          this.instance.audioSource = node.addComponent(cc.AudioSource);
          cc.game.addPersistRootNode(node);
        }
        return this.instance;
      }
      start() {
        BroadcastReceiver_1.default.register(BroadcastReceiver_1.default.ON_AUDIO_CHANGED, game => {
          this.isOnMusic = SPUtils_1.default.getMusicVolumn() > 0;
          this.isOnSound = SPUtils_1.default.getSoundVolumn() > 0;
          this.audioSource.mute = !this.isOnMusic || !(SPUtils_1.default.getMusicVolumnByGame(game) > 0);
        }, this);
        this.isOnMusic = SPUtils_1.default.getMusicVolumn() > 0;
        this.isOnSound = SPUtils_1.default.getSoundVolumn() > 0;
        this.audioSource.mute = !this.isOnMusic;
      }
      playEffect(audioClip, volumn = 1) {
        if (null == audioClip) {
          cc.warn("AudioManager playEffect audioClip is null");
          return;
        }
        this.isOnSound && volumn > 0 && cc.audioEngine.play(audioClip, false, volumn);
      }
      playBackgroundMusic(audioClip, loop = true, volumn = 1) {
        if (null == audioClip) {
          cc.warn("AudioManager playBackgroundMusic audioClip is null");
          return;
        }
        this.audioSource.stop();
        this.audioSource.clip = audioClip;
        this.audioSource.volume = volumn;
        this.audioSource.mute = !this.isOnMusic;
        this.audioSource.loop = loop;
        this.audioSource.play();
      }
      playEffectByGame(game, audioClip, volumn = 1) {
        if (null == audioClip) {
          cc.warn("AudioManager playEffect audioClip is null");
          return;
        }
        if (SPUtils_1.default.getSoundVolumnByGame(game) > 0 && volumn > 0) return cc.audioEngine.play(audioClip, false, volumn);
      }
      playBackgroundMusicByGame(game, audioClip, loop = true, volumn = 1) {
        if (null == audioClip) {
          cc.warn("AudioManager playBackgroundMusic audioClip is null");
          return;
        }
        this.audioSource.stop();
        this.audioSource.clip = audioClip;
        this.audioSource.volume = volumn;
        this.audioSource.mute = !(SPUtils_1.default.getMusicVolumnByGame(game) > 0);
        this.audioSource.loop = loop;
        this.audioSource.play();
      }
      pauseAudio() {
        this.audioSource.stop();
        cc.audioEngine.pauseMusic();
        cc.audioEngine.pauseAllEffects();
      }
      resumeAudio() {
        this.audioSource.play();
        cc.audioEngine.resumeMusic();
        cc.audioEngine.resumeAllEffects();
      }
    };
    AudioManager.instance = null;
    AudioManager = AudioManager_1 = __decorate([ ccclass ], AudioManager);
    exports.default = AudioManager;
    cc._RF.pop();
  }, {
    "./BroadcastReceiver": "BroadcastReceiver",
    "./SPUtils": "SPUtils"
  } ],
  Configs: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a8b148ShhNECLRCMfJf61sO", "Configs");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const SPUtils_1 = require("./SPUtils");
    const Http_1 = require("./Http");
    const VippointDTO_1 = require("../../../Lobby/src/Vippoint/VippointDTO");
    const BroadcastReceiver_1 = require("./BroadcastReceiver");
    const ErrorLogger_1 = require("./ErrorLogger");
    var Configs;
    (function(Configs) {
      class Login {
        static initialize(params, source = null) {
          try {
            Configs.Login.AccessToken = params.accessToken;
            Configs.Login.SessionKey = params.sessionKey;
            Configs.Login.Username = params.username;
            Configs.Login.IsLogin = true;
            let sessionDecode = base64.decode(Configs.Login.SessionKey);
            cc.log(sessionDecode);
            let userInfo = JSON.parse(sessionDecode);
            Configs.Login.Nickname = userInfo.nickname;
            Configs.Login.Avatar = userInfo.avatar;
            Configs.Login.Coin = userInfo.vinTotal;
            Configs.Login.LuckyWheel = userInfo.luckyRotate;
            Configs.Login.IpAddress = userInfo.ipAddress;
            Configs.Login.CreateTime = userInfo.createTime;
            Configs.Login.Birthday = userInfo.birthday;
            Configs.Login.isSocialLogin = false;
            Configs.Login.socialToken = "";
            Configs.Login.socialSource = source;
            Configs.Login.telegramAccessToken = base64.encode(Configs.Login.AccessToken + "|" + Number(Configs.Login.isEnableLoginOtpSetting));
          } catch (error) {
            ErrorLogger_1.ErrorLogger.sendLogError("Error", "Login initialize " + source, JSON.stringify(params) + "\n" + JSON.stringify(error.stack));
          }
        }
        static clear(isDisconnect = false) {
          this.UserId = 0;
          this.Username = "";
          this.Password = "";
          this.Nickname = "";
          this.Avatar = "";
          this.Coin = 0;
          this.IsLogin = false;
          this.IsAutoLogin = !isDisconnect;
          this.AccessToken = "";
          this.SessionKey = "";
          this.CreateTime = "";
          this.Birthday = "";
          this.IpAddress = "";
          this.MailCount = 0;
          this.CoinFish = 0;
          this.UserIdFish = 0;
          this.UsernameFish = "";
          this.PasswordFish = "";
          this.BitcoinToken = "";
          isDisconnect || SPUtils_1.default.setUserPass("");
          this.isSocialLogin = false;
          this.socialToken = "";
          this.socialSource = "";
        }
        static getVipPointInfo(onGetVippoint = null) {
          Http_1.default.get(Configs.App.API, {
            c: 126
          }, (err, res) => {
            if (null != err || !res["success"]) return;
            cc.log(res);
            Configs.Login.VipPoint = VippointDTO_1.VippointDTO.toVippointDTO(res);
            BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_VIP_UPDATED);
            onGetVippoint && onGetVippoint();
          });
        }
        static getCurrentVipPoint() {
          return Configs.Login.VipPoint.vippoint;
        }
        static getCurrentVipPointName() {
          return Configs.Login.VipPoint.vippointRankDetail[Configs.Login.VipPoint.currentVippointRank].name;
        }
        static getCurrentVipPointRank() {
          return Configs.Login.VipPoint.currentVippointRank;
        }
        static getMinVipPointCurrentRank() {
          return Configs.Login.VipPoint.vippointRankDetail[Configs.Login.VipPoint.currentVippointRank].minVippoint;
        }
        static haveVipPointNextRank() {
          return !(Configs.Login.VipPoint.currentVippointRank >= Configs.Login.VipPoint.vippointRankDetail.length - 1);
        }
        static getMinVipPointNextRank() {
          return Configs.Login.VipPoint.vippointRankDetail[Configs.Login.VipPoint.currentVippointRank + 1].minVippoint;
        }
        static getVipPointNameNextRank() {
          return Configs.Login.VipPoint.vippointRankDetail[Configs.Login.VipPoint.currentVippointRank + 1].name;
        }
        static getX3DepositInfo() {
          Http_1.default.get(Configs.App.API, {
            c: 6013,
            nn: Configs.Login.Nickname
          }, (err, res) => {
            if (null != err || !res["is_success"]) return;
            cc.log(res);
            Configs.Login.X3Deposit = res["data"];
            BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.X3_DEPOSIT);
          });
        }
      }
      Login.UserId = 0;
      Login.Username = "";
      Login.Password = "";
      Login.Nickname = "";
      Login.Avatar = "";
      Login.Coin = 0;
      Login.IsLogin = false;
      Login.IsAutoLogin = true;
      Login.AccessToken = "";
      Login.SessionKey = "";
      Login.LuckyWheel = 0;
      Login.CreateTime = "";
      Login.Birthday = "";
      Login.IpAddress = "";
      Login.VipPoint = null;
      Login.MailCount = 0;
      Login.isEnableLoginOtpSetting = true;
      Login.telegramAccessToken = "";
      Login.CoinFish = 0;
      Login.UserIdFish = 0;
      Login.UsernameFish = "";
      Login.PasswordFish = "";
      Login.FishConfigs = null;
      Login.BitcoinToken = "";
      Login.isSocialLogin = false;
      Login.socialToken = "";
      Login.socialSource = "";
      Login.X3Deposit = null;
      Configs.Login = Login;
      class App {
        static getServerConfig() {
          Http_1.default.get(Configs.App.API, {
            c: 130
          }, (err, res) => {
            if (null == err) {
              App.SERVER_CONFIG.ratioNapThe = res.ratio_nap_the;
              App.SERVER_CONFIG.ratioTransfer = res.ratio_chuyen;
              App.SERVER_CONFIG.ratioTransferDL = res.ratio_transfer_dl_1;
            }
          });
        }
        static getPlatformName() {
          if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) return "ad";
          if (cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS) return "ios";
          return "web";
        }
        static getLinkFanpage() {
          return this.FANPAGE;
        }
        static getLinkTelegram() {
          return this.TELE_BOT;
        }
        static getLinkTelegramGroup() {
          return this.TELE_GROUP;
        }
      }
      App.BASE_URL = "banhtest.top";
      App.USE_WSS = true;
      App.AUTO_RECONNECT = true;
      App.HOT_UPDATE_URL = "";
      App.SUBPACKAGE_URL = "";
      App.DOMAIN = "https://" + App.BASE_URL + "/web/";
      App.API = "https://portal." + App.BASE_URL + "/api";
      App.API_BK = "https://portal.nhanhtaylen.top/api";
      App.MONEY_TYPE = 1;
      App.LINK_DOWNLOAD = "";
      App.LINK_EVENT = "";
      App.LINK_SUPPORT = "";
      App.GAME_INFO_URL = "https://3h172fkule.execute-api.ap-southeast-1.amazonaws.com/info/";
      App.HOST_MINIGAME = {
        host: "minigame." + App.BASE_URL,
        port: 443
      };
      App.HOST_TAN_LOC = {
        host: "tanloc." + App.BASE_URL,
        port: 443
      };
      App.HOST_TAI_XIU_MD5 = {
        host: "txmd5." + App.BASE_URL,
        port: 443
      };
      App.HOST_SLOT = {
        host: "slot." + App.BASE_URL,
        port: 443
      };
      App.HOST_TLMN = {
        host: "tlmn." + App.BASE_URL,
        port: 443
      };
      App.HOST_SHOOT_FISH = {
        host: "banca." + App.BASE_URL,
        port: 443
      };
      App.HOST_SAM = {
        host: "sam." + App.BASE_URL,
        port: 443
      };
      App.HOST_XOCDIA = {
        host: "xocdia." + App.BASE_URL,
        port: 443
      };
      App.HOST_BACAY = {
        host: "bacay." + App.BASE_URL,
        port: 443
      };
      App.HOST_BAICAO = {
        host: "baicao." + App.BASE_URL,
        port: 443
      };
      App.HOST_POKER = {
        host: "poker." + App.BASE_URL,
        port: 443
      };
      App.HOST_MAUBINH = {
        host: "binh." + App.BASE_URL,
        port: 443
      };
      App.HOST_LIENG = {
        host: "lieng." + App.BASE_URL,
        port: 443
      };
      App.HOST_XIDZACH = {
        host: "xzdzach." + App.BASE_URL,
        port: 443
      };
      App.API_LODE = "https://gameapi." + App.BASE_URL + "/game/lottery/";
      App.API_LODE_SIEU_TOC = "https://gameapi." + App.BASE_URL + "/game/quicklottery/";
      App.API_TAN_LOC = "https://tanloc." + App.BASE_URL + "/api/event/tanloc/";
      App.TELE_GROUP = "";
      App.TELE_BOT = "";
      App.TELE_OTP = "";
      App.FANPAGE = "https://facebook.com";
      App.CSKH_PHONE = "";
      App.TELE_SUPPORT = "";
      App.TELE_NEWS = "";
      App.FB_GROUP = "";
      App.FB_MESSENGER = "";
      App.LANDING_PAGE = "";
      App.SERVER_CONFIG = {
        ratioNapThe: 1,
        ratioTransfer: .98,
        ratioTransferDL: 1,
        ratioMuaThe: 1.25,
        ratioRutNH: 1.1,
        listTenNhaMang: [ "Viettel", "Vinaphone", "Mobifone" ],
        listIdNhaMang: [ 0, 1, 2, 3 ],
        listMenhGiaNapThe: [ 1e4, 2e4, 5e4, 1e5, 2e5, 5e5 ],
        listMenhGiaMuaThe: [ 1e4, 2e4, 5e4, 1e5, 2e5, 5e5 ],
        listIdMenhGiaMuaThe: [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ]
      };
      App.REWARD_TYPE = {
        CARD: 0,
        REWARD: 1,
        MOMO: 2,
        BANK: 3,
        VIETTELPAY: 4,
        ZALOPAY: 5
      };
      App.TELCO_NAME = {
        VTT: "Viettel",
        VNP: "Vinaphone",
        VMS: "Mobifone"
      };
      App.UPDATE_INFO = {
        version: "2.3.2",
        provider: "win365"
      };
      App.BUNDLE_NAME = {
        BACAY: "bacay",
        BAICAO: "baicao",
        BANCA: "banca",
        BAUCUA: "baucua",
        CAOTHAP: "caothap",
        KHOBAU: "khobau",
        LIENG: "lieng",
        LOTO: "loto",
        TANLOC: "tanloc",
        MAIN: "maingame",
        MAUBINH: "maubinh",
        MINIPOKER: "minipoker",
        NUDIEPVIEN: "nudiepvien",
        OANTUTI: "oantuti",
        POKER: "poker",
        POKERGO: "pokergo",
        SAM: "sam",
        SIEUANHHUNG: "sieuanhhung",
        CAYKHE: "caykhe",
        TAIXIU: "taixiu",
        TAIXIUMD5: "taixiumd5",
        TIENLEN: "tienlen",
        VUONGQUOCVIN: "vuongquocvin",
        XIDZACH: "xidzach",
        XOCDIA: "xocdia"
      };
      App.NATIVE_FUNC = {};
      App.NATIVE_CLASS = {};
      App.CLIENT_NAME = "WIN365";
      App.RICH_MAN = 1e5;
      App.PRIVATE_KEY = "kkK8bpMDjqCq";
      Configs.App = App;
      class GameId {
        static getGameName(gameId) {
          switch (gameId) {
           case this.MiniPoker:
            return "MiniPoker";

           case this.TaiXiu:
            return "T\xe0i x\u1ec9u";

           case this.BauCua:
            return "B\u1ea7u cua";

           case this.CaoThap:
            return "Cao th\u1ea5p";

           case this.PokerGo:
            return "Mario";

           case this.VQMM:
            return "VQMM";

           case this.Sam:
            return "S\xe2m";

           case this.MauBinh:
            return "M\u1eadu binh";

           case this.TLMN:
            return "TLMN";

           case this.TaLa:
            return "T\xe1 l\u1ea3";

           case this.Lieng:
            return "Li\xeang";

           case this.XiTo:
            return "X\xec t\u1ed1";

           case this.XocXoc:
            return "X\xf3c x\xf3c";

           case this.BaiCao:
            return "B\xe0i c\xe0o";

           case this.Poker:
            return "Poker";

           case this.Bentley:
            return "Bentley";

           case this.RangeRover:
            return "Range Rover";

           case this.MayBach:
            return "May Bach";

           case this.RollsRoyce:
            return "Rolls Royce";
          }
          return "Unknow";
        }
      }
      GameId.MiniPoker = 1;
      GameId.TaiXiu = 2;
      GameId.BauCua = 3;
      GameId.CaoThap = 4;
      GameId.PokerGo = 5;
      GameId.VQMM = 7;
      GameId.Sam = 8;
      GameId.BaCay = 9;
      GameId.MauBinh = 10;
      GameId.TLMN = 11;
      GameId.TaLa = 12;
      GameId.Lieng = 13;
      GameId.XiTo = 14;
      GameId.XocXoc = 15;
      GameId.BaiCao = 16;
      GameId.Poker = 17;
      GameId.Bentley = 19;
      GameId.RangeRover = 20;
      GameId.MayBach = 21;
      GameId.RollsRoyce = 22;
      GameId.TaiXiuMD5 = 31;
      GameId.LoDe = 100;
      GameId.LoDeSieuToc = 101;
      Configs.GameId = GameId;
      class Payment {
        static getBankCode(bankCode) {
          switch (bankCode) {
           case "ABB":
            return "ABB";

           case "ACB":
            return "ACB";

           case "AGR":
           case "VBA":
            return "AGR";

           case "BAB":
            return "BAB";

           case "BIDV":
            return "BIDV";

           case "BVB":
            return "BVB";

           case "CIMB":
            return "CIMB";

           case "COB":
            return "COB";

           case "DAB":
           case "DOB":
            return "DAB";

           case "EIB":
            return "EIB";

           case "GPB":
            return "GPB";

           case "HDB":
            return "HDB";

           case "HLB":
            return "HLB";

           case "IBK":
            return "IBK";

           case "IDB":
           case "IVB":
            return "IDB";

           case "KLB":
            return "KLB";

           case "LVPB":
           case "LPB":
            return "LVPB";

           case "MBB":
           case "MB":
            return "MBB";

           case "MSB":
            return "MSB";

           case "NAB":
            return "NAB";

           case "NCB":
            return "NCB";

           case "OCB":
            return "OCB";

           case "OJB":
            return "OJB";

           case "PB":
           case "PBVN":
            return "PB";

           case "PGB":
            return "PGB";

           case "PVB":
           case "PVCB":
            return "PVB";

           case "SAB":
           case "SEAB":
            return "SAB";

           case "SCB":
            return "SCB";

           case "SGB":
            return "SGB";

           case "SHB":
            return "SHB";

           case "SHIB":
           case "SHBVN":
            return "SHIB";

           case "STB":
            return "STB";

           case "TCB":
            return "TCB";

           case "TPB":
            return "TPB";

           case "UOB":
            return "UOB";

           case "VAB":
            return "VAB";

           case "VB":
            return "VB";

           case "VCB":
            return "VCB";

           case "VCCB":
            return "VCCB";

           case "VIB":
            return "VIB";

           case "VPB":
            return "VPB";

           case "VRB":
            return "VRB";

           case "VTB":
           case "CTG":
            return "VTB";

           case "WRB":
           case "WVN":
            return "WRB";
          }
          return "";
        }
        static getTelcoProvider(telco) {
          switch (telco) {
           case "MOBI":
           case "MOBIFONE":
           case "VMS":
            return "VMS";

           case "VINA":
           case "VINAPHONE":
           case "VNP":
            return "VNP";

           case "VT":
           case "VTT":
           case "VTE":
           case "VIETTEL":
            return "VTT";

           default:
            return telco.toUpperCase();
          }
        }
      }
      Configs.Payment = Payment;
    })(Configs || (Configs = {}));
    exports.default = Configs;
    !(!cc.sys.isNative || cc.sys.os === cc.sys.OS_OSX || cc.sys.os === cc.sys.OS_WINDOWS) && (Configs.App.UPDATE_INFO = JSON.parse(cc.sys.localStorage.getItem("version")));
    cc._RF.pop();
  }, {
    "../../../Lobby/src/Vippoint/VippointDTO": "VippointDTO",
    "./BroadcastReceiver": "BroadcastReceiver",
    "./ErrorLogger": "ErrorLogger",
    "./Http": "Http",
    "./SPUtils": "SPUtils"
  } ],
  ConfirmDialog: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d2ba1FAR7NFVK4X4KMOiW6z", "ConfirmDialog");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Dialog_1 = require("./Dialog");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let ConfirmDialog = class ConfirmDialog extends Dialog_1.default {
      constructor() {
        super(...arguments);
        this.lblMessage = null;
        this.lblDone = null;
        this.lblConfirm = null;
        this.onDismissed = null;
        this.onConfirmClicked = null;
        this.isClickdConfirm = false;
      }
      show1(msg) {
        this.show4(msg);
      }
      show2(msg, onDismissed) {
        this.show4(msg, null, null, onDismissed);
      }
      show3(msg, confirmTitle, onDismissed) {
        this.show4(msg, null, confirmTitle, onDismissed);
      }
      show4(msg, doneTitle, confirmTitle, onDismissed) {
        this.isClickdConfirm = false;
        this.lblDone.string = doneTitle || "H\u1ee7y";
        this.lblConfirm.string = confirmTitle || "\u0110\u1ed3ng \xfd";
        this.onDismissed = onDismissed;
        this.lblMessage.string = msg;
        super.show();
      }
      actConfirm() {
        this.isClickdConfirm = true;
        this.dismiss();
      }
      _onShowed() {
        Dialog_1.default.prototype._onShowed.call(this);
      }
      _onDismissed() {
        Dialog_1.default.prototype._onDismissed.call(this);
        "function" === typeof this.onDismissed && this.onDismissed(this.isClickdConfirm);
      }
    };
    __decorate([ property(cc.Label) ], ConfirmDialog.prototype, "lblMessage", void 0);
    __decorate([ property(cc.Label) ], ConfirmDialog.prototype, "lblDone", void 0);
    __decorate([ property(cc.Label) ], ConfirmDialog.prototype, "lblConfirm", void 0);
    ConfirmDialog = __decorate([ ccclass ], ConfirmDialog);
    exports.default = ConfirmDialog;
    cc._RF.pop();
  }, {
    "./Dialog": "Dialog"
  } ],
  Constants: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "26f0bOVnwZFNKtmYzYyUOx2", "Constants");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.ChatChannel = exports.Network = exports.UserActions = void 0;
    var UserActions;
    (function(UserActions) {
      let ENUM;
      (function(ENUM) {
        ENUM["RECHARGE"] = "RECHARGE";
        ENUM["RECHARGE_CARD"] = "RECHARGE_CARD";
        ENUM["RECHARGE_MOMO"] = "RECHARGE_MOMO";
        ENUM["RECHARGE_BANK"] = "RECHARGE_BANK";
        ENUM["PLAY_GAME"] = "PLAY_GAME";
        ENUM["PLAY_GAME_TAI_XIU"] = "PLAY_GAME_TAI_XIU";
        ENUM["PLAY_GAME_MINI_POKER"] = "PLAY_GAME_MINI_POKER";
        ENUM["PLAY_GAME_BAU_CUA"] = "PLAY_GAME_BAU_CUA";
        ENUM["PLAY_GAME_CAO_THAP"] = "PLAY_GAME_CAO_THAP";
        ENUM["PLAY_GAME_POKE_GO"] = "PLAY_GAME_POKE_GO";
        ENUM["PLAY_GAME_VQMM"] = "PLAY_GAME_VQMM";
        ENUM["GET_REWARD"] = "GET_REWARD";
        ENUM["VERIFY_TELEGRAM"] = "VERIFY_TELEGRAM";
        ENUM["OPEN_VIPPOINT"] = "OPEN_VIPPOINT";
        ENUM["UP_LEVEL_VIPPOINT"] = "UP_LEVEL_VIPPOINT";
        ENUM["TELE_SUPPORT"] = "TELE_SUPPORT";
        ENUM["FB_MESSENGER"] = "FB_MESSENGER";
      })(ENUM = UserActions.ENUM || (UserActions.ENUM = {}));
      function toEnum(val) {
        return ENUM[ENUM[val]];
      }
      UserActions.toEnum = toEnum;
      function toEnums(vals) {
        let enums = [];
        vals.forEach(val => enums.push(toEnum(val)));
        return enums;
      }
      UserActions.toEnums = toEnums;
      function toName(val) {
        switch (val) {
         case UserActions.ENUM.RECHARGE:
         case UserActions.ENUM.RECHARGE_CARD:
         case UserActions.ENUM.RECHARGE_MOMO:
         case UserActions.ENUM.RECHARGE_BANK:
          return "N\u1ea1p ngay";

         case UserActions.ENUM.PLAY_GAME:
         case UserActions.ENUM.PLAY_GAME_TAI_XIU:
         case UserActions.ENUM.PLAY_GAME_MINI_POKER:
         case UserActions.ENUM.PLAY_GAME_BAU_CUA:
         case UserActions.ENUM.PLAY_GAME_CAO_THAP:
         case UserActions.ENUM.PLAY_GAME_POKE_GO:
         case UserActions.ENUM.PLAY_GAME_VQMM:
          return "Ch\u01a1i ngay";

         case UserActions.ENUM.GET_REWARD:
          return "Nh\u1eadn";

         case UserActions.ENUM.VERIFY_TELEGRAM:
          return "K\xedch ho\u1ea1t ngay";

         case UserActions.ENUM.OPEN_VIPPOINT:
          return "L\xean VIP";

         case UserActions.ENUM.TELE_SUPPORT:
         case UserActions.ENUM.FB_MESSENGER:
          return "Li\xean h\u1ec7 ngay";

         default:
          return "";
        }
      }
      UserActions.toName = toName;
    })(UserActions = exports.UserActions || (exports.UserActions = {}));
    var Network;
    (function(Network) {
      let DisconnectReason;
      (function(DisconnectReason) {
        DisconnectReason[DisconnectReason["IDLE"] = 0] = "IDLE";
        DisconnectReason[DisconnectReason["KICK"] = 1] = "KICK";
        DisconnectReason[DisconnectReason["BAN"] = 2] = "BAN";
        DisconnectReason[DisconnectReason["LOGIN"] = 3] = "LOGIN";
        DisconnectReason[DisconnectReason["UNKNOWN"] = 4] = "UNKNOWN";
        DisconnectReason[DisconnectReason["HANDSHAKE"] = 5] = "HANDSHAKE";
      })(DisconnectReason = Network.DisconnectReason || (Network.DisconnectReason = {}));
    })(Network = exports.Network || (exports.Network = {}));
    var ChatChannel;
    (function(ChatChannel) {
      ChatChannel["TAIXIU"] = "TAIXIU";
      ChatChannel["TAI_XIU_MD5"] = "TAI_XIU_MD5";
      ChatChannel["XOC_DIA"] = "XOC_DIA";
      ChatChannel["BAU_CUA"] = "BAU_CUA";
      ChatChannel["LO_DE"] = "LO_DE";
      ChatChannel["LO_DE_SIEU_TOC"] = "LO_DE_SIEU_TOC";
      ChatChannel["TAN_LOC"] = "LI_XI";
    })(ChatChannel = exports.ChatChannel || (exports.ChatChannel = {}));
    cc._RF.pop();
  }, {} ],
  "CustomUI.Dropdown": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "eaff29gewpDKbOiuEOJSkNB", "CustomUI.Dropdown");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const BroadcastReceiver_1 = require("../common/BroadcastReceiver");
    const {ccclass: ccclass, property: property, requireComponent: requireComponent} = cc._decorator;
    let Dropdown = class Dropdown extends cc.Component {
      constructor() {
        super(...arguments);
        this.label = null;
        this.template = null;
        this.options = [];
        this.value = 0;
        this.blocker = null;
        this.dropdownList = null;
        this.animating = false;
      }
      start() {
        BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.SET_SOUND, this.node);
        this.template.active = false;
        let parent = this.findParent();
        this.node.on("click", () => {
          if (this.animating) return;
          this.animating = true;
          this.blocker = this.addBlocker(parent);
          this.dropdownList = cc.instantiate(this.template);
          this.dropdownList.getComponent(cc.Widget).enabled = false;
          this.dropdownList.parent = this.blocker;
          this.dropdownList.name = "dropdownList";
          let pos = this.template.convertToWorldSpaceAR(this.template.position);
          this.dropdownList.position = this.dropdownList.convertToNodeSpaceAR(pos);
          this.dropdownList.active = true;
          this.dropdownList.scaleY = 0;
          this.dropdownList.opacity = 0;
          this.dropdownList.stopAllActions();
          this.dropdownList.runAction(cc.sequence(cc.spawn(cc.scaleTo(.3, 1, 1).easing(cc.easeBackOut()), cc.fadeIn(.15)), cc.callFunc(() => {
            this.animating = false;
          })));
          let scrContent = this.dropdownList.getComponent(cc.ScrollView).content;
          let itemTemp = scrContent.children[0];
          itemTemp.active = false;
          for (let i = 0; i < this.options.length; i++) {
            let item = cc.instantiate(itemTemp);
            item.parent = itemTemp.parent;
            item.active = true;
            let label = item.getComponentInChildren(cc.Label);
            label.string = this.options[i];
            let check = item.getComponentInChildren(cc.Sprite);
            check.node.active = i == this.value;
            item.on("click", () => {
              this.setValue(i);
              null != this.onValueChanged && this.onValueChanged(i);
              this.dismiss();
            });
            if (i == this.value) {
              let p = scrContent.position;
              p.y = itemTemp.height * i - itemTemp.height / 2;
              scrContent.position = p;
            }
          }
        });
      }
      onEnable() {
        null != this.blocker && this.blocker.destroy();
      }
      onDestroy() {
        null != this.blocker && this.blocker.destroy();
      }
      addBlocker(parent) {
        let blocker = new cc.Node("blocker");
        blocker.parent = parent;
        blocker.addComponent(cc.Button);
        blocker.zIndex = 3e4;
        let widget = blocker.addComponent(cc.Widget);
        widget.isAlignTop = true;
        widget.top = 0;
        widget.isAlignBottom = true;
        widget.bottom = 0;
        widget.isAlignLeft = true;
        widget.left = 0;
        widget.isAlignRight = true;
        widget.right = 0;
        blocker.on("click", () => {
          this.dismiss();
        });
        cc.director.on(cc.Director.EVENT_BEFORE_SCENE_LOADING, () => {
          this.onDestroy();
        });
        return blocker;
      }
      findParent(node = null) {
        null == node && (node = this.node);
        if (null == node.parent || node.parent instanceof cc.Scene) return node;
        return this.findParent(node.parent);
      }
      dismiss() {
        if (this.animating) return;
        this.animating = true;
        this.dropdownList.stopAllActions();
        this.dropdownList.runAction(cc.sequence(cc.spawn(cc.scaleTo(.3, 1, 0).easing(cc.easeBackIn()), cc.sequence(cc.delayTime(.15), cc.fadeOut(.15))), cc.callFunc(() => {
          this.blocker.destroy();
          this.blocker = null;
          this.animating = false;
        })));
      }
      setOptions(options) {
        this.options = options;
      }
      setValue(value) {
        this.value = value;
        this.label.string = this.options[this.value];
      }
      getValue() {
        return this.value;
      }
      getLabelString() {
        return this.label.string;
      }
      setOnValueChange(onValueChanged) {
        this.onValueChanged = onValueChanged;
      }
      clickValue(value) {
        this.onValueChanged && this.onValueChanged(value);
      }
    };
    __decorate([ property(cc.Label) ], Dropdown.prototype, "label", void 0);
    __decorate([ property(cc.Node) ], Dropdown.prototype, "template", void 0);
    Dropdown = __decorate([ ccclass, requireComponent(cc.Button) ], Dropdown);
    exports.default = Dropdown;
    cc._RF.pop();
  }, {
    "../common/BroadcastReceiver": "BroadcastReceiver"
  } ],
  "CustomUI.PageView": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b8b03D8L7xOCZOmmU9GVkvc", "CustomUI.PageView");
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
    let PageView = class PageView extends cc.Component {
      constructor() {
        super(...arguments);
        this.autoInit = true;
        this.infinity = true;
        this.cancelInnerEvents = true;
        this.spacing = 30;
        this.moveOffset = 30;
        this.content = null;
        this.items = null;
        this.pages = null;
        this.indicator = null;
        this.index = 0;
        this.pageCount = 0;
        this.left = null;
        this.center = null;
        this.right = null;
        this.pageItems = [];
        this.touchMoved = false;
        this.onTouchStart = null;
        this.onTouchMove = null;
        this.onTouchEndOrCancel = null;
        this.onPageChanged = null;
      }
      start() {
        this.node.on(cc.Node.EventType.TOUCH_START, event => {
          this.touchMoved = false;
          null != this.onTouchStart && this.onTouchStart();
        }, this.node, true);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, event => {
          if (!this.cancelInnerEvents) return;
          if (this.touchMoved) {
            let p = this.items.position;
            p.x += event.getDeltaX();
            let offset = this.content.width + this.spacing;
            this.infinity || (this.items.position.x > 0 && 0 == this.index ? offset = this.moveOffset : this.items.position.x < 0 && this.index == this.pageCount - 1 && (offset = this.moveOffset));
            Math.abs(p.x) > offset && (p.x = p.x > 0 ? offset : -offset);
            this.items.position = p;
            null != this.onTouchMove && this.onTouchMove();
          }
          var deltaMove = event.touch.getLocation().sub(event.touch.getStartLocation());
          if (deltaMove.mag() > 7 && !this.touchMoved && event.target != this.node) {
            var cancelEvent = new cc.Event.EventTouch(event.getTouches(), event.bubbles);
            cancelEvent.type = cc.Node.EventType.TOUCH_CANCEL;
            cancelEvent.touch = event.touch;
            event.target.dispatchEvent(cancelEvent);
            this.touchMoved = true;
          }
        }, this.node, true);
        let cbEnd = event => {
          if (!this.touchMoved) return;
          if (Math.abs(this.items.position.x) > this.content.width / 4) {
            let idx = this.index;
            let position = cc.Vec2.ZERO;
            if (this.infinity) if (this.items.position.x < 0) {
              idx++;
              idx > this.pageCount - 1 && (idx = 0);
              position = cc.v2(-this.content.width - this.spacing, 0);
            } else {
              idx--;
              idx < 0 && (idx = this.pageCount - 1);
              position = cc.v2(this.content.width + this.spacing, 0);
            } else {
              this.items.position.x < 0 && idx < this.pageItems.length - 1 ? idx++ : this.items.position.x > 0 && idx >= 1 && idx--;
              position = this.index > idx ? cc.v2(this.content.width + this.spacing, 0) : cc.v2(-this.content.width - this.spacing, 0);
            }
            if (this.index != idx) {
              this.items.stopAllActions();
              this.items.runAction(cc.sequence(cc.moveTo((this.content.width + this.spacing - Math.abs(this.items.position.x)) / (this.content.width + this.spacing) * .5, position), cc.callFunc(() => {
                this.setPageIndex(idx);
                null != this.onPageChanged && this.onPageChanged();
              })));
            } else {
              this.items.stopAllActions();
              this.items.runAction(cc.sequence(cc.moveTo(.3, cc.Vec2.ZERO), cc.callFunc(() => {})));
            }
          } else {
            this.items.stopAllActions();
            this.items.runAction(cc.sequence(cc.moveTo(.3, cc.Vec2.ZERO), cc.callFunc(() => {})));
          }
          null != this.onTouchEndOrCancel && this.onTouchEndOrCancel();
        };
        this.node.on(cc.Node.EventType.TOUCH_END, cbEnd, this.node, true);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, cbEnd, this.node, true);
        for (let i = 0; i < this.pages.childrenCount; i++) this.pages.children[i].active = false;
        this.left = new cc.Node();
        this.left.parent = this.items;
        this.left.setPosition(cc.v2(-this.content.width - this.spacing, 0));
        this.left.active = true;
        this.center = new cc.Node();
        this.center.parent = this.items;
        this.center.setPosition(cc.v2(0, 0));
        this.center.active = true;
        this.right = new cc.Node();
        this.right.parent = this.items;
        this.right.setPosition(cc.v2(this.content.width + this.spacing, 0));
        this.right.active = true;
        this.autoInit && this.init();
      }
      init() {
        for (let i = 1; i < this.indicator.childrenCount; i++) {
          this.indicator.children[i].destroy();
          i--;
        }
        this.indicator.children[0].active = false;
        this.pageCount = this.pages.childrenCount;
        for (let i = 0; i < this.pages.childrenCount; i++) {
          this.pageItems.push(this.pages.children[i]);
          let item = cc.instantiate(this.indicator.children[0]);
          item.parent = this.indicator;
          item.active = true;
        }
        this.setPageIndex(0);
      }
      scrollToIndex(index, moveToLeft = false) {
        if (this.index != index) {
          let position = cc.Vec2.ZERO;
          position = this.infinity ? moveToLeft ? cc.v2(this.content.width + this.spacing, 0) : cc.v2(-this.content.width - this.spacing, 0) : this.index > index ? cc.v2(this.content.width + this.spacing, 0) : cc.v2(-this.content.width - this.spacing, 0);
          this.items.stopAllActions();
          this.infinity || 1 == Math.abs(this.index - index) || Math.abs(this.index - index) != this.pageCount - 1 ? this.items.runAction(cc.sequence(cc.moveTo(.5, position), cc.callFunc(() => {
            this.setPageIndex(index);
          }))) : this.setPageIndex(index);
        }
      }
      scrollToNextIndex() {
        let idx = this.index + 1;
        idx >= this.pageCount && (idx = 0);
        this.scrollToIndex(idx, false);
      }
      setPageIndex(index) {
        this.index = index;
        for (let i = 0; i < this.pageItems.length; i++) this.pageItems[i].active = false;
        if (this.infinity) {
          let idx = this.index - 1;
          idx < 0 && (idx = this.pageCount - 1);
          this.pageItems[idx].active = true;
          this.pageItems[idx].parent = this.left;
          idx = this.index;
          this.pageItems[idx].active = true;
          this.pageItems[idx].parent = this.center;
          idx = this.index + 1;
          idx > this.pageCount - 1 && (idx = 0);
          this.pageItems[idx].active = true;
          this.pageItems[idx].parent = this.right;
        } else {
          if (this.pageCount >= 3 && this.index >= 1) {
            this.pageItems[this.index - 1].active = true;
            this.pageItems[this.index - 1].parent = this.left;
          }
          if (this.pageCount >= this.index + 1) {
            this.pageItems[this.index].active = true;
            this.pageItems[this.index].parent = this.center;
          }
          if (this.pageCount >= 2 && this.index < this.pageCount - 1) {
            this.pageItems[this.index + 1].active = true;
            this.pageItems[this.index + 1].parent = this.right;
          }
        }
        this.items.setPosition(cc.Vec2.ZERO);
        this.updateIndicator();
      }
      updateIndicator() {
        for (let i = 1; i < this.indicator.childrenCount; i++) {
          let item = this.indicator.children[i];
          item.parent = this.indicator;
          let active = i - 1 == this.index;
          item.getChildByName("active").active = active;
          item.getChildByName("inactive").active = !active;
        }
      }
    };
    __decorate([ property ], PageView.prototype, "autoInit", void 0);
    __decorate([ property ], PageView.prototype, "infinity", void 0);
    __decorate([ property ], PageView.prototype, "cancelInnerEvents", void 0);
    __decorate([ property ], PageView.prototype, "spacing", void 0);
    __decorate([ property ], PageView.prototype, "moveOffset", void 0);
    __decorate([ property(cc.Node) ], PageView.prototype, "content", void 0);
    __decorate([ property(cc.Node) ], PageView.prototype, "items", void 0);
    __decorate([ property(cc.Node) ], PageView.prototype, "pages", void 0);
    __decorate([ property(cc.Node) ], PageView.prototype, "indicator", void 0);
    PageView = __decorate([ ccclass ], PageView);
    exports.default = PageView;
    cc._RF.pop();
  }, {} ],
  "CustomUI.SliderBet": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b662fry271EGIid1dGpRvQ3", "CustomUI.SliderBet");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Utils_1 = require("../common/Utils");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let SliderBet = class SliderBet extends cc.Component {
      constructor() {
        super(...arguments);
        this.slider = null;
        this.label_bet = null;
        this.sp_bkg = null;
        this.current_raise = 0;
        this.min_raise = 0;
        this.max_raise = 0;
        this.onChangeValue = null;
        this.list_step = [];
      }
      start() {
        this.sp_bkg.type = cc.Sprite.Type.FILLED;
      }
      initValue(_min_vl, _step_vl, _max_vl, _onChangeValue = null) {
        this.node.active = true;
        this.node.parent.getChildByName("btnAll-In") && (this.node.parent.getChildByName("btnAll-In").active = true);
        this.min_raise = _min_vl;
        this.max_raise = _max_vl;
        this.onChangeValue = _onChangeValue;
        this.current_raise = _min_vl;
        this.slider.progress = 0;
        this.sp_bkg.fillRange = 0;
        this.list_step = [ _min_vl ];
        let vlBetEle = _min_vl;
        while (vlBetEle < _max_vl) {
          vlBetEle += _step_vl;
          if (vlBetEle >= _max_vl) {
            this.list_step.push(_max_vl);
            break;
          }
          this.list_step.push(vlBetEle);
        }
        this.slider.enabled = _min_vl <= _max_vl;
        this.slider.handle.interactable = _min_vl <= _max_vl;
        this.setCurrentRaise();
      }
      setCurrentRaise() {
        this.label_bet.string = Utils_1.default.formatMoney(this.current_raise);
      }
      onValueChange(event, data) {
        let leng = this.list_step.length;
        let rateStep = 1 / leng;
        for (let i = 0; i < leng; i++) {
          let rate = rateStep * (i + 1);
          if (this.slider.progress <= rate) {
            this.current_raise = this.list_step[i];
            break;
          }
        }
        this.sp_bkg.fillRange = this.slider.progress;
        this.current_raise <= this.min_raise && (this.current_raise = this.min_raise);
        this.current_raise >= this.max_raise && (this.current_raise = this.max_raise);
        this.setCurrentRaise();
        this.onChangeValue && this.onChangeValue(this.current_raise);
      }
    };
    __decorate([ property(cc.Slider) ], SliderBet.prototype, "slider", void 0);
    __decorate([ property(cc.Label) ], SliderBet.prototype, "label_bet", void 0);
    __decorate([ property(cc.Sprite) ], SliderBet.prototype, "sp_bkg", void 0);
    SliderBet = __decorate([ ccclass ], SliderBet);
    exports.default = SliderBet;
    cc._RF.pop();
  }, {
    "../common/Utils": "Utils"
  } ],
  Dialog: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "89938zvBc1CAaNyePwL3b4R", "Dialog");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const BroadcastReceiver_1 = require("./BroadcastReceiver");
    const Common_AudioManager_1 = require("./Common.AudioManager");
    const Configs_1 = require("./Configs");
    const ErrorLogger_1 = require("./ErrorLogger");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let Dialog = class Dialog extends cc.Component {
      constructor() {
        super(...arguments);
        this.isAnimated = true;
        this.bg = null;
        this.soundClosePopup = null;
        this.container = null;
        this.showScale = 1.1;
        this.startScale = .7;
      }
      show() {
        this.bg || (this.bg = this.node.getChildByName("Bg"));
        this.container || (this.container = this.node.getChildByName("Container"));
        this.soundClosePopup || cc.assetManager.getBundle(Configs_1.default.App.BUNDLE_NAME.MAIN).load("/Lobby/res/sounds/close_popup", cc.AudioClip, (err, audio) => {
          err && ErrorLogger_1.ErrorLogger.sendLogError("Bundle load resource", "Dialog close sound", JSON.stringify(err));
          this.soundClosePopup = audio;
        });
        this.node.active = true;
        this.isAnimated = false;
        this.bg.stopAllActions();
        this.bg.opacity = 0;
        this.bg.runAction(cc.fadeTo(.2, 128));
        this.container.stopAllActions();
        this.container.opacity = 0;
        this.container.scale = this.startScale;
        this.container.runAction(cc.sequence(cc.spawn(cc.scaleTo(.2, this.showScale), cc.fadeIn(.2)), cc.scaleTo(.1, 1), cc.callFunc(this._onShowed.bind(this))));
      }
      start() {
        BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.SET_SOUND, this.node);
      }
      dismiss() {
        this.bg || (this.bg = this.node.getChildByName("Bg"));
        this.container || (this.container = this.node.getChildByName("Container"));
        var _this = this;
        this.isAnimated = false;
        this.bg.stopAllActions();
        this.bg.opacity = 128;
        this.bg.runAction(cc.fadeOut(.2));
        this.container.stopAllActions();
        this.container.opacity = 255;
        this.container.scale = 1;
        this.container.runAction(cc.sequence(cc.scaleTo(.1, this.showScale), cc.spawn(cc.scaleTo(.2, this.startScale), cc.fadeOut(.2)), cc.callFunc(_this._onDismissed.bind(this))));
      }
      _onShowed() {
        this.isAnimated = true;
      }
      _onDismissed() {
        Common_AudioManager_1.default.getInstance().playEffect(this.soundClosePopup);
        this.node.active = false;
        this.isAnimated = true;
      }
    };
    Dialog = __decorate([ ccclass ], Dialog);
    exports.default = Dialog;
    cc._RF.pop();
  }, {
    "./BroadcastReceiver": "BroadcastReceiver",
    "./Common.AudioManager": "Common.AudioManager",
    "./Configs": "Configs",
    "./ErrorLogger": "ErrorLogger"
  } ],
  DropdownItem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b6228P9oQ9IlaVaTiX2V4va", "DropdownItem");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const BroadcastReceiver_1 = require("./BroadcastReceiver");
    const {ccclass: ccclass, property: property, requireComponent: requireComponent} = cc._decorator;
    let DropdownItem = class DropdownItem extends cc.Component {
      constructor() {
        super(...arguments);
        this.checkMark = null;
        this.label = null;
        this.idx = -1;
      }
      start() {
        BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.SET_SOUND, this.node);
      }
    };
    __decorate([ property(cc.Node) ], DropdownItem.prototype, "checkMark", void 0);
    __decorate([ property(cc.Label) ], DropdownItem.prototype, "label", void 0);
    DropdownItem = __decorate([ ccclass, requireComponent(cc.Button) ], DropdownItem);
    exports.default = DropdownItem;
    cc._RF.pop();
  }, {
    "./BroadcastReceiver": "BroadcastReceiver"
  } ],
  Dropdown: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ff7afpi+zdIq7WTcDLQtlsb", "Dropdown");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const BroadcastReceiver_1 = require("./BroadcastReceiver");
    const DropdownItem_1 = require("./DropdownItem");
    const {ccclass: ccclass, property: property, requireComponent: requireComponent} = cc._decorator;
    let Dropdown = class Dropdown extends cc.Component {
      constructor() {
        super(...arguments);
        this.label = null;
        this.itemTemplate = null;
        this.value = -1;
        this.data = [];
        this.items = [];
      }
      start() {
        BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.SET_SOUND, this.node);
        this.itemTemplate.node.active = false;
      }
      show() {
        this.node.active = true;
        this.node.opacity = 0;
        this.node.runAction(cc.fadeIn(.2));
        for (var i = 0; i < this.items.length; i++) this.items[i].checkMark.active = this.items[i].idx == this.value;
      }
      setOptions(data = []) {
        this.data = data;
        var childen = this.itemTemplate.node.parent.children;
        for (var i = 0; i < childen.length; i++) childen[i].active = false;
        this.items = [];
        for (var i = 0; i < data.length; i++) {
          var item = this.getItem();
          item.idx = i;
          item.label.string = data[i];
          item.checkMark.active = i == this.value;
          this.items.push(item);
        }
      }
      dismiss() {
        var _this = this;
        this.node.runAction(cc.sequence(cc.fadeOut(.2), cc.callFunc(() => {
          _this.node.active = false;
        })));
      }
      setOnValueChange(callback) {
        this.onValueChange = callback;
      }
      setValue(value) {
        if (value < this.data.length) {
          this.value = value;
          this.label.string = this.data[this.value];
        } else this.value = 0;
      }
      getValue() {
        return this.value;
      }
      getItem() {
        var node = null;
        var childen = this.itemTemplate.node.parent.children;
        for (var i = 0; i < childen.length; i++) childen[i].active || childen[i] == this.itemTemplate.node || (node = childen[i]);
        if (null == node) {
          node = cc.instantiate(this.itemTemplate.node);
          node.parent = this.itemTemplate.node.parent;
          node.on("click", target => {
            this.value = target.getComponent(DropdownItem_1.default).idx;
            this.label.string = this.data[this.value];
            this.onValueChange && this.onValueChange(this.value);
            this.dismiss();
          }, this);
        }
        node.active = true;
        node.zIndex = this.getLastZIndex();
        return node.getComponent(DropdownItem_1.default);
      }
      getLastZIndex() {
        var c = 0;
        var childen = this.itemTemplate.node.parent.children;
        for (var i = 1; i < childen.length; i++) childen[i].active && c++;
        return c;
      }
    };
    __decorate([ property(cc.Label) ], Dropdown.prototype, "label", void 0);
    __decorate([ property(DropdownItem_1.default) ], Dropdown.prototype, "itemTemplate", void 0);
    Dropdown = __decorate([ ccclass, requireComponent(cc.Button) ], Dropdown);
    exports.default = Dropdown;
    cc._RF.pop();
  }, {
    "./BroadcastReceiver": "BroadcastReceiver",
    "./DropdownItem": "DropdownItem"
  } ],
  ErrorLogger: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6daa9/z5S1MSLVF+F5eNo6Q", "ErrorLogger");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.ErrorLogger = void 0;
    const Configs_1 = require("./Configs");
    const Http_1 = require("./Http");
    let errHandler = function(eventOrMessage, url, lineNumber, colNumber, error) {
      console.log(eventOrMessage, url, lineNumber, colNumber, error);
      ErrorLogger.sendLogError("Error", "Js error", error && error.stack ? error.stack : error || "unknown error");
    };
    let errHandlerNative = function(url, lineNumber, eventOrMessage, stack) {
      console.log(url, lineNumber, eventOrMessage, stack);
      ErrorLogger.sendLogError("Error", "Js error", eventOrMessage && stack ? eventOrMessage + "\n" + stack : eventOrMessage || "unknown error");
    };
    true;
    cc.sys.isNative ? window["__errorHandler"] = errHandlerNative : window.onerror = errHandler;
    class ErrorLogger {
      static sendLogError(name, service, err) {
        if (false, !cc.sys.isNative && true) return;
        var params = {
          c: 6017,
          name: name,
          service: service,
          message: err,
          scene: cc.director.getScene().name || "unknown",
          os: cc.sys.os == cc.sys.OS_IOS ? "ios" : cc.sys.os == cc.sys.OS_ANDROID ? "android" : "web",
          osVersion: cc.sys.osVersion,
          client: Configs_1.default.App.UPDATE_INFO["provider"] || "unknown",
          version: Configs_1.default.App.UPDATE_INFO["version"] || "unknown",
          nn: Configs_1.default.Login.Nickname,
          requireLogin: false
        };
        Http_1.default.get(Configs_1.default.App.API, params, (err, res) => {
          if (null != err) {
            console.log("sendLogError", err);
            return;
          }
          console.log(res);
        });
      }
    }
    exports.ErrorLogger = ErrorLogger;
    cc._RF.pop();
  }, {
    "./Configs": "Configs",
    "./Http": "Http"
  } ],
  Http: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2cd84ecMG9CWL/aifwSEhhY", "Http");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var Http_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Configs_1 = require("./Configs");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let Http = Http_1 = class Http {
      static post(url, params, onFinished) {
        params = params || {};
        params["pf"] = Configs_1.default.App.getPlatformName();
        params["at"] || (params["at"] = Configs_1.default.Login.AccessToken);
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
          if (4 === xhr.readyState) if (200 === xhr.status) {
            var data = null;
            var e = null;
            try {
              data = JSON.parse(xhr.responseText);
            } catch (ex) {
              e = ex;
            }
            onFinished(e, data);
          } else onFinished(xhr.status, null);
        };
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        xhr.send(JSON.stringify(params));
      }
      static get(url, params, onFinished) {
        var xhr = new XMLHttpRequest();
        var _params = "";
        params = params || {};
        params.hasOwnProperty("cp") || 1 == params["c"] || (params["cp"] = "H");
        params["cl"] = "H";
        cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID ? params["pf"] = "ad" : cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS ? params["pf"] = "ios" : cc.sys.isNative ? params["pf"] = "other" : params["pf"] = "web";
        params.hasOwnProperty("requireLogin") || (params["requireLogin"] = true);
        if (!params["at"] && params["requireLogin"]) {
          if (!Configs_1.default.Login.AccessToken) return;
          params["at"] = Configs_1.default.Login.AccessToken;
        }
        delete params["requireLogin"];
        null !== params && (_params = Http_1.serialize(params));
        function onRetry() {
          var _xhr = new XMLHttpRequest();
          var _url = Configs_1.default.App.API_BK;
          _xhr.onreadystatechange = function() {
            if (4 === _xhr.readyState) if (200 === _xhr.status) {
              var _data = null;
              var _e = null;
              try {
                _data = JSON.parse(_xhr.responseText);
              } catch (ex) {
                _e = ex;
              }
              onFinished(_e, _data);
            } else onFinished(_xhr.status, null);
          };
          _xhr.open("GET", _url + "?" + _params, true);
          _xhr.send();
        }
        xhr.onreadystatechange = function() {
          if (4 === xhr.readyState) if (200 === xhr.status) {
            var data = null;
            var e = null;
            try {
              data = JSON.parse(xhr.responseText);
            } catch (ex) {
              e = ex;
            }
            onFinished(e, data);
          } else url !== Configs_1.default.App.API ? onFinished(xhr.status, null) : onRetry();
        };
        xhr.open("GET", url + "?" + _params, true);
        xhr.send();
      }
      static serialize(obj) {
        var str = [];
        for (var p in obj) obj.hasOwnProperty(p) && str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
      }
    };
    Http = Http_1 = __decorate([ ccclass ], Http);
    exports.default = Http;
    cc._RF.pop();
  }, {
    "./Configs": "Configs"
  } ],
  ItemRoom: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d5a03ey+QJIgbAT183oAXfT", "ItemRoom");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.RoomItemInfo = void 0;
    const BroadcastReceiver_1 = require("../../common/BroadcastReceiver");
    const Utils_1 = require("../../common/Utils");
    class RoomItemInfo {
      constructor(id, moneyBet, requiredMoney, userCount, maxUserPerRoom) {
        this.id = id;
        this.moneyBet = moneyBet;
        this.requiredMoney = requiredMoney;
        this.userCount = userCount;
        this.maxUserPerRoom = maxUserPerRoom;
      }
    }
    exports.RoomItemInfo = RoomItemInfo;
    const {ccclass: ccclass, property: property} = cc._decorator;
    let ItemRoom = class ItemRoom extends cc.Component {
      constructor() {
        super(...arguments);
        this.labelBet = null;
        this.labelBetMin = null;
        this.labelNumPlayers = null;
        this.labelMaxPlayers = null;
        this.labelStatus = null;
        this.background = null;
        this.backgroundFrames = [];
        this.roomInfo = null;
      }
      onLoad() {
        BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.SET_SOUND, this.node);
      }
      initItem(roomInfo) {
        this.roomInfo = roomInfo;
        this.labelBet.string = Utils_1.default.formatNumber(roomInfo.moneyBet);
        this.labelBetMin.string = Utils_1.default.formatNumber(roomInfo.requiredMoney);
        this.labelNumPlayers.string = roomInfo.userCount.toString();
        this.labelMaxPlayers.string = roomInfo.maxUserPerRoom.toString();
        this.background.spriteFrame = this.backgroundFrames[2 === roomInfo.maxUserPerRoom ? 0 : 1];
      }
      getRoomInfo() {
        return this.roomInfo;
      }
      isFull() {
        return this.roomInfo.userCount === this.roomInfo.maxUserPerRoom;
      }
    };
    __decorate([ property(cc.Label) ], ItemRoom.prototype, "labelBet", void 0);
    __decorate([ property(cc.Label) ], ItemRoom.prototype, "labelBetMin", void 0);
    __decorate([ property(cc.Label) ], ItemRoom.prototype, "labelNumPlayers", void 0);
    __decorate([ property(cc.Label) ], ItemRoom.prototype, "labelMaxPlayers", void 0);
    __decorate([ property(cc.Label) ], ItemRoom.prototype, "labelStatus", void 0);
    __decorate([ property(cc.Sprite) ], ItemRoom.prototype, "background", void 0);
    __decorate([ property([ cc.SpriteFrame ]) ], ItemRoom.prototype, "backgroundFrames", void 0);
    ItemRoom = __decorate([ ccclass ], ItemRoom);
    exports.default = ItemRoom;
    cc._RF.pop();
  }, {
    "../../common/BroadcastReceiver": "BroadcastReceiver",
    "../../common/Utils": "Utils"
  } ],
  "Language.Label": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "47fcfrB4HZCEqoTqVimESy9", "Language.Label");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const {ccclass: ccclass, property: property, requireComponent: requireComponent} = cc._decorator;
    const Language_LanguageManager_1 = require("./Language.LanguageManager");
    var Language;
    (function(Language) {
      let Label = class Label extends cc.Component {
        constructor() {
          super(...arguments);
          this.id = "";
        }
        start() {
          Language_LanguageManager_1.default.instance.addListener(() => {
            this.updateText();
          }, this);
          this.updateText();
        }
        updateText() {
          let str = Language_LanguageManager_1.default.instance.getString(this.id);
          if (null != str && 0 == str.trim().length) return;
          this.getComponent(cc.Label).string = str;
        }
      };
      __decorate([ property ], Label.prototype, "id", void 0);
      Label = __decorate([ ccclass, requireComponent(cc.Label) ], Label);
      Language.Label = Label;
    })(Language || (Language = {}));
    exports.default = Language.Label;
    cc._RF.pop();
  }, {
    "./Language.LanguageManager": "Language.LanguageManager"
  } ],
  "Language.LanguageManager": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9056c078b9CooLKGcYr/Ajy", "Language.LanguageManager");
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
    var Language;
    (function(Language) {
      var LanguageMananger_1;
      let LanguageMananger = LanguageMananger_1 = class LanguageMananger extends cc.Component {
        constructor() {
          super(...arguments);
          this.json = null;
          this.languageCode = "vi";
          this.texts = {};
          this.listeners = [];
        }
        onLoad() {
          LanguageMananger_1.instance = this;
          this.texts = JSON.parse(this.json.text);
        }
        setLanguage(languageCode) {
          this.languageCode = languageCode;
          for (var i = 0; i < this.listeners.length; i++) {
            var listener = this.listeners[i];
            if (listener.target && listener.target instanceof Object && listener.target.node) listener.callback(languageCode); else {
              this.listeners.splice(i, 1);
              i--;
            }
          }
        }
        addListener(callback, target) {
          this.listeners.push({
            callback: callback,
            target: target
          });
        }
        getString(id) {
          if (this.texts.hasOwnProperty(id) && this.texts[id].hasOwnProperty(this.languageCode)) return this.texts[id][this.languageCode];
          return id;
        }
      };
      LanguageMananger.instance = null;
      __decorate([ property(cc.TextAsset) ], LanguageMananger.prototype, "json", void 0);
      LanguageMananger = LanguageMananger_1 = __decorate([ ccclass ], LanguageMananger);
      Language.LanguageMananger = LanguageMananger;
    })(Language || (Language = {}));
    exports.default = Language.LanguageMananger;
    cc._RF.pop();
  }, {} ],
  "Language.Sprite": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d12e0gfdzJKtpZd8H4K9/SU", "Language.Sprite");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const {ccclass: ccclass, property: property, requireComponent: requireComponent} = cc._decorator;
    const Language_LanguageManager_1 = require("./Language.LanguageManager");
    var Language;
    (function(Language) {
      let Sprite = class Sprite extends cc.Component {
        constructor() {
          super(...arguments);
          this.sprFrameVi = null;
          this.sprFrameEn = null;
        }
        start() {
          Language_LanguageManager_1.default.instance.addListener(() => {
            this.updateSpriteFrame();
          }, this);
          this.updateSpriteFrame();
        }
        updateSpriteFrame() {
          switch (Language_LanguageManager_1.default.instance.languageCode) {
           case "en":
            this.getComponent(cc.Sprite).spriteFrame = this.sprFrameEn;
            break;

           default:
            this.getComponent(cc.Sprite).spriteFrame = this.sprFrameVi;
          }
        }
      };
      __decorate([ property(cc.SpriteFrame) ], Sprite.prototype, "sprFrameVi", void 0);
      __decorate([ property(cc.SpriteFrame) ], Sprite.prototype, "sprFrameEn", void 0);
      Sprite = __decorate([ ccclass, requireComponent(cc.Sprite) ], Sprite);
      Language.Sprite = Sprite;
    })(Language || (Language = {}));
    exports.default = Language.Sprite;
    cc._RF.pop();
  }, {
    "./Language.LanguageManager": "Language.LanguageManager"
  } ],
  "Lobby.Banner": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0e13fYP/XVNipyuLH/W7XkG", "Lobby.Banner");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const App_1 = require("../../Game/src/common/App");
    const BroadcastReceiver_1 = require("../../Game/src/common/BroadcastReceiver");
    const Configs_1 = require("../../Game/src/common/Configs");
    const Lobby_PopupMission_1 = require("./Lobby.PopupMission");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let LobbyBanner = class LobbyBanner extends cc.Component {
      constructor() {
        super(...arguments);
        this.bannerPageView = null;
        this.bannerItem = null;
      }
      start() {
        BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.SET_SOUND, this.node);
        cc.assetManager.getBundle(Configs_1.default.App.BUNDLE_NAME.MAIN).loadDir("Lobby/res/sprites/banners", cc.SpriteFrame, (error, banners) => {
          if (error) {
            cc.log(JSON.stringify(error));
            return;
          }
          banners.sort().forEach((banner, i) => {
            let bannerButton = cc.instantiate(this.bannerItem);
            bannerButton.getComponent(cc.Sprite).spriteFrame = banner;
            this.bannerPageView.addPage(bannerButton);
            switch (i) {
             case 0:
              bannerButton.on(cc.Node.EventType.TOUCH_END, event => {
                this.showMission();
              });
              break;

             case 1:
              bannerButton.on(cc.Node.EventType.TOUCH_END, event => {
                this.openLandingPage();
              });
            }
          });
          this.schedule(() => {
            let currentPageIndex = this.bannerPageView.getCurrentPageIndex();
            currentPageIndex++;
            currentPageIndex >= this.bannerPageView.getPages().length && (currentPageIndex = 0);
            this.bannerPageView.scrollToPage(currentPageIndex, .5);
          }, 5);
        });
      }
      showMission() {
        var _a;
        if (!Configs_1.default.Login.IsLogin) {
          App_1.default.instance.alertDialog.showMsg("B\u1ea1n ch\u01b0a \u0111\u0103ng nh\u1eadp.");
          return;
        }
        Lobby_PopupMission_1.default.createAndShow(App_1.default.instance.popups, "x3");
        null === (_a = App_1.default.instance.taiXiu) || void 0 === _a ? void 0 : _a.dismiss();
      }
      openLandingPage() {
        Configs_1.default.App.LANDING_PAGE && cc.sys.openURL(Configs_1.default.App.LANDING_PAGE);
      }
    };
    __decorate([ property(cc.PageView) ], LobbyBanner.prototype, "bannerPageView", void 0);
    __decorate([ property(cc.Node) ], LobbyBanner.prototype, "bannerItem", void 0);
    LobbyBanner = __decorate([ ccclass ], LobbyBanner);
    exports.default = LobbyBanner;
    cc._RF.pop();
  }, {
    "../../Game/src/common/App": "App",
    "../../Game/src/common/BroadcastReceiver": "BroadcastReceiver",
    "../../Game/src/common/Configs": "Configs",
    "./Lobby.PopupMission": "Lobby.PopupMission"
  } ],
  "Lobby.ButtonListJackpot": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8e015r6u01LKrMj/o90xAyW", "Lobby.ButtonListJackpot");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var ButtonListJackpot_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Tween_1 = require("../../Game/src/common/Tween");
    const BroadcastReceiver_1 = require("../../Game/src/common/BroadcastReceiver");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let ButtonListJackpot = ButtonListJackpot_1 = class ButtonListJackpot extends cc.Component {
      constructor() {
        super(...arguments);
        this.button = null;
        this.container = null;
        this.togglesBlind = null;
        this.labelsSlot1 = null;
        this.labelsSlot2 = null;
        this.labelsSlot3 = null;
        this.labelsSlot4 = null;
        this.labelsSlot5 = null;
        this.labelsSlot6 = null;
        this.labelsMiniPoker = null;
        this.labelsCaoThap = null;
        this.labelsSlot3x3 = null;
        this.buttonClicked = true;
        this.buttonMoved = cc.Vec2.ZERO;
        this.animate = false;
        this.selectedIdx = 0;
      }
      start() {
        BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.SET_SOUND, this.node);
        this.container.active = false;
        this.button.on(cc.Node.EventType.TOUCH_START, event => {
          this.buttonClicked = true;
          this.buttonMoved = cc.Vec2.ZERO;
        }, this);
        this.button.on(cc.Node.EventType.TOUCH_MOVE, event => {
          this.buttonMoved = this.buttonMoved.add(event.getDelta());
          if (this.buttonClicked) {
            if (Math.abs(this.buttonMoved.x) > 30 || Math.abs(this.buttonMoved.y) > 30) {
              let pos = this.node.position;
              pos.x += this.buttonMoved.x;
              pos.y += this.buttonMoved.y;
              this.node.position = pos;
              this.buttonClicked = false;
            }
          } else {
            let pos = this.node.position;
            pos.x += event.getDeltaX();
            pos.y += event.getDeltaY();
            this.node.position = pos;
          }
        }, this);
        this.button.on(cc.Node.EventType.TOUCH_END, event => {
          this.buttonClicked && this.toggleShowPanel();
        }, this);
        for (let i = 0; i < this.togglesBlind.toggleItems.length; i++) this.togglesBlind.toggleItems[i].node.on("toggle", () => {
          this.selectedIdx = i;
          this.updateJackpot(.3);
        });
      }
      toggleShowPanel() {
        if (this.animate) return;
        this.animate = true;
        if (this.container.active) {
          this.container.stopAllActions();
          this.container.runAction(cc.sequence(cc.scaleTo(.2, 1, 0).easing(cc.easeBackIn()), cc.callFunc(() => {
            this.container.active = false;
            this.animate = false;
          })));
        } else {
          this.container.stopAllActions();
          this.container.active = true;
          this.container.scaleY = 0;
          this.container.runAction(cc.sequence(cc.scaleTo(.2, 1).easing(cc.easeBackOut()), cc.callFunc(() => {
            this.animate = false;
          })));
        }
      }
      setData(res) {
        ButtonListJackpot_1.lastRes = res;
        this.updateJackpot();
      }
      updateJackpot(duration = 4) {
        if (null == ButtonListJackpot_1.lastRes) return;
        var pots = JSON.parse(ButtonListJackpot_1.lastRes.pots);
        switch (this.selectedIdx) {
         case 0:
          Tween_1.default.numberTo(this.labelsSlot2, pots.ndv["100"].p, duration);
          Tween_1.default.numberTo(this.labelsSlot4, pots.vqv["100"].p, duration);
          Tween_1.default.numberTo(this.labelsSlot5, pots.kb["100"].p, duration);
          Tween_1.default.numberTo(this.labelsSlot6, pots.sah["100"].p, duration);
          Tween_1.default.numberTo(this.labelsCaoThap, pots.caothap["1000"].p, duration);
          Tween_1.default.numberTo(this.labelsSlot3x3, pots.football["100"].p, duration);
          break;

         case 1:
          Tween_1.default.numberTo(this.labelsSlot2, pots.ndv["1000"].p, duration);
          Tween_1.default.numberTo(this.labelsSlot4, pots.vqv["1000"].p, duration);
          Tween_1.default.numberTo(this.labelsSlot5, pots.kb["1000"].p, duration);
          Tween_1.default.numberTo(this.labelsSlot6, pots.sah["1000"].p, duration);
          Tween_1.default.numberTo(this.labelsCaoThap, pots.caothap["10000"].p, duration);
          Tween_1.default.numberTo(this.labelsSlot3x3, pots.football["1000"].p, duration);
          break;

         case 2:
          Tween_1.default.numberTo(this.labelsSlot2, pots.ndv["10000"].p, duration);
          Tween_1.default.numberTo(this.labelsSlot4, pots.vqv["10000"].p, duration);
          Tween_1.default.numberTo(this.labelsSlot5, pots.kb["10000"].p, duration);
          Tween_1.default.numberTo(this.labelsSlot6, pots.sah["10000"].p, duration);
          Tween_1.default.numberTo(this.labelsCaoThap, pots.caothap["50000"].p, duration);
          Tween_1.default.numberTo(this.labelsSlot3x3, pots.football["10000"].p, duration);
        }
      }
    };
    ButtonListJackpot.lastRes = null;
    __decorate([ property(cc.Node) ], ButtonListJackpot.prototype, "button", void 0);
    __decorate([ property(cc.Node) ], ButtonListJackpot.prototype, "container", void 0);
    __decorate([ property(cc.ToggleContainer) ], ButtonListJackpot.prototype, "togglesBlind", void 0);
    __decorate([ property(cc.Label) ], ButtonListJackpot.prototype, "labelsSlot1", void 0);
    __decorate([ property(cc.Label) ], ButtonListJackpot.prototype, "labelsSlot2", void 0);
    __decorate([ property(cc.Label) ], ButtonListJackpot.prototype, "labelsSlot3", void 0);
    __decorate([ property(cc.Label) ], ButtonListJackpot.prototype, "labelsSlot4", void 0);
    __decorate([ property(cc.Label) ], ButtonListJackpot.prototype, "labelsSlot5", void 0);
    __decorate([ property(cc.Label) ], ButtonListJackpot.prototype, "labelsSlot6", void 0);
    __decorate([ property(cc.Label) ], ButtonListJackpot.prototype, "labelsMiniPoker", void 0);
    __decorate([ property(cc.Label) ], ButtonListJackpot.prototype, "labelsCaoThap", void 0);
    __decorate([ property(cc.Label) ], ButtonListJackpot.prototype, "labelsSlot3x3", void 0);
    ButtonListJackpot = ButtonListJackpot_1 = __decorate([ ccclass ], ButtonListJackpot);
    exports.default = ButtonListJackpot;
    cc._RF.pop();
  }, {
    "../../Game/src/common/BroadcastReceiver": "BroadcastReceiver",
    "../../Game/src/common/Tween": "Tween"
  } ],
  "Lobby.ButtonTanLoc": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7b273OO93hNrINBjZ9vI5Mz", "Lobby.ButtonTanLoc");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const App_1 = require("../../Game/src/common/App");
    const Configs_1 = require("../../Game/src/common/Configs");
    const Http_1 = require("../../Game/src/common/Http");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let ButtonTanLoc = class ButtonTanLoc extends cc.Component {
      constructor() {
        super(...arguments);
        this.lbTime = null;
        this.buttonClicked = true;
        this.buttonMoved = cc.Vec2.ZERO;
        this.scheduleBonusTime = null;
      }
      start() {
        this.node.active = false;
        this.lbTime.string = "00";
        this.node.on(cc.Node.EventType.TOUCH_START, event => {
          this.buttonClicked = true;
          this.buttonMoved = cc.Vec2.ZERO;
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, event => {
          this.buttonMoved = this.buttonMoved.add(event.getDelta());
          if (this.buttonClicked) {
            if (Math.abs(this.buttonMoved.x) > 30 || Math.abs(this.buttonMoved.y) > 30) {
              let pos = this.node.position;
              pos.x += this.buttonMoved.x;
              pos.y += this.buttonMoved.y;
              this.node.position = pos;
              this.buttonClicked = false;
            }
          } else {
            let pos = this.node.position;
            pos.x += event.getDeltaX();
            pos.y += event.getDeltaY();
            this.node.position = pos;
          }
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_END, event => {
          this.buttonClicked && this.actionButtonTanLoc();
        }, this);
      }
      onDestroy() {
        this.unschedule(this.scheduleBonusTime);
      }
      show() {
        this.node.active = true;
        this.lbTime.string = "00";
        this.getTanLocConfig();
      }
      hidden() {
        this.node.active = false;
      }
      actionButtonTanLoc() {
        App_1.default.instance.openTanLoc();
      }
      getTanLocConfig() {
        Http_1.default.get(Configs_1.default.App.API_TAN_LOC + "config", {}, (err, res) => {
          if (null != err) return;
          cc.log(res);
          let countDown = res.countDown;
          this.setCountDown(countDown);
          this.schedule(this.scheduleBonusTime = () => {
            countDown--;
            if (countDown >= 0) this.setCountDown(countDown); else {
              this.unschedule(this.scheduleBonusTime);
              this.getTanLocConfig();
            }
          }, 1);
        });
      }
      setCountDown(countDown) {
        let hours = Math.floor(countDown / 3600);
        let minutes = Math.floor((countDown - 60 * hours * 60) / 60);
        let seconds = Math.floor(countDown - 60 * hours * 60 - 60 * minutes);
        this.lbTime.string = [ hours < 10 ? "0" + hours : hours, minutes < 10 ? "0" + minutes : minutes, seconds < 10 ? "0" + seconds : seconds ].join(":");
      }
    };
    __decorate([ property(cc.Label) ], ButtonTanLoc.prototype, "lbTime", void 0);
    ButtonTanLoc = __decorate([ ccclass ], ButtonTanLoc);
    exports.default = ButtonTanLoc;
    cc._RF.pop();
  }, {
    "../../Game/src/common/App": "App",
    "../../Game/src/common/Configs": "Configs",
    "../../Game/src/common/Http": "Http"
  } ],
  "Lobby.Cmd": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0f735EbdP9I7rxnsMZMPXGY", "Lobby.Cmd");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.cmd = void 0;
    const Network_InPacket_1 = require("../../Game/src/networks/Network.InPacket");
    const Network_OutPacket_1 = require("../../Game/src/networks/Network.OutPacket");
    const Configs_1 = require("../../Game/src/common/Configs");
    const Constants_1 = require("../../Game/src/common/Constants");
    var cmd;
    (function(cmd) {
      class Code {}
      Code.UPDATE_TIME_BUTTON = 2124;
      Code.INSERT_GIFTCODE = 20017;
      Code.DEPOSIT_CARD = 20012;
      Code.CHECK_NICKNAME_TRANSFER = 20018;
      Code.SUBCRIBE_HALL_SLOT = 10001;
      Code.UNSUBCRIBE_HALL_SLOT = 10002;
      Code.UPDATE_JACKPOT_SLOTS = 10003;
      Code.SPIN_LUCKY_WHEEL = 20042;
      Code.GET_SECURITY_INFO = 20050;
      Code.UPDATE_USER_INFO = 20002;
      Code.GET_OTP = 20220;
      Code.SEND_OTP = 20019;
      Code.RESULT_ACTIVE_MOBILE = 20026;
      Code.RESULT_ACTIVE_NEW_MOBILE = 20028;
      Code.RESULT_CHANGE_MOBILE_ACTIVED = 20027;
      Code.ACTIVE_PHONE = 20006;
      Code.CHANGE_PHONE_NUMBER = 20007;
      Code.TRANSFER_COIN = 20014;
      Code.RESULT_TRANSFER_COIN = 20034;
      Code.SAFES = 20009;
      Code.RESULT_SAFES = 20029;
      Code.CHANGE_PASSWORD = 2e4;
      Code.RESULT_CHANGE_PASSWORD = 20020;
      Code.EXCHANGE_VIP_POINT = 20001;
      Code.RESULT_EXCHANGE_VIP_POINT = 20021;
      Code.NOTIFY_MARQUEE = 20100;
      Code.UPDATE_JACKPOTS = 20101;
      Code.SUBCRIBE_JACPORTS = 20102;
      Code.UNSUBCRIBE_JACPORTS = 20103;
      Code.GET_MONEY_USE = 20051;
      Code.BUY_CARD = 20015;
      Code.BUY_CARD_RESULT = 20035;
      Code.UPDATE_USER_MONEY = 21e3;
      cmd.Code = Code;
      class ReceiveUpdateTimeButton extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.remainTime = 0;
          this.bettingState = false;
          this.remainTime = this.getByte();
          this.bettingState = this.getBool();
        }
      }
      cmd.ReceiveUpdateTimeButton = ReceiveUpdateTimeButton;
      class ReqInsertGiftcode extends Network_OutPacket_1.default {
        constructor(code) {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.INSERT_GIFTCODE);
          this.packHeader();
          this.putString(code);
          this.updateSize();
        }
      }
      cmd.ReqInsertGiftcode = ReqInsertGiftcode;
      class ResInsertGiftcode extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.error = 0;
          this.currentMoneyVin = 0;
          this.currentMoneyXu = 0;
          this.moneyGiftCodeVin = 0;
          this.moneyGiftCodeXu = 0;
          this.error = this.getError();
          this.currentMoneyVin = this.getLong();
          this.currentMoneyXu = this.getLong();
          this.moneyGiftCodeVin = this.getLong();
          this.moneyGiftCodeXu = this.getLong();
        }
      }
      cmd.ResInsertGiftcode = ResInsertGiftcode;
      class ReqDepositCard extends Network_OutPacket_1.default {
        constructor(telcoId, serial, code, amount) {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.DEPOSIT_CARD);
          this.packHeader();
          this.putByte(telcoId);
          this.putString(serial);
          this.putString(code);
          this.putString(amount);
          this.updateSize();
        }
      }
      cmd.ReqDepositCard = ReqDepositCard;
      class ResDepositCard extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.error = 0;
          this.currentMoney = 0;
          this.timeFail = 0;
          this.numFail = 0;
          this.error = this.getError();
          this.currentMoney = this.getLong();
          this.timeFail = this.getLong();
          this.numFail = this.getInt();
        }
      }
      cmd.ResDepositCard = ResDepositCard;
      class ReqCheckNicknameTransfer extends Network_OutPacket_1.default {
        constructor(nickname) {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.CHECK_NICKNAME_TRANSFER);
          this.packHeader();
          this.putString(nickname);
          this.updateSize();
        }
      }
      cmd.ReqCheckNicknameTransfer = ReqCheckNicknameTransfer;
      class ResCheckNicknameTransfer extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.error = 0;
          this.type = 0;
          this.fee = 0;
          this.error = this.getError();
          this.type = this.getByte();
          this.fee = this.getByte();
        }
      }
      cmd.ResCheckNicknameTransfer = ResCheckNicknameTransfer;
      class ReqSpinLuckyWheel extends Network_OutPacket_1.default {
        constructor() {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.SPIN_LUCKY_WHEEL);
          this.packHeader();
          this.updateSize();
        }
      }
      cmd.ReqSpinLuckyWheel = ReqSpinLuckyWheel;
      class ResSpinLuckyWheel extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.error = 0;
          this.prizeVin = "";
          this.prizeXu = "";
          this.prizeSlot = "";
          this.remainCount = 0;
          this.currentMoneyVin = 0;
          this.currentMoneyXu = 0;
          this.error = this.getError();
          this.prizeVin = this.getString();
          this.prizeXu = this.getString();
          this.prizeSlot = this.getString();
          this.remainCount = this.getShort();
          this.currentMoneyVin = this.getLong();
          this.currentMoneyXu = this.getLong();
        }
      }
      cmd.ResSpinLuckyWheel = ResSpinLuckyWheel;
      class ReqGetSecurityInfo extends Network_OutPacket_1.default {
        constructor() {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.GET_SECURITY_INFO);
          this.packHeader();
          this.updateSize();
        }
      }
      cmd.ReqGetSecurityInfo = ReqGetSecurityInfo;
      class ResGetSecurityInfo extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.error = 0;
          this.username = "";
          this.cmt = "";
          this.email = "";
          this.mobile = "";
          this.mobileSecure = 0;
          this.emailSecure = 0;
          this.appSecure = 0;
          this.loginSecure = 0;
          this.moneyLoginOtp = 0;
          this.moneyUse = 0;
          this.safe = 0;
          this.configGame = "";
          this.error = this.getError();
          this.username = this.getString();
          this.cmt = this.getString();
          this.email = this.getString();
          this.mobile = this.getString();
          this.mobileSecure = this.getByte();
          this.emailSecure = this.getByte();
          this.appSecure = this.getByte();
          this.loginSecure = this.getByte();
          this.moneyLoginOtp = this.getLong();
          this.moneyUse = this.getLong();
          this.safe = this.getLong();
          this.configGame = this.getString();
        }
      }
      cmd.ResGetSecurityInfo = ResGetSecurityInfo;
      class ReqUpdateUserInfo extends Network_OutPacket_1.default {
        constructor(phoneNumber) {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.UPDATE_USER_INFO);
          this.packHeader();
          this.putString("");
          this.putString("");
          this.putString(phoneNumber);
          this.updateSize();
        }
      }
      cmd.ReqUpdateUserInfo = ReqUpdateUserInfo;
      class ResUpdateUserInfo extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.error = 0;
          this.error = this.getError();
        }
      }
      cmd.ResUpdateUserInfo = ResUpdateUserInfo;
      class ReqGetOTP extends Network_OutPacket_1.default {
        constructor() {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.GET_OTP);
          this.packHeader();
          this.updateSize();
        }
      }
      cmd.ReqGetOTP = ReqGetOTP;
      class ResGetOTP extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.error = 0;
          this.error = this.getError();
        }
      }
      cmd.ResGetOTP = ResGetOTP;
      class ReqSendOTP extends Network_OutPacket_1.default {
        constructor(otp, type) {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.SEND_OTP);
          this.packHeader();
          this.putString(otp);
          this.putByte(type);
          this.updateSize();
        }
      }
      cmd.ReqSendOTP = ReqSendOTP;
      class ResSendOTP extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.error = 0;
          this.error = this.getError();
        }
      }
      cmd.ResSendOTP = ResSendOTP;
      class ResResultActiveMobie extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.error = 0;
          this.error = this.getError();
        }
      }
      cmd.ResResultActiveMobie = ResResultActiveMobie;
      class ResResultActiveNewMobie extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.error = 0;
          this.error = this.getError();
        }
      }
      cmd.ResResultActiveNewMobie = ResResultActiveNewMobie;
      class ReqChangePhoneNumber extends Network_OutPacket_1.default {
        constructor(phoneNumber) {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.CHANGE_PHONE_NUMBER);
          this.packHeader();
          this.putString(phoneNumber);
          this.updateSize();
        }
      }
      cmd.ReqChangePhoneNumber = ReqChangePhoneNumber;
      class ResChangePhoneNumber extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.error = 0;
          this.error = this.getError();
        }
      }
      cmd.ResChangePhoneNumber = ResChangePhoneNumber;
      class ReqActivePhone extends Network_OutPacket_1.default {
        constructor() {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.ACTIVE_PHONE);
          this.packHeader();
          this.updateSize();
        }
      }
      cmd.ReqActivePhone = ReqActivePhone;
      class ResActivePhone extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.error = 0;
          this.error = this.getError();
        }
      }
      cmd.ResActivePhone = ResActivePhone;
      class ReqTransferCoin extends Network_OutPacket_1.default {
        constructor(nickname, coin, note, otp) {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.TRANSFER_COIN);
          this.packHeader();
          this.putString(nickname);
          this.putLong(coin);
          this.putString(unescape(encodeURIComponent(note)));
          this.putString(otp);
          this.updateSize();
        }
      }
      cmd.ReqTransferCoin = ReqTransferCoin;
      class ResTransferCoin extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.error = 0;
          this.moneyUse = 0;
          this.desc = "";
          this.actions = [];
          this.error = this.getError();
          this.moneyUse = this.getLong();
          this.desc = this.getString();
          let actionsStr = this.getString();
          if (actionsStr) {
            let actions = JSON.parse(actionsStr);
            actions.hasOwnProperty("object") && Array.isArray(actions["object"]) && (this.actions = Constants_1.UserActions.toEnums(actions["object"]));
          }
        }
      }
      cmd.ResTransferCoin = ResTransferCoin;
      class ResResultTransferCoin extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.error = 0;
          this.moneyUse = 0;
          this.currentMoney = 0;
          this.error = this.getError();
          this.moneyUse = this.getLong();
          this.currentMoney = this.getLong();
        }
      }
      cmd.ResResultTransferCoin = ResResultTransferCoin;
      class ReqSafes extends Network_OutPacket_1.default {
        constructor(coin, action) {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.SAFES);
          this.packHeader();
          this.putByte(action);
          this.putLong(coin);
          this.updateSize();
        }
      }
      cmd.ReqSafes = ReqSafes;
      class ResSafes extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.error = 0;
          this.moneyUse = 0;
          this.safe = 0;
          this.error = this.getError();
          this.moneyUse = this.getLong();
          this.safe = this.getLong();
        }
      }
      cmd.ResSafes = ResSafes;
      class ResResultSafes extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.error = 0;
          this.moneyUse = 0;
          this.safe = 0;
          this.currentMoney = 0;
          this.error = this.getError();
          this.moneyUse = this.getLong();
          this.safe = this.getLong();
          this.currentMoney = this.getLong();
        }
      }
      cmd.ResResultSafes = ResResultSafes;
      class ReqChangePassword extends Network_OutPacket_1.default {
        constructor(oldPassword, newPassword) {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.CHANGE_PASSWORD);
          this.packHeader();
          this.putString(md5(oldPassword));
          this.putString(md5(newPassword));
          this.updateSize();
        }
      }
      cmd.ReqChangePassword = ReqChangePassword;
      class ResChangePassword extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.error = 0;
          this.error = this.getError();
        }
      }
      cmd.ResChangePassword = ResChangePassword;
      class ResResultChangePassword extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.error = 0;
          this.error = this.getError();
        }
      }
      cmd.ResResultChangePassword = ResResultChangePassword;
      class ReqExchangeVipPoint extends Network_OutPacket_1.default {
        constructor() {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.EXCHANGE_VIP_POINT);
          this.packHeader();
          this.updateSize();
        }
      }
      cmd.ReqExchangeVipPoint = ReqExchangeVipPoint;
      class ResExchangeVipPoint extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.error = 0;
          this.error = this.getError();
        }
      }
      cmd.ResExchangeVipPoint = ResExchangeVipPoint;
      class ResResultExchangeVipPoint extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.error = 0;
          this.currentMoney = 0;
          this.moneyAdd = 0;
          this.error = this.getError();
          this.currentMoney = this.getLong();
          this.moneyAdd = this.getLong();
        }
      }
      cmd.ResResultExchangeVipPoint = ResResultExchangeVipPoint;
      class ResNotifyMarquee extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.message = "";
          this.message = this.getString();
        }
      }
      cmd.ResNotifyMarquee = ResNotifyMarquee;
      class ReqSubcribeJackpots extends Network_OutPacket_1.default {
        constructor() {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.SUBCRIBE_JACPORTS);
          this.packHeader();
          this.updateSize();
        }
      }
      cmd.ReqSubcribeJackpots = ReqSubcribeJackpots;
      class ReqUnSubcribeJackpots extends Network_OutPacket_1.default {
        constructor() {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.UNSUBCRIBE_JACPORTS);
          this.packHeader();
          this.updateSize();
        }
      }
      cmd.ReqUnSubcribeJackpots = ReqUnSubcribeJackpots;
      class ResUpdateJackpots extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.miniPoker100 = 0;
          this.miniPoker1000 = 0;
          this.miniPoker10000 = 0;
          this.pokeGo100 = 0;
          this.pokeGo1000 = 0;
          this.pokeGo10000 = 0;
          this.khoBau100 = 0;
          this.khoBau1000 = 0;
          this.khoBau10000 = 0;
          this.NDV100 = 0;
          this.NDV1000 = 0;
          this.NDV10000 = 0;
          this.Avengers100 = 0;
          this.Avengers1000 = 0;
          this.Avengers10000 = 0;
          this.Vqv100 = 0;
          this.Vqv1000 = 0;
          this.Vqv10000 = 0;
          this.fish100 = 0;
          this.fish1000 = 0;
          this.miniPoker100 = this.getLong();
          this.miniPoker1000 = this.getLong();
          this.miniPoker10000 = this.getLong();
          this.pokeGo100 = this.getLong();
          this.pokeGo1000 = this.getLong();
          this.pokeGo10000 = this.getLong();
          this.khoBau100 = this.getLong();
          this.khoBau1000 = this.getLong();
          this.khoBau10000 = this.getLong();
          this.NDV100 = this.getLong();
          this.NDV1000 = this.getLong();
          this.NDV10000 = this.getLong();
          this.Avengers100 = this.getLong();
          this.Avengers1000 = this.getLong();
          this.Avengers10000 = this.getLong();
          this.Vqv100 = this.getLong();
          this.Vqv1000 = this.getLong();
          this.Vqv10000 = this.getLong();
          this.fish100 = this.getLong();
          this.fish1000 = this.getLong();
        }
      }
      cmd.ResUpdateJackpots = ResUpdateJackpots;
      class ReqGetMoneyUse extends Network_OutPacket_1.default {
        constructor() {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.GET_MONEY_USE);
          this.packHeader();
          this.updateSize();
        }
      }
      cmd.ReqGetMoneyUse = ReqGetMoneyUse;
      class ResGetMoneyUse extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.moneyUse = 0;
          this.moneyUse = this.getLong();
        }
      }
      cmd.ResGetMoneyUse = ResGetMoneyUse;
      class ReqSubcribeHallSlot extends Network_OutPacket_1.default {
        constructor() {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.SUBCRIBE_HALL_SLOT);
          this.packHeader();
          this.updateSize();
        }
      }
      cmd.ReqSubcribeHallSlot = ReqSubcribeHallSlot;
      class ReqUnSubcribeHallSlot extends Network_OutPacket_1.default {
        constructor() {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.UNSUBCRIBE_HALL_SLOT);
          this.packHeader();
          this.updateSize();
        }
      }
      cmd.ReqUnSubcribeHallSlot = ReqUnSubcribeHallSlot;
      class ResUpdateJackpotSlots extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.pots = "";
          this.pots = this.getString();
        }
      }
      cmd.ResUpdateJackpotSlots = ResUpdateJackpotSlots;
      class ReqBuyCard extends Network_OutPacket_1.default {
        constructor(provider, amountIdx, count) {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.BUY_CARD);
          this.packHeader();
          this.putByte(provider);
          this.putByte(amountIdx);
          this.putByte(count);
          this.updateSize();
        }
      }
      cmd.ReqBuyCard = ReqBuyCard;
      class ResBuyCard extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.error = 0;
          this.error = this.getError();
        }
      }
      cmd.ResBuyCard = ResBuyCard;
      class ResBuyCardResult extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.error = 0;
          this.currentMoney = 0;
          this.softpin = "";
          this.error = this.getError();
          this.currentMoney = this.getLong();
          this.softpin = this.getString();
        }
      }
      cmd.ResBuyCardResult = ResBuyCardResult;
      class ResUpdateUserMoney extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.error = 0;
          this.desc = this.getString();
          this.nickName = this.getString();
          this.changeMoney = this.getLong();
          this.totalMoney = this.getLong();
          this.showPopup = this.getBool();
        }
      }
      cmd.ResUpdateUserMoney = ResUpdateUserMoney;
      class TxCode {}
      TxCode.SCRIBE = 2e3;
      TxCode.UPDATE_TIME = 2112;
      TxCode.DICES_RESULT = 2113;
      cmd.TxCode = TxCode;
      class SendScribe extends Network_OutPacket_1.default {
        constructor() {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(TxCode.SCRIBE);
          this.packHeader();
          this.putShort(Configs_1.default.GameId.TaiXiuMD5);
          this.putShort(Configs_1.default.App.MONEY_TYPE);
          this.updateSize();
        }
      }
      cmd.SendScribe = SendScribe;
      class ReceiveUpdateTime extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.remainTime = 0;
          this.bettingState = false;
          this.potTai = 0;
          this.potXiu = 0;
          this.numBetTai = 0;
          this.numBetXiu = 0;
          this.remainTime = this.getShort();
          this.bettingState = this.getBool();
          this.potTai = this.getLong();
          this.potXiu = this.getLong();
          this.numBetTai = this.getShort();
          this.numBetXiu = this.getShort();
        }
      }
      cmd.ReceiveUpdateTime = ReceiveUpdateTime;
      class ReceiveDicesResult extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.result = 0;
          this.dice1 = 0;
          this.dice2 = 0;
          this.dice3 = 0;
          this.result = this.getShort();
          this.dice1 = this.getShort();
          this.dice2 = this.getShort();
          this.dice3 = this.getShort();
        }
      }
      cmd.ReceiveDicesResult = ReceiveDicesResult;
    })(cmd = exports.cmd || (exports.cmd = {}));
    exports.default = cmd;
    cc._RF.pop();
  }, {
    "../../Game/src/common/Configs": "Configs",
    "../../Game/src/common/Constants": "Constants",
    "../../Game/src/networks/Network.InPacket": "Network.InPacket",
    "../../Game/src/networks/Network.OutPacket": "Network.OutPacket"
  } ],
  "Lobby.DropdownBank": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5df48ZZHeZIPa7yaIqsZuxE", "Lobby.DropdownBank");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Configs_1 = require("../../Game/src/common/Configs");
    const Dropdown_1 = require("../../Game/src/common/Dropdown");
    const DropdownItem_1 = require("../../Game/src/common/DropdownItem");
    const ErrorLogger_1 = require("../../Game/src/common/ErrorLogger");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let DropdownBank = class DropdownBank extends Dropdown_1.default {
      constructor() {
        super(...arguments);
        this.icon = null;
        this.sprBankIcons = [];
        this.data = [];
      }
      setOptions(data) {
        try {
          this.data = data;
          var childen = this.itemTemplate.node.parent.children;
          for (var i = 0; i < childen.length; i++) childen[i].active = false;
          this.items = [];
          for (var i = 0; i < data.length; i++) {
            var item = this.getItem();
            item.idx = i;
            item.label.string = data[i].bankName;
            item.node.getChildByName("icon").getComponent(cc.Sprite).spriteFrame = this.sprBankIcons.find(spr => spr.name === Configs_1.default.Payment.getBankCode(data[i].bankCode));
            item.checkMark.active = i == this.value;
            this.items.push(item);
          }
        } catch (error) {
          ErrorLogger_1.ErrorLogger.sendLogError("Object error", "Dropdown bank", JSON.stringify(error.stack));
        }
      }
      setValue(value) {
        this.value = value < this.data.length && value > -1 ? value : -1;
        this.onValueChange && this.onValueChange(this.value);
      }
      getItem() {
        try {
          var node = null;
          var childen = this.itemTemplate.node.parent.children;
          for (var i = 0; i < childen.length; i++) childen[i].active || childen[i] == this.itemTemplate.node || (node = childen[i]);
          if (null == node) {
            node = cc.instantiate(this.itemTemplate.node);
            node.parent = this.itemTemplate.node.parent;
            node.on("click", target => {
              this.value = target.getComponent(DropdownItem_1.default).idx;
              this.label.string = this.data[this.value].bankName;
              this.icon.spriteFrame = this.sprBankIcons.find(spr => spr.name === Configs_1.default.Payment.getBankCode(this.data[this.value].bankCode));
              this.onValueChange && this.onValueChange(this.value);
              this.dismiss();
            }, this);
          }
          node.active = true;
          node.zIndex = this.getLastZIndex();
          return node.getComponent(DropdownItem_1.default);
        } catch (error) {
          ErrorLogger_1.ErrorLogger.sendLogError("Object error", "Dropdown bank", JSON.stringify(error.stack));
        }
      }
    };
    __decorate([ property(cc.Sprite) ], DropdownBank.prototype, "icon", void 0);
    __decorate([ property([ cc.SpriteFrame ]) ], DropdownBank.prototype, "sprBankIcons", void 0);
    DropdownBank = __decorate([ ccclass ], DropdownBank);
    exports.default = DropdownBank;
    cc._RF.pop();
  }, {
    "../../Game/src/common/Configs": "Configs",
    "../../Game/src/common/Dropdown": "Dropdown",
    "../../Game/src/common/DropdownItem": "DropdownItem",
    "../../Game/src/common/ErrorLogger": "ErrorLogger"
  } ],
  "Lobby.DropdownTelco": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1341cW2jWhL5KoF/t27xWm4", "Lobby.DropdownTelco");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Configs_1 = require("../../Game/src/common/Configs");
    const Dropdown_1 = require("../../Game/src/common/Dropdown");
    const DropdownItem_1 = require("../../Game/src/common/DropdownItem");
    const ErrorLogger_1 = require("../../Game/src/common/ErrorLogger");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let DropdownTelco = class DropdownTelco extends Dropdown_1.default {
      constructor() {
        super(...arguments);
        this.icon = null;
        this.sprTelcoIcons = [];
        this.data = [];
      }
      setOptions(data) {
        try {
          this.data = data;
          var childen = this.itemTemplate.node.parent.children;
          for (var i = 0; i < childen.length; i++) childen[i].active = false;
          this.items = [];
          for (var i = 0; i < data.length; i++) {
            var item = this.getItem();
            item.idx = i;
            item.label.string = Configs_1.default.App.TELCO_NAME[data[i]];
            item.node.getChildByName("icon").getComponent(cc.Sprite).spriteFrame = this.sprTelcoIcons.find(spr => spr.name === data[i]);
            item.checkMark.active = i == this.value;
            this.items.push(item);
          }
        } catch (error) {
          ErrorLogger_1.ErrorLogger.sendLogError("Object error", "Dropdown telco", JSON.stringify(error.stack));
        }
      }
      setValue(value) {
        this.value = value < this.data.length && value > -1 ? value : -1;
        this.onValueChange && this.onValueChange(this.value);
      }
      getItem() {
        try {
          var node = null;
          var childen = this.itemTemplate.node.parent.children;
          for (var i = 0; i < childen.length; i++) childen[i].active || childen[i] == this.itemTemplate.node || (node = childen[i]);
          if (null == node) {
            node = cc.instantiate(this.itemTemplate.node);
            node.parent = this.itemTemplate.node.parent;
            node.on("click", target => {
              this.value = target.getComponent(DropdownItem_1.default).idx;
              this.label.string = Configs_1.default.App.TELCO_NAME[this.data[this.value]];
              this.icon.spriteFrame = this.sprTelcoIcons.find(spr => spr.name === this.data[this.value]);
              this.onValueChange && this.onValueChange(this.value);
              this.dismiss();
            }, this);
          }
          node.active = true;
          node.zIndex = this.getLastZIndex();
          return node.getComponent(DropdownItem_1.default);
        } catch (error) {
          ErrorLogger_1.ErrorLogger.sendLogError("Object error", "Dropdown telco", JSON.stringify(error.stack));
        }
      }
    };
    __decorate([ property(cc.Sprite) ], DropdownTelco.prototype, "icon", void 0);
    __decorate([ property([ cc.SpriteFrame ]) ], DropdownTelco.prototype, "sprTelcoIcons", void 0);
    DropdownTelco = __decorate([ ccclass ], DropdownTelco);
    exports.default = DropdownTelco;
    cc._RF.pop();
  }, {
    "../../Game/src/common/Configs": "Configs",
    "../../Game/src/common/Dropdown": "Dropdown",
    "../../Game/src/common/DropdownItem": "DropdownItem",
    "../../Game/src/common/ErrorLogger": "ErrorLogger"
  } ],
  "Lobby.ItemGame": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9e11294F1RIspsl8Pbos8PZ", "Lobby.ItemGame");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.ItemGameType = void 0;
    const BroadcastReceiver_1 = require("../../Game/src/common/BroadcastReceiver");
    const {ccclass: ccclass, property: property} = cc._decorator;
    var ItemGameType;
    (function(ItemGameType) {
      ItemGameType[ItemGameType["OTHER"] = 0] = "OTHER";
      ItemGameType[ItemGameType["SLOT"] = 1] = "SLOT";
      ItemGameType[ItemGameType["MINIGAME"] = 2] = "MINIGAME";
      ItemGameType[ItemGameType["CARD"] = 3] = "CARD";
    })(ItemGameType = exports.ItemGameType || (exports.ItemGameType = {}));
    let ItemGame = class ItemGame extends cc.Component {
      constructor() {
        super(...arguments);
        this.id = "";
        this.type = ItemGameType.OTHER;
      }
      start() {
        BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.SET_SOUND, this.node);
      }
    };
    __decorate([ property ], ItemGame.prototype, "id", void 0);
    __decorate([ property({
      type: cc.Enum(ItemGameType)
    }) ], ItemGame.prototype, "type", void 0);
    ItemGame = __decorate([ ccclass ], ItemGame);
    exports.default = ItemGame;
    cc._RF.pop();
  }, {
    "../../Game/src/common/BroadcastReceiver": "BroadcastReceiver"
  } ],
  "Lobby.ItemSlotGame": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "055a4EkUg9Bd5lySOl45ghW", "Lobby.ItemSlotGame");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Lobby_ItemGame_1 = require("./Lobby.ItemGame");
    const Utils_1 = require("../../Game/src/common/Utils");
    const Tween_1 = require("../../Game/src/common/Tween");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let ItemSlotGame = class ItemSlotGame extends Lobby_ItemGame_1.default {
      constructor() {
        super(...arguments);
        this.lblJackpots = [];
        this.fakeJackpot = false;
        this.jackpot0 = 0;
        this.jackpotMax0 = 0;
        this.jackpot1 = 0;
        this.jackpotMax1 = 0;
        this.jackpot2 = 0;
        this.jackpotMax2 = 0;
        this.updateNext0 = 0;
        this.updateNext1 = 0;
        this.updateNext2 = 0;
      }
      start() {
        if (this.fakeJackpot) {
          let scale = 100;
          this.jackpot0 = Utils_1.default.randomRangeInt(5e3 * scale, 6e3 * scale);
          scale = 1e3;
          this.jackpot1 = Utils_1.default.randomRangeInt(5e3 * scale, 6e3 * scale);
          scale = 1e4;
          this.jackpot2 = Utils_1.default.randomRangeInt(5e3 * scale, 6e3 * scale);
          scale = 100;
          this.jackpotMax0 = this.jackpot0 + Utils_1.default.randomRangeInt(2e3 * scale, 4e3 * scale);
          scale = 1e3;
          this.jackpotMax1 = this.jackpot1 + Utils_1.default.randomRangeInt(2e3 * scale, 4e3 * scale);
          scale = 1e4;
          this.jackpotMax2 = this.jackpot2 + Utils_1.default.randomRangeInt(2e3 * scale, 4e3 * scale);
          Tween_1.default.numberTo(this.lblJackpots[0], this.jackpot0, 1);
          Tween_1.default.numberTo(this.lblJackpots[1], this.jackpot1, 1);
          Tween_1.default.numberTo(this.lblJackpots[2], this.jackpot2, 1);
          this.updateNext0 = Utils_1.default.randomRangeInt(3, 10);
          this.updateNext1 = Utils_1.default.randomRangeInt(3, 10);
          this.updateNext2 = Utils_1.default.randomRangeInt(3, 10);
        }
      }
      update(dt) {
        if (this.fakeJackpot) {
          if (this.updateNext0 > 0) {
            this.updateNext0 -= dt;
            if (this.updateNext0 < 0) {
              this.updateNext0 = Utils_1.default.randomRangeInt(3, 10);
              let scale = 100;
              this.jackpot0 += Utils_1.default.randomRangeInt(.5 * scale, .7 * scale);
              if (this.jackpot0 > this.jackpotMax0) {
                this.jackpot0 = 5e3 * scale;
                this.jackpotMax0 = this.jackpot0 + Utils_1.default.randomRangeInt(2e3 * scale, 4e3 * scale);
              }
              Tween_1.default.numberTo(this.lblJackpots[0], this.jackpot0, 1);
              this.lblJackpots[0].string = Utils_1.default.formatNumber(this.jackpot0);
            }
          }
          if (this.updateNext1 > 0) {
            this.updateNext1 -= dt;
            if (this.updateNext1 < 0) {
              this.updateNext1 = Utils_1.default.randomRangeInt(3, 10);
              let scale = 1e3;
              this.jackpot1 += Utils_1.default.randomRangeInt(5 * scale, 7 * scale);
              if (this.jackpot1 > this.jackpotMax1) {
                this.jackpot1 = 5e3 * scale;
                this.jackpotMax1 = this.jackpot1 + Utils_1.default.randomRangeInt(2e3 * scale, 4e3 * scale);
              }
              Tween_1.default.numberTo(this.lblJackpots[1], this.jackpot1, 1);
              this.lblJackpots[1].string = Utils_1.default.formatNumber(this.jackpot1);
            }
          }
          if (this.updateNext2 > 0) {
            this.updateNext2 -= dt;
            if (this.updateNext2 < 0) {
              this.updateNext2 = Utils_1.default.randomRangeInt(3, 10);
              let scale = 1e4;
              this.jackpot2 += Utils_1.default.randomRangeInt(50 * scale, 70 * scale);
              if (this.jackpot2 > this.jackpotMax2) {
                this.jackpot2 = 5e3 * scale;
                this.jackpotMax2 = this.jackpot2 + Utils_1.default.randomRangeInt(2e3 * scale, 4e3 * scale);
              }
              Tween_1.default.numberTo(this.lblJackpots[2], this.jackpot2, 1);
              this.lblJackpots[2].string = Utils_1.default.formatNumber(this.jackpot2);
            }
          }
        }
      }
    };
    __decorate([ property([ cc.Label ]) ], ItemSlotGame.prototype, "lblJackpots", void 0);
    __decorate([ property ], ItemSlotGame.prototype, "fakeJackpot", void 0);
    ItemSlotGame = __decorate([ ccclass ], ItemSlotGame);
    exports.default = ItemSlotGame;
    cc._RF.pop();
  }, {
    "../../Game/src/common/Tween": "Tween",
    "../../Game/src/common/Utils": "Utils",
    "./Lobby.ItemGame": "Lobby.ItemGame"
  } ],
  "Lobby.LobbyController": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "05872A3wjpOT464qKBM+MO6", "Lobby.LobbyController");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const App_1 = require("../../Game/src/common/App");
    const Http_1 = require("../../Game/src/common/Http");
    const Configs_1 = require("../../Game/src/common/Configs");
    const MiniGameNetworkClient_1 = require("../../Game/src/networks/MiniGameNetworkClient");
    const TXMD5NetworkClient_1 = require("../../Game/src/networks/TXMD5NetworkClient");
    const BroadcastReceiver_1 = require("../../Game/src/common/BroadcastReceiver");
    const Tween_1 = require("../../Game/src/common/Tween");
    const SlotNetworkClient_1 = require("../../Game/src/networks/SlotNetworkClient");
    const TienLenNetworkClient_1 = require("../../Game/src/networks/TienLenNetworkClient");
    const SamNetworkClient_1 = require("../../Game/src/networks/SamNetworkClient");
    const Lobby_Cmd_1 = require("./Lobby.Cmd");
    const Network_InPacket_1 = require("../../Game/src/networks/Network.InPacket");
    const Lobby_TabsListGame_1 = require("./Lobby.TabsListGame");
    const Utils_1 = require("../../Game/src/common/Utils");
    const Lobby_ButtonListJackpot_1 = require("./Lobby.ButtonListJackpot");
    const ShootFishNetworkClient_1 = require("../../Game/src/networks/ShootFishNetworkClient");
    const Common_AudioManager_1 = require("../../Game/src/common/Common.AudioManager");
    const Lobby_PopupCashOut_1 = require("./Lobby.PopupCashOut");
    const Lobby_PopupProfile_1 = require("./Lobby.PopupProfile");
    const Lobby_PopupRegister_1 = require("./Authorization/Lobby.PopupRegister");
    const Lobby_PopupLogin_1 = require("./Authorization/Lobby.PopupLogin");
    const Lobby_PopupShop_1 = require("./Lobby.PopupShop");
    const Lobby_PopupSetting_1 = require("./Lobby.PopupSetting");
    const AuthorizationResponseData_1 = require("./Authorization/AuthorizationResponseData");
    const MauBinhNetworkClient_1 = require("../../Game/src/networks/MauBinhNetworkClient");
    const Lobby_PopupMailBox_1 = require("./Lobby.PopupMailBox");
    const Lobby_PopupVippoint_1 = require("./Vippoint/Lobby.PopupVippoint");
    const Lobby_PopupCustomerCare_1 = require("./Lobby.PopupCustomerCare");
    const LobbyResponseData_1 = require("./LobbyResponseData/LobbyResponseData");
    const Constants_1 = require("../../Game/src/common/Constants");
    const Lobby_PopupVippointRankUp_1 = require("./Vippoint/Lobby.PopupVippointRankUp");
    const AuthorizationController_1 = require("./Authorization/AuthorizationController");
    const ErrorLogger_1 = require("../../Game/src/common/ErrorLogger");
    const Lobby_PopupMission_1 = require("./Lobby.PopupMission");
    const Lobby_ButtonTanLoc_1 = require("./Lobby.ButtonTanLoc");
    const {ccclass: ccclass, property: property} = cc._decorator;
    var Lobby;
    (function(Lobby) {
      var LobbyController_1;
      let LobbyController = LobbyController_1 = class LobbyController extends cc.Component {
        constructor() {
          super(...arguments);
          this.panelNotLogin = null;
          this.panelLogined = null;
          this.bottomBar = null;
          this.sprAvatar = null;
          this.lblNickname = null;
          this.lblVipPoint = null;
          this.spriteProgressVipPoint = null;
          this.iconVipPoint = null;
          this.lblCoin = null;
          this.lblCoinFish = null;
          this.txtNotifyMarquee = null;
          this.buttonListJackpot = null;
          this.buttonTanLoc = null;
          this.tabsListGame = null;
          this.clipBgm = null;
          this.clipBgmNewYear = null;
          this.version = null;
          this.tabsBottom = null;
          this.nodeRemindActiveTelegram = null;
          this.lblMailCount = null;
          this.lblBetTai = null;
          this.lblBetXiu = null;
          this.notiSetting = null;
          this.fireWorks = null;
          this.intervalMailCount = null;
        }
        onLoad() {
          App_1.default.instance && (App_1.default.instance.lobby = this);
        }
        start() {
          Utils_1.default.getGameInfo();
          cc.game.clear();
          cc.game.on(cc.game.EVENT_HIDE, function() {
            Common_AudioManager_1.default.getInstance().pauseAudio();
          });
          cc.game.on(cc.game.EVENT_SHOW, function() {
            Common_AudioManager_1.default.getInstance().resumeAudio();
          });
          this.version.string = Configs_1.default.App.UPDATE_INFO.version;
          this.lblCoin.node.parent.active = true;
          this.lblCoinFish.node.parent.active = false;
          AuthorizationController_1.AuthorizationController.getInstance().autoLogin();
          BroadcastReceiver_1.default.register(BroadcastReceiver_1.default.USER_UPDATE_COIN, () => {
            Tween_1.default.numberTo(this.lblCoin, Configs_1.default.Login.Coin, .3);
            Tween_1.default.numberTo(this.lblCoinFish, Configs_1.default.Login.CoinFish, .3);
          }, this);
          BroadcastReceiver_1.default.register(BroadcastReceiver_1.default.USER_INFO_UPDATED, () => {
            this.lblNickname.string = Configs_1.default.Login.Nickname;
            this.sprAvatar.spriteFrame = App_1.default.instance.getAvatarSpriteFrame(Configs_1.default.Login.Avatar);
            Tween_1.default.numberTo(this.lblCoin, Configs_1.default.Login.Coin, .3);
            Tween_1.default.numberTo(this.lblCoinFish, Configs_1.default.Login.CoinFish, .3);
          }, this);
          BroadcastReceiver_1.default.register(BroadcastReceiver_1.default.USER_VIP_UPDATED, () => {
            this.iconVipPoint.node.parent.active = true;
            this.iconVipPoint.setSkin("vip" + (Configs_1.default.Login.getCurrentVipPointRank() + 1));
            this.lblVipPoint.string = Utils_1.default.formatMoney(Configs_1.default.Login.getCurrentVipPoint()) + "/" + Utils_1.default.formatMoney(Configs_1.default.Login.getMinVipPointNextRank());
            this.spriteProgressVipPoint.fillRange = (Configs_1.default.Login.getCurrentVipPoint() - Configs_1.default.Login.getMinVipPointCurrentRank()) / (Configs_1.default.Login.getMinVipPointNextRank() - Configs_1.default.Login.getMinVipPointCurrentRank());
          }, this);
          BroadcastReceiver_1.default.register(BroadcastReceiver_1.default.USER_LOGOUT, data => {
            Configs_1.default.Login.clear();
            this.panelNotLogin.active = true;
            this.panelLogined.active = false;
            this.bottomBar.active = false;
            MiniGameNetworkClient_1.default.getInstance().close();
            TXMD5NetworkClient_1.default.getInstance().close();
            SlotNetworkClient_1.default.getInstance().close();
            TienLenNetworkClient_1.default.getInstance().close();
            ShootFishNetworkClient_1.default.getInstance().close();
            App_1.default.instance.buttonMiniGame.hidden();
            this.buttonTanLoc.hidden();
          }, this);
          BroadcastReceiver_1.default.register(BroadcastReceiver_1.default.USER_DISCONNECTED, data => {
            this.panelNotLogin.active = true;
            this.panelLogined.active = false;
            this.bottomBar.active = false;
            MiniGameNetworkClient_1.default.getInstance().close();
            TXMD5NetworkClient_1.default.getInstance().close();
            SlotNetworkClient_1.default.getInstance().close();
            ShootFishNetworkClient_1.default.getInstance().close();
            App_1.default.instance.buttonMiniGame.hidden();
            this.buttonTanLoc.hidden();
          }, this);
          BroadcastReceiver_1.default.register(BroadcastReceiver_1.default.UPDATE_MAIL_COUNT, () => {
            this.lblMailCount.string = Configs_1.default.Login.MailCount.toString();
            cc.Tween.stopAllByTarget(this.lblMailCount.node.parent);
            if (Configs_1.default.Login.MailCount > 0) {
              this.lblMailCount.node.parent.active = true;
              cc.tween(this.lblMailCount.node.parent).repeatForever(cc.tween().to(.5, {
                scale: .7
              }).to(.5, {
                scale: 1
              })).start();
            } else this.lblMailCount.node.parent.active = false;
          }, this);
          BroadcastReceiver_1.default.register(BroadcastReceiver_1.default.X3_DEPOSIT, () => {
            var _a, _b;
            if (Configs_1.default.Login.X3Deposit.length < 3) {
              this.notiSetting.active || cc.tween(this.notiSetting).repeatForever(cc.tween().to(.5, {
                scale: .7
              }).to(.5, {
                scale: 1
              }).delay(2)).start();
              this.notiSetting.active = true;
            } else {
              cc.Tween.stopAllByTarget(this.notiSetting);
              this.notiSetting.active = false;
            }
            if (!(null === (_b = null === (_a = Lobby_PopupMission_1.default.instance) || void 0 === _a ? void 0 : _a.node) || void 0 === _b ? void 0 : _b.active)) for (let i = 0; i < Configs_1.default.Login.X3Deposit.length; i++) {
              const x3 = Configs_1.default.Login.X3Deposit[i];
              if (x3.percent >= 100 && !x3.receivedBonus) {
                App_1.default.instance.alertDialog.show4("B\u1ea1n c\xf3 qu\xe0 t\u1eeb s\u1ef1 ki\u1ec7n N\u1ea1p \u0111\u1ea7u!", "NH\u1eacN NGAY", () => {
                  Lobby_PopupMission_1.default.createAndShow(App_1.default.instance.popups, "x3");
                });
                break;
              }
            }
          }, this);
          let moveAndCheck = () => {
            this.txtNotifyMarquee.node.runAction(cc.sequence(cc.moveBy(.5, cc.v2(-60, 0)), cc.callFunc(() => {
              if (this.txtNotifyMarquee.node.position.x < -this.txtNotifyMarquee.node.width - 50) {
                this.txtNotifyMarquee.string = LobbyController_1.notifyMarquee;
                let pos = this.txtNotifyMarquee.node.position;
                pos.x = this.txtNotifyMarquee.node.parent.width + 50;
                this.txtNotifyMarquee.node.position = pos;
              }
              moveAndCheck();
            })));
          };
          let pos = this.txtNotifyMarquee.node.position;
          pos.x = this.txtNotifyMarquee.node.parent.width + 50;
          this.txtNotifyMarquee.node.position = pos;
          this.txtNotifyMarquee.string = LobbyController_1.notifyMarquee;
          moveAndCheck();
          if (Configs_1.default.Login.IsLogin) {
            this.panelNotLogin.active = false;
            this.panelLogined.active = true;
            this.bottomBar.active = true;
            this.buttonTanLoc.show();
            BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_INFO_UPDATED);
            SlotNetworkClient_1.default.getInstance().sendCheck(new Lobby_Cmd_1.default.ReqSubcribeHallSlot());
            MiniGameNetworkClient_1.default.getInstance().sendCheck(new Lobby_Cmd_1.default.ReqGetMoneyUse());
            this.getMailNotRead();
            Configs_1.default.Login.getVipPointInfo();
            Configs_1.default.Login.getX3DepositInfo();
          } else {
            this.panelNotLogin.active = true;
            this.panelLogined.active = false;
            this.bottomBar.active = false;
            App_1.default.instance.buttonMiniGame.hidden();
            this.buttonTanLoc.hidden();
            this.tabsListGame.updateItemJackpots("nudiepvien", 100 * Utils_1.default.randomRangeInt(5e3, 7e3), false, 1e3 * Utils_1.default.randomRangeInt(5e3, 7e3), false, 1e4 * Utils_1.default.randomRangeInt(5e3, 7e3), false);
            this.tabsListGame.updateItemJackpots("khobau", 100 * Utils_1.default.randomRangeInt(5e3, 7e3), false, 1e3 * Utils_1.default.randomRangeInt(5e3, 7e3), false, 1e4 * Utils_1.default.randomRangeInt(5e3, 7e3), false);
            this.tabsListGame.updateItemJackpots("sieuanhhung", 100 * Utils_1.default.randomRangeInt(5e3, 7e3), false, 1e3 * Utils_1.default.randomRangeInt(5e3, 7e3), false, 1e4 * Utils_1.default.randomRangeInt(5e3, 7e3), false);
            this.tabsListGame.updateItemJackpots("vuongquocvin", 100 * Utils_1.default.randomRangeInt(5e3, 7e3), false, 1e3 * Utils_1.default.randomRangeInt(5e3, 7e3), false, 1e4 * Utils_1.default.randomRangeInt(5e3, 7e3), false);
            this.tabsListGame.updateItemJackpots("shootfish", 100 * Utils_1.default.randomRangeInt(5e3, 7e3), false, 1e3 * Utils_1.default.randomRangeInt(5e3, 7e3), false, 1e4 * Utils_1.default.randomRangeInt(5e3, 7e3), false);
          }
          MiniGameNetworkClient_1.default.getInstance().addListener(data => {
            let inPacket = new Network_InPacket_1.default(data);
            switch (inPacket.getCmdId()) {
             case Lobby_Cmd_1.default.TxCode.UPDATE_TIME:
              {
                let res = new Lobby_Cmd_1.default.ReceiveUpdateTime(data);
                Tween_1.default.numberTo(this.lblBetTai, res.potTai, .3);
                Tween_1.default.numberTo(this.lblBetXiu, res.potXiu, .3);
              }
              break;

             case 21e3:
              {
                let res = new Lobby_Cmd_1.default.ResUpdateUserMoney(data);
                Configs_1.default.Login.Coin = res.totalMoney;
                BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN);
                res.showPopup && App_1.default.instance.alertDialog.showMsg("C\xf3 th\u01b0 m\u1edbi :\n" + res.desc);
                Configs_1.default.Login.getX3DepositInfo();
              }
              break;

             case Lobby_Cmd_1.default.Code.NOTIFY_MARQUEE:
              {
                let res = new Lobby_Cmd_1.default.ResNotifyMarquee(data);
                let resJson = JSON.parse(res.message);
                LobbyController_1.notifyMarquee = "";
                for (let i = 0; i < resJson["entries"].length; i++) {
                  let e = resJson["entries"][i];
                  LobbyController_1.notifyMarquee += "<color=#90ff00>(" + Configs_1.default.GameId.getGameName(e["g"]) + ")</color>";
                  LobbyController_1.notifyMarquee += "<color=#ff0054> " + e["n"] + "</color> th\u1eafng ";
                  LobbyController_1.notifyMarquee += "<color=#ffeb30>" + Utils_1.default.formatNumber(e["m"]) + "</color>";
                  i < resJson["entries"].length - 1 && (LobbyController_1.notifyMarquee += "        ");
                }
              }
              break;

             case Lobby_Cmd_1.default.Code.UPDATE_JACKPOTS:
              {
                let res = new Lobby_Cmd_1.default.ResUpdateJackpots(data);
              }
              break;

             case Lobby_Cmd_1.default.Code.GET_MONEY_USE:
              {
                let res = new Lobby_Cmd_1.default.ResGetMoneyUse(data);
                Configs_1.default.Login.Coin = res.moneyUse;
                BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN);
              }
            }
          }, this);
          this.buttonListJackpot.updateJackpot(.3);
          SlotNetworkClient_1.default.getInstance().addListener(data => {
            let inPacket = new Network_InPacket_1.default(data);
            switch (inPacket.getCmdId()) {
             case Lobby_Cmd_1.default.Code.UPDATE_JACKPOT_SLOTS:
              {
                let res = new Lobby_Cmd_1.default.ResUpdateJackpotSlots(data);
                this.buttonListJackpot.setData(res);
                let resJson = JSON.parse(res.pots);
                let ndv = resJson["ndv"];
                this.tabsListGame.updateItemJackpots("nudiepvien", ndv["100"]["p"], 1 == ndv["100"]["x2"], ndv["1000"]["p"], 1 == ndv["1000"]["x2"], ndv["10000"]["p"], 1 == ndv["10000"]["x2"]);
                let kb = resJson["kb"];
                this.tabsListGame.updateItemJackpots("khobau", kb["100"]["p"], 1 == kb["100"]["x2"], kb["1000"]["p"], 1 == kb["1000"]["x2"], kb["10000"]["p"], 1 == kb["10000"]["x2"]);
                let sah = resJson["sah"];
                this.tabsListGame.updateItemJackpots("sieuanhhung", sah["100"]["p"], 1 == sah["100"]["x2"], sah["1000"]["p"], 1 == sah["1000"]["x2"], sah["10000"]["p"], 1 == sah["10000"]["x2"]);
                let vqv = resJson["vqv"];
                this.tabsListGame.updateItemJackpots("vuongquocvin", vqv["100"]["p"], 1 == vqv["100"]["x2"], vqv["1000"]["p"], 1 == vqv["1000"]["x2"], vqv["10000"]["p"], 1 == vqv["10000"]["x2"]);
                let fb = resJson["football"];
                this.tabsListGame.updateItemJackpots("football", fb["100"]["p"], 1 == fb["100"]["x2"], fb["1000"]["p"], 1 == fb["1000"]["x2"], fb["10000"]["p"], 1 == fb["10000"]["x2"]);
                let ct = resJson["caothap"];
                this.tabsListGame.updateItemJackpots("caothap", ct["1000"]["p"], 1 == ct["1000"]["x2"], ct["10000"]["p"], 1 == ct["10000"]["x2"], ct["50000"]["p"], 1 == ct["50000"]["x2"]);
                break;
              }
            }
          }, this);
          ShootFishNetworkClient_1.default.getInstance().addListener((route, data) => {
            switch (route) {
             case "OnUpdateJackpot":
              this.tabsListGame.updateItemJackpots("shootfish", data["14"], false, data["24"], false, data["34"], false);
            }
          }, this);
          Common_AudioManager_1.default.getInstance().playBackgroundMusic(this.clipBgm);
          Http_1.default.get(Configs_1.default.App.API, {
            c: 6011,
            cn: Configs_1.default.App.CLIENT_NAME,
            requireLogin: false
          }, (err, res) => {
            cc.log(res);
            App_1.default.instance.showLoading(false);
            if (!err) {
              Configs_1.default.App.FANPAGE = res.fanpage || "";
              Configs_1.default.App.TELE_BOT = res.telegramBotId || "";
              Configs_1.default.App.TELE_GROUP = res.telegramGroupId || "";
              Configs_1.default.App.CSKH_PHONE = res.cskh || "";
              Configs_1.default.App.TELE_SUPPORT = res.supportTelegramId || "";
              Configs_1.default.App.TELE_NEWS = res.telegramChannelId || "";
              Configs_1.default.App.FB_GROUP = res.facebookGroupUrl || "";
              Configs_1.default.App.FB_MESSENGER = res.facebookMessengerUrl || "";
              Configs_1.default.App.LANDING_PAGE = res.landingUrl || "";
            }
          });
          this.getMailNotRead();
          this.unschedule(this.intervalMailCount);
          this.schedule(this.intervalMailCount = () => {
            this.getMailNotRead();
          }, 60);
          BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.SET_SOUND, cc.find("Canvas"));
          if (Utils_1.default.isNewYearTime()) {
            this.fireWorks.active = true;
            this.fireWorks.getComponent(sp.Skeleton).setAnimation(0, "animation", true);
            Common_AudioManager_1.default.getInstance().playBackgroundMusic(this.clipBgmNewYear);
          } else Common_AudioManager_1.default.getInstance().playBackgroundMusic(this.clipBgm);
        }
        onDestroy() {
          SlotNetworkClient_1.default.getInstance().send(new Lobby_Cmd_1.default.ReqUnSubcribeHallSlot());
        }
        actSetting() {
          Lobby_PopupSetting_1.default.createAndShow(App_1.default.instance.popups);
        }
        actMailBox() {
          if (!Configs_1.default.Login.IsLogin) {
            App_1.default.instance.alertDialog.showMsg("B\u1ea1n ch\u01b0a \u0111\u0103ng nh\u1eadp.");
            return;
          }
          Lobby_PopupMailBox_1.default.createAndShow(App_1.default.instance.popups);
        }
        actVippoint() {
          if (!Configs_1.default.Login.IsLogin) {
            App_1.default.instance.alertDialog.showMsg("B\u1ea1n ch\u01b0a \u0111\u0103ng nh\u1eadp.");
            return;
          }
          Lobby_PopupVippoint_1.default.createAndShow(App_1.default.instance.popups);
        }
        actEvent(event) {
          if (!Configs_1.default.Login.IsLogin) {
            App_1.default.instance.alertDialog.showMsg("B\u1ea1n ch\u01b0a \u0111\u0103ng nh\u1eadp.");
            return;
          }
          this.actGoToSlotNuDiepVien(event);
        }
        actDownload() {
          cc.sys.openURL(Configs_1.default.App.LINK_DOWNLOAD);
        }
        actFanpage() {
          cc.sys.openURL(Configs_1.default.App.getLinkFanpage());
        }
        actHotLine() {
          App_1.default.instance.alertDialog.showMsg("Hotline " + Configs_1.default.App.CSKH_PHONE);
        }
        actSupportOnline() {
          cc.sys.openURL(Configs_1.default.App.LINK_SUPPORT);
        }
        actSupport() {
          Lobby_PopupCustomerCare_1.default.createAndShow(App_1.default.instance.popups);
        }
        actBack() {
          App_1.default.instance.confirmDialog.show3("B\u1ea1n c\xf3 mu\u1ed1n \u0111\u0103ng xu\u1ea5t kh\u1ecfi t\xe0i kho\u1ea3n?", "\u0110\u0102NG XU\u1ea4T", isConfirm => {
            isConfirm && BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_LOGOUT);
          });
        }
        actSwitchCoin() {
          if (this.lblCoin.node.parent.active) {
            this.lblCoin.node.parent.active = false;
            this.lblCoinFish.node.parent.active = true;
          } else {
            this.lblCoin.node.parent.active = true;
            this.lblCoinFish.node.parent.active = false;
          }
        }
        actGameTaiXiu(event) {
          if (!Configs_1.default.Login.IsLogin) {
            App_1.default.instance.alertDialog.showMsg("B\u1ea1n ch\u01b0a \u0111\u0103ng nh\u1eadp.");
            return;
          }
          App_1.default.instance.openGameTaiXiuMini();
        }
        actGameTaiXiuMD5(event) {
          if (!Configs_1.default.Login.IsLogin) {
            App_1.default.instance.alertDialog.showMsg("B\u1ea1n ch\u01b0a \u0111\u0103ng nh\u1eadp.");
            return;
          }
          App_1.default.instance.openGameTaiXiuMD5();
        }
        actGameBauCua(event) {
          if (!Configs_1.default.Login.IsLogin) {
            App_1.default.instance.alertDialog.showMsg("B\u1ea1n ch\u01b0a \u0111\u0103ng nh\u1eadp.");
            return;
          }
          App_1.default.instance.openGameBauCua();
        }
        actGameOanTuXi(event) {
          if (!Configs_1.default.Login.IsLogin) {
            App_1.default.instance.alertDialog.showMsg("B\u1ea1n ch\u01b0a \u0111\u0103ng nh\u1eadp.");
            return;
          }
          App_1.default.instance.openGameOanTuTi();
        }
        actGameCaoThap(event) {
          if (!Configs_1.default.Login.IsLogin) {
            App_1.default.instance.alertDialog.showMsg("B\u1ea1n ch\u01b0a \u0111\u0103ng nh\u1eadp.");
            return;
          }
          App_1.default.instance.openGameCaoThap();
        }
        actGamePokerGo(event) {
          if (!Configs_1.default.Login.IsLogin) {
            App_1.default.instance.alertDialog.showMsg("B\u1ea1n ch\u01b0a \u0111\u0103ng nh\u1eadp.");
            return;
          }
          App_1.default.instance.openGamePokerGo();
        }
        actGameMiniPoker(event) {
          if (!Configs_1.default.Login.IsLogin) {
            App_1.default.instance.alertDialog.showMsg("B\u1ea1n ch\u01b0a \u0111\u0103ng nh\u1eadp.");
            return;
          }
          App_1.default.instance.openGameMiniPoker();
        }
        actGameTaLa() {
          if (!Configs_1.default.Login.IsLogin) {
            App_1.default.instance.alertDialog.showMsg("B\u1ea1n ch\u01b0a \u0111\u0103ng nh\u1eadp.");
            return;
          }
          App_1.default.instance.alertDialog.showMsg("S\u1eafp ra m\u1eaft.");
        }
        actGameCasinoLive() {
          if (!Configs_1.default.Login.IsLogin) {
            App_1.default.instance.alertDialog.showMsg("B\u1ea1n ch\u01b0a \u0111\u0103ng nh\u1eadp.");
            return;
          }
          App_1.default.instance.alertDialog.showMsg("S\u1eafp ra m\u1eaft.");
        }
        actGameLoDeSieuToc() {
          if (!Configs_1.default.Login.IsLogin) {
            App_1.default.instance.alertDialog.showMsg("B\u1ea1n ch\u01b0a \u0111\u0103ng nh\u1eadp.");
            return;
          }
          App_1.default.instance.loadSceneInBundle("lode", Configs_1.default.App.UPDATE_INFO["lode"], true, "LoDeSieuToc");
        }
        actGameCaDo() {
          if (!Configs_1.default.Login.IsLogin) {
            App_1.default.instance.alertDialog.showMsg("B\u1ea1n ch\u01b0a \u0111\u0103ng nh\u1eadp.");
            return;
          }
          App_1.default.instance.alertDialog.showMsg("S\u1eafp ra m\u1eaft.");
        }
        actGoToSlotNuDiepVien(event) {
          if (!Configs_1.default.Login.IsLogin) {
            App_1.default.instance.alertDialog.showMsg("B\u1ea1n ch\u01b0a \u0111\u0103ng nh\u1eadp.");
            return;
          }
          App_1.default.instance.showErrLoading("\u0110ang k\u1ebft n\u1ed1i t\u1edbi server...");
          SlotNetworkClient_1.default.getInstance().checkConnect(() => {
            App_1.default.instance.showLoading(false);
            App_1.default.instance.loadSceneInBundle("nudiepvien", Configs_1.default.App.UPDATE_INFO["nudiepvien"], true, "SlotNuDiepVien");
          });
        }
        actGoToSlotVuongQuocVin(event) {
          if (!Configs_1.default.Login.IsLogin) {
            App_1.default.instance.alertDialog.showMsg("B\u1ea1n ch\u01b0a \u0111\u0103ng nh\u1eadp.");
            return;
          }
          App_1.default.instance.showErrLoading("\u0110ang k\u1ebft n\u1ed1i t\u1edbi server...");
          SlotNetworkClient_1.default.getInstance().checkConnect(() => {
            App_1.default.instance.showLoading(false);
            App_1.default.instance.loadSceneInBundle("vuongquocvin", Configs_1.default.App.UPDATE_INFO["vuongquocvin"], true, "SlotVuongQuocVin");
          });
        }
        actGoToSlotKhoBau(event) {
          if (!Configs_1.default.Login.IsLogin) {
            App_1.default.instance.alertDialog.showMsg("B\u1ea1n ch\u01b0a \u0111\u0103ng nh\u1eadp.");
            return;
          }
          App_1.default.instance.showErrLoading("\u0110ang k\u1ebft n\u1ed1i t\u1edbi server...");
          SlotNetworkClient_1.default.getInstance().checkConnect(() => {
            App_1.default.instance.showLoading(false);
            App_1.default.instance.loadSceneInBundle("khobau", Configs_1.default.App.UPDATE_INFO["khobau"], true, "SlotKhoBau");
          });
        }
        actGoToSlotSieuAnhHung(event) {
          if (!Configs_1.default.Login.IsLogin) {
            App_1.default.instance.alertDialog.showMsg("B\u1ea1n ch\u01b0a \u0111\u0103ng nh\u1eadp.");
            return;
          }
          App_1.default.instance.showErrLoading("\u0110ang k\u1ebft n\u1ed1i t\u1edbi server...");
          SlotNetworkClient_1.default.getInstance().checkConnect(() => {
            App_1.default.instance.showLoading(false);
            App_1.default.instance.loadSceneInBundle("sieuanhhung", Configs_1.default.App.UPDATE_INFO["sieuanhhung"], true, "SlotSieuAnhHungRoom");
          });
        }
        actGoToSlotCayKhe(event) {
          if (!Configs_1.default.Login.IsLogin) {
            App_1.default.instance.alertDialog.showMsg("B\u1ea1n ch\u01b0a \u0111\u0103ng nh\u1eadp.");
            return;
          }
          App_1.default.instance.showErrLoading("\u0110ang k\u1ebft n\u1ed1i t\u1edbi server...");
          SlotNetworkClient_1.default.getInstance().checkConnect(() => {
            App_1.default.instance.showLoading(false);
            App_1.default.instance.loadSceneInBundle("caykhe", Configs_1.default.App.UPDATE_INFO["caykhe"], true, "SlotCayKhe");
          });
        }
        actDev() {
          if (!Configs_1.default.Login.IsLogin) {
            App_1.default.instance.alertDialog.showMsg("B\u1ea1n ch\u01b0a \u0111\u0103ng nh\u1eadp.");
            return;
          }
          App_1.default.instance.alertDialog.showMsg("S\u1eafp ra m\u1eaft.");
          return;
        }
        actGoToShootFish(event) {
          if (!Configs_1.default.Login.IsLogin) {
            App_1.default.instance.alertDialog.showMsg("B\u1ea1n ch\u01b0a \u0111\u0103ng nh\u1eadp.");
            return;
          }
          App_1.default.instance.alertDialog.showMsg("S\u1eafp ra m\u1eaft.");
        }
        actGotoLoDe(event) {
          if (!Configs_1.default.Login.IsLogin) {
            App_1.default.instance.alertDialog.showMsg("B\u1ea1n ch\u01b0a \u0111\u0103ng nh\u1eadp.");
            return;
          }
          App_1.default.instance.loadSceneInBundle("lode", Configs_1.default.App.UPDATE_INFO["lode"], true, "LoDe");
        }
        actGoToXocDia(event) {
          if (!Configs_1.default.Login.IsLogin) {
            App_1.default.instance.alertDialog.showMsg("B\u1ea1n ch\u01b0a \u0111\u0103ng nh\u1eadp.");
            return;
          }
          App_1.default.instance.loadSceneInBundle("xocdia", Configs_1.default.App.UPDATE_INFO["xocdia"], true, "XocDia");
        }
        actGoToMauBinh(event) {
          if (!Configs_1.default.Login.IsLogin) {
            App_1.default.instance.alertDialog.showMsg("B\u1ea1n ch\u01b0a \u0111\u0103ng nh\u1eadp.");
            return;
          }
          App_1.default.instance.showErrLoading("\u0110ang k\u1ebft n\u1ed1i t\u1edbi server...");
          MauBinhNetworkClient_1.default.getInstance().checkConnect(() => {
            App_1.default.instance.showLoading(false);
            App_1.default.instance.loadSceneInBundle("maubinh", Configs_1.default.App.UPDATE_INFO["maubinh"], true, "MauBinh");
          });
        }
        actAddCoin() {
          Lobby_PopupShop_1.default.createAndShow(App_1.default.instance.popups);
        }
        accExchange() {
          if (!Configs_1.default.Login.IsLogin) {
            App_1.default.instance.alertDialog.showMsg("B\u1ea1n ch\u01b0a \u0111\u0103ng nh\u1eadp.");
            return;
          }
          Lobby_PopupCashOut_1.default.createAndShow(App_1.default.instance.popups);
        }
        actGoToTLMN(event) {
          if (!Configs_1.default.Login.IsLogin) {
            App_1.default.instance.alertDialog.showMsg("B\u1ea1n ch\u01b0a \u0111\u0103ng nh\u1eadp.");
            return;
          }
          App_1.default.instance.showErrLoading("\u0110ang k\u1ebft n\u1ed1i t\u1edbi server...");
          TienLenNetworkClient_1.default.getInstance().checkConnect(() => {
            App_1.default.instance.showLoading(false);
            App_1.default.instance.loadSceneInBundle("tienlen", Configs_1.default.App.UPDATE_INFO["tienlen"], true, "TienLen");
          });
        }
        actGoToSam(event) {
          if (!Configs_1.default.Login.IsLogin) {
            App_1.default.instance.alertDialog.showMsg("B\u1ea1n ch\u01b0a \u0111\u0103ng nh\u1eadp.");
            return;
          }
          App_1.default.instance.showErrLoading("\u0110ang k\u1ebft n\u1ed1i t\u1edbi server...");
          SamNetworkClient_1.default.getInstance().checkConnect(() => {
            App_1.default.instance.showLoading(false);
            App_1.default.instance.loadSceneInBundle("sam", Configs_1.default.App.UPDATE_INFO["sam"], true, "Sam");
          });
        }
        actGoToBaCay(event) {
          if (!Configs_1.default.Login.IsLogin) {
            App_1.default.instance.alertDialog.showMsg("B\u1ea1n ch\u01b0a \u0111\u0103ng nh\u1eadp.");
            return;
          }
          App_1.default.instance.loadSceneInBundle("bacay", Configs_1.default.App.UPDATE_INFO["bacay"], true, "BaCay");
        }
        actGoToBaiCao(event) {
          if (!Configs_1.default.Login.IsLogin) {
            App_1.default.instance.alertDialog.showMsg("B\u1ea1n ch\u01b0a \u0111\u0103ng nh\u1eadp.");
            return;
          }
          App_1.default.instance.loadSceneInBundle("baicao", Configs_1.default.App.UPDATE_INFO["baicao"], true, "BaiCao");
        }
        actGoToLieng(event) {
          if (!Configs_1.default.Login.IsLogin) {
            App_1.default.instance.alertDialog.showMsg("B\u1ea1n ch\u01b0a \u0111\u0103ng nh\u1eadp.");
            return;
          }
          App_1.default.instance.loadSceneInBundle("lieng", Configs_1.default.App.UPDATE_INFO["lieng"], true, "Lieng");
        }
        actGoToXiDach(event) {
          if (!Configs_1.default.Login.IsLogin) {
            App_1.default.instance.alertDialog.showMsg("B\u1ea1n ch\u01b0a \u0111\u0103ng nh\u1eadp.");
            return;
          }
          App_1.default.instance.loadSceneInBundle("xidzach", Configs_1.default.App.UPDATE_INFO["xidzach"], true, "XiDzach");
        }
        actGoToPoker(event) {
          if (!Configs_1.default.Login.IsLogin) {
            App_1.default.instance.alertDialog.showMsg("B\u1ea1n ch\u01b0a \u0111\u0103ng nh\u1eadp.");
            return;
          }
          App_1.default.instance.loadSceneInBundle("poker", Configs_1.default.App.UPDATE_INFO["poker"], true, "Poker");
        }
        getMailNotRead() {
          Http_1.default.get(Configs_1.default.App.API, {
            c: 405,
            nn: Configs_1.default.Login.Nickname,
            p: 1
          }, (err, res) => {
            if (null != err) return;
            cc.log(res);
            try {
              const mailBoxDTO = LobbyResponseData_1.MailBoxDTO.toMailBoxDTO(res);
              cc.log(mailBoxDTO);
              if (!mailBoxDTO.success) return;
              Configs_1.default.Login.MailCount = mailBoxDTO.mailNotRead;
              BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.UPDATE_MAIL_COUNT);
              for (var i = 0; i < mailBoxDTO.transactions.length; i++) if (mailBoxDTO.transactions[i].type && "Normal" != mailBoxDTO.transactions[i].type && !mailBoxDTO.transactions[i].status) {
                if (mailBoxDTO.transactions[i].clientSuggestionActions.length > 0) {
                  const vippointRankUpAction = mailBoxDTO.transactions[i].clientSuggestionActions.find(action => action.suggestionAction === Constants_1.UserActions.ENUM.UP_LEVEL_VIPPOINT);
                  vippointRankUpAction ? Lobby_PopupVippointRankUp_1.default.createAndShow(App_1.default.instance.popups, vippointRankUpAction.parameters["newLevel"]) : App_1.default.instance.actiontDialog.showMsgWithActions(mailBoxDTO.transactions[i].content, mailBoxDTO.transactions[i].clientSuggestionActions.map(action => action.suggestionAction));
                } else App_1.default.instance.alertDialog.showMsg("C\xf3 th\u01b0 m\u1edbi :\n" + res.transactions[i].content);
                Http_1.default.get(Configs_1.default.App.API, {
                  c: 404,
                  mid: res.transactions[i].mail_id
                }, (err, res) => {
                  if (null != err) return;
                  Configs_1.default.Login.MailCount -= 1;
                  BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.UPDATE_MAIL_COUNT);
                });
                break;
              }
            } catch (error) {
              ErrorLogger_1.ErrorLogger.sendLogError("Http response", "Mail box", JSON.stringify(res) + "\n" + JSON.stringify(error.stack));
            }
          });
        }
        actProfile() {
          Lobby_PopupProfile_1.default.createAndShow(App_1.default.instance.popups);
        }
        actRegister() {
          Lobby_PopupRegister_1.default.createAndShow(App_1.default.instance.popups);
        }
        actLogin() {
          Lobby_PopupLogin_1.default.createAndShow(App_1.default.instance.popups);
        }
        loginCallback() {
          this.panelNotLogin.active = false;
          this.panelLogined.active = true;
          this.bottomBar.active = true;
          this.lblMailCount.node.parent.active = false;
          this.buttonTanLoc.show();
          this.getMailNotRead();
          this.getUserInfo();
          Configs_1.default.Login.getVipPointInfo();
          Configs_1.default.Login.getX3DepositInfo();
        }
        actPlayNow() {
          AuthorizationController_1.AuthorizationController.getInstance().loginWithDeviceId();
        }
        getUserInfo() {
          Http_1.default.get(Configs_1.default.App.API, {
            c: 6027
          }, (err, res) => {
            App_1.default.instance.showLoading(false);
            if (err) {
              App_1.default.instance.alertDialog.showMsg("C\xe0i \u0111\u1eb7t l\u1ed7i!");
              return;
            }
            cc.log(res);
            let securityRes = new AuthorizationResponseData_1.UserInfoResponse(res);
            cc.log(securityRes);
            if (!securityRes.success) return;
            if (1 !== securityRes.mobileSecure) {
              this.nodeRemindActiveTelegram.active = true;
              cc.tween(this.nodeRemindActiveTelegram).repeatForever(cc.tween().to(.5, {
                scale: .8
              }).to(.5, {
                scale: 1
              })).start();
              App_1.default.instance.actiontDialog.showMsgWithAction("H\xe3y k\xedch ho\u1ea1t B\u1ea3o m\u1eadt \u0111\u1ec3 \u0111\u1ea3m b\u1ea3o An to\xe0n v\xe0 nh\u1eadn \u0111\u01b0\u1ee3c Xu t\xe2n th\u1ee7 c\xf9ng nhi\u1ec1u \u01b0u \u0111\xe3i t\u1eeb game.", "K\xcdCH HO\u1ea0T NGAY", () => {
                App_1.default.instance.openTelegram();
              });
            }
          });
        }
        actActiveTelegram() {
          App_1.default.instance.openTelegram();
        }
        setStateAnimation(isStopAnimation = false) {
          var _a;
          null === (_a = this.tabsListGame) || void 0 === _a ? void 0 : _a.setStateAnimation(isStopAnimation);
        }
      };
      LobbyController.notifyMarquee = "";
      __decorate([ property(cc.Node) ], LobbyController.prototype, "panelNotLogin", void 0);
      __decorate([ property(cc.Node) ], LobbyController.prototype, "panelLogined", void 0);
      __decorate([ property(cc.Node) ], LobbyController.prototype, "bottomBar", void 0);
      __decorate([ property(cc.Sprite) ], LobbyController.prototype, "sprAvatar", void 0);
      __decorate([ property(cc.Label) ], LobbyController.prototype, "lblNickname", void 0);
      __decorate([ property(cc.Label) ], LobbyController.prototype, "lblVipPoint", void 0);
      __decorate([ property(cc.Sprite) ], LobbyController.prototype, "spriteProgressVipPoint", void 0);
      __decorate([ property(sp.Skeleton) ], LobbyController.prototype, "iconVipPoint", void 0);
      __decorate([ property(cc.Label) ], LobbyController.prototype, "lblCoin", void 0);
      __decorate([ property(cc.Label) ], LobbyController.prototype, "lblCoinFish", void 0);
      __decorate([ property(cc.RichText) ], LobbyController.prototype, "txtNotifyMarquee", void 0);
      __decorate([ property(Lobby_ButtonListJackpot_1.default) ], LobbyController.prototype, "buttonListJackpot", void 0);
      __decorate([ property(Lobby_ButtonTanLoc_1.default) ], LobbyController.prototype, "buttonTanLoc", void 0);
      __decorate([ property(Lobby_TabsListGame_1.default) ], LobbyController.prototype, "tabsListGame", void 0);
      __decorate([ property({
        type: cc.AudioClip
      }) ], LobbyController.prototype, "clipBgm", void 0);
      __decorate([ property({
        type: cc.AudioClip
      }) ], LobbyController.prototype, "clipBgmNewYear", void 0);
      __decorate([ property(cc.Label) ], LobbyController.prototype, "version", void 0);
      __decorate([ property(cc.Node) ], LobbyController.prototype, "tabsBottom", void 0);
      __decorate([ property(cc.Node) ], LobbyController.prototype, "nodeRemindActiveTelegram", void 0);
      __decorate([ property(cc.Label) ], LobbyController.prototype, "lblMailCount", void 0);
      __decorate([ property(cc.Label) ], LobbyController.prototype, "lblBetTai", void 0);
      __decorate([ property(cc.Label) ], LobbyController.prototype, "lblBetXiu", void 0);
      __decorate([ property(cc.Node) ], LobbyController.prototype, "notiSetting", void 0);
      __decorate([ property(cc.Node) ], LobbyController.prototype, "fireWorks", void 0);
      LobbyController = LobbyController_1 = __decorate([ ccclass ], LobbyController);
      Lobby.LobbyController = LobbyController;
    })(Lobby || (Lobby = {}));
    exports.default = Lobby.LobbyController;
    cc._RF.pop();
  }, {
    "../../Game/src/common/App": "App",
    "../../Game/src/common/BroadcastReceiver": "BroadcastReceiver",
    "../../Game/src/common/Common.AudioManager": "Common.AudioManager",
    "../../Game/src/common/Configs": "Configs",
    "../../Game/src/common/Constants": "Constants",
    "../../Game/src/common/ErrorLogger": "ErrorLogger",
    "../../Game/src/common/Http": "Http",
    "../../Game/src/common/Tween": "Tween",
    "../../Game/src/common/Utils": "Utils",
    "../../Game/src/networks/MauBinhNetworkClient": "MauBinhNetworkClient",
    "../../Game/src/networks/MiniGameNetworkClient": "MiniGameNetworkClient",
    "../../Game/src/networks/Network.InPacket": "Network.InPacket",
    "../../Game/src/networks/SamNetworkClient": "SamNetworkClient",
    "../../Game/src/networks/ShootFishNetworkClient": "ShootFishNetworkClient",
    "../../Game/src/networks/SlotNetworkClient": "SlotNetworkClient",
    "../../Game/src/networks/TXMD5NetworkClient": "TXMD5NetworkClient",
    "../../Game/src/networks/TienLenNetworkClient": "TienLenNetworkClient",
    "./Authorization/AuthorizationController": "AuthorizationController",
    "./Authorization/AuthorizationResponseData": "AuthorizationResponseData",
    "./Authorization/Lobby.PopupLogin": "Lobby.PopupLogin",
    "./Authorization/Lobby.PopupRegister": "Lobby.PopupRegister",
    "./Lobby.ButtonListJackpot": "Lobby.ButtonListJackpot",
    "./Lobby.ButtonTanLoc": "Lobby.ButtonTanLoc",
    "./Lobby.Cmd": "Lobby.Cmd",
    "./Lobby.PopupCashOut": "Lobby.PopupCashOut",
    "./Lobby.PopupCustomerCare": "Lobby.PopupCustomerCare",
    "./Lobby.PopupMailBox": "Lobby.PopupMailBox",
    "./Lobby.PopupMission": "Lobby.PopupMission",
    "./Lobby.PopupProfile": "Lobby.PopupProfile",
    "./Lobby.PopupSetting": "Lobby.PopupSetting",
    "./Lobby.PopupShop": "Lobby.PopupShop",
    "./Lobby.TabsListGame": "Lobby.TabsListGame",
    "./LobbyResponseData/LobbyResponseData": "LobbyResponseData",
    "./Vippoint/Lobby.PopupVippoint": "Lobby.PopupVippoint",
    "./Vippoint/Lobby.PopupVippointRankUp": "Lobby.PopupVippointRankUp"
  } ],
  "Lobby.PopupBoomTan": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c21d3ctX0pEYa4OPIMXy1vq", "Lobby.PopupBoomTan");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var PopupBoomTan_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Dialog_1 = require("../../Game/src/common/Dialog");
    const App_1 = require("../../Game/src/common/App");
    const Http_1 = require("../../Game/src/common/Http");
    const Configs_1 = require("../../Game/src/common/Configs");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let PopupBoomTan = PopupBoomTan_1 = class PopupBoomTan extends Dialog_1.default {
      constructor() {
        super(...arguments);
        this.itemTemplate = null;
        this.sfRanks = [];
        this.sfGifts = [];
      }
      static createAndShow(parent) {
        if (!this.initing) if (null == this.instance || null == this.instance.node) {
          this.initing = true;
          App_1.default.instance.loadPrefab("Lobby/res/prefabs/popups/PopupBoomTan", (err, prefab) => {
            this.initing = false;
            if (null != err) {
              App_1.default.instance.alertDialog.showMsg(err);
              return;
            }
            let go = cc.instantiate(prefab);
            go.parent = parent;
            this.instance = go.getComponent(PopupBoomTan_1);
            this.instance.node.zIndex = 1e3;
            this.instance.show();
          });
        } else {
          this.instance.node.zIndex = 1e3;
          this.instance.show();
        }
      }
      show() {
        super.show();
        for (let i = 0; i < this.itemTemplate.parent.childrenCount; i++) this.itemTemplate.parent.children[i].active = false;
      }
      dismiss() {
        super.dismiss();
        for (let i = 0; i < this.itemTemplate.parent.childrenCount; i++) this.itemTemplate.parent.children[i].active = false;
      }
      _onShowed() {
        super._onShowed();
        this.loadData();
      }
      getItem() {
        let item = null;
        for (let i = 0; i < this.itemTemplate.parent.childrenCount; i++) {
          let node = this.itemTemplate.parent.children[i];
          if (node != this.itemTemplate && !node.active) {
            item = node;
            break;
          }
        }
        if (null == item) {
          item = cc.instantiate(this.itemTemplate);
          item.parent = this.itemTemplate.parent;
        }
        item.active = true;
        return item;
      }
      loadData() {
        App_1.default.instance.showLoading(true);
        let url = Configs_1.default.App.DOMAIN + "boom_tan.json";
        Http_1.default.get(url, null, (err, res) => {
          App_1.default.instance.showLoading(false);
          if (null != err) return;
          for (let i = 0; i < res.length; i++) {
            let itemData = res[i];
            let item = this.getItem();
            let sfGift = this.getGiftSpriteFrame(itemData["gift"]);
            if (null != sfGift) {
              item.getChildByName("SprGift").active = true;
              item.getChildByName("SprGift").getComponent(cc.Sprite).spriteFrame = sfGift;
              item.getChildByName("Gift").active = false;
            } else {
              item.getChildByName("Gift").active = true;
              item.getChildByName("Gift").getComponent(cc.Label).string = itemData["gift"];
              item.getChildByName("SprGift").active = false;
            }
            if (i < this.sfRanks.length) {
              item.getChildByName("SprRank").active = true;
              item.getChildByName("SprRank").getComponent(cc.Sprite).spriteFrame = this.sfRanks[i];
              item.getChildByName("Rank").active = false;
            } else {
              item.getChildByName("Rank").active = true;
              item.getChildByName("Rank").getComponent(cc.Label).string = itemData["rank"];
              item.getChildByName("SprRank").active = false;
            }
            let lblNickname = item.getChildByName("Nickname").getComponent(cc.Label);
            let lblScore = item.getChildByName("Score").getComponent(cc.Label);
            lblNickname.string = itemData["nickname"];
            lblScore.string = itemData["score"];
            if (0 == i) {
              lblNickname.node.color = cc.Color.BLACK.fromHEX("#ff7e00");
              lblScore.node.color = cc.Color.BLACK.fromHEX("#ff7e00");
            } else if (1 == i) {
              lblNickname.node.color = cc.Color.BLACK.fromHEX("#004eff");
              lblScore.node.color = cc.Color.BLACK.fromHEX("#004eff");
            } else if (2 == i) {
              lblNickname.node.color = cc.Color.BLACK.fromHEX("#06ff00");
              lblScore.node.color = cc.Color.BLACK.fromHEX("#06ff00");
            } else {
              lblNickname.node.color = cc.Color.BLACK.fromHEX("#feca85");
              lblScore.node.color = cc.Color.BLACK.fromHEX("#feca85");
            }
            item.getChildByName("Divider").active = i < res.length - 1;
          }
        });
      }
      actTheLe() {
        let url = Configs_1.default.App.DOMAIN + "the_le_boom_tan.html";
        cc.sys.openURL(url);
      }
      getGiftSpriteFrame(name) {
        for (let i = 0; i < this.sfGifts.length; i++) if (this.sfGifts[i].name == name) return this.sfGifts[i];
        return null;
      }
    };
    PopupBoomTan.instance = null;
    PopupBoomTan.initing = false;
    __decorate([ property(cc.Node) ], PopupBoomTan.prototype, "itemTemplate", void 0);
    __decorate([ property([ cc.SpriteFrame ]) ], PopupBoomTan.prototype, "sfRanks", void 0);
    __decorate([ property([ cc.SpriteFrame ]) ], PopupBoomTan.prototype, "sfGifts", void 0);
    PopupBoomTan = PopupBoomTan_1 = __decorate([ ccclass ], PopupBoomTan);
    exports.default = PopupBoomTan;
    cc._RF.pop();
  }, {
    "../../Game/src/common/App": "App",
    "../../Game/src/common/Configs": "Configs",
    "../../Game/src/common/Dialog": "Dialog",
    "../../Game/src/common/Http": "Http"
  } ],
  "Lobby.PopupCardInfo": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fef8eBnlLxMGqPEv56Oyq7k", "Lobby.PopupCardInfo");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var PopupCardInfo_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Dialog_1 = require("../../Game/src/common/Dialog");
    const App_1 = require("../../Game/src/common/App");
    const Utils_1 = require("../../Game/src/common/Utils");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let PopupCardInfo = PopupCardInfo_1 = class PopupCardInfo extends Dialog_1.default {
      constructor() {
        super(...arguments);
        this.lblTelco = null;
        this.lblAmount = null;
        this.edbCode = null;
        this.edbSerial = null;
        this.code = "";
        this.serial = "";
      }
      static createAndShow(parent, telco, amount, code, serial) {
        if (!this.initing) if (null == this.instance || null == this.instance.node) {
          this.initing = true;
          App_1.default.instance.loadPrefab("Lobby/res/prefabs/popups/PopupCardInfo", (err, prefab) => {
            this.initing = false;
            if (null != err) {
              App_1.default.instance.alertDialog.showMsg(err);
              return;
            }
            let go = cc.instantiate(prefab);
            go.parent = parent;
            this.instance = go.getComponent(PopupCardInfo_1);
            this.instance.show(telco, amount, code, serial);
          });
        } else this.instance.show(telco, amount, code, serial);
      }
      start() {
        this.edbCode.node.on("editing-did-ended", () => {
          this.edbCode.string = this.code;
        });
        this.edbSerial.node.on("editing-did-ended", () => {
          this.edbSerial.string = this.serial;
        });
      }
      show(telco = "", amount = "", code = "", serial = "") {
        super.show();
        this.code = code;
        this.serial = serial;
        this.lblTelco.string = telco;
        this.lblAmount.string = Utils_1.default.formatNumber(Number(amount));
        this.edbCode.string = code;
        this.edbSerial.string = serial;
      }
    };
    PopupCardInfo.instance = null;
    PopupCardInfo.initing = false;
    __decorate([ property(cc.Label) ], PopupCardInfo.prototype, "lblTelco", void 0);
    __decorate([ property(cc.Label) ], PopupCardInfo.prototype, "lblAmount", void 0);
    __decorate([ property(cc.EditBox) ], PopupCardInfo.prototype, "edbCode", void 0);
    __decorate([ property(cc.EditBox) ], PopupCardInfo.prototype, "edbSerial", void 0);
    PopupCardInfo = PopupCardInfo_1 = __decorate([ ccclass ], PopupCardInfo);
    exports.default = PopupCardInfo;
    cc._RF.pop();
  }, {
    "../../Game/src/common/App": "App",
    "../../Game/src/common/Dialog": "Dialog",
    "../../Game/src/common/Utils": "Utils"
  } ],
  "Lobby.PopupCashOut": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "38d5aYoteVN0rb+NVYyNXJz", "Lobby.PopupCashOut");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var PopupCashOut_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Dialog_1 = require("../../Game/src/common/Dialog");
    const App_1 = require("../../Game/src/common/App");
    const Http_1 = require("../../Game/src/common/Http");
    const Configs_1 = require("../../Game/src/common/Configs");
    const Network_InPacket_1 = require("../../Game/src/networks/Network.InPacket");
    const Utils_1 = require("../../Game/src/common/Utils");
    const MiniGameNetworkClient_1 = require("../../Game/src/networks/MiniGameNetworkClient");
    const Lobby_Cmd_1 = require("./Lobby.Cmd");
    const BroadcastReceiver_1 = require("../../Game/src/common/BroadcastReceiver");
    const Lobby_PopupOTP_1 = require("./Lobby.PopupOTP");
    const Lobby_PopupCardInfo_1 = require("./Lobby.PopupCardInfo");
    const CustomUI_Dropdown_1 = require("../../Game/src/customui/CustomUI.Dropdown");
    const SPUtils_1 = require("../../Game/src/common/SPUtils");
    const Lobby_DropdownBank_1 = require("./Lobby.DropdownBank");
    const Lobby_DropdownTelco_1 = require("./Lobby.DropdownTelco");
    const ErrorLogger_1 = require("../../Game/src/common/ErrorLogger");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let TabDaiLy = class TabDaiLy {
      constructor() {
        this.node = null;
        this.itemTemplate = null;
      }
      start() {}
      reset() {
        for (let i = 0; i < this.itemTemplate.parent.childrenCount; i++) this.itemTemplate.parent.children[i].active = false;
        this.loadData();
      }
      getItem() {
        let item = null;
        for (let i = 0; i < this.itemTemplate.parent.childrenCount; i++) {
          let node = this.itemTemplate.parent.children[i];
          if (node != this.itemTemplate && !node.active) {
            item = node;
            break;
          }
        }
        if (null == item) {
          item = cc.instantiate(this.itemTemplate);
          item.parent = this.itemTemplate.parent;
        }
        item.active = true;
        return item;
      }
      loadData() {
        App_1.default.instance.showLoading(true);
        Http_1.default.get(Configs_1.default.App.API, {
          c: 401
        }, (err, res) => {
          App_1.default.instance.showLoading(false);
          if (null != err) {
            ErrorLogger_1.ErrorLogger.sendLogError("Http request error", "Get list agency", JSON.stringify(err));
            return;
          }
          if (res["success"]) for (let i = 0; i < res["transactions"].length; i++) {
            let itemData = res["transactions"][i];
            let nickname = itemData["nickName"];
            let item = this.getItem();
            item.getChildByName("bg").opacity = i % 2 == 0 ? 10 : 0;
            item.getChildByName("No.").getComponent(cc.Label).string = (i + 1).toString();
            item.getChildByName("Fullname").getComponent(cc.Label).string = itemData["fullName"];
            item.getChildByName("Nickname").getComponent(cc.Label).string = nickname;
            item.getChildByName("Phone").getComponent(cc.Label).string = itemData["mobile"];
            item.getChildByName("Phone").color = cc.Color.WHITE;
            item.getChildByName("Phone").off("click");
            if (itemData["mobile"] && itemData["mobile"].trim().length > 0 && "0" != itemData["mobile"].trim()[0]) {
              item.getChildByName("Phone").color = cc.Color.CYAN;
              item.getChildByName("Phone").on("click", () => {
                App_1.default.instance.openTelegram(itemData["mobile"]);
              });
            }
            item.getChildByName("Address").getComponent(cc.Label).string = itemData["address"];
            item.getChildByName("BtnFacebook").off("click");
            item.getChildByName("BtnFacebook").on("click", () => {
              cc.sys.openURL(itemData["facebook"]);
            });
            item.getChildByName("BtnTransfer").off("click");
            item.getChildByName("BtnTransfer").on("click", () => {});
          } else ErrorLogger_1.ErrorLogger.sendLogError("Error", "Get list agency", JSON.stringify(res));
        });
      }
    };
    __decorate([ property(cc.Node) ], TabDaiLy.prototype, "node", void 0);
    __decorate([ property(cc.Node) ], TabDaiLy.prototype, "itemTemplate", void 0);
    TabDaiLy = __decorate([ ccclass("PopupCashout.TabDaiLy") ], TabDaiLy);
    let TabBank = class TabBank {
      constructor() {
        this.node = null;
        this.dropdownBank = null;
        this.btnDropdownBank = null;
        this.edbAccountName = null;
        this.edbAccountNumber = null;
        this.dropdownCoin = null;
        this.edbOTP = null;
        this.btnGetOTP = null;
        this.btnSubmit = null;
        this.bankValues = null;
        this.listBank = [];
      }
      start() {
        this.btnSubmit.node.on("click", () => {
          this.submit();
        });
        this.btnGetOTP.node.on("click", () => {
          this.submit(true);
        });
      }
      setBankData(rewards) {
        try {
          const bankRewardItems = Array.from(rewards.values()).find(value => value["type"] === Configs_1.default.App.REWARD_TYPE.BANK)["items"];
          this.getListBank(Math.max.apply(null, bankRewardItems.map(item => item.money)));
          this.bankValues = {
            moneys: [],
            golds: [],
            ids: []
          };
          bankRewardItems.forEach(item => {
            this.bankValues.moneys.push(Utils_1.default.formatNumber(item.money));
            this.bankValues.golds.push(Utils_1.default.formatNumber(item.gold));
            this.bankValues.ids.push(item.id);
          });
          this.dropdownCoin.setOptions(this.bankValues.moneys);
        } catch (error) {
          ErrorLogger_1.ErrorLogger.sendLogError("Data error", "Bank data", JSON.stringify(rewards) + "\n" + JSON.stringify(error.stack));
        }
      }
      getListBank(amount) {
        App_1.default.instance.showLoading(true);
        var params = {
          c: 6010,
          un: Configs_1.default.Login.Username,
          demonition: amount
        };
        Http_1.default.get(Configs_1.default.App.API, params, (err, res) => {
          App_1.default.instance.showLoading(false);
          if (null != err) {
            App_1.default.instance.alertDialog.showMsg("Thao t\xe1c kh\xf4ng th\xe0nh c\xf4ng, vui l\xf2ng th\u1eed l\u1ea1i sau.");
            ErrorLogger_1.ErrorLogger.sendLogError("Http request error", "Get list banker cashout", JSON.stringify(err));
            return;
          }
          cc.log(res);
          if (!res.is_success) {
            ErrorLogger_1.ErrorLogger.sendLogError("Error", "Get list banker cashout", JSON.stringify(res));
            return;
          }
          if (res.data && res.data.data) this.setListBank(res.data.data); else {
            App_1.default.instance.alertDialog.showMsg(res.desc);
            ErrorLogger_1.ErrorLogger.sendLogError("Error", "Get list banker cashout: no data or empty", JSON.stringify(res));
          }
        });
      }
      setListBank(banks) {
        this.listBank = banks;
        this.listBank.forEach(bank => {
          Object.defineProperty(bank, "bankShortName", Object.getOwnPropertyDescriptor(bank, "shortBankName"));
          delete bank["shortBankName"];
        });
        this.dropdownBank.setOptions(this.listBank);
        this.dropdownBank.setOnValueChange(idx => {
          if (idx >= 0) {
            this.btnDropdownBank.getChildByName("lblDropdown").active = false;
            this.btnDropdownBank.getChildByName("currentBank").active = true;
          } else {
            this.btnDropdownBank.getChildByName("lblDropdown").active = true;
            this.btnDropdownBank.getChildByName("currentBank").active = false;
          }
        });
        this.dropdownBank.setValue(-1);
        this.fillAccountBankInfo();
      }
      fillAccountBankInfo() {
        const bankInfoStr = SPUtils_1.default.getBankInfo();
        if (!bankInfoStr) return;
        const bankInfo = JSON.parse(bankInfoStr);
        for (let i = 0; i < this.listBank.length; i++) {
          const bank = this.listBank[i];
          if (bank.bankCode === bankInfo.bankCode) {
            this.dropdownBank.setValue(i);
            this.edbAccountName.string = bankInfo.accountName;
            this.edbAccountNumber.string = bankInfo.accountNumber;
          }
        }
      }
      reset() {
        this.dropdownBank.setValue(-1);
        this.edbAccountName.string = "";
        this.edbAccountNumber.string = "";
        this.dropdownCoin.setValue(-1);
        this.dropdownCoin.label.string = "Ch\u1ecdn m\u1ec7nh gi\xe1";
      }
      submit(getOTP = false) {
        let ddBankValue = this.dropdownBank.getValue();
        let accountName = this.edbAccountName.string.trim();
        let accountNumber = this.edbAccountNumber.string.trim();
        let ddCoinValue = this.dropdownCoin.getValue();
        if (-1 == ddBankValue) {
          App_1.default.instance.alertDialog.showMsg("Vui l\xf2ng ch\u1ecdn ng\xe2n h\xe0ng.");
          return;
        }
        if (0 == accountName.length) {
          App_1.default.instance.alertDialog.showMsg("T\xean t\xe0i kho\u1ea3n kh\xf4ng \u0111\u01b0\u1ee3c \u0111\u1ec3 tr\u1ed1ng.");
          return;
        }
        if (0 == accountNumber.length) {
          App_1.default.instance.alertDialog.showMsg("S\u1ed1 t\xe0i kho\u1ea3n kh\xf4ng \u0111\u01b0\u1ee3c \u0111\u1ec3 tr\u1ed1ng.");
          return;
        }
        if (-1 == ddCoinValue) {
          App_1.default.instance.alertDialog.showMsg("Vui l\xf2ng ch\u1ecdn m\u1ec7nh gi\xe1");
          return;
        }
        App_1.default.instance.confirmDialog.show2("T\u1ea5t c\u1ea3 c\xe1c th\xf4ng tin b\u1ea1n \u0111i\u1ec1n l\xe0 ch\xednh x\xe1c?", isConfirm => {
          if (isConfirm) {
            App_1.default.instance.showLoading(true);
            let params = {
              c: 6e3,
              un: Configs_1.default.Login.Username,
              request_id: this.bankValues.ids[ddCoinValue],
              request_acc_name: accountName,
              request_acc_no: accountNumber,
              request_bank_code: this.listBank[ddBankValue].bankCode
            };
            Http_1.default.get(Configs_1.default.App.API, params, (err, res) => {
              App_1.default.instance.showLoading(false);
              if (null != err) {
                App_1.default.instance.alertDialog.showMsg("Thao t\xe1c kh\xf4ng th\xe0nh c\xf4ng, vui l\xf2ng th\u1eed l\u1ea1i sau.");
                ErrorLogger_1.ErrorLogger.sendLogError("Http request error", "Bank cashout", JSON.stringify(err));
                return;
              }
              cc.log(res);
              BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN);
              if (res.hasOwnProperty("code")) switch (res["code"]) {
               case 0:
                App_1.default.instance.alertDialog.showMsg("H\u1ec7 th\u1ed1ng \u0111\xe3 ti\u1ebfp nh\u1eadn v\xe0 x\u1eed l\xfd.");
                Configs_1.default.Login.Coin = res["currentMoney"];
                BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN);
                SPUtils_1.default.setBankInfo(JSON.stringify({
                  accountNumber: accountNumber,
                  accountName: accountName,
                  bankCode: this.listBank[ddBankValue].bankCode
                }));
                break;

               case 400:
                App_1.default.instance.alertDialog.showMsg("D\u1eef li\u1ec7u g\u1eedi l\xean kh\xf4ng h\u1ee3p l\u1ec7.");
                break;

               case -11:
                App_1.default.instance.alertDialog.showMsg("M\u1ec7nh gi\xe1 g\u1eedi l\xean kh\xf4ng h\u1ee3p l\u1ec7.");
                break;

               case -10:
                App_1.default.instance.alertDialog.showMsg("S\u1ed1 d\u01b0 kh\xf4ng \u0111\u1ee7.");
                break;

               case -99:
                App_1.default.instance.alertDialog.showMsg("T\xe0i kho\u1ea3n c\u1ee7a b\u1ea1n kh\xf4ng \u0111\u01b0\u1ee3c m\u1edf t\xednh n\u0103ng n\xe0y, li\xean h\u1ec7 cskh \u0111\u1ec3 \u0111\u01b0\u1ee3c h\u1ed7 tr\u1ee3.");
                break;

               default:
                App_1.default.instance.alertDialog.showMsg("Thao t\xe1c kh\xf4ng th\xe0nh c\xf4ng, vui l\xf2ng th\u1eed l\u1ea1i sau.");
              } else App_1.default.instance.alertDialog.showMsg(res.desc);
            });
          }
        });
      }
    };
    __decorate([ property(cc.Node) ], TabBank.prototype, "node", void 0);
    __decorate([ property(Lobby_DropdownBank_1.default) ], TabBank.prototype, "dropdownBank", void 0);
    __decorate([ property(cc.Node) ], TabBank.prototype, "btnDropdownBank", void 0);
    __decorate([ property(cc.EditBox) ], TabBank.prototype, "edbAccountName", void 0);
    __decorate([ property(cc.EditBox) ], TabBank.prototype, "edbAccountNumber", void 0);
    __decorate([ property(CustomUI_Dropdown_1.default) ], TabBank.prototype, "dropdownCoin", void 0);
    __decorate([ property(cc.EditBox) ], TabBank.prototype, "edbOTP", void 0);
    __decorate([ property(cc.Button) ], TabBank.prototype, "btnGetOTP", void 0);
    __decorate([ property(cc.Button) ], TabBank.prototype, "btnSubmit", void 0);
    TabBank = __decorate([ ccclass("PopupCashout.TabBank") ], TabBank);
    let TabCard = class TabCard {
      constructor() {
        this.node = null;
        this.dropdownTelco = null;
        this.btnDropdownTelco = null;
        this.dropdownAmount = null;
        this.listFactor = null;
        this.itemRate = null;
        this.telcoValues = [];
      }
      setCardData(rewards) {
        let telcoNames = [];
        this.telcoValues = [];
        for (let [key, value] of rewards) {
          if (value.type !== Configs_1.default.App.REWARD_TYPE.CARD) continue;
          telcoNames.push(key);
          let values = {
            moneys: [],
            golds: [],
            ids: []
          };
          value.items.forEach(item => {
            values.moneys.push(Utils_1.default.formatNumber(item.money));
            values.golds.push(Utils_1.default.formatNumber(item.gold));
            values.ids.push(item.id);
          });
          this.telcoValues.push(values);
        }
        this.dropdownTelco.setOptions(telcoNames);
        this.dropdownTelco.setOnValueChange(idx => {
          if (idx >= 0) {
            this.dropdownAmount.setOptions(this.telcoValues[idx].moneys);
            this.listFactor.removeAllChildren();
            this.itemRate.active = false;
            let telco = this.telcoValues[idx];
            for (let i = 0; i < telco.moneys.length; i++) {
              let item = cc.instantiate(this.itemRate);
              item.x = 0;
              item.parent = this.listFactor;
              item.getChildByName("Amount").getComponent(cc.Label).string = telco.moneys[i];
              item.getChildByName("Value").getComponent(cc.Label).string = telco.golds[i];
              item.active = true;
            }
            this.btnDropdownTelco.getChildByName("lblTelco").active = false;
            this.btnDropdownTelco.getChildByName("currentTelco").active = true;
          } else {
            this.dropdownAmount.setOptions([]);
            this.btnDropdownTelco.getChildByName("lblTelco").active = true;
            this.btnDropdownTelco.getChildByName("currentTelco").active = false;
          }
          this.dropdownAmount.setValue(-1);
          this.dropdownAmount.label.string = "Ch\u1ecdn m\u1ec7nh gi\xe1";
        });
        this.dropdownTelco.setValue(-1);
      }
      reset() {
        this.dropdownTelco.setValue(-1);
      }
      submit() {
        let ddTelcoValue = this.dropdownTelco.getValue();
        let ddAmountValue = this.dropdownAmount.getValue();
        if (-1 == ddTelcoValue) {
          App_1.default.instance.alertDialog.showMsg("Vui l\xf2ng ch\u1ecdn nh\xe0 m\u1ea1ng.");
          return;
        }
        if (-1 == ddAmountValue) {
          App_1.default.instance.alertDialog.showMsg("Vui l\xf2ng ch\u1ecdn m\u1ec7nh gi\xe1.");
          return;
        }
        App_1.default.instance.showLoading(true, 60);
        var params = {
          c: 6e3,
          un: Configs_1.default.Login.Username,
          request_id: this.telcoValues[ddTelcoValue].ids[ddAmountValue]
        };
        Http_1.default.get(Configs_1.default.App.API, params, (err, res) => {
          App_1.default.instance.showLoading(false);
          if (null != err) {
            App_1.default.instance.alertDialog.showMsg("Thao t\xe1c kh\xf4ng th\xe0nh c\xf4ng, vui l\xf2ng th\u1eed l\u1ea1i sau.");
            ErrorLogger_1.ErrorLogger.sendLogError("Http request error", "Telco cashout", JSON.stringify(err));
            return;
          }
          BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN);
          App_1.default.instance.alertDialog.showMsg(res.desc);
        });
      }
    };
    __decorate([ property(cc.Node) ], TabCard.prototype, "node", void 0);
    __decorate([ property(Lobby_DropdownTelco_1.default) ], TabCard.prototype, "dropdownTelco", void 0);
    __decorate([ property(cc.Node) ], TabCard.prototype, "btnDropdownTelco", void 0);
    __decorate([ property(CustomUI_Dropdown_1.default) ], TabCard.prototype, "dropdownAmount", void 0);
    __decorate([ property(cc.Node) ], TabCard.prototype, "listFactor", void 0);
    __decorate([ property(cc.Node) ], TabCard.prototype, "itemRate", void 0);
    TabCard = __decorate([ ccclass("PopupCashout.TabCard") ], TabCard);
    let TabViDienTu = class TabViDienTu {
      constructor() {
        this.node = null;
        this.edbPhone = null;
        this.edbName = null;
        this.dropdownAmount = null;
        this.edbOTP = null;
        this.btnGetOTP = null;
        this.btnSubmit = null;
        this.listFactor = null;
        this.itemRate = null;
        this.started = false;
      }
      start() {
        this.btnSubmit.node.on("click", () => {
          this.submit();
        });
        this.btnGetOTP.node.on("click", () => {
          this.submit(true);
        });
      }
      setWalletData(rewards) {
        if (this.started) return;
        this.started = true;
        this.walletValues = {
          moneys: [ "Ch\u1ecdn m\u1ec7nh gi\xe1" ],
          golds: [ "" ],
          ids: [ -1 ]
        };
        for (let [key, value] of rewards) value.type == Configs_1.default.App.REWARD_TYPE.MOMO && value.items.forEach(item => {
          this.walletValues.moneys.push(Utils_1.default.formatNumber(item.money));
          this.walletValues.golds.push(Utils_1.default.formatNumber(item.gold));
          this.walletValues.ids.push(item.id);
        });
        this.dropdownAmount.setOptions(this.walletValues.moneys);
        this.listFactor.removeAllChildren();
        this.itemRate.active = false;
        for (let i = 1; i < this.walletValues.moneys.length; i++) {
          let item = cc.instantiate(this.itemRate);
          item.x = 0;
          item.parent = this.listFactor;
          item.getChildByName("Amount").getComponent(cc.Label).string = this.walletValues.moneys[i];
          item.getChildByName("Value").getComponent(cc.Label).string = this.walletValues.golds[i];
          item.active = true;
        }
      }
      reset() {
        this.start();
        const momoWalletStr = SPUtils_1.default.getMomoInfo();
        if (momoWalletStr) {
          const momoWallet = JSON.parse(momoWalletStr);
          this.edbPhone.string = momoWallet.accountPhone;
          this.edbName.string = momoWallet.accountName;
        } else {
          this.edbPhone.string = "";
          this.edbName.string = "";
        }
        this.dropdownAmount.setValue(0);
      }
      submit(getOTP = false) {
        let ddAmountValue = this.dropdownAmount.getValue();
        let accountName = this.edbName.string.trim();
        let accountPhone = this.edbPhone.string.trim();
        if (0 == ddAmountValue) {
          App_1.default.instance.alertDialog.showMsg("Vui l\xf2ng ch\u1ecdn m\u1ec7nh gi\xe1.");
          return;
        }
        if (0 == accountName.length) {
          App_1.default.instance.alertDialog.showMsg("T\xean t\xe0i kho\u1ea3n kh\xf4ng \u0111\u01b0\u1ee3c \u0111\u1ec3 tr\u1ed1ng.");
          return;
        }
        if (0 == accountPhone.length) {
          App_1.default.instance.alertDialog.showMsg("S\u1ed1 \u0111i\u1ec7n tho\u1ea1i kh\xf4ng \u0111\u01b0\u1ee3c \u0111\u1ec3 tr\u1ed1ng.");
          return;
        }
        App_1.default.instance.confirmDialog.show2("T\u1ea5t c\u1ea3 c\xe1c th\xf4ng tin b\u1ea1n \u0111i\u1ec1n l\xe0 ch\xednh x\xe1c?", isConfirm => {
          if (isConfirm) {
            App_1.default.instance.showLoading(true);
            let params = {
              c: 6e3,
              un: Configs_1.default.Login.Username,
              request_id: this.walletValues.ids[ddAmountValue],
              account_no: accountPhone,
              account_name: accountName
            };
            Http_1.default.get(Configs_1.default.App.API, params, (err, res) => {
              App_1.default.instance.showLoading(false);
              if (null != err) {
                App_1.default.instance.alertDialog.showMsg("Thao t\xe1c kh\xf4ng th\xe0nh c\xf4ng, vui l\xf2ng th\u1eed l\u1ea1i sau.");
                ErrorLogger_1.ErrorLogger.sendLogError("Http request error", "Momo cashout", JSON.stringify(err));
                return;
              }
              BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN);
              App_1.default.instance.alertDialog.showMsg(res.desc);
              SPUtils_1.default.setMomoInfo(JSON.stringify({
                accountPhone: accountPhone,
                accountName: accountName
              }));
            });
          }
        });
      }
    };
    __decorate([ property(cc.Node) ], TabViDienTu.prototype, "node", void 0);
    __decorate([ property(cc.EditBox) ], TabViDienTu.prototype, "edbPhone", void 0);
    __decorate([ property(cc.EditBox) ], TabViDienTu.prototype, "edbName", void 0);
    __decorate([ property(CustomUI_Dropdown_1.default) ], TabViDienTu.prototype, "dropdownAmount", void 0);
    __decorate([ property(cc.EditBox) ], TabViDienTu.prototype, "edbOTP", void 0);
    __decorate([ property(cc.Button) ], TabViDienTu.prototype, "btnGetOTP", void 0);
    __decorate([ property(cc.Button) ], TabViDienTu.prototype, "btnSubmit", void 0);
    __decorate([ property(cc.Node) ], TabViDienTu.prototype, "listFactor", void 0);
    __decorate([ property(cc.Node) ], TabViDienTu.prototype, "itemRate", void 0);
    TabViDienTu = __decorate([ ccclass("PopupCashout.TabViDienTu") ], TabViDienTu);
    let TabBitCoin = class TabBitCoin {
      constructor() {
        this.node = null;
      }
      start() {}
      reset() {}
      submit() {}
    };
    __decorate([ property(cc.Node) ], TabBitCoin.prototype, "node", void 0);
    TabBitCoin = __decorate([ ccclass("PopupCashout.TabBitCoin") ], TabBitCoin);
    let PopupCashOut = PopupCashOut_1 = class PopupCashOut extends Dialog_1.default {
      constructor() {
        super(...arguments);
        this.tabs = null;
        this.tabContents = null;
        this.tabDaiLy = new TabDaiLy();
        this.tabBank = new TabBank();
        this.tabCard = new TabCard();
        this.tabViDienTu = new TabViDienTu();
        this.tabBitCoin = new TabBitCoin();
        this.tabSelectedIdx = 0;
        this.rewardByProvider = new Map();
      }
      static createAndShow(parent) {
        if (!this.initing) if (null == this.instance || null == this.instance.node) {
          this.initing = true;
          App_1.default.instance.loadPrefab("Lobby/res/prefabs/popups/PopupCashOut", (err, prefab) => {
            this.initing = false;
            if (null != err) {
              App_1.default.instance.alertDialog.showMsg(err);
              return;
            }
            let go = cc.instantiate(prefab);
            go.parent = parent;
            this.instance = go.getComponent(PopupCashOut_1);
            this.instance.show(1);
          });
        } else this.instance.show(1);
      }
      start() {
        for (let i = 0; i < this.tabs.toggleItems.length; i++) this.tabs.toggleItems[i].node.on("click", () => {
          this.tabSelectedIdx = i;
          this.onTabChanged();
        });
        MiniGameNetworkClient_1.default.getInstance().addListener(data => {
          let inpacket = new Network_InPacket_1.default(data);
          switch (inpacket.getCmdId()) {
           case Lobby_Cmd_1.default.Code.BUY_CARD:
            {
              App_1.default.instance.showLoading(false);
              let res = new Lobby_Cmd_1.default.ResBuyCard(data);
              switch (res.error) {
               case 0:
                Lobby_PopupOTP_1.default.createAndShow(App_1.default.instance.popups);
                break;

               case 1:
                App_1.default.instance.alertDialog.showMsg("M\u1ea5t k\u1ebft n\u1ed1i \u0111\u1ebfn server!");
                break;

               case 2:
                App_1.default.instance.alertDialog.showMsg("T\xe0i kho\u1ea3n hi\u1ec7n \u0111ang b\u1ecb c\u1ea5m \u0111\u1ed5i th\u01b0\u1edfng!");
                break;

               case 3:
                App_1.default.instance.alertDialog.showMsg("T\xe0i kho\u1ea3n kh\xf4ng \u0111\u1ee7 s\u1ed1 d\u01b0 kh\u1ea3 d\u1ee5ng!");
                break;

               case 9:
                App_1.default.instance.alertDialog.showMsg("\u0110\u1ec3 th\u1ef1c hi\u1ec7n ch\u1ee9c n\u0103ng \u0111\u1ed5i th\u1ebb, t\xe0i kho\u1ea3n c\u1ea7n \u0111\u0103ng k\xfd b\u1ea3o m\u1eadt! B\u1ea1n c\xf3 mu\u1ed1n \u0111\u0103ng k\xfd b\u1ea3o m\u1eadt lu\xf4n kh\xf4ng?");
                break;

               case 10:
                App_1.default.instance.alertDialog.showMsg("Ch\u1ee9c n\u0103ng n\xe0y s\u1ebd ho\u1ea1t \u0111\u1ed9ng sau 24h k\xedch ho\u1ea1t b\u1ea3o m\u1eadt th\xe0nh c\xf4ng!");
                break;

               case 20:
                App_1.default.instance.alertDialog.showMsg("M\u1ee9c \u0111\u1ed5i v\u01b0\u1ee3t qu\xe1 h\u1ea1n m\u1ee9c trong ng\xe0y c\u1ee7a t\xe0i kho\u1ea3n. Vui l\xf2ng \u0111\u1ee3i \u0111\u1ebfn h\xf4m sau \u0111\u1ec3 th\u1ef1c hi\u1ec7n l\u1ea1i giao d\u1ecbch!");
                break;

               case 21:
                App_1.default.instance.alertDialog.showMsg("Kh\xf4ng th\u1ec3 \u0111\u1ed5i qu\xe1 h\u1ea1n m\u1ee9c trong ng\xe0y c\u1ee7a h\u1ec7 th\u1ed1ng. Vui l\xf2ng \u0111\u1ee3i \u0111\u1ebfn h\xf4m sau \u0111\u1ec3 th\u1ef1c hi\u1ec7n l\u1ea1i giao d\u1ecbch!");
                break;

               default:
                App_1.default.instance.alertDialog.showMsg("L\u1ed7i " + res.error + ". vui l\xf2ng th\u1eed l\u1ea1i sau.");
              }
            }
            break;

           case Lobby_Cmd_1.default.Code.BUY_CARD_RESULT:
            {
              App_1.default.instance.showLoading(false);
              let res = new Lobby_Cmd_1.default.ResBuyCardResult(data);
              switch (res.error) {
               case 0:
                Configs_1.default.Login.Coin = res.currentMoney;
                BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN);
                let resJson = JSON.parse(res.softpin)[0];
                let telco = resJson["provider"];
                let amount = resJson["amount"];
                let code = resJson["pin"];
                let serial = resJson["serial"];
                Lobby_PopupCardInfo_1.default.createAndShow(App_1.default.instance.popups, telco, amount, code, serial);
                break;

               case 1:
                App_1.default.instance.alertDialog.showMsg("K\u1ebft n\u1ed1i m\u1ea1ng kh\xf4ng \u1ed5n \u0111\u1ecbnh. Vui l\xf2ng th\u1eed l\u1ea1i sau!");
                break;

               case 2:
                App_1.default.instance.alertDialog.showMsg("T\xe0i kho\u1ea3n hi\u1ec7n \u0111ang b\u1ecb c\u1ea5m \u0111\u1ed5i th\u01b0\u1edfng!");
                break;

               case 3:
                App_1.default.instance.alertDialog.showMsg("T\xe0i kho\u1ea3n kh\xf4ng \u0111\u1ee7 s\u1ed1 d\u01b0 kh\u1ea3 d\u1ee5ng!");
                break;

               case 9:
                App_1.default.instance.alertDialog.showMsg("\u0110\u1ec3 th\u1ef1c hi\u1ec7n ch\u1ee9c n\u0103ng \u0111\u1ed5i th\u1ebb, t\xe0i kho\u1ea3n c\u1ea7n \u0111\u0103ng k\xfd b\u1ea3o m\u1eadt! B\u1ea1n c\xf3 mu\u1ed1n \u0111\u0103ng k\xfd b\u1ea3o m\u1eadt lu\xf4n kh\xf4ng?");
                break;

               case 10:
                App_1.default.instance.alertDialog.showMsg("Ch\u1ee9c n\u0103ng n\xe0y s\u1ebd ho\u1ea1t \u0111\u1ed9ng sau 24h k\xedch ho\u1ea1t b\u1ea3o m\u1eadt th\xe0nh c\xf4ng!");
                break;

               case 20:
                App_1.default.instance.alertDialog.showMsg("M\u1ee9c \u0111\u1ed5i v\u01b0\u1ee3t qu\xe1 h\u1ea1n m\u1ee9c trong ng\xe0y c\u1ee7a t\xe0i kho\u1ea3n. Vui l\xf2ng \u0111\u1ee3i \u0111\u1ebfn h\xf4m sau \u0111\u1ec3 th\u1ef1c hi\u1ec7n l\u1ea1i giao d\u1ecbch!");
                break;

               case 21:
                App_1.default.instance.alertDialog.showMsg("Kh\xf4ng th\u1ec3 \u0111\u1ed5i qu\xe1 h\u1ea1n m\u1ee9c trong ng\xe0y c\u1ee7a h\u1ec7 th\u1ed1ng. Vui l\xf2ng \u0111\u1ee3i \u0111\u1ebfn h\xf4m sau \u0111\u1ec3 th\u1ef1c hi\u1ec7n l\u1ea1i giao d\u1ecbch!");
                break;

               case 22:
                App_1.default.instance.alertDialog.showMsg("S\u1ed1 l\u01b0\u1ee3ng th\u1ebb \u0111\u1ed5i \u0111\xe3 qu\xe1 h\u1ea1n m\u1ee9c. B\u1ea1n vui l\xf2ng quay tr\u1edf l\u1ea1i sau!");
                break;

               case 30:
                App_1.default.instance.alertDialog.showMsg("Giao d\u1ecbch \u0111ang ch\u1edd x\u1eed l\xfd!");
                break;

               default:
                App_1.default.instance.alertDialog.showMsg("L\u1ed7i " + res.error + ". vui l\xf2ng th\u1eed l\u1ea1i sau.");
              }
            }
          }
        }, this);
        this.tabDaiLy.start();
        this.tabBitCoin.start();
        this.tabBank.start();
      }
      show(idx = 0) {
        super.show();
        this.getCashOutCfg();
        this.tabSelectedIdx = idx;
        this.tabs.toggleItems[this.tabSelectedIdx].isChecked = true;
        this.onTabChanged();
      }
      actCardSubmit() {
        this.tabCard.submit();
      }
      onTabChanged() {
        for (let i = 0; i < this.tabContents.childrenCount; i++) this.tabContents.children[i].active = i == this.tabSelectedIdx;
        for (let j = 0; j < this.tabs.toggleItems.length; j++) this.tabs.toggleItems[j].node.getComponentInChildren(cc.Label).node.opacity = j == this.tabSelectedIdx ? 255 : 123;
        switch (this.tabSelectedIdx) {
         case 0:
          this.tabDaiLy.reset();
          break;

         case 1:
          this.tabBank.reset();
          break;

         case 2:
          this.tabCard.reset();
          break;

         case 3:
          this.tabViDienTu.reset();
          break;

         case 4:
          this.tabBitCoin.reset();
        }
      }
      getCashOutCfg() {
        App_1.default.instance.showLoading(true);
        var params = {
          c: 6002
        };
        Http_1.default.get(Configs_1.default.App.API, params, (err, res) => {
          App_1.default.instance.showLoading(false);
          if (null != err) {
            App_1.default.instance.alertDialog.showMsg("Thao t\xe1c kh\xf4ng th\xe0nh c\xf4ng, vui l\xf2ng th\u1eed l\u1ea1i sau.");
            ErrorLogger_1.ErrorLogger.sendLogError("Http request error", "Get cashout config", JSON.stringify(err));
            return;
          }
          cc.log(res);
          this.onCashOutCfgDone(res);
        });
      }
      onCashOutCfgDone(res) {
        this.rewardByProvider = new Map();
        res.forEach(reward => {
          reward.provider = Configs_1.default.Payment.getTelcoProvider(reward.provider);
          if (void 0 === this.rewardByProvider.get(reward.provider)) this.rewardByProvider.set(reward.provider, {
            type: reward.type,
            items: [ reward ]
          }); else {
            var currRewards = this.rewardByProvider.get(reward.provider).items;
            currRewards.push(reward);
          }
        });
        this.tabCard.setCardData(this.rewardByProvider);
        this.tabViDienTu.setWalletData(this.rewardByProvider);
        this.tabBank.setBankData(this.rewardByProvider);
      }
    };
    PopupCashOut.instance = null;
    PopupCashOut.initing = false;
    __decorate([ property(cc.ToggleContainer) ], PopupCashOut.prototype, "tabs", void 0);
    __decorate([ property(cc.Node) ], PopupCashOut.prototype, "tabContents", void 0);
    __decorate([ property(TabDaiLy) ], PopupCashOut.prototype, "tabDaiLy", void 0);
    __decorate([ property(TabBank) ], PopupCashOut.prototype, "tabBank", void 0);
    __decorate([ property(TabCard) ], PopupCashOut.prototype, "tabCard", void 0);
    __decorate([ property(TabViDienTu) ], PopupCashOut.prototype, "tabViDienTu", void 0);
    __decorate([ property(TabBitCoin) ], PopupCashOut.prototype, "tabBitCoin", void 0);
    PopupCashOut = PopupCashOut_1 = __decorate([ ccclass ], PopupCashOut);
    exports.default = PopupCashOut;
    cc._RF.pop();
  }, {
    "../../Game/src/common/App": "App",
    "../../Game/src/common/BroadcastReceiver": "BroadcastReceiver",
    "../../Game/src/common/Configs": "Configs",
    "../../Game/src/common/Dialog": "Dialog",
    "../../Game/src/common/ErrorLogger": "ErrorLogger",
    "../../Game/src/common/Http": "Http",
    "../../Game/src/common/SPUtils": "SPUtils",
    "../../Game/src/common/Utils": "Utils",
    "../../Game/src/customui/CustomUI.Dropdown": "CustomUI.Dropdown",
    "../../Game/src/networks/MiniGameNetworkClient": "MiniGameNetworkClient",
    "../../Game/src/networks/Network.InPacket": "Network.InPacket",
    "./Lobby.Cmd": "Lobby.Cmd",
    "./Lobby.DropdownBank": "Lobby.DropdownBank",
    "./Lobby.DropdownTelco": "Lobby.DropdownTelco",
    "./Lobby.PopupCardInfo": "Lobby.PopupCardInfo",
    "./Lobby.PopupOTP": "Lobby.PopupOTP"
  } ],
  "Lobby.PopupChangeAvatar": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1e068IDVrtHA7QukHeOfngS", "Lobby.PopupChangeAvatar");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var PopupChangeAvatar_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Dialog_1 = require("../../Game/src/common/Dialog");
    const Configs_1 = require("../../Game/src/common/Configs");
    const App_1 = require("../../Game/src/common/App");
    const Http_1 = require("../../Game/src/common/Http");
    const BroadcastReceiver_1 = require("../../Game/src/common/BroadcastReceiver");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let PopupChangeAvatar = PopupChangeAvatar_1 = class PopupChangeAvatar extends Dialog_1.default {
      constructor() {
        super(...arguments);
        this.items = null;
        this.itemTemplate = null;
        this.selectedIdx = -1;
      }
      start() {
        for (let i = 0; i < App_1.default.instance.sprFrameAvatars.length; i++) {
          let item = cc.instantiate(this.itemTemplate);
          item.parent = this.items;
          item.getChildByName("sprite").getComponent(cc.Sprite).spriteFrame = App_1.default.instance.sprFrameAvatars[i];
          item.name = App_1.default.instance.sprFrameAvatars[i].name;
          if (App_1.default.instance.sprFrameAvatars[i].name == Configs_1.default.Login.Avatar) {
            this.selectedIdx = i;
            item.getChildByName("selected").active = true;
          } else item.getChildByName("selected").active = false;
          item.on("click", () => {
            this.selectedIdx = i;
            for (let j = 0; j < this.items.childrenCount; j++) {
              let item = this.items.children[j];
              item.getChildByName("selected").active = j == this.selectedIdx;
            }
          });
          this.selectedIdx = i;
        }
        this.itemTemplate.removeFromParent();
        this.itemTemplate = null;
      }
      static createAndShow(parent) {
        if (!this.initing) if (null == this.instance || null == this.instance.node) {
          this.initing = true;
          App_1.default.instance.loadPrefab("Lobby/res/prefabs/popups/PopupChangeAvatar", (err, prefab) => {
            this.initing = false;
            if (null != err) {
              App_1.default.instance.alertDialog.showMsg(err);
              return;
            }
            let go = cc.instantiate(prefab);
            go.parent = parent;
            this.instance = go.getComponent(PopupChangeAvatar_1);
            this.instance.node.zIndex = 1e3;
            this.instance.show();
          });
        } else {
          this.instance.node.zIndex = 1e3;
          this.instance.show();
        }
      }
      show() {
        super.show();
        this.selectedIdx = -1;
        if (null == this.itemTemplate) for (let i = 0; i < this.items.childrenCount; i++) {
          let item = this.items.children[i];
          if (item.name == Configs_1.default.Login.Avatar) {
            this.selectedIdx = i;
            item.getChildByName("selected").active = true;
          } else item.getChildByName("selected").active = false;
        }
      }
      actSubmit() {
        Http_1.default.get(Configs_1.default.App.API, {
          c: 125,
          nn: Configs_1.default.Login.Nickname,
          avatar: App_1.default.instance.sprFrameAvatars[this.selectedIdx].name
        }, (err, res) => {
          if (null != err) {
            App_1.default.instance.alertDialog.showMsg("X\u1ea3y ra l\u1ed7i, vui l\xf2ng th\u1eed l\u1ea1i sau!");
            return;
          }
          if (!res["success"]) {
            res["errorCode"];
            App_1.default.instance.alertDialog.showMsg("L\u1ed7i " + res["errorCode"] + ". Kh\xf4ng x\xe1c \u0111\u1ecbnh.");
            return;
          }
          this.dismiss();
          Configs_1.default.Login.Avatar = App_1.default.instance.sprFrameAvatars[this.selectedIdx].name;
          BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_INFO_UPDATED);
          App_1.default.instance.alertDialog.showMsg("Thao t\xe1c th\xe0nh c\xf4ng!");
        });
      }
    };
    PopupChangeAvatar.instance = null;
    PopupChangeAvatar.initing = false;
    __decorate([ property(cc.Node) ], PopupChangeAvatar.prototype, "items", void 0);
    __decorate([ property(cc.Node) ], PopupChangeAvatar.prototype, "itemTemplate", void 0);
    PopupChangeAvatar = PopupChangeAvatar_1 = __decorate([ ccclass ], PopupChangeAvatar);
    exports.default = PopupChangeAvatar;
    cc._RF.pop();
  }, {
    "../../Game/src/common/App": "App",
    "../../Game/src/common/BroadcastReceiver": "BroadcastReceiver",
    "../../Game/src/common/Configs": "Configs",
    "../../Game/src/common/Dialog": "Dialog",
    "../../Game/src/common/Http": "Http"
  } ],
  "Lobby.PopupChangePassword": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f484cLb6SZFhKtzWQAjnW01", "Lobby.PopupChangePassword");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var PopupChangePassword_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Dialog_1 = require("../../../Game/src/common/Dialog");
    const App_1 = require("../../../Game/src/common/App");
    const Http_1 = require("../../../Game/src/common/Http");
    const Configs_1 = require("../../../Game/src/common/Configs");
    const BroadcastReceiver_1 = require("../../../Game/src/common/BroadcastReceiver");
    const Lobby_PopupProfile_1 = require("../Lobby.PopupProfile");
    const Lobby_PopupLogin_1 = require("./Lobby.PopupLogin");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let PopupChangePassword = PopupChangePassword_1 = class PopupChangePassword extends Dialog_1.default {
      constructor() {
        super(...arguments);
        this.edbOldPassword = null;
        this.edbNewPassword = null;
        this.edbReNewPassword = null;
        this.edbOTP = null;
        this.changePassGroup = null;
        this.otpGroup = null;
      }
      static createAndShow(parent) {
        if (!this.initing) if (null == this.instance || null == this.instance.node) {
          this.initing = true;
          App_1.default.instance.loadPrefab("Lobby/res/prefabs/popups/PopupChangePassword", (err, prefab) => {
            this.initing = false;
            if (null != err) {
              App_1.default.instance.alertDialog.showMsg(err);
              return;
            }
            let go = cc.instantiate(prefab);
            go.parent = parent;
            this.instance = go.getComponent(PopupChangePassword_1);
            this.instance.node.zIndex = 1e3;
            this.instance.show();
          });
        } else {
          this.instance.node.zIndex = 1e3;
          this.instance.show();
        }
      }
      show() {
        super.show();
        this.edbOldPassword.string = "";
        this.edbNewPassword.string = "";
        this.edbReNewPassword.string = "";
        this.edbOTP.string = "";
        this.changePassGroup.active = true;
        this.otpGroup.active = false;
      }
      actSubmit() {
        let oldPassword = this.edbOldPassword.string.trim();
        let newPassword = this.edbNewPassword.string.trim();
        let reNewPassword = this.edbReNewPassword.string.trim();
        if (0 == oldPassword.length) {
          App_1.default.instance.alertDialog.showMsg("M\u1eadt kh\u1ea9u c\u0169 kh\xf4ng \u0111\u01b0\u1ee3c \u0111\u1ec3 tr\u1ed1ng.");
          return;
        }
        if (0 == newPassword.length) {
          App_1.default.instance.alertDialog.showMsg("M\u1eadt kh\u1ea9u m\u1edbi kh\xf4ng \u0111\u01b0\u1ee3c \u0111\u1ec3 tr\u1ed1ng.");
          return;
        }
        if (reNewPassword != newPassword) {
          App_1.default.instance.alertDialog.showMsg("Hai m\u1eadt kh\u1ea9u m\u1edbi kh\xf4ng gi\u1ed1ng nhau.");
          return;
        }
        App_1.default.instance.showLoading(true);
        Http_1.default.post(Configs_1.default.App.API + "?c=4006", {
          op: md5(oldPassword),
          np: md5(newPassword),
          otp: ""
        }, (err, res) => {
          App_1.default.instance.showLoading(false);
          if (null != err) {
            App_1.default.instance.alertDialog.showMsg("X\u1ea3y ra l\u1ed7i, vui l\xf2ng th\u1eed l\u1ea1i sau!");
            return;
          }
          cc.log(res);
          if (res["success"]) this.onChangePasswordSuccess(); else {
            if (1012 === parseInt(res["errorCode"])) {
              this.changePassGroup.active = false;
              this.otpGroup.active = true;
              return;
            }
            App_1.default.instance.alertDialog.showMsg(res["desc"] || "L\u1ed7i kh\xf4ng x\xe1c \u0111\u1ecbnh.");
          }
        });
      }
      actSubmitOTP() {
        let oldPassword = this.edbOldPassword.string.trim();
        let newPassword = this.edbNewPassword.string.trim();
        let otp = this.edbOTP.string.trim();
        if (0 == otp.length) {
          App_1.default.instance.alertDialog.showMsg("OTP kh\xf4ng \u0111\u01b0\u1ee3c \u0111\u1ec3 tr\u1ed1ng.");
          return;
        }
        App_1.default.instance.showLoading(true);
        Http_1.default.post(Configs_1.default.App.API + "?c=4006", {
          op: md5(oldPassword),
          np: md5(newPassword),
          otp: otp
        }, (err, res) => {
          App_1.default.instance.showLoading(false);
          if (null != err) {
            App_1.default.instance.alertDialog.showMsg("X\u1ea3y ra l\u1ed7i, vui l\xf2ng th\u1eed l\u1ea1i sau!");
            return;
          }
          cc.log(res);
          res["success"] ? this.onChangePasswordSuccess() : App_1.default.instance.alertDialog.showMsg(res["desc"] || "L\u1ed7i kh\xf4ng x\xe1c \u0111\u1ecbnh.");
        });
      }
      actGetOTP() {
        App_1.default.instance.showLoading(true);
        Http_1.default.post(Configs_1.default.App.API + "?c=6023", {
          username: Configs_1.default.Login.Username
        }, (err, res) => {
          App_1.default.instance.showLoading(false);
          if (null != err) {
            App_1.default.instance.alertDialog.showMsg("X\u1ea3y ra l\u1ed7i, vui l\xf2ng th\u1eed l\u1ea1i sau!");
            return;
          }
          cc.log(res);
          if (!res["success"]) {
            App_1.default.instance.alertDialog.showMsg(res["desc"] || "L\u1ed7i kh\xf4ng x\xe1c \u0111\u1ecbnh.");
            return;
          }
        });
      }
      onChangePasswordSuccess() {
        this.dismiss();
        Lobby_PopupProfile_1.default.instance.dismiss();
        App_1.default.instance.alertDialog.showMsgWithOnDismissed("\u0110\u1ed5i m\u1eadt kh\u1ea9u th\xe0nh c\xf4ng", () => {
          BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_LOGOUT);
          Lobby_PopupLogin_1.default.createAndShow(App_1.default.instance.popups);
        });
      }
    };
    PopupChangePassword.instance = null;
    PopupChangePassword.initing = false;
    __decorate([ property(cc.EditBox) ], PopupChangePassword.prototype, "edbOldPassword", void 0);
    __decorate([ property(cc.EditBox) ], PopupChangePassword.prototype, "edbNewPassword", void 0);
    __decorate([ property(cc.EditBox) ], PopupChangePassword.prototype, "edbReNewPassword", void 0);
    __decorate([ property(cc.EditBox) ], PopupChangePassword.prototype, "edbOTP", void 0);
    __decorate([ property(cc.Node) ], PopupChangePassword.prototype, "changePassGroup", void 0);
    __decorate([ property(cc.Node) ], PopupChangePassword.prototype, "otpGroup", void 0);
    PopupChangePassword = PopupChangePassword_1 = __decorate([ ccclass ], PopupChangePassword);
    exports.default = PopupChangePassword;
    cc._RF.pop();
  }, {
    "../../../Game/src/common/App": "App",
    "../../../Game/src/common/BroadcastReceiver": "BroadcastReceiver",
    "../../../Game/src/common/Configs": "Configs",
    "../../../Game/src/common/Dialog": "Dialog",
    "../../../Game/src/common/Http": "Http",
    "../Lobby.PopupProfile": "Lobby.PopupProfile",
    "./Lobby.PopupLogin": "Lobby.PopupLogin"
  } ],
  "Lobby.PopupCommunity": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2457d9DGdRDQJIGfvQKDdJR", "Lobby.PopupCommunity");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var PopupCommunity_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const App_1 = require("../../Game/src/common/App");
    const Configs_1 = require("../../Game/src/common/Configs");
    const Dialog_1 = require("../../Game/src/common/Dialog");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let PopupCommunity = PopupCommunity_1 = class PopupCommunity extends Dialog_1.default {
      static createAndShow(parent) {
        if (!this.initing) if (null == this.instance || null == this.instance.node) {
          this.initing = true;
          App_1.default.instance.loadPrefab("Lobby/res/prefabs/popups/PopupCommunity", (err, prefab) => {
            this.initing = false;
            if (null != err) {
              App_1.default.instance.alertDialog.showMsg(err);
              return;
            }
            let go = cc.instantiate(prefab);
            go.parent = parent;
            this.instance = go.getComponent(PopupCommunity_1);
            this.instance.show();
          });
        } else this.instance.show();
      }
      actFanpage() {
        cc.sys.openURL(Configs_1.default.App.FANPAGE);
        this.dismiss();
      }
      actTeleNew() {
        App_1.default.instance.openTelegram(Configs_1.default.App.TELE_NEWS);
        this.dismiss();
      }
      actFbGroup() {
        cc.sys.openURL(Configs_1.default.App.FB_GROUP);
        this.dismiss();
      }
    };
    PopupCommunity.instance = null;
    PopupCommunity.initing = false;
    PopupCommunity = PopupCommunity_1 = __decorate([ ccclass ], PopupCommunity);
    exports.default = PopupCommunity;
    cc._RF.pop();
  }, {
    "../../Game/src/common/App": "App",
    "../../Game/src/common/Configs": "Configs",
    "../../Game/src/common/Dialog": "Dialog"
  } ],
  "Lobby.PopupCustomerCare": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "756701Vo1lOjYfviop/qQff", "Lobby.PopupCustomerCare");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var PopupCustomerCare_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const App_1 = require("../../Game/src/common/App");
    const Configs_1 = require("../../Game/src/common/Configs");
    const Dialog_1 = require("../../Game/src/common/Dialog");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let PopupCustomerCare = PopupCustomerCare_1 = class PopupCustomerCare extends Dialog_1.default {
      static createAndShow(parent) {
        if (!this.initing) if (null == this.instance || null == this.instance.node) {
          this.initing = true;
          App_1.default.instance.loadPrefab("Lobby/res/prefabs/popups/PopupCustomerCare", (err, prefab) => {
            this.initing = false;
            if (null != err) {
              App_1.default.instance.alertDialog.showMsg(err);
              return;
            }
            let go = cc.instantiate(prefab);
            go.parent = parent;
            this.instance = go.getComponent(PopupCustomerCare_1);
            this.instance.show();
          });
        } else this.instance.show();
      }
      actTelegram() {
        App_1.default.instance.openTelegram(Configs_1.default.App.TELE_SUPPORT);
        this.dismiss();
      }
      actMessenger() {
        cc.sys.openURL(Configs_1.default.App.FB_MESSENGER);
        this.dismiss();
      }
      actFanpage() {
        cc.sys.openURL(Configs_1.default.App.FANPAGE);
        this.dismiss();
      }
      actTeleNew() {
        App_1.default.instance.openTelegram(Configs_1.default.App.TELE_NEWS);
        this.dismiss();
      }
    };
    PopupCustomerCare.instance = null;
    PopupCustomerCare.initing = false;
    PopupCustomerCare = PopupCustomerCare_1 = __decorate([ ccclass ], PopupCustomerCare);
    exports.default = PopupCustomerCare;
    cc._RF.pop();
  }, {
    "../../Game/src/common/App": "App",
    "../../Game/src/common/Configs": "Configs",
    "../../Game/src/common/Dialog": "Dialog"
  } ],
  "Lobby.PopupDaiLy": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "37f697f/FRA263tKXfNN6nC", "Lobby.PopupDaiLy");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var PopupDaiLy_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Dialog_1 = require("../../Game/src/common/Dialog");
    const App_1 = require("../../Game/src/common/App");
    const Http_1 = require("../../Game/src/common/Http");
    const Configs_1 = require("../../Game/src/common/Configs");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let PopupDaiLy = PopupDaiLy_1 = class PopupDaiLy extends Dialog_1.default {
      constructor() {
        super(...arguments);
        this.itemTemplate = null;
      }
      static createAndShow(parent) {
        if (!this.initing) if (null == this.instance || null == this.instance.node) {
          this.initing = true;
          App_1.default.instance.loadPrefab("Lobby/res/prefabs/popups/PopupDaiLy", (err, prefab) => {
            this.initing = false;
            if (null != err) {
              App_1.default.instance.alertDialog.showMsg(err);
              return;
            }
            let go = cc.instantiate(prefab);
            go.parent = parent;
            this.instance = go.getComponent(PopupDaiLy_1);
            this.instance.node.zIndex = 1e3;
            this.instance.show();
          });
        } else {
          this.instance.node.zIndex = 1e3;
          this.instance.show();
        }
      }
      show() {
        super.show();
        for (let i = 0; i < this.itemTemplate.parent.childrenCount; i++) this.itemTemplate.parent.children[i].active = false;
      }
      dismiss() {
        super.dismiss();
        for (let i = 0; i < this.itemTemplate.parent.childrenCount; i++) this.itemTemplate.parent.children[i].active = false;
      }
      _onShowed() {
        super._onShowed();
        this.loadData();
      }
      getItem() {
        let item = null;
        for (let i = 0; i < this.itemTemplate.parent.childrenCount; i++) {
          let node = this.itemTemplate.parent.children[i];
          if (node != this.itemTemplate && !node.active) {
            item = node;
            break;
          }
        }
        if (null == item) {
          item = cc.instantiate(this.itemTemplate);
          item.parent = this.itemTemplate.parent;
        }
        item.active = true;
        return item;
      }
      loadData() {
        App_1.default.instance.showLoading(true);
        Http_1.default.get(Configs_1.default.App.API, {
          c: 401
        }, (err, res) => {
          App_1.default.instance.showLoading(false);
          if (null != err) return;
          if (res["success"]) for (let i = 0; i < res["transactions"].length; i++) {
            let itemData = res["transactions"][i];
            let nickname = itemData["nickName"];
            let item = this.getItem();
            item.getChildByName("bg").opacity = i % 2 == 0 ? 10 : 0;
            item.getChildByName("No.").getComponent(cc.Label).string = (i + 1).toString();
            item.getChildByName("Fullname").getComponent(cc.Label).string = itemData["fullName"];
            item.getChildByName("Nickname").getComponent(cc.Label).string = nickname;
            item.getChildByName("Phone").getComponent(cc.Label).string = itemData["mobile"];
            item.getChildByName("Phone").color = cc.Color.WHITE;
            item.getChildByName("Phone").off("click");
            if (itemData["mobile"] && itemData["mobile"].trim().length > 0 && "0" != itemData["mobile"].trim()[0]) {
              item.getChildByName("Phone").color = cc.Color.CYAN;
              item.getChildByName("Phone").on("click", () => {
                App_1.default.instance.openTelegram(itemData["mobile"]);
              });
            }
            item.getChildByName("Address").getComponent(cc.Label).string = itemData["address"];
            item.getChildByName("BtnFacebook").off("click");
            item.getChildByName("BtnFacebook").on("click", () => {
              cc.sys.openURL(itemData["facebook"]);
            });
            item.getChildByName("BtnTransfer").off("click");
            item.getChildByName("BtnTransfer").on("click", () => {});
          }
        });
      }
    };
    PopupDaiLy.instance = null;
    PopupDaiLy.initing = false;
    __decorate([ property(cc.Node) ], PopupDaiLy.prototype, "itemTemplate", void 0);
    PopupDaiLy = PopupDaiLy_1 = __decorate([ ccclass ], PopupDaiLy);
    exports.default = PopupDaiLy;
    cc._RF.pop();
  }, {
    "../../Game/src/common/App": "App",
    "../../Game/src/common/Configs": "Configs",
    "../../Game/src/common/Dialog": "Dialog",
    "../../Game/src/common/Http": "Http"
  } ],
  "Lobby.PopupEvent": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f0404XvYDhCeJK+bUb6fdIu", "Lobby.PopupEvent");
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
    let PopupEvent = class PopupEvent extends cc.Component {
      constructor() {
        super(...arguments);
        this.lstContent = [];
        this.eventTitleScroll = null;
        this.contentScroll = null;
      }
      eventTitleClick(event, eventData) {
        this.lstContent.forEach(item => {
          item.active = false;
        });
        this.lstContent[Number(eventData)].active = true;
        this.contentScroll.content = this.lstContent[Number(eventData)];
        this.contentScroll.scrollToTop(.2);
        event.target.parent.children.forEach(item => {
          item.getChildByName("selected").active = false;
        });
        event.target.getChildByName("selected").active = true;
      }
    };
    __decorate([ property(cc.Node) ], PopupEvent.prototype, "lstContent", void 0);
    __decorate([ property(cc.ScrollView) ], PopupEvent.prototype, "eventTitleScroll", void 0);
    __decorate([ property(cc.ScrollView) ], PopupEvent.prototype, "contentScroll", void 0);
    PopupEvent = __decorate([ ccclass("") ], PopupEvent);
    exports.default = PopupEvent;
    cc._RF.pop();
  }, {} ],
  "Lobby.PopupForgetPassword": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c06bb5wJPhLSLer1tnZVR/5", "Lobby.PopupForgetPassword");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var PopupForgetPassword_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Dialog_1 = require("../../../Game/src/common/Dialog");
    const Http_1 = require("../../../Game/src/common/Http");
    const Configs_1 = require("../../../Game/src/common/Configs");
    const Utils_1 = require("../../../Game/src/common/Utils");
    const App_1 = require("../../../Game/src/common/App");
    const Lobby_PopupResetPassword_1 = require("./Lobby.PopupResetPassword");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let PopupForgetPassword = PopupForgetPassword_1 = class PopupForgetPassword extends Dialog_1.default {
      constructor() {
        super(...arguments);
        this.edbUsername = null;
        this.edbCaptcha = null;
        this.sprCaptcha = null;
        this.edbOTP = null;
      }
      static createAndShow(parent) {
        if (!this.initing) if (null == this.instance || null == this.instance.node) {
          this.initing = true;
          App_1.default.instance.loadPrefab("Lobby/res/prefabs/popups/PopupForgetPassword", (err, prefab) => {
            this.initing = false;
            if (null != err) {
              App_1.default.instance.alertDialog.showMsg(err);
              return;
            }
            let go = cc.instantiate(prefab);
            go.parent = parent;
            this.instance = go.getComponent(PopupForgetPassword_1);
            this.instance.node.zIndex = 1e3;
            this.instance.show();
          });
        } else {
          this.instance.node.zIndex = 1e3;
          this.instance.show();
        }
      }
      show() {
        super.show();
        this.edbCaptcha.string = "";
        this.edbUsername.string = "";
        this.edbOTP.string = "";
        this.actRefreshCaptcha();
      }
      actRefreshCaptcha() {
        Http_1.default.get(Configs_1.default.App.API, {
          c: 124,
          requireLogin: false
        }, (err, res) => {
          if (null != err) {
            App_1.default.instance.alertDialog.showMsg("X\u1ea3y ra l\u1ed7i, vui l\xf2ng th\u1eed l\u1ea1i sau!");
            return;
          }
          this.captchaId = res["id"];
          Utils_1.default.loadSpriteFrameFromBase64(res["img"], sprFrame => {
            this.sprCaptcha.spriteFrame = sprFrame;
          });
        });
      }
      actGetOTP() {
        let username = this.edbUsername.string.trim();
        if (0 == username.length) {
          App_1.default.instance.alertDialog.showMsg("T\xean \u0111\u0103ng nh\u1eadp kh\xf4ng \u0111\u01b0\u1ee3c \u0111\u1ec3 tr\u1ed1ng.");
          return;
        }
        Http_1.default.post(Configs_1.default.App.API + "?c=6023", {
          username: username
        }, (err, res) => {
          if (null != err) {
            App_1.default.instance.alertDialog.showMsg("X\u1ea3y ra l\u1ed7i, vui l\xf2ng th\u1eed l\u1ea1i sau!");
            return;
          }
          cc.log(res);
          if (!res["success"]) {
            App_1.default.instance.alertDialog.showMsg(res["desc"] || "L\u1ed7i kh\xf4ng x\xe1c \u0111\u1ecbnh.");
            return;
          }
        });
      }
      actSubmit() {
        let username = this.edbUsername.string.trim();
        let captcha = this.edbCaptcha.string.trim();
        let otp = this.edbOTP.string.trim();
        if (0 == username.length) {
          App_1.default.instance.alertDialog.showMsg("T\xean \u0111\u0103ng nh\u1eadp kh\xf4ng \u0111\u01b0\u1ee3c \u0111\u1ec3 tr\u1ed1ng.");
          return;
        }
        if (0 == captcha.length) {
          App_1.default.instance.alertDialog.showMsg("M\xe3 x\xe1c th\u1ef1c kh\xf4ng \u0111\u01b0\u1ee3c \u0111\u1ec3 tr\u1ed1ng.");
          return;
        }
        if (0 == otp.length) {
          App_1.default.instance.alertDialog.showMsg("M\xe3 OTP kh\xf4ng \u0111\u01b0\u1ee3c \u0111\u1ec3 tr\u1ed1ng.");
          return;
        }
        Http_1.default.post(Configs_1.default.App.API + "?c=6024", {
          username: username,
          captcha: captcha,
          captchaId: this.captchaId,
          otp: otp
        }, (err, res) => {
          if (null != err) {
            App_1.default.instance.alertDialog.showMsg("X\u1ea3y ra l\u1ed7i, vui l\xf2ng th\u1eed l\u1ea1i sau!");
            return;
          }
          cc.log(res);
          if (!res["success"]) {
            this.actRefreshCaptcha();
            App_1.default.instance.alertDialog.showMsg(res["desc"] || "L\u1ed7i kh\xf4ng x\xe1c \u0111\u1ecbnh.");
            return;
          }
          Lobby_PopupResetPassword_1.default.createAndShow(App_1.default.instance.popups, username, res["nickname"], res["at"]);
          this.dismiss();
        });
      }
    };
    PopupForgetPassword.instance = null;
    PopupForgetPassword.initing = false;
    __decorate([ property(cc.EditBox) ], PopupForgetPassword.prototype, "edbUsername", void 0);
    __decorate([ property(cc.EditBox) ], PopupForgetPassword.prototype, "edbCaptcha", void 0);
    __decorate([ property(cc.Sprite) ], PopupForgetPassword.prototype, "sprCaptcha", void 0);
    __decorate([ property(cc.EditBox) ], PopupForgetPassword.prototype, "edbOTP", void 0);
    PopupForgetPassword = PopupForgetPassword_1 = __decorate([ ccclass ], PopupForgetPassword);
    exports.default = PopupForgetPassword;
    cc._RF.pop();
  }, {
    "../../../Game/src/common/App": "App",
    "../../../Game/src/common/Configs": "Configs",
    "../../../Game/src/common/Dialog": "Dialog",
    "../../../Game/src/common/Http": "Http",
    "../../../Game/src/common/Utils": "Utils",
    "./Lobby.PopupResetPassword": "Lobby.PopupResetPassword"
  } ],
  "Lobby.PopupGiftCode": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5e3ecLUt8VCSbklBKZNYvAF", "Lobby.PopupGiftCode");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var PopupGiftCode_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Dialog_1 = require("../../Game/src/common/Dialog");
    const MiniGameNetworkClient_1 = require("../../Game/src/networks/MiniGameNetworkClient");
    const App_1 = require("../../Game/src/common/App");
    const Network_InPacket_1 = require("../../Game/src/networks/Network.InPacket");
    const Lobby_Cmd_1 = require("./Lobby.Cmd");
    const BroadcastReceiver_1 = require("../../Game/src/common/BroadcastReceiver");
    const Configs_1 = require("../../Game/src/common/Configs");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let PopupGiftCode = PopupGiftCode_1 = class PopupGiftCode extends Dialog_1.default {
      constructor() {
        super(...arguments);
        this.edbCode = null;
      }
      start() {
        MiniGameNetworkClient_1.default.getInstance().addListener(data => {
          let inpacket = new Network_InPacket_1.default(data);
          switch (inpacket.getCmdId()) {
           case Lobby_Cmd_1.default.Code.INSERT_GIFTCODE:
            {
              App_1.default.instance.showLoading(false);
              let res = new Lobby_Cmd_1.default.ResInsertGiftcode(data);
              switch (res.error) {
               case 0:
                App_1.default.instance.alertDialog.showMsg("M\xe3 Giftcode kh\xf4ng ch\xednh x\xe1c. Vui l\xf2ng ki\u1ec3m tra l\u1ea1i!");
                break;

               case 1:
                App_1.default.instance.alertDialog.showMsg("M\xe3 Giftcode \u0111\xe3 \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng.");
                break;

               case 2:
                Configs_1.default.Login.Coin = res.currentMoneyVin;
                BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN);
                App_1.default.instance.alertDialog.showMsg("Nh\u1eadn th\u01b0\u1edfng th\xe0nh c\xf4ng.");
                break;

               case 3:
                App_1.default.instance.actiontDialog.showMsgWithAction("\u0110\u1ec3 nh\u1eadn giftcode vui l\xf2ng k\xedch ho\u1ea1t b\u1ea3o m\u1eadt.", "K\xcdCH HO\u1ea0T NGAY", () => {
                  App_1.default.instance.openTelegram();
                });
                break;

               case 4:
               case 5:
               case 6:
                App_1.default.instance.alertDialog.showMsg("Giftcode \u0111\xe3 nh\u1eadp kh\xf4ng h\u1ee3p l\u1ec7.");
              }
              break;
            }
          }
        }, this);
      }
      static createAndShow(parent, code = "") {
        if (!this.initing) if (null == this.instance || null == this.instance.node) {
          this.initing = true;
          App_1.default.instance.loadPrefab("Lobby/res/prefabs/popups/PopupGiftCode", (err, prefab) => {
            this.initing = false;
            if (null != err) {
              App_1.default.instance.alertDialog.showMsg(err);
              return;
            }
            let go = cc.instantiate(prefab);
            go.parent = parent;
            this.instance = go.getComponent(PopupGiftCode_1);
            this.instance.node.zIndex = 1e3;
            this.instance.showWithCode(code);
          });
        } else {
          this.instance.node.zIndex = 1e3;
          this.instance.showWithCode(code);
        }
      }
      showWithCode(code = "") {
        this.show();
        this.fillGiftCode(code);
      }
      fillGiftCode(str) {
        this.edbCode.string = str;
      }
      actSubmit() {
        let code = this.edbCode.string.trim();
        if ("" == code) {
          App_1.default.instance.alertDialog.showMsg("M\xe3 qu\xe0 t\u1eb7ng kh\xf4ng \u0111\u01b0\u1ee3c \u0111\u1ec3 tr\u1ed1ng.");
          return;
        }
        App_1.default.instance.showLoading(true);
        MiniGameNetworkClient_1.default.getInstance().send(new Lobby_Cmd_1.default.ReqInsertGiftcode(code));
      }
    };
    PopupGiftCode.instance = null;
    PopupGiftCode.initing = false;
    __decorate([ property(cc.EditBox) ], PopupGiftCode.prototype, "edbCode", void 0);
    PopupGiftCode = PopupGiftCode_1 = __decorate([ ccclass ], PopupGiftCode);
    exports.default = PopupGiftCode;
    cc._RF.pop();
  }, {
    "../../Game/src/common/App": "App",
    "../../Game/src/common/BroadcastReceiver": "BroadcastReceiver",
    "../../Game/src/common/Configs": "Configs",
    "../../Game/src/common/Dialog": "Dialog",
    "../../Game/src/networks/MiniGameNetworkClient": "MiniGameNetworkClient",
    "../../Game/src/networks/Network.InPacket": "Network.InPacket",
    "./Lobby.Cmd": "Lobby.Cmd"
  } ],
  "Lobby.PopupLogin": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1df56Z0SzBFnaI3Oe9ITTUX", "Lobby.PopupLogin");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var PopupLogin_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Dialog_1 = require("../../../Game/src/common/Dialog");
    const App_1 = require("../../../Game/src/common/App");
    const SPUtils_1 = require("../../../Game/src/common/SPUtils");
    const BroadcastReceiver_1 = require("../../../Game/src/common/BroadcastReceiver");
    const Lobby_PopupForgetPassword_1 = require("./Lobby.PopupForgetPassword");
    const Lobby_PopupRegister_1 = require("./Lobby.PopupRegister");
    const AuthorizationController_1 = require("./AuthorizationController");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let PopupLogin = PopupLogin_1 = class PopupLogin extends Dialog_1.default {
      constructor() {
        super(...arguments);
        this.edbUsername = null;
        this.edbPassword = null;
        this.edbOTP = null;
        this.loginGroup = null;
        this.otpGroup = null;
      }
      static createAndShow(parent, isShowOtp = false) {
        null == this.instance || null == this.instance.node ? App_1.default.instance.loadPrefab("Lobby/res/prefabs/popups/PopupLogin", (err, prefab) => {
          if (null != err) return;
          let go = cc.instantiate(prefab);
          go.active = false;
          go.parent = parent;
          this.instance = go.getComponent(PopupLogin_1);
          this.instance.showDialog(isShowOtp);
        }) : this.instance.showDialog(isShowOtp);
      }
      registerBroadcast() {
        BroadcastReceiver_1.default.register(BroadcastReceiver_1.default.UPDATE_NICKNAME_SUCCESS, data => {
          this.edbUsername.string = data["username"];
          this.edbPassword.string = data["password"];
        }, this);
        BroadcastReceiver_1.default.register(BroadcastReceiver_1.default.USER_LOGOUT, data => {
          this.edbUsername.string = SPUtils_1.default.getUserName();
          this.edbPassword.string = SPUtils_1.default.getUserPass();
        }, this);
      }
      showDialog(isShowOtp) {
        this.node.zIndex = 1e3;
        super.show();
        this.loginGroup.active = !isShowOtp;
        this.otpGroup.active = isShowOtp;
        this.edbOTP.string = "";
      }
      start() {
        this.registerBroadcast();
        this.edbUsername.string = SPUtils_1.default.getUserName();
        this.edbPassword.string = SPUtils_1.default.getUserPass();
        AuthorizationController_1.AuthorizationController.getInstance().initFacebookSdk();
      }
      actLogin() {
        let username = this.edbUsername.string.trim();
        let password = this.edbPassword.string;
        if (0 == username.length) {
          App_1.default.instance.alertDialog.showMsg("T\xean \u0111\u0103ng nh\u1eadp kh\xf4ng \u0111\u01b0\u1ee3c \u0111\u1ec3 tr\u1ed1ng.");
          return;
        }
        if (0 == password.length) {
          App_1.default.instance.alertDialog.showMsg("M\u1eadt kh\u1ea9u kh\xf4ng \u0111\u01b0\u1ee3c \u0111\u1ec3 tr\u1ed1ng.");
          return;
        }
        AuthorizationController_1.AuthorizationController.getInstance().loginNormal(username, password, () => {
          this.dismiss();
        });
      }
      actLoginFB() {
        AuthorizationController_1.AuthorizationController.getInstance().loginFacebook(() => {
          this.dismiss();
        });
      }
      actForgetPassword() {
        Lobby_PopupForgetPassword_1.default.createAndShow(App_1.default.instance.popups);
        this.dismiss();
      }
      actRegister() {
        Lobby_PopupRegister_1.default.createAndShow(App_1.default.instance.popups);
        this.dismiss();
      }
      actShowHidePassword() {
        this.edbPassword.inputFlag = this.edbPassword.inputFlag == cc.EditBox.InputFlag.PASSWORD ? cc.EditBox.InputFlag.DEFAULT : cc.EditBox.InputFlag.PASSWORD;
      }
      actConfirmOTP() {
        let otp = this.edbOTP.string.trim();
        if (0 == otp.length) {
          App_1.default.instance.alertDialog.showMsg("OTP kh\xf4ng \u0111\u01b0\u1ee3c \u0111\u1ec3 tr\u1ed1ng.");
          return;
        }
        AuthorizationController_1.AuthorizationController.getInstance().loginWithOtp(otp, () => {
          this.dismiss();
        });
      }
    };
    PopupLogin.instance = null;
    __decorate([ property(cc.EditBox) ], PopupLogin.prototype, "edbUsername", void 0);
    __decorate([ property(cc.EditBox) ], PopupLogin.prototype, "edbPassword", void 0);
    __decorate([ property(cc.EditBox) ], PopupLogin.prototype, "edbOTP", void 0);
    __decorate([ property(cc.Node) ], PopupLogin.prototype, "loginGroup", void 0);
    __decorate([ property(cc.Node) ], PopupLogin.prototype, "otpGroup", void 0);
    PopupLogin = PopupLogin_1 = __decorate([ ccclass ], PopupLogin);
    exports.default = PopupLogin;
    cc._RF.pop();
  }, {
    "../../../Game/src/common/App": "App",
    "../../../Game/src/common/BroadcastReceiver": "BroadcastReceiver",
    "../../../Game/src/common/Dialog": "Dialog",
    "../../../Game/src/common/SPUtils": "SPUtils",
    "./AuthorizationController": "AuthorizationController",
    "./Lobby.PopupForgetPassword": "Lobby.PopupForgetPassword",
    "./Lobby.PopupRegister": "Lobby.PopupRegister"
  } ],
  "Lobby.PopupLuckyWheel": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c5e80YR05xNrZWvQuqcIDJR", "Lobby.PopupLuckyWheel");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var PopupLuckyWheel_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Dialog_1 = require("../../Game/src/common/Dialog");
    const Configs_1 = require("../../Game/src/common/Configs");
    const MiniGameNetworkClient_1 = require("../../Game/src/networks/MiniGameNetworkClient");
    const Network_InPacket_1 = require("../../Game/src/networks/Network.InPacket");
    const Lobby_Cmd_1 = require("./Lobby.Cmd");
    const BroadcastReceiver_1 = require("../../Game/src/common/BroadcastReceiver");
    const App_1 = require("../../Game/src/common/App");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let PopupLuckyWheel = PopupLuckyWheel_1 = class PopupLuckyWheel extends Dialog_1.default {
      constructor() {
        super(...arguments);
        this.wheel1 = null;
        this.wheel3 = null;
        this.lblCount = null;
        this.btnClose = null;
        this.btnSpin = null;
        this.spinCount = 0;
      }
      start() {
        MiniGameNetworkClient_1.default.getInstance().addListener(data => {
          if (!this.node.active) return;
          let inPacket = new Network_InPacket_1.default(data);
          switch (inPacket.getCmdId()) {
           case Lobby_Cmd_1.default.Code.SPIN_LUCKY_WHEEL:
            {
              let res = new Lobby_Cmd_1.default.ResSpinLuckyWheel(data);
              if (0 != res.error) {
                switch (res.error) {
                 case 1:
                  App_1.default.instance.alertDialog.showMsg("K\u1ebft n\u1ed1i m\u1ea1ng kh\xf4ng \u1ed5n \u0111\u1ecbnh. Vui l\xf2ng th\u1eed l\u1ea1i sau!");
                  break;

                 case 2:
                  App_1.default.instance.alertDialog.showMsg("B\u1ea1n \u0111\xe3 h\u1ebft l\u01b0\u1ee3t quay.");
                  break;

                 case 3:
                  App_1.default.instance.alertDialog.showMsg("M\u1ed7i ng\xe0y ch\u1ec9 \u0111\u01b0\u1ee3c quay t\u1ed1i \u0111a 2 l\u1ea7n!");
                }
                this.btnSpin.interactable = true;
                this.btnClose.interactable = true;
                break;
              }
              this.spinCount -= 1;
              this.lblCount.string = this.spinCount.toString();
              Configs_1.default.Login.LuckyWheel = res.remainCount;
              Configs_1.default.Login.Coin = res.currentMoneyVin;
              let msg = "Ch\xfac m\u1eebng b\u1ea1n \u0111\xe3 nh\u1eadn \u0111\u01b0\u1ee3c\n";
              let rotateToIdx1 = 3;
              switch (res.prizeSlot) {
               case "KhoBau1":
                rotateToIdx1 = 2;
                msg += "1 l\u01b0\u1ee3t quay Range Rover";
                break;

               case "KhoBau2":
                rotateToIdx1 = 6;
                msg += "2 l\u01b0\u1ee3t quay Range Rover";
                break;

               case "KhoBau3":
                rotateToIdx1 = 11;
                msg += "3 l\u01b0\u1ee3t quay Range Rover";
                break;

               case "NuDiepVien1":
                rotateToIdx1 = 0;
                msg += "1 l\u01b0\u1ee3t quay MayBach";
                break;

               case "NuDiepVien2":
                rotateToIdx1 = 10;
                msg += "2 l\u01b0\u1ee3t quay MayBach";
                break;

               case "NuDiepVien3":
                rotateToIdx1 = 4;
                msg += "3 l\u01b0\u1ee3t quay MayBach";
                break;

               case "SieuAnhHung1":
                rotateToIdx1 = 5;
                msg += "1 l\u01b0\u1ee3t quay Bentley";
                break;

               case "SieuAnhHung2":
                rotateToIdx1 = 1;
                msg += "1 l\u01b0\u1ee3t quay Bentley";
                break;

               case "SieuAnhHung3":
                rotateToIdx1 = 8;
                msg += "1 l\u01b0\u1ee3t quay Bentley";
                break;

               case "more":
                rotateToIdx1 = 9;
                msg += "th\xeam 1 l\u01b0\u1ee3t quay";
              }
              3 != rotateToIdx1 && (msg += "v\xe0 ");
              let rotateToIdx3 = 1;
              switch (res.prizeVin) {
               case "1000":
                rotateToIdx3 = 7;
                msg += "1.000 Xu";
                break;

               case "2000":
                rotateToIdx3 = 5;
                msg += "2.000 Xu";
                break;

               case "5000":
                rotateToIdx3 = 3;
                msg += "5.000 Xu";
                break;

               case "10000":
                rotateToIdx3 = 6;
                msg += "10.000 Xu";
                break;

               case "20000":
                rotateToIdx3 = 2;
                msg += "20.000 Xu";
                break;

               case "50000":
                rotateToIdx3 = 4;
                msg += "50.000 Xu";
                break;

               case "100000":
                rotateToIdx3 = 0;
                msg += "100.000 Xu";
              }
              msg += ".";
              1 == rotateToIdx3 && 3 == rotateToIdx1 && (msg = "Ch\xfac b\u1ea1n may m\u1eafn l\u1ea7n sau.");
              this.wheel1.stopAllActions();
              this.wheel3.stopAllActions();
              this.wheel1.angle = 0;
              this.wheel3.angle = 0;
              this.wheel1.runAction(cc.rotateTo(3, -(360 - 30 * rotateToIdx1 + 1440 - 15)).easing(cc.easeSineInOut()));
              this.wheel3.runAction(cc.sequence(cc.delayTime(.25), cc.rotateTo(4, 1440 + 45 * rotateToIdx3 + 22.5).easing(cc.easeSineInOut()), cc.callFunc(() => {
                this.btnSpin.interactable = true;
                this.btnClose.interactable = true;
                this.spinCount = Configs_1.default.Login.LuckyWheel;
                this.lblCount.string = this.spinCount.toString();
                BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN);
                App_1.default.instance.alertDialog.showMsg(msg);
              })));
              break;
            }
          }
        }, this);
      }
      static createAndShow(parent) {
        if (!this.initing) if (null == this.instance || null == this.instance.node) {
          this.initing = true;
          App_1.default.instance.loadPrefab("Lobby/res/prefabs/popups/PopupLuckyWheel", (err, prefab) => {
            this.initing = false;
            if (null != err) {
              App_1.default.instance.alertDialog.showMsg(err);
              return;
            }
            let go = cc.instantiate(prefab);
            go.parent = parent;
            this.instance = go.getComponent(PopupLuckyWheel_1);
            this.instance.node.zIndex = 1e3;
            this.instance.show();
          });
        } else {
          this.instance.node.zIndex = 1e3;
          this.instance.show();
        }
      }
      show() {
        var _this = this;
        this.bg || (this.bg = this.node.getChildByName("Bg"));
        this.container || (this.container = this.node.getChildByName("Container"));
        this.node.active = true;
        this.isAnimated = false;
        this.bg.stopAllActions();
        this.bg.opacity = 0;
        this.bg.runAction(cc.fadeTo(.2, 128));
        this.container.stopAllActions();
        this.container.opacity = 0;
        this.container.scale = this.startScale;
        this.container.runAction(cc.sequence(cc.spawn(cc.scaleTo(.2, this.showScale), cc.fadeIn(.2)), cc.scaleTo(.1, 1.195), cc.callFunc(_this._onShowed.bind(this))));
        this.wheel1.angle = 0;
        this.wheel3.angle = 0;
        this.spinCount = Configs_1.default.Login.LuckyWheel;
        this.lblCount.string = this.spinCount.toString();
      }
      dismiss() {
        super.dismiss();
      }
      actSpin() {
        this.btnSpin.interactable = false;
        MiniGameNetworkClient_1.default.getInstance().send(new Lobby_Cmd_1.default.ReqSpinLuckyWheel());
      }
    };
    PopupLuckyWheel.instance = null;
    PopupLuckyWheel.initing = false;
    __decorate([ property(cc.Node) ], PopupLuckyWheel.prototype, "wheel1", void 0);
    __decorate([ property(cc.Node) ], PopupLuckyWheel.prototype, "wheel3", void 0);
    __decorate([ property(cc.Label) ], PopupLuckyWheel.prototype, "lblCount", void 0);
    __decorate([ property(cc.Button) ], PopupLuckyWheel.prototype, "btnClose", void 0);
    __decorate([ property(cc.Button) ], PopupLuckyWheel.prototype, "btnSpin", void 0);
    PopupLuckyWheel = PopupLuckyWheel_1 = __decorate([ ccclass ], PopupLuckyWheel);
    exports.default = PopupLuckyWheel;
    cc._RF.pop();
  }, {
    "../../Game/src/common/App": "App",
    "../../Game/src/common/BroadcastReceiver": "BroadcastReceiver",
    "../../Game/src/common/Configs": "Configs",
    "../../Game/src/common/Dialog": "Dialog",
    "../../Game/src/networks/MiniGameNetworkClient": "MiniGameNetworkClient",
    "../../Game/src/networks/Network.InPacket": "Network.InPacket",
    "./Lobby.Cmd": "Lobby.Cmd"
  } ],
  "Lobby.PopupMailBox": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "da4b5KNPpZFsZvwFw4p6nI0", "Lobby.PopupMailBox");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var PopupMailBox_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Dialog_1 = require("../../Game/src/common/Dialog");
    const App_1 = require("../../Game/src/common/App");
    const Http_1 = require("../../Game/src/common/Http");
    const Configs_1 = require("../../Game/src/common/Configs");
    const Network_InPacket_1 = require("../../Game/src/networks/Network.InPacket");
    const MiniGameNetworkClient_1 = require("../../Game/src/networks/MiniGameNetworkClient");
    const Lobby_Cmd_1 = require("./Lobby.Cmd");
    const BroadcastReceiver_1 = require("../../Game/src/common/BroadcastReceiver");
    const Lobby_PopupOTP_1 = require("./Lobby.PopupOTP");
    const Lobby_PopupCardInfo_1 = require("./Lobby.PopupCardInfo");
    const Lobby_PopupSecurity_1 = require("./Lobby.PopupSecurity");
    const Lobby_PopupShop_1 = require("./Lobby.PopupShop");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let TabMailBox = class TabMailBox {
      constructor() {
        this.node = null;
        this.itemTemplate = null;
        this.lblTitle = null;
        this.lblContent = null;
        this.lblEmpty = null;
        this.lblPage = null;
        this.btnNapNgay = null;
        this.lastData = null;
        this.page = 1;
        this.maxPage = 1;
        this.currentSelectedMail = -1;
      }
      start() {}
      reset() {
        for (let i = 0; i < this.itemTemplate.parent.childrenCount; i++) this.itemTemplate.parent.children[i].active = false;
        this.page = 1;
        this.maxPage = 1;
        this.lblPage.string = this.page + "/" + this.maxPage;
        this.loadData();
      }
      getItem() {
        let item = null;
        for (let i = 0; i < this.itemTemplate.parent.childrenCount; i++) {
          let node = this.itemTemplate.parent.children[i];
          if (node != this.itemTemplate && !node.active) {
            item = node;
            break;
          }
        }
        if (null == item) {
          item = cc.instantiate(this.itemTemplate);
          item.parent = this.itemTemplate.parent;
        }
        item.active = true;
        return item;
      }
      loadData() {
        App_1.default.instance.showLoading(true);
        this.lblEmpty.string = "loading...";
        this.lblContent.string = "";
        this.lblTitle.string = "";
        this.btnNapNgay.active = false;
        this.currentSelectedMail = -1;
        Http_1.default.get(Configs_1.default.App.API, {
          c: 405,
          nn: Configs_1.default.Login.Nickname,
          p: this.page
        }, (err, res) => {
          App_1.default.instance.showLoading(false);
          for (let i = 0; i < this.itemTemplate.parent.childrenCount; i++) this.itemTemplate.parent.children[i].active = false;
          if (null != err) return;
          cc.log(res);
          if (res["success"]) {
            this.lblEmpty.string = "";
            this.maxPage = Number(res["totalPages"]);
            this.lblPage.string = this.page + "/" + this.maxPage;
            this.lastData = res["transactions"];
            for (let i = 0; i < this.lastData.length; i++) {
              let itemData = this.lastData[i];
              let item = this.getItem();
              item.getChildByName("selected").active = false;
              item.getChildByName("title").getComponent(cc.Label).string = itemData["title"];
              item.getChildByName("time").getComponent(cc.Label).string = itemData["createTime"];
              item.getChildByName("notread").active = 0 == itemData["status"];
              item.off("click");
              item.on("click", () => {
                this.selectItem(i);
              });
            }
          } else this.lblEmpty.string = "Kh\xf4ng c\xf3 th\u01b0.";
        });
      }
      readMail(mailId) {
        Http_1.default.get(Configs_1.default.App.API, {
          c: 404,
          mid: mailId
        }, (err, res) => {
          if (null != err) return;
          Configs_1.default.Login.MailCount -= 1;
          BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.UPDATE_MAIL_COUNT);
        });
      }
      delMail() {
        if (-1 == this.currentSelectedMail) {
          App_1.default.instance.alertDialog.showMsg("B\u1ea1n ch\u01b0a ch\u1ecdn th\u01b0.");
          return;
        }
        App_1.default.instance.confirmDialog.show3("B\u1ea1n ch\u1eafc ch\u1eafn mu\u1ed1n xo\xe1 th\u01b0?", "XO\xc1", isConfirm => {
          if (isConfirm) {
            let mail = this.lastData[this.currentSelectedMail];
            if (!mail) return;
            Http_1.default.get(Configs_1.default.App.API, {
              c: 403,
              mid: mail.mail_id
            }, (err, res) => {
              if (null != err) return;
              this.loadData();
            });
          }
        });
      }
      selectItem(idx) {
        if (null == this.lastData) return;
        for (let i = 0; i < this.lastData.length; i++) this.itemTemplate.parent.children[i + 1].getChildByName("selected").active = i == idx;
        this.itemTemplate.parent.children[idx + 1].getChildByName("notread").active = false;
        this.currentSelectedMail = idx;
        let mail = this.lastData[idx];
        this.lblTitle.string = mail["title"];
        this.btnNapNgay.active = "GiftCode" == mail["type"] || "MobileCard" == mail["type"];
        this.lblContent.string = mail["content"];
        if (0 == mail["status"]) {
          mail["status"] = 1;
          this.readMail(mail["mail_id"]);
        }
      }
      nextPage() {
        if (this.page < this.maxPage) {
          this.page++;
          this.loadData();
        }
      }
      prevPage() {
        if (this.page > 1) {
          this.page--;
          this.loadData();
        }
      }
      napNgay() {
        let mail = this.lastData[this.currentSelectedMail];
        this.lblTitle.string.indexOf("Mua th\u1ebb th\xe0nh c\xf4ng") >= 0 ? Lobby_PopupShop_1.default.createAndShow(App_1.default.instance.popups, () => {
          var _a;
          null === (_a = Lobby_PopupShop_1.default.instance) || void 0 === _a ? void 0 : _a.actFillCardData({
            provider: mail["provider"],
            serial: mail["serial"],
            pin: mail["pin"]
          });
        }) : this.lblTitle.string.indexOf("giftcode") >= 0 && Lobby_PopupShop_1.default.createAndShowWithGiftcode(App_1.default.instance.popups, mail["giftCode"]);
      }
    };
    __decorate([ property(cc.Node) ], TabMailBox.prototype, "node", void 0);
    __decorate([ property(cc.Node) ], TabMailBox.prototype, "itemTemplate", void 0);
    __decorate([ property(cc.Label) ], TabMailBox.prototype, "lblTitle", void 0);
    __decorate([ property(cc.Label) ], TabMailBox.prototype, "lblContent", void 0);
    __decorate([ property(cc.Label) ], TabMailBox.prototype, "lblEmpty", void 0);
    __decorate([ property(cc.Label) ], TabMailBox.prototype, "lblPage", void 0);
    __decorate([ property(cc.Node) ], TabMailBox.prototype, "btnNapNgay", void 0);
    TabMailBox = __decorate([ ccclass("PopupMailBox.TabMailBox") ], TabMailBox);
    let TabNews = class TabNews {
      constructor() {
        this.node = null;
        this.itemTemplate = null;
        this.lblTitle = null;
        this.lblContent = null;
        this.currentSelectedIndex = -1;
        this.newsData = [ {
          title: "Quy \u0111\u1ecbnh \u0111\u1ed5i th\u01b0\u1edfng",
          content: "- \u0110\u1ed1i v\u1edbi Kh\xe1ch T\u1ed5ng n\u1ea1p > \u0110\u1ed5i. \u0110\u1ed5i kh\xf4ng gi\u1edbi h\u1ea1n s\u1ed1 l\u1ea7n v\xe0 th\u1eddi gian \u0111\u1ed1i v\u1edbi t\xe0i kho\u1ea3n N\u1ea1p > \u0110\u1ed5i. Duy\u1ec7t th\u01b0\u1edfng t\u1ef1 \u0111\u1ed9ng.\n- \u0110\u1ec3 tr\xe1nh gian l\u1eadn th\xec nh\u1eefng t\xe0i kho\u1ea3n n\u1ea1p < r\xfat s\u1ebd duy\u1ec7t tay.\n- M\xe3 th\u1ebb,s\u1ed1 seri th\u1ebb c\xe0o s\u1ebd \u0111\u01b0\u1ee3c g\u1eedi v\xe0o h\xf2m th\u01b0 v\xe0 l\u1ecbch s\u1eed n\u1ea1p.\n- R\xfat Momo/Bank s\u1ebd \u0111\u01b0\u1ee3c chuy\u1ec3n th\u1eb1ng v\xe0o t\xe0i kho\u1ea3n c\u1ee7a ng\u01b0\u1eddi ch\u01a1i. Y\xeau c\u1ea7u nh\u1eadp \u0111\xfang s\u1ed1 t\xe0i kho\u1ea3n v\xe0 t\xean ng\u01b0\u1eddi nh\u1eadn, n\u1ebfu nh\u1eadp sai giao d\u1ecbch l\u1ed7i v\xe0 s\u1ebd kh\xf4ng th\u1ef1c hi\u1ec7n \u0111\u01b0\u1ee3c.\n\nC\xe1c t\xe0i kho\u1ea3n c\u1ed1 t\xecnh gian l\u1eadn s\u1ebd b\u1ecb kho\xe1 t\xe0i kho\u1ea3n V\u0129nh Vi\u1ec5n!\nXin c\u1ea3m \u01a1n!"
        }, {
          title: "Vote app 5* \u0111\u1ec3 nh\u1eadn mu\xf4n v\xe0n Giftcode",
          content: "C\u1ef0C SOCK: Ti\u1ebfp t\u1ee5c t\u1eb7ng #GIFTCODE l\xean \u0111\u1ebfn 200K Xu khi tham gia #S\u1ef0_KI\u1ec6N: VOTE APP 5* cho IOS v\xe0 ANDROID - Th\u1eddi gian \u0111\u1ebfn h\u1ebft ng\xe0y 31-10\n\u0110\u1eb7c bi\u1ec7t: sau 2 ng\xe0y admin s\u1ebd d\xe0nh t\u1eb7ng 1 code vip l\xean \u0111\u1ebfn 200K xu cho b\u1ea1n n\xe0o may m\u1eafn vote app nhi\u1ec7t t\xecnh!.\n- B1: Like + tag 5 b\u1ea1n t\u1ea1i b\xe0i vi\u1ebft n\xe0y m\xe0 share b\xe0i vi\u1ebft \u1edf ch\u1ebf \u0111\u1ed9 c\xf4ng khai tr\xean t\u01b0\u1eddng nh\xe0 b\u1ea1n\n- B2: \u0110\xe1nh gi\xe1,vote app 5* v\xe0 vi\u1ebft nh\u1eadn x\xe9t tr\u1ef1c ti\u1ebfp tr\xean App Store\n- B3: Ch\u1ee5p l\u1ea1i h\xecnh \u1ea3nh \u0111\xe3 \u0111\xe1nh gi\xe1 v\xe0 nh\u1eadn x\xe9t app g\u1eedi tin nh\u1eafn cho admin c\xf9ng ID nh\u1eadn v\u1eadt trong Game \u0111\u1ec3 may m\u1eafn nh\u1eadn 200K xu n\xe0o c\xe1c b\u1ea1n!\n"
        } ];
      }
      start() {}
      reset() {
        for (let i = 0; i < this.itemTemplate.parent.childrenCount; i++) this.itemTemplate.parent.children[i].active = false;
        this.loadData();
      }
      getItem() {
        let item = null;
        for (let i = 0; i < this.itemTemplate.parent.childrenCount; i++) {
          let node = this.itemTemplate.parent.children[i];
          if (node != this.itemTemplate && !node.active) {
            item = node;
            break;
          }
        }
        if (null == item) {
          item = cc.instantiate(this.itemTemplate);
          item.parent = this.itemTemplate.parent;
        }
        item.active = true;
        return item;
      }
      loadData() {
        App_1.default.instance.showLoading(true);
        this.lblContent.string = "";
        this.lblTitle.string = "";
        Http_1.default.get(Configs_1.default.App.API, {
          c: 406,
          p: 1
        }, (err, res) => {
          App_1.default.instance.showLoading(false);
          if (null != err) return;
          cc.log(res);
          if (res["success"]) {
            this.newsData = res["transactions"];
            for (let i = 0; i < this.newsData.length; i++) {
              let itemData = this.newsData[i];
              let item = this.getItem();
              item.getChildByName("selected").active = false;
              item.getChildByName("title").getComponent(cc.Label).string = itemData["title"];
              item.off("click");
              item.on("click", () => {
                this.selectItem(i);
              });
            }
          }
        });
      }
      loadHardData() {
        for (let i = 0; i < this.newsData.length; i++) {
          let itemData = this.newsData[i];
          let item = this.getItem();
          item.getChildByName("selected").active = false;
          item.getChildByName("title").getComponent(cc.Label).string = itemData["title"];
          item.off("click");
          item.on("click", () => {
            this.selectItem(i);
          });
        }
        this.newsData.length > 0 && this.selectItem(0);
      }
      selectItem(idx) {
        if (null == this.newsData) return;
        for (let i = 0; i < this.newsData.length; i++) this.itemTemplate.parent.children[i + 1].getChildByName("selected").active = i == idx;
        this.currentSelectedIndex = idx;
        this.lblTitle.string = this.newsData[idx]["title"];
        this.lblContent.string = this.newsData[idx]["content"];
      }
    };
    __decorate([ property(cc.Node) ], TabNews.prototype, "node", void 0);
    __decorate([ property(cc.Node) ], TabNews.prototype, "itemTemplate", void 0);
    __decorate([ property(cc.Label) ], TabNews.prototype, "lblTitle", void 0);
    __decorate([ property(cc.Label) ], TabNews.prototype, "lblContent", void 0);
    TabNews = __decorate([ ccclass("PopupMailBox.TabNews") ], TabNews);
    let PopupMailBox = PopupMailBox_1 = class PopupMailBox extends Dialog_1.default {
      constructor() {
        super(...arguments);
        this.tabs = null;
        this.tabContents = null;
        this.tabMailBox = new TabMailBox();
        this.tabNews = new TabNews();
        this.tabSelectedIdx = 0;
      }
      static createAndShow(parent, isNewTab = false) {
        if (!this.initing) if (null == this.instance || null == this.instance.node) {
          this.initing = true;
          App_1.default.instance.loadPrefab("Lobby/res/prefabs/popups/PopupMailBox", (err, prefab) => {
            this.initing = false;
            if (null != err) {
              App_1.default.instance.alertDialog.showMsg(err);
              return;
            }
            let go = cc.instantiate(prefab);
            go.parent = parent;
            this.instance = go.getComponent(PopupMailBox_1);
            isNewTab ? this.instance.show(1) : this.instance.show();
          });
        } else isNewTab ? this.instance.show(1) : this.instance.show();
      }
      start() {
        for (let i = 0; i < this.tabs.toggleItems.length; i++) this.tabs.toggleItems[i].node.on("click", () => {
          this.tabSelectedIdx = i;
          this.onTabChanged();
        });
        MiniGameNetworkClient_1.default.getInstance().addListener(data => {
          let inpacket = new Network_InPacket_1.default(data);
          switch (inpacket.getCmdId()) {
           case Lobby_Cmd_1.default.Code.BUY_CARD:
            {
              App_1.default.instance.showLoading(false);
              let res = new Lobby_Cmd_1.default.ResBuyCard(data);
              switch (res.error) {
               case 0:
                Lobby_PopupOTP_1.default.createAndShow(App_1.default.instance.popups);
                break;

               case 1:
                App_1.default.instance.alertDialog.showMsg("M\u1ea5t k\u1ebft n\u1ed1i \u0111\u1ebfn server!");
                break;

               case 2:
                App_1.default.instance.alertDialog.showMsg("T\xe0i kho\u1ea3n hi\u1ec7n \u0111ang b\u1ecb c\u1ea5m \u0111\u1ed5i th\u01b0\u1edfng!");
                break;

               case 3:
                App_1.default.instance.alertDialog.showMsg("T\xe0i kho\u1ea3n kh\xf4ng \u0111\u1ee7 s\u1ed1 d\u01b0 kh\u1ea3 d\u1ee5ng!");
                break;

               case 9:
                App_1.default.instance.alertDialog.showMsg("\u0110\u1ec3 th\u1ef1c hi\u1ec7n ch\u1ee9c n\u0103ng \u0111\u1ed5i th\u1ebb, t\xe0i kho\u1ea3n c\u1ea7n \u0111\u0103ng k\xfd b\u1ea3o m\u1eadt! B\u1ea1n c\xf3 mu\u1ed1n \u0111\u0103ng k\xfd b\u1ea3o m\u1eadt lu\xf4n kh\xf4ng?");
                break;

               case 10:
                App_1.default.instance.alertDialog.showMsg("Ch\u1ee9c n\u0103ng n\xe0y s\u1ebd ho\u1ea1t \u0111\u1ed9ng sau 24h k\xedch ho\u1ea1t b\u1ea3o m\u1eadt th\xe0nh c\xf4ng!");
                break;

               case 20:
                App_1.default.instance.alertDialog.showMsg("M\u1ee9c \u0111\u1ed5i v\u01b0\u1ee3t qu\xe1 h\u1ea1n m\u1ee9c trong ng\xe0y c\u1ee7a t\xe0i kho\u1ea3n. Vui l\xf2ng \u0111\u1ee3i \u0111\u1ebfn h\xf4m sau \u0111\u1ec3 th\u1ef1c hi\u1ec7n l\u1ea1i giao d\u1ecbch!");
                break;

               case 21:
                App_1.default.instance.alertDialog.showMsg("Kh\xf4ng th\u1ec3 \u0111\u1ed5i qu\xe1 h\u1ea1n m\u1ee9c trong ng\xe0y c\u1ee7a h\u1ec7 th\u1ed1ng. Vui l\xf2ng \u0111\u1ee3i \u0111\u1ebfn h\xf4m sau \u0111\u1ec3 th\u1ef1c hi\u1ec7n l\u1ea1i giao d\u1ecbch!");
                break;

               default:
                App_1.default.instance.alertDialog.showMsg("L\u1ed7i " + res.error + ". vui l\xf2ng th\u1eed l\u1ea1i sau.");
              }
            }
            break;

           case Lobby_Cmd_1.default.Code.BUY_CARD_RESULT:
            {
              App_1.default.instance.showLoading(false);
              let res = new Lobby_Cmd_1.default.ResBuyCardResult(data);
              switch (res.error) {
               case 0:
                Configs_1.default.Login.Coin = res.currentMoney;
                BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN);
                let resJson = JSON.parse(res.softpin)[0];
                let telco = resJson["provider"];
                let amount = resJson["amount"];
                let code = resJson["pin"];
                let serial = resJson["serial"];
                Lobby_PopupCardInfo_1.default.createAndShow(App_1.default.instance.popups, telco, amount, code, serial);
                break;

               case 1:
                App_1.default.instance.alertDialog.showMsg("K\u1ebft n\u1ed1i m\u1ea1ng kh\xf4ng \u1ed5n \u0111\u1ecbnh. Vui l\xf2ng th\u1eed l\u1ea1i sau!");
                break;

               case 2:
                App_1.default.instance.alertDialog.showMsg("T\xe0i kho\u1ea3n hi\u1ec7n \u0111ang b\u1ecb c\u1ea5m \u0111\u1ed5i th\u01b0\u1edfng!");
                break;

               case 3:
                App_1.default.instance.alertDialog.showMsg("T\xe0i kho\u1ea3n kh\xf4ng \u0111\u1ee7 s\u1ed1 d\u01b0 kh\u1ea3 d\u1ee5ng!");
                break;

               case 9:
                App_1.default.instance.alertDialog.showMsg("\u0110\u1ec3 th\u1ef1c hi\u1ec7n ch\u1ee9c n\u0103ng \u0111\u1ed5i th\u1ebb, t\xe0i kho\u1ea3n c\u1ea7n \u0111\u0103ng k\xfd b\u1ea3o m\u1eadt! B\u1ea1n c\xf3 mu\u1ed1n \u0111\u0103ng k\xfd b\u1ea3o m\u1eadt lu\xf4n kh\xf4ng?");
                break;

               case 10:
                App_1.default.instance.alertDialog.showMsg("Ch\u1ee9c n\u0103ng n\xe0y s\u1ebd ho\u1ea1t \u0111\u1ed9ng sau 24h k\xedch ho\u1ea1t b\u1ea3o m\u1eadt th\xe0nh c\xf4ng!");
                break;

               case 20:
                App_1.default.instance.alertDialog.showMsg("M\u1ee9c \u0111\u1ed5i v\u01b0\u1ee3t qu\xe1 h\u1ea1n m\u1ee9c trong ng\xe0y c\u1ee7a t\xe0i kho\u1ea3n. Vui l\xf2ng \u0111\u1ee3i \u0111\u1ebfn h\xf4m sau \u0111\u1ec3 th\u1ef1c hi\u1ec7n l\u1ea1i giao d\u1ecbch!");
                break;

               case 21:
                App_1.default.instance.alertDialog.showMsg("Kh\xf4ng th\u1ec3 \u0111\u1ed5i qu\xe1 h\u1ea1n m\u1ee9c trong ng\xe0y c\u1ee7a h\u1ec7 th\u1ed1ng. Vui l\xf2ng \u0111\u1ee3i \u0111\u1ebfn h\xf4m sau \u0111\u1ec3 th\u1ef1c hi\u1ec7n l\u1ea1i giao d\u1ecbch!");
                break;

               case 22:
                App_1.default.instance.alertDialog.showMsg("S\u1ed1 l\u01b0\u1ee3ng th\u1ebb \u0111\u1ed5i \u0111\xe3 qu\xe1 h\u1ea1n m\u1ee9c. B\u1ea1n vui l\xf2ng quay tr\u1edf l\u1ea1i sau!");
                break;

               case 30:
                App_1.default.instance.alertDialog.showMsg("Giao d\u1ecbch \u0111ang ch\u1edd x\u1eed l\xfd!");
                break;

               default:
                App_1.default.instance.alertDialog.showMsg("L\u1ed7i " + res.error + ". vui l\xf2ng th\u1eed l\u1ea1i sau.");
              }
            }
          }
        }, this);
        this.tabMailBox.start();
        this.tabNews.start();
      }
      show(idx = 0) {
        super.show();
        this.tabSelectedIdx = idx;
        this.tabs.toggleItems[this.tabSelectedIdx].isChecked = true;
        this.onTabChanged();
      }
      onTabChanged() {
        for (let i = 0; i < this.tabContents.childrenCount; i++) this.tabContents.children[i].active = i == this.tabSelectedIdx;
        for (let j = 0; j < this.tabs.toggleItems.length; j++) this.tabs.toggleItems[j].node.getComponentInChildren(cc.Label).node.opacity = j == this.tabSelectedIdx ? 255 : 123;
        switch (this.tabSelectedIdx) {
         case 0:
          this.tabMailBox.reset();
          break;

         case 1:
          this.tabNews.reset();
        }
      }
      mailBoxNextPage() {
        this.tabMailBox.nextPage();
      }
      mailBoxPrevPage() {
        this.tabMailBox.prevPage();
      }
      napNgay() {
        this.tabMailBox.napNgay();
        this.dismiss();
      }
      delMail() {
        this.tabMailBox.delMail();
      }
      openOTP() {
        Lobby_PopupSecurity_1.default.createAndShow(App_1.default.instance.popups);
        this.dismiss();
      }
    };
    PopupMailBox.instance = null;
    PopupMailBox.initing = false;
    __decorate([ property(cc.ToggleContainer) ], PopupMailBox.prototype, "tabs", void 0);
    __decorate([ property(cc.Node) ], PopupMailBox.prototype, "tabContents", void 0);
    __decorate([ property(TabMailBox) ], PopupMailBox.prototype, "tabMailBox", void 0);
    __decorate([ property(TabNews) ], PopupMailBox.prototype, "tabNews", void 0);
    PopupMailBox = PopupMailBox_1 = __decorate([ ccclass ], PopupMailBox);
    exports.default = PopupMailBox;
    cc._RF.pop();
  }, {
    "../../Game/src/common/App": "App",
    "../../Game/src/common/BroadcastReceiver": "BroadcastReceiver",
    "../../Game/src/common/Configs": "Configs",
    "../../Game/src/common/Dialog": "Dialog",
    "../../Game/src/common/Http": "Http",
    "../../Game/src/networks/MiniGameNetworkClient": "MiniGameNetworkClient",
    "../../Game/src/networks/Network.InPacket": "Network.InPacket",
    "./Lobby.Cmd": "Lobby.Cmd",
    "./Lobby.PopupCardInfo": "Lobby.PopupCardInfo",
    "./Lobby.PopupOTP": "Lobby.PopupOTP",
    "./Lobby.PopupSecurity": "Lobby.PopupSecurity",
    "./Lobby.PopupShop": "Lobby.PopupShop"
  } ],
  "Lobby.PopupMission": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fb912UtkwhGZagsJkMVs33k", "Lobby.PopupMission");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var PopupMission_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const App_1 = require("../../Game/src/common/App");
    const BroadcastReceiver_1 = require("../../Game/src/common/BroadcastReceiver");
    const Configs_1 = require("../../Game/src/common/Configs");
    const Dialog_1 = require("../../Game/src/common/Dialog");
    const Http_1 = require("../../Game/src/common/Http");
    const AuthorizationResponseData_1 = require("./Authorization/AuthorizationResponseData");
    const Lobby_PopupSecurity_1 = require("./Lobby.PopupSecurity");
    const itemMission_1 = require("./Mission/itemMission");
    const itemX3Mission_1 = require("./Mission/itemX3Mission");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let PopupMission = PopupMission_1 = class PopupMission extends Dialog_1.default {
      constructor() {
        super(...arguments);
        this.configData = null;
        this.scroll = null;
        this.instantiateNode = null;
        this.x3ProcessContent = null;
        this.missionProcessContent = null;
        this.missionTheLeContent = null;
        this.x3TheLeContent = null;
        this.tanThuContent = null;
        this.topProcessToggle = null;
        this.leftX3Toggle = null;
        this.leftTanThuToggle = null;
        this.leftMission = null;
        this.currentTab = "tanthu";
      }
      static createAndShow(parent, selectTab = "tanthu") {
        if (!this.initing) if (null == this.instance || null == this.instance.node) {
          this.initing = true;
          App_1.default.instance.loadPrefab("Lobby/res/prefabs/popups/PopupMission", (err, prefab) => {
            this.initing = false;
            if (null != err) {
              App_1.default.instance.alertDialog.showMsg(err);
              return;
            }
            let go = cc.instantiate(prefab);
            go.parent = parent;
            this.instance = go.getComponent(PopupMission_1);
            this.instance.showWithTab(selectTab);
          });
        } else this.instance.showWithTab(selectTab);
      }
      start() {
        BroadcastReceiver_1.default.register(BroadcastReceiver_1.default.X3_DEPOSIT, () => {
          this.leftX3Toggle.node.getChildByName("Dot").active = Configs_1.default.Login.X3Deposit.length < 3;
          this.initX3Deposit();
          this.topProcessToggle.node.getChildByName("Dot").active = "x3" === this.currentTab && Configs_1.default.Login.X3Deposit.length < 3;
        }, this);
      }
      showWithTab(selectTab) {
        this.show();
        this.toggleLeft(null, selectTab);
        App_1.default.instance.showLoading(true);
        Http_1.default.get(Configs_1.default.App.API, {
          c: 6027
        }, (err, res) => {
          App_1.default.instance.showLoading(false);
          if (err) return;
          cc.log(res);
          let securityRes = new AuthorizationResponseData_1.UserInfoResponse(res);
          if (!securityRes.success) return;
          this.tanThuContent.getComponentInChildren(cc.Button).node.active = 1 !== securityRes.mobileSecure;
        });
      }
      _onShowed() {
        super._onShowed();
        BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.X3_DEPOSIT);
      }
      toggleTop(event, eventData) {
        if ("x3" == this.currentTab) {
          this.scroll.content.parent.children.forEach(item => {
            item.active = false;
          });
          switch (Number(eventData)) {
           case 1:
            this.scroll.content = this.x3ProcessContent;
            this.x3ProcessContent.active = true;
            break;

           default:
            this.scroll.content = this.x3TheLeContent;
            this.x3TheLeContent.active = true;
          }
        }
        if ("mission" == this.currentTab) {
          this.scroll.content.parent.children.forEach(item => {
            item.active = false;
          });
          switch (Number(eventData)) {
           case 1:
            this.scroll.content = this.missionProcessContent;
            this.missionProcessContent.active = true;
            break;

           default:
            this.scroll.content = this.missionTheLeContent;
            this.missionTheLeContent.active = true;
          }
        }
      }
      toggleLeft(event, selectTab) {
        if (event && "mission" === event.target.name) {
          App_1.default.instance.toast.showToast("T\xednh n\u0103ng \u0111ang c\u1eadp nh\u1eadt.");
          "x3" === this.currentTab ? this.leftX3Toggle.isChecked = true : this.leftTanThuToggle.isChecked = true;
          return;
        }
        this.topProcessToggle.isChecked = true;
        this.scroll.content.parent.children.forEach(item => {
          item.active = false;
        });
        this.currentTab = selectTab || event.target.name;
        switch (this.currentTab) {
         case "x3":
          event || (this.leftX3Toggle.isChecked = true);
          this.scroll.content = this.x3ProcessContent;
          this.x3ProcessContent.active = true;
          this.topProcessToggle.node.getChildByName("Dot").active = Configs_1.default.Login.X3Deposit.length < 3;
          break;

         case "tanthu":
          event || (this.leftTanThuToggle.isChecked = true);
          this.scroll.content = this.tanThuContent;
          this.tanThuContent.active = true;
          this.topProcessToggle.node.getChildByName("Dot").active = false;
          break;

         case "mission":
          event || (this.leftMission.isChecked = true);
          this.initMissionData();
          this.scroll.content = this.missionProcessContent;
          this.missionProcessContent.active = true;
          this.topProcessToggle.node.getChildByName("Dot").active = false;
        }
      }
      initX3Deposit() {
        this.x3ProcessContent.removeAllChildren();
        var arr = [];
        Configs_1.default.Login.X3Deposit.forEach(item => {
          var temp = cc.instantiate(this.instantiateNode.getChildByName("itemX3"));
          arr.push(item.channel);
          temp.getComponent(itemX3Mission_1.default).init(item);
          this.x3ProcessContent.addChild(temp);
          temp.x = 0;
        });
        if (3 != arr.length) {
          if (arr.indexOf("bank") < 0) {
            var temp = cc.instantiate(this.instantiateNode.getChildByName("itemX3"));
            temp.getComponent(itemX3Mission_1.default).init({
              channel: "bank"
            });
            this.x3ProcessContent.addChild(temp);
            temp.x = 0;
            temp.getChildByName("chargeNow").getChildByName("Dot").active = true;
          }
          if (arr.indexOf("momo") < 0) {
            var temp = cc.instantiate(this.instantiateNode.getChildByName("itemX3"));
            temp.getComponent(itemX3Mission_1.default).init({
              channel: "momo"
            });
            this.x3ProcessContent.addChild(temp);
            temp.x = 0;
            temp.getChildByName("chargeNow").getChildByName("Dot").active = true;
          }
          if (arr.indexOf("card") < 0) {
            var temp = cc.instantiate(this.instantiateNode.getChildByName("itemX3"));
            temp.getComponent(itemX3Mission_1.default).init({
              channel: "card"
            });
            this.x3ProcessContent.addChild(temp);
            temp.x = 0;
            temp.getChildByName("chargeNow").getChildByName("Dot").active = true;
          }
        }
      }
      initMissionData() {
        this.missionProcessContent.removeAllChildren();
        Http_1.default.get(Configs_1.default.App.API, {
          c: 6015,
          nn: Configs_1.default.Login.Nickname
        }, (err, res) => {
          if (err) return;
          cc.log(res);
          if (res.is_success) {
            res.missions = res.missions.sort((a, b) => a.mission_type - b.mission_type);
            res.missions.forEach(item => {
              var temp = cc.instantiate(this.instantiateNode.getChildByName("itemMission"));
              temp.getComponent(itemMission_1.default).init(item, res.user_missions);
              this.missionProcessContent.addChild(temp);
              temp.x = 0;
            });
            this.scroll.scrollToTop(.1);
          }
        });
      }
      openOTP() {
        Lobby_PopupSecurity_1.default.createAndShow(App_1.default.instance.popups);
        this.dismiss();
      }
      showGame(name) {
        switch (name.toLowerCase()) {
         case "sam":
          App_1.default.instance.lobby.actGoToSam(null);
          break;

         case "bacay":
          App_1.default.instance.lobby.actGoToBaCay(null);
          break;

         case "binh":
          App_1.default.instance.lobby.actGoToMauBinh(null);
          break;

         case "tlmn":
          App_1.default.instance.lobby.actGoToTLMN(null);
          break;

         case "poker":
          App_1.default.instance.lobby.actGoToPoker(null);
          break;

         case "baicao":
          App_1.default.instance.lobby.actGoToBaiCao(null);
          break;

         case "taixiu":
          App_1.default.instance.lobby.actGameTaiXiu(null);
        }
        this.dismiss();
      }
    };
    PopupMission.instance = null;
    PopupMission.initing = false;
    __decorate([ property(cc.ScrollView) ], PopupMission.prototype, "scroll", void 0);
    __decorate([ property(cc.Node) ], PopupMission.prototype, "instantiateNode", void 0);
    __decorate([ property(cc.Node) ], PopupMission.prototype, "x3ProcessContent", void 0);
    __decorate([ property(cc.Node) ], PopupMission.prototype, "missionProcessContent", void 0);
    __decorate([ property(cc.Node) ], PopupMission.prototype, "missionTheLeContent", void 0);
    __decorate([ property(cc.Node) ], PopupMission.prototype, "x3TheLeContent", void 0);
    __decorate([ property(cc.Node) ], PopupMission.prototype, "tanThuContent", void 0);
    __decorate([ property(cc.Toggle) ], PopupMission.prototype, "topProcessToggle", void 0);
    __decorate([ property(cc.Toggle) ], PopupMission.prototype, "leftX3Toggle", void 0);
    __decorate([ property(cc.Toggle) ], PopupMission.prototype, "leftTanThuToggle", void 0);
    __decorate([ property(cc.Toggle) ], PopupMission.prototype, "leftMission", void 0);
    PopupMission = PopupMission_1 = __decorate([ ccclass ], PopupMission);
    exports.default = PopupMission;
    cc._RF.pop();
  }, {
    "../../Game/src/common/App": "App",
    "../../Game/src/common/BroadcastReceiver": "BroadcastReceiver",
    "../../Game/src/common/Configs": "Configs",
    "../../Game/src/common/Dialog": "Dialog",
    "../../Game/src/common/Http": "Http",
    "./Authorization/AuthorizationResponseData": "AuthorizationResponseData",
    "./Lobby.PopupSecurity": "Lobby.PopupSecurity",
    "./Mission/itemMission": "itemMission",
    "./Mission/itemX3Mission": "itemX3Mission"
  } ],
  "Lobby.PopupOTP": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fdc31gbpp9OhKayhCq4JjkR", "Lobby.PopupOTP");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var PopupOTP_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Dialog_1 = require("../../Game/src/common/Dialog");
    const MiniGameNetworkClient_1 = require("../../Game/src/networks/MiniGameNetworkClient");
    const App_1 = require("../../Game/src/common/App");
    const Network_InPacket_1 = require("../../Game/src/networks/Network.InPacket");
    const Lobby_Cmd_1 = require("./Lobby.Cmd");
    const BroadcastReceiver_1 = require("../../Game/src/common/BroadcastReceiver");
    const Configs_1 = require("../../Game/src/common/Configs");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let PopupOTP = PopupOTP_1 = class PopupOTP extends Dialog_1.default {
      constructor() {
        super(...arguments);
        this.edbCode = null;
        this.lblContainsBotOTPs = [];
      }
      static createAndShow(parent) {
        if (!this.initing) if (null == this.instance || null == this.instance.node) {
          this.initing = true;
          App_1.default.instance.loadPrefab("Lobby/res/prefabs/popups/PopupOTP", (err, prefab) => {
            this.initing = false;
            if (null != err) {
              App_1.default.instance.alertDialog.showMsg(err);
              return;
            }
            let go = cc.instantiate(prefab);
            go.parent = parent;
            this.instance = go.getComponent(PopupOTP_1);
            this.instance.show();
          });
        } else this.instance.show();
      }
      start() {
        for (let i = 0; i < this.lblContainsBotOTPs.length; i++) {
          let lbl = this.lblContainsBotOTPs[i];
          lbl.string = lbl.string.replace("$bot_otp", "@" + Configs_1.default.App.getLinkTelegram());
        }
        MiniGameNetworkClient_1.default.getInstance().addListener(data => {
          let inpacket = new Network_InPacket_1.default(data);
          switch (inpacket.getCmdId()) {
           case Lobby_Cmd_1.default.Code.GET_OTP:
            {
              App_1.default.instance.showLoading(false);
              let res = new Lobby_Cmd_1.default.ResGetOTP(data);
              cc.log(res);
              0 == res.error ? App_1.default.instance.alertDialog.showMsg("M\xe3 OTP \u0111\xe3 \u0111\u01b0\u1ee3c g\u1eedi \u0111i!") : 30 == res.error ? App_1.default.instance.alertDialog.showMsg("M\u1ed7i thao t\xe1c l\u1ea5y SMS OTP ph\u1ea3i c\xe1ch nhau \xedt nh\u1ea5t 5 ph\xfat!") : App_1.default.instance.alertDialog.showMsg("Thao t\xe1c kh\xf4ng th\xe0nh c\xf4ng vui l\xf2ng th\u1eed l\u1ea1i sau!");
              break;
            }

           case Lobby_Cmd_1.default.Code.SEND_OTP:
            {
              App_1.default.instance.showLoading(false);
              let res = new Lobby_Cmd_1.default.ResSendOTP(data);
              cc.log(res);
              if (0 != res.error) {
                switch (res.error) {
                 case 0:
                  this.dismiss();
                  break;

                 case 1:
                 case 2:
                  App_1.default.instance.alertDialog.showMsg("Giao d\u1ecbch th\u1ea5t b\u1ea1i!");
                  this.dismiss();
                  break;

                 case 3:
                  App_1.default.instance.alertDialog.showMsg("M\xe3 x\xe1c th\u1ef1c kh\xf4ng ch\xednh x\xe1c, vui l\xf2ng th\u1eed l\u1ea1i!");
                  break;

                 case 4:
                  App_1.default.instance.alertDialog.showMsg("M\xe3 OTP \u0111\xe3 h\u1ebft h\u1ea1n!");
                  break;

                 default:
                  App_1.default.instance.alertDialog.showMsg("L\u1ed7i " + res.error + ". Kh\xf4ng x\xe1c \u0111\u1ecbnh.");
                  this.dismiss();
                }
                return;
              }
              this.dismiss();
              break;
            }

           case Lobby_Cmd_1.default.Code.INSERT_GIFTCODE:
            {
              App_1.default.instance.showLoading(false);
              let res = new Lobby_Cmd_1.default.ResInsertGiftcode(data);
              switch (res.error) {
               case 0:
                App_1.default.instance.alertDialog.showMsg("M\xe3 Giftcode kh\xf4ng ch\xednh x\xe1c. Vui l\xf2ng ki\u1ec3m tra l\u1ea1i!");
                break;

               case 1:
                App_1.default.instance.alertDialog.showMsg("M\xe3 Giftcode \u0111\xe3 \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng.");
                break;

               case 3:
                App_1.default.instance.alertDialog.showMsg("\u0110\u1ec3 nh\u1eadn giftcode vui l\xf2ng \u0111\u0103ng k\xfd b\u1ea3o m\u1eadt.");
                break;

               case 4:
               case 5:
               case 6:
                App_1.default.instance.alertDialog.showMsg("Giftcode \u0111\xe3 nh\u1eadp kh\xf4ng h\u1ee3p l\u1ec7.");
                break;

               case 2:
                Configs_1.default.Login.Coin = res.currentMoneyVin;
                BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN);
                App_1.default.instance.alertDialog.showMsg("Nh\u1eadn th\u01b0\u1edfng th\xe0nh c\xf4ng.");
              }
              break;
            }
          }
        }, this);
      }
      show() {
        super.show();
        this.edbCode.string = "";
      }
      actSubmit() {
        let otp = this.edbCode.string.trim();
        if ("" == otp) {
          App_1.default.instance.alertDialog.showMsg("M\xe3 OTP kh\xf4ng \u0111\u01b0\u1ee3c \u0111\u1ec3 tr\u1ed1ng.");
          return;
        }
        App_1.default.instance.showLoading(true);
        MiniGameNetworkClient_1.default.getInstance().send(new Lobby_Cmd_1.default.ReqSendOTP(otp, 0));
      }
      actGetOTP() {
        App_1.default.instance.showLoading(true);
        MiniGameNetworkClient_1.default.getInstance().send(new Lobby_Cmd_1.default.ReqGetOTP());
      }
      actTelegram() {
        App_1.default.instance.openTelegram();
      }
    };
    PopupOTP.instance = null;
    PopupOTP.initing = false;
    __decorate([ property(cc.EditBox) ], PopupOTP.prototype, "edbCode", void 0);
    __decorate([ property([ cc.Label ]) ], PopupOTP.prototype, "lblContainsBotOTPs", void 0);
    PopupOTP = PopupOTP_1 = __decorate([ ccclass ], PopupOTP);
    exports.default = PopupOTP;
    cc._RF.pop();
  }, {
    "../../Game/src/common/App": "App",
    "../../Game/src/common/BroadcastReceiver": "BroadcastReceiver",
    "../../Game/src/common/Configs": "Configs",
    "../../Game/src/common/Dialog": "Dialog",
    "../../Game/src/networks/MiniGameNetworkClient": "MiniGameNetworkClient",
    "../../Game/src/networks/Network.InPacket": "Network.InPacket",
    "./Lobby.Cmd": "Lobby.Cmd"
  } ],
  "Lobby.PopupProfile": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e8d07bA9C1GXpc2i+jEc0Dg", "Lobby.PopupProfile");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var PopupProfile_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Dialog_1 = require("../../Game/src/common/Dialog");
    const BroadcastReceiver_1 = require("../../Game/src/common/BroadcastReceiver");
    const Utils_1 = require("../../Game/src/common/Utils");
    const Configs_1 = require("../../Game/src/common/Configs");
    const App_1 = require("../../Game/src/common/App");
    const MiniGameNetworkClient_1 = require("../../Game/src/networks/MiniGameNetworkClient");
    const Lobby_Cmd_1 = require("./Lobby.Cmd");
    const Network_InPacket_1 = require("../../Game/src/networks/Network.InPacket");
    const Lobby_PopupChangeAvatar_1 = require("./Lobby.PopupChangeAvatar");
    const Lobby_PopupChangePassword_1 = require("./Authorization/Lobby.PopupChangePassword");
    const Lobby_PopupShop_1 = require("./Lobby.PopupShop");
    const Lobby_PopupSecurity_1 = require("./Lobby.PopupSecurity");
    const Lobby_PopupTransaction_1 = require("./Lobby.PopupTransaction");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let PopupProfile = PopupProfile_1 = class PopupProfile extends Dialog_1.default {
      constructor() {
        super(...arguments);
        this.lblNickname = null;
        this.lblCoin = null;
        this.lblBirthday = null;
        this.lblIP = null;
        this.lblJoinDate = null;
        this.spriteAvatar = null;
        this.lblPhoneNumber = null;
        this.btnPhoneNumber = null;
        this.progressVipPoint = null;
        this.arrowProgressVipPoint = null;
        this.lblCurrentVippoint = null;
        this.stepsProgressVipPoint = null;
        this.iconVipFrames = [];
        this.spriteVipPointCurrentRank = null;
        this.lblVipPointNameCurrentRank = null;
        this.lblVipPointCurrentRank = null;
        this.spriteVipPointNextRank = null;
        this.lblVipPointNameNextRank = null;
        this.lblVipPointNextRank = null;
      }
      start() {
        BroadcastReceiver_1.default.register(BroadcastReceiver_1.default.USER_UPDATE_COIN, () => {
          if (!this.node.active) return;
          this.lblCoin.string = Utils_1.default.formatNumber(Configs_1.default.Login.Coin);
        }, this);
        BroadcastReceiver_1.default.register(BroadcastReceiver_1.default.USER_INFO_UPDATED, () => {
          if (!this.node.active) return;
          this.spriteAvatar.spriteFrame = App_1.default.instance.getAvatarSpriteFrame(Configs_1.default.Login.Avatar);
        }, this);
        BroadcastReceiver_1.default.register(BroadcastReceiver_1.default.USER_VIP_UPDATED, () => {
          this.setVipPoint();
        }, this);
        MiniGameNetworkClient_1.default.getInstance().addListener(data => {
          if (!this.node.active) return;
          let inpacket = new Network_InPacket_1.default(data);
          switch (inpacket.getCmdId()) {
           case Lobby_Cmd_1.default.Code.GET_SECURITY_INFO:
            {
              App_1.default.instance.showLoading(false);
              let res = new Lobby_Cmd_1.default.ResGetSecurityInfo(data);
              cc.log(res);
              if (res.mobile.length > 0) {
                this.lblPhoneNumber.node.active = true;
                this.lblPhoneNumber.string = "*******" + res.mobile.substring(res.mobile.length - 3);
                this.btnPhoneNumber.active = false;
              } else {
                this.lblPhoneNumber.node.active = false;
                this.btnPhoneNumber.active = true;
              }
              break;
            }

           case Lobby_Cmd_1.default.Code.GET_OTP:
            {
              if (!this.node.active) return;
              App_1.default.instance.showLoading(false);
              let res = new Lobby_Cmd_1.default.ResGetOTP(data);
              cc.log(res);
              0 == res.error ? App_1.default.instance.alertDialog.showMsg("M\xe3 OTP \u0111\xe3 \u0111\u01b0\u1ee3c g\u1eedi \u0111i!") : 30 == res.error ? App_1.default.instance.alertDialog.showMsg("M\u1ed7i thao t\xe1c l\u1ea5y SMS OTP ph\u1ea3i c\xe1ch nhau \xedt nh\u1ea5t 5 ph\xfat!") : App_1.default.instance.alertDialog.showMsg("Thao t\xe1c kh\xf4ng th\xe0nh c\xf4ng vui l\xf2ng th\u1eed l\u1ea1i sau!");
              break;
            }

           case Lobby_Cmd_1.default.Code.SEND_OTP:
            {
              let res = new Lobby_Cmd_1.default.ResSendOTP(data);
              cc.log(res);
              App_1.default.instance.showLoading(false);
              switch (res.error) {
               case 0:
                break;

               case 1:
               case 2:
                App_1.default.instance.alertDialog.showMsg("Giao d\u1ecbch th\u1ea5t b\u1ea1i!");
                break;

               case 77:
               case 3:
                App_1.default.instance.alertDialog.showMsg("M\xe3 x\xe1c th\u1ef1c kh\xf4ng ch\xednh x\xe1c, vui l\xf2ng th\u1eed l\u1ea1i!");
                break;

               case 4:
                App_1.default.instance.alertDialog.showMsg("M\xe3 OTP \u0111\xe3 h\u1ebft h\u1ea1n!");
                break;

               default:
                App_1.default.instance.alertDialog.showMsg("L\u1ed7i " + res.error + ". Kh\xf4ng x\xe1c \u0111\u1ecbnh.");
              }
              break;
            }
          }
        }, this);
      }
      static createAndShow(parent) {
        if (!this.initing) if (null == this.instance || null == this.instance.node) {
          this.initing = true;
          App_1.default.instance.loadPrefab("Lobby/res/prefabs/popups/PopupProfile", (err, prefab) => {
            this.initing = false;
            if (null != err) {
              App_1.default.instance.alertDialog.showMsg(err);
              return;
            }
            let go = cc.instantiate(prefab);
            go.parent = parent;
            this.instance = go.getComponent(PopupProfile_1);
            this.instance.node.zIndex = 1e3;
            this.instance.show();
          });
        } else {
          this.instance.node.zIndex = 1e3;
          this.instance.show();
        }
      }
      show() {
        super.show();
        MiniGameNetworkClient_1.default.getInstance().send(new Lobby_Cmd_1.default.ReqGetSecurityInfo());
        this.lblNickname.string = Configs_1.default.Login.Nickname;
        this.lblCoin.string = Utils_1.default.formatNumber(Configs_1.default.Login.Coin);
        this.lblBirthday.string = "" == Configs_1.default.Login.Birthday ? "Ch\u01b0a c\u1eadp nh\u1eadt" : Configs_1.default.Login.Birthday;
        this.lblIP.string = Configs_1.default.Login.IpAddress;
        this.lblJoinDate.string = Configs_1.default.Login.CreateTime;
        this.spriteAvatar.spriteFrame = App_1.default.instance.getAvatarSpriteFrame(Configs_1.default.Login.Avatar);
        this.setVipPoint();
      }
      actShowAddCoin() {
        this.dismiss();
        Lobby_PopupShop_1.default.createAndShow(App_1.default.instance.popups);
      }
      actGetOTP() {
        App_1.default.instance.showLoading(true);
        MiniGameNetworkClient_1.default.getInstance().send(new Lobby_Cmd_1.default.ReqGetOTP());
      }
      actChangeAvatar() {
        Lobby_PopupChangeAvatar_1.default.createAndShow(App_1.default.instance.popups);
      }
      actChangePassword() {
        Lobby_PopupChangePassword_1.default.createAndShow(App_1.default.instance.popups);
      }
      actSecurity() {
        Lobby_PopupSecurity_1.default.createAndShow(App_1.default.instance.popups);
      }
      actTransaction() {
        Lobby_PopupTransaction_1.default.createAndShow(App_1.default.instance.popups);
      }
      actBack() {
        App_1.default.instance.confirmDialog.show3("B\u1ea1n c\xf3 mu\u1ed1n \u0111\u0103ng xu\u1ea5t kh\u1ecfi t\xe0i kho\u1ea3n?", "\u0110\u0103ng xu\u1ea5t", isConfirm => {
          if (isConfirm) {
            BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_LOGOUT);
            this.dismiss();
          }
        });
      }
      setVipPoint() {
        if (!Configs_1.default.Login.VipPoint) return;
        this.spriteVipPointCurrentRank.spriteFrame = this.iconVipFrames[Configs_1.default.Login.getCurrentVipPointRank()];
        this.lblVipPointNameCurrentRank.string = Configs_1.default.Login.getCurrentVipPointName();
        this.lblVipPointCurrentRank.string = Utils_1.default.formatMoney(Configs_1.default.Login.getMinVipPointCurrentRank());
        if (Configs_1.default.Login.haveVipPointNextRank()) {
          this.spriteVipPointNextRank.spriteFrame = this.iconVipFrames[Configs_1.default.Login.getCurrentVipPointRank() + 1];
          this.lblVipPointNameNextRank.string = Configs_1.default.Login.getVipPointNameNextRank();
          this.lblVipPointNextRank.string = Utils_1.default.formatMoney(Configs_1.default.Login.getMinVipPointNextRank());
          this.lblCurrentVippoint.string = Utils_1.default.formatNumber(Configs_1.default.Login.getCurrentVipPoint());
          const currentVippointFill = (Configs_1.default.Login.getCurrentVipPoint() - Configs_1.default.Login.getMinVipPointCurrentRank()) / (Configs_1.default.Login.getMinVipPointNextRank() - Configs_1.default.Login.getMinVipPointCurrentRank());
          this.progressVipPoint.getChildByName("bar").getComponent(cc.Sprite).fillRange = currentVippointFill;
          this.arrowProgressVipPoint.x = (currentVippointFill - .5) * this.progressVipPoint.width;
          const vippointStep = (Configs_1.default.Login.getMinVipPointNextRank() - Configs_1.default.Login.getMinVipPointCurrentRank()) / 5;
          this.stepsProgressVipPoint.children.forEach((step, i) => {
            step.getComponentInChildren(cc.Label).string = Utils_1.default.formatMoney(i * vippointStep + Configs_1.default.Login.getMinVipPointCurrentRank());
          });
        } else {
          this.progressVipPoint.active = false;
          this.spriteVipPointNextRank.node.parent.active = false;
          this.spriteVipPointCurrentRank.node.parent.x = 0;
        }
      }
    };
    PopupProfile.instance = null;
    PopupProfile.initing = false;
    __decorate([ property(cc.Label) ], PopupProfile.prototype, "lblNickname", void 0);
    __decorate([ property(cc.Label) ], PopupProfile.prototype, "lblCoin", void 0);
    __decorate([ property(cc.Label) ], PopupProfile.prototype, "lblBirthday", void 0);
    __decorate([ property(cc.Label) ], PopupProfile.prototype, "lblIP", void 0);
    __decorate([ property(cc.Label) ], PopupProfile.prototype, "lblJoinDate", void 0);
    __decorate([ property(cc.Sprite) ], PopupProfile.prototype, "spriteAvatar", void 0);
    __decorate([ property(cc.Label) ], PopupProfile.prototype, "lblPhoneNumber", void 0);
    __decorate([ property(cc.Node) ], PopupProfile.prototype, "btnPhoneNumber", void 0);
    __decorate([ property(cc.Node) ], PopupProfile.prototype, "progressVipPoint", void 0);
    __decorate([ property(cc.Node) ], PopupProfile.prototype, "arrowProgressVipPoint", void 0);
    __decorate([ property(cc.Label) ], PopupProfile.prototype, "lblCurrentVippoint", void 0);
    __decorate([ property(cc.Node) ], PopupProfile.prototype, "stepsProgressVipPoint", void 0);
    __decorate([ property([ cc.SpriteFrame ]) ], PopupProfile.prototype, "iconVipFrames", void 0);
    __decorate([ property(cc.Sprite) ], PopupProfile.prototype, "spriteVipPointCurrentRank", void 0);
    __decorate([ property(cc.Label) ], PopupProfile.prototype, "lblVipPointNameCurrentRank", void 0);
    __decorate([ property(cc.Label) ], PopupProfile.prototype, "lblVipPointCurrentRank", void 0);
    __decorate([ property(cc.Sprite) ], PopupProfile.prototype, "spriteVipPointNextRank", void 0);
    __decorate([ property(cc.Label) ], PopupProfile.prototype, "lblVipPointNameNextRank", void 0);
    __decorate([ property(cc.Label) ], PopupProfile.prototype, "lblVipPointNextRank", void 0);
    PopupProfile = PopupProfile_1 = __decorate([ ccclass ], PopupProfile);
    exports.default = PopupProfile;
    cc._RF.pop();
  }, {
    "../../Game/src/common/App": "App",
    "../../Game/src/common/BroadcastReceiver": "BroadcastReceiver",
    "../../Game/src/common/Configs": "Configs",
    "../../Game/src/common/Dialog": "Dialog",
    "../../Game/src/common/Utils": "Utils",
    "../../Game/src/networks/MiniGameNetworkClient": "MiniGameNetworkClient",
    "../../Game/src/networks/Network.InPacket": "Network.InPacket",
    "./Authorization/Lobby.PopupChangePassword": "Lobby.PopupChangePassword",
    "./Lobby.Cmd": "Lobby.Cmd",
    "./Lobby.PopupChangeAvatar": "Lobby.PopupChangeAvatar",
    "./Lobby.PopupSecurity": "Lobby.PopupSecurity",
    "./Lobby.PopupShop": "Lobby.PopupShop",
    "./Lobby.PopupTransaction": "Lobby.PopupTransaction"
  } ],
  "Lobby.PopupRegister": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f70b5sgzlJJKpPiKlbtFiUW", "Lobby.PopupRegister");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Dialog_1 = require("../../../Game/src/common/Dialog");
    const Http_1 = require("../../../Game/src/common/Http");
    const Configs_1 = require("../../../Game/src/common/Configs");
    const App_1 = require("../../../Game/src/common/App");
    const Lobby_PopupUpdateNickname_1 = require("../Lobby.PopupUpdateNickname");
    const Lobby_PopupLogin_1 = require("./Lobby.PopupLogin");
    const AuthorizationController_1 = require("./AuthorizationController");
    const Utils_1 = require("../../../Game/src/common/Utils");
    const {ccclass: ccclass, property: property} = cc._decorator;
    var Lobby;
    (function(Lobby) {
      var PopupRegister_1;
      let PopupRegister = PopupRegister_1 = class PopupRegister extends Dialog_1.default {
        constructor() {
          super(...arguments);
          this.edbUsername = null;
          this.edbPassword = null;
          this.edbRePassword = null;
          this.edbCaptcha = null;
          this.sprCaptcha = null;
          this.captchaId = "";
        }
        static createAndShow(parent) {
          if (!this.initing) if (null == this.instance || null == this.instance.node) {
            this.initing = true;
            App_1.default.instance.loadPrefab("Lobby/res/prefabs/popups/PopupRegister", (err, prefab) => {
              this.initing = false;
              if (null != err) {
                App_1.default.instance.alertDialog.showMsg(err);
                return;
              }
              let go = cc.instantiate(prefab);
              go.parent = parent;
              this.instance = go.getComponent(PopupRegister_1);
              this.instance.node.zIndex = 1e3;
              this.instance.show();
            });
          } else {
            this.instance.node.zIndex = 1e3;
            this.instance.show();
          }
        }
        show() {
          super.show();
          this.edbCaptcha.string = "";
          this.actRefreshCaptcha();
        }
        actRegister() {
          let username = this.edbUsername.string.trim();
          let password = this.edbPassword.string;
          let rePassword = this.edbRePassword.string;
          let captcha = this.edbCaptcha.string.trim();
          if (0 == username.length) {
            App_1.default.instance.alertDialog.showMsg("T\xean \u0111\u0103ng nh\u1eadp kh\xf4ng \u0111\u01b0\u1ee3c \u0111\u1ec3 tr\u1ed1ng.");
            return;
          }
          if (0 == password.length) {
            App_1.default.instance.alertDialog.showMsg("M\u1eadt kh\u1ea9u kh\xf4ng \u0111\u01b0\u1ee3c \u0111\u1ec3 tr\u1ed1ng.");
            return;
          }
          if (password != rePassword) {
            App_1.default.instance.alertDialog.showMsg("Hai m\u1eadt kh\u1ea9u kh\xf4ng kh\u1edbp.");
            return;
          }
          if (0 == captcha.length) {
            App_1.default.instance.alertDialog.showMsg("M\xe3 x\xe1c th\u1ef1c kh\xf4ng \u0111\u01b0\u1ee3c \u0111\u1ec3 tr\u1ed1ng.");
            return;
          }
          App_1.default.instance.showLoading(true);
          let reqParams = {
            un: username,
            pw: md5(password),
            captcha: captcha,
            captchaId: this.captchaId,
            app_id: Configs_1.default.App.UPDATE_INFO.provider,
            c_v: Configs_1.default.App.UPDATE_INFO.version
          };
          if (cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS) {
            reqParams["utm_source"] = "IOS";
            reqParams["utm_medium"] = "IOS";
            reqParams["utm_term"] = "IOS";
            reqParams["utm_content"] = "IOS";
            reqParams["utm_campaign"] = "IOS";
          } else if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
            reqParams["utm_source"] = "ANDROID";
            reqParams["utm_medium"] = "ANDROID";
            reqParams["utm_term"] = "ANDROID";
            reqParams["utm_content"] = "ANDROID";
            reqParams["utm_campaign"] = "ANDROID";
          }
          Http_1.default.post(Configs_1.default.App.API + "?c=1", reqParams, (err, res) => {
            App_1.default.instance.showLoading(false);
            if (null != err) {
              App_1.default.instance.alertDialog.showMsg("X\u1ea3y ra l\u1ed7i, vui l\xf2ng th\u1eed l\u1ea1i sau!");
              return;
            }
            cc.log(res);
            if (!res["success"]) {
              this.actRefreshCaptcha();
              App_1.default.instance.alertDialog.showMsg(res["desc"] || "X\u1ea3y ra l\u1ed7i, vui l\xf2ng th\u1eed l\u1ea1i sau!");
              return;
            }
            this.dismiss();
            Lobby_PopupUpdateNickname_1.default.createAndShow(App_1.default.instance.popups, username, password, AuthorizationController_1.LOGIN_SOURCE.NORMAl);
          });
        }
        actLoginFB() {
          AuthorizationController_1.AuthorizationController.getInstance().loginFacebook(() => {
            this.dismiss();
          });
        }
        actLogin() {
          Lobby_PopupLogin_1.default.createAndShow(App_1.default.instance.popups);
          this.dismiss();
        }
        actRefreshCaptcha() {
          Http_1.default.get(Configs_1.default.App.API, {
            c: 124,
            requireLogin: false
          }, (err, res) => {
            if (null != err) {
              App_1.default.instance.alertDialog.showMsg("X\u1ea3y ra l\u1ed7i, vui l\xf2ng th\u1eed l\u1ea1i sau!");
              return;
            }
            this.captchaId = res["id"];
            Utils_1.default.loadSpriteFrameFromBase64(res["img"], sprFrame => {
              this.sprCaptcha.spriteFrame = sprFrame;
            });
          });
        }
      };
      PopupRegister.instance = null;
      PopupRegister.initing = false;
      __decorate([ property(cc.EditBox) ], PopupRegister.prototype, "edbUsername", void 0);
      __decorate([ property(cc.EditBox) ], PopupRegister.prototype, "edbPassword", void 0);
      __decorate([ property(cc.EditBox) ], PopupRegister.prototype, "edbRePassword", void 0);
      __decorate([ property(cc.EditBox) ], PopupRegister.prototype, "edbCaptcha", void 0);
      __decorate([ property(cc.Sprite) ], PopupRegister.prototype, "sprCaptcha", void 0);
      PopupRegister = PopupRegister_1 = __decorate([ ccclass ], PopupRegister);
      Lobby.PopupRegister = PopupRegister;
    })(Lobby || (Lobby = {}));
    exports.default = Lobby.PopupRegister;
    cc._RF.pop();
  }, {
    "../../../Game/src/common/App": "App",
    "../../../Game/src/common/Configs": "Configs",
    "../../../Game/src/common/Dialog": "Dialog",
    "../../../Game/src/common/Http": "Http",
    "../../../Game/src/common/Utils": "Utils",
    "../Lobby.PopupUpdateNickname": "Lobby.PopupUpdateNickname",
    "./AuthorizationController": "AuthorizationController",
    "./Lobby.PopupLogin": "Lobby.PopupLogin"
  } ],
  "Lobby.PopupResetPassword": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "04b0eBh3ABIE7l/qSw33HgN", "Lobby.PopupResetPassword");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var PopupResetPassword_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Dialog_1 = require("../../../Game/src/common/Dialog");
    const App_1 = require("../../../Game/src/common/App");
    const Http_1 = require("../../../Game/src/common/Http");
    const Configs_1 = require("../../../Game/src/common/Configs");
    const SPUtils_1 = require("../../../Game/src/common/SPUtils");
    const AuthorizationController_1 = require("./AuthorizationController");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let PopupResetPassword = PopupResetPassword_1 = class PopupResetPassword extends Dialog_1.default {
      constructor() {
        super(...arguments);
        this.edbPassword = null;
        this.edbRePassword = null;
        this.username = "";
        this.nickname = "";
        this.accessToken = "";
      }
      static createAndShow(parent, username, nickname, accessToken = "") {
        if (null == this.instance || null == this.instance.node) App_1.default.instance.loadPrefab("Lobby/res/prefabs/popups/PopupResetPassword", (err, prefab) => {
          if (null != err) return;
          let go = cc.instantiate(prefab);
          go.parent = parent;
          this.instance = go.getComponent(PopupResetPassword_1);
          this.instance.node.zIndex = 1e3;
          this.instance.show();
          this.instance.username = username;
          this.instance.nickname = nickname;
          this.instance.accessToken = accessToken;
        }); else {
          this.instance.node.zIndex = 1e3;
          this.instance.show();
          this.instance.username = username;
          this.instance.nickname = nickname;
          this.instance.accessToken = accessToken;
        }
      }
      show() {
        this.edbPassword.string = "";
        this.edbRePassword.string = "";
        super.show();
      }
      actSubmitResetPassword() {
        let password = this.edbPassword.string;
        let repassword = this.edbRePassword.string;
        if (0 === password.length) {
          App_1.default.instance.alertDialog.showMsg("Vui l\xf2ng nh\u1eadp m\u1eadt kh\u1ea9u m\u1edbi.");
          return;
        }
        if (0 === repassword.length) {
          App_1.default.instance.alertDialog.showMsg("Vui l\xf2ng nh\u1eadp l\u1ea1i m\u1eadt kh\u1ea9u m\u1edbi.");
          return;
        }
        if (password !== repassword) {
          App_1.default.instance.alertDialog.showMsg("M\u1eadt kh\u1ea9u kh\xf4ng tr\xf9ng nhau. Vui l\xf2ng th\u1eed l\u1ea1i.");
          return;
        }
        Http_1.default.post(Configs_1.default.App.API + "?c=6025", {
          accessToken: this.accessToken,
          nickname: this.nickname,
          newPassword: md5(password)
        }, (err, res) => {
          if (null != err) {
            App_1.default.instance.alertDialog.showMsg("X\u1ea3y ra l\u1ed7i, vui l\xf2ng th\u1eed l\u1ea1i sau!");
            return;
          }
          cc.log(res);
          if (!res["success"]) {
            App_1.default.instance.alertDialog.showMsg(res["desc"] || "L\u1ed7i kh\xf4ng x\xe1c \u0111\u1ecbnh.");
            return;
          }
          SPUtils_1.default.setUserName(this.username);
          SPUtils_1.default.setUserPass(password);
          AuthorizationController_1.AuthorizationController.getInstance().autoLogin();
          this.dismiss();
        });
      }
    };
    PopupResetPassword.instance = null;
    __decorate([ property(cc.EditBox) ], PopupResetPassword.prototype, "edbPassword", void 0);
    __decorate([ property(cc.EditBox) ], PopupResetPassword.prototype, "edbRePassword", void 0);
    PopupResetPassword = PopupResetPassword_1 = __decorate([ ccclass ], PopupResetPassword);
    exports.default = PopupResetPassword;
    cc._RF.pop();
  }, {
    "../../../Game/src/common/App": "App",
    "../../../Game/src/common/Configs": "Configs",
    "../../../Game/src/common/Dialog": "Dialog",
    "../../../Game/src/common/Http": "Http",
    "../../../Game/src/common/SPUtils": "SPUtils",
    "./AuthorizationController": "AuthorizationController"
  } ],
  "Lobby.PopupSecurity": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0e75cAsFntKPqi/S/aghnaV", "Lobby.PopupSecurity");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var PopupSecurity_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.TabTelegram = exports.TabSafes = exports.PanelSmsPlus = void 0;
    const Dialog_1 = require("../../Game/src/common/Dialog");
    const App_1 = require("../../Game/src/common/App");
    const Utils_1 = require("../../Game/src/common/Utils");
    const Configs_1 = require("../../Game/src/common/Configs");
    const BroadcastReceiver_1 = require("../../Game/src/common/BroadcastReceiver");
    const Http_1 = require("../../Game/src/common/Http");
    const AuthorizationResponseData_1 = require("./Authorization/AuthorizationResponseData");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let PanelSmsPlus = class PanelSmsPlus {
      constructor() {
        this.node = null;
        this.info = null;
        this.update = null;
        this.continue = null;
        this.infoLblUsername = null;
        this.infoLblPhoneNumber = null;
        this.infoBtnActive = null;
        this.infoBtnChange = null;
        this.updateBtnsNotActive = null;
        this.continueEdbOTP = null;
      }
    };
    __decorate([ property(cc.Node) ], PanelSmsPlus.prototype, "node", void 0);
    __decorate([ property(cc.Node) ], PanelSmsPlus.prototype, "info", void 0);
    __decorate([ property(cc.Node) ], PanelSmsPlus.prototype, "update", void 0);
    __decorate([ property(cc.Node) ], PanelSmsPlus.prototype, "continue", void 0);
    __decorate([ property(cc.Label) ], PanelSmsPlus.prototype, "infoLblUsername", void 0);
    __decorate([ property(cc.Label) ], PanelSmsPlus.prototype, "infoLblPhoneNumber", void 0);
    __decorate([ property(cc.Button) ], PanelSmsPlus.prototype, "infoBtnActive", void 0);
    __decorate([ property(cc.Button) ], PanelSmsPlus.prototype, "infoBtnChange", void 0);
    __decorate([ property(cc.Node) ], PanelSmsPlus.prototype, "updateBtnsNotActive", void 0);
    __decorate([ property(cc.EditBox) ], PanelSmsPlus.prototype, "continueEdbOTP", void 0);
    PanelSmsPlus = __decorate([ ccclass("Lobby.PopupSecurity.PanelSmsPlus") ], PanelSmsPlus);
    exports.PanelSmsPlus = PanelSmsPlus;
    let TabSafes = class TabSafes {
      constructor() {
        this.node = null;
        this.tabs = null;
        this.tabContents = null;
        this.lblBalance = null;
        this.lblBalanceSafes = null;
        this.edbCoinNap = null;
        this.edbCoinRut = null;
        this.edbOTP = null;
        this.toggleAppOTP = null;
        this.tabSelectedIdx = 0;
      }
      start() {
        this.edbCoinRut.node.on("editing-did-ended", () => {
          let number = Utils_1.default.stringToInt(this.edbCoinRut.string);
          this.edbCoinRut.string = Utils_1.default.formatNumber(number);
        });
        this.edbCoinNap.node.on("editing-did-ended", () => {
          let number = Utils_1.default.stringToInt(this.edbCoinNap.string);
          this.edbCoinNap.string = Utils_1.default.formatNumber(number);
        });
        for (let i = 0; i < this.tabs.toggleItems.length; i++) this.tabs.toggleItems[i].node.on("toggle", () => {
          this.tabSelectedIdx = i;
          this.onTabChanged();
        });
      }
      onTabChanged() {
        for (let i = 0; i < this.tabContents.childrenCount; i++) this.tabContents.children[i].active = i == this.tabSelectedIdx;
        for (let j = 0; j < this.tabs.toggleItems.length; j++) this.tabs.toggleItems[j].node.getComponentInChildren(cc.Label).node.opacity = j == this.tabSelectedIdx ? 255 : 123;
        switch (this.tabSelectedIdx) {
         case 0:
          this.edbCoinNap.string = "";
          break;

         case 1:
          this.edbCoinRut.string = "";
          this.edbOTP.string = "";
        }
      }
    };
    __decorate([ property(cc.Node) ], TabSafes.prototype, "node", void 0);
    __decorate([ property(cc.ToggleContainer) ], TabSafes.prototype, "tabs", void 0);
    __decorate([ property(cc.Node) ], TabSafes.prototype, "tabContents", void 0);
    __decorate([ property(cc.Label) ], TabSafes.prototype, "lblBalance", void 0);
    __decorate([ property(cc.Label) ], TabSafes.prototype, "lblBalanceSafes", void 0);
    __decorate([ property(cc.EditBox) ], TabSafes.prototype, "edbCoinNap", void 0);
    __decorate([ property(cc.EditBox) ], TabSafes.prototype, "edbCoinRut", void 0);
    __decorate([ property(cc.EditBox) ], TabSafes.prototype, "edbOTP", void 0);
    __decorate([ property(cc.Toggle) ], TabSafes.prototype, "toggleAppOTP", void 0);
    TabSafes = __decorate([ ccclass("Lobby.PopupSecurity.TabSafes") ], TabSafes);
    exports.TabSafes = TabSafes;
    let TabTelegram = class TabTelegram {
      constructor() {
        this.settingGroup = null;
        this.activateGroup = null;
        this.tgLoginOTP = null;
        this.tgCashoutOTP = null;
        this.tgSafesOTP = null;
      }
      start() {
        this.tgLoginOTP.isChecked = false;
        this.tgCashoutOTP.isChecked = false;
        this.tgSafesOTP.isChecked = false;
      }
      getSecurityStatus() {
        Http_1.default.get(Configs_1.default.App.API, {
          c: 6027
        }, (err, res) => {
          App_1.default.instance.showLoading(false);
          if (err) {
            App_1.default.instance.alertDialog.showMsg("C\xe0i \u0111\u1eb7t l\u1ed7i!");
            return;
          }
          let securityRes = new AuthorizationResponseData_1.UserInfoResponse(res);
          cc.log(securityRes);
          if (!securityRes.success) {
            App_1.default.instance.alertDialog.showMsg(securityRes.desc || securityRes.errorCode);
            return;
          }
          this.securityData = securityRes;
          this.tgLoginOTP.isChecked = this.securityData.userSettings.publicAttributes.isLoginOtp;
          this.settingGroup.active = 1 === this.securityData.mobileSecure;
          this.activateGroup.active = 1 !== this.securityData.mobileSecure;
        });
      }
    };
    __decorate([ property(cc.Node) ], TabTelegram.prototype, "settingGroup", void 0);
    __decorate([ property(cc.Node) ], TabTelegram.prototype, "activateGroup", void 0);
    __decorate([ property(cc.Toggle) ], TabTelegram.prototype, "tgLoginOTP", void 0);
    __decorate([ property(cc.Toggle) ], TabTelegram.prototype, "tgCashoutOTP", void 0);
    __decorate([ property(cc.Toggle) ], TabTelegram.prototype, "tgSafesOTP", void 0);
    TabTelegram = __decorate([ ccclass("Lobby.PopupSecurity.TabTelegram") ], TabTelegram);
    exports.TabTelegram = TabTelegram;
    let PopupSecurity = PopupSecurity_1 = class PopupSecurity extends Dialog_1.default {
      constructor() {
        super(...arguments);
        this.tabs = null;
        this.tabContents = null;
        this.panelSmsPlus = null;
        this.tabSafes = null;
        this.lblContainsBotOTPs = [];
        this.tabTelegram = null;
        this.tabSelectedIdx = 0;
      }
      start() {
        for (let i = 0; i < this.lblContainsBotOTPs.length; i++) {
          let lbl = this.lblContainsBotOTPs[i];
          lbl.string = lbl.string.replace("$bot_otp", "@" + Configs_1.default.App.getLinkTelegram());
        }
        this.tabSafes.start();
        for (let i = 0; i < this.tabs.toggleItems.length; i++) this.tabs.toggleItems[i].node.on("toggle", () => {
          this.tabSelectedIdx = i;
          this.onTabChanged();
        });
        BroadcastReceiver_1.default.register(BroadcastReceiver_1.default.USER_UPDATE_COIN, () => {
          this.tabSafes.lblBalance.string = Utils_1.default.formatNumber(Configs_1.default.Login.Coin);
        }, this);
        this.tabTelegram.start();
      }
      static createAndShow(parent) {
        if (!this.initing) if (null == this.instance || null == this.instance.node) {
          this.initing = true;
          App_1.default.instance.loadPrefab("Lobby/res/prefabs/popups/PopupSecurity", (err, prefab) => {
            this.initing = false;
            if (null != err) {
              App_1.default.instance.alertDialog.showMsg(err);
              return;
            }
            let go = cc.instantiate(prefab);
            go.parent = parent;
            this.instance = go.getComponent(PopupSecurity_1);
            this.instance.node.zIndex = 1e3;
            this.instance.show();
          });
        } else {
          this.instance.node.zIndex = 1e3;
          this.instance.show();
        }
      }
      show() {
        super.show();
        this.tabSelectedIdx = 0;
        this.tabs.toggleItems[this.tabSelectedIdx].isChecked = true;
        this.onTabChanged();
        this.tabTelegram.getSecurityStatus();
      }
      actSmsPlusInfo() {
        this.panelSmsPlus.info.active = true;
        this.panelSmsPlus.update.active = false;
        this.panelSmsPlus.continue.active = false;
      }
      actSmsPlusUpdate() {
        this.panelSmsPlus.info.active = false;
        this.panelSmsPlus.update.active = true;
        this.panelSmsPlus.continue.active = false;
      }
      showSmsPlusContinue() {
        this.panelSmsPlus.info.active = false;
        this.panelSmsPlus.update.active = false;
        this.panelSmsPlus.continue.active = true;
        this.panelSmsPlus.continueEdbOTP.string = "";
      }
      actSmsPlusSubmitUpdateUserInfo() {}
      actSmsPlusSubmitUpdatePhoneNumber() {}
      actSmsPlusSubmitContinuePhoneNumber() {
        let otp = this.panelSmsPlus.continueEdbOTP.string.trim();
        if (0 == otp.length) {
          App_1.default.instance.alertDialog.showMsg("M\xe3 x\xe1c th\u1ef1c kh\xf4ng \u0111\u01b0\u1ee3c b\u1ecf tr\u1ed1ng.");
          return;
        }
        App_1.default.instance.showLoading(true);
      }
      actSmsPlusActivePhone() {
        App_1.default.instance.showLoading(true);
      }
      actSubmitSafesNap() {
        let coin = Utils_1.default.stringToInt(this.tabSafes.edbCoinNap.string);
        if (coin <= 0) {
          App_1.default.instance.alertDialog.showMsg("S\u1ed1 ti\u1ec1n giao d\u1ecbch kh\xf4ng h\u1ee3p l\u1ec7.");
          return;
        }
        App_1.default.instance.showLoading(true);
      }
      actSubmitSafesRut() {
        let coin = Utils_1.default.stringToInt(this.tabSafes.edbCoinRut.string);
        let otp = this.tabSafes.edbOTP.string;
        if (coin <= 0) {
          App_1.default.instance.alertDialog.showMsg("S\u1ed1 ti\u1ec1n giao d\u1ecbch kh\xf4ng h\u1ee3p l\u1ec7.");
          return;
        }
        if (0 == otp.length) {
          App_1.default.instance.alertDialog.showMsg("M\xe3 x\xe1c th\u1ef1c OTP kh\xf4ng \u0111\u01b0\u1ee3c b\u1ecf tr\u1ed1ng.");
          return;
        }
        App_1.default.instance.showLoading(true);
      }
      actGetOTP() {
        App_1.default.instance.openTelegram(Configs_1.default.App.TELE_OTP);
      }
      actTelegram() {
        App_1.default.instance.openTelegram();
      }
      onTabChanged() {
        for (let i = 0; i < this.tabContents.childrenCount; i++) this.tabContents.children[i].active = i == this.tabSelectedIdx;
        for (let j = 0; j < this.tabs.toggleItems.length; j++) this.tabs.toggleItems[j].node.getComponentInChildren(cc.Label).node.opacity = j == this.tabSelectedIdx ? 255 : 123;
        switch (this.tabSelectedIdx) {
         case 0:
          break;

         case 1:
         case 2:
          App_1.default.instance.toast.showToast("T\xednh n\u0103ng \u0111ang t\u1ea1m kh\xf3a.");
          this.tabSelectedIdx = 0;
          this.tabs.toggleItems[0].isChecked = true;
          this.onTabChanged();
        }
      }
      onToggleLoginOTP(toggle) {
        let enableLoginOTP = toggle.isChecked;
        App_1.default.instance.showLoading(true);
        Http_1.default.post(Configs_1.default.App.API + "?c=6026", {
          settingType: "LOGIN_OTP",
          value: "" + enableLoginOTP
        }, (err, res) => {
          App_1.default.instance.showLoading(false);
          if (err) {
            App_1.default.instance.alertDialog.showMsg("C\xe0i \u0111\u1eb7t l\u1ed7i!");
            return;
          }
          cc.log(res);
          res["desc"] && App_1.default.instance.alertDialog.showMsg(res["desc"]);
        });
      }
      onToggleCashoutOTP(toggle) {
        App_1.default.instance.toast.showToast("T\xednh n\u0103ng \u0111ang t\u1ea1m kh\xf3a.");
        toggle.isChecked = false;
      }
      onToggleSafesOTP(toggle) {
        App_1.default.instance.toast.showToast("T\xednh n\u0103ng \u0111ang t\u1ea1m kh\xf3a.");
        toggle.isChecked = false;
      }
      activateTelegram() {
        App_1.default.instance.openTelegram();
        this.dismiss();
      }
    };
    PopupSecurity.instance = null;
    PopupSecurity.initing = false;
    __decorate([ property(cc.ToggleContainer) ], PopupSecurity.prototype, "tabs", void 0);
    __decorate([ property(cc.Node) ], PopupSecurity.prototype, "tabContents", void 0);
    __decorate([ property(PanelSmsPlus) ], PopupSecurity.prototype, "panelSmsPlus", void 0);
    __decorate([ property(TabSafes) ], PopupSecurity.prototype, "tabSafes", void 0);
    __decorate([ property([ cc.Label ]) ], PopupSecurity.prototype, "lblContainsBotOTPs", void 0);
    __decorate([ property(TabTelegram) ], PopupSecurity.prototype, "tabTelegram", void 0);
    PopupSecurity = PopupSecurity_1 = __decorate([ ccclass ], PopupSecurity);
    exports.default = PopupSecurity;
    cc._RF.pop();
  }, {
    "../../Game/src/common/App": "App",
    "../../Game/src/common/BroadcastReceiver": "BroadcastReceiver",
    "../../Game/src/common/Configs": "Configs",
    "../../Game/src/common/Dialog": "Dialog",
    "../../Game/src/common/Http": "Http",
    "../../Game/src/common/Utils": "Utils",
    "./Authorization/AuthorizationResponseData": "AuthorizationResponseData"
  } ],
  "Lobby.PopupSetting": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b88a0XjpYtPJa3XtIieO8I2", "Lobby.PopupSetting");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var PopupSetting_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const BroadcastReceiver_1 = require("../../Game/src/common/BroadcastReceiver");
    const SPUtils_1 = require("../../Game/src/common/SPUtils");
    const App_1 = require("../../Game/src/common/App");
    const Lobby_PopupMailBox_1 = require("./Lobby.PopupMailBox");
    const Configs_1 = require("../../Game/src/common/Configs");
    const Lobby_PopupCommunity_1 = require("./Lobby.PopupCommunity");
    const Lobby_PopupMission_1 = require("./Lobby.PopupMission");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let PopupSetting = PopupSetting_1 = class PopupSetting extends cc.Component {
      constructor() {
        super(...arguments);
        this.panel = null;
        this.toggleMusic = null;
        this.toggleSound = null;
        this.animation = null;
        this.notiMission = null;
        this.animate = false;
      }
      static createAndShow(parent) {
        if (!this.initing) if (null == this.instance || null == this.instance.node) {
          this.initing = true;
          App_1.default.instance.loadPrefab("Lobby/res/prefabs/popups/PopupSetting", (err, prefab) => {
            this.initing = false;
            if (null != err) {
              App_1.default.instance.alertDialog.showMsg(err);
              return;
            }
            let go = cc.instantiate(prefab);
            go.parent = parent;
            this.instance = go.getComponent(PopupSetting_1);
            this.instance.node.zIndex = 1e3;
            this.instance.show();
          });
        } else {
          this.instance.node.zIndex = 1e3;
          this.instance.show();
        }
      }
      start() {
        BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.SET_SOUND, this.node);
        this.toggleMusic.node.on("toggle", () => {
          SPUtils_1.default.setMusicVolumn(this.toggleMusic.isChecked ? 1 : 0);
          BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.ON_AUDIO_CHANGED);
        });
        this.toggleSound.node.on("toggle", () => {
          SPUtils_1.default.setSoundVolumn(this.toggleSound.isChecked ? 1 : 0);
          BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.ON_AUDIO_CHANGED);
        });
        this.animation.node.on("toggle", () => {
          SPUtils_1.default.setShowAnim(this.animation.isChecked ? "true" : "false");
          BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.ON_SHOW_ANIM_CHANGED);
        });
        this.toggleMusic.isChecked = SPUtils_1.default.getMusicVolumn() > 0;
        this.toggleSound.isChecked = SPUtils_1.default.getSoundVolumn() > 0;
        this.toggleMusic.isChecked = "true" == SPUtils_1.default.getShowAnim();
        BroadcastReceiver_1.default.register(BroadcastReceiver_1.default.X3_DEPOSIT, data => {
          this.notiMission.active = Configs_1.default.Login.X3Deposit.length < 3;
        }, this);
        BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.X3_DEPOSIT);
      }
      show() {
        if (this.animate) return;
        this.animate = true;
        this.node.active = true;
        this.panel.active = true;
        this.panel.stopAllActions();
        this.panel.scaleY = 0;
        this.panel.runAction(cc.sequence(cc.scaleTo(.2, 1).easing(cc.easeBackOut()), cc.callFunc(() => {
          this.animate = false;
        })));
      }
      dismiss() {
        if (this.animate) return;
        this.animate = true;
        this.panel.stopAllActions();
        this.panel.runAction(cc.sequence(cc.scaleTo(.2, 1, 0).easing(cc.easeBackIn()), cc.callFunc(() => {
          this.node.active = false;
          this.panel.active = false;
          this.animate = false;
        })));
      }
      actMailBox() {
        if (!Configs_1.default.Login.IsLogin) {
          App_1.default.instance.alertDialog.showMsg("B\u1ea1n ch\u01b0a \u0111\u0103ng nh\u1eadp.");
          return;
        }
        Lobby_PopupMailBox_1.default.createAndShow(App_1.default.instance.popups);
        this.dismiss();
      }
      actCommunity() {
        Lobby_PopupCommunity_1.default.createAndShow(App_1.default.instance.popups);
        this.dismiss();
      }
      actOTP() {
        App_1.default.instance.openTelegram();
        this.dismiss();
      }
      actEventMission() {
        if (!Configs_1.default.Login.IsLogin) {
          App_1.default.instance.alertDialog.showMsg("B\u1ea1n ch\u01b0a \u0111\u0103ng nh\u1eadp.");
          return;
        }
        Lobby_PopupMailBox_1.default.createAndShow(App_1.default.instance.popups, true);
        this.dismiss();
      }
      actMission(event, selectedTab) {
        if (!Configs_1.default.Login.IsLogin) {
          App_1.default.instance.alertDialog.showMsg("B\u1ea1n ch\u01b0a \u0111\u0103ng nh\u1eadp.");
          return;
        }
        Lobby_PopupMission_1.default.createAndShow(App_1.default.instance.popups, selectedTab);
        this.dismiss();
      }
    };
    PopupSetting.instance = null;
    PopupSetting.initing = false;
    __decorate([ property(cc.Node) ], PopupSetting.prototype, "panel", void 0);
    __decorate([ property(cc.Toggle) ], PopupSetting.prototype, "toggleMusic", void 0);
    __decorate([ property(cc.Toggle) ], PopupSetting.prototype, "toggleSound", void 0);
    __decorate([ property(cc.Toggle) ], PopupSetting.prototype, "animation", void 0);
    __decorate([ property(cc.Node) ], PopupSetting.prototype, "notiMission", void 0);
    PopupSetting = PopupSetting_1 = __decorate([ ccclass ], PopupSetting);
    exports.default = PopupSetting;
    cc._RF.pop();
  }, {
    "../../Game/src/common/App": "App",
    "../../Game/src/common/BroadcastReceiver": "BroadcastReceiver",
    "../../Game/src/common/Configs": "Configs",
    "../../Game/src/common/SPUtils": "SPUtils",
    "./Lobby.PopupCommunity": "Lobby.PopupCommunity",
    "./Lobby.PopupMailBox": "Lobby.PopupMailBox",
    "./Lobby.PopupMission": "Lobby.PopupMission"
  } ],
  "Lobby.PopupShop": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f799d8RfyVPQ6kTX/5FYaW1", "Lobby.PopupShop");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var PopupShop_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.TabGiftcode = exports.TabBank = exports.TabMomo = exports.TabBitCoin = exports.TabTransfer = exports.TabNapThe = void 0;
    const Dialog_1 = require("../../Game/src/common/Dialog");
    const Lobby_Cmd_1 = require("./Lobby.Cmd");
    const Network_InPacket_1 = require("../../Game/src/networks/Network.InPacket");
    const MiniGameNetworkClient_1 = require("../../Game/src/networks/MiniGameNetworkClient");
    const Dropdown_1 = require("../../Game/src/common/Dropdown");
    const Configs_1 = require("../../Game/src/common/Configs");
    const App_1 = require("../../Game/src/common/App");
    const Http_1 = require("../../Game/src/common/Http");
    const Utils_1 = require("../../Game/src/common/Utils");
    const BroadcastReceiver_1 = require("../../Game/src/common/BroadcastReceiver");
    const ShootFishNetworkClient_1 = require("../../Game/src/networks/ShootFishNetworkClient");
    const Constants_1 = require("../../Game/src/common/Constants");
    const SPUtils_1 = require("../../Game/src/common/SPUtils");
    const Lobby_DropdownBank_1 = require("./Lobby.DropdownBank");
    const Lobby_DropdownTelco_1 = require("./Lobby.DropdownTelco");
    const ErrorLogger_1 = require("../../Game/src/common/ErrorLogger");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let TabNapThe = class TabNapThe {
      constructor() {
        this.dropdownTelco = null;
        this.btnDropdownTelco = null;
        this.dropdownAmount = null;
        this.edbCode = null;
        this.edbSerial = null;
        this.listFactor = null;
        this.itemRate = null;
        this.telcoValues = [];
        this.fillCardData = null;
      }
      setCardData(recharges, rawRes) {
        let telcoNames = [];
        this.telcoValues = [];
        for (let [key, value] of recharges) {
          if (value.type !== Configs_1.default.App.REWARD_TYPE.CARD) continue;
          telcoNames.push(key);
          let values = {
            moneys: [],
            golds: [],
            ids: []
          };
          value.items.forEach(item => {
            values.moneys.push(Utils_1.default.formatNumber(item.money));
            values.golds.push(Utils_1.default.formatNumber(item.gold));
            values.ids.push(item.id);
          });
          this.telcoValues.push(values);
        }
        this.dropdownTelco.setOptions(telcoNames);
        this.dropdownTelco.setOnValueChange(idx => {
          if (idx >= 0) {
            this.dropdownAmount.setOptions(this.telcoValues[idx].moneys);
            this.listFactor.removeAllChildren();
            this.itemRate.active = false;
            let telco = this.telcoValues[idx];
            for (let i = 0; i < telco.moneys.length; i++) {
              let item = cc.instantiate(this.itemRate);
              item.x = 0;
              item.parent = this.listFactor;
              item.getChildByName("menhgia").getComponent(cc.Label).string = telco.moneys[i];
              item.getChildByName("nhan").getComponent(cc.Label).string = telco.golds[i];
              item.active = true;
            }
            this.btnDropdownTelco.getChildByName("lblTelco").active = false;
            this.btnDropdownTelco.getChildByName("currentTelco").active = true;
          } else {
            this.dropdownAmount.setOptions([]);
            this.btnDropdownTelco.getChildByName("lblTelco").active = true;
            this.btnDropdownTelco.getChildByName("currentTelco").active = false;
          }
          this.dropdownAmount.setValue(-1);
          this.dropdownAmount.label.string = "Ch\u1ecdn m\u1ec7nh gi\xe1";
        });
        this.dropdownTelco.setValue(-1);
        if (this.fillCardData) {
          var temp = null;
          rawRes.forEach(item => {
            item.id == this.fillCardData.provider && (temp = item);
          });
          temp && telcoNames.forEach((item, index) => {
            if (item.toLowerCase() == temp.image.toLowerCase()) {
              this.dropdownTelco.setValue(index);
              this.dropdownAmount.setOptions(this.telcoValues[index].moneys);
              this.telcoValues[index].moneys.forEach((item2, index2) => {
                Number(item2.replace(/\./g, "")) == temp.money && this.dropdownAmount.setValue(index2);
              });
            }
          });
          this.edbCode.string = this.fillCardData.pin;
          this.edbSerial.string = this.fillCardData.serial;
          this.fillCardData = null;
        }
      }
      reset() {
        this.dropdownTelco.setValue(-1);
        this.edbCode.string = "";
        this.edbSerial.string = "";
      }
      submit() {
        let ddTelcoValue = this.dropdownTelco.getValue();
        let ddAmountValue = this.dropdownAmount.getValue();
        let code = this.edbCode.string.trim();
        let serial = this.edbSerial.string.trim();
        if (-1 == ddTelcoValue) {
          App_1.default.instance.alertDialog.showMsg("Vui l\xf2ng ch\u1ecdn nh\xe0 m\u1ea1ng.");
          return;
        }
        if (-1 == ddAmountValue) {
          App_1.default.instance.alertDialog.showMsg("Vui l\xf2ng ch\u1ecdn m\u1ec7nh gi\xe1.");
          return;
        }
        if ("" == code || parseInt(code) <= 0 || isNaN(parseInt(code))) {
          App_1.default.instance.alertDialog.showMsg("M\xe3 th\u1ebb kh\xf4ng h\u1ee3p l\u1ec7.");
          return;
        }
        if ("" == serial || parseInt(serial) <= 0 || isNaN(parseInt(serial))) {
          App_1.default.instance.alertDialog.showMsg("M\xe3 serial kh\xf4ng h\u1ee3p l\u1ec7.");
          return;
        }
        App_1.default.instance.showLoading(true);
        var params = {
          c: 6008,
          un: Configs_1.default.Login.Username,
          request_id: this.telcoValues[ddTelcoValue].ids[ddAmountValue],
          pin: code,
          serial: serial
        };
        Http_1.default.get(Configs_1.default.App.API, params, (err, res) => {
          App_1.default.instance.showLoading(false);
          if (null != err) {
            App_1.default.instance.alertDialog.showMsg("Thao t\xe1c kh\xf4ng th\xe0nh c\xf4ng, vui l\xf2ng th\u1eed l\u1ea1i sau.");
            ErrorLogger_1.ErrorLogger.sendLogError("Http request error", "Telco cashin", JSON.stringify(err));
            return;
          }
          cc.log(res);
          res.is_success || ErrorLogger_1.ErrorLogger.sendLogError("Error", "Telco cashin", JSON.stringify(res));
          App_1.default.instance.alertDialog.showMsg(res.desc);
          this.reset();
        });
      }
      fillCard(data) {
        this.fillCardData = data;
      }
    };
    __decorate([ property(Lobby_DropdownTelco_1.default) ], TabNapThe.prototype, "dropdownTelco", void 0);
    __decorate([ property(cc.Node) ], TabNapThe.prototype, "btnDropdownTelco", void 0);
    __decorate([ property(Dropdown_1.default) ], TabNapThe.prototype, "dropdownAmount", void 0);
    __decorate([ property(cc.EditBox) ], TabNapThe.prototype, "edbCode", void 0);
    __decorate([ property(cc.EditBox) ], TabNapThe.prototype, "edbSerial", void 0);
    __decorate([ property(cc.Node) ], TabNapThe.prototype, "listFactor", void 0);
    __decorate([ property(cc.Node) ], TabNapThe.prototype, "itemRate", void 0);
    TabNapThe = __decorate([ ccclass("Lobby.PopupShop.TabNapThe") ], TabNapThe);
    exports.TabNapThe = TabNapThe;
    let TabTransfer = class TabTransfer {
      constructor() {
        this.panelContent = null;
        this.panelContinue = null;
        this.lblBalance = null;
        this.lblFee = null;
        this.lblReceive = null;
        this.lblDaiLy = null;
        this.lblNote = null;
        this.edbNickname = null;
        this.edbCoinTransfer = null;
        this.edbNote = null;
        this.edbOTP = null;
        this.ratioTransfer = Configs_1.default.App.SERVER_CONFIG.ratioTransfer;
      }
      start() {
        this.edbCoinTransfer.node.on("editing-did-ended", () => {
          let number = Utils_1.default.stringToInt(this.edbCoinTransfer.string);
          this.edbCoinTransfer.string = Utils_1.default.formatNumber(number);
          this.lblReceive.string = Utils_1.default.formatNumber(Math.round(this.ratioTransfer * number));
        });
        this.edbNickname.node.on("editing-did-ended", () => {
          let nickname = this.edbNickname.string.trim();
          if ("" != nickname) {
            App_1.default.instance.showLoading(true);
            MiniGameNetworkClient_1.default.getInstance().send(new Lobby_Cmd_1.default.ReqCheckNicknameTransfer(nickname));
          }
        });
      }
      reset() {
        this.panelContent.active = true;
        this.panelContinue.active = false;
        this.lblDaiLy.node.active = false;
        this.lblFee.string = "0";
        this.lblBalance.string = Utils_1.default.formatNumber(Configs_1.default.Login.Coin);
        this.lblReceive.string = "0";
        this.edbNickname.string = SPUtils_1.default.getNicknameTransfer();
        this.edbNote.string = "";
        this.edbCoinTransfer.string = "";
        this.lblNote.string = this.lblNote.string.replace("%s", Math.round(100 * (1 - this.ratioTransfer)) + "%");
        this.lblFee.string = Math.round(100 * (1 - this.ratioTransfer)) + "%";
      }
      continue() {
        let nickname = this.edbNickname.string.trim();
        let coin = Utils_1.default.stringToInt(this.edbCoinTransfer.string);
        let note = this.edbNote.string.trim();
        if ("" == nickname) {
          App_1.default.instance.alertDialog.showMsg("Nickname kh\xf4ng \u0111\u01b0\u1ee3c \u0111\u1ec3 tr\u1ed1ng.");
          return;
        }
        if (nickname === Configs_1.default.Login.Nickname) {
          App_1.default.instance.alertDialog.showMsg("Nickname ng\u01b0\u1eddi nh\u1eadn tr\xf9ng v\u1edbi ng\u01b0\u1eddi g\u1eedi.");
          return;
        }
        if ("" == note) {
          App_1.default.instance.alertDialog.showMsg("L\xfd do chuy\u1ec3n kho\u1ea3n kh\xf4ng \u0111\u01b0\u1ee3c \u0111\u1ec3 tr\u1ed1ng.");
          return;
        }
        if (coin < 1e4) {
          App_1.default.instance.alertDialog.showMsg("S\u1ed1 ti\u1ec1n giao d\u1ecbch ph\u1ea3i l\u1edbn h\u01a1n ho\u1eb7c b\u1eb1ng 10.000.");
          return;
        }
        if (coin > Configs_1.default.Login.Coin) {
          App_1.default.instance.alertDialog.showMsg("S\u1ed1 d\u01b0 kh\xf4ng \u0111\u1ee7.");
          return;
        }
        App_1.default.instance.confirmDialog.show2('B\u1ea1n c\xf3 ch\u1eafc ch\u1eafn mu\u1ed1n chuy\u1ec3n cho\nT\xe0i kho\u1ea3n: "' + nickname + '" (Kh\xf4ng ph\u1ea3i \u0110.L\xfd)\nS\u1ed1 ti\u1ec1n: ' + this.edbCoinTransfer.string + "\nL\xfd do: " + note, isConfirm => {
          if (isConfirm) {
            App_1.default.instance.showLoading(true);
            MiniGameNetworkClient_1.default.getInstance().send(new Lobby_Cmd_1.default.ReqTransferCoin(nickname, coin, note, ""));
          }
        });
      }
    };
    __decorate([ property(cc.Node) ], TabTransfer.prototype, "panelContent", void 0);
    __decorate([ property(cc.Node) ], TabTransfer.prototype, "panelContinue", void 0);
    __decorate([ property(cc.Label) ], TabTransfer.prototype, "lblBalance", void 0);
    __decorate([ property(cc.Label) ], TabTransfer.prototype, "lblFee", void 0);
    __decorate([ property(cc.Label) ], TabTransfer.prototype, "lblReceive", void 0);
    __decorate([ property(cc.Label) ], TabTransfer.prototype, "lblDaiLy", void 0);
    __decorate([ property(cc.Label) ], TabTransfer.prototype, "lblNote", void 0);
    __decorate([ property(cc.EditBox) ], TabTransfer.prototype, "edbNickname", void 0);
    __decorate([ property(cc.EditBox) ], TabTransfer.prototype, "edbCoinTransfer", void 0);
    __decorate([ property(cc.EditBox) ], TabTransfer.prototype, "edbNote", void 0);
    __decorate([ property(cc.EditBox) ], TabTransfer.prototype, "edbOTP", void 0);
    TabTransfer = __decorate([ ccclass("Lobby.PopupShop.TabTransfer") ], TabTransfer);
    exports.TabTransfer = TabTransfer;
    let TabBitCoin = class TabBitCoin {
      constructor() {
        this.edbAddress = null;
        this.dropdownMoneyType = null;
        this.moneyTypes = [ "", "BTC", "LTC", "ETH", "TUSD", "USDC", "USDT.ERC20" ];
        this.moneyTypesName = [ "Ch\u1ecdn lo\u1ea1i ti\u1ec1n", "BTC", "LTC", "ETH", "TUSD", "USDC", "USDT" ];
        this.address = "";
      }
      start(component) {
        this.edbAddress.node.on("editing-did-ended", () => {
          this.edbAddress.string = this.address;
        });
        this.dropdownMoneyType.setOptions(this.moneyTypesName);
        this.dropdownMoneyType.setOnValueChange(idx => {
          this.edbAddress.string = "";
          if (0 == idx) {
            this.edbAddress.placeholder = "Vui l\xf2ng ch\u1ecdn lo\u1ea1i ti\u1ec1n.";
            return;
          }
          this.edbAddress.placeholder = "\u0110ang t\u1ea3i...";
          App_1.default.instance.showLoading(true);
          ShootFishNetworkClient_1.default.getInstance().request("getbtcaddress", {
            coin: this.moneyTypes[idx]
          }, res => {
            App_1.default.instance.showLoading(false);
            if (200 == res["code"]) {
              this.address = res["data"]["result"]["address"];
              Configs_1.default.Login.BitcoinToken = this.edbAddress.string = this.address;
            } else this.edbAddress.placeholder = "L\u1ed7i r\u1ed3i, vui l\xf2ng th\u1eed l\u1ea1i sau.";
          }, component);
        });
        this.dropdownMoneyType.setValue(0);
        this.edbAddress.string = "";
        this.edbAddress.placeholder = "Vui l\xf2ng ch\u1ecdn lo\u1ea1i ti\u1ec1n.";
      }
    };
    __decorate([ property(cc.EditBox) ], TabBitCoin.prototype, "edbAddress", void 0);
    __decorate([ property(Dropdown_1.default) ], TabBitCoin.prototype, "dropdownMoneyType", void 0);
    TabBitCoin = __decorate([ ccclass("Lobby.PopupShop.TabBitCoin") ], TabBitCoin);
    exports.TabBitCoin = TabBitCoin;
    let TabMomo = class TabMomo {
      constructor() {
        this.listMomo = null;
        this.momoItem = null;
        this.lbContent = null;
        this.listFactor = null;
        this.itemRate = null;
        this.nodeHelpMomo = null;
        this.noti = null;
        this.viDienTuSelect = null;
        this.currentViDienTu = null;
        this.walletIcons = [];
        this.walletValues = null;
        this.recharges = null;
        this.resMomo = {
          accounts: [],
          send_content: ""
        };
        this.resZaloPay = {
          accounts: [],
          send_content: ""
        };
        this.resViettelPay = {
          accounts: [],
          send_content: ""
        };
      }
      setWalletData(recharges) {
        this.recharges = recharges;
        this.setWalletByType(Configs_1.default.App.REWARD_TYPE.MOMO);
      }
      setWalletValueByType(walletType) {
        this.walletValues = {
          moneys: [],
          golds: [],
          ids: []
        };
        for (let [key, value] of this.recharges) value.type == walletType && value.items.forEach(item => {
          this.walletValues.moneys.push(Utils_1.default.formatNumber(item.money));
          this.walletValues.golds.push(Utils_1.default.formatNumber(item.gold));
          this.walletValues.ids.push(item.id);
        });
        this.listFactor.removeAllChildren();
        this.itemRate.active = false;
        for (let i = 0; i < this.walletValues.moneys.length; i++) {
          let item = cc.instantiate(this.itemRate);
          item.x = 0;
          item.parent = this.listFactor;
          item.getChildByName("menhgia").getComponent(cc.Label).string = this.walletValues.moneys[i];
          item.getChildByName("nhan").getComponent(cc.Label).string = this.walletValues.golds[i];
          item.active = true;
        }
      }
      setListShipper(res) {
        this.resMomo = res;
        this.listMomo.removeAllPages();
        this.momoItem.active = false;
        res.accounts.forEach(shipper => {
          let item = cc.instantiate(this.momoItem);
          item.getChildByName("lblPhoneNumber").getComponent(cc.Label).string = shipper.phone;
          item.getChildByName("lblAccountName").getComponent(cc.Label).string = shipper.name;
          item.getChildByName("btnCopySDT").on(cc.Node.EventType.TOUCH_START, e => {
            Utils_1.default.copyToClipboard(shipper.phone);
          });
          item.getChildByName("btnCopyTTK").on(cc.Node.EventType.TOUCH_START, e => {
            Utils_1.default.copyToClipboard(shipper.name);
          });
          item.active = true;
          item.y = 0;
          this.listMomo.addPage(item);
        });
        this.lbContent.string = res.send_content;
        this.lbContent.node.getChildByName("btnCopyContent").on(cc.Node.EventType.TOUCH_START, e => {
          Utils_1.default.copyToClipboard(this.resMomo.send_content);
        });
      }
      setViDienTu(res) {
        this.resZaloPay.accounts = [];
        this.resZaloPay.send_content = res.send_content;
        res.accounts.forEach(banker => {
          "ZALOPAY" == banker.bankShortName && this.resZaloPay.accounts.push(banker);
        });
        this.resViettelPay.accounts = [];
        this.resViettelPay.send_content = res.send_content;
        res.accounts.forEach(banker => {
          "VIETTELPAY" == banker.bankShortName && this.resViettelPay.accounts.push(banker);
        });
      }
      setWalletByType(walletType) {
        const isSupportWallet = Array.from(this.recharges.values()).map(value => value["type"]).indexOf(walletType) >= 0;
        this.lbContent.node.parent.active = isSupportWallet;
        this.noti.active = !isSupportWallet;
        switch (walletType) {
         case Configs_1.default.App.REWARD_TYPE.MOMO:
          this.currentViDienTu.spriteFrame = this.walletIcons[0];
          this.listMomo.removeAllPages();
          this.momoItem.active = false;
          this.resMomo.accounts.forEach(shipper => {
            let item = cc.instantiate(this.momoItem);
            item.getChildByName("lblPhoneNumber").getComponent(cc.Label).string = shipper.phone;
            item.getChildByName("lblAccountName").getComponent(cc.Label).string = shipper.name;
            item.getChildByName("btnCopySDT").on(cc.Node.EventType.TOUCH_START, e => {
              Utils_1.default.copyToClipboard(shipper.phone);
            });
            item.getChildByName("btnCopyTTK").on(cc.Node.EventType.TOUCH_START, e => {
              Utils_1.default.copyToClipboard(shipper.name);
            });
            item.active = true;
            item.y = 0;
            this.listMomo.addPage(item);
          });
          this.lbContent.string = this.resMomo.send_content;
          this.lbContent.node.getChildByName("btnCopyContent").on(cc.Node.EventType.TOUCH_START, e => {
            Utils_1.default.copyToClipboard(this.resMomo.send_content);
          });
          this.setWalletValueByType(Configs_1.default.App.REWARD_TYPE.MOMO);
          break;

         case Configs_1.default.App.REWARD_TYPE.ZALOPAY:
          this.currentViDienTu.spriteFrame = this.walletIcons[2];
          this.listMomo.removeAllPages();
          this.momoItem.active = false;
          this.resZaloPay.accounts.forEach(shipper => {
            let item = cc.instantiate(this.momoItem);
            item.getChildByName("lbl sdt momo").getComponent(cc.Label).string = "S\u1ed1 t\xe0i kho\u1ea3n";
            item.getChildByName("lblPhoneNumber").getComponent(cc.Label).string = shipper.accNo;
            item.getChildByName("lblAccountName").getComponent(cc.Label).string = shipper.accName;
            item.getChildByName("btnCopySDT").on(cc.Node.EventType.TOUCH_START, e => {
              Utils_1.default.copyToClipboard(shipper.accNo);
            });
            item.getChildByName("btnCopyTTK").on(cc.Node.EventType.TOUCH_START, e => {
              Utils_1.default.copyToClipboard(shipper.accName);
            });
            item.active = true;
            item.y = 0;
            this.listMomo.addPage(item);
          });
          this.lbContent.string = this.resZaloPay.send_content;
          this.lbContent.node.getChildByName("btnCopyContent").on(cc.Node.EventType.TOUCH_START, e => {
            Utils_1.default.copyToClipboard(this.resZaloPay.send_content);
          });
          this.setWalletValueByType(Configs_1.default.App.REWARD_TYPE.ZALOPAY);
          break;

         case Configs_1.default.App.REWARD_TYPE.VIETTELPAY:
          this.currentViDienTu.spriteFrame = this.walletIcons[1];
          this.listMomo.removeAllPages();
          this.momoItem.active = false;
          this.resViettelPay.accounts.forEach(shipper => {
            let item = cc.instantiate(this.momoItem);
            item.getChildByName("lbl sdt momo").getComponent(cc.Label).string = "S\u1ed1 t\xe0i kho\u1ea3n";
            item.getChildByName("lblPhoneNumber").getComponent(cc.Label).string = shipper.accNo;
            item.getChildByName("lblAccountName").getComponent(cc.Label).string = shipper.accName;
            item.getChildByName("btnCopySDT").on(cc.Node.EventType.TOUCH_START, e => {
              Utils_1.default.copyToClipboard(shipper.accNo);
            });
            item.getChildByName("btnCopyTTK").on(cc.Node.EventType.TOUCH_START, e => {
              Utils_1.default.copyToClipboard(shipper.accName);
            });
            item.active = true;
            item.y = 0;
            this.listMomo.addPage(item);
          });
          this.lbContent.string = this.resViettelPay.send_content;
          this.lbContent.node.getChildByName("btnCopyContent").on(cc.Node.EventType.TOUCH_START, e => {
            Utils_1.default.copyToClipboard(this.resZaloPay.send_content);
          });
          this.setWalletValueByType(Configs_1.default.App.REWARD_TYPE.VIETTELPAY);
        }
      }
      onClickShowHideHelpMomo(event, data) {
        this.nodeHelpMomo.stopAllActions();
        if ("1" === data) {
          this.nodeHelpMomo.active = true;
          this.nodeHelpMomo.scale = 0;
          this.nodeHelpMomo.runAction(cc.scaleTo(.2, 1).easing(cc.easeBackOut()));
        } else this.nodeHelpMomo.runAction(cc.sequence(cc.scaleTo(.2, 0).easing(cc.easeBackIn()), cc.callFunc(() => {
          this.nodeHelpMomo.active = false;
        })));
      }
      showWalletPanel() {
        if (this.viDienTuSelect.active) this.viDienTuSelect.runAction(cc.sequence(cc.scaleTo(.2, 1, 0), cc.callFunc(item => {
          item.active = false;
        }))); else {
          this.viDienTuSelect.scaleY = 0;
          this.viDienTuSelect.active = true;
          this.viDienTuSelect.runAction(cc.scaleTo(.2, 1, 1));
        }
      }
      onChangeViDienTu(walletType) {
        this.viDienTuSelect.runAction(cc.sequence(cc.scaleTo(.2, 1, 0), cc.callFunc(item => {
          item.active = false;
        })));
        this.setWalletByType(walletType);
      }
    };
    __decorate([ property(cc.PageView) ], TabMomo.prototype, "listMomo", void 0);
    __decorate([ property(cc.Node) ], TabMomo.prototype, "momoItem", void 0);
    __decorate([ property(cc.Label) ], TabMomo.prototype, "lbContent", void 0);
    __decorate([ property(cc.Node) ], TabMomo.prototype, "listFactor", void 0);
    __decorate([ property(cc.Node) ], TabMomo.prototype, "itemRate", void 0);
    __decorate([ property(cc.Node) ], TabMomo.prototype, "nodeHelpMomo", void 0);
    __decorate([ property(cc.Node) ], TabMomo.prototype, "noti", void 0);
    __decorate([ property(cc.Node) ], TabMomo.prototype, "viDienTuSelect", void 0);
    __decorate([ property(cc.Sprite) ], TabMomo.prototype, "currentViDienTu", void 0);
    __decorate([ property([ cc.SpriteFrame ]) ], TabMomo.prototype, "walletIcons", void 0);
    TabMomo = __decorate([ ccclass("Lobby.PopupShop.TabMomo") ], TabMomo);
    exports.TabMomo = TabMomo;
    let TabBank = class TabBank {
      constructor() {
        this.itemBanker = null;
        this.dropdownBank = null;
        this.btnDropdownBank = null;
        this.edbAmount = null;
        this.edbMobile = null;
        this.edbCode = null;
        this.listFactor = null;
        this.itemRate = null;
        this.nodeHelpBank = null;
      }
      setBankRate(recharges) {
        let bankValues = {
          moneys: [],
          golds: [],
          ids: []
        };
        for (let [key, value] of recharges) value.type == Configs_1.default.App.REWARD_TYPE.BANK && value.items.forEach(item => {
          bankValues.moneys.push(Utils_1.default.formatNumber(item.money));
          bankValues.golds.push(Utils_1.default.formatNumber(item.gold));
          bankValues.ids.push(item.id);
        });
        this.listFactor.removeAllChildren();
        this.itemRate.active = false;
        for (let i = 0; i < bankValues.moneys.length; i++) {
          let item = cc.instantiate(this.itemRate);
          item.x = 0;
          item.parent = this.listFactor;
          item.getChildByName("menhgia").getComponent(cc.Label).string = bankValues.moneys[i];
          item.getChildByName("nhan").getComponent(cc.Label).string = bankValues.golds[i];
          item.active = true;
        }
      }
      setListBank(bankInfo) {
        this.itemBanker.getChildByName("lbaccno").getComponent(cc.Label).string = "S\u1ed1 t\xe0i kho\u1ea3n";
        this.itemBanker.getChildByName("lbaccname").getComponent(cc.Label).string = "T\xean t\xe0i kho\u1ea3n";
        this.itemBanker.getChildByName("lbcontent").getComponent(cc.Label).string = "N\u1ed9i dung chuy\u1ec3n kho\u1ea3n";
        this.dropdownBank.setOptions(bankInfo.accounts);
        this.dropdownBank.setOnValueChange(idx => {
          if (idx >= 0) {
            this.btnDropdownBank.getChildByName("lblDropdown").active = false;
            this.btnDropdownBank.getChildByName("currentBank").active = true;
            this.itemBanker.getChildByName("lbaccno").getComponent(cc.Label).string = bankInfo.accounts[idx].accNo;
            this.itemBanker.getChildByName("lbaccname").getComponent(cc.Label).string = bankInfo.accounts[idx].accName;
            this.itemBanker.getChildByName("lbcontent").getComponent(cc.Label).string = bankInfo.send_content;
          } else {
            this.btnDropdownBank.getChildByName("lblDropdown").active = true;
            this.btnDropdownBank.getChildByName("currentBank").active = false;
            this.itemBanker.getChildByName("lbaccno").getComponent(cc.Label).string = "S\u1ed1 t\xe0i kho\u1ea3n";
            this.itemBanker.getChildByName("lbaccname").getComponent(cc.Label).string = "T\xean t\xe0i kho\u1ea3n";
            this.itemBanker.getChildByName("lbcontent").getComponent(cc.Label).string = "N\u1ed9i dung chuy\u1ec3n kho\u1ea3n";
          }
        });
        this.dropdownBank.setValue(-1);
      }
      copySTK() {
        Utils_1.default.copyToClipboard(this.itemBanker.getChildByName("lbaccno").getComponent(cc.Label).string);
      }
      copyTTK() {
        Utils_1.default.copyToClipboard(this.itemBanker.getChildByName("lbaccname").getComponent(cc.Label).string);
      }
      copyContent() {
        Utils_1.default.copyToClipboard(this.itemBanker.getChildByName("lbcontent").getComponent(cc.Label).string);
      }
      onClickShowHideHelpBank(event, data) {
        this.nodeHelpBank.stopAllActions();
        if ("1" === data) {
          this.nodeHelpBank.active = true;
          this.nodeHelpBank.scale = 0;
          this.nodeHelpBank.runAction(cc.scaleTo(.2, 1).easing(cc.easeBackOut()));
        } else this.nodeHelpBank.runAction(cc.sequence(cc.scaleTo(.2, 0).easing(cc.easeBackIn()), cc.callFunc(() => {
          this.nodeHelpBank.active = false;
        })));
      }
      submit() {
        let amount = this.edbAmount.string.trim();
        let mobile = this.edbMobile.string.trim();
        let code = this.edbCode.string.trim();
        if ("" == amount || parseInt(amount) <= 0 || isNaN(parseInt(amount))) {
          App_1.default.instance.alertDialog.showMsg("S\u1ed1 ti\u1ec1n kh\xf4ng h\u1ee3p l\u1ec7.");
          return;
        }
        if ("" == mobile || parseInt(mobile) <= 0 || isNaN(parseInt(mobile))) {
          App_1.default.instance.alertDialog.showMsg("S\u1ed1 \u0111i\u1ec7n tho\u1ea1i kh\xf4ng h\u1ee3p l\u1ec7.");
          return;
        }
        if ("" == code || parseInt(code) <= 0 || isNaN(parseInt(code))) {
          App_1.default.instance.alertDialog.showMsg("M\xe3 giao d\u1ecbch kh\xf4ng h\u1ee3p l\u1ec7.");
          return;
        }
        App_1.default.instance.showLoading(true);
        var params = {
          c: 6008,
          un: Configs_1.default.Login.Username,
          amount: amount,
          mobile: mobile,
          code: code
        };
        Http_1.default.get(Configs_1.default.App.API, params, (err, res) => {
          App_1.default.instance.showLoading(false);
          if (null != err) {
            App_1.default.instance.alertDialog.showMsg("Thao t\xe1c kh\xf4ng th\xe0nh c\xf4ng, vui l\xf2ng th\u1eed l\u1ea1i sau.");
            ErrorLogger_1.ErrorLogger.sendLogError("Http request error", "Bank cashin", JSON.stringify(err));
            return;
          }
          res.is_success || ErrorLogger_1.ErrorLogger.sendLogError("Error", "Bank cashin", JSON.stringify(res));
          App_1.default.instance.alertDialog.showMsg(res.desc);
          this.reset();
        });
      }
      reset() {
        this.edbAmount.string = "";
        this.edbMobile.string = "";
        this.edbCode.string = "";
      }
    };
    __decorate([ property(cc.Node) ], TabBank.prototype, "itemBanker", void 0);
    __decorate([ property(Lobby_DropdownBank_1.default) ], TabBank.prototype, "dropdownBank", void 0);
    __decorate([ property(cc.Node) ], TabBank.prototype, "btnDropdownBank", void 0);
    __decorate([ property(cc.EditBox) ], TabBank.prototype, "edbAmount", void 0);
    __decorate([ property(cc.EditBox) ], TabBank.prototype, "edbMobile", void 0);
    __decorate([ property(cc.EditBox) ], TabBank.prototype, "edbCode", void 0);
    __decorate([ property(cc.Node) ], TabBank.prototype, "listFactor", void 0);
    __decorate([ property(cc.Node) ], TabBank.prototype, "itemRate", void 0);
    __decorate([ property(cc.Node) ], TabBank.prototype, "nodeHelpBank", void 0);
    TabBank = __decorate([ ccclass("Lobby.PopupShop.TabBank") ], TabBank);
    exports.TabBank = TabBank;
    let TabGiftcode = class TabGiftcode {
      constructor() {
        this.edbCode = null;
      }
      reset() {
        this.edbCode.string = "";
      }
      setGiftCode(giftcode) {
        this.edbCode.string = giftcode || "";
      }
      submit() {
        let code = this.edbCode.string.trim();
        if ("" == code) {
          App_1.default.instance.alertDialog.showMsg("Giftcode kh\xf4ng \u0111\u01b0\u1ee3c \u0111\u1ec3 tr\u1ed1ng.");
          return;
        }
        App_1.default.instance.showLoading(true);
        MiniGameNetworkClient_1.default.getInstance().send(new Lobby_Cmd_1.default.ReqInsertGiftcode(code));
      }
    };
    __decorate([ property(cc.EditBox) ], TabGiftcode.prototype, "edbCode", void 0);
    TabGiftcode = __decorate([ ccclass("Lobby.PopupShop.TabGiftcode") ], TabGiftcode);
    exports.TabGiftcode = TabGiftcode;
    let PopupShop = PopupShop_1 = class PopupShop extends Dialog_1.default {
      constructor() {
        super(...arguments);
        this.tabs = null;
        this.tabContents = null;
        this.tabNapThe = null;
        this.tabTransfer = null;
        this.tabBitCoin = null;
        this.tabMomo = null;
        this.tabBank = null;
        this.tabGiftcode = null;
        this.lblContainsBotOTPs = [];
        this.tabSelectedIdx = 0;
        this.rechargeByProvider = new Map();
        this.shipperData = null;
        this.bankerData = null;
      }
      start() {
        for (let i = 0; i < this.lblContainsBotOTPs.length; i++) {
          let lbl = this.lblContainsBotOTPs[i];
          lbl.string = lbl.string.replace("$bot_otp", "@" + Configs_1.default.App.getLinkTelegram());
        }
        for (let i = 0; i < this.tabs.toggleItems.length; i++) this.tabs.toggleItems[i].node.on("toggle", () => {
          this.tabSelectedIdx = i;
          this.onTabChanged();
        });
        MiniGameNetworkClient_1.default.getInstance().addListener(data => {
          let inpacket = new Network_InPacket_1.default(data);
          switch (inpacket.getCmdId()) {
           case Lobby_Cmd_1.default.Code.DEPOSIT_CARD:
            {
              App_1.default.instance.showLoading(false);
              let res = new Lobby_Cmd_1.default.ResDepositCard(data);
              switch (res.error) {
               case 0:
                App_1.default.instance.alertDialog.showMsg("N\u1ea1p th\u1ebb th\xe0nh c\xf4ng.");
                Configs_1.default.Login.Coin = res.currentMoney;
                BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN);
                break;

               case 30:
                this.tabNapThe.reset();
                App_1.default.instance.alertDialog.showMsg("H\u1ec7 th\u1ed1ng \u0111\xe3 ghi nh\u1eadn giao d\u1ecbch, vui l\xf2ng ch\u1edd h\u1ec7 th\u1ed1ng x\u1eed l\xfd.");
                break;

               case 31:
                App_1.default.instance.alertDialog.showMsg("Th\u1ebb \u0111\xe3 \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng.");
                break;

               case 32:
                App_1.default.instance.alertDialog.showMsg("Th\u1ebb \u0111\xe3 b\u1ecb kh\xf3a.");
                break;

               case 33:
                App_1.default.instance.alertDialog.showMsg("Th\u1ebb ch\u01b0a \u0111\u01b0\u1ee3c k\xedch ho\u1ea1t.");
                break;

               case 34:
                App_1.default.instance.alertDialog.showMsg("Th\u1ebb \u0111\xe3 h\u1ebft h\u1ea1n s\u1eed d\u1ee5ng.");
                break;

               case 35:
                App_1.default.instance.alertDialog.showMsg("M\xe3 th\u1ebb kh\xf4ng \u0111\xfang.");
                break;

               case 36:
                App_1.default.instance.alertDialog.showMsg("S\u1ed1 serial kh\xf4ng \u0111\xfang.");
                break;

               case 8:
                App_1.default.instance.alertDialog.showMsg("T\xe0i kho\u1ea3n \u0111\xe3 b\u1ecb kh\xf3a n\u1ea1p th\u1ebb do n\u1ea1p sai qu\xe1 nhi\u1ec1u l\u1ea7n! Th\u1eddi gian kh\xf3a n\u1ea1p th\u1ebb c\xf2n l\u1ea1i: " + this.longToTime(res.timeFail));
                break;

               default:
                App_1.default.instance.alertDialog.showMsg("L\u1ed7i " + res.error + ". Kh\xf4ng x\xe1c \u0111\u1ecbnh.");
              }
              break;
            }

           case Lobby_Cmd_1.default.Code.CHECK_NICKNAME_TRANSFER:
            {
              App_1.default.instance.showLoading(false);
              let res = new Lobby_Cmd_1.default.ResCheckNicknameTransfer(data);
              if (0 == res.error) {
                this.tabTransfer.edbNickname.string = "";
                App_1.default.instance.alertDialog.showMsg("T\xe0i kho\u1ea3n kh\xf4ng t\u1ed3n t\u1ea1i.");
                break;
              }
              this.tabTransfer.lblDaiLy.node.active = 1 == res.type || 2 == res.type;
              this.tabTransfer.lblFee.string = res.fee + "%";
              this.tabTransfer.ratioTransfer = (100 - res.fee) / 100;
              break;
            }

           case Lobby_Cmd_1.default.Code.TRANSFER_COIN:
            {
              App_1.default.instance.showLoading(false);
              let res = new Lobby_Cmd_1.default.ResTransferCoin(data);
              cc.log(res);
              switch (res.error) {
               case 0:
                Configs_1.default.Login.Coin = res.moneyUse;
                BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN);
                App_1.default.instance.alertDialog.showMsg("Giao d\u1ecbch chuy\u1ec3n kho\u1ea3n th\xe0nh c\xf4ng!");
                SPUtils_1.default.setNicknameTransfer(this.tabTransfer.edbNickname.string);
                break;

               case 2:
                App_1.default.instance.alertDialog.showMsg("S\u1ed1 ti\u1ec1n t\u1ed1i thi\u1ec3u l\xe0 10.000.");
                break;

               case 3:
                App_1.default.instance.actiontDialog.showMsgWithAction("Ch\u1ee9c n\u0103ng ch\u1ec9 d\xe0nh cho nh\u1eefng t\xe0i kho\u1ea3n \u0111\u0103ng k\xfd b\u1ea3o m\u1eadt.", "K\xcdCH HO\u1ea0T NGAY", () => {
                  App_1.default.instance.openTelegram();
                });
                break;

               case 4:
                App_1.default.instance.alertDialog.showMsg("S\u1ed1 d\u01b0 kh\xf4ng \u0111\u1ee7.");
                break;

               case 5:
                App_1.default.instance.alertDialog.showMsg("T\xe0i kho\u1ea3n b\u1ecb c\u1ea5m chuy\u1ec3n ti\u1ec1n.");
                break;

               case 6:
                App_1.default.instance.alertDialog.showMsg("Nickname nh\u1eadn kh\xf4ng t\u1ed3n t\u1ea1i.");
                break;

               case 10:
                App_1.default.instance.alertDialog.showMsg("Ch\u1ee9c n\u0103ng b\u1ea3o m\u1eadt s\u1ebd t\u1ef1 \u0111\u1ed9ng k\xedch ho\u1ea1t sau 24h k\u1ec3 t\u1eeb th\u1eddi \u0111i\u1ec3m \u0111\u0103ng k\xfd th\xe0nh c\xf4ng!");
                break;

               case 11:
                App_1.default.instance.alertDialog.showMsg("B\u1ea1n ch\u1ec9 \u0111\u01b0\u1ee3c chuy\u1ec3n cho \u0110\u1ea1i l\xfd t\u1ed5ng trong kho\u1ea3ng ti\u1ec1n quy \u0111\u1ecbnh!");
                break;

               case 22:
                let msg = res.desc || res.error.toString();
                res.actions.length > 0 ? App_1.default.instance.actiontDialog.showMsgWithAction(msg, Constants_1.UserActions.toName(res.actions[0]).toUpperCase(), () => {
                  App_1.default.instance.navigateByAction(res.actions[0]);
                }) : App_1.default.instance.alertDialog.showMsg(msg);
              }
              this.tabTransfer.reset();
              break;
            }

           case Lobby_Cmd_1.default.Code.GET_OTP:
            {
              if (!this.node.active) return;
              App_1.default.instance.showLoading(false);
              let res = new Lobby_Cmd_1.default.ResGetOTP(data);
              0 == res.error ? App_1.default.instance.alertDialog.showMsg("M\xe3 OTP \u0111\xe3 \u0111\u01b0\u1ee3c g\u1eedi \u0111i!") : 30 == res.error ? App_1.default.instance.alertDialog.showMsg("M\u1ed7i thao t\xe1c l\u1ea5y SMS OTP ph\u1ea3i c\xe1ch nhau \xedt nh\u1ea5t 5 ph\xfat!") : App_1.default.instance.alertDialog.showMsg("Thao t\xe1c kh\xf4ng th\xe0nh c\xf4ng vui l\xf2ng th\u1eed l\u1ea1i sau!");
              break;
            }

           case Lobby_Cmd_1.default.Code.SEND_OTP:
            {
              let res = new Lobby_Cmd_1.default.ResSendOTP(data);
              if (0 != res.error) {
                App_1.default.instance.showLoading(false);
                switch (res.error) {
                 case 1:
                 case 2:
                  App_1.default.instance.alertDialog.showMsg("Giao d\u1ecbch th\u1ea5t b\u1ea1i!");
                  break;

                 case 3:
                  App_1.default.instance.alertDialog.showMsg("M\xe3 x\xe1c th\u1ef1c kh\xf4ng ch\xednh x\xe1c, vui l\xf2ng th\u1eed l\u1ea1i!");
                  break;

                 case 4:
                  App_1.default.instance.alertDialog.showMsg("M\xe3 OTP \u0111\xe3 h\u1ebft h\u1ea1n!");
                  break;

                 default:
                  App_1.default.instance.alertDialog.showMsg("L\u1ed7i " + res.error + ". Kh\xf4ng x\xe1c \u0111\u1ecbnh.");
                }
                return;
              }
              App_1.default.instance.showLoading(true);
              break;
            }

           case Lobby_Cmd_1.default.Code.RESULT_TRANSFER_COIN:
            {
              if (!this.node.active) return;
              App_1.default.instance.showLoading(false);
              let res = new Lobby_Cmd_1.default.ResResultTransferCoin(data);
              switch (res.error) {
               case 0:
                Configs_1.default.Login.Coin = res.currentMoney;
                BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN);
                App_1.default.instance.alertDialog.showMsg("Giao d\u1ecbch chuy\u1ec3n kho\u1ea3n th\xe0nh c\xf4ng!");
                break;

               default:
                App_1.default.instance.alertDialog.showMsg("L\u1ed7i " + res.error + ". vui l\xf2ng th\u1eed l\u1ea1i sau.");
              }
              this.tabTransfer.reset();
              break;
            }

           case Lobby_Cmd_1.default.Code.INSERT_GIFTCODE:
            {
              App_1.default.instance.showLoading(false);
              let res = new Lobby_Cmd_1.default.ResInsertGiftcode(data);
              switch (res.error) {
               case 0:
                App_1.default.instance.alertDialog.showMsg("M\xe3 Giftcode kh\xf4ng ch\xednh x\xe1c. Vui l\xf2ng ki\u1ec3m tra l\u1ea1i!");
                break;

               case 1:
                App_1.default.instance.alertDialog.showMsg("M\xe3 Giftcode \u0111\xe3 \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng.");
                break;

               case 2:
                Configs_1.default.Login.Coin = res.currentMoneyVin;
                BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN);
                App_1.default.instance.alertDialog.showMsg("Nh\u1eadn th\u01b0\u1edfng th\xe0nh c\xf4ng.");
                break;

               case 3:
                App_1.default.instance.actiontDialog.showMsgWithAction("\u0110\u1ec3 nh\u1eadn giftcode vui l\xf2ng k\xedch ho\u1ea1t b\u1ea3o m\u1eadt.", "K\xcdCH HO\u1ea0T NGAY", () => {
                  App_1.default.instance.openTelegram();
                });
                break;

               case 4:
               case 5:
               case 6:
                App_1.default.instance.alertDialog.showMsg("Giftcode \u0111\xe3 nh\u1eadp kh\xf4ng h\u1ee3p l\u1ec7.");
              }
              break;
            }
          }
        }, this);
        this.tabTransfer.start();
      }
      onTabChanged(idx = -1) {
        idx > -1 && (this.tabSelectedIdx = idx);
        for (let i = 0; i < this.tabContents.childrenCount; i++) this.tabContents.children[i].active = i == this.tabSelectedIdx;
        switch (this.tabSelectedIdx) {
         case 0:
          this.tabNapThe.reset();
          break;

         case 1:
          this.tabTransfer.reset();
          break;

         case 2:
          !this.shipperData || this.shipperData.is_success && 0 !== this.shipperData.accounts.length || App_1.default.instance.alertDialog.showMsg("N\u1ea1p Momo \u0111ang t\u1ea1m kh\xf3a.");
          break;

         case 3:
          !this.bankerData || this.bankerData.is_success && 0 !== this.bankerData.accounts.length || App_1.default.instance.alertDialog.showMsg("N\u1ea1p ng\xe2n h\xe0ng \u0111ang t\u1ea1m kh\xf3a.");
          break;

         case 4:
          this.tabGiftcode.reset();
          break;

         case 5:
          this.tabBitCoin.start(this);
        }
      }
      longToTime(l) {
        return l / 60 + " gi\u1edd " + l % 60 + " ph\xfat";
      }
      static createAndShow(parent, callback = null, index = 3) {
        if (!this.initing) if (null == this.instance || null == this.instance.node) {
          this.initing = true;
          App_1.default.instance.loadPrefab("Lobby/res/prefabs/popups/PopupShop", (err, prefab) => {
            this.initing = false;
            if (null != err) {
              App_1.default.instance.alertDialog.showMsg(err);
              return;
            }
            let go = cc.instantiate(prefab);
            go.parent = parent;
            this.instance = go.getComponent(PopupShop_1);
            this.instance.node.zIndex = 1e3;
            this.instance.tabSelectedIdx = index;
            this.instance.show();
            callback && callback();
          });
        } else {
          this.instance.node.zIndex = 1e3;
          this.instance.tabSelectedIdx = index;
          this.instance.show();
          callback && callback();
        }
      }
      static createAndShowWithGiftcode(parent, giftcode = null) {
        if (!this.initing) if (null == this.instance || null == this.instance.node) {
          this.initing = true;
          App_1.default.instance.loadPrefab("Lobby/res/prefabs/popups/PopupShop", (err, prefab) => {
            this.initing = false;
            if (null != err) {
              App_1.default.instance.alertDialog.showMsg(err);
              return;
            }
            let go = cc.instantiate(prefab);
            go.parent = parent;
            this.instance = go.getComponent(PopupShop_1);
            this.instance.node.zIndex = 1e3;
            this.instance.show();
            this.instance.onTabChanged(4);
            this.instance.tabGiftcode.setGiftCode(giftcode);
          });
        } else {
          this.instance.node.zIndex = 1e3;
          this.instance.show();
          this.instance.onTabChanged(4);
          this.instance.tabGiftcode.setGiftCode(giftcode);
        }
      }
      show() {
        super.show();
        this.tabs.toggleItems[this.tabSelectedIdx].isChecked = true;
        this.onTabChanged();
        this.getCashInCfg();
        this.getListShipper();
        this.getListBanker();
      }
      dismiss() {
        this.shipperData = null;
        this.bankerData = null;
        super.dismiss();
      }
      static createAndShowWithTransfer(parent, nickname = null) {
        if (!this.initing) if (null == this.instance || null == this.instance.node) {
          this.initing = true;
          App_1.default.instance.loadPrefab("Lobby/res/prefabs/popups/PopupShop", (err, prefab) => {
            this.initing = false;
            if (null != err) {
              App_1.default.instance.alertDialog.showMsg(err);
              return;
            }
            let go = cc.instantiate(prefab);
            go.parent = parent;
            this.instance = go.getComponent(PopupShop_1);
            this.instance.node.zIndex = 1e3;
            this.instance.show();
            this.instance.onTabChanged(1);
            if (null != nickname) {
              this.instance.tabTransfer.edbNickname.string = nickname;
              App_1.default.instance.showLoading(true);
              MiniGameNetworkClient_1.default.getInstance().send(new Lobby_Cmd_1.default.ReqCheckNicknameTransfer(nickname));
            }
          });
        } else {
          this.instance.node.zIndex = 1e3;
          this.instance.show();
          this.instance.onTabChanged(1);
          if (null != nickname) {
            this.instance.tabTransfer.edbNickname.string = nickname;
            App_1.default.instance.showLoading(true);
            MiniGameNetworkClient_1.default.getInstance().send(new Lobby_Cmd_1.default.ReqCheckNicknameTransfer(nickname));
          }
        }
      }
      actSubmitNapThe() {
        this.tabNapThe.submit();
      }
      actContinueTransfer() {
        this.tabTransfer.continue();
      }
      actGetOTP() {
        App_1.default.instance.showLoading(true);
        Http_1.default.get(Configs_1.default.App.API, {
          c: 16,
          nn: Configs_1.default.Login.Nickname
        }, (err, res) => {
          App_1.default.instance.showLoading(false);
          if (err) {
            App_1.default.instance.alertDialog.showMsg("L\u1ea5y OTP l\u1ed7i.");
            ErrorLogger_1.ErrorLogger.sendLogError("Http request error", "Get OTP", JSON.stringify(err));
            return;
          }
          cc.log(res);
        });
      }
      actSubmitTransfer() {
        let otp = this.tabTransfer.edbOTP.string.trim();
        if (0 == otp.length) {
          App_1.default.instance.alertDialog.showMsg("M\xe3 x\xe1c th\u1ef1c kh\xf4ng \u0111\u01b0\u1ee3c b\u1ecf tr\u1ed1ng.");
          return;
        }
        App_1.default.instance.showLoading(true);
        let nickname = this.tabTransfer.edbNickname.string.trim();
        let coin = Utils_1.default.stringToInt(this.tabTransfer.edbCoinTransfer.string);
        let note = this.tabTransfer.edbNote.string.trim();
        MiniGameNetworkClient_1.default.getInstance().send(new Lobby_Cmd_1.default.ReqTransferCoin(nickname, coin, note, otp));
      }
      actSubmitNapMomo() {}
      actSubmitNapNganHang() {
        this.tabBank.submit();
      }
      actFillCardData(data) {
        this.tabNapThe.fillCard(data);
      }
      copySTK() {
        this.tabBank.copySTK();
      }
      copyTTK() {
        this.tabBank.copyTTK();
      }
      copyContent() {
        this.tabBank.copyContent();
      }
      onClickShowHideHelpBank(event, data) {
        this.tabBank.onClickShowHideHelpBank(event, data);
      }
      onClickShowHideHelpMomo(event, data) {
        this.tabMomo.onClickShowHideHelpMomo(event, data);
      }
      getCashInCfg() {
        App_1.default.instance.showLoading(true);
        var params = {
          c: 6006
        };
        Http_1.default.get(Configs_1.default.App.API, params, (err, res) => {
          App_1.default.instance.showLoading(false);
          if (null != err) {
            App_1.default.instance.alertDialog.showMsg("Thao t\xe1c kh\xf4ng th\xe0nh c\xf4ng, vui l\xf2ng th\u1eed l\u1ea1i sau.");
            ErrorLogger_1.ErrorLogger.sendLogError("Http request error", "Cashin config", JSON.stringify(err));
            return;
          }
          cc.log(res);
          this.onCashInCfgDone(res);
        });
      }
      onCashInCfgDone(res) {
        this.rechargeByProvider = new Map();
        res.forEach(reward => {
          reward.provider = this.getProvider(reward.provider);
          if (void 0 === this.rechargeByProvider.get(reward.provider)) this.rechargeByProvider.set(reward.provider, {
            type: reward.type,
            items: [ reward ]
          }); else {
            var currRewards = this.rechargeByProvider.get(reward.provider).items;
            currRewards.push(reward);
          }
        });
        this.tabNapThe.setCardData(this.rechargeByProvider, res);
        this.tabMomo.setWalletData(this.rechargeByProvider);
        this.tabBank.setBankRate(this.rechargeByProvider);
      }
      changeViDienTu() {
        this.tabMomo.showWalletPanel();
      }
      onChangeViDienTu(event, eventData) {
        this.tabMomo.onChangeViDienTu(parseInt(eventData));
      }
      getProvider(provider) {
        var prvd = "";
        switch (provider) {
         case "MOBI":
         case "MOBIFONE":
         case "VMS":
          prvd = "VMS";
          break;

         case "VINA":
         case "VINAPHONE":
         case "VNP":
          prvd = "VNP";
          break;

         case "VT":
         case "VTT":
         case "VTE":
         case "VIETTEL":
          prvd = "VTT";
          break;

         default:
          prvd = provider.toUpperCase();
        }
        return prvd;
      }
      getListShipper() {
        App_1.default.instance.showLoading(true);
        var params = {
          c: 6004,
          un: Configs_1.default.Login.Username
        };
        Http_1.default.get(Configs_1.default.App.API, params, (err, res) => {
          App_1.default.instance.showLoading(false);
          if (null != err) {
            ErrorLogger_1.ErrorLogger.sendLogError("Http request error", "Get list shipper cashin", JSON.stringify(err));
            return;
          }
          cc.log(res);
          this.shipperData = res;
          if (!res.is_success) {
            ErrorLogger_1.ErrorLogger.sendLogError("Error", "Get list shipper cashin", JSON.stringify(res));
            !this.bankerData || this.bankerData.is_success && this.bankerData.accounts.length > 0 ? this.tabs.toggleItems[3].getComponent(cc.Toggle).check() : App_1.default.instance.alertDialog.showMsg("N\u1ea1p Momo \u0111ang t\u1ea1m kh\xf3a.");
            return;
          }
          this.tabMomo.setListShipper(res);
        });
      }
      getListBanker() {
        App_1.default.instance.showLoading(true);
        var params = {
          c: 6005,
          un: Configs_1.default.Login.Username
        };
        Http_1.default.get(Configs_1.default.App.API, params, (err, res) => {
          App_1.default.instance.showLoading(false);
          if (null != err) {
            ErrorLogger_1.ErrorLogger.sendLogError("Http request error", "Get list banker cashin", JSON.stringify(err));
            return;
          }
          cc.log(res);
          this.bankerData = res;
          if (!res.is_success) {
            ErrorLogger_1.ErrorLogger.sendLogError("Error", "Get list banker cashin", JSON.stringify(res));
            !this.shipperData || this.shipperData.is_success && this.shipperData.accounts.length > 0 ? this.tabs.toggleItems[2].getComponent(cc.Toggle).check() : App_1.default.instance.alertDialog.showMsg("N\u1ea1p ng\xe2n h\xe0ng \u0111ang t\u1ea1m kh\xf3a.");
            return;
          }
          this.tabBank.setListBank(res);
        });
      }
      actSubmitGiftcode() {
        this.tabGiftcode.submit();
      }
    };
    PopupShop.instance = null;
    PopupShop.initing = false;
    __decorate([ property(cc.ToggleContainer) ], PopupShop.prototype, "tabs", void 0);
    __decorate([ property(cc.Node) ], PopupShop.prototype, "tabContents", void 0);
    __decorate([ property(TabNapThe) ], PopupShop.prototype, "tabNapThe", void 0);
    __decorate([ property(TabTransfer) ], PopupShop.prototype, "tabTransfer", void 0);
    __decorate([ property(TabBitCoin) ], PopupShop.prototype, "tabBitCoin", void 0);
    __decorate([ property(TabMomo) ], PopupShop.prototype, "tabMomo", void 0);
    __decorate([ property(TabBank) ], PopupShop.prototype, "tabBank", void 0);
    __decorate([ property(TabGiftcode) ], PopupShop.prototype, "tabGiftcode", void 0);
    __decorate([ property([ cc.Label ]) ], PopupShop.prototype, "lblContainsBotOTPs", void 0);
    PopupShop = PopupShop_1 = __decorate([ ccclass ], PopupShop);
    exports.default = PopupShop;
    cc._RF.pop();
  }, {
    "../../Game/src/common/App": "App",
    "../../Game/src/common/BroadcastReceiver": "BroadcastReceiver",
    "../../Game/src/common/Configs": "Configs",
    "../../Game/src/common/Constants": "Constants",
    "../../Game/src/common/Dialog": "Dialog",
    "../../Game/src/common/Dropdown": "Dropdown",
    "../../Game/src/common/ErrorLogger": "ErrorLogger",
    "../../Game/src/common/Http": "Http",
    "../../Game/src/common/SPUtils": "SPUtils",
    "../../Game/src/common/Utils": "Utils",
    "../../Game/src/networks/MiniGameNetworkClient": "MiniGameNetworkClient",
    "../../Game/src/networks/Network.InPacket": "Network.InPacket",
    "../../Game/src/networks/ShootFishNetworkClient": "ShootFishNetworkClient",
    "./Lobby.Cmd": "Lobby.Cmd",
    "./Lobby.DropdownBank": "Lobby.DropdownBank",
    "./Lobby.DropdownTelco": "Lobby.DropdownTelco"
  } ],
  "Lobby.PopupTransaction": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4b73fN7osxHRJLHaaKoYUQR", "Lobby.PopupTransaction");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var PopupTransaction_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Dialog_1 = require("../../Game/src/common/Dialog");
    const App_1 = require("../../Game/src/common/App");
    const Http_1 = require("../../Game/src/common/Http");
    const Configs_1 = require("../../Game/src/common/Configs");
    const Utils_1 = require("../../Game/src/common/Utils");
    const {ccclass: ccclass, property: property} = cc._decorator;
    var TransactionStatus;
    (function(TransactionStatus) {
      TransactionStatus[TransactionStatus["GAME_PENDING"] = 0] = "GAME_PENDING";
      TransactionStatus[TransactionStatus["SUCCESS"] = 2] = "SUCCESS";
      TransactionStatus[TransactionStatus["REJECT"] = 3] = "REJECT";
      TransactionStatus[TransactionStatus["ERROR"] = 4] = "ERROR";
      TransactionStatus[TransactionStatus["GATE_PENDING"] = 5] = "GATE_PENDING";
    })(TransactionStatus || (TransactionStatus = {}));
    var TransactionName;
    (function(TransactionName) {
      TransactionName["CashOutRequestByCard"] = "\u0110\u1ed5i th\u1ebb";
      TransactionName["CashOutByCard"] = "\u0110\u1ed5i th\u1ebb";
      TransactionName["CashOutRequestByBank"] = "R\xfat bank";
      TransactionName["CashOutByBank"] = "R\xfat bank";
      TransactionName["TransferMoney"] = "Chuy\u1ec3n kho\u1ea3n";
      TransactionName["CashOutByTopUp"] = "Top Up";
      TransactionName["Admin"] = "Admin";
      TransactionName["NapXu"] = "N\u1ea1p Xu";
      TransactionName["ChargeSMS"] = "Charge SMS";
      TransactionName["GcAgent"] = "GcAgent";
      TransactionName["GcAgentExport"] = "GcAgentExport";
      TransactionName["CashOutRequestByMomo"] = "R\xfat Momo";
      TransactionName["CashOutByMomo"] = "R\xfat Momo";
      TransactionName["CashOutRequestByCoin"] = "Coin";
      TransactionName["CashOutByCoin"] = "Coin";
    })(TransactionName || (TransactionName = {}));
    let PopupTransaction = PopupTransaction_1 = class PopupTransaction extends Dialog_1.default {
      constructor() {
        super(...arguments);
        this.tabs = null;
        this.lblPage = null;
        this.itemTemplate = null;
        this.page = 1;
        this.maxPage = 1;
        this.items = new Array();
        this.tabSelectedIdx = 0;
        this.cashoutConfig = null;
      }
      start() {
        for (let i = 0; i < this.tabs.toggleItems.length; i++) this.tabs.toggleItems[i].node.on("toggle", () => {
          this.tabSelectedIdx = i;
          this.updateTabsTitleColor();
          this.page = 1;
          this.loadData();
        });
        this.getCashOutCfg();
      }
      dismiss() {
        super.dismiss();
        for (let i = 0; i < this.items.length; i++) this.items[i].active = false;
      }
      _onShowed() {
        super._onShowed();
        this.page = 1;
        this.maxPage = 1;
        this.lblPage.string = this.page + "/" + this.maxPage;
        this.loadData();
      }
      static createAndShow(parent) {
        if (!this.initing) if (null == this.instance || null == this.instance.node) {
          this.initing = true;
          App_1.default.instance.loadPrefab("Lobby/res/prefabs/popups/PopupTransaction", (err, prefab) => {
            this.initing = false;
            if (null != err) {
              App_1.default.instance.alertDialog.showMsg(err);
              return;
            }
            let go = cc.instantiate(prefab);
            go.parent = parent;
            this.instance = go.getComponent(PopupTransaction_1);
            this.instance.node.zIndex = 1e3;
            this.instance.show();
          });
        } else {
          this.instance.node.zIndex = 1e3;
          this.instance.show();
        }
      }
      show() {
        super.show();
        this.tabSelectedIdx = 0;
        this.tabs.toggleItems[this.tabSelectedIdx].isChecked = true;
        for (let i = 0; i < this.items.length; i++) this.items[i].active = false;
        null != this.itemTemplate && (this.itemTemplate.active = false);
      }
      actNextPage() {
        if (this.page < this.maxPage) {
          this.page++;
          this.lblPage.string = this.page + "/" + this.maxPage;
          this.loadData();
        }
      }
      actPrevPage() {
        if (this.page > 1) {
          this.page--;
          this.lblPage.string = this.page + "/" + this.maxPage;
          this.loadData();
        }
      }
      updateTabsTitleColor() {
        for (let j = 0; j < this.tabs.toggleItems.length; j++) this.tabs.toggleItems[j].node.getComponentInChildren(cc.Label).node.opacity = j == this.tabSelectedIdx ? 255 : 123;
      }
      loadData() {
        App_1.default.instance.showLoading(true);
        let params = null;
        switch (this.tabSelectedIdx) {
         case 0:
          params = {
            c: 302,
            nn: Configs_1.default.Login.Nickname,
            mt: Configs_1.default.App.MONEY_TYPE,
            p: this.page
          };
          break;

         case 1:
          params = {
            c: 302,
            nn: Configs_1.default.Login.Nickname,
            mt: 3,
            p: this.page
          };
          break;

         case 2:
          params = {
            c: 302,
            nn: Configs_1.default.Login.Nickname,
            mt: 5,
            p: this.page
          };
        }
        Http_1.default.get(Configs_1.default.App.API, params, (err, res) => {
          App_1.default.instance.showLoading(false);
          if (null != err) return;
          cc.log(res);
          if (res["success"]) {
            if (0 == this.items.length) {
              for (var i = 0; i < 10; i++) {
                let item = cc.instantiate(this.itemTemplate);
                item.parent = this.itemTemplate.parent;
                this.items.push(item);
              }
              this.itemTemplate.destroy();
              this.itemTemplate = null;
            }
            this.maxPage = res["totalPages"];
            this.lblPage.string = this.page + "/" + this.maxPage;
            for (let i = 0; i < this.items.length; i++) {
              let item = this.items[i];
              if (i < res["transactions"].length) {
                let itemData = res["transactions"][i];
                item.getChildByName("bg").opacity = i % 2 == 0 ? 10 : 0;
                item.getChildByName("Trans").getComponent(cc.Label).string = itemData["transId"];
                item.getChildByName("Time").getComponent(cc.Label).string = itemData["transactionTime"];
                item.getChildByName("Coin").getComponent(cc.Label).string = (itemData["moneyExchange"] > 0 ? "+" : "") + Utils_1.default.formatNumber(itemData["moneyExchange"]);
                item.getChildByName("Balance").getComponent(cc.Label).string = Utils_1.default.formatNumber(itemData["currentMoney"]);
                let btnDesc = item.getChildByName("DescBtn");
                let lbService = item.getChildByName("Service").getComponent(cc.Label);
                let lbStatus = item.getChildByName("Desc").getComponent(cc.Label);
                if (2 == this.tabSelectedIdx) {
                  btnDesc.active = false;
                  lbStatus.node.active = true;
                  let additionalData = JSON.parse(itemData.additionalData);
                  let status = "";
                  let service = TransactionName[itemData["actionName"]];
                  if (additionalData) {
                    let statusCode = additionalData.status;
                    switch (statusCode) {
                     case TransactionStatus.SUCCESS:
                      status = "Th\xe0nh c\xf4ng";
                      break;

                     case TransactionStatus.REJECT:
                      status = "T\u1eeb Ch\u1ed1i";
                      break;

                     case TransactionStatus.ERROR:
                      status = "L\u1ed7i";
                      break;

                     case TransactionStatus.GAME_PENDING:
                     case TransactionStatus.GATE_PENDING:
                      status = "\u0110ang ch\u1edd ph\xea duy\u1ec7t";
                      break;

                     default:
                      status = statusCode + "";
                    }
                    if (("CashOutRequestByCard" == itemData["actionName"] || "CashOutByCard" == itemData["actionName"]) && this.cashoutConfig) {
                      let itemId = additionalData.itemId;
                      let provider = this.cashoutConfig.find(a => a.id == itemId).provider;
                      switch (provider) {
                       case "VTT":
                        service += " Viettel";
                        break;

                       case "VINA":
                        service += " Vinaphone";
                        break;

                       case "VMS":
                        service += " Mobifone";
                      }
                    }
                  } else {
                    let desc = itemData["description"].toLowerCase();
                    desc.includes("viettel") ? service += " Viettel" : desc.includes("vinaphone") ? service += " Vinaphone" : desc.includes("mobifone") && (service += " Mobifone");
                  }
                  lbStatus.string = status;
                  lbService.string = service;
                } else {
                  btnDesc.active = true;
                  lbStatus.node.active = false;
                  lbService.string = this.mappingGameName(itemData["serviceName"]);
                  btnDesc.on(cc.Node.EventType.TOUCH_START, e => {
                    App_1.default.instance.alertDialog.showMsg(this.mappingGameName(itemData["description"]));
                  });
                }
                item.active = true;
              } else item.active = false;
            }
          }
        });
      }
      getCashOutCfg() {
        var params = {
          c: 6002
        };
        Http_1.default.get(Configs_1.default.App.API, params, (err, res) => {
          if (null != err) {
            cc.log("L\u1ea5y c\u1ea5u h\xecnh cashout l\u1ed7i, vui l\xf2ng th\u1eed l\u1ea1i sau.");
            return;
          }
          this.cashoutConfig = res;
        });
      }
      mappingGameName(name) {
        var mapObj = {
          "kho b\xe1u": "Sonic",
          "kho bau": "Sonic",
          "n\u1eef \u0111i\u1ec7p vi\xean": "Super Sayan",
          "nu diep vien": "Super Sayan",
          "si\xeau anh h\xf9ng": "Pirate King",
          "sieu anh hung": "Pirate King",
          "v\u01b0\u01a1ng qu\u1ed1c vin": "B.Bee",
          "vuong quoc vin": "B.Bee",
          "th\u1ed5 d\xe2n": "B.Bee",
          "tho dan": "B.Bee",
          "kim c\u01b0\u01a1ng": "Mario",
          "kim cuong": "Mario",
          pokego: "Mario"
        };
        name = name.toLowerCase().replace(/kho b\xe1u|kho bau|n\u1eef \u0111i\u1ec7p vi\xean|nu diep vien|si\xeau anh h\xf9ng|sieu anh hung|v\u01b0\u01a1ng qu\u1ed1c vin|vuong quoc vin|th\u1ed5 d\xe2n|tho dan|kim c\u01b0\u01a1ng|kim cuong|pokego/gi, function(matched) {
          return mapObj[matched];
        });
        return name.charAt(0).toUpperCase() + name.slice(1);
      }
    };
    PopupTransaction.instance = null;
    PopupTransaction.initing = false;
    __decorate([ property(cc.ToggleContainer) ], PopupTransaction.prototype, "tabs", void 0);
    __decorate([ property(cc.Label) ], PopupTransaction.prototype, "lblPage", void 0);
    __decorate([ property(cc.Node) ], PopupTransaction.prototype, "itemTemplate", void 0);
    PopupTransaction = PopupTransaction_1 = __decorate([ ccclass ], PopupTransaction);
    exports.default = PopupTransaction;
    cc._RF.pop();
  }, {
    "../../Game/src/common/App": "App",
    "../../Game/src/common/Configs": "Configs",
    "../../Game/src/common/Dialog": "Dialog",
    "../../Game/src/common/Http": "Http",
    "../../Game/src/common/Utils": "Utils"
  } ],
  "Lobby.PopupUpdateNickname": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "98fa6a8u0NFcqDx+oNqZYCw", "Lobby.PopupUpdateNickname");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Dialog_1 = require("../../Game/src/common/Dialog");
    const App_1 = require("../../Game/src/common/App");
    const Http_1 = require("../../Game/src/common/Http");
    const Configs_1 = require("../../Game/src/common/Configs");
    const BroadcastReceiver_1 = require("../../Game/src/common/BroadcastReceiver");
    const AuthorizationController_1 = require("./Authorization/AuthorizationController");
    const Utils_1 = require("../../Game/src/common/Utils");
    const {ccclass: ccclass, property: property} = cc._decorator;
    var Lobby;
    (function(Lobby) {
      var PopupUpdateNickname_1;
      let PopupUpdateNickname = PopupUpdateNickname_1 = class PopupUpdateNickname extends Dialog_1.default {
        constructor() {
          super(...arguments);
          this.edbNickname = null;
          this.edbCaptcha = null;
          this.sprCaptcha = null;
          this.username = "";
          this.password = "";
          this.source = "";
          this.token = "";
          this.telegramAuthData = null;
          this.telegramWebAppAuthData = null;
          this.captchaId = "";
        }
        static createAndShow(parent, username, password, source = null, token = null, telegramAuthData = null, telegramWebAppAuthData = null) {
          if (!this.initing) if (null == this.instance || null == this.instance.node) {
            this.initing = true;
            App_1.default.instance.loadPrefab("Lobby/res/prefabs/popups/PopupUpdateNickname", (err, prefab) => {
              this.initing = false;
              if (null != err) {
                App_1.default.instance.alertDialog.showMsg(err);
                return;
              }
              let go = cc.instantiate(prefab);
              go.parent = parent;
              this.instance = go.getComponent(PopupUpdateNickname_1);
              this.instance.node.zIndex = 1001;
              this.instance.show2(username, password, source, token, telegramAuthData, telegramWebAppAuthData);
            });
          } else {
            this.instance.node.zIndex = 1001;
            this.instance.show2(username, password, source, token, telegramAuthData, telegramWebAppAuthData);
          }
        }
        show() {
          super.show();
          this.edbNickname.string = "";
        }
        show2(username, password, source = "", token = "", telegramAuthData = null, telegramWebAppAuthData = null) {
          this.show();
          this.username = username;
          this.password = password;
          this.source = source;
          this.token = token;
          this.telegramAuthData = telegramAuthData;
          this.telegramWebAppAuthData = telegramWebAppAuthData;
          this.edbCaptcha.string = "";
          if (source === AuthorizationController_1.LOGIN_SOURCE.PLAY_NOW) {
            this.actRefreshCaptcha();
            this.edbCaptcha.node.parent.active = true;
            this.edbCaptcha.node.parent.parent.getComponent(cc.Layout).spacingY = 30;
          } else {
            this.edbCaptcha.node.parent.active = false;
            this.edbCaptcha.node.parent.parent.getComponent(cc.Layout).spacingY = 50;
          }
        }
        actUpdate() {
          let nickname = this.edbNickname.string.trim();
          let captcha = this.edbCaptcha.string.trim();
          if (0 == nickname.length) {
            App_1.default.instance.alertDialog.showMsg("T\xean hi\u1ec3n th\u1ecb kh\xf4ng \u0111\u01b0\u1ee3c \u0111\u1ec3 tr\u1ed1ng.");
            return;
          }
          if (this.source === AuthorizationController_1.LOGIN_SOURCE.PLAY_NOW && 0 == captcha.length) {
            App_1.default.instance.alertDialog.showMsg("M\xe3 x\xe1c th\u1ef1c kh\xf4ng \u0111\u01b0\u1ee3c \u0111\u1ec3 tr\u1ed1ng.");
            return;
          }
          App_1.default.instance.showLoading(true);
          Http_1.default.post(Configs_1.default.App.API + "?c=5", {
            username: this.username,
            password: md5(this.password),
            nickname: nickname,
            s: this.source,
            socialAccessToken: this.token,
            telegramUser: this.telegramAuthData,
            telegramWebAppUser: this.telegramWebAppAuthData,
            captcha: captcha,
            captchaId: this.captchaId
          }, (err, res) => {
            cc.log(JSON.stringify(res));
            App_1.default.instance.showLoading(false);
            if (null != err) {
              App_1.default.instance.alertDialog.showMsg("X\u1ea3y ra l\u1ed7i, vui l\xf2ng th\u1eed l\u1ea1i sau!");
              return;
            }
            if (!res["success"]) {
              switch (parseInt(res["errorCode"])) {
               case 1001:
                App_1.default.instance.alertDialog.showMsg("M\u1ea5t k\u1ebft n\u1ed1i \u0111\u1ebfn Server!");
                break;

               case 1005:
                App_1.default.instance.alertDialog.showMsg("T\xe0i kho\u1ea3n kh\xf4ng t\u1ed3n t\u1ea1i.");
                break;

               case 1007:
                App_1.default.instance.alertDialog.showMsg("M\u1eadt kh\u1ea9u kh\xf4ng ch\xednh x\xe1c.");
                break;

               case 1109:
                App_1.default.instance.alertDialog.showMsg("T\xe0i kho\u1ea3n \u0111\xe3 b\u1ecb kh\xf3a.");
                break;

               case 106:
                App_1.default.instance.alertDialog.showMsg("T\xean hi\u1ec3n th\u1ecb kh\xf4ng h\u1ee3p l\u1ec7.");
                break;

               case 1010:
               case 1013:
                App_1.default.instance.alertDialog.showMsg("T\xean hi\u1ec3n th\u1ecb \u0111\xe3 t\u1ed3n t\u1ea1i.");
                break;

               case 1011:
                App_1.default.instance.alertDialog.showMsg("T\xean hi\u1ec3n th\u1ecb kh\xf4n \u0111\u01b0\u1ee3c tr\xf9ng v\u1edbi t\xean \u0111\u0103ng nh\u1eadp.");
                break;

               case 116:
                App_1.default.instance.alertDialog.showMsg("Kh\xf4ng ch\u1ecdn t\xean hi\u1ec3n th\u1ecb nh\u1ea1y c\u1ea3m.");
                break;

               case 1114:
                App_1.default.instance.alertDialog.showMsg("H\u1ec7 th\u1ed1ng \u0111ang b\u1ea3o tr\xec. Vui l\xf2ng quay tr\u1edf l\u1ea1i sau!");
                break;

               default:
                App_1.default.instance.alertDialog.showMsg("X\u1ea3y ra l\u1ed7i, vui l\xf2ng th\u1eed l\u1ea1i sau!");
              }
              this.actRefreshCaptcha();
              return;
            }
            this.dismiss();
            BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.UPDATE_NICKNAME_SUCCESS, {
              username: this.username,
              password: this.password,
              s: this.source,
              at: this.token
            });
            AuthorizationController_1.AuthorizationController.getInstance().onUpdateNicknameSuccess(this.username, this.password, this.source, this.token, this.telegramAuthData, this.telegramWebAppAuthData);
          });
        }
        actRefreshCaptcha() {
          Http_1.default.get(Configs_1.default.App.API, {
            c: 124,
            requireLogin: false
          }, (err, res) => {
            if (null != err) {
              App_1.default.instance.alertDialog.showMsg("X\u1ea3y ra l\u1ed7i, vui l\xf2ng th\u1eed l\u1ea1i sau!");
              return;
            }
            this.captchaId = res["id"];
            Utils_1.default.loadSpriteFrameFromBase64(res["img"], sprFrame => {
              this.sprCaptcha.spriteFrame = sprFrame;
            });
          });
        }
      };
      PopupUpdateNickname.instance = null;
      PopupUpdateNickname.initing = false;
      __decorate([ property(cc.EditBox) ], PopupUpdateNickname.prototype, "edbNickname", void 0);
      __decorate([ property(cc.EditBox) ], PopupUpdateNickname.prototype, "edbCaptcha", void 0);
      __decorate([ property(cc.Sprite) ], PopupUpdateNickname.prototype, "sprCaptcha", void 0);
      PopupUpdateNickname = PopupUpdateNickname_1 = __decorate([ ccclass ], PopupUpdateNickname);
      Lobby.PopupUpdateNickname = PopupUpdateNickname;
    })(Lobby || (Lobby = {}));
    exports.default = Lobby.PopupUpdateNickname;
    cc._RF.pop();
  }, {
    "../../Game/src/common/App": "App",
    "../../Game/src/common/BroadcastReceiver": "BroadcastReceiver",
    "../../Game/src/common/Configs": "Configs",
    "../../Game/src/common/Dialog": "Dialog",
    "../../Game/src/common/Http": "Http",
    "../../Game/src/common/Utils": "Utils",
    "./Authorization/AuthorizationController": "AuthorizationController"
  } ],
  "Lobby.PopupVippointRankUp": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7f4d7rbGZtMfKg7g4lI1Rz3", "Lobby.PopupVippointRankUp");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var PopupVippointRankUp_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const App_1 = require("../../../Game/src/common/App");
    const Common_AudioManager_1 = require("../../../Game/src/common/Common.AudioManager");
    const Dialog_1 = require("../../../Game/src/common/Dialog");
    const Lobby_PopupVippoint_1 = require("./Lobby.PopupVippoint");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let PopupVippointRankUp = PopupVippointRankUp_1 = class PopupVippointRankUp extends Dialog_1.default {
      constructor() {
        super(...arguments);
        this.rank = null;
        this.soundUpVip = null;
      }
      static createAndShow(parent, rankId) {
        if (!this.initing) if (null == this.instance || null == this.instance.node) {
          this.initing = true;
          App_1.default.instance.loadPrefab("Lobby/res/prefabs/popups/PopupVippointRankUp", (err, prefab) => {
            this.initing = false;
            if (null != err) {
              App_1.default.instance.alertDialog.showMsg(err);
              return;
            }
            let go = cc.instantiate(prefab);
            go.parent = parent;
            this.instance = go.getComponent(PopupVippointRankUp_1);
            this.instance.showWithRank(rankId);
          });
        } else this.instance.showWithRank(rankId);
      }
      showWithRank(rankId) {
        this.rank.setSkin("viip" + rankId);
        this.rank.setAnimation(0, "animation", true);
        Common_AudioManager_1.default.getInstance().playEffect(this.soundUpVip, .7);
        this.show();
      }
      actOpenVippoint() {
        this.dismiss();
        Lobby_PopupVippoint_1.default.createAndShow(App_1.default.instance.popups);
      }
    };
    PopupVippointRankUp.instance = null;
    PopupVippointRankUp.initing = false;
    __decorate([ property(sp.Skeleton) ], PopupVippointRankUp.prototype, "rank", void 0);
    __decorate([ property(cc.AudioClip) ], PopupVippointRankUp.prototype, "soundUpVip", void 0);
    PopupVippointRankUp = PopupVippointRankUp_1 = __decorate([ ccclass ], PopupVippointRankUp);
    exports.default = PopupVippointRankUp;
    cc._RF.pop();
  }, {
    "../../../Game/src/common/App": "App",
    "../../../Game/src/common/Common.AudioManager": "Common.AudioManager",
    "../../../Game/src/common/Dialog": "Dialog",
    "./Lobby.PopupVippoint": "Lobby.PopupVippoint"
  } ],
  "Lobby.PopupVippoint": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "82031JdYzNB+JzQwhozUdB7", "Lobby.PopupVippoint");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var PopupVippoint_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const App_1 = require("../../../Game/src/common/App");
    const Configs_1 = require("../../../Game/src/common/Configs");
    const Constants_1 = require("../../../Game/src/common/Constants");
    const Dialog_1 = require("../../../Game/src/common/Dialog");
    const ErrorLogger_1 = require("../../../Game/src/common/ErrorLogger");
    const Http_1 = require("../../../Game/src/common/Http");
    const Utils_1 = require("../../../Game/src/common/Utils");
    const AuthorizationResponseData_1 = require("../Authorization/AuthorizationResponseData");
    const Lobby_VippointItem_1 = require("./Lobby.VippointItem");
    const VippointDTO_1 = require("./VippointDTO");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let PopupVippoint = PopupVippoint_1 = class PopupVippoint extends Dialog_1.default {
      constructor() {
        super(...arguments);
        this.tabs = null;
        this.tabContents = null;
        this.progressVipPoint = null;
        this.arrowProgressVipPoint = null;
        this.lblCurrentVippoint = null;
        this.stepsProgressVipPoint = null;
        this.iconVipFrames = [];
        this.spriteVipPointCurrentRank = null;
        this.lblVipPointNameCurrentrank = null;
        this.lblVipPointCurrentRank = null;
        this.spriteVipPointNextRank = null;
        this.lblVipPointNameNextRank = null;
        this.lblVipPointNextRank = null;
        this.vippointListScroll = null;
        this.vippointItemTemplate = null;
        this.tabSelectedIdx = 0;
        this.userVippointRewards = [];
        this.tabHistorys = null;
        this.tabHistoryContents = null;
        this.scrollAddVippointHistory = null;
        this.addVippointHistoryItem = null;
        this.lbAddVippointPage = null;
        this.scrollBenefitHistory = null;
        this.benefitHistoryItem = null;
        this.lbbenefitPage = null;
        this.scrollTopvip = null;
        this.topvipItem = null;
        this.iconTopvipRanks = [];
        this.vipNames = null;
        this.scrollGuide = null;
        this.tabHistorySelectedIdx = 0;
        this.vippointHistoryPageSize = 10;
        this.addVippointHistoryPageIdx = 1;
        this.benefitHistoryPageIdx = 1;
      }
      static createAndShow(parent) {
        if (!this.initing) if (null == this.instance || null == this.instance.node) {
          this.initing = true;
          App_1.default.instance.loadPrefab("Lobby/res/prefabs/popups/PopupVippoint", (err, prefab) => {
            this.initing = false;
            if (null != err) {
              App_1.default.instance.alertDialog.showMsg(err);
              return;
            }
            let go = cc.instantiate(prefab);
            go.parent = parent;
            this.instance = go.getComponent(PopupVippoint_1);
            this.instance.show();
          });
        } else this.instance.show();
      }
      start() {
        super.start();
        for (let i = 0; i < this.tabs.toggleItems.length; i++) this.tabs.toggleItems[i].node.on("click", () => {
          this.tabSelectedIdx = i;
          this.onTabChanged();
        });
        for (let i = 0; i < this.tabHistorys.toggleItems.length; i++) this.tabHistorys.toggleItems[i].node.on("click", () => {
          this.tabHistorySelectedIdx = i;
          this.onTabHistoryChanged();
        });
      }
      onTabChanged() {
        for (let i = 0; i < this.tabContents.childrenCount; i++) this.tabContents.children[i].active = i == this.tabSelectedIdx;
        for (let j = 0; j < this.tabs.toggleItems.length; j++) this.tabs.toggleItems[j].node.getComponentInChildren(cc.Label).node.opacity = j == this.tabSelectedIdx ? 255 : 123;
        switch (this.tabSelectedIdx) {
         case 0:
          break;

         case 1:
          this.tabHistorySelectedIdx = 0;
          this.tabHistorys.toggleItems[this.tabHistorySelectedIdx].isChecked = true;
          this.onTabHistoryChanged();
          break;

         case 2:
          this.getTopvip();
        }
      }
      onTabHistoryChanged() {
        for (let i = 0; i < this.tabHistoryContents.childrenCount; i++) this.tabHistoryContents.children[i].active = i == this.tabHistorySelectedIdx;
        for (let j = 0; j < this.tabHistorys.toggleItems.length; j++) this.tabHistorys.toggleItems[j].node.getComponentInChildren(cc.Label).node.opacity = j == this.tabHistorySelectedIdx ? 255 : 123;
        switch (this.tabHistorySelectedIdx) {
         case 0:
          this.benefitHistoryPageIdx = 1;
          this.getBenefitHistory();
          break;

         case 1:
          this.addVippointHistoryPageIdx = 1;
          this.getAddVippointHistory(this.addVippointHistoryPageIdx);
        }
      }
      show() {
        super.show();
        this.userVippointRewards = null;
        this.getUserInfo();
        this.tabSelectedIdx = 0;
        this.tabs.toggleItems[this.tabSelectedIdx].isChecked = true;
        this.onTabChanged();
      }
      getUserInfo() {
        Http_1.default.get(Configs_1.default.App.API, {
          c: 6027
        }, (err, res) => {
          App_1.default.instance.showLoading(false);
          if (err) {
            App_1.default.instance.alertDialog.showMsg("L\u1ed7i!");
            return;
          }
          cc.log(res);
          const userInfo = new AuthorizationResponseData_1.UserInfoResponse(res);
          cc.log(userInfo);
          this.userVippointRewards = userInfo.userVippointRewards;
          Configs_1.default.Login.getVipPointInfo(() => {
            this.setVipPointInfo();
          });
        });
      }
      setVipPointInfo() {
        try {
          const currentVippointRank = Configs_1.default.Login.VipPoint.currentVippointRank;
          const nextVippointRankDetail = Configs_1.default.Login.VipPoint.vippointRankDetail[currentVippointRank + 1];
          this.spriteVipPointCurrentRank.spriteFrame = this.iconVipFrames[currentVippointRank];
          this.lblVipPointNameCurrentrank.string = Configs_1.default.Login.VipPoint.vippointRankDetail[currentVippointRank].name;
          this.lblVipPointCurrentRank.string = Utils_1.default.formatNumber(Configs_1.default.Login.VipPoint.vippointRankDetail[currentVippointRank].minVippoint);
          if (nextVippointRankDetail) {
            const currentVippointFill = (Configs_1.default.Login.VipPoint.vippoint - Configs_1.default.Login.VipPoint.vippointRankDetail[currentVippointRank].minVippoint) / (nextVippointRankDetail.minVippoint - Configs_1.default.Login.VipPoint.vippointRankDetail[currentVippointRank].minVippoint);
            this.progressVipPoint.getChildByName("bar").getComponent(cc.Sprite).fillRange = currentVippointFill;
            this.arrowProgressVipPoint.x = (currentVippointFill - .5) * this.progressVipPoint.width;
            this.lblCurrentVippoint.string = Utils_1.default.formatNumber(Configs_1.default.Login.VipPoint.vippoint);
            const vippointStep = (nextVippointRankDetail.minVippoint - Configs_1.default.Login.VipPoint.vippointRankDetail[currentVippointRank].minVippoint) / 5;
            this.stepsProgressVipPoint.children.forEach((step, i) => {
              step.getComponentInChildren(cc.Label).string = Utils_1.default.formatMoney(i * vippointStep + Configs_1.default.Login.VipPoint.vippointRankDetail[currentVippointRank].minVippoint);
            });
            this.spriteVipPointNextRank.spriteFrame = this.iconVipFrames[nextVippointRankDetail.id];
            this.lblVipPointNameNextRank.string = nextVippointRankDetail.name;
            this.lblVipPointNextRank.string = Utils_1.default.formatNumber(nextVippointRankDetail.minVippoint);
          } else {
            this.progressVipPoint.active = false;
            this.spriteVipPointNextRank.node.parent.active = false;
            this.spriteVipPointCurrentRank.node.parent.x = 0;
          }
          let benefitGuide = "";
          this.vippointListScroll.content.removeAllChildren();
          for (let i = 0; i < Configs_1.default.Login.VipPoint.vippointRankDetail.length; i++) {
            let vipItem = cc.instantiate(this.vippointItemTemplate);
            vipItem.parent = this.vippointListScroll.content;
            vipItem.x = 0;
            vipItem.active = true;
            vipItem.getComponent(Lobby_VippointItem_1.default).setVippointRankDetail(i, Configs_1.default.Login.VipPoint, this.userVippointRewards, this);
            let benefitValue = "";
            Configs_1.default.Login.VipPoint.vippointRankDetail[i].listVipBenefits.forEach((benefitName, index) => {
              const benefit = Configs_1.default.Login.VipPoint.benefitDetail.find(benefitDetail => benefitDetail.name === benefitName);
              if (benefit) {
                let value = benefit.award ? isNaN(parseInt(benefit.award)) ? benefit.award : Utils_1.default.formatNumber(parseInt(benefit.award)) : "";
                benefitValue += (benefitValue && index > 0 && value ? ", " : "") + value;
              }
            });
            benefitGuide += "+ " + Configs_1.default.Login.VipPoint.vippointRankDetail[i].name + ":  " + (benefitValue || "0") + "\n";
          }
          this.vippointListScroll.scrollToTop(0);
          this.vippointListScroll.scrollToOffset(cc.v2(0, (Configs_1.default.Login.VipPoint.vippointRankDetail.length - currentVippointRank - 4.1) * this.vippointItemTemplate.height), .5);
          const rate = Configs_1.default.Login.VipPoint.vippointEarnSourceConfigs.find(vippointEarn => vippointEarn.action === Constants_1.UserActions.ENUM.PLAY_GAME).rate;
          this.scrollGuide.content.getComponent(cc.Label).string = cc.js.formatStr("1. VIP l\xe0 g\xec? VIP l\xe0 ch\u01b0\u01a1ng tr\xecnh tri \xe2n th\u01b0\u1eddng xuy\xean d\xe0nh cho t\u1ea5t c\u1ea3 m\u1ecdi kh\xe1ch h\xe0ng \u0111\xe3 ch\u01a1i tr\xean c\u1ed5ng game WIN365\n\n2. Khi l\xean c\u1ea5p VIP t\xf4i s\u1ebd nh\u1eadn \u0111\u01b0\u1ee3c nh\u1eefng ph\u1ea7n qu\xe0 g\xec? B\u1ea1n s\u1ebd c\xf3 c\xe1c ph\u1ea7n qu\xe0 v\xe0 quy\u1ec1n l\u1ee3i nh\u01b0 sau:\n+ \u0110\u01b0\u1ee3c nh\u1eadn th\u01b0\u1edfng theo t\u1eebng c\u1ea5p VIP (m\u1ee5c 5).\n+ T\u0103ng gi\u1edbi h\u1ea1n chuy\u1ec3n ti\u1ec1n trong ng\xe0y.\n+ \u0110\u01b0\u1ee3c quy\u1ec1n \u01b0u ti\xean th\xf4ng b\xe1o v\u1ec1 c\xe1c ho\u1ea1t \u0111\u1ed9ng, s\u1ef1 ki\u1ec7n v\xe0 \u01b0u \u0111\xe3i trong game.\n\n3. L\xe0m sao \u0111\u1ec3 t\u0103ng c\u1ea5p VIP? M\u1ed7i c\u1ea5p vip y\xeau c\u1ea7u m\u1ed9t s\u1ed1 \u0111i\u1ec3m VIP th\u0103ng h\u1ea1ng v\xe0 gi\u1eef h\u1ea1ng ri\xeang theo c\u1ea5p VIP hi\u1ec7n t\u1ea1i c\u1ee7a b\u1ea1n. \u0110i\u1ec3m VIP n\xe0y \u0111\u01b0\u1ee3c t\u1ef1 \u0111\u1ed9ng t\xednh cho b\u1ea1n d\u1ef1a tr\xean t\u1ed5ng c\u01b0\u1ee3c khi ch\u01a1i game(t\u1ed5ng c\u01b0\u1ee3c kh\xf4ng bao g\u1ed3m tr\u1ea3 th\u01b0\u1edfng).\nV\xed d\u1ee5:\n+ B\u1ea1n c\u01b0\u1ee3c T\xe0i X\u1ec9u 100.000 v\xe0 th\u1eafng => t\u1ed5ng c\u01b0\u1ee3c = 100.000\n+ B\u1ea1n c\u01b0\u1ee3c T\xe0i X\u1ec9u 100.000 v\xe0 thua => t\u1ed5ng c\u01b0\u1ee3c = 100.000\nL\u01b0u \xfd: Kh\xf4ng \u0111\u01b0\u1ee3c t\u0103ng \u0111i\u1ec3m vip khi ch\u01a1i game b\xe0i.\n\n4. T\u1ec9 l\u1ec7 nh\u1eadn VIP l\xe0 %s:1\nV\xed d\u1ee5: B\u1ea1n c\u01b0\u1ee3c T\xe0i X\u1ec9u %s Xu b\u1ea1n nh\u1eadn \u0111\u01b0\u1ee3c 1 vippoint.\n\n5. Th\u01b0\u1edfng theo c\u1ea5p VIP:\n%s", rate, rate, benefitGuide);
        } catch (error) {
          ErrorLogger_1.ErrorLogger.sendLogError("Vippoint data", "Vippoint info", JSON.stringify(Configs_1.default.Login.VipPoint) + "\n" + JSON.stringify(error.stack));
        }
      }
      getAddVippointHistory(pageIdx) {
        Http_1.default.get(Configs_1.default.App.API, {
          c: 6028,
          page: pageIdx,
          recordPerPage: this.vippointHistoryPageSize
        }, (err, res) => {
          App_1.default.instance.showLoading(false);
          if (null != err) return;
          cc.log(res);
          if (!res["success"]) {
            App_1.default.instance.alertDialog.showMsg("L\u1ed7i k\u1ebft n\u1ed1i, vui l\xf2ng th\u1eed l\u1ea1i.");
            return;
          }
          const addVippointHistory = VippointDTO_1.AddVippointHistory.toAddVippointHistory(res);
          if (addVippointHistory.list.length > 0) {
            this.addVippointHistoryPageIdx = pageIdx;
            this.lbAddVippointPage.string = pageIdx.toString();
            this.scrollAddVippointHistory.content.removeAllChildren();
            addVippointHistory.list.forEach((history, i) => {
              let item = cc.instantiate(this.addVippointHistoryItem);
              item.getChildByName("Bg").active = i % 2 === 0;
              item.getChildByName("Time").getComponent(cc.Label).string = history.createTime;
              item.getChildByName("Point").getComponent(cc.Label).string = Utils_1.default.formatNumber(history.addVippoint);
              item.getChildByName("Desc").getComponent(cc.Label).string = history.logMoneyUserVin.serviceName + " " + history.logMoneyUserVin.description;
              item.active = true;
              item.parent = this.scrollAddVippointHistory.content;
            });
          } else 1 === pageIdx && this.scrollAddVippointHistory.content.removeAllChildren();
        });
      }
      actPreviousAddVippointHistoryPage() {
        if (1 === this.addVippointHistoryPageIdx) return;
        this.getAddVippointHistory(this.addVippointHistoryPageIdx - 1);
      }
      actNextAddVippointHistoryPage() {
        this.getAddVippointHistory(this.addVippointHistoryPageIdx + 1);
      }
      getBenefitHistory() {
        Http_1.default.get(Configs_1.default.App.API, {
          c: 6027
        }, (err, res) => {
          App_1.default.instance.showLoading(false);
          if (err) {
            App_1.default.instance.alertDialog.showMsg("L\u1ed7i!");
            return;
          }
          cc.log(res);
          const userInfo = new AuthorizationResponseData_1.UserInfoResponse(res);
          cc.log(userInfo);
          this.userVippointRewards = userInfo.userVippointRewards;
          this.generateBenefitHistory(this.benefitHistoryPageIdx);
        });
      }
      generateBenefitHistory(pageIdx) {
        if (this.userVippointRewards.length > (pageIdx - 1) * this.vippointHistoryPageSize) {
          this.benefitHistoryPageIdx = pageIdx;
          this.lbbenefitPage.string = this.benefitHistoryPageIdx.toString();
          this.scrollBenefitHistory.content.removeAllChildren();
          for (let i = (pageIdx - 1) * this.vippointHistoryPageSize; i < pageIdx * this.vippointHistoryPageSize; i++) {
            const history = this.userVippointRewards[i];
            if (!history) return;
            let item = cc.instantiate(this.benefitHistoryItem);
            item.getChildByName("Bg").active = i % 2 === 0;
            item.getChildByName("Time").getComponent(cc.Label).string = history.createTime;
            item.getChildByName("Receive").getComponent(cc.Label).string = history.rewardValue;
            item.getChildByName("Desc").getComponent(cc.Label).string = history.rewardDesc;
            item.active = true;
            item.parent = this.scrollBenefitHistory.content;
          }
        } else 1 === pageIdx && this.scrollBenefitHistory.content.removeAllChildren();
      }
      actPreviousBenefitHistoryPage() {
        if (1 === this.benefitHistoryPageIdx) return;
        this.generateBenefitHistory(this.benefitHistoryPageIdx - 1);
      }
      actNextBenefitHistoryPage() {
        this.generateBenefitHistory(this.benefitHistoryPageIdx + 1);
      }
      getTopvip() {
        Http_1.default.get(Configs_1.default.App.API, {
          c: 6030,
          recordPerPage: 10
        }, (err, res) => {
          App_1.default.instance.showLoading(false);
          if (null != err) return;
          cc.log(res);
          if (!res["success"]) {
            App_1.default.instance.alertDialog.showMsg("L\u1ed7i k\u1ebft n\u1ed1i, vui l\xf2ng th\u1eed l\u1ea1i.");
            return;
          }
          const topvips = VippointDTO_1.Topvip.toTopvip(res);
          this.scrollTopvip.content.removeAllChildren();
          topvips.list.length > 0 && topvips.list.forEach((top, i) => {
            let item = cc.instantiate(this.topvipItem);
            item.getChildByName("Bg").active = i % 2 === 0;
            let lbRank = item.getChildByName("Rank");
            let icRank = item.getChildByName("IconRank");
            let lbNickName = item.getChildByName("Nickname");
            let lbVip = item.getChildByName("Vip");
            let icVip = item.getChildByName("IconVip");
            let vipNumber = Number(top.rank.replace(/^\D+/g, ""));
            if (i <= this.iconTopvipRanks.length - 1) {
              lbRank.active = false;
              icRank.active = true;
              icRank.getComponent(cc.Sprite).spriteFrame = this.iconTopvipRanks[i];
            } else {
              lbRank.active = true;
              icRank.active = false;
              lbRank.getComponent(cc.Label).string = i + 1 + "";
            }
            lbNickName.getComponent(cc.Label).string = top.nickname;
            lbNickName.color = cc.Color.BLACK.fromHEX(Utils_1.default.getColorVip("VIP_" + vipNumber));
            lbNickName.getComponent(cc.LabelOutline).color = cc.Color.BLACK.fromHEX(Utils_1.default.getColorVip("VIP_" + vipNumber));
            if (vipNumber <= this.vipNames.getSpriteFrames().length - 1) {
              lbVip.active = false;
              icVip.active = true;
              icVip.getComponent(cc.Sprite).spriteFrame = this.vipNames.getSpriteFrame("VIP_" + vipNumber);
            } else {
              lbVip.active = true;
              icVip.active = false;
              lbVip.getComponent(cc.Label).string = top.rank;
              lbVip.color = cc.Color.BLACK.fromHEX(Utils_1.default.getColorVip("VIP_" + vipNumber));
              lbVip.getComponent(cc.LabelOutline).color = cc.Color.BLACK.fromHEX(Utils_1.default.getColorVip("VIP_" + vipNumber));
            }
            item.active = true;
            item.parent = this.scrollTopvip.content;
            item.position = cc.v3(cc.winSize.width, 400);
            let speed = .7;
            item.runAction(cc.sequence(cc.delayTime(.15 * i * speed), cc.moveTo(.15 * speed, cc.v2(0, 400)), cc.delayTime(.05), cc.moveTo(.2 * speed * (1 === i ? .8 : 1 - Math.pow(2, -10 * i)), cc.v2(0, 380 - 85 * i)).easing(cc.easeCircleActionOut())));
          });
        });
      }
    };
    PopupVippoint.instance = null;
    PopupVippoint.initing = false;
    __decorate([ property(cc.ToggleContainer) ], PopupVippoint.prototype, "tabs", void 0);
    __decorate([ property(cc.Node) ], PopupVippoint.prototype, "tabContents", void 0);
    __decorate([ property(cc.Node) ], PopupVippoint.prototype, "progressVipPoint", void 0);
    __decorate([ property(cc.Node) ], PopupVippoint.prototype, "arrowProgressVipPoint", void 0);
    __decorate([ property(cc.Label) ], PopupVippoint.prototype, "lblCurrentVippoint", void 0);
    __decorate([ property(cc.Node) ], PopupVippoint.prototype, "stepsProgressVipPoint", void 0);
    __decorate([ property([ cc.SpriteFrame ]) ], PopupVippoint.prototype, "iconVipFrames", void 0);
    __decorate([ property(cc.Sprite) ], PopupVippoint.prototype, "spriteVipPointCurrentRank", void 0);
    __decorate([ property(cc.Label) ], PopupVippoint.prototype, "lblVipPointNameCurrentrank", void 0);
    __decorate([ property(cc.Label) ], PopupVippoint.prototype, "lblVipPointCurrentRank", void 0);
    __decorate([ property(cc.Sprite) ], PopupVippoint.prototype, "spriteVipPointNextRank", void 0);
    __decorate([ property(cc.Label) ], PopupVippoint.prototype, "lblVipPointNameNextRank", void 0);
    __decorate([ property(cc.Label) ], PopupVippoint.prototype, "lblVipPointNextRank", void 0);
    __decorate([ property(cc.ScrollView) ], PopupVippoint.prototype, "vippointListScroll", void 0);
    __decorate([ property(cc.Node) ], PopupVippoint.prototype, "vippointItemTemplate", void 0);
    __decorate([ property(cc.ToggleContainer) ], PopupVippoint.prototype, "tabHistorys", void 0);
    __decorate([ property(cc.Node) ], PopupVippoint.prototype, "tabHistoryContents", void 0);
    __decorate([ property(cc.ScrollView) ], PopupVippoint.prototype, "scrollAddVippointHistory", void 0);
    __decorate([ property(cc.Node) ], PopupVippoint.prototype, "addVippointHistoryItem", void 0);
    __decorate([ property(cc.Label) ], PopupVippoint.prototype, "lbAddVippointPage", void 0);
    __decorate([ property(cc.ScrollView) ], PopupVippoint.prototype, "scrollBenefitHistory", void 0);
    __decorate([ property(cc.Node) ], PopupVippoint.prototype, "benefitHistoryItem", void 0);
    __decorate([ property(cc.Label) ], PopupVippoint.prototype, "lbbenefitPage", void 0);
    __decorate([ property(cc.ScrollView) ], PopupVippoint.prototype, "scrollTopvip", void 0);
    __decorate([ property(cc.Node) ], PopupVippoint.prototype, "topvipItem", void 0);
    __decorate([ property([ cc.SpriteFrame ]) ], PopupVippoint.prototype, "iconTopvipRanks", void 0);
    __decorate([ property(cc.SpriteAtlas) ], PopupVippoint.prototype, "vipNames", void 0);
    __decorate([ property(cc.ScrollView) ], PopupVippoint.prototype, "scrollGuide", void 0);
    PopupVippoint = PopupVippoint_1 = __decorate([ ccclass ], PopupVippoint);
    exports.default = PopupVippoint;
    cc._RF.pop();
  }, {
    "../../../Game/src/common/App": "App",
    "../../../Game/src/common/Configs": "Configs",
    "../../../Game/src/common/Constants": "Constants",
    "../../../Game/src/common/Dialog": "Dialog",
    "../../../Game/src/common/ErrorLogger": "ErrorLogger",
    "../../../Game/src/common/Http": "Http",
    "../../../Game/src/common/Utils": "Utils",
    "../Authorization/AuthorizationResponseData": "AuthorizationResponseData",
    "./Lobby.VippointItem": "Lobby.VippointItem",
    "./VippointDTO": "VippointDTO"
  } ],
  "Lobby.TabsListGame": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "70d69J7j5VAtpzxtw72/FZh", "Lobby.TabsListGame");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Tab = void 0;
    const Lobby_ItemGame_1 = require("./Lobby.ItemGame");
    const Tween_1 = require("../../Game/src/common/Tween");
    const SPUtils_1 = require("../../Game/src/common/SPUtils");
    const BroadcastReceiver_1 = require("../../Game/src/common/BroadcastReceiver");
    const ErrorLogger_1 = require("../../Game/src/common/ErrorLogger");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let Tab = class Tab {
      constructor() {
        this.button = null;
        this.sfActive = null;
      }
    };
    __decorate([ property(cc.Button) ], Tab.prototype, "button", void 0);
    __decorate([ property(cc.Node) ], Tab.prototype, "sfActive", void 0);
    Tab = __decorate([ ccclass("Lobby.TabsListGameTab") ], Tab);
    exports.Tab = Tab;
    let TabsListGame = class TabsListGame extends cc.Component {
      constructor() {
        super(...arguments);
        this.tabs = [];
        this.itemGames = [];
        this.scrollViewGame = null;
        this.listHide = null;
        this.listShow = null;
        this.listTwoGameCasino = null;
        this.seletectIdx = 0;
        this.LIST_HIDE_GAME = [ "BanCa", "LoDe", "OanTuXi", "BaiCao", "Baccarat", "CasinoLive", "CaDo" ];
        this.SORT_ALL_GAME = [ "SlotCayKhe", "SlotSieuAnhHung", "TaiXiu", "TaiXiuMD5", "TwoGameCasino", "BanCa", "BauCua", "XocDia", "TwoGame", "SlotNuDiepVien", "TLMN", "Maubinh", "Xidach", "SlotVuongQuocVin", "SlotKhoBau", "PokerGo", "LoDe", "MiniPoker", "Bacay", "Lieng", "LoDeSieuToc" ];
        this.SORT_SLOT = [ "SlotCayKhe", "SlotSieuAnhHung", "SlotNuDiepVien", "SlotVuongQuocVin", "SlotKhoBau" ];
        this.SORT_MINI = [ "TwoGame", "TaiXiu", "BanCa", "BauCua", "XocDia", "PokerGo", "LoDe", "MiniPoker", "TaiXiuMD5", "LoDeSieuToc" ];
        this.SORT_CASINO = [ "TLMN", "TwoGameCasino", "Maubinh", "Xidach", "Bacay", "Lieng" ];
      }
      start() {
        for (let i = 0; i < this.tabs.length; i++) {
          let tab = this.tabs[i];
          tab.button.node.on("click", () => {
            this.seletectIdx = i;
            for (let j = 0; j < this.tabs.length; j++) {
              let tab = this.tabs[j];
              tab.sfActive.active = this.seletectIdx == j;
            }
            this.onTabChanged();
          });
          tab.sfActive.active = this.seletectIdx == i;
        }
        this.onTabChanged();
        BroadcastReceiver_1.default.register(BroadcastReceiver_1.default.ON_SHOW_ANIM_CHANGED, () => {
          this.setStateAnimation("true" == SPUtils_1.default.getShowAnim());
        }, this);
      }
      onTabChanged() {
        this.listHide.active = false;
        let sortList = null;
        switch (this.seletectIdx) {
         case 0:
          for (let i = 0; i < this.itemGames.length; i++) {
            if (null == this.itemGames[i] || this.LIST_HIDE_GAME.indexOf(this.itemGames[i].node.name) > -1) continue;
            if ("hide" == this.itemGames[i].id) {
              this.itemGames[i].node.active = false;
              continue;
            }
            this.itemGames[i].node.active = true;
            sortList = this.SORT_ALL_GAME;
          }
          break;

         case 1:
          for (let i = 0; i < this.itemGames.length; i++) {
            if (null == this.itemGames[i] || this.LIST_HIDE_GAME.indexOf(this.itemGames[i].node.name) > -1) continue;
            sortList = this.SORT_SLOT;
          }
          break;

         case 2:
          for (let i = 0; i < this.itemGames.length; i++) {
            if (null == this.itemGames[i] || this.LIST_HIDE_GAME.indexOf(this.itemGames[i].node.name) > -1) continue;
            sortList = this.SORT_MINI;
          }
          break;

         case 3:
          for (let i = 0; i < this.itemGames.length; i++) {
            if (null == this.itemGames[i] || this.LIST_HIDE_GAME.indexOf(this.itemGames[i].node.name) > -1) continue;
            sortList = this.SORT_CASINO;
          }
        }
        this.showListGame(sortList);
      }
      showListGame(list) {
        try {
          this.scrollViewGame.scrollToTop(.3);
          this.scheduleOnce(() => {
            for (let i = this.listShow.children.length - 1; i >= 0; i--) {
              let iconGame = this.listShow.children[i];
              iconGame.scale = 720 / cc.winSize.width;
              iconGame.setParent(this.listHide);
            }
            if (0 === this.seletectIdx) {
              let layoutTwoGameCasino = this.listTwoGameCasino.getComponent(cc.Layout);
              layoutTwoGameCasino.type = cc.Layout.Type.VERTICAL;
              layoutTwoGameCasino.resizeMode = cc.Layout.ResizeMode.CONTAINER;
              layoutTwoGameCasino.paddingTop = 10;
              layoutTwoGameCasino.spacingY = 0;
              this.listTwoGameCasino.width = 325;
              this.listTwoGameCasino.children.forEach(child => child.x = 0);
            } else if (3 === this.seletectIdx) {
              let layoutTwoGameCasino = this.listTwoGameCasino.getComponent(cc.Layout);
              layoutTwoGameCasino.type = cc.Layout.Type.HORIZONTAL;
              layoutTwoGameCasino.resizeMode = cc.Layout.ResizeMode.CONTAINER;
              layoutTwoGameCasino.paddingLeft = 30;
              layoutTwoGameCasino.spacingX = -10;
              this.listTwoGameCasino.height = 220;
              this.listTwoGameCasino.width = 650;
              this.listTwoGameCasino.children.forEach(child => child.y = 0);
            }
            for (let i = 0; i < list.length; i++) {
              const gameName = list[i];
              let game = this.listHide.children.find(game => game.name == gameName);
              if (game) {
                game.stopAllActions();
                game.getComponentInChildren(sp.Skeleton).enabled = false;
                game.getComponentInChildren(sp.Skeleton).getComponentInChildren(cc.Sprite).node.active = true;
                game.opacity = 0;
                game.runAction(cc.sequence(cc.fadeIn(.15 * i), cc.callFunc(() => {
                  game.getComponentInChildren(sp.Skeleton).enabled = "true" == SPUtils_1.default.getShowAnim();
                  game.getComponentInChildren(sp.Skeleton).getComponentInChildren(cc.Sprite).node.active = !("true" == SPUtils_1.default.getShowAnim());
                })));
                game.setParent(this.listShow);
              } else cc.log(gameName, game);
            }
          }, .2);
        } catch (error) {
          ErrorLogger_1.ErrorLogger.sendLogError("Object empty", "Lobby list game", JSON.stringify(list) + "\n" + JSON.stringify(error.stack));
        }
      }
      getItemGameWithId(id) {
        for (let i = 0; i < this.itemGames.length; i++) if (this.itemGames[i].id == id) return this.itemGames[i];
        return null;
      }
      updateItemJackpots(id, j100, x2J100, j1000, x2J1000, j10000, x2J10000) {
        let itemGame = this.getItemGameWithId(id);
        if (null != id && itemGame && itemGame.node.parent == this.listShow) {
          Tween_1.default.numberTo(itemGame.lblJackpots[0], j100, 2);
          Tween_1.default.numberTo(itemGame.lblJackpots[1], j1000, 2);
          Tween_1.default.numberTo(itemGame.lblJackpots[2], j10000, 2);
        }
      }
      setStateAnimation(isStopAnimation = false) {
        let modeAnim = "true" == SPUtils_1.default.getShowAnim();
        let list = [];
        this.listShow.stopAllActions();
        this.listShow.getComponentsInChildren(sp.Skeleton).forEach(skeleton => {
          list.push(cc.callFunc(() => {
            skeleton.enabled = isStopAnimation && modeAnim;
            skeleton.getComponentInChildren(cc.Sprite).node.active = !(isStopAnimation && modeAnim);
          }));
          isStopAnimation && modeAnim && list.push(cc.delayTime(.15));
        });
        this.listShow.runAction(cc.sequence(list));
      }
    };
    __decorate([ property([ Tab ]) ], TabsListGame.prototype, "tabs", void 0);
    __decorate([ property([ Lobby_ItemGame_1.default ]) ], TabsListGame.prototype, "itemGames", void 0);
    __decorate([ property(cc.ScrollView) ], TabsListGame.prototype, "scrollViewGame", void 0);
    __decorate([ property(cc.Node) ], TabsListGame.prototype, "listHide", void 0);
    __decorate([ property(cc.Node) ], TabsListGame.prototype, "listShow", void 0);
    __decorate([ property(cc.Node) ], TabsListGame.prototype, "listTwoGameCasino", void 0);
    TabsListGame = __decorate([ ccclass ], TabsListGame);
    exports.default = TabsListGame;
    cc._RF.pop();
  }, {
    "../../Game/src/common/BroadcastReceiver": "BroadcastReceiver",
    "../../Game/src/common/ErrorLogger": "ErrorLogger",
    "../../Game/src/common/SPUtils": "SPUtils",
    "../../Game/src/common/Tween": "Tween",
    "./Lobby.ItemGame": "Lobby.ItemGame"
  } ],
  "Lobby.VippointItem": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9f43cdlU/FIYokhJ3/Cehs5", "Lobby.VippointItem");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const App_1 = require("../../../Game/src/common/App");
    const BroadcastReceiver_1 = require("../../../Game/src/common/BroadcastReceiver");
    const Configs_1 = require("../../../Game/src/common/Configs");
    const Constants_1 = require("../../../Game/src/common/Constants");
    const ErrorLogger_1 = require("../../../Game/src/common/ErrorLogger");
    const Http_1 = require("../../../Game/src/common/Http");
    const Utils_1 = require("../../../Game/src/common/Utils");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let VippointItem = class VippointItem extends cc.Component {
      constructor() {
        super(...arguments);
        this.background = null;
        this.currentVipHighlight = null;
        this.vipIconBg = null;
        this.vipIcon = null;
        this.vipRankUp = null;
        this.vipName = null;
        this.benefitTitle = null;
        this.benefitListScroll = null;
        this.benefitItemTemplate = null;
        this.actionListScroll = null;
        this.actionItem = null;
        this.buttonSpriteFrames = [];
      }
      onLoad() {
        BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.SET_SOUND, this.node);
      }
      setVippointRankDetail(index, vippointDTO, userVippointRewards, dialog) {
        try {
          const vippointRank = vippointDTO.vippointRankDetail[index];
          this.vipIcon.setSkin("vip" + (vippointRank.id + 1));
          this.vipName.string = vippointRank.name;
          const isCurrentRank = vippointDTO.currentVippointRank === index;
          const isNextRank = vippointDTO.currentVippointRank + 1 === index;
          this.background.active = !isCurrentRank;
          this.currentVipHighlight.active = isCurrentRank;
          this.vipIconBg.active = isCurrentRank;
          this.vipRankUp.active = isNextRank;
          if (!isCurrentRank) {
            this.node.height = 230;
            this.vipIcon.node.y = 20;
            this.vipName.node.y = -80;
          }
          if (isNextRank) {
            this.node.height = 300;
            this.vipIcon.node.y = 50;
            this.vipName.node.y = -40;
            cc.tween(this.vipRankUp).repeatForever(cc.tween().by(.2, {
              position: {
                value: cc.v2(0, 10),
                easing: "sineOut"
              }
            }).delay(.1).by(.2, {
              position: {
                value: cc.v2(0, -10),
                easing: "sineOut"
              }
            }).delay(.1)).start();
          }
          this.benefitListScroll.content.removeAllChildren();
          if (0 === vippointRank.listVipBenefits.length) this.benefitTitle.active = false; else for (let i = 0; i < vippointRank.listVipBenefits.length; i++) {
            const benefitName = vippointRank.listVipBenefits[i];
            const benefit = vippointDTO.benefitDetail.find(benefitDetail => benefitDetail.name === benefitName);
            if (benefit) {
              let itemBenefit = cc.instantiate(this.benefitItemTemplate);
              itemBenefit.getComponentInChildren(cc.Label).string = benefit.award && !isNaN(parseInt(benefit.award)) ? "Th\u01b0\u1edfng " + Utils_1.default.formatNumber(parseInt(benefit.award)) : benefit.desc;
              itemBenefit.parent = this.benefitListScroll.content;
              itemBenefit.active = true;
              let btnGetBenefit = itemBenefit.getChildByName("BtnGetBenefit");
              if (vippointDTO.currentVippointRank < index || benefit.listClientSuggestionAction.length < 1) {
                btnGetBenefit.active = false;
                continue;
              }
              if (userVippointRewards.find(reward => reward.rewardName === benefitName)) {
                btnGetBenefit.getComponentInChildren(cc.Label).string = "\u0110\xe3 nh\u1eadn";
                btnGetBenefit.getComponent(cc.Button).interactable = false;
                continue;
              }
              btnGetBenefit.getComponentInChildren(cc.Label).string = Constants_1.UserActions.toName(benefit.listClientSuggestionAction[0]);
              btnGetBenefit.on("click", () => {
                switch (benefit.listClientSuggestionAction[0]) {
                 case Constants_1.UserActions.ENUM.GET_REWARD:
                  App_1.default.instance.showLoading(true);
                  Http_1.default.get(Configs_1.default.App.API, {
                    c: 6029,
                    benefitType: benefit.name
                  }, (err, res) => {
                    App_1.default.instance.showLoading(false);
                    if (null != err) return;
                    cc.log(res);
                    if (!res["success"]) {
                      App_1.default.instance.alertDialog.showMsg(res["desc"] || "Nh\u1eadn th\u01b0\u1edfng l\u1ed7i, vui l\xf2ng th\u1eed l\u1ea1i.");
                      return;
                    }
                    btnGetBenefit.getComponentInChildren(cc.Label).string = "\u0110\xe3 nh\u1eadn";
                    btnGetBenefit.getComponent(cc.Button).interactable = false;
                  });
                }
              });
            }
          }
          this.benefitListScroll.scrollToTop(0);
          if (isNextRank) {
            this.actionListScroll.node.parent.active = true;
            vippointDTO.vippointEarnSourceConfigs.filter(vippointEarn => vippointEarn.action === Constants_1.UserActions.ENUM.PLAY_GAME || vippointEarn.value !== Constants_1.UserActions.ENUM.PLAY_GAME && !vippointEarn.value.includes(Constants_1.UserActions.ENUM.PLAY_GAME)).forEach(vippointEarn => {
              let actionButton = cc.instantiate(this.actionItem);
              actionButton.getComponentInChildren(cc.Label).string = Constants_1.UserActions.toName(vippointEarn.action);
              actionButton.active = true;
              actionButton.on("click", () => {
                vippointEarn.action === Constants_1.UserActions.ENUM.PLAY_GAME ? dialog.dismiss() : App_1.default.instance.navigateByAction(vippointEarn.action);
              });
              actionButton.parent = this.actionListScroll.content;
            });
          }
        } catch (error) {
          ErrorLogger_1.ErrorLogger.sendLogError("Vippoint data", "Vippoint rank detail", JSON.stringify(vippointDTO) + " " + JSON.stringify(userVippointRewards) + "\n" + JSON.stringify(error.stack));
        }
      }
    };
    __decorate([ property(cc.Node) ], VippointItem.prototype, "background", void 0);
    __decorate([ property(cc.Node) ], VippointItem.prototype, "currentVipHighlight", void 0);
    __decorate([ property(cc.Node) ], VippointItem.prototype, "vipIconBg", void 0);
    __decorate([ property(sp.Skeleton) ], VippointItem.prototype, "vipIcon", void 0);
    __decorate([ property(cc.Node) ], VippointItem.prototype, "vipRankUp", void 0);
    __decorate([ property(cc.Label) ], VippointItem.prototype, "vipName", void 0);
    __decorate([ property(cc.Node) ], VippointItem.prototype, "benefitTitle", void 0);
    __decorate([ property(cc.ScrollView) ], VippointItem.prototype, "benefitListScroll", void 0);
    __decorate([ property(cc.Node) ], VippointItem.prototype, "benefitItemTemplate", void 0);
    __decorate([ property(cc.ScrollView) ], VippointItem.prototype, "actionListScroll", void 0);
    __decorate([ property(cc.Node) ], VippointItem.prototype, "actionItem", void 0);
    __decorate([ property(cc.SpriteFrame) ], VippointItem.prototype, "buttonSpriteFrames", void 0);
    VippointItem = __decorate([ ccclass ], VippointItem);
    exports.default = VippointItem;
    cc._RF.pop();
  }, {
    "../../../Game/src/common/App": "App",
    "../../../Game/src/common/BroadcastReceiver": "BroadcastReceiver",
    "../../../Game/src/common/Configs": "Configs",
    "../../../Game/src/common/Constants": "Constants",
    "../../../Game/src/common/ErrorLogger": "ErrorLogger",
    "../../../Game/src/common/Http": "Http",
    "../../../Game/src/common/Utils": "Utils"
  } ],
  LobbyResponseData: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "956456jxNZJxJm9d2CCyMue", "LobbyResponseData");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.MailBoxSuggestionAction = exports.MailBoxTransaction = exports.MailBoxDTO = void 0;
    const Constants_1 = require("../../../Game/src/common/Constants");
    class MailBoxDTO {
      constructor() {
        this.transactions = [];
      }
      static toMailBoxDTO(mailBoxData) {
        let mailBoxDTO = new MailBoxDTO();
        mailBoxDTO.success = null === mailBoxData || void 0 === mailBoxData ? void 0 : mailBoxData.success;
        mailBoxDTO.errorCode = parseInt(null === mailBoxData || void 0 === mailBoxData ? void 0 : mailBoxData.errorCode);
        mailBoxDTO.desc = null === mailBoxData || void 0 === mailBoxData ? void 0 : mailBoxData.desc;
        mailBoxDTO.totalPages = null === mailBoxData || void 0 === mailBoxData ? void 0 : mailBoxData.totalPages;
        mailBoxDTO.mailNotRead = null === mailBoxData || void 0 === mailBoxData ? void 0 : mailBoxData.mailNotRead;
        null === mailBoxData || void 0 === mailBoxData ? void 0 : mailBoxData.transactions.forEach(transaction => {
          mailBoxDTO.transactions.push(MailBoxTransaction.toMailBoxTransaction(transaction));
        });
        return mailBoxDTO;
      }
    }
    exports.MailBoxDTO = MailBoxDTO;
    class MailBoxTransaction {
      constructor() {
        this.clientSuggestionActions = [];
      }
      static toMailBoxTransaction(transaction) {
        let mailBoxTransaction = new MailBoxTransaction();
        mailBoxTransaction.mailId = null === transaction || void 0 === transaction ? void 0 : transaction.mail_id;
        mailBoxTransaction.type = null === transaction || void 0 === transaction ? void 0 : transaction.type;
        mailBoxTransaction.title = null === transaction || void 0 === transaction ? void 0 : transaction.title;
        mailBoxTransaction.author = null === transaction || void 0 === transaction ? void 0 : transaction.author;
        mailBoxTransaction.createTime = null === transaction || void 0 === transaction ? void 0 : transaction.createTime;
        mailBoxTransaction.content = null === transaction || void 0 === transaction ? void 0 : transaction.content;
        mailBoxTransaction.status = null === transaction || void 0 === transaction ? void 0 : transaction.status;
        mailBoxTransaction.sysMail = null === transaction || void 0 === transaction ? void 0 : transaction.sysMail;
        mailBoxTransaction.giftCode = null === transaction || void 0 === transaction ? void 0 : transaction.giftCode;
        mailBoxTransaction.provider = null === transaction || void 0 === transaction ? void 0 : transaction.provider;
        mailBoxTransaction.serial = null === transaction || void 0 === transaction ? void 0 : transaction.serial;
        mailBoxTransaction.pin = null === transaction || void 0 === transaction ? void 0 : transaction.pin;
        try {
          let clientSuggestionActions = JSON.parse(null === transaction || void 0 === transaction ? void 0 : transaction.clientSuggestionActions);
          Array.isArray(clientSuggestionActions) && clientSuggestionActions.forEach(action => {
            mailBoxTransaction.clientSuggestionActions.push(MailBoxSuggestionAction.toMailBoxSuggestionAction(action));
          });
        } catch (error) {
          cc.log("Cant not parse clientSuggestionActions");
        }
        return mailBoxTransaction;
      }
    }
    exports.MailBoxTransaction = MailBoxTransaction;
    class MailBoxSuggestionAction {
      static toMailBoxSuggestionAction(action) {
        let mailBoxSuggestionAction = new MailBoxSuggestionAction();
        mailBoxSuggestionAction.suggestionAction = Constants_1.UserActions.toEnum(null === action || void 0 === action ? void 0 : action.suggestionAction);
        mailBoxSuggestionAction.parameters = null === action || void 0 === action ? void 0 : action.parameters;
        return mailBoxSuggestionAction;
      }
    }
    exports.MailBoxSuggestionAction = MailBoxSuggestionAction;
    cc._RF.pop();
  }, {
    "../../../Game/src/common/Constants": "Constants"
  } ],
  MauBinhNetworkClient: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ef5e6R1nFhHvZngIpEqlvkV", "MauBinhNetworkClient");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Configs_1 = require("../common/Configs");
    const Network_Cmd_1 = require("./Network.Cmd");
    const Network_InPacket_1 = require("./Network.InPacket");
    const Network_NetworkClient_1 = require("./Network.NetworkClient");
    const Network_NetworkListener_1 = require("./Network.NetworkListener");
    class MauBinhNetworkClient extends Network_NetworkClient_1.default {
      constructor() {
        super();
        this.listeners = new Array();
        this.isLogin = false;
        this.onLogined = null;
        this.isUseWSS = Configs_1.default.App.USE_WSS;
      }
      static getInstance() {
        null == this.instance && (this.instance = new MauBinhNetworkClient());
        return this.instance;
      }
      checkConnect(onLogined) {
        this.onLogined = onLogined;
        if (null != this.ws && this.ws.readyState == WebSocket.CONNECTING) return;
        if (!this.isConnected()) {
          this.connect();
          return;
        }
        this.isLogin && null != this.onLogined && this.onLogined();
      }
      connect() {
        super.connect(Configs_1.default.App.HOST_MAUBINH.host, Configs_1.default.App.HOST_MAUBINH.port);
      }
      onOpen(ev) {
        super.onOpen(ev);
        this.send(new Network_Cmd_1.default.SendLogin(Configs_1.default.Login.Nickname, Configs_1.default.Login.AccessToken));
      }
      onMessage(ev) {
        var data = new Uint8Array(ev.data);
        for (var i = 0; i < this.listeners.length; i++) {
          var listener = this.listeners[i];
          if (listener.target && listener.target instanceof Object && listener.target.node) listener.callback(data); else {
            this.listeners.splice(i, 1);
            i--;
          }
        }
        let inpacket = new Network_InPacket_1.default(data);
        switch (inpacket.getCmdId()) {
         case Network_Cmd_1.default.Code.LOGIN:
          this.isLogin = true;
          null != this.onLogined && this.onLogined();
        }
      }
      addListener(callback, target) {
        this.listeners.push(new Network_NetworkListener_1.default(target, callback));
      }
      send(packet) {
        for (var b = new Int8Array(packet._length), c = 0; c < packet._length; c++) b[c] = packet._data[c];
        null != this.ws && this.isConnected() && this.ws.send(b.buffer);
      }
    }
    exports.default = MauBinhNetworkClient;
    cc._RF.pop();
  }, {
    "../common/Configs": "Configs",
    "./Network.Cmd": "Network.Cmd",
    "./Network.InPacket": "Network.InPacket",
    "./Network.NetworkClient": "Network.NetworkClient",
    "./Network.NetworkListener": "Network.NetworkListener"
  } ],
  MiniGameNetworkClient: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c72820K6yBNJaQ7FqwxoK9G", "MiniGameNetworkClient");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Network_NetworkClient_1 = require("./Network.NetworkClient");
    const Network_NetworkListener_1 = require("./Network.NetworkListener");
    const Configs_1 = require("../common/Configs");
    const Network_InPacket_1 = require("./Network.InPacket");
    const Network_Cmd_1 = require("./Network.Cmd");
    class MiniGameNetworkClient extends Network_NetworkClient_1.default {
      constructor() {
        super();
        this.listeners = new Array();
        this.isLogin = false;
        this.onLogined = null;
        this.isUseWSS = Configs_1.default.App.USE_WSS;
      }
      static getInstance() {
        null == this.instance && (this.instance = new MiniGameNetworkClient());
        return this.instance;
      }
      checkConnect(onLogined = null) {
        this.onLogined = onLogined;
        if (null != this.ws && this.ws.readyState == WebSocket.CONNECTING) return;
        if (!this.isConnected()) {
          this.connect();
          return;
        }
        this.isLogin && null != this.onLogined && this.onLogined();
      }
      connect() {
        super.connect(Configs_1.default.App.HOST_MINIGAME.host, Configs_1.default.App.HOST_MINIGAME.port);
      }
      onOpen(ev) {
        super.onOpen(ev);
        this.send(new Network_Cmd_1.default.SendLogin(Configs_1.default.Login.Nickname, Configs_1.default.Login.AccessToken));
      }
      onMessage(ev) {
        var data = new Uint8Array(ev.data);
        for (var i = 0; i < this.listeners.length; i++) {
          var listener = this.listeners[i];
          if (listener.target && listener.target instanceof Object && listener.target.node) listener.callback(data); else {
            this.listeners.splice(i, 1);
            i--;
          }
        }
        let inpacket = new Network_InPacket_1.default(data);
        switch (inpacket.getCmdId()) {
         case Network_Cmd_1.default.Code.LOGIN:
          this.isLogin = true;
          null != this.onLogined && this.onLogined();
        }
      }
      addListener(callback, target) {
        this.listeners.push(new Network_NetworkListener_1.default(target, callback));
      }
      send(packet) {
        for (var b = new Int8Array(packet._length), c = 0; c < packet._length; c++) b[c] = packet._data[c];
        null != this.ws && this.isConnected() && this.ws.send(b.buffer);
      }
      sendCheck(packet) {
        this.checkConnect(() => {
          this.send(packet);
        });
      }
    }
    exports.default = MiniGameNetworkClient;
    cc._RF.pop();
  }, {
    "../common/Configs": "Configs",
    "./Network.Cmd": "Network.Cmd",
    "./Network.InPacket": "Network.InPacket",
    "./Network.NetworkClient": "Network.NetworkClient",
    "./Network.NetworkListener": "Network.NetworkListener"
  } ],
  MiniGame: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c0443y5h9NOK63Ba/g4+JDh", "MiniGame");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const App_1 = require("../../Game/src/common/App");
    const BroadcastReceiver_1 = require("../../Game/src/common/BroadcastReceiver");
    const {ccclass: ccclass, property: property} = cc._decorator;
    var lobby;
    (function(lobby) {
      let MiniGame = class MiniGame extends cc.Component {
        constructor() {
          super(...arguments);
          this.gamePlay = null;
          this.layoutClose = null;
          this.currentPosition = null;
          this.lastPosition = null;
        }
        start() {
          BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.SET_SOUND, this.node);
          this.gamePlay.on(cc.Node.EventType.TOUCH_START, event => {
            this.reOrder();
          }, this);
          this.gamePlay.on(cc.Node.EventType.TOUCH_MOVE, event => {
            if (this.gamePlay.scale >= 1) return;
            var pos = this.gamePlay.position;
            pos.x += event.getDeltaX();
            pos.y += event.getDeltaY();
            let filX = Math.min(Math.abs(pos.x), cc.winSize.width / 2);
            let filY = Math.min(Math.abs(pos.y), cc.winSize.height / 2);
            pos.x = pos.x < 0 ? -filX : filX;
            pos.y = pos.y < 0 ? -filY : filY;
            this.gamePlay.position = pos;
            this.gamePlay && 1 != this.gamePlay.scale && (this.lastPosition = this.gamePlay.position);
          }, this);
          this.gamePlay.on(cc.Node.EventType.TOUCH_END, event => {
            if (this.currentPosition) {
              let moveX = this.currentPosition.x - this.gamePlay.position.x;
              let moveY = this.currentPosition.y - this.gamePlay.position.y;
              Math.pow(moveX / 20, 2) + Math.pow(moveY / 20, 2) < 1 && 1 != this.gamePlay.scale && this.zoom(null, 1);
            }
            this.currentPosition = this.gamePlay.position;
          }, this);
          this.gamePlay.on(cc.Node.EventType.TOUCH_CANCEL, event => {
            if (this.currentPosition) {
              let moveX = this.currentPosition.x - this.gamePlay.position.x;
              let moveY = this.currentPosition.y - this.gamePlay.position.y;
              Math.pow(moveX / 20, 2) + Math.pow(moveY / 20, 2) < 1 && 1 != this.gamePlay.scale && this.zoom(null, 1);
            }
            this.currentPosition = this.gamePlay.position;
          }, this);
        }
        showLayoutClose() {
          let scaleNode = 0 == this.layoutClose.scaleY && 1 == this.gamePlay.scale ? 1 : 0;
          cc.tween(this.layoutClose).to(.1, {
            scaleY: scaleNode
          }).start();
        }
        reOrder() {
          var zIndex = 0;
          for (var i = 0; i < this.node.parent.childrenCount; i++) {
            let node = this.node.parent.children[i];
            node != this.node && (node.zIndex = zIndex++);
          }
          this.node.zIndex = zIndex++;
        }
        show() {
          this.reOrder();
          this.node.active = true;
          this.gamePlay.stopAllActions();
          this.gamePlay.scale = 0;
          this.gamePlay.getComponentsInChildren(cc.Button).forEach(button => {
            button.enabled = true;
          });
          this.subscribe();
          App_1.default.instance.setStateAnimation(false);
        }
        subscribe() {
          this.onSubscribeSuccess();
        }
        onSubscribeSuccess() {
          this.gamePlay.runAction(cc.sequence(cc.spawn(cc.scaleTo(.3, 1).easing(cc.easeBackOut()), cc.moveTo(.3, cc.v2(0, 0))), cc.callFunc(() => {
            this._onShowed();
            this.gamePlay.getComponentInChildren(cc.BlockInputEvents).node.active = true;
          })));
        }
        _onShowed() {}
        zoom(evt, scale) {
          this.gamePlay.getComponentInChildren(cc.BlockInputEvents).node.active = 1 == parseFloat(scale);
          this.gamePlay.getComponentsInChildren(cc.Button).forEach(button => {
            button.enabled = 1 == parseFloat(scale);
          });
          1 == parseFloat(scale) && (this.gamePlay.position = cc.v3(0, 0));
          let position = 1 == parseFloat(scale) ? cc.v3(0, 0) : this.lastPosition || cc.v3(0, 0);
          cc.tween(this.gamePlay).to(.2, {
            scale: parseFloat(scale),
            position: position
          }).start();
          this.showLayoutClose();
          App_1.default.instance.setStateAnimation(1 != parseFloat(scale));
        }
        dismiss() {
          this.gamePlay.stopAllActions();
          this.gamePlay.runAction(cc.sequence(cc.scaleTo(.3, 0).easing(cc.easeBackIn()), cc.callFunc(() => {
            this._onDismissed();
          })));
        }
        _onDismissed() {
          this.showLayoutClose();
          this.node.active = false;
          App_1.default.instance.setStateAnimation(true);
        }
      };
      __decorate([ property(cc.Node) ], MiniGame.prototype, "gamePlay", void 0);
      __decorate([ property(cc.Node) ], MiniGame.prototype, "layoutClose", void 0);
      MiniGame = __decorate([ ccclass ], MiniGame);
      lobby.MiniGame = MiniGame;
    })(lobby || (lobby = {}));
    exports.default = lobby.MiniGame;
    cc._RF.pop();
  }, {
    "../../Game/src/common/App": "App",
    "../../Game/src/common/BroadcastReceiver": "BroadcastReceiver"
  } ],
  "Network.Cmd": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9a77535BDFPdLDe/ez3AIxH", "Network.Cmd");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.cmd = void 0;
    const Network_OutPacket_1 = require("./Network.OutPacket");
    const Network_InPacket_1 = require("./Network.InPacket");
    var cmd;
    (function(cmd) {
      class Code {}
      Code.LOGIN = 1;
      Code.NOTIFY_DISCONNECT = 37;
      cmd.Code = Code;
      class Login extends Network_OutPacket_1.default {
        constructor() {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.LOGIN);
        }
        putData(nickname, accessToken) {
          this.packHeader();
          this.putString(nickname);
          this.putString(accessToken);
          this.updateSize();
        }
      }
      cmd.Login = Login;
      class SendLogin extends Network_OutPacket_1.default {
        constructor(nickname, accessToken) {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.LOGIN);
          this.packHeader();
          this.putString(nickname);
          this.putString(accessToken);
          this.updateSize();
        }
      }
      cmd.SendLogin = SendLogin;
      class ReceivedNotifyDisconnect extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.reason = this.getError();
        }
      }
      cmd.ReceivedNotifyDisconnect = ReceivedNotifyDisconnect;
    })(cmd = exports.cmd || (exports.cmd = {}));
    exports.default = cmd;
    cc._RF.pop();
  }, {
    "./Network.InPacket": "Network.InPacket",
    "./Network.OutPacket": "Network.OutPacket"
  } ],
  "Network.InPacket": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "851d2yV2EVGOayct/dVBmpt", "Network.InPacket");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    class InPacket {
      constructor(data) {
        this._pos = 0;
        this._data = new Uint8Array(0);
        this._length = 0;
        this._controllerId = 0;
        this._cmdId = 0;
        this._error = 0;
        this.init(data);
      }
      init(data) {
        this._pos = 0;
        this._data = data;
        this._length = data.length;
        this._controllerId = this.parseByte();
        this._cmdId = this.getShort();
        this._error = this.parseByte();
      }
      getCmdId() {
        return this._cmdId;
      }
      getControllerId() {
        return this._controllerId;
      }
      getError() {
        return this._error;
      }
      parseByte() {
        return this._data[this._pos++];
      }
      getByte() {
        return this.parseByte();
      }
      getBool() {
        return 0 < this._data[this._pos++];
      }
      getBytes(a) {
        for (var b = [], c = 0; c < a; c++) b.push(this.parseByte());
        return b;
      }
      getShort() {
        if (this._pos + 2 > this._length) return 0;
        var a = (this.parseByte() << 8) + (255 & this.parseByte());
        return 32767 < a ? a - 65536 : a;
      }
      getUnsignedShort() {
        var a = (255 & this.parseByte()) << 8, b = (255 & this.parseByte()) << 0;
        return a + b;
      }
      getInt() {
        return ((255 & this.parseByte()) << 24) + ((255 & this.parseByte()) << 16) + ((255 & this.parseByte()) << 8) + ((255 & this.parseByte()) << 0);
      }
      byteArrayToLong(a) {
        var b = true, c = 0, d = 0;
        255 == a[0] && (b = false);
        if (b) for (d = 0; 8 > d; d++) c = 256 * c + a[d]; else {
          for (d = c = 1; 7 >= d; d++) c = 256 * c - a[d];
          c = -c;
        }
        return c;
      }
      getLong() {
        for (var a = [], b = 0; 8 > b; b++) a[b] = this.parseByte();
        return this.byteArrayToLong(a);
      }
      getDouble() {
        for (var a = new ArrayBuffer(8), b = new Uint8Array(a), c = 7; 0 <= c; c--) b[7 - c] = this.parseByte();
        return new DataView(a).getFloat64(0);
      }
      getCharArray() {
        var a = this.getUnsignedShort();
        return this.getBytes(a);
      }
      getString() {
        var a = this.getCharArray();
        var b = new Uint8Array(a.length);
        for (var c = 0; c < a.length; c++) b[c] = parseInt(a[c], 10);
        var s = String.fromCharCode.apply(null, b);
        return decodeURIComponent(escape(s));
      }
      clean() {}
    }
    exports.default = InPacket;
    cc._RF.pop();
  }, {} ],
  "Network.NetworkClient": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d02d3/cUfVJtbLRo2vAnsLe", "Network.NetworkClient");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Network_NetworkListener_1 = require("./Network.NetworkListener");
    class NetworkClient {
      constructor() {
        this.ws = null;
        this.host = "";
        this.port = 0;
        this.isForceClose = false;
        this.isUseWSS = false;
        this.isAutoReconnect = false;
        this._onOpenes = [];
        this._onCloses = [];
      }
      connect(host, port) {
        cc.log("start connect: " + host + ":" + port);
        this.isForceClose = false;
        this.host = host;
        this.port = port;
        if (null == this.ws) if (this.isUseWSS) if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) cc.assetManager.resources.load("cacert", cc.Asset, (err, cacert) => {
          if (err) {
            cc.log("Load cacert error");
            return;
          }
          let url = cacert.nativeUrl;
          this.ws = new (Function.prototype.bind.apply(WebSocket, [ null, "wss://" + host + ":" + port + "/websocket", [], url ]))();
          this.ws.binaryType = "arraybuffer";
          this.ws.onopen = this.onOpen.bind(this);
          this.ws.onmessage = this.onMessage.bind(this);
          this.ws.onerror = this.onError.bind(this);
          this.ws.onclose = this.onClose.bind(this);
        }); else {
          this.ws = new WebSocket("wss://" + host + ":" + port + "/websocket");
          this.ws.binaryType = "arraybuffer";
          this.ws.onopen = this.onOpen.bind(this);
          this.ws.onmessage = this.onMessage.bind(this);
          this.ws.onerror = this.onError.bind(this);
          this.ws.onclose = this.onClose.bind(this);
        } else {
          this.ws = new WebSocket("ws://" + host + ":" + port + "/websocket");
          this.ws.binaryType = "arraybuffer";
          this.ws.onopen = this.onOpen.bind(this);
          this.ws.onmessage = this.onMessage.bind(this);
          this.ws.onerror = this.onError.bind(this);
          this.ws.onclose = this.onClose.bind(this);
        } else if (this.ws.readyState !== WebSocket.OPEN) {
          this.ws.close();
          this.ws = null;
          this.connect(host, port);
        }
      }
      onOpen(ev) {
        this._onOpenes = this._onOpenes.filter(listener => listener.target && listener.target instanceof Object && listener.target.node);
        for (let i = 0; i < this._onOpenes.length; i++) {
          let listener = this._onOpenes[i];
          listener.callback(null);
        }
      }
      onMessage(ev) {}
      onError(ev) {
        console.log("onError");
        console.log("Onerror called " + JSON.stringify(ev));
        console.log("code is " + ev.code);
        console.log("reason is " + ev.reason);
        console.log("wasClean is " + ev.wasClean);
      }
      onClose(ev) {
        console.log("onClose");
        console.log("Onclose called " + JSON.stringify(ev));
        console.log("code is " + ev.code);
        console.log("reason is " + ev.reason);
        console.log("wasClean is " + ev.wasClean);
        this._onCloses = this._onCloses.filter(listener => listener.target && listener.target instanceof Object && listener.target.node);
        for (var i = 0; i < this._onCloses.length; i++) {
          var listener = this._onCloses[i];
          listener.callback(null);
        }
        this.isAutoReconnect && !this.isForceClose && setTimeout(() => {
          this.isForceClose || this.connect(this.host, this.port);
        }, 2e3);
      }
      addOnOpen(callback, target) {
        this._onOpenes.push(new Network_NetworkListener_1.default(target, callback));
      }
      addOnClose(callback, target) {
        this._onCloses.push(new Network_NetworkListener_1.default(target, callback));
      }
      close() {
        this.isForceClose = true;
        if (this.ws) {
          this.ws.close();
          this.ws = null;
        }
      }
      isConnected() {
        if (this.ws) return this.ws.readyState == WebSocket.OPEN;
        return false;
      }
    }
    exports.default = NetworkClient;
    cc._RF.pop();
  }, {
    "./Network.NetworkListener": "Network.NetworkListener"
  } ],
  "Network.NetworkListener": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "05be0BVFnFFQJR9M4lLsiVt", "Network.NetworkListener");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    class NetworkListener {
      constructor(target, callback) {
        this.target = target;
        this.callback = callback;
      }
    }
    exports.default = NetworkListener;
    cc._RF.pop();
  }, {} ],
  "Network.OutPacket": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "aad90ZGA2pCGbMidoqrmj74", "Network.OutPacket");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const PacketHeaderAnalyze_1 = require("./PacketHeaderAnalyze");
    class OutPacket {
      constructor() {
        this._controllerId = 1;
        this._cmdId = 0;
        this._data = new Array();
        this._capacity = new Array();
        this._length = 0;
        this._pos = 0;
        this._isPackedHeader = false;
      }
      setCmdId(cmdId) {
        this._cmdId = cmdId;
      }
      setControllerId(controllerId) {
        this._controllerId = controllerId;
      }
      initData(data) {
        this._data = [ data ];
        this._capacity = data;
      }
      reset() {
        this._length = this._pos = 0;
        this._isPackedHeader = false;
      }
      packHeader() {
        if (!this._isPackedHeader) {
          this._isPackedHeader = !0;
          var a = PacketHeaderAnalyze_1.default.genHeader(!1, !1);
          this.putByte(a);
          this.putUnsignedShort(this._length);
          this.putByte(this._controllerId);
          this.putShort(this._cmdId);
        }
      }
      putByte(a) {
        this._data[this._pos++] = a;
        this._length = this._pos;
        return this;
      }
      putByteArray(a) {
        this.putShort(a.length);
        this.putBytes(a);
        return this;
      }
      putBytes(a) {
        for (var b = 0; b < a.length; b++) this.putByte(a[b]);
        return this;
      }
      putShort(a) {
        this.putByte(a >> 8 & 255);
        this.putByte(a >> 0 & 255);
        return this;
      }
      putUnsignedShort(a) {
        this.putByte(a >> 8);
        this.putByte(a >> 0);
        return this;
      }
      putInt(a) {
        this.putByte(a >> 24 & 255);
        this.putByte(a >> 16 & 255);
        this.putByte(a >> 8 & 255);
        this.putByte(a >> 0 & 255);
        return this;
      }
      putLong(a) {
        0 > a && cc.log("hahaha");
        for (var b = [], c = 0; 8 > c; c++) b[c] = 255 & a, a = Math.floor(a / 256);
        for (a = 7; 0 <= a; a--) this.putByte(b[a]);
      }
      putDouble(a) {
        this.putByte(a >> 24 & 255);
        this.putByte(a >> 16 & 255);
        this.putByte(a >> 8 & 255);
        this.putByte(a >> 0 & 255);
        this.putByte(a >> 24 & 255);
        this.putByte(a >> 16 & 255);
        this.putByte(a >> 8 & 255);
        this.putByte(a >> 0 & 255);
        return this;
      }
      putString(a) {
        this.putByteArray(this._stringConvertToByteArray(a));
        return this;
      }
      updateUnsignedShortAtPos(a, b) {
        this._data[b] = a >> 8;
        this._data[b + 1] = a >> 0;
      }
      updateSize() {
        this.updateUnsignedShortAtPos(this._length - 3, OutPacket.INDEX_SIZE_PACKET);
      }
      getData() {
        return this._data.slice(0, this._length);
      }
      _stringConvertToByteArray(a) {
        if (null == a) return null;
        for (var b = new Uint8Array(a.length), c = 0; c < a.length; c++) b[c] = a.charCodeAt(c);
        return b;
      }
      clean() {}
    }
    exports.default = OutPacket;
    OutPacket.INDEX_SIZE_PACKET = 1;
    cc._RF.pop();
  }, {
    "./PacketHeaderAnalyze": "PacketHeaderAnalyze"
  } ],
  NodeResizer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "47b78nTZ65Nkozgov27lpvd", "NodeResizer");
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
    let NodeResizer = class NodeResizer extends cc.Component {
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
        if (!cc.sys.isBrowser || true) return;
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
    __decorate([ property ], NodeResizer.prototype, "designResolution", void 0);
    __decorate([ property ], NodeResizer.prototype, "fitX", void 0);
    __decorate([ property ], NodeResizer.prototype, "fitY", void 0);
    NodeResizer = __decorate([ ccclass ], NodeResizer);
    exports.default = NodeResizer;
    cc._RF.pop();
  }, {} ],
  PacketHeaderAnalyze: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "20c46EIfchK67TjWzmS1EFh", "PacketHeaderAnalyze");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Network;
    (function(Network) {
      class PacketHeaderAnalyze {
        static getDataSize(a) {
          return this.isBigSize(a) ? this.getIntAt(a, this.BYTE_PACKET_SIZE_INDEX) : this.getUnsignedShortAt(a, this.BYTE_PACKET_SIZE_INDEX);
        }
        static getCmdIdFromData(a) {
          return this.getShortAt(a, 1);
        }
        static isBigSize(a) {
          return this.getBit(a[0], this.BIT_IS_BIG_SIZE_INDEX);
        }
        static isCompress(a) {
          return this.getBit(a[0], this.BIT_IS_COMPRESS_INDEX);
        }
        static getValidSize(a) {
          var b = 0, c = 0;
          if (this.isBigSize(a)) {
            if (length < this.BIG_HEADER_SIZE) return -1;
            b = this.getIntAt(a, this.BYTE_PACKET_SIZE_INDEX);
            c = this.BIG_HEADER_SIZE;
          } else {
            if (length < this.NORMAL_HEADER_SIZE) return -1;
            b = this.getUnsignedShortAt(a, this.BYTE_PACKET_SIZE_INDEX);
            c = this.NORMAL_HEADER_SIZE;
          }
          return b + c;
        }
        static getBit(a, b) {
          return 0 != (a & 1 << b);
        }
        static genHeader(a, b) {
          var c;
          c = this.setBit(0, 7, !0);
          c = this.setBit(c, 6, !1);
          c = this.setBit(c, 5, b);
          c = this.setBit(c, 4, !0);
          return this.setBit(c, 3, a);
        }
        static setBit(a, b, c) {
          return c ? a | 1 << b : a & ~(1 << b);
        }
        static getIntAt(a, b) {
          return ((255 & a[b]) << 24) + ((255 & a[b + 1]) << 16) + ((255 & a[b + 2]) << 8) + ((255 & a[b + 3]) << 0);
        }
        static getUnsignedShortAt(a, b) {
          return ((255 & a[b]) << 8) + ((255 & a[b + 1]) << 0);
        }
        static getShortAt(a, b) {
          return (a[b] << 8) + (255 & a[b + 1]);
        }
      }
      PacketHeaderAnalyze.BIT_IS_BINARY_INDEX = 7;
      PacketHeaderAnalyze.BIT_IS_ENCRYPT_INDEX = 6;
      PacketHeaderAnalyze.BIT_IS_COMPRESS_INDEX = 5;
      PacketHeaderAnalyze.BIT_IS_BLUE_BOXED_INDEX = 4;
      PacketHeaderAnalyze.BIT_IS_BIG_SIZE_INDEX = 3;
      PacketHeaderAnalyze.BYTE_PACKET_SIZE_INDEX = 1;
      PacketHeaderAnalyze.BIG_HEADER_SIZE = 5;
      PacketHeaderAnalyze.NORMAL_HEADER_SIZE = 3;
      Network.PacketHeaderAnalyze = PacketHeaderAnalyze;
    })(Network || (Network = {}));
    exports.default = Network.PacketHeaderAnalyze;
    cc._RF.pop();
  }, {} ],
  PopupCardDefinations: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "73ec1q7e95LNJg633jgtABX", "PopupCardDefinations");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var PopupCardDefinations_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const App_1 = require("../../common/App");
    const Configs_1 = require("../../common/Configs");
    const Dialog_1 = require("../../common/Dialog");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let PopupCardDefinations = PopupCardDefinations_1 = class PopupCardDefinations extends Dialog_1.default {
      constructor() {
        super(...arguments);
        this.cardsContent = null;
        this.cardItem = null;
      }
      static createAndShow(parent, cardDefinations, cardFrames) {
        null == this.instance || null == this.instance.node ? App_1.default.instance.loadPrefabInBundle(Configs_1.default.App.BUNDLE_NAME.MAIN, Configs_1.default.App.UPDATE_INFO[Configs_1.default.App.BUNDLE_NAME.MAIN], true, "Game/res/prefabs/cardgames/PopupCardDefinations", (err, prefab) => {
          if (null != err) {
            App_1.default.instance.alertDialog.showMsg(err);
            return;
          }
          let go = cc.instantiate(prefab);
          go.parent = parent;
          this.instance = go.getComponent(PopupCardDefinations_1);
          this.instance.showAndDrawCards(cardDefinations, cardFrames);
        }) : this.instance.showAndDrawCards(cardDefinations, cardFrames);
      }
      showAndDrawCards(cardDefinations, cardFrames) {
        this.cardsContent.removeAllChildren();
        for (let i = 0; i < cardDefinations.length; i++) {
          let card = cardDefinations[i];
          let item = cc.instantiate(this.cardItem);
          item.getChildByName("cardFace").getComponent(cc.Sprite).spriteFrame = cardFrames[i];
          item.getChildByName("cardName").getComponent(cc.Label).string = card.name;
          item.parent = this.cardsContent;
          item.active = true;
        }
        this.show();
      }
    };
    PopupCardDefinations.instance = null;
    __decorate([ property(cc.Node) ], PopupCardDefinations.prototype, "cardsContent", void 0);
    __decorate([ property(cc.Node) ], PopupCardDefinations.prototype, "cardItem", void 0);
    PopupCardDefinations = PopupCardDefinations_1 = __decorate([ ccclass ], PopupCardDefinations);
    exports.default = PopupCardDefinations;
    cc._RF.pop();
  }, {
    "../../common/App": "App",
    "../../common/Configs": "Configs",
    "../../common/Dialog": "Dialog"
  } ],
  PopupChatInGame: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "409d97ihv9LV6x5eA+YlHTn", "PopupChatInGame");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var PopupChatInGame_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const App_1 = require("../../common/App");
    const Configs_1 = require("../../common/Configs");
    const Dialog_1 = require("../../common/Dialog");
    const CardGameUtils_1 = require("./CardGameUtils");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let PopupChatInGame = PopupChatInGame_1 = class PopupChatInGame extends Dialog_1.default {
      constructor() {
        super(...arguments);
        this.edbChat = null;
        this.emojis = null;
        this.currentCardDefinations = [];
      }
      static createAndShow(parent, cardDefinations, onChatRoom, onCheatCards) {
        null == this.instance || null == this.instance.node ? App_1.default.instance.loadPrefabInBundle(Configs_1.default.App.BUNDLE_NAME.MAIN, Configs_1.default.App.UPDATE_INFO[Configs_1.default.App.BUNDLE_NAME.MAIN], true, "Game/res/prefabs/cardgames/PopupChatInGame", (err, prefab) => {
          if (null != err) {
            App_1.default.instance.alertDialog.showMsg(err);
            return;
          }
          let go = cc.instantiate(prefab);
          go.parent = parent;
          this.instance = go.getComponent(PopupChatInGame_1);
          this.instance.showChatDialog(cardDefinations, onChatRoom, onCheatCards);
        }) : this.instance.showChatDialog(cardDefinations, onChatRoom, onCheatCards);
      }
      start() {
        this.emojis.children.forEach((emoji, i) => {
          let eventHandler = new cc.Component.EventHandler();
          eventHandler.target = this.node;
          eventHandler.component = "PopupChatInGame";
          eventHandler.handler = "sendChatEmotion";
          eventHandler.customEventData = (i + 1).toString();
          emoji.getComponent(cc.Button).clickEvents = [ eventHandler ];
        });
      }
      showChatDialog(cardDefinations, onChatRoom, onCheatCards) {
        this.currentCardDefinations = cardDefinations;
        this.onChatRoom = onChatRoom;
        this.onCheatCards = onCheatCards;
        this.show();
      }
      sendChatEmotion(target, emotionId) {
        this.onChatRoom(1, emotionId);
        this.dismiss();
      }
      sendChatMessage() {
        if (0 === this.edbChat.string.trim().length) return;
        let chatContent = this.edbChat.string;
        let cardCheatIds = CardGameUtils_1.default.getCardCheatIdsFromChat(this.currentCardDefinations, chatContent);
        cardCheatIds ? this.onCheatCards(1, cardCheatIds) : this.onChatRoom(0, chatContent);
        this.edbChat.string = "";
        this.dismiss();
      }
    };
    PopupChatInGame.instance = null;
    __decorate([ property(cc.EditBox) ], PopupChatInGame.prototype, "edbChat", void 0);
    __decorate([ property(cc.Node) ], PopupChatInGame.prototype, "emojis", void 0);
    PopupChatInGame = PopupChatInGame_1 = __decorate([ ccclass ], PopupChatInGame);
    exports.default = PopupChatInGame;
    cc._RF.pop();
  }, {
    "../../common/App": "App",
    "../../common/Configs": "Configs",
    "../../common/Dialog": "Dialog",
    "./CardGameUtils": "CardGameUtils"
  } ],
  PopupSettingInGame: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "27ea8dnIwhPyIoDYNvhMwRS", "PopupSettingInGame");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var PopupSettingInGame_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const App_1 = require("../../common/App");
    const BroadcastReceiver_1 = require("../../common/BroadcastReceiver");
    const Configs_1 = require("../../common/Configs");
    const SPUtils_1 = require("../../common/SPUtils");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let PopupSettingInGame = PopupSettingInGame_1 = class PopupSettingInGame extends cc.Component {
      constructor() {
        super(...arguments);
        this.panel = null;
        this.toggleMusic = null;
        this.toggleSound = null;
        this.animate = false;
      }
      static createAndShow(parent, game, onGuide, onExit) {
        null == this.instance || null == this.instance.node ? App_1.default.instance.loadPrefabInBundle(Configs_1.default.App.BUNDLE_NAME.MAIN, Configs_1.default.App.UPDATE_INFO[Configs_1.default.App.BUNDLE_NAME.MAIN], true, "Game/res/prefabs/cardgames/PopupSettingInGame", (err, prefab) => {
          if (null != err) {
            App_1.default.instance.alertDialog.showMsg(err);
            return;
          }
          let go = cc.instantiate(prefab);
          go.parent = parent;
          this.instance = go.getComponent(PopupSettingInGame_1);
          this.instance.show(game, onGuide, onExit);
        }) : this.instance.show(game, onGuide, onExit);
      }
      onLoad() {
        BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.SET_SOUND, this.node);
      }
      show(game, onGuide, onExit) {
        if (this.animate) return;
        this.animate = true;
        this.node.active = true;
        this.panel.active = true;
        this.panel.stopAllActions();
        this.panel.scaleY = 0;
        this.panel.runAction(cc.sequence(cc.scaleTo(.2, 1).easing(cc.easeBackOut()), cc.callFunc(() => {
          this.animate = false;
        })));
        this.onGuide = onGuide;
        this.onExit = onExit;
        this.onGuide || (this.panel.getChildByName("ButtonGuide").active = false);
        this.toggleMusic.node.off("toggle");
        this.toggleMusic.node.on("toggle", () => {
          SPUtils_1.default.setMusicVolumnByGame(game, this.toggleMusic.isChecked ? 1 : 0);
          BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.ON_AUDIO_CHANGED, game);
        });
        this.toggleSound.node.off("toggle");
        this.toggleSound.node.on("toggle", () => {
          SPUtils_1.default.setSoundVolumnByGame(game, this.toggleSound.isChecked ? 1 : 0);
        });
        this.toggleMusic.isChecked = SPUtils_1.default.getMusicVolumnByGame(game) > 0;
        this.toggleSound.isChecked = SPUtils_1.default.getSoundVolumnByGame(game) > 0;
      }
      dismiss() {
        if (this.animate) return;
        this.animate = true;
        this.panel.stopAllActions();
        this.panel.runAction(cc.sequence(cc.scaleTo(.2, 1, 0).easing(cc.easeBackIn()), cc.callFunc(() => {
          this.node.active = false;
          this.panel.active = false;
          this.animate = false;
        })));
      }
      actGuide() {
        this.onGuide && this.onGuide();
        this.dismiss();
      }
      actExit() {
        this.onExit && this.onExit();
        this.dismiss();
      }
    };
    PopupSettingInGame.instance = null;
    __decorate([ property(cc.Node) ], PopupSettingInGame.prototype, "panel", void 0);
    __decorate([ property(cc.Toggle) ], PopupSettingInGame.prototype, "toggleMusic", void 0);
    __decorate([ property(cc.Toggle) ], PopupSettingInGame.prototype, "toggleSound", void 0);
    PopupSettingInGame = PopupSettingInGame_1 = __decorate([ ccclass ], PopupSettingInGame);
    exports.default = PopupSettingInGame;
    cc._RF.pop();
  }, {
    "../../common/App": "App",
    "../../common/BroadcastReceiver": "BroadcastReceiver",
    "../../common/Configs": "Configs",
    "../../common/SPUtils": "SPUtils"
  } ],
  PushNotification: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2a233zKg5lICqNFGDC7K+MQ", "PushNotification");
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
    let PushNotification = class PushNotification extends cc.Component {
      onLoad() {}
    };
    PushNotification = __decorate([ ccclass ], PushNotification);
    exports.default = PushNotification;
    cc._RF.pop();
  }, {} ],
  Random: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "91ce7IUkVVEnqpB8EDSDCVI", "Random");
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
    let Random = class Random {
      static range(min, max) {
        return Math.random() * (max - min) + min;
      }
      static rangeInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
      }
    };
    Random = __decorate([ ccclass ], Random);
    exports.default = Random;
    cc._RF.pop();
  }, {} ],
  SPUtils: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "59866usg1ZMxINvnUez2Ri1", "SPUtils");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var common;
    (function(common) {
      class SPUtils {
        static encode(s, k) {
          var enc = "";
          var str = "";
          str = s.toString();
          for (var i = 0; i < s.length; i++) {
            var a = s.charCodeAt(i);
            var b = a ^ k;
            enc += String.fromCharCode(b);
          }
          return enc;
        }
        static get(key, defaultValue = "") {
          var keyEncrypted = this.encode(key, 3265812).toString();
          "undefined" === typeof defaultValue && (defaultValue || null);
          var r = cc.sys.localStorage.getItem(keyEncrypted);
          if (r) {
            r = this.encode(r, 3265812).toString();
            return r;
          }
          return defaultValue;
        }
        static set(key, value) {
          value = value.toString();
          var keyEncrypted = "" + this.encode(key, 3265812);
          var valueEncrypted = "" + this.encode(value, 3265812);
          cc.sys.localStorage.setItem(keyEncrypted, valueEncrypted);
        }
        static setUserName(value) {
          this.set("username", value);
        }
        static getUserName() {
          return this.get("username", "");
        }
        static setUserPass(value) {
          this.set("userpass", value);
        }
        static getUserPass() {
          return this.get("userpass", "");
        }
        static getMusicVolumn() {
          return Number(this.get("music_volumn", "1"));
        }
        static setMusicVolumn(volumn) {
          this.set("music_volumn", volumn.toString());
        }
        static getSoundVolumn() {
          return Number(this.get("sound_volumn", "1"));
        }
        static setSoundVolumn(volumn) {
          this.set("sound_volumn", volumn.toString());
        }
        static getMusicVolumnByGame(game) {
          return Number(this.get("music_volumn_" + game, "1"));
        }
        static setMusicVolumnByGame(game, volumn) {
          this.set("music_volumn_" + game, volumn.toString());
        }
        static getSoundVolumnByGame(game) {
          return Number(this.get("sound_volumn_" + game, "1"));
        }
        static setSoundVolumnByGame(game, volumn) {
          this.set("sound_volumn_" + game, volumn.toString());
        }
        static setShowAnim(value) {
          this.set("mode_anim", value);
        }
        static getShowAnim() {
          return this.get("mode_anim", "true");
        }
        static setNicknameTransfer(value) {
          this.set("nicknametransfer", value);
        }
        static getNicknameTransfer() {
          return this.get("nicknametransfer", "");
        }
        static setMomoInfo(value) {
          this.set("momoinfo", value);
        }
        static getMomoInfo() {
          return this.get("momoinfo", "");
        }
        static setBankInfo(value) {
          this.set("bankinfo", value);
        }
        static getBankInfo() {
          return this.get("bankinfo", "");
        }
      }
      common.SPUtils = SPUtils;
    })(common || (common = {}));
    exports.default = common.SPUtils;
    cc._RF.pop();
  }, {} ],
  SamNetworkClient: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "54befXq1/NIeqwcU/H8L6Fx", "SamNetworkClient");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const CardGameNetworkClient_1 = require("./CardGameNetworkClient");
    const Configs_1 = require("../common/Configs");
    class SamNetworkClient extends CardGameNetworkClient_1.default {
      static getInstance() {
        null == this.instance && (this.instance = new SamNetworkClient());
        return this.instance;
      }
      constructor() {
        super();
      }
      _connect() {
        super.connect(Configs_1.default.App.HOST_SAM.host, Configs_1.default.App.HOST_SAM.port);
      }
      onOpen(ev) {
        super.onOpen(ev);
      }
    }
    exports.default = SamNetworkClient;
    cc._RF.pop();
  }, {
    "../common/Configs": "Configs",
    "./CardGameNetworkClient": "CardGameNetworkClient"
  } ],
  ScaleScreen: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1a4328VyYdOY76EmkFiuYxI", "ScaleScreen");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.AlignMode = exports.ScaleScreenType = void 0;
    const {ccclass: ccclass, property: property} = cc._decorator;
    var ScaleScreenType;
    (function(ScaleScreenType) {
      ScaleScreenType[ScaleScreenType["FIT_IN"] = 0] = "FIT_IN";
      ScaleScreenType[ScaleScreenType["FIT_OUT"] = 1] = "FIT_OUT";
    })(ScaleScreenType = exports.ScaleScreenType || (exports.ScaleScreenType = {}));
    var AlignMode;
    (function(AlignMode) {
      AlignMode[AlignMode["ONCE"] = 0] = "ONCE";
      AlignMode[AlignMode["ALWAYS"] = 1] = "ALWAYS";
      AlignMode[AlignMode["ON_SCREEN_RESIZE"] = 2] = "ON_SCREEN_RESIZE";
    })(AlignMode = exports.AlignMode || (exports.AlignMode = {}));
    let ScaleScreen = class ScaleScreen extends cc.Component {
      constructor() {
        super(...arguments);
        this.fitWidth = false;
        this.fitHeight = false;
        this.scaleType = ScaleScreenType.FIT_IN;
        this.heightDegree = 0;
        this.widthDegree = 0;
        this.alignMode = AlignMode.ONCE;
      }
      start() {
        this.doScale();
      }
      doScale() {
        if (!this.node) return;
        let scaleFactorX = cc.winSize.width / (this.node.width + this.widthDegree);
        let scaleFactorY = cc.winSize.height / (this.node.height + this.heightDegree);
        this.fitWidth && !this.fitHeight && (this.node.scale = scaleFactorX);
        this.fitHeight && !this.fitWidth && (this.node.scale = scaleFactorY);
        this.fitWidth && this.fitHeight && (this.scaleType == ScaleScreenType.FIT_IN ? this.node.scale = scaleFactorX < scaleFactorY ? scaleFactorX : scaleFactorY : this.scaleType == ScaleScreenType.FIT_OUT && (this.node.scale = scaleFactorX > scaleFactorY ? scaleFactorX : scaleFactorY));
      }
      update() {
        if (cc.sys.isNative || this.alignMode !== AlignMode.ALWAYS) return;
        this.doScale();
      }
    };
    __decorate([ property(cc.Boolean) ], ScaleScreen.prototype, "fitWidth", void 0);
    __decorate([ property(cc.Boolean) ], ScaleScreen.prototype, "fitHeight", void 0);
    __decorate([ property({
      type: cc.Enum(ScaleScreenType)
    }) ], ScaleScreen.prototype, "scaleType", void 0);
    __decorate([ property(cc.Integer) ], ScaleScreen.prototype, "heightDegree", void 0);
    __decorate([ property(cc.Integer) ], ScaleScreen.prototype, "widthDegree", void 0);
    __decorate([ property({
      type: cc.Enum(AlignMode)
    }) ], ScaleScreen.prototype, "alignMode", void 0);
    ScaleScreen = __decorate([ ccclass ], ScaleScreen);
    exports.default = ScaleScreen;
    cc._RF.pop();
  }, {} ],
  ShootFishNetworkClient: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "67b32TSLuBDyITpP+LjS3tz", "ShootFishNetworkClient");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var ShootFishNetworkClient_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Configs_1 = require("../common/Configs");
    const App_1 = require("../common/App");
    const {ccclass: ccclass, property: property} = cc._decorator;
    class NotifyListener {
      constructor(target, callback) {
        this.target = target;
        this.callback = callback;
      }
    }
    class RequestListener {
      constructor(target, callback) {
        this.target = target;
        this.callback = callback;
      }
    }
    class NetworkListener {
      constructor(target, callback) {
        this.target = target;
        this.callback = callback;
      }
    }
    let ShootFishNetworkClient = ShootFishNetworkClient_1 = class ShootFishNetworkClient {
      constructor() {
        this.isUseWSS = true;
        this.isAutoReconnect = true;
        this.ws = null;
        this.host = Configs_1.default.App.HOST_SHOOT_FISH.host;
        this.port = Configs_1.default.App.HOST_SHOOT_FISH.port;
        this.isForceClose = false;
        this.onOpenes = [];
        this.onCloses = [];
        this.xorKey = "dmVyeSBzZWNyZXQ";
        this.requests = new Object();
        this.intervalPing = -1;
        this.listeners = new Array();
        this.isLogining = false;
        this.isLogined = false;
        this.onLogined = null;
      }
      static serverCurrentTimeMillis() {
        return Date.now() - this.TIME_DISTANCE + Math.round(ShootFishNetworkClient_1.MIN_PING / 2);
      }
      static systemCurrentTimeMillis() {
        return Date.now();
      }
      static getInstance() {
        null == this.instance && (this.instance = new ShootFishNetworkClient_1());
        return this.instance;
      }
      checkConnect(onLogined) {
        this.onLogined = onLogined;
        if (this.isConnected()) this.isLogined ? this.onLogined(this.isLogined) : this.login(); else {
          cc.log("*** name", cc.director.getScene().name);
          "ShootFish" == cc.director.getScene().name && App_1.default.instance.showErrLoading("\u0110ang k\u1ebft n\u1ed1i t\u1edbi server...");
          this.connect();
        }
      }
      login() {
        if (this.isLogining) return;
        this.isLogining = true;
        "ShootFish" == cc.director.getScene().name && App_1.default.instance.showErrLoading("\u0110ang \u0111\u0103ng nh\u1eadp...");
        this.request("xxenglogin", {
          username: Configs_1.default.Login.isSocialLogin ? Configs_1.default.Login.socialSource : Configs_1.default.Login.Username,
          password: Configs_1.default.Login.isSocialLogin ? Configs_1.default.Login.socialToken : md5(Configs_1.default.Login.Password),
          platform: Configs_1.default.Login.isSocialLogin ? "banca_token" : Configs_1.default.App.getPlatformName()
        }, res => {
          this.isLogining = false;
          App_1.default.instance.showLoading(false);
          console.log(res);
          if (!res["ok"]) {
            null != this.onLogined && this.onLogined(false);
            return;
          }
          console.log("login oke");
          this.isLogined = true;
          Configs_1.default.Login.CoinFish = res["cash"];
          Configs_1.default.Login.UsernameFish = res["username"];
          Configs_1.default.Login.PasswordFish = res["password"];
          Configs_1.default.Login.UserIdFish = res["userId"];
          Configs_1.default.Login.FishConfigs = res["config"];
          null != this.onLogined && this.onLogined(true);
        }, ShootFishNetworkClient_1.NODE_FIXED);
      }
      onOpen(ev) {
        console.log("onOpen");
        this.intervalPing = setInterval(() => this.ping(), 3e3);
        this.ping();
        for (let i = 0; i < this.onOpenes.length; i++) {
          let listener = this.onOpenes[i];
          if (listener.target && listener.target instanceof Object && listener.target.node) listener.callback(); else {
            this.onOpenes.splice(i, 1);
            i--;
          }
        }
        null != this.onLogined && this.login();
      }
      onMessage(ev) {
        let data = new Uint8Array(ev.data);
        data = this.doXOR(data, 0, data.length);
        let pack = msgpack.decode(data);
        if (pack.hasOwnProperty("msgId")) if (0 == pack["msgId"]) for (let i = 0; i < this.listeners.length; i++) {
          let listener = this.listeners[i];
          if (listener.target && listener.target instanceof Object && listener.target.node) listener.callback(pack["route"], pack["data"]); else {
            this.listeners.splice(i, 1);
            i--;
          }
        } else if (this.requests.hasOwnProperty(pack["msgId"])) {
          let listener = this.requests[pack["msgId"]];
          listener.target && listener.target instanceof Object && listener.target.node && listener.callback(pack["data"]);
          delete this.requests[pack["msgId"]];
        }
      }
      onError(ev) {
        console.log("onError");
      }
      onClose(ev) {
        console.log("onClose");
        this.intervalPing > 0 && clearInterval(this.intervalPing);
        for (var i = 0; i < this.onCloses.length; i++) {
          var listener = this.onCloses[i];
          if (listener.target && listener.target instanceof Object && listener.target.node) listener.callback(); else {
            this.onCloses.splice(i, 1);
            i--;
          }
        }
        this.isAutoReconnect && !this.isForceClose && setTimeout(() => {
          this.isForceClose || this.connect();
        }, 2e3);
      }
      send(msg) {
        if (!this.isConnected()) return;
        let source = msgpack.encode(msg);
        source = this.doXOR(source, 0, source.length);
        this.ws.send(source);
      }
      doXOR(source, start, count) {
        let index = 0;
        let end = start + count;
        for (let i = start; i < end; i++) {
          source[i] = source[i] ^ Number(this.xorKey.charAt(index % this.xorKey.length));
          index++;
        }
        return source;
      }
      connect() {
        console.log("start connect: " + this.host + ":" + this.port);
        this.isForceClose = false;
        if (null == this.ws) if (this.isUseWSS) if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) cc.assetManager.loadBundle("raw", (error, bundle) => {
          if (error) {
            cc.log("Load bundle raw error");
            return;
          }
          bundle.load("cacert", cc.Asset, (err, cacert) => {
            if (err) {
              cc.log("Load cacert error");
              return;
            }
            let url = cacert.nativeUrl;
            this.ws = new (Function.prototype.bind.apply(WebSocket, [ null, "wss://" + this.host + ":" + this.port, [], url ]))();
            this.ws.binaryType = "arraybuffer";
            this.ws.onopen = this.onOpen.bind(this);
            this.ws.onmessage = this.onMessage.bind(this);
            this.ws.onerror = this.onError.bind(this);
            this.ws.onclose = this.onClose.bind(this);
          });
        }); else {
          this.ws = new WebSocket("wss://" + this.host + ":" + this.port);
          this.ws.binaryType = "arraybuffer";
          this.ws.onopen = this.onOpen.bind(this);
          this.ws.onmessage = this.onMessage.bind(this);
          this.ws.onerror = this.onError.bind(this);
          this.ws.onclose = this.onClose.bind(this);
        } else {
          this.ws = new WebSocket("ws://" + this.host + ":" + this.port);
          this.ws.binaryType = "arraybuffer";
          this.ws.onopen = this.onOpen.bind(this);
          this.ws.onmessage = this.onMessage.bind(this);
          this.ws.onerror = this.onError.bind(this);
          this.ws.onclose = this.onClose.bind(this);
        } else if (this.ws.readyState !== WebSocket.OPEN) {
          this.ws.close();
          this.ws = null;
          this.connect();
        }
      }
      addOnOpen(callback, target) {
        this.onOpenes.push(new NetworkListener(target, callback));
      }
      addOnClose(callback, target) {
        this.onCloses.push(new NetworkListener(target, callback));
      }
      close() {
        this.isForceClose = true;
        this.ws && this.ws.close();
      }
      isConnected() {
        if (this.ws) return this.ws.readyState == WebSocket.OPEN;
        return false;
      }
      addListener(callback, target) {
        this.listeners.push(new NotifyListener(target, callback));
      }
      request(route, data, callback, target) {
        ShootFishNetworkClient_1.reqId++;
        ShootFishNetworkClient_1.reqId > 64999 && (ShootFishNetworkClient_1.reqId = 1);
        this.requests[ShootFishNetworkClient_1.reqId] = new RequestListener(target, callback);
        this.send({
          data: "object" == typeof data && null != data && data ? data : {},
          msgId: ShootFishNetworkClient_1.reqId,
          route: route
        });
      }
      notify(route, data) {
        this.send({
          data: "object" == typeof data && null != data && data ? data : {},
          msgId: 0,
          route: route
        });
      }
      ping(callback = null, target = null) {
        let t = Date.now();
        this.request("ping", null, res => {
          ShootFishNetworkClient_1.PING = Date.now() - t;
          if (ShootFishNetworkClient_1.MIN_PING < 0 || ShootFishNetworkClient_1.PING < ShootFishNetworkClient_1.MIN_PING) {
            ShootFishNetworkClient_1.MIN_PING = ShootFishNetworkClient_1.PING;
            ShootFishNetworkClient_1.TIME_DISTANCE = Date.now() - res["time"];
          }
          null != callback && callback();
        }, null != target ? target : ShootFishNetworkClient_1.NODE_FIXED);
      }
    };
    ShootFishNetworkClient.reqId = 0;
    ShootFishNetworkClient.MIN_PING = -1;
    ShootFishNetworkClient.PING = 0;
    ShootFishNetworkClient.TIME_DISTANCE = 0;
    ShootFishNetworkClient.NODE_FIXED = new cc.Node().addComponent(cc.Sprite);
    ShootFishNetworkClient = ShootFishNetworkClient_1 = __decorate([ ccclass ], ShootFishNetworkClient);
    exports.default = ShootFishNetworkClient;
    cc._RF.pop();
  }, {
    "../common/App": "App",
    "../common/Configs": "Configs"
  } ],
  SlotNetworkClient: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fa6a5HiidJFNohMYqtMHOjk", "SlotNetworkClient");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Network_NetworkClient_1 = require("./Network.NetworkClient");
    const Network_NetworkListener_1 = require("./Network.NetworkListener");
    const Configs_1 = require("../common/Configs");
    const Network_Cmd_1 = require("./Network.Cmd");
    const Network_InPacket_1 = require("./Network.InPacket");
    const BroadcastReceiver_1 = require("../common/BroadcastReceiver");
    class SlotNetworkClient extends Network_NetworkClient_1.default {
      constructor() {
        super();
        this.listeners = new Array();
        this.isLogin = false;
        this.onLogined = null;
        this.isUseWSS = Configs_1.default.App.USE_WSS;
      }
      static getInstance() {
        null == this.instance && (this.instance = new SlotNetworkClient());
        return this.instance;
      }
      checkConnect(onLogined) {
        this.onLogined = onLogined;
        if (null != this.ws && this.ws.readyState == WebSocket.CONNECTING) return;
        if (!this.isConnected()) {
          this.connect();
          return;
        }
        this.isLogin && null != this.onLogined && this.onLogined();
      }
      connect() {
        super.connect(Configs_1.default.App.HOST_SLOT.host, Configs_1.default.App.HOST_SLOT.port);
      }
      onOpen(ev) {
        super.onOpen(ev);
        this.send(new Network_Cmd_1.default.SendLogin(Configs_1.default.Login.Nickname, Configs_1.default.Login.AccessToken));
      }
      onMessage(ev) {
        var data = new Uint8Array(ev.data);
        for (var i = 0; i < this.listeners.length; i++) {
          var listener = this.listeners[i];
          if (listener.target && listener.target instanceof Object && listener.target.node) listener.callback(data); else {
            this.listeners.splice(i, 1);
            i--;
          }
        }
        let inpacket = new Network_InPacket_1.default(data);
        switch (inpacket.getCmdId()) {
         case Network_Cmd_1.default.Code.LOGIN:
          this.isLogin = true;
          null != this.onLogined && this.onLogined();
        }
      }
      addListener(callback, target) {
        this.listeners.push(new Network_NetworkListener_1.default(target, callback));
      }
      send(packet) {
        cc.log("send ", packet);
        for (var b = new Int8Array(packet._length), c = 0; c < packet._length; c++) b[c] = packet._data[c];
        if (null != this.ws && this.isConnected()) {
          this.ws.send(b.buffer);
          BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.SLOT_WS_SEND, packet._cmdId);
        }
      }
      sendCheck(packet) {
        this.checkConnect(() => {
          this.send(packet);
        });
      }
    }
    exports.default = SlotNetworkClient;
    cc._RF.pop();
  }, {
    "../common/BroadcastReceiver": "BroadcastReceiver",
    "../common/Configs": "Configs",
    "./Network.Cmd": "Network.Cmd",
    "./Network.InPacket": "Network.InPacket",
    "./Network.NetworkClient": "Network.NetworkClient",
    "./Network.NetworkListener": "Network.NetworkListener"
  } ],
  SubpackageDownloader: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "42427g+lbNAIayqS7v03+/v", "SubpackageDownloader");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Configs_1 = require("./Configs");
    const {ccclass: ccclass, property: property} = cc._decorator;
    var common;
    (function(common) {
      var SubpackageDownloader_1;
      let SubpackageDownloader = SubpackageDownloader_1 = class SubpackageDownloader {
        constructor() {
          this.isDownloading = false;
          this._storagePath = "";
          this.failCount = 0;
        }
        static getInstance() {
          null == this.instance && (this.instance = new SubpackageDownloader_1());
          return this.instance;
        }
        _downloadSubpackage(name, callbacks) {
          if (this.isDownloading) return;
          console.log("CC_JSB: false");
          console.log("CC_DEBUG: true");
          console.log("CC_DEV: false");
          console.log("CC_EDITOR: false");
          console.log("CC_PREVIEW: false");
          console.log("CC_TEST: false");
          console.log("CC_BUILD: true");
          false;
          callbacks(null, 0);
        }
        checkUpdate(name, callbacks) {
          var versionCompareHandle = (versionA, versionB) => {
            console.log("JS Custom Version Compare: version A is " + versionA + ", version B is " + versionB);
            var vA = versionA.split(".");
            var vB = versionB.split(".");
            for (var i = 0; i < vA.length; ++i) {
              var a = parseInt(vA[i]);
              var b = parseInt(vB[i] || 0);
              if (a === b) continue;
              return a - b;
            }
            return vB.length > vA.length ? -1 : 0;
          };
          let t = Date.now();
          var customManifestStr = JSON.stringify({
            packageUrl: Configs_1.default.App.SUBPACKAGE_URL + name + "/",
            remoteManifestUrl: Configs_1.default.App.SUBPACKAGE_URL + name + "/project.manifest?t=" + t,
            remoteVersionUrl: Configs_1.default.App.SUBPACKAGE_URL + name + "/version.manifest?t=" + t,
            version: "1.9.4"
          });
          console.log(customManifestStr);
          this._am = new jsb.AssetsManager("", this._storagePath, versionCompareHandle);
          if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
            var manifest = new jsb.Manifest(customManifestStr, this._storagePath);
            this._am.loadLocalManifest(manifest, this._storagePath);
          }
          this._am.setEventCallback(event => {
            switch (event.getEventCode()) {
             case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
              console.log("No local manifest file found, hot update skipped.");
              callbacks("No local manifest file found, hot update skipped.", 0);
              break;

             case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
             case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
              console.log("Fail to download manifest file, hot update skipped.");
              callbacks("Fail to download manifest file, hot update skipped.", 0);
              break;

             case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
              console.log("Already up to date with the latest remote version 1.");
              callbacks(null, 0);
              break;

             case jsb.EventAssetsManager.NEW_VERSION_FOUND:
              console.log("New version found, please try to update.");
              this._am.update();
              break;

             case jsb.EventAssetsManager.UPDATE_PROGRESSION:
              console.log("files: " + event.getDownloadedFiles() + " / " + event.getTotalFiles());
              console.log("bytes: " + event.getTotalBytes() + " / " + event.getDownloadedBytes());
              console.log("event.getPercent(): " + event.getPercent());
              var progress = Number(event.getDownloadedBytes() / event.getTotalBytes());
              callbacks("progress", progress);
              break;

             case jsb.EventAssetsManager.UPDATE_FINISHED:
              callbacks(null, 0);
              break;

             case jsb.EventAssetsManager.UPDATE_FAILED:
              console.log("Update failed. " + event.getMessage());
              this.failCount < 5 ? this._am.downloadFailedAssets() : callbacks("Update failed. " + event.getMessage(), 0);
              this.failCount++;
              break;

             case jsb.EventAssetsManager.ERROR_UPDATING:
              console.log("Asset update error: " + event.getAssetId() + ", " + event.getMessage());
              break;

             case jsb.EventAssetsManager.ERROR_DECOMPRESS:
              console.log("Decompress error: " + event.getMessage());
              callbacks("Decompress error: " + event.getMessage(), 0);
              break;

             default:
              return;
            }
          });
          this._am.checkUpdate();
        }
        static downloadSubpackage(name, callbacks) {
          this.getInstance()._downloadSubpackage(name, callbacks);
        }
      };
      SubpackageDownloader.instance = null;
      SubpackageDownloader = SubpackageDownloader_1 = __decorate([ ccclass ], SubpackageDownloader);
      common.SubpackageDownloader = SubpackageDownloader;
    })(common || (common = {}));
    exports.default = common.SubpackageDownloader;
    cc._RF.pop();
  }, {
    "./Configs": "Configs"
  } ],
  TXMD5NetworkClient: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "560cdTVHw5GU617XGWrbco/", "TXMD5NetworkClient");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Network_NetworkClient_1 = require("./Network.NetworkClient");
    const Network_NetworkListener_1 = require("./Network.NetworkListener");
    const Configs_1 = require("../common/Configs");
    const Network_InPacket_1 = require("./Network.InPacket");
    const Network_Cmd_1 = require("./Network.Cmd");
    class TXMD5NetworkClient extends Network_NetworkClient_1.default {
      constructor() {
        super();
        this.listeners = new Array();
        this.isLogin = false;
        this.onLogined = null;
        this.isUseWSS = Configs_1.default.App.USE_WSS;
      }
      static getInstance() {
        null == this.instance && (this.instance = new TXMD5NetworkClient());
        return this.instance;
      }
      checkConnect(onLogined = null) {
        this.onLogined = onLogined;
        if (null != this.ws && this.ws.readyState == WebSocket.CONNECTING) return;
        if (!this.isConnected()) {
          this.connect();
          return;
        }
        this.isLogin && null != this.onLogined && this.onLogined();
      }
      connect() {
        super.connect(Configs_1.default.App.HOST_TAI_XIU_MD5.host, Configs_1.default.App.HOST_TAI_XIU_MD5.port);
      }
      onOpen(ev) {
        super.onOpen(ev);
        this.send(new Network_Cmd_1.default.SendLogin(Configs_1.default.Login.Nickname, Configs_1.default.Login.AccessToken));
      }
      onMessage(ev) {
        var data = new Uint8Array(ev.data);
        for (var i = 0; i < this.listeners.length; i++) {
          var listener = this.listeners[i];
          if (listener.target && listener.target instanceof Object && listener.target.node) listener.callback(data); else {
            this.listeners.splice(i, 1);
            i--;
          }
        }
        let inpacket = new Network_InPacket_1.default(data);
        switch (inpacket.getCmdId()) {
         case Network_Cmd_1.default.Code.LOGIN:
          this.isLogin = true;
          null != this.onLogined && this.onLogined();
        }
      }
      addListener(callback, target) {
        this.listeners.push(new Network_NetworkListener_1.default(target, callback));
      }
      send(packet) {
        for (var b = new Int8Array(packet._length), c = 0; c < packet._length; c++) b[c] = packet._data[c];
        null != this.ws && this.isConnected() && this.ws.send(b.buffer);
      }
      sendCheck(packet) {
        this.checkConnect(() => {
          this.send(packet);
        });
      }
    }
    exports.default = TXMD5NetworkClient;
    cc._RF.pop();
  }, {
    "../common/Configs": "Configs",
    "./Network.Cmd": "Network.Cmd",
    "./Network.InPacket": "Network.InPacket",
    "./Network.NetworkClient": "Network.NetworkClient",
    "./Network.NetworkListener": "Network.NetworkListener"
  } ],
  TienLenNetworkClient: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ace2fOmXkREULE7CCaicJmQ", "TienLenNetworkClient");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const CardGameNetworkClient_1 = require("./CardGameNetworkClient");
    const Configs_1 = require("../common/Configs");
    class TienLenNetworkClient extends CardGameNetworkClient_1.default {
      static getInstance() {
        null == this.instance && (this.instance = new TienLenNetworkClient());
        return this.instance;
      }
      constructor() {
        super();
      }
      _connect() {
        super.connect(Configs_1.default.App.HOST_TLMN.host, Configs_1.default.App.HOST_TLMN.port);
      }
      onOpen(ev) {
        super.onOpen(ev);
      }
    }
    exports.default = TienLenNetworkClient;
    cc._RF.pop();
  }, {
    "../common/Configs": "Configs",
    "./CardGameNetworkClient": "CardGameNetworkClient"
  } ],
  TimeUtils: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "761c4r7fCZLrIcT4qTFRPgo", "TimeUtils");
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
    let TimeUtils = class TimeUtils {
      static currentTimeMillis() {
        return Date.now();
      }
      static serverTime() {
        return Math.ceil(this.currentTimeMillis() - this.minDistanceTime + this.minPing / 2);
      }
    };
    TimeUtils.ping = 0;
    TimeUtils.minPing = -1;
    TimeUtils.minDistanceTime = 0;
    TimeUtils = __decorate([ ccclass ], TimeUtils);
    exports.default = TimeUtils;
    cc._RF.pop();
  }, {} ],
  Toast: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4ebd2fu091Po6VLGPfN6OLx", "Toast");
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
    let Toast = class Toast extends cc.Component {
      constructor() {
        super(...arguments);
        this.lbMessage = null;
      }
      showToast(message, time = .5, timeFade = .5, d = 80) {
        cc.Tween.stopAllByTarget(this.node);
        this.node.active = true;
        this.node.opacity = 0;
        this.node.setPosition(cc.Vec3.ZERO);
        this.node.setScale(0, 1);
        this.lbMessage.string = message;
        this.node.width = this.lbMessage.node.width + 50;
        cc.tween(this.node).to(timeFade, {
          opacity: 255,
          scale: 1
        }, {
          easing: cc.easing.backOut
        }).by(time, {
          position: cc.v3(0, d)
        }).delay(time / 2).to(time / 2, {
          opacity: 0
        }, {
          easing: cc.easing.sineIn
        }).call(() => {
          this.node.active = false;
        }).start();
      }
    };
    __decorate([ property(cc.Label) ], Toast.prototype, "lbMessage", void 0);
    Toast = __decorate([ ccclass ], Toast);
    exports.default = Toast;
    cc._RF.pop();
  }, {} ],
  Tween: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b463e/ybFpMl6HKyeG5WLZz", "Tween");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Utils_1 = require("./Utils");
    const {ccclass: ccclass, property: property} = cc._decorator;
    var common;
    (function(common) {
      var Tween_1;
      class TweenListener {
        constructor() {
          this.target = null;
          this.duration = 0;
          this.curDuration = 0;
          this.callback = null;
        }
      }
      common.TweenListener = TweenListener;
      let Tween = Tween_1 = class Tween extends cc.Component {
        constructor() {
          super(...arguments);
          this.skeepFrame = false;
          this.countSkeep = 1;
          this.curCountSkeep = 0;
          this.delta = 0;
        }
        static getInstance() {
          if (null == this.instance) {
            let node = new cc.Node();
            node.name = "Tween";
            cc.game.addPersistRootNode(node);
            this.instance = node.addComponent(Tween_1);
          }
          return this.instance;
        }
        update(dt) {
          if (this.skeepFrame) {
            this.curCountSkeep++;
            this.delta += dt;
            if (this.curCountSkeep >= this.countSkeep) {
              this.curCountSkeep = 0;
              this.skeepFrame = false;
            }
            return;
          }
          for (var i = 0; i < Tween_1.listeners.length; i++) {
            let listener = Tween_1.listeners[i];
            if (listener.target && listener.target instanceof cc.Component && listener.target.node) {
              listener.curDuration = Math.min(listener.duration, listener.curDuration + dt + this.delta);
              listener.callback(listener.curDuration / listener.duration);
              listener.curDuration >= listener.duration && Tween_1.listeners.splice(i--, 1);
            } else Tween_1.listeners.splice(i--, 1);
          }
          this.skeepFrame = true;
          this.delta = 0;
        }
        static numberTo(label, toNumber, duration, format = (n => Utils_1.default.formatNumber(n))) {
          this.getInstance();
          if (!cc.isValid(label)) return;
          let listener = null;
          for (var i = 0; i < Tween_1.listeners.length; i++) {
            let _listener = Tween_1.listeners[i];
            if (_listener.target == label) {
              listener = _listener;
              break;
            }
          }
          if (null == listener) {
            listener = new TweenListener();
            this.listeners.push(listener);
          }
          try {
            let startNumber = Utils_1.default.stringToInt(label.string);
            let distance = toNumber - startNumber;
            listener.curDuration = 0;
            listener.duration = duration;
            listener.target = label;
            listener.callback = p => {
              label.string = format(parseInt("" + (startNumber + distance * p)));
            };
          } catch (error) {
            cc.log("function numberTo :", error.message);
          }
        }
      };
      Tween.instance = null;
      Tween.listeners = new Array();
      Tween = Tween_1 = __decorate([ ccclass ], Tween);
      common.Tween = Tween;
    })(common || (common = {}));
    exports.default = common.Tween;
    cc._RF.pop();
  }, {
    "./Utils": "Utils"
  } ],
  Utils: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e86efcy15xCqJ8SuQDPKLzT", "Utils");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.common = void 0;
    const AuthorizationController_1 = require("../../../Lobby/src/Authorization/AuthorizationController");
    const Configs_1 = require("./Configs");
    const LIST_COLOR_VIP = {
      VIP_10: "#d2ff00",
      VIP_9: "#ff6ec3",
      VIP_8: "#fecb00",
      VIP_7: "#e075ff",
      VIP_6: "#00fffa",
      VIP_5: "#ff0b68",
      VIP_4: "#b763ff",
      VIP_3: "#68e4ff",
      VIP_2: "#fe4e00",
      VIP_1: "#a2a2ec",
      VIP_0: "#e19565"
    };
    const {ccclass: ccclass, property: property} = cc._decorator;
    var common;
    (function(common) {
      class Utils {
        static degreesToVec2(degrees) {
          return Utils.radianToVec2(degrees * Utils.Deg2Rad);
        }
        static radianToVec2(radian) {
          return cc.v2(Math.cos(radian), Math.sin(radian));
        }
        static numberToEnum(value, typeEnum) {
          return typeEnum[typeEnum[value]];
        }
        static loadSpriteFrameFromBase64(base64, callback) {
          let img = new Image();
          img.onload = function() {
            let texture = new cc.Texture2D();
            texture.initWithElement(img);
            texture.handleLoadedTexture();
            let sp = new cc.SpriteFrame(texture);
            callback(sp);
          }.bind(this);
          img.src = "data:image/png;base64," + base64;
        }
        static formatNumber(n) {
          return n.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
        }
        static formatMoney(money, isK = false) {
          const lookup = [ {
            value: 1,
            symbol: ""
          }, {
            value: 1e3,
            symbol: "k"
          }, {
            value: 1e6,
            symbol: "M"
          }, {
            value: 1e9,
            symbol: "B"
          }, {
            value: 1e12,
            symbol: "T"
          }, {
            value: 1e15,
            symbol: "P"
          }, {
            value: 1e18,
            symbol: "E"
          } ];
          const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
          var item = lookup.slice().reverse().find(function(item) {
            return money >= item.value;
          });
          return item ? (money / item.value).toFixed(1).replace(rx, "$1") + item.symbol : "0";
        }
        static formatNumberMin(n) {
          if (n >= 1e9) {
            n = Math.ceil(n / 1e9);
            return this.formatNumber(n) + "B";
          }
          if (n >= 1e6) {
            n = Math.ceil(n / 1e6);
            return this.formatNumber(n) + "M";
          }
          if (n >= 1e3) {
            n = Math.ceil(n / 1e3);
            return this.formatNumber(n) + "K";
          }
          return this.formatNumber(n);
        }
        static formatMoneyChip(money) {
          let format = "";
          let mo = Math.abs(money);
          if (mo >= 1e9) {
            mo /= 1e9;
            format = "b";
          } else if (mo >= 1e6) {
            mo /= 1e6;
            format = "m";
          } else {
            if (!(mo >= 1e3)) return this.formatNumber(money);
            mo /= 1e3;
            format = "k";
          }
          return money < 0 ? "-" + mo.toFixed(2) + format : mo.toFixed(2) + format;
        }
        static stringToInt(s) {
          var n = parseInt(s.replace(/\./g, "").replace(/,/g, ""));
          isNaN(n) && (n = 0);
          return n;
        }
        static stringMoneyToInt(s) {
          const lookup = [ {
            symbol: 1e3,
            value: "k"
          }, {
            symbol: 1e6,
            value: "M"
          }, {
            symbol: 1e9,
            value: "B"
          }, {
            symbol: 1e12,
            value: "T"
          }, {
            symbol: 1e15,
            value: "P"
          }, {
            symbol: 1e18,
            value: "E"
          } ];
          var item = lookup.slice().find(function(item) {
            return s.includes(item.value);
          });
          var n = parseFloat(s) * (item ? item.symbol : 1);
          isNaN(n) && (n = 0);
          return parseInt(n.toString());
        }
        static randomRangeInt(min, max) {
          return Math.floor(Math.random() * (max - min)) + min;
        }
        static randomRange(min, max) {
          return Math.random() * (max - min) + min;
        }
        static v2Distance(v1, v2) {
          return Math.sqrt(Math.pow(v2.x - v1.x, 2) + Math.pow(v2.y - v1.y, 2));
        }
        static v2Degrees(v1, v2) {
          return 180 * Math.atan2(v2.y - v1.y, v2.x - v1.x) / Math.PI;
        }
        static dateToYYYYMMdd(date) {
          var mm = date.getMonth() + 1;
          var dd = date.getDate();
          return [ date.getFullYear(), (mm > 9 ? "" : "0") + mm, (dd > 9 ? "" : "0") + dd ].join("-");
        }
        static dateToYYYYMM(date) {
          var mm = date.getMonth() + 1;
          var dd = date.getDate();
          return [ date.getFullYear(), (mm > 9 ? "" : "0") + mm ].join("-");
        }
        static removeDups(array) {
          var unique = {};
          array.forEach(function(i) {
            unique[i] || (unique[i] = true);
          });
          return Object.keys(unique);
        }
        static copyToClipboard(str) {
          cc.sys.isNative ? jsb.copyTextToClipboard(str) : Utils.webCopyToClipboard(str);
        }
        static webCopyToClipboard(input) {
          const element = document.createElement("textarea");
          element.value = input;
          element.setAttribute("readonly", "");
          element.style.position = "absolute";
          element.style.left = "-9999px";
          element.style.fontSize = "12pt";
          const selection = document.getSelection();
          let originalRange;
          selection.rangeCount > 0 && (originalRange = selection.getRangeAt(0));
          document.body.append(element);
          element.select();
          element.selectionStart = 0;
          element.selectionEnd = input.length;
          let isSuccess = false;
          try {
            isSuccess = document.execCommand("copy");
          } catch (_) {}
          element.remove();
          if (originalRange) {
            selection.removeAllRanges();
            selection.addRange(originalRange);
          }
          return isSuccess;
        }
        static pasteFromClipboard(output) {
          let nativeFunctionName = Configs_1.default.App.NATIVE_FUNC["pasteFromClipboard"] || "pasteFromClipboard";
          cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID ? output.string = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/" + (Configs_1.default.App.NATIVE_CLASS["android"] || "AppActivity"), nativeFunctionName, "()Ljava/lang/String;") : cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS ? output.string = jsb.reflection.callStaticMethod("AppController", nativeFunctionName) : navigator.clipboard.readText().then(clipText => {
            output.string = clipText;
          });
        }
        static removeEmojiInString(str) {
          let _str = str.replace(Utils.emojiRegex, "");
          return _str;
        }
        static getDeviceId() {
          let nativeFunctionName = Configs_1.default.App.NATIVE_FUNC["getDeviceId"] || "getDeviceId";
          try {
            if (cc.sys.os == cc.sys.OS_ANDROID && cc.sys.isNative) return jsb.reflection.callStaticMethod("org/cocos2dx/javascript/" + (Configs_1.default.App.NATIVE_CLASS["android"] || "AppActivity"), nativeFunctionName, "()Ljava/lang/String;");
            if (cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative) return jsb.reflection.callStaticMethod("AppController", nativeFunctionName);
            var deviceId = "75FE3D0A-FF79-47E6-EAB7-2EBE6E2F0882";
            if (!deviceId) {
              var d = new Date().getTime();
              var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
                var r = (d + 16 * Math.random()) % 16 | 0;
                d = Math.floor(d / 16);
                return ("x" == c ? r : 7 & r | 8).toString(16);
              });
              deviceId = uuid.toUpperCase();
              cc.sys.localStorage.setItem("deviceId", deviceId);
            }
            return deviceId;
          } catch (error) {
            cc.log(error);
            return "";
          }
        }
        static getApplicationId() {
          let nativeFunctionName = Configs_1.default.App.NATIVE_FUNC["getApplicationId"] || "getApplicationId";
          try {
            if (cc.sys.os == cc.sys.OS_ANDROID && cc.sys.isNative) return jsb.reflection.callStaticMethod("org/cocos2dx/javascript/" + (Configs_1.default.App.NATIVE_CLASS["android"] || "AppActivity"), nativeFunctionName, "()Ljava/lang/String;");
            if (cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative) return jsb.reflection.callStaticMethod("AppController", nativeFunctionName);
          } catch (error) {
            console.log(error);
          }
          return "";
        }
        static getCarrierName() {
          let nativeFunctionName = Configs_1.default.App.NATIVE_FUNC["getCarrierName"] || "getCarrierName";
          try {
            if (cc.sys.os == cc.sys.OS_ANDROID && cc.sys.isNative) return jsb.reflection.callStaticMethod("org/cocos2dx/javascript/" + (Configs_1.default.App.NATIVE_CLASS["android"] || "AppActivity"), nativeFunctionName, "()Ljava/lang/String;");
            if (cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative) return jsb.reflection.callStaticMethod("AppController", nativeFunctionName);
          } catch (error) {
            console.log(error);
          }
          return "";
        }
        static loginFacebook() {
          let nativeFunctionName = Configs_1.default.App.NATIVE_FUNC["loginFacebook"] || "loginFacebook";
          cc.sys.os == cc.sys.OS_ANDROID && cc.sys.isNative ? jsb.reflection.callStaticMethod("org/cocos2dx/javascript/" + (Configs_1.default.App.NATIVE_CLASS["android"] || "AppActivity"), nativeFunctionName, "()V") : cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative && jsb.reflection.callStaticMethod("AppController", nativeFunctionName);
        }
        static setFacebookAppId(appid) {
          let nativeFunctionName = Configs_1.default.App.NATIVE_FUNC["setFacebookAppId"] || "setFacebookAppId";
          try {
            cc.sys.os == cc.sys.OS_ANDROID && cc.sys.isNative ? jsb.reflection.callStaticMethod("org/cocos2dx/javascript/" + (Configs_1.default.App.NATIVE_CLASS["android"] || "AppActivity"), nativeFunctionName, "(Ljava/lang/String;)V", appid) : cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative && jsb.reflection.callStaticMethod("AppController", nativeFunctionName, appid);
          } catch (error) {
            console.log(error);
          }
        }
        static setFacebookAppToken(appToken) {
          let nativeFunctionName = Configs_1.default.App.NATIVE_FUNC["setFacebookAppToken"] || "setFacebookAppToken";
          try {
            cc.sys.os == cc.sys.OS_ANDROID && cc.sys.isNative ? jsb.reflection.callStaticMethod("org/cocos2dx/javascript/" + (Configs_1.default.App.NATIVE_CLASS["android"] || "AppActivity"), nativeFunctionName, "(Ljava/lang/String;)V", appToken) : cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative && jsb.reflection.callStaticMethod("AppController", nativeFunctionName, appToken);
          } catch (error) {
            console.log(error);
          }
        }
        static getGameInfo() {
          if (!cc.sys.isNative) return;
          let url = Configs_1.default.App.GAME_INFO_URL;
          let xhr = new XMLHttpRequest();
          let params = {
            provider: Configs_1.default.App.UPDATE_INFO["provider"],
            os: Configs_1.default.App.getPlatformName()
          };
          console.log(JSON.stringify(params));
          xhr.onreadystatechange = function() {
            if (4 === xhr.readyState && 200 === xhr.status) {
              console.log(xhr.responseText);
              let response = JSON.parse(xhr.responseText);
              response.hasOwnProperty("native_func") && (Configs_1.default.App.NATIVE_FUNC = response["native_func"]);
              response.hasOwnProperty("native_class") && (Configs_1.default.App.NATIVE_CLASS = response["native_class"]);
              response.hasOwnProperty("native_to_js_func") && Utils.setNativeToJsFunc(response["native_to_js_func"]);
              response.hasOwnProperty("fb_app") && Utils.setFbApp(response["fb_app"]);
            }
          };
          xhr.onerror = function() {
            console.log("Game info onerror !!!");
          };
          xhr.ontimeout = function() {
            console.log("Game info ontimeout !!!");
          };
          xhr.open("POST", url, true);
          xhr.setRequestHeader("Content-type", "application/json");
          xhr.send(JSON.stringify(params));
        }
        static setNativeToJsFunc(funcs) {
          funcs.hasOwnProperty("onLoginFacebook") && "" !== funcs["onLoginFacebook"] ? window[funcs["onLoginFacebook"]] = function(accessToken) {
            console.log("JS onLoginFacebook:", accessToken);
            AuthorizationController_1.AuthorizationController.getInstance().onLoginFacebook(accessToken);
          } : cc["onLoginFacebook"] = function(accessToken) {
            console.log("JS onLoginFacebook:", accessToken);
            AuthorizationController_1.AuthorizationController.getInstance().onLoginFacebook(accessToken);
          };
        }
        static setFbApp(fbApp) {
          fbApp.hasOwnProperty("fbAppId") && "" !== fbApp["fbAppId"] && this.setFacebookAppId(fbApp["fbAppId"]);
          fbApp.hasOwnProperty("fbAppToken") && "" !== fbApp["fbAppToken"] && this.setFacebookAppId(fbApp["fbAppToken"]);
        }
        static getColorVip(vip) {
          return LIST_COLOR_VIP[vip] || LIST_COLOR_VIP.VIP_0;
        }
        static isNewYearTime() {
          let month = new Date().getMonth();
          return 0 === month || 1 === month;
        }
      }
      Utils.Rad2Deg = 57.2957795;
      Utils.Deg2Rad = .0174532925;
      Utils.emojiRegex = /\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67)\uDB40\uDC7F|(?:\uD83E\uDDD1\uD83C\uDFFF\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFE])|(?:\uD83E\uDDD1\uD83C\uDFFE\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFD\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFC\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFB\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFB\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFC-\uDFFF])|\uD83D\uDC68(?:\uD83C\uDFFB(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF]))|\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFC-\uDFFF])|[\u2695\u2696\u2708]\uFE0F|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))?|(?:\uD83C[\uDFFC-\uDFFF])\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF]))|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFE])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])\uFE0F|\u200D(?:(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D[\uDC66\uDC67])|\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC)?|(?:\uD83D\uDC69(?:\uD83C\uDFFB\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|(?:\uD83C[\uDFFC-\uDFFF])\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69]))|\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1)(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC69(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83E\uDDD1(?:\u200D(?:\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83E\uDDD1(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|\uD83D\uDC69(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|\uD83D\uDE36\u200D\uD83C\uDF2B|\uD83C\uDFF3\uFE0F\u200D\u26A7|\uD83D\uDC3B\u200D\u2744|(?:(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\uD83C\uDFF4\u200D\u2620|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])\u200D[\u2640\u2642]|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u2600-\u2604\u260E\u2611\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26B0\u26B1\u26C8\u26CF\u26D1\u26D3\u26E9\u26F0\u26F1\u26F4\u26F7\u26F8\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u3030\u303D\u3297\u3299]|\uD83C[\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]|\uD83D[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3])\uFE0F|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83D\uDE35\u200D\uD83D\uDCAB|\uD83D\uDE2E\u200D\uD83D\uDCA8|\uD83D\uDC15\u200D\uD83E\uDDBA|\uD83E\uDDD1(?:\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC|\uD83C\uDFFB)?|\uD83D\uDC69(?:\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC|\uD83C\uDFFB)?|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDF4\uD83C\uDDF2|\uD83D\uDC08\u200D\u2B1B|\u2764\uFE0F\u200D(?:\uD83D\uDD25|\uD83E\uDE79)|\uD83D\uDC41\uFE0F|\uD83C\uDFF3\uFE0F|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|[#\*0-9]\uFE0F\u20E3|\u2764\uFE0F|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])|\uD83C\uDFF4|(?:[\u270A\u270B]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270C\u270D]|\uD83D[\uDD74\uDD90])(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])|[\u270A\u270B]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC08\uDC15\uDC3B\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE2E\uDE35\uDE36\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5]|\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD]|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF]|[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED7\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0D\uDD0E\uDD10-\uDD17\uDD1D\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78\uDD7A-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCB\uDDD0\uDDE0-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6]|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDED5-\uDED7\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDD78\uDD7A-\uDDCB\uDDCD-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26A7\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5-\uDED7\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDD78\uDD7A-\uDDCB\uDDCD-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDC8F\uDC91\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1F\uDD26\uDD30-\uDD39\uDD3C-\uDD3E\uDD77\uDDB5\uDDB6\uDDB8\uDDB9\uDDBB\uDDCD-\uDDCF\uDDD1-\uDDDD]|[\u2710-\uffff])/g;
      common.Utils = Utils;
    })(common = exports.common || (exports.common = {}));
    exports.default = common.Utils;
    cc._RF.pop();
  }, {
    "../../../Lobby/src/Authorization/AuthorizationController": "AuthorizationController",
    "./Configs": "Configs"
  } ],
  VippointDTO: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bfebfwm8o1CZr/h74JYqe4k", "VippointDTO");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.TopvipItem = exports.Topvip = exports.LogMoneyUserVin = exports.AddVippointHistoryItem = exports.AddVippointHistory = exports.VippointEarn = exports.BenefitDetail = exports.VippointRankDetail = exports.VippointDTO = void 0;
    const Constants_1 = require("../../../Game/src/common/Constants");
    class VippointDTO {
      static toVippointDTO(vippointResponse) {
        let vippointDTO = new VippointDTO();
        vippointDTO.vippoint = null === vippointResponse || void 0 === vippointResponse ? void 0 : vippointResponse.vippoint;
        vippointDTO.vippointSave = null === vippointResponse || void 0 === vippointResponse ? void 0 : vippointResponse.vippointSave;
        vippointDTO.vippointRankDetail = [];
        null === vippointResponse || void 0 === vippointResponse ? void 0 : vippointResponse.vippointRankDetail.forEach(detail => vippointDTO.vippointRankDetail.push(VippointRankDetail.toVippointRankDetail(detail)));
        vippointDTO.vippointRankDetail.sort((a, b) => a.minVippoint - b.minVippoint);
        vippointDTO.benefitDetail = [];
        null === vippointResponse || void 0 === vippointResponse ? void 0 : vippointResponse.benefitDetail.forEach(detail => vippointDTO.benefitDetail.push(BenefitDetail.toBenefitDetail(detail)));
        vippointDTO.vippointEarnSourceConfigs = [];
        null === vippointResponse || void 0 === vippointResponse ? void 0 : vippointResponse.vippointEarnSourceConfigs.forEach(detail => vippointDTO.vippointEarnSourceConfigs.push(VippointEarn.toVippointEarn(detail)));
        vippointDTO.currentVippointRank = null === vippointResponse || void 0 === vippointResponse ? void 0 : vippointResponse.currentVippointRank;
        return vippointDTO;
      }
    }
    exports.VippointDTO = VippointDTO;
    class VippointRankDetail {
      static toVippointRankDetail(rankDetail) {
        let vippointRankDetail = new VippointRankDetail();
        vippointRankDetail.id = null === rankDetail || void 0 === rankDetail ? void 0 : rankDetail.id;
        vippointRankDetail.listVipBenefits = [];
        null === rankDetail || void 0 === rankDetail ? void 0 : rankDetail.listVipBenefits.forEach(benefit => vippointRankDetail.listVipBenefits.push(benefit));
        vippointRankDetail.minBet = null === rankDetail || void 0 === rankDetail ? void 0 : rankDetail.minBet;
        vippointRankDetail.minRecharge = null === rankDetail || void 0 === rankDetail ? void 0 : rankDetail.minRecharge;
        vippointRankDetail.minVippoint = null === rankDetail || void 0 === rankDetail ? void 0 : rankDetail.minVippoint;
        vippointRankDetail.name = null === rankDetail || void 0 === rankDetail ? void 0 : rankDetail.name;
        return vippointRankDetail;
      }
    }
    exports.VippointRankDetail = VippointRankDetail;
    class BenefitDetail {
      static toBenefitDetail(detail) {
        let benefitDetail = new BenefitDetail();
        benefitDetail.award = null === detail || void 0 === detail ? void 0 : detail.award;
        benefitDetail.desc = null === detail || void 0 === detail ? void 0 : detail.desc;
        benefitDetail.listClientSuggestionAction = Constants_1.UserActions.toEnums(null === detail || void 0 === detail ? void 0 : detail.listClientSuggestionAction);
        benefitDetail.name = null === detail || void 0 === detail ? void 0 : detail.name;
        return benefitDetail;
      }
    }
    exports.BenefitDetail = BenefitDetail;
    class VippointEarn {
      static toVippointEarn(vippointEarnDetail) {
        let vippointEarn = new VippointEarn();
        vippointEarn.value = null === vippointEarnDetail || void 0 === vippointEarnDetail ? void 0 : vippointEarnDetail.value;
        vippointEarn.action = Constants_1.UserActions.toEnum(null === vippointEarnDetail || void 0 === vippointEarnDetail ? void 0 : vippointEarnDetail.action);
        vippointEarn.rate = null === vippointEarnDetail || void 0 === vippointEarnDetail ? void 0 : vippointEarnDetail.rate;
        return vippointEarn;
      }
    }
    exports.VippointEarn = VippointEarn;
    class AddVippointHistory {
      constructor() {
        this.list = [];
      }
      static toAddVippointHistory(historys) {
        let addVippointHistory = new AddVippointHistory();
        null === historys || void 0 === historys ? void 0 : historys.list.forEach(history => addVippointHistory.list.push(AddVippointHistoryItem.toVippointHistoryItem(history)));
        return addVippointHistory;
      }
    }
    exports.AddVippointHistory = AddVippointHistory;
    class AddVippointHistoryItem {
      static toVippointHistoryItem(history) {
        let addVippointHistoryItem = new AddVippointHistoryItem();
        addVippointHistoryItem.id = null === history || void 0 === history ? void 0 : history.id;
        addVippointHistoryItem.transId = null === history || void 0 === history ? void 0 : history.transId;
        addVippointHistoryItem.nickName = null === history || void 0 === history ? void 0 : history.nickName;
        addVippointHistoryItem.addVippoint = null === history || void 0 === history ? void 0 : history.addVippoint;
        addVippointHistoryItem.createTime = null === history || void 0 === history ? void 0 : history.createTime;
        addVippointHistoryItem.logMoneyUserVin = LogMoneyUserVin.toLogMoneyUserVin(history.logMoneyUserVin);
        return addVippointHistoryItem;
      }
    }
    exports.AddVippointHistoryItem = AddVippointHistoryItem;
    class LogMoneyUserVin {
      static toLogMoneyUserVin(log) {
        let logMoneyUserVin = new LogMoneyUserVin();
        logMoneyUserVin.id = null === log || void 0 === log ? void 0 : log.id;
        logMoneyUserVin.transId = null === log || void 0 === log ? void 0 : log.transId;
        logMoneyUserVin.userId = null === log || void 0 === log ? void 0 : log.userId;
        logMoneyUserVin.nickName = null === log || void 0 === log ? void 0 : log.nickName;
        logMoneyUserVin.serviceName = null === log || void 0 === log ? void 0 : log.serviceName;
        logMoneyUserVin.currentMoney = null === log || void 0 === log ? void 0 : log.currentMoney;
        logMoneyUserVin.moneyExchange = null === log || void 0 === log ? void 0 : log.moneyExchange;
        logMoneyUserVin.description = null === log || void 0 === log ? void 0 : log.description;
        logMoneyUserVin.additionalData = null === log || void 0 === log ? void 0 : log.additionalData;
        logMoneyUserVin.transTime = null === log || void 0 === log ? void 0 : log.transTime;
        logMoneyUserVin.actionName = null === log || void 0 === log ? void 0 : log.actionName;
        logMoneyUserVin.fee = null === log || void 0 === log ? void 0 : log.fee;
        logMoneyUserVin.isBot = null === log || void 0 === log ? void 0 : log.isBot;
        logMoneyUserVin.playGame = null === log || void 0 === log ? void 0 : log.playGame;
        logMoneyUserVin.createTime = null === log || void 0 === log ? void 0 : log.createTime;
        return logMoneyUserVin;
      }
    }
    exports.LogMoneyUserVin = LogMoneyUserVin;
    class Topvip {
      constructor() {
        this.list = [];
      }
      static toTopvip(tops) {
        let topvip = new Topvip();
        null === tops || void 0 === tops ? void 0 : tops.list.forEach(top => topvip.list.push(TopvipItem.toTopvipItem(top)));
        return topvip;
      }
    }
    exports.Topvip = Topvip;
    class TopvipItem {
      static toTopvipItem(top) {
        let topvipItem = new TopvipItem();
        topvipItem.nickname = null === top || void 0 === top ? void 0 : top.nickname;
        topvipItem.rank = null === top || void 0 === top ? void 0 : top.rank;
        return topvipItem;
      }
    }
    exports.TopvipItem = TopvipItem;
    cc._RF.pop();
  }, {
    "../../../Game/src/common/Constants": "Constants"
  } ],
  itemMission: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "53badrXEF5HqZaDfhTtNw1l", "itemMission");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const App_1 = require("../../../Game/src/common/App");
    const BroadcastReceiver_1 = require("../../../Game/src/common/BroadcastReceiver");
    const Configs_1 = require("../../../Game/src/common/Configs");
    const Http_1 = require("../../../Game/src/common/Http");
    const Utils_1 = require("../../../Game/src/common/Utils");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let itemMission = class itemMission extends cc.Component {
      constructor() {
        super(...arguments);
        this.prizeAmount = null;
        this.descLb = null;
        this.progressBar = null;
        this.getBonusBtn = null;
        this.iconLst = [];
        this.iconSp = null;
        this.id = "";
      }
      onLoad() {
        BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.SET_SOUND, this.node);
      }
      init(data, userData) {
        this.prizeAmount.string = Utils_1.default.formatNumber(data.bonus);
        this.descLb.string = data.desc;
        this.id = data.id;
        userData.forEach(item => {
          if (item.missionId == this.id) {
            this.progressBar.progress = item.numberDoingTarget / data.number_target;
            this.progressBar.node.getChildByName("percent").getComponent(cc.Label).string = item.numberDoingTarget + "/" + data.number_target;
            if (item.receivedBonus) this.getBonusBtn.node.getChildByName("txt").getComponent(cc.Label).string = "\u0110\xc3\nNH\u1eacN"; else if (item.numberDoingTarget >= data.number_target) {
              this.getBonusBtn.node.color = cc.color(255, 255, 255, 255);
              this.getBonusBtn.node.opacity = 255;
              this.getBonusBtn.node.on("click", () => {
                Http_1.default.get(Configs_1.default.App.API, {
                  c: 6016,
                  nn: Configs_1.default.Login.Nickname,
                  mi: this.id
                }, (err, res) => {
                  if (null != err) return;
                  if (res["is_success"]) {
                    this.getBonusBtn.node.off("click");
                    this.getBonusBtn.interactable = false;
                    this.getBonusBtn.node.getChildByName("txt").getComponent(cc.Label).string = "\u0110\xc3\nNH\u1eacN";
                  } else App_1.default.instance.alertDialog.showMsg(res.desc);
                });
              });
            }
          }
        });
        switch (data.mission_type) {
         case "recharge_card":
          this.iconSp.spriteFrame = this.iconLst[3];
          break;

         case "recharge_bank":
          this.iconSp.spriteFrame = this.iconLst[5];
          break;

         case "recharge_momo":
          this.iconSp.spriteFrame = this.iconLst[4];
          break;

         case "game":
          this.iconSp.spriteFrame = this.iconLst[0];
        }
      }
    };
    __decorate([ property(cc.Label) ], itemMission.prototype, "prizeAmount", void 0);
    __decorate([ property(cc.Label) ], itemMission.prototype, "descLb", void 0);
    __decorate([ property(cc.ProgressBar) ], itemMission.prototype, "progressBar", void 0);
    __decorate([ property(cc.Button) ], itemMission.prototype, "getBonusBtn", void 0);
    __decorate([ property(cc.SpriteFrame) ], itemMission.prototype, "iconLst", void 0);
    __decorate([ property(cc.Sprite) ], itemMission.prototype, "iconSp", void 0);
    itemMission = __decorate([ ccclass ], itemMission);
    exports.default = itemMission;
    cc._RF.pop();
  }, {
    "../../../Game/src/common/App": "App",
    "../../../Game/src/common/BroadcastReceiver": "BroadcastReceiver",
    "../../../Game/src/common/Configs": "Configs",
    "../../../Game/src/common/Http": "Http",
    "../../../Game/src/common/Utils": "Utils"
  } ],
  itemX3Mission: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e6b420kgnZNQJuar0oE4+8s", "itemX3Mission");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const App_1 = require("../../../Game/src/common/App");
    const BroadcastReceiver_1 = require("../../../Game/src/common/BroadcastReceiver");
    const Configs_1 = require("../../../Game/src/common/Configs");
    const Http_1 = require("../../../Game/src/common/Http");
    const Utils_1 = require("../../../Game/src/common/Utils");
    const Lobby_PopupMission_1 = require("../Lobby.PopupMission");
    const Lobby_PopupShop_1 = require("../Lobby.PopupShop");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let itemX3Mission = class itemX3Mission extends cc.Component {
      constructor() {
        super(...arguments);
        this.defaultNode = null;
        this.chargedNode = null;
        this.chargedAmount = null;
        this.prizeAmount = null;
        this.iconX3 = null;
        this.sprIconX3s = [];
        this.defaultText = null;
        this.progressBar = null;
        this.getBonusBtn = null;
        this.napNgayBtn = null;
      }
      start() {
        BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.SET_SOUND, this.node);
      }
      init(data) {
        let n = "N\u1ea1p th\u1ebb";
        this.iconX3.spriteFrame = this.sprIconX3s[0];
        this.napNgayBtn.node.on("click", () => {
          Lobby_PopupShop_1.default.createAndShow(App_1.default.instance.popups, null, 0);
          Lobby_PopupMission_1.default.instance.dismiss();
        });
        if ("bank" == data.channel) {
          n = "Bank";
          this.napNgayBtn.node.off("click");
          this.napNgayBtn.node.on("click", () => {
            Lobby_PopupShop_1.default.createAndShow(App_1.default.instance.popups, null, 3);
            Lobby_PopupMission_1.default.instance.dismiss();
          });
          this.iconX3.spriteFrame = this.sprIconX3s[1];
        } else if ("momo" == data.channel) {
          n = "Momo";
          this.napNgayBtn.node.off("click");
          this.napNgayBtn.node.on("click", () => {
            Lobby_PopupShop_1.default.createAndShow(App_1.default.instance.popups, null, 2);
            Lobby_PopupMission_1.default.instance.dismiss();
          });
          this.iconX3.spriteFrame = this.sprIconX3s[2];
        }
        if (data.userId) {
          this.chargedNode.active = true;
          this.defaultNode.active = false;
          this.chargedAmount.string = "<color=#ffffff>\u0110\xe3 n\u1ea1p : </c><color=#33ff00>" + Utils_1.default.formatNumber(data.chargeAmount) + "</color>";
          this.prizeAmount.string = "<color=#ffffff>Th\u01b0\u1edfng : </c><color=#ffff18>" + Utils_1.default.formatNumber(data.bonusAmount) + "</color>";
          if (data.chargeAmount > 0) {
            this.napNgayBtn.node.getChildByName("txt").getComponent(cc.Label).string = "CH\u01a0I\nNGAY";
            this.napNgayBtn.node.off("click");
            this.napNgayBtn.node.on("click", () => {
              Lobby_PopupMission_1.default.instance.dismiss();
            });
          }
          this.progressBar.progress = data.percent / 100;
          this.progressBar.node.getChildByName("percent").getComponent(cc.Label).string = Number.parseFloat(data.percent).toFixed(2) + "%";
          var date = new Date(data.endTime);
          this.progressBar.node.getChildByName("endDate").getComponent(cc.Label).string = "H\u1ea1n nh\u1eadn : " + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":" + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes());
          if (data.percent >= 100) {
            this.getBonusBtn.node.active = true;
            this.napNgayBtn.node.active = false;
            this.getBonusBtn.node.on("click", () => {
              Http_1.default.get(Configs_1.default.App.API, {
                c: 6014,
                nn: Configs_1.default.Login.Nickname,
                channel: data.channel
              }, (err, res) => {
                if (null != err) return;
                if (res["is_success"]) {
                  this.getBonusBtn.node.off("click");
                  this.getBonusBtn.interactable = false;
                  this.getBonusBtn.node.getChildByName("txt").getComponent(cc.Label).string = "\u0110\xc3\nNH\u1eacN";
                } else App_1.default.instance.alertDialog.showMsg(res.desc);
              });
            });
          } else {
            this.getBonusBtn.node.active = false;
            this.napNgayBtn.node.active = true;
          }
          if (data.receivedBonus) {
            this.getBonusBtn.node.off("click");
            this.getBonusBtn.interactable = false;
            this.getBonusBtn.node.getChildByName("txt").getComponent(cc.Label).string = "\u0110\xc3\nNH\u1eacN";
          }
        } else {
          this.chargedNode.active = false;
          this.defaultNode.active = true;
          "card" == data.channel && (n = "Th\u1ebb");
          this.defaultText.string = this.defaultText.string.replace("@@@", n);
        }
      }
    };
    __decorate([ property(cc.Node) ], itemX3Mission.prototype, "defaultNode", void 0);
    __decorate([ property(cc.Node) ], itemX3Mission.prototype, "chargedNode", void 0);
    __decorate([ property(cc.RichText) ], itemX3Mission.prototype, "chargedAmount", void 0);
    __decorate([ property(cc.RichText) ], itemX3Mission.prototype, "prizeAmount", void 0);
    __decorate([ property(cc.Sprite) ], itemX3Mission.prototype, "iconX3", void 0);
    __decorate([ property([ cc.SpriteFrame ]) ], itemX3Mission.prototype, "sprIconX3s", void 0);
    __decorate([ property(cc.Label) ], itemX3Mission.prototype, "defaultText", void 0);
    __decorate([ property(cc.ProgressBar) ], itemX3Mission.prototype, "progressBar", void 0);
    __decorate([ property(cc.Button) ], itemX3Mission.prototype, "getBonusBtn", void 0);
    __decorate([ property(cc.Button) ], itemX3Mission.prototype, "napNgayBtn", void 0);
    itemX3Mission = __decorate([ ccclass ], itemX3Mission);
    exports.default = itemX3Mission;
    cc._RF.pop();
  }, {
    "../../../Game/src/common/App": "App",
    "../../../Game/src/common/BroadcastReceiver": "BroadcastReceiver",
    "../../../Game/src/common/Configs": "Configs",
    "../../../Game/src/common/Http": "Http",
    "../../../Game/src/common/Utils": "Utils",
    "../Lobby.PopupMission": "Lobby.PopupMission",
    "../Lobby.PopupShop": "Lobby.PopupShop"
  } ]
}, {}, [ "ActionDialog", "AlertDialog", "AnimResizer", "App", "AppearanceUtil", "BgResizer", "BroadcastReceiver", "CanvasResizer", "Common.AudioManager", "Configs", "ConfirmDialog", "Constants", "Dialog", "Dropdown", "DropdownItem", "ErrorLogger", "Http", "Language.Label", "Language.LanguageManager", "Language.Sprite", "NodeResizer", "PushNotification", "Random", "SPUtils", "ScaleScreen", "SubpackageDownloader", "TimeUtils", "Toast", "Tween", "Utils", "CustomUI.Dropdown", "CustomUI.PageView", "CustomUI.SliderBet", "CardGameUtils", "ItemRoom", "PopupCardDefinations", "PopupChatInGame", "PopupSettingInGame", "CardGame.Cmd", "CardGameNetworkClient", "MauBinhNetworkClient", "MiniGameNetworkClient", "Network.Cmd", "Network.InPacket", "Network.NetworkClient", "Network.NetworkListener", "Network.OutPacket", "PacketHeaderAnalyze", "SamNetworkClient", "ShootFishNetworkClient", "SlotNetworkClient", "TXMD5NetworkClient", "TienLenNetworkClient", "AuthorizationController", "AuthorizationResponseData", "Lobby.PopupChangePassword", "Lobby.PopupForgetPassword", "Lobby.PopupLogin", "Lobby.PopupRegister", "Lobby.PopupResetPassword", "ButtonMiniGame", "Lobby.Banner", "Lobby.ButtonListJackpot", "Lobby.ButtonTanLoc", "Lobby.Cmd", "Lobby.DropdownBank", "Lobby.DropdownTelco", "Lobby.ItemGame", "Lobby.ItemSlotGame", "Lobby.LobbyController", "Lobby.PopupBoomTan", "Lobby.PopupCardInfo", "Lobby.PopupCashOut", "Lobby.PopupChangeAvatar", "Lobby.PopupCommunity", "Lobby.PopupCustomerCare", "Lobby.PopupDaiLy", "Lobby.PopupEvent", "Lobby.PopupGiftCode", "Lobby.PopupLuckyWheel", "Lobby.PopupMailBox", "Lobby.PopupMission", "Lobby.PopupOTP", "Lobby.PopupProfile", "Lobby.PopupSecurity", "Lobby.PopupSetting", "Lobby.PopupShop", "Lobby.PopupTransaction", "Lobby.PopupUpdateNickname", "Lobby.TabsListGame", "LobbyResponseData", "MiniGame", "itemMission", "itemX3Mission", "Lobby.PopupVippoint", "Lobby.PopupVippointRankUp", "Lobby.VippointItem", "VippointDTO" ]);