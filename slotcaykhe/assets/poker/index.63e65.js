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
  "Poker.CardUtil": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9e845jpkItM3qUvol2ZR5Tu", "Poker.CardUtil");
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
  "Poker.Cmd": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a2f0cU5NKtF15h1g6X6i4BJ", "Poker.Cmd");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.cmd = void 0;
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    const Network_InPacket_1 = require("../../Main/Game/src/networks/Network.InPacket");
    const Network_OutPacket_1 = require("../../Main/Game/src/networks/Network.OutPacket");
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
        constructor(fold, check, follow, allIn, riseBet) {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.TAKE_TURN);
          this.packHeader();
          this.putByte(1 == fold);
          this.putByte(1 == check);
          this.putByte(1 == allIn);
          this.putByte(1 == follow);
          this.putByte(false);
          this.putLong(riseBet);
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
      class SendCardsDefine extends Network_OutPacket_1.default {
        constructor() {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.CARDS_DEFINE);
          this.packHeader();
          this.updateSize();
        }
      }
      cmd.SendCardsDefine = SendCardsDefine;
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
          this.gameId = this.getInt();
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
      class ReceivedChiaBai extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          var a = 0;
          this.cardSize = this.getShort();
          this.cards = [];
          for (a = 0; a < this.cardSize; a++) this.cards.push(this.getByte());
          this.gameId = this.getInt();
          this.timeChiaBai = this.getByte();
        }
      }
      cmd.ReceivedChiaBai = ReceivedChiaBai;
      class ReceivedUserLeaveRoom extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.chair = this.getByte();
          this.nickName = this.getString();
          this.message = this.getString();
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
          for (a = 0; a < this.booleanWinerSize; a++) this.booleanWinerList.push(this.getInt());
          this.moneyArraySize = this.getShort();
          this.currentMoney = [];
          for (a = 0; a < this.moneyArraySize; a++) this.currentMoney.push(this.getLong());
          this.gameMoney = [];
          this.gameMoneySize = this.getShort();
          for (a = 0; a < this.gameMoneySize; a++) this.gameMoney.push(this.getLong());
          this.publicCardSize = this.getShort();
          this.publicCards = [];
          for (a = 0; a < this.publicCardSize; a++) this.publicCards.push(this.getByte());
          this.hasInfoSize = this.getShort();
          this.hasInfoList = [];
          for (a = 0; a < this.hasInfoSize; a++) this.hasInfoList.push(this.getByte());
          this.privateCardList = [];
          this.maxCardList = [];
          this.cardNameList = [];
          for (a = 0; a < Code.MAX_PLAYER; a++) {
            var b = 0, c = [], d = [];
            if (this.hasInfoList[a]) {
              for (var b = this.getShort(), e = 0; e < b; e++) d.push(this.getByte());
              for (var b = this.getByte(), f = this.getShort(), e = 0; e < f; e++) c.push(this.getByte());
            } else b = 0, c = [];
            this.maxCardList.push(c);
            this.privateCardList.push(d);
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
          this.chair = this.getByte();
          this.myCardSize = this.getShort();
          this.myCards = [];
          for (var a = 0; a < this.myCardSize; a++) this.myCards.push(this.getByte());
          this.publicCardSize = this.getShort();
          this.publicCards = [];
          for (a = 0; a < this.publicCardSize; a++) this.publicCards.push(this.getByte());
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
          this.gameId = this.getInt();
          this.roomId = this.getInt();
          this.hasInfoSize = this.getShort();
          this.hasInfoList = [];
          for (a = 0; a < this.hasInfoSize; a++) this.hasInfoList.push(this.getByte());
          this.playerInfoList = [];
          for (a = 0; a < Code.MAX_PLAYER; a++) {
            if (this.hasInfoList[a]) {
              var b = [];
              b["hasFold"] = this.getByte();
              b["hasAllIn"] = this.getByte();
              b["currentBet"] = this.getLong();
              b["currentMoney"] = this.getLong();
              b["status"] = this.getByte();
              b["avatarUrl"] = this.getString();
              b["nickName"] = this.getString();
            } else b = [], b["hasFold"] = 0, b["hasAllIn"] = 0, b["currentBet"] = 0, b["currentMoney"] = 0, 
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
          this.playerStatusList.push(b), cc.log("i: " + a + " " + b)) : this.playerStatusList.push(0);
          this.gameId = this.getInt();
          this.isCheat = this.getByte();
          this.currentMoneySize = this.getShort();
          this.currentMoneyList = [];
          for (a = 0; a < this.currentMoneySize; a++) this.currentMoneyList.push(this.getLong());
          this.size = this.getShort();
          this.listBetBigBlind = [];
          b = "";
          for (a = 0; a < this.size; a++) this.listBetBigBlind.push(this.getByte()), b += " " + this.listBetBigBlind[a];
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
          this.potMoney = this.getLong();
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
      class ReceivedCardsDefine extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.strData = this.getString();
        }
      }
      cmd.ReceivedCardsDefine = ReceivedCardsDefine;
    })(cmd = exports.cmd || (exports.cmd = {}));
    exports.default = cmd;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/networks/Network.InPacket": void 0,
    "../../Main/Game/src/networks/Network.OutPacket": void 0
  } ],
  "Poker.Constant": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "19490eQf6BKCbcG5djYwb9C", "Poker.Constant");
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
  "Poker.Controller": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d1a0egueZlH3apN/Hny5usz", "Poker.Controller");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var PokerController_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const App_1 = require("../../Main/Game/src/common/App");
    const BroadcastReceiver_1 = require("../../Main/Game/src/common/BroadcastReceiver");
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const CustomUI_SliderBet_1 = require("../../Main/Game/src/customui/CustomUI.SliderBet");
    const CardGame_Cmd_1 = require("../../Main/Game/src/networks/CardGame.Cmd");
    const MiniGameNetworkClient_1 = require("../../Main/Game/src/networks/MiniGameNetworkClient");
    const Network_InPacket_1 = require("../../Main/Game/src/networks/Network.InPacket");
    const Poker_CardUtil_1 = require("./Poker.CardUtil");
    const Poker_Cmd_1 = require("./Poker.Cmd");
    const Poker_NetworkClient_1 = require("./Poker.NetworkClient");
    const Poker_Player_1 = require("./Poker.Player");
    const Network_Cmd_1 = require("../../Main/Game/src/networks/Network.Cmd");
    const PopupCardDefinations_1 = require("../../Main/Game/src/games/cardgames/PopupCardDefinations");
    const PopupChatInGame_1 = require("../../Main/Game/src/games/cardgames/PopupChatInGame");
    const Poker_Constant_1 = require("./Poker.Constant");
    const Poker_PopupGuide_1 = require("./Poker.PopupGuide");
    var configPlayer = [];
    let defaultPlayerPos = [ [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ], [ 1, 2, 3, 4, 5, 6, 7, 8, 0 ], [ 2, 3, 4, 5, 6, 7, 8, 0, 1 ], [ 3, 4, 5, 6, 7, 8, 0, 1, 2 ], [ 4, 5, 6, 7, 8, 0, 1, 2, 3 ], [ 5, 6, 7, 8, 0, 1, 2, 3, 4 ], [ 6, 7, 8, 0, 1, 2, 3, 4, 5 ], [ 7, 8, 0, 1, 2, 3, 4, 5, 6 ], [ 8, 0, 1, 2, 3, 4, 5, 6, 7 ] ];
    const {ccclass: ccclass, property: property} = cc._decorator;
    let PokerController = PokerController_1 = class PokerController extends cc.Component {
      constructor() {
        super(...arguments);
        this.UI_ChooseRoom = null;
        this.labelNickName = null;
        this.labelCoin = null;
        this.avatar = null;
        this.contentListRooms = null;
        this.prefabItemRoom = null;
        this.scrollListRoom = null;
        this.edtFindRoom = null;
        this.btnHideRoomFull = null;
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
        this.btnLeaveRoom = null;
        this.hubChips = null;
        this.labelRoomId = null;
        this.labelRoomBet = null;
        this.actionBetting = null;
        this.FxDealer = null;
        this.btnBuyCashIn = null;
        this.btnActions = null;
        this.popupBuyIn = null;
        this.labelBuyInMin = null;
        this.labelBuyInMax = null;
        this.edtBuyIn = null;
        this.sliderBuyin = null;
        this.toggleAutoBuyIn = null;
        this.notifyTimeStart = null;
        this.notifyTimeEnd = null;
        this.notifyTimeBet = null;
        this.popupNodity = null;
        this.labelNotifyContent = null;
        this.lsSfChip = [];
        this.prefabItemChip = null;
        this.sliderBet = null;
        this.btnShowCardsDefine = null;
        this.seatOwner = null;
        this.currentRoomBet = null;
        this.seconds = null;
        this.timeAutoStart = null;
        this.timeEnd = null;
        this.timeBet = null;
        this.timeThinking = null;
        this.intervalWaitting = null;
        this.intervalEnd = null;
        this.intervalBetting = null;
        this.intervalThinking = null;
        this.currentCard = null;
        this.currentCenterCard = null;
        this.numCardOpened = 0;
        this.currentMatchPotValue = 0;
        this.timeoutEndGame = null;
        this.timeoutChiaBaiDone = null;
        this.minCashIn = null;
        this.maxCashIn = null;
        this.currentMaxBet = 0;
        this.currentRaiseValue = 0;
        this.currentRaiseStep = 0;
        this.currentMeBet = 0;
        this.currentPrivateCardList = [];
        this.roomMinBuyIn = 0;
        this.roomMaxBuyIn = 0;
        this.isClickBack = false;
        this.cardsDefine = null;
        this.chipPool = new cc.NodePool("chip_temple");
        this.foldedNum = 0;
      }
      onLoad() {
        PokerController_1.instance = this;
        this.initConfigPlayer();
      }
      start() {
        this.showUIRooms();
        this.seatOwner = -1;
        this.isClickBack = false;
        App_1.default.instance.showErrLoading("\u0110ang k\u1ebft n\u1ed1i t\u1edbi server...");
        Poker_NetworkClient_1.default.getInstance().addOnOpen(() => {
          App_1.default.instance.showErrLoading("\u0110ang \u0111ang \u0111\u0103ng nh\u1eadp...");
          Poker_NetworkClient_1.default.getInstance().send(new Network_Cmd_1.default.SendLogin(Configs_1.default.Login.Nickname, Configs_1.default.Login.AccessToken));
        }, this);
        Poker_NetworkClient_1.default.getInstance().addOnClose(() => {
          this.isClickBack || !Configs_1.default.Login.IsLogin ? this.backToLobby() : App_1.default.instance.alertDialog.showMsgWithOnDismissed("B\u1ea1n \u0111\xe3 m\u1ea5t k\u1ebft n\u1ed1i v\u1edbi server", () => {
            this.backToLobby();
          });
        }, this);
        Poker_NetworkClient_1.default.getInstance().connect();
        BroadcastReceiver_1.default.register(BroadcastReceiver_1.default.USER_DISCONNECTED, data => {
          Poker_NetworkClient_1.default.getInstance().close();
        }, this);
        BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.SET_SOUND, cc.find("Canvas"));
      }
      resetGame() {
        this.closePopupBuyIn();
        this.unschedule(this.timeoutEndGame);
        this.unschedule(this.timeoutChiaBaiDone);
        this.unschedule(this.intervalWaitting);
        this.unschedule(this.intervalEnd);
        this.unschedule(this.intervalBetting);
        this.unschedule(this.intervalThinking);
      }
      getChip() {
        if (this.chipPool.size() > 0) return this.chipPool.get();
        return cc.instantiate(this.prefabItemChip);
      }
      removeChip(chip) {
        this.chipPool.put(chip);
      }
      setMatchPot(player, value, isSetString, isCal = true) {
        if (isSetString) {
          cc.isValid(this.currentMatchPotValue) && (this.labelMatchPot.string = Utils_1.default.formatNumber(this.currentMatchPotValue));
          return;
        }
        if (null == player) {
          let iconsLayou = this.matchPot.getChildByName("Icon");
          if (0 == this.currentMatchPotValue) {
            while (iconsLayou.childrenCount > 0) this.removeChip(iconsLayou.children[0]);
            return;
          }
          let count = Math.floor(value / this.currentRoomBet);
          for (let i = 0; i < count; i++) {
            let chip = this.getChip();
            chip.x = 0;
            chip.getComponent(cc.Sprite).spriteFrame = this.lsSfChip[0];
            chip["type"] = 1;
            chip.parent = iconsLayou;
            chip.active = true;
            if (i >= count - 1) {
              this.calculatorPot(iconsLayou, 1);
              cc.isValid(this.currentMatchPotValue) && (this.labelMatchPot.string = Utils_1.default.formatNumber(this.currentMatchPotValue));
            }
          }
          return;
        }
        if (0 == value) return;
        let iconsLayou = this.matchPot.getChildByName("Icon");
        let nodeTemp = new cc.Node();
        let count = Math.floor(value / this.currentRoomBet);
        let posPlayer = this.UI_Playing.convertToNodeSpaceAR(player.node.parent.convertToWorldSpaceAR(player.node.position));
        for (let i = 0; i < count; i++) {
          let chip = this.getChip();
          chip.getComponent(cc.Sprite).spriteFrame = this.lsSfChip[0];
          chip["type"] = 1;
          chip.parent = nodeTemp;
          chip.active = false;
          chip.x = 0;
        }
        this.calculatorPot(nodeTemp, 1);
        let lsChip = [];
        for (let i = 0; i < nodeTemp.childrenCount; i++) {
          let chip = nodeTemp.children[i];
          lsChip.push(chip);
        }
        nodeTemp.destroy();
        for (let i = 0; i < lsChip.length; i++) {
          let chip = lsChip[i];
          chip.parent = this.UI_Playing;
          chip.active = true;
          chip.position = posPlayer;
          chip.x = 0;
          i >= nodeTemp.childrenCount - 1 ? cc.tween(chip).to(.5, {
            position: this.matchPot.position
          }).call(() => {
            chip.parent = iconsLayou;
            isCal && this.calculatorPot(iconsLayou, 1);
            cc.isValid(this.currentMatchPotValue) && (this.labelMatchPot.string = Utils_1.default.formatNumber(this.currentMatchPotValue));
          }).start() : cc.tween(chip).to(.5, {
            position: this.matchPot.position
          }).call(() => {
            chip.parent = iconsLayou;
          }).start();
        }
      }
      calculatorPot(tfParent, typeChip) {
        if (typeChip > this.lsSfChip.length) return;
        tfParent.children.sort((x, y) => y["type"] - x["type"]);
        for (let i = 0; i < tfParent.childrenCount; i++) tfParent.children[i].zIndex = i;
        let lsTemp = [];
        for (let i = 0; i < tfParent.childrenCount; i++) {
          tfParent.children[i]["type"] == typeChip && lsTemp.push(tfParent.children[i]);
          if (10 == lsTemp.length) {
            while (lsTemp.length > 1) {
              this.removeChip(lsTemp[0]);
              lsTemp.shift();
            }
            lsTemp[0].getComponent(cc.Sprite).spriteFrame = this.lsSfChip[typeChip];
            lsTemp[0]["type"] = typeChip + 1;
            lsTemp = [];
            i = 0;
          }
        }
        this.calculatorPot(tfParent, typeChip + 1);
      }
      onDestroy() {
        this.resetGame();
      }
      onDisable() {
        this.resetGame();
      }
      joinRoom(info) {
        App_1.default.instance.showLoading(true);
        Poker_NetworkClient_1.default.getInstance().send(new CardGame_Cmd_1.default.SendJoinRoom(Configs_1.default.App.MONEY_TYPE, info.maxUserPerRoom, info.moneyBet, 0));
      }
      refeshListRoom() {
        this.contentListRooms.removeAllChildren(true);
        Poker_NetworkClient_1.default.getInstance().send(new CardGame_Cmd_1.default.SendMoneyBetConfig());
      }
      findRoomId() {
        let text = this.edtFindRoom.string.trim();
        if (text.length > 0) {
          let idFind = parseInt(text);
          for (let index = 0; index < this.contentListRooms.childrenCount; index++) {
            let roomItem = this.contentListRooms.children[index].getComponent("ItemRoom");
            roomItem.roomInfo["id"] != idFind && (this.contentListRooms.children[index].active = false);
          }
        } else for (let index = 0; index < this.contentListRooms.childrenCount; index++) this.contentListRooms.children[index].active = true;
      }
      hideRoomFull() {
        if (this.btnHideRoomFull.isChecked) for (let index = 0; index < this.contentListRooms.childrenCount; index++) {
          let roomItem = this.contentListRooms.children[index].getComponent("ItemRoom");
          roomItem.roomInfo["userCount"] == roomItem.roomInfo["maxUserPerRoom"] && (this.contentListRooms.children[index].active = false);
        } else for (let index = 0; index < this.contentListRooms.childrenCount; index++) this.contentListRooms.children[index].active = true;
      }
      showUIRooms() {
        this.UI_ChooseRoom.active = true;
        if (this.isInitedUIRoom) {
          BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN);
          return;
        }
        this.isInitedUIRoom = true;
        this.labelCoin.string = Utils_1.default.formatNumber(Configs_1.default.Login.Coin);
        this.labelNickName.string = Configs_1.default.Login.Nickname;
        this.avatar.spriteFrame = App_1.default.instance.getAvatarSpriteFrame(Configs_1.default.Login.Avatar);
        BroadcastReceiver_1.default.register(BroadcastReceiver_1.default.USER_UPDATE_COIN, () => {
          this.labelCoin.string = Utils_1.default.formatNumber(Configs_1.default.Login.Coin);
        }, this);
        BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN);
        this.setupListener();
      }
      closeUIRoom() {
        this.UI_ChooseRoom.active = false;
      }
      createRoom() {}
      playingNow() {
        let arrSelect = [];
        for (let index = 0; index < this.contentListRooms.childrenCount; index++) {
          let roomItem = this.contentListRooms.children[index].getComponent("ItemRoom");
          roomItem.roomInfo["userCount"] < roomItem.roomInfo["maxUserPerRoom"] && roomItem.roomInfo["requiredMoney"] <= Configs_1.default.Login.Coin && arrSelect.push(roomItem.roomInfo);
        }
        if (arrSelect.length > 0) {
          var roomIfo = arrSelect.find(c => c["userCount"] > 0);
          if (cc.isValid(roomIfo)) this.joinRoom(roomIfo); else {
            arrSelect = arrSelect.sort(() => Math.random() - .5);
            this.joinRoom(arrSelect[0]);
          }
        } else App_1.default.instance.actiontDialog.showMsgWithAction("S\u1ed1 d\u01b0 kh\xf4ng \u0111\u1ee7.", "N\u1ea0P NGAY", () => {
          App_1.default.instance.openShop(0);
        });
      }
      showUIChat() {
        PopupChatInGame_1.default.createAndShow(this.UI_Playing, this.cardsDefine, (chatType, content) => {
          Poker_NetworkClient_1.default.getInstance().send(new Poker_Cmd_1.default.SendChatRoom(chatType, content));
        }, (cheatType, cardCheatIds) => {
          Poker_NetworkClient_1.default.getInstance().send(new Poker_Cmd_1.default.SendCheatCards(cheatType, cardCheatIds));
        });
      }
      actBack() {
        this.isClickBack = true;
        Poker_NetworkClient_1.default.getInstance().close();
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
      setupMatch(data) {
        this.showUIPlaying();
        let myChair = data["myChair"];
        let moneyBet = data["moneyBet"];
        let roomOwner = data["roomOwner"];
        let roomId = data["roomId"];
        let gameId = data["gameId"];
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
        this.labelRoomId.string = "POKER - PH\xd2NG: " + roomId;
        this.labelRoomBet.string = "M\u1ee8C C\u01af\u1ee2C: " + Utils_1.default.formatNumber(moneyBet) + "$";
        this.currentRoomBet = moneyBet;
        this.resetCenterCards();
        configPlayer[0].playerId = Configs_1.default.Login.Nickname;
        configPlayer[0].playerPos = myChair;
        var numPlayers = 0;
        var arrPlayerPosExist = [];
        var arrPlayerInfo = [];
        var arrPlayerStatus = [];
        for (let index = 0; index < Poker_Cmd_1.default.Code.MAX_PLAYER; index++) if ("" !== playerInfos[index].nickName) {
          numPlayers += 1;
          arrPlayerPosExist.push(index);
          arrPlayerInfo.push(playerInfos[index]);
          arrPlayerStatus.push(playerStatus[index]);
        }
        this.resetHubChips();
        for (let a = 0; a < configPlayer.length; a++) configPlayer[a].playerPos = defaultPlayerPos[myChair][a];
        for (let index = 0; index < configPlayer.length; index++) {
          let findPos = arrPlayerPosExist.indexOf(configPlayer[index].playerPos);
          let seatId = configPlayer[index].seatId;
          this.getPlayerHouse(seatId).resetPlayerInfo();
          if (findPos > -1) {
            this.setupSeatPlayer(seatId, arrPlayerInfo[findPos]);
            0 == seatId && this.showPopupBuyIn(minBuyInTiLe, maxBuyInTiLe, moneyBet);
            if (arrPlayerStatus[findPos] == Poker_Cmd_1.default.Code.PLAYER_STATUS_SITTING || arrPlayerStatus[findPos] == Poker_Cmd_1.default.Code.PLAYER_STATUS_PLAYING) {
              configPlayer[index].isViewer = false;
              this.getPlayerHouse(seatId).setIsViewer(false);
            } else {
              configPlayer[index].isViewer = true;
              this.getPlayerHouse(seatId).setIsViewer(true);
              -1 != configPlayer[seatId].playerId && this.getPlayerHouse(seatId).playFxViewer();
            }
          } else {
            this.getPlayerHouse(seatId).showBtnInvite(true);
            configPlayer[index].isViewer = true;
          }
        }
        for (let index = 0; index < Poker_Cmd_1.default.Code.MAX_PLAYER; index++) this.getPlayerHouse(index).setOwner(false);
        let seatOwner = this.findPlayerSeatByPos(roomOwner);
        if (-1 !== seatOwner) {
          this.getPlayerHouse(seatOwner).setOwner(true);
          this.seatOwner = seatOwner;
        }
      }
      startThinkingCountDown(seatId, turnTime) {
        this.timeThinking = turnTime;
        this.unschedule(this.intervalThinking);
        this.schedule(this.intervalThinking = () => {
          this.timeThinking--;
          var rate = (this.timeThinking / turnTime).toFixed(2);
          this.getPlayerHouse(seatId).processThinking(rate);
          if (this.timeThinking < 1) {
            this.unschedule(this.intervalThinking);
            this.getPlayerHouse(seatId).hidePlayCountdown();
          }
        }, 1);
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
      startBettingCountDown(turnTime) {
        cc.log("Poker startBettingCountDown turnTime : ", turnTime);
        this.timeBet = turnTime;
        this.actionBetting.active = true;
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
          this.btnOpenCard.active = true;
          this.btnBet.active = false;
          let score = 0;
          for (let a = 0; a < 3; a++) score += Poker_CardUtil_1.default.getDiemById(this.currentCard[a]);
          score > 10 ? this.getPlayerHouse(0).showCardName(score % 10 + " \u0110i\u1ec3m") : this.getPlayerHouse(0).showCardName(score + " \u0110i\u1ec3m");
          this.scheduleOnce(() => {
            if (null == this.node || "undefined" == typeof this.node) return;
            this.getPlayerHouse(0).resetCardReady();
          }, .2);
        }
      }
      moveChipsToHubNow(index) {
        this.hubChips.children[2 * index].position = cc.v3(25, 80);
        this.hubChips.children[2 * index].scale = 0;
        this.hubChips.children[2 * index + 1].position = cc.v3(25, 80);
        this.hubChips.children[2 * index + 1].scale = 0;
      }
      fxMoveChips(chips, delay, toX, toY) {
        chips.runAction(cc.sequence(cc.delayTime(delay), cc.scaleTo(0, 1, 1), cc.spawn(cc.moveTo(.8, toX, toY), cc.scaleTo(.8, 0, 0))));
      }
      resetHubChips() {
        var arrFromX = [ 70, 280, 280, 260, 100, -260, -375, -360 ];
        var arrFromY = [ -195, -150, -55, 70, 90, 85, -30, -155 ];
        for (let index = 0; index < Poker_Cmd_1.default.Code.MAX_PLAYER; index++) {
          this.hubChips.children[2 * index].position = cc.v3(arrFromX[index], arrFromY[index]);
          this.hubChips.children[2 * index + 1].position = cc.v3(arrFromX[index], arrFromY[index]);
        }
        for (let index = 0; index < 16; index++) this.hubChips.children[index].active = false;
      }
      setupBet() {
        return;
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
        this.edtBuyIn.string = "";
        this.toggleAutoBuyIn.isChecked = true;
        this.sliderBuyin.initValue(bet * min, bet, bet * max);
      }
      closePopupBuyIn() {
        this.popupBuyIn.active = false;
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
        this.toggleAutoBuyIn.isChecked ? Poker_NetworkClient_1.default.getInstance().send(new Poker_Cmd_1.default.SendBuyIn(bet, 1)) : Poker_NetworkClient_1.default.getInstance().send(new Poker_Cmd_1.default.SendBuyIn(bet, 0));
        App_1.default.instance.showLoading(true);
        this.closePopupBuyIn();
      }
      textChange(event) {
        if (event.length > 0) {
          var rawNumber = "";
          for (let index = 0; index < event.length; index++) "0" != event[index] && "1" != event[index] && "2" != event[index] && "3" != event[index] && "4" != event[index] && "5" != event[index] && "6" != event[index] && "7" != event[index] && "8" != event[index] && "9" != event[index] || (rawNumber += event[index]);
          cc.log("Poker onTextChange rawNumber : ", rawNumber);
          this.edtBuyIn.string = "" !== rawNumber ? Utils_1.default.formatNumber(parseInt(rawNumber)) : "";
        }
      }
      showAllCenterCards(centerCards) {
        this.currentCenterCard = centerCards;
        for (let index = 0; index < centerCards.length; index++) {
          let spriteCardId = centerCards[index];
          this.cardsCenter.children[index].getComponent(cc.Sprite).spriteFrame = this.spriteCards[spriteCardId];
        }
        this.scheduleOnce(() => {
          if (null == this.node || "undefined" == typeof this.node) return;
          this.cardsCenter.children[0].runAction(cc.spawn(cc.moveTo(.1, -170, -45), cc.scaleTo(.1, 1, 1)));
          this.cardsCenter.children[1].runAction(cc.sequence(cc.spawn(cc.moveTo(.1, -17, -45), cc.scaleTo(.1, 1, 1)), cc.delayTime(.1), cc.moveTo(.2, -85, -45)));
          this.cardsCenter.children[2].runAction(cc.sequence(cc.spawn(cc.moveTo(.1, -170, -45), cc.scaleTo(.1, 1, 1)), cc.delayTime(.1), cc.moveTo(.2, 0, -45)));
          this.cardsCenter.children[3].runAction(cc.sequence(cc.delayTime(1), cc.spawn(cc.moveTo(.1, 85, -45), cc.scaleTo(.1, 1, 1))));
          this.cardsCenter.children[4].runAction(cc.sequence(cc.delayTime(1.5), cc.spawn(cc.moveTo(.1, 170, -45), cc.scaleTo(.1, 1, 1))));
        }, .4);
      }
      showCenterCards1stRound(centerCards) {
        this.currentCenterCard = centerCards;
        for (let index = 0; index < centerCards.length; index++) {
          let spriteCardId = centerCards[index];
          this.cardsCenter.children[index].getComponent(cc.Sprite).spriteFrame = this.spriteCards[spriteCardId];
        }
        this.cardsCenter.children[0].runAction(cc.spawn(cc.moveTo(.1, -170, -45), cc.scaleTo(.1, 1, 1)));
        this.cardsCenter.children[1].runAction(cc.sequence(cc.spawn(cc.moveTo(.1, -17, -45), cc.scaleTo(.1, 1, 1)), cc.delayTime(.1), cc.moveTo(.2, -85, -45)));
        this.cardsCenter.children[2].runAction(cc.sequence(cc.spawn(cc.moveTo(.1, -170, -45), cc.scaleTo(.1, 1, 1)), cc.delayTime(.1), cc.moveTo(.2, 0, -45)));
      }
      showCenterCards2ndRound(centerCards) {
        this.currentCenterCard.push(centerCards[0]);
        let spriteCardId = centerCards[0];
        this.cardsCenter.children[3].getComponent(cc.Sprite).spriteFrame = this.spriteCards[spriteCardId];
        this.cardsCenter.children[3].runAction(cc.sequence(cc.delayTime(1), cc.spawn(cc.moveTo(.1, 85, -45), cc.scaleTo(.1, 1, 1))));
      }
      showCenterCards3rdRound(centerCards) {
        this.currentCenterCard.push(centerCards[0]);
        let spriteCardId = centerCards[0];
        this.cardsCenter.children[4].getComponent(cc.Sprite).spriteFrame = this.spriteCards[spriteCardId];
        this.cardsCenter.children[4].runAction(cc.sequence(cc.delayTime(1.5), cc.spawn(cc.moveTo(.1, 170, -45), cc.scaleTo(.1, 1, 1))));
      }
      setupListener() {
        MiniGameNetworkClient_1.default.getInstance().addListener(data => {
          let inpacket = new Network_InPacket_1.default(data);
          switch (inpacket.getCmdId()) {
           case Poker_Cmd_1.default.Code.GET_MONEY_USE:
            {
              let res = new Poker_Cmd_1.default.ResGetMoneyUse(data);
              cc.log("-=-=-=GET_MONEY_USE: ", res);
              Configs_1.default.Login.Coin = res.moneyUse;
              BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN);
              break;
            }
          }
        }, this);
        Poker_NetworkClient_1.default.getInstance().addListener(data => {
          let inpacket = new Network_InPacket_1.default(data);
          switch (inpacket.getCmdId()) {
           case Poker_Cmd_1.default.Code.JOIN_ROOM_SUCCESS:
            {
              App_1.default.instance.showLoading(false);
              let res = new Poker_Cmd_1.default.ReceivedJoinRoomSucceed(data);
              cc.log("JOIN_ROOM_SUCCESS ", res);
              this.closeUIRoom();
              this.setupMatch(res);
              this.getCardsDefine();
            }
            break;

           case Poker_Cmd_1.default.Code.THONG_TIN_BAN_CHOI:
            {
              cc.log("Poker THONG_TIN_BAN_CHOI");
              App_1.default.instance.showLoading(false);
              let res = new Poker_Cmd_1.default.ReceivedGameInfo(data);
              cc.log("Poker THONG_TIN_BAN_CHOI res : ", JSON.stringify(res));
              let chair = res["chair"];
              let myCardSize = res["myCardSize"];
              let myCards = res["myCards"];
              let publicCardSize = res["publicCardSize"];
              let publicCards = res["publicCards"];
              let dealerChair = res["dealerChair"];
              let smallBlindChair = res["smallBlindChair"];
              let bigBlindChair = res["bigBlindChair"];
              let potAmount = res["potAmount"];
              let maxBet = res["maxBet"];
              let raiseStep = res["raiseStep"];
              let roundId = res["roundId"];
              let gameServerState = res["gameServerState"];
              let gameAction = res["gameAction"];
              let countDownTime = res["countDownTime"];
              let currentActiveChair = res["currentActiveChair"];
              let bet = res["bet"];
              let gameId = res["gameId"];
              let roomId = res["roomId"];
              let hasInfoSize = res["hasInfoSize"];
              let hasInfoList = res["hasInfoList"];
              let playerInfoList = res["playerInfoList"];
              this.closeUIRoom();
              this.showUIPlaying();
              this.labelRoomId.string = "POKER - PH\xd2NG: " + roomId;
              this.labelRoomBet.string = "M\u1ee8C C\u01af\u1ee2C: " + Utils_1.default.formatNumber(bet) + "/" + Utils_1.default.formatNumber(2 * bet) + "$";
              this.currentRoomBet = bet;
              this.currentCard = myCards;
              this.matchPot.active = true;
              cc.isValid(potAmount) ? this.currentMatchPotValue = potAmount : this.currentMatchPotValue = 0;
              this.setMatchPot(null, this.currentMatchPotValue, false);
              null != maxBet && (this.currentMaxBet = parseInt(maxBet + ""));
              null != raiseStep && (this.currentRaiseStep = parseInt(raiseStep + ""));
              this.currentRaiseValue = this.currentMaxBet + this.currentRaiseStep;
              configPlayer[0].playerId = Configs_1.default.Login.Nickname;
              configPlayer[0].playerPos = chair;
              var numPlayers = 0;
              var arrPlayerPosExist = [];
              for (let index = 0; index < Poker_Cmd_1.default.Code.MAX_PLAYER; index++) if (hasInfoList[index]) {
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
                  if (playerInfoList[index].currentBet > 0) {
                    this.getPlayerHouse(seatId).setBet(playerInfoList[index].currentBet);
                    this.getPlayerHouse(seatId).addChips();
                  }
                  playerInfoList[index].fold && this.getPlayerHouse(seatId).showActionState("\xdaP");
                  playerInfoList[index].hasAllIn && this.getPlayerHouse(seatId).showActionState("ALL-IN");
                } else {
                  this.getPlayerHouse(seatId).showBtnInvite(true);
                  configPlayer[index].isViewer = true;
                }
              }
              for (let index = 0; index < Poker_Cmd_1.default.Code.MAX_PLAYER; index++) {
                this.getPlayerHouse(index).setDealer(false);
                this.getPlayerHouse(index).setSmallBind(false);
                this.getPlayerHouse(index).setBigBind(false);
              }
              let dealerSeatId = this.findPlayerSeatByPos(dealerChair);
              -1 != dealerSeatId && this.getPlayerHouse(dealerChair).setDealer(true);
              let sbSeatId = this.findPlayerSeatByPos(smallBlindChair);
              -1 != sbSeatId && this.getPlayerHouse(sbSeatId).setSmallBind(true);
              let bbSeatId = this.findPlayerSeatByPos(bigBlindChair);
              -1 != bbSeatId && this.getPlayerHouse(bbSeatId).setBigBind(true);
              let activeSeatId = this.findPlayerSeatByPos(currentActiveChair);
              if (-1 != activeSeatId) {
                this.getPlayerHouse(activeSeatId).showPlayCountdown();
                this.startThinkingCountDown(activeSeatId, countDownTime);
              }
              if (myCardSize > 0) {
                this.getPlayerHouse(0).showCardReady(false);
                for (let a = 0; a < 2; a++) {
                  let spriteCardId = myCards[a];
                  this.getPlayerHouse(0).prepareToTransform();
                  this.getPlayerHouse(0).transformToCardReal(a, this.spriteCards[spriteCardId]);
                }
                if (publicCardSize > 0) if (3 == publicCardSize) this.showCenterCards1stRound(publicCards); else if (4 == publicCardSize) {
                  let round_1 = [ publicCards[0], publicCards[1], publicCards[2] ];
                  let round_2 = publicCards[3];
                  this.showCenterCards1stRound(round_1);
                  this.showCenterCards2ndRound(round_2);
                } else 5 == publicCardSize && this.showAllCenterCards(publicCards);
              }
              this.resetHubChips();
            }
            break;

           case Poker_Cmd_1.default.Code.DANG_KY_THOAT_PHONG:
            {
              cc.log("Poker DANG_KY_THOAT_PHONG");
              App_1.default.instance.showLoading(false);
              let res = new Poker_Cmd_1.default.ReceivedNotifyRegOutRoom(data);
              cc.log("Poker DANG_KY_THOAT_PHONG res : ", JSON.stringify(res));
              let outChair = res["outChair"];
              let isOutRoom = res["isOutRoom"];
              let seatId = this.findPlayerSeatByPos(outChair);
              -1 !== seatId && this.getPlayerHouse(seatId).showNotify(isOutRoom ? "S\u1eafp r\u1eddi b\xe0n !" : "H\u1ee7y r\u1eddi b\xe0n !");
            }
            break;

           case Poker_Cmd_1.default.Code.NEW_USER_JOIN:
            {
              cc.log("Poker NEW_USER_JOIN");
              App_1.default.instance.showLoading(false);
              let res = new Poker_Cmd_1.default.ReceivedUserJoinRoom(data);
              cc.log("Poker NEW_USER_JOIN res : ", JSON.stringify(res));
              let nickName = res["info"]["nickName"];
              let avatar = res["info"]["avatar"];
              let currentMoney = res["info"]["money"];
              let chair = res["uChair"];
              let status = res["uStatus"];
              for (let index = 0; index < configPlayer.length; index++) if (configPlayer[index].playerPos == chair) {
                var seat = configPlayer[index].seatId;
                this.getPlayerHouse(seat).resetPlayerInfo();
                var customPlayerInfo = {
                  avatar: avatar,
                  nickName: nickName,
                  currentMoney: currentMoney
                };
                this.setupSeatPlayer(seat, customPlayerInfo);
                if (status == Poker_Cmd_1.default.Code.PLAYER_STATUS_VIEWER) {
                  this.getPlayerHouse(seat).setIsViewer(true);
                  configPlayer[seat].isViewer = true;
                  this.getPlayerHouse(seat).playFxViewer();
                } else {
                  this.getPlayerHouse(seat).setIsViewer(false);
                  configPlayer[seat].isViewer = false;
                }
              }
            }
            break;

           case Poker_Cmd_1.default.Code.LEAVE_GAME:
            {
              cc.log("Poker LEAVE_GAME");
              App_1.default.instance.showLoading(false);
              let res = new Poker_Cmd_1.default.ReceivedUserLeaveRoom(data);
              cc.log("Poker LEAVE_GAME res : ", JSON.stringify(res));
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
                  this.resetCenterCards();
                  this.matchPot.active = false;
                }
                if (0 == seatId) {
                  this.UI_Playing.active = false;
                  this.UI_ChooseRoom.active = true;
                  MiniGameNetworkClient_1.default.getInstance().sendCheck(new Poker_Cmd_1.default.ReqGetMoneyUse());
                }
              }
              let msg = res["message"];
              cc.isValid(msg) && "" != msg && App_1.default.instance.alertDialog.showMsg(msg);
            }
            break;

           case Poker_Cmd_1.default.Code.GET_MONEY_USE:
            {
              let res = new Poker_Cmd_1.default.ResGetMoneyUse(data);
              cc.log("-=-GET_MONEY_USE   ", res);
              Configs_1.default.Login.Coin = res.moneyUse;
              BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN);
              break;
            }

           case Poker_Cmd_1.default.Code.TAKE_TURN:
            {
              cc.log("Poker TAKE_TURN");
              App_1.default.instance.showLoading(false);
              let res = new Poker_Cmd_1.default.ReceivedTakeTurn(data);
              cc.log("Poker TAKE_TURN res : ", JSON.stringify(res));
              let actionChair = res["actionChair"];
              let action = res["action"];
              let lastRaise = res["lastRaise"];
              let currentBet = res["currentBet"];
              let maxBet = res["maxBet"];
              let currentMoney = res["currentMoney"];
              let raiseStep = res["raiseStep"];
              let raiseBlock = res["raiseBlock"];
              this.currentMaxBet = maxBet;
              this.currentRaiseStep = raiseStep;
              let seatId = this.findPlayerSeatByPos(actionChair);
              let pl = null;
              if (-1 != seatId) {
                pl = this.getPlayerHouse(seatId);
                if (0 == seatId) {
                  this.currentMeBet = currentBet;
                  this.btnBet.active = false;
                }
                let actionName = "";
                switch (action) {
                 case Poker_Cmd_1.default.Code.GAME_ACTION_FOLD:
                  actionName = "FOLD";
                  this.foldedNum++;
                  pl.fxMeFold();
                  break;

                 case Poker_Cmd_1.default.Code.GAME_ACTION_CHECK:
                  actionName = "CHECK";
                  break;

                 case Poker_Cmd_1.default.Code.GAME_ACTION_CALL:
                  pl.setBet(lastRaise);
                  pl.addChips();
                  actionName = "CALL";
                  break;

                 case Poker_Cmd_1.default.Code.GAME_ACTION_RAISE:
                  actionName = "RAISE";
                  pl.setBet(lastRaise);
                  pl.addChips();
                  break;

                 case Poker_Cmd_1.default.Code.GAME_ACTION_ALL_IN:
                  actionName = "ALL-IN";
                  pl.setBet(lastRaise);
                  pl.addChips();
                }
                pl.setGold(currentMoney);
                pl.showActionState(actionName);
              }
            }
            break;

           case Poker_Cmd_1.default.Code.SELECT_DEALER:
            {
              cc.log("Poker SELECT_DEALER");
              App_1.default.instance.showLoading(false);
              let res = new Poker_Cmd_1.default.ReceivedSelectDealer(data);
              cc.log("Poker SELECT_DEALER res : ", JSON.stringify(res));
              let dealerChair = res["dealerChair"];
              let smallBlindChair = res["smallBlindChair"];
              let bigBlindChair = res["bigBlindChair"];
              let hasInfoSize = res["hasInfoSize"];
              let hasInfoList = res["hasInfoList"];
              let playerStatusList = res["playerStatusList"];
              let gameId = res["gameId"];
              let isCheat = res["isCheat"];
              let currentMoneySize = res["currentMoneySize"];
              let currentMoneyList = res["currentMoneyList"];
              let size = res["size"];
              let listBetBigBlind = res["listBetBigBlind"];
              for (let index = 0; index < Poker_Cmd_1.default.Code.MAX_PLAYER; index++) {
                this.getPlayerHouse(index).setDealer(false);
                this.getPlayerHouse(index).setSmallBind(false);
                this.getPlayerHouse(index).setBigBind(false);
                this.getPlayerHouse(index).resetHubChip();
              }
              let seatIdDealer = this.findPlayerSeatByPos(dealerChair);
              -1 != seatIdDealer && this.getPlayerHouse(seatIdDealer).setDealer(true);
              let seatIdSmallBind = this.findPlayerSeatByPos(smallBlindChair);
              if (-1 != seatIdSmallBind) {
                0 == seatIdSmallBind && (this.currentMeBet = this.currentRoomBet);
                let pl = this.getPlayerHouse(seatIdSmallBind);
                pl.setSmallBind(true);
                pl.setBet(this.currentRoomBet);
                pl.addChips();
              }
              let seatIdBigBind = this.findPlayerSeatByPos(bigBlindChair);
              if (-1 != seatIdBigBind) {
                0 == seatIdBigBind && (this.currentMeBet = 2 * this.currentRoomBet);
                let pl = this.getPlayerHouse(seatIdBigBind);
                pl.setBigBind(true);
                pl.setBet(2 * this.currentRoomBet);
                pl.addChips();
              }
              this.currentMatchPotValue = 0;
              this.matchPot.active = true;
              this.setMatchPot(null, 0, true);
              this.currentMaxBet = 2 * this.currentRoomBet;
              this.currentRaiseStep = 2 * this.currentRoomBet;
              this.currentRaiseValue = this.currentMaxBet + this.currentRaiseStep;
              for (let index = 0; index < playerStatusList.length; index++) {
                if (3 != playerStatusList[index]) continue;
                let seatId = this.findPlayerSeatByPos(index);
                if (-1 == seatId) continue;
                this.currentMatchPotValue += index == dealerChair ? 2 * this.currentRoomBet : this.currentRoomBet;
              }
              for (let index = 0; index < currentMoneyList.length; index++) {
                let seatId = this.findPlayerSeatByPos(index);
                if (-1 == seatId) continue;
                let pl = this.getPlayerHouse(seatId);
                currentMoneyList[index] > 0 && pl.setGold(currentMoneyList[index]);
                pl.status_save = playerStatusList[index];
                if (0 == currentMoneyList[index]) {
                  configPlayer[seatId].isViewer = true;
                  configPlayer[seatId]["isViewer"] = true;
                  pl.setIsViewer(true);
                  -1 != configPlayer[seatId].playerId && pl.playFxViewer();
                }
              }
            }
            break;

           case Poker_Cmd_1.default.Code.BUY_IN:
            {
              cc.log("Poker BUY_IN");
              App_1.default.instance.showLoading(false);
              let res = new Poker_Cmd_1.default.ReceivedBuyIn(data);
              cc.log("Poker BUY_IN res : ", JSON.stringify(res));
              let chair = res["chair"];
              let buyInMoney = res["buyInMoney"];
              let seatId = this.findPlayerSeatByPos(chair);
              if (-1 != seatId) {
                if (0 == seatId) {
                  this.closePopupBuyIn();
                  App_1.default.instance.showLoading(false);
                }
                this.getPlayerHouse(seatId).setGold(buyInMoney, false);
              }
            }
            break;

           case Poker_Cmd_1.default.Code.DEAL_PRIVATE_CARD:
            {
              cc.log("Poker DEAL_PRIVATE_CARD");
              App_1.default.instance.showLoading(false);
              let res = new Poker_Cmd_1.default.ReceivedDealCards(data);
              cc.log("Poker DEAL_PRIVATE_CARD res : ", JSON.stringify(res));
              let chair = res["chair"];
              let sizeCard = res["sizeCard"];
              let myCards = res["myCards"];
              let boBaiId = res["boBaiId"];
              this.btnBet.active = false;
              this.btnOpenCard.active = false;
              this.matchPot.active = true;
              this.currentCard = myCards;
              var arrSeatExist = this.getNumPlayers();
              let numPlayer = arrSeatExist.length;
              for (let index = 0; index < 2 * Poker_Cmd_1.default.Code.MAX_PLAYER; index++) {
                this.cardsDeal.children[index].active = false;
                this.cardsDeal.children[index].position = cc.v3(0, 0);
              }
              for (let a = 0; a < 2; a++) for (let b = 0; b < numPlayer; b++) {
                let seatId = arrSeatExist[b];
                if (-1 !== seatId) {
                  let pl = this.getPlayerHouse(seatId);
                  if (3 != pl.status_save) continue;
                  let card4Me = this.cardsDeal.children[a * numPlayer + b];
                  card4Me.active = true;
                  let rawPlayerPos = this.groupPlayers.children[seatId].position;
                  card4Me.runAction(cc.sequence(cc.delayTime(.15 * (a * numPlayer + b)), cc.moveTo(.2, cc.v2(rawPlayerPos.x, rawPlayerPos.y))));
                }
              }
              let delayOver2Under = .2;
              var maxDelay = .15 * (1 * numPlayer + (numPlayer - 1));
              let timeUnderLayer = 1e3 * (maxDelay + .2 + delayOver2Under);
              this.unschedule(this.timeoutChiaBaiDone);
              this.timeoutChiaBaiDone = () => {
                if (null == this.node || "undefined" == typeof this.node) return;
                for (let index = 0; index < 2 * Poker_Cmd_1.default.Code.MAX_PLAYER; index++) this.cardsDeal.children[index].active = false;
                for (let index = 0; index < numPlayer; index++) {
                  let seatId = arrSeatExist[index];
                  if (-1 !== seatId) {
                    let pl = this.getPlayerHouse(seatId);
                    if (3 != pl.status_save) continue;
                    pl.showCardReady(true);
                    pl.showCardReal(false);
                  }
                }
                for (let a = 0; a < 2; a++) {
                  let spriteCardId = myCards[a];
                  this.getPlayerHouse(0).prepareToTransform();
                  this.getPlayerHouse(0).transformToCardReal(a, this.spriteCards[spriteCardId]);
                }
                let cardName = this.getCardsName(boBaiId);
                this.getPlayerHouse(0).showCardName(cardName);
              };
              this.scheduleOnce(this.timeoutChiaBaiDone, timeUnderLayer / 1e3);
            }
            break;

           case Poker_Cmd_1.default.Code.NEW_ROUND:
            {
              cc.log("Poker NEW_ROUND");
              App_1.default.instance.showLoading(false);
              let res = new Poker_Cmd_1.default.ReceivedNewBetRound(data);
              cc.log("Poker NEW_ROUND res : ", JSON.stringify(res));
              let roundId = res["roundId"];
              let sizeCard = res["sizeCard"];
              let plusCards = res["plusCards"];
              let cardName = res["cardName"];
              let potAmount = res["potAmount"];
              if (cc.isValid(potAmount)) {
                this.matchPot.active = true;
                this.currentMatchPotValue = potAmount;
              }
              this.currentMeBet = 0;
              this.foldedNum = 0;
              this.currentMaxBet = 0;
              this.currentRaiseStep = 2 * this.currentRoomBet;
              this.currentRaiseValue = this.currentMaxBet + this.currentRaiseStep;
              let countPlay = 0;
              for (let index = 0; index < Poker_Cmd_1.default.Code.MAX_PLAYER; index++) {
                let pl = this.getPlayerHouse(index);
                configPlayer[index].isViewer || countPlay++;
              }
              let indexRun = 0;
              for (let index = 0; index < Poker_Cmd_1.default.Code.MAX_PLAYER; index++) {
                let pl = this.getPlayerHouse(index);
                if (!configPlayer[index].isViewer) {
                  indexRun++;
                  indexRun >= countPlay ? this.setMatchPot(pl, pl.currentBetValue, false, true) : this.setMatchPot(pl, pl.currentBetValue, false, false);
                }
                pl.currentBetValue = 0;
                pl.resetHubChip();
                pl.resetAction();
              }
              if (!configPlayer[0].isViewer) switch (roundId) {
               case 1:
                this.showCenterCards1stRound(plusCards);
                break;

               case 2:
                this.showCenterCards2ndRound(plusCards);
                break;

               case 3:
                this.showCenterCards3rdRound(plusCards);
              }
            }
            break;

           case Poker_Cmd_1.default.Code.CHANGE_TURN:
            {
              cc.log("Poker CHANGE_TURN");
              App_1.default.instance.showLoading(false);
              let res = new Poker_Cmd_1.default.ReceivedChangeTurn(data);
              cc.log("Poker CHANGE_TURN res : ", JSON.stringify(res));
              let roundId = res["roundId"];
              let chair = res["chair"];
              let betTime = res["betTime"];
              let potMoney = res["potMoney"];
              this.resetAllPlayerCountdown();
              let seatId = this.findPlayerSeatByPos(chair);
              if (-1 != seatId) {
                this.getPlayerHouse(seatId).showPlayCountdown();
                this.startThinkingCountDown(seatId, betTime);
                if (0 == seatId) {
                  this.btnBet.active = true;
                  this.FxDealer.setAnimation(0, "noti", true);
                  this.btnOpenCard.active = false;
                  this.setupBet();
                  this.currentRaiseValue = this.currentMaxBet + this.currentRaiseStep;
                  let currentMeGold = this.getPlayerHouse(0).getGold();
                  let minBet = this.currentRaiseValue - this.currentMeBet;
                  this.sliderBet.initValue(minBet, this.currentRoomBet, currentMeGold);
                  this.resetBtnActions();
                  this.btnActions.parent.getChildByName("BG").active = true;
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

           case Poker_Cmd_1.default.Code.KET_THUC:
            {
              cc.log("Poker KET_THUC  ", data);
              App_1.default.instance.showLoading(false);
              let res = new Poker_Cmd_1.default.ReceivedEndGame(data);
              cc.log("Poker KET_THUC res : ", JSON.stringify(res));
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
              let publicCardSize = res["publicCardSize"];
              let publicCards = res["publicCards"];
              let hasInfoSize = res["hasInfoSize"];
              let hasInfoList = res["hasInfoList"];
              let privateCardList = res["privateCardList"];
              let maxCardList = res["maxCardList"];
              let cardNameList = res["cardNameList"];
              this.matchPot.active = true;
              cc.isValid(potAmount) && (this.currentMatchPotValue = potAmount);
              this.setMatchPot(null, 0, true);
              this.currentPrivateCardList = privateCardList;
              let arrPlayerPosExist = [];
              for (let index = 0; index < Poker_Cmd_1.default.Code.MAX_PLAYER; index++) maxCardList[index].length > 0 && arrPlayerPosExist.push(index);
              this.showAllCenterCards(publicCards);
              let endMeCards = this.currentCard;
              let endCenterCards = publicCards;
              let endMeMaxCards = maxCardList[configPlayer[0].playerPos];
              if (endMeMaxCards && endMeMaxCards.length > 0) {
                for (let index = 0; index < endMeCards.length; index++) {
                  let findId = endMeMaxCards.indexOf(endMeCards[index]);
                  -1 !== findId ? this.getPlayerHouse(0).setCardWin(index, true) : this.getPlayerHouse(0).setCardWin(index, false);
                }
                for (let index = 0; index < endCenterCards.length; index++) {
                  let findId = endMeMaxCards.indexOf(endCenterCards[index]);
                  this.cardsCenter.children[index].color = -1 !== findId ? cc.Color.WHITE : cc.Color.GRAY;
                }
              }
              for (let index = 1; index < Poker_Cmd_1.default.Code.MAX_PLAYER; index++) {
                let arrCardsEnd = privateCardList[configPlayer[index].playerPos];
                if (arrCardsEnd.length > 0 && this.foldedNum < rankList.filter(d => 0 != d).length - 1) for (let b = 0; b < arrCardsEnd.length; b++) {
                  let spriteCardId = arrCardsEnd[b];
                  this.getPlayerHouse(index).prepareToTransform();
                  this.getPlayerHouse(index).transformToCardReal(b, this.spriteCards[spriteCardId]);
                }
              }
              for (let index = 0; index < arrPlayerPosExist.length; index++) {
                let cardName = this.getCardsName(cardNameList[arrPlayerPosExist[index]]);
                let seatId = this.findPlayerSeatByPos(arrPlayerPosExist[index]);
                -1 != seatId && this.foldedNum < rankList.filter(d => 0 != d).length - 1 && this.getPlayerHouse(seatId).showCardName(cardName);
              }
              this.foldedNum = 0;
              this.scheduleOnce(() => {
                for (let index = 0; index < Poker_Cmd_1.default.Code.MAX_PLAYER; index++) if (1 == booleanWinerList[index]) {
                  let seatId = this.findPlayerSeatByPos(index);
                  if (-1 != seatId) {
                    let pl = this.getPlayerHouse(seatId);
                    pl.fxWin({
                      moneyChange: kqttList[index],
                      currentMoney: currentMoney[index]
                    });
                    this.scheduleOnce(() => {
                      let iconsLayou = this.matchPot.getChildByName("Icon");
                      while (iconsLayou.childrenCount > 0) {
                        let chip = iconsLayou.children[0];
                        chip.parent = this.UI_Playing;
                        let posTo = pl.node.parent.convertToNodeSpaceAR(this.UI_Playing.convertToWorldSpaceAR(pl.node.position));
                        cc.tween(chip).to(.5, {
                          x: posTo.x,
                          y: posTo.y
                        }).delay(.2).call(() => {
                          this.removeChip(chip);
                        }).start();
                      }
                      pl.resetHubChip();
                    }, 2);
                    if (0 == seatId) {
                      let numPlayer = this.getNumPlayers();
                      numPlayer.length > 2 ? this.btnOpenCard.active = true : this.btnOpenCard.active = false;
                      this.btnBet.active = false;
                    }
                  }
                } else if (2 == booleanWinerList[index]) {
                  let findId = arrPlayerPosExist.indexOf(index);
                  if (-1 !== findId) {
                    let seatId = this.findPlayerSeatByPos(index);
                    let pl = this.getPlayerHouse(seatId);
                    pl.fxDraw({
                      moneyChange: kqttList[index],
                      currentMoney: currentMoney[index]
                    });
                    this.scheduleOnce(() => {
                      let iconsLayou = this.matchPot.getChildByName("Icon");
                      while (iconsLayou.childrenCount > 0) this.removeChip(iconsLayou.children[0]);
                      let count = 10;
                      for (let iii = 0; iii < count; iii++) {
                        let chip = this.getChip();
                        chip.parent = this.UI_Playing;
                        chip.active = true;
                        chip.x = this.matchPot.x;
                        chip.y = this.matchPot.y;
                        let posTo = pl.node.parent.convertToNodeSpaceAR(this.UI_Playing.convertToWorldSpaceAR(pl.node.position));
                        cc.tween(chip).to(.5, {
                          x: posTo.x,
                          y: posTo.y
                        }).delay(.2).call(() => {
                          this.removeChip(chip);
                        }).start();
                      }
                      pl.resetHubChip();
                    }, 2);
                  }
                } else {
                  let findId = arrPlayerPosExist.indexOf(index);
                  if (-1 !== findId) {
                    let seatId = this.findPlayerSeatByPos(index);
                    let pl = this.getPlayerHouse(seatId);
                    pl.fxLose({
                      moneyChange: kqttList[index],
                      currentMoney: currentMoney[index]
                    });
                    pl.resetHubChip();
                  }
                }
                this.scheduleOnce(() => {
                  this.matchPot.active = false;
                }, 2.5);
              }, 3);
              MiniGameNetworkClient_1.default.getInstance().sendCheck(new Poker_Cmd_1.default.ReqGetMoneyUse());
            }
            break;

           case Poker_Cmd_1.default.Code.UPDATE_MATCH:
            {
              cc.log("Poker UPDATE_MATCH");
              App_1.default.instance.showLoading(false);
              let res = new Poker_Cmd_1.default.ReceivedUpdateMatch(data);
              cc.log("Poker UPDATE_MATCH res : ", JSON.stringify(res));
              let chair = res["chair"];
              let hasInfoSize = res["hasInfoSize"];
              let hasInfoList = res["hasInfoList"];
              let currentMoneyList = res["currentMoneyList"];
              let statusList = res["statusList"];
              for (let index = 0; index < Poker_Cmd_1.default.Code.MAX_PLAYER; index++) {
                let pos = configPlayer[index]["playerPos"];
                if (1 == hasInfoList[pos]) {
                  this.getPlayerHouse(index).setGold(currentMoneyList[pos]);
                  if (statusList[pos] == Poker_Cmd_1.default.Code.PLAYER_STATUS_SITTING || statusList[pos] == Poker_Cmd_1.default.Code.PLAYER_STATUS_PLAYING) if (0 == currentMoneyList[pos]) {
                    configPlayer[index].isViewer = true;
                    configPlayer[index]["isViewer"] = true;
                    this.getPlayerHouse(index).setIsViewer(true);
                    -1 != configPlayer[index].playerId && this.getPlayerHouse(index).playFxViewer();
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

           case Poker_Cmd_1.default.Code.SHOW_CARD:
            {
              cc.log("Poker SHOW_CARD");
              App_1.default.instance.showLoading(false);
              let res = new Poker_Cmd_1.default.ReceivedShowCard(data);
              cc.log("Poker SHOW_CARD res : ", JSON.stringify(res));
              let chair = res["chair"];
              let seatId = this.findPlayerSeatByPos(chair);
              if (-1 != seatId) {
                let cardShow = this.currentPrivateCardList[chair];
                if (cardShow.length > 0) for (let a = 0; a < 2; a++) {
                  let spriteCardId = cardShow[a];
                  this.getPlayerHouse(seatId).prepareToTransform();
                  this.getPlayerHouse(seatId).transformToCardReal(a, this.spriteCards[spriteCardId]);
                }
              }
            }
            break;

           case Poker_Cmd_1.default.Code.REQUEST_BUY_IN:
            Configs_1.default.Login.Coin >= this.currentRoomBet * this.roomMinBuyIn ? this.showPopupBuyIn(this.roomMinBuyIn, this.roomMaxBuyIn, this.currentRoomBet) : this.actionLeaveRoom();
            break;

           case Poker_Cmd_1.default.Code.REQUEST_STAND_UP:
            {
              cc.log("Poker REQUEST_STAND_UP");
              App_1.default.instance.showLoading(false);
              let res = new Poker_Cmd_1.default.ReceivedStandUp(data);
              cc.log("Poker REQUEST_STAND_UP res : ", JSON.stringify(res));
            }
            break;

           case Poker_Cmd_1.default.Code.LOGIN:
            App_1.default.instance.showLoading(false);
            this.refeshListRoom();
            Poker_NetworkClient_1.default.getInstance().send(new Poker_Cmd_1.default.CmdReconnectRoom());
            break;

           case Poker_Cmd_1.default.Code.TOPSERVER:
            App_1.default.instance.showLoading(false);
            cc.log("Poker TOPSERVER");
            break;

           case Poker_Cmd_1.default.Code.CMD_PINGPONG:
            App_1.default.instance.showLoading(false);
            cc.log("Poker CMD_PINGPONG");
            break;

           case Poker_Cmd_1.default.Code.CMD_JOIN_ROOM:
            App_1.default.instance.showLoading(false);
            cc.log("Poker CMD_JOIN_ROOM");
            break;

           case Poker_Cmd_1.default.Code.CMD_RECONNECT_ROOM:
           case Poker_Cmd_1.default.Code.CMD_RECONNECT_ROOM:
            App_1.default.instance.showLoading(false);
            cc.log("Poker CMD_RECONNECT_ROOM");
            break;

           case Poker_Cmd_1.default.Code.MONEY_BET_CONFIG:
            {
              App_1.default.instance.showLoading(false);
              cc.log("Poker MONEY_BET_CONFIG");
              let res = new CardGame_Cmd_1.default.ResMoneyBetConfig(data);
              cc.log(res);
              this.initRooms(res.list);
            }
            break;

           case Poker_Cmd_1.default.Code.JOIN_ROOM_FAIL:
            {
              App_1.default.instance.showLoading(false);
              let res = new Poker_Cmd_1.default.ReceivedJoinRoomFail(data);
              cc.log("Poker JOIN_ROOM_FAIL res : ", JSON.stringify(res));
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

           case Poker_Cmd_1.default.Code.GET_LIST_ROOM:
            break;

           case Poker_Cmd_1.default.Code.JOIN_GAME_ROOM_BY_ID:
            App_1.default.instance.showLoading(false);
            cc.log("Poker JOIN_GAME_ROOM_BY_ID");
            break;

           case Poker_Cmd_1.default.Code.TU_DONG_BAT_DAU:
            {
              App_1.default.instance.showLoading(false);
              let res = new Poker_Cmd_1.default.ReceivedAutoStart(data);
              cc.log("Poker ReceiveAutoStart res : ", JSON.stringify(res));
              if (res.isAutoStart) {
                this.resetCenterCards();
                this.resetHubChips();
                this.startWaittingCountDown(res.timeAutoStart);
                this.btnBet.active = false;
                this.btnOpenCard.active = false;
                this.FxDealer.setAnimation(0, "cho", true);
                this.matchPot.active = false;
                this.currentMatchPotValue = 0;
                this.setMatchPot(null, 0, false);
                this.currentCard = [];
                this.currentCenterCard = [];
                this.currentPrivateCardList = [];
                this.currentMeBet = 0;
                this.currentMaxBet = 0;
                this.currentRaiseStep = 0;
                this.currentRaiseValue = 0;
                this.resetPlayersPlaying();
                this.FxDealer.setAnimation(0, "cho", true);
              }
            }
            break;

           case Poker_Cmd_1.default.Code.MOI_DAT_CUOC:
            {
              App_1.default.instance.showLoading(false);
              let res = new Poker_Cmd_1.default.ReceivedMoiDatCuoc(data);
              cc.log("Poker ReceivedMoiDatCuoc res : ", JSON.stringify(res));
              this.startBettingCountDown(res.timeDatCuoc);
              this.matchPot.active = true;
              let currentMeGold = this.getPlayerHouse(0).getGold();
              this.sliderBet.initValue(this.currentRoomBet, this.currentRoomBet, currentMeGold);
              this.currentMatchPotValue = 0;
              for (let index = 0; index < configPlayer.length; index++) if (index === this.seatOwner || configPlayer[index].isViewer || -1 === configPlayer[index].playerId) {
                this.currentMatchPotValue += 2 * this.currentRoomBet;
                this.setMatchPot(this.getPlayerHouse(index), 2 * this.currentRoomBet, false);
              } else {
                this.getPlayerHouse(index).setBet(this.currentRoomBet);
                this.getPlayerHouse(index).addChips();
                this.currentMatchPotValue += this.currentRoomBet;
                this.setMatchPot(this.getPlayerHouse(index), this.currentRoomBet, false);
              }
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

           case Poker_Cmd_1.default.Code.CHEAT_CARDS:
            App_1.default.instance.showLoading(false);
            cc.log("Poker CHEAT_CARDS");
            break;

           case Poker_Cmd_1.default.Code.DANG_KY_CHOI_TIEP:
            App_1.default.instance.showLoading(false);
            cc.log("Poker DANG_KY_CHOI_TIEP  ", data);
            break;

           case Poker_Cmd_1.default.Code.UPDATE_OWNER_ROOM:
            App_1.default.instance.showLoading(false);
            cc.log("Poker UPDATE_OWNER_ROOM");
            break;

           case Poker_Cmd_1.default.Code.NOTIFY_KICK_FROM_ROOM:
            {
              App_1.default.instance.showLoading(false);
              let res = new Poker_Cmd_1.default.ReceivedKickOff(data);
              cc.log("Poker ReceivedKickOff res : ", JSON.stringify(res));
              this.onKickFromRoom(res.reason);
            }
            break;

           case Poker_Cmd_1.default.Code.NOTIFY_USER_GET_JACKPOT:
            App_1.default.instance.showLoading(false);
            cc.log("Poker NOTIFY_USER_GET_JACKPOT");
            break;

           case Poker_Cmd_1.default.Code.CHAT_ROOM:
            {
              App_1.default.instance.showLoading(false);
              let res = new Poker_Cmd_1.default.ReceivedChatRoom(data);
              cc.log("Poker CHAT_ROOM res : ", JSON.stringify(res));
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

           case Poker_Cmd_1.default.Code.CARDS_DEFINE:
            {
              let res = new Poker_Cmd_1.default.ReceivedCardsDefine(data);
              cc.log(res);
              this.setCardsDefine(JSON.parse(res.strData).object || []);
            }
            break;

           default:
            cc.log("--inpacket.getCmdId(): " + inpacket.getCmdId());
          }
        }, this);
      }
      initRooms(rooms) {
        let arrBet = [];
        this.contentListRooms.removeAllChildren();
        for (let i = 0; i < rooms.length; i++) {
          let room = rooms[i];
          let isExisted = arrBet.indexOf(room.moneyBet);
          -1 == isExisted && room.moneyType == Configs_1.default.App.MONEY_TYPE && arrBet.push(room.moneyBet);
        }
        arrBet.sort(function(a, b) {
          return a - b;
        });
        let speed = .7;
        for (let index = 0; index < arrBet.length; index++) {
          let playerCount = 0;
          let maxUser = 0;
          let moneyRequire = 0;
          for (let a = 0; a < rooms.length; a++) {
            let room = rooms[a];
            if (room.moneyBet == arrBet[index]) {
              playerCount += room.nPersion;
              maxUser = room.maxUserPerRoom;
              moneyRequire = room.moneyRequire;
            }
          }
          var item = cc.instantiate(this.prefabItemRoom);
          item.getComponent("ItemRoom").initItem({
            id: index + 1,
            moneyBet: arrBet[index],
            requiredMoney: moneyRequire,
            userCount: playerCount,
            maxUserPerRoom: maxUser
          });
          item.getComponent("ItemRoom").labelNumPlayers.string = playerCount;
          item.on(cc.Node.EventType.TOUCH_END, event => {
            if (Configs_1.default.Login.Coin < moneyRequire) {
              App_1.default.instance.actiontDialog.showMsgWithAction("S\u1ed1 d\u01b0 kh\xf4ng \u0111\u1ee7.", "N\u1ea0P NGAY", () => {
                App_1.default.instance.openShop(0);
              });
              return;
            }
            Poker_NetworkClient_1.default.getInstance().send(new CardGame_Cmd_1.default.SendJoinRoom(Configs_1.default.App.MONEY_TYPE, maxUser, arrBet[index], 0));
          });
          item.y = -30;
          let time = .2 * speed * (1 === index ? .8 : 1 - Math.pow(2, -10 * index));
          item.runAction(cc.sequence(cc.fadeOut(0), cc.delayTime(.15 * (arrBet.length - index) * speed), cc.spawn(cc.fadeIn(time), cc.moveTo(time, cc.v2(0, -30 - 85 * index)).easing(cc.easeCircleActionOut()))));
          item.parent = this.contentListRooms;
        }
        this.contentListRooms.parent.parent.getComponent(cc.ScrollView).scrollToBottom(0);
        this.contentListRooms.parent.parent.getComponent(cc.ScrollView).scrollToTop(2);
      }
      actionLeaveRoom() {
        Poker_NetworkClient_1.default.getInstance().send(new Poker_Cmd_1.default.CmdSendRequestLeaveGame());
      }
      actionOpenCard() {
        Poker_NetworkClient_1.default.getInstance().send(new Poker_Cmd_1.default.SendShowCard());
        this.btnOpenCard.active = false;
      }
      actionAll_In() {
        this.btnBet.active = false;
        Poker_NetworkClient_1.default.getInstance().send(new Poker_Cmd_1.default.SendTakeTurn(0, 0, 0, 1, 0));
      }
      actionRaise() {
        this.btnBet.active = false;
        let rawMeGold = this.getPlayerHouse(0).userGold.string.replace(/\./g, "");
        let currentMeMoney = parseInt(rawMeGold);
        let betValue = Math.min(this.sliderBet.current_raise, currentMeMoney);
        Poker_NetworkClient_1.default.getInstance().send(new Poker_Cmd_1.default.SendTakeTurn(0, 0, 0, 0, betValue));
      }
      actionCheck() {
        this.btnBet.active = false;
        Poker_NetworkClient_1.default.getInstance().send(new Poker_Cmd_1.default.SendTakeTurn(0, 1, 0, 0, 0));
      }
      actionCall() {
        this.btnBet.active = false;
        Poker_NetworkClient_1.default.getInstance().send(new Poker_Cmd_1.default.SendTakeTurn(0, 0, 1, 0, 0));
      }
      actionFold() {
        this.btnBet.active = false;
        Poker_NetworkClient_1.default.getInstance().send(new Poker_Cmd_1.default.SendTakeTurn(1, 0, 0, 0, 0));
      }
      initConfigPlayer() {
        configPlayer = [];
        for (let index = 0; index < Poker_Cmd_1.default.Code.MAX_PLAYER; index++) configPlayer.push({
          seatId: index,
          playerId: -1,
          playerPos: -1,
          isViewer: true
        });
      }
      resetCenterCards() {
        for (let index = 0; index < 5; index++) {
          this.cardsCenter.children[index].position = cc.v3(0, 100);
          this.cardsCenter.children[index].scale = 0;
          this.cardsCenter.children[index].color = cc.Color.WHITE;
        }
      }
      resetPlayersPlaying() {
        for (let index = 0; index < Poker_Cmd_1.default.Code.MAX_PLAYER; index++) this.getPlayerHouse(index).resetMatchHistory();
      }
      resetAllPlayerCountdown() {
        for (let index = 0; index < Poker_Cmd_1.default.Code.MAX_PLAYER; index++) this.getPlayerHouse(index).hidePlayCountdown();
      }
      getCardsName(boBaiId) {
        let name = "";
        switch (boBaiId) {
         case Poker_Cmd_1.default.Code.EG_SANH_VUA:
          name = "S\u1ea3nh Vua";
          break;

         case Poker_Cmd_1.default.Code.EG_THUNG_PHA_SANH:
          name = "Th\xf9ng Ph\xe1 S\u1ea3nh";
          break;

         case Poker_Cmd_1.default.Code.EG_TU_QUY:
          name = "T\u1ee9 Qu\xfd";
          break;

         case Poker_Cmd_1.default.Code.EG_CU_LU:
          name = "C\xf9 L\u0169";
          break;

         case Poker_Cmd_1.default.Code.EG_THUNG:
          name = "Th\xf9ng";
          break;

         case Poker_Cmd_1.default.Code.EG_SANH:
          name = "S\u1ea3nh";
          break;

         case Poker_Cmd_1.default.Code.EG_XAM_CO:
          name = "X\xe1m C\xf4";
          break;

         case Poker_Cmd_1.default.Code.EG_HAI_DOI:
          name = "Hai \u0110\xf4i";
          break;

         case Poker_Cmd_1.default.Code.EG_DOI:
          name = "\u0110\xf4i";
          break;

         case Poker_Cmd_1.default.Code.EG_MAU_THAU:
          name = "M\u1eadu Th\u1ea7u";
        }
        return name;
      }
      setupSeatPlayer(seatId, playerInfo) {
        configPlayer[seatId].playerId = playerInfo.nickName;
        this.getPlayerHouse(seatId).setAvatar(playerInfo.avatar);
        this.getPlayerHouse(seatId).setName(playerInfo.nickName);
        this.getPlayerHouse(seatId).setGold(playerInfo.currentMoney);
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
        return this.groupPlayers.children[seatId].getComponent(Poker_Player_1.default);
      }
      getNumPlayers() {
        var playerPosEntry = [];
        for (let index = 0; index < configPlayer.length; index++) -1 === configPlayer[index].playerId || configPlayer[index].isViewer || playerPosEntry.push(configPlayer[index].seatId);
        return playerPosEntry;
      }
      onKickFromRoom(reason) {
        let msg = "B\u1ea1n b\u1ecb kick kh\u1ecfi b\xe0n ch\u01a1i!";
        switch (reason) {
         case Poker_Constant_1.KickReasonCodes.ENUM.ERROR_MONEY:
          msg = "Ti\u1ec1n trong b\xe0n kh\xf4ng \u0111\u1ee7 \u0111\u1ec3 ti\u1ebfp t\u1ee5c!";
          break;

         case Poker_Constant_1.KickReasonCodes.ENUM.ERROR_BAO_TRI:
          msg = "H\u1ec7 th\u1ed1ng b\u1ea3o tr\xec!";
        }
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
          MiniGameNetworkClient_1.default.getInstance().send(new Poker_Cmd_1.default.ReqGetMoneyUse());
          this.refeshListRoom();
        }
        this.scheduleOnce(() => {
          switch (reason) {
           case Poker_Constant_1.KickReasonCodes.ENUM.ERROR_MONEY:
            App_1.default.instance.actiontDialog.showMsgWithAction("S\u1ed1 d\u01b0 kh\xf4ng \u0111\u1ee7.", "N\u1ea0P NGAY", () => {
              App_1.default.instance.openShop(0);
            });
            break;

           case Poker_Constant_1.KickReasonCodes.ENUM.ERROR_BAO_TRI:
            App_1.default.instance.alertDialog.showMsg("H\u1ec7 th\u1ed1ng b\u1ea3o tr\xec!");
            break;

           default:
            App_1.default.instance.alertDialog.showMsg("B\u1ea1n b\u1ecb kick kh\u1ecfi b\xe0n ch\u01a1i!");
          }
        }, .5);
      }
      getCardsDefine() {
        Poker_NetworkClient_1.default.getInstance().send(new Poker_Cmd_1.default.SendCardsDefine());
      }
      setCardsDefine(cards) {
        this.cardsDefine = cards;
        this.btnShowCardsDefine.node.active = (true, this.cardsDefine) && this.cardsDefine.length > 0;
      }
      actShowCardsDefine() {
        PopupCardDefinations_1.default.createAndShow(App_1.default.instance.popups, this.cardsDefine, this.spriteCards);
      }
      actShowGuide() {
        Poker_PopupGuide_1.default.createAndShow(this.UI_Playing);
      }
      getCurrentRoomBet() {
        return this.currentRoomBet;
      }
    };
    PokerController.instance = null;
    __decorate([ property(cc.Node) ], PokerController.prototype, "UI_ChooseRoom", void 0);
    __decorate([ property(cc.Label) ], PokerController.prototype, "labelNickName", void 0);
    __decorate([ property(cc.Label) ], PokerController.prototype, "labelCoin", void 0);
    __decorate([ property(cc.Sprite) ], PokerController.prototype, "avatar", void 0);
    __decorate([ property(cc.Node) ], PokerController.prototype, "contentListRooms", void 0);
    __decorate([ property(cc.Prefab) ], PokerController.prototype, "prefabItemRoom", void 0);
    __decorate([ property(cc.ScrollView) ], PokerController.prototype, "scrollListRoom", void 0);
    __decorate([ property(cc.EditBox) ], PokerController.prototype, "edtFindRoom", void 0);
    __decorate([ property(cc.Toggle) ], PokerController.prototype, "btnHideRoomFull", void 0);
    __decorate([ property(cc.Node) ], PokerController.prototype, "UI_Playing", void 0);
    __decorate([ property(cc.Node) ], PokerController.prototype, "meCards", void 0);
    __decorate([ property(cc.Node) ], PokerController.prototype, "groupPlayers", void 0);
    __decorate([ property(cc.SpriteFrame) ], PokerController.prototype, "spriteCards", void 0);
    __decorate([ property(cc.SpriteFrame) ], PokerController.prototype, "spriteCardBack", void 0);
    __decorate([ property(cc.Node) ], PokerController.prototype, "matchPot", void 0);
    __decorate([ property(cc.Label) ], PokerController.prototype, "labelMatchPot", void 0);
    __decorate([ property(cc.Node) ], PokerController.prototype, "cardsDeal", void 0);
    __decorate([ property(cc.Node) ], PokerController.prototype, "cardsCenter", void 0);
    __decorate([ property(cc.Node) ], PokerController.prototype, "btnBet", void 0);
    __decorate([ property(cc.Node) ], PokerController.prototype, "btnOpenCard", void 0);
    __decorate([ property(cc.Button) ], PokerController.prototype, "btnLeaveRoom", void 0);
    __decorate([ property(cc.Node) ], PokerController.prototype, "hubChips", void 0);
    __decorate([ property(cc.Label) ], PokerController.prototype, "labelRoomId", void 0);
    __decorate([ property(cc.Label) ], PokerController.prototype, "labelRoomBet", void 0);
    __decorate([ property(cc.Node) ], PokerController.prototype, "actionBetting", void 0);
    __decorate([ property(sp.Skeleton) ], PokerController.prototype, "FxDealer", void 0);
    __decorate([ property(cc.Node) ], PokerController.prototype, "btnBuyCashIn", void 0);
    __decorate([ property(cc.Node) ], PokerController.prototype, "btnActions", void 0);
    __decorate([ property(cc.Node) ], PokerController.prototype, "popupBuyIn", void 0);
    __decorate([ property(cc.Label) ], PokerController.prototype, "labelBuyInMin", void 0);
    __decorate([ property(cc.Label) ], PokerController.prototype, "labelBuyInMax", void 0);
    __decorate([ property(cc.EditBox) ], PokerController.prototype, "edtBuyIn", void 0);
    __decorate([ property(CustomUI_SliderBet_1.default) ], PokerController.prototype, "sliderBuyin", void 0);
    __decorate([ property(cc.Toggle) ], PokerController.prototype, "toggleAutoBuyIn", void 0);
    __decorate([ property(cc.Node) ], PokerController.prototype, "notifyTimeStart", void 0);
    __decorate([ property(cc.Node) ], PokerController.prototype, "notifyTimeEnd", void 0);
    __decorate([ property(cc.Node) ], PokerController.prototype, "notifyTimeBet", void 0);
    __decorate([ property(cc.Node) ], PokerController.prototype, "popupNodity", void 0);
    __decorate([ property(cc.Label) ], PokerController.prototype, "labelNotifyContent", void 0);
    __decorate([ property([ cc.SpriteFrame ]) ], PokerController.prototype, "lsSfChip", void 0);
    __decorate([ property(cc.Prefab) ], PokerController.prototype, "prefabItemChip", void 0);
    __decorate([ property(CustomUI_SliderBet_1.default) ], PokerController.prototype, "sliderBet", void 0);
    __decorate([ property(cc.Button) ], PokerController.prototype, "btnShowCardsDefine", void 0);
    PokerController = PokerController_1 = __decorate([ ccclass ], PokerController);
    exports.default = PokerController;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/App": void 0,
    "../../Main/Game/src/common/BroadcastReceiver": void 0,
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/common/Utils": void 0,
    "../../Main/Game/src/customui/CustomUI.SliderBet": void 0,
    "../../Main/Game/src/games/cardgames/PopupCardDefinations": void 0,
    "../../Main/Game/src/games/cardgames/PopupChatInGame": void 0,
    "../../Main/Game/src/networks/CardGame.Cmd": void 0,
    "../../Main/Game/src/networks/MiniGameNetworkClient": void 0,
    "../../Main/Game/src/networks/Network.Cmd": void 0,
    "../../Main/Game/src/networks/Network.InPacket": void 0,
    "./Poker.CardUtil": "Poker.CardUtil",
    "./Poker.Cmd": "Poker.Cmd",
    "./Poker.Constant": "Poker.Constant",
    "./Poker.NetworkClient": "Poker.NetworkClient",
    "./Poker.Player": "Poker.Player",
    "./Poker.PopupGuide": "Poker.PopupGuide"
  } ],
  "Poker.ItemRoom": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "506a91gVcBEUL5Aw1Hj1PE1", "Poker.ItemRoom");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Poker_Controller_1 = require("./Poker.Controller");
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const BroadcastReceiver_1 = require("../../Main/Game/src/common/BroadcastReceiver");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let PokerItemRoom = class PokerItemRoom extends cc.Component {
      constructor() {
        super(...arguments);
        this.labelBet = null;
        this.labelBetMin = null;
        this.labelNumPlayers = null;
        this.progressNumPlayers = null;
        this.roomInfo = null;
      }
      start() {
        BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.SET_SOUND, this.node);
      }
      initItem(info) {
        this.roomInfo = info;
        this.labelBet.string = Utils_1.default.formatNumber(info["moneyBet"]);
        this.labelBetMin.string = Utils_1.default.formatNumber(info["requiredMoney"]);
        this.labelNumPlayers.string = info["userCount"] + "/" + info["maxUserPerRoom"];
        this.progressNumPlayers.fillRange = info["userCount"] / info["maxUserPerRoom"];
      }
      chooseRoom() {
        Poker_Controller_1.default.instance.joinRoom(this.roomInfo);
      }
    };
    __decorate([ property(cc.Label) ], PokerItemRoom.prototype, "labelBet", void 0);
    __decorate([ property(cc.Label) ], PokerItemRoom.prototype, "labelBetMin", void 0);
    __decorate([ property(cc.Label) ], PokerItemRoom.prototype, "labelNumPlayers", void 0);
    __decorate([ property(cc.Sprite) ], PokerItemRoom.prototype, "progressNumPlayers", void 0);
    PokerItemRoom = __decorate([ ccclass ], PokerItemRoom);
    exports.default = PokerItemRoom;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/BroadcastReceiver": void 0,
    "../../Main/Game/src/common/Utils": void 0,
    "./Poker.Controller": "Poker.Controller"
  } ],
  "Poker.NetworkClient": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "dc696/vTfVLfYiNSjN3D0rT", "Poker.NetworkClient");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Network_NetworkClient_1 = require("../../Main/Game/src/networks/Network.NetworkClient");
    const Network_NetworkListener_1 = require("../../Main/Game/src/networks/Network.NetworkListener");
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    class PokerNetworkClient extends Network_NetworkClient_1.default {
      constructor() {
        super();
        this.listeners = new Array();
        this.isUseWSS = Configs_1.default.App.USE_WSS;
      }
      static getInstance() {
        null == this.instance && (this.instance = new PokerNetworkClient());
        return this.instance;
      }
      connect() {
        super.connect(Configs_1.default.App.HOST_POKER.host, Configs_1.default.App.HOST_POKER.port);
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
    exports.default = PokerNetworkClient;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/networks/Network.NetworkClient": void 0,
    "../../Main/Game/src/networks/Network.NetworkListener": void 0
  } ],
  "Poker.Player": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3a80dskJA1MzZkQWeG+gkTZ", "Poker.Player");
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
    const Poker_Controller_1 = require("./Poker.Controller");
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
        this.actionAllIn = null;
        this.actionFold = null;
        this.actionViewer = null;
        this.actionThinking = null;
        this.actionWin = null;
        this.goldWin = null;
        this.actionDraw = null;
        this.goldDraw = null;
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
        this.posCardOpened = null;
        this.timeoutNotify = null;
        this.timeoutShowCardName = null;
        this.timeoutChat = null;
        this.currentBetValue = 0;
        this.status_save = 1;
        this.isFolded = false;
      }
      onDestroy() {
        this.unschedule(this.timeoutNotify);
        this.unschedule(this.timeoutShowCardName);
        this.unschedule(this.timeoutChat);
      }
      start() {
        BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.SET_SOUND, this.node);
      }
      updatePosCardOpened(data) {
        this.posCardOpened = data;
      }
      showChatEmotion(content) {
        this.node.children[7].active = true;
        this.chatEmotion.active = true;
        this.chatMsg.active = false;
        this.unschedule(this.timeoutChat);
        this.chatEmotion.getComponent(sp.Skeleton).setAnimation(0, content, true);
        this.timeoutChat = () => {
          if (null == this.node || "undefined" == typeof this.node) return;
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
          if (null == this.node || "undefined" == typeof this.node) return;
          this.chatEmotion.active = false;
          this.chatMsg.active = false;
        };
        this.scheduleOnce(this.timeoutChat, 3);
      }
      showBtnInvite(state) {
        this.btnInvite.active = state;
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
        this.node.children[5].active = true;
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
      }
      prepareCardReal(pos) {
        this.cardReal.children[pos].runAction(cc.scaleTo(0, 0, 1));
      }
      transformToCardReal(cardPos, spriteCard) {
        if (this.isFolded) return;
        this.showCardReal(true);
        this.cardReal.children[cardPos].children[0].getComponent(cc.Sprite).spriteFrame = spriteCard;
        this.cardReady.children[cardPos].runAction(cc.sequence(cc.scaleTo(.15, 0, 1), cc.callFunc(() => {})));
        this.cardReal.children[cardPos].runAction(cc.sequence(cc.delayTime(.15), cc.scaleTo(.15, 1, 1), cc.callFunc(() => {})));
      }
      showCardName(name) {
        this.unschedule(this.timeoutShowCardName);
        if (this.isFolded) {
          this.hideCardName();
          return;
        }
        this.cardsName.active = true;
        this.cardsName.children[0].getComponent(cc.Label).string = name;
        this.timeoutShowCardName = () => {
          if (null == this.node || "undefined" == typeof this.node) return;
          this.cardsName.active = false;
        };
        this.scheduleOnce(this.timeoutShowCardName, 4.5);
      }
      hideCardName() {
        this.cardsName.active = false;
      }
      setGold(data, isCheckState = true) {
        if (!cc.isValid(data)) return;
        if (isCheckState) {
          this.actionViewer.active = false;
          this.actionThinking.active = false;
        }
        this.showGold(true);
        this.userGold.string = this.formatGold(data);
      }
      getGold() {
        let raw = this.userGold.string.replace(/\./g, "");
        return parseInt(raw);
      }
      setBet(data) {
        this.showPlayerBet(true);
        this.currentBetValue += data;
        this.goldBet.string = this.formatGold(this.currentBetValue);
      }
      resetHubChip() {
        this.showPlayerBet(false);
        while (this.hub.childrenCount > 0) {
          this.hub.children[0].active = false;
          Poker_Controller_1.default.instance.removeChip(this.hub.children[0]);
        }
      }
      addChips() {
        let count = Math.floor(this.currentBetValue / Poker_Controller_1.default.instance.getCurrentRoomBet());
        for (let i = 0; i < count; i++) {
          let item1 = null;
          if (i < this.hub.childrenCount) item1 = this.hub.children[i]; else {
            item1 = Poker_Controller_1.default.instance.getChip();
            item1.parent = this.hub;
          }
          item1.x = 0;
          item1["type"] = 1;
          item1.getComponent(cc.Sprite).spriteFrame = Poker_Controller_1.default.instance.lsSfChip[0];
          item1.active = true;
        }
        this.calculatorPot(this.hub, 1);
      }
      calculatorPot(tfParent, typeChip) {
        if (typeChip > Poker_Controller_1.default.instance.lsSfChip.length) return;
        let lsTemp = [];
        for (let i = 0; i < tfParent.childrenCount; i++) {
          tfParent.children[i]["type"] == typeChip && lsTemp.push(tfParent.children[i]);
          if (10 == lsTemp.length) {
            while (lsTemp.length > 1) {
              Poker_Controller_1.default.instance.removeChip(lsTemp[0]);
              lsTemp.shift();
            }
            lsTemp[0].getComponent(cc.Sprite).spriteFrame = Poker_Controller_1.default.instance.lsSfChip[typeChip];
            lsTemp[0]["type"] = typeChip + 1;
            lsTemp = [];
            i = 0;
          }
        }
        this.calculatorPot(tfParent, typeChip + 1);
      }
      showPlayerBet(state) {
        this.hub.parent.active = state;
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
      showGold(state) {}
      prepareFxAction() {
        this.showGold(false);
        this.node.children[5].active = true;
        this.resetAction();
      }
      showActionState(state) {
        this.node.children[5].active = true;
        this.actionState.active = true;
        this.actionState.children[1].getComponent(cc.Label).string = state;
      }
      playFxFold() {
        this.actionFold.active = true;
        this.actionFold.runAction(cc.sequence(cc.scaleTo(0, 0), cc.scaleTo(.1, 1.1, 1.1), cc.scaleTo(.05, 1, 1)));
      }
      playFxAllIn() {
        this.actionAllIn.active = true;
        this.actionAllIn.runAction(cc.sequence(cc.scaleTo(0, 0), cc.scaleTo(.1, 1.1, 1.1), cc.scaleTo(.05, 1, 1)));
      }
      playFxViewer() {
        this.prepareFxAction();
        this.actionViewer.active = true;
      }
      fxOtherPlayerFold() {
        this.cardReady.runAction(cc.moveBy(.5, 0, -100));
      }
      fxMeFold() {
        this.isFolded = true;
        this.shadowCardReal(true);
        this.cardReal.runAction(cc.moveBy(.5, 0, -20));
      }
      showEatGa(state) {
        this.actionWin.children[3].active = state;
      }
      fxWin(playerInfo) {
        this.node.children[5].active = true;
        this.actionWin.active = true;
        if (0 == playerInfo.moneyChange) this.goldWin.node.parent.active = false; else {
          this.goldWin.node.parent.active = true;
          this.goldWin.string = "+" + this.formatGold(playerInfo.moneyChange);
        }
        this.setGold(playerInfo.currentMoney);
        cc.Tween.stopAllByTarget(this.actionWin);
        cc.Tween.stopAllByTarget(this.actionLose);
        cc.Tween.stopAllByTarget(this.actionDraw);
        cc.tween(this.actionWin).delay(4).call(() => {
          if (null == this.node || "undefined" == typeof this.node) return;
          this.actionWin.active = false;
          this.node.children[5].active = false;
          this.currentBetValue = 0;
        }).start();
        this.effectZoomInZoomOut(this.actionWin);
      }
      fxDraw(playerInfo) {
        this.node.children[5].active = true;
        this.actionDraw.active = true;
        if (0 == playerInfo.moneyChange) this.goldDraw.node.parent.active = false; else {
          this.goldDraw.node.parent.active = true;
          this.goldDraw.string = (playerInfo.moneyChange > 0 ? "+" : "") + this.formatGold(playerInfo.moneyChange);
        }
        this.setGold(playerInfo.currentMoney);
        cc.Tween.stopAllByTarget(this.actionWin);
        cc.Tween.stopAllByTarget(this.actionLose);
        cc.Tween.stopAllByTarget(this.actionDraw);
        cc.tween(this.actionDraw).delay(4).call(() => {
          if (null == this.node || "undefined" == typeof this.node) return;
          this.actionDraw.active = false;
          this.node.children[5].active = false;
          this.currentBetValue = 0;
        }).start();
        this.effectZoomInZoomOut(this.actionDraw);
      }
      fxLose(playerInfo) {
        this.node.children[5].active = true;
        if (0 == playerInfo.moneyChange) this.goldLose.node.parent.active = false; else {
          this.goldLose.node.parent.active = true;
          this.goldLose.string = (playerInfo.moneyChange > 0 ? "+" : "") + this.formatGold(playerInfo.moneyChange);
        }
        this.setGold(playerInfo.currentMoney);
        cc.Tween.stopAllByTarget(this.actionWin);
        cc.Tween.stopAllByTarget(this.actionLose);
        cc.Tween.stopAllByTarget(this.actionDraw);
        cc.tween(this.actionLose).delay(4).call(() => {
          if (null == this.node || "undefined" == typeof this.node) return;
          this.actionLose.active = false;
          this.node.children[5].active = false;
          this.currentBetValue = 0;
        }).start();
        this.effectZoomInZoomOut(this.actionLose);
      }
      effectZoomInZoomOut(nodeEffect) {
        cc.tween(nodeEffect).set({
          scale: .4
        }).repeat(20, cc.tween().to(.2, {
          scale: .5
        }).to(.2, {
          scale: .4
        })).start();
      }
      shadowCardReady(state) {
        this.cardReady.children[0].color = state ? cc.Color.GRAY : cc.Color.WHITE;
        this.cardReady.children[1].color = state ? cc.Color.GRAY : cc.Color.WHITE;
      }
      shadowCardReal(state) {
        this.cardReal.children[0].children[0].color = state ? cc.Color.GRAY : cc.Color.WHITE;
        this.cardReal.children[1].children[0].color = state ? cc.Color.GRAY : cc.Color.WHITE;
      }
      shadowEachCardReal(id, state) {
        this.cardReal.children[id].children[0].color = state ? cc.Color.GRAY : cc.Color.WHITE;
      }
      setCardWin(pos, state) {
        this.cardReal.children[pos].children[0].color = state ? cc.Color.WHITE : cc.Color.GRAY;
      }
      showNotify(content) {
        this.notify.active = true;
        this.notify.children[1].getComponent(cc.Label).string = content;
        this.unschedule(this.timeoutNotify);
        this.timeoutNotify = () => {
          if (null == this.node || "undefined" == typeof this.node) return;
          this.notify.active = false;
        };
        this.scheduleOnce(this.timeoutNotify, 1.5);
      }
      resetAction() {
        this.isFolded = false;
        for (let index = 0; index < this.node.children[5].childrenCount; index++) this.node.children[5].children[index].active = false;
      }
      resetMatchHistory() {
        this.isFolded = false;
        this.resetCardReady();
        this.resetCardReal();
        this.node.children[2].active = false;
        this.showGold(true);
        this.cardsName.active = false;
        this.setDealer(false);
        this.setBigBind(false);
        this.setSmallBind(false);
        this.resetAction();
        this.node.children[5].active = false;
        this.goldBet.string = "0";
        this.currentBetValue = 0;
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
        this.cardReal.children[0].children[0].getComponent(cc.Sprite).spriteFrame = this.spriteCardBack;
        this.cardReal.children[1].children[0].getComponent(cc.Sprite).spriteFrame = this.spriteCardBack;
        this.shadowCardReal(false);
      }
      resetPlayerInfo() {
        for (let index = 0; index < this.node.childrenCount; index++) this.node.children[index].active = false;
        this.cardReal.children[0].children[0].getComponent(cc.Sprite).spriteFrame = this.spriteCardBack;
        this.cardReal.children[1].children[0].getComponent(cc.Sprite).spriteFrame = this.spriteCardBack;
        this.cardReady.active = false;
        this.cardReal.active = false;
        this.setDealer(false);
        this.setBigBind(false);
        this.setSmallBind(false);
        this.cardsName.active = false;
        this.isFolded = false;
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
    __decorate([ property(cc.Node) ], Player.prototype, "actionAllIn", void 0);
    __decorate([ property(cc.Node) ], Player.prototype, "actionFold", void 0);
    __decorate([ property(cc.Node) ], Player.prototype, "actionViewer", void 0);
    __decorate([ property(cc.Node) ], Player.prototype, "actionThinking", void 0);
    __decorate([ property(cc.Node) ], Player.prototype, "actionWin", void 0);
    __decorate([ property(cc.Label) ], Player.prototype, "goldWin", void 0);
    __decorate([ property(cc.Node) ], Player.prototype, "actionDraw", void 0);
    __decorate([ property(cc.Label) ], Player.prototype, "goldDraw", void 0);
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
    "../../Main/Game/src/common/BroadcastReceiver": void 0,
    "./Poker.Controller": "Poker.Controller"
  } ],
  "Poker.PopupGuide": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9f4d0AcQ/1Oj7fcJ3J0SDQd", "Poker.PopupGuide");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var PokerPopupGuide_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const App_1 = require("../../Main/Game/src/common/App");
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    const Dialog_1 = require("../../Main/Game/src/common/Dialog");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let PokerPopupGuide = PokerPopupGuide_1 = class PokerPopupGuide extends Dialog_1.default {
      constructor() {
        super(...arguments);
        this.scrollPopupGuide = null;
      }
      static createAndShow(parent) {
        null == this.instance || null == this.instance.node ? App_1.default.instance.loadPrefabInBundle(Configs_1.default.App.BUNDLE_NAME.POKER, Configs_1.default.App.UPDATE_INFO[Configs_1.default.App.BUNDLE_NAME.POKER], true, "res/prefabs/PokerPopupGuide", (err, prefab) => {
          if (null != err) {
            App_1.default.instance.alertDialog.showMsg(err);
            return;
          }
          let go = cc.instantiate(prefab);
          go.parent = parent;
          this.instance = go.getComponent(PokerPopupGuide_1);
          this.instance.show();
        }) : this.instance.show();
      }
      show() {
        let lbGuides = this.scrollPopupGuide.content.getComponentsInChildren(cc.Label);
        lbGuides[0].string = "LU\u1eacT CH\u01a0I B\u1ed8 B\xc0I:";
        lbGuides[1].string = "\u2022 Poker d\xf9ng b\u1ed9 b\xe0i 52 l\xe1, l\xe1 \xe1t(A) c\xf3 gi\xe1 tr\u1ecb l\u1edbn nh\u1ea5t, l\xe1 2 c\xf3 gi\xe1 tr\u1ecb th\u1ea5p nh\u1ea5t. Tuy nhi\xean l\xe1 \xe1t(A) c\xf3 th\u1ec3 s\u1eed d\u1ee5ng nh\u01b0 1 l\xe1 b\xe0i th\u1ea5p nh\u1ea5t \u0111\u1ec3 t\u1ea1o th\xe0nh s\u1ea3nh A,2,3,4,5\n\u2022 Gi\xe1 tr\u1ecb nh\u1eefng l\xe1 b\xe0i theo th\u1ee9 t\u1ef1 t\u1eeb nh\u1ecf \u0111\u1ebfn l\u1edbn l\xe0:\n2 < 3 < 4 < 5 < 6 < 7 < 8 < 9 < 10 < J < Q < K < A\n\u2022 B\u1eaft \u0111\u1ea7u m\u1ed7i v\xe1n b\xe0i, ng\u01b0\u1eddi ch\u01a1i s\u1ebd \u0111\u01b0\u1ee3c chia 2 l\xe1 b\xe0i (B\xe0i T\u1ea9y)\n\u2022 Sau \u0111\xf3 l\u1ea7n l\u01b0\u1ee3t 5 l\xe1 b\xe0i ti\u1ebfp theo s\u1ebd \u0111\u01b0\u1ee3c chia l\xe0m ba \u0111\u1ee3t v\xe0 hi\u1ec3n th\u1ecb tr\xean b\xe0n, 5 l\xe1 n\xe0y \u0111\u1ec1u \u0111\u01b0\u1ee3c m\u1edf ra v\xe0 m\u1ecdi ng\u01b0\u1eddi \u0111\u1ec1u c\xf3 th\u1ec3 th\u1ea5y n\xf3, v\xe0 ch\xfang \u0111\u01b0\u1ee3c g\u1ecdi l\xe0 B\xe0i Chung\n\u2022 \u0110\u1ee3t chia B\xe0i Chung \u0111\u1ea7u ti\xean s\u1ebd l\xe0 3 l\xe1, \u0111\u1ee3t th\u1ee9 2 v\xe0 \u0111\u1ee3t chia cu\u1ed1i c\xf9ng, m\u1ed7i \u0111\u1ee3t l\xe0 1 l\xe1. V\xe0 qua m\u1ed7i \u0111\u1ee3t \u0111\xf3, ng\u01b0\u1eddi ch\u01a1i s\u1ebd c\xf3 quy\u1ec1n \u0111\u1eb7t c\u01b0\u1ee3c, nh\u01b0 v\u1eady t\xednh c\u1ea3 v\xf2ng \u0111\u1ea7u ti\xean khi ch\u1ec9 m\u1edbi c\xf3 2 l\xe1 b\xe0i, l\xe0 t\u1ed5ng c\u1ed9ng s\u1ebd c\xf3 4 v\xf2ng c\u01b0\u1ee3c cho nh\u1eefng ng\u01b0\u1eddi ch\u01a1i.\n";
        lbGuides[2].string = "C\xc1C K\xdd HI\u1ec6U TRONG POKER:";
        lbGuides[3].string = "\u2022 Dealer(D) s\u1ebd lu\xe2n phi\xean thay \u0111\u1ed5i theo chi\u1ec1u kim \u0111\u1ed3ng h\u1ed3 trong nh\u1eefng v\xe1n ti\u1ebfp theo.\n\u2022 Small Blind(SB) ng\u01b0\u1eddi ng\u1ed3i ngay b\xean tr\xe1i Dealer (theo chi\u1ec1u kim \u0111\u1ed3ng h\u1ed3).\n\u2022 Big Blind(BB) ng\u01b0\u1eddi ng\u1ed3i k\u1ebf b\xean tr\xe1i SB.\n\u2022 Sau m\u1ed7i v\xe1n ch\u01a1i ng\u01b0\u1eddi SB v\xe0 BB s\u1ebd thay \u0111\u1ed5i theo ng\u01b0\u1eddi Dealer. Tr\u01b0\u1edbc khi chia 2 l\xe1 b\xe0i \u0111\u1ea7u ti\xean, s\u1ebd c\xf3 2 ng\u01b0\u1eddi b\u1eaft bu\u1ed9c ph\u1ea1t \u0111\u1eb7t c\u01b0\u1ee3c tr\u01b0\u1edbc ti\xean l\xe0 Small Blind v\xe0 Big Blind.\n\u2022 Ng\u01b0\u1eddi \u0111\u1ea7u ti\xean c\u01b0\u1ee3c 1/10 T\u1ea9y g\u1ecdi l\xe0 Small Blind, ng\u01b0\u1eddi th\u1ee9 hai c\u01b0\u1ee3c 2/10 T\u1ea9y (c\u01b0\u1ee3c g\u1ea5p \u0111\xf4i ng\u01b0\u1eddi \u0111\u1ea7u ti\xean) g\u1ecdi l\xe0 Big Blind.\n\u2022 POT l\xe0 t\u1ea5t c\u1ea3 ti\u1ec1n c\u01b0\u1ee3c sau m\u1ed7i v\xf2ng c\u01b0\u1ee3c \u0111\u01b0\u1ee3c gom chung l\xe0 m\u1ed9t ch\u1ed7.\n";
        lbGuides[4].string = "T\xcdNH TI\u1ec0N:";
        lbGuides[5].string = "\u2022 Ng\u01b0\u1eddi ch\u01a1i s\u1edf h\u1eefu t\u1ed5 h\u1ee3p b\xe0i m\u1ea1nh nh\u1ea5t (k\u1ebft h\u1ee3p t\u1eeb b\xe0i t\u1ea9y v\xe0 b\xe0i chung tr\xean b\xe0n) s\u1ebd l\xe0 ng\u01b0\u1eddi chi\u1ebfn th\u1eafng.\n\u2022 V\xe1n b\xe0i c\u0169ng c\xf3 th\u1ec3 k\u1ebft th\xfac b\u1ea5t c\u1ee9 l\xfac n\xe0o, khi c\xf3 ng\u01b0\u1eddi T\u1ed1 v\xe0 t\u1ea5t c\u1ea3 ng\u01b0\u1eddi kh\xe1c \u0111\u1ec1u b\u1ecf b\xe0i kh\xf4ng theo khi \u0111\xf3 ng\u01b0\u1eddi T\u1ed1 l\xe0 ng\u01b0\u1eddi th\u1eafng.\n\u2022 M\u1ed9t v\xf2ng c\u01b0\u1ee3c ch\u1ec9 k\u1ebft th\xfac khi ti\u1ec1n c\u01b0\u1ee3c c\u1ee7a t\u1ea5t c\u1ea3 m\u1ecdi ng\u01b0\u1eddi \u0111\u1ec1u ngang b\u1eb1ng nhau v\xe0 kh\xf4ng ai T\u1ed1 ti\u1ebfp.\n\u2022 Ng\u01b0\u1eddi chi\u1ebfn th\u1eafng s\u1ebd \u0103n to\xe0n b\u1ed9 ti\u1ec1n c\u01b0\u1ee3c c\u1ee7a m\u1ecdi ng\u01b0\u1eddi (POT).\n\u2022 Tr\u01b0\u1eddng h\u1ee3p b\u1ea1n \u0111\xe3 c\u01b0\u1ee3c h\u1ebft ti\u1ec1n tr\u01b0\u1edbc m\u1ecdi ng\u01b0\u1eddi (All-in) th\xec ch\u1ec9 c\xf3 th\u1ec3 \u0103n \u0111\u01b0\u1ee3c s\u1ed1 ti\u1ec1n trong Pot t\xednh \u0111\u1ebfn th\u1eddi \u0111i\u1ec3m T\u1ea5t tay.\n";
        lbGuides[6].string = "L\u1ef0A CH\u1eccN C\u1ee6A NG\u01af\u1edcI CH\u01a0I \u1ede M\u1ed6I V\xd2NG C\u01af\u1ee2C:";
        lbGuides[7].string = "\u2022 \xdap B\xe0i (Fold): B\u1ecf b\xe0i \u1edf v\xe1n \u0111\xf3 v\xe0 ch\u1edd v\xe1n b\xe0i m\u1edbi.\n\u2022 T\u1ed1 (Raise): Ng\u01b0\u1eddi ch\u01a1i mu\u1ed1n c\u01b0\u1ee3c th\xeam.\n\u2022 T\u1ed1 T\u1ea5t (All-in): Khi ng\u01b0\u1eddi ch\u01a1i c\u01b0\u1ee3c hay T\u1ed1 to\xe0n b\u1ed9 s\u1ed1 ti\u1ec1n m\xecnh \u0111ang c\xf3 th\xec g\u1ecdi l\xe0 T\u1ed1 t\u1ea5t hay T\u1ea5t tay.\n\u2022 Theo (Call): B\u1ecf ra m\u1ed9t s\u1ed1 ti\u1ec1n b\u1eb1ng ng\u01b0\u1eddi ch\u01a1i tr\u01b0\u1edbc \u0111\xe3 c\u01b0\u1ee3c.\n\u2022 Xem (Check): Khi ch\u01b0a c\xf3 ai c\u01b0\u1ee3c, ng\u01b0\u1eddi ch\u01a1i kh\xf4ng mu\u1ed1n c\u01b0\u1ee3c v\xe0 ch\u1edd xem h\xe0nh \u0111\u1ed9ng c\u1ee7a ng\u01b0\u1eddi k\u1ebf ti\u1ebfp.\n";
        super.show();
        this.scrollPopupGuide.scrollToTop(0);
      }
    };
    PokerPopupGuide.instance = null;
    __decorate([ property(cc.ScrollView) ], PokerPopupGuide.prototype, "scrollPopupGuide", void 0);
    PokerPopupGuide = PokerPopupGuide_1 = __decorate([ ccclass ], PokerPopupGuide);
    exports.default = PokerPopupGuide;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/App": void 0,
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/common/Dialog": void 0
  } ]
}, {}, [ "Poker.CardUtil", "Poker.Cmd", "Poker.Constant", "Poker.Controller", "Poker.ItemRoom", "Poker.NetworkClient", "Poker.Player", "Poker.PopupGuide" ]);