window.__require=function t(e,s,i){function n(o,r){if(!s[o]){if(!e[o]){var l=o.split("/");if(l=l[l.length-1],!e[l]){var c="function"==typeof __require&&__require;if(!r&&c)return c(l,!0);if(a)return a(l,!0);throw new Error("Cannot find module '"+o+"'")}o=l}var h=s[o]={exports:{}};e[o][0].call(h.exports,function(t){return n(e[o][1][t]||t)},h,h.exports,t,e,s,i)}return s[o].exports}for(var a="function"==typeof __require&&__require,o=0;o<i.length;o++)n(i[o]);return n}({"CaoThap.CaoThapController":[function(t,e,s){"use strict";cc._RF.push(e,"36018wZkFBHeaYfjyMBFEbx","CaoThap.CaoThapController");var i=this&&this.__decorate||function(t,e,s,i){var n,a=arguments.length,o=a<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,s,i);else for(var r=t.length-1;r>=0;r--)(n=t[r])&&(o=(a<3?n(o):a>3?n(e,s,o):n(e,s))||o);return a>3&&o&&Object.defineProperty(e,s,o),o};Object.defineProperty(s,"__esModule",{value:!0}),s.ButtonBet=void 0;const n=t("./CaoThap.Cmd"),a=t("../../Main/Lobby/src/MiniGame"),o=t("../../Main/Game/src/networks/MiniGameNetworkClient"),r=t("../../Main/Game/src/networks/Network.InPacket"),l=t("../../Main/Game/src/common/Utils"),c=t("../../Main/Game/src/common/BroadcastReceiver"),h=t("../../Main/Game/src/common/Configs"),d=t("../../Main/Game/src/common/Tween"),u=t("../../Main/Game/src/common/App"),{ccclass:m,property:p}=cc._decorator;let g=class{constructor(){this.button=null,this.sfNormal=null,this.sfActive=null,this._isActive=!1}setActive(t){this._isActive=t,this.button.getComponent(cc.Sprite).spriteFrame=t?this.sfActive:this.sfNormal,this.button.node.getComponentInChildren(sp.Skeleton).node.active=t,this.button.interactable=!t}};i([p(cc.Button)],g.prototype,"button",void 0),i([p(cc.SpriteFrame)],g.prototype,"sfNormal",void 0),i([p(cc.SpriteFrame)],g.prototype,"sfActive",void 0),g=i([m("CaoThap.ButtonBet")],g),s.ButtonBet=g;let b=class extends a.default{constructor(){super(...arguments),this.sprAtlasCards=null,this.buttonBets=[],this.lblJackpot=null,this.lblSession=null,this.lblUp=null,this.lblCurrent=null,this.lblDown=null,this.lblStatus=null,this.lblTime=null,this.btnNewTurn=null,this.btnClose=null,this.btnPlay=null,this.btnUp=null,this.btnDown=null,this.sprAts=[],this.sprCard=null,this.lblToast=null,this.lblWinCoin=null,this.popups=[],this.listBet=[1e3,1e4,5e4,1e5,5e5],this.betIdx=0,this.oldBetIdx=0,this.isCanChangeBet=!0,this.currentTime=0,this.currentTimeInt=0,this.isPlaying=!1,this.numA=0,this.cardNameMap=new Object}start(){super.start();for(let e=0;e<13;e++)for(let t=0;t<4;t++){let s=(e+2).toString();switch(s){case"11":s="J";break;case"12":s="Q";break;case"13":s="K";break;case"14":s="A"}let i="";switch(t){case 0:i="\u2660";break;case 1:i="\u2663";break;case 2:i="\u2666";break;case 3:i="\u2665"}this.cardNameMap[4*e+t]=s+i}for(let e=0;e<this.buttonBets.length;e++){var t=this.buttonBets[e];t.setActive(e==this.betIdx),t.button.node.on("click",()=>{if(this.isCanChangeBet){this.oldBetIdx=this.betIdx,this.betIdx=e;for(let t=0;t<this.buttonBets.length;t++)this.buttonBets[t].setActive(t==this.betIdx);this.lblCurrent.string=l.default.formatNumber(this.listBet[this.betIdx]),this.isCanChangeBet=!1,this.scheduleOnce(()=>{this.isCanChangeBet=!0},1),o.default.getInstance().send(new n.default.SendChangeRoom(this.oldBetIdx,this.betIdx))}else this.showToast("B\u1ea1n thao t\xe1c qu\xe1 nhanh.")})}c.default.register(c.default.USER_LOGOUT,()=>{this.node.active&&this.dismiss()},this),c.default.register(c.default.USER_DISCONNECTED,()=>{this.node.active&&this.dismiss()},this),o.default.getInstance().addOnClose(()=>{this.node.active&&this.dismiss()},this),o.default.getInstance().addListener(t=>{if(this.node.active)switch(new r.default(t).getCmdId()){case n.default.Code.SCRIBE:{let e=new n.default.ReceiveScribe(t);cc.log(e),this.betIdx=e.roomId,h.default.Login.Coin>=h.default.App.RICH_MAN&&0===this.betIdx&&(this.oldBetIdx=this.betIdx,this.betIdx=1,o.default.getInstance().send(new n.default.SendChangeRoom(this.oldBetIdx,this.betIdx)));for(let t=0;t<this.buttonBets.length;t++)this.buttonBets[t].setActive(t==this.betIdx);this.isPlaying=!1,this.sprCard.spriteFrame=this.sprAtlasCards.getSpriteFrame("card52"),this.btnNewTurn.node.active=!1,this.btnPlay.interactable=!0,this.btnPlay.node.active=!0,this.setSprAt(0),this.numA=0;for(let t=0;t<this.buttonBets.length;t++)this.buttonBets[t].button.interactable=!0;this.lblTime.string="2:00",this.currentTime=0,this.lblUp.string="",this.lblDown.string="",this.lblCurrent.string=l.default.formatNumber(this.listBet[this.betIdx]);break}case n.default.Code.UPDATE_INFO:{let e=new n.default.ReceiveUpdateInfo(t);this.numA=e.numA,this.lblUp.string=0==e.money1?"":l.default.formatNumber(e.money1),this.lblCurrent.string=l.default.formatNumber(e.money2),this.lblDown.string=0==e.money3?"":l.default.formatNumber(e.money3),this.lblSession.string="#"+e.referenceId.toString(),this.sprCard.spriteFrame=this.sprAtlasCards.getSpriteFrame("card"+e.card),this.setSprAt(this.numA),this.currentTime=e.time,this.btnNewTurn.interactable=e.step>1,this.btnNewTurn.node.active=e.step>1,this.btnPlay.node.active=!1,this.lblStatus.string="",this.btnUp.interactable=e.money1>0,this.btnDown.interactable=e.money3>0;for(let t=0;t<this.buttonBets.length;t++)this.buttonBets[t].button.interactable=!1;let s=e.cards.split(",");for(let t=0;t<s.length-1;t++)t>0&&(this.lblStatus.string+=","),this.lblStatus.string+=this.cardNameMap[s[t]];this.isPlaying=!0;break}case n.default.Code.UPDATE_TIME:{let e=new n.default.ReceiveUpdateTime(t);this.currentTime=e.time;break}case n.default.Code.START:{let e=new n.default.ReceiveStart(t);if(cc.log(e),0!=e.error)return u.default.instance.actiontDialog.showMsgWithActions(e.desc,e.suggestionActions),void(3===e.error&&(this.btnPlay.node.active=!0));h.default.Login.Coin=e.currentMoney,c.default.send(c.default.USER_UPDATE_COIN),this.lblStatus.string="",this.lblUp.string="",this.lblDown.string="",this.lblCurrent.string=l.default.formatNumber(e.money2),this.lblSession.string="#"+e.referenceId.toString(),this.setSprAt(0),this.btnNewTurn.interactable=!1,this.btnNewTurn.node.active=!0;for(let t=0;t<this.buttonBets.length;t++)this.buttonBets[t].button.interactable=!1;48!=e.card&&49!=e.card&&50!=e.card&&51!=e.card||this.numA++,this.spinCard(e.card,()=>{this.lblStatus.string+=this.cardNameMap[e.card],this.lblUp.string=0==e.money1?"":l.default.formatNumber(e.money1),this.lblDown.string=0==e.money3?"":l.default.formatNumber(e.money3),this.btnUp.interactable=this.isPlaying&&e.money1>0,this.btnDown.interactable=this.isPlaying&&e.money3>0,this.setSprAt(this.numA)}),this.currentTime=120,this.isPlaying=!0;break}case n.default.Code.PLAY:{let e=new n.default.ReceivePlay(t);this.currentTime=120;for(let t=0;t<this.buttonBets.length;t++)this.buttonBets[t].button.interactable=!1;48!=e.card&&49!=e.card&&50!=e.card&&51!=e.card||this.numA++,this.spinCard(e.card,()=>{""!=this.lblStatus.string&&(this.lblStatus.string+=","),this.lblStatus.string+=this.cardNameMap[e.card],this.lblUp.string=0==e.money1?"":l.default.formatNumber(e.money1),this.lblCurrent.string=l.default.formatNumber(e.money2),this.lblDown.string=0==e.money3?"":l.default.formatNumber(e.money3),this.btnUp.interactable=this.isPlaying&&e.money1>0,this.btnDown.interactable=this.isPlaying&&e.money3>0,this.btnNewTurn.interactable=this.isPlaying,this.btnNewTurn.node.active=!0});break}case n.default.Code.STOP:{let e=new n.default.ReceiveStop(t);this.isPlaying=!1;let s=3;switch(e.result){case 4:s=.5}h.default.Login.Coin=e.currentMoney,this.scheduleOnce(()=>{c.default.send(c.default.USER_UPDATE_COIN),this.lblStatus.string='Nh\u1ea5n n\xfat "Play" \u0111\u1ec3 b\u1eaft \u0111\u1ea7u',this.sprCard.spriteFrame=this.sprAtlasCards.getSpriteFrame("card52"),this.btnNewTurn.node.active=!1,this.btnPlay.node.active=!0,this.setSprAt(0),this.numA=0;for(let t=0;t<this.buttonBets.length;t++)this.buttonBets[t].button.interactable=!0;this.lblTime.string="2:00",this.currentTime=0,this.lblUp.string="",this.lblDown.string="",this.lblCurrent.string=l.default.formatNumber(this.listBet[this.betIdx]),this.lblWinCoin.node.stopAllActions(),this.lblWinCoin.node.y=-16,this.lblWinCoin.node.opacity=0,this.lblWinCoin.string="+"+l.default.formatNumber(e.moneyExchange),this.lblWinCoin.node.active=!0,this.lblWinCoin.node.runAction(cc.sequence(cc.spawn(cc.fadeIn(.2),cc.moveBy(2,cc.v2(0,100))),cc.fadeOut(.15),cc.callFunc(()=>{this.lblWinCoin.node.active=!1})))},s);break}case n.default.Code.CHANGE_ROOM:if(0!=new n.default.ReceiveChangeRoom(t).status){this.betIdx=this.oldBetIdx;for(let t=0;t<this.buttonBets.length;t++)this.buttonBets[t].setActive(t==this.betIdx);this.lblCurrent.string=l.default.formatNumber(this.listBet[this.betIdx])}break;case n.default.Code.UPDATE_JACKPOT:{let e=new n.default.ReceiveUpdateJackpot(t);d.default.numberTo(this.lblJackpot,e.value,.3);break}}},this)}update(t){if(this.currentTime>0){this.currentTime=Math.max(0,this.currentTime-t);let e=parseInt(this.currentTime.toString());this.currentTimeInt!=e&&(this.currentTimeInt=e,this.lblTime.string=this.longToTime(this.currentTimeInt))}}showToast(t){this.lblToast.string=t;let e=this.lblToast.node.parent;e.stopAllActions(),e.active=!0,e.opacity=0,e.runAction(cc.sequence(cc.fadeIn(.1),cc.delayTime(2),cc.fadeOut(.2),cc.callFunc(()=>{e.active=!1})))}spinCard(t,e){let s=15;this.schedule(()=>{0==--s?(this.sprCard.node.color=cc.Color.WHITE,this.sprCard.spriteFrame=this.sprAtlasCards.getSpriteFrame("card"+t),e()):(this.sprCard.node.color=cc.Color.BLACK.fromHEX("#CCCCCC"),this.sprCard.spriteFrame=this.sprAtlasCards.getSpriteFrame("card"+l.default.randomRangeInt(0,52)))},.1,s-1,0)}longToTime(t){let e=t%60;return parseInt((t/60).toString())+":"+(e<10?"0":"")+e}show(){if(this.node.active)this.reOrder();else{super.show(),this.betIdx=0;for(let t=0;t<this.buttonBets.length;t++)this.buttonBets[t].setActive(t==this.betIdx);o.default.getInstance().send(new n.default.SendScribe(this.betIdx)),this.lblToast.node.parent.active=!1,this.lblStatus.string='Nh\u1ea5n n\xfat "Play" \u0111\u1ec3 b\u1eaft \u0111\u1ea7u',this.lblSession.string="",this.lblUp.string="",this.lblDown.string="",this.lblCurrent.string=l.default.formatNumber(this.listBet[this.betIdx]),this.setSprAt(0),this.btnNewTurn.interactable=!1,this.btnNewTurn.node.active=!1,this.btnUp.interactable=!1,this.btnDown.interactable=!1,this.btnPlay.interactable=!1,this.lblWinCoin.node.active=!1,this.isCanChangeBet=!0}}actStart(){this.btnPlay.node.active=!1,o.default.getInstance().send(new n.default.SendStart(this.listBet[this.betIdx]))}actUp(){this.btnUp.interactable=!1,this.btnDown.interactable=!1,this.btnNewTurn.interactable=!1,o.default.getInstance().send(new n.default.SendPlay(this.listBet[this.betIdx],!0))}actDown(){this.btnUp.interactable=!1,this.btnDown.interactable=!1,this.btnNewTurn.interactable=!1,o.default.getInstance().send(new n.default.SendPlay(this.listBet[this.betIdx],!1))}actStop(){this.btnNewTurn.interactable=!1,this.btnNewTurn.node.active=!1,o.default.getInstance().send(new n.default.SendStop(this.listBet[this.betIdx]))}dismiss(){super.dismiss();for(let t=0;t<this.popups.length;t++)this.popups[t].active=!1;o.default.getInstance().send(new n.default.SendUnScribe(this.betIdx))}setSprAt(t){for(let e=0;e<this.sprAts.length;e++)this.sprAts[e].interactable=e<t}};i([p(cc.SpriteAtlas)],b.prototype,"sprAtlasCards",void 0),i([p([g])],b.prototype,"buttonBets",void 0),i([p(cc.Label)],b.prototype,"lblJackpot",void 0),i([p(cc.Label)],b.prototype,"lblSession",void 0),i([p(cc.Label)],b.prototype,"lblUp",void 0),i([p(cc.Label)],b.prototype,"lblCurrent",void 0),i([p(cc.Label)],b.prototype,"lblDown",void 0),i([p(cc.Label)],b.prototype,"lblStatus",void 0),i([p(cc.Label)],b.prototype,"lblTime",void 0),i([p(cc.Button)],b.prototype,"btnNewTurn",void 0),i([p(cc.Button)],b.prototype,"btnClose",void 0),i([p(cc.Button)],b.prototype,"btnPlay",void 0),i([p(cc.Button)],b.prototype,"btnUp",void 0),i([p(cc.Button)],b.prototype,"btnDown",void 0),i([p([cc.Button])],b.prototype,"sprAts",void 0),i([p(cc.Sprite)],b.prototype,"sprCard",void 0),i([p(cc.Label)],b.prototype,"lblToast",void 0),i([p(cc.Label)],b.prototype,"lblWinCoin",void 0),i([p([cc.Node])],b.prototype,"popups",void 0),b=i([m],b),s.default=b,cc._RF.pop()},{"../../Main/Game/src/common/App":void 0,"../../Main/Game/src/common/BroadcastReceiver":void 0,"../../Main/Game/src/common/Configs":void 0,"../../Main/Game/src/common/Tween":void 0,"../../Main/Game/src/common/Utils":void 0,"../../Main/Game/src/networks/MiniGameNetworkClient":void 0,"../../Main/Game/src/networks/Network.InPacket":void 0,"../../Main/Lobby/src/MiniGame":void 0,"./CaoThap.Cmd":"CaoThap.Cmd"}],"CaoThap.Cmd":[function(t,e,s){"use strict";cc._RF.push(e,"f5d2dv+EAxA86iOBlbg0cVg","CaoThap.Cmd"),Object.defineProperty(s,"__esModule",{value:!0}),s.cmd=void 0;const i=t("../../Main/Game/src/networks/Network.OutPacket"),n=t("../../Main/Game/src/networks/Network.InPacket"),a=t("../../Main/Game/src/common/Configs"),o=t("../../Main/Game/src/common/Constants"),{ccclass:r,property:l}=cc._decorator;var c;(function(t){class e{}e.SCRIBE=6004,e.UNSCRIBE=6005,e.START=6001,e.PLAY=6002,e.CHANGE_ROOM=6006,e.UPDATE_TIME=6008,e.UPDATE_INFO=6009,e.UPDATE_JACKPOT=6003,e.STOP=6007,t.Code=e,t.SendScribe=class extends i.default{constructor(t){super(),this.initData(100),this.setControllerId(1),this.setCmdId(e.SCRIBE),this.packHeader(),this.putByte(t),this.updateSize()}},t.ReceiveScribe=class extends n.default{constructor(t){super(t),this.status=0,this.roomId=0,this.status=this.getByte(),this.roomId=this.getByte()}},t.SendUnScribe=class extends i.default{constructor(t){super(),this.initData(100),this.setControllerId(1),this.setCmdId(e.UNSCRIBE),this.packHeader(),this.putByte(t),this.updateSize()}},t.SendChangeRoom=class extends i.default{constructor(t,s){super(),this.initData(100),this.setControllerId(1),this.setCmdId(e.CHANGE_ROOM),this.packHeader(),this.putByte(t),this.putByte(s),this.updateSize()}},t.ReceiveChangeRoom=class extends n.default{constructor(t){super(t),this.status=0,this.status=this.getByte()}},t.SendStart=class extends i.default{constructor(t){super(),this.initData(100),this.setControllerId(1),this.setCmdId(e.START),this.packHeader(),this.putInt(t),this.putByte(a.default.App.MONEY_TYPE),this.updateSize()}},t.ReceiveStart=class extends n.default{constructor(t){super(t),this.error=0,this.referenceId=0,this.card=0,this.money1=0,this.money2=0,this.money3=0,this.currentMoney=0,this.desc="",this.suggestionActions=[],this.error=this.getError(),this.referenceId=this.getLong(),this.card=this.getByte(),this.money1=this.getLong(),this.money2=this.getLong(),this.money3=this.getLong(),this.currentMoney=this.getLong(),this.desc=this.getString();let e=this.getString();if(e){let t=JSON.parse(e);(null==t?void 0:t.hasOwnProperty("object"))&&Array.isArray(t.object)&&(this.suggestionActions=o.UserActions.toEnums(t.object))}}},t.SendPlay=class extends i.default{constructor(t,s){super(),this.initData(100),this.setControllerId(1),this.setCmdId(e.PLAY),this.packHeader(),this.putInt(t),this.putByte(a.default.App.MONEY_TYPE),this.putByte(s?1:0),this.updateSize()}},t.ReceivePlay=class extends n.default{constructor(t){super(t),this.card=0,this.money1=0,this.money2=0,this.money3=0,this.card=this.getByte(),this.money1=this.getLong(),this.money2=this.getLong(),this.money3=this.getLong()}},t.SendStop=class extends i.default{constructor(t){super(),this.initData(100),this.setControllerId(1),this.setCmdId(e.STOP),this.packHeader(),this.putInt(t),this.putByte(a.default.App.MONEY_TYPE),this.updateSize()}},t.ReceiveStop=class extends n.default{constructor(t){super(t),this.result=0,this.currentMoney=0,this.moneyExchange=0,this.result=this.getByte(),this.currentMoney=this.getLong(),this.moneyExchange=this.getLong()}},t.ReceiveUpdateInfo=class extends n.default{constructor(t){super(t),this.numA=0,this.card=0,this.money1=0,this.money2=0,this.money3=0,this.time=0,this.step=0,this.referenceId=0,this.cards="",this.numA=this.getByte(),this.card=this.getByte(),this.money1=this.getLong(),this.money2=this.getLong(),this.money3=this.getLong(),this.time=this.getShort(),this.step=this.getByte(),this.referenceId=this.getLong(),this.cards=this.getString()}},t.ReceiveUpdateJackpot=class extends n.default{constructor(t){super(t),this.value=0,this.value=this.getLong()}},t.ReceiveUpdateTime=class extends n.default{constructor(t){super(t),this.time=0,this.time=this.getShort()}}})(c=s.cmd||(s.cmd={})),s.default=c,cc._RF.pop()},{"../../Main/Game/src/common/Configs":void 0,"../../Main/Game/src/common/Constants":void 0,"../../Main/Game/src/networks/Network.InPacket":void 0,"../../Main/Game/src/networks/Network.OutPacket":void 0}],"CaoThap.PopupHistory":[function(t,e,s){"use strict";cc._RF.push(e,"ca485p4tQhO3JvdidJzPzNa","CaoThap.PopupHistory");var i=this&&this.__decorate||function(t,e,s,i){var n,a=arguments.length,o=a<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,s,i);else for(var r=t.length-1;r>=0;r--)(n=t[r])&&(o=(a<3?n(o):a>3?n(e,s,o):n(e,s))||o);return a>3&&o&&Object.defineProperty(e,s,o),o};Object.defineProperty(s,"__esModule",{value:!0});const n=t("../../Main/Game/src/common/Dialog"),a=t("../../Main/Game/src/common/Configs"),o=t("../../Main/Game/src/common/App"),r=t("../../Main/Game/src/common/Http"),l=t("../../Main/Game/src/common/Utils"),{ccclass:c,property:h}=cc._decorator;let d=class extends n.default{constructor(){super(...arguments),this.lblPage=null,this.itemTemplate=null,this.page=1,this.maxPage=1,this.items=new Array}show(){super.show();for(let t=0;t<this.items.length;t++)this.items[t].active=!1;null!=this.itemTemplate&&(this.itemTemplate.active=!1)}dismiss(){super.dismiss();for(let t=0;t<this.items.length;t++)this.items[t].active=!1}_onShowed(){super._onShowed(),this.page=1,this.maxPage=1,this.lblPage.string=this.page+"/"+this.maxPage,this.loadData()}actNextPage(){this.page<this.maxPage&&(this.page++,this.lblPage.string=this.page+"/"+this.maxPage,this.loadData())}actPrevPage(){this.page>1&&(this.page--,this.lblPage.string=this.page+"/"+this.maxPage,this.loadData())}loadData(){o.default.instance.showLoading(!0),r.default.get(a.default.App.API,{c:107,mt:a.default.App.MONEY_TYPE,p:this.page,nn:a.default.Login.Nickname},(t,e)=>{if(o.default.instance.showLoading(!1),null==t&&e.success){if(0==this.items.length){for(var s=0;s<10;s++){let t=cc.instantiate(this.itemTemplate);t.parent=this.itemTemplate.parent,this.items.push(t)}this.itemTemplate.destroy(),this.itemTemplate=null}this.maxPage=e.totalPages,this.lblPage.string=this.page+"/"+this.maxPage;for(let t=0;t<this.items.length;t++){let s=this.items[t];if(t<e.results.length){let i=e.results[t];s.getChildByName("bg").opacity=t%2==0?255:0,s.getChildByName("Time").getComponent(cc.Label).string=i.transId+"\n"+i.timestamp.replace(" ","\n"),s.getChildByName("Bet").getComponent(cc.Label).string=l.default.formatMoney(i.betValue),s.getChildByName("Result").getComponent(cc.Label).string=i.cards,s.getChildByName("Win").getComponent(cc.Label).string=l.default.formatMoney(i.prize),s.getChildByName("Step").getComponent(cc.Label).string=l.default.formatMoney(i.step),1==i.step?s.getChildByName("BetDoor").getComponent(cc.Label).string="":s.getChildByName("BetDoor").getComponent(cc.Label).string=0==i.potBet?"D\u01b0\u1edbi":"Tr\xean",s.active=!0}else s.active=!1}}})}};i([h(cc.Label)],d.prototype,"lblPage",void 0),i([h(cc.Node)],d.prototype,"itemTemplate",void 0),d=i([c],d),s.default=d,cc._RF.pop()},{"../../Main/Game/src/common/App":void 0,"../../Main/Game/src/common/Configs":void 0,"../../Main/Game/src/common/Dialog":void 0,"../../Main/Game/src/common/Http":void 0,"../../Main/Game/src/common/Utils":void 0}],"CaoThap.PopupHonors":[function(t,e,s){"use strict";cc._RF.push(e,"2102dKYcKJPSaCuwo7ODtFN","CaoThap.PopupHonors");var i=this&&this.__decorate||function(t,e,s,i){var n,a=arguments.length,o=a<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,s,i);else for(var r=t.length-1;r>=0;r--)(n=t[r])&&(o=(a<3?n(o):a>3?n(e,s,o):n(e,s))||o);return a>3&&o&&Object.defineProperty(e,s,o),o};Object.defineProperty(s,"__esModule",{value:!0});const n=t("../../Main/Game/src/common/Dialog"),a=t("../../Main/Game/src/common/App"),o=t("../../Main/Game/src/common/Http"),r=t("../../Main/Game/src/common/Configs"),l=t("../../Main/Game/src/common/Utils"),c=t("../../Main/Game/src/common/ErrorLogger"),{ccclass:h,property:d}=cc._decorator;let u=class extends n.default{constructor(){super(...arguments),this.lblPage=null,this.itemTemplate=null,this.atlasVip=null,this.page=1,this.maxPage=1,this.items=new Array}show(){super.show();for(let t=0;t<this.items.length;t++)this.items[t].active=!1;null!=this.itemTemplate&&(this.itemTemplate.active=!1)}dismiss(){super.dismiss();for(let t=0;t<this.items.length;t++)this.items[t].active=!1}_onShowed(){super._onShowed(),this.page=1,this.maxPage=1,this.lblPage.string=this.page+"/"+this.maxPage,this.loadData()}actNextPage(){this.page<this.maxPage&&(this.page++,this.lblPage.string=this.page+"/"+this.maxPage,this.loadData())}actPrevPage(){this.page>1&&(this.page--,this.lblPage.string=this.page+"/"+this.maxPage,this.loadData())}loadData(){a.default.instance.showLoading(!0),o.default.get(r.default.App.API,{c:108,mt:r.default.App.MONEY_TYPE,p:this.page},(t,e)=>{if(a.default.instance.showLoading(!1),null==t){cc.log(e);try{if(e.success){if(0==this.items.length){for(var s=0;s<10;s++){let t=cc.instantiate(this.itemTemplate);t.parent=this.itemTemplate.parent,this.items.push(t)}this.itemTemplate.destroy(),this.itemTemplate=null}this.maxPage=e.totalPages,this.lblPage.string=this.page+"/"+this.maxPage;for(let t=this.items.length-1;t>=0;t--){let s=this.items[t];if(t<e.results.length){let i=e.results[t],n=e.listUserVipRank&&e.listUserVipRank.find(t=>t.nickname==i.nickname);switch(s.active=!1,s.getChildByName("bg").opacity=t%2==0?10:0,s.getChildByName("Time").getComponent(cc.Label).string=i.timestamp.replace(" ","\n"),s.getChildByName("name").getChildByName("lblAccount").getComponent(cc.Label).string=i.nickname.length>11?i.nickname.substr(0,10)+"...":i.nickname,s.getChildByName("name").getChildByName("lblAccount").color=n?cc.Color.BLACK.fromHEX(l.default.getColorVip(n.rank)):cc.Color.BLACK.fromHEX(l.default.getColorVip("VIP_0")),s.getChildByName("name").getChildByName("lblAccount").getComponent(cc.LabelOutline).color=n?cc.Color.BLACK.fromHEX(l.default.getColorVip(n.rank)):cc.Color.BLACK.fromHEX(l.default.getColorVip("VIP_0")),s.getChildByName("name").getChildByName("vip").getComponent(cc.Sprite).spriteFrame=this.atlasVip.getSpriteFrame(n.rank),s.getChildByName("Bet").getComponent(cc.Label).string=l.default.formatMoney(i.betValue),s.getChildByName("Win").getComponent(cc.Label).string=l.default.formatMoney(i.prize),i.result){case 4:s.getChildByName("Result").getComponent(cc.Label).string="Th\u1eafng l\u1edbn";break;default:s.getChildByName("Result").getComponent(cc.Label).string="N\u1ed5 h\u0169"}s.active=!0,s.position=cc.v3(cc.winSize.width,400),s.stopAllActions();let a=.7;s.runAction(cc.sequence(cc.delayTime(.15*(this.items.length-t)*a),cc.moveTo(.15*a,cc.v2(0,400)),cc.delayTime(.05),cc.moveTo(.2*a*(1===t?.8:1-Math.pow(2,-10*t)),cc.v2(0,380-85*t)).easing(cc.easeCircleActionOut())))}else s.active=!1}}}catch(i){c.ErrorLogger.sendLogError("Http response","Cao thap honor",JSON.stringify(e)+"\n"+JSON.stringify(i.stack))}}})}};i([d(cc.Label)],u.prototype,"lblPage",void 0),i([d(cc.Node)],u.prototype,"itemTemplate",void 0),i([d(cc.SpriteAtlas)],u.prototype,"atlasVip",void 0),u=i([h],u),s.default=u,cc._RF.pop()},{"../../Main/Game/src/common/App":void 0,"../../Main/Game/src/common/Configs":void 0,"../../Main/Game/src/common/Dialog":void 0,"../../Main/Game/src/common/ErrorLogger":void 0,"../../Main/Game/src/common/Http":void 0,"../../Main/Game/src/common/Utils":void 0}]},{},["CaoThap.CaoThapController","CaoThap.Cmd","CaoThap.PopupHistory","CaoThap.PopupHonors"]);