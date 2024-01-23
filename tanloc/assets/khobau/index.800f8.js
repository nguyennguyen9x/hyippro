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
  "SlotKhoBau.Cmd": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b49b0GE0yVBrYKz3DqZUmPI", "SlotKhoBau.Cmd");
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
    (function(cmd) {
      class Code {}
      Code.SUBCRIBE = 2003;
      Code.UNSUBCRIBE = 2004;
      Code.CHANGE_ROOM = 2005;
      Code.PLAY = 2001;
      Code.UPDATE_RESULT = 2001;
      Code.UPDATE_POT = 2002;
      Code.AUTO = 2006;
      Code.STOP_AUTO = 2006;
      Code.FORCE_STOP_AUTO = 2008;
      Code.DATE_X2 = 2009;
      Code.BIG_WIN = 2010;
      Code.SUBCRIBE_RESPONSE = 2011;
      Code.FREE_DAI_LY = 2012;
      Code.MINIMIZE = 2013;
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
        constructor(betValue, lines) {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.PLAY);
          this.packHeader();
          this.putInt(betValue);
          this.putString(lines);
          this.updateSize();
        }
      }
      cmd.SendPlay = SendPlay;
      class SendChangeRoom extends Network_OutPacket_1.default {
        constructor(roomLeavedId, roomJoinedId) {
          super();
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
          this.valueRoom1 = 0;
          this.valueRoom2 = 0;
          this.valueRoom3 = 0;
          this.x21 = 0;
          this.x22 = 0;
          this.valueRoom1 = this.getLong();
          this.valueRoom2 = this.getLong();
          this.valueRoom3 = this.getLong();
          this.x21 = this.getByte();
          this.x22 = this.getByte();
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
          this.awardsDetail = "";
          this.selectedAllAwardsDetail = "";
          this.listSuggestionActions = [];
          this.ref = this.getLong();
          this.result = this.getByte();
          this.matrix = this.getString();
          this.linesWin = this.getString();
          this.haiSao = this.getString();
          this.prize = this.getLong();
          this.currentMoney = this.getLong();
          this.awardsDetail = JSON.parse(this.getString() || "{}");
          this.selectedAllAwardsDetail = this.getString();
          let actionsStr = this.getString();
          if (actionsStr) {
            let actions = JSON.parse(actionsStr);
            (null === actions || void 0 === actions ? void 0 : actions.hasOwnProperty("object")) && Array.isArray(actions["object"]) && (this.listSuggestionActions = Constants_1.UserActions.toEnums(actions["object"]));
          }
        }
      }
      cmd.ReceiveResult = ReceiveResult;
      class ReceiveSubcribe extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.remain = 0;
          this.currentMoney = 0;
          this.dateX2 = "";
          this.items = "";
          this.awards = "";
          this.linesConfig = "";
          this.remain = this.getByte();
          this.currentMoney = this.getLong();
          this.dateX2 = this.getString();
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
    "../../Main/Game/src/common/Constants": void 0,
    "../../Main/Game/src/networks/Network.InPacket": void 0,
    "../../Main/Game/src/networks/Network.OutPacket": void 0
  } ],
  "SlotKhoBau.Controller": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9c3082L2FtNSJbk1i+7SQDr", "SlotKhoBau.Controller");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.SlotKhoBauController = exports.GameConfig = exports.Line = exports.Cell = exports.Award = exports.Item = void 0;
    const SlotKhoBau_Cmd_1 = require("./SlotKhoBau.Cmd");
    const Tween_1 = require("../../Main/Game/src/common/Tween");
    const Network_InPacket_1 = require("../../Main/Game/src/networks/Network.InPacket");
    const SlotNetworkClient_1 = require("../../Main/Game/src/networks/SlotNetworkClient");
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const SlotKhoBau_TrialResults_1 = require("./SlotKhoBau.TrialResults");
    const SlotKhoBau_PopupSelectLine_1 = require("./SlotKhoBau.PopupSelectLine");
    const SlotKhoBau_PopupBonus_1 = require("./SlotKhoBau.PopupBonus");
    const SlotKhoBau_PopupHistory_1 = require("./SlotKhoBau.PopupHistory");
    const SlotKhoBau_PopupJackpotHistory_1 = require("./SlotKhoBau.PopupJackpotHistory");
    const SlotKhoBau_PopupGuide_1 = require("./SlotKhoBau.PopupGuide");
    const BroadcastReceiver_1 = require("../../Main/Game/src/common/BroadcastReceiver");
    const App_1 = require("../../Main/Game/src/common/App");
    const SlotKhoBau_SoundControler_1 = require("./SlotKhoBau.SoundControler");
    const SlotKhoBau_SpinControler_1 = require("./SlotKhoBau.SpinControler");
    const Network_Cmd_1 = require("../../Main/Game/src/networks/Network.Cmd");
    const ErrorLogger_1 = require("../../Main/Game/src/common/ErrorLogger");
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
    class Cell {
      constructor(parameters) {
        this.row = null === parameters || void 0 === parameters ? void 0 : parameters.row;
        this.col = null === parameters || void 0 === parameters ? void 0 : parameters.col;
        this.item = null === parameters || void 0 === parameters ? void 0 : parameters.item;
      }
    }
    exports.Cell = Cell;
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
    let SlotKhoBauController = class SlotKhoBauController extends cc.Component {
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
        this.lblJackpot = null;
        this.lblCoin = null;
        this.lblWinNow = null;
        this.toast = null;
        this.effectBigWin = null;
        this.effectJackpot = null;
        this.effectBonus = null;
        this.btnBack = null;
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
        this.arrLineSelect = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 ];
        this.canSpin = true;
        this.isTrial = false;
        this.spinMode = SlotKhoBau_SpinControler_1.SpinMode.NORMAL;
        this.GAME_CONFIG = null;
      }
      onLoad() {
        BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.SET_SOUND, cc.find("Canvas"));
      }
      start() {
        var _a;
        this.betIdx = Configs_1.default.Login.Coin >= Configs_1.default.App.RICH_MAN ? 1 : 0;
        this.spinControler.setInfoBet(this.isTrial, this.arrLineSelect.length.toString(), this.LISTBETLABEL[this.betIdx], this.arrLineSelect.length * this.LISTBET[this.betIdx]);
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
          switch (inpacket.getCmdId()) {
           case Network_Cmd_1.default.Code.NOTIFY_DISCONNECT:
            {
              let res = new Network_Cmd_1.default.ReceivedNotifyDisconnect(data);
              cc.log(res);
              ErrorLogger_1.ErrorLogger.sendLogError("USER_DISCONNECTED", "SlotKhoBau", "reason: " + res.reason);
            }
            break;

           case SlotKhoBau_Cmd_1.default.Code.UPDATE_POT:
            {
              let res = new SlotKhoBau_Cmd_1.default.ReceiveUpdatePot(data);
              switch (this.betIdx) {
               case 0:
                Tween_1.default.numberTo(this.lblJackpot, res.valueRoom1, .3);
                break;

               case 1:
                Tween_1.default.numberTo(this.lblJackpot, res.valueRoom2, .3);
                break;

               case 2:
                Tween_1.default.numberTo(this.lblJackpot, res.valueRoom3, .3);
              }
            }
            break;

           case SlotKhoBau_Cmd_1.default.Code.UPDATE_RESULT:
            {
              let res = new SlotKhoBau_Cmd_1.default.ReceiveResult(data);
              cc.log(res);
              res && this.onSpinResult(res);
            }
            break;

           case SlotKhoBau_Cmd_1.default.Code.SUBCRIBE_RESPONSE:
            {
              let res = new SlotKhoBau_Cmd_1.default.ReceiveSubcribe(data);
              this.initLineConfig(res);
            }
          }
        }, this);
        SlotNetworkClient_1.default.getInstance().send(new SlotKhoBau_Cmd_1.default.SendSubcribe(this.betIdx));
        this.resetState(true);
        this.spinControler.lblTotalBet.string = Utils_1.default.formatNumber(this.arrLineSelect.length * this.LISTBET[this.betIdx]);
        BroadcastReceiver_1.default.register(BroadcastReceiver_1.default.USER_UPDATE_COIN, () => {
          Tween_1.default.numberTo(this.lblCoin, Configs_1.default.Login.Coin, .3);
        }, this);
        BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN);
        null === (_a = App_1.default.instance) || void 0 === _a ? void 0 : _a.showErrLoading("\u0110ang k\u1ebft n\u1ed1i t\u1edbi server...");
        SlotNetworkClient_1.default.getInstance().checkConnect(() => {});
        this.spinControler.spin = this.spin.bind(this);
        this.spinControler.spinAuto = this.toggleAutoOnCheck.bind(this);
        this.spinControler.setClickSpin();
        this.settingSoundClick();
      }
      settingSoundClick() {
        let findBtn = (node, path) => {
          try {
            let btn = node.getComponent(cc.Button) || node.getComponent(cc.Toggle);
            if (btn && 0 == btn.clickEvents.filter(evt => evt && "playSoundClick" == evt.handler).length) {
              let eventHandler = new cc.Component.EventHandler();
              eventHandler.target = this.node;
              eventHandler.component = "SlotKhoBau.Controller";
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
      initLineConfig(dataLineConfig) {
        var _a, _b, _c, _d, _e;
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
        this.initLine(null === (_d = this.GAME_CONFIG) || void 0 === _d ? void 0 : _d.linesConfig);
        this.GAME_CONFIG.items.length != this.sprFrameItems.getSpriteFrames().length && ErrorLogger_1.ErrorLogger.sendLogError("Game config error", "Slot KHOBAU", "ITEMS not matching (server " + this.GAME_CONFIG.items.length + " - client " + this.sprFrameItems.getSpriteFrames().length + ")");
        this.GAME_CONFIG.linesConfig.length != this.arrLineSelect.length && ErrorLogger_1.ErrorLogger.sendLogError("Game config error", "Slot KHOBAU", "LINES not matching (server " + this.GAME_CONFIG.linesConfig.length + " - client " + this.arrLineSelect.length + ")");
        null === (_e = App_1.default.instance) || void 0 === _e ? void 0 : _e.showLoading(false);
      }
      initItemRamdom() {
        this.columns.children.forEach((colum, index) => {
          var _a;
          for (let j = 0; j < 9; j++) {
            let item = colum.children[j];
            if (!item) {
              item = cc.instantiate(this.itemTemplate);
              item.parent = colum;
            }
            let iconId = Utils_1.default.randomRangeInt(0, this.sprFrameItems.getSpriteFrames().length);
            let name = null === (_a = this.GAME_CONFIG.items.find(item => item.id == iconId)) || void 0 === _a ? void 0 : _a.name;
            item.getChildByName("img").getComponent(cc.Sprite).spriteFrame = this.sprFrameItemsBlur.getSpriteFrame(name);
            if (j >= 3) {
              item.getChildByName("img").active = true;
              item.getChildByName("ani").active = false;
            } else item.getChildByName("ani").children.forEach(item2 => {
              name == item2.name && item2.getChildByName("ani-item").getComponent(sp.Skeleton).setAnimation(0, "normal", true);
              item2.getChildByName("boder-item-win").active = false;
              item2.active = name == item2.name;
            });
          }
        });
      }
      initLine(linesConfig) {
        null === linesConfig || void 0 === linesConfig ? void 0 : linesConfig.forEach(line => {
          let nodeListLine = this.linesWin.getChildByName(line.name);
          nodeListLine.getChildByName("lines").removeAllChildren();
          for (let index = 1; index < line.cells.length; index++) {
            let cell_current = line.cells.find(cell => cell.col == index);
            let cell_befor = line.cells.find(cell => cell.col == index - 1);
            let nodeLine = cc.instantiate(this.line);
            nodeLine.active = true;
            nodeLine.y = 0;
            nodeLine.getComponent(cc.Sprite).spriteFrame = this.listLine.getSpriteFrame(cell_befor.row + "t" + cell_current.row);
            nodeListLine.getChildByName("lines").addChild(nodeLine);
          }
        });
      }
      onSelectedLineChanged(lines) {
        this.arrLineSelect = lines;
        this.spinControler.setInfoBet(this.isTrial, this.arrLineSelect.length.toString(), this.LISTBETLABEL[this.betIdx], this.arrLineSelect.length * this.LISTBET[this.betIdx]);
      }
      resetState(setCanSpin = false) {
        this.canSpin = this.canSpin || setCanSpin;
        this.toast.active = false;
        this.effectJackpot.active = false;
        this.effectBigWin.active = false;
        this.stopAllEffects();
        this.linesWin.stopAllActions();
        for (var i = 0; i < this.linesWin.childrenCount; i++) this.linesWin.children[i].active = false;
      }
      actBet() {
        if (this.isTrial) {
          this.showToast("T\xednh n\u0103ng n\xe0y kh\xf4ng ho\u1ea1t \u0111\u1ed9ng \u1edf ch\u1ebf \u0111\u1ed9 ch\u01a1i th\u1eed.");
          return;
        }
        var oldIdx = this.betIdx;
        this.betIdx++;
        this.betIdx == this.LISTBET.length && (this.betIdx = 0);
        this.spinControler.setInfoBet(this.isTrial, this.arrLineSelect.length.toString(), this.LISTBETLABEL[this.betIdx], this.arrLineSelect.length * this.LISTBET[this.betIdx]);
        SlotNetworkClient_1.default.getInstance().send(new SlotKhoBau_Cmd_1.default.SendChangeRoom(oldIdx, this.betIdx));
      }
      commonClickHandler() {
        this.soundControler.commonClickHandler();
      }
      actBack() {
        SlotNetworkClient_1.default.getInstance().send(new SlotKhoBau_Cmd_1.default.SendUnSubcribe(this.betIdx));
        cc.audioEngine.stopAll();
        cc.director.loadScene("Lobby", () => {
          let bundleKhoBau = cc.assetManager.getBundle(Configs_1.default.App.BUNDLE_NAME.KHOBAU);
          bundleKhoBau.releaseAll();
          cc.assetManager.removeBundle(bundleKhoBau);
        });
      }
      actHidden() {
        this.showToast("T\xednh n\u0103ng \u0111ang ph\xe1t tri\u1ec3n.");
      }
      actTrial() {
        this.isTrial = !this.isTrial;
        this.setSpinMode(SlotKhoBau_SpinControler_1.SpinMode.NORMAL);
        this.isTrial ? this.spinControler.setInfoBet(this.isTrial, "20", "100", 2e3) : this.spinControler.setInfoBet(this.isTrial, this.arrLineSelect.length.toString(), this.LISTBET[this.betIdx], this.arrLineSelect.length * this.LISTBET[this.betIdx]);
      }
      toggleAutoOnCheck() {
        if (this.isTrial) {
          this.setSpinMode(SlotKhoBau_SpinControler_1.SpinMode.NORMAL);
          this.showToast("T\xednh n\u0103ng n\xe0y kh\xf4ng ho\u1ea1t \u0111\u1ed9ng \u1edf ch\u1ebf \u0111\u1ed9 ch\u01a1i th\u1eed.");
          return;
        }
        if (this.spinControler.spinType.auto) this.setSpinMode(SlotKhoBau_SpinControler_1.SpinMode.NORMAL); else {
          this.setSpinMode(SlotKhoBau_SpinControler_1.SpinMode.AUTO);
          this.spinControler.setStageButtonSpin(true);
        }
      }
      toggleBoostOnCheck() {
        if (this.isTrial) {
          this.showToast("T\xednh n\u0103ng n\xe0y kh\xf4ng ho\u1ea1t \u0111\u1ed9ng \u1edf ch\u1ebf \u0111\u1ed9 ch\u01a1i th\u1eed.");
          return;
        }
        if (this.spinControler.spinType.autox2) this.spinControler.spinType.auto ? this.setSpinMode(SlotKhoBau_SpinControler_1.SpinMode.AUTO) : this.setSpinMode(SlotKhoBau_SpinControler_1.SpinMode.NORMAL); else {
          this.setSpinMode(SlotKhoBau_SpinControler_1.SpinMode.AUTO_X2);
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
          this.setSpinMode(SlotKhoBau_SpinControler_1.SpinMode.NORMAL);
          return;
        }
        if (!this.canSpin) return;
        this.resetState(callByClick);
        this.canSpin = false;
        this.setEnabledAllButtonsExceptPlayMode(false);
        if (this.isTrial) {
          var rIdx = Utils_1.default.randomRangeInt(0, SlotKhoBau_TrialResults_1.default.results.length);
          let result = SlotKhoBau_TrialResults_1.default.results[rIdx];
          3 == result.result && (result.prize = Utils_1.default.stringToInt(this.lblJackpot.string));
          this.onSpinResult(result);
        } else SlotNetworkClient_1.default.getInstance().send(new SlotKhoBau_Cmd_1.default.SendPlay(this.LISTBET[this.betIdx], this.arrLineSelect.toString()));
      }
      resetPositionColums() {
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
        var _a, _b;
        this.resetPositionColums();
        var listTypeResult = [ 0, 1, 2, 3, 5, 6 ];
        if (-1 === listTypeResult.indexOf(receiveResult.result)) {
          this.setSpinMode(SlotKhoBau_SpinControler_1.SpinMode.NORMAL);
          this.canSpin = true;
          this.setEnabledAllButtonsExceptPlayMode(true);
          switch (receiveResult.result) {
           case 102:
            App_1.default.instance.actiontDialog.showMsgWithActions("S\u1ed1 d\u01b0 kh\xf4ng \u0111\u1ee7, vui l\xf2ng n\u1ea1p th\xeam.", receiveResult.listSuggestionActions);
            break;

           default:
            this.showToast("C\xf3 l\u1ed7i s\u1ea3y ra, vui l\xf2ng th\u1eed l\u1ea1i.");
          }
          return;
        }
        if (!this.isTrial) {
          let curMoney = Configs_1.default.Login.Coin - this.arrLineSelect.length * this.LISTBET[this.betIdx];
          Tween_1.default.numberTo(this.lblCoin, curMoney, .3);
          Configs_1.default.Login.Coin = receiveResult.currentMoney;
        }
        let matrixOneDimensional = null === (_a = receiveResult.matrix) || void 0 === _a ? void 0 : _a.split(",");
        if (!matrixOneDimensional) {
          null === (_b = App_1.default.instance) || void 0 === _b ? void 0 : _b.showErrLoading("\u0110\xe3 x\u1ea3y ra l\u1ed7i...");
          return;
        }
        let matrix = [ matrixOneDimensional.slice(0, 5), matrixOneDimensional.slice(5, 10), matrixOneDimensional.slice(10, 15) ];
        let speedRoll = this.spinControler.spinType.autox2 ? .5 : 1;
        this.soundControler.playSounWithID(7, speedRoll);
        this.columns.parent.setContentSize(cc.winSize.width, 380);
        this.columns.children.forEach((colum, index) => {
          var _a;
          for (let j = 3; j < 9; j++) {
            let item = colum.children[j];
            let iconId = Utils_1.default.randomRangeInt(0, this.sprFrameItems.getSpriteFrames().length);
            let name = null === (_a = this.GAME_CONFIG.items.find(item => item.id == iconId)) || void 0 === _a ? void 0 : _a.name;
            item.getChildByName("img").getComponent(cc.Sprite).spriteFrame = this.sprFrameItemsBlur.getSpriteFrame(name);
            item.getChildByName("img").active = true;
            item.getChildByName("ani").active = false;
          }
          let stepRollDown = colum.height - 3 * this.itemHeight;
          let actionRoll = [ cc.delayTime(this.ADD_SPIN_DURATION * index), cc.moveTo(.5 * speedRoll, cc.v2(colum.position.x, -stepRollDown)), cc.callFunc(() => {
            var _a;
            for (let j = 0; j < 9; j++) {
              let item = colum.children[j];
              let iconId = j < 3 || j >= 6 ? matrix[2 - j % 3][index] : Utils_1.default.randomRangeInt(0, this.sprFrameItems.getSpriteFrames().length);
              let name = null === (_a = this.GAME_CONFIG.items.find(item => item.id == iconId)) || void 0 === _a ? void 0 : _a.name;
              item.getChildByName("img").getComponent(cc.Sprite).spriteFrame = this.sprFrameItemsBlur.getSpriteFrame(name);
              item.getChildByName("img").active = true;
              item.getChildByName("ani").children.forEach(item2 => {
                item2.active = false;
              });
            }
            colum.setPosition(cc.v2(colum.position.x, 0));
          }) ];
          for (let index = 0; index < 2; index++) {
            actionRoll.push(cc.moveTo(.5 * speedRoll, cc.v2(colum.position.x, -stepRollDown)));
            actionRoll.push(cc.callFunc(() => {
              colum.setPosition(cc.v2(colum.position.x, 0));
            }));
          }
          actionRoll.push(cc.moveTo(.5 * speedRoll, cc.v2(colum.position.x, 60 - stepRollDown)));
          actionRoll.push(cc.callFunc(() => {
            colum.setPosition(cc.v2(colum.position.x, 60));
          }));
          actionRoll.push(cc.callFunc(() => {
            colum.children.forEach((item, index) => {
              var _a;
              item.getChildByName("img").active = false;
              if (index < 3) {
                item.getChildByName("ani").active = true;
                let iconId = Utils_1.default.randomRangeInt(0, this.sprFrameItems.getSpriteFrames().length);
                let name = null === (_a = this.GAME_CONFIG.items.find(item => item.id == iconId)) || void 0 === _a ? void 0 : _a.name;
                item.getChildByName("ani").children.forEach(item2 => {
                  name == item2.name && item2.getChildByName("ani-item").getComponent(sp.Skeleton).setAnimation(0, "normal", true);
                  item2.getChildByName("boder-item-win").active = false;
                  item2.active = name == item2.name;
                });
              }
            });
          }));
          actionRoll.push(cc.callFunc(() => {
            4 === index && this.spined(receiveResult);
          }));
          let showResult = cc.callFunc(() => {
            var _a;
            var children = colum.children;
            for (let i = 0; i < 3; i++) {
              let nameItem = null === (_a = this.GAME_CONFIG.items.find(item => item.id == matrix[2 - i][index])) || void 0 === _a ? void 0 : _a.name;
              children[i].getChildByName("ani").active && children[i].getChildByName("ani").children.forEach(item2 => {
                nameItem == item2.name && nameItem == item2.name && item2.getChildByName("ani-item").getComponent(sp.Skeleton).setAnimation(0, "normal", true);
                item2.active = nameItem == item2.name;
              });
            }
          });
          actionRoll.push(showResult);
          actionRoll.push(cc.moveTo(.5 * speedRoll * (90 / stepRollDown) * 2, cc.v2(colum.position.x, -30)));
          actionRoll.push(cc.moveTo(.05 * speedRoll, cc.v2(colum.position.x, 0)));
          colum.runAction(cc.sequence(actionRoll));
        });
      }
      spined(receiveResult) {
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
          this.showEffectBonus(() => {
            cc.assetManager.getBundle(Configs_1.default.App.BUNDLE_NAME.KHOBAU).load("res/prefabs/PopupBonus", cc.Prefab, (error, prefab) => {
              if (error) return;
              this.popupBonus = cc.instantiate(prefab).getComponent(SlotKhoBau_PopupBonus_1.default);
              this.scene.addChild(this.popupBonus.node);
              this.popupBonus.node.position = cc.v3(0, 0);
              this.popupBonus.showBonus(this.isTrial ? 100 : this.LISTBET[this.betIdx], receiveResult.haiSao, () => {
                this.showLineWins(receiveResult);
              });
              this.settingSoundClick();
            });
          });
        }
      }
      stopAllEffects() {
        this.effectJackpot.stopAllActions();
        this.effectJackpot.active = false;
        this.effectBigWin.stopAllActions();
        this.effectBigWin.active = false;
      }
      showLineWins(receiveResult) {
        var _a, _b, _c, _d, _e;
        this.canSpin = true;
        Tween_1.default.numberTo(this.lblWinNow, receiveResult.prize, .3);
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
          nodeLine.getChildByName("money").active = false;
          nodeLine.getChildByName("money").getComponent(cc.Label).string = null === award || void 0 === award ? void 0 : award.money;
        }
        let actions = [];
        cc.log(receiveResult);
        if (receiveResult.prize > 0) {
          actions.push(cc.delayTime(1));
          let hideAllLine = cc.callFunc(() => {
            this.linesWin.children.forEach(line => {
              line.active = false;
              line.getChildByName("money").active = false;
            });
          }, this);
          actions.push(hideAllLine);
          actions.push(cc.delayTime(.3));
          if (!this.spinControler.spinType.autox2) for (const award of null === (_c = receiveResult.awardsDetail) || void 0 === _c ? void 0 : _c.object) {
            const nodeLine = this.linesWin.getChildByName(award.lineName);
            if (!nodeLine) continue;
            let line = this.GAME_CONFIG.linesConfig.find(line => line.name == award.lineName);
            let typeWild = null === (_d = this.GAME_CONFIG.items.find(item => "WILD" == item.itemType)) || void 0 === _d ? void 0 : _d.name;
            let typeWin = null === (_e = this.GAME_CONFIG.items.find(item => award.award.includes(item.value) || award.award.includes(item.name.toUpperCase()))) || void 0 === _e ? void 0 : _e.name;
            let showAnimationItemWin = cc.callFunc(() => {
              nodeLine.active = true;
              line.cells.forEach((cell, index) => {
                var _a;
                let typeCell = null === (_a = this.GAME_CONFIG.items.find(item => item.id == matrix[cell.row][cell.col])) || void 0 === _a ? void 0 : _a.name;
                rolls[cell.col].children[2 - cell.row].getChildByName("ani").children.forEach((child, index) => {
                  child.active = child.name == typeCell;
                  if (typeWin == typeCell || typeWild == typeCell) {
                    child.getChildByName("boder-item-win").active = true;
                    child.getChildByName("boder-item-win").getComponent(sp.Skeleton).setAnimation(0, "animation", false);
                    child.getChildByName("ani-item").getComponent(sp.Skeleton).setAnimation(0, "animation", false);
                  }
                });
              });
            });
            let hideLine = cc.callFunc(() => {
              nodeLine.active = false;
              this.columns.children.forEach(colum => {
                colum.children.forEach(item => {
                  item.getChildByName("ani").active && item.getChildByName("ani").children.forEach(item2 => {
                    item2.active && item2.getChildByName("ani-item").getComponent(sp.Skeleton).setAnimation(0, "normal", true);
                    item2.getChildByName("boder-item-win").active = false;
                  });
                });
              });
            }, this);
            actions.push(showAnimationItemWin);
            actions.push(cc.delayTime(1.7));
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
        this.effectJackpot.opacity = 0;
        this.effectJackpot.active = true;
        let label = this.effectJackpot.getComponentInChildren(cc.Label);
        label.node.opacity = 0;
        this.effectJackpot.runAction(cc.sequence(cc.callFunc(() => {
          this.effectJackpot.getComponentsInChildren(sp.Skeleton).forEach(ani => {
            ani.setAnimation(0, "animation", false);
          });
          label.string = "";
          label.node.runAction(cc.fadeIn(.18));
          Tween_1.default.numberTo(label, cash, 1);
        }), cc.fadeIn(.18), cc.delayTime(4.8), cc.callFunc(() => {
          label.node.runAction(cc.fadeOut(.18));
        }), cc.delayTime(.3), cc.fadeOut(.18), cc.callFunc(() => {
          this.effectJackpot.active = false;
          null != cb && cb();
        })));
      }
      showEffectBonus(cb) {
        this.effectBonus.stopAllActions();
        this.effectBonus.active = true;
        this.effectBonus.getComponentInChildren(sp.Skeleton).setAnimation(0, "jackpot-mario", false);
        this.effectBonus.runAction(cc.sequence(cc.delayTime(3), cc.callFunc(() => {
          this.effectBonus.active = false;
          null != cb && cb();
        })));
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
        let panel = event.target.getChildByName("panel");
        if (panel.active) panel.runAction(cc.sequence(cc.scaleTo(.15, 0, 1), cc.callFunc(temp => {
          temp.active = false;
        }))); else {
          panel.active = true;
          panel.scaleX = 0;
          panel.runAction(cc.sequence(cc.scaleTo(.15, 1, 1), cc.callFunc(temp => {})));
        }
      }
      settingSound() {
        this.soundControler.settingSound();
      }
      settingMusic() {
        this.soundControler.settingMusic();
      }
      showPopupSelectLine(evt) {
        if (this.isTrial) {
          this.showToast("T\xednh n\u0103ng n\xe0y kh\xf4ng ho\u1ea1t \u0111\u1ed9ng \u1edf ch\u1ebf \u0111\u1ed9 ch\u01a1i th\u1eed.");
          return;
        }
        if (this.popupSelectLine) this.popupSelectLine.show(); else {
          evt.target && evt.target.getComponent(cc.Button) && (evt.target.getComponent(cc.Button).enabled = false);
          cc.assetManager.getBundle(Configs_1.default.App.BUNDLE_NAME.KHOBAU).load("res/prefabs/PopupSelectLine", cc.Prefab, (error, prefab) => {
            var _a, _b;
            if (error) return;
            if (this.popupSelectLine) {
              this.popupSelectLine.node.position = cc.v3(0, 0);
              this.popupSelectLine.onSelectedChanged = this.onSelectedLineChanged.bind(this);
              this.popupSelectLine.showPopup(null === (_a = this.GAME_CONFIG) || void 0 === _a ? void 0 : _a.linesConfig);
            }
            this.popupSelectLine = cc.instantiate(prefab).getComponent(SlotKhoBau_PopupSelectLine_1.default);
            this.scene.addChild(this.popupSelectLine.node);
            this.popupSelectLine.node.position = cc.v3(0, 0);
            this.popupSelectLine.onSelectedChanged = this.onSelectedLineChanged.bind(this);
            this.popupSelectLine.showPopup(null === (_b = this.GAME_CONFIG) || void 0 === _b ? void 0 : _b.linesConfig);
            evt.target && evt.target.getComponent(cc.Button) && (evt.target.getComponent(cc.Button).enabled = true);
            this.settingSoundClick();
          });
        }
      }
      showJackpotHistory(evt) {
        if (this.popupJackpotHistory) this.popupJackpotHistory.show(); else {
          evt.target && evt.target.getComponent(cc.Button) && (evt.target.getComponent(cc.Button).enabled = false);
          cc.assetManager.getBundle(Configs_1.default.App.BUNDLE_NAME.KHOBAU).load("res/prefabs/PopupJackpotHistory", cc.Prefab, (error, prefab) => {
            if (error) return;
            if (this.popupJackpotHistory) {
              this.popupJackpotHistory.node.position = cc.v3(0, 0);
              this.popupJackpotHistory.show();
            }
            this.popupJackpotHistory = cc.instantiate(prefab).getComponent(SlotKhoBau_PopupJackpotHistory_1.default);
            this.scene.addChild(this.popupJackpotHistory.node);
            this.popupJackpotHistory.node.position = cc.v3(0, 0);
            this.popupJackpotHistory.show();
            evt.target && evt.target.getComponent(cc.Button) && (evt.target.getComponent(cc.Button).enabled = true);
            this.settingSoundClick();
          });
        }
      }
      showHistory(evt) {
        if (this.popupHistory) this.popupHistory.show(); else {
          evt.target && evt.target.getComponent(cc.Button) && (evt.target.getComponent(cc.Button).enabled = false);
          cc.assetManager.getBundle(Configs_1.default.App.BUNDLE_NAME.KHOBAU).load("res/prefabs/PopupHistory", cc.Prefab, (error, prefab) => {
            if (error) return;
            if (this.popupHistory) {
              this.popupHistory.node.position = cc.v3(0, 0);
              this.popupHistory.show();
            }
            this.popupHistory = cc.instantiate(prefab).getComponent(SlotKhoBau_PopupHistory_1.default);
            this.scene.addChild(this.popupHistory.node);
            this.popupHistory.node.position = cc.v3(0, 0);
            this.popupHistory.show();
            evt.target && evt.target.getComponent(cc.Button) && (evt.target.getComponent(cc.Button).enabled = true);
            this.settingSoundClick();
          });
        }
      }
      showGuide(evt) {
        if (this.popupGuide) this.popupGuide.show(); else {
          evt.target && evt.target.getComponent(cc.Button) && (evt.target.getComponent(cc.Button).enabled = false);
          cc.assetManager.getBundle(Configs_1.default.App.BUNDLE_NAME.KHOBAU).load("res/prefabs/PopupGuide", cc.Prefab, (error, prefab) => {
            if (error) return;
            if (this.popupGuide) {
              this.popupGuide.node.position = cc.v3(0, 0);
              this.popupGuide.init(this.GAME_CONFIG);
              return;
            }
            this.popupGuide = cc.instantiate(prefab).getComponent(SlotKhoBau_PopupGuide_1.default);
            this.scene.addChild(this.popupGuide.node);
            this.popupGuide.node.position = cc.v3(0, 0);
            this.popupGuide.init(this.GAME_CONFIG);
            evt.target && evt.target.getComponent(cc.Button) && (evt.target.getComponent(cc.Button).enabled = true);
            this.settingSoundClick();
          });
        }
      }
    };
    __decorate([ property(cc.Node) ], SlotKhoBauController.prototype, "scene", void 0);
    __decorate([ property(cc.SpriteAtlas) ], SlotKhoBauController.prototype, "sprFrameItems", void 0);
    __decorate([ property(cc.SpriteAtlas) ], SlotKhoBauController.prototype, "sprFrameItemsBlur", void 0);
    __decorate([ property(cc.Node) ], SlotKhoBauController.prototype, "itemTemplate", void 0);
    __decorate([ property(cc.Node) ], SlotKhoBauController.prototype, "columns", void 0);
    __decorate([ property(cc.Node) ], SlotKhoBauController.prototype, "linesWin", void 0);
    __decorate([ property(cc.Node) ], SlotKhoBauController.prototype, "line", void 0);
    __decorate([ property(cc.SpriteAtlas) ], SlotKhoBauController.prototype, "listLine", void 0);
    __decorate([ property(cc.Label) ], SlotKhoBauController.prototype, "lblJackpot", void 0);
    __decorate([ property(cc.Label) ], SlotKhoBauController.prototype, "lblCoin", void 0);
    __decorate([ property(cc.Label) ], SlotKhoBauController.prototype, "lblWinNow", void 0);
    __decorate([ property(cc.Node) ], SlotKhoBauController.prototype, "toast", void 0);
    __decorate([ property(cc.Node) ], SlotKhoBauController.prototype, "effectBigWin", void 0);
    __decorate([ property(cc.Node) ], SlotKhoBauController.prototype, "effectJackpot", void 0);
    __decorate([ property(cc.Node) ], SlotKhoBauController.prototype, "effectBonus", void 0);
    __decorate([ property(cc.Button) ], SlotKhoBauController.prototype, "btnBack", void 0);
    __decorate([ property(SlotKhoBau_SpinControler_1.default) ], SlotKhoBauController.prototype, "spinControler", void 0);
    __decorate([ property(SlotKhoBau_SoundControler_1.default) ], SlotKhoBauController.prototype, "soundControler", void 0);
    SlotKhoBauController = __decorate([ ccclass ], SlotKhoBauController);
    exports.SlotKhoBauController = SlotKhoBauController;
    exports.default = SlotKhoBauController;
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
    "./SlotKhoBau.Cmd": "SlotKhoBau.Cmd",
    "./SlotKhoBau.PopupBonus": "SlotKhoBau.PopupBonus",
    "./SlotKhoBau.PopupGuide": "SlotKhoBau.PopupGuide",
    "./SlotKhoBau.PopupHistory": "SlotKhoBau.PopupHistory",
    "./SlotKhoBau.PopupJackpotHistory": "SlotKhoBau.PopupJackpotHistory",
    "./SlotKhoBau.PopupSelectLine": "SlotKhoBau.PopupSelectLine",
    "./SlotKhoBau.SoundControler": "SlotKhoBau.SoundControler",
    "./SlotKhoBau.SpinControler": "SlotKhoBau.SpinControler",
    "./SlotKhoBau.TrialResults": "SlotKhoBau.TrialResults"
  } ],
  "SlotKhoBau.PopupBonus": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2aa54mjdltBdqoje2blWjHU", "SlotKhoBau.PopupBonus");
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
    const {ccclass: ccclass, property: property} = cc._decorator;
    let PopupBonus = class PopupBonus extends Dialog_1.default {
      constructor() {
        super(...arguments);
        this.items = null;
        this.special = null;
        this.itemSpecial = null;
        this.lblLeft = null;
        this.lblFactor = null;
        this.factor = 1;
        this.left = 0;
        this.betValue = 0;
        this.onFinished = null;
        this.onSpecialFinished = null;
        this.dataBonus = [];
        this.dataSpecial = -1;
      }
      start() {
        for (let i = 0; i < this.items.childrenCount; i++) {
          let node = this.items.children[i];
          let btn = node.getChildByName("btn").getComponent(cc.Button);
          let icon = node.getChildByName("icon");
          let label = node.getChildByName("label").getComponent(cc.Label);
          let factor = node.getChildByName("factor");
          btn.node.on("click", () => {
            var value = this.dataBonus[this.dataBonus.length - this.left];
            switch (value) {
             case 0:
              this.factor++;
              this.lblFactor.string = "x" + this.factor;
              factor.active = false;
              btn.interactable = false;
              break;

             case 1:
              btn.node.active = false;
              icon.active = true;
              label.node.active = true;
              label.string = "0";
              Tween_1.default.numberTo(label, 4 * this.betValue * this.factor, .3);
              break;

             case 2:
              this.showSpecial(10, () => {
                btn.node.active = false;
                icon.active = true;
                label.node.active = true;
                label.string = "0";
                Tween_1.default.numberTo(label, 10 * this.betValue * this.factor, .3);
                this.left <= 0 && this.hidden();
              });
              break;

             case 3:
              this.showSpecial(15, () => {
                btn.node.active = false;
                icon.active = true;
                label.node.active = true;
                label.string = "0";
                Tween_1.default.numberTo(label, 15 * this.betValue * this.factor, .3);
                this.left <= 0 && this.hidden();
              });
              break;

             case 4:
              this.showSpecial(20, () => {
                btn.node.active = false;
                icon.active = true;
                label.node.active = true;
                label.string = "0";
                Tween_1.default.numberTo(label, 20 * this.betValue * this.factor, .3);
                this.left <= 0 && this.hidden();
              });
            }
            cc.log(value);
            this.left--;
            this.lblLeft.string = "" + this.left;
            if (this.left <= 0) {
              0 !== value && 1 !== value || this.hidden();
              for (let i = 0; i < this.items.childrenCount; i++) this.items.children[i].getChildByName("btn").getComponent(cc.Button).interactable = false;
            }
          });
        }
        for (let i = 0; i < this.itemSpecial.childrenCount; i++) {
          let node = this.itemSpecial.children[i];
          let btn = node.getChildByName("btn").getComponent(cc.Button);
          let icon = node.getChildByName("icon");
          let label = node.getChildByName("label").getComponent(cc.Label);
          btn.node.on("click", () => {
            btn.interactable = false;
            btn.node.active = false;
            icon.active = true;
            label.node.active = true;
            label.string = "0";
            Tween_1.default.numberTo(label, this.dataSpecial * this.betValue * this.factor, .3);
            for (let i = 0; i < this.itemSpecial.childrenCount; i++) this.itemSpecial.children[i].getChildByName("btn").getComponent(cc.Button).interactable = false;
            this.scheduleOnce(() => {
              this.special.active = false;
              this.onSpecialFinished();
            }, 1);
          });
        }
      }
      showBonus(betValue, bonus, onFinished) {
        super.show();
        this.special.active = false;
        for (let i = 0; i < this.items.childrenCount; i++) {
          let node = this.items.children[i];
          let btn = node.getChildByName("btn").getComponent(cc.Button);
          btn.node.active = true;
          btn.interactable = true;
          node.getChildByName("icon").active = false;
          node.getChildByName("label").active = false;
          node.getChildByName("factor").active = false;
        }
        this.betValue = betValue;
        this.onFinished = onFinished;
        let arrBonus = bonus.split(",");
        this.dataBonus = [];
        for (let i = 0; i < arrBonus.length; i++) this.dataBonus.push(Number(arrBonus[i]));
        this.left = this.dataBonus.length;
        this.factor = 1;
        this.lblLeft.string = "" + this.left;
        this.lblFactor.string = "x" + this.factor;
      }
      showSpecial(data, onFinished) {
        for (let i = 0; i < this.itemSpecial.childrenCount; i++) {
          let node = this.itemSpecial.children[i];
          let btn = node.getChildByName("btn").getComponent(cc.Button);
          btn.node.active = true;
          btn.interactable = true;
          node.getChildByName("icon").active = false;
          node.getChildByName("label").active = false;
        }
        this.onSpecialFinished = onFinished;
        this.dataSpecial = data;
        this.special.active = true;
      }
      hidden() {
        this.scheduleOnce(() => {
          this.dismiss();
          this.onFinished();
        }, 1.5);
      }
    };
    __decorate([ property(cc.Node) ], PopupBonus.prototype, "items", void 0);
    __decorate([ property(cc.Node) ], PopupBonus.prototype, "special", void 0);
    __decorate([ property(cc.Node) ], PopupBonus.prototype, "itemSpecial", void 0);
    __decorate([ property(cc.Label) ], PopupBonus.prototype, "lblLeft", void 0);
    __decorate([ property(cc.Label) ], PopupBonus.prototype, "lblFactor", void 0);
    PopupBonus = __decorate([ ccclass ], PopupBonus);
    exports.PopupBonus = PopupBonus;
    exports.default = PopupBonus;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/Dialog": void 0,
    "../../Main/Game/src/common/Tween": void 0
  } ],
  "SlotKhoBau.PopupGuide": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8bc70nUeyZBP4YFr1zuc/WR", "SlotKhoBau.PopupGuide");
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
        this.btnNext = null;
        this.btnPrev = null;
        this.icons = [];
        this.itemsContent = null;
        this.itemsLayout = null;
        this.item = null;
        this.page = 0;
        this.soundSlotState = null;
        this.maxItemInLayout = 2;
      }
      init(gameConfig) {
        super.show();
        this.page = 0;
        this.btnPrev.active = true;
        this.reloadData();
        this.itemsContent.removeAllChildren();
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
            icon.spriteFrame = this.icons[item.id];
            icon.node.setScale(100 / icon.node.width);
            let title = "";
            for (let k = 0; k < aws.length; k++) {
              title += 0 == k ? "" : "\n";
              title += aws[k].duplicate;
              title += " x ";
              title += aws[k].awardType == AWARD_TYPE.MULTIPLE ? parseInt(aws[k].ratio) : aws[k].awardType;
            }
            item.itemType == ITEM_TYPE.WILD && (title += "\nThay th\u1ebf bi\u1ec3u\nt\u01b0\u1ee3ng kh\xe1c");
            node.getComponentInChildren(cc.Label).string = title;
            layout.addChild(node);
          }
          this.itemsContent.addChild(layout);
        }
      }
      actNext() {
        this.page < this.pages.length - 1 && this.page++;
        this.reloadData();
        this.page == this.pages.length - 1 && (this.btnNext.active = false);
        this.btnPrev.active = true;
      }
      actPrev() {
        this.page > 0 && this.page--;
        this.reloadData();
        0 == this.page && (this.btnPrev.active = false);
        this.btnNext.active = true;
      }
      reloadData() {
        for (let i = 0; i < this.pages.length; i++) this.pages[i].active = i == this.page;
      }
      dismiss() {
        super.dismiss();
      }
      canPlaySound() {
        var soundSave = cc.sys.localStorage.getItem("sound_Slot_1");
        this.soundSlotState = null != soundSave ? parseInt(soundSave) : 1;
        return 1 == this.soundSlotState;
      }
    };
    __decorate([ property([ cc.Node ]) ], PopupGuide.prototype, "pages", void 0);
    __decorate([ property(cc.Node) ], PopupGuide.prototype, "btnNext", void 0);
    __decorate([ property(cc.Node) ], PopupGuide.prototype, "btnPrev", void 0);
    __decorate([ property([ cc.SpriteFrame ]) ], PopupGuide.prototype, "icons", void 0);
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
  "SlotKhoBau.PopupHistory": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "31689xSqn5EO6f5Cd7398ZD", "SlotKhoBau.PopupHistory");
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
        this.scroll = null;
        this.soundSlotState = null;
        this.page = 1;
        this.curIndex = 0;
        this.maxPage = 0;
        this.items = new Array();
        this.isUpdate = false;
      }
      show() {
        super.show();
        App_1.default.instance.showLoading(true);
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
        this.curIndex = 0;
        this.loadData(this.page);
        this.loadData(this.page + 1);
      }
      loadData(index) {
        this.isUpdate = true;
        Http_1.default.get(Configs_1.default.App.API, {
          c: 137,
          p: index,
          un: Configs_1.default.Login.Nickname,
          gn: "KhoBau"
        }, (err, res) => {
          App_1.default.instance.showLoading(false);
          if (!this.node) return;
          if (null != err) return;
          if (!res["success"]) return;
          this.maxPage = res["totalPages"];
          let results = res["results"];
          this.page = index;
          cc.log(index, res);
          results.length > 0 && this.scheduleOnce(() => {
            this.isUpdate = false;
          }, 1);
          results.forEach(itemData => {
            let item = this.items[this.curIndex];
            if (!item) {
              item = cc.instantiate(this.itemTemplate);
              item.parent = this.itemTemplate.parent;
              this.items.push(item);
            }
            this.curIndex++;
            item.getChildByName("Session").getComponent(cc.Label).string = itemData["rf"];
            item.getChildByName("Time").getComponent(cc.Label).string = itemData["ts"].replace(" ", "\n");
            item.getChildByName("Bet").getComponent(cc.Label).string = Utils_1.default.formatNumber(itemData["bv"]);
            item.getChildByName("LineWin").getComponent(cc.Label).string = ("" === itemData["lw"] ? 0 : itemData["lw"].split(",").length) + "/" + ("" === itemData["lb"] ? 0 : itemData["lb"].split(",").length);
            item.getChildByName("Win").getComponent(cc.Label).string = Utils_1.default.formatNumber(itemData["pz"]);
            item.active = true;
          });
        });
      }
      scrollView() {
        let offset = this.scroll.getScrollOffset().y;
        let max_offset = this.scroll.getMaxScrollOffset().y;
        !this.isUpdate && this.page + 1 < this.maxPage && max_offset <= offset && this.loadData(this.page + 1);
      }
      canPlaySound() {
        var soundSave = cc.sys.localStorage.getItem("sound_Slot_1");
        this.soundSlotState = null != soundSave ? parseInt(soundSave) : 1;
        return 1 == this.soundSlotState;
      }
    };
    __decorate([ property(cc.Label) ], PopupHistory.prototype, "lblPage", void 0);
    __decorate([ property(cc.Node) ], PopupHistory.prototype, "itemTemplate", void 0);
    __decorate([ property(cc.ScrollView) ], PopupHistory.prototype, "scroll", void 0);
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
  "SlotKhoBau.PopupJackpotHistory": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b0cefYJ72BJoqwVtcFR+kMe", "SlotKhoBau.PopupJackpotHistory");
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
        this.atlasVip = null;
        this.page = 1;
        this.maxPage = 1;
        this.isLoad = false;
        this.curIndex = 0;
        this.items = new Array();
      }
      show() {
        super.show();
        App_1.default.instance.showLoading(true);
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
        this.curIndex = 0;
        this.loadData();
      }
      actNextPage() {
        if (this.page < this.maxPage) {
          this.page++;
          this.loadData();
        }
      }
      actPrevPage() {
        if (this.page > 1) {
          this.page--;
          this.loadData();
        }
      }
      loadData() {
        this.isLoad = true;
        Http_1.default.get(Configs_1.default.App.API, {
          c: 138,
          p: this.page,
          gn: "KhoBau"
        }, (err, res) => {
          this.isLoad = false;
          App_1.default.instance.showLoading(false);
          if (!this.node) return;
          if (null != err) return;
          if (!res["success"]) return;
          this.maxPage = res["totalPages"];
          let results = res["results"];
          let listRank = res["listUserVipRank"];
          if (0 == this.items.length) {
            for (var i = 0; i < 10; i++) {
              let item = cc.instantiate(this.itemTemplate);
              item.parent = this.itemTemplate.parent;
              this.items.push(item);
            }
            this.itemTemplate.destroy();
            this.itemTemplate = null;
          }
          this.lblPage.string = this.page + "/" + this.maxPage;
          for (let i = this.items.length - 1; i >= 0; i--) {
            let item = this.items[i];
            let itemData = results[i];
            let dataVip = res["listUserVipRank"] && res["listUserVipRank"].find(data => data.nickname == itemData["nn"]);
            if (!item) {
              item = cc.instantiate(this.itemTemplate);
              item.parent = this.itemTemplate.parent;
              this.items.push(item);
            }
            item.active = false;
            item.getChildByName("Time").getComponent(cc.Label).string = itemData["ts"].replace(" ", "\n");
            item.getChildByName("Bet").getComponent(cc.Label).string = Utils_1.default.formatNumber(itemData["bv"]);
            item.getChildByName("Account").getComponent(cc.Label).string = itemData["nn"];
            item.getChildByName("Account").color = dataVip ? cc.Color.BLACK.fromHEX(Utils_1.default.getColorVip(dataVip.rank)) : cc.Color.BLACK.fromHEX(Utils_1.default.getColorVip("VIP_0"));
            item.getChildByName("Account").getComponent(cc.LabelOutline).color = dataVip ? cc.Color.BLACK.fromHEX(Utils_1.default.getColorVip(dataVip.rank)) : cc.Color.BLACK.fromHEX(Utils_1.default.getColorVip("VIP_0"));
            item.getChildByName("vip").getComponent(cc.Sprite).spriteFrame = this.atlasVip.getSpriteFrame(dataVip.rank);
            item.getChildByName("Win").getComponent(cc.Label).string = Utils_1.default.formatNumber(itemData["pz"]);
            item.active = true;
            item.position = cc.v3(cc.winSize.width, 400);
            item.stopAllActions();
            let speed = .7;
            item.runAction(cc.sequence(cc.delayTime(.15 * (this.items.length - i) * speed), cc.moveTo(.15 * speed, cc.v2(0, 400)), cc.delayTime(.05), cc.moveTo(.2 * speed * (1 === i ? .8 : 1 - Math.pow(2, -10 * i)), cc.v2(0, 380 - 85 * i)).easing(cc.easeCircleActionOut())));
          }
        });
      }
    };
    __decorate([ property(cc.Label) ], PopupJackpotHistory.prototype, "lblPage", void 0);
    __decorate([ property(cc.Node) ], PopupJackpotHistory.prototype, "itemTemplate", void 0);
    __decorate([ property(cc.SpriteAtlas) ], PopupJackpotHistory.prototype, "atlasVip", void 0);
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
  "SlotKhoBau.PopupSelectLine": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2a2c0ynf8ZEB4vMepfwrd1e", "SlotKhoBau.PopupSelectLine");
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
        this.arrLine = null;
        this.line = null;
        this.sprCellOn = null;
        this.soundSlotState = null;
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
      showPopup(lineConfig) {
        lineConfig.forEach(line => {
          let setupNodeLine = cc.instantiate(this.line);
          setupNodeLine.active = true;
          line.cells.forEach(cell => {
            setupNodeLine.getChildByName("row" + cell.row).getChildByName("cell" + cell.col).getComponent(cc.Sprite).spriteFrame = this.sprCellOn;
          });
          this.arrLine.getChildByName(line.name).addChild(setupNodeLine);
        });
        this.show();
      }
      actSelectAll() {
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
        if (this.getSelectedLines().length > 0) {
          let arrLineSelected = this.getSelectedLines();
          super.dismiss();
        }
      }
      canPlaySound() {
        var soundSave = cc.sys.localStorage.getItem("sound_Slot_1");
        this.soundSlotState = null != soundSave ? parseInt(soundSave) : 1;
        return 1 == this.soundSlotState;
      }
    };
    __decorate([ property(cc.Node) ], PopupSelectLine.prototype, "buttonsLine", void 0);
    __decorate([ property(cc.Button) ], PopupSelectLine.prototype, "btnClose", void 0);
    __decorate([ property(cc.Node) ], PopupSelectLine.prototype, "arrLine", void 0);
    __decorate([ property(cc.Node) ], PopupSelectLine.prototype, "line", void 0);
    __decorate([ property(cc.SpriteFrame) ], PopupSelectLine.prototype, "sprCellOn", void 0);
    PopupSelectLine = __decorate([ ccclass ], PopupSelectLine);
    exports.PopupSelectLine = PopupSelectLine;
    exports.default = PopupSelectLine;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/Dialog": void 0
  } ],
  "SlotKhoBau.SoundControler": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "495e4Dtj91JFo7TPcpu6le8", "SlotKhoBau.SoundControler");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.SlotKhoBauSoundControler = void 0;
    const {ccclass: ccclass, property: property} = cc._decorator;
    let SlotKhoBauSoundControler = class SlotKhoBauSoundControler extends cc.Component {
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
          this.playSound(this.soundBigWin, 1, 1);
          break;

         case 3:
          this.playSound(this.soundJackpot, 1, 1);
          break;

         case 5:
          this.playSound(this.soundBonus);
          break;

         case 6:
          this.playSound(this.soundBigWin, 1, 1);
          break;

         case 7:
          this.playSound(this.soundSpin, speed);
        }
      }
      playSound(sound = this.soundClick, speed = 1, volume = .2) {
        if (1 == this.soundSlotState && sound) {
          if (1 == speed) return cc.audioEngine.play(sound, false, volume);
          let audioID = cc.audioEngine.play(sound, false, volume);
          let audioTime = cc.audioEngine.getDuration(audioID) - 1;
          this.scheduleOnce(() => {
            cc.audioEngine.stop(audioID);
          }, audioTime * speed);
        }
      }
      commonClickHandler() {
        1 == this.soundSlotState && cc.audioEngine.play(this.soundClick, false, .2);
      }
      settingSound() {
        this.soundOff.active || cc.audioEngine.play(this.soundClick, false, .2);
        this.soundOff.active = !this.soundOff.active;
        this.soundOff.active ? this.soundSlotState = 0 : this.soundSlotState = 1;
      }
      randomBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
      }
      settingMusic() {
        if (!(this.musicBackground.length > 0)) return;
        this.musicOff.active = !this.musicOff.active;
        if (this.musicOff.active) {
          cc.audioEngine.stop(this.remoteMusicBackground);
          this.musicSlotState = 0;
        } else {
          var musicId = this.randomBetween(0, this.musicBackground.length - 1);
          this.remoteMusicBackground = cc.audioEngine.play(this.musicBackground[musicId], true, .2);
          this.musicSlotState = 1;
        }
      }
      initMusicAndSound() {
        this.musicSlotState = 0;
        this.soundSlotState = 0;
        this.musicOff.active = true;
        this.soundOff.active = true;
        1 == this.musicSlotState && (this.remoteMusicBackground = cc.audioEngine.play(this.musicBackground[0], true, .2));
      }
    };
    __decorate([ property({
      type: cc.AudioClip
    }) ], SlotKhoBauSoundControler.prototype, "soundSpinMis", void 0);
    __decorate([ property({
      type: cc.AudioClip
    }) ], SlotKhoBauSoundControler.prototype, "soundSpinWin", void 0);
    __decorate([ property({
      type: cc.AudioClip
    }) ], SlotKhoBauSoundControler.prototype, "soundBigWin", void 0);
    __decorate([ property({
      type: cc.AudioClip
    }) ], SlotKhoBauSoundControler.prototype, "soundJackpot", void 0);
    __decorate([ property({
      type: cc.AudioClip
    }) ], SlotKhoBauSoundControler.prototype, "soundBonus", void 0);
    __decorate([ property({
      type: cc.AudioClip
    }) ], SlotKhoBauSoundControler.prototype, "soundClick", void 0);
    __decorate([ property({
      type: cc.AudioClip
    }) ], SlotKhoBauSoundControler.prototype, "musicBackground", void 0);
    __decorate([ property({
      type: cc.AudioClip
    }) ], SlotKhoBauSoundControler.prototype, "soundSpin", void 0);
    __decorate([ property(cc.Node) ], SlotKhoBauSoundControler.prototype, "soundOff", void 0);
    __decorate([ property(cc.Node) ], SlotKhoBauSoundControler.prototype, "musicOff", void 0);
    SlotKhoBauSoundControler = __decorate([ ccclass ], SlotKhoBauSoundControler);
    exports.SlotKhoBauSoundControler = SlotKhoBauSoundControler;
    exports.default = SlotKhoBauSoundControler;
    cc._RF.pop();
  }, {} ],
  "SlotKhoBau.SpinControler": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "23148xi9A9IDoeLWu1RIH5w", "SlotKhoBau.SpinControler");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.SlotKhoBauSpinControler = exports.SpinType = exports.SpinMode = void 0;
    const Tween_1 = require("../../Main/Game/src/common/Tween");
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
    const {ccclass: ccclass, property: property} = cc._decorator;
    let SlotKhoBauSpinControler = class SlotKhoBauSpinControler extends cc.Component {
      constructor() {
        super(...arguments);
        this.btnSpin = null;
        this.btnSpinAutoX2 = null;
        this.btnTrial = null;
        this.sprFrameTrialThu = null;
        this.sprFrameTrialThat = null;
        this.sprFrameAutoOn = null;
        this.sprFrameAutoOff = null;
        this.btnLine = null;
        this.lblLine = null;
        this.lblBet = null;
        this.btnBet = null;
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
          this.btnSpin.getComponent(sp.Skeleton).timeScale = 5;
          this.btnSpin.getComponent(sp.Skeleton).setAnimation(0, "normal", false);
          this.spinType.auto = false;
          this.spinType.autox2 = false;
        }
        this.btnSpinAutoX2.interactable = !this.spinType.autox2;
      }
      setStageButtonSpin(stageStop) {
        this.btnSpin.getComponent(sp.Skeleton).timeScale = 5;
        this.btnSpin.getComponent(sp.Skeleton).setAnimation(0, stageStop ? "red" : "normal", false);
        this.scheduleOnce(() => {
          this.btnSpin.getComponent(sp.Skeleton).timeScale = 1;
        }, 1);
      }
      setClickSpin() {
        cc.log("vao set spin");
        this.btnSpin.node.on("touchstart", touch => {
          cc.log("vao touchstart");
          this.timeHoldSpin = 0;
          this.btnSpin.getComponent(sp.Skeleton).timeScale = 1;
          this.btnSpin.getComponent(sp.Skeleton).setAnimation(0, "red", false);
          this.isHoldSpin = true;
        });
        this.btnSpin.node.on("touchend", touch => {
          cc.log("vao touchend");
          if (this.isHoldSpin) {
            this.isHoldSpin = false;
            if (this.timeHoldSpin < 1) {
              cc.log("time spin", this.timeHoldSpin);
              this.spin(true);
              this.btnSpin.getComponent(sp.Skeleton).setAnimation(0, "normal", false);
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
    __decorate([ property(cc.Button) ], SlotKhoBauSpinControler.prototype, "btnSpin", void 0);
    __decorate([ property(cc.Button) ], SlotKhoBauSpinControler.prototype, "btnSpinAutoX2", void 0);
    __decorate([ property(cc.Button) ], SlotKhoBauSpinControler.prototype, "btnTrial", void 0);
    __decorate([ property(cc.SpriteFrame) ], SlotKhoBauSpinControler.prototype, "sprFrameTrialThu", void 0);
    __decorate([ property(cc.SpriteFrame) ], SlotKhoBauSpinControler.prototype, "sprFrameTrialThat", void 0);
    __decorate([ property(cc.SpriteFrame) ], SlotKhoBauSpinControler.prototype, "sprFrameAutoOn", void 0);
    __decorate([ property(cc.SpriteFrame) ], SlotKhoBauSpinControler.prototype, "sprFrameAutoOff", void 0);
    __decorate([ property(cc.Button) ], SlotKhoBauSpinControler.prototype, "btnLine", void 0);
    __decorate([ property(cc.Label) ], SlotKhoBauSpinControler.prototype, "lblLine", void 0);
    __decorate([ property(cc.Label) ], SlotKhoBauSpinControler.prototype, "lblBet", void 0);
    __decorate([ property(cc.Button) ], SlotKhoBauSpinControler.prototype, "btnBet", void 0);
    __decorate([ property(cc.Label) ], SlotKhoBauSpinControler.prototype, "lblTotalBet", void 0);
    SlotKhoBauSpinControler = __decorate([ ccclass ], SlotKhoBauSpinControler);
    exports.SlotKhoBauSpinControler = SlotKhoBauSpinControler;
    exports.default = SlotKhoBauSpinControler;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/Tween": void 0
  } ],
  "SlotKhoBau.TrialResults": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fa0642Q0blHpINKclXmqFkB", "SlotKhoBau.TrialResults");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.TrialResults = void 0;
    class TrialResults {}
    exports.TrialResults = TrialResults;
    TrialResults.results = [ {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_JACK_POT",
          money: 3e3,
          lineName: "line18"
        } ]
      },
      ref: 251,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0,
      result: 3,
      matrix: "1,4,2,6,4,0,1,2,4,0,2,0,0,0,2",
      linesWin: "1",
      haiSao: "",
      prize: 2e5,
      currentMoney: 10007600
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_JACK_POT",
          money: 3e3,
          lineName: "line7"
        } ]
      },
      ref: 251,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0,
      result: 3,
      matrix: "1,4,2,6,4,2,1,0,4,2,0,0,2,0,0",
      linesWin: "1",
      haiSao: "",
      prize: 2e5,
      currentMoney: 10007600
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_JACK_POT",
          money: 3e3,
          lineName: "line3"
        } ]
      },
      ref: 251,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0,
      result: 3,
      matrix: "1,4,2,6,4,2,1,2,4,2,0,0,0,0,0",
      linesWin: "1",
      haiSao: "",
      prize: 2e5,
      currentMoney: 10007600
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_JACK_POT",
          money: 3e3,
          lineName: "line2"
        } ]
      },
      ref: 251,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0,
      result: 3,
      matrix: "0,0,0,0,0,1,4,2,6,4,2,1,2,4,2",
      linesWin: "1",
      haiSao: "",
      prize: 2e5,
      currentMoney: 10007600
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_JACK_POT",
          money: 3e3,
          lineName: "line1"
        } ]
      },
      ref: 251,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0,
      result: 3,
      matrix: "1,4,2,6,4,0,0,0,0,0,2,1,2,4,2",
      linesWin: "1",
      haiSao: "",
      prize: 2e5,
      currentMoney: 10007600
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_JACK_POT",
          money: 3e3,
          lineName: "line18"
        } ]
      },
      ref: 251,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0,
      result: 3,
      matrix: "1,4,2,6,4,0,1,2,4,0,2,0,0,0,2",
      linesWin: "1",
      haiSao: "",
      prize: 2e5,
      currentMoney: 10007600
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_JACK_POT",
          money: 3e3,
          lineName: "line7"
        } ]
      },
      ref: 251,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0,
      result: 3,
      matrix: "1,4,2,6,4,2,1,0,4,2,0,0,2,0,0",
      linesWin: "1",
      haiSao: "",
      prize: 2e5,
      currentMoney: 10007600
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_JACK_POT",
          money: 3e3,
          lineName: "line3"
        } ]
      },
      ref: 251,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0,
      result: 3,
      matrix: "1,4,2,6,4,2,1,2,4,2,0,0,0,0,0",
      linesWin: "1",
      haiSao: "",
      prize: 2e5,
      currentMoney: 10007600
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_JACK_POT",
          money: 3e3,
          lineName: "line2"
        } ]
      },
      ref: 251,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0,
      result: 3,
      matrix: "0,0,0,0,0,1,4,2,6,4,2,1,2,4,2",
      linesWin: "1",
      haiSao: "",
      prize: 2e5,
      currentMoney: 10007600
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_JACK_POT",
          money: 3e3,
          lineName: "line1"
        } ]
      },
      ref: 251,
      freeSpin: 0,
      isFree: false,
      itemsWild: "",
      ratio: 0,
      result: 3,
      matrix: "1,4,2,6,4,0,0,0,0,0,2,1,2,4,2",
      linesWin: "1",
      haiSao: "",
      prize: 2e5,
      currentMoney: 10007600
    }, {
      awardsDetail: {
        object: [ {
          award: "QUADRA_MAP",
          money: 800,
          lineName: "line2"
        }, {
          award: "QUADRA_ANVIL",
          money: 300,
          lineName: "line3"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line4"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line6"
        }, {
          award: "QUADRA_ANVIL",
          money: 300,
          lineName: "line7"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line8"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line9"
        }, {
          award: "QUADRA_MAP",
          money: 800,
          lineName: "line10"
        }, {
          award: "QUADRA_MAP",
          money: 800,
          lineName: "line13"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line14"
        }, {
          award: "PENTA_MAP",
          money: 5500,
          lineName: "line17"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line18"
        }, {
          award: "QUADRA_ANVIL",
          money: 300,
          lineName: "line19"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line20"
        } ]
      },
      ref: 2929596,
      result: 2,
      matrix: "4,4,4,1,5,4,5,6,5,4,6,1,6,6,4",
      linesWin: "2,3,4,6,7,8,9,10,13,14,17,18,19,20",
      haiSao: "",
      prize: 10200,
      currentMoney: 40280700
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_BULLSEYE",
          money: 300,
          lineName: "line1"
        }, {
          award: "TRIPLE_BULLSEYE",
          money: 300,
          lineName: "line2"
        }, {
          award: "TRIPLE_BULLSEYE",
          money: 300,
          lineName: "line4"
        }, {
          award: "TRIPLE_BULLSEYE",
          money: 300,
          lineName: "line5"
        }, {
          award: "TRIPLE_BULLSEYE",
          money: 300,
          lineName: "line6"
        }, {
          award: "TRIPLE_BULLSEYE",
          money: 300,
          lineName: "line8"
        }, {
          award: "TRIPLE_MINIGAME",
          money: 400,
          lineName: "line8"
        }, {
          award: "TRIPLE_BULLSEYE",
          money: 300,
          lineName: "line10"
        }, {
          award: "TRIPLE_BULLSEYE",
          money: 300,
          lineName: "line12"
        }, {
          award: "TRIPLE_BULLSEYE",
          money: 300,
          lineName: "line13"
        }, {
          award: "QUADRA_ANVIL",
          money: 300,
          lineName: "line13"
        }, {
          award: "TRIPLE_BULLSEYE",
          money: 300,
          lineName: "line14"
        }, {
          award: "TRIPLE_BULLSEYE",
          money: 300,
          lineName: "line16"
        }, {
          award: "TRIPLE_BULLSEYE",
          money: 300,
          lineName: "line17"
        }, {
          award: "TRIPLE_BULLSEYE",
          money: 300,
          lineName: "line18"
        }, {
          award: "TRIPLE_MINIGAME",
          money: 400,
          lineName: "line18"
        }, {
          award: "QUADRA_ANVIL",
          money: 300,
          lineName: "line19"
        } ]
      },
      ref: 2929599,
      result: 1,
      matrix: "3,3,6,6,1,1,4,6,3,3,5,1,6,2,4",
      linesWin: "1,2,4,5,6,8,8,10,12,13,13,14,16,17,18,18,19",
      haiSao: "",
      prize: 5300,
      currentMoney: 40282200
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line1"
        }, {
          award: "QUADRA_ANVIL",
          money: 300,
          lineName: "line2"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line3"
        }, {
          award: "QUADRA_MAP",
          money: 800,
          lineName: "line4"
        }, {
          award: "QUADRA_MAP",
          money: 800,
          lineName: "line5"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line8"
        }, {
          award: "QUADRA_MAP",
          money: 800,
          lineName: "line10"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line13"
        }, {
          award: "QUADRA_MAP",
          money: 800,
          lineName: "line14"
        }, {
          award: "QUADRA_MAP",
          money: 800,
          lineName: "line17"
        }, {
          award: "PENTA_MAP",
          money: 5500,
          lineName: "line18"
        } ]
      },
      ref: 2929610,
      result: 2,
      matrix: "6,4,1,6,6,4,6,5,4,4,2,4,4,4,6",
      linesWin: "1,2,3,4,5,8,10,13,14,17,18",
      haiSao: "",
      prize: 10600,
      currentMoney: 40280700
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_BULLSEYE",
          money: 300,
          lineName: "line1"
        }, {
          award: "TRIPLE_MINIGAME",
          money: 400,
          lineName: "line2"
        }, {
          award: "TRIPLE_BULLSEYE",
          money: 300,
          lineName: "line4"
        }, {
          award: "TRIPLE_BULLSEYE",
          money: 300,
          lineName: "line5"
        }, {
          award: "TRIPLE_MINIGAME",
          money: 400,
          lineName: "line6"
        }, {
          award: "TRIPLE_MINIGAME",
          money: 400,
          lineName: "line9"
        }, {
          award: "TRIPLE_BULLSEYE",
          money: 300,
          lineName: "line10"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line10"
        }, {
          award: "TRIPLE_MINIGAME",
          money: 400,
          lineName: "line10"
        }, {
          award: "TRIPLE_BULLSEYE",
          money: 300,
          lineName: "line13"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line13"
        }, {
          award: "TRIPLE_BULLSEYE",
          money: 300,
          lineName: "line17"
        }, {
          award: "TRIPLE_MINIGAME",
          money: 400,
          lineName: "line17"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line18"
        }, {
          award: "QUADRA_ANVIL",
          money: 300,
          lineName: "line19"
        }, {
          award: "TRIPLE_MINIGAME",
          money: 400,
          lineName: "line20"
        } ]
      },
      ref: 2929613,
      result: 1,
      matrix: "2,2,6,1,6,1,3,6,2,3,6,4,4,0,2",
      linesWin: "1,2,4,5,6,9,10,10,10,13,13,17,17,18,19,20",
      haiSao: "",
      prize: 5100,
      currentMoney: 4028e4
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line1"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line2"
        }, {
          award: "QUADRA_MAP",
          money: 800,
          lineName: "line6"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line7"
        }, {
          award: "QUADRA_MAP",
          money: 800,
          lineName: "line9"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line10"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line11"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line13"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line14"
        }, {
          award: "QUADRA_MAP",
          money: 800,
          lineName: "line15"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line16"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line17"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line19"
        }, {
          award: "QUADRA_MAP",
          money: 800,
          lineName: "line20"
        } ]
      },
      ref: 2929615,
      result: 1,
      matrix: "4,4,6,4,0,4,4,4,6,6,4,5,6,5,4",
      linesWin: "1,2,6,7,9,10,11,13,14,15,16,17,19,20",
      haiSao: "",
      prize: 5200,
      currentMoney: 40281800
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_MINIGAME",
          money: 400,
          lineName: "line9"
        }, {
          award: "QUADRA_MINIGAME",
          money: 4600,
          lineName: "line10"
        }, {
          award: "TRIPLE_MINIGAME",
          money: 400,
          lineName: "line13"
        }, {
          award: "TRIPLE_MINIGAME",
          money: 400,
          lineName: "line14"
        }, {
          award: "QUADRA_MINIGAME",
          money: 4600,
          lineName: "line17"
        } ]
      },
      ref: 2929650,
      result: 5,
      matrix: "6,2,0,2,5,2,6,6,5,1,5,5,6,5,2",
      linesWin: "9,10,13,14,17",
      haiSao: "1,1,2,1,1,1,1,1,1,1",
      prize: 10400,
      currentMoney: 40260600
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_MINIGAME",
          money: 400,
          lineName: "line9"
        }, {
          award: "QUADRA_MINIGAME",
          money: 4600,
          lineName: "line10"
        }, {
          award: "TRIPLE_MINIGAME",
          money: 400,
          lineName: "line13"
        }, {
          award: "TRIPLE_MINIGAME",
          money: 400,
          lineName: "line14"
        }, {
          award: "QUADRA_MINIGAME",
          money: 4600,
          lineName: "line17"
        } ]
      },
      ref: 2929650,
      result: 5,
      matrix: "6,2,0,2,5,2,6,6,5,1,5,5,6,5,2",
      linesWin: "9,10,13,14,17",
      haiSao: "1,1,2,1,1,1,1,1,1,1",
      prize: 10400,
      currentMoney: 40260600
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line1"
        }, {
          award: "QUADRA_ANVIL",
          money: 300,
          lineName: "line2"
        }, {
          award: "TRIPLE_MINIGAME",
          money: 400,
          lineName: "line2"
        }, {
          award: "QUADRA_ANVIL",
          money: 300,
          lineName: "line3"
        }, {
          award: "QUADRA_MAP",
          money: 800,
          lineName: "line4"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line5"
        }, {
          award: "QUADRA_ANVIL",
          money: 300,
          lineName: "line7"
        }, {
          award: "QUADRA_ANVIL",
          money: 300,
          lineName: "line8"
        }, {
          award: "TRIPLE_MINIGAME",
          money: 400,
          lineName: "line8"
        }, {
          award: "QUADRA_ANVIL",
          money: 300,
          lineName: "line9"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line10"
        }, {
          award: "QUADRA_ANVIL",
          money: 300,
          lineName: "line11"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line13"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line14"
        }, {
          award: "QUADRA_MAP",
          money: 800,
          lineName: "line17"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line18"
        }, {
          award: "QUADRA_ANVIL",
          money: 300,
          lineName: "line19"
        } ]
      },
      ref: 2929651,
      result: 1,
      matrix: "2,6,1,1,6,4,6,5,4,4,6,6,5,1,6",
      linesWin: "1,2,2,3,4,5,7,8,8,9,10,11,13,14,17,18,19",
      haiSao: "",
      prize: 5700,
      currentMoney: 40264300
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_BULLSEYE",
          money: 300,
          lineName: "line2"
        }, {
          award: "TRIPLE_BULLSEYE",
          money: 300,
          lineName: "line6"
        }, {
          award: "TRIPLE_JACKPOT",
          money: 500,
          lineName: "line8"
        }, {
          award: "QUADRA_BULLSEYE",
          money: 2e3,
          lineName: "line9"
        }, {
          award: "TRIPLE_BULLSEYE",
          money: 300,
          lineName: "line10"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line12"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line16"
        }, {
          award: "TRIPLE_BULLSEYE",
          money: 300,
          lineName: "line17"
        }, {
          award: "TRIPLE_BULLSEYE",
          money: 300,
          lineName: "line19"
        } ]
      },
      ref: 2929662,
      result: 1,
      matrix: "4,3,0,3,1,3,5,6,4,4,3,6,5,0,1",
      linesWin: "2,6,8,9,10,12,16,17,19",
      haiSao: "",
      prize: 4400,
      currentMoney: 40256300
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line1"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line3"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line4"
        }, {
          award: "QUADRA_MAP",
          money: 800,
          lineName: "line5"
        }, {
          award: "TRIPLE_JACKPOT",
          money: 500,
          lineName: "line6"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line10"
        }, {
          award: "TRIPLE_JACKPOT",
          money: 500,
          lineName: "line12"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line14"
        }, {
          award: "TRIPLE_JACKPOT",
          money: 500,
          lineName: "line16"
        }, {
          award: "QUADRA_MAP",
          money: 800,
          lineName: "line18"
        }, {
          award: "TRIPLE_JACKPOT",
          money: 500,
          lineName: "line19"
        } ]
      },
      ref: 2929664,
      result: 1,
      matrix: "2,3,6,0,0,4,4,0,0,4,5,5,1,4,4",
      linesWin: "1,3,4,5,6,10,12,14,16,18,19",
      haiSao: "",
      prize: 4600,
      currentMoney: 40258100
    }, {
      awardsDetail: {
        object: [ {
          award: "PENTA_ANVIL",
          money: 800,
          lineName: "line1"
        }, {
          award: "QUADRA_ANVIL",
          money: 300,
          lineName: "line2"
        }, {
          award: "PENTA_ANVIL",
          money: 800,
          lineName: "line4"
        }, {
          award: "QUADRA_ANVIL",
          money: 300,
          lineName: "line5"
        }, {
          award: "QUADRA_ANVIL",
          money: 300,
          lineName: "line6"
        }, {
          award: "QUADRA_ANVIL",
          money: 300,
          lineName: "line10"
        }, {
          award: "QUADRA_ANVIL",
          money: 300,
          lineName: "line11"
        }, {
          award: "QUADRA_ANVIL",
          money: 300,
          lineName: "line13"
        }, {
          award: "QUADRA_ANVIL",
          money: 300,
          lineName: "line14"
        }, {
          award: "QUADRA_ANVIL",
          money: 300,
          lineName: "line15"
        }, {
          award: "QUADRA_ANVIL",
          money: 300,
          lineName: "line16"
        }, {
          award: "PENTA_ANVIL",
          money: 800,
          lineName: "line17"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line18"
        } ]
      },
      ref: 2929680,
      result: 1,
      matrix: "3,6,6,6,6,1,6,6,6,6,2,2,4,4,6",
      linesWin: "1,2,4,5,6,10,11,13,14,15,16,17,18",
      haiSao: "",
      prize: 5300,
      currentMoney: 40246600
    }, {
      awardsDetail: {
        object: [ {
          award: "QUADRA_ANVIL",
          money: 300,
          lineName: "line2"
        }, {
          award: "QUADRA_MAP",
          money: 800,
          lineName: "line3"
        }, {
          award: "QUADRA_ANVIL",
          money: 300,
          lineName: "line4"
        }, {
          award: "QUADRA_MAP",
          money: 800,
          lineName: "line7"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line9"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line11"
        }, {
          award: "QUADRA_ANVIL",
          money: 300,
          lineName: "line11"
        }, {
          award: "QUADRA_ANVIL",
          money: 300,
          lineName: "line12"
        }, {
          award: "QUADRA_MAP",
          money: 800,
          lineName: "line15"
        }, {
          award: "QUADRA_ANVIL",
          money: 300,
          lineName: "line16"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line20"
        } ]
      },
      ref: 2929681,
      result: 1,
      matrix: "6,2,6,6,6,6,1,4,6,5,4,5,4,4,1",
      linesWin: "2,3,4,7,9,11,11,12,15,16,20",
      haiSao: "",
      prize: 4500,
      currentMoney: 40249100
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line1"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line3"
        }, {
          award: "TRIPLE_BULLSEYE",
          money: 300,
          lineName: "line4"
        }, {
          award: "QUADRA_MAP",
          money: 800,
          lineName: "line7"
        }, {
          award: "QUADRA_MAP",
          money: 800,
          lineName: "line11"
        }, {
          award: "TRIPLE_JACKPOT",
          money: 500,
          lineName: "line12"
        }, {
          award: "PENTA_MAP",
          money: 5500,
          lineName: "line15"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line16"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line20"
        } ]
      },
      ref: 2929693,
      result: 2,
      matrix: "5,6,3,2,0,5,4,4,1,3,4,5,0,4,4",
      linesWin: "1,3,4,7,11,12,15,16,20",
      haiSao: "",
      prize: 8700,
      currentMoney: 40244200
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_MINIGAME",
          money: 400,
          lineName: "line1"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line3"
        }, {
          award: "TRIPLE_MINIGAME",
          money: 400,
          lineName: "line4"
        }, {
          award: "QUADRA_MINIGAME",
          money: 9800,
          lineName: "line5"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line7"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line8"
        }, {
          award: "TRIPLE_MINIGAME",
          money: 400,
          lineName: "line10"
        }, {
          award: "TRIPLE_MINIGAME",
          money: 400,
          lineName: "line12"
        }, {
          award: "TRIPLE_MINIGAME",
          money: 400,
          lineName: "line14"
        }, {
          award: "QUADRA_MINIGAME",
          money: 12800,
          lineName: "line18"
        } ]
      },
      ref: 2929710,
      result: 5,
      matrix: "0,4,4,3,2,2,6,5,2,2,4,4,2,1,6",
      linesWin: "1,3,4,5,7,8,10,12,14,18",
      haiSao: "1,1,1,1,1,0,0,1,4,1,1,1",
      prize: 25200,
      currentMoney: 40253600
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_MINIGAME",
          money: 400,
          lineName: "line1"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line3"
        }, {
          award: "TRIPLE_MINIGAME",
          money: 400,
          lineName: "line4"
        }, {
          award: "QUADRA_MINIGAME",
          money: 9800,
          lineName: "line5"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line7"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line8"
        }, {
          award: "TRIPLE_MINIGAME",
          money: 400,
          lineName: "line10"
        }, {
          award: "TRIPLE_MINIGAME",
          money: 400,
          lineName: "line12"
        }, {
          award: "TRIPLE_MINIGAME",
          money: 400,
          lineName: "line14"
        }, {
          award: "QUADRA_MINIGAME",
          money: 12800,
          lineName: "line18"
        } ]
      },
      ref: 2929710,
      result: 5,
      matrix: "0,4,4,3,2,2,6,5,2,2,4,4,2,1,6",
      linesWin: "1,3,4,5,7,8,10,12,14,18",
      haiSao: "1,1,1,1,1,0,0,1,4,1,1,1",
      prize: 25200,
      currentMoney: 40253600
    }, {
      awardsDetail: {
        object: [ {
          award: "PENTA_BULLSEYE",
          money: 2e4,
          lineName: "line1"
        }, {
          award: "QUADRA_BULLSEYE",
          money: 2e3,
          lineName: "line4"
        }, {
          award: "QUADRA_BULLSEYE",
          money: 2e3,
          lineName: "line5"
        }, {
          award: "TRIPLE_MINIGAME",
          money: 400,
          lineName: "line5"
        }, {
          award: "TRIPLE_BULLSEYE",
          money: 300,
          lineName: "line6"
        }, {
          award: "TRIPLE_BULLSEYE",
          money: 300,
          lineName: "line10"
        }, {
          award: "TRIPLE_BULLSEYE",
          money: 300,
          lineName: "line12"
        }, {
          award: "QUADRA_BULLSEYE",
          money: 2e3,
          lineName: "line13"
        }, {
          award: "TRIPLE_BULLSEYE",
          money: 300,
          lineName: "line14"
        }, {
          award: "TRIPLE_BULLSEYE",
          money: 300,
          lineName: "line15"
        }, {
          award: "QUADRA_BULLSEYE",
          money: 2e3,
          lineName: "line16"
        }, {
          award: "TRIPLE_BULLSEYE",
          money: 300,
          lineName: "line17"
        }, {
          award: "TRIPLE_MINIGAME",
          money: 400,
          lineName: "line18"
        }, {
          award: "TRIPLE_BULLSEYE",
          money: 300,
          lineName: "line19"
        } ]
      },
      ref: 2929715,
      result: 2,
      matrix: "0,6,6,3,3,3,1,3,3,1,5,4,2,2,5",
      linesWin: "1,4,5,5,6,10,12,13,14,15,16,17,18,19",
      haiSao: "",
      prize: 30900,
      currentMoney: 40277900
    }, {
      awardsDetail: {
        object: [ {
          award: "QUADRA_MAP",
          money: 800,
          lineName: "line2"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line6"
        }, {
          award: "QUADRA_ANVIL",
          money: 300,
          lineName: "line6"
        }, {
          award: "PENTA_MAP",
          money: 5500,
          lineName: "line8"
        }, {
          award: "QUADRA_ANVIL",
          money: 300,
          lineName: "line9"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line13"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line17"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line18"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line19"
        }, {
          award: "QUADRA_ANVIL",
          money: 300,
          lineName: "line20"
        } ]
      },
      ref: 2929725,
      result: 2,
      matrix: "1,6,4,1,4,5,6,6,3,4,5,4,6,4,6",
      linesWin: "2,6,6,8,9,13,17,18,19,20",
      haiSao: "",
      prize: 8200,
      currentMoney: 40276200
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_JACKPOT",
          money: 500,
          lineName: "line1"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line3"
        }, {
          award: "TRIPLE_JACKPOT",
          money: 500,
          lineName: "line4"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line5"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line9"
        }, {
          award: "TRIPLE_JACKPOT",
          money: 500,
          lineName: "line11"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line11"
        }, {
          award: "QUADRA_MAP",
          money: 800,
          lineName: "line12"
        }, {
          award: "TRIPLE_JACKPOT",
          money: 500,
          lineName: "line15"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line15"
        }, {
          award: "TRIPLE_JACKPOT",
          money: 500,
          lineName: "line16"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line16"
        } ]
      },
      ref: 2929789,
      result: 1,
      matrix: "5,3,0,4,4,6,1,0,1,5,6,6,4,1,4",
      linesWin: "1,3,4,5,9,11,11,12,15,15,16,16",
      haiSao: "",
      prize: 4500,
      currentMoney: 40233e3
    }, {
      awardsDetail: {
        object: [ {
          award: "PENTA_MAP",
          money: 5500,
          lineName: "line2"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line4"
        }, {
          award: "QUADRA_MAP",
          money: 800,
          lineName: "line6"
        }, {
          award: "QUADRA_MAP",
          money: 800,
          lineName: "line8"
        }, {
          award: "QUADRA_MAP",
          money: 800,
          lineName: "line10"
        }, {
          award: "QUADRA_MAP",
          money: 800,
          lineName: "line13"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line14"
        }, {
          award: "PENTA_MAP",
          money: 5500,
          lineName: "line17"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line18"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line19"
        } ]
      },
      ref: 2929793,
      result: 2,
      matrix: "1,4,4,1,4,4,5,5,6,4,3,4,5,0,5",
      linesWin: "2,4,6,8,10,13,14,17,18,19",
      haiSao: "",
      prize: 15e3,
      currentMoney: 40242800
    }, {
      awardsDetail: {
        object: [ {
          award: "QUADRA_MAP",
          money: 800,
          lineName: "line1"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line4"
        }, {
          award: "QUADRA_MAP",
          money: 800,
          lineName: "line5"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line6"
        }, {
          award: "PENTA_MAP",
          money: 5500,
          lineName: "line12"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line15"
        }, {
          award: "PENTA_MAP",
          money: 5500,
          lineName: "line16"
        } ]
      },
      ref: 2929804,
      result: 2,
      matrix: "4,5,0,0,4,3,4,4,4,4,6,5,4,3,6",
      linesWin: "1,4,5,6,12,15,16",
      haiSao: "",
      prize: 13200,
      currentMoney: 40247800
    }, {
      awardsDetail: {
        object: [ {
          award: "PENTA_MAP",
          money: 5500,
          lineName: "line2"
        }, {
          award: "QUADRA_MAP",
          money: 800,
          lineName: "line6"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line8"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line17"
        } ]
      },
      ref: 2929812,
      result: 1,
      matrix: "4,4,1,4,4,3,6,2,2,6,5,5,3,2,5",
      linesWin: "2,6,8,17",
      haiSao: "",
      prize: 6700,
      currentMoney: 40245200
    }, {
      awardsDetail: {
        object: [ {
          award: "QUADRA_ANVIL",
          money: 300,
          lineName: "line4"
        }, {
          award: "TRIPLE_MINIGAME",
          money: 400,
          lineName: "line7"
        }, {
          award: "TRIPLE_MINIGAME",
          money: 400,
          lineName: "line11"
        }, {
          award: "TRIPLE_BULLSEYE",
          money: 300,
          lineName: "line12"
        }, {
          award: "QUADRA_MINIGAME",
          money: 13e3,
          lineName: "line15"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line19"
        } ]
      },
      ref: 2929817,
      result: 5,
      matrix: "3,0,6,4,5,6,1,2,5,6,1,4,3,5,2",
      linesWin: "4,7,11,12,15,19",
      haiSao: "1,1,0,1,0,1,1,2,1,0,1,1,1",
      prize: 14600,
      currentMoney: 40254e3
    }, {
      awardsDetail: {
        object: [ {
          award: "QUADRA_ANVIL",
          money: 300,
          lineName: "line4"
        }, {
          award: "TRIPLE_MINIGAME",
          money: 400,
          lineName: "line7"
        }, {
          award: "TRIPLE_MINIGAME",
          money: 400,
          lineName: "line11"
        }, {
          award: "TRIPLE_BULLSEYE",
          money: 300,
          lineName: "line12"
        }, {
          award: "QUADRA_MINIGAME",
          money: 13e3,
          lineName: "line15"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line19"
        } ]
      },
      ref: 2929817,
      result: 5,
      matrix: "3,0,6,4,5,6,1,2,5,6,1,4,3,5,2",
      linesWin: "4,7,11,12,15,19",
      haiSao: "1,1,0,1,0,1,1,2,1,0,1,1,1",
      prize: 14600,
      currentMoney: 40254e3
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line1"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line6"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line9"
        }, {
          award: "QUADRA_MAP",
          money: 800,
          lineName: "line10"
        }, {
          award: "QUADRA_BULLSEYE",
          money: 2e3,
          lineName: "line11"
        }, {
          award: "QUADRA_MAP",
          money: 800,
          lineName: "line13"
        }, {
          award: "QUADRA_MAP",
          money: 800,
          lineName: "line14"
        }, {
          award: "TRIPLE_BULLSEYE",
          money: 300,
          lineName: "line15"
        }, {
          award: "QUADRA_MAP",
          money: 800,
          lineName: "line17"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line20"
        } ]
      },
      ref: 2929828,
      result: 1,
      matrix: "5,4,3,4,0,4,3,4,2,4,3,5,6,6,1",
      linesWin: "1,6,9,10,11,13,14,15,17,20",
      haiSao: "",
      prize: 6300,
      currentMoney: 40250100
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line1"
        }, {
          award: "QUADRA_MINIGAME",
          money: 5e3,
          lineName: "line1"
        }, {
          award: "TRIPLE_MINIGAME",
          money: 400,
          lineName: "line4"
        }, {
          award: "TRIPLE_MINIGAME",
          money: 400,
          lineName: "line5"
        }, {
          award: "TRIPLE_MINIGAME",
          money: 400,
          lineName: "line12"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line13"
        }, {
          award: "TRIPLE_MINIGAME",
          money: 400,
          lineName: "line15"
        }, {
          award: "QUADRA_MINIGAME",
          money: 5e3,
          lineName: "line16"
        }, {
          award: "PENTA_BOTTLE",
          money: 1500,
          lineName: "line20"
        } ]
      },
      ref: 2929842,
      result: 5,
      matrix: "5,5,0,0,2,4,2,1,1,2,6,4,6,5,5",
      linesWin: "1,1,4,5,12,13,15,16,20",
      haiSao: "1,1,1,1,1,1,1,1,2,0,1",
      prize: 13500,
      currentMoney: 40247300
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line1"
        }, {
          award: "QUADRA_MINIGAME",
          money: 5e3,
          lineName: "line1"
        }, {
          award: "TRIPLE_MINIGAME",
          money: 400,
          lineName: "line4"
        }, {
          award: "TRIPLE_MINIGAME",
          money: 400,
          lineName: "line5"
        }, {
          award: "TRIPLE_MINIGAME",
          money: 400,
          lineName: "line12"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line13"
        }, {
          award: "TRIPLE_MINIGAME",
          money: 400,
          lineName: "line15"
        }, {
          award: "QUADRA_MINIGAME",
          money: 5e3,
          lineName: "line16"
        }, {
          award: "PENTA_BOTTLE",
          money: 1500,
          lineName: "line20"
        } ]
      },
      ref: 2929842,
      result: 5,
      matrix: "5,5,0,0,2,4,2,1,1,2,6,4,6,5,5",
      linesWin: "1,1,4,5,12,13,15,16,20",
      haiSao: "1,1,1,1,1,1,1,1,2,0,1",
      prize: 13500,
      currentMoney: 40247300
    }, {
      awardsDetail: {
        object: [ {
          award: "QUADRA_MAP",
          money: 800,
          lineName: "line1"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line2"
        }, {
          award: "QUADRA_MAP",
          money: 800,
          lineName: "line4"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line5"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line6"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line10"
        }, {
          award: "QUADRA_MAP",
          money: 800,
          lineName: "line13"
        }, {
          award: "TRIPLE_BULLSEYE",
          money: 300,
          lineName: "line14"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line14"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line16"
        }, {
          award: "QUADRA_MAP",
          money: 800,
          lineName: "line17"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line19"
        } ]
      },
      ref: 2929848,
      result: 1,
      matrix: "6,5,4,4,4,4,6,1,4,1,2,5,2,3,5",
      linesWin: "1,2,4,5,6,10,13,14,14,16,17,19",
      haiSao: "",
      prize: 4900,
      currentMoney: 40246500
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_BULLSEYE",
          money: 300,
          lineName: "line2"
        }, {
          award: "TRIPLE_BULLSEYE",
          money: 300,
          lineName: "line6"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line6"
        }, {
          award: "QUADRA_BULLSEYE",
          money: 2e3,
          lineName: "line8"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line9"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line12"
        }, {
          award: "TRIPLE_BULLSEYE",
          money: 300,
          lineName: "line13"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line15"
        }, {
          award: "TRIPLE_BULLSEYE",
          money: 300,
          lineName: "line16"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line16"
        }, {
          award: "TRIPLE_BULLSEYE",
          money: 300,
          lineName: "line19"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line19"
        } ]
      },
      ref: 2929850,
      result: 1,
      matrix: "3,4,3,6,1,6,6,1,4,3,4,3,4,5,5",
      linesWin: "2,6,6,8,9,12,13,15,16,16,19,19",
      haiSao: "",
      prize: 4700,
      currentMoney: 40247200
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line1"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line2"
        }, {
          award: "QUADRA_MAP",
          money: 800,
          lineName: "line4"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line5"
        }, {
          award: "QUADRA_MAP",
          money: 800,
          lineName: "line10"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line13"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line14"
        }, {
          award: "PENTA_MAP",
          money: 5500,
          lineName: "line17"
        } ]
      },
      ref: 2929858,
      result: 2,
      matrix: "2,4,4,4,5,4,4,0,3,1,6,5,0,2,6",
      linesWin: "1,2,4,5,10,13,14,17",
      haiSao: "",
      prize: 8100,
      currentMoney: 40249900
    }, {
      awardsDetail: {
        object: [ {
          award: "QUADRA_MINIGAME",
          money: 12600,
          lineName: "line3"
        }, {
          award: "TRIPLE_MINIGAME",
          money: 400,
          lineName: "line5"
        }, {
          award: "TRIPLE_MINIGAME",
          money: 400,
          lineName: "line7"
        }, {
          award: "TRIPLE_MINIGAME",
          money: 400,
          lineName: "line9"
        }, {
          award: "TRIPLE_MINIGAME",
          money: 400,
          lineName: "line11"
        }, {
          award: "TRIPLE_MINIGAME",
          money: 400,
          lineName: "line15"
        }, {
          award: "TRIPLE_MINIGAME",
          money: 400,
          lineName: "line18"
        } ]
      },
      ref: 2929877,
      result: 5,
      matrix: "6,4,5,6,5,2,4,6,2,4,2,0,2,2,2",
      linesWin: "3,5,7,9,11,15,18",
      haiSao: "2,0,1,1,2,4,1,1,1,1,1",
      prize: 15e3,
      currentMoney: 40244800
    }, {
      awardsDetail: {
        object: [ {
          award: "QUADRA_MINIGAME",
          money: 12600,
          lineName: "line3"
        }, {
          award: "TRIPLE_MINIGAME",
          money: 400,
          lineName: "line5"
        }, {
          award: "TRIPLE_MINIGAME",
          money: 400,
          lineName: "line7"
        }, {
          award: "TRIPLE_MINIGAME",
          money: 400,
          lineName: "line9"
        }, {
          award: "TRIPLE_MINIGAME",
          money: 400,
          lineName: "line11"
        }, {
          award: "TRIPLE_MINIGAME",
          money: 400,
          lineName: "line15"
        }, {
          award: "TRIPLE_MINIGAME",
          money: 400,
          lineName: "line18"
        } ]
      },
      ref: 2929877,
      result: 5,
      matrix: "6,4,5,6,5,2,4,6,2,4,2,0,2,2,2",
      linesWin: "3,5,7,9,11,15,18",
      haiSao: "2,0,1,1,2,4,1,1,1,1,1",
      prize: 15e3,
      currentMoney: 40244800
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_BULLSEYE",
          money: 300,
          lineName: "line1"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line1"
        }, {
          award: "TRIPLE_BULLSEYE",
          money: 300,
          lineName: "line4"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line4"
        }, {
          award: "TRIPLE_BULLSEYE",
          money: 300,
          lineName: "line5"
        }, {
          award: "QUADRA_ANVIL",
          money: 300,
          lineName: "line5"
        }, {
          award: "QUADRA_MAP",
          money: 800,
          lineName: "line11"
        }, {
          award: "PENTA_ANVIL",
          money: 800,
          lineName: "line12"
        }, {
          award: "QUADRA_MAP",
          money: 800,
          lineName: "line15"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line16"
        }, {
          award: "QUADRA_ANVIL",
          money: 300,
          lineName: "line16"
        } ]
      },
      ref: 2929886,
      result: 1,
      matrix: "6,5,4,3,6,6,1,4,1,3,4,6,6,3,6",
      linesWin: "1,1,4,4,5,5,11,12,15,16,16",
      haiSao: "",
      prize: 4500,
      currentMoney: 40235900
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line1"
        }, {
          award: "QUADRA_MAP",
          money: 800,
          lineName: "line3"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line5"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line6"
        }, {
          award: "QUADRA_MAP",
          money: 800,
          lineName: "line7"
        }, {
          award: "QUADRA_MAP",
          money: 800,
          lineName: "line9"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line10"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line11"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line12"
        }, {
          award: "QUADRA_MAP",
          money: 800,
          lineName: "line13"
        }, {
          award: "QUADRA_MAP",
          money: 800,
          lineName: "line15"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line16"
        }, {
          award: "TRIPLE_MAP",
          money: 200,
          lineName: "line18"
        }, {
          award: "PENTA_MAP",
          money: 5500,
          lineName: "line19"
        } ]
      },
      ref: 2929887,
      result: 2,
      matrix: "2,3,5,4,4,4,4,4,6,5,4,1,4,6,4",
      linesWin: "1,3,5,6,7,9,10,11,12,13,15,16,18,19",
      haiSao: "",
      prize: 11100,
      currentMoney: 40245e3
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_MINIGAME",
          money: 400,
          lineName: "line7"
        }, {
          award: "TRIPLE_BULLSEYE",
          money: 300,
          lineName: "line9"
        }, {
          award: "TRIPLE_BULLSEYE",
          money: 300,
          lineName: "line10"
        }, {
          award: "TRIPLE_MINIGAME",
          money: 400,
          lineName: "line11"
        }, {
          award: "QUADRA_MINIGAME",
          money: 7600,
          lineName: "line15"
        } ]
      },
      ref: 2929903,
      result: 5,
      matrix: "0,6,5,3,5,5,2,2,4,3,2,5,3,6,1",
      linesWin: "7,9,10,11,15",
      haiSao: "1,0,1,1,1,1,1,1,1,1,1",
      prize: 9e3,
      currentMoney: 40243100
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_MINIGAME",
          money: 400,
          lineName: "line7"
        }, {
          award: "TRIPLE_BULLSEYE",
          money: 300,
          lineName: "line9"
        }, {
          award: "TRIPLE_BULLSEYE",
          money: 300,
          lineName: "line10"
        }, {
          award: "TRIPLE_MINIGAME",
          money: 400,
          lineName: "line11"
        }, {
          award: "QUADRA_MINIGAME",
          money: 7600,
          lineName: "line15"
        } ]
      },
      ref: 2929903,
      result: 5,
      matrix: "0,6,5,3,5,5,2,2,4,3,2,5,3,6,1",
      linesWin: "7,9,10,11,15",
      haiSao: "1,0,1,1,1,1,1,1,1,1,1",
      prize: 9e3,
      currentMoney: 40243100
    }, {
      awardsDetail: {
        object: [ {
          award: "QUADRA_ANVIL",
          money: 300,
          lineName: "line1"
        }, {
          award: "TRIPLE_MINIGAME",
          money: 400,
          lineName: "line3"
        }, {
          award: "QUADRA_ANVIL",
          money: 300,
          lineName: "line15"
        }, {
          award: "QUADRA_ANVIL",
          money: 300,
          lineName: "line16"
        }, {
          award: "QUADRA_MINIGAME",
          money: 11400,
          lineName: "line18"
        }, {
          award: "QUADRA_ANVIL",
          money: 300,
          lineName: "line20"
        } ]
      },
      ref: 2929912,
      result: 2,
      matrix: "6,6,5,0,4,1,6,6,6,3,5,2,2,2,6",
      linesWin: "1,3,15,16,18,20",
      haiSao: "0,1,1,3,1,1,1,1,1,2,1",
      prize: 13e3,
      currentMoney: 40247500
    } ];
    exports.default = TrialResults;
    cc._RF.pop();
  }, {} ]
}, {}, [ "SlotKhoBau.Cmd", "SlotKhoBau.Controller", "SlotKhoBau.PopupBonus", "SlotKhoBau.PopupGuide", "SlotKhoBau.PopupHistory", "SlotKhoBau.PopupJackpotHistory", "SlotKhoBau.PopupSelectLine", "SlotKhoBau.SoundControler", "SlotKhoBau.SpinControler", "SlotKhoBau.TrialResults" ]);