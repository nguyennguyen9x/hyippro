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
  "ShootFish.Bullet": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "36d2bcC+d9JWLYn26kehzX6", "ShootFish.Bullet");
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
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const ShootFish_Play_1 = require("./ShootFish.Play");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let Bullet = class Bullet extends cc.Component {
      constructor() {
        super(...arguments);
        this.bullet = null;
        this.fishNet = null;
        this.id = "";
        this.targetFishId = -1;
        this.worldSize = cc.size(1280, 720);
        this.exploreDuration = .8;
        this.vX = 0;
        this.vY = 0;
        this.collisionCount = 4;
        this.isExplored = false;
        this.isExploring = false;
        this.curExplore = 0;
        this.circle = null;
      }
      onLoad() {
        BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.SET_SOUND, this.node);
      }
      run() {
        let speed = Number(ShootFish_Play_1.default.SERVER_CONFIG["BulletSpeed"]);
        (isNaN(speed) || 0 == speed) && (speed = 1400);
        let v = Utils_1.default.degreesToVec2(this.node.angle);
        this.vX = v.x * speed;
        this.vY = v.y * speed;
        this.collisionCount = 4;
        this.isExplored = false;
        this.isExploring = false;
        this.bullet.active = true;
        this.fishNet.active = false;
        this.circle = new SAT.Circle(new SAT.Vector(this.node.position.x, this.node.position.y), Number(ShootFish_Play_1.default.SERVER_CONFIG["BulletRadius"]));
      }
      updateRealTime(dt) {
        if (this.isExplored) return;
        if (this.isExploring) {
          this.curExplore -= dt;
          if (this.curExplore <= 0) {
            this.isExplored = true;
            this.node.active = false;
          }
          return;
        }
        var newPos = this.node.position;
        newPos.x += this.vX * dt;
        newPos.y += this.vY * dt;
        this.node.position = newPos;
        if (Math.abs(newPos.x) > this.worldSize.width / 2) {
          this.vX *= -1;
          var angle = Math.atan2(this.vY, this.vX) * Utils_1.default.Rad2Deg;
          this.node.angle = angle;
          newPos.x = (newPos.x < 0 ? -1 : 1) * this.worldSize.width / 2;
          this.node.position = newPos;
          this.collisionCount--;
        } else if (Math.abs(newPos.y) > this.worldSize.height / 2) {
          this.vY *= -1;
          var angle = Math.atan2(this.vY, this.vX) * Utils_1.default.Rad2Deg;
          this.node.angle = angle;
          newPos.y = (newPos.y < 0 ? -1 : 1) * this.worldSize.height / 2;
          this.node.position = newPos;
          this.collisionCount--;
        }
        this.circle.pos = new SAT.Vector(this.node.position.x, this.node.position.y);
        this.collisionCount < 0 && (this.node.active = false);
      }
      explore() {
        this.isExploring = true;
        this.curExplore = this.exploreDuration;
        this.bullet.active = false;
        this.fishNet.active = true;
        this.fishNet.opacity = 0;
        this.fishNet.angle = 0;
        this.fishNet.scale = 0;
        this.fishNet.stopAllActions();
        this.fishNet.runAction(cc.spawn(cc.sequence(cc.scaleTo(.3, 1.1), cc.delayTime(.07), cc.scaleTo(.3, 1)), cc.fadeIn(.1), cc.sequence(cc.delayTime(.25), cc.rotateTo(.5, 35)), cc.sequence(cc.delayTime(.4), cc.fadeOut(.3))));
      }
      getCircle() {
        return this.circle;
      }
    };
    __decorate([ property(cc.Node) ], Bullet.prototype, "bullet", void 0);
    __decorate([ property(cc.Node) ], Bullet.prototype, "fishNet", void 0);
    Bullet = __decorate([ ccclass ], Bullet);
    exports.default = Bullet;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/BroadcastReceiver": void 0,
    "../../Main/Game/src/common/Utils": void 0,
    "./ShootFish.Play": "ShootFish.Play"
  } ],
  "ShootFish.CoinEffect": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f3de4Savp5BHqfZYOvwMNmn", "ShootFish.CoinEffect");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let CoinEffect = class CoinEffect extends cc.Component {
      constructor() {
        super(...arguments);
        this.lblCoin = null;
        this.coinExplore = null;
        this.coin0 = null;
        this.coin1 = null;
        this.coin2 = null;
      }
      run(coin, startPos, toPos) {
        this.coinExplore.node.position = startPos;
        this.coin0.stopAllActions();
        this.coin0.position = startPos.clone().add(cc.v2(Utils_1.default.randomRange(80, -80), Utils_1.default.randomRange(80, -80)));
        this.coin0.scale = 0;
        this.coin1.stopAllActions();
        this.coin1.position = startPos.clone().add(cc.v2(Utils_1.default.randomRange(80, -80), Utils_1.default.randomRange(80, -80)));
        this.coin1.scale = 0;
        this.coin2.stopAllActions();
        this.coin2.position = startPos.clone().add(cc.v2(Utils_1.default.randomRange(80, -80), Utils_1.default.randomRange(80, -80)));
        this.coin2.scale = 0;
        this.lblCoin.string = Utils_1.default.formatNumber(coin);
        this.lblCoin.node.position = startPos;
        this.lblCoin.node.stopAllActions();
        this.lblCoin.node.opacity = 0;
        this.lblCoin.node.scale = 0;
        this.lblCoin.node.runAction(cc.sequence(cc.spawn(cc.fadeIn(.2), cc.scaleTo(.2, 1)), cc.moveBy(.1, new cc.Vec2(0, 5)), cc.moveBy(.1, new cc.Vec2(0, -5)), cc.moveBy(.1, new cc.Vec2(0, 5)), cc.moveBy(.1, new cc.Vec2(0, -5)), cc.moveBy(.1, new cc.Vec2(0, 5)), cc.moveBy(.1, new cc.Vec2(0, -5)), cc.moveBy(.1, new cc.Vec2(0, 5)), cc.moveBy(.1, new cc.Vec2(0, -5)), cc.fadeOut(.15)));
        this.coinExplore.setAnimation(0, "Idle", false);
        this.coin0.runAction(cc.sequence(cc.scaleTo(.15, Utils_1.default.randomRange(.7, 1)), cc.delayTime(.4), cc.moveBy(.1, new cc.Vec2(0, 50)), cc.moveBy(.1, new cc.Vec2(0, -50)), cc.moveBy(.1, new cc.Vec2(0, 50)), cc.moveBy(.1, new cc.Vec2(0, -50)), cc.moveTo(.7, toPos), cc.scaleTo(.15, 0)));
        this.coin1.runAction(cc.sequence(cc.scaleTo(.15, Utils_1.default.randomRange(.7, 1)), cc.delayTime(.55), cc.moveBy(.1, new cc.Vec2(0, 50)), cc.moveBy(.1, new cc.Vec2(0, -50)), cc.moveBy(.1, new cc.Vec2(0, 50)), cc.moveBy(.1, new cc.Vec2(0, -50)), cc.moveTo(.7, toPos), cc.scaleTo(.15, 0)));
        this.coin2.runAction(cc.sequence(cc.scaleTo(.15, Utils_1.default.randomRange(.7, 1)), cc.delayTime(.7), cc.moveBy(.1, new cc.Vec2(0, 50)), cc.moveBy(.1, new cc.Vec2(0, -50)), cc.moveBy(.1, new cc.Vec2(0, 50)), cc.moveBy(.1, new cc.Vec2(0, -50)), cc.moveTo(.7, toPos), cc.scaleTo(.15, 0), cc.callFunc(() => {
          this.node.active = false;
        })));
      }
    };
    __decorate([ property(cc.Label) ], CoinEffect.prototype, "lblCoin", void 0);
    __decorate([ property(sp.Skeleton) ], CoinEffect.prototype, "coinExplore", void 0);
    __decorate([ property(cc.Node) ], CoinEffect.prototype, "coin0", void 0);
    __decorate([ property(cc.Node) ], CoinEffect.prototype, "coin1", void 0);
    __decorate([ property(cc.Node) ], CoinEffect.prototype, "coin2", void 0);
    CoinEffect = __decorate([ ccclass ], CoinEffect);
    exports.default = CoinEffect;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/Utils": void 0
  } ],
  "ShootFish.EffectBigWin": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3e4a4YbN9FGnbtYmPvTrs9e", "ShootFish.EffectBigWin");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let EffectBigWin = class EffectBigWin extends cc.Component {
      constructor() {
        super(...arguments);
        this.skeleton = null;
        this.lblNickname = null;
        this.lblCoin = null;
      }
      show(isShow, nickname = null, coin = 0) {
        this.node.stopAllActions();
        if (isShow) {
          this.lblCoin.string = Utils_1.default.formatNumber(coin);
          this.lblCoin.node.active = false;
          this.lblNickname.string = nickname;
          this.lblNickname.node.active = false;
          this.skeleton.setAnimation(0, "animation", false);
          this.node.active = true;
          this.node.runAction(cc.sequence(cc.delayTime(.7), cc.callFunc(() => {
            this.lblNickname.node.active = true;
            this.lblCoin.node.active = true;
          }), cc.delayTime(3), cc.callFunc(() => {
            this.node.active = false;
          })));
        } else this.node.active = false;
      }
    };
    __decorate([ property(sp.Skeleton) ], EffectBigWin.prototype, "skeleton", void 0);
    __decorate([ property(cc.Label) ], EffectBigWin.prototype, "lblNickname", void 0);
    __decorate([ property(cc.Label) ], EffectBigWin.prototype, "lblCoin", void 0);
    EffectBigWin = __decorate([ ccclass ], EffectBigWin);
    exports.default = EffectBigWin;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/Utils": void 0
  } ],
  "ShootFish.EffectJackpot": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ce53aga3XZMIaymrxUZy+Ja", "ShootFish.EffectJackpot");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let EffectJackpot = class EffectJackpot extends cc.Component {
      constructor() {
        super(...arguments);
        this.skeletons = [];
        this.lblNickname = null;
        this.lblCoin = null;
      }
      show(isShow, nickname = null, coin = 0) {
        this.node.stopAllActions();
        if (isShow) {
          this.lblCoin.string = Utils_1.default.formatNumber(coin);
          this.lblCoin.node.active = false;
          this.lblNickname.string = nickname;
          this.lblNickname.node.active = false;
          for (let i = 0; i < this.skeletons.length; i++) this.skeletons[i].setAnimation(0, "Idle", false);
          this.node.active = true;
          this.node.runAction(cc.sequence(cc.delayTime(.7), cc.callFunc(() => {
            this.lblNickname.node.active = true;
            this.lblCoin.node.active = true;
          }), cc.delayTime(5), cc.callFunc(() => {
            this.node.active = false;
          })));
        } else this.node.active = false;
      }
    };
    __decorate([ property([ sp.Skeleton ]) ], EffectJackpot.prototype, "skeletons", void 0);
    __decorate([ property(cc.Label) ], EffectJackpot.prototype, "lblNickname", void 0);
    __decorate([ property(cc.Label) ], EffectJackpot.prototype, "lblCoin", void 0);
    EffectJackpot = __decorate([ ccclass ], EffectJackpot);
    exports.default = EffectJackpot;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/Utils": void 0
  } ],
  "ShootFish.Fish": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8dcf1d04CtOE75piBWi/t9b", "ShootFish.Fish");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const ShootFish_Play_1 = require("./ShootFish.Play");
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const ShootFishNetworkClient_1 = require("../../Main/Game/src/networks/ShootFishNetworkClient");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let Fish = class Fish extends cc.Component {
      constructor() {
        super(...arguments);
        this.anim = null;
        this.lblId = null;
        this.isDie = false;
        this.type = -1;
        this.polygon = null;
        this.dataPointsUpdate = [];
        this.currentStep = 0;
        this.currentTimeStep = -1;
        this.currentVStepX = 0;
        this.currentVStepY = 0;
      }
      setData(fishData) {
        this.id = fishData["id"];
        this.lblId.string = this.id.toString();
        if (fishData["h"] <= 0 || 0 == fishData["path"].length) {
          this.die();
          0 == fishData["path"].length && console.log("fishData path length = 0");
          return;
        }
        if (this.type != fishData["t"]) {
          this.type = fishData["t"];
          this.anim.removeAllChildren();
          let animNode = cc.instantiate(ShootFish_Play_1.default.instance.getFishAnimByType(this.type));
          animNode.parent = this.anim;
          let width = fishData["H"];
          let height = fishData["w"];
          this.polygon = new SAT.Box(new SAT.Vector(0, 0), width, height).toPolygon();
          this.polygon.translate(-width / 2, -height / 2);
          this.node.width = width;
          this.node.height = height;
        }
        let dX = Number(fishData["dx"]);
        let dY = Number(fishData["dy"]);
        let posX = Number(fishData["px"]);
        let posY = Number(fishData["py"]);
        let path = fishData["path"];
        let time = ShootFishNetworkClient_1.default.serverCurrentTimeMillis();
        this.node.angle = Math.atan2(dY, dX) * Utils_1.default.Rad2Deg;
        let dataPoints = [];
        for (var i = 0; i < path.length; i++) {
          var dataP = {
            t: Number(path[i]["t"])
          };
          dataP["p"] = cc.v2(Number(path[i]["x"]), Number(path[i]["y"]));
          switch (ShootFish_Play_1.default.instance.mePlayer.serverPos) {
           case 1:
            dataP["p"] = cc.v2(-Number(path[i]["x"]), Number(path[i]["y"]));
            break;

           case 2:
            dataP["p"] = cc.v2(-Number(path[i]["x"]), -Number(path[i]["y"]));
            break;

           case 3:
            dataP["p"] = cc.v2(Number(path[i]["x"]), -Number(path[i]["y"]));
          }
          dataPoints.push(dataP);
        }
        this.node.position = cc.v2(posX, posY);
        switch (ShootFish_Play_1.default.instance.mePlayer.serverPos) {
         case 1:
          this.node.position = cc.v2(-posX, posY);
          break;

         case 2:
          this.node.position = cc.v2(-posX, -posY);
          break;

         case 3:
          this.node.position = cc.v2(posX, -posY);
        }
        let isFirstPoint = true;
        let point = -1;
        this.dataPointsUpdate.length = 0;
        for (let i = 1; i < dataPoints.length; i++) {
          let data1 = dataPoints[i - 1];
          let data2 = dataPoints[i];
          let p1 = data1["p"];
          let p2 = data2["p"];
          let t1 = data1["t"];
          let t2 = data2["t"];
          if (time - t2 < 0) {
            point < 0 && (point = i);
            let deltaPos = p2.clone().sub(p1);
            let angle = Math.atan2(deltaPos.y, deltaPos.x) * Utils_1.default.Rad2Deg;
            let timeMove = 0;
            if (isFirstPoint) {
              timeMove = (t2 - time) / 1e3;
              isFirstPoint = false;
            } else timeMove = (t2 - t1) / 1e3;
            this.dataPointsUpdate.push({
              p: p2,
              t: timeMove,
              a: angle,
              tms: t2
            });
          }
        }
        this.currentTimeStep = -1;
        this.currentStep = 0;
        this.currentVStepX = 0;
        this.currentVStepY = 0;
        if (this.dataPointsUpdate.length > 0) {
          this.currentTimeStep = this.dataPointsUpdate[this.currentStep]["t"];
          let moveToPos = this.dataPointsUpdate[this.currentStep]["p"];
          let deltaPos = moveToPos.sub(this.node.position);
          this.currentVStepX = deltaPos.x / this.currentTimeStep;
          this.currentVStepY = deltaPos.y / this.currentTimeStep;
          this.node.angle = this.dataPointsUpdate[this.currentStep]["a"];
        } else console.log("can't find path: " + this.id);
        this.isDie = false;
        this.node.active = true;
      }
      updateRealTime(dt) {
        if (!this.node.active || this.isDie) return;
        if (this.dataPointsUpdate.length > 0 && this.currentTimeStep >= 0) {
          let pos = this.node.position;
          this.currentTimeStep -= dt;
          if (this.currentTimeStep < 0) {
            this.currentStep++;
            if (this.currentStep < this.dataPointsUpdate.length) {
              this.currentTimeStep = this.dataPointsUpdate[this.currentStep]["t"] + Math.abs(this.currentTimeStep);
              this.node.angle = this.dataPointsUpdate[this.currentStep]["a"];
              this.polygon.angle = this.node.angle * Utils_1.default.Deg2Rad;
              let moveToPos = this.dataPointsUpdate[this.currentStep]["p"];
              let deltaPos = moveToPos.sub(pos);
              this.currentVStepX = deltaPos.x / this.currentTimeStep;
              this.currentVStepY = deltaPos.y / this.currentTimeStep;
            }
          }
          pos.x += this.currentVStepX * dt;
          pos.y += this.currentVStepY * dt;
          this.node.position = pos;
        }
      }
      die() {
        this.isDie = true;
        this.node.active = false;
      }
      getPolygon() {
        this.polygon.pos = new SAT.Vector(this.node.position.x, this.node.position.y);
        return this.polygon;
      }
      hurt() {
        if (0 == this.anim.children.length || 0 == this.anim.children[0].children.length) return;
        this.anim.children[0].children[0].stopActionByTag(99);
        var action = cc.sequence(cc.tintTo(.05, 255, 54, 54), cc.delayTime(.1), cc.tintTo(.05, 255, 255, 255));
        action.setTag(99);
        this.anim.children[0].children[0].runAction(action);
      }
    };
    __decorate([ property(cc.Node) ], Fish.prototype, "anim", void 0);
    __decorate([ property(cc.Label) ], Fish.prototype, "lblId", void 0);
    Fish = __decorate([ ccclass ], Fish);
    exports.default = Fish;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/Utils": void 0,
    "../../Main/Game/src/networks/ShootFishNetworkClient": void 0,
    "./ShootFish.Play": "ShootFish.Play"
  } ],
  "ShootFish.Lobby": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4378bty4U5E8KWt2uwkMkhd", "ShootFish.Lobby");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var Lobby_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const ShootFish_Play_1 = require("./ShootFish.Play");
    const App_1 = require("../../Main/Game/src/common/App");
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    const ShootFish_PopupCoinTransfer_1 = require("./ShootFish.PopupCoinTransfer");
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const BroadcastReceiver_1 = require("../../Main/Game/src/common/BroadcastReceiver");
    const MiniGameNetworkClient_1 = require("../../Main/Game/src/networks/MiniGameNetworkClient");
    const Network_InPacket_1 = require("../../Main/Game/src/networks/Network.InPacket");
    const Lobby_Cmd_1 = require("../../Main/Lobby/src/Lobby.Cmd");
    const ShootFishNetworkClient_1 = require("../../Main/Game/src/networks/ShootFishNetworkClient");
    const Common_AudioManager_1 = require("../../Main/Game/src/common/Common.AudioManager");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let Lobby = Lobby_1 = class Lobby extends cc.Component {
      constructor() {
        super(...arguments);
        this.playNode = null;
        this.lblBalance = null;
        this.popupCoinTransfer = null;
        this.clipBgm = null;
        this.clipClick = null;
        this.play = null;
      }
      onLoad() {
        BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.SET_SOUND, cc.find("Canvas"));
        Lobby_1.instance = this;
        this.play = this.playNode.getComponent(ShootFish_Play_1.default);
        this.play.node.active = false;
        this.lblBalance.string = Utils_1.default.formatNumber(Configs_1.default.Login.CoinFish);
        BroadcastReceiver_1.default.register(BroadcastReceiver_1.default.USER_UPDATE_COIN, () => {
          this.lblBalance.string = Utils_1.default.formatNumber(Configs_1.default.Login.CoinFish);
        }, this);
        ShootFishNetworkClient_1.default.getInstance().checkConnect(isLogined => {
          if (!isLogined) {
            App_1.default.instance.alertDialog.showMsgWithOnDismissed("\u0110\u0103ng nh\u1eadp th\u1ea5t b\u1ea1i, vui l\xf2ng th\u1eed l\u1ea1i.", () => {
              this.actBack();
            });
            return;
          }
          ShootFish_Play_1.default.SERVER_CONFIG = Configs_1.default.Login.FishConfigs;
          BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN);
          Configs_1.default.Login.CoinFish <= 0 && App_1.default.instance.confirmDialog.show3("Ti\u1ec1n trong B\u1eafn C\xe1 c\u1ee7a b\u1ea1n \u0111\xe3 h\u1ebft, b\u1ea1n c\xf3 mu\u1ed1n chuy\u1ec3n ti\u1ec1n v\xe0o kh\xf4ng?", "C\xf3", isConfirm => {
            isConfirm && this.popupCoinTransfer.show();
          });
        });
        ShootFishNetworkClient_1.default.getInstance().addOnClose(() => {
          App_1.default.instance.showErrLoading("M\u1ea5t k\u1ebft n\u1ed1i, \u0111ang th\u1eed k\u1ebft n\u1ed1i l\u1ea1i...");
        }, this);
        MiniGameNetworkClient_1.default.getInstance().addListener(data => {
          let inPacket = new Network_InPacket_1.default(data);
          switch (inPacket.getCmdId()) {
           case Lobby_Cmd_1.default.Code.GET_MONEY_USE:
            {
              let res = new Lobby_Cmd_1.default.ResGetMoneyUse(data);
              Configs_1.default.Login.Coin = res.moneyUse;
              BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN);
              break;
            }
          }
        }, this);
        Common_AudioManager_1.default.getInstance().playBackgroundMusic(this.clipBgm);
      }
      actBack() {
        Common_AudioManager_1.default.getInstance().playEffect(this.clipClick);
        App_1.default.instance.loadScene("Lobby");
      }
      actHonors() {}
      actRoom1() {
        this.show(false);
        Common_AudioManager_1.default.getInstance().playEffect(this.clipClick);
        this.play.show(true, 1);
      }
      actRoom2() {
        this.show(false);
        Common_AudioManager_1.default.getInstance().playEffect(this.clipClick);
        this.play.show(true, 2);
      }
      actRoom3() {
        this.show(false);
        Common_AudioManager_1.default.getInstance().playEffect(this.clipClick);
        this.play.show(true, 3);
      }
      show(isShow) {
        this.node.active = isShow;
        BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN);
      }
    };
    Lobby.instance = null;
    __decorate([ property(cc.Node) ], Lobby.prototype, "playNode", void 0);
    __decorate([ property(cc.Label) ], Lobby.prototype, "lblBalance", void 0);
    __decorate([ property(ShootFish_PopupCoinTransfer_1.default) ], Lobby.prototype, "popupCoinTransfer", void 0);
    __decorate([ property({
      type: cc.AudioClip
    }) ], Lobby.prototype, "clipBgm", void 0);
    __decorate([ property({
      type: cc.AudioClip
    }) ], Lobby.prototype, "clipClick", void 0);
    Lobby = Lobby_1 = __decorate([ ccclass ], Lobby);
    exports.default = Lobby;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/App": void 0,
    "../../Main/Game/src/common/BroadcastReceiver": void 0,
    "../../Main/Game/src/common/Common.AudioManager": void 0,
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/common/Utils": void 0,
    "../../Main/Game/src/networks/MiniGameNetworkClient": void 0,
    "../../Main/Game/src/networks/Network.InPacket": void 0,
    "../../Main/Game/src/networks/ShootFishNetworkClient": void 0,
    "../../Main/Lobby/src/Lobby.Cmd": void 0,
    "./ShootFish.Play": "ShootFish.Play",
    "./ShootFish.PopupCoinTransfer": "ShootFish.PopupCoinTransfer"
  } ],
  "ShootFish.PanelMenu": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3ebbaXYFItGA4MRPRT0exe9", "ShootFish.PanelMenu");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const SPUtils_1 = require("../../Main/Game/src/common/SPUtils");
    const BroadcastReceiver_1 = require("../../Main/Game/src/common/BroadcastReceiver");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let PanelMenu = class PanelMenu extends cc.Component {
      constructor() {
        super(...arguments);
        this.arrow = null;
        this.btnSound = null;
        this.sfSoundOn = null;
        this.sfSoundOff = null;
        this.btnMusic = null;
        this.sfMusicOn = null;
        this.sfMusicOff = null;
        this.isShow = false;
      }
      onLoad() {
        BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.SET_SOUND, this.node);
      }
      show(isShow) {
        this.isShow = isShow;
        if (this.isShow) {
          this.node.runAction(cc.moveTo(.3, cc.v2(-115, 0)));
          this.arrow.runAction(cc.rotateTo(.3, 0));
        } else {
          this.node.runAction(cc.moveTo(.3, cc.v2(0, 0)));
          this.arrow.runAction(cc.rotateTo(.3, 180));
        }
        this.btnSound.getComponent(cc.Sprite).spriteFrame = SPUtils_1.default.getSoundVolumn() > 0 ? this.sfSoundOn : this.sfSoundOff;
        this.btnMusic.getComponent(cc.Sprite).spriteFrame = SPUtils_1.default.getMusicVolumn() > 0 ? this.sfMusicOn : this.sfMusicOff;
      }
      toggleShow() {
        this.show(!this.isShow);
      }
      toggleSound() {
        SPUtils_1.default.setSoundVolumn(SPUtils_1.default.getSoundVolumn() > 0 ? 0 : 1);
        this.btnSound.getComponent(cc.Sprite).spriteFrame = SPUtils_1.default.getSoundVolumn() > 0 ? this.sfSoundOn : this.sfSoundOff;
        BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.ON_AUDIO_CHANGED);
      }
      toggleMusic() {
        SPUtils_1.default.setMusicVolumn(SPUtils_1.default.getMusicVolumn() > 0 ? 0 : 1);
        this.btnMusic.getComponent(cc.Sprite).spriteFrame = SPUtils_1.default.getMusicVolumn() > 0 ? this.sfMusicOn : this.sfMusicOff;
        BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.ON_AUDIO_CHANGED);
      }
    };
    __decorate([ property(cc.Node) ], PanelMenu.prototype, "arrow", void 0);
    __decorate([ property(cc.Button) ], PanelMenu.prototype, "btnSound", void 0);
    __decorate([ property(cc.SpriteFrame) ], PanelMenu.prototype, "sfSoundOn", void 0);
    __decorate([ property(cc.SpriteFrame) ], PanelMenu.prototype, "sfSoundOff", void 0);
    __decorate([ property(cc.Button) ], PanelMenu.prototype, "btnMusic", void 0);
    __decorate([ property(cc.SpriteFrame) ], PanelMenu.prototype, "sfMusicOn", void 0);
    __decorate([ property(cc.SpriteFrame) ], PanelMenu.prototype, "sfMusicOff", void 0);
    PanelMenu = __decorate([ ccclass ], PanelMenu);
    exports.default = PanelMenu;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/BroadcastReceiver": void 0,
    "../../Main/Game/src/common/SPUtils": void 0
  } ],
  "ShootFish.Player": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "720d1dsYhpMV5P3msI2r43M", "ShootFish.Player");
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
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let Player = class Player extends cc.Component {
      constructor() {
        super(...arguments);
        this.localPos = 0;
        this.lblNickname = null;
        this.lblCoin = null;
        this.lblBet = null;
        this.gunRotate = null;
        this.sprGunBar = null;
        this.sprFramesGunBar = [];
        this.guns = [];
        this.id = 0;
        this.username = "";
        this.nickname = "";
        this.coin = 0;
        this.avatar = "";
        this.serverPos = -1;
        this.gun = null;
        this.curGunIdx = -1;
      }
      onLoad() {
        BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.SET_SOUND, this.node);
      }
      set(id, username, nickname, coin, avatar) {
        this.id = id;
        this.username = username;
        this.nickname = nickname;
        this.coin = coin;
        this.avatar = avatar;
        this.gunRotate.angle = 0;
        this.node.active = true;
        this.lblNickname.string = this.nickname;
        this.lblCoin.string = Utils_1.default.formatNumber(coin);
        switch (this.localPos) {
         case 0:
         case 1:
          this.gunRotate.angle = 90;
          break;

         case 2:
         case 3:
          this.gunRotate.angle = -90;
        }
        this.setGun(0);
      }
      leave() {
        this.id = -1;
        this.nickname = "";
        this.coin = 0;
        this.avatar = "";
        this.node.active = false;
      }
      setGun(gunIdx) {
        gunIdx >= this.guns.length && (gunIdx = 0);
        if (this.curGunIdx == gunIdx) return;
        this.curGunIdx = gunIdx;
        for (let i = 0; i < this.guns.length; i++) this.guns[i].node.active = i == gunIdx;
        this.sprGunBar.spriteFrame = this.sprFramesGunBar[gunIdx];
        this.gun = this.guns[gunIdx];
      }
      rotateGun(touchPos) {
        var gunWorldPos = this.gunRotate.convertToWorldSpaceAR(cc.Vec2.ZERO);
        var d = touchPos.sub(gunWorldPos);
        var angle = Math.atan2(d.y, d.x) * Utils_1.default.Rad2Deg;
        angle < -90 ? angle = 180 : angle < 0 && angle > -90 && (angle = 0);
        this.gunRotate.angle = angle;
      }
      shoot() {
        this.gun.setAnimation(0, "2", false);
        this.gun.addAnimation(0, "1", true);
      }
    };
    __decorate([ property ], Player.prototype, "localPos", void 0);
    __decorate([ property(cc.Label) ], Player.prototype, "lblNickname", void 0);
    __decorate([ property(cc.Label) ], Player.prototype, "lblCoin", void 0);
    __decorate([ property(cc.Label) ], Player.prototype, "lblBet", void 0);
    __decorate([ property(cc.Node) ], Player.prototype, "gunRotate", void 0);
    __decorate([ property(cc.Sprite) ], Player.prototype, "sprGunBar", void 0);
    __decorate([ property([ cc.SpriteFrame ]) ], Player.prototype, "sprFramesGunBar", void 0);
    __decorate([ property([ sp.Skeleton ]) ], Player.prototype, "guns", void 0);
    Player = __decorate([ ccclass ], Player);
    exports.default = Player;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/BroadcastReceiver": void 0,
    "../../Main/Game/src/common/Utils": void 0
  } ],
  "ShootFish.Play": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5fa1efbhuJLl5N2iupithus", "ShootFish.Play");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var Play_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const ShootFish_Player_1 = require("./ShootFish.Player");
    const ShootFish_Bullet_1 = require("./ShootFish.Bullet");
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const ShootFish_Fish_1 = require("./ShootFish.Fish");
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    const Tween_1 = require("../../Main/Game/src/common/Tween");
    const ShootFish_CoinEffect_1 = require("./ShootFish.CoinEffect");
    const ShootFish_EffectJackpot_1 = require("./ShootFish.EffectJackpot");
    const App_1 = require("../../Main/Game/src/common/App");
    const ShootFish_Lobby_1 = require("./ShootFish.Lobby");
    const ShootFish_PanelMenu_1 = require("./ShootFish.PanelMenu");
    const ShootFish_PopupGuide_1 = require("./ShootFish.PopupGuide");
    const ShootFish_EffectBigWin_1 = require("./ShootFish.EffectBigWin");
    const ShootFishNetworkClient_1 = require("../../Main/Game/src/networks/ShootFishNetworkClient");
    const Common_AudioManager_1 = require("../../Main/Game/src/common/Common.AudioManager");
    const BroadcastReceiver_1 = require("../../Main/Game/src/common/BroadcastReceiver");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let Play = Play_1 = class Play extends cc.Component {
      constructor() {
        super(...arguments);
        this.lobby = null;
        this.loading = null;
        this.touchPad = null;
        this.sprFramesBullet = [];
        this.bulletTemplate = null;
        this.players = [];
        this.fishsAnim = [];
        this.fishsNode = null;
        this.fishTemplate = null;
        this.coinEffectTemplate = null;
        this.lblJackpot = null;
        this.toggleAuto = null;
        this.target = null;
        this.waveState = null;
        this.btnFastShoot = null;
        this.progressFastShoot = null;
        this.lblFastShootTime = null;
        this.btnTargetFish = null;
        this.progressTargetFish = null;
        this.lblTargetFishTime = null;
        this.effectJackpot = null;
        this.effectBigWin = null;
        this.effectMegaWin = null;
        this.panelMenu = null;
        this.popupGuide = null;
        this.lblPing = null;
        this.lblServerTime = null;
        this.clipClick = null;
        this.clipHit = null;
        this.clipCoin = null;
        this.clipJackpot = null;
        this.mePlayer = null;
        this.bullets = [];
        this.fishs = [];
        this.coinEffects = [];
        this.isStateGeted = false;
        this.inited = false;
        this.lastUpdateTime = -1;
        this.roomId = 0;
        this.listBet = [];
        this.listJackpot = [];
        this.betIdx = 0;
        this.mapPlayersIdx = [ [ 0, 1, 2, 3 ], [ 1, 0, 3, 2 ], [ 2, 3, 0, 1 ], [ 3, 2, 1, 0 ] ];
        this.shootInterval = .25;
        this.fastShootInterval = .13;
        this.curShootInterval = 0;
        this.isShoot = false;
        this.isFastShoot = false;
        this.isTargetFish = false;
        this.targetFish = null;
        this.intervalFindTargetFish = 2;
        this.curIntervalFindTargetFish = 0;
        this.curTimeFastShootCountdown = 0;
        this.curTimeTargetFishCountdown = 0;
        this.tweens = new Array();
      }
      init() {
        if (this.inited) return;
        this.mePlayer = this.players[0];
      }
      onLoad() {
        BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.SET_SOUND, this.node);
        Play_1.instance = this;
      }
      start() {
        this.bulletTemplate.active = false;
        this.touchPad.on(cc.Node.EventType.TOUCH_START, event => {
          var touchPos = event.getLocation();
          this.mePlayer.rotateGun(touchPos);
          this.isShoot = true;
        }, this.touchPad);
        this.touchPad.on(cc.Node.EventType.TOUCH_MOVE, event => {
          var touchPos = event.getLocation();
          this.mePlayer.rotateGun(touchPos);
        }, this.touchPad);
        this.touchPad.on(cc.Node.EventType.TOUCH_END, event => {
          this.isShoot = false;
        }, this.touchPad);
        this.touchPad.on(cc.Node.EventType.TOUCH_CANCEL, event => {
          this.isShoot = false;
        }, this.touchPad);
        this.toggleAuto.node.on("toggle", () => {
          this.playClickSound();
          if (this.toggleAuto.isChecked) {
            this.touchPad.active = false;
            this.curIntervalFindTargetFish = this.intervalFindTargetFish;
            this.isShoot = true;
            this.findTargetFishInWorld();
          } else this.stopAutoShoot();
        });
        ShootFishNetworkClient_1.default.getInstance().addListener((route, data) => {
          if (!this.node.active || !this.isStateGeted) return;
          switch (route) {
           case "OnUpdateJackpot":
            this.listJackpot.length = 0;
            this.listJackpot.push(data[this.roomId + "1"]);
            this.listJackpot.push(data[this.roomId + "2"]);
            this.listJackpot.push(data[this.roomId + "3"]);
            this.listJackpot.push(data[this.roomId + "4"]);
            Tween_1.default.numberTo(this.lblJackpot, this.listJackpot[this.betIdx], .3);
            break;

           case "OnEnterPlayer":
            {
              let playerData = data["data"];
              let localPos = this.mapPlayersIdx[this.mePlayer.serverPos][playerData["posIndex"]];
              let player = this.players[localPos];
              player.set(playerData["id"], playerData["playerId"], playerData["nickname"], playerData["cash"], playerData["avatar"]);
              player.serverPos = playerData["posIndex"];
              player.lblBet.string = Utils_1.default.formatNumberMin(this.listBet[this.betIdx]);
              break;
            }

           case "OnLeavePlayer":
            {
              let username = data["playerId"];
              if (username == Configs_1.default.Login.UsernameFish) {
                1 == data["reason"] && App_1.default.instance.alertDialog.showMsg("B\u1ea1n \u0111\u01b0\u1ee3c m\u1eddi ra kh\u1ecfi ph\xf2ng do kh\xf4ng thao t\xe1c trong th\u1eddi gian d\xe0i.");
                this.back();
              }
              let player = this.getPlayerByUsername(username);
              if (null == player) break;
              player.leave();
              break;
            }

           case "OnUpdateObject":
            {
              let fishId = data["id"];
              let fish = this.getFishById(fishId);
              if (null == fish) {
                console.log("can't find fish " + fishId);
                break;
              }
              fish.setData(data);
              break;
            }

           case "OnUpdateCash":
            {
              let username = data["playerId"];
              let coin = Number(data["cash"]);
              let scr = data["scr"];
              username == Configs_1.default.Login.UsernameFish && (Configs_1.default.Login.CoinFish = coin);
              let player = this.getPlayerByUsername(username);
              if (null == player) break;
              player.coin = coin;
              player.lblCoin.string = Utils_1.default.formatNumber(coin);
              switch (scr) {
               case 2:
                this.effectBigWin.show(false);
                this.effectMegaWin.show(false);
                this.effectJackpot.show(true, player.nickname, coin);
                Common_AudioManager_1.default.getInstance().playEffect(this.clipJackpot);
              }
              break;
            }

           case "OnObjectDie":
            {
              let fishId = data["id"];
              let coin = data["value"];
              let playerId = data["playerId"];
              let fish = this.getFishById(fishId);
              if (null == fish) break;
              fish.die();
              if (fish == this.targetFish) {
                this.exploreAllBulletWithTargetFishId(this.targetFish.id);
                this.target.active = false;
                this.targetFish = null;
                this.curIntervalFindTargetFish = 0;
              }
              let player = this.getPlayerByUsername(playerId);
              if (null == player) break;
              let coinEffect = this.getCoinEffect();
              coinEffect.run(coin, fish.node.position, player.node.position);
              switch (fish.type) {
               case 15:
               case 16:
               case 17:
               case 18:
               case 19:
               case 20:
               case 21:
                this.effectJackpot.node.active || this.effectMegaWin.show(true, player.nickname, coin);
                break;

               case 22:
               case 23:
               case 24:
                this.effectJackpot.node.active || this.effectBigWin.show(true, player.nickname, coin);
              }
              break;
            }

           case "OnShoot":
            {
              let username = data["playerId"];
              let betIdx = Number(data["type"]) - 1;
              let rad = data["rad"];
              let target = Number(data["target"]);
              if (username == Configs_1.default.Login.UsernameFish) break;
              let player = this.getPlayerByUsername(username);
              if (null == player) break;
              let radByMe = rad;
              switch (this.mePlayer.serverPos) {
               case 0:
                radByMe = rad;
                break;

               case 1:
                radByMe = Math.PI - rad;
                break;

               case 2:
                radByMe = rad - Math.PI;
                break;

               case 3:
                radByMe = -rad;
              }
              player.lblBet.string = Utils_1.default.formatNumberMin(this.listBet[betIdx]);
              player.gunRotate.angle = radByMe * Utils_1.default.Rad2Deg;
              player.setGun(betIdx);
              player.shoot();
              var bullet = this.getBullet();
              bullet.targetFishId = target;
              bullet.bullet.getComponent(cc.Sprite).spriteFrame = this.sprFramesBullet[betIdx];
              bullet.node.angle = player.gunRotate.angle;
              var pos = bullet.node.parent.convertToNodeSpaceAR(player.gunRotate.convertToWorldSpaceAR(cc.Vec2.ZERO));
              pos.x += 90 * Utils_1.default.degreesToVec2(bullet.node.angle).x;
              pos.y += 90 * Utils_1.default.degreesToVec2(bullet.node.angle).y;
              bullet.node.position = pos;
              bullet.run();
              Common_AudioManager_1.default.getInstance().playEffect(this.clipHit);
              break;
            }

           case "OnChat":
            break;

           case "OnNewState":
            switch (data["state"]) {
             case 3:
              {
                this.waveState.stopAllActions();
                this.waveState.active = true;
                let pos = this.waveState.position;
                pos.x = 1400;
                this.waveState.position = pos;
                pos.x = -1400;
                this.waveState.runAction(cc.sequence(cc.moveTo(1, pos), cc.callFunc(() => {
                  this.waveState.active = false;
                })));
                break;
              }
            }
            break;

           case "OnJackpot":
            {
              let nickname = data["nickname"];
              let value = data["value"];
              let roomIdx = data["tableIndex"];
              var roomName = "Ph\xf2ng 1";
              switch (roomIdx) {
               case 2:
                roomName = "Ph\xf2ng 2";
                break;

               case 3:
                roomName = "Ph\xf2ng 3";
              }
              let msg = 'Ch\xfac m\u1eebng "' + nickname + '" \u0111\xe3 s\u0103n \u0111\u01b0\u1ee3c ' + Utils_1.default.formatNumber(value) + " Xu trong " + roomName + ".";
              break;
            }
          }
        }, this);
        this.init();
      }
      onDisable() {
        this.tweens.forEach(element => {
          element.stop();
        });
      }
      onDestroy() {
        this.tweens.forEach(element => {
          element.stop();
        });
      }
      update(dt) {
        null != this.lblPing && (this.lblPing.string = ShootFishNetworkClient_1.default.PING + "ms");
        null != this.lblServerTime && this.lblServerTime.node.active && (this.lblServerTime.string = "t: " + ShootFishNetworkClient_1.default.systemCurrentTimeMillis() + " d: " + ShootFishNetworkClient_1.default.TIME_DISTANCE + " mp: " + ShootFishNetworkClient_1.default.MIN_PING);
        let now = ShootFishNetworkClient_1.default.systemCurrentTimeMillis();
        if (this.isStateGeted && this.lastUpdateTime > 0 && now - this.lastUpdateTime > 500) {
          console.log("onresume getstate");
          this.getState(false);
        }
        this.lastUpdateTime = now;
        if (this.curTimeFastShootCountdown > 0) {
          this.curTimeFastShootCountdown = Math.max(0, this.curTimeFastShootCountdown - dt);
          this.lblFastShootTime.string = Math.round(this.curTimeFastShootCountdown) + "s";
          if (0 == this.curTimeFastShootCountdown) {
            this.lblFastShootTime.node.active = false;
            this.btnFastShoot.enabled = true;
          }
        }
        if (this.curTimeTargetFishCountdown > 0) {
          this.curTimeTargetFishCountdown = Math.max(0, this.curTimeTargetFishCountdown - dt);
          this.lblTargetFishTime.string = Math.round(this.curTimeTargetFishCountdown) + "s";
          if (0 == this.curTimeTargetFishCountdown) {
            this.lblTargetFishTime.node.active = false;
            this.btnTargetFish.enabled = true;
          }
        }
        this.updateShoot(dt);
        for (var i = 0, c = this.bullets.length; i < c; i++) {
          let bulet = this.bullets[i];
          bulet.updateRealTime(dt);
        }
        var listFishPoly = new Array();
        for (var i = 0, c = this.fishs.length; i < c; i++) {
          let fish = this.fishs[i];
          fish.updateRealTime(dt);
          fish.node.active && Math.abs(fish.node.x) < 704 && Math.abs(fish.node.y) < 360 * 1.1 ? listFishPoly.push(fish.getPolygon()) : listFishPoly.push(null);
        }
        for (var i = 0, cBullet = this.bullets.length; i < cBullet; i++) {
          var bullet = this.bullets[i];
          if (!bullet.node.active || bullet.isExploring || bullet.isExplored) continue;
          var bulletCircle = bullet.getCircle();
          for (var j = 0, cFish = this.fishs.length; j < cFish; j++) {
            var fish = this.fishs[j];
            if (null == listFishPoly[j]) continue;
            if (bullet.targetFishId > 0 && bullet.targetFishId != fish.id) continue;
            var isCollision = SAT.testCirclePolygon(bulletCircle, listFishPoly[j]);
            if (isCollision) {
              bullet.explore();
              fish.hurt();
              break;
            }
          }
        }
        listFishPoly.length = 0;
      }
      play() {
        this.isStateGeted = false;
        this.resetView();
        ShootFishNetworkClient_1.default.getInstance().ping(() => {
          ShootFishNetworkClient_1.default.getInstance().ping(() => {
            ShootFishNetworkClient_1.default.getInstance().ping(() => {
              console.log(this.roomId);
              ShootFishNetworkClient_1.default.getInstance().request("play", {
                playerId: Configs_1.default.Login.UsernameFish,
                password: Configs_1.default.Login.PasswordFish,
                index: this.roomId
              }, res => {
                console.log(res);
                if (!res["ok"]) {
                  switch (res["err"]) {
                   case 4:
                    App_1.default.instance.confirmDialog.show2("S\u1ed1 d\u01b0 kh\xf4ng \u0111\u1ee7 vui l\xf2ng n\u1ea1p th\xeam.", isConfirm => {
                      isConfirm && ShootFish_Lobby_1.default.instance.popupCoinTransfer.show();
                    });
                    break;

                   case 1:
                    ShootFishNetworkClient_1.default.getInstance().request("quit", null, () => {}, this);
                    App_1.default.instance.alertDialog.showMsg("L\u1ed7i " + res["err"] + ", vui l\xf2ng th\u1eed l\u1ea1i.");
                    break;

                   default:
                    App_1.default.instance.alertDialog.showMsg("L\u1ed7i " + res["err"] + ", kh\xf4ng x\xe1c \u0111\u1ecbnh.");
                  }
                  this.show(false);
                  this.lobby.getComponent(ShootFish_Lobby_1.default).show(true);
                  return;
                }
                this.getState(true);
              }, this);
            }, this);
          }, this);
        }, this);
      }
      resetView() {
        this.betIdx = 0;
        for (let i = 0; i < this.players.length; i++) this.players[i].leave();
        for (let i = 0; i < this.fishs.length; i++) this.fishs[i].node.removeFromParent();
        this.fishs.length = 0;
        for (let i = 0; i < this.bullets.length; i++) this.bullets[i].node.active = false;
        for (let i = 0; i < this.coinEffects.length; i++) this.coinEffects[i].node.active = false;
        this.effectBigWin.show(false);
        this.effectMegaWin.show(false);
        this.effectJackpot.show(false);
        this.popupGuide.active = false;
        this.waveState.stopAllActions();
        this.waveState.active = false;
      }
      getJackpot() {
        ShootFishNetworkClient_1.default.getInstance().request("getJackpot", null, res => {
          if (!res["ok"]) return;
          this.listJackpot.length = 0;
          this.listJackpot.push(res["data"][this.roomId + "1"]);
          this.listJackpot.push(res["data"][this.roomId + "2"]);
          this.listJackpot.push(res["data"][this.roomId + "3"]);
          this.listJackpot.push(res["data"][this.roomId + "4"]);
          Tween_1.default.numberTo(this.lblJackpot, this.listJackpot[this.betIdx], .3);
        }, this);
      }
      getState(isFirst) {
        isFirst || App_1.default.instance.showLoading(true);
        this.isStateGeted = false;
        this.resetView();
        ShootFishNetworkClient_1.default.getInstance().request("state", null, res => {
          isFirst || App_1.default.instance.showLoading(false);
          let playersData = res["players"];
          let mePlayerData = null;
          let mePlayerServerPos = 0;
          for (let i = 0; i < playersData.length; i++) if (playersData[i]["playerId"] == Configs_1.default.Login.UsernameFish) {
            mePlayerServerPos = playersData[i]["posIndex"];
            mePlayerData = playersData[i];
            Configs_1.default.Login.CoinFish = playersData[i]["cash"];
            break;
          }
          console.log("mePlayerServerPos: " + mePlayerServerPos);
          for (let i = 0; i < playersData.length; i++) {
            let localPos = this.mapPlayersIdx[mePlayerServerPos][playersData[i]["posIndex"]];
            let playerData = playersData[i];
            let player = this.players[localPos];
            player.set(playerData["id"], playerData["playerId"], playerData["nickname"], playerData["cash"], playerData["avatar"]);
            player.serverPos = playerData["posIndex"];
            player.lblBet.string = Utils_1.default.formatNumberMin(this.listBet[this.betIdx]);
          }
          let objects = res["objects"].concat(res["sobjects"]);
          for (let i = 0; i < objects.length; i++) {
            let fishNode = cc.instantiate(this.fishTemplate);
            let fish = fishNode.getComponent(ShootFish_Fish_1.default);
            fish.node.parent = this.fishsNode;
            fish.setData(objects[i]);
            this.fishs.push(fish);
          }
          var rfire = res["time"] - mePlayerData["rfire"];
          var cRfire = Play_1.SERVER_CONFIG["FastFireCoolDownS"];
          this.progressFastShoot.progress = 0;
          if (rfire > cRfire) {
            this.btnFastShoot.enabled = true;
            this.lblFastShootTime.node.active = false;
          } else {
            this.btnFastShoot.enabled = false;
            this.curTimeFastShootCountdown = rfire;
            this.lblFastShootTime.string = this.curTimeFastShootCountdown + "s";
            this.lblFastShootTime.node.active = true;
          }
          var snipe = res["time"] - mePlayerData["snipe"];
          var cSpine = Play_1.SERVER_CONFIG["SnipeCoolDownS"];
          this.progressTargetFish.progress = 0;
          if (snipe > cSpine) {
            this.btnTargetFish.enabled = true;
            this.lblFastShootTime.node.active = false;
          } else {
            this.btnTargetFish.enabled = false;
            this.curTimeTargetFishCountdown = snipe;
            this.lblTargetFishTime.string = this.curTimeTargetFishCountdown + "s";
            this.lblTargetFishTime.node.active = true;
          }
          this.isStateGeted = true;
          this.getJackpot();
          isFirst && (this.loading.active = false);
        }, this);
      }
      updateShoot(dt) {
        if (this.toggleAuto.isChecked || this.isTargetFish) if (null != this.targetFish) {
          var gunWorldPos = this.mePlayer.gunRotate.convertToWorldSpaceAR(cc.Vec2.ZERO);
          var fishWorldPos = this.targetFish.node.convertToWorldSpaceAR(cc.v2(this.targetFish.node.width / 2, 0));
          var distance = Utils_1.default.v2Distance(fishWorldPos, gunWorldPos);
          if (Math.abs(this.targetFish.node.x) > 512 || Math.abs(this.targetFish.node.y) > 288 || distance < 135) {
            this.exploreAllBulletWithTargetFishId(this.targetFish.id);
            this.target.active = false;
            this.targetFish = null;
            this.curIntervalFindTargetFish = 0;
          } else {
            var dAngle = fishWorldPos.sub(gunWorldPos);
            var angle = Math.atan2(dAngle.y, dAngle.x) * Utils_1.default.Rad2Deg;
            this.mePlayer.gunRotate.angle = angle;
            this.target.position = this.target.parent.convertToNodeSpaceAR(fishWorldPos);
          }
        } else if (!this.isTargetFish) {
          this.curIntervalFindTargetFish = Math.max(0, this.curIntervalFindTargetFish - dt);
          0 == this.curIntervalFindTargetFish && this.findTargetFishInWorld();
        }
        if (this.curShootInterval > 0) this.curShootInterval = Math.max(0, this.curShootInterval - dt); else if (this.isShoot) {
          this.curShootInterval = this.isFastShoot ? this.fastShootInterval : this.shootInterval;
          if (Configs_1.default.Login.CoinFish < this.listBet[this.betIdx]) {
            App_1.default.instance.alertDialog.showMsg("S\u1ed1 d\u01b0 kh\xf4ng \u0111\u1ee7, vui l\xf2ng n\u1ea1p th\xeam.");
            this.isShoot = false;
            this.toggleAuto.isChecked && this.stopAutoShoot();
            return;
          }
          if ((this.toggleAuto.isChecked || this.isTargetFish) && null == this.targetFish) return;
          Configs_1.default.Login.CoinFish = Math.max(0, Configs_1.default.Login.CoinFish - this.listBet[this.betIdx]);
          this.mePlayer.coin = Configs_1.default.Login.CoinFish;
          this.mePlayer.lblCoin.string = Utils_1.default.formatNumber(Configs_1.default.Login.CoinFish);
          this.mePlayer.shoot();
          let bulletAngle = this.mePlayer.gunRotate.angle;
          var bullet = this.getBullet();
          bullet.bullet.getComponent(cc.Sprite).spriteFrame = this.sprFramesBullet[this.betIdx];
          bullet.targetFishId = null != this.targetFish ? this.targetFish.id : -1;
          bullet.node.angle = bulletAngle;
          var pos = bullet.node.parent.convertToNodeSpaceAR(this.mePlayer.gunRotate.convertToWorldSpaceAR(cc.Vec2.ZERO));
          pos.x += 90 * Utils_1.default.degreesToVec2(bullet.node.angle).x;
          pos.y += 90 * Utils_1.default.degreesToVec2(bullet.node.angle).y;
          bullet.node.position = pos;
          bullet.run();
          Common_AudioManager_1.default.getInstance().playEffect(this.clipHit);
          let shootRad = bulletAngle * Utils_1.default.Deg2Rad;
          switch (this.mePlayer.serverPos) {
           case 0:
            shootRad = shootRad;
            break;

           case 1:
            shootRad = Math.PI - shootRad;
            break;

           case 2:
            shootRad -= Math.PI;
            break;

           case 3:
            shootRad = -shootRad;
          }
          ShootFishNetworkClient_1.default.getInstance().notify("shoot", {
            rad: shootRad,
            type: this.betIdx + 1,
            target: null != this.targetFish ? this.targetFish.id : -1,
            rapidFire: this.isFastShoot,
            auto: false
          });
        }
      }
      findTargetFishInWorld() {
        this.curIntervalFindTargetFish = this.intervalFindTargetFish;
        let listFishActiveInWorld = [];
        var gunWorldPos = this.mePlayer.gunRotate.convertToWorldSpaceAR(cc.Vec2.ZERO);
        for (let i = 0; i < this.fishs.length; i++) {
          var fishNode = this.fishs[i].node;
          if (fishNode.active && Math.abs(fishNode.position.x) <= 512 && Math.abs(fishNode.position.y) <= 288) {
            var fishWorldPos = fishNode.convertToWorldSpaceAR(cc.Vec2.ZERO);
            var distance = Utils_1.default.v2Distance(gunWorldPos, fishWorldPos);
            distance >= 135 && listFishActiveInWorld.push({
              fish: this.fishs[i],
              distance: distance
            });
          }
        }
        if (listFishActiveInWorld.length > 0) {
          this.targetFish = listFishActiveInWorld[Utils_1.default.randomRangeInt(0, listFishActiveInWorld.length)]["fish"];
          this.target.active = true;
          this.target.position = this.targetFish.node.position;
        }
      }
      stopAutoShoot() {
        this.isShoot = false;
        this.toggleAuto.isChecked = false;
        this.target.active = false;
        this.touchPad.active = true;
        this.curIntervalFindTargetFish = 0;
        this.targetFish = null;
      }
      getBullet() {
        let bullet = null;
        for (let i = 0; i < this.bullets.length; i++) if (!this.bullets[i].node.active) {
          bullet = this.bullets[i];
          break;
        }
        if (null == bullet) {
          let node = cc.instantiate(this.bulletTemplate);
          node.parent = this.bulletTemplate.parent;
          bullet = node.getComponent(ShootFish_Bullet_1.default);
          this.bullets.push(bullet);
        }
        bullet.node.active = true;
        bullet.targetFishId = -1;
        return bullet;
      }
      exploreAllBulletWithTargetFishId(fishId) {
        for (let i = 0; i < this.bullets.length; i++) this.bullets[i].node.active && this.bullets[i].targetFishId >= 0 && this.bullets[i].targetFishId == fishId && (this.bullets[i].targetFishId = -1);
      }
      getCoinEffect() {
        let coinEffect = null;
        for (let i = 0; i < this.coinEffects.length; i++) if (!this.coinEffects[i].node.active) {
          coinEffect = this.coinEffects[i];
          break;
        }
        if (null == coinEffect) {
          let node = cc.instantiate(this.coinEffectTemplate);
          node.parent = this.coinEffectTemplate.parent;
          coinEffect = node.getComponent(ShootFish_CoinEffect_1.default);
          this.coinEffects.push(coinEffect);
        }
        coinEffect.node.active = true;
        coinEffect.node.setSiblingIndex(coinEffect.node.parent.children.length - 1);
        Common_AudioManager_1.default.getInstance().playEffect(this.clipCoin);
        return coinEffect;
      }
      getFishById(id) {
        for (let i = 0; i < this.fishs.length; i++) if (this.fishs[i].id == id) return this.fishs[i];
        return null;
      }
      getPlayerById(id) {
        if (id <= 0) return null;
        for (let i = 0; i < this.players.length; i++) if (this.players[i].id > 0 && this.players[i].id == id) return this.players[i];
        return null;
      }
      getPlayerByUsername(username) {
        if (null == username || "" == username) return null;
        for (let i = 0; i < this.players.length; i++) if (null != this.players[i].username && "" != this.players[i].username && this.players[i].username == username) return this.players[i];
        return null;
      }
      getFishAnimByType(type) {
        let name = "";
        switch (type) {
         case 0:
          name = "fish0";
          break;

         case 1:
          name = "fish1";
          break;

         case 2:
          name = "fish2";
          break;

         case 3:
          name = "fish3";
          break;

         case 4:
          name = "fish4";
          break;

         case 5:
          name = "fish5";
          break;

         case 6:
          name = "fish6";
          break;

         case 7:
          name = "fish7";
          break;

         case 8:
         case 9:
          name = "fish9";
          break;

         case 10:
          name = "fish10";
          break;

         case 11:
          name = "fish11";
          break;

         case 12:
          name = "fish12";
          break;

         case 13:
          name = "fish13";
          break;

         case 14:
          name = "fish14";
          break;

         case 15:
          name = "fish15";
          break;

         case 16:
          name = "fish16";
          break;

         case 17:
          name = "fish17";
          break;

         case 18:
          name = "fish18";
          break;

         case 19:
          name = "fish19";
          break;

         case 20:
          name = "fish20";
          break;

         case 21:
          name = "fish21";
          break;

         case 22:
          name = "fish22";
          break;

         case 23:
          name = "fish23";
          break;

         case 24:
          name = "fish24";
        }
        for (let i = 0; i < this.fishsAnim.length; i++) if (null != this.fishsAnim[i].name && "" != this.fishsAnim[i].name && this.fishsAnim[i].name == name) return this.fishsAnim[i];
        return this.fishsAnim[0];
      }
      actGetState() {
        this.getState(false);
      }
      actBetUp() {
        if (this.betIdx < this.listBet.length - 1) {
          this.betIdx++;
          this.mePlayer.lblBet.string = Utils_1.default.formatNumberMin(this.listBet[this.betIdx]);
          this.mePlayer.setGun(this.betIdx);
          Tween_1.default.numberTo(this.lblJackpot, this.listJackpot[this.betIdx], .3);
        }
        Common_AudioManager_1.default.getInstance().playEffect(this.clipClick);
      }
      actBetDown() {
        if (this.betIdx > 0) {
          this.betIdx--;
          this.mePlayer.lblBet.string = Utils_1.default.formatNumberMin(this.listBet[this.betIdx]);
          this.mePlayer.setGun(this.betIdx);
          Tween_1.default.numberTo(this.lblJackpot, this.listJackpot[this.betIdx], .3);
        }
        Common_AudioManager_1.default.getInstance().playEffect(this.clipClick);
      }
      actBack() {
        App_1.default.instance.confirmDialog.show2("B\u1ea1n c\xf3 mu\u1ed1n r\u1eddi kh\u1ecfi b\xe0n kh\xf4ng", isConfirm => {
          isConfirm && this.back();
        });
        Common_AudioManager_1.default.getInstance().playEffect(this.clipClick);
      }
      actFastShoot() {
        this.isFastShoot = true;
        this.btnFastShoot.enabled = false;
        var cDuration = Play_1.SERVER_CONFIG["FastFireDuration"];
        this.progressFastShoot.progress = 1;
        this.tweens.push(cc.tween(this.progressFastShoot).to(cDuration, {
          progress: 0
        }).call(() => {
          this.isFastShoot = false;
          this.curTimeFastShootCountdown = Play_1.SERVER_CONFIG["FastFireCoolDownS"];
          this.lblFastShootTime.string = this.curTimeFastShootCountdown + "s";
          this.lblFastShootTime.node.active = true;
        }).start());
        Common_AudioManager_1.default.getInstance().playEffect(this.clipClick);
      }
      actTargetFish() {
        this.isShoot = true;
        this.isTargetFish = true;
        this.btnTargetFish.enabled = false;
        var cDuration = Play_1.SERVER_CONFIG["SnipeDurationS"];
        this.progressTargetFish.progress = 1;
        this.tweens.push(cc.tween(this.progressTargetFish).to(cDuration, {
          progress: 0
        }).call(() => {
          this.isTargetFish = false;
          this.targetFish = null;
          this.target.active = false;
          this.curTimeTargetFishCountdown = Play_1.SERVER_CONFIG["SnipeCoolDownS"];
          this.lblTargetFishTime.string = this.curTimeTargetFishCountdown + "s";
          this.lblTargetFishTime.node.active = true;
          this.fishs.forEach(x => {
            x.getComponent(cc.Button).enabled = false;
          });
          this.isShoot = this.toggleAuto.isChecked;
          this.touchPad.active = !this.toggleAuto.isChecked;
        }).start());
        this.touchPad.active = false;
        this.fishs.forEach(x => {
          x.getComponent(cc.Button).enabled = true;
          x.node.off("click");
          x.node.on("click", () => {
            this.targetFish = x;
            this.target.active = true;
          });
        });
        Common_AudioManager_1.default.getInstance().playEffect(this.clipClick);
      }
      back() {
        this.isStateGeted = false;
        this.stopAutoShoot();
        App_1.default.instance.showLoading(true);
        ShootFishNetworkClient_1.default.getInstance().request("quit", null, () => {
          App_1.default.instance.showLoading(false);
          this.resetView();
          this.show(false);
          this.lobby.getComponent(ShootFish_Lobby_1.default).show(true);
        }, this);
      }
      actEffectJackpotTest() {
        this.effectJackpot.show(true, "Test nickname", 54032423);
      }
      actEffectBigWinTest() {
        this.effectBigWin.show(true, "Test nickname", 54032423);
      }
      actEffectMegaWinTest() {
        this.effectMegaWin.show(true, "Test nickname", 54032423);
      }
      show(isShow, roomId = 0) {
        if (isShow) {
          if (null == Play_1.SERVER_CONFIG) {
            this.lobby.getComponent(ShootFish_Lobby_1.default).show(true);
            App_1.default.instance.alertDialog.showMsg("B\u1ea1n ch\u01b0a \u0111\u0103ng nh\u1eadp.");
            return;
          }
          this.node.active = true;
          this.loading.active = true;
          this.roomId = roomId;
          this.stopAutoShoot();
          this.panelMenu.show(false);
          this.listBet.length = 0;
          this.listBet.push(Play_1.SERVER_CONFIG["TypeToValue"]["Bullet1"] * Play_1.SERVER_CONFIG["TableBulletValueRate"][this.roomId]);
          this.listBet.push(Play_1.SERVER_CONFIG["TypeToValue"]["Bullet2"] * Play_1.SERVER_CONFIG["TableBulletValueRate"][this.roomId]);
          this.listBet.push(Play_1.SERVER_CONFIG["TypeToValue"]["Bullet3"] * Play_1.SERVER_CONFIG["TableBulletValueRate"][this.roomId]);
          this.listBet.push(Play_1.SERVER_CONFIG["TypeToValue"]["Bullet4"] * Play_1.SERVER_CONFIG["TableBulletValueRate"][this.roomId]);
          this.shootInterval = 1 / Play_1.SERVER_CONFIG["FIRE_RATE"];
          this.fastShootInterval = this.shootInterval / Play_1.SERVER_CONFIG["FastFireRate"];
          this.play();
        } else {
          this.popupGuide.active && this.popupGuide.getComponent(ShootFish_PopupGuide_1.default).dismiss();
          this.node.active = false;
        }
      }
      playClickSound() {
        Common_AudioManager_1.default.getInstance().playEffect(this.clipClick);
      }
    };
    Play.instance = null;
    Play.SERVER_CONFIG = null;
    __decorate([ property(cc.Node) ], Play.prototype, "lobby", void 0);
    __decorate([ property(cc.Node) ], Play.prototype, "loading", void 0);
    __decorate([ property(cc.Node) ], Play.prototype, "touchPad", void 0);
    __decorate([ property([ cc.SpriteFrame ]) ], Play.prototype, "sprFramesBullet", void 0);
    __decorate([ property(cc.Node) ], Play.prototype, "bulletTemplate", void 0);
    __decorate([ property([ ShootFish_Player_1.default ]) ], Play.prototype, "players", void 0);
    __decorate([ property([ cc.Node ]) ], Play.prototype, "fishsAnim", void 0);
    __decorate([ property(cc.Node) ], Play.prototype, "fishsNode", void 0);
    __decorate([ property(cc.Node) ], Play.prototype, "fishTemplate", void 0);
    __decorate([ property(cc.Node) ], Play.prototype, "coinEffectTemplate", void 0);
    __decorate([ property(cc.Label) ], Play.prototype, "lblJackpot", void 0);
    __decorate([ property(cc.Toggle) ], Play.prototype, "toggleAuto", void 0);
    __decorate([ property(cc.Node) ], Play.prototype, "target", void 0);
    __decorate([ property(cc.Node) ], Play.prototype, "waveState", void 0);
    __decorate([ property(cc.Button) ], Play.prototype, "btnFastShoot", void 0);
    __decorate([ property(cc.ProgressBar) ], Play.prototype, "progressFastShoot", void 0);
    __decorate([ property(cc.Label) ], Play.prototype, "lblFastShootTime", void 0);
    __decorate([ property(cc.Button) ], Play.prototype, "btnTargetFish", void 0);
    __decorate([ property(cc.ProgressBar) ], Play.prototype, "progressTargetFish", void 0);
    __decorate([ property(cc.Label) ], Play.prototype, "lblTargetFishTime", void 0);
    __decorate([ property(ShootFish_EffectJackpot_1.default) ], Play.prototype, "effectJackpot", void 0);
    __decorate([ property(ShootFish_EffectBigWin_1.default) ], Play.prototype, "effectBigWin", void 0);
    __decorate([ property(ShootFish_EffectBigWin_1.default) ], Play.prototype, "effectMegaWin", void 0);
    __decorate([ property(ShootFish_PanelMenu_1.default) ], Play.prototype, "panelMenu", void 0);
    __decorate([ property(cc.Node) ], Play.prototype, "popupGuide", void 0);
    __decorate([ property(cc.Label) ], Play.prototype, "lblPing", void 0);
    __decorate([ property(cc.Label) ], Play.prototype, "lblServerTime", void 0);
    __decorate([ property({
      type: cc.AudioClip
    }) ], Play.prototype, "clipClick", void 0);
    __decorate([ property({
      type: cc.AudioClip
    }) ], Play.prototype, "clipHit", void 0);
    __decorate([ property({
      type: cc.AudioClip
    }) ], Play.prototype, "clipCoin", void 0);
    __decorate([ property({
      type: cc.AudioClip
    }) ], Play.prototype, "clipJackpot", void 0);
    Play = Play_1 = __decorate([ ccclass ], Play);
    exports.default = Play;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/App": void 0,
    "../../Main/Game/src/common/BroadcastReceiver": void 0,
    "../../Main/Game/src/common/Common.AudioManager": void 0,
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/common/Tween": void 0,
    "../../Main/Game/src/common/Utils": void 0,
    "../../Main/Game/src/networks/ShootFishNetworkClient": void 0,
    "./ShootFish.Bullet": "ShootFish.Bullet",
    "./ShootFish.CoinEffect": "ShootFish.CoinEffect",
    "./ShootFish.EffectBigWin": "ShootFish.EffectBigWin",
    "./ShootFish.EffectJackpot": "ShootFish.EffectJackpot",
    "./ShootFish.Fish": "ShootFish.Fish",
    "./ShootFish.Lobby": "ShootFish.Lobby",
    "./ShootFish.PanelMenu": "ShootFish.PanelMenu",
    "./ShootFish.Player": "ShootFish.Player",
    "./ShootFish.PopupGuide": "ShootFish.PopupGuide"
  } ],
  "ShootFish.PopupCoinTransfer": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bcd88coqOBPF7ZC2zQEsAhZ", "ShootFish.PopupCoinTransfer");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.TabCashOut = exports.TabCashIn = void 0;
    const Dialog_1 = require("../../Main/Game/src/common/Dialog");
    const BroadcastReceiver_1 = require("../../Main/Game/src/common/BroadcastReceiver");
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    const App_1 = require("../../Main/Game/src/common/App");
    const MiniGameNetworkClient_1 = require("../../Main/Game/src/networks/MiniGameNetworkClient");
    const Lobby_Cmd_1 = require("../../Main/Lobby/src/Lobby.Cmd");
    const ShootFishNetworkClient_1 = require("../../Main/Game/src/networks/ShootFishNetworkClient");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let TabCashIn = class TabCashIn {
      constructor() {
        this.lblBalance = null;
        this.edbCoin = null;
        this.quickButtons = null;
        this.popup = null;
        this.values = [ 5e4, 1e5, 2e5, 5e5, 1e6, 2e6, 5e6, 1e7, 2e7 ];
      }
      onLoad() {
        BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.SET_SOUND, this.node);
      }
      start(popup) {
        this.popup = popup;
        this.edbCoin.node.on("editing-did-ended", () => {
          let number = Utils_1.default.stringToInt(this.edbCoin.string);
          this.edbCoin.string = Utils_1.default.formatNumber(number);
        });
        for (let i = 0; i < this.quickButtons.childrenCount; i++) {
          var btn = this.quickButtons.children[i];
          let value = this.values[i];
          btn.getComponentInChildren(cc.Label).string = Utils_1.default.formatNumber(value);
          btn.on("click", () => {
            this.edbCoin.string = Utils_1.default.formatNumber(value);
          });
        }
      }
      submit() {
        let coin = Utils_1.default.stringToInt(this.edbCoin.string);
        if (coin <= 0) {
          App_1.default.instance.alertDialog.showMsg("S\u1ed1 ti\u1ec1n \u0111\xe3 nh\u1eadp kh\xf4ng h\u1ee3p l\u1ec7.");
          return;
        }
        App_1.default.instance.showLoading(true);
        ShootFishNetworkClient_1.default.getInstance().request("xxengCashin", {
          ccash: coin
        }, res => {
          App_1.default.instance.showLoading(false);
          if (!res["ok"]) {
            App_1.default.instance.alertDialog.showMsg("Thao t\xe1c th\u1ea5t b\u1ea1i, vui l\xf2ng th\u1eed l\u1ea1i sau.");
            return;
          }
          Configs_1.default.Login.CoinFish = res["newCash"];
          BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN);
          App_1.default.instance.alertDialog.showMsg("Thao t\xe1c th\xe0nh c\xf4ng.");
          this.reset();
          MiniGameNetworkClient_1.default.getInstance().send(new Lobby_Cmd_1.default.ReqGetMoneyUse());
        }, this.popup);
      }
      reset() {
        this.edbCoin.string = "";
        this.lblBalance.string = Utils_1.default.formatNumber(Configs_1.default.Login.Coin);
      }
    };
    __decorate([ property(cc.Label) ], TabCashIn.prototype, "lblBalance", void 0);
    __decorate([ property(cc.EditBox) ], TabCashIn.prototype, "edbCoin", void 0);
    __decorate([ property(cc.Node) ], TabCashIn.prototype, "quickButtons", void 0);
    TabCashIn = __decorate([ ccclass("PopupCoinTransfer.TabCashIn") ], TabCashIn);
    exports.TabCashIn = TabCashIn;
    let TabCashOut = class TabCashOut {
      constructor() {
        this.lblBalance = null;
        this.edbCoin = null;
        this.quickButtons = null;
        this.popup = null;
        this.values = [ 5e4, 1e5, 2e5, 5e5, 1e6, 2e6, 5e6, 1e7, 2e7 ];
      }
      start(popup) {
        this.popup = popup;
        this.edbCoin.node.on("editing-did-ended", () => {
          let number = Utils_1.default.stringToInt(this.edbCoin.string);
          this.edbCoin.string = Utils_1.default.formatNumber(number);
        });
        for (let i = 0; i < this.quickButtons.childrenCount; i++) {
          var btn = this.quickButtons.children[i];
          let value = this.values[i];
          btn.getComponentInChildren(cc.Label).string = Utils_1.default.formatNumber(value);
          btn.on("click", () => {
            this.edbCoin.string = Utils_1.default.formatNumber(value);
          });
        }
      }
      submit() {
        let coin = Utils_1.default.stringToInt(this.edbCoin.string);
        if (coin <= 0) {
          App_1.default.instance.alertDialog.showMsg("S\u1ed1 ti\u1ec1n \u0111\xe3 nh\u1eadp kh\xf4ng h\u1ee3p l\u1ec7.");
          return;
        }
        App_1.default.instance.showLoading(true);
        ShootFishNetworkClient_1.default.getInstance().request("xxengCashin", {
          ccash: -coin
        }, res => {
          App_1.default.instance.showLoading(false);
          if (!res["ok"]) {
            App_1.default.instance.alertDialog.showMsg("Thao t\xe1c th\u1ea5t b\u1ea1i, vui l\xf2ng th\u1eed l\u1ea1i sau.");
            return;
          }
          Configs_1.default.Login.CoinFish = res["newCash"];
          BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN);
          App_1.default.instance.alertDialog.showMsg("Thao t\xe1c th\xe0nh c\xf4ng.");
          this.reset();
          MiniGameNetworkClient_1.default.getInstance().send(new Lobby_Cmd_1.default.ReqGetMoneyUse());
        }, this.popup);
      }
      reset() {
        this.edbCoin.string = "";
        this.lblBalance.string = Utils_1.default.formatNumber(Configs_1.default.Login.CoinFish);
      }
    };
    __decorate([ property(cc.Label) ], TabCashOut.prototype, "lblBalance", void 0);
    __decorate([ property(cc.EditBox) ], TabCashOut.prototype, "edbCoin", void 0);
    __decorate([ property(cc.Node) ], TabCashOut.prototype, "quickButtons", void 0);
    TabCashOut = __decorate([ ccclass("PopupCoinTransfer.TabCashOut") ], TabCashOut);
    exports.TabCashOut = TabCashOut;
    let PopupCoinTransfer = class PopupCoinTransfer extends Dialog_1.default {
      constructor() {
        super(...arguments);
        this.tabs = null;
        this.tabContents = null;
        this.tabCashIn = null;
        this.tabCashOut = null;
        this.tabSelectedIdx = 0;
      }
      start() {
        for (let i = 0; i < this.tabs.toggleItems.length; i++) this.tabs.toggleItems[i].node.on("toggle", () => {
          this.tabSelectedIdx = i;
          this.onTabChanged();
        });
        BroadcastReceiver_1.default.register(BroadcastReceiver_1.default.USER_UPDATE_COIN, () => {
          this.tabCashIn.lblBalance.string = Utils_1.default.formatNumber(Configs_1.default.Login.Coin);
          this.tabCashOut.lblBalance.string = Utils_1.default.formatNumber(Configs_1.default.Login.CoinFish);
        }, this);
        this.tabCashIn.start(this);
        this.tabCashOut.start(this);
      }
      show() {
        super.show();
        this.tabSelectedIdx = 0;
        this.tabs.toggleItems[this.tabSelectedIdx].isChecked = true;
        this.onTabChanged();
      }
      onTabChanged() {
        for (let i = 0; i < this.tabContents.childrenCount; i++) this.tabContents.children[i].active = i == this.tabSelectedIdx;
        for (let j = 0; j < this.tabs.toggleItems.length; j++) this.tabs.toggleItems[j].node.getComponentInChildren(cc.LabelOutline).color = j == this.tabSelectedIdx ? cc.Color.BLACK.fromHEX("#AA5F00") : cc.Color.BLACK.fromHEX("#4677F3");
        switch (this.tabSelectedIdx) {
         case 0:
          this.tabCashIn.reset();
          break;

         case 1:
          this.tabCashOut.reset();
        }
      }
      actSubmitCashIn() {
        this.tabCashIn.submit();
      }
      actSubmitCashOut() {
        this.tabCashOut.submit();
      }
      actClearCashIn() {
        this.tabCashIn.edbCoin.string = "0";
      }
      actClearCashOut() {
        this.tabCashOut.edbCoin.string = "0";
      }
    };
    __decorate([ property(cc.ToggleContainer) ], PopupCoinTransfer.prototype, "tabs", void 0);
    __decorate([ property(cc.Node) ], PopupCoinTransfer.prototype, "tabContents", void 0);
    __decorate([ property(TabCashIn) ], PopupCoinTransfer.prototype, "tabCashIn", void 0);
    __decorate([ property(TabCashOut) ], PopupCoinTransfer.prototype, "tabCashOut", void 0);
    PopupCoinTransfer = __decorate([ ccclass ], PopupCoinTransfer);
    exports.default = PopupCoinTransfer;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/App": void 0,
    "../../Main/Game/src/common/BroadcastReceiver": void 0,
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/common/Dialog": void 0,
    "../../Main/Game/src/common/Utils": void 0,
    "../../Main/Game/src/networks/MiniGameNetworkClient": void 0,
    "../../Main/Game/src/networks/ShootFishNetworkClient": void 0,
    "../../Main/Lobby/src/Lobby.Cmd": void 0
  } ],
  "ShootFish.PopupGuide": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bab5aIcJEpPB53KA3RPsstw", "ShootFish.PopupGuide");
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
    const ShootFish_Play_1 = require("./ShootFish.Play");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let PopupGuide = class PopupGuide extends Dialog_1.default {
      constructor() {
        super(...arguments);
        this.grid = null;
        this.itemTemplate = null;
        this.items = [];
        this.mapFishType = {
          0: [ "Cuttle", 1 ],
          1: [ "GoldFish", 1 ],
          2: [ "LightenFish", 1 ],
          3: [ "Mermaid", 1 ],
          4: [ "Octopus", 1 ],
          5: [ "PufferFish", 1 ],
          6: [ "SeaFish", 1 ],
          7: [ "Shark", 1 ],
          8: [ "Stringray", 1 ],
          9: [ "Turtle", 1 ],
          10: [ "CaThanTai", 1 ],
          11: [ "FlyingFish", 1 ],
          12: [ "GoldenFrog", .2 ],
          13: [ "SeaTurtle", 1 ],
          14: [ "MerMan", 1 ],
          15: [ "Phoenix", .7 ],
          16: [ "MermaidBig", .6 ],
          17: [ "MermaidSmall", .6 ],
          18: [ "BombFish", .6 ],
          19: [ "Fish19", .6 ],
          20: [ "Fish20", .6 ],
          21: [ "Fish21", .4 ],
          22: [ "Fish22", .3 ],
          23: [ "Fish23", .3 ],
          24: [ "Fish24", .3 ]
        };
      }
      show() {
        super.show();
        this.itemTemplate.active = false;
      }
      _onShowed() {
        super._onShowed();
        if (null == ShootFish_Play_1.default.SERVER_CONFIG) return;
        for (let fishId in this.mapFishType) {
          let fishName = this.mapFishType[fishId][0];
          let scale = this.mapFishType[fishId][1];
          let dataConfig = ShootFish_Play_1.default.SERVER_CONFIG["FishPhysicalData"][fishName];
          let node = cc.instantiate(this.itemTemplate);
          node.parent = this.grid;
          node.active = true;
          let fish = cc.instantiate(ShootFish_Play_1.default.instance.getFishAnimByType(Number(fishId)));
          fish.parent = node.getChildByName("fishParent");
          fish.scale = scale;
          fish.angle = 35;
          node.getChildByName("lblFactor").getComponent(cc.Label).string = (dataConfig["Health"] / 100).toString();
          this.items.push(node);
        }
      }
      dismiss() {
        this.items.forEach(x => {
          x.removeFromParent();
        });
        super.dismiss();
      }
    };
    __decorate([ property(cc.Node) ], PopupGuide.prototype, "grid", void 0);
    __decorate([ property(cc.Node) ], PopupGuide.prototype, "itemTemplate", void 0);
    PopupGuide = __decorate([ ccclass ], PopupGuide);
    exports.default = PopupGuide;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/Dialog": void 0,
    "./ShootFish.Play": "ShootFish.Play"
  } ]
}, {}, [ "ShootFish.Bullet", "ShootFish.CoinEffect", "ShootFish.EffectBigWin", "ShootFish.EffectJackpot", "ShootFish.Fish", "ShootFish.Lobby", "ShootFish.PanelMenu", "ShootFish.Play", "ShootFish.Player", "ShootFish.PopupCoinTransfer", "ShootFish.PopupGuide" ]);