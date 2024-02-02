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
  "Lixi.cmd": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "84f2ctjBJNIhoapIfDdbVV3", "Lixi.cmd");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.cmd = void 0;
    const Constants_1 = require("../../Main/Game/src/common/Constants");
    const Network_InPacket_1 = require("../../Main/Game/src/networks/Network.InPacket");
    const Network_OutPacket_1 = require("../../Main/Game/src/networks/Network.OutPacket");
    const {ccclass: ccclass, property: property} = cc._decorator;
    var cmd;
    (function(cmd) {
      class Code {}
      Code.SCRIBE = 2e3;
      Code.SUBCRIBE_RESPONSE = 2002;
      Code.SPIN_RESULT = 2003;
      Code.LOG_CHAT = 18003;
      Code.SEND_CHAT = 18e3;
      Code.SCRIBE_CHAT = 18001;
      Code.UNSCRIBE_CHAT = 18002;
      cmd.Code = Code;
      class SendScribe extends Network_OutPacket_1.default {
        constructor() {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.SCRIBE);
          this.packHeader();
          this.updateSize();
        }
      }
      cmd.SendScribe = SendScribe;
      class SendScribeChat extends Network_OutPacket_1.default {
        constructor() {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.SCRIBE_CHAT);
          this.packHeader();
          this.putString(Constants_1.ChatChannel.LI_XI);
          cc.log(Constants_1.ChatChannel.LI_XI);
          this.updateSize();
        }
      }
      cmd.SendScribeChat = SendScribeChat;
      class SendUnScribeChat extends Network_OutPacket_1.default {
        constructor() {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.UNSCRIBE_CHAT);
          this.packHeader();
          this.putString(Constants_1.ChatChannel.LI_XI);
          this.updateSize();
        }
      }
      cmd.SendUnScribeChat = SendUnScribeChat;
      class SendChat extends Network_OutPacket_1.default {
        constructor(message) {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.SEND_CHAT);
          this.packHeader();
          this.putString(message);
          this.putString(Constants_1.ChatChannel.LI_XI);
          this.updateSize();
        }
      }
      cmd.SendChat = SendChat;
      class ReceiveScribe extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.spinResult = "";
          this.currentRound = 0;
          this.spinResult = this.getString();
          this.currentRound = this.getByte();
        }
      }
      cmd.ReceiveScribe = ReceiveScribe;
      class ReceiveLogChat extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.message = "";
          this.minVipPoint = 0;
          this.timeBan = 0;
          this.userType = 0;
          this.chatChannel = "";
          this.message = this.getString();
          this.minVipPoint = this.getByte();
          this.timeBan = this.getLong();
          this.userType = this.getByte();
          this.chatChannel = this.getString();
        }
      }
      cmd.ReceiveLogChat = ReceiveLogChat;
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
            actions.hasOwnProperty("suggestionActions") && Array.isArray(actions["suggestionActions"]) && (this.suggestionActions = Constants_1.UserActions.toEnums(actions["suggestionActions"]));
          }
          this.chatChannel = this.getString();
        }
      }
      cmd.ReceiveSendChat = ReceiveSendChat;
    })(cmd = exports.cmd || (exports.cmd = {}));
    exports.default = cmd;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/Constants": void 0,
    "../../Main/Game/src/networks/Network.InPacket": void 0,
    "../../Main/Game/src/networks/Network.OutPacket": void 0
  } ],
  "Lobby.ButtonLiXi": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "445ae3rseZNiLQo/NbtUo/e", "Lobby.ButtonLiXi");
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
    const {ccclass: ccclass, property: property} = cc._decorator;
    let ButtonLiXi = class ButtonLiXi extends cc.Component {
      constructor() {
        super(...arguments);
        this.labelTime = null;
        this.button = null;
        this.buttonClicked = true;
        this.buttonMoved = cc.Vec2.ZERO;
      }
      start() {
        this.labelTime.string = "00";
        this.button.on(cc.Node.EventType.TOUCH_START, event => {
          this.buttonClicked = true;
          this.buttonMoved = cc.Vec2.ZERO;
        }, this);
        this.button.on(cc.Node.EventType.TOUCH_MOVE, event => {
          this.buttonMoved = this.buttonMoved.add(event.getDelta());
          if (this.buttonClicked) {
            if (Math.abs(this.buttonMoved.x) > 30 || Math.abs(this.buttonMoved.y) > 30) {
              let pos = this.button.position;
              pos.x += this.buttonMoved.x;
              pos.y += this.buttonMoved.y;
              this.button.position = pos;
              this.buttonClicked = false;
            }
          } else {
            let pos = this.button.position;
            pos.x += event.getDeltaX();
            pos.y += event.getDeltaY();
            this.button.position = pos;
          }
        }, this);
        this.button.on(cc.Node.EventType.TOUCH_END, event => {
          this.buttonClicked && this.actButtonLiXi();
        }, this);
        this.schedule(this.getLiXiConfig, 5);
      }
      show() {
        this.button.active = true;
        this.labelTime.string = "00";
      }
      hidden() {
        this.button.active = false;
      }
      actButtonLiXi() {}
      getLiXiConfig() {
        Http_1.default.get(Configs_1.default.App.API_LIXI + "config", {}, (err, res) => {
          if (null != err) return;
          cc.log(res);
        });
      }
    };
    __decorate([ property(cc.Label) ], ButtonLiXi.prototype, "labelTime", void 0);
    __decorate([ property(cc.Node) ], ButtonLiXi.prototype, "button", void 0);
    ButtonLiXi = __decorate([ ccclass ], ButtonLiXi);
    exports.default = ButtonLiXi;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/common/Http": void 0
  } ],
  "Lobby.PopupLiXi": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "44093nYxYJIhY/oeVedasnS", "Lobby.PopupLiXi");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var PopupLiXi_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const App_1 = require("../../Main/Game/src/common/App");
    const BroadcastReceiver_1 = require("../../Main/Game/src/common/BroadcastReceiver");
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    const Constants_1 = require("../../Main/Game/src/common/Constants");
    const Http_1 = require("../../Main/Game/src/common/Http");
    const Tween_1 = require("../../Main/Game/src/common/Tween");
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const LixiNetworkClient_1 = require("../../Main/Game/src/networks/LixiNetworkClient");
    const Network_InPacket_1 = require("../../Main/Game/src/networks/Network.InPacket");
    const Lobby_PopupShop_1 = require("../../Main/Lobby/src/Lobby.PopupShop");
    const Lixi_cmd_1 = require("./Lixi.cmd");
    const PanelChat_1 = require("./PanelChat");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let PopupLiXi = PopupLiXi_1 = class PopupLiXi extends cc.Component {
      constructor() {
        super(...arguments);
        this.PanelChat = null;
        this.lb_chip = null;
        this.userInList = [];
        this.listTicket = [];
        this.btn_get_ticket = null;
        this.results = [];
        this.itemResult = null;
        this.scrollResult = null;
        this.listResult = [];
        this.itemTicket = null;
        this.scrollTicket = null;
        this.ticket = null;
        this.result = null;
        this.tickets = null;
        this.isPlay = false;
        this.isChange = false;
        this.animWin = null;
        this.lbWin = null;
        this.btn_receive = null;
        this.time = 0;
      }
      sendAPI(callback = (data => {}), type = "", data = {}) {
        let result = (err, res) => {
          if (null != err) return cc.log(type + " err ", err);
          cc.log(type, res);
          callback && "function" == typeof callback && callback(res);
        };
        cc.log(type);
        switch (type) {
         case "config":
          Http_1.default.get(Configs_1.default.App.API_LIXI + type, data, result);
          break;

         case "register":
         case "tanloc":
          Http_1.default.post(Configs_1.default.App.API_LIXI + type, data, result);
          break;

         case "userinfo":
         case "topshare":
         case "toprewarded":
         case "bingo":
          Http_1.default.get(Configs_1.default.App.API_LIXI + type, data, result);
          break;

         default:
          cc.log("call error ", type);
        }
      }
      subscribe() {
        LixiNetworkClient_1.default.getInstance().send(new Lixi_cmd_1.default.SendScribe());
      }
      start() {
        this.subscribe();
        this.itemResult.active = false;
        this.itemTicket.active = false;
        this.btn_receive.node.active = false;
        let list = [];
        for (let i = 0; i < 25; i++) list.push(-1);
        list.forEach((num, idx) => {
          this.setCellInTicket(idx, 0, num);
        });
        BroadcastReceiver_1.default.register(BroadcastReceiver_1.default.USER_LOGOUT, () => {
          if (!this.node.active) return;
        }, this);
        BroadcastReceiver_1.default.register(BroadcastReceiver_1.default.USER_DISCONNECTED, () => {
          if (!this.node.active) return;
        }, this);
        this.lb_chip.string = Utils_1.default.formatNumber(Configs_1.default.Login.Coin);
        BroadcastReceiver_1.default.register(BroadcastReceiver_1.default.USER_UPDATE_COIN, () => {
          Tween_1.default.numberTo(this.lb_chip, Configs_1.default.Login.Coin, .3);
        }, this);
        LixiNetworkClient_1.default.getInstance().addOnClose(() => {}, this);
        this.clickChat();
        cc.log("addListener");
        LixiNetworkClient_1.default.getInstance().addListener(data => {
          var _a;
          if (!this.node.active) return;
          let inpacket = new Network_InPacket_1.default(data);
          switch (inpacket.getCmdId()) {
           case Lixi_cmd_1.default.Code.SUBCRIBE_RESPONSE:
            {
              let res = new Lixi_cmd_1.default.ReceiveScribe(data);
              cc.log(res);
            }
            break;

           case Lixi_cmd_1.default.Code.SPIN_RESULT:
            {
              let res = new Lixi_cmd_1.default.ReceiveScribe(data);
              this.updateSpinRedult(res);
            }
            break;

           case Lixi_cmd_1.default.Code.LOG_CHAT:
            try {
              let res = new Lixi_cmd_1.default.ReceiveLogChat(data);
              cc.log(res);
              if (res.chatChannel !== Constants_1.ChatChannel.TAI_XIU_MD5) break;
              var msgs = JSON.parse(res.message);
              for (var i = 0; i < msgs.length; i++) this.PanelChat.addMessage(msgs[i]["u"], msgs[i]["m"], msgs[i]["vipId"]);
            } catch (e) {
              cc.log(e);
            }
            null === (_a = this.PanelChat) || void 0 === _a ? void 0 : _a.scrollToBottom();
            break;

           case Lixi_cmd_1.default.Code.SEND_CHAT:
            {
              let res = new Lixi_cmd_1.default.ReceiveSendChat(data);
              cc.log(res);
              if (res.chatChannel !== Constants_1.ChatChannel.TAI_XIU_MD5) break;
              switch (res.error) {
               case 0:
                this.PanelChat.addMessage(res.nickname, res.message, res.vip);
                break;

               default:
                App_1.default.instance.actiontDialog.showMsgWithActions(res.desc, res.suggestionActions);
              }
              break;
            }
          }
        }, this);
        this.sendAPI(data => {
          PopupLiXi_1.fund = data.fund;
          PopupLiXi_1.numberUserRegister = data.numberUserRegister;
          PopupLiXi_1.numberUserShare = data.numberUserShare;
        }, "config");
        this.sendAPI(data => {
          this.listTicket = data.eventTanLocUserTicketList;
          this.listTicket.forEach(ticket => {
            this.addTicket(ticket.id);
          });
          this.btn_get_ticket.active = 0 == data.eventTanLocUserTicketList.length && data.ticket > 0;
        }, "userinfo");
      }
      getTicket() {
        this.sendAPI(data => {
          this.listTicket = data.eventTanLocUserTicketList;
          this.listTicket.forEach(ticket => {
            this.addTicket(ticket.id);
          });
          this.btn_get_ticket.active = false;
        }, "register");
      }
      updateSpinRedult(res) {
        if (this.results.length == JSON.parse(res.spinResult)[res.currentRound].length) return;
        this.results = JSON.parse(res.spinResult)[res.currentRound];
        cc.log(this.results);
        this.scrollResult.content.children.forEach(chil => {
          chil.active = false;
        });
        this.results.forEach((vl, ind) => {
          let item = this.scrollResult.content.children[ind];
          if (item) {
            item.active = true;
            item.getChildByName("number-ball").getComponent(cc.Label).string = vl < 10 ? "0" + vl : "" + vl;
            item.getChildByName("type-ball").getComponent(cc.Label).string = vl < 20 ? "B" : vl < 40 ? "I" : vl < 60 ? "N" : vl < 80 ? "G" : "O";
          } else this.addResult(vl);
        });
      }
      backToLobby() {
        cc.audioEngine.stopAll();
        this.PanelChat.show(false);
        cc.director.loadScene("Lobby", () => {
          cc.game.removePersistRootNode(this.node);
          let bundleLixi = cc.assetManager.getBundle(Configs_1.default.App.BUNDLE_NAME.LIXI);
          bundleLixi.releaseAll();
          cc.assetManager.removeBundle(bundleLixi);
        });
      }
      addUserToList(data) {}
      resetUserInList() {}
      openLiXi() {}
      addResult(num = null) {
        "number" != typeof num && (num = Math.floor(100 * Math.random()));
        this.listResult.push(num);
        let new_result = cc.instantiate(this.itemResult);
        new_result.active = true;
        new_result.getChildByName("number-ball").getComponent(cc.Label).string = num < 10 ? "0" + num : "" + num;
        new_result.getChildByName("type-ball").getComponent(cc.Label).string = num < 20 ? "B" : num < 40 ? "I" : num < 60 ? "N" : num < 80 ? "G" : "O";
        this.scrollResult.content.addChild(new_result);
        this.scrollResult.scrollToRight(.2);
        this.checkTicket();
      }
      checkTicket() {
        this.ticket.children.forEach(cell_win => {
          this.setCellInTicket(parseInt(cell_win.name), 0);
        });
        this.listResult.forEach(num => {
          let cell_win = this.ticket.children.find(chil => chil.getChildByName("number-cell") && chil.getChildByName("number-cell").getComponent(cc.Label).string == (num < 10 ? "0" + num : "" + num));
          if (!cell_win) return;
          this.setCellInTicket(parseInt(cell_win.name), 1);
        });
        let listItemWin = this.ticket.children.filter(chil => chil.getChildByName("number-cell") && (chil.getChildByName("win").active || chil.getChildByName("cell_win").active)).map(chi => parseInt(chi.name)).sort((a, b) => a - b);
        let list_check = [];
        for (let i = 0; i < 5; i++) {
          list_check = [];
          for (let j = 0; j < 5; j++) -1 != listItemWin.indexOf(5 * i + j) && list_check.push(5 * i + j);
          if (5 == list_check.length) return this.showLineWin(list_check);
          list_check = [];
          for (let j = 0; j < 5; j++) -1 != listItemWin.indexOf(i + 5 * j) && list_check.push(i + 5 * j);
          if (5 == list_check.length) return this.showLineWin(list_check);
        }
        list_check = [];
        for (let j = 0; j < 5; j++) -1 != listItemWin.indexOf(j + 5 * j) && list_check.push(j + 5 * j);
        if (5 == list_check.length) return this.showLineWin(list_check);
        list_check = [];
        for (let j = 0; j < 5; j++) -1 != listItemWin.indexOf(4 - j + 5 * j) && list_check.push(4 - j + 5 * j);
        if (5 == list_check.length) return this.showLineWin(list_check);
      }
      addTicket(num) {
        let new_Ticket = cc.instantiate(this.itemTicket);
        new_Ticket.active = true;
        new_Ticket.getChildByName("number").getComponent(cc.Label).string = num < 10 ? "0" + num : "" + num;
        new_Ticket.getComponent(cc.Toggle).checkEvents[0].customEventData = num + "";
        this.scrollTicket.content.addChild(new_Ticket);
        this.scrollTicket.scrollToRight(.2);
      }
      setCellInTicket(idx, status = 0, num = -1) {
        let cell = this.ticket.getChildByName("" + idx);
        if (!cell) return cc.log("get cell error " + idx);
        -1 != num && (cell.getChildByName("number-cell").getComponent(cc.Label).string = num < 0 ? "" : num < 10 ? "0" + num : "" + num);
        cell.getChildByName("win").active = status > 0;
        cell.getChildByName("cell_win").active = status > 1;
      }
      setTicket(evt, data) {
        let ticket = this.listTicket.find(ticket => ticket.id == data);
        if (ticket) {
          ticket.matrix.split(",").reverse().forEach((num, idx) => {
            this.setCellInTicket(idx, 0, num);
          });
          this.checkTicket();
        } else cc.log("show ticket error");
      }
      clickPlay() {
        if (this.isChange) return cc.log("dang change");
        this.isChange = true;
        this.isPlay = true;
        this.changeLayout();
      }
      clickChat() {
        if (this.isChange) return cc.log("dang change");
        this.isChange = true;
        this.isPlay = false;
        this.changeLayout(() => {
          cc.tween(this.PanelChat.node).to(.5, {
            y: this.isPlay ? -280 : 385,
            opacity: this.isPlay ? 0 : 255
          }, {
            easing: "quartInOut"
          }).call(() => {
            this.isChange = false;
          }).start();
        });
      }
      changeLayout(callback = (() => {})) {
        cc.tween(this.ticket).to(.5, {
          scale: this.isPlay ? 1 : .5,
          y: this.isPlay ? 35 : 365
        }, {
          easing: "quartInOut"
        }).call(() => {}).start();
        cc.tween(this.result).to(.5, {
          scale: this.isPlay ? 1 : .5,
          y: this.isPlay ? 490 : 460,
          height: this.isPlay ? 180 : 350
        }, {
          easing: "quartInOut"
        }).call(() => {}).start();
        cc.tween(this.tickets).to(.5, {
          scale: this.isPlay ? 1 : .5,
          y: this.isPlay ? -420 : 265,
          height: this.isPlay ? 150 : 350
        }, {
          easing: "quartInOut"
        }).call(() => {}).start();
        callback && callback();
        this.isPlay && cc.tween(this.PanelChat.node).to(.5, {
          y: -280,
          opacity: 0
        }, {
          easing: "quartInOut"
        }).call(() => {
          this.isChange = false;
        }).start();
        this.isPlay = !this.isPlay;
      }
      hideLineWin() {}
      showLineWin(line = [ -1, -1, -1, -1, -1 ]) {
        this.stopFake();
        line.forEach(num => {
          let cell_win = this.ticket.getChildByName(num + "");
          if (!cell_win) return;
          if (!cell_win) return cc.log("get cell error " + parseInt(cell_win.name));
          cc.log("get cell oki");
          cell_win.getChildByName("cell_win").active = true;
          let action = [];
          action.push(cc.callFunc(() => {
            cell_win.getChildByName("win").active = false;
          }));
          for (let index = 0; index < 5; index++) action.push(cc.sequence(cc.fadeIn(.2), cc.fadeOut(.2)));
          action.push(cc.callFunc(() => {
            cell_win.getChildByName("win").active = true;
            this.btn_receive.node.active = true;
          }));
          action.push(cc.delayTime(2));
          cc.tween(cell_win.getChildByName("cell_win")).repeatForever(cc.sequence(action)).start();
        });
      }
      showWin() {
        this.animWin.enabled = true;
        this.animWin.setAnimation(0, "animation", false);
        cc.tween(this.lbWin.node).set({
          opacity: 0
        }).delay(.1).to(.2, {
          opacity: 255
        }).delay(1.9).to(.2, {
          opacity: 0
        }).start();
      }
      lineTime() {
        cc.log("lineTime");
        App_1.default.instance.confirmDialog.show2("B\u1ea1n \u0111\xe3 n\u1ea1p 150k h\xf4m nay\n 140k \u0111\u1ea1t y\xeau c\u1ea7u \u0111\u1ec3 nh\u1eadn 7 v\xe9 ch\u01a1i BINGO\nB\u1ea1n c\xf3 th\u1ec3 n\u1ea1p th\xeam 10k \u0111\u1ec3 nh\u1eadn th\xeam 1 v\xe9 ch\u01a1i BINGO.", isConfirm => {
          isConfirm && Lobby_PopupShop_1.default.createAndShow(App_1.default.instance.popups);
        });
        this.schedule(this.runInTime, .01);
      }
      runInTime() {
        Math.random() > .1 && this.PanelChat.addMessage("test " + Math.floor(10 * Math.random()), new Date().toString(), Math.floor(10 * Math.random()));
        if (this.time % 10 == 0) {
          this.results[Math.floor(this.time / 10)] = this.results[Math.floor(this.time / 10)] || Math.floor(100 * Math.random());
          this.fakeCmd(Lixi_cmd_1.default.Code.SPIN_RESULT, {
            spinResult: JSON.stringify({
              0: this.results
            }),
            currentRound: 0
          });
        }
        this.time++;
      }
      stopFake() {
        this.unschedule(this.runInTime);
      }
      fakeCmd(cmdid, res) {
        switch (cmdid) {
         case Lixi_cmd_1.default.Code.SUBCRIBE_RESPONSE:
          cc.log(res);
          break;

         case Lixi_cmd_1.default.Code.SPIN_RESULT:
          this.updateSpinRedult(res);
        }
      }
    };
    PopupLiXi.fund = 0;
    PopupLiXi.numberUserRegister = 0;
    PopupLiXi.numberUserShare = 0;
    PopupLiXi.messResult = "";
    __decorate([ property(PanelChat_1.default) ], PopupLiXi.prototype, "PanelChat", void 0);
    __decorate([ property(cc.Label) ], PopupLiXi.prototype, "lb_chip", void 0);
    __decorate([ property(cc.Node) ], PopupLiXi.prototype, "btn_get_ticket", void 0);
    __decorate([ property(cc.Node) ], PopupLiXi.prototype, "itemResult", void 0);
    __decorate([ property(cc.ScrollView) ], PopupLiXi.prototype, "scrollResult", void 0);
    __decorate([ property(cc.Node) ], PopupLiXi.prototype, "itemTicket", void 0);
    __decorate([ property(cc.ScrollView) ], PopupLiXi.prototype, "scrollTicket", void 0);
    __decorate([ property(cc.Node) ], PopupLiXi.prototype, "ticket", void 0);
    __decorate([ property(cc.Node) ], PopupLiXi.prototype, "result", void 0);
    __decorate([ property(cc.Node) ], PopupLiXi.prototype, "tickets", void 0);
    __decorate([ property(sp.Skeleton) ], PopupLiXi.prototype, "animWin", void 0);
    __decorate([ property(cc.Label) ], PopupLiXi.prototype, "lbWin", void 0);
    __decorate([ property(cc.Button) ], PopupLiXi.prototype, "btn_receive", void 0);
    PopupLiXi = PopupLiXi_1 = __decorate([ ccclass ], PopupLiXi);
    exports.default = PopupLiXi;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/App": void 0,
    "../../Main/Game/src/common/BroadcastReceiver": void 0,
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/common/Constants": void 0,
    "../../Main/Game/src/common/Http": void 0,
    "../../Main/Game/src/common/Tween": void 0,
    "../../Main/Game/src/common/Utils": void 0,
    "../../Main/Game/src/networks/LixiNetworkClient": void 0,
    "../../Main/Game/src/networks/Network.InPacket": void 0,
    "../../Main/Lobby/src/Lobby.PopupShop": void 0,
    "./Lixi.cmd": "Lixi.cmd",
    "./PanelChat": "PanelChat"
  } ],
  PanelChat: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "400f2VnCsVPS6S2BtU6IdIO", "PanelChat");
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
    const Constants_1 = require("../../Main/Game/src/common/Constants");
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const MiniGameNetworkClient_1 = require("../../Main/Game/src/networks/MiniGameNetworkClient");
    const Network_InPacket_1 = require("../../Main/Game/src/networks/Network.InPacket");
    const Lixi_cmd_1 = require("./Lixi.cmd");
    const {ccclass: ccclass, property: property} = cc._decorator;
    var taixiumini;
    (function(taixiumini) {
      let PanelChat = class PanelChat extends cc.Component {
        constructor() {
          super(...arguments);
          this.itemChatTemplate = null;
          this.scrMessage = null;
          this.edbMessage = null;
          this.atlasVip = null;
          this.lblToast = null;
          this.isCanChat = true;
        }
        start() {
          BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.SET_SOUND, this.node);
          this.itemChatTemplate.active = false;
        }
        show(isShow) {
          this.node.active = isShow;
          if (isShow) {
            for (var i = 0; i < this.scrMessage.content.childrenCount; i++) {
              let node = this.scrMessage.content.children[i];
              node.active = false;
            }
            MiniGameNetworkClient_1.default.getInstance().send(new Lixi_cmd_1.default.SendScribeChat());
            MiniGameNetworkClient_1.default.getInstance().addListener(data => {
              if (!this.node.active) return;
              let inpacket = new Network_InPacket_1.default(data);
              switch (inpacket.getCmdId()) {
               case Lixi_cmd_1.default.Code.LOG_CHAT:
                try {
                  let res = new Lixi_cmd_1.default.ReceiveLogChat(data);
                  cc.log(res);
                  if (res.chatChannel !== Constants_1.ChatChannel.LI_XI) break;
                  var msgs = JSON.parse(res.message);
                  for (var i = 0; i < msgs.length; i++) this.addMessage(msgs[i]["u"], msgs[i]["m"], msgs[i]["vipId"]);
                } catch (e) {
                  cc.log(e);
                }
                null === this || void 0 === this ? void 0 : this.scrollToBottom();
                break;

               case Lixi_cmd_1.default.Code.SEND_CHAT:
                {
                  let res = new Lixi_cmd_1.default.ReceiveSendChat(data);
                  cc.log(res);
                  if (res.chatChannel !== Constants_1.ChatChannel.LI_XI) break;
                  switch (res.error) {
                   case 0:
                    this.addMessage(res.nickname, res.message, res.vip);
                    break;

                   default:
                    App_1.default.instance.actiontDialog.showMsgWithActions(res.desc, res.suggestionActions);
                  }
                  break;
                }
              }
            }, this);
          } else MiniGameNetworkClient_1.default.getInstance().send(new Lixi_cmd_1.default.SendUnScribeChat());
        }
        addMessage(nickname, message, vip) {
          let item = null;
          for (var i = 0; i < this.scrMessage.content.childrenCount; i++) {
            let node = this.scrMessage.content.children[i];
            if (!node.active) {
              item = node;
              break;
            }
          }
          null == item && (item = this.scrMessage.content.childrenCount >= 50 ? this.scrMessage.content.children[0] : cc.instantiate(this.itemChatTemplate));
          var zIndex = 0;
          for (var i = 0; i < this.scrMessage.content.childrenCount; i++) {
            let node = this.scrMessage.content.children[i];
            node != item && (node.zIndex = zIndex++);
          }
          item.parent = this.scrMessage.content;
          item.active = true;
          item.zIndex = zIndex++;
          let chatRichText = item.getComponentInChildren(cc.RichText);
          chatRichText.imageAtlas = this.atlasVip;
          let vipColor = Utils_1.default.getColorVip("VIP_" + vip);
          let content = "<color=" + vipColor + "><outline color=" + vipColor + "width=1>" + nickname + "</outline></color> <img src='Vip" + vip + "' offset=0,-7/><img src='VIP_" + vip + "' offset=0,-7/>:  " + message;
          chatRichText.string = content;
          this.scrollToBottom();
        }
        sendChat() {
          let msg = this.edbMessage.string.trim();
          if (0 == msg.length) return;
          this.edbMessage.string = "";
          this.submitChat(msg);
        }
        submitChat(message) {
          let _this = this;
          if (!_this.isCanChat) {
            this.showToast("B\u1ea1n thao t\xe1c qu\xe1 nhanh.");
            return;
          }
          _this.isCanChat = false;
          this.scheduleOnce(function() {
            _this.isCanChat = true;
          }, 1);
          var req = new Lixi_cmd_1.default.SendChat(unescape(encodeURIComponent(message)));
          MiniGameNetworkClient_1.default.getInstance().send(req);
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
        scrollToBottom() {
          this.scrMessage.scrollToBottom(.2);
        }
      };
      __decorate([ property(cc.Node) ], PanelChat.prototype, "itemChatTemplate", void 0);
      __decorate([ property(cc.ScrollView) ], PanelChat.prototype, "scrMessage", void 0);
      __decorate([ property(cc.EditBox) ], PanelChat.prototype, "edbMessage", void 0);
      __decorate([ property(cc.SpriteAtlas) ], PanelChat.prototype, "atlasVip", void 0);
      __decorate([ property(cc.Label) ], PanelChat.prototype, "lblToast", void 0);
      PanelChat = __decorate([ ccclass ], PanelChat);
      taixiumini.PanelChat = PanelChat;
    })(taixiumini || (taixiumini = {}));
    exports.default = taixiumini.PanelChat;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/App": void 0,
    "../../Main/Game/src/common/BroadcastReceiver": void 0,
    "../../Main/Game/src/common/Constants": void 0,
    "../../Main/Game/src/common/Utils": void 0,
    "../../Main/Game/src/networks/MiniGameNetworkClient": void 0,
    "../../Main/Game/src/networks/Network.InPacket": void 0,
    "./Lixi.cmd": "Lixi.cmd"
  } ]
}, {}, [ "Lixi.cmd", "Lobby.ButtonLiXi", "Lobby.PopupLiXi", "PanelChat" ]);