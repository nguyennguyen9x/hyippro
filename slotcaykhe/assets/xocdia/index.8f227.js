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
  "XocDia.BankerControl": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "36b7fjVXSdDd7tf49SjRCAj", "XocDia.BankerControl");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const BroadcastReceiver_1 = require("../../Main/Game/src/common/BroadcastReceiver");
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const XocDia_Cmd_1 = require("./XocDia.Cmd");
    const XocDia_NetworkClient_1 = require("./XocDia.NetworkClient");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let BankerControl = class BankerControl extends cc.Component {
      constructor() {
        super(...arguments);
        this.lblTitle = null;
        this.slider = null;
        this.lblCoin = null;
        this.panelSell = null;
        this.coinOdd = 0;
        this.coinEven = 0;
        this.maxCoin = 0;
        this.minCoin = 1;
        this.coin = 0;
        this.sellingEven = false;
      }
      start() {
        BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.SET_SOUND, this.node);
        this.slider.node.on("slide", () => {
          this.coin = this.minCoin + Math.round((this.maxCoin - this.minCoin) * this.slider.progress);
          this.lblCoin.string = Utils_1.default.formatNumber(this.coin);
        });
      }
      show(coinOdd, coinEven) {
        this.coinOdd = coinOdd;
        this.coinEven = coinEven;
        this.panelSell.active = false;
        this.node.active = true;
      }
      actCanTat() {
        this.node.active = false;
        XocDia_NetworkClient_1.default.getInstance().send(new XocDia_Cmd_1.default.SendBankerSellGate(1, this.coin));
      }
      actSellOdd() {
        this.lblTitle.string = "B\xc1N L\u1eba";
        this.maxCoin = this.coinOdd;
        this.coin = this.maxCoin;
        this.lblCoin.string = Utils_1.default.formatNumber(this.coin);
        this.slider.progress = 1;
        this.panelSell.active = true;
        this.sellingEven = false;
      }
      actSellEven() {
        this.lblTitle.string = "B\xc1N CH\u1eb4N";
        this.maxCoin = this.coinEven;
        this.coin = this.maxCoin;
        this.lblCoin.string = Utils_1.default.formatNumber(this.coin);
        this.slider.progress = 1;
        this.panelSell.active = true;
        this.sellingEven = true;
      }
      actSell() {
        this.node.active = false;
        XocDia_NetworkClient_1.default.getInstance().send(new XocDia_Cmd_1.default.SendBankerSellGate(this.sellingEven ? 2 : 3, this.coin));
      }
    };
    __decorate([ property(cc.Label) ], BankerControl.prototype, "lblTitle", void 0);
    __decorate([ property(cc.Slider) ], BankerControl.prototype, "slider", void 0);
    __decorate([ property(cc.Label) ], BankerControl.prototype, "lblCoin", void 0);
    __decorate([ property(cc.Node) ], BankerControl.prototype, "panelSell", void 0);
    BankerControl = __decorate([ ccclass ], BankerControl);
    exports.default = BankerControl;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/BroadcastReceiver": void 0,
    "../../Main/Game/src/common/Utils": void 0,
    "./XocDia.Cmd": "XocDia.Cmd",
    "./XocDia.NetworkClient": "XocDia.NetworkClient"
  } ],
  "XocDia.BtnBet": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a7b5fPk1DhBUIdjn73/qfit", "XocDia.BtnBet");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const BroadcastReceiver_1 = require("../../Main/Game/src/common/BroadcastReceiver");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let BtnBet = class BtnBet extends cc.Component {
      constructor() {
        super(...arguments);
        this.sp_active = null;
        this.sp_normal = null;
        this.label = null;
      }
      start() {
        BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.SET_SOUND, this.node);
        cc.tween(this.sp_active.node).by(1.5, {
          angle: -360
        }).repeatForever().start();
      }
    };
    __decorate([ property(cc.Sprite) ], BtnBet.prototype, "sp_active", void 0);
    __decorate([ property(cc.Sprite) ], BtnBet.prototype, "sp_normal", void 0);
    __decorate([ property(cc.Label) ], BtnBet.prototype, "label", void 0);
    BtnBet = __decorate([ ccclass ], BtnBet);
    exports.default = BtnBet;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/BroadcastReceiver": void 0
  } ],
  "XocDia.BtnPayBet": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a3459e6zgREZIOLiazh9KoS", "XocDia.BtnPayBet");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const BroadcastReceiver_1 = require("../../Main/Game/src/common/BroadcastReceiver");
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let BtnPayBet = class BtnPayBet extends cc.Component {
      constructor() {
        super(...arguments);
        this.lblTotalBet = null;
        this.lblTotalMyBet = null;
        this.active = null;
        this.title = null;
        this.totalMyBet = 0;
      }
      start() {
        BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.SET_SOUND, this.node);
      }
      reset() {
        this.lblTotalBet.string = "";
        this.lblTotalMyBet.string = "";
        this.active.active = false;
        this.title && (this.title.active = true);
        this.totalMyBet = 0;
      }
      setTotalBet(coin, myCoin = 0) {
        this.totalMyBet += myCoin;
        this.lblTotalBet.string = coin > 0 ? Utils_1.default.formatNumber(coin) : "";
        this.lblTotalMyBet.string = this.totalMyBet > 0 ? Utils_1.default.formatNumber(this.totalMyBet) : "";
      }
      addTotalMyBet(coin) {
        this.totalMyBet += coin;
        this.lblTotalMyBet.string = this.totalMyBet > 0 ? Utils_1.default.formatNumber(this.totalMyBet) : "";
      }
      getTotalMyBet() {
        return this.totalMyBet;
      }
      hightlight() {
        this.active.active = true;
        this.title && (this.title.active = false);
      }
    };
    __decorate([ property(cc.Label) ], BtnPayBet.prototype, "lblTotalBet", void 0);
    __decorate([ property(cc.Label) ], BtnPayBet.prototype, "lblTotalMyBet", void 0);
    __decorate([ property(cc.Node) ], BtnPayBet.prototype, "active", void 0);
    __decorate([ property(cc.Node) ], BtnPayBet.prototype, "title", void 0);
    BtnPayBet = __decorate([ ccclass ], BtnPayBet);
    exports.default = BtnPayBet;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/BroadcastReceiver": void 0,
    "../../Main/Game/src/common/Utils": void 0
  } ],
  "XocDia.Cmd": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "10b98AUpqVENYK8MM95BNtG", "XocDia.Cmd");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.cmd = void 0;
    const Network_OutPacket_1 = require("../../Main/Game/src/networks/Network.OutPacket");
    const Network_InPacket_1 = require("../../Main/Game/src/networks/Network.InPacket");
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    const Constants_1 = require("../../Main/Game/src/common/Constants");
    var cmd;
    (function(cmd) {
      class Code {}
      Code.LOGIN = 1;
      Code.JOIN_ROOM = 3001;
      Code.CMDRECONNECTGAMEROOM = 3002;
      Code.MONEY_BET_CONFIG = 3003;
      Code.JOIN_ROOM_FAIL = 3004;
      Code.CHAT_ROOM = 3008;
      Code.REQUEST_INFO_MOI_CHOI = 3010;
      Code.MOI_CHOI = 3011;
      Code.ACCEPT_MOI_CHOI = 3012;
      Code.GETLISTROOM = 3014;
      Code.JOIN_GAME_ROOM_BY_ID = 3015;
      Code.DANG_KY_THOAT_PHONG = 3100;
      Code.JOIN_ROOM_SUCCESS = 3101;
      Code.USER_JOIN_ROOM_SUCCESS = 3102;
      Code.QUIT_ROOM = 3103;
      Code.USER_OUT_ROOM = 3104;
      Code.ACTION_IN_GAME = 3105;
      Code.PUT_MONEY = 3106;
      Code.BANKER_SELL_GATE = 3110;
      Code.BUY_GATE = 3111;
      Code.FINISH_GAME = 3112;
      Code.ORDER_BANKER = 3113;
      Code.PUT_MONEY_X2 = 3115;
      Code.PUT_ALL_IN = 3116;
      Code.START_GAME = 3117;
      Code.REFUND_MONEY = 3118;
      Code.GET_TIME = 3119;
      Code.NOTIFY_KICK_FROM_ROOM = 3120;
      Code.SOI_CAU = 3121;
      Code.STOP_GAME = 3122;
      Code.MESSAGE_ERROR_BANKER = 3123;
      Code.SET_CHEAT = 3124;
      Code.INFO_GATE_SELL = 3126;
      Code.ACTION_BANKER = 3127;
      Code.INFO_MONEY_AFTER_BANKER_SELL = 3128;
      Code.HUY_LAM_CAI = 3130;
      Code.LOCK_GATE = 3131;
      Code.KICK_OUT_XOCDIA = 3132;
      Code.DESTROY_ROOM = 3133;
      Code.GET_MONEY_LAI = 3134;
      Code.UPDATE_CURRENT_MONEY = 3135;
      Code.LOG_CHAT = 18003;
      Code.SEND_CHAT = 18e3;
      Code.SCRIBE_CHAT = 18001;
      Code.UNSCRIBE_CHAT = 18002;
      cmd.Code = Code;
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
      cmd.SendMoneyBetConfig = SendMoneyBetConfig;
      class SendScribeChat extends Network_OutPacket_1.default {
        constructor() {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.SCRIBE_CHAT);
          this.packHeader();
          this.putString(Constants_1.ChatChannel.XOC_DIA);
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
          this.putString(Constants_1.ChatChannel.XOC_DIA);
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
          this.putString(Constants_1.ChatChannel.XOC_DIA);
          this.updateSize();
        }
      }
      cmd.SendChat = SendChat;
      class ReceivedMoneyBetConfig extends Network_InPacket_1.default {
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
      cmd.ReceivedMoneyBetConfig = ReceivedMoneyBetConfig;
      class SendChatRoom extends Network_OutPacket_1.default {
        constructor(a, b) {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.CHAT_ROOM);
          this.packHeader();
          this.putByte(a ? 1 : 0);
          this.putString(encodeURI(b));
          this.updateSize();
        }
      }
      cmd.SendChatRoom = SendChatRoom;
      class SendGetListRoom extends Network_OutPacket_1.default {
        constructor() {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.GETLISTROOM);
          this.packHeader();
          this.putInt(Configs_1.default.App.MONEY_TYPE);
          this.putInt(30);
          this.putLong(-1);
          this.putInt(0);
          this.putInt(0);
          this.putInt(50);
          this.updateSize();
        }
      }
      cmd.SendGetListRoom = SendGetListRoom;
      class ReceiveGetListRoom extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.list = [];
          let listSize = this.getShort();
          this.list = [];
          for (var i = 0; i < listSize; i++) {
            let item = {};
            item["id"] = this.getInt();
            item["userCount"] = this.getByte();
            item["limitPlayer"] = this.getByte();
            item["maxUserPerRoom"] = this.getInt();
            item["moneyType"] = this.getByte();
            item["moneyBet"] = this.getInt();
            item["requiredMoney"] = this.getInt();
            item["rule"] = this.getByte();
            item["nameRoom"] = this.getString();
            item["key"] = this.getBool();
            item["quyban"] = this.getLong();
            this.list.push(item);
          }
        }
      }
      cmd.ReceiveGetListRoom = ReceiveGetListRoom;
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
      cmd.SendJoinRoom = SendJoinRoom;
      class SendJoinRoomById extends Network_OutPacket_1.default {
        constructor(id) {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.JOIN_GAME_ROOM_BY_ID);
          this.packHeader();
          this.putInt(id);
          this.putString("");
          this.updateSize();
        }
      }
      cmd.SendJoinRoomById = SendJoinRoomById;
      class ReceiveJoinRoomSuccess extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.moneyBet = 0;
          this.roomId = 0;
          this.gameId = 0;
          this.moneyType = 0;
          this.gameState = 0;
          this.countTime = 0;
          this.playerCount = 0;
          this.potID = [];
          this.playerInfos = [];
          this.money = 0;
          this.banker = false;
          this.isSubBanker = false;
          this.purchaseStatus = 0;
          this.potPurchase = 0;
          this.moneyPurchaseEven = 0;
          this.moneyPurchaseOdd = 0;
          this.moneyRemain = 0;
          this.subListCount = 0;
          this.list_buy_gate = [];
          this.bankerReqDestroy = false;
          this.bossReqDestroy = false;
          this.rule = 0;
          this.diceIDs = [];
          this.moneyBet = this.getInt();
          this.roomId = this.getInt();
          this.gameId = this.getInt();
          this.moneyType = this.getByte();
          this.gameState = this.getByte();
          this.countTime = this.getInt();
          this.playerCount = this.getByte();
          this.potID = [];
          for (let a = 0; 6 > a; a++) {
            let b = {};
            b["id"] = this.getByte();
            b["ratio"] = this.getInt();
            b["maxMoneyBet"] = this.getLong();
            b["totalMoney"] = this.getLong();
            b["moneyBet"] = this.getLong();
            b["isLock"] = this.getBool();
            this.potID.push(b);
          }
          this.playerInfos = [];
          for (let a = 0; a < this.playerCount; a++) {
            let b = {};
            b["nickname"] = this.getString();
            b["avatar"] = this.getString();
            b["money"] = this.getLong();
            b["banker"] = this.getBool();
            b["isSubBanker"] = this.getBool();
            b["reqKickroom"] = this.getBool();
            this.playerInfos.push(b);
          }
          this.money = this.getLong();
          this.banker = this.getBool();
          this.isSubBanker = this.getBool();
          this.purchaseStatus = this.getInt();
          this.potPurchase = this.getInt();
          this.moneyPurchaseEven = this.getLong();
          this.moneyPurchaseOdd = this.getLong();
          this.moneyRemain = this.getLong();
          this.subListCount = this.getInt();
          this.list_buy_gate = [];
          for (let a = 0; a < this.subListCount; a++) {
            let b = {};
            b["nickname"] = this.getString();
            b["money"] = this.getLong();
            this.list_buy_gate.push(b);
          }
          this.bankerReqDestroy = this.getBool();
          this.bossReqDestroy = this.getBool();
          this.rule = this.getInt();
          const dicesSize = this.getInt();
          for (let a = 0; dicesSize > a; a++) this.diceIDs.push(this.getInt());
        }
      }
      cmd.ReceiveJoinRoomSuccess = ReceiveJoinRoomSuccess;
      class ReceivedJoinRoomFail extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
        }
      }
      cmd.ReceivedJoinRoomFail = ReceivedJoinRoomFail;
      class SendLeaveRoom extends Network_OutPacket_1.default {
        constructor() {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.DANG_KY_THOAT_PHONG);
          this.packHeader();
          this.updateSize();
        }
      }
      cmd.SendLeaveRoom = SendLeaveRoom;
      class ReceiveLeavedRoom extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.reason = 0;
          this.reason = this.getByte();
        }
      }
      cmd.ReceiveLeavedRoom = ReceiveLeavedRoom;
      class ReceiveLeaveRoom extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.bRegis = false;
          this.nickname = "";
          this.bRegis = this.getBool();
          this.nickname = this.getString();
        }
      }
      cmd.ReceiveLeaveRoom = ReceiveLeaveRoom;
      class ReceiveUserJoinRoom extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.nickname = "";
          this.avatar = "";
          this.money = 0;
          this.nickname = this.getString();
          this.avatar = this.getString();
          this.money = this.getLong();
        }
      }
      cmd.ReceiveUserJoinRoom = ReceiveUserJoinRoom;
      class ReceiveUserOutRoom extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.nickname = "";
          this.nickname = this.getString();
        }
      }
      cmd.ReceiveUserOutRoom = ReceiveUserOutRoom;
      class ReceiveActionInGame extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.action = 0;
          this.time = 0;
          this.action = this.getByte();
          this.time = this.getByte();
        }
      }
      cmd.ReceiveActionInGame = ReceiveActionInGame;
      class ReceiveStartGame extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.banker = "";
          this.gameId = 0;
          this.moneyBanker = 0;
          this.list_lock_gate = [];
          this.banker = this.getString();
          this.gameId = this.getInt();
          this.moneyBanker = this.getLong();
          this.list_lock_gate = [];
          for (var a = 0; 6 > a; a++) {
            var b = {};
            b["id"] = this.getByte();
            b["isLock"] = this.getBool();
            this.list_lock_gate.push(b);
          }
        }
      }
      cmd.ReceiveStartGame = ReceiveStartGame;
      class SendPutMoney extends Network_OutPacket_1.default {
        constructor(doorId, coin) {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.PUT_MONEY);
          this.packHeader();
          this.putByte(doorId);
          this.putLong(coin);
          this.updateSize();
        }
      }
      cmd.SendPutMoney = SendPutMoney;
      class ReceivePutMoney extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.error = 0;
          this.nickname = "";
          this.betMoney = 0;
          this.potId = 0;
          this.potMoney = 0;
          this.currentMoney = 0;
          this.error = this.getError();
          this.nickname = this.getString();
          this.betMoney = this.getLong();
          this.potId = this.getByte();
          this.potMoney = this.getLong();
          this.currentMoney = this.getLong();
        }
      }
      cmd.ReceivePutMoney = ReceivePutMoney;
      class ReceiveBankerSellGate extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.action = 0;
          this.moneySell = 0;
          this.action = this.getByte();
          this.moneySell = this.getLong();
        }
      }
      cmd.ReceiveBankerSellGate = ReceiveBankerSellGate;
      class SendBuyGate extends Network_OutPacket_1.default {
        constructor(coin) {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.BUY_GATE);
          this.packHeader();
          this.putLong(coin);
          this.updateSize();
        }
      }
      cmd.SendBuyGate = SendBuyGate;
      class ReceiveBuyGate extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.error = 0;
          this.nickname = "";
          this.moneyBuy = 0;
          this.rmMoneySell = 0;
          this.currentMoney = 0;
          this.error = this.getError();
          this.nickname = this.getString();
          this.moneyBuy = this.getLong();
          this.rmMoneySell = this.getLong();
          this.currentMoney = this.getLong();
        }
      }
      cmd.ReceiveBuyGate = ReceiveBuyGate;
      class ReceiveRefundMoney extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.rfCount = 0;
          this.potID = [];
          this.playerInfosRefund = [];
          this.rfCount = this.getInt();
          for (let a = 0; 6 > a; a++) {
            let b = {};
            b["id"] = this.getByte();
            b["moneyRefund"] = this.getLong();
            b["totalMoney"] = this.getLong();
            this.potID.push(b);
          }
          this.playerInfosRefund = [];
          for (let a = 0; a < this.rfCount; a++) {
            let b = {};
            b["nickname"] = this.getString();
            b["moneyRefund"] = this.getLong();
            b["currentMoney"] = this.getLong();
            b["pots"] = this.getString();
            b["moneyRfPots"] = this.getString();
            this.playerInfosRefund.push(b);
          }
        }
      }
      cmd.ReceiveRefundMoney = ReceiveRefundMoney;
      class ReceiveFinishGame extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.infoAllPot = [];
          this.diceIDs = [];
          this.moneyBankerBefore = 0;
          this.moneyBankerAfter = 0;
          this.moneyBankerExchange = 0;
          this.playerInfoWin = [];
          this.subListCount = 0;
          this.infoSubBanker = [];
          for (let a = 0; 6 > a; a++) {
            let b = {};
            b["potId"] = this.getByte();
            b["totalMoney"] = this.getLong();
            b["win"] = this.getBool();
            this.infoAllPot.push(b);
          }
          for (let a = 0; 4 > a; a++) this.diceIDs.push(this.getInt());
          this.moneyBankerBefore = this.getLong();
          this.moneyBankerAfter = this.getLong();
          this.moneyBankerExchange = this.getLong();
          let playerWinCount = this.getInt();
          for (let a = 0; a < playerWinCount; a++) {
            let b = {};
            b["nickname"] = this.getString();
            b["moneyWin"] = this.getLong();
            b["currentMoney"] = this.getLong();
            b["potsWin"] = this.getString();
            b["moneyWinPots"] = this.getString();
            this.playerInfoWin.push(b);
          }
          this.subListCount = this.getInt();
          for (let a = 0; a < this.subListCount; a++) {
            let b = {};
            b["nicknameSubbanker"] = this.getString();
            b["potSubBanker"] = this.getByte();
            b["moneySubBanker"] = this.getLong();
            b["moneySubBankerNoFee"] = this.getLong();
            b["currentMoneySubBanker"] = this.getLong();
            this.infoSubBanker.push(b);
          }
        }
      }
      cmd.ReceiveFinishGame = ReceiveFinishGame;
      class ReceivedKickOff extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.reason = this.getByte();
        }
      }
      cmd.ReceivedKickOff = ReceivedKickOff;
      class SendReconnect extends Network_OutPacket_1.default {
        constructor() {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.CMDRECONNECTGAMEROOM);
          this.packHeader();
          this.updateSize();
        }
      }
      cmd.SendReconnect = SendReconnect;
      class CmdSendGetCau extends Network_OutPacket_1.default {
        constructor() {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.SOI_CAU);
          this.packHeader();
          this.updateSize();
        }
      }
      cmd.CmdSendGetCau = CmdSendGetCau;
      class ReceiveGetCau extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.totalEven = 0;
          this.totalOdd = 0;
          this.rsCount = 0;
          this.arrayCau = [];
          this.totalEven = this.getInt();
          this.totalOdd = this.getInt();
          this.rsCount = this.getInt();
          for (var a = 0; a < this.rsCount; a++) this.arrayCau.push(this.getByte());
        }
      }
      cmd.ReceiveGetCau = ReceiveGetCau;
      class SendOrderBanker extends Network_OutPacket_1.default {
        constructor() {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.ORDER_BANKER);
          this.packHeader();
          this.updateSize();
        }
      }
      cmd.SendOrderBanker = SendOrderBanker;
      class ReceiveOrderBanker extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.error = 0;
          this.moneyRequire = 0;
          this.error = this.getError();
          this.moneyRequire = this.getLong();
        }
      }
      cmd.ReceiveOrderBanker = ReceiveOrderBanker;
      class ReceiveInfoGateSell extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.moneyEven = 0;
          this.moneyOdd = 0;
          this.moneyEven = this.getLong();
          this.moneyOdd = this.getLong();
        }
      }
      cmd.ReceiveInfoGateSell = ReceiveInfoGateSell;
      class SendCancelBanker extends Network_OutPacket_1.default {
        constructor() {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.HUY_LAM_CAI);
          this.packHeader();
          this.updateSize();
        }
      }
      cmd.SendCancelBanker = SendCancelBanker;
      class ReceiveCancelBanker extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.bDestroy = false;
          this.nickname = "";
          this.bDestroy = this.getBool();
          this.nickname = this.getString();
        }
      }
      cmd.ReceiveCancelBanker = ReceiveCancelBanker;
      class SendBankerSellGate extends Network_OutPacket_1.default {
        constructor(door, coin) {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.BANKER_SELL_GATE);
          this.packHeader();
          this.putByte(door);
          this.putLong(coin);
          this.updateSize();
        }
      }
      cmd.SendBankerSellGate = SendBankerSellGate;
      class ReceiveInfoMoneyAfterBankerSell extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.money = 0;
          this.money = this.getLong();
        }
      }
      cmd.ReceiveInfoMoneyAfterBankerSell = ReceiveInfoMoneyAfterBankerSell;
      class SendRequestInfoMoiChoi extends Network_OutPacket_1.default {
        constructor() {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.REQUEST_INFO_MOI_CHOI);
          this.packHeader();
          this.updateSize();
        }
      }
      cmd.SendRequestInfoMoiChoi = SendRequestInfoMoiChoi;
      class SendMoiChoi extends Network_OutPacket_1.default {
        constructor(nicknames) {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.MOI_CHOI);
          this.packHeader();
          this.putShort(nicknames.length);
          for (var b = 0; b < nicknames.length; b++) this.putString(nicknames[b]);
          this.updateSize();
        }
      }
      cmd.SendMoiChoi = SendMoiChoi;
      class SendAcceptMoiChoi extends Network_OutPacket_1.default {
        constructor(name) {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.ACCEPT_MOI_CHOI);
          this.packHeader();
          this.putString(name);
          this.updateSize();
        }
      }
      cmd.SendAcceptMoiChoi = SendAcceptMoiChoi;
      class ReceivedChatRoom extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.suggestionActions = [];
          this.chair = this.getByte();
          this.isIcon = this.getBool();
          this.content = decodeURI(this.getString());
          this.nickname = this.getString();
          this.error = this.getByte();
          this.desc = this.getString();
          let actionsStr = this.getString();
          if (actionsStr) {
            let actions = JSON.parse(actionsStr);
            actions.hasOwnProperty("suggestionActions") && Array.isArray(actions["suggestionActions"]) && (this.suggestionActions = Constants_1.UserActions.toEnums(actions["suggestionActions"]));
          }
        }
      }
      cmd.ReceivedChatRoom = ReceivedChatRoom;
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
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/common/Constants": void 0,
    "../../Main/Game/src/networks/Network.InPacket": void 0,
    "../../Main/Game/src/networks/Network.OutPacket": void 0
  } ],
  "XocDia.Constant": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d9607+fuuNML4a5XbayNeOL", "XocDia.Constant");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.XocDiaContant = void 0;
    var XocDiaContant;
    (function(XocDiaContant) {
      class KickReasonCodes {}
      KickReasonCodes.ERROR_MONEY = 1;
      KickReasonCodes.ERROR_BAO_TRI = 2;
      XocDiaContant.KickReasonCodes = KickReasonCodes;
    })(XocDiaContant = exports.XocDiaContant || (exports.XocDiaContant = {}));
    cc._RF.pop();
  }, {} ],
  "XocDia.Controller": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c930d7rTZRE4oeBVh3a3fLa", "XocDia.Controller");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const BroadcastReceiver_1 = require("../../Main/Game/src/common/BroadcastReceiver");
    const XocDia_Cmd_1 = require("./XocDia.Cmd");
    const XocDia_Player_1 = require("./XocDia.Player");
    const Random_1 = require("../../Main/Game/src/common/Random");
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    const XocDia_BtnPayBet_1 = require("./XocDia.BtnPayBet");
    const XocDia_NetworkClient_1 = require("./XocDia.NetworkClient");
    const Network_InPacket_1 = require("../../Main/Game/src/networks/Network.InPacket");
    const XocDia_PanelPayDoor_1 = require("./XocDia.PanelPayDoor");
    const App_1 = require("../../Main/Game/src/common/App");
    const XocDia_BtnBet_1 = require("./XocDia.BtnBet");
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const XocDia_BankerControl_1 = require("./XocDia.BankerControl");
    const XocDia_HidePlayer_1 = require("./XocDia.HidePlayer");
    const XocDia_Constant_1 = require("./XocDia.Constant");
    const PopupSettingInGame_1 = require("../../Main/Game/src/games/cardgames/PopupSettingInGame");
    const XocDia_PopupGuide_1 = require("./XocDia.PopupGuide");
    const Common_AudioManager_1 = require("../../Main/Game/src/common/Common.AudioManager");
    const XocDia_PanelChat_1 = require("./XocDia.PanelChat");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let XocDiaController = class XocDiaController extends cc.Component {
      constructor() {
        super(...arguments);
        this.lbGameId = null;
        this.players = [];
        this.hidePlayers = null;
        this.btnBets = [];
        this.btnBetTempl = null;
        this.btnBetParent = null;
        this.btn_next_bet = null;
        this.btn_pre_bet = null;
        this.btnPayBets = [];
        this.dealer = null;
        this.lbDealerMsg = null;
        this.dealerHandPoint = null;
        this.bowl = null;
        this.dices = null;
        this.sprChips = [];
        this.sprChipSmalls = [];
        this.chips = null;
        this.chipTemplate = null;
        this.lbProgressTime = null;
        this.panelPayDoor = null;
        this.lblHistoryOdd = null;
        this.lblHistoryEven = null;
        this.sfOdd = null;
        this.sfEven = null;
        this.lblHistoryItems = null;
        this.bankerControl = null;
        this.backgroundMusic = null;
        this.chipSound = null;
        this.xocxocSound = null;
        this.startBetSound = null;
        this.winSound = null;
        this.countDownSound = null;
        this.panelChat = null;
        this.chipsInDoors = {};
        this.gameState = 0;
        this.listBets = [ 1e3, 5e3, 1e4, 5e4, 1e5, 5e5, 1e6, 5e6, 1e7 ];
        this.betIdx = 0;
        this.isBanker = false;
        this.banker = "";
        this.timeRemain = 0;
        this.scheduleDicesResult = null;
        this.scheduleDoorsResult = null;
        this.isReloadGame = false;
        this.listChip = [];
      }
      start() {
        BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.SET_SOUND, cc.find("Canvas"));
        this.initializeListener();
        for (let i = 0; i < this.btnPayBets.length; i++) {
          let btn = this.btnPayBets[i];
          btn.node.on("click", () => {
            if (2 != this.gameState) return;
            XocDia_NetworkClient_1.default.getInstance().send(new XocDia_Cmd_1.default.SendPutMoney(i, this.listBets[this.betIdx]));
          });
        }
        this.betIdx = Configs_1.default.Login.Coin >= Configs_1.default.App.RICH_MAN ? 2 : 0;
        for (let i = 0; i < this.listBets.length; i++) {
          let btnBet = cc.instantiate(this.btnBetTempl).getComponent(XocDia_BtnBet_1.default);
          btnBet.node.active = true;
          btnBet.node.parent = this.btnBetParent.content;
          btnBet.sp_normal.spriteFrame = this.sprChips[i];
          btnBet.label.string = Utils_1.default.formatMoneyChip(this.listBets[i]);
          btnBet.sp_active.node.active = i === this.betIdx;
          btnBet.node["indexI"] = i;
          btnBet.node.on("click", (event, data) => {
            this.betIdx = event.node["indexI"];
            for (let j = 0; j < this.btnBets.length; j++) this.btnBets[j].sp_active.node.active = j === this.betIdx;
          });
          this.btnBets.push(btnBet);
        }
        Configs_1.default.Login.Coin >= Configs_1.default.App.RICH_MAN && this.scheduleOnce(() => {
          this.btnBetParent.scrollToPercentHorizontal(.4, .5);
        }, 1);
        Common_AudioManager_1.default.getInstance().playBackgroundMusicByGame(Configs_1.default.App.BUNDLE_NAME.XOCDIA, this.backgroundMusic);
        let self = this;
        cc.game.on(cc.game.EVENT_HIDE, function() {
          cc.sys.localStorage.setItem("xocxoc_time_hide", Date.now());
        });
        cc.game.on(cc.game.EVENT_SHOW, function() {
          let timeHide = cc.sys.localStorage.getItem("xocxoc_time_hide");
          if (timeHide) {
            let deltaTime = Math.round((Date.now() - JSON.parse(cc.sys.localStorage.getItem("xocxoc_time_hide"))) / 1e3);
            cc.sys.localStorage.removeItem("xocxoc_time_hide");
            if (deltaTime <= 5) {
              self.timeRemain -= deltaTime;
              self.unschedule(self.scheduleDicesResult);
              self.dices.children.forEach(child => {
                cc.Tween.stopAllByTarget(child);
                child.y = 0;
              });
              if (self.lastDicesResult) {
                self.bowl.node.active = false;
                self.dices.active = true;
                self.lastDicesResult.forEach((dice, i) => {
                  self.dices.children[i].getComponent(cc.Sprite).spriteFrame = 1 == dice ? self.sfOdd : self.sfEven;
                });
              } else self.dices.active = false;
            } else {
              App_1.default.instance.showLoading(true);
              self.isReloadGame = true;
              XocDia_NetworkClient_1.default.getInstance().close();
              cc.director.loadScene("XocDia", () => {
                self.isReloadGame = false;
                App_1.default.instance.showLoading(false);
              });
            }
          }
        });
      }
      onDestroy() {
        cc.game.clear();
      }
      initializeListener() {
        App_1.default.instance.showErrLoading("\u0110ang k\u1ebft n\u1ed1i t\u1edbi server...");
        XocDia_NetworkClient_1.default.getInstance().addOnOpen(() => {
          App_1.default.instance.showErrLoading("\u0110ang \u0111ang \u0111\u0103ng nh\u1eadp...");
          XocDia_NetworkClient_1.default.getInstance().send(new XocDia_Cmd_1.default.SendLogin(Configs_1.default.Login.Nickname, Configs_1.default.Login.AccessToken));
        }, this);
        XocDia_NetworkClient_1.default.getInstance().addOnClose(() => {
          this.isReloadGame || App_1.default.instance.loadScene("Lobby");
        }, this);
        BroadcastReceiver_1.default.register(BroadcastReceiver_1.default.USER_UPDATE_COIN, () => {
          this.players[this.players.length - 1].setCoin(Configs_1.default.Login.Coin);
        }, this);
        BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN);
        BroadcastReceiver_1.default.register(BroadcastReceiver_1.default.USER_DISCONNECTED, data => {
          XocDia_NetworkClient_1.default.getInstance().close();
        }, this);
        XocDia_NetworkClient_1.default.getInstance().addListener(data => {
          App_1.default.instance.showLoading(false);
          let inpacket = new Network_InPacket_1.default(data);
          switch (inpacket.getCmdId()) {
           case XocDia_Cmd_1.default.Code.LOGIN:
            this.receivedLogin();
            break;

           case XocDia_Cmd_1.default.Code.MONEY_BET_CONFIG:
            {
              let res = new XocDia_Cmd_1.default.ReceivedMoneyBetConfig(data);
              cc.log(res);
              this.receivedGetMoneyBetConfig(res);
            }
            break;

           case XocDia_Cmd_1.default.Code.JOIN_ROOM_FAIL:
            {
              let res = new XocDia_Cmd_1.default.ReceivedJoinRoomFail(data);
              cc.log(res);
              this.receivedJoinRoomFail(res);
            }
            break;

           case XocDia_Cmd_1.default.Code.JOIN_ROOM_SUCCESS:
            {
              let res = new XocDia_Cmd_1.default.ReceiveJoinRoomSuccess(data);
              cc.log(res);
              this.receivedJoinRoomSuccess(res);
            }
            break;

           case XocDia_Cmd_1.default.Code.USER_JOIN_ROOM_SUCCESS:
            {
              let res = new XocDia_Cmd_1.default.ReceiveUserJoinRoom(data);
              cc.log(res);
              this.receivedUserJoinRoom(res);
            }
            break;

           case XocDia_Cmd_1.default.Code.USER_OUT_ROOM:
            {
              let res = new XocDia_Cmd_1.default.ReceiveUserOutRoom(data);
              cc.log(res);
              this.receivedUserOutRoom(res);
            }
            break;

           case XocDia_Cmd_1.default.Code.QUIT_ROOM:
            {
              let res = new XocDia_Cmd_1.default.ReceiveLeavedRoom(data);
              cc.log(res);
              this.receivedLeavedRoom(res);
            }
            break;

           case XocDia_Cmd_1.default.Code.DANG_KY_THOAT_PHONG:
            {
              let res = new XocDia_Cmd_1.default.ReceiveLeaveRoom(data);
              cc.log(res);
              this.receivedLeaveRoom(res);
            }
            break;

           case XocDia_Cmd_1.default.Code.ACTION_IN_GAME:
            {
              let res = new XocDia_Cmd_1.default.ReceiveActionInGame(data);
              cc.log(res);
              this.receivedActionInGame(res);
            }
            break;

           case XocDia_Cmd_1.default.Code.START_GAME:
            {
              let res = new XocDia_Cmd_1.default.ReceiveStartGame(data);
              cc.log(res);
              this.receivedStartGame(res);
            }
            break;

           case XocDia_Cmd_1.default.Code.PUT_MONEY:
            {
              let res = new XocDia_Cmd_1.default.ReceivePutMoney(data);
              this.receivedPutMoney(res);
            }
            break;

           case XocDia_Cmd_1.default.Code.BANKER_SELL_GATE:
            {
              let res = new XocDia_Cmd_1.default.ReceiveBankerSellGate(data);
              cc.log(res);
              this.receivedSellGate(res);
            }
            break;

           case XocDia_Cmd_1.default.Code.BUY_GATE:
            {
              let res = new XocDia_Cmd_1.default.ReceiveBuyGate(data);
              cc.log(res);
              this.receivedBuyGate(res);
            }
            break;

           case XocDia_Cmd_1.default.Code.REFUND_MONEY:
            {
              let res = new XocDia_Cmd_1.default.ReceiveRefundMoney(data);
              cc.log(res);
              this.receivedRefundMoney(res);
            }
            break;

           case XocDia_Cmd_1.default.Code.FINISH_GAME:
            {
              let res = new XocDia_Cmd_1.default.ReceiveFinishGame(data);
              cc.log(res);
              this.receivedFinishGame(res);
            }
            break;

           case XocDia_Cmd_1.default.Code.SOI_CAU:
            {
              let res = new XocDia_Cmd_1.default.ReceiveGetCau(data);
              cc.log(res);
              this.receivedSoiCau(res);
            }
            break;

           case XocDia_Cmd_1.default.Code.ORDER_BANKER:
            {
              let res = new XocDia_Cmd_1.default.ReceiveOrderBanker(data);
              cc.log(res);
              this.receivedOrderBanker(res);
            }
            break;

           case XocDia_Cmd_1.default.Code.HUY_LAM_CAI:
            {
              let res = new XocDia_Cmd_1.default.ReceiveCancelBanker(data);
              cc.log(res);
              this.receivedCancelBanker(res);
            }
            break;

           case XocDia_Cmd_1.default.Code.INFO_GATE_SELL:
            {
              let res = new XocDia_Cmd_1.default.ReceiveInfoGateSell(data);
              cc.log(res);
              this.receivedInfoGateSell(res);
            }
            break;

           case XocDia_Cmd_1.default.Code.INFO_MONEY_AFTER_BANKER_SELL:
            {
              let res = new XocDia_Cmd_1.default.ReceiveInfoMoneyAfterBankerSell(data);
              cc.log(res);
            }
            break;

           case XocDia_Cmd_1.default.Code.CHAT_ROOM:
            {
              let res = new XocDia_Cmd_1.default.ReceivedChatRoom(data);
              cc.log(res);
              this.receivedChatRoom(res);
            }
            break;

           case XocDia_Cmd_1.default.Code.NOTIFY_KICK_FROM_ROOM:
            {
              App_1.default.instance.showLoading(false);
              let res = new XocDia_Cmd_1.default.ReceivedKickOff(data);
              cc.log(res);
              this.onKickFromRoom(res.reason);
            }
            break;

           default:
            cc.log("XocDia CmdId:", inpacket.getCmdId());
          }
        }, this);
        XocDia_NetworkClient_1.default.getInstance().connect();
      }
      receivedLogin() {
        XocDia_NetworkClient_1.default.getInstance().send(new XocDia_Cmd_1.default.SendMoneyBetConfig());
      }
      receivedJoinRoomFail(joinRoomFailData) {
        let msg = "L\u1ed7i " + joinRoomFailData.getError() + ", kh\xf4ng x\xe1c \u0111\u1ecbnh.";
        switch (joinRoomFailData.getError()) {
         case 1:
          msg = "L\u1ed7i ki\u1ec3m tra th\xf4ng tin!";
          break;

         case 2:
          msg = "Kh\xf4ng t\xecm \u0111\u01b0\u1ee3c ph\xf2ng th\xedch h\u1ee3p. Vui l\xf2ng th\u1eed l\u1ea1i sau!";
          break;

         case 3:
          msg = "B\u1ea1n kh\xf4ng \u0111\u1ee7 ti\u1ec1n v\xe0o ph\xf2ng ch\u01a1i n\xe0y!";
          break;

         case 4:
          msg = "Kh\xf4ng t\xecm \u0111\u01b0\u1ee3c ph\xf2ng th\xedch h\u1ee3p. Vui l\xf2ng th\u1eed l\u1ea1i sau!";
          break;

         case 5:
          msg = "M\u1ed7i l\u1ea7n v\xe0o ph\xf2ng ph\u1ea3i c\xe1ch nhau 10 gi\xe2y!";
          break;

         case 6:
          msg = "H\u1ec7 th\u1ed1ng b\u1ea3o tr\xec!";
          break;

         case 7:
          msg = "Kh\xf4ng t\xecm th\u1ea5y ph\xf2ng ch\u01a1i!";
          break;

         case 8:
          msg = "M\u1eadt kh\u1ea9u ph\xf2ng ch\u01a1i kh\xf4ng \u0111\xfang!";
          break;

         case 9:
          msg = "Ph\xf2ng ch\u01a1i \u0111\xe3 \u0111\u1ee7 ng\u01b0\u1eddi!";
          break;

         case 10:
          msg = "B\u1ea1n b\u1ecb ch\u1ee7 ph\xf2ng kh\xf4ng cho v\xe0o b\xe0n!";
        }
        App_1.default.instance.alertDialog.showMsgWithOnDismissed(msg, () => {
          XocDia_NetworkClient_1.default.getInstance().send(new XocDia_Cmd_1.default.SendLeaveRoom());
        });
      }
      receivedGetMoneyBetConfig(getMoneyBetConfigData) {
        const rooms = getMoneyBetConfigData.list;
        const roomAvaiables = rooms.filter(room => room.moneyType == Configs_1.default.App.MONEY_TYPE).sort((a, b) => a.moneyBet - b.moneyBet);
        XocDia_NetworkClient_1.default.getInstance().send(new XocDia_Cmd_1.default.SendJoinRoom(Configs_1.default.App.MONEY_TYPE, roomAvaiables[0].maxUserPerRoom, roomAvaiables[0].moneyBet, 0));
      }
      resetView() {
        this.players.forEach(e => e.leave());
        this.btnPayBets.forEach(e => e.reset());
        this.dealer.setAnimation(0, "normal", true);
        this.lbDealerMsg.node.active = false;
        this.dices.active = false;
        this.bowl.clearTracks();
        this.clearChips();
        this.lbProgressTime.node.parent.active = false;
        this.panelPayDoor.node.active = false;
        this.bankerControl.node.active = false;
      }
      getRandomEmptyPlayer() {
        let emptyPlayers = new Array();
        for (let i = 0; i < this.players.length; i++) "" == this.players[i].nickname && emptyPlayers.push(this.players[i]);
        if (emptyPlayers.length > 0) return emptyPlayers[Random_1.default.rangeInt(0, emptyPlayers.length)];
        return null;
      }
      getPlayer(nickname) {
        for (let i = 0; i < this.players.length; i++) {
          let player = this.players[i];
          if ("" != player.nickname && player.nickname == nickname) return player;
        }
        return null;
      }
      getChip(coin) {
        let ret = null;
        for (let i = 0; i < this.listChip.length; i++) if (!this.listChip[i].active) {
          ret = this.listChip[i];
          break;
        }
        if (null == ret) {
          ret = cc.instantiate(this.chipTemplate);
          this.listChip.push(ret);
        }
        let chipIdx = 0;
        for (let i = 0; i < this.listBets.length; i++) if (this.listBets[i] == coin) {
          chipIdx = i;
          break;
        }
        ret.getComponent(cc.Sprite).spriteFrame = this.sprChipSmalls[chipIdx];
        ret.opacity = 255;
        ret.active = true;
        ret.parent = this.chips;
        ret.setContentSize(28, 28);
        ret.setSiblingIndex(this.chips.childrenCount);
        return ret;
      }
      clearChips() {
        this.chipTemplate.active = false;
        for (let i = 0; i < this.listChip.length; i++) this.listChip[i].active = false;
        this.chipsInDoors = {};
      }
      convertMoneyToChipMoney(coin) {
        let ret = new Array();
        let _coin = coin;
        let minCoin = this.listBets[0];
        let counter = 0;
        while (_coin >= minCoin || counter < 15) {
          for (let i = this.listBets.length; i >= 0; i--) if (_coin >= this.listBets[i]) {
            ret.push(this.listBets[i]);
            _coin -= this.listBets[i];
            break;
          }
          counter++;
        }
        return ret;
      }
      setTimeCountDown(time) {
        this.timeRemain = time;
        this.lbProgressTime.string = this.timeRemain.toString();
        let countDown = () => {
          this.timeRemain--;
          this.timeRemain <= 0 && this.unschedule(countDown);
          this.lbProgressTime.string = this.timeRemain.toString();
          this.timeRemain < 15 && Common_AudioManager_1.default.getInstance().playEffectByGame(Configs_1.default.App.BUNDLE_NAME.XOCDIA, this.countDownSound);
        };
        this.schedule(countDown, 1);
      }
      receivedJoinRoomSuccess(joinRoomSuccessData) {
        Configs_1.default.Login.Coin = joinRoomSuccessData.money;
        this.resetView();
        this.lbGameId.string = "#" + joinRoomSuccessData.gameId;
        this.listBets = [ 1e3, 5e3, 1e4, 5e4, 1e5, 5e5, 1e6, 5e6, 1e7 ];
        this.isBanker = joinRoomSuccessData.banker;
        this.banker = "";
        this.isBanker && (this.banker = Configs_1.default.Login.Nickname);
        this.players[this.players.length - 1].set(Configs_1.default.Login.Nickname, Configs_1.default.Login.Avatar, Configs_1.default.Login.Coin, joinRoomSuccessData.banker);
        for (let i = 0; i < joinRoomSuccessData.playerInfos.length; i++) {
          let playerData = joinRoomSuccessData.playerInfos[i];
          let player = this.getRandomEmptyPlayer();
          if (null != player) {
            player.set(playerData["nickname"], playerData["avatar"], playerData["money"], playerData["banker"]);
            playerData["banker"] && (this.banker = playerData["nickname"]);
          } else this.hidePlayers.add(playerData);
        }
        this.hidePlayers.showNumberPlayer();
        for (let i = 0; i < joinRoomSuccessData.potID.length; i++) {
          let potData = joinRoomSuccessData.potID[i];
          let btnPayBet = this.btnPayBets[i];
          btnPayBet.setTotalBet(potData["totalMoney"]);
          btnPayBet.addTotalMyBet(potData["moneyBet"]);
        }
        this.gameState = joinRoomSuccessData.gameState;
        let msg = "";
        switch (this.gameState) {
         case 1:
          msg = "B\u1eaft \u0111\u1ea7u v\xe1n m\u1edbi";
          break;

         case 2:
          msg = "B\u1eaft \u0111\u1ea7u \u0111\u1eb7t c\u1eeda";
          this.lbProgressTime.node.parent.active = true;
          this.setTimeCountDown(joinRoomSuccessData.countTime);
          break;

         case 3:
          if (this.isBanker) this.bankerControl.show(joinRoomSuccessData.moneyPurchaseOdd, joinRoomSuccessData.moneyPurchaseEven); else {
            1 != joinRoomSuccessData.purchaseStatus && this.panelPayDoor.show(joinRoomSuccessData.purchaseStatus, joinRoomSuccessData.moneyRemain);
            for (let i = 0; i < joinRoomSuccessData.list_buy_gate.length; i++) {
              let playerData = joinRoomSuccessData.list_buy_gate[i];
              this.panelPayDoor.addUser(playerData["nickname"], playerData["money"], joinRoomSuccessData.moneyRemain);
            }
          }
          break;

         case 4:
         case 5:
          break;

         case 6:
          {
            msg = "B\u1eaft \u0111\u1ea7u tr\u1ea3 th\u01b0\u1edfng";
            this.lastDicesResult = joinRoomSuccessData.diceIDs;
            let countRed = 0;
            let countWhite = 0;
            for (let i = 0; i < joinRoomSuccessData.diceIDs.length; i++) {
              1 == joinRoomSuccessData.diceIDs[i] ? countRed++ : countWhite++;
              this.dices.children[i].getComponent(cc.Sprite).spriteFrame = 1 == joinRoomSuccessData.diceIDs[i] ? this.sfOdd : this.sfEven;
            }
            this.showDices();
            this.scheduleDoorsResult = () => {
              let isChan = (joinRoomSuccessData.diceIDs[0] + joinRoomSuccessData.diceIDs[1] + joinRoomSuccessData.diceIDs[2] + joinRoomSuccessData.diceIDs[3]) % 2 == 0;
              let isLe3do1trang = countRed - countWhite == 2;
              let isLe3trang1do = countWhite - countRed == 2;
              let isChan4do = countRed - countWhite == 4;
              let isChan4trang = countWhite - countRed == 4;
              let doorWins = [];
              if (isChan) {
                doorWins.push(0);
                this.btnPayBets[0].hightlight();
                if (isChan4do) {
                  doorWins.push(3);
                  this.btnPayBets[3].hightlight();
                } else if (isChan4trang) {
                  doorWins.push(2);
                  this.btnPayBets[2].hightlight();
                }
              } else {
                doorWins.push(1);
                this.btnPayBets[1].hightlight();
                if (isLe3do1trang) {
                  doorWins.push(4);
                  this.btnPayBets[4].hightlight();
                } else if (isLe3trang1do) {
                  doorWins.push(5);
                  this.btnPayBets[5].hightlight();
                }
              }
            };
            this.scheduleOnce(this.scheduleDoorsResult, 2);
          }
        }
        if ("" != msg) {
          this.dealer.addAnimation(0, "normal", true);
          this.lbDealerMsg.string = msg;
          this.lbDealerMsg.node.active = false;
          this.scheduleOnce(() => {
            this.lbDealerMsg.node.active = true;
            this.scheduleOnce(() => {
              this.lbDealerMsg.node.active = false;
            }, .9);
          }, .3);
        }
        XocDia_NetworkClient_1.default.getInstance().send(new XocDia_Cmd_1.default.CmdSendGetCau());
      }
      receivedUserJoinRoom(userJoinRoomData) {
        let player = this.getRandomEmptyPlayer();
        if (null != player) player.set(userJoinRoomData.nickname, userJoinRoomData.avatar, userJoinRoomData.money, false); else {
          this.hidePlayers.add(userJoinRoomData);
          this.hidePlayers.showNumberPlayer();
        }
      }
      receivedUserOutRoom(userOutRoomData) {
        let player = this.getPlayer(userOutRoomData.nickname);
        if (null != player) {
          player.leave();
          let pl = this.getRandomEmptyPlayer();
          if (pl) {
            let _pl = this.hidePlayers.removeFirst();
            _pl && pl.set(_pl.nickname, _pl.avatar, _pl.money, false);
          }
        } else {
          this.hidePlayers.remove(userOutRoomData);
          this.hidePlayers.showNumberPlayer();
        }
      }
      receivedLeavedRoom(leavedRoomData) {
        switch (leavedRoomData.reason) {
         case 1:
          App_1.default.instance.alertDialog.showMsg("B\u1ea1n kh\xf4ng \u0111\u1ee7 ti\u1ec1n \u0111\u1ec3 tham gia ph\xf2ng!");
          break;

         case 2:
          App_1.default.instance.alertDialog.showMsg("H\u1ec7 th\u1ed1ng \u0111ang t\u1ea1m th\u1eddi b\u1ea3o tr\xec!");
          break;

         case 3:
          this.hidePlayers.clear();
          XocDia_NetworkClient_1.default.getInstance().close();
          break;

         case 5:
          App_1.default.instance.alertDialog.showMsg("B\u1ea1n b\u1ecb m\u1eddi ra kh\u1ecfi ph\xf2ng v\xec qu\xe1 l\xe2u kh\xf4ng t\u01b0\u01a1ng t\xe1c!");
          break;

         case 6:
          App_1.default.instance.alertDialog.showMsg("Nh\xe0 c\xe1i \u0111\xe3 kick b\u1ea1n ra kh\u1ecfi ph\xf2ng!");
        }
      }
      receivedLeaveRoom(leaveRoomData) {
        if (leaveRoomData.nickname !== Configs_1.default.Login.Nickname) return;
        App_1.default.instance.alertDialog.showMsg(leaveRoomData.bRegis ? "\u0110\xe3 \u0111\u0103ng k\xfd r\u1eddi ph\xf2ng." : "\u0110\xe3 hu\u1ef7 \u0111\u0103ng k\xfd r\u1eddi ph\xf2ng.");
      }
      receivedActionInGame(actionInGameData) {
        let msg = "";
        this.gameState = actionInGameData.action;
        switch (actionInGameData.action) {
         case 1:
          msg = "B\u1eaft \u0111\u1ea7u v\xe1n m\u1edbi";
          this.lbProgressTime.node.parent.active = false;
          break;

         case 2:
          msg = "B\u1eaft \u0111\u1ea7u \u0111\u1eb7t c\u1eeda";
          this.lbProgressTime.node.parent.active = true;
          this.setTimeCountDown(actionInGameData.time);
          break;

         case 3:
         case 4:
         case 5:
          this.lbProgressTime.node.parent.active = false;
          break;

         case 6:
          msg = "B\u1eaft \u0111\u1ea7u tr\u1ea3 th\u01b0\u1edfng";
          this.lbProgressTime.node.parent.active = false;
        }
        if ("" != msg) {
          this.dealer.addAnimation(0, "normal", true);
          this.lbDealerMsg.string = msg;
          this.lbDealerMsg.node.active = false;
          this.scheduleOnce(() => {
            this.lbDealerMsg.node.active = true;
            this.scheduleOnce(() => {
              this.lbDealerMsg.node.active = false;
            }, .9);
          }, .3);
        }
      }
      receivedStartGame(startGameData) {
        this.lastDicesResult = null;
        this.unschedule(this.scheduleDicesResult);
        this.unschedule(this.scheduleDoorsResult);
        this.dices.children.forEach(child => {
          cc.Tween.stopAllByTarget(child);
          child.y = 0;
        });
        this.dices.active = false;
        this.lbGameId.string = "#" + startGameData.gameId;
        "" != startGameData.banker && startGameData.banker != Configs_1.default.Login.Nickname && this.isBanker && App_1.default.instance.alertDialog.showMsg("B\u1ea1n kh\xf4ng \u0111\u1ee7 ti\u1ec1n \u0111\u1ec3 ti\u1ebfp t\u1ee5c l\xe0m c\xe1i!");
        this.banker = startGameData.banker;
        this.isBanker = this.banker == Configs_1.default.Login.Nickname;
        for (let i = 0; i < this.players.length; i++) {
          let player = this.players[i];
          player.banker.active = "" != player.nickname && player.nickname == this.banker;
        }
        this.btnPayBets.forEach(e => e.reset());
        this.clearChips();
        Common_AudioManager_1.default.getInstance().playEffectByGame(Configs_1.default.App.BUNDLE_NAME.XOCDIA, this.startBetSound);
        this.scheduleOnce(() => {
          Common_AudioManager_1.default.getInstance().playEffectByGame(Configs_1.default.App.BUNDLE_NAME.XOCDIA, this.xocxocSound);
          this.bowl.node.active = true;
          this.bowl.setAnimation(0, "xoc", false);
        }, 1);
      }
      receivedPutMoney(putMoneyData) {
        var _a, _b;
        let btnPayBet = this.btnPayBets[putMoneyData.potId];
        if (putMoneyData.nickname == Configs_1.default.Login.Nickname) {
          btnPayBet.setTotalBet(putMoneyData.potMoney, putMoneyData.betMoney);
          switch (putMoneyData.error) {
           case 0:
            break;

           case 1:
            App_1.default.instance.alertDialog.showMsg("L\u1ed7i tr\u1eeb ti\u1ec1n!");
            return;

           case 2:
            App_1.default.instance.alertDialog.showMsg("B\u1ea1n kh\xf4ng \u0111\u1ee7 ti\u1ec1n!");
            return;

           default:
            App_1.default.instance.alertDialog.showMsg("L\u1ed7i " + putMoneyData.error + ", kh\xf4ng x\xe1c \u0111\u1ecbnh.");
            return;
          }
          Configs_1.default.Login.Coin = putMoneyData.currentMoney;
          BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN);
        } else btnPayBet.setTotalBet(putMoneyData.potMoney);
        let player = this.getPlayer(putMoneyData.nickname);
        null != player && player.setCoin(putMoneyData.currentMoney);
        let listCoin = this.convertMoneyToChipMoney(putMoneyData.betMoney);
        listCoin.length <= 0 && listCoin.push(this.listBets[0]);
        for (let i = 0; i < listCoin.length; i++) {
          let chip = this.getChip(listCoin[i]);
          const playerNode = player ? player.node : this.hidePlayers.node;
          chip.active = true;
          chip.name = putMoneyData.nickname;
          chip.position = null === (_a = chip.parent) || void 0 === _a ? void 0 : _a.convertToNodeSpaceAR(playerNode.parent.convertToWorldSpaceAR(playerNode.position));
          this.chipsInDoors.hasOwnProperty(putMoneyData.potId) || (this.chipsInDoors[putMoneyData.potId] = []);
          this.chipsInDoors[putMoneyData.potId].push(chip);
          let position = null === (_b = chip.parent) || void 0 === _b ? void 0 : _b.convertToNodeSpaceAR(btnPayBet.node.parent.convertToWorldSpaceAR(btnPayBet.node.position));
          position.x += Random_1.default.rangeInt(-25, 25);
          position.y += Random_1.default.rangeInt(-20, 20);
          chip.runAction(cc.sequence(cc.moveTo(.35, cc.v2(position)).easing(cc.easeSineOut()), cc.delayTime(.8), cc.fadeOut(.2)));
        }
        this.currentChipAudioID && cc.audioEngine.stopEffect(this.currentChipAudioID);
        this.currentChipAudioID = Common_AudioManager_1.default.getInstance().playEffectByGame(Configs_1.default.App.BUNDLE_NAME.XOCDIA, this.chipSound);
      }
      receivedSellGate(shellGateData) {
        1 != shellGateData.action;
      }
      receivedBuyGate(buyGateData) {
        if (buyGateData.nickname == Configs_1.default.Login.Nickname) {
          let msg = "";
          switch (buyGateData.error) {
           case 0:
            break;

           case 1:
            msg = "B\u1ea1n kh\xf4ng \u0111\u1ee7 ti\u1ec1n \u0111\u1ec3 mua c\u1eeda!";
            break;

           case 2:
            msg = "Nh\xe0 c\xe1i \u0111\xe3 b\xe1n c\u1eeda xong!";
            break;

           default:
            msg = "L\u1ed7i " + buyGateData.error + ", kh\xf4ng x\xe1c \u0111\u1ecbnh.";
          }
          if ("" != msg) {
            App_1.default.instance.alertDialog.showMsg(msg);
            return;
          }
        }
        this.panelPayDoor.addUser(buyGateData.nickname, buyGateData.moneyBuy, buyGateData.rmMoneySell);
        let player = this.getPlayer(buyGateData.nickname);
        player && player.setCoin(buyGateData.currentMoney);
      }
      receivedRefundMoney(refundMoneyData) {
        this.panelPayDoor.node.active = false;
        this.bankerControl.node.active = false;
        for (let i = 0; i < refundMoneyData.playerInfosRefund.length; i++) {
          let rfData = refundMoneyData.playerInfosRefund[i];
          let player = this.getPlayer(rfData["nickname"]);
          if (null != player) {
            player.showRefundCoin(rfData["moneyRefund"]);
            player.setCoin(rfData["currentMoney"]);
          }
          if (rfData["nickname"] == Configs_1.default.Login.Nickname) {
            Configs_1.default.Login.Coin = rfData["currentMoney"];
            BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN);
            const refundPot = parseInt(rfData.pots);
            if (!isNaN(refundPot)) {
              if (rfData.moneyRefund === this.btnPayBets[refundPot].getTotalMyBet()) {
                let chips = this.chipsInDoors[refundPot];
                chips.filter(chip => chip.name === Configs_1.default.Login.Nickname).forEach(chip => chips.splice(chips.findIndex(e => e.name === chip.name), 1));
              }
              this.btnPayBets[refundPot].addTotalMyBet(-rfData.moneyRefund);
            }
          }
        }
        for (let i = 0; i < refundMoneyData.potID.length; i++) {
          let potData = refundMoneyData.potID[i];
          this.btnPayBets[i].setTotalBet(potData["totalMoney"]);
        }
      }
      showDices() {
        this.bowl.node.active = true;
        this.bowl.setAnimation(0, "open", false);
        this.scheduleDicesResult = () => {
          this.dices.active = true;
          this.dices.children.forEach((child, i) => {
            cc.tween(child).to(.01, {
              opacity: 0
            }).delay(.15 + .1 * i).to(.01, {
              opacity: 255
            }).by(.01, {
              position: cc.v3(0, 300, 0)
            }).by(.1, {
              position: cc.v3(0, -350, 0)
            }).by(.02, {
              position: cc.v3(0, 30, 0)
            }).start();
          });
        };
        this.scheduleOnce(this.scheduleDicesResult, .9);
      }
      receivedFinishGame(finishGameData) {
        this.lastDicesResult = finishGameData.diceIDs;
        this.panelPayDoor.node.active = false;
        this.bankerControl.node.active = false;
        let countRed = 0;
        let countWhite = 0;
        for (let i = 0; i < finishGameData.diceIDs.length; i++) {
          1 == finishGameData.diceIDs[i] ? countRed++ : countWhite++;
          this.dices.children[i].getComponent(cc.Sprite).spriteFrame = 1 == finishGameData.diceIDs[i] ? this.sfOdd : this.sfEven;
        }
        this.showDices();
        this.scheduleOnce(() => {
          let isChan = (finishGameData.diceIDs[0] + finishGameData.diceIDs[1] + finishGameData.diceIDs[2] + finishGameData.diceIDs[3]) % 2 == 0;
          let isLe3do1trang = countRed - countWhite == 2;
          let isLe3trang1do = countWhite - countRed == 2;
          let isChan4do = countRed - countWhite == 4;
          let isChan4trang = countWhite - countRed == 4;
          let doorWins = [];
          if (isChan) {
            doorWins.push(0);
            this.btnPayBets[0].hightlight();
            if (isChan4do) {
              doorWins.push(3);
              this.btnPayBets[3].hightlight();
            } else if (isChan4trang) {
              doorWins.push(2);
              this.btnPayBets[2].hightlight();
            }
          } else {
            doorWins.push(1);
            this.btnPayBets[1].hightlight();
            if (isLe3do1trang) {
              doorWins.push(4);
              this.btnPayBets[4].hightlight();
            } else if (isLe3trang1do) {
              doorWins.push(5);
              this.btnPayBets[5].hightlight();
            }
          }
          let chipsWithNickname = {};
          for (let k in this.chipsInDoors) {
            let doorId = parseInt(k);
            let chips = this.chipsInDoors[doorId];
            if (-1 == doorWins.indexOf(doorId)) for (let i = 0; i < chips.length; i++) chips[i].runAction(cc.sequence(cc.moveTo(.5, this.dealerHandPoint.getPosition()).easing(cc.easeSineOut()), cc.removeSelf())); else for (let i = 0; i < chips.length; i++) {
              let chip = chips[i];
              let nickname = chip.name;
              chipsWithNickname.hasOwnProperty(nickname) || (chipsWithNickname[nickname] = []);
              chipsWithNickname[nickname].push(chip);
            }
          }
          this.scheduleOnce(() => {
            var _a, _b;
            for (let k in chipsWithNickname) {
              const player = this.getPlayer(k);
              const playerNode = player ? player.node : this.hidePlayers.node;
              const chips = chipsWithNickname[k];
              for (let i = 0; i < chips.length; i++) {
                let chip = chips[i];
                chip.setContentSize(28, 28);
                chip.runAction(cc.sequence(cc.delayTime(.01 * chips.length - .01 * i + 1), cc.moveTo(.5, null === (_a = chip.parent) || void 0 === _a ? void 0 : _a.convertToNodeSpaceAR(playerNode.parent.convertToWorldSpaceAR(playerNode.getPosition()))).easing(cc.easeSineOut()), cc.callFunc(() => {
                  chip.active = false;
                })));
                let dealerChip = this.getChip(0);
                dealerChip.getComponent(cc.Sprite).spriteFrame = chip.getComponent(cc.Sprite).spriteFrame;
                dealerChip.opacity = 0;
                dealerChip.setContentSize(28, 28);
                dealerChip.position = this.dealerHandPoint.position;
                dealerChip.runAction(cc.sequence(cc.fadeIn(.2), cc.delayTime(.01 * chips.length - .02 * i + .3), cc.moveTo(.5, null === (_b = chip.parent) || void 0 === _b ? void 0 : _b.convertToNodeSpaceAR(playerNode.parent.convertToWorldSpaceAR(playerNode.getPosition()))).easing(cc.easeSineOut()), cc.callFunc(() => {
                  dealerChip.active = false;
                })));
              }
            }
            for (let i = 0; i < finishGameData.playerInfoWin.length; i++) {
              let playerData = finishGameData.playerInfoWin[i];
              let player = this.getPlayer(playerData["nickname"]);
              if (null != player) {
                player.showWinCoin(playerData["moneyWin"]);
                player.setCoin(playerData["currentMoney"]);
                if (playerData["nickname"] == Configs_1.default.Login.Nickname) {
                  Configs_1.default.Login.Coin = playerData["currentMoney"];
                  BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN);
                  playerData["moneyWin"] > 0 && Common_AudioManager_1.default.getInstance().playEffectByGame(Configs_1.default.App.BUNDLE_NAME.XOCDIA, this.winSound);
                }
              }
            }
          }, 3);
        }, 2);
        if (this.isBanker) {
          this.players[this.players.length - 1].showWinCoin(finishGameData.moneyBankerExchange);
          this.players[this.players.length - 1].setCoin(finishGameData.moneyBankerAfter);
          Configs_1.default.Login.Coin = finishGameData.moneyBankerAfter;
          BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN);
        }
        XocDia_NetworkClient_1.default.getInstance().send(new XocDia_Cmd_1.default.CmdSendGetCau());
      }
      receivedSoiCau(soiCauData) {
        this.lblHistoryOdd.string = Utils_1.default.formatNumber(soiCauData.totalOdd);
        this.lblHistoryEven.string = Utils_1.default.formatNumber(soiCauData.totalEven);
        for (let i = 0; i < this.lblHistoryItems.childrenCount; i++) if (i < soiCauData.arrayCau.length) {
          this.lblHistoryItems.children[i].getComponent(cc.Sprite).spriteFrame = 0 == soiCauData.arrayCau[i] ? this.sfEven : this.sfOdd;
          this.lblHistoryItems.children[i].active = true;
        } else this.lblHistoryItems.children[i].active = false;
      }
      receivedOrderBanker(orderBankerData) {
        switch (orderBankerData.error) {
         case 0:
          break;

         case 1:
          App_1.default.instance.alertDialog.showMsg("B\u1ea1n c\u1ea7n " + Utils_1.default.formatNumber(orderBankerData.moneyRequire) + " Xu \u0111\u1ec3 l\xe0m c\xe1i!");
          break;

         default:
          App_1.default.instance.alertDialog.showMsg("L\u1ed7i " + orderBankerData.error + ", kh\xf4ng x\xe1c \u0111\u1ecbnh.");
        }
      }
      receivedCancelBanker(cancelBankerData) {
        cancelBankerData.bDestroy && this.isBanker && App_1.default.instance.alertDialog.showMsg("\u0110\u0103ng k\xfd hu\u1ef7 l\xe0m c\xe1i th\xe0nh c\xf4ng.");
      }
      receivedInfoGateSell(infoGateSellData) {
        this.bankerControl.show(infoGateSellData.moneyOdd, infoGateSellData.moneyEven);
      }
      receivedChatRoom(chatRoomData) {
        if (0 === chatRoomData.error) {
          let player = this.getPlayer(chatRoomData.nickname);
          if (!player) return;
          let isIcon = chatRoomData.isIcon;
          let content = chatRoomData.content;
          isIcon ? player.showChatEmotion(content) : player.showChatMsg(content);
        } else App_1.default.instance.actiontDialog.showMsgWithActions(chatRoomData.desc, chatRoomData.suggestionActions);
      }
      actNextPageBet() {
        this.btnBetParent.scrollToRight(.5);
      }
      actPrevPageBet() {
        this.btnBetParent.scrollToLeft(.5);
      }
      actBuyGate() {
        XocDia_NetworkClient_1.default.getInstance().send(new XocDia_Cmd_1.default.SendBuyGate(this.panelPayDoor.coin));
      }
      actOrderBanker() {
        XocDia_NetworkClient_1.default.getInstance().send(new XocDia_Cmd_1.default.SendOrderBanker());
      }
      actCancelBanker() {
        XocDia_NetworkClient_1.default.getInstance().send(new XocDia_Cmd_1.default.SendCancelBanker());
      }
      switchSettingPanel(event, eventData) {
        let panel = event.target.getChildByName("panel");
        if (panel.active) panel.runAction(cc.sequence(cc.scaleTo(.15, 0, 0), cc.callFunc(temp => {
          temp.active = false;
        }))); else {
          panel.active = true;
          panel.scale = 0;
          panel.runAction(cc.sequence(cc.scaleTo(.15, 1, 1), cc.callFunc(temp => {})));
        }
      }
      onKickFromRoom(reason) {
        let msg = "B\u1ea1n b\u1ecb kick kh\u1ecfi b\xe0n ch\u01a1i!";
        switch (reason) {
         case XocDia_Constant_1.XocDiaContant.KickReasonCodes.ERROR_MONEY:
          msg = "Ti\u1ec1n trong b\xe0n kh\xf4ng \u0111\u1ee7 \u0111\u1ec3 ti\u1ebfp t\u1ee5c!";
          break;

         case XocDia_Constant_1.XocDiaContant.KickReasonCodes.ERROR_BAO_TRI:
          msg = "H\u1ec7 th\u1ed1ng b\u1ea3o tr\xec!";
        }
        XocDia_NetworkClient_1.default.getInstance().close();
        this.scheduleOnce(() => {
          App_1.default.instance.alertDialog.showMsg(msg);
        }, .5);
      }
      actShowChat() {
        this.panelChat.show();
      }
      actSetting() {
        PopupSettingInGame_1.default.createAndShow(this.node, Configs_1.default.App.BUNDLE_NAME.XOCDIA, null, () => {
          XocDia_NetworkClient_1.default.getInstance().send(new XocDia_Cmd_1.default.SendLeaveRoom());
        });
      }
      actGuide() {
        XocDia_PopupGuide_1.default.createAndShow(this.node);
      }
      actHistory() {
        this.lblHistoryItems.parent.active = !this.lblHistoryItems.parent.active;
      }
    };
    __decorate([ property(cc.Label) ], XocDiaController.prototype, "lbGameId", void 0);
    __decorate([ property([ XocDia_Player_1.default ]) ], XocDiaController.prototype, "players", void 0);
    __decorate([ property(XocDia_HidePlayer_1.default) ], XocDiaController.prototype, "hidePlayers", void 0);
    __decorate([ property(cc.Node) ], XocDiaController.prototype, "btnBetTempl", void 0);
    __decorate([ property(cc.ScrollView) ], XocDiaController.prototype, "btnBetParent", void 0);
    __decorate([ property(cc.Button) ], XocDiaController.prototype, "btn_next_bet", void 0);
    __decorate([ property(cc.Button) ], XocDiaController.prototype, "btn_pre_bet", void 0);
    __decorate([ property([ XocDia_BtnPayBet_1.default ]) ], XocDiaController.prototype, "btnPayBets", void 0);
    __decorate([ property(sp.Skeleton) ], XocDiaController.prototype, "dealer", void 0);
    __decorate([ property(cc.Label) ], XocDiaController.prototype, "lbDealerMsg", void 0);
    __decorate([ property(cc.Node) ], XocDiaController.prototype, "dealerHandPoint", void 0);
    __decorate([ property(sp.Skeleton) ], XocDiaController.prototype, "bowl", void 0);
    __decorate([ property(cc.Node) ], XocDiaController.prototype, "dices", void 0);
    __decorate([ property([ cc.SpriteFrame ]) ], XocDiaController.prototype, "sprChips", void 0);
    __decorate([ property([ cc.SpriteFrame ]) ], XocDiaController.prototype, "sprChipSmalls", void 0);
    __decorate([ property(cc.Node) ], XocDiaController.prototype, "chips", void 0);
    __decorate([ property(cc.Node) ], XocDiaController.prototype, "chipTemplate", void 0);
    __decorate([ property(cc.Label) ], XocDiaController.prototype, "lbProgressTime", void 0);
    __decorate([ property(XocDia_PanelPayDoor_1.default) ], XocDiaController.prototype, "panelPayDoor", void 0);
    __decorate([ property(cc.Label) ], XocDiaController.prototype, "lblHistoryOdd", void 0);
    __decorate([ property(cc.Label) ], XocDiaController.prototype, "lblHistoryEven", void 0);
    __decorate([ property(cc.SpriteFrame) ], XocDiaController.prototype, "sfOdd", void 0);
    __decorate([ property(cc.SpriteFrame) ], XocDiaController.prototype, "sfEven", void 0);
    __decorate([ property(cc.Node) ], XocDiaController.prototype, "lblHistoryItems", void 0);
    __decorate([ property(XocDia_BankerControl_1.default) ], XocDiaController.prototype, "bankerControl", void 0);
    __decorate([ property(cc.AudioClip) ], XocDiaController.prototype, "backgroundMusic", void 0);
    __decorate([ property(cc.AudioClip) ], XocDiaController.prototype, "chipSound", void 0);
    __decorate([ property(cc.AudioClip) ], XocDiaController.prototype, "xocxocSound", void 0);
    __decorate([ property(cc.AudioClip) ], XocDiaController.prototype, "startBetSound", void 0);
    __decorate([ property(cc.AudioClip) ], XocDiaController.prototype, "winSound", void 0);
    __decorate([ property(cc.AudioClip) ], XocDiaController.prototype, "countDownSound", void 0);
    __decorate([ property(XocDia_PanelChat_1.default) ], XocDiaController.prototype, "panelChat", void 0);
    XocDiaController = __decorate([ ccclass ], XocDiaController);
    exports.default = XocDiaController;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/App": void 0,
    "../../Main/Game/src/common/BroadcastReceiver": void 0,
    "../../Main/Game/src/common/Common.AudioManager": void 0,
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/common/Random": void 0,
    "../../Main/Game/src/common/Utils": void 0,
    "../../Main/Game/src/games/cardgames/PopupSettingInGame": void 0,
    "../../Main/Game/src/networks/Network.InPacket": void 0,
    "./XocDia.BankerControl": "XocDia.BankerControl",
    "./XocDia.BtnBet": "XocDia.BtnBet",
    "./XocDia.BtnPayBet": "XocDia.BtnPayBet",
    "./XocDia.Cmd": "XocDia.Cmd",
    "./XocDia.Constant": "XocDia.Constant",
    "./XocDia.HidePlayer": "XocDia.HidePlayer",
    "./XocDia.NetworkClient": "XocDia.NetworkClient",
    "./XocDia.PanelChat": "XocDia.PanelChat",
    "./XocDia.PanelPayDoor": "XocDia.PanelPayDoor",
    "./XocDia.Player": "XocDia.Player",
    "./XocDia.PopupGuide": "XocDia.PopupGuide"
  } ],
  "XocDia.HidePlayer": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "04f40MCZeBCxr0bk0BMWIec", "XocDia.HidePlayer");
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
    let HidePlayer = class HidePlayer extends cc.Component {
      constructor() {
        super(...arguments);
        this.chatEmotion = null;
        this.chatMsg = null;
        this.lbNumPlayer = null;
        this.players = [];
      }
      add(player) {
        this.players.push(player);
      }
      remove(player) {
        let index = this.players.findIndex(pl => pl.nickname == player.nickname);
        index > -1 && this.players.splice(index, 1);
      }
      removeFirst() {
        return this.players.shift();
      }
      clear() {
        this.players = [];
        this.showNumberPlayer();
      }
      showNumberPlayer() {
        this.lbNumPlayer.string = this.players.length.toString();
      }
    };
    __decorate([ property(cc.Node) ], HidePlayer.prototype, "chatEmotion", void 0);
    __decorate([ property(cc.Node) ], HidePlayer.prototype, "chatMsg", void 0);
    __decorate([ property(cc.Label) ], HidePlayer.prototype, "lbNumPlayer", void 0);
    HidePlayer = __decorate([ ccclass ], HidePlayer);
    exports.default = HidePlayer;
    cc._RF.pop();
  }, {} ],
  "XocDia.NetworkClient": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "559afJVJ/VI9oOTOdKdpXFq", "XocDia.NetworkClient");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Network_NetworkClient_1 = require("../../Main/Game/src/networks/Network.NetworkClient");
    const Network_NetworkListener_1 = require("../../Main/Game/src/networks/Network.NetworkListener");
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    class XocDiaNetworkClient extends Network_NetworkClient_1.default {
      constructor() {
        super();
        this.listeners = new Array();
        this.isUseWSS = Configs_1.default.App.USE_WSS;
      }
      static getInstance() {
        null == this.instance && (this.instance = new XocDiaNetworkClient());
        return this.instance;
      }
      connect() {
        super.connect(Configs_1.default.App.HOST_XOCDIA.host, Configs_1.default.App.HOST_XOCDIA.port);
      }
      onOpen(ev) {
        super.onOpen(ev);
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
      }
      addListener(callback, target) {
        this.listeners.push(new Network_NetworkListener_1.default(target, callback));
      }
      send(packet) {
        for (var b = new Int8Array(packet._length), c = 0; c < packet._length; c++) b[c] = packet._data[c];
        null != this.ws && this.isConnected() && this.ws.send(b.buffer);
      }
    }
    exports.default = XocDiaNetworkClient;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/networks/Network.NetworkClient": void 0,
    "../../Main/Game/src/networks/Network.NetworkListener": void 0
  } ],
  "XocDia.PanelChat": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "812bffRWHdPj6XVvpWuYXyd", "XocDia.PanelChat");
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
    const XocDia_Cmd_1 = require("./XocDia.Cmd");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let XocDiaPanelChat = class XocDiaPanelChat extends cc.Component {
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
           case XocDia_Cmd_1.default.Code.LOG_CHAT:
            {
              let res = new XocDia_Cmd_1.default.ReceiveLogChat(data);
              cc.log(res);
              if (res.chatChannel !== Constants_1.ChatChannel.XOC_DIA) break;
              var msgs = JSON.parse(res.message);
              for (var i = 0; i < msgs.length; i++) this.addChat(msgs[i]["u"], msgs[i]["m"], msgs[i]["vipId"]);
              break;
            }

           case XocDia_Cmd_1.default.Code.SEND_CHAT:
            {
              let res = new XocDia_Cmd_1.default.ReceiveSendChat(data);
              cc.log(res);
              if (res.chatChannel !== Constants_1.ChatChannel.XOC_DIA) break;
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
          position: cc.v3((cc.winSize.width + this.container.width) / 2, -(cc.winSize.height - this.container.height) / 2 + 115)
        }).to(.5, {
          position: cc.v3((cc.winSize.width - this.container.width) / 2, -(cc.winSize.height - this.container.height) / 2 + 115)
        }, {
          easing: cc.easing.backOut
        }).call(() => {
          MiniGameNetworkClient_1.default.getInstance().send(new XocDia_Cmd_1.default.SendScribeChat());
        }).start();
      }
      dismiss() {
        cc.tween(this.container).to(.5, {
          position: cc.v3((cc.winSize.width + this.container.width) / 2, -(cc.winSize.height - this.container.height) / 2 + 115)
        }, {
          easing: cc.easing.backIn
        }).call(() => {
          MiniGameNetworkClient_1.default.getInstance().send(new XocDia_Cmd_1.default.SendUnScribeChat());
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
        MiniGameNetworkClient_1.default.getInstance().send(new XocDia_Cmd_1.default.SendChat(unescape(encodeURIComponent(msg))));
      }
    };
    __decorate([ property(cc.Node) ], XocDiaPanelChat.prototype, "container", void 0);
    __decorate([ property(cc.Node) ], XocDiaPanelChat.prototype, "itemChatTemplate", void 0);
    __decorate([ property(cc.ScrollView) ], XocDiaPanelChat.prototype, "scrollChat", void 0);
    __decorate([ property(cc.EditBox) ], XocDiaPanelChat.prototype, "edbChat", void 0);
    __decorate([ property(cc.SpriteAtlas) ], XocDiaPanelChat.prototype, "atlasVip", void 0);
    XocDiaPanelChat = __decorate([ ccclass ], XocDiaPanelChat);
    exports.default = XocDiaPanelChat;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/App": void 0,
    "../../Main/Game/src/common/BroadcastReceiver": void 0,
    "../../Main/Game/src/common/Constants": void 0,
    "../../Main/Game/src/common/Utils": void 0,
    "../../Main/Game/src/networks/MiniGameNetworkClient": void 0,
    "../../Main/Game/src/networks/Network.InPacket": void 0,
    "./XocDia.Cmd": "XocDia.Cmd"
  } ],
  "XocDia.PanelPayDoor": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "089fbucxjFKWpNuCc5T8uJY", "XocDia.PanelPayDoor");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const BroadcastReceiver_1 = require("../../Main/Game/src/common/BroadcastReceiver");
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let PanelPayDoor = class PanelPayDoor extends cc.Component {
      constructor() {
        super(...arguments);
        this.title1 = null;
        this.title2 = null;
        this.itemTemplate = null;
        this.slider = null;
        this.lblCoin = null;
        this.coin = 1;
        this.minCoin = 1;
        this.maxCoin = 0;
      }
      start() {
        BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.SET_SOUND, this.node);
        this.slider.node.on("slide", () => {
          this.updateValue();
        });
      }
      show(action, maxCoin) {
        this.title1.string = this.title2.string = 2 == action ? "MUA CH\u1eb4N" : "MUA L\u1eba";
        this.coin = this.minCoin;
        this.maxCoin = maxCoin;
        this.node.active = true;
        this.itemTemplate.active = false;
        for (let i = 1; i < this.itemTemplate.parent.childrenCount; i++) this.itemTemplate.parent.children[i].destroy();
        this.slider.progress = 1;
        this.updateValue();
      }
      addUser(nickname, coin, newMaxCoin) {
        0 == newMaxCoin && (this.node.active = false);
        this.maxCoin = newMaxCoin;
        this.coin > this.maxCoin && (this.coin = this.maxCoin);
        this.slider.progress = this.coin / (this.maxCoin - this.minCoin);
        this.lblCoin.string = Utils_1.default.formatNumber(this.coin);
        let item = cc.instantiate(this.itemTemplate);
        item.parent = this.itemTemplate.parent;
        item.getChildByName("lblNickname").getComponent(cc.Label).string = nickname;
        item.getChildByName("lblCoin").getComponent(cc.Label).string = Utils_1.default.formatNumber(coin);
        item.active = true;
      }
      getCoin() {
        return this.coin;
      }
      updateValue() {
        this.coin = this.minCoin + Math.round((this.maxCoin - this.minCoin) * this.slider.progress);
        this.lblCoin.string = Utils_1.default.formatNumber(this.coin);
      }
    };
    __decorate([ property(cc.Label) ], PanelPayDoor.prototype, "title1", void 0);
    __decorate([ property(cc.Label) ], PanelPayDoor.prototype, "title2", void 0);
    __decorate([ property(cc.Node) ], PanelPayDoor.prototype, "itemTemplate", void 0);
    __decorate([ property(cc.Slider) ], PanelPayDoor.prototype, "slider", void 0);
    __decorate([ property(cc.Label) ], PanelPayDoor.prototype, "lblCoin", void 0);
    PanelPayDoor = __decorate([ ccclass ], PanelPayDoor);
    exports.default = PanelPayDoor;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/BroadcastReceiver": void 0,
    "../../Main/Game/src/common/Utils": void 0
  } ],
  "XocDia.Player": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b9c872R6XBD36zyQzVSxuur", "XocDia.Player");
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
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let Player = class Player extends cc.Component {
      constructor() {
        super(...arguments);
        this.chatEmotion = null;
        this.chatMsg = null;
        this.lblNickname = null;
        this.lblCoin = null;
        this.sprAvatar = null;
        this.winCoin = null;
        this.refundCoin = null;
        this.chipsPoint = null;
        this.chipsPoint2 = null;
        this.banker = null;
        this.maskNickname = null;
        this.maskCoin = null;
        this.nickname = "";
        this.avatar = "";
        this.timeoutChat = null;
      }
      start() {
        this.lblNickname.node.on("size-changed", () => {
          cc.Tween.stopAllByTarget(this.lblNickname.node);
          this.lblNickname.node.setPosition(0 === this.lblNickname.node.anchorX ? -this.maskNickname.width / 2 : 0, this.lblNickname.node.y);
          if (this.lblNickname.node.width > this.maskNickname.width) {
            let startX = -(this.lblNickname.node.width - this.maskNickname.width) / 2;
            let endX = -startX;
            if (0 === this.lblNickname.node.anchorX) {
              startX = -this.maskNickname.width / 2;
              endX = startX - (this.lblNickname.node.width - this.maskNickname.width);
            }
            startX -= 10;
            endX += 10;
            const moveDuration = Math.round((endX - startX) / 50);
            cc.tween(this.lblNickname.node).repeatForever(cc.tween().to(moveDuration, {
              position: cc.v3(startX)
            }).delay(2).to(moveDuration, {
              position: cc.v3(endX)
            }).delay(2)).start();
          }
        });
        this.lblCoin.node.on("size-changed", () => {
          cc.Tween.stopAllByTarget(this.lblCoin.node);
          this.lblCoin.node.setPosition(0 === this.lblCoin.node.anchorX ? -this.maskCoin.width / 2 : 0, this.lblCoin.node.y);
          if (this.lblCoin.node.width > this.maskCoin.width) {
            let startX = -(this.lblCoin.node.width - this.maskCoin.width) / 2;
            let endX = -startX;
            if (0 === this.lblCoin.node.anchorX) {
              startX = -this.maskCoin.width / 2;
              endX = startX - (this.lblCoin.node.width - this.maskCoin.width);
            }
            startX -= 10;
            endX += 10;
            const moveDuration = Math.ceil((endX - startX) / 50);
            cc.tween(this.lblCoin.node).repeatForever(cc.tween().to(moveDuration, {
              position: cc.v3(startX)
            }).delay(2).to(moveDuration, {
              position: cc.v3(endX)
            }).delay(2)).start();
          }
        });
      }
      leave() {
        this.nickname = "";
        this.winCoin.active = false;
        this.refundCoin.active = false;
        this.banker.active = false;
        this.unscheduleAllCallbacks();
      }
      set(nickname, avatar, coin, isBanker) {
        this.nickname = nickname;
        this.lblNickname.string = nickname;
        this.sprAvatar.spriteFrame = App_1.default.instance.getAvatarSpriteFrame(avatar);
        this.setCoin(coin);
        this.banker.active = isBanker;
      }
      setCoin(coin) {
        this.lblCoin.string = Utils_1.default.formatNumber(coin);
      }
      showWinCoin(coin) {
        this.winCoin.active = true;
        this.winCoin.getComponentInChildren(cc.Label).string = (coin >= 0 ? "+" : "") + Utils_1.default.formatNumber(coin);
        this.scheduleOnce(() => {
          this.winCoin.active = false;
        }, 4);
      }
      showRefundCoin(coin) {
        this.refundCoin.active = true;
        this.refundCoin.getComponentInChildren(cc.Label).string = (coin >= 0 ? "+" : "") + Utils_1.default.formatNumber(coin);
        this.scheduleOnce(() => {
          this.refundCoin.active = false;
        }, 4);
      }
      showChatEmotion(content) {
        this.chatEmotion.active = true;
        this.chatMsg.active = false;
        this.chatEmotion.getComponent(sp.Skeleton).setAnimation(0, content, true);
        this.unschedule(this.timeoutChat);
        this.timeoutChat = () => {
          this.chatEmotion.active = false;
          this.chatMsg.active = false;
        };
        this.scheduleOnce(this.timeoutChat, 3);
      }
      showChatMsg(content) {
        this.chatEmotion.active = false;
        this.chatMsg.active = true;
        this.chatMsg.children[1].getComponent(cc.Label).string = content;
        this.unschedule(this.timeoutChat);
        this.timeoutChat = () => {
          this.chatEmotion.active = false;
          this.chatMsg.active = false;
        };
        this.scheduleOnce(this.timeoutChat, 3);
      }
    };
    __decorate([ property(cc.Node) ], Player.prototype, "chatEmotion", void 0);
    __decorate([ property(cc.Node) ], Player.prototype, "chatMsg", void 0);
    __decorate([ property(cc.Label) ], Player.prototype, "lblNickname", void 0);
    __decorate([ property(cc.Label) ], Player.prototype, "lblCoin", void 0);
    __decorate([ property(cc.Sprite) ], Player.prototype, "sprAvatar", void 0);
    __decorate([ property(cc.Node) ], Player.prototype, "winCoin", void 0);
    __decorate([ property(cc.Node) ], Player.prototype, "refundCoin", void 0);
    __decorate([ property(cc.Node) ], Player.prototype, "chipsPoint", void 0);
    __decorate([ property(cc.Node) ], Player.prototype, "chipsPoint2", void 0);
    __decorate([ property(cc.Node) ], Player.prototype, "banker", void 0);
    __decorate([ property(cc.Node) ], Player.prototype, "maskNickname", void 0);
    __decorate([ property(cc.Node) ], Player.prototype, "maskCoin", void 0);
    Player = __decorate([ ccclass ], Player);
    exports.default = Player;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/App": void 0,
    "../../Main/Game/src/common/Utils": void 0
  } ],
  "XocDia.PopupGuide": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0e7066GdFNCOrY7oLet0dRH", "XocDia.PopupGuide");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var XocDiaPopupGuide_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const App_1 = require("../../Main/Game/src/common/App");
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    const Dialog_1 = require("../../Main/Game/src/common/Dialog");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let XocDiaPopupGuide = XocDiaPopupGuide_1 = class XocDiaPopupGuide extends Dialog_1.default {
      constructor() {
        super(...arguments);
        this.scrollPopupGuide = null;
      }
      static createAndShow(parent) {
        null == this.instance || null == this.instance.node ? App_1.default.instance.loadPrefabInBundle(Configs_1.default.App.BUNDLE_NAME.XOCDIA, Configs_1.default.App.UPDATE_INFO[Configs_1.default.App.BUNDLE_NAME.XOCDIA], true, "res/prefabs/XocDiaPopupGuide", (err, prefab) => {
          if (null != err) {
            App_1.default.instance.alertDialog.showMsg(err);
            return;
          }
          let go = cc.instantiate(prefab);
          go.parent = parent;
          this.instance = go.getComponent(XocDiaPopupGuide_1);
          this.instance.show();
        }) : this.instance.show();
      }
      show() {
        let contents = this.scrollPopupGuide.content.getComponentsInChildren(cc.Label);
        contents[0].string = "GI\u1edaI THI\u1ec6U:";
        contents[1].string = "- X\xf3c \u0111\u0129a l\xe0 tr\xf2 ch\u01a1i c\xf3 ngu\u1ed3n g\u1ed1c d\xe2n gian t\u1eeb l\xe2u \u0111\u1eddi, \u0111\u01b0\u1ee3c ch\xfang t\xf4i tri\u1ec3n khai cho t\u1ea5t c\u1ea3 th\u1ecb tr\u01b0\u1eddng tr\xean th\u1ebf gi\u1edbi. Tr\xf2 ch\u01a1i c\xf3 lu\u1eadt ch\u01a1i r\u1ea5t \u0111\u01a1n gi\u1ea3n, ch\u1ec9 g\u1ed3m 1 b\xe1t \xfap, 1 \u0111\u0129a v\xe0 4 \u0111\u1ed3ng xu. Trong \u0111\xf3, 4 \u0111\u1ed3ng xu \u0111\u01b0\u1ee3c thi\u1ebft k\u1ebf 2 m\u1eb7t \u0111\u1ecf v\xe0 xanh.\n- Qu\xfd kh\xe1ch ch\u1ec9 c\u1ea7n \u0111\u1eb7t c\u01b0\u1ee3c v\xe0o c\xe1c l\u1ef1a ch\u1ecdn(c\u1eeda) c\xf3 s\u1eb5n. K\u1ebft qu\u1ea3 th\u1eafng thua s\u1ebd ph\u1ee5 thu\u1ed9c v\xe0o s\u1ed1 m\u1eb7t \u0111\u1ecf ho\u1eb7c xanh \u0111\u01b0\u1ee3c l\u1eadt c\u1ee7a c\xe1c \u0111\u1ed3ng xu sau khi x\xf3c.\n\n";
        contents[2].string = "C\xc1CH CH\u01a0I:";
        contents[3].string = " - Qu\xfd kh\xe1ch ch\u1ecdn m\u1ec7nh gi\xe1 v\xe0 nh\u1ea5p v\xe0o l\u1ef1a ch\u1ecdn mu\u1ed1n \u0111\u1eb7t c\u01b0\u1ee3c tr\u01b0\u1edbc khi b\xe1t \u0111\u01b0\u1ee3c m\u1edf. N\u1ebfu k\u1ebft qu\u1ea3 m\u1edf ra tr\xf9ng v\u1edbi l\u1ef1a ch\u1ecdn, qu\xfd kh\xe1ch s\u1ebd th\u1eafng v\xe0 ng\u01b0\u1ee3c l\u1ea1i s\u1ebd thua to\xe0n b\u1ed9 ti\u1ec1n c\u01b0\u1ee3c n\xeau l\u1ef1a ch\u1ecdn sai.\n- Qu\xfd kh\xe1ch c\xf3 th\u1ec3 \u0111\u1eb7t c\u01b0\u1ee3c v\xe0o nhi\u1ec1u l\u1ef1a ch\u1ecdn c\xf9ng l\xfac v\xe0 kh\xf4ng b\u1ecb gi\u1edbi h\u1ea1n s\u1ed1 l\u1ea7n \u0111\u1eb7t c\u01b0\u1ee3c c\u0169ng nh\u01b0 s\u1ed1 ti\u1ec1n \u0111\u1eb7t c\u01b0\u1ee3c. L\u01b0u \xfd: Kh\xf4ng th\u1ec3 hu\u1ef7 c\u01b0\u1ee3c sau khi \u0111\u1eb7t.\n- Xu s\u1ebd \u0111\u01b0\u1ee3c x\xf3c v\xe0 k\u1ebft qu\u1ea3 c\u1eeda th\u1eafng s\u1ebd \u0111\u01b0\u1ee3c hi\u1ec3n th\u1ecb khi h\u1ebft th\u1eddi gian \u0111\u1eb7t c\u01b0\u1ee3c. Th\u1eddi gian \u0111\u1eb7t c\u01b0\u1ee3c cho m\u1ed7i phi\xean s\u1ebd \u0111\u01b0\u1ee3c hi\u1ec3n th\u1ecb \u0111\u1ebfm ng\u01b0\u1ee3c tr\xean b\xe0n ch\u01a1i.\n";
        contents[4].string = "TR\u1ea2 TH\u01af\u1edeNG:";
        contents[5].string = "- H\u1ec7 th\u1ed1ng s\u1ebd tr\u1ea3 th\u01b0\u1edfng ngay khi c\xf3 k\u1ebft qu\u1ea3.\n- Ti\u1ec1n tr\u1ea3 th\u01b0\u1edfng \u0111\xe3 bao g\u1ed3m ti\u1ec1n c\u01b0\u1ee3c.\n\n";
        contents[6].string = "QUY \u0110\u1ecaNH:";
        contents[7].string = "- Nh\xe0 ph\xe1t h\xe0nh c\xf3 quy\u1ec1n hu\u1ef7 ho\u1eb7c l\xe0m m\u1ea5t hi\u1ec7u l\u1ef1c \u0111\u1ed1i v\u1edbi m\u1ecdi l\u01b0\u1ee3t c\u01b0\u1ee3c trong c\xe1c tr\u01b0\u1eddng h\u1ee3p sau:\n    + H\u1ec7 th\u1ed1ng x\u1ea3y ra l\u1ed7i k\u1ef9 thu\u1eadt bao g\u1ed3m c\xe1c l\u1ed7i v\u1ec1 ph\u1ea7n m\u1ec1m, ph\u1ea7n c\u1ee9ng ho\u1eb7c m\u1ea1ng k\u1ebft n\u1ed1i.\n    + C\xf3 s\u1ef1 c\u1ed1 \u0111\u1ed9t xu\u1ea5t d\u1eabn \u0111\u1ebfn vi\u1ec7c s\u1eed d\u1ee5ng sai t\u1ef7 l\u1ec7 tr\u1ea3 th\u01b0\u1edfng.\n    + Kh\xe1ch h\xe0ng c\xf3 bi\u1ec3u hi\u1ec7n gian l\u1eadn, l\u1eeba \u0111\u1ea3o, r\u1eeda ti\u1ec1n hay c\xe1c ho\u1ea1t \u0111\u1ed9ng b\u1ea5t h\u1ee3p ph\xe1p kh\xe1c.\n- T\u1ea5t c\u1ea3 c\xe1c l\u01b0\u1ee3t c\u01b0\u1ee3c v\xe0o c\xe1c phi\xean c\u01b0\u1ee3c \u0111\u01b0\u1ee3c ch\u1ea5p nh\u1eadn v\u1eabn s\u1ebd c\xf3 hi\u1ec7u l\u1ef1c ngay c\u1ea3 sau khi th\xe0nh vi\xean \u0111\u0103ng xu\u1ea5t ho\u1eb7c b\u1ecb ng\u1eaft k\u1ebft n\u1ed1i kh\u1ecfi h\u1ec7 th\u1ed1ng game v\xec b\u1ea5t k\u1ef3 l\xfd do g\xec.\n";
        super.show();
        this.scrollPopupGuide.scrollToTop(0);
      }
    };
    XocDiaPopupGuide.instance = null;
    __decorate([ property(cc.ScrollView) ], XocDiaPopupGuide.prototype, "scrollPopupGuide", void 0);
    XocDiaPopupGuide = XocDiaPopupGuide_1 = __decorate([ ccclass ], XocDiaPopupGuide);
    exports.default = XocDiaPopupGuide;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/App": void 0,
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/common/Dialog": void 0
  } ]
}, {}, [ "XocDia.BankerControl", "XocDia.BtnBet", "XocDia.BtnPayBet", "XocDia.Cmd", "XocDia.Constant", "XocDia.Controller", "XocDia.HidePlayer", "XocDia.NetworkClient", "XocDia.PanelChat", "XocDia.PanelPayDoor", "XocDia.Player", "XocDia.PopupGuide" ]);