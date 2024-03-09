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
  "BaCay.CardUtil": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2a9298AFAtMALw5rLYRifA2", "BaCay.CardUtil");
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
        static getNormalName(a) {
          var b = -1;
          b = 4 > a ? 11 : 8 > a ? 12 : Math.floor(a / 4) - 2;
          a = Math.floor(a % 4);
          3 == a ? a = 2 : 2 == a && (a = 3);
          let typeCard = "";
          return 4 * b + a;
        }
      }
      common.CardUtils = CardUtils;
    })(common = exports.common || (exports.common = {}));
    exports.default = common.CardUtils;
    cc._RF.pop();
  }, {} ],
  "BaCay.Cmd": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "620d7luvxtKga1ndG6kqqBK", "BaCay.Cmd");
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
      Code.MO_BAI = 3101;
      Code.BAT_DAU = 3102;
      Code.KET_THUC = 3103;
      Code.YEU_CAU_DANH_BIEN = 3104;
      Code.CHIA_BAI = 3105;
      Code.KE_CUA = 3106;
      Code.TU_DONG_BAT_DAU = 3107;
      Code.DONG_Y_DANH_BIEN = 3108;
      Code.DAT_CUOC = 3109;
      Code.THONG_TIN_BAN_CHOI = 3110;
      Code.DANG_KY_THOAT_PHONG = 3111;
      Code.VAO_GA = 3112;
      Code.DOI_CHUONG = 3113;
      Code.MOI_DAT_CUOC = 3114;
      Code.CHEAT_CARDS = 3115;
      Code.DANG_KY_CHOI_TIEP = 3116;
      Code.UPDATE_OWNER_ROOM = 3117;
      Code.JOIN_ROOM_SUCCESS = 3118;
      Code.LEAVE_GAME = 3119;
      Code.NOTIFY_KICK_FROM_ROOM = 3120;
      Code.NEW_USER_JOIN = 3121;
      Code.NOTIFY_USER_GET_JACKPOT = 3122;
      Code.UPDATE_MATCH = 3123;
      Code.CARDS_DEFINE = 3999;
      Code.PLAYER_STATUS_OUT_GAME = 0;
      Code.PLAYER_STATUS_VIEWER = 1;
      Code.PLAYER_STATUS_SITTING = 2;
      Code.PLAYER_STATUS_PLAYING = 3;
      Code.MAX_PLAYER = 8;
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
      class SendVaoGa extends Network_OutPacket_1.default {
        constructor() {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.VAO_GA);
          this.packHeader();
          this.updateSize();
        }
      }
      cmd.SendVaoGa = SendVaoGa;
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
      class CmdSendDatCuoc extends Network_OutPacket_1.default {
        constructor(a) {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.DAT_CUOC);
          this.packHeader();
          this.putByte(a);
          this.updateSize();
        }
      }
      cmd.CmdSendDatCuoc = CmdSendDatCuoc;
      class CmdSendDanhBien extends Network_OutPacket_1.default {
        constructor(a, b) {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.YEU_CAU_DANH_BIEN);
          this.packHeader();
          this.putByte(a);
          this.putByte(b);
          this.updateSize();
        }
      }
      cmd.CmdSendDanhBien = CmdSendDanhBien;
      class CmdSendKeCua extends Network_OutPacket_1.default {
        constructor(a, b) {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.KE_CUA);
          this.packHeader();
          this.putByte(a);
          this.putByte(b);
          this.updateSize();
        }
      }
      cmd.CmdSendKeCua = CmdSendKeCua;
      class CmdSendAcceptDanhBien extends Network_OutPacket_1.default {
        constructor(a) {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.DONG_Y_DANH_BIEN);
          this.packHeader();
          this.putByte(a);
          this.updateSize();
        }
      }
      cmd.CmdSendAcceptDanhBien = CmdSendAcceptDanhBien;
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
          var a = 0;
          this.cardSize = this.getShort();
          this.cards = [];
          for (a = 0; a < this.cardSize; a++) this.cards.push(this.getByte());
          this.matchId = this.getInt();
          this.timeChiaBai = this.getByte();
        }
      }
      cmd.ReceivedChiaBai = ReceivedChiaBai;
      class ReceivedFirstTurnDecision extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.isRandom = this.getBool();
          this.chair = this.getByte();
          this.cardSize = this.getShort();
          this.cards = [];
          for (let i = 0; i < this.cardSize; i++) this.cards.push(this.getByte());
        }
      }
      cmd.ReceivedFirstTurnDecision = ReceivedFirstTurnDecision;
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
      class ReceivedBaCayConfig extends Network_InPacket_1.default {
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
      cmd.ReceivedBaCayConfig = ReceivedBaCayConfig;
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
      class ReceivedYeuCauDanhBien extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.danhBienChair = this.getByte();
          this.level = this.getByte();
        }
      }
      cmd.ReceivedYeuCauDanhBien = ReceivedYeuCauDanhBien;
      class ReceivedChapNhanDanhBien extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.danhBienChair = this.getByte();
          this.level = this.getByte();
        }
      }
      cmd.ReceivedChapNhanDanhBien = ReceivedChapNhanDanhBien;
      class ReceivedKeCua extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.chairKeCuaFrom = this.getByte();
          this.chairKeCuaTo = this.getByte();
          this.level = this.getByte();
        }
      }
      cmd.ReceivedKeCua = ReceivedKeCua;
      class ReceivedVaoGa extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.chair = this.getByte();
          this.chicKenBet = this.getLong();
        }
      }
      cmd.ReceivedVaoGa = ReceivedVaoGa;
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
          var a = 0;
          var b = this.getShort();
          this.statusList = [];
          for (a = 0; a < b; a++) this.statusList.push(this.getByte());
          this.cardList = [];
          for (a = 0; a < this.statusList.length; a++) {
            b = [];
            if (3 == this.statusList[a]) for (var c = this.getShort(), d = 0; d < c; d++) b.push(this.getByte());
            this.cardList.push(b);
          }
          this.tienThangChuong = this.getLong();
          this.tienThangGa = this.getLong();
          this.keCuaMoneyList = [];
          this.danhBienMoneyList = [];
          b = this.getShort();
          for (a = 0; a < b; a++) this.keCuaMoneyList.push(this.getLong());
          b = this.getShort();
          for (a = 0; a < b; a++) this.danhBienMoneyList.push(this.getLong());
          this.tongTienCuoiVan = this.getLong();
          this.tongTienCuocList = [];
          this.tongDanhBienList = [];
          this.tongKeCuaList = [];
          this.tongCuocGaList = [];
          this.tongCuoiVanList = [];
          this.currentMoneyList = [];
          this.getShort();
          for (a = 0; a < Code.MAX_PLAYER; a++) b = 0, 3 == this.statusList[a] && (b = this.getLong()), 
          this.tongTienCuocList.push(b);
          this.getShort();
          for (a = 0; a < Code.MAX_PLAYER; a++) b = 0, 3 == this.statusList[a] && (b = this.getLong()), 
          this.tongDanhBienList.push(b);
          this.getShort();
          for (a = 0; a < Code.MAX_PLAYER; a++) b = 0, 3 == this.statusList[a] && (b = this.getLong()), 
          this.tongKeCuaList.push(b);
          this.getShort();
          for (a = 0; a < Code.MAX_PLAYER; a++) b = 0, 3 == this.statusList[a] && (b = this.getLong()), 
          this.tongCuocGaList.push(b);
          this.getShort();
          for (a = 0; a < Code.MAX_PLAYER; a++) b = 0, 3 == this.statusList[a] && (b = this.getLong()), 
          this.tongCuoiVanList.push(b);
          this.getShort();
          for (a = 0; a < Code.MAX_PLAYER; a++) b = 0, 3 == this.statusList[a] && (b = this.getLong()), 
          this.currentMoneyList.push(b);
          this.timeEndGame = this.getByte();
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
          var a = this.getShort();
          this.cards = [];
          for (var b = 0; b < a; b++) this.cards.push(this.getByte());
          this.cuocDanhBienList = [];
          a = this.getShort();
          for (b = 0; b < a; b++) this.cuocDanhBienList[b] = this.getInt();
          this.cuocKeCuaList = [];
          a = this.getShort();
          for (b = 0; b < a; b++) this.cuocKeCuaList[b] = this.getInt();
          this.gameServerState = this.getByte();
          this.isAutoStart = this.getBool();
          this.gameAction = this.getByte();
          this.countDownTime = this.getByte();
          this.moneyType = this.getByte();
          this.moneyBet = this.getLong();
          this.matchId = this.getInt();
          this.roomId = this.getInt();
          this.hasInfo = [];
          a = this.getShort();
          for (b = 0; b < a; b++) this.hasInfo[b] = this.getBool();
          this.players = [];
          for (b = 0; b < Code.MAX_PLAYER; b++) this.hasInfo[b] ? (this.players[b] = [], this.players[b].status = this.getByte(), 
          this.players[b].money = this.getLong(), this.players[b].cuocGa = this.getInt(), 
          this.players[b].cuocChuong = this.getInt(), this.players[b].avatar = this.getString(), 
          this.players[b].nickName = this.getString()) : (this.players[b] = [], this.players[b].status = 0);
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
  "BaCay.Controller": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d8c0clk/LdHK5HHnJP3Kgny", "BaCay.Controller");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var BaCayController_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const BroadcastReceiver_1 = require("../../Main/Game/src/common/BroadcastReceiver");
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const App_1 = require("../../Main/Game/src/common/App");
    const Network_InPacket_1 = require("../../Main/Game/src/networks/Network.InPacket");
    const Network_Cmd_1 = require("../../Main/Game/src/networks/Network.Cmd");
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    const BaCay_Cmd_1 = require("./BaCay.Cmd");
    const BaCay_NetworkClient_1 = require("./BaCay.NetworkClient");
    const BaCay_CardUtil_1 = require("./BaCay.CardUtil");
    const CardGame_Cmd_1 = require("../../Main/Game/src/networks/CardGame.Cmd");
    const PopupCardDefinations_1 = require("../../Main/Game/src/games/cardgames/PopupCardDefinations");
    const PopupChatInGame_1 = require("../../Main/Game/src/games/cardgames/PopupChatInGame");
    const CustomUI_SliderBet_1 = require("../../Main/Game/src/customui/CustomUI.SliderBet");
    const BaCay_Player_1 = require("./BaCay.Player");
    const PopupSettingInGame_1 = require("../../Main/Game/src/games/cardgames/PopupSettingInGame");
    var configPlayer = [];
    let defaultPlayerPos = [ [ 0, 1, 2, 3, 4, 5, 6, 7 ], [ 1, 2, 3, 4, 5, 6, 7, 0 ], [ 2, 3, 4, 5, 6, 7, 0, 1 ], [ 3, 4, 5, 6, 7, 0, 1, 2 ], [ 4, 5, 6, 7, 0, 1, 2, 3 ], [ 5, 6, 7, 0, 1, 2, 3, 4 ], [ 6, 7, 0, 1, 2, 3, 4, 5 ], [ 7, 0, 1, 2, 3, 4, 5, 6 ] ];
    const {ccclass: ccclass, property: property} = cc._decorator;
    let BaCayController = BaCayController_1 = class BaCayController extends cc.Component {
      constructor() {
        super(...arguments);
        this.UI_ChooseRoom = null;
        this.labelNickName = null;
        this.sprAvatar = null;
        this.labelCoin = null;
        this.contentListRooms = null;
        this.prefabItemRoom = null;
        this.isInitedUIRoom = false;
        this.UI_Playing = null;
        this.meCards = null;
        this.groupPlayers = null;
        this.spriteCards = [];
        this.spriteCardBack = null;
        this.matchPot = null;
        this.labelMatchPot = null;
        this.cardsDeal = null;
        this.chooseBet = null;
        this.btnBet = null;
        this.btnOpenCard = null;
        this.hubChips = null;
        this.labelRoomId = null;
        this.labelRoomBet = null;
        this.labelMatchId = null;
        this.actionBetting = null;
        this.sliderBet = null;
        this.popupMatchResult = null;
        this.contentMatchResult = null;
        this.prefabItemResult = null;
        this.scrollMatchResult = null;
        this.notifyTimeStart = null;
        this.notifyTimeEnd = null;
        this.notifyTimeBet = null;
        this.popupNodity = null;
        this.labelNotifyContent = null;
        this.popupGuide = null;
        this.btnShowCardDefinations = null;
        this.seatOwner = null;
        this.currentRoomBet = null;
        this.gameState = null;
        this.currentCard = null;
        this.numCardOpened = 0;
        this.arrBetValue = [];
        this.currentMatchPotValue = 0;
        this.cardDefinations = [];
        this.isClickBack = false;
      }
      onLoad() {
        BaCayController_1.instance = this;
        this.initConfigPlayer();
      }
      start() {
        this.showUIRooms();
        this.UI_Playing.active = false;
        this.seatOwner = -1;
        this.isClickBack = false;
        App_1.default.instance.showErrLoading("\u0110ang k\u1ebft n\u1ed1i t\u1edbi server...");
        BaCay_NetworkClient_1.default.getInstance().addOnOpen(() => {
          App_1.default.instance.showErrLoading("\u0110ang \u0111ang \u0111\u0103ng nh\u1eadp...");
          BaCay_NetworkClient_1.default.getInstance().send(new Network_Cmd_1.default.SendLogin(Configs_1.default.Login.Nickname, Configs_1.default.Login.AccessToken));
        }, this);
        BaCay_NetworkClient_1.default.getInstance().addOnClose(() => {
          this.isClickBack || !Configs_1.default.Login.IsLogin ? this.backToLobby() : App_1.default.instance.alertDialog.showMsgWithOnDismissed("B\u1ea1n \u0111\xe3 m\u1ea5t k\u1ebft n\u1ed1i v\u1edbi server", () => {
            this.backToLobby();
          });
        }, this);
        BaCay_NetworkClient_1.default.getInstance().connect();
        BroadcastReceiver_1.default.register(BroadcastReceiver_1.default.USER_DISCONNECTED, data => {
          BaCay_NetworkClient_1.default.getInstance().close();
        }, this);
        BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.ON_SHOW_ANIM_CHANGED, this.node);
      }
      joinRoom(info) {
        App_1.default.instance.showLoading(true);
        BaCay_NetworkClient_1.default.getInstance().send(new BaCay_Cmd_1.default.SendJoinRoomById(info["id"]));
      }
      refeshListRoom() {
        this.contentListRooms.removeAllChildren(true);
        BaCay_NetworkClient_1.default.getInstance().send(new CardGame_Cmd_1.default.SendMoneyBetConfig());
      }
      showUIRooms() {
        this.UI_ChooseRoom.active = true;
        if (this.isInitedUIRoom) BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN); else {
          this.labelNickName.string = Configs_1.default.Login.Nickname;
          this.sprAvatar.spriteFrame = App_1.default.instance.getAvatarSpriteFrame(Configs_1.default.Login.Avatar);
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
        let arrRoomOkMoney = [];
        for (let index = 0; index < this.contentListRooms.childrenCount; index++) {
          let roomItem = this.contentListRooms.children[index].getComponent("ItemRoom");
          roomItem.roomInfo["requiredMoney"] < Configs_1.default.Login.Coin && arrRoomOkMoney.push(index);
        }
        if (arrRoomOkMoney.length > 0) {
          let roomCrowed = arrRoomOkMoney[0];
          for (let index = 0; index < arrRoomOkMoney.length; index++) {
            let roomItem = this.contentListRooms.children[arrRoomOkMoney[index]].getComponent("ItemRoom");
            let roomItemCrowed = this.contentListRooms.children[roomCrowed].getComponent("ItemRoom");
            roomItem.roomInfo["userCount"] > roomItemCrowed.roomInfo["userCount"] && (roomCrowed = arrRoomOkMoney[index]);
          }
          let roomChoosed = this.contentListRooms.children[roomCrowed].getComponent("ItemRoom");
          BaCay_NetworkClient_1.default.getInstance().send(new BaCay_Cmd_1.default.CmdJoinRoom(Configs_1.default.App.MONEY_TYPE, roomChoosed.roomInfo.maxUserPerRoom, roomChoosed.roomInfo.moneyBet));
        } else App_1.default.instance.actiontDialog.showMsgWithAction("S\u1ed1 d\u01b0 kh\xf4ng \u0111\u1ee7.", "N\u1ea0P NGAY", () => {
          App_1.default.instance.openShop(0);
        });
      }
      showUIChat() {
        PopupChatInGame_1.default.createAndShow(this.UI_Playing, this.cardDefinations, (chatType, content) => {
          BaCay_NetworkClient_1.default.getInstance().send(new BaCay_Cmd_1.default.SendChatRoom(chatType, content));
        }, (cheatType, cardCheatIds) => {
          BaCay_NetworkClient_1.default.getInstance().send(new BaCay_Cmd_1.default.SendCheatCards(cheatType, cardCheatIds));
        });
      }
      showPopupGuide() {
        this.popupGuide.active = true;
      }
      closePopupGuide() {
        this.popupGuide.active = false;
      }
      actBack() {
        this.isClickBack = true;
        BaCay_NetworkClient_1.default.getInstance().close();
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
        this.closePopupMatchResult();
        for (let index = 1; index < 8; index++) this.getPlayerHouse(index).showPopupBet(false);
        let chuongChair = data["chuongChair"];
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
        this.labelRoomId.string = "" + roomId;
        this.labelRoomBet.string = Utils_1.default.formatNumber(moneyBet);
        this.labelMatchId.string = "" + matchId;
        this.currentRoomBet = moneyBet;
        this.gameState = gameAction;
        configPlayer[0].playerId = Configs_1.default.Login.Nickname;
        configPlayer[0].playerPos = myChair;
        var numPlayers = 0;
        var arrPlayerPosExist = [];
        var arrPlayerInfo = [];
        var arrPlayerStatus = [];
        this.arrBetValue = [];
        for (let index = 0; index < 4; index++) this.arrBetValue.push(this.currentRoomBet * (index + 1));
        for (let index = 0; index < playerInfos.length; index++) if ("" !== playerInfos[index].nickName) {
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
            if (arrPlayerStatus[findPos] == BaCay_Cmd_1.default.Code.PLAYER_STATUS_SITTING || arrPlayerStatus[findPos] == BaCay_Cmd_1.default.Code.PLAYER_STATUS_PLAYING) {
              configPlayer[index].isViewer = false;
              this.getPlayerHouse(seatId).setIsViewer(false);
            } else {
              configPlayer[index].isViewer = true;
              this.getPlayerHouse(seatId).setIsViewer(true);
            }
            this.setupSeatPlayer(seatId, arrPlayerInfo[findPos]);
          } else {
            this.getPlayerHouse(seatId).showBtnInvite(true);
            configPlayer[index].isViewer = true;
          }
        }
        for (let index = 0; index < 8; index++) this.getPlayerHouse(index).setOwner(false);
        let seatOwner = this.findPlayerSeatByPos(chuongChair);
        if (-1 !== seatOwner) {
          this.getPlayerHouse(seatOwner).setOwner(true);
          this.seatOwner = seatOwner;
        }
        let msg = "";
        switch (this.gameState) {
         case 1:
          msg = "B\u1eaft \u0111\u1ea7u v\xe1n m\u1edbi";
          break;

         case 2:
          msg = "B\u1eaft \u0111\u1ea7u \u0111\u1eb7t c\u1eeda";
          break;

         case 3:
          break;

         case 4:
          msg = "Nh\xe0 c\xe1i c\xe2n ti\u1ec1n, ho\xe0n ti\u1ec1n";
          break;

         case 5:
          msg = "B\u1eaft \u0111\u1ea7u ho\xe0n ti\u1ec1n";
          break;

         case 6:
          msg = "B\u1eaft \u0111\u1ea7u tr\u1ea3 th\u01b0\u1edfng";
        }
        "" != msg;
      }
      startBettingCountDown(turnTime) {
        let timeBet = turnTime;
        this.actionBetting.active = true;
        this.actionBetting.children[1].getComponent(cc.Sprite).fillRange = Number((timeBet / turnTime).toFixed(1));
        let intervalBetting = () => {
          timeBet--;
          this.actionBetting.children[1].getComponent(cc.Sprite).fillRange = Number((timeBet / turnTime).toFixed(1));
          if (timeBet <= 0) {
            this.unschedule(intervalBetting);
            this.actionBetting.active = false;
          }
        };
        this.schedule(intervalBetting, 1);
      }
      openMeCard(event, itemId) {
        let cardPos = parseInt(itemId);
        this.getPlayerHouse(0).prepareCardReal(cardPos);
        let spriteCardId = this.currentCard[cardPos];
        this.getPlayerHouse(0).transformToCardReal(cardPos, this.spriteCards[spriteCardId]);
        this.numCardOpened += 1;
        if (3 == this.numCardOpened) {
          this.btnOpenCard.active = true;
          this.chooseBet.active = false;
          this.getPlayerHouse(0).showCardName(this.getCardsScore(this.currentCard) + " \u0110i\u1ec3m");
          this.scheduleOnce(() => {
            this.getPlayerHouse(0).resetCardReady();
          }, .2);
        }
      }
      getCardsScore(arrCards) {
        let score = 0;
        for (let a = 0; a < 3; a++) score += BaCay_CardUtil_1.default.getDiemById(arrCards[a]);
        score %= 10;
        0 == score && (score = 10);
        return score;
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
        var arrFromX = [ 70, 280, 280, 260, 100, -260, -375, -360 ];
        var arrFromY = [ -195, -150, -55, 70, 90, 85, -30, -155 ];
        for (let index = 0; index < 8; index++) {
          this.hubChips.children[2 * index].setPosition(cc.v2(arrFromX[index], arrFromY[index]));
          this.hubChips.children[2 * index + 1].setPosition(cc.v2(arrFromX[index], arrFromY[index]));
        }
        for (let index = 0; index < 16; index++) this.hubChips.children[index].active = false;
      }
      showPopupMatchResult(data) {
        this.popupMatchResult.active = true;
        this.contentMatchResult.removeAllChildren(true);
        for (let index = 0; index < data.length; index++) {
          let item = cc.instantiate(this.prefabItemResult);
          item.getComponent("BaCay.ItemResult").initItem(data[index]);
          this.contentMatchResult.addChild(item);
        }
        this.scrollMatchResult.scrollToTop(.2);
      }
      closePopupMatchResult() {
        this.popupMatchResult.active = false;
      }
      setupListener() {
        BaCay_NetworkClient_1.default.getInstance().addListener(data => {
          let inpacket = new Network_InPacket_1.default(data);
          switch (inpacket.getCmdId()) {
           case BaCay_Cmd_1.default.Code.LOGIN:
            App_1.default.instance.showLoading(false);
            this.refeshListRoom();
            BaCay_NetworkClient_1.default.getInstance().send(new BaCay_Cmd_1.default.CmdReconnectRoom());
            break;

           case BaCay_Cmd_1.default.Code.TOPSERVER:
            {
              App_1.default.instance.showLoading(false);
              let res = new BaCay_Cmd_1.default.ReceivedTopServer(data);
              cc.log(res);
            }
            break;

           case BaCay_Cmd_1.default.Code.CMD_PINGPONG:
           case BaCay_Cmd_1.default.Code.CMD_JOIN_ROOM:
           case BaCay_Cmd_1.default.Code.CMD_RECONNECT_ROOM:
           case BaCay_Cmd_1.default.Code.CMD_RECONNECT_ROOM:
            App_1.default.instance.showLoading(false);
            break;

           case BaCay_Cmd_1.default.Code.MONEY_BET_CONFIG:
            {
              App_1.default.instance.showLoading(false);
              let res = new CardGame_Cmd_1.default.ResMoneyBetConfig(data);
              cc.log(res);
              this.initRooms(res.list);
            }
            break;

           case BaCay_Cmd_1.default.Code.JOIN_ROOM_FAIL:
            {
              App_1.default.instance.showLoading(false);
              let res = new BaCay_Cmd_1.default.ReceivedJoinRoomFail(data);
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

           case BaCay_Cmd_1.default.Code.GET_LIST_ROOM:
            break;

           case BaCay_Cmd_1.default.Code.JOIN_GAME_ROOM_BY_ID:
            App_1.default.instance.showLoading(false);
            break;

           case BaCay_Cmd_1.default.Code.MO_BAI:
            {
              App_1.default.instance.showLoading(false);
              let res = new BaCay_Cmd_1.default.ReceivedMoBai(data);
              cc.log(res);
              let chairMoBai = res["chairMoBai"];
              let cards = res["cards"];
              let seatId = this.findPlayerSeatByPos(chairMoBai);
              if (-1 != seatId && 0 != seatId) {
                this.getPlayerHouse(seatId).prepareToTransform();
                for (let a = 0; a < 3; a++) {
                  let spriteCardId = cards[a];
                  this.getPlayerHouse(seatId).transformToCardReal(a, this.spriteCards[spriteCardId]);
                }
                this.getPlayerHouse(seatId).showCardName(this.getCardsScore(cards) + " \u0110i\u1ec3m");
              }
            }
            break;

           case BaCay_Cmd_1.default.Code.BAT_DAU:
            {
              App_1.default.instance.showLoading(false);
              let res = new BaCay_Cmd_1.default.ReceivedFirstTurnDecision(data);
              cc.log(res);
              this.resetHubChips();
              this.closePopupMatchResult();
            }
            break;

           case BaCay_Cmd_1.default.Code.KET_THUC:
            {
              App_1.default.instance.showLoading(false);
              let res = new BaCay_Cmd_1.default.ReceivedEndGame(data);
              cc.log(res);
              this.notifyTimeEnd.parent.active = false;
              let cardList = res["cardList"];
              let tienThangChuong = res["tienThangChuong"];
              let tienThangGa = res["tienThangGa"];
              let keCuaMoneyList = res["keCuaMoneyList"];
              let danhBienMoneyList = res["danhBienMoneyList"];
              let tongTienCuoiVan = res["tongTienCuoiVan"];
              let tongTienCuocList = res["tongTienCuocList"];
              let tongDanhBienList = res["tongDanhBienList"];
              let tongKeCuaList = res["tongKeCuaList"];
              let tongCuocGaList = res["tongCuocGaList"];
              let tongCuoiVanList = res["tongCuoiVanList"];
              let currentMoneyList = res["currentMoneyList"];
              let timeEndGame = res["timeEndGame"];
              let posPlaying = [];
              for (let index = 0; index < 8; index++) cardList[index].length > 0 && posPlaying.push(index);
              let result = [];
              for (let index = 0; index < 8; index++) {
                let findId = posPlaying.indexOf(configPlayer[index].playerPos);
                if (-1 !== findId) {
                  let cards = cardList[posPlaying[findId]];
                  let cardReady = this.getPlayerHouse(index).node.children[2].children[0];
                  for (let a = 0; a < 3; a++) if (1 == cardReady.children[a].scale) {
                    let spriteCardId = cards[a];
                    this.getPlayerHouse(index).transformToCardReal(a, this.spriteCards[spriteCardId]);
                  }
                  this.getPlayerHouse(index).showCardName(this.getCardsScore(cards) + " \u0110i\u1ec3m");
                  result.push({
                    userName: configPlayer[index].playerId,
                    bet: tongTienCuocList[posPlaying[findId]],
                    bien: tongDanhBienList[posPlaying[findId]],
                    ke: tongKeCuaList[posPlaying[findId]],
                    ga: tongCuocGaList[posPlaying[findId]],
                    total: tongCuoiVanList[posPlaying[findId]]
                  });
                  let info = {
                    moneyChange: tongCuoiVanList[posPlaying[findId]],
                    money: currentMoneyList[posPlaying[findId]],
                    ga: tongCuocGaList[posPlaying[findId]]
                  };
                  info.moneyChange >= 0 ? this.getPlayerHouse(index).fxWin(info) : this.getPlayerHouse(index).fxLose(info);
                }
              }
              result.length > 0 && this.scheduleOnce(() => {
                this.labelMatchPot.string = "0";
                this.showPopupMatchResult(result);
              }, 4);
            }
            break;

           case BaCay_Cmd_1.default.Code.YEU_CAU_DANH_BIEN:
            {
              App_1.default.instance.showLoading(false);
              let res = new BaCay_Cmd_1.default.ReceivedYeuCauDanhBien(data);
              cc.log(res);
              let danhBienChair = res["danhBienChair"];
              let level = res["level"];
              let seatFrom = this.findPlayerSeatByPos(danhBienChair);
              let msg = configPlayer[seatFrom].playerId + " mu\u1ed1n \u0111\xe1nh bi\xean " + Utils_1.default.formatNumber(this.arrBetValue[level - 1]);
              switch (res["_error"]) {
               case 0:
                App_1.default.instance.confirmDialog.show2(msg, isConfirm => {
                  isConfirm && BaCay_NetworkClient_1.default.getInstance().send(new BaCay_Cmd_1.default.CmdSendAcceptDanhBien(this.findPlayerPosBySeat(seatFrom)));
                });
                break;

               case 1:
                App_1.default.instance.alertDialog.showMsg("B\u1ea1n \u0111\xe3 \u0111\xe1nh bi\xean v\u1edbi " + configPlayer[seatFrom].playerId + " r\u1ed3i!");
                break;

               case 2:
                App_1.default.instance.alertDialog.showMsg("B\u1ea1n kh\xf4ng \u0111\u1ee7 ti\u1ec1n \u0111\u1ec3 \u0111\xe1nh bi\xean!");
                break;

               default:
                App_1.default.instance.alertDialog.showMsg("C\xf3 l\u1ed7i \u0111\xe3 x\u1ea3y ra, h\xe3y th\u1eed l\u1ea1i sau v\xe0i gi\xe2y!");
              }
            }
            break;

           case BaCay_Cmd_1.default.Code.CHIA_BAI:
            {
              App_1.default.instance.showLoading(false);
              let res = new BaCay_Cmd_1.default.ReceivedChiaBai(data);
              cc.log(res);
              this.labelMatchId.string = "" + res.matchId;
              this.chooseBet.active = false;
              this.btnOpenCard.active = false;
              for (let index = 1; index < 8; index++) this.getPlayerHouse(index).showPopupBet(false);
              this.matchPot.getComponent(cc.Button).interactable = false;
              this.matchPot.children[0].color = cc.Color.GRAY;
              this.currentCard = res["cards"];
              this.notifyTimeEnd.parent.active = true;
              let timeEnd = res.timeChiaBai;
              let intervalEnd = () => {
                timeEnd--;
                this.notifyTimeEnd.getComponent(cc.Label).string = " K\u1ebft th\xfac sau : " + Math.floor(timeEnd % 60) + "s ";
                if (timeEnd < 1) {
                  this.unschedule(intervalEnd);
                  this.notifyTimeEnd.parent.active = false;
                }
              };
              this.schedule(intervalEnd, 1);
              var arrSeatExist = this.getNumPlayers();
              let numPlayer = arrSeatExist.length;
              for (let index = 0; index < 24; index++) {
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
                for (let index = 0; index < 24; index++) this.cardsDeal.children[index].active = false;
                for (let index = 0; index < numPlayer; index++) {
                  let seatId = arrSeatExist[index];
                  if (-1 !== seatId) {
                    0 == seatId && this.getPlayerHouse(seatId).resetCardReady();
                    this.getPlayerHouse(seatId).showCardReady(true);
                    this.getPlayerHouse(seatId).showCardReal(false);
                  }
                }
              }, timeUnderLayer);
            }
            break;

           case BaCay_Cmd_1.default.Code.KE_CUA:
            {
              App_1.default.instance.showLoading(false);
              let res = new BaCay_Cmd_1.default.ReceivedKeCua(data);
              cc.log(res);
              let chairKeCuaTo = res["chairKeCuaTo"];
              let level = res["level"];
              let seatTo = this.findPlayerSeatByPos(chairKeCuaTo);
              if (-1 != seatTo) {
                let player = this.getPlayerHouse(seatTo);
                player.addBet(this.arrBetValue[level - 1]);
              }
            }
            break;

           case BaCay_Cmd_1.default.Code.TU_DONG_BAT_DAU:
            {
              App_1.default.instance.showLoading(false);
              let res = new BaCay_Cmd_1.default.ReceivedAutoStart(data);
              cc.log(res);
              if (res.isAutoStart) {
                this.resetHubChips();
                let timeAutoStart = res.timeAutoStart;
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
                this.chooseBet.active = false;
                this.btnOpenCard.active = false;
                this.matchPot.active = false;
                this.matchPot.getComponent(cc.Button).interactable = true;
                this.matchPot.children[0].color = cc.Color.WHITE;
                this.resetPlayersPlaying();
              }
              this.closePopupMatchResult();
            }
            break;

           case BaCay_Cmd_1.default.Code.DONG_Y_DANH_BIEN:
            {
              App_1.default.instance.showLoading(false);
              let res = new BaCay_Cmd_1.default.ReceivedChapNhanDanhBien(data);
              cc.log(res);
              let danhBienChair = res.danhBienChair;
              let level = res.level;
              let seatId = this.findPlayerSeatByPos(danhBienChair);
              -1 != seatId && this.getPlayerHouse(seatId).showNotify("Cho \u0111\xe1nh bi\xean");
            }
            break;

           case BaCay_Cmd_1.default.Code.DAT_CUOC:
            {
              App_1.default.instance.showLoading(false);
              let res = new BaCay_Cmd_1.default.ReceivedDatCuoc(data);
              cc.log(res);
              let chairDatCuoc = res.chairDatCuoc;
              let level = res.level;
              let seatId = this.findPlayerSeatByPos(chairDatCuoc);
              if (-1 != seatId) {
                this.getPlayerHouse(seatId).setBet(this.arrBetValue[level - 1]);
                this.getPlayerHouse(seatId).addChips();
              }
            }
            break;

           case BaCay_Cmd_1.default.Code.THONG_TIN_BAN_CHOI:
            {
              App_1.default.instance.showLoading(false);
              let res = new BaCay_Cmd_1.default.ReceivedGameInfo(data);
              cc.log(res);
              this.closeUIRoom();
              this.showUIPlaying();
              this.closePopupMatchResult();
              let myChair = res["myChair"];
              let chuongChair = res["chuongChair"];
              let cards = res["cards"];
              let cuocDanhBienList = res["cuocDanhBienList"];
              let cuocKeCuaList = res["cuocKeCuaList"];
              let gameServerState = res["gameServerState"];
              let isAutoStart = res["isAutoStart"];
              let gameAction = res["gameAction"];
              let countDownTime = res["countDownTime"];
              let moneyType = res["moneyType"];
              let moneyBet = res["moneyBet"];
              let matchId = res["matchId"];
              let roomId = res["roomId"];
              let hasInfo = res["hasInfo"];
              let players = res["players"];
              this.labelRoomId.string = "" + roomId;
              this.labelRoomBet.string = Utils_1.default.formatNumber(moneyBet);
              this.labelMatchId.string = "" + matchId;
              this.currentRoomBet = moneyBet;
              this.arrBetValue = [];
              for (let index = 0; index < 4; index++) this.arrBetValue.push(this.currentRoomBet * (index + 1));
              this.gameState = gameAction;
              this.currentCard = cards;
              configPlayer[0].playerId = Configs_1.default.Login.Nickname;
              configPlayer[0].playerPos = myChair;
              var numPlayers = 0;
              var arrPlayerPosExist = [];
              for (let index = 0; index < hasInfo.length; index++) if (hasInfo[index]) {
                numPlayers += 1;
                arrPlayerPosExist.push(index);
              }
              for (let a = 0; a < configPlayer.length; a++) configPlayer[a].playerPos = defaultPlayerPos[myChair][a];
              for (let index = 0; index < configPlayer.length; index++) {
                let findPos = arrPlayerPosExist.indexOf(configPlayer[index].playerPos);
                var seatId = configPlayer[index].seatId;
                this.getPlayerHouse(seatId).resetPlayerInfo();
                if (findPos > -1) {
                  this.getPlayerHouse(seatId).setIsViewer(false);
                  this.setupSeatPlayer(seatId, {
                    nickName: "",
                    avatar: Utils_1.default.randomRange(1, 9),
                    money: ""
                  });
                } else {
                  this.getPlayerHouse(seatId).showBtnInvite(true);
                  configPlayer[index].isViewer = true;
                }
              }
              for (let index = 0; index < 8; index++) this.getPlayerHouse(index).setOwner(false);
              let seatOwner = this.findPlayerSeatByPos(chuongChair);
              if (-1 !== seatOwner) {
                this.getPlayerHouse(seatOwner).setOwner(true);
                this.seatOwner = seatOwner;
              }
              this.resetHubChips();
            }
            break;

           case BaCay_Cmd_1.default.Code.DANG_KY_THOAT_PHONG:
            {
              App_1.default.instance.showLoading(false);
              let res = new BaCay_Cmd_1.default.ReceivedNotifyRegOutRoom(data);
              cc.log(res);
              let outChair = res["outChair"];
              let isOutRoom = res["isOutRoom"];
              let seatId = this.findPlayerSeatByPos(outChair);
              -1 !== seatId && this.getPlayerHouse(seatId).showNotify(isOutRoom ? "S\u1eafp r\u1eddi b\xe0n !" : "Hu\u1ef7 r\u1eddi b\xe0n !");
            }
            break;

           case BaCay_Cmd_1.default.Code.VAO_GA:
            {
              App_1.default.instance.showLoading(false);
              let res = new BaCay_Cmd_1.default.ReceivedVaoGa(data);
              cc.log(res);
              let chair = res["chair"];
              let chicKenBet = res["chicKenBet"];
              let seatId = this.findPlayerSeatByPos(chair);
              if (-1 != seatId) {
                this.hubChips.children[2 * seatId].active = true;
                this.hubChips.children[2 * seatId + 1].active = true;
                this.fxMoveChips(this.hubChips.children[2 * seatId], .1, this.matchPot.x, this.matchPot.y);
                this.fxMoveChips(this.hubChips.children[2 * seatId + 1], .2, this.matchPot.x, this.matchPot.y);
                this.currentMatchPotValue += chicKenBet;
                this.labelMatchPot.string = Utils_1.default.formatNumber(this.currentMatchPotValue);
              }
            }
            break;

           case BaCay_Cmd_1.default.Code.DOI_CHUONG:
            {
              App_1.default.instance.showLoading(false);
              let res = new BaCay_Cmd_1.default.ReceivedDoiChuong(data);
              cc.log(res);
              for (let index = 0; index < 8; index++) this.getPlayerHouse(index).setOwner(false);
              let seatId = this.findPlayerSeatByPos(res["chuongChair"]);
              if (-1 != seatId) {
                this.getPlayerHouse(seatId).setOwner(true);
                this.seatOwner = seatId;
              }
            }
            break;

           case BaCay_Cmd_1.default.Code.MOI_DAT_CUOC:
            {
              App_1.default.instance.showLoading(false);
              let res = new BaCay_Cmd_1.default.ReceivedMoiDatCuoc(data);
              cc.log(res);
              this.startBettingCountDown(res.timeDatCuoc);
              this.arrBetValue = [];
              this.matchPot.active = true;
              this.currentMatchPotValue = 0;
              this.labelMatchPot.string = "0";
              for (let index = 0; index < 4; index++) this.arrBetValue.push(this.currentRoomBet * (index + 1));
              if (0 == this.seatOwner) {
                this.btnOpenCard.active = false;
                this.chooseBet.active = false;
                this.matchPot.getComponent(cc.Button).interactable = false;
                this.matchPot.children[0].color = cc.Color.GRAY;
              } else {
                this.chooseBet.active = true;
                this.btnOpenCard.active = false;
                this.matchPot.getComponent(cc.Button).interactable = true;
                this.matchPot.children[0].color = cc.Color.WHITE;
                this.sliderBet.initValue(this.currentRoomBet, this.currentRoomBet, 4 * this.currentRoomBet, betCur => {
                  let currentMeGold = this.getPlayerHouse(0).getGold();
                  this.btnBet.interactable = betCur <= currentMeGold;
                });
              }
              this.numCardOpened = 0;
            }
            break;

           case BaCay_Cmd_1.default.Code.CHEAT_CARDS:
           case BaCay_Cmd_1.default.Code.DANG_KY_CHOI_TIEP:
           case BaCay_Cmd_1.default.Code.UPDATE_OWNER_ROOM:
            App_1.default.instance.showLoading(false);
            break;

           case BaCay_Cmd_1.default.Code.JOIN_ROOM_SUCCESS:
            {
              App_1.default.instance.showLoading(false);
              let res = new BaCay_Cmd_1.default.ReceivedJoinRoomSucceed(data);
              cc.log(res);
              this.closeUIRoom();
              this.setupMatch(res);
              this.getCardDefinations();
            }
            break;

           case BaCay_Cmd_1.default.Code.LEAVE_GAME:
            {
              App_1.default.instance.showLoading(false);
              let res = new BaCay_Cmd_1.default.ReceivedUserLeaveRoom(data);
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
                  this.refeshListRoom();
                }
              }
            }
            break;

           case BaCay_Cmd_1.default.Code.NOTIFY_KICK_FROM_ROOM:
            {
              App_1.default.instance.showLoading(false);
              let res = new BaCay_Cmd_1.default.ReceivedKickOff(data);
              cc.log(res);
              this.onKickFromRoom(res.reason);
            }
            break;

           case BaCay_Cmd_1.default.Code.NEW_USER_JOIN:
            {
              App_1.default.instance.showLoading(false);
              let res = new BaCay_Cmd_1.default.ReceivedUserJoinRoom(data);
              cc.log(res);
              let info = res["info"];
              let uChair = res["uChair"];
              let uStatus = res["uStatus"];
              for (let index = 0; index < configPlayer.length; index++) if (configPlayer[index].playerPos == uChair) {
                var seat = configPlayer[index].seatId;
                this.getPlayerHouse(seat).resetPlayerInfo();
                var customPlayerInfo = {
                  avatar: info["avatar"],
                  nickName: info["nickName"],
                  money: info["money"]
                };
                this.setupSeatPlayer(seat, customPlayerInfo);
                configPlayer[index]["isViewer"] = uStatus == BaCay_Cmd_1.default.Code.PLAYER_STATUS_VIEWER;
                this.getPlayerHouse(seat).setIsViewer(uStatus == BaCay_Cmd_1.default.Code.PLAYER_STATUS_VIEWER);
              }
            }
            break;

           case BaCay_Cmd_1.default.Code.NOTIFY_USER_GET_JACKPOT:
            App_1.default.instance.showLoading(false);
            break;

           case BaCay_Cmd_1.default.Code.UPDATE_MATCH:
            {
              App_1.default.instance.showLoading(false);
              let res = new BaCay_Cmd_1.default.ReceivedUpdateMatch(data);
              cc.log(res);
              let myChair = res["myChair"];
              let hasInfo = res["hasInfo"];
              let infos = res["infos"];
              for (let index = 0; index < hasInfo.length; index++) {
                let pos = configPlayer[index]["playerPos"];
                if (hasInfo[pos]) {
                  this.getPlayerHouse(index).setGold(infos[pos]["money"]);
                  configPlayer[index]["playerId"] = infos[pos]["nickName"];
                  if (infos[pos]["status"] == BaCay_Cmd_1.default.Code.PLAYER_STATUS_SITTING || infos[pos]["status"] == BaCay_Cmd_1.default.Code.PLAYER_STATUS_PLAYING) {
                    configPlayer[index]["isViewer"] = false;
                    this.getPlayerHouse(index).setIsViewer(false);
                  } else {
                    configPlayer[index]["isViewer"] = true;
                    this.getPlayerHouse(index).setIsViewer(true);
                  }
                  this.setupSeatPlayer(index, infos[pos]);
                } else {
                  configPlayer[index]["playerId"] = -1;
                  configPlayer[index]["isViewer"] = true;
                }
              }
            }
            break;

           case BaCay_Cmd_1.default.Code.CHAT_ROOM:
            {
              App_1.default.instance.showLoading(false);
              let res = new BaCay_Cmd_1.default.ReceivedChatRoom(data);
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

           case BaCay_Cmd_1.default.Code.CARDS_DEFINE:
            {
              let res = new BaCay_Cmd_1.default.ReceivedCardDefinations(data);
              cc.log(res);
              this.receivedCardDefinations(res);
            }
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
            BaCay_NetworkClient_1.default.getInstance().send(new CardGame_Cmd_1.default.SendJoinRoom(Configs_1.default.App.MONEY_TYPE, maxUser, arrBet[index], 0));
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
        BaCay_NetworkClient_1.default.getInstance().send(new BaCay_Cmd_1.default.CmdSendRequestLeaveGame());
      }
      actionOpenCard() {
        BaCay_NetworkClient_1.default.getInstance().send(new BaCay_Cmd_1.default.CmdSendMoBai());
        this.btnOpenCard.active = false;
      }
      actionSendVaoGa() {
        BaCay_NetworkClient_1.default.getInstance().send(new BaCay_Cmd_1.default.SendVaoGa());
        this.matchPot.children[0].color = cc.Color.WHITE;
        this.matchPot.getComponent(cc.Button).interactable = false;
      }
      actionBet() {
        let rawMeGold = this.getPlayerHouse(0).userGold.string.replace(/\./g, "");
        let currentMeMoney = parseInt(rawMeGold);
        let betValue = Math.min(this.sliderBet.current_raise, currentMeMoney);
        let idex = Math.round(betValue / this.currentRoomBet);
        BaCay_NetworkClient_1.default.getInstance().send(new BaCay_Cmd_1.default.CmdSendDatCuoc(idex));
        this.chooseBet.active = false;
        for (let index = 0; index < configPlayer.length; index++) if (index !== this.seatOwner && !configPlayer[index].isViewer && -1 !== configPlayer[index].playerId && 0 != index) {
          this.getPlayerHouse(index).showPopupBet(true);
          this.getPlayerHouse(index).setupBetValue(this.currentRoomBet);
        }
      }
      actionDanhBien(event, id) {
        let seatId = parseInt(id.substring(0, 1));
        let level = parseInt(id.substring(1, 2));
        let pos = this.findPlayerPosBySeat(seatId);
        if (-1 != pos) {
          this.getPlayerHouse(seatId).disableDanhBien(level);
          this.getPlayerHouse(0).showNotify("\u0110\xe1nh bi\xean");
          BaCay_NetworkClient_1.default.getInstance().send(new BaCay_Cmd_1.default.CmdSendDanhBien(pos, level));
        }
      }
      actionKeCua(event, id) {
        let seatId = parseInt(id.substring(0, 1));
        let level = parseInt(id.substring(1, 2)) - 2;
        let pos = this.findPlayerPosBySeat(seatId);
        if (-1 != pos) {
          this.getPlayerHouse(seatId).disableKeCua(level);
          BaCay_NetworkClient_1.default.getInstance().send(new BaCay_Cmd_1.default.CmdSendKeCua(pos, level));
        }
      }
      initConfigPlayer() {
        configPlayer = [];
        for (let index = 0; index < 8; index++) configPlayer.push({
          seatId: index,
          playerId: -1,
          playerPos: -1,
          isViewer: true
        });
      }
      resetPlayersPlaying() {
        for (let index = 0; index < 8; index++) this.getPlayerHouse(index).resetMatchHistory();
      }
      setupSeatPlayer(seatId, playerInfo) {
        configPlayer[seatId].playerId = playerInfo.nickName;
        this.getPlayerHouse(seatId).setAvatar(playerInfo.avatar);
        this.getPlayerHouse(seatId).setName(playerInfo.nickName);
        this.getPlayerHouse(seatId).setGold(playerInfo.money);
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
        return this.groupPlayers.children[seatId].getComponent(BaCay_Player_1.default);
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
           case BaCay_Cmd_1.default.Code.ERROR_MONEY:
            App_1.default.instance.actiontDialog.showMsgWithAction("S\u1ed1 d\u01b0 kh\xf4ng \u0111\u1ee7.", "N\u1ea0P NGAY", () => {
              App_1.default.instance.openShop(0);
            });
            break;

           case BaCay_Cmd_1.default.Code.ERROR_BAO_TRI:
            App_1.default.instance.alertDialog.showMsg("H\u1ec7 th\u1ed1ng b\u1ea3o tr\xec!");
            break;

           default:
            App_1.default.instance.alertDialog.showMsg("B\u1ea1n b\u1ecb kick kh\u1ecfi b\xe0n ch\u01a1i!");
          }
        }, .5);
      }
      getCardDefinations() {
        BaCay_NetworkClient_1.default.getInstance().send(new BaCay_Cmd_1.default.SendCardDefinations());
      }
      receivedCardDefinations(cardsDefineData) {
        const cardObjects = JSON.parse(cardsDefineData.strData).object || [];
        cardObjects.forEach(cardObject => this.cardDefinations.push(new CardGame_Cmd_1.default.CardDefination(cardObject)));
        this.btnShowCardDefinations.node.active = (true, this.cardDefinations.length > 0);
      }
      actShowCardDefinations() {
        PopupCardDefinations_1.default.createAndShow(App_1.default.instance.popups, this.cardDefinations, this.spriteCards);
      }
      actSetting() {
        PopupSettingInGame_1.default.createAndShow(this.UI_Playing, Configs_1.default.App.BUNDLE_NAME.BACAY, () => {
          this.showPopupGuide();
        }, () => {
          this.actionLeaveRoom();
        });
      }
    };
    BaCayController.instance = null;
    __decorate([ property(cc.Node) ], BaCayController.prototype, "UI_ChooseRoom", void 0);
    __decorate([ property(cc.Label) ], BaCayController.prototype, "labelNickName", void 0);
    __decorate([ property(cc.Sprite) ], BaCayController.prototype, "sprAvatar", void 0);
    __decorate([ property(cc.Label) ], BaCayController.prototype, "labelCoin", void 0);
    __decorate([ property(cc.Node) ], BaCayController.prototype, "contentListRooms", void 0);
    __decorate([ property(cc.Prefab) ], BaCayController.prototype, "prefabItemRoom", void 0);
    __decorate([ property(cc.Node) ], BaCayController.prototype, "UI_Playing", void 0);
    __decorate([ property(cc.Node) ], BaCayController.prototype, "meCards", void 0);
    __decorate([ property(cc.Node) ], BaCayController.prototype, "groupPlayers", void 0);
    __decorate([ property(cc.SpriteFrame) ], BaCayController.prototype, "spriteCards", void 0);
    __decorate([ property(cc.SpriteFrame) ], BaCayController.prototype, "spriteCardBack", void 0);
    __decorate([ property(cc.Node) ], BaCayController.prototype, "matchPot", void 0);
    __decorate([ property(cc.Label) ], BaCayController.prototype, "labelMatchPot", void 0);
    __decorate([ property(cc.Node) ], BaCayController.prototype, "cardsDeal", void 0);
    __decorate([ property(cc.Node) ], BaCayController.prototype, "chooseBet", void 0);
    __decorate([ property(cc.Button) ], BaCayController.prototype, "btnBet", void 0);
    __decorate([ property(cc.Node) ], BaCayController.prototype, "btnOpenCard", void 0);
    __decorate([ property(cc.Node) ], BaCayController.prototype, "hubChips", void 0);
    __decorate([ property(cc.Label) ], BaCayController.prototype, "labelRoomId", void 0);
    __decorate([ property(cc.Label) ], BaCayController.prototype, "labelRoomBet", void 0);
    __decorate([ property(cc.Label) ], BaCayController.prototype, "labelMatchId", void 0);
    __decorate([ property(cc.Node) ], BaCayController.prototype, "actionBetting", void 0);
    __decorate([ property(CustomUI_SliderBet_1.default) ], BaCayController.prototype, "sliderBet", void 0);
    __decorate([ property(cc.Node) ], BaCayController.prototype, "popupMatchResult", void 0);
    __decorate([ property(cc.Node) ], BaCayController.prototype, "contentMatchResult", void 0);
    __decorate([ property(cc.Prefab) ], BaCayController.prototype, "prefabItemResult", void 0);
    __decorate([ property(cc.ScrollView) ], BaCayController.prototype, "scrollMatchResult", void 0);
    __decorate([ property(cc.Node) ], BaCayController.prototype, "notifyTimeStart", void 0);
    __decorate([ property(cc.Node) ], BaCayController.prototype, "notifyTimeEnd", void 0);
    __decorate([ property(cc.Node) ], BaCayController.prototype, "notifyTimeBet", void 0);
    __decorate([ property(cc.Node) ], BaCayController.prototype, "popupNodity", void 0);
    __decorate([ property(cc.Label) ], BaCayController.prototype, "labelNotifyContent", void 0);
    __decorate([ property(cc.Node) ], BaCayController.prototype, "popupGuide", void 0);
    __decorate([ property(cc.Button) ], BaCayController.prototype, "btnShowCardDefinations", void 0);
    BaCayController = BaCayController_1 = __decorate([ ccclass ], BaCayController);
    exports.default = BaCayController;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/App": void 0,
    "../../Main/Game/src/common/BroadcastReceiver": void 0,
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/common/Utils": void 0,
    "../../Main/Game/src/customui/CustomUI.SliderBet": void 0,
    "../../Main/Game/src/games/cardgames/PopupCardDefinations": void 0,
    "../../Main/Game/src/games/cardgames/PopupChatInGame": void 0,
    "../../Main/Game/src/games/cardgames/PopupSettingInGame": void 0,
    "../../Main/Game/src/networks/CardGame.Cmd": void 0,
    "../../Main/Game/src/networks/Network.Cmd": void 0,
    "../../Main/Game/src/networks/Network.InPacket": void 0,
    "./BaCay.CardUtil": "BaCay.CardUtil",
    "./BaCay.Cmd": "BaCay.Cmd",
    "./BaCay.NetworkClient": "BaCay.NetworkClient",
    "./BaCay.Player": "BaCay.Player"
  } ],
  "BaCay.ItemResult": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f8789ktNuxEQY435mcEk8v1", "BaCay.ItemResult");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let BaCayItemResult = class BaCayItemResult extends cc.Component {
      constructor() {
        super(...arguments);
        this.labelUserName = null;
        this.labelBet = null;
        this.labelBien = null;
        this.labelKe = null;
        this.labelGa = null;
        this.labelTotal = null;
      }
      initItem(info) {
        this.labelUserName.string = info.userName;
        this.labelBet.string = Utils_1.default.formatNumber(info.bet);
        this.labelBien.string = Utils_1.default.formatNumber(info.bien);
        this.labelKe.string = Utils_1.default.formatNumber(info.ke);
        this.labelGa.string = Utils_1.default.formatNumber(info.ga);
        this.labelTotal.string = Utils_1.default.formatNumber(info.total);
        this.labelBet.node.color = info.bet > 0 ? cc.Color.YELLOW : cc.Color.WHITE;
        this.labelBien.node.color = info.bien > 0 ? cc.Color.YELLOW : cc.Color.WHITE;
        this.labelKe.node.color = info.ke > 0 ? cc.Color.YELLOW : cc.Color.WHITE;
        this.labelGa.node.color = info.ga > 0 ? cc.Color.YELLOW : cc.Color.WHITE;
        this.labelTotal.node.color = info.total > 0 ? cc.Color.YELLOW : cc.Color.WHITE;
      }
    };
    __decorate([ property(cc.Label) ], BaCayItemResult.prototype, "labelUserName", void 0);
    __decorate([ property(cc.Label) ], BaCayItemResult.prototype, "labelBet", void 0);
    __decorate([ property(cc.Label) ], BaCayItemResult.prototype, "labelBien", void 0);
    __decorate([ property(cc.Label) ], BaCayItemResult.prototype, "labelKe", void 0);
    __decorate([ property(cc.Label) ], BaCayItemResult.prototype, "labelGa", void 0);
    __decorate([ property(cc.Label) ], BaCayItemResult.prototype, "labelTotal", void 0);
    BaCayItemResult = __decorate([ ccclass ], BaCayItemResult);
    exports.default = BaCayItemResult;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/Utils": void 0
  } ],
  "BaCay.ItemRoom": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e07a8lBr39OXr5c0VekIC9q", "BaCay.ItemRoom");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const BaCay_Controller_1 = require("./BaCay.Controller");
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let BaCayItemRoom = class BaCayItemRoom extends cc.Component {
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
        this.labelNumPlayers.string = info["userCount"] + "/" + info["maxUserPerRoom"];
        this.progressNumPlayers.fillRange = info["userCount"] / info["maxUserPerRoom"];
      }
      chooseRoom() {
        BaCay_Controller_1.default.instance.joinRoom(this.roomInfo);
      }
    };
    __decorate([ property(cc.Label) ], BaCayItemRoom.prototype, "labelBet", void 0);
    __decorate([ property(cc.Label) ], BaCayItemRoom.prototype, "labelBetMin", void 0);
    __decorate([ property(cc.Label) ], BaCayItemRoom.prototype, "labelNumPlayers", void 0);
    __decorate([ property(cc.Sprite) ], BaCayItemRoom.prototype, "progressNumPlayers", void 0);
    BaCayItemRoom = __decorate([ ccclass ], BaCayItemRoom);
    exports.default = BaCayItemRoom;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/Utils": void 0,
    "./BaCay.Controller": "BaCay.Controller"
  } ],
  "BaCay.NetworkClient": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d86bcBhKaBPX7iIPcz+pM23", "BaCay.NetworkClient");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Network_NetworkClient_1 = require("../../Main/Game/src/networks/Network.NetworkClient");
    const Network_NetworkListener_1 = require("../../Main/Game/src/networks/Network.NetworkListener");
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    class BaCayNetworkClient extends Network_NetworkClient_1.default {
      constructor() {
        super();
        this.listeners = new Array();
        this.isUseWSS = Configs_1.default.App.USE_WSS;
      }
      static getInstance() {
        null == this.instance && (this.instance = new BaCayNetworkClient());
        return this.instance;
      }
      connect() {
        super.connect(Configs_1.default.App.HOST_BACAY.host, Configs_1.default.App.HOST_BACAY.port);
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
    exports.default = BaCayNetworkClient;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/networks/Network.NetworkClient": void 0,
    "../../Main/Game/src/networks/Network.NetworkListener": void 0
  } ],
  "BaCay.Player": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a69f2nHXcZBJ4K9vYGrZxlY", "BaCay.Player");
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
    const Utils_1 = require("../../Main/Game/src/common/Utils");
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
        this.owner = null;
        this.cardsName = null;
        this.actionAllIn = null;
        this.actionFold = null;
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
        this.popupBet = null;
        this.betted = 0;
        this.keCua = 0;
        this.timeoutNotify = null;
        this.timeoutChat = null;
      }
      start() {
        BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.SET_SOUND, this.node);
      }
      showChatEmotion(content) {
        this.node.children[7].active = true;
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
        this.node.children[7].active = true;
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
      showPopupBet(state) {
        this.popupBet.active = state;
        if (state) {
          this.popupBet.children[2].active = true;
          this.popupBet.children[3].active = true;
          this.popupBet.children[5].active = true;
          this.popupBet.children[6].active = true;
          this.setCanDanhBien(true);
          this.setCanKeCua(true);
        }
      }
      setupBetValue(bet) {
        this.popupBet.children[2].children[1].getComponent(cc.Label).string = Utils_1.default.formatNumber(bet);
        this.popupBet.children[3].children[1].getComponent(cc.Label).string = Utils_1.default.formatNumber(2 * bet);
        this.popupBet.children[5].children[1].getComponent(cc.Label).string = Utils_1.default.formatNumber(bet);
        this.popupBet.children[6].children[1].getComponent(cc.Label).string = Utils_1.default.formatNumber(2 * bet);
      }
      disableDanhBien(id) {
        1 == id ? this.popupBet.children[2].active = false : this.popupBet.children[3].active = false;
        this.setCanDanhBien(false);
      }
      disableKeCua(id) {
        1 == id ? this.popupBet.children[5].active = false : this.popupBet.children[6].active = false;
        this.setCanKeCua(false);
      }
      setCanDanhBien(state) {
        this.popupBet.children[2].getComponent(cc.Button).interactable = state;
        this.popupBet.children[3].getComponent(cc.Button).interactable = state;
      }
      setCanKeCua(state) {
        this.popupBet.children[5].getComponent(cc.Button).interactable = state;
        this.popupBet.children[6].getComponent(cc.Button).interactable = state;
      }
      showBtnInvite(state) {
        this.btnInvite.active = state;
      }
      setOwner(state) {
        this.owner.active = state;
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
        this.cardReal.children[pos].scaleX = 0;
        this.cardReal.children[pos].scaleY = 1;
      }
      transformToCardReal(cardPos, spriteCard) {
        this.showCardReal(true);
        let spCard = this.cardReal.children[cardPos].children[0].getComponent(cc.Sprite);
        if (spCard.spriteFrame === spriteCard) {
          this.cardReal.children[cardPos].scaleX = 1;
          this.cardReal.children[cardPos].scaleY = 1;
          this.cardReady.children[cardPos].scaleX = 0;
          this.cardReady.children[cardPos].scaleY = 1;
          spCard.spriteFrame = spriteCard;
          return;
        }
        spCard.spriteFrame = spriteCard;
        this.cardReady.children[cardPos].runAction(cc.sequence(cc.scaleTo(.15, 0, 1), cc.callFunc(() => {})));
        this.cardReal.children[cardPos].runAction(cc.sequence(cc.delayTime(.15), cc.scaleTo(.15, 1, 1), cc.callFunc(() => {})));
      }
      showCardName(name) {
        this.cardsName.active = true;
        this.cardsName.children[0].getComponent(cc.Label).string = name;
        this.scheduleOnce(() => {
          this.cardsName.active = false;
        }, 4.5);
      }
      setGold(data) {
        this.actionViewer.active = false;
        this.actionThinking.active = false;
        this.showGold(true);
        this.userGold.string = this.formatGold(data);
      }
      setBet(data) {
        this.showPlayerBet(true);
        this.betted = isNaN(parseInt(data)) ? 0 : parseInt(data);
        this.goldBet.string = Utils_1.default.formatMoney(this.betted);
      }
      addBet(data) {
        this.showPlayerBet(true);
        this.keCua += isNaN(parseInt(data)) ? 0 : parseInt(data);
        this.goldBet.string = Utils_1.default.formatMoney(this.betted + this.keCua) + " (k\xe9 " + Utils_1.default.formatMoney(this.keCua) + " )";
      }
      addChips() {
        var item1 = cc.instantiate(this.prefabItemChip);
        var item2 = cc.instantiate(this.prefabItemChip);
        this.hub.addChild(item1);
        this.hub.addChild(item2);
      }
      showPlayerBet(state) {
        this.node.children[5].active = state;
        state || this.hub.removeAllChildren(true);
      }
      setCardReal01(data) {
        this.cardReal.children[0].children[0].getComponent(cc.Sprite).spriteFrame = data;
      }
      setCardReal02(data) {
        this.cardReal.children[1].children[0].getComponent(cc.Sprite).spriteFrame = data;
      }
      showPlayCountdown() {
        this.node.children[4].active = true;
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
        this.node.children[3].children[2].active = state;
      }
      prepareFxAction() {
        this.showGold(false);
        this.node.children[4].active = true;
        this.resetAction();
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
        this.shadowCardReal(true);
        this.cardReal.runAction(cc.moveBy(.5, 0, -20));
      }
      showEatGa(state) {
        this.actionWin.children[3].active = state;
      }
      fxWin(playerInfo) {
        this.node.children[4].active = true;
        this.actionWin.active = true;
        this.fxGoldChange(0, playerInfo.moneyChange, this.goldWin.node);
        this.setGold(this.formatGold(playerInfo.money));
        this.showEatGa(playerInfo.ga > 0);
        this.scheduleOnce(() => {
          this.actionWin.active = false;
          this.node.children[4].active = false;
        }, 2.5);
      }
      fxLose(playerInfo) {
        this.node.children[4].active = true;
        this.actionLose.active = true;
        this.fxGoldChange(0, playerInfo.moneyChange, this.goldLose.node);
        this.setGold(this.formatGold(playerInfo.money));
        this.scheduleOnce(() => {
          this.actionLose.active = false;
          this.node.children[4].active = false;
        }, 2.5);
      }
      shadowCardReady(state) {
        this.cardReady.children[0].color = state ? cc.Color.GRAY : cc.Color.WHITE;
        this.cardReady.children[1].color = state ? cc.Color.GRAY : cc.Color.WHITE;
        this.cardReady.children[2].color = state ? cc.Color.GRAY : cc.Color.WHITE;
      }
      shadowCardReal(state) {
        this.cardReal.children[0].children[0].color = state ? cc.Color.GRAY : cc.Color.WHITE;
        this.cardReal.children[1].children[0].color = state ? cc.Color.GRAY : cc.Color.WHITE;
        this.cardReal.children[2].children[0].color = state ? cc.Color.GRAY : cc.Color.WHITE;
      }
      setCardWin(pos, state) {
        this.cardReal.children[pos].children[0].color = state ? cc.Color.WHITE : cc.Color.GRAY;
      }
      showNotify(content) {
        this.notify.active = true;
        this.notify.children[1].getComponent(cc.Label).string = content;
        this.unschedule(this.timeoutNotify);
        this.timeoutNotify = () => {
          this.notify.active = false;
        };
        this.scheduleOnce(this.timeoutNotify, 1.5);
      }
      resetAction() {
        for (let index = 0; index < this.node.children[4].childrenCount; index++) this.node.children[4].children[index].active = false;
      }
      resetMatchHistory() {
        this.resetCardReady();
        this.resetCardReal();
        this.node.children[2].active = false;
        this.showGold(true);
        this.cardsName.active = false;
        this.resetAction();
        this.node.children[5].active = false;
        this.goldBet.string = "0";
        this.betted = 0;
        this.keCua = 0;
        this.hub.removeAllChildren(true);
      }
      resetCardReady() {
        this.cardReady.children[0].scale = 1;
        this.cardReady.children[1].scale = 1;
        this.cardReady.children[2].scale = 1;
        this.cardReady.active = false;
      }
      resetCardReal() {
        this.cardReal.active = false;
        this.cardReal.y = 0;
        this.cardReal.children[0].children[0].getComponent(cc.Sprite).spriteFrame = this.spriteCardBack;
        this.cardReal.children[1].children[0].getComponent(cc.Sprite).spriteFrame = this.spriteCardBack;
        this.cardReal.children[2].children[0].getComponent(cc.Sprite).spriteFrame = this.spriteCardBack;
        this.shadowCardReal(false);
      }
      resetPlayerInfo() {
        for (let index = 0; index < this.node.childrenCount; index++) this.node.children[index].active = false;
        this.cardReal.children[0].children[0].getComponent(cc.Sprite).spriteFrame = this.spriteCardBack;
        this.cardReal.children[1].children[0].getComponent(cc.Sprite).spriteFrame = this.spriteCardBack;
        this.cardReal.children[2].children[0].getComponent(cc.Sprite).spriteFrame = this.spriteCardBack;
        this.cardReady.active = false;
        this.cardReal.active = false;
        this.cardsName.active = false;
        this.actionViewer.active = false;
        this.actionThinking.active = false;
        this.actionWin.active = false;
        this.actionLose.active = false;
        this.goldBet.string = "0";
        this.betted = 0;
        this.keCua = 0;
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
        return price ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : price;
      }
      getGold() {
        let raw = this.userGold.string.replace(/\./g, "");
        return parseInt(raw);
      }
    };
    __decorate([ property(cc.Node) ], Player.prototype, "btnInvite", void 0);
    __decorate([ property(cc.Node) ], Player.prototype, "avatar", void 0);
    __decorate([ property(cc.Node) ], Player.prototype, "cardReady", void 0);
    __decorate([ property(cc.Node) ], Player.prototype, "cardReal", void 0);
    __decorate([ property(cc.Label) ], Player.prototype, "userName", void 0);
    __decorate([ property(cc.Label) ], Player.prototype, "userGold", void 0);
    __decorate([ property(cc.Node) ], Player.prototype, "owner", void 0);
    __decorate([ property(cc.Node) ], Player.prototype, "cardsName", void 0);
    __decorate([ property(cc.Node) ], Player.prototype, "actionAllIn", void 0);
    __decorate([ property(cc.Node) ], Player.prototype, "actionFold", void 0);
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
    __decorate([ property(cc.Node) ], Player.prototype, "popupBet", void 0);
    Player = __decorate([ ccclass ], Player);
    exports.default = Player;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/App": void 0,
    "../../Main/Game/src/common/BroadcastReceiver": void 0,
    "../../Main/Game/src/common/Utils": void 0
  } ]
}, {}, [ "BaCay.CardUtil", "BaCay.Cmd", "BaCay.Controller", "BaCay.ItemResult", "BaCay.ItemRoom", "BaCay.NetworkClient", "BaCay.Player" ]);