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
  "LoDe.CalendarBet": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f8191/HBcJFj4kejy+a4dRC", "LoDe.CalendarBet");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const CustomUI_Dropdown_1 = require("../../Main/Game/src/customui/CustomUI.Dropdown");
    const LoDe_Controller_1 = require("./LoDe.Controller");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let LoDeCalendarBet = class LoDeCalendarBet extends cc.Component {
      constructor() {
        super(...arguments);
        this.container = null;
        this.dayOfMonthContent = null;
        this.dayOfMonthItem = null;
        this.dropdownYear = null;
        this.dropdownMonth = null;
        this.isAnimated = true;
        this.months = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ];
        this.years = [];
        this.currentMonth = null;
        this.currentYear = null;
        this.dateOfBet = null;
        this.dateOfRelease = null;
      }
      start() {
        for (let i = 0; i < 42; i++) {
          let dayItem = this.dayOfMonthContent.children[i];
          if (!dayItem) {
            dayItem = cc.instantiate(this.dayOfMonthItem);
            dayItem.opacity = 0;
            dayItem.parent = this.dayOfMonthContent;
          }
        }
        let date = new Date();
        let year = date.getFullYear();
        this.years = [ year, year + 1 ];
        this.dropdownYear.setOptions(this.years.map(year => "" + year));
        this.dropdownYear.setOnValueChange(idx => {
          this.generateDaysInMonth(this.currentMonth, this.years[idx]);
        });
        this.dropdownMonth.setOptions(this.months.map(month => "Th\xe1ng " + month));
        this.dropdownMonth.setOnValueChange(idx => {
          this.generateDaysInMonth(idx, this.currentYear);
        });
      }
      show(dateOfBet, dateOfRelease) {
        this.dateOfBet = dateOfBet;
        this.dateOfRelease = dateOfRelease;
        cc.Tween.stopAllByTarget(this.container);
        this.node.active = true;
        cc.tween(this.container).set({
          scaleY: 0,
          opacity: 0
        }).to(.3, {
          scaleY: 1,
          opacity: 255
        }, {
          easing: cc.easing.backOut
        }).call(() => {
          if (this.currentMonth && this.currentMonth === dateOfBet.getMonth()) this.dayOfMonthContent.children.forEach(child => {
            child.getComponent(cc.Toggle).isChecked = this.isSameDate(new Date(this.currentYear, this.currentMonth, Number(child.getComponentInChildren(cc.Label).string)), dateOfBet);
          }); else {
            this.generateDaysInMonth(dateOfBet.getMonth(), dateOfBet.getFullYear());
            this.dropdownMonth.setValue(dateOfBet.getMonth());
            this.dropdownYear.setValue(this.years.indexOf(dateOfBet.getFullYear()));
          }
        }).start();
      }
      dismiss() {
        if (!this.isAnimated) return;
        this.isAnimated = false;
        cc.Tween.stopAllByTarget(this.container);
        cc.tween(this.container).to(.3, {
          scaleY: 0,
          opacity: 0
        }, {
          easing: cc.easing.backIn
        }).call(() => {
          this.node.active = false;
          this.isAnimated = true;
        }).start();
      }
      generateDaysInMonth(month, year) {
        this.currentMonth = month;
        this.currentYear = year;
        let daysInMonth = this.getDaysInMonth(month, year);
        let startDay = daysInMonth[0].getDay();
        this.dayOfMonthContent.children[41].getComponent(cc.Toggle).isChecked = true;
        for (let i = 0; i < this.dayOfMonthContent.childrenCount; i++) {
          const dayItem = this.dayOfMonthContent.children[i];
          if (i < startDay || i >= startDay + daysInMonth.length) {
            dayItem.opacity = 0;
            dayItem.getComponent(cc.Toggle).interactable = false;
          } else {
            dayItem.opacity = 255;
            let dayOfMonth = daysInMonth[i - startDay];
            let lbDay = dayItem.getComponentInChildren(cc.Label);
            lbDay.string = dayOfMonth.getDate() + "";
            lbDay.node.color = cc.Color.BLACK.fromHEX(dayOfMonth < this.dateOfRelease && this.isSameDate(dayOfMonth, this.dateOfRelease) || dayOfMonth >= this.dateOfRelease ? "#FFFFFF" : "#9C9C9C");
            dayItem.getComponent(cc.Toggle).interactable = dayOfMonth < this.dateOfRelease && this.isSameDate(dayOfMonth, this.dateOfRelease) || dayOfMonth >= this.dateOfRelease;
            dayItem.getComponent(cc.Toggle).isChecked = this.isSameDate(dayOfMonth, this.dateOfBet);
            dayItem.off("toggle");
            dayItem.on("toggle", () => {
              var _a;
              null === (_a = LoDe_Controller_1.default.getInstance()) || void 0 === _a ? void 0 : _a.updateDateOfBet(dayOfMonth);
              this.dismiss();
            });
          }
        }
      }
      getDaysInMonth(month, year) {
        var date = new Date(year, month, 1);
        var days = [];
        while (date.getMonth() === month) {
          days.push(new Date(date));
          date.setDate(date.getDate() + 1);
        }
        return days;
      }
      isSameDate(date1, date2) {
        return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
      }
    };
    __decorate([ property(cc.Node) ], LoDeCalendarBet.prototype, "container", void 0);
    __decorate([ property(cc.Node) ], LoDeCalendarBet.prototype, "dayOfMonthContent", void 0);
    __decorate([ property(cc.Node) ], LoDeCalendarBet.prototype, "dayOfMonthItem", void 0);
    __decorate([ property(CustomUI_Dropdown_1.default) ], LoDeCalendarBet.prototype, "dropdownYear", void 0);
    __decorate([ property(CustomUI_Dropdown_1.default) ], LoDeCalendarBet.prototype, "dropdownMonth", void 0);
    LoDeCalendarBet = __decorate([ ccclass ], LoDeCalendarBet);
    exports.default = LoDeCalendarBet;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/customui/CustomUI.Dropdown": void 0,
    "./LoDe.Controller": "LoDe.Controller"
  } ],
  "LoDe.CalendarResult": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "da6e55aTftPYI5IRWSH8ZDc", "LoDe.CalendarResult");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const CustomUI_Dropdown_1 = require("../../Main/Game/src/customui/CustomUI.Dropdown");
    const LoDe_Controller_1 = require("./LoDe.Controller");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let LoDeCalendarResult = class LoDeCalendarResult extends cc.Component {
      constructor() {
        super(...arguments);
        this.container = null;
        this.dayOfMonthContent = null;
        this.dayOfMonthItem = null;
        this.dropdownYear = null;
        this.dropdownMonth = null;
        this.months = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ];
        this.years = [];
        this.currentMonth = null;
        this.currentYear = null;
        this.dateOfResult = null;
        this.lastestDateOfResult = null;
        this.isAnimated = true;
      }
      start() {
        for (let i = 0; i < 42; i++) {
          let dayItem = this.dayOfMonthContent.children[i];
          if (!dayItem) {
            dayItem = cc.instantiate(this.dayOfMonthItem);
            dayItem.opacity = 0;
            dayItem.parent = this.dayOfMonthContent;
          }
        }
        let date = new Date();
        let year = date.getFullYear();
        this.years = [ year - 1, year ];
        this.dropdownYear.setOptions(this.years.map(year => "" + year));
        this.dropdownYear.setOnValueChange(idx => {
          this.generateDaysInMonth(this.currentMonth, this.years[idx]);
        });
        this.dropdownMonth.setOptions(this.months.map(month => "Th\xe1ng " + month));
        this.dropdownMonth.setOnValueChange(idx => {
          this.generateDaysInMonth(idx, this.currentYear);
        });
      }
      show(dateOfResult) {
        this.dateOfResult = dateOfResult;
        cc.Tween.stopAllByTarget(this.container);
        this.node.active = true;
        cc.tween(this.container).set({
          scaleY: 0,
          opacity: 0
        }).to(.3, {
          scaleY: 1,
          opacity: 255
        }, {
          easing: cc.easing.backOut
        }).call(() => {
          if (this.currentMonth && this.currentMonth == dateOfResult.getMonth()) this.dayOfMonthContent.children.forEach(child => {
            child.getComponent(cc.Toggle).isChecked = this.isSameDate(new Date(this.currentYear, this.currentMonth, Number(child.getComponentInChildren(cc.Label).string)), dateOfResult);
          }); else {
            this.generateDaysInMonth(dateOfResult.getMonth(), dateOfResult.getFullYear());
            this.dropdownMonth.setValue(dateOfResult.getMonth());
            this.dropdownYear.setValue(this.years.indexOf(dateOfResult.getFullYear()));
          }
        }).start();
      }
      dismiss() {
        if (!this.isAnimated) return;
        this.isAnimated = false;
        cc.Tween.stopAllByTarget(this.container);
        cc.tween(this.container).to(.3, {
          scaleY: 0,
          opacity: 0
        }, {
          easing: cc.easing.backIn
        }).call(() => {
          this.node.active = false;
          this.isAnimated = true;
        }).start();
      }
      generateDaysInMonth(month, year) {
        this.currentMonth = month;
        this.currentYear = year;
        let daysInMonth = this.getDaysInMonth(month, year);
        let startDay = daysInMonth[0].getDay();
        this.dayOfMonthContent.children[41].getComponent(cc.Toggle).isChecked = true;
        for (let i = 0; i < this.dayOfMonthContent.childrenCount; i++) {
          const dayItem = this.dayOfMonthContent.children[i];
          if (i < startDay || i >= startDay + daysInMonth.length) {
            dayItem.opacity = 0;
            dayItem.getComponent(cc.Toggle).interactable = false;
          } else {
            dayItem.opacity = 255;
            let dayOfMonth = daysInMonth[i - startDay];
            let lbDay = dayItem.getComponentInChildren(cc.Label);
            lbDay.string = dayOfMonth.getDate() + "";
            lbDay.node.color = cc.Color.BLACK.fromHEX(this.isSameDate(dayOfMonth, this.lastestDateOfResult) || dayOfMonth < this.lastestDateOfResult ? "#FFFFFF" : "#9C9C9C");
            dayItem.getComponent(cc.Toggle).interactable = this.isSameDate(dayOfMonth, this.lastestDateOfResult) || dayOfMonth < this.lastestDateOfResult;
            dayItem.getComponent(cc.Toggle).isChecked = this.isSameDate(dayOfMonth, this.dateOfResult);
            dayItem.off("toggle");
            dayItem.on("toggle", () => {
              var _a;
              null === (_a = LoDe_Controller_1.default.getInstance()) || void 0 === _a ? void 0 : _a.updateDateOfResult(dayOfMonth);
              this.dismiss();
            });
          }
        }
      }
      getDaysInMonth(month, year) {
        var date = new Date();
        date.setFullYear(year);
        date.setMonth(month);
        date.setDate(1);
        var days = [];
        while (date.getMonth() === month) {
          days.push(new Date(date));
          date.setDate(date.getDate() + 1);
        }
        return days;
      }
      isSameDate(date1, date2) {
        return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
      }
      setLastestDateOfResult(date) {
        this.lastestDateOfResult = date;
        this.dayOfMonthContent.children.forEach(child => {
          let lbDay = child.getComponentInChildren(cc.Label);
          if (this.currentMonth === this.lastestDateOfResult.getMonth() && parseInt(lbDay.string) === this.lastestDateOfResult.getDate()) {
            lbDay.node.color = cc.Color.BLACK.fromHEX("#FFFFFF");
            child.getComponent(cc.Toggle).interactable = true;
          }
        });
      }
      getLastestDateOfResult() {
        return this.lastestDateOfResult;
      }
    };
    __decorate([ property(cc.Node) ], LoDeCalendarResult.prototype, "container", void 0);
    __decorate([ property(cc.Node) ], LoDeCalendarResult.prototype, "dayOfMonthContent", void 0);
    __decorate([ property(cc.Node) ], LoDeCalendarResult.prototype, "dayOfMonthItem", void 0);
    __decorate([ property(CustomUI_Dropdown_1.default) ], LoDeCalendarResult.prototype, "dropdownYear", void 0);
    __decorate([ property(CustomUI_Dropdown_1.default) ], LoDeCalendarResult.prototype, "dropdownMonth", void 0);
    LoDeCalendarResult = __decorate([ ccclass ], LoDeCalendarResult);
    exports.default = LoDeCalendarResult;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/customui/CustomUI.Dropdown": void 0,
    "./LoDe.Controller": "LoDe.Controller"
  } ],
  "LoDe.Cmd": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d326crjyeZPqJQLy/lR/7z6", "LoDe.Cmd");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.LodeCmd = void 0;
    const Network_OutPacket_1 = require("../../Main/Game/src/networks/Network.OutPacket");
    const Network_InPacket_1 = require("../../Main/Game/src/networks/Network.InPacket");
    const Constants_1 = require("../../Main/Game/src/common/Constants");
    var LodeCmd;
    (function(LodeCmd) {
      class Code {}
      Code.UPDATE_USER_MONEY = 21e3;
      Code.LOG_CHAT = 18003;
      Code.SEND_CHAT = 18e3;
      Code.SCRIBE_CHAT = 18001;
      Code.UNSCRIBE_CHAT = 18002;
      LodeCmd.Code = Code;
      class SendScribeChat extends Network_OutPacket_1.default {
        constructor() {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.SCRIBE_CHAT);
          this.packHeader();
          this.putString(Constants_1.ChatChannel.LO_DE);
          this.updateSize();
        }
      }
      LodeCmd.SendScribeChat = SendScribeChat;
      class SendUnScribeChat extends Network_OutPacket_1.default {
        constructor() {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.UNSCRIBE_CHAT);
          this.packHeader();
          this.putString(Constants_1.ChatChannel.LO_DE);
          this.updateSize();
        }
      }
      LodeCmd.SendUnScribeChat = SendUnScribeChat;
      class SendChat extends Network_OutPacket_1.default {
        constructor(message) {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.SEND_CHAT);
          this.packHeader();
          this.putString(message);
          this.putString(Constants_1.ChatChannel.LO_DE);
          this.updateSize();
        }
      }
      LodeCmd.SendChat = SendChat;
      class SendScribeSieuTocChat extends Network_OutPacket_1.default {
        constructor() {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.SCRIBE_CHAT);
          this.packHeader();
          this.putString(Constants_1.ChatChannel.LO_DE_SIEU_TOC);
          this.updateSize();
        }
      }
      LodeCmd.SendScribeSieuTocChat = SendScribeSieuTocChat;
      class SendUnScribeSieuTocChat extends Network_OutPacket_1.default {
        constructor() {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.UNSCRIBE_CHAT);
          this.packHeader();
          this.putString(Constants_1.ChatChannel.LO_DE_SIEU_TOC);
          this.updateSize();
        }
      }
      LodeCmd.SendUnScribeSieuTocChat = SendUnScribeSieuTocChat;
      class SendSieuTocChat extends Network_OutPacket_1.default {
        constructor(message) {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.SEND_CHAT);
          this.packHeader();
          this.putString(message);
          this.putString(Constants_1.ChatChannel.LO_DE_SIEU_TOC);
          this.updateSize();
        }
      }
      LodeCmd.SendSieuTocChat = SendSieuTocChat;
      class ReceivedUpdateUserMoney extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.error = 0;
          this.desc = this.getString();
          this.nickName = this.getString();
          this.changeMoney = this.getLong();
          this.totalMoney = this.getLong();
          this.showPopup = this.getBool();
        }
      }
      LodeCmd.ReceivedUpdateUserMoney = ReceivedUpdateUserMoney;
      class ChatItem {
        constructor() {
          this.nickname = "";
          this.message = "";
        }
      }
      LodeCmd.ChatItem = ChatItem;
      class ReceiveLogChat extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.messages = [];
          this.minVipPoint = 0;
          this.timeBan = 0;
          this.userType = 0;
          this.chatChannel = "";
          let ms = JSON.parse(this.getString());
          for (var i = 0; i < ms.length; i++) {
            let message = new ChatItem();
            message.nickname = ms[i].u;
            message.message = ms[i].m;
            message.vipId = ms[i].vipId;
            this.messages.push(message);
          }
          this.minVipPoint = this.getByte();
          this.timeBan = this.getLong();
          this.userType = this.getByte();
          this.chatChannel = this.getString();
        }
      }
      LodeCmd.ReceiveLogChat = ReceiveLogChat;
      class ReceiveSendChat extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.error = 0;
          this.nickname = "";
          this.message = "";
          this.desc = "";
          this.suggestionActions = [];
          this.vip = 0;
          this.chatChannel = "";
          this.error = this.getError();
          this.nickname = this.getString();
          this.message = this.getString();
          this.desc = this.getString();
          let actionsStr = this.getString();
          this.vip = this.getInt();
          if (actionsStr) {
            let actions = JSON.parse(actionsStr);
            (null === actions || void 0 === actions ? void 0 : actions.hasOwnProperty("suggestionActions")) && Array.isArray(actions["suggestionActions"]) && (this.suggestionActions = Constants_1.UserActions.toEnums(actions["suggestionActions"]));
          }
          this.chatChannel = this.getString();
        }
      }
      LodeCmd.ReceiveSendChat = ReceiveSendChat;
    })(LodeCmd = exports.LodeCmd || (exports.LodeCmd = {}));
    exports.default = LodeCmd;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/Constants": void 0,
    "../../Main/Game/src/networks/Network.InPacket": void 0,
    "../../Main/Game/src/networks/Network.OutPacket": void 0
  } ],
  "LoDe.Controller": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "dc626O6kL5LbJi+bhoQOHxk", "LoDe.Controller");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var LoDeController_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    const App_1 = require("../../Main/Game/src/common/App");
    const BroadcastReceiver_1 = require("../../Main/Game/src/common/BroadcastReceiver");
    const Lobby_PopupShop_1 = require("../../Main/Lobby/src/Lobby.PopupShop");
    const Tween_1 = require("../../Main/Game/src/common/Tween");
    const Network_InPacket_1 = require("../../Main/Game/src/networks/Network.InPacket");
    const MiniGameNetworkClient_1 = require("../../Main/Game/src/networks/MiniGameNetworkClient");
    const Http_1 = require("../../Main/Game/src/common/Http");
    const CustomUI_Dropdown_1 = require("../../Main/Game/src/customui/CustomUI.Dropdown");
    const Common_AudioManager_1 = require("../../Main/Game/src/common/Common.AudioManager");
    const LoDe_Cmd_1 = require("./LoDe.Cmd");
    const Constants_1 = require("../../Main/Game/src/common/Constants");
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const LoDe_PopupSelectNumber_1 = require("./LoDe.PopupSelectNumber");
    const LoDe_PopupHistory_1 = require("./LoDe.PopupHistory");
    const LoDe_PopupHonors_1 = require("./LoDe.PopupHonors");
    const LoDe_CalendarBet_1 = require("./LoDe.CalendarBet");
    const LoDe_CalendarResult_1 = require("./LoDe.CalendarResult");
    const LoDe_PopupGuide_1 = require("./LoDe.PopupGuide");
    const LoDe_LoDeData_1 = require("./LoDe.LoDeData");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let LoDeController = LoDeController_1 = class LoDeController extends cc.Component {
      constructor() {
        super(...arguments);
        this.labelUserGold = null;
        this.tabs = [];
        this.tabContents = null;
        this.dropDownCities = null;
        this.lbWinBet = null;
        this.edbBetPerNumber = null;
        this.edbTotalBet = null;
        this.lbDateOfBet = null;
        this.lbCountDownTimeRelease = null;
        this.listGroupMode = null;
        this.itemGroupMode = null;
        this.listMode = null;
        this.itemMode = null;
        this.lbGuides = [];
        this.btnGuide = null;
        this.edbNumber = null;
        this.numberHolder = null;
        this.numberContent = null;
        this.lbNumber = null;
        this.numberCursor = null;
        this.resultContent = null;
        this.resultItem = null;
        this.dropDownCitiesResult = null;
        this.edtChatInput = null;
        this.itemChatTemplate = null;
        this.scrollChat = null;
        this.atlasVip = null;
        this.itemNewBet = null;
        this.scrollNewBet = null;
        this.popupSelectNumber = null;
        this.popupHistory = null;
        this.popupHonors = null;
        this.popupGuide = null;
        this.musicBackground = null;
        this.calendarBet = null;
        this.calendarResult = null;
        this.lbDateOfResult = null;
        this.statitics = null;
        this.buttonHonors = null;
        this.buttonHistory = null;
        this.currentSelectedNumbers = [];
        this.countDownTimeRelease = null;
        this.dateOfBet = null;
        this.dateOfReleaseEarliest = null;
        this.dateOfResult = null;
        this.scheduleDailyResult = null;
      }
      static getInstance() {
        return this.instance;
      }
      static destroyInstance() {
        return this.instance;
      }
      onLoad() {
        LoDeController_1.instance = this;
        this.buttonHonors.active = false;
        this.buttonHistory.active = false;
      }
      start() {
        Common_AudioManager_1.default.getInstance().playBackgroundMusic(this.musicBackground, true);
        BroadcastReceiver_1.default.register(BroadcastReceiver_1.default.USER_UPDATE_COIN, () => {
          Tween_1.default.numberTo(this.labelUserGold, Configs_1.default.Login.Coin, .3);
        }, this);
        BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN);
        MiniGameNetworkClient_1.default.getInstance().addListener(data => {
          let inPacket = new Network_InPacket_1.default(data);
          switch (inPacket.getCmdId()) {
           case LoDe_Cmd_1.default.Code.UPDATE_USER_MONEY:
            {
              let res = new LoDe_Cmd_1.default.ReceivedUpdateUserMoney(data);
              Configs_1.default.Login.Coin = res.totalMoney;
              BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN);
              res.showPopup && App_1.default.instance.alertDialog.showMsg("C\xf3 th\u01b0 m\u1edbi :\n" + res.desc);
            }
            break;

           case LoDe_Cmd_1.default.Code.LOG_CHAT:
            {
              let res = new LoDe_Cmd_1.default.ReceiveLogChat(data);
              cc.log(res);
              if (res.chatChannel !== Constants_1.ChatChannel.LO_DE) break;
              res.messages.forEach(message => this.addChat(message));
            }
            break;

           case LoDe_Cmd_1.default.Code.SEND_CHAT:
            {
              let res = new LoDe_Cmd_1.default.ReceiveSendChat(data);
              cc.log(res);
              if (res.chatChannel !== Constants_1.ChatChannel.LO_DE) break;
              switch (res.error) {
               case 0:
                let message = new LoDe_Cmd_1.default.ChatItem();
                message.nickname = res.nickname;
                message.message = res.message;
                message.vipId = res.vip;
                this.addChat(message);
                break;

               default:
                App_1.default.instance.actiontDialog.showMsgWithActions(res.desc, res.suggestionActions);
              }
            }
          }
        }, this);
        MiniGameNetworkClient_1.default.getInstance().send(new LoDe_Cmd_1.default.SendScribeChat());
        this.changeTabs(this.tabs[0]);
        App_1.default.instance.showLoading(true);
        this.requestGetGameModes();
        cc.game.on(cc.game.EVENT_HIDE, function() {
          cc.sys.localStorage.setItem("lode_time_hide", Date.now());
        });
        cc.game.on(cc.game.EVENT_SHOW, function() {
          let timeHide = cc.sys.localStorage.getItem("lode_time_hide");
          if (timeHide) {
            let deltaTime = Math.round((Date.now() - JSON.parse(cc.sys.localStorage.getItem("lode_time_hide"))) / 1e3);
            cc.sys.localStorage.removeItem("lode_time_hide");
            if (deltaTime > 5) {
              App_1.default.instance.showLoading(true);
              MiniGameNetworkClient_1.default.getInstance().checkConnect(() => {
                cc.director.loadScene("LoDe", () => {
                  App_1.default.instance.showLoading(false);
                });
              });
            }
          }
        });
      }
      onDestroy() {
        this.unschedule(this.countDownTimeRelease);
        this.unschedule(this.requestGetNewBetHistory);
        LoDeController_1.destroyInstance();
        cc.game.clear();
      }
      requestGetCitiesOfBet(date) {
        Http_1.default.get(Configs_1.default.App.API_LODE + "cities", {
          date: this.getSession(date)
        }, (err, res) => {
          if (!this.node) return;
          if (null != err) {
            App_1.default.instance.alertDialog.showMsgWithOnDismissed("H\u1ec7 th\u1ed1ng \u0111ang b\u1ea3o tr\xec, vui l\xf2ng quay l\u1ea1i sau.", () => {
              this.actionBack();
            });
            return;
          }
          cc.log(res);
          let cities = LoDe_LoDeData_1.City.toCities(res);
          let timeReleases = cities.map(city => city.timeRelease).sort();
          let distanceTimeLastestRelease = new Date(this.getSession(date) + " " + timeReleases[timeReleases.length - 1]).getTime() - Date.now();
          if (distanceTimeLastestRelease <= 0) {
            let nextDate = new Date(date);
            nextDate.setDate(nextDate.getDate() + 1);
            this.requestGetCitiesOfBet(nextDate);
            return;
          }
          distanceTimeLastestRelease < 864e5 && (this.dateOfReleaseEarliest = new Date(this.getSession(date) + " " + timeReleases[timeReleases.length - 1]));
          this.cities = cities;
          this.dropDownCities.setOptions(this.cities.map(city => city.name));
          this.dropDownCities.setOnValueChange(idx => {
            this.changeCityOfBet(this.cities[idx], date);
          });
          this.dropDownCities.setValue(0);
          this.dropDownCities.clickValue(0);
          this.scheduleOnce(() => {
            let nextDate = new Date(date);
            nextDate.setDate(nextDate.getDate() + 1);
            this.requestGetCitiesOfBet(nextDate);
          }, Math.round(distanceTimeLastestRelease / 1e3));
        });
      }
      requestGetGameModes() {
        Http_1.default.get(Configs_1.default.App.API_LODE + "gameTypes", {}, (err, res) => {
          if (!this.node) return;
          if (null != err) {
            App_1.default.instance.alertDialog.showMsgWithOnDismissed("H\u1ec7 th\u1ed1ng \u0111ang b\u1ea3o tr\xec, vui l\xf2ng quay l\u1ea1i sau.", () => {
              this.actionBack();
            });
            return;
          }
          cc.log(res);
          this.gameModes = LoDe_LoDeData_1.GameMode.toGameModes(res);
          this.requestGetCitiesOfBet(new Date());
          this.requestAllCities();
          this.checkAvaiableResultCurrentDate();
        });
      }
      changeCityOfBet(city, date) {
        this.dateOfBet || (this.dateOfBet = new Date(date));
        this.lbDateOfBet.string = this.formatDate(this.dateOfBet);
        this.unschedule(this.countDownTimeRelease);
        this.countDownTimeRelease = () => {
          let distanceTimeRelease = new Date(this.getSession(date) + " " + city.timeRelease).getTime() - Date.now();
          if (distanceTimeRelease < 0) {
            this.unschedule(this.countDownTimeRelease);
            this.lbCountDownTimeRelease.string = [ "00", "00", "00" ].join(":");
          } else {
            let hours = Math.floor(distanceTimeRelease % 864e5 / 36e5);
            let minutes = Math.floor(distanceTimeRelease % 36e5 / 6e4);
            let seconds = Math.floor(distanceTimeRelease % 6e4 / 1e3);
            this.lbCountDownTimeRelease.string = [ hours < 10 ? "0" + hours : hours, minutes < 10 ? "0" + minutes : minutes, seconds < 10 ? "0" + seconds : seconds ].join(":");
          }
        };
        this.schedule(this.countDownTimeRelease, 1);
        let modes = this.gameModes.filter(mode => mode.lotteryRegion === city.region);
        let groupModes = [];
        modes.forEach(mode => {
          let addedGroupMode = groupModes.find(groupMode => mode.name.includes(groupMode.groupMode));
          if (addedGroupMode) addedGroupMode.listMode.push(mode); else {
            let newGroupMode = new LoDe_LoDeData_1.GroupMode();
            let newGroupModeKey = Object.keys(LoDe_LoDeData_1.GroupModeENUM).find(key => mode.name.includes(LoDe_LoDeData_1.GroupModeENUM[key]));
            if (newGroupModeKey) {
              newGroupMode.groupMode = LoDe_LoDeData_1.GroupModeENUM[newGroupModeKey];
              newGroupMode.listMode = [];
              newGroupMode.listMode.push(mode);
              groupModes.push(newGroupMode);
            }
          }
        });
        this.listGroupMode.removeAllChildren();
        for (let i = 0; i < groupModes.length; i++) {
          let groupModeItem = cc.instantiate(this.itemGroupMode);
          let lbs = groupModeItem.getComponentsInChildren(cc.Label);
          lbs[0].string = groupModes[i].getDisplayName().toLocaleUpperCase();
          lbs[1].string = groupModes[i].getDisplayName().toLocaleUpperCase();
          groupModeItem.parent = this.listGroupMode;
          groupModeItem.active = true;
          cc.tween(groupModeItem).set({
            opacity: 0
          }).delay(.1 * i).to(.3, {
            opacity: 255
          }, {
            easing: cc.easing.backOut
          }).start();
          groupModeItem.on("toggle", () => {
            this.changeGroupMode(groupModes[i]);
          });
          0 === i && this.scheduleOnce(() => {
            this.changeGroupMode(groupModes[i]);
          }, .1 * groupModes.length);
          let activeModes = groupModes[i].listMode.filter(mode => mode.active);
          groupModeItem.getComponent(cc.Toggle).interactable = !(0 === activeModes.length);
        }
      }
      actionNextCity() {
        let currentCityIndex = this.dropDownCities.getValue();
        let nextCityIndex = currentCityIndex === this.cities.length - 1 ? 0 : currentCityIndex + 1;
        this.dropDownCities.setValue(nextCityIndex);
        this.dropDownCities.clickValue(nextCityIndex);
      }
      actionPrevioursCity() {
        let currentCityIndex = this.dropDownCities.getValue();
        let previoursCityIndex = 0 === currentCityIndex ? this.cities.length - 1 : currentCityIndex - 1;
        this.dropDownCities.setValue(previoursCityIndex);
        this.dropDownCities.clickValue(previoursCityIndex);
      }
      actionNextDateOfBet() {
        let date = new Date(this.dateOfBet);
        date.setDate(date.getDate() + 1);
        this.updateDateOfBet(date);
      }
      actionPrevioursDateOfBet() {
        let date = new Date(this.dateOfBet);
        date.setDate(date.getDate() - 1);
        let compareDate1 = new Date(date);
        compareDate1.setHours(0, 0, 0, 0);
        let compareDate2 = new Date(this.dateOfReleaseEarliest);
        compareDate2.setHours(0, 0, 0, 0);
        if (compareDate1 < compareDate2) return;
        if (compareDate1.getFullYear() === compareDate2.getFullYear() && compareDate1.getMonth() === compareDate2.getMonth() && compareDate1.getDate() === compareDate2.getDate() && this.dateOfReleaseEarliest.getTime() - Date.now() < 0) return;
        this.updateDateOfBet(date);
      }
      actionShowCalendarBet() {
        this.calendarBet.show(this.dateOfBet, this.dateOfReleaseEarliest);
      }
      changeGroupMode(groupMode) {
        this.listMode.removeAllChildren();
        for (let i = 0; i < groupMode.listMode.length; i++) {
          let modeItem = cc.instantiate(this.itemMode);
          modeItem.getComponentInChildren(cc.Label).string = groupMode.listMode[i].getDisplayName().toUpperCase();
          modeItem.parent = this.listMode;
          modeItem.y = 0;
          modeItem.active = true;
          cc.tween(modeItem).set({
            scale: 0,
            opacity: 0
          }).to(.3, {
            scale: 1,
            opacity: 255
          }, {
            easing: cc.easing.backOut
          }).start();
          modeItem.on("toggle", () => {
            this.changeMode(groupMode.listMode[i]);
          });
          0 === i && this.changeMode(groupMode.listMode[i]);
        }
      }
      changeMode(mode) {
        this.currentMode = mode;
        this.lbGuides[0].string = "" + mode.bet;
        this.lbGuides[1].string = "1";
        this.lbGuides[2].string = "" + mode.ratio;
        this.edbNumber.string = "";
        this.lbNumber.string = "";
        this.numberHolder.active = true;
        this.numberContent.active = false;
        this.edbBetPerNumber.string = "1";
        this.edbTotalBet.string = "" + mode.bet;
        this.lbWinBet.string = mode.ratio + "K";
        this.currentSelectedNumbers = [];
      }
      actionSubmitBet() {
        if (0 === this.currentSelectedNumbers.length) {
          App_1.default.instance.alertDialog.showMsg("B\u1ea1n ch\u01b0a ch\u1ecdn s\u1ed1 \u0111\u1ec1!");
          return;
        }
        App_1.default.instance.showLoading(true);
        let params = {
          gameType: this.currentMode.name,
          numbersInString: this.currentSelectedNumbers,
          betSize: 1e3 * Number(this.edbBetPerNumber.string),
          totalMoneyBet: 1e3 * Number(this.edbTotalBet.string),
          cityId: this.cities[this.dropDownCities.getValue()].id,
          accessToken: Configs_1.default.Login.AccessToken,
          date: this.getSession(this.dateOfBet)
        };
        cc.log(params);
        Http_1.default.post(Configs_1.default.App.API_LODE + "bet", params, (err, res) => {
          App_1.default.instance.showLoading(false);
          if (!this.node) return;
          if (null != err) {
            App_1.default.instance.alertDialog.showMsg("\u0110\u1eb7t c\u01b0\u1ee3c l\u1ed7i.");
            return;
          }
          cc.log(res);
          if (!res.success) {
            App_1.default.instance.alertDialog.showMsg(res.desc);
            return;
          }
          App_1.default.instance.alertDialog.showMsg("\u0110\u1eb7t c\u01b0\u1ee3c th\xe0nh c\xf4ng.");
          this.resetNumber();
        });
      }
      changeTabs(toggle) {
        let index = this.tabs.indexOf(toggle);
        this.tabContents.children.forEach((child, i) => child.active = i === index);
        switch (index) {
         case 0:
         case 1:
          break;

         case 2:
          this.scrollNewBet.scrollToBottom(.5);
          break;

         case 3:
          this.scrollChat.scrollToBottom(.5);
        }
      }
      checkAvaiableResultCurrentDate() {
        let date = new Date();
        Http_1.default.get(Configs_1.default.App.API_LODE + "cities", {
          date: this.getSession(date)
        }, (err, res) => {
          if (!this.node) return;
          if (null != err) return;
          cc.log(res);
          let citiesOfResult = LoDe_LoDeData_1.City.toCities(res);
          if (!citiesOfResult || 0 === citiesOfResult.length) {
            date.setDate(date.getDate() - 1);
            this.calendarResult.setLastestDateOfResult(date);
            this.requestGetCitiesOfResult(date);
            return;
          }
          let getResult = i => new Promise((resolve, reject) => {
            Http_1.default.get(Configs_1.default.App.API_LODE + "info", {
              date: this.getSession(date),
              cityId: citiesOfResult[i].id
            }, (err, res) => {
              null != err && reject(err);
              resolve(res);
            });
          });
          let self = this;
          function getResults() {
            return __awaiter(this, void 0, void 0, function*() {
              for (let i = 0; i < citiesOfResult.length; i++) {
                const result = yield getResult(i);
                if (!self.node) return;
                cc.log(result);
                if (result.hasOwnProperty("nhat") && Array.isArray(result["nhat"]) || result.hasOwnProperty("tam") && Array.isArray(result["tam"])) {
                  self.calendarResult.setLastestDateOfResult(date);
                  self.dateOfResult = date;
                  self.citiesOfResult = citiesOfResult;
                  self.dropDownCitiesResult.setOptions(self.citiesOfResult.map(city => city.name));
                  self.dropDownCitiesResult.setOnValueChange(idx => {
                    self.requestDailyResult();
                  });
                  self.dropDownCitiesResult.setValue(i);
                  self.dropDownCitiesResult.clickValue(i);
                  return;
                }
              }
              date.setDate(date.getDate() - 1);
              self.calendarResult.setLastestDateOfResult(date);
              self.requestGetCitiesOfResult(date);
              let distanceTimeReleases = citiesOfResult.map(city => Math.round((new Date(self.getSession(new Date()) + " " + city.timeRelease).getTime() - Date.now()) / 1e3));
              let distanceTimeReleaseEarliest = Math.min(...distanceTimeReleases) || 0;
              self.scheduleOnce(() => {
                self.calendarResult.setLastestDateOfResult(new Date());
                self.unschedule(self.scheduleDailyResult);
                self.requestGetCitiesOfResult(new Date(), distanceTimeReleases.indexOf(distanceTimeReleaseEarliest));
              }, distanceTimeReleaseEarliest);
            });
          }
          getResults();
        });
      }
      requestGetCitiesOfResult(date, selectIndex = 0) {
        this.dateOfResult = date;
        Http_1.default.get(Configs_1.default.App.API_LODE + "cities", {
          date: this.getSession(date)
        }, (err, res) => {
          App_1.default.instance.showLoading(false);
          if (!this.node) return;
          if (null != err) return;
          cc.log(res);
          this.citiesOfResult = LoDe_LoDeData_1.City.toCities(res);
          this.dropDownCitiesResult.setOptions(this.citiesOfResult.map(city => city.name));
          this.dropDownCitiesResult.setOnValueChange(idx => {
            this.requestDailyResult();
          });
          this.dropDownCitiesResult.setValue(selectIndex);
          this.dropDownCitiesResult.clickValue(selectIndex);
        });
      }
      requestDailyResult() {
        this.lbDateOfResult.string = this.formatDate(this.dateOfResult);
        Http_1.default.get(Configs_1.default.App.API_LODE + "info", {
          date: this.getSession(this.dateOfResult),
          cityId: this.citiesOfResult[this.dropDownCitiesResult.getValue()].id
        }, (err, res) => {
          if (!this.node) return;
          if (null != err) return;
          cc.log(res);
          this.gennerateResult(res);
          if (res.hasOwnProperty("finished") && !res["finished"]) {
            this.scheduleDailyResult = () => {
              this.requestDailyResult();
            };
            this.scheduleOnce(this.scheduleDailyResult, 5);
          }
        });
      }
      gennerateResult(result) {
        let lastTwoDigits = [];
        this.resultContent.children.forEach(child => {
          child.getChildByName("Values").children.forEach(v => v.removeAllChildren());
        });
        let valuesContentDb = this.resultContent.children[0].getChildByName("Values");
        if (result.hasOwnProperty("db") && Array.isArray(result["db"])) {
          valuesContentDb.active = true;
          result["db"].forEach((num, i) => {
            let numItem = cc.instantiate(this.resultItem);
            let lbNum = numItem.getComponentInChildren(cc.Label);
            lbNum.string = num;
            lbNum.fontSize = 30;
            lbNum.node.color = cc.Color.BLACK.fromHEX("#fdeaad");
            numItem.getComponentInChildren(cc.LabelOutline).color = cc.Color.BLACK.fromHEX("#ff8ff0");
            numItem.y = 0;
            if (result["db"].length > 4) {
              valuesContentDb.children[1].active = true;
              numItem.setParent(valuesContentDb.children[i < result["db"].length / 2 ? 0 : 1]);
            } else {
              valuesContentDb.children[1].active = false;
              numItem.setParent(valuesContentDb.children[0]);
            }
            lastTwoDigits.push(num.slice(num.length - 2));
          });
        } else valuesContentDb.active = false;
        let valuesContentNhat = this.resultContent.children[1].getChildByName("Values");
        if (result.hasOwnProperty("nhat") && Array.isArray(result["nhat"])) {
          valuesContentNhat.active = true;
          result["nhat"].forEach((num, i) => {
            let numItem = cc.instantiate(this.resultItem);
            let lbNum = numItem.getComponentInChildren(cc.Label);
            lbNum.string = num;
            numItem.y = 0;
            if (result["nhat"].length > 4) {
              valuesContentNhat.children[1].active = true;
              numItem.setParent(valuesContentNhat.children[i < result["nhat"].length / 2 ? 0 : 1]);
            } else {
              valuesContentNhat.children[1].active = false;
              numItem.setParent(valuesContentNhat.children[0]);
            }
            lastTwoDigits.push(num.slice(num.length - 2));
          });
        } else valuesContentNhat.active = false;
        let valuesContentNhi = this.resultContent.children[2].getChildByName("Values");
        if (result.hasOwnProperty("nhi") && Array.isArray(result["nhi"])) {
          valuesContentNhi.active = true;
          result["nhi"].forEach((num, i) => {
            let numItem = cc.instantiate(this.resultItem);
            let lbNum = numItem.getComponentInChildren(cc.Label);
            lbNum.string = num;
            numItem.y = 0;
            if (result["nhi"].length > 4) {
              valuesContentNhi.children[1].active = true;
              numItem.setParent(valuesContentNhi.children[i < result["nhi"].length / 2 ? 0 : 1]);
            } else {
              valuesContentNhi.children[1].active = false;
              numItem.setParent(valuesContentNhi.children[0]);
            }
            lastTwoDigits.push(num.slice(num.length - 2));
          });
        } else valuesContentNhi.active = false;
        let valuesContentBa = this.resultContent.children[3].getChildByName("Values");
        if (result.hasOwnProperty("ba") && Array.isArray(result["ba"])) {
          valuesContentBa.active = true;
          result["ba"].forEach((num, i) => {
            let numItem = cc.instantiate(this.resultItem);
            let lbNum = numItem.getComponentInChildren(cc.Label);
            lbNum.string = num;
            numItem.y = 0;
            if (result["ba"].length > 4) {
              valuesContentBa.children[1].active = true;
              numItem.setParent(valuesContentBa.children[i < result["ba"].length / 2 ? 0 : 1]);
            } else {
              valuesContentBa.children[1].active = false;
              numItem.setParent(valuesContentBa.children[0]);
            }
            lastTwoDigits.push(num.slice(num.length - 2));
          });
        } else valuesContentBa.active = false;
        let valuesContentBon = this.resultContent.children[4].getChildByName("Values");
        if (result.hasOwnProperty("bon") && Array.isArray(result["bon"])) {
          valuesContentBon.active = true;
          result["bon"].forEach((num, i) => {
            let numItem = cc.instantiate(this.resultItem);
            let lbNum = numItem.getComponentInChildren(cc.Label);
            lbNum.string = num;
            numItem.y = 0;
            if (result["bon"].length > 4) {
              valuesContentBon.children[1].active = true;
              numItem.setParent(valuesContentBon.children[i < result["bon"].length / 2 ? 0 : 1]);
            } else {
              valuesContentBon.children[1].active = false;
              numItem.setParent(valuesContentBon.children[0]);
            }
            lastTwoDigits.push(num.slice(num.length - 2));
          });
        } else valuesContentBon.active = false;
        let valuesContentNam = this.resultContent.children[5].getChildByName("Values");
        if (result.hasOwnProperty("nam") && Array.isArray(result["nam"])) {
          valuesContentNam.active = true;
          result["nam"].forEach((num, i) => {
            let numItem = cc.instantiate(this.resultItem);
            let lbNum = numItem.getComponentInChildren(cc.Label);
            lbNum.string = num;
            numItem.y = 0;
            if (result["nam"].length > 4) {
              valuesContentNam.children[1].active = true;
              numItem.setParent(valuesContentNam.children[i < result["nam"].length / 2 ? 0 : 1]);
            } else {
              valuesContentNam.children[1].active = false;
              numItem.setParent(valuesContentNam.children[0]);
            }
            lastTwoDigits.push(num.slice(num.length - 2));
          });
        } else valuesContentNam.active = false;
        let valuesContentSau = this.resultContent.children[6].getChildByName("Values");
        if (result.hasOwnProperty("sau") && Array.isArray(result["sau"])) {
          valuesContentSau.active = true;
          result["sau"].forEach((num, i) => {
            let numItem = cc.instantiate(this.resultItem);
            let lbNum = numItem.getComponentInChildren(cc.Label);
            lbNum.string = num;
            numItem.y = 0;
            if (result["sau"].length > 4) {
              valuesContentSau.children[1].active = true;
              numItem.setParent(valuesContentSau.children[i < result["sau"].length / 2 ? 0 : 1]);
            } else {
              valuesContentSau.children[1].active = false;
              numItem.setParent(valuesContentSau.children[0]);
            }
            lastTwoDigits.push(num.slice(num.length - 2));
          });
        } else valuesContentSau.active = false;
        let valuesContentBay = this.resultContent.children[7].getChildByName("Values");
        if (result.hasOwnProperty("bay") && Array.isArray(result["bay"])) {
          valuesContentBay.active = true;
          result["bay"].forEach((num, i) => {
            let numItem = cc.instantiate(this.resultItem);
            let lbNum = numItem.getComponentInChildren(cc.Label);
            lbNum.string = num;
            lbNum.node.color = cc.Color.BLACK.fromHEX(result.hasOwnProperty("tam") && Array.isArray(result["tam"]) && !result["tam"].every(s => !s) ? "#ffffff" : "#eb43ff");
            numItem.y = 0;
            if (result["bay"].length > 4) {
              valuesContentBay.children[1].active = true;
              numItem.setParent(valuesContentBay.children[i < result["bay"].length / 2 ? 0 : 1]);
            } else {
              valuesContentBay.children[1].active = false;
              numItem.setParent(valuesContentBay.children[0]);
            }
            lastTwoDigits.push(num.slice(num.length - 2));
          });
        } else valuesContentBay.active = false;
        if (result.hasOwnProperty("tam") && Array.isArray(result["tam"]) && !result["tam"].every(s => !s)) {
          this.resultContent.children[8].active = true;
          let valuesContentTam = this.resultContent.children[8].getChildByName("Values");
          result["tam"].forEach((num, i) => {
            let numItem = cc.instantiate(this.resultItem);
            let lbNum = numItem.getComponentInChildren(cc.Label);
            lbNum.string = num;
            lbNum.node.color = cc.Color.BLACK.fromHEX("#eb43ff");
            numItem.y = 0;
            if (result["tam"].length > 4) {
              valuesContentTam.children[1].active = true;
              numItem.setParent(valuesContentTam.children[i < result["tam"].length / 2 ? 0 : 1]);
            } else {
              valuesContentTam.children[1].active = false;
              numItem.setParent(valuesContentTam.children[0]);
            }
            lastTwoDigits.push(num.slice(num.length - 2));
          });
        } else this.resultContent.children[8].active = false;
        for (let i = 0; i < 10; i++) {
          let hangchuc = lastTwoDigits.filter(num => num.endsWith("" + i)).map(num => num[0]);
          let hangdonvi = lastTwoDigits.filter(num => num.startsWith("" + i)).map(num => num[1]);
          let lbs = this.statitics.children[i].getComponentsInChildren(cc.Label);
          lbs[0].string = hangchuc.sort().join(",");
          lbs[1].string = "" + i;
          lbs[2].string = hangdonvi.sort().join(",");
        }
      }
      actionNextCityOfResult() {
        this.unschedule(this.scheduleDailyResult);
        let currentCityIndex = this.dropDownCitiesResult.getValue();
        let nextCityIndex = currentCityIndex === this.citiesOfResult.length - 1 ? 0 : currentCityIndex + 1;
        this.dropDownCitiesResult.setValue(nextCityIndex);
        this.dropDownCitiesResult.clickValue(nextCityIndex);
      }
      actionPrevioursCityOfResult() {
        this.unschedule(this.scheduleDailyResult);
        let currentCityIndex = this.dropDownCitiesResult.getValue();
        let previoursCityIndex = 0 === currentCityIndex ? this.citiesOfResult.length - 1 : currentCityIndex - 1;
        this.dropDownCitiesResult.setValue(previoursCityIndex);
        this.dropDownCitiesResult.clickValue(previoursCityIndex);
      }
      actionNextDateOfResult() {
        let lastestDateOfResutl = this.calendarResult.getLastestDateOfResult();
        let date = new Date(this.dateOfResult);
        date.setDate(date.getDate() + 1);
        (date.getFullYear() === lastestDateOfResutl.getFullYear() && date.getMonth() === lastestDateOfResutl.getMonth() && date.getDate() === lastestDateOfResutl.getDate() || date < lastestDateOfResutl) && this.updateDateOfResult(date);
      }
      actionPrevioursDateOfResult() {
        let date = new Date(this.dateOfResult);
        date.setDate(date.getDate() - 1);
        this.updateDateOfResult(date);
      }
      actionSendChat() {
        let msg = this.edtChatInput.string.trim();
        if (msg.length > 0) {
          this.edtChatInput.string = "";
          MiniGameNetworkClient_1.default.getInstance().send(new LoDe_Cmd_1.default.SendChat(unescape(encodeURIComponent(msg))));
        }
      }
      addChat(message) {
        let item = null;
        for (var i = 0; i < this.scrollChat.content.childrenCount; i++) {
          let node = this.scrollChat.content.children[i];
          if (!node.active) {
            item = node;
            break;
          }
        }
        null == item && (item = this.scrollChat.content.childrenCount >= 50 ? this.scrollChat.content.children[0] : cc.instantiate(this.itemChatTemplate));
        var zIndex = 0;
        for (var i = 0; i < this.scrollChat.content.childrenCount; i++) {
          let node = this.scrollChat.content.children[i];
          node != item && (node.zIndex = zIndex++);
        }
        item.parent = this.scrollChat.content;
        item.active = true;
        item.zIndex = zIndex++;
        let chatRichText = item.getComponentInChildren(cc.RichText);
        chatRichText.imageAtlas = this.atlasVip;
        let vipColor = Utils_1.default.getColorVip("VIP_" + message.vipId);
        let content = "<color=" + vipColor + "><outline color=" + vipColor + "width=1>" + message.nickname + "</outline></color> <img src='Vip" + message.vipId + "' offset=0,-7/><img src='VIP_" + message.vipId + "' offset=0,-7/>:  " + message.message;
        chatRichText.string = content;
        this.scheduleOnce(() => {
          this.scrollChat.scrollToBottom(.5);
        }, .5);
      }
      formatDate(date) {
        var month = "" + (date.getMonth() + 1);
        var day = "" + date.getDate();
        var year = date.getFullYear();
        month.length < 2 && (month = "0" + month);
        day.length < 2 && (day = "0" + day);
        return [ day, month, year ].join("/");
      }
      getSession(date) {
        var month = "" + (date.getMonth() + 1);
        var day = "" + date.getDate();
        var year = date.getFullYear();
        month.length < 2 && (month = "0" + month);
        day.length < 2 && (day = "0" + day);
        return [ year, month, day ].join("-");
      }
      formatShortDate(date) {
        var month = "" + (date.getMonth() + 1);
        var day = "" + date.getDate();
        month.length < 2 && (month = "0" + month);
        day.length < 2 && (day = "0" + day);
        return [ day, month ].join("/");
      }
      getLongSession(date) {
        var month = "" + (date.getMonth() + 1);
        var day = "" + date.getDate();
        var year = date.getFullYear();
        var hour = "" + date.getHours();
        var minutes = "" + date.getMinutes();
        var seconds = "" + date.getSeconds();
        month.length < 2 && (month = "0" + month);
        day.length < 2 && (day = "0" + day);
        hour.length < 2 && (hour = "0" + hour);
        minutes.length < 2 && (minutes = "0" + minutes);
        seconds.length < 2 && (seconds = "0" + seconds);
        return [ year, month, day ].join("-") + "T" + [ hour, minutes, seconds ].join(":");
      }
      onBetPerNumberChanged(betStr) {
        if (betStr.length > 0) {
          if (false == /^[0-9]*$/.test(betStr)) {
            App_1.default.instance.alertDialog.showMsg("Ti\u1ec1n c\u01b0\u1ee3c ph\u1ea3i l\xe0 s\u1ed1 d\u01b0\u01a1ng");
            this.edbBetPerNumber.string = "1";
            betStr = "1";
          }
          let raw = parseInt(betStr);
          if (0 == raw) {
            this.edbBetPerNumber.string = "1";
            betStr = "1";
          }
          this.edbBetPerNumber.string = "" + parseInt(betStr);
        } else {
          this.edbBetPerNumber.string = "1";
          betStr = "1";
        }
        let delta = parseInt(betStr);
        let countNum = 0 === this.currentMode.numberRequired && this.currentSelectedNumbers.length > 0 ? this.currentSelectedNumbers.length : 1;
        this.edbTotalBet.string = "" + this.currentMode.bet * delta * countNum;
        this.lbWinBet.string = this.currentMode.ratio * delta + "K";
      }
      onTotalBetChanged(betStr) {
        if (betStr.length > 0) {
          if (false == /^[0-9]*$/.test(betStr)) {
            App_1.default.instance.alertDialog.showMsg("Ti\u1ec1n c\u01b0\u1ee3c ph\u1ea3i l\xe0 s\u1ed1 d\u01b0\u01a1ng");
            this.edbTotalBet.string = "" + this.currentMode.bet;
            betStr = "" + this.currentMode.bet;
          }
          let raw = parseInt(betStr);
          if (0 == raw) {
            this.edbTotalBet.string = "" + this.currentMode.bet;
            betStr = "" + this.currentMode.bet;
          }
          this.edbTotalBet.string = "" + parseInt(betStr);
        } else {
          this.edbTotalBet.string = "1";
          betStr = "1";
        }
        let totalBet = parseInt(betStr);
        if (totalBet < this.currentMode.bet) {
          totalBet = this.currentMode.bet;
          this.edbTotalBet.string = totalBet + "";
        }
        let countNum = 0 === this.currentMode.numberRequired && this.currentSelectedNumbers.length > 0 ? this.currentSelectedNumbers.length : 1;
        this.edbBetPerNumber.string = "" + Math.round(totalBet / this.currentMode.bet / countNum * 100) / 100;
        this.lbWinBet.string = Math.round(this.currentMode.ratio * (totalBet / this.currentMode.bet / countNum) * 100) / 100 + "K";
      }
      actionBack() {
        MiniGameNetworkClient_1.default.getInstance().send(new LoDe_Cmd_1.default.SendUnScribeChat());
        cc.audioEngine.stopAll();
        App_1.default.instance.loadScene("Lobby");
      }
      actionAddCoin() {
        Lobby_PopupShop_1.default.createAndShow(App_1.default.instance.popups);
      }
      onNumberBegan() {
        this.numberHolder.active = false;
        if (cc.sys.isNative) {
          this.numberContent.active = true;
          cc.tween(this.numberCursor).repeatForever(cc.blink(1, 1)).start();
          this.lbNumber.string.length > 0 && (this.lbNumber.string = this.lbNumber.string + "-");
        } else this.numberContent.active = false;
      }
      onNumberChanged() {
        if (cc.sys.isNative) {
          let numberArr = this.edbNumber.string.replace(/[^0-9]/g, "").match(new RegExp(".{1," + this.currentMode.numberDigits + "}", "g"));
          if (numberArr) {
            this.lbNumber.string = numberArr.join("-");
            numberArr[numberArr.length - 1].length === this.currentMode.numberDigits && (this.lbNumber.string = this.lbNumber.string + "-");
          } else this.lbNumber.string = "";
        }
      }
      onNumberEnded() {
        cc.Tween.stopAllByTarget(this.numberCursor);
        this.numberCursor.active = false;
        let numberArr = this.edbNumber.string.replace(/[^0-9]/g, "").match(new RegExp(".{1," + this.currentMode.numberDigits + "}", "g"));
        if (numberArr) {
          numberArr[numberArr.length - 1].length < this.currentMode.numberDigits && numberArr.pop();
          numberArr.length > this.currentMode.quantityNumber && App_1.default.instance.toast.showToast("B\u1ea1n ch\u1ec9 \u0111\u01b0\u1ee3c ch\u1ecdn t\u1ed1i \u0111a " + this.currentMode.quantityNumber + " s\u1ed1");
          numberArr.splice(this.currentMode.quantityNumber);
          if (numberArr.length > 0) {
            this.currentSelectedNumbers = [ ...new Set(numberArr) ];
            this.lbNumber.string = this.currentSelectedNumbers.join("-");
            this.edbNumber.string = this.currentSelectedNumbers.join("");
            this.numberContent.active = true;
            let countNum = 0 === this.currentMode.numberRequired && this.currentSelectedNumbers.length > 0 ? this.currentSelectedNumbers.length : 1;
            let currentBetPerNumber = Number(this.edbBetPerNumber.string);
            this.edbTotalBet.string = "" + Math.round(this.currentMode.bet * currentBetPerNumber * countNum * 100) / 100;
            this.lbWinBet.string = Math.round(this.currentMode.ratio * currentBetPerNumber * 100) / 100 + "K";
          } else this.resetNumber();
        } else this.resetNumber();
      }
      resetNumber() {
        this.currentSelectedNumbers = [];
        this.numberHolder.active = true;
        this.numberContent.active = false;
        this.lbNumber.string = "";
        this.edbNumber.string = "";
        this.onBetPerNumberChanged("");
      }
      actionSelectNumber() {
        this.popupSelectNumber.showSelectNumber(this.currentSelectedNumbers, this.currentMode);
      }
      updateCurrentSelectedNumbers(selectedNumbers) {
        this.currentSelectedNumbers = [ ...selectedNumbers ];
        if (0 == this.currentSelectedNumbers.length) {
          this.resetNumber();
          return;
        }
        this.lbNumber.string = this.currentSelectedNumbers.join("-");
        this.edbNumber.string = this.currentSelectedNumbers.join("");
        this.numberContent.active = true;
        this.numberCursor.active = false;
        this.numberHolder.active = false;
        let countNum = 0 === this.currentMode.numberRequired && this.currentSelectedNumbers.length > 0 ? this.currentSelectedNumbers.length : 1;
        let currentBetPerNumber = Number(this.edbBetPerNumber.string);
        this.edbTotalBet.string = "" + Math.round(this.currentMode.bet * currentBetPerNumber * countNum * 100) / 100;
        this.lbWinBet.string = Math.round(this.currentMode.ratio * currentBetPerNumber * 100) / 100 + "K";
      }
      actionHistory() {
        this.popupHistory.showHistory(this.gameModes, this.allCities);
      }
      requestGetNewBetHistory() {
        Http_1.default.get(Configs_1.default.App.API_LODE + "getGlobalHistory", {
          page: 0,
          size: 20
        }, (err, res) => {
          if (!this.node) return;
          if (null != err || !res["success"]) return;
          cc.log(res);
          let historys = res["lotteryResults"];
          for (let i = 0; i < historys.length; i++) {
            const history = historys[i];
            let historyItem = this.scrollNewBet.content.children[i];
            if (!historyItem) {
              historyItem = cc.instantiate(this.itemNewBet);
              historyItem.parent = this.scrollNewBet.content;
            }
            historyItem.active = true;
            let lbs = historyItem.getComponentsInChildren(cc.Label);
            lbs[0].string = history["nickName"].length > 16 ? history["nickName"].substr(0, 13) + "..." : history["nickName"];
            let gameMode = this.gameModes.find(mode => mode.name === history["gameType"]);
            lbs[1].string = (gameMode ? gameMode.displayName : history["gameType"]) + ":";
            lbs[2].string = history["betNumbers"].length > 20 ? history["betNumbers"].substr(0, 17) + "..." : history["betNumbers"];
            lbs[3].string = Utils_1.default.formatMoneyChip(history["betMoney"]);
            let city = this.allCities.find(city => city.id == history["cityId"]);
            lbs[4].string = "(" + (city ? city.name : history["cityId"]) + ")";
          }
        });
      }
      actionHonors() {
        this.popupHonors.show();
      }
      updateDateOfBet(date) {
        this.dateOfBet = date;
        this.lbDateOfBet.string = this.formatDate(this.dateOfBet);
        this.requestGetCitiesOfBet(date);
      }
      actionShowCalendarResult() {
        this.calendarResult.show(this.dateOfResult);
      }
      updateDateOfResult(date) {
        this.unschedule(this.scheduleDailyResult);
        this.requestGetCitiesOfResult(date);
      }
      requestAllCities() {
        Http_1.default.get(Configs_1.default.App.API_LODE + "cities", {}, (err, res) => {
          App_1.default.instance.showLoading(false);
          if (!this.node) return;
          this.buttonHonors.active = true;
          this.buttonHistory.active = true;
          if (null != err) return;
          cc.log(res);
          this.allCities = LoDe_LoDeData_1.City.toCities(res);
          this.requestGetNewBetHistory();
          this.schedule(this.requestGetNewBetHistory, 5);
        });
      }
      actionGuide() {
        this.popupGuide.showGuide(this.currentMode);
      }
    };
    LoDeController.instance = null;
    __decorate([ property(cc.Label) ], LoDeController.prototype, "labelUserGold", void 0);
    __decorate([ property(cc.Toggle) ], LoDeController.prototype, "tabs", void 0);
    __decorate([ property(cc.Node) ], LoDeController.prototype, "tabContents", void 0);
    __decorate([ property(CustomUI_Dropdown_1.default) ], LoDeController.prototype, "dropDownCities", void 0);
    __decorate([ property(cc.Label) ], LoDeController.prototype, "lbWinBet", void 0);
    __decorate([ property(cc.EditBox) ], LoDeController.prototype, "edbBetPerNumber", void 0);
    __decorate([ property(cc.EditBox) ], LoDeController.prototype, "edbTotalBet", void 0);
    __decorate([ property(cc.Label) ], LoDeController.prototype, "lbDateOfBet", void 0);
    __decorate([ property(cc.Label) ], LoDeController.prototype, "lbCountDownTimeRelease", void 0);
    __decorate([ property(cc.Node) ], LoDeController.prototype, "listGroupMode", void 0);
    __decorate([ property(cc.Node) ], LoDeController.prototype, "itemGroupMode", void 0);
    __decorate([ property(cc.Node) ], LoDeController.prototype, "listMode", void 0);
    __decorate([ property(cc.Node) ], LoDeController.prototype, "itemMode", void 0);
    __decorate([ property([ cc.Label ]) ], LoDeController.prototype, "lbGuides", void 0);
    __decorate([ property(cc.Node) ], LoDeController.prototype, "btnGuide", void 0);
    __decorate([ property(cc.EditBox) ], LoDeController.prototype, "edbNumber", void 0);
    __decorate([ property(cc.Node) ], LoDeController.prototype, "numberHolder", void 0);
    __decorate([ property(cc.Node) ], LoDeController.prototype, "numberContent", void 0);
    __decorate([ property(cc.Label) ], LoDeController.prototype, "lbNumber", void 0);
    __decorate([ property(cc.Node) ], LoDeController.prototype, "numberCursor", void 0);
    __decorate([ property(cc.Node) ], LoDeController.prototype, "resultContent", void 0);
    __decorate([ property(cc.Node) ], LoDeController.prototype, "resultItem", void 0);
    __decorate([ property(CustomUI_Dropdown_1.default) ], LoDeController.prototype, "dropDownCitiesResult", void 0);
    __decorate([ property(cc.EditBox) ], LoDeController.prototype, "edtChatInput", void 0);
    __decorate([ property(cc.Node) ], LoDeController.prototype, "itemChatTemplate", void 0);
    __decorate([ property(cc.ScrollView) ], LoDeController.prototype, "scrollChat", void 0);
    __decorate([ property(cc.SpriteAtlas) ], LoDeController.prototype, "atlasVip", void 0);
    __decorate([ property(cc.Node) ], LoDeController.prototype, "itemNewBet", void 0);
    __decorate([ property(cc.ScrollView) ], LoDeController.prototype, "scrollNewBet", void 0);
    __decorate([ property(LoDe_PopupSelectNumber_1.default) ], LoDeController.prototype, "popupSelectNumber", void 0);
    __decorate([ property(LoDe_PopupHistory_1.default) ], LoDeController.prototype, "popupHistory", void 0);
    __decorate([ property(LoDe_PopupHonors_1.default) ], LoDeController.prototype, "popupHonors", void 0);
    __decorate([ property(LoDe_PopupGuide_1.default) ], LoDeController.prototype, "popupGuide", void 0);
    __decorate([ property({
      type: cc.AudioClip
    }) ], LoDeController.prototype, "musicBackground", void 0);
    __decorate([ property(LoDe_CalendarBet_1.default) ], LoDeController.prototype, "calendarBet", void 0);
    __decorate([ property(LoDe_CalendarResult_1.default) ], LoDeController.prototype, "calendarResult", void 0);
    __decorate([ property(cc.Label) ], LoDeController.prototype, "lbDateOfResult", void 0);
    __decorate([ property(cc.Node) ], LoDeController.prototype, "statitics", void 0);
    __decorate([ property(cc.Node) ], LoDeController.prototype, "buttonHonors", void 0);
    __decorate([ property(cc.Node) ], LoDeController.prototype, "buttonHistory", void 0);
    LoDeController = LoDeController_1 = __decorate([ ccclass ], LoDeController);
    exports.default = LoDeController;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/App": void 0,
    "../../Main/Game/src/common/BroadcastReceiver": void 0,
    "../../Main/Game/src/common/Common.AudioManager": void 0,
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/common/Constants": void 0,
    "../../Main/Game/src/common/Http": void 0,
    "../../Main/Game/src/common/Tween": void 0,
    "../../Main/Game/src/common/Utils": void 0,
    "../../Main/Game/src/customui/CustomUI.Dropdown": void 0,
    "../../Main/Game/src/networks/MiniGameNetworkClient": void 0,
    "../../Main/Game/src/networks/Network.InPacket": void 0,
    "../../Main/Lobby/src/Lobby.PopupShop": void 0,
    "./LoDe.CalendarBet": "LoDe.CalendarBet",
    "./LoDe.CalendarResult": "LoDe.CalendarResult",
    "./LoDe.Cmd": "LoDe.Cmd",
    "./LoDe.LoDeData": "Lode.LodeData",
    "./LoDe.PopupGuide": "Lode.PopupGuide",
    "./LoDe.PopupHistory": "Lode.PopupHistory",
    "./LoDe.PopupHonors": "Lode.PopupHonors",
    "./LoDe.PopupSelectNumber": "LoDe.PopupSelectNumber"
  } ],
  "LoDe.PopupSelectNumber": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "68e36DegLpD87cgFXxIdvZo", "LoDe.PopupSelectNumber");
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
    const Dialog_1 = require("../../Main/Game/src/common/Dialog");
    const LoDe_Controller_1 = require("./LoDe.Controller");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let LoDePopupSelectNumber = class LoDePopupSelectNumber extends Dialog_1.default {
      constructor() {
        super(...arguments);
        this.numberContent = null;
        this.numberItemTemplate = null;
        this.toggle3Digits = null;
        this.currentSelectedNumbers = [];
        this.currentMode = null;
      }
      start() {
        for (let i = 0; i < this.toggle3Digits.node.childrenCount; i++) {
          let toggle = this.toggle3Digits.node.children[i];
          toggle.on("toggle", () => {
            this.generateNumber(3, i);
          });
        }
      }
      showSelectNumber(selectedNumbers, currentMode) {
        this.show();
        let numDigits = currentMode.numberDigits;
        this.container.y = 3 === numDigits ? 50 : 0;
        this.toggle3Digits.node.active = 3 === numDigits;
        this.toggle3Digits.node.children[0].getComponent(cc.Toggle).check();
        this.currentSelectedNumbers = [ ...selectedNumbers ];
        this.currentMode = currentMode;
        this.generateNumber(numDigits);
      }
      generateNumber(numDigits, index = 0) {
        let totalNumber = 1 === numDigits ? 10 : 100;
        for (let i = totalNumber; i < this.numberContent.childrenCount; i++) this.numberContent.children[i].active = false;
        for (let i = 0; i < totalNumber; i++) {
          let numberItem = this.numberContent.children[i];
          numberItem || (numberItem = cc.instantiate(this.numberItemTemplate));
          numberItem.active = true;
          numberItem.parent = this.numberContent;
          let numberString = "";
          switch (numDigits) {
           case 1:
            numberString = "" + i;
            break;

           case 2:
            numberString = ("0" + i).slice(-2);
            break;

           case 3:
            numberString = ("00" + (i + 100 * index)).slice(-3);
          }
          numberItem.children.forEach(child => child.getComponentInChildren(cc.Label).string = numberString);
          numberItem.off("toggle");
          numberItem.on("toggle", toggle => {
            if (toggle.isChecked) if (this.currentSelectedNumbers.length === this.currentMode.quantityNumber) {
              App_1.default.instance.toast.showToast("B\u1ea1n ch\u1ec9 \u0111\u01b0\u1ee3c ch\u1ecdn t\u1ed1i \u0111a " + this.currentMode.quantityNumber + " s\u1ed1");
              toggle.isChecked = false;
            } else this.currentSelectedNumbers.push(numberString); else {
              let removeIndex = this.currentSelectedNumbers.indexOf(numberString);
              removeIndex > -1 && this.currentSelectedNumbers.splice(removeIndex, 1);
            }
          });
          numberItem.getComponent(cc.Toggle).isChecked = this.currentSelectedNumbers.indexOf(numberString) > -1;
        }
      }
      dismiss() {
        this.currentSelectedNumbers = [];
        super.dismiss();
      }
      actionConfirm() {
        LoDe_Controller_1.default.getInstance().updateCurrentSelectedNumbers(this.currentSelectedNumbers);
        this.dismiss();
      }
    };
    __decorate([ property(cc.Node) ], LoDePopupSelectNumber.prototype, "numberContent", void 0);
    __decorate([ property(cc.Node) ], LoDePopupSelectNumber.prototype, "numberItemTemplate", void 0);
    __decorate([ property(cc.ToggleContainer) ], LoDePopupSelectNumber.prototype, "toggle3Digits", void 0);
    LoDePopupSelectNumber = __decorate([ ccclass ], LoDePopupSelectNumber);
    exports.default = LoDePopupSelectNumber;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/App": void 0,
    "../../Main/Game/src/common/Dialog": void 0,
    "./LoDe.Controller": "LoDe.Controller"
  } ],
  "LoDeSieuToc.Controller": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0878f/rNH9EH6FRTv5B2a6a", "LoDeSieuToc.Controller");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var LoDeSieuTocController_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    const App_1 = require("../../Main/Game/src/common/App");
    const BroadcastReceiver_1 = require("../../Main/Game/src/common/BroadcastReceiver");
    const Lobby_PopupShop_1 = require("../../Main/Lobby/src/Lobby.PopupShop");
    const Tween_1 = require("../../Main/Game/src/common/Tween");
    const Network_InPacket_1 = require("../../Main/Game/src/networks/Network.InPacket");
    const MiniGameNetworkClient_1 = require("../../Main/Game/src/networks/MiniGameNetworkClient");
    const Http_1 = require("../../Main/Game/src/common/Http");
    const Common_AudioManager_1 = require("../../Main/Game/src/common/Common.AudioManager");
    const LoDe_Cmd_1 = require("./LoDe.Cmd");
    const LoDe_LoDeData_1 = require("./LoDe.LoDeData");
    const LoDeSieuToc_Play_1 = require("./LoDeSieuToc.Play");
    const LoDeSieuToc_History_1 = require("./LoDeSieuToc.History");
    const LoDeSieuToc_GlobalBet_1 = require("./LoDeSieuToc.GlobalBet");
    const LoDeSieuToc_PopupResult_1 = require("./LoDeSieuToc.PopupResult");
    const LoDeSieuToc_PopupHonors_1 = require("./LoDeSieuToc.PopupHonors");
    const LoDeSieuToc_PopupNotiResult_1 = require("./LoDeSieuToc.PopupNotiResult");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let LoDeSieuTocController = LoDeSieuTocController_1 = class LoDeSieuTocController extends cc.Component {
      constructor() {
        super(...arguments);
        this.labelUserGold = null;
        this.musicBackground = null;
        this.buttonHonors = null;
        this.buttonHistory = null;
        this.play = null;
        this.history = null;
        this.globalBet = null;
        this.scrollGame = null;
        this.safeArea = null;
        this.popupResult = null;
        this.popupHonors = null;
        this.popupNotiResult = null;
        this.sieuTocGameTypes = [];
      }
      static getInstance() {
        return this.instance;
      }
      static destroyInstance() {
        return this.instance;
      }
      onLoad() {
        LoDeSieuTocController_1.instance = this;
        this.buttonHonors.active = false;
      }
      start() {
        Common_AudioManager_1.default.getInstance().playBackgroundMusic(this.musicBackground, true);
        BroadcastReceiver_1.default.register(BroadcastReceiver_1.default.USER_UPDATE_COIN, () => {
          Tween_1.default.numberTo(this.labelUserGold, Configs_1.default.Login.Coin, .3);
        }, this);
        BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN);
        MiniGameNetworkClient_1.default.getInstance().addListener(data => {
          let inPacket = new Network_InPacket_1.default(data);
          switch (inPacket.getCmdId()) {
           case LoDe_Cmd_1.default.Code.UPDATE_USER_MONEY:
            {
              let res = new LoDe_Cmd_1.default.ReceivedUpdateUserMoney(data);
              cc.log(res);
              Configs_1.default.Login.Coin = res.totalMoney;
              res.changeMoney < 0 && BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN);
              res.showPopup && App_1.default.instance.alertDialog.showMsg("C\xf3 th\u01b0 m\u1edbi :\n" + res.desc);
            }
          }
        }, this);
        App_1.default.instance.showLoading(true);
        this.requestGetGameModes();
        cc.game.on(cc.game.EVENT_HIDE, function() {
          cc.sys.localStorage.setItem("lode_time_hide", Date.now());
        });
        cc.game.on(cc.game.EVENT_SHOW, function() {
          let timeHide = cc.sys.localStorage.getItem("lode_time_hide");
          if (timeHide) {
            let deltaTime = Math.round((Date.now() - JSON.parse(cc.sys.localStorage.getItem("lode_time_hide"))) / 1e3);
            cc.sys.localStorage.removeItem("lode_time_hide");
            if (deltaTime > 5) {
              App_1.default.instance.showLoading(true);
              MiniGameNetworkClient_1.default.getInstance().checkConnect(() => {
                cc.director.loadScene("LoDeSieuToc", () => {
                  App_1.default.instance.showLoading(false);
                });
              });
            }
          }
        });
      }
      onDestroy() {
        LoDeSieuTocController_1.destroyInstance();
        cc.game.clear();
      }
      requestGetCities(date) {
        Http_1.default.get(Configs_1.default.App.API_LODE_SIEU_TOC + "cities", {
          date: this.getSession(date)
        }, (err, res) => {
          if (!this.node) return;
          if (null != err) {
            App_1.default.instance.alertDialog.showMsgWithOnDismissed("H\u1ec7 th\u1ed1ng \u0111ang b\u1ea3o tr\xec, vui l\xf2ng quay l\u1ea1i sau.", () => {
              this.actionBack();
            });
            return;
          }
          cc.log(res);
          this.cities = LoDe_LoDeData_1.City.toCities(res);
          this.requestSieuTocGameTypes();
          this.play.setCities();
          let nextDate = new Date(date);
          nextDate.setDate(nextDate.getDate() + 1);
          nextDate.setHours(0, 0, 1, 0);
          this.scheduleOnce(() => {
            this.requestGetCities(new Date());
          }, Math.ceil((nextDate.getTime() - date.getTime()) / 1e3));
        });
      }
      requestGetGameModes() {
        Http_1.default.get(Configs_1.default.App.API_LODE_SIEU_TOC + "gameTypes", {}, (err, res) => {
          if (!this.node) return;
          if (null != err) {
            App_1.default.instance.showLoading(false);
            App_1.default.instance.alertDialog.showMsgWithOnDismissed("H\u1ec7 th\u1ed1ng \u0111ang b\u1ea3o tr\xec, vui l\xf2ng quay l\u1ea1i sau.", () => {
              this.actionBack();
            });
            return;
          }
          cc.log(res);
          this.gameModes = LoDe_LoDeData_1.GameMode.toGameModes(res);
          this.requestGetCities(new Date());
          this.requestAllCities();
        });
      }
      getSession(date) {
        var month = "" + (date.getMonth() + 1);
        var day = "" + date.getDate();
        var year = date.getFullYear();
        month.length < 2 && (month = "0" + month);
        day.length < 2 && (day = "0" + day);
        return [ year, month, day ].join("-");
      }
      actionBack() {
        cc.audioEngine.stopAll();
        App_1.default.instance.loadScene("Lobby");
      }
      actionAddCoin() {
        Lobby_PopupShop_1.default.createAndShow(App_1.default.instance.popups);
      }
      actionHistory() {
        if (!this.history.node.active) {
          App_1.default.instance.toast.showToast("B\u1ea1n ch\u01b0a \u0111\u1eb7t c\u01b0\u1ee3c");
          return;
        }
        this.scrollGame.scrollToPercentVertical(.75, .2);
      }
      actionHonors() {
        this.popupHonors.show();
      }
      requestAllCities() {
        Http_1.default.get(Configs_1.default.App.API_LODE_SIEU_TOC + "cities", {}, (err, res) => {
          App_1.default.instance.showLoading(false);
          if (!this.node) return;
          this.buttonHonors.active = true;
          if (null != err) return;
          cc.log(res);
          this.allCities = LoDe_LoDeData_1.City.toCities(res);
          this.popupResult.setAllCities();
        });
      }
      requestSieuTocGameTypes() {
        Http_1.default.get(Configs_1.default.App.API_LODE_SIEU_TOC + "quickGameTypes", {}, (err, res) => {
          App_1.default.instance.showLoading(false);
          if (!this.node) return;
          if (null != err) return;
          cc.log(res);
          this.sieuTocGameTypes = LoDe_LoDeData_1.SieuTocGameType.toSieuTocGameTypes(res);
          this.play.setSieuTocGameTypes();
          this.popupResult.setGameTypes();
          this.globalBet.show();
          this.history.show();
        });
      }
      actionScrollToTop() {
        this.scrollGame.scrollToTop(.2);
      }
    };
    LoDeSieuTocController.instance = null;
    __decorate([ property(cc.Label) ], LoDeSieuTocController.prototype, "labelUserGold", void 0);
    __decorate([ property({
      type: cc.AudioClip
    }) ], LoDeSieuTocController.prototype, "musicBackground", void 0);
    __decorate([ property(cc.Node) ], LoDeSieuTocController.prototype, "buttonHonors", void 0);
    __decorate([ property(cc.Node) ], LoDeSieuTocController.prototype, "buttonHistory", void 0);
    __decorate([ property(LoDeSieuToc_Play_1.default) ], LoDeSieuTocController.prototype, "play", void 0);
    __decorate([ property(LoDeSieuToc_History_1.default) ], LoDeSieuTocController.prototype, "history", void 0);
    __decorate([ property(LoDeSieuToc_GlobalBet_1.default) ], LoDeSieuTocController.prototype, "globalBet", void 0);
    __decorate([ property(cc.ScrollView) ], LoDeSieuTocController.prototype, "scrollGame", void 0);
    __decorate([ property(cc.SafeArea) ], LoDeSieuTocController.prototype, "safeArea", void 0);
    __decorate([ property(LoDeSieuToc_PopupResult_1.default) ], LoDeSieuTocController.prototype, "popupResult", void 0);
    __decorate([ property(LoDeSieuToc_PopupHonors_1.default) ], LoDeSieuTocController.prototype, "popupHonors", void 0);
    __decorate([ property(LoDeSieuToc_PopupNotiResult_1.default) ], LoDeSieuTocController.prototype, "popupNotiResult", void 0);
    LoDeSieuTocController = LoDeSieuTocController_1 = __decorate([ ccclass ], LoDeSieuTocController);
    exports.default = LoDeSieuTocController;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/App": void 0,
    "../../Main/Game/src/common/BroadcastReceiver": void 0,
    "../../Main/Game/src/common/Common.AudioManager": void 0,
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/common/Http": void 0,
    "../../Main/Game/src/common/Tween": void 0,
    "../../Main/Game/src/networks/MiniGameNetworkClient": void 0,
    "../../Main/Game/src/networks/Network.InPacket": void 0,
    "../../Main/Lobby/src/Lobby.PopupShop": void 0,
    "./LoDe.Cmd": "LoDe.Cmd",
    "./LoDe.LoDeData": "Lode.LodeData",
    "./LoDeSieuToc.GlobalBet": "LoDeSieuToc.GlobalBet",
    "./LoDeSieuToc.History": "LodeSieuToc.History",
    "./LoDeSieuToc.Play": "LoDeSieuToc.Play",
    "./LoDeSieuToc.PopupHonors": "LoDeSieuToc.PopupHonors",
    "./LoDeSieuToc.PopupNotiResult": "LoDeSieuToc.PopupNotiResult",
    "./LoDeSieuToc.PopupResult": "LoDeSieuToc.PopupResult"
  } ],
  "LoDeSieuToc.Dialog": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b825aUS2llPB4yzttcPx0ks", "LoDeSieuToc.Dialog");
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
    let LoDeSieuTocDialog = class LoDeSieuTocDialog extends cc.Component {
      show() {
        cc.Tween.stopAllByTarget(this.node);
        this.node.active = true;
        cc.tween(this.node).set({
          position: cc.v3(-cc.winSize.width, 0)
        }).to(.4, {
          position: cc.v3(0, 0)
        }).start();
      }
      dismiss() {
        cc.Tween.stopAllByTarget(this.node);
        cc.tween(this.node).to(.4, {
          position: cc.v3(-cc.winSize.width, 0)
        }).call(() => {
          this.node.active = false;
        }).start();
      }
    };
    LoDeSieuTocDialog = __decorate([ ccclass ], LoDeSieuTocDialog);
    exports.default = LoDeSieuTocDialog;
    cc._RF.pop();
  }, {} ],
  "LoDeSieuToc.GlobalBet": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c3033o+AQdGjJsEHD4o38qh", "LoDeSieuToc.GlobalBet");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    const Http_1 = require("../../Main/Game/src/common/Http");
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const LoDeSieuToc_Controller_1 = require("./LoDeSieuToc.Controller");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let LoDeSieuTocGlobalBet = class LoDeSieuTocGlobalBet extends cc.Component {
      constructor() {
        super(...arguments);
        this.globalBetItem = null;
        this.atlasVip = null;
        this.pageSize = 10;
      }
      start() {
        this.globalBetItem.active = false;
      }
      onDestroy() {
        this.unschedule(this.requestGetGlobalBetHistory);
      }
      show() {
        this.requestGetGlobalBetHistory();
        this.schedule(this.requestGetGlobalBetHistory, 3);
      }
      requestGetGlobalBetHistory() {
        Http_1.default.get(Configs_1.default.App.API_LODE_SIEU_TOC + "getGlobalHistory", {
          page: 0,
          size: this.pageSize
        }, (err, res) => {
          if (!this.node) return;
          if (null != err || !res["success"]) return;
          let historys = res["lotteryResults"];
          if (0 === historys.length) return;
          let nickNames = historys.map(history => history.nickName);
          Http_1.default.get(Configs_1.default.App.API, {
            c: 6031,
            nns: nickNames
          }, (err, res) => {
            if (!this.node) return;
            if (null != err || !res["success"]) return;
            this.node.active = 0 !== historys.length;
            for (let i = 0; i < historys.length; i++) {
              const history = historys[i];
              let historyItem = this.node.children[i];
              if (!historyItem) {
                historyItem = cc.instantiate(this.globalBetItem);
                historyItem.parent = this.node;
              }
              historyItem.active = true;
              let lbs = historyItem.getComponentsInChildren(cc.Label);
              lbs[0].node.color = cc.Color.BLACK.fromHEX("#00DAEC");
              lbs[0].string = history["nickName"].length > 15 ? history["nickName"].substr(0, 12) + "..." : history["nickName"];
              let gameMode = LoDeSieuToc_Controller_1.default.getInstance().gameModes.find(mode => mode.name === history["gameType"]);
              lbs[1].string = (gameMode ? gameMode.displayName : history["gameType"]) + ":";
              lbs[2].string = history["betNumbers"].length > 20 ? history["betNumbers"].substr(0, 17) + "..." : history["betNumbers"];
              lbs[3].string = LoDeSieuToc_Controller_1.default.getInstance().sieuTocGameTypes.find(gameType => gameType.name === history["quickGameType"]).getDisplayName();
              lbs[4].string = Utils_1.default.formatMoneyChip(history["betMoney"]);
              let city = LoDeSieuToc_Controller_1.default.getInstance().allCities.find(city => city.id == history["cityId"]);
              lbs[5].string = "(" + (city ? city.name : history["cityId"]) + ")";
              let iconVips = historyItem.getComponentsInChildren(cc.Sprite);
              if (res && res.vipInfo) {
                let vip = res.vipInfo[nickNames[i]].id;
                lbs[0].node.color = cc.Color.BLACK.fromHEX(Utils_1.default.getColorVip("VIP_" + vip));
                iconVips[0].node.active = true;
                iconVips[0].spriteFrame = this.atlasVip.getSpriteFrame("Vip" + vip);
                iconVips[1].node.active = true;
                iconVips[1].spriteFrame = this.atlasVip.getSpriteFrame("VIP_" + vip);
              } else {
                iconVips[0].node.active = false;
                iconVips[1].node.active = false;
              }
            }
          });
        });
      }
    };
    __decorate([ property(cc.Node) ], LoDeSieuTocGlobalBet.prototype, "globalBetItem", void 0);
    __decorate([ property(cc.SpriteAtlas) ], LoDeSieuTocGlobalBet.prototype, "atlasVip", void 0);
    LoDeSieuTocGlobalBet = __decorate([ ccclass ], LoDeSieuTocGlobalBet);
    exports.default = LoDeSieuTocGlobalBet;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/common/Http": void 0,
    "../../Main/Game/src/common/Utils": void 0,
    "./LoDeSieuToc.Controller": "LoDeSieuToc.Controller"
  } ],
  "LoDeSieuToc.Play": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7d650z4jZVBhLlG2AM0nFs2", "LoDeSieuToc.Play");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var LoDeSieuTocPlay_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const App_1 = require("../../Main/Game/src/common/App");
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    const Http_1 = require("../../Main/Game/src/common/Http");
    const CustomUI_Dropdown_1 = require("../../Main/Game/src/customui/CustomUI.Dropdown");
    const LoDeSieuToc_Controller_1 = require("./LoDeSieuToc.Controller");
    const LoDeSieuToc_PopupSelectNumber_1 = require("./LoDeSieuToc.PopupSelectNumber");
    const LoDe_LoDeData_1 = require("./LoDe.LoDeData");
    const LoDeSieuToc_PopupGuide_1 = require("./LoDeSieuToc.PopupGuide");
    const LoDeSieuToc_History_1 = require("./LoDeSieuToc.History");
    const MiniGameNetworkClient_1 = require("../../Main/Game/src/networks/MiniGameNetworkClient");
    const LoDe_Cmd_1 = require("./LoDe.Cmd");
    const Network_InPacket_1 = require("../../Main/Game/src/networks/Network.InPacket");
    const Constants_1 = require("../../Main/Game/src/common/Constants");
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let LoDeSieuTocPlay = LoDeSieuTocPlay_1 = class LoDeSieuTocPlay extends cc.Component {
      constructor() {
        super(...arguments);
        this.dropDownCities = null;
        this.dropdownSieuTocGameTypes = null;
        this.lbBetMatchId = null;
        this.lbCountDownTimeRelease = null;
        this.dropDownGroupMode = null;
        this.dropDownMode = null;
        this.latestResultContent = null;
        this.latestResultItem = null;
        this.lbGuides = [];
        this.btnGuide = null;
        this.lbWinBet = null;
        this.edbBetPerNumber = null;
        this.edbTotalBet = null;
        this.edbNumber = null;
        this.numberHolder = null;
        this.numberContent = null;
        this.lbNumber = null;
        this.numberCursor = null;
        this.popupSelectNumber = null;
        this.popupGuide = null;
        this.chatItem = null;
        this.chatContent = null;
        this.edbChat = null;
        this.atlasVip = null;
        this.cities = null;
        this.result = null;
        this.modes = null;
        this.bet = null;
        this.chat = null;
        this.countDownTimeRelease = null;
        this.scheduleSieuTocNextMatch = null;
        this.dateOfBet = null;
        this.matchId = null;
        this.countDown = null;
        this.showResultDuration = .6;
        this.currentSelectedNumbers = [];
        this.isShowGlobalResult = false;
        this.originalPosYResult = [ 140, 217 ];
      }
      static getInstance() {
        return this.instance;
      }
      static destroyInstance() {
        return this.instance;
      }
      onLoad() {
        LoDeSieuTocPlay_1.instance = this;
      }
      start() {
        this.updateSize();
        this.chatItem.active = false;
        MiniGameNetworkClient_1.default.getInstance().addListener(data => {
          if (!this.node.active) return;
          let inpacket = new Network_InPacket_1.default(data);
          switch (inpacket.getCmdId()) {
           case LoDe_Cmd_1.default.Code.LOG_CHAT:
            {
              let res = new LoDe_Cmd_1.default.ReceiveLogChat(data);
              cc.log(res);
              if (res.chatChannel !== Constants_1.ChatChannel.LO_DE_SIEU_TOC) break;
              res.messages.forEach(message => this.addChat(message));
              break;
            }

           case LoDe_Cmd_1.default.Code.SEND_CHAT:
            {
              let res = new LoDe_Cmd_1.default.ReceiveSendChat(data);
              cc.log(res);
              if (res.chatChannel !== Constants_1.ChatChannel.LO_DE_SIEU_TOC) break;
              switch (res.error) {
               case 0:
                let message = new LoDe_Cmd_1.default.ChatItem();
                message.nickname = res.nickname;
                message.message = res.message;
                message.vipId = res.vip;
                this.addChat(message);
                break;

               default:
                App_1.default.instance.actiontDialog.showMsgWithActions(res.desc, res.suggestionActions);
              }
              break;
            }
          }
        }, this);
      }
      onDestroy() {
        this.unschedule(this.countDownTimeRelease);
        MiniGameNetworkClient_1.default.getInstance().send(new LoDe_Cmd_1.default.SendUnScribeSieuTocChat());
      }
      updateSize() {
        let safeArea = LoDeSieuToc_Controller_1.default.getInstance().safeArea.node;
        this.node.setContentSize(safeArea.width, safeArea.height - 120);
      }
      setCities() {
        this.dropDownCities.setOptions(LoDeSieuToc_Controller_1.default.getInstance().cities.map(city => city.name));
        this.dropDownCities.setOnValueChange(idx => {
          this.changeCity(LoDeSieuToc_Controller_1.default.getInstance().cities[idx]);
        });
        this.dropDownCities.setValue(0);
        this.dropDownCities.clickValue(0);
      }
      changeCity(city) {
        let modes = LoDeSieuToc_Controller_1.default.getInstance().gameModes.filter(mode => mode.lotteryRegion === city.region);
        this.groupModes = [];
        modes.forEach(mode => {
          let addedGroupMode = this.groupModes.find(groupMode => mode.name.includes(groupMode.groupMode));
          if (addedGroupMode) addedGroupMode.listMode.push(mode); else {
            let newGroupMode = new LoDe_LoDeData_1.GroupMode();
            let newGroupModeKey = Object.keys(LoDe_LoDeData_1.GroupModeENUM).find(key => mode.name.includes(LoDe_LoDeData_1.GroupModeENUM[key]));
            if (newGroupModeKey) {
              newGroupMode.groupMode = LoDe_LoDeData_1.GroupModeENUM[newGroupModeKey];
              newGroupMode.listMode = [];
              newGroupMode.listMode.push(mode);
              this.groupModes.push(newGroupMode);
            }
          }
        });
        this.dropDownGroupMode.setOptions(this.groupModes.map(group => group.getDisplayName()));
        this.dropDownGroupMode.setOnValueChange(idx => {
          this.changeGroupMode(this.groupModes[idx]);
        });
        this.dropDownGroupMode.setValue(0);
        this.dropDownGroupMode.clickValue(0);
        this.countDown && this.requestLatestResult(this.countDown <= 0);
      }
      actionNextCity() {
        let currentCityIndex = this.dropDownCities.getValue();
        let nextCityIndex = currentCityIndex === LoDeSieuToc_Controller_1.default.getInstance().cities.length - 1 ? 0 : currentCityIndex + 1;
        this.dropDownCities.setValue(nextCityIndex);
        this.dropDownCities.clickValue(nextCityIndex);
      }
      actionPrevioursCity() {
        let currentCityIndex = this.dropDownCities.getValue();
        let previoursCityIndex = 0 === currentCityIndex ? LoDeSieuToc_Controller_1.default.getInstance().cities.length - 1 : currentCityIndex - 1;
        this.dropDownCities.setValue(previoursCityIndex);
        this.dropDownCities.clickValue(previoursCityIndex);
      }
      changeGroupMode(groupMode) {
        this.dropDownMode.setOptions(groupMode.listMode.map(mode => mode.getSieuTocDisplayName()));
        this.dropDownMode.setOnValueChange(idx => {
          this.changeMode(groupMode.listMode[idx]);
        });
        this.dropDownMode.setValue(0);
        this.dropDownMode.clickValue(0);
      }
      changeMode(mode) {
        this.currentMode = mode;
        this.lbGuides[0].string = "" + mode.bet;
        this.lbGuides[1].string = "1";
        this.lbGuides[2].string = "" + mode.ratio;
        this.edbNumber.string = "";
        this.lbNumber.string = "";
        this.numberHolder.active = true;
        this.numberContent.active = false;
        this.edbBetPerNumber.string = "1";
        this.edbTotalBet.string = "" + mode.bet;
        this.lbWinBet.string = mode.ratio + "K";
        this.currentSelectedNumbers = [];
      }
      setSieuTocGameTypes() {
        this.dropdownSieuTocGameTypes.setOptions(LoDeSieuToc_Controller_1.default.getInstance().sieuTocGameTypes.map(gameType => gameType.getShortDisplayName()));
        this.dropdownSieuTocGameTypes.setOnValueChange(idx => {
          this.requestSieuTocMatchInfo(LoDeSieuToc_Controller_1.default.getInstance().sieuTocGameTypes[idx]);
        });
        this.dropdownSieuTocGameTypes.setValue(0);
        this.dropdownSieuTocGameTypes.clickValue(0);
      }
      requestSieuTocMatchInfo(sieuTocGameType) {
        Http_1.default.get(Configs_1.default.App.API_LODE_SIEU_TOC + "matchInfo", {
          gameType: sieuTocGameType.name
        }, (err, res) => {
          if (!this.node) return;
          if (null != err) return;
          cc.log(res);
          this.dateOfBet = new Date(res.startMatchTime);
          this.matchId = res.startMatchTimeString;
          this.lbBetMatchId.string = res.startMatchTimeString;
          this.unschedule(this.countDownTimeRelease);
          this.unschedule(this.scheduleSieuTocNextMatch);
          this.requestLatestResult(res.countDown <= 0);
          this.countDown = JSON.parse(JSON.stringify(res.countDown));
          this.countDownTimeRelease = () => {
            if (this.countDown < 0) {
              this.unschedule(this.countDownTimeRelease);
              this.lbCountDownTimeRelease.string = [ "00", "00" ].join(":");
              App_1.default.instance.toast.showToast("H\u1ebft th\u1eddi gian \u0111\u1eb7t c\u01b0\u1ee3c");
              this.scheduleSieuTocNextMatch = () => {
                this.requestSieuTocMatchInfo(sieuTocGameType);
                LoDeSieuToc_Controller_1.default.getInstance().popupNotiResult.dismiss();
                App_1.default.instance.toast.showToast("B\u1eaft \u0111\u1ea7u \u0111\u1eb7t c\u01b0\u1ee3c");
              };
              this.scheduleOnce(this.scheduleSieuTocNextMatch, sieuTocGameType.intervalSeconds - sieuTocGameType.endBetSeconds + this.countDown);
              res.countDown > 0 && this.requestLatestResult(true, true);
            } else {
              let minutes = Math.floor(this.countDown / 60);
              let seconds = Math.floor(this.countDown % 60);
              this.lbCountDownTimeRelease.string = [ minutes < 10 ? "0" + minutes : minutes, seconds < 10 ? "0" + seconds : seconds ].join(":");
              this.lbCountDownTimeRelease.node.color = this.countDown > 10 ? cc.Color.GREEN : cc.Color.RED;
              0 === seconds && this.scheduleOnce(() => {
                LoDeSieuToc_History_1.default.getInstance().reloadCurrentPage();
              }, 10 * this.showResultDuration);
            }
            this.countDown--;
          };
          this.schedule(this.countDownTimeRelease, 1);
        });
      }
      actionSubmitBet() {
        if (0 === this.currentSelectedNumbers.length) {
          App_1.default.instance.alertDialog.showMsg("B\u1ea1n ch\u01b0a ch\u1ecdn s\u1ed1 \u0111\u1ec1!");
          return;
        }
        App_1.default.instance.showLoading(true);
        let params = {
          gameType: this.currentMode.name,
          numbersInString: this.currentSelectedNumbers,
          betSize: 1e3 * Number(this.edbBetPerNumber.string),
          totalMoneyBet: 1e3 * Number(this.edbTotalBet.string),
          cityId: this.getCurrentCity().id,
          accessToken: Configs_1.default.Login.AccessToken,
          quickLotteryType: this.getCurrentSieuTocGameType().name
        };
        cc.log(params);
        Http_1.default.post(Configs_1.default.App.API_LODE_SIEU_TOC + "bet", params, (err, res) => {
          App_1.default.instance.showLoading(false);
          if (!this.node) return;
          if (null != err) {
            App_1.default.instance.alertDialog.showMsg("\u0110\u1eb7t c\u01b0\u1ee3c l\u1ed7i.");
            return;
          }
          cc.log(res);
          if (!res.success) {
            App_1.default.instance.alertDialog.showMsg(res.desc);
            return;
          }
          App_1.default.instance.alertDialog.showMsg("\u0110\u1eb7t c\u01b0\u1ee3c th\xe0nh c\xf4ng.");
          this.resetNumber();
          LoDeSieuToc_History_1.default.getInstance().show();
          cc.sys.localStorage.setItem("lodesieutoc_lastest_bet", JSON.stringify(params));
        });
      }
      actionClearBet() {
        this.resetNumber();
      }
      actionReBet() {
        let lastestBet = cc.sys.localStorage.getItem("lodesieutoc_lastest_bet");
        if (!lastestBet) return;
        this.setReBet(JSON.parse(lastestBet));
      }
      setReBet(bet) {
        let cityIndex = LoDeSieuToc_Controller_1.default.getInstance().cities.findIndex(city => city.id === bet["cityId"]);
        this.dropDownCities.setValue(cityIndex);
        this.dropDownCities.clickValue(cityIndex);
        let groupModeIndex = this.groupModes.findIndex(groupMode => groupMode.listMode.find(mode => mode.name === bet["gameType"]));
        this.scheduleOnce(() => {
          this.dropDownGroupMode.setValue(groupModeIndex);
          this.dropDownGroupMode.clickValue(groupModeIndex);
        }, .2);
        let gameModeIndex = this.groupModes[groupModeIndex].listMode.findIndex(mode => mode.name === bet["gameType"]);
        this.scheduleOnce(() => {
          this.dropDownMode.setValue(gameModeIndex);
          this.dropDownMode.clickValue(gameModeIndex);
        }, .4);
        this.scheduleOnce(() => {
          this.edbBetPerNumber.string = bet["betSize"] / 1e3 + "";
          this.updateCurrentSelectedNumbers(bet["numbersInString"]);
        }, .6);
        let sieuTocGameTypeIndex = LoDeSieuToc_Controller_1.default.getInstance().sieuTocGameTypes.findIndex(gameType => gameType.name === bet["quickLotteryType"]);
        this.dropdownSieuTocGameTypes.setValue(sieuTocGameTypeIndex);
        this.dropdownSieuTocGameTypes.clickValue(sieuTocGameTypeIndex);
        LoDeSieuToc_Controller_1.default.getInstance().scrollGame.scrollToTop(.2);
      }
      onBetPerNumberChanged(betStr) {
        if (betStr.length > 0) {
          if (false == /^[0-9]*$/.test(betStr)) {
            App_1.default.instance.alertDialog.showMsg("Ti\u1ec1n c\u01b0\u1ee3c ph\u1ea3i l\xe0 s\u1ed1 d\u01b0\u01a1ng");
            this.edbBetPerNumber.string = "1";
            betStr = "1";
          }
          let raw = parseInt(betStr);
          if (0 == raw) {
            this.edbBetPerNumber.string = "1";
            betStr = "1";
          }
          this.edbBetPerNumber.string = "" + parseInt(betStr);
        } else {
          this.edbBetPerNumber.string = "1";
          betStr = "1";
        }
        let delta = parseInt(betStr);
        let countNum = 0 === this.currentMode.numberRequired && this.currentSelectedNumbers.length > 0 ? this.currentSelectedNumbers.length : 1;
        this.edbTotalBet.string = "" + this.currentMode.bet * delta * countNum;
        this.lbWinBet.string = this.currentMode.ratio * delta + "K";
      }
      onTotalBetChanged(betStr) {
        if (betStr.length > 0) {
          if (false == /^[0-9]*$/.test(betStr)) {
            App_1.default.instance.alertDialog.showMsg("Ti\u1ec1n c\u01b0\u1ee3c ph\u1ea3i l\xe0 s\u1ed1 d\u01b0\u01a1ng");
            this.edbTotalBet.string = "" + this.currentMode.bet;
            betStr = "" + this.currentMode.bet;
          }
          let raw = parseInt(betStr);
          if (0 == raw) {
            this.edbTotalBet.string = "" + this.currentMode.bet;
            betStr = "" + this.currentMode.bet;
          }
          this.edbTotalBet.string = "" + parseInt(betStr);
        } else {
          this.edbTotalBet.string = "1";
          betStr = "1";
        }
        let totalBet = parseInt(betStr);
        if (totalBet < this.currentMode.bet) {
          totalBet = this.currentMode.bet;
          this.edbTotalBet.string = totalBet + "";
        }
        let countNum = 0 === this.currentMode.numberRequired && this.currentSelectedNumbers.length > 0 ? this.currentSelectedNumbers.length : 1;
        this.edbBetPerNumber.string = "" + Math.round(totalBet / this.currentMode.bet / countNum * 100) / 100;
        this.lbWinBet.string = Math.round(this.currentMode.ratio * (totalBet / this.currentMode.bet / countNum) * 100) / 100 + "K";
      }
      onNumberBegan() {
        this.numberHolder.active = false;
        if (cc.sys.isNative) {
          this.numberContent.active = true;
          cc.tween(this.numberCursor).repeatForever(cc.blink(1, 1)).start();
          this.lbNumber.string.length > 0 && (this.lbNumber.string = this.lbNumber.string + "-");
        } else this.numberContent.active = false;
      }
      onNumberChanged() {
        if (cc.sys.isNative) {
          let numberArr = this.edbNumber.string.replace(/[^0-9]/g, "").match(new RegExp(".{1," + this.currentMode.numberDigits + "}", "g"));
          if (numberArr) {
            this.lbNumber.string = numberArr.join("-");
            numberArr[numberArr.length - 1].length === this.currentMode.numberDigits && (this.lbNumber.string = this.lbNumber.string + "-");
          } else this.lbNumber.string = "";
        }
      }
      onNumberEnded() {
        cc.Tween.stopAllByTarget(this.numberCursor);
        this.numberCursor.active = false;
        let numberArr = this.edbNumber.string.replace(/[^0-9]/g, "").match(new RegExp(".{1," + this.currentMode.numberDigits + "}", "g"));
        if (numberArr) {
          numberArr[numberArr.length - 1].length < this.currentMode.numberDigits && numberArr.pop();
          numberArr.length > this.currentMode.quantityNumber && App_1.default.instance.toast.showToast("B\u1ea1n ch\u1ec9 \u0111\u01b0\u1ee3c ch\u1ecdn t\u1ed1i \u0111a " + this.currentMode.quantityNumber + " s\u1ed1");
          numberArr.splice(this.currentMode.quantityNumber);
          if (numberArr.length > 0) {
            this.currentSelectedNumbers = [ ...new Set(numberArr) ];
            this.lbNumber.string = this.currentSelectedNumbers.join("-");
            this.edbNumber.string = this.currentSelectedNumbers.join("");
            this.numberContent.active = true;
            let countNum = 0 === this.currentMode.numberRequired && this.currentSelectedNumbers.length > 0 ? this.currentSelectedNumbers.length : 1;
            let currentBetPerNumber = Number(this.edbBetPerNumber.string);
            this.edbTotalBet.string = "" + Math.round(this.currentMode.bet * currentBetPerNumber * countNum * 100) / 100;
            this.lbWinBet.string = Math.round(this.currentMode.ratio * currentBetPerNumber * 100) / 100 + "K";
          } else this.resetNumber();
        } else this.resetNumber();
      }
      resetNumber() {
        this.currentSelectedNumbers = [];
        this.numberHolder.active = true;
        this.numberContent.active = false;
        this.lbNumber.string = "";
        this.edbNumber.string = "";
        this.onBetPerNumberChanged("");
      }
      actionGuide() {
        this.popupGuide.showGuide(this.currentMode);
      }
      actionSelectNumber() {
        this.popupSelectNumber.showSelectNumber(this.currentSelectedNumbers, this.currentMode);
      }
      updateCurrentSelectedNumbers(selectedNumbers) {
        this.currentSelectedNumbers = [ ...selectedNumbers ];
        if (0 == this.currentSelectedNumbers.length) {
          this.resetNumber();
          return;
        }
        this.lbNumber.string = this.currentSelectedNumbers.join("-");
        this.edbNumber.string = this.currentSelectedNumbers.join("");
        this.numberContent.active = true;
        this.numberCursor.active = false;
        this.numberHolder.active = false;
        let countNum = 0 === this.currentMode.numberRequired && this.currentSelectedNumbers.length > 0 ? this.currentSelectedNumbers.length : 1;
        let currentBetPerNumber = Number(this.edbBetPerNumber.string);
        this.edbTotalBet.string = "" + Math.round(this.currentMode.bet * currentBetPerNumber * countNum * 100) / 100;
        this.lbWinBet.string = Math.round(this.currentMode.ratio * currentBetPerNumber * 100) / 100 + "K";
      }
      getCurrentCity() {
        return LoDeSieuToc_Controller_1.default.getInstance().cities[this.dropDownCities.getValue()];
      }
      getCurrentSieuTocGameType() {
        return LoDeSieuToc_Controller_1.default.getInstance().sieuTocGameTypes[this.dropdownSieuTocGameTypes.getValue()];
      }
      requestLatestResult(isCurrentMatch, isDelay = false) {
        let matchId = this.matchId;
        if (!isCurrentMatch) {
          let date = new Date();
          date.setMonth(parseInt(matchId.slice(1, 3)) - 1);
          date.setDate(parseInt(matchId.slice(3, 5)));
          date.setHours(parseInt(matchId.slice(5, 7)), parseInt(matchId.slice(7, 9)));
          date.setMinutes(date.getMinutes() - this.getCurrentSieuTocGameType().intervalSeconds / 60);
          var month = "" + (date.getMonth() + 1);
          var day = "" + date.getDate();
          var hour = "" + date.getHours();
          var minutes = "" + date.getMinutes();
          month.length < 2 && (month = "0" + month);
          day.length < 2 && (day = "0" + day);
          hour.length < 2 && (hour = "0" + hour);
          minutes.length < 2 && (minutes = "0" + minutes);
          matchId = [ this.getCurrentSieuTocGameType().intervalSeconds / 60, month, day, hour, minutes ].join("");
        }
        Http_1.default.get(Configs_1.default.App.API_LODE_SIEU_TOC + "info", {
          cityId: this.getCurrentCity().id,
          id: matchId
        }, (err, res) => {
          if (!this.node) return;
          if (null != err) return;
          cc.log(res);
          this.latestResultContent.children.forEach(child => {
            child.getChildByName("Values").children.forEach(v => v.removeAllChildren());
          });
          let valuesContentDb = this.latestResultContent.children[0].getChildByName("Values");
          if (res.hasOwnProperty("db") && Array.isArray(res["db"])) {
            valuesContentDb.active = true;
            res["db"].forEach((num, i) => {
              let numItem = cc.instantiate(this.latestResultItem);
              let lbNum = numItem.getComponentInChildren(cc.Label);
              lbNum.string = "...";
              lbNum.fontSize = 30;
              lbNum.node.color = cc.Color.BLACK.fromHEX("#fdeaad");
              numItem.getComponentInChildren(cc.LabelOutline).color = cc.Color.BLACK.fromHEX("#ff8ff0");
              numItem.y = 0;
              numItem.active = true;
              if (res["db"].length > 4) {
                valuesContentDb.children[1].active = true;
                numItem.setParent(valuesContentDb.children[i < res["db"].length / 2 ? 0 : 1]);
              } else {
                valuesContentDb.children[1].active = false;
                numItem.setParent(valuesContentDb.children[0]);
              }
              valuesContentDb.getComponent(cc.Widget).updateAlignment();
              this.scheduleOnce(() => {
                lbNum.string = num;
              }, isDelay ? (Array.isArray(res["tam"]) ? 9 : 8) * this.showResultDuration : 0);
            });
          } else valuesContentDb.active = false;
          let valuesContentNhat = this.latestResultContent.children[1].getChildByName("Values");
          if (res.hasOwnProperty("nhat") && Array.isArray(res["nhat"])) {
            valuesContentNhat.active = true;
            res["nhat"].forEach((num, i) => {
              let numItem = cc.instantiate(this.latestResultItem);
              let lbNum = numItem.getComponentInChildren(cc.Label);
              lbNum.string = "...";
              numItem.y = 0;
              numItem.active = true;
              if (res["nhat"].length > 4) {
                valuesContentNhat.children[1].active = true;
                numItem.setParent(valuesContentNhat.children[i < res["nhat"].length / 2 ? 0 : 1]);
              } else {
                valuesContentNhat.children[1].active = false;
                numItem.setParent(valuesContentNhat.children[0]);
              }
              valuesContentNhat.getComponent(cc.Widget).updateAlignment();
              this.scheduleOnce(() => {
                lbNum.string = num;
              }, isDelay ? 1 * this.showResultDuration : 0);
            });
          } else valuesContentNhat.active = false;
          let valuesContentNhi = this.latestResultContent.children[2].getChildByName("Values");
          if (res.hasOwnProperty("nhi") && Array.isArray(res["nhi"])) {
            valuesContentNhi.active = true;
            res["nhi"].forEach((num, i) => {
              let numItem = cc.instantiate(this.latestResultItem);
              let lbNum = numItem.getComponentInChildren(cc.Label);
              lbNum.string = "...";
              numItem.y = 0;
              numItem.active = true;
              if (res["nhi"].length > 4) {
                valuesContentNhi.children[1].active = true;
                numItem.setParent(valuesContentNhi.children[i < res["nhi"].length / 2 ? 0 : 1]);
              } else {
                valuesContentNhi.children[1].active = false;
                numItem.setParent(valuesContentNhi.children[0]);
              }
              valuesContentNhi.getComponent(cc.Widget).updateAlignment();
              this.scheduleOnce(() => {
                lbNum.string = num;
              }, isDelay ? 2 * this.showResultDuration : 0);
            });
          } else valuesContentNhi.active = false;
          let valuesContentBa = this.latestResultContent.children[3].getChildByName("Values");
          if (res.hasOwnProperty("ba") && Array.isArray(res["ba"])) {
            valuesContentBa.active = true;
            res["ba"].forEach((num, i) => {
              let numItem = cc.instantiate(this.latestResultItem);
              let lbNum = numItem.getComponentInChildren(cc.Label);
              lbNum.string = "...";
              numItem.y = 0;
              numItem.active = true;
              if (res["ba"].length > 4) {
                valuesContentBa.children[1].active = true;
                numItem.setParent(valuesContentBa.children[i < res["ba"].length / 2 ? 0 : 1]);
              } else {
                valuesContentBa.children[1].active = false;
                numItem.setParent(valuesContentBa.children[0]);
              }
              valuesContentBa.getComponent(cc.Widget).updateAlignment();
              this.scheduleOnce(() => {
                lbNum.string = num;
              }, isDelay ? 3 * this.showResultDuration : 0);
            });
          } else valuesContentBa.active = false;
          let valuesContentBon = this.latestResultContent.children[4].getChildByName("Values");
          if (res.hasOwnProperty("bon") && Array.isArray(res["bon"])) {
            valuesContentBon.active = true;
            res["bon"].forEach((num, i) => {
              let numItem = cc.instantiate(this.latestResultItem);
              let lbNum = numItem.getComponentInChildren(cc.Label);
              lbNum.string = "...";
              numItem.y = 0;
              numItem.active = true;
              if (res["bon"].length > 4) {
                valuesContentBon.children[1].active = true;
                numItem.setParent(valuesContentBon.children[i < res["bon"].length / 2 ? 0 : 1]);
              } else {
                valuesContentBon.children[1].active = false;
                numItem.setParent(valuesContentBon.children[0]);
              }
              valuesContentBon.getComponent(cc.Widget).updateAlignment();
              this.scheduleOnce(() => {
                lbNum.string = num;
              }, isDelay ? 4 * this.showResultDuration : 0);
            });
          } else valuesContentBon.active = false;
          let valuesContentNam = this.latestResultContent.children[5].getChildByName("Values");
          if (res.hasOwnProperty("nam") && Array.isArray(res["nam"])) {
            valuesContentNam.active = true;
            res["nam"].forEach((num, i) => {
              let numItem = cc.instantiate(this.latestResultItem);
              let lbNum = numItem.getComponentInChildren(cc.Label);
              lbNum.string = "...";
              numItem.y = 0;
              numItem.active = true;
              if (res["nam"].length > 4) {
                valuesContentNam.children[1].active = true;
                numItem.setParent(valuesContentNam.children[i < res["nam"].length / 2 ? 0 : 1]);
              } else {
                valuesContentNam.children[1].active = false;
                numItem.setParent(valuesContentNam.children[0]);
              }
              valuesContentNam.getComponent(cc.Widget).updateAlignment();
              this.scheduleOnce(() => {
                lbNum.string = num;
              }, isDelay ? 5 * this.showResultDuration : 0);
            });
          } else valuesContentNam.active = false;
          let valuesContentSau = this.latestResultContent.children[6].getChildByName("Values");
          if (res.hasOwnProperty("sau") && Array.isArray(res["sau"])) {
            valuesContentSau.active = true;
            res["sau"].forEach((num, i) => {
              let numItem = cc.instantiate(this.latestResultItem);
              let lbNum = numItem.getComponentInChildren(cc.Label);
              lbNum.string = "...";
              numItem.y = 0;
              numItem.active = true;
              if (res["sau"].length > 4) {
                valuesContentSau.children[1].active = true;
                numItem.setParent(valuesContentSau.children[i < res["sau"].length / 2 ? 0 : 1]);
              } else {
                valuesContentSau.children[1].active = false;
                numItem.setParent(valuesContentSau.children[0]);
              }
              valuesContentSau.getComponent(cc.Widget).updateAlignment();
              this.scheduleOnce(() => {
                lbNum.string = num;
              }, isDelay ? 6 * this.showResultDuration : 0);
            });
          } else valuesContentSau.active = false;
          let valuesContentBay = this.latestResultContent.children[7].getChildByName("Values");
          if (res.hasOwnProperty("bay") && Array.isArray(res["bay"])) {
            valuesContentBay.active = true;
            res["bay"].forEach((num, i) => {
              let numItem = cc.instantiate(this.latestResultItem);
              let lbNum = numItem.getComponentInChildren(cc.Label);
              lbNum.string = "...";
              lbNum.node.color = cc.Color.BLACK.fromHEX(res.hasOwnProperty("tam") && Array.isArray(res["tam"]) && !res["tam"].every(s => !s) ? "#ffffff" : "#eb43ff");
              numItem.y = 0;
              numItem.active = true;
              if (res["bay"].length > 4) {
                valuesContentBay.children[1].active = true;
                numItem.setParent(valuesContentBay.children[i < res["bay"].length / 2 ? 0 : 1]);
              } else {
                valuesContentBay.children[1].active = false;
                numItem.setParent(valuesContentBay.children[0]);
              }
              valuesContentBay.getComponent(cc.Widget).updateAlignment();
              this.scheduleOnce(() => {
                lbNum.string = num;
              }, isDelay ? 7 * this.showResultDuration : 0);
            });
          } else valuesContentBay.active = false;
          if (res.hasOwnProperty("tam") && Array.isArray(res["tam"]) && !res["tam"].every(s => !s)) {
            this.latestResultContent.children[8].active = true;
            let valuesContentTam = this.latestResultContent.children[8].getChildByName("Values");
            res["tam"].forEach((num, i) => {
              let numItem = cc.instantiate(this.latestResultItem);
              let lbNum = numItem.getComponentInChildren(cc.Label);
              lbNum.string = "...";
              lbNum.node.color = cc.Color.BLACK.fromHEX("#eb43ff");
              numItem.y = 0;
              numItem.active = true;
              if (res["tam"].length > 4) {
                valuesContentTam.children[1].active = true;
                numItem.setParent(valuesContentTam.children[i < res["tam"].length / 2 ? 0 : 1]);
              } else {
                valuesContentTam.children[1].active = false;
                numItem.setParent(valuesContentTam.children[0]);
              }
              valuesContentTam.getComponent(cc.Widget).updateAlignment();
              this.scheduleOnce(() => {
                lbNum.string = num;
              }, isDelay ? 8 * this.showResultDuration : 0);
            });
          } else this.latestResultContent.children[8].active = false;
        });
      }
      getLongSession(date) {
        var month = "" + (date.getMonth() + 1);
        var day = "" + date.getDate();
        var year = date.getFullYear();
        var hour = "" + date.getHours();
        var minutes = "" + date.getMinutes();
        var seconds = "" + date.getSeconds();
        month.length < 2 && (month = "0" + month);
        day.length < 2 && (day = "0" + day);
        hour.length < 2 && (hour = "0" + hour);
        minutes.length < 2 && (minutes = "0" + minutes);
        seconds.length < 2 && (seconds = "0" + seconds);
        return [ year, month, day ].join("-") + "T" + [ hour, minutes, seconds ].join(":");
      }
      actionShowChat() {
        MiniGameNetworkClient_1.default.getInstance().send(new LoDe_Cmd_1.default.SendScribeSieuTocChat());
        cc.Tween.stopAllByTarget(this.cities);
        cc.Tween.stopAllByTarget(this.modes);
        cc.Tween.stopAllByTarget(this.result);
        cc.Tween.stopAllByTarget(this.bet);
        cc.Tween.stopAllByTarget(this.chat);
        this.chatContent.children.forEach(child => child.active = false);
        this.chat.active = true;
        this.chat.opacity = 0;
        this.chat.y = (-this.node.height - this.chat.height) / 2;
        cc.tween(this.chat).to(.5, {
          position: cc.v3(0, (-this.node.height + this.chat.height) / 2),
          opacity: 255
        }, {
          easing: "quartInOut"
        }).start();
        cc.tween(this.bet).to(.5, {
          opacity: 0
        }).start();
        this.isShowGlobalResult || cc.tween(this.result).to(.5, {
          position: cc.v3(0, 217)
        }, {
          easing: "quartInOut"
        }).call(() => {
          let widget = this.result.getComponent(cc.Widget);
          widget.top = 183;
          widget.bottom = 617;
          widget.updateAlignment();
        }).start();
        cc.tween(this.modes).by(.5, {
          position: cc.v3(0, 55)
        }, {
          easing: "quartInOut"
        }).call(() => {
          let widget = this.modes.getComponent(cc.Widget);
          widget.top = 143;
          widget.updateAlignment();
        }).start();
        cc.tween(this.cities).by(.5, {
          position: cc.v3(0, 39)
        }, {
          easing: "quartInOut"
        }).call(() => {
          let widget = this.cities.getComponent(cc.Widget);
          widget.top = .44;
          widget.updateAlignment();
        }).start();
      }
      actionHideChat() {
        MiniGameNetworkClient_1.default.getInstance().send(new LoDe_Cmd_1.default.SendUnScribeSieuTocChat());
        cc.Tween.stopAllByTarget(this.cities);
        cc.Tween.stopAllByTarget(this.modes);
        cc.Tween.stopAllByTarget(this.result);
        cc.Tween.stopAllByTarget(this.bet);
        cc.Tween.stopAllByTarget(this.chat);
        cc.tween(this.chat).to(.5, {
          position: cc.v3(0, (-this.node.height - this.chat.height) / 2),
          opacity: 0
        }, {
          easing: "quartInOut"
        }).call(() => {
          this.chat.active = false;
        }).start();
        cc.tween(this.bet).to(.5, {
          opacity: 255
        }).start();
        this.isShowGlobalResult || cc.tween(this.result).to(.5, {
          position: cc.v3(0, 140)
        }, {
          easing: "quartInOut"
        }).call(() => {
          let widget = this.result.getComponent(cc.Widget);
          widget.top = 260;
          widget.bottom = 540;
          widget.updateAlignment();
        }).start();
        cc.tween(this.modes).by(.5, {
          position: cc.v3(0, -55)
        }, {
          easing: "quartInOut"
        }).call(() => {
          let widget = this.modes.getComponent(cc.Widget);
          widget.top = 198;
          widget.updateAlignment();
        }).start();
        cc.tween(this.cities).by(.5, {
          position: cc.v3(0, -39)
        }, {
          easing: "quartInOut"
        }).call(() => {
          let widget = this.cities.getComponent(cc.Widget);
          widget.top = 39.44;
          widget.updateAlignment();
        }).start();
      }
      addChat(message) {
        let item = null;
        for (var i = 0; i < this.chatContent.childrenCount; i++) {
          let node = this.chatContent.children[i];
          if (!node.active) {
            item = node;
            break;
          }
        }
        null == item && (item = this.chatContent.childrenCount >= 10 ? this.chatContent.children[0] : cc.instantiate(this.chatItem));
        var zIndex = 0;
        for (var i = 0; i < this.chatContent.childrenCount; i++) {
          let node = this.chatContent.children[i];
          node != item && (node.zIndex = zIndex++);
        }
        item.parent = this.chatContent;
        item.active = true;
        item.zIndex = zIndex++;
        let chatRichText = item.getComponentInChildren(cc.RichText);
        chatRichText.imageAtlas = this.atlasVip;
        let vipColor = Utils_1.default.getColorVip("VIP_" + message.vipId);
        let content = "<color=" + vipColor + "><outline color=" + vipColor + "width=1>" + message.nickname + "</outline></color> <img src='Vip" + message.vipId + "' offset=0,-7/><img src='VIP_" + message.vipId + "' offset=0,-7/>:  " + message.message;
        chatRichText.string = content;
      }
      actionSendChat() {
        let msg = this.edbChat.string.trim();
        if (0 == msg.length) return;
        this.edbChat.string = "";
        MiniGameNetworkClient_1.default.getInstance().send(new LoDe_Cmd_1.default.SendSieuTocChat(unescape(encodeURIComponent(msg))));
      }
      onScrollGame(scroll) {
        let offsetResultToTop = (this.node.height - this.result.height) / 2 - this.originalPosYResult[this.chat.active ? 1 : 0];
        if (scroll.content.y > scroll.node.height / 2 + offsetResultToTop) {
          if (this.isShowGlobalResult) return;
          this.result.setParent(scroll.node);
          let widget = this.result.getComponent(cc.Widget);
          widget.top = 0;
          widget.bottom = scroll.node.height - this.result.height;
          widget.updateAlignment();
          this.isShowGlobalResult = true;
        } else {
          if (!this.isShowGlobalResult) return;
          this.result.setParent(this.node);
          this.result.zIndex = 0;
          let widget = this.result.getComponent(cc.Widget);
          widget.top = this.chat.active ? 183 : 260;
          widget.bottom = this.chat.active ? 617 : 540;
          widget.updateAlignment();
          this.isShowGlobalResult = false;
        }
      }
    };
    LoDeSieuTocPlay.instance = null;
    __decorate([ property(CustomUI_Dropdown_1.default) ], LoDeSieuTocPlay.prototype, "dropDownCities", void 0);
    __decorate([ property(CustomUI_Dropdown_1.default) ], LoDeSieuTocPlay.prototype, "dropdownSieuTocGameTypes", void 0);
    __decorate([ property(cc.Label) ], LoDeSieuTocPlay.prototype, "lbBetMatchId", void 0);
    __decorate([ property(cc.Label) ], LoDeSieuTocPlay.prototype, "lbCountDownTimeRelease", void 0);
    __decorate([ property(CustomUI_Dropdown_1.default) ], LoDeSieuTocPlay.prototype, "dropDownGroupMode", void 0);
    __decorate([ property(CustomUI_Dropdown_1.default) ], LoDeSieuTocPlay.prototype, "dropDownMode", void 0);
    __decorate([ property(cc.Node) ], LoDeSieuTocPlay.prototype, "latestResultContent", void 0);
    __decorate([ property(cc.Node) ], LoDeSieuTocPlay.prototype, "latestResultItem", void 0);
    __decorate([ property([ cc.Label ]) ], LoDeSieuTocPlay.prototype, "lbGuides", void 0);
    __decorate([ property(cc.Node) ], LoDeSieuTocPlay.prototype, "btnGuide", void 0);
    __decorate([ property(cc.Label) ], LoDeSieuTocPlay.prototype, "lbWinBet", void 0);
    __decorate([ property(cc.EditBox) ], LoDeSieuTocPlay.prototype, "edbBetPerNumber", void 0);
    __decorate([ property(cc.EditBox) ], LoDeSieuTocPlay.prototype, "edbTotalBet", void 0);
    __decorate([ property(cc.EditBox) ], LoDeSieuTocPlay.prototype, "edbNumber", void 0);
    __decorate([ property(cc.Node) ], LoDeSieuTocPlay.prototype, "numberHolder", void 0);
    __decorate([ property(cc.Node) ], LoDeSieuTocPlay.prototype, "numberContent", void 0);
    __decorate([ property(cc.Label) ], LoDeSieuTocPlay.prototype, "lbNumber", void 0);
    __decorate([ property(cc.Node) ], LoDeSieuTocPlay.prototype, "numberCursor", void 0);
    __decorate([ property(LoDeSieuToc_PopupSelectNumber_1.default) ], LoDeSieuTocPlay.prototype, "popupSelectNumber", void 0);
    __decorate([ property(LoDeSieuToc_PopupGuide_1.default) ], LoDeSieuTocPlay.prototype, "popupGuide", void 0);
    __decorate([ property(cc.Node) ], LoDeSieuTocPlay.prototype, "chatItem", void 0);
    __decorate([ property(cc.Node) ], LoDeSieuTocPlay.prototype, "chatContent", void 0);
    __decorate([ property(cc.EditBox) ], LoDeSieuTocPlay.prototype, "edbChat", void 0);
    __decorate([ property(cc.SpriteAtlas) ], LoDeSieuTocPlay.prototype, "atlasVip", void 0);
    __decorate([ property(cc.Node) ], LoDeSieuTocPlay.prototype, "cities", void 0);
    __decorate([ property(cc.Node) ], LoDeSieuTocPlay.prototype, "result", void 0);
    __decorate([ property(cc.Node) ], LoDeSieuTocPlay.prototype, "modes", void 0);
    __decorate([ property(cc.Node) ], LoDeSieuTocPlay.prototype, "bet", void 0);
    __decorate([ property(cc.Node) ], LoDeSieuTocPlay.prototype, "chat", void 0);
    LoDeSieuTocPlay = LoDeSieuTocPlay_1 = __decorate([ ccclass ], LoDeSieuTocPlay);
    exports.default = LoDeSieuTocPlay;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/App": void 0,
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/common/Constants": void 0,
    "../../Main/Game/src/common/Http": void 0,
    "../../Main/Game/src/common/Utils": void 0,
    "../../Main/Game/src/customui/CustomUI.Dropdown": void 0,
    "../../Main/Game/src/networks/MiniGameNetworkClient": void 0,
    "../../Main/Game/src/networks/Network.InPacket": void 0,
    "./LoDe.Cmd": "LoDe.Cmd",
    "./LoDe.LoDeData": "Lode.LodeData",
    "./LoDeSieuToc.Controller": "LoDeSieuToc.Controller",
    "./LoDeSieuToc.History": "LodeSieuToc.History",
    "./LoDeSieuToc.PopupGuide": "LoDeSieuToc.PopupGuide",
    "./LoDeSieuToc.PopupSelectNumber": "LoDeSieuToc.PopupSelectNumber"
  } ],
  "LoDeSieuToc.PopupGuide": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6db58SbZk5CGYKegSWC8Z7P", "LoDeSieuToc.PopupGuide");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const LoDeSieuToc_Dialog_1 = require("./LoDeSieuToc.Dialog");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let LoDeSieuTocPopupGuide = class LoDeSieuTocPopupGuide extends LoDeSieuToc_Dialog_1.default {
      constructor() {
        super(...arguments);
        this.lbGuide = null;
        this.guides = [ {
          name: "Bac_BaoLo2So",
          guide: "\u0110\xe1nh 2 ch\u1eef s\u1ed1 cu\u1ed1i trong l\xf4 27 gi\u1ea3i. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n, n\u1ebfu s\u1ed1 \u0111\xf3 v\u1ec1 N l\u1ea7n th\xec t\xednh k\u1ebft qu\u1ea3 x N l\u1ea7n. V\xed d\u1ee5: \u0111\xe1nh l\xf4 79 - 1 con 1k, T\u1ed5ng thanh to\xe1n: 1k x 27 = 27k. N\u1ebfu trong l\xf4 c\xf3 2 ch\u1eef s\u1ed1 cu\u1ed1i l\xe0 79 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k, n\u1ebfu c\xf3 N l\u1ea7n 2 ch\u1eef s\u1ed1 cu\u1ed1i l\xe0 79 th\xec Ti\u1ec1n th\u1eafng l\xe0: 1k x {{ODDS}} x N"
        }, {
          name: "Bac_BaoLo3So",
          guide: "\u0110\xe1nh 3 ch\u1eef s\u1ed1 cu\u1ed1i trong l\xf4 23 gi\u1ea3i. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n, n\u1ebfu s\u1ed1 \u0111\xf3 v\u1ec1 N l\u1ea7n th\xec t\xednh k\u1ebft qu\u1ea3 x N l\u1ea7n. V\xed d\u1ee5: \u0111\xe1nh l\xf4 789 - 1 con 1k, T\u1ed5ng thanh to\xe1n: 1k x 23 = 23k. N\u1ebfu trong l\xf4 c\xf3 3 ch\u1eef s\u1ed1 cu\u1ed1i l\xe0 789 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k, n\u1ebfu c\xf3 N l\u1ea7n 3 ch\u1eef s\u1ed1 cu\u1ed1i l\xe0 789 th\xec Ti\u1ec1n th\u1eafng l\xe0: 1k x {{ODDS}} x N"
        }, {
          name: "Bac_DeDau",
          guide: "\u0110\xe1nh l\xf4 gi\u1ea3i 7 ( c\xf3 4 gi\u1ea3i, thanh to\xe1n \u0111\u1ee7 ). Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5 : \u0111\xe1nh 1k cho s\u1ed1 79, T\u1ed5ng thanh to\xe1n: 1k x 4 =4k. N\u1ebfu trong l\xf4 gi\u1ea3i 7 c\xf3 1 s\u1ed1 79 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k"
        }, {
          name: "Bac_DeDacBiet",
          guide: "\u0110\xe1nh 2 ch\u1eef s\u1ed1 cu\u1ed1i trong gi\u1ea3i \u0110B. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5: \u0111\xe1nh 1k cho s\u1ed1 79. T\u1ed5ng thanh to\xe1n: 1k. N\u1ebfu gi\u1ea3i \u0110B l\xe0 xxx79 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k"
        }, {
          name: "Bac_BaCang",
          guide: "\u0110\xe1nh 3 ch\u1eef s\u1ed1 cu\u1ed1i c\u1ee7a gi\u1ea3i \u0110B. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5: \u0111\xe1nh 1k cho s\u1ed1 879, T\u1ed5ng thanh to\xe1n: 1k. N\u1ebfu gi\u1ea3i \u0110B l\xe0 xx879 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k"
        }, {
          name: "Bac_DauDuoiDau",
          guide: "\u0110\xe1nh 1 ch\u1eef s\u1ed1 \u1edf h\xe0ng ch\u1ee5c c\u1ee7a gi\u1ea3i \u0110B. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5: \u0111\xe1nh 1k cho s\u1ed1 7. T\u1ed5ng thanh to\xe1n: 1K. N\u1ebfu gi\u1ea3i \u0110B l\xe0 xxx7x th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k"
        }, {
          name: "Bac_DauDuoiDuoi",
          guide: "\u0110\xe1nh 1 ch\u1eef s\u1ed1 cu\u1ed1i c\u1ee7a gi\u1ea3i \u0110B. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5: \u0111\xe1nh 1k cho s\u1ed1 7. T\u1ed5ng thanh to\xe1n: 1K. N\u1ebfu gi\u1ea3i \u0110B l\xe0 xxxx7 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k"
        }, {
          name: "Bac_LoXien2",
          guide: "Xi\xean 2 c\u1ee7a 2 ch\u1eef s\u1ed1 cu\u1ed1i trong l\xf4 27 gi\u1ea3i. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5 : \u0111\xe1nh 1k cho xi\xean 11+13, T\u1ed5ng thanh to\xe1n: 1k. N\u1ebfu trong l\xf4 c\xf3 2 ch\u1eef s\u1ed1 cu\u1ed1i l\xe0 11, 13 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k"
        }, {
          name: "Bac_LoXien3",
          guide: "Xi\xean 3 c\u1ee7a 2 ch\u1eef s\u1ed1 cu\u1ed1i trong l\xf4 27 gi\u1ea3i. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5 : \u0111\xe1nh 1k cho xi\xean 11+13+15, T\u1ed5ng thanh to\xe1n: 1k. N\u1ebfu trong l\xf4 c\xf3 2 ch\u1eef s\u1ed1 cu\u1ed1i l\xe0 11,13,15 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k"
        }, {
          name: "Bac_LoXien4",
          guide: "Xi\xean 4 c\u1ee7a 2 ch\u1eef s\u1ed1 cu\u1ed1i trong l\xf4 27 gi\u1ea3i. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5 : \u0111\xe1nh 1k cho xi\xean 11+13+15+20, T\u1ed5ng thanh to\xe1n: 1k. N\u1ebfu trong l\xf4 c\xf3 2 ch\u1eef s\u1ed1 cu\u1ed1i l\xe0 11,13,15,20 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k"
        }, {
          name: "Bac_LoTruot4",
          guide: "Tr\u01b0\u1ee3t Xi\xean 4 c\u1ee7a 2 ch\u1eef s\u1ed1 cu\u1ed1i trong 27 gi\u1ea3i. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5: \u0111\xe1nh 1k cho tr\u01b0\u1ee3t xi\xean 01+02+03+04, T\u1ed5ng thanh to\xe1n: 1k. N\u1ebfu trong l\xf4 kh\xf4ng c\xf3 2 ch\u1eef s\u1ed1 cu\u1ed1i l\xe0 01,02,03,04 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k"
        }, {
          name: "Bac_LoTruot8",
          guide: "Tr\u01b0\u1ee3t Xi\xean 8 c\u1ee7a 2 ch\u1eef s\u1ed1 cu\u1ed1i trong 27 gi\u1ea3i. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5: \u0111\xe1nh 1k cho tr\u01b0\u1ee3t xi\xean 01+02+03+04+05+06+07+08, T\u1ed5ng thanh to\xe1n: 1k. N\u1ebfu trong l\xf4 kh\xf4ng c\xf3 2 ch\u1eef s\u1ed1 cu\u1ed1i l\xe0 01,02,03,04,05,06,07,08 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k"
        }, {
          name: "Bac_LoTruot10",
          guide: "Tr\u01b0\u1ee3t Xi\xean 10 c\u1ee7a 2 ch\u1eef s\u1ed1 cu\u1ed1i trong 27 gi\u1ea3i. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5: \u0111\xe1nh 1k cho tr\u01b0\u1ee3t xi\xean 01+02+03+04+05+06+07+08+09+10, T\u1ed5ng thanh to\xe1n: 1k. N\u1ebfu trong l\xf4 kh\xf4ng c\xf3 2 ch\u1eef s\u1ed1 cu\u1ed1i l\xe0 01,02,03,04,05,06,07,08,09,10 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k"
        }, {
          name: "Trung_BaoLo2So",
          guide: "\u0110\xe1nh 2 ch\u1eef s\u1ed1 cu\u1ed1i trong l\xf4 18 gi\u1ea3i. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n, n\u1ebfu s\u1ed1 \u0111\xf3 v\u1ec1 N l\u1ea7n th\xec t\xednh k\u1ebft qu\u1ea3 x N l\u1ea7n. V\xed d\u1ee5: \u0111\xe1nh l\xf4 s\u1ed1 39 - 1 con 1k, T\u1ed5ng thanh to\xe1n: 1k x 18 = 18k. N\u1ebfu trong l\xf4 c\xf3 1 l\u1ea7n 2 ch\u1eef s\u1ed1 cu\u1ed1i l\xe0 39 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k, n\u1ebfu c\xf3 N l\u1ea7n 2 ch\u1eef s\u1ed1 cu\u1ed1i l\xe0 39 th\xec Ti\u1ec1n th\u1eafng l\xe0: 1k x {{ODDS}} x N"
        }, {
          name: "Trung_BaoLo3So",
          guide: "\u0110\xe1nh 3 ch\u1eef s\u1ed1 cu\u1ed1i trong l\xf4 17 gi\u1ea3i. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n, n\u1ebfu s\u1ed1 \u0111\xf3 v\u1ec1 N l\u1ea7n th\xec t\xednh k\u1ebft qu\u1ea3 x N l\u1ea7n. V\xed d\u1ee5: \u0111\xe1nh l\xf4 789 - 1 con 1k, T\u1ed5ng thanh to\xe1n: 1k x 17 = 17k. N\u1ebfu trong l\xf4 c\xf3 3 ch\u1eef s\u1ed1 cu\u1ed1i l\xe0 789 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k, n\u1ebfu c\xf3 N l\u1ea7n 3 ch\u1eef s\u1ed1 cu\u1ed1i l\xe0 789 th\xec Ti\u1ec1n th\u1eafng l\xe0: 1k x {{ODDS}} x N"
        }, {
          name: "Trung_DeDau",
          guide: "\u0110\xe1nh gi\u1ea3i 8. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5: \u0111\xe1nh 1k cho s\u1ed1 79. T\u1ed5ng thanh to\xe1n: 1k. N\u1ebfu gi\u1ea3i 8 l\xe0 79 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k"
        }, {
          name: "Trung_DeDacBiet",
          guide: "\u0110\xe1nh 2 ch\u1eef s\u1ed1 cu\u1ed1i trong gi\u1ea3i \u0110B. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5: \u0111\xe1nh 1k cho s\u1ed1 79. T\u1ed5ng thanh to\xe1n: 1k. N\u1ebfu gi\u1ea3i \u0110B l\xe0 xxx79 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k"
        }, {
          name: "Trung_BaCangDau",
          guide: "\u0110\xe1nh gi\u1ea3i 7. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5: \u0111\xe1nh 1k cho s\u1ed1 879, T\u1ed5ng thanh to\xe1n: 1k. N\u1ebfu gi\u1ea3i 7 l\xe0 879 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k"
        }, {
          name: "Trung_BaCangDuoi",
          guide: "\u0110\xe1nh 3 ch\u1eef s\u1ed1 cu\u1ed1i c\u1ee7a gi\u1ea3i \u0110B. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5: \u0111\xe1nh 1k cho s\u1ed1 879, T\u1ed5ng thanh to\xe1n: 1k. N\u1ebfu gi\u1ea3i \u0110B l\xe0 xx879 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k"
        }, {
          name: "Trung_BaCangDauDuoi",
          guide: "\u0110\xe1nh 3 ch\u1eef s\u1ed1 cu\u1ed1i c\u1ee7a gi\u1ea3i \u0110B v\xe0 gi\u1ea3i 7. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5: \u0111\xe1nh 1k cho s\u1ed1 879, T\u1ed5ng thanh to\xe1n: 2k. N\u1ebfu gi\u1ea3i \u0110B ho\u1eb7c gi\u1ea3i 7 c\xf3 3 ch\u1eef s\u1ed1 cu\u1ed1i l\xe0 879 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k"
        }, {
          name: "Trung_DauDuoiDau",
          guide: "\u0110\xe1nh 1 ch\u1eef s\u1ed1 \u1edf h\xe0ng ch\u1ee5c c\u1ee7a gi\u1ea3i \u0110B. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5: \u0111\xe1nh 1k cho s\u1ed1 7. T\u1ed5ng thanh to\xe1n: 1K. N\u1ebfu gi\u1ea3i \u0110B l\xe0 xxx7x th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k"
        }, {
          name: "Trung_DauDuoiDuoi",
          guide: "\u0110\xe1nh 1 ch\u1eef s\u1ed1 cu\u1ed1i c\u1ee7a gi\u1ea3i \u0110B. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5: \u0111\xe1nh 1k cho s\u1ed1 9. T\u1ed5ng thanh to\xe1n: 1k. N\u1ebfu gi\u1ea3i \u0110B l\xe0 xxxx9 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k"
        }, {
          name: "Trung_LoXien2",
          guide: "Xi\xean 2 c\u1ee7a 2 ch\u1eef s\u1ed1 cu\u1ed1i trong l\xf4 18 gi\u1ea3i. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5 : \u0111\xe1nh 1k cho xi\xean 11+13, T\u1ed5ng thanh to\xe1n: 1k. N\u1ebfu trong l\xf4 c\xf3 2 ch\u1eef s\u1ed1 cu\u1ed1i l\xe0 11,13 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k"
        }, {
          name: "Trung_LoXien3",
          guide: "Xi\xean 3 c\u1ee7a 2 ch\u1eef s\u1ed1 cu\u1ed1i trong l\xf4 18 gi\u1ea3i. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5 : \u0111\xe1nh 1k cho xi\xean 11+13+15, T\u1ed5ng thanh to\xe1n: 1k. N\u1ebfu trong l\xf4 c\xf3 2 ch\u1eef s\u1ed1 cu\u1ed1i l\xe0 11,13,15 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k"
        }, {
          name: "Trung_LoXien4",
          guide: "Xi\xean 4 c\u1ee7a 2 ch\u1eef s\u1ed1 cu\u1ed1i trong l\xf4 18 gi\u1ea3i. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5 : \u0111\xe1nh 1k cho xi\xean 11+13+15+20, T\u1ed5ng thanh to\xe1n: 1k. N\u1ebfu trong l\xf4 c\xf3 2 ch\u1eef s\u1ed1 cu\u1ed1i l\xe0 11,13,15,20 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k"
        }, {
          name: "Trung_LoTruot4",
          guide: "Tr\u01b0\u1ee3t Xi\xean 4 c\u1ee7a 2 ch\u1eef s\u1ed1 cu\u1ed1i trong 18 gi\u1ea3i. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5: \u0111\xe1nh 1k cho tr\u01b0\u1ee3t xi\xean 01+02+03+04, T\u1ed5ng thanh to\xe1n: 1k. N\u1ebfu trong l\xf4 kh\xf4ng c\xf3 2 ch\u1eef s\u1ed1 cu\u1ed1i l\xe0 01,02,03,04 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k"
        }, {
          name: "Trung_LoTruot8",
          guide: "Tr\u01b0\u1ee3t Xi\xean 8 c\u1ee7a 2 ch\u1eef s\u1ed1 cu\u1ed1i trong 18 gi\u1ea3i. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5: \u0111\xe1nh 1k cho tr\u01b0\u1ee3t xi\xean 01+02+03+04+05+06+07+08, T\u1ed5ng thanh to\xe1n: 1k. N\u1ebfu trong l\xf4 kh\xf4ng c\xf3 2 ch\u1eef s\u1ed1 cu\u1ed1i l\xe0 01,02,03,04,05,06,07,08 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k"
        }, {
          name: "Trung_LoTruot10",
          guide: "Tr\u01b0\u1ee3t Xi\xean 10 c\u1ee7a 2 ch\u1eef s\u1ed1 cu\u1ed1i trong 18 gi\u1ea3i. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5: \u0111\xe1nh 1k cho tr\u01b0\u1ee3t xi\xean 01+02+03+04+05+06+07+08+09+10, T\u1ed5ng thanh to\xe1n: 1k. N\u1ebfu trong l\xf4 kh\xf4ng c\xf3 2 ch\u1eef s\u1ed1 cu\u1ed1i l\xe0 01,02,03,04,05,06,07,08,09,10 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k"
        }, {
          name: "Nam_BaoLo2So",
          guide: "\u0110\xe1nh 2 ch\u1eef s\u1ed1 cu\u1ed1i trong l\xf4 18 gi\u1ea3i. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n, n\u1ebfu s\u1ed1 \u0111\xf3 v\u1ec1 N l\u1ea7n th\xec t\xednh k\u1ebft qu\u1ea3 x N l\u1ea7n. V\xed d\u1ee5: bao l\xf4 39 - 1 con 1k, T\u1ed5ng thanh to\xe1n: 1k x 18 = 18k. N\u1ebfu trong l\xf4 c\xf3 1 l\u1ea7n 2 ch\u1eef s\u1ed1 cu\u1ed1i l\xe0 39 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k, n\u1ebfu c\xf3 N l\u1ea7n 2 ch\u1eef s\u1ed1 cu\u1ed1i l\xe0 39 th\xec Ti\u1ec1n th\u1eafng l\xe0: 1k x {{ODDS}} x N"
        }, {
          name: "Nam_BaoLo3So",
          guide: "\u0110\xe1nh 3 ch\u1eef s\u1ed1 cu\u1ed1i trong l\xf4 17 gi\u1ea3i. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n, n\u1ebfu s\u1ed1 \u0111\xf3 v\u1ec1 N l\u1ea7n th\xec t\xednh k\u1ebft qu\u1ea3 x N l\u1ea7n. V\xed d\u1ee5: bao l\xf4 789 - 1 con 1k, T\u1ed5ng thanh to\xe1n: 1k x 17 = 17k. N\u1ebfu trong l\xf4 c\xf3 3 ch\u1eef s\u1ed1 cu\u1ed1i l\xe0 789 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k, n\u1ebfu c\xf3 N l\u1ea7n 3 ch\u1eef s\u1ed1 cu\u1ed1i l\xe0 789 th\xec Ti\u1ec1n th\u1eafng l\xe0: 1k x {{ODDS}} x N"
        }, {
          name: "Nam_DeDau",
          guide: "\u0110\xe1nh gi\u1ea3i 8. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5: \u0111\xe1nh 1k cho s\u1ed1 79. T\u1ed5ng thanh to\xe1n: 1k. N\u1ebfu gi\u1ea3i 8 l\xe0 79 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k"
        }, {
          name: "Nam_DeDacBiet",
          guide: "\u0110\xe1nh 2 ch\u1eef s\u1ed1 cu\u1ed1i trong gi\u1ea3i \u0110B. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5: \u0111\xe1nh 1k cho s\u1ed1 79. T\u1ed5ng thanh to\xe1n: 1k. N\u1ebfu gi\u1ea3i \u0110B l\xe0 xxx79 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k"
        }, {
          name: "Nam_DeDauDuoi",
          guide: "\u0110\xe1nh 2 ch\u1eef s\u1ed1 cu\u1ed1i trong gi\u1ea3i \u0110B v\xe0 Gi\u1ea3i 8. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5: \u0111\xe1nh 1k cho s\u1ed1 79. T\u1ed5ng thanh to\xe1n: 2k. N\u1ebfu gi\u1ea3i \u0110B ho\u1eb7c gi\u1ea3i 8 c\xf3 2 ch\u1eef s\u1ed1 cu\u1ed1i l\xe0 79 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k"
        }, {
          name: "Nam_LoDa2",
          guide: '\u0110\xe1 2 c\u1ee7a 2 ch\u1eef s\u1ed1 cu\u1ed1i trong l\xf4 18 gi\u1ea3i. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5 : \u0111\xe1nh 1k cho \u0111\xe1 11+13. T\u1ed5ng thanh to\xe1n: 1k. N\u1ebfu trong l\xf4 c\xf3 "1 s\u1ed1 m\xe0 2 ch\u1eef s\u1ed1 cu\u1ed1i l\xe0 11 v\xe0 1 s\u1ed1 m\xe0 2 ch\u1eef s\u1ed1 cu\u1ed1i l\xe0 13" th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k'
        }, {
          name: "Nam_LoDa3",
          guide: "\u0110\xe1 3 c\u1ee7a 2 ch\u1eef s\u1ed1 cu\u1ed1i trong l\xf4 18 gi\u1ea3i. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5 : \u0111\xe1nh 1k cho \u0111\xe1 11+13+15, T\u1ed5ng thanh to\xe1n: 1k. N\u1ebfu trong l\xf4 c\xf3 2 ch\u1eef s\u1ed1 cu\u1ed1i l\xe0 11,13,15 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k"
        }, {
          name: "Nam_LoDa4",
          guide: "\u0110\xe1 4 c\u1ee7a 2 ch\u1eef s\u1ed1 cu\u1ed1i trong l\xf4 18 gi\u1ea3i. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5 : \u0111\xe1nh 1k cho \u0111\xe1 11+13+15+20, T\u1ed5ng thanh to\xe1n: 1k. N\u1ebfu trong l\xf4 c\xf3 2 ch\u1eef s\u1ed1 cu\u1ed1i l\xe0 11,13,15,20 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k"
        }, {
          name: "Nam_DauDuoiDau",
          guide: "\u0110\xe1nh 1 ch\u1eef s\u1ed1 h\xe0ng ch\u1ee5c c\u1ee7a gi\u1ea3i \u0110B. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5: \u0111\xe1nh 1k cho s\u1ed1 6. T\u1ed5ng thanh to\xe1n: 1k. N\u1ebfu gi\u1ea3i \u0110B l\xe0 xxxx6x th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k"
        }, {
          name: "Nam_DauDuoiDuoi",
          guide: "\u0110\xe1nh 1 ch\u1eef s\u1ed1 cu\u1ed1i c\u1ee7a gi\u1ea3i \u0110B. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5: \u0111\xe1nh 1k cho s\u1ed1 9. T\u1ed5ng thanh to\xe1n: 1k. N\u1ebfu gi\u1ea3i \u0110B l\xe0 xxxxx9 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k"
        }, {
          name: "Nam_XiuChuDau",
          guide: "\u0110\xe1nh gi\u1ea3i 7. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5: \u0111\xe1nh 1k cho s\u1ed1 879, T\u1ed5ng thanh to\xe1n: 1k. N\u1ebfu gi\u1ea3i 7 l\xe0 879 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k"
        }, {
          name: "Nam_XiuChuDuoi",
          guide: "\u0110\xe1nh 3 ch\u1eef s\u1ed1 cu\u1ed1i c\u1ee7a gi\u1ea3i \u0110B. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5: \u0111\xe1nh 1k cho s\u1ed1 879, T\u1ed5ng thanh to\xe1n: 1k. N\u1ebfu gi\u1ea3i \u0110B l\xe0 xx879 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k"
        }, {
          name: "Nam_XiuChuDauDuoi",
          guide: "\u0110\xe1nh 3 ch\u1eef s\u1ed1 cu\u1ed1i c\u1ee7a gi\u1ea3i \u0110B v\xe0 gi\u1ea3i 7. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5: \u0111\xe1nh 1k cho s\u1ed1 879, T\u1ed5ng thanh to\xe1n: 2k. N\u1ebfu gi\u1ea3i \u0110B ho\u1eb7c gi\u1ea3i 7 c\xf3 3 ch\u1eef s\u1ed1 cu\u1ed1i l\xe0 879 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k"
        }, {
          name: "Nam_LoTruot4",
          guide: "Tr\u01b0\u1ee3t Xi\xean 4 c\u1ee7a 2 ch\u1eef s\u1ed1 cu\u1ed1i trong 18 gi\u1ea3i. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5: \u0111\xe1nh 1k cho tr\u01b0\u1ee3t xi\xean 01+02+03+04, T\u1ed5ng thanh to\xe1n: 1k. N\u1ebfu trong l\xf4 kh\xf4ng c\xf3 2 ch\u1eef s\u1ed1 cu\u1ed1i l\xe0 01,02,03,04 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k"
        }, {
          name: "Nam_LoTruot8",
          guide: "Tr\u01b0\u1ee3t Xi\xean 8 c\u1ee7a 2 ch\u1eef s\u1ed1 cu\u1ed1i trong 18 gi\u1ea3i. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5: \u0111\xe1nh 1k cho tr\u01b0\u1ee3t xi\xean 01+02+03+04+05+06+07+08, T\u1ed5ng thanh to\xe1n: 1k. N\u1ebfu trong l\xf4 kh\xf4ng c\xf3 2 ch\u1eef s\u1ed1 cu\u1ed1i l\xe0 01,02,03,04,05,06,07,08 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k"
        }, {
          name: "Nam_LoTruot10",
          guide: "Tr\u01b0\u1ee3t Xi\xean 10 c\u1ee7a 2 ch\u1eef s\u1ed1 cu\u1ed1i trong 18 gi\u1ea3i. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5: \u0111\xe1nh 1k cho tr\u01b0\u1ee3t xi\xean 01+02+03+04+05+06+07+08+09+10, T\u1ed5ng thanh to\xe1n: 1k. N\u1ebfu trong l\xf4 kh\xf4ng c\xf3 2 ch\u1eef s\u1ed1 cu\u1ed1i l\xe0 01,02,03,04,05,06,07,08,09,10 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k"
        } ];
      }
      showGuide(gameMode) {
        let guide = this.guides.find(guide => guide.name === gameMode.name);
        guide && (this.lbGuide.string = guide.guide.replace(/{{ODDS}}/g, gameMode.ratio + ""));
        this.show();
      }
    };
    __decorate([ property(cc.Label) ], LoDeSieuTocPopupGuide.prototype, "lbGuide", void 0);
    LoDeSieuTocPopupGuide = __decorate([ ccclass ], LoDeSieuTocPopupGuide);
    exports.default = LoDeSieuTocPopupGuide;
    cc._RF.pop();
  }, {
    "./LoDeSieuToc.Dialog": "LoDeSieuToc.Dialog"
  } ],
  "LoDeSieuToc.PopupHonors": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7c5eaYLF+pMNKiDJqoFwVt/", "LoDeSieuToc.PopupHonors");
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
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    const Http_1 = require("../../Main/Game/src/common/Http");
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const LoDeSieuToc_Dialog_1 = require("./LoDeSieuToc.Dialog");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let LoDeSieuTocPopupHonors = class LoDeSieuTocPopupHonors extends LoDeSieuToc_Dialog_1.default {
      constructor() {
        super(...arguments);
        this.honorsContent = null;
        this.honorsItem = null;
        this.atlasVip = null;
        this.sprTop = [];
        this.pageSize = 10;
      }
      show() {
        super.show();
        Http_1.default.get(Configs_1.default.App.API_LODE_SIEU_TOC + "getTopWin", {
          page: 0,
          size: this.pageSize
        }, (err, res) => {
          var _a;
          if (err) return;
          cc.log(res);
          if (!res["success"]) {
            App_1.default.instance.alertDialog.showMsg(res["desc"]);
            return;
          }
          let honors = res["data"].slice(0, this.pageSize);
          this.honorsContent.children.forEach(child => child.active = false);
          for (let i = 0; i < honors.length; i++) {
            const honor = honors[i];
            let honorItem = this.honorsContent.children[i];
            if (!honorItem) {
              honorItem = cc.instantiate(this.honorsItem);
              honorItem.parent = this.honorsContent;
            }
            honorItem.getChildByName("Bg").active = i % 2 === 0;
            honorItem.getChildByName("IconRank").getComponent(cc.Sprite).spriteFrame = this.sprTop[i];
            let nickName = honorItem.getChildByName("Nickname");
            let vip = Number(null === (_a = honor["vipRank"]) || void 0 === _a ? void 0 : _a.replace(/^\D+/g, ""));
            nickName.getComponentInChildren(cc.Sprite).spriteFrame = this.atlasVip.getSpriteFrame("VIP_" + vip);
            nickName.getComponentInChildren(cc.Label).node.color = cc.Color.BLACK.fromHEX(Utils_1.default.getColorVip("VIP_" + vip));
            nickName.getComponentInChildren(cc.Label).string = honor["nickName"];
            honorItem.getChildByName("LbWin").getComponent(cc.Label).string = Utils_1.default.formatMoney(honor["prize"]);
            honorItem.active = true;
            honorItem.parent = this.honorsContent;
            honorItem.position = cc.v3(cc.winSize.width, 400);
            let speed = .7;
            honorItem.runAction(cc.sequence(cc.delayTime(.15 * i * speed), cc.moveTo(.15 * speed, cc.v2(0, 400)), cc.delayTime(.05), cc.moveTo(.2 * speed * (1 === i ? .8 : 1 - Math.pow(2, -10 * i)), cc.v2(0, 380 - 85 * i)).easing(cc.easeCircleActionOut())));
          }
        });
      }
    };
    __decorate([ property(cc.Node) ], LoDeSieuTocPopupHonors.prototype, "honorsContent", void 0);
    __decorate([ property(cc.Node) ], LoDeSieuTocPopupHonors.prototype, "honorsItem", void 0);
    __decorate([ property(cc.SpriteAtlas) ], LoDeSieuTocPopupHonors.prototype, "atlasVip", void 0);
    __decorate([ property([ cc.SpriteFrame ]) ], LoDeSieuTocPopupHonors.prototype, "sprTop", void 0);
    LoDeSieuTocPopupHonors = __decorate([ ccclass ], LoDeSieuTocPopupHonors);
    exports.default = LoDeSieuTocPopupHonors;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/App": void 0,
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/common/Http": void 0,
    "../../Main/Game/src/common/Utils": void 0,
    "./LoDeSieuToc.Dialog": "LoDeSieuToc.Dialog"
  } ],
  "LoDeSieuToc.PopupNotiResult": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c8344i0BhxNAq3KkJDBJJQX", "LoDeSieuToc.PopupNotiResult");
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
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const LoDeSieuToc_Controller_1 = require("./LoDeSieuToc.Controller");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let LoDeSieuTocPopupNotiResult = class LoDeSieuTocPopupNotiResult extends Dialog_1.default {
      constructor() {
        super(...arguments);
        this.scrollResult = null;
        this.lbResult = null;
      }
      showResult(historys) {
        if (0 === historys.length) return;
        let content = "";
        historys.forEach((history, i) => {
          i > 0 && (content += "\n\n");
          content += "- Th\u1eafng <color=yellow>" + Utils_1.default.formatMoney(history["prize"]) + "</c> <color=#D600FF>" + LoDeSieuToc_Controller_1.default.getInstance().gameModes.find(mode => mode.name === history["gameType"]).getSieuTocDisplayName() + "</c> <color=#B8FF00>" + LoDeSieuToc_Controller_1.default.getInstance().cities.find(city => city.id === history["cityId"])["name"] + "</c> " + LoDeSieuToc_Controller_1.default.getInstance().sieuTocGameTypes.find(gameType => gameType.name === history["quickGameType"]).getDisplayName();
        });
        if (historys.length > 5) {
          this.scrollResult.node.active = true;
          this.scrollResult.content.getComponent(cc.RichText).string = content;
          this.lbResult.node.active = false;
        } else {
          this.scrollResult.node.active = false;
          this.lbResult.node.active = true;
          this.lbResult.string = content;
        }
        this.show();
      }
    };
    __decorate([ property(cc.ScrollView) ], LoDeSieuTocPopupNotiResult.prototype, "scrollResult", void 0);
    __decorate([ property(cc.RichText) ], LoDeSieuTocPopupNotiResult.prototype, "lbResult", void 0);
    LoDeSieuTocPopupNotiResult = __decorate([ ccclass ], LoDeSieuTocPopupNotiResult);
    exports.default = LoDeSieuTocPopupNotiResult;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/Dialog": void 0,
    "../../Main/Game/src/common/Utils": void 0,
    "./LoDeSieuToc.Controller": "LoDeSieuToc.Controller"
  } ],
  "LoDeSieuToc.PopupResult": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "aa0edwMlMFOp4hKgAQF5Pre", "LoDeSieuToc.PopupResult");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    const Http_1 = require("../../Main/Game/src/common/Http");
    const CustomUI_Dropdown_1 = require("../../Main/Game/src/customui/CustomUI.Dropdown");
    const LoDeSieuToc_Controller_1 = require("./LoDeSieuToc.Controller");
    const LoDeSieuToc_Dialog_1 = require("./LoDeSieuToc.Dialog");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let LoDeSieuTocPopupResult = class LoDeSieuTocPopupResult extends LoDeSieuToc_Dialog_1.default {
      constructor() {
        super(...arguments);
        this.dropDownCities = null;
        this.dropdownGameTypes = null;
        this.edbMatchId = null;
        this.resultContent = null;
        this.resultItem = null;
        this.statitics = null;
      }
      setAllCities() {
        this.dropDownCities.setOptions(LoDeSieuToc_Controller_1.default.getInstance().allCities.map(city => city.name));
      }
      setGameTypes() {
        this.dropdownGameTypes.setOptions(LoDeSieuToc_Controller_1.default.getInstance().sieuTocGameTypes.map(gameType => gameType.getShortDisplayName()));
      }
      showResult(cityId, gameTypeName, matchId) {
        this.dropDownCities.setValue(LoDeSieuToc_Controller_1.default.getInstance().allCities.findIndex(city => city.id === cityId));
        this.dropdownGameTypes.setValue(LoDeSieuToc_Controller_1.default.getInstance().sieuTocGameTypes.findIndex(gameType => gameType.name === gameTypeName));
        this.edbMatchId.string = matchId;
        this.actionGetMatchResult();
        this.show();
      }
      actionGetMatchResult() {
        if (0 === this.edbMatchId.string.length) return;
        Http_1.default.get(Configs_1.default.App.API_LODE_SIEU_TOC + "info", {
          cityId: LoDeSieuToc_Controller_1.default.getInstance().allCities[this.dropDownCities.getValue()].id,
          id: this.edbMatchId.string
        }, (err, res) => {
          if (!this.node) return;
          if (null != err) return;
          cc.log(res);
          this.removeAllItemResult();
          let lastTwoDigits = [];
          let valuesContentDb = this.resultContent.children[0].getChildByName("Values");
          if (res.hasOwnProperty("db") && Array.isArray(res["db"])) {
            valuesContentDb.active = true;
            res["db"].forEach((num, i) => {
              let numItem = cc.instantiate(this.resultItem);
              let lbNum = numItem.getComponentInChildren(cc.Label);
              lbNum.string = num;
              lbNum.fontSize = 30;
              lbNum.node.color = cc.Color.BLACK.fromHEX("#fdeaad");
              numItem.getComponentInChildren(cc.LabelOutline).color = cc.Color.BLACK.fromHEX("#ff8ff0");
              numItem.y = 0;
              if (res["db"].length > 4) {
                valuesContentDb.children[1].active = true;
                numItem.setParent(valuesContentDb.children[i < res["db"].length / 2 ? 0 : 1]);
              } else {
                valuesContentDb.children[1].active = false;
                numItem.setParent(valuesContentDb.children[0]);
              }
              lastTwoDigits.push(num.slice(num.length - 2));
            });
          } else valuesContentDb.active = false;
          let valuesContentNhat = this.resultContent.children[1].getChildByName("Values");
          if (res.hasOwnProperty("nhat") && Array.isArray(res["nhat"])) {
            valuesContentNhat.active = true;
            res["nhat"].forEach((num, i) => {
              let numItem = cc.instantiate(this.resultItem);
              let lbNum = numItem.getComponentInChildren(cc.Label);
              lbNum.string = num;
              numItem.y = 0;
              if (res["nhat"].length > 4) {
                valuesContentNhat.children[1].active = true;
                numItem.setParent(valuesContentNhat.children[i < res["nhat"].length / 2 ? 0 : 1]);
              } else {
                valuesContentNhat.children[1].active = false;
                numItem.setParent(valuesContentNhat.children[0]);
              }
              lastTwoDigits.push(num.slice(num.length - 2));
            });
          } else valuesContentNhat.active = false;
          let valuesContentNhi = this.resultContent.children[2].getChildByName("Values");
          if (res.hasOwnProperty("nhi") && Array.isArray(res["nhi"])) {
            valuesContentNhi.active = true;
            res["nhi"].forEach((num, i) => {
              let numItem = cc.instantiate(this.resultItem);
              let lbNum = numItem.getComponentInChildren(cc.Label);
              lbNum.string = num;
              numItem.y = 0;
              if (res["nhi"].length > 4) {
                valuesContentNhi.children[1].active = true;
                numItem.setParent(valuesContentNhi.children[i < res["nhi"].length / 2 ? 0 : 1]);
              } else {
                valuesContentNhi.children[1].active = false;
                numItem.setParent(valuesContentNhi.children[0]);
              }
              lastTwoDigits.push(num.slice(num.length - 2));
            });
          } else valuesContentNhi.active = false;
          let valuesContentBa = this.resultContent.children[3].getChildByName("Values");
          if (res.hasOwnProperty("ba") && Array.isArray(res["ba"])) {
            valuesContentBa.active = true;
            res["ba"].forEach((num, i) => {
              let numItem = cc.instantiate(this.resultItem);
              let lbNum = numItem.getComponentInChildren(cc.Label);
              lbNum.string = num;
              numItem.y = 0;
              if (res["ba"].length > 4) {
                valuesContentBa.children[1].active = true;
                numItem.setParent(valuesContentBa.children[i < res["ba"].length / 2 ? 0 : 1]);
              } else {
                valuesContentBa.children[1].active = false;
                numItem.setParent(valuesContentBa.children[0]);
              }
              lastTwoDigits.push(num.slice(num.length - 2));
            });
          } else valuesContentBa.active = false;
          let valuesContentBon = this.resultContent.children[4].getChildByName("Values");
          if (res.hasOwnProperty("bon") && Array.isArray(res["bon"])) {
            valuesContentBon.active = true;
            res["bon"].forEach((num, i) => {
              let numItem = cc.instantiate(this.resultItem);
              let lbNum = numItem.getComponentInChildren(cc.Label);
              lbNum.string = num;
              numItem.y = 0;
              if (res["bon"].length > 4) {
                valuesContentBon.children[1].active = true;
                numItem.setParent(valuesContentBon.children[i < res["bon"].length / 2 ? 0 : 1]);
              } else {
                valuesContentBon.children[1].active = false;
                numItem.setParent(valuesContentBon.children[0]);
              }
              lastTwoDigits.push(num.slice(num.length - 2));
            });
          } else valuesContentBon.active = false;
          let valuesContentNam = this.resultContent.children[5].getChildByName("Values");
          if (res.hasOwnProperty("nam") && Array.isArray(res["nam"])) {
            valuesContentNam.active = true;
            res["nam"].forEach((num, i) => {
              let numItem = cc.instantiate(this.resultItem);
              let lbNum = numItem.getComponentInChildren(cc.Label);
              lbNum.string = num;
              numItem.y = 0;
              if (res["nam"].length > 4) {
                valuesContentNam.children[1].active = true;
                numItem.setParent(valuesContentNam.children[i < res["nam"].length / 2 ? 0 : 1]);
              } else {
                valuesContentNam.children[1].active = false;
                numItem.setParent(valuesContentNam.children[0]);
              }
              lastTwoDigits.push(num.slice(num.length - 2));
            });
          } else valuesContentNam.active = false;
          let valuesContentSau = this.resultContent.children[6].getChildByName("Values");
          if (res.hasOwnProperty("sau") && Array.isArray(res["sau"])) {
            valuesContentSau.active = true;
            res["sau"].forEach((num, i) => {
              let numItem = cc.instantiate(this.resultItem);
              let lbNum = numItem.getComponentInChildren(cc.Label);
              lbNum.string = num;
              numItem.y = 0;
              if (res["sau"].length > 4) {
                valuesContentSau.children[1].active = true;
                numItem.setParent(valuesContentSau.children[i < res["sau"].length / 2 ? 0 : 1]);
              } else {
                valuesContentSau.children[1].active = false;
                numItem.setParent(valuesContentSau.children[0]);
              }
              lastTwoDigits.push(num.slice(num.length - 2));
            });
          } else valuesContentSau.active = false;
          let valuesContentBay = this.resultContent.children[7].getChildByName("Values");
          if (res.hasOwnProperty("bay") && Array.isArray(res["bay"])) {
            valuesContentBay.active = true;
            res["bay"].forEach((num, i) => {
              let numItem = cc.instantiate(this.resultItem);
              let lbNum = numItem.getComponentInChildren(cc.Label);
              lbNum.string = num;
              lbNum.node.color = cc.Color.BLACK.fromHEX(res.hasOwnProperty("tam") && Array.isArray(res["tam"]) && !res["tam"].every(s => !s) ? "#ffffff" : "#eb43ff");
              numItem.y = 0;
              if (res["bay"].length > 4) {
                valuesContentBay.children[1].active = true;
                numItem.setParent(valuesContentBay.children[i < res["bay"].length / 2 ? 0 : 1]);
              } else {
                valuesContentBay.children[1].active = false;
                numItem.setParent(valuesContentBay.children[0]);
              }
              lastTwoDigits.push(num.slice(num.length - 2));
            });
          } else valuesContentBay.active = false;
          if (res.hasOwnProperty("tam") && Array.isArray(res["tam"]) && !res["tam"].every(s => !s)) {
            this.resultContent.children[8].active = true;
            let valuesContentTam = this.resultContent.children[8].getChildByName("Values");
            res["tam"].forEach((num, i) => {
              let numItem = cc.instantiate(this.resultItem);
              let lbNum = numItem.getComponentInChildren(cc.Label);
              lbNum.string = num;
              lbNum.node.color = cc.Color.BLACK.fromHEX("#eb43ff");
              numItem.y = 0;
              if (res["tam"].length > 4) {
                valuesContentTam.children[1].active = true;
                numItem.setParent(valuesContentTam.children[i < res["tam"].length / 2 ? 0 : 1]);
              } else {
                valuesContentTam.children[1].active = false;
                numItem.setParent(valuesContentTam.children[0]);
              }
              lastTwoDigits.push(num.slice(num.length - 2));
            });
          } else this.resultContent.children[8].active = false;
          for (let i = 0; i < 10; i++) {
            let hangchuc = lastTwoDigits.filter(num => num.endsWith("" + i)).map(num => num[0]);
            let hangdonvi = lastTwoDigits.filter(num => num.startsWith("" + i)).map(num => num[1]);
            let lbs = this.statitics.children[i].getComponentsInChildren(cc.Label);
            lbs[0].string = hangchuc.sort().join(",");
            lbs[1].string = "" + i;
            lbs[2].string = hangdonvi.sort().join(",");
          }
        });
      }
      removeAllItemResult() {
        this.resultContent.children.forEach(child => {
          child.getChildByName("Values").children.forEach(v => v.removeAllChildren());
        });
        for (let i = 0; i < 10; i++) {
          let lbs = this.statitics.children[i].getComponentsInChildren(cc.Label);
          lbs[0].string = "";
          lbs[1].string = "" + i;
          lbs[2].string = "";
        }
      }
    };
    __decorate([ property(CustomUI_Dropdown_1.default) ], LoDeSieuTocPopupResult.prototype, "dropDownCities", void 0);
    __decorate([ property(CustomUI_Dropdown_1.default) ], LoDeSieuTocPopupResult.prototype, "dropdownGameTypes", void 0);
    __decorate([ property(cc.EditBox) ], LoDeSieuTocPopupResult.prototype, "edbMatchId", void 0);
    __decorate([ property(cc.Node) ], LoDeSieuTocPopupResult.prototype, "resultContent", void 0);
    __decorate([ property(cc.Node) ], LoDeSieuTocPopupResult.prototype, "resultItem", void 0);
    __decorate([ property(cc.Node) ], LoDeSieuTocPopupResult.prototype, "statitics", void 0);
    LoDeSieuTocPopupResult = __decorate([ ccclass ], LoDeSieuTocPopupResult);
    exports.default = LoDeSieuTocPopupResult;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/common/Http": void 0,
    "../../Main/Game/src/customui/CustomUI.Dropdown": void 0,
    "./LoDeSieuToc.Controller": "LoDeSieuToc.Controller",
    "./LoDeSieuToc.Dialog": "LoDeSieuToc.Dialog"
  } ],
  "LoDeSieuToc.PopupSelectNumber": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ddf104VeUdIu4kyvndfdUKj", "LoDeSieuToc.PopupSelectNumber");
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
    const LoDeSieuToc_Dialog_1 = require("./LoDeSieuToc.Dialog");
    const LoDeSieuToc_Play_1 = require("./LoDeSieuToc.Play");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let LoDeSieuTocPopupSelectNumber = class LoDeSieuTocPopupSelectNumber extends LoDeSieuToc_Dialog_1.default {
      constructor() {
        super(...arguments);
        this.btnConfirm = null;
        this.numberContent = null;
        this.numberItemTemplate = null;
        this.toggle3Digits = null;
        this.currentSelectedNumbers = [];
        this.currentMode = null;
      }
      start() {
        for (let i = 0; i < this.toggle3Digits.node.childrenCount; i++) {
          let toggle = this.toggle3Digits.node.children[i];
          toggle.on("toggle", () => {
            this.generateNumber(3, i);
          });
        }
      }
      showSelectNumber(selectedNumbers, currentMode) {
        this.show();
        let numDigits = currentMode.numberDigits;
        this.numberContent.y = 3 === numDigits ? 50 : 0;
        this.btnConfirm.y = 3 === numDigits ? -466 : -516;
        this.toggle3Digits.node.active = 3 === numDigits;
        this.toggle3Digits.node.children[0].getComponent(cc.Toggle).check();
        this.currentSelectedNumbers = [ ...selectedNumbers ];
        this.currentMode = currentMode;
        this.generateNumber(numDigits);
      }
      generateNumber(numDigits, index = 0) {
        let totalNumber = 1 === numDigits ? 10 : 100;
        for (let i = totalNumber; i < this.numberContent.childrenCount; i++) this.numberContent.children[i].active = false;
        for (let i = 0; i < totalNumber; i++) {
          let numberItem = this.numberContent.children[i];
          numberItem || (numberItem = cc.instantiate(this.numberItemTemplate));
          numberItem.active = true;
          numberItem.parent = this.numberContent;
          let numberString = "";
          switch (numDigits) {
           case 1:
            numberString = "" + i;
            break;

           case 2:
            numberString = ("0" + i).slice(-2);
            break;

           case 3:
            numberString = ("00" + (i + 100 * index)).slice(-3);
          }
          numberItem.children.forEach(child => child.getComponentInChildren(cc.Label).string = numberString);
          numberItem.off("toggle");
          numberItem.on("toggle", toggle => {
            if (toggle.isChecked) if (this.currentSelectedNumbers.length === this.currentMode.quantityNumber) {
              App_1.default.instance.toast.showToast("B\u1ea1n ch\u1ec9 \u0111\u01b0\u1ee3c ch\u1ecdn t\u1ed1i \u0111a " + this.currentMode.quantityNumber + " s\u1ed1");
              toggle.isChecked = false;
            } else this.currentSelectedNumbers.push(numberString); else {
              let removeIndex = this.currentSelectedNumbers.indexOf(numberString);
              removeIndex > -1 && this.currentSelectedNumbers.splice(removeIndex, 1);
            }
          });
          numberItem.getComponent(cc.Toggle).isChecked = this.currentSelectedNumbers.indexOf(numberString) > -1;
        }
      }
      dismiss() {
        this.currentSelectedNumbers = [];
        super.dismiss();
      }
      actionConfirm() {
        LoDeSieuToc_Play_1.default.getInstance().updateCurrentSelectedNumbers(this.currentSelectedNumbers);
        this.dismiss();
      }
    };
    __decorate([ property(cc.Node) ], LoDeSieuTocPopupSelectNumber.prototype, "btnConfirm", void 0);
    __decorate([ property(cc.Node) ], LoDeSieuTocPopupSelectNumber.prototype, "numberContent", void 0);
    __decorate([ property(cc.Node) ], LoDeSieuTocPopupSelectNumber.prototype, "numberItemTemplate", void 0);
    __decorate([ property(cc.ToggleContainer) ], LoDeSieuTocPopupSelectNumber.prototype, "toggle3Digits", void 0);
    LoDeSieuTocPopupSelectNumber = __decorate([ ccclass ], LoDeSieuTocPopupSelectNumber);
    exports.default = LoDeSieuTocPopupSelectNumber;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/App": void 0,
    "./LoDeSieuToc.Dialog": "LoDeSieuToc.Dialog",
    "./LoDeSieuToc.Play": "LoDeSieuToc.Play"
  } ],
  "Lode.LodeData": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d0515Z2sbJBobSd6oayrhsM", "Lode.LodeData");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.SieuTocGameType = exports.City = exports.GameMode = exports.ModeENUM = exports.GroupMode = exports.GroupModeENUM = void 0;
    var GroupModeENUM;
    (function(GroupModeENUM) {
      GroupModeENUM["BAO_LO"] = "_BaoLo";
      GroupModeENUM["DE"] = "_De";
      GroupModeENUM["BA_CANG"] = "_BaCang";
      GroupModeENUM["DAU_DUOI"] = "_DauDuoi";
      GroupModeENUM["LO_XIEN"] = "_LoXien";
      GroupModeENUM["LO_TRUOT"] = "_LoTruot";
      GroupModeENUM["LO_DA"] = "_LoDa";
      GroupModeENUM["XIU_CHU"] = "_XiuChu";
    })(GroupModeENUM = exports.GroupModeENUM || (exports.GroupModeENUM = {}));
    class GroupMode {
      getDisplayName() {
        switch (this.groupMode) {
         case GroupModeENUM.BAO_LO:
          return "Bao L\xf4";

         case GroupModeENUM.DE:
          return "\u0110\u1ec1";

         case GroupModeENUM.BA_CANG:
          return "3 C\xe0ng";

         case GroupModeENUM.DAU_DUOI:
          return "\u0110\u1ea7u \u0110u\xf4i";

         case GroupModeENUM.LO_XIEN:
          return "L\xf4 Xi\xean";

         case GroupModeENUM.LO_TRUOT:
          return "L\xf4 Tr\u01b0\u1ee3t";

         case GroupModeENUM.LO_DA:
          return "L\xf4 \u0110\xe1";

         case GroupModeENUM.XIU_CHU:
          return "X\u1ec9u Ch\u1ee7";

         default:
          return "";
        }
      }
    }
    exports.GroupMode = GroupMode;
    var ModeENUM;
    (function(ModeENUM) {
      ModeENUM["BAO_LO_2_SO"] = "BaoLo2So";
      ModeENUM["BAO_LO_3_SO"] = "BaoLo3So";
      ModeENUM["DE_DAU"] = "DeDau";
      ModeENUM["DE_DAC_BIET"] = "DeDacBiet";
      ModeENUM["DE_DAU_DUOI"] = "DeDauDuoi";
      ModeENUM["BA_CANG"] = "BaCang";
      ModeENUM["DAU_DUOI_DAU"] = "DauDuoiDau";
      ModeENUM["DAU_DUOI_DUOI"] = "DauDuoiDuoi";
      ModeENUM["LO_XIEN_2"] = "LoXien2";
      ModeENUM["LO_XIEN_3"] = "LoXien3";
      ModeENUM["LO_XIEN_4"] = "LoXien4";
      ModeENUM["LO_TRUOT_4"] = "LoTruot4";
      ModeENUM["LO_TRUOT_8"] = "LoTruot8";
      ModeENUM["LO_TRUOT_10"] = "LoTruot10";
      ModeENUM["LO_DA_2"] = "LoDa2";
      ModeENUM["LO_DA_3"] = "LoDa3";
      ModeENUM["LO_DA_4"] = "LoDa4";
      ModeENUM["XIU_CHU_DAU"] = "XiuChuDau";
      ModeENUM["XIU_CHU_DUOI"] = "XiuChuDuoi";
      ModeENUM["XIU_CHU_DAU_DUOI"] = "XiuChuDauDuoi";
      ModeENUM["BA_CANG_DAU"] = "BaCangDau";
      ModeENUM["BA_CANG_DUOI"] = "BaCangDuoi";
      ModeENUM["BA_CANG_DAU_DUOI"] = "BaCangDauDuoi";
    })(ModeENUM = exports.ModeENUM || (exports.ModeENUM = {}));
    class GameMode {
      static toGameMode(mode) {
        let gameMode = new GameMode();
        gameMode.bet = null === mode || void 0 === mode ? void 0 : mode.bet;
        gameMode.ratio = null === mode || void 0 === mode ? void 0 : mode.ratio;
        gameMode.lotteryRegion = null === mode || void 0 === mode ? void 0 : mode.lotteryRegionENUM;
        gameMode.name = null === mode || void 0 === mode ? void 0 : mode.name;
        gameMode.displayName = null === mode || void 0 === mode ? void 0 : mode.displayName;
        gameMode.active = null === mode || void 0 === mode ? void 0 : mode.active;
        gameMode.numberDigits = null === mode || void 0 === mode ? void 0 : mode.numberLength;
        gameMode.quantityNumber = (null === mode || void 0 === mode ? void 0 : mode.fixedSize) > 0 ? null === mode || void 0 === mode ? void 0 : mode.fixedSize : 10;
        gameMode.prizes = [];
        null === mode || void 0 === mode ? void 0 : mode.fieldNames.forEach(field => {
          switch (field) {
           case "special":
            gameMode.prizes.push("Gi\u1ea3i \u0110\u1eb7c Bi\u1ec7t");
            break;

           case "prize1":
            gameMode.prizes.push("Gi\u1ea3i Nh\u1ea5t");
            break;

           case "prize2":
            gameMode.prizes.push("Gi\u1ea3i Nh\xec");
            break;

           case "prize3":
            gameMode.prizes.push("Gi\u1ea3i Ba");
            break;

           case "prize4":
            gameMode.prizes.push("Gi\u1ea3i T\u01b0");
            break;

           case "prize5":
            gameMode.prizes.push("Gi\u1ea3i N\u0103m");
            break;

           case "prize6":
            gameMode.prizes.push("Gi\u1ea3i S\xe1u");
            break;

           case "prize7":
            gameMode.prizes.push("Gi\u1ea3i B\u1ea3y");
            break;

           case "prize8":
            gameMode.prizes.push("Gi\u1ea3i T\xe1m");
            break;

           default:
            gameMode.prizes.push(field);
          }
        });
        gameMode.numberRequired = null === mode || void 0 === mode ? void 0 : mode.fixedSize;
        return gameMode;
      }
      static toGameModes(modes) {
        let gameModes = [];
        null === modes || void 0 === modes ? void 0 : modes.forEach(mode => {
          gameModes.push(this.toGameMode(mode));
        });
        return gameModes;
      }
      getDisplayName() {
        if (this.name.includes(ModeENUM.BAO_LO_2_SO)) return "L\xf4 2 S\u1ed1";
        if (this.name.includes(ModeENUM.BAO_LO_3_SO)) return "L\xf4 3 S\u1ed1";
        if (this.name.includes(ModeENUM.DE_DAU_DUOI)) return "\u0110\u1ec1\n\u0110\u1ea7u \u0110u\xf4i";
        if (this.name.includes(ModeENUM.DE_DAU)) return "\u0110\u1ec1 \u0110\u1ea7u";
        if (this.name.includes(ModeENUM.DE_DAC_BIET)) return "\u0110\u1ec1\n\u0110\u1eb7c Bi\u1ec7t";
        if (this.name.includes(ModeENUM.DAU_DUOI_DAU)) return "\u0110\u1ea7u";
        if (this.name.includes(ModeENUM.DAU_DUOI_DUOI)) return "\u0110u\xf4i";
        if (this.name.includes(ModeENUM.LO_XIEN_2)) return "Xi\xean 2";
        if (this.name.includes(ModeENUM.LO_XIEN_3)) return "Xi\xean 3";
        if (this.name.includes(ModeENUM.LO_XIEN_4)) return "Xi\xean 4";
        if (this.name.includes(ModeENUM.LO_TRUOT_4)) return "Tr\u01b0\u1ee3t\nXi\xean 4";
        if (this.name.includes(ModeENUM.LO_TRUOT_8)) return "Tr\u01b0\u1ee3t\nXi\xean 8";
        if (this.name.includes(ModeENUM.LO_TRUOT_10)) return "Tr\u01b0\u1ee3t\nXi\xean 10";
        if (this.name.includes(ModeENUM.LO_DA_2)) return "\u0110\xe1 2";
        if (this.name.includes(ModeENUM.LO_DA_3)) return "\u0110\xe1 3";
        if (this.name.includes(ModeENUM.LO_DA_4)) return "\u0110\xe1 4";
        if (this.name.includes(ModeENUM.XIU_CHU_DAU_DUOI)) return "XC\n\u0110\u1ea7u \u0110u\xf4i";
        if (this.name.includes(ModeENUM.XIU_CHU_DAU)) return "XC \u0110\u1ea7u";
        if (this.name.includes(ModeENUM.XIU_CHU_DUOI)) return "XC \u0110u\xf4i";
        if (this.name.includes(ModeENUM.BA_CANG_DAU_DUOI)) return "3C\n\u0110\u1ea7u \u0110u\xf4i";
        if (this.name.includes(ModeENUM.BA_CANG_DAU)) return "3C \u0110\u1ea7u";
        if (this.name.includes(ModeENUM.BA_CANG_DUOI)) return "3C \u0110u\xf4i";
        if (this.name.includes(ModeENUM.BA_CANG)) return "3 C\xe0ng";
        return this.displayName;
      }
      getSieuTocDisplayName() {
        if (this.name.includes(ModeENUM.BAO_LO_2_SO)) return "L\xf4 2 S\u1ed1";
        if (this.name.includes(ModeENUM.BAO_LO_3_SO)) return "L\xf4 3 S\u1ed1";
        if (this.name.includes(ModeENUM.DE_DAU_DUOI)) return "\u0110\u1ec1 \u0110\u1ea7u \u0110u\xf4i";
        if (this.name.includes(ModeENUM.DE_DAU)) return "\u0110\u1ec1 \u0110\u1ea7u";
        if (this.name.includes(ModeENUM.DE_DAC_BIET)) return "\u0110\u1ec1 \u0110\u1eb7c Bi\u1ec7t";
        if (this.name.includes(ModeENUM.DAU_DUOI_DAU)) return "\u0110\u1ea7u";
        if (this.name.includes(ModeENUM.DAU_DUOI_DUOI)) return "\u0110u\xf4i";
        if (this.name.includes(ModeENUM.LO_XIEN_2)) return "Xi\xean 2";
        if (this.name.includes(ModeENUM.LO_XIEN_3)) return "Xi\xean 3";
        if (this.name.includes(ModeENUM.LO_XIEN_4)) return "Xi\xean 4";
        if (this.name.includes(ModeENUM.LO_TRUOT_4)) return "Tr\u01b0\u1ee3t Xi\xean 4";
        if (this.name.includes(ModeENUM.LO_TRUOT_8)) return "Tr\u01b0\u1ee3t Xi\xean 8";
        if (this.name.includes(ModeENUM.LO_TRUOT_10)) return "Tr\u01b0\u1ee3t Xi\xean 10";
        if (this.name.includes(ModeENUM.LO_DA_2)) return "\u0110\xe1 2";
        if (this.name.includes(ModeENUM.LO_DA_3)) return "\u0110\xe1 3";
        if (this.name.includes(ModeENUM.LO_DA_4)) return "\u0110\xe1 4";
        if (this.name.includes(ModeENUM.XIU_CHU_DAU_DUOI)) return "XC \u0110\u1ea7u \u0110u\xf4i";
        if (this.name.includes(ModeENUM.XIU_CHU_DAU)) return "XC \u0110\u1ea7u";
        if (this.name.includes(ModeENUM.XIU_CHU_DUOI)) return "XC \u0110u\xf4i";
        if (this.name.includes(ModeENUM.BA_CANG_DAU_DUOI)) return "3C \u0110\u1ea7u \u0110u\xf4i";
        if (this.name.includes(ModeENUM.BA_CANG_DAU)) return "3C \u0110\u1ea7u";
        if (this.name.includes(ModeENUM.BA_CANG_DUOI)) return "3C \u0110u\xf4i";
        if (this.name.includes(ModeENUM.BA_CANG)) return "3 C\xe0ng";
        return this.displayName;
      }
    }
    exports.GameMode = GameMode;
    class City {
      static toCity(city) {
        let _city = new City();
        _city.uuid = null === city || void 0 === city ? void 0 : city.uuid;
        _city.id = null === city || void 0 === city ? void 0 : city.id;
        _city.name = null === city || void 0 === city ? void 0 : city.name;
        _city.date = null === city || void 0 === city ? void 0 : city.date;
        _city.region = null === city || void 0 === city ? void 0 : city.region;
        _city.feature = null === city || void 0 === city ? void 0 : city.feature;
        _city.urlSource = null === city || void 0 === city ? void 0 : city.urlSource;
        _city.urlRSS = null === city || void 0 === city ? void 0 : city.urlRSS;
        _city.urlMinhNgoc = null === city || void 0 === city ? void 0 : city.urlMinhNgoc;
        _city.timeRelease = null === city || void 0 === city ? void 0 : city.timeRelease;
        _city.status = null === city || void 0 === city ? void 0 : city.status;
        _city.createdAt = null === city || void 0 === city ? void 0 : city.createdAt;
        _city.updatedAt = null === city || void 0 === city ? void 0 : city.updatedAt;
        return _city;
      }
      static toCities(cities) {
        let _cities = [];
        null === cities || void 0 === cities ? void 0 : cities.forEach(city => {
          _cities.push(this.toCity(city));
        });
        return _cities;
      }
    }
    exports.City = City;
    class SieuTocGameType {
      static toSieuTocGameType(gameType) {
        let sieuTocGameType = new SieuTocGameType();
        sieuTocGameType.name = null === gameType || void 0 === gameType ? void 0 : gameType.name;
        sieuTocGameType.intervalSeconds = null === gameType || void 0 === gameType ? void 0 : gameType.intervalSeconds;
        sieuTocGameType.endBetSeconds = null === gameType || void 0 === gameType ? void 0 : gameType.endBetSeconds;
        return sieuTocGameType;
      }
      static toSieuTocGameTypes(gameTypes) {
        let sieuTocGameTypes = [];
        null === gameTypes || void 0 === gameTypes ? void 0 : gameTypes.forEach(gameType => {
          sieuTocGameTypes.push(this.toSieuTocGameType(gameType));
        });
        return sieuTocGameTypes;
      }
      getDisplayName() {
        switch (this.name) {
         case "MOT_PHUT":
          return "Si\xeau t\u1ed1c 1 Ph\xfat";

         case "BA_PHUT":
          return "Si\xeau t\u1ed1c 3 Ph\xfat";

         case "NAM_PHUT":
          return "Si\xeau t\u1ed1c 5 Ph\xfat";

         default:
          return this.name;
        }
      }
      getShortDisplayName() {
        switch (this.name) {
         case "MOT_PHUT":
          return "1 Ph\xfat";

         case "BA_PHUT":
          return "3 Ph\xfat";

         case "NAM_PHUT":
          return "5 Ph\xfat";

         default:
          return this.name;
        }
      }
    }
    exports.SieuTocGameType = SieuTocGameType;
    cc._RF.pop();
  }, {} ],
  "Lode.PopupGuide": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "77d0duTyZtOXZxwblICEMyZ", "Lode.PopupGuide");
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
    let LoDePopupGuide = class LoDePopupGuide extends Dialog_1.default {
      constructor() {
        super(...arguments);
        this.lbGuide = null;
        this.guides = [ {
          name: "Bac_BaoLo2So",
          guide: "\u0110\xe1nh 2 ch\u1eef s\u1ed1 cu\u1ed1i trong l\xf4 27 gi\u1ea3i. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n, n\u1ebfu s\u1ed1 \u0111\xf3 v\u1ec1 N l\u1ea7n th\xec t\xednh k\u1ebft qu\u1ea3 x N l\u1ea7n. V\xed d\u1ee5: \u0111\xe1nh l\xf4 79 - 1 con 1k, T\u1ed5ng thanh to\xe1n: 1k x 27 = 27k. N\u1ebfu trong l\xf4 c\xf3 2 ch\u1eef s\u1ed1 cu\u1ed1i l\xe0 79 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k, n\u1ebfu c\xf3 N l\u1ea7n 2 ch\u1eef s\u1ed1 cu\u1ed1i l\xe0 79 th\xec Ti\u1ec1n th\u1eafng l\xe0: 1k x {{ODDS}} x N"
        }, {
          name: "Bac_BaoLo3So",
          guide: "\u0110\xe1nh 3 ch\u1eef s\u1ed1 cu\u1ed1i trong l\xf4 23 gi\u1ea3i. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n, n\u1ebfu s\u1ed1 \u0111\xf3 v\u1ec1 N l\u1ea7n th\xec t\xednh k\u1ebft qu\u1ea3 x N l\u1ea7n. V\xed d\u1ee5: \u0111\xe1nh l\xf4 789 - 1 con 1k, T\u1ed5ng thanh to\xe1n: 1k x 23 = 23k. N\u1ebfu trong l\xf4 c\xf3 3 ch\u1eef s\u1ed1 cu\u1ed1i l\xe0 789 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k, n\u1ebfu c\xf3 N l\u1ea7n 3 ch\u1eef s\u1ed1 cu\u1ed1i l\xe0 789 th\xec Ti\u1ec1n th\u1eafng l\xe0: 1k x {{ODDS}} x N"
        }, {
          name: "Bac_DeDau",
          guide: "\u0110\xe1nh l\xf4 gi\u1ea3i 7 ( c\xf3 4 gi\u1ea3i, thanh to\xe1n \u0111\u1ee7 ). Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5 : \u0111\xe1nh 1k cho s\u1ed1 79, T\u1ed5ng thanh to\xe1n: 1k x 4 =4k. N\u1ebfu trong l\xf4 gi\u1ea3i 7 c\xf3 1 s\u1ed1 79 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k"
        }, {
          name: "Bac_DeDacBiet",
          guide: "\u0110\xe1nh 2 ch\u1eef s\u1ed1 cu\u1ed1i trong gi\u1ea3i \u0110B. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5: \u0111\xe1nh 1k cho s\u1ed1 79. T\u1ed5ng thanh to\xe1n: 1k. N\u1ebfu gi\u1ea3i \u0110B l\xe0 xxx79 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k"
        }, {
          name: "Bac_BaCang",
          guide: "\u0110\xe1nh 3 ch\u1eef s\u1ed1 cu\u1ed1i c\u1ee7a gi\u1ea3i \u0110B. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5: \u0111\xe1nh 1k cho s\u1ed1 879, T\u1ed5ng thanh to\xe1n: 1k. N\u1ebfu gi\u1ea3i \u0110B l\xe0 xx879 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k"
        }, {
          name: "Bac_DauDuoiDau",
          guide: "\u0110\xe1nh 1 ch\u1eef s\u1ed1 \u1edf h\xe0ng ch\u1ee5c c\u1ee7a gi\u1ea3i \u0110B. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5: \u0111\xe1nh 1k cho s\u1ed1 7. T\u1ed5ng thanh to\xe1n: 1K. N\u1ebfu gi\u1ea3i \u0110B l\xe0 xxx7x th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k"
        }, {
          name: "Bac_DauDuoiDuoi",
          guide: "\u0110\xe1nh 1 ch\u1eef s\u1ed1 cu\u1ed1i c\u1ee7a gi\u1ea3i \u0110B. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5: \u0111\xe1nh 1k cho s\u1ed1 7. T\u1ed5ng thanh to\xe1n: 1K. N\u1ebfu gi\u1ea3i \u0110B l\xe0 xxxx7 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k"
        }, {
          name: "Bac_LoXien2",
          guide: "Xi\xean 2 c\u1ee7a 2 ch\u1eef s\u1ed1 cu\u1ed1i trong l\xf4 27 gi\u1ea3i. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5 : \u0111\xe1nh 1k cho xi\xean 11+13, T\u1ed5ng thanh to\xe1n: 1k. N\u1ebfu trong l\xf4 c\xf3 2 ch\u1eef s\u1ed1 cu\u1ed1i l\xe0 11, 13 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k"
        }, {
          name: "Bac_LoXien3",
          guide: "Xi\xean 3 c\u1ee7a 2 ch\u1eef s\u1ed1 cu\u1ed1i trong l\xf4 27 gi\u1ea3i. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5 : \u0111\xe1nh 1k cho xi\xean 11+13+15, T\u1ed5ng thanh to\xe1n: 1k. N\u1ebfu trong l\xf4 c\xf3 2 ch\u1eef s\u1ed1 cu\u1ed1i l\xe0 11,13,15 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k"
        }, {
          name: "Bac_LoXien4",
          guide: "Xi\xean 4 c\u1ee7a 2 ch\u1eef s\u1ed1 cu\u1ed1i trong l\xf4 27 gi\u1ea3i. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5 : \u0111\xe1nh 1k cho xi\xean 11+13+15+20, T\u1ed5ng thanh to\xe1n: 1k. N\u1ebfu trong l\xf4 c\xf3 2 ch\u1eef s\u1ed1 cu\u1ed1i l\xe0 11,13,15,20 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k"
        }, {
          name: "Bac_LoTruot4",
          guide: "Tr\u01b0\u1ee3t Xi\xean 4 c\u1ee7a 2 ch\u1eef s\u1ed1 cu\u1ed1i trong 27 gi\u1ea3i. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5: \u0111\xe1nh 1k cho tr\u01b0\u1ee3t xi\xean 01+02+03+04, T\u1ed5ng thanh to\xe1n: 1k. N\u1ebfu trong l\xf4 kh\xf4ng c\xf3 2 ch\u1eef s\u1ed1 cu\u1ed1i l\xe0 01,02,03,04 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k"
        }, {
          name: "Bac_LoTruot8",
          guide: "Tr\u01b0\u1ee3t Xi\xean 8 c\u1ee7a 2 ch\u1eef s\u1ed1 cu\u1ed1i trong 27 gi\u1ea3i. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5: \u0111\xe1nh 1k cho tr\u01b0\u1ee3t xi\xean 01+02+03+04+05+06+07+08, T\u1ed5ng thanh to\xe1n: 1k. N\u1ebfu trong l\xf4 kh\xf4ng c\xf3 2 ch\u1eef s\u1ed1 cu\u1ed1i l\xe0 01,02,03,04,05,06,07,08 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k"
        }, {
          name: "Bac_LoTruot10",
          guide: "Tr\u01b0\u1ee3t Xi\xean 10 c\u1ee7a 2 ch\u1eef s\u1ed1 cu\u1ed1i trong 27 gi\u1ea3i. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5: \u0111\xe1nh 1k cho tr\u01b0\u1ee3t xi\xean 01+02+03+04+05+06+07+08+09+10, T\u1ed5ng thanh to\xe1n: 1k. N\u1ebfu trong l\xf4 kh\xf4ng c\xf3 2 ch\u1eef s\u1ed1 cu\u1ed1i l\xe0 01,02,03,04,05,06,07,08,09,10 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k"
        }, {
          name: "Trung_BaoLo2So",
          guide: "\u0110\xe1nh 2 ch\u1eef s\u1ed1 cu\u1ed1i trong l\xf4 18 gi\u1ea3i. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n, n\u1ebfu s\u1ed1 \u0111\xf3 v\u1ec1 N l\u1ea7n th\xec t\xednh k\u1ebft qu\u1ea3 x N l\u1ea7n. V\xed d\u1ee5: \u0111\xe1nh l\xf4 s\u1ed1 39 - 1 con 1k, T\u1ed5ng thanh to\xe1n: 1k x 18 = 18k. N\u1ebfu trong l\xf4 c\xf3 1 l\u1ea7n 2 ch\u1eef s\u1ed1 cu\u1ed1i l\xe0 39 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k, n\u1ebfu c\xf3 N l\u1ea7n 2 ch\u1eef s\u1ed1 cu\u1ed1i l\xe0 39 th\xec Ti\u1ec1n th\u1eafng l\xe0: 1k x {{ODDS}} x N"
        }, {
          name: "Trung_BaoLo3So",
          guide: "\u0110\xe1nh 3 ch\u1eef s\u1ed1 cu\u1ed1i trong l\xf4 17 gi\u1ea3i. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n, n\u1ebfu s\u1ed1 \u0111\xf3 v\u1ec1 N l\u1ea7n th\xec t\xednh k\u1ebft qu\u1ea3 x N l\u1ea7n. V\xed d\u1ee5: \u0111\xe1nh l\xf4 789 - 1 con 1k, T\u1ed5ng thanh to\xe1n: 1k x 17 = 17k. N\u1ebfu trong l\xf4 c\xf3 3 ch\u1eef s\u1ed1 cu\u1ed1i l\xe0 789 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k, n\u1ebfu c\xf3 N l\u1ea7n 3 ch\u1eef s\u1ed1 cu\u1ed1i l\xe0 789 th\xec Ti\u1ec1n th\u1eafng l\xe0: 1k x {{ODDS}} x N"
        }, {
          name: "Trung_DeDau",
          guide: "\u0110\xe1nh gi\u1ea3i 8. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5: \u0111\xe1nh 1k cho s\u1ed1 79. T\u1ed5ng thanh to\xe1n: 1k. N\u1ebfu gi\u1ea3i 8 l\xe0 79 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k"
        }, {
          name: "Trung_DeDacBiet",
          guide: "\u0110\xe1nh 2 ch\u1eef s\u1ed1 cu\u1ed1i trong gi\u1ea3i \u0110B. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5: \u0111\xe1nh 1k cho s\u1ed1 79. T\u1ed5ng thanh to\xe1n: 1k. N\u1ebfu gi\u1ea3i \u0110B l\xe0 xxx79 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k"
        }, {
          name: "Trung_BaCangDau",
          guide: "\u0110\xe1nh gi\u1ea3i 7. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5: \u0111\xe1nh 1k cho s\u1ed1 879, T\u1ed5ng thanh to\xe1n: 1k. N\u1ebfu gi\u1ea3i 7 l\xe0 879 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k"
        }, {
          name: "Trung_BaCangDuoi",
          guide: "\u0110\xe1nh 3 ch\u1eef s\u1ed1 cu\u1ed1i c\u1ee7a gi\u1ea3i \u0110B. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5: \u0111\xe1nh 1k cho s\u1ed1 879, T\u1ed5ng thanh to\xe1n: 1k. N\u1ebfu gi\u1ea3i \u0110B l\xe0 xx879 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k"
        }, {
          name: "Trung_BaCangDauDuoi",
          guide: "\u0110\xe1nh 3 ch\u1eef s\u1ed1 cu\u1ed1i c\u1ee7a gi\u1ea3i \u0110B v\xe0 gi\u1ea3i 7. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5: \u0111\xe1nh 1k cho s\u1ed1 879, T\u1ed5ng thanh to\xe1n: 2k. N\u1ebfu gi\u1ea3i \u0110B ho\u1eb7c gi\u1ea3i 7 c\xf3 3 ch\u1eef s\u1ed1 cu\u1ed1i l\xe0 879 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k"
        }, {
          name: "Trung_DauDuoiDau",
          guide: "\u0110\xe1nh 1 ch\u1eef s\u1ed1 \u1edf h\xe0ng ch\u1ee5c c\u1ee7a gi\u1ea3i \u0110B. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5: \u0111\xe1nh 1k cho s\u1ed1 7. T\u1ed5ng thanh to\xe1n: 1K. N\u1ebfu gi\u1ea3i \u0110B l\xe0 xxx7x th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k"
        }, {
          name: "Trung_DauDuoiDuoi",
          guide: "\u0110\xe1nh 1 ch\u1eef s\u1ed1 cu\u1ed1i c\u1ee7a gi\u1ea3i \u0110B. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5: \u0111\xe1nh 1k cho s\u1ed1 9. T\u1ed5ng thanh to\xe1n: 1k. N\u1ebfu gi\u1ea3i \u0110B l\xe0 xxxx9 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k"
        }, {
          name: "Trung_LoXien2",
          guide: "Xi\xean 2 c\u1ee7a 2 ch\u1eef s\u1ed1 cu\u1ed1i trong l\xf4 18 gi\u1ea3i. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5 : \u0111\xe1nh 1k cho xi\xean 11+13, T\u1ed5ng thanh to\xe1n: 1k. N\u1ebfu trong l\xf4 c\xf3 2 ch\u1eef s\u1ed1 cu\u1ed1i l\xe0 11,13 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k"
        }, {
          name: "Trung_LoXien3",
          guide: "Xi\xean 3 c\u1ee7a 2 ch\u1eef s\u1ed1 cu\u1ed1i trong l\xf4 18 gi\u1ea3i. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5 : \u0111\xe1nh 1k cho xi\xean 11+13+15, T\u1ed5ng thanh to\xe1n: 1k. N\u1ebfu trong l\xf4 c\xf3 2 ch\u1eef s\u1ed1 cu\u1ed1i l\xe0 11,13,15 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k"
        }, {
          name: "Trung_LoXien4",
          guide: "Xi\xean 4 c\u1ee7a 2 ch\u1eef s\u1ed1 cu\u1ed1i trong l\xf4 18 gi\u1ea3i. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5 : \u0111\xe1nh 1k cho xi\xean 11+13+15+20, T\u1ed5ng thanh to\xe1n: 1k. N\u1ebfu trong l\xf4 c\xf3 2 ch\u1eef s\u1ed1 cu\u1ed1i l\xe0 11,13,15,20 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k"
        }, {
          name: "Trung_LoTruot4",
          guide: "Tr\u01b0\u1ee3t Xi\xean 4 c\u1ee7a 2 ch\u1eef s\u1ed1 cu\u1ed1i trong 18 gi\u1ea3i. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5: \u0111\xe1nh 1k cho tr\u01b0\u1ee3t xi\xean 01+02+03+04, T\u1ed5ng thanh to\xe1n: 1k. N\u1ebfu trong l\xf4 kh\xf4ng c\xf3 2 ch\u1eef s\u1ed1 cu\u1ed1i l\xe0 01,02,03,04 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k"
        }, {
          name: "Trung_LoTruot8",
          guide: "Tr\u01b0\u1ee3t Xi\xean 8 c\u1ee7a 2 ch\u1eef s\u1ed1 cu\u1ed1i trong 18 gi\u1ea3i. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5: \u0111\xe1nh 1k cho tr\u01b0\u1ee3t xi\xean 01+02+03+04+05+06+07+08, T\u1ed5ng thanh to\xe1n: 1k. N\u1ebfu trong l\xf4 kh\xf4ng c\xf3 2 ch\u1eef s\u1ed1 cu\u1ed1i l\xe0 01,02,03,04,05,06,07,08 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k"
        }, {
          name: "Trung_LoTruot10",
          guide: "Tr\u01b0\u1ee3t Xi\xean 10 c\u1ee7a 2 ch\u1eef s\u1ed1 cu\u1ed1i trong 18 gi\u1ea3i. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5: \u0111\xe1nh 1k cho tr\u01b0\u1ee3t xi\xean 01+02+03+04+05+06+07+08+09+10, T\u1ed5ng thanh to\xe1n: 1k. N\u1ebfu trong l\xf4 kh\xf4ng c\xf3 2 ch\u1eef s\u1ed1 cu\u1ed1i l\xe0 01,02,03,04,05,06,07,08,09,10 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k"
        }, {
          name: "Nam_BaoLo2So",
          guide: "\u0110\xe1nh 2 ch\u1eef s\u1ed1 cu\u1ed1i trong l\xf4 18 gi\u1ea3i. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n, n\u1ebfu s\u1ed1 \u0111\xf3 v\u1ec1 N l\u1ea7n th\xec t\xednh k\u1ebft qu\u1ea3 x N l\u1ea7n. V\xed d\u1ee5: bao l\xf4 39 - 1 con 1k, T\u1ed5ng thanh to\xe1n: 1k x 18 = 18k. N\u1ebfu trong l\xf4 c\xf3 1 l\u1ea7n 2 ch\u1eef s\u1ed1 cu\u1ed1i l\xe0 39 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k, n\u1ebfu c\xf3 N l\u1ea7n 2 ch\u1eef s\u1ed1 cu\u1ed1i l\xe0 39 th\xec Ti\u1ec1n th\u1eafng l\xe0: 1k x {{ODDS}} x N"
        }, {
          name: "Nam_BaoLo3So",
          guide: "\u0110\xe1nh 3 ch\u1eef s\u1ed1 cu\u1ed1i trong l\xf4 17 gi\u1ea3i. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n, n\u1ebfu s\u1ed1 \u0111\xf3 v\u1ec1 N l\u1ea7n th\xec t\xednh k\u1ebft qu\u1ea3 x N l\u1ea7n. V\xed d\u1ee5: bao l\xf4 789 - 1 con 1k, T\u1ed5ng thanh to\xe1n: 1k x 17 = 17k. N\u1ebfu trong l\xf4 c\xf3 3 ch\u1eef s\u1ed1 cu\u1ed1i l\xe0 789 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k, n\u1ebfu c\xf3 N l\u1ea7n 3 ch\u1eef s\u1ed1 cu\u1ed1i l\xe0 789 th\xec Ti\u1ec1n th\u1eafng l\xe0: 1k x {{ODDS}} x N"
        }, {
          name: "Nam_DeDau",
          guide: "\u0110\xe1nh gi\u1ea3i 8. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5: \u0111\xe1nh 1k cho s\u1ed1 79. T\u1ed5ng thanh to\xe1n: 1k. N\u1ebfu gi\u1ea3i 8 l\xe0 79 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k"
        }, {
          name: "Nam_DeDacBiet",
          guide: "\u0110\xe1nh 2 ch\u1eef s\u1ed1 cu\u1ed1i trong gi\u1ea3i \u0110B. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5: \u0111\xe1nh 1k cho s\u1ed1 79. T\u1ed5ng thanh to\xe1n: 1k. N\u1ebfu gi\u1ea3i \u0110B l\xe0 xxx79 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k"
        }, {
          name: "Nam_DeDauDuoi",
          guide: "\u0110\xe1nh 2 ch\u1eef s\u1ed1 cu\u1ed1i trong gi\u1ea3i \u0110B v\xe0 Gi\u1ea3i 8. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5: \u0111\xe1nh 1k cho s\u1ed1 79. T\u1ed5ng thanh to\xe1n: 2k. N\u1ebfu gi\u1ea3i \u0110B ho\u1eb7c gi\u1ea3i 8 c\xf3 2 ch\u1eef s\u1ed1 cu\u1ed1i l\xe0 79 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k"
        }, {
          name: "Nam_LoDa2",
          guide: '\u0110\xe1 2 c\u1ee7a 2 ch\u1eef s\u1ed1 cu\u1ed1i trong l\xf4 18 gi\u1ea3i. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5 : \u0111\xe1nh 1k cho \u0111\xe1 11+13. T\u1ed5ng thanh to\xe1n: 1k. N\u1ebfu trong l\xf4 c\xf3 "1 s\u1ed1 m\xe0 2 ch\u1eef s\u1ed1 cu\u1ed1i l\xe0 11 v\xe0 1 s\u1ed1 m\xe0 2 ch\u1eef s\u1ed1 cu\u1ed1i l\xe0 13" th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k'
        }, {
          name: "Nam_LoDa3",
          guide: "\u0110\xe1 3 c\u1ee7a 2 ch\u1eef s\u1ed1 cu\u1ed1i trong l\xf4 18 gi\u1ea3i. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5 : \u0111\xe1nh 1k cho \u0111\xe1 11+13+15, T\u1ed5ng thanh to\xe1n: 1k. N\u1ebfu trong l\xf4 c\xf3 2 ch\u1eef s\u1ed1 cu\u1ed1i l\xe0 11,13,15 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k"
        }, {
          name: "Nam_LoDa4",
          guide: "\u0110\xe1 4 c\u1ee7a 2 ch\u1eef s\u1ed1 cu\u1ed1i trong l\xf4 18 gi\u1ea3i. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5 : \u0111\xe1nh 1k cho \u0111\xe1 11+13+15+20, T\u1ed5ng thanh to\xe1n: 1k. N\u1ebfu trong l\xf4 c\xf3 2 ch\u1eef s\u1ed1 cu\u1ed1i l\xe0 11,13,15,20 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k"
        }, {
          name: "Nam_DauDuoiDau",
          guide: "\u0110\xe1nh 1 ch\u1eef s\u1ed1 h\xe0ng ch\u1ee5c c\u1ee7a gi\u1ea3i \u0110B. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5: \u0111\xe1nh 1k cho s\u1ed1 6. T\u1ed5ng thanh to\xe1n: 1k. N\u1ebfu gi\u1ea3i \u0110B l\xe0 xxxx6x th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k"
        }, {
          name: "Nam_DauDuoiDuoi",
          guide: "\u0110\xe1nh 1 ch\u1eef s\u1ed1 cu\u1ed1i c\u1ee7a gi\u1ea3i \u0110B. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5: \u0111\xe1nh 1k cho s\u1ed1 9. T\u1ed5ng thanh to\xe1n: 1k. N\u1ebfu gi\u1ea3i \u0110B l\xe0 xxxxx9 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k"
        }, {
          name: "Nam_XiuChuDau",
          guide: "\u0110\xe1nh gi\u1ea3i 7. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5: \u0111\xe1nh 1k cho s\u1ed1 879, T\u1ed5ng thanh to\xe1n: 1k. N\u1ebfu gi\u1ea3i 7 l\xe0 879 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k"
        }, {
          name: "Nam_XiuChuDuoi",
          guide: "\u0110\xe1nh 3 ch\u1eef s\u1ed1 cu\u1ed1i c\u1ee7a gi\u1ea3i \u0110B. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5: \u0111\xe1nh 1k cho s\u1ed1 879, T\u1ed5ng thanh to\xe1n: 1k. N\u1ebfu gi\u1ea3i \u0110B l\xe0 xx879 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k"
        }, {
          name: "Nam_XiuChuDauDuoi",
          guide: "\u0110\xe1nh 3 ch\u1eef s\u1ed1 cu\u1ed1i c\u1ee7a gi\u1ea3i \u0110B v\xe0 gi\u1ea3i 7. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5: \u0111\xe1nh 1k cho s\u1ed1 879, T\u1ed5ng thanh to\xe1n: 2k. N\u1ebfu gi\u1ea3i \u0110B ho\u1eb7c gi\u1ea3i 7 c\xf3 3 ch\u1eef s\u1ed1 cu\u1ed1i l\xe0 879 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k"
        }, {
          name: "Nam_LoTruot4",
          guide: "Tr\u01b0\u1ee3t Xi\xean 4 c\u1ee7a 2 ch\u1eef s\u1ed1 cu\u1ed1i trong 18 gi\u1ea3i. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5: \u0111\xe1nh 1k cho tr\u01b0\u1ee3t xi\xean 01+02+03+04, T\u1ed5ng thanh to\xe1n: 1k. N\u1ebfu trong l\xf4 kh\xf4ng c\xf3 2 ch\u1eef s\u1ed1 cu\u1ed1i l\xe0 01,02,03,04 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k"
        }, {
          name: "Nam_LoTruot8",
          guide: "Tr\u01b0\u1ee3t Xi\xean 8 c\u1ee7a 2 ch\u1eef s\u1ed1 cu\u1ed1i trong 18 gi\u1ea3i. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5: \u0111\xe1nh 1k cho tr\u01b0\u1ee3t xi\xean 01+02+03+04+05+06+07+08, T\u1ed5ng thanh to\xe1n: 1k. N\u1ebfu trong l\xf4 kh\xf4ng c\xf3 2 ch\u1eef s\u1ed1 cu\u1ed1i l\xe0 01,02,03,04,05,06,07,08 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k"
        }, {
          name: "Nam_LoTruot10",
          guide: "Tr\u01b0\u1ee3t Xi\xean 10 c\u1ee7a 2 ch\u1eef s\u1ed1 cu\u1ed1i trong 18 gi\u1ea3i. Th\u1eafng g\u1ea5p {{ODDS}} l\u1ea7n. V\xed d\u1ee5: \u0111\xe1nh 1k cho tr\u01b0\u1ee3t xi\xean 01+02+03+04+05+06+07+08+09+10, T\u1ed5ng thanh to\xe1n: 1k. N\u1ebfu trong l\xf4 kh\xf4ng c\xf3 2 ch\u1eef s\u1ed1 cu\u1ed1i l\xe0 01,02,03,04,05,06,07,08,09,10 th\xec Ti\u1ec1n th\u1eafng: 1k x {{ODDS}} = {{ODDS}}k"
        } ];
      }
      showGuide(gameMode) {
        let guide = this.guides.find(guide => guide.name === gameMode.name);
        guide && (this.lbGuide.string = guide.guide.replace(/{{ODDS}}/g, gameMode.ratio + ""));
        this.show();
      }
    };
    __decorate([ property(cc.Label) ], LoDePopupGuide.prototype, "lbGuide", void 0);
    LoDePopupGuide = __decorate([ ccclass ], LoDePopupGuide);
    exports.default = LoDePopupGuide;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/Dialog": void 0
  } ],
  "Lode.PopupHistory": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c50f4W02INK7ZgKI6S/rcbH", "Lode.PopupHistory");
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
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    const Dialog_1 = require("../../Main/Game/src/common/Dialog");
    const Http_1 = require("../../Main/Game/src/common/Http");
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let LoDePopupHistory = class LoDePopupHistory extends Dialog_1.default {
      constructor() {
        super(...arguments);
        this.scrollHistory = null;
        this.historyItemTemplate = null;
        this.lbPage = null;
        this.currentPage = 0;
        this.pageSize = 10;
        this.gameModes = [];
        this.allCities = [];
      }
      showHistory(gameModes, allCities) {
        this.gameModes = gameModes;
        this.allCities = allCities;
        this.currentPage = 0;
        this.show();
        this.loadData(this.currentPage);
      }
      loadData(page) {
        App_1.default.instance.showLoading(true);
        Http_1.default.get(Configs_1.default.App.API_LODE + "getHistory", {
          page: page,
          size: this.pageSize
        }, (err, res) => {
          App_1.default.instance.showLoading(false);
          if (err) return;
          cc.log("getHistory", JSON.stringify(res));
          if (!res["success"]) {
            App_1.default.instance.alertDialog.showMsg(res["desc"]);
            return;
          }
          let historys = res["lotteryResults"];
          if (0 === historys.length) return;
          this.currentPage = page;
          this.lbPage.string = this.currentPage + 1 + "/" + res["totalPages"];
          this.scrollHistory.content.children.forEach(child => child.active = false);
          for (let i = 0; i < historys.length; i++) {
            const history = historys[i];
            let historyItem = this.scrollHistory.content.children[i];
            if (!historyItem) {
              historyItem = cc.instantiate(this.historyItemTemplate);
              historyItem.parent = this.scrollHistory.content;
            }
            historyItem.active = true;
            let lbs = historyItem.getComponentsInChildren(cc.Label);
            lbs[0].string = history["date"];
            let gameMode = this.gameModes.find(mode => mode.name == history["gameType"]);
            lbs[1].string = (gameMode ? gameMode.displayName : history["gameType"]) + "(" + this.allCities.find(city => city.id == history["cityId"]).name + ")";
            lbs[2].string = history["betNumbers"].length > 24 ? history["betNumbers"].substr(0, 21) + "..." : history["betNumbers"];
            lbs[3].string = history["betMoney"] ? Utils_1.default.formatMoneyChip(history["betMoney"]) + "\n" + Utils_1.default.formatMoneyChip(Math.round(history["betMoney"] / history["betNumbers"].split(",").length)) + "/con" : history["betMoney"];
            lbs[4].string = history["prize"] ? Utils_1.default.formatMoneyChip(history["prize"]) : "";
            lbs[5].string = history["isRewarded"] ? history["prize"] > 0 ? "Tr\xfang" : "Tr\u01b0\u1ee3t" : "Ch\u1edd k\u1ebft qu\u1ea3";
          }
        });
      }
      actionPrePage() {
        if (0 === this.currentPage) return;
        this.loadData(this.currentPage - 1);
      }
      actionNextPage() {
        this.loadData(this.currentPage + 1);
      }
    };
    __decorate([ property(cc.ScrollView) ], LoDePopupHistory.prototype, "scrollHistory", void 0);
    __decorate([ property(cc.Node) ], LoDePopupHistory.prototype, "historyItemTemplate", void 0);
    __decorate([ property(cc.Label) ], LoDePopupHistory.prototype, "lbPage", void 0);
    LoDePopupHistory = __decorate([ ccclass ], LoDePopupHistory);
    exports.default = LoDePopupHistory;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/App": void 0,
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/common/Dialog": void 0,
    "../../Main/Game/src/common/Http": void 0,
    "../../Main/Game/src/common/Utils": void 0
  } ],
  "Lode.PopupHonors": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ab3899KzkhMHZ+pVOUSqqPg", "Lode.PopupHonors");
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
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    const Dialog_1 = require("../../Main/Game/src/common/Dialog");
    const Http_1 = require("../../Main/Game/src/common/Http");
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let LoDePopupHonors = class LoDePopupHonors extends Dialog_1.default {
      constructor() {
        super(...arguments);
        this.scrollHonors = null;
        this.honorsItemTemplate = null;
        this.atlasVip = null;
        this.sprTop = [];
      }
      show() {
        super.show();
        this.loadData();
      }
      loadData() {
        App_1.default.instance.showLoading(true);
        Http_1.default.get(Configs_1.default.App.API_LODE + "getTopWin", {
          page: 0,
          size: 10
        }, (err, res) => {
          var _a;
          App_1.default.instance.showLoading(false);
          if (err) return;
          cc.log(res);
          if (!res["success"]) {
            App_1.default.instance.alertDialog.showMsg(res["desc"]);
            return;
          }
          let honors = res["data"];
          this.scrollHonors.content.children.forEach(child => child.active = false);
          for (let i = 0; i < honors.length; i++) {
            const honor = honors[i];
            let honorItem = this.scrollHonors.content.children[i];
            if (!honorItem) {
              honorItem = cc.instantiate(this.honorsItemTemplate);
              honorItem.parent = this.scrollHonors.content;
            }
            honorItem.getChildByName("Bg").active = i % 2 === 0;
            honorItem.getChildByName("IconRank").getComponent(cc.Sprite).spriteFrame = this.sprTop[i];
            let nickName = honorItem.getChildByName("Nickname");
            let vip = Number(null === (_a = honor["vipRank"]) || void 0 === _a ? void 0 : _a.replace(/^\D+/g, ""));
            nickName.getComponentInChildren(cc.Sprite).spriteFrame = this.atlasVip.getSpriteFrame("VIP_" + vip);
            nickName.getComponentInChildren(cc.Label).node.color = cc.Color.BLACK.fromHEX(Utils_1.default.getColorVip("VIP_" + vip));
            nickName.getComponentInChildren(cc.Label).string = honor["nickName"];
            honorItem.getChildByName("LbWin").getComponent(cc.Label).string = Utils_1.default.formatMoney(honor["prize"]);
            honorItem.active = true;
            honorItem.parent = this.scrollHonors.content;
            honorItem.position = cc.v3(cc.winSize.width, 400);
            let speed = .7;
            honorItem.runAction(cc.sequence(cc.delayTime(.15 * i * speed), cc.moveTo(.15 * speed, cc.v2(0, 400)), cc.delayTime(.05), cc.moveTo(.2 * speed * (1 === i ? .8 : 1 - Math.pow(2, -10 * i)), cc.v2(0, 380 - 85 * i)).easing(cc.easeCircleActionOut())));
          }
        });
      }
    };
    __decorate([ property(cc.ScrollView) ], LoDePopupHonors.prototype, "scrollHonors", void 0);
    __decorate([ property(cc.Node) ], LoDePopupHonors.prototype, "honorsItemTemplate", void 0);
    __decorate([ property(cc.SpriteAtlas) ], LoDePopupHonors.prototype, "atlasVip", void 0);
    __decorate([ property([ cc.SpriteFrame ]) ], LoDePopupHonors.prototype, "sprTop", void 0);
    LoDePopupHonors = __decorate([ ccclass ], LoDePopupHonors);
    exports.default = LoDePopupHonors;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/App": void 0,
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/common/Dialog": void 0,
    "../../Main/Game/src/common/Http": void 0,
    "../../Main/Game/src/common/Utils": void 0
  } ],
  "LodeSieuToc.History": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "92f47GFZHFLBIHM0z6Lp5jW", "LodeSieuToc.History");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var LoDeSieuTocHistory_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const App_1 = require("../../Main/Game/src/common/App");
    const BroadcastReceiver_1 = require("../../Main/Game/src/common/BroadcastReceiver");
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    const Http_1 = require("../../Main/Game/src/common/Http");
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const LoDeSieuToc_Controller_1 = require("./LoDeSieuToc.Controller");
    const LoDeSieuToc_Play_1 = require("./LoDeSieuToc.Play");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let LoDeSieuTocHistory = LoDeSieuTocHistory_1 = class LoDeSieuTocHistory extends cc.Component {
      constructor() {
        super(...arguments);
        this.historyContent = null;
        this.historyItemTemplate = null;
        this.page = null;
        this.lbPage = null;
        this.currentPage = 0;
        this.pageSize = 10;
        this.scheduleLoadHistory = null;
        this.historyNoResults = [];
      }
      static getInstance() {
        return this.instance;
      }
      static destroyInstance() {
        return this.instance;
      }
      onLoad() {
        LoDeSieuTocHistory_1.instance = this;
      }
      show() {
        if (0 != this.currentPage) return;
        this.loadData(this.currentPage);
      }
      reloadCurrentPage() {
        this.historyNoResults.length > 0 && this.loadData(this.currentPage);
      }
      loadData(page) {
        Http_1.default.get(Configs_1.default.App.API_LODE_SIEU_TOC + "getHistory", {
          page: page,
          size: this.pageSize
        }, (err, res) => {
          if (err) return;
          cc.log(res);
          if (!res["success"]) {
            App_1.default.instance.alertDialog.showMsg(res["desc"]);
            return;
          }
          let historys = res["lotteryResults"];
          this.node.active = !(0 === historys.length && 0 === page);
          this.page.active = !(historys.length < this.pageSize && 0 === page);
          if (0 === historys.length) return;
          this.currentPage = page;
          this.lbPage.string = this.currentPage + 1 + "/" + res["totalPages"];
          this.historyContent.children.forEach(child => child.active = false);
          for (let i = 0; i < historys.length; i++) {
            const history = historys[i];
            let historyItem = this.historyContent.children[i];
            if (!historyItem) {
              historyItem = cc.instantiate(this.historyItemTemplate);
              historyItem.parent = this.historyContent;
            }
            historyItem.active = true;
            let lbs = historyItem.getComponentsInChildren(cc.Label);
            lbs[0].string = history["matchDateTimeString"];
            let gameMode = LoDeSieuToc_Controller_1.default.getInstance().gameModes.find(mode => mode.name == history["gameType"]);
            lbs[1].string = gameMode ? gameMode.displayName : history["gameType"];
            lbs[2].string = LoDeSieuToc_Controller_1.default.getInstance().allCities.find(city => city.id == history["cityId"]).name;
            lbs[3].string = LoDeSieuToc_Controller_1.default.getInstance().sieuTocGameTypes.find(gameType => gameType.name === history["quickGameType"]).getDisplayName();
            lbs[4].string = history["betNumbers"].length > 24 ? history["betNumbers"].substr(0, 21) + "..." : history["betNumbers"];
            lbs[5].string = history["betMoney"] ? Utils_1.default.formatMoneyChip(history["betMoney"]) : history["betMoney"];
            lbs[6].string = history["betMoney"] ? Utils_1.default.formatMoneyChip(Math.round(history["betMoney"] / history["betNumbers"].split(",").length)) + "/Con" : "";
            lbs[7].string = history["prize"] ? Utils_1.default.formatMoneyChip(history["prize"]) : "0";
            lbs[8].string = history["isRewarded"] ? history["prize"] > 0 ? "Tr\xfang" : "Tr\u01b0\u1ee3t" : "Ch\u1edd k\u1ebft qu\u1ea3";
            lbs[8].node.color = history["isRewarded"] ? history["prize"] > 0 ? cc.Color.GREEN : cc.Color.RED : cc.Color.WHITE;
            let btnReBet = historyItem.getChildByName("btnReBet");
            btnReBet.off("click");
            btnReBet.on("click", () => {
              let params = {
                gameType: history.gameType,
                numbersInString: history.betNumbers.split(","),
                betSize: history.betCount,
                totalMoneyBet: history.betMoney,
                cityId: history.cityId,
                quickLotteryType: history.quickGameType
              };
              LoDeSieuToc_Play_1.default.getInstance().setReBet(params);
            });
            lbs[0].node.off("click");
            lbs[0].node.on("click", () => {
              Utils_1.default.copyToClipboard(history["matchDateTimeString"]);
              cc.tween(historyItem.getChildByName("toast")).to(.2, {
                scale: 1
              }, {
                easing: "quartInOut"
              }).delay(2).to(.2, {
                scale: 0
              }, {
                easing: "quartInOut"
              }).start();
            });
            historyItem.off("click");
            historyItem.on("click", () => {
              LoDeSieuToc_Controller_1.default.getInstance().popupResult.showResult(history["cityId"], history["quickGameType"], history["matchDateTimeString"]);
            });
          }
          this.unschedule(this.scheduleLoadHistory);
          let historyChecks = [];
          this.historyNoResults.forEach(history => {
            let his = historys.find(h => h.id == history.id);
            his && historyChecks.push(his);
          });
          LoDeSieuToc_Controller_1.default.getInstance().popupNotiResult.showResult(historyChecks.filter(history => history.prize > 0));
          BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN);
          this.historyNoResults = historys.filter(history => !history["isRewarded"]);
        });
      }
      actionPrePage() {
        if (0 === this.currentPage) return;
        this.loadData(this.currentPage - 1);
      }
      actionNextPage() {
        this.loadData(this.currentPage + 1);
      }
    };
    LoDeSieuTocHistory.instance = null;
    __decorate([ property(cc.Node) ], LoDeSieuTocHistory.prototype, "historyContent", void 0);
    __decorate([ property(cc.Node) ], LoDeSieuTocHistory.prototype, "historyItemTemplate", void 0);
    __decorate([ property(cc.Node) ], LoDeSieuTocHistory.prototype, "page", void 0);
    __decorate([ property(cc.Label) ], LoDeSieuTocHistory.prototype, "lbPage", void 0);
    LoDeSieuTocHistory = LoDeSieuTocHistory_1 = __decorate([ ccclass ], LoDeSieuTocHistory);
    exports.default = LoDeSieuTocHistory;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/App": void 0,
    "../../Main/Game/src/common/BroadcastReceiver": void 0,
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/common/Http": void 0,
    "../../Main/Game/src/common/Utils": void 0,
    "./LoDeSieuToc.Controller": "LoDeSieuToc.Controller",
    "./LoDeSieuToc.Play": "LoDeSieuToc.Play"
  } ]
}, {}, [ "LoDe.CalendarBet", "LoDe.CalendarResult", "LoDe.Cmd", "LoDe.Controller", "LoDe.PopupSelectNumber", "LoDeSieuToc.Controller", "LoDeSieuToc.Dialog", "LoDeSieuToc.GlobalBet", "LoDeSieuToc.Play", "LoDeSieuToc.PopupGuide", "LoDeSieuToc.PopupHonors", "LoDeSieuToc.PopupNotiResult", "LoDeSieuToc.PopupResult", "LoDeSieuToc.PopupSelectNumber", "Lode.LodeData", "Lode.PopupGuide", "Lode.PopupHistory", "Lode.PopupHonors", "LodeSieuToc.History" ]);