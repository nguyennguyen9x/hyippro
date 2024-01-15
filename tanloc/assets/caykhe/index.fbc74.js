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
    const {ccclass: ccclass} = cc._decorator;
    var cmd;
    (function(cmd) {
      class Code {}
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
      cmd.Code = Code;
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
      cmd.SendSubcribe = SendSubcribe;
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
      cmd.SendUnSubcribe = SendUnSubcribe;
      class SendPlay extends Network_OutPacket_1.default {
        constructor(lines) {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.UPDATE_RESULT);
          this.packHeader();
          this.putString(lines);
          this.updateSize();
        }
      }
      cmd.SendPlay = SendPlay;
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
      cmd.SendChangeRoom = SendChangeRoom;
      class ReceiveUpdatePot extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.jackpot = 0;
          this.x2 = 0;
          this.jackpot = this.getLong();
          this.x2 = this.getByte();
        }
      }
      cmd.ReceiveUpdatePot = ReceiveUpdatePot;
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
        }
      }
      cmd.ReceiveResult = ReceiveResult;
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
      cmd.ReceiveSubcribe = ReceiveSubcribe;
    })(cmd = exports.cmd || (exports.cmd = {}));
    exports.default = cmd;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/networks/Network.InPacket": void 0,
    "../../Main/Game/src/networks/Network.OutPacket": void 0
  } ],
  "SlotCayKhe.Controller": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0b9e12l6V5M66fWZpkJdLim", "SlotCayKhe.Controller");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.SlotCayKheController = exports.GameConfig = exports.Line = exports.cell = exports.Award = exports.Item = exports.SpinMode = void 0;
    const SlotCayKhe_Cmd_1 = require("./SlotCayKhe.Cmd");
    const Tween_1 = require("../../Main/Game/src/common/Tween");
    const Network_InPacket_1 = require("../../Main/Game/src/networks/Network.InPacket");
    const SlotNetworkClient_1 = require("../../Main/Game/src/networks/SlotNetworkClient");
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const SlotCayKhe_TrialResults_1 = require("./SlotCayKhe.TrialResults");
    const SlotCayKhe_PopupSelectLine_1 = require("./SlotCayKhe.PopupSelectLine");
    const SlotCayKhe_PopupBonus_1 = require("./SlotCayKhe.PopupBonus");
    const SlotCayKhe_PopupHistory_1 = require("./SlotCayKhe.PopupHistory");
    const SlotCayKhe_PopupJackpotHistory_1 = require("./SlotCayKhe.PopupJackpotHistory");
    const BroadcastReceiver_1 = require("../../Main/Game/src/common/BroadcastReceiver");
    const App_1 = require("../../Main/Game/src/common/App");
    const SlotCayKhe_PopupGuide_1 = require("./SlotCayKhe.PopupGuide");
    const SlotCayKhe_SoundControler_1 = require("./SlotCayKhe.SoundControler");
    const SlotCayKhe_SpinControler_1 = require("./SlotCayKhe.SpinControler");
    const Network_Cmd_1 = require("../../Main/Game/src/networks/Network.Cmd");
    const ErrorLogger_1 = require("../../Main/Game/src/common/ErrorLogger");
    var SpinMode;
    (function(SpinMode) {
      SpinMode[SpinMode["NORMAL"] = 0] = "NORMAL";
      SpinMode[SpinMode["AUTO"] = 1] = "AUTO";
      SpinMode[SpinMode["AUTO_X2"] = 2] = "AUTO_X2";
    })(SpinMode = exports.SpinMode || (exports.SpinMode = {}));
    const {ccclass: ccclass, property: property} = cc._decorator;
    class Item {
      constructor(parameters) {
        this.id = null === parameters || void 0 === parameters ? void 0 : parameters.id;
        this.itemType = null === parameters || void 0 === parameters ? void 0 : parameters.itemType;
        this.name = null === parameters || void 0 === parameters ? void 0 : parameters.name;
        this.value = null === parameters || void 0 === parameters ? void 0 : parameters.value;
      }
    }
    exports.Item = Item;
    class Award {
      constructor(parameters) {
        this.awardType = null === parameters || void 0 === parameters ? void 0 : parameters.awardType;
        this.duplicate = null === parameters || void 0 === parameters ? void 0 : parameters.duplicate;
        this.id = null === parameters || void 0 === parameters ? void 0 : parameters.id;
        this.item = null === parameters || void 0 === parameters ? void 0 : parameters.item;
        this.ratio = null === parameters || void 0 === parameters ? void 0 : parameters.ratio;
        this.value = null === parameters || void 0 === parameters ? void 0 : parameters.value;
      }
    }
    exports.Award = Award;
    class cell {
      constructor(parameters) {
        this.row = null === parameters || void 0 === parameters ? void 0 : parameters.row;
        this.col = null === parameters || void 0 === parameters ? void 0 : parameters.col;
        this.item = null === parameters || void 0 === parameters ? void 0 : parameters.item;
      }
    }
    exports.cell = cell;
    class Line {
      constructor(parameters) {
        this.cells = null === parameters || void 0 === parameters ? void 0 : parameters.cells;
        this.name = null === parameters || void 0 === parameters ? void 0 : parameters.name;
      }
    }
    exports.Line = Line;
    class GameConfig {
      constructor(parameters) {
        this.items = null === parameters || void 0 === parameters ? void 0 : parameters.items;
        this.awards = null === parameters || void 0 === parameters ? void 0 : parameters.awards;
        this.linesConfig = null === parameters || void 0 === parameters ? void 0 : parameters.linesConfig;
      }
    }
    exports.GameConfig = GameConfig;
    let SlotCayKheController = class SlotCayKheController extends cc.Component {
      constructor() {
        super(...arguments);
        this.scene = null;
        this.sprFrameItems = null;
        this.sprFrameItemsBlur = null;
        this.itemTemplate = null;
        this.columns = null;
        this.linesWin = null;
        this.line = null;
        this.listLine = null;
        this.iconWildColumns = null;
        this.lblJackpot = null;
        this.lblCoin = null;
        this.lblWinNow = null;
        this.lblFreeSpinCount = null;
        this.toast = null;
        this.effectWinCash = null;
        this.effectBigWin = null;
        this.effectJackpot = null;
        this.effectBonus = null;
        this.animBigWin = [];
        this.animJackpot = [];
        this.mappingSkeleton = [];
        this.listAnimWild = [];
        this.btnBack = null;
        this.panel = null;
        this.gameView = null;
        this.popupSelectLine = null;
        this.popupBonus = null;
        this.popupGuide = null;
        this.popupHistory = null;
        this.popupJackpotHistory = null;
        this.spinControler = null;
        this.soundControler = null;
        this.ROLL_START_ITEM_COUNT = 25;
        this.ROLL_ADD_ITEM_COUNT = 10;
        this.SPIN_DURATION = 1;
        this.ADD_SPIN_DURATION = .15;
        this.itemHeight = 0;
        this.betIdx = 0;
        this.LISTBET = [ 100, 1e3, 1e4 ];
        this.LISTBETLABEL = [ "100", "1K", "10K" ];
        this.arrLineSelect = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25 ];
        this.canSpin = true;
        this.isTrial = false;
        this.wildItemId = 2;
        this.columnsWild = [];
        this.startSpinTime = 0;
        this.spinMode = SpinMode.NORMAL;
        this.GAME_CONFIG = null;
        this.bundle = null;
      }
      onLoad() {
        BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.SET_SOUND, cc.find("Canvas"));
      }
      start() {
        var _a;
        this.soundControler.initMusicAndSound();
        this.itemHeight = this.itemTemplate.height;
        BroadcastReceiver_1.default.register(BroadcastReceiver_1.default.USER_DISCONNECTED, data => {
          SlotNetworkClient_1.default.getInstance().close();
        }, this);
        SlotNetworkClient_1.default.getInstance().addOnClose(() => {
          this.actBack();
        }, this);
        SlotNetworkClient_1.default.getInstance().addListener(data => {
          let inpacket = new Network_InPacket_1.default(data);
          const startGameTime = new Date().getTime();
          switch (inpacket.getCmdId()) {
           case Network_Cmd_1.default.Code.NOTIFY_DISCONNECT:
            {
              let res = new Network_Cmd_1.default.ReceivedNotifyDisconnect(data);
              cc.log(res);
              ErrorLogger_1.ErrorLogger.sendLogError("USER_DISCONNECTED", "SlotCayKhe", "reason: " + res.reason);
            }
            break;

           case SlotCayKhe_Cmd_1.default.Code.UPDATE_POT:
            {
              let res = new SlotCayKhe_Cmd_1.default.ReceiveUpdatePot(data);
              Tween_1.default.numberTo(this.lblJackpot, res.jackpot, .3);
            }
            break;

           case SlotCayKhe_Cmd_1.default.Code.UPDATE_RESULT:
            {
              let resultSpinTime = new Date().getTime();
              let deltaTime = resultSpinTime - this.startSpinTime;
              cc.log(deltaTime);
              deltaTime > 2e3 && ErrorLogger_1.ErrorLogger.sendLogError("Slow Response", Configs_1.default.App.BUNDLE_NAME.CAYKHE, deltaTime + "ms");
              let res = new SlotCayKhe_Cmd_1.default.ReceiveResult(data);
              cc.log(res);
              res && this.onSpinResult(res);
            }
            break;

           case SlotCayKhe_Cmd_1.default.Code.SUBCRIBE_RESPONSE:
            {
              let res = new SlotCayKhe_Cmd_1.default.ReceiveSubcribe(data);
              cc.log(res);
              let responseTime = (new Date().getTime() - startGameTime) / 1e3;
              this.scheduleOnce(() => {
                this.initLineConfig(res);
              }, responseTime > 2 ? 0 : responseTime);
            }
          }
        }, this);
        SlotNetworkClient_1.default.getInstance().send(new SlotCayKhe_Cmd_1.default.SendSubcribe(this.betIdx));
        this.resetState(true);
        this.spinControler.selectLine.active = true;
        this.gameView.active = false;
        this.spinControler.lblTotalBet.string = Utils_1.default.formatNumber(this.arrLineSelect.length * this.LISTBET[this.betIdx]);
        BroadcastReceiver_1.default.register(BroadcastReceiver_1.default.USER_UPDATE_COIN, () => {
          Tween_1.default.numberTo(this.lblCoin, Configs_1.default.Login.Coin, .3);
        }, this);
        BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN);
        this.settingSoundClick();
        null === (_a = App_1.default.instance) || void 0 === _a ? void 0 : _a.showErrLoading("\u0110ang k\u1ebft n\u1ed1i t\u1edbi server...");
        SlotNetworkClient_1.default.getInstance().checkConnect(() => {
          var _a;
          null === (_a = App_1.default.instance) || void 0 === _a ? void 0 : _a.showLoading(false);
        });
        this.spinControler.spin = this.spin.bind(this);
        this.spinControler.spinAuto = this.toggleAutoOnCheck.bind(this);
        this.spinControler.setClickSpin(this.commonClickHandler.bind(this));
        this.lblFreeSpinCount.string = "";
        this.canSpin = false;
      }
      settingSoundClick() {
        let findBtn = (node, path) => {
          try {
            let btn = node.getComponent(cc.Button) || node.getComponent(cc.Toggle);
            if (btn && 0 == btn.clickEvents.filter(evt => evt && "playSoundClick" == evt.handler).length) {
              let eventHandler = new cc.Component.EventHandler();
              eventHandler.target = this.node;
              eventHandler.component = "SlotCayKhe.Controller";
              eventHandler.handler = "commonClickHandler";
              eventHandler.customEventData = "";
              btn.clickEvents.push(eventHandler);
            }
          } catch (error) {
            cc.warn(path, error);
          }
          node.children.forEach(child => {
            findBtn(child, path + "/" + child.name);
          });
        };
        findBtn(this.scene, "canvas");
      }
      preLoadPopup(namePopup) {
        if (!this.bundle) return;
        switch (namePopup) {
         case "PopupGuide":
          this.bundle.preload("res/prefabs/PopupGuide", (finish, total) => {}, (error, items) => {
            if (error) return console.log("Preload PopupGuide error", error);
          });
          return;

         case "PopupHistory":
          this.bundle.preload("res/prefabs/PopupHistory", (finish, total) => {}, (error, items) => {
            if (error) return console.log("Preload PopupHistory error", error);
          });
          return;

         case "PopupJackpotHistory":
          this.bundle.preload("res/prefabs/PopupJackpotHistory", (finish, total) => {}, (error, items) => {
            if (error) return console.log("Preload PopupJackpotHistory error", error);
          });
          return;

         case "PopupSelectLine":
          this.bundle.preload("res/prefabs/PopupSelectLine", (finish, total) => {}, (error, items) => {
            if (error) return console.log("Preload PopupSelectLine error", error);
          });
          return;

         case "PopupBonus":
          this.bundle.preload("res/prefabs/PopupBonus", (finish, total) => {}, (error, items) => {
            if (error) return console.log("Preload PopupBonus error", error);
          });
          return;

         default:
          ErrorLogger_1.ErrorLogger.sendLogError("preLoadPopup fail", "Slot SIEU_ANH_HUNG", "ITEMS not matching (server " + this.GAME_CONFIG.items.length + " - client " + this.sprFrameItems.getSpriteFrames().length + ")");
        }
      }
      initLineConfig(dataLineConfig) {
        var _a, _b, _c, _d;
        this.canSpin = true;
        let items = [];
        null === (_a = JSON.parse(dataLineConfig.items)) || void 0 === _a ? void 0 : _a.object.filter(item => "NONE" != item.value).forEach(item => {
          items.push(new Item(item));
        });
        let awards = [];
        null === (_b = JSON.parse(dataLineConfig.awards)) || void 0 === _b ? void 0 : _b.object.forEach(award => {
          awards.push(new Award(award));
        });
        let linesConfig = [];
        null === (_c = JSON.parse(dataLineConfig.linesConfig)) || void 0 === _c ? void 0 : _c.object.forEach(line => {
          linesConfig.push(new Line(line));
        });
        this.GAME_CONFIG = new GameConfig({
          items: items,
          awards: awards,
          linesConfig: linesConfig
        });
        cc.log(this.GAME_CONFIG);
        this.initItemRamdom();
        this.lblFreeSpinCount.string = dataLineConfig.freeSpin > 0 ? "FREE " + dataLineConfig.freeSpin.toString() + " L\u01af\u1ee2T" : "";
        this.initLine(null === (_d = this.GAME_CONFIG) || void 0 === _d ? void 0 : _d.linesConfig);
        this.sprFrameItems.getSpriteFrames().length % this.GAME_CONFIG.items.length != 0 && ErrorLogger_1.ErrorLogger.sendLogError("Game config error", "Slot SIEU_ANH_HUNG", "ITEMS not matching (server " + this.GAME_CONFIG.items.length + " - client " + this.sprFrameItems.getSpriteFrames().length + ")");
        0 == this.GAME_CONFIG.linesConfig.filter(line => this.arrLineSelect.indexOf(parseInt(line.name.replace("line", ""))) >= 0).length && ErrorLogger_1.ErrorLogger.sendLogError("Game config error", "Slot SIEU_ANH_HUNG", "LINES not matching (server " + this.GAME_CONFIG.linesConfig.length + " - client " + this.arrLineSelect.length + ")");
        if (dataLineConfig.freeSpin > 0) {
          this.arrLineSelect = dataLineConfig.freeLine ? dataLineConfig.freeLine.split(",").map(a => parseInt(a || "0")) : [];
          this.spinControler.setInfoBet(this.isTrial, this.arrLineSelect.length, this.LISTBETLABEL[this.betIdx], this.arrLineSelect.length * this.LISTBET[this.betIdx]);
        }
      }
      initItemRamdom() {
        if (this.spinControler.selectLine.active || !this.GAME_CONFIG) return;
        this.columns.parent.setContentSize(cc.winSize.width, 480);
        this.iconWildColumns.children.forEach(icon => {
          icon.active = false;
          icon.getComponentInChildren(sp.Skeleton).enabled = false;
          icon.getComponentInChildren(sp.Skeleton).skeletonData = this.listAnimWild[this.betIdx];
        });
        this.columns.children.forEach((colum, index) => {
          var _a;
          let count = this.ROLL_START_ITEM_COUNT + index * this.ROLL_ADD_ITEM_COUNT;
          for (let j = 0; j < count; j++) {
            let item = colum.children[j];
            if (!item) {
              item = cc.instantiate(this.itemTemplate);
              item.parent = colum;
            }
            j < 3 && item.getChildByName("ani").children.forEach((icon, index) => {
              icon.active = false;
              icon.getComponentInChildren(sp.Skeleton).enabled = false;
              icon.getComponentInChildren(sp.Skeleton).skeletonData = this.mappingSkeleton[11 * this.betIdx + index];
            });
            let iconId = Utils_1.default.randomRangeInt(0, this.GAME_CONFIG.items.length);
            let name = null === (_a = this.GAME_CONFIG.items.find(item => item.id == iconId)) || void 0 === _a ? void 0 : _a.name;
            if (j >= 3) {
              item.children[0].getComponent(cc.Sprite).spriteFrame = this.sprFrameItemsBlur.getSpriteFrame(name + (this.betIdx + 1) + "_blur");
              item.children[0].active = false;
            } else {
              item.children[0].getComponent(cc.Sprite).spriteFrame = this.sprFrameItems.getSpriteFrame(name + (this.betIdx + 1));
              item.children[0].active = true;
            }
          }
        });
      }
      initLine(linesConfig) {
        cc.sys.localStorage.setItem("linesConfig", JSON.stringify(linesConfig));
        this.linesWin.destroyAllChildren();
        null === linesConfig || void 0 === linesConfig ? void 0 : linesConfig.forEach((line, index) => {
          this.scheduleOnce(() => {
            let nodeListLine = cc.instantiate(this.line);
            nodeListLine.name = line.name;
            nodeListLine.parent = this.linesWin;
            nodeListLine.y = 0;
            let row = line.cells.find(cell => 0 == cell.col).row;
            let number = parseInt(line.name.replace(/[^0-9]/g, ""));
            nodeListLine.getChildByName("index").getChildByName("number").getComponent(cc.Label).string = number.toString();
            nodeListLine.getChildByName("index").x = number > linesConfig.length / 2 ? 268 : -268;
            let listLineByRow = linesConfig.filter(_line => void 0 != _line.cells.find(_cell => 0 == _cell.col && _cell.row == row) && (number - linesConfig.length / 2) * (parseInt(_line.name.replace(/[^0-9]/g, "")) - linesConfig.length / 2) > 0);
            let indexInRow = listLineByRow.indexOf(line);
            let agent = number > linesConfig.length / 2 ? -130 - 25 * indexInRow : 50 - 25 * indexInRow;
            nodeListLine.getChildByName("index").angle = agent;
            nodeListLine.getChildByName("index").getChildByName("number").angle = -agent;
            nodeListLine.getChildByName("index").y = 155 - 152 * row;
            for (let index = 1; index < line.cells.length; index++) {
              let cell_current = line.cells.find(cell => cell.col == index);
              let cell_befor = line.cells.find(cell => cell.col == index - 1);
              let nodeLine = nodeListLine.getChildByName("lines").getChildByName(index.toString());
              nodeLine.active = true;
              nodeLine.y = 0;
              nodeLine.getComponent(cc.Sprite).spriteFrame = this.listLine.getSpriteFrame(cell_befor.row + "t" + cell_current.row);
            }
          }, .05 * index);
        });
      }
      onSelectedLineChanged(lines) {
        this.arrLineSelect = lines;
        this.spinControler.lblLine.string = this.arrLineSelect.length.toString();
        this.spinControler.setInfoBet(this.isTrial, this.arrLineSelect.length.toString(), this.LISTBETLABEL[this.betIdx], this.arrLineSelect.length * this.LISTBET[this.betIdx]);
      }
      resetState(setCanSpin = false) {
        this.canSpin = this.canSpin || setCanSpin;
        this.toast.active = false;
        this.effectJackpot.active = false;
        this.effectBigWin.active = false;
        this.spinControler.selectLine.active = false;
        this.gameView.active = true;
        this.stopAllEffects();
        this.linesWin.stopAllActions();
        for (var i = 0; i < this.linesWin.childrenCount; i++) this.linesWin.children[i].active = false;
      }
      actBet(evt, data) {
        var oldIdx = this.betIdx;
        this.resetState(true);
        if (data) {
          this.columns.parent.setContentSize(cc.winSize.width, 480);
          this.betIdx = this.LISTBET.indexOf(parseInt(data));
          this.betIdx >= this.LISTBET.length && (this.betIdx = 0);
          this.spinControler.setInfoBet(this.isTrial, this.arrLineSelect.length.toString(), this.LISTBETLABEL[this.betIdx], this.arrLineSelect.length * this.LISTBET[this.betIdx]);
          SlotNetworkClient_1.default.getInstance().send(new SlotCayKhe_Cmd_1.default.SendChangeRoom(oldIdx, this.betIdx));
          this.spinControler.selectLine.active = false;
          this.gameView.active = true;
          this.gameView.getComponent("AppearanceUtil").start();
          this.initItemRamdom();
        } else {
          this.spinControler.selectLine.active = true;
          this.gameView.active = false;
          this.spinControler.setInfoBet(this.isTrial, this.arrLineSelect.length.toString(), this.LISTBET[this.betIdx], this.arrLineSelect.length * this.LISTBET[this.betIdx]);
          this.isTrial = false;
          this.panel.runAction(cc.sequence(cc.scaleTo(.15, 0, 0), cc.callFunc(temp => {
            temp.active = false;
          })));
        }
        this.setAnimationWin();
      }
      setAnimationWin() {
        let positionsYBigWin = [ 0, 0, 0 ];
        let positionsYLabelBigWin = [ -480, -470, -470 ];
        this.effectBigWin.getComponentInChildren(sp.Skeleton).skeletonData = this.animBigWin[this.betIdx];
        this.effectBigWin.getComponentInChildren(sp.Skeleton).node.y = positionsYBigWin[this.betIdx];
        this.effectBigWin.getComponentInChildren(cc.Label).node.y = positionsYLabelBigWin[this.betIdx];
        let positionsYJackpot = [ -40, -20, 40 ];
        let positionsYLabelJackpot = [ -407, -407, -477 ];
        this.effectJackpot.getComponentInChildren(sp.Skeleton).skeletonData = this.animJackpot[this.betIdx];
        this.effectJackpot.getComponentInChildren(sp.Skeleton).node.y = positionsYJackpot[this.betIdx];
      }
      commonClickHandler() {
        this.soundControler.commonClickHandler();
      }
      actBack() {
        var _a;
        SlotNetworkClient_1.default.getInstance().send(new SlotCayKhe_Cmd_1.default.SendUnSubcribe(this.betIdx));
        cc.audioEngine.stopAll();
        null === (_a = App_1.default.instance) || void 0 === _a ? void 0 : _a.loadScene("Lobby");
      }
      actHidden() {
        this.showToast("T\xednh n\u0103ng \u0111ang ph\xe1t tri\u1ec3n.");
      }
      actTrial() {
        this.isTrial = !this.isTrial;
        this.setSpinMode(SpinMode.NORMAL);
        this.isTrial ? this.spinControler.setInfoBet(this.isTrial, "25", this.LISTBET[this.betIdx], 25 * this.LISTBET[this.betIdx]) : this.spinControler.setInfoBet(this.isTrial, this.arrLineSelect.length.toString(), this.LISTBET[this.betIdx], this.arrLineSelect.length * this.LISTBET[this.betIdx]);
      }
      toggleAutoOnCheck() {
        if (this.isTrial) {
          this.showToast("T\xednh n\u0103ng n\xe0y kh\xf4ng ho\u1ea1t \u0111\u1ed9ng \u1edf ch\u1ebf \u0111\u1ed9 ch\u01a1i th\u1eed.");
          return;
        }
        if (this.spinControler.spinType.auto) this.setSpinMode(SpinMode.NORMAL); else {
          this.setSpinMode(SpinMode.AUTO);
          this.spinControler.setStageButtonSpin(true);
        }
      }
      toggleBoostOnCheck() {
        if (this.isTrial) {
          this.showToast("T\xednh n\u0103ng n\xe0y kh\xf4ng ho\u1ea1t \u0111\u1ed9ng \u1edf ch\u1ebf \u0111\u1ed9 ch\u01a1i th\u1eed.");
          return;
        }
        if (this.spinControler.spinType.autox2) this.setSpinMode(SpinMode.NORMAL); else {
          this.setSpinMode(SpinMode.AUTO_X2);
          this.spinControler.setStageButtonSpin(true);
        }
      }
      setSpinMode(mode) {
        this.spinControler.setSpinMode(mode);
        if (this.spinControler.spinType.auto || this.spinControler.spinType.autox2) {
          this.resetState(false);
          this.spin();
        } else this.canSpin && this.setEnabledAllButtonsExceptPlayMode(true);
      }
      spin(callByClick = false) {
        if (callByClick && (this.spinControler.spinType.autox2 || this.spinControler.spinType.auto)) {
          this.setSpinMode(SpinMode.NORMAL);
          return;
        }
        if (!this.canSpin) return;
        this.resetState(callByClick);
        this.canSpin = false;
        this.setEnabledAllButtonsExceptPlayMode(false);
        if (this.isTrial) {
          let bigwin = Utils_1.default.randomRangeInt(0, 4);
          let resultBigwim = bigwin > 2 ? SlotCayKhe_TrialResults_1.default.results.filter(a => a.prize > 1500) : SlotCayKhe_TrialResults_1.default.results.filter(a => a.result > 1);
          if (resultBigwim.length > 0) {
            var rIdx = Utils_1.default.randomRangeInt(0, resultBigwim.length);
            let data = resultBigwim[rIdx];
            3 == data.result && (data.prize = Utils_1.default.stringToInt(this.lblJackpot.string));
            this.onSpinResult(data);
          } else this.spin(callByClick);
        } else {
          this.startSpinTime = new Date().getTime();
          SlotNetworkClient_1.default.getInstance().send(new SlotCayKhe_Cmd_1.default.SendPlay(this.arrLineSelect.toString()));
        }
      }
      resetPositionColums() {
        this.iconWildColumns.children.forEach(icon => {
          icon.getComponentInChildren(sp.Skeleton).enabled = false;
          icon.active = false;
        });
        this.columns.children.forEach(roll => {
          roll.stopAllActions();
          roll.setPosition(cc.v2(roll.getPosition().x, 0));
        });
      }
      setEnabledAllButtonsExceptPlayMode(enabled) {
        this.spinControler.setEnabledAllButtonsSpin(enabled);
        this.btnBack.interactable = enabled;
      }
      onSpinResult(receiveResult) {
        var _a, _b, _c, _d, _e;
        this.isTrial && (receiveResult.prize = receiveResult.prize * Math.pow(10, this.betIdx));
        this.resetPositionColums();
        if (receiveResult.isFree && (!receiveResult.awardsDetail || !receiveResult.awardsDetail.object || 0 == receiveResult.awardsDetail.object.length)) {
          let wildItemId = null === (_a = this.GAME_CONFIG.items.find(item => "WILD" == item.itemType)) || void 0 === _a ? void 0 : _a.id;
          let columnsWild = [];
          let matrixOneDimensional = null === (_b = receiveResult.matrix) || void 0 === _b ? void 0 : _b.split(",");
          if (!matrixOneDimensional) {
            null === (_c = App_1.default.instance) || void 0 === _c ? void 0 : _c.showErrLoading("\u0110\xe3 x\u1ea3y ra l\u1ed7i...");
            return;
          }
          let matrix = [ matrixOneDimensional.slice(0, 5), matrixOneDimensional.slice(5, 10), matrixOneDimensional.slice(10, 15) ];
          for (let j = 0; j < matrix.length; j++) if (parseInt(matrix[j]) == wildItemId) {
            let c = j % 5;
            -1 == columnsWild.indexOf(c) && columnsWild.push(c);
          }
          receiveResult["awardsDetail"] = {
            object: []
          };
          let linesWin = receiveResult.linesWin ? receiveResult.linesWin.split(",").filter(a => "0" != a) : [];
          linesWin.forEach(lineIdx => {
            var _a;
            let line = this.GAME_CONFIG.linesConfig.find(line => line.name == "line" + lineIdx);
            let countItemWin = 0;
            let fisrtCell = line.cells.find(cell => 0 == cell.col);
            let fisrtItemId = matrix[fisrtCell.row][fisrtCell.col];
            let continueCheck = true;
            line.cells.forEach((cell, index) => {
              let itemId = matrix[cell.row][cell.col];
              if (!continueCheck) return;
              fisrtItemId == wildItemId && (fisrtItemId = itemId);
              fisrtItemId == itemId || parseInt(itemId) == wildItemId ? countItemWin++ : continueCheck = false;
            });
            let dup = 3 == countItemWin ? "TRIPLE" : 4 == countItemWin ? "QUADAR" : "PENTA";
            receiveResult["awardsDetail"]["object"].push({
              award: dup + "_" + (null === (_a = this.GAME_CONFIG.items.find(item => item.id == fisrtItemId)) || void 0 === _a ? void 0 : _a.name.toUpperCase()),
              lineName: "line" + lineIdx
            });
            cc.log(lineIdx);
          });
        }
        cc.log(receiveResult);
        var listTypeResult = [ 0, 1, 2, 3, 5, 6 ];
        if (!receiveResult.isFree && (-1 === listTypeResult.indexOf(receiveResult.result) || !receiveResult.awardsDetail)) {
          this.canSpin = true;
          this.setEnabledAllButtonsExceptPlayMode(true);
          this.setSpinMode(SpinMode.NORMAL);
          this.linesWin.stopAllActions();
          switch (receiveResult.result) {
           case 102:
            this.showToast("S\u1ed1 d\u01b0 kh\xf4ng \u0111\u1ee7, vui l\xf2ng n\u1ea1p th\xeam.");
            break;

           default:
            this.showToast("C\xf3 l\u1ed7i x\u1ea3y ra, vui l\xf2ng th\u1eed l\u1ea1i.");
          }
          return;
        }
        this.columnsWild.length = 0;
        if (!this.isTrial && receiveResult.freeSpin <= 0) {
          let curMoney = Configs_1.default.Login.Coin - this.arrLineSelect.length * this.LISTBET[this.betIdx];
          Tween_1.default.numberTo(this.lblCoin, curMoney, .3);
          Configs_1.default.Login.Coin = receiveResult.currentMoney;
        }
        let matrixOneDimensional = null === (_d = receiveResult.matrix) || void 0 === _d ? void 0 : _d.split(",");
        if (!matrixOneDimensional) {
          null === (_e = App_1.default.instance) || void 0 === _e ? void 0 : _e.showErrLoading("\u0110\xe3 x\u1ea3y ra l\u1ed7i...");
          return;
        }
        let matrix = [ matrixOneDimensional.slice(0, 5), matrixOneDimensional.slice(5, 10), matrixOneDimensional.slice(10, 15) ];
        let speedRoll = this.spinControler.spinType.autox2 ? .5 : 1;
        this.columns.parent.setContentSize(cc.winSize.width, 480);
        this.soundControler.playSounWithID(7, speedRoll);
        this.columns.children.forEach((colum, index) => {
          let stepRollUp = .5 * this.itemHeight;
          let stepRollDown = colum.height - 3 * this.itemHeight;
          let animationShowWild = 4 == index ? cc.callFunc(() => {
            var _a;
            colum.setPosition(cc.v2(colum.position.x, 0));
            for (let j = 0; j < matrixOneDimensional.length; j++) if (parseInt(matrixOneDimensional[j]) == this.wildItemId) {
              let c = j % 5;
              -1 == this.columnsWild.indexOf(c) && this.columnsWild.push(c);
            }
            let typeWild = null === (_a = this.GAME_CONFIG.items.find(item => "WILD" == item.itemType)) || void 0 === _a ? void 0 : _a.name;
            for (let j = 0; j < this.columnsWild.length; j++) {
              let children = this.columns.children[this.columnsWild[j]].children;
              let showWild = cc.callFunc(() => {
                for (let i = 0; i < 3; i++) {
                  const icon = children[i];
                  icon.getChildByName("img").getComponent(cc.Sprite).spriteFrame = this.sprFrameItems.getSpriteFrame(typeWild + (this.betIdx + 1));
                }
                this.iconWildColumns.children[this.columnsWild[j]].getComponentInChildren(sp.Skeleton).enabled = true;
                this.iconWildColumns.children[this.columnsWild[j]].active = true;
                this.iconWildColumns.children[this.columnsWild[j]].getComponentInChildren(sp.Skeleton).setAnimation(0, "animation", false);
              });
              let hideWild = cc.callFunc(() => {
                for (let i = 0; i < this.iconWildColumns.childrenCount; i++) {
                  this.iconWildColumns.children[i].getComponentInChildren(sp.Skeleton).enabled = false;
                  this.iconWildColumns.children[i].active = false;
                }
              });
              colum.runAction(cc.sequence(cc.delayTime(2), showWild, cc.delayTime(2.6), hideWild));
            }
            this.columnsWild.length > 0 ? this.scheduleOnce(() => {
              this.spined(receiveResult);
            }, 5) : this.spined(receiveResult);
          }) : cc.callFunc(() => {
            colum.setPosition(cc.v2(colum.position.x, 0));
          });
          let actionRoll = [ cc.delayTime(.05 * index * speedRoll), cc.moveTo(.2 * speedRoll, cc.v2(colum.position.x, stepRollUp)).easing(cc.easeQuadraticActionOut()), cc.callFunc(() => {
            colum.children.forEach(item => {
              var _a;
              let iconId = Utils_1.default.randomRangeInt(0, this.GAME_CONFIG.items.length);
              let name = null === (_a = this.GAME_CONFIG.items.find(item => item.id == iconId)) || void 0 === _a ? void 0 : _a.name;
              item.getChildByName("img").getComponent(cc.Sprite).spriteFrame = this.sprFrameItemsBlur.getSpriteFrame(name + (this.betIdx + 1) + "_blur");
              item.getChildByName("img").active = true;
              item.getChildByName("ani").children.forEach(item2 => {
                item2.active = false;
              });
            });
          }), cc.moveTo((this.SPIN_DURATION + this.ADD_SPIN_DURATION * index) * speedRoll, cc.v2(colum.position.x, -stepRollDown)).easing(cc.easeQuadraticActionInOut()), cc.moveTo(0, cc.v2(colum.position.x, 3 * -this.itemHeight)).easing(cc.easeQuadraticActionIn()), cc.moveTo(.2, cc.v2(colum.position.x, 0)).easing(cc.easeQuadraticActionIn()), animationShowWild ];
          let showResult = cc.callFunc(() => {
            var _a;
            var children = colum.children;
            children.forEach(node => node.getChildByName("img").getComponent(cc.Sprite).spriteFrame = null);
            for (let i = 0; i < 3; i++) {
              let nameItem = null === (_a = this.GAME_CONFIG.items.find(item => item.id == matrix[2 - i][index])) || void 0 === _a ? void 0 : _a.name;
              children[i].getChildByName("img").getComponent(cc.Sprite).spriteFrame = this.sprFrameItems.getSpriteFrame(nameItem + (this.betIdx + 1));
              children[i].getChildByName("img").active = true;
            }
          });
          actionRoll.push(showResult);
          colum.runAction(cc.sequence(actionRoll));
        });
      }
      spined(receiveResult) {
        this.columns.children.forEach(children => {
          children.children.forEach((img, index) => {
            index >= 3 && (img.getChildByName("img").getComponent(cc.Sprite).spriteFrame = null);
          });
        });
        var successResult = [ 0, 1, 3, 5, 6 ];
        this.soundControler.playSounWithID(receiveResult.result);
        switch (receiveResult.result) {
         case 0:
         case 1:
          this.showLineWins(receiveResult);
          break;

         case 2:
          this.showEffectBigWin(receiveResult.prize, () => {
            this.showLineWins(receiveResult);
          });
          break;

         case 3:
          this.showEffectJackpot(receiveResult.prize, () => {
            this.showLineWins(receiveResult);
          });
          break;

         case 6:
          this.showEffectBigWin(receiveResult.prize, () => {
            this.showLineWins(receiveResult);
          });
          break;

         case 5:
          this.popupBonus ? this.showEffectBonus(() => {
            this.popupBonus.showBonus(this.betIdx + 1, receiveResult.haiSao, () => {
              this.showLineWins(receiveResult);
            });
          }) : this.showEffectBonus(() => {
            cc.assetManager.getBundle(Configs_1.default.App.BUNDLE_NAME.CAYKHE).load("res/prefabs/PopupBonus", cc.Prefab, (error, prefab) => {
              if (error) return;
              this.popupBonus = cc.instantiate(prefab).getComponent(SlotCayKhe_PopupBonus_1.default);
              this.scene.addChild(this.popupBonus.node);
              this.popupBonus.showBonus(this.betIdx + 1, receiveResult.haiSao, () => {
                this.showLineWins(receiveResult);
              });
              this.settingSoundClick();
            });
          });
        }
      }
      stopAllEffects() {
        this.stopAllItemEffect();
        this.effectJackpot.stopAllActions();
        this.effectJackpot.active = false;
        this.effectBigWin.stopAllActions();
        this.effectBigWin.active = false;
      }
      showLineWins(receiveResult) {
        var _a, _b, _c;
        this.canSpin = true;
        this.columns.parent.setContentSize(cc.winSize.width, cc.winSize.height);
        let chipWin = "" != this.lblFreeSpinCount.string ? parseInt(this.lblWinNow.string.replace(/[^0-9]/g, "")) + receiveResult.prize : receiveResult.prize;
        this.lblFreeSpinCount.string = receiveResult.freeSpin > 0 ? "FREE " + receiveResult.freeSpin.toString() + " L\u01af\u1ee2T" : "";
        Tween_1.default.numberTo(this.lblWinNow, chipWin, .3);
        this.isTrial || BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN);
        this.setEnabledAllButtonsExceptPlayMode(!this.spinControler.spinType.auto && !this.spinControler.spinType.autox2);
        this.linesWin.stopAllActions();
        let matrixOneDimensional = null === (_a = receiveResult.matrix) || void 0 === _a ? void 0 : _a.split(",");
        let matrix = [ matrixOneDimensional.slice(0, 5), matrixOneDimensional.slice(5, 10), matrixOneDimensional.slice(10, 15) ];
        let rolls = this.columns.children;
        for (const award of null === (_b = receiveResult.awardsDetail) || void 0 === _b ? void 0 : _b.object) {
          const nodeLine = this.linesWin.getChildByName(award.lineName);
          if (!nodeLine) continue;
          nodeLine.active = true;
        }
        let actions = [];
        if (receiveResult.prize > 0) {
          actions.push(cc.delayTime(1.5));
          let hideAllLine = cc.callFunc(() => {
            this.linesWin.children.forEach(line => {
              line.active = false;
            });
          }, this);
          actions.push(hideAllLine);
          actions.push(cc.delayTime(.3));
          if (!this.spinControler.spinType.autox2) for (const award of null === (_c = receiveResult.awardsDetail) || void 0 === _c ? void 0 : _c.object) {
            const nodeLine = this.linesWin.getChildByName(award.lineName);
            if (!nodeLine) continue;
            let showAnimationItemWin = cc.callFunc(() => {
              var _a, _b;
              nodeLine.active = true;
              let line = this.GAME_CONFIG.linesConfig.find(line => line.name == award.lineName);
              let typeWild = null === (_a = this.GAME_CONFIG.items.find(item => "WILD" == item.itemType)) || void 0 === _a ? void 0 : _a.name;
              let typeWin = null === (_b = this.GAME_CONFIG.items.find(item => award.award.includes(item.value) || award.award.includes(item.name.toUpperCase()))) || void 0 === _b ? void 0 : _b.name;
              let checkContinue = true;
              line.cells.forEach((cell, index) => {
                var _a;
                if (!checkContinue) return;
                let typeCell = null === (_a = this.GAME_CONFIG.items.find(item => item.id == matrix[cell.row][cell.col])) || void 0 === _a ? void 0 : _a.name;
                void 0 != this.columnsWild.find(col => col == cell.col) && (typeCell = typeWild);
                if (typeWin == typeCell || typeWild == typeCell) {
                  rolls[cell.col].children[2 - cell.row].getChildByName("img").active = false;
                  if (rolls[cell.col].children[2 - cell.row].getChildByName("ani").getChildByName(typeCell)) {
                    rolls[cell.col].children[2 - cell.row].getChildByName("ani").getChildByName(typeCell).getComponentInChildren(sp.Skeleton).enabled = true;
                    rolls[cell.col].children[2 - cell.row].getChildByName("ani").getChildByName(typeCell).active = true;
                    rolls[cell.col].children[2 - cell.row].getChildByName("ani").getChildByName(typeCell).getComponentInChildren(sp.Skeleton).setAnimation(0, "animation", false);
                  } else {
                    rolls[cell.col].children[2 - cell.row].getChildByName("ani").children[matrix[cell.row][cell.col]].getComponentInChildren(sp.Skeleton).enabled = true;
                    rolls[cell.col].children[2 - cell.row].getChildByName("ani").children[matrix[cell.row][cell.col]].active = true;
                    rolls[cell.col].children[2 - cell.row].getChildByName("ani").children[matrix[cell.row][cell.col]].getComponentInChildren(sp.Skeleton).setAnimation(0, "animation", false);
                  }
                } else checkContinue = false;
              });
            });
            let hideLine = cc.callFunc(() => {
              nodeLine.active = false;
              this.columns.children.forEach(colum => {
                colum.children.forEach(item => {
                  item.getChildByName("img").active = true;
                  item.getChildByName("ani").children.forEach(item2 => {
                    item2.getComponentInChildren(sp.Skeleton).enabled = false;
                    item2.active = false;
                  });
                });
              });
            }, this);
            actions.push(showAnimationItemWin);
            actions.push(cc.delayTime(1));
            actions.push(hideLine);
            actions.push(cc.delayTime(.1));
          }
        }
        actions.push(cc.callFunc(() => {
          this.isTrial || !this.spinControler.spinType.autox2 && !this.spinControler.spinType.auto || this.spin();
        }, this));
        1 == actions.length ? this.linesWin.runAction(actions[0]) : actions.length > 1 && this.linesWin.runAction(cc.repeatForever(cc.sequence.apply(null, actions)));
      }
      showEffectBigWin(cash, cb) {
        this.effectBigWin.stopAllActions();
        this.effectBigWin.active = true;
        let label = this.effectBigWin.getComponentInChildren(cc.Label);
        label.node.active = false;
        this.effectBigWin.runAction(cc.sequence(cc.callFunc(() => {
          this.effectBigWin.getComponentsInChildren(sp.Skeleton).forEach(ani => {
            ani.setAnimation(0, "animation", false);
          });
          label.string = "";
          label.node.active = true;
          Tween_1.default.numberTo(label, cash, 1);
        }), cc.delayTime(3), cc.callFunc(() => {
          this.effectBigWin.active = false;
          null != cb && cb();
        })));
      }
      showEffectJackpot(cash, cb = null) {
        this.effectJackpot.stopAllActions();
        this.effectJackpot.active = true;
        let label = this.effectJackpot.getComponentInChildren(cc.Label);
        label.node.active = false;
        label.node.y = 2 == this.betIdx ? -476 : -404;
        this.effectJackpot.runAction(cc.sequence(cc.callFunc(() => {
          this.effectJackpot.getComponentInChildren(sp.Skeleton).setAnimation(0, "animation", false);
          label.string = "";
          label.node.active = true;
          Tween_1.default.numberTo(label, cash, 1);
        }), cc.delayTime(5), cc.callFunc(() => {
          this.effectJackpot.active = false;
          null != cb && cb();
        })));
      }
      showEffectBonus(cb) {
        this.effectBonus.stopAllActions();
        this.effectBonus.active = true;
        this.effectBonus.getComponentsInChildren(sp.Skeleton).forEach(skeleton => {
          skeleton.setAnimation(0, "normal", false);
          skeleton.node.active = skeleton.node.name == (this.betIdx + 1).toString();
        });
        this.effectBonus.runAction(cc.sequence(cc.delayTime(3), cc.callFunc(() => {
          this.effectBonus.active = false;
          null != cb && cb();
        })));
      }
      stopAllItemEffect() {
        var _a;
        null === (_a = this.columns) || void 0 === _a ? void 0 : _a.children.forEach(colum => {
          var _a;
          for (let index = 0; index < 3; index++) null === (_a = null === colum || void 0 === colum ? void 0 : colum.children[index]) || void 0 === _a ? void 0 : _a.stopAllActions();
        });
      }
      showToast(msg) {
        this.toast.getComponentInChildren(cc.Label).string = msg;
        this.toast.stopAllActions();
        this.toast.active = true;
        this.toast.runAction(cc.sequence(cc.delayTime(2), cc.callFunc(() => {
          this.toast.active = false;
        })));
      }
      switchSettingPanel(event, eventData) {
        if (this.panel.active) this.panel.runAction(cc.sequence(cc.scaleTo(.15, 0, 0), cc.callFunc(temp => {
          temp.active = false;
        }))); else {
          this.panel.active = true;
          this.panel.scale = 0;
          this.panel.runAction(cc.sequence(cc.scaleTo(.15, 1, 1), cc.callFunc(temp => {})));
        }
      }
      settingSound() {
        this.soundControler.settingSound();
      }
      settingMusic() {
        this.soundControler.settingMusic();
      }
      showPopupSelectLine() {
        if (this.isTrial) {
          this.showToast("T\xednh n\u0103ng n\xe0y kh\xf4ng ho\u1ea1t \u0111\u1ed9ng \u1edf ch\u1ebf \u0111\u1ed9 ch\u01a1i th\u1eed.");
          return;
        }
        this.popupSelectLine ? this.popupSelectLine.show() : cc.assetManager.getBundle(Configs_1.default.App.BUNDLE_NAME.CAYKHE).load("res/prefabs/PopupSelectLine", cc.Prefab, (error, prefab) => {
          if (error) return;
          this.popupSelectLine = cc.instantiate(prefab).getComponent(SlotCayKhe_PopupSelectLine_1.default);
          this.scene.addChild(this.popupSelectLine.node);
          this.popupSelectLine.onSelectedChanged = this.onSelectedLineChanged.bind(this);
          this.popupSelectLine.show();
          this.settingSoundClick();
        });
      }
      showJackpotHistory() {
        this.popupJackpotHistory ? this.popupJackpotHistory.show() : cc.assetManager.getBundle(Configs_1.default.App.BUNDLE_NAME.CAYKHE).load("res/prefabs/PopupJackpotHistory", cc.Prefab, (error, prefab) => {
          if (error) return;
          this.popupJackpotHistory = cc.instantiate(prefab).getComponent(SlotCayKhe_PopupJackpotHistory_1.default);
          this.scene.addChild(this.popupJackpotHistory.node);
          this.popupJackpotHistory.show();
          this.settingSoundClick();
        });
      }
      showHistory() {
        this.popupHistory ? this.popupHistory.show() : cc.assetManager.getBundle(Configs_1.default.App.BUNDLE_NAME.CAYKHE).load("res/prefabs/PopupHistory", cc.Prefab, (error, prefab) => {
          if (error) return;
          this.popupHistory = cc.instantiate(prefab).getComponent(SlotCayKhe_PopupHistory_1.default);
          this.scene.addChild(this.popupHistory.node);
          this.popupHistory.show();
          this.settingSoundClick();
        });
      }
      showGuide() {
        this.popupGuide ? this.popupGuide.showPopup(this.betIdx + 1, this.GAME_CONFIG) : cc.assetManager.getBundle(Configs_1.default.App.BUNDLE_NAME.CAYKHE).load("res/prefabs/PopupGuide", cc.Prefab, (error, prefab) => {
          if (error) return;
          this.popupGuide = cc.instantiate(prefab).getComponent(SlotCayKhe_PopupGuide_1.default);
          this.scene.addChild(this.popupGuide.node);
          this.popupGuide.showPopup(this.betIdx + 1, this.GAME_CONFIG);
          this.settingSoundClick();
        });
      }
    };
    __decorate([ property(cc.Node) ], SlotCayKheController.prototype, "scene", void 0);
    __decorate([ property(cc.SpriteAtlas) ], SlotCayKheController.prototype, "sprFrameItems", void 0);
    __decorate([ property(cc.SpriteAtlas) ], SlotCayKheController.prototype, "sprFrameItemsBlur", void 0);
    __decorate([ property(cc.Node) ], SlotCayKheController.prototype, "itemTemplate", void 0);
    __decorate([ property(cc.Node) ], SlotCayKheController.prototype, "columns", void 0);
    __decorate([ property(cc.Node) ], SlotCayKheController.prototype, "linesWin", void 0);
    __decorate([ property(cc.Node) ], SlotCayKheController.prototype, "line", void 0);
    __decorate([ property(cc.SpriteAtlas) ], SlotCayKheController.prototype, "listLine", void 0);
    __decorate([ property(cc.Node) ], SlotCayKheController.prototype, "iconWildColumns", void 0);
    __decorate([ property(cc.Label) ], SlotCayKheController.prototype, "lblJackpot", void 0);
    __decorate([ property(cc.Label) ], SlotCayKheController.prototype, "lblCoin", void 0);
    __decorate([ property(cc.Label) ], SlotCayKheController.prototype, "lblWinNow", void 0);
    __decorate([ property(cc.Label) ], SlotCayKheController.prototype, "lblFreeSpinCount", void 0);
    __decorate([ property(cc.Node) ], SlotCayKheController.prototype, "toast", void 0);
    __decorate([ property(cc.Node) ], SlotCayKheController.prototype, "effectWinCash", void 0);
    __decorate([ property(cc.Node) ], SlotCayKheController.prototype, "effectBigWin", void 0);
    __decorate([ property(cc.Node) ], SlotCayKheController.prototype, "effectJackpot", void 0);
    __decorate([ property(cc.Node) ], SlotCayKheController.prototype, "effectBonus", void 0);
    __decorate([ property([ sp.SkeletonData ]) ], SlotCayKheController.prototype, "animBigWin", void 0);
    __decorate([ property([ sp.SkeletonData ]) ], SlotCayKheController.prototype, "animJackpot", void 0);
    __decorate([ property([ sp.SkeletonData ]) ], SlotCayKheController.prototype, "mappingSkeleton", void 0);
    __decorate([ property([ sp.SkeletonData ]) ], SlotCayKheController.prototype, "listAnimWild", void 0);
    __decorate([ property(cc.Button) ], SlotCayKheController.prototype, "btnBack", void 0);
    __decorate([ property(cc.Node) ], SlotCayKheController.prototype, "panel", void 0);
    __decorate([ property(cc.Node) ], SlotCayKheController.prototype, "gameView", void 0);
    __decorate([ property(SlotCayKhe_SpinControler_1.SpinControler) ], SlotCayKheController.prototype, "spinControler", void 0);
    __decorate([ property(SlotCayKhe_SoundControler_1.SoundControler) ], SlotCayKheController.prototype, "soundControler", void 0);
    SlotCayKheController = __decorate([ ccclass ], SlotCayKheController);
    exports.SlotCayKheController = SlotCayKheController;
    exports.default = SlotCayKheController;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/App": void 0,
    "../../Main/Game/src/common/BroadcastReceiver": void 0,
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/common/ErrorLogger": void 0,
    "../../Main/Game/src/common/Tween": void 0,
    "../../Main/Game/src/common/Utils": void 0,
    "../../Main/Game/src/networks/Network.Cmd": void 0,
    "../../Main/Game/src/networks/Network.InPacket": void 0,
    "../../Main/Game/src/networks/SlotNetworkClient": void 0,
    "./SlotCayKhe.Cmd": "SlotCayKhe.Cmd",
    "./SlotCayKhe.PopupBonus": "SlotCayKhe.PopupBonus",
    "./SlotCayKhe.PopupGuide": "SlotCayKhe.PopupGuide",
    "./SlotCayKhe.PopupHistory": "SlotCayKhe.PopupHistory",
    "./SlotCayKhe.PopupJackpotHistory": "SlotCayKhe.PopupJackpotHistory",
    "./SlotCayKhe.PopupSelectLine": "SlotCayKhe.PopupSelectLine",
    "./SlotCayKhe.SoundControler": "SlotCayKhe.SoundControler",
    "./SlotCayKhe.SpinControler": "SlotCayKhe.SpinControler",
    "./SlotCayKhe.TrialResults": "SlotCayKhe.TrialResults"
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
    const Dialog_1 = require("../../Main/Game/src/common/Dialog");
    var ITEM_TYPE;
    (function(ITEM_TYPE) {
      ITEM_TYPE["MULTIPLE"] = "MULTIPLE";
      ITEM_TYPE["JACKPOT"] = "JACKPOT";
      ITEM_TYPE["FREESPIN"] = "FREESPIN";
      ITEM_TYPE["MINIGAME"] = "MINIGAME";
      ITEM_TYPE["WILD"] = "WILD";
    })(ITEM_TYPE || (ITEM_TYPE = {}));
    var AWARD_TYPE;
    (function(AWARD_TYPE) {
      AWARD_TYPE["JACKPOT"] = "JACKPOT";
      AWARD_TYPE["FREESPIN"] = "FREESPIN";
      AWARD_TYPE["MINIGAME"] = "MINIGAME";
      AWARD_TYPE["MULTIPLE"] = "MULTIPLE";
    })(AWARD_TYPE || (AWARD_TYPE = {}));
    const {ccclass: ccclass, property: property} = cc._decorator;
    let PopupGuide = class PopupGuide extends Dialog_1.default {
      constructor() {
        super(...arguments);
        this.pages = [];
        this.nodeCheckByBet = [];
        this.btnNext = null;
        this.btnPrev = null;
        this.soundClick = null;
        this.icons = null;
        this.itemsContent = null;
        this.itemsLayout = null;
        this.item = null;
        this.page = 0;
        this.maxItemInLayout = 2;
        this.soundSlotState = null;
      }
      start() {}
      showPopup(index, gameConfig) {
        this.canPlaySound() && cc.audioEngine.play(this.soundClick, false, 1);
        super.show();
        this.page = 0;
        this.reloadData();
        this.itemsContent.destroyAllChildren();
        if (!gameConfig) return;
        let items = gameConfig.items;
        let awards = gameConfig.awards;
        let lineLayoutCount = Math.ceil(items.length / this.maxItemInLayout);
        for (let i = lineLayoutCount - 1; i >= 0; i--) {
          let layout = cc.instantiate(this.itemsLayout);
          let endIdx = i * this.maxItemInLayout >= 1 ? i * this.maxItemInLayout - 1 : 0;
          for (let j = items.length - 1 - (lineLayoutCount - 1 - i) * this.maxItemInLayout; j >= endIdx; j--) {
            let item = items[j];
            let aws = awards.filter(aw => aw.item == item.value).sort((a, b) => b.duplicate - a.duplicate);
            let node = cc.instantiate(this.item);
            let icon = node.getComponentInChildren(cc.Sprite);
            icon.spriteFrame = this.icons.getSpriteFrame(item.name + index);
            icon.node.setScale(110 / icon.node.width);
            let title = "";
            if (item.itemType == ITEM_TYPE.WILD) title += "Thay th\u1ebf bi\u1ec3u\nt\u01b0\u1ee3ng kh\xe1c"; else for (let k = 0; k < aws.length; k++) {
              title += 0 == k ? "" : "\n";
              title += aws[k].duplicate;
              title += " x ";
              title += aws[k].awardType == AWARD_TYPE.MULTIPLE ? parseInt(aws[k].ratio) : aws[k].awardType;
            }
            node.getComponentInChildren(cc.Label).string = title;
            layout.addChild(node);
          }
          this.itemsContent.addChild(layout);
        }
        this.nodeCheckByBet.forEach(node => {
          node.children.forEach(children => {
            children.children.forEach(nodeCheck => {
              nodeCheck.active = nodeCheck.name == index;
            });
          });
        });
      }
      actNext() {
        let soundSlotState = cc.sys.localStorage.getItem("sound_Slot_1");
        1 == soundSlotState && cc.audioEngine.play(this.soundClick, false, 1);
        this.page < this.pages.length - 1 && this.page++;
        this.reloadData();
        this.page == this.pages.length - 1;
      }
      actPrev() {
        let soundSlotState = cc.sys.localStorage.getItem("sound_Slot_1");
        1 == soundSlotState && cc.audioEngine.play(this.soundClick, false, 1);
        this.page > 0 && this.page--;
        this.reloadData();
        0 == this.page;
      }
      reloadData() {
        for (let i = 0; i < this.pages.length; i++) this.pages[i].active = i == this.page;
      }
      dismiss() {
        this.canPlaySound() && cc.audioEngine.play(this.soundClick, false, 1);
        this.node.active = false;
      }
      canPlaySound() {
        if (null == this.soundClick) return false;
        var soundSave = cc.sys.localStorage.getItem("sound_Slot_1");
        this.soundSlotState = null != soundSave ? parseInt(soundSave) : 1;
        return 1 == this.soundSlotState;
      }
    };
    __decorate([ property([ cc.Node ]) ], PopupGuide.prototype, "pages", void 0);
    __decorate([ property([ cc.Node ]) ], PopupGuide.prototype, "nodeCheckByBet", void 0);
    __decorate([ property(cc.Node) ], PopupGuide.prototype, "btnNext", void 0);
    __decorate([ property(cc.Node) ], PopupGuide.prototype, "btnPrev", void 0);
    __decorate([ property({
      type: cc.AudioClip
    }) ], PopupGuide.prototype, "soundClick", void 0);
    __decorate([ property(cc.SpriteAtlas) ], PopupGuide.prototype, "icons", void 0);
    __decorate([ property(cc.Node) ], PopupGuide.prototype, "itemsContent", void 0);
    __decorate([ property(cc.Prefab) ], PopupGuide.prototype, "itemsLayout", void 0);
    __decorate([ property(cc.Prefab) ], PopupGuide.prototype, "item", void 0);
    PopupGuide = __decorate([ ccclass ], PopupGuide);
    exports.PopupGuide = PopupGuide;
    exports.default = PopupGuide;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/Dialog": void 0
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
      }
      show() {
        this.canPlaySound() && cc.audioEngine.play(this.soundClick, false, 1);
        super.show();
        for (let i = 0; i < this.items.length; i++) this.items[i].active = false;
        null != this.itemTemplate && (this.itemTemplate.active = false);
      }
      dismiss() {
        this.canPlaySound() && cc.audioEngine.play(this.soundClick, false, 1);
        for (let i = 0; i < this.items.length; i++) this.items[i].active = false;
        this.node.active = false;
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
          gn: "SieuAnhHung"
        }, (err, res) => {
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
          this.maxPage = res["totalPages"];
          this.lblPage.string = this.page + "/" + this.maxPage;
          for (let i = 0; i < this.items.length; i++) {
            let item = this.items[i];
            if (i < res["results"].length) {
              let itemData = res["results"][i];
              item.getChildByName("bg").opacity = i % 2 == 0 ? 10 : 0;
              item.getChildByName("Session").getComponent(cc.Label).string = itemData["rf"];
              item.getChildByName("Time").getComponent(cc.Label).string = itemData["ts"];
              item.getChildByName("Bet").getComponent(cc.Label).string = Utils_1.default.formatNumber(itemData["bv"]);
              item.getChildByName("LineBet").getComponent(cc.Label).string = "" === itemData["lb"] ? 0 : itemData["lb"].split(",").length;
              item.getChildByName("LineWin").getComponent(cc.Label).string = "" === itemData["lw"] ? 0 : itemData["lw"].split(",").length;
              item.getChildByName("Win").getComponent(cc.Label).string = Utils_1.default.formatNumber(itemData["pz"]);
              item.active = true;
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
    PopupHistory = __decorate([ ccclass ], PopupHistory);
    exports.default = PopupHistory;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/App": void 0,
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/common/Dialog": void 0,
    "../../Main/Game/src/common/Http": void 0,
    "../../Main/Game/src/common/Utils": void 0
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
        for (let i = 0; i < this.items.length; i++) this.items[i].active = false;
        null != this.itemTemplate && (this.itemTemplate.active = false);
      }
      dismiss() {
        this.canPlaySound() && cc.audioEngine.play(this.soundClick, false, 1);
        for (let i = 0; i < this.items.length; i++) this.items[i].active = false;
        this.node.active = false;
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
          gn: "SieuAnhHung"
        }, (err, res) => {
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
          this.maxPage = res["totalPages"];
          this.lblPage.string = this.page + "/" + this.maxPage;
          for (let i = this.items.length - 1; i >= 0; i--) {
            let item = this.items[i];
            if (i < res["results"].length) {
              let itemData = res["results"][i];
              item.active = false;
              item.getChildByName("bg").opacity = i % 2 == 0 ? 10 : 0;
              item.getChildByName("Time").getComponent(cc.Label).string = itemData["ts"];
              item.getChildByName("Bet").getComponent(cc.Label).string = Utils_1.default.formatNumber(itemData["bv"]);
              item.getChildByName("Type").getComponent(cc.Label).string = 3 == itemData["rs"] ? "N\u1ed5 h\u0169" : "Th\u1eafng l\u1edbn";
              item.getChildByName("Account").getComponent(cc.Label).string = itemData["nn"];
              item.getChildByName("Win").getComponent(cc.Label).string = Utils_1.default.formatNumber(itemData["pz"]);
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
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/common/Dialog": void 0,
    "../../Main/Game/src/common/Http": void 0,
    "../../Main/Game/src/common/Utils": void 0
  } ],
  "SlotCayKhe.PopupSelectLine": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fa48eW+f0xCgLjEcRCCTtbE", "SlotCayKhe.PopupSelectLine");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.PopupSelectLine = void 0;
    const Dialog_1 = require("../../Main/Game/src/common/Dialog");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let PopupSelectLine = class PopupSelectLine extends Dialog_1.default {
      constructor() {
        super(...arguments);
        this.buttonsLine = null;
        this.btnClose = null;
        this.soundClick = null;
        this.onSelectedChanged = null;
        this.SELECTED = "selected";
      }
      start() {
        for (let i = 0; i < this.buttonsLine.childrenCount; i++) {
          let node = this.buttonsLine.children[i];
          node[this.SELECTED] = true;
          node.on("click", () => {
            node[this.SELECTED] = !node[this.SELECTED];
            node.opacity = node[this.SELECTED] ? 255 : 80;
            null != this.onSelectedChanged && this.onSelectedChanged(this.getSelectedLines());
            this.btnClose.interactable = this.getSelectedLines().length > 0;
          });
        }
      }
      actSelectAll() {
        let soundSlotState = cc.sys.localStorage.getItem("sound_Slot_1");
        1 == soundSlotState && cc.audioEngine.play(this.soundClick, false, 1);
        for (let i = 0; i < this.buttonsLine.childrenCount; i++) {
          let node = this.buttonsLine.children[i];
          node[this.SELECTED] = true;
          node.opacity = node[this.SELECTED] ? 255 : 80;
        }
        null != this.onSelectedChanged && this.onSelectedChanged(this.getSelectedLines());
        this.btnClose.interactable = true;
      }
      actSelectEven() {
        for (let i = 0; i < this.buttonsLine.childrenCount; i++) {
          let node = this.buttonsLine.children[i];
          node[this.SELECTED] = i % 2 != 0;
          node.opacity = node[this.SELECTED] ? 255 : 80;
        }
        null != this.onSelectedChanged && this.onSelectedChanged(this.getSelectedLines());
        this.btnClose.interactable = true;
      }
      actSelectOdd() {
        for (let i = 0; i < this.buttonsLine.childrenCount; i++) {
          let node = this.buttonsLine.children[i];
          node[this.SELECTED] = i % 2 == 0;
          node.opacity = node[this.SELECTED] ? 255 : 80;
        }
        null != this.onSelectedChanged && this.onSelectedChanged(this.getSelectedLines());
        this.btnClose.interactable = true;
      }
      actDeselectAll() {
        for (let i = 0; i < this.buttonsLine.childrenCount; i++) {
          let node = this.buttonsLine.children[i];
          node[this.SELECTED] = false;
          node.opacity = node[this.SELECTED] ? 255 : 80;
        }
        null != this.onSelectedChanged && this.onSelectedChanged(this.getSelectedLines());
        this.btnClose.interactable = false;
      }
      getSelectedLines() {
        let lines = new Array();
        for (let i = 0; i < this.buttonsLine.childrenCount; i++) {
          let node = this.buttonsLine.children[i];
          ("undefined" == typeof node[this.SELECTED] || node[this.SELECTED]) && lines.push(i + 1);
        }
        return lines;
      }
      dismiss() {
        this.getSelectedLines().length > 0 && (this.node.active = false);
      }
    };
    __decorate([ property(cc.Node) ], PopupSelectLine.prototype, "buttonsLine", void 0);
    __decorate([ property(cc.Button) ], PopupSelectLine.prototype, "btnClose", void 0);
    __decorate([ property({
      type: cc.AudioClip
    }) ], PopupSelectLine.prototype, "soundClick", void 0);
    PopupSelectLine = __decorate([ ccclass ], PopupSelectLine);
    exports.PopupSelectLine = PopupSelectLine;
    exports.default = PopupSelectLine;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/Dialog": void 0
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
      playSounWithID(id, speed = 1) {
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
          this.playSound(this.soundSpin, speed);
        }
      }
      playSound(sound = this.soundClick, speed = 1) {
        if (1 == this.soundSlotState && sound) {
          if (1 == speed) return cc.audioEngine.play(sound, false, 1);
          let audioID = cc.audioEngine.play(sound, false, 1);
          let audioTime = cc.audioEngine.getDuration(audioID) - 1;
          this.scheduleOnce(() => {
            cc.audioEngine.stop(audioID);
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
        if (this.musicOff.active && this.soundClick) {
          cc.audioEngine.stop(this.remoteMusicBackground);
          this.musicSlotState = 0;
        } else {
          var musicId = this.randomBetween(0, this.musicBackground.length - 1);
          this.remoteMusicBackground = cc.audioEngine.playMusic(this.musicBackground[musicId], true);
          this.musicSlotState = 1;
        }
      }
      initMusicAndSound() {
        this.musicSlotState = 0;
        this.soundSlotState = 0;
        this.musicOff.active = true;
        this.soundOff.active = true;
        1 == this.musicSlotState && (this.remoteMusicBackground = cc.audioEngine.playMusic(this.musicBackground[0], true));
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
  }, {} ],
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
}, {}, [ "SlotCayKhe.Cmd", "SlotCayKhe.Controller", "SlotCayKhe.PopupBonus", "SlotCayKhe.PopupGuide", "SlotCayKhe.PopupHistory", "SlotCayKhe.PopupJackpotHistory", "SlotCayKhe.PopupSelectLine", "SlotCayKhe.SoundControler", "SlotCayKhe.SpinControler", "SlotCayKhe.TrialResults" ]);