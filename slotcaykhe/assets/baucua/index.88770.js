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
  "BauCua.BauCuaController": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9595cfEBbBFD7c/2AZ2TcQp", "BauCua.BauCuaController");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var BauCuaController_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const MiniGame_1 = require("../../Main/Lobby/src/MiniGame");
    const MiniGameNetworkClient_1 = require("../../Main/Game/src/networks/MiniGameNetworkClient");
    const BauCua_Cmd_1 = require("./BauCua.Cmd");
    const Network_InPacket_1 = require("../../Main/Game/src/networks/Network.InPacket");
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    const BroadcastReceiver_1 = require("../../Main/Game/src/common/BroadcastReceiver");
    const BauCua_SoiCauController_1 = require("./BauCua.SoiCauController");
    const BauCua_BetController_1 = require("./BauCua.BetController");
    const Common_AudioManager_1 = require("../../Main/Game/src/common/Common.AudioManager");
    const App_1 = require("../../Main/Game/src/common/App");
    const BauCua_PanelChat_1 = require("./BauCua.PanelChat");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let BauCuaController = BauCuaController_1 = class BauCuaController extends MiniGame_1.default {
      constructor() {
        super(...arguments);
        this.sprSmallDices = [];
        this.lblSession = null;
        this.lblTime = null;
        this.lblToast = null;
        this.lblWinCoin = null;
        this.plate = null;
        this.bowl = null;
        this.diceResults = [];
        this.animationResults = [];
        this.diceFaces = [];
        this.popups = [];
        this.soundDice = null;
        this.soundNewGame = null;
        this.soundWarning = null;
        this.soundBetted = null;
        this.soundCountDown = null;
        this.soiCauController = null;
        this.BetController = null;
        this.panelChat = null;
        this.POSITION_DEFAULT = [ cc.v2(-9, 3), cc.v2(-25, -9), cc.v2(-20, -7), cc.v2(-37, -14), cc.v2(-15, -6), cc.v2(-20, -11) ];
        this.ROTASION_DEFAULT = [ -130, 0, 65, 115, -155, -30 ];
        this.NAME_AIMATION_DICE = [ "blue", "green", "pink" ];
        this.roomId = 0;
        this.inited = false;
        this.oriPlatePos = null;
      }
      start() {
        super.start();
        BauCuaController_1.instance = this;
        this.soiCauController.itemHistoryTemplate.active = false;
        this.oriPlatePos = this.plate.position;
        this.BetController.initButtonBet();
        this.BetController.initPayBet();
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
           case BauCua_Cmd_1.default.Code.INFO:
            this.setInfo(data);
            break;

           case BauCua_Cmd_1.default.Code.START_NEW_GAME:
            this.resetGame(data);
            Common_AudioManager_1.default.getInstance().playEffect(this.soundNewGame, .7);
            break;

           case BauCua_Cmd_1.default.Code.UPDATE:
            this.updateData(data);
            break;

           case BauCua_Cmd_1.default.Code.RESULT:
            this.finishGame(data);
            break;

           case BauCua_Cmd_1.default.Code.PRIZE:
            this.showPrize(data);
            break;

           case BauCua_Cmd_1.default.Code.BET:
            this.onBet(data);
          }
        }, this);
      }
      onBet(data) {
        let res = new BauCua_Cmd_1.default.ReceiveBet(data);
        cc.log(res);
        switch (res.result) {
         case 1:
          Configs_1.default.Login.Coin = res.currentMoney;
          BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN);
          Common_AudioManager_1.default.getInstance().playEffect(this.soundBetted, .7);
          this.BetController.onBet();
          this.showToast("\u0110\u1eb7t c\u01b0\u1ee3c th\xe0nh c\xf4ng.");
          this.BetController.setStageBet(true, true, true);
          break;

         case 100:
          this.handleBetError();
          App_1.default.instance.actiontDialog.showMsgWithActions(res.desc, res.suggestionActions);
          Common_AudioManager_1.default.getInstance().playEffect(this.soundWarning, .7);
          break;

         case 101:
          this.showToast("Ch\u01b0a t\u1edbi th\u1eddi gian \u0111\u1eb7t c\u01b0\u1ee3c.");
          this.handleBetError();
          Common_AudioManager_1.default.getInstance().playEffect(this.soundWarning, .7);
        }
      }
      showPrize(data) {
        let res = new BauCua_Cmd_1.default.ReceivePrize(data);
        cc.log(res);
        Configs_1.default.Login.Coin = res.currentMoney;
        BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN);
        this.lblWinCoin.node.stopAllActions();
        this.lblWinCoin.node.setPosition(cc.v2(0, -16));
        this.lblWinCoin.node.opacity = 0;
        this.lblWinCoin.string = "+" + Utils_1.default.formatNumber(res.prize);
        this.lblWinCoin.node.active = true;
        this.lblWinCoin.node.runAction(cc.sequence(cc.spawn(cc.fadeIn(.2), cc.moveBy(1, cc.v2(0, 100))), cc.fadeOut(.15), cc.callFunc(() => {
          this.lblWinCoin.node.active = false;
        })));
      }
      finishGame(data) {
        let res = new BauCua_Cmd_1.default.ReceiveResult(data);
        cc.log(res);
        this.open(res, () => {
          this.BetController.resetStagePayBet();
          let idx = 0;
          let count = 20;
          this.schedule(() => {
            this.BetController.setStagePayBet(idx);
            idx++;
            count--;
            idx == this.BetController.potBauCuas.length - 1 && (idx = 0);
            if (0 == count) {
              let list = [ res.dice1, res.dice2, res.dice3 ];
              this.BetController.resetStagePayBet();
              this.BetController.setStageListPayBet(list, false);
              this.BetController.setWinListPayBet(list, true);
              this.BetController.showWin(list);
              if (res.xValue > 1) {
                this.BetController.potBauCuas[res.xPot].lblFactor.node.parent.active = true;
                this.BetController.potBauCuas[res.xPot].lblFactor.string = "X" + res.xValue;
              }
              this.soiCauController.addHistory(list, this.sprSmallDices);
              this.caculatorSoiCau();
            }
          }, .07, count - 1, 0);
        });
      }
      updateData(data) {
        let res = new BauCua_Cmd_1.default.ReceiveUpdate(data);
        5 == res.remainTime && Common_AudioManager_1.default.getInstance().playEffect(this.soundCountDown, .7);
        this.lblTime.string = res.remainTime >= 0 ? res.remainTime < 10 ? "0" + res.remainTime : res.remainTime.toString() : "";
        this.BetController.isBetting = 1 == res.bettingState;
        this.BetController.updatePayBet(res.potData.split(","));
      }
      resetGame(data) {
        let res = new BauCua_Cmd_1.default.ReceiveNewGame(data);
        cc.log(res);
        this.plate.position = this.oriPlatePos;
        this.shake();
        this.lblSession.string = "#" + res.referenceId;
        this.BetController.reset();
      }
      setInfo(data) {
        this.inited = true;
        let res = new BauCua_Cmd_1.default.ReceiveInfo(data);
        cc.log(res);
        this.BetController.isBetting = res.bettingState;
        this.lblSession.string = "#" + res.referenceId;
        this.lblTime.string = res.remainTime >= 0 ? res.remainTime < 10 ? "0" + res.remainTime : res.remainTime.toString() : "";
        this.BetController.setInfoPayBet(res.potData.split(","), res.betData.split(","));
        if (this.BetController.isBetting) {
          this.bowl.active = true;
          this.diceResults.forEach(ani => {
            ani.node.active = false;
          });
        } else {
          let list = [ res.dice1, res.dice2, res.dice3 ];
          this.BetController.setStageListPayBet(list, false);
          this.BetController.setWinListPayBet(list, true);
          this.open(res);
          if (res.xValue > 1) {
            this.BetController.potBauCuas[res.xPot].lblFactor.node.parent.active = true;
            this.BetController.potBauCuas[res.xPot].lblFactor.string = "X" + res.xValue;
          }
          this.bowl.active = false;
        }
        if ("" != res.lichSuPhien) {
          let histories = res.lichSuPhien.split(",");
          for (let i = 0; i < histories.length; i++) {
            this.soiCauController.addHistory([ parseInt(histories[i]), parseInt(histories[++i]), parseInt(histories[++i]) ], this.sprSmallDices);
            ++i;
            ++i;
          }
          this.caculatorSoiCau();
        }
      }
      caculatorSoiCau() {
        let counts = [ 0, 0, 0, 0, 0, 0 ];
        this.soiCauController.historiesData.forEach(history => {
          for (let j = 0; j < 3; j++) counts[history[j]]++;
        });
        this.soiCauController.lblsSoiCau.forEach((lbl, index) => {
          lbl.string = counts[index].toString();
        });
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
      actSoiCau() {
        this.soiCauController.actSoiCau();
      }
      actCancel() {
        if (!this.inited) return;
        this.BetController.cancelBet();
      }
      actConfirm() {
        if (!this.inited) return;
        this.BetController.confirmBet();
      }
      actReBet() {
        if (!this.inited) return;
        this.BetController.reBet();
      }
      show() {
        if (this.node.active) {
          this.reOrder();
          return;
        }
        super.show();
        this.inited = false;
        this.lblWinCoin.node.active = false;
        this.BetController.init();
        this.soiCauController.init();
        MiniGameNetworkClient_1.default.getInstance().send(new BauCua_Cmd_1.default.SendScribe(this.roomId));
      }
      dismiss() {
        this.BetController.stopAnimButtonBet();
        super.dismiss();
        for (let i = 0; i < this.popups.length; i++) this.popups[i].active = false;
        for (let i = 1; i < this.soiCauController.itemHistoryTemplate.parent.childrenCount; i++) this.soiCauController.itemHistoryTemplate.parent.children[i].destroy();
        MiniGameNetworkClient_1.default.getInstance().send(new BauCua_Cmd_1.default.SendUnScribe(this.roomId));
      }
      shake() {
        this.bowl.active = true;
        this.diceResults.forEach(ani => {
          ani.node.active = false;
        });
        var act = cc.repeat(cc.sequence(cc.moveBy(.025, cc.v2(-15, 0)).easing(cc.easeBackOut()), cc.moveBy(.05, cc.v2(15, 0)).easing(cc.easeBackOut()), cc.moveBy(.025, cc.v2(15, 0)), cc.moveBy(.05, cc.v2(-15, 0)).easing(cc.easeBackOut())), 10);
        this.plate.stopAllActions();
        this.plate.runAction(act);
      }
      open(res, onOpen = null) {
        Common_AudioManager_1.default.getInstance().playEffect(this.soundDice, .7);
        this.diceResults.forEach((ani, index) => {
          ani.node.active = true;
          ani.skeletonData = this.animationResults[res["dice" + (index + 1)]];
          ani.setAnimation(0, this.NAME_AIMATION_DICE[index], false);
          ani.node.setPosition(this.POSITION_DEFAULT[res["dice" + (index + 1)]]);
          ani.node.angle = this.ROTASION_DEFAULT[res["dice" + (index + 1)]];
          ani.node.parent.angle = 120 * index;
        });
        this.lblTime.string = "";
        this.bowl.active = false;
        onOpen && onOpen();
      }
      handleBetError() {
        this.BetController.betError();
      }
      actShowChat() {
        this.panelChat.show();
      }
    };
    BauCuaController.instance = null;
    __decorate([ property([ cc.SpriteFrame ]) ], BauCuaController.prototype, "sprSmallDices", void 0);
    __decorate([ property(cc.Label) ], BauCuaController.prototype, "lblSession", void 0);
    __decorate([ property(cc.Label) ], BauCuaController.prototype, "lblTime", void 0);
    __decorate([ property(cc.Label) ], BauCuaController.prototype, "lblToast", void 0);
    __decorate([ property(cc.Label) ], BauCuaController.prototype, "lblWinCoin", void 0);
    __decorate([ property(cc.Node) ], BauCuaController.prototype, "plate", void 0);
    __decorate([ property(cc.Node) ], BauCuaController.prototype, "bowl", void 0);
    __decorate([ property([ sp.Skeleton ]) ], BauCuaController.prototype, "diceResults", void 0);
    __decorate([ property([ sp.SkeletonData ]) ], BauCuaController.prototype, "animationResults", void 0);
    __decorate([ property([ cc.SpriteFrame ]) ], BauCuaController.prototype, "diceFaces", void 0);
    __decorate([ property([ cc.Node ]) ], BauCuaController.prototype, "popups", void 0);
    __decorate([ property(cc.AudioClip) ], BauCuaController.prototype, "soundDice", void 0);
    __decorate([ property(cc.AudioClip) ], BauCuaController.prototype, "soundNewGame", void 0);
    __decorate([ property(cc.AudioClip) ], BauCuaController.prototype, "soundWarning", void 0);
    __decorate([ property(cc.AudioClip) ], BauCuaController.prototype, "soundBetted", void 0);
    __decorate([ property(cc.AudioClip) ], BauCuaController.prototype, "soundCountDown", void 0);
    __decorate([ property(BauCua_SoiCauController_1.default) ], BauCuaController.prototype, "soiCauController", void 0);
    __decorate([ property(BauCua_BetController_1.default) ], BauCuaController.prototype, "BetController", void 0);
    __decorate([ property(BauCua_PanelChat_1.default) ], BauCuaController.prototype, "panelChat", void 0);
    BauCuaController = BauCuaController_1 = __decorate([ ccclass ], BauCuaController);
    exports.default = BauCuaController;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/App": void 0,
    "../../Main/Game/src/common/BroadcastReceiver": void 0,
    "../../Main/Game/src/common/Common.AudioManager": void 0,
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/common/Utils": void 0,
    "../../Main/Game/src/networks/MiniGameNetworkClient": void 0,
    "../../Main/Game/src/networks/Network.InPacket": void 0,
    "../../Main/Lobby/src/MiniGame": void 0,
    "./BauCua.BetController": "BauCua.BetController",
    "./BauCua.Cmd": "BauCua.Cmd",
    "./BauCua.PanelChat": "BauCua.PanelChat",
    "./BauCua.SoiCauController": "BauCua.SoiCauController"
  } ],
  "BauCua.BetController": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ee9e14lAyNK2oytRi5VNUaO", "BauCua.BetController");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.LIST_BET = void 0;
    const MiniGameNetworkClient_1 = require("../../Main/Game/src/networks/MiniGameNetworkClient");
    const BauCua_Cmd_1 = require("./BauCua.Cmd");
    const BauCua_PotBauCua_1 = require("./BauCua.PotBauCua");
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const BauCua_ButtonBetBauCua_1 = require("./BauCua.ButtonBetBauCua");
    const Common_AudioManager_1 = require("../../Main/Game/src/common/Common.AudioManager");
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    exports.LIST_BET = [ 1e3, 5e3, 1e4, 5e4, 1e5, 5e5, 1e6, 2e6, 5e6, 1e7 ];
    const {ccclass: ccclass, property: property} = cc._decorator;
    let BetController = class BetController extends cc.Component {
      constructor() {
        super(...arguments);
        this.buttonBets = [];
        this.potBauCuas = [];
        this.btnConfirm = null;
        this.btnCancel = null;
        this.btnReBet = null;
        this.lblToast = null;
        this.listAniResult = null;
        this.soundBet = null;
        this.soundShowResult = null;
        this.scrollBetAmount = null;
        this.btnNextBetAmount = null;
        this.btnPreviousBetAmount = null;
        this.betted = [ 0, 0, 0, 0, 0, 0 ];
        this.betting = [ 0, 0, 0, 0, 0, 0 ];
        this.isBetting = false;
        this.betIdx = 0;
        this.lastBeted = null;
      }
      onLoad() {
        this.scrollBetAmount.node.on("scroll-ended", () => {
          let maxOffset = this.scrollBetAmount.getMaxScrollOffset().x;
          let offset = this.scrollBetAmount.getScrollOffset().x;
          this.btnNextBetAmount.active = maxOffset + offset > 80;
          this.btnPreviousBetAmount.active = offset < -80;
        });
      }
      init() {
        this.lblToast.node.parent.active = false;
        this.betting = [ 0, 0, 0, 0, 0, 0 ];
        this.betted = [ 0, 0, 0, 0, 0, 0 ];
        this.resetInfoPayBet();
        this.listAniResult.getChildByName("scans").children.forEach(children => {
          children.active = false;
        });
        this.listAniResult.active = false;
        if (Configs_1.default.Login.Coin >= Configs_1.default.App.RICH_MAN) {
          this.betIdx = 2;
          this.setStageButton();
          this.scrollBetAmount.scrollToPercentHorizontal(.4, .5);
        } else {
          this.betIdx = 0;
          this.setStageButton();
          this.scrollBetAmount.scrollToLeft(.5);
        }
        cc.tween(this.btnNextBetAmount).repeatForever(cc.blink(1, 1)).start();
        cc.tween(this.btnPreviousBetAmount).repeatForever(cc.blink(1, 1)).start();
      }
      reset() {
        this.resetPayBet();
        this.betted = [ 0, 0, 0, 0, 0, 0 ];
        this.betting = [ 0, 0, 0, 0, 0, 0 ];
        this.setStageBet(true, true, true);
      }
      cancelBet() {
        this.potBauCuas.forEach((buttonPayBet, index) => {
          buttonPayBet.lblBeted.node.color = cc.Color.WHITE;
          buttonPayBet.lblBeted.string = this.moneyToK(this.betted[index]);
          this.betting[index] = 0;
        });
      }
      confirmBet() {
        if (!this.isBetting) {
          this.showToast("Ch\u01b0a \u0111\u1ebfn th\u1eddi gian \u0111\u1eb7t c\u01b0\u1ee3c.");
          return;
        }
        let total = 0;
        this.betting.forEach(betting => {
          total += betting;
        });
        if (total <= 0) {
          this.showToast("B\u1ea1n ch\u01b0a \u0111\u1eb7t c\u1eeda.");
          return;
        }
        MiniGameNetworkClient_1.default.getInstance().send(new BauCua_Cmd_1.default.SendBet(this.betting.toString()));
        this.setStageBet(false, false, false);
      }
      reBet() {
        if (!this.isBetting) {
          this.showToast("Ch\u01b0a \u0111\u1ebfn th\u1eddi gian \u0111\u1eb7t c\u01b0\u1ee3c.");
          return;
        }
        let totalBeted = 0;
        this.betted.forEach(betting => {
          totalBeted += betting;
        });
        if (totalBeted > 0) {
          this.showToast("B\u1ea1n ch\u1ec9 c\xf3 th\u1ec3 \u0111\u1eb7t l\u1ea1i cho l\u1ea7n c\u01b0\u1ee3c \u0111\u1ea7u ti\xean.");
          return;
        }
        if (null == this.lastBeted || 0 == this.lastBeted.filter(bet => bet > 0)) {
          this.showToast("B\u1ea1n ch\u01b0a \u0111\u1eb7t c\u01b0\u1ee3c tr\u01b0\u1edbc \u0111\xf3.");
          return;
        }
        this.betting = this.lastBeted;
        MiniGameNetworkClient_1.default.getInstance().send(new BauCua_Cmd_1.default.SendBet(this.betting.toString()));
        this.setStageBet(false, false, false);
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
      setStageButton() {
        this.buttonBets.forEach((buttonBet, index) => {
          buttonBet.setActive(index == this.betIdx);
        });
      }
      initButtonBet() {
        this.buttonBets.forEach((buttonBet, index) => {
          buttonBet.button.node.on("click", () => {
            this.betIdx = index;
            this.setStageButton();
          });
        });
      }
      resetInfoPayBet() {
        this.potBauCuas.forEach(buttonPayBet => {
          buttonPayBet.lblBeted.string = "0";
          buttonPayBet.lblBeted.node.color = cc.Color.WHITE;
          buttonPayBet.lblTotal.string = "0";
          buttonPayBet.lblFactor.node.parent.active = false;
          buttonPayBet.overlay.active = true;
          buttonPayBet.button.interactable = false;
        });
      }
      setInfoPayBet(totalBets, betted) {
        this.potBauCuas.forEach((buttonPayBet, index) => {
          buttonPayBet.lblTotal.string = this.moneyToK(parseInt(totalBets[index]));
          buttonPayBet.lblBeted.string = this.moneyToK(parseInt(betted[index]));
          buttonPayBet.overlay.active = true;
          buttonPayBet.button.interactable = this.isBetting;
          buttonPayBet.lblFactor.node.parent.active = false;
          this.betted[index] = parseInt(betted[index]);
        });
      }
      setStagePayBet(id) {
        this.potBauCuas.forEach((buttonPayBet, index) => {
          buttonPayBet.overlay.active = id != index;
        });
      }
      setStageListPayBet(list, stage) {
        list.forEach(index => {
          this.potBauCuas[index].overlay.active = stage;
        });
      }
      setWinListPayBet(list, stage) {
        this.potBauCuas.forEach((node, index) => {
          node.setWin(list.indexOf(index) >= 0 && stage);
        });
      }
      showWin(list) {
        this.listAniResult.active = true;
        this.listAniResult.getChildByName("listAni").children.forEach(node => {
          node.active = false;
        });
        list.forEach((indexDice, index) => {
          let nodeResult = cc.instantiate(this.potBauCuas[indexDice].node.getChildByName("anim_" + this.potBauCuas[indexDice].node.name));
          this.listAniResult.getChildByName("listAni").addChild(nodeResult);
          nodeResult.active = true;
          const positionAni = this.potBauCuas[indexDice].node.position;
          nodeResult.position = positionAni;
          Common_AudioManager_1.default.getInstance().playEffect(this.soundShowResult, .7);
          const positionShow = cc.v3(0, 0 == index ? 350 * cc.winSize.height / 1280 : 1 == index ? 0 : -350 * cc.winSize.height / 1280);
          cc.tween(nodeResult).sequence(cc.tween().to(.15, {
            position: positionShow,
            scale: .55
          }), cc.callFunc(() => {
            nodeResult.getComponent(sp.Skeleton).animation = "active";
          }), cc.delayTime(4.4), cc.tween().to(.5, {
            opacity: 0
          }), cc.callFunc(() => {
            nodeResult.active = false;
            nodeResult.removeFromParent();
          })).start();
          let listScan = this.listAniResult.getChildByName("scans");
          cc.tween(listScan).sequence(cc.callFunc(() => {
            listScan.children.forEach(children => {
              children.active = false;
            });
          }), cc.delayTime(.15), cc.callFunc(() => {
            listScan.children.forEach((children, index) => {
              children.y = 0 == index ? 350 * cc.winSize.height / 1280 : 1 == index ? 0 : -350 * cc.winSize.height / 1280;
              children.getComponentInChildren(sp.Skeleton).setAnimation(0, "active", false);
              children.active = true;
            });
          }), cc.delayTime(4.9), cc.callFunc(() => {
            listScan.children.forEach(children => {
              children.active = false;
            });
            index == list.length - 1 && (this.listAniResult.active = false);
          })).start();
        });
      }
      initPayBet() {
        this.potBauCuas.forEach((buttonPayBet, index) => {
          let clickBet = () => {
            if (!this.isBetting) {
              this.showToast("Ch\u01b0a \u0111\u1ebfn th\u1eddi gian \u0111\u1eb7t c\u01b0\u1ee3c.");
              return;
            }
            buttonPayBet.actionBet();
            this.betting[index] += exports.LIST_BET[this.betIdx];
            buttonPayBet.lblBeted.node.color = cc.Color.BLACK.fromHEX("#00ff18");
            buttonPayBet.lblBeted.string = this.moneyToK(this.betting[index] + this.betted[index]);
            Common_AudioManager_1.default.getInstance().playEffect(this.soundBet, .7);
          };
          buttonPayBet.node.on("click", clickBet);
        });
      }
      resetStagePayBet() {
        this.potBauCuas.forEach((buttonPayBet, index) => {
          buttonPayBet.overlay.active = true;
        });
        this.setLastBeted();
      }
      resetPayBet() {
        this.potBauCuas.forEach(buttonPayBet => {
          buttonPayBet.lblBeted.string = "0";
          buttonPayBet.lblBeted.node.color = cc.Color.WHITE;
          buttonPayBet.lblTotal.string = "0";
          buttonPayBet.overlay.active = false;
          buttonPayBet.button.interactable = true;
          buttonPayBet.lblFactor.node.parent.active = false;
          buttonPayBet.setWin(false);
        });
      }
      updatePayBet(listBet) {
        this.potBauCuas.forEach((buttonPayBet, index) => {
          buttonPayBet.lblTotal.string = this.moneyToK(parseInt(listBet[index]));
          if (this.isBetting) {
            buttonPayBet.overlay.active = false;
            buttonPayBet.lblFactor.node.parent.active = false;
          } else {
            buttonPayBet.button.interactable = false;
            buttonPayBet.lblBeted.string = this.moneyToK(this.betted[index]);
            buttonPayBet.lblBeted.node.color = cc.Color.WHITE;
          }
        });
      }
      onBet() {
        this.potBauCuas.forEach((buttonPayBet, index) => {
          this.betted[index] += this.betting[index];
          this.betting[index] = 0;
          buttonPayBet.lblBeted.string = this.moneyToK(this.betted[index]);
          buttonPayBet.lblBeted.node.color = cc.Color.WHITE;
        });
      }
      setStageBet(confirm = true, cancel = true, rebet = true) {
        this.btnConfirm.interactable = confirm;
        this.btnCancel.interactable = cancel;
        this.btnReBet.interactable = rebet;
      }
      moneyToK(money) {
        if (money < 1e5) return Utils_1.default.formatNumber(money);
        money = parseInt((money / 1e3).toString());
        return Utils_1.default.formatNumber(money) + "K";
      }
      betError() {
        this.potBauCuas.forEach((buttonPayBet, index) => {
          this.betting[index] = 0;
          buttonPayBet.lblBeted.string = this.moneyToK(this.betted[index]);
          buttonPayBet.lblBeted.node.color = cc.Color.WHITE;
        });
        this.setStageBet(true, true, true);
      }
      setLastBeted() {
        this.lastBeted = this.betted;
      }
      playSoundClick() {}
      stopAnimButtonBet() {
        cc.Tween.stopAllByTarget(this.btnNextBetAmount);
        cc.Tween.stopAllByTarget(this.btnPreviousBetAmount);
      }
    };
    __decorate([ property([ BauCua_ButtonBetBauCua_1.default ]) ], BetController.prototype, "buttonBets", void 0);
    __decorate([ property([ BauCua_PotBauCua_1.default ]) ], BetController.prototype, "potBauCuas", void 0);
    __decorate([ property(cc.Button) ], BetController.prototype, "btnConfirm", void 0);
    __decorate([ property(cc.Button) ], BetController.prototype, "btnCancel", void 0);
    __decorate([ property(cc.Button) ], BetController.prototype, "btnReBet", void 0);
    __decorate([ property(cc.Label) ], BetController.prototype, "lblToast", void 0);
    __decorate([ property(cc.Node) ], BetController.prototype, "listAniResult", void 0);
    __decorate([ property(cc.AudioClip) ], BetController.prototype, "soundBet", void 0);
    __decorate([ property(cc.AudioClip) ], BetController.prototype, "soundShowResult", void 0);
    __decorate([ property(cc.ScrollView) ], BetController.prototype, "scrollBetAmount", void 0);
    __decorate([ property(cc.Node) ], BetController.prototype, "btnNextBetAmount", void 0);
    __decorate([ property(cc.Node) ], BetController.prototype, "btnPreviousBetAmount", void 0);
    BetController = __decorate([ ccclass ], BetController);
    exports.default = BetController;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/Common.AudioManager": void 0,
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/common/Utils": void 0,
    "../../Main/Game/src/networks/MiniGameNetworkClient": void 0,
    "./BauCua.ButtonBetBauCua": "BauCua.ButtonBetBauCua",
    "./BauCua.Cmd": "BauCua.Cmd",
    "./BauCua.PotBauCua": "BauCua.PotBauCua"
  } ],
  "BauCua.ButtonBetBauCua": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d95cf2vRXNPzoaJARGDH0IK", "BauCua.ButtonBetBauCua");
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
    let ButtonBetBauCua = class ButtonBetBauCua extends cc.Component {
      constructor() {
        super(...arguments);
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
    __decorate([ property(cc.Button) ], ButtonBetBauCua.prototype, "button", void 0);
    __decorate([ property(cc.SpriteFrame) ], ButtonBetBauCua.prototype, "sfNormal", void 0);
    __decorate([ property(cc.SpriteFrame) ], ButtonBetBauCua.prototype, "sfActive", void 0);
    ButtonBetBauCua = __decorate([ ccclass ], ButtonBetBauCua);
    exports.default = ButtonBetBauCua;
    cc._RF.pop();
  }, {} ],
  "BauCua.Cmd": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ac6f53uNYxDW4HGvzMg8Vl8", "BauCua.Cmd");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.cmd = void 0;
    const Network_OutPacket_1 = require("../../Main/Game/src/networks/Network.OutPacket");
    const Network_InPacket_1 = require("../../Main/Game/src/networks/Network.InPacket");
    const Constants_1 = require("../../Main/Game/src/common/Constants");
    var cmd;
    (function(cmd) {
      class Code {}
      Code.SCRIBE = 5001;
      Code.UNSCRIBE = 5002;
      Code.CHANGE_ROOM = 5003;
      Code.BET = 5004;
      Code.INFO = 5005;
      Code.START_NEW_GAME = 5007;
      Code.UPDATE = 5006;
      Code.RESULT = 5008;
      Code.PRIZE = 5009;
      Code.LOG_CHAT = 18003;
      Code.SEND_CHAT = 18e3;
      Code.SCRIBE_CHAT = 18001;
      Code.UNSCRIBE_CHAT = 18002;
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
      class SendBet extends Network_OutPacket_1.default {
        constructor(betData) {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.BET);
          this.packHeader();
          this.putString(betData);
          this.updateSize();
        }
      }
      cmd.SendBet = SendBet;
      class SendScribeChat extends Network_OutPacket_1.default {
        constructor() {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.SCRIBE_CHAT);
          this.packHeader();
          this.putString(Constants_1.ChatChannel.BAU_CUA);
          this.updateSize();
        }
      }
      cmd.SendScribeChat = SendScribeChat;
      class SendUnScribeChat extends Network_OutPacket_1.default {
        constructor() {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.UNSCRIBE_CHAT);
          this.packHeader();
          this.putString(Constants_1.ChatChannel.BAU_CUA);
          this.updateSize();
        }
      }
      cmd.SendUnScribeChat = SendUnScribeChat;
      class SendChat extends Network_OutPacket_1.default {
        constructor(message) {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.SEND_CHAT);
          this.packHeader();
          this.putString(message);
          this.putString(Constants_1.ChatChannel.BAU_CUA);
          this.updateSize();
        }
      }
      cmd.SendChat = SendChat;
      class ReceiveBet extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.result = 0;
          this.currentMoney = 0;
          this.desc = "";
          this.suggestionActions = [];
          this.result = this.getByte();
          this.currentMoney = this.getLong();
          this.desc = this.getString();
          let actionsStr = this.getString();
          if (actionsStr) {
            let actions = JSON.parse(actionsStr);
            (null === actions || void 0 === actions ? void 0 : actions.hasOwnProperty("object")) && Array.isArray(actions["object"]) && (this.suggestionActions = Constants_1.UserActions.toEnums(actions["object"]));
          }
        }
      }
      cmd.ReceiveBet = ReceiveBet;
      class ReceiveInfo extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.referenceId = 0;
          this.remainTime = 0;
          this.bettingState = false;
          this.potData = "";
          this.betData = "";
          this.lichSuPhien = "";
          this.dice1 = 0;
          this.dice2 = 0;
          this.dice3 = 0;
          this.xPot = 0;
          this.xValue = 0;
          this.room = 0;
          this.referenceId = this.getLong();
          this.remainTime = this.getByte();
          this.bettingState = this.getBool();
          this.potData = this.getString();
          this.betData = this.getString();
          this.lichSuPhien = this.getString();
          this.dice1 = this.getByte();
          this.dice2 = this.getByte();
          this.dice3 = this.getByte();
          this.xPot = this.getByte();
          this.xValue = this.getByte();
          this.room = this.getByte();
        }
      }
      cmd.ReceiveInfo = ReceiveInfo;
      class ReceiveNewGame extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.referenceId = 0;
          this.referenceId = this.getLong();
        }
      }
      cmd.ReceiveNewGame = ReceiveNewGame;
      class ReceiveUpdate extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.potData = "";
          this.remainTime = 0;
          this.bettingState = 0;
          this.potData = this.getString();
          this.remainTime = this.getByte();
          this.bettingState = this.getByte();
        }
      }
      cmd.ReceiveUpdate = ReceiveUpdate;
      class ReceiveResult extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.dice1 = 0;
          this.dice2 = 0;
          this.dice3 = 0;
          this.xPot = 0;
          this.xValue = 0;
          this.dice1 = this.getByte();
          this.dice2 = this.getByte();
          this.dice3 = this.getByte();
          this.xPot = this.getByte();
          this.xValue = this.getByte();
        }
      }
      cmd.ReceiveResult = ReceiveResult;
      class ReceivePrize extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.prize = 0;
          this.currentMoney = 0;
          this.room = 0;
          this.prize = this.getLong();
          this.currentMoney = this.getLong();
          this.room = this.getByte();
        }
      }
      cmd.ReceivePrize = ReceivePrize;
      class ReceiveLogChat extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.message = "";
          this.minVipPoint = 0;
          this.timeBan = 0;
          this.userType = 0;
          this.chatChannel = "";
          this.message = this.getString();
          this.minVipPoint = this.getByte();
          this.timeBan = this.getLong();
          this.userType = this.getByte();
          this.chatChannel = this.getString();
        }
      }
      cmd.ReceiveLogChat = ReceiveLogChat;
      class ReceiveSendChat extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.error = 0;
          this.nickname = "";
          this.message = "";
          this.desc = "";
          this.suggestionActions = [];
          this.vip = 0;
          this.chatChannel = "";
          this.error = this.getError();
          this.nickname = this.getString();
          this.message = this.getString();
          this.desc = this.getString();
          let actionsStr = this.getString();
          this.vip = this.getInt();
          if (actionsStr) {
            let actions = JSON.parse(actionsStr);
            actions.hasOwnProperty("suggestionActions") && Array.isArray(actions["suggestionActions"]) && (this.suggestionActions = Constants_1.UserActions.toEnums(actions["suggestionActions"]));
          }
          this.chatChannel = this.getString();
        }
      }
      cmd.ReceiveSendChat = ReceiveSendChat;
    })(cmd = exports.cmd || (exports.cmd = {}));
    exports.default = cmd;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/Constants": void 0,
    "../../Main/Game/src/networks/Network.InPacket": void 0,
    "../../Main/Game/src/networks/Network.OutPacket": void 0
  } ],
  "BauCua.PanelChat": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "633f49+lKxO6b3Y1+7+zw/z", "BauCua.PanelChat");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const App_1 = require("../../Main/Game/src/common/App");
    const BroadcastReceiver_1 = require("../../Main/Game/src/common/BroadcastReceiver");
    const Constants_1 = require("../../Main/Game/src/common/Constants");
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const MiniGameNetworkClient_1 = require("../../Main/Game/src/networks/MiniGameNetworkClient");
    const Network_InPacket_1 = require("../../Main/Game/src/networks/Network.InPacket");
    const BauCua_Cmd_1 = require("./BauCua.Cmd");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let BauCuaPanelChat = class BauCuaPanelChat extends cc.Component {
      constructor() {
        super(...arguments);
        this.container = null;
        this.itemChatTemplate = null;
        this.scrollChat = null;
        this.edbChat = null;
        this.atlasVip = null;
      }
      start() {
        this.itemChatTemplate.active = false;
        BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.SET_SOUND, this.node);
        MiniGameNetworkClient_1.default.getInstance().addListener(data => {
          if (!this.node.active) return;
          let inpacket = new Network_InPacket_1.default(data);
          switch (inpacket.getCmdId()) {
           case BauCua_Cmd_1.default.Code.LOG_CHAT:
            {
              let res = new BauCua_Cmd_1.default.ReceiveLogChat(data);
              cc.log(res);
              if (res.chatChannel !== Constants_1.ChatChannel.BAU_CUA) break;
              var msgs = JSON.parse(res.message);
              for (var i = 0; i < msgs.length; i++) this.addChat(msgs[i]["u"], msgs[i]["m"], msgs[i]["vipId"]);
              break;
            }

           case BauCua_Cmd_1.default.Code.SEND_CHAT:
            {
              let res = new BauCua_Cmd_1.default.ReceiveSendChat(data);
              cc.log(res);
              if (res.chatChannel !== Constants_1.ChatChannel.BAU_CUA) break;
              switch (res.error) {
               case 0:
                this.addChat(res.nickname, res.message, res.vip);
                break;

               default:
                App_1.default.instance.actiontDialog.showMsgWithActions(res.desc, res.suggestionActions);
              }
              break;
            }
          }
        }, this);
      }
      show() {
        this.scrollChat.content.children.forEach(child => child.active = false);
        this.node.active = true;
        cc.tween(this.container).set({
          position: cc.v3((cc.winSize.width + this.container.width) / 2, -(cc.winSize.height - this.container.height) / 2 + 250)
        }).to(.5, {
          position: cc.v3((cc.winSize.width - this.container.width) / 2, -(cc.winSize.height - this.container.height) / 2 + 250)
        }, {
          easing: cc.easing.backOut
        }).call(() => {
          MiniGameNetworkClient_1.default.getInstance().send(new BauCua_Cmd_1.default.SendScribeChat());
        }).start();
      }
      dismiss() {
        cc.tween(this.container).to(.5, {
          position: cc.v3((cc.winSize.width + this.container.width) / 2, -(cc.winSize.height - this.container.height) / 2 + 250)
        }, {
          easing: cc.easing.backIn
        }).call(() => {
          MiniGameNetworkClient_1.default.getInstance().send(new BauCua_Cmd_1.default.SendUnScribeChat());
          this.node.active = false;
        }).start();
      }
      addChat(nickname, chatMsg, vip) {
        let item = null;
        for (var i = 0; i < this.scrollChat.content.childrenCount; i++) {
          let node = this.scrollChat.content.children[i];
          if (!node.active) {
            item = node;
            break;
          }
        }
        null == item && (item = this.scrollChat.content.childrenCount >= 50 ? this.scrollChat.content.children[0] : cc.instantiate(this.itemChatTemplate));
        var zIndex = 0;
        for (var i = 0; i < this.scrollChat.content.childrenCount; i++) {
          let node = this.scrollChat.content.children[i];
          node != item && (node.zIndex = zIndex++);
        }
        item.parent = this.scrollChat.content;
        item.active = true;
        item.zIndex = zIndex++;
        let chatRichText = item.getComponentInChildren(cc.RichText);
        chatRichText.imageAtlas = this.atlasVip;
        let vipColor = Utils_1.default.getColorVip("VIP_" + vip);
        let content = "<color=" + vipColor + "><outline color=" + vipColor + "width=1>" + nickname + "</outline></color> <img src='Vip" + vip + "' offset=0,-7/><img src='VIP_" + vip + "' offset=0,-7/>:  " + chatMsg;
        chatRichText.string = content;
        this.scrollChat.scrollToBottom(.2);
      }
      sendChat() {
        let msg = this.edbChat.string.trim();
        if (0 == msg.length) return;
        this.edbChat.string = "";
        MiniGameNetworkClient_1.default.getInstance().send(new BauCua_Cmd_1.default.SendChat(unescape(encodeURIComponent(msg))));
      }
    };
    __decorate([ property(cc.Node) ], BauCuaPanelChat.prototype, "container", void 0);
    __decorate([ property(cc.Node) ], BauCuaPanelChat.prototype, "itemChatTemplate", void 0);
    __decorate([ property(cc.ScrollView) ], BauCuaPanelChat.prototype, "scrollChat", void 0);
    __decorate([ property(cc.EditBox) ], BauCuaPanelChat.prototype, "edbChat", void 0);
    __decorate([ property(cc.SpriteAtlas) ], BauCuaPanelChat.prototype, "atlasVip", void 0);
    BauCuaPanelChat = __decorate([ ccclass ], BauCuaPanelChat);
    exports.default = BauCuaPanelChat;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/App": void 0,
    "../../Main/Game/src/common/BroadcastReceiver": void 0,
    "../../Main/Game/src/common/Constants": void 0,
    "../../Main/Game/src/common/Utils": void 0,
    "../../Main/Game/src/networks/MiniGameNetworkClient": void 0,
    "../../Main/Game/src/networks/Network.InPacket": void 0,
    "./BauCua.Cmd": "BauCua.Cmd"
  } ],
  "BauCua.PopupHistory": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c5aeaULcr1B6Kb50KQNLQjR", "BauCua.PopupHistory");
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
    const BauCua_BauCuaController_1 = require("./BauCua.BauCuaController");
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
          c: 121,
          mt: Configs_1.default.App.MONEY_TYPE,
          p: this.page,
          un: Configs_1.default.Login.Nickname
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
              if (i < res["transactions"].length) {
                let itemData = res["transactions"][i];
                item.getChildByName("bg").opacity = i % 2 == 0 ? 10 : 0;
                item.getChildByName("Session").getComponent(cc.Label).string = "#" + itemData["referenceId"];
                item.getChildByName("Time").getComponent(cc.Label).string = itemData["timestamp"].replace(" ", "\n");
                let betValues = itemData["betValues"][0] + itemData["betValues"][1] + itemData["betValues"][2] + itemData["betValues"][3] + itemData["betValues"][4] + itemData["betValues"][5];
                item.getChildByName("Bet").getComponent(cc.Label).string = Utils_1.default.formatMoney(betValues);
                let prizes = itemData["prizes"][0] + itemData["prizes"][1] + itemData["prizes"][2] + itemData["prizes"][3] + itemData["prizes"][4] + itemData["prizes"][5];
                item.getChildByName("Win").getComponent(cc.Label).string = Utils_1.default.formatMoney(prizes);
                let dices = itemData["dices"].split(",");
                let result = item.getChildByName("Result");
                result.children[0].getComponent(cc.Sprite).spriteFrame = BauCua_BauCuaController_1.default.instance.sprSmallDices[dices[0]];
                result.children[1].getComponent(cc.Sprite).spriteFrame = BauCua_BauCuaController_1.default.instance.sprSmallDices[dices[1]];
                result.children[2].getComponent(cc.Sprite).spriteFrame = BauCua_BauCuaController_1.default.instance.sprSmallDices[dices[2]];
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
    "../../Main/Game/src/common/Utils": void 0,
    "./BauCua.BauCuaController": "BauCua.BauCuaController"
  } ],
  "BauCua.PopupHonors": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "abd9cV9pOdGNajg/VVqxppb", "BauCua.PopupHonors");
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
        this.itemTemplate = null;
        this.atlasVip = null;
        this.sprTop = [];
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
        this.loadData();
      }
      loadData() {
        App_1.default.instance.showLoading(true);
        Http_1.default.get(Configs_1.default.App.API, {
          c: 120,
          mt: Configs_1.default.App.MONEY_TYPE
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
              for (let i = this.items.length - 1; i >= 0; i--) {
                let item = this.items[i];
                if (i < res["topBC"].length) {
                  let itemData = res["topBC"][i];
                  let dataVip = res["listUserVipRank"] && res["listUserVipRank"].find(data => data.nickname == itemData["username"]);
                  item.active = false;
                  item.getChildByName("bg").opacity = i % 2 == 0 ? 10 : 0;
                  item.getChildByName("Rank").getComponent(cc.Label).string = (i + 1).toString();
                  item.getChildByName("icon_top").getComponent(cc.Sprite).spriteFrame = this.sprTop[i];
                  item.getChildByName("Account").getComponent(cc.Label).string = itemData["username"];
                  item.getChildByName("name").getChildByName("lblAccount").getComponent(cc.Label).string = itemData["username"].length > 11 ? itemData["username"].substr(0, 10) + "..." : itemData["username"];
                  item.getChildByName("name").getChildByName("lblAccount").color = dataVip ? cc.Color.BLACK.fromHEX(Utils_1.default.getColorVip(dataVip.rank)) : cc.Color.BLACK.fromHEX(Utils_1.default.getColorVip("VIP_0"));
                  item.getChildByName("name").getChildByName("lblAccount").getComponent(cc.LabelOutline).color = dataVip ? cc.Color.BLACK.fromHEX(Utils_1.default.getColorVip(dataVip.rank)) : cc.Color.BLACK.fromHEX(Utils_1.default.getColorVip("VIP_0"));
                  item.getChildByName("name").getChildByName("vip").getComponent(cc.Sprite).spriteFrame = this.atlasVip.getSpriteFrame(dataVip.rank);
                  item.getChildByName("Win").getComponent(cc.Label).string = Utils_1.default.formatMoney(itemData["money"]);
                  item.active = true;
                  item.position = cc.v3(cc.winSize.width, 400);
                  item.stopAllActions();
                  let speed = .7;
                  item.runAction(cc.sequence(cc.delayTime(.15 * (this.items.length - i) * speed), cc.moveTo(.15 * speed, cc.v2(0, 400)), cc.delayTime(.05), cc.moveTo(.2 * speed * (1 === i ? .8 : 1 - Math.pow(2, -10 * i)), cc.v2(0, 380 - 85 * i)).easing(cc.easeCircleActionOut())));
                } else item.active = false;
              }
            }
          } catch (error) {
            ErrorLogger_1.ErrorLogger.sendLogError("Http response", "Bau cua honor", JSON.stringify(res) + "\n" + JSON.stringify(error.stack));
          }
        });
      }
    };
    __decorate([ property(cc.Node) ], PopupHonors.prototype, "itemTemplate", void 0);
    __decorate([ property(cc.SpriteAtlas) ], PopupHonors.prototype, "atlasVip", void 0);
    __decorate([ property([ cc.SpriteFrame ]) ], PopupHonors.prototype, "sprTop", void 0);
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
  } ],
  "BauCua.PotBauCua": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3c75emRscVCC67Pp2cPdqFU", "BauCua.PotBauCua");
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
    let ButtonPayBet = class ButtonPayBet extends cc.Component {
      constructor() {
        super(...arguments);
        this.button = null;
        this.lblTotal = null;
        this.lblBeted = null;
        this.overlay = null;
        this.lblFactor = null;
        this.effWin = null;
        this.actionPot = null;
      }
      onLoad() {
        this.node.getChildByName("betted").active = false;
      }
      onDisable() {
        this.effWin.stopAllActions();
        this.effWin.active = false;
      }
      setWin(isWin = false) {
        var _a;
        if (isWin) this.effWin.active = true; else {
          null === (_a = this.actionPot) || void 0 === _a ? void 0 : _a.stop();
          this.effWin.active = false;
        }
        this.node.getChildByName("betted").active = false;
      }
      actionBet() {
        this.node.getChildByName("betted").active = true;
      }
    };
    __decorate([ property(cc.Button) ], ButtonPayBet.prototype, "button", void 0);
    __decorate([ property(cc.Label) ], ButtonPayBet.prototype, "lblTotal", void 0);
    __decorate([ property(cc.Label) ], ButtonPayBet.prototype, "lblBeted", void 0);
    __decorate([ property(cc.Node) ], ButtonPayBet.prototype, "overlay", void 0);
    __decorate([ property(cc.Label) ], ButtonPayBet.prototype, "lblFactor", void 0);
    __decorate([ property(cc.Node) ], ButtonPayBet.prototype, "effWin", void 0);
    ButtonPayBet = __decorate([ ccclass ], ButtonPayBet);
    exports.default = ButtonPayBet;
    cc._RF.pop();
  }, {} ],
  "BauCua.SoiCauController": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "10577mNypRC5L3Ww4N4KeZx", "BauCua.SoiCauController");
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
    let SoiCauController = class SoiCauController extends cc.Component {
      constructor() {
        super(...arguments);
        this.nodeSoiCau = null;
        this.nodeHistories = null;
        this.itemHistoryTemplate = null;
        this.lblsSoiCau = [];
        this.sprHightLight = [];
        this.historiesData = [];
      }
      init() {
        this.historiesData = [];
        this.nodeHistories.active = true;
        this.nodeSoiCau.active = !this.nodeHistories.active;
        this.nodeHistories.getComponent(cc.ScrollView).scrollToTop(0);
      }
      addHistory(dices, spriteFrames) {
        if (this.itemHistoryTemplate.parent.childrenCount > 50) {
          this.itemHistoryTemplate.parent.children[1].removeFromParent();
          this.historiesData.splice(0, 1);
        }
        this.itemHistoryTemplate.parent.children.forEach(children => {
          children.getChildByName("dice1").getComponentInChildren(cc.Sprite).spriteFrame = null;
          children.getChildByName("dice2").getComponentInChildren(cc.Sprite).spriteFrame = null;
          children.getChildByName("dice3").getComponentInChildren(cc.Sprite).spriteFrame = null;
        });
        this.historiesData.push(dices);
        let item = cc.instantiate(this.itemHistoryTemplate);
        item.parent = this.itemHistoryTemplate.parent;
        item.active = true;
        item.getChildByName("dice1").getComponent(cc.Sprite).spriteFrame = spriteFrames[dices[0]];
        item.getChildByName("dice1").getComponentInChildren(cc.Sprite).spriteFrame = this.sprHightLight[dices[0]];
        item.getChildByName("dice2").getComponent(cc.Sprite).spriteFrame = spriteFrames[dices[1]];
        item.getChildByName("dice2").getComponentInChildren(cc.Sprite).spriteFrame = this.sprHightLight[dices[1]];
        item.getChildByName("dice3").getComponent(cc.Sprite).spriteFrame = spriteFrames[dices[2]];
        item.getChildByName("dice3").getComponentInChildren(cc.Sprite).spriteFrame = this.sprHightLight[dices[2]];
      }
      actSoiCau() {
        this.nodeHistories.active = !this.nodeHistories.active;
        this.nodeSoiCau.active = !this.nodeHistories.active;
      }
    };
    __decorate([ property(cc.Node) ], SoiCauController.prototype, "nodeSoiCau", void 0);
    __decorate([ property(cc.Node) ], SoiCauController.prototype, "nodeHistories", void 0);
    __decorate([ property(cc.Node) ], SoiCauController.prototype, "itemHistoryTemplate", void 0);
    __decorate([ property([ cc.Label ]) ], SoiCauController.prototype, "lblsSoiCau", void 0);
    __decorate([ property([ cc.SpriteFrame ]) ], SoiCauController.prototype, "sprHightLight", void 0);
    SoiCauController = __decorate([ ccclass ], SoiCauController);
    exports.default = SoiCauController;
    cc._RF.pop();
  }, {} ]
}, {}, [ "BauCua.BauCuaController", "BauCua.BetController", "BauCua.ButtonBetBauCua", "BauCua.Cmd", "BauCua.PanelChat", "BauCua.PopupHistory", "BauCua.PopupHonors", "BauCua.PotBauCua", "BauCua.SoiCauController" ]);