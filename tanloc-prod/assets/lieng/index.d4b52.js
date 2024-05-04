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
  "Lieng.CardUtil": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bf0155KVU5OKJQX1vyJA8nt", "Lieng.CardUtil");
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
          return a;
        }
      }
      common.CardUtils = CardUtils;
    })(common = exports.common || (exports.common = {}));
    exports.default = common.CardUtils;
    cc._RF.pop();
  }, {} ],
  "Lieng.Cmd": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a8278GJY+BBqpxlZnJbpT8g", "Lieng.Cmd");
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
      Code.GET_LIST_ROOM = 3014;
      Code.JOIN_GAME_ROOM_BY_ID = 3015;
      Code.MOI_DAT_CUOC = 3114;
      Code.UPDATE_OWNER_ROOM = 3117;
      Code.NOTIFY_USER_GET_JACKPOT = 3122;
      Code.PLAYER_STATUS_OUT_GAME = 0;
      Code.PLAYER_STATUS_VIEWER = 1;
      Code.PLAYER_STATUS_SITTING = 2;
      Code.PLAYER_STATUS_PLAYING = 3;
      Code.SELECT_DEALER = 3100;
      Code.TAKE_TURN = 3101;
      Code.BUY_IN = 3102;
      Code.KET_THUC = 3103;
      Code.CHANGE_TURN = 3104;
      Code.NEW_ROUND = 3105;
      Code.DEAL_PRIVATE_CARD = 3106;
      Code.TU_DONG_BAT_DAU = 3107;
      Code.SHOW_CARD = 3108;
      Code.REQUEST_BUY_IN = 3109;
      Code.THONG_TIN_BAN_CHOI = 3110;
      Code.DANG_KY_THOAT_PHONG = 3111;
      Code.REQUEST_LAT_BAI = 3112;
      Code.REQUEST_STAND_UP = 3113;
      Code.CHEAT_CARDS = 3115;
      Code.DANG_KY_CHOI_TIEP = 3116;
      Code.JOIN_ROOM_SUCCESS = 3118;
      Code.LEAVE_GAME = 3119;
      Code.NOTIFY_KICK_FROM_ROOM = 3120;
      Code.NEW_USER_JOIN = 3121;
      Code.UPDATE_MATCH = 3123;
      Code.CARDS_DEFINE = 3999;
      Code.REQUEST_INFO_TOUR = 3990;
      Code.UPDATE_TIME = 3991;
      Code.MAX_PLAYER = 9;
      Code.MAX_BUY_IN = 250;
      Code.GAME_ACTION_NONE = -1;
      Code.GAME_ACTION_FOLD = 0;
      Code.GAME_ACTION_CHECK = 1;
      Code.GAME_ACTION_CALL = 2;
      Code.GAME_ACTION_RAISE = 3;
      Code.GAME_ACTION_ALL_IN = 4;
      Code.EG_SANH_VUA = 0;
      Code.EG_THUNG_PHA_SANH = 1;
      Code.EG_TU_QUY = 2;
      Code.EG_CU_LU = 3;
      Code.EG_THUNG = 4;
      Code.EG_SANH = 5;
      Code.EG_XAM_CO = 6;
      Code.EG_HAI_DOI = 7;
      Code.EG_DOI = 8;
      Code.EG_MAU_THAU = 9;
      Code.EG_SERVER_NGU = 10;
      Code.STATE_CHIA_BAI = 1;
      Code.STATE_JOIN_ROOM = 2;
      Code.STATE_END_GAME = 3;
      Code.STATE_NEW_USER_JOIN_ROOM = 5;
      Code.STATE_USER_LEAVE_ROOM = 6;
      Code.STATE_DEAL_CARD = 7;
      Code.STATE_SELECT_DEALER = 8;
      Code.STATE_CHANGE_TURN = 9;
      Code.STATE_NEW_BET_ROUND = 10;
      Code.STATE_NOTIFY_OUT_ROOM = 11;
      Code.STATE_BUY_IN = 12;
      Code.STATE_UPDATE_MATCH = 13;
      Code.STATE_GAME_INFO = 14;
      Code.STATE_SHOW_CARD = 15;
      Code.STATE_NOTIFY_BUY_IN = 16;
      Code.STATE_STAND_UP = 17;
      Code.GET_MONEY_USE = 20051;
      cmd.Code = Code;
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
      class CmdSendRequestLeaveGame extends Network_OutPacket_1.default {
        constructor() {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.DANG_KY_THOAT_PHONG);
          this.packHeader();
          this.updateSize();
        }
      }
      cmd.CmdSendRequestLeaveGame = CmdSendRequestLeaveGame;
      class CmdSendLatBai extends Network_OutPacket_1.default {
        constructor(a) {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.REQUEST_LAT_BAI);
          this.packHeader();
          this.putShort(a.length);
          for (var b = 0; b < a.length; b++) this.putByte(a[b]);
          this.updateSize();
        }
      }
      cmd.CmdSendLatBai = CmdSendLatBai;
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
      class CmdSendPing extends Network_OutPacket_1.default {
        constructor() {
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
      class SendTakeTurn extends Network_OutPacket_1.default {
        constructor(a, b, c, d, e) {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.TAKE_TURN);
          this.packHeader();
          this.putByte(a);
          this.putByte(b);
          this.putByte(d);
          this.putByte(c);
          this.putByte(!1);
          this.putLong(e);
          this.updateSize();
        }
      }
      cmd.SendTakeTurn = SendTakeTurn;
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
          this.setCmdId(Code.SHOW_CARD);
          this.packHeader();
          this.updateSize();
        }
      }
      cmd.SendShowCard = SendShowCard;
      class SendGetInfoTour extends Network_OutPacket_1.default {
        constructor(a) {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.REQUEST_INFO_TOUR);
          this.packHeader();
          this.putByte(a);
          this.updateSize();
        }
      }
      cmd.SendGetInfoTour = SendGetInfoTour;
      class SendDungDay extends Network_OutPacket_1.default {
        constructor() {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.REQUEST_STAND_UP);
          this.packHeader();
          this.updateSize();
        }
      }
      cmd.SendDungDay = SendDungDay;
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
          this.myChair = this.getByte();
          this.moneyBet = this.getLong();
          this.roomOwner = this.getByte();
          this.roomId = this.getInt();
          this.matchId = this.getInt();
          this.moneyType = this.getByte();
          this.rule = this.getByte();
          this.playerSize = this.getShort();
          this.playerStatus = [];
          for (var a = 0; a < this.playerSize; a++) this.playerStatus.push(this.getByte());
          this.playerSize = this.getShort();
          this.playerInfos = [];
          for (a = 0; a < this.playerSize; a++) {
            var b = {};
            b["avatar"] = this.getString();
            b["nickName"] = this.getString();
            b["currentMoney"] = this.getLong();
            this.playerInfos.push(b);
          }
          this.gameAction = this.getByte();
          this.handCardSizeSize = this.getShort();
          this.handCardSizeList = [];
          for (a = 0; a < this.handCardSizeSize; a++) this.handCardSizeList.push(this.getByte());
          this.currentActionChair = this.getByte();
          this.countDownTime = this.getByte();
          this.minBuyInTiLe = this.getInt();
          this.maxBuyInTiLe = this.getInt();
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
          this.chair = this.getByte();
          this.hasInfoSize = this.getShort();
          this.hasInfoList = [];
          for (var a = 0; a < this.hasInfoSize; a++) this.hasInfoList.push(this.getByte());
          this.currentMoneyList = [];
          this.statusList = [];
          for (a = 0; a < Code.MAX_PLAYER; a++) this.hasInfoList[a] ? (this.currentMoneyList.push(this.getLong()), 
          this.statusList.push(this.getInt())) : (this.currentMoneyList.push(0), this.statusList.push(0));
        }
      }
      cmd.ReceivedUpdateMatch = ReceivedUpdateMatch;
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
      class ReceivedMoiDatCuoc extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.timeDatCuoc = this.getByte();
        }
      }
      cmd.ReceivedMoiDatCuoc = ReceivedMoiDatCuoc;
      class ReceivedDatCuoc extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.chairDatCuoc = this.getByte();
          this.level = this.getByte();
        }
      }
      cmd.ReceivedDatCuoc = ReceivedDatCuoc;
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
          this.potAmount = this.getLong();
          this.rankSize = this.getShort();
          this.rankList = [];
          for (var a = 0; a < this.rankSize; a++) this.rankList.push(this.getLong());
          this.kqttSize = this.getShort();
          this.kqttList = [];
          for (a = 0; a < this.kqttSize; a++) this.kqttList.push(this.getLong());
          this.booleanWinerSize = this.getShort();
          this.booleanWinerList = [];
          for (a = 0; a < this.booleanWinerSize; a++) this.booleanWinerList.push(this.getByte());
          this.moneyArraySize = this.getShort();
          this.currentMoney = [];
          for (a = 0; a < this.moneyArraySize; a++) this.currentMoney.push(this.getLong());
          this.gameMoney = [];
          this.gameMoneySize = this.getShort();
          for (a = 0; a < this.gameMoneySize; a++) this.gameMoney.push(this.getLong());
          this.hasInfoSize = this.getShort();
          this.hasInfoList = [];
          for (a = 0; a < this.hasInfoSize; a++) this.hasInfoList.push(this.getByte());
          this.privateCardList = [];
          this.cardNameList = [];
          for (a = 0; a < Code.MAX_PLAYER; a++) {
            var b = 0, c = [];
            if (this.hasInfoList[a]) {
              for (var b = this.getShort(), d = 0; d < b; d++) c.push(this.getByte());
              b = this.getByte();
            } else b = 0;
            this.privateCardList.push(c);
            this.cardNameList.push(b);
          }
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
          this.maxPlayer = this.getByte();
          this.chair = this.getByte();
          this.myCardSize = this.getShort();
          this.myCards = [];
          for (var a = 0; a < this.myCardSize; a++) this.myCards.push(this.getByte());
          this.dealerChair = this.getByte();
          this.smallBlindChair = this.getByte();
          this.bigBlindChair = this.getByte();
          this.potAmount = this.getLong();
          this.maxBet = this.getLong();
          this.raiseStep = this.getLong();
          this.roundId = this.getByte();
          this.gameServerState = this.getByte();
          this.gameAction = this.getByte();
          this.countDownTime = this.getByte();
          this.currentActiveChair = this.getByte();
          this.moneyType = this.getByte();
          this.bet = this.getLong();
          this.matchId = this.getInt();
          this.roomId = this.getInt();
          this.hasInfoSize = this.getShort();
          this.hasInfoList = [];
          for (a = 0; a < this.hasInfoSize; a++) this.hasInfoList.push(this.getByte());
          this.playerInfoList = [];
          for (a = 0; a < this.maxPlayer; a++) {
            if (this.hasInfoList[a]) {
              var b = {};
              b["hasFold"] = this.getByte();
              b["hasAllIn"] = this.getByte();
              b["currentBet"] = this.getLong();
              b["currentMoney"] = this.getLong();
              b["status"] = this.getByte();
              b["avatarUrl"] = this.getString();
              b["nickName"] = this.getString();
            } else b = {}, b["hasFold"] = 0, b["hasAllIn"] = 0, b["currentBet"] = 0, b["currentMoney"] = 0, 
            b["status"] = 0, b["avatarUrl"] = "", b["nickName"] = "";
            this.playerInfoList.push(b);
          }
        }
      }
      cmd.ReceivedGameInfo = ReceivedGameInfo;
      class ReceivedTakeTurn extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.actionChair = this.getByte();
          this.action = this.getByte();
          this.lastRaise = this.getLong();
          this.currentBet = this.getLong();
          this.maxBet = this.getLong();
          this.currentMoney = this.getLong();
          this.raiseStep = this.getLong();
          this.raiseBlock = this.getByte();
          this.potMoney = this.getLong();
        }
      }
      cmd.ReceivedTakeTurn = ReceivedTakeTurn;
      class ReceivedSelectDealer extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.dealerChair = this.getByte();
          this.smallBlindChair = this.getByte();
          this.bigBlindChair = this.getByte();
          this.hasInfoSize = this.getShort();
          this.hasInfoList = [];
          for (var a = 0; a < this.hasInfoSize; a++) {
            var b = this.getByte();
            this.hasInfoList.push(b);
          }
          this.playerStatusList = [];
          for (a = 0; a < Code.MAX_PLAYER; a++) this.hasInfoList[a] ? (b = this.getByte(), 
          this.playerStatusList.push(b)) : this.playerStatusList.push(0);
          this.matchId = this.getInt();
          this.isCheat = this.getByte();
          this.currentMoneySize = this.getShort();
          this.currentMoneyList = [];
          for (a = 0; a < this.currentMoneySize; a++) this.currentMoneyList.push(this.getLong());
        }
      }
      cmd.ReceivedSelectDealer = ReceivedSelectDealer;
      class ReceivedBuyIn extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.chair = this.getByte();
          this.buyInMoney = this.getLong();
        }
      }
      cmd.ReceivedBuyIn = ReceivedBuyIn;
      class ReceivedChangeTurn extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.roundId = this.getByte();
          this.chair = this.getByte();
          this.betTime = this.getByte();
        }
      }
      cmd.ReceivedChangeTurn = ReceivedChangeTurn;
      class ReceivedDealCards extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.chair = this.getByte();
          this.sizeCard = this.getShort();
          this.myCards = [];
          for (var a = 0; a < this.sizeCard; a++) this.myCards.push(this.getByte());
          this.boBaiId = this.getByte();
        }
      }
      cmd.ReceivedDealCards = ReceivedDealCards;
      class ReceivedNewBetRound extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.roundId = this.getByte();
          this.sizeCard = this.getShort();
          this.plusCards = [];
          for (var a = 0; a < this.sizeCard; a++) this.plusCards.push(this.getByte());
          this.cardName = this.getByte();
          this.potAmount = this.getLong();
        }
      }
      cmd.ReceivedNewBetRound = ReceivedNewBetRound;
      class ReceivedShowCard extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.chair = this.getByte();
        }
      }
      cmd.ReceivedShowCard = ReceivedShowCard;
      class ReceivedLatBai extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.chair = this.getByte();
          this.cardSize = this.getShort();
          this.cards = [];
          for (var a = 0; a < this.cardSize; a++) this.cards.push(this.getByte());
        }
      }
      cmd.ReceivedLatBai = ReceivedLatBai;
      class ReceivedStandUp extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.isUp = this.getByte();
        }
      }
      cmd.ReceivedStandUp = ReceivedStandUp;
      class ReceivedUpdateTime extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.chair = this.getByte();
        }
      }
      cmd.ReceivedUpdateTime = ReceivedUpdateTime;
      class ReceivedJoinRoomFail extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
        }
      }
      cmd.ReceivedJoinRoomFail = ReceivedJoinRoomFail;
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
  "Lieng.Constant": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2be36vRVjtLpIkhk/Tow/nj", "Lieng.Constant");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.KickReasonCodes = void 0;
    var KickReasonCodes;
    (function(KickReasonCodes) {
      let ENUM;
      (function(ENUM) {
        ENUM[ENUM["ERROR_MONEY"] = 1] = "ERROR_MONEY";
        ENUM[ENUM["ERROR_BAO_TRI"] = 2] = "ERROR_BAO_TRI";
      })(ENUM = KickReasonCodes.ENUM || (KickReasonCodes.ENUM = {}));
      function toEnum(val) {
        return ENUM[ENUM[val]];
      }
      KickReasonCodes.toEnum = toEnum;
    })(KickReasonCodes = exports.KickReasonCodes || (exports.KickReasonCodes = {}));
    cc._RF.pop();
  }, {} ],
  "Lieng.Controller": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4f8facE7ltJIZAcwQt6bWGJ", "Lieng.Controller");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var LiengController_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const BroadcastReceiver_1 = require("../../Main/Game/src/common/BroadcastReceiver");
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const App_1 = require("../../Main/Game/src/common/App");
    const Network_InPacket_1 = require("../../Main/Game/src/networks/Network.InPacket");
    const Network_Cmd_1 = require("../../Main/Game/src/networks/Network.Cmd");
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    const Lieng_Cmd_1 = require("./Lieng.Cmd");
    const Lieng_NetworkClient_1 = require("./Lieng.NetworkClient");
    const Lieng_CardUtil_1 = require("./Lieng.CardUtil");
    const CardGame_Cmd_1 = require("../../Main/Game/src/networks/CardGame.Cmd");
    const PopupCardDefinations_1 = require("../../Main/Game/src/games/cardgames/PopupCardDefinations");
    const PopupChatInGame_1 = require("../../Main/Game/src/games/cardgames/PopupChatInGame");
    const CustomUI_SliderBet_1 = require("../../Main/Game/src/customui/CustomUI.SliderBet");
    const Lieng_Player_1 = require("./Lieng.Player");
    const MiniGameNetworkClient_1 = require("../../Main/Game/src/networks/MiniGameNetworkClient");
    const Lieng_Constant_1 = require("./Lieng.Constant");
    const ItemRoom_1 = require("../../Main/Game/src/games/cardgames/ItemRoom");
    const Lieng_PopupGuide_1 = require("./Lieng.PopupGuide");
    const PopupSettingInGame_1 = require("../../Main/Game/src/games/cardgames/PopupSettingInGame");
    var configPlayer = [];
    let defaultPlayerPos = [ [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ], [ 1, 2, 3, 4, 5, 6, 7, 8, 0 ], [ 2, 3, 4, 5, 6, 7, 8, 0, 1 ], [ 3, 4, 5, 6, 7, 8, 0, 1, 2 ], [ 4, 5, 6, 7, 8, 0, 1, 2, 3 ], [ 5, 6, 7, 8, 0, 1, 2, 3, 4 ], [ 6, 7, 8, 0, 1, 2, 3, 4, 5 ], [ 7, 8, 0, 1, 2, 3, 4, 5, 6 ], [ 8, 0, 1, 2, 3, 4, 5, 6, 7 ] ];
    const {ccclass: ccclass, property: property} = cc._decorator;
    let LiengController = LiengController_1 = class LiengController extends cc.Component {
      constructor() {
        super(...arguments);
        this.UI_ChooseRoom = null;
        this.labelNickName = null;
        this.labelCoin = null;
        this.sprAvatar = null;
        this.contentListRooms = null;
        this.header = null;
        this.prefabItemRoom = null;
        this.scrollListRoom = null;
        this.isInitedUIRoom = false;
        this.UI_Playing = null;
        this.meCards = null;
        this.groupPlayers = null;
        this.spriteCards = [];
        this.spriteCardBack = null;
        this.matchPot = null;
        this.labelMatchPot = null;
        this.cardsDeal = null;
        this.cardsCenter = null;
        this.btnBet = null;
        this.btnOpenCard = null;
        this.hubChips = null;
        this.labelRoomId = null;
        this.labelRoomBet = null;
        this.labelMatchId = null;
        this.actionBetting = null;
        this.btnActions = null;
        this.btnLatBai = null;
        this.popupBuyIn = null;
        this.labelBuyInMin = null;
        this.labelBuyInMax = null;
        this.sliderBuyin = null;
        this.toggleAutoBuyIn = null;
        this.notifyTimeStart = null;
        this.notifyTimeEnd = null;
        this.notifyTimeBet = null;
        this.effectWin = null;
        this.effectLose = null;
        this.popupNodity = null;
        this.labelNotifyContent = null;
        this.popupLatBai = null;
        this.latBaiSelector = null;
        this.sliderBet = null;
        this.btnShowCardDefinations = null;
        this.seatOwner = null;
        this.currentRoomBet = null;
        this.currentCard = null;
        this.numCardOpened = 0;
        this.arrBetValue = [];
        this.currentBetSelectedIndex = 0;
        this.currentMatchPotValue = 0;
        this.minCashIn = null;
        this.maxCashIn = null;
        this.currentMaxBet = 0;
        this.currentRaiseValue = 0;
        this.currentRaiseStep = 0;
        this.currentMeBet = 0;
        this.currentPrivateCardList = [];
        this.roomMinBuyIn = 0;
        this.roomMaxBuyIn = 0;
        this.arrBaiLat = [];
        this.currentPlayerStatus = [];
        this.cardDefinations = [];
        this.listRoom = [];
        this.isClickBack = false;
        this.foldedNum = 0;
      }
      onLoad() {
        LiengController_1.instance = this;
        this.initConfigPlayer();
      }
      start() {
        this.showUIRooms();
        this.UI_Playing.active = false;
        this.seatOwner = -1;
        this.isClickBack = false;
        App_1.default.instance.showErrLoading("\u0110ang k\u1ebft n\u1ed1i t\u1edbi server...");
        Lieng_NetworkClient_1.default.getInstance().addOnOpen(() => {
          App_1.default.instance.showErrLoading("\u0110ang \u0111ang \u0111\u0103ng nh\u1eadp...");
          Lieng_NetworkClient_1.default.getInstance().send(new Network_Cmd_1.default.SendLogin(Configs_1.default.Login.Nickname, Configs_1.default.Login.AccessToken));
        }, this);
        Lieng_NetworkClient_1.default.getInstance().addOnClose(() => {
          this.isClickBack || !Configs_1.default.Login.IsLogin ? this.backToLobby() : App_1.default.instance.alertDialog.showMsgWithOnDismissed("B\u1ea1n \u0111\xe3 m\u1ea5t k\u1ebft n\u1ed1i v\u1edbi server", () => {
            this.backToLobby();
          });
        }, this);
        Lieng_NetworkClient_1.default.getInstance().connect();
        BroadcastReceiver_1.default.register(BroadcastReceiver_1.default.USER_DISCONNECTED, data => {
          Lieng_NetworkClient_1.default.getInstance().close();
        }, this);
        BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.SET_SOUND, cc.find("Canvas"));
      }
      joinRoom(info) {
        App_1.default.instance.showLoading(true);
        Lieng_NetworkClient_1.default.getInstance().send(new Lieng_Cmd_1.default.SendJoinRoomById(info["id"]));
      }
      refeshListRoom() {
        this.contentListRooms.removeAllChildren(true);
        Lieng_NetworkClient_1.default.getInstance().send(new Lieng_Cmd_1.default.SendGetListRoom());
      }
      showUIRooms() {
        this.UI_ChooseRoom.active = true;
        if (this.isInitedUIRoom) BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN); else {
          this.isInitedUIRoom = true;
          this.labelNickName.string = Configs_1.default.Login.Nickname;
          this.sprAvatar.spriteFrame = App_1.default.instance.getAvatarSpriteFrame(Configs_1.default.Login.Avatar);
          BroadcastReceiver_1.default.register(BroadcastReceiver_1.default.USER_UPDATE_COIN, () => {
            this.labelCoin.string = Utils_1.default.formatNumber(Configs_1.default.Login.Coin);
          }, this);
          BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN);
          this.header.runAction(cc.fadeOut(0));
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
        Lieng_NetworkClient_1.default.getInstance().send(new CardGame_Cmd_1.default.SendJoinRoom(Configs_1.default.App.MONEY_TYPE, room.maxUserPerRoom, room.moneyBet, 0));
      }
      showUIChat() {
        PopupChatInGame_1.default.createAndShow(this.UI_Playing, this.cardDefinations, (chatType, content) => {
          Lieng_NetworkClient_1.default.getInstance().send(new Lieng_Cmd_1.default.SendChatRoom(chatType, content));
        }, (cheatType, cardCheatIds) => {
          Lieng_NetworkClient_1.default.getInstance().send(new Lieng_Cmd_1.default.SendCheatCards(cheatType, cardCheatIds));
        });
      }
      actBack() {
        this.isClickBack = true;
        Lieng_NetworkClient_1.default.getInstance().close();
      }
      backToLobby() {
        App_1.default.instance.loadScene("Lobby");
      }
      showUIPlaying() {
        this.UI_Playing.active = true;
      }
      closeUIPlaying() {
        this.actionLeaveRoom();
      }
      showPopupLatBai() {
        this.popupLatBai.active = true;
        this.arrBaiLat = [];
        for (let index = 0; index < 3; index++) {
          let spriteCardId = Lieng_CardUtil_1.default.getNormalId(this.currentCard[index]);
          this.latBaiSelector.children[index].getComponent(cc.Sprite).spriteFrame = this.spriteCards[spriteCardId];
          this.latBaiSelector.children[index].y = 0;
          this.latBaiSelector.children[index].color = cc.Color.GRAY;
        }
      }
      closePopupLatBai() {
        this.popupLatBai.active = false;
      }
      selectBaiLat(event, id) {
        let isSelected = true;
        let idOpen = parseInt(id) - 1;
        let isExist = this.arrBaiLat.indexOf(idOpen);
        if (isExist > -1) {
          let arrTemp = [ ...this.arrBaiLat ];
          this.arrBaiLat = [];
          for (let index = 0; index < arrTemp.length; index++) arrTemp[index] != idOpen && this.arrBaiLat.push(arrTemp[index]);
        } else {
          if (this.arrBaiLat.length > 1) {
            this.latBaiSelector.children[this.arrBaiLat[0]].y = 0;
            this.latBaiSelector.children[this.arrBaiLat[0]].color = cc.Color.GRAY;
            this.arrBaiLat[0] = idOpen;
          } else this.arrBaiLat.push(idOpen);
          isSelected = false;
        }
        this.latBaiSelector.children[idOpen].y = isSelected ? 0 : 40;
        this.latBaiSelector.children[idOpen].color = isSelected ? cc.Color.GRAY : cc.Color.WHITE;
      }
      setupMatch(data) {
        this.showUIPlaying();
        let myChair = data["myChair"];
        let moneyBet = data["moneyBet"];
        let roomOwner = data["roomOwner"];
        let roomId = data["roomId"];
        let moneyType = data["moneyType"];
        let rule = data["rule"];
        let playerSize = data["playerSize"];
        let playerStatus = data["playerStatus"];
        let playerInfos = data["playerInfos"];
        let handCardSizeSize = data["handCardSizeSize"];
        let handCardSizeList = data["handCardSizeList"];
        let minBuyInTiLe = data["minBuyInTiLe"];
        let maxBuyInTiLe = data["maxBuyInTiLe"];
        this.roomMinBuyIn = minBuyInTiLe;
        this.roomMaxBuyIn = maxBuyInTiLe;
        this.labelRoomId.string = "" + roomId;
        this.labelRoomBet.string = Utils_1.default.formatNumber(moneyBet) + "/" + Utils_1.default.formatNumber(2 * moneyBet);
        this.labelMatchId.string = "" + data.matchId;
        this.currentRoomBet = moneyBet;
        configPlayer[0].playerId = Configs_1.default.Login.Nickname;
        configPlayer[0].playerPos = myChair;
        var numPlayers = 0;
        var arrPlayerPosExist = [];
        var arrPlayerInfo = [];
        var arrPlayerStatus = [];
        for (let index = 0; index < Lieng_Cmd_1.default.Code.MAX_PLAYER; index++) if ("" !== playerInfos[index].nickName) {
          numPlayers += 1;
          arrPlayerPosExist.push(index);
          arrPlayerInfo.push(playerInfos[index]);
          arrPlayerStatus.push(playerStatus[index]);
        }
        this.resetHubChips();
        for (let a = 0; a < configPlayer.length; a++) configPlayer[a].playerPos = defaultPlayerPos[myChair][a];
        for (let index = 0; index < configPlayer.length; index++) {
          let findPos = arrPlayerPosExist.indexOf(configPlayer[index].playerPos);
          var seatId = configPlayer[index].seatId;
          this.getPlayerHouse(seatId).resetPlayerInfo();
          if (findPos > -1) {
            0 == seatId && arrPlayerStatus[findPos] == Lieng_Cmd_1.default.Code.PLAYER_STATUS_SITTING && this.showPopupBuyIn(minBuyInTiLe, maxBuyInTiLe, moneyBet);
            if (arrPlayerStatus[findPos] == Lieng_Cmd_1.default.Code.PLAYER_STATUS_SITTING || arrPlayerStatus[findPos] == Lieng_Cmd_1.default.Code.PLAYER_STATUS_PLAYING) {
              configPlayer[index].isViewer = false;
              this.getPlayerHouse(seatId).setIsViewer(false);
            } else {
              configPlayer[index].isViewer = true;
              this.getPlayerHouse(seatId).setIsViewer(true);
              -1 != configPlayer[seatId].playerId && this.getPlayerHouse(seatId).playFxViewer();
            }
            this.setupSeatPlayer(seatId, arrPlayerInfo[findPos]);
          } else {
            this.getPlayerHouse(seatId).showBtnInvite(true);
            configPlayer[index].isViewer = true;
          }
        }
        for (let index = 0; index < Lieng_Cmd_1.default.Code.MAX_PLAYER; index++) this.getPlayerHouse(index).setOwner(false);
        let seatOwner = this.findPlayerSeatByPos(roomOwner);
        if (-1 !== seatOwner) {
          this.getPlayerHouse(seatOwner).setOwner(true);
          this.seatOwner = seatOwner;
        }
      }
      startThinkingCountDown(seatId, turnTime) {
        let timeThinking = turnTime;
        let intervalThinking = () => {
          timeThinking--;
          var rate = (timeThinking / turnTime).toFixed(2);
          this.getPlayerHouse(seatId).processThinking(rate);
          if (timeThinking < 1) {
            this.unschedule(intervalThinking);
            this.getPlayerHouse(seatId).hidePlayCountdown();
          }
        };
        this.schedule(intervalThinking, 1);
      }
      startWaittingCountDown(timeWait) {
        let timeAutoStart = timeWait;
        this.notifyTimeStart.parent.active = true;
        this.notifyTimeStart.getComponent(cc.Label).string = " B\u1eaft \u0111\u1ea7u sau : " + Math.floor(timeAutoStart % 60) + "s ";
        let intervalWaitting = () => {
          timeAutoStart--;
          this.notifyTimeStart.getComponent(cc.Label).string = " B\u1eaft \u0111\u1ea7u sau : " + Math.floor(timeAutoStart % 60) + "s ";
          if (timeAutoStart < 1) {
            this.unschedule(intervalWaitting);
            this.notifyTimeStart.parent.active = false;
          }
        };
        this.schedule(intervalWaitting, 1);
      }
      startEndCountDown(timeWait) {
        let timeEnd = timeWait;
        this.notifyTimeEnd.active = true;
        this.notifyTimeEnd.getComponent(cc.Label).string = " K\u1ebft th\xfac sau : " + Math.floor(timeEnd % 60) + "s ";
        let intervalEnd = () => {
          timeEnd--;
          this.notifyTimeEnd.getComponent(cc.Label).string = " K\u1ebft th\xfac sau : " + Math.floor(timeEnd % 60) + "s ";
          if (timeEnd < 1) {
            this.unschedule(intervalEnd);
            this.notifyTimeEnd.parent.active = false;
          }
        };
        this.schedule(intervalEnd, 1);
      }
      startBettingCountDown(turnTime) {
        let timeBet = turnTime;
        this.actionBetting.active = true;
        this.processBetting(1);
        let intervalBetting = () => {
          timeBet--;
          var rate = (timeBet / turnTime).toFixed(1);
          this.processBetting(rate);
          if (timeBet < 1) {
            this.unschedule(intervalBetting);
            this.actionBetting.active = false;
          }
        };
        this.schedule(intervalBetting, 1);
      }
      processBetting(rate) {
        this.actionBetting.children[0].getComponent(cc.Sprite).fillRange = rate;
      }
      openMeCard(event, itemId) {
        let cardPos = parseInt(itemId);
        this.getPlayerHouse(0).prepareCardReal(cardPos);
        let spriteCardId = Lieng_CardUtil_1.default.getNormalId(this.currentCard[cardPos]);
        this.getPlayerHouse(0).transformToCardReal(cardPos, this.spriteCards[spriteCardId]);
        this.numCardOpened += 1;
        if (3 == this.numCardOpened) {
          this.btnOpenCard.active = true;
          this.btnBet.active = false;
          let score = 0;
          for (let a = 0; a < 3; a++) score += Lieng_CardUtil_1.default.getDiemById(this.currentCard[a]);
          score > 10 ? this.getPlayerHouse(0).showCardName(score % 10 + " \u0110i\u1ec3m") : this.getPlayerHouse(0).showCardName(score + " \u0110i\u1ec3m");
          this.scheduleOnce(() => {
            this.getPlayerHouse(0).resetCardReady();
          }, .2);
        }
      }
      moveChipsToHubNow(index) {
        this.hubChips.children[2 * index].setPosition(cc.v2(25, 80));
        this.hubChips.children[2 * index].scale = 0;
        this.hubChips.children[2 * index + 1].setPosition(cc.v2(25, 80));
        this.hubChips.children[2 * index + 1].scale = 0;
      }
      fxMoveChips(chips, delay, toX, toY) {
        chips.runAction(cc.sequence(cc.delayTime(delay), cc.scaleTo(0, 1, 1), cc.spawn(cc.moveTo(.8, toX, toY), cc.scaleTo(.8, 0, 0))));
      }
      resetHubChips() {
        var arrFromX = [ 85, 365, 265, 265, 205, -155, -415, -435, -265 ];
        var arrFromY = [ -235, -160, -10, 75, 260, 260, 140, -50, -195 ];
        for (let index = 0; index < Lieng_Cmd_1.default.Code.MAX_PLAYER; index++) {
          this.hubChips.children[2 * index].setPosition(cc.v2(arrFromX[index], arrFromY[index]));
          this.hubChips.children[2 * index + 1].setPosition(cc.v2(arrFromX[index], arrFromY[index]));
        }
        for (let index = 0; index < 2 * Lieng_Cmd_1.default.Code.MAX_PLAYER; index++) this.hubChips.children[index].active = false;
      }
      setupBet() {
        this.currentBetSelectedIndex = 0;
        this.handleSlide();
      }
      showBtnRaise(state) {
        this.btnActions.getChildByName("btnRaise").active = state;
      }
      showBtnCheck(state) {
        this.btnActions.getChildByName("btnCheck").active = state;
      }
      showBtnCall(state) {
        this.btnActions.getChildByName("btnCall").active = state;
      }
      resetBtnActions() {
        for (let index = 0; index < this.btnActions.childrenCount; index++) this.btnActions.children[index].active = true;
      }
      showPopupBuyIn(min, max, bet) {
        this.minCashIn = min;
        this.maxCashIn = max;
        this.popupBuyIn.active = true;
        this.labelBuyInMin.string = Utils_1.default.formatNumber(bet * min);
        Configs_1.default.Login.Coin > bet * max ? this.labelBuyInMax.string = Utils_1.default.formatNumber(bet * max) : this.labelBuyInMax.string = Utils_1.default.formatNumber(Configs_1.default.Login.Coin);
        this.toggleAutoBuyIn.isChecked = true;
        this.sliderBuyin.initValue(bet * min, bet, bet * max);
      }
      closePopupBuyIn() {
        this.popupBuyIn.active = false;
      }
      setupListener() {
        MiniGameNetworkClient_1.default.getInstance().addListener(data => {
          let inpacket = new Network_InPacket_1.default(data);
          switch (inpacket.getCmdId()) {
           case Lieng_Cmd_1.default.Code.GET_MONEY_USE:
            {
              let res = new Lieng_Cmd_1.default.ResGetMoneyUse(data);
              cc.log(res);
              Configs_1.default.Login.Coin = res.moneyUse;
              BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN);
              break;
            }
          }
        }, this);
        Lieng_NetworkClient_1.default.getInstance().addListener(data => {
          let inpacket = new Network_InPacket_1.default(data);
          switch (inpacket.getCmdId()) {
           case Lieng_Cmd_1.default.Code.JOIN_ROOM_SUCCESS:
            {
              App_1.default.instance.showLoading(false);
              let res = new Lieng_Cmd_1.default.ReceivedJoinRoomSucceed(data);
              cc.log(res);
              this.closeUIRoom();
              this.setupMatch(res);
              this.getCardDefinations();
            }
            break;

           case Lieng_Cmd_1.default.Code.THONG_TIN_BAN_CHOI:
            {
              App_1.default.instance.showLoading(false);
              let res = new Lieng_Cmd_1.default.ReceivedGameInfo(data);
              cc.log(res);
              let chair = res["chair"];
              let myCardSize = res["myCardSize"];
              let myCards = res["myCards"];
              let potAmount = res["potAmount"];
              let maxBet = res["maxBet"];
              let raiseStep = res["raiseStep"];
              let countDownTime = res["countDownTime"];
              let currentActiveChair = res["currentActiveChair"];
              let bet = res["bet"];
              let roomId = res["roomId"];
              let hasInfoList = res["hasInfoList"];
              let playerInfoList = res["playerInfoList"];
              this.closeUIRoom();
              this.showUIPlaying();
              this.labelRoomId.string = "" + roomId;
              this.labelRoomBet.string = Utils_1.default.formatNumber(bet) + "/" + Utils_1.default.formatNumber(2 * bet);
              this.labelMatchId.string = "" + res.matchId;
              this.currentRoomBet = bet;
              this.currentCard = myCards;
              if (null != potAmount) {
                this.matchPot.active = true;
                this.currentMatchPotValue = potAmount;
                this.labelMatchPot.string = Utils_1.default.formatNumber(potAmount);
              }
              null != maxBet && (this.currentMaxBet = maxBet);
              null != raiseStep && (this.currentRaiseStep = raiseStep);
              this.currentRaiseValue = this.currentMaxBet + this.currentRaiseStep;
              configPlayer[0].playerId = Configs_1.default.Login.Nickname;
              configPlayer[0].playerPos = chair;
              var numPlayers = 0;
              var arrPlayerPosExist = [];
              for (let index = 0; index < Lieng_Cmd_1.default.Code.MAX_PLAYER; index++) if (hasInfoList[index] > 0) {
                numPlayers += 1;
                arrPlayerPosExist.push(index);
              }
              for (let a = 0; a < configPlayer.length; a++) configPlayer[a].playerPos = defaultPlayerPos[chair][a];
              for (let index = 0; index < configPlayer.length; index++) {
                let findPos = arrPlayerPosExist.indexOf(configPlayer[index].playerPos);
                var seatId = configPlayer[index].seatId;
                this.getPlayerHouse(seatId).resetPlayerInfo();
                if (findPos > -1) {
                  this.getPlayerHouse(seatId).setIsViewer(false);
                  this.setupSeatPlayer(seatId, {
                    nickName: playerInfoList[index].nickName,
                    avatar: playerInfoList[index].avatar,
                    currentMoney: playerInfoList[index].currentMoney
                  });
                  if (0 != seatId) {
                    this.getPlayerHouse(seatId).showCardReady(true);
                    this.getPlayerHouse(seatId).showCardReal(false);
                  }
                  playerInfoList[index].currentBet > 0 && this.getPlayerHouse(seatId).setBet(playerInfoList[index].currentBet);
                  playerInfoList[index].fold && this.getPlayerHouse(seatId).showActionState("\xdaP");
                  playerInfoList[index].hasAllIn && this.getPlayerHouse(seatId).showActionState("T\u1ea5t Tay");
                } else {
                  this.getPlayerHouse(seatId).showBtnInvite(true);
                  configPlayer[index].isViewer = true;
                }
              }
              for (let index = 0; index < Lieng_Cmd_1.default.Code.MAX_PLAYER; index++) {
                this.getPlayerHouse(index).setDealer(false);
                this.getPlayerHouse(index).setSmallBind(false);
                this.getPlayerHouse(index).setBigBind(false);
              }
              let activeSeatId = this.findPlayerSeatByPos(currentActiveChair);
              if (-1 != activeSeatId) {
                this.getPlayerHouse(activeSeatId).showPlayCountdown();
                this.startThinkingCountDown(activeSeatId, countDownTime);
              }
              if (myCardSize > 0) {
                this.getPlayerHouse(0).showCardReady(false);
                for (let a = 0; a < 3; a++) {
                  let spriteCardId = Lieng_CardUtil_1.default.getNormalId(myCards[a]);
                  this.getPlayerHouse(0).prepareCardReal(a);
                  this.getPlayerHouse(0).transformToCardReal(a, this.spriteCards[spriteCardId]);
                }
              }
              if (myCardSize > 0 && 0 == activeSeatId && countDownTime > 0) {
                this.btnBet.active = true;
                this.btnOpenCard.active = false;
                let currentMeGold = playerInfoList[chair].currentMoney;
                this.currentMeBet = playerInfoList[chair].currentBet;
                this.setupBet();
                this.currentRaiseValue = this.currentMaxBet + this.currentRaiseStep;
                let minBet = this.currentRaiseValue - this.currentMeBet;
                this.sliderBet.initValue(minBet, this.currentRaiseStep, currentMeGold);
                this.resetBtnActions();
                if (this.currentMaxBet == this.currentMeBet) {
                  this.showBtnCall(false);
                  this.showBtnCheck(true);
                } else if (this.currentMaxBet - this.currentMeBet >= currentMeGold) {
                  this.showBtnRaise(false);
                  this.showBtnCall(false);
                  this.showBtnCheck(false);
                } else {
                  this.showBtnCall(true);
                  this.showBtnCheck(false);
                }
                this.currentRaiseValue - this.currentMeBet >= currentMeGold && this.showBtnRaise(false);
              }
              this.resetHubChips();
            }
            break;

           case Lieng_Cmd_1.default.Code.DANG_KY_THOAT_PHONG:
            {
              App_1.default.instance.showLoading(false);
              let res = new Lieng_Cmd_1.default.ReceivedNotifyRegOutRoom(data);
              cc.log(res);
              let outChair = res["outChair"];
              let isOutRoom = res["isOutRoom"];
              let seatId = this.findPlayerSeatByPos(outChair);
              -1 !== seatId && this.getPlayerHouse(seatId).showNotify(isOutRoom);
            }
            break;

           case Lieng_Cmd_1.default.Code.NEW_USER_JOIN:
            {
              App_1.default.instance.showLoading(false);
              let res = new Lieng_Cmd_1.default.ReceivedUserJoinRoom(data);
              cc.log(res);
              let nickName = res["info"]["nickName"];
              let avatar = res["info"]["avatar"];
              let currentMoney = res["info"]["money"];
              let chair = res["uChair"];
              let status = res["uStatus"];
              for (let index = 0; index < configPlayer.length; index++) if (configPlayer[index].playerPos == chair) {
                var seatId = configPlayer[index].seatId;
                this.getPlayerHouse(seatId).resetPlayerInfo();
                var customPlayerInfo = {
                  avatar: avatar,
                  nickName: nickName,
                  currentMoney: currentMoney
                };
                this.setupSeatPlayer(seatId, customPlayerInfo);
                if (status == Lieng_Cmd_1.default.Code.PLAYER_STATUS_VIEWER) {
                  this.getPlayerHouse(seatId).setIsViewer(true);
                  configPlayer[seatId].isViewer = true;
                  -1 != configPlayer[seatId].playerId && this.getPlayerHouse(seatId).playFxViewer();
                } else {
                  this.getPlayerHouse(seatId).setIsViewer(false);
                  configPlayer[seatId].isViewer = false;
                }
              }
            }
            break;

           case Lieng_Cmd_1.default.Code.LEAVE_GAME:
            {
              App_1.default.instance.showLoading(false);
              let res = new Lieng_Cmd_1.default.ReceivedUserLeaveRoom(data);
              cc.log(res);
              let chair = res["chair"];
              let seatId = this.findPlayerSeatByPos(chair);
              if (-1 !== seatId) {
                for (let index = 0; index < configPlayer.length; index++) if (configPlayer[index].seatId == seatId) {
                  configPlayer[index].playerId = -1;
                  configPlayer[index].isViewer = true;
                }
                this.getPlayerHouse(seatId).resetPlayerInfo();
                this.getPlayerHouse(seatId).showBtnInvite(true);
                let arrSeatExistLast = this.getNumPlayers();
                if (1 == arrSeatExistLast.length) {
                  this.resetPlayersPlaying();
                  this.matchPot.active = false;
                }
                if (0 == seatId) {
                  this.UI_Playing.active = false;
                  this.UI_ChooseRoom.active = true;
                }
              }
            }
            break;

           case Lieng_Cmd_1.default.Code.TAKE_TURN:
            {
              App_1.default.instance.showLoading(false);
              let res = new Lieng_Cmd_1.default.ReceivedTakeTurn(data);
              cc.log(res);
              let actionChair = res["actionChair"];
              let action = res["action"];
              let lastRaise = res["lastRaise"];
              let currentBet = res["currentBet"];
              let maxBet = res["maxBet"];
              let currentMoney = res["currentMoney"];
              let raiseStep = res["raiseStep"];
              let raiseBlock = res["raiseBlock"];
              let potMoney = res["potMoney"];
              this.currentMaxBet = maxBet;
              this.currentRaiseStep = raiseStep;
              this.currentMatchPotValue = potMoney;
              this.labelMatchPot.string = Utils_1.default.formatNumber(potMoney);
              let seatId = this.findPlayerSeatByPos(actionChair);
              if (-1 != seatId) {
                if (0 == seatId) {
                  this.currentMeBet = currentBet;
                  this.closePopupLatBai();
                  this.btnLatBai.active = false;
                }
                let actionName = "";
                switch (action) {
                 case Lieng_Cmd_1.default.Code.GAME_ACTION_FOLD:
                  actionName = "\xdap";
                  this.foldedNum++;
                  this.getPlayerHouse(seatId).fxMeFold();
                  break;

                 case Lieng_Cmd_1.default.Code.GAME_ACTION_CHECK:
                  actionName = "Xem";
                  break;

                 case Lieng_Cmd_1.default.Code.GAME_ACTION_CALL:
                  actionName = "Theo";
                  this.getPlayerHouse(seatId).setBet(currentBet);
                  break;

                 case Lieng_Cmd_1.default.Code.GAME_ACTION_RAISE:
                  actionName = "T\u1ed1";
                  this.getPlayerHouse(seatId).setBet(currentBet);
                  break;

                 case Lieng_Cmd_1.default.Code.GAME_ACTION_ALL_IN:
                  actionName = "T\u1ea5t Tay";
                  this.getPlayerHouse(seatId).setBet(currentBet);
                }
                this.getPlayerHouse(seatId).setGold(currentMoney);
                this.getPlayerHouse(seatId).showActionState(actionName);
              }
            }
            break;

           case Lieng_Cmd_1.default.Code.SELECT_DEALER:
            {
              App_1.default.instance.showLoading(false);
              let res = new Lieng_Cmd_1.default.ReceivedSelectDealer(data);
              cc.log(res);
              let dealerChair = res["dealerChair"];
              let smallBlindChair = res["smallBlindChair"];
              let bigBlindChair = res["bigBlindChair"];
              let hasInfoSize = res["hasInfoSize"];
              let hasInfoList = res["hasInfoList"];
              let playerStatusList = res["playerStatusList"];
              let matchId = res["matchId"];
              let isCheat = res["isCheat"];
              let currentMoneySize = res["currentMoneySize"];
              let currentMoneyList = res["currentMoneyList"];
              this.currentPlayerStatus = playerStatusList;
              this.labelMatchId.string = "" + matchId;
              for (let index = 0; index < Lieng_Cmd_1.default.Code.MAX_PLAYER; index++) {
                this.getPlayerHouse(index).setDealer(false);
                this.getPlayerHouse(index).setSmallBind(false);
                this.getPlayerHouse(index).setBigBind(false);
              }
              this.currentMatchPotValue = 0;
              for (let index = 0; index < Lieng_Cmd_1.default.Code.MAX_PLAYER; index++) if (3 == playerStatusList[index]) {
                let seatId = this.findPlayerSeatByPos(index);
                if (-1 != seatId) {
                  this.getPlayerHouse(seatId).setBet(this.currentRoomBet);
                  this.currentMatchPotValue += this.currentRoomBet;
                }
              }
              this.currentMeBet = this.currentRoomBet;
              this.labelMatchPot.string = Utils_1.default.formatNumber(this.currentMatchPotValue);
              this.currentMaxBet = this.currentRoomBet;
              this.currentRaiseStep = 2 * this.currentRoomBet;
              this.currentRaiseValue = this.currentMaxBet + this.currentRaiseStep;
              for (let index = 0; index < currentMoneyList.length; index++) {
                let seatId = this.findPlayerSeatByPos(index);
                this.getPlayerHouse(seatId).setGold(currentMoneyList[index]);
                if (0 == currentMoneyList[index]) {
                  configPlayer[seatId].isViewer = true;
                  configPlayer[seatId]["isViewer"] = true;
                  this.getPlayerHouse(seatId).setIsViewer(true);
                  -1 != configPlayer[seatId].playerId && this.getPlayerHouse(seatId).playFxViewer();
                }
              }
            }
            break;

           case Lieng_Cmd_1.default.Code.BUY_IN:
            {
              App_1.default.instance.showLoading(false);
              let res = new Lieng_Cmd_1.default.ReceivedBuyIn(data);
              cc.log(res);
              let chair = res["chair"];
              let buyInMoney = res["buyInMoney"];
              let seatId = this.findPlayerSeatByPos(chair);
              if (-1 != seatId) {
                0 == seatId && App_1.default.instance.showLoading(false);
                this.getPlayerHouse(seatId).setGold(buyInMoney, true);
              }
            }
            break;

           case Lieng_Cmd_1.default.Code.DEAL_PRIVATE_CARD:
            {
              App_1.default.instance.showLoading(false);
              let res = new Lieng_Cmd_1.default.ReceivedDealCards(data);
              cc.log(res);
              let chair = res["chair"];
              let sizeCard = res["sizeCard"];
              let myCards = res["myCards"];
              let boBaiId = res["boBaiId"];
              this.btnBet.active = false;
              this.btnOpenCard.active = false;
              this.matchPot.active = true;
              this.btnLatBai.active = false;
              this.currentCard = myCards;
              var arrSeatExist = this.getNumPlayers();
              let numPlayer = arrSeatExist.length;
              for (let index = 0; index < 3 * Lieng_Cmd_1.default.Code.MAX_PLAYER; index++) {
                this.cardsDeal.children[index].active = !(index >= 3 * numPlayer);
                this.cardsDeal.children[index].setPosition(cc.v2(0, 0));
              }
              for (let a = 0; a < 3; a++) for (let b = 0; b < numPlayer; b++) {
                let seatId = arrSeatExist[b];
                if (-1 !== seatId) {
                  let card4Me = this.cardsDeal.children[a * numPlayer + b];
                  let rawPlayerPos = this.groupPlayers.children[seatId].getPosition();
                  card4Me.runAction(cc.sequence(cc.delayTime(.15 * (a * numPlayer + b)), cc.moveTo(.2, rawPlayerPos)));
                }
              }
              let delayOver2Under = .2;
              var maxDelay = .15 * (2 * numPlayer + (numPlayer - 1));
              let timeUnderLayer = maxDelay + .2 + delayOver2Under;
              this.scheduleOnce(() => {
                for (let index = 0; index < 3 * Lieng_Cmd_1.default.Code.MAX_PLAYER; index++) this.cardsDeal.children[index].active = false;
                for (let index = 0; index < numPlayer; index++) {
                  let seatId = arrSeatExist[index];
                  if (-1 !== seatId) {
                    this.getPlayerHouse(seatId).showCardReady(true);
                    this.getPlayerHouse(seatId).showCardReal(false);
                  }
                }
                for (let a = 0; a < 3; a++) {
                  let spriteCardId = Lieng_CardUtil_1.default.getNormalId(myCards[a]);
                  this.getPlayerHouse(0).prepareCardReal(a);
                  this.getPlayerHouse(0).transformToCardReal(a, this.spriteCards[spriteCardId]);
                }
                let cardName = this.getCardsName(myCards);
                this.getPlayerHouse(0).showCardName(cardName);
                this.btnLatBai.active = true;
              }, timeUnderLayer);
            }
            break;

           case Lieng_Cmd_1.default.Code.NEW_ROUND:
            {
              App_1.default.instance.showLoading(false);
              let res = new Lieng_Cmd_1.default.ReceivedNewBetRound(data);
              cc.log(res);
              let roundId = res["roundId"];
              let sizeCard = res["sizeCard"];
              let plusCards = res["plusCards"];
              let cardName = res["cardName"];
              let potAmount = res["potAmount"];
              this.matchPot.active = true;
              this.currentMatchPotValue = potAmount;
              this.labelMatchPot.string = Utils_1.default.formatNumber(potAmount);
              this.currentMeBet = 0;
              this.currentMaxBet = 0;
              this.currentRaiseStep = 2 * this.currentRoomBet;
              this.currentRaiseValue = this.currentMaxBet + this.currentRaiseStep;
              for (let index = 0; index < Lieng_Cmd_1.default.Code.MAX_PLAYER; index++) this.getPlayerHouse(index).showPlayerBet(false);
            }
            break;

           case Lieng_Cmd_1.default.Code.CHANGE_TURN:
            {
              App_1.default.instance.showLoading(false);
              let res = new Lieng_Cmd_1.default.ReceivedChangeTurn(data);
              cc.log(res);
              let roundId = res["roundId"];
              let chair = res["chair"];
              let betTime = res["betTime"];
              this.resetAllPlayerCountdown();
              let seatId = this.findPlayerSeatByPos(chair);
              if (-1 != seatId) {
                this.getPlayerHouse(seatId).showPlayCountdown();
                this.startThinkingCountDown(seatId, betTime);
                if (0 == seatId) {
                  this.btnBet.active = true;
                  this.btnOpenCard.active = false;
                  this.setupBet();
                  this.currentRaiseValue = this.currentMaxBet + this.currentRaiseStep;
                  let currentMeGold = this.getPlayerHouse(0).getGold();
                  let minBet = this.currentRaiseValue - this.currentMeBet;
                  this.sliderBet.initValue(minBet, this.currentRoomBet, currentMeGold);
                  this.resetBtnActions();
                  if (this.currentMaxBet == this.currentMeBet) {
                    this.showBtnCall(false);
                    this.showBtnCheck(true);
                  } else if (this.currentMaxBet - this.currentMeBet >= currentMeGold) {
                    this.showBtnRaise(false);
                    this.showBtnCall(false);
                    this.showBtnCheck(false);
                  } else {
                    this.showBtnCall(true);
                    this.showBtnCheck(false);
                  }
                  this.currentRaiseValue - this.currentMeBet >= currentMeGold && this.showBtnRaise(false);
                }
              }
            }
            break;

           case Lieng_Cmd_1.default.Code.KET_THUC:
            {
              this.closePopupLatBai();
              App_1.default.instance.showLoading(false);
              let res = new Lieng_Cmd_1.default.ReceivedEndGame(data);
              cc.log(res);
              let potAmount = res["potAmount"];
              let rankSize = res["rankSize"];
              let rankList = res["rankList"];
              let kqttSize = res["kqttSize"];
              let kqttList = res["kqttList"];
              let booleanWinerSize = res["booleanWinerSize"];
              let booleanWinerList = res["booleanWinerList"];
              let moneyArraySize = res["moneyArraySize"];
              let currentMoney = res["currentMoney"];
              let gameMoney = res["gameMoney"];
              let gameMoneySize = res["gameMoneySize"];
              let hasInfoSize = res["hasInfoSize"];
              let hasInfoList = res["hasInfoList"];
              let privateCardList = res["privateCardList"];
              let cardNameList = res["cardNameList"];
              this.matchPot.active = true;
              this.currentMatchPotValue = potAmount;
              this.labelMatchPot.string = Utils_1.default.formatNumber(potAmount);
              this.currentPrivateCardList = privateCardList;
              this.btnLatBai.active = false;
              let arrPlayerPosExist = [];
              for (let index = 0; index < Lieng_Cmd_1.default.Code.MAX_PLAYER; index++) privateCardList[index].length > 0 && arrPlayerPosExist.push(index);
              for (let index = 0; index < Lieng_Cmd_1.default.Code.MAX_PLAYER; index++) if (1 == booleanWinerList[index]) {
                let seatId = this.findPlayerSeatByPos(index);
                if (-1 === seatId) continue;
                this.getPlayerHouse(seatId).fxWin({
                  moneyChange: kqttList[index],
                  currentMoney: currentMoney[index]
                });
                if (0 == seatId) {
                  this.effectWin.active = true;
                  this.scheduleOnce(() => {
                    this.effectWin.active = false;
                  }, 5);
                  this.btnOpenCard.active = this.getNumPlayers().length > 2;
                  this.btnBet.active = false;
                }
              } else {
                if (3 !== this.currentPlayerStatus[index]) continue;
                let seatId = this.findPlayerSeatByPos(index);
                if (-1 === seatId) continue;
                this.getPlayerHouse(seatId).fxLose({
                  moneyChange: kqttList[index],
                  currentMoney: currentMoney[index]
                });
                if (0 == seatId) {
                  this.effectLose.active = true;
                  this.scheduleOnce(() => {
                    this.effectLose.active = false;
                  }, 5);
                }
              }
              for (let index = 0; index < arrPlayerPosExist.length; index++) {
                let cards = privateCardList[arrPlayerPosExist[index]];
                let seatId = this.findPlayerSeatByPos(arrPlayerPosExist[index]);
                if (this.foldedNum < rankList.filter(d => 0 != d).length - 1 && cards.length > 0 && -1 != seatId) {
                  for (let a = 0; a < cards.length; a++) {
                    let spriteCardId = Lieng_CardUtil_1.default.getNormalId(cards[a]);
                    this.getPlayerHouse(seatId).prepareCardReal(a);
                    this.getPlayerHouse(seatId).transformToCardReal(a, this.spriteCards[spriteCardId]);
                  }
                  let cardName = this.getCardsName(cards);
                  this.getPlayerHouse(seatId).showCardName(cardName);
                }
              }
              this.foldedNum = 0;
            }
            break;

           case Lieng_Cmd_1.default.Code.UPDATE_MATCH:
            {
              App_1.default.instance.showLoading(false);
              let res = new Lieng_Cmd_1.default.ReceivedUpdateMatch(data);
              cc.log(res);
              let chair = res["chair"];
              let hasInfoSize = res["hasInfoSize"];
              let hasInfoList = res["hasInfoList"];
              let currentMoneyList = res["currentMoneyList"];
              let statusList = res["statusList"];
              for (let index = 0; index < Lieng_Cmd_1.default.Code.MAX_PLAYER; index++) {
                let pos = configPlayer[index]["playerPos"];
                if (1 == hasInfoList[pos]) {
                  this.getPlayerHouse(index).setGold(currentMoneyList[pos]);
                  if (statusList[pos] == Lieng_Cmd_1.default.Code.PLAYER_STATUS_SITTING || statusList[pos] == Lieng_Cmd_1.default.Code.PLAYER_STATUS_PLAYING) if (0 == currentMoneyList[pos]) {
                    configPlayer[index].isViewer = true;
                    configPlayer[index]["isViewer"] = true;
                    this.getPlayerHouse(index).setIsViewer(true);
                    -1 != configPlayer[index].playerId;
                  } else {
                    configPlayer[index].isViewer = false;
                    configPlayer[index]["isViewer"] = false;
                    this.getPlayerHouse(index).setIsViewer(false);
                  } else {
                    configPlayer[index].isViewer = true;
                    configPlayer[index]["isViewer"] = true;
                    this.getPlayerHouse(index).setIsViewer(true);
                    -1 != configPlayer[index].playerId && this.getPlayerHouse(index).playFxViewer();
                  }
                } else {
                  configPlayer[index]["playerId"] = -1;
                  configPlayer[index]["isViewer"] = true;
                }
              }
            }
            break;

           case Lieng_Cmd_1.default.Code.SHOW_CARD:
            {
              App_1.default.instance.showLoading(false);
              let res = new Lieng_Cmd_1.default.ReceivedShowCard(data);
              cc.log(res);
              let chair = res["chair"];
              let seatId = this.findPlayerSeatByPos(chair);
              if (-1 != seatId) {
                let cardShow = this.currentPrivateCardList[chair];
                if (cardShow.length > 0) for (let a = 0; a < 3; a++) {
                  let spriteCardId = Lieng_CardUtil_1.default.getNormalId(cardShow[a]);
                  this.getPlayerHouse(seatId).prepareCardReal(a);
                  this.getPlayerHouse(seatId).transformToCardReal(a, this.spriteCards[spriteCardId]);
                }
              }
            }
            break;

           case Lieng_Cmd_1.default.Code.REQUEST_LAT_BAI:
            {
              App_1.default.instance.showLoading(false);
              let res = new Lieng_Cmd_1.default.ReceivedLatBai(data);
              cc.log(res);
              let chair = res["chair"];
              let cardSize = res["cardSize"];
              let cards = res["cards"];
              let seatId = this.findPlayerSeatByPos(chair);
              if (-1 != seatId && 0 != seatId) for (let a = 0; a < cards.length; a++) if (255 != cards[a]) {
                let spriteCardId = Lieng_CardUtil_1.default.getNormalId(cards[a]);
                this.getPlayerHouse(seatId).prepareCardReal(a);
                this.getPlayerHouse(seatId).transformToCardReal(a, this.spriteCards[spriteCardId]);
              }
            }
            break;

           case Lieng_Cmd_1.default.Code.REQUEST_BUY_IN:
            cc.log("Lieng REQUEST_STAND_UP");
            Configs_1.default.Login.Coin >= this.currentRoomBet * this.roomMinBuyIn ? this.showPopupBuyIn(this.roomMinBuyIn, this.roomMaxBuyIn, this.currentRoomBet) : this.actionLeaveRoom();
            break;

           case Lieng_Cmd_1.default.Code.REQUEST_STAND_UP:
            {
              App_1.default.instance.showLoading(false);
              let res = new Lieng_Cmd_1.default.ReceivedStandUp(data);
              cc.log(res);
              let isUp = res["isUp"];
            }
            break;

           case Lieng_Cmd_1.default.Code.LOGIN:
            App_1.default.instance.showLoading(false);
            this.refeshListRoom();
            Lieng_NetworkClient_1.default.getInstance().send(new Lieng_Cmd_1.default.CmdReconnectRoom());
            break;

           case Lieng_Cmd_1.default.Code.TOPSERVER:
            App_1.default.instance.showLoading(false);
            cc.log("Lieng TOPSERVER");
            break;

           case Lieng_Cmd_1.default.Code.CMD_PINGPONG:
            App_1.default.instance.showLoading(false);
            cc.log("Lieng CMD_PINGPONG");
            break;

           case Lieng_Cmd_1.default.Code.CMD_JOIN_ROOM:
            App_1.default.instance.showLoading(false);
            cc.log("Lieng CMD_JOIN_ROOM");
            break;

           case Lieng_Cmd_1.default.Code.CMD_RECONNECT_ROOM:
           case Lieng_Cmd_1.default.Code.CMD_RECONNECT_ROOM:
            App_1.default.instance.showLoading(false);
            cc.log("Lieng CMD_RECONNECT_ROOM");
            break;

           case Lieng_Cmd_1.default.Code.MONEY_BET_CONFIG:
            App_1.default.instance.showLoading(false);
            cc.log("Lieng MONEY_BET_CONFIG");
            break;

           case Lieng_Cmd_1.default.Code.JOIN_ROOM_FAIL:
            {
              App_1.default.instance.showLoading(false);
              let res = new Lieng_Cmd_1.default.ReceivedJoinRoomFail(data);
              cc.log(res);
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

           case Lieng_Cmd_1.default.Code.GET_LIST_ROOM:
            {
              let res = new Lieng_Cmd_1.default.ReceivedGetListRoom(data);
              cc.log(res);
              this.initRooms(res.list);
            }
            break;

           case Lieng_Cmd_1.default.Code.JOIN_GAME_ROOM_BY_ID:
            App_1.default.instance.showLoading(false);
            cc.log("Lieng JOIN_GAME_ROOM_BY_ID");
            break;

           case Lieng_Cmd_1.default.Code.TU_DONG_BAT_DAU:
            {
              App_1.default.instance.showLoading(false);
              let res = new Lieng_Cmd_1.default.ReceivedAutoStart(data);
              cc.log(res);
              this.foldedNum = 0;
              this.btnLatBai.active = false;
              if (res.isAutoStart) {
                this.resetHubChips();
                this.startWaittingCountDown(res.timeAutoStart);
                this.btnBet.active = false;
                this.btnOpenCard.active = false;
                this.matchPot.active = false;
                this.labelMatchPot.string = "0";
                this.currentMatchPotValue = 0;
                this.currentCard = [];
                this.currentPrivateCardList = [];
                this.currentMeBet = 0;
                this.currentMaxBet = 0;
                this.currentRaiseStep = 0;
                this.currentRaiseValue = 0;
                this.resetPlayersPlaying();
              }
            }
            break;

           case Lieng_Cmd_1.default.Code.MOI_DAT_CUOC:
            {
              App_1.default.instance.showLoading(false);
              let res = new Lieng_Cmd_1.default.ReceivedMoiDatCuoc(data);
              cc.log(res);
              this.startBettingCountDown(res.timeDatCuoc);
              this.arrBetValue = [];
              this.matchPot.active = true;
              this.currentMatchPotValue = 0;
              this.labelMatchPot.string = "0";
              for (let index = 0; index < 4; index++) this.arrBetValue.push(this.currentRoomBet * (index + 1));
              this.sliderBet.initValue(this.currentRoomBet, this.currentRoomBet, 4 * this.currentRoomBet, betCu => {
                let currentMeGold = this.getPlayerHouse(0).getGold();
                let btnBe = this.btnActions.getChildByName("btnRaise");
                btnBe && (btnBe.getComponent(cc.Button).interactable = betCu <= currentMeGold);
              });
              for (let index = 0; index < configPlayer.length; index++) index === this.seatOwner || configPlayer[index].isViewer || -1 === configPlayer[index].playerId || this.getPlayerHouse(index).setBet(this.currentRoomBet);
              if (0 == this.seatOwner) {
                this.btnOpenCard.active = false;
                this.btnBet.active = false;
              } else {
                this.btnBet.active = true;
                this.btnOpenCard.active = false;
                this.setupBet();
              }
              this.numCardOpened = 0;
            }
            break;

           case Lieng_Cmd_1.default.Code.CHEAT_CARDS:
            App_1.default.instance.showLoading(false);
            cc.log("Lieng CHEAT_CARDS");
            break;

           case Lieng_Cmd_1.default.Code.DANG_KY_CHOI_TIEP:
            App_1.default.instance.showLoading(false);
            cc.log("Lieng DANG_KY_CHOI_TIEP");
            break;

           case Lieng_Cmd_1.default.Code.UPDATE_OWNER_ROOM:
            App_1.default.instance.showLoading(false);
            cc.log("Lieng UPDATE_OWNER_ROOM");
            break;

           case Lieng_Cmd_1.default.Code.NOTIFY_KICK_FROM_ROOM:
            {
              App_1.default.instance.showLoading(false);
              let res = new Lieng_Cmd_1.default.ReceivedKickOff(data);
              cc.log(res);
              this.onKickFromRoom(res.reason);
            }
            break;

           case Lieng_Cmd_1.default.Code.NOTIFY_USER_GET_JACKPOT:
            App_1.default.instance.showLoading(false);
            cc.log("Lieng NOTIFY_USER_GET_JACKPOT");
            break;

           case Lieng_Cmd_1.default.Code.CHAT_ROOM:
            {
              App_1.default.instance.showLoading(false);
              let res = new Lieng_Cmd_1.default.ReceivedChatRoom(data);
              cc.log(res);
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

           case Lieng_Cmd_1.default.Code.CARDS_DEFINE:
            {
              let res = new Lieng_Cmd_1.default.ReceivedCardDefinations(data);
              cc.log(res);
              this.receivedCardDefinations(res);
            }
          }
        }, this);
      }
      actionLeaveRoom() {
        Lieng_NetworkClient_1.default.getInstance().send(new Lieng_Cmd_1.default.CmdSendRequestLeaveGame());
      }
      actionOpenCard() {
        Lieng_NetworkClient_1.default.getInstance().send(new Lieng_Cmd_1.default.SendShowCard());
        this.btnOpenCard.active = false;
      }
      actionLatBai() {
        if (this.arrBaiLat.length > 0 && this.arrBaiLat.length < 3) {
          let arrCardsOpen = [];
          for (let index = 0; index < this.arrBaiLat.length; index++) arrCardsOpen.push(this.currentCard[this.arrBaiLat[index]]);
          Lieng_NetworkClient_1.default.getInstance().send(new Lieng_Cmd_1.default.CmdSendLatBai(arrCardsOpen));
          this.popupLatBai.active = false;
          this.btnLatBai.active = false;
        }
      }
      increaseBetValue() {
        this.currentBetSelectedIndex == this.arrBetValue.length - 1 || (this.currentBetSelectedIndex += 1);
        this.handleSlide();
      }
      decreaseBetValue() {
        0 == this.currentBetSelectedIndex || (this.currentBetSelectedIndex -= 1);
        this.handleSlide();
      }
      actionAll_In() {
        this.btnBet.active = false;
        Lieng_NetworkClient_1.default.getInstance().send(new Lieng_Cmd_1.default.SendTakeTurn(0, 0, 0, 1, 0));
      }
      actionRaise() {
        this.btnBet.active = false;
        let currentMeMoney = this.getPlayerHouse(0).getGold();
        let betValue = Math.min(this.sliderBet.current_raise, currentMeMoney);
        Lieng_NetworkClient_1.default.getInstance().send(new Lieng_Cmd_1.default.SendTakeTurn(0, 0, 0, 0, betValue));
      }
      actionCheck() {
        this.btnBet.active = false;
        Lieng_NetworkClient_1.default.getInstance().send(new Lieng_Cmd_1.default.SendTakeTurn(0, 1, 0, 0, 0));
      }
      actionCall() {
        this.btnBet.active = false;
        Lieng_NetworkClient_1.default.getInstance().send(new Lieng_Cmd_1.default.SendTakeTurn(0, 0, 1, 0, 0));
      }
      actionFold() {
        this.btnBet.active = false;
        this.btnLatBai.active = false;
        Lieng_NetworkClient_1.default.getInstance().send(new Lieng_Cmd_1.default.SendTakeTurn(1, 0, 0, 0, 0));
      }
      actionBuyIn() {
        let bet = this.sliderBuyin.current_raise;
        if (Configs_1.default.Login.Coin < bet) {
          App_1.default.instance.alertDialog.showMsg("S\u1ed1 d\u01b0 kh\xf4ng \u0111\u1ee7");
          return;
        }
        Configs_1.default.Login.Coin < this.maxCashIn && (this.maxCashIn = Configs_1.default.Login.Coin);
        if (bet < this.minCashIn * this.currentRoomBet) {
          App_1.default.instance.alertDialog.showMsg("S\u1ed1 ti\u1ec1n Buy In ph\u1ea3i l\u1edbn h\u01a1n " + Utils_1.default.formatNumber(this.minCashIn * this.currentRoomBet));
          return;
        }
        if (bet > this.maxCashIn * this.currentRoomBet) {
          App_1.default.instance.alertDialog.showMsg("S\u1ed1 ti\u1ec1n Buy In ph\u1ea3i nh\u1ecf h\u01a1n " + Utils_1.default.formatNumber(this.maxCashIn * this.currentRoomBet));
          return;
        }
        this.toggleAutoBuyIn.isChecked ? Lieng_NetworkClient_1.default.getInstance().send(new Lieng_Cmd_1.default.SendBuyIn(bet, 1)) : Lieng_NetworkClient_1.default.getInstance().send(new Lieng_Cmd_1.default.SendBuyIn(bet, 0));
        App_1.default.instance.showLoading(true);
        this.closePopupBuyIn();
      }
      initConfigPlayer() {
        configPlayer = [];
        for (let index = 0; index < Lieng_Cmd_1.default.Code.MAX_PLAYER; index++) configPlayer.push({
          seatId: index,
          playerId: -1,
          playerPos: -1,
          isViewer: true
        });
      }
      resetPlayersPlaying() {
        for (let index = 0; index < Lieng_Cmd_1.default.Code.MAX_PLAYER; index++) this.getPlayerHouse(index).resetMatchHistory();
      }
      resetAllPlayerCountdown() {
        for (let index = 0; index < Lieng_Cmd_1.default.Code.MAX_PLAYER; index++) this.getPlayerHouse(index).hidePlayCountdown();
      }
      checkIsAnh(arrCards) {
        for (let index = 0; index < arrCards.length; index++) {
          let score = Lieng_CardUtil_1.default.getDiemById(arrCards[index]);
          if (score < 11) return false;
        }
        return true;
      }
      checkIsLieng(arrCards) {
        let arrScore = [];
        for (let index = 0; index < arrCards.length; index++) {
          let score = Lieng_CardUtil_1.default.getDiemById(arrCards[index]);
          arrScore.push(score);
        }
        arrScore.sort((a, b) => a - b);
        return 1 == arrScore[0] && 12 == arrScore[1] && 13 == arrScore[2] || arrScore[1] == arrScore[0] + 1 && arrScore[2] == arrScore[0] + 2;
      }
      checkIsSap(arrCards) {
        let score = Lieng_CardUtil_1.default.getDiemById(arrCards[0]);
        for (let index = 1; index < arrCards.length; index++) if (score !== Lieng_CardUtil_1.default.getDiemById(arrCards[index])) return false;
        return true;
      }
      getCardsName(arrCards) {
        if (this.checkIsSap(arrCards)) {
          let score = Lieng_CardUtil_1.default.getDiemById(arrCards[0]);
          return 1 == score ? "S\xe1p \xc1t" : 11 == score ? "S\xe1p J" : 12 == score ? "S\xe1p Q" : 13 == score ? "S\xe1p K" : "S\xe1p " + score;
        }
        if (this.checkIsLieng(arrCards)) return "Li\xeang";
        if (this.checkIsAnh(arrCards)) return "\u1ea2nh";
        {
          let totalScore = 0;
          for (let index = 0; index < arrCards.length; index++) {
            let score = Lieng_CardUtil_1.default.getDiemById(arrCards[index]);
            score < 10 && (totalScore += score);
          }
          let finalScore = totalScore % 10;
          return 0 == finalScore ? "0 N\u01b0\u1edbc" : 1 == finalScore ? "1 T\u1ecbt" : finalScore + " N\u01b0\u1edbc";
        }
      }
      setupSeatPlayer(seatId, playerInfo) {
        configPlayer[seatId].playerId = playerInfo.nickName;
        this.getPlayerHouse(seatId).setPlayerInfo(playerInfo);
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
        return this.groupPlayers.children[seatId].getComponent(Lieng_Player_1.default);
      }
      getNumPlayers() {
        var playerPosEntry = [];
        for (let index = 0; index < configPlayer.length; index++) -1 === configPlayer[index].playerId || configPlayer[index].isViewer || playerPosEntry.push(configPlayer[index].seatId);
        return playerPosEntry;
      }
      initRooms(rooms) {
        this.listRoom = [];
        this.scrollListRoom.content.removeAllChildren();
        let listBet = rooms.filter(room => room["moneyType"] === Configs_1.default.App.MONEY_TYPE).map(room => room["moneyBet"]);
        listBet = [ ...new Set(listBet) ];
        listBet.forEach((bet, index) => {
          let playerCount = 0;
          let maxUser = 0;
          let moneyRequire = 0;
          rooms.forEach(room => {
            if (room.moneyBet === bet) {
              playerCount += room.userCount;
              maxUser = room.maxUserPerRoom;
              moneyRequire = room.requiredMoney;
            }
          });
          this.listRoom.push(new ItemRoom_1.RoomItemInfo(index + 1, bet, moneyRequire, playerCount, maxUser));
        });
        this.listRoom.sort((a, b) => a.moneyBet - b.moneyBet);
        let speed = .7;
        this.header.runAction(cc.sequence(cc.fadeOut(0), cc.delayTime(.15 * this.listRoom.length * speed), cc.fadeIn(.2)));
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
            Lieng_NetworkClient_1.default.getInstance().send(new CardGame_Cmd_1.default.SendJoinRoom(Configs_1.default.App.MONEY_TYPE, room.maxUserPerRoom, room.moneyBet, 0));
          });
          roomItem.parent = this.scrollListRoom.content;
          roomItem.y = -30;
          let time = .2 * speed * (1 === index ? .8 : 1 - Math.pow(2, -10 * index));
          roomItem.runAction(cc.sequence(cc.fadeOut(0), cc.delayTime(.15 * (this.listRoom.length - index) * speed), cc.spawn(cc.fadeIn(time), cc.moveTo(time, cc.v2(0, -30 - 85 * index)).easing(cc.easeCircleActionOut()))));
        });
        this.scrollListRoom.scrollToBottom(0);
        this.scrollListRoom.scrollToTop(2);
      }
      onKickFromRoom(reason) {
        let seatId = 0;
        for (let index = 0; index < configPlayer.length; index++) if (configPlayer[index].seatId == seatId) {
          configPlayer[index].playerId = -1;
          configPlayer[index].isViewer = true;
        }
        this.getPlayerHouse(seatId).resetPlayerInfo();
        this.getPlayerHouse(seatId).showBtnInvite(true);
        let arrSeatExistLast = this.getNumPlayers();
        if (1 == arrSeatExistLast.length) {
          this.resetPlayersPlaying();
          this.matchPot.active = false;
        }
        if (0 == seatId) {
          this.UI_Playing.active = false;
          this.UI_ChooseRoom.active = true;
          this.refeshListRoom();
        }
        this.scheduleOnce(() => {
          switch (reason) {
           case Lieng_Constant_1.KickReasonCodes.ENUM.ERROR_MONEY:
            App_1.default.instance.actiontDialog.showMsgWithAction("S\u1ed1 d\u01b0 kh\xf4ng \u0111\u1ee7.", "N\u1ea0P NGAY", () => {
              App_1.default.instance.openShop(0);
            });
            break;

           case Lieng_Constant_1.KickReasonCodes.ENUM.ERROR_BAO_TRI:
            App_1.default.instance.alertDialog.showMsg("H\u1ec7 th\u1ed1ng b\u1ea3o tr\xec!");
            break;

           default:
            App_1.default.instance.alertDialog.showMsg("B\u1ea1n b\u1ecb kick kh\u1ecfi b\xe0n ch\u01a1i!");
          }
        }, .5);
      }
      handleSlide() {}
      getCardDefinations() {
        Lieng_NetworkClient_1.default.getInstance().send(new Lieng_Cmd_1.default.SendCardDefinations());
      }
      receivedCardDefinations(cardsDefineData) {
        const cardObjects = JSON.parse(cardsDefineData.strData).object || [];
        cardObjects.forEach(cardObject => this.cardDefinations.push(new CardGame_Cmd_1.default.CardDefination(cardObject)));
        this.btnShowCardDefinations.node.active = (true, this.cardDefinations.length > 0);
      }
      actShowCardDefinations() {
        PopupCardDefinations_1.default.createAndShow(this.UI_Playing, this.cardDefinations, this.spriteCards);
      }
      actShowChat() {
        PopupChatInGame_1.default.createAndShow(this.UI_Playing, this.cardDefinations, (chatType, content) => {
          Lieng_NetworkClient_1.default.getInstance().send(new Lieng_Cmd_1.default.SendChatRoom(chatType, content));
        }, (cheatType, cardCheatIds) => {
          Lieng_NetworkClient_1.default.getInstance().send(new Lieng_Cmd_1.default.SendCheatCards(cheatType, cardCheatIds));
        });
      }
      actSetting() {
        PopupSettingInGame_1.default.createAndShow(this.UI_Playing, Configs_1.default.App.BUNDLE_NAME.LIENG, () => {
          Lieng_PopupGuide_1.default.createAndShow(this.UI_Playing);
        }, () => {
          this.actionLeaveRoom();
        });
      }
    };
    LiengController.instance = null;
    __decorate([ property(cc.Node) ], LiengController.prototype, "UI_ChooseRoom", void 0);
    __decorate([ property(cc.Label) ], LiengController.prototype, "labelNickName", void 0);
    __decorate([ property(cc.Label) ], LiengController.prototype, "labelCoin", void 0);
    __decorate([ property(cc.Sprite) ], LiengController.prototype, "sprAvatar", void 0);
    __decorate([ property(cc.Node) ], LiengController.prototype, "contentListRooms", void 0);
    __decorate([ property(cc.Node) ], LiengController.prototype, "header", void 0);
    __decorate([ property(cc.Prefab) ], LiengController.prototype, "prefabItemRoom", void 0);
    __decorate([ property(cc.ScrollView) ], LiengController.prototype, "scrollListRoom", void 0);
    __decorate([ property(cc.Node) ], LiengController.prototype, "UI_Playing", void 0);
    __decorate([ property(cc.Node) ], LiengController.prototype, "meCards", void 0);
    __decorate([ property(cc.Node) ], LiengController.prototype, "groupPlayers", void 0);
    __decorate([ property(cc.SpriteFrame) ], LiengController.prototype, "spriteCards", void 0);
    __decorate([ property(cc.SpriteFrame) ], LiengController.prototype, "spriteCardBack", void 0);
    __decorate([ property(cc.Node) ], LiengController.prototype, "matchPot", void 0);
    __decorate([ property(cc.Label) ], LiengController.prototype, "labelMatchPot", void 0);
    __decorate([ property(cc.Node) ], LiengController.prototype, "cardsDeal", void 0);
    __decorate([ property(cc.Node) ], LiengController.prototype, "cardsCenter", void 0);
    __decorate([ property(cc.Node) ], LiengController.prototype, "btnBet", void 0);
    __decorate([ property(cc.Node) ], LiengController.prototype, "btnOpenCard", void 0);
    __decorate([ property(cc.Node) ], LiengController.prototype, "hubChips", void 0);
    __decorate([ property(cc.Label) ], LiengController.prototype, "labelRoomId", void 0);
    __decorate([ property(cc.Label) ], LiengController.prototype, "labelRoomBet", void 0);
    __decorate([ property(cc.Label) ], LiengController.prototype, "labelMatchId", void 0);
    __decorate([ property(cc.Node) ], LiengController.prototype, "actionBetting", void 0);
    __decorate([ property(cc.Node) ], LiengController.prototype, "btnActions", void 0);
    __decorate([ property(cc.Node) ], LiengController.prototype, "btnLatBai", void 0);
    __decorate([ property(cc.Node) ], LiengController.prototype, "popupBuyIn", void 0);
    __decorate([ property(cc.Label) ], LiengController.prototype, "labelBuyInMin", void 0);
    __decorate([ property(cc.Label) ], LiengController.prototype, "labelBuyInMax", void 0);
    __decorate([ property(CustomUI_SliderBet_1.default) ], LiengController.prototype, "sliderBuyin", void 0);
    __decorate([ property(cc.Toggle) ], LiengController.prototype, "toggleAutoBuyIn", void 0);
    __decorate([ property(cc.Node) ], LiengController.prototype, "notifyTimeStart", void 0);
    __decorate([ property(cc.Node) ], LiengController.prototype, "notifyTimeEnd", void 0);
    __decorate([ property(cc.Node) ], LiengController.prototype, "notifyTimeBet", void 0);
    __decorate([ property(cc.Node) ], LiengController.prototype, "effectWin", void 0);
    __decorate([ property(cc.Node) ], LiengController.prototype, "effectLose", void 0);
    __decorate([ property(cc.Node) ], LiengController.prototype, "popupNodity", void 0);
    __decorate([ property(cc.Label) ], LiengController.prototype, "labelNotifyContent", void 0);
    __decorate([ property(cc.Node) ], LiengController.prototype, "popupLatBai", void 0);
    __decorate([ property(cc.Node) ], LiengController.prototype, "latBaiSelector", void 0);
    __decorate([ property(CustomUI_SliderBet_1.default) ], LiengController.prototype, "sliderBet", void 0);
    __decorate([ property(cc.Button) ], LiengController.prototype, "btnShowCardDefinations", void 0);
    LiengController = LiengController_1 = __decorate([ ccclass ], LiengController);
    exports.default = LiengController;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/App": void 0,
    "../../Main/Game/src/common/BroadcastReceiver": void 0,
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/common/Utils": void 0,
    "../../Main/Game/src/customui/CustomUI.SliderBet": void 0,
    "../../Main/Game/src/games/cardgames/ItemRoom": void 0,
    "../../Main/Game/src/games/cardgames/PopupCardDefinations": void 0,
    "../../Main/Game/src/games/cardgames/PopupChatInGame": void 0,
    "../../Main/Game/src/games/cardgames/PopupSettingInGame": void 0,
    "../../Main/Game/src/networks/CardGame.Cmd": void 0,
    "../../Main/Game/src/networks/MiniGameNetworkClient": void 0,
    "../../Main/Game/src/networks/Network.Cmd": void 0,
    "../../Main/Game/src/networks/Network.InPacket": void 0,
    "./Lieng.CardUtil": "Lieng.CardUtil",
    "./Lieng.Cmd": "Lieng.Cmd",
    "./Lieng.Constant": "Lieng.Constant",
    "./Lieng.NetworkClient": "Lieng.NetworkClient",
    "./Lieng.Player": "Lieng.Player",
    "./Lieng.PopupGuide": "Lieng.PopupGuide"
  } ],
  "Lieng.ItemRoom": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3778ebIHFJPMIlPzQz6ndxU", "Lieng.ItemRoom");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Lieng_Controller_1 = require("./Lieng.Controller");
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    const App_1 = require("../../Main/Game/src/common/App");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let LiengItemRoom = class LiengItemRoom extends cc.Component {
      constructor() {
        super(...arguments);
        this.labelBet = null;
        this.labelBetMin = null;
        this.labelNumPlayers = null;
        this.progressNumPlayers = null;
        this.roomInfo = null;
      }
      initItem(info) {
        this.roomInfo = info;
        this.labelBet.string = Utils_1.default.formatNumber(info["moneyBet"]);
        this.labelBetMin.string = Utils_1.default.formatNumber(info["requiredMoney"]);
        this.labelNumPlayers.string = info["userCount"];
        this.progressNumPlayers.fillRange = info["userCount"] / info["maxUserPerRoom"];
      }
      chooseRoom() {
        Configs_1.default.Login.Coin < this.roomInfo["requiredMoney"] ? App_1.default.instance.alertDialog.showMsg("B\u1ea1n kh\xf4ng \u0111\u1ee7 ti\u1ec1n \u0111\u1ec3 v\xe0o ch\u01a1i b\xe0n n\xe0y!") : Lieng_Controller_1.default.instance.joinRoom(this.roomInfo);
      }
    };
    __decorate([ property(cc.Label) ], LiengItemRoom.prototype, "labelBet", void 0);
    __decorate([ property(cc.Label) ], LiengItemRoom.prototype, "labelBetMin", void 0);
    __decorate([ property(cc.Label) ], LiengItemRoom.prototype, "labelNumPlayers", void 0);
    __decorate([ property(cc.Sprite) ], LiengItemRoom.prototype, "progressNumPlayers", void 0);
    LiengItemRoom = __decorate([ ccclass ], LiengItemRoom);
    exports.default = LiengItemRoom;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/App": void 0,
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/common/Utils": void 0,
    "./Lieng.Controller": "Lieng.Controller"
  } ],
  "Lieng.NetworkClient": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ecb20BT55ZNu45qnh+lSYB9", "Lieng.NetworkClient");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Network_NetworkClient_1 = require("../../Main/Game/src/networks/Network.NetworkClient");
    const Network_NetworkListener_1 = require("../../Main/Game/src/networks/Network.NetworkListener");
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    class LiengNetworkClient extends Network_NetworkClient_1.default {
      constructor() {
        super();
        this.listeners = new Array();
        this.isUseWSS = Configs_1.default.App.USE_WSS;
      }
      static getInstance() {
        null == this.instance && (this.instance = new LiengNetworkClient());
        return this.instance;
      }
      connect() {
        super.connect(Configs_1.default.App.HOST_LIENG.host, Configs_1.default.App.HOST_LIENG.port);
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
    exports.default = LiengNetworkClient;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/networks/Network.NetworkClient": void 0,
    "../../Main/Game/src/networks/Network.NetworkListener": void 0
  } ],
  "Lieng.Player": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "56889cHjY1BZLrX9dthDSjK", "Lieng.Player");
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
    const {ccclass: ccclass, property: property} = cc._decorator;
    let Player = class Player extends cc.Component {
      constructor() {
        super(...arguments);
        this.btnInvite = null;
        this.avatar = null;
        this.cardReady = null;
        this.cardReal = null;
        this.userName = null;
        this.userGold = null;
        this.dealer = null;
        this.smallBind = null;
        this.bigBind = null;
        this.owner = null;
        this.cardsName = null;
        this.actionState = null;
        this.actionViewer = null;
        this.actionThinking = null;
        this.actionWin = null;
        this.goldWin = null;
        this.actionLose = null;
        this.goldLose = null;
        this.hub = null;
        this.goldBet = null;
        this.prefabItemChip = null;
        this.notify = null;
        this.chatEmotion = null;
        this.chatMsg = null;
        this.shadowAvatar = null;
        this.shadowInfo = null;
        this.spriteCardBack = null;
        this.timeoutChat = null;
      }
      start() {
        BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.SET_SOUND, this.node);
      }
      setPlayerInfo(playerInfo) {
        this.node.active = true;
        this.setAvatar(playerInfo.avatar);
        this.setName(playerInfo.nickName);
        this.setGold(playerInfo.currentMoney);
      }
      showChatEmotion(content) {
        this.node.children[7].active = true;
        this.chatEmotion.active = true;
        this.chatMsg.active = false;
        this.unschedule(this.timeoutChat);
        this.chatEmotion.getComponent(sp.Skeleton).setAnimation(0, content, true);
        this.timeoutChat = () => {
          this.chatEmotion.active = false;
          this.chatMsg.active = false;
        };
        this.scheduleOnce(this.timeoutChat, 3);
      }
      showChatMsg(content) {
        this.node.children[7].active = true;
        this.chatEmotion.active = false;
        this.chatMsg.active = true;
        this.unschedule(this.timeoutChat);
        this.chatMsg.children[1].getComponent(cc.Label).string = content;
        this.timeoutChat = () => {
          this.chatEmotion.active = false;
          this.chatMsg.active = false;
        };
        this.scheduleOnce(this.timeoutChat, 3);
      }
      showBtnInvite(state) {
        return;
      }
      setOwner(state) {
        this.owner.active = state;
      }
      setDealer(state) {
        this.dealer.active = state;
      }
      setSmallBind(state) {
        this.smallBind.active = state;
      }
      setBigBind(state) {
        this.bigBind.active = state;
      }
      setAvatar(avatar) {
        this.node.children[1].active = true;
        this.avatar.getComponent(cc.Sprite).spriteFrame = App_1.default.instance.getAvatarSpriteFrame(avatar);
      }
      setIsViewer(state) {
        this.shadowAvatar.active = state;
        this.shadowInfo.active = state;
      }
      setName(data) {
        this.node.children[3].active = true;
        this.userName.string = data;
      }
      showCardReady(state) {
        this.node.children[2].active = true;
        this.cardReady.active = state;
      }
      showCardReal(state) {
        this.node.children[2].active = true;
        this.cardReal.active = state;
      }
      prepareToTransform() {
        this.prepareCardReal(0);
        this.prepareCardReal(1);
        this.prepareCardReal(2);
      }
      prepareCardReal(pos) {
        this.cardReal.children[pos].runAction(cc.scaleTo(0, 0, 1));
      }
      transformToCardReal(cardPos, spriteCard) {
        this.showCardReal(true);
        this.cardReal.children[cardPos].children[0].getComponent(cc.Sprite).spriteFrame = spriteCard;
        this.cardReady.children[cardPos].runAction(cc.sequence(cc.scaleTo(.15, 0, 1), cc.callFunc(() => {})));
        this.cardReal.children[cardPos].runAction(cc.sequence(cc.delayTime(.15), cc.scaleTo(.15, 1, 1), cc.callFunc(() => {})));
      }
      showCardName(name) {
        this.cardsName.active = true;
        this.cardsName.children[0].getComponent(cc.Label).string = name;
      }
      hideCardName() {
        this.cardsName.active = false;
      }
      setGold(data, isBuyIn = false) {
        this.actionViewer.active = false;
        this.actionThinking.active = false;
        let strGold = this.formatGold(data);
        this.userGold.string = strGold;
        if (!isBuyIn) return;
        let node = new cc.Node("label");
        node.parent = this.node;
        node.zIndex = cc.macro.MAX_ZINDEX;
        node.y = 20;
        node.opacity = 0;
        let labelCom = node.addComponent(cc.Label);
        labelCom.font = this.userGold.font;
        labelCom.fontSize = 30;
        labelCom.string = "+" + strGold;
        cc.tween(node).by(1, {
          opacity: 255,
          y: 100
        }).removeSelf().start();
      }
      getGold() {
        let raw = this.userGold.string.replace(/\./g, "");
        return parseInt(raw);
      }
      setBet(bet) {
        this.showPlayerBet(true);
        this.goldBet.string = this.formatGold(bet);
        this.addChips();
      }
      addChips() {
        if (this.hub.childrenCount > 10) return;
        this.hub.addChild(cc.instantiate(this.prefabItemChip));
      }
      showPlayerBet(state) {
        this.node.children[5].active = state;
        if (state) return;
        this.hub.removeAllChildren(true);
      }
      setCardReal01(data) {
        this.cardReal.children[0].children[0].getComponent(cc.Sprite).spriteFrame = data;
      }
      setCardReal02(data) {
        this.cardReal.children[1].children[0].getComponent(cc.Sprite).spriteFrame = data;
      }
      showPlayCountdown() {
        this.node.children[1].active = true;
        this.actionThinking.active = true;
        this.processThinking(0);
      }
      hidePlayCountdown() {
        this.actionThinking.active = false;
      }
      processThinking(rate) {
        this.actionThinking.getComponent(cc.Sprite).fillRange = rate;
      }
      prepareFxAction() {
        this.node.children[4].active = true;
        this.resetAction();
      }
      showActionState(state) {
        this.node.children[4].active = true;
        this.actionState.active = true;
        this.actionState.children[1].getComponent(cc.Label).string = state;
      }
      playFxViewer() {
        this.prepareFxAction();
        this.actionViewer.active = true;
      }
      fxMeFold() {
        this.showCardReady(false);
        this.hideCardName();
        this.shadowCardReal(true);
        this.cardReal.runAction(cc.moveBy(.5, 0, -20));
      }
      fxWin(playerInfo) {
        this.node.children[4].active = true;
        this.actionWin.active = true;
        this.fxGoldChange(0, playerInfo.moneyChange, this.goldWin.node);
        this.setGold(this.formatGold(playerInfo.currentMoney));
      }
      fxLose(playerInfo) {
        this.node.children[4].active = true;
        this.actionLose.active = true;
        this.setGold(this.formatGold(playerInfo.currentMoney));
      }
      shadowCardReady(state) {
        for (let index = 0; index < this.cardReady.childrenCount; index++) this.cardReady.children[index].color = state ? cc.Color.GRAY : cc.Color.WHITE;
      }
      shadowCardReal(state) {
        for (let index = 0; index < this.cardReal.childrenCount; index++) this.cardReal.children[index].children[0].color = state ? cc.Color.GRAY : cc.Color.WHITE;
      }
      showNotify(isOut) {
        this.notify.getComponentInChildren(cc.Label).string = isOut ? "S\u1eafp r\u1eddi b\xe0n!" : "Ch\u01a1i ti\u1ebfp!";
        this.notify.active = true;
        this.scheduleOnce(() => {
          this.notify.active = false;
        }, 1.5);
      }
      resetAction() {
        for (let index = 0; index < this.node.children[4].childrenCount; index++) this.node.children[4].children[index].active = false;
      }
      resetMatchHistory() {
        this.resetCardReady();
        this.resetCardReal();
        this.node.children[2].active = false;
        this.cardsName.active = false;
        this.setDealer(false);
        this.setBigBind(false);
        this.setSmallBind(false);
        this.resetAction();
        this.node.children[5].active = false;
        this.goldBet.string = "0";
        this.hub.removeAllChildren(true);
      }
      resetCardReady() {
        for (let index = 0; index < this.cardReady.childrenCount; index++) this.cardReady.children[index].scale = 1;
        this.cardReady.active = false;
      }
      resetCardReal() {
        this.cardReal.active = false;
        this.cardReal.y = 0;
        for (let index = 0; index < this.cardReal.childrenCount; index++) this.cardReal.children[index].children[0].getComponent(cc.Sprite).spriteFrame = this.spriteCardBack;
        this.shadowCardReal(false);
      }
      resetPlayerInfo() {
        this.node.active = false;
        for (let index = 0; index < this.cardReal.childrenCount; index++) this.cardReal.children[index].children[0].getComponent(cc.Sprite).spriteFrame = this.spriteCardBack;
        this.cardReady.active = false;
        this.cardReal.active = false;
        this.setDealer(false);
        this.setBigBind(false);
        this.setSmallBind(false);
        this.cardsName.active = false;
        this.actionViewer.active = false;
        this.actionThinking.active = false;
        this.actionWin.active = false;
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
    };
    __decorate([ property(cc.Node) ], Player.prototype, "btnInvite", void 0);
    __decorate([ property(cc.Node) ], Player.prototype, "avatar", void 0);
    __decorate([ property(cc.Node) ], Player.prototype, "cardReady", void 0);
    __decorate([ property(cc.Node) ], Player.prototype, "cardReal", void 0);
    __decorate([ property(cc.Label) ], Player.prototype, "userName", void 0);
    __decorate([ property(cc.Label) ], Player.prototype, "userGold", void 0);
    __decorate([ property(cc.Node) ], Player.prototype, "dealer", void 0);
    __decorate([ property(cc.Node) ], Player.prototype, "smallBind", void 0);
    __decorate([ property(cc.Node) ], Player.prototype, "bigBind", void 0);
    __decorate([ property(cc.Node) ], Player.prototype, "owner", void 0);
    __decorate([ property(cc.Node) ], Player.prototype, "cardsName", void 0);
    __decorate([ property(cc.Node) ], Player.prototype, "actionState", void 0);
    __decorate([ property(cc.Node) ], Player.prototype, "actionViewer", void 0);
    __decorate([ property(cc.Node) ], Player.prototype, "actionThinking", void 0);
    __decorate([ property(cc.Node) ], Player.prototype, "actionWin", void 0);
    __decorate([ property(cc.Label) ], Player.prototype, "goldWin", void 0);
    __decorate([ property(cc.Node) ], Player.prototype, "actionLose", void 0);
    __decorate([ property(cc.Label) ], Player.prototype, "goldLose", void 0);
    __decorate([ property(cc.Node) ], Player.prototype, "hub", void 0);
    __decorate([ property(cc.Label) ], Player.prototype, "goldBet", void 0);
    __decorate([ property(cc.Prefab) ], Player.prototype, "prefabItemChip", void 0);
    __decorate([ property(cc.Node) ], Player.prototype, "notify", void 0);
    __decorate([ property(cc.Node) ], Player.prototype, "chatEmotion", void 0);
    __decorate([ property(cc.Node) ], Player.prototype, "chatMsg", void 0);
    __decorate([ property(cc.Node) ], Player.prototype, "shadowAvatar", void 0);
    __decorate([ property(cc.Node) ], Player.prototype, "shadowInfo", void 0);
    __decorate([ property(cc.SpriteFrame) ], Player.prototype, "spriteCardBack", void 0);
    Player = __decorate([ ccclass ], Player);
    exports.default = Player;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/App": void 0,
    "../../Main/Game/src/common/BroadcastReceiver": void 0
  } ],
  "Lieng.PopupGuide": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "25498KHXg5MR5TlAn6lW+OB", "Lieng.PopupGuide");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var LiengPopupGuide_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const App_1 = require("../../Main/Game/src/common/App");
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    const Dialog_1 = require("../../Main/Game/src/common/Dialog");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let LiengPopupGuide = LiengPopupGuide_1 = class LiengPopupGuide extends Dialog_1.default {
      constructor() {
        super(...arguments);
        this.scrollPopupGuide = null;
      }
      static createAndShow(parent) {
        null == this.instance || null == this.instance.node ? App_1.default.instance.loadPrefabInBundle(Configs_1.default.App.BUNDLE_NAME.LIENG, Configs_1.default.App.UPDATE_INFO[Configs_1.default.App.BUNDLE_NAME.LIENG], true, "res/prefabs/LiengPopupGuide", (err, prefab) => {
          if (null != err) {
            App_1.default.instance.alertDialog.showMsg(err);
            return;
          }
          let go = cc.instantiate(prefab);
          go.parent = parent;
          this.instance = go.getComponent(LiengPopupGuide_1);
          this.instance.show();
        }) : this.instance.show();
      }
      show() {
        let lbGuides = this.scrollPopupGuide.content.getComponentsInChildren(cc.Label);
        lbGuides[0].string = "TR\u01af\u1edaC KHI B\u1eaeT \u0110\u1ea6U V\xc1N CH\u01a0I:";
        lbGuides[1].string = "\u2022 M\u1ed7i ng\u01b0\u1eddi \u0111\u1eb7t m\u1ed9t s\u1ed1 ti\u1ec1n c\u01b0\u1ee3c nh\u1ea5t \u0111\u1ecbnh \u2013 b\u1eb1ng s\u1ed1 ti\u1ec1n c\u01b0\u1ee3c min trong b\xe0n ch\u01a1i.\n";
        lbGuides[2].string = "B\u1eaeT \u0110\u1ea6U V\xc1N CH\u01a0I:";
        lbGuides[3].string = "\u2022 M\u1ed7i ng\u01b0\u1eddi \u0111\u01b0\u1ee3c chia 3 l\xe1 b\xe0i. Ba l\xe1 n\xe0y tuy\u1ec7t \u0111\u1ed1i kh\xf4ng \u0111\u01b0\u1ee3c \u0111\u1ec3 \u0111\u1ed1i th\u1ee7 bi\u1ebft \u0111\u01b0\u1ee3c.\n";
        lbGuides[4].string = "\u0110\u1ebeN L\u01af\u1ee2T CH\u01a0I:";
        lbGuides[5].string = "Ng\u01b0\u1eddi ch\u01a1i c\xf3 quy\u1ec1n quy\u1ebft \u0111\u1ecbnh nh\u1eefng vi\u1ec7c sau:\n\u2022 T\u1ea5t Tay: Ng\u01b0\u1eddi ch\u01a1i \u0111\u1eb7t to\xe0n b\u1ed9 s\u1ed1 ti\u1ec1n m\xecnh c\xf3 n\u1ebfu c\u1ea3m th\u1ea5y b\xe0i m\xecnh c\xf3 c\u01a1 h\u1ed9i th\u1eafng tuy\u1ec7t \u0111\u1ed1i.\n\u2022 T\u1ed1: \u0110\u1eb7t th\xeam ti\u1ec1n c\u01b0\u1ee3c cao h\u01a1n v\u1edbi nh\u1eefng ng\u01b0\u1eddi c\u1eeda tr\xean \u0111\xe3 \u0111\u1eb7t.\n\u2022 Theo: \u0110\u1eb7t ti\u1ec1n c\u01b0\u1ee3c \u0111\xfang b\u1eb1ng s\u1ed1 ti\u1ec1n ng\u01b0\u1eddi \u1edf c\u1eeba tr\xean \u0111\xe3 \u0111\u1eb7t.\n\u2022 \xdap B\xe0i: B\u1ecf v\xe1n ch\u01a1i hi\u1ec7n t\u1ea1i v\xec b\xe0i qu\xe1 y\u1ebfu, s\u1ebd ch\u1ec9 m\u1ea5t s\u1ed1 ti\u1ec1n c\u01b0\u1ee3c ban \u0111\u1ea7u. V\xe0 k\u1ebft th\xfac v\xe1n b\xe0i t\u1ea1i \u0111\xe2y.\n";
        lbGuides[6].string = "C\xc1CH CH\u01a0I LI\xcaNG:";
        lbGuides[7].string = "\u2022 Ph\u1ea3i c\xf3 \xedt nh\u1ea5t t\u1eeb 2 ng\u01b0\u1eddi ch\u01a1i \u0111\u1ec3 tham gia ch\u01a1i Li\xeang v\xe0 nhi\u1ec1u nh\u1ea5t l\xe0 6 ng\u01b0\u1eddi ch\u01a1i. Tr\u01b0\u1edbc khi chia b\xe0i, t\u1ea5t c\u1ea3 ng\u01b0\u1eddi ch\u01a1i s\u1ebd b\u1ecf ra m\u1ed9t s\u1ed1 ti\u1ec1n b\u1eb1ng nhau (Ti\u1ec1n s\xe0n).\n\u2022 M\u1ed7i ng\u01b0\u1eddi ch\u01a1i s\u1ebd \u0111\u01b0\u1ee3c chia 3 l\xe1 v\xe0 ba l\xe1 b\xe0i n\xe0y \u0111\u1ed1i th\u1ee7 kh\xf4ng h\u1ec1 bi\u1ebft tr\u01b0\u1edbc.\n\u2022 Sau \u0111\xf3 ng\u01b0\u1eddi ch\u01a1i b\u1eaft \u0111\u1ea7u \u0111\u1eb7t c\u01b0\u1ee3c.\n\u2022 Sau khi m\u1ecdi ng\u01b0\u1eddi \u0111\u1eb7t ti\u1ec1n c\u01b0\u1ee3c, ng\u01b0\u1eddi n\xe0o c\xf3 b\u1ed9 b\xe0i mang gi\xe1 tr\u1ecb cao nh\u1ea5t s\u1ebd l\xe0 ng\u01b0\u1eddi th\u1eafng cu\u1ed9c.\n";
        lbGuides[8].string = "C\xc1C C\u1eb6P B\xc0I TRONG \u0110\xc1NH B\xc0I LI\xcaNG \u0110\u01af\u1ee2C T\xcdNH NH\u01af SAU:";
        lbGuides[9].string = "\u2022 S\xe1p: (5 C\u01a1, 5 R\xf4, 5 B\xedch)  Ba l\xe1 b\xe0i c\xf9ng s\u1ed1, v\xed d\u1ee5 nh\u01b0 s\xe1p 5. N\u1ebfu hai ng\u01b0\u1eddi c\xf9ng c\xf3 s\xe1p th\xec ng\u01b0\u1eddi n\xe0o c\xf3 s\xe1p cao h\u01a1n s\u1ebd th\u1eafng, \u0111i t\u1eeb 2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K, A.\n\u2022 Li\xeang: (3 C\u01a1, 4 R\xf4, 5 C\u01a1)  3 qu\xe2n li\xean ti\u1ebfp nhau kh\xf4ng c\u1ea7n c\xf9ng ch\u1ea5t (Ch\u1ea5p nh\u1eadn c\u1ea3 b\u1ed9 A, 2, 3 v\xe0 Q, K, A). N\u1ebfu c\xf9ng l\xe0 li\xeang c\u0169ng so s\xe1nh gi\xe1 tr\u1ecb qu\xe2n b\xe0i l\u1edbn nh\u1ea5t nh\u01b0 s\xe1p. (L\u01b0u \xfd b\u1ed9 A, 2, 3 l\xe0 b\u1ed9 nh\u1ecf nh\u1ea5t c\xf2n b\u1ed9 Q, K, A l\xe0 b\u1ed9 l\u1edbn nh\u1ea5t). Hai b\u1ed9 li\xeang c\xf9ng gi\xe1 tr\u1ecb th\xec so s\xe1nh l\xe1 b\xe0i c\xf3 ch\u1ea5t cao nh\u1ea5t (c\u01a1 r\xf4 t\xe9p b\xedch).\n\u2022 \u1ea2nh: L\xe0 ba l\xe1 b\xe0i h\xecnh ng\u01b0\u1eddi (J, Q, K). Khi hai \u0111\u1ed1i th\u1ee7 \u0111\u1ec1u c\xf3 \u1ea3nh th\xec b\u1eaft bu\u1ed9c so s\xe1nh \u0111\u1ebfn qu\xe2n b\xe0i ch\u1ea5t cao nh\u1ea5t (c\u01a1 r\xf4 t\xe9p b\xedch) c\u1ee7a b\xe0i. N\u1ebfu ch\u1ea5t b\u1eb1ng nhau th\xec so s\xe1nh \u0111\u1ebfn qu\xe2n b\xe0i t\u1eeb th\u1ea5p l\xean cao.\n\u2022 \u0110i\u1ec3m: (3 C\u01a1, 4 R\xf4, 7 C\u01a1)  Khi b\xe0i c\u1ee7a b\u1ea1n kh\xf4ng c\xf3 S\xe1p, Li\xeang, \u1ea2nh th\xec b\u1eaft \u0111\u1ea7u t\xednh \u0111i\u1ec3m.\n\u2022 B\u1ea1n l\u1ea5y \u0111i\u1ec3m c\u1ee7a ba qu\xe2n b\xe0i \u0111\u01b0\u1ee3c ph\xe1t c\u1ed9ng l\u1ea1i, r\u1ed3i l\u1ea5y ph\u1ea7n d\u01b0 khi chia cho 10 s\u1ebd ra \u0111i\u1ec3m c\u1ee7a b\u1ea1n.\n\u2022 Trong \u0111\xe1nh b\xe0i li\xeang \u0111i\u1ec3m s\u1eafp x\u1ebfp t\u1eeb cao xu\u1ed1ng th\u1ea5p 9, 8, 7, 6, 5, 4, 3, 2, 1, 0.\n";
        lbGuides[10].string = "\u0110I\u1ec2M C\u1ee6A C\xc1C QU\xc2N B\xc0I \u0110\u01af\u1ee2C T\xcdNH NH\u01af SAU:";
        lbGuides[11].string = "\u2022 C\xe1c qu\xe2n 2, 3, 4, 5, 6, 7, 8, 9 \u0111\u01b0\u1ee3c t\xednh v\u1edbi s\u1ed1 \u0111i\u1ec3m t\u01b0\u01a1ng \u1ee9ng v\u1edbi s\u1ed1 tr\xean l\xe1 b\xe0i.\n\u2022 Qu\xe2n A \u0111\u01b0\u1ee3c t\xednh 1 \u0111i\u1ec3m. C\xe1c qu\xe2n 10, J, Q, K \u0111\u1ec1u \u0111\u01b0\u1ee3c t\xednh 0 \u0111i\u1ec3m.\n\u2022 Khi hai \u0111\u1ed1i th\u1ee7 b\u1eb1ng \u0111i\u1ec3m th\xec so s\xe1nh qu\xe2n b\xe0i c\xf3 ch\u1ea5t cao nh\u1ea5t (C\u01a1,R\xf4,T\xe9p,B\xedch).`\n";
        super.show();
        this.scrollPopupGuide.scrollToTop(0);
      }
    };
    LiengPopupGuide.instance = null;
    __decorate([ property(cc.ScrollView) ], LiengPopupGuide.prototype, "scrollPopupGuide", void 0);
    LiengPopupGuide = LiengPopupGuide_1 = __decorate([ ccclass ], LiengPopupGuide);
    exports.default = LiengPopupGuide;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/App": void 0,
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/common/Dialog": void 0
  } ]
}, {}, [ "Lieng.CardUtil", "Lieng.Cmd", "Lieng.Constant", "Lieng.Controller", "Lieng.ItemRoom", "Lieng.NetworkClient", "Lieng.Player", "Lieng.PopupGuide" ]);