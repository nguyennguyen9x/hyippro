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
  "TaiXiuMD5.Cmd": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "765e0oUfJ1M3I29TNboXBub", "TaiXiuMD5.Cmd");
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
          this.putShort(Configs_1.default.GameId.TaiXiuMD5);
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
          this.putShort(Configs_1.default.GameId.TaiXiuMD5);
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
          this.putString(Constants_1.ChatChannel.TAI_XIU_MD5);
          this.updateSize();
        }
      }
      cmd.SendScribeChat = SendScribeChat;
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
      class SendUnScribeChat extends Network_OutPacket_1.default {
        constructor() {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.UNSCRIBE_CHAT);
          this.packHeader();
          this.putString(Constants_1.ChatChannel.TAI_XIU_MD5);
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
          this.putString(Constants_1.ChatChannel.TAI_XIU_MD5);
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
          this.dataMD5 = "";
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
          this.dataMD5 = this.getString();
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
          this.dataMD5 = "";
          this.result = this.getShort();
          this.dice1 = this.getShort();
          this.dice2 = this.getShort();
          this.dice3 = this.getShort();
          this.dataMD5 = this.getString();
        }
      }
      cmd.ReceiveDicesResult = ReceiveDicesResult;
      class ReceiveResult extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.moneyType = 1;
          this.totalMoney = 0;
          this.currentMoney = 0;
          this.dataMD5 = "";
          this.moneyType = this.getShort();
          this.totalMoney = this.getLong();
          this.currentMoney = this.getLong();
          this.dataMD5 = this.getString();
        }
      }
      cmd.ReceiveResult = ReceiveResult;
      class ReceiveNewGame extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.referenceId = 0;
          this.remainTimeRutLoc = 0;
          this.dataMD5 = "";
          this.referenceId = this.getLong();
          this.remainTimeRutLoc = this.getShort();
          this.dataMD5 = this.getString();
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
          this.value = this.getLong();
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
  "TaiXiuMD5.PanelChat": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7f1c8BYZgBPD6GuF6Lzs5xH", "TaiXiuMD5.PanelChat");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const TaiXiuMD5_Cmd_1 = require("./TaiXiuMD5.Cmd");
    const TaiXiuMD5_TaiXiuMD5Controller_1 = require("./TaiXiuMD5.TaiXiuMD5Controller");
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const BroadcastReceiver_1 = require("../../Main/Game/src/common/BroadcastReceiver");
    const MiniGameNetworkClient_1 = require("../../Main/Game/src/networks/MiniGameNetworkClient");
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
            MiniGameNetworkClient_1.default.getInstance().send(new TaiXiuMD5_Cmd_1.default.SendScribeChat());
          } else MiniGameNetworkClient_1.default.getInstance().send(new TaiXiuMD5_Cmd_1.default.SendUnScribeChat());
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
          TaiXiuMD5_TaiXiuMD5Controller_1.default.instance.sendChat(msg);
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
    "./TaiXiuMD5.Cmd": "TaiXiuMD5.Cmd",
    "./TaiXiuMD5.TaiXiuMD5Controller": "TaiXiuMD5.TaiXiuMD5Controller"
  } ],
  "TaiXiuMD5.PopupDetailHistory": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e8223nqpV5KSo/c03tuWYfe", "TaiXiuMD5.PopupDetailHistory");
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
    const TaiXiuMD5_TaiXiuMD5Controller_1 = require("./TaiXiuMD5.TaiXiuMD5Controller");
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
        this.lblPage.string = "1/1";
        this.lblTotalBetTai.string = Utils_1.default.formatMoney(0);
        this.lblTotalBetXiu.string = Utils_1.default.formatMoney(0);
        this.lblTotalRefundTai.string = Utils_1.default.formatMoney(0);
        this.lblTotalRefundXiu.string = Utils_1.default.formatMoney(0);
        Http_1.default.get("https://" + Configs_1.default.App.HOST_TAI_XIU_MD5.host + "/api/txmd5/detailTransaction", {
          referenceId: this.session,
          moneyType: Configs_1.default.App.MONEY_TYPE
        }, (err, res) => {
          if (null != err) return;
          cc.log(res);
          this.historiesTai = [];
          this.historiesXiu = [];
          if (res["transactions"] && res["transactions"].length > 0) {
            for (var i = 0; i < res["transactions"].length; i++) {
              var itemData = res["transactions"][i];
              1 === itemData["betSide"] ? this.historiesTai.push(itemData) : this.historiesXiu.push(itemData);
            }
            for (var i = 0; i < this.items.length; i++) this.items[i].active = false;
            this.page = 1;
            this.totalPage = this.historiesXiu.length > this.historiesTai.length ? this.historiesXiu.length : this.historiesTai.length;
            this.totalPage = Math.max(1, Math.ceil(this.totalPage / this.items.length));
            this.lblPage.string = this.page + "/" + this.totalPage;
            let dataPhien = this.historiesTai[0] || this.historiesXiu[0];
            if (!dataPhien) return cc.log("data rong");
            this.lblSession.string = "Phi\xean: #" + dataPhien["resultTaiXiu"]["referenceId"];
            this.lblTime.string = dataPhien["timestamp"].replace(", ", " ").replace(", ", " ");
            this.lblTotalBetTai.string = Utils_1.default.formatMoney(dataPhien["resultTaiXiu"]["totalTai"]) + " : \u0110\u1eb6T";
            this.lblTotalBetXiu.string = "\u0110\u1eb6T : " + Utils_1.default.formatMoney(dataPhien["resultTaiXiu"]["totalXiu"]);
            this.lblTotalRefundTai.string = Utils_1.default.formatMoney(dataPhien["resultTaiXiu"]["totalRefundTai"]) + " : Ho\xe0n";
            this.lblTotalRefundXiu.string = "Ho\xe0n : " + Utils_1.default.formatMoney(dataPhien["resultTaiXiu"]["totalRefundXiu"]);
            this.sprDice1.spriteFrame = this.sfDices[dataPhien["resultTaiXiu"]["dice1"]];
            this.sprDice1.node.active = true;
            this.sprDice2.spriteFrame = this.sfDices[dataPhien["resultTaiXiu"]["dice2"]];
            this.sprDice2.node.active = true;
            this.sprDice3.spriteFrame = this.sfDices[dataPhien["resultTaiXiu"]["dice3"]];
            this.sprDice3.node.active = true;
            this.sprResult.spriteFrame = 1 == dataPhien["resultTaiXiu"]["result"] ? this.sfTai : this.sfXiu;
            this.sprResult.node.active = true;
            this.loadDataPage();
          } else cc.log("rong transactions ", !res["transactions"], res["transactions"].length);
        });
      }
      loadDataPage() {
        for (var i = 0; i < this.items.length; i++) {
          var idx = (this.page - 1) * this.items.length + i;
          var item = this.items[i];
          item.active = true;
          if (idx < this.historiesTai.length) {
            var itemData = this.historiesTai[idx];
            item.getChildByName("Time").getComponent(cc.Label).string = itemData["timestamp"].replace(", ", " ").replace(", ", " ");
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
            item.getChildByName("Time2").getComponent(cc.Label).string = itemData["timestamp"].replace(", ", " ").replace(", ", " ");
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
        if (this.session > TaiXiuMD5_TaiXiuMD5Controller_1.default.instance.histories[TaiXiuMD5_TaiXiuMD5Controller_1.default.instance.histories.length - 1].session) {
          this.session = TaiXiuMD5_TaiXiuMD5Controller_1.default.instance.histories[TaiXiuMD5_TaiXiuMD5Controller_1.default.instance.histories.length - 1].session;
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
    "./TaiXiuMD5.TaiXiuMD5Controller": "TaiXiuMD5.TaiXiuMD5Controller"
  } ],
  "TaiXiuMD5.PopupHistory": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b922c1BBsVOEIc/sNwqHumw", "TaiXiuMD5.PopupHistory");
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
          Http_1.default.get("https://" + Configs_1.default.App.HOST_TAI_XIU_MD5.host + "/api/txmd5/userHistory", {
            moneyType: Configs_1.default.App.MONEY_TYPE,
            nickname: Configs_1.default.Login.Nickname,
            sort: "id,desc",
            page: this.page - 1,
            size: 10,
            txType: 1
          }, (err, res) => {
            App_1.default.instance.showLoading(false);
            if (null != err) return;
            if (!res["transactions"] || 0 == res["transactions"].length) return;
            if (0 == this.items.length) {
              for (var i = 0; i < 10; i++) {
                let item = cc.instantiate(this.itemTemplate);
                item.parent = this.itemTemplate.parent;
                this.items.push(item);
              }
              this.itemTemplate.destroy();
              this.itemTemplate = null;
            }
            this.maxPage = res["totalPages"] || this.page;
            this.lblPage.string = this.page + "/" + this.maxPage;
            for (let i = 0; i < this.items.length; i++) {
              let item = this.items[i];
              if (i < res["transactions"].length) {
                let itemData = res["transactions"][i];
                let result = itemData["resultTaiXiu"];
                item.getChildByName("bg").opacity = i % 2 == 0 ? 10 : 0;
                item.getChildByName("lblTime").getComponent(cc.Label).string = "#" + itemData["referenceId"] + "\n" + itemData["timestamp"].replace(", ", " ").replace(", ", "\n");
                item.getChildByName("lblBetDoor").getComponent(cc.Label).string = 1 == itemData["betSide"] ? "T\xc0I" : "X\u1ec8U";
                let resultDice = result["dice1"] + result["dice2"] + result["dice3"];
                item.getChildByName("lblResult").getComponent(cc.Label).string = result["dice1"] + "-" + result["dice2"] + "-" + result["dice3"] + "\n" + (resultDice >= 11 ? "T\xc0I" : "X\u1ec8U");
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
  "TaiXiuMD5.PopupHonors": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8e22dV8hv5BnZCaxFlSL6p1", "TaiXiuMD5.PopupHonors");
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
          Http_1.default.get("https://" + Configs_1.default.App.HOST_TAI_XIU_MD5.host + "/api/txmd5/topWin", {
            moneyType: Configs_1.default.App.MONEY_TYPE,
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
                    item.active = false;
                    let itemData = res["topTX"][i];
                    let dataVip = res["listUserVipRank"] && res["listUserVipRank"].find(data => data.nickname == itemData["username"]);
                    item.getChildByName("bg").opacity = i % 2 == 0 ? 10 : 0;
                    item.getChildByName("icon_top").getComponent(cc.Sprite).spriteFrame = this.sprTop[i];
                    item.getChildByName("name").getChildByName("lblAccount").getComponent(cc.Label).string = itemData["username"].length > 11 ? itemData["username"].substr(0, 10) + "..." : itemData["username"];
                    item.getChildByName("name").getChildByName("lblAccount").color = dataVip ? cc.Color.BLACK.fromHEX(Utils_1.default.getColorVip(dataVip.rank)) : cc.Color.BLACK.fromHEX(Utils_1.default.getColorVip("VIP_0"));
                    item.getChildByName("name").getChildByName("lblAccount").getComponent(cc.LabelOutline).color = dataVip ? cc.Color.BLACK.fromHEX(Utils_1.default.getColorVip(dataVip.rank)) : cc.Color.BLACK.fromHEX(Utils_1.default.getColorVip("VIP_0"));
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
              ErrorLogger_1.ErrorLogger.sendLogError("Http response", "Tai xiu md5 honor", JSON.stringify(res) + "\n" + JSON.stringify(error.stack));
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
  "TaiXiuMD5.PopupSoiCau": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a0114m4wFJD044+VcLlVhMq", "TaiXiuMD5.PopupSoiCau");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const TaiXiuMD5_TaiXiuMD5Controller_1 = require("./TaiXiuMD5.TaiXiuMD5Controller");
    const Dialog_1 = require("../../Main/Game/src/common/Dialog");
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const TaiXiuMD5_Cmd_1 = require("./TaiXiuMD5.Cmd");
    const TXMD5NetworkClient_1 = require("../../Main/Game/src/networks/TXMD5NetworkClient");
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
          TXMD5NetworkClient_1.default.getInstance().send(new TaiXiuMD5_Cmd_1.default.SendHistories());
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
          var data = TaiXiuMD5_TaiXiuMD5Controller_1.default.instance.histories.slice();
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
          var count = TaiXiuMD5_TaiXiuMD5Controller_1.default.instance.histories.length;
          var countTai = 0;
          var countXiu = 0;
          if (count > 1) {
            var dices = TaiXiuMD5_TaiXiuMD5Controller_1.default.instance.histories[0].dices;
            var score = dices[0] + dices[1] + dices[2];
            var isTai = score >= 11;
            var maxItem = 5;
            for (var i = 0; i < count; i++) {
              dices = TaiXiuMD5_TaiXiuMD5Controller_1.default.instance.histories[i].dices;
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
          var data = TaiXiuMD5_TaiXiuMD5Controller_1.default.instance.histories.slice();
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
    "../../Main/Game/src/networks/TXMD5NetworkClient": void 0,
    "./TaiXiuMD5.Cmd": "TaiXiuMD5.Cmd",
    "./TaiXiuMD5.TaiXiuMD5Controller": "TaiXiuMD5.TaiXiuMD5Controller"
  } ],
  "TaiXiuMD5.RichTextGuiide": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "70d71xoPsFMPqxidgUO1G2u", "TaiXiuMD5.RichTextGuiide");
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
    let TaiXiuMD5RichTextGuide = class TaiXiuMD5RichTextGuide extends cc.Component {
      showUrl(evt, url) {
        cc.sys.openURL(url);
      }
    };
    TaiXiuMD5RichTextGuide = __decorate([ ccclass ], TaiXiuMD5RichTextGuide);
    exports.default = TaiXiuMD5RichTextGuide;
    cc._RF.pop();
  }, {} ],
  "TaiXiuMD5.TaiXiuMD5Controller": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0dae2btObRG4JUFeZkL4POq", "TaiXiuMD5.TaiXiuMD5Controller");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var TaiXiuMD5Controller_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const TaiXiuMD5_Cmd_1 = require("./TaiXiuMD5.Cmd");
    const TaiXiuMD5_PanelChat_1 = require("./TaiXiuMD5.PanelChat");
    const TXMD5NetworkClient_1 = require("../../Main/Game/src/networks/TXMD5NetworkClient");
    const Network_InPacket_1 = require("../../Main/Game/src/networks/Network.InPacket");
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const Tween_1 = require("../../Main/Game/src/common/Tween");
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    const BroadcastReceiver_1 = require("../../Main/Game/src/common/BroadcastReceiver");
    const App_1 = require("../../Main/Game/src/common/App");
    const TaiXiuMD5_PopupDetailHistory_1 = require("./TaiXiuMD5.PopupDetailHistory");
    const MiniGame_1 = require("../../Main/Lobby/src/MiniGame");
    const TaiXiuMD5_PopupSoiCau_1 = require("./TaiXiuMD5.PopupSoiCau");
    const MiniGameNetworkClient_1 = require("../../Main/Game/src/networks/MiniGameNetworkClient");
    const Common_AudioManager_1 = require("../../Main/Game/src/common/Common.AudioManager");
    const Constants_1 = require("../../Main/Game/src/common/Constants");
    const ErrorLogger_1 = require("../../Main/Game/src/common/ErrorLogger");
    const {ccclass: ccclass, property: property} = cc._decorator;
    var BetDoor;
    (function(BetDoor) {
      BetDoor[BetDoor["None"] = 0] = "None";
      BetDoor[BetDoor["Tai"] = 1] = "Tai";
      BetDoor[BetDoor["Xiu"] = 2] = "Xiu";
    })(BetDoor || (BetDoor = {}));
    let TaiXiuMD5Controller = TaiXiuMD5Controller_1 = class TaiXiuMD5Controller extends MiniGame_1.default {
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
        this.bowl = null;
        this.bg = null;
        this.tai = null;
        this.xiu = null;
        this.btnHistories = null;
        this.panelChat = null;
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
        this.listSprMD5 = new Array();
        this.btnMD5 = null;
        this.lbMD5 = null;
        this.lbResultMD5 = null;
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
        this.textMD5 = "";
        this.remainTime = 0;
        this.canBet = true;
        this.betedTai = 0;
        this.betedXiu = 0;
        this.referenceId = 0;
        this.betingValue = -1;
        this.betingDoor = BetDoor.None;
        this.lastWinCash = 0;
        this.lastScore = 0;
        this.isNan = false;
        this.histories = [];
        this.isCanChat = true;
        this.maxBetValue = 999999999;
        this.ROTATION_DEFAULT = [ 0, 0, 91.235, -47.765, 16.937, -115.606, -108.145 ];
        this.POSITION_DEFAULT = [ cc.v2(0, 0), cc.v2(-11.059, -4.414), cc.v2(13.83, -39.772), cc.v2(17.075, -18.779), cc.v2(-2.221, -13.522), cc.v2(2.105, 6.193), cc.v2(7.863, -1.323) ];
        this.listBets = [ 1e3, 5e3, 1e4, 5e4, 1e5, 5e5, 1e6, 2e6, 5e6, 1e7 ];
        this.bowlStartPos = cc.v2(0, -6);
      }
      subscribe() {
        TXMD5NetworkClient_1.default.getInstance().send(new TaiXiuMD5_Cmd_1.default.SendScribe());
      }
      onSubscribeSuccess() {
        this.layoutBet.active = false;
        this.lblToast.node.parent.active = false;
        this.lblWinCash.node.active = false;
        this.layoutBet.active = false;
        this.bowl.active = true;
        this.diceResults.forEach(ani => {
          ani.node.active = false;
        });
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
        TaiXiuMD5Controller_1.instance = this;
        this.scrollBetAmount.node.on("scroll-ended", () => {
          let maxOffset = this.scrollBetAmount.getMaxScrollOffset().x;
          let offset = this.scrollBetAmount.getScrollOffset().x;
          this.btnNextBetAmount.active = maxOffset + offset > 50;
          this.btnPreviousBetAmount.active = offset < -50;
        });
      }
      start() {
        super.start();
        this.setTextMD5(false, "", []);
        BroadcastReceiver_1.default.register(BroadcastReceiver_1.default.USER_LOGOUT, () => {
          if (!this.node.active) return;
          this.dismiss();
        }, this);
        BroadcastReceiver_1.default.register(BroadcastReceiver_1.default.USER_DISCONNECTED, () => {
          if (!this.node.active) return;
          this.dismiss();
        }, this);
        TXMD5NetworkClient_1.default.getInstance().addOnClose(() => {
          if (!this.node.active) return;
          this.dismiss();
        }, this);
        TXMD5NetworkClient_1.default.getInstance().addListener(data => {
          if (!this.node.active) return;
          let inpacket = new Network_InPacket_1.default(data);
          switch (inpacket.getCmdId()) {
           case TaiXiuMD5_Cmd_1.default.Code.GAME_INFO:
            try {
              let res = new TaiXiuMD5_Cmd_1.default.ReceiveGameInfo(data);
              cc.log(res);
              this.setTextMD5(!res.bettingState, res.dataMD5, [ res.dice1, res.dice2, res.dice3 ]);
              this.stopWin();
              this.effDice();
              this.onSubscribeSuccess();
              this.bowl.active = true;
              5 == res.remainTime && Common_AudioManager_1.default.getInstance().playEffect(this.soundCountDown, .7);
              if (res.bettingState) {
                this.isBetting = true;
                this.bowl.off(cc.Node.EventType.TOUCH_MOVE);
                this.tai.setAnimation(0, "normal", false);
                this.xiu.setAnimation(0, "normal", false);
                this.bg.setAnimation(0, "normal", false);
                this.lblRemainTime.node.active = true;
                this.lblRemainTime.string = this.bowl.active ? res.remainTime < 10 ? "0" + res.remainTime : "" + res.remainTime : "";
                this.lblRemainTime2.node.parent.active = false;
                this.lblScore.node.parent.active = false;
              } else {
                this.lastScore = res.dice1 + res.dice2 + res.dice3;
                this.bowl.active = false;
                this.showDice(res, false);
                this.isBetting = false;
                this.lblRemainTime.node.active = false;
                this.lblRemainTime2.node.parent.active = true;
                this.lblRemainTime2.string = "00:" + (res.remainTime < 10 ? "0" + res.remainTime : "" + res.remainTime);
                this.scheduleOnce(() => {
                  this.showResult();
                }, 1);
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

           case TaiXiuMD5_Cmd_1.default.Code.UPDATE_TIME:
            try {
              let res = new TaiXiuMD5_Cmd_1.default.ReceiveUpdateTime(data);
              if (res.bettingState) {
                this.isBetting = true;
                this.bowl.off(cc.Node.EventType.TOUCH_MOVE);
                this.lblRemainTime.node.active = true;
                this.lblRemainTime.string = this.bowl.active ? res.remainTime < 10 ? "0" + res.remainTime : "" + res.remainTime : "";
                this.lblRemainTime2.node.parent.active = false;
                this.lblScore.node.parent.active = false;
                this.tai.setAnimation(0, "normal", false);
                this.xiu.setAnimation(0, "normal", false);
                this.bg.setAnimation(0, "normal", false);
              } else {
                this.isBetting = false;
                this.lblRemainTime.node.active = false;
                this.lblRemainTime2.node.parent.active = true;
                this.lblRemainTime2.string = "00:" + (res.remainTime < 10 ? "0" + res.remainTime : "" + res.remainTime);
                this.layoutBet.active = false;
                this.lblBetTai.string = "C\u01b0\u1ee3c";
                this.lblBetXiu.string = "C\u01b0\u1ee3c";
                this.btnBetTai.interactable = true;
                this.btnBetXiu.interactable = true;
                this.lblBetedTai.string = Utils_1.default.formatMoney(this.betedTai);
                this.lblBetedXiu.string = Utils_1.default.formatMoney(this.betedXiu);
                5 == res.remainTime && Common_AudioManager_1.default.getInstance().playEffect(this.soundCountDown, .7);
                res.remainTime < 5 && this.bowl.active && this.showResult();
              }
              Tween_1.default.numberTo(this.lblTotalBetTai, res.potTai, .3);
              Tween_1.default.numberTo(this.lblTotalBetXiu, res.potXiu, .3);
              this.lblUserTai.string = "(" + Utils_1.default.formatNumber(res.numBetTai) + ")";
              this.lblUserXiu.string = "(" + Utils_1.default.formatNumber(res.numBetXiu) + ")";
            } catch (e) {
              cc.log("-=-= loi info tx ", e);
            }
            break;

           case TaiXiuMD5_Cmd_1.default.Code.DICES_RESULT:
            try {
              let res = new TaiXiuMD5_Cmd_1.default.ReceiveDicesResult(data);
              this.lastScore = res.dice1 + res.dice2 + res.dice3;
              this.lblRemainTime.node.active = false;
              this.showDice(res, false);
              this.scheduleOnce(() => {
                this.isNan ? this.bowl.on(cc.Node.EventType.TOUCH_MOVE, this.moveBowl, this) : this.showResult();
              }, .5);
              this.histories.length >= 100 && this.histories.slice(0, 1);
              this.histories.push({
                session: this.referenceId,
                dices: [ res.dice1, res.dice2, res.dice3 ]
              });
              cc.log(res);
              this.setTextMD5(true, res.dataMD5, [ res.dice1, res.dice2, res.dice3 ]);
            } catch (e) {
              cc.log("-=-= loi info tx ", e);
            }
            break;

           case TaiXiuMD5_Cmd_1.default.Code.RESULT:
            {
              let res = new TaiXiuMD5_Cmd_1.default.ReceiveResult(data);
              cc.log(res);
              Configs_1.default.Login.Coin = res.currentMoney;
              this.lastWinCash = res.totalMoney;
              this.bowl.active || res.totalMoney > 0 && this.showWinCash();
              break;
            }

           case TaiXiuMD5_Cmd_1.default.Code.NEW_GAME:
            try {
              let res = new TaiXiuMD5_Cmd_1.default.ReceiveNewGame(data);
              cc.log(res);
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
              this.lastWinCash = 0;
              this.stopWin();
              this.bowl.active = false;
              Common_AudioManager_1.default.getInstance().playEffect(this.soundDice, .7);
              this.effDice();
              this.setTextMD5(false, res.dataMD5, []);
              this.bowl.off(cc.Node.EventType.TOUCH_MOVE);
            } catch (e) {
              cc.log("-=-= loi info tx ", e);
            }
            break;

           case TaiXiuMD5_Cmd_1.default.Code.HISTORIES:
            {
              let res = new TaiXiuMD5_Cmd_1.default.ReceiveHistories(data);
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

           case TaiXiuMD5_Cmd_1.default.Code.BET:
            {
              let res = new TaiXiuMD5_Cmd_1.default.ReceiveBet(data);
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
          }
        }, this);
        MiniGameNetworkClient_1.default.getInstance().addListener(data => {
          var _a;
          if (!this.node.active) return;
          let inpacket = new Network_InPacket_1.default(data);
          switch (inpacket.getCmdId()) {
           case TaiXiuMD5_Cmd_1.default.Code.LOG_CHAT:
            try {
              let res = new TaiXiuMD5_Cmd_1.default.ReceiveLogChat(data);
              cc.log(res);
              if (res.chatChannel !== Constants_1.ChatChannel.TAI_XIU_MD5) break;
              var msgs = JSON.parse(res.message);
              for (var i = 0; i < msgs.length; i++) this.panelChat.addMessage(msgs[i]["u"], msgs[i]["m"], msgs[i]["vipId"]);
            } catch (e) {
              cc.log(e);
            }
            null === (_a = this.panelChat) || void 0 === _a ? void 0 : _a.scrollToBottom();
            break;

           case TaiXiuMD5_Cmd_1.default.Code.SEND_CHAT:
            {
              let res = new TaiXiuMD5_Cmd_1.default.ReceiveSendChat(data);
              cc.log(res);
              if (res.chatChannel !== Constants_1.ChatChannel.TAI_XIU_MD5) break;
              switch (res.error) {
               case 0:
                this.panelChat.addMessage(res.nickname, res.message, res.vip);
                break;

               default:
                App_1.default.instance.actiontDialog.showMsgWithActions(res.desc, res.suggestionActions);
              }
              break;
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
            Common_AudioManager_1.default.getInstance().playEffect(this.soundBet, .7);
            lblBet.string = Utils_1.default.formatMoney(number);
          });
        }
        this.showChat();
        this.bowl.off(cc.Node.EventType.TOUCH_MOVE);
        this.btnNan.getComponent(cc.Sprite).spriteFrame = this.isNan ? this.sprFrameBtnNan : this.sprFrameBtnNan2;
      }
      moveBowl(event) {
        if (this.isBetting) return;
        var pos = this.bowl.position;
        pos.x += event.getDeltaX();
        pos.y += event.getDeltaY();
        if (pos.x > 245) {
          pos.x = 245;
          this.showResult();
        }
        if (pos.x < -245) {
          pos.x = -245;
          this.showResult();
        }
        if (pos.y > 245) {
          pos.y = 245;
          this.showResult();
        }
        if (pos.y < -240) {
          pos.y = -240;
          this.showResult();
        }
        this.bowl.position = pos;
      }
      setTextMD5(isKQMD5 = true, textMD5, result) {
        this.btnMD5.spriteFrame = this.listSprMD5[isKQMD5 ? 1 : 0];
        this.textMD5 = textMD5;
        if (!isKQMD5) {
          this.lbMD5.string = textMD5;
          this.lbResultMD5.string = "";
          return;
        }
        this.lbMD5.string = "";
        if ("" == textMD5) {
          this.lbResultMD5.string = "";
          return;
        }
        let score = 0;
        for (let dice1 = 0; dice1 < result.length; dice1++) {
          const value1 = result[dice1];
          for (let dice2 = 0; dice2 < result.length; dice2++) {
            if (dice1 == dice2) continue;
            const value2 = result[dice2];
            for (let dice3 = 0; dice3 < result.length; dice3++) {
              if (dice1 == dice3 || dice2 == dice3) continue;
              const value3 = result[dice3];
              score = value1 + value2 + value3;
              let index = textMD5.indexOf("" + value1 + value2 + value3);
              if (index > -1) {
                this.lbResultMD5.string = textMD5.slice(0, index) + "<color=#FFF500 ><size=24>" + textMD5.slice(index, index + 3) + "</color>" + textMD5.slice(index + 3, textMD5.length);
                cc.tween(this.lbResultMD5.node).to(.2, {
                  anchorX: index > textMD5.length / 2 ? 1 : 0,
                  x: index > textMD5.length / 2 ? 200 : -200
                }).start();
                return cc.log("oki (result = [" + result + "] - textMD5 '" + textMD5 + "')");
              }
            }
          }
        }
        "" != textMD5 && score > 0 && ErrorLogger_1.ErrorLogger.sendLogError("Game config error", "Tai Xiu MD5", "result without md5 (result = [" + result + "] - textMD5 '" + textMD5 + "')");
        return cc.log("result without md5 (result = [" + result + "] - textMD5 '" + textMD5 + "')");
      }
      effDice() {
        this.lblRemainTime.node.active = false;
        this.lblRemainTime2.node.parent.active = false;
        this.lblScore.node.parent.active = false;
        this.showDice({
          dice1: 1,
          dice2: 1,
          dice3: 1
        }, true);
        cc.Tween.stopAllByTarget(this.bowl);
        cc.tween(this.bowl).delay(1.5).call(() => {
          this.bowl.setPosition(this.bowlStartPos);
          this.bowl.active = true;
        }).start();
      }
      showChat() {
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
        TXMD5NetworkClient_1.default.getInstance().send(new TaiXiuMD5_Cmd_1.default.SendBet(this.referenceId, this.betingValue, this.betingDoor == BetDoor.Tai ? 1 : 0, this.remainTime));
        lblBet.string = "C\u01b0\u1ee3c";
        this.btnBetTai.interactable = true;
        this.btnBetXiu.interactable = true;
        this.canBet = false;
        this.scheduleOnce(function() {
          this.canBet = true;
        }, 1);
      }
      copyMD5() {
        if (!this.textMD5) return;
        Utils_1.default.copyToClipboard(this.textMD5);
        this.showToast("" == this.lbMD5.string ? "Copy K\u1ebft Qu\u1ea3 MD5 th\xe0nh c\xf4ng" : "Copy M\xc3 MD5 th\xe0nh c\xf4ng");
      }
      actCancel() {
        this.lblBetXiu.string = "C\u01b0\u1ee3c";
        this.lblBetTai.string = "C\u01b0\u1ee3c";
        this.btnBetTai.interactable = true;
        this.btnBetXiu.interactable = true;
        this.lblBetedTai.string = Utils_1.default.formatMoney(this.betedTai);
        this.lblBetedXiu.string = Utils_1.default.formatMoney(this.betedXiu);
        this.betingDoor = BetDoor.None;
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
      showDice(res, isShowAnim = false) {
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
      showResult() {
        this.lblScore.string = "" + this.lastScore;
        this.lblScore.node.parent.active = true;
        this.bowl.active = false;
        this.showWinCash();
        this.bowl.off(cc.Node.EventType.TOUCH_MOVE);
        if (this.lastScore >= 11) {
          this.tai.node.active = true;
          this.tai.setAnimation(0, "win", true);
        } else {
          this.xiu.node.active = true;
          this.xiu.setAnimation(0, "win", true);
        }
        this.bg.setAnimation(0, this.lastScore >= 11 ? "tai-win" : "xiu-win", true);
        this.updateBtnHistories();
        Common_AudioManager_1.default.getInstance().playEffect(this.soundWin, .7);
      }
      stopWin() {
        this.tai.setAnimation(0, "normal", true);
        this.xiu.setAnimation(0, "normal", true);
        this.bg.setAnimation(0, "normal", true);
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
        if (!this.lastWinCash || this.lastWinCash <= 0) return;
        this.lblWinCash.node.stopAllActions();
        this.lblWinCash.node.active = true;
        this.lblWinCash.node.scale = 0;
        this.lblWinCash.node.setPosition(cc.Vec2.ZERO);
        Tween_1.default.numberTo(this.lblWinCash, this.lastWinCash, 1, n => "+" + n);
        Common_AudioManager_1.default.getInstance().playEffect(this.soundAddChip, .7);
        this.lblWinCash.node.runAction(cc.sequence(cc.spawn(cc.scaleTo(.3, 1.8).easing(cc.easeQuadraticActionOut()), cc.fadeIn(.3)), cc.scaleTo(.1, 1), cc.delayTime(.6), cc.callFunc(() => {
          Common_AudioManager_1.default.getInstance().playEffect(this.soundHideChip, .7);
        }), cc.delayTime(.5), cc.scaleTo(.17, .8), cc.spawn(cc.scaleTo(.12, 2).easing(cc.easeQuadraticActionOut()), cc.fadeOut(.12).easing(cc.easeQuadraticActionOut())), cc.callFunc(() => {
          this.lblWinCash.node.active = false;
        })));
        this.lastWinCash = 0;
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
            });
            this.btnHistories.children[i].active = true;
          } else this.btnHistories.children[i].active = false;
          idx--;
        }
      }
      sendChat(message) {
        if (!this.isCanChat) {
          this.showToast("B\u1ea1n thao t\xe1c qu\xe1 nhanh.");
          return;
        }
        this.isCanChat = false;
        this.scheduleOnce(() => {
          this.isCanChat = true;
        }, 1);
        var req = new TaiXiuMD5_Cmd_1.default.SendChat(unescape(encodeURIComponent(message)));
        MiniGameNetworkClient_1.default.getInstance().send(req);
      }
      playSoundClick() {}
    };
    TaiXiuMD5Controller.instance = null;
    __decorate([ property(cc.SpriteFrame) ], TaiXiuMD5Controller.prototype, "sprFrameTai", void 0);
    __decorate([ property(cc.SpriteFrame) ], TaiXiuMD5Controller.prototype, "sprFrameXiu", void 0);
    __decorate([ property(cc.SpriteFrame) ], TaiXiuMD5Controller.prototype, "sprFrameBtnNan", void 0);
    __decorate([ property(cc.SpriteFrame) ], TaiXiuMD5Controller.prototype, "sprFrameBtnNan2", void 0);
    __decorate([ property(cc.Label) ], TaiXiuMD5Controller.prototype, "lblSession", void 0);
    __decorate([ property(cc.Label) ], TaiXiuMD5Controller.prototype, "lblRemainTime", void 0);
    __decorate([ property(cc.Label) ], TaiXiuMD5Controller.prototype, "lblRemainTime2", void 0);
    __decorate([ property(cc.Label) ], TaiXiuMD5Controller.prototype, "lblScore", void 0);
    __decorate([ property(cc.Label) ], TaiXiuMD5Controller.prototype, "lblUserTai", void 0);
    __decorate([ property(cc.Label) ], TaiXiuMD5Controller.prototype, "lblUserXiu", void 0);
    __decorate([ property(cc.Label) ], TaiXiuMD5Controller.prototype, "lblTotalBetTai", void 0);
    __decorate([ property(cc.Label) ], TaiXiuMD5Controller.prototype, "lblTotalBetXiu", void 0);
    __decorate([ property(cc.Button) ], TaiXiuMD5Controller.prototype, "btnBetTai", void 0);
    __decorate([ property(cc.Button) ], TaiXiuMD5Controller.prototype, "btnBetXiu", void 0);
    __decorate([ property(cc.Label) ], TaiXiuMD5Controller.prototype, "lblBetTai", void 0);
    __decorate([ property(cc.Label) ], TaiXiuMD5Controller.prototype, "lblBetXiu", void 0);
    __decorate([ property(cc.Label) ], TaiXiuMD5Controller.prototype, "lblBetedTai", void 0);
    __decorate([ property(cc.Label) ], TaiXiuMD5Controller.prototype, "lblBetedXiu", void 0);
    __decorate([ property([ sp.SkeletonData ]) ], TaiXiuMD5Controller.prototype, "animationResults", void 0);
    __decorate([ property(cc.SpriteAtlas) ], TaiXiuMD5Controller.prototype, "sprFrameDice", void 0);
    __decorate([ property([ sp.Skeleton ]) ], TaiXiuMD5Controller.prototype, "diceResults", void 0);
    __decorate([ property(cc.Node) ], TaiXiuMD5Controller.prototype, "bowl", void 0);
    __decorate([ property(sp.Skeleton) ], TaiXiuMD5Controller.prototype, "bg", void 0);
    __decorate([ property(sp.Skeleton) ], TaiXiuMD5Controller.prototype, "tai", void 0);
    __decorate([ property(sp.Skeleton) ], TaiXiuMD5Controller.prototype, "xiu", void 0);
    __decorate([ property(cc.Node) ], TaiXiuMD5Controller.prototype, "btnHistories", void 0);
    __decorate([ property(TaiXiuMD5_PanelChat_1.default) ], TaiXiuMD5Controller.prototype, "panelChat", void 0);
    __decorate([ property(cc.Node) ], TaiXiuMD5Controller.prototype, "layoutBet", void 0);
    __decorate([ property([ cc.Button ]) ], TaiXiuMD5Controller.prototype, "btnBetAmounts", void 0);
    __decorate([ property(cc.ScrollView) ], TaiXiuMD5Controller.prototype, "scrollBetAmount", void 0);
    __decorate([ property(cc.Node) ], TaiXiuMD5Controller.prototype, "btnNextBetAmount", void 0);
    __decorate([ property(cc.Node) ], TaiXiuMD5Controller.prototype, "btnPreviousBetAmount", void 0);
    __decorate([ property(cc.Label) ], TaiXiuMD5Controller.prototype, "lblToast", void 0);
    __decorate([ property(cc.Label) ], TaiXiuMD5Controller.prototype, "lblWinCash", void 0);
    __decorate([ property(cc.Node) ], TaiXiuMD5Controller.prototype, "btnNan", void 0);
    __decorate([ property(TaiXiuMD5_PopupDetailHistory_1.default) ], TaiXiuMD5Controller.prototype, "popupDetailHistory", void 0);
    __decorate([ property(TaiXiuMD5_PopupSoiCau_1.default) ], TaiXiuMD5Controller.prototype, "popupSoiCau", void 0);
    __decorate([ property([ cc.SpriteFrame ]) ], TaiXiuMD5Controller.prototype, "listSprMD5", void 0);
    __decorate([ property(cc.Sprite) ], TaiXiuMD5Controller.prototype, "btnMD5", void 0);
    __decorate([ property(cc.Label) ], TaiXiuMD5Controller.prototype, "lbMD5", void 0);
    __decorate([ property(cc.RichText) ], TaiXiuMD5Controller.prototype, "lbResultMD5", void 0);
    __decorate([ property(cc.AudioClip) ], TaiXiuMD5Controller.prototype, "soundCountDown", void 0);
    __decorate([ property(cc.AudioClip) ], TaiXiuMD5Controller.prototype, "soundBetted", void 0);
    __decorate([ property(cc.AudioClip) ], TaiXiuMD5Controller.prototype, "soundBet", void 0);
    __decorate([ property(cc.AudioClip) ], TaiXiuMD5Controller.prototype, "soundWin", void 0);
    __decorate([ property(cc.AudioClip) ], TaiXiuMD5Controller.prototype, "soundAddChip", void 0);
    __decorate([ property(cc.AudioClip) ], TaiXiuMD5Controller.prototype, "soundSubChip", void 0);
    __decorate([ property(cc.AudioClip) ], TaiXiuMD5Controller.prototype, "soundDice", void 0);
    __decorate([ property(cc.AudioClip) ], TaiXiuMD5Controller.prototype, "soundNewGame", void 0);
    __decorate([ property(cc.AudioClip) ], TaiXiuMD5Controller.prototype, "soundHideChip", void 0);
    TaiXiuMD5Controller = TaiXiuMD5Controller_1 = __decorate([ ccclass ], TaiXiuMD5Controller);
    exports.default = TaiXiuMD5Controller;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/App": void 0,
    "../../Main/Game/src/common/BroadcastReceiver": void 0,
    "../../Main/Game/src/common/Common.AudioManager": void 0,
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/common/Constants": void 0,
    "../../Main/Game/src/common/ErrorLogger": void 0,
    "../../Main/Game/src/common/Tween": void 0,
    "../../Main/Game/src/common/Utils": void 0,
    "../../Main/Game/src/networks/MiniGameNetworkClient": void 0,
    "../../Main/Game/src/networks/Network.InPacket": void 0,
    "../../Main/Game/src/networks/TXMD5NetworkClient": void 0,
    "../../Main/Lobby/src/MiniGame": void 0,
    "./TaiXiuMD5.Cmd": "TaiXiuMD5.Cmd",
    "./TaiXiuMD5.PanelChat": "TaiXiuMD5.PanelChat",
    "./TaiXiuMD5.PopupDetailHistory": "TaiXiuMD5.PopupDetailHistory",
    "./TaiXiuMD5.PopupSoiCau": "TaiXiuMD5.PopupSoiCau"
  } ],
  "TaiXiuMD5.TaiXiuMD5TanLoc": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "27792lol1dIXI/dCydiI3nw", "TaiXiuMD5.TaiXiuMD5TanLoc");
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
    const TXMD5NetworkClient_1 = require("../../Main/Game/src/networks/TXMD5NetworkClient");
    const TaiXiuMD5_Cmd_1 = require("./TaiXiuMD5.Cmd");
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
          return;
        }
        if (this.money < 1e3) App_1.default.instance.alertDialog.showMsg("T\xe1n l\u1ed9c ph\u1ea3i l\u1edbn h\u01a1n 1.000 Xu"); else {
          TXMD5NetworkClient_1.default.getInstance().send(new TaiXiuMD5_Cmd_1.default.CmdSendTanLoc(this.money));
          this.money = 0;
          this.moneyLb.string = "0";
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
    "../../Main/Game/src/networks/TXMD5NetworkClient": void 0,
    "./TaiXiuMD5.Cmd": "TaiXiuMD5.Cmd"
  } ]
}, {}, [ "TaiXiuMD5.Cmd", "TaiXiuMD5.PanelChat", "TaiXiuMD5.PopupDetailHistory", "TaiXiuMD5.PopupHistory", "TaiXiuMD5.PopupHonors", "TaiXiuMD5.PopupSoiCau", "TaiXiuMD5.RichTextGuiide", "TaiXiuMD5.TaiXiuMD5Controller", "TaiXiuMD5.TaiXiuMD5TanLoc" ]);