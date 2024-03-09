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
  "OanTuTi.OanTuTiController": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "efd21JpQ3BI1om0o4SIUbj2", "OanTuTi.OanTuTiController");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const MiniGame_1 = require("../../Main/Lobby/src/MiniGame");
    const ShootFishNetworkClient_1 = require("../../Main/Game/src/networks/ShootFishNetworkClient");
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    const App_1 = require("../../Main/Game/src/common/App");
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const BroadcastReceiver_1 = require("../../Main/Game/src/common/BroadcastReceiver");
    const OanTuTi_PopupCoinTransfer_1 = require("./OanTuTi.PopupCoinTransfer");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let OanTuTiController = class OanTuTiController extends MiniGame_1.default {
      constructor() {
        super(...arguments);
        this.lblCoin = null;
        this.lblBet = null;
        this.btnBets = [];
        this.btnPlayNow = null;
        this.panelSelectBet = null;
        this.players = null;
        this.mePlayer = null;
        this.otherPlayer = null;
        this.panelSearchingMatch = null;
        this.panelPlaying = null;
        this.panelResult = null;
        this.lblSearching = null;
        this.btnCancel = null;
        this.lblTime = null;
        this.progressTime = null;
        this.btnPlays = [];
        this.sprPlaysActive = [];
        this.sprPlaysNormal = [];
        this.sprResults = [];
        this.toggleAuto = null;
        this.popups = [];
        this.popupCoinTransfer = null;
        this.listBet = [ 1e3, 5e3, 1e4, 5e4, 1e5 ];
        this.timePlaying = 10;
        this.remainTime = 0;
        this.lastBetValue = 0;
        this.isPlaying = false;
      }
      start() {
        super.start();
        BroadcastReceiver_1.default.register(BroadcastReceiver_1.default.USER_UPDATE_COIN, () => {
          if (!this.node.active) return;
          this.lblCoin.string = Utils_1.default.formatNumber(Configs_1.default.Login.CoinFish);
        }, this);
        BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN);
        ShootFishNetworkClient_1.default.getInstance().addListener((route, push) => {
          if (!this.node.active) return;
          let routesLog = [ "OttOnMatching", "OttOnMatchStart", "OttOnMatchEnd", "OttOnMatchSolved" ];
          if (routesLog.indexOf(route) >= 0) {
            cc.log(route);
            cc.log(push);
          }
          switch (route) {
           case "OttOnMatching":
            {
              let otherNickname = "";
              let otherAvatar = "";
              if (push["userId1"] == Configs_1.default.Login.UserIdFish) {
                otherNickname = push["nickname2"];
                otherAvatar = push["avatar2"];
              } else {
                otherNickname = push["nickname1"];
                otherAvatar = push["avatar1"];
              }
              this.panelSelectBet.active = false;
              this.panelPlaying.active = false;
              this.players.active = true;
              this.lblSearching.string = "\u0110\xc3 T\xccM TH\u1ea4Y \u0110\u1ed0I TH\u1ee6";
              this.btnCancel.node.active = false;
              this.otherPlayer.active = true;
              this.otherPlayer.getChildByName("lblNickname").getComponent(cc.Label).string = otherNickname;
              this.otherPlayer.getChildByName("sprAvatar").getComponent(cc.Sprite).spriteFrame = App_1.default.instance.getAvatarSpriteFrame(otherAvatar);
              this.lblBet.string = "C\u01af\u1ee2C: " + Math.floor(push["blind"] / 1e3) + "K";
            }
            break;

           case "OttOnMatchStart":
            this.panelSearchingMatch.active = false;
            this.panelPlaying.active = true;
            this.panelResult.active = false;
            this.players.active = true;
            this.remainTime = this.timePlaying;
            this.lblTime.node.parent.active = true;
            this.progressTime.fillRange = 1;
            for (let i = 0; i < this.btnPlays.length; i++) {
              this.btnPlays[i].interactable = true;
              this.btnPlays[i].getComponent(cc.Sprite).spriteFrame = this.sprPlaysActive[i];
            }
            break;

           case "OttOnMatchEnd":
            {
              let result = push["result"];
              let changeCash1 = push["changeCash1"];
              let changeCash2 = push["changeCash2"];
              let blind = push["blind"];
              let lblWin = this.panelResult.getChildByName("lblWin");
              let lblLose = this.panelResult.getChildByName("lblLose");
              if (push["userId1"] == Configs_1.default.Login.UserIdFish) {
                0 != result && (1 == result ? lblWin.getComponent(cc.Label).string = "+" + Utils_1.default.formatNumber(changeCash1) : lblLose.getComponent(cc.Label).string = Utils_1.default.formatNumber(-blind));
                Configs_1.default.Login.CoinFish = push["cash1"];
              } else {
                0 != result && (2 == result ? lblWin.getComponent(cc.Label).string = "+" + Utils_1.default.formatNumber(changeCash2) : lblLose.getComponent(cc.Label).string = Utils_1.default.formatNumber(-blind));
                Configs_1.default.Login.CoinFish = push["cash2"];
              }
              BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN);
              this.scheduleOnce(() => {
                this.resetView();
                this.toggleAuto.isChecked ? this.selectBet(this.lastBetValue) : this.isPlaying = false;
              }, 5);
            }

           case "OttOnMatchSolved":
            {
              this.panelResult.active = true;
              this.lblTime.node.parent.active = false;
              let result = push["result"];
              let choice1 = push["choice1"];
              let choice2 = push["choice2"];
              let meValue = this.panelResult.getChildByName("meValue");
              let otherValue = this.panelResult.getChildByName("otherValue");
              let meActive = meValue.getChildByName("active");
              let otherActive = otherValue.getChildByName("active");
              let lblWin = this.panelResult.getChildByName("lblWin");
              lblWin.active = false;
              let lblLose = this.panelResult.getChildByName("lblLose");
              lblLose.active = false;
              let hoa = this.panelResult.getChildByName("hoa");
              hoa.active = false;
              let thang = this.panelResult.getChildByName("thang");
              thang.active = false;
              let thua = this.panelResult.getChildByName("thua");
              thua.active = false;
              if (push["userId1"] == Configs_1.default.Login.UserIdFish) {
                meValue.getComponent(cc.Sprite).spriteFrame = this.sprResults[choice1];
                otherValue.getComponent(cc.Sprite).spriteFrame = this.sprResults[choice2];
                for (let i = 0; i < this.btnPlays.length; i++) {
                  this.btnPlays[i].interactable = false;
                  this.btnPlays[i].getComponent(cc.Sprite).spriteFrame = choice1 == i ? this.sprPlaysActive[i] : this.sprPlaysNormal[i];
                }
                if (0 == result) {
                  hoa.active = true;
                  hoa.getComponent(sp.Skeleton).setAnimation(0, "animation", false);
                  meActive.active = true;
                  otherActive.active = true;
                } else if (1 == result) {
                  thang.active = true;
                  thang.getComponent(sp.Skeleton).setAnimation(0, "animation", false);
                  lblWin.active = true;
                  meActive.active = true;
                  otherActive.active = false;
                } else {
                  thua.active = true;
                  thua.getComponent(sp.Skeleton).setAnimation(0, "animation", false);
                  lblLose.active = true;
                  meActive.active = false;
                  otherActive.active = true;
                }
              } else {
                meValue.getComponent(cc.Sprite).spriteFrame = this.sprResults[choice2];
                otherValue.getComponent(cc.Sprite).spriteFrame = this.sprResults[choice1];
                for (let i = 0; i < this.btnPlays.length; i++) {
                  this.btnPlays[i].interactable = false;
                  this.btnPlays[i].getComponent(cc.Sprite).spriteFrame = choice2 == i ? this.sprPlaysActive[i] : this.sprPlaysNormal[i];
                }
                if (0 == result) {
                  hoa.active = true;
                  hoa.getComponent(sp.Skeleton).setAnimation(0, "animation", false);
                  meActive.active = true;
                  otherActive.active = true;
                } else if (2 == result) {
                  thang.active = true;
                  thang.getComponent(sp.Skeleton).setAnimation(0, "animation", false);
                  lblWin.active = true;
                  meActive.active = true;
                  otherActive.active = false;
                } else {
                  thua.active = true;
                  thua.getComponent(sp.Skeleton).setAnimation(0, "animation", false);
                  lblLose.active = true;
                  meActive.active = false;
                  otherActive.active = true;
                }
              }
              break;
            }
          }
        }, this);
        for (let i = 0; i < this.btnBets.length; i++) this.btnBets[i].node.on("click", () => {
          this.selectBet(this.listBet[i]);
        });
        for (let i = 0; i < this.btnPlays.length; i++) this.btnPlays[i].node.on("click", () => {
          this.play(i);
        });
      }
      update(dt) {
        if (this.remainTime > 0) {
          this.remainTime = Math.max(0, this.remainTime - dt);
          let t = Math.round(this.remainTime);
          this.lblTime.string = (t > 9 ? "" : "0") + t;
          this.progressTime.fillRange = this.remainTime / this.timePlaying;
        }
      }
      show() {
        if (this.node.active) {
          this.reOrder();
          return;
        }
        super.show();
        this.toggleAuto.isChecked = false;
        this.resetView();
      }
      _onShowed() {
        super._onShowed();
        ShootFishNetworkClient_1.default.getInstance().checkConnect(isLogined => {
          if (!this.node.active) return;
          if (!isLogined) {
            this.dismiss();
            return;
          }
          BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN);
          Configs_1.default.Login.CoinFish <= 0 && App_1.default.instance.confirmDialog.show3("Ti\u1ec1n trong B\u1eafn C\xe1 c\u1ee7a b\u1ea1n \u0111\xe3 h\u1ebft, b\u1ea1n c\xf3 mu\u1ed1n chuy\u1ec3n ti\u1ec1n v\xe0o kh\xf4ng?", "C\xf3", isConfirm => {
            isConfirm && this.popupCoinTransfer.show();
          });
        });
      }
      dismiss() {
        if (this.isPlaying) {
          App_1.default.instance.alertDialog.showMsg("B\u1ea1n \u0111ang ch\u01a1i kh\xf4ng th\u1ec3 tho\xe1t.");
          return;
        }
        super.dismiss();
        for (let i = 0; i < this.popups.length; i++) this.popups[i].active = false;
      }
      resetView() {
        this.lblBet.string = "CH\u1eccN C\u01af\u1ee2C";
        this.panelSelectBet.active = true;
        this.panelPlaying.active = false;
        this.panelResult.active = false;
        this.players.active = false;
        this.panelSearchingMatch.active = false;
        this.mePlayer.active = true;
        this.mePlayer.getChildByName("sprAvatar").getComponent(cc.Sprite).spriteFrame = App_1.default.instance.getAvatarSpriteFrame(Configs_1.default.Login.Avatar);
        this.otherPlayer.active = false;
        this.otherPlayer.getChildByName("lblNickname").getComponent(cc.Label).string = "";
        this.interactableBtnBets(true);
      }
      playNow() {
        this.selectBet(0);
      }
      selectBet(betValue) {
        this.interactableBtnBets(false);
        this.isPlaying = true;
        cc.log("betValue: " + betValue);
        ShootFishNetworkClient_1.default.getInstance().request("OTT1", {
          userId: Configs_1.default.Login.UserIdFish,
          nickname: Configs_1.default.Login.Nickname,
          blind: betValue
        }, res => {
          if (200 != res["code"]) {
            switch (res["code"]) {
             case 302:
              App_1.default.instance.alertDialog.showMsg("S\u1ed1 d\u01b0 kh\xf4ng \u0111\u1ee7.");
              break;

             default:
              App_1.default.instance.alertDialog.showMsg("L\u1ed7i " + res["code"] + ", kh\xf4ng x\xe1c \u0111\u1ecbnh.");
            }
            this.interactableBtnBets(true);
            this.isPlaying = false;
            return;
          }
          this.lastBetValue = betValue;
          if (betValue <= 0) this.lblBet.string = "C\u01af\u1ee2C: __"; else {
            let value = Math.floor(betValue / 1e3);
            this.lblBet.string = "C\u01af\u1ee2C: " + Utils_1.default.formatNumber(value) + "K";
          }
          this.panelSelectBet.active = false;
          this.panelSearchingMatch.active = true;
          this.players.active = true;
          this.lblSearching.string = "\u0110ANG T\xccM KI\u1ebeM \u0110\u1ed0I TH\u1ee6...";
          this.btnCancel.node.active = true;
        }, this);
      }
      play(selectValue) {
        ShootFishNetworkClient_1.default.getInstance().request("OTT2", {
          userId: Configs_1.default.Login.UserIdFish,
          choice: selectValue
        }, res => {
          cc.log(res);
          if (200 != res["code"]) {
            App_1.default.instance.alertDialog.showMsg("L\u1ed7i " + res["code"] + ", kh\xf4ng x\xe1c \u0111\u1ecbnh.");
            this.interactableBtnBets(true);
            return;
          }
          for (let i = 0; i < this.btnPlays.length; i++) {
            this.btnPlays[i].interactable = false;
            this.btnPlays[i].getComponent(cc.Sprite).spriteFrame = i == selectValue ? this.sprPlaysActive[i] : this.sprPlaysNormal[i];
          }
        }, this);
      }
      interactableBtnBets(enabled) {
        for (let i = 0; i < this.btnBets.length; i++) this.btnBets[i].interactable = enabled;
        this.btnPlayNow.interactable = enabled;
      }
      actCancel() {
        ShootFishNetworkClient_1.default.getInstance().request("OTT11", {}, res => {
          if (200 != res["code"]) {
            App_1.default.instance.alertDialog.showMsg("L\u1ed7i " + res["code"] + ", kh\xf4ng x\xe1c \u0111\u1ecbnh.");
            return;
          }
          this.resetView();
          this.isPlaying = false;
        }, this);
      }
    };
    __decorate([ property(cc.Label) ], OanTuTiController.prototype, "lblCoin", void 0);
    __decorate([ property(cc.Label) ], OanTuTiController.prototype, "lblBet", void 0);
    __decorate([ property([ cc.Button ]) ], OanTuTiController.prototype, "btnBets", void 0);
    __decorate([ property(cc.Button) ], OanTuTiController.prototype, "btnPlayNow", void 0);
    __decorate([ property(cc.Node) ], OanTuTiController.prototype, "panelSelectBet", void 0);
    __decorate([ property(cc.Node) ], OanTuTiController.prototype, "players", void 0);
    __decorate([ property(cc.Node) ], OanTuTiController.prototype, "mePlayer", void 0);
    __decorate([ property(cc.Node) ], OanTuTiController.prototype, "otherPlayer", void 0);
    __decorate([ property(cc.Node) ], OanTuTiController.prototype, "panelSearchingMatch", void 0);
    __decorate([ property(cc.Node) ], OanTuTiController.prototype, "panelPlaying", void 0);
    __decorate([ property(cc.Node) ], OanTuTiController.prototype, "panelResult", void 0);
    __decorate([ property(cc.Label) ], OanTuTiController.prototype, "lblSearching", void 0);
    __decorate([ property(cc.Button) ], OanTuTiController.prototype, "btnCancel", void 0);
    __decorate([ property(cc.Label) ], OanTuTiController.prototype, "lblTime", void 0);
    __decorate([ property(cc.Sprite) ], OanTuTiController.prototype, "progressTime", void 0);
    __decorate([ property([ cc.Button ]) ], OanTuTiController.prototype, "btnPlays", void 0);
    __decorate([ property([ cc.SpriteFrame ]) ], OanTuTiController.prototype, "sprPlaysActive", void 0);
    __decorate([ property([ cc.SpriteFrame ]) ], OanTuTiController.prototype, "sprPlaysNormal", void 0);
    __decorate([ property([ cc.SpriteFrame ]) ], OanTuTiController.prototype, "sprResults", void 0);
    __decorate([ property(cc.Toggle) ], OanTuTiController.prototype, "toggleAuto", void 0);
    __decorate([ property([ cc.Node ]) ], OanTuTiController.prototype, "popups", void 0);
    __decorate([ property(OanTuTi_PopupCoinTransfer_1.default) ], OanTuTiController.prototype, "popupCoinTransfer", void 0);
    OanTuTiController = __decorate([ ccclass ], OanTuTiController);
    exports.default = OanTuTiController;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/App": void 0,
    "../../Main/Game/src/common/BroadcastReceiver": void 0,
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/common/Utils": void 0,
    "../../Main/Game/src/networks/ShootFishNetworkClient": void 0,
    "../../Main/Lobby/src/MiniGame": void 0,
    "./OanTuTi.PopupCoinTransfer": "OanTuTi.PopupCoinTransfer"
  } ],
  "OanTuTi.PopupCoinTransfer": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d70b9QEdnNK6LswYvb78XXC", "OanTuTi.PopupCoinTransfer");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.TabCashOut = exports.TabCashIn = void 0;
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const ShootFishNetworkClient_1 = require("../../Main/Game/src/networks/ShootFishNetworkClient");
    const App_1 = require("../../Main/Game/src/common/App");
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    const BroadcastReceiver_1 = require("../../Main/Game/src/common/BroadcastReceiver");
    const MiniGameNetworkClient_1 = require("../../Main/Game/src/networks/MiniGameNetworkClient");
    const Lobby_Cmd_1 = require("../../Main/Lobby/src/Lobby.Cmd");
    const Dialog_1 = require("../../Main/Game/src/common/Dialog");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let TabCashIn = class TabCashIn {
      constructor() {
        this.lblBalance = null;
        this.edbCoin = null;
        this.quickButtons = null;
        this.popup = null;
        this.values = [ 5e4, 1e5, 2e5, 5e5, 1e6, 2e6, 5e6, 1e7, 2e7 ];
      }
      start(popup) {
        this.popup = popup;
        this.edbCoin.node.on("editing-did-ended", () => {
          let number = Utils_1.default.stringToInt(this.edbCoin.string);
          this.edbCoin.string = Utils_1.default.formatNumber(number);
        });
        for (let i = 0; i < this.quickButtons.childrenCount; i++) {
          var btn = this.quickButtons.children[i];
          let value = this.values[i];
          btn.getComponentInChildren(cc.Label).string = Utils_1.default.formatNumber(value);
          btn.on("click", () => {
            this.edbCoin.string = Utils_1.default.formatNumber(value);
          });
        }
      }
      submit() {
        let coin = Utils_1.default.stringToInt(this.edbCoin.string);
        if (coin <= 0) {
          App_1.default.instance.alertDialog.showMsg("S\u1ed1 ti\u1ec1n \u0111\xe3 nh\u1eadp kh\xf4ng h\u1ee3p l\u1ec7.");
          return;
        }
        App_1.default.instance.showLoading(true);
        ShootFishNetworkClient_1.default.getInstance().request("xxengCashin", {
          ccash: coin
        }, res => {
          App_1.default.instance.showLoading(false);
          if (!res["ok"]) {
            App_1.default.instance.alertDialog.showMsg("Thao t\xe1c th\u1ea5t b\u1ea1i, vui l\xf2ng th\u1eed l\u1ea1i sau.");
            return;
          }
          Configs_1.default.Login.CoinFish = res["newCash"];
          BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN);
          App_1.default.instance.alertDialog.showMsg("Thao t\xe1c th\xe0nh c\xf4ng.");
          this.reset();
          MiniGameNetworkClient_1.default.getInstance().send(new Lobby_Cmd_1.default.ReqGetMoneyUse());
        }, this.popup);
      }
      reset() {
        this.edbCoin.string = "";
        this.lblBalance.string = Utils_1.default.formatNumber(Configs_1.default.Login.Coin);
      }
    };
    __decorate([ property(cc.Label) ], TabCashIn.prototype, "lblBalance", void 0);
    __decorate([ property(cc.EditBox) ], TabCashIn.prototype, "edbCoin", void 0);
    __decorate([ property(cc.Node) ], TabCashIn.prototype, "quickButtons", void 0);
    TabCashIn = __decorate([ ccclass("OanTuTi.PopupCoinTransfer.TabCashIn") ], TabCashIn);
    exports.TabCashIn = TabCashIn;
    let TabCashOut = class TabCashOut {
      constructor() {
        this.lblBalance = null;
        this.edbCoin = null;
        this.quickButtons = null;
        this.popup = null;
        this.values = [ 5e4, 1e5, 2e5, 5e5, 1e6, 2e6, 5e6, 1e7, 2e7 ];
      }
      start(popup) {
        this.popup = popup;
        this.edbCoin.node.on("editing-did-ended", () => {
          let number = Utils_1.default.stringToInt(this.edbCoin.string);
          this.edbCoin.string = Utils_1.default.formatNumber(number);
        });
        for (let i = 0; i < this.quickButtons.childrenCount; i++) {
          var btn = this.quickButtons.children[i];
          let value = this.values[i];
          btn.getComponentInChildren(cc.Label).string = Utils_1.default.formatNumber(value);
          btn.on("click", () => {
            this.edbCoin.string = Utils_1.default.formatNumber(value);
          });
        }
      }
      submit() {
        let coin = Utils_1.default.stringToInt(this.edbCoin.string);
        if (coin <= 0) {
          App_1.default.instance.alertDialog.showMsg("S\u1ed1 ti\u1ec1n \u0111\xe3 nh\u1eadp kh\xf4ng h\u1ee3p l\u1ec7.");
          return;
        }
        App_1.default.instance.showLoading(true);
        ShootFishNetworkClient_1.default.getInstance().request("xxengCashin", {
          ccash: -coin
        }, res => {
          App_1.default.instance.showLoading(false);
          if (!res["ok"]) {
            App_1.default.instance.alertDialog.showMsg("Thao t\xe1c th\u1ea5t b\u1ea1i, vui l\xf2ng th\u1eed l\u1ea1i sau.");
            return;
          }
          Configs_1.default.Login.CoinFish = res["newCash"];
          BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN);
          App_1.default.instance.alertDialog.showMsg("Thao t\xe1c th\xe0nh c\xf4ng.");
          this.reset();
          MiniGameNetworkClient_1.default.getInstance().send(new Lobby_Cmd_1.default.ReqGetMoneyUse());
        }, this.popup);
      }
      reset() {
        this.edbCoin.string = "";
        this.lblBalance.string = Utils_1.default.formatNumber(Configs_1.default.Login.CoinFish);
      }
    };
    __decorate([ property(cc.Label) ], TabCashOut.prototype, "lblBalance", void 0);
    __decorate([ property(cc.EditBox) ], TabCashOut.prototype, "edbCoin", void 0);
    __decorate([ property(cc.Node) ], TabCashOut.prototype, "quickButtons", void 0);
    TabCashOut = __decorate([ ccclass("OanTuTi.PopupCoinTransfer.TabCashOut") ], TabCashOut);
    exports.TabCashOut = TabCashOut;
    let PopupCoinTransfer = class PopupCoinTransfer extends Dialog_1.default {
      constructor() {
        super(...arguments);
        this.tabs = null;
        this.tabContents = null;
        this.tabCashIn = null;
        this.tabCashOut = null;
        this.tabSelectedIdx = 0;
      }
      start() {
        for (let i = 0; i < this.tabs.toggleItems.length; i++) this.tabs.toggleItems[i].node.on("toggle", () => {
          this.tabSelectedIdx = i;
          this.onTabChanged();
        });
        BroadcastReceiver_1.default.register(BroadcastReceiver_1.default.USER_UPDATE_COIN, () => {
          this.tabCashIn.lblBalance.string = Utils_1.default.formatNumber(Configs_1.default.Login.Coin);
          this.tabCashOut.lblBalance.string = Utils_1.default.formatNumber(Configs_1.default.Login.CoinFish);
        }, this);
        this.tabCashIn.start(this);
        this.tabCashOut.start(this);
      }
      show() {
        super.show();
        this.tabSelectedIdx = 0;
        this.tabs.toggleItems[this.tabSelectedIdx].isChecked = true;
        this.onTabChanged();
      }
      onTabChanged() {
        for (let i = 0; i < this.tabContents.childrenCount; i++) this.tabContents.children[i].active = i == this.tabSelectedIdx;
        switch (this.tabSelectedIdx) {
         case 0:
          this.tabCashIn.reset();
          break;

         case 1:
          this.tabCashOut.reset();
        }
      }
      actSubmitCashIn() {
        this.tabCashIn.submit();
      }
      actSubmitCashOut() {
        this.tabCashOut.submit();
      }
      actClearCashIn() {
        this.tabCashIn.edbCoin.string = "0";
      }
      actClearCashOut() {
        this.tabCashOut.edbCoin.string = "0";
      }
    };
    __decorate([ property(cc.ToggleContainer) ], PopupCoinTransfer.prototype, "tabs", void 0);
    __decorate([ property(cc.Node) ], PopupCoinTransfer.prototype, "tabContents", void 0);
    __decorate([ property(TabCashIn) ], PopupCoinTransfer.prototype, "tabCashIn", void 0);
    __decorate([ property(TabCashOut) ], PopupCoinTransfer.prototype, "tabCashOut", void 0);
    PopupCoinTransfer = __decorate([ ccclass ], PopupCoinTransfer);
    exports.default = PopupCoinTransfer;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/App": void 0,
    "../../Main/Game/src/common/BroadcastReceiver": void 0,
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/common/Dialog": void 0,
    "../../Main/Game/src/common/Utils": void 0,
    "../../Main/Game/src/networks/MiniGameNetworkClient": void 0,
    "../../Main/Game/src/networks/ShootFishNetworkClient": void 0,
    "../../Main/Lobby/src/Lobby.Cmd": void 0
  } ],
  "OanTuTi.PopupHistory": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f1670dR+nNIG7R6Pfw6NB+L", "OanTuTi.PopupHistory");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Dialog_1 = require("../../Main/Game/src/common/Dialog");
    const App_1 = require("../../Main/Game/src/common/App");
    const ShootFishNetworkClient_1 = require("../../Main/Game/src/networks/ShootFishNetworkClient");
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let PopupHistory = class PopupHistory extends Dialog_1.default {
      constructor() {
        super(...arguments);
        this.lblPage = null;
        this.itemTemplate = null;
        this.page = 1;
        this.maxPage = 1;
        this.items = new Array();
        this.data = null;
      }
      show() {
        super.show();
        for (let i = 0; i < this.items.length; i++) this.items[i].active = false;
        null != this.itemTemplate && (this.itemTemplate.active = false);
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
      actNextPage() {
        if (this.page < this.maxPage) {
          this.page++;
          this.lblPage.string = this.page + "/" + this.maxPage;
          this.loadDataLocal();
        }
      }
      actPrevPage() {
        if (this.page > 1) {
          this.page--;
          this.lblPage.string = this.page + "/" + this.maxPage;
          this.loadDataLocal();
        }
      }
      loadData() {
        App_1.default.instance.showLoading(true);
        ShootFishNetworkClient_1.default.getInstance().request("OTT3", {
          userId: Configs_1.default.Login.UserIdFish
        }, res => {
          App_1.default.instance.showLoading(false);
          if (200 != res["code"]) return;
          if (0 == this.items.length) {
            for (var i = 0; i < 10; i++) {
              let item = cc.instantiate(this.itemTemplate);
              item.parent = this.itemTemplate.parent;
              this.items.push(item);
            }
            this.itemTemplate.destroy();
            this.itemTemplate = null;
          }
          this.data = res["data"];
          this.maxPage = Math.ceil(this.data.length / 10);
          this.page = 1;
          this.loadDataLocal();
        }, this);
      }
      loadDataLocal() {
        if (null == this.data) return;
        this.lblPage.string = this.page + "/" + this.maxPage;
        let startIdx = 10 * (this.page - 1);
        let count = 10;
        startIdx + count > this.data.length && (count = this.data.length - startIdx);
        for (let i = 0; i < this.items.length; i++) {
          let item = this.items[i];
          if (i < count) {
            let itemData = this.data[startIdx + i];
            item.getChildByName("bg").opacity = i % 2 == 0 ? 10 : 0;
            item.getChildByName("Session").getComponent(cc.Label).string = itemData["Id"];
            item.getChildByName("Time").getComponent(cc.Label).string = itemData["GameTime"];
            if (itemData["Nickname1"] == Configs_1.default.Login.Nickname) {
              item.getChildByName("Choice").getComponent(cc.Label).string = this.getChoiceName(itemData["Choice1"]);
              item.getChildByName("OtherPlayer").getComponent(cc.Label).string = itemData["Nickname2"];
              let result = "Ho\xe0";
              if (1 == itemData["Result"]) {
                item.getChildByName("Receive").getComponent(cc.Label).string = "+" + Utils_1.default.formatNumber(itemData["CashChange1"]);
                result = "Th\u1eafng";
              } else if (2 == itemData["Result"]) {
                item.getChildByName("Receive").getComponent(cc.Label).string = Utils_1.default.formatNumber(-itemData["Blind"]);
                result = "Thua";
              } else item.getChildByName("Receive").getComponent(cc.Label).string = "+" + Utils_1.default.formatNumber(itemData["Blind"]);
              item.getChildByName("Result").getComponent(cc.Label).string = result;
            } else {
              item.getChildByName("Choice").getComponent(cc.Label).string = this.getChoiceName(itemData["Choice2"]);
              item.getChildByName("OtherPlayer").getComponent(cc.Label).string = itemData["Nickname1"];
              let result = "Ho\xe0";
              if (2 == itemData["Result"]) {
                item.getChildByName("Receive").getComponent(cc.Label).string = "+" + Utils_1.default.formatNumber(itemData["CashChange2"]);
                result = "Th\u1eafng";
              } else if (1 == itemData["Result"]) {
                item.getChildByName("Receive").getComponent(cc.Label).string = Utils_1.default.formatNumber(-itemData["Blind"]);
                result = "Thua";
              } else item.getChildByName("Receive").getComponent(cc.Label).string = "+" + Utils_1.default.formatNumber(itemData["Blind"]);
              item.getChildByName("Result").getComponent(cc.Label).string = result;
            }
            item.getChildByName("Bet").getComponent(cc.Label).string = Utils_1.default.formatNumber(itemData["Blind"]);
            item.active = true;
          } else item.active = false;
        }
      }
      getChoiceName(choice) {
        switch (choice) {
         case 0:
          return "K\xe9o";

         case 1:
          return "Bao";

         case 2:
          return "B\xfaa";
        }
      }
    };
    __decorate([ property(cc.Label) ], PopupHistory.prototype, "lblPage", void 0);
    __decorate([ property(cc.Node) ], PopupHistory.prototype, "itemTemplate", void 0);
    PopupHistory = __decorate([ ccclass ], PopupHistory);
    exports.default = PopupHistory;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/App": void 0,
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/common/Dialog": void 0,
    "../../Main/Game/src/common/Utils": void 0,
    "../../Main/Game/src/networks/ShootFishNetworkClient": void 0
  } ],
  "OanTuTi.PopupHonors": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "dbd49yYsz1BmZQ6ZieAMc2B", "OanTuTi.PopupHonors");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Dialog_1 = require("../../Main/Game/src/common/Dialog");
    const App_1 = require("../../Main/Game/src/common/App");
    const ShootFishNetworkClient_1 = require("../../Main/Game/src/networks/ShootFishNetworkClient");
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let PopupHonors = class PopupHonors extends Dialog_1.default {
      constructor() {
        super(...arguments);
        this.lblPage = null;
        this.itemTemplate = null;
        this.page = 1;
        this.maxPage = 1;
        this.items = new Array();
        this.data = null;
      }
      show() {
        super.show();
        for (let i = 0; i < this.items.length; i++) this.items[i].active = false;
        null != this.itemTemplate && (this.itemTemplate.active = false);
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
      actNextPage() {
        if (this.page < this.maxPage) {
          this.page++;
          this.lblPage.string = this.page + "/" + this.maxPage;
          this.loadDataLocal();
        }
      }
      actPrevPage() {
        if (this.page > 1) {
          this.page--;
          this.lblPage.string = this.page + "/" + this.maxPage;
          this.loadDataLocal();
        }
      }
      loadData() {
        App_1.default.instance.showLoading(true);
        ShootFishNetworkClient_1.default.getInstance().request("OTT4", {
          userId: Configs_1.default.Login.UserIdFish
        }, res => {
          App_1.default.instance.showLoading(false);
          if (200 != res["code"]) return;
          if (0 == this.items.length) {
            for (var i = 0; i < 10; i++) {
              let item = cc.instantiate(this.itemTemplate);
              item.parent = this.itemTemplate.parent;
              this.items.push(item);
            }
            this.itemTemplate.destroy();
            this.itemTemplate = null;
          }
          this.data = res["data"];
          this.maxPage = Math.ceil(this.data.length / 10);
          this.page = 1;
          this.loadDataLocal();
        }, this);
      }
      loadDataLocal() {
        if (null == this.data) return;
        this.lblPage.string = this.page + "/" + this.maxPage;
        let startIdx = 10 * (this.page - 1);
        let count = 10;
        startIdx + count > this.data.length && (count = this.data.length - startIdx);
        for (let i = 0; i < this.items.length; i++) {
          let item = this.items[i];
          if (i < count) {
            let itemData = this.data[startIdx + i];
            item.getChildByName("bg").opacity = i % 2 == 0 ? 10 : 0;
            item.getChildByName("Time").getComponent(cc.Label).string = itemData["GameTime"];
            item.getChildByName("Bet").getComponent(cc.Label).string = Utils_1.default.formatNumber(itemData["Blind"]);
            item.getChildByName("Player").getComponent(cc.Label).string = itemData["Nickname1"];
            item.getChildByName("Choice").getComponent(cc.Label).string = this.getChoiceName(itemData["Choice1"]);
            item.getChildByName("OtherPlayer").getComponent(cc.Label).string = itemData["Nickname2"];
            item.getChildByName("OtherChoice").getComponent(cc.Label).string = this.getChoiceName(itemData["Choice2"]);
            item.getChildByName("Receive").getComponent(cc.Label).string = itemData["CashChange1"] > itemData["CashChange2"] ? Utils_1.default.formatNumber(itemData["CashChange1"]) : Utils_1.default.formatNumber(itemData["CashChange2"]);
            item.active = true;
          } else item.active = false;
        }
      }
      getChoiceName(choice) {
        switch (choice) {
         case 0:
          return "K\xe9o";

         case 1:
          return "Bao";

         case 2:
          return "B\xfaa";
        }
      }
    };
    __decorate([ property(cc.Label) ], PopupHonors.prototype, "lblPage", void 0);
    __decorate([ property(cc.Node) ], PopupHonors.prototype, "itemTemplate", void 0);
    PopupHonors = __decorate([ ccclass ], PopupHonors);
    exports.default = PopupHonors;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/App": void 0,
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/common/Dialog": void 0,
    "../../Main/Game/src/common/Utils": void 0,
    "../../Main/Game/src/networks/ShootFishNetworkClient": void 0
  } ]
}, {}, [ "OanTuTi.OanTuTiController", "OanTuTi.PopupCoinTransfer", "OanTuTi.PopupHistory", "OanTuTi.PopupHonors" ]);