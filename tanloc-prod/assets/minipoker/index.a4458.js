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
  "MiniPoker.Cmd": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "62c5aekeZlAL4VtbeCtXj2Z", "MiniPoker.Cmd");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.cmd = void 0;
    const Network_OutPacket_1 = require("../../Main/Game/src/networks/Network.OutPacket");
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    const Network_InPacket_1 = require("../../Main/Game/src/networks/Network.InPacket");
    const Constants_1 = require("../../Main/Game/src/common/Constants");
    var cmd;
    (function(cmd) {
      class Code {}
      Code.SCRIBE = 4003;
      Code.UNSCRIBE = 4004;
      Code.CHANGE_ROOM = 4005;
      Code.SPIN = 4001;
      Code.UPDATE_JACKPOT = 4002;
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
      class SendSpin extends Network_OutPacket_1.default {
        constructor(betValue) {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.SPIN);
          this.packHeader();
          this.putLong(betValue);
          this.putShort(Configs_1.default.App.MONEY_TYPE);
          this.updateSize();
        }
      }
      cmd.SendSpin = SendSpin;
      class ReceiveUpdateJackpot extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.value = 0;
          this.x2 = 0;
          this.value = this.getLong();
          this.x2 = this.getByte();
        }
      }
      cmd.ReceiveUpdateJackpot = ReceiveUpdateJackpot;
      class ReceiveSpin extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.result = 0;
          this.prize = 0;
          this.card1 = 0;
          this.card2 = 0;
          this.card3 = 0;
          this.card4 = 0;
          this.card5 = 0;
          this.currentMoney = 0;
          this.desc = "";
          this.suggestionActions = [];
          this.result = this.getShort();
          this.prize = this.getLong();
          this.card1 = this.getByte();
          this.card2 = this.getByte();
          this.card3 = this.getByte();
          this.card4 = this.getByte();
          this.card5 = this.getByte();
          this.currentMoney = this.getLong();
          this.desc = this.getString();
          let actionsStr = this.getString();
          if (actionsStr) {
            let actions = JSON.parse(actionsStr);
            (null === actions || void 0 === actions ? void 0 : actions.hasOwnProperty("object")) && Array.isArray(actions["object"]) && (this.suggestionActions = Constants_1.UserActions.toEnums(actions["object"]));
          }
        }
      }
      cmd.ReceiveSpin = ReceiveSpin;
    })(cmd = exports.cmd || (exports.cmd = {}));
    exports.default = cmd;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/common/Constants": void 0,
    "../../Main/Game/src/networks/Network.InPacket": void 0,
    "../../Main/Game/src/networks/Network.OutPacket": void 0
  } ],
  "MiniPoker.MiniPokerController": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "93f55F36+ZG/4x1s8HLfpyR", "MiniPoker.MiniPokerController");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.ButtonBet = exports.SpinType = exports.SpinMode = void 0;
    const MiniGame_1 = require("../../Main/Lobby/src/MiniGame");
    const MiniPoker_Cmd_1 = require("./MiniPoker.Cmd");
    const MiniGameNetworkClient_1 = require("../../Main/Game/src/networks/MiniGameNetworkClient");
    const Network_InPacket_1 = require("../../Main/Game/src/networks/Network.InPacket");
    const Tween_1 = require("../../Main/Game/src/common/Tween");
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const BroadcastReceiver_1 = require("../../Main/Game/src/common/BroadcastReceiver");
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    const App_1 = require("../../Main/Game/src/common/App");
    const {ccclass: ccclass, property: property} = cc._decorator;
    var SpinMode;
    (function(SpinMode) {
      SpinMode[SpinMode["NORMAL"] = 0] = "NORMAL";
      SpinMode[SpinMode["AUTO"] = 1] = "AUTO";
      SpinMode[SpinMode["AUTO_X2"] = 2] = "AUTO_X2";
    })(SpinMode = exports.SpinMode || (exports.SpinMode = {}));
    class SpinType {
      constructor(parameters) {
        this.normal = true;
        this.auto = false;
        this.autox2 = false;
        this.normal = null === parameters || void 0 === parameters ? void 0 : parameters.normal;
        this.auto = null === parameters || void 0 === parameters ? void 0 : parameters.auto;
        this.autox2 = null === parameters || void 0 === parameters ? void 0 : parameters.autox2;
      }
    }
    exports.SpinType = SpinType;
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
    ButtonBet = __decorate([ ccclass("ButtonBet") ], ButtonBet);
    exports.ButtonBet = ButtonBet;
    let MiniPokerController = class MiniPokerController extends MiniGame_1.default {
      constructor() {
        super(...arguments);
        this.sprAtlasCards = null;
        this.columns = null;
        this.itemTemplate = null;
        this.lblJackpot = null;
        this.buttonBets = [];
        this.lblToast = null;
        this.btnSpin = null;
        this.btnClose = null;
        this.toggleAuto = null;
        this.btnBoost = null;
        this.boostActive = null;
        this.sprResult = null;
        this.lblWinCash = null;
        this.sfTxtNoHu = null;
        this.sfTxtThungPhaSanh = null;
        this.sfTxtTuQuy = null;
        this.sfTxtThung = null;
        this.sfTxtCuLu = null;
        this.sfTxtSanh = null;
        this.sfTxtSamCo = null;
        this.sfTxtHaiDoi = null;
        this.sfTxtDoiJ = null;
        this.popups = [];
        this.spinType = {
          normal: true,
          auto: false,
          autox2: false
        };
        this.rollStartItemCount = 15;
        this.rollAddItemCount = 10;
        this.spinDuration = 1.2;
        this.addSpinDuration = .3;
        this.listBet = [ 100, 1e3, 1e4 ];
        this.defaultCards = [ 0, 1, 2, 3, 4 ];
        this.itemHeight = 0;
        this.betIdx = 0;
        this.isBoost = false;
        this.isCanChangeBet = true;
        this.isSpined = true;
        this.lastSpinRes = null;
      }
      start() {
        super.start();
        this.itemHeight = this.itemTemplate.height;
        for (let i = 0; i < this.columns.childrenCount; i++) {
          let column = this.columns.children[i];
          let count = this.rollStartItemCount + i * this.rollAddItemCount;
          for (let j = 0; j < count; j++) {
            let item = cc.instantiate(this.itemTemplate);
            item.parent = column;
            item.children[0].getComponent(cc.Sprite).spriteFrame = j >= 1 ? this.sprAtlasCards.getSpriteFrame("cardBlur_" + Utils_1.default.randomRangeInt(1, 15)) : this.sprAtlasCards.getSpriteFrame("card" + this.defaultCards[i]);
          }
        }
        this.itemTemplate.removeFromParent();
        this.itemTemplate = null;
        for (let i = 0; i < this.buttonBets.length; i++) {
          var btn = this.buttonBets[i];
          btn.setActive(i == this.betIdx);
          btn.button.node.on("click", () => {
            if (!this.isCanChangeBet) {
              this.showToast("B\u1ea1n thao t\xe1c qu\xe1 nhanh.");
              return;
            }
            let oldIdx = this.betIdx;
            this.betIdx = i;
            for (let i = 0; i < this.buttonBets.length; i++) this.buttonBets[i].setActive(i == this.betIdx);
            this.isCanChangeBet = false;
            this.scheduleOnce(() => {
              this.isCanChangeBet = true;
            }, 1);
            MiniGameNetworkClient_1.default.getInstance().send(new MiniPoker_Cmd_1.default.SendChangeRoom(oldIdx, this.betIdx));
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
           case MiniPoker_Cmd_1.default.Code.UPDATE_JACKPOT:
            {
              let res = new MiniPoker_Cmd_1.default.ReceiveUpdateJackpot(data);
              Tween_1.default.numberTo(this.lblJackpot, res.value, .3);
              break;
            }

           case MiniPoker_Cmd_1.default.Code.SPIN:
            {
              let res = new MiniPoker_Cmd_1.default.ReceiveSpin(data);
              cc.log(res);
              this.onSpinResult(res);
              break;
            }
          }
        }, this);
      }
      show() {
        if (this.node.active) {
          this.reOrder();
          return;
        }
        super.show();
        this.lblToast.node.parent.active = false;
        this.sprResult.active = false;
        this.lblWinCash.active = false;
        this.isSpined = true;
        this.isCanChangeBet = true;
        this.betIdx = Configs_1.default.Login.Coin >= Configs_1.default.App.RICH_MAN ? 1 : 0;
        for (let i = 0; i < this.buttonBets.length; i++) this.buttonBets[i].setActive(i == this.betIdx);
        this.setSpinMode(SpinMode.NORMAL);
        this.setEnableAllButtons(true);
        MiniGameNetworkClient_1.default.getInstance().send(new MiniPoker_Cmd_1.default.SendScribe(this.betIdx));
      }
      actSpinAuTo() {
        this.spinType.auto ? this.setSpinMode(SpinMode.NORMAL) : this.setSpinMode(SpinMode.AUTO);
      }
      actSpinBoost() {
        this.isBoost = !this.isBoost;
        this.spinType.autox2 ? this.spinType.auto ? this.setSpinMode(SpinMode.AUTO) : this.setSpinMode(SpinMode.NORMAL) : this.setSpinMode(SpinMode.AUTO_X2);
      }
      setSpinMode(mode) {
        switch (mode) {
         case SpinMode.AUTO:
          this.spinType.auto = true;
          this.spinType.autox2 = false;
          break;

         case SpinMode.AUTO_X2:
          this.spinType.autox2 = true;
          break;

         default:
          this.spinType.auto = false;
          this.spinType.autox2 = false;
        }
        this.toggleAuto.isChecked = this.spinType.auto;
        this.btnBoost.isChecked = this.spinType.autox2;
        this.btnSpin.node.getChildByName("lb-spin").active = !(this.spinType.auto || this.spinType.autox2);
        this.btnSpin.node.getChildByName("btstop").active = this.spinType.auto || this.spinType.autox2;
        (this.spinType.auto || this.spinType.autox2) && this.isSpined && this.actSpin();
      }
      actSpin(click = false) {
        click && this.setSpinMode(SpinMode.NORMAL);
        if (!this.isSpined) {
          this.showToast("B\u1ea1n thao t\xe1c qu\xe1 nhanh.");
          return;
        }
        this.isSpined = false;
        this.setEnableAllButtons(false);
        for (var i = 0; i < this.buttonBets.length; i++) this.buttonBets[i].button.interactable = false;
        MiniGameNetworkClient_1.default.getInstance().send(new MiniPoker_Cmd_1.default.SendSpin(this.listBet[this.betIdx]));
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
      setEnableAllButtons(isEnable) {
        this.btnSpin.node.getChildByName("lb-spin").active = isEnable;
        this.btnSpin.node.getChildByName("btstop").active = !isEnable;
        this.btnClose.interactable = isEnable;
      }
      onSpinResult(data) {
        this.lastSpinRes = data;
        var resultSuccess = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ];
        if (resultSuccess.indexOf(data.result) < 0) {
          this.scheduleOnce(function() {
            this.isSpined = true;
          }, 1);
          this.setEnableAllButtons(true);
          for (var i = 0; i < this.buttonBets.length; i++) this.buttonBets[i].button.interactable = true;
          this.spinType.auto = false;
          this.toggleAuto.interactable = true;
          this.spinType.autox2 = false;
          this.btnBoost.interactable = true;
          App_1.default.instance.actiontDialog.showMsgWithActions(data.desc, data.suggestionActions);
          return;
        }
        Configs_1.default.Login.Coin -= this.listBet[this.betIdx];
        BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN);
        Configs_1.default.Login.Coin = data.currentMoney;
        let result = [ data.card1, data.card2, data.card3, data.card4, data.card5 ];
        let timeScale = this.spinType.autox2 ? .5 : 1;
        for (let i = 0; i < this.columns.childrenCount; i++) {
          let roll = this.columns.children[i];
          roll.opacity = 255;
          let step1Pos = .2 * this.itemHeight;
          let step2Pos = -this.itemHeight * roll.childrenCount + this.itemHeight - .2 * this.itemHeight;
          let step3Pos = -this.itemHeight * roll.childrenCount + this.itemHeight;
          roll.runAction(cc.sequence(cc.delayTime(.2 * i * timeScale), cc.moveTo(.2 * timeScale, cc.v2(roll.getPosition().x, step1Pos)).easing(cc.easeQuadraticActionOut()), cc.callFunc(() => {
            let children = roll.children;
            let bottomSprite = children[0].children[0].getComponent(cc.Sprite);
            let topSprite = children[children.length - 1].children[0].getComponent(cc.Sprite);
            bottomSprite.spriteFrame = topSprite.spriteFrame = this.sprAtlasCards.getSpriteFrame("card" + result[i]);
          }), cc.moveTo((this.spinDuration + this.addSpinDuration * i) * timeScale, cc.v2(roll.getPosition().x, step2Pos)).easing(cc.easeQuadraticActionInOut()), cc.moveTo(.2 * timeScale, cc.v2(roll.getPosition().x, step3Pos)).easing(cc.easeQuadraticActionIn()), cc.callFunc(() => {
            roll.setPosition(cc.v2(roll.getPosition().x, 0));
            i === this.columns.childrenCount - 1 && this.spined();
          })));
        }
      }
      getHighlightCard(result) {
        let sam = [];
        let sanh = [];
        let thung = [];
        let listCard = result.map(numberCard => ({
          code: numberCard,
          numberCard: Math.ceil((numberCard + 1) / 4) % 13 + 1,
          typeCard: numberCard % 4
        })).sort((a, b) => a.numberCard - b.numberCard);
        listCard.forEach(card => {
          let cardSam = listCard.find(card_local => card_local.numberCard == card.numberCard && card_local.typeCard != card.typeCard);
          cardSam && -1 == sam.indexOf(card) && sam.push(card);
          let cardThung = listCard.find(card_local => card_local.typeCard != card.typeCard);
          cardThung || (thung = listCard);
        });
        sanh.push(listCard[2]);
        for (let idx = 1; idx <= 2; idx++) {
          listCard[2].numberCard == listCard[2 - idx].numberCard - idx && sanh.push(listCard[2 - idx]);
          listCard[2].numberCard == listCard[2 + idx].numberCard + idx && sanh.push(listCard[2 + idx]);
        }
        1 == listCard[0].numberCard && 13 == listCard[4].numberCard && sanh.push(listCard[0]);
        if (5 == sanh.length) return sanh.map(card => card.code);
        if (5 == thung.length) return thung.map(card => card.code);
        if (sam.length > 0) return sam.map(card => card.code);
        return [ result.slice().sort((a, b) => a - b).pop() ];
      }
      spined() {
        BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN);
        this.setEnableAllButtons(true);
        if (this.lastSpinRes.prize > 0) {
          switch (this.lastSpinRes.result) {
           case 1:
            this.sprResult.getComponentInChildren(cc.Sprite).spriteFrame = this.sfTxtNoHu;
            break;

           case 2:
            this.sprResult.getComponentInChildren(cc.Sprite).spriteFrame = this.sfTxtThungPhaSanh;
            break;

           case 3:
            this.sprResult.getComponentInChildren(cc.Sprite).spriteFrame = this.sfTxtTuQuy;
            break;

           case 4:
            this.sprResult.getComponentInChildren(cc.Sprite).spriteFrame = this.sfTxtCuLu;
            break;

           case 5:
            this.sprResult.getComponentInChildren(cc.Sprite).spriteFrame = this.sfTxtThung;
            break;

           case 6:
            this.sprResult.getComponentInChildren(cc.Sprite).spriteFrame = this.sfTxtSanh;
            break;

           case 7:
            this.sprResult.getComponentInChildren(cc.Sprite).spriteFrame = this.sfTxtSamCo;
            break;

           case 8:
            this.sprResult.getComponentInChildren(cc.Sprite).spriteFrame = this.sfTxtHaiDoi;
            break;

           case 9:
            this.sprResult.getComponentInChildren(cc.Sprite).spriteFrame = this.sfTxtDoiJ;
          }
          this.sprResult.active = true;
          this.sprResult.getComponentInChildren(sp.Skeleton).setAnimation(0, "animation", false);
          this.scheduleOnce(() => {
            this.sprResult.active = false;
          }, 1.5);
          this.lblWinCash.active = true;
          this.lblWinCash.getComponent(cc.Label).string = "+" + this.lastSpinRes.prize;
          this.lblWinCash.setPosition(cc.v2(0, 42));
          this.lblWinCash.runAction(cc.sequence(cc.delayTime(.5), cc.moveBy(1, cc.v2(0, 140)), cc.delayTime(1), cc.callFunc(() => {
            this.lblWinCash.active = false;
            this.scheduleOnce(() => {
              this.isSpined = true;
              if (this.spinType.auto || this.spinType.autox2) this.actSpin(); else for (var i = 0; i < this.buttonBets.length; i++) this.buttonBets[i].button.interactable = true;
            }, .2);
          })));
        } else this.scheduleOnce(() => {
          this.isSpined = true;
          if (this.spinType.auto || this.spinType.autox2) this.actSpin(); else for (var i = 0; i < this.buttonBets.length; i++) this.buttonBets[i].button.interactable = true;
        }, .4);
        let result = [ this.lastSpinRes.card1, this.lastSpinRes.card2, this.lastSpinRes.card3, this.lastSpinRes.card4, this.lastSpinRes.card5 ];
        let highlight = this.getHighlightCard(result);
        for (let i = 0; i < this.columns.childrenCount; i++) {
          let roll = this.columns.children[i];
          roll.opacity = -1 == highlight.indexOf(result[i]) ? 155 : 255;
        }
      }
      dismiss() {
        super.dismiss();
        for (let i = 0; i < this.popups.length; i++) this.popups[i].active = false;
        MiniGameNetworkClient_1.default.getInstance().send(new MiniPoker_Cmd_1.default.SendUnScribe(this.betIdx));
      }
    };
    __decorate([ property(cc.SpriteAtlas) ], MiniPokerController.prototype, "sprAtlasCards", void 0);
    __decorate([ property(cc.Node) ], MiniPokerController.prototype, "columns", void 0);
    __decorate([ property(cc.Node) ], MiniPokerController.prototype, "itemTemplate", void 0);
    __decorate([ property(cc.Label) ], MiniPokerController.prototype, "lblJackpot", void 0);
    __decorate([ property([ ButtonBet ]) ], MiniPokerController.prototype, "buttonBets", void 0);
    __decorate([ property(cc.Label) ], MiniPokerController.prototype, "lblToast", void 0);
    __decorate([ property(cc.Toggle) ], MiniPokerController.prototype, "btnSpin", void 0);
    __decorate([ property(cc.Button) ], MiniPokerController.prototype, "btnClose", void 0);
    __decorate([ property(cc.Toggle) ], MiniPokerController.prototype, "toggleAuto", void 0);
    __decorate([ property(cc.Toggle) ], MiniPokerController.prototype, "btnBoost", void 0);
    __decorate([ property(cc.Node) ], MiniPokerController.prototype, "boostActive", void 0);
    __decorate([ property(cc.Node) ], MiniPokerController.prototype, "sprResult", void 0);
    __decorate([ property(cc.Node) ], MiniPokerController.prototype, "lblWinCash", void 0);
    __decorate([ property(cc.SpriteFrame) ], MiniPokerController.prototype, "sfTxtNoHu", void 0);
    __decorate([ property(cc.SpriteFrame) ], MiniPokerController.prototype, "sfTxtThungPhaSanh", void 0);
    __decorate([ property(cc.SpriteFrame) ], MiniPokerController.prototype, "sfTxtTuQuy", void 0);
    __decorate([ property(cc.SpriteFrame) ], MiniPokerController.prototype, "sfTxtThung", void 0);
    __decorate([ property(cc.SpriteFrame) ], MiniPokerController.prototype, "sfTxtCuLu", void 0);
    __decorate([ property(cc.SpriteFrame) ], MiniPokerController.prototype, "sfTxtSanh", void 0);
    __decorate([ property(cc.SpriteFrame) ], MiniPokerController.prototype, "sfTxtSamCo", void 0);
    __decorate([ property(cc.SpriteFrame) ], MiniPokerController.prototype, "sfTxtHaiDoi", void 0);
    __decorate([ property(cc.SpriteFrame) ], MiniPokerController.prototype, "sfTxtDoiJ", void 0);
    __decorate([ property([ cc.Node ]) ], MiniPokerController.prototype, "popups", void 0);
    MiniPokerController = __decorate([ ccclass ], MiniPokerController);
    exports.default = MiniPokerController;
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
    "./MiniPoker.Cmd": "MiniPoker.Cmd"
  } ],
  "MiniPoker.PopupHistory": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cc481gP9AlCILXU1JsBrs7F", "MiniPoker.PopupHistory");
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
          c: 105,
          mt: Configs_1.default.App.MONEY_TYPE,
          p: this.page,
          un: Configs_1.default.Login.Nickname
        }, (err, res) => {
          App_1.default.instance.showLoading(false);
          if (null != err) return;
          cc.log(res);
          if (res["success"]) {
            res["results"].reverse();
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
                item.getChildByName("bg").opacity = i % 2 == 0 ? 10 : 0;
                item.getChildByName("Time").getComponent(cc.Label).string = itemData["timestamp"].replace(" ", "\n");
                item.getChildByName("Bet").getComponent(cc.Label).string = Utils_1.default.formatMoney(itemData["betValue"]);
                item.getChildByName("Result").getComponent(cc.RichText).string = itemData["cards"].replace(/,/g, " ").replace(/\u2666/g, "<color=#FF0C0C>\u2666</c>").replace(/\u2665/g, "<color=#FF0C0C>\u2665</c>").replace(/\u2660/g, "<color=#000000>\u2660</c>").replace(/\u2663/g, "<color=#000000>\u2663</c>");
                item.getChildByName("Win").getComponent(cc.Label).string = Utils_1.default.formatMoney(itemData["prize"]);
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
  "MiniPoker.PopupHonors": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5c964IwGZFIxJXkH/FCDSI0", "MiniPoker.PopupHonors");
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
          c: 106,
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
                  let dataVip = res["listUserVipRank"] && res["listUserVipRank"].find(data => data.nickname == itemData["username"]);
                  item.active = false;
                  item.getChildByName("bg").opacity = i % 2 == 0 ? 10 : 0;
                  item.getChildByName("Time").getComponent(cc.Label).string = itemData["timestamp"].replace(" ", "\n");
                  item.getChildByName("name").getChildByName("lblAccount").getComponent(cc.Label).string = itemData["username"].length > 11 ? itemData["username"].substr(0, 10) + "..." : itemData["username"];
                  item.getChildByName("name").getChildByName("lblAccount").color = dataVip ? cc.Color.BLACK.fromHEX(Utils_1.default.getColorVip(dataVip.rank)) : cc.Color.BLACK.fromHEX(Utils_1.default.getColorVip("VIP_0"));
                  item.getChildByName("name").getChildByName("lblAccount").getComponent(cc.LabelOutline).color = dataVip ? cc.Color.BLACK.fromHEX(Utils_1.default.getColorVip(dataVip.rank)) : cc.Color.BLACK.fromHEX(Utils_1.default.getColorVip("VIP_0"));
                  item.getChildByName("name").getChildByName("vip").getComponent(cc.Sprite).spriteFrame = this.atlasVip.getSpriteFrame(dataVip.rank);
                  item.getChildByName("Bet").getComponent(cc.Label).string = Utils_1.default.formatMoney(itemData["betValue"]);
                  item.getChildByName("Win").getComponent(cc.Label).string = Utils_1.default.formatMoney(itemData["prize"]);
                  switch (itemData.result) {
                   case 1:
                    item.getChildByName("Result").getComponent(cc.Label).string = "N\u1ed5 h\u0169";
                    break;

                   default:
                    item.getChildByName("Result").getComponent(cc.Label).string = "Th\xf9ng\xa0ph\xe1\xa0s\u1ea3nh";
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
            ErrorLogger_1.ErrorLogger.sendLogError("Http response", "Minipoker honor", JSON.stringify(res) + "\n" + JSON.stringify(error.stack));
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
}, {}, [ "MiniPoker.Cmd", "MiniPoker.MiniPokerController", "MiniPoker.PopupHistory", "MiniPoker.PopupHonors" ]);