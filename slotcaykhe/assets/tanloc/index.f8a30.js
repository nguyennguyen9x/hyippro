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
      Code.PING_PONG = 50;
      Code.SUBSCRIBE = 2e3;
      Code.SUBCRIBE_RESPONSE = 2002;
      Code.SPIN_RESULT = 2003;
      Code.LOG_CHAT = 18003;
      Code.SEND_CHAT = 18e3;
      Code.SUBSCRIBE_CHAT = 18001;
      Code.UNSUBSCRIBE_CHAT = 18002;
      Code.UPDATE_USER_MONEY = 21e3;
      TanLocCmd.Code = Code;
      class SendPing extends Network_OutPacket_1.default {
        constructor() {
          super();
          this.initData(100);
          this.setControllerId(0);
          this.setCmdId(Code.PING_PONG);
          this.packHeader();
          this.updateSize();
        }
      }
      TanLocCmd.SendPing = SendPing;
      class SendSubscribe extends Network_OutPacket_1.default {
        constructor() {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.SUBSCRIBE);
          this.packHeader();
          this.updateSize();
        }
      }
      TanLocCmd.SendSubscribe = SendSubscribe;
      class SendSubscribeChat extends Network_OutPacket_1.default {
        constructor() {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.SUBSCRIBE_CHAT);
          this.packHeader();
          this.putString(Constants_1.ChatChannel.TAN_LOC);
          this.updateSize();
        }
      }
      TanLocCmd.SendSubscribeChat = SendSubscribeChat;
      class SendUnSubscribeChat extends Network_OutPacket_1.default {
        constructor() {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.UNSUBSCRIBE_CHAT);
          this.packHeader();
          this.putString(Constants_1.ChatChannel.TAN_LOC);
          this.updateSize();
        }
      }
      TanLocCmd.SendUnSubscribeChat = SendUnSubscribeChat;
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
      class ReceiveSubscribe extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.isSpinBingo = false;
          this.isSpinBingo = this.getBool();
        }
      }
      TanLocCmd.ReceiveSubscribe = ReceiveSubscribe;
      class ReceiveSpinResult extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.spinResult = "";
          this.currentRound = 0;
          this.spinResult = this.getString();
          this.currentRound = this.getByte();
        }
      }
      TanLocCmd.ReceiveSpinResult = ReceiveSpinResult;
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
      TanLocCmd.ReceivedUpdateUserMoney = ReceivedUpdateUserMoney;
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
    var TanLocController_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const App_1 = require("../../Main/Game/src/common/App");
    const BroadcastReceiver_1 = require("../../Main/Game/src/common/BroadcastReceiver");
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    const Http_1 = require("../../Main/Game/src/common/Http");
    const Tween_1 = require("../../Main/Game/src/common/Tween");
    const TanLoc_NetworkClient_1 = require("./TanLoc.NetworkClient");
    const Network_InPacket_1 = require("../../Main/Game/src/networks/Network.InPacket");
    const TanLoc_Cmd_1 = require("./TanLoc.Cmd");
    const TanLoc_PanelChat_1 = require("./TanLoc.PanelChat");
    const Network_Cmd_1 = require("../../Main/Game/src/networks/Network.Cmd");
    const Lobby_PopupShop_1 = require("../../Main/Lobby/src/Lobby.PopupShop");
    const MiniGameNetworkClient_1 = require("../../Main/Game/src/networks/MiniGameNetworkClient");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let TanLocController = TanLocController_1 = class TanLocController extends cc.Component {
      constructor() {
        super(...arguments);
        this.lbChip = null;
        this.safeArea = null;
        this.gamePlay = null;
        this.itemResult = null;
        this.scrollResult = null;
        this.tickets = null;
        this.itemMyTicket = null;
        this.scrollMyTicket = null;
        this.animWin = null;
        this.lbWin = null;
        this.btnBingo = null;
        this.lbTime = null;
        this.panelChat = null;
        this.listTicket = [];
        this.listResult = [];
        this.time = 0;
        this.results = [];
        this.resultFakes = [];
        this.isClickBack = false;
        this.scheduleBonusTime = null;
      }
      static getInstance() {
        return this.instance;
      }
      onLoad() {
        TanLocController_1.instance = this;
      }
      start() {
        this.resizePlayView();
        this.itemResult.active = false;
        this.itemMyTicket.active = false;
        let list = [];
        for (let i = 0; i < 25; i++) list.push(-1);
        list.forEach((num, idx) => {
          this.setCellInTicket(idx, 0, num);
        });
        BroadcastReceiver_1.default.register(BroadcastReceiver_1.default.USER_UPDATE_COIN, () => {
          Tween_1.default.numberTo(this.lbChip, Configs_1.default.Login.Coin, .3);
        }, this);
        BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN);
        BroadcastReceiver_1.default.register(BroadcastReceiver_1.default.USER_DISCONNECTED, () => {
          TanLoc_NetworkClient_1.default.getInstance().close();
        }, this);
        App_1.default.instance.showErrLoading("\u0110ang k\u1ebft n\u1ed1i t\u1edbi server...");
        TanLoc_NetworkClient_1.default.getInstance().addOnOpen(() => {
          App_1.default.instance.showErrLoading("\u0110ang \u0111ang \u0111\u0103ng nh\u1eadp...");
        }, this);
        TanLoc_NetworkClient_1.default.getInstance().addOnClose(() => {
          this.isClickBack || !Configs_1.default.Login.IsLogin ? this.backToLobby() : App_1.default.instance.alertDialog.showMsgWithOnDismissed("B\u1ea1n \u0111\xe3 m\u1ea5t k\u1ebft n\u1ed1i v\u1edbi server.", () => {
            this.backToLobby();
          });
        }, this);
        TanLoc_NetworkClient_1.default.getInstance().connect();
        TanLoc_NetworkClient_1.default.getInstance().addListener(data => {
          if (!this.node.active) return;
          let inpacket = new Network_InPacket_1.default(data);
          switch (inpacket.getCmdId()) {
           case Network_Cmd_1.default.Code.LOGIN:
            App_1.default.instance.showLoading(false);
            this.subscribe();
            this.requestConfig();
            this.requestUserInfo();
            break;

           case TanLoc_Cmd_1.default.Code.SUBCRIBE_RESPONSE:
            {
              let res = new TanLoc_Cmd_1.default.ReceiveSubscribe(data);
              cc.log(res);
            }
            break;

           case TanLoc_Cmd_1.default.Code.SPIN_RESULT:
            {
              let res = new TanLoc_Cmd_1.default.ReceiveSpinResult(data);
              cc.log(res);
              this.updateSpinRedult(res);
            }
          }
        }, this);
        MiniGameNetworkClient_1.default.getInstance().addListener(data => {
          let inPacket = new Network_InPacket_1.default(data);
          switch (inPacket.getCmdId()) {
           case TanLoc_Cmd_1.default.Code.UPDATE_USER_MONEY:
            {
              let res = new TanLoc_Cmd_1.default.ReceivedUpdateUserMoney(data);
              Configs_1.default.Login.Coin = res.totalMoney;
              BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN);
              res.showPopup && App_1.default.instance.alertDialog.showMsg("C\xf3 th\u01b0 m\u1edbi :\n" + res.desc);
            }
          }
        }, this);
        this.schedule(() => {
          TanLoc_NetworkClient_1.default.getInstance().send(new TanLoc_Cmd_1.default.SendPing());
        }, 20);
      }
      resizePlayView() {
        const distanceResizeHeight = (this.safeArea.height - 100 - 1180) / 2;
        if (distanceResizeHeight > 0) {
          this.scrollMyTicket.node.height = this.scrollMyTicket.node.height + distanceResizeHeight;
          this.scrollResult.node.height = this.scrollResult.node.height + distanceResizeHeight;
        }
      }
      subscribe() {
        TanLoc_NetworkClient_1.default.getInstance().send(new TanLoc_Cmd_1.default.SendSubscribe());
      }
      requestConfig() {
        Http_1.default.get(Configs_1.default.App.API_TAN_LOC + "config", {}, (err, res) => {
          if (null != err) return;
          cc.log(res);
          let countDown = res.countDown;
          this.setCountDown(countDown);
          this.schedule(this.scheduleBonusTime = () => {
            countDown--;
            if (countDown >= 0) this.setCountDown(countDown); else {
              this.unschedule(this.scheduleBonusTime);
              this.requestConfig();
            }
          }, 1);
        });
      }
      setCountDown(countDown) {
        let hours = Math.floor(countDown / 3600);
        let minutes = Math.floor((countDown - 60 * hours * 60) / 60);
        let seconds = Math.floor(countDown - 60 * hours * 60 - 60 * minutes);
        this.lbTime.string = [ hours < 10 ? "0" + hours : hours, minutes < 10 ? "0" + minutes : minutes, seconds < 10 ? "0" + seconds : seconds ].join(":");
      }
      requestUserInfo() {
        Http_1.default.get(Configs_1.default.App.API_TAN_LOC + "userinfo", {}, (err, res) => {
          if (null != err) return;
          cc.log(res);
          this.listTicket = res.eventTanLocUserTicketList;
          this.listTicket.forEach(ticket => {
            this.addTicket(ticket.id);
          });
        });
      }
      backToLobby() {
        cc.audioEngine.stopAll();
        App_1.default.instance.loadScene("Lobby");
      }
      actionBack() {
        this.isClickBack = true;
        TanLoc_NetworkClient_1.default.getInstance().close();
      }
      actionAddCoin() {
        Lobby_PopupShop_1.default.createAndShow(App_1.default.instance.popups);
      }
      actionTop() {
        Http_1.default.get(Configs_1.default.App.API_TAN_LOC + "topshared", {
          page: 0,
          size: 10
        }, (err, res) => {
          cc.log(res);
        });
        Http_1.default.get(Configs_1.default.App.API_TAN_LOC + "toprewarded", {
          page: 0,
          size: 10
        }, (err, res) => {
          cc.log(res);
        });
      }
      actionHistory() {}
      actionTanLoc() {}
      actionRegisterLoc() {
        Http_1.default.post(Configs_1.default.App.API_TAN_LOC + "register", {}, (err, res) => {
          if (null != err) return;
          cc.log(res);
          if (!res.success) {
            App_1.default.instance.alertDialog.showMsgWithOnDismissed(res.message, () => {});
            return;
          }
          this.listTicket = res.eventTanLocUserTicketList;
          this.listTicket.forEach(ticket => {
            this.addTicket(ticket.id);
          });
        });
      }
      actionChat() {
        cc.Tween.stopAllByTarget(this.tickets);
        cc.Tween.stopAllByTarget(this.scrollResult.node);
        cc.Tween.stopAllByTarget(this.scrollMyTicket.node);
        cc.Tween.stopAllByTarget(this.panelChat.node);
        cc.tween(this.tickets).to(.5, {
          scale: .5,
          y: 365
        }, {
          easing: "quartInOut"
        }).start();
        cc.tween(this.scrollResult.node).to(.5, {
          scale: .5,
          y: 551.75,
          height: 350
        }, {
          easing: "quartInOut"
        }).start();
        cc.tween(this.scrollMyTicket.node).to(.5, {
          scale: .5,
          y: 178.25,
          height: 350
        }, {
          easing: "quartInOut"
        }).start();
        this.panelChat.node.active = true;
        this.panelChat.node.opacity = 0;
        this.panelChat.node.scaleY = 0;
        cc.tween(this.panelChat.node).to(.5, {
          scaleY: 1,
          opacity: 255
        }, {
          easing: "quartInOut"
        }).start();
      }
      dismissChat() {
        cc.Tween.stopAllByTarget(this.tickets);
        cc.Tween.stopAllByTarget(this.scrollResult.node);
        cc.Tween.stopAllByTarget(this.scrollMyTicket.node);
        cc.Tween.stopAllByTarget(this.panelChat.node);
        cc.tween(this.tickets).to(.5, {
          scale: 1,
          y: -45
        }, {
          easing: "quartInOut"
        }).start();
        cc.tween(this.scrollResult.node).to(.5, {
          scale: 1,
          y: this.gamePlay.height / 2 - 53,
          height: 180 + (this.gamePlay.height - 1180) / 2
        }, {
          easing: "quartInOut"
        }).start();
        cc.tween(this.scrollMyTicket.node).to(.5, {
          scale: 1,
          y: -this.gamePlay.height / 2,
          height: 120 + (this.safeArea.height - 100 - 1180) / 2
        }, {
          easing: "quartInOut"
        }).start();
        cc.tween(this.panelChat.node).to(.5, {
          y: -280,
          opacity: 0
        }, {
          easing: "quartInOut"
        }).call(() => {
          this.panelChat.node.active = false;
        }).start();
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
      addUserToList(data) {}
      resetUserInList() {}
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
        this.tickets.children.forEach(cellWin => {
          this.setCellInTicket(parseInt(cellWin.name), 0);
        });
        this.listResult.forEach(num => {
          let cellWin = this.tickets.children.find(chil => chil.getChildByName("number-cell") && chil.getChildByName("number-cell").getComponent(cc.Label).string == (num < 10 ? "0" + num : "" + num));
          if (!cellWin) return;
          this.setCellInTicket(parseInt(cellWin.name), 1);
        });
        let listItemWin = this.tickets.children.filter(chil => chil.getChildByName("number-cell") && (chil.getChildByName("win").active || chil.getChildByName("cell_win").active)).map(chi => parseInt(chi.name)).sort((a, b) => a - b);
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
        let newTicketItem = cc.instantiate(this.itemMyTicket);
        newTicketItem.active = true;
        newTicketItem.getChildByName("number").getComponent(cc.Label).string = num < 10 ? "0" + num : "" + num;
        newTicketItem.getComponent(cc.Toggle).checkEvents[0].customEventData = num + "";
        this.scrollMyTicket.content.addChild(newTicketItem);
        this.scrollMyTicket.scrollToRight(.2);
      }
      setCellInTicket(idx, status = 0, num = -1) {
        let cell = this.tickets.getChildByName("" + idx);
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
      hideLineWin() {}
      showLineWin(line = [ -1, -1, -1, -1, -1 ]) {
        this.stopFake();
        line.forEach(num => {
          let cellWin = this.tickets.getChildByName(num + "");
          if (!cellWin) return;
          cellWin.getChildByName("cell_win").active = true;
          let action = [];
          action.push(cc.callFunc(() => {
            cellWin.getChildByName("win").active = false;
          }));
          for (let index = 0; index < 5; index++) action.push(cc.sequence(cc.fadeIn(.2), cc.fadeOut(.2)));
          action.push(cc.callFunc(() => {
            cellWin.getChildByName("win").active = true;
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
    TanLocController.instance = null;
    __decorate([ property(cc.Label) ], TanLocController.prototype, "lbChip", void 0);
    __decorate([ property(cc.Node) ], TanLocController.prototype, "safeArea", void 0);
    __decorate([ property(cc.Node) ], TanLocController.prototype, "gamePlay", void 0);
    __decorate([ property(cc.Node) ], TanLocController.prototype, "itemResult", void 0);
    __decorate([ property(cc.ScrollView) ], TanLocController.prototype, "scrollResult", void 0);
    __decorate([ property(cc.Node) ], TanLocController.prototype, "tickets", void 0);
    __decorate([ property(cc.Node) ], TanLocController.prototype, "itemMyTicket", void 0);
    __decorate([ property(cc.ScrollView) ], TanLocController.prototype, "scrollMyTicket", void 0);
    __decorate([ property(sp.Skeleton) ], TanLocController.prototype, "animWin", void 0);
    __decorate([ property(cc.Label) ], TanLocController.prototype, "lbWin", void 0);
    __decorate([ property(cc.Button) ], TanLocController.prototype, "btnBingo", void 0);
    __decorate([ property(cc.Label) ], TanLocController.prototype, "lbTime", void 0);
    __decorate([ property(TanLoc_PanelChat_1.default) ], TanLocController.prototype, "panelChat", void 0);
    TanLocController = TanLocController_1 = __decorate([ ccclass ], TanLocController);
    exports.default = TanLocController;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/App": void 0,
    "../../Main/Game/src/common/BroadcastReceiver": void 0,
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/common/Http": void 0,
    "../../Main/Game/src/common/Tween": void 0,
    "../../Main/Game/src/networks/MiniGameNetworkClient": void 0,
    "../../Main/Game/src/networks/Network.Cmd": void 0,
    "../../Main/Game/src/networks/Network.InPacket": void 0,
    "../../Main/Lobby/src/Lobby.PopupShop": void 0,
    "./TanLoc.Cmd": "TanLoc.Cmd",
    "./TanLoc.NetworkClient": "TanLoc.NetworkClient",
    "./TanLoc.PanelChat": "TanLoc.PanelChat"
  } ],
  "TanLoc.Dialog": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8491auHjEpNiZHWtFhOy2Jj", "TanLoc.Dialog");
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
    let TanLocDialog = class TanLocDialog extends cc.Component {
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
    TanLocDialog = __decorate([ ccclass ], TanLocDialog);
    exports.default = TanLocDialog;
    cc._RF.pop();
  }, {} ],
  "TanLoc.NetworkClient": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "86996qJ9QFFrKmRZoc7Fa0R", "TanLoc.NetworkClient");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Network_NetworkClient_1 = require("../../Main/Game/src/networks/Network.NetworkClient");
    const Network_NetworkListener_1 = require("../../Main/Game/src/networks/Network.NetworkListener");
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    const Network_InPacket_1 = require("../../Main/Game/src/networks/Network.InPacket");
    const Network_Cmd_1 = require("../../Main/Game/src/networks/Network.Cmd");
    class TanLocNetworkClient extends Network_NetworkClient_1.default {
      constructor() {
        super();
        this.listeners = new Array();
        this.isLogin = false;
        this.onLogined = null;
        this.isUseWSS = Configs_1.default.App.USE_WSS;
      }
      static getInstance() {
        null == this.instance && (this.instance = new TanLocNetworkClient());
        return this.instance;
      }
      checkConnect(onLogined = null) {
        this.onLogined = onLogined;
        if (null != this.ws && this.ws.readyState == WebSocket.CONNECTING) return;
        if (!this.isConnected()) {
          this.connect();
          return;
        }
        this.isLogin && null != this.onLogined && this.onLogined();
      }
      connect() {
        super.connect(Configs_1.default.App.HOST_TAN_LOC.host, Configs_1.default.App.HOST_TAN_LOC.port);
      }
      onOpen(ev) {
        super.onOpen(ev);
        this.send(new Network_Cmd_1.default.SendLogin(Configs_1.default.Login.Nickname, Configs_1.default.Login.AccessToken));
      }
      onMessage(ev) {
        var data = new Uint8Array(ev.data);
        for (var i = 0; i < this.listeners.length; i++) {
          var listener = this.listeners[i];
          if (listener.target && listener.target instanceof Object && listener.target.node) listener.callback(data); else {
            this.listeners.splice(i, 1);
            i--;
          }
        }
        let inpacket = new Network_InPacket_1.default(data);
        switch (inpacket.getCmdId()) {
         case Network_Cmd_1.default.Code.LOGIN:
          this.isLogin = true;
          null != this.onLogined && this.onLogined();
        }
      }
      addListener(callback, target) {
        this.listeners.push(new Network_NetworkListener_1.default(target, callback));
      }
      send(packet) {
        for (var b = new Int8Array(packet._length), c = 0; c < packet._length; c++) b[c] = packet._data[c];
        null != this.ws && this.isConnected() && this.ws.send(b.buffer);
      }
      sendCheck(packet) {
        this.checkConnect(() => {
          this.send(packet);
        });
      }
    }
    exports.default = TanLocNetworkClient;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/networks/Network.Cmd": void 0,
    "../../Main/Game/src/networks/Network.InPacket": void 0,
    "../../Main/Game/src/networks/Network.NetworkClient": void 0,
    "../../Main/Game/src/networks/Network.NetworkListener": void 0
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
    const TanLoc_Controller_1 = require("./TanLoc.Controller");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let TanLocPanelChat = class TanLocPanelChat extends cc.Component {
      constructor() {
        super(...arguments);
        this.itemChatTemplate = null;
        this.scrMessage = null;
        this.edbMessage = null;
        this.atlasVip = null;
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
          MiniGameNetworkClient_1.default.getInstance().send(new TanLoc_Cmd_1.default.SendSubscribeChat());
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
        } else MiniGameNetworkClient_1.default.getInstance().send(new TanLoc_Cmd_1.default.SendUnSubscribeChat());
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
        MiniGameNetworkClient_1.default.getInstance().send(new TanLoc_Cmd_1.default.SendChat(unescape(encodeURIComponent(message))));
      }
      scrollToBottom() {
        this.scrMessage.scrollToBottom(.2);
      }
      dismiss() {
        TanLoc_Controller_1.default.getInstance().dismissChat();
      }
    };
    __decorate([ property(cc.Node) ], TanLocPanelChat.prototype, "itemChatTemplate", void 0);
    __decorate([ property(cc.ScrollView) ], TanLocPanelChat.prototype, "scrMessage", void 0);
    __decorate([ property(cc.EditBox) ], TanLocPanelChat.prototype, "edbMessage", void 0);
    __decorate([ property(cc.SpriteAtlas) ], TanLocPanelChat.prototype, "atlasVip", void 0);
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
    "./TanLoc.Cmd": "TanLoc.Cmd",
    "./TanLoc.Controller": "TanLoc.Controller"
  } ],
  "TanLoc.PopupTanLoc": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "43278IeVcRF4YZ5CYKEhxes", "TanLoc.PopupTanLoc");
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
    const {ccclass: ccclass, property: property} = cc._decorator;
    let TanLocPopupTanLoc = class TanLocPopupTanLoc extends Dialog_1.default {
      constructor() {
        super(...arguments);
        this.edbAmount = null;
        this.lbToast = null;
      }
      show() {
        super.show();
        this.edbAmount.string = "";
      }
      actionSubmit() {
        const amount = parseInt(this.edbAmount.string);
        if (0 === amount || isNaN(amount)) {
          App_1.default.instance.toast.showToast("S\u1ed1 ti\u1ec1n kh\xf4ng h\u1ee3p l\u1ec7.");
          return;
        }
        Http_1.default.post(Configs_1.default.App.API_TAN_LOC + "tanloc", {
          amount: 1
        }, (err, res) => {
          if (null != err) return;
          cc.log(res);
        });
        this.dismiss();
      }
    };
    __decorate([ property(cc.EditBox) ], TanLocPopupTanLoc.prototype, "edbAmount", void 0);
    __decorate([ property(cc.Label) ], TanLocPopupTanLoc.prototype, "lbToast", void 0);
    TanLocPopupTanLoc = __decorate([ ccclass ], TanLocPopupTanLoc);
    exports.default = TanLocPopupTanLoc;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/App": void 0,
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/common/Dialog": void 0,
    "../../Main/Game/src/common/Http": void 0
  } ]
}, {}, [ "TanLoc.Cmd", "TanLoc.Controller", "TanLoc.Dialog", "TanLoc.NetworkClient", "TanLoc.PanelChat", "TanLoc.PopupTanLoc" ]);