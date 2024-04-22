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
  "SlotVuongQuocVin.Bonus": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d2dfcEpOy9DJZ5eHw5oFFon", "SlotVuongQuocVin.Bonus");
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
        this.onFinished = null;
        this.dataBonus = [];
        this.factors = [];
        this.totalCoin = 0;
        this.cbAutoClose = null;
      }
      onEnable() {
        this.resetStage();
        for (let i = 0; i < this.itemSpecial.childrenCount; i++) {
          let node = this.itemSpecial.children[i];
          node.getChildByName("btn").getComponent(cc.Button).interactable = true;
          node.getChildByName("icon").active = false;
          node.getChildByName("btn").getComponent(cc.Button).node.on("click", () => {
            let factorOtherIdx = 0;
            for (let j = 0; j < this.itemSpecial.childrenCount; j++) {
              let node2 = this.itemSpecial.children[j];
              node2.getChildByName("icon").active = true;
              node2.getChildByName("btn").getComponent(cc.Button).interactable = false;
              if (j == i) {
                node2.getChildByName("btn").getComponent(cc.Button).node.active = false;
                node2.getChildByName("icon").getComponent(cc.Label).string = "x" + this.factors[0];
              } else {
                factorOtherIdx++;
                node2.getChildByName("icon").getComponent(cc.Label).string = "x" + this.factors[factorOtherIdx];
              }
            }
            this.lblSpecial.string = Utils_1.default.formatNumber(this.totalCoin) + " x " + this.factors[0] + " = " + Utils_1.default.formatNumber(this.totalCoin * this.factors[0]);
            this.hidden();
          });
        }
      }
      clickItem(evt, data) {
        let node = evt.target.parent;
        var value = this.dataBonus[this.dataBonus.length - this.left];
        node.getChildByName("btn").active = false;
        node.getChildByName("icon1").active = false;
        node.getChildByName("icon").active = true;
        node.getChildByName("label").active = true;
        node.getChildByName("label").getComponent(cc.Label).string = "0";
        Tween_1.default.numberTo(node.getChildByName("label").getComponent(cc.Label), value, .3);
        this.totalCoin += value;
        Tween_1.default.numberTo(this.lblTotal, this.totalCoin, .3);
        this.left--;
        if (this.left <= 0) {
          for (let i = 0; i < this.items.childrenCount; i++) this.items.children[i].getChildByName("btn").getComponent(cc.Button).interactable = false;
          this.scheduleOnce(() => {
            this.showSpecial();
          }, 1.5);
        }
        this.unschedule(this.cbAutoClose);
      }
      resetStage() {
        this.item.active = false;
        for (let i = 0; i < 16; i++) {
          let itembonus = this.items.children[i];
          if (!itembonus) {
            itembonus = cc.instantiate(this.item);
            itembonus.active = true;
            this.items.addChild(itembonus);
          }
          itembonus.getChildByName("btn").getComponent(cc.Button).interactable = true;
          itembonus.getChildByName("btn").active = true;
          itembonus.getChildByName("icon1").active = true;
          itembonus.getChildByName("icon").active = false;
          itembonus.getChildByName("label").active = false;
          itembonus.getChildByName("label").getComponent(cc.Label).string = "";
        }
      }
      showBonus(bonus, onFinished) {
        this.resetStage();
        super.show();
        this.special.active = false;
        this.onFinished = onFinished;
        let arrBonus = bonus.split(",");
        this.dataBonus = [];
        for (let i = 0; i < arrBonus.length - 2; i++) this.dataBonus.push(Number(arrBonus[i]));
        this.left = this.dataBonus.length;
        let factor = Number(arrBonus[arrBonus.length - 2]);
        this.factors.length = 0;
        this.factors.push(factor);
        for (let i = 1; i <= 5; i++) i != factor && this.factors.push(i);
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
          node.getChildByName("btn").children.forEach(node => {
            node.getComponent(sp.Skeleton).setAnimation(0, node.getComponent(sp.Skeleton).animation, false);
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
  "SlotVuongQuocVin.ChooseLine": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "94b5dmpihNOzLDCDOztSL8j", "SlotVuongQuocVin.ChooseLine");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const BroadcastReceiver_1 = require("../../Main/Game/src/common/BroadcastReceiver");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let SlotVuongQuocVinChooseLine = class SlotVuongQuocVinChooseLine extends cc.Component {
      constructor() {
        super(...arguments);
        this.btnClose = null;
        this.lineParent = null;
        this.listToggle = [];
        this.onSelectedChanged = null;
      }
      start() {
        BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.SET_SOUND, this.node);
        for (let i = 0; i < this.lineParent.childrenCount; i++) {
          let node = this.lineParent.children[i];
          let toggle = node.getComponent(cc.Toggle);
          this.listToggle.push(toggle);
          node.on("toggle", () => {
            null != this.onSelectedChanged && this.onSelectedChanged(this.getLineSelected());
          });
        }
      }
      getLineSelected() {
        let lines = new Array();
        for (let i = 0; i < this.lineParent.childrenCount; i++) {
          let node = this.lineParent.children[i];
          node.getComponent(cc.Toggle).isChecked && lines.push(i + 1);
        }
        this.btnClose.interactable = lines.length > 0;
        return lines;
      }
      selectAll() {
        this.listToggle.forEach(element => {
          element.isChecked = true;
        });
        null != this.onSelectedChanged && this.onSelectedChanged(this.getLineSelected());
      }
      deSelectAll() {
        this.listToggle.forEach(element => {
          element.isChecked = false;
        });
        null != this.onSelectedChanged && this.onSelectedChanged(this.getLineSelected());
      }
      selectEven() {
        for (let i = 0; i < this.listToggle.length; i++) this.listToggle[i].isChecked = i % 2 !== 0;
        null != this.onSelectedChanged && this.onSelectedChanged(this.getLineSelected());
      }
      selectOdd() {
        for (let i = 0; i < this.listToggle.length; i++) this.listToggle[i].isChecked = i % 2 == 0;
        null != this.onSelectedChanged && this.onSelectedChanged(this.getLineSelected());
      }
      show() {
        this.node.active = true;
      }
      hide() {
        this.node.active = false;
      }
    };
    __decorate([ property(cc.Button) ], SlotVuongQuocVinChooseLine.prototype, "btnClose", void 0);
    __decorate([ property(cc.Node) ], SlotVuongQuocVinChooseLine.prototype, "lineParent", void 0);
    SlotVuongQuocVinChooseLine = __decorate([ ccclass ], SlotVuongQuocVinChooseLine);
    exports.default = SlotVuongQuocVinChooseLine;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/BroadcastReceiver": void 0
  } ],
  "SlotVuongQuocVin.Cmd": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "79d3al+39NBj5PS+BBVaVa+", "SlotVuongQuocVin.Cmd");
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
      Code.SUBCRIBE = 5003;
      Code.UNSUBCRIBE = 5004;
      Code.CHANGE_ROOM = 5005;
      Code.PLAY = 5001;
      Code.UPDATE_RESULT = 5001;
      Code.UPDATE_POT = 5002;
      Code.AUTO = 5006;
      Code.STOP_AUTO = 5006;
      Code.FORCE_STOP_AUTO = 5008;
      Code.SUBCRIBE_RESPONSE = 5009;
      Code.BIG_WIN = 5010;
      Code.FREE = 5011;
      Code.FREE_DAI_LY = 5012;
      Code.MINIMIZE = 5013;
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
      class SendPlay extends Network_OutPacket_1.default {
        constructor(lines) {
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
          this.valueRoom1 = 0;
          this.valueRoom2 = 0;
          this.valueRoom3 = 0;
          this.valueRoom4 = 0;
          this.x21 = 0;
          this.x22 = 0;
          this.valueRoom1 = this.getLong();
          this.valueRoom2 = this.getLong();
          this.valueRoom3 = this.getLong();
          this.valueRoom4 = this.getLong();
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
          this.isFreeSpin = 0;
          this.ratio = 0;
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
          this.isFreeSpin = this.getByte();
          this.ratio = this.getByte();
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
          this.dateX2 = "";
          this.remain = 0;
          this.currentMoney = 0;
          this.freeSpin = 0;
          this.freeLines = "";
          this.currentRoom = 0;
          this.items = "";
          this.awards = "";
          this.linesConfig = "";
          this.dateX2 = this.getString();
          this.remain = this.getByte();
          this.currentMoney = this.getLong();
          this.freeSpin = this.getByte();
          this.freeLines = this.getString();
          this.currentRoom = this.getByte();
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
  "SlotVuongQuocVin.Controller": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3db2agi1bNH1bL6pksn5Oje", "SlotVuongQuocVin.Controller");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Slot5Controller = exports.GameConfig = exports.Line = exports.cell = exports.Award = exports.Item = void 0;
    const SlotVuongQuocVin_Cmd_1 = require("./SlotVuongQuocVin.Cmd");
    const SlotNetworkClient_1 = require("../../Main/Game/src/networks/SlotNetworkClient");
    const Network_InPacket_1 = require("../../Main/Game/src/networks/Network.InPacket");
    const Tween_1 = require("../../Main/Game/src/common/Tween");
    const BroadcastReceiver_1 = require("../../Main/Game/src/common/BroadcastReceiver");
    const App_1 = require("../../Main/Game/src/common/App");
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const SlotVuongQuocVin_TrialResult_1 = require("./SlotVuongQuocVin.TrialResult");
    const SlotVuongQuocVin_ChooseLine_1 = require("./SlotVuongQuocVin.ChooseLine");
    const SlotVuongQuocVin_HistoryJackpot_1 = require("./SlotVuongQuocVin.HistoryJackpot");
    const SlotVuongQuocVin_History_1 = require("./SlotVuongQuocVin.History");
    const SlotVuongQuocVin_Guide_1 = require("./SlotVuongQuocVin.Guide");
    const SlotVuongQuocVin_Bonus_1 = require("./SlotVuongQuocVin.Bonus");
    const SlotVuongQuocVin_SoundControler_1 = require("./SlotVuongQuocVin.SoundControler");
    const SlotVuongQuocVin_SpinControler_1 = require("./SlotVuongQuocVin.SpinControler");
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
    let Slot5Controller = class Slot5Controller extends cc.Component {
      constructor() {
        super(...arguments);
        this.scene = null;
        this.sprFrameItems = null;
        this.sprFrameItemsBlur = null;
        this.itemTemplate = null;
        this.robot = null;
        this.columns = null;
        this.linesWin = null;
        this.line = null;
        this.listLine = null;
        this.lblJackpot = null;
        this.lblCoin = null;
        this.lblWinNow = null;
        this.effectWinCash = null;
        this.effectBigWin = null;
        this.effectJackpot = null;
        this.effectBonus = null;
        this.toast = null;
        this.btnBack = null;
        this.popupSelectLine = null;
        this.popupBonus = null;
        this.popupGuide = null;
        this.popupHistory = null;
        this.popupJackpotHistory = null;
        this.SupperRobotSpinControler = null;
        this.SupperRobotSoundControler = null;
        this.ROLL_START_ITEM_COUNT = 25;
        this.ROLL_ADD_ITEM_COUNT = 10;
        this.SPIN_DURATION = 1;
        this.ADD_SPIN_DURATION = .15;
        this.ITEMHEIGHT = 90;
        this.itemHeight = 140;
        this.betIdx = 0;
        this.LISTBET = [ 100, 1e3, 1e4 ];
        this.LISTBETLABEL = [ "100", "1K", "10K" ];
        this.arrLineSelect = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 ];
        this.canSpin = true;
        this.isTrial = false;
        this.spinMode = SlotVuongQuocVin_SpinControler_1.SpinMode.NORMAL;
        this.GAME_CONFIG = null;
      }
      start() {
        var _a;
        this.betIdx = Configs_1.default.Login.Coin >= Configs_1.default.App.RICH_MAN ? 1 : 0;
        this.SupperRobotSpinControler.setInfoBet(this.isTrial, this.arrLineSelect.length.toString(), this.LISTBETLABEL[this.betIdx], this.arrLineSelect.length * this.LISTBET[this.betIdx]);
        this.SupperRobotSoundControler.initMusicAndSound();
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
              ErrorLogger_1.ErrorLogger.sendLogError("USER_DISCONNECTED", "SlotVuongQuocVin", "reason: " + res.reason);
            }
            break;

           case SlotVuongQuocVin_Cmd_1.default.Code.UPDATE_POT:
            {
              let res = new SlotVuongQuocVin_Cmd_1.default.ReceiveUpdatePot(data);
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

           case SlotVuongQuocVin_Cmd_1.default.Code.UPDATE_RESULT:
            {
              let res = new SlotVuongQuocVin_Cmd_1.default.ReceiveResult(data);
              cc.log(res);
              res && this.onSpinResult(res);
            }
            break;

           case SlotVuongQuocVin_Cmd_1.default.Code.SUBCRIBE_RESPONSE:
            {
              let res = new SlotVuongQuocVin_Cmd_1.default.ReceiveSubcribe(data);
              this.initLineConfig(res);
            }
          }
        }, this);
        this.robot.setAnimation(0, "normal", true);
        SlotNetworkClient_1.default.getInstance().send(new SlotVuongQuocVin_Cmd_1.default.SendSubcribe(this.betIdx));
        this.SupperRobotSpinControler.lblTotalBet.string = Utils_1.default.formatNumber(this.arrLineSelect.length * this.LISTBET[this.betIdx]);
        BroadcastReceiver_1.default.register(BroadcastReceiver_1.default.USER_UPDATE_COIN, () => {
          Tween_1.default.numberTo(this.lblCoin, Configs_1.default.Login.Coin, .3);
        }, this);
        BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN);
        null === (_a = App_1.default.instance) || void 0 === _a ? void 0 : _a.showErrLoading("\u0110ang k\u1ebft n\u1ed1i t\u1edbi server...");
        SlotNetworkClient_1.default.getInstance().checkConnect(() => {});
        this.setSoundButton();
        this.SupperRobotSpinControler.spin = this.spin.bind(this);
        this.SupperRobotSpinControler.spinAuto = this.toggleAutoOnCheck.bind(this);
        this.SupperRobotSpinControler.setClickSpin();
        this.resetState();
      }
      setSoundButton() {
        let findBtn = (node, path) => {
          try {
            let btn = node.getComponent(cc.Button) || node.getComponent(cc.Toggle);
            if (btn && 0 == btn.clickEvents.filter(evt => evt && "playSoundClick" == evt.handler).length) {
              let eventHandler = new cc.Component.EventHandler();
              eventHandler.target = this.node;
              eventHandler.component = "SlotVuongQuocVin.Controller";
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
        this.GAME_CONFIG.items.length != this.sprFrameItems.getSpriteFrames().length && ErrorLogger_1.ErrorLogger.sendLogError("Game config error", "Slot VuongQuocVin", "ITEMS not matching (server " + this.GAME_CONFIG.items.length + " - client " + this.sprFrameItems.getSpriteFrames().length + ")");
        0 == this.GAME_CONFIG.linesConfig.filter(line => this.arrLineSelect.indexOf(parseInt(line.name.replace("line", ""))) >= 0).length && ErrorLogger_1.ErrorLogger.sendLogError("Game config error", "Slot VuongQuocVin", "LINES not matching (server " + this.GAME_CONFIG.linesConfig.length + " - client " + this.arrLineSelect.length + ")");
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
            } else {
              item.scale = 1.3;
              item.getChildByName("ani").children.forEach(item2 => {
                name == item2.name && item2.getChildByName("animation").getComponent(sp.Skeleton).setAnimation(0, "normal", true);
                item2.active = name == item2.name;
              });
            }
          }
        });
      }
      initLine(linesConfig) {
        this.linesWin.destroyAllChildren();
        null === linesConfig || void 0 === linesConfig ? void 0 : linesConfig.forEach(line => {
          let nodeListLine = cc.instantiate(this.line);
          nodeListLine.name = line.name;
          nodeListLine.parent = this.linesWin;
          nodeListLine.y = 0;
          let number = parseInt(line.name.replace(/[^0-9]/g, ""));
          let row = number > linesConfig.length / 2 ? line.cells.find(cell => 4 == cell.col).row : line.cells.find(cell => 0 == cell.col).row;
          nodeListLine.getChildByName("index").getChildByName("number").getComponent(cc.Label).string = number.toString();
          nodeListLine.getChildByName("index").x = number > linesConfig.length / 2 ? 269 : -269;
          let listLineByRow = linesConfig.filter(_line => void 0 != _line.cells.find(_cell => (number > linesConfig.length / 2 ? 4 == _cell.col : 0 == _cell.col) && _cell.row == row) && (number - linesConfig.length / 2) * (parseInt(_line.name.replace(/[^0-9]/g, "")) - linesConfig.length / 2) > 0);
          let indexInRow = listLineByRow.indexOf(line);
          let agent = number > linesConfig.length / 2 ? 150 + 120 * indexInRow / listLineByRow.length : 30 - 120 * indexInRow / listLineByRow.length;
          nodeListLine.getChildByName("index").angle = agent;
          nodeListLine.getChildByName("index").getChildByName("number").angle = -agent;
          nodeListLine.getChildByName("index").y = 142 - 142 * row;
          for (let index = 1; index < line.cells.length; index++) {
            let cell_current = line.cells.find(cell => cell.col == index);
            let cell_befor = line.cells.find(cell => cell.col == index - 1);
            let nodeLine = nodeListLine.getChildByName("lines").getChildByName(index.toString());
            nodeLine.active = true;
            nodeLine.y = 0;
            nodeLine.getComponent(cc.Sprite).spriteFrame = this.listLine.getSpriteFrame(cell_befor.row + "t" + cell_current.row);
          }
        });
      }
      onSelectedLineChanged(lines) {
        this.arrLineSelect = lines;
        this.SupperRobotSpinControler.setInfoBet(this.isTrial, this.arrLineSelect.length.toString(), this.LISTBETLABEL[this.betIdx], this.arrLineSelect.length * this.LISTBET[this.betIdx]);
      }
      resetState(setCanSpin = false) {
        this.canSpin = this.canSpin || setCanSpin;
        this.canSpin && !(this.SupperRobotSpinControler.spinType.auto || this.SupperRobotSpinControler.spinType.autox2) && this.SupperRobotSpinControler.btnSpin.getComponent(sp.Skeleton).setAnimation(0, "normal", false);
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
        this.SupperRobotSpinControler.setInfoBet(this.isTrial, this.arrLineSelect.length.toString(), this.LISTBETLABEL[this.betIdx], this.arrLineSelect.length * this.LISTBET[this.betIdx]);
        SlotNetworkClient_1.default.getInstance().send(new SlotVuongQuocVin_Cmd_1.default.SendChangeRoom(oldIdx, this.betIdx));
      }
      commonClickHandler() {
        this.SupperRobotSoundControler.commonClickHandler();
      }
      actBack() {
        SlotNetworkClient_1.default.getInstance().send(new SlotVuongQuocVin_Cmd_1.default.SendSubcribe(this.betIdx));
        cc.audioEngine.stopAll();
        cc.director.loadScene("Lobby", () => {
          let bundleVuongQuocVin = cc.assetManager.getBundle(Configs_1.default.App.BUNDLE_NAME.VUONGQUOCVIN);
          bundleVuongQuocVin.releaseAll();
          cc.assetManager.removeBundle(bundleVuongQuocVin);
        });
      }
      actHidden() {
        this.showToast("T\xednh n\u0103ng \u0111ang ph\xe1t tri\u1ec3n.");
      }
      actTrial() {
        this.isTrial = !this.isTrial;
        this.setSpinMode(SlotVuongQuocVin_SpinControler_1.SpinMode.NORMAL);
        this.isTrial ? this.SupperRobotSpinControler.setInfoBet(this.isTrial, "20", "100", 2e3) : this.SupperRobotSpinControler.setInfoBet(this.isTrial, this.arrLineSelect.length.toString(), this.LISTBET[this.betIdx], this.arrLineSelect.length * this.LISTBET[this.betIdx]);
      }
      toggleAutoOnCheck() {
        if (this.isTrial) {
          this.setSpinMode(SlotVuongQuocVin_SpinControler_1.SpinMode.NORMAL);
          this.showToast("T\xednh n\u0103ng n\xe0y kh\xf4ng ho\u1ea1t \u0111\u1ed9ng \u1edf ch\u1ebf \u0111\u1ed9 ch\u01a1i th\u1eed.");
          return;
        }
        if (this.SupperRobotSpinControler.spinType.auto) this.setSpinMode(SlotVuongQuocVin_SpinControler_1.SpinMode.NORMAL); else {
          this.setSpinMode(SlotVuongQuocVin_SpinControler_1.SpinMode.AUTO);
          this.SupperRobotSpinControler.setStageButtonSpin(true);
        }
      }
      toggleBoostOnCheck() {
        if (this.isTrial) {
          this.showToast("T\xednh n\u0103ng n\xe0y kh\xf4ng ho\u1ea1t \u0111\u1ed9ng \u1edf ch\u1ebf \u0111\u1ed9 ch\u01a1i th\u1eed.");
          return;
        }
        if (this.SupperRobotSpinControler.spinType.autox2) this.SupperRobotSpinControler.spinType.auto ? this.setSpinMode(SlotVuongQuocVin_SpinControler_1.SpinMode.AUTO) : this.setSpinMode(SlotVuongQuocVin_SpinControler_1.SpinMode.NORMAL); else {
          this.setSpinMode(SlotVuongQuocVin_SpinControler_1.SpinMode.AUTO_X2);
          this.SupperRobotSpinControler.setStageButtonSpin(true);
        }
      }
      setSpinMode(mode) {
        this.SupperRobotSpinControler.setSpinMode(mode);
        if (this.SupperRobotSpinControler.spinType.auto || this.SupperRobotSpinControler.spinType.autox2) {
          this.resetState(false);
          this.spin();
        } else this.canSpin && this.setEnabledAllButtonsExceptPlayMode(true);
      }
      spin(callByClick = false) {
        if (callByClick && (this.SupperRobotSpinControler.spinType.autox2 || this.SupperRobotSpinControler.spinType.auto)) {
          this.setSpinMode(SlotVuongQuocVin_SpinControler_1.SpinMode.NORMAL);
          return;
        }
        if (!this.canSpin) return;
        this.resetState(callByClick);
        this.canSpin = false;
        this.setEnabledAllButtonsExceptPlayMode(false);
        this.robot.setAnimation(0, "normal", true);
        if (this.isTrial) {
          let bigwin = Utils_1.default.randomRangeInt(0, 4);
          let resultBigwim = bigwin > 2 ? SlotVuongQuocVin_TrialResult_1.default.results.filter(a => a.prize > 2500) : SlotVuongQuocVin_TrialResult_1.default.results.filter(a => a.result > 1);
          if (resultBigwim.length > 0) {
            var rIdx = Utils_1.default.randomRangeInt(0, resultBigwim.length);
            3 == resultBigwim[rIdx].result ? resultBigwim[rIdx].prize = Utils_1.default.stringToInt(this.lblJackpot.string) : resultBigwim[rIdx].prize *= 3;
            this.onSpinResult(resultBigwim[rIdx]);
          } else {
            this.canSpin = true;
            this.spin(callByClick);
          }
        } else SlotNetworkClient_1.default.getInstance().send(new SlotVuongQuocVin_Cmd_1.default.SendPlay(this.arrLineSelect.toString()));
      }
      stopSpin() {
        this.columns.children.forEach(roll => {
          roll.stopAllActions();
          roll.setPosition(cc.v2(roll.getPosition().x, 0));
        });
      }
      setEnabledAllButtonsExceptPlayMode(enabled) {
        this.SupperRobotSpinControler.setEnabledAllButtonsSpin(enabled);
        this.btnBack.interactable = enabled;
      }
      onSpinResult(receiveResult) {
        var _a, _b, _c, _d, _e;
        this.stopSpin();
        if (!receiveResult.awardsDetail || !receiveResult.awardsDetail.object || 0 == receiveResult.awardsDetail.object.length) {
          let wildItemId = null === (_a = this.GAME_CONFIG.items.find(item => "WILD" == item.itemType)) || void 0 === _a ? void 0 : _a.id;
          let matrixOneDimensional = null === (_b = receiveResult.matrix) || void 0 === _b ? void 0 : _b.split(",");
          if (!matrixOneDimensional) {
            null === (_c = App_1.default.instance) || void 0 === _c ? void 0 : _c.showErrLoading("\u0110\xe3 x\u1ea3y ra l\u1ed7i...");
            return;
          }
          let matrix = [ matrixOneDimensional.slice(0, 5), matrixOneDimensional.slice(5, 10), matrixOneDimensional.slice(10, 15) ];
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
        var listTypeResult = [ 0, 1, 2, 3, 5, 6 ];
        if (-1 === listTypeResult.indexOf(receiveResult.result) || !receiveResult) {
          this.setSpinMode(SlotVuongQuocVin_SpinControler_1.SpinMode.NORMAL);
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
        let matrixOneDimensional = null === (_d = receiveResult.matrix) || void 0 === _d ? void 0 : _d.split(",");
        if (!matrixOneDimensional) {
          null === (_e = App_1.default.instance) || void 0 === _e ? void 0 : _e.showErrLoading("\u0110\xe3 x\u1ea3y ra l\u1ed7i...");
          return;
        }
        let matrix = [ matrixOneDimensional.slice(0, 5), matrixOneDimensional.slice(5, 10), matrixOneDimensional.slice(10, 15) ];
        let speedRoll = this.SupperRobotSpinControler.spinType.autox2 ? .3 : 1;
        this.SupperRobotSoundControler.playSounWithID(7, speedRoll);
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
                  name == item2.name && item2.getChildByName("animation").getComponent(sp.Skeleton).setAnimation(0, "normal", true);
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
              children[i].scale = 1.3;
              children[i].getChildByName("ani").active && children[i].getChildByName("ani").children.forEach(item2 => {
                nameItem == item2.name && nameItem == item2.name && item2.getChildByName("animation").getComponent(sp.Skeleton).setAnimation(0, "normal", true);
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
        this.SupperRobotSoundControler.playSounWithID(receiveResult.result);
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

         case 5:
          this.popupBonus ? this.showEffectBonus(() => {
            this.popupBonus.showBonus(receiveResult.haiSao, () => {
              this.showLineWins(receiveResult);
            });
          }) : this.showEffectBonus(() => {
            cc.assetManager.getBundle(Configs_1.default.App.BUNDLE_NAME.VUONGQUOCVIN).load("res/prefabs/PopupBonus", cc.Prefab, (error, prefab) => {
              if (error) return;
              this.popupBonus = cc.instantiate(prefab).getComponent(SlotVuongQuocVin_Bonus_1.default);
              this.scene.addChild(this.popupBonus.node);
              this.popupBonus.showBonus(receiveResult.haiSao, () => {
                this.showLineWins(receiveResult);
              });
              this.setSoundButton();
            });
          });
          break;

         case 6:
          this.showEffectBigWin(receiveResult.prize, () => {
            this.showLineWins(receiveResult);
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
        var _a, _b, _c, _d, _e;
        this.SupperRobotSpinControler.spinType.auto || this.SupperRobotSpinControler.spinType.autox2 || this.SupperRobotSpinControler.btnSpin.getComponent(sp.Skeleton).setAnimation(0, "normal", false);
        this.canSpin = true;
        Tween_1.default.numberTo(this.lblWinNow, receiveResult.prize, .3);
        this.isTrial || BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN);
        this.setEnabledAllButtonsExceptPlayMode(!this.SupperRobotSpinControler.spinType.auto && !this.SupperRobotSpinControler.spinType.autox2);
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
          if (!this.SupperRobotSpinControler.spinType.autox2) {
            this.robot.setAnimation(0, "shoot", false);
            for (const award of null === (_c = receiveResult.awardsDetail) || void 0 === _c ? void 0 : _c.object) {
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
                  rolls[cell.col].children[2 - cell.row].scale = 1;
                  rolls[cell.col].children[2 - cell.row].getChildByName("ani").children.forEach((child, index) => {
                    child.active = child.name == typeCell;
                    typeWin != typeCell && typeWild != typeCell || child.getChildByName("animation").getComponent(sp.Skeleton).setAnimation(0, "animation", false);
                  });
                });
              });
              let hideLine = cc.callFunc(() => {
                nodeLine.active = false;
                this.columns.children.forEach(colum => {
                  colum.children.forEach(item => {
                    item.getChildByName("ani").active && item.getChildByName("ani").children.forEach(item2 => {
                      item2.active && item2.getChildByName("animation").getComponent(sp.Skeleton).setAnimation(0, "normal", true);
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
        }
        actions.push(cc.callFunc(() => {
          this.isTrial || !this.SupperRobotSpinControler.spinType.autox2 && !this.SupperRobotSpinControler.spinType.auto || this.spin();
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
        }), cc.scaleTo(.5, 1), cc.callFunc(() => {
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
        this.effectJackpot.runAction(cc.sequence(cc.callFunc(() => {
          this.effectJackpot.getComponentsInChildren(sp.Skeleton).forEach(ani => {
            ani.setAnimation(0, "animation", false);
          });
          label.string = "";
        }), cc.scaleTo(.5, 1), cc.callFunc(() => {
          label.node.active = true;
          Tween_1.default.numberTo(label, cash, 1);
        }), cc.delayTime(3.5), cc.callFunc(() => {
          this.effectJackpot.active = false;
          null != cb && cb();
        })));
      }
      showEffectBonus(cb) {
        this.effectBonus.stopAllActions();
        this.effectBonus.active = true;
        this.effectBonus.getComponentInChildren(sp.Skeleton).setAnimation(0, "animation_blue", true);
        this.effectBonus.runAction(cc.sequence(cc.delayTime(3), cc.callFunc(() => {
          this.effectBonus.active = false;
          null != cb && cb();
        })));
      }
      stopAllItemEffect() {
        var _a;
        null === (_a = this.columns) || void 0 === _a ? void 0 : _a.children.forEach(colum => {
          var _a, _b;
          for (let index = 0; index < 3; index++) {
            null === (_a = null === colum || void 0 === colum ? void 0 : colum.children[index]) || void 0 === _a ? void 0 : _a.stopAllActions();
            null === (_b = null === colum || void 0 === colum ? void 0 : colum.children[index]) || void 0 === _b ? void 0 : _b.runAction(cc.scaleTo(.1, 1));
          }
        });
      }
      showToast(msg) {
        App_1.default.instance.alertDialog.showMsg(msg);
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
        this.SupperRobotSoundControler.settingSound();
      }
      settingMusic() {
        this.SupperRobotSoundControler.settingMusic();
      }
      showPopupSelectLine(evt) {
        if (this.isTrial) {
          this.showToast("T\xednh n\u0103ng n\xe0y kh\xf4ng ho\u1ea1t \u0111\u1ed9ng \u1edf ch\u1ebf \u0111\u1ed9 ch\u01a1i th\u1eed.");
          return;
        }
        if (this.popupSelectLine) {
          this.popupSelectLine.onSelectedChanged = this.onSelectedLineChanged.bind(this);
          this.popupSelectLine.show();
        } else {
          evt.target && evt.target.getComponent(cc.Button) && (evt.target.getComponent(cc.Button).enabled = false);
          cc.assetManager.getBundle(Configs_1.default.App.BUNDLE_NAME.VUONGQUOCVIN).load("res/prefabs/PopupSelectLine", cc.Prefab, (error, prefab) => {
            if (error) return;
            this.popupSelectLine = cc.instantiate(prefab).getComponent(SlotVuongQuocVin_ChooseLine_1.default);
            this.scene.addChild(this.popupSelectLine.node);
            this.popupSelectLine.onSelectedChanged = this.onSelectedLineChanged.bind(this);
            this.popupSelectLine.show();
            this.setSoundButton();
            evt.target && evt.target.getComponent(cc.Button) && (evt.target.getComponent(cc.Button).enabled = true);
          });
        }
      }
      showJackpotHistory(evt) {
        if (this.popupJackpotHistory) this.popupJackpotHistory.show(); else {
          evt.target && evt.target.getComponent(cc.Button) && (evt.target.getComponent(cc.Button).enabled = false);
          cc.assetManager.getBundle(Configs_1.default.App.BUNDLE_NAME.VUONGQUOCVIN).load("res/prefabs/PopupJackpotHistory", cc.Prefab, (error, prefab) => {
            if (error) return;
            this.popupJackpotHistory = cc.instantiate(prefab).getComponent(SlotVuongQuocVin_HistoryJackpot_1.default);
            this.scene.addChild(this.popupJackpotHistory.node);
            this.popupJackpotHistory.show();
            this.setSoundButton();
            evt.target && evt.target.getComponent(cc.Button) && (evt.target.getComponent(cc.Button).enabled = true);
          });
        }
      }
      showHistory(evt) {
        if (this.popupHistory) this.popupHistory.show(); else {
          evt.target && evt.target.getComponent(cc.Button) && (evt.target.getComponent(cc.Button).enabled = false);
          cc.assetManager.getBundle(Configs_1.default.App.BUNDLE_NAME.VUONGQUOCVIN).load("res/prefabs/PopupHistory", cc.Prefab, (error, prefab) => {
            if (error) return;
            this.popupHistory = cc.instantiate(prefab).getComponent(SlotVuongQuocVin_History_1.default);
            this.scene.addChild(this.popupHistory.node);
            this.popupHistory.show();
            this.setSoundButton();
            evt.target && evt.target.getComponent(cc.Button) && (evt.target.getComponent(cc.Button).enabled = true);
          });
        }
      }
      showGuide(evt) {
        if (this.popupGuide) this.popupGuide.init(this.GAME_CONFIG); else {
          evt.target && evt.target.getComponent(cc.Button) && (evt.target.getComponent(cc.Button).enabled = false);
          cc.assetManager.getBundle(Configs_1.default.App.BUNDLE_NAME.VUONGQUOCVIN).load("res/prefabs/PopupGuide", cc.Prefab, (error, prefab) => {
            if (error) return;
            this.popupGuide = cc.instantiate(prefab).getComponent(SlotVuongQuocVin_Guide_1.default);
            this.scene.addChild(this.popupGuide.node);
            this.popupGuide.init(this.GAME_CONFIG);
            this.setSoundButton();
            evt.target && evt.target.getComponent(cc.Button) && (evt.target.getComponent(cc.Button).enabled = true);
          });
        }
      }
    };
    __decorate([ property(cc.Node) ], Slot5Controller.prototype, "scene", void 0);
    __decorate([ property(cc.SpriteAtlas) ], Slot5Controller.prototype, "sprFrameItems", void 0);
    __decorate([ property(cc.SpriteAtlas) ], Slot5Controller.prototype, "sprFrameItemsBlur", void 0);
    __decorate([ property(cc.Prefab) ], Slot5Controller.prototype, "itemTemplate", void 0);
    __decorate([ property(sp.Skeleton) ], Slot5Controller.prototype, "robot", void 0);
    __decorate([ property(cc.Node) ], Slot5Controller.prototype, "columns", void 0);
    __decorate([ property(cc.Node) ], Slot5Controller.prototype, "linesWin", void 0);
    __decorate([ property(cc.Node) ], Slot5Controller.prototype, "line", void 0);
    __decorate([ property(cc.SpriteAtlas) ], Slot5Controller.prototype, "listLine", void 0);
    __decorate([ property(cc.Label) ], Slot5Controller.prototype, "lblJackpot", void 0);
    __decorate([ property(cc.Label) ], Slot5Controller.prototype, "lblCoin", void 0);
    __decorate([ property(cc.Label) ], Slot5Controller.prototype, "lblWinNow", void 0);
    __decorate([ property(cc.Node) ], Slot5Controller.prototype, "effectWinCash", void 0);
    __decorate([ property(cc.Node) ], Slot5Controller.prototype, "effectBigWin", void 0);
    __decorate([ property(cc.Node) ], Slot5Controller.prototype, "effectJackpot", void 0);
    __decorate([ property(cc.Node) ], Slot5Controller.prototype, "effectBonus", void 0);
    __decorate([ property(cc.Node) ], Slot5Controller.prototype, "toast", void 0);
    __decorate([ property(cc.Button) ], Slot5Controller.prototype, "btnBack", void 0);
    __decorate([ property(SlotVuongQuocVin_SpinControler_1.SupperRobotSpinControler) ], Slot5Controller.prototype, "SupperRobotSpinControler", void 0);
    __decorate([ property(SlotVuongQuocVin_SoundControler_1.SupperRobotSoundControler) ], Slot5Controller.prototype, "SupperRobotSoundControler", void 0);
    Slot5Controller = __decorate([ ccclass ], Slot5Controller);
    exports.Slot5Controller = Slot5Controller;
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
    "./SlotVuongQuocVin.Bonus": "SlotVuongQuocVin.Bonus",
    "./SlotVuongQuocVin.ChooseLine": "SlotVuongQuocVin.ChooseLine",
    "./SlotVuongQuocVin.Cmd": "SlotVuongQuocVin.Cmd",
    "./SlotVuongQuocVin.Guide": "SlotVuongQuocVin.Guide",
    "./SlotVuongQuocVin.History": "SlotVuongQuocVin.History",
    "./SlotVuongQuocVin.HistoryJackpot": "SlotVuongQuocVin.HistoryJackpot",
    "./SlotVuongQuocVin.SoundControler": "SlotVuongQuocVin.SoundControler",
    "./SlotVuongQuocVin.SpinControler": "SlotVuongQuocVin.SpinControler",
    "./SlotVuongQuocVin.TrialResult": "SlotVuongQuocVin.TrialResult"
  } ],
  "SlotVuongQuocVin.Guide": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fe9fbXxqCFCsZuW9hgB8IWB", "SlotVuongQuocVin.Guide");
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
    let SlotVuongQuocVinGuide = class SlotVuongQuocVinGuide extends Dialog_1.default {
      constructor() {
        super(...arguments);
        this.pages = [];
        this.btnNext = null;
        this.btnPrev = null;
        this.soundClick = null;
        this.icons = [];
        this.itemsContent = null;
        this.itemsLayout = null;
        this.item = null;
        this.page = 0;
        this.soundSlotState = null;
        this.maxItemInLayout = 2;
      }
      init(gameConfig) {
        this.canPlaySound() && cc.audioEngine.play(this.soundClick, false, 1);
        super.show();
        this.page = 0;
        this.btnNext.active = this.pages.length > 0;
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
        this.canPlaySound() && cc.audioEngine.play(this.soundClick, false, 1);
        this.page < this.pages.length - 1 && this.page++;
        this.reloadData();
        this.page == this.pages.length - 1 && (this.btnNext.active = false);
        this.btnPrev.active = this.pages.length > 0;
      }
      actPrev() {
        this.canPlaySound() && cc.audioEngine.play(this.soundClick, false, 1);
        this.page > 0 && this.page--;
        this.reloadData();
        0 == this.page && (this.btnPrev.active = false);
        this.btnNext.active = this.pages.length > 0;
      }
      reloadData() {
        for (let i = 0; i < this.pages.length; i++) this.pages[i].active = i == this.page;
      }
      dismiss() {
        this.canPlaySound() && cc.audioEngine.play(this.soundClick, false, 1);
        this.node.active = false;
      }
      canPlaySound() {
        var soundSave = cc.sys.localStorage.getItem("sound_Slot_1");
        this.soundSlotState = null != soundSave ? parseInt(soundSave) : 1;
        return 1 == this.soundSlotState;
      }
    };
    __decorate([ property([ cc.Node ]) ], SlotVuongQuocVinGuide.prototype, "pages", void 0);
    __decorate([ property(cc.Node) ], SlotVuongQuocVinGuide.prototype, "btnNext", void 0);
    __decorate([ property(cc.Node) ], SlotVuongQuocVinGuide.prototype, "btnPrev", void 0);
    __decorate([ property({
      type: cc.AudioClip
    }) ], SlotVuongQuocVinGuide.prototype, "soundClick", void 0);
    __decorate([ property([ cc.SpriteFrame ]) ], SlotVuongQuocVinGuide.prototype, "icons", void 0);
    __decorate([ property(cc.Node) ], SlotVuongQuocVinGuide.prototype, "itemsContent", void 0);
    __decorate([ property(cc.Prefab) ], SlotVuongQuocVinGuide.prototype, "itemsLayout", void 0);
    __decorate([ property(cc.Prefab) ], SlotVuongQuocVinGuide.prototype, "item", void 0);
    SlotVuongQuocVinGuide = __decorate([ ccclass ], SlotVuongQuocVinGuide);
    exports.default = SlotVuongQuocVinGuide;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/Dialog": void 0
  } ],
  "SlotVuongQuocVin.HistoryJackpot": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a3204Onk7VJj6SePcUFXsIo", "SlotVuongQuocVin.HistoryJackpot");
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
    let SlotVuongQuocVinGlory = class SlotVuongQuocVinGlory extends Dialog_1.default {
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
        this.node.active = false;
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
          gn: "VuongQuocVin"
        }, (err, res) => {
          App_1.default.instance.showLoading(false);
          if (null != err) return;
          if (!res["success"]) return;
          if (0 == this.items.length) {
            for (var i = 0; i < 10; i++) {
              let item = cc.instantiate(this.itemTemplate);
              item.parent = this.itemTemplate.parent;
              item.getChildByName("bg") && (item.getChildByName("bg").active = i % 2 == 0);
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
              let dataVip = res["listUserVipRank"] && res["listUserVipRank"].find(data => data.nickname == itemData["nn"]);
              item.active = false;
              item.getChildByName("bg").opacity = i % 2 == 0 ? 128 : 0;
              item.getChildByName("Time").getComponent(cc.Label).string = itemData["ts"].toString().replace(" ", "\n");
              item.getChildByName("Bet").getComponent(cc.Label).string = Utils_1.default.formatNumber(itemData["bv"]);
              item.getChildByName("Type").getComponent(cc.Label).string = 3 == itemData["rs"] ? "N\u1ed5 h\u0169" : "Th\u1eafng l\u1edbn";
              item.getChildByName("Nickname").getComponent(cc.Label).string = itemData["nn"];
              item.getChildByName("Nickname").color = dataVip ? cc.Color.BLACK.fromHEX(Utils_1.default.getColorVip(dataVip.rank)) : cc.Color.BLACK.fromHEX(Utils_1.default.getColorVip("VIP_0"));
              item.getChildByName("Nickname").getComponent(cc.LabelOutline).color = dataVip ? cc.Color.BLACK.fromHEX(Utils_1.default.getColorVip(dataVip.rank)) : cc.Color.BLACK.fromHEX(Utils_1.default.getColorVip("VIP_0"));
              item.getChildByName("vip").getComponent(cc.Sprite).spriteFrame = this.atlasVip.getSpriteFrame(dataVip.rank);
              item.getChildByName("Prize").getComponent(cc.Label).string = Utils_1.default.formatNumber(itemData["pz"]);
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
    __decorate([ property(cc.Label) ], SlotVuongQuocVinGlory.prototype, "lblPage", void 0);
    __decorate([ property(cc.Node) ], SlotVuongQuocVinGlory.prototype, "itemTemplate", void 0);
    __decorate([ property(cc.SpriteAtlas) ], SlotVuongQuocVinGlory.prototype, "atlasVip", void 0);
    SlotVuongQuocVinGlory = __decorate([ ccclass ], SlotVuongQuocVinGlory);
    exports.default = SlotVuongQuocVinGlory;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/App": void 0,
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/common/Dialog": void 0,
    "../../Main/Game/src/common/Http": void 0,
    "../../Main/Game/src/common/Utils": void 0
  } ],
  "SlotVuongQuocVin.History": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1c2e674Pi1MfpUYyQpJviPO", "SlotVuongQuocVin.History");
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
    let SlotVuongQuocVinHistory = class SlotVuongQuocVinHistory extends Dialog_1.default {
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
        this.node.active = false;
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
          gn: "VuongQuocVin"
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
              item.getChildByName("bg").opacity = i % 2 == 0 ? 128 : 0;
              item.getChildByName("Id").getComponent(cc.Label).string = itemData["rf"];
              item.getChildByName("Time").getComponent(cc.Label).string = itemData["ts"];
              item.getChildByName("Bet").getComponent(cc.Label).string = Utils_1.default.formatNumber(itemData["bv"]);
              item.getChildByName("Linebet").getComponent(cc.Label).string = "" === itemData["lb"] ? 0 : itemData["lb"].split(",").length;
              item.getChildByName("Linewin").getComponent(cc.Label).string = "" === itemData["lw"] ? 0 : itemData["lw"].split(",").length;
              item.getChildByName("Prize").getComponent(cc.Label).string = Utils_1.default.formatNumber(itemData["pz"]);
              item.active = true;
            } else item.active = false;
          }
        });
      }
    };
    __decorate([ property(cc.Label) ], SlotVuongQuocVinHistory.prototype, "lblPage", void 0);
    __decorate([ property(cc.Node) ], SlotVuongQuocVinHistory.prototype, "itemTemplate", void 0);
    SlotVuongQuocVinHistory = __decorate([ ccclass ], SlotVuongQuocVinHistory);
    exports.default = SlotVuongQuocVinHistory;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/App": void 0,
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/common/Dialog": void 0,
    "../../Main/Game/src/common/Http": void 0,
    "../../Main/Game/src/common/Utils": void 0
  } ],
  "SlotVuongQuocVin.Icon": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f7d51i8PLtHRr6dBVGfiTV6", "SlotVuongQuocVin.Icon");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const {ccclass: ccclass, property: property} = cc._decorator;
    let SlotVuongQuocVinIcon = class SlotVuongQuocVinIcon extends cc.Component {
      constructor() {
        super(...arguments);
        this.nodeIcon = null;
        this.fxJackpot = null;
        this.fxBonus = null;
        this.fxFree = null;
      }
      start() {
        this.animation = this.getComponent(cc.Animation);
      }
      setSprite(sf) {
        this.nodeIcon.active = true;
        this.nodeIcon.getComponent(cc.Sprite).spriteFrame = sf;
      }
      setSpine(id) {
        this.nodeIcon.active = false;
        switch (parseInt(id)) {
         case 0:
          this.fxJackpot.active = true;
          break;

         case 1:
          this.fxBonus.active = true;
          break;

         case 2:
          this.fxFree.active = true;
        }
      }
      scale() {
        this.nodeIcon.active && this.animation.play();
      }
    };
    __decorate([ property(cc.Node) ], SlotVuongQuocVinIcon.prototype, "nodeIcon", void 0);
    __decorate([ property(cc.Node) ], SlotVuongQuocVinIcon.prototype, "fxJackpot", void 0);
    __decorate([ property(cc.Node) ], SlotVuongQuocVinIcon.prototype, "fxBonus", void 0);
    __decorate([ property(cc.Node) ], SlotVuongQuocVinIcon.prototype, "fxFree", void 0);
    SlotVuongQuocVinIcon = __decorate([ ccclass ], SlotVuongQuocVinIcon);
    exports.default = SlotVuongQuocVinIcon;
    cc._RF.pop();
  }, {} ],
  "SlotVuongQuocVin.SoundControler": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8c4c6/+8hRJtJBljVev5zWb", "SlotVuongQuocVin.SoundControler");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.SupperRobotSoundControler = void 0;
    const {ccclass: ccclass, property: property} = cc._decorator;
    let SupperRobotSoundControler = class SupperRobotSoundControler extends cc.Component {
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
    }) ], SupperRobotSoundControler.prototype, "soundSpinMis", void 0);
    __decorate([ property({
      type: cc.AudioClip
    }) ], SupperRobotSoundControler.prototype, "soundSpinWin", void 0);
    __decorate([ property({
      type: cc.AudioClip
    }) ], SupperRobotSoundControler.prototype, "soundBigWin", void 0);
    __decorate([ property({
      type: cc.AudioClip
    }) ], SupperRobotSoundControler.prototype, "soundJackpot", void 0);
    __decorate([ property({
      type: cc.AudioClip
    }) ], SupperRobotSoundControler.prototype, "soundBonus", void 0);
    __decorate([ property({
      type: cc.AudioClip
    }) ], SupperRobotSoundControler.prototype, "soundClick", void 0);
    __decorate([ property({
      type: cc.AudioClip
    }) ], SupperRobotSoundControler.prototype, "musicBackground", void 0);
    __decorate([ property({
      type: cc.AudioClip
    }) ], SupperRobotSoundControler.prototype, "soundSpin", void 0);
    __decorate([ property(cc.Node) ], SupperRobotSoundControler.prototype, "soundOff", void 0);
    __decorate([ property(cc.Node) ], SupperRobotSoundControler.prototype, "musicOff", void 0);
    SupperRobotSoundControler = __decorate([ ccclass ], SupperRobotSoundControler);
    exports.SupperRobotSoundControler = SupperRobotSoundControler;
    cc._RF.pop();
  }, {} ],
  "SlotVuongQuocVin.SpinControler": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9838bzgJt9JTJQB4zZyRh/Z", "SlotVuongQuocVin.SpinControler");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.SupperRobotSpinControler = exports.SpinType = exports.SpinMode = void 0;
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
    let SupperRobotSpinControler = class SupperRobotSpinControler extends cc.Component {
      constructor() {
        super(...arguments);
        this.toggleAutoX2 = null;
        this.btnTrial = null;
        this.sprFrameTrialThu = null;
        this.sprFrameTrialThat = null;
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
          this.btnSpin.getComponent(sp.Skeleton).timeScale = 5;
          this.btnSpin.getComponent(sp.Skeleton).setAnimation(0, "press-btspin", false);
          this.spinType.auto = false;
          this.spinType.autox2 = false;
        }
        this.toggleAutoX2.interactable = !this.spinType.autox2;
      }
      setStageButtonSpin(stageStop) {
        this.btnSpin.getComponent(sp.Skeleton).timeScale = 50;
        this.btnSpin.getComponent(sp.Skeleton).setAnimation(0, stageStop ? "chuyen auto" : "press-btspin", false);
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
          this.btnSpin.getComponent(sp.Skeleton).setAnimation(0, "chuyen auto", false);
          this.isHoldSpin = true;
        });
        this.btnSpin.node.on("touchend", touch => {
          cc.log("vao touchend");
          if (this.isHoldSpin) {
            this.isHoldSpin = false;
            if (this.timeHoldSpin < 1) {
              cc.log("time spin", this.timeHoldSpin);
              this.spin(true);
              this.btnSpin.getComponent(sp.Skeleton).setAnimation(0, "press-btspin", false);
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
    __decorate([ property(cc.Toggle) ], SupperRobotSpinControler.prototype, "toggleAutoX2", void 0);
    __decorate([ property(cc.Toggle) ], SupperRobotSpinControler.prototype, "btnTrial", void 0);
    __decorate([ property(cc.SpriteFrame) ], SupperRobotSpinControler.prototype, "sprFrameTrialThu", void 0);
    __decorate([ property(cc.SpriteFrame) ], SupperRobotSpinControler.prototype, "sprFrameTrialThat", void 0);
    __decorate([ property(cc.Button) ], SupperRobotSpinControler.prototype, "btnSpin", void 0);
    __decorate([ property(cc.Button) ], SupperRobotSpinControler.prototype, "btnLine", void 0);
    __decorate([ property(cc.Label) ], SupperRobotSpinControler.prototype, "lblLine", void 0);
    __decorate([ property(cc.Label) ], SupperRobotSpinControler.prototype, "lblBet", void 0);
    __decorate([ property(cc.Button) ], SupperRobotSpinControler.prototype, "btnBet", void 0);
    __decorate([ property(cc.Label) ], SupperRobotSpinControler.prototype, "lblTotalBet", void 0);
    SupperRobotSpinControler = __decorate([ ccclass ], SupperRobotSpinControler);
    exports.SupperRobotSpinControler = SupperRobotSpinControler;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/Tween": void 0
  } ],
  "SlotVuongQuocVin.TrialResult": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "37163bhkGBNFY1pxKtu3JxL", "SlotVuongQuocVin.TrialResult");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const {ccclass: ccclass, property: property} = cc._decorator;
    let SlotVuongQuocVinTrialResult = class SlotVuongQuocVinTrialResult {};
    SlotVuongQuocVinTrialResult.results = [ {
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
      prize: 135e3,
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
      prize: 135e3,
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
      prize: 135e3,
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
      prize: 135e3,
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
      prize: 135e3,
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
      prize: 135e3,
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
      prize: 135e3,
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
      prize: 135e3,
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
      prize: 135e3,
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
      prize: 135e3,
      currentMoney: 10007600
    }, {
      awardsDetail: {
        object: []
      },
      ref: 4829889,
      result: 1,
      matrix: "0,5,3,4,6,4,0,6,6,6,1,6,5,6,0",
      linesWin: "",
      haiSao: "",
      prize: 0,
      currentMoney: 1940709,
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_HAT",
          money: 300,
          lineName: "line11"
        } ]
      },
      ref: 4829893,
      result: 1,
      matrix: "6,1,4,2,5,5,4,1,6,0,3,3,6,5,4",
      linesWin: "11",
      haiSao: "",
      prize: 300,
      currentMoney: 1939009,
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line11"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line15"
        } ]
      },
      ref: 4829897,
      result: 1,
      matrix: "0,2,6,6,3,6,5,4,0,5,5,6,4,2,5",
      linesWin: "11,15",
      haiSao: "",
      prize: 400,
      currentMoney: 1937409,
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_HAT",
          money: 300,
          lineName: "line3"
        }, {
          award: "TRIPLE_HAT",
          money: 300,
          lineName: "line7"
        }, {
          award: "TRIPLE_HAT",
          money: 300,
          lineName: "line11"
        }, {
          award: "TRIPLE_HAT",
          money: 300,
          lineName: "line15"
        } ]
      },
      ref: 4829902,
      result: 1,
      matrix: "6,0,6,6,5,0,4,5,3,5,4,4,2,6,4",
      linesWin: "3,7,11,15",
      haiSao: "",
      prize: 1200,
      currentMoney: 1936609,
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "QUADRA_SCARF",
          money: 1e3,
          lineName: "line11"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line15"
        } ]
      },
      ref: 4829927,
      result: 1,
      matrix: "4,6,5,0,5,3,5,6,3,6,5,6,6,2,5",
      linesWin: "11,15",
      haiSao: "",
      prize: 1200,
      currentMoney: 1935809,
      ratio: 0
    }, {
      awardsDetail: {
        object: []
      },
      ref: 4829930,
      result: 1,
      matrix: "0,6,4,4,5,3,1,0,5,0,6,1,3,5,6",
      linesWin: "",
      haiSao: "",
      prize: 0,
      currentMoney: 1933809,
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_HAT",
          money: 300,
          lineName: "line3"
        }, {
          award: "TRIPLE_FISH",
          money: 400,
          lineName: "line14"
        } ]
      },
      ref: 4829933,
      result: 1,
      matrix: "5,6,6,6,5,3,4,3,2,5,4,4,4,3,0",
      linesWin: "3,14",
      haiSao: "",
      prize: 700,
      currentMoney: 1932509,
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line11"
        } ]
      },
      ref: 4829935,
      result: 1,
      matrix: "6,3,5,4,4,3,5,0,3,6,3,6,1,5,5",
      linesWin: "11",
      haiSao: "",
      prize: 200,
      currentMoney: 1930709,
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line19"
        } ]
      },
      ref: 4829937,
      result: 1,
      matrix: "6,1,4,3,5,6,6,5,0,5,5,4,2,6,4",
      linesWin: "19",
      haiSao: "",
      prize: 200,
      currentMoney: 1928909,
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line3"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line5"
        }, {
          award: "QUADRA_MASK",
          money: 600,
          lineName: "line17"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line18"
        } ]
      },
      ref: 4829940,
      result: 1,
      matrix: "0,6,6,6,2,6,6,4,5,5,5,5,5,2,2",
      linesWin: "3,5,17,18",
      haiSao: "",
      prize: 1200,
      currentMoney: 1928109,
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "QUADRA_MASK",
          money: 600,
          lineName: "line11"
        }, {
          award: "QUADRA_MASK",
          money: 600,
          lineName: "line15"
        }, {
          award: "TRIPLE_FISH",
          money: 400,
          lineName: "line18"
        } ]
      },
      ref: 4829944,
      result: 1,
      matrix: "6,4,4,5,3,0,6,5,6,3,6,6,3,3,6",
      linesWin: "11,15,18",
      haiSao: "",
      prize: 1600,
      currentMoney: 1927709,
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line12"
        } ]
      },
      ref: 4829948,
      result: 1,
      matrix: "6,0,6,4,5,4,4,1,5,6,0,1,5,6,4",
      linesWin: "12",
      haiSao: "",
      prize: 200,
      currentMoney: 1925909,
      ratio: 0
    }, {
      awardsDetail: {
        object: []
      },
      ref: 4829967,
      result: 1,
      matrix: "2,3,0,1,5,4,3,5,6,6,6,6,3,0,4",
      linesWin: "",
      haiSao: "",
      prize: 0,
      currentMoney: 1923909,
      ratio: 0
    }, {
      awardsDetail: {
        object: []
      },
      ref: 4829969,
      result: 1,
      matrix: "4,6,6,1,4,0,0,6,5,5,0,2,6,6,4",
      linesWin: "",
      haiSao: "",
      prize: 0,
      currentMoney: 1921909,
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_HAT",
          money: 300,
          lineName: "line2"
        }, {
          award: "TRIPLE_HAT",
          money: 300,
          lineName: "line6"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line7"
        }, {
          award: "TRIPLE_HAT",
          money: 300,
          lineName: "line12"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line13"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line15"
        }, {
          award: "TRIPLE_HAT",
          money: 300,
          lineName: "line16"
        }, {
          award: "QUADRA_SCARF",
          money: 1e3,
          lineName: "line19"
        } ]
      },
      ref: 4829970,
      result: 1,
      matrix: "4,4,0,5,4,0,4,5,5,6,5,5,6,6,3",
      linesWin: "2,6,7,12,13,15,16,19",
      haiSao: "",
      prize: 2800,
      currentMoney: 1922709,
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_FISH",
          money: 400,
          lineName: "line5"
        }, {
          award: "TRIPLE_FISH",
          money: 400,
          lineName: "line12"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line19"
        } ]
      },
      ref: 4829974,
      result: 1,
      matrix: "3,5,4,0,5,4,3,4,6,3,5,5,3,1,6",
      linesWin: "5,12,19",
      haiSao: "",
      prize: 1e3,
      currentMoney: 1921709,
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line3"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line6"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line7"
        }, {
          award: "QUADRA_SCARF",
          money: 1e3,
          lineName: "line8"
        }, {
          award: "QUADRA_MASK",
          money: 600,
          lineName: "line11"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line12"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line16"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line18"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line19"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line20"
        } ]
      },
      ref: 4829976,
      result: 2,
      matrix: "5,3,6,3,5,0,6,5,3,0,6,5,5,5,6",
      linesWin: "3,6,7,8,11,12,16,18,19,20",
      haiSao: "",
      prize: 3200,
      currentMoney: 1922909,
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "QUADRA_HAT",
          money: 1500,
          lineName: "line2"
        }, {
          award: "TRIPLE_HAT",
          money: 300,
          lineName: "line6"
        }, {
          award: "TRIPLE_HAT",
          money: 300,
          lineName: "line8"
        }, {
          award: "TRIPLE_HAT",
          money: 300,
          lineName: "line11"
        }, {
          award: "TRIPLE_HAT",
          money: 300,
          lineName: "line12"
        }, {
          award: "TRIPLE_HAT",
          money: 300,
          lineName: "line16"
        }, {
          award: "TRIPLE_HAT",
          money: 300,
          lineName: "line20"
        } ]
      },
      ref: 4829990,
      result: 2,
      matrix: "4,4,4,6,4,1,3,6,4,6,0,5,2,5,4",
      linesWin: "2,6,8,11,12,16,20",
      haiSao: "",
      prize: 3300,
      currentMoney: 1924209,
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line1"
        }, {
          award: "TRIPLE_HAT",
          money: 300,
          lineName: "line3"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line4"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line5"
        }, {
          award: "TRIPLE_HAT",
          money: 300,
          lineName: "line7"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line10"
        }, {
          award: "TRIPLE_HAT",
          money: 300,
          lineName: "line12"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line14"
        }, {
          award: "TRIPLE_HAT",
          money: 300,
          lineName: "line15"
        }, {
          award: "TRIPLE_HAT",
          money: 300,
          lineName: "line16"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line17"
        }, {
          award: "TRIPLE_HAT",
          money: 300,
          lineName: "line20"
        } ]
      },
      ref: 4829992,
      result: 2,
      matrix: "5,5,6,3,4,5,5,4,4,5,5,0,4,4,4",
      linesWin: "1,3,4,5,7,10,12,14,15,16,17,20",
      haiSao: "",
      prize: 3e3,
      currentMoney: 1925209,
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_BONUS",
          money: 4e3,
          lineName: "line2"
        }, {
          award: "TRIPLE_FISH",
          money: 400,
          lineName: "line3"
        }, {
          award: "QUADRA_FISH",
          money: 2e3,
          lineName: "line7"
        }, {
          award: "TRIPLE_FISH",
          money: 400,
          lineName: "line15"
        }, {
          award: "TRIPLE_FISH",
          money: 400,
          lineName: "line20"
        } ]
      },
      ref: 4829994,
      result: 5,
      matrix: "4,0,1,1,1,6,3,3,0,5,6,3,6,3,3",
      linesWin: "2,3,7,15,20",
      haiSao: "1,1,1,1,1,1,1,1,1,1,1",
      prize: 7200,
      currentMoney: 1930409,
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_BONUS",
          money: 4e3,
          lineName: "line2"
        }, {
          award: "TRIPLE_FISH",
          money: 400,
          lineName: "line3"
        }, {
          award: "QUADRA_FISH",
          money: 2e3,
          lineName: "line7"
        }, {
          award: "TRIPLE_FISH",
          money: 400,
          lineName: "line15"
        }, {
          award: "TRIPLE_FISH",
          money: 400,
          lineName: "line20"
        } ]
      },
      ref: 4829994,
      result: 5,
      matrix: "4,0,1,1,1,6,3,3,0,5,6,3,6,3,3",
      linesWin: "2,3,7,15,20",
      haiSao: "1,1,1,1,1,1,1,1,1,1,1",
      prize: 7200,
      currentMoney: 1930409,
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_BONUS",
          money: 4e3,
          lineName: "line2"
        }, {
          award: "TRIPLE_FISH",
          money: 400,
          lineName: "line3"
        }, {
          award: "QUADRA_FISH",
          money: 2e3,
          lineName: "line7"
        }, {
          award: "TRIPLE_FISH",
          money: 400,
          lineName: "line15"
        }, {
          award: "TRIPLE_FISH",
          money: 400,
          lineName: "line20"
        } ]
      },
      ref: 4829994,
      result: 5,
      matrix: "4,0,1,1,1,6,3,3,0,5,6,3,6,3,3",
      linesWin: "2,3,7,15,20",
      haiSao: "1,1,1,1,1,1,1,1,1,1,1",
      prize: 7200,
      currentMoney: 1930409,
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_FISH",
          money: 400,
          lineName: "line1"
        }, {
          award: "QUADRA_SCARF",
          money: 1e3,
          lineName: "line3"
        }, {
          award: "TRIPLE_FISH",
          money: 400,
          lineName: "line4"
        }, {
          award: "TRIPLE_FISH",
          money: 400,
          lineName: "line5"
        }, {
          award: "QUADRA_SCARF",
          money: 1e3,
          lineName: "line7"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line8"
        }, {
          award: "TRIPLE_FISH",
          money: 400,
          lineName: "line10"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line11"
        }, {
          award: "TRIPLE_FISH",
          money: 400,
          lineName: "line13"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line15"
        }, {
          award: "TRIPLE_FISH",
          money: 400,
          lineName: "line17"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line19"
        } ]
      },
      ref: 4959671,
      result: 1,
      matrix: "3,6,0,3,5,3,3,6,5,3,5,5,0,5,5",
      linesWin: "1,3,4,5,7,8,10,11,13,15,17,19",
      haiSao: "",
      prize: 5200,
      currentMoney: 39936100,
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_HAT",
          money: 300,
          lineName: "line1"
        }, {
          award: "PENTA_MASK",
          money: 3e3,
          lineName: "line2"
        }, {
          award: "TRIPLE_HAT",
          money: 300,
          lineName: "line4"
        }, {
          award: "TRIPLE_HAT",
          money: 300,
          lineName: "line5"
        }, {
          award: "QUADRA_MASK",
          money: 600,
          lineName: "line6"
        } ]
      },
      ref: 4959706,
      result: 1,
      matrix: "6,6,6,6,6,0,4,3,4,4,5,5,3,3,1",
      linesWin: "1,2,4,5,6",
      haiSao: "",
      prize: 4500,
      currentMoney: 39908500,
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line1"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line6"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line7"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line9"
        }, {
          award: "QUADRA_SCARF",
          money: 1e3,
          lineName: "line10"
        }, {
          award: "QUADRA_SCARF",
          money: 1e3,
          lineName: "line13"
        }, {
          award: "PENTA_SCARF",
          money: 7500,
          lineName: "line14"
        }, {
          award: "QUADRA_SCARF",
          money: 1e3,
          lineName: "line17"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line18"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line19"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line20"
        } ]
      },
      ref: 4959721,
      result: 2,
      matrix: "4,5,6,5,0,5,6,5,6,5,5,0,6,5,4",
      linesWin: "1,6,7,9,10,13,14,17,18,19,20",
      haiSao: "",
      prize: 11900,
      currentMoney: 39903800,
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line5"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line10"
        }, {
          award: "TRIPLE_BONUS",
          money: 5600,
          lineName: "line18"
        } ]
      },
      ref: 4959722,
      result: 5,
      matrix: "4,6,4,5,6,5,5,3,6,1,3,1,5,1,0",
      linesWin: "5,10,18",
      haiSao: "1,1,1,4,1,1,1,1,1,1,1",
      prize: 6e3,
      currentMoney: 39907800,
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line5"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line10"
        }, {
          award: "TRIPLE_BONUS",
          money: 5600,
          lineName: "line18"
        } ]
      },
      ref: 4959722,
      result: 5,
      matrix: "4,6,4,5,6,5,5,3,6,1,3,1,5,1,0",
      linesWin: "5,10,18",
      haiSao: "1,1,1,4,1,1,1,1,1,1,1",
      prize: 6e3,
      currentMoney: 39907800,
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line5"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line10"
        }, {
          award: "TRIPLE_BONUS",
          money: 5600,
          lineName: "line18"
        } ]
      },
      ref: 4959722,
      result: 5,
      matrix: "4,6,4,5,6,5,5,3,6,1,3,1,5,1,0",
      linesWin: "5,10,18",
      haiSao: "1,1,1,4,1,1,1,1,1,1,1",
      prize: 6e3,
      currentMoney: 39907800,
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line5"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line10"
        }, {
          award: "TRIPLE_BONUS",
          money: 5600,
          lineName: "line18"
        } ]
      },
      ref: 4959722,
      result: 5,
      matrix: "4,6,4,5,6,5,5,3,6,1,3,1,5,1,0",
      linesWin: "5,10,18",
      haiSao: "1,1,1,4,1,1,1,1,1,1,1",
      prize: 6e3,
      currentMoney: 39907800,
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line5"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line10"
        }, {
          award: "TRIPLE_BONUS",
          money: 5600,
          lineName: "line18"
        } ]
      },
      ref: 4959722,
      result: 5,
      matrix: "4,6,4,5,6,5,5,3,6,1,3,1,5,1,0",
      linesWin: "5,10,18",
      haiSao: "1,1,1,4,1,1,1,1,1,1,1",
      prize: 6e3,
      currentMoney: 39907800,
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "QUADRA_MASK",
          money: 600,
          lineName: "line6"
        }, {
          award: "QUADRA_MASK",
          money: 600,
          lineName: "line13"
        }, {
          award: "PENTA_MASK",
          money: 3e3,
          lineName: "line19"
        } ]
      },
      ref: 4959723,
      result: 1,
      matrix: "6,1,4,6,6,6,5,6,5,3,6,6,0,1,0",
      linesWin: "6,13,19",
      haiSao: "",
      prize: 4200,
      currentMoney: 3991e4,
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "QUADRA_SCARF",
          money: 1e3,
          lineName: "line2"
        }, {
          award: "QUADRA_SCARF",
          money: 1e3,
          lineName: "line6"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line7"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line8"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line9"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line10"
        }, {
          award: "QUADRA_SCARF",
          money: 1e3,
          lineName: "line13"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line14"
        }, {
          award: "QUADRA_SCARF",
          money: 1e3,
          lineName: "line17"
        }, {
          award: "PENTA_SCARF",
          money: 7500,
          lineName: "line19"
        } ]
      },
      ref: 4959727,
      result: 2,
      matrix: "3,5,5,5,5,6,6,5,6,5,5,5,3,0,4",
      linesWin: "2,6,7,8,9,10,13,14,17,19",
      haiSao: "",
      prize: 12500,
      currentMoney: 39915800,
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "QUADRA_HAT",
          money: 1500,
          lineName: "line1"
        }, {
          award: "TRIPLE_HAT",
          money: 300,
          lineName: "line4"
        }, {
          award: "TRIPLE_HAT",
          money: 300,
          lineName: "line5"
        }, {
          award: "TRIPLE_HAT",
          money: 300,
          lineName: "line11"
        }, {
          award: "QUADRA_HAT",
          money: 1500,
          lineName: "line15"
        }, {
          award: "TRIPLE_HAT",
          money: 300,
          lineName: "line16"
        } ]
      },
      ref: 4959728,
      result: 1,
      matrix: "6,0,3,3,6,6,4,4,4,4,5,5,6,6,4",
      linesWin: "1,4,5,11,15,16",
      haiSao: "",
      prize: 4200,
      currentMoney: 39918e3,
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "QUADRA_MASK",
          money: 600,
          lineName: "line1"
        }, {
          award: "TRIPLE_HAT",
          money: 300,
          lineName: "line3"
        }, {
          award: "QUADRA_MASK",
          money: 600,
          lineName: "line6"
        }, {
          award: "QUADRA_MASK",
          money: 600,
          lineName: "line10"
        }, {
          award: "TRIPLE_HAT",
          money: 300,
          lineName: "line12"
        }, {
          award: "QUADRA_MASK",
          money: 600,
          lineName: "line13"
        }, {
          award: "QUADRA_MASK",
          money: 600,
          lineName: "line14"
        }, {
          award: "QUADRA_MASK",
          money: 600,
          lineName: "line17"
        }, {
          award: "QUADRA_MASK",
          money: 600,
          lineName: "line19"
        } ]
      },
      ref: 4959745,
      result: 1,
      matrix: "4,6,1,6,6,6,6,6,4,6,6,4,4,0,4",
      linesWin: "1,3,6,10,12,13,14,17,19",
      haiSao: "",
      prize: 4800,
      currentMoney: 39908400,
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "QUADRA_MASK",
          money: 600,
          lineName: "line10"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line11"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line12"
        }, {
          award: "QUADRA_MASK",
          money: 600,
          lineName: "line13"
        }, {
          award: "PENTA_MASK",
          money: 3e3,
          lineName: "line14"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line15"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line16"
        }, {
          award: "QUADRA_MASK",
          money: 600,
          lineName: "line17"
        } ]
      },
      ref: 4959751,
      result: 1,
      matrix: "5,6,0,6,4,6,5,6,5,6,6,2,4,6,5",
      linesWin: "10,11,12,13,14,15,16,17",
      haiSao: "",
      prize: 5600,
      currentMoney: 39910700,
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "QUADRA_SCARF",
          money: 1e3,
          lineName: "line3"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line4"
        }, {
          award: "QUADRA_SCARF",
          money: 1e3,
          lineName: "line7"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line8"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line9"
        }, {
          award: "QUADRA_SCARF",
          money: 1e3,
          lineName: "line11"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line13"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line15"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line17"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line18"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line19"
        } ]
      },
      ref: 4959754,
      result: 1,
      matrix: "3,4,5,5,6,5,0,6,5,4,5,5,6,5,5",
      linesWin: "3,4,7,8,9,11,13,15,17,18,19",
      haiSao: "",
      prize: 4600,
      currentMoney: 39909500,
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "QUADRA_MASK",
          money: 600,
          lineName: "line1"
        }, {
          award: "QUADRA_MASK",
          money: 600,
          lineName: "line4"
        }, {
          award: "PENTA_MASK",
          money: 3e3,
          lineName: "line5"
        }, {
          award: "QUADRA_MASK",
          money: 600,
          lineName: "line12"
        }, {
          award: "QUADRA_MASK",
          money: 600,
          lineName: "line18"
        } ]
      },
      ref: 4959764,
      result: 1,
      matrix: "3,5,3,0,6,6,6,5,6,6,2,2,6,6,3",
      linesWin: "1,4,5,12,18",
      haiSao: "",
      prize: 5400,
      currentMoney: 39904600,
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line1"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line7"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line9"
        }, {
          award: "QUADRA_SCARF",
          money: 1e3,
          lineName: "line11"
        }, {
          award: "PENTA_SCARF",
          money: 7500,
          lineName: "line15"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line16"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line19"
        } ]
      },
      ref: 4959766,
      result: 2,
      matrix: "3,6,3,5,0,3,5,5,5,4,5,4,6,6,5",
      linesWin: "1,7,9,11,15,16,19",
      haiSao: "",
      prize: 9500,
      currentMoney: 39911e3,
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "QUADRA_SCARF",
          money: 1e3,
          lineName: "line3"
        }, {
          award: "QUADRA_SCARF",
          money: 1e3,
          lineName: "line7"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line8"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line9"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line10"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line13"
        }, {
          award: "QUADRA_SCARF",
          money: 1e3,
          lineName: "line14"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line17"
        }, {
          award: "QUADRA_SCARF",
          money: 1e3,
          lineName: "line18"
        }, {
          award: "QUADRA_SCARF",
          money: 1e3,
          lineName: "line20"
        } ]
      },
      ref: 4959778,
      result: 1,
      matrix: "0,5,5,4,6,3,6,5,0,5,2,5,5,5,5",
      linesWin: "3,7,8,9,10,13,14,17,18,20",
      haiSao: "",
      prize: 6e3,
      currentMoney: 39908500,
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "QUADRA_SCARF",
          money: 1e3,
          lineName: "line2"
        }, {
          award: "QUADRA_SCARF",
          money: 1e3,
          lineName: "line3"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line6"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line7"
        }, {
          award: "QUADRA_SCARF",
          money: 1e3,
          lineName: "line8"
        }, {
          award: "QUADRA_SCARF",
          money: 1e3,
          lineName: "line9"
        }, {
          award: "QUADRA_SCARF",
          money: 1e3,
          lineName: "line10"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line13"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line14"
        }, {
          award: "QUADRA_SCARF",
          money: 1e3,
          lineName: "line17"
        }, {
          award: "QUADRA_SCARF",
          money: 1e3,
          lineName: "line18"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line19"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line20"
        } ]
      },
      ref: 4959782,
      result: 2,
      matrix: "0,5,5,5,5,5,3,4,4,0,0,5,5,5,5",
      linesWin: "2,3,6,7,8,9,10,13,14,17,18,19,20",
      haiSao: "",
      prize: 8200,
      currentMoney: 39910100,
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line1"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line2"
        }, {
          award: "QUADRA_SCARF",
          money: 1e3,
          lineName: "line6"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line8"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line10"
        }, {
          award: "TRIPLE_FISH",
          money: 400,
          lineName: "line11"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line13"
        }, {
          award: "PENTA_SCARF",
          money: 7500,
          lineName: "line14"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line16"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line17"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line18"
        }, {
          award: "QUADRA_SCARF",
          money: 1e3,
          lineName: "line20"
        } ]
      },
      ref: 4959823,
      result: 2,
      matrix: "5,5,3,4,5,5,3,5,6,5,4,0,6,5,3",
      linesWin: "1,2,6,8,10,11,13,14,16,17,18,20",
      haiSao: "",
      prize: 11500,
      currentMoney: 39884e3,
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "PENTA_MASK",
          money: 3e3,
          lineName: "line1"
        }, {
          award: "PENTA_MASK",
          money: 3e3,
          lineName: "line4"
        }, {
          award: "QUADRA_MASK",
          money: 600,
          lineName: "line5"
        }, {
          award: "PENTA_MASK",
          money: 3e3,
          lineName: "line13"
        }, {
          award: "QUADRA_MASK",
          money: 600,
          lineName: "line17"
        } ]
      },
      ref: 4959829,
      result: 2,
      matrix: "1,0,6,6,5,6,6,6,6,6,4,6,5,1,3",
      linesWin: "1,4,5,13,17",
      haiSao: "",
      prize: 10200,
      currentMoney: 39888800,
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "QUADRA_SCARF",
          money: 1e3,
          lineName: "line1"
        }, {
          award: "QUADRA_SCARF",
          money: 1e3,
          lineName: "line3"
        }, {
          award: "QUADRA_SCARF",
          money: 1e3,
          lineName: "line4"
        }, {
          award: "QUADRA_SCARF",
          money: 1e3,
          lineName: "line5"
        }, {
          award: "QUADRA_SCARF",
          money: 1e3,
          lineName: "line7"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line9"
        }, {
          award: "PENTA_SCARF",
          money: 7500,
          lineName: "line11"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line12"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line14"
        }, {
          award: "PENTA_SCARF",
          money: 7500,
          lineName: "line15"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line16"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line18"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line20"
        } ]
      },
      ref: 4959833,
      result: 2,
      matrix: "0,6,5,6,6,5,5,5,5,0,5,0,5,5,5",
      linesWin: "1,3,4,5,7,9,11,12,14,15,16,18,20",
      haiSao: "",
      prize: 21200,
      currentMoney: 39907e3,
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line2"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line8"
        }, {
          award: "TRIPLE_FISH",
          money: 400,
          lineName: "line9"
        }, {
          award: "QUADRA_FISH",
          money: 2e3,
          lineName: "line11"
        }, {
          award: "QUADRA_FISH",
          money: 2e3,
          lineName: "line15"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line17"
        } ]
      },
      ref: 4959838,
      result: 1,
      matrix: "5,3,5,5,4,6,3,0,3,5,3,6,6,5,3",
      linesWin: "2,8,9,11,15,17",
      haiSao: "",
      prize: 5e3,
      currentMoney: 39904300,
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_FISH",
          money: 400,
          lineName: "line2"
        }, {
          award: "TRIPLE_FISH",
          money: 400,
          lineName: "line3"
        }, {
          award: "TRIPLE_FISH",
          money: 400,
          lineName: "line7"
        }, {
          award: "QUADRA_FISH",
          money: 2e3,
          lineName: "line8"
        }, {
          award: "TRIPLE_FISH",
          money: 400,
          lineName: "line11"
        }, {
          award: "QUADRA_FISH",
          money: 2e3,
          lineName: "line19"
        } ]
      },
      ref: 4959841,
      result: 1,
      matrix: "6,6,3,3,3,4,3,5,4,5,3,3,0,3,4",
      linesWin: "2,3,7,8,11,19",
      haiSao: "",
      prize: 5600,
      currentMoney: 39903900,
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line1"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line3"
        }, {
          award: "QUADRA_SCARF",
          money: 1e3,
          lineName: "line4"
        }, {
          award: "QUADRA_SCARF",
          money: 1e3,
          lineName: "line5"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line9"
        }, {
          award: "QUADRA_SCARF",
          money: 1e3,
          lineName: "line10"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line11"
        }, {
          award: "QUADRA_SCARF",
          money: 1e3,
          lineName: "line14"
        }, {
          award: "QUADRA_SCARF",
          money: 1e3,
          lineName: "line17"
        }, {
          award: "QUADRA_SCARF",
          money: 1e3,
          lineName: "line18"
        } ]
      },
      ref: 4959843,
      result: 1,
      matrix: "3,5,5,6,0,5,6,4,5,5,5,1,5,5,0",
      linesWin: "1,3,4,5,9,10,11,14,17,18",
      haiSao: "",
      prize: 6800,
      currentMoney: 39907100,
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line2"
        }, {
          award: "QUADRA_SCARF",
          money: 1e3,
          lineName: "line3"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line7"
        }, {
          award: "PENTA_SCARF",
          money: 7500,
          lineName: "line8"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line11"
        }, {
          award: "QUADRA_SCARF",
          money: 1e3,
          lineName: "line12"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line16"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line18"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line20"
        } ]
      },
      ref: 4959846,
      result: 2,
      matrix: "5,6,5,0,5,4,3,6,5,4,6,5,5,5,5",
      linesWin: "2,3,7,8,11,12,16,18,20",
      haiSao: "",
      prize: 10700,
      currentMoney: 39913800,
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line1"
        }, {
          award: "QUADRA_SCARF",
          money: 1e3,
          lineName: "line3"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line4"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line5"
        }, {
          award: "QUADRA_SCARF",
          money: 1e3,
          lineName: "line7"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line11"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line13"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line14"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line15"
        }, {
          award: "QUADRA_SCARF",
          money: 1e3,
          lineName: "line18"
        } ]
      },
      ref: 4959856,
      result: 1,
      matrix: "1,6,6,0,6,5,5,4,2,5,5,5,0,5,5",
      linesWin: "1,3,4,5,7,11,13,14,15,18",
      haiSao: "",
      prize: 4400,
      currentMoney: 39912e3,
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line1"
        }, {
          award: "QUADRA_SCARF",
          money: 1e3,
          lineName: "line4"
        }, {
          award: "QUADRA_SCARF",
          money: 1e3,
          lineName: "line5"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line9"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line10"
        }, {
          award: "QUADRA_SCARF",
          money: 1e3,
          lineName: "line11"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line12"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line15"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line17"
        } ]
      },
      ref: 4959863,
      result: 1,
      matrix: "4,0,5,5,4,5,5,3,5,3,4,6,5,0,5",
      linesWin: "1,4,5,9,10,11,12,15,17",
      haiSao: "",
      prize: 4200,
      currentMoney: 39909800,
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line2"
        }, {
          award: "QUADRA_SCARF",
          money: 1e3,
          lineName: "line3"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line7"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line8"
        }, {
          award: "QUADRA_SCARF",
          money: 1e3,
          lineName: "line9"
        }, {
          award: "QUADRA_SCARF",
          money: 1e3,
          lineName: "line11"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line12"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line15"
        }, {
          award: "QUADRA_SCARF",
          money: 1e3,
          lineName: "line20"
        } ]
      },
      ref: 4959883,
      result: 1,
      matrix: "5,5,5,6,4,3,5,3,4,0,5,4,5,5,5",
      linesWin: "2,3,7,8,9,11,12,15,20",
      haiSao: "",
      prize: 5e3,
      currentMoney: 39892800,
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "QUADRA_SCARF",
          money: 1e3,
          lineName: "line1"
        }, {
          award: "QUADRA_SCARF",
          money: 1e3,
          lineName: "line4"
        }, {
          award: "QUADRA_SCARF",
          money: 1e3,
          lineName: "line5"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line10"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line11"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line13"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line14"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line15"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line17"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line18"
        } ]
      },
      ref: 4959891,
      result: 1,
      matrix: "0,6,5,4,6,5,6,5,5,5,1,4,5,3,5",
      linesWin: "1,4,5,10,11,13,14,15,17,18",
      haiSao: "",
      prize: 4400,
      currentMoney: 39886300,
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line2"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line3"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line4"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line7"
        }, {
          award: "QUADRA_SCARF",
          money: 1e3,
          lineName: "line9"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line10"
        }, {
          award: "QUADRA_SCARF",
          money: 1e3,
          lineName: "line11"
        }, {
          award: "TRIPLE_HAT",
          money: 300,
          lineName: "line12"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line14"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line15"
        }, {
          award: "QUADRA_SCARF",
          money: 1e3,
          lineName: "line17"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line20"
        } ]
      },
      ref: 4959893,
      result: 1,
      matrix: "4,5,5,5,6,5,4,6,5,0,5,6,4,5,5",
      linesWin: "2,3,4,7,9,10,11,12,14,15,17,20",
      haiSao: "",
      prize: 4900,
      currentMoney: 39888200,
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line2"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line4"
        }, {
          award: "QUADRA_SCARF",
          money: 1e3,
          lineName: "line10"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line13"
        }, {
          award: "QUADRA_SCARF",
          money: 1e3,
          lineName: "line14"
        }, {
          award: "PENTA_SCARF",
          money: 7500,
          lineName: "line17"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line18"
        } ]
      },
      ref: 4959903,
      result: 2,
      matrix: "1,5,5,5,4,5,3,1,2,5,6,0,1,5,0",
      linesWin: "2,4,10,13,14,17,18",
      haiSao: "",
      prize: 10300,
      currentMoney: 39886400,
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line1"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line2"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line5"
        }, {
          award: "QUADRA_SCARF",
          money: 1e3,
          lineName: "line6"
        }, {
          award: "QUADRA_SCARF",
          money: 1e3,
          lineName: "line9"
        }, {
          award: "QUADRA_SCARF",
          money: 1e3,
          lineName: "line10"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line12"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line13"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line14"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line15"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line16"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line17"
        }, {
          award: "QUADRA_SCARF",
          money: 1e3,
          lineName: "line20"
        } ]
      },
      ref: 4959917,
      result: 1,
      matrix: "5,5,6,5,4,4,5,5,4,5,0,3,5,2,5",
      linesWin: "1,2,5,6,9,10,12,13,14,15,16,17,20",
      haiSao: "",
      prize: 5800,
      currentMoney: 39877700,
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "QUADRA_SCARF",
          money: 1e3,
          lineName: "line2"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line3"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line6"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line7"
        }, {
          award: "QUADRA_SCARF",
          money: 1e3,
          lineName: "line8"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line9"
        }, {
          award: "QUADRA_SCARF",
          money: 1e3,
          lineName: "line11"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line12"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line15"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line16"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line19"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line20"
        } ]
      },
      ref: 4959983,
      result: 1,
      matrix: "5,6,5,5,5,4,5,6,3,6,5,6,6,5,5",
      linesWin: "2,3,6,7,8,9,11,12,15,16,19,20",
      haiSao: "",
      prize: 4800,
      currentMoney: 39821500,
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "QUADRA_MASK",
          money: 600,
          lineName: "line1"
        }, {
          award: "QUADRA_MASK",
          money: 600,
          lineName: "line5"
        }, {
          award: "QUADRA_MASK",
          money: 600,
          lineName: "line6"
        }, {
          award: "QUADRA_MASK",
          money: 600,
          lineName: "line9"
        }, {
          award: "QUADRA_MASK",
          money: 600,
          lineName: "line10"
        }, {
          award: "QUADRA_MASK",
          money: 600,
          lineName: "line12"
        }, {
          award: "QUADRA_MASK",
          money: 600,
          lineName: "line14"
        }, {
          award: "QUADRA_MASK",
          money: 600,
          lineName: "line15"
        }, {
          award: "QUADRA_MASK",
          money: 600,
          lineName: "line16"
        }, {
          award: "QUADRA_MASK",
          money: 600,
          lineName: "line20"
        } ]
      },
      ref: 4959986,
      result: 1,
      matrix: "6,6,5,3,6,6,6,6,5,6,6,5,6,3,6",
      linesWin: "1,5,6,9,10,12,14,15,16,20",
      haiSao: "",
      prize: 6e3,
      currentMoney: 39822700,
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "QUADRA_SCARF",
          money: 1e3,
          lineName: "line1"
        }, {
          award: "QUADRA_SCARF",
          money: 1e3,
          lineName: "line4"
        }, {
          award: "QUADRA_SCARF",
          money: 1e3,
          lineName: "line5"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line10"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line11"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line12"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line13"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line14"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line15"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line16"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line17"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line18"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line20"
        } ]
      },
      ref: 4959991,
      result: 1,
      matrix: "5,5,6,6,6,5,5,4,5,5,2,5,6,6,5",
      linesWin: "1,4,5,10,11,12,13,14,15,16,17,18,20",
      haiSao: "",
      prize: 5e3,
      currentMoney: 39820700,
      ratio: 0
    }, {
      awardsDetail: {
        object: [ {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line1"
        }, {
          award: "QUADRA_SCARF",
          money: 1e3,
          lineName: "line4"
        }, {
          award: "QUADRA_SCARF",
          money: 1e3,
          lineName: "line5"
        }, {
          award: "TRIPLE_HAT",
          money: 300,
          lineName: "line7"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line8"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line10"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line12"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line14"
        }, {
          award: "TRIPLE_SCARF",
          money: 200,
          lineName: "line17"
        }, {
          award: "QUADRA_SCARF",
          money: 1e3,
          lineName: "line18"
        }, {
          award: "TRIPLE_HAT",
          money: 300,
          lineName: "line19"
        } ]
      },
      ref: 4960008,
      result: 1,
      matrix: "5,6,5,6,0,5,5,4,6,5,4,4,5,5,0",
      linesWin: "1,4,5,7,8,10,12,14,17,18,19",
      haiSao: "",
      prize: 4800,
      currentMoney: 39809100,
      ratio: 0
    } ];
    SlotVuongQuocVinTrialResult = __decorate([ ccclass ], SlotVuongQuocVinTrialResult);
    exports.default = SlotVuongQuocVinTrialResult;
    cc._RF.pop();
  }, {} ]
}, {}, [ "SlotVuongQuocVin.Bonus", "SlotVuongQuocVin.ChooseLine", "SlotVuongQuocVin.Cmd", "SlotVuongQuocVin.Controller", "SlotVuongQuocVin.Guide", "SlotVuongQuocVin.History", "SlotVuongQuocVin.HistoryJackpot", "SlotVuongQuocVin.Icon", "SlotVuongQuocVin.SoundControler", "SlotVuongQuocVin.SpinControler", "SlotVuongQuocVin.TrialResult" ]);