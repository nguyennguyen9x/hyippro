window.__require=function t(e,i,s){function n(c,o){if(!i[c]){if(!e[c]){var l=c.split("/");if(l=l[l.length-1],!e[l]){var r="function"==typeof __require&&__require;if(!o&&r)return r(l,!0);if(a)return a(l,!0);throw new Error("Cannot find module '"+c+"'")}c=l}var h=i[c]={exports:{}};e[c][0].call(h.exports,function(t){return n(e[c][1][t]||t)},h,h.exports,t,e,i,s)}return i[c].exports}for(var a="function"==typeof __require&&__require,c=0;c<s.length;c++)n(s[c]);return n}({"TanLoc.Button":[function(t,e,i){"use strict";cc._RF.push(e,"36770ZaJsRKM7grer/T0fGL","TanLoc.Button");var s=this&&this.__decorate||function(t,e,i,s){var n,a=arguments.length,c=a<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,i,s);else for(var o=t.length-1;o>=0;o--)(n=t[o])&&(c=(a<3?n(c):a>3?n(e,i,c):n(e,i))||c);return a>3&&c&&Object.defineProperty(e,i,c),c};Object.defineProperty(i,"__esModule",{value:!0});const n=t("../../Main/Game/src/common/Configs"),a=t("../../Main/Game/src/common/Http"),{ccclass:c,property:o}=cc._decorator;let l=class extends cc.Component{constructor(){super(...arguments),this.labelTime=null,this.button=null,this.buttonClicked=!0,this.buttonMoved=cc.Vec2.ZERO}start(){this.labelTime.string="00",this.button.on(cc.Node.EventType.TOUCH_START,()=>{this.buttonClicked=!0,this.buttonMoved=cc.Vec2.ZERO},this),this.button.on(cc.Node.EventType.TOUCH_MOVE,t=>{if(this.buttonMoved=this.buttonMoved.add(t.getDelta()),this.buttonClicked){if(Math.abs(this.buttonMoved.x)>30||Math.abs(this.buttonMoved.y)>30){let t=this.button.position;t.x+=this.buttonMoved.x,t.y+=this.buttonMoved.y,this.button.position=t,this.buttonClicked=!1}}else{let e=this.button.position;e.x+=t.getDeltaX(),e.y+=t.getDeltaY(),this.button.position=e}},this),this.button.on(cc.Node.EventType.TOUCH_END,()=>{this.buttonClicked&&this.actionButtonTanLoc()},this),this.schedule(this.getTanLocConfig,5)}show(){this.button.active=!0,this.labelTime.string="00"}hidden(){this.button.active=!1}actionButtonTanLoc(){}getTanLocConfig(){a.default.get(n.default.App.API_TAN_LOC+"config",{},(t,e)=>{null==t&&cc.log(e)})}};s([o(cc.Label)],l.prototype,"labelTime",void 0),s([o(cc.Node)],l.prototype,"button",void 0),l=s([c],l),i.default=l,cc._RF.pop()},{"../../Main/Game/src/common/Configs":void 0,"../../Main/Game/src/common/Http":void 0}],"TanLoc.Cmd":[function(t,e,i){"use strict";cc._RF.push(e,"5677aFa795BYoYgjPSc0RYR","TanLoc.Cmd"),Object.defineProperty(i,"__esModule",{value:!0}),i.TanLocCmd=void 0;const s=t("../../Main/Game/src/common/Constants"),n=t("../../Main/Game/src/networks/Network.InPacket"),a=t("../../Main/Game/src/networks/Network.OutPacket");var c;(function(t){class e{}e.SCRIBE=2e3,e.SUBCRIBE_RESPONSE=2002,e.SPIN_RESULT=2003,e.LOG_CHAT=18003,e.SEND_CHAT=18e3,e.SCRIBE_CHAT=18001,e.UNSCRIBE_CHAT=18002,t.Code=e,t.SendScribe=class extends a.default{constructor(){super(),this.initData(100),this.setControllerId(1),this.setCmdId(e.SCRIBE),this.packHeader(),this.updateSize()}},t.SendScribeChat=class extends a.default{constructor(){super(),this.initData(100),this.setControllerId(1),this.setCmdId(e.SCRIBE_CHAT),this.packHeader(),this.putString(s.ChatChannel.LI_XI),this.updateSize()}},t.SendUnScribeChat=class extends a.default{constructor(){super(),this.initData(100),this.setControllerId(1),this.setCmdId(e.UNSCRIBE_CHAT),this.packHeader(),this.putString(s.ChatChannel.LI_XI),this.updateSize()}},t.SendChat=class extends a.default{constructor(t){super(),this.initData(100),this.setControllerId(1),this.setCmdId(e.SEND_CHAT),this.packHeader(),this.putString(t),this.putString(s.ChatChannel.LI_XI),this.updateSize()}},t.ReceiveScribe=class extends n.default{constructor(t){super(t),this.spinResult="",this.currentRound=0,this.spinResult=this.getString(),this.currentRound=this.getByte()}},t.ReceiveLogChat=class extends n.default{constructor(t){super(t),this.message="",this.minVipPoint=0,this.timeBan=0,this.userType=0,this.chatChannel="",this.message=this.getString(),this.minVipPoint=this.getByte(),this.timeBan=this.getLong(),this.userType=this.getByte(),this.chatChannel=this.getString()}},t.ReceiveSendChat=class extends n.default{constructor(t){super(t),this.error=0,this.nickname="",this.message="",this.desc="",this.suggestionActions=[],this.vip=0,this.chatChannel="",this.error=this.getError(),this.nickname=this.getString(),this.message=this.getString(),this.desc=this.getString();let e=this.getString();if(this.vip=this.getInt(),e){let t=JSON.parse(e);t.hasOwnProperty("suggestionActions")&&Array.isArray(t.suggestionActions)&&(this.suggestionActions=s.UserActions.toEnums(t.suggestionActions))}this.chatChannel=this.getString()}}})(c=i.TanLocCmd||(i.TanLocCmd={})),i.default=c,cc._RF.pop()},{"../../Main/Game/src/common/Constants":void 0,"../../Main/Game/src/networks/Network.InPacket":void 0,"../../Main/Game/src/networks/Network.OutPacket":void 0}],"TanLoc.Controller":[function(t,e,i){"use strict";cc._RF.push(e,"6de3bhs7WJNxqjRs41QPYaB","TanLoc.Controller");var s,n=this&&this.__decorate||function(t,e,i,s){var n,a=arguments.length,c=a<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,i,s);else for(var o=t.length-1;o>=0;o--)(n=t[o])&&(c=(a<3?n(c):a>3?n(e,i,c):n(e,i))||c);return a>3&&c&&Object.defineProperty(e,i,c),c};Object.defineProperty(i,"__esModule",{value:!0});const a=t("../../Main/Game/src/common/App"),c=t("../../Main/Game/src/common/BroadcastReceiver"),o=t("../../Main/Game/src/common/Configs"),l=t("../../Main/Game/src/common/Constants"),r=t("../../Main/Game/src/common/Http"),h=t("../../Main/Game/src/common/Tween"),d=t("../../Main/Game/src/common/Utils"),u=t("../../Main/Game/src/networks/TanLocNetworkClient"),m=t("../../Main/Game/src/networks/Network.InPacket"),p=t("./TanLoc.Cmd"),g=t("./TanLoc.PanelChat"),{ccclass:C,property:f}=cc._decorator;let T=s=class extends cc.Component{constructor(){super(...arguments),this.panelChat=null,this.lbChip=null,this.btnGetTicket=null,this.itemResult=null,this.scrollResult=null,this.itemTicket=null,this.scrollTicket=null,this.ticket=null,this.result=null,this.tickets=null,this.animWin=null,this.lbWin=null,this.btnReceive=null,this.listTicket=[],this.listResult=[],this.isPlay=!1,this.isChange=!1,this.time=0,this.resultFakes=[],this.results=[]}sendAPI(t=(()=>{}),e="",i={}){let s=(i,s)=>{null==i&&(cc.log(e,s),t&&"function"==typeof t&&t(s))};switch(e){case"config":case"userinfo":case"topshare":case"toprewarded":case"bingo":r.default.get(o.default.App.API_TAN_LOC+e,i,s);break;case"register":case"tanloc":r.default.post(o.default.App.API_TAN_LOC+e,i,s)}}subscribe(){u.default.getInstance().send(new p.default.SendScribe)}start(){this.subscribe(),this.itemResult.active=!1,this.itemTicket.active=!1,this.btnReceive.node.active=!1;let t=[];for(let e=0;e<25;e++)t.push(-1);t.forEach((t,e)=>{this.setCellInTicket(e,0,t)}),c.default.register(c.default.USER_LOGOUT,()=>{this.node.active},this),c.default.register(c.default.USER_DISCONNECTED,()=>{this.node.active},this),this.lbChip.string=d.default.formatNumber(o.default.Login.Coin),c.default.register(c.default.USER_UPDATE_COIN,()=>{h.default.numberTo(this.lbChip,o.default.Login.Coin,.3)},this),u.default.getInstance().addOnClose(()=>{},this),this.clickChat(),u.default.getInstance().addListener(t=>{var e;if(this.node.active)switch(new m.default(t).getCmdId()){case p.default.Code.SUBCRIBE_RESPONSE:{let e=new p.default.ReceiveScribe(t);cc.log(e)}break;case p.default.Code.SPIN_RESULT:{let e=new p.default.ReceiveScribe(t);cc.log(e),this.updateSpinRedult(e)}break;case p.default.Code.LOG_CHAT:try{let e=new p.default.ReceiveLogChat(t);if(cc.log(e),e.chatChannel!==l.ChatChannel.TAI_XIU_MD5)break;for(var i=JSON.parse(e.message),s=0;s<i.length;s++)this.panelChat.addMessage(i[s].u,i[s].m,i[s].vipId)}catch(n){cc.log(n)}null===(e=this.panelChat)||void 0===e||e.scrollToBottom();break;case p.default.Code.SEND_CHAT:{let e=new p.default.ReceiveSendChat(t);if(cc.log(e),e.chatChannel!==l.ChatChannel.TAI_XIU_MD5)break;switch(e.error){case 0:this.panelChat.addMessage(e.nickname,e.message,e.vip);break;default:a.default.instance.actiontDialog.showMsgWithActions(e.desc,e.suggestionActions)}}}},this),this.sendAPI(t=>{s.fund=t.fund,s.numberUserRegister=t.numberUserRegister,s.numberUserShare=t.numberUserShare},"config"),this.sendAPI(t=>{this.listTicket=t.eventTanLocUserTicketList,this.listTicket.forEach(t=>{this.addTicket(t.id)}),this.btnGetTicket.active=0==t.eventTanLocUserTicketList.length&&t.ticket>0},"userinfo")}getTicket(){this.sendAPI(t=>{this.listTicket=t.eventTanLocUserTicketList,this.listTicket.forEach(t=>{this.addTicket(t.id)}),this.btnGetTicket.active=!1},"register")}updateSpinRedult(t){this.results.length!=JSON.parse(t.spinResult)[t.currentRound].length&&(this.results=JSON.parse(t.spinResult)[t.currentRound],cc.log(this.results),this.scrollResult.content.children.forEach(t=>{t.active=!1}),this.results.forEach((t,e)=>{let i=this.scrollResult.content.children[e];i?(i.active=!0,i.getChildByName("number-ball").getComponent(cc.Label).string=t<10?"0"+t:""+t,i.getChildByName("type-ball").getComponent(cc.Label).string=t<20?"B":t<40?"I":t<60?"N":t<80?"G":"O"):this.addResult(t)}))}backToLobby(){cc.audioEngine.stopAll(),this.panelChat.show(!1),cc.director.loadScene("Lobby",()=>{cc.game.removePersistRootNode(this.node);let t=cc.assetManager.getBundle(o.default.App.BUNDLE_NAME.TANLOC);t.releaseAll(),cc.assetManager.removeBundle(t)})}addUserToList(t){}resetUserInList(){}openLiXi(){}addResult(t=null){"number"!=typeof t&&(t=Math.floor(100*Math.random())),this.listResult.push(t);let e=cc.instantiate(this.itemResult);e.active=!0,e.getChildByName("number-ball").getComponent(cc.Label).string=t<10?"0"+t:""+t,e.getChildByName("type-ball").getComponent(cc.Label).string=t<20?"B":t<40?"I":t<60?"N":t<80?"G":"O",this.scrollResult.content.addChild(e),this.scrollResult.scrollToRight(.2),this.checkTicket()}checkTicket(){this.ticket.children.forEach(t=>{this.setCellInTicket(parseInt(t.name),0)}),this.listResult.forEach(t=>{let e=this.ticket.children.find(e=>e.getChildByName("number-cell")&&e.getChildByName("number-cell").getComponent(cc.Label).string==(t<10?"0"+t:""+t));e&&this.setCellInTicket(parseInt(e.name),1)});let t=this.ticket.children.filter(t=>t.getChildByName("number-cell")&&(t.getChildByName("win").active||t.getChildByName("cell_win").active)).map(t=>parseInt(t.name)).sort((t,e)=>t-e),e=[];for(let i=0;i<5;i++){e=[];for(let s=0;s<5;s++)-1!=t.indexOf(5*i+s)&&e.push(5*i+s);if(5==e.length)return this.showLineWin(e);e=[];for(let s=0;s<5;s++)-1!=t.indexOf(i+5*s)&&e.push(i+5*s);if(5==e.length)return this.showLineWin(e)}e=[];for(let i=0;i<5;i++)-1!=t.indexOf(i+5*i)&&e.push(i+5*i);if(5==e.length)return this.showLineWin(e);e=[];for(let i=0;i<5;i++)-1!=t.indexOf(4-i+5*i)&&e.push(4-i+5*i);return 5==e.length?this.showLineWin(e):void 0}addTicket(t){let e=cc.instantiate(this.itemTicket);e.active=!0,e.getChildByName("number").getComponent(cc.Label).string=t<10?"0"+t:""+t,e.getComponent(cc.Toggle).checkEvents[0].customEventData=t+"",this.scrollTicket.content.addChild(e),this.scrollTicket.scrollToRight(.2)}setCellInTicket(t,e=0,i=-1){let s=this.ticket.getChildByName(""+t);s&&(-1!=i&&(s.getChildByName("number-cell").getComponent(cc.Label).string=i<0?"":i<10?"0"+i:""+i),s.getChildByName("win").active=e>0,s.getChildByName("cell_win").active=e>1)}setTicket(t,e){let i=this.listTicket.find(t=>t.id==e);i&&(i.matrix.split(",").reverse().forEach((t,e)=>{this.setCellInTicket(e,0,t)}),this.checkTicket())}clickPlay(){this.isChange||(this.isChange=!0,this.isPlay=!0,this.changeLayout())}clickChat(){this.isChange||(this.isChange=!0,this.isPlay=!1,this.changeLayout(()=>{cc.tween(this.panelChat.node).to(.5,{y:this.isPlay?-280:385,opacity:this.isPlay?0:255},{easing:"quartInOut"}).call(()=>{this.isChange=!1}).start()}))}changeLayout(t=(()=>{})){cc.tween(this.ticket).to(.5,{scale:this.isPlay?1:.5,y:this.isPlay?35:365},{easing:"quartInOut"}).call(()=>{}).start(),cc.tween(this.result).to(.5,{scale:this.isPlay?1:.5,y:this.isPlay?490:460,height:this.isPlay?180:350},{easing:"quartInOut"}).call(()=>{}).start(),cc.tween(this.tickets).to(.5,{scale:this.isPlay?1:.5,y:this.isPlay?-420:265,height:this.isPlay?150:350},{easing:"quartInOut"}).call(()=>{}).start(),t&&t(),this.isPlay&&cc.tween(this.panelChat.node).to(.5,{y:-280,opacity:0},{easing:"quartInOut"}).call(()=>{this.isChange=!1}).start(),this.isPlay=!this.isPlay}hideLineWin(){}showLineWin(t=[-1,-1,-1,-1,-1]){this.stopFake(),t.forEach(t=>{let e=this.ticket.getChildByName(t+"");if(!e)return;if(!e)return cc.log("get cell error "+parseInt(e.name));cc.log("get cell oki"),e.getChildByName("cell_win").active=!0;let i=[];i.push(cc.callFunc(()=>{e.getChildByName("win").active=!1}));for(let s=0;s<5;s++)i.push(cc.sequence(cc.fadeIn(.2),cc.fadeOut(.2)));i.push(cc.callFunc(()=>{e.getChildByName("win").active=!0,this.btnReceive.node.active=!0})),i.push(cc.delayTime(2)),cc.tween(e.getChildByName("cell_win")).repeatForever(cc.sequence(i)).start()})}showWin(){this.animWin.enabled=!0,this.animWin.setAnimation(0,"animation",!1),cc.tween(this.lbWin.node).set({opacity:0}).delay(.1).to(.2,{opacity:255}).delay(1.9).to(.2,{opacity:0}).start()}lineTime(){cc.log("lineTime"),this.schedule(this.runInTime,.01),this.listTicket=[{id:0,matrix:"1,2,3,4,5,11,12,13,14,15,31,32,33,34,35,41,42,43,44,45,51,52,53,54,55"},{id:0,matrix:"1,2,3,4,5,11,12,13,14,15,31,32,33,34,35,41,42,43,44,45,51,52,53,54,55"}],this.listTicket.forEach(t=>{this.addTicket(t.id)})}runInTime(){Math.random()>.1&&this.panelChat.addMessage("test "+Math.floor(10*Math.random()),(new Date).toString(),Math.floor(10*Math.random())),this.time%10==0&&(this.resultFakes[Math.floor(this.time/10)]=this.resultFakes[Math.floor(this.time/10)]||Math.floor(100*Math.random()),this.fakeCmd(p.default.Code.SPIN_RESULT,{spinResult:JSON.stringify({0:this.resultFakes}),currentRound:0})),this.time++}stopFake(){this.unschedule(this.runInTime)}fakeCmd(t,e){switch(t){case p.default.Code.SUBCRIBE_RESPONSE:cc.log(e);break;case p.default.Code.SPIN_RESULT:this.updateSpinRedult(e)}}};T.fund=0,T.numberUserRegister=0,T.numberUserShare=0,T.messResult="",n([f(g.default)],T.prototype,"panelChat",void 0),n([f(cc.Label)],T.prototype,"lbChip",void 0),n([f(cc.Node)],T.prototype,"btnGetTicket",void 0),n([f(cc.Node)],T.prototype,"itemResult",void 0),n([f(cc.ScrollView)],T.prototype,"scrollResult",void 0),n([f(cc.Node)],T.prototype,"itemTicket",void 0),n([f(cc.ScrollView)],T.prototype,"scrollTicket",void 0),n([f(cc.Node)],T.prototype,"ticket",void 0),n([f(cc.Node)],T.prototype,"result",void 0),n([f(cc.Node)],T.prototype,"tickets",void 0),n([f(sp.Skeleton)],T.prototype,"animWin",void 0),n([f(cc.Label)],T.prototype,"lbWin",void 0),n([f(cc.Button)],T.prototype,"btnReceive",void 0),T=s=n([C],T),i.default=T,cc._RF.pop()},{"../../Main/Game/src/common/App":void 0,"../../Main/Game/src/common/BroadcastReceiver":void 0,"../../Main/Game/src/common/Configs":void 0,"../../Main/Game/src/common/Constants":void 0,"../../Main/Game/src/common/Http":void 0,"../../Main/Game/src/common/Tween":void 0,"../../Main/Game/src/common/Utils":void 0,"../../Main/Game/src/networks/Network.InPacket":void 0,"../../Main/Game/src/networks/TanLocNetworkClient":void 0,"./TanLoc.Cmd":"TanLoc.Cmd","./TanLoc.PanelChat":"TanLoc.PanelChat"}],"TanLoc.PanelChat":[function(t,e,i){"use strict";cc._RF.push(e,"1c957brhSxC+rfN0N2xF7TB","TanLoc.PanelChat");var s=this&&this.__decorate||function(t,e,i,s){var n,a=arguments.length,c=a<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,i,s);else for(var o=t.length-1;o>=0;o--)(n=t[o])&&(c=(a<3?n(c):a>3?n(e,i,c):n(e,i))||c);return a>3&&c&&Object.defineProperty(e,i,c),c};Object.defineProperty(i,"__esModule",{value:!0});const n=t("../../Main/Game/src/common/App"),a=t("../../Main/Game/src/common/BroadcastReceiver"),c=t("../../Main/Game/src/common/Constants"),o=t("../../Main/Game/src/common/Utils"),l=t("../../Main/Game/src/networks/MiniGameNetworkClient"),r=t("../../Main/Game/src/networks/Network.InPacket"),h=t("./TanLoc.Cmd"),{ccclass:d,property:u}=cc._decorator;let m=class extends cc.Component{constructor(){super(...arguments),this.itemChatTemplate=null,this.scrMessage=null,this.edbMessage=null,this.atlasVip=null,this.lblToast=null,this.isCanChat=!0}start(){a.default.send(a.default.SET_SOUND,this.node),this.itemChatTemplate.active=!1}show(t){if(this.node.active=t,t){for(var e=0;e<this.scrMessage.content.childrenCount;e++)this.scrMessage.content.children[e].active=!1;l.default.getInstance().send(new h.default.SendScribeChat),l.default.getInstance().addListener(t=>{if(this.node.active)switch(new r.default(t).getCmdId()){case h.default.Code.LOG_CHAT:try{let n=new h.default.ReceiveLogChat(t);if(cc.log(n),n.chatChannel!==c.ChatChannel.LI_XI)break;for(var e=JSON.parse(n.message),i=0;i<e.length;i++)this.addMessage(e[i].u,e[i].m,e[i].vipId)}catch(s){cc.log(s)}null==this||this.scrollToBottom();break;case h.default.Code.SEND_CHAT:{let e=new h.default.ReceiveSendChat(t);if(cc.log(e),e.chatChannel!==c.ChatChannel.LI_XI)break;switch(e.error){case 0:this.addMessage(e.nickname,e.message,e.vip);break;default:n.default.instance.actiontDialog.showMsgWithActions(e.desc,e.suggestionActions)}break}}},this)}else l.default.getInstance().send(new h.default.SendUnScribeChat)}addMessage(t,e,i){let s=null;for(var n=0;n<this.scrMessage.content.childrenCount;n++){let t=this.scrMessage.content.children[n];if(!t.active){s=t;break}}null==s&&(s=this.scrMessage.content.childrenCount>=50?this.scrMessage.content.children[0]:cc.instantiate(this.itemChatTemplate));var a=0;for(n=0;n<this.scrMessage.content.childrenCount;n++){let t=this.scrMessage.content.children[n];t!=s&&(t.zIndex=a++)}s.parent=this.scrMessage.content,s.active=!0,s.zIndex=a++;let c=s.getComponentInChildren(cc.RichText);c.imageAtlas=this.atlasVip;let l=o.default.getColorVip("VIP_"+i),r="<color="+l+"><outline color="+l+"width=1>"+t+"</outline></color> <img src='Vip"+i+"' offset=0,-7/><img src='VIP_"+i+"' offset=0,-7/>:  "+e;c.string=r,this.scrollToBottom()}sendChat(){let t=this.edbMessage.string.trim();0!=t.length&&(this.edbMessage.string="",this.submitChat(t))}submitChat(t){let e=this;if(e.isCanChat){e.isCanChat=!1,this.scheduleOnce(function(){e.isCanChat=!0},1);var i=new h.default.SendChat(unescape(encodeURIComponent(t)));l.default.getInstance().send(i)}else this.showToast("B\u1ea1n thao t\xe1c qu\xe1 nhanh.")}showToast(t){this.lblToast.string=t;let e=this.lblToast.node.parent;e.stopAllActions(),e.active=!0,e.opacity=0,e.runAction(cc.sequence(cc.fadeIn(.1),cc.delayTime(2),cc.fadeOut(.2),cc.callFunc(()=>{e.active=!1})))}scrollToBottom(){this.scrMessage.scrollToBottom(.2)}};s([u(cc.Node)],m.prototype,"itemChatTemplate",void 0),s([u(cc.ScrollView)],m.prototype,"scrMessage",void 0),s([u(cc.EditBox)],m.prototype,"edbMessage",void 0),s([u(cc.SpriteAtlas)],m.prototype,"atlasVip",void 0),s([u(cc.Label)],m.prototype,"lblToast",void 0),m=s([d],m),i.default=m,cc._RF.pop()},{"../../Main/Game/src/common/App":void 0,"../../Main/Game/src/common/BroadcastReceiver":void 0,"../../Main/Game/src/common/Constants":void 0,"../../Main/Game/src/common/Utils":void 0,"../../Main/Game/src/networks/MiniGameNetworkClient":void 0,"../../Main/Game/src/networks/Network.InPacket":void 0,"./TanLoc.Cmd":"TanLoc.Cmd"}]},{},["TanLoc.Button","TanLoc.Cmd","TanLoc.Controller","TanLoc.PanelChat"]);