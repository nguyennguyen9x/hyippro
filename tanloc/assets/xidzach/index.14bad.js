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
  "XiDzach.CardUtil": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1aac8fFC7BGM4cs2SGAJJN1", "XiDzach.CardUtil");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.common = void 0;
    const {ccclass: ccclass, property: property} = cc._decorator;
    var common;
    (function(common) {
      class CardUtils {
        static getCardInfo(a) {
          this.id = a;
          this.so = this.getSoById(a);
          this.chat = this.getChatById(a);
          this.diem = this.getDiemById(a);
        }
        static getSoById(a) {
          return Math.floor(a / 4);
        }
        static getDiemById(a) {
          return Math.floor(a / 4) + 1;
        }
        static getChatById(a) {
          return a % 4;
        }
        static getNormalId(a) {
          var b = -1;
          b = 4 > a ? 11 : 8 > a ? 12 : Math.floor(a / 4) - 2;
          a = Math.floor(a % 4);
          3 == a ? a = 2 : 2 == a && (a = 3);
          return 4 * b + a;
        }
      }
      common.CardUtils = CardUtils;
    })(common = exports.common || (exports.common = {}));
    exports.default = common.CardUtils;
    cc._RF.pop();
  }, {} ],
  "XiDzach.Cmd": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "403c4d9o2NANr6BOsuG21Df", "XiDzach.Cmd");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.cmd = void 0;
    const Network_OutPacket_1 = require("../../Main/Game/src/networks/Network.OutPacket");
    const Network_InPacket_1 = require("../../Main/Game/src/networks/Network.InPacket");
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    var cmd;
    (function(cmd) {
      class Code {}
      Code.LOGIN = 1;
      Code.TOPSERVER = 1001;
      Code.CMD_PINGPONG = 1050;
      Code.CMD_JOIN_ROOM = 3001;
      Code.CMD_RECONNECT_ROOM = 3002;
      Code.MONEY_BET_CONFIG = 3003;
      Code.JOIN_ROOM_FAIL = 3004;
      Code.CHAT_ROOM = 3008;
      Code.CREATE_ROOM = 3013;
      Code.GET_LIST_ROOM = 3014;
      Code.JOIN_GAME_ROOM_BY_ID = 3015;
      Code.SELECT_DEALER = 3100;
      Code.MO_BAI = 3101;
      Code.BUY_IN = 3102;
      Code.KET_THUC = 3103;
      Code.CHIA_BAI = 3105;
      Code.TU_DONG_BAT_DAU = 3107;
      Code.REQUEST_SHOW_CARD = 3108;
      Code.REQUEST_BUY_IN = 3109;
      Code.THONG_TIN_BAN_CHOI = 3110;
      Code.DANG_KY_THOAT_PHONG = 3111;
      Code.DOI_CHUONG = 3113;
      Code.CHEAT_CARDS = 3115;
      Code.DANG_KY_CHOI_TIEP = 3116;
      Code.JOIN_ROOM_SUCCESS = 3118;
      Code.LEAVE_GAME = 3119;
      Code.NOTIFY_KICK_FROM_ROOM = 3120;
      Code.NEW_USER_JOIN = 3121;
      Code.NOTIFY_USER_GET_JACKPOT = 3122;
      Code.UPDATE_MATCH = 3123;
      Code.NOTIFY_CHUYEN_GIAI_DOAN_2 = 3124;
      Code.NOTIFY_CHUYEN_GIAI_DOAN_3 = 3125;
      Code.SO_BAI = 3126;
      Code.RUT_BAI = 3128;
      Code.DAN_BAI = 3129;
      Code.XET_BAI_ONE = 3130;
      Code.XET_BAI_ALL = 3131;
      Code.NOTIFY_NO_CHUONG = 3132;
      Code.RUT_BAI_TU_DONG = 3133;
      Code.NOTIFY_XIZACH = 3134;
      Code.CARDS_DEFINE = 3999;
      Code.PLAYER_STATUS_OUT_GAME = 0;
      Code.PLAYER_STATUS_VIEWER = 1;
      Code.PLAYER_STATUS_SITTING = 2;
      Code.PLAYER_STATUS_PLAYING = 3;
      Code.MAX_PLAYER = 6;
      Code.ERROR_MONEY = 1;
      Code.ERROR_BAO_TRI = 2;
      cmd.Code = Code;
      class CmdLogin extends Network_OutPacket_1.default {
        constructor(a, b) {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.LOGIN);
          this.packHeader();
          this.putString(a);
          this.putString(b);
          this.updateSize();
        }
      }
      cmd.CmdLogin = CmdLogin;
      class CmdJoinRoom extends Network_OutPacket_1.default {
        constructor(a, b, c) {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.CMD_JOIN_ROOM);
          this.packHeader();
          this.putInt(a);
          this.putInt(b);
          this.putLong(c);
          this.putInt(0);
          this.updateSize();
        }
      }
      cmd.CmdJoinRoom = CmdJoinRoom;
      class CmdReconnectRoom extends Network_OutPacket_1.default {
        constructor() {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.CMD_RECONNECT_ROOM);
          this.packHeader();
          this.updateSize();
        }
      }
      cmd.CmdReconnectRoom = CmdReconnectRoom;
      class SendRequestLeaveGame extends Network_OutPacket_1.default {
        constructor() {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.DANG_KY_THOAT_PHONG);
          this.packHeader();
          this.updateSize();
        }
      }
      cmd.SendRequestLeaveGame = SendRequestLeaveGame;
      class CmdSendHoldRoom extends Network_OutPacket_1.default {
        constructor() {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.DANG_KY_CHOI_TIEP);
          this.packHeader();
          this.updateSize();
        }
      }
      cmd.CmdSendHoldRoom = CmdSendHoldRoom;
      class SendGetGameConfig extends Network_OutPacket_1.default {
        constructor() {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.MONEY_BET_CONFIG);
          this.packHeader();
          this.updateSize();
        }
      }
      cmd.SendGetGameConfig = SendGetGameConfig;
      class SendGetTopServer extends Network_OutPacket_1.default {
        constructor(a) {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.TOPSERVER);
          this.packHeader();
          this.putByte(a);
          this.updateSize();
        }
      }
      cmd.SendGetTopServer = SendGetTopServer;
      class SendCreateRoom extends Network_OutPacket_1.default {
        constructor(a, b, c, d, e, f, g, h) {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.CREATE_ROOM);
          this.packHeader();
          this.putInt(a);
          this.putInt(b);
          this.putLong(c);
          this.putInt(d);
          this.putInt(e);
          this.putString(f);
          this.putString(g);
          this.putLong(h);
          this.updateSize();
        }
      }
      cmd.SendCreateRoom = SendCreateRoom;
      class SendCheatCards extends Network_OutPacket_1.default {
        constructor(a, b) {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.CHEAT_CARDS);
          this.packHeader();
          this.putByte(a);
          this.putByte(0);
          this.putShort(b.length);
          if (a) for (var c = 0; c < b.length; c++) this.putByte(b[c]);
          this.updateSize();
        }
      }
      cmd.SendCheatCards = SendCheatCards;
      class CmdSendMoBai extends Network_OutPacket_1.default {
        constructor() {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.MO_BAI);
          this.packHeader();
          this.updateSize();
        }
      }
      cmd.CmdSendMoBai = CmdSendMoBai;
      class CmdSendPing extends Network_OutPacket_1.default {
        constructor(a) {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.CMD_PINGPONG);
          this.packHeader();
          this.updateSize();
        }
      }
      cmd.CmdSendPing = CmdSendPing;
      class SendGetListRoom extends Network_OutPacket_1.default {
        constructor() {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.GET_LIST_ROOM);
          this.packHeader();
          this.putInt(Configs_1.default.App.MONEY_TYPE);
          this.putInt(Code.MAX_PLAYER);
          this.putLong(-1);
          this.putInt(0);
          this.putInt(0);
          this.putInt(50);
          this.updateSize();
        }
      }
      cmd.SendGetListRoom = SendGetListRoom;
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
      class SendBuyIn extends Network_OutPacket_1.default {
        constructor(a, b) {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.BUY_IN);
          this.packHeader();
          this.putLong(a);
          this.putByte(b);
          this.updateSize();
        }
      }
      cmd.SendBuyIn = SendBuyIn;
      class SendShowCard extends Network_OutPacket_1.default {
        constructor() {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.REQUEST_SHOW_CARD);
          this.packHeader();
          this.updateSize();
        }
      }
      cmd.SendShowCard = SendShowCard;
      class sendDanBai extends Network_OutPacket_1.default {
        constructor() {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.DAN_BAI);
          this.packHeader();
          this.updateSize();
        }
      }
      cmd.sendDanBai = sendDanBai;
      class sendRutBai extends Network_OutPacket_1.default {
        constructor() {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.RUT_BAI);
          this.packHeader();
          this.updateSize();
        }
      }
      cmd.sendRutBai = sendRutBai;
      class sendXetBaiOne extends Network_OutPacket_1.default {
        constructor(a) {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.XET_BAI_ONE);
          this.packHeader();
          this.putByte(a);
          this.updateSize();
        }
      }
      cmd.sendXetBaiOne = sendXetBaiOne;
      class sendXetBaiAll extends Network_OutPacket_1.default {
        constructor() {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.XET_BAI_ALL);
          this.packHeader();
          this.updateSize();
        }
      }
      cmd.sendXetBaiAll = sendXetBaiAll;
      class SendCardDefinations extends Network_OutPacket_1.default {
        constructor() {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.CARDS_DEFINE);
          this.packHeader();
          this.updateSize();
        }
      }
      cmd.SendCardDefinations = SendCardDefinations;
      class ReceivedLogin extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
        }
      }
      cmd.ReceivedLogin = ReceivedLogin;
      class ReceivedGetListRoom extends Network_InPacket_1.default {
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
      cmd.ReceivedGetListRoom = ReceivedGetListRoom;
      class ReceivedJoinRoomSucceed extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          var a;
          this.myChair = this.getByte();
          this.chuongChair = this.getByte();
          this.hasChuong = this.getByte();
          this.moneyBet = this.getLong();
          this.roomId = this.getInt();
          this.matchId = this.getInt();
          this.moneyType = this.getByte();
          this.rule = this.getByte();
          this.playerSize = this.getShort();
          this.playerStatus = [];
          for (a = 0; a < this.playerSize; a++) this.playerStatus.push(this.getByte());
          this.playerSize = this.getShort();
          this.playerInfos = [];
          for (a = 0; a < this.playerSize; a++) {
            var b = {};
            b["nickName"] = this.getString();
            b["avatar"] = this.getString();
            b["money"] = this.getLong();
            this.playerInfos.push(b);
          }
          this.gameAction = this.getByte();
          this.countDownTime = this.getByte();
        }
      }
      cmd.ReceivedJoinRoomSucceed = ReceivedJoinRoomSucceed;
      class ReceivedAutoStart extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.isAutoStart = this.getBool();
          this.timeAutoStart = this.getByte();
        }
      }
      cmd.ReceivedAutoStart = ReceivedAutoStart;
      class ReceivedChiaBai extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.playerStatusList = [];
          var a = this.getShort();
          for (var a = "", b = 0; b < cmd.Code.MAX_PLAYER; b++) this.playerStatusList.push(this.getByte()), 
          a += " " + this.playerStatusList[b];
          this.sizeCard = this.getShort();
          this.myCards = [];
          for (b = 0; b < this.sizeCard; b++) this.myCards.push(this.getByte());
          this.matchId = this.getInt();
          this.chuongChair = this.getByte();
          this.timeChiaBai = this.getByte();
        }
      }
      cmd.ReceivedChiaBai = ReceivedChiaBai;
      class ReceivedUserLeaveRoom extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.chair = this.getByte();
          this.nickName = this.getString();
        }
      }
      cmd.ReceivedUserLeaveRoom = ReceivedUserLeaveRoom;
      class ReceivedUserJoinRoom extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.info = {};
          this.info["nickName"] = this.getString();
          this.info["avatar"] = this.getString();
          this.info["money"] = this.getLong();
          this.uChair = this.getByte();
          this.uStatus = this.getByte();
        }
      }
      cmd.ReceivedUserJoinRoom = ReceivedUserJoinRoom;
      class ReceivedUpdateMatch extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.myChair = this.getByte();
          var a = this.getShort();
          this.hasInfo = [];
          for (var b = 0; b < a; b++) this.hasInfo.push(this.getBool());
          this.infos = [];
          for (b = 0; b < a; b++) {
            var c = {};
            this.hasInfo[b] && (c["nickName"] = this.getString(), c["avatar"] = this.getString(), 
            c["money"] = this.getLong(), c["status"] = this.getInt());
            this.infos.push(c);
          }
        }
      }
      cmd.ReceivedUpdateMatch = ReceivedUpdateMatch;
      class ReceivedXiDzachConfig extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.listSize = this.getShort();
          this.list = [];
          for (var a = 0; a < this.listSize; a++) {
            var b = {};
            b["maxUserPerRoom"] = this.getByte();
            b["moneyType"] = this.getByte();
            b["moneyBet"] = this.getLong();
            b["moneyRequire"] = this.getLong();
            b["nPersion"] = this.getInt();
            this.list.push(b);
          }
        }
      }
      cmd.ReceivedXiDzachConfig = ReceivedXiDzachConfig;
      class ReceivedNotifyRegOutRoom extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.outChair = this.getByte();
          this.isOutRoom = this.getBool();
        }
      }
      cmd.ReceivedNotifyRegOutRoom = ReceivedNotifyRegOutRoom;
      class ReceivedKickOff extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.reason = this.getByte();
        }
      }
      cmd.ReceivedKickOff = ReceivedKickOff;
      class ReceivedMoBai extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.chairMoBai = this.getByte();
          this.cardSize = this.getShort();
          this.cards = [];
          for (var a = 0; a < this.cardSize; a++) this.cards.push(this.getByte());
        }
      }
      cmd.ReceivedMoBai = ReceivedMoBai;
      class ReceivedEndGame extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.playerStatusList = [];
          this.listCards = [];
          for (var a = this.getShort(), b = " ", c = 0; c < a; c++) this.playerStatusList.push(this.getInt()), 
          b += " " + this.playerStatusList[c];
          for (c = 0; c < a; c++) {
            if (this.playerStatusList[c] == cmd.Code.PLAYER_STATUS_PLAYING) for (var b = [], d = this.getShort(), e = " ", f = 0; f < d; f++) b.push(this.getByte()), 
            e += " " + b[f]; else b = [];
            this.listCards.push(b);
          }
          this.tongTienThangThua = this.getLong();
          this.winMoneyList = [];
          a = this.getShort();
          for (c = 0; c < a; c++) this.winMoneyList.push(this.getLong());
          this.currentMoneyList = [];
          a = this.getShort();
          for (c = 0; c < a; c++) this.currentMoneyList.push(this.getLong());
          a = this.getShort();
          this.needShowWinLostMoney = [];
          for (c = 0; c < a; c++) this.needShowWinLostMoney.push(this.getByte());
        }
      }
      cmd.ReceivedEndGame = ReceivedEndGame;
      class ReceivedDoiChuong extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.chuongChair = this.getByte();
        }
      }
      cmd.ReceivedDoiChuong = ReceivedDoiChuong;
      class ReceivedChatRoom extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.chair = this.getByte();
          this.isIcon = this.getBool();
          this.content = decodeURI(this.getString());
          this.nickname = this.getString();
        }
      }
      cmd.ReceivedChatRoom = ReceivedChatRoom;
      class ReceivedGameInfo extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.myChair = this.getByte();
          this.chuongChair = this.getByte();
          this.gameServerState = this.getByte();
          this.isAutoStart = this.getByte();
          this.gameAction = this.getByte();
          this.countDownTime = this.getByte();
          this.moneyType = this.getByte();
          this.moneyBet = this.getLong();
          this.matchId = this.getInt();
          this.roomId = this.getInt();
          var a = " ";
          this.playerStatusSize = this.getShort();
          this.playerStatusList = [];
          for (var b = 0; b < this.playerStatusSize; b++) this.playerStatusList.push(this.getInt()), 
          a = a + " " + this.playerStatusList[b];
          this.playerInfoList = [];
          for (b = 0; b < Code.MAX_PLAYER; b++) 0 < this.playerStatusList[b] ? (a = {}, a["status"] = this.getByte(), 
          a["currentMoney"] = this.getLong(), a["avatarUrl"] = this.getString(), a["nickName"] = this.getString()) : (a = {}, 
          a["currentMoney"] = 0, a["status"] = 0, a["avatarUrl"] = "", a["nickName"] = ""), 
          this.playerInfoList.push(a);
          this.cardPlayerList = [];
          for (b = 0; b < Code.MAX_PLAYER; b++) {
            var a = [], c = " ";
            if (this.playerStatusList[b] == Code.PLAYER_STATUS_PLAYING) {
              var d = this.getShort();
              for (var e = 0; e < d; e++) a.push(this.getByte());
            }
            this.cardPlayerList.push(a);
            if (0 < a.length) for (d = 0; d < a.length; d++) c += " " + a[d];
          }
          for (b = 0; b < Code.MAX_PLAYER; b++) this.playerInfoList[b].hasDanBai = this.playerStatusList[b] == Code.PLAYER_STATUS_PLAYING && this.getByte();
        }
      }
      cmd.ReceivedGameInfo = ReceivedGameInfo;
      class ReceivedTopServer extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.rankType = this.getByte();
          this.topDay_money = this.getString();
          this.topWeek_money = this.getString();
          this.topMonth_money = this.getString();
          this.topDay_number = this.getString();
          this.topWeek_number = this.getString();
          this.topMonth_number = this.getString();
        }
      }
      cmd.ReceivedTopServer = ReceivedTopServer;
      class ReceivedJoinRoomFail extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
        }
      }
      cmd.ReceivedJoinRoomFail = ReceivedJoinRoomFail;
      class ReceivedChuyenGiaiDoan2 extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.countDownTime = this.getByte();
        }
      }
      cmd.ReceivedChuyenGiaiDoan2 = ReceivedChuyenGiaiDoan2;
      class ReceivedChuyenGiaiDoan3 extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.countDownTime = this.getByte();
          this.sizeCard = this.getShort();
          this.chuongCards = [];
          for (var a = 0; a < this.sizeCard; a++) this.chuongCards.push(this.getByte());
        }
      }
      cmd.ReceivedChuyenGiaiDoan3 = ReceivedChuyenGiaiDoan3;
      class ReceivedRutCard extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.chair = this.getByte();
          this.card = this.getByte();
        }
      }
      cmd.ReceivedRutCard = ReceivedRutCard;
      class ReceivedDanBai extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.chair = this.getByte();
        }
      }
      cmd.ReceivedDanBai = ReceivedDanBai;
      class ReceivedRutBaiTuDong extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.chair = this.getByte();
          this.cardSize = this.getShort();
          this.cards = [];
          for (var a = "", b = 0; b < this.cardSize; b++) this.cards.push(this.getByte()), 
          a += " " + this.cards[b];
        }
      }
      cmd.ReceivedRutBaiTuDong = ReceivedRutBaiTuDong;
      class ReceivedSoBai extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.chair1 = this.getByte();
          this.chair2 = this.getByte();
          this.winMoney1 = this.getLong();
          this.winMoney2 = this.getLong();
          this.currentMoney1 = this.getLong();
          this.currentMoney2 = this.getLong();
          this.hasCard1 = this.getByte();
          this.card1 = [];
          this.hasCard2 = this.getByte();
          this.card2 = [];
          if (this.hasCard1) {
            var a = "";
            this.cardSize1 = this.getShort();
            for (var b = 0; b < this.cardSize1; b++) this.card1.push(this.getByte()), a = a + " " + this.card1[b];
          }
          if (this.hasCard2) {
            a = "";
            this.cardSize2 = this.getShort();
            for (b = 0; b < this.cardSize2; b++) this.card2.push(this.getByte()), a = a + " " + this.card2[b];
          }
        }
      }
      cmd.ReceivedSoBai = ReceivedSoBai;
      class ReceivedKetQuaXiZach extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          var a = this.getShort();
          var b = "";
          this.needShowList = [];
          for (var c = 0; c < a; c++) this.needShowList.push(this.getByte()), b += " " + this.needShowList[c];
          a = this.getShort();
          this.needUpdateMoneyList = [];
          b = "";
          for (c = 0; c < a; c++) this.needUpdateMoneyList.push(this.getByte()), b += " " + this.needUpdateMoneyList[c];
          this.currentMoneyList = [];
          this.winMoneyList = [];
          this.listCards = [];
          for (c = 0; c < cmd.Code.MAX_PLAYER; c++) if (this.needShowList[c]) {
            for (var b = [], a = this.getShort(), d = 0; d < a; d++) b.push(this.getByte());
            this.listCards.push(b);
          } else this.listCards.push([]);
          b = this.getShort();
          for (c = 0; c < b; c++) this.winMoneyList.push(this.getLong());
          b = this.getShort();
          for (c = 0; c < b; c++) this.currentMoneyList.push(this.getLong());
        }
      }
      cmd.ReceivedKetQuaXiZach = ReceivedKetQuaXiZach;
      class ReceivedKetQuaSoBai extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.chair1 = this.getByte();
          this.chair2 = this.getByte();
          this.chair1WinMoney = this.getLong();
          this.chair2WinMoney = this.getLong();
          this.chair1CurrentMoney = this.getLong();
          this.chair2CurrentMoney = this.getLong();
          this.hasCard1 = this.getByte();
          this.hasCard2 = this.getByte();
          this.card1Size = this.getShort();
          this.card1 = [];
          for (var a = 0; a < this.card1Size; a++) this.card1.push(this.getByte());
          this.card2Size = this.getShort();
          this.card2 = [];
          for (a = 0; a < this.card2Size; a++) this.card2.push(this.getByte());
          this.isXiZach = this.getByte();
        }
      }
      cmd.ReceivedKetQuaSoBai = ReceivedKetQuaSoBai;
      class ReceivedCardDefinations extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.strData = this.getString();
        }
      }
      cmd.ReceivedCardDefinations = ReceivedCardDefinations;
    })(cmd = exports.cmd || (exports.cmd = {}));
    exports.default = cmd;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/networks/Network.InPacket": void 0,
    "../../Main/Game/src/networks/Network.OutPacket": void 0
  } ],
  "XiDzach.Controller": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "048dbB59SJP47YkNotQ5dk6", "XiDzach.Controller");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var XiDzachController_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const BroadcastReceiver_1 = require("../../Main/Game/src/common/BroadcastReceiver");
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const App_1 = require("../../Main/Game/src/common/App");
    const Network_InPacket_1 = require("../../Main/Game/src/networks/Network.InPacket");
    const Network_Cmd_1 = require("../../Main/Game/src/networks/Network.Cmd");
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    const XiDzach_Cmd_1 = require("./XiDzach.Cmd");
    const XiDzach_NetworkClient_1 = require("./XiDzach.NetworkClient");
    const XiZachGroupCard_1 = require("./XiZachGroupCard");
    const CardGame_Cmd_1 = require("../../Main/Game/src/networks/CardGame.Cmd");
    const PopupCardDefinations_1 = require("../../Main/Game/src/games/cardgames/PopupCardDefinations");
    const PopupChatInGame_1 = require("../../Main/Game/src/games/cardgames/PopupChatInGame");
    const XiDzach_Player_1 = require("./XiDzach.Player");
    const ItemRoom_1 = require("../../Main/Game/src/games/cardgames/ItemRoom");
    const PopupSettingInGame_1 = require("../../Main/Game/src/games/cardgames/PopupSettingInGame");
    var configPlayer = [];
    let defaultPlayerPos = [ [ 0, 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5, 0 ], [ 2, 3, 4, 5, 0, 1 ], [ 3, 4, 5, 0, 1, 2 ], [ 4, 5, 0, 1, 2, 3 ], [ 5, 0, 1, 2, 3, 4 ] ];
    const {ccclass: ccclass, property: property} = cc._decorator;
    let XiDzachController = XiDzachController_1 = class XiDzachController extends cc.Component {
      constructor() {
        super(...arguments);
        this.UI_ChooseRoom = null;
        this.labelNickName = null;
        this.labelCoin = null;
        this.sprAvatar = null;
        this.prefabItemRoom = null;
        this.scrollListRoom = null;
        this.UI_Playing = null;
        this.meCards = null;
        this.groupPlayers = null;
        this.spriteCards = [];
        this.spriteCardBack = null;
        this.cardsDeal = null;
        this.btnNhaCai = null;
        this.btnNhaCon = null;
        this.labelRoomId = null;
        this.labelRoomBet = null;
        this.labelMatchId = null;
        this.actionBetting = null;
        this.cardsRut = null;
        this.notifyTimeStart = null;
        this.notifyTimeEnd = null;
        this.notifyHand = null;
        this.notifyHand2 = null;
        this.labelBettingCountDown = null;
        this.popupNodity = null;
        this.labelNotifyContent = null;
        this.popupGuide = null;
        this.btnShowCardDefinations = null;
        this.effectWin = null;
        this.effectDraw = null;
        this.effectLose = null;
        this.isInitedUIRoom = false;
        this.seatOwner = null;
        this.seconds = null;
        this.timeAutoStart = null;
        this.timeEnd = null;
        this.timeBet = null;
        this.intervalWaitting = null;
        this.intervalEnd = null;
        this.intervalBetting = null;
        this.currentCard = null;
        this.numCardOpened = 0;
        this.seatXiDzachOrXiBang = null;
        this.isExistMeInfo = null;
        this.cardDefinations = null;
        this.listRoom = [];
        this.isClickBack = false;
      }
      onLoad() {
        XiDzachController_1.instance = this;
        this.initConfigPlayer();
      }
      start() {
        this.isClickBack = false;
        this.seatOwner = -1;
        this.seatXiDzachOrXiBang = -1;
        this.isExistMeInfo = true;
        this.currentCard = [];
        this.UI_Playing.active = false;
        this.showUIRooms();
        App_1.default.instance.showErrLoading("\u0110ang k\u1ebft n\u1ed1i t\u1edbi server...");
        XiDzach_NetworkClient_1.default.getInstance().addOnOpen(() => {
          App_1.default.instance.showErrLoading("\u0110ang \u0111ang \u0111\u0103ng nh\u1eadp...");
          XiDzach_NetworkClient_1.default.getInstance().send(new Network_Cmd_1.default.SendLogin(Configs_1.default.Login.Nickname, Configs_1.default.Login.AccessToken));
        }, this);
        XiDzach_NetworkClient_1.default.getInstance().addOnClose(() => {
          this.isClickBack || !Configs_1.default.Login.IsLogin ? this.backToLobby() : App_1.default.instance.alertDialog.showMsgWithOnDismissed("B\u1ea1n \u0111\xe3 m\u1ea5t k\u1ebft n\u1ed1i v\u1edbi server", () => {
            this.backToLobby();
          });
        }, this);
        XiDzach_NetworkClient_1.default.getInstance().connect();
        BroadcastReceiver_1.default.register(BroadcastReceiver_1.default.USER_DISCONNECTED, data => {
          XiDzach_NetworkClient_1.default.getInstance().close();
        }, this);
        BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.SET_SOUND, cc.find("Canvas"));
      }
      onDestroy() {
        this.unschedule(this.intervalWaitting);
        this.unschedule(this.intervalEnd);
        this.unschedule(this.intervalBetting);
      }
      initRooms(rooms) {
        this.listRoom = [];
        this.scrollListRoom.content.removeAllChildren();
        let listBet = [ ...new Set(rooms) ].filter(room => room["moneyType"] === Configs_1.default.App.MONEY_TYPE).map(room => room["moneyBet"]);
        listBet.forEach((bet, index) => {
          let playerCount = 0;
          let maxUser = 0;
          let moneyRequire = 0;
          rooms.forEach(room => {
            if (room.moneyBet === bet) {
              playerCount += room.nPersion;
              maxUser = room.maxUserPerRoom;
              moneyRequire = room.moneyRequire;
            }
          });
          this.listRoom.push(new ItemRoom_1.RoomItemInfo(index + 1, bet, moneyRequire, playerCount, maxUser));
        });
        this.listRoom.sort((a, b) => a.moneyBet - b.moneyBet);
        let speed = .7;
        this.listRoom.forEach((room, index) => {
          const roomItem = cc.instantiate(this.prefabItemRoom);
          roomItem.getComponent(ItemRoom_1.default).initItem(room);
          roomItem.on(cc.Node.EventType.TOUCH_END, event => {
            if (Configs_1.default.Login.Coin < room.requiredMoney) {
              App_1.default.instance.actiontDialog.showMsgWithAction("S\u1ed1 d\u01b0 kh\xf4ng \u0111\u1ee7.", "N\u1ea0P NGAY", () => {
                App_1.default.instance.openShop(0);
              });
              return;
            }
            XiDzach_NetworkClient_1.default.getInstance().send(new CardGame_Cmd_1.default.SendJoinRoom(Configs_1.default.App.MONEY_TYPE, room.maxUserPerRoom, room.moneyBet, 0));
          });
          roomItem.parent = this.scrollListRoom.content;
          roomItem.y = -30;
          let time = .2 * speed * (1 === index ? .8 : 1 - Math.pow(2, -10 * index));
          roomItem.runAction(cc.sequence(cc.fadeOut(0), cc.delayTime(.15 * (this.listRoom.length - index) * speed), cc.spawn(cc.fadeIn(time), cc.moveTo(time, cc.v2(0, -30 - 85 * index)).easing(cc.easeCircleActionOut()))));
        });
        this.scrollListRoom.scrollToBottom(0);
        this.scrollListRoom.scrollToTop(2);
      }
      refeshListRoom() {
        this.scrollListRoom.content.removeAllChildren(true);
        XiDzach_NetworkClient_1.default.getInstance().send(new CardGame_Cmd_1.default.SendMoneyBetConfig());
      }
      showUIRooms() {
        this.UI_ChooseRoom.active = true;
        if (this.isInitedUIRoom) BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN); else {
          this.isInitedUIRoom = true;
          this.sprAvatar.spriteFrame = App_1.default.instance.getAvatarSpriteFrame(Configs_1.default.Login.Avatar);
          this.labelNickName.string = Configs_1.default.Login.Nickname;
          BroadcastReceiver_1.default.register(BroadcastReceiver_1.default.USER_UPDATE_COIN, () => {
            this.labelCoin.string = Utils_1.default.formatNumber(Configs_1.default.Login.Coin);
          }, this);
          BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN);
          this.setupListener();
        }
      }
      closeUIRoom() {
        this.UI_ChooseRoom.active = false;
      }
      playingNow() {
        let listRoomToJoin = this.listRoom.filter(room => room.requiredMoney <= Configs_1.default.Login.Coin);
        if (listRoomToJoin.length <= 0) {
          App_1.default.instance.actiontDialog.showMsgWithAction("S\u1ed1 d\u01b0 kh\xf4ng \u0111\u1ee7.", "N\u1ea0P NGAY", () => {
            App_1.default.instance.openShop(0);
          });
          return;
        }
        let randomIdx = Utils_1.default.randomRangeInt(0, listRoomToJoin.length);
        let room = listRoomToJoin[randomIdx];
        XiDzach_NetworkClient_1.default.getInstance().send(new CardGame_Cmd_1.default.SendJoinRoom(Configs_1.default.App.MONEY_TYPE, room.maxUserPerRoom, room.moneyBet, 0));
      }
      showPopupGuide() {
        this.popupGuide.active = true;
      }
      closePopupGuide() {
        this.popupGuide.active = false;
      }
      actBack() {
        this.isClickBack = true;
        XiDzach_NetworkClient_1.default.getInstance().close();
      }
      backToLobby() {
        App_1.default.instance.loadScene("Lobby");
      }
      showUIPlaying() {
        this.disableEffects();
        this.UI_Playing.active = true;
      }
      closeUIPlaying() {
        this.actionLeaveRoom();
      }
      setupMatch(data) {
        this.showUIPlaying();
        let chuongChair = data["chuongChair"];
        let hasChuong = data["hasChuong"];
        let countDownTime = data["countDownTime"];
        let gameAction = data["gameAction"];
        let matchId = data["matchId"];
        let moneyBet = data["moneyBet"];
        let moneyType = data["moneyType"];
        let myChair = data["myChair"];
        let playerInfos = data["playerInfos"];
        let playerSize = data["playerSize"];
        let playerStatus = data["playerStatus"];
        let roomId = data["roomId"];
        let rule = data["rule"];
        this.labelRoomId.string = roomId + "";
        this.labelRoomBet.string = Utils_1.default.formatNumber(moneyBet);
        this.labelMatchId.string = matchId + "";
        configPlayer[0].playerId = Configs_1.default.Login.Nickname;
        configPlayer[0].playerPos = myChair;
        var numPlayers = 0;
        var arrPlayerPosExist = [];
        var arrPlayerInfo = [];
        var arrPlayerStatus = [];
        for (let index = 0; index < playerInfos.length; index++) if ("" !== playerInfos[index].nickName) {
          numPlayers += 1;
          arrPlayerPosExist.push(index);
          arrPlayerInfo.push(playerInfos[index]);
          arrPlayerStatus.push(playerStatus[index]);
        }
        for (let a = 0; a < configPlayer.length; a++) configPlayer[a].playerPos = defaultPlayerPos[myChair][a];
        for (let index = 0; index < configPlayer.length; index++) {
          let findPos = arrPlayerPosExist.indexOf(configPlayer[index].playerPos);
          var seatId = configPlayer[index].seatId;
          this.getPlayerHouse(seatId).resetPlayerInfo();
          if (findPos > -1) {
            if (arrPlayerStatus[findPos] == XiDzach_Cmd_1.default.Code.PLAYER_STATUS_SITTING || arrPlayerStatus[findPos] == XiDzach_Cmd_1.default.Code.PLAYER_STATUS_PLAYING) {
              configPlayer[index].isViewer = false;
              this.getPlayerHouse(seatId).setIsViewer(false);
            } else {
              configPlayer[index].isViewer = true;
              this.getPlayerHouse(seatId).setIsViewer(true);
              this.getPlayerHouse(seatId).playFxViewer();
            }
            this.setupSeatPlayer(seatId, arrPlayerInfo[findPos]);
          } else configPlayer[index].isViewer = true;
        }
        for (let index = 0; index < XiDzach_Cmd_1.default.Code.MAX_PLAYER; index++) this.getPlayerHouse(index).setOwner(false);
        let seatOwner = this.findPlayerSeatByPos(chuongChair);
        if (-1 !== seatOwner) {
          this.getPlayerHouse(seatOwner).setOwner(true);
          this.seatOwner = seatOwner;
        }
      }
      startWaittingCountDown(timeWait) {
        this.timeAutoStart = timeWait;
        this.setTimeWaittingCountDown();
        this.notifyTimeStart.parent.active = true;
        this.unschedule(this.intervalWaitting);
        this.schedule(this.intervalWaitting = () => {
          this.timeAutoStart--;
          this.setTimeWaittingCountDown();
          if (this.timeAutoStart < 1) {
            this.unschedule(this.intervalWaitting);
            this.notifyTimeStart.parent.active = false;
          }
        }, 1);
      }
      setTimeWaittingCountDown() {
        this.seconds = Math.floor(this.timeAutoStart % 60);
        this.notifyTimeStart.getComponent(cc.Label).string = " B\u1eaft \u0111\u1ea7u sau : " + this.seconds + "s ";
      }
      startEndCountDown(timeWait) {
        this.timeEnd = timeWait;
        this.setTimeEndCountDown();
        this.notifyTimeEnd.parent.active = true;
        this.unschedule(this.intervalEnd);
        this.schedule(this.intervalEnd = () => {
          this.timeEnd--;
          this.setTimeEndCountDown();
          if (this.timeEnd < 1) {
            this.unschedule(this.intervalEnd);
            this.notifyTimeEnd.parent.active = false;
          }
        }, 1);
      }
      setTimeEndCountDown() {
        this.seconds = Math.floor(this.timeEnd % 60);
        this.notifyTimeEnd.getComponent(cc.Label).string = " K\u1ebft th\xfac sau : " + this.seconds + "s ";
      }
      startBettingCountDown(turnTime, content) {
        this.timeBet = turnTime;
        this.actionBetting.active = true;
        this.labelBettingCountDown.string = content;
        this.processBetting(1);
        this.unschedule(this.intervalBetting);
        this.schedule(this.intervalBetting = () => {
          this.timeBet--;
          var rate = (this.timeBet / turnTime).toFixed(1);
          this.processBetting(rate);
          if (this.timeBet < 1) {
            this.unschedule(this.intervalBetting);
            this.actionBetting.active = false;
          }
        }, 1);
      }
      processBetting(rate) {
        this.actionBetting.children[1].getComponent(cc.Sprite).fillRange = rate;
      }
      openMeCard(event, itemId) {
        let cardPos = parseInt(itemId);
        this.getPlayerHouse(0).prepareCardReal(cardPos);
        let spriteCardId = this.currentCard[cardPos];
        this.getPlayerHouse(0).transformToCardReal(cardPos, this.spriteCards[spriteCardId]);
        this.numCardOpened += 1;
        if (3 == this.numCardOpened) {
          this.btnNhaCai.active = true;
          this.btnNhaCon.active = false;
          this.getPlayerHouse(0).showCardName(new XiZachGroupCard_1.default(this.currentCard));
          this.scheduleOnce(() => {
            this.getPlayerHouse(0).resetCardReady();
          }, .2);
        }
      }
      fxMoveChips(chips, delay, toX, toY) {
        chips.runAction(cc.sequence(cc.delayTime(delay), cc.scaleTo(0, 1, 1), cc.spawn(cc.moveTo(.8, toX, toY), cc.scaleTo(.8, 0, 0))));
      }
      setCanRutBai(state) {
        this.cardsRut.getComponent(cc.Button).interactable = state;
      }
      setupListener() {
        XiDzach_NetworkClient_1.default.getInstance().addListener(data => {
          let inpacket = new Network_InPacket_1.default(data);
          switch (inpacket.getCmdId()) {
           case XiDzach_Cmd_1.default.Code.LOGIN:
            App_1.default.instance.showLoading(false);
            this.refeshListRoom();
            XiDzach_NetworkClient_1.default.getInstance().send(new XiDzach_Cmd_1.default.CmdReconnectRoom());
            break;

           case XiDzach_Cmd_1.default.Code.TOPSERVER:
            {
              App_1.default.instance.showLoading(false);
              let res = new XiDzach_Cmd_1.default.ReceivedTopServer(data);
              cc.log(res);
            }
            break;

           case XiDzach_Cmd_1.default.Code.CMD_PINGPONG:
            App_1.default.instance.showLoading(false);
            cc.log("XiDzach CMD_PINGPONG");
            break;

           case XiDzach_Cmd_1.default.Code.CMD_JOIN_ROOM:
            App_1.default.instance.showLoading(false);
            cc.log("XiDzach CMD_JOIN_ROOM");
            break;

           case XiDzach_Cmd_1.default.Code.CMD_RECONNECT_ROOM:
            App_1.default.instance.showLoading(false);
            cc.log("XiDzach CMD_RECONNECT_ROOM");
            break;

           case XiDzach_Cmd_1.default.Code.MONEY_BET_CONFIG:
            {
              App_1.default.instance.showLoading(false);
              let res = new CardGame_Cmd_1.default.ResMoneyBetConfig(data);
              cc.log(res);
              this.initRooms(res.list);
            }
            break;

           case XiDzach_Cmd_1.default.Code.JOIN_ROOM_FAIL:
            {
              App_1.default.instance.showLoading(false);
              let res = new XiDzach_Cmd_1.default.ReceivedJoinRoomFail(data);
              cc.log("XiDzach JOIN_ROOM_FAIL res : ", JSON.stringify(res));
              let msg = "L\u1ed7i " + res.getError() + ", kh\xf4ng x\xe1c \u0111\u1ecbnh.";
              switch (res.getError()) {
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
              App_1.default.instance.alertDialog.showMsg(msg);
            }
            break;

           case XiDzach_Cmd_1.default.Code.GET_LIST_ROOM:
            {
              let res = new XiDzach_Cmd_1.default.ReceivedGetListRoom(data);
              cc.log(res);
            }
            break;

           case XiDzach_Cmd_1.default.Code.JOIN_GAME_ROOM_BY_ID:
            App_1.default.instance.showLoading(false);
            cc.log("XiDzach JOIN_GAME_ROOM_BY_ID");
            break;

           case XiDzach_Cmd_1.default.Code.MO_BAI:
            {
              App_1.default.instance.showLoading(false);
              let res = new XiDzach_Cmd_1.default.ReceivedMoBai(data);
              cc.log("XiDzach ReceivedMoBai res : ", JSON.stringify(res));
              let chairMoBai = res["chairMoBai"];
              let cards = res["cards"];
              let seatId = this.findPlayerSeatByPos(chairMoBai);
              if (-1 != seatId && 0 != seatId) {
                this.getPlayerHouse(seatId).prepareToTransform();
                for (let a = 0; a < 3; a++) {
                  let spriteCardId = cards[a];
                  this.getPlayerHouse(seatId).transformToCardReal(a, this.spriteCards[spriteCardId]);
                }
                this.getPlayerHouse(seatId).showCardName(new XiZachGroupCard_1.default(cards));
              }
            }
            break;

           case XiDzach_Cmd_1.default.Code.BUY_IN:
            App_1.default.instance.showLoading(false);
            cc.log("XiDzach BUY_IN");
            break;

           case XiDzach_Cmd_1.default.Code.KET_THUC:
            {
              App_1.default.instance.showLoading(false);
              let res = new XiDzach_Cmd_1.default.ReceivedEndGame(data);
              cc.log("XiDzach ReceivedEndGame res : ", JSON.stringify(res));
              this.unschedule(this.intervalBetting);
              this.actionBetting.active = false;
              let playerStatusList = res["playerStatusList"];
              let listCards = res["listCards"];
              let tongTienThangThua = res["tongTienThangThua"];
              let winMoneyList = res["winMoneyList"];
              let currentMoneyList = res["currentMoneyList"];
              let needShowWinLostMoney = res["needShowWinLostMoney"];
              this.btnNhaCon.active = false;
              this.btnNhaCai.active = false;
              this.notifyHand.active = false;
              this.notifyHand2.active = false;
              this.setCanRutBai(false);
              for (let index = 0; index < XiDzach_Cmd_1.default.Code.MAX_PLAYER; index++) this.getPlayerHouse(index).hideFxCombineState(false);
              for (let index = 0; index < XiDzach_Cmd_1.default.Code.MAX_PLAYER; index++) this.getPlayerHouse(index).showBtnXeBaiOne(false);
              let posPlaying = [];
              for (let index = 0; index < XiDzach_Cmd_1.default.Code.MAX_PLAYER; index++) 1 == needShowWinLostMoney[index] && posPlaying.push(index);
              for (let index = 0; index < posPlaying.length; index++) {
                let seatIdHide = this.findPlayerSeatByPos(posPlaying[index]);
                -1 != seatIdHide && this.getPlayerHouse(seatIdHide).hideFxWinLose();
              }
              for (let index = 0; index < XiDzach_Cmd_1.default.Code.MAX_PLAYER; index++) {
                let findId = posPlaying.indexOf(configPlayer[index].playerPos);
                if (-1 === findId) continue;
                let cards = listCards[posPlaying[findId]];
                if (cards.length > 0) for (let a = 0; a < 5; a++) if (a < cards.length) {
                  let spriteCardId = cards[a];
                  this.getPlayerHouse(index).openCardRealNow(a, this.spriteCards[spriteCardId]);
                } else this.getPlayerHouse(index).hideCardRealNow(a);
                var gr = new XiZachGroupCard_1.default(cards);
                this.getPlayerHouse(index).showCardName(gr);
                let moneyInfo = {
                  moneyChange: winMoneyList[posPlaying[findId]],
                  money: currentMoneyList[posPlaying[findId]]
                };
                if (0 == index) {
                  Configs_1.default.Login.Coin = currentMoneyList[posPlaying[findId]];
                  BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN);
                  this.showResultEffect(moneyInfo.moneyChange);
                }
                moneyInfo.moneyChange >= 0 ? this.getPlayerHouse(index).fxWin(moneyInfo) : moneyInfo.moneyChange < 0 && this.getPlayerHouse(index).fxLose(moneyInfo);
              }
            }
            break;

           case XiDzach_Cmd_1.default.Code.CHIA_BAI:
            {
              App_1.default.instance.showLoading(false);
              let res = new XiDzach_Cmd_1.default.ReceivedChiaBai(data);
              cc.log("XiDzach ReceivedChiaBai res : ", JSON.stringify(res));
              let playerStatusList = res["playerStatusList"];
              let sizeCard = res["sizeCard"];
              let myCards = res["myCards"];
              let matchId = res["matchId"];
              let chuongChair = res["chuongChair"];
              let timeChiaBai = res["timeChiaBai"];
              this.labelMatchId.string = matchId + "";
              this.btnNhaCon.active = false;
              this.btnNhaCai.active = false;
              this.cardsRut.active = false;
              for (let index = 0; index < XiDzach_Cmd_1.default.Code.MAX_PLAYER; index++) this.getPlayerHouse(index).setOwner(false);
              let seatOwner = this.findPlayerSeatByPos(chuongChair);
              if (-1 !== seatOwner) {
                this.getPlayerHouse(seatOwner).setOwner(true);
                this.seatOwner = seatOwner;
              }
              this.scheduleOnce(() => {
                this.startBettingCountDown(timeChiaBai, "Ng\u01b0\u1eddi Ch\u01a1i R\xfat B\xe0i");
              }, 2);
              this.currentCard = myCards;
              var arrSeatExist = this.getNumPlayers();
              let numPlayer = arrSeatExist.length;
              for (let index = 0; index < 2 * XiDzach_Cmd_1.default.Code.MAX_PLAYER; index++) {
                this.cardsDeal.children[index].active = !(index >= 2 * numPlayer);
                this.cardsDeal.children[index].setPosition(cc.v2(0, 0));
              }
              let timeShip = .1;
              for (let a = 0; a < 2; a++) for (let b = 0; b < numPlayer; b++) {
                let seatId = arrSeatExist[b];
                if (-1 !== seatId) {
                  let card4Me = this.cardsDeal.children[a * numPlayer + b];
                  let rawPlayerPos = this.groupPlayers.children[seatId].getPosition();
                  card4Me.runAction(cc.sequence(cc.delayTime((a * numPlayer + b) * timeShip), cc.moveTo(.2, rawPlayerPos)));
                }
              }
              let delayOver2Under = .2;
              var maxDelay = (2 * numPlayer + (numPlayer - 1)) * timeShip;
              let timeUnderLayer = maxDelay + .2 + delayOver2Under;
              this.scheduleOnce(() => {
                for (let index = 0; index < 2 * XiDzach_Cmd_1.default.Code.MAX_PLAYER; index++) this.cardsDeal.children[index].active = false;
                for (let index = 0; index < numPlayer; index++) {
                  let seatId = arrSeatExist[index];
                  if (-1 !== seatId) {
                    0 == seatId && this.getPlayerHouse(seatId).resetCardReady();
                    this.getPlayerHouse(seatId).showCardReady(true);
                    this.getPlayerHouse(seatId).showCardReal(false);
                    if (0 != seatId) {
                      seatId != seatOwner && this.getPlayerHouse(seatId).playFxDangXep();
                      for (let index = 2; index < 5; index++) this.getPlayerHouse(seatId).hideCardRealNow(index);
                    }
                  }
                }
                for (let a = 0; a < 2; a++) {
                  let spriteCardId = myCards[a];
                  this.getPlayerHouse(0).prepareToTransform();
                  this.getPlayerHouse(0).transformToCardReal(a, this.spriteCards[spriteCardId]);
                }
                for (let index = 2; index < 5; index++) this.getPlayerHouse(0).hideCardRealNow(index);
                let seatIdChuong = this.findPlayerSeatByPos(chuongChair);
                if (-1 != seatIdChuong) {
                  this.btnNhaCai.active = false;
                  this.btnNhaCon.active = 0 != seatIdChuong;
                } else {
                  this.btnNhaCai.active = false;
                  this.btnNhaCon.active = false;
                }
                if (myCards.length > 0) {
                  var gr = new XiZachGroupCard_1.default(myCards);
                  if (gr.isQuac()) {
                    this.setCanRutBai(false);
                    this.notifyHand.active = false;
                    this.notifyHand2.active = false;
                    this.unschedule(this.intervalBetting);
                    this.actionBetting.active = false;
                  }
                  this.getPlayerHouse(0).showCardName(gr);
                }
              }, timeUnderLayer);
            }
            break;

           case XiDzach_Cmd_1.default.Code.TU_DONG_BAT_DAU:
            {
              App_1.default.instance.showLoading(false);
              let res = new XiDzach_Cmd_1.default.ReceivedAutoStart(data);
              cc.log("XiDzach ReceiveAutoStart res : ", JSON.stringify(res));
              if (res.isAutoStart) {
                this.disableEffects();
                this.startWaittingCountDown(res.timeAutoStart);
                this.btnNhaCon.active = false;
                this.btnNhaCai.active = false;
                this.btnNhaCon.getComponent(cc.Button).interactable = true;
                this.resetPlayersPlaying();
                this.seatXiDzachOrXiBang = -1;
                this.isExistMeInfo = true;
                this.currentCard = [];
              }
            }
            break;

           case XiDzach_Cmd_1.default.Code.THONG_TIN_BAN_CHOI:
            {
              App_1.default.instance.showLoading(false);
              let res = new XiDzach_Cmd_1.default.ReceivedGameInfo(data);
              cc.log("XiDzach ReceivedGameInfo res : ", JSON.stringify(res));
              this.closeUIRoom();
              this.showUIPlaying();
              let myChair = res["myChair"];
              let chuongChair = res["chuongChair"];
              let gameServerState = res["gameServerState"];
              let isAutoStart = res["isAutoStart"];
              let gameAction = res["gameAction"];
              let countDownTime = res["countDownTime"];
              let moneyType = res["moneyType"];
              let moneyBet = res["moneyBet"];
              let matchId = res["matchId"];
              let roomId = res["roomId"];
              let playerStatusSize = res["playerStatusSize"];
              let playerStatusList = res["playerStatusList"];
              let playerInfoList = res["playerInfoList"];
              let cardPlayerList = res["cardPlayerList"];
              this.labelRoomId.string = roomId + "";
              this.labelRoomBet.string = Utils_1.default.formatNumber(moneyBet);
              this.labelMatchId.string = matchId + "";
              0 == playerInfoList[myChair].length ? this.isExistMeInfo = false : this.isExistMeInfo = true;
              this.currentCard = cardPlayerList[myChair];
              configPlayer[0].playerId = Configs_1.default.Login.Nickname;
              configPlayer[0].playerPos = myChair;
              var numPlayers = 0;
              var arrPlayerPosExist = [];
              for (let index = 0; index < playerStatusList.length; index++) if (playerStatusList[index] > 0) {
                numPlayers += 1;
                arrPlayerPosExist.push(index);
              }
              for (let a = 0; a < configPlayer.length; a++) configPlayer[a].playerPos = defaultPlayerPos[myChair][a];
              for (let index = 0; index < configPlayer.length; index++) {
                let findPos = arrPlayerPosExist.indexOf(configPlayer[index].playerPos);
                var seatId = configPlayer[index].seatId;
                this.getPlayerHouse(seatId).resetPlayerInfo();
                if (findPos > -1) {
                  if (playerStatusList[findPos] == XiDzach_Cmd_1.default.Code.PLAYER_STATUS_PLAYING) {
                    this.getPlayerHouse(seatId).setIsViewer(false);
                    configPlayer[index].isViewer = false;
                  } else {
                    this.getPlayerHouse(seatId).setIsViewer(true);
                    this.getPlayerHouse(seatId).playFxViewer();
                    configPlayer[index].isViewer = true;
                  }
                  this.setupSeatPlayer(seatId, {
                    nickName: playerInfoList[findPos].nickName,
                    avatar: playerInfoList[findPos].avatarUrl,
                    money: playerInfoList[findPos].currentMoney
                  });
                } else configPlayer[index].isViewer = true;
              }
              for (let index = 0; index < XiDzach_Cmd_1.default.Code.MAX_PLAYER; index++) this.getPlayerHouse(index).setOwner(false);
              let seatOwner = this.findPlayerSeatByPos(chuongChair);
              if (-1 !== seatOwner) {
                this.getPlayerHouse(seatOwner).setOwner(true);
                this.seatOwner = seatOwner;
              }
            }
            break;

           case XiDzach_Cmd_1.default.Code.DANG_KY_THOAT_PHONG:
            {
              App_1.default.instance.showLoading(false);
              let res = new XiDzach_Cmd_1.default.ReceivedNotifyRegOutRoom(data);
              cc.log("XiDzach ReceivedNotifyRegOutRoom res : ", JSON.stringify(res));
              let outChair = res["outChair"];
              let seatId = this.findPlayerSeatByPos(outChair);
              -1 !== seatId && this.getPlayerHouse(seatId).showNotify(res["isOutRoom"]);
            }
            break;

           case XiDzach_Cmd_1.default.Code.DOI_CHUONG:
            {
              App_1.default.instance.showLoading(false);
              let res = new XiDzach_Cmd_1.default.ReceivedDoiChuong(data);
              cc.log("XiDzach ReceivedDoiChuong res : ", JSON.stringify(res));
              for (let index = 0; index < XiDzach_Cmd_1.default.Code.MAX_PLAYER; index++) this.getPlayerHouse(index).setOwner(false);
              let seatId = this.findPlayerSeatByPos(res["chuongChair"]);
              if (-1 != seatId) {
                this.getPlayerHouse(seatId).setOwner(true);
                this.seatOwner = seatId;
              }
            }
            break;

           case XiDzach_Cmd_1.default.Code.CHEAT_CARDS:
            App_1.default.instance.showLoading(false);
            cc.log("XiDzach CHEAT_CARDS");
            break;

           case XiDzach_Cmd_1.default.Code.DANG_KY_CHOI_TIEP:
            App_1.default.instance.showLoading(false);
            cc.log("XiDzach DANG_KY_CHOI_TIEP");
            break;

           case XiDzach_Cmd_1.default.Code.JOIN_ROOM_SUCCESS:
            {
              App_1.default.instance.showLoading(false);
              let res = new XiDzach_Cmd_1.default.ReceivedJoinRoomSucceed(data);
              cc.log(res);
              this.closeUIRoom();
              this.setupMatch(res);
              this.getCardDefinations();
            }
            break;

           case XiDzach_Cmd_1.default.Code.LEAVE_GAME:
            {
              App_1.default.instance.showLoading(false);
              let res = new XiDzach_Cmd_1.default.ReceivedUserLeaveRoom(data);
              cc.log("XiDzach ReceivedUserLeaveRoom res : ", JSON.stringify(res));
              let chair = res["chair"];
              let seatId = this.findPlayerSeatByPos(chair);
              if (-1 !== seatId) {
                for (let index = 0; index < configPlayer.length; index++) if (configPlayer[index].seatId == seatId) {
                  configPlayer[index].playerId = -1;
                  configPlayer[index].isViewer = true;
                }
                this.getPlayerHouse(seatId).resetPlayerInfo();
                let arrSeatExistLast = this.getNumPlayers();
                1 == arrSeatExistLast.length && this.resetPlayersPlaying();
                if (0 == seatId) {
                  this.UI_Playing.active = false;
                  this.UI_ChooseRoom.active = true;
                  this.refeshListRoom();
                }
              }
            }
            break;

           case XiDzach_Cmd_1.default.Code.NOTIFY_KICK_FROM_ROOM:
            {
              App_1.default.instance.showLoading(false);
              let res = new XiDzach_Cmd_1.default.ReceivedKickOff(data);
              cc.log("XiDzach ReceivedKickOff res : ", JSON.stringify(res));
              this.onKickFromRoom(res.reason);
            }
            break;

           case XiDzach_Cmd_1.default.Code.NEW_USER_JOIN:
            {
              App_1.default.instance.showLoading(false);
              let res = new XiDzach_Cmd_1.default.ReceivedUserJoinRoom(data);
              cc.log("XiDzach ReceivedUserJoinRoom res : ", JSON.stringify(res));
              let info = res["info"];
              let uChair = res["uChair"];
              let uStatus = res["uStatus"];
              for (let index = 0; index < configPlayer.length; index++) if (configPlayer[index].playerPos == uChair) {
                var seatId = configPlayer[index].seatId;
                this.getPlayerHouse(seatId).resetPlayerInfo();
                var customPlayerInfo = {
                  avatar: info["avatar"],
                  nickName: info["nickName"],
                  money: info["money"]
                };
                this.setupSeatPlayer(seatId, customPlayerInfo);
                if (uStatus == XiDzach_Cmd_1.default.Code.PLAYER_STATUS_VIEWER) {
                  configPlayer[seatId].isViewer = true;
                  this.getPlayerHouse(seatId).setIsViewer(true);
                  this.getPlayerHouse(seatId).playFxViewer();
                } else {
                  configPlayer[seatId].isViewer = false;
                  this.getPlayerHouse(seatId).setIsViewer(false);
                }
              }
            }
            break;

           case XiDzach_Cmd_1.default.Code.NOTIFY_USER_GET_JACKPOT:
            App_1.default.instance.showLoading(false);
            cc.log("XiDzach NOTIFY_USER_GET_JACKPOT");
            break;

           case XiDzach_Cmd_1.default.Code.UPDATE_MATCH:
            {
              App_1.default.instance.showLoading(false);
              this.actionBetting.active = false;
              let res = new XiDzach_Cmd_1.default.ReceivedUpdateMatch(data);
              cc.log("XiDzach ReceivedUpdateMatch res : ", JSON.stringify(res));
              let myChair = res["myChair"];
              let hasInfo = res["hasInfo"];
              let infos = res["infos"];
              for (let index = 0; index < hasInfo.length; index++) {
                let pos = configPlayer[index]["playerPos"];
                if (hasInfo[pos]) {
                  this.getPlayerHouse(index).setGold(infos[pos]["money"]);
                  configPlayer[index]["playerId"] = infos[pos]["nickName"];
                  if (infos[pos]["status"] == XiDzach_Cmd_1.default.Code.PLAYER_STATUS_SITTING || infos[pos]["status"] == XiDzach_Cmd_1.default.Code.PLAYER_STATUS_PLAYING) {
                    configPlayer[index]["isViewer"] = false;
                    this.getPlayerHouse(index).setIsViewer(false);
                  } else {
                    configPlayer[index]["isViewer"] = true;
                    this.getPlayerHouse(index).setIsViewer(true);
                    this.getPlayerHouse(index).playFxViewer();
                  }
                  this.setupSeatPlayer(index, infos[pos]);
                } else {
                  configPlayer[index]["playerId"] = -1;
                  configPlayer[index]["isViewer"] = true;
                }
              }
            }
            break;

           case XiDzach_Cmd_1.default.Code.CHAT_ROOM:
            {
              App_1.default.instance.showLoading(false);
              let res = new XiDzach_Cmd_1.default.ReceivedChatRoom(data);
              cc.log("XiDzach CHAT_ROOM res : ", JSON.stringify(res));
              let chair = res["chair"];
              let isIcon = res["isIcon"];
              let content = res["content"];
              if (isIcon) {
                let seatId = this.findPlayerSeatByPos(chair);
                -1 != seatId && this.getPlayerHouse(seatId).showChatEmotion(content);
              } else {
                let seatId = this.findPlayerSeatByPos(chair);
                -1 != seatId && this.getPlayerHouse(seatId).showChatMsg(content);
              }
            }
            break;

           case XiDzach_Cmd_1.default.Code.NOTIFY_CHUYEN_GIAI_DOAN_2:
            {
              App_1.default.instance.showLoading(false);
              let res = new XiDzach_Cmd_1.default.ReceivedChuyenGiaiDoan2(data);
              cc.log("XiDzach NOTIFY_CHUYEN_GIAI_DOAN_2 res : ", JSON.stringify(res));
              if (-1 != this.seatXiDzachOrXiBang) if (0 == this.seatXiDzachOrXiBang) {
                this.notifyHand.active = false;
                this.notifyHand2.active = false;
                this.btnNhaCon.active = false;
                this.btnNhaCai.active = false;
                this.setCanRutBai(false);
                this.cardsRut.active = true;
              } else if (this.seatXiDzachOrXiBang == this.seatOwner) {
                this.notifyHand.active = false;
                this.notifyHand2.active = false;
                this.btnNhaCon.active = false;
                this.btnNhaCai.active = false;
                this.setCanRutBai(false);
                this.cardsRut.active = true;
              } else {
                this.btnNhaCon.active = true;
                this.btnNhaCai.active = false;
                this.notifyHand.active = true;
                this.notifyHand2.active = true;
                this.setCanRutBai(true);
                this.cardsRut.active = true;
              } else if (this.isExistMeInfo) if (0 == this.seatOwner) {
                this.notifyHand.active = false;
                this.notifyHand2.active = false;
                this.btnNhaCon.active = false;
                this.btnNhaCai.active = false;
                this.setCanRutBai(false);
                this.cardsRut.active = true;
              } else {
                this.btnNhaCon.active = true;
                this.btnNhaCai.active = false;
                this.notifyHand.active = true;
                this.notifyHand2.active = true;
                this.setCanRutBai(true);
                this.cardsRut.active = true;
              } else {
                this.notifyHand.active = false;
                this.notifyHand2.active = false;
                this.btnNhaCon.active = false;
                this.btnNhaCai.active = false;
                this.setCanRutBai(false);
                this.cardsRut.active = true;
              }
            }
            break;

           case XiDzach_Cmd_1.default.Code.NOTIFY_CHUYEN_GIAI_DOAN_3:
            {
              App_1.default.instance.showLoading(false);
              let res = new XiDzach_Cmd_1.default.ReceivedChuyenGiaiDoan3(data);
              cc.log("XiDzach NOTIFY_CHUYEN_GIAI_DOAN_3 res : ", JSON.stringify(res));
              let countDownTime = res["countDownTime"];
              let sizeCard = res["sizeCard"];
              let chuongCards = res["chuongCards"];
              this.unschedule(this.intervalBetting);
              this.startBettingCountDown(countDownTime, "Nh\xe0 C\xe1i R\xfat B\xe0i");
              if (-1 != this.seatOwner) for (let a = 0; a < 5; a++) if (a < chuongCards.length) {
                let spriteCardId = chuongCards[a];
                this.getPlayerHouse(this.seatOwner).openCardRealNow(a, this.spriteCards[spriteCardId]);
              } else this.getPlayerHouse(this.seatOwner).hideCardRealNow(a);
              if (0 == this.seatOwner) {
                this.cardsRut.active = true;
                this.notifyHand.active = true;
                this.notifyHand2.active = true;
                this.setCanRutBai(true);
                this.btnNhaCon.active = false;
                this.btnNhaCai.active = true;
                var arrSeatExist = this.getNumPlayers();
                let numPlayer = arrSeatExist.length;
                for (let index = 0; index < numPlayer; index++) -1 != arrSeatExist[index] && 0 != arrSeatExist[index] && this.getPlayerHouse(arrSeatExist[index]).showBtnXeBaiOne(true);
              } else {
                this.cardsRut.active = false;
                this.notifyHand.active = false;
                this.notifyHand2.active = false;
                this.setCanRutBai(false);
                this.btnNhaCon.active = false;
                this.btnNhaCai.active = false;
                this.getPlayerHouse(this.seatOwner).playFxDangXep();
              }
            }
            break;

           case XiDzach_Cmd_1.default.Code.RUT_BAI:
            {
              App_1.default.instance.showLoading(false);
              let res = new XiDzach_Cmd_1.default.ReceivedRutCard(data);
              cc.log("XiDzach RUT_BAI res : ", JSON.stringify(res));
              let chair = res["chair"];
              let card = res["card"];
              let seatId = this.findPlayerSeatByPos(chair);
              if (-1 != seatId) {
                0 == seatId && cc.log("XiDzach RUT_BAI me rut res : ", JSON.stringify(res));
                let realCardId = this.getPlayerHouse(seatId).getRealCardCanUse();
                if (0 == chair && 0 == card) ; else if (52 == card) this.getPlayerHouse(seatId).openCardRealNow(realCardId, this.spriteCardBack); else {
                  let spriteCardId = card;
                  this.getPlayerHouse(seatId).openCardRealNow(realCardId, this.spriteCards[spriteCardId]);
                  if (0 == seatId) {
                    this.currentCard.push(card);
                    var gr = new XiZachGroupCard_1.default(this.currentCard);
                    if (gr.isQuac()) {
                      this.setCanRutBai(false);
                      this.notifyHand.active = false;
                      this.notifyHand2.active = false;
                      this.unschedule(this.intervalBetting);
                      this.actionBetting.active = false;
                    }
                    this.getPlayerHouse(0).showCardName(gr);
                  }
                }
              }
            }
            break;

           case XiDzach_Cmd_1.default.Code.DAN_BAI:
            {
              App_1.default.instance.showLoading(false);
              let res = new XiDzach_Cmd_1.default.ReceivedDanBai(data);
              cc.log("XiDzach DAN_BAI res : ", JSON.stringify(res));
              let chair = res["chair"];
              let seatId = this.findPlayerSeatByPos(chair);
              if (-1 != seatId) {
                let needShowDanBai = this.getPlayerHouse(seatId).checkNeedShowDanBai();
                needShowDanBai && this.getPlayerHouse(seatId).playFxXepXong();
                if (0 == seatId) {
                  this.btnNhaCon.active = false;
                  this.notifyHand.active = false;
                  this.notifyHand2.active = false;
                  this.setCanRutBai(false);
                }
              }
            }
            break;

           case XiDzach_Cmd_1.default.Code.RUT_BAI_TU_DONG:
            {
              App_1.default.instance.showLoading(false);
              let res = new XiDzach_Cmd_1.default.ReceivedRutBaiTuDong(data);
              cc.log("XiDzach RUT_BAI_TU_DONG res : ", JSON.stringify(res));
              let chair = res["chair"];
              let cardSize = res["cardSize"];
              let cards = res["cards"];
              let seatId = this.findPlayerSeatByPos(chair);
              if (-1 != seatId) for (let index = 0; index < cards.length; index++) {
                let realCardId = this.getPlayerHouse(seatId).getRealCardCanUse();
                let spriteCardId = cards[index];
                this.getPlayerHouse(seatId).openCardRealNow(realCardId, this.spriteCards[spriteCardId]);
              }
            }
            break;

           case XiDzach_Cmd_1.default.Code.SO_BAI:
            {
              App_1.default.instance.showLoading(false);
              let res = new XiDzach_Cmd_1.default.ReceivedSoBai(data);
              cc.log("XiDzach SO_BAI res : ", JSON.stringify(res));
              let chair1 = res["chair1"];
              let chair2 = res["chair2"];
              let winMoney1 = res["winMoney1"];
              let winMoney2 = res["winMoney2"];
              let currentMoney1 = res["currentMoney1"];
              let currentMoney2 = res["currentMoney2"];
              let hasCard1 = res["hasCard1"];
              let card1 = res["card1"];
              let hasCard2 = res["hasCard2"];
              let card2 = res["card2"];
              let cardSize1 = res["cardSize1"];
              let cardSize2 = res["cardSize2"];
              let seatId_1 = this.findPlayerSeatByPos(chair1);
              let seatId_2 = this.findPlayerSeatByPos(chair2);
              if (-1 != seatId_1 && -1 != seatId_2) {
                this.getPlayerHouse(seatId_1).hideFxWinLose();
                this.getPlayerHouse(seatId_2).hideFxWinLose();
                if (0 == seatId_1) {
                  Configs_1.default.Login.Coin = currentMoney1;
                  BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN);
                  0 !== this.seatOwner && this.showResultEffect(winMoney1);
                }
                if (0 == seatId_2) {
                  Configs_1.default.Login.Coin = currentMoney2;
                  BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN);
                  0 !== this.seatOwner && this.showResultEffect(winMoney2);
                }
                if (winMoney1 > 0) {
                  this.getPlayerHouse(seatId_1).fxWin({
                    moneyChange: winMoney1,
                    money: currentMoney1
                  });
                  this.getPlayerHouse(seatId_2).fxLose({
                    moneyChange: winMoney2,
                    money: currentMoney2
                  });
                } else if (winMoney1 < 0) {
                  this.getPlayerHouse(seatId_1).fxLose({
                    moneyChange: winMoney1,
                    money: currentMoney1
                  });
                  this.getPlayerHouse(seatId_2).fxWin({
                    moneyChange: winMoney2,
                    money: currentMoney2
                  });
                } else {
                  this.getPlayerHouse(seatId_1).fxWin({
                    moneyChange: winMoney1,
                    money: currentMoney1
                  });
                  this.getPlayerHouse(seatId_2).fxWin({
                    moneyChange: winMoney2,
                    money: currentMoney2
                  });
                }
                var gr = new XiZachGroupCard_1.default(card1);
                this.getPlayerHouse(seatId_1).showCardName(gr);
                var gr2 = new XiZachGroupCard_1.default(card2);
                this.getPlayerHouse(seatId_2).showCardName(gr2);
                for (let a = 0; a < 5; a++) if (a < card1.length) {
                  let spriteCardId = card1[a];
                  this.getPlayerHouse(seatId_1).openCardRealNow(a, this.spriteCards[spriteCardId]);
                } else this.getPlayerHouse(seatId_1).hideCardRealNow(a);
                for (let a = 0; a < 5; a++) if (a < card2.length) {
                  let spriteCardId = card2[a];
                  this.getPlayerHouse(seatId_2).openCardRealNow(a, this.spriteCards[spriteCardId]);
                } else this.getPlayerHouse(seatId_2).hideCardRealNow(a);
              }
            }
            break;

           case XiDzach_Cmd_1.default.Code.NOTIFY_NO_CHUONG:
            App_1.default.instance.showLoading(false);
            cc.log("XiDzach NOTIFY_NO_CHUONG ");
            break;

           case XiDzach_Cmd_1.default.Code.NOTIFY_XIZACH:
            {
              App_1.default.instance.showLoading(false);
              let res = new XiDzach_Cmd_1.default.ReceivedKetQuaXiZach(data);
              cc.log("XiDzach NOTIFY_XIZACH res : ", JSON.stringify(res));
              let handle = () => {
                let needShowList = res["needShowList"];
                let needUpdateMoneyList = res["needUpdateMoneyList"];
                let listCards = res["listCards"];
                let winMoneyList = res["winMoneyList"];
                let currentMoneyList = res["currentMoneyList"];
                let playerPosWin = -1;
                for (let index = 0; index < XiDzach_Cmd_1.default.Code.MAX_PLAYER; index++) winMoneyList[index] > 0 && (playerPosWin = index);
                if (-1 != playerPosWin) {
                  let seatIdWin = this.findPlayerSeatByPos(playerPosWin);
                  if (-1 != seatIdWin) {
                    this.seatXiDzachOrXiBang = seatIdWin;
                    if (0 == seatIdWin) {
                      this.btnNhaCai.active = false;
                      this.btnNhaCon.active = false;
                      this.notifyHand.active = false;
                      this.notifyHand2.active = false;
                      this.setCanRutBai(false);
                    }
                    if (seatIdWin == this.seatOwner) {
                      this.unschedule(this.intervalEnd);
                      this.notifyTimeEnd.active = false;
                      this.btnNhaCon.active = false;
                      this.btnNhaCai.active = false;
                      this.notifyHand.active = false;
                      this.notifyHand2.active = false;
                      this.setCanRutBai(false);
                    }
                    this.getPlayerHouse(seatIdWin).hideFxCombineState(false);
                  }
                }
                let isXiDzach = [];
                for (let i = 0; i < needShowList.length; i++) if (1 === needShowList[i]) {
                  let arrCardShow = listCards[i];
                  isXiDzach[i] = !(2 == arrCardShow.length && 0 == Math.floor(Number(arrCardShow[0]) / 4) && 0 == Math.floor(Number(arrCardShow[1]) / 4));
                }
                let posPlaying = [];
                for (let index = 0; index < XiDzach_Cmd_1.default.Code.MAX_PLAYER; index++) 1 == needUpdateMoneyList[index] && posPlaying.push(index);
                for (let index = 0; index < XiDzach_Cmd_1.default.Code.MAX_PLAYER; index++) {
                  let findId = posPlaying.indexOf(configPlayer[index].playerPos);
                  if (-1 === findId) continue;
                  let cards = listCards[posPlaying[findId]];
                  for (let a = 0; a < 5; a++) if (a < cards.length) {
                    let spriteCardId = cards[a];
                    this.getPlayerHouse(index).openCardRealNow(a, this.spriteCards[spriteCardId]);
                  } else cards.length > 0 && this.getPlayerHouse(index).hideCardRealNow(a);
                  let moneyInfo = {
                    moneyChange: winMoneyList[posPlaying[findId]],
                    money: currentMoneyList[posPlaying[findId]]
                  };
                  if (0 == index) {
                    Configs_1.default.Login.Coin = currentMoneyList[posPlaying[findId]];
                    BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN);
                    this.showResultEffect(moneyInfo.moneyChange);
                  }
                  if (moneyInfo.moneyChange >= 0) {
                    this.getPlayerHouse(index).fxWin(moneyInfo);
                    this.getPlayerHouse(index).hideCardName();
                    let plPos = configPlayer[index].playerPos;
                    this.getPlayerHouse(index).showFxSpecial(void 0 !== isXiDzach[plPos] && isXiDzach[plPos] ? 3 : 2);
                  } else {
                    this.getPlayerHouse(index).fxLose(moneyInfo);
                    this.getPlayerHouse(index).hideCardName();
                  }
                }
              };
              let numPlayer = this.getNumPlayers().length;
              let timeShip = .1;
              let delayOver2Under = .2;
              var maxDelay = (2 * numPlayer + (numPlayer - 1)) * timeShip;
              let timeUnderLayer = maxDelay + .2 + delayOver2Under + .2;
              this.scheduleOnce(() => {
                handle();
              }, timeUnderLayer);
            }
            break;

           case XiDzach_Cmd_1.default.Code.CARDS_DEFINE:
            {
              let res = new XiDzach_Cmd_1.default.ReceivedCardDefinations(data);
              cc.log(res);
              this.setCardDefinations(JSON.parse(res.strData).object || []);
            }
            break;

           default:
            cc.log(inpacket.getCmdId());
          }
        }, this);
      }
      actionLeaveRoom() {
        XiDzach_NetworkClient_1.default.getInstance().send(new XiDzach_Cmd_1.default.SendRequestLeaveGame());
      }
      actionOpenCard() {
        XiDzach_NetworkClient_1.default.getInstance().send(new XiDzach_Cmd_1.default.CmdSendMoBai());
        this.btnNhaCai.active = false;
      }
      actionDanBai() {
        XiDzach_NetworkClient_1.default.getInstance().send(new XiDzach_Cmd_1.default.sendDanBai());
      }
      actionRutBai() {
        XiDzach_NetworkClient_1.default.getInstance().send(new XiDzach_Cmd_1.default.sendRutBai());
      }
      actionXeBaiOne(event, data) {
        let seatId = parseInt(data);
        let playerPos = this.findPlayerPosBySeat(seatId);
        this.getPlayerHouse(seatId).showBtnXeBaiOne(false);
        XiDzach_NetworkClient_1.default.getInstance().send(new XiDzach_Cmd_1.default.sendXetBaiOne(playerPos));
      }
      actionXeBaiAll() {
        XiDzach_NetworkClient_1.default.getInstance().send(new XiDzach_Cmd_1.default.sendXetBaiAll());
      }
      initConfigPlayer() {
        configPlayer = [];
        for (let index = 0; index < XiDzach_Cmd_1.default.Code.MAX_PLAYER; index++) configPlayer.push({
          seatId: index,
          playerId: -1,
          playerPos: -1,
          isViewer: true
        });
      }
      resetPlayersPlaying() {
        for (let index = 0; index < XiDzach_Cmd_1.default.Code.MAX_PLAYER; index++) this.getPlayerHouse(index).resetMatchHistory();
      }
      setupSeatPlayer(seatId, playerInfo) {
        configPlayer[seatId].playerId = playerInfo.nickName;
        this.getPlayerHouse(seatId).setAvatar(playerInfo.avatar);
        this.getPlayerHouse(seatId).setName(playerInfo.nickName);
        this.getPlayerHouse(seatId).setGold(playerInfo.money);
        0 === seatId && this.getPlayerHouse(seatId).setButtonChat();
      }
      findPlayerSeatByUid(uid) {
        let seat = -1;
        for (let index = 0; index < configPlayer.length; index++) configPlayer[index].playerId === uid && (seat = configPlayer[index].seatId);
        return seat;
      }
      findPlayerPosBySeat(seat) {
        return configPlayer[seat].playerPos;
      }
      findPlayerSeatByPos(pos) {
        if (-1 == pos) return -1;
        let seat = -1;
        for (let index = 0; index < configPlayer.length; index++) configPlayer[index].playerPos === pos && (seat = configPlayer[index].seatId);
        return seat;
      }
      getPlayerHouse(seatId) {
        return this.groupPlayers.children[seatId].getComponent(XiDzach_Player_1.default);
      }
      getNumPlayers() {
        var playerPosEntry = [];
        for (let index = 0; index < configPlayer.length; index++) -1 === configPlayer[index].playerId || configPlayer[index].isViewer || playerPosEntry.push(configPlayer[index].seatId);
        return playerPosEntry;
      }
      onKickFromRoom(reason) {
        let seatId = 0;
        for (let index = 0; index < configPlayer.length; index++) if (configPlayer[index].seatId == seatId) {
          configPlayer[index].playerId = -1;
          configPlayer[index].isViewer = true;
        }
        this.getPlayerHouse(seatId).resetPlayerInfo();
        let arrSeatExistLast = this.getNumPlayers();
        1 == arrSeatExistLast.length && this.resetPlayersPlaying();
        if (0 == seatId) {
          this.UI_Playing.active = false;
          this.UI_ChooseRoom.active = true;
          this.refeshListRoom();
        }
        this.scheduleOnce(() => {
          switch (reason) {
           case XiDzach_Cmd_1.default.Code.ERROR_MONEY:
            App_1.default.instance.actiontDialog.showMsgWithAction("S\u1ed1 d\u01b0 kh\xf4ng \u0111\u1ee7.", "N\u1ea0P NGAY", () => {
              App_1.default.instance.openShop(0);
            });
            break;

           case XiDzach_Cmd_1.default.Code.ERROR_BAO_TRI:
            App_1.default.instance.alertDialog.showMsg("H\u1ec7 th\u1ed1ng b\u1ea3o tr\xec!");
            break;

           default:
            App_1.default.instance.alertDialog.showMsg("B\u1ea1n b\u1ecb kick kh\u1ecfi b\xe0n ch\u01a1i!");
          }
        }, .5);
      }
      showResultEffect(moneyChange) {
        this.disableEffects();
        let effect = moneyChange > 0 ? this.effectWin : 0 === moneyChange ? this.effectDraw : this.effectLose;
        effect.active = true;
        this.scheduleOnce(() => {
          effect.active = false;
        }, 5);
      }
      disableEffects() {
        this.effectWin.active = false;
        this.effectDraw.active = false;
        this.effectLose.active = false;
      }
      getCardDefinations() {
        XiDzach_NetworkClient_1.default.getInstance().send(new XiDzach_Cmd_1.default.SendCardDefinations());
      }
      setCardDefinations(cards) {
        this.cardDefinations = cards;
        this.btnShowCardDefinations.node.active = (true, this.cardDefinations) && this.cardDefinations.length > 0;
      }
      actShowCardDefinations() {
        PopupCardDefinations_1.default.createAndShow(App_1.default.instance.popups, this.cardDefinations, this.spriteCards);
      }
      actShowChat() {
        PopupChatInGame_1.default.createAndShow(this.UI_Playing, this.cardDefinations, (chatType, content) => {
          XiDzach_NetworkClient_1.default.getInstance().send(new XiDzach_Cmd_1.default.SendChatRoom(chatType, content));
        }, (cheatType, cardCheatIds) => {
          XiDzach_NetworkClient_1.default.getInstance().send(new XiDzach_Cmd_1.default.SendCheatCards(cheatType, cardCheatIds));
        });
      }
      actSetting() {
        PopupSettingInGame_1.default.createAndShow(this.UI_Playing, Configs_1.default.App.BUNDLE_NAME.XIDZACH, () => {
          this.showPopupGuide();
        }, () => {
          XiDzach_NetworkClient_1.default.getInstance().send(new XiDzach_Cmd_1.default.SendRequestLeaveGame());
        });
      }
    };
    XiDzachController.instance = null;
    __decorate([ property(cc.Node) ], XiDzachController.prototype, "UI_ChooseRoom", void 0);
    __decorate([ property(cc.Label) ], XiDzachController.prototype, "labelNickName", void 0);
    __decorate([ property(cc.Label) ], XiDzachController.prototype, "labelCoin", void 0);
    __decorate([ property(cc.Sprite) ], XiDzachController.prototype, "sprAvatar", void 0);
    __decorate([ property(cc.Prefab) ], XiDzachController.prototype, "prefabItemRoom", void 0);
    __decorate([ property(cc.ScrollView) ], XiDzachController.prototype, "scrollListRoom", void 0);
    __decorate([ property(cc.Node) ], XiDzachController.prototype, "UI_Playing", void 0);
    __decorate([ property(cc.Node) ], XiDzachController.prototype, "meCards", void 0);
    __decorate([ property(cc.Node) ], XiDzachController.prototype, "groupPlayers", void 0);
    __decorate([ property(cc.SpriteFrame) ], XiDzachController.prototype, "spriteCards", void 0);
    __decorate([ property(cc.SpriteFrame) ], XiDzachController.prototype, "spriteCardBack", void 0);
    __decorate([ property(cc.Node) ], XiDzachController.prototype, "cardsDeal", void 0);
    __decorate([ property(cc.Node) ], XiDzachController.prototype, "btnNhaCai", void 0);
    __decorate([ property(cc.Node) ], XiDzachController.prototype, "btnNhaCon", void 0);
    __decorate([ property(cc.Label) ], XiDzachController.prototype, "labelRoomId", void 0);
    __decorate([ property(cc.Label) ], XiDzachController.prototype, "labelRoomBet", void 0);
    __decorate([ property(cc.Label) ], XiDzachController.prototype, "labelMatchId", void 0);
    __decorate([ property(cc.Node) ], XiDzachController.prototype, "actionBetting", void 0);
    __decorate([ property(cc.Node) ], XiDzachController.prototype, "cardsRut", void 0);
    __decorate([ property(cc.Node) ], XiDzachController.prototype, "notifyTimeStart", void 0);
    __decorate([ property(cc.Node) ], XiDzachController.prototype, "notifyTimeEnd", void 0);
    __decorate([ property(cc.Node) ], XiDzachController.prototype, "notifyHand", void 0);
    __decorate([ property(cc.Node) ], XiDzachController.prototype, "notifyHand2", void 0);
    __decorate([ property(cc.Label) ], XiDzachController.prototype, "labelBettingCountDown", void 0);
    __decorate([ property(cc.Node) ], XiDzachController.prototype, "popupNodity", void 0);
    __decorate([ property(cc.Label) ], XiDzachController.prototype, "labelNotifyContent", void 0);
    __decorate([ property(cc.Node) ], XiDzachController.prototype, "popupGuide", void 0);
    __decorate([ property(cc.Button) ], XiDzachController.prototype, "btnShowCardDefinations", void 0);
    __decorate([ property(cc.Node) ], XiDzachController.prototype, "effectWin", void 0);
    __decorate([ property(cc.Node) ], XiDzachController.prototype, "effectDraw", void 0);
    __decorate([ property(cc.Node) ], XiDzachController.prototype, "effectLose", void 0);
    XiDzachController = XiDzachController_1 = __decorate([ ccclass ], XiDzachController);
    exports.default = XiDzachController;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/App": void 0,
    "../../Main/Game/src/common/BroadcastReceiver": void 0,
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/common/Utils": void 0,
    "../../Main/Game/src/games/cardgames/ItemRoom": void 0,
    "../../Main/Game/src/games/cardgames/PopupCardDefinations": void 0,
    "../../Main/Game/src/games/cardgames/PopupChatInGame": void 0,
    "../../Main/Game/src/games/cardgames/PopupSettingInGame": void 0,
    "../../Main/Game/src/networks/CardGame.Cmd": void 0,
    "../../Main/Game/src/networks/Network.Cmd": void 0,
    "../../Main/Game/src/networks/Network.InPacket": void 0,
    "./XiDzach.Cmd": "XiDzach.Cmd",
    "./XiDzach.NetworkClient": "XiDzach.NetworkClient",
    "./XiDzach.Player": "XiDzach.Player",
    "./XiZachGroupCard": "XiZachGroupCard"
  } ],
  "XiDzach.NetworkClient": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "245deO/+aRLuaeVx06xJoge", "XiDzach.NetworkClient");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Network_NetworkClient_1 = require("../../Main/Game/src/networks/Network.NetworkClient");
    const Network_NetworkListener_1 = require("../../Main/Game/src/networks/Network.NetworkListener");
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    class XiDzachNetworkClient extends Network_NetworkClient_1.default {
      constructor() {
        super();
        this.listeners = new Array();
        this.isUseWSS = Configs_1.default.App.USE_WSS;
      }
      static getInstance() {
        null == this.instance && (this.instance = new XiDzachNetworkClient());
        return this.instance;
      }
      connect() {
        super.connect(Configs_1.default.App.HOST_XIDZACH.host, Configs_1.default.App.HOST_XIDZACH.port);
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
    exports.default = XiDzachNetworkClient;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/networks/Network.NetworkClient": void 0,
    "../../Main/Game/src/networks/Network.NetworkListener": void 0
  } ],
  "XiDzach.Player": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f7a2a4cQOZEQ53oAY1L1x7V", "XiDzach.Player");
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
    const XiZachGroupCard_1 = require("./XiZachGroupCard");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let Player = class Player extends cc.Component {
      constructor() {
        super(...arguments);
        this.avatar = null;
        this.cardReady = null;
        this.cardReal = null;
        this.userName = null;
        this.userGold = null;
        this.owner = null;
        this.cardsName = null;
        this.actionViewer = null;
        this.actionThinking = null;
        this.actionWin = null;
        this.actionHoa = null;
        this.goldWin = null;
        this.actionLose = null;
        this.goldLose = null;
        this.actionXepXong = null;
        this.actionDangXep = null;
        this.btnXetBai = null;
        this.hub = null;
        this.goldBet = null;
        this.prefabItemChip = null;
        this.notify = null;
        this.chatEmotion = null;
        this.chatMsg = null;
        this.shadowAvatar = null;
        this.shadowInfo = null;
        this.spriteCardBack = null;
        this.fxSpecial = null;
      }
      start() {
        BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.SET_SOUND, this.node);
      }
      showChatEmotion(content) {
        this.node.getChildByName("Chat").active = true;
        this.chatEmotion.active = true;
        this.chatMsg.active = false;
        this.chatEmotion.getComponent(sp.Skeleton).setAnimation(0, content, true);
        this.scheduleOnce(() => {
          this.chatEmotion.active = false;
        }, 3);
      }
      showChatMsg(content) {
        this.node.getChildByName("Chat").active = true;
        this.chatEmotion.active = false;
        this.chatMsg.active = true;
        this.chatMsg.children[1].getComponent(cc.Label).string = content;
        this.scheduleOnce(() => {
          this.chatMsg.active = false;
        }, 3);
      }
      setOwner(state) {
        this.owner.active = state;
      }
      setAvatar(avatar) {
        this.node.getChildByName("Avatar").active = true;
        this.avatar.getComponent(cc.Sprite).spriteFrame = App_1.default.instance.getAvatarSpriteFrame(avatar);
      }
      setIsViewer(state) {
        this.shadowAvatar.active = state;
        this.shadowInfo.active = state;
      }
      setName(data) {
        this.node.getChildByName("Info").active = true;
        this.userName.string = data;
      }
      showCardReady(state) {
        this.node.getChildByName("Card").active = true;
        this.cardReady.active = state;
      }
      showCardReal(state) {
        this.node.getChildByName("Card").active = true;
        this.cardReal.active = state;
      }
      prepareToTransform() {
        for (let index = 0; index < this.cardReal.childrenCount; index++) this.prepareCardReal(index);
      }
      prepareCardReal(pos) {
        this.cardReal.children[pos].active = true;
        this.cardReal.children[pos].runAction(cc.scaleTo(0, 0, 1));
      }
      transformToCardReal(cardPos, spriteCard) {
        this.showCardReal(true);
        this.cardReal.children[cardPos].active = true;
        this.cardReal.children[cardPos].children[0].getComponent(cc.Sprite).spriteFrame = spriteCard;
        this.cardReady.children[cardPos].runAction(cc.sequence(cc.scaleTo(.15, 0, 1), cc.callFunc(() => {})));
        this.cardReal.children[cardPos].runAction(cc.sequence(cc.delayTime(.15), cc.scaleTo(.15, 1, 1), cc.callFunc(() => {})));
      }
      getRealCardCanUse() {
        for (let index = 0; index < this.cardReal.childrenCount; index++) if (!this.cardReal.children[index].active) return index;
        return 0;
      }
      openCardRealNow(cardPos, spriteCard) {
        this.showCardReal(true);
        this.showCardReady(false);
        this.cardReal.children[cardPos].active = true;
        this.cardReal.children[cardPos].children[0].getComponent(cc.Sprite).spriteFrame = spriteCard;
        this.cardReal.children[cardPos].runAction(cc.sequence(cc.delayTime(.15), cc.scaleTo(.15, 1, 1), cc.callFunc(() => {})));
      }
      hideCardRealNow(cardPos) {
        this.cardReal.children[cardPos].active = false;
      }
      showCardName(gr) {
        this.hideFxSpecial();
        if (gr.isXiBang()) {
          this.showFxSpecial(2);
          this.cardsName.active = false;
          return;
        }
        if (gr.isXiZach()) {
          this.showFxSpecial(3);
          this.cardsName.active = false;
          return;
        }
        if (gr.isNguLinh()) {
          this.showFxSpecial(4);
          this.cardsName.active = false;
          return;
        }
        if (21 == gr.getMaxDiem()) {
          this.cardsName.active = true;
          this.cardsName.children[0].getComponent(cc.Label).string = "21 \u0110i\u1ec3m";
          return;
        }
        if (gr.isQuac()) {
          this.showFxSpecial(1);
          this.cardsName.active = false;
          return;
        }
        if (gr.getMaxDiem() < 16) {
          this.showFxSpecial(0);
          (null == gr.cards || gr.cards.length < 5) && (this.cardsName.active = true);
          this.cardsName.children[0].getComponent(cc.Label).string = gr.getMaxDiem() + " \u0110i\u1ec3m";
          return;
        }
        this.hideFxSpecial();
        gr.bo = XiZachGroupCard_1.XiZachGroupCardConstant.KG_THUONG;
        this.cardsName.active = true;
        this.cardsName.children[0].getComponent(cc.Label).string = gr.getMaxDiem() + " \u0110i\u1ec3m";
        return;
      }
      hideCardName() {
        this.cardsName.active = false;
      }
      setGold(data) {
        this.actionThinking.active = false;
        this.showGold(true);
        this.userGold.string = this.formatGold(data);
      }
      setBet(data) {
        this.showPlayerBet(true);
        this.goldBet.string = this.formatGold(data);
      }
      addChips() {
        var item1 = cc.instantiate(this.prefabItemChip);
        var item2 = cc.instantiate(this.prefabItemChip);
        this.hub.addChild(item1);
        this.hub.addChild(item2);
      }
      showPlayerBet(state) {
        this.node.getChildByName("Chips").active = state;
        state || this.hub.removeAllChildren(true);
      }
      setCardReal01(data) {
        this.cardReal.children[0].children[0].getComponent(cc.Sprite).spriteFrame = data;
      }
      setCardReal02(data) {
        this.cardReal.children[1].children[0].getComponent(cc.Sprite).spriteFrame = data;
      }
      showPlayCountdown() {
        this.node.getChildByName("Action").active = true;
        this.actionThinking.active = true;
        this.processThinking(0);
      }
      hidePlayCountdown() {
        this.actionThinking.active = false;
      }
      processThinking(rate) {
        this.actionThinking.getComponent(cc.Sprite).fillRange = rate;
      }
      showGold(state) {
        this.node.getChildByName("Info").children[2].active = state;
      }
      prepareFxAction() {
        this.node.getChildByName("Action").active = true;
        this.resetAction();
      }
      showFxSpecial(id) {
        this.fxSpecial.active = true;
        this.hideFxSpecial();
        this.fxSpecial.children[id].active = true;
      }
      hideFxSpecial() {
        for (let index = 0; index < this.fxSpecial.childrenCount; index++) this.fxSpecial.children[index].active = false;
      }
      checkNeedShowDanBai() {
        if (this.fxSpecial.children[2].active || this.fxSpecial.children[3].active) return false;
        return true;
      }
      showBtnXeBaiOne(state) {
        this.btnXetBai.active = state;
      }
      setCanXetBaiOne(state) {
        this.btnXetBai.color = state ? cc.Color.WHITE : cc.Color.GRAY;
        this.btnXetBai.getComponent(cc.Button).interactable = state;
      }
      playFxViewer() {
        this.prepareFxAction();
        this.actionViewer.active = true;
      }
      playFxDangXep() {
        this.prepareFxAction();
        this.actionDangXep.active = true;
        this.actionXepXong.active = false;
      }
      playFxXepXong() {
        this.prepareFxAction();
        this.actionDangXep.active = false;
        this.actionXepXong.active = true;
      }
      hideFxCombineState(state) {
        this.actionDangXep.active = state;
        this.actionXepXong.active = state;
      }
      fxOtherPlayerFold() {
        this.cardReady.runAction(cc.moveBy(.5, 0, -100));
      }
      fxMeFold() {
        this.shadowCardReal(true);
        this.cardReal.runAction(cc.moveBy(.5, 0, -20));
      }
      fxWin(playerInfo) {
        if (0 == playerInfo.moneyChange) {
          this.fxHoa(playerInfo);
          return;
        }
        this.node.getChildByName("Action").active = true;
        this.actionWin.active = true;
        this.fxGoldChange(0, playerInfo.moneyChange, this.goldWin.node);
        this.setGold(this.formatGold(playerInfo.money));
      }
      fxHoa(playerInfo) {
        this.node.getChildByName("Action").active = true;
        this.actionHoa.active = true;
        this.fxGoldChange(0, playerInfo.moneyChange, this.actionHoa.getChildByName("gold lose"));
        this.setGold(this.formatGold(playerInfo.money));
      }
      fxLose(playerInfo) {
        this.node.getChildByName("Action").active = true;
        this.actionLose.active = true;
        this.fxGoldChange(0, playerInfo.moneyChange, this.goldLose.node);
        this.setGold(this.formatGold(playerInfo.money));
      }
      hideFxWinLose() {
        this.actionWin.active = false;
        this.actionHoa.active = false;
        this.actionLose.active = false;
        this.node.getChildByName("Action").active = false;
      }
      shadowCardReady(state) {
        for (let index = 0; index < this.cardReady.childrenCount; index++) this.cardReady.children[index].color = state ? cc.Color.GRAY : cc.Color.WHITE;
      }
      shadowCardReal(state) {
        for (let index = 0; index < this.cardReal.childrenCount; index++) this.cardReal.children[index].children[0].color = state ? cc.Color.GRAY : cc.Color.WHITE;
      }
      setCardWin(pos, state) {
        this.cardReal.children[pos].children[0].color = state ? cc.Color.WHITE : cc.Color.GRAY;
      }
      showNotify(is_out) {
        this.notify.active = true;
        this.notify.getComponentInChildren(cc.Label).string = is_out ? "S\u1eafp r\u1eddi b\xe0n!" : "Ch\u01a1i ti\u1ebfp!";
        this.scheduleOnce(() => {
          this.notify.active = false;
        }, 1.5);
      }
      resetAction() {
        for (let index = 0; index < this.node.getChildByName("Action").childrenCount; index++) this.node.getChildByName("Action").children[index].active = false;
      }
      resetMatchHistory() {
        this.resetCardReady();
        this.resetCardReal();
        this.hideFxSpecial();
        this.btnXetBai.active = false;
        this.node.getChildByName("Card").active = false;
        this.showGold(true);
        this.cardsName.active = false;
        this.resetAction();
        this.node.getChildByName("Chips").active = false;
        this.goldBet.string = "0";
        this.hub.removeAllChildren(true);
      }
      resetCardReady() {
        this.cardReady.children[0].scale = 1;
        this.cardReady.children[1].scale = 1;
        this.cardReady.active = false;
      }
      resetCardReal() {
        this.cardReal.active = false;
        this.cardReal.y = 0;
        for (let index = 0; index < this.cardReal.childrenCount; index++) this.cardReal.children[index].children[0].getComponent(cc.Sprite).spriteFrame = this.spriteCardBack;
        this.shadowCardReal(false);
      }
      resetPlayerInfo() {
        for (let index = 0; index < this.node.childrenCount; index++) this.node.children[index].active = false;
        for (let index = 0; index < this.cardReal.childrenCount; index++) this.cardReal.children[index].children[0].getComponent(cc.Sprite).spriteFrame = this.spriteCardBack;
        this.cardReady.active = false;
        this.cardReal.active = false;
        this.cardsName.active = false;
        this.actionViewer.active = false;
        this.actionThinking.active = false;
        this.actionWin.active = false;
        this.actionHoa.active = false;
        this.actionLose.active = false;
        this.goldBet.string = "0";
        this.hub.removeAllChildren(true);
        this.setIsViewer(true);
      }
      fxGoldChange(goldStart, goldEnd, node) {
        var goldAdd = goldEnd - goldStart;
        node.getComponent(cc.Label).string = this.formatGold(goldStart);
        var steps = 10;
        var deltaGoldAdd = Math.floor(goldAdd / steps);
        var rep = cc.repeat(cc.sequence(cc.delayTime(.05), cc.callFunc(() => {
          goldStart += deltaGoldAdd;
          node.getComponent(cc.Label).string = (goldAdd > 0 ? "+" : "") + this.formatGold(goldStart);
        })), steps);
        var seq = cc.sequence(rep, cc.callFunc(() => {
          goldStart = goldEnd;
          node.getComponent(cc.Label).string = (goldAdd > 0 ? "+" : "") + this.formatGold(goldStart);
        }));
        node.runAction(seq);
      }
      formatGold(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      }
      setButtonChat() {
        this.node.getChildByName("BtnChat").active = true;
      }
    };
    __decorate([ property(cc.Node) ], Player.prototype, "avatar", void 0);
    __decorate([ property(cc.Node) ], Player.prototype, "cardReady", void 0);
    __decorate([ property(cc.Node) ], Player.prototype, "cardReal", void 0);
    __decorate([ property(cc.Label) ], Player.prototype, "userName", void 0);
    __decorate([ property(cc.Label) ], Player.prototype, "userGold", void 0);
    __decorate([ property(cc.Node) ], Player.prototype, "owner", void 0);
    __decorate([ property(cc.Node) ], Player.prototype, "cardsName", void 0);
    __decorate([ property(cc.Node) ], Player.prototype, "actionViewer", void 0);
    __decorate([ property(cc.Node) ], Player.prototype, "actionThinking", void 0);
    __decorate([ property(cc.Node) ], Player.prototype, "actionWin", void 0);
    __decorate([ property(cc.Node) ], Player.prototype, "actionHoa", void 0);
    __decorate([ property(cc.Label) ], Player.prototype, "goldWin", void 0);
    __decorate([ property(cc.Node) ], Player.prototype, "actionLose", void 0);
    __decorate([ property(cc.Label) ], Player.prototype, "goldLose", void 0);
    __decorate([ property(cc.Node) ], Player.prototype, "actionXepXong", void 0);
    __decorate([ property(cc.Node) ], Player.prototype, "actionDangXep", void 0);
    __decorate([ property(cc.Node) ], Player.prototype, "btnXetBai", void 0);
    __decorate([ property(cc.Node) ], Player.prototype, "hub", void 0);
    __decorate([ property(cc.Label) ], Player.prototype, "goldBet", void 0);
    __decorate([ property(cc.Prefab) ], Player.prototype, "prefabItemChip", void 0);
    __decorate([ property(cc.Node) ], Player.prototype, "notify", void 0);
    __decorate([ property(cc.Node) ], Player.prototype, "chatEmotion", void 0);
    __decorate([ property(cc.Node) ], Player.prototype, "chatMsg", void 0);
    __decorate([ property(cc.Node) ], Player.prototype, "shadowAvatar", void 0);
    __decorate([ property(cc.Node) ], Player.prototype, "shadowInfo", void 0);
    __decorate([ property(cc.SpriteFrame) ], Player.prototype, "spriteCardBack", void 0);
    __decorate([ property(cc.Node) ], Player.prototype, "fxSpecial", void 0);
    Player = __decorate([ ccclass ], Player);
    exports.default = Player;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/App": void 0,
    "../../Main/Game/src/common/BroadcastReceiver": void 0,
    "./XiZachGroupCard": "XiZachGroupCard"
  } ],
  XiZachCard: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1b540VPjlVJVpS3TyZk60Ds", "XiZachCard");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    class XiZachCard {
      constructor(id = null) {
        this.id = null;
        this.so = null;
        this.chat = null;
        this.id = id;
        this.so = this.getNumber();
        this.chat = this.getSuit();
      }
      setCard(number, suit) {
        this.id = 4 * (number - 2) + suit;
      }
      getNumber() {
        return Math.floor(this.id / 4);
      }
      getSuit() {
        return this.id % 4;
      }
      getId() {
        return this.id;
      }
      getDisplayId(id) {
        var realSo;
        realSo = id < 0 || id >= 52 ? 52 : (id - 8 + 52) % 52;
        return realSo;
      }
      isXi() {
        return 0 == this.so;
      }
      getDiem() {
        return this.isXi() ? 1 : 9 == this.so || 10 == this.so || 11 == this.so || 12 == this.so ? 10 : this.so + 1;
      }
      getMinDiem() {
        return this.isXi() ? 1 : 9 == this.so || 10 == this.so || 11 == this.so || 12 == this.so ? 10 : this.so + 1;
      }
    }
    exports.default = XiZachCard;
    cc._RF.pop();
  }, {} ],
  XiZachGroupCard: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "33309RudRJGu57mT48pZ99U", "XiZachGroupCard");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.XiZachGroupCardConstant = void 0;
    const XiZachCard_1 = require("./XiZachCard");
    class XiZachGroupCard {
      constructor(cards = null) {
        this.cards = null;
        this.bo = null;
        this.size = null;
        var arr = [];
        for (var i = 0; i < cards.length; i++) arr.push(new XiZachCard_1.default(cards[i]));
        this.cards = arr;
        this.size = this.cards.length;
        this.bo = -1;
        this.kiemTraBo();
      }
      addCard(c) {
        this.cards.push(new XiZachCard_1.default(c));
        this.kiemTraBo();
      }
      addCards(cs) {
        var temp = " ";
        for (var i = 0; i < cs.length; i++) {
          temp += " " + cs[i];
          this.cards.push(new XiZachCard_1.default(cs[i]));
        }
        this.kiemTraBo();
      }
      kiemTraBo() {
        if (-1 == this.bo || this.bo == exports.XiZachGroupCardConstant.KG_WRONG) return this.tinhBo();
        return this.bo;
      }
      tinhBo() {
        if (this.size < 2) return exports.XiZachGroupCardConstant.KG_WRONG;
        for (var i = 0; i < this.size; i++) if (this.cards[i].id >= 52 && this.cards[i].id < 0) return exports.XiZachGroupCardConstant.KG_WRONG;
        if (this.isXiBang()) return exports.XiZachGroupCardConstant.KG_XIBANG;
        if (this.isXiZach()) return exports.XiZachGroupCardConstant.KG_XIZACH;
        if (this.isNguLinh()) return exports.XiZachGroupCardConstant.KG_NGULINH;
        if (21 == this.getMaxDiem()) return exports.XiZachGroupCardConstant.KG_21DIEM;
        if (this.isQuac()) {
          this.bo = exports.XiZachGroupCardConstant.KG_QUAC;
          return exports.XiZachGroupCardConstant.KG_QUAC;
        }
        if (this.cards.length < 2) {
          this.bo = exports.XiZachGroupCardConstant.KG_WRONG;
          return exports.XiZachGroupCardConstant.KG_WRONG;
        }
        if (this.getMaxDiem() < 16) {
          this.bo = exports.XiZachGroupCardConstant.KG_DANNON;
          return exports.XiZachGroupCardConstant.KG_DANNON;
        }
        this.bo = exports.XiZachGroupCardConstant.KG_THUONG;
        return exports.XiZachGroupCardConstant.KG_THUONG;
      }
      getCardSize() {
        return this.cards.length;
      }
      isXiBang() {
        if (2 == this.cards.length && this.cards[0].isXi() && this.cards[1].isXi()) return true;
        return false;
      }
      isXiZach() {
        if (2 == this.cards.length && this.cards[0].isXi() && 10 == this.cards[1].getDiem()) return true;
        if (2 == this.cards.length && this.cards[1].isXi() && 10 == this.cards[0].getDiem()) return true;
        return false;
      }
      clearCard() {
        this.cards = [];
        this.bo = -1;
      }
      hasXi() {
        for (var i = 0; i < this.cards.length; i++) if (this.cards[i].isXi()) return true;
        return false;
      }
      isNguLinh() {
        if (this.cards.length >= 5 && this.getMinDiem() <= 21) return true;
        return false;
      }
      isQuac() {
        return this.getMaxDiem() > 21;
      }
      canRutBai() {
        if (this.isXiZach() || this.isXiBang()) return false;
        return this.getMinDiem() >= 21 && !this.isNguLinh();
      }
      canDanBai() {
        return this.isNguLinh() || this.getMaxDiem() >= 16;
      }
      getMinDiem() {
        var sum = 0;
        for (var i = 0; i < this.cards.length; i++) sum += this.cards[i].getMinDiem();
        return sum;
      }
      getMaxDiem() {
        if (this.isXiBang() || this.isXiZach()) return 21;
        var minDiem = this.getMinDiem();
        if (this.hasXi()) {
          if (this.has2XiTroLen()) {
            var a1 = minDiem;
            return a1;
          }
          return this.chonDiemMax(minDiem, minDiem + 10);
        }
        return minDiem;
      }
      chonDiemMax(a, b) {
        if (a < 16 && b > 21) return a;
        if (b < 16 && a > 21) return b;
        if (a < 16 || a > 21) return b;
        if (b < 16 || b > 21) return a;
        return a <= b ? b : a;
      }
      has2XiTroLen() {
        var countXi = 0;
        for (var i = 0; i < this.cards.length; i++) this.cards[i].isXi() && countXi++;
        return countXi >= 2;
      }
      needShadown(boBai) {
        return false;
      }
      getBoName() {
        return this.tinhBo();
      }
    }
    exports.default = XiZachGroupCard;
    exports.XiZachGroupCardConstant = {
      group_names: [ "WR", "DN", "Q", "T", "21", "NL", "XR", "XB" ],
      KG_WRONG: 0,
      KG_XIBANG: 7,
      KG_XIZACH: 6,
      KG_NGULINH: 5,
      KG_21DIEM: 4,
      KG_THUONG: 3,
      KG_QUAC: 2,
      KG_DANNON: 1
    };
    cc._RF.pop();
  }, {
    "./XiZachCard": "XiZachCard"
  } ]
}, {}, [ "XiDzach.CardUtil", "XiDzach.Cmd", "XiDzach.Controller", "XiDzach.NetworkClient", "XiDzach.Player", "XiZachCard", "XiZachGroupCard" ]);