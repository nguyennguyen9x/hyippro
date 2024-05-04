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
  "SlotCayKhe.Cmd": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ad2b2+DR71KvbLa70BDQBSl", "SlotCayKhe.Cmd");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.cmd = void 0;
    const Network_OutPacket_1 = require("../../Main/Game/src/networks/Network.OutPacket");
    const Network_InPacket_1 = require("../../Main/Game/src/networks/Network.InPacket");
    const Constants_1 = require("../../Main/Game/src/common/Constants");
    const {ccclass: ccclass} = cc._decorator;
    var cmd;
    (function(cmd_1) {
      class Code {}
      Code.PING_PONG = 50;
      Code.SUBCRIBE = 11003;
      Code.UNSUBCRIBE = 11004;
      Code.CHANGE_ROOM = 11005;
      Code.UPDATE_RESULT = 11001;
      Code.UPDATE_POT = 11002;
      Code.AUTO = 11006;
      Code.FORCE_STOP_AUTO = 11008;
      Code.SUBCRIBE_RESPONSE = 11009;
      Code.BIG_WIN = 11010;
      Code.FREE = 11011;
      Code.FREE_DAI_LY = 11012;
      Code.MINIMIZE = 11013;
      Code.GET_INFO = 11015;
      Code.FREE_GAME = 11016;
      cmd_1.Code = Code;
      class cmdCustom extends Network_OutPacket_1.default {
        constructor(cmd, array = []) {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(cmd);
          this.packHeader();
          array.forEach(vl => {
            switch (vl.type) {
             case "0":
              this.putShort(vl.data);

             case "1":
              this.putByte(vl.data);

             case "2":
              this.putByteArray(vl.data);

             case "3":
              this.putInt(vl.data);

             case "4":
              this.putDouble(vl.data);

             case "5":
              this.putBytes(vl.data);

             case "6":
              this.putString(vl.data);

             case "7":
              this.putUnsignedShort(vl.data);
            }
          });
        }
      }
      cmd_1.cmdCustom = cmdCustom;
      class sendInfo extends Network_OutPacket_1.default {
        constructor() {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.GET_INFO);
          this.packHeader();
        }
      }
      cmd_1.sendInfo = sendInfo;
      class SendPing extends Network_OutPacket_1.default {
        constructor() {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.PING_PONG);
          this.packHeader();
          this.updateSize();
        }
      }
      cmd_1.SendPing = SendPing;
      class SendSubcribe extends Network_OutPacket_1.default {
        constructor(roomId) {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.SUBCRIBE);
          this.packHeader();
          this.putByte(roomId);
          this.updateSize();
        }
      }
      cmd_1.SendSubcribe = SendSubcribe;
      class SendUnSubcribe extends Network_OutPacket_1.default {
        constructor(roomId) {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.UNSUBCRIBE);
          this.packHeader();
          this.putByte(roomId);
          this.updateSize();
        }
      }
      cmd_1.SendUnSubcribe = SendUnSubcribe;
      class SendPlay extends Network_OutPacket_1.default {
        constructor() {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.UPDATE_RESULT);
          this.packHeader();
          this.updateSize();
        }
      }
      cmd_1.SendPlay = SendPlay;
      class SendMiniGameId extends Network_OutPacket_1.default {
        constructor(id) {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.FREE_GAME);
          this.packHeader();
          this.putByte(id);
          this.updateSize();
        }
      }
      cmd_1.SendMiniGameId = SendMiniGameId;
      class SendChangeRoom extends Network_OutPacket_1.default {
        constructor(roomLeavedId, roomJoinedId) {
          super();
          console.log("room leave: " + roomLeavedId + ", room join: " + roomJoinedId);
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.CHANGE_ROOM);
          this.packHeader();
          this.putByte(roomLeavedId);
          this.putByte(roomJoinedId);
          this.updateSize();
        }
      }
      cmd_1.SendChangeRoom = SendChangeRoom;
      class ReceiveUpdatePot extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.jackpot = 0;
          this.jackpots = null;
          this.x2 = 0;
          this.jackpot = this.getLong();
          this.x2 = this.getByte();
          this.jackpots = JSON.parse(this.getString() || "{}");
        }
      }
      cmd_1.ReceiveUpdatePot = ReceiveUpdatePot;
      class ReceiveResult extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.ref = 0;
          this.result = 0;
          this.matrix = "";
          this.linesWin = "";
          this.haiSao = "";
          this.prize = 0;
          this.currentMoney = 0;
          this.freeSpin = 0;
          this.isFree = false;
          this.itemsWild = "";
          this.ratio = 0;
          this.awardsDetail = "";
          this.selectedAllAwardsDetail = "";
          this.listSuggestionActions = [];
          this.freeSpinOption = [];
          this.itemsWin = [];
          this.typeJackpot = 0;
          this.ref = this.getLong();
          this.result = this.getByte();
          this.matrix = this.getString();
          this.linesWin = this.getString();
          this.haiSao = this.getString();
          this.prize = this.getLong();
          this.currentMoney = this.getLong();
          this.freeSpin = this.getByte();
          this.isFree = this.getBool();
          this.itemsWild = this.getString();
          this.ratio = this.getByte();
          this.awardsDetail = JSON.parse(this.getString() || "{}");
          this.selectedAllAwardsDetail = JSON.parse(this.getString() || "{}");
          let actionsStr = this.getString();
          if (actionsStr) {
            let actions = JSON.parse(actionsStr);
            (null === actions || void 0 === actions ? void 0 : actions.hasOwnProperty("object")) && Array.isArray(actions["object"]) && (this.listSuggestionActions = Constants_1.UserActions.toEnums(actions["object"]));
          }
          this.freeSpinOption = [];
          let listSize = this.getInt();
          for (var a = 0; a < listSize; a++) this.freeSpinOption.push(this.getInt());
          this.itemsWin = JSON.parse(this.getString() || "{'object':[]}").object;
          this.typeJackpot = this.getInt();
        }
      }
      cmd_1.ReceiveResult = ReceiveResult;
      class ReceiveSubcribe extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.dateX2 = "";
          this.remain = 0;
          this.currentMoney = 0;
          this.freeSpin = 0;
          this.freeLine = "";
          this.items = "";
          this.awards = "";
          this.linesConfig = "";
          this.dateX2 = this.getString();
          this.remain = this.getByte();
          this.currentMoney = this.getLong();
          this.freeSpin = this.getByte();
          this.freeLine = this.getString();
          this.items = this.getString();
          this.awards = this.getString();
          this.linesConfig = this.getString();
        }
      }
      cmd_1.ReceiveSubcribe = ReceiveSubcribe;
      class ReceiveInfo extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.rooms = "";
          this.rooms = this.getString();
        }
      }
      cmd_1.ReceiveInfo = ReceiveInfo;
      class ReceiveMiniGameId extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.results = "";
          this.results = this.getString();
        }
      }
      cmd_1.ReceiveMiniGameId = ReceiveMiniGameId;
    })(cmd = exports.cmd || (exports.cmd = {}));
    exports.default = cmd;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/Constants": void 0,
    "../../Main/Game/src/networks/Network.InPacket": void 0,
    "../../Main/Game/src/networks/Network.OutPacket": void 0
  } ],
  "SlotCayKhe.ControllerOffline": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9aaffa28s9M0oi41MjRJoxq", "SlotCayKhe.ControllerOffline");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var SlotCayKheControllerOffline_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.SlotCayKheControllerOffline = void 0;
    const {ccclass: ccclass, property: property} = cc._decorator;
    var ITEM = [ {
      value: "WILD",
      id: "0",
      itemType: "WILD",
      name: "Wild",
      replaceableItems: "[WILD]",
      special: "true",
      wild: "true"
    }, {
      value: "SCATTER",
      id: "1",
      itemType: "SCATTER",
      name: "Scatter",
      replaceableItems: "[WILD]",
      special: "true",
      wild: "false"
    }, {
      value: "JACKPOT",
      id: "2",
      itemType: "JACKPOT",
      name: "Jackpot",
      replaceableItems: "[WILD]",
      special: "true",
      wild: "false"
    }, {
      value: "NGUOI_EM",
      id: "3",
      itemType: "MULTIPLE",
      name: "NguoiEm",
      replaceableItems: "[WILD]",
      special: "false",
      wild: "false"
    }, {
      value: "VO_NGUOI_EM",
      id: "4",
      itemType: "MULTIPLE",
      name: "VoNguoiEm",
      replaceableItems: "[WILD]",
      special: "false",
      wild: "false"
    }, {
      value: "NGUOI_ANH",
      id: "5",
      itemType: "MULTIPLE",
      name: "NguoiAnh",
      replaceableItems: "[WILD]",
      special: "false",
      wild: "false"
    }, {
      value: "VO_NGUOI_ANH",
      id: "6",
      itemType: "MULTIPLE",
      name: "VoNguoiAnh",
      replaceableItems: "[WILD]",
      special: "false",
      wild: "false"
    }, {
      value: "CAY_KHE",
      id: "7",
      itemType: "MULTIPLE",
      name: "CayKhe",
      replaceableItems: "[WILD]",
      special: "false",
      wild: "false"
    }, {
      value: "TUI_VANG",
      id: "8",
      itemType: "MULTIPLE",
      name: "TuiVang",
      replaceableItems: "[WILD]",
      special: "false",
      wild: "false"
    }, {
      value: "MANH_DAT",
      id: "9",
      itemType: "MULTIPLE",
      name: "ManhDat",
      replaceableItems: "[WILD]",
      special: "false",
      wild: "false"
    }, {
      value: "NHA_TRANH",
      id: "10",
      itemType: "MULTIPLE",
      name: "NhaTranh",
      replaceableItems: "[WILD]",
      special: "false",
      wild: "false"
    }, {
      value: "GIENG",
      id: "11",
      itemType: "MULTIPLE",
      name: "Gieng",
      replaceableItems: "[WILD]",
      special: "false",
      wild: "false"
    }, {
      value: "CAY_TRE",
      id: "12",
      itemType: "MULTIPLE",
      name: "CayTre",
      replaceableItems: "[WILD]",
      special: "false",
      wild: "false"
    } ];
    let SlotCayKheControllerOffline = SlotCayKheControllerOffline_1 = class SlotCayKheControllerOffline {
      constructor() {
        this.freeSpinLeft = 0;
        this.miniGame = -1;
      }
      static getSubcribe() {}
      static getLines() {
        if (SlotCayKheControllerOffline_1.lines.length <= 0) for (let index = 1; index <= 25; index++) SlotCayKheControllerOffline_1.lines.push({
          index: index,
          lineName: "line" + index,
          cells: [ 0, 0, 0, 0, 0 ].map(cell => Math.floor(3 * Math.random()))
        });
        return SlotCayKheControllerOffline_1.lines;
      }
      static getIcons() {
        if (SlotCayKheControllerOffline_1.icons.length <= 0) {
          let name = "";
          SlotCayKheControllerOffline_1.getGuid().forEach((icon, index) => {
            switch (index) {
             case 0:
              name = "WILL";
              break;

             case 1:
              name = "FREE";
              break;

             case 2:
              name = "BONUS";
              break;

             case 3:
             case 4:
             case 5:
             case 6:
             case 7:
             case 8:
             case 9:
             case 10:
             case 11:
             case 12:
              name = "ITEM" + (index - 2);
              break;

             default:
              name = "ERROR";
            }
            SlotCayKheControllerOffline_1.icons.push({
              name: name,
              index: index,
              duplicate: icon.filter(data => data.duplicate > 0).map(data => ({
                duplicate: data.duplicate,
                award: data.award,
                typeAward: data.typeAward
              }))
            });
          });
        }
        return SlotCayKheControllerOffline_1.icons;
      }
      static getResultSpin() {
        let randomIcons = [];
        let icons = SlotCayKheControllerOffline_1.getIcons();
        for (let i = 0; i < 5; i++) {
          let col = [];
          for (let j = 0; j < 3; j++) col.push(-1);
          randomIcons.push(col);
        }
        let rateWin = {
          jackpot: .2,
          mini_game: 1,
          bonus: .2,
          win: .3,
          lose: .1
        };
        let typeWin = "";
        Math.random() < rateWin.jackpot ? typeWin = "jackpot" : Math.random() < rateWin.mini_game ? typeWin = "mini_game" : Math.random() < rateWin.bonus ? typeWin = "bonus" : Math.random() < rateWin.win && (typeWin = "win");
        let item_normal_id = ITEM.filter(item => "false" == item.special).map(item => item.id);
        let item_scatter_id = ITEM.find(item => "SCATTER" == item.itemType).id;
        let item_jackpot_id = ITEM.find(item => "JACKPOT" == item.itemType).id;
        let item_wild_id = ITEM.find(item => "WILD" == item.itemType).id;
        let items_id = item_normal_id.slice();
        switch (typeWin) {
         case "jackpot":
          {
            let jackpot = [ 1, 1, 1, 1, 1 ].map(cell => parseInt(item_jackpot_id));
            let random = {
              1: [ -1, -1, -1 ].map(cell => items_id[Math.floor(Math.random() * items_id.length)]),
              0: [ -1, -1, -1 ].map(cell => items_id[Math.floor(Math.random() * items_id.length)])
            };
            cc.log("jackpot ", jackpot);
            cc.log("random ", random);
            for (let i = 0; i < 5; i++) for (let j = 0; j < 3; j++) {
              cc.log("randomIcons[" + i + "][" + j + "]");
              if (-1 != jackpot[i]) if (j < 2) if (Math.random() > .6) {
                randomIcons[i][j] = jackpot[i];
                jackpot[i] = -1;
                cc.log(randomIcons[i][j]);
              } else {
                let id = -1;
                if (i < 2) id = random[i][j]; else if (2 == i) {
                  let items_random = items_id.filter(item => -1 == random[0].indexOf(item) || -1 == random[1].indexOf(item));
                  id = items_random[Math.floor(Math.random() * items_random.length)];
                } else id = items_id[Math.floor(Math.random() * items_id.length)];
                cc.log("id");
                randomIcons[i][j] = id;
                cc.log(randomIcons[i][j]);
              } else {
                randomIcons[i][j] = jackpot[i];
                jackpot[i] = -1;
                cc.log(randomIcons[i][j]);
              } else {
                let id = -1;
                if (i < 2) id = random[i][j]; else if (2 == i) {
                  let items_random = items_id.filter(item => -1 == random[0].indexOf(item) || -1 == random[1].indexOf(item));
                  id = items_random[Math.floor(Math.random() * items_random.length)];
                } else id = items_id[Math.floor(Math.random() * items_id.length)];
                randomIcons[i][j] = id;
                cc.log(randomIcons[i][j]);
              }
            }
          }
          break;

         case "mini_game":
          {
            let mini_game = [ 0, 1, 1, 1, 0 ].map(cell => 0 == cell ? items_id[Math.floor(Math.random() * items_id.length)] : parseInt(item_scatter_id));
            let random = {
              1: [ -1, -1, -1 ].map(cell => items_id[Math.floor(Math.random() * items_id.length)]),
              0: [ -1, -1, -1 ].map(cell => items_id[Math.floor(Math.random() * items_id.length)])
            };
            cc.log("mini_game ", mini_game);
            cc.log("random ", random);
            for (let i = 0; i < 5; i++) for (let j = 0; j < 3; j++) {
              cc.log("randomIcons[" + i + "][" + j + "]");
              if (-1 != mini_game[i]) if (j < 2) if (Math.random() > .6) {
                randomIcons[i][j] = mini_game[i];
                mini_game[i] = -1;
                cc.log(randomIcons[i][j]);
              } else {
                let id = -1;
                if (i < 2) id = random[i][j]; else if (2 == i) {
                  let items_random = items_id.filter(item => -1 == random[0].indexOf(item) || -1 == random[1].indexOf(item));
                  id = items_random[Math.floor(Math.random() * items_random.length)];
                } else id = items_id[Math.floor(Math.random() * items_id.length)];
                cc.log("id");
                randomIcons[i][j] = id;
                cc.log(randomIcons[i][j]);
              } else {
                randomIcons[i][j] = mini_game[i];
                mini_game[i] = -1;
                cc.log(randomIcons[i][j]);
              } else {
                let id = -1;
                if (i < 2) id = random[i][j]; else if (2 == i) {
                  let items_random = items_id.filter(item => -1 == random[0].indexOf(item) || -1 == random[1].indexOf(item));
                  id = items_random[Math.floor(Math.random() * items_random.length)];
                } else id = items_id[Math.floor(Math.random() * items_id.length)];
                randomIcons[i][j] = id;
                cc.log(randomIcons[i][j]);
              }
            }
          }
        }
        let award = [];
        return randomIcons.map(a => a.map(b => b).join(",")).join("\n");
      }
      static getGuid() {
        return [ [ {
          duplicate: 0,
          award: 0,
          typeAward: "",
          text: "ch\u1ec9 xu\u1ea5t hi\u1ec7n \u1edf\nlu\u1ed3ng quay 2 khi \nxu\u1ea5t hi\u1ec7n s\u1ebd bao \nph\u1ee7 to\xe0n b\u1ed9 v\u1ecb \ntr\xed lu\u1ed3ng quay 2"
        } ], [ {
          duplicate: 3,
          award: 5,
          typeAward: "luot",
          text: "t\u0103ng 5 l\u01b0\u1ee3t"
        }, {
          duplicate: 4,
          award: 6,
          typeAward: "luot",
          text: "t\u0103ng 6 l\u01b0\u1ee3t"
        }, {
          duplicate: 5,
          award: 7,
          typeAward: "luot",
          text: "t\u0103ng 7 l\u01b0\u1ee3t"
        } ], [ {
          duplicate: 3,
          award: 2,
          typeAward: "bonus",
          text: "BONUS X2"
        }, {
          duplicate: 4,
          award: 5,
          typeAward: "bonus",
          text: "BONUS X5"
        }, {
          duplicate: 5,
          award: 8e3,
          typeAward: "x",
          text: "X8000"
        } ], [ {
          duplicate: 2,
          award: 2,
          typeAward: "x",
          text: "X2"
        }, {
          duplicate: 3,
          award: 40,
          typeAward: "x",
          text: "X40"
        }, {
          duplicate: 4,
          award: 200,
          typeAward: "x",
          text: "X200"
        }, {
          duplicate: 5,
          award: 1e3,
          typeAward: "x",
          text: "X1000"
        } ], [ {
          duplicate: 3,
          award: 4,
          typeAward: "x",
          text: "X4"
        }, {
          duplicate: 4,
          award: 20,
          typeAward: "x",
          text: "X20"
        }, {
          duplicate: 5,
          award: 500,
          typeAward: "x",
          text: "X500"
        } ], [ {
          duplicate: 3,
          award: 3,
          typeAward: "x",
          text: "X3"
        }, {
          duplicate: 4,
          award: 15,
          typeAward: "x",
          text: "X15"
        }, {
          duplicate: 5,
          award: 200,
          typeAward: "x",
          text: "X200"
        } ], [ {
          duplicate: 3,
          award: 2,
          typeAward: "x",
          text: "X2"
        }, {
          duplicate: 4,
          award: 10,
          typeAward: "x",
          text: "X10"
        }, {
          duplicate: 5,
          award: 75,
          typeAward: "x",
          text: "X75"
        } ], [ {
          duplicate: 4,
          award: 6,
          typeAward: "x",
          text: "X6"
        }, {
          duplicate: 5,
          award: 30,
          typeAward: "x",
          text: "X30"
        } ], [ {
          duplicate: 4,
          award: 6,
          typeAward: "x",
          text: "X6"
        }, {
          duplicate: 5,
          award: 30,
          typeAward: "x",
          text: "X30"
        } ], [ {
          duplicate: 4,
          award: 6,
          typeAward: "x",
          text: "X6"
        }, {
          duplicate: 5,
          award: 60,
          typeAward: "x",
          text: "60"
        } ], [ {
          duplicate: 4,
          award: 6,
          typeAward: "x",
          text: "X6"
        }, {
          duplicate: 5,
          award: 30,
          typeAward: "x",
          text: "X30"
        } ], [ {
          duplicate: 4,
          award: 6,
          typeAward: "x",
          text: "X6"
        }, {
          duplicate: 5,
          award: 30,
          typeAward: "x",
          text: "X30"
        } ], [ {
          duplicate: 4,
          award: 6,
          typeAward: "x",
          text: "X6"
        }, {
          duplicate: 5,
          award: 60,
          typeAward: "x",
          text: "60"
        } ] ];
      }
    };
    SlotCayKheControllerOffline.lines = [];
    SlotCayKheControllerOffline.icons = [];
    SlotCayKheControllerOffline = SlotCayKheControllerOffline_1 = __decorate([ ccclass ], SlotCayKheControllerOffline);
    exports.SlotCayKheControllerOffline = SlotCayKheControllerOffline;
    exports.default = SlotCayKheControllerOffline;
    cc._RF.pop();
  }, {} ],
  "SlotCayKhe.Controller": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0b9e12l6V5M66fWZpkJdLim", "SlotCayKhe.Controller");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var SlotCayKheController_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.SlotCayKheController = exports.SpinMode = void 0;
    const SlotCayKhe_Cmd_1 = require("./SlotCayKhe.Cmd");
    const Tween_1 = require("../../Main/Game/src/common/Tween");
    const Network_InPacket_1 = require("../../Main/Game/src/networks/Network.InPacket");
    const SlotNetworkClient_1 = require("../../Main/Game/src/networks/SlotNetworkClient");
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const SlotCayKhe_PopupHistory_1 = require("./SlotCayKhe.PopupHistory");
    const SlotCayKhe_PopupJackpotHistory_1 = require("./SlotCayKhe.PopupJackpotHistory");
    const BroadcastReceiver_1 = require("../../Main/Game/src/common/BroadcastReceiver");
    const App_1 = require("../../Main/Game/src/common/App");
    const SlotCayKhe_PopupGuide_1 = require("./SlotCayKhe.PopupGuide");
    const SlotCayKhe_PopupJackpotGame_1 = require("./SlotCayKhe.PopupJackpotGame");
    const SlotCayKhe_SoundControler_1 = require("./SlotCayKhe.SoundControler");
    const Network_Cmd_1 = require("../../Main/Game/src/networks/Network.Cmd");
    const ErrorLogger_1 = require("../../Main/Game/src/common/ErrorLogger");
    const Dialog_1 = require("../../Main/Game/src/common/Dialog");
    var SpinMode;
    (function(SpinMode) {
      SpinMode[SpinMode["NORMAL"] = 0] = "NORMAL";
      SpinMode[SpinMode["AUTO"] = 1] = "AUTO";
      SpinMode[SpinMode["AUTO_X2"] = 2] = "AUTO_X2";
    })(SpinMode = exports.SpinMode || (exports.SpinMode = {}));
    const {ccclass: ccclass, property: property} = cc._decorator;
    var TIME_ANIM = {};
    let SlotCayKheController = SlotCayKheController_1 = class SlotCayKheController extends cc.Component {
      constructor() {
        super(...arguments);
        this.itemPrefab = null;
        this.animPrefab = null;
        this.lbMajor = null;
        this.lbMaxi = null;
        this.lbMini = null;
        this.lbMinior = null;
        this.lbFree = null;
        this.lbWin = null;
        this.animIcon = [];
        this.sprIcon = [];
        this.sprBlur = [];
        this.parentItems = null;
        this.parentAnim = null;
        this.nodeSetting = null;
        this.sprSpeed = null;
        this.sprSpin = null;
        this.sprBtnSpin = [];
        this.sprMultiWild = [];
        this.spinMode = SpinMode.NORMAL;
        this.lblCoin = null;
        this.startSpinTime = 0;
        this.receivedSubcribe = null;
        this.betIdx = 0;
        this.dataJackpot = {
          jackpots: {
            object: [ 0, 0, 0, 0 ]
          }
        };
        this.popupParent = null;
        this.popupShow = null;
        this.popupGuide = null;
        this.popupHistory = null;
        this.popupJackpotHistory = null;
        this.popupJackpotGame = null;
        this.soundControler = null;
        this.canChangeBet = false;
        this.canUpdatePots = true;
        this.listBet = [];
        this.itemBet = null;
        this.pageBet = null;
        this.isSpinning = false;
        this.resultFreeSpin = {
          object: [],
          number: 0,
          coinWin: 0,
          isSpin: true
        };
        this.nodeAnimWin = null;
        this.animWin = null;
        this.animCoin = null;
        this.lbCoin = null;
        this.coinWin = 0;
        this.scrBigWin = null;
        this.lbBigWin = null;
        this.scrSelectGame = null;
        this.animSelectGame = [];
        this.buttonsSelectGame = [];
        this.lbSelectGame = null;
        this.may = null;
        this.jackpot = null;
        this.popup = null;
      }
      start() {
        this.hidePopup();
        this.soundControler.initMusicAndSound();
        this.soundControler.setSoundForButtons();
        BroadcastReceiver_1.default.register(BroadcastReceiver_1.default.USER_DISCONNECTED, data => {
          SlotNetworkClient_1.default.getInstance().close();
        }, this);
        BroadcastReceiver_1.default.register("HIDE_POPUP_SLOT_CAY_KHE", data => {
          this.hidePopup();
        }, this);
        BroadcastReceiver_1.default.register("SHOW_POPUP_SLOT_CAY_KHE", data => {
          this.showPopup();
        }, this);
        SlotNetworkClient_1.default.getInstance().addOnClose(() => {
          this.canChangeBet = true;
          this.backToLobby();
        }, this);
        this.lblCoin.string = Utils_1.default.formatMoney(Configs_1.default.Login.Coin);
        BroadcastReceiver_1.default.register(BroadcastReceiver_1.default.USER_UPDATE_COIN, (coin = 0) => {
          this.lblCoin.string != Utils_1.default.formatMoney(Configs_1.default.Login.Coin) && cc.tween(this.lblCoin.node).repeat(3, cc.sequence(cc.tintTo(.2, 255, 1, 1), cc.tintTo(.2, 1, 234, 255))).start();
          this.lblCoin.string = Utils_1.default.formatMoney(Configs_1.default.Login.Coin);
          this.lblCoin.getComponentInChildren(cc.Label).string = (coin >= 0 ? "+" : "") + Utils_1.default.formatNumber(coin);
          cc.Tween.stopAllByTarget(this.lblCoin.getComponentInChildren(cc.Label).node);
          this.lblCoin.getComponentInChildren(cc.Label).node.color = coin >= 0 ? cc.Color.BLACK.fromHEX("#01EAFF") : cc.Color.BLACK.fromHEX("#FF0000");
          cc.tween(this.lblCoin.getComponentInChildren(cc.Label).node).set({
            opacity: 0,
            y: 25
          }).to(.2, {
            opacity: 255
          }).to(.5, {
            y: 50
          }).to(.2, {
            opacity: 0
          }).start();
        }, this);
        this.lbMajor.string = "0";
        this.lbMaxi.string = "0";
        this.lbMini.string = "0";
        this.lbMinior.string = "0";
        this.lblCoin.getComponentInChildren(cc.Label).string = "";
        this.nodeAnimWin.active = false;
        this.lbWin.node.parent.scale = 0;
        SlotNetworkClient_1.default.getInstance().addListener(data => {
          let inpacket = new Network_InPacket_1.default(data);
          switch (inpacket.getCmdId()) {
           case SlotCayKhe_Cmd_1.default.Code.GET_INFO:
            {
              let res = new SlotCayKhe_Cmd_1.default.ReceiveInfo(data);
              this.initBet(res);
            }
            break;

           case SlotCayKhe_Cmd_1.default.Code.UPDATE_POT:
            {
              let res = new SlotCayKhe_Cmd_1.default.ReceiveUpdatePot(data);
              cc.log("UPDATE_POT", this.canUpdatePots, res);
              if (this.canUpdatePots && this.dataJackpot.jackpots.object[0] <= res.jackpots.object[0] && this.dataJackpot.jackpots.object[1] <= res.jackpots.object[1] && this.dataJackpot.jackpots.object[2] <= res.jackpots.object[2] && this.dataJackpot.jackpots.object[3] <= res.jackpots.object[3]) try {
                this.dataJackpot = res;
                Tween_1.default.numberTo(this.lbMini, res.jackpots.object[0], .3);
                Tween_1.default.numberTo(this.lbMinior, res.jackpots.object[1], .3);
                Tween_1.default.numberTo(this.lbMajor, res.jackpots.object[2], .3);
                Tween_1.default.numberTo(this.lbMaxi, res.jackpots.object[3], .3);
              } catch (error) {}
            }
            break;

           case Network_Cmd_1.default.Code.NOTIFY_DISCONNECT:
            {
              let res = new Network_Cmd_1.default.ReceivedNotifyDisconnect(data);
              this.canChangeBet = true;
              this.backToLobby();
              ErrorLogger_1.ErrorLogger.sendLogError("User disconnected", "Cay Khe", "reason: " + res.reason);
            }
            break;

           case SlotCayKhe_Cmd_1.default.Code.SUBCRIBE:
            {
              let res = new SlotCayKhe_Cmd_1.default.ReceiveSubcribe(data);
              App_1.default.instance.showLoading(false);
              this.receivedSubcribe = res;
              cc.log(res);
              this.init(res);
              this.dataJackpot = {
                jackpots: {
                  object: [ 0, 0, 0, 0 ]
                }
              };
            }
            break;

           case SlotCayKhe_Cmd_1.default.Code.UPDATE_RESULT:
            {
              let resultSpinTime = new Date().getTime();
              let deltaTime = resultSpinTime - this.startSpinTime;
              deltaTime > 2e3 && ErrorLogger_1.ErrorLogger.sendLogError("Slow Response", Configs_1.default.App.BUNDLE_NAME.CAYKHE, deltaTime + "ms");
              let res = new SlotCayKhe_Cmd_1.default.ReceiveResult(data);
              this.canUpdatePots = !(3 == res.result);
              cc.log("UPDATE_RESULT", res);
              this.onSpinResult(res);
            }
            break;

           case SlotCayKhe_Cmd_1.default.Code.FREE_GAME:
            {
              let res = new SlotCayKhe_Cmd_1.default.ReceiveMiniGameId(data);
              cc.log(res);
              this.resultFreeSpin.object = JSON.parse(res.results).object;
              let freeNumber = this.resultFreeSpin.number;
              if (!this.resultFreeSpin.isSpin) {
                this.resultFreeSpin.coinWin = 0;
                this.resultFreeSpin.object.forEach(element => {
                  this.resultFreeSpin.coinWin += element.price;
                });
                this.resultFreeSpin.isSpin = true;
                this.onSpinResult(this.resultFreeSpin.object.shift(), freeNumber - 1);
              }
            }
          }
        }, this);
        SlotNetworkClient_1.default.getInstance().send(new SlotCayKhe_Cmd_1.default.sendInfo());
      }
      initBet(res) {
        if (!JSON.parse(res.rooms) || !JSON.parse(res.rooms).object) return ErrorLogger_1.ErrorLogger.sendLogError("Game config error", "Slot CAY_KHE", "data " + JSON.stringify(res));
        this.listBet = JSON.parse(res.rooms).object;
        let suggestBet = 0;
        this.listBet.forEach(vl => {
          let item = cc.instantiate(this.itemBet);
          item.active = true;
          item.name = JSON.stringify(vl);
          item.getComponentInChildren(cc.Label).string = Utils_1.default.formatMoney(vl.betValue);
          Configs_1.default.Login.Coin > 100 * vl.betValue && (suggestBet = vl.roomId);
          this.pageBet.addPage(item);
        });
        this.canChangeBet = true;
        this.pageBet.scrollToPage(suggestBet, .2);
        SlotNetworkClient_1.default.getInstance().send(new SlotCayKhe_Cmd_1.default.SendSubcribe(suggestBet));
      }
      evtChangeBet(evt = null) {
        if (null == evt) return;
        let data = JSON.parse(this.pageBet.getPages()[this.pageBet.getCurrentPageIndex()].name);
        SlotNetworkClient_1.default.getInstance().send(new SlotCayKhe_Cmd_1.default.SendChangeRoom(this.oldRoom, data.roomId));
        this.oldRoom = data.roomId;
        this.sendPingWaiting(1);
      }
      changeBet(evt, data) {
        if (!this.canChangeBet) return;
        let pageIndex = this.pageBet.getCurrentPageIndex();
        switch (data) {
         case "+":
          this.pageBet.scrollToPage((pageIndex + 1) % this.listBet.length, .2);
          break;

         case "-":
          0 == pageIndex && (pageIndex = this.listBet.length);
          this.pageBet.scrollToPage((pageIndex - 1) % this.listBet.length, .2);
          break;

         default:
          this.pageBet.scrollToPage((pageIndex + 1) % this.listBet.length, .2);
        }
      }
      init(res) {
        this.lbFree.node.parent.active = res.freeSpin > 0;
        this.lbFree.string = res.freeSpin;
        SlotCayKheController_1.infoItems = JSON.parse(res.items).object;
        SlotCayKheController_1.infoAwards = JSON.parse(res.awards).object;
        this.setStateBtnSpin(true);
        this.setupBtnSpin();
        let arr = [];
        for (let idItem = 0; idItem < 3; idItem++) for (let index = 0; index < 5; index++) arr.push(index % 4 != 0 ? Math.floor(Math.random() * this.sprIcon.length) : Math.floor(Math.random() * (this.sprIcon.length - 3)) + 3);
        this.initItem(arr);
        this.nodeSetting.getChildByName("Background").active = true;
        this.nodeSetting.getChildByName("setting").scale = 0;
      }
      sendPing() {
        SlotNetworkClient_1.default.getInstance().send(new SlotCayKhe_Cmd_1.default.SendPing());
      }
      sendPingWaiting(time = 1 / 60) {
        if (time <= 0) return;
        this.schedule(() => {
          this.sendPing();
        }, 10, 60 * time / 10, 10);
      }
      initItem(array = []) {
        for (let index = 0; index < 5; index++) for (let idItem = 0; idItem < 5; idItem++) {
          let item = this.parentItems.getChildByName(JSON.stringify({
            col: index,
            row: idItem
          }));
          if (!item) {
            item = cc.instantiate(this.itemPrefab);
            item.name = JSON.stringify({
              col: index,
              row: idItem
            });
            this.parentItems.addChild(item);
          }
          item.active = false;
          item.getChildByName("img").getComponent(cc.Sprite).spriteFrame = this.sprIcon[array.length > 5 * idItem + index ? array[5 * idItem + index] : Math.floor(Math.random() * this.sprIcon.length)];
          item.position = cc.v3(670 * (index + .5) / 5, 450 * (idItem + .5) / 3 + 15);
        }
        this.initAnim(array, true);
      }
      initAnim(array = [], showAnim = false) {
        this.parentAnim.removeAllChildren();
        for (let index = 0; index < 5; index++) for (let idItem = 0; idItem < 3; idItem++) {
          let item = this.parentAnim.getChildByName(JSON.stringify({
            col: index,
            row: idItem
          }));
          if (!item) {
            item = cc.instantiate(this.animPrefab);
            item.name = JSON.stringify({
              col: index,
              row: idItem
            });
            this.parentAnim.addChild(item);
          }
          let idAnim = array.length > 5 * idItem + index ? array[5 * idItem + index] : Math.min(12, 3 * index + idItem);
          item.getChildByName("anim").getComponent(sp.Skeleton).skeletonData = this.animIcon[idAnim];
          item.active = showAnim;
          TIME_ANIM["idAnim"] = this.animIcon[idAnim].getRuntimeData();
          item.getChildByName("anim").getComponent(sp.Skeleton).setAnimation(0, "normal", true);
          item.getComponent(sp.Skeleton).enabled = false;
          item.getComponentInChildren(cc.Sprite).spriteFrame = null;
          item.position = cc.v3(670 * (index + .5) / 5, 450 * (idItem + .5) / 3 + 15);
        }
      }
      backToLobby() {
        if (!this.canChangeBet) return;
        SlotNetworkClient_1.default.getInstance().send(new SlotCayKhe_Cmd_1.default.SendUnSubcribe(this.betIdx));
        cc.audioEngine.stopAll();
        cc.director.loadScene("Lobby", () => {
          let bundleCayKhe = cc.assetManager.getBundle(Configs_1.default.App.BUNDLE_NAME.CAYKHE);
          bundleCayKhe.releaseAll();
          cc.assetManager.removeBundle(bundleCayKhe);
        });
      }
      showPopupGuide() {
        if (!SlotCayKheController_1.infoItems || !SlotCayKheController_1.infoAwards) return;
        let popup = this.popupParent.getComponentInChildren(SlotCayKhe_PopupGuide_1.default);
        if (!popup) {
          popup = cc.instantiate(this.popupGuide).getComponent(SlotCayKhe_PopupGuide_1.default);
          this.popupParent.addChild(popup.node);
          let data = {
            info: [],
            infoBet: this.listBet,
            infoRoom: this.listBet
          };
          let text = "";
          let guide = SlotCayKheController_1.infoItems.map(itemItem => {
            SlotCayKheController_1.infoAwards.push({
              awardType: "WILD",
              duplicate: "3",
              freeSpin: "false",
              item: "WILD",
              jackpot: "false",
              minigame: "false",
              ratio: "-3",
              value: "WILD"
            });
            return SlotCayKheController_1.infoAwards.filter(itemAward => itemItem.value == itemAward.item).map(itemAward => {
              switch (itemItem.value) {
               case "WILD":
                itemAward.duplicate = 0;
                text = "Bi\u1ec3u t\u01b0\u1ee3ng Wild\n thay th\u1ebf cho c\xe1c\nbi\u1ec3u t\u01b0\u1ee3ng kh\xe1c\ntr\u1eeb Scatter v\xe0\nBonus";
                break;

               case "SCATTER":
                itemAward.duplicate = 0;
                text = "Ch\u1ecdn 1 trong 3 \nki\u1ec3u quay mi\u1ec5n ph\xed";
                break;

               case "BONUS":
                itemAward.duplicate = 0;
                text = "Ch\u1ecdn 12 bi\u1ec3u\nt\u01b0\u1ee3ng Jackpot";
                break;

               case "NGUOI_EM":
               case "VO_NGUOI_EM":
               case "NGUOI_ANH":
               case "VO_NGUOI_ANH":
               case "CAY_KHE":
               case "TUI_VANG":
               case "MANH_DAT":
               case "NHA_TRANH":
               case "GIENG":
               case "CAY_TRE":
                text = "X" + itemAward.ratio;
              }
              return {
                item: itemItem,
                award: itemAward,
                text: text
              };
            });
          });
          guide.forEach((content, index) => {
            data.info[index] = {
              indexSpr: index,
              guide: content
            };
          });
          popup.init(data, this.sprIcon);
        }
        this.popupParent.getComponentsInChildren(Dialog_1.default).forEach(dialog => {
          dialog.dismiss();
        });
        popup.show();
      }
      clickSetting(fixState = true) {
        this.sendPing();
        if (!fixState) {
          cc.tween(this.nodeSetting.getChildByName("setting")).call(() => {
            this.nodeSetting.getChildByName("Background").active = true;
          }).to(.2, {
            scale: 0
          }).start();
          return;
        }
        let state = this.nodeSetting.getChildByName("Background").active;
        this.nodeSetting.getChildByName("setting").scale = state ? 0 : 1;
        cc.tween(this.nodeSetting.getChildByName("setting")).call(() => {
          this.nodeSetting.getChildByName("Background").active = !state;
        }).to(.2, {
          scale: state ? 1 : 0
        }).start();
      }
      setStateBtnSpin(canSpin) {
        this.sprSpeed.spriteFrame = this.sprBtnSpin[this.spinMode == SpinMode.AUTO_X2 ? 5 : 4];
        switch (this.spinMode) {
         case SpinMode.AUTO:
          this.sprSpin.getComponent(cc.Sprite).spriteFrame = this.sprBtnSpin[2];
          break;

         case SpinMode.AUTO_X2:
          this.sprSpin.getComponent(cc.Sprite).spriteFrame = this.sprBtnSpin[3];
          break;

         default:
          this.sprSpin.getComponent(cc.Sprite).spriteFrame = this.sprBtnSpin[canSpin ? 0 : 1];
        }
      }
      update(dt) {
        if (this.isHoldSpin && this.spinMode == SpinMode.NORMAL) {
          this.timeHoldSpin += dt;
          if (this.timeHoldSpin >= 1) {
            this.spinMode = SpinMode.AUTO;
            this.effSpin();
            this.isHoldSpin = false;
            this.timeHoldSpin = 0;
          }
        }
      }
      setupBtnSpin() {
        this.sprSpin.parent.on("touchstart", touch => {
          this.timeHoldSpin = 0;
          this.isHoldSpin = true;
        });
        this.sprSpin.parent.on("touchend", touch => {
          if (this.isHoldSpin) {
            this.isHoldSpin = false;
            if (this.timeHoldSpin < 1) if (this.spinMode == SpinMode.NORMAL) this.effSpin(); else {
              this.spinMode = SpinMode.NORMAL;
              this.setStateBtnSpin(false);
            }
            this.timeHoldSpin = 0;
          }
        });
      }
      actionSpeed() {
        this.spinMode = SpinMode.AUTO_X2;
        this.effSpin();
      }
      effSpin() {
        if (this.isSpinning) return;
        SlotNetworkClient_1.default.getInstance().send(new SlotCayKhe_Cmd_1.default.SendPlay());
        let data = JSON.parse(this.pageBet.getPages()[this.pageBet.getCurrentPageIndex()].name);
        Configs_1.default.Login.Coin -= data.betValue;
        BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN, -data.betValue);
        this.resetItems();
        this.startSpinTime = new Date().getTime();
        this.setStateBtnSpin(false);
        this.isSpinning = true;
        this.canChangeBet = false;
      }
      resetItems() {
        cc.warn("resetItems");
        cc.Tween.stopAllByTarget(this.parentItems);
        this.parentItems.children.forEach((children, index) => {
          children.stopAllActions();
          cc.Tween.stopAllByTarget(children);
          children.active = true;
        });
        this.parentAnim.children.forEach((children, index) => {
          children.stopAllActions();
          cc.Tween.stopAllByTarget(children);
          children.active = false;
        });
      }
      showAnimWaiting() {
        cc.warn("showAnimWaiting");
        this.parentItems.children.forEach((children, index) => {
          children.stopAllActions();
          cc.Tween.stopAllByTarget(children);
          children.active = false;
        });
        this.parentAnim.children.forEach((children, index) => {
          children.stopAllActions();
          cc.Tween.stopAllByTarget(children);
          children.active = true;
          children.getComponentInChildren(cc.Sprite).spriteFrame = null;
          children.getComponent(sp.Skeleton).enabled = false;
          children.getChildByName("anim").getComponent(sp.Skeleton).setAnimation(0, "normal", true);
        });
      }
      onSpinResult(result, freeNumber = -1) {
        var _a, _b, _c;
        if (result.result > 10 || result.result < 0) {
          this.canChangeBet = true;
          this.isSpinning = false;
          switch (result.result) {
           case 102:
            App_1.default.instance.actiontDialog.showMsgWithActions("S\u1ed1 d\u01b0 kh\xf4ng \u0111\u1ee7, vui l\xf2ng n\u1ea1p th\xeam.", result.listSuggestionActions);
            return;

           default:
            null === (_a = App_1.default.instance) || void 0 === _a ? void 0 : _a.showErrLoading("C\xf3 l\u1ed7i x\u1ea3y ra, vui l\xf2ng th\u1eed l\u1ea1i.");
            return;
          }
        }
        if (freeNumber <= 0) {
          this.lbFree.node.parent.active = result.freeSpin > 0;
          this.lbFree.string = result.freeSpin + "";
        } else {
          this.lbFree.node.parent.active = freeNumber > 0;
          this.lbFree.string = freeNumber + "";
        }
        let speedRoll = this.spinMode == SpinMode.AUTO_X2 || freeNumber >= 0 ? .15 : .3;
        let matrixOneDimensional = null === (_b = result.matrix) || void 0 === _b ? void 0 : _b.split(",");
        this.initAnim(matrixOneDimensional);
        if (!matrixOneDimensional) {
          null === (_c = App_1.default.instance) || void 0 === _c ? void 0 : _c.showErrLoading("\u0110\xe3 x\u1ea3y ra l\u1ed7i...");
          return;
        }
        this.soundControler.playSounWithID(7, 4.5 * speedRoll);
        let icons = [ matrixOneDimensional.slice(0, 5), matrixOneDimensional.slice(5, 10), matrixOneDimensional.slice(10, 15) ];
        this.parentItems.children.forEach((children, index) => {
          children.stopAllActions();
          children.active = true;
          let info = JSON.parse(children.name);
          let actionRoll = [];
          actionRoll.push(cc.delayTime(.2 * speedRoll * info.col));
          actionRoll.push(cc.moveTo(.2 * speedRoll * (info.row + 1), cc.v2(children.position.x, -75)));
          for (let i = 0; i < 3; i++) {
            actionRoll.push(cc.callFunc(() => {
              children.setPosition(cc.v3(children.position.x, 690));
              children.getChildByName("img").getComponent(cc.Sprite).spriteFrame = this.sprBlur[Math.floor(Math.random() * this.sprBlur.length)];
            }));
            actionRoll.push(cc.moveTo(.2 * speedRoll * 5, cc.v2(children.position.x, -75)));
          }
          actionRoll.push(cc.callFunc(() => {
            children.setPosition(cc.v3(children.position.x, 690));
          }));
          actionRoll.push(cc.moveTo(.2 * speedRoll * (4 - info.row), cc.v2(children.position.x, 450 * (info.row + .5) / 3 + 15)));
          actionRoll.push(cc.callFunc(() => {
            let info = JSON.parse(children.name);
            let id = info.row < 3 ? icons[info.row][info.col] : Math.floor(Math.random() * this.sprIcon.length);
            let cellResult = SlotCayKheController_1.infoItems.find(item => item.id == id);
            if (cellResult) {
              children.getChildByName("img").getComponent(cc.Sprite).spriteFrame = this.sprIcon[id];
              info.row < 3 && (this.parentAnim.getChildByName(children.name).getChildByName("anim").getComponent(sp.Skeleton).skeletonData = this.animIcon[id]);
            }
            this.showResult(result, index == this.parentItems.children.length - 1, freeNumber);
          }));
          children.runAction(cc.sequence(actionRoll));
        });
      }
      showResult(result, isShowUI, freeNumber = -1) {
        var _a, _b;
        if (isShowUI) {
          let speedRoll = this.spinMode == SpinMode.AUTO_X2 || freeNumber >= 0 ? .5 : 1;
          this.soundControler.playSounWithID(8);
          let matrixOneDimensional = null === (_a = result.matrix) || void 0 === _a ? void 0 : _a.split(",");
          if (!matrixOneDimensional) {
            null === (_b = App_1.default.instance) || void 0 === _b ? void 0 : _b.showErrLoading("\u0110\xe3 x\u1ea3y ra l\u1ed7i...");
            return;
          }
          let mapIcons = [ matrixOneDimensional.slice(0, 5), matrixOneDimensional.slice(5, 10), matrixOneDimensional.slice(10, 15) ];
          let action = [];
          if (freeNumber < 0) {
            cc.log(Utils_1.default.formatMoneyChip(result.prize));
            let curMoney = result.currentMoney - Configs_1.default.Login.Coin;
            Configs_1.default.Login.Coin = result.currentMoney;
            for (let i = 0; i < 10; i++) {
              if (1 == i) {
                if (3 == result.freeSpinOption.length) {
                  this.freeSpinOption = result.freeSpinOption;
                  action.push(cc.callFunc(() => {
                    this.showLine(mapIcons, 1);
                    this.soundControler.playSounWithID(5);
                  }));
                  action.push(cc.delayTime((this.animIcon[1].getRuntimeData().animations[0].duration + .2) * speedRoll));
                  action.push(cc.callFunc(() => {
                    this.showSelectGame();
                    this.soundControler.playSounWithID(1);
                  }));
                  break;
                }
                if (3 == result.result) {
                  action.push(cc.callFunc(() => {
                    this.showLine(mapIcons, 2);
                    this.soundControler.playSounWithID(5);
                  }));
                  action.push(cc.delayTime((this.animIcon[2].getRuntimeData().animations[0].duration + .2) * speedRoll));
                  action.push(cc.callFunc(() => {
                    let mapJackpot = [];
                    let indexStop = Math.floor(6 * Math.random() + 3);
                    for (let i = 0; i < 12; i++) mapJackpot.push(indexStop == i ? result.typeJackpot : -i);
                    for (let i = 0; i < 2; i++) {
                      let map = mapJackpot.slice(0, indexStop).filter(a => a <= 0);
                      mapJackpot[Math.abs(map[Math.floor(Math.random() * map.length)])] = result.typeJackpot;
                    }
                    let jackpots = [ 11, 12, 13, 14 ];
                    for (let i = 0; i < 3; i++) {
                      let map = mapJackpot.slice(indexStop + 1, 12).filter(a => a <= 0);
                      mapJackpot[Math.abs(map[Math.floor(Math.random() * map.length)])] = jackpots.filter(a => a != result.typeJackpot)[i];
                    }
                    for (let i = 0; i < 3; i++) for (let j = 0; j < 2; j++) {
                      let map = mapJackpot.slice().filter(a => a <= 0);
                      mapJackpot[Math.abs(map[Math.floor(Math.random() * map.length)])] = jackpots.filter(a => a != result.typeJackpot)[i];
                    }
                    this.showPopupJackpotGame(mapJackpot, result.prize);
                    this.soundControler.playSounWithID(0);
                  }));
                  break;
                }
                this.isSpinning = false;
                if (this.spinMode != SpinMode.NORMAL) {
                  action.push(cc.callFunc(() => {
                    this.showBigWin(curMoney, () => {
                      this.effSpin();
                      BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN, curMoney);
                    });
                  }));
                  break;
                }
                action.push(cc.callFunc(() => {
                  this.setStateBtnSpin(true);
                  this.showBigWin(curMoney, () => {
                    BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN, curMoney);
                  });
                  this.canChangeBet = true;
                }));
              }
              result.itemsWin.forEach((itemsWin, ind) => {
                action.push(cc.callFunc(() => {
                  this.showLine(mapIcons, itemsWin.id);
                  this.soundControler.playSounWithID(5);
                }));
                action.push(cc.delayTime((this.animIcon[itemsWin.id].getRuntimeData().animations[0].duration + .2) * speedRoll));
              });
            }
            this.spinMode == SpinMode.NORMAL && action.push(cc.callFunc(() => {
              this.showAnimWaiting();
            }));
          } else {
            this.sendPing();
            cc.log(Utils_1.default.formatMoneyChip(result.price));
            result.listWinItem.forEach((itemsWin, ind) => {
              action.push(cc.callFunc(() => {
                this.showLine(mapIcons, itemsWin.id, result.freeSpinWild);
                this.soundControler.playSounWithID(5);
              }));
              action.push(cc.delayTime((this.animIcon[itemsWin.id].getRuntimeData().animations[0].duration + .2) * speedRoll));
            });
            if (result.totalScatterInFreeSpin > 0) {
              action.push(cc.callFunc(() => {
                this.showLine(mapIcons, 1, result.freeSpinWild);
                this.soundControler.playSounWithID(5);
                this.lbFree.string = freeNumber + result.totalScatterInFreeSpin + "";
                cc.tween(this.lbFree.node).repeat(3, cc.sequence(cc.tintTo(.2, 0, 255, 0), cc.tintTo(.2, 255, 255, 255))).start();
              }));
              action.push(cc.delayTime((this.animIcon[1].getRuntimeData().animations[0].duration + .2) * speedRoll));
            }
            if (0 == freeNumber) {
              this.resultFreeSpin.isSpin = true;
              this.isSpinning = false;
              Configs_1.default.Login.Coin += this.resultFreeSpin.coinWin;
              cc.log("===>", this.resultFreeSpin.coinWin);
              this.spinMode == SpinMode.NORMAL ? action.push(cc.callFunc(() => {
                this.setStateBtnSpin(true);
                this.showBigWin(this.resultFreeSpin.coinWin, () => {
                  BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN, this.resultFreeSpin.coinWin);
                  this.resultFreeSpin = {
                    object: [],
                    number: 0,
                    coinWin: 0,
                    isSpin: true
                  };
                });
                this.showAnimWaiting();
                this.canChangeBet = true;
              })) : action.push(cc.callFunc(() => {
                this.showBigWin(this.resultFreeSpin.coinWin, () => {
                  this.effSpin();
                  BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN, this.resultFreeSpin.coinWin);
                  this.resultFreeSpin = {
                    object: [],
                    number: 0,
                    coinWin: 0,
                    isSpin: true
                  };
                });
              }));
            } else action.push(cc.callFunc(() => {
              freeNumber += result.totalScatterInFreeSpin;
              this.onSpinResult(this.resultFreeSpin.object.shift(), freeNumber - 1);
            }));
          }
          action.length >= 1 && cc.tween(this.parentItems).sequence(cc.delayTime(speedRoll), ...action).start();
        }
        return 2;
      }
      showAll(type) {
        this.canUpdatePots = true;
        this.dataJackpot = {
          jackpots: {
            object: [ 0, 0, 0, 0 ]
          }
        };
        cc.tween(this.popupParent).delay(1.5).call(() => {
          this.nodeAnimWin.active = true;
          this.animCoin.setAnimation(0, "jackpot-mario", false);
          this.animWin.setAnimation(0, type, false);
          Tween_1.default.numberTo(this.lbCoin, this.coinWin, .5);
          this.soundControler.playSounWithID(3);
        }).delay(3).call(() => {
          this.nodeAnimWin.active = false;
          this.isSpinning = false;
          if (this.spinMode == SpinMode.NORMAL) {
            this.setStateBtnSpin(true);
            BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN, this.coinWin);
            this.canChangeBet = true;
          } else {
            this.effSpin();
            BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN, this.coinWin);
          }
          this.popupParent.getComponentsInChildren(Dialog_1.default).forEach(dialog => {
            dialog.dismiss();
          });
          this.showAnimWaiting();
        }).start();
      }
      showPopupJackpotGame(dataJackpot = [], jackpotWin) {
        let popup = cc.instantiate(this.popupJackpotGame);
        popup && this.popupParent.addChild(popup);
        this.coinWin = jackpotWin;
        BroadcastReceiver_1.default.register("HIDE_JACKPOT_SLOT_CAY_KHE", data => {
          this.showAll(data);
        }, this);
        this.popupParent.getComponentsInChildren(Dialog_1.default).forEach(dialog => {
          dialog.dismiss();
        });
        popup.getComponent(SlotCayKhe_PopupJackpotGame_1.default).show();
        popup.getComponent(SlotCayKhe_PopupJackpotGame_1.default).init(dataJackpot);
        popup.active = true;
      }
      showLine(mapIcons = [], typeItemWin = -1, freeSpinWild = -1) {
        let speedRoll = this.spinMode == SpinMode.AUTO_X2 || freeSpinWild >= 0 ? .5 : 1;
        let itemWild = SlotCayKheController_1.infoItems.find(item => item.wild);
        let mapItemWin = [];
        let itemInColWin = [];
        for (let i = 0; i < 5; i++) {
          itemInColWin = [];
          for (let j = 0; j < 3; j++) 1 != typeItemWin && 2 != typeItemWin ? mapIcons[j][i] != typeItemWin && mapIcons[j][i] != itemWild.id || itemInColWin.push({
            row: j,
            col: i,
            isWild: mapIcons[j][i] == itemWild.id
          }) : mapIcons[j][i] == typeItemWin && itemInColWin.push({
            row: j,
            col: i
          });
          if (0 == itemInColWin.length && 1 != typeItemWin && 2 != typeItemWin) break;
          mapItemWin.push(itemInColWin);
        }
        let itemWin = SlotCayKheController_1.infoItems.find(item => item.id == typeItemWin) || {
          value: ""
        };
        let infoWin = {
          countWin: mapItemWin.map(col => {
            let count = 0;
            col.forEach(itemWin => {
              count += itemWin.isWild ? Math.max(freeSpinWild, 1) : 1;
            });
            return count;
          }).join(" x "),
          itemWinCoin: (SlotCayKheController_1.infoAwards.find(item => item.item == itemWin.value && item.duplicate == mapItemWin.length) || {
            ratio: -1
          }).ratio
        };
        let win = JSON.parse(this.pageBet.getPages()[this.pageBet.getCurrentPageIndex()].name).betValue / 25;
        let str = infoWin.countWin + " x " + infoWin.itemWinCoin + " x " + Utils_1.default.formatMoneyChip(win) + " = ";
        mapItemWin.forEach(col => {
          let count = 0;
          col.forEach(itemWin => {
            count += itemWin.isWild ? Math.max(freeSpinWild, 1) : 1;
          });
          count > 0 && (win *= count);
        });
        win *= infoWin.itemWinCoin;
        str += Utils_1.default.formatMoneyChip(win);
        cc.log(str);
        if (win > 0) {
          cc.Tween.stopAllByTarget(this.lbWin.node.parent);
          cc.tween(this.lbWin.node.parent).set({
            scaleX: 0,
            scaleY: 2
          }).to(.3, {
            scaleX: 2
          }, {
            easing: "quartInOut"
          }).delay(1).to(.3, {
            scaleX: 0
          }, {
            easing: "quartInOut"
          }).start();
          this.lbWin.string = str.toUpperCase();
        }
        mapItemWin.forEach((col, index) => {
          col.forEach(cell => {
            this.parentItems.getChildByName(JSON.stringify({
              col: cell.col,
              row: cell.row
            })).active = false;
            this.parentAnim.getChildByName(JSON.stringify({
              col: cell.col,
              row: cell.row
            })).active = true;
            this.parentAnim.getChildByName(JSON.stringify({
              col: cell.col,
              row: cell.row
            })).getComponentInChildren(cc.Sprite).spriteFrame = cell.isWild && freeSpinWild > 1 ? this.sprMultiWild[freeSpinWild] : null;
            this.parentAnim.getChildByName(JSON.stringify({
              col: cell.col,
              row: cell.row
            })).getComponentInChildren(sp.Skeleton).timeScale = 1 / speedRoll;
            this.parentAnim.getChildByName(JSON.stringify({
              col: cell.col,
              row: cell.row
            })).getComponent(sp.Skeleton).enabled = true;
            this.parentAnim.getChildByName(JSON.stringify({
              col: cell.col,
              row: cell.row
            })).getComponentInChildren(sp.Skeleton).setAnimation(0, "animation", false);
            cc.tween(this.parentItems.getChildByName(JSON.stringify({
              col: cell.col,
              row: cell.row
            }))).delay(2 * speedRoll).set({
              active: true
            }).start();
            cc.tween(this.parentAnim.getChildByName(JSON.stringify({
              col: cell.col,
              row: cell.row
            }))).delay(2 * speedRoll).set({
              active: false
            }).start();
          });
        });
      }
      showBigWin(money, callback = null) {
        let data = JSON.parse(this.pageBet.getPages()[this.pageBet.getCurrentPageIndex()].name);
        if (money < 1 * data.betValue) {
          null != callback && callback();
          return;
        }
        this.scrBigWin.stopAllActions();
        this.scrBigWin.active = true;
        this.lbBigWin.node.opacity = 0;
        this.scrBigWin.runAction(cc.sequence(cc.callFunc(() => {
          this.scrBigWin.getComponentInChildren(sp.Skeleton).setAnimation(0, "animation", false);
          this.lbBigWin.string = "0";
        }), cc.delayTime(.5), cc.callFunc(() => {
          this.lbBigWin.node.runAction(cc.fadeIn(.18));
          Tween_1.default.numberTo(this.lbBigWin, money, 1);
        }), cc.delayTime(3.8), cc.callFunc(() => {
          this.lbBigWin.node.runAction(cc.fadeOut(.18));
        }), cc.delayTime(.2), cc.callFunc(() => {
          this.scrBigWin.active = false;
          null != callback && callback();
        })));
      }
      showSelectGame() {
        this.sendPingWaiting(5);
        for (let index = 0; index < 3; index++) {
          this.buttonsSelectGame[index].interactable = true;
          this.animSelectGame[index].node.active = false;
        }
        this.scrSelectGame.active = true;
      }
      hideSelectGame(evt, data) {
        for (let index = 0; index < 3; index++) this.buttonsSelectGame[index].interactable = false;
        this.resultFreeSpin.number = [ 37, 20, 12 ][data];
        cc.tween(this.scrSelectGame).call(() => {
          SlotNetworkClient_1.default.getInstance().send(new SlotCayKhe_Cmd_1.default.SendMiniGameId(this.freeSpinOption[data]));
          for (let index = 0; index < 3; index++) {
            this.animSelectGame[index].node.active = index + "" == data;
            this.animSelectGame[index].node.active && this.animSelectGame[index].setAnimation(0, "animation", false);
          }
        }).delay(3).call(() => {
          this.scrSelectGame.active = false;
          let freeNumber = this.resultFreeSpin.number;
          if (this.resultFreeSpin.object.length > 0) {
            this.resultFreeSpin.coinWin = 0;
            this.resultFreeSpin.object.forEach(element => {
              this.resultFreeSpin.coinWin += element.price;
            });
            this.resultFreeSpin.isSpin = true;
            this.onSpinResult(this.resultFreeSpin.object.shift(), freeNumber - 1);
          } else this.resultFreeSpin.isSpin = false;
        }).start();
      }
      showHistory() {
        let popup = this.popupParent.getComponentInChildren(SlotCayKhe_PopupHistory_1.default);
        if (!popup) {
          popup = cc.instantiate(this.popupHistory).getComponent(SlotCayKhe_PopupHistory_1.default);
          this.popupParent.addChild(popup.node);
        }
        this.popupParent.getComponentsInChildren(Dialog_1.default).forEach(dialog => {
          dialog.dismiss();
        });
        popup.showHistory(this.sprIcon);
        this.clickSetting(false);
      }
      showJackpotHistory() {
        let popup = this.popupParent.getComponentInChildren(SlotCayKhe_PopupJackpotHistory_1.default);
        if (!popup) {
          popup = cc.instantiate(this.popupJackpotHistory).getComponent(SlotCayKhe_PopupJackpotHistory_1.default);
          this.popupParent.addChild(popup.node);
        }
        this.popupParent.getComponentsInChildren(Dialog_1.default).forEach(dialog => {
          dialog.dismiss();
        });
        popup.show();
        this.clickSetting(false);
      }
      showPopup(callback = (() => {})) {
        this.sendPingWaiting(5);
        "function" != typeof callback && (callback = () => {});
        cc.Tween.stopAllByTarget(this.may);
        cc.Tween.stopAllByTarget(this.jackpot);
        cc.Tween.stopAllByTarget(this.popup);
        cc.tween(this.may).to(.5, {
          scale: .5,
          y: 345
        }, {
          easing: "quartInOut"
        }).start();
        cc.tween(this.jackpot).to(.5, {
          scale: .5,
          y: 585
        }, {
          easing: "quartInOut"
        }).start();
        cc.tween(this.popup).to(.5, {
          scale: 1
        }, {
          easing: "quartInOut"
        }).start();
        callback();
      }
      hidePopup(callback = (() => {})) {
        "function" != typeof callback && (callback = () => {});
        cc.Tween.stopAllByTarget(this.may);
        cc.Tween.stopAllByTarget(this.jackpot);
        cc.Tween.stopAllByTarget(this.popup);
        cc.tween(this.may).to(.5, {
          scale: 1,
          y: -25
        }, {
          easing: "quartInOut"
        }).start();
        cc.tween(this.jackpot).to(.5, {
          scale: 1,
          y: 475
        }, {
          easing: "quartInOut"
        }).start();
        cc.tween(this.popup).to(.5, {
          scale: 0
        }, {
          easing: "quartInOut"
        }).start();
        callback();
      }
    };
    SlotCayKheController.infoItems = null;
    SlotCayKheController.infoAwards = null;
    __decorate([ property(cc.Prefab) ], SlotCayKheController.prototype, "itemPrefab", void 0);
    __decorate([ property(cc.Prefab) ], SlotCayKheController.prototype, "animPrefab", void 0);
    __decorate([ property(cc.Label) ], SlotCayKheController.prototype, "lbMajor", void 0);
    __decorate([ property(cc.Label) ], SlotCayKheController.prototype, "lbMaxi", void 0);
    __decorate([ property(cc.Label) ], SlotCayKheController.prototype, "lbMini", void 0);
    __decorate([ property(cc.Label) ], SlotCayKheController.prototype, "lbMinior", void 0);
    __decorate([ property(cc.Label) ], SlotCayKheController.prototype, "lbFree", void 0);
    __decorate([ property(cc.Label) ], SlotCayKheController.prototype, "lbWin", void 0);
    __decorate([ property([ sp.SkeletonData ]) ], SlotCayKheController.prototype, "animIcon", void 0);
    __decorate([ property([ cc.SpriteFrame ]) ], SlotCayKheController.prototype, "sprIcon", void 0);
    __decorate([ property([ cc.SpriteFrame ]) ], SlotCayKheController.prototype, "sprBlur", void 0);
    __decorate([ property(cc.Node) ], SlotCayKheController.prototype, "parentItems", void 0);
    __decorate([ property(cc.Node) ], SlotCayKheController.prototype, "parentAnim", void 0);
    __decorate([ property(cc.Node) ], SlotCayKheController.prototype, "nodeSetting", void 0);
    __decorate([ property(cc.Sprite) ], SlotCayKheController.prototype, "sprSpeed", void 0);
    __decorate([ property(cc.Node) ], SlotCayKheController.prototype, "sprSpin", void 0);
    __decorate([ property([ cc.SpriteFrame ]) ], SlotCayKheController.prototype, "sprBtnSpin", void 0);
    __decorate([ property([ cc.SpriteFrame ]) ], SlotCayKheController.prototype, "sprMultiWild", void 0);
    __decorate([ property(cc.Label) ], SlotCayKheController.prototype, "lblCoin", void 0);
    __decorate([ property(cc.Node) ], SlotCayKheController.prototype, "popupParent", void 0);
    __decorate([ property(cc.Prefab) ], SlotCayKheController.prototype, "popupShow", void 0);
    __decorate([ property(cc.Prefab) ], SlotCayKheController.prototype, "popupGuide", void 0);
    __decorate([ property(cc.Prefab) ], SlotCayKheController.prototype, "popupHistory", void 0);
    __decorate([ property(cc.Prefab) ], SlotCayKheController.prototype, "popupJackpotHistory", void 0);
    __decorate([ property(cc.Prefab) ], SlotCayKheController.prototype, "popupJackpotGame", void 0);
    __decorate([ property(SlotCayKhe_SoundControler_1.SoundControler) ], SlotCayKheController.prototype, "soundControler", void 0);
    __decorate([ property(cc.Node) ], SlotCayKheController.prototype, "itemBet", void 0);
    __decorate([ property(cc.PageView) ], SlotCayKheController.prototype, "pageBet", void 0);
    __decorate([ property(cc.Node) ], SlotCayKheController.prototype, "nodeAnimWin", void 0);
    __decorate([ property(sp.Skeleton) ], SlotCayKheController.prototype, "animWin", void 0);
    __decorate([ property(sp.Skeleton) ], SlotCayKheController.prototype, "animCoin", void 0);
    __decorate([ property(cc.Label) ], SlotCayKheController.prototype, "lbCoin", void 0);
    __decorate([ property(cc.Node) ], SlotCayKheController.prototype, "scrBigWin", void 0);
    __decorate([ property(cc.Label) ], SlotCayKheController.prototype, "lbBigWin", void 0);
    __decorate([ property(cc.Node) ], SlotCayKheController.prototype, "scrSelectGame", void 0);
    __decorate([ property([ sp.Skeleton ]) ], SlotCayKheController.prototype, "animSelectGame", void 0);
    __decorate([ property([ cc.Button ]) ], SlotCayKheController.prototype, "buttonsSelectGame", void 0);
    __decorate([ property(cc.Label) ], SlotCayKheController.prototype, "lbSelectGame", void 0);
    __decorate([ property(cc.Node) ], SlotCayKheController.prototype, "may", void 0);
    __decorate([ property(cc.Node) ], SlotCayKheController.prototype, "jackpot", void 0);
    __decorate([ property(cc.Node) ], SlotCayKheController.prototype, "popup", void 0);
    SlotCayKheController = SlotCayKheController_1 = __decorate([ ccclass ], SlotCayKheController);
    exports.SlotCayKheController = SlotCayKheController;
    exports.default = SlotCayKheController;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/App": void 0,
    "../../Main/Game/src/common/BroadcastReceiver": void 0,
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/common/Dialog": void 0,
    "../../Main/Game/src/common/ErrorLogger": void 0,
    "../../Main/Game/src/common/Tween": void 0,
    "../../Main/Game/src/common/Utils": void 0,
    "../../Main/Game/src/networks/Network.Cmd": void 0,
    "../../Main/Game/src/networks/Network.InPacket": void 0,
    "../../Main/Game/src/networks/SlotNetworkClient": void 0,
    "./SlotCayKhe.Cmd": "SlotCayKhe.Cmd",
    "./SlotCayKhe.PopupGuide": "SlotCayKhe.PopupGuide",
    "./SlotCayKhe.PopupHistory": "SlotCayKhe.PopupHistory",
    "./SlotCayKhe.PopupJackpotGame": "SlotCayKhe.PopupJackpotGame",
    "./SlotCayKhe.PopupJackpotHistory": "SlotCayKhe.PopupJackpotHistory",
    "./SlotCayKhe.SoundControler": "SlotCayKhe.SoundControler"
  } ],
  "SlotCayKhe.PopupBonus": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6925coPsNFPTrkbwoZ83iMK", "SlotCayKhe.PopupBonus");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.PopupBonus = void 0;
    const Dialog_1 = require("../../Main/Game/src/common/Dialog");
    const Tween_1 = require("../../Main/Game/src/common/Tween");
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let PopupBonus = class PopupBonus extends Dialog_1.default {
      constructor() {
        super(...arguments);
        this.item = null;
        this.items = null;
        this.special = null;
        this.itemSpecial = null;
        this.lblTotal = null;
        this.lblSpecial = null;
        this.sprFramesFactor = [];
        this.left = 0;
        this.typeIcon = "";
        this.onFinished = null;
        this.dataBonus = [];
        this.factors = [];
        this.totalCoin = 0;
        this.cbAutoClose = null;
      }
      start() {
        this.item.active = false;
        this.resetStage();
        for (let i = 0; i < this.items.childrenCount; i++) {
          let node = this.items.children[i];
          node["btn"] = node.getChildByName("btn").getComponent(cc.Button);
          node["icon"] = node.getChildByName("icon");
          node["label"] = node.getChildByName("label").getComponent(cc.Label);
          node["btn"].node.on("click", () => {
            var value = this.dataBonus[this.dataBonus.length - this.left];
            node.getChildByName("btn").active = false;
            node.getChildByName("icon1").active = !(value > 0);
            node.getChildByName("icon").active = value > 0;
            node.getChildByName("icon").children.forEach(node => {
              node.active = node.name == this.typeIcon;
              node.getComponent(sp.Skeleton).setAnimation(0, "normal", false);
            });
            node["label"].node.active = true;
            node["label"].string = "0";
            Tween_1.default.numberTo(node["label"], value, .3);
            this.totalCoin += value;
            Tween_1.default.numberTo(this.lblTotal, this.totalCoin, .3);
            this.left--;
            if (this.left <= 0) {
              for (let i = 0; i < this.items.childrenCount; i++) this.items.children[i]["btn"].interactable = false;
              this.scheduleOnce(() => {
                this.showSpecial();
              }, 1.5);
            }
            this.unschedule(this.cbAutoClose);
          });
        }
        for (let i = 0; i < this.itemSpecial.childrenCount; i++) {
          let node = this.itemSpecial.children[i];
          node["btn"] = node.getChildByName("btn").getComponent(cc.Button);
          node["icon"] = node.getChildByName("icon");
          node.getChildByName("icon").children.forEach(node => {
            node.active = false;
          });
          node["btn"].node.on("click", () => {
            let factorOtherIdx = 0;
            for (let j = 0; j < this.itemSpecial.childrenCount; j++) {
              let node2 = this.itemSpecial.children[j];
              node2["icon"].active = true;
              node2["btn"].interactable = false;
              node2["btn"].node.children.forEach(node => {
                node.active = node.name == this.typeIcon;
                node.getComponent(sp.Skeleton).setAnimation(0, j == i ? "x3" : "normal", false);
              });
              if (j == i) {
                node2["btn"].node.active = false;
                node2["icon"].getComponent(cc.Label).string = "x" + this.factors[0];
              } else {
                factorOtherIdx++;
                node2["icon"].getComponent(cc.Label).string = "x" + this.factors[factorOtherIdx];
              }
            }
            this.lblSpecial.string = Utils_1.default.formatNumber(this.totalCoin) + " x " + this.factors[0] + " = " + Utils_1.default.formatNumber(this.totalCoin * this.factors[0]);
            this.hidden();
          });
        }
      }
      resetStage() {
        for (let i = 0; i < 12; i++) {
          let itembonus = this.items.children[i];
          if (!itembonus) {
            itembonus = cc.instantiate(this.item);
            itembonus.active = true;
            this.items.addChild(itembonus);
          }
        }
        this.items.children.forEach(node => {
          node.getChildByName("icon1").active = true;
          node.getChildByName("icon1").children.forEach(node => {
            node.active = node.name == this.typeIcon;
            node.getComponent(sp.Skeleton).setAnimation(0, "animation", false);
          });
          let btn = node.getChildByName("btn").getComponent(cc.Button);
          btn.node.active = true;
          btn.interactable = true;
          node.getChildByName("icon").active = true;
          node.getChildByName("icon").children.forEach(node => {
            node.active = false;
          });
          node.getChildByName("label").active = false;
        });
      }
      showBonus(typeIcon, bonus, onFinished) {
        super.show();
        this.typeIcon = typeIcon.toString();
        this.resetStage();
        this.special.active = false;
        this.onFinished = onFinished;
        let arrBonus = bonus.split(",");
        this.dataBonus = [];
        for (let i = 0; i < arrBonus.length - 2; i++) this.dataBonus.push(Number(arrBonus[i]));
        this.left = this.dataBonus.length;
        let factor = Number(arrBonus[arrBonus.length - 2]);
        let size = Number(arrBonus[arrBonus.length - 1]);
        this.factors.length = 0;
        this.factors.push(factor);
        for (let i = 0; i < 3; i++) size - i != factor && this.factors.push(size - i);
        this.lblTotal.string = "0";
        this.totalCoin = 0;
        this.cbAutoClose = () => {
          this.dismiss();
          this.onFinished();
        };
        this.scheduleOnce(this.cbAutoClose, 10);
      }
      showSpecial() {
        for (let i = 0; i < this.itemSpecial.childrenCount; i++) {
          let node = this.itemSpecial.children[i];
          let btn = node.getChildByName("btn").getComponent(cc.Button);
          node.getChildByName("icon").children.forEach(node => {
            node.active = false;
          });
          node.getChildByName("btn").children.forEach(node => {
            node.active = node.name == this.typeIcon;
            node.getComponent(sp.Skeleton).setAnimation(0, "normal", false);
          });
          btn.node.active = true;
          btn.interactable = true;
          node.getChildByName("icon").active = false;
        }
        this.lblSpecial.string = "";
        this.special.active = true;
      }
      hidden() {
        this.scheduleOnce(() => {
          this.node.active = false;
          this.onFinished();
        }, 1.5);
      }
    };
    __decorate([ property(cc.Node) ], PopupBonus.prototype, "item", void 0);
    __decorate([ property(cc.Node) ], PopupBonus.prototype, "items", void 0);
    __decorate([ property(cc.Node) ], PopupBonus.prototype, "special", void 0);
    __decorate([ property(cc.Node) ], PopupBonus.prototype, "itemSpecial", void 0);
    __decorate([ property(cc.Label) ], PopupBonus.prototype, "lblTotal", void 0);
    __decorate([ property(cc.Label) ], PopupBonus.prototype, "lblSpecial", void 0);
    __decorate([ property([ cc.SpriteFrame ]) ], PopupBonus.prototype, "sprFramesFactor", void 0);
    PopupBonus = __decorate([ ccclass ], PopupBonus);
    exports.PopupBonus = PopupBonus;
    exports.default = PopupBonus;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/Dialog": void 0,
    "../../Main/Game/src/common/Tween": void 0,
    "../../Main/Game/src/common/Utils": void 0
  } ],
  "SlotCayKhe.PopupGuide": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "dfb0d7U3TFEj5nyETDW++xj", "SlotCayKhe.PopupGuide");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.PopupGuide = void 0;
    const BroadcastReceiver_1 = require("../../Main/Game/src/common/BroadcastReceiver");
    const Dialog_1 = require("../../Main/Game/src/common/Dialog");
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let PopupGuide = class PopupGuide extends Dialog_1.default {
      constructor() {
        super(...arguments);
        this.itemPrefab = null;
        this.content = null;
        this.prefabLine = null;
        this.cellOff = null;
        this.cellOn = null;
        this.dotOff = null;
        this.dotOn = null;
        this.contentLine = null;
        this.lbInfoBet = null;
        this.lbWinInGuide = null;
        this.lbItemWinInGuide = null;
      }
      init(data = this.data, listSpriteFrame) {
        this.data = data;
        data.info.forEach(content => {
          let item = cc.instantiate(this.itemPrefab);
          item.getChildByName("item").getComponentInChildren(cc.Sprite).spriteFrame = listSpriteFrame[content.indexSpr];
          let str = content.guide.sort((a, b) => b.award.duplicate - a.award.duplicate).map(a => a.award.duplicate > 0 ? a.award.duplicate + "c\u1ed9t " + a.text : a.text).join("\n");
          item.getComponentInChildren(cc.Label).string = str;
          item.getComponentInChildren(cc.Label).node.width = content.indexSpr < 4 ? 195 : 90;
          this.content.addChild(item);
          if (12 == content.indexSpr) {
            this.lbWinInGuide.string = this.lbWinInGuide.string.replace("%vl0", content.guide.find(item => 3 == item.award.duplicate).text.replace(/[^0-9]/g, "")).replace("%vl1", content.guide.find(item => 3 == item.award.duplicate).text.replace(/[^0-9]/g, "")).replace("%vl2", 6 * parseInt(content.guide.find(item => 3 == item.award.duplicate).text.replace(/[^0-9]/g, "")) * 10 + "");
            this.lbItemWinInGuide.string = str;
          }
        });
        this.lbInfoBet.string = this.lbInfoBet.string.replace("%bet", data.infoRoom.map(room => " " + Utils_1.default.formatNumber(room.betValue / 25))).replace("%all_bet", data.infoRoom.map(room => " " + Utils_1.default.formatNumber(room.betValue) + "\u0111"));
      }
      dismiss() {
        BroadcastReceiver_1.default.send("HIDE_POPUP_SLOT_CAY_KHE");
        super.dismiss();
      }
      show() {
        BroadcastReceiver_1.default.send("SHOW_POPUP_SLOT_CAY_KHE");
        super.show();
      }
      initLine(data = this.dataLine) {
        this.dataLine = data;
        data.forEach((cell, index) => {
          let node = this.contentLine.children.find(children => JSON.parse(children.name).index == cell["index"]);
          if (!node) {
            node = cc.instantiate(this.prefabLine);
            this.contentLine.addChild(node);
            node.name = JSON.stringify({
              index: cell["index"],
              state: true
            });
          }
          let data = JSON.parse(node.name);
          let content = node.getChildByName("content");
          node.getChildByName("id_dong").getComponent(cc.Label).string = cell["index"];
          content.children.forEach(children => {
            children.getComponent(cc.Sprite).spriteFrame = data.state ? this.dotOn : this.dotOff;
          });
          cell["cells"].forEach((idCell, id) => {
            content.getChildByName(idCell + "." + id).getComponent(cc.Sprite).spriteFrame = data.state ? this.cellOn : this.cellOff;
          });
        });
      }
    };
    __decorate([ property(cc.Prefab) ], PopupGuide.prototype, "itemPrefab", void 0);
    __decorate([ property(cc.Node) ], PopupGuide.prototype, "content", void 0);
    __decorate([ property(cc.Prefab) ], PopupGuide.prototype, "prefabLine", void 0);
    __decorate([ property(cc.SpriteFrame) ], PopupGuide.prototype, "cellOff", void 0);
    __decorate([ property(cc.SpriteFrame) ], PopupGuide.prototype, "cellOn", void 0);
    __decorate([ property(cc.SpriteFrame) ], PopupGuide.prototype, "dotOff", void 0);
    __decorate([ property(cc.SpriteFrame) ], PopupGuide.prototype, "dotOn", void 0);
    __decorate([ property(cc.Node) ], PopupGuide.prototype, "contentLine", void 0);
    __decorate([ property(cc.RichText) ], PopupGuide.prototype, "lbInfoBet", void 0);
    __decorate([ property(cc.Label) ], PopupGuide.prototype, "lbWinInGuide", void 0);
    __decorate([ property(cc.Label) ], PopupGuide.prototype, "lbItemWinInGuide", void 0);
    PopupGuide = __decorate([ ccclass ], PopupGuide);
    exports.PopupGuide = PopupGuide;
    exports.default = PopupGuide;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/BroadcastReceiver": void 0,
    "../../Main/Game/src/common/Dialog": void 0,
    "../../Main/Game/src/common/Utils": void 0
  } ],
  "SlotCayKhe.PopupHistory": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "105c32AWvxGgoQBq/yyMNNV", "SlotCayKhe.PopupHistory");
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
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    const Http_1 = require("../../Main/Game/src/common/Http");
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const BroadcastReceiver_1 = require("../../Main/Game/src/common/BroadcastReceiver");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let PopupHistory = class PopupHistory extends Dialog_1.default {
      constructor() {
        super(...arguments);
        this.lblPage = null;
        this.itemTemplate = null;
        this.soundClick = null;
        this.soundSlotState = null;
        this.page = 1;
        this.maxPage = 1;
        this.items = new Array();
        this.sprIcon = [];
      }
      showHistory(sprIcon) {
        this.canPlaySound() && cc.audioEngine.play(this.soundClick, false, 1);
        this.sprIcon = sprIcon;
        this.show();
        BroadcastReceiver_1.default.send("SHOW_POPUP_SLOT_CAY_KHE");
        for (let i = 0; i < this.items.length; i++) this.items[i].active = false;
        null != this.itemTemplate && (this.itemTemplate.active = false);
      }
      dismiss() {
        BroadcastReceiver_1.default.send("HIDE_POPUP_SLOT_CAY_KHE");
        super.dismiss();
      }
      _onShowed() {
        super._onShowed();
        this.page = 1;
        this.maxPage = 1;
        this.lblPage.string = this.page + "/" + this.maxPage;
        this.loadData();
      }
      actNextPage() {
        this.canPlaySound() && cc.audioEngine.play(this.soundClick, false, 1);
        if (this.page < this.maxPage) {
          this.page++;
          this.lblPage.string = this.page + "/" + this.maxPage;
          this.loadData();
        }
      }
      actPrevPage() {
        this.canPlaySound() && cc.audioEngine.play(this.soundClick, false, 1);
        if (this.page > 1) {
          this.page--;
          this.lblPage.string = this.page + "/" + this.maxPage;
          this.loadData();
        }
      }
      loadData() {
        App_1.default.instance.showLoading(true);
        Http_1.default.get(Configs_1.default.App.API, {
          c: 137,
          p: this.page,
          un: Configs_1.default.Login.Nickname,
          gn: "AnKheTraVang"
        }, (err, res) => {
          var _a;
          App_1.default.instance.showLoading(false);
          cc.log(res);
          if (null != err) return;
          if (!res["success"]) return;
          cc.log(res);
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
            if (i < res["results"].length) {
              let itemData = res["results"][i];
              item.getChildByName("Time").getComponent(cc.Label).string = itemData["ts"].replace("T", "  ");
              item.getChildByName("Session").getComponent(cc.Label).string = "#" + itemData["rf"];
              item.getChildByName("Bet").getComponent(cc.Label).string = "Bet " + Utils_1.default.formatNumber(itemData["bv"]) + " - 243 line";
              item.getChildByName("Win").getComponent(cc.Label).string = "Win " + Utils_1.default.formatNumber(itemData["pz"]);
              item.active = true;
              let icons = null === (_a = itemData["lb"]) || void 0 === _a ? void 0 : _a.split(",");
              item.getChildByName("parent_items").children.forEach((chil, ind) => {
                chil.getComponentInChildren(cc.Sprite).spriteFrame = this.sprIcon[icons[ind]];
              });
              item.position = cc.v3(cc.winSize.width, 400);
              item.stopAllActions();
              let speed = .7;
              item.runAction(cc.sequence(cc.delayTime(.15 * (this.items.length - i) * speed), cc.moveTo(.15 * speed, cc.v2(0, 400)), cc.delayTime(.05), cc.moveTo(.2 * speed * (1 === i ? .8 : 1 - Math.pow(2, -10 * i)), cc.v2(0, 380 - 85 * i)).easing(cc.easeCircleActionOut())));
            } else item.active = false;
          }
        });
      }
      canPlaySound() {
        if (null == this.soundClick) return false;
        var soundSave = cc.sys.localStorage.getItem("sound_Slot_1");
        this.soundSlotState = null != soundSave ? parseInt(soundSave) : 1;
        return 1 == this.soundSlotState;
      }
    };
    __decorate([ property(cc.Label) ], PopupHistory.prototype, "lblPage", void 0);
    __decorate([ property(cc.Node) ], PopupHistory.prototype, "itemTemplate", void 0);
    __decorate([ property({
      type: cc.AudioClip
    }) ], PopupHistory.prototype, "soundClick", void 0);
    __decorate([ property([ cc.SpriteFrame ]) ], PopupHistory.prototype, "sprIcon", void 0);
    PopupHistory = __decorate([ ccclass ], PopupHistory);
    exports.default = PopupHistory;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/App": void 0,
    "../../Main/Game/src/common/BroadcastReceiver": void 0,
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/common/Dialog": void 0,
    "../../Main/Game/src/common/Http": void 0,
    "../../Main/Game/src/common/Utils": void 0
  } ],
  "SlotCayKhe.PopupJackpotGame": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1a18eADPnZEIofvBNITM+LY", "SlotCayKhe.PopupJackpotGame");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.PopupJackpotGame = void 0;
    const BroadcastReceiver_1 = require("../../Main/Game/src/common/BroadcastReceiver");
    const Dialog_1 = require("../../Main/Game/src/common/Dialog");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let PopupJackpotGame = class PopupJackpotGame extends Dialog_1.default {
      constructor() {
        super(...arguments);
        this.itemNode = null;
        this.btnClose = null;
        this.content = null;
        this.dataOpen = [];
        this.currentOpen = 0;
      }
      start() {
        this.itemNode.active = false;
        this.btnClose.interactable = false;
      }
      init(info = []) {
        this.dataOpen = info;
        this.content.removeAllChildren();
        this.btnClose.interactable = false;
        info.forEach(vl => {
          let item = cc.instantiate(this.itemNode);
          item.name = "close";
          item.active = true;
          this.content.addChild(item);
          item.children.forEach(chil => {
            chil.active = "normal" == chil.name;
            if (chil.getChildByName("star")) {
              cc.Tween.stopAllByTarget(chil.getChildByName("star"));
              chil.getChildByName("star").active = false;
            }
          });
        });
      }
      clickJackpotGame(evt, data) {
        if ("open" == evt.target.name) return;
        evt.target.name = "open";
        if (void 0 == this.dataOpen[this.currentOpen]) return;
        let dataOpen = this.dataOpen[this.currentOpen] + "";
        evt.target.getChildByName(dataOpen).active = true;
        this.currentOpen++;
        this.checkFinish();
      }
      checkFinish() {
        let includesItemJackpot = {};
        for (let index = 0; index < this.currentOpen; index++) {
          const element = this.dataOpen[index] + "";
          includesItemJackpot[element] = includesItemJackpot.hasOwnProperty(element) ? includesItemJackpot[element] + 1 : 1;
          if (3 == includesItemJackpot[element]) {
            this.content.children.forEach(chil => {
              chil.getComponent(cc.Button).interactable = false;
              if (chil.getChildByName(element).active) {
                chil.getChildByName(element).getChildByName("star").active = true;
                cc.tween(chil.getChildByName(element).getChildByName("star")).repeatForever(cc.sequence(cc.fadeIn(.5), cc.fadeOut(.5))).start();
              }
            });
            let cb = () => {
              this.content.children.forEach(chil => {
                if ("close" == chil.name && void 0 != this.dataOpen[this.currentOpen]) {
                  let dataOpen = this.dataOpen[this.currentOpen] + "";
                  this.scheduleOnce(() => {
                    chil.getChildByName(dataOpen).active = true;
                  }, 1);
                  this.currentOpen++;
                }
              });
              this.currentOpen = this.dataOpen.length;
            };
            switch (element) {
             case "11":
              BroadcastReceiver_1.default.send("HIDE_JACKPOT_SLOT_CAY_KHE", "mini");
              break;

             case "12":
              BroadcastReceiver_1.default.send("HIDE_JACKPOT_SLOT_CAY_KHE", "minior");
              break;

             case "13":
              BroadcastReceiver_1.default.send("HIDE_JACKPOT_SLOT_CAY_KHE", "major");
              break;

             case "14":
              BroadcastReceiver_1.default.send("HIDE_JACKPOT_SLOT_CAY_KHE", "maxi");
            }
            cc.tween(this.node).delay(4.5).call(cb).start();
            break;
          }
        }
      }
      show() {
        BroadcastReceiver_1.default.send("SHOW_POPUP_SLOT_CAY_KHE");
        super.show();
      }
      dismiss() {
        BroadcastReceiver_1.default.send("HIDE_POPUP_SLOT_CAY_KHE");
        super.dismiss();
      }
    };
    __decorate([ property(cc.Node) ], PopupJackpotGame.prototype, "itemNode", void 0);
    __decorate([ property(cc.Button) ], PopupJackpotGame.prototype, "btnClose", void 0);
    __decorate([ property(cc.Node) ], PopupJackpotGame.prototype, "content", void 0);
    PopupJackpotGame = __decorate([ ccclass ], PopupJackpotGame);
    exports.PopupJackpotGame = PopupJackpotGame;
    exports.default = PopupJackpotGame;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/BroadcastReceiver": void 0,
    "../../Main/Game/src/common/Dialog": void 0
  } ],
  "SlotCayKhe.PopupJackpotHistory": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cd821RllJZBRoJWI+3BWsFb", "SlotCayKhe.PopupJackpotHistory");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.PopupJackpotHistory = void 0;
    const Dialog_1 = require("../../Main/Game/src/common/Dialog");
    const App_1 = require("../../Main/Game/src/common/App");
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    const Http_1 = require("../../Main/Game/src/common/Http");
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const BroadcastReceiver_1 = require("../../Main/Game/src/common/BroadcastReceiver");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let PopupJackpotHistory = class PopupJackpotHistory extends Dialog_1.default {
      constructor() {
        super(...arguments);
        this.lblPage = null;
        this.itemTemplate = null;
        this.soundClick = null;
        this.soundSlotState = null;
        this.page = 1;
        this.maxPage = 1;
        this.items = new Array();
      }
      show() {
        this.canPlaySound() && cc.audioEngine.play(this.soundClick, false, 1);
        super.show();
        BroadcastReceiver_1.default.send("SHOW_POPUP_SLOT_CAY_KHE");
        for (let i = 0; i < this.items.length; i++) this.items[i].active = false;
        null != this.itemTemplate && (this.itemTemplate.active = false);
      }
      dismiss() {
        BroadcastReceiver_1.default.send("HIDE_POPUP_SLOT_CAY_KHE");
        super.dismiss();
      }
      _onShowed() {
        super._onShowed();
        this.page = 1;
        this.maxPage = 1;
        this.lblPage.string = this.page + "/" + this.maxPage;
        this.loadData();
      }
      actNextPage() {
        this.canPlaySound() && cc.audioEngine.play(this.soundClick, false, 1);
        if (this.page < this.maxPage) {
          this.page++;
          this.lblPage.string = this.page + "/" + this.maxPage;
          this.loadData();
        }
      }
      actPrevPage() {
        this.canPlaySound() && cc.audioEngine.play(this.soundClick, false, 1);
        if (this.page > 1) {
          this.page--;
          this.lblPage.string = this.page + "/" + this.maxPage;
          this.loadData();
        }
      }
      loadData() {
        App_1.default.instance.showLoading(true);
        Http_1.default.get(Configs_1.default.App.API, {
          c: 138,
          p: this.page,
          gn: "AnKheTraVang"
        }, (err, res) => {
          App_1.default.instance.showLoading(false);
          cc.log(res);
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
          this.maxPage = res["totalPages"];
          this.lblPage.string = this.page + "/" + this.maxPage;
          for (let i = this.items.length - 1; i >= 0; i--) {
            let item = this.items[i];
            if (i < res["results"].length) {
              let itemData = res["results"][i];
              item.active = false;
              item.getChildByName("Session-Time").getComponent(cc.Label).string = "#" + itemData["rf"] + "            " + itemData["ts"].replace("T", "  ");
              item.getChildByName("Bet").getComponent(cc.Label).string = "Bet " + Utils_1.default.formatNumber(itemData["bv"]);
              item.getChildByName("Win").getComponent(cc.Label).string = "Win " + Utils_1.default.formatNumber(itemData["pz"]);
              switch (itemData["rs"]) {
               case 3:
                item.getChildByName("Type").getComponent(cc.Label).string = "N\u1ed5 h\u0169";
                break;

               case 11:
                item.getChildByName("Type").getComponent(cc.Label).string = "Mini";
                break;

               case 12:
                item.getChildByName("Type").getComponent(cc.Label).string = "Major";
                break;

               case 13:
                item.getChildByName("Type").getComponent(cc.Label).string = "Minior";
                break;

               case 14:
                item.getChildByName("Type").getComponent(cc.Label).string = "Grand";
                break;

               default:
                item.getChildByName("Type").getComponent(cc.Label).string = "Th\u1eafng l\u1edbn";
              }
              item.getChildByName("Account").getComponent(cc.Label).string = itemData["nn"];
              item.active = true;
              item.position = cc.v3(cc.winSize.width, 400);
              item.stopAllActions();
              let speed = .7;
              item.runAction(cc.sequence(cc.delayTime(.15 * (this.items.length - i) * speed), cc.moveTo(.15 * speed, cc.v2(0, 400)), cc.delayTime(.05), cc.moveTo(.2 * speed * (1 === i ? .8 : 1 - Math.pow(2, -10 * i)), cc.v2(0, 380 - 85 * i)).easing(cc.easeCircleActionOut())));
            } else item.active = false;
          }
        });
      }
      canPlaySound() {
        if (null == this.soundClick) return false;
        var soundSave = cc.sys.localStorage.getItem("sound_Slot_1");
        this.soundSlotState = null != soundSave ? parseInt(soundSave) : 1;
        return 1 == this.soundSlotState;
      }
    };
    __decorate([ property(cc.Label) ], PopupJackpotHistory.prototype, "lblPage", void 0);
    __decorate([ property(cc.Node) ], PopupJackpotHistory.prototype, "itemTemplate", void 0);
    __decorate([ property({
      type: cc.AudioClip
    }) ], PopupJackpotHistory.prototype, "soundClick", void 0);
    PopupJackpotHistory = __decorate([ ccclass ], PopupJackpotHistory);
    exports.PopupJackpotHistory = PopupJackpotHistory;
    exports.default = PopupJackpotHistory;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/App": void 0,
    "../../Main/Game/src/common/BroadcastReceiver": void 0,
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/common/Dialog": void 0,
    "../../Main/Game/src/common/Http": void 0,
    "../../Main/Game/src/common/Utils": void 0
  } ],
  "SlotCayKhe.SoundControler": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f00c76uBTFNeb6tP5cYJ3AT", "SlotCayKhe.SoundControler");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.SoundControler = void 0;
    const BroadcastReceiver_1 = require("../../Main/Game/src/common/BroadcastReceiver");
    const Common_AudioManager_1 = require("../../Main/Game/src/common/Common.AudioManager");
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    const SPUtils_1 = require("../../Main/Game/src/common/SPUtils");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let SoundControler = class SoundControler extends cc.Component {
      constructor() {
        super(...arguments);
        this.soundSpinMis = null;
        this.soundSpinWin = null;
        this.soundBigWin = null;
        this.soundJackpot = null;
        this.soundBonus = null;
        this.soundClick = null;
        this.musicBackground = [];
        this.soundSpin = null;
        this.soundOff = null;
        this.musicOff = null;
        this.musicSlotState = null;
        this.remoteMusicBackground = null;
        this.soundSlotState = null;
      }
      playSounWithID(id, speed = 1, repeat = 1) {
        switch (id) {
         case 0:
          this.playSound(this.soundSpinMis);
          break;

         case 1:
          this.playSound(this.soundSpinWin);
          break;

         case 2:
          this.playSound(this.soundBigWin);
          break;

         case 3:
          this.playSound(this.soundJackpot);
          break;

         case 5:
          this.playSound(this.soundBonus);
          break;

         case 6:
          this.playSound(this.soundBigWin);
          break;

         case 7:
          this.playSound(this.soundSpin, speed, repeat);
        }
      }
      playSound(sound = this.soundClick, speed = 1, repeat = 1) {
        if (1 == this.soundSlotState && sound) {
          let audioID = cc.audioEngine.play(sound, true, 1);
          let audioTime = cc.audioEngine.getDuration(audioID) - 1;
          this.scheduleOnce(() => {
            cc.audioEngine.stop(audioID);
            repeat > 1 && this.playSound(sound, speed, repeat - 1);
          }, audioTime * speed);
        }
      }
      commonClickHandler() {
        1 == this.soundSlotState && cc.audioEngine.play(this.soundClick, false, 1);
      }
      settingSound() {
        this.soundOff.active || cc.audioEngine.play(this.soundClick, false, 1);
        this.soundOff.active = !this.soundOff.active;
        this.soundOff.active ? this.soundSlotState = 0 : this.soundSlotState = 1;
      }
      randomBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
      }
      settingMusic() {
        if (!(this.musicBackground.length > 0)) return;
        this.musicOff.active = !this.musicOff.active;
        if (this.musicOff.active && this.soundClick) this.musicSlotState = 0; else {
          var musicId = this.randomBetween(0, this.musicBackground.length - 1);
          Common_AudioManager_1.default.getInstance().playBackgroundMusicByGame(Configs_1.default.App.BUNDLE_NAME.CAYKHE, this.musicBackground[musicId]);
          this.musicSlotState = 1;
        }
        SPUtils_1.default.setMusicVolumnByGame(Configs_1.default.App.BUNDLE_NAME.CAYKHE, this.musicSlotState);
        BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.ON_AUDIO_CHANGED, Configs_1.default.App.BUNDLE_NAME.CAYKHE);
      }
      initMusicAndSound() {
        this.musicSlotState = 0;
        this.soundSlotState = 1;
        SPUtils_1.default.setMusicVolumnByGame(Configs_1.default.App.BUNDLE_NAME.CAYKHE, this.musicSlotState);
        BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.ON_AUDIO_CHANGED, Configs_1.default.App.BUNDLE_NAME.CAYKHE);
        this.musicOff.active = 0 == this.musicSlotState;
        this.soundOff.active = 0 == this.soundSlotState;
        1 == this.musicSlotState && Common_AudioManager_1.default.getInstance().playBackgroundMusicByGame(Configs_1.default.App.BUNDLE_NAME.CAYKHE, this.musicBackground[0]);
      }
      setSoundForButtons(node = cc.find("Canvas")) {
        node.children.forEach(child => {
          let btn = child.getComponent(cc.Button) || child.getComponent(cc.Toggle);
          if (btn && 0 == btn.clickEvents.filter(evt => "playSoundClick" == evt.handler).length) {
            let eventHandler = new cc.Component.EventHandler();
            eventHandler.target = this.node;
            eventHandler.component = "SlotCayKhe.SoundControler";
            eventHandler.handler = "playSoundClick";
            eventHandler.customEventData = "";
            btn.clickEvents.push(eventHandler);
          }
          this.setSoundForButtons(child);
        });
      }
      playSoundClick() {
        1 == this.soundSlotState && cc.audioEngine.play(this.soundClick, false, 1);
      }
    };
    __decorate([ property({
      type: cc.AudioClip
    }) ], SoundControler.prototype, "soundSpinMis", void 0);
    __decorate([ property({
      type: cc.AudioClip
    }) ], SoundControler.prototype, "soundSpinWin", void 0);
    __decorate([ property({
      type: cc.AudioClip
    }) ], SoundControler.prototype, "soundBigWin", void 0);
    __decorate([ property({
      type: cc.AudioClip
    }) ], SoundControler.prototype, "soundJackpot", void 0);
    __decorate([ property({
      type: cc.AudioClip
    }) ], SoundControler.prototype, "soundBonus", void 0);
    __decorate([ property({
      type: cc.AudioClip
    }) ], SoundControler.prototype, "soundClick", void 0);
    __decorate([ property({
      type: cc.AudioClip
    }) ], SoundControler.prototype, "musicBackground", void 0);
    __decorate([ property({
      type: cc.AudioClip
    }) ], SoundControler.prototype, "soundSpin", void 0);
    __decorate([ property(cc.Node) ], SoundControler.prototype, "soundOff", void 0);
    __decorate([ property(cc.Node) ], SoundControler.prototype, "musicOff", void 0);
    SoundControler = __decorate([ ccclass() ], SoundControler);
    exports.SoundControler = SoundControler;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/BroadcastReceiver": void 0,
    "../../Main/Game/src/common/Common.AudioManager": void 0,
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/common/SPUtils": void 0
  } ],
  "SlotCayKhe.SpinControler": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b2a96xfMLpBaaPmnItowT2g", "SlotCayKhe.SpinControler");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.SpinControler = exports.SpinType = exports.SpinMode = void 0;
    const Tween_1 = require("../../Main/Game/src/common/Tween");
    const {ccclass: ccclass, property: property} = cc._decorator;
    var SpinMode;
    (function(SpinMode) {
      SpinMode[SpinMode["NORMAL"] = 0] = "NORMAL";
      SpinMode[SpinMode["AUTO"] = 1] = "AUTO";
      SpinMode[SpinMode["AUTO_X2"] = 2] = "AUTO_X2";
    })(SpinMode = exports.SpinMode || (exports.SpinMode = {}));
    class SpinType {
      constructor(parameters) {
        this.normal = true;
        this.auto = false;
        this.autox2 = false;
        this.normal = null === parameters || void 0 === parameters ? void 0 : parameters.normal;
        this.auto = null === parameters || void 0 === parameters ? void 0 : parameters.auto;
        this.autox2 = null === parameters || void 0 === parameters ? void 0 : parameters.autox2;
      }
    }
    exports.SpinType = SpinType;
    let SpinControler = class SpinControler extends cc.Component {
      constructor() {
        super(...arguments);
        this.toggleAuto = null;
        this.toggleAutoX2 = null;
        this.btnTrial = null;
        this.sprFrameTrialThu = null;
        this.sprFrameTrialThat = null;
        this.btnSpin = null;
        this.btnLine = null;
        this.lblLine = null;
        this.lblBet = null;
        this.btnBet = null;
        this.selectLine = null;
        this.lblTotalBet = null;
        this.spinType = {
          normal: true,
          auto: false,
          autox2: false
        };
        this.spinMode = SpinMode.NORMAL;
        this.timeHoldSpin = 0;
        this.isHoldSpin = false;
        this.spin = null;
        this.spinAuto = null;
      }
      setInfoBet(isTrial, line, bet, totalBet) {
        this.btnTrial.getComponent(cc.Sprite).spriteFrame = isTrial ? this.sprFrameTrialThat : this.sprFrameTrialThu;
        this.lblLine.string = line;
        this.lblBet.string = bet;
        Tween_1.default.numberTo(this.lblTotalBet, totalBet, .3);
      }
      setSpinMode(mode) {
        switch (mode) {
         case SpinMode.AUTO:
          this.spinType.auto = true;
          this.spinType.autox2 = false;
          break;

         case SpinMode.AUTO_X2:
          this.spinType.autox2 = true;
          break;

         default:
          this.btnSpin.getComponentInChildren(sp.Skeleton).timeScale = 5;
          this.btnSpin.getComponentInChildren(sp.Skeleton).setAnimation(0, "closes-mouth", false);
          this.spinType.auto = false;
          this.spinType.autox2 = false;
        }
        this.toggleAutoX2.isChecked = this.spinType.autox2;
        this.toggleAuto.isChecked = this.spinType.auto;
      }
      setStageButtonSpin(stageStop) {
        this.btnSpin.getComponentInChildren(sp.Skeleton).timeScale = 5;
        this.btnSpin.getComponentInChildren(sp.Skeleton).setAnimation(0, stageStop ? "press" : "closes-mouth", false);
        this.scheduleOnce(() => {
          this.btnSpin.getComponentInChildren(sp.Skeleton).timeScale = 1;
        }, 1);
      }
      setClickSpin(call) {
        cc.log("vao set spin");
        this.btnSpin.node.on("touchstart", touch => {
          cc.log("vao touchstart");
          call();
          this.timeHoldSpin = 0;
          this.btnSpin.getComponentInChildren(sp.Skeleton).timeScale = 1;
          this.btnSpin.getComponentInChildren(sp.Skeleton).setAnimation(0, "press", false);
          this.isHoldSpin = true;
        });
        this.btnSpin.node.on("touchend", touch => {
          cc.log("vao touchend");
          if (this.isHoldSpin) {
            this.isHoldSpin = false;
            if (this.timeHoldSpin < 1) {
              cc.log("time spin", this.timeHoldSpin);
              this.spin(true);
              this.btnSpin.getComponentInChildren(sp.Skeleton).setAnimation(0, "closes-mouth", false);
            }
            this.timeHoldSpin = 0;
          }
        });
      }
      update(dt) {
        if (this.isHoldSpin && this.spinMode == SpinMode.NORMAL) {
          this.timeHoldSpin += dt;
          if (this.timeHoldSpin >= 1) {
            cc.log("time spin", this.timeHoldSpin);
            this.spinAuto();
            this.isHoldSpin = false;
            this.timeHoldSpin = 0;
          }
        }
      }
      setEnabledAllButtonsSpin(enabled) {
        this.btnSpin.interactable = enabled;
        this.btnBet.interactable = enabled;
        this.btnBet.node.getComponentInChildren(cc.Label).setMaterial(0, cc.Material.getBuiltinMaterial(enabled ? "2d-sprite" : "2d-gray-sprite"));
        this.btnLine.interactable = enabled;
        this.btnLine.node.getComponentInChildren(cc.Label).setMaterial(0, cc.Material.getBuiltinMaterial(enabled ? "2d-sprite" : "2d-gray-sprite"));
        this.btnTrial.interactable = enabled;
      }
    };
    __decorate([ property(cc.Toggle) ], SpinControler.prototype, "toggleAuto", void 0);
    __decorate([ property(cc.Toggle) ], SpinControler.prototype, "toggleAutoX2", void 0);
    __decorate([ property(cc.Button) ], SpinControler.prototype, "btnTrial", void 0);
    __decorate([ property(cc.SpriteFrame) ], SpinControler.prototype, "sprFrameTrialThu", void 0);
    __decorate([ property(cc.SpriteFrame) ], SpinControler.prototype, "sprFrameTrialThat", void 0);
    __decorate([ property(cc.Button) ], SpinControler.prototype, "btnSpin", void 0);
    __decorate([ property(cc.Button) ], SpinControler.prototype, "btnLine", void 0);
    __decorate([ property(cc.Label) ], SpinControler.prototype, "lblLine", void 0);
    __decorate([ property(cc.Label) ], SpinControler.prototype, "lblBet", void 0);
    __decorate([ property(cc.Button) ], SpinControler.prototype, "btnBet", void 0);
    __decorate([ property(cc.Node) ], SpinControler.prototype, "selectLine", void 0);
    __decorate([ property(cc.Label) ], SpinControler.prototype, "lblTotalBet", void 0);
    SpinControler = __decorate([ ccclass() ], SpinControler);
    exports.SpinControler = SpinControler;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/Tween": void 0
  } ],
  "SlotCayKhe.TrialResults": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3ec67xI+QRNh5xJ9Zb8OUzg", "SlotCayKhe.TrialResults");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    class TrialResults {}
    exports.default = TrialResults;
    TrialResults.results = [ {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_JACK_POT",
          money: 3e3,
          lineName: "line9"
        }, {
          award: "TRIPLE_JACK_POT",
          money: 3e3,
          lineName: "line13"
        } ]
      },
      ref: 251,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0,
      result: 3,
      matrix: "7,2,10,3,3,9,5,3,3,9,3,6,5,8,3",
      linesWin: "9,13",
      haiSao: "",
      prize: 12e4,
      currentMoney: 10007600
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line1"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line2"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line6"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line22"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line8"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line24"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line10"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line11"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line12"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line14"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line16"
        } ]
      },
      ref: 255,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0,
      result: 1,
      matrix: "10,10,10,3,10,10,2,10,3,10,6,8,0,1,3",
      linesWin: "1,2,6,22,8,24,10,11,12,14,16",
      haiSao: "",
      prize: 3300,
      currentMoney: 10004e3
    }, {
      awardsDetail: {
        object: [ {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line1"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line3"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line25"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line10"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line11"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line15"
        } ]
      },
      ref: 261,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0,
      result: 1,
      matrix: "3,8,5,1,9,10,2,10,10,5,8,10,8,7,3",
      linesWin: "1,3,25,10,11,15",
      haiSao: "",
      prize: 2600,
      currentMoney: 9993100
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line2"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line18"
        }, {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line4"
        }, {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line20"
        }, {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line24"
        }, {
          award: "QUADAR_KHIEN",
          money: 2e3,
          lineName: "line9"
        }, {
          award: "TRIPLE_KHIEN",
          money: 1e3,
          lineName: "line13"
        }, {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line14"
        } ]
      },
      ref: 264,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0,
      result: 1,
      matrix: "10,2,10,6,7,5,9,6,10,5,6,6,10,10,10",
      linesWin: "2,18,4,20,24,9,13,14",
      haiSao: "",
      prize: 5600,
      currentMoney: 9992e3
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line1"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line2"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line3"
        }, {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line4"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line5"
        }, {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line6"
        }, {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line7"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line8"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line9"
        }, {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line10"
        }, {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line11"
        }, {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line12"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line13"
        }, {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line14"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line15"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line16"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line17"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line18"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line19"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line20"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line21"
        }, {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line22"
        }, {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line23"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line24"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line25"
        } ]
      },
      ref: 265,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0,
      result: 2,
      matrix: "10,2,7,9,3,9,2,2,10,7,8,7,9,9,5",
      linesWin: "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25",
      haiSao: "",
      prize: 11800,
      currentMoney: 10001300
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_KIM_CUONg",
          money: 600,
          lineName: "line1"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line2"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line3"
        }, {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line4"
        }, {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line5"
        }, {
          award: "TRIPLE_KIM_CUONg",
          money: 600,
          lineName: "line6"
        }, {
          award: "TRIPLE_KIM_CUONg",
          money: 600,
          lineName: "line7"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line8"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line9"
        }, {
          award: "TRIPLE_KIM_CUONg",
          money: 600,
          lineName: "line10"
        }, {
          award: "TRIPLE_KIM_CUONg",
          money: 600,
          lineName: "line11"
        }, {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line12"
        }, {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line13"
        }, {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line14"
        }, {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line15"
        }, {
          award: "TRIPLE_KIM_CUONg",
          money: 600,
          lineName: "line16"
        }, {
          award: "TRIPLE_KIM_CUONg",
          money: 600,
          lineName: "line17"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line18"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line19"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line20"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line21"
        }, {
          award: "TRIPLE_KIM_CUONg",
          money: 600,
          lineName: "line22"
        }, {
          award: "TRIPLE_KIM_CUONg",
          money: 600,
          lineName: "line23"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line24"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line25"
        } ]
      },
      ref: 266,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0,
      result: 2,
      matrix: "9,8,9,1,8,7,2,9,9,5,9,0,2,5,6",
      linesWin: "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25",
      haiSao: "",
      prize: 13e3,
      currentMoney: 10011800
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_BUA",
          money: 1e3,
          lineName: "line19"
        }, {
          award: "QUADAR_BUA",
          money: 3e3,
          lineName: "line5"
        }, {
          award: "TRIPLE_BUA",
          money: 1e3,
          lineName: "line21"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line8"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line12"
        } ]
      },
      ref: 267,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0,
      result: 1,
      matrix: "8,2,5,6,10,4,3,8,5,9,5,8,9,7,10",
      linesWin: "19,5,21,8,12",
      haiSao: "",
      prize: 6e3,
      currentMoney: 10015300
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line1"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line2"
        }, {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line3"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line4"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line5"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line6"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line7"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line8"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line9"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line10"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line11"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line12"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line13"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line14"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line15"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line16"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line17"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line18"
        }, {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line19"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line20"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line21"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line22"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line23"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line24"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line25"
        } ]
      },
      ref: 271,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0,
      result: 1,
      matrix: "9,2,2,8,9,9,10,4,5,9,10,9,9,10,9",
      linesWin: "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25",
      haiSao: "",
      prize: 9600,
      currentMoney: 10017100
    }, {
      awardsDetail: {
        object: [ {
          award: "PENTA_DAI_BANG",
          money: 3e3,
          lineName: "line12"
        } ]
      },
      ref: 273,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0,
      result: 1,
      matrix: "8,9,10,10,8,1,8,8,8,3,9,3,10,3,3",
      linesWin: "12",
      haiSao: "",
      prize: 3e3,
      currentMoney: 10017600
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_JACK_POT",
          money: 3e3,
          lineName: "line10"
        } ]
      },
      ref: 280,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0,
      result: 3,
      matrix: "9,9,10,5,9,3,10,3,9,9,8,3,5,10,10",
      linesWin: "10",
      haiSao: "",
      prize: 15e4,
      currentMoney: 10010400
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line18"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line3"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line4"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line20"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line8"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line9"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line25"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line12"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line13"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line15"
        } ]
      },
      ref: 282,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0,
      result: 1,
      matrix: "9,2,5,10,8,8,9,9,8,8,9,9,9,6,10",
      linesWin: "18,3,4,20,8,9,25,12,13,15",
      haiSao: "",
      prize: 4e3,
      currentMoney: 10011600
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line1"
        }, {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line18"
        }, {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line4"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line20"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line9"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line10"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line11"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line13"
        } ]
      },
      ref: 287,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0,
      result: 1,
      matrix: "10,2,6,10,7,9,9,9,10,7,9,7,10,8,7",
      linesWin: "1,18,4,20,9,10,11,13",
      haiSao: "",
      prize: 3300,
      currentMoney: 10002700
    }, {
      awardsDetail: {
        object: [ {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line1"
        }, {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line17"
        }, {
          award: "QUADAR_KHIEN",
          money: 2e3,
          lineName: "line3"
        }, {
          award: "QUADAR_KHIEN",
          money: 2e3,
          lineName: "line19"
        }, {
          award: "QUADAR_KHIEN",
          money: 2e3,
          lineName: "line21"
        }, {
          award: "QUADAR_KHIEN",
          money: 2e3,
          lineName: "line9"
        }, {
          award: "QUADAR_KHIEN",
          money: 2e3,
          lineName: "line25"
        }, {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line16"
        } ]
      },
      ref: 290,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0,
      result: 2,
      matrix: "3,6,3,9,10,9,9,2,8,8,6,6,10,2,8",
      linesWin: "1,17,3,19,21,9,25,16",
      haiSao: "",
      prize: 11800,
      currentMoney: 10007e3
    }, {
      awardsDetail: {
        object: [ {
          award: "QUADAR_DAI_BANG",
          money: 700,
          lineName: "line1"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line2"
        }, {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line24"
        }, {
          award: "QUADAR_DAI_BANG",
          money: 700,
          lineName: "line10"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line11"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line14"
        } ]
      },
      ref: 293,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0,
      result: 1,
      matrix: "9,7,9,8,10,8,10,8,8,7,3,2,5,9,7",
      linesWin: "1,2,24,10,11,14",
      haiSao: "",
      prize: 3300,
      currentMoney: 10007700
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line1"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line2"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line3"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line4"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line5"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line6"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line7"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line8"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line9"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line10"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line11"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line12"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line13"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line14"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line15"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line16"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line17"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line18"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line19"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line20"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line21"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line22"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line23"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line24"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line25"
        } ]
      },
      ref: 297,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0,
      result: 2,
      matrix: "8,9,2,5,1,8,2,7,5,9,10,2,10,4,3",
      linesWin: "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25",
      haiSao: "",
      prize: 10900,
      currentMoney: 10008600
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_KIM_CUONg",
          money: 600,
          lineName: "line19"
        }, {
          award: "TRIPLE_KIM_CUONg",
          money: 600,
          lineName: "line5"
        }, {
          award: "TRIPLE_KIM_CUONg",
          money: 600,
          lineName: "line21"
        }, {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line8"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line12"
        } ]
      },
      ref: 298,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0,
      result: 1,
      matrix: "9,10,7,8,7,5,2,9,10,3,7,5,10,9,8",
      linesWin: "19,5,21,8,12",
      haiSao: "",
      prize: 2800,
      currentMoney: 10008900
    }, {
      awardsDetail: {
        object: [ {
          award: "PENTA_RADAR",
          money: 1100,
          lineName: "line8"
        }, {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line9"
        }, {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line12"
        }, {
          award: "PENTA_RADAR",
          money: 1100,
          lineName: "line13"
        } ]
      },
      ref: 300,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0,
      result: 1,
      matrix: "10,2,5,5,8,7,9,10,2,10,10,5,8,3,10",
      linesWin: "8,9,12,13",
      haiSao: "",
      prize: 3200,
      currentMoney: 10007100
    }, {
      awardsDetail: {
        object: [ {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line18"
        }, {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line19"
        }, {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line4"
        }, {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line20"
        }, {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line5"
        }, {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line21"
        }, {
          award: "PENTA_RADAR",
          money: 1100,
          lineName: "line8"
        }, {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line12"
        } ]
      },
      ref: 308,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0,
      result: 1,
      matrix: "10,6,9,2,9,3,10,10,7,8,9,2,10,5,10",
      linesWin: "18,19,4,20,5,21,8,12",
      haiSao: "",
      prize: 4900,
      currentMoney: 9996200
    }, {
      awardsDetail: {
        object: [ {
          award: "QUADAR_DAI_BANG",
          money: 700,
          lineName: "line19"
        }, {
          award: "QUADAR_DAI_BANG",
          money: 700,
          lineName: "line5"
        }, {
          award: "QUADAR_DAI_BANG",
          money: 700,
          lineName: "line21"
        }, {
          award: "PENTA_DAI_BANG",
          money: 3e3,
          lineName: "line9"
        }, {
          award: "QUADAR_DAI_BANG",
          money: 700,
          lineName: "line13"
        } ]
      },
      ref: 313,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0,
      result: 1,
      matrix: "9,2,8,2,8,9,9,8,0,9,8,2,10,7,0",
      linesWin: "19,5,21,9,13",
      haiSao: "",
      prize: 5800,
      currentMoney: 9991900
    }, {
      awardsDetail: {
        object: [ {
          award: "PENTA_NGUOI_NHEN",
          money: 2e3,
          lineName: "line2"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line19"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line5"
        }, {
          award: "PENTA_NGUOI_NHEN",
          money: 2e3,
          lineName: "line21"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line8"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line24"
        }, {
          award: "PENTA_NGUOI_NHEN",
          money: 2e3,
          lineName: "line9"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line12"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line13"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line14"
        } ]
      },
      ref: 322,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0,
      result: 1,
      matrix: "9,2,9,9,9,6,6,9,3,6,9,10,4,8,9",
      linesWin: "2,19,5,21,8,24,9,12,13,14",
      haiSao: "",
      prize: 8800,
      currentMoney: 9978800
    }, {
      awardsDetail: {
        object: [ {
          award: "PENTA_RADAR",
          money: 1100,
          lineName: "line1"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line19"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line5"
        }, {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line21"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line10"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line11"
        } ]
      },
      ref: 323,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0,
      result: 1,
      matrix: "3,2,9,9,8,10,3,10,10,10,9,5,6,7,8",
      linesWin: "1,19,5,21,10,11",
      haiSao: "",
      prize: 3100,
      currentMoney: 9979400
    }, {
      awardsDetail: {
        object: [ {
          award: "QUADAR_DAI_BANG",
          money: 700,
          lineName: "line19"
        }, {
          award: "QUADAR_DAI_BANG",
          money: 700,
          lineName: "line5"
        }, {
          award: "QUADAR_DAI_BANG",
          money: 700,
          lineName: "line24"
        }, {
          award: "QUADAR_DAI_BANG",
          money: 700,
          lineName: "line14"
        } ]
      },
      ref: 326,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0,
      result: 1,
      matrix: "8,3,8,1,3,6,8,10,9,8,8,8,7,2,9",
      linesWin: "19,5,24,14",
      haiSao: "",
      prize: 2800,
      currentMoney: 9976e3
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line1"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line2"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line3"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line4"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line5"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line6"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line7"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line8"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line9"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line10"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line11"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line12"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line13"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line14"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line15"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line16"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line17"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line18"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line19"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line20"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line21"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line22"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line23"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line24"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line25"
        } ]
      },
      ref: 327,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0,
      result: 2,
      matrix: "10,6,9,0,6,8,10,9,3,9,8,2,2,9,8",
      linesWin: "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25",
      haiSao: "",
      prize: 10900,
      currentMoney: 9984400
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_JACK_POT",
          money: 3e3,
          lineName: "line1"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line2"
        }, {
          award: "TRIPLE_KHIEN",
          money: 1e3,
          lineName: "line3"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line4"
        }, {
          award: "QUADAR_KHIEN",
          money: 2e3,
          lineName: "line5"
        }, {
          award: "TRIPLE_JACK_POT",
          money: 3e3,
          lineName: "line6"
        }, {
          award: "TRIPLE_JACK_POT",
          money: 3e3,
          lineName: "line7"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line8"
        }, {
          award: "TRIPLE_KHIEN",
          money: 1e3,
          lineName: "line9"
        }, {
          award: "TRIPLE_JACK_POT",
          money: 3e3,
          lineName: "line10"
        }, {
          award: "TRIPLE_JACK_POT",
          money: 3e3,
          lineName: "line11"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line12"
        }, {
          award: "QUADAR_KHIEN",
          money: 2e3,
          lineName: "line13"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line14"
        }, {
          award: "QUADAR_KHIEN",
          money: 2e3,
          lineName: "line15"
        }, {
          award: "TRIPLE_JACK_POT",
          money: 3e3,
          lineName: "line16"
        }, {
          award: "TRIPLE_JACK_POT",
          money: 3e3,
          lineName: "line17"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line18"
        }, {
          award: "TRIPLE_KHIEN",
          money: 1e3,
          lineName: "line19"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line20"
        }, {
          award: "TRIPLE_KHIEN",
          money: 1e3,
          lineName: "line21"
        }, {
          award: "TRIPLE_JACK_POT",
          money: 3e3,
          lineName: "line22"
        }, {
          award: "TRIPLE_JACK_POT",
          money: 3e3,
          lineName: "line23"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line24"
        }, {
          award: "TRIPLE_KHIEN",
          money: 1e3,
          lineName: "line25"
        } ]
      },
      ref: 333,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0,
      result: 6,
      matrix: "8,9,6,5,8,3,2,9,6,10,6,9,2,10,3",
      linesWin: "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25",
      haiSao: "",
      prize: 135e3,
      currentMoney: 10012800
    }, {
      awardsDetail: {
        object: [ {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line4"
        }, {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line6"
        }, {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line23"
        }, {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line11"
        }, {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line12"
        }, {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line14"
        } ]
      },
      ref: 334,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0,
      result: 1,
      matrix: "10,9,2,3,8,9,10,2,0,3,8,5,1,2,8",
      linesWin: "4,6,23,11,12,14",
      haiSao: "",
      prize: 3300,
      currentMoney: 10013600
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_BUA",
          money: 1e3,
          lineName: "line2"
        }, {
          award: "TRIPLE_BUA",
          money: 1e3,
          lineName: "line18"
        }, {
          award: "TRIPLE_BUA",
          money: 1e3,
          lineName: "line8"
        } ]
      },
      ref: 336,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0,
      result: 1,
      matrix: "5,5,10,6,8,9,8,8,8,9,3,6,2,3,4",
      linesWin: "2,18,8",
      haiSao: "",
      prize: 3e3,
      currentMoney: 10012400
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line17"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line18"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line4"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line20"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line7"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line23"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line9"
        }, {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line13"
        } ]
      },
      ref: 341,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0,
      result: 1,
      matrix: "10,5,5,8,6,10,2,9,9,7,9,3,10,8,10",
      linesWin: "17,18,4,20,7,23,9,13",
      haiSao: "",
      prize: 2800,
      currentMoney: 10002700
    }, {
      awardsDetail: {
        object: [ {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line1"
        }, {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line2"
        }, {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line3"
        }, {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line4"
        }, {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line5"
        }, {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line6"
        }, {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line7"
        }, {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line8"
        }, {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line9"
        }, {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line10"
        }, {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line11"
        }, {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line12"
        }, {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line13"
        }, {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line14"
        }, {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line15"
        }, {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line16"
        }, {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line17"
        }, {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line18"
        }, {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line19"
        }, {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line20"
        }, {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line21"
        }, {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line22"
        }, {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line23"
        }, {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line24"
        }, {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line25"
        } ]
      },
      ref: 344,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0,
      result: 2,
      matrix: "10,2,9,8,0,10,10,9,2,6,9,2,2,2,8",
      linesWin: "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25",
      haiSao: "",
      prize: 13300,
      currentMoney: 10008500
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line17"
        }, {
          award: "TRIPLE_KHIEN",
          money: 1e3,
          lineName: "line19"
        }, {
          award: "TRIPLE_KHIEN",
          money: 1e3,
          lineName: "line5"
        }, {
          award: "TRIPLE_KHIEN",
          money: 1e3,
          lineName: "line21"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line7"
        }, {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line23"
        } ]
      },
      ref: 350,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0,
      result: 1,
      matrix: "3,9,6,9,10,9,8,5,3,8,6,2,9,1,6",
      linesWin: "17,19,5,21,7,23",
      haiSao: "",
      prize: 4400,
      currentMoney: 10003600
    }, {
      awardsDetail: {
        object: [ {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line1"
        }, {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line2"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line3"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line4"
        }, {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line5"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line6"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line7"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line8"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line9"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line10"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line11"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line12"
        }, {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line13"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line14"
        }, {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line15"
        }, {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line16"
        }, {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line17"
        }, {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line18"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line19"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line20"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line21"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line22"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line23"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line24"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line25"
        } ]
      },
      ref: 351,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0,
      result: 2,
      matrix: "10,0,2,10,9,9,2,3,9,6,9,5,10,4,7",
      linesWin: "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25",
      haiSao: "",
      prize: 10800,
      currentMoney: 10011900
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_JACK_POT",
          money: 3e3,
          lineName: "line17"
        }, {
          award: "TRIPLE_JACK_POT",
          money: 3e3,
          lineName: "line4"
        } ]
      },
      ref: 354,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0,
      result: 3,
      matrix: "3,4,5,4,10,3,3,6,10,8,9,4,3,8,10",
      linesWin: "17,4",
      haiSao: "",
      prize: 135e3,
      currentMoney: 10011900
    }, {
      awardsDetail: {
        object: [ {
          award: "PENTA_DAI_BANG",
          money: 3e3,
          lineName: "line18"
        }, {
          award: "PENTA_DAI_BANG",
          money: 3e3,
          lineName: "line4"
        }, {
          award: "PENTA_DAI_BANG",
          money: 3e3,
          lineName: "line20"
        } ]
      },
      ref: 361,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0,
      result: 1,
      matrix: "8,2,1,2,8,10,8,3,4,7,0,6,8,9,10",
      linesWin: "18,4,20",
      haiSao: "",
      prize: 9e3,
      currentMoney: 10006300
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line4"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line20"
        }, {
          award: "QUADAR_DAI_BANG",
          money: 700,
          lineName: "line21"
        }, {
          award: "QUADAR_DAI_BANG",
          money: 700,
          lineName: "line6"
        }, {
          award: "QUADAR_DAI_BANG",
          money: 700,
          lineName: "line23"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line24"
        }, {
          award: "QUADAR_DAI_BANG",
          money: 700,
          lineName: "line25"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line11"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line12"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line14"
        } ]
      },
      ref: 364,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0,
      result: 1,
      matrix: "10,8,9,8,9,8,10,2,6,9,8,10,9,4,7",
      linesWin: "4,20,21,6,23,24,25,11,12,14",
      haiSao: "",
      prize: 4800,
      currentMoney: 10005200
    }, {
      awardsDetail: {
        object: [ {
          award: "PENTA_RADAR",
          money: 1100,
          lineName: "line3"
        }, {
          award: "PENTA_RADAR",
          money: 1100,
          lineName: "line19"
        }, {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line20"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line6"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line23"
        }, {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line24"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line9"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line11"
        } ]
      },
      ref: 376,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0,
      result: 1,
      matrix: "10,9,3,7,6,9,8,2,8,1,10,10,9,10,10",
      linesWin: "3,19,20,6,23,24,9,11",
      haiSao: "",
      prize: 4700,
      currentMoney: 9986800
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line17"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line2"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line3"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line7"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line23"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line24"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line25"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line14"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line15"
        } ]
      },
      ref: 377,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0,
      result: 1,
      matrix: "10,10,10,1,10,9,6,3,3,3,9,2,9,7,9",
      linesWin: "17,2,3,7,23,24,25,14,15",
      haiSao: "",
      prize: 3300,
      currentMoney: 9987600
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line2"
        }, {
          award: "PENTA_NGUOI_NHEN",
          money: 2e3,
          lineName: "line3"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line24"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line25"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line14"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line15"
        } ]
      },
      ref: 378,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0,
      result: 1,
      matrix: "10,2,10,5,8,4,2,5,8,8,9,3,9,9,9",
      linesWin: "2,3,24,25,14,15",
      haiSao: "",
      prize: 3700,
      currentMoney: 9988800
    }, {
      awardsDetail: {
        object: [ {
          award: "QUADAR_DAI_BANG",
          money: 700,
          lineName: "line1"
        }, {
          award: "QUADAR_DAI_BANG",
          money: 700,
          lineName: "line17"
        }, {
          award: "QUADAR_DAI_BANG",
          money: 700,
          lineName: "line18"
        }, {
          award: "QUADAR_DAI_BANG",
          money: 700,
          lineName: "line4"
        }, {
          award: "QUADAR_DAI_BANG",
          money: 700,
          lineName: "line20"
        }, {
          award: "QUADAR_DAI_BANG",
          money: 700,
          lineName: "line7"
        }, {
          award: "QUADAR_DAI_BANG",
          money: 700,
          lineName: "line23"
        }, {
          award: "QUADAR_DAI_BANG",
          money: 700,
          lineName: "line8"
        }, {
          award: "QUADAR_DAI_BANG",
          money: 700,
          lineName: "line10"
        }, {
          award: "QUADAR_DAI_BANG",
          money: 700,
          lineName: "line11"
        }, {
          award: "QUADAR_DAI_BANG",
          money: 700,
          lineName: "line12"
        } ]
      },
      ref: 379,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0,
      result: 1,
      matrix: "8,2,9,2,10,8,10,8,3,6,3,9,8,4,10",
      linesWin: "1,17,18,4,20,7,23,8,10,11,12",
      haiSao: "",
      prize: 7700,
      currentMoney: 9994e3
    }, {
      awardsDetail: {
        object: [ {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line1"
        }, {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line17"
        }, {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line5"
        }, {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line13"
        }, {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line15"
        }, {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line16"
        } ]
      },
      ref: 381,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0,
      result: 1,
      matrix: "6,8,8,3,7,9,9,1,3,8,9,8,2,2,5",
      linesWin: "1,17,5,13,15,16",
      haiSao: "",
      prize: 3600,
      currentMoney: 9993400
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_JACK_POT",
          money: 3e3,
          lineName: "line18"
        }, {
          award: "TRIPLE_JACK_POT",
          money: 3e3,
          lineName: "line4"
        }, {
          award: "TRIPLE_JACK_POT",
          money: 3e3,
          lineName: "line20"
        }, {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line6"
        }, {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line22"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line16"
        } ]
      },
      ref: 383,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0,
      result: 3,
      matrix: "3,2,10,10,10,10,10,4,8,5,8,9,3,10,9",
      linesWin: "18,4,20,6,22,16",
      haiSao: "",
      prize: 103e3,
      currentMoney: 9998700
    }, {
      awardsDetail: {
        object: [ {
          award: "PENTA_NGUOI_NHEN",
          money: 2e3,
          lineName: "line18"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line3"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line4"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line20"
        }, {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line25"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line15"
        } ]
      },
      ref: 384,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0,
      result: 1,
      matrix: "9,4,6,9,9,10,6,8,8,9,9,2,9,7,5",
      linesWin: "18,3,4,20,25,15",
      haiSao: "",
      prize: 4200,
      currentMoney: 10000400
    }, {
      awardsDetail: {
        object: [ {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line18"
        }, {
          award: "QUADAR_KIM_CUONg",
          money: 1e3,
          lineName: "line19"
        }, {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line4"
        }, {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line20"
        }, {
          award: "QUADAR_KIM_CUONg",
          money: 1e3,
          lineName: "line5"
        }, {
          award: "QUADAR_KIM_CUONg",
          money: 1e3,
          lineName: "line21"
        } ]
      },
      ref: 386,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0,
      result: 1,
      matrix: "10,9,7,9,5,6,10,9,2,10,7,2,10,10,10",
      linesWin: "18,19,4,20,5,21",
      haiSao: "",
      prize: 4500,
      currentMoney: 9999900
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_BUA",
          money: 1e3,
          lineName: "line18"
        }, {
          award: "TRIPLE_BUA",
          money: 1e3,
          lineName: "line4"
        }, {
          award: "TRIPLE_BUA",
          money: 1e3,
          lineName: "line20"
        }, {
          award: "TRIPLE_NAM_TAY",
          money: 2e3,
          lineName: "line9"
        }, {
          award: "TRIPLE_NAM_TAY",
          money: 2e3,
          lineName: "line13"
        } ]
      },
      ref: 388,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0,
      result: 1,
      matrix: "5,2,8,9,1,10,10,4,7,4,4,0,5,8,9",
      linesWin: "18,4,20,9,13",
      haiSao: "",
      prize: 7e3,
      currentMoney: 10001900
    }, {
      awardsDetail: {
        object: [ {
          award: "PENTA_NGUOI_NHEN",
          money: 2e3,
          lineName: "line6"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line22"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line8"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line12"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line16"
        } ]
      },
      ref: 392,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0,
      result: 1,
      matrix: "8,2,9,9,8,9,6,8,5,9,10,7,7,10,10",
      linesWin: "6,22,8,12,16",
      haiSao: "",
      prize: 3800,
      currentMoney: 9997200
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_JACK_POT",
          money: 3e3,
          lineName: "line6"
        }, {
          award: "TRIPLE_JACK_POT",
          money: 3e3,
          lineName: "line22"
        }, {
          award: "TRIPLE_JACK_POT",
          money: 3e3,
          lineName: "line7"
        }, {
          award: "TRIPLE_JACK_POT",
          money: 3e3,
          lineName: "line23"
        }, {
          award: "TRIPLE_JACK_POT",
          money: 3e3,
          lineName: "line10"
        }, {
          award: "TRIPLE_JACK_POT",
          money: 3e3,
          lineName: "line11"
        } ]
      },
      ref: 396,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0,
      result: 3,
      matrix: "7,3,8,9,9,3,9,8,3,10,8,3,2,7,10",
      linesWin: "6,22,7,23,10,11",
      haiSao: "",
      prize: 18e4,
      currentMoney: 10006100
    }, {
      awardsDetail: {
        object: [ {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line17"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line6"
        }, {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line22"
        }, {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line7"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line23"
        }, {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line16"
        } ]
      },
      ref: 397,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0,
      result: 1,
      matrix: "8,10,10,5,9,10,2,3,10,9,8,4,10,10,8",
      linesWin: "17,6,22,7,23,16",
      haiSao: "",
      prize: 222600,
      currentMoney: 10006200
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_JACK_POT",
          money: 3e3,
          lineName: "line1"
        } ]
      },
      ref: 398,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0,
      result: 3,
      matrix: "10,10,9,5,10,3,3,3,6,9,9,10,8,9,4",
      linesWin: "1",
      haiSao: "",
      prize: 133e3,
      currentMoney: 10006700
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line17"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line2"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line18"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line4"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line20"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line6"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line22"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line7"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line23"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line24"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line14"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line16"
        } ]
      },
      ref: 400,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0,
      result: 1,
      matrix: "8,2,8,9,6,8,8,3,0,3,9,9,8,9,10",
      linesWin: "17,2,18,4,20,6,22,7,23,24,14,16",
      haiSao: "",
      prize: 6e3,
      currentMoney: 10007700
    }, {
      awardsDetail: {
        object: [ {
          award: "PENTA_NGUOI_NHEN",
          money: 2e3,
          lineName: "line1"
        }, {
          award: "QUADAR_DAI_BANG",
          money: 700,
          lineName: "line2"
        }, {
          award: "QUADAR_DAI_BANG",
          money: 700,
          lineName: "line3"
        }, {
          award: "QUADAR_DAI_BANG",
          money: 700,
          lineName: "line4"
        }, {
          award: "QUADAR_DAI_BANG",
          money: 700,
          lineName: "line5"
        }, {
          award: "PENTA_NGUOI_NHEN",
          money: 2e3,
          lineName: "line6"
        }, {
          award: "PENTA_NGUOI_NHEN",
          money: 2e3,
          lineName: "line7"
        }, {
          award: "QUADAR_DAI_BANG",
          money: 700,
          lineName: "line8"
        }, {
          award: "QUADAR_DAI_BANG",
          money: 700,
          lineName: "line9"
        }, {
          award: "PENTA_NGUOI_NHEN",
          money: 2e3,
          lineName: "line10"
        }, {
          award: "PENTA_NGUOI_NHEN",
          money: 2e3,
          lineName: "line11"
        }, {
          award: "QUADAR_DAI_BANG",
          money: 700,
          lineName: "line12"
        }, {
          award: "QUADAR_DAI_BANG",
          money: 700,
          lineName: "line13"
        }, {
          award: "QUADAR_DAI_BANG",
          money: 700,
          lineName: "line14"
        }, {
          award: "QUADAR_DAI_BANG",
          money: 700,
          lineName: "line15"
        }, {
          award: "PENTA_NGUOI_NHEN",
          money: 2e3,
          lineName: "line16"
        }, {
          award: "PENTA_NGUOI_NHEN",
          money: 2e3,
          lineName: "line17"
        }, {
          award: "QUADAR_DAI_BANG",
          money: 700,
          lineName: "line18"
        }, {
          award: "QUADAR_DAI_BANG",
          money: 700,
          lineName: "line19"
        }, {
          award: "QUADAR_DAI_BANG",
          money: 700,
          lineName: "line20"
        }, {
          award: "QUADAR_DAI_BANG",
          money: 700,
          lineName: "line21"
        }, {
          award: "PENTA_NGUOI_NHEN",
          money: 2e3,
          lineName: "line22"
        }, {
          award: "PENTA_NGUOI_NHEN",
          money: 2e3,
          lineName: "line23"
        }, {
          award: "QUADAR_DAI_BANG",
          money: 700,
          lineName: "line24"
        }, {
          award: "QUADAR_DAI_BANG",
          money: 700,
          lineName: "line25"
        } ]
      },
      ref: 9889636,
      result: 2,
      matrix: "8,9,10,2,7,9,2,8,10,9,8,7,2,7,9",
      linesWin: "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25",
      haiSao: "",
      prize: 29200,
      currentMoney: 39960800,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "QUADAR_DAI_BANG",
          money: 700,
          lineName: "line4"
        }, {
          award: "QUADAR_KIM_CUONg",
          money: 1e3,
          lineName: "line6"
        }, {
          award: "QUADAR_KIM_CUONg",
          money: 1e3,
          lineName: "line22"
        }, {
          award: "QUADAR_KIM_CUONg",
          money: 1e3,
          lineName: "line7"
        }, {
          award: "QUADAR_KIM_CUONg",
          money: 1e3,
          lineName: "line23"
        }, {
          award: "QUADAR_KIM_CUONg",
          money: 1e3,
          lineName: "line10"
        }, {
          award: "QUADAR_KIM_CUONg",
          money: 1e3,
          lineName: "line11"
        }, {
          award: "QUADAR_DAI_BANG",
          money: 700,
          lineName: "line12"
        }, {
          award: "QUADAR_DAI_BANG",
          money: 700,
          lineName: "line14"
        } ]
      },
      ref: 9889639,
      result: 2,
      matrix: "8,7,10,5,3,7,8,8,2,0,10,7,2,3,9",
      linesWin: "4,6,22,7,23,10,11,12,14",
      haiSao: "",
      prize: 8100,
      currentMoney: 39962800,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "QUADAR_BUA",
          money: 3e3,
          lineName: "line3"
        }, {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line6"
        }, {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line22"
        }, {
          award: "QUADAR_BUA",
          money: 3e3,
          lineName: "line25"
        }, {
          award: "QUADAR_BUA",
          money: 3e3,
          lineName: "line15"
        }, {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line16"
        } ]
      },
      ref: 9889658,
      result: 2,
      matrix: "8,2,9,5,6,9,3,10,2,10,5,9,5,8,8",
      linesWin: "3,6,22,25,15,16",
      haiSao: "",
      prize: 10800,
      currentMoney: 39976300,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line17"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line18"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line19"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line4"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line20"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line5"
        }, {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line21"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line7"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line23"
        } ]
      },
      ref: 9889674,
      result: 1,
      matrix: "8,2,9,9,9,8,10,3,10,9,9,2,8,7,10",
      linesWin: "17,18,19,4,20,5,21,7,23",
      haiSao: "",
      prize: 4400,
      currentMoney: 39954100,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "QUADAR_NAM_TAY",
          money: 5e3,
          lineName: "line19"
        }, {
          award: "QUADAR_NAM_TAY",
          money: 5e3,
          lineName: "line5"
        }, {
          award: "QUADAR_NAM_TAY",
          money: 5e3,
          lineName: "line21"
        } ]
      },
      ref: 9889675,
      result: 2,
      matrix: "10,10,4,2,10,7,8,6,2,10,4,2,6,6,9",
      linesWin: "19,5,21",
      haiSao: "",
      prize: 15e3,
      currentMoney: 39966600,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line19"
        }, {
          award: "PENTA_NGUOI_NHEN",
          money: 2e3,
          lineName: "line5"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line21"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line6"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line22"
        }, {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line16"
        } ]
      },
      ref: 9889687,
      result: 1,
      matrix: "10,9,9,0,8,9,2,6,9,3,9,1,3,7,9",
      linesWin: "19,5,21,6,22,16",
      haiSao: "",
      prize: 4200,
      currentMoney: 39952500,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_JACK_POT",
          money: 3e3,
          lineName: "line18"
        }, {
          award: "TRIPLE_JACK_POT",
          money: 3e3,
          lineName: "line4"
        }, {
          award: "TRIPLE_JACK_POT",
          money: 3e3,
          lineName: "line20"
        } ]
      },
      ref: 9889691,
      result: 2,
      matrix: "3,2,9,10,6,10,10,9,9,10,10,9,3,8,10",
      linesWin: "18,4,20",
      haiSao: "",
      prize: 9e4,
      currentMoney: 39953200,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "PENTA_DAI_BANG",
          money: 3e3,
          lineName: "line1"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line2"
        }, {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line3"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line4"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line5"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line6"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line7"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line8"
        }, {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line9"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line10"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line11"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line12"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line13"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line14"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line15"
        }, {
          award: "PENTA_DAI_BANG",
          money: 3e3,
          lineName: "line16"
        }, {
          award: "PENTA_DAI_BANG",
          money: 3e3,
          lineName: "line17"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line18"
        }, {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line19"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line20"
        }, {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line21"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line22"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line23"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line24"
        }, {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line25"
        } ]
      },
      ref: 9889692,
      result: 2,
      matrix: "10,7,5,9,10,8,8,8,8,8,9,2,2,9,3",
      linesWin: "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25",
      haiSao: "",
      prize: 18600,
      currentMoney: 39969300,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_JACK_POT",
          money: 3e3,
          lineName: "line8"
        }, {
          award: "TRIPLE_JACK_POT",
          money: 3e3,
          lineName: "line12"
        } ]
      },
      ref: 9889695,
      result: 1,
      matrix: "3,1,6,5,7,8,2,3,4,6,8,2,10,0,7",
      linesWin: "8,12",
      haiSao: "",
      prize: 156e3,
      currentMoney: 39969200,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line3"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line4"
        }, {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line6"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line7"
        }, {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line9"
        }, {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line10"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line11"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line12"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line14"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line19"
        }, {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line21"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line22"
        }, {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line23"
        }, {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line25"
        } ]
      },
      ref: 9889698,
      result: 1,
      matrix: "8,9,9,9,10,9,8,2,7,3,9,9,8,4,3",
      linesWin: "3,4,6,7,9,10,11,12,14,19,21,22,23,25",
      haiSao: "",
      prize: 7100,
      currentMoney: 39968800,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_JACK_POT",
          money: 3e3,
          lineName: "line2"
        }, {
          award: "TRIPLE_JACK_POT",
          money: 3e3,
          lineName: "line18"
        }, {
          award: "TRIPLE_JACK_POT",
          money: 3e3,
          lineName: "line8"
        } ]
      },
      ref: 9889701,
      result: 2,
      matrix: "3,3,8,9,9,8,4,2,9,3,10,9,7,6,4",
      linesWin: "2,18,8",
      haiSao: "",
      prize: 9e4,
      currentMoney: 39971900,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line1"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line17"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line4"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line5"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line12"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line13"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line14"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line15"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line16"
        } ]
      },
      ref: 9889706,
      result: 1,
      matrix: "8,9,6,8,9,8,8,9,10,9,8,10,2,0,8",
      linesWin: "1,17,4,5,12,13,14,15,16",
      haiSao: "",
      prize: 4500,
      currentMoney: 39966300,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line1"
        }, {
          award: "QUADAR_DAI_BANG",
          money: 700,
          lineName: "line2"
        }, {
          award: "PENTA_RADAR",
          money: 1100,
          lineName: "line3"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line4"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line5"
        }, {
          award: "QUADAR_DAI_BANG",
          money: 700,
          lineName: "line6"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line7"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line8"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line9"
        }, {
          award: "QUADAR_DAI_BANG",
          money: 700,
          lineName: "line10"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line11"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line12"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line13"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line14"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line15"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line16"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line17"
        }, {
          award: "QUADAR_DAI_BANG",
          money: 700,
          lineName: "line18"
        }, {
          award: "PENTA_RADAR",
          money: 1100,
          lineName: "line19"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line20"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line21"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line22"
        }, {
          award: "QUADAR_DAI_BANG",
          money: 700,
          lineName: "line23"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line24"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line25"
        } ]
      },
      ref: 9889710,
      result: 2,
      matrix: "8,5,6,8,7,8,2,3,6,3,10,8,2,10,10",
      linesWin: "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25",
      haiSao: "",
      prize: 13500,
      currentMoney: 39970700,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line6"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line22"
        }, {
          award: "TRIPLE_JACK_POT",
          money: 3e3,
          lineName: "line8"
        }, {
          award: "TRIPLE_JACK_POT",
          money: 3e3,
          lineName: "line12"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line16"
        } ]
      },
      ref: 9889718,
      result: 1,
      matrix: "3,1,9,8,9,9,2,3,0,9,8,2,7,0,10",
      linesWin: "6,22,8,12,16",
      haiSao: "",
      prize: 76200,
      currentMoney: 39964e3,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line1"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line17"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line2"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line18"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line4"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line6"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line23"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line8"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line11"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line12"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line14"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line16"
        } ]
      },
      ref: 9889719,
      result: 1,
      matrix: "8,8,7,10,7,8,8,2,9,9,3,10,6,9,7",
      linesWin: "1,17,2,18,4,6,23,8,11,12,14,16",
      haiSao: "",
      prize: 6e3,
      currentMoney: 39967500,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line3"
        }, {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line19"
        }, {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line5"
        }, {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line21"
        }, {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line9"
        }, {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line25"
        }, {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line13"
        }, {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line15"
        } ]
      },
      ref: 9889742,
      result: 1,
      matrix: "4,9,3,2,10,10,9,2,5,8,9,9,7,10,8",
      linesWin: "3,19,5,21,9,25,13,15",
      haiSao: "",
      prize: 4800,
      currentMoney: 39958600,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line1"
        }, {
          award: "TRIPLE_NAM_TAY",
          money: 2e3,
          lineName: "line2"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line3"
        }, {
          award: "TRIPLE_NAM_TAY",
          money: 2e3,
          lineName: "line4"
        }, {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line5"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line6"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line7"
        }, {
          award: "QUADAR_NAM_TAY",
          money: 5e3,
          lineName: "line8"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line9"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line10"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line11"
        }, {
          award: "TRIPLE_NAM_TAY",
          money: 2e3,
          lineName: "line12"
        }, {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line13"
        }, {
          award: "TRIPLE_NAM_TAY",
          money: 2e3,
          lineName: "line14"
        }, {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line15"
        }, {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line16"
        }, {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line17"
        }, {
          award: "TRIPLE_NAM_TAY",
          money: 2e3,
          lineName: "line18"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line19"
        }, {
          award: "QUADAR_NAM_TAY",
          money: 5e3,
          lineName: "line20"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line21"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line22"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line23"
        }, {
          award: "QUADAR_NAM_TAY",
          money: 5e3,
          lineName: "line24"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line25"
        } ]
      },
      ref: 9889753,
      result: 2,
      matrix: "4,8,8,3,9,10,10,0,10,5,10,2,2,4,9",
      linesWin: "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25",
      haiSao: "",
      prize: 31300,
      currentMoney: 39967700,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_JACK_POT",
          money: 3e3,
          lineName: "line3"
        }, {
          award: "TRIPLE_JACK_POT",
          money: 3e3,
          lineName: "line25"
        }, {
          award: "TRIPLE_JACK_POT",
          money: 3e3,
          lineName: "line15"
        } ]
      },
      ref: 9889769,
      result: 2,
      matrix: "8,2,5,7,8,10,4,9,7,7,3,2,3,8,9",
      linesWin: "3,25,15",
      haiSao: "",
      prize: 159e3,
      currentMoney: 39952100,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line1"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line2"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line3"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line4"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line5"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line6"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line7"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line8"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line9"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line10"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line11"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line12"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line13"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line14"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line15"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line16"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line17"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line18"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line19"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line20"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line21"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line22"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line23"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line24"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line25"
        } ]
      },
      ref: 9889770,
      result: 2,
      matrix: "8,2,9,4,8,8,5,6,6,10,8,10,2,9,3",
      linesWin: "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25",
      haiSao: "",
      prize: 12500,
      currentMoney: 39962100,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "QUADAR_DAIBANG",
          lineName: "line1"
        }, {
          award: "PENTA_NGUOINHEN",
          lineName: "line3"
        }, {
          award: "TRIPLE_NGUOINHEN",
          lineName: "line9"
        }, {
          award: "QUADAR_DAIBANG",
          lineName: "line16"
        }, {
          award: "PENTA_DAIBANG",
          lineName: "line17"
        }, {
          award: "PENTA_NGUOINHEN",
          lineName: "line19"
        } ]
      },
      ref: 9889784,
      result: 2,
      matrix: "6,5,8,10,7,8,8,2,8,6,9,9,7,9,10",
      linesWin: "1,3,9,16,17,19",
      haiSao: "",
      prize: 13600,
      currentMoney: 39964800,
      freeSpin: 0,
      isFree: true,
      itemsWild: "1,2",
      ratio: 2
    }, {
      awardsDetail: {
        object: [ {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line17"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line2"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line19"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line5"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line21"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line7"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line23"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line24"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line14"
        } ]
      },
      ref: 9889785,
      result: 1,
      matrix: "8,1,8,6,9,10,2,1,10,3,8,2,10,9,10",
      linesWin: "17,2,19,5,21,7,23,24,14",
      haiSao: "",
      prize: 4100,
      currentMoney: 39966400,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "PENTA_NGUOI_NHEN",
          money: 2e3,
          lineName: "line2"
        }, {
          award: "PENTA_NGUOI_NHEN",
          money: 2e3,
          lineName: "line24"
        }, {
          award: "PENTA_NGUOI_NHEN",
          money: 2e3,
          lineName: "line14"
        } ]
      },
      ref: 9889794,
      result: 1,
      matrix: "9,9,9,4,9,8,7,7,2,10,6,2,3,3,7",
      linesWin: "2,24,14",
      haiSao: "",
      prize: 6e3,
      currentMoney: 39961e3,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line17"
        }, {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line3"
        }, {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line19"
        }, {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line5"
        }, {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line21"
        }, {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line6"
        }, {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line22"
        }, {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line7"
        }, {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line23"
        }, {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line25"
        }, {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line15"
        }, {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line16"
        } ]
      },
      ref: 9889795,
      result: 1,
      matrix: "8,7,10,5,10,10,2,9,10,9,10,2,10,2,4",
      linesWin: "17,3,19,5,21,6,22,7,23,25,15,16",
      haiSao: "",
      prize: 6e3,
      currentMoney: 39964500,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_JACK_POT",
          money: 3e3,
          lineName: "line3"
        }, {
          award: "TRIPLE_JACK_POT",
          money: 3e3,
          lineName: "line19"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line4"
        }, {
          award: "TRIPLE_JACK_POT",
          money: 3e3,
          lineName: "line9"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line12"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line14"
        } ]
      },
      ref: 9889802,
      result: 2,
      matrix: "10,9,7,9,8,6,10,8,4,6,3,3,2,4,8",
      linesWin: "3,19,4,9,12,14",
      haiSao: "",
      prize: 9900,
      currentMoney: 39965500,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_KIM_CUONg",
          money: 600,
          lineName: "line2"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line3"
        }, {
          award: "TRIPLE_KIM_CUONg",
          money: 600,
          lineName: "line24"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line25"
        }, {
          award: "TRIPLE_KIM_CUONg",
          money: 600,
          lineName: "line14"
        }, {
          award: "PENTA_NGUOI_NHEN",
          money: 2e3,
          lineName: "line15"
        } ]
      },
      ref: 9889808,
      result: 1,
      matrix: "7,9,7,8,9,10,8,3,9,3,9,2,9,3,9",
      linesWin: "2,3,24,25,14,15",
      haiSao: "",
      prize: 4600,
      currentMoney: 39959300,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "PENTA_RADAR",
          money: 1100,
          lineName: "line17"
        }, {
          award: "PENTA_RADAR",
          money: 1100,
          lineName: "line6"
        }, {
          award: "PENTA_RADAR",
          money: 1100,
          lineName: "line22"
        }, {
          award: "PENTA_RADAR",
          money: 1100,
          lineName: "line7"
        }, {
          award: "PENTA_RADAR",
          money: 1100,
          lineName: "line23"
        }, {
          award: "PENTA_RADAR",
          money: 1100,
          lineName: "line16"
        } ]
      },
      ref: 9889809,
      result: 1,
      matrix: "5,2,10,10,6,10,8,9,2,10,8,10,10,5,10",
      linesWin: "17,6,22,7,23,16",
      haiSao: "",
      prize: 96600,
      currentMoney: 39963400,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_JACK_POT",
          money: 3e3,
          lineName: "line17"
        }, {
          award: "TRIPLE_JACK_POT",
          money: 3e3,
          lineName: "line7"
        }, {
          award: "TRIPLE_JACK_POT",
          money: 3e3,
          lineName: "line23"
        } ]
      },
      ref: 9889813,
      result: 2,
      matrix: "9,6,10,9,8,3,10,8,8,5,9,2,3,10,10",
      linesWin: "17,7,23",
      haiSao: "",
      prize: 99e3,
      currentMoney: 39965400,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_JACK_POT",
          money: 3e3,
          lineName: "line8"
        }, {
          award: "TRIPLE_JACK_POT",
          money: 3e3,
          lineName: "line12"
        } ]
      },
      ref: 9889816,
      result: 1,
      matrix: "3,2,9,3,7,7,8,3,10,9,1,10,10,8,10",
      linesWin: "8,12",
      haiSao: "",
      prize: 126e3,
      currentMoney: 39965700,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "QUADAR_KIM_CUONg",
          money: 1e3,
          lineName: "line1"
        }, {
          award: "QUADAR_KIM_CUONg",
          money: 1e3,
          lineName: "line17"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line3"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line19"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line20"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line24"
        }, {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line9"
        }, {
          award: "QUADAR_KIM_CUONg",
          money: 1e3,
          lineName: "line16"
        } ]
      },
      ref: 9889822,
      result: 1,
      matrix: "9,1,2,9,8,7,7,8,7,10,9,9,3,5,8",
      linesWin: "1,17,3,19,20,24,9,16",
      haiSao: "",
      prize: 5200,
      currentMoney: 39958100,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line20"
        }, {
          award: "TRIPLE_JACK_POT",
          money: 3e3,
          lineName: "line21"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line22"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line7"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line24"
        }, {
          award: "TRIPLE_JACK_POT",
          money: 3e3,
          lineName: "line25"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line10"
        } ]
      },
      ref: 9889830,
      result: 1,
      matrix: "10,3,10,9,9,10,8,8,8,9,3,10,2,8,8",
      linesWin: "20,21,22,7,24,25,10",
      haiSao: "",
      prize: 127500,
      currentMoney: 39952400,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line1"
        }, {
          award: "TRIPLE_KIM_CUONg",
          money: 600,
          lineName: "line2"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line3"
        }, {
          award: "TRIPLE_KIM_CUONg",
          money: 600,
          lineName: "line4"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line5"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line6"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line7"
        }, {
          award: "TRIPLE_KIM_CUONg",
          money: 600,
          lineName: "line8"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line9"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line10"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line11"
        }, {
          award: "TRIPLE_KIM_CUONg",
          money: 600,
          lineName: "line12"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line13"
        }, {
          award: "TRIPLE_KIM_CUONg",
          money: 600,
          lineName: "line14"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line15"
        }, {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line16"
        }, {
          award: "QUADAR_NGUOI_NHEN",
          money: 600,
          lineName: "line17"
        }, {
          award: "TRIPLE_KIM_CUONg",
          money: 600,
          lineName: "line18"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line19"
        }, {
          award: "TRIPLE_KIM_CUONg",
          money: 600,
          lineName: "line20"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line21"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line22"
        }, {
          award: "TRIPLE_NGUOI_NHEN",
          money: 400,
          lineName: "line23"
        }, {
          award: "TRIPLE_KIM_CUONg",
          money: 600,
          lineName: "line24"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line25"
        } ]
      },
      ref: 9889841,
      result: 2,
      matrix: "7,2,3,4,3,9,10,2,9,7,8,5,8,10,7",
      linesWin: "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25",
      haiSao: "",
      prize: 13e3,
      currentMoney: 39944e3,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line1"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line2"
        }, {
          award: "PENTA_DAI_BANG",
          money: 3e3,
          lineName: "line19"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line5"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line21"
        }, {
          award: "QUADAR_DAI_BANG",
          money: 700,
          lineName: "line24"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line10"
        }, {
          award: "TRIPLE_RADAR",
          money: 300,
          lineName: "line11"
        }, {
          award: "TRIPLE_DAI_BANG",
          money: 500,
          lineName: "line14"
        } ]
      },
      ref: 9889845,
      result: 1,
      matrix: "8,10,8,9,3,10,7,10,9,7,8,2,9,8,8",
      linesWin: "1,2,19,5,21,24,10,11,14",
      haiSao: "",
      prize: 6600,
      currentMoney: 39943800,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line1"
        }, {
          award: "QUADAR_KIM_CUONg",
          money: 1e3,
          lineName: "line2"
        }, {
          award: "QUADAR_KIM_CUONg",
          money: 1e3,
          lineName: "line3"
        }, {
          award: "QUADAR_KIM_CUONg",
          money: 1e3,
          lineName: "line4"
        }, {
          award: "QUADAR_KIM_CUONg",
          money: 1e3,
          lineName: "line5"
        }, {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line6"
        }, {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line7"
        }, {
          award: "QUADAR_KIM_CUONg",
          money: 1e3,
          lineName: "line8"
        }, {
          award: "QUADAR_KIM_CUONg",
          money: 1e3,
          lineName: "line9"
        }, {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line10"
        }, {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line11"
        }, {
          award: "QUADAR_KIM_CUONg",
          money: 1e3,
          lineName: "line12"
        }, {
          award: "QUADAR_KIM_CUONg",
          money: 1e3,
          lineName: "line13"
        }, {
          award: "QUADAR_KIM_CUONg",
          money: 1e3,
          lineName: "line14"
        }, {
          award: "QUADAR_KIM_CUONg",
          money: 1e3,
          lineName: "line15"
        }, {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line16"
        }, {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line17"
        }, {
          award: "QUADAR_KIM_CUONg",
          money: 1e3,
          lineName: "line18"
        }, {
          award: "QUADAR_KIM_CUONg",
          money: 1e3,
          lineName: "line19"
        }, {
          award: "QUADAR_KIM_CUONg",
          money: 1e3,
          lineName: "line20"
        }, {
          award: "QUADAR_KIM_CUONg",
          money: 1e3,
          lineName: "line21"
        }, {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line22"
        }, {
          award: "QUADAR_RADAR",
          money: 500,
          lineName: "line23"
        }, {
          award: "QUADAR_KIM_CUONg",
          money: 1e3,
          lineName: "line24"
        }, {
          award: "QUADAR_KIM_CUONg",
          money: 1e3,
          lineName: "line25"
        } ]
      },
      ref: 9889850,
      result: 2,
      matrix: "7,7,8,2,10,10,2,3,0,9,7,2,2,3,10",
      linesWin: "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25",
      haiSao: "",
      prize: 20500,
      currentMoney: 39953600,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0
    } ];
    cc._RF.pop();
  }, {} ]
}, {}, [ "SlotCayKhe.Cmd", "SlotCayKhe.Controller", "SlotCayKhe.ControllerOffline", "SlotCayKhe.PopupBonus", "SlotCayKhe.PopupGuide", "SlotCayKhe.PopupHistory", "SlotCayKhe.PopupJackpotGame", "SlotCayKhe.PopupJackpotHistory", "SlotCayKhe.SoundControler", "SlotCayKhe.SpinControler", "SlotCayKhe.TrialResults" ]);