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
  "Slot3x3.Cmd": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1fedewLD5tJuK+YssJ4x/DR", "Slot3x3.Cmd");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.cmd = void 0;
    const Network_OutPacket_1 = require("../../Main/Game/src/networks/Network.OutPacket");
    const Network_InPacket_1 = require("../../Main/Game/src/networks/Network.InPacket");
    const Constants_1 = require("../../Main/Game/src/common/Constants");
    var cmd;
    (function(cmd) {
      class Code {}
      Code.SPIN = 7001;
      Code.UPDATE_JACKPOT = 7002;
      Code.SCRIBE = 7003;
      Code.UNSCRIBE = 7004;
      Code.CHANGE_ROOM = 7005;
      Code.SUBCRIBE_RESPONSE = 7009;
      cmd.Code = Code;
      class SendScribe extends Network_OutPacket_1.default {
        constructor(betIdx) {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.SCRIBE);
          this.packHeader();
          this.putByte(betIdx);
          this.updateSize();
        }
      }
      cmd.SendScribe = SendScribe;
      class SendUnScribe extends Network_OutPacket_1.default {
        constructor(betIdx) {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.UNSCRIBE);
          this.packHeader();
          this.putByte(betIdx);
          this.updateSize();
        }
      }
      cmd.SendUnScribe = SendUnScribe;
      class SendChangeRoom extends Network_OutPacket_1.default {
        constructor(oldBetIdx, newBetIdx) {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.CHANGE_ROOM);
          this.packHeader();
          this.putByte(oldBetIdx);
          this.putByte(newBetIdx);
          this.updateSize();
        }
      }
      cmd.SendChangeRoom = SendChangeRoom;
      class SendSpin extends Network_OutPacket_1.default {
        constructor(betValue, betLines) {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.SPIN);
          this.packHeader();
          this.putInt(betValue);
          this.putString(betLines);
          this.updateSize();
        }
      }
      cmd.SendSpin = SendSpin;
      class ReceiveUpdateJackpot extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.value = 0;
          this.x2 = 0;
          this.value = this.getLong();
          this.x2 = this.getByte();
        }
      }
      cmd.ReceiveUpdateJackpot = ReceiveUpdateJackpot;
      class ReceiveSpin extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.result = 0;
          this.matrix = "";
          this.linesWin = "";
          this.prize = 0;
          this.currentMoney = 0;
          this.desc = "";
          this.suggestionActions = [];
          this.result = this.getByte();
          this.matrix = this.getString();
          this.linesWin = this.getString();
          this.prize = this.getLong();
          this.currentMoney = this.getLong();
          this.desc = this.getString();
          let actionsStr = this.getString();
          if (actionsStr) {
            let actions = JSON.parse(actionsStr);
            (null === actions || void 0 === actions ? void 0 : actions.hasOwnProperty("object")) && Array.isArray(actions["object"]) && (this.suggestionActions = Constants_1.UserActions.toEnums(actions["object"]));
          }
        }
      }
      cmd.ReceiveSpin = ReceiveSpin;
      class ReceiveSubcribe extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.data = "";
          this.data = this.getString();
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
  "Slot3x3.PopupHistory": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9ed9es2x7dPjowc9D1zGIrY", "Slot3x3.PopupHistory");
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
    const Http_1 = require("../../Main/Game/src/common/Http");
    const Configs_1 = require("../../Main/Game/src/common/Configs");
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
          c: 134,
          mt: Configs_1.default.App.MONEY_TYPE,
          p: this.page,
          un: Configs_1.default.Login.Nickname
        }, (err, res) => {
          App_1.default.instance.showLoading(false);
          if (null != err) return;
          if (res["success"]) {
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
                item.getChildByName("Bet").getComponent(cc.Label).string = Utils_1.default.formatMoney(itemData["bv"]);
                item.getChildByName("LineBet").getComponent(cc.Label).string = "" == itemData["lb"] ? 0 : itemData["lb"].split(",").length;
                item.getChildByName("LineWin").getComponent(cc.Label).string = "" == itemData["lb"] ? 0 : itemData["lw"].split(",").length;
                item.getChildByName("Result").getComponent(cc.Label).string = Utils_1.default.formatMoney(itemData["pz"]);
                item.active = true;
              } else item.active = false;
            }
          }
        });
      }
    };
    __decorate([ property(cc.Label) ], PopupHistory.prototype, "lblPage", void 0);
    __decorate([ property(cc.Node) ], PopupHistory.prototype, "itemTemplate", void 0);
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
  "Slot3x3.PopupHonors": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9b0a7bB/KFOIYD7clUi6Y2b", "Slot3x3.PopupHonors");
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
    const Http_1 = require("../../Main/Game/src/common/Http");
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const ErrorLogger_1 = require("../../Main/Game/src/common/ErrorLogger");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let PopupHonors = class PopupHonors extends Dialog_1.default {
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
          c: 135,
          mt: Configs_1.default.App.MONEY_TYPE,
          p: this.page
        }, (err, res) => {
          App_1.default.instance.showLoading(false);
          if (null != err) return;
          cc.log(res);
          try {
            if (res["success"]) {
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
                  let dataVip = res["listUserVipRank"] && res["listUserVipRank"].find(data => data.nickname == itemData["un"]);
                  item.active = false;
                  item.getChildByName("bg").opacity = i % 2 == 0 ? 10 : 0;
                  item.getChildByName("Time").getComponent(cc.Label).string = itemData["ts"].replace(" ", "\n");
                  item.getChildByName("name").getChildByName("lblAccount").getComponent(cc.Label).string = itemData["un"].length > 11 ? itemData["un"].substr(0, 10) + "..." : itemData["un"];
                  item.getChildByName("name").getChildByName("lblAccount").color = dataVip ? cc.Color.BLACK.fromHEX(Utils_1.default.getColorVip(dataVip.rank)) : cc.Color.BLACK.fromHEX(Utils_1.default.getColorVip("VIP_0"));
                  item.getChildByName("name").getChildByName("lblAccount").getComponent(cc.LabelOutline).color = dataVip ? cc.Color.BLACK.fromHEX(Utils_1.default.getColorVip(dataVip.rank)) : cc.Color.BLACK.fromHEX(Utils_1.default.getColorVip("VIP_0"));
                  item.getChildByName("name").getChildByName("vip").getComponent(cc.Sprite).spriteFrame = this.atlasVip.getSpriteFrame(dataVip.rank);
                  item.getChildByName("Bet").getComponent(cc.Label).string = Utils_1.default.formatMoney(itemData["bv"]);
                  item.getChildByName("Win").getComponent(cc.Label).string = Utils_1.default.formatMoney(itemData["pz"]);
                  item.active = true;
                  switch (itemData["rs"]) {
                   case 1:
                    item.getChildByName("Result").getComponent(cc.Label).string = "Th\u1eafng";
                    break;

                   case 2:
                    item.getChildByName("Result").getComponent(cc.Label).string = "Th\u1eafng  l\u1edbn";
                    break;

                   case 3:
                    item.getChildByName("Result").getComponent(cc.Label).string = "N\u1ed5 H\u0169";
                    break;

                   case 4:
                    item.getChildByName("Result").getComponent(cc.Label).string = "N\u1ed5 H\u0169 X2";
                    break;

                   default:
                    item.getChildByName("Result").getComponent(cc.Label).string = "Tr\u01b0\u1ee3t";
                    item.active = false;
                  }
                  item.position = cc.v3(cc.winSize.width, 400);
                  item.stopAllActions();
                  let speed = .7;
                  item.runAction(cc.sequence(cc.delayTime(.15 * (this.items.length - i) * speed), cc.moveTo(.15 * speed, cc.v2(0, 400)), cc.delayTime(.05), cc.moveTo(.2 * speed * (1 === i ? .8 : 1 - Math.pow(2, -10 * i)), cc.v2(0, 380 - 85 * i)).easing(cc.easeCircleActionOut())));
                } else item.active = false;
              }
            }
          } catch (error) {
            ErrorLogger_1.ErrorLogger.sendLogError("Http response", "PokeGo honor", JSON.stringify(res) + "\n" + JSON.stringify(error.stack));
          }
        });
      }
    };
    __decorate([ property(cc.Label) ], PopupHonors.prototype, "lblPage", void 0);
    __decorate([ property(cc.Node) ], PopupHonors.prototype, "itemTemplate", void 0);
    __decorate([ property(cc.SpriteAtlas) ], PopupHonors.prototype, "atlasVip", void 0);
    PopupHonors = __decorate([ ccclass ], PopupHonors);
    exports.default = PopupHonors;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/App": void 0,
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/common/Dialog": void 0,
    "../../Main/Game/src/common/ErrorLogger": void 0,
    "../../Main/Game/src/common/Http": void 0,
    "../../Main/Game/src/common/Utils": void 0
  } ],
  "Slot3x3.PopupSelectLine": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "91e6cYmfSdJsK5BlQ9QfNHq", "Slot3x3.PopupSelectLine");
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
    const {ccclass: ccclass, property: property} = cc._decorator;
    let PopupSelectLine = class PopupSelectLine extends Dialog_1.default {
      constructor() {
        super(...arguments);
        this.buttonsLine = null;
        this.btnClose = null;
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
    PopupSelectLine = __decorate([ ccclass ], PopupSelectLine);
    exports.default = PopupSelectLine;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/Dialog": void 0
  } ],
  "Slot3x3.Slot3x3Controller": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "80078ySa8dLVq8BknsW4brd", "Slot3x3.Slot3x3Controller");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.SpinType = exports.SpinMode = exports.ButtonBet = void 0;
    const Slot3x3_Cmd_1 = require("./Slot3x3.Cmd");
    const Slot3x3_PopupSelectLine_1 = require("./Slot3x3.PopupSelectLine");
    const MiniGame_1 = require("../../Main/Lobby/src/MiniGame");
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const Network_InPacket_1 = require("../../Main/Game/src/networks/Network.InPacket");
    const MiniGameNetworkClient_1 = require("../../Main/Game/src/networks/MiniGameNetworkClient");
    const Tween_1 = require("../../Main/Game/src/common/Tween");
    const BroadcastReceiver_1 = require("../../Main/Game/src/common/BroadcastReceiver");
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    const App_1 = require("../../Main/Game/src/common/App");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let ButtonBet = class ButtonBet {
      constructor() {
        this.button = null;
        this.sfNormal = null;
        this.sfActive = null;
        this._isActive = false;
      }
      setActive(isActive) {
        this._isActive = isActive;
        this.button.getComponent(cc.Sprite).spriteFrame = isActive ? this.sfActive : this.sfNormal;
        this.button.node.getComponentInChildren(sp.Skeleton).node.active = isActive;
        this.button.interactable = !isActive;
      }
    };
    __decorate([ property(cc.Button) ], ButtonBet.prototype, "button", void 0);
    __decorate([ property(cc.SpriteFrame) ], ButtonBet.prototype, "sfNormal", void 0);
    __decorate([ property(cc.SpriteFrame) ], ButtonBet.prototype, "sfActive", void 0);
    ButtonBet = __decorate([ ccclass("Slot3x3.ButtonBet") ], ButtonBet);
    exports.ButtonBet = ButtonBet;
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
    let Slot3x3Controller = class Slot3x3Controller extends MiniGame_1.default {
      constructor() {
        super(...arguments);
        this.sprFrameItems = [];
        this.sprFrameItemsBlur = [];
        this.animItem = [];
        this.itemTemplate = null;
        this.buttonBets = [];
        this.columns = null;
        this.linesWin = null;
        this.btnSpin = null;
        this.btnLine = null;
        this.lblLine = null;
        this.btnClose = null;
        this.sfAuto0 = null;
        this.sfAuto1 = null;
        this.btnAuto = null;
        this.btnBoost = null;
        this.sfBoost0 = null;
        this.sfBoost1 = null;
        this.lblJackpot = null;
        this.lblWinCash = null;
        this.lblToast = null;
        this.effectJackpot = null;
        this.effectBigWin = null;
        this.popupSelectLine = null;
        this.popups = [];
        this.itemHeight = 0;
        this.betIdx = 0;
        this.listBet = [ 100, 1e3, 1e4 ];
        this.arrLineSelect = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 ];
        this.canSpin = true;
        this.isCanChangeBet = true;
        this.lastSpinRes = null;
        this.spinType = {
          normal: true,
          auto: false,
          autox2: false
        };
      }
      start() {
        super.start();
        this.lblLine.string = "20";
        this.itemHeight = this.itemTemplate.height;
        this.columns.children.forEach((column, index) => {
          for (let j = 0; j < 9; j++) {
            let item = cc.instantiate(this.itemTemplate);
            column.addChild(item);
            item.children[0].active = true;
            item.children[1].active = false;
            item.children[0].getComponent(cc.Sprite).spriteFrame = j >= 3 ? this.sprFrameItemsBlur[Utils_1.default.randomRangeInt(0, this.sprFrameItemsBlur.length)] : this.sprFrameItems[Utils_1.default.randomRangeInt(0, this.sprFrameItems.length)];
          }
        });
        this.itemTemplate.removeFromParent();
        this.itemTemplate = null;
        this.buttonBets.forEach((btn, index) => {
          btn.setActive(index == this.betIdx);
          btn.button.node.on("click", () => {
            if (!this.isCanChangeBet) {
              this.showToast("B\u1ea1n thao t\xe1c qu\xe1 nhanh.");
              return;
            }
            let oldIdx = this.betIdx;
            this.betIdx = index;
            for (let index = 0; index < this.buttonBets.length; index++) this.buttonBets[index].setActive(index == this.betIdx);
            this.isCanChangeBet = false;
            this.scheduleOnce(() => {
              this.isCanChangeBet = true;
            }, 1);
            MiniGameNetworkClient_1.default.getInstance().send(new Slot3x3_Cmd_1.default.SendChangeRoom(oldIdx, this.betIdx));
          });
        });
        this.popupSelectLine.onSelectedChanged = lines => {
          this.arrLineSelect = lines;
          this.lblLine.string = this.arrLineSelect.length.toString();
        };
        BroadcastReceiver_1.default.register(BroadcastReceiver_1.default.USER_LOGOUT, () => {
          if (!this.node.active) return;
          this.dismiss();
        }, this);
        BroadcastReceiver_1.default.register(BroadcastReceiver_1.default.USER_DISCONNECTED, () => {
          if (!this.node.active) return;
          this.dismiss();
        }, this);
        MiniGameNetworkClient_1.default.getInstance().addOnClose(() => {
          if (!this.node.active) return;
          this.dismiss();
        }, this);
        MiniGameNetworkClient_1.default.getInstance().addListener(data => {
          if (!this.node.active) return;
          let inpacket = new Network_InPacket_1.default(data);
          switch (inpacket.getCmdId()) {
           case Slot3x3_Cmd_1.default.Code.UPDATE_JACKPOT:
            {
              let res = new Slot3x3_Cmd_1.default.ReceiveUpdateJackpot(data);
              Tween_1.default.numberTo(this.lblJackpot, res.value, .3);
              break;
            }

           case Slot3x3_Cmd_1.default.Code.SPIN:
            {
              let res = new Slot3x3_Cmd_1.default.ReceiveSpin(data);
              cc.log(res);
              this.onSpinResult(res);
              break;
            }
          }
        }, this);
      }
      show() {
        if (this.node.active) {
          this.reOrder();
          return;
        }
        super.show();
        this.lblToast.node.parent.active = false;
        this.lblWinCash.parent.active = false;
        for (let i = 0; i < this.linesWin.childrenCount; i++) this.linesWin.children[i].active = false;
        this.canSpin = true;
        this.isCanChangeBet = true;
        this.betIdx = Configs_1.default.Login.Coin >= Configs_1.default.App.RICH_MAN ? 1 : 0;
        for (let i = 0; i < this.buttonBets.length; i++) this.buttonBets[i].setActive(i == this.betIdx);
        this.setSpinMode(SpinMode.NORMAL);
        this.stopAllEffects();
        this.setEnabledAllButtons(true);
        MiniGameNetworkClient_1.default.getInstance().send(new Slot3x3_Cmd_1.default.SendScribe(this.betIdx));
      }
      dismiss() {
        super.dismiss();
        for (let i = 0; i < this.popups.length; i++) this.popups[i].active = false;
        MiniGameNetworkClient_1.default.getInstance().send(new Slot3x3_Cmd_1.default.SendUnScribe(this.betIdx));
      }
      minize() {
        this.gamePlay.stopAllActions();
        this.gamePlay.runAction(cc.sequence(cc.scaleTo(.3, .2)));
      }
      actSpin(callByClick = false) {
        if (callByClick && (this.spinType.autox2 || this.spinType.auto)) {
          this.setSpinMode(SpinMode.NORMAL);
          return;
        }
        if (!this.canSpin) return;
        this.lblWinCash.parent.opacity = 0;
        this.canSpin = false;
        this.stopAllEffects();
        this.stopShowLinesWin();
        this.setEnabledAllButtons(false);
        for (var i = 0; i < this.buttonBets.length; i++) this.buttonBets[i].button.interactable = false;
        MiniGameNetworkClient_1.default.getInstance().send(new Slot3x3_Cmd_1.default.SendSpin(this.listBet[this.betIdx], this.arrLineSelect.toString()));
      }
      setEnabledAllButtons(isEnabled) {
        this.btnSpin.node.getChildByName("btstop").active = !(isEnabled && !this.spinType.autox2 && !this.spinType.auto);
        this.btnSpin.node.getChildByName("bt-spin").active = isEnabled && !this.spinType.autox2 && !this.spinType.auto;
        this.btnClose.interactable = isEnabled;
        this.btnLine.interactable = isEnabled;
      }
      showToast(message) {
        this.lblToast.string = message;
        let parent = this.lblToast.node.parent;
        parent.stopAllActions();
        parent.active = true;
        parent.opacity = 0;
        parent.runAction(cc.sequence(cc.fadeIn(.1), cc.delayTime(2), cc.fadeOut(.2), cc.callFunc(() => {
          parent.active = false;
        })));
      }
      onSpinResult(res) {
        var _this = this;
        var resultSuccess = [ 0, 1, 2, 3, 4, 5, 6 ];
        if (resultSuccess.indexOf(res.result) < 0) {
          this.setSpinMode(SpinMode.NORMAL);
          this.scheduleOnce(function() {
            this.canSpin = true;
          }, 1);
          this.setEnabledAllButtons(true);
          for (var i = 0; i < this.buttonBets.length; i++) this.buttonBets[i].button.interactable = true;
          App_1.default.instance.actiontDialog.showMsgWithActions(res.desc, res.suggestionActions);
          return;
        }
        Configs_1.default.Login.Coin -= this.listBet[this.betIdx] * this.arrLineSelect.length;
        BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN);
        Configs_1.default.Login.Coin = res.currentMoney;
        this.lastSpinRes = res;
        let matrix = res.matrix.split(",");
        let timeScale = this.spinType.autox2 ? .5 : 1;
        this.columns.children.forEach((colum, index_colum) => {
          let stepRollDown = 6 * this.itemHeight;
          let actionRoll = [ cc.delayTime(.15 * index_colum), cc.callFunc(() => {
            colum.children.forEach(item => {
              item.active = true;
              this.setItemAnim(item, false, null);
            });
          }) ];
          for (let i = 0; i < 2; i++) {
            actionRoll.push(cc.moveTo(.5 * timeScale, cc.v2(colum.position.x, -stepRollDown)));
            actionRoll.push(cc.callFunc(() => {
              colum.setPosition(cc.v2(colum.position.x, 0));
            }));
          }
          actionRoll.push(cc.callFunc(() => {
            colum.setPosition(cc.v2(colum.position.x, 0));
            index_colum === this.columns.childrenCount - 1 && _this.spined();
          }));
          let showResult = cc.callFunc(() => {
            colum.children.forEach((item, index_item) => {
              if (index_item < 3) {
                this.setItemAnim(item, true, this.animItem[5 - parseInt(matrix[6 - 3 * index_item + index_colum])]);
                item.children[1].position = 5 - parseInt(matrix[6 - 3 * index_item + index_colum]) == 4 ? cc.v3(2, -22) : cc.v3(0, 0);
              } else item.active = false;
            });
          });
          actionRoll.push(showResult);
          colum.runAction(cc.sequence(actionRoll));
        });
      }
      toggleAutoOnCheck() {
        this.spinType.auto ? this.setSpinMode(SpinMode.NORMAL) : this.setSpinMode(SpinMode.AUTO);
      }
      toggleBoostOnCheck() {
        this.setSpinMode(this.spinType.autox2 ? SpinMode.NORMAL : SpinMode.AUTO_X2);
      }
      setSpinMode(mode) {
        switch (mode) {
         case SpinMode.AUTO:
          this.spinType.auto = true;
          this.spinType.autox2 = false;
          break;

         case SpinMode.AUTO_X2:
          this.spinType.autox2 = true;
          this.spinType.auto = false;
          break;

         default:
          this.spinType.auto = false;
          this.spinType.autox2 = false;
        }
        this.btnBoost.isChecked = this.spinType.autox2;
        this.btnAuto.isChecked = this.spinType.auto;
        (this.spinType.auto || this.spinType.autox2) && this.actSpin();
        this.canSpin && this.setEnabledAllButtons(!(this.spinType.auto || this.spinType.autox2));
      }
      setItemAnim(item, isShowAnim, skeletonData = null) {
        if (isShowAnim && skeletonData) {
          item.children[0].active = false;
          let animm = item.children[1].getComponent(sp.Skeleton);
          animm.node.active = true;
          animm.skeletonData = skeletonData;
          animm.setAnimation(0, "animation", true);
        } else {
          item.children[0].active = true;
          item.children[1].active = false;
        }
      }
      spined() {
        BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN);
        this.spinType.auto || this.spinType.autox2 || this.setEnabledAllButtons(true);
        switch (this.lastSpinRes.result) {
         case 0:
         case 1:
          this.showLineWins();
          break;

         case 2:
          this.showEffectBigWin(this.lastSpinRes.prize, () => this.showLineWins());
          break;

         case 3:
         case 4:
          this.showEffectJackpot(this.lastSpinRes.prize, () => this.showLineWins());
          break;

         case 6:
          this.showEffectBigWin(this.lastSpinRes.prize, () => this.showLineWins());
        }
      }
      showEffectBigWin(cash, cb) {
        this.effectBigWin.stopAllActions();
        this.effectBigWin.active = true;
        let label = this.effectBigWin.getComponentInChildren(cc.Label);
        label.node.active = false;
        this.effectBigWin.getComponentInChildren(sp.Skeleton).setAnimation(0, "animation", true);
        this.effectBigWin.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(() => {
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
        this.effectJackpot.getComponentInChildren(sp.Skeleton).setAnimation(0, "animation", true);
        this.effectJackpot.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(() => {
          label.string = "";
          label.node.active = true;
          Tween_1.default.numberTo(label, cash, 1);
        }), cc.delayTime(3), cc.callFunc(() => {
          this.effectJackpot.active = false;
          null != cb && cb();
        })));
      }
      showWinCash(coin) {
        let parent = this.lblWinCash.parent;
        let label = this.lblWinCash.getComponent(cc.Label);
        parent.stopAllActions();
        parent.active = true;
        label.string = "0";
        parent.opacity = 0;
        parent.runAction(cc.sequence(cc.fadeIn(.3), cc.callFunc(() => {
          Tween_1.default.numberTo(label, coin, .5);
        })));
      }
      stopAllEffects() {
        this.effectJackpot.stopAllActions();
        this.effectJackpot.active = false;
        this.effectBigWin.stopAllActions();
        this.effectBigWin.active = false;
      }
      stopShowLinesWin() {
        this.linesWin.stopAllActions();
        for (var i = 0; i < this.linesWin.childrenCount; i++) this.linesWin.children[i].active = false;
        this.stopAllItemEffect();
      }
      stopAllItemEffect() {
        this.columns.children.forEach((colum, index_colum) => {
          colum.stopAllActions();
          colum.children.forEach((item, index_item) => {
            item.active = index_item < 3;
          });
        });
      }
      showLineWins() {
        this.linesWin.stopAllActions();
        var linesWin = this.lastSpinRes.linesWin.split(",");
        var linesWinChildren = this.linesWin.children;
        for (var i = 0; i < linesWinChildren.length; i++) linesWinChildren[i].active = linesWin.indexOf("" + (i + 1)) >= 0;
        var actions = [];
        if (this.lastSpinRes.prize > 0) {
          this.showWinCash(this.lastSpinRes.prize);
          actions.push(cc.delayTime(1.5));
        }
        actions.push(cc.delayTime(.5));
        actions.push(cc.callFunc(() => {
          this.canSpin = true;
          if (this.spinType.autox2 || this.spinType.auto) this.actSpin(); else {
            this.setEnabledAllButtons(true);
            for (var i = 0; i < this.buttonBets.length; i++) this.buttonBets[i].button.interactable = true;
          }
        }));
        this.linesWin.runAction(cc.sequence.apply(null, actions));
      }
    };
    __decorate([ property([ cc.SpriteFrame ]) ], Slot3x3Controller.prototype, "sprFrameItems", void 0);
    __decorate([ property([ cc.SpriteFrame ]) ], Slot3x3Controller.prototype, "sprFrameItemsBlur", void 0);
    __decorate([ property([ sp.SkeletonData ]) ], Slot3x3Controller.prototype, "animItem", void 0);
    __decorate([ property(cc.Node) ], Slot3x3Controller.prototype, "itemTemplate", void 0);
    __decorate([ property([ ButtonBet ]) ], Slot3x3Controller.prototype, "buttonBets", void 0);
    __decorate([ property(cc.Node) ], Slot3x3Controller.prototype, "columns", void 0);
    __decorate([ property(cc.Node) ], Slot3x3Controller.prototype, "linesWin", void 0);
    __decorate([ property(cc.Toggle) ], Slot3x3Controller.prototype, "btnSpin", void 0);
    __decorate([ property(cc.Button) ], Slot3x3Controller.prototype, "btnLine", void 0);
    __decorate([ property(cc.Label) ], Slot3x3Controller.prototype, "lblLine", void 0);
    __decorate([ property(cc.Button) ], Slot3x3Controller.prototype, "btnClose", void 0);
    __decorate([ property(cc.SpriteFrame) ], Slot3x3Controller.prototype, "sfAuto0", void 0);
    __decorate([ property(cc.SpriteFrame) ], Slot3x3Controller.prototype, "sfAuto1", void 0);
    __decorate([ property(cc.Toggle) ], Slot3x3Controller.prototype, "btnAuto", void 0);
    __decorate([ property(cc.Toggle) ], Slot3x3Controller.prototype, "btnBoost", void 0);
    __decorate([ property(cc.SpriteFrame) ], Slot3x3Controller.prototype, "sfBoost0", void 0);
    __decorate([ property(cc.SpriteFrame) ], Slot3x3Controller.prototype, "sfBoost1", void 0);
    __decorate([ property(cc.Label) ], Slot3x3Controller.prototype, "lblJackpot", void 0);
    __decorate([ property(cc.Node) ], Slot3x3Controller.prototype, "lblWinCash", void 0);
    __decorate([ property(cc.Label) ], Slot3x3Controller.prototype, "lblToast", void 0);
    __decorate([ property(cc.Node) ], Slot3x3Controller.prototype, "effectJackpot", void 0);
    __decorate([ property(cc.Node) ], Slot3x3Controller.prototype, "effectBigWin", void 0);
    __decorate([ property(Slot3x3_PopupSelectLine_1.default) ], Slot3x3Controller.prototype, "popupSelectLine", void 0);
    __decorate([ property([ cc.Node ]) ], Slot3x3Controller.prototype, "popups", void 0);
    Slot3x3Controller = __decorate([ ccclass ], Slot3x3Controller);
    exports.default = Slot3x3Controller;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/App": void 0,
    "../../Main/Game/src/common/BroadcastReceiver": void 0,
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/common/Tween": void 0,
    "../../Main/Game/src/common/Utils": void 0,
    "../../Main/Game/src/networks/MiniGameNetworkClient": void 0,
    "../../Main/Game/src/networks/Network.InPacket": void 0,
    "../../Main/Lobby/src/MiniGame": void 0,
    "./Slot3x3.Cmd": "Slot3x3.Cmd",
    "./Slot3x3.PopupSelectLine": "Slot3x3.PopupSelectLine"
  } ]
}, {}, [ "Slot3x3.Cmd", "Slot3x3.PopupHistory", "Slot3x3.PopupHonors", "Slot3x3.PopupSelectLine", "Slot3x3.Slot3x3Controller" ]);