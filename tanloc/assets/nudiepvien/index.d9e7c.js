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
  "SlotNuDiepVien.Cmd": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3e07cFlXMBE04cdOBHjpbtL", "SlotNuDiepVien.Cmd");
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
      Code.SUBCRIBE = 3003;
      Code.UNSUBCRIBE = 3004;
      Code.CHANGE_ROOM = 3005;
      Code.PLAY = 3001;
      Code.UPDATE_RESULT = 3001;
      Code.UPDATE_POT = 3002;
      Code.AUTO = 3006;
      Code.STOP_AUTO = 3006;
      Code.FORCE_STOP_AUTO = 3008;
      Code.SUBCRIBE_RESPONSE = 3009;
      Code.BIG_WIN = 3010;
      Code.FREE = 3011;
      Code.FREE_DAI_LY = 3012;
      Code.MINIMIZE = 3013;
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
          this.valueRoom = 0;
          this.x2 = 0;
          this.valueRoom = this.getLong();
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
          this.awardsDetail = "";
          this.listSuggestionActions = [];
          this.ref = this.getLong();
          this.result = this.getByte();
          this.matrix = this.getString();
          this.linesWin = this.getString();
          this.haiSao = this.getString();
          this.prize = this.getLong();
          this.currentMoney = this.getLong();
          let awardsDetail = this.getString();
          cc.log(awardsDetail);
          this.awardsDetail = JSON.parse(awardsDetail || "{}");
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
          this.dateX2 = "";
          this.remain = 0;
          this.currentMoney = 0;
          this.items = "";
          this.awards = "";
          this.linesConfig = "";
          this.dateX2 = this.getString();
          this.remain = this.getByte();
          this.currentMoney = this.getLong();
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
  "SlotNuDiepVien.Controller": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c48eeeTu7tGIZuuVFMb9R1U", "SlotNuDiepVien.Controller");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.SlotNuDiepVienController = exports.GameConfig = exports.Line = exports.Cell = exports.Award = exports.Item = void 0;
    const SlotNuDiepVien_Cmd_1 = require("./SlotNuDiepVien.Cmd");
    const Tween_1 = require("../../Main/Game/src/common/Tween");
    const Network_InPacket_1 = require("../../Main/Game/src/networks/Network.InPacket");
    const SlotNetworkClient_1 = require("../../Main/Game/src/networks/SlotNetworkClient");
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const SlotNuDiepVien_TrialResults_1 = require("./SlotNuDiepVien.TrialResults");
    const SlotNuDiepVien_PopupSelectLine_1 = require("./SlotNuDiepVien.PopupSelectLine");
    const SlotNuDiepVien_PopupBonus_1 = require("./SlotNuDiepVien.PopupBonus");
    const BroadcastReceiver_1 = require("../../Main/Game/src/common/BroadcastReceiver");
    const SlotNuDiepVien_PopupGuide_1 = require("./SlotNuDiepVien.PopupGuide");
    const SlotNuDiepVien_PopupHistory_1 = require("./SlotNuDiepVien.PopupHistory");
    const SlotNuDiepVien_PopupJackpotHistory_1 = require("./SlotNuDiepVien.PopupJackpotHistory");
    const App_1 = require("../../Main/Game/src/common/App");
    const SlotNuDiepVien_SoundControler_1 = require("./SlotNuDiepVien.SoundControler");
    const SlotNuDiepVien_SpinControler_1 = require("./SlotNuDiepVien.SpinControler");
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
    let SlotNuDiepVienController = class SlotNuDiepVienController extends cc.Component {
      constructor() {
        super(...arguments);
        this.scene = null;
        this.sprFrameItems = [];
        this.sprFrameItemsBlur = [];
        this.itemTemplate = null;
        this.columns = null;
        this.linesWin = null;
        this.line = null;
        this.listLine = null;
        this.listIndexLine = null;
        this.lblJackpot = null;
        this.lblCoin = null;
        this.lblWinNow = null;
        this.toast = null;
        this.effectWinCash = null;
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
        this.GAME_CONFIG = null;
      }
      start() {
        var _a;
        this.betIdx = Configs_1.default.Login.Coin >= Configs_1.default.App.RICH_MAN ? 1 : 0;
        this.spinControler.setInfoBet(this.isTrial, this.arrLineSelect.length.toString(), this.LISTBETLABEL[this.betIdx], this.arrLineSelect.length * this.LISTBET[this.betIdx]);
        this.soundControler.initMusicAndSound();
        this.itemHeight = this.itemTemplate.height;
        this.initItemRamdom();
        BroadcastReceiver_1.default.register(BroadcastReceiver_1.default.USER_DISCONNECTED, data => {
          SlotNetworkClient_1.default.getInstance().close();
        }, this);
        BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.SET_SOUND, cc.find("Canvas"));
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
              ErrorLogger_1.ErrorLogger.sendLogError("USER_DISCONNECTED", "SlotNuDiepVien", "reason: " + res.reason);
            }
            break;

           case SlotNuDiepVien_Cmd_1.default.Code.UPDATE_POT:
            {
              let res = new SlotNuDiepVien_Cmd_1.default.ReceiveUpdatePot(data);
              Tween_1.default.numberTo(this.lblJackpot, res.valueRoom, .3);
            }
            break;

           case SlotNuDiepVien_Cmd_1.default.Code.UPDATE_RESULT:
            {
              let res = new SlotNuDiepVien_Cmd_1.default.ReceiveResult(data);
              cc.log(res);
              res && this.onSpinResult(res);
            }
            break;

           case SlotNuDiepVien_Cmd_1.default.Code.SUBCRIBE_RESPONSE:
            {
              let res = new SlotNuDiepVien_Cmd_1.default.ReceiveSubcribe(data);
              cc.log(res);
              this.initLineConfig(res);
            }
          }
        }, this);
        SlotNetworkClient_1.default.getInstance().send(new SlotNuDiepVien_Cmd_1.default.SendSubcribe(this.betIdx));
        this.resetState();
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
              eventHandler.component = "SlotNuDiepVien.Controller";
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
      commonClickHandler() {
        this.soundControler.commonClickHandler();
      }
      initLineConfig(dataLineConfig) {
        var _a, _b;
        let items = [];
        JSON.parse(dataLineConfig.items).object.filter(item => "NONE" != item.value).forEach(item => {
          items.push(new Item(item));
        });
        let awards = [];
        JSON.parse(dataLineConfig.awards).object.forEach(award => {
          awards.push(new Award(award));
        });
        let linesConfig = [];
        JSON.parse(dataLineConfig.linesConfig).object.forEach(line => {
          linesConfig.push(new Line(line));
        });
        this.GAME_CONFIG = new GameConfig({
          items: items,
          awards: awards,
          linesConfig: linesConfig
        });
        cc.log(this.GAME_CONFIG);
        this.initLine(null === (_a = this.GAME_CONFIG) || void 0 === _a ? void 0 : _a.linesConfig);
        cc.sys.localStorage.setItem("CF", JSON.stringify({
          items: items,
          awards: awards,
          linesConfig: linesConfig
        }));
        this.GAME_CONFIG.items.length != this.sprFrameItems.length && ErrorLogger_1.ErrorLogger.sendLogError("Game config error", "Slot NuDiepVien", "ITEMS not matching (server " + items.length + " - client " + this.sprFrameItems.length + ")");
        this.GAME_CONFIG.linesConfig.length != this.arrLineSelect.length && ErrorLogger_1.ErrorLogger.sendLogError("Game config error", "Slot NuDiepVien", "LINES not matching (server " + linesConfig.length + " - client " + this.arrLineSelect.length + ")");
        null === (_b = App_1.default.instance) || void 0 === _b ? void 0 : _b.showLoading(false);
      }
      initItemRamdom() {
        this.columns.children.forEach((colum, index) => {
          for (let j = 0; j < 9; j++) {
            let item = colum.children[j];
            if (!item) {
              item = cc.instantiate(this.itemTemplate);
              colum.addChild(item);
            }
            item.getChildByName("img").active = false;
            item.getChildByName("ani").children.forEach(item2 => {
              item2.active = false;
            });
            if (j >= 3) item.getChildByName("img").getComponent(cc.Sprite).spriteFrame = null; else {
              var iconId = Utils_1.default.randomRangeInt(0, this.sprFrameItems.length);
              item.getChildByName("img").active = false;
              item.getChildByName("ani").children[iconId].active = true;
              item.getChildByName("ani").stopAllActions();
              let speed = 66;
              let actionRotation = [ cc.delayTime(1), cc.rotateTo(8 / speed, -8), cc.rotateTo(16 / speed, 8), cc.rotateTo(12 / speed, -4), cc.rotateTo(4 / speed * 1.5, 0) ];
              let actionScale = [];
              for (let i = 0; i < 2 / .7; i++) {
                actionScale.push(cc.scaleTo(.35, 1.03));
                actionScale.push(cc.scaleTo(.35, 1));
              }
              item.getChildByName("ani").runAction(cc.repeatForever(cc.spawn(cc.sequence(actionRotation), cc.sequence(actionScale))));
            }
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
        SlotNetworkClient_1.default.getInstance().send(new SlotNuDiepVien_Cmd_1.default.SendChangeRoom(oldIdx, this.betIdx));
      }
      actBack() {
        SlotNetworkClient_1.default.getInstance().send(new SlotNuDiepVien_Cmd_1.default.SendUnSubcribe(this.betIdx));
        cc.audioEngine.stopAll();
        cc.director.loadScene("Lobby", () => {
          let bundleNuDiepVien = cc.assetManager.getBundle(Configs_1.default.App.BUNDLE_NAME.NUDIEPVIEN);
          bundleNuDiepVien.releaseAll();
          cc.assetManager.removeBundle(bundleNuDiepVien);
        });
      }
      actHidden() {
        this.showToast("T\xednh n\u0103ng \u0111ang ph\xe1t tri\u1ec3n.");
      }
      actTrial() {
        this.isTrial = !this.isTrial;
        this.setSpinMode(SlotNuDiepVien_SpinControler_1.SpinMode.NORMAL);
        this.isTrial ? this.spinControler.setInfoBet(this.isTrial, "20", "100", 2e3) : this.spinControler.setInfoBet(this.isTrial, this.arrLineSelect.length.toString(), this.LISTBET[this.betIdx], this.arrLineSelect.length * this.LISTBET[this.betIdx]);
      }
      toggleAutoOnCheck() {
        if (this.isTrial) {
          this.showToast("T\xednh n\u0103ng n\xe0y kh\xf4ng ho\u1ea1t \u0111\u1ed9ng \u1edf ch\u1ebf \u0111\u1ed9 ch\u01a1i th\u1eed.");
          return;
        }
        if (this.spinControler.spinType.auto) this.setSpinMode(SlotNuDiepVien_SpinControler_1.SpinMode.NORMAL); else {
          this.setSpinMode(SlotNuDiepVien_SpinControler_1.SpinMode.AUTO);
          this.spinControler.setStageButtonSpin(true);
        }
      }
      toggleBoostOnCheck() {
        if (this.isTrial) {
          this.showToast("T\xednh n\u0103ng n\xe0y kh\xf4ng ho\u1ea1t \u0111\u1ed9ng \u1edf ch\u1ebf \u0111\u1ed9 ch\u01a1i th\u1eed.");
          return;
        }
        if (this.spinControler.spinType.autox2) this.setSpinMode(SlotNuDiepVien_SpinControler_1.SpinMode.NORMAL); else {
          this.setSpinMode(SlotNuDiepVien_SpinControler_1.SpinMode.AUTO_X2);
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
          this.setSpinMode(SlotNuDiepVien_SpinControler_1.SpinMode.NORMAL);
          return;
        }
        if (!this.canSpin) return;
        this.resetState(callByClick);
        this.canSpin = false;
        this.setEnabledAllButtonsExceptPlayMode(false);
        if (this.isTrial) {
          var rIdx = Utils_1.default.randomRangeInt(0, SlotNuDiepVien_TrialResults_1.default.results.length);
          let result = SlotNuDiepVien_TrialResults_1.default.results[rIdx];
          3 == result.result && (result.prize = Utils_1.default.stringToInt(this.lblJackpot.string));
          this.onSpinResult(result);
        } else SlotNetworkClient_1.default.getInstance().send(new SlotNuDiepVien_Cmd_1.default.SendPlay(this.LISTBET[this.betIdx], this.arrLineSelect.toString()));
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
          this.setSpinMode(SlotNuDiepVien_SpinControler_1.SpinMode.NORMAL);
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
        this.columns.parent.setContentSize(cc.winSize.width, 450);
        this.soundControler.playSounWithID(7, speedRoll);
        this.columns.children.forEach((colum, index) => {
          let stepRollDown = colum.height - 3 * this.itemHeight;
          let actionRoll = [ cc.delayTime(this.ADD_SPIN_DURATION * index), cc.callFunc(() => {
            colum.children.forEach((item, i) => {
              item.getChildByName("img").getComponent(cc.Sprite).spriteFrame = this.sprFrameItemsBlur[i < 3 || i >= 6 ? matrix[2 - i % 3][index] : Utils_1.default.randomRangeInt(0, this.sprFrameItemsBlur.length)];
              item.getChildByName("img").active = true;
              item.getChildByName("ani").children.forEach(item2 => {
                item2.active = false;
              });
            });
          }) ];
          for (let i = 0; i < 2; i++) {
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
            4 === index && this.spined(receiveResult);
          }));
          let showResult = cc.callFunc(() => {
            var _a;
            var children = colum.children;
            children.forEach(node => node.getChildByName("img").getComponent(cc.Sprite).spriteFrame = null);
            for (let i = 0; i < 3; i++) {
              let nameItem = null === (_a = this.GAME_CONFIG.items.find(item => item.id == matrix[2 - i][index])) || void 0 === _a ? void 0 : _a.name;
              children[i].getChildByName("ani").getChildByName(nameItem).active = true;
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
            cc.assetManager.getBundle(Configs_1.default.App.BUNDLE_NAME.NUDIEPVIEN).load("res/prefabs/PopupBonus", cc.Prefab, (error, prefab) => {
              if (error) return;
              this.popupBonus = cc.instantiate(prefab).getComponent(SlotNuDiepVien_PopupBonus_1.default);
              this.scene.addChild(this.popupBonus.node);
              this.popupBonus.node.position = cc.v3(0, 0);
              this.popupBonus.showBonus(this.isTrial ? 100 : this.LISTBET[this.betIdx], receiveResult.haiSao, () => {
                this.showLineWins(receiveResult);
                this.effectBonus.getChildByName("bonus_eff").active = true;
                this.effectBonus.getChildByName("bonus_eff").getComponent(sp.Skeleton).setAnimation(0, "disappear", false);
              });
              this.effectBonus.getChildByName("bonus_eff").active = true;
              this.effectBonus.getChildByName("bonus_eff").getComponent(sp.Skeleton).setAnimation(0, "showup", false);
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
        var _a, _b, _c;
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
        }
        let actions = [];
        cc.sys.localStorage.setItem("KQ", JSON.stringify(receiveResult));
        if (receiveResult.prize > 0) {
          actions.push(cc.delayTime(1.5));
          let hideAllLine = cc.callFunc(() => {
            this.columns.parent.setContentSize(cc.winSize.width, cc.winSize.height);
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
              let typeWin = null === (_b = this.GAME_CONFIG.items.find(item => award.award.includes(item.value))) || void 0 === _b ? void 0 : _b.name;
              line.cells.forEach((cell, index) => {
                var _a;
                let typeCell = null === (_a = this.GAME_CONFIG.items.find(item => item.id == matrix[cell.row][cell.col])) || void 0 === _a ? void 0 : _a.name;
                if (typeWin == typeCell || typeWild == typeCell) {
                  rolls[cell.col].children[2 - cell.row].getChildByName("img").active = false;
                  rolls[cell.col].children[2 - cell.row].getChildByName("ani").getChildByName(typeCell).active = true;
                  rolls[cell.col].children[2 - cell.row].getChildByName("ani").getChildByName(typeCell).getComponent(sp.Skeleton).setAnimation(0, "animation", false);
                }
              });
            });
            let hideLine = cc.callFunc(() => {
              nodeLine.active = false;
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
        this.effectBigWin.getChildByName("bigwin-coin").active = false;
        label.node.opacity = 0;
        this.effectBigWin.runAction(cc.sequence(cc.callFunc(() => {
          this.effectBigWin.getChildByName("anim").getComponent(sp.Skeleton).setAnimation(0, "animation", true);
          label.string = "0";
        }), cc.delayTime(1), cc.callFunc(() => {
          this.effectBigWin.getChildByName("bigwin-coin").active = true;
          label.node.runAction(cc.fadeIn(.18));
          Tween_1.default.numberTo(label, cash, 1);
        }), cc.delayTime(3.3), cc.callFunc(() => {
          label.node.runAction(cc.fadeOut(.18));
          this.effectBigWin.getChildByName("bigwin-coin").active = false;
        }), cc.delayTime(.7), cc.callFunc(() => {
          this.effectBigWin.active = false;
          null != cb && cb();
        })));
      }
      showEffectJackpot(cash, cb = null) {
        this.effectJackpot.stopAllActions();
        this.effectJackpot.active = true;
        let label = this.effectJackpot.getComponentInChildren(cc.Label);
        label.node.active = false;
        this.effectJackpot.runAction(cc.sequence(cc.callFunc(() => {
          this.effectJackpot.getChildByName("anim").getComponent(sp.Skeleton).setAnimation(0, "animation", true);
          this.effectJackpot.getChildByName("jackpot-coin").active = false;
          label.string = "";
          label.node.active = true;
        }), cc.delayTime(2), cc.callFunc(() => {
          Tween_1.default.numberTo(label, cash, 1);
          this.effectJackpot.getChildByName("jackpot-coin").active = true;
          this.effectJackpot.getChildByName("jackpot-coin").getComponent(sp.Skeleton).setAnimation(0, "animation", true);
        }), cc.delayTime(3), cc.callFunc(() => {
          this.effectJackpot.active = false;
          null != cb && cb();
        })));
      }
      showEffectBonus(cb) {
        this.effectBonus.active = true;
        this.effectBonus.getChildByName("bonus_eff").active = true;
        this.effectBonus.getChildByName("bonus_eff").getComponent(sp.Skeleton).setAnimation(0, "showup", false);
        cb();
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
          cc.assetManager.getBundle(Configs_1.default.App.BUNDLE_NAME.NUDIEPVIEN).load("res/prefabs/PopupSelectLine", cc.Prefab, (error, prefab) => {
            var _a;
            if (error) return;
            this.popupSelectLine = cc.instantiate(prefab).getComponent(SlotNuDiepVien_PopupSelectLine_1.default);
            this.scene.addChild(this.popupSelectLine.node);
            this.popupSelectLine.node.position = cc.v3(0, 0);
            this.popupSelectLine.onSelectedChanged = this.onSelectedLineChanged.bind(this);
            this.popupSelectLine.showPopup(null === (_a = this.GAME_CONFIG) || void 0 === _a ? void 0 : _a.linesConfig);
            this.settingSoundClick();
            evt.target && evt.target.getComponent(cc.Button) && (evt.target.getComponent(cc.Button).enabled = true);
          });
        }
      }
      showJackpotHistory(evt) {
        if (this.popupJackpotHistory) this.popupJackpotHistory.show(); else {
          evt.target && evt.target.getComponent(cc.Button) && (evt.target.getComponent(cc.Button).enabled = false);
          cc.assetManager.getBundle(Configs_1.default.App.BUNDLE_NAME.NUDIEPVIEN).load("res/prefabs/PopupJackpotHistory", cc.Prefab, (error, prefab) => {
            if (error) return;
            this.popupJackpotHistory = cc.instantiate(prefab).getComponent(SlotNuDiepVien_PopupJackpotHistory_1.default);
            this.scene.addChild(this.popupJackpotHistory.node);
            this.settingSoundClick();
            this.popupJackpotHistory.show();
            evt.target && evt.target.getComponent(cc.Button) && (evt.target.getComponent(cc.Button).enabled = true);
          });
        }
      }
      showHistory(evt) {
        if (this.popupHistory) this.popupHistory.show(); else {
          evt.target && evt.target.getComponent(cc.Button) && (evt.target.getComponent(cc.Button).enabled = false);
          cc.assetManager.getBundle(Configs_1.default.App.BUNDLE_NAME.NUDIEPVIEN).load("res/prefabs/PopupHistory", cc.Prefab, (error, prefab) => {
            if (error) return;
            this.popupHistory = cc.instantiate(prefab).getComponent(SlotNuDiepVien_PopupHistory_1.default);
            this.scene.addChild(this.popupHistory.node);
            this.settingSoundClick();
            this.popupHistory.show();
            evt.target && evt.target.getComponent(cc.Button) && (evt.target.getComponent(cc.Button).enabled = true);
          });
        }
      }
      showGuide(evt) {
        if (this.popupGuide) this.popupGuide.show(); else {
          evt.target && evt.target.getComponent(cc.Button) && (evt.target.getComponent(cc.Button).enabled = false);
          cc.assetManager.getBundle(Configs_1.default.App.BUNDLE_NAME.NUDIEPVIEN).load("res/prefabs/PopupGuide", cc.Prefab, (error, prefab) => {
            if (error) return;
            this.popupGuide = cc.instantiate(prefab).getComponent(SlotNuDiepVien_PopupGuide_1.default);
            this.scene.addChild(this.popupGuide.node);
            this.popupGuide.node.position = cc.v3(0, 0);
            this.settingSoundClick();
            evt.target && evt.target.getComponent(cc.Button) && (evt.target.getComponent(cc.Button).enabled = true);
          });
        }
      }
    };
    __decorate([ property(cc.Node) ], SlotNuDiepVienController.prototype, "scene", void 0);
    __decorate([ property([ cc.SpriteFrame ]) ], SlotNuDiepVienController.prototype, "sprFrameItems", void 0);
    __decorate([ property([ cc.SpriteFrame ]) ], SlotNuDiepVienController.prototype, "sprFrameItemsBlur", void 0);
    __decorate([ property(cc.Node) ], SlotNuDiepVienController.prototype, "itemTemplate", void 0);
    __decorate([ property(cc.Node) ], SlotNuDiepVienController.prototype, "columns", void 0);
    __decorate([ property(cc.Node) ], SlotNuDiepVienController.prototype, "linesWin", void 0);
    __decorate([ property(cc.Node) ], SlotNuDiepVienController.prototype, "line", void 0);
    __decorate([ property(cc.SpriteAtlas) ], SlotNuDiepVienController.prototype, "listLine", void 0);
    __decorate([ property(cc.SpriteAtlas) ], SlotNuDiepVienController.prototype, "listIndexLine", void 0);
    __decorate([ property(cc.Label) ], SlotNuDiepVienController.prototype, "lblJackpot", void 0);
    __decorate([ property(cc.Label) ], SlotNuDiepVienController.prototype, "lblCoin", void 0);
    __decorate([ property(cc.Label) ], SlotNuDiepVienController.prototype, "lblWinNow", void 0);
    __decorate([ property(cc.Node) ], SlotNuDiepVienController.prototype, "toast", void 0);
    __decorate([ property(cc.Node) ], SlotNuDiepVienController.prototype, "effectWinCash", void 0);
    __decorate([ property(cc.Node) ], SlotNuDiepVienController.prototype, "effectBigWin", void 0);
    __decorate([ property(cc.Node) ], SlotNuDiepVienController.prototype, "effectJackpot", void 0);
    __decorate([ property(cc.Node) ], SlotNuDiepVienController.prototype, "effectBonus", void 0);
    __decorate([ property(cc.Button) ], SlotNuDiepVienController.prototype, "btnBack", void 0);
    __decorate([ property(SlotNuDiepVien_SpinControler_1.default) ], SlotNuDiepVienController.prototype, "spinControler", void 0);
    __decorate([ property(SlotNuDiepVien_SoundControler_1.default) ], SlotNuDiepVienController.prototype, "soundControler", void 0);
    SlotNuDiepVienController = __decorate([ ccclass ], SlotNuDiepVienController);
    exports.SlotNuDiepVienController = SlotNuDiepVienController;
    exports.default = SlotNuDiepVienController;
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
    "./SlotNuDiepVien.Cmd": "SlotNuDiepVien.Cmd",
    "./SlotNuDiepVien.PopupBonus": "SlotNuDiepVien.PopupBonus",
    "./SlotNuDiepVien.PopupGuide": "SlotNuDiepVien.PopupGuide",
    "./SlotNuDiepVien.PopupHistory": "SlotNuDiepVien.PopupHistory",
    "./SlotNuDiepVien.PopupJackpotHistory": "SlotNuDiepVien.PopupJackpotHistory",
    "./SlotNuDiepVien.PopupSelectLine": "SlotNuDiepVien.PopupSelectLine",
    "./SlotNuDiepVien.SoundControler": "SlotNuDiepVien.SoundControler",
    "./SlotNuDiepVien.SpinControler": "SlotNuDiepVien.SpinControler",
    "./SlotNuDiepVien.TrialResults": "SlotNuDiepVien.TrialResults"
  } ],
  "SlotNuDiepVien.PopupBonus": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "155a6WtXnpCZpcjvgVxPlTX", "SlotNuDiepVien.PopupBonus");
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
          node["btn"] = node.getChildByName("btn").getComponent(cc.Button);
          node["icon"] = node.getChildByName("icon");
          node["label"] = node.getChildByName("label").getComponent(cc.Label);
          node["factor"] = node.getChildByName("factor");
          node["btn"].node.on("click", () => {
            var value = this.dataBonus[this.dataBonus.length - this.left];
            switch (value) {
             case 0:
              this.factor++;
              this.lblFactor.string = "x" + this.factor;
              node["btn"].node.active = false;
              node["factor"].active = true;
              break;

             case 1:
              node.getChildByName("btn").active = false;
              node.getChildByName("icon").active = true;
              node["label"].node.active = true;
              node["label"].string = "0";
              Tween_1.default.numberTo(node["label"], 4 * this.betValue * this.factor, .3);
              break;

             case 2:
              this.showSpecial(10, () => {
                node["btn"].node.active = false;
                node["icon"].active = true;
                node["label"].node.active = true;
                node["label"].string = "0";
                Tween_1.default.numberTo(node["label"], 10 * this.betValue * this.factor, .3);
                this.left <= 0 && this.hidden();
              });
              break;

             case 3:
              this.showSpecial(15, () => {
                node["btn"].node.active = false;
                node["icon"].active = true;
                node["label"].node.active = true;
                node["label"].string = "0";
                Tween_1.default.numberTo(node["label"], 15 * this.betValue * this.factor, .3);
                this.left <= 0 && this.hidden();
              });
              break;

             case 4:
              this.showSpecial(20, () => {
                node["btn"].node.active = false;
                node["icon"].active = true;
                node["label"].node.active = true;
                node["label"].string = "0";
                Tween_1.default.numberTo(node["label"], 20 * this.betValue * this.factor, .3);
                this.left <= 0 && this.hidden();
              });
            }
            this.left--;
            this.lblLeft.string = "" + this.left;
            if (this.left <= 0) {
              0 !== value && 1 !== value || this.hidden();
              for (let i = 0; i < this.items.childrenCount; i++) this.items.children[i]["btn"].interactable = false;
            }
          });
        }
        for (let i = 0; i < this.itemSpecial.childrenCount; i++) {
          let node = this.itemSpecial.children[i];
          node["btn"] = node.getChildByName("btn").getComponent(cc.Button);
          node["icon"] = node.getChildByName("icon");
          node["label"] = node.getChildByName("label").getComponent(cc.Label);
          node["btn"].node.on("click", () => {
            node["btn"].node.active = false;
            node["icon"].active = true;
            node["label"].node.active = true;
            node["label"].string = "0";
            Tween_1.default.numberTo(node["label"], this.dataSpecial * this.betValue * this.factor, .3);
            for (let i = 0; i < this.itemSpecial.childrenCount; i++) this.itemSpecial.children[i]["btn"].interactable = false;
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
  "SlotNuDiepVien.PopupGuide": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "655b9j2FElCDLwUB8rH7A0M", "SlotNuDiepVien.PopupGuide");
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
    const {ccclass: ccclass, property: property} = cc._decorator;
    let PopupGuide = class PopupGuide extends Dialog_1.default {
      constructor() {
        super(...arguments);
        this.pages = [];
        this.btnNext = null;
        this.btnPrev = null;
        this.page = 0;
      }
      show() {
        super.show();
        this.page = 0;
        this.btnPrev.active = false;
        this.btnNext.active = true;
        this.reloadData();
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
    };
    __decorate([ property([ cc.Node ]) ], PopupGuide.prototype, "pages", void 0);
    __decorate([ property(cc.Node) ], PopupGuide.prototype, "btnNext", void 0);
    __decorate([ property(cc.Node) ], PopupGuide.prototype, "btnPrev", void 0);
    PopupGuide = __decorate([ ccclass ], PopupGuide);
    exports.PopupGuide = PopupGuide;
    exports.default = PopupGuide;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/Dialog": void 0
  } ],
  "SlotNuDiepVien.PopupHistory": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3bf0bX9TaFAiIH6BX9T3nkT", "SlotNuDiepVien.PopupHistory");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.PopupHistory = void 0;
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
        this.page = 1;
        this.maxPage = 1;
        this.items = new Array();
      }
      show() {
        super.show();
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
        this.maxPage = 1;
        this.lblPage.string = this.page + "/" + this.maxPage;
        this.loadData();
      }
      actNextPage() {
        if (this.page < this.maxPage) {
          this.page++;
          this.lblPage.string = this.page + "/" + this.maxPage;
          this.loadData();
        }
      }
      actPrevPage() {
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
          gn: "NuDiepVien"
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
              item.getChildByName("Session").getComponent(cc.Label).string = itemData["rf"];
              item.getChildByName("Time").getComponent(cc.Label).string = itemData["ts"].replace(" ", "\n");
              item.getChildByName("Bet").getComponent(cc.Label).string = Utils_1.default.formatNumber(parseInt(itemData["bv"]) * parseInt("" === itemData["lb"] ? 0 : itemData["lb"].split(",").length));
              item.getChildByName("LineBet").getComponent(cc.Label).string = "" === itemData["lb"] ? 0 : itemData["lb"].split(",").length;
              item.getChildByName("LineWin").getComponent(cc.Label).string = "" === itemData["lw"] ? 0 : itemData["lw"].split(",").length;
              item.getChildByName("Win").getComponent(cc.Label).string = Utils_1.default.formatNumber(itemData["pz"]);
              item.active = true;
            } else item.active = false;
          }
        });
      }
    };
    __decorate([ property(cc.Label) ], PopupHistory.prototype, "lblPage", void 0);
    __decorate([ property(cc.Node) ], PopupHistory.prototype, "itemTemplate", void 0);
    PopupHistory = __decorate([ ccclass ], PopupHistory);
    exports.PopupHistory = PopupHistory;
    exports.default = PopupHistory;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/App": void 0,
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/common/Dialog": void 0,
    "../../Main/Game/src/common/Http": void 0,
    "../../Main/Game/src/common/Utils": void 0
  } ],
  "SlotNuDiepVien.PopupJackpotHistory": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f2a2chMhE5GhqNo1/SIzU2e", "SlotNuDiepVien.PopupJackpotHistory");
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
        this.items = new Array();
      }
      show() {
        super.show();
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
        this.maxPage = 1;
        this.lblPage.string = this.page + "/" + this.maxPage;
        this.loadData();
      }
      actNextPage() {
        if (this.page < this.maxPage) {
          this.page++;
          this.lblPage.string = this.page + "/" + this.maxPage;
          this.loadData();
        }
      }
      actPrevPage() {
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
          gn: "NuDiepVien"
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
              item.active = false;
              let itemData = res["results"][i];
              let dataVip = res["listUserVipRank"] && res["listUserVipRank"].find(data => data.nickname == itemData["nn"]);
              item.getChildByName("Time").getComponent(cc.Label).string = itemData["ts"].replace(" ", "\n");
              item.getChildByName("Bet").getComponent(cc.Label).string = Utils_1.default.formatNumber(itemData["bv"]);
              item.getChildByName("Type").getComponent(cc.Label).string = 3 == itemData["rs"] ? "N\u1ed5 h\u0169" : "Th\u1eafng l\u1edbn";
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
            } else item.active = false;
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
  "SlotNuDiepVien.PopupSelectLine": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "704eaRiLOdBbIYQRNgoZYU+", "SlotNuDiepVien.PopupSelectLine");
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
        this.getSelectedLines().length > 0 && super.dismiss();
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
  "SlotNuDiepVien.SoundControler": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "342bfaV7pVJ3YL/QkVBcQDa", "SlotNuDiepVien.SoundControler");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.SlotNuDiepVienSoundControler = void 0;
    const {ccclass: ccclass, property: property} = cc._decorator;
    let SlotNuDiepVienSoundControler = class SlotNuDiepVienSoundControler extends cc.Component {
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
    }) ], SlotNuDiepVienSoundControler.prototype, "soundSpinMis", void 0);
    __decorate([ property({
      type: cc.AudioClip
    }) ], SlotNuDiepVienSoundControler.prototype, "soundSpinWin", void 0);
    __decorate([ property({
      type: cc.AudioClip
    }) ], SlotNuDiepVienSoundControler.prototype, "soundBigWin", void 0);
    __decorate([ property({
      type: cc.AudioClip
    }) ], SlotNuDiepVienSoundControler.prototype, "soundJackpot", void 0);
    __decorate([ property({
      type: cc.AudioClip
    }) ], SlotNuDiepVienSoundControler.prototype, "soundBonus", void 0);
    __decorate([ property({
      type: cc.AudioClip
    }) ], SlotNuDiepVienSoundControler.prototype, "soundClick", void 0);
    __decorate([ property({
      type: cc.AudioClip
    }) ], SlotNuDiepVienSoundControler.prototype, "musicBackground", void 0);
    __decorate([ property({
      type: cc.AudioClip
    }) ], SlotNuDiepVienSoundControler.prototype, "soundSpin", void 0);
    __decorate([ property(cc.Node) ], SlotNuDiepVienSoundControler.prototype, "soundOff", void 0);
    __decorate([ property(cc.Node) ], SlotNuDiepVienSoundControler.prototype, "musicOff", void 0);
    SlotNuDiepVienSoundControler = __decorate([ ccclass ], SlotNuDiepVienSoundControler);
    exports.SlotNuDiepVienSoundControler = SlotNuDiepVienSoundControler;
    exports.default = SlotNuDiepVienSoundControler;
    cc._RF.pop();
  }, {} ],
  "SlotNuDiepVien.SpinControler": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fbf7eOQtHpARYLbX0iVcJrC", "SlotNuDiepVien.SpinControler");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.SlotNuDiepVienSpinControler = exports.SpinType = exports.SpinMode = void 0;
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
    let SlotNuDiepVienSpinControler = class SlotNuDiepVienSpinControler extends cc.Component {
      constructor() {
        super(...arguments);
        this.btnSpinAutoX2 = null;
        this.btnTrial = null;
        this.sprFrameTrialThu = null;
        this.sprFrameTrialThat = null;
        this.sprFrameAutoOn = null;
        this.sprFrameAutoOff = null;
        this.btnSpin = null;
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
          this.spinType.auto = false;
          this.spinType.autox2 = false;
        }
        this.btnSpinAutoX2.interactable = !this.spinType.autox2;
      }
      setStageButtonSpin(stageStop) {
        this.btnSpin.getComponent(sp.Skeleton).setAnimation(0, stageStop ? "auto" : "quay", true);
      }
      setClickSpin() {
        cc.log("vao set spin");
        this.btnSpin.node.on("touchstart", touch => {
          cc.log("vao touchstart");
          this.timeHoldSpin = 0;
          this.spinType.auto || this.spinType.autox2 || this.btnSpin.getComponent(sp.Skeleton).setAnimation(0, "chuyen auto", false);
          this.isHoldSpin = true;
        });
        this.btnSpin.node.on("touchend", touch => {
          cc.log("vao touchend");
          if (this.isHoldSpin) {
            this.isHoldSpin = false;
            if (this.timeHoldSpin < 1) {
              cc.log("time spin", this.timeHoldSpin);
              this.spin(true);
              this.btnSpin.getComponent(sp.Skeleton).setAnimation(0, "quay", true);
            }
            this.timeHoldSpin = 0;
          }
        });
      }
      update(dt) {
        if (this.isHoldSpin && !this.spinType.auto && !this.spinType.autox2) {
          this.timeHoldSpin += dt;
          if (this.timeHoldSpin >= 1) {
            cc.log("time spin", this.timeHoldSpin);
            this.btnSpin.getComponent(sp.Skeleton).setAnimation(0, "auto", true);
            this.spinAuto();
            this.isHoldSpin = false;
            this.timeHoldSpin = 0;
          }
        }
      }
      setEnabledAllButtonsSpin(enabled) {
        this.btnSpin.interactable = enabled;
        this.btnBet.interactable = enabled;
        this.btnBet.node.getComponentsInChildren(cc.Label).forEach(lable => {
          lable.setMaterial(0, cc.Material.getBuiltinMaterial(enabled ? "2d-sprite" : "2d-gray-sprite"));
        });
        this.btnLine.interactable = enabled;
        this.btnLine.node.getComponentsInChildren(cc.Label).forEach(lable => {
          lable.setMaterial(0, cc.Material.getBuiltinMaterial(enabled ? "2d-sprite" : "2d-gray-sprite"));
        });
        this.btnTrial.interactable = enabled;
      }
    };
    __decorate([ property(cc.Button) ], SlotNuDiepVienSpinControler.prototype, "btnSpinAutoX2", void 0);
    __decorate([ property(cc.Button) ], SlotNuDiepVienSpinControler.prototype, "btnTrial", void 0);
    __decorate([ property(cc.SpriteFrame) ], SlotNuDiepVienSpinControler.prototype, "sprFrameTrialThu", void 0);
    __decorate([ property(cc.SpriteFrame) ], SlotNuDiepVienSpinControler.prototype, "sprFrameTrialThat", void 0);
    __decorate([ property(cc.SpriteFrame) ], SlotNuDiepVienSpinControler.prototype, "sprFrameAutoOn", void 0);
    __decorate([ property(cc.SpriteFrame) ], SlotNuDiepVienSpinControler.prototype, "sprFrameAutoOff", void 0);
    __decorate([ property(cc.Button) ], SlotNuDiepVienSpinControler.prototype, "btnSpin", void 0);
    __decorate([ property(cc.Button) ], SlotNuDiepVienSpinControler.prototype, "btnLine", void 0);
    __decorate([ property(cc.Label) ], SlotNuDiepVienSpinControler.prototype, "lblLine", void 0);
    __decorate([ property(cc.Label) ], SlotNuDiepVienSpinControler.prototype, "lblBet", void 0);
    __decorate([ property(cc.Button) ], SlotNuDiepVienSpinControler.prototype, "btnBet", void 0);
    __decorate([ property(cc.Label) ], SlotNuDiepVienSpinControler.prototype, "lblTotalBet", void 0);
    SlotNuDiepVienSpinControler = __decorate([ ccclass ], SlotNuDiepVienSpinControler);
    exports.SlotNuDiepVienSpinControler = SlotNuDiepVienSpinControler;
    exports.default = SlotNuDiepVienSpinControler;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/Tween": void 0
  } ],
  "SlotNuDiepVien.TrialResults": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "35f3emxbvRKd6hXTPjxUYQe", "SlotNuDiepVien.TrialResults");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var SlotNuDiepVien;
    (function(SlotNuDiepVien) {
      class TrialResults {}
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
        linesWin: "18",
        haiSao: "",
        prize: 12e4,
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
        linesWin: "7",
        haiSao: "",
        prize: 12e4,
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
        linesWin: "3",
        haiSao: "",
        prize: 12e4,
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
        linesWin: "2",
        haiSao: "",
        prize: 12e4,
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
        prize: 12e4,
        currentMoney: 10007600
      }, {
        awardsDetail: {
          object: [ {
            award: "TRIPLE_JACK_POT",
            money: 3e3,
            lineName: "line17"
          } ]
        },
        ref: 251,
        freeSpin: 0,
        isFree: false,
        itemsWild: "",
        ratio: 0,
        result: 3,
        matrix: "1,4,2,6,4,0,1,2,4,0,2,0,0,0,2",
        linesWin: "18",
        haiSao: "",
        prize: 12e4,
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
        linesWin: "7",
        haiSao: "",
        prize: 12e4,
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
        linesWin: "3",
        haiSao: "",
        prize: 12e4,
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
        linesWin: "2",
        haiSao: "",
        prize: 12e4,
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
        prize: 12e4,
        currentMoney: 10007600
      }, {
        awardsDetail: {
          object: [ {
            award: "TRIPLE_SUNG_DOI",
            money: 800,
            lineName: "line1"
          }, {
            award: "TRIPLE_SUNG_DOI",
            money: 800,
            lineName: "line4"
          }, {
            award: "TRIPLE_SUNG_DOI",
            money: 800,
            lineName: "line5"
          }, {
            award: "TRIPLE_AO_GIAP",
            money: 700,
            lineName: "line8"
          }, {
            award: "TRIPLE_SUNG_DOI",
            money: 800,
            lineName: "line10"
          }, {
            award: "TRIPLE_SUNG_DOI",
            money: 800,
            lineName: "line14"
          }, {
            award: "TRIPLE_SUNG_DOI",
            money: 800,
            lineName: "line17"
          } ]
        },
        ref: 1640110,
        result: 1,
        matrix: "4,3,4,2,0,3,5,0,3,3,7,8,0,4,6",
        linesWin: "1,4,5,8,10,14,17",
        haiSao: "",
        prize: 5500,
        currentMoney: 40220600
      }, {
        awardsDetail: {
          object: [ {
            award: "TRIPLE_SUNG_DOI",
            money: 800,
            lineName: "line1"
          }, {
            award: "TRIPLE_GIAY",
            money: 100,
            lineName: "line3"
          }, {
            award: "TRIPLE_SUNG_DOI",
            money: 800,
            lineName: "line4"
          }, {
            award: "QUADRA_SUNG_DOI",
            money: 1500,
            lineName: "line5"
          }, {
            award: "TRIPLE_GIAY",
            money: 100,
            lineName: "line7"
          }, {
            award: "TRIPLE_GIAY",
            money: 100,
            lineName: "line9"
          }, {
            award: "TRIPLE_GIAY",
            money: 100,
            lineName: "line11"
          }, {
            award: "TRIPLE_SUNG_DOI",
            money: 800,
            lineName: "line12"
          }, {
            award: "TRIPLE_GIAY",
            money: 100,
            lineName: "line20"
          } ]
        },
        ref: 1640114,
        result: 1,
        matrix: "0,8,8,7,7,4,3,2,3,3,8,6,3,8,8",
        linesWin: "1,3,4,5,7,9,11,12,20",
        haiSao: "",
        prize: 4400,
        currentMoney: 40220900
      }, {
        awardsDetail: {
          object: [ {
            award: "TRIPLE_SUNG_DOI",
            money: 800,
            lineName: "line1"
          }, {
            award: "TRIPLE_GIAY",
            money: 100,
            lineName: "line5"
          }, {
            award: "TRIPLE_GIAY",
            money: 100,
            lineName: "line10"
          }, {
            award: "TRIPLE_SUNG_DOI",
            money: 800,
            lineName: "line11"
          }, {
            award: "TRIPLE_SUNG_DOI",
            money: 800,
            lineName: "line12"
          }, {
            award: "QUADRA_SUNG_DOI",
            money: 1500,
            lineName: "line15"
          }, {
            award: "QUADRA_SUNG_DOI",
            money: 1500,
            lineName: "line16"
          }, {
            award: "TRIPLE_GIAY",
            money: 100,
            lineName: "line18"
          }, {
            award: "TRIPLE_SUNG_DOI",
            money: 800,
            lineName: "line20"
          } ]
        },
        ref: 1640120,
        result: 1,
        matrix: "3,4,2,7,5,8,3,3,3,8,8,6,8,2,3",
        linesWin: "1,5,10,11,12,15,16,18,20",
        haiSao: "",
        prize: 6500,
        currentMoney: 40221e3
      }, {
        awardsDetail: {
          object: [ {
            award: "TRIPLE_KIEM_NHAT",
            money: 1500,
            lineName: "line2"
          }, {
            award: "TRIPLE_GIAY",
            money: 100,
            lineName: "line2"
          }, {
            award: "TRIPLE_MU",
            money: 200,
            lineName: "line3"
          }, {
            award: "TRIPLE_GIAY",
            money: 100,
            lineName: "line6"
          }, {
            award: "TRIPLE_MU",
            money: 200,
            lineName: "line7"
          }, {
            award: "TRIPLE_KIEM_NHAT",
            money: 1500,
            lineName: "line8"
          }, {
            award: "TRIPLE_MU",
            money: 200,
            lineName: "line9"
          }, {
            award: "TRIPLE_GIAY",
            money: 100,
            lineName: "line10"
          }, {
            award: "TRIPLE_MU",
            money: 200,
            lineName: "line13"
          }, {
            award: "TRIPLE_GIAY",
            money: 100,
            lineName: "line17"
          }, {
            award: "TRIPLE_MU",
            money: 200,
            lineName: "line19"
          } ]
        },
        ref: 1640131,
        result: 1,
        matrix: "2,8,2,1,8,8,4,4,7,6,6,6,4,2,6",
        linesWin: "2,2,3,6,7,8,9,10,13,17,19",
        haiSao: "",
        prize: 4400,
        currentMoney: 40209200
      }, {
        awardsDetail: {
          object: [ {
            award: "TRIPLE_MU",
            money: 200,
            lineName: "line2"
          }, {
            award: "TRIPLE_KIEM_NHAT",
            money: 1500,
            lineName: "line4"
          }, {
            award: "TRIPLE_MU",
            money: 200,
            lineName: "line6"
          }, {
            award: "TRIPLE_MU",
            money: 200,
            lineName: "line8"
          }, {
            award: "TRIPLE_GIAY",
            money: 100,
            lineName: "line11"
          }, {
            award: "TRIPLE_MU",
            money: 200,
            lineName: "line13"
          }, {
            award: "TRIPLE_MU",
            money: 200,
            lineName: "line16"
          }, {
            award: "TRIPLE_KIEM_NHAT",
            money: 1500,
            lineName: "line17"
          }, {
            award: "TRIPLE_MU",
            money: 200,
            lineName: "line19"
          } ]
        },
        ref: 1640134,
        result: 1,
        matrix: "6,4,1,6,5,2,8,6,6,2,2,6,7,7,8",
        linesWin: "2,4,6,8,11,13,16,17,19",
        haiSao: "",
        prize: 4300,
        currentMoney: 40211e3
      }, {
        awardsDetail: {
          object: [ {
            award: "TRIPLE_AO_GIAP",
            money: 700,
            lineName: "line3"
          }, {
            award: "QUADRA_AO_GIAP",
            money: 1e3,
            lineName: "line7"
          }, {
            award: "TRIPLE_AO_GIAP",
            money: 700,
            lineName: "line8"
          }, {
            award: "TRIPLE_KIEM_NHAT",
            money: 1500,
            lineName: "line11"
          }, {
            award: "TRIPLE_AO_GIAP",
            money: 700,
            lineName: "line13"
          }, {
            award: "TRIPLE_KIEM_NHAT",
            money: 1500,
            lineName: "line15"
          }, {
            award: "TRIPLE_AO_GIAP",
            money: 700,
            lineName: "line19"
          }, {
            award: "TRIPLE_AO_GIAP",
            money: 700,
            lineName: "line20"
          } ]
        },
        ref: 1640163,
        result: 1,
        matrix: "0,3,4,4,8,5,6,4,2,8,2,4,7,4,1",
        linesWin: "3,7,8,11,13,15,19,20",
        haiSao: "",
        prize: 7500,
        currentMoney: 40187200
      }, {
        awardsDetail: {
          object: [ {
            award: "TRIPLE_AO_GIAP",
            money: 700,
            lineName: "line3"
          }, {
            award: "TRIPLE_AO_GIAP",
            money: 700,
            lineName: "line5"
          }, {
            award: "TRIPLE_AO_GIAP",
            money: 700,
            lineName: "line8"
          }, {
            award: "TRIPLE_SUNG_DOI",
            money: 800,
            lineName: "line11"
          }, {
            award: "TRIPLE_AO_GIAP",
            money: 700,
            lineName: "line12"
          }, {
            award: "QUADRA_AO_GIAP",
            money: 1e3,
            lineName: "line18"
          } ]
        },
        ref: 1640186,
        result: 1,
        matrix: "7,2,3,6,4,4,4,5,0,8,3,4,4,4,3",
        linesWin: "3,5,8,11,12,18",
        haiSao: "",
        prize: 4600,
        currentMoney: 40176300
      }, {
        awardsDetail: {
          object: [ {
            award: "TRIPLE_MU",
            money: 200,
            lineName: "line2"
          }, {
            award: "TRIPLE_LUU_DAN",
            money: 300,
            lineName: "line2"
          }, {
            award: "TRIPLE_SUNG_DOI",
            money: 800,
            lineName: "line2"
          }, {
            award: "TRIPLE_LUU_DAN",
            money: 300,
            lineName: "line3"
          }, {
            award: "TRIPLE_MU",
            money: 200,
            lineName: "line6"
          }, {
            award: "TRIPLE_LUU_DAN",
            money: 300,
            lineName: "line6"
          }, {
            award: "TRIPLE_SUNG_DOI",
            money: 800,
            lineName: "line6"
          }, {
            award: "TRIPLE_LUU_DAN",
            money: 300,
            lineName: "line7"
          }, {
            award: "PENTA_LUU_DAN",
            money: 3e3,
            lineName: "line9"
          }, {
            award: "TRIPLE_ONG_NHOM",
            money: 100,
            lineName: "line10"
          }, {
            award: "TRIPLE_LUU_DAN",
            money: 300,
            lineName: "line10"
          }, {
            award: "TRIPLE_MU",
            money: 200,
            lineName: "line10"
          }, {
            award: "TRIPLE_LUU_DAN",
            money: 300,
            lineName: "line11"
          }, {
            award: "TRIPLE_ONG_NHOM",
            money: 100,
            lineName: "line14"
          }, {
            award: "TRIPLE_LUU_DAN",
            money: 300,
            lineName: "line15"
          }, {
            award: "TRIPLE_ONG_NHOM",
            money: 100,
            lineName: "line17"
          }, {
            award: "TRIPLE_LUU_DAN",
            money: 300,
            lineName: "line17"
          }, {
            award: "TRIPLE_MU",
            money: 200,
            lineName: "line17"
          }, {
            award: "TRIPLE_LUU_DAN",
            money: 300,
            lineName: "line19"
          }, {
            award: "TRIPLE_LUU_DAN",
            money: 300,
            lineName: "line20"
          } ]
        },
        ref: 1640192,
        result: 2,
        matrix: "6,1,5,1,3,7,7,5,6,6,5,4,5,7,5",
        linesWin: "2,2,2,3,6,6,6,7,9,10,10,10,11,14,15,17,17,17,19,20",
        haiSao: "",
        prize: 8700,
        currentMoney: 40179500
      }, {
        awardsDetail: {
          object: [ {
            award: "TRIPLE_KIEM_NHAT",
            money: 1500,
            lineName: "line6"
          }, {
            award: "TRIPLE_KIEM_NHAT",
            money: 1500,
            lineName: "line16"
          }, {
            award: "TRIPLE_KIEM_NHAT",
            money: 1500,
            lineName: "line19"
          } ]
        },
        ref: 1640210,
        result: 1,
        matrix: "3,4,7,2,2,3,4,1,2,7,0,4,8,2,6",
        linesWin: "6,16,19",
        haiSao: "",
        prize: 4500,
        currentMoney: 40165700
      }, {
        awardsDetail: {
          object: [ {
            award: "TRIPLE_SUNG_DOI",
            money: 800,
            lineName: "line2"
          }, {
            award: "TRIPLE_KIEM_NHAT",
            money: 1500,
            lineName: "line7"
          }, {
            award: "TRIPLE_SUNG_DOI",
            money: 800,
            lineName: "line17"
          }, {
            award: "TRIPLE_KIEM_NHAT",
            money: 1500,
            lineName: "line20"
          } ]
        },
        ref: 1640229,
        result: 1,
        matrix: "8,3,3,3,5,7,7,2,8,6,8,8,4,2,2",
        linesWin: "2,7,17,20",
        haiSao: "",
        prize: 4600,
        currentMoney: 40146100
      }, {
        awardsDetail: {
          object: [ {
            award: "TRIPLE_KIEM_NHAT",
            money: 1500,
            lineName: "line1"
          }, {
            award: "TRIPLE_KIEM_NHAT",
            money: 1500,
            lineName: "line4"
          }, {
            award: "TRIPLE_KIEM_NHAT",
            money: 1500,
            lineName: "line5"
          }, {
            award: "TRIPLE_LUU_DAN",
            money: 300,
            lineName: "line7"
          }, {
            award: "TRIPLE_LUU_DAN",
            money: 300,
            lineName: "line13"
          }, {
            award: "TRIPLE_LUU_DAN",
            money: 300,
            lineName: "line14"
          }, {
            award: "TRIPLE_GIAY",
            money: 100,
            lineName: "line17"
          }, {
            award: "TRIPLE_LUU_DAN",
            money: 300,
            lineName: "line19"
          } ]
        },
        ref: 1640235,
        result: 1,
        matrix: "4,8,8,5,0,2,3,5,2,1,5,3,7,5,8",
        linesWin: "1,4,5,7,13,14,17,19",
        haiSao: "",
        prize: 5800,
        currentMoney: 40143400
      }, {
        awardsDetail: {
          object: [ {
            award: "TRIPLE_ONG_NHOM",
            money: 100,
            lineName: "line1"
          }, {
            award: "QUADRA_MU",
            money: 500,
            lineName: "line3"
          }, {
            award: "QUADRA_ONG_NHOM",
            money: 400,
            lineName: "line4"
          }, {
            award: "TRIPLE_ONG_NHOM",
            money: 100,
            lineName: "line5"
          }, {
            award: "QUADRA_MU",
            money: 500,
            lineName: "line7"
          }, {
            award: "QUADRA_MU",
            money: 500,
            lineName: "line9"
          }, {
            award: "TRIPLE_ONG_NHOM",
            money: 100,
            lineName: "line10"
          }, {
            award: "TRIPLE_MU",
            money: 200,
            lineName: "line11"
          }, {
            award: "TRIPLE_MU",
            money: 200,
            lineName: "line13"
          }, {
            award: "TRIPLE_ONG_NHOM",
            money: 100,
            lineName: "line14"
          }, {
            award: "QUADRA_MU",
            money: 500,
            lineName: "line15"
          }, {
            award: "QUADRA_ONG_NHOM",
            money: 400,
            lineName: "line17"
          }, {
            award: "QUADRA_MU",
            money: 500,
            lineName: "line19"
          } ]
        },
        ref: 1640243,
        result: 1,
        matrix: "8,7,7,6,8,7,7,6,6,7,6,6,6,5,6",
        linesWin: "1,3,4,5,7,9,10,11,13,14,15,17,19",
        haiSao: "",
        prize: 4100,
        currentMoney: 40138400
      }, {
        awardsDetail: {
          object: [ {
            award: "TRIPLE_ONG_NHOM",
            money: 100,
            lineName: "line3"
          }, {
            award: "TRIPLE_GIAY",
            money: 100,
            lineName: "line5"
          }, {
            award: "TRIPLE_SUNG_DOI",
            money: 800,
            lineName: "line6"
          }, {
            award: "TRIPLE_ONG_NHOM",
            money: 100,
            lineName: "line7"
          }, {
            award: "TRIPLE_SUNG_DOI",
            money: 800,
            lineName: "line8"
          }, {
            award: "TRIPLE_ONG_NHOM",
            money: 100,
            lineName: "line8"
          }, {
            award: "TRIPLE_GIAY",
            money: 100,
            lineName: "line10"
          }, {
            award: "TRIPLE_SUNG_DOI",
            money: 800,
            lineName: "line13"
          }, {
            award: "TRIPLE_AO_GIAP",
            money: 700,
            lineName: "line13"
          }, {
            award: "TRIPLE_GIAY",
            money: 100,
            lineName: "line13"
          }, {
            award: "TRIPLE_ONG_NHOM",
            money: 100,
            lineName: "line14"
          }, {
            award: "TRIPLE_SUNG_DOI",
            money: 800,
            lineName: "line16"
          }, {
            award: "TRIPLE_ONG_NHOM",
            money: 100,
            lineName: "line17"
          }, {
            award: "QUADRA_GIAY",
            money: 300,
            lineName: "line18"
          }, {
            award: "TRIPLE_ONG_NHOM",
            money: 100,
            lineName: "line18"
          }, {
            award: "TRIPLE_SUNG_DOI",
            money: 800,
            lineName: "line19"
          }, {
            award: "TRIPLE_ONG_NHOM",
            money: 100,
            lineName: "line20"
          } ]
        },
        ref: 1640255,
        result: 1,
        matrix: "3,7,7,4,3,1,6,3,4,8,6,1,8,7,7",
        linesWin: "3,5,6,7,8,8,10,13,13,13,14,16,17,18,18,19,20",
        haiSao: "",
        prize: 6e3,
        currentMoney: 40136300
      }, {
        awardsDetail: {
          object: [ {
            award: "TRIPLE_KIEM_NHAT",
            money: 1500,
            lineName: "line2"
          }, {
            award: "QUADRA_GIAY",
            money: 300,
            lineName: "line2"
          }, {
            award: "TRIPLE_GIAY",
            money: 100,
            lineName: "line4"
          }, {
            award: "TRIPLE_KIEM_NHAT",
            money: 1500,
            lineName: "line6"
          }, {
            award: "TRIPLE_GIAY",
            money: 100,
            lineName: "line6"
          }, {
            award: "TRIPLE_KIEM_NHAT",
            money: 1500,
            lineName: "line8"
          }, {
            award: "TRIPLE_ONG_NHOM",
            money: 100,
            lineName: "line8"
          }, {
            award: "TRIPLE_MU",
            money: 200,
            lineName: "line8"
          }, {
            award: "TRIPLE_GIAY",
            money: 100,
            lineName: "line9"
          }, {
            award: "QUADRA_GIAY",
            money: 300,
            lineName: "line10"
          }, {
            award: "TRIPLE_GIAY",
            money: 100,
            lineName: "line13"
          }, {
            award: "TRIPLE_GIAY",
            money: 100,
            lineName: "line14"
          }, {
            award: "TRIPLE_KIEM_NHAT",
            money: 1500,
            lineName: "line16"
          }, {
            award: "PENTA_GIAY",
            money: 800,
            lineName: "line17"
          } ]
        },
        ref: 1640275,
        result: 2,
        matrix: "2,8,1,8,1,8,6,2,7,8,3,7,4,6,8",
        linesWin: "2,2,4,6,6,8,8,8,9,10,13,14,16,17",
        haiSao: "",
        prize: 8200,
        currentMoney: 40123900
      }, {
        awardsDetail: {
          object: [ {
            award: "TRIPLE_SUNG_DOI",
            money: 800,
            lineName: "line1"
          }, {
            award: "TRIPLE_SUNG_DOI",
            money: 800,
            lineName: "line4"
          }, {
            award: "QUADRA_SUNG_DOI",
            money: 1500,
            lineName: "line5"
          }, {
            award: "QUADRA_SUNG_DOI",
            money: 1500,
            lineName: "line10"
          }, {
            award: "QUADRA_SUNG_DOI",
            money: 1500,
            lineName: "line13"
          }, {
            award: "TRIPLE_AO_GIAP",
            money: 700,
            lineName: "line15"
          }, {
            award: "TRIPLE_SUNG_DOI",
            money: 800,
            lineName: "line17"
          }, {
            award: "QUADRA_SUNG_DOI",
            money: 1500,
            lineName: "line18"
          } ]
        },
        ref: 1640293,
        result: 2,
        matrix: "8,8,7,3,5,3,4,4,3,3,5,3,3,5,4",
        linesWin: "1,4,5,10,13,15,17,18",
        haiSao: "",
        prize: 9100,
        currentMoney: 40109300
      }, {
        awardsDetail: {
          object: [ {
            award: "TRIPLE_LUU_DAN",
            money: 300,
            lineName: "line1"
          }, {
            award: "TRIPLE_KIEM_NHAT",
            money: 1500,
            lineName: "line5"
          }, {
            award: "TRIPLE_KIEM_NHAT",
            money: 1500,
            lineName: "line10"
          }, {
            award: "TRIPLE_KIEM_NHAT",
            money: 1500,
            lineName: "line14"
          }, {
            award: "TRIPLE_LUU_DAN",
            money: 300,
            lineName: "line14"
          }, {
            award: "QUADRA_KIEM_NHAT",
            money: 4e3,
            lineName: "line18"
          } ]
        },
        ref: 1640294,
        result: 5,
        matrix: "3,5,0,8,3,2,8,5,5,1,7,4,2,2,4",
        linesWin: "1,5,10,14,14,18",
        haiSao: "1,1,1,1,1,1,1,1,1,1",
        prize: 9100,
        currentMoney: 40116400
      }, {
        awardsDetail: {
          object: [ {
            award: "TRIPLE_LUU_DAN",
            money: 300,
            lineName: "line1"
          }, {
            award: "TRIPLE_KIEM_NHAT",
            money: 1500,
            lineName: "line5"
          }, {
            award: "TRIPLE_KIEM_NHAT",
            money: 1500,
            lineName: "line10"
          }, {
            award: "TRIPLE_KIEM_NHAT",
            money: 1500,
            lineName: "line14"
          }, {
            award: "TRIPLE_LUU_DAN",
            money: 300,
            lineName: "line14"
          }, {
            award: "QUADRA_KIEM_NHAT",
            money: 4e3,
            lineName: "line18"
          } ]
        },
        ref: 1640294,
        result: 5,
        matrix: "3,5,0,8,3,2,8,5,5,1,7,4,2,2,4",
        linesWin: "1,5,10,14,14,18",
        haiSao: "1,1,1,1,1,1,1,1,1,1",
        prize: 9100,
        currentMoney: 40116400
      }, {
        awardsDetail: {
          object: [ {
            award: "TRIPLE_LUU_DAN",
            money: 300,
            lineName: "line1"
          }, {
            award: "TRIPLE_KIEM_NHAT",
            money: 1500,
            lineName: "line5"
          }, {
            award: "TRIPLE_KIEM_NHAT",
            money: 1500,
            lineName: "line10"
          }, {
            award: "TRIPLE_KIEM_NHAT",
            money: 1500,
            lineName: "line14"
          }, {
            award: "TRIPLE_LUU_DAN",
            money: 300,
            lineName: "line14"
          }, {
            award: "QUADRA_KIEM_NHAT",
            money: 4e3,
            lineName: "line18"
          } ]
        },
        ref: 1640294,
        result: 5,
        matrix: "3,5,0,8,3,2,8,5,5,1,7,4,2,2,4",
        linesWin: "1,5,10,14,14,18",
        haiSao: "1,1,1,1,1,1,1,1,1,1",
        prize: 9100,
        currentMoney: 40116400
      }, {
        awardsDetail: {
          object: [ {
            award: "QUADRA_MU",
            money: 500,
            lineName: "line2"
          }, {
            award: "TRIPLE_SUNG_DOI",
            money: 800,
            lineName: "line2"
          }, {
            award: "TRIPLE_MU",
            money: 200,
            lineName: "line6"
          }, {
            award: "TRIPLE_LUU_DAN",
            money: 300,
            lineName: "line6"
          }, {
            award: "TRIPLE_SUNG_DOI",
            money: 800,
            lineName: "line6"
          }, {
            award: "TRIPLE_LUU_DAN",
            money: 300,
            lineName: "line7"
          }, {
            award: "TRIPLE_AO_GIAP",
            money: 700,
            lineName: "line8"
          }, {
            award: "TRIPLE_MU",
            money: 200,
            lineName: "line8"
          }, {
            award: "TRIPLE_LUU_DAN",
            money: 300,
            lineName: "line8"
          }, {
            award: "TRIPLE_SUNG_DOI",
            money: 800,
            lineName: "line9"
          }, {
            award: "TRIPLE_MU",
            money: 200,
            lineName: "line12"
          }, {
            award: "TRIPLE_SUNG_DOI",
            money: 800,
            lineName: "line12"
          }, {
            award: "TRIPLE_ONG_NHOM",
            money: 100,
            lineName: "line12"
          }, {
            award: "TRIPLE_LUU_DAN",
            money: 300,
            lineName: "line14"
          }, {
            award: "TRIPLE_MU",
            money: 200,
            lineName: "line16"
          }, {
            award: "TRIPLE_LUU_DAN",
            money: 300,
            lineName: "line16"
          }, {
            award: "TRIPLE_ONG_NHOM",
            money: 100,
            lineName: "line16"
          }, {
            award: "TRIPLE_SUNG_DOI",
            money: 800,
            lineName: "line19"
          }, {
            award: "QUADRA_LUU_DAN",
            money: 600,
            lineName: "line20"
          } ]
        },
        ref: 1640305,
        result: 2,
        matrix: "1,6,6,3,1,5,6,5,7,8,3,4,3,5,5",
        linesWin: "2,2,6,6,6,7,8,8,8,9,12,12,12,14,16,16,16,19,20",
        haiSao: "",
        prize: 8300,
        currentMoney: 40110300
      }, {
        awardsDetail: {
          object: [ {
            award: "TRIPLE_AO_GIAP",
            money: 700,
            lineName: "line1"
          }, {
            award: "TRIPLE_GIAY",
            money: 100,
            lineName: "line6"
          }, {
            award: "TRIPLE_KIEM_NHAT",
            money: 1500,
            lineName: "line7"
          }, {
            award: "TRIPLE_GIAY",
            money: 100,
            lineName: "line12"
          }, {
            award: "TRIPLE_KIEM_NHAT",
            money: 1500,
            lineName: "line13"
          }, {
            award: "TRIPLE_LUU_DAN",
            money: 300,
            lineName: "line14"
          }, {
            award: "QUADRA_GIAY",
            money: 300,
            lineName: "line16"
          }, {
            award: "TRIPLE_KIEM_NHAT",
            money: 1500,
            lineName: "line19"
          }, {
            award: "TRIPLE_LUU_DAN",
            money: 300,
            lineName: "line20"
          } ]
        },
        ref: 1640324,
        result: 1,
        matrix: "8,5,6,3,8,2,4,1,8,4,2,2,6,5,3",
        linesWin: "1,6,7,12,13,14,16,19,20",
        haiSao: "",
        prize: 6300,
        currentMoney: 40086500
      }, {
        awardsDetail: {
          object: [ {
            award: "TRIPLE_ONG_NHOM",
            money: 100,
            lineName: "line4"
          }, {
            award: "TRIPLE_SUNG_DOI",
            money: 800,
            lineName: "line6"
          }, {
            award: "TRIPLE_SUNG_DOI",
            money: 800,
            lineName: "line9"
          }, {
            award: "TRIPLE_SUNG_DOI",
            money: 800,
            lineName: "line10"
          }, {
            award: "QUADRA_ONG_NHOM",
            money: 400,
            lineName: "line11"
          }, {
            award: "TRIPLE_ONG_NHOM",
            money: 100,
            lineName: "line12"
          }, {
            award: "TRIPLE_SUNG_DOI",
            money: 800,
            lineName: "line14"
          }, {
            award: "TRIPLE_ONG_NHOM",
            money: 100,
            lineName: "line15"
          }, {
            award: "TRIPLE_ONG_NHOM",
            money: 100,
            lineName: "line16"
          }, {
            award: "TRIPLE_SUNG_DOI",
            money: 800,
            lineName: "line20"
          } ]
        },
        ref: 1640332,
        result: 1,
        matrix: "6,3,7,3,7,6,7,3,7,8,2,5,3,3,7",
        linesWin: "4,6,9,10,11,12,14,15,16,20",
        haiSao: "",
        prize: 4800,
        currentMoney: 40080900
      }, {
        awardsDetail: {
          object: [ {
            award: "TRIPLE_MU",
            money: 200,
            lineName: "line1"
          }, {
            award: "TRIPLE_AO_GIAP",
            money: 700,
            lineName: "line1"
          }, {
            award: "TRIPLE_LUU_DAN",
            money: 300,
            lineName: "line1"
          }, {
            award: "TRIPLE_LUU_DAN",
            money: 300,
            lineName: "line2"
          }, {
            award: "TRIPLE_MU",
            money: 200,
            lineName: "line3"
          }, {
            award: "TRIPLE_MU",
            money: 200,
            lineName: "line4"
          }, {
            award: "TRIPLE_MU",
            money: 200,
            lineName: "line5"
          }, {
            award: "QUADRA_LUU_DAN",
            money: 600,
            lineName: "line6"
          }, {
            award: "TRIPLE_MU",
            money: 200,
            lineName: "line7"
          }, {
            award: "TRIPLE_MU",
            money: 200,
            lineName: "line10"
          }, {
            award: "TRIPLE_LUU_DAN",
            money: 300,
            lineName: "line12"
          }, {
            award: "TRIPLE_MU",
            money: 200,
            lineName: "line13"
          }, {
            award: "TRIPLE_AO_GIAP",
            money: 700,
            lineName: "line13"
          }, {
            award: "TRIPLE_LUU_DAN",
            money: 300,
            lineName: "line13"
          }, {
            award: "QUADRA_MU",
            money: 500,
            lineName: "line14"
          }, {
            award: "TRIPLE_ONG_NHOM",
            money: 100,
            lineName: "line14"
          }, {
            award: "QUADRA_LUU_DAN",
            money: 600,
            lineName: "line16"
          }, {
            award: "TRIPLE_MU",
            money: 200,
            lineName: "line17"
          }, {
            award: "QUADRA_MU",
            money: 500,
            lineName: "line18"
          }, {
            award: "TRIPLE_LUU_DAN",
            money: 300,
            lineName: "line19"
          } ]
        },
        ref: 1640358,
        result: 1,
        matrix: "5,7,6,5,5,6,4,1,5,1,6,4,6,6,0",
        linesWin: "1,1,1,2,3,4,5,6,7,10,12,13,13,13,14,14,16,17,18,19",
        haiSao: "",
        prize: 6800,
        currentMoney: 40058100
      }, {
        awardsDetail: {
          object: [ {
            award: "TRIPLE_GIAY",
            money: 100,
            lineName: "line1"
          }, {
            award: "TRIPLE_AO_GIAP",
            money: 700,
            lineName: "line2"
          }, {
            award: "TRIPLE_GIAY",
            money: 100,
            lineName: "line4"
          }, {
            award: "TRIPLE_GIAY",
            money: 100,
            lineName: "line5"
          }, {
            award: "TRIPLE_SUNG_DOI",
            money: 800,
            lineName: "line6"
          }, {
            award: "TRIPLE_AO_GIAP",
            money: 700,
            lineName: "line8"
          }, {
            award: "TRIPLE_SUNG_DOI",
            money: 800,
            lineName: "line9"
          }, {
            award: "TRIPLE_SUNG_DOI",
            money: 800,
            lineName: "line10"
          }, {
            award: "TRIPLE_GIAY",
            money: 100,
            lineName: "line11"
          }, {
            award: "TRIPLE_GIAY",
            money: 100,
            lineName: "line13"
          }, {
            award: "TRIPLE_GIAY",
            money: 100,
            lineName: "line15"
          } ]
        },
        ref: 1640386,
        result: 1,
        matrix: "4,3,4,1,5,8,8,3,8,6,4,8,3,4,8",
        linesWin: "1,2,4,5,6,8,9,10,11,13,15",
        haiSao: "",
        prize: 4400,
        currentMoney: 40026900
      }, {
        awardsDetail: {
          object: [ {
            award: "TRIPLE_AO_GIAP",
            money: 700,
            lineName: "line2"
          }, {
            award: "TRIPLE_SUNG_DOI",
            money: 800,
            lineName: "line3"
          }, {
            award: "TRIPLE_AO_GIAP",
            money: 700,
            lineName: "line4"
          }, {
            award: "QUADRA_SUNG_DOI",
            money: 1500,
            lineName: "line9"
          }, {
            award: "TRIPLE_AO_GIAP",
            money: 700,
            lineName: "line10"
          }, {
            award: "TRIPLE_SUNG_DOI",
            money: 800,
            lineName: "line10"
          }, {
            award: "TRIPLE_ONG_NHOM",
            money: 100,
            lineName: "line13"
          }, {
            award: "QUADRA_AO_GIAP",
            money: 1e3,
            lineName: "line17"
          }, {
            award: "TRIPLE_ONG_NHOM",
            money: 100,
            lineName: "line19"
          } ]
        },
        ref: 1640394,
        result: 1,
        matrix: "8,4,4,1,5,4,4,7,2,3,3,7,3,6,3",
        linesWin: "2,3,4,9,10,10,13,17,19",
        haiSao: "",
        prize: 6400,
        currentMoney: 40021600
      }, {
        awardsDetail: {
          object: [ {
            award: "TRIPLE_SUNG_DOI",
            money: 800,
            lineName: "line2"
          }, {
            award: "TRIPLE_GIAY",
            money: 100,
            lineName: "line3"
          }, {
            award: "TRIPLE_SUNG_DOI",
            money: 800,
            lineName: "line8"
          }, {
            award: "TRIPLE_GIAY",
            money: 100,
            lineName: "line9"
          }, {
            award: "TRIPLE_GIAY",
            money: 100,
            lineName: "line10"
          }, {
            award: "QUADRA_SUNG_DOI",
            money: 1500,
            lineName: "line12"
          }, {
            award: "TRIPLE_SUNG_DOI",
            money: 800,
            lineName: "line16"
          }, {
            award: "TRIPLE_GIAY",
            money: 100,
            lineName: "line18"
          } ]
        },
        ref: 1640398,
        result: 1,
        matrix: "3,5,3,8,3,6,3,7,5,8,8,4,1,8,7",
        linesWin: "2,3,8,9,10,12,16,18",
        haiSao: "",
        prize: 4300,
        currentMoney: 40019700
      }, {
        awardsDetail: {
          object: [ {
            award: "QUADRA_MU",
            money: 500,
            lineName: "line1"
          }, {
            award: "TRIPLE_MU",
            money: 200,
            lineName: "line2"
          }, {
            award: "TRIPLE_MU",
            money: 200,
            lineName: "line4"
          }, {
            award: "TRIPLE_MU",
            money: 200,
            lineName: "line5"
          }, {
            award: "QUADRA_MU",
            money: 500,
            lineName: "line6"
          }, {
            award: "TRIPLE_GIAY",
            money: 100,
            lineName: "line8"
          }, {
            award: "TRIPLE_MU",
            money: 200,
            lineName: "line8"
          }, {
            award: "TRIPLE_MU",
            money: 200,
            lineName: "line10"
          }, {
            award: "TRIPLE_MU",
            money: 200,
            lineName: "line12"
          }, {
            award: "QUADRA_MU",
            money: 500,
            lineName: "line13"
          }, {
            award: "QUADRA_MU",
            money: 500,
            lineName: "line14"
          }, {
            award: "QUADRA_MU",
            money: 500,
            lineName: "line16"
          }, {
            award: "TRIPLE_MU",
            money: 200,
            lineName: "line17"
          }, {
            award: "TRIPLE_MU",
            money: 200,
            lineName: "line18"
          }, {
            award: "TRIPLE_MU",
            money: 200,
            lineName: "line19"
          }, {
            award: "TRIPLE_MU",
            money: 200,
            lineName: "line20"
          } ]
        },
        ref: 1640424,
        result: 1,
        matrix: "1,5,8,6,6,6,8,6,6,6,7,8,2,6,7",
        linesWin: "1,2,4,5,6,8,8,10,12,13,14,16,17,18,19,20",
        haiSao: "",
        prize: 4600,
        currentMoney: 39997900
      }, {
        awardsDetail: {
          object: [ {
            award: "TRIPLE_KIEM_NHAT",
            money: 1500,
            lineName: "line1"
          }, {
            award: "TRIPLE_KIEM_NHAT",
            money: 1500,
            lineName: "line6"
          }, {
            award: "TRIPLE_KIEM_NHAT",
            money: 1500,
            lineName: "line8"
          }, {
            award: "TRIPLE_KIEM_NHAT",
            money: 1500,
            lineName: "line12"
          }, {
            award: "TRIPLE_KIEM_NHAT",
            money: 1500,
            lineName: "line13"
          }, {
            award: "QUADRA_KIEM_NHAT",
            money: 5700,
            lineName: "line16"
          }, {
            award: "TRIPLE_KIEM_NHAT",
            money: 1500,
            lineName: "line19"
          } ]
        },
        ref: 1640425,
        result: 5,
        matrix: "2,8,8,0,2,2,4,2,1,7,7,2,8,7,5",
        linesWin: "1,6,8,12,13,16,19",
        haiSao: "2,3,1,1,1,1,1,1,1,1",
        prize: 14700,
        currentMoney: 40010600
      }, {
        awardsDetail: {
          object: [ {
            award: "TRIPLE_KIEM_NHAT",
            money: 1500,
            lineName: "line1"
          }, {
            award: "TRIPLE_KIEM_NHAT",
            money: 1500,
            lineName: "line6"
          }, {
            award: "TRIPLE_KIEM_NHAT",
            money: 1500,
            lineName: "line8"
          }, {
            award: "TRIPLE_KIEM_NHAT",
            money: 1500,
            lineName: "line12"
          }, {
            award: "TRIPLE_KIEM_NHAT",
            money: 1500,
            lineName: "line13"
          }, {
            award: "QUADRA_KIEM_NHAT",
            money: 5700,
            lineName: "line16"
          }, {
            award: "TRIPLE_KIEM_NHAT",
            money: 1500,
            lineName: "line19"
          } ]
        },
        ref: 1640425,
        result: 5,
        matrix: "2,8,8,0,2,2,4,2,1,7,7,2,8,7,5",
        linesWin: "1,6,8,12,13,16,19",
        haiSao: "2,3,1,1,1,1,1,1,1,1",
        prize: 14700,
        currentMoney: 40010600
      }, {
        awardsDetail: {
          object: [ {
            award: "TRIPLE_GIAY",
            money: 100,
            lineName: "line2"
          }, {
            award: "TRIPLE_KIEM_NHAT",
            money: 1500,
            lineName: "line3"
          }, {
            award: "TRIPLE_GIAY",
            money: 100,
            lineName: "line5"
          }, {
            award: "TRIPLE_GIAY",
            money: 100,
            lineName: "line6"
          }, {
            award: "QUADRA_KIEM_NHAT",
            money: 10900,
            lineName: "line7"
          }, {
            award: "TRIPLE_GIAY",
            money: 100,
            lineName: "line8"
          }, {
            award: "PENTA_GIAY",
            money: 800,
            lineName: "line12"
          }, {
            award: "TRIPLE_MU",
            money: 200,
            lineName: "line13"
          }, {
            award: "QUADRA_GIAY",
            money: 300,
            lineName: "line16"
          }, {
            award: "TRIPLE_KIEM_NHAT",
            money: 1500,
            lineName: "line20"
          } ]
        },
        ref: 1640426,
        result: 5,
        matrix: "8,8,5,6,8,6,8,2,8,7,5,1,8,2,2",
        linesWin: "2,3,5,6,7,8,12,13,16,20",
        haiSao: "1,1,1,3,0,1,2,3,1,1,1",
        prize: 15600,
        currentMoney: 40024200
      }, {
        awardsDetail: {
          object: [ {
            award: "TRIPLE_GIAY",
            money: 100,
            lineName: "line2"
          }, {
            award: "TRIPLE_KIEM_NHAT",
            money: 1500,
            lineName: "line3"
          }, {
            award: "TRIPLE_GIAY",
            money: 100,
            lineName: "line5"
          }, {
            award: "TRIPLE_GIAY",
            money: 100,
            lineName: "line6"
          }, {
            award: "QUADRA_KIEM_NHAT",
            money: 10900,
            lineName: "line7"
          }, {
            award: "TRIPLE_GIAY",
            money: 100,
            lineName: "line8"
          }, {
            award: "PENTA_GIAY",
            money: 800,
            lineName: "line12"
          }, {
            award: "TRIPLE_MU",
            money: 200,
            lineName: "line13"
          }, {
            award: "QUADRA_GIAY",
            money: 300,
            lineName: "line16"
          }, {
            award: "TRIPLE_KIEM_NHAT",
            money: 1500,
            lineName: "line20"
          } ]
        },
        ref: 1640426,
        result: 5,
        matrix: "8,8,5,6,8,6,8,2,8,7,5,1,8,2,2",
        linesWin: "2,3,5,6,7,8,12,13,16,20",
        haiSao: "1,1,1,3,0,1,2,3,1,1,1",
        prize: 15600,
        currentMoney: 40024200
      }, {
        awardsDetail: {
          object: [ {
            award: "TRIPLE_LUU_DAN",
            money: 300,
            lineName: "line1"
          }, {
            award: "TRIPLE_GIAY",
            money: 100,
            lineName: "line3"
          }, {
            award: "QUADRA_LUU_DAN",
            money: 600,
            lineName: "line3"
          }, {
            award: "TRIPLE_LUU_DAN",
            money: 300,
            lineName: "line4"
          }, {
            award: "TRIPLE_LUU_DAN",
            money: 300,
            lineName: "line5"
          }, {
            award: "TRIPLE_GIAY",
            money: 100,
            lineName: "line7"
          }, {
            award: "QUADRA_LUU_DAN",
            money: 600,
            lineName: "line7"
          }, {
            award: "TRIPLE_LUU_DAN",
            money: 300,
            lineName: "line8"
          }, {
            award: "QUADRA_LUU_DAN",
            money: 600,
            lineName: "line11"
          }, {
            award: "TRIPLE_LUU_DAN",
            money: 300,
            lineName: "line12"
          }, {
            award: "QUADRA_LUU_DAN",
            money: 600,
            lineName: "line15"
          }, {
            award: "TRIPLE_LUU_DAN",
            money: 300,
            lineName: "line16"
          }, {
            award: "TRIPLE_LUU_DAN",
            money: 300,
            lineName: "line18"
          }, {
            award: "TRIPLE_GIAY",
            money: 100,
            lineName: "line19"
          }, {
            award: "TRIPLE_LUU_DAN",
            money: 300,
            lineName: "line20"
          } ]
        },
        ref: 1640442,
        result: 1,
        matrix: "4,0,5,7,8,3,5,5,5,6,8,1,5,5,1",
        linesWin: "1,3,3,4,5,7,7,8,11,12,15,16,18,19,20",
        haiSao: "",
        prize: 5100,
        currentMoney: 40013900
      }, {
        awardsDetail: {
          object: [ {
            award: "TRIPLE_MU",
            money: 200,
            lineName: "line3"
          }, {
            award: "TRIPLE_ONG_NHOM",
            money: 100,
            lineName: "line5"
          }, {
            award: "TRIPLE_GIAY",
            money: 100,
            lineName: "line5"
          }, {
            award: "TRIPLE_AO_GIAP",
            money: 700,
            lineName: "line5"
          }, {
            award: "TRIPLE_SUNG_DOI",
            money: 800,
            lineName: "line6"
          }, {
            award: "TRIPLE_SUNG_DOI",
            money: 800,
            lineName: "line9"
          }, {
            award: "TRIPLE_KIEM_NHAT",
            money: 1500,
            lineName: "line10"
          }, {
            award: "TRIPLE_SUNG_DOI",
            money: 800,
            lineName: "line10"
          }, {
            award: "TRIPLE_AO_GIAP",
            money: 700,
            lineName: "line10"
          }, {
            award: "TRIPLE_GIAY",
            money: 100,
            lineName: "line12"
          }, {
            award: "TRIPLE_SUNG_DOI",
            money: 800,
            lineName: "line13"
          }, {
            award: "TRIPLE_KIEM_NHAT",
            money: 1500,
            lineName: "line17"
          }, {
            award: "QUADRA_MU",
            money: 500,
            lineName: "line18"
          }, {
            award: "TRIPLE_AO_GIAP",
            money: 700,
            lineName: "line18"
          }, {
            award: "TRIPLE_SUNG_DOI",
            money: 800,
            lineName: "line20"
          } ]
        },
        ref: 1640478,
        result: 2,
        matrix: "3,2,2,3,8,1,7,3,8,4,4,6,1,6,3",
        linesWin: "3,5,5,5,6,9,10,10,10,12,13,17,18,18,20",
        haiSao: "",
        prize: 10100,
        currentMoney: 39982800
      }, {
        awardsDetail: {
          object: [ {
            award: "TRIPLE_SUNG_DOI",
            money: 800,
            lineName: "line3"
          }, {
            award: "TRIPLE_KIEM_NHAT",
            money: 1500,
            lineName: "line4"
          }, {
            award: "TRIPLE_ONG_NHOM",
            money: 100,
            lineName: "line6"
          }, {
            award: "TRIPLE_SUNG_DOI",
            money: 800,
            lineName: "line7"
          }, {
            award: "TRIPLE_LUU_DAN",
            money: 300,
            lineName: "line10"
          }, {
            award: "TRIPLE_ONG_NHOM",
            money: 100,
            lineName: "line12"
          }, {
            award: "TRIPLE_LUU_DAN",
            money: 300,
            lineName: "line13"
          }, {
            award: "TRIPLE_SUNG_DOI",
            money: 800,
            lineName: "line14"
          }, {
            award: "TRIPLE_ONG_NHOM",
            money: 100,
            lineName: "line16"
          }, {
            award: "TRIPLE_LUU_DAN",
            money: 300,
            lineName: "line17"
          }, {
            award: "TRIPLE_SUNG_DOI",
            money: 800,
            lineName: "line18"
          }, {
            award: "TRIPLE_SUNG_DOI",
            money: 800,
            lineName: "line20"
          } ]
        },
        ref: 1640485,
        result: 1,
        matrix: "7,3,2,5,7,1,6,7,2,5,4,3,7,3,3",
        linesWin: "3,4,6,7,10,12,13,14,16,17,18,20",
        haiSao: "",
        prize: 6700,
        currentMoney: 39979900
      }, {
        awardsDetail: {
          object: [ {
            award: "TRIPLE_SUNG_DOI",
            money: 800,
            lineName: "line3"
          }, {
            award: "TRIPLE_ONG_NHOM",
            money: 100,
            lineName: "line7"
          }, {
            award: "TRIPLE_SUNG_DOI",
            money: 800,
            lineName: "line7"
          }, {
            award: "TRIPLE_SUNG_DOI",
            money: 800,
            lineName: "line8"
          }, {
            award: "TRIPLE_LUU_DAN",
            money: 300,
            lineName: "line9"
          }, {
            award: "TRIPLE_LUU_DAN",
            money: 300,
            lineName: "line10"
          }, {
            award: "TRIPLE_ONG_NHOM",
            money: 100,
            lineName: "line11"
          }, {
            award: "QUADRA_ONG_NHOM",
            money: 400,
            lineName: "line15"
          }, {
            award: "QUADRA_SUNG_DOI",
            money: 1500,
            lineName: "line20"
          } ]
        },
        ref: 1640504,
        result: 1,
        matrix: "3,3,4,5,6,8,7,7,2,5,7,3,5,3,1",
        linesWin: "3,7,7,8,9,10,11,15,20",
        haiSao: "",
        prize: 5100,
        currentMoney: 39966200
      }, {
        awardsDetail: {
          object: [ {
            award: "TRIPLE_ONG_NHOM",
            money: 100,
            lineName: "line2"
          }, {
            award: "TRIPLE_MU",
            money: 200,
            lineName: "line2"
          }, {
            award: "TRIPLE_AO_GIAP",
            money: 700,
            lineName: "line2"
          }, {
            award: "TRIPLE_ONG_NHOM",
            money: 100,
            lineName: "line6"
          }, {
            award: "TRIPLE_GIAY",
            money: 100,
            lineName: "line6"
          }, {
            award: "TRIPLE_AO_GIAP",
            money: 700,
            lineName: "line6"
          }, {
            award: "TRIPLE_GIAY",
            money: 100,
            lineName: "line7"
          }, {
            award: "QUADRA_MU",
            money: 500,
            lineName: "line9"
          }, {
            award: "TRIPLE_THAY_THE",
            money: 2500,
            lineName: "line9"
          }, {
            award: "QUADRA_LUU_DAN",
            money: 600,
            lineName: "line9"
          }, {
            award: "TRIPLE_AO_GIAP",
            money: 700,
            lineName: "line10"
          }, {
            award: "TRIPLE_LUU_DAN",
            money: 300,
            lineName: "line10"
          }, {
            award: "TRIPLE_MU",
            money: 200,
            lineName: "line10"
          }, {
            award: "TRIPLE_MU",
            money: 200,
            lineName: "line11"
          }, {
            award: "TRIPLE_AO_GIAP",
            money: 700,
            lineName: "line13"
          }, {
            award: "TRIPLE_GIAY",
            money: 100,
            lineName: "line14"
          }, {
            award: "TRIPLE_AO_GIAP",
            money: 700,
            lineName: "line17"
          }, {
            award: "QUADRA_MU",
            money: 500,
            lineName: "line17"
          }, {
            award: "TRIPLE_AO_GIAP",
            money: 700,
            lineName: "line19"
          }, {
            award: "TRIPLE_ONG_NHOM",
            money: 100,
            lineName: "line20"
          }, {
            award: "QUADRA_GIAY",
            money: 300,
            lineName: "line20"
          } ]
        },
        ref: 1640520,
        result: 2,
        matrix: "7,1,6,1,4,4,3,8,2,6,6,4,5,8,1",
        linesWin: "2,2,2,6,6,6,7,9,9,9,10,10,10,11,13,14,17,17,19,20,20",
        haiSao: "",
        prize: 10100,
        currentMoney: 39953400
      }, {
        awardsDetail: {
          object: [ {
            award: "TRIPLE_AO_GIAP",
            money: 700,
            lineName: "line1"
          }, {
            award: "QUADRA_AO_GIAP",
            money: 1e3,
            lineName: "line4"
          }, {
            award: "TRIPLE_AO_GIAP",
            money: 700,
            lineName: "line5"
          }, {
            award: "TRIPLE_AO_GIAP",
            money: 700,
            lineName: "line10"
          }, {
            award: "QUADRA_AO_GIAP",
            money: 1e3,
            lineName: "line13"
          }, {
            award: "QUADRA_AO_GIAP",
            money: 1e3,
            lineName: "line17"
          }, {
            award: "TRIPLE_AO_GIAP",
            money: 700,
            lineName: "line18"
          } ]
        },
        ref: 1640524,
        result: 1,
        matrix: "7,3,4,4,5,4,4,8,6,4,5,4,8,3,7",
        linesWin: "1,4,5,10,13,17,18",
        haiSao: "",
        prize: 5800,
        currentMoney: 39953500
      }, {
        awardsDetail: {
          object: [ {
            award: "TRIPLE_AO_GIAP",
            money: 700,
            lineName: "line3"
          }, {
            award: "TRIPLE_ONG_NHOM",
            money: 100,
            lineName: "line6"
          }, {
            award: "TRIPLE_AO_GIAP",
            money: 700,
            lineName: "line7"
          }, {
            award: "QUADRA_KIEM_NHAT",
            money: 5600,
            lineName: "line11"
          }, {
            award: "TRIPLE_KIEM_NHAT",
            money: 1500,
            lineName: "line15"
          }, {
            award: "TRIPLE_ONG_NHOM",
            money: 100,
            lineName: "line16"
          }, {
            award: "TRIPLE_ONG_NHOM",
            money: 100,
            lineName: "line19"
          } ]
        },
        ref: 1640528,
        result: 5,
        matrix: "7,4,2,0,7,5,2,7,3,8,1,4,8,4,2",
        linesWin: "3,6,7,11,15,16,19",
        haiSao: "1,1,1,1,1,1,1,1,1,4",
        prize: 8800,
        currentMoney: 39955600
      }, {
        awardsDetail: {
          object: [ {
            award: "TRIPLE_AO_GIAP",
            money: 700,
            lineName: "line3"
          }, {
            award: "TRIPLE_ONG_NHOM",
            money: 100,
            lineName: "line6"
          }, {
            award: "TRIPLE_AO_GIAP",
            money: 700,
            lineName: "line7"
          }, {
            award: "QUADRA_KIEM_NHAT",
            money: 5600,
            lineName: "line11"
          }, {
            award: "TRIPLE_KIEM_NHAT",
            money: 1500,
            lineName: "line15"
          }, {
            award: "TRIPLE_ONG_NHOM",
            money: 100,
            lineName: "line16"
          }, {
            award: "TRIPLE_ONG_NHOM",
            money: 100,
            lineName: "line19"
          } ]
        },
        ref: 1640528,
        result: 5,
        matrix: "7,4,2,0,7,5,2,7,3,8,1,4,8,4,2",
        linesWin: "3,6,7,11,15,16,19",
        haiSao: "1,1,1,1,1,1,1,1,1,4",
        prize: 8800,
        currentMoney: 39955600
      } ];
      SlotNuDiepVien.TrialResults = TrialResults;
    })(SlotNuDiepVien || (SlotNuDiepVien = {}));
    exports.default = SlotNuDiepVien.TrialResults;
    cc._RF.pop();
  }, {} ]
}, {}, [ "SlotNuDiepVien.Cmd", "SlotNuDiepVien.Controller", "SlotNuDiepVien.PopupBonus", "SlotNuDiepVien.PopupGuide", "SlotNuDiepVien.PopupHistory", "SlotNuDiepVien.PopupJackpotHistory", "SlotNuDiepVien.PopupSelectLine", "SlotNuDiepVien.SoundControler", "SlotNuDiepVien.SpinControler", "SlotNuDiepVien.TrialResults" ]);