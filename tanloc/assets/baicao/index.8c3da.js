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
  "BaiCao.CardUtil": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3fe3e/9gF9ElZ/vmUvBqR4d", "BaiCao.CardUtil");
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
          let score = Math.floor(a / 4) + 1;
          11 != score && 12 != score && 13 != score || (score = 10);
          return score;
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
  "BaiCao.Cmd": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "95fbb1H6RtD4Jqh4piu2Geo", "BaiCao.Cmd");
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
      Code.PLAYER_STATUS_OUT_GAME = 0;
      Code.PLAYER_STATUS_VIEWER = 1;
      Code.PLAYER_STATUS_SITTING = 2;
      Code.PLAYER_STATUS_PLAYING = 3;
      Code.MAX_PLAYER = 8;
      Code.ERROR_MONEY = 1;
      Code.ERROR_BAO_TRI = 2;
      cmd.Code = Code;
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
      class SendCardCheat extends Network_OutPacket_1.default {
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
      cmd.SendCardCheat = SendCardCheat;
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
      class ReceivedLogin extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          cc.log("____");
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
          this.gameId = this.getInt();
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
          this.gameId = this.getInt();
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
          this.gameId = this.getInt();
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
      class ReceivedJoinRoomFail extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
        }
      }
      cmd.ReceivedJoinRoomFail = ReceivedJoinRoomFail;
    })(cmd = exports.cmd || (exports.cmd = {}));
    exports.default = cmd;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/networks/Network.InPacket": void 0,
    "../../Main/Game/src/networks/Network.OutPacket": void 0
  } ],
  "BaiCao.Controller": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8823cz4QghOwpS4iXO2AMoB", "BaiCao.Controller");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var BaiCaoController_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const BroadcastReceiver_1 = require("../../Main/Game/src/common/BroadcastReceiver");
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const App_1 = require("../../Main/Game/src/common/App");
    const Network_InPacket_1 = require("../../Main/Game/src/networks/Network.InPacket");
    const Network_Cmd_1 = require("../../Main/Game/src/networks/Network.Cmd");
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    const BaiCao_Cmd_1 = require("./BaiCao.Cmd");
    const BaiCao_NetworkClient_1 = require("./BaiCao.NetworkClient");
    const BaiCao_CardUtil_1 = require("./BaiCao.CardUtil");
    const CardGame_Cmd_1 = require("../../Main/Game/src/networks/CardGame.Cmd");
    const PopupChatInGame_1 = require("../../Main/Game/src/games/cardgames/PopupChatInGame");
    var configPlayer = [];
    let defaultPlayerPos = [ [ 0, 1, 2, 3, 4, 5, 6, 7 ], [ 1, 2, 3, 4, 5, 6, 7, 0 ], [ 2, 3, 4, 5, 6, 7, 0, 1 ], [ 3, 4, 5, 6, 7, 0, 1, 2 ], [ 4, 5, 6, 7, 0, 1, 2, 3 ], [ 5, 6, 7, 0, 1, 2, 3, 4 ], [ 6, 7, 0, 1, 2, 3, 4, 5 ], [ 7, 0, 1, 2, 3, 4, 5, 6 ] ];
    const {ccclass: ccclass, property: property} = cc._decorator;
    let BaiCaoController = BaiCaoController_1 = class BaiCaoController extends cc.Component {
      constructor() {
        super(...arguments);
        this.UI_ChooseRoom = null;
        this.labelNickName = null;
        this.sprAvatar = null;
        this.labelCoin = null;
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
        this.btnBet = null;
        this.btnOpenCard = null;
        this.btnLeaveRoom = null;
        this.hubChips = null;
        this.labelRoomId = null;
        this.labelRoomBet = null;
        this.actionBetting = null;
        this.betChooseValue = null;
        this.betChooseValueTarget = null;
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
        this.noteChip = null;
        this.contentRaise = null;
        this.seatOwner = null;
        this.currentRoomBet = null;
        this.gameState = null;
        this.minutes = null;
        this.seconds = null;
        this.timeAutoStart = null;
        this.timeEnd = null;
        this.timeBet = null;
        this.intervalWaitting = null;
        this.intervalEnd = null;
        this.intervalBetting = null;
        this.currentCard = null;
        this.numCardOpened = 0;
        this.arrBetValue = [];
        this.arrBetPos = [ -157.5, -52.5, 52.5, 157.5 ];
        this.currentBetSelectedIndex = 0;
        this.currentMatchPotValue = 0;
        this.timeoutEndGame = null;
        this.timeoutChiaBaiDone = null;
        this.arrPosDanhBien = [];
        this.cardDefinations = [];
        this.isClickBack = false;
      }
      onLoad() {
        BaiCaoController_1.instance = this;
        this.initConfigPlayer();
      }
      start() {
        this.showUIRooms();
        this.seatOwner = -1;
        this.isClickBack = false;
        App_1.default.instance.showErrLoading("\u0110ang k\u1ebft n\u1ed1i t\u1edbi server...");
        BaiCao_NetworkClient_1.default.getInstance().addOnOpen(() => {
          App_1.default.instance.showErrLoading("\u0110ang \u0111ang \u0111\u0103ng nh\u1eadp...");
          BaiCao_NetworkClient_1.default.getInstance().send(new Network_Cmd_1.default.SendLogin(Configs_1.default.Login.Nickname, Configs_1.default.Login.AccessToken));
        }, this);
        BaiCao_NetworkClient_1.default.getInstance().addOnClose(() => {
          this.isClickBack || !Configs_1.default.Login.IsLogin ? this.backToLobby() : App_1.default.instance.alertDialog.showMsgWithOnDismissed("B\u1ea1n \u0111\xe3 m\u1ea5t k\u1ebft n\u1ed1i v\u1edbi server", () => {
            this.backToLobby();
          });
        }, this);
        BaiCao_NetworkClient_1.default.getInstance().connect();
        BroadcastReceiver_1.default.register(BroadcastReceiver_1.default.USER_DISCONNECTED, data => {
          BaiCao_NetworkClient_1.default.getInstance().close();
        }, this);
        BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.SET_SOUND, cc.find("Canvas"));
      }
      onDestroy() {
        clearTimeout(this.timeoutEndGame);
        clearTimeout(this.timeoutChiaBaiDone);
        this.unschedule(this.intervalWaitting);
        this.unschedule(this.intervalEnd);
        this.unschedule(this.intervalBetting);
      }
      joinRoom(info) {
        cc.log("BaiCao joinRoom roomInfo : ", info);
        App_1.default.instance.showLoading(true);
        BaiCao_NetworkClient_1.default.getInstance().send(new BaiCao_Cmd_1.default.SendJoinRoomById(info["id"]));
      }
      refeshListRoom() {
        this.contentListRooms.removeAllChildren(true);
        BaiCao_NetworkClient_1.default.getInstance().send(new BaiCao_Cmd_1.default.SendGetListRoom());
      }
      findRoomId() {
        cc.log("BaiCao findRoomId id : ", this.edtFindRoom.string);
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
        if (this.isInitedUIRoom) BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN); else {
          this.isInitedUIRoom = true;
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
      createRoom() {
        cc.log("BaiCao createRoom");
      }
      playingNow() {
        cc.log("BaiCao playingNow");
        let arrRoomOkMoney = [];
        for (let index = 0; index < this.contentListRooms.childrenCount; index++) {
          let roomItem = this.contentListRooms.children[index].getComponent("ItemRoom");
          roomItem.roomInfo["requiredMoney"] < Configs_1.default.Login.Coin && arrRoomOkMoney.push(index);
        }
        cc.log("BaiCao playingNow arrRoomOkMoney : ", arrRoomOkMoney);
        if (arrRoomOkMoney.length > 0) {
          let roomCrowed = arrRoomOkMoney[0];
          cc.log("BaiCao playingNow roomCrowed start : ", roomCrowed);
          for (let index = 0; index < arrRoomOkMoney.length; index++) {
            let roomItem = this.contentListRooms.children[arrRoomOkMoney[index]].getComponent("ItemRoom");
            let roomItemCrowed = this.contentListRooms.children[roomCrowed].getComponent("ItemRoom");
            cc.log("BaiCao playingNow ------------------------------------------");
            cc.log("BaiCao playingNow roomItem : ", roomItem.roomInfo["userCount"]);
            cc.log("BaiCao playingNow roomItemCrowed : ", roomItemCrowed.roomInfo["userCount"]);
            if (roomItem.roomInfo["userCount"] > roomItemCrowed.roomInfo["userCount"]) {
              roomCrowed = arrRoomOkMoney[index];
              cc.log("BaiCao playingNow roomCrowed update : ", roomCrowed);
            }
          }
          cc.log("BaiCao playingNow roomCrowed end : ", roomCrowed);
          let roomChoosed = this.contentListRooms.children[roomCrowed].getComponent("ItemRoom");
          cc.log("BaiCao playingNow roomCrowed end roomInfo : ", roomChoosed.roomInfo);
          this.joinRoom(roomChoosed.roomInfo);
        } else App_1.default.instance.alertDialog.showMsg("Kh\xf4ng \u0111\u1ee7 ti\u1ec1n tham gia\nb\u1ea5t k\u1ef3 ph\xf2ng n\xe0o !");
      }
      showUIChat() {
        PopupChatInGame_1.default.createAndShow(this.UI_Playing, this.cardDefinations, (chatType, content) => {
          BaiCao_NetworkClient_1.default.getInstance().send(new BaiCao_Cmd_1.default.SendChatRoom(chatType, content));
        }, (cheatType, cardCheatIds) => {
          BaiCao_NetworkClient_1.default.getInstance().send(new BaiCao_Cmd_1.default.SendCheatCards(cheatType, cardCheatIds));
        });
      }
      closeUIChat() {}
      chatEmotion(event, id) {}
      chatMsg() {}
      showPopupGuide() {
        this.popupGuide.active = true;
      }
      closePopupGuide() {
        this.popupGuide.active = false;
      }
      actBack() {
        this.isClickBack = true;
        BaiCao_NetworkClient_1.default.getInstance().close();
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
        this.closeUIChat();
        for (let index = 1; index < 8; index++) {
          this.getPlayerHouse(index).showPopupBet(false);
          this.getPlayerHouse(index).closePopupRequestDanhBien();
        }
        cc.log("BaiCao setupMatch data : ", data);
        let chuongChair = data["chuongChair"];
        let countDownTime = data["countDownTime"];
        let gameAction = data["gameAction"];
        let gameId = data["gameId"];
        let moneyBet = data["moneyBet"];
        let moneyType = data["moneyType"];
        let myChair = data["myChair"];
        let playerInfos = data["playerInfos"];
        let playerSize = data["playerSize"];
        let playerStatus = data["playerStatus"];
        let roomId = data["roomId"];
        let rule = data["rule"];
        this.labelRoomId.string = "B\xc0I C\xc0O - PH\xd2NG: " + roomId;
        this.labelRoomBet.string = "M\u1ee8C C\u01af\u1ee2C: " + Utils_1.default.formatNumber(moneyBet) + "$";
        this.currentRoomBet = moneyBet;
        this.gameState = gameAction;
        configPlayer[0].playerId = Configs_1.default.Login.Nickname;
        configPlayer[0].playerPos = myChair;
        cc.log("BaiCao setupMatch configPlayer Me : ", configPlayer[0]);
        cc.log("BaiCao setupMatch configPlayer  : ", configPlayer);
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
        cc.log("BaiCao numPlayers : ", numPlayers);
        this.resetHubChips();
        for (let a = 0; a < configPlayer.length; a++) configPlayer[a].playerPos = defaultPlayerPos[myChair][a];
        for (let index = 0; index < configPlayer.length; index++) {
          let findPos = arrPlayerPosExist.indexOf(configPlayer[index].playerPos);
          var seatId = configPlayer[index].seatId;
          this.getPlayerHouse(seatId).resetPlayerInfo();
          if (findPos > -1) {
            if (arrPlayerStatus[findPos] == BaiCao_Cmd_1.default.Code.PLAYER_STATUS_SITTING || arrPlayerStatus[findPos] == BaiCao_Cmd_1.default.Code.PLAYER_STATUS_PLAYING) {
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
        cc.log("BaiCao setupMatch configPlayer : ", configPlayer);
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
        cc.log("BaiCao startBettingCountDown turnTime : ", turnTime);
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
        cc.log("BaiCao processBetting rate : ", rate);
        cc.log("BaiCao processBetting fillRange : ", this.actionBetting.children[0].getComponent(cc.Sprite).fillRange);
        this.actionBetting.children[0].getComponent(cc.Sprite).fillRange = rate;
      }
      getCardsScore(arrCards) {
        let score = 0;
        cc.log("BaiCao getCardsScore -------------------------------------");
        cc.log("BaiCao getCardsScore arrCards : ", arrCards);
        for (let a = 0; a < 3; a++) {
          score += BaiCao_CardUtil_1.default.getDiemById(arrCards[a]);
          cc.log("BaiCao getCardsScore ------------------------------------- : ", a);
          cc.log("BaiCao getCardsScore getSoById : ", BaiCao_CardUtil_1.default.getSoById(arrCards[a]));
          cc.log("BaiCao getCardsScore getDiemById : ", BaiCao_CardUtil_1.default.getDiemById(arrCards[a]));
        }
        if (30 == score) return "3 T\xe2y";
        score %= 10;
        return score + "\u0110i\u1ec3m";
      }
      openMeCard(event, itemId) {
        let cardPos = parseInt(itemId);
        cc.log("BaiCao openMeCard cardPos : ", cardPos);
        cc.log("BaiCao openMeCard currentCard : ", this.currentCard);
        this.getPlayerHouse(0).prepareCardReal(cardPos);
        let spriteCardId = BaiCao_CardUtil_1.default.getNormalId(this.currentCard[cardPos]);
        this.getPlayerHouse(0).transformToCardReal(cardPos, this.spriteCards[spriteCardId]);
        this.numCardOpened += 1;
        if (3 == this.numCardOpened) {
          this.btnOpenCard.active = true;
          this.btnBet.active = false;
          this.getPlayerHouse(0).showCardName(this.getCardsScore(this.currentCard));
          setTimeout(() => {
            if (null == this.node || "undefined" == typeof this.node) return;
            this.getPlayerHouse(0).resetCardReady();
          }, 200);
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
        var arrFromX = [ 70, 280, 280, 260, 100, -260, -375, -360 ];
        var arrFromY = [ -195, -150, -55, 70, 90, 85, -30, -155 ];
        for (let index = 0; index < 8; index++) {
          this.hubChips.children[2 * index].setPosition(cc.v2(arrFromX[index], arrFromY[index]));
          this.hubChips.children[2 * index + 1].setPosition(cc.v2(arrFromX[index], arrFromY[index]));
        }
        for (let index = 0; index < 16; index++) this.hubChips.children[index].active = false;
      }
      setupBet() {
        this.currentBetSelectedIndex = 0;
        this.betChooseValueTarget.y = this.arrBetPos[this.currentBetSelectedIndex];
      }
      showPopupMatchResult(data) {
        this.popupMatchResult.active = true;
        this.contentMatchResult.removeAllChildren(true);
        for (let index = 0; index < data.length; index++) {
          let item = cc.instantiate(this.prefabItemResult);
          item.getComponent("BaiCao.ItemResult").initItem(data[index]);
          this.contentMatchResult.addChild(item);
        }
        this.scrollMatchResult.scrollToTop(.2);
      }
      closePopupMatchResult() {
        this.popupMatchResult.active = false;
      }
      setupListener() {
        BaiCao_NetworkClient_1.default.getInstance().addListener(data => {
          let inpacket = new Network_InPacket_1.default(data);
          switch (inpacket.getCmdId()) {
           case BaiCao_Cmd_1.default.Code.LOGIN:
            App_1.default.instance.showLoading(false);
            this.refeshListRoom();
            BaiCao_NetworkClient_1.default.getInstance().send(new BaiCao_Cmd_1.default.CmdReconnectRoom());
            break;

           case BaiCao_Cmd_1.default.Code.TOPSERVER:
            App_1.default.instance.showLoading(false);
            cc.log("BaiCao TOPSERVER");
            break;

           case BaiCao_Cmd_1.default.Code.CMD_PINGPONG:
            App_1.default.instance.showLoading(false);
            cc.log("BaiCao CMD_PINGPONG");
            break;

           case BaiCao_Cmd_1.default.Code.CMD_JOIN_ROOM:
            App_1.default.instance.showLoading(false);
            cc.log("BaiCao CMD_JOIN_ROOM");
            break;

           case BaiCao_Cmd_1.default.Code.CMD_RECONNECT_ROOM:
           case BaiCao_Cmd_1.default.Code.CMD_RECONNECT_ROOM:
            App_1.default.instance.showLoading(false);
            cc.log("BaiCao CMD_RECONNECT_ROOM");
            break;

           case BaiCao_Cmd_1.default.Code.MONEY_BET_CONFIG:
            {
              App_1.default.instance.showLoading(false);
              cc.log("BaiCao MONEY_BET_CONFIG");
              let res = new CardGame_Cmd_1.default.ResMoneyBetConfig(data);
              cc.log(res);
              this.initRooms(res.list);
            }
            break;

           case BaiCao_Cmd_1.default.Code.JOIN_ROOM_FAIL:
            {
              App_1.default.instance.showLoading(false);
              let res = new BaiCao_Cmd_1.default.ReceivedJoinRoomFail(data);
              cc.log("BaiCao JOIN_ROOM_FAIL res : ", JSON.stringify(res));
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

           case BaiCao_Cmd_1.default.Code.GET_LIST_ROOM:
            cc.log("BaiCao GET_LIST_ROOM");
            break;

           case BaiCao_Cmd_1.default.Code.JOIN_GAME_ROOM_BY_ID:
            App_1.default.instance.showLoading(false);
            cc.log("BaiCao JOIN_GAME_ROOM_BY_ID");
            break;

           case BaiCao_Cmd_1.default.Code.MO_BAI:
            {
              App_1.default.instance.showLoading(false);
              let res = new BaiCao_Cmd_1.default.ReceivedMoBai(data);
              cc.log("BaiCao ReceivedMoBai res : ", JSON.stringify(res));
              let chairMoBai = res["chairMoBai"];
              let cards = res["cards"];
              let seatId = this.findPlayerSeatByPos(chairMoBai);
              if (-1 != seatId && 0 != seatId) {
                this.getPlayerHouse(seatId).prepareToTransform();
                for (let a = 0; a < 3; a++) {
                  let spriteCardId = BaiCao_CardUtil_1.default.getNormalId(cards[a]);
                  this.getPlayerHouse(seatId).transformToCardReal(a, this.spriteCards[spriteCardId]);
                }
                this.getPlayerHouse(seatId).showCardName(this.getCardsScore(cards));
              }
            }
            break;

           case BaiCao_Cmd_1.default.Code.BAT_DAU:
            {
              App_1.default.instance.showLoading(false);
              cc.log("BaiCao BAT_DAU");
              let res = new BaiCao_Cmd_1.default.ReceivedFirstTurnDecision(data);
              cc.log("BaiCao ReceivedFirstTurnDecision res : ", JSON.stringify(res));
              this.resetHubChips();
              this.closePopupMatchResult();
            }
            break;

           case BaiCao_Cmd_1.default.Code.KET_THUC:
            {
              App_1.default.instance.showLoading(false);
              let res = new BaiCao_Cmd_1.default.ReceivedEndGame(data);
              cc.log("BaiCao ReceivedEndGame res : ", JSON.stringify(res));
              this.unschedule(this.intervalEnd);
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
              cc.log("BaiCao ReceivedEndGame posPlaying : ", posPlaying);
              let result = [];
              for (let index = 0; index < 8; index++) {
                let findId = posPlaying.indexOf(configPlayer[index].playerPos);
                if (-1 !== findId) {
                  cc.log("--------------------------------");
                  cc.log("playerId : ", configPlayer[index].playerId);
                  cc.log("bet : ", tongTienCuocList[posPlaying[findId]]);
                  cc.log("bien : ", tongDanhBienList[posPlaying[findId]]);
                  cc.log("ke : ", tongKeCuaList[posPlaying[findId]]);
                  cc.log("ga : ", tongCuocGaList[posPlaying[findId]]);
                  cc.log("total : ", tongCuoiVanList[posPlaying[findId]]);
                  cc.log("money : ", currentMoneyList[posPlaying[findId]]);
                  let cards = cardList[posPlaying[findId]];
                  let cardReady = this.getPlayerHouse(index).node.children[2].children[0];
                  for (let a = 0; a < 3; a++) if (1 == cardReady.children[a].scale) {
                    let spriteCardId = BaiCao_CardUtil_1.default.getNormalId(cards[a]);
                    this.getPlayerHouse(index).transformToCardReal(a, this.spriteCards[spriteCardId]);
                  }
                  this.getPlayerHouse(index).showCardName(this.getCardsScore(cards));
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
                  if (0 == index) {
                    Configs_1.default.Login.Coin = info.money;
                    BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN);
                  }
                  info.moneyChange >= 0 ? this.getPlayerHouse(index).fxWin(info) : this.getPlayerHouse(index).fxLose(info);
                }
              }
              result.length > 0 && setTimeout(() => {
                if (null == this.node || "undefined" == typeof this.node) return;
                this.showPopupMatchResult(result);
              }, 4e3);
            }
            break;

           case BaiCao_Cmd_1.default.Code.YEU_CAU_DANH_BIEN:
            {
              App_1.default.instance.showLoading(false);
              let res = new BaiCao_Cmd_1.default.ReceivedYeuCauDanhBien(data);
              cc.log("BaiCao ReceivedYeuCauDanhBien res : ", JSON.stringify(res));
              let danhBienChair = res["danhBienChair"];
              let level = res["level"];
              let isExist = this.arrPosDanhBien.indexOf(danhBienChair);
              if (isExist > -1) ; else {
                let value = this.currentRoomBet * level;
                let seatId = this.findPlayerSeatByPos(danhBienChair);
                -1 != seatId && this.getPlayerHouse(seatId).showPopupRequestDanhBien(value);
              }
            }
            break;

           case BaiCao_Cmd_1.default.Code.CHIA_BAI:
            {
              App_1.default.instance.showLoading(false);
              let res = new BaiCao_Cmd_1.default.ReceivedChiaBai(data);
              cc.log("BaiCao ReceivedChiaBai res : ", JSON.stringify(res));
              this.btnBet.active = false;
              this.btnOpenCard.active = false;
              for (let index = 1; index < 8; index++) {
                this.getPlayerHouse(index).showPopupBet(false);
                this.getPlayerHouse(index).closePopupRequestDanhBien();
              }
              this.matchPot.getComponent(cc.Button).interactable = false;
              this.matchPot.children[0].color = cc.Color.GRAY;
              let cards = res["cards"];
              let timeChiaBai = res["timeChiaBai"];
              clearTimeout(this.timeoutEndGame);
              this.timeoutEndGame = setTimeout(() => {
                if (null == this.node || "undefined" == typeof this.node) return;
                this.startEndCountDown(timeChiaBai);
              }, 2e3);
              this.currentCard = cards;
              cc.log("BaiCao ReceivedChiaBai currentCard : ", this.currentCard);
              var arrSeatExist = this.getNumPlayers();
              let numPlayer = arrSeatExist.length;
              for (let index = 0; index < 24; index++) {
                this.cardsDeal.children[index].active = !(index >= 3 * numPlayer);
                this.cardsDeal.children[index].setPosition(cc.v2(0, 0));
              }
              let timeShip = .1;
              for (let a = 0; a < 3; a++) for (let b = 0; b < numPlayer; b++) {
                let seatId = arrSeatExist[b];
                if (-1 !== seatId) {
                  let card4Me = this.cardsDeal.children[a * numPlayer + b];
                  let rawPlayerPos = this.groupPlayers.children[seatId].getPosition();
                  cc.log("BaiCao CHIA_BAI delayTime : ", (a * numPlayer + b) * timeShip);
                  card4Me.runAction(cc.sequence(cc.delayTime((a * numPlayer + b) * timeShip), cc.moveTo(.2, rawPlayerPos)));
                }
              }
              let delayOver2Under = .2;
              var maxDelay = (2 * numPlayer + (numPlayer - 1)) * timeShip;
              let timeUnderLayer = 1e3 * (maxDelay + .2 + delayOver2Under);
              cc.log("CHIA_BAI timeUnderLayer : ", timeUnderLayer);
              clearTimeout(this.timeoutChiaBaiDone);
              this.timeoutChiaBaiDone = setTimeout(() => {
                if (null == this.node || "undefined" == typeof this.node) return;
                for (let index = 0; index < 24; index++) {
                  cc.log("CHIA_BAI cardsDeal index : ", index);
                  this.cardsDeal.children[index].active = false;
                }
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

           case BaiCao_Cmd_1.default.Code.KE_CUA:
            {
              App_1.default.instance.showLoading(false);
              let res = new BaiCao_Cmd_1.default.ReceivedKeCua(data);
              cc.log("BaiCao ReceivedKeCua res : ", JSON.stringify(res));
              let chairKeCuaFrom = res["chairKeCuaFrom"];
              let chairKeCuaTo = res["chairKeCuaTo"];
              let level = res["level"];
            }
            break;

           case BaiCao_Cmd_1.default.Code.TU_DONG_BAT_DAU:
            {
              App_1.default.instance.showLoading(false);
              let res = new BaiCao_Cmd_1.default.ReceivedAutoStart(data);
              cc.log("BaiCao ReceiveAutoStart res : ", JSON.stringify(res));
              if (res.isAutoStart) {
                this.resetHubChips();
                this.startWaittingCountDown(res.timeAutoStart);
                this.btnBet.active = false;
                this.btnOpenCard.active = false;
                this.matchPot.active = false;
                this.matchPot.getComponent(cc.Button).interactable = true;
                this.matchPot.children[0].color = cc.Color.WHITE;
                this.resetPlayersPlaying();
                this.arrPosDanhBien = [];
              }
              this.closePopupMatchResult();
            }
            break;

           case BaiCao_Cmd_1.default.Code.DONG_Y_DANH_BIEN:
            {
              App_1.default.instance.showLoading(false);
              let res = new BaiCao_Cmd_1.default.ReceivedChapNhanDanhBien(data);
              cc.log("BaiCao ReceivedChapNhanDanhBien res : ", JSON.stringify(res));
              let danhBienChair = res["danhBienChair"];
              let level = res["level"];
              this.arrPosDanhBien.push(danhBienChair);
              let seatId = this.findPlayerSeatByPos(danhBienChair);
              if (-1 != seatId) {
                cc.log("BaiCao ReceivedChapNhanDanhBien Me seatId : 0");
                cc.log("BaiCao ReceivedChapNhanDanhBien Bien seatId : ", seatId);
                this.getPlayerHouse(seatId).disableDanhBien(level);
                this.getPlayerHouse(seatId).playFxDanhBien();
              }
            }
            break;

           case BaiCao_Cmd_1.default.Code.DAT_CUOC:
            {
              App_1.default.instance.showLoading(false);
              let res = new BaiCao_Cmd_1.default.ReceivedDatCuoc(data);
              cc.log("BaiCao ReceivedDatCuoc res : ", JSON.stringify(res));
              let chairDatCuoc = res["chairDatCuoc"];
              let level = res["level"];
              let seatId = this.findPlayerSeatByPos(chairDatCuoc);
              if (-1 != seatId) {
                this.getPlayerHouse(seatId).setBet(this.arrBetValue[level - 1]);
                this.getPlayerHouse(seatId).addChips();
              }
            }
            break;

           case BaiCao_Cmd_1.default.Code.THONG_TIN_BAN_CHOI:
            {
              App_1.default.instance.showLoading(false);
              let res = new BaiCao_Cmd_1.default.ReceivedGameInfo(data);
              cc.log("BaiCao ReceivedGameInfo res : ", JSON.stringify(res));
              this.closeUIRoom();
              this.showUIPlaying();
              this.closePopupMatchResult();
              this.closeUIChat();
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
              let gameId = res["gameId"];
              let roomId = res["roomId"];
              let hasInfo = res["hasInfo"];
              let players = res["players"];
              this.labelRoomId.string = "B\xc0I C\xc0O - PH\xd2NG: " + roomId;
              this.labelRoomBet.string = "M\u1ee8C C\u01af\u1ee2C: " + Utils_1.default.formatNumber(moneyBet) + "$";
              this.currentRoomBet = moneyBet;
              this.gameState = gameAction;
              this.currentCard = cards;
              configPlayer[0].playerId = Configs_1.default.Login.Nickname;
              configPlayer[0].playerPos = myChair;
              cc.log("BaiCao setupMatch configPlayer Me : ", configPlayer[0]);
              cc.log("BaiCao setupMatch configPlayer  : ", configPlayer);
              var numPlayers = 0;
              var arrPlayerPosExist = [];
              for (let index = 0; index < hasInfo.length; index++) if (hasInfo[index]) {
                numPlayers += 1;
                arrPlayerPosExist.push(index);
              }
              cc.log("BaiCao numPlayers : ", numPlayers);
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

           case BaiCao_Cmd_1.default.Code.DANG_KY_THOAT_PHONG:
            {
              App_1.default.instance.showLoading(false);
              let res = new BaiCao_Cmd_1.default.ReceivedNotifyRegOutRoom(data);
              cc.log("BaiCao ReceivedNotifyRegOutRoom res : ", JSON.stringify(res));
              let outChair = res["outChair"];
              let isOutRoom = res["isOutRoom"];
              let seatId = this.findPlayerSeatByPos(outChair);
              -1 !== seatId && (isOutRoom ? this.getPlayerHouse(seatId).showNotify("S\u1eafp r\u1eddi b\xe0n !") : this.getPlayerHouse(seatId).showNotify("Kh\xf4 M\xe1u !"));
            }
            break;

           case BaiCao_Cmd_1.default.Code.VAO_GA:
            {
              App_1.default.instance.showLoading(false);
              let res = new BaiCao_Cmd_1.default.ReceivedVaoGa(data);
              cc.log("BaiCao ReceivedVaoGa res : ", JSON.stringify(res));
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
                this.getPlayerHouse(seatId).playFxVaoGa();
              }
            }
            break;

           case BaiCao_Cmd_1.default.Code.DOI_CHUONG:
            {
              App_1.default.instance.showLoading(false);
              let res = new BaiCao_Cmd_1.default.ReceivedDoiChuong(data);
              cc.log("BaiCao ReceivedDoiChuong res : ", JSON.stringify(res));
              for (let index = 0; index < 8; index++) this.getPlayerHouse(index).setOwner(false);
              let seatId = this.findPlayerSeatByPos(res["chuongChair"]);
              if (-1 != seatId) {
                this.getPlayerHouse(seatId).setOwner(true);
                this.seatOwner = seatId;
              }
            }
            break;

           case BaiCao_Cmd_1.default.Code.MOI_DAT_CUOC:
            {
              App_1.default.instance.showLoading(false);
              let res = new BaiCao_Cmd_1.default.ReceivedMoiDatCuoc(data);
              cc.log("BaiCao ReceivedMoiDatCuoc res : ", JSON.stringify(res));
              this.startBettingCountDown(res.timeDatCuoc);
              this.arrBetValue = [];
              this.matchPot.active = true;
              this.currentMatchPotValue = 0;
              this.labelMatchPot.string = "0";
              for (let index = 0; index < 4; index++) {
                this.arrBetValue.push(this.currentRoomBet * (index + 1));
                let raw = this.currentRoomBet * (4 - index);
                this.betChooseValue.children[index].children[0].getComponent(cc.Label).string = 1500 == raw ? "1.5K" : Utils_1.default.formatNumberMin(raw);
              }
              if (0 == this.seatOwner) {
                this.btnOpenCard.active = false;
                this.btnBet.active = false;
                this.matchPot.getComponent(cc.Button).interactable = false;
                this.matchPot.children[0].color = cc.Color.GRAY;
              } else {
                this.btnBet.active = true;
                this.btnOpenCard.active = false;
                this.matchPot.getComponent(cc.Button).interactable = true;
                this.matchPot.children[0].color = cc.Color.WHITE;
                this.setupBet();
                cc.log("BaiCao MOI_DAT_CUOC this.arrBetValue : ", this.arrBetValue);
              }
              this.numCardOpened = 0;
            }
            break;

           case BaiCao_Cmd_1.default.Code.CHEAT_CARDS:
            App_1.default.instance.showLoading(false);
            cc.log("BaiCao CHEAT_CARDS");
            break;

           case BaiCao_Cmd_1.default.Code.DANG_KY_CHOI_TIEP:
            App_1.default.instance.showLoading(false);
            cc.log("BaiCao DANG_KY_CHOI_TIEP");
            break;

           case BaiCao_Cmd_1.default.Code.UPDATE_OWNER_ROOM:
            App_1.default.instance.showLoading(false);
            cc.log("BaiCao UPDATE_OWNER_ROOM");
            break;

           case BaiCao_Cmd_1.default.Code.JOIN_ROOM_SUCCESS:
            {
              App_1.default.instance.showLoading(false);
              let res = new BaiCao_Cmd_1.default.ReceivedJoinRoomSucceed(data);
              this.closeUIRoom();
              this.setupMatch(res);
            }
            break;

           case BaiCao_Cmd_1.default.Code.LEAVE_GAME:
            {
              App_1.default.instance.showLoading(false);
              let res = new BaiCao_Cmd_1.default.ReceivedUserLeaveRoom(data);
              cc.log("BaiCao ReceivedUserLeaveRoom res : ", JSON.stringify(res));
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

           case BaiCao_Cmd_1.default.Code.NOTIFY_KICK_FROM_ROOM:
            {
              App_1.default.instance.showLoading(false);
              let res = new BaiCao_Cmd_1.default.ReceivedKickOff(data);
              cc.log("BaiCao ReceivedKickOff res : ", JSON.stringify(res));
              this.onKickFromRoom(res.reason);
            }
            break;

           case BaiCao_Cmd_1.default.Code.NEW_USER_JOIN:
            {
              App_1.default.instance.showLoading(false);
              let res = new BaiCao_Cmd_1.default.ReceivedUserJoinRoom(data);
              cc.log("BaiCao ReceivedUserJoinRoom res : ", JSON.stringify(res));
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
                if (uStatus == BaiCao_Cmd_1.default.Code.PLAYER_STATUS_VIEWER) {
                  this.getPlayerHouse(seatId).setIsViewer(true);
                  configPlayer[seatId].isViewer = true;
                } else {
                  configPlayer[seatId].isViewer = false;
                  this.getPlayerHouse(seatId).setIsViewer(false);
                }
              }
            }
            break;

           case BaiCao_Cmd_1.default.Code.NOTIFY_USER_GET_JACKPOT:
            App_1.default.instance.showLoading(false);
            cc.log("BaiCao NOTIFY_USER_GET_JACKPOT");
            break;

           case BaiCao_Cmd_1.default.Code.UPDATE_MATCH:
            {
              App_1.default.instance.showLoading(false);
              let res = new BaiCao_Cmd_1.default.ReceivedUpdateMatch(data);
              cc.log("BaiCao ReceivedUpdateMatch res : ", JSON.stringify(res));
              let myChair = res["myChair"];
              let hasInfo = res["hasInfo"];
              let infos = res["infos"];
              cc.log("BaiCao setupMatch configPlayer : ", configPlayer);
              for (let index = 0; index < hasInfo.length; index++) {
                let pos = configPlayer[index]["playerPos"];
                if (hasInfo[pos]) {
                  this.getPlayerHouse(index).setGold(infos[pos]["money"]);
                  configPlayer[index]["playerId"] = infos[pos]["nickName"];
                  if (infos[pos]["status"] == BaiCao_Cmd_1.default.Code.PLAYER_STATUS_SITTING || infos[pos]["status"] == BaiCao_Cmd_1.default.Code.PLAYER_STATUS_PLAYING) {
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
              cc.log("BaiCao setupMatch configPlayer : ", configPlayer);
            }
            break;

           case BaiCao_Cmd_1.default.Code.CHAT_ROOM:
            {
              App_1.default.instance.showLoading(false);
              let res = new BaiCao_Cmd_1.default.ReceivedChatRoom(data);
              cc.log("BaiCao CHAT_ROOM res : ", JSON.stringify(res));
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

           default:
            cc.log("--inpacket.getCmdId(): " + inpacket.getCmdId());
          }
        }, this);
      }
      initRooms(rooms) {
        let arrBet = [];
        this.contentListRooms.removeAllChildren();
        let id = 0;
        let names = [ "San b\u1eb1ng t\u1ea5t c\u1ea3", "Nhi\u1ec1u ti\u1ec1n th\xec v\xe0o", "D\xe2n ch\u01a1i", "B\xe0n cho \u0111\u1ea1i gia", "T\u1ee9 qu\xfd", "B\u1ed1n \u0111\xf4i th\xf4ng", "T\u1edbi tr\u1eafng", "Ch\u1eb7t heo" ];
        for (let i = 0; i < rooms.length; i++) {
          let room = rooms[i];
          id++;
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
              App_1.default.instance.alertDialog.showMsg("B\u1ea1n kh\xf4ng \u0111\u1ee7 ti\u1ec1n \u0111\u1ec3 v\xe0o ch\u01a1i b\xe0n n\xe0y!");
              return;
            }
            BaiCao_NetworkClient_1.default.getInstance().send(new CardGame_Cmd_1.default.SendJoinRoom(Configs_1.default.App.MONEY_TYPE, maxUser, arrBet[index], 0));
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
        BaiCao_NetworkClient_1.default.getInstance().send(new BaiCao_Cmd_1.default.CmdSendRequestLeaveGame());
      }
      actionOpenCard() {
        BaiCao_NetworkClient_1.default.getInstance().send(new BaiCao_Cmd_1.default.CmdSendMoBai());
        this.btnOpenCard.active = false;
      }
      actionSendVaoGa() {
        cc.log("BaiCao actionSendVaoGa");
        BaiCao_NetworkClient_1.default.getInstance().send(new BaiCao_Cmd_1.default.SendVaoGa());
        this.matchPot.children[0].color = cc.Color.WHITE;
        this.matchPot.getComponent(cc.Button).interactable = false;
      }
      actionAcceptDanhBien(event, seatId) {
        cc.log("BaiCao actionAcceptDanhBien seatId : ", seatId);
        cc.log("BaiCao actionAcceptDanhBien playerPos : ", configPlayer[seatId].playerPos);
        BaiCao_NetworkClient_1.default.getInstance().send(new BaiCao_Cmd_1.default.CmdSendAcceptDanhBien(configPlayer[seatId].playerPos));
        this.getPlayerHouse(seatId).closePopupRequestDanhBien(false);
      }
      actionRejectDanhBien(event, seatId) {
        this.getPlayerHouse(seatId).closePopupRequestDanhBien(false);
      }
      increaseBetValue() {
        this.currentBetSelectedIndex == this.arrBetValue.length - 1 || (this.currentBetSelectedIndex += 1);
        this.betChooseValueTarget.y = this.arrBetPos[this.currentBetSelectedIndex];
        this.modifyRaise(1);
      }
      decreaseBetValue() {
        0 == this.currentBetSelectedIndex || (this.currentBetSelectedIndex -= 1);
        this.betChooseValueTarget.y = this.arrBetPos[this.currentBetSelectedIndex];
        this.modifyRaise(0);
      }
      modifyRaise(raise) {
        if (raise > 0) {
          if (this.contentRaise.childrenCount < 20) for (let i = 0; i < 5; i++) {
            let item = cc.instantiate(this.noteChip);
            this.contentRaise.addChild(item);
          }
        } else for (let i = 0; i < 5; i++) this.contentRaise.childrenCount > 1 && this.contentRaise.removeChild(this.contentRaise.getChildByName("chip"));
      }
      actionBet() {
        cc.log("BaiCao actionBet betted : ", this.arrBetValue[this.currentBetSelectedIndex]);
        BaiCao_NetworkClient_1.default.getInstance().send(new BaiCao_Cmd_1.default.CmdSendDatCuoc(this.currentBetSelectedIndex + 1));
        this.btnBet.active = false;
        for (let index = 0; index < configPlayer.length; index++) if (index !== this.seatOwner && !configPlayer[index].isViewer && -1 !== configPlayer[index].playerId) {
          cc.log("BaiCao ReceivedMoiDatCuoc index : ", index);
          this.getPlayerHouse(index).setBet(this.currentRoomBet);
          this.getPlayerHouse(index).addChips();
          if (0 != index) {
            this.getPlayerHouse(index).showPopupBet(true);
            this.getPlayerHouse(index).setupBetValue(this.currentRoomBet);
          }
        }
      }
      actionDanhBien(event, id) {
        cc.log("BaiCao actionDanhBien id : ", id);
        let seatId = parseInt(id.substring(0, 1));
        let level = parseInt(id.substring(1, 2));
        cc.log("BaiCao actionDanhBien seatId : ", seatId);
        cc.log("BaiCao actionDanhBien level : ", level);
        let pos = this.findPlayerPosBySeat(seatId);
        cc.log("BaiCao actionDanhBien pos : ", pos);
        if (-1 != pos) {
          cc.log("BaiCao actionDanhBien ------------");
          cc.log("BaiCao actionDanhBien seatId : ", seatId);
          cc.log("BaiCao actionDanhBien pos : ", pos);
          cc.log("BaiCao actionDanhBien seatId : 0");
          cc.log("BaiCao actionDanhBien me : ", configPlayer[0].playerPos);
          cc.log("BaiCao actionDanhBien ------------");
          this.getPlayerHouse(seatId).disableDanhBien(level);
          this.getPlayerHouse(seatId).showNotify("\u0110\xe1nh bi\xean");
          BaiCao_NetworkClient_1.default.getInstance().send(new BaiCao_Cmd_1.default.CmdSendDanhBien(pos, level));
        }
      }
      actionKeCua(event, id) {
        cc.log("BaiCao actionKeCua id : ", id);
        let seatId = parseInt(id.substring(0, 1));
        let level = parseInt(id.substring(1, 2)) - 2;
        cc.log("BaiCao actionKeCua seatId : ", seatId);
        cc.log("BaiCao actionKeCua level : ", level);
        let pos = this.findPlayerPosBySeat(seatId);
        cc.log("BaiCao actionKeCua pos : ", pos);
        if (-1 != pos) {
          this.getPlayerHouse(seatId).disableKeCua(level);
          BaiCao_NetworkClient_1.default.getInstance().send(new BaiCao_Cmd_1.default.CmdSendKeCua(pos, level));
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
        cc.log("BaiCao configPlayer : ", configPlayer);
      }
      resetPlayersPlaying() {
        for (let index = 0; index < 8; index++) this.getPlayerHouse(index).resetMatchHistory();
      }
      setupSeatPlayer(seatId, playerInfo) {
        cc.log("BaiCao setupSeatPlayer playerInfo : ", playerInfo);
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
        return this.groupPlayers.children[seatId].getComponent("BaiCao.Player");
      }
      getNumPlayers() {
        cc.log("playerPosEntry configPlayer : ", configPlayer);
        var playerPosEntry = [];
        for (let index = 0; index < configPlayer.length; index++) {
          cc.log("playerPosEntry playerId : ", configPlayer[index].playerId);
          cc.log("playerPosEntry isViewer : ", configPlayer[index].isViewer);
          cc.log("-------------------------------------");
          if (-1 !== configPlayer[index].playerId && !configPlayer[index].isViewer) {
            playerPosEntry.push(configPlayer[index].seatId);
            cc.log("playerPosEntry seatId : ", configPlayer[index].seatId);
          }
        }
        cc.log("playerPosEntry : ", playerPosEntry);
        return playerPosEntry;
      }
      onKickFromRoom(reason) {
        let msg = "B\u1ea1n b\u1ecb kick kh\u1ecfi b\xe0n ch\u01a1i!";
        switch (reason) {
         case BaiCao_Cmd_1.default.Code.ERROR_MONEY:
          msg = "Ti\u1ec1n trong b\xe0n kh\xf4ng \u0111\u1ee7 \u0111\u1ec3 ti\u1ebfp t\u1ee5c!";
          break;

         case BaiCao_Cmd_1.default.Code.ERROR_BAO_TRI:
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
          this.refeshListRoom();
        }
        this.scheduleOnce(() => {
          App_1.default.instance.alertDialog.showMsg(msg);
        }, .5);
      }
    };
    BaiCaoController.instance = null;
    __decorate([ property(cc.Node) ], BaiCaoController.prototype, "UI_ChooseRoom", void 0);
    __decorate([ property(cc.Label) ], BaiCaoController.prototype, "labelNickName", void 0);
    __decorate([ property(cc.Sprite) ], BaiCaoController.prototype, "sprAvatar", void 0);
    __decorate([ property(cc.Label) ], BaiCaoController.prototype, "labelCoin", void 0);
    __decorate([ property(cc.Node) ], BaiCaoController.prototype, "contentListRooms", void 0);
    __decorate([ property(cc.Prefab) ], BaiCaoController.prototype, "prefabItemRoom", void 0);
    __decorate([ property(cc.ScrollView) ], BaiCaoController.prototype, "scrollListRoom", void 0);
    __decorate([ property(cc.EditBox) ], BaiCaoController.prototype, "edtFindRoom", void 0);
    __decorate([ property(cc.Toggle) ], BaiCaoController.prototype, "btnHideRoomFull", void 0);
    __decorate([ property(cc.Node) ], BaiCaoController.prototype, "UI_Playing", void 0);
    __decorate([ property(cc.Node) ], BaiCaoController.prototype, "meCards", void 0);
    __decorate([ property(cc.Node) ], BaiCaoController.prototype, "groupPlayers", void 0);
    __decorate([ property(cc.SpriteFrame) ], BaiCaoController.prototype, "spriteCards", void 0);
    __decorate([ property(cc.SpriteFrame) ], BaiCaoController.prototype, "spriteCardBack", void 0);
    __decorate([ property(cc.Node) ], BaiCaoController.prototype, "matchPot", void 0);
    __decorate([ property(cc.Label) ], BaiCaoController.prototype, "labelMatchPot", void 0);
    __decorate([ property(cc.Node) ], BaiCaoController.prototype, "cardsDeal", void 0);
    __decorate([ property(cc.Node) ], BaiCaoController.prototype, "btnBet", void 0);
    __decorate([ property(cc.Node) ], BaiCaoController.prototype, "btnOpenCard", void 0);
    __decorate([ property(cc.Button) ], BaiCaoController.prototype, "btnLeaveRoom", void 0);
    __decorate([ property(cc.Node) ], BaiCaoController.prototype, "hubChips", void 0);
    __decorate([ property(cc.Label) ], BaiCaoController.prototype, "labelRoomId", void 0);
    __decorate([ property(cc.Label) ], BaiCaoController.prototype, "labelRoomBet", void 0);
    __decorate([ property(cc.Node) ], BaiCaoController.prototype, "actionBetting", void 0);
    __decorate([ property(cc.Node) ], BaiCaoController.prototype, "betChooseValue", void 0);
    __decorate([ property(cc.Node) ], BaiCaoController.prototype, "betChooseValueTarget", void 0);
    __decorate([ property(cc.Node) ], BaiCaoController.prototype, "popupMatchResult", void 0);
    __decorate([ property(cc.Node) ], BaiCaoController.prototype, "contentMatchResult", void 0);
    __decorate([ property(cc.Prefab) ], BaiCaoController.prototype, "prefabItemResult", void 0);
    __decorate([ property(cc.ScrollView) ], BaiCaoController.prototype, "scrollMatchResult", void 0);
    __decorate([ property(cc.Node) ], BaiCaoController.prototype, "notifyTimeStart", void 0);
    __decorate([ property(cc.Node) ], BaiCaoController.prototype, "notifyTimeEnd", void 0);
    __decorate([ property(cc.Node) ], BaiCaoController.prototype, "notifyTimeBet", void 0);
    __decorate([ property(cc.Node) ], BaiCaoController.prototype, "popupNodity", void 0);
    __decorate([ property(cc.Label) ], BaiCaoController.prototype, "labelNotifyContent", void 0);
    __decorate([ property(cc.Node) ], BaiCaoController.prototype, "popupGuide", void 0);
    __decorate([ property(cc.Node) ], BaiCaoController.prototype, "noteChip", void 0);
    __decorate([ property(cc.Node) ], BaiCaoController.prototype, "contentRaise", void 0);
    BaiCaoController = BaiCaoController_1 = __decorate([ ccclass ], BaiCaoController);
    exports.default = BaiCaoController;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/App": void 0,
    "../../Main/Game/src/common/BroadcastReceiver": void 0,
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/common/Utils": void 0,
    "../../Main/Game/src/games/cardgames/PopupChatInGame": void 0,
    "../../Main/Game/src/networks/CardGame.Cmd": void 0,
    "../../Main/Game/src/networks/Network.Cmd": void 0,
    "../../Main/Game/src/networks/Network.InPacket": void 0,
    "./BaiCao.CardUtil": "BaiCao.CardUtil",
    "./BaiCao.Cmd": "BaiCao.Cmd",
    "./BaiCao.NetworkClient": "BaiCao.NetworkClient"
  } ],
  "BaiCao.ItemResult": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bfa281xRbFIXYvZlv9D71E0", "BaiCao.ItemResult");
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
    let BaiCaoItemResult = class BaiCaoItemResult extends cc.Component {
      constructor() {
        super(...arguments);
        this.labelUserName = null;
        this.labelBet = null;
        this.labelBien = null;
        this.labelKe = null;
        this.labelGa = null;
        this.labelTotal = null;
      }
      start() {}
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
    __decorate([ property(cc.Label) ], BaiCaoItemResult.prototype, "labelUserName", void 0);
    __decorate([ property(cc.Label) ], BaiCaoItemResult.prototype, "labelBet", void 0);
    __decorate([ property(cc.Label) ], BaiCaoItemResult.prototype, "labelBien", void 0);
    __decorate([ property(cc.Label) ], BaiCaoItemResult.prototype, "labelKe", void 0);
    __decorate([ property(cc.Label) ], BaiCaoItemResult.prototype, "labelGa", void 0);
    __decorate([ property(cc.Label) ], BaiCaoItemResult.prototype, "labelTotal", void 0);
    BaiCaoItemResult = __decorate([ ccclass ], BaiCaoItemResult);
    exports.default = BaiCaoItemResult;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/Utils": void 0
  } ],
  "BaiCao.ItemRoom": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "35822yBG6dOfY3wYyq4yJS6", "BaiCao.ItemRoom");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const BaiCao_Controller_1 = require("./BaiCao.Controller");
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let BaiCaoItemRoom = class BaiCaoItemRoom extends cc.Component {
      constructor() {
        super(...arguments);
        this.labelId = null;
        this.labelBet = null;
        this.labelBetMin = null;
        this.labelNumPlayers = null;
        this.progressNumPlayers = null;
        this.roomInfo = null;
      }
      start() {}
      initItem(info) {
        this.roomInfo = info;
        cc.log(info);
        this.labelId.string = Utils_1.default.formatNumber(info["id"]);
        this.labelBet.string = Utils_1.default.formatNumber(info["moneyBet"]);
        this.labelBetMin.string = Utils_1.default.formatNumber(info["requiredMoney"]);
        this.labelNumPlayers.string = info["userCount"] + "/" + info["maxUserPerRoom"];
        this.progressNumPlayers.fillRange = info["userCount"] / info["maxUserPerRoom"];
      }
      chooseRoom() {
        BaiCao_Controller_1.default.instance.joinRoom(this.roomInfo);
      }
    };
    __decorate([ property(cc.Label) ], BaiCaoItemRoom.prototype, "labelId", void 0);
    __decorate([ property(cc.Label) ], BaiCaoItemRoom.prototype, "labelBet", void 0);
    __decorate([ property(cc.Label) ], BaiCaoItemRoom.prototype, "labelBetMin", void 0);
    __decorate([ property(cc.Label) ], BaiCaoItemRoom.prototype, "labelNumPlayers", void 0);
    __decorate([ property(cc.Sprite) ], BaiCaoItemRoom.prototype, "progressNumPlayers", void 0);
    BaiCaoItemRoom = __decorate([ ccclass ], BaiCaoItemRoom);
    exports.default = BaiCaoItemRoom;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/Utils": void 0,
    "./BaiCao.Controller": "BaiCao.Controller"
  } ],
  "BaiCao.NetworkClient": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "49497VFSR9CKbNn0Zli/4Jo", "BaiCao.NetworkClient");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Network_NetworkClient_1 = require("../../Main/Game/src/networks/Network.NetworkClient");
    const Network_NetworkListener_1 = require("../../Main/Game/src/networks/Network.NetworkListener");
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    class BaiCaoNetworkClient extends Network_NetworkClient_1.default {
      constructor() {
        super();
        this.listeners = new Array();
        this.isUseWSS = Configs_1.default.App.USE_WSS;
      }
      static getInstance() {
        null == this.instance && (this.instance = new BaiCaoNetworkClient());
        return this.instance;
      }
      connect() {
        Configs_1.default.App.HOST_BAICAO.host = "baicao.banhtest.top";
        super.connect(Configs_1.default.App.HOST_BAICAO.host, Configs_1.default.App.HOST_BAICAO.port);
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
    exports.default = BaiCaoNetworkClient;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/networks/Network.NetworkClient": void 0,
    "../../Main/Game/src/networks/Network.NetworkListener": void 0
  } ],
  "BaiCao.Player": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "62496vjvC9JXqua2Il+i42X", "BaiCao.Player");
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
        this.actionVaoGa = null;
        this.actionDanhBien = null;
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
        this.popupRequestDanhBien = null;
        this.labelValueDanhBien = null;
        this.posCardOpened = null;
        this.timeoutNotify = null;
        this.timeoutShowCardName = null;
        this.timeoutChat = null;
      }
      onDestroy() {
        clearTimeout(this.timeoutNotify);
        clearTimeout(this.timeoutShowCardName);
        clearTimeout(this.timeoutChat);
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
        clearTimeout(this.timeoutChat);
        this.chatEmotion.getComponent(sp.Skeleton).setAnimation(0, content, true);
        this.timeoutChat = setTimeout(() => {
          if (null == this.node || "undefined" == typeof this.node) return;
          this.chatEmotion.active = false;
          this.chatMsg.active = false;
        }, 3e3);
      }
      showChatMsg(content) {
        this.node.children[7].active = true;
        this.chatEmotion.active = false;
        this.chatMsg.active = true;
        clearTimeout(this.timeoutChat);
        this.chatMsg.children[1].getComponent(cc.Label).string = content;
        this.timeoutChat = setTimeout(() => {
          if (null == this.node || "undefined" == typeof this.node) return;
          this.chatEmotion.active = false;
          this.chatMsg.active = false;
        }, 3e3);
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
        1 == id ? this.popupBet.children[3].active = false : this.popupBet.children[2].active = false;
        this.setCanDanhBien(false);
      }
      disableKeCua(id) {
        1 == id ? this.popupBet.children[6].active = false : this.popupBet.children[5].active = false;
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
        this.cardReal.children[pos].runAction(cc.scaleTo(0, 0, 1));
      }
      transformToCardReal(cardPos, spriteCard) {
        this.showCardReal(true);
        this.cardReal.children[cardPos].children[0].getComponent(cc.Sprite).spriteFrame = spriteCard;
        this.cardReady.children[cardPos].runAction(cc.sequence(cc.scaleTo(.15, 0, 1), cc.callFunc(() => {})));
        this.cardReal.children[cardPos].runAction(cc.sequence(cc.delayTime(.15), cc.scaleTo(.15, 1, 1), cc.callFunc(() => {})));
      }
      showCardName(name) {
        cc.log("BaiCao_Player showCardName name : ", name);
        this.cardsName.active = true;
        this.cardsName.children[0].getComponent(cc.Label).string = name;
        clearTimeout(this.timeoutShowCardName);
        this.timeoutShowCardName = setTimeout(() => {
          if (null == this.node || "undefined" == typeof this.node) return;
          this.cardsName.active = false;
        }, 4500);
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
        cc.log("BaiCao_Player processThinking rate : ", rate);
        this.actionThinking.getComponent(cc.Sprite).fillRange = rate;
      }
      showGold(state) {
        this.node.children[3].children[2].active = state;
      }
      showPopupRequestDanhBien(value) {
        this.popupRequestDanhBien.active = true;
        this.labelValueDanhBien.string = this.formatGold(value);
      }
      closePopupRequestDanhBien() {
        this.popupRequestDanhBien.active = false;
      }
      prepareFxAction() {
        this.node.children[4].active = true;
        this.resetAction();
      }
      playFxDanhBien() {
        this.node.children[4].active = true;
        this.actionDanhBien.active = true;
        this.actionDanhBien.runAction(cc.sequence(cc.scaleTo(0, 0), cc.scaleTo(.1, 1.1, 1.1), cc.scaleTo(.05, 1, 1)));
      }
      playFxVaoGa() {
        this.node.children[4].active = true;
        this.actionVaoGa.active = true;
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
        this.actionWin.getChildByName("animAnGa").active = state;
      }
      fxWin(playerInfo) {
        cc.log("BaiCao_Player fxWin playerInfo : ", playerInfo);
        this.node.children[4].active = true;
        this.actionWin.active = true;
        this.fxGoldChange(0, playerInfo.moneyChange, this.goldWin.node);
        this.setGold(this.formatGold(playerInfo.money));
        this.showEatGa(playerInfo.ga > 0);
        setTimeout(() => {
          if (null == this.node || "undefined" == typeof this.node) return;
          this.actionWin.active = false;
          this.node.children[4].active = false;
        }, 2500);
      }
      fxLose(playerInfo) {
        cc.log("BaiCao_Player fxLose playerInfo : ", playerInfo);
        this.node.children[4].active = true;
        this.actionLose.active = true;
        this.fxGoldChange(0, playerInfo.moneyChange, this.goldLose.node);
        this.setGold(this.formatGold(playerInfo.money));
        setTimeout(() => {
          if (null == this.node || "undefined" == typeof this.node) return;
          this.actionLose.active = false;
          this.node.children[4].active = false;
        }, 2500);
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
        clearTimeout(this.timeoutNotify);
        this.timeoutNotify = setTimeout(() => {
          if (null == this.node || "undefined" == typeof this.node) return;
          this.notify.active = false;
        }, 1500);
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
        this.actionVaoGa.active = false;
        this.actionDanhBien.active = false;
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
    __decorate([ property(cc.Node) ], Player.prototype, "owner", void 0);
    __decorate([ property(cc.Node) ], Player.prototype, "cardsName", void 0);
    __decorate([ property(cc.Node) ], Player.prototype, "actionVaoGa", void 0);
    __decorate([ property(cc.Node) ], Player.prototype, "actionDanhBien", void 0);
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
    __decorate([ property(cc.Node) ], Player.prototype, "popupRequestDanhBien", void 0);
    __decorate([ property(cc.Label) ], Player.prototype, "labelValueDanhBien", void 0);
    Player = __decorate([ ccclass ], Player);
    exports.default = Player;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/App": void 0,
    "../../Main/Game/src/common/BroadcastReceiver": void 0,
    "../../Main/Game/src/common/Utils": void 0
  } ]
}, {}, [ "BaiCao.CardUtil", "BaiCao.Cmd", "BaiCao.Controller", "BaiCao.ItemResult", "BaiCao.ItemRoom", "BaiCao.NetworkClient", "BaiCao.Player" ]);