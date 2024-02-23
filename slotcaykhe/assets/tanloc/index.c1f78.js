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
  "TanLoc.Cmd": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5677aFa795BYoYgjPSc0RYR", "TanLoc.Cmd");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.TanLocCmd = void 0;
    const Constants_1 = require("../../Main/Game/src/common/Constants");
    const Network_InPacket_1 = require("../../Main/Game/src/networks/Network.InPacket");
    const Network_OutPacket_1 = require("../../Main/Game/src/networks/Network.OutPacket");
    var TanLocCmd;
    (function(TanLocCmd) {
      class Code {}
      Code.SCRIBE = 2e3;
      Code.SUBCRIBE_RESPONSE = 2002;
      Code.SPIN_RESULT = 2003;
      Code.LOG_CHAT = 18003;
      Code.SEND_CHAT = 18e3;
      Code.SCRIBE_CHAT = 18001;
      Code.UNSCRIBE_CHAT = 18002;
      TanLocCmd.Code = Code;
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
      TanLocCmd.SendScribe = SendScribe;
      class SendScribeChat extends Network_OutPacket_1.default {
        constructor() {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.SCRIBE_CHAT);
          this.packHeader();
          this.putString(Constants_1.ChatChannel.TAN_LOC);
          this.updateSize();
        }
      }
      TanLocCmd.SendScribeChat = SendScribeChat;
      class SendUnScribeChat extends Network_OutPacket_1.default {
        constructor() {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.UNSCRIBE_CHAT);
          this.packHeader();
          this.putString(Constants_1.ChatChannel.TAN_LOC);
          this.updateSize();
        }
      }
      TanLocCmd.SendUnScribeChat = SendUnScribeChat;
      class SendChat extends Network_OutPacket_1.default {
        constructor(message) {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.SEND_CHAT);
          this.packHeader();
          this.putString(message);
          this.putString(Constants_1.ChatChannel.TAN_LOC);
          this.updateSize();
        }
      }
      TanLocCmd.SendChat = SendChat;
      class ReceiveScribe extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.spinResult = "";
          this.currentRound = 0;
          this.spinResult = this.getString();
          this.currentRound = this.getByte();
        }
      }
      TanLocCmd.ReceiveScribe = ReceiveScribe;
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
      TanLocCmd.ReceiveLogChat = ReceiveLogChat;
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
      TanLocCmd.ReceiveSendChat = ReceiveSendChat;
    })(TanLocCmd = exports.TanLocCmd || (exports.TanLocCmd = {}));
    exports.default = TanLocCmd;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/Constants": void 0,
    "../../Main/Game/src/networks/Network.InPacket": void 0,
    "../../Main/Game/src/networks/Network.OutPacket": void 0
  } ],
  "TanLoc.Controller": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6de3bhs7WJNxqjRs41QPYaB", "TanLoc.Controller");
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
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    const Http_1 = require("../../Main/Game/src/common/Http");
    const Tween_1 = require("../../Main/Game/src/common/Tween");
    const TanLocNetworkClient_1 = require("../../Main/Game/src/networks/TanLocNetworkClient");
    const Network_InPacket_1 = require("../../Main/Game/src/networks/Network.InPacket");
    const TanLoc_Cmd_1 = require("./TanLoc.Cmd");
    const TanLoc_PanelChat_1 = require("./TanLoc.PanelChat");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let TanLocController = class TanLocController extends cc.Component {
      constructor() {
        super(...arguments);
        this.panelChat = null;
        this.lbChip = null;
        this.btnGetTicket = null;
        this.itemResult = null;
        this.scrollResult = null;
        this.itemTicket = null;
        this.scrollTicket = null;
        this.ticket = null;
        this.result = null;
        this.tickets = null;
        this.animWin = null;
        this.lbWin = null;
        this.btnReceive = null;
        this.listTicket = [];
        this.listResult = [];
        this.isPlay = false;
        this.isChange = false;
        this.time = 0;
        this.results = [];
        this.resultFakes = [];
      }
      start() {
        this.subscribe();
        this.itemResult.active = false;
        this.itemTicket.active = false;
        this.btnReceive.node.active = false;
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
        BroadcastReceiver_1.default.register(BroadcastReceiver_1.default.USER_UPDATE_COIN, () => {
          Tween_1.default.numberTo(this.lbChip, Configs_1.default.Login.Coin, .3);
        }, this);
        BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN);
        TanLocNetworkClient_1.default.getInstance().addOnClose(() => {}, this);
        TanLocNetworkClient_1.default.getInstance().addListener(data => {
          if (!this.node.active) return;
          let inpacket = new Network_InPacket_1.default(data);
          switch (inpacket.getCmdId()) {
           case TanLoc_Cmd_1.default.Code.SUBCRIBE_RESPONSE:
            {
              let res = new TanLoc_Cmd_1.default.ReceiveScribe(data);
              cc.log(res);
            }
            break;

           case TanLoc_Cmd_1.default.Code.SPIN_RESULT:
            {
              let res = new TanLoc_Cmd_1.default.ReceiveScribe(data);
              cc.log(res);
              this.updateSpinRedult(res);
            }
          }
        }, this);
        this.sendRequest(data => {}, "config");
        this.sendRequest(data => {
          if (!data.success) {
            App_1.default.instance.alertDialog.showMsgWithOnDismissed(data.message, () => {});
            return;
          }
          this.listTicket = data.eventTanLocUserTicketList;
          this.listTicket.forEach(ticket => {
            this.addTicket(ticket.id);
          });
          this.btnGetTicket.active = 0 == data.eventTanLocUserTicketList.length && data.ticket > 0;
        }, "userinfo");
      }
      sendRequest(callback = (data => {}), type = "", data = {}) {
        let result = (err, res) => {
          if (null != err) return;
          cc.log(res);
          callback && "function" == typeof callback && callback(res);
        };
        switch (type) {
         case "config":
         case "userinfo":
         case "topshare":
         case "toprewarded":
         case "bingo":
          Http_1.default.get(Configs_1.default.App.API_TAN_LOC + type, data, result);
          break;

         case "register":
         case "tanloc":
          Http_1.default.post(Configs_1.default.App.API_TAN_LOC + type, data, result);
        }
      }
      subscribe() {
        TanLocNetworkClient_1.default.getInstance().send(new TanLoc_Cmd_1.default.SendScribe());
      }
      getTicket() {
        this.sendRequest(data => {
          this.listTicket = data.eventTanLocUserTicketList;
          this.listTicket.forEach(ticket => {
            this.addTicket(ticket.id);
          });
          this.btnGetTicket.active = false;
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
        App_1.default.instance.loadScene("Lobby");
      }
      addUserToList(data) {}
      resetUserInList() {}
      openLiXi() {}
      addResult(num = null) {
        "number" != typeof num && (num = Math.floor(100 * Math.random()));
        this.listResult.push(num);
        let newResult = cc.instantiate(this.itemResult);
        newResult.active = true;
        newResult.getChildByName("number-ball").getComponent(cc.Label).string = num < 10 ? "0" + num : "" + num;
        newResult.getChildByName("type-ball").getComponent(cc.Label).string = num < 20 ? "B" : num < 40 ? "I" : num < 60 ? "N" : num < 80 ? "G" : "O";
        this.scrollResult.content.addChild(newResult);
        this.scrollResult.scrollToRight(.2);
        this.checkTicket();
      }
      checkTicket() {
        this.ticket.children.forEach(cellWin => {
          this.setCellInTicket(parseInt(cellWin.name), 0);
        });
        this.listResult.forEach(num => {
          let cellWin = this.ticket.children.find(chil => chil.getChildByName("number-cell") && chil.getChildByName("number-cell").getComponent(cc.Label).string == (num < 10 ? "0" + num : "" + num));
          if (!cellWin) return;
          this.setCellInTicket(parseInt(cellWin.name), 1);
        });
        let listItemWin = this.ticket.children.filter(chil => chil.getChildByName("number-cell") && (chil.getChildByName("win").active || chil.getChildByName("cell_win").active)).map(chi => parseInt(chi.name)).sort((a, b) => a - b);
        let listTicketCheck = [];
        for (let i = 0; i < 5; i++) {
          listTicketCheck = [];
          for (let j = 0; j < 5; j++) -1 != listItemWin.indexOf(5 * i + j) && listTicketCheck.push(5 * i + j);
          if (5 == listTicketCheck.length) return this.showLineWin(listTicketCheck);
          listTicketCheck = [];
          for (let j = 0; j < 5; j++) -1 != listItemWin.indexOf(i + 5 * j) && listTicketCheck.push(i + 5 * j);
          if (5 == listTicketCheck.length) return this.showLineWin(listTicketCheck);
        }
        listTicketCheck = [];
        for (let j = 0; j < 5; j++) -1 != listItemWin.indexOf(j + 5 * j) && listTicketCheck.push(j + 5 * j);
        if (5 == listTicketCheck.length) return this.showLineWin(listTicketCheck);
        listTicketCheck = [];
        for (let j = 0; j < 5; j++) -1 != listItemWin.indexOf(4 - j + 5 * j) && listTicketCheck.push(4 - j + 5 * j);
        if (5 == listTicketCheck.length) return this.showLineWin(listTicketCheck);
      }
      addTicket(num) {
        let newTicketItem = cc.instantiate(this.itemTicket);
        newTicketItem.active = true;
        newTicketItem.getChildByName("number").getComponent(cc.Label).string = num < 10 ? "0" + num : "" + num;
        newTicketItem.getComponent(cc.Toggle).checkEvents[0].customEventData = num + "";
        this.scrollTicket.content.addChild(newTicketItem);
        this.scrollTicket.scrollToRight(.2);
      }
      setCellInTicket(idx, status = 0, num = -1) {
        let cell = this.ticket.getChildByName("" + idx);
        if (!cell) return;
        -1 != num && (cell.getChildByName("number-cell").getComponent(cc.Label).string = num < 0 ? "" : num < 10 ? "0" + num : "" + num);
        cell.getChildByName("win").active = status > 0;
        cell.getChildByName("cell_win").active = status > 1;
      }
      setTicket(event, data) {
        let ticket = this.listTicket.find(ticket => ticket.id == data);
        if (!ticket) return;
        ticket.matrix.split(",").reverse().forEach((num, idx) => {
          this.setCellInTicket(idx, 0, num);
        });
        this.checkTicket();
      }
      clickPlay() {
        if (this.isChange) return;
        this.isChange = true;
        this.isPlay = true;
        this.changeLayout();
      }
      clickChat() {
        if (this.isChange) return;
        this.isChange = true;
        this.isPlay = false;
        this.changeLayout(() => {
          cc.tween(this.panelChat.node).to(.5, {
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
        this.isPlay && cc.tween(this.panelChat.node).to(.5, {
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
          let cellWin = this.ticket.getChildByName(num + "");
          if (!cellWin) return;
          cellWin.getChildByName("cell_win").active = true;
          let action = [];
          action.push(cc.callFunc(() => {
            cellWin.getChildByName("win").active = false;
          }));
          for (let index = 0; index < 5; index++) action.push(cc.sequence(cc.fadeIn(.2), cc.fadeOut(.2)));
          action.push(cc.callFunc(() => {
            cellWin.getChildByName("win").active = true;
            this.btnReceive.node.active = true;
          }));
          action.push(cc.delayTime(2));
          cc.tween(cellWin.getChildByName("cell_win")).repeatForever(cc.sequence(action)).start();
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
        this.schedule(this.runInTime, .01);
        this.listTicket = {
          eventTanLocUserTicketList: [ {
            id: 0,
            matrix: "1,2,3,4,5,11,12,13,14,15,31,32,33,34,35,41,42,43,44,45,51,52,53,54,55"
          }, {
            id: 0,
            matrix: "1,2,3,4,5,11,12,13,14,15,31,32,33,34,35,41,42,43,44,45,51,52,53,54,55"
          } ]
        }.eventTanLocUserTicketList;
        this.listTicket.forEach(ticket => {
          this.addTicket(ticket.id);
        });
      }
      runInTime() {
        Math.random() > .1 && this.panelChat.addMessage("test " + Math.floor(10 * Math.random()), new Date().toString(), Math.floor(10 * Math.random()));
        if (this.time % 10 == 0) {
          this.resultFakes[Math.floor(this.time / 10)] = this.resultFakes[Math.floor(this.time / 10)] || Math.floor(100 * Math.random());
          this.fakeCmd(TanLoc_Cmd_1.default.Code.SPIN_RESULT, {
            spinResult: JSON.stringify({
              0: this.resultFakes
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
         case TanLoc_Cmd_1.default.Code.SUBCRIBE_RESPONSE:
          cc.log(res);
          break;

         case TanLoc_Cmd_1.default.Code.SPIN_RESULT:
          this.updateSpinRedult(res);
        }
      }
    };
    __decorate([ property(TanLoc_PanelChat_1.default) ], TanLocController.prototype, "panelChat", void 0);
    __decorate([ property(cc.Label) ], TanLocController.prototype, "lbChip", void 0);
    __decorate([ property(cc.Node) ], TanLocController.prototype, "btnGetTicket", void 0);
    __decorate([ property(cc.Node) ], TanLocController.prototype, "itemResult", void 0);
    __decorate([ property(cc.ScrollView) ], TanLocController.prototype, "scrollResult", void 0);
    __decorate([ property(cc.Node) ], TanLocController.prototype, "itemTicket", void 0);
    __decorate([ property(cc.ScrollView) ], TanLocController.prototype, "scrollTicket", void 0);
    __decorate([ property(cc.Node) ], TanLocController.prototype, "ticket", void 0);
    __decorate([ property(cc.Node) ], TanLocController.prototype, "result", void 0);
    __decorate([ property(cc.Node) ], TanLocController.prototype, "tickets", void 0);
    __decorate([ property(sp.Skeleton) ], TanLocController.prototype, "animWin", void 0);
    __decorate([ property(cc.Label) ], TanLocController.prototype, "lbWin", void 0);
    __decorate([ property(cc.Button) ], TanLocController.prototype, "btnReceive", void 0);
    TanLocController = __decorate([ ccclass ], TanLocController);
    exports.default = TanLocController;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/App": void 0,
    "../../Main/Game/src/common/BroadcastReceiver": void 0,
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/common/Http": void 0,
    "../../Main/Game/src/common/Tween": void 0,
    "../../Main/Game/src/networks/Network.InPacket": void 0,
    "../../Main/Game/src/networks/TanLocNetworkClient": void 0,
    "./TanLoc.Cmd": "TanLoc.Cmd",
    "./TanLoc.PanelChat": "TanLoc.PanelChat"
  } ],
  "TanLoc.PanelChat": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1c957brhSxC+rfN0N2xF7TB", "TanLoc.PanelChat");
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
    const TanLoc_Cmd_1 = require("./TanLoc.Cmd");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let TanLocPanelChat = class TanLocPanelChat extends cc.Component {
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
          MiniGameNetworkClient_1.default.getInstance().send(new TanLoc_Cmd_1.default.SendScribeChat());
          MiniGameNetworkClient_1.default.getInstance().addListener(data => {
            if (!this.node.active) return;
            let inpacket = new Network_InPacket_1.default(data);
            switch (inpacket.getCmdId()) {
             case TanLoc_Cmd_1.default.Code.LOG_CHAT:
              try {
                let res = new TanLoc_Cmd_1.default.ReceiveLogChat(data);
                cc.log(res);
                if (res.chatChannel !== Constants_1.ChatChannel.TAN_LOC) break;
                var msgs = JSON.parse(res.message);
                for (var i = 0; i < msgs.length; i++) this.addMessage(msgs[i]["u"], msgs[i]["m"], msgs[i]["vipId"]);
              } catch (e) {
                cc.log(e);
              }
              null === this || void 0 === this ? void 0 : this.scrollToBottom();
              break;

             case TanLoc_Cmd_1.default.Code.SEND_CHAT:
              {
                let res = new TanLoc_Cmd_1.default.ReceiveSendChat(data);
                cc.log(res);
                if (res.chatChannel !== Constants_1.ChatChannel.TAN_LOC) break;
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
        } else MiniGameNetworkClient_1.default.getInstance().send(new TanLoc_Cmd_1.default.SendUnScribeChat());
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
        var req = new TanLoc_Cmd_1.default.SendChat(unescape(encodeURIComponent(message)));
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
    __decorate([ property(cc.Node) ], TanLocPanelChat.prototype, "itemChatTemplate", void 0);
    __decorate([ property(cc.ScrollView) ], TanLocPanelChat.prototype, "scrMessage", void 0);
    __decorate([ property(cc.EditBox) ], TanLocPanelChat.prototype, "edbMessage", void 0);
    __decorate([ property(cc.SpriteAtlas) ], TanLocPanelChat.prototype, "atlasVip", void 0);
    __decorate([ property(cc.Label) ], TanLocPanelChat.prototype, "lblToast", void 0);
    TanLocPanelChat = __decorate([ ccclass ], TanLocPanelChat);
    exports.default = TanLocPanelChat;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/App": void 0,
    "../../Main/Game/src/common/BroadcastReceiver": void 0,
    "../../Main/Game/src/common/Constants": void 0,
    "../../Main/Game/src/common/Utils": void 0,
    "../../Main/Game/src/networks/MiniGameNetworkClient": void 0,
    "../../Main/Game/src/networks/Network.InPacket": void 0,
    "./TanLoc.Cmd": "TanLoc.Cmd"
  } ]
}, {}, [ "TanLoc.Cmd", "TanLoc.Controller", "TanLoc.PanelChat" ]);