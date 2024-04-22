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
  "CaoThap.CaoThapController": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "36018wZkFBHeaYfjyMBFEbx", "CaoThap.CaoThapController");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.ButtonBet = void 0;
    const CaoThap_Cmd_1 = require("./CaoThap.Cmd");
    const MiniGame_1 = require("../../Main/Lobby/src/MiniGame");
    const MiniGameNetworkClient_1 = require("../../Main/Game/src/networks/MiniGameNetworkClient");
    const Network_InPacket_1 = require("../../Main/Game/src/networks/Network.InPacket");
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const BroadcastReceiver_1 = require("../../Main/Game/src/common/BroadcastReceiver");
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    const Tween_1 = require("../../Main/Game/src/common/Tween");
    const App_1 = require("../../Main/Game/src/common/App");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let ButtonBet = class ButtonBet {
      constructor() {
        this.button = null;
        this.sfNormal = null;
        this.sfActive = null;
        this._isActive = false;
      }
      setActive(isActive) {
        this._isActive = isActive;
        this.button.getComponent(cc.Sprite).spriteFrame = isActive ? this.sfActive : this.sfNormal;
        this.button.node.getComponentInChildren(sp.Skeleton).node.active = isActive;
        this.button.interactable = !isActive;
      }
    };
    __decorate([ property(cc.Button) ], ButtonBet.prototype, "button", void 0);
    __decorate([ property(cc.SpriteFrame) ], ButtonBet.prototype, "sfNormal", void 0);
    __decorate([ property(cc.SpriteFrame) ], ButtonBet.prototype, "sfActive", void 0);
    ButtonBet = __decorate([ ccclass("CaoThap.ButtonBet") ], ButtonBet);
    exports.ButtonBet = ButtonBet;
    let CaoThapController = class CaoThapController extends MiniGame_1.default {
      constructor() {
        super(...arguments);
        this.sprAtlasCards = null;
        this.buttonBets = [];
        this.lblJackpot = null;
        this.lblSession = null;
        this.lblUp = null;
        this.lblCurrent = null;
        this.lblDown = null;
        this.lblStatus = null;
        this.lblTime = null;
        this.btnNewTurn = null;
        this.btnClose = null;
        this.btnPlay = null;
        this.btnUp = null;
        this.btnDown = null;
        this.sprAts = [];
        this.sprCard = null;
        this.lblToast = null;
        this.lblWinCoin = null;
        this.popups = [];
        this.listBet = [ 1e3, 1e4, 5e4, 1e5, 5e5 ];
        this.betIdx = 0;
        this.oldBetIdx = 0;
        this.isCanChangeBet = true;
        this.currentTime = 0;
        this.currentTimeInt = 0;
        this.isPlaying = false;
        this.numA = 0;
        this.cardNameMap = new Object();
      }
      start() {
        super.start();
        for (let i = 0; i < 13; i++) for (let j = 0; j < 4; j++) {
          let cardPoint = (i + 2).toString();
          switch (cardPoint) {
           case "11":
            cardPoint = "J";
            break;

           case "12":
            cardPoint = "Q";
            break;

           case "13":
            cardPoint = "K";
            break;

           case "14":
            cardPoint = "A";
          }
          let cardSuit = "";
          switch (j) {
           case 0:
            cardSuit = "\u2660";
            break;

           case 1:
            cardSuit = "\u2663";
            break;

           case 2:
            cardSuit = "\u2666";
            break;

           case 3:
            cardSuit = "\u2665";
          }
          this.cardNameMap[4 * i + j] = cardPoint + cardSuit;
        }
        for (let i = 0; i < this.buttonBets.length; i++) {
          var btn = this.buttonBets[i];
          btn.setActive(i == this.betIdx);
          btn.button.node.on("click", () => {
            if (!this.isCanChangeBet) {
              this.showToast("B\u1ea1n thao t\xe1c qu\xe1 nhanh.");
              return;
            }
            this.oldBetIdx = this.betIdx;
            this.betIdx = i;
            for (let i = 0; i < this.buttonBets.length; i++) this.buttonBets[i].setActive(i == this.betIdx);
            this.lblCurrent.string = Utils_1.default.formatNumber(this.listBet[this.betIdx]);
            this.isCanChangeBet = false;
            this.scheduleOnce(() => {
              this.isCanChangeBet = true;
            }, 1);
            MiniGameNetworkClient_1.default.getInstance().send(new CaoThap_Cmd_1.default.SendChangeRoom(this.oldBetIdx, this.betIdx));
          });
        }
        BroadcastReceiver_1.default.register(BroadcastReceiver_1.default.USER_LOGOUT, () => {
          if (!this.node.active) return;
          this.dismiss();
        }, this);
        BroadcastReceiver_1.default.register(BroadcastReceiver_1.default.USER_DISCONNECTED, () => {
          if (!this.node.active) return;
          this.dismiss();
        }, this);
        MiniGameNetworkClient_1.default.getInstance().addOnClose(() => {
          if (!this.node.active) return;
          this.dismiss();
        }, this);
        MiniGameNetworkClient_1.default.getInstance().addListener(data => {
          if (!this.node.active) return;
          let inpacket = new Network_InPacket_1.default(data);
          switch (inpacket.getCmdId()) {
           case CaoThap_Cmd_1.default.Code.SCRIBE:
            {
              let res = new CaoThap_Cmd_1.default.ReceiveScribe(data);
              cc.log(res);
              this.betIdx = res.roomId;
              if (Configs_1.default.Login.Coin >= Configs_1.default.App.RICH_MAN && 0 === this.betIdx) {
                this.oldBetIdx = this.betIdx;
                this.betIdx = 1;
                MiniGameNetworkClient_1.default.getInstance().send(new CaoThap_Cmd_1.default.SendChangeRoom(this.oldBetIdx, this.betIdx));
              }
              for (let i = 0; i < this.buttonBets.length; i++) this.buttonBets[i].setActive(i == this.betIdx);
              this.isPlaying = false;
              this.sprCard.spriteFrame = this.sprAtlasCards.getSpriteFrame("card52");
              this.btnNewTurn.node.active = false;
              this.btnPlay.interactable = true;
              this.btnPlay.node.active = true;
              this.setSprAt(0);
              this.numA = 0;
              for (let i = 0; i < this.buttonBets.length; i++) this.buttonBets[i].button.interactable = true;
              this.lblTime.string = "2:00";
              this.currentTime = 0;
              this.lblUp.string = "";
              this.lblDown.string = "";
              this.lblCurrent.string = Utils_1.default.formatNumber(this.listBet[this.betIdx]);
              break;
            }

           case CaoThap_Cmd_1.default.Code.UPDATE_INFO:
            {
              let res = new CaoThap_Cmd_1.default.ReceiveUpdateInfo(data);
              this.numA = res.numA;
              this.lblUp.string = 0 == res.money1 ? "" : Utils_1.default.formatNumber(res.money1);
              this.lblCurrent.string = Utils_1.default.formatNumber(res.money2);
              this.lblDown.string = 0 == res.money3 ? "" : Utils_1.default.formatNumber(res.money3);
              this.lblSession.string = "#" + res.referenceId.toString();
              this.sprCard.spriteFrame = this.sprAtlasCards.getSpriteFrame("card" + res.card);
              this.setSprAt(this.numA);
              this.currentTime = res.time;
              this.btnNewTurn.interactable = res.step > 1;
              this.btnNewTurn.node.active = res.step > 1;
              this.btnPlay.node.active = false;
              this.lblStatus.string = "";
              this.btnUp.interactable = res.money1 > 0;
              this.btnDown.interactable = res.money3 > 0;
              for (let i = 0; i < this.buttonBets.length; i++) this.buttonBets[i].button.interactable = false;
              let cards = res.cards.split(",");
              for (let i = 0; i < cards.length - 1; i++) {
                i > 0 && (this.lblStatus.string += ",");
                this.lblStatus.string += this.cardNameMap[cards[i]];
              }
              this.isPlaying = true;
              break;
            }

           case CaoThap_Cmd_1.default.Code.UPDATE_TIME:
            {
              let res = new CaoThap_Cmd_1.default.ReceiveUpdateTime(data);
              this.currentTime = res.time;
              break;
            }

           case CaoThap_Cmd_1.default.Code.START:
            {
              let res = new CaoThap_Cmd_1.default.ReceiveStart(data);
              if (0 != res.error) {
                App_1.default.instance.actiontDialog.showMsgWithActions(res.desc, res.suggestionActions);
                3 === res.error && (this.btnPlay.node.active = true);
                return;
              }
              Configs_1.default.Login.Coin = res.currentMoney;
              BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN);
              this.lblStatus.string = "";
              this.lblUp.string = "";
              this.lblDown.string = "";
              this.lblCurrent.string = Utils_1.default.formatNumber(res.money2);
              this.lblSession.string = "#" + res.referenceId.toString();
              this.setSprAt(0);
              this.btnNewTurn.interactable = false;
              this.btnNewTurn.node.active = true;
              for (let i = 0; i < this.buttonBets.length; i++) this.buttonBets[i].button.interactable = false;
              48 != res.card && 49 != res.card && 50 != res.card && 51 != res.card || this.numA++;
              this.spinCard(res.card, () => {
                this.lblStatus.string += this.cardNameMap[res.card];
                this.lblUp.string = 0 == res.money1 ? "" : Utils_1.default.formatNumber(res.money1);
                this.lblDown.string = 0 == res.money3 ? "" : Utils_1.default.formatNumber(res.money3);
                this.btnUp.interactable = (true, this.isPlaying) && res.money1 > 0;
                this.btnDown.interactable = (true, this.isPlaying) && res.money3 > 0;
                this.setSprAt(this.numA);
              });
              this.currentTime = 120;
              this.isPlaying = true;
              break;
            }

           case CaoThap_Cmd_1.default.Code.PLAY:
            {
              let res = new CaoThap_Cmd_1.default.ReceivePlay(data);
              this.currentTime = 120;
              for (let i = 0; i < this.buttonBets.length; i++) this.buttonBets[i].button.interactable = false;
              48 != res.card && 49 != res.card && 50 != res.card && 51 != res.card || this.numA++;
              this.spinCard(res.card, () => {
                "" != this.lblStatus.string && (this.lblStatus.string += ",");
                this.lblStatus.string += this.cardNameMap[res.card];
                this.lblUp.string = 0 == res.money1 ? "" : Utils_1.default.formatNumber(res.money1);
                this.lblCurrent.string = Utils_1.default.formatNumber(res.money2);
                this.lblDown.string = 0 == res.money3 ? "" : Utils_1.default.formatNumber(res.money3);
                this.btnUp.interactable = this.isPlaying && res.money1 > 0;
                this.btnDown.interactable = this.isPlaying && res.money3 > 0;
                this.btnNewTurn.interactable = this.isPlaying;
                this.btnNewTurn.node.active = true;
                this.setSprAt(this.numA);
              });
              break;
            }

           case CaoThap_Cmd_1.default.Code.STOP:
            {
              let res = new CaoThap_Cmd_1.default.ReceiveStop(data);
              this.isPlaying = false;
              let timeDelay = 3;
              switch (res.result) {
               case 4:
                timeDelay = .5;
              }
              Configs_1.default.Login.Coin = res.currentMoney;
              this.scheduleOnce(() => {
                BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN);
                this.lblStatus.string = 'Nh\u1ea5n n\xfat "Play" \u0111\u1ec3 b\u1eaft \u0111\u1ea7u';
                this.sprCard.spriteFrame = this.sprAtlasCards.getSpriteFrame("card52");
                this.btnNewTurn.node.active = false;
                this.btnPlay.node.active = true;
                this.setSprAt(0);
                this.numA = 0;
                for (let i = 0; i < this.buttonBets.length; i++) this.buttonBets[i].button.interactable = true;
                this.lblTime.string = "2:00";
                this.currentTime = 0;
                this.lblUp.string = "";
                this.lblDown.string = "";
                this.lblCurrent.string = Utils_1.default.formatNumber(this.listBet[this.betIdx]);
                this.lblWinCoin.node.stopAllActions();
                this.lblWinCoin.node.y = -16;
                this.lblWinCoin.node.opacity = 0;
                this.lblWinCoin.string = res.moneyExchange > 0 ? "+" + Utils_1.default.formatNumber(res.moneyExchange) : "Ch\xfac may m\u1eafn !";
                this.lblWinCoin.node.active = true;
                this.lblWinCoin.node.runAction(cc.sequence(cc.spawn(cc.fadeIn(.2), cc.moveBy(2, cc.v2(0, 100))), cc.fadeOut(.15), cc.callFunc(() => {
                  this.lblWinCoin.node.active = false;
                })));
              }, timeDelay);
              break;
            }

           case CaoThap_Cmd_1.default.Code.CHANGE_ROOM:
            {
              let res = new CaoThap_Cmd_1.default.ReceiveChangeRoom(data);
              if (0 != res.status) {
                this.betIdx = this.oldBetIdx;
                for (let i = 0; i < this.buttonBets.length; i++) this.buttonBets[i].setActive(i == this.betIdx);
                this.lblCurrent.string = Utils_1.default.formatNumber(this.listBet[this.betIdx]);
              }
              break;
            }

           case CaoThap_Cmd_1.default.Code.UPDATE_JACKPOT:
            {
              let res = new CaoThap_Cmd_1.default.ReceiveUpdateJackpot(data);
              Tween_1.default.numberTo(this.lblJackpot, res.value, .3);
              break;
            }
          }
        }, this);
      }
      update(dt) {
        if (this.currentTime > 0) {
          this.currentTime = Math.max(0, this.currentTime - dt);
          let _currentTimeInt = parseInt(this.currentTime.toString());
          if (this.currentTimeInt != _currentTimeInt) {
            this.currentTimeInt = _currentTimeInt;
            this.lblTime.string = this.longToTime(this.currentTimeInt);
          }
        }
      }
      showToast(message) {
        this.lblToast.string = message;
        let parent = this.lblToast.node.parent;
        parent.stopAllActions();
        parent.active = true;
        parent.opacity = 0;
        parent.runAction(cc.sequence(cc.fadeIn(.1), cc.delayTime(2), cc.fadeOut(.2), cc.callFunc(() => {
          parent.active = false;
        })));
      }
      spinCard(id, onFinished) {
        let c = 15;
        this.schedule(() => {
          c--;
          if (0 == c) {
            this.sprCard.node.color = cc.Color.WHITE;
            this.sprCard.spriteFrame = this.sprAtlasCards.getSpriteFrame("card" + id);
            onFinished();
          } else {
            this.sprCard.node.color = cc.Color.BLACK.fromHEX("#CCCCCC");
            this.sprCard.spriteFrame = this.sprAtlasCards.getSpriteFrame("card" + Utils_1.default.randomRangeInt(0, 52));
          }
        }, .1, c - 1, 0);
      }
      longToTime(time) {
        let m = parseInt((time / 60).toString());
        let s = time % 60;
        return m + ":" + (s < 10 ? "0" : "") + s;
      }
      show() {
        if (this.node.active) {
          this.reOrder();
          return;
        }
        super.show();
        this.betIdx = 0;
        for (let i = 0; i < this.buttonBets.length; i++) this.buttonBets[i].setActive(i == this.betIdx);
        MiniGameNetworkClient_1.default.getInstance().send(new CaoThap_Cmd_1.default.SendScribe(this.betIdx));
        this.lblToast.node.parent.active = false;
        this.lblStatus.string = 'Nh\u1ea5n n\xfat "Play" \u0111\u1ec3 b\u1eaft \u0111\u1ea7u';
        this.lblSession.string = "";
        this.lblUp.string = "";
        this.lblDown.string = "";
        this.lblCurrent.string = Utils_1.default.formatNumber(this.listBet[this.betIdx]);
        this.setSprAt(0);
        this.btnNewTurn.interactable = false;
        this.btnNewTurn.node.active = false;
        this.btnUp.interactable = false;
        this.btnDown.interactable = false;
        this.btnPlay.interactable = false;
        this.lblWinCoin.node.active = false;
        this.isCanChangeBet = true;
      }
      actStart() {
        this.btnPlay.node.active = false;
        MiniGameNetworkClient_1.default.getInstance().send(new CaoThap_Cmd_1.default.SendStart(this.listBet[this.betIdx]));
      }
      actUp() {
        this.btnUp.interactable = false;
        this.btnDown.interactable = false;
        this.btnNewTurn.interactable = false;
        MiniGameNetworkClient_1.default.getInstance().send(new CaoThap_Cmd_1.default.SendPlay(this.listBet[this.betIdx], true));
      }
      actDown() {
        this.btnUp.interactable = false;
        this.btnDown.interactable = false;
        this.btnNewTurn.interactable = false;
        MiniGameNetworkClient_1.default.getInstance().send(new CaoThap_Cmd_1.default.SendPlay(this.listBet[this.betIdx], false));
      }
      actStop() {
        this.btnNewTurn.interactable = false;
        this.btnNewTurn.node.active = false;
        MiniGameNetworkClient_1.default.getInstance().send(new CaoThap_Cmd_1.default.SendStop(this.listBet[this.betIdx]));
      }
      dismiss() {
        super.dismiss();
        for (let i = 0; i < this.popups.length; i++) this.popups[i].active = false;
        MiniGameNetworkClient_1.default.getInstance().send(new CaoThap_Cmd_1.default.SendUnScribe(this.betIdx));
      }
      setSprAt(num) {
        for (let i = 0; i < this.sprAts.length; i++) this.sprAts[i].interactable = i < num;
      }
    };
    __decorate([ property(cc.SpriteAtlas) ], CaoThapController.prototype, "sprAtlasCards", void 0);
    __decorate([ property([ ButtonBet ]) ], CaoThapController.prototype, "buttonBets", void 0);
    __decorate([ property(cc.Label) ], CaoThapController.prototype, "lblJackpot", void 0);
    __decorate([ property(cc.Label) ], CaoThapController.prototype, "lblSession", void 0);
    __decorate([ property(cc.Label) ], CaoThapController.prototype, "lblUp", void 0);
    __decorate([ property(cc.Label) ], CaoThapController.prototype, "lblCurrent", void 0);
    __decorate([ property(cc.Label) ], CaoThapController.prototype, "lblDown", void 0);
    __decorate([ property(cc.Label) ], CaoThapController.prototype, "lblStatus", void 0);
    __decorate([ property(cc.Label) ], CaoThapController.prototype, "lblTime", void 0);
    __decorate([ property(cc.Button) ], CaoThapController.prototype, "btnNewTurn", void 0);
    __decorate([ property(cc.Button) ], CaoThapController.prototype, "btnClose", void 0);
    __decorate([ property(cc.Button) ], CaoThapController.prototype, "btnPlay", void 0);
    __decorate([ property(cc.Button) ], CaoThapController.prototype, "btnUp", void 0);
    __decorate([ property(cc.Button) ], CaoThapController.prototype, "btnDown", void 0);
    __decorate([ property([ cc.Button ]) ], CaoThapController.prototype, "sprAts", void 0);
    __decorate([ property(cc.Sprite) ], CaoThapController.prototype, "sprCard", void 0);
    __decorate([ property(cc.Label) ], CaoThapController.prototype, "lblToast", void 0);
    __decorate([ property(cc.Label) ], CaoThapController.prototype, "lblWinCoin", void 0);
    __decorate([ property([ cc.Node ]) ], CaoThapController.prototype, "popups", void 0);
    CaoThapController = __decorate([ ccclass ], CaoThapController);
    exports.default = CaoThapController;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/App": void 0,
    "../../Main/Game/src/common/BroadcastReceiver": void 0,
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/common/Tween": void 0,
    "../../Main/Game/src/common/Utils": void 0,
    "../../Main/Game/src/networks/MiniGameNetworkClient": void 0,
    "../../Main/Game/src/networks/Network.InPacket": void 0,
    "../../Main/Lobby/src/MiniGame": void 0,
    "./CaoThap.Cmd": "CaoThap.Cmd"
  } ],
  "CaoThap.Cmd": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f5d2dv+EAxA86iOBlbg0cVg", "CaoThap.Cmd");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.cmd = void 0;
    const Network_OutPacket_1 = require("../../Main/Game/src/networks/Network.OutPacket");
    const Network_InPacket_1 = require("../../Main/Game/src/networks/Network.InPacket");
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    const Constants_1 = require("../../Main/Game/src/common/Constants");
    const {ccclass: ccclass, property: property} = cc._decorator;
    var cmd;
    (function(cmd) {
      class Code {}
      Code.SCRIBE = 6004;
      Code.UNSCRIBE = 6005;
      Code.START = 6001;
      Code.PLAY = 6002;
      Code.CHANGE_ROOM = 6006;
      Code.UPDATE_TIME = 6008;
      Code.UPDATE_INFO = 6009;
      Code.UPDATE_JACKPOT = 6003;
      Code.STOP = 6007;
      cmd.Code = Code;
      class SendScribe extends Network_OutPacket_1.default {
        constructor(betIdx) {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.SCRIBE);
          this.packHeader();
          this.putByte(betIdx);
          this.updateSize();
        }
      }
      cmd.SendScribe = SendScribe;
      class ReceiveScribe extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.status = 0;
          this.roomId = 0;
          this.status = this.getByte();
          this.roomId = this.getByte();
        }
      }
      cmd.ReceiveScribe = ReceiveScribe;
      class SendUnScribe extends Network_OutPacket_1.default {
        constructor(betIdx) {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.UNSCRIBE);
          this.packHeader();
          this.putByte(betIdx);
          this.updateSize();
        }
      }
      cmd.SendUnScribe = SendUnScribe;
      class SendChangeRoom extends Network_OutPacket_1.default {
        constructor(oldBetIdx, newBetIdx) {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.CHANGE_ROOM);
          this.packHeader();
          this.putByte(oldBetIdx);
          this.putByte(newBetIdx);
          this.updateSize();
        }
      }
      cmd.SendChangeRoom = SendChangeRoom;
      class ReceiveChangeRoom extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.status = 0;
          this.status = this.getByte();
        }
      }
      cmd.ReceiveChangeRoom = ReceiveChangeRoom;
      class SendStart extends Network_OutPacket_1.default {
        constructor(betValue) {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.START);
          this.packHeader();
          this.putInt(betValue);
          this.putByte(Configs_1.default.App.MONEY_TYPE);
          this.updateSize();
        }
      }
      cmd.SendStart = SendStart;
      class ReceiveStart extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.error = 0;
          this.referenceId = 0;
          this.card = 0;
          this.money1 = 0;
          this.money2 = 0;
          this.money3 = 0;
          this.currentMoney = 0;
          this.desc = "";
          this.suggestionActions = [];
          this.error = this.getError();
          this.referenceId = this.getLong();
          this.card = this.getByte();
          this.money1 = this.getLong();
          this.money2 = this.getLong();
          this.money3 = this.getLong();
          this.currentMoney = this.getLong();
          this.desc = this.getString();
          let actionsStr = this.getString();
          if (actionsStr) {
            let actions = JSON.parse(actionsStr);
            (null === actions || void 0 === actions ? void 0 : actions.hasOwnProperty("object")) && Array.isArray(actions["object"]) && (this.suggestionActions = Constants_1.UserActions.toEnums(actions["object"]));
          }
        }
      }
      cmd.ReceiveStart = ReceiveStart;
      class SendPlay extends Network_OutPacket_1.default {
        constructor(betValue, isUp) {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.PLAY);
          this.packHeader();
          this.putInt(betValue);
          this.putByte(Configs_1.default.App.MONEY_TYPE);
          this.putByte(isUp ? 1 : 0);
          this.updateSize();
        }
      }
      cmd.SendPlay = SendPlay;
      class ReceivePlay extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.card = 0;
          this.money1 = 0;
          this.money2 = 0;
          this.money3 = 0;
          this.card = this.getByte();
          this.money1 = this.getLong();
          this.money2 = this.getLong();
          this.money3 = this.getLong();
        }
      }
      cmd.ReceivePlay = ReceivePlay;
      class SendStop extends Network_OutPacket_1.default {
        constructor(betValue) {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.STOP);
          this.packHeader();
          this.putInt(betValue);
          this.putByte(Configs_1.default.App.MONEY_TYPE);
          this.updateSize();
        }
      }
      cmd.SendStop = SendStop;
      class ReceiveStop extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.result = 0;
          this.currentMoney = 0;
          this.moneyExchange = 0;
          this.result = this.getByte();
          this.currentMoney = this.getLong();
          this.moneyExchange = this.getLong();
        }
      }
      cmd.ReceiveStop = ReceiveStop;
      class ReceiveUpdateInfo extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.numA = 0;
          this.card = 0;
          this.money1 = 0;
          this.money2 = 0;
          this.money3 = 0;
          this.time = 0;
          this.step = 0;
          this.referenceId = 0;
          this.cards = "";
          this.numA = this.getByte();
          this.card = this.getByte();
          this.money1 = this.getLong();
          this.money2 = this.getLong();
          this.money3 = this.getLong();
          this.time = this.getShort();
          this.step = this.getByte();
          this.referenceId = this.getLong();
          this.cards = this.getString();
        }
      }
      cmd.ReceiveUpdateInfo = ReceiveUpdateInfo;
      class ReceiveUpdateJackpot extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.value = 0;
          this.value = this.getLong();
        }
      }
      cmd.ReceiveUpdateJackpot = ReceiveUpdateJackpot;
      class ReceiveUpdateTime extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.time = 0;
          this.time = this.getShort();
        }
      }
      cmd.ReceiveUpdateTime = ReceiveUpdateTime;
    })(cmd = exports.cmd || (exports.cmd = {}));
    exports.default = cmd;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/common/Constants": void 0,
    "../../Main/Game/src/networks/Network.InPacket": void 0,
    "../../Main/Game/src/networks/Network.OutPacket": void 0
  } ],
  "CaoThap.PopupHistory": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ca485p4tQhO3JvdidJzPzNa", "CaoThap.PopupHistory");
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
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    const App_1 = require("../../Main/Game/src/common/App");
    const Http_1 = require("../../Main/Game/src/common/Http");
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
      loadData() {
        App_1.default.instance.showLoading(true);
        Http_1.default.get(Configs_1.default.App.API, {
          c: 107,
          mt: Configs_1.default.App.MONEY_TYPE,
          p: this.page,
          nn: Configs_1.default.Login.Nickname
        }, (err, res) => {
          App_1.default.instance.showLoading(false);
          if (null != err) return;
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
              if (i < res["results"].length) {
                let itemData = res["results"][i];
                item.getChildByName("bg").opacity = i % 2 == 0 ? 255 : 0;
                item.getChildByName("Time").getComponent(cc.Label).string = itemData["transId"] + "\n" + itemData["timestamp"].replace(" ", "\n");
                item.getChildByName("Bet").getComponent(cc.Label).string = Utils_1.default.formatMoney(itemData["betValue"]);
                item.getChildByName("Result").getComponent(cc.Label).string = itemData["cards"];
                item.getChildByName("Win").getComponent(cc.Label).string = Utils_1.default.formatMoney(itemData["prize"]);
                item.getChildByName("Step").getComponent(cc.Label).string = Utils_1.default.formatMoney(itemData["step"]);
                1 == itemData["step"] ? item.getChildByName("BetDoor").getComponent(cc.Label).string = "" : item.getChildByName("BetDoor").getComponent(cc.Label).string = 0 == itemData["potBet"] ? "D\u01b0\u1edbi" : "Tr\xean";
                item.active = true;
              } else item.active = false;
            }
          }
        });
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
    "../../Main/Game/src/common/Http": void 0,
    "../../Main/Game/src/common/Utils": void 0
  } ],
  "CaoThap.PopupHonors": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2102dKYcKJPSaCuwo7ODtFN", "CaoThap.PopupHonors");
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
    const Http_1 = require("../../Main/Game/src/common/Http");
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const ErrorLogger_1 = require("../../Main/Game/src/common/ErrorLogger");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let PopupHonors = class PopupHonors extends Dialog_1.default {
      constructor() {
        super(...arguments);
        this.lblPage = null;
        this.itemTemplate = null;
        this.atlasVip = null;
        this.page = 1;
        this.maxPage = 1;
        this.items = new Array();
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
      loadData() {
        App_1.default.instance.showLoading(true);
        Http_1.default.get(Configs_1.default.App.API, {
          c: 108,
          mt: Configs_1.default.App.MONEY_TYPE,
          p: this.page
        }, (err, res) => {
          App_1.default.instance.showLoading(false);
          if (null != err) return;
          cc.log(res);
          try {
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
              for (let i = this.items.length - 1; i >= 0; i--) {
                let item = this.items[i];
                if (i < res["results"].length) {
                  let itemData = res["results"][i];
                  let dataVip = res["listUserVipRank"] && res["listUserVipRank"].find(data => data.nickname == itemData["nickname"]);
                  item.active = false;
                  item.getChildByName("bg").opacity = i % 2 == 0 ? 10 : 0;
                  item.getChildByName("Time").getComponent(cc.Label).string = itemData["timestamp"].replace(" ", "\n");
                  item.getChildByName("name").getChildByName("lblAccount").getComponent(cc.Label).string = itemData["nickname"].length > 11 ? itemData["nickname"].substr(0, 10) + "..." : itemData["nickname"];
                  item.getChildByName("name").getChildByName("lblAccount").color = dataVip ? cc.Color.BLACK.fromHEX(Utils_1.default.getColorVip(dataVip.rank)) : cc.Color.BLACK.fromHEX(Utils_1.default.getColorVip("VIP_0"));
                  item.getChildByName("name").getChildByName("lblAccount").getComponent(cc.LabelOutline).color = dataVip ? cc.Color.BLACK.fromHEX(Utils_1.default.getColorVip(dataVip.rank)) : cc.Color.BLACK.fromHEX(Utils_1.default.getColorVip("VIP_0"));
                  item.getChildByName("name").getChildByName("vip").getComponent(cc.Sprite).spriteFrame = this.atlasVip.getSpriteFrame(dataVip.rank);
                  item.getChildByName("Bet").getComponent(cc.Label).string = Utils_1.default.formatMoney(itemData["betValue"]);
                  item.getChildByName("Win").getComponent(cc.Label).string = Utils_1.default.formatMoney(itemData["prize"]);
                  switch (itemData["result"]) {
                   case 4:
                    item.getChildByName("Result").getComponent(cc.Label).string = "Th\u1eafng l\u1edbn";
                    break;

                   default:
                    item.getChildByName("Result").getComponent(cc.Label).string = "N\u1ed5 h\u0169";
                  }
                  item.active = true;
                  item.position = cc.v3(cc.winSize.width, 400);
                  item.stopAllActions();
                  let speed = .7;
                  item.runAction(cc.sequence(cc.delayTime(.15 * (this.items.length - i) * speed), cc.moveTo(.15 * speed, cc.v2(0, 400)), cc.delayTime(.05), cc.moveTo(.2 * speed * (1 === i ? .8 : 1 - Math.pow(2, -10 * i)), cc.v2(0, 380 - 85 * i)).easing(cc.easeCircleActionOut())));
                } else item.active = false;
              }
            }
          } catch (error) {
            ErrorLogger_1.ErrorLogger.sendLogError("Http response", "Cao thap honor", JSON.stringify(res) + "\n" + JSON.stringify(error.stack));
          }
        });
      }
    };
    __decorate([ property(cc.Label) ], PopupHonors.prototype, "lblPage", void 0);
    __decorate([ property(cc.Node) ], PopupHonors.prototype, "itemTemplate", void 0);
    __decorate([ property(cc.SpriteAtlas) ], PopupHonors.prototype, "atlasVip", void 0);
    PopupHonors = __decorate([ ccclass ], PopupHonors);
    exports.default = PopupHonors;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/App": void 0,
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/common/Dialog": void 0,
    "../../Main/Game/src/common/ErrorLogger": void 0,
    "../../Main/Game/src/common/Http": void 0,
    "../../Main/Game/src/common/Utils": void 0
  } ]
}, {}, [ "CaoThap.CaoThapController", "CaoThap.Cmd", "CaoThap.PopupHistory", "CaoThap.PopupHonors" ]);