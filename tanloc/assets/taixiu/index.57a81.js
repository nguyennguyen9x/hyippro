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
  "TaiXiuMini.Cmd": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b758bL62fNHzoW+pRYt1pdx", "TaiXiuMini.Cmd");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.cmd = void 0;
    const Network_OutPacket_1 = require("../../Main/Game/src/networks/Network.OutPacket");
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    const Network_InPacket_1 = require("../../Main/Game/src/networks/Network.InPacket");
    const Constants_1 = require("../../Main/Game/src/common/Constants");
    const {ccclass: ccclass, property: property} = cc._decorator;
    var cmd;
    (function(cmd) {
      class Code {}
      Code.SCRIBE = 2e3;
      Code.UNSCRIBE = 2001;
      Code.BET = 2110;
      Code.HISTORIES = 2116;
      Code.GAME_INFO = 2111;
      Code.UPDATE_TIME = 2112;
      Code.DICES_RESULT = 2113;
      Code.RESULT = 2114;
      Code.NEW_GAME = 2115;
      Code.LOG_CHAT = 18003;
      Code.SEND_CHAT = 18e3;
      Code.SCRIBE_CHAT = 18001;
      Code.UNSCRIBE_CHAT = 18002;
      Code.TX_TAN_LOC = 2118;
      Code.TX_RUT_LOC = 2119;
      Code.UPDATE_LUOT_RUT_LOC = 2122;
      Code.ENABLE_RUT_LOC = 2123;
      Code.START_NEW_ROUND_RUT_LOC = 2121;
      Code.UPDATE_QUY_LOC = 2120;
      cmd.Code = Code;
      class SendScribe extends Network_OutPacket_1.default {
        constructor() {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.SCRIBE);
          this.packHeader();
          this.putShort(Configs_1.default.GameId.TaiXiu);
          this.putShort(Configs_1.default.App.MONEY_TYPE);
          this.updateSize();
        }
      }
      cmd.SendScribe = SendScribe;
      class SendUnScribe extends Network_OutPacket_1.default {
        constructor() {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.UNSCRIBE);
          this.packHeader();
          this.putShort(Configs_1.default.GameId.TaiXiu);
          this.putShort(Configs_1.default.App.MONEY_TYPE);
          this.updateSize();
        }
      }
      cmd.SendUnScribe = SendUnScribe;
      class SendScribeChat extends Network_OutPacket_1.default {
        constructor() {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.SCRIBE_CHAT);
          this.packHeader();
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
          this.updateSize();
        }
      }
      cmd.SendChat = SendChat;
      class SendBet extends Network_OutPacket_1.default {
        constructor(referenceId, betValue, door, remainTime) {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.BET);
          this.packHeader();
          this.putInt(1);
          this.putLong(referenceId);
          this.putLong(betValue);
          this.putShort(Configs_1.default.App.MONEY_TYPE);
          this.putShort(door);
          this.putShort(remainTime);
          this.updateSize();
        }
      }
      cmd.SendBet = SendBet;
      class SendHistories extends Network_OutPacket_1.default {
        constructor() {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.HISTORIES);
          this.packHeader();
          this.putInt(1);
        }
      }
      cmd.SendHistories = SendHistories;
      class CmdSendTanLoc extends Network_OutPacket_1.default {
        constructor(money) {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.TX_TAN_LOC);
          this.packHeader();
          this.putLong(money);
          this.updateSize();
        }
      }
      cmd.CmdSendTanLoc = CmdSendTanLoc;
      class CmdSendRutLoc extends Network_OutPacket_1.default {
        constructor() {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.TX_RUT_LOC);
          this.packHeader();
          this.updateSize();
        }
      }
      cmd.CmdSendRutLoc = CmdSendRutLoc;
      class ReceiveGameInfo extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.gameId = 0;
          this.moneyType = 0;
          this.referenceId = 0;
          this.remainTime = 0;
          this.bettingState = false;
          this.potTai = 0;
          this.potXiu = 0;
          this.betTai = 0;
          this.betXiu = 0;
          this.dice1 = 0;
          this.dice2 = 0;
          this.dice3 = 0;
          this.remainTimeRutLoc = 0;
          this.gameId = this.getShort();
          this.moneyType = this.getShort();
          this.referenceId = this.getLong();
          this.remainTime = this.getShort();
          this.bettingState = this.getBool();
          this.potTai = this.getLong();
          this.potXiu = this.getLong();
          this.betTai = this.getLong();
          this.betXiu = this.getLong();
          this.dice1 = this.getShort();
          this.dice2 = this.getShort();
          this.dice3 = this.getShort();
          this.remainTimeRutLoc = this.getShort();
        }
      }
      cmd.ReceiveGameInfo = ReceiveGameInfo;
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
      class ReceiveResult extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.moneyType = 1;
          this.totalMoney = 0;
          this.currentMoney = 0;
          this.refund = 0;
          this.moneyType = this.getShort();
          this.totalMoney = this.getLong();
          this.currentMoney = this.getLong();
          this.refund = this.getLong();
        }
      }
      cmd.ReceiveResult = ReceiveResult;
      class ReceiveNewGame extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.referenceId = 0;
          this.remainTimeRutLoc = 0;
          this.referenceId = this.getLong();
          this.remainTimeRutLoc = this.getShort();
        }
      }
      cmd.ReceiveNewGame = ReceiveNewGame;
      class ReceiveHistories extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.data = "";
          this.data = this.getString();
        }
      }
      cmd.ReceiveHistories = ReceiveHistories;
      class ReceiveBet extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.result = 0;
          this.currentMoney = 0;
          this.desc = "";
          this.suggestionActions = [];
          this.result = this.getError();
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
      class CmdTXUpdateSoLuotRutLoc extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.soLuotRut = 0;
          this.soLuotRut = this.getInt();
        }
      }
      cmd.CmdTXUpdateSoLuotRutLoc = CmdTXUpdateSoLuotRutLoc;
      class CmdTXRutLoc extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.prize = 0;
          this.currentMoney = 0;
          this.prize = this.getInt();
          this.currentMoney = this.getLong();
        }
      }
      cmd.CmdTXRutLoc = CmdTXRutLoc;
      class CmdTXTanLoc extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.currentMoney = 0;
          this.result = this.getShort();
          this.currentMoney = this.getLong();
        }
      }
      cmd.CmdTXTanLoc = CmdTXTanLoc;
      class CmdTXUpdateQuyLoc extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.value = 0;
          this.remainTime = 0;
          this.value = this.getLong();
          this.remainTime = this.getInt();
        }
      }
      cmd.CmdTXUpdateQuyLoc = CmdTXUpdateQuyLoc;
      class CmdTXStartRutLoc extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.remainTime = this.getInt();
        }
      }
      cmd.CmdTXStartRutLoc = CmdTXStartRutLoc;
    })(cmd = exports.cmd || (exports.cmd = {}));
    exports.default = cmd;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/common/Constants": void 0,
    "../../Main/Game/src/networks/Network.InPacket": void 0,
    "../../Main/Game/src/networks/Network.OutPacket": void 0
  } ],
  "TaiXiuMini.PanelChat": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "23cbfa2B/ZCQJ2RCPuC+7ry", "TaiXiuMini.PanelChat");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const TaiXiuMini_Cmd_1 = require("./TaiXiuMini.Cmd");
    const TaiXiuMini_TaiXiuMiniController_1 = require("./TaiXiuMini.TaiXiuMiniController");
    const MiniGameNetworkClient_1 = require("../../Main/Game/src/networks/MiniGameNetworkClient");
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const BroadcastReceiver_1 = require("../../Main/Game/src/common/BroadcastReceiver");
    const {ccclass: ccclass, property: property} = cc._decorator;
    var taixiumini;
    (function(taixiumini) {
      let PanelChat = class PanelChat extends cc.Component {
        constructor() {
          super(...arguments);
          this.itemChatTemplate = null;
          this.scrMessage = null;
          this.edbMessage = null;
          this.atlasVip = null;
        }
        start() {
          BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.SET_SOUND, this.node);
          this.itemChatTemplate.active = false;
        }
        show(isShow) {
          this.node.active = isShow;
          if (isShow) {
            for (var i = 0; i < this.scrMessage.content.childrenCount; i++) {
              let node = this.scrMessage.content.children[i];
              node.active = false;
            }
            MiniGameNetworkClient_1.default.getInstance().send(new TaiXiuMini_Cmd_1.default.SendScribeChat());
          } else MiniGameNetworkClient_1.default.getInstance().send(new TaiXiuMini_Cmd_1.default.SendUnScribeChat());
        }
        addMessage(nickname, message, vip) {
          let item = null;
          for (var i = 0; i < this.scrMessage.content.childrenCount; i++) {
            let node = this.scrMessage.content.children[i];
            if (!node.active) {
              item = node;
              break;
            }
          }
          null == item && (item = this.scrMessage.content.childrenCount >= 50 ? this.scrMessage.content.children[0] : cc.instantiate(this.itemChatTemplate));
          var zIndex = 0;
          for (var i = 0; i < this.scrMessage.content.childrenCount; i++) {
            let node = this.scrMessage.content.children[i];
            node != item && (node.zIndex = zIndex++);
          }
          item.parent = this.scrMessage.content;
          item.active = true;
          item.zIndex = zIndex++;
          let chatRichText = item.getComponentInChildren(cc.RichText);
          chatRichText.imageAtlas = this.atlasVip;
          let vipColor = Utils_1.default.getColorVip("VIP_" + vip);
          let content = "<color=" + vipColor + "><outline color=" + vipColor + "width=1>" + nickname + "</outline></color> <img src='Vip" + vip + "' offset=0,-7/><img src='VIP_" + vip + "' offset=0,-7/>:  " + message;
          chatRichText.string = content;
          this.scrollToBottom();
        }
        sendChat() {
          let msg = this.edbMessage.string.trim();
          if (0 == msg.length) return;
          this.edbMessage.string = "";
          TaiXiuMini_TaiXiuMiniController_1.default.instance.sendChat(msg);
        }
        scrollToBottom() {
          this.scrMessage.scrollToBottom(.2);
        }
      };
      __decorate([ property(cc.Node) ], PanelChat.prototype, "itemChatTemplate", void 0);
      __decorate([ property(cc.ScrollView) ], PanelChat.prototype, "scrMessage", void 0);
      __decorate([ property(cc.EditBox) ], PanelChat.prototype, "edbMessage", void 0);
      __decorate([ property(cc.SpriteAtlas) ], PanelChat.prototype, "atlasVip", void 0);
      PanelChat = __decorate([ ccclass ], PanelChat);
      taixiumini.PanelChat = PanelChat;
    })(taixiumini || (taixiumini = {}));
    exports.default = taixiumini.PanelChat;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/BroadcastReceiver": void 0,
    "../../Main/Game/src/common/Utils": void 0,
    "../../Main/Game/src/networks/MiniGameNetworkClient": void 0,
    "./TaiXiuMini.Cmd": "TaiXiuMini.Cmd",
    "./TaiXiuMini.TaiXiuMiniController": "TaiXiuMini.TaiXiuMiniController"
  } ],
  "TaiXiuMini.PopupDetailHistory": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "21f0d1UG0BOWpn2bpe9+oRh", "TaiXiuMini.PopupDetailHistory");
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
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const Http_1 = require("../../Main/Game/src/common/Http");
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    const TaiXiuMini_TaiXiuMiniController_1 = require("./TaiXiuMini.TaiXiuMiniController");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let PopupDetailHistory = class PopupDetailHistory extends Dialog_1.default {
      constructor() {
        super(...arguments);
        this.lblSession = null;
        this.lblTime = null;
        this.lblPage = null;
        this.lblTotalBetTai = null;
        this.lblTotalBetXiu = null;
        this.lblTotalRefundTai = null;
        this.lblTotalRefundXiu = null;
        this.sfDices = [];
        this.sfTai = null;
        this.sfXiu = null;
        this.sprDice1 = null;
        this.sprDice2 = null;
        this.sprDice3 = null;
        this.sprResult = null;
        this.itemTemplate = null;
        this.items = [];
        this.inited = false;
        this.session = 0;
        this.page = 1;
        this.totalPage = 1;
        this.historiesTai = [];
        this.historiesXiu = [];
      }
      showDetail(session) {
        this.session = session;
        this.show();
      }
      show() {
        super.show();
        this.sprDice1.node.active = false;
        this.sprDice2.node.active = false;
        this.sprDice3.node.active = false;
        this.sprResult.node.active = false;
        this.lblSession.string = "Phi\xean: #" + this.session;
        this.lblTime.string = "";
        if (this.inited) {
          for (let i = 0; i < this.items.length; i++) this.items[i].active = false;
          return;
        }
        this.itemTemplate.active = false;
        for (let i = 0; i < 10; i++) {
          let node = cc.instantiate(this.itemTemplate);
          node.parent = this.itemTemplate.parent;
          node.active = false;
          this.items.push(node);
        }
        this.inited = true;
      }
      _onShowed() {
        super._onShowed();
        this.loadData();
      }
      loadData() {
        for (var i = 0; i < this.items.length; i++) this.items[i].active = false;
        this.sprDice1.node.active = false;
        this.sprDice2.node.active = false;
        this.sprDice3.node.active = false;
        this.sprResult.node.active = false;
        this.lblSession.string = "Phi\xean: #" + this.session;
        this.lblTime.string = "";
        Http_1.default.get(Configs_1.default.App.API, {
          c: 102,
          rid: this.session,
          mt: Configs_1.default.App.MONEY_TYPE
        }, (err, res) => {
          if (null != err) return;
          this.historiesTai = [];
          this.historiesXiu = [];
          if (res.success && null !== res["resultTX"]) {
            for (var i = 0; i < res["transactions"].length; i++) {
              var itemData = res["transactions"][i];
              1 === itemData["betSide"] ? this.historiesTai.push(itemData) : this.historiesXiu.push(itemData);
            }
            for (var i = 0; i < this.items.length; i++) this.items[i].active = false;
            this.page = 1;
            this.totalPage = this.historiesXiu.length > this.historiesTai.length ? this.historiesXiu.length : this.historiesTai.length;
            this.totalPage = Math.max(1, Math.ceil(this.totalPage / this.items.length));
            this.lblPage.string = this.page + "/" + this.totalPage;
            this.lblSession.string = "Phi\xean: #" + res["resultTX"]["referenceId"];
            this.lblTime.string = res["resultTX"]["timestamp"];
            this.lblTotalBetTai.string = Utils_1.default.formatMoney(res["resultTX"]["totalTai"]);
            this.lblTotalBetXiu.string = Utils_1.default.formatMoney(res["resultTX"]["totalXiu"]);
            this.lblTotalRefundTai.string = Utils_1.default.formatMoney(res["resultTX"]["totalRefundTai"]);
            this.lblTotalRefundXiu.string = Utils_1.default.formatMoney(res["resultTX"]["totalRefundXiu"]);
            this.sprDice1.spriteFrame = this.sfDices[res["resultTX"]["dice1"]];
            this.sprDice1.node.active = true;
            this.sprDice2.spriteFrame = this.sfDices[res["resultTX"]["dice2"]];
            this.sprDice2.node.active = true;
            this.sprDice3.spriteFrame = this.sfDices[res["resultTX"]["dice3"]];
            this.sprDice3.node.active = true;
            this.sprResult.spriteFrame = 1 == res["resultTX"]["result"] ? this.sfTai : this.sfXiu;
            this.sprResult.node.active = true;
            this.loadDataPage();
          }
        });
      }
      loadDataPage() {
        for (var i = 0; i < this.items.length; i++) {
          var idx = (this.page - 1) * this.items.length + i;
          var item = this.items[i];
          item.active = true;
          if (idx < this.historiesTai.length) {
            var itemData = this.historiesTai[idx];
            item.getChildByName("Time").getComponent(cc.Label).string = (itemData["inputTime"] < 10 ? "00:0" : "00:") + itemData["inputTime"];
            item.getChildByName("Account").getComponent(cc.Label).string = itemData["username"];
            item.getChildByName("Refund").getComponent(cc.Label).string = Utils_1.default.formatMoney(itemData["refund"]);
            item.getChildByName("Bet").getComponent(cc.Label).string = Utils_1.default.formatMoney(itemData["betValue"]);
          } else {
            item.getChildByName("Time").getComponent(cc.Label).string = "";
            item.getChildByName("Account").getComponent(cc.Label).string = "";
            item.getChildByName("Refund").getComponent(cc.Label).string = "";
            item.getChildByName("Bet").getComponent(cc.Label).string = "";
          }
          if (idx < this.historiesXiu.length) {
            var itemData = this.historiesXiu[idx];
            item.getChildByName("Time2").getComponent(cc.Label).string = (itemData["inputTime"] < 10 ? "00:0" : "00:") + itemData["inputTime"];
            item.getChildByName("Account2").getComponent(cc.Label).string = itemData["username"];
            item.getChildByName("Refund2").getComponent(cc.Label).string = Utils_1.default.formatMoney(itemData["refund"]);
            item.getChildByName("Bet2").getComponent(cc.Label).string = Utils_1.default.formatMoney(itemData["betValue"]);
          } else {
            item.getChildByName("Time2").getComponent(cc.Label).string = "";
            item.getChildByName("Account2").getComponent(cc.Label).string = "";
            item.getChildByName("Refund2").getComponent(cc.Label).string = "";
            item.getChildByName("Bet2").getComponent(cc.Label).string = "";
          }
        }
        this.lblPage.string = this.page + "/" + this.totalPage;
      }
      actNextPage() {
        this.page++;
        this.page > this.totalPage && (this.page = this.totalPage);
        this.loadDataPage();
      }
      actPrevPage() {
        this.page--;
        this.page < 1 && (this.page = 1);
        this.loadDataPage();
      }
      actNextSession() {
        this.session++;
        if (this.session > TaiXiuMini_TaiXiuMiniController_1.default.instance.histories[TaiXiuMini_TaiXiuMiniController_1.default.instance.histories.length - 1].session) {
          this.session = TaiXiuMini_TaiXiuMiniController_1.default.instance.histories[TaiXiuMini_TaiXiuMiniController_1.default.instance.histories.length - 1].session;
          return;
        }
        this.loadData();
      }
      actPrevSession() {
        this.session--;
        this.loadData();
      }
    };
    __decorate([ property(cc.Label) ], PopupDetailHistory.prototype, "lblSession", void 0);
    __decorate([ property(cc.Label) ], PopupDetailHistory.prototype, "lblTime", void 0);
    __decorate([ property(cc.Label) ], PopupDetailHistory.prototype, "lblPage", void 0);
    __decorate([ property(cc.Label) ], PopupDetailHistory.prototype, "lblTotalBetTai", void 0);
    __decorate([ property(cc.Label) ], PopupDetailHistory.prototype, "lblTotalBetXiu", void 0);
    __decorate([ property(cc.Label) ], PopupDetailHistory.prototype, "lblTotalRefundTai", void 0);
    __decorate([ property(cc.Label) ], PopupDetailHistory.prototype, "lblTotalRefundXiu", void 0);
    __decorate([ property([ cc.SpriteFrame ]) ], PopupDetailHistory.prototype, "sfDices", void 0);
    __decorate([ property(cc.SpriteFrame) ], PopupDetailHistory.prototype, "sfTai", void 0);
    __decorate([ property(cc.SpriteFrame) ], PopupDetailHistory.prototype, "sfXiu", void 0);
    __decorate([ property(cc.Sprite) ], PopupDetailHistory.prototype, "sprDice1", void 0);
    __decorate([ property(cc.Sprite) ], PopupDetailHistory.prototype, "sprDice2", void 0);
    __decorate([ property(cc.Sprite) ], PopupDetailHistory.prototype, "sprDice3", void 0);
    __decorate([ property(cc.Sprite) ], PopupDetailHistory.prototype, "sprResult", void 0);
    __decorate([ property(cc.Node) ], PopupDetailHistory.prototype, "itemTemplate", void 0);
    PopupDetailHistory = __decorate([ ccclass ], PopupDetailHistory);
    exports.default = PopupDetailHistory;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/common/Dialog": void 0,
    "../../Main/Game/src/common/Http": void 0,
    "../../Main/Game/src/common/Utils": void 0,
    "./TaiXiuMini.TaiXiuMiniController": "TaiXiuMini.TaiXiuMiniController"
  } ],
  "TaiXiuMini.PopupHistory": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "321ecIaHMtPuqAY23OxAZx1", "TaiXiuMini.PopupHistory");
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
    var taixiumini;
    (function(taixiumini) {
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
            c: 100,
            p: this.page,
            un: Configs_1.default.Login.Nickname,
            mt: Configs_1.default.App.MONEY_TYPE,
            txType: 1
          }, (err, res) => {
            App_1.default.instance.showLoading(false);
            if (null != err) return;
            if (!res["success"]) return;
            cc.log("history", res);
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
                item.getChildByName("lblTime").getComponent(cc.Label).string = "#" + itemData["referenceId"] + "\n" + itemData["timestamp"].replace(" ", "\n");
                item.getChildByName("lblBetDoor").getComponent(cc.Label).string = 1 == itemData["betSide"] ? "T\xc0I" : "X\u1ec8U";
                item.getChildByName("lblResult").getComponent(cc.Label).string = itemData["resultPhien"].replace("   ", "\n");
                item.getChildByName("lblBet").getComponent(cc.Label).string = Utils_1.default.formatMoney(itemData["betValue"]);
                item.getChildByName("lblRefund").getComponent(cc.Label).string = Utils_1.default.formatMoney(itemData["totalRefund"]);
                item.getChildByName("lblWin").getComponent(cc.Label).string = Utils_1.default.formatMoney(itemData["totalPrize"]);
                item.active = true;
              } else item.active = false;
            }
          });
        }
      };
      __decorate([ property(cc.Label) ], PopupHistory.prototype, "lblPage", void 0);
      __decorate([ property(cc.Node) ], PopupHistory.prototype, "itemTemplate", void 0);
      PopupHistory = __decorate([ ccclass ], PopupHistory);
      taixiumini.PopupHistory = PopupHistory;
    })(taixiumini || (taixiumini = {}));
    exports.default = taixiumini.PopupHistory;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/App": void 0,
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/common/Dialog": void 0,
    "../../Main/Game/src/common/Http": void 0,
    "../../Main/Game/src/common/Utils": void 0
  } ],
  "TaiXiuMini.PopupHonors": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "65ed7s2AEZFp4FEqaIOgiUM", "TaiXiuMini.PopupHonors");
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
    const Http_1 = require("../../Main/Game/src/common/Http");
    const App_1 = require("../../Main/Game/src/common/App");
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const ErrorLogger_1 = require("../../Main/Game/src/common/ErrorLogger");
    var LIST_COLOR_VIP = {
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
    var taixiumini;
    (function(taixiumini) {
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
            c: 101,
            mt: Configs_1.default.App.MONEY_TYPE,
            txType: 1
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
                  if (i < res["topTX"].length) {
                    let itemData = res["topTX"][i];
                    let dataVip = res["listUserVipRank"] && res["listUserVipRank"].find(data => data.nickname == itemData["username"]);
                    item.active = false;
                    item.getChildByName("bg").opacity = i % 2 == 0 ? 10 : 0;
                    item.getChildByName("icon_top").getComponent(cc.Sprite).spriteFrame = this.sprTop[i];
                    item.getChildByName("name").getChildByName("lblAccount").getComponent(cc.Label).string = itemData["username"];
                    item.getChildByName("name").getChildByName("lblAccount").color = dataVip ? cc.Color.BLACK.fromHEX(LIST_COLOR_VIP[dataVip.rank]) : cc.Color.BLACK.fromHEX(LIST_COLOR_VIP["VIP_0"]);
                    item.getChildByName("name").getChildByName("lblAccount").getComponent(cc.LabelOutline).color = dataVip ? cc.Color.BLACK.fromHEX(LIST_COLOR_VIP[dataVip.rank]) : cc.Color.BLACK.fromHEX(LIST_COLOR_VIP["VIP_0"]);
                    item.getChildByName("name").getChildByName("vip").getComponent(cc.Sprite).spriteFrame = this.atlasVip.getSpriteFrame(dataVip.rank);
                    item.getChildByName("lblWin").getComponent(cc.Label).string = Utils_1.default.formatMoney(itemData["money"]);
                    item.active = true;
                    item.position = cc.v3(cc.winSize.width, 400);
                    item.stopAllActions();
                    let speed = .7;
                    item.runAction(cc.sequence(cc.delayTime(.15 * (this.items.length - i) * speed), cc.moveTo(.15 * speed, cc.v2(0, 400)), cc.delayTime(.05), cc.moveTo(.2 * speed * (1 === i ? .8 : 1 - Math.pow(2, -10 * i)), cc.v2(0, 380 - 85 * i)).easing(cc.easeCircleActionOut())));
                  } else item.active = false;
                }
              }
            } catch (error) {
              ErrorLogger_1.ErrorLogger.sendLogError("Http response", "Tai xiu honor", JSON.stringify(res) + "\n" + JSON.stringify(error.stack));
            }
          });
        }
      };
      __decorate([ property(cc.Node) ], PopupHonors.prototype, "itemTemplate", void 0);
      __decorate([ property(cc.SpriteAtlas) ], PopupHonors.prototype, "atlasVip", void 0);
      __decorate([ property([ cc.SpriteFrame ]) ], PopupHonors.prototype, "sprTop", void 0);
      PopupHonors = __decorate([ ccclass ], PopupHonors);
      taixiumini.PopupHonors = PopupHonors;
    })(taixiumini || (taixiumini = {}));
    exports.default = taixiumini.PopupHonors;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/App": void 0,
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/common/Dialog": void 0,
    "../../Main/Game/src/common/ErrorLogger": void 0,
    "../../Main/Game/src/common/Http": void 0,
    "../../Main/Game/src/common/Utils": void 0
  } ],
  "TaiXiuMini.PopupSoiCau": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "62d139IuXBFBaudwuNL1Dq5", "TaiXiuMini.PopupSoiCau");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const TaiXiuMini_TaiXiuMiniController_1 = require("./TaiXiuMini.TaiXiuMiniController");
    const Dialog_1 = require("../../Main/Game/src/common/Dialog");
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const MiniGameNetworkClient_1 = require("../../Main/Game/src/networks/MiniGameNetworkClient");
    const TaiXiuMini_Cmd_1 = require("./TaiXiuMini.Cmd");
    const {ccclass: ccclass, property: property} = cc._decorator;
    var taixiumini;
    (function(taixiumini) {
      let PopupSoiCau = class PopupSoiCau extends Dialog_1.default {
        constructor() {
          super(...arguments);
          this.lineTemplate = null;
          this.iconTaiTemplate = null;
          this.iconXiuTemplate = null;
          this.iconXX1Template = null;
          this.iconXX2Template = null;
          this.iconXX3Template = null;
          this.iconNumberTemplate = null;
          this.page1 = null;
          this.lblLastSession = null;
          this.xx1Draw = null;
          this.xx2Draw = null;
          this.xx3Draw = null;
          this.xx123Draw = null;
          this.page2 = null;
          this.lblTai1 = null;
          this.lblTai2 = null;
          this.lblXiu1 = null;
          this.lblXiu2 = null;
          this.contentDraw = null;
        }
        show() {
          super.show();
          MiniGameNetworkClient_1.default.getInstance().send(new TaiXiuMini_Cmd_1.default.SendHistories());
          this.lineTemplate.parent.active = false;
        }
        dismiss() {
          super.dismiss();
        }
        _onShowed() {
          super._onShowed();
          this.drawPage2();
          this.drawPage1();
        }
        toggleXX1(target) {
          this.xx1Draw.active = target.isChecked;
        }
        toggleXX2(target) {
          this.xx2Draw.active = target.isChecked;
        }
        toggleXX3(target) {
          this.xx3Draw.active = target.isChecked;
        }
        togglePage() {
          this.drawPage1();
          this.drawPage2();
        }
        drawPage1() {
          var data = TaiXiuMini_TaiXiuMiniController_1.default.instance.histories.slice();
          data.length > 22 && data.splice(0, data.length - 22);
          if (!data || !(data.length > 0)) return;
          var last = data[data.length - 1];
          var lastDices = last.dices;
          var lastScore = lastDices[0] + lastDices[1] + lastDices[2];
          this.lblLastSession.string = "Phi\xean g\u1ea7n nh\u1ea5t: (#" + last.session + ")  " + (lastScore >= 11 ? "T\xc0I" : "X\u1ec8U") + "  " + lastScore + "(" + lastDices[0] + "-" + lastDices[1] + "-" + lastDices[2] + ")";
          let endPosX = 311;
          let startPosY = -195.822;
          let startPosY123 = -4.234;
          this.xx1Draw.removeAllChildren();
          this.xx2Draw.removeAllChildren();
          this.xx3Draw.removeAllChildren();
          this.xx123Draw.removeAllChildren();
          let _i = 0;
          var spacingX = 28.3;
          var spacingY = 30.2;
          for (var i = data.length - 1; i >= 0; i--) {
            var dices = data[i].dices;
            var score = dices[0] + dices[1] + dices[2];
            let startPosXX1 = cc.v2(endPosX - _i * spacingX, startPosY + (dices[0] - 1) * spacingY);
            let startPosXX2 = cc.v2(endPosX - _i * spacingX, startPosY + (dices[1] - 1) * spacingY);
            let startPosXX3 = cc.v2(endPosX - _i * spacingX, startPosY + (dices[2] - 1) * spacingY);
            let startPosXX123 = cc.v2(endPosX - _i * spacingX, startPosY123 + spacingY / 3 * (score - 3));
            let iconXX1 = cc.instantiate(this.iconXX1Template);
            iconXX1.parent = this.xx1Draw;
            iconXX1.setPosition(startPosXX1);
            let iconXX2 = cc.instantiate(this.iconXX2Template);
            iconXX2.parent = this.xx2Draw;
            iconXX2.setPosition(startPosXX2);
            let iconXX3 = cc.instantiate(this.iconXX3Template);
            iconXX3.parent = this.xx3Draw;
            iconXX3.setPosition(startPosXX3);
            let iconXX123 = cc.instantiate(score >= 11 ? this.iconTaiTemplate : this.iconXiuTemplate);
            iconXX123.parent = this.xx123Draw;
            iconXX123.setPosition(startPosXX123);
            if (_i > 0) {
              dices = data[i + 1].dices;
              score = dices[0] + dices[1] + dices[2];
              let endPosXX1 = cc.v2(endPosX - (_i - 1) * spacingX, startPosY + (dices[0] - 1) * spacingY);
              let endPosXX2 = cc.v2(endPosX - (_i - 1) * spacingX, startPosY + (dices[1] - 1) * spacingY);
              let endPosXX3 = cc.v2(endPosX - (_i - 1) * spacingX, startPosY + (dices[2] - 1) * spacingY);
              let endPosXX123 = cc.v2(endPosX - (_i - 1) * spacingX, startPosY123 + spacingY / 3 * (score - 3));
              let line = cc.instantiate(this.lineTemplate);
              line.parent = this.xx1Draw;
              line.width = Utils_1.default.v2Distance(startPosXX1, endPosXX1);
              line.setPosition(startPosXX1);
              line.angle = Utils_1.default.v2Degrees(startPosXX1, endPosXX1);
              line.color = cc.Color.BLACK.fromHEX("#ff1800");
              line.zIndex = 0;
              line = cc.instantiate(this.lineTemplate);
              line.parent = this.xx2Draw;
              line.width = Utils_1.default.v2Distance(startPosXX2, endPosXX2);
              line.setPosition(startPosXX2);
              line.angle = Utils_1.default.v2Degrees(startPosXX2, endPosXX2);
              line.color = cc.Color.BLACK.fromHEX("#ffea00");
              line.zIndex = 0;
              line = cc.instantiate(this.lineTemplate);
              line.parent = this.xx3Draw;
              line.width = Utils_1.default.v2Distance(startPosXX3, endPosXX3);
              line.setPosition(startPosXX3);
              line.angle = Utils_1.default.v2Degrees(startPosXX3, endPosXX3);
              line.color = cc.Color.BLACK.fromHEX("#35e100");
              line.zIndex = 0;
              line = cc.instantiate(this.lineTemplate);
              line.parent = this.xx123Draw;
              line.width = Utils_1.default.v2Distance(startPosXX123, endPosXX123);
              line.setPosition(startPosXX123);
              line.angle = Utils_1.default.v2Degrees(startPosXX123, endPosXX123);
              line.color = cc.Color.BLACK.fromHEX("#ffea00");
              line.zIndex = -1;
            }
            _i++;
          }
        }
        drawPage2() {
          var startPosX = -283.773;
          var startPosY = 132.93;
          var spacingX = 28.3;
          var spacingY = 30.2;
          this.contentDraw.removeAllChildren();
          var data = [];
          var curData = [];
          var count = TaiXiuMini_TaiXiuMiniController_1.default.instance.histories.length;
          var countTai = 0;
          var countXiu = 0;
          if (count > 1) {
            var dices = TaiXiuMini_TaiXiuMiniController_1.default.instance.histories[0].dices;
            var score = dices[0] + dices[1] + dices[2];
            var isTai = score >= 11;
            var maxItem = 5;
            for (var i = 0; i < count; i++) {
              dices = TaiXiuMini_TaiXiuMiniController_1.default.instance.histories[i].dices;
              score = dices[0] + dices[1] + dices[2];
              var _isTai = score >= 11;
              if (_isTai !== isTai) {
                curData.length > maxItem && curData.splice(0, curData.length - maxItem);
                data.push(curData);
                isTai ? countTai += curData.length : countXiu += curData.length;
                isTai = _isTai;
                curData = [];
                curData.push(score);
              } else curData.push(score);
              if (i === count - 1) {
                curData.length > maxItem && curData.splice(0, curData.length - maxItem);
                data.push(curData);
                isTai ? countTai += curData.length : countXiu += curData.length;
              }
            }
          }
          data.length > 21 && data.splice(0, data.length - 21);
          this.lblTai1.string = "T\xc0I: " + countTai;
          this.lblXiu1.string = "X\u1ec8U: " + countXiu;
          for (let i = 0; i < data.length; i++) for (let j = 0; j < data[i].length; j++) {
            let score = data[i][j];
            let icon = cc.instantiate(this.iconNumberTemplate);
            icon.parent = this.contentDraw;
            icon.setPosition(cc.v2(startPosX + spacingX * i, startPosY - spacingY * j));
            icon.color = cc.Color.BLACK.fromHEX(score >= 11 ? "#4192ff" : "#FFFFFF");
            icon.getComponent(cc.Label).string = "" + score;
          }
          startPosX = -281.793;
          startPosY = -58.447;
          var column = 0;
          var row = 0;
          var countTai = 0;
          var countXiu = 0;
          var data = TaiXiuMini_TaiXiuMiniController_1.default.instance.histories.slice();
          data.length > 105 && data.splice(0, data.length - 105);
          for (var i = 0; i < data.length; i++) {
            var score = data[i].dices[0] + data[i].dices[1] + data[i].dices[2];
            score >= 11 ? countTai++ : countXiu++;
            let iconXX123 = cc.instantiate(score >= 11 ? this.iconTaiTemplate : this.iconXiuTemplate);
            iconXX123.parent = this.contentDraw;
            iconXX123.setPosition(cc.v2(startPosX + spacingX * column, startPosY - spacingY * row));
            row++;
            if (row >= 5) {
              row = 0;
              column++;
            }
          }
          this.lblTai2.string = "T\xc0I: " + countTai;
          this.lblXiu2.string = "X\u1ec8U: " + countXiu;
        }
      };
      __decorate([ property(cc.Node) ], PopupSoiCau.prototype, "lineTemplate", void 0);
      __decorate([ property(cc.Node) ], PopupSoiCau.prototype, "iconTaiTemplate", void 0);
      __decorate([ property(cc.Node) ], PopupSoiCau.prototype, "iconXiuTemplate", void 0);
      __decorate([ property(cc.Node) ], PopupSoiCau.prototype, "iconXX1Template", void 0);
      __decorate([ property(cc.Node) ], PopupSoiCau.prototype, "iconXX2Template", void 0);
      __decorate([ property(cc.Node) ], PopupSoiCau.prototype, "iconXX3Template", void 0);
      __decorate([ property(cc.Node) ], PopupSoiCau.prototype, "iconNumberTemplate", void 0);
      __decorate([ property(cc.Node) ], PopupSoiCau.prototype, "page1", void 0);
      __decorate([ property(cc.Label) ], PopupSoiCau.prototype, "lblLastSession", void 0);
      __decorate([ property(cc.Node) ], PopupSoiCau.prototype, "xx1Draw", void 0);
      __decorate([ property(cc.Node) ], PopupSoiCau.prototype, "xx2Draw", void 0);
      __decorate([ property(cc.Node) ], PopupSoiCau.prototype, "xx3Draw", void 0);
      __decorate([ property(cc.Node) ], PopupSoiCau.prototype, "xx123Draw", void 0);
      __decorate([ property(cc.Node) ], PopupSoiCau.prototype, "page2", void 0);
      __decorate([ property(cc.Label) ], PopupSoiCau.prototype, "lblTai1", void 0);
      __decorate([ property(cc.Label) ], PopupSoiCau.prototype, "lblTai2", void 0);
      __decorate([ property(cc.Label) ], PopupSoiCau.prototype, "lblXiu1", void 0);
      __decorate([ property(cc.Label) ], PopupSoiCau.prototype, "lblXiu2", void 0);
      __decorate([ property(cc.Node) ], PopupSoiCau.prototype, "contentDraw", void 0);
      PopupSoiCau = __decorate([ ccclass ], PopupSoiCau);
      taixiumini.PopupSoiCau = PopupSoiCau;
    })(taixiumini || (taixiumini = {}));
    exports.default = taixiumini.PopupSoiCau;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/Dialog": void 0,
    "../../Main/Game/src/common/Utils": void 0,
    "../../Main/Game/src/networks/MiniGameNetworkClient": void 0,
    "./TaiXiuMini.Cmd": "TaiXiuMini.Cmd",
    "./TaiXiuMini.TaiXiuMiniController": "TaiXiuMini.TaiXiuMiniController"
  } ],
  "TaiXiuMini.PopupThanhDu": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f4cbaZlzz5C24Im4AdHMjCb", "TaiXiuMini.PopupThanhDu");
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
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    const Http_1 = require("../../Main/Game/src/common/Http");
    const App_1 = require("../../Main/Game/src/common/App");
    const {ccclass: ccclass, property: property} = cc._decorator;
    var taixiumini;
    (function(taixiumini) {
      let PopupThanhDu = class PopupThanhDu extends Dialog_1.default {
        constructor() {
          super(...arguments);
          this.sprTabNormal = null;
          this.sprTabActive = null;
          this.tabs = null;
          this.childTabs = null;
          this.itemTemplate = null;
          this.lblDate = null;
          this.selectedTab = 0;
          this.selectedChildTab = 0;
          this.date = new Date();
          this.items = new Array();
        }
        start() {
          for (let i = 0; i < this.tabs.childrenCount; i++) {
            let tab = this.tabs.children[i];
            tab.on("click", () => {
              this.selectedTab = i;
              this.selectedChildTab = 0;
              this.date = new Date();
              this.updateTabSpriteFrame();
              this.loadData();
            });
          }
          for (let i = 0; i < this.childTabs.childrenCount; i++) {
            let tab = this.childTabs.children[i];
            tab.on("click", () => {
              this.selectedChildTab = i;
              this.updateTabSpriteFrame();
              this.loadData();
            });
          }
        }
        dismiss() {
          super.dismiss();
          for (let i = 0; i < this.items.length; i++) this.items[i].active = false;
        }
        show() {
          super.show();
          for (let i = 0; i < this.items.length; i++) this.items[i].active = false;
          null != this.itemTemplate && (this.itemTemplate.active = false);
        }
        _onShowed() {
          super._onShowed();
          this.selectedTab = 0;
          this.selectedChildTab = 0;
          this.updateTabSpriteFrame();
          this.loadData();
        }
        actNext() {
          0 === this.selectedTab ? this.date.setDate(this.date.getDate() + 1) : this.date.setMonth(this.date.getMonth() + 1);
          this.loadData();
        }
        actPrev() {
          0 === this.selectedTab ? this.date.setDate(this.date.getDate() - 1) : this.date.setMonth(this.date.getMonth() - 1);
          this.loadData();
        }
        updateTabSpriteFrame() {
          for (let i = 0; i < this.tabs.childrenCount; i++) {
            let tab = this.tabs.children[i];
            tab.getComponent(cc.Sprite).spriteFrame = this.selectedTab == i ? this.sprTabActive : this.sprTabNormal;
          }
          for (let i = 0; i < this.childTabs.childrenCount; i++) {
            let tab = this.childTabs.children[i];
            tab.getComponent(cc.Sprite).spriteFrame = this.selectedChildTab == i ? this.sprTabActive : this.sprTabNormal;
          }
        }
        loadData() {
          App_1.default.instance.showLoading(true);
          var typeTop = 0 === this.selectedChildTab ? 1 : 0;
          var date = 0 === this.selectedTab ? Utils_1.default.dateToYYYYMMdd(this.date) : Utils_1.default.dateToYYYYMM(this.date);
          this.lblDate.string = date;
          var params = 0 === this.selectedTab ? {
            c: 103,
            date: date,
            type: typeTop,
            txType: 1
          } : {
            c: 103,
            month: date,
            type: typeTop,
            txType: 1
          };
          Http_1.default.get(Configs_1.default.App.API, params, (err, res) => {
            App_1.default.instance.showLoading(false);
            if (null != err) return;
            if (!res["success"]) return;
            if (0 == this.items.length) {
              for (var i = 0; i < 10; i++) {
                let item = cc.instantiate(this.itemTemplate);
                item.parent = this.itemTemplate.parent;
                this.items.push(item);
              }
              this.itemTemplate.destroy();
              this.itemTemplate = null;
            }
            for (let i = 0; i < this.items.length; i++) {
              let item = this.items[i];
              if (i < res["results"].length) {
                let itemData = res["results"][i];
                item.getChildByName("no").getComponent(cc.Label).string = (i + 1).toString();
                item.getChildByName("account").getComponent(cc.Label).string = itemData["username"];
                item.getChildByName("count").getComponent(cc.Label).string = Utils_1.default.formatNumber(itemData["number"]);
                item.getChildByName("winlose").getComponent(cc.Label).string = Utils_1.default.formatNumber(itemData["totalMoney"]);
                item.getChildByName("session").getComponent(cc.Label).string = "#" + itemData["referenceId"];
                item.getChildByName("award").getComponent(cc.Label).string = itemData["prize"];
                item.active = true;
              } else item.active = false;
            }
          });
        }
      };
      __decorate([ property(cc.SpriteFrame) ], PopupThanhDu.prototype, "sprTabNormal", void 0);
      __decorate([ property(cc.SpriteFrame) ], PopupThanhDu.prototype, "sprTabActive", void 0);
      __decorate([ property(cc.Node) ], PopupThanhDu.prototype, "tabs", void 0);
      __decorate([ property(cc.Node) ], PopupThanhDu.prototype, "childTabs", void 0);
      __decorate([ property(cc.Node) ], PopupThanhDu.prototype, "itemTemplate", void 0);
      __decorate([ property(cc.Label) ], PopupThanhDu.prototype, "lblDate", void 0);
      PopupThanhDu = __decorate([ ccclass ], PopupThanhDu);
      taixiumini.PopupThanhDu = PopupThanhDu;
    })(taixiumini || (taixiumini = {}));
    exports.default = taixiumini.PopupThanhDu;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/App": void 0,
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/common/Dialog": void 0,
    "../../Main/Game/src/common/Http": void 0,
    "../../Main/Game/src/common/Utils": void 0
  } ],
  "TaiXiuMini.TaiXiuMiniController": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "61a68KC+wNE6ptrR7XUb9CZ", "TaiXiuMini.TaiXiuMiniController");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var TaiXiuMiniController_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const TaiXiuMini_Cmd_1 = require("./TaiXiuMini.Cmd");
    const TaiXiuMini_PanelChat_1 = require("./TaiXiuMini.PanelChat");
    const MiniGameNetworkClient_1 = require("../../Main/Game/src/networks/MiniGameNetworkClient");
    const Network_InPacket_1 = require("../../Main/Game/src/networks/Network.InPacket");
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const Tween_1 = require("../../Main/Game/src/common/Tween");
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    const BroadcastReceiver_1 = require("../../Main/Game/src/common/BroadcastReceiver");
    const App_1 = require("../../Main/Game/src/common/App");
    const TaiXiuMini_PopupDetailHistory_1 = require("./TaiXiuMini.PopupDetailHistory");
    const MiniGame_1 = require("../../Main/Lobby/src/MiniGame");
    const TaiXiuMini_PopupSoiCau_1 = require("./TaiXiuMini.PopupSoiCau");
    const Common_AudioManager_1 = require("../../Main/Game/src/common/Common.AudioManager");
    const Constants_1 = require("../../Main/Game/src/common/Constants");
    const {ccclass: ccclass, property: property} = cc._decorator;
    var BetDoor;
    (function(BetDoor) {
      BetDoor[BetDoor["None"] = 0] = "None";
      BetDoor[BetDoor["Tai"] = 1] = "Tai";
      BetDoor[BetDoor["Xiu"] = 2] = "Xiu";
    })(BetDoor || (BetDoor = {}));
    let TaiXiuMiniController = TaiXiuMiniController_1 = class TaiXiuMiniController extends MiniGame_1.default {
      constructor() {
        super(...arguments);
        this.sprFrameTai = null;
        this.sprFrameXiu = null;
        this.sprFrameBtnNan = null;
        this.sprFrameBtnNan2 = null;
        this.lblSession = null;
        this.lblRemainTime = null;
        this.lblRemainTime2 = null;
        this.lblScore = null;
        this.lblUserTai = null;
        this.lblUserXiu = null;
        this.lblTotalBetTai = null;
        this.lblTotalBetXiu = null;
        this.btnBetTai = null;
        this.btnBetXiu = null;
        this.lblBetTai = null;
        this.lblBetXiu = null;
        this.lblBetedTai = null;
        this.lblBetedXiu = null;
        this.animationResults = new Array();
        this.sprFrameDice = null;
        this.diceResults = [];
        this.bgRedTime = null;
        this.bowl = null;
        this.aniResult = null;
        this.btnHistories = null;
        this.nodePanelChat = null;
        this.layoutBet = null;
        this.btnBetAmounts = new Array();
        this.scrollBetAmount = null;
        this.btnNextBetAmount = null;
        this.btnPreviousBetAmount = null;
        this.lblToast = null;
        this.lblWinCash = null;
        this.btnNan = null;
        this.popupDetailHistory = null;
        this.popupSoiCau = null;
        this.rutLocConLaiLb = null;
        this.huLocLb = null;
        this.timeRutLocNode = null;
        this.btnRutLoc = null;
        this.soundCountDown = null;
        this.soundBetted = null;
        this.soundBet = null;
        this.soundWin = null;
        this.soundAddChip = null;
        this.soundSubChip = null;
        this.soundDice = null;
        this.soundNewGame = null;
        this.soundHideChip = null;
        this.isBetting = false;
        this.remainTime = 0;
        this.canBet = true;
        this.betedTai = 0;
        this.betedXiu = 0;
        this.referenceId = 0;
        this.betingValue = -1;
        this.betingDoor = BetDoor.None;
        this.isOpenBowl = false;
        this.lastWinCash = 0;
        this.refund = 0;
        this.lastScore = 0;
        this.isNan = false;
        this.histories = [];
        this.isCanChat = true;
        this.panelChat = null;
        this.maxBetValue = 999999999;
        this.ROTATION_DEFAULT = [ 0, 0, 91.235, -47.765, 16.937, -115.606, -108.145 ];
        this.POSITION_DEFAULT = [ cc.v2(0, 0), cc.v2(-11.059, -4.414), cc.v2(24.364, -51.172), cc.v2(37.163, -31.782), cc.v2(11.658, -30.525), cc.v2(9.189, -5.143), cc.v2(11.282, -2.444) ];
        this.listBets = [ 1e3, 5e3, 1e4, 5e4, 1e5, 5e5, 1e6, 2e6, 5e6, 1e7 ];
        this.bowlStartPos = cc.v2(-7.773, 23.556);
        this.soLanRutLoc = 0;
        this.timeRutLoc = 0;
        this.readTime = 0;
      }
      subscribe() {
        MiniGameNetworkClient_1.default.getInstance().send(new TaiXiuMini_Cmd_1.default.SendScribe());
      }
      onSubscribeSuccess() {
        this.layoutBet.active = false;
        this.lblToast.node.parent.active = false;
        this.lblWinCash.node.active = false;
        this.layoutBet.active = false;
        this.bowl.active = false;
        this.diceResults.forEach(ani => {
          ani.node.active = false;
        });
        this.showChat();
        super.onSubscribeSuccess();
      }
      _onShowed() {
        super._onShowed();
        Configs_1.default.Login.Coin >= Configs_1.default.App.RICH_MAN ? this.scrollBetAmount.scrollToRight(.5) : this.scrollBetAmount.scrollToLeft(.5);
        cc.tween(this.btnNextBetAmount).repeatForever(cc.blink(1, 1)).start();
        cc.tween(this.btnPreviousBetAmount).repeatForever(cc.blink(1, 1)).start();
      }
      dismiss() {
        cc.Tween.stopAllByTarget(this.btnNextBetAmount);
        cc.Tween.stopAllByTarget(this.btnPreviousBetAmount);
        super.dismiss();
      }
      onLoad() {
        TaiXiuMiniController_1.instance = this;
        this.scrollBetAmount.node.on("scroll-ended", () => {
          let maxOffset = this.scrollBetAmount.getMaxScrollOffset().x;
          let offset = this.scrollBetAmount.getScrollOffset().x;
          this.btnNextBetAmount.active = maxOffset + offset > 50;
          this.btnPreviousBetAmount.active = offset < -50;
        });
      }
      start() {
        super.start();
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
           case TaiXiuMini_Cmd_1.default.Code.GAME_INFO:
            try {
              let res = new TaiXiuMini_Cmd_1.default.ReceiveGameInfo(data);
              this.showLog([ "GAME_INFO", res ]);
              this.onSubscribeSuccess();
              this.stopWin();
              this.bowl.active = false;
              this.lastWinCash = 0;
              this.refund = 0;
              if (res.bettingState) {
                this.isBetting = true;
                this.diceResults.forEach(ani => {
                  ani.node.active = false;
                });
                this.bowl.off(cc.Node.EventType.TOUCH_MOVE);
                this.aniResult.setAnimation(0, "normal", false);
                this.lblRemainTime.node.active = true;
                5 == res.remainTime && Common_AudioManager_1.default.getInstance().playEffect(this.soundCountDown, .7);
                if (res.remainTime < 6) {
                  this.bgRedTime.parent.color = new cc.Color(255, 0, 0);
                  cc.tween(this.bgRedTime.parent).to(1, {
                    angle: this.bgRedTime.parent.angle + 90 + 750 / (res.remainTime + 1)
                  }).start();
                  this.bgRedTime.runAction(cc.sequence(cc.fadeIn(.5), cc.callFunc(() => {
                    this.bgRedTime.opacity = 150;
                  }), cc.fadeIn(.5), cc.callFunc(() => {
                    this.bgRedTime.opacity = 150;
                  })));
                } else {
                  this.bgRedTime.parent.color = new cc.Color(255, 255, 255);
                  cc.tween(this.bgRedTime.parent).to(1, {
                    angle: this.bgRedTime.parent.angle + 90
                  }).start();
                  this.bgRedTime.opacity = 0;
                }
                this.lblRemainTime.string = res.remainTime < 6 ? "0" + res.remainTime : "" + res.remainTime;
                this.lblRemainTime2.node.active = false;
                this.lblScore.node.parent.active = false;
              } else {
                this.lastScore = res.dice1 + res.dice2 + res.dice3;
                this.isBetting = false;
                this.showDice(res, false);
                this.bgRedTime.parent.color = new cc.Color(255, 255, 255);
                this.bgRedTime.opacity = 0;
                this.lblRemainTime.node.active = false;
                this.scheduleOnce(() => {
                  this.lblRemainTime2.node.active = true;
                  this.lblRemainTime2.string = "00:" + (res.remainTime < 10 ? "0" + res.remainTime : "" + res.remainTime);
                }, 2);
                this.showResult();
              }
              Tween_1.default.numberTo(this.lblTotalBetTai, res.potTai, .3);
              Tween_1.default.numberTo(this.lblTotalBetXiu, res.potXiu, .3);
              this.betingDoor = res.betTai > 0 ? BetDoor.Tai : res.betXiu > 0 ? BetDoor.Xiu : BetDoor.None;
              this.betedTai = res.betTai;
              this.lblBetedTai.string = Utils_1.default.formatMoney(this.betedTai);
              this.betedXiu = res.betXiu;
              this.lblBetedXiu.string = Utils_1.default.formatMoney(this.betedXiu);
              this.referenceId = res.referenceId;
              this.lblSession.string = "#" + res.referenceId;
              this.remainTime = res.remainTime;
            } catch (e) {
              cc.log("-=-= loi info tx ", e);
            }
            break;

           case TaiXiuMini_Cmd_1.default.Code.UPDATE_TIME:
            try {
              let res = new TaiXiuMini_Cmd_1.default.ReceiveUpdateTime(data);
              if (res.bettingState) {
                this.isBetting = true;
                this.bowl.off(cc.Node.EventType.TOUCH_MOVE);
                this.lblRemainTime.node.active = true;
                5 == res.remainTime && Common_AudioManager_1.default.getInstance().playEffect(this.soundCountDown, .7);
                if (res.remainTime < 6) {
                  this.bgRedTime.parent.color = new cc.Color(255, 0, 0);
                  cc.tween(this.bgRedTime.parent).to(1, {
                    angle: this.bgRedTime.parent.angle + 90 + 750 / (res.remainTime + 1)
                  }).start();
                  this.bgRedTime.runAction(cc.sequence(cc.fadeIn(.5), cc.callFunc(() => {
                    this.bgRedTime.opacity = 150;
                  }), cc.fadeIn(.5), cc.callFunc(() => {
                    this.bgRedTime.opacity = 150;
                  })));
                } else {
                  this.bgRedTime.parent.color = new cc.Color(255, 255, 255);
                  cc.tween(this.bgRedTime.parent).to(1, {
                    angle: this.bgRedTime.parent.angle + 90
                  }).start();
                  this.bgRedTime.opacity = 0;
                }
                this.lblRemainTime.string = res.remainTime < 6 ? "0" + res.remainTime : "" + res.remainTime;
                this.lblRemainTime2.node.active = false;
                this.lblScore.node.parent.active = false;
                "normal" != this.aniResult.animation && this.aniResult.setAnimation(0, "normal", true);
                this.diceResults.forEach(ani => {
                  ani.node.active = false;
                });
              } else {
                this.isBetting = false;
                this.bgRedTime.parent.color = new cc.Color(255, 255, 255);
                this.bgRedTime.opacity = 0;
                this.lblRemainTime.node.active = false;
                this.lblRemainTime2.string = "00:" + (res.remainTime < 10 ? "0" + res.remainTime : "" + res.remainTime);
                this.layoutBet.active = false;
                this.lblBetTai.string = "C\u01b0\u1ee3c";
                this.lblBetXiu.string = "C\u01b0\u1ee3c";
                this.btnBetTai.interactable = true;
                this.btnBetXiu.interactable = true;
                this.lblBetedTai.string = Utils_1.default.formatMoney(this.betedTai);
                this.lblBetedXiu.string = Utils_1.default.formatMoney(this.betedXiu);
                if (res.remainTime < 5 && this.isNan && !this.isOpenBowl) {
                  this.bowl.active = false;
                  this.showResult();
                  this.isOpenBowl = true;
                }
              }
              this.remainTime = res.remainTime;
              Tween_1.default.numberTo(this.lblTotalBetTai, res.potTai, .3);
              Tween_1.default.numberTo(this.lblTotalBetXiu, res.potXiu, .3);
              this.lblUserTai.string = "(" + Utils_1.default.formatNumber(res.numBetTai) + ")";
              this.lblUserXiu.string = "(" + Utils_1.default.formatNumber(res.numBetXiu) + ")";
            } catch (e) {
              cc.log("-=-= loi info tx ", e);
            }
            break;

           case TaiXiuMini_Cmd_1.default.Code.DICES_RESULT:
            try {
              let res = new TaiXiuMini_Cmd_1.default.ReceiveDicesResult(data);
              this.showLog([ "DICES_RESULT", res ]);
              this.lastScore = res.dice1 + res.dice2 + res.dice3;
              this.bgRedTime.parent.color = new cc.Color(255, 255, 255);
              this.bgRedTime.opacity = 0;
              this.lblRemainTime.node.active = false;
              this.showDice(res, true);
              this.scheduleOnce(() => {
                this.lblRemainTime2.node.active = true;
              }, 2);
              this.scheduleOnce(() => {
                this.isNan ? this.scheduleOnce(() => {
                  this.bowl.setPosition(this.bowlStartPos);
                  this.bowl.active = true;
                  this.bowl.on(cc.Node.EventType.TOUCH_MOVE, this.moveBowl, this);
                }, .5) : this.scheduleOnce(() => {
                  this.showResult();
                }, 1.7);
              }, 1);
              this.histories.length >= 100 && this.histories.slice(0, 1);
              this.histories.push({
                session: this.referenceId,
                dices: [ res.dice1, res.dice2, res.dice3 ]
              });
            } catch (e) {
              cc.log("-=-= loi info tx ", e);
            }
            break;

           case TaiXiuMini_Cmd_1.default.Code.RESULT:
            {
              let res = new TaiXiuMini_Cmd_1.default.ReceiveResult(data);
              Configs_1.default.Login.Coin = res.currentMoney;
              this.lastWinCash = res.totalMoney;
              this.refund = res.refund;
              this.bowl.active || this.showWinCash();
              cc.log(res);
              break;
            }

           case TaiXiuMini_Cmd_1.default.Code.NEW_GAME:
            try {
              let res = new TaiXiuMini_Cmd_1.default.ReceiveNewGame(data);
              this.lblTotalBetTai.string = "0";
              this.lblTotalBetXiu.string = "0";
              this.lblBetedTai.string = "0";
              this.lblBetedXiu.string = "0";
              this.lblUserTai.string = "(0)";
              this.lblUserXiu.string = "(0)";
              this.referenceId = res.referenceId;
              this.lblSession.string = "#" + res.referenceId;
              this.betingValue = -1;
              this.betingDoor = BetDoor.None;
              this.betedTai = 0;
              this.betedXiu = 0;
              this.isOpenBowl = false;
              this.lblScore.node.parent.active = false;
              this.lblRemainTime.node.active = false;
              this.lblRemainTime2.node.active = false;
              this.lastWinCash = 0;
              this.refund = 0;
              this.stopWin();
              this.bowl.off(cc.Node.EventType.TOUCH_MOVE);
              Common_AudioManager_1.default.getInstance().playEffect(this.soundNewGame, .7);
            } catch (e) {
              cc.log("-=-= loi info tx ", e);
            }
            break;

           case TaiXiuMini_Cmd_1.default.Code.HISTORIES:
            {
              let res = new TaiXiuMini_Cmd_1.default.ReceiveHistories(data);
              var his = res.data.split(",");
              this.histories = [];
              for (var i = 0; i < his.length; i++) this.histories.push({
                session: this.referenceId - his.length / 3 + parseInt("" + (i + 1) / 3) + (this.isBetting ? 0 : 1),
                dices: [ parseInt(his[i]), parseInt(his[++i]), parseInt(his[++i]) ]
              });
              this.updateBtnHistories();
              this.popupSoiCau.togglePage();
              break;
            }

           case TaiXiuMini_Cmd_1.default.Code.LOG_CHAT:
            try {
              let res = new TaiXiuMini_Cmd_1.default.ReceiveLogChat(data);
              cc.log(res);
              if (res.chatChannel !== Constants_1.ChatChannel.TAIXIU) break;
              if (this.panelChat) {
                var msgs = JSON.parse(res.message);
                for (var i = 0; i < msgs.length; i++) this.panelChat.addMessage(msgs[i]["u"], msgs[i]["m"], msgs[i]["vipId"]);
                this.panelChat.scrollToBottom();
              }
            } catch (e) {
              cc.log(e);
            }
            break;

           case TaiXiuMini_Cmd_1.default.Code.SEND_CHAT:
            {
              let res = new TaiXiuMini_Cmd_1.default.ReceiveSendChat(data);
              cc.log(res);
              if (res.chatChannel !== Constants_1.ChatChannel.TAIXIU) break;
              switch (res.error) {
               case 0:
                this.panelChat.addMessage(res.nickname, res.message, res.vip);
                break;

               default:
                App_1.default.instance.actiontDialog.showMsgWithActions(res.desc, res.suggestionActions);
              }
              break;
            }

           case TaiXiuMini_Cmd_1.default.Code.BET:
            {
              let res = new TaiXiuMini_Cmd_1.default.ReceiveBet(data);
              cc.log(res);
              switch (res.result) {
               case 0:
                switch (this.betingDoor) {
                 case BetDoor.Tai:
                  this.betedTai += this.betingValue;
                  this.lblBetedTai.string = Utils_1.default.formatMoney(this.betedTai);
                  Common_AudioManager_1.default.getInstance().playEffect(this.soundBetted, .7);
                  break;

                 case BetDoor.Xiu:
                  this.betedXiu += this.betingValue;
                  this.lblBetedXiu.string = Utils_1.default.formatMoney(this.betedXiu);
                  Common_AudioManager_1.default.getInstance().playEffect(this.soundBetted, .7);
                }
                Configs_1.default.Login.Coin = res.currentMoney;
                BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN);
                this.betingValue = -1;
                this.showToast("\u0110\u1eb7t c\u01b0\u1ee3c th\xe0nh c\xf4ng.");
                break;

               case 2:
                this.betingValue = -1;
                this.showToast("H\u1ebft th\u1eddi gian c\u01b0\u1ee3c.");
                break;

               case 3:
                this.betingValue = -1;
                App_1.default.instance.actiontDialog.showMsgWithActions(res.desc, res.suggestionActions);
                break;

               case 4:
                this.betingValue = -1;
                this.showToast("S\u1ed1 ti\u1ec1n c\u01b0\u1ee3c kh\xf4ng h\u1ee3p l\u1ec7.");
                break;

               default:
                this.betingValue = -1;
                this.showToast("\u0110\u1eb7t c\u01b0\u1ee3c kh\xf4ng th\xe0nh c\xf4ng.");
              }
              break;
            }

           case TaiXiuMini_Cmd_1.default.Code.TX_TAN_LOC:
            {
              let res = new TaiXiuMini_Cmd_1.default.CmdTXTanLoc(data);
              this.responseTanLoc(res.result, res.currentMoney);
            }
            break;

           case TaiXiuMini_Cmd_1.default.Code.TX_RUT_LOC:
            var res = new TaiXiuMini_Cmd_1.default.CmdTXRutLoc(data);
            this.responseRutLoc(res.prize, res.currentMoney);
            break;

           case TaiXiuMini_Cmd_1.default.Code.UPDATE_QUY_LOC:
            {
              let res = new TaiXiuMini_Cmd_1.default.CmdTXUpdateQuyLoc(data);
              this.responseUpdateRutLoc(res.remainTime);
              this.responseUpdateHuLoc(res.value);
            }
            break;

           case TaiXiuMini_Cmd_1.default.Code.START_NEW_ROUND_RUT_LOC:
            {
              let res = new TaiXiuMini_Cmd_1.default.CmdTXStartRutLoc(data);
              this.responseUpdateRutLoc(res.remainTime);
            }
            break;

           case TaiXiuMini_Cmd_1.default.Code.ENABLE_RUT_LOC:
            this.timeRutLoc = 0;
            cc.Tween.stopAllByTarget(this.timeRutLocNode);
            this.timeRutLocNode.getComponent(cc.Label).string = "";
            this.timeRutLocNode.parent.active = false;
            this.btnRutLoc.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(.15, 1.1, 1.1), cc.scaleTo(.15, 1, 1))));
            break;

           case TaiXiuMini_Cmd_1.default.Code.UPDATE_LUOT_RUT_LOC:
            {
              let res = new TaiXiuMini_Cmd_1.default.CmdTXUpdateSoLuotRutLoc(data);
              this.responseUpdateLuotRutLoc(res.soLuotRut);
            }
          }
        }, this);
        for (let i = 0; i < this.btnBetAmounts.length; i++) {
          let btn = this.btnBetAmounts[i];
          let value = this.listBets[i];
          let strValue = value + "";
          value >= 1e6 ? strValue = value / 1e6 + "M" : value >= 1e3 && (strValue = value / 1e3 + "K");
          btn.getComponentInChildren(cc.Label).string = strValue;
          btn.node.on("click", () => {
            if (this.betingDoor === BetDoor.None) return;
            let lblBet = this.betingDoor === BetDoor.Tai ? this.lblBetTai : this.lblBetXiu;
            let lblBeted = this.betingDoor === BetDoor.Tai ? this.lblBetedTai : this.lblBetedXiu;
            lblBeted.string = this.betingDoor === BetDoor.Tai ? Utils_1.default.formatMoney(this.betedTai) : Utils_1.default.formatMoney(this.betedXiu);
            let number = Utils_1.default.stringMoneyToInt(lblBet.string) + value;
            number > this.maxBetValue && (number = this.maxBetValue);
            lblBet.string = Utils_1.default.formatMoney(number);
            Common_AudioManager_1.default.getInstance().playEffect(this.soundBet, .7);
          });
        }
        this.bowl.off(cc.Node.EventType.TOUCH_MOVE);
        this.btnNan.getComponent(cc.Sprite).spriteFrame = this.isNan ? this.sprFrameBtnNan : this.sprFrameBtnNan2;
      }
      showDice(res, isShowAnim = false) {
        Common_AudioManager_1.default.getInstance().playEffect(this.soundDice, .7);
        for (let i = 1; i <= 3; i++) {
          this.diceResults[i - 1].node.active = true;
          this.diceResults[i - 1].enabled = isShowAnim;
          this.diceResults[i - 1].node.getComponentInChildren(cc.Sprite).node.active = !isShowAnim;
          if (isShowAnim) {
            this.diceResults[i - 1].skeletonData = this.animationResults[res["dice" + i]];
            this.diceResults[i - 1].setAnimation(0, "dice", false);
          } else this.diceResults[i - 1].node.getComponentInChildren(cc.Sprite).spriteFrame = this.sprFrameDice.getSpriteFrame(res["dice" + i]);
          this.diceResults[i - 1].node.setPosition(this.POSITION_DEFAULT[res["dice" + i]]);
          this.diceResults[i - 1].node.angle = this.ROTATION_DEFAULT[res["dice" + i]];
          this.diceResults[i - 1].node.parent.angle = 120 * i;
        }
      }
      moveBowl(event) {
        var pos = this.bowl.position;
        pos.x += event.getDeltaX();
        pos.y += event.getDeltaY();
        if (pos.x > 190) {
          pos.x = 190;
          this.showResult();
        }
        if (pos.x < -190) {
          pos.x = -190;
          this.showResult();
        }
        if (pos.y > 200) {
          pos.y = 200;
          this.showResult();
        }
        if (pos.y < -170) {
          pos.y = -170;
          this.showResult();
        }
        this.bowl.position = pos;
      }
      showChat() {
        this.panelChat = this.nodePanelChat.getComponent(TaiXiuMini_PanelChat_1.default);
        this.scheduleOnce(() => {
          this.panelChat.show(true);
        }, .4);
      }
      actChat() {
        this.panelChat.show(!this.panelChat.node.active);
      }
      actBetTai() {
        if (!this.isBetting) {
          this.showToast("Ch\u01b0a \u0111\u1ebfn th\u1eddi gian \u0111\u1eb7t c\u01b0\u1ee3c.");
          return;
        }
        if (this.betingValue >= 0) {
          this.showToast("B\u1ea1n thao t\xe1c qu\xe1 nhanh.");
          return;
        }
        if (this.betedXiu > 0) {
          this.showToast("B\u1ea1n kh\xf4ng th\u1ec3 \u0111\u1eb7t 2 c\u1eeda.");
          return;
        }
        this.betingDoor = BetDoor.Tai;
        this.btnBetTai.interactable = false;
        this.btnBetXiu.interactable = true;
        this.lblBetTai.string = "C\u01b0\u1ee3c";
        this.lblBetXiu.string = "C\u01b0\u1ee3c";
        this.lblBetedTai.string = Utils_1.default.formatMoney(this.betedTai);
        this.lblBetedXiu.string = Utils_1.default.formatMoney(this.betedXiu);
        this.layoutBet.active = true;
      }
      actBetXiu() {
        if (!this.isBetting) {
          this.showToast("Ch\u01b0a \u0111\u1ebfn th\u1eddi gian \u0111\u1eb7t c\u01b0\u1ee3c.");
          return;
        }
        if (this.betingValue >= 0) {
          this.showToast("B\u1ea1n thao t\xe1c qu\xe1 nhanh.");
          return;
        }
        if (this.betedTai > 0) {
          this.showToast("B\u1ea1n kh\xf4ng th\u1ec3 \u0111\u1eb7t 2 c\u1eeda.");
          return;
        }
        this.betingDoor = BetDoor.Xiu;
        this.btnBetXiu.interactable = false;
        this.btnBetTai.interactable = true;
        this.lblBetTai.string = "C\u01b0\u1ee3c";
        this.lblBetXiu.string = "C\u01b0\u1ee3c";
        this.lblBetedTai.string = Utils_1.default.formatMoney(this.betedTai);
        this.lblBetedXiu.string = Utils_1.default.formatMoney(this.betedXiu);
        this.layoutBet.active = true;
      }
      actAgree() {
        if (this.betingValue >= 0 || !this.canBet) {
          this.showToast("B\u1ea1n thao t\xe1c qu\xe1 nhanh.");
          return;
        }
        if (this.betingDoor === BetDoor.None) return;
        var lblBet = this.betingDoor === BetDoor.Tai ? this.lblBetTai : this.lblBetXiu;
        this.betingValue = Utils_1.default.stringMoneyToInt(lblBet.string);
        this.betingDoor = this.betingDoor;
        MiniGameNetworkClient_1.default.getInstance().send(new TaiXiuMini_Cmd_1.default.SendBet(this.referenceId, this.betingValue, this.betingDoor == BetDoor.Tai ? 1 : 0, this.remainTime));
        lblBet.string = "C\u01b0\u1ee3c";
        this.btnBetTai.interactable = true;
        this.btnBetXiu.interactable = true;
        this.canBet = false;
        this.scheduleOnce(function() {
          this.canBet = true;
        }, 1);
      }
      actCancel() {
        this.lblBetXiu.string = "C\u01b0\u1ee3c";
        this.lblBetTai.string = "C\u01b0\u1ee3c";
        this.btnBetTai.interactable = true;
        this.btnBetXiu.interactable = true;
        this.lblBetedTai.string = Utils_1.default.formatMoney(this.betedTai);
        this.lblBetedXiu.string = Utils_1.default.formatMoney(this.betedXiu);
        this.layoutBet.active = false;
      }
      actBtnGapDoi() {
        if (this.betingDoor === BetDoor.None) return;
        var lblBet = this.betingDoor === BetDoor.Tai ? this.lblBetTai : this.lblBetXiu;
        var number = 2 * Utils_1.default.stringMoneyToInt(lblBet.string);
        number > this.maxBetValue && (number = this.maxBetValue);
        lblBet.string = Utils_1.default.formatMoney(number);
      }
      actBtnDelete() {
        if (this.betingDoor === BetDoor.None) return;
        var lblBet = this.betingDoor === BetDoor.Tai ? this.lblBetTai : this.lblBetXiu;
        var number = "" + Utils_1.default.stringMoneyToInt(lblBet.string);
        number = number.substring(0, number.length - 1);
        number = Utils_1.default.formatMoney(Utils_1.default.stringMoneyToInt(number));
        lblBet.string = number;
      }
      actBtn000() {
        if (this.betingDoor === BetDoor.None) return;
        var lblBet = this.betingDoor === BetDoor.Tai ? this.lblBetTai : this.lblBetXiu;
        var number = 1e3 * Utils_1.default.stringMoneyToInt(lblBet.string);
        number > this.maxBetValue && (number = this.maxBetValue);
        lblBet.string = Utils_1.default.formatMoney(number);
      }
      actNan() {
        this.isNan = !this.isNan;
        this.showToast(this.isNan ? "Ch\u1ee9c n\u0103ng n\u1eb7n \u0111ang b\u1eadt!" : "Ch\u1ee9c n\u0103ng n\u1eb7n \u0111ang t\u1eaft!");
        this.btnNan.getComponent(cc.Sprite).spriteFrame = this.isNan ? this.sprFrameBtnNan : this.sprFrameBtnNan2;
      }
      showResult() {
        this.scheduleOnce(() => {
          this.lblScore.node.parent.active = true;
          this.showWinCash();
        }, 1.5);
        this.bowl.off(cc.Node.EventType.TOUCH_MOVE);
        this.lblScore.string = "" + this.lastScore;
        this.bowl.active = false;
        this.lastScore >= 11 ? this.aniResult.setAnimation(0, "tai-win", true) : this.aniResult.setAnimation(0, "xiu-win", true);
        Common_AudioManager_1.default.getInstance().playEffect(this.soundWin, .7);
        this.updateBtnHistories();
      }
      stopWin() {
        this.aniResult.setAnimation(0, "normal", true);
        this.aniResult.clearTrack(0);
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
      showWinCash() {
        BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN);
        if (this.lastWinCash <= 0) {
          this.refund > 0 && App_1.default.instance.alertDialog.showMsg("Do lu\u1eadt c\xe2n c\u1eeda, b\u1ea1n \u0111\xe3 \u0111\u01b0\u1ee3c ho\xe0n l\u1ea1i " + Utils_1.default.formatNumber(this.refund) + "!");
          this.refund = 0;
          return;
        }
        this.lblWinCash.string = "0";
        this.lblWinCash.node.stopAllActions();
        this.lblWinCash.node.active = true;
        this.lblWinCash.node.scale = 0;
        this.lblWinCash.node.setPosition(cc.v2(-9.341, 0));
        Tween_1.default.numberTo(this.lblWinCash, this.lastWinCash, 1, n => "+" + n);
        this.lastWinCash = 0;
        Common_AudioManager_1.default.getInstance().playEffect(this.soundAddChip, .7);
        this.lblWinCash.node.runAction(cc.sequence(cc.spawn(cc.scaleTo(.3, 1.8).easing(cc.easeQuadraticActionOut()), cc.fadeIn(.3)), cc.scaleTo(.1, 1), cc.delayTime(.6), cc.callFunc(() => {
          Common_AudioManager_1.default.getInstance().playEffect(this.soundHideChip, .7);
        }), cc.delayTime(.5), cc.scaleTo(.17, .8), cc.spawn(cc.scaleTo(.12, 2).easing(cc.easeQuadraticActionOut()), cc.fadeOut(.12).easing(cc.easeQuadraticActionOut())), cc.callFunc(() => {
          this.lblWinCash.node.active = false;
        }), cc.delayTime(1), cc.callFunc(() => {
          this.refund > 0 && App_1.default.instance.alertDialog.showMsg("Do lu\u1eadt c\xe2n c\u1eeda, b\u1ea1n \u0111\xe3 \u0111\u01b0\u1ee3c ho\xe0n l\u1ea1i " + Utils_1.default.formatNumber(this.refund) + "!");
          this.refund = 0;
        })));
      }
      updateBtnHistories() {
        let histories = this.histories.slice();
        histories.length > this.btnHistories.childrenCount && histories.splice(0, histories.length - this.btnHistories.childrenCount);
        let idx = histories.length - 1;
        for (var i = this.btnHistories.childrenCount - 1; i >= 0; i--) {
          if (idx >= 0) {
            let _idx = idx;
            var score = histories[idx]["dices"][0] + histories[idx]["dices"][1] + histories[idx]["dices"][2];
            this.btnHistories.children[i].getComponent(cc.Sprite).spriteFrame = score >= 11 ? this.sprFrameTai : this.sprFrameXiu;
            this.btnHistories.children[i].off("click");
            this.btnHistories.children[i].on("click", (e, b) => {
              this.popupDetailHistory.showDetail(histories[_idx]["session"]);
              cc.log(this.histories[_idx]);
            });
            this.btnHistories.children[i].active = true;
          } else this.btnHistories.children[i].active = false;
          idx--;
        }
      }
      sendChat(message) {
        let _this = this;
        if (!_this.isCanChat) {
          this.showToast("B\u1ea1n thao t\xe1c qu\xe1 nhanh.");
          return;
        }
        _this.isCanChat = false;
        this.scheduleOnce(function() {
          _this.isCanChat = true;
        }, 1);
        var req = new TaiXiuMini_Cmd_1.default.SendChat(unescape(encodeURIComponent(message)));
        MiniGameNetworkClient_1.default.getInstance().send(req);
      }
      sendRutLoc() {
        this.soLanRutLoc > 0 ? MiniGameNetworkClient_1.default.getInstance().send(new TaiXiuMini_Cmd_1.default.CmdSendRutLoc()) : App_1.default.instance.toast.showToast("B\u1ea1n \u0111\xe3 h\u1ebft l\u01b0\u1ee3t r\xfat l\u1ed9c");
      }
      responseUpdateLuotRutLoc(soLuot) {
        this.soLanRutLoc = soLuot;
        this.rutLocConLaiLb.string = "" + soLuot;
      }
      responseTanLoc(result, currentMoney) {
        Configs_1.default.Login.Coin = currentMoney;
        BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN);
        0 == result ? App_1.default.instance.alertDialog.showMsg("T\xe1n l\u1ed9c th\xe0nh c\xf4ng!") : 1 == result ? App_1.default.instance.alertDialog.showMsg("T\xe1n l\u1ed9c kh\xf4ng th\xe0nh c\xf4ng!") : (result = 2) ? App_1.default.instance.alertDialog.showMsg("B\u1ea1n ch\u01b0a c\xf3 \u0111\u1ee7 s\u1ed1 d\u01b0 Lux") : (result = 3) && App_1.default.instance.alertDialog.showMsg("T\xe1n l\u1ed9c ph\u1ea3i l\u1edbn h\u01a1n 1.000 Xu");
      }
      responseRutLoc(prize, currentMoney) {
        Configs_1.default.Login.Coin = currentMoney;
        BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN);
        if (-1 == prize) {
          let time = this.timeRutLoc - Math.floor((new Date().getTime() - this.readTime) / 1e3);
          App_1.default.instance.alertDialog.showMsg("R\xfat l\u1ed9c kh\xf4ng th\xe0nh c\xf4ng! Vui l\xf2ng ch\u1edd " + (time > 0 ? time : "v\xe0i") + " gi\xe2y n\u1eefa.");
        } else 0 == prize ? App_1.default.instance.alertDialog.showMsg("Ch\xfac b\u1ea1n may m\u1eafn l\u1ea7n sau!") : prize > 0 ? App_1.default.instance.alertDialog.showMsg("B\u1ea1n r\xfat l\u1ed9c \u0111\u01b0\u1ee3c " + Utils_1.default.formatNumber(prize) + " Xu.") : -3 == prize ? App_1.default.instance.alertDialog.showMsg("Qu\u1ef9 l\u1ed9c kh\xf4ng \u0111\u1ee7.") : -2 == prize && App_1.default.instance.alertDialog.showMsg("B\u1ea1n \u0111\xe3 h\u1ebft l\u01b0\u1ee3t r\xfat l\u1ed9c.");
      }
      responseUpdateHuLoc(value) {
        this.huLocLb.string = Utils_1.default.formatNumber(value);
      }
      responseUpdateRutLoc(remainTime) {
        this.timeRutLoc = remainTime;
        this.btnRutLoc.stopAllActions();
        this.btnRutLoc.scale = 1;
        this.readTime = new Date().getTime();
        this.updateTimeRutLoc();
      }
      updateTimeRutLoc() {
        cc.tween(this.timeRutLocNode).sequence(cc.delayTime(1), cc.callFunc(() => {
          let time = this.timeRutLoc - Math.floor((new Date().getTime() - this.readTime) / 1e3);
          this.timeRutLocNode.getComponent(cc.Label).string = this.converToTime(time);
          time >= 0 && this.updateTimeRutLoc();
        })).start();
      }
      converToTime(remainTime) {
        var mm = parseInt((remainTime / 60).toString());
        var ss = remainTime % 60;
        return (mm < 10 ? "0" + mm : mm) + ":" + (ss < 10 ? "0" + ss : ss);
      }
      activeHuLoc() {
        this.rutLocConLaiLb.node.parent.active && (this.rutLocConLaiLb.node.parent.active = false);
      }
      showLog(log) {
        cc.sys.isBrowser && cc.log(log);
      }
      playSoundClick() {}
    };
    TaiXiuMiniController.instance = null;
    __decorate([ property(cc.SpriteFrame) ], TaiXiuMiniController.prototype, "sprFrameTai", void 0);
    __decorate([ property(cc.SpriteFrame) ], TaiXiuMiniController.prototype, "sprFrameXiu", void 0);
    __decorate([ property(cc.SpriteFrame) ], TaiXiuMiniController.prototype, "sprFrameBtnNan", void 0);
    __decorate([ property(cc.SpriteFrame) ], TaiXiuMiniController.prototype, "sprFrameBtnNan2", void 0);
    __decorate([ property(cc.Label) ], TaiXiuMiniController.prototype, "lblSession", void 0);
    __decorate([ property(cc.Label) ], TaiXiuMiniController.prototype, "lblRemainTime", void 0);
    __decorate([ property(cc.Label) ], TaiXiuMiniController.prototype, "lblRemainTime2", void 0);
    __decorate([ property(cc.Label) ], TaiXiuMiniController.prototype, "lblScore", void 0);
    __decorate([ property(cc.Label) ], TaiXiuMiniController.prototype, "lblUserTai", void 0);
    __decorate([ property(cc.Label) ], TaiXiuMiniController.prototype, "lblUserXiu", void 0);
    __decorate([ property(cc.Label) ], TaiXiuMiniController.prototype, "lblTotalBetTai", void 0);
    __decorate([ property(cc.Label) ], TaiXiuMiniController.prototype, "lblTotalBetXiu", void 0);
    __decorate([ property(cc.Button) ], TaiXiuMiniController.prototype, "btnBetTai", void 0);
    __decorate([ property(cc.Button) ], TaiXiuMiniController.prototype, "btnBetXiu", void 0);
    __decorate([ property(cc.Label), property(cc.Label) ], TaiXiuMiniController.prototype, "lblBetTai", void 0);
    __decorate([ property(cc.Label) ], TaiXiuMiniController.prototype, "lblBetXiu", void 0);
    __decorate([ property(cc.Label) ], TaiXiuMiniController.prototype, "lblBetedTai", void 0);
    __decorate([ property(cc.Label) ], TaiXiuMiniController.prototype, "lblBetedXiu", void 0);
    __decorate([ property([ sp.SkeletonData ]) ], TaiXiuMiniController.prototype, "animationResults", void 0);
    __decorate([ property(cc.SpriteAtlas) ], TaiXiuMiniController.prototype, "sprFrameDice", void 0);
    __decorate([ property([ sp.Skeleton ]) ], TaiXiuMiniController.prototype, "diceResults", void 0);
    __decorate([ property(cc.Node) ], TaiXiuMiniController.prototype, "bgRedTime", void 0);
    __decorate([ property(cc.Node) ], TaiXiuMiniController.prototype, "bowl", void 0);
    __decorate([ property(sp.Skeleton) ], TaiXiuMiniController.prototype, "aniResult", void 0);
    __decorate([ property(cc.Node) ], TaiXiuMiniController.prototype, "btnHistories", void 0);
    __decorate([ property(cc.Node) ], TaiXiuMiniController.prototype, "nodePanelChat", void 0);
    __decorate([ property(cc.Node) ], TaiXiuMiniController.prototype, "layoutBet", void 0);
    __decorate([ property([ cc.Button ]) ], TaiXiuMiniController.prototype, "btnBetAmounts", void 0);
    __decorate([ property(cc.ScrollView) ], TaiXiuMiniController.prototype, "scrollBetAmount", void 0);
    __decorate([ property(cc.Node) ], TaiXiuMiniController.prototype, "btnNextBetAmount", void 0);
    __decorate([ property(cc.Node) ], TaiXiuMiniController.prototype, "btnPreviousBetAmount", void 0);
    __decorate([ property(cc.Label) ], TaiXiuMiniController.prototype, "lblToast", void 0);
    __decorate([ property(cc.Label) ], TaiXiuMiniController.prototype, "lblWinCash", void 0);
    __decorate([ property(cc.Node) ], TaiXiuMiniController.prototype, "btnNan", void 0);
    __decorate([ property(TaiXiuMini_PopupDetailHistory_1.default) ], TaiXiuMiniController.prototype, "popupDetailHistory", void 0);
    __decorate([ property(TaiXiuMini_PopupSoiCau_1.default) ], TaiXiuMiniController.prototype, "popupSoiCau", void 0);
    __decorate([ property(cc.Label) ], TaiXiuMiniController.prototype, "rutLocConLaiLb", void 0);
    __decorate([ property(cc.Label) ], TaiXiuMiniController.prototype, "huLocLb", void 0);
    __decorate([ property(cc.Node) ], TaiXiuMiniController.prototype, "timeRutLocNode", void 0);
    __decorate([ property(cc.Node) ], TaiXiuMiniController.prototype, "btnRutLoc", void 0);
    __decorate([ property(cc.AudioClip) ], TaiXiuMiniController.prototype, "soundCountDown", void 0);
    __decorate([ property(cc.AudioClip) ], TaiXiuMiniController.prototype, "soundBetted", void 0);
    __decorate([ property(cc.AudioClip) ], TaiXiuMiniController.prototype, "soundBet", void 0);
    __decorate([ property(cc.AudioClip) ], TaiXiuMiniController.prototype, "soundWin", void 0);
    __decorate([ property(cc.AudioClip) ], TaiXiuMiniController.prototype, "soundAddChip", void 0);
    __decorate([ property(cc.AudioClip) ], TaiXiuMiniController.prototype, "soundSubChip", void 0);
    __decorate([ property(cc.AudioClip) ], TaiXiuMiniController.prototype, "soundDice", void 0);
    __decorate([ property(cc.AudioClip) ], TaiXiuMiniController.prototype, "soundNewGame", void 0);
    __decorate([ property(cc.AudioClip) ], TaiXiuMiniController.prototype, "soundHideChip", void 0);
    TaiXiuMiniController = TaiXiuMiniController_1 = __decorate([ ccclass ], TaiXiuMiniController);
    exports.default = TaiXiuMiniController;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/App": void 0,
    "../../Main/Game/src/common/BroadcastReceiver": void 0,
    "../../Main/Game/src/common/Common.AudioManager": void 0,
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/common/Constants": void 0,
    "../../Main/Game/src/common/Tween": void 0,
    "../../Main/Game/src/common/Utils": void 0,
    "../../Main/Game/src/networks/MiniGameNetworkClient": void 0,
    "../../Main/Game/src/networks/Network.InPacket": void 0,
    "../../Main/Lobby/src/MiniGame": void 0,
    "./TaiXiuMini.Cmd": "TaiXiuMini.Cmd",
    "./TaiXiuMini.PanelChat": "TaiXiuMini.PanelChat",
    "./TaiXiuMini.PopupDetailHistory": "TaiXiuMini.PopupDetailHistory",
    "./TaiXiuMini.PopupSoiCau": "TaiXiuMini.PopupSoiCau"
  } ],
  "TaiXiuMini.TaiXiuMiniTanLoc": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1b1459LYMFOeK+ynkU4aqpM", "TaiXiuMini.TaiXiuMiniTanLoc");
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
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    const Dialog_1 = require("../../Main/Game/src/common/Dialog");
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const MiniGameNetworkClient_1 = require("../../Main/Game/src/networks/MiniGameNetworkClient");
    const TaiXiuMini_Cmd_1 = require("./TaiXiuMini.Cmd");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let TaiXiuMiniTanLoc = class TaiXiuMiniTanLoc extends Dialog_1.default {
      constructor() {
        super(...arguments);
        this.moneyLb = null;
        this.money = 0;
      }
      show() {
        super.show();
        this.money = 0;
        this.moneyLb.string = "0";
        this.node.active = true;
      }
      onClick(event, eventData) {
        this.money += Number(eventData);
        this.moneyLb.string = Utils_1.default.formatNumber(this.money);
      }
      tanLocClick() {
        if (Configs_1.default.Login.Coin < this.money) {
          App_1.default.instance.alertDialog.showMsg("S\u1ed1 ti\u1ec1n kh\xf4ng \u0111\u1ee7");
          this.clearMoney();
          return;
        }
        if (this.money < 1e3) App_1.default.instance.alertDialog.showMsg("T\xe1n l\u1ed9c ph\u1ea3i l\u1edbn h\u01a1n 1.000 Xu"); else {
          MiniGameNetworkClient_1.default.getInstance().send(new TaiXiuMini_Cmd_1.default.CmdSendTanLoc(this.money));
          this.clearMoney();
        }
      }
      clearMoney() {
        this.money = 0;
        this.moneyLb.string = "0";
      }
    };
    __decorate([ property(cc.Label) ], TaiXiuMiniTanLoc.prototype, "moneyLb", void 0);
    TaiXiuMiniTanLoc = __decorate([ ccclass ], TaiXiuMiniTanLoc);
    exports.default = TaiXiuMiniTanLoc;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/App": void 0,
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/common/Dialog": void 0,
    "../../Main/Game/src/common/Utils": void 0,
    "../../Main/Game/src/networks/MiniGameNetworkClient": void 0,
    "./TaiXiuMini.Cmd": "TaiXiuMini.Cmd"
  } ]
}, {}, [ "TaiXiuMini.Cmd", "TaiXiuMini.PanelChat", "TaiXiuMini.PopupDetailHistory", "TaiXiuMini.PopupHistory", "TaiXiuMini.PopupHonors", "TaiXiuMini.PopupSoiCau", "TaiXiuMini.PopupThanhDu", "TaiXiuMini.TaiXiuMiniController", "TaiXiuMini.TaiXiuMiniTanLoc" ]);