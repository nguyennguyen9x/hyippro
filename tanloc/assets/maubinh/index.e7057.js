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
  "MauBinh.CardDrag": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "70de1cLqrVNCJ9ZBG20j79M", "MauBinh.CardDrag");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const MauBinh_InGame_1 = require("./MauBinh.InGame");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let MauBinhCardDrag = class MauBinhCardDrag extends cc.Component {
      constructor() {
        super(...arguments);
        this.imgCard = null;
        this.imgFocus = null;
        this.imgShadow = null;
        this.cardDTO = null;
      }
      resetState() {
        this.setCardFocus(false);
        this.setCardShadow(false);
      }
      setTextureWithCardData(cardDTO) {
        this.cardDTO = cardDTO;
        this.imgCard.spriteFrame = MauBinh_InGame_1.default.getInstance().getCardFrame(cardDTO.id);
      }
      setCardShadow(state) {
        this.imgShadow.active = state;
      }
      setCardFocus(state) {
        this.imgFocus.active = state;
      }
      getCardDTO() {
        return this.cardDTO;
      }
    };
    __decorate([ property(cc.Sprite) ], MauBinhCardDrag.prototype, "imgCard", void 0);
    __decorate([ property(cc.Node) ], MauBinhCardDrag.prototype, "imgFocus", void 0);
    __decorate([ property(cc.Node) ], MauBinhCardDrag.prototype, "imgShadow", void 0);
    MauBinhCardDrag = __decorate([ ccclass ], MauBinhCardDrag);
    exports.default = MauBinhCardDrag;
    cc._RF.pop();
  }, {
    "./MauBinh.InGame": "MauBinh.InGame"
  } ],
  "MauBinh.CardUtil": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d5f92nEHMdNj4gHuhmCMctb", "MauBinh.CardUtil");
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
        static getNumber(id) {
          return Math.floor(id / 4) + 2;
        }
      }
      common.CardUtils = CardUtils;
    })(common = exports.common || (exports.common = {}));
    exports.default = common.CardUtils;
    cc._RF.pop();
  }, {} ],
  "MauBinh.Cmd": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "73889UV1D1OeI4ehXzc0OG9", "MauBinh.Cmd");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.MauBinhCmd = void 0;
    const Network_OutPacket_1 = require("../../Main/Game/src/networks/Network.OutPacket");
    const Network_InPacket_1 = require("../../Main/Game/src/networks/Network.InPacket");
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    const MauBinh_Constant_1 = require("./MauBinh.Constant");
    const MauBinh_InGame_1 = require("./MauBinh.InGame");
    const Constants_1 = require("../../Main/Game/src/common/Constants");
    var MauBinhCmd;
    (function(MauBinhCmd) {
      class Code {}
      Code.LOGIN = 1;
      Code.TOP_SERVER = 1001;
      Code.PINGPONG = 1050;
      Code.JOIN_ROOM = 3001;
      Code.RECONNECT_ROOM = 3002;
      Code.MONEY_BET_CONFIG = 3003;
      Code.JOIN_ROOM_FAIL = 3004;
      Code.CHAT_ROOM = 3008;
      Code.CREATE_ROOM = 3013;
      Code.GET_LIST_ROOM = 3014;
      Code.JOIN_GAME_ROOM_BY_ID = 3015;
      Code.BINH_SO_CHI = 3101;
      Code.BAT_DAU = 3102;
      Code.KET_THUC = 3103;
      Code.AUTO_BINH_SO_CHI = 3104;
      Code.CHIA_BAI = 3105;
      Code.BAO_BINH = 3106;
      Code.AUTO_START = 3107;
      Code.XEP_LAI = 3108;
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
      Code.USER_JOIN_ROOM = 3121;
      Code.NOTIFY_USER_GET_JACKPOT = 3122;
      Code.UPDATE_MATCH = 3123;
      Code.CARDS_DEFINE = 3999;
      MauBinhCmd.Code = Code;
      class MauBinhPlayerInfo {}
      MauBinhCmd.MauBinhPlayerInfo = MauBinhPlayerInfo;
      class SendLogin extends Network_OutPacket_1.default {
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
      MauBinhCmd.SendLogin = SendLogin;
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
      MauBinhCmd.SendJoinRoom = SendJoinRoom;
      class SendReconnectRoom extends Network_OutPacket_1.default {
        constructor() {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.RECONNECT_ROOM);
          this.packHeader();
          this.updateSize();
        }
      }
      MauBinhCmd.SendReconnectRoom = SendReconnectRoom;
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
      MauBinhCmd.SendRequestLeaveGame = SendRequestLeaveGame;
      class SendHoldRoom extends Network_OutPacket_1.default {
        constructor() {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.DANG_KY_CHOI_TIEP);
          this.packHeader();
          this.updateSize();
        }
      }
      MauBinhCmd.SendHoldRoom = SendHoldRoom;
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
      MauBinhCmd.SendMoneyBetConfig = SendMoneyBetConfig;
      class SendGetTopServer extends Network_OutPacket_1.default {
        constructor(a) {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.TOP_SERVER);
          this.packHeader();
          this.putByte(a);
          this.updateSize();
        }
      }
      MauBinhCmd.SendGetTopServer = SendGetTopServer;
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
      MauBinhCmd.SendCreateRoom = SendCreateRoom;
      class SendCheatCards extends Network_OutPacket_1.default {
        constructor(a, b) {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.CHEAT_CARDS);
          this.packHeader();
          this.putByte(a);
          this.putByteArray(b);
          this.updateSize();
        }
      }
      MauBinhCmd.SendCheatCards = SendCheatCards;
      class SendPing extends Network_OutPacket_1.default {
        constructor(a) {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.PINGPONG);
          this.packHeader();
          this.updateSize();
        }
      }
      MauBinhCmd.SendPing = SendPing;
      class SendGetListRoom extends Network_OutPacket_1.default {
        constructor() {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.GET_LIST_ROOM);
          this.packHeader();
          this.putInt(Configs_1.default.App.MONEY_TYPE);
          this.putInt(MauBinh_Constant_1.default.MAX_PLAYER);
          this.putLong(-1);
          this.putInt(0);
          this.putInt(0);
          this.putInt(50);
          this.updateSize();
        }
      }
      MauBinhCmd.SendGetListRoom = SendGetListRoom;
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
      MauBinhCmd.SendJoinRoomById = SendJoinRoomById;
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
      MauBinhCmd.SendChatRoom = SendChatRoom;
      class SendBinhSoChi extends Network_OutPacket_1.default {
        constructor(a, b, c) {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.BINH_SO_CHI);
          this.packHeader();
          this.putShort(a.length);
          for (var d = 0; d < a.length; d++) this.putByte(a[d]);
          this.putShort(b.length);
          for (d = 0; d < b.length; d++) this.putByte(b[d]);
          this.putShort(c.length);
          for (d = 0; d < c.length; d++) this.putByte(c[d]);
          this.updateSize();
        }
      }
      MauBinhCmd.SendBinhSoChi = SendBinhSoChi;
      class SendBaoBinh extends Network_OutPacket_1.default {
        constructor() {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.BAO_BINH);
          this.packHeader();
          this.updateSize();
        }
      }
      MauBinhCmd.SendBaoBinh = SendBaoBinh;
      class SendAutoBinhSoChi extends Network_OutPacket_1.default {
        constructor(a, b, c) {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.AUTO_BINH_SO_CHI);
          this.packHeader();
          this.putShort(a.length);
          for (var d = 0; d < a.length; d++) this.putByte(a[d]);
          this.putShort(b.length);
          for (d = 0; d < b.length; d++) this.putByte(b[d]);
          this.putShort(c.length);
          for (d = 0; d < c.length; d++) this.putByte(c[d]);
          this.updateSize();
        }
      }
      MauBinhCmd.SendAutoBinhSoChi = SendAutoBinhSoChi;
      class SendXepLai extends Network_OutPacket_1.default {
        constructor() {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.XEP_LAI);
          this.packHeader();
          this.updateSize();
        }
      }
      MauBinhCmd.SendXepLai = SendXepLai;
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
      MauBinhCmd.SendCardsDefine = SendCardsDefine;
      class ReceivedLogin extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
        }
      }
      MauBinhCmd.ReceivedLogin = ReceivedLogin;
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
      MauBinhCmd.ReceivedMoneyBetConfig = ReceivedMoneyBetConfig;
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
      MauBinhCmd.ReceivedGetListRoom = ReceivedGetListRoom;
      class ReceivedJoinRoomSucceed extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          let a;
          this.myChair = this.getByte();
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
            let b = new MauBinhPlayerInfo();
            b.nickName = this.getString();
            b.avatar = this.getString();
            b.money = this.getLong();
            this.playerInfos.push(b);
          }
          this.gameState = MauBinh_Constant_1.GameState.toEnum(this.getByte());
          this.gameAction = this.getByte();
          this.countDownTime = this.getByte();
        }
      }
      MauBinhCmd.ReceivedJoinRoomSucceed = ReceivedJoinRoomSucceed;
      class ReceivedAutoStart extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.isAutoStart = this.getBool();
          this.timeAutoStart = this.getByte();
        }
      }
      MauBinhCmd.ReceivedAutoStart = ReceivedAutoStart;
      class ReceivedChiaBai extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          var a = this.getShort();
          this.cardList = [];
          for (var b = 0; b < a; b++) this.cardList.push(MauBinh_InGame_1.MauBinhCardDTO.fromCardId(this.getByte()));
          this.mauBinh = MauBinh_Constant_1.CardTypes.toEnum(this.getByte());
          this.matchId = this.getInt();
          this.countdown = this.getByte();
          this.handRanking = this.getInt();
        }
      }
      MauBinhCmd.ReceivedChiaBai = ReceivedChiaBai;
      class ReceivedUserLeaveRoom extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.actions = [];
          this.chair = this.getByte();
          this.nickName = this.getString();
          this.reqQuitRoomReason = this.getString();
          let actionsStr = this.getString();
          if (actionsStr) {
            let actions = JSON.parse(actionsStr);
            actions.hasOwnProperty("object") && Array.isArray(actions["object"]) && (this.actions = Constants_1.UserActions.toEnums(actions["object"]));
          }
        }
      }
      MauBinhCmd.ReceivedUserLeaveRoom = ReceivedUserLeaveRoom;
      class ReceivedUserJoinRoom extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.info = new MauBinhPlayerInfo();
          this.info.nickName = this.getString();
          this.info.avatar = this.getString();
          this.info.money = this.getLong();
          this.myChair = this.getByte();
          this.uStatus = this.getByte();
        }
      }
      MauBinhCmd.ReceivedUserJoinRoom = ReceivedUserJoinRoom;
      class ReceivedUpdateMatch extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.myChair = this.getByte();
          var a = this.getShort();
          this.hasInfo = [];
          for (var b = 0; b < a; b++) this.hasInfo.push(this.getBool());
          this.infos = [];
          for (b = 0; b < a; b++) {
            var c = new MauBinhPlayerInfo();
            this.hasInfo[b] && (c.nickName = this.getString(), c.avatar = this.getString(), 
            c.money = this.getLong(), c.playerStatus = this.getInt());
            this.infos.push(c);
          }
        }
      }
      MauBinhCmd.ReceivedUpdateMatch = ReceivedUpdateMatch;
      class ReceivedNotifyRegOutRoom extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.outChair = this.getByte();
          this.isOutRoom = this.getBool();
          this.reqQuitRoomReason = this.getString();
          this.listSuggestionActions = this.getString();
        }
      }
      MauBinhCmd.ReceivedNotifyRegOutRoom = ReceivedNotifyRegOutRoom;
      class ReceivedKickOff extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.reason = this.getByte();
        }
      }
      MauBinhCmd.ReceivedKickOff = ReceivedKickOff;
      class ReceivedMoiDatCuoc extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.timeDatCuoc = this.getByte();
        }
      }
      MauBinhCmd.ReceivedMoiDatCuoc = ReceivedMoiDatCuoc;
      class ReceivedMoBai extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.chairMoBai = this.getByte();
          this.cardSize = this.getShort();
          this.cards = [];
          for (var a = 0; a < this.cardSize; a++) this.cards.push(this.getByte());
        }
      }
      MauBinhCmd.ReceivedMoBai = ReceivedMoBai;
      class ReceivedEndGame extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.playerResultList = [];
          for (var a = this.getShort(), b = 0; b < a; b++) {
            const chairIndex = this.getByte();
            const maubinhType = this.getInt();
            let d = this.getShort();
            let chi1 = [];
            for (var e = 0; e < d; e++) chi1.push(MauBinh_InGame_1.MauBinhCardDTO.fromCardId(this.getByte()));
            d = this.getShort();
            let chi2 = [];
            for (e = 0; e < d; e++) chi2.push(MauBinh_InGame_1.MauBinhCardDTO.fromCardId(this.getByte()));
            d = this.getShort();
            let chi3 = [];
            for (e = 0; e < d; e++) chi3.push(MauBinh_InGame_1.MauBinhCardDTO.fromCardId(this.getByte()));
            let moneyInChi = [];
            d = this.getShort();
            for (e = 0; e < d; e++) moneyInChi.push(this.getLong());
            const moneyAt = this.getLong();
            const moneyCommon = this.getLong();
            const moneySap = this.getLong();
            const currentMoney = this.getLong();
            let c = {
              chairIndex: chairIndex,
              maubinhType: MauBinh_Constant_1.CardTypes.toEnum(maubinhType),
              chi1: chi1,
              chi2: chi2,
              chi3: chi3,
              moneyInChi: moneyInChi,
              moneyAt: moneyAt,
              moneyCommon: moneyCommon,
              moneySap: moneySap,
              currentMoney: currentMoney
            };
            this.playerResultList.push(c);
          }
          this.timeEndGame = this.getByte();
        }
      }
      MauBinhCmd.ReceivedEndGame = ReceivedEndGame;
      class ReceivedDoiChuong extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.chuongChair = this.getByte();
        }
      }
      MauBinhCmd.ReceivedDoiChuong = ReceivedDoiChuong;
      class ReceivedChatRoom extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.chair = this.getByte();
          this.isIcon = this.getBool();
          this.content = decodeURI(this.getString());
          this.nickname = this.getString();
        }
      }
      MauBinhCmd.ReceivedChatRoom = ReceivedChatRoom;
      class ReceivedGameInfo extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.myChair = this.getByte();
          this.gameState = MauBinh_Constant_1.GameState.toEnum(this.getByte());
          this.gameAction = this.getByte();
          this.countdownTime = this.getByte();
          this.moneyBet = this.getLong();
          this.moneyType = this.getByte();
          this.matchId = this.getInt();
          this.roomId = this.getInt();
          this.rule = this.getByte();
          var a = this.getShort();
          this.hasInfo = [];
          for (var b = 0; b < a; b++) this.hasInfo[b] = this.getBool();
          this.players = [];
          for (b = 0; b < MauBinh_Constant_1.default.MAX_PLAYER; b++) if (this.hasInfo[b]) {
            this.players[b] = new MauBinhPlayerInfo();
            if (this.gameState == MauBinh_Constant_1.GameState.ENUM.STATE_PLAYING) {
              if (b == this.myChair) {
                a = this.getShort();
                this.players[b].cardList = [];
                for (var c = 0; c < a; c++) this.players[b].cardList.push(MauBinh_InGame_1.MauBinhCardDTO.fromCardId(this.getByte()));
              }
            } else if (this.gameState == MauBinh_Constant_1.GameState.ENUM.STATE_END) {
              a = this.getShort();
              this.players[b].cardList = [];
              for (c = 0; c < a; c++) this.players[b].cardList.push(MauBinh_InGame_1.MauBinhCardDTO.fromCardId(this.getByte()));
              this.players[b].maubinhType = this.getByte();
              this.players[b].moneyCommon = this.getLong();
            }
            this.players[b].sochi = this.getBool();
            this.players[b].playerStatus = this.getByte();
            this.players[b].avatar = this.getString();
            this.players[b].userId = this.getInt();
            this.players[b].nickName = this.getString();
            this.players[b].money = this.getLong();
          }
        }
      }
      MauBinhCmd.ReceivedGameInfo = ReceivedGameInfo;
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
      MauBinhCmd.ReceivedTopServer = ReceivedTopServer;
      class ReceivedJoinRoomFail extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
        }
      }
      MauBinhCmd.ReceivedJoinRoomFail = ReceivedJoinRoomFail;
      class ReceivedMauBinhConfig extends Network_InPacket_1.default {
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
      MauBinhCmd.ReceivedMauBinhConfig = ReceivedMauBinhConfig;
      class ReceivedBinhSoChi extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.chair = this.getByte();
        }
      }
      MauBinhCmd.ReceivedBinhSoChi = ReceivedBinhSoChi;
      class ReceivedXepLai extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.chair = this.getByte();
        }
      }
      MauBinhCmd.ReceivedXepLai = ReceivedXepLai;
      class ReceivedCardDefinations extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.strData = this.getString();
        }
      }
      MauBinhCmd.ReceivedCardDefinations = ReceivedCardDefinations;
    })(MauBinhCmd = exports.MauBinhCmd || (exports.MauBinhCmd = {}));
    exports.default = MauBinhCmd;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/common/Constants": void 0,
    "../../Main/Game/src/networks/Network.InPacket": void 0,
    "../../Main/Game/src/networks/Network.OutPacket": void 0,
    "./MauBinh.Constant": "MauBinh.Constant",
    "./MauBinh.InGame": "MauBinh.InGame"
  } ],
  "MauBinh.Constant": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "11d27cn9DtLKqmIMe/ffelU", "MauBinh.Constant");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.MauBinhConstant = exports.KickReasonCodes = exports.CardSuites = exports.CardColors = exports.CardKindLevels = exports.GroupKinds = exports.CardTypes = exports.PlayerState = exports.GameState = void 0;
    var GameState;
    (function(GameState) {
      let ENUM;
      (function(ENUM) {
        ENUM[ENUM["STATE_NO_START"] = 0] = "STATE_NO_START";
        ENUM[ENUM["STATE_PLAYING"] = 1] = "STATE_PLAYING";
        ENUM[ENUM["STATE_END"] = 2] = "STATE_END";
      })(ENUM = GameState.ENUM || (GameState.ENUM = {}));
      function toEnum(val) {
        return ENUM[ENUM[val]];
      }
      GameState.toEnum = toEnum;
    })(GameState = exports.GameState || (exports.GameState = {}));
    var PlayerState;
    (function(PlayerState) {
      let ENUM;
      (function(ENUM) {
        ENUM[ENUM["PLAYER_STATUS_OUT_GAME"] = 0] = "PLAYER_STATUS_OUT_GAME";
        ENUM[ENUM["PLAYER_STATUS_VIEWER"] = 1] = "PLAYER_STATUS_VIEWER";
        ENUM[ENUM["PLAYER_STATUS_SITTING"] = 2] = "PLAYER_STATUS_SITTING";
        ENUM[ENUM["PLAYER_STATUS_PLAYING"] = 3] = "PLAYER_STATUS_PLAYING";
      })(ENUM = PlayerState.ENUM || (PlayerState.ENUM = {}));
      function toEnum(val) {
        return ENUM[ENUM[val]];
      }
      PlayerState.toEnum = toEnum;
    })(PlayerState = exports.PlayerState || (exports.PlayerState = {}));
    var CardTypes;
    (function(CardTypes) {
      let ENUM;
      (function(ENUM) {
        ENUM[ENUM["TYPE_RONG_CUON"] = -2] = "TYPE_RONG_CUON";
        ENUM[ENUM["TYPE_NAM_DOI_MOT_SAM"] = -1] = "TYPE_NAM_DOI_MOT_SAM";
        ENUM[ENUM["TYPE_SANH_RONG"] = 0] = "TYPE_SANH_RONG";
        ENUM[ENUM["TYPE_MUOI_BA_CAY_DONG_MAU"] = 1] = "TYPE_MUOI_BA_CAY_DONG_MAU";
        ENUM[ENUM["TYPE_MUOI_HAI_CAY_DONG_MAU"] = 2] = "TYPE_MUOI_HAI_CAY_DONG_MAU";
        ENUM[ENUM["TYPE_BA_CAI_THUNG"] = 3] = "TYPE_BA_CAI_THUNG";
        ENUM[ENUM["TYPE_BA_CAI_SANH"] = 4] = "TYPE_BA_CAI_SANH";
        ENUM[ENUM["TYPE_LUC_PHE_BON"] = 5] = "TYPE_LUC_PHE_BON";
        ENUM[ENUM["TYPE_BINH_THUONG"] = 6] = "TYPE_BINH_THUONG";
        ENUM[ENUM["TYPE_BINH_LUNG"] = 7] = "TYPE_BINH_LUNG";
      })(ENUM = CardTypes.ENUM || (CardTypes.ENUM = {}));
      function toEnum(val) {
        return ENUM[ENUM[val]];
      }
      CardTypes.toEnum = toEnum;
      function getBinhName(maubinhType) {
        switch (maubinhType) {
         case CardTypes.ENUM.TYPE_RONG_CUON:
          return "S\u1ea3nh R\u1ed3ng Cu\u1ed1n";

         case CardTypes.ENUM.TYPE_NAM_DOI_MOT_SAM:
          return "N\u0103m \u0110\xf4i M\u1ed9t S\xe1m";

         case CardTypes.ENUM.TYPE_SANH_RONG:
          return "S\u1ea3nh R\u1ed3ng";

         case CardTypes.ENUM.TYPE_MUOI_BA_CAY_DONG_MAU:
          return "M\u01b0\u1eddi Ba C\xe2y \u0110\u1ed3ng M\xe0u";

         case CardTypes.ENUM.TYPE_MUOI_HAI_CAY_DONG_MAU:
          return "M\u01b0\u1eddi Hai C\xe2y \u0110\u1ed3ng M\xe0u";

         case CardTypes.ENUM.TYPE_BA_CAI_THUNG:
          return "Ba C\xe1i Th\xf9ng";

         case CardTypes.ENUM.TYPE_BA_CAI_SANH:
          return "Ba C\xe1i S\u1ea3nh";

         case CardTypes.ENUM.TYPE_LUC_PHE_BON:
          return "L\u1ee5c Ph\u1ebf B\xf4n";

         case CardTypes.ENUM.TYPE_BINH_THUONG:
          return "Binh Th\u01b0\u1eddng";

         case CardTypes.ENUM.TYPE_BINH_LUNG:
          return "Binh L\u1ee7ng";

         default:
          return "";
        }
      }
      CardTypes.getBinhName = getBinhName;
      function getBinhMultiple(maubinhType) {
        switch (maubinhType) {
         case CardTypes.ENUM.TYPE_RONG_CUON:
          return 72;

         case CardTypes.ENUM.TYPE_NAM_DOI_MOT_SAM:
          return 24;

         case CardTypes.ENUM.TYPE_SANH_RONG:
          return 72;

         case CardTypes.ENUM.TYPE_MUOI_BA_CAY_DONG_MAU:
          return 30;

         case CardTypes.ENUM.TYPE_MUOI_HAI_CAY_DONG_MAU:
          return 24;

         case CardTypes.ENUM.TYPE_BA_CAI_THUNG:
         case CardTypes.ENUM.TYPE_BA_CAI_SANH:
         case CardTypes.ENUM.TYPE_LUC_PHE_BON:
          return 18;

         case CardTypes.ENUM.TYPE_BINH_THUONG:
         case CardTypes.ENUM.TYPE_BINH_LUNG:
         default:
          return 1;
        }
      }
      CardTypes.getBinhMultiple = getBinhMultiple;
    })(CardTypes = exports.CardTypes || (exports.CardTypes = {}));
    var GroupKinds;
    (function(GroupKinds) {
      let ENUM;
      (function(ENUM) {
        ENUM[ENUM["GROUP_THUNG_PHA_SANH"] = 0] = "GROUP_THUNG_PHA_SANH";
        ENUM[ENUM["GROUP_TU_QUY"] = 1] = "GROUP_TU_QUY";
        ENUM[ENUM["GROUP_CU_LU"] = 2] = "GROUP_CU_LU";
        ENUM[ENUM["GROUP_THUNG"] = 3] = "GROUP_THUNG";
        ENUM[ENUM["GROUP_SANH"] = 4] = "GROUP_SANH";
        ENUM[ENUM["GROUP_SAM_CO"] = 5] = "GROUP_SAM_CO";
        ENUM[ENUM["GROUP_THU"] = 6] = "GROUP_THU";
        ENUM[ENUM["GROUP_MOT_DOI"] = 7] = "GROUP_MOT_DOI";
        ENUM[ENUM["GROUP_MAU_THAU"] = 8] = "GROUP_MAU_THAU";
      })(ENUM = GroupKinds.ENUM || (GroupKinds.ENUM = {}));
      function toEnum(val) {
        return ENUM[ENUM[val]];
      }
      GroupKinds.toEnum = toEnum;
    })(GroupKinds = exports.GroupKinds || (exports.GroupKinds = {}));
    var CardKindLevels;
    (function(CardKindLevels) {
      let ENUM;
      (function(ENUM) {
        ENUM[ENUM["LV_THUONG"] = 0] = "LV_THUONG";
        ENUM[ENUM["LV_HA"] = 1] = "LV_HA";
        ENUM[ENUM["LV_BINH_THUONG"] = 2] = "LV_BINH_THUONG";
      })(ENUM = CardKindLevels.ENUM || (CardKindLevels.ENUM = {}));
      function toEnum(val) {
        return ENUM[ENUM[val]];
      }
      CardKindLevels.toEnum = toEnum;
    })(CardKindLevels = exports.CardKindLevels || (exports.CardKindLevels = {}));
    var CardColors;
    (function(CardColors) {
      let ENUM;
      (function(ENUM) {
        ENUM[ENUM["BLACK"] = 0] = "BLACK";
        ENUM[ENUM["RED"] = 1] = "RED";
      })(ENUM = CardColors.ENUM || (CardColors.ENUM = {}));
      function toEnum(val) {
        return ENUM[ENUM[val]];
      }
      CardColors.toEnum = toEnum;
    })(CardColors = exports.CardColors || (exports.CardColors = {}));
    var CardSuites;
    (function(CardSuites) {
      let ENUM;
      (function(ENUM) {
        ENUM[ENUM["SPADE"] = 0] = "SPADE";
        ENUM[ENUM["CLUB"] = 1] = "CLUB";
        ENUM[ENUM["DIAMOND"] = 2] = "DIAMOND";
        ENUM[ENUM["HEART"] = 3] = "HEART";
      })(ENUM = CardSuites.ENUM || (CardSuites.ENUM = {}));
      function toEnum(val) {
        return ENUM[ENUM[val]];
      }
      CardSuites.toEnum = toEnum;
    })(CardSuites = exports.CardSuites || (exports.CardSuites = {}));
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
    var MauBinhConstant;
    (function(MauBinhConstant) {
      MauBinhConstant.MAX_PLAYER = 4;
    })(MauBinhConstant = exports.MauBinhConstant || (exports.MauBinhConstant = {}));
    exports.default = MauBinhConstant;
    cc._RF.pop();
  }, {} ],
  "MauBinh.DetectGroupCards": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f9b67tXcw5LPJl58XvdhaB8", "MauBinh.DetectGroupCards");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.DetectGroupCards = void 0;
    const MauBinh_Constant_1 = require("./MauBinh.Constant");
    class DetectGroupCards {
      constructor() {
        this.groupKind = -1;
        this.cardList = [];
        this.valueList = [];
      }
      getGroupCardsInfo() {
        this.groupKind = this.getGroupKind();
        return this.groupKind;
      }
      getGroupKind() {
        if (1 == this.cardList.length) return MauBinh_Constant_1.GroupKinds.ENUM.GROUP_MAU_THAU;
        if (3 == this.cardList.length) {
          if (this.isSamCo()) return MauBinh_Constant_1.GroupKinds.ENUM.GROUP_SAM_CO;
          if (this.isMotDoi()) return MauBinh_Constant_1.GroupKinds.ENUM.GROUP_MOT_DOI;
        }
        if (5 == this.cardList.length) {
          if (this.isThungPhaSanh()) return MauBinh_Constant_1.GroupKinds.ENUM.GROUP_THUNG_PHA_SANH;
          if (this.isTuQuy()) return MauBinh_Constant_1.GroupKinds.ENUM.GROUP_TU_QUY;
          if (this.isCuLu()) return MauBinh_Constant_1.GroupKinds.ENUM.GROUP_CU_LU;
          if (this.isThung()) return MauBinh_Constant_1.GroupKinds.ENUM.GROUP_THUNG;
          if (this.isSanh()) return MauBinh_Constant_1.GroupKinds.ENUM.GROUP_SANH;
          if (this.isSamCo()) return MauBinh_Constant_1.GroupKinds.ENUM.GROUP_SAM_CO;
          if (this.isThu()) return MauBinh_Constant_1.GroupKinds.ENUM.GROUP_THU;
          if (this.isMotDoi()) return MauBinh_Constant_1.GroupKinds.ENUM.GROUP_MOT_DOI;
        }
        this.valueList = [];
        for (var a = this.getSortedCardList(), b = this.cardList.length - 1; 0 <= b; b--) this.valueList.push(a[b].number);
        return MauBinh_Constant_1.GroupKinds.ENUM.GROUP_MAU_THAU;
      }
      getGroupKindLevel(a) {
        var b = MauBinh_Constant_1.CardKindLevels.ENUM.LV_BINH_THUONG;
        !a || this.groupKind != MauBinh_Constant_1.GroupKinds.ENUM.GROUP_THUNG_PHA_SANH && this.groupKind != MauBinh_Constant_1.GroupKinds.ENUM.GROUP_SANH || (10 == this.valueList[0] ? b = MauBinh_Constant_1.CardKindLevels.ENUM.LV_THUONG : 14 == this.valueList[0] && (b = MauBinh_Constant_1.CardKindLevels.ENUM.LV_HA));
        return b;
      }
      getSortedCardList() {
        var a = [];
        for (let b = 0; b < this.cardList.length; b++) a.push(this.cardList[b]);
        return a.sort(function(a, c) {
          return a.id - c.id;
        });
      }
      sortCardList(isIncrease) {
        isIncrease ? this.cardList.sort(function(a, c) {
          return c.id - a.id;
        }) : this.cardList.sort(function(a, c) {
          return a.id - c.id;
        });
      }
      isThungPhaSanh() {
        if (5 != this.cardList.length) return !1;
        for (var a = this.getSortedCardList(), b = 1, c = 1; c < this.cardList.length; c++) a[c].suit == a[c - 1].suit && (a[c].number == a[c - 1].number + 1 || 2 == a[0].number && 14 == a[c].number) && b++;
        b == this.cardList.length && (this.valueList = [], 2 == a[0].number && 14 == a[a.length - 1].number ? this.valueList.push(1) : this.valueList.push(a[0].number));
        return b == this.cardList.length;
      }
      isTuQuy() {
        if (5 != this.cardList.length) return !1;
        for (var a = 0; a < this.cardList.length; a++) for (var b = 1, c = 0; c < this.cardList.length; c++) if (a != c && this.cardList[a].number == this.cardList[c].number && b++, 
        4 == b) return this.valueList = [], this.valueList.push(this.cardList[a].number), 
        !0;
        return !1;
      }
      isCuLu() {
        if (5 != this.cardList.length) return !1;
        var a = this.getSortedCardList(), b = !1;
        a[0].number == a[1].number && (a[1].number == a[2].number && a[3].number == a[4].number && (b = !0, 
        this.valueList = [], this.valueList.push(a[0].number), this.valueList.push(a[3].number)), 
        a[2].number == a[3].number && a[3].number == a[4].number && (b = !0, this.valueList = [], 
        this.valueList.push(a[2].number), this.valueList.push(a[0].number)));
        return b;
      }
      isThung() {
        var a = this.getSortedCardList();
        if (5 != this.cardList.length) return !1;
        for (var b = 1; b < this.cardList.length; b++) if (a[b].suit != a[0].suit) return !1;
        this.valueList = [];
        for (b = this.cardList.length - 1; 0 <= b; b--) this.valueList.push(a[b].number);
        return !0;
      }
      isSanh() {
        if (5 != this.cardList.length) return !1;
        for (var a = this.getSortedCardList(), b = 1, c = 1; c < this.cardList.length; c++) (a[c].number == a[c - 1].number + 1 || 2 == a[0].number && 14 == a[c].number && 4 == b) && b++;
        b == this.cardList.length && (this.valueList = [], 2 == a[0].number && 14 == a[a.length - 1].number ? this.valueList.push(1) : this.valueList.push(a[0].number));
        return b == this.cardList.length;
      }
      isSamCo() {
        for (var a = 0; a < this.cardList.length; a++) {
          for (var b = 1, c = 0; c < this.cardList.length; c++) a != c && this.cardList[a].number == this.cardList[c].number && b++;
          if (3 == b) return this.valueList = [], this.valueList.push(this.cardList[a].number), 
          !0;
        }
        return !1;
      }
      isThu() {
        if (5 != this.cardList.length) return !1;
        for (var a = [], b = 0; b < this.cardList.length - 1; b++) if (-1 == a.indexOf(this.cardList[b].number)) for (var c = b + 1; c < this.cardList.length; c++) if (this.cardList[b].number == this.cardList[c].number) {
          a.push(this.cardList[b].number);
          break;
        }
        if (2 == a.length) {
          this.valueList = [];
          this.valueList.push(Math.max(a[0], a[1]));
          this.valueList.push(Math.min(a[0], a[1]));
          for (b = 0; b < this.cardList.length; b++) -1 == a.indexOf(this.cardList[b].number) && this.valueList.push(this.cardList[b].number);
          return !0;
        }
        return !1;
      }
      isMotDoi() {
        for (var a = [], b = 0; b < this.cardList.length - 1; b++) for (let c = b + 1; c < this.cardList.length; c++) this.cardList[b].number == this.cardList[c].number && a.push(this.cardList[b].number);
        if (1 == a.length) {
          this.valueList = [];
          this.valueList.push(a[0]);
          let d = this.getSortedCardList();
          for (b = this.cardList.length - 1; 0 <= b; b--) d[b].number != a[0] && this.valueList.push(d[b].number);
          return !0;
        }
        return !1;
      }
      addCard(card) {
        this.cardList.push(card);
      }
    }
    exports.DetectGroupCards = DetectGroupCards;
    exports.default = DetectGroupCards;
    cc._RF.pop();
  }, {
    "./MauBinh.Constant": "MauBinh.Constant"
  } ],
  "MauBinh.DetectPlayerCards": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0895cqkOZ1FQ6FEXmsgpXkF", "MauBinh.DetectPlayerCards");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.DetectPlayerCards = void 0;
    const MauBinh_DetectGroupCards_1 = require("./MauBinh.DetectGroupCards");
    const MauBinh_Constant_1 = require("./MauBinh.Constant");
    class DetectPlayerCards {
      constructor() {
        this.maubinhType = MauBinh_Constant_1.CardTypes.ENUM.TYPE_BINH_THUONG;
        this.chiDau = new MauBinh_DetectGroupCards_1.default();
        this.chiGiua = new MauBinh_DetectGroupCards_1.default();
        this.chiCuoi = new MauBinh_DetectGroupCards_1.default();
      }
      initCard(a) {
        for (var c = 10; c < 13; c++) this.chiCuoi.addCard(a[c - 10]);
        for (c = 5; c < 10; c++) this.chiGiua.addCard(a[c - 2]);
        for (c = 0; c < 5; c++) this.chiDau.addCard(a[c + 8]);
      }
      getPlayerCardsInfo(isTinhAce) {
        let kind_01 = this.chiDau.getGroupCardsInfo();
        let kind_02 = this.chiGiua.getGroupCardsInfo();
        let kind_03 = this.chiCuoi.getGroupCardsInfo();
        this.isSanhRong() ? this.maubinhType = MauBinh_Constant_1.CardTypes.ENUM.TYPE_SANH_RONG : isTinhAce && this.isMuoiBaCayDongMau() ? this.maubinhType = MauBinh_Constant_1.CardTypes.ENUM.TYPE_MUOI_BA_CAY_DONG_MAU : isTinhAce && this.isMuoiHaiCayDongMau() ? this.maubinhType = MauBinh_Constant_1.CardTypes.ENUM.TYPE_MUOI_HAI_CAY_DONG_MAU : this.isBaCaiThung() ? this.maubinhType = MauBinh_Constant_1.CardTypes.ENUM.TYPE_BA_CAI_THUNG : this.isBaCaiSanh() ? this.maubinhType = MauBinh_Constant_1.CardTypes.ENUM.TYPE_BA_CAI_SANH : this.isLucPheBon() ? this.maubinhType = MauBinh_Constant_1.CardTypes.ENUM.TYPE_LUC_PHE_BON : this.isBinhLung(isTinhAce) ? this.maubinhType = MauBinh_Constant_1.CardTypes.ENUM.TYPE_BINH_LUNG : this.maubinhType = MauBinh_Constant_1.CardTypes.ENUM.TYPE_BINH_THUONG;
        return {
          cardType: this.maubinhType,
          chiDau: kind_01,
          chiGiua: kind_02,
          chiCuoi: kind_03
        };
      }
      addCardToChiDau(a) {
        this.chiDau.addCard(a);
      }
      addCardToChiGiua(a) {
        this.chiGiua.addCard(a);
      }
      addCardToChiCuoi(a) {
        this.chiCuoi.addCard(a);
      }
      getChi(a) {
        switch (a) {
         case 1:
          return this.chiDau;

         case 2:
          return this.chiGiua;

         case 3:
          return this.chiCuoi;
        }
      }
      getGroupCardContainsIndex(a) {
        return 0 <= a && 5 > a ? this.chiDau : 10 > a ? this.chiGiua : 13 > a ? this.chiCuoi : null;
      }
      getAllCards() {
        var a = [], a = a.concat(this.chiDau.cardList), a = a.concat(this.chiGiua.cardList);
        return a.concat(this.chiCuoi.cardList);
      }
      swapCard(a, b) {
        var c = a.id;
        a.id = b.id;
        b.id = c;
      }
      isSanhRong() {
        for (var a = this.getSortedCardListFromList(this.getAllCards()), b = 0, c = 1, d = 0; d < a.length; d++) c++, 
        a[d].number == c && b++;
        return 13 == b;
      }
      isMuoiBaCayDongMau() {
        const blackCardCount = this.getAllCards().filter(card => card.getColor() === MauBinh_Constant_1.CardColors.ENUM.BLACK).length;
        return 13 === blackCardCount || 0 === blackCardCount;
      }
      isMuoiHaiCayDongMau() {
        const blackCardCount = this.getAllCards().filter(card => card.getColor() === MauBinh_Constant_1.CardColors.ENUM.BLACK).length;
        return 12 === blackCardCount || 1 === blackCardCount;
      }
      isBaCaiThung() {
        if (!(this.chiDau.groupKind != MauBinh_Constant_1.GroupKinds.ENUM.GROUP_THUNG_PHA_SANH && this.chiDau.groupKind != MauBinh_Constant_1.GroupKinds.ENUM.GROUP_THUNG || this.chiGiua.groupKind != MauBinh_Constant_1.GroupKinds.ENUM.GROUP_THUNG_PHA_SANH && this.chiGiua.groupKind != MauBinh_Constant_1.GroupKinds.ENUM.GROUP_THUNG)) {
          var a = this.chiCuoi.cardList;
          if (a[0].suit == a[1].suit && a[1].suit == a[2].suit) return !0;
        }
        return !1;
      }
      isBaCaiSanh() {
        if (!(this.chiDau.groupKind != MauBinh_Constant_1.GroupKinds.ENUM.GROUP_THUNG_PHA_SANH && this.chiDau.groupKind != MauBinh_Constant_1.GroupKinds.ENUM.GROUP_SANH || this.chiGiua.groupKind != MauBinh_Constant_1.GroupKinds.ENUM.GROUP_THUNG_PHA_SANH && this.chiGiua.groupKind != MauBinh_Constant_1.GroupKinds.ENUM.GROUP_SANH)) {
          var a = this.getSortedCardListFromList(this.chiCuoi.cardList);
          if (a[0].number + 1 == a[1].number && a[1].number + 1 == a[2].number || 2 == a[0].number && 3 == a[1].number && 14 == a[2].number) return !0;
        }
        return !1;
      }
      haveSauDoi() {
        for (var a = this.getSortedCardListFromList(this.getAllCards()), b = 0, c = 0; c < a.length; ) c + 1 < a.length && a[c + 1].number == a[c].number && (b++, 
        c++), c++;
        return 6 == b;
      }
      isLucPheBon() {
        return !(!this.haveSauDoi() || this.chiDau.groupKind != MauBinh_Constant_1.GroupKinds.ENUM.GROUP_THU || this.chiGiua.groupKind != MauBinh_Constant_1.GroupKinds.ENUM.GROUP_THU || this.chiCuoi.groupKind != MauBinh_Constant_1.GroupKinds.ENUM.GROUP_MOT_DOI);
      }
      haveNamDoi() {
        for (var a = this.getSortedCardListFromList(this.getAllCards()), b = 0, c = 0; c < a.length; ) c + 1 < a.length && a[c + 1].number == a[c].number && (b++, 
        c++), c++;
        return 5 == b;
      }
      isNamDoiMotSam() {
        return this.haveNamDoi() && this.chiDau.groupKind == MauBinh_Constant_1.GroupKinds.ENUM.GROUP_CU_LU;
      }
      isBinhLung(a) {
        return 0 > this.compareChi(this.chiDau, this.chiGiua, a) || 0 > this.compareChi(this.chiGiua, this.chiCuoi, a);
      }
      getSortedCardListFromList(a) {
        for (var b = [], c = 0; c < a.length; c++) b.push(a[c]);
        for (c = 0; c < b.length - 1; c++) for (a = c + 1; a < b.length; a++) if (b[c].id > b[a].id) {
          var d = b[c];
          b[c] = b[a];
          b[a] = d;
        }
        return b;
      }
      compareChi(a, b, c) {
        if (a.groupKind > b.groupKind) return -1;
        if (a.groupKind < b.groupKind) return 1;
        if (c) {
          var d = a.getGroupKindLevel(c);
          c = b.getGroupKindLevel(c);
          if (d > c) return -1;
          if (d < c) return 1;
        }
        for (d = 0; d < a.valueList.length; d++) {
          if (a.valueList[d] > b.valueList[d]) return 1;
          if (a.valueList[d] < b.valueList[d]) return -1;
        }
        return 0;
      }
    }
    exports.DetectPlayerCards = DetectPlayerCards;
    exports.default = DetectPlayerCards;
    cc._RF.pop();
  }, {
    "./MauBinh.Constant": "MauBinh.Constant",
    "./MauBinh.DetectGroupCards": "MauBinh.DetectGroupCards"
  } ],
  "MauBinh.HandleDragAndDrop": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "527c6M/1FdBBopLOj0FmcIK", "MauBinh.HandleDragAndDrop");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const MauBinh_InGame_1 = require("./MauBinh.InGame");
    const MauBinh_CardDrag_1 = require("./MauBinh.CardDrag");
    var TYPE_CARD_MAU_BINH = {
      NONE: -1,
      HIGH_CARD: 0,
      PAIR: 1,
      TWO_PAIR: 2,
      THREE_OF_A_KIND: 3,
      STRAIGHT: 4,
      FLUSH: 5,
      FULL_HOUSE: 6,
      FOUR_OF_A_KIND: 7,
      STRAIGHT_FLUSH: 8,
      THREE_FLUSHES: 9,
      THREE_STRAIGHT: 10,
      SIX_PAIRS: 11,
      SAME_COLOR: 12,
      DRAGON: 13,
      GRAND_DRAGON: 14
    };
    const {ccclass: ccclass, property: property} = cc._decorator;
    let HandleDragAndDrop = class HandleDragAndDrop extends cc.Component {
      constructor() {
        super(...arguments);
        this.nodeCardPrefab = null;
        this.currentCard = [];
        this.cardSelect = null;
        this.isPlaying = false;
      }
      setListCard(cardDTOs) {
        for (let i = 0; i < cardDTOs.length; i++) {
          let card = null;
          if (i < this.currentCard.length) card = this.currentCard[i]; else {
            card = cc.instantiate(this.nodeCardPrefab).getComponent(MauBinh_CardDrag_1.default);
            card.node.parent = this.node;
            this.currentCard.push(card);
          }
          card.node.active = true;
          card.setTextureWithCardData(cardDTOs[i]);
        }
        this.resetAllCard();
        this.sortPosition(true, () => {
          MauBinh_InGame_1.default.getInstance().checkUpdateCard();
        });
      }
      resetAllCard() {
        this.currentCard.forEach(cc => cc.resetState());
      }
      sortPosition(isXep = true, callback = null) {
        let cardTemp = [ [ this.currentCard[0], this.currentCard[1], this.currentCard[2] ], [ this.currentCard[3], this.currentCard[4], this.currentCard[5], this.currentCard[6], this.currentCard[7] ], [ this.currentCard[8], this.currentCard[9], this.currentCard[10], this.currentCard[11], this.currentCard[12] ] ];
        let spacing = isXep ? 10 : 5;
        let scale = isXep ? .75 : .5;
        for (let i = 0; i < cardTemp.length; i++) {
          let lsItem = cardTemp[i];
          for (let j = 0; j < lsItem.length; j++) {
            let card = lsItem[j];
            card.node.zIndex = j;
            let px = (j - Math.floor(.5 * lsItem.length) + (lsItem.length % 2 == 0 ? .5 : 0)) * (card.node.width + spacing) * scale - 100;
            let py = cc.winSize.height / 1280 * -350 + (1 - i) * (card.node.height + spacing) * scale;
            cc.Tween.stopAllByTarget(card.node);
            i >= cardTemp.length - 1 && j >= lsItem.length - 1 && callback ? cc.tween(card.node).to(.2, {
              x: px,
              y: py,
              scale: scale
            }).call(callback).start() : cc.tween(card.node).to(.2, {
              x: px,
              y: py,
              scale: scale
            }).start();
          }
        }
      }
      actionSwapChi() {
        this.swapObject(3, 8);
        this.swapObject(4, 9);
        this.swapObject(5, 10);
        this.swapObject(6, 11);
        this.swapObject(7, 12);
        this.sortPosition();
      }
      swapObject(index1, index2) {
        let temp = this.currentCard[index1];
        this.currentCard[index1] = this.currentCard[index2];
        this.currentCard[index2] = temp;
      }
      getListCard() {
        return this.currentCard.map(card => card.getCardDTO());
      }
      onTouch() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
      }
      offTouch() {
        this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
      }
      onTouchStart(event) {
        let pos = this.node.convertToNodeSpaceAR(event.getLocation());
        for (let i = this.currentCard.length - 1; i >= 0; i--) {
          let card = this.currentCard[i];
          if (card.node.getBoundingBox().contains(pos)) {
            this.cardSelect = card;
            this.cardSelect.setCardFocus(true);
            return;
          }
        }
      }
      onTouchMove(event) {
        if (null == this.cardSelect) return;
        this.cardSelect.node.zIndex = cc.macro.MAX_ZINDEX;
        let pos = this.node.convertToNodeSpaceAR(event.getLocation());
        for (let i = this.currentCard.length - 1; i >= 0; i--) {
          let card = this.currentCard[i];
          card != this.cardSelect && (card.node.getBoundingBox().contains(pos) ? card.setCardFocus(true) : card.setCardFocus(false));
        }
        this.cardSelect.node.position = pos;
      }
      onTouchEnd(event) {
        if (null == this.cardSelect) return;
        let pos = this.node.convertToNodeSpaceAR(event.getLocation());
        for (let i = this.currentCard.length - 1; i >= 0; i--) {
          let card = this.currentCard[i];
          if (card != this.cardSelect && card.node.getBoundingBox().contains(pos)) {
            let indexSelect = this.currentCard.indexOf(this.cardSelect);
            this.swapObject(i, indexSelect);
            break;
          }
        }
        this.cardSelect = null;
        this.resetAllCard();
        this.sortPosition();
        MauBinh_InGame_1.default.getInstance().checkUpdateCard();
      }
      shadowCard(index, state) {
        this.currentCard[index].setCardShadow(state);
      }
      actionAutoSort() {
        this.isPlaying = false;
        this.resetAllCard();
        let newChi1 = [];
        let newChi2 = [];
        let newChi3 = [];
        let typeCard = [ 0, 1, 2, 3, 4, 5, 6 ];
        let thisCards = this.currentCard.slice();
        typeCard.sort(function(a, b) {
          return .5 - Math.random();
        });
        for (let i = 0; i <= 7; i++) {
          0 !== newChi3.length && (newChi3 = []);
          let x = typeCard[i];
          switch (x) {
           case 0:
            newChi3 = this.getDoi(thisCards);
            break;

           case 1:
            newChi3 = this.getThu(thisCards);
            break;

           case 2:
            newChi3 = this.getSamCo(thisCards);
            break;

           case 3:
            newChi3 = this.getSanh(thisCards);
            break;

           case 4:
            newChi3 = this.getThung(thisCards);
            break;

           case 5:
            newChi3 = this.getCuLu(thisCards);
            break;

           case 6:
            newChi3 = this.getTuQuy(thisCards);
          }
          if (0 !== newChi3.length) {
            newChi1 = [];
            newChi1 = this.getMauThau(thisCards);
            newChi2 = [];
            newChi2 = thisCards;
            if (3 === newChi1.length && 5 === newChi2.length && 5 === newChi3.length && this.compareRank(newChi2, newChi1) >= 0 && this.compareRank(newChi3, newChi2) >= 0) break;
            thisCards = [];
            thisCards = this.currentCard.slice();
          }
          if (7 === i) {
            newChi1 = [];
            newChi2 = [];
            0 !== newChi3.length && (newChi3 = []);
            break;
          }
        }
        if (3 === newChi1.length && 5 === newChi2.length && 5 === newChi3.length) {
          this.currentCard = [];
          for (let i = 0; i < newChi1.length; i++) this.currentCard.push(newChi1[i]);
          for (let i = 0; i < newChi2.length; i++) this.currentCard.push(newChi2[i]);
          for (let i = 0; i < newChi3.length; i++) this.currentCard.push(newChi3[i]);
          this.sortPosition();
        }
      }
      getMauThau(arrCard) {
        let mauThau = [];
        mauThau.push(arrCard[0]);
        for (let i = 1; i < arrCard.length; i++) if (!arrCard[i].getCardDTO().isSameNumber(mauThau[0].getCardDTO())) {
          mauThau.push(arrCard[i]);
          break;
        }
        for (let i = 2; i < arrCard.length; i++) if (!arrCard[i].getCardDTO().isSameNumber(mauThau[1].getCardDTO())) {
          mauThau.push(arrCard[i]);
          break;
        }
        for (let i = 0; i < mauThau.length; i++) for (let j = 0; j < arrCard.length; j++) if (mauThau[i].getCardDTO().equals(arrCard[j].getCardDTO())) {
          arrCard.splice(j, 1);
          break;
        }
        mauThau.sort((x, y) => x.getCardDTO().number - y.getCardDTO().number);
        return mauThau;
      }
      getDoi(arrCard) {
        let doi = [];
        if (!this.checkDoi(arrCard)) return doi;
        arrCard.sort((x, y) => x.getCardDTO().number - y.getCardDTO().number);
        for (let i = arrCard.length - 1; i > 0; i--) if (arrCard[i].getCardDTO().isSameNumber(arrCard[i - 1].getCardDTO())) {
          doi.push(arrCard[i]);
          doi.push(arrCard[i - 1]);
          break;
        }
        for (let i = 0; i < doi.length; i++) for (let j = 0; j < arrCard.length; j++) if (doi[i].getCardDTO().equals(arrCard[j].getCardDTO())) {
          arrCard.splice(j, 1);
          break;
        }
        doi.push(arrCard[0]);
        doi.push(arrCard[1]);
        doi.push(arrCard[2]);
        for (let i = 0; i < doi.length; i++) for (let j = 0; j < arrCard.length; j++) if (doi[i].getCardDTO().equals(arrCard[j].getCardDTO())) {
          arrCard.splice(j, 1);
          break;
        }
        return doi;
      }
      getThu(arrCard) {
        let thu = [];
        if (!this.checkThu(arrCard)) return thu;
        arrCard.sort((x, y) => x.getCardDTO().number - y.getCardDTO().number);
        for (let i = arrCard.length - 1; i > 0; i--) if (arrCard[i].getCardDTO().isSameNumber(arrCard[i - 1].getCardDTO())) {
          thu.push(arrCard[i]);
          thu.push(arrCard[i - 1]);
          break;
        }
        for (let i = 0; i < thu.length; i++) for (let j = 0; j < arrCard.length; j++) if (thu[i].getCardDTO().equals(arrCard[j].getCardDTO())) {
          arrCard.splice(j, 1);
          break;
        }
        for (let i = arrCard.length - 1; i > 0; i--) if (arrCard[i].getCardDTO().isSameNumber(arrCard[i - 1].getCardDTO())) {
          thu.push(arrCard[i]);
          thu.push(arrCard[i - 1]);
          break;
        }
        for (let i = 0; i < thu.length; i++) for (let j = 0; j < arrCard.length; j++) if (thu[i].getCardDTO().equals(arrCard[j].getCardDTO())) {
          arrCard.splice(j, 1);
          break;
        }
        thu.push(arrCard[0]);
        for (let i = 0; i < thu.length; i++) for (let j = 0; j < arrCard.length; j++) if (thu[i].getCardDTO().equals(arrCard[j].getCardDTO())) {
          arrCard.splice(j, 1);
          break;
        }
        return thu;
      }
      getSamCo(arrCard) {
        let samCo = [];
        if (!this.checkXam(arrCard)) return samCo;
        arrCard.sort((x, y) => x.getCardDTO().number - y.getCardDTO().number);
        for (let i = arrCard.length - 1; i > 1; i--) if (arrCard[i].getCardDTO().isSameNumber(arrCard[i].getCardDTO())) {
          samCo.push(arrCard[i]);
          samCo.push(arrCard[i - 1]);
          samCo.push(arrCard[i - 2]);
          break;
        }
        for (let i = 0; i < samCo.length; i++) for (let j = 0; j < arrCard.length; j++) if (samCo[i].getCardDTO().equals(arrCard[j].getCardDTO())) {
          arrCard.splice(j, 1);
          break;
        }
        samCo.push(arrCard[0]);
        samCo.push(arrCard[1]);
        for (let i = 0; i < samCo.length; i++) for (let j = 0; j < arrCard.length; j++) if (samCo[i].getCardDTO().equals(arrCard[j].getCardDTO())) {
          arrCard.splice(j, 1);
          break;
        }
        return samCo;
      }
      getSanh(arrCard) {
        let sanh = [];
        if (!this.checkSanh(arrCard, 5)) return sanh;
        arrCard.sort((x, y) => x.getCardDTO().number - y.getCardDTO().number);
        let index;
        for (let i = arrCard.length - 1; i > 3; i--) {
          index = 1;
          sanh = [];
          let card1 = arrCard[i];
          sanh.push(card1);
          for (let j = i - 1; j >= 0; j--) {
            let card2 = arrCard[j];
            if (card2.getCardDTO().number === card1.getCardDTO().number - 1) {
              sanh.push(card2);
              index++;
              card1 = card2;
              if (5 === index) {
                for (let i = 0; i < sanh.length; i++) for (let j = 0; j < arrCard.length; j++) if (sanh[i].getCardDTO().equals(arrCard[j].getCardDTO())) {
                  arrCard.splice(j, 1);
                  break;
                }
                sanh.sort((x, y) => x.getCardDTO().number - y.getCardDTO().number);
                return sanh;
              }
            }
          }
        }
        sanh = [];
        index = 2;
        let card1 = arrCard[arrCard.length - 1];
        let card2 = arrCard[0];
        if (14 === card1.getCardDTO().number && 2 === card2.getCardDTO().number) {
          sanh.push(card1);
          sanh.push(card2);
          card1 = card2;
          for (let i = 1; i < arrCard.length; i++) {
            let card2 = arrCard[i];
            if (card2.getCardDTO().number === card1.getCardDTO().number + 1) {
              sanh.push(card2);
              index++;
              card1 = card2;
              if (5 === index) break;
            }
          }
        }
        for (let i = 0; i < sanh.length; i++) for (let j = 0; j < arrCard.length; j++) if (sanh[i].getCardDTO().equals(arrCard[j].getCardDTO())) {
          arrCard.splice(j, 1);
          break;
        }
        return sanh;
      }
      getThung(arrCard) {
        let thung = [];
        if (!this.checkThung(arrCard, 5)) return thung;
        arrCard.sort((x, y) => x.getCardDTO().number - y.getCardDTO().number);
        let index;
        for (let suit = 1; suit <= 4; suit++) {
          index = 0;
          thung = [];
          for (let i = arrCard.length - 1; i >= 0; i--) {
            let card = arrCard[i];
            if (card.getCardDTO().suit === suit) {
              thung.push(card);
              index++;
              if (5 === index) {
                for (let i = 0; i < thung.length; i++) for (let j = 0; j < arrCard.length; j++) if (thung[i].getCardDTO().equals(arrCard[j].getCardDTO())) {
                  arrCard.splice(j, 1);
                  break;
                }
                thung.sort((x, y) => x.getCardDTO().number - y.getCardDTO().number);
                return thung;
              }
            }
          }
        }
        return thung;
      }
      getCuLu(arrCard) {
        let culu = [];
        if (!this.checkCulu(arrCard)) return culu;
        arrCard.sort((x, y) => x.getCardDTO().number - y.getCardDTO().number);
        for (let i = arrCard.length - 1; i > 1; i--) if (arrCard[i].getCardDTO().isSameNumber(arrCard[i].getCardDTO())) {
          culu.push(arrCard[i]);
          culu.push(arrCard[i - 1]);
          culu.push(arrCard[i - 2]);
          break;
        }
        for (let i = 0; i < culu.length; i++) for (let j = 0; j < arrCard.length; j++) if (culu[i].getCardDTO().equals(arrCard[j].getCardDTO())) {
          arrCard.splice(j, 1);
          break;
        }
        for (let i = arrCard.length - 1; i > 0; i--) if (arrCard[i].getCardDTO().isSameNumber(arrCard[i - 1].getCardDTO())) {
          culu.push(arrCard[i]);
          culu.push(arrCard[i - 1]);
          break;
        }
        for (let i = 0; i < culu.length; i++) for (let j = 0; j < arrCard.length; j++) if (culu[i].getCardDTO().equals(arrCard[j].getCardDTO())) {
          arrCard.splice(j, 1);
          break;
        }
        culu.sort((x, y) => x.getCardDTO().number - y.getCardDTO().number);
        return culu;
      }
      getTuQuy(arrCard) {
        let tuquy = [];
        if (!this.checkTuQuy(arrCard)) return tuquy;
        arrCard.sort((x, y) => x.getCardDTO().number - y.getCardDTO().number);
        for (let i = arrCard.length - 1; i > 0; i--) if (arrCard[i].getCardDTO().isSameNumber(arrCard[i - 3].getCardDTO())) {
          tuquy.push(arrCard[i]);
          tuquy.push(arrCard[i - 1]);
          tuquy.push(arrCard[i - 2]);
          tuquy.push(arrCard[i - 3]);
          break;
        }
        tuquy[0].getCardDTO().isSameNumber(arrCard[0].getCardDTO()) ? tuquy.push(arrCard[12]) : tuquy.push(arrCard[0]);
        for (let i = 0; i < tuquy.length; i++) for (let j = 0; j < arrCard.length; j++) if (tuquy[i].getCardDTO().equals(arrCard[j].getCardDTO())) {
          arrCard.splice(j, 1);
          break;
        }
        return tuquy;
      }
      checkBinhGrandDragon(listIn) {
        for (let i = 1; i < listIn.length; i++) if (!listIn[i].getCardDTO().isSameSuit(listIn[i - 1].getCardDTO())) return false;
        if (!this.checkBinhDragon(listIn)) return false;
        return true;
      }
      checkBinhDragon(listIn) {
        let list = listIn.slice();
        list.sort((x, y) => x.getCardDTO().number - y.getCardDTO().number);
        for (let i = 1; i < list.length; i++) if (list[i].getCardDTO().number != list[i - 1].getCardDTO().number + 1) return false;
        return true;
      }
      checkBinhSameColor(listIn) {
        let black = 0;
        let red = 0;
        for (let i = 0; i < listIn.length; i++) listIn[i].getCardDTO().suit <= 2 ? black++ : red++;
        if (13 == black || 13 == red) return true;
        return false;
      }
      checkBinhSixPairs(listIn) {
        let list = listIn.slice();
        list.sort((x, y) => x.getCardDTO().number - y.getCardDTO().number);
        var index = 0;
        for (let i = 0; i < list.length - 1; i++) if (list[i].getCardDTO().isSameNumber(list[i + 1].getCardDTO())) {
          index++;
          i += 1;
        }
        if (6 == index) return true;
        return false;
      }
      checkBinhThreeStraights(list1, list2, list3) {
        if (!this.checkSanh(list1, 3) || !this.checkSanh(list2, 5) || !this.checkSanh(list3, 5)) return false;
        return true;
      }
      checkBinhThreeFlushes(list1, list2, list3) {
        if (!this.checkThung(list1, 3) || !this.checkThung(list2, 5) || !this.checkThung(list3, 5)) return false;
        return true;
      }
      checkThungPhaSanh(listIn, size) {
        let list = listIn.slice();
        if (true === this.checkThung(list, size) && true === this.checkSanh(list, size)) return true;
        return false;
      }
      checkTuQuy(listIn) {
        let list = listIn.slice();
        list.sort((x, y) => x.getCardDTO().number - y.getCardDTO().number);
        if (list.length < 4) return false;
        for (let i = 0; i < list.length - 1; i++) {
          let count = 0;
          for (let j = i + 1; j < list.length; j++) list[j].getCardDTO().isSameNumber(list[i].getCardDTO()) && count++;
          if (3 === count) return true;
        }
        return false;
      }
      checkCulu(listIn) {
        let list = listIn.slice();
        if (!this.checkXam(list) || list.length < 5) return false;
        list.sort((x, y) => x.getCardDTO().number - y.getCardDTO().number);
        if (5 === list.length) {
          for (let i = 0; i < list.length - 4; i++) if (list[i].getCardDTO().isSameNumber(list[i + 1].getCardDTO())) {
            if (list[i + 1].getCardDTO().isSameNumber(list[i + 2].getCardDTO()) && list[i + 3].getCardDTO().isSameNumber(list[i + 4].getCardDTO())) return true;
            if (list[i + 2].getCardDTO().isSameNumber(list[i + 3].getCardDTO()) && list[i + 3].getCardDTO().isSameNumber(list[i + 4].getCardDTO())) return true;
          }
          return false;
        }
        let tmp = [];
        for (let i = 0; i < list.length - 2; i++) {
          tmp = list;
          if (list[i].getCardDTO().isSameNumber(list[i + 1].getCardDTO()) && list[i + 1].getCardDTO().isSameNumber(list[i + 2].getCardDTO())) {
            tmp.slice(i, 3);
            if (this.checkDoi(tmp)) return true;
          }
        }
        return false;
      }
      checkThung(listIn, size) {
        let list = listIn.slice();
        if (list.length < size) return false;
        let count = 0;
        for (let i = 0; i < list.length; i++) {
          count = 0;
          for (let j = i + 1; j < list.length; j++) list[j].getCardDTO().isSameSuit(list[i].getCardDTO()) && count++;
          if (count >= size - 1) return true;
        }
        return false;
      }
      checkSanh(listIn, size) {
        let list = listIn.slice();
        if (list.length < size) return false;
        let c = [];
        for (let i = 0; i < list.length; i++) {
          c.push(list[i].getCardDTO().number);
          14 === list[i].getCardDTO().number && c.push(1);
        }
        c.sort((x, y) => x - y);
        for (let i = 0; i < c.length - 1; i++) {
          let count = 0;
          for (let j = i + 1; j < c.length; j++) c[i] + count + 1 === c[j] && count++;
          if (count >= size - 1) return true;
        }
        return false;
      }
      checkXam(listIn) {
        let list = listIn.slice();
        list.sort((x, y) => x.getCardDTO().number - y.getCardDTO().number);
        if (list.length < 3) return false;
        for (let i = 0; i < list.length - 2; i++) if (list[i].getCardDTO().isSameNumber(list[i + 1].getCardDTO()) && list[i + 1].getCardDTO().isSameNumber(list[i + 2].getCardDTO())) return true;
        return false;
      }
      checkThu(listIn) {
        let list = listIn.slice();
        list.sort((x, y) => x.getCardDTO().number - y.getCardDTO().number);
        if (list.length < 4) return false;
        for (let i = 0; i < list.length - 1; i++) if (list[i].getCardDTO().isSameNumber(list[i + 1].getCardDTO())) for (let j = i + 2; j < list.length - 1; j++) if (list[j].getCardDTO().isSameNumber(list[j + 1].getCardDTO())) return true;
        return false;
      }
      checkDoi(listIn) {
        let list = listIn.slice();
        list.sort((x, y) => x.getCardDTO().number - y.getCardDTO().number);
        if (list.length < 2) return false;
        for (let i = 0; i < list.length - 1; i++) if (list[i].getCardDTO().isSameNumber(list[i + 1].getCardDTO())) return true;
        return false;
      }
      compareMauThau(list1, list2) {
        for (let i = list1.length - 1; i >= 0; i--) {
          if (list1[i] > list2[i]) return 1;
          if (list1[i] < list2[i]) return -1;
        }
        return 0;
      }
      compareDoi(list1, list2) {
        var value1, value2;
        for (let i = 0; i < list1.length; i++) if (list1[i] == list1[i + 1]) {
          value1 = list1[i];
          break;
        }
        for (let i = 0; i < list2.length; i++) if (list2[i] == list2[i + 1]) {
          value2 = list2[i];
          break;
        }
        return value1 > value2 ? 1 : value1 < value2 ? -1 : this.compareMauThau(list1, list2);
      }
      compareThu(list1, list2) {
        if (list1[1] !== list1[2] && list1[2] !== list1[3]) {
          var temp = list1[2];
          list1.splice(2, 1);
          list1.unshift(temp);
        } else if (list1[3] !== list1[4]) {
          var temp = list1[4];
          list1.pop();
          list1.unshift(temp);
        }
        if (list2[1] !== list2[2] && list2[2] !== list2[3]) {
          var temp = list2[2];
          list2.splice(2, 1);
          list2.unshift(temp);
        } else if (list2[3] !== list2[4]) {
          var temp = list2[4];
          list2.pop();
          list2.unshift(temp);
        }
        return this.compareMauThau(list1, list2);
      }
      compareSamCo(list1, list2) {
        var value1, value2;
        for (let i = 0; i < list1.length; i++) if (list1[i] === list1[i + 1] && list1[i] === list1[i + 2]) {
          value1 = list1[i];
          break;
        }
        for (let i = 0; i < list2.length; i++) if (list2[i] === list2[i + 1] && list2[i] === list2[i + 2]) {
          value2 = list2[i];
          break;
        }
        if (value1 > value2) return 1;
        return -1;
      }
      compareSanh(list1, list2) {
        if (2 === list1[0] && 14 === list1[4]) {
          list1.pop();
          list1.unshift(1);
        }
        if (2 === list2[0] && 14 === list2[4]) {
          list2.pop();
          list2.unshift(1);
        }
        return this.compareMauThau(list1, list2);
      }
      compareThung(list1, list2) {
        return this.compareMauThau(list1, list2);
      }
      compareCuLu(list1, list2) {
        return this.compareSamCo(list1, list2);
      }
      compareTuQuy(list1, list2) {
        return this.compareDoi(list1, list2);
      }
      compareTPS(list1, list2) {
        return this.compareThung(list1, list2);
      }
      compareMauBinh(x, y) {
        if (x === y) return 0;
        return x > y ? 1 : -1;
      }
      compareRank(listCard1, listCard2) {
        var listValue1 = this.getListCardValue(listCard1);
        var listValue2 = this.getListCardValue(listCard2);
        var rank1 = this.getMauBinhRank(listCard1);
        var rank2 = this.getMauBinhRank(listCard2);
        if (rank1 === rank2) {
          if (rank1 === TYPE_CARD_MAU_BINH.HIGH_CARD) return this.compareMauThau(listValue1, listValue2);
          if (rank1 === TYPE_CARD_MAU_BINH.PAIR) return this.compareDoi(listValue1, listValue2);
          if (rank1 === TYPE_CARD_MAU_BINH.TWO_PAIR) return this.compareThu(listValue1, listValue2);
          if (rank1 === TYPE_CARD_MAU_BINH.THREE_OF_A_KIND) return this.compareSamCo(listValue1, listValue2);
          if (rank1 === TYPE_CARD_MAU_BINH.STRAIGHT) return this.compareSanh(listValue1, listValue2);
          if (rank1 === TYPE_CARD_MAU_BINH.FLUSH) return this.compareThung(listValue1, listValue2);
          if (rank1 === TYPE_CARD_MAU_BINH.FULL_HOUSE) return this.compareCuLu(listValue1, listValue2);
          if (rank1 === TYPE_CARD_MAU_BINH.FOUR_OF_A_KIND) return this.compareTuQuy(listValue1, listValue2);
          if (rank1 === TYPE_CARD_MAU_BINH.STRAIGHT_FLUSH) return this.compareTPS(listValue1, listValue2);
        } else if (rank1 > rank2) return 1;
        return -1;
      }
      getListCardValue(listCard) {
        var value = [];
        if (3 == listCard.length) {
          value.push(-2);
          value.push(-1);
        }
        for (let i = 0; i < listCard.length; i++) value.push(listCard[i].N);
        value.sort((x, y) => x - y);
        return value;
      }
      getMauBinhRank(listCard) {
        if (this.checkThungPhaSanh(listCard, 5)) return TYPE_CARD_MAU_BINH.STRAIGHT_FLUSH;
        if (this.checkTuQuy(listCard)) return TYPE_CARD_MAU_BINH.FOUR_OF_A_KIND;
        if (this.checkCulu(listCard)) return TYPE_CARD_MAU_BINH.FULL_HOUSE;
        if (this.checkThung(listCard, 5)) return TYPE_CARD_MAU_BINH.FLUSH;
        if (this.checkSanh(listCard, 5)) return TYPE_CARD_MAU_BINH.STRAIGHT;
        if (this.checkXam(listCard)) return TYPE_CARD_MAU_BINH.THREE_OF_A_KIND;
        if (this.checkThu(listCard)) return TYPE_CARD_MAU_BINH.TWO_PAIR;
        if (this.checkDoi(listCard)) return TYPE_CARD_MAU_BINH.PAIR;
        return TYPE_CARD_MAU_BINH.HIGH_CARD;
      }
    };
    __decorate([ property(cc.Node) ], HandleDragAndDrop.prototype, "nodeCardPrefab", void 0);
    HandleDragAndDrop = __decorate([ ccclass ], HandleDragAndDrop);
    exports.default = HandleDragAndDrop;
    cc._RF.pop();
  }, {
    "./MauBinh.CardDrag": "MauBinh.CardDrag",
    "./MauBinh.InGame": "MauBinh.InGame"
  } ],
  "MauBinh.InGame": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "97c85/a1ahNR5WoU+8m1+Ga", "MauBinh.InGame");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var MauBinhInGame_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.MauBinhCardDTO = void 0;
    const BroadcastReceiver_1 = require("../../Main/Game/src/common/BroadcastReceiver");
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const App_1 = require("../../Main/Game/src/common/App");
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    const MauBinh_Cmd_1 = require("./MauBinh.Cmd");
    const MauBinhNetworkClient_1 = require("../../Main/Game/src/networks/MauBinhNetworkClient");
    const MauBinh_DetectPlayerCards_1 = require("./MauBinh.DetectPlayerCards");
    const MauBinh_HandleDragAndDrop_1 = require("./MauBinh.HandleDragAndDrop");
    const MauBinh_Player_1 = require("./MauBinh.Player");
    const PopupCardDefinations_1 = require("../../Main/Game/src/games/cardgames/PopupCardDefinations");
    const MauBinh_Constant_1 = require("./MauBinh.Constant");
    const CardGame_Cmd_1 = require("../../Main/Game/src/networks/CardGame.Cmd");
    const PopupChatInGame_1 = require("../../Main/Game/src/games/cardgames/PopupChatInGame");
    const PopupSettingInGame_1 = require("../../Main/Game/src/games/cardgames/PopupSettingInGame");
    const MauBinh_PopupGuide_1 = require("./MauBinh.PopupGuide");
    const Common_AudioManager_1 = require("../../Main/Game/src/common/Common.AudioManager");
    const MauBinh_Listener_1 = require("./MauBinh.Listener");
    class MauBinhCardDTO {
      constructor(id) {
        this.id = id;
        this.suit = this.id % 4;
        this.number = Math.floor(this.id / 4) + 2;
      }
      static fromCardId(id) {
        return new MauBinhCardDTO(id);
      }
      get isHeo() {
        return 2 == this.number;
      }
      equals(target) {
        return target && this.number === target.number && this.suit === target.suit;
      }
      isSameNumber(target) {
        return target && this.number === target.number;
      }
      isSameSuit(target) {
        return target && this.suit === target.suit;
      }
      getColor() {
        if (this.suit == MauBinh_Constant_1.CardSuites.ENUM.SPADE || this.suit == MauBinh_Constant_1.CardSuites.ENUM.CLUB) return MauBinh_Constant_1.CardColors.ENUM.BLACK;
        if (this.suit == MauBinh_Constant_1.CardSuites.ENUM.DIAMOND || this.suit == MauBinh_Constant_1.CardSuites.ENUM.HEART) return MauBinh_Constant_1.CardColors.ENUM.RED;
        return null;
      }
    }
    exports.MauBinhCardDTO = MauBinhCardDTO;
    const PLAYER_POSITIONS = [ [ 0, 1, 2, 3 ], [ 1, 2, 3, 0 ], [ 2, 3, 0, 1 ], [ 3, 0, 1, 2 ] ];
    class ConfigPlayer {}
    const {ccclass: ccclass, property: property} = cc._decorator;
    let MauBinhInGame = MauBinhInGame_1 = class MauBinhInGame extends cc.Component {
      constructor() {
        super(...arguments);
        this.myPlayingCardBoard = null;
        this.groupPlayers = null;
        this.cardsDeal = null;
        this.labelRoomId = null;
        this.labelRoomBet = null;
        this.lbMatchId = null;
        this.labelTimer = null;
        this.suggestTarget = null;
        this.btnSoChi = null;
        this.btnSwap = null;
        this.btnAuto = null;
        this.btnCombining = null;
        this.notifyTimeStart = null;
        this.fxSoChiTotal = null;
        this.handleDragDrop = null;
        this.btnShowCardDefinations = null;
        this.backgroundMusic = null;
        this.winSound = null;
        this.cardFrames = [];
        this.cardBackFrame = null;
        this.configPlayer = [];
        this.cardGroupNames = [ "Th\xf9ng Ph\xe1 S\u1ea3nh", "T\u1ee9 Qu\xfd", "C\xf9 L\u0169", "Th\xf9ng", "S\u1ea3nh", "S\xe1m C\xf4", "Th\xfa", "\u0110\xf4i", "M\u1eadu Th\u1ea7u" ];
        this.timeAutoStart = null;
        this.betDuration = null;
        this.intervalWaitting = null;
        this.intervalBetting = null;
        this.myCardDTOs = [];
        this.cardDefinations = [];
        this.isFinish = false;
        this.mouseDownTime = new Date().getTime();
      }
      static getInstance() {
        return this.instance;
      }
      static destroyInstance() {
        this.instance = null;
      }
      onLoad() {
        MauBinhInGame_1.instance = this;
        this.initConfigPlayer();
      }
      start() {
        var _a;
        null === (_a = MauBinh_Listener_1.default.getInstance()) || void 0 === _a ? void 0 : _a.releasePendingCommands();
        BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.SET_SOUND, cc.find("Canvas"));
        true;
        this.getCardDefinations();
        Common_AudioManager_1.default.getInstance().playBackgroundMusicByGame(Configs_1.default.App.BUNDLE_NAME.MAUBINH, this.backgroundMusic);
        this.schedule(() => {
          new Date().getTime() - this.mouseDownTime <= 3e4 && MauBinhNetworkClient_1.default.getInstance().send(new MauBinh_Cmd_1.default.SendPing(0));
        }, 30);
        this.node.on(cc.Node.EventType.MOUSE_DOWN, () => {
          this.mouseDownTime = new Date().getTime();
        });
      }
      onDestroy() {
        this.unschedule(this.intervalWaitting);
        this.unschedule(this.intervalBetting);
        MauBinhInGame_1.instance = null;
      }
      updateRoomInfo(joinRoomSuccessData) {
        this.labelRoomId.string = joinRoomSuccessData.roomId.toString();
        this.labelRoomBet.string = Utils_1.default.formatNumber(joinRoomSuccessData.moneyBet);
        this.lbMatchId.string = joinRoomSuccessData.matchId + "";
        joinRoomSuccessData.gameState == MauBinh_Constant_1.GameState.ENUM.STATE_PLAYING && this.startBettingCountDown(joinRoomSuccessData.countDownTime);
        this.configPlayer[0].nickName = Configs_1.default.Login.Nickname;
        this.configPlayer[0].playerPos = joinRoomSuccessData.myChair;
        for (let i = 0; i < this.configPlayer.length; i++) {
          let player = this.configPlayer[i];
          player.playerPos = PLAYER_POSITIONS[joinRoomSuccessData.myChair][i];
          const seatId = player.seatId;
          this.getPlayerHouse(seatId).resetPlayerInfo(seatId);
          if (joinRoomSuccessData.playerStatus[player.playerPos] === MauBinh_Constant_1.PlayerState.ENUM.PLAYER_STATUS_OUT_GAME) {
            player.isViewer = true;
            this.getPlayerHouse(seatId).showBtnInvite(true);
          } else if (joinRoomSuccessData.playerStatus[player.playerPos] === MauBinh_Constant_1.PlayerState.ENUM.PLAYER_STATUS_VIEWER) {
            player.isViewer = true;
            this.getPlayerHouse(seatId).setIsViewer(true);
            this.getPlayerHouse(seatId).playFxViewer();
            this.setupSeatPlayer(seatId, joinRoomSuccessData.playerInfos[player.playerPos]);
          } else if (joinRoomSuccessData.playerStatus[player.playerPos] === MauBinh_Constant_1.PlayerState.ENUM.PLAYER_STATUS_SITTING) {
            player.isViewer = false;
            this.getPlayerHouse(seatId).setIsViewer(false);
            this.setupSeatPlayer(seatId, joinRoomSuccessData.playerInfos[player.playerPos]);
          } else if (joinRoomSuccessData.playerStatus[player.playerPos] === MauBinh_Constant_1.PlayerState.ENUM.PLAYER_STATUS_PLAYING) {
            player.isViewer = false;
            this.getPlayerHouse(seatId).setIsViewer(false);
            if (0 !== seatId && joinRoomSuccessData.gameState == MauBinh_Constant_1.GameState.ENUM.STATE_PLAYING) {
              this.getPlayerHouse(seatId).playFxDangXep();
              this.getPlayerHouse(seatId).showCardReal(true);
              this.getPlayerHouse(seatId).showCardReady(false);
            }
            this.setupSeatPlayer(seatId, joinRoomSuccessData.playerInfos[player.playerPos]);
          }
        }
      }
      receivedAutoStart(autoStartData) {
        this.isFinish = false;
        if (!autoStartData.isAutoStart) return;
        this.startWaittingCountDown(autoStartData.timeAutoStart);
        this.setIsActiveButton(false, false);
        this.resetPlayersPlaying();
        for (let index = 0; index < MauBinh_Constant_1.default.MAX_PLAYER; index++) this.getPlayerHouse(index).resetResultGame();
        this.fxSoChiTotal.stopAllActions();
        this.fxSoChiTotal.active = false;
      }
      receivedMoiDatCuoc(moiDatCuocData) {
        this.startBettingCountDown(moiDatCuocData.timeDatCuoc);
        this.setIsActiveButton(true, true);
      }
      receivedDealCard(dealCardData) {
        this.mouseDownTime = new Date().getTime();
        this.lbMatchId.string = dealCardData.matchId + "";
        this.isFinish = false;
        this.setIsActiveButton(false, false);
        this.myCardDTOs = dealCardData.cardList;
        this.currentHandRanking = dealCardData.handRanking;
        this.scheduleOnce(() => {
          this.startBettingCountDown(dealCardData.countdown);
        }, 3);
        const playerSeatExists = this.getNumPlayers();
        const cardDeal = 4;
        for (let index = 0; index < MauBinh_Constant_1.default.MAX_PLAYER * cardDeal; index++) {
          this.cardsDeal.children[index].active = playerSeatExists.length * cardDeal < index;
          this.cardsDeal.children[index].position = cc.v3(0, 0);
        }
        for (let a = 0; a < cardDeal; a++) for (let b = 0; b < playerSeatExists.length; b++) {
          const seatId = playerSeatExists[b];
          if (-1 === seatId) continue;
          this.getPlayerHouse(seatId).setIsViewer(false);
          let card4Me = this.cardsDeal.children[a * playerSeatExists.length + b];
          let rawPlayerPos = this.groupPlayers.children[seatId].position;
          card4Me.runAction(cc.sequence(cc.delayTime(.1 * (a * playerSeatExists.length + b)), cc.moveTo(.2, cc.v2(rawPlayerPos.x, rawPlayerPos.y))));
        }
        const timeUnderLayer = .1 * (cardDeal * playerSeatExists.length - 3);
        this.scheduleOnce(() => {
          for (let index = 0; index < MauBinh_Constant_1.default.MAX_PLAYER * cardDeal; index++) this.cardsDeal.children[index].active = false;
          for (let index = 0; index < playerSeatExists.length; index++) {
            let seatId = playerSeatExists[index];
            if (-1 === seatId) continue;
            if (0 === seatId) {
              this.handleDragDrop.node.active = true;
              this.handleDragDrop.onTouch();
              this.handleDragDrop.setListCard(this.myCardDTOs);
              this.setIsActiveButton(true, false);
              this.getPlayerHouse(0).resetResultGame();
              dealCardData.handRanking !== MauBinh_Constant_1.CardTypes.ENUM.TYPE_BINH_THUONG && this.getPlayerHouse(0).playFxResultGeneral(0, !(dealCardData.handRanking === MauBinh_Constant_1.CardTypes.ENUM.TYPE_BINH_LUNG), MauBinh_Constant_1.CardTypes.getBinhName(dealCardData.mauBinh), false);
              playerSeatExists.filter(seat => 0 !== seat).forEach(seat => this.getPlayerHouse(seat).playFxDangXep());
              if (dealCardData.handRanking < MauBinh_Constant_1.CardTypes.ENUM.TYPE_BINH_THUONG) return;
              let detectPlayerCards = new MauBinh_DetectPlayerCards_1.default();
              detectPlayerCards.initCard(this.myCardDTOs);
              let result = detectPlayerCards.getPlayerCardsInfo(true);
              const arrChiCuoi = [ this.myCardDTOs[0], this.myCardDTOs[1], this.myCardDTOs[2] ];
              const arrChiGiua = [ this.myCardDTOs[3], this.myCardDTOs[4], this.myCardDTOs[5], this.myCardDTOs[6], this.myCardDTOs[7] ];
              const arrChiDau = [ this.myCardDTOs[8], this.myCardDTOs[9], this.myCardDTOs[10], this.myCardDTOs[11], this.myCardDTOs[12] ];
              this.highLightCards(3, result.chiCuoi, arrChiCuoi);
              this.highLightCards(2, result.chiGiua, arrChiGiua);
              this.highLightCards(1, result.chiDau, arrChiDau);
            } else {
              this.getPlayerHouse(seatId).showCardReal(true);
              this.getPlayerHouse(seatId).showCardReady(false);
            }
          }
        }, timeUnderLayer);
      }
      receivedSoChi(soChiData) {
        let playerChair = soChiData.chair;
        let playerSeatId = this.findPlayerSeatByPos(playerChair);
        if (-1 === playerSeatId) return;
        if (0 === playerSeatId) {
          this.setIsActiveButton(false, this.betDuration > 5);
          this.handleDragDrop.offTouch();
          this.handleDragDrop.sortPosition(false);
        } else this.getPlayerHouse(playerSeatId).playFxXepXong();
      }
      receivedXepLai(xepLaiData) {
        let playerChair = xepLaiData.chair;
        let playerSeatId = this.findPlayerSeatByPos(playerChair);
        if (-1 === playerSeatId) return;
        if (0 == playerSeatId) {
          this.setIsActiveButton(true, false);
          this.handleDragDrop.onTouch();
          this.handleDragDrop.sortPosition();
        } else this.getPlayerHouse(playerSeatId).playFxDangXep();
      }
      receivedEndGame(endGameData) {
        this.isFinish = true;
        this.actionHoldRoom();
        this.unschedule(this.intervalBetting);
        this.labelTimer.node.parent.active = false;
        this.setIsActiveButton(false, false);
        this.handleDragDrop.offTouch();
        this.handleDragDrop.node.active = false;
        const myResult = endGameData.playerResultList.find(result => 0 === this.findPlayerSeatByPos(result.chairIndex));
        if (myResult) {
          let totalCards = [ myResult.chi3[0], myResult.chi3[1], myResult.chi3[2], myResult.chi2[0], myResult.chi2[1], myResult.chi2[2], myResult.chi2[3], myResult.chi2[4], myResult.chi1[0], myResult.chi1[1], myResult.chi1[2], myResult.chi1[3], myResult.chi1[4] ];
          totalCards.forEach((card, i) => this.myPlayingCardBoard.children[i].children[1].getComponent(cc.Sprite).spriteFrame = this.getCardFrame(card.id));
          Configs_1.default.Login.Coin = myResult.currentMoney;
          BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN);
        }
        for (let index = 0; index < MauBinh_Constant_1.default.MAX_PLAYER; index++) {
          const player = this.getPlayerHouse(index);
          player.resetResultGame();
          player.prepareFxAction();
          if (0 === index) {
            player.setPositionCardReal(cc.v2(176, 82));
            player.scaleCardReal(.5);
          }
        }
        this.soChi(1, endGameData.playerResultList);
      }
      receivedUpdateMatch(updateMatchData) {
        this.isFinish = false;
        const infos = updateMatchData.infos;
        for (let index = 0; index < updateMatchData.hasInfo.length; index++) {
          const pos = this.configPlayer[index].playerPos;
          if (updateMatchData.hasInfo[pos]) {
            let player = this.getPlayerHouse(index);
            player.setGold(infos[pos].money);
            this.configPlayer[index].nickName = infos[pos].nickName;
            if (infos[pos].playerStatus == MauBinh_Constant_1.PlayerState.ENUM.PLAYER_STATUS_SITTING || infos[pos].playerStatus == MauBinh_Constant_1.PlayerState.ENUM.PLAYER_STATUS_PLAYING) {
              this.configPlayer[index].isViewer = false;
              player.setIsViewer(false);
            } else {
              this.configPlayer[index].isViewer = true;
              player.setIsViewer(true);
              player.playFxViewer();
            }
            this.setupSeatPlayer(index, infos[pos]);
          } else {
            this.configPlayer[index].nickName = "";
            this.configPlayer[index].isViewer = true;
          }
        }
      }
      receivedGameInfo(gameInfoData) {
        var _a;
        this.isFinish = false;
        null === (_a = MauBinh_PopupGuide_1.default.instance) || void 0 === _a ? void 0 : _a.dismiss();
        this.labelRoomId.string = gameInfoData.roomId.toString();
        this.labelRoomBet.string = Utils_1.default.formatNumber(gameInfoData.moneyBet);
        this.lbMatchId.string = gameInfoData.matchId + "";
        this.myCardDTOs = gameInfoData.players[gameInfoData.myChair].cardList;
        this.configPlayer[0].nickName = Configs_1.default.Login.Nickname;
        this.configPlayer[0].playerPos = gameInfoData.myChair;
        for (let a = 0; a < this.configPlayer.length; a++) this.configPlayer[a].playerPos = PLAYER_POSITIONS[gameInfoData.myChair][a];
        for (let index = 0; index < this.configPlayer.length; index++) {
          const seatId = this.configPlayer[index].seatId;
          this.getPlayerHouse(seatId).resetPlayerInfo(seatId);
          const findPos = this.configPlayer[index].playerPos;
          if (gameInfoData.hasInfo[findPos]) {
            this.setupSeatPlayer(seatId, gameInfoData.players[findPos]);
            if (gameInfoData.players[findPos].playerStatus === MauBinh_Constant_1.PlayerState.ENUM.PLAYER_STATUS_VIEWER) {
              this.configPlayer[seatId].isViewer = true;
              this.getPlayerHouse(seatId).setIsViewer(true);
              this.getPlayerHouse(seatId).playFxViewer();
            } else {
              this.configPlayer[seatId].isViewer = false;
              this.getPlayerHouse(seatId).setIsViewer(false);
              if (0 != seatId) {
                this.getPlayerHouse(seatId).showCardReady(false);
                this.getPlayerHouse(seatId).showCardReal(true);
                gameInfoData.players[findPos].sochi ? this.getPlayerHouse(seatId).playFxXepXong() : this.getPlayerHouse(seatId).playFxDangXep();
              } else this.setIsActiveButton(!gameInfoData.players[findPos].sochi, gameInfoData.players[findPos].sochi);
            }
          } else {
            this.getPlayerHouse(seatId).showBtnInvite(true);
            this.configPlayer[index].isViewer = true;
          }
        }
        if (this.myCardDTOs.length > 0) {
          this.getPlayerHouse(0).resetCardReady(0);
          this.getPlayerHouse(0).showCardReal(false);
          this.getPlayerHouse(0).prepareToTransform();
          this.handleDragDrop.setListCard(this.myCardDTOs);
          this.handleDragDrop.node.active = true;
          this.handleDragDrop.onTouch();
          this.scheduleOnce(() => {
            this.setIsActiveButton(true, false);
            this.checkUpdateCard();
          }, 1);
        }
        gameInfoData.gameState === MauBinh_Constant_1.GameState.ENUM.STATE_PLAYING && this.startBettingCountDown(gameInfoData.countdownTime);
      }
      receivedNotifyRegOutRoom(notifyRegOutRoomData) {
        const seatId = this.findPlayerSeatByPos(notifyRegOutRoomData.outChair);
        if (-1 === seatId) return;
        this.getPlayerHouse(seatId).showNotify(notifyRegOutRoomData.isOutRoom);
      }
      receivedUserLeaveRoom(userLeaveRoomData) {
        const seatId = this.findPlayerSeatByPos(userLeaveRoomData.chair);
        if (-1 === seatId) return;
        for (let index = 0; index < this.configPlayer.length; index++) {
          if (this.configPlayer[index].seatId !== seatId) continue;
          this.configPlayer[index].nickName = "";
          this.configPlayer[index].isViewer = true;
        }
        this.getPlayerHouse(seatId).resetPlayerInfo(seatId);
        this.getPlayerHouse(seatId).showBtnInvite(true);
        1 == this.getNumPlayers().length && this.resetPlayersPlaying();
        if (0 === seatId) {
          cc.director.loadScene("MauBinh");
          userLeaveRoomData.reqQuitRoomReason && "CLIENT-REQUEST" !== userLeaveRoomData.reqQuitRoomReason && App_1.default.instance.alertDialog.showMsg(userLeaveRoomData.reqQuitRoomReason);
        }
      }
      receivedUserJoinRoom(userJoinRoomData) {
        for (let index = 0; index < this.configPlayer.length; index++) {
          if (this.configPlayer[index].playerPos !== userJoinRoomData.myChair) continue;
          const seatId = this.configPlayer[index].seatId;
          this.getPlayerHouse(seatId).resetPlayerInfo(seatId);
          this.setupSeatPlayer(seatId, userJoinRoomData.info);
          if (userJoinRoomData.uStatus == MauBinh_Constant_1.PlayerState.ENUM.PLAYER_STATUS_VIEWER) {
            this.configPlayer[seatId].isViewer = true;
            this.getPlayerHouse(seatId).setIsViewer(true);
            this.getPlayerHouse(seatId).playFxViewer();
          } else {
            this.configPlayer[seatId].isViewer = false;
            this.getPlayerHouse(seatId).setIsViewer(false);
          }
        }
      }
      receivedChatRoom(chatRoomData) {
        const seatId = this.findPlayerSeatByPos(chatRoomData.chair);
        if (-1 === seatId) return;
        chatRoomData.isIcon ? this.getPlayerHouse(seatId).showChatEmotion(chatRoomData.content) : this.getPlayerHouse(seatId).showChatMsg(chatRoomData.content);
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
        this.notifyTimeStart.getComponent(cc.Label).string = " B\u1eaft \u0111\u1ea7u sau : " + Math.floor(this.timeAutoStart % 60) + "s ";
      }
      startBettingCountDown(turnTime) {
        if (turnTime <= 0) return;
        this.betDuration = turnTime;
        this.labelTimer.node.parent.active = true;
        this.labelTimer.string = this.betDuration;
        this.unschedule(this.intervalBetting);
        this.schedule(this.intervalBetting = () => {
          this.betDuration--;
          if (this.betDuration < 1) {
            this.labelTimer.node.parent.active = false;
            this.unschedule(this.intervalBetting);
          }
          if (5 === this.betDuration) {
            this.setIsActiveButton(false, false);
            this.btnSoChi.active && this.actionAutoBinhSoChi();
          }
          this.labelTimer.string = this.betDuration;
        }, 1);
      }
      setIsActiveButton(state, isCombining) {
        this.btnSoChi.active = state;
        this.btnSwap.active = state;
        this.btnAuto.active = state;
        this.btnCombining.active = isCombining;
      }
      actionLeaveRoom() {
        MauBinhNetworkClient_1.default.getInstance().send(new MauBinh_Cmd_1.default.SendRequestLeaveGame());
      }
      actionHoldRoom() {
        MauBinhNetworkClient_1.default.getInstance().send(new MauBinh_Cmd_1.default.SendHoldRoom());
      }
      actionBaoBinh() {
        this.setIsActiveButton(false, false);
        this.btnCombining.active = true;
        MauBinhNetworkClient_1.default.getInstance().send(new MauBinh_Cmd_1.default.SendBaoBinh());
      }
      actionBinhSoChi() {
        this.groupPlayers.children[0].getComponent("MauBinh.Player").scaleCardReal(.8);
        this.myCardDTOs = this.handleDragDrop.getListCard();
        const arrChiCuoi = [ this.myCardDTOs[0], this.myCardDTOs[1], this.myCardDTOs[2] ].map(cardDTO => cardDTO.id);
        const arrChiGiua = [ this.myCardDTOs[3], this.myCardDTOs[4], this.myCardDTOs[5], this.myCardDTOs[6], this.myCardDTOs[7] ].map(cardDTO => cardDTO.id);
        const arrChiDau = [ this.myCardDTOs[8], this.myCardDTOs[9], this.myCardDTOs[10], this.myCardDTOs[11], this.myCardDTOs[12] ].map(cardDTO => cardDTO.id);
        MauBinhNetworkClient_1.default.getInstance().send(new MauBinh_Cmd_1.default.SendBinhSoChi(arrChiDau, arrChiGiua, arrChiCuoi));
      }
      actionBinhSwap() {
        this.handleDragDrop.actionSwapChi();
        this.checkUpdateCard();
      }
      swapObjec(index1, index2) {
        const vl1 = this.myCardDTOs[index1];
        this.myCardDTOs[index1] = this.myCardDTOs[index2];
        this.myCardDTOs[index2] = vl1;
      }
      actionAutoSort() {
        this.handleDragDrop.actionAutoSort();
        this.checkUpdateCard();
      }
      actionAutoBinhSoChi() {
        let arrChiCuoi = [ this.myCardDTOs[0], this.myCardDTOs[1], this.myCardDTOs[2] ].map(cardDTO => cardDTO.id);
        let arrChiGiua = [ this.myCardDTOs[3], this.myCardDTOs[4], this.myCardDTOs[5], this.myCardDTOs[6], this.myCardDTOs[7] ].map(cardDTO => cardDTO.id);
        let arrChiDau = [ this.myCardDTOs[8], this.myCardDTOs[9], this.myCardDTOs[10], this.myCardDTOs[11], this.myCardDTOs[12] ].map(cardDTO => cardDTO.id);
        MauBinhNetworkClient_1.default.getInstance().send(new MauBinh_Cmd_1.default.SendAutoBinhSoChi(arrChiDau, arrChiGiua, arrChiCuoi));
      }
      actionXepLai() {
        this.setIsActiveButton(true, false);
        MauBinhNetworkClient_1.default.getInstance().send(new MauBinh_Cmd_1.default.SendXepLai());
      }
      checkUpdateCard() {
        if (this.currentHandRanking < MauBinh_Constant_1.CardTypes.ENUM.TYPE_BINH_THUONG) {
          this.getPlayerHouse(0).playFxResultGeneral(0, true, MauBinh_Constant_1.CardTypes.getBinhName(this.currentHandRanking), this.isFinish);
          return;
        }
        this.myCardDTOs = this.handleDragDrop.getListCard();
        let detectPlayerCards = new MauBinh_DetectPlayerCards_1.default();
        detectPlayerCards.initCard(this.myCardDTOs);
        let result = detectPlayerCards.getPlayerCardsInfo(true);
        let typeName = MauBinh_Constant_1.CardTypes.getBinhName(result.cardType);
        this.getPlayerHouse(0).resetResultGame();
        result.cardType !== MauBinh_Constant_1.CardTypes.ENUM.TYPE_BINH_THUONG && this.getPlayerHouse(0).playFxResultGeneral(0, !(result.cardType === MauBinh_Constant_1.CardTypes.ENUM.TYPE_BINH_LUNG), typeName, this.isFinish);
        let arrChiCuoi = [ this.myCardDTOs[0], this.myCardDTOs[1], this.myCardDTOs[2] ];
        let arrChiGiua = [ this.myCardDTOs[3], this.myCardDTOs[4], this.myCardDTOs[5], this.myCardDTOs[6], this.myCardDTOs[7] ];
        let arrChiDau = [ this.myCardDTOs[8], this.myCardDTOs[9], this.myCardDTOs[10], this.myCardDTOs[11], this.myCardDTOs[12] ];
        this.highLightCards(3, result.chiCuoi, arrChiCuoi);
        this.highLightCards(2, result.chiGiua, arrChiGiua);
        this.highLightCards(1, result.chiDau, arrChiDau);
      }
      highLightCards(chiId, groupKind, cardList) {
        let start = -1;
        let end = -1;
        if (3 == chiId) {
          start = 0;
          end = 3;
        } else if (2 == chiId) {
          start = 3;
          end = 8;
        } else {
          start = 8;
          end = 13;
        }
        for (var a = start; a < end; a++) this.handleDragDrop.shadowCard(a, true);
        switch (groupKind) {
         case MauBinh_Constant_1.GroupKinds.ENUM.GROUP_THUNG_PHA_SANH:
         case MauBinh_Constant_1.GroupKinds.ENUM.GROUP_CU_LU:
         case MauBinh_Constant_1.GroupKinds.ENUM.GROUP_THUNG:
         case MauBinh_Constant_1.GroupKinds.ENUM.GROUP_SANH:
          for (var a = start; a < end; a++) this.handleDragDrop.shadowCard(a, false);
          break;

         case MauBinh_Constant_1.GroupKinds.ENUM.GROUP_TU_QUY:
         case MauBinh_Constant_1.GroupKinds.ENUM.GROUP_SAM_CO:
         case MauBinh_Constant_1.GroupKinds.ENUM.GROUP_MOT_DOI:
         case MauBinh_Constant_1.GroupKinds.ENUM.GROUP_MAU_THAU:
         case MauBinh_Constant_1.GroupKinds.ENUM.GROUP_THU:
          for (let a = 0; a < cardList.length - 1; a++) for (let b = a + 1; b < cardList.length; b++) if (cardList[a].isSameNumber(cardList[b])) {
            this.handleDragDrop.shadowCard(a + start, false);
            this.handleDragDrop.shadowCard(b + start, false);
          }
        }
      }
      initConfigPlayer() {
        this.configPlayer = [];
        for (let index = 0; index < MauBinh_Constant_1.default.MAX_PLAYER; index++) this.configPlayer.push({
          seatId: index,
          nickName: "",
          playerPos: -1,
          isViewer: true
        });
      }
      resetPlayersPlaying() {
        for (let index = 0; index < MauBinh_Constant_1.default.MAX_PLAYER; index++) this.getPlayerHouse(index).resetMatchHistory(index);
      }
      setupSeatPlayer(seatId, playerInfo) {
        this.configPlayer[seatId].nickName = playerInfo.nickName;
        this.getPlayerHouse(seatId).setAvatar(playerInfo.avatar);
        this.getPlayerHouse(seatId).setName(playerInfo.nickName);
        this.getPlayerHouse(seatId).setGold(playerInfo.money);
      }
      findPlayerPosBySeat(seat) {
        return this.configPlayer[seat].playerPos;
      }
      findPlayerSeatByPos(pos) {
        if (-1 == pos) return -1;
        const playerData = this.configPlayer.find(playerData => playerData.playerPos === pos);
        if (playerData) return playerData.seatId;
        return -1;
      }
      getPlayerHouse(seatId) {
        return this.groupPlayers.children[seatId].getComponent(MauBinh_Player_1.default);
      }
      getNumPlayers() {
        let playerPosEntry = [];
        this.configPlayer.filter(player => player.nickName && !player.isViewer).forEach(player => playerPosEntry.push(player.seatId));
        return playerPosEntry;
      }
      needSoChi(playerResultList) {
        if (playerResultList.filter(result => 0 !== this.findPlayerSeatByPos(result.chairIndex) && result.maubinhType !== MauBinh_Constant_1.CardTypes.ENUM.TYPE_BINH_THUONG).length == playerResultList.length - 1) return false;
        const myResult = playerResultList.find(result => 0 === this.findPlayerSeatByPos(result.chairIndex));
        if (myResult) return myResult.maubinhType === MauBinh_Constant_1.CardTypes.ENUM.TYPE_BINH_THUONG;
        return true;
      }
      needShowMoneyWhenSoChi(playerResultList) {
        return !playerResultList.find(result => 0 === result.chairIndex && result.maubinhType !== MauBinh_Constant_1.CardTypes.ENUM.TYPE_BINH_THUONG);
      }
      needBatSap(playerResultList) {
        return !!playerResultList.find(result => 0 !== result.moneySap);
      }
      soChi(chiId, playerResultList) {
        for (let index = 0; index < MauBinh_Constant_1.default.MAX_PLAYER; index++) {
          let pl = this.getPlayerHouse(index);
          pl.resetResultChi(1);
          pl.resetResultChi(2);
          pl.resetResultChi(3);
        }
        let isNeedSoChi = this.needSoChi(playerResultList);
        let isNeedShowMoneyWhenSoChi = this.needShowMoneyWhenSoChi(playerResultList);
        for (let index = 0; index < playerResultList.length; index++) {
          let result = playerResultList[index];
          let seatId = this.findPlayerSeatByPos(result.chairIndex);
          if (-1 === seatId) continue;
          let totalCards = [ result.chi3[0], result.chi3[1], result.chi3[2], result.chi2[0], result.chi2[1], result.chi2[2], result.chi2[3], result.chi2[4], result.chi1[0], result.chi1[1], result.chi1[2], result.chi1[3], result.chi1[4] ];
          let x = new MauBinh_DetectPlayerCards_1.default();
          x.initCard(totalCards);
          let playerCardInfo = x.getPlayerCardsInfo(true);
          let pl = this.getPlayerHouse(seatId);
          pl.isActionCardReal(false);
          if (result.maubinhType == MauBinh_Constant_1.CardTypes.ENUM.TYPE_BINH_THUONG && isNeedSoChi) {
            let spriteId = -1;
            let goldChi = result.moneyInChi[chiId - 1];
            spriteId = 1 == chiId ? playerCardInfo.chiDau : 2 == chiId ? playerCardInfo.chiGiua : playerCardInfo.chiCuoi;
            pl.playFxCompareChi(chiId, this.cardGroupNames[spriteId]);
            pl.showHistoryChi(goldChi, chiId);
            pl.playFxGoldSoChi(goldChi);
            if (3 == chiId) {
              for (var a = 0; a < 3; a++) {
                pl.prepareCardReal(a);
                pl.transformToCardReal(a, this.getCardFrame(result.chi3[a].id), seatId);
              }
              this.scheduleOnce(() => {
                let totalGoldChi = result.moneyInChi[0] + result.moneyInChi[1] + result.moneyInChi[2];
                totalGoldChi >= 0 ? pl.playFxWinSoChi(totalGoldChi) : pl.playFxLoseSoChi(totalGoldChi);
              }, 1);
            } else if (2 == chiId) for (var a = 0; a < 5; a++) {
              pl.prepareCardReal(a + 3);
              pl.transformToCardReal(a + 3, this.getCardFrame(result.chi2[a].id), seatId);
            } else for (var a = 0; a < 5; a++) {
              pl.prepareCardReal(a + 8);
              pl.transformToCardReal(a + 8, this.getCardFrame(result.chi1[a].id), seatId);
            }
          } else if (1 == chiId) {
            if (result.maubinhType == MauBinh_Constant_1.CardTypes.ENUM.TYPE_BINH_THUONG) {
              playerCardInfo.chiDau < 2 && pl.playFxCompareChi(chiId, this.cardGroupNames[playerCardInfo.chiDau]);
              playerCardInfo.chiGiua < 2 && pl.playFxCompareChi(chiId, this.cardGroupNames[playerCardInfo.chiGiua]);
              playerCardInfo.chiGiua == MauBinh_Constant_1.GroupKinds.ENUM.GROUP_SAM_CO && pl.playFxCompareChi(chiId, this.cardGroupNames[playerCardInfo.chiCuoi]);
            } else {
              pl.resetResultGame();
              pl.playFxResultGeneral(seatId, !(result.maubinhType == MauBinh_Constant_1.CardTypes.ENUM.TYPE_BINH_LUNG), MauBinh_Constant_1.CardTypes.getBinhName(result.maubinhType), true);
            }
            let totalCards = [ result.chi3[0], result.chi3[1], result.chi3[2], result.chi2[0], result.chi2[1], result.chi2[2], result.chi2[3], result.chi2[4], result.chi1[0], result.chi1[1], result.chi1[2], result.chi1[3], result.chi1[4] ];
            0 == seatId && this.handleDragDrop.setListCard(totalCards);
            for (let a = 0; a < 13; a++) {
              pl.prepareToTransform();
              pl.transformToCardReal(a, this.getCardFrame(totalCards[a].id), seatId);
            }
          }
        }
        this.handleDragDrop.resetAllCard();
        if (isNeedSoChi) {
          this.node.stopAllActions();
          this.node.runAction(cc.sequence(cc.delayTime(3), cc.callFunc(() => {
            if (chiId < 3) this.soChi(chiId + 1, playerResultList); else {
              this.showGoldResult(playerResultList, .2);
              this.batSap(playerResultList);
            }
          })));
        } else {
          this.showGoldResult(playerResultList, .2);
          this.batSap(playerResultList);
        }
      }
      showGoldResult(playerResultList, delayTime) {
        this.scheduleOnce(() => {
          for (let index = 0; index < playerResultList.length; index++) {
            let result = playerResultList[index];
            let chair = result.chairIndex;
            let seatId = this.findPlayerSeatByPos(chair);
            if (-1 === seatId) continue;
            this.getPlayerHouse(seatId).resetResultGame();
            if (result.moneyCommon >= 0) {
              this.getPlayerHouse(seatId).fxWin(result.moneyCommon, result.currentMoney);
              0 === seatId && result.moneyCommon > 0 && Common_AudioManager_1.default.getInstance().playEffectByGame(Configs_1.default.App.BUNDLE_NAME.MAUBINH, this.winSound);
            } else this.getPlayerHouse(seatId).fxLose(result.moneyCommon, result.currentMoney);
          }
        }, delayTime);
      }
      batSap(playerResultList) {
        if (!this.needBatSap(playerResultList)) return;
        let countWin = 0;
        let countLose = 0;
        for (let index = 0; index < playerResultList.length; index++) {
          let seatId = this.findPlayerSeatByPos(playerResultList[index].chairIndex);
          if (seatId <= 0) continue;
          playerResultList[index].moneySap > 0 ? countWin += 1 : playerResultList[index].moneySap < 0 && (countLose += 1);
        }
        this.fxSoChiTotal.active = false;
        for (let index = 0; index < playerResultList.length; index++) {
          let seatId = this.findPlayerSeatByPos(playerResultList[index].chairIndex);
          if (0 == seatId) {
            if (countWin > 0) {
              this.fxSoChiTotal.active = true;
              this.fxSoChiTotal.getComponentInChildren(cc.Label).string = countWin == playerResultList.length - 1 ? "Thua S\u1eadp L\xe0ng" : "S\u1eadp C\u1ea3 3 Chi";
              this.fxSoChiTotal.runAction(cc.sequence(cc.scaleTo(.25, 1.1, 1.1), cc.scaleTo(.25, 1, 1), cc.scaleTo(.25, 1.1, 1.1), cc.scaleTo(.25, 1, 1)));
              this.scheduleOnce(() => {
                this.fxSoChiTotal.stopAllActions();
                this.fxSoChiTotal.active = false;
              }, 3);
            }
            if (countLose > 0) {
              this.fxSoChiTotal.active = true;
              this.fxSoChiTotal.getComponentInChildren(cc.Label).string = countLose == playerResultList.length - 1 ? "B\u1eaft S\u1eadp L\xe0ng" : "Th\u1eafng 3 Chi";
              this.fxSoChiTotal.stopAllActions();
              this.fxSoChiTotal.runAction(cc.sequence(cc.scaleTo(.25, 1.1, 1.1), cc.scaleTo(.25, 1, 1), cc.scaleTo(.25, 1.1, 1.1), cc.scaleTo(.25, 1, 1)));
              this.scheduleOnce(() => {
                this.fxSoChiTotal.stopAllActions();
                this.fxSoChiTotal.active = false;
              }, 3);
            }
          } else playerResultList[index].moneySap < 0 && this.getPlayerHouse(seatId).playFxSoChiTotal();
        }
      }
      onKickFromRoom(reasonCode) {
        cc.director.loadScene("MauBinh", () => {
          switch (reasonCode) {
           case MauBinh_Constant_1.KickReasonCodes.ENUM.ERROR_MONEY:
            App_1.default.instance.actiontDialog.showMsgWithAction("S\u1ed1 d\u01b0 kh\xf4ng \u0111\u1ee7.", "N\u1ea0P NGAY", () => {
              App_1.default.instance.openShop(0);
            });
            break;

           case MauBinh_Constant_1.KickReasonCodes.ENUM.ERROR_BAO_TRI:
            App_1.default.instance.alertDialog.showMsg("H\u1ec7 th\u1ed1ng b\u1ea3o tr\xec!");
            break;

           default:
            App_1.default.instance.alertDialog.showMsg("B\u1ea1n b\u1ecb kick kh\u1ecfi b\xe0n ch\u01a1i!");
          }
        });
      }
      getCardDefinations() {
        MauBinhNetworkClient_1.default.getInstance().send(new MauBinh_Cmd_1.default.SendCardsDefine());
      }
      receivedCardDefinations(cardsDefineData) {
        const cardObjects = JSON.parse(cardsDefineData.strData).object || [];
        cardObjects.forEach(cardObject => this.cardDefinations.push(new CardGame_Cmd_1.default.CardDefination(cardObject)));
        this.btnShowCardDefinations.node.active = (true, this.cardDefinations.length > 0);
      }
      actShowCardDefinations() {
        PopupCardDefinations_1.default.createAndShow(this.node, this.cardDefinations, this.cardFrames);
      }
      actShowChat() {
        PopupChatInGame_1.default.createAndShow(this.node, this.cardDefinations, (chatType, content) => {
          MauBinhNetworkClient_1.default.getInstance().send(new MauBinh_Cmd_1.default.SendChatRoom(chatType, content));
        }, (cheatType, cardCheatIds) => {
          MauBinhNetworkClient_1.default.getInstance().send(new MauBinh_Cmd_1.default.SendCheatCards(cheatType, cardCheatIds));
        });
      }
      actSetting() {
        PopupSettingInGame_1.default.createAndShow(this.node, Configs_1.default.App.BUNDLE_NAME.MAUBINH, () => {
          MauBinh_PopupGuide_1.default.createAndShow(this.node);
        }, () => {
          MauBinhNetworkClient_1.default.getInstance().send(new MauBinh_Cmd_1.default.SendRequestLeaveGame());
        });
      }
      getCardFrame(index) {
        const txtIndex = (index < 10 ? "0" : "") + index;
        const cardFrame = this.cardFrames.find(card => card.name == "labai_" + txtIndex);
        return cardFrame;
      }
      getCardBackFrame() {
        return this.cardBackFrame;
      }
    };
    MauBinhInGame.instance = null;
    __decorate([ property(cc.Node) ], MauBinhInGame.prototype, "myPlayingCardBoard", void 0);
    __decorate([ property(cc.Node) ], MauBinhInGame.prototype, "groupPlayers", void 0);
    __decorate([ property(cc.Node) ], MauBinhInGame.prototype, "cardsDeal", void 0);
    __decorate([ property(cc.Label) ], MauBinhInGame.prototype, "labelRoomId", void 0);
    __decorate([ property(cc.Label) ], MauBinhInGame.prototype, "labelRoomBet", void 0);
    __decorate([ property(cc.Label) ], MauBinhInGame.prototype, "lbMatchId", void 0);
    __decorate([ property(cc.Label) ], MauBinhInGame.prototype, "labelTimer", void 0);
    __decorate([ property(cc.Node) ], MauBinhInGame.prototype, "suggestTarget", void 0);
    __decorate([ property(cc.Node) ], MauBinhInGame.prototype, "btnSoChi", void 0);
    __decorate([ property(cc.Node) ], MauBinhInGame.prototype, "btnSwap", void 0);
    __decorate([ property(cc.Node) ], MauBinhInGame.prototype, "btnAuto", void 0);
    __decorate([ property(cc.Node) ], MauBinhInGame.prototype, "btnCombining", void 0);
    __decorate([ property(cc.Node) ], MauBinhInGame.prototype, "notifyTimeStart", void 0);
    __decorate([ property(cc.Node) ], MauBinhInGame.prototype, "fxSoChiTotal", void 0);
    __decorate([ property(MauBinh_HandleDragAndDrop_1.default) ], MauBinhInGame.prototype, "handleDragDrop", void 0);
    __decorate([ property(cc.Button) ], MauBinhInGame.prototype, "btnShowCardDefinations", void 0);
    __decorate([ property(cc.AudioClip) ], MauBinhInGame.prototype, "backgroundMusic", void 0);
    __decorate([ property(cc.AudioClip) ], MauBinhInGame.prototype, "winSound", void 0);
    __decorate([ property([ cc.SpriteFrame ]) ], MauBinhInGame.prototype, "cardFrames", void 0);
    __decorate([ property(cc.SpriteFrame) ], MauBinhInGame.prototype, "cardBackFrame", void 0);
    MauBinhInGame = MauBinhInGame_1 = __decorate([ ccclass ], MauBinhInGame);
    exports.default = MauBinhInGame;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/App": void 0,
    "../../Main/Game/src/common/BroadcastReceiver": void 0,
    "../../Main/Game/src/common/Common.AudioManager": void 0,
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/common/Utils": void 0,
    "../../Main/Game/src/games/cardgames/PopupCardDefinations": void 0,
    "../../Main/Game/src/games/cardgames/PopupChatInGame": void 0,
    "../../Main/Game/src/games/cardgames/PopupSettingInGame": void 0,
    "../../Main/Game/src/networks/CardGame.Cmd": void 0,
    "../../Main/Game/src/networks/MauBinhNetworkClient": void 0,
    "./MauBinh.Cmd": "MauBinh.Cmd",
    "./MauBinh.Constant": "MauBinh.Constant",
    "./MauBinh.DetectPlayerCards": "MauBinh.DetectPlayerCards",
    "./MauBinh.HandleDragAndDrop": "MauBinh.HandleDragAndDrop",
    "./MauBinh.Listener": "MauBinh.Listener",
    "./MauBinh.Player": "MauBinh.Player",
    "./MauBinh.PopupGuide": "MauBinh.PopupGuide"
  } ],
  "MauBinh.Listener": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "93b27c0G0hCxLdCqz8zA1Cp", "MauBinh.Listener");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var MauBinhListener_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const App_1 = require("../../Main/Game/src/common/App");
    const BroadcastReceiver_1 = require("../../Main/Game/src/common/BroadcastReceiver");
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    const MauBinhNetworkClient_1 = require("../../Main/Game/src/networks/MauBinhNetworkClient");
    const Network_InPacket_1 = require("../../Main/Game/src/networks/Network.InPacket");
    const MauBinh_Cmd_1 = require("./MauBinh.Cmd");
    const MauBinh_InGame_1 = require("./MauBinh.InGame");
    const MauBinh_Room_1 = require("./MauBinh.Room");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let MauBinhListener = MauBinhListener_1 = class MauBinhListener extends cc.Component {
      constructor() {
        super(...arguments);
        this.currentRoomInfo = null;
        this.pendingCommands = new Map();
      }
      static getInstance() {
        return this.instance;
      }
      static destroyInstance() {
        this.instance = null;
      }
      onLoad() {
        MauBinhListener_1.instance = this;
        cc.game.addPersistRootNode(this.node);
      }
      start() {
        BroadcastReceiver_1.default.register(BroadcastReceiver_1.default.USER_UPDATE_COIN, () => {
          var _a;
          null === (_a = MauBinh_Room_1.default.getInstance()) || void 0 === _a ? void 0 : _a.updateCoinPlayer();
        }, this);
        BroadcastReceiver_1.default.register(BroadcastReceiver_1.default.USER_INFO_UPDATED, () => {
          var _a, _b;
          null === (_a = MauBinh_Room_1.default.getInstance()) || void 0 === _a ? void 0 : _a.updateInfoPlayer();
          null === (_b = MauBinh_Room_1.default.getInstance()) || void 0 === _b ? void 0 : _b.updateCoinPlayer();
        }, this);
        BroadcastReceiver_1.default.register(BroadcastReceiver_1.default.USER_DISCONNECTED, data => {
          MauBinhNetworkClient_1.default.getInstance().close();
        }, this);
        MauBinhNetworkClient_1.default.getInstance().addOnClose(() => {
          var _a;
          (null === (_a = MauBinh_Room_1.default.getInstance()) || void 0 === _a ? void 0 : _a.isClickBack) || !Configs_1.default.Login.IsLogin ? this.backToLobby() : App_1.default.instance.alertDialog.showMsgWithOnDismissed("B\u1ea1n \u0111\xe3 m\u1ea5t k\u1ebft n\u1ed1i v\u1edbi server", () => {
            this.backToLobby();
          });
        }, this);
        MauBinhNetworkClient_1.default.getInstance().addListener(data => {
          var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
          let inpacket = new Network_InPacket_1.default(data);
          let cmdId = inpacket.getCmdId();
          switch (cmdId) {
           case MauBinh_Cmd_1.default.Code.MONEY_BET_CONFIG:
            {
              let res = new MauBinh_Cmd_1.default.ReceivedMoneyBetConfig(data);
              cc.log(res);
              null === (_a = MauBinh_Room_1.default.getInstance()) || void 0 === _a ? void 0 : _a.receivedMoneyBetConfig(res);
              break;
            }

           case MauBinh_Cmd_1.default.Code.JOIN_ROOM_FAIL:
            {
              App_1.default.instance.showLoading(false);
              let res = new MauBinh_Cmd_1.default.ReceivedJoinRoomFail(data);
              cc.log(res);
              null === (_b = MauBinh_Room_1.default.getInstance()) || void 0 === _b ? void 0 : _b.receivedJoinRoomFail(res);
              break;
            }

           case MauBinh_Cmd_1.default.Code.JOIN_ROOM_SUCCESS:
            {
              let res = new MauBinh_Cmd_1.default.ReceivedJoinRoomSucceed(data);
              cc.log(res);
              null === (_c = MauBinh_Room_1.default.getInstance()) || void 0 === _c ? void 0 : _c.receivedJoinRoomSuccess(res);
              break;
            }

           case MauBinh_Cmd_1.default.Code.THONG_TIN_BAN_CHOI:
            {
              let res = new MauBinh_Cmd_1.default.ReceivedGameInfo(data);
              cc.log(res);
              null === (_d = MauBinh_Room_1.default.getInstance()) || void 0 === _d ? void 0 : _d.receivedGameInfo(res);
            }
            break;

           case MauBinh_Cmd_1.default.Code.TOP_SERVER:
            {
              let res = new MauBinh_Cmd_1.default.ReceivedTopServer(data);
              cc.log(res);
            }
            break;

           case MauBinh_Cmd_1.default.Code.PINGPONG:
            cc.log("PINGPONG");
            break;

           case MauBinh_Cmd_1.default.Code.JOIN_ROOM:
           case MauBinh_Cmd_1.default.Code.RECONNECT_ROOM:
            break;

           case MauBinh_Cmd_1.default.Code.GET_LIST_ROOM:
            {
              let res = new MauBinh_Cmd_1.default.ReceivedGetListRoom(data);
              cc.log(res);
            }
            break;

           case MauBinh_Cmd_1.default.Code.JOIN_GAME_ROOM_BY_ID:
            break;

           case MauBinh_Cmd_1.default.Code.BINH_SO_CHI:
            {
              let res = new MauBinh_Cmd_1.default.ReceivedBinhSoChi(data);
              cc.log(res);
              null === (_e = MauBinh_InGame_1.default.getInstance()) || void 0 === _e ? void 0 : _e.receivedSoChi(res);
            }
            break;

           case MauBinh_Cmd_1.default.Code.XEP_LAI:
            {
              let res = new MauBinh_Cmd_1.default.ReceivedXepLai(data);
              cc.log(res);
              null === (_f = MauBinh_InGame_1.default.getInstance()) || void 0 === _f ? void 0 : _f.receivedXepLai(res);
            }
            break;

           case MauBinh_Cmd_1.default.Code.KET_THUC:
            {
              let res = new MauBinh_Cmd_1.default.ReceivedEndGame(data);
              cc.log(res);
              null === (_g = MauBinh_InGame_1.default.getInstance()) || void 0 === _g ? void 0 : _g.receivedEndGame(res);
            }
            break;

           case MauBinh_Cmd_1.default.Code.CHIA_BAI:
            {
              let res = new MauBinh_Cmd_1.default.ReceivedChiaBai(data);
              cc.log(res);
              MauBinh_InGame_1.default.getInstance() ? MauBinh_InGame_1.default.getInstance().receivedDealCard(res) : this.pendingCommands.set(MauBinh_Cmd_1.default.Code.CHIA_BAI, res);
            }
            break;

           case MauBinh_Cmd_1.default.Code.AUTO_START:
            {
              let res = new MauBinh_Cmd_1.default.ReceivedAutoStart(data);
              cc.log(res);
              MauBinh_InGame_1.default.getInstance() ? MauBinh_InGame_1.default.getInstance().receivedAutoStart(res) : this.pendingCommands.set(MauBinh_Cmd_1.default.Code.AUTO_START, res);
            }
            break;

           case MauBinh_Cmd_1.default.Code.DANG_KY_THOAT_PHONG:
            {
              let res = new MauBinh_Cmd_1.default.ReceivedNotifyRegOutRoom(data);
              cc.log(res);
              null === (_h = MauBinh_InGame_1.default.getInstance()) || void 0 === _h ? void 0 : _h.receivedNotifyRegOutRoom(res);
            }
            break;

           case MauBinh_Cmd_1.default.Code.MOI_DAT_CUOC:
            {
              let res = new MauBinh_Cmd_1.default.ReceivedMoiDatCuoc(data);
              cc.log(res);
              null === (_j = MauBinh_InGame_1.default.getInstance()) || void 0 === _j ? void 0 : _j.receivedMoiDatCuoc(res);
            }
            break;

           case MauBinh_Cmd_1.default.Code.CHEAT_CARDS:
           case MauBinh_Cmd_1.default.Code.DANG_KY_CHOI_TIEP:
           case MauBinh_Cmd_1.default.Code.UPDATE_OWNER_ROOM:
            break;

           case MauBinh_Cmd_1.default.Code.LEAVE_GAME:
            {
              let res = new MauBinh_Cmd_1.default.ReceivedUserLeaveRoom(data);
              cc.log(res);
              null === (_k = MauBinh_InGame_1.default.getInstance()) || void 0 === _k ? void 0 : _k.receivedUserLeaveRoom(res);
            }
            break;

           case MauBinh_Cmd_1.default.Code.NOTIFY_KICK_FROM_ROOM:
            {
              let res = new MauBinh_Cmd_1.default.ReceivedKickOff(data);
              cc.log(res);
              null === (_l = MauBinh_InGame_1.default.getInstance()) || void 0 === _l ? void 0 : _l.onKickFromRoom(res.reason);
            }
            break;

           case MauBinh_Cmd_1.default.Code.USER_JOIN_ROOM:
            {
              let res = new MauBinh_Cmd_1.default.ReceivedUserJoinRoom(data);
              cc.log(res);
              MauBinh_InGame_1.default.getInstance() ? MauBinh_InGame_1.default.getInstance().receivedUserJoinRoom(res) : this.pendingCommands.set(MauBinh_Cmd_1.default.Code.USER_JOIN_ROOM, res);
            }
            break;

           case MauBinh_Cmd_1.default.Code.NOTIFY_USER_GET_JACKPOT:
            break;

           case MauBinh_Cmd_1.default.Code.UPDATE_MATCH:
            {
              let res = new MauBinh_Cmd_1.default.ReceivedUpdateMatch(data);
              cc.log(res);
              null === (_m = MauBinh_InGame_1.default.getInstance()) || void 0 === _m ? void 0 : _m.receivedUpdateMatch(res);
            }
            break;

           case MauBinh_Cmd_1.default.Code.CHAT_ROOM:
            {
              let res = new MauBinh_Cmd_1.default.ReceivedChatRoom(data);
              cc.log(res);
              null === (_o = MauBinh_InGame_1.default.getInstance()) || void 0 === _o ? void 0 : _o.receivedChatRoom(res);
            }
            break;

           case MauBinh_Cmd_1.default.Code.CARDS_DEFINE:
            {
              let res = new MauBinh_Cmd_1.default.ReceivedCardDefinations(data);
              cc.log(res);
              null === (_p = MauBinh_InGame_1.default.getInstance()) || void 0 === _p ? void 0 : _p.receivedCardDefinations(res);
            }
          }
        }, this);
        MauBinhNetworkClient_1.default.getInstance().send(new MauBinh_Cmd_1.default.SendReconnectRoom());
      }
      backToLobby() {
        App_1.default.instance.loadScene("Lobby", () => {
          cc.game.removePersistRootNode(this.node);
          MauBinhListener_1.destroyInstance();
          MauBinh_InGame_1.default.destroyInstance();
          MauBinh_Room_1.default.destroyInstance();
        });
      }
      setCurrentRoomInfo(room) {
        this.currentRoomInfo = room;
      }
      releasePendingCommands() {
        var _a, _b, _c;
        for (const [key, value] of this.pendingCommands.entries()) switch (key) {
         case MauBinh_Cmd_1.default.Code.AUTO_START:
          null === (_a = MauBinh_InGame_1.default.getInstance()) || void 0 === _a ? void 0 : _a.receivedAutoStart(value);
          break;

         case MauBinh_Cmd_1.default.Code.USER_JOIN_ROOM:
          null === (_b = MauBinh_InGame_1.default.getInstance()) || void 0 === _b ? void 0 : _b.receivedUserJoinRoom(value);
          break;

         case MauBinh_Cmd_1.default.Code.CHIA_BAI:
          null === (_c = MauBinh_InGame_1.default.getInstance()) || void 0 === _c ? void 0 : _c.receivedDealCard(value);
        }
        this.pendingCommands.clear();
      }
      clearPendingCommands() {
        this.pendingCommands.clear();
      }
    };
    MauBinhListener.instance = null;
    MauBinhListener = MauBinhListener_1 = __decorate([ ccclass ], MauBinhListener);
    exports.default = MauBinhListener;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/App": void 0,
    "../../Main/Game/src/common/BroadcastReceiver": void 0,
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/networks/MauBinhNetworkClient": void 0,
    "../../Main/Game/src/networks/Network.InPacket": void 0,
    "./MauBinh.Cmd": "MauBinh.Cmd",
    "./MauBinh.InGame": "MauBinh.InGame",
    "./MauBinh.Room": "MauBinh.Room"
  } ],
  "MauBinh.Player": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b79c0saMihPJLkLCRpjTeK5", "MauBinh.Player");
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
    const MauBinh_Constant_1 = require("./MauBinh.Constant");
    const MauBinh_InGame_1 = require("./MauBinh.InGame");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let MauBinhPlayer = class MauBinhPlayer extends cc.Component {
      constructor() {
        super(...arguments);
        this.avatar = null;
        this.cardReady = null;
        this.cardReal = null;
        this.userName = null;
        this.userGold = null;
        this.cardsName = null;
        this.actionViewer = null;
        this.actionThinking = null;
        this.actionWin = null;
        this.goldWin = null;
        this.actionLose = null;
        this.goldLose = null;
        this.actionXepXong = null;
        this.actionDangXep = null;
        this.notify = null;
        this.chatEmotion = null;
        this.chatMsg = null;
        this.shadowAvatar = null;
        this.shadowInfo = null;
        this.resultGame = null;
        this.matResultChi = [];
        this.actionGoldSoChi = null;
        this.historyChi = null;
        this.dataDefaultCardReal = [];
      }
      start() {
        BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.SET_SOUND, this.node);
        this.dataDefaultCardReal = [];
        for (let i = 0; i < this.cardReal.childrenCount; i++) this.dataDefaultCardReal.push({
          pos: this.cardReal.children[i].position,
          zIndex: this.cardReal.children[i].zIndex
        });
      }
      showChatEmotion(content) {
        this.node.getChildByName("Chat").active = true;
        this.chatEmotion.active = true;
        this.chatMsg.active = false;
        this.chatEmotion.getComponent(sp.Skeleton).setAnimation(0, content, true);
        this.scheduleOnce(() => {
          this.chatEmotion.active = false;
          this.chatMsg.active = false;
        }, 3);
      }
      showChatMsg(content) {
        this.node.getChildByName("Chat").active = true;
        this.chatEmotion.active = false;
        this.chatMsg.active = true;
        this.chatMsg.children[1].getComponent(cc.Label).string = content;
        this.scheduleOnce(() => {
          this.chatEmotion.active = false;
          this.chatMsg.active = false;
        }, 3);
      }
      showBtnInvite(state) {}
      setOwner(isOwner) {}
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
      scaleCardReal(scale) {
        this.cardReal.scale = scale;
      }
      showCardReady(state) {
        this.node.getChildByName("Card").active = true;
        this.cardReady.active = state;
      }
      showCardReal(state) {
        this.node.getChildByName("Card").active = true;
        this.scaleCardReal(1);
        this.cardReal.active = state;
      }
      isActionCardReal(isAction) {
        cc.Tween.stopAllByTarget(this.node);
        if (isAction) cc.tween(this.node).repeatForever(cc.tween().delay(2).call(() => {
          let arr = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ];
          arr.sort(() => Math.random() - .5);
          for (let i = 0; i < this.cardReal.childrenCount; i++) {
            cc.Tween.stopAllByTarget(this.cardReal.children[i]);
            cc.tween(this.cardReal.children[i]).to(.2, {
              position: this.dataDefaultCardReal[arr[i]].pos
            }).start();
            this.cardReal.children[i].zIndex = arr[i];
          }
        })).start(); else for (let i = 0; i < this.cardReal.childrenCount; i++) {
          cc.Tween.stopAllByTarget(this.cardReal.children[i]);
          this.cardReal.children[i].position = this.dataDefaultCardReal[i].pos;
          this.cardReal.children[i].zIndex = this.dataDefaultCardReal[i].zIndex;
        }
      }
      prepareToTransform() {
        for (let index = 0; index < 13; index++) this.prepareCardReal(index);
      }
      prepareCardReal(pos) {
        this.cardReal.children[pos].scaleX = 0;
        this.cardReal.children[pos].scaleY = 1;
      }
      transformToCardReal(cardPos, spriteCard, seatId) {
        this.node.getChildByName("Card").active = true;
        this.cardReal.active = true;
        if (0 == seatId) {
          this.cardReal.children[cardPos].children[1].getComponent(cc.Sprite).spriteFrame = spriteCard;
          this.cardReady.children[cardPos].runAction(cc.sequence(cc.scaleTo(.15, 0, 1), cc.callFunc(() => {})));
          this.cardReal.children[cardPos].runAction(cc.sequence(cc.delayTime(.15), cc.scaleTo(.15, 1, 1), cc.callFunc(() => {})));
        } else {
          this.cardReal.children[cardPos].children[0].getComponent(cc.Sprite).spriteFrame = spriteCard;
          this.cardReal.children[cardPos].runAction(cc.sequence(cc.scaleTo(.15, 1, 1), cc.callFunc(() => {})));
        }
      }
      showCardName(img) {
        this.cardsName.active = true;
        this.cardsName.getComponent(cc.Sprite).spriteFrame = img;
        this.scheduleOnce(() => {
          this.cardsName.active = false;
        }, 4.5);
      }
      setGold(money) {
        this.actionThinking.active = false;
        this.showGold(true);
        this.userGold.string = this.formatGold(money);
      }
      setCardReal(cardFrame, index) {
        this.cardReal.children[index].children[1].getComponent(cc.Sprite).spriteFrame = cardFrame;
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
        this.node.getChildByName("Info").getChildByName("Gold").active = true;
      }
      prepareFxAction() {
        this.node.getChildByName("Action").active = true;
        this.resetAction();
      }
      playFxViewer() {
        this.prepareFxAction();
        this.actionViewer.active = true;
      }
      playFxDangXep() {
        this.prepareFxAction();
        this.actionDangXep.active = true;
        this.actionXepXong.active = false;
        this.isActionCardReal(true);
      }
      playFxXepXong() {
        this.prepareFxAction();
        this.actionDangXep.active = false;
        this.actionXepXong.active = true;
        this.isActionCardReal(false);
      }
      playFxSoChiTotal(img = null) {
        this.node.getChildByName("Result").active = true;
        this.resultGame.children[3].active = true;
        this.resultGame.children[3].children[1].getComponent(cc.Label).string = "S\u1eadp C\u1ea3 3 Chi";
        this.resultGame.children[3].getComponent(cc.Animation).play();
      }
      playFxResultGeneral(seatId, isGood, cardName, isSoChi) {
        this.node.getChildByName("Result").active = true;
        this.resultGame.children[3].active = true;
        if (0 == seatId) {
          this.resultGame.children[3].y = isSoChi ? 285 : 550;
          this.resultGame.children[3].children[0].scale = isSoChi ? .4 : .6;
          this.resultGame.children[3].children[1].scale = isSoChi ? .4 : .6;
        }
        this.resultGame.children[3].children[0].getComponent(cc.Sprite).setMaterial(0, this.matResultChi[isGood ? 0 : 1]);
        this.resultGame.children[3].children[1].getComponent(cc.Label).string = isGood ? cardName : MauBinh_Constant_1.CardTypes.getBinhName(MauBinh_Constant_1.CardTypes.ENUM.TYPE_BINH_LUNG);
        this.resultGame.children[3].getComponent(cc.Animation).play();
      }
      playFxCompareChi(id, text) {
        this.node.getChildByName("Result").active = true;
        this.resultGame.children[id - 1].active = true;
        this.resultGame.children[id - 1].children[1].getComponent(cc.Label).string = text;
        this.resultGame.children[id - 1].getComponent(cc.Animation).play();
      }
      showHistoryChi(goldChi, index) {
        if (!this.historyChi) return;
        if (1 == index) {
          this.historyChi.active = true;
          this.historyChi.children.forEach(node => {
            node.getComponent(cc.Label).string = "-";
          });
        }
        3 == index && this.scheduleOnce(() => {
          this.historyChi.active = false;
        }, 3);
        goldChi >= 0 ? this.historyChi.children[index - 1].getComponent(cc.Label).string = "+" + goldChi : goldChi < 0 && (this.historyChi.children[index - 1].getComponent(cc.Label).string = goldChi.toString());
      }
      playFxGoldSoChi(goldChi) {
        this.actionGoldSoChi.active = true;
        this.actionGoldSoChi.children[1].getComponent(cc.Label).string = (goldChi >= 0 ? "+" : "") + goldChi + " Chi";
        this.scheduleOnce(() => {
          this.actionGoldSoChi.active = false;
        }, 2.5);
      }
      playFxWinSoChi(result) {
        this.node.getChildByName("Action").active = true;
        this.actionWin.active = true;
        this.goldWin.string = "+" + result + " Chi";
        this.scheduleOnce(() => {
          this.node.getChildByName("Action").active = false;
        }, 1);
      }
      playFxLoseSoChi(result) {
        this.node.getChildByName("Action").active = true;
        this.actionLose.active = true;
        this.goldLose.string = result + " Chi";
        this.scheduleOnce(() => {
          this.node.getChildByName("Action").active = false;
        }, 1);
      }
      fxWin(moneyChange, currentMoney) {
        this.node.getChildByName("Action").active = true;
        this.actionLose.active = false;
        this.actionWin.active = true;
        this.goldWin.node.stopAllActions();
        this.goldWin.string = "+" + this.formatGold(moneyChange);
        this.setGold(currentMoney);
        cc.Tween.stopAllByTarget(this.actionWin);
        cc.Tween.stopAllByTarget(this.actionLose);
        cc.tween(this.actionWin).delay(6).call(() => {
          if (null == this.node || "undefined" == typeof this.node) return;
          this.actionWin.active = false;
          this.node.getChildByName("Action").active = false;
        }).start();
      }
      fxLose(moneyChange, currentMoney) {
        this.node.getChildByName("Action").active = true;
        this.actionWin.active = false;
        this.actionLose.active = true;
        this.goldLose.node.stopAllActions();
        this.goldLose.string = this.formatGold(moneyChange);
        this.setGold(currentMoney);
        cc.Tween.stopAllByTarget(this.actionWin);
        cc.Tween.stopAllByTarget(this.actionLose);
        cc.tween(this.actionLose).delay(6).call(() => {
          if (null == this.node || "undefined" == typeof this.node) return;
          this.actionLose.active = false;
          this.node.getChildByName("Action").active = false;
        }).start();
      }
      shadowCardReady(state) {
        for (let index = 0; index < 13; index++) this.cardReady.children[index].color = state ? cc.Color.GRAY : cc.Color.WHITE;
      }
      setPositionCardReal(pos) {
        this.cardReal.setPosition(pos);
      }
      shadowCardReal(state) {
        for (let index = 0; index < 13; index++) this.cardReal.children[index].children[0].color = state ? cc.Color.GRAY : cc.Color.WHITE;
      }
      shadowCard(index, state) {
        this.cardReal.children[index].children[1].color = state ? cc.Color.GRAY : cc.Color.WHITE;
      }
      setCardWin(pos, state) {
        this.cardReal.children[pos].children[0].color = state ? cc.Color.WHITE : cc.Color.GRAY;
      }
      showNotify(is_out) {
        this.notify.active = true;
        this.notify.getChildByName("text").getComponent(cc.Label).string = is_out ? "R\u1eddi b\xe0n" : "Ch\u01a1i ti\u1ebfp";
        this.scheduleOnce(() => {
          this.notify.active = false;
        }, 1.5);
      }
      resetResultGame() {
        for (let index = 0; index < 4; index++) this.resultGame.children[index].active = false;
      }
      resetResultChi(chiId) {
        this.resultGame.children[chiId - 1].active = false;
      }
      resetAction() {
        this.node.getChildByName("Action").children.forEach(child => child.active = false);
      }
      resetMatchHistory(seatId) {
        this.resetCardReady(seatId);
        this.resetCardReal(seatId);
        this.node.getChildByName("Card").active = false;
        this.showGold(true);
        this.cardsName.active = false;
        this.resetAction();
      }
      resetCardReady(seatId) {
        if (0 == seatId) for (let index = 0; index < 13; index++) this.cardReady.children[index].scale = 1;
        this.cardReady.active = false;
      }
      resetCardReal(seatId) {
        this.cardReal.active = false;
        for (let index = 0; index < 13; index++) this.cardReal.children[index].children[0 == seatId ? 1 : 0].getComponent(cc.Sprite).spriteFrame = MauBinh_InGame_1.default.getInstance().getCardBackFrame();
        this.shadowCardReal(false);
      }
      resetPlayerInfo(seatId) {
        this.node.children.forEach(child => child.active = "BtnChat" === child.name);
        for (let index = 0; index < 13; index++) this.cardReal.children[index].children[0 == seatId ? 1 : 0].getComponent(cc.Sprite).spriteFrame = MauBinh_InGame_1.default.getInstance().getCardBackFrame();
        this.cardReady.active = false;
        this.cardReal.active = false;
        this.cardsName.active = false;
        this.actionViewer.active = false;
        this.actionThinking.active = false;
        this.actionWin.active = false;
        this.actionLose.active = false;
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
    __decorate([ property(cc.Node) ], MauBinhPlayer.prototype, "avatar", void 0);
    __decorate([ property(cc.Node) ], MauBinhPlayer.prototype, "cardReady", void 0);
    __decorate([ property(cc.Node) ], MauBinhPlayer.prototype, "cardReal", void 0);
    __decorate([ property(cc.Label) ], MauBinhPlayer.prototype, "userName", void 0);
    __decorate([ property(cc.Label) ], MauBinhPlayer.prototype, "userGold", void 0);
    __decorate([ property(cc.Node) ], MauBinhPlayer.prototype, "cardsName", void 0);
    __decorate([ property(cc.Node) ], MauBinhPlayer.prototype, "actionViewer", void 0);
    __decorate([ property(cc.Node) ], MauBinhPlayer.prototype, "actionThinking", void 0);
    __decorate([ property(cc.Node) ], MauBinhPlayer.prototype, "actionWin", void 0);
    __decorate([ property(cc.Label) ], MauBinhPlayer.prototype, "goldWin", void 0);
    __decorate([ property(cc.Node) ], MauBinhPlayer.prototype, "actionLose", void 0);
    __decorate([ property(cc.Label) ], MauBinhPlayer.prototype, "goldLose", void 0);
    __decorate([ property(cc.Node) ], MauBinhPlayer.prototype, "actionXepXong", void 0);
    __decorate([ property(cc.Node) ], MauBinhPlayer.prototype, "actionDangXep", void 0);
    __decorate([ property(cc.Node) ], MauBinhPlayer.prototype, "notify", void 0);
    __decorate([ property(cc.Node) ], MauBinhPlayer.prototype, "chatEmotion", void 0);
    __decorate([ property(cc.Node) ], MauBinhPlayer.prototype, "chatMsg", void 0);
    __decorate([ property(cc.Node) ], MauBinhPlayer.prototype, "shadowAvatar", void 0);
    __decorate([ property(cc.Node) ], MauBinhPlayer.prototype, "shadowInfo", void 0);
    __decorate([ property(cc.Node) ], MauBinhPlayer.prototype, "resultGame", void 0);
    __decorate([ property(cc.Material) ], MauBinhPlayer.prototype, "matResultChi", void 0);
    __decorate([ property(cc.Node) ], MauBinhPlayer.prototype, "actionGoldSoChi", void 0);
    __decorate([ property(cc.Node) ], MauBinhPlayer.prototype, "historyChi", void 0);
    MauBinhPlayer = __decorate([ ccclass ], MauBinhPlayer);
    exports.default = MauBinhPlayer;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/App": void 0,
    "../../Main/Game/src/common/BroadcastReceiver": void 0,
    "./MauBinh.Constant": "MauBinh.Constant",
    "./MauBinh.InGame": "MauBinh.InGame"
  } ],
  "MauBinh.PopupGuide": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "19693k2bQFH4ZRnJ7ytG2jP", "MauBinh.PopupGuide");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var MauBinhPopupGuide_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const App_1 = require("../../Main/Game/src/common/App");
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    const Dialog_1 = require("../../Main/Game/src/common/Dialog");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let MauBinhPopupGuide = MauBinhPopupGuide_1 = class MauBinhPopupGuide extends Dialog_1.default {
      constructor() {
        super(...arguments);
        this.scrollPopupGuide = null;
      }
      static createAndShow(parent) {
        null == this.instance || null == this.instance.node ? App_1.default.instance.loadPrefabInBundle(Configs_1.default.App.BUNDLE_NAME.MAUBINH, Configs_1.default.App.UPDATE_INFO[Configs_1.default.App.BUNDLE_NAME.MAUBINH], true, "res/prefabs/MauBinhPopupGuide", (err, prefab) => {
          if (null != err) {
            App_1.default.instance.alertDialog.showMsg(err);
            return;
          }
          let go = cc.instantiate(prefab);
          go.parent = parent;
          this.instance = go.getComponent(MauBinhPopupGuide_1);
          this.instance.show();
        }) : this.instance.show();
      }
      show() {
        super.show();
        let lbContents = this.scrollPopupGuide.content.getComponentsInChildren(cc.Label);
        lbContents[0].string = "LI\xcaN K\u1ebeT:";
        lbContents[1].string = "C\xe1c l\xe1 b\xe0i c\u1ee7a ng\u01b0\u1eddi ch\u01a1i c\xf3 li\xean k\u1ebft \u0111\u01b0\u1ee3c quy \u0111\u1ecbnh nh\u01b0 sau:\n\u0110\u1ed9 m\u1ea1nh t\u0103ng d\u1ea7n t\u1eeb tr\xean xu\u1ed1ng d\u01b0\u1edbi.\n- M\u1eadu th\u1ea7u: Kh\xf4ng c\xf3 li\xean k\u1ebft c\xe1c l\xe1 b\xe0i. VD: A b\xedch, Q t\xe9p 10 c\u01a1, 9 r\xf4, 8 c\u01a1\n- \u0110\xf4i: 7 r\xf4, 7 t\xe9p, 10 b\xedch, Q t\xe9p, A b\xedch\n- Th\xfa: 2 \u0111\xf4i (chi cu\u1ed1i kh\xf4ng c\xf3). VD: J r\xf4, J t\xe9p, 9 b\xedch, 9 c\u01a1, K t\xe9p\n- S\xe1m (3 l\xe1 c\xf9ng s\u1ed1): K c\u01a1, K r\xf4, K t\xe9p, A t\xe9p, 2 b\xedch\n- S\u1ea3nh: 5 l\xe1 c\xf3 s\u1ed1 li\xean ti\u1ebfp nhau (chi cu\u1ed1i kh\xf4ng c\xf3). Li\xean k\u1ebft A, 2, 3, 4, 5 g\u1ecdi l\xe0 S\u1ea3nh Nh\u1ecb, ch\u1ec9 \u0111\u1ee9ng sau S\u1ea3nh \u0110\u1ea1i (A, K, Q, J, 10).\n- Th\xf9ng: 5 l\xe1 c\xf9ng ch\u1ea5t (chi cu\u1ed1i kh\xf4ng c\xf3). VD: 7 r\xf4, Q r\xf4, 10 r\xf4, K r\xf4, A r\xf4\n- C\xf9 L\u0169: 1 S\xe1m & 1 \u0110\xf4i (chi cu\u1ed1i kh\xf4ng c\xf3). VD: Q c\u01a1, Q r\xf4, Q b\xedch, 9 t\xe9p, 9 b\xedch\n- T\u1ee9 Qu\xfd: 4 l\xe1 c\xf9ng s\u1ed1 (chi cu\u1ed1i kh\xf4ng c\xf3). VD: Q c\u01a1, Q r\xf4, Q t\xe9p, Q b\xedch, K b\xedch\n- Th\xf9ng ph\xe1 S\u1ea3nh: D\xe2y \u0111\u1ed3ng ch\u1ea5t (chi cu\u1ed1i kh\xf4ng c\xf3). \n    VD: Q c\u01a1, J c\u01a1, 10 c\u01a1, 9 c\u01a1, 8 c\u01a1\n- Th\xf9ng ph\xe1 S\u1ea3nh l\u1edbn: D\xe2y \u0111\u1ed3ng ch\u1ea5t c\xf3 A ( chi cu\u1ed1i kh\xf4ng c\xf3). \n    VD: A b\xedch, K b\xedch, Q b\xedch, J b\xedch, 10 b\xedch\n";
        lbContents[2].string = "C\xc1CH CH\u01a0I:";
        lbContents[3].string = "- B\u1eaft \u0111\u1ea7u v\xe1n ch\u01a1i, m\u1ed7i ng\u01b0\u1eddi \u0111\u01b0\u1ee3c chia 13 l\xe1, x\u1ebfp th\xe0nh 3 chi. \n    Ng\u01b0\u1eddi ch\u01a1i c\xf3 90s \u0111\u1ec3 s\u1eafp x\u1ebfp b\xe0i c\u1ee7a m\xecnh sao cho li\xean k\u1ebft c\u1ee7a chi tr\u01b0\u1edbc m\u1ea1nh h\u01a1n chi sau.\n- Ng\u01b0\u1eddi ch\u01a1i c\xf3 th\u1ec3 ch\u1ecdn g\u1ee3i \xfd \u0111\u1ec3 m\xe1y t\u1ef1 s\u1eafp b\xe0i.\n- Sau khi h\u1ebft th\u1eddi gian ho\u1eb7c x\u1ebfp xong b\xe0i th\xec b\u1eaft \u0111\u1ea7u \u0111\u1ecd b\xe0i. L\u1ea7n l\u01b0\u1ee3t t\u1eebng ng\u01b0\u1eddi ch\u01a1i s\u1ebd so t\u1eebng chi v\u1edbi nhau. M\u1ed7i l\u1ea7n so s\xe1nh k\xe9o d\xe0i 5s g\u1ed3m hi\u1ec3n th\u1ecb b\u1ed9 b\xe0i, t\xean b\u1ed9 b\xe0i, s\u1ed1 l\u1ea7n th\u1eafng \u0111\u01b0\u1ee3c c\u1eadp nh\u1eadt.\n- N\u1ebfu Ng\u01b0\u1eddi ch\u01a1i c\xf3 b\xe0i M\u1eadu Binh th\u1eafng tr\u1eafng th\xec s\u1ebd th\u1eafng lu\xf4n m\xe0 kh\xf4ng c\u1ea7n so b\xe0i.\n- N\u1ebfu \u0111\u1ed9 m\u1ea1nh b\u1eb1ng nhau th\xec c\xf9ng chia g\xe0..\n";
        lbContents[4].string = "C\xe1c tr\u01b0\u1eddng h\u1ee3p M\u1eadu Binh th\u1eafng tr\u1eafng, \u0111\u1ed9 m\u1ea1nh gi\u1ea3m d\u1ea7n nh\u01b0 sau:";
        lbContents[5].string = "- S\u1ea3nh r\u1ed3ng cu\u1ed1n: G\u1ed3m 13 l\xe1 b\xe0i t\u1eeb 2 \u0111\u1ebfn A \u0111\u1ed3ng ch\u1ea5t. Ng\u01b0\u1eddi ch\u01a1i \u0111\u01b0\u1ee3c 72 l\u1ea7n ti\u1ec1n c\u01b0\u1ee3c.\n- S\u1ea3nh r\u1ed3ng: G\u1ed3m 13 l\xe1 b\xe0i t\u1eeb 2 \u0111\u1ebfn A kh\xf4ng \u0111\u1ed3ng ch\u1ea5t. Ng\u01b0\u1eddi ch\u01a1i \u0111\u01b0\u1ee3c 72 l\u1ea7n ti\u1ec1n c\u01b0\u1ee3c.\n- M\u01b0\u1eddi ba l\xe1 \u0111\u1ed3ng m\xe0u: Ng\u01b0\u1eddi ch\u01a1i \u0111\u01b0\u1ee3c 30 l\u1ea7n ti\u1ec1n c\u01b0\u1ee3c.\n- M\u01b0\u1eddi hai l\xe1 \u0111\u1ed3ng m\xe0u: Ng\u01b0\u1eddi ch\u01a1i \u0111\u01b0\u1ee3c 24 l\u1ea7n ti\u1ec1n c\u01b0\u1ee3c.\n- N\u0103m \u0111\xf4i m\u1ed9t s\xe1m: Ng\u01b0\u1eddi ch\u01a1i \u0111\u01b0\u1ee3c 24 l\u1ea7n ti\u1ec1n c\u01b0\u1ee3c.\n- L\u1ee5c ph\u1ebf b\xf4n: G\u1ed3m 6 \u0111\xf4i trong 13 l\xe1 b\xe0i. Ng\u01b0\u1eddi ch\u01a1i \u0111\u01b0\u1ee3c 18 l\u1ea7n ti\u1ec1n c\u01b0\u1ee3c.\n- Ba th\xf9ng: G\u1ed3m 3 th\xf9ng t\u1ea1i c\u1ea3 3 chi. Ng\u01b0\u1eddi ch\u01a1i \u0111\u01b0\u1ee3c 18 l\u1ea7n ti\u1ec1n c\u01b0\u1ee3c.\n- Ba s\u1ea3nh: G\u1ed3m 3 s\u1ea3nh t\u1ea1i c\u1ea3 3 chi. Ng\u01b0\u1eddi ch\u01a1i \u0111\u01b0\u1ee3c 18 l\u1ea7n ti\u1ec1n c\u01b0\u1ee3c.\n";
        lbContents[6].string = "C\xe1c tr\u01b0\u1eddng h\u1ee3p m\u1eadu binh th\u01b0\u1eddng:";
        lbContents[7].string = "- S\xe1m chi cu\u1ed1i: N\u1ebfu ng\u01b0\u1eddi ch\u01a1i th\u1eafng chi cu\u1ed1i b\u1eb1ng b\u1ed9 s\xe1m th\xec s\u1ebd \u0111\u01b0\u1ee3c 4 l\u1ea7n ti\u1ec1n c\u01b0\u1ee3c.\n- C\xf9 l\u0169 chi 2: N\u1ebfu ng\u01b0\u1eddi ch\u01a1i th\u1eafng chi 2 b\u1eb1ng b\u1ed9 c\xf9 l\u0169 \u0111\u01b0\u1ee3c 4 l\u1ea7n c\u01b0\u1ee3c.\n- T\u1ee9 qu\xfd chi \u0111\u1ea7u: N\u1ebfu ng\u01b0\u1eddi ch\u01a1i th\u1eafng chi \u0111\u1ea7u b\u1eb1ng b\u1ed9 t\u1ee9 qu\xfd th\xec s\u1ebd \u0111\u01b0\u1ee3c 8 l\u1ea7n c\u01b0\u1ee3c.\n- T\u1ee9 qu\xfd chi 2: N\u1ebfu ng\u01b0\u1eddi ch\u01a1i th\u1eafng chi 2 b\u1eb1ng b\u1ed9 t\u1ee9 qu\xfd th\xec s\u1ebd \u0111\u01b0\u1ee3c 16 l\u1ea7n c\u01b0\u1ee3c.\n- Th\xf9ng ph\xe1 s\u1ea3nh chi \u0111\u1ea7u: Ng\u01b0\u1eddi ch\u01a1i th\u1eafng chi \u0111\u1ea7u b\u1eb1ng b\u1ed9 th\xf9ng ph\xe1 s\u1ea3nh th\xec s\u1ebd \u0111\u01b0\u1ee3c 10 l\u1ea7n c\u01b0\u1ee3c.\n- Th\xf9ng ph\xe1 s\u1ea3nh chi 2: Ng\u01b0\u1eddi ch\u01a1i th\u1eafng chi 2 b\u1eb1ng b\u1ed9 th\xf9ng ph\xe1 s\u1ea3nh th\xec s\u1ebd \u0111\u01b0\u1ee3c 20 l\u1ea7n c\u01b0\u1ee3c.\n";
        lbContents[8].string = "B\u1eaft s\u1eadp:";
        lbContents[9].string = "- S\u1eadp h\u1ea7m: ph\u1ea1t x2 l\u1ea7n m\u1ed7i chi khi ng\u01b0\u1eddi ch\u01a1i thua s\u1eadp h\u1ea7m.\n- S\u1eadp l\xe0ng: ph\u1ea1t x2 l\u1ea7n m\u1ed7i chi cho t\u1ea5t c\u1ea3 ng\u01b0\u1eddi trong b\xe0n, tr\u1eeb ng\u01b0\u1eddi b\u1eaft s\u1eadp l\xe0ng.";
      }
    };
    MauBinhPopupGuide.instance = null;
    __decorate([ property(cc.ScrollView) ], MauBinhPopupGuide.prototype, "scrollPopupGuide", void 0);
    MauBinhPopupGuide = MauBinhPopupGuide_1 = __decorate([ ccclass ], MauBinhPopupGuide);
    exports.default = MauBinhPopupGuide;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/App": void 0,
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/common/Dialog": void 0
  } ],
  "MauBinh.Room": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "42c10TW6WdFCo/r7sBtGHNW", "MauBinh.Room");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var MauBinhRoom_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const App_1 = require("../../Main/Game/src/common/App");
    const BroadcastReceiver_1 = require("../../Main/Game/src/common/BroadcastReceiver");
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    const Tween_1 = require("../../Main/Game/src/common/Tween");
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const ItemRoom_1 = require("../../Main/Game/src/games/cardgames/ItemRoom");
    const MauBinhNetworkClient_1 = require("../../Main/Game/src/networks/MauBinhNetworkClient");
    const Lobby_PopupCashOut_1 = require("../../Main/Lobby/src/Lobby.PopupCashOut");
    const MauBinh_Cmd_1 = require("./MauBinh.Cmd");
    const MauBinh_InGame_1 = require("./MauBinh.InGame");
    const MauBinh_Listener_1 = require("./MauBinh.Listener");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let MauBinhRoom = MauBinhRoom_1 = class MauBinhRoom extends cc.Component {
      constructor() {
        super(...arguments);
        this.scrollListRoom = null;
        this.roomItem = null;
        this.lbCoin = null;
        this.lbName = null;
        this.avatar = null;
        this.listRoom = [];
        this._isClickBack = false;
      }
      static getInstance() {
        return this.instance;
      }
      static destroyInstance() {
        this.instance = null;
      }
      onLoad() {
        MauBinhRoom_1.instance = this;
      }
      start() {
        BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.SET_SOUND, this.node);
        cc.director.preloadScene("MauBinh.InGame");
        this.sendGetListRoom();
        this.updateInfoPlayer();
        this.updateCoinPlayer();
        this.isClickBack = false;
      }
      set isClickBack(b) {
        this._isClickBack = b;
      }
      get isClickBack() {
        return this._isClickBack;
      }
      updateCoinPlayer() {
        Tween_1.default.numberTo(this.lbCoin, Configs_1.default.Login.Coin, .3);
      }
      updateInfoPlayer() {
        this.lbName.string = Configs_1.default.Login.Nickname;
        this.avatar.spriteFrame = App_1.default.instance.getAvatarSpriteFrame(Configs_1.default.Login.Avatar);
      }
      sendGetListRoom() {
        MauBinhNetworkClient_1.default.getInstance().send(new MauBinh_Cmd_1.default.SendMoneyBetConfig());
      }
      receivedMoneyBetConfig(moneyBetConfigData) {
        this.listRoom = moneyBetConfigData.list;
        this.initRooms(this.listRoom);
      }
      initRooms(rooms) {
        this.scrollListRoom.content.removeAllChildren();
        let listBet = [ ...new Set(this.listRoom) ].filter(room => room.moneyType === Configs_1.default.App.MONEY_TYPE).map(room => room.moneyBet).sort((a, b) => a - b);
        let speed = .7;
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
          let roomItem = cc.instantiate(this.roomItem);
          roomItem.getComponent(ItemRoom_1.default).initItem(new ItemRoom_1.RoomItemInfo(index + 1, bet, moneyRequire, playerCount, maxUser));
          roomItem.on(cc.Node.EventType.TOUCH_END, event => {
            if (Configs_1.default.Login.Coin < moneyRequire) {
              App_1.default.instance.actiontDialog.showMsgWithAction("S\u1ed1 d\u01b0 kh\xf4ng \u0111\u1ee7.", "N\u1ea0P NGAY", () => {
                App_1.default.instance.openShop(0);
              });
              return;
            }
            App_1.default.instance.showLoading(true);
            MauBinhNetworkClient_1.default.getInstance().send(new MauBinh_Cmd_1.default.SendJoinRoom(Configs_1.default.App.MONEY_TYPE, maxUser, listBet[index], 0));
          });
          roomItem.parent = this.scrollListRoom.content;
          roomItem.y = -30;
          let time = .2 * speed * (1 === index ? .8 : 1 - Math.pow(2, -10 * index));
          roomItem.runAction(cc.sequence(cc.fadeOut(0), cc.delayTime(.15 * (this.listRoom.length - index) * speed), cc.spawn(cc.fadeIn(time), cc.moveTo(time, cc.v2(0, -30 - 85 * index)).easing(cc.easeCircleActionOut()))));
        });
        this.scrollListRoom.scrollToBottom(0);
        this.scrollListRoom.scrollToTop(2);
      }
      actQuickPlay() {
        let listRoomToJoin = this.listRoom.filter(room => room.moneyRequire <= Configs_1.default.Login.Coin);
        if (listRoomToJoin.length <= 0) {
          App_1.default.instance.actiontDialog.showMsgWithAction("S\u1ed1 d\u01b0 kh\xf4ng \u0111\u1ee7.", "N\u1ea0P NGAY", () => {
            App_1.default.instance.openShop(0);
          });
          return;
        }
        let randomIdx = Utils_1.default.randomRangeInt(0, listRoomToJoin.length);
        let room = listRoomToJoin[randomIdx];
        App_1.default.instance.showLoading(true);
        MauBinhNetworkClient_1.default.getInstance().send(new MauBinh_Cmd_1.default.SendJoinRoom(Configs_1.default.App.MONEY_TYPE, room.maxUserPerRoom, room.moneyBet, 0));
      }
      actHideFullyRoom(toggleHide) {
        this.scrollListRoom.content.children.forEach(roomItem => {
          roomItem.active = !toggleHide.isChecked || roomItem.getComponent(ItemRoom_1.default).isFull();
        });
      }
      actExchange() {
        Lobby_PopupCashOut_1.default.createAndShow(this.node);
      }
      actBack(event) {
        this.isClickBack = true;
        MauBinhNetworkClient_1.default.getInstance().close();
      }
      receivedJoinRoomFail(joinRoomFailData) {
        let errorMsg = "L\u1ed7i " + joinRoomFailData.getError() + ", kh\xf4ng x\xe1c \u0111\u1ecbnh.";
        switch (joinRoomFailData.getError()) {
         case 1:
          errorMsg = "L\u1ed7i ki\u1ec3m tra th\xf4ng tin!";
          break;

         case 2:
          errorMsg = "Kh\xf4ng t\xecm \u0111\u01b0\u1ee3c ph\xf2ng th\xedch h\u1ee3p. Vui l\xf2ng th\u1eed l\u1ea1i sau!";
          break;

         case 3:
          errorMsg = "B\u1ea1n kh\xf4ng \u0111\u1ee7 ti\u1ec1n v\xe0o ph\xf2ng ch\u01a1i n\xe0y!";
          break;

         case 4:
          errorMsg = "Kh\xf4ng t\xecm \u0111\u01b0\u1ee3c ph\xf2ng th\xedch h\u1ee3p. Vui l\xf2ng th\u1eed l\u1ea1i sau!";
          break;

         case 5:
          errorMsg = "M\u1ed7i l\u1ea7n v\xe0o ph\xf2ng ph\u1ea3i c\xe1ch nhau 10 gi\xe2y!";
          break;

         case 6:
          errorMsg = "H\u1ec7 th\u1ed1ng b\u1ea3o tr\xec!";
          break;

         case 7:
          errorMsg = "Kh\xf4ng t\xecm th\u1ea5y ph\xf2ng ch\u01a1i!";
          break;

         case 8:
          errorMsg = "M\u1eadt kh\u1ea9u ph\xf2ng ch\u01a1i kh\xf4ng \u0111\xfang!";
          break;

         case 9:
          errorMsg = "Ph\xf2ng ch\u01a1i \u0111\xe3 \u0111\u1ee7 ng\u01b0\u1eddi!";
          break;

         case 10:
          errorMsg = "B\u1ea1n b\u1ecb ch\u1ee7 ph\xf2ng kh\xf4ng cho v\xe0o b\xe0n!";
        }
        App_1.default.instance.alertDialog.showMsg(errorMsg);
      }
      receivedJoinRoomSuccess(joinRoomSuccessData) {
        cc.director.loadScene("MauBinh.InGame", (error, sceneAsset) => {
          var _a;
          App_1.default.instance.showLoading(false);
          if (error) {
            null === (_a = MauBinh_Listener_1.default.getInstance()) || void 0 === _a ? void 0 : _a.clearPendingCommands();
            return;
          }
          MauBinh_InGame_1.default.getInstance().updateRoomInfo(joinRoomSuccessData);
        });
      }
      receivedGameInfo(gameInfoData) {
        cc.director.loadScene("MauBinh.InGame", (error, sceneAsset) => {
          var _a;
          App_1.default.instance.showLoading(false);
          if (error) {
            null === (_a = MauBinh_Listener_1.default.getInstance()) || void 0 === _a ? void 0 : _a.clearPendingCommands();
            return;
          }
          this.scheduleOnce(() => {
            MauBinh_InGame_1.default.getInstance().receivedGameInfo(gameInfoData);
          }, 1);
        });
      }
    };
    MauBinhRoom.instance = null;
    __decorate([ property(cc.ScrollView) ], MauBinhRoom.prototype, "scrollListRoom", void 0);
    __decorate([ property(cc.Prefab) ], MauBinhRoom.prototype, "roomItem", void 0);
    __decorate([ property(cc.Label) ], MauBinhRoom.prototype, "lbCoin", void 0);
    __decorate([ property(cc.Label) ], MauBinhRoom.prototype, "lbName", void 0);
    __decorate([ property(cc.Sprite) ], MauBinhRoom.prototype, "avatar", void 0);
    MauBinhRoom = MauBinhRoom_1 = __decorate([ ccclass ], MauBinhRoom);
    exports.default = MauBinhRoom;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/App": void 0,
    "../../Main/Game/src/common/BroadcastReceiver": void 0,
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/common/Tween": void 0,
    "../../Main/Game/src/common/Utils": void 0,
    "../../Main/Game/src/games/cardgames/ItemRoom": void 0,
    "../../Main/Game/src/networks/MauBinhNetworkClient": void 0,
    "../../Main/Lobby/src/Lobby.PopupCashOut": void 0,
    "./MauBinh.Cmd": "MauBinh.Cmd",
    "./MauBinh.InGame": "MauBinh.InGame",
    "./MauBinh.Listener": "MauBinh.Listener"
  } ]
}, {}, [ "MauBinh.CardDrag", "MauBinh.CardUtil", "MauBinh.Cmd", "MauBinh.Constant", "MauBinh.DetectGroupCards", "MauBinh.DetectPlayerCards", "MauBinh.HandleDragAndDrop", "MauBinh.InGame", "MauBinh.Listener", "MauBinh.Player", "MauBinh.PopupGuide", "MauBinh.Room" ]);