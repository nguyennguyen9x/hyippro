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
  "TienLen.CardGroup": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "64e01WTFY9HWKELM3zTT4BQ", "TienLen.CardGroup");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.TienLenCardGroup = exports.TienLenCardDTO = exports.CardGroupType = void 0;
    var CardGroupType;
    (function(CardGroupType) {
      CardGroupType[CardGroupType["MOT_LA"] = 0] = "MOT_LA";
      CardGroupType[CardGroupType["MOT_DOI"] = 1] = "MOT_DOI";
      CardGroupType[CardGroupType["SAM_CO"] = 2] = "SAM_CO";
      CardGroupType[CardGroupType["SANH"] = 3] = "SANH";
      CardGroupType[CardGroupType["TU_QUY"] = 4] = "TU_QUY";
      CardGroupType[CardGroupType["HAI_TU_QUY"] = 5] = "HAI_TU_QUY";
      CardGroupType[CardGroupType["BA_DOI_THONG"] = 6] = "BA_DOI_THONG";
      CardGroupType[CardGroupType["BON_DOI_THONG"] = 7] = "BON_DOI_THONG";
      CardGroupType[CardGroupType["NAM_DOI_THONG"] = 8] = "NAM_DOI_THONG";
      CardGroupType[CardGroupType["SAU_DOI_THUONG"] = 9] = "SAU_DOI_THUONG";
      CardGroupType[CardGroupType["SAU_DOI_THONG"] = 10] = "SAU_DOI_THONG";
      CardGroupType[CardGroupType["SANH_RONG"] = 11] = "SANH_RONG";
      CardGroupType[CardGroupType["HAI_DOI_THONG"] = 12] = "HAI_DOI_THONG";
    })(CardGroupType = exports.CardGroupType || (exports.CardGroupType = {}));
    class TienLenCardDTO {
      constructor(id) {
        this.id = id;
        this.suit = id + 1;
        while (this.suit > 4) this.suit -= 4;
        this.number = (id + 1 - this.suit) / 4 + 3;
        this.number > 13 && (this.number -= 13);
      }
      static fromCardId(id) {
        return new TienLenCardDTO(id);
      }
      get isHeo() {
        return 2 == this.number;
      }
      equals(target) {
        return target && this.number === target.number && this.suit === target.suit;
      }
      isSameNumber(target) {
        return target && this.number === target.number;
      }
      isSameSuit(target) {
        return target && this.suit === target.suit;
      }
      static nextStraightNumber(cardNumber) {
        if (2 === cardNumber) return -1;
        return (13 === cardNumber ? 1 : cardNumber) + 1;
      }
    }
    exports.TienLenCardDTO = TienLenCardDTO;
    class TienLenCardGroup {
      constructor(cards) {
        this.cards = null;
        this.cardsByNumbers = null;
        this.cards = TienLenCardGroup.sortCards(cards);
        this.cardsByNumbers = new Map();
        cards.forEach(card => {
          void 0 === this.cardsByNumbers.get(card.number) && this.cardsByNumbers.set(card.number, []);
          this.cardsByNumbers.get(card.number).push(card);
        });
      }
      getOrderedBySuit() {
        var newMap = new Map(this.cardsByNumbers);
        var orderedCards = [];
        for (var [key, value] of newMap) if (4 == value.length) {
          orderedCards = orderedCards.concat(value);
          newMap.delete(key);
        }
        for (var [key, value] of newMap) if (value.length >= 2) {
          var _key = TienLenCardGroup.getNextKey(key);
          if (newMap.get(_key) && newMap.get(_key).length >= 2) {
            var __key = TienLenCardGroup.getNextKey(_key);
            if (newMap.get(__key) && newMap.get(__key).length >= 2) {
              orderedCards = orderedCards.concat([ value.shift(), value.shift() ]);
              value.length <= 0 && newMap.delete(key);
              var _value = newMap.get(_key);
              orderedCards = orderedCards.concat([ _value.shift(), _value.shift() ]);
              _value.length <= 0 && newMap.delete(_key);
              var __value = newMap.get(__key);
              orderedCards = orderedCards.concat([ __value.shift(), __value.shift() ]);
              __value.length <= 0 && newMap.delete(__key);
              var ___key = TienLenCardGroup.getNextKey(__key);
              if (newMap.get(___key) && newMap.get(___key).length >= 2) {
                var ___value = newMap.get(___key);
                orderedCards = orderedCards.concat([ ___value.shift(), ___value.shift() ]);
                ___value.length <= 0 && newMap.delete(___key);
              }
              break;
            }
          }
        }
        for (var [key, value] of newMap) if (3 == value.length) {
          orderedCards = orderedCards.concat(value);
          newMap.delete(key);
        }
        do {
          var sequenceSuites = TienLenCardGroup.getFirstSequenceSuit([ ...newMap.keys() ], 3);
          sequenceSuites && sequenceSuites.forEach(function(_value, i) {
            orderedCards = orderedCards.concat([ newMap.get(_value).shift() ]);
            newMap.get(_value).length <= 0 && newMap.delete(_value);
          });
        } while (sequenceSuites);
        for (var [key, value] of newMap) if (2 == value.length) {
          orderedCards = orderedCards.concat(value);
          newMap.delete(key);
        }
        for (var [key, value] of newMap) {
          orderedCards = orderedCards.concat(value);
          newMap.delete(key);
        }
        return orderedCards;
      }
      getCardGroupType() {
        let newMap = new Map(this.cardsByNumbers);
        let mapSize = newMap.size;
        let keys = [ ...newMap.keys() ];
        switch (mapSize) {
         case 1:
          return 1 == newMap.get(keys[0]).length ? CardGroupType.MOT_LA : 2 == newMap.get(keys[0]).length ? CardGroupType.MOT_DOI : 3 == newMap.get(keys[0]).length ? CardGroupType.SAM_CO : CardGroupType.TU_QUY;

         case 2:
          return CardGroupType.HAI_TU_QUY;

         case 3:
          return 1 == newMap.get(keys[0]).length ? CardGroupType.SANH : CardGroupType.BA_DOI_THONG;

         case 4:
          return 1 == newMap.get(keys[0]).length ? CardGroupType.SANH : CardGroupType.BON_DOI_THONG;

         default:
          return CardGroupType.SANH;
        }
      }
      detectSuggestionBySelectedCards(selectedCards, lastSelectedCard, isMyTurn = false) {
        let listSuggestion;
        if (isMyTurn) {
          listSuggestion = this.get_TU_QUY([], selectedCards);
          if (listSuggestion.length > 0) return listSuggestion;
          listSuggestion = this.get_BON_DOI_THONG([], selectedCards);
          if (listSuggestion.length > 0) return listSuggestion;
          listSuggestion = this.get_BA_DOI_THONG([], selectedCards);
          if (listSuggestion.length > 0) return listSuggestion;
        } else {
          listSuggestion = this.get_BON_DOI_THONG([], selectedCards);
          if (listSuggestion.length > 0) return listSuggestion;
          listSuggestion = this.get_BA_DOI_THONG([], selectedCards);
          if (listSuggestion.length > 0) return listSuggestion;
          listSuggestion = this.get_TU_QUY([], selectedCards);
          if (listSuggestion.length > 0) return listSuggestion;
          listSuggestion = this.getSequenceSuitBySelectedCards(lastSelectedCard, selectedCards);
          if (listSuggestion.length > 0) return listSuggestion;
          listSuggestion = this.get_SAM_CO([], selectedCards);
          if (listSuggestion.length > 0) return listSuggestion;
        }
        return listSuggestion;
      }
      detectSuggestionByCurrentTurnCards(currentTurnCards, lastSelectedCard) {
        const currentTurnCardGroup = new TienLenCardGroup(currentTurnCards);
        const currentTurnCardType = currentTurnCardGroup.getCardGroupType();
        const maxSubmitCard = TienLenCardGroup.getMaxCardOfCards(currentTurnCards);
        const newMap = new Map(this.cardsByNumbers);
        let listSuggestion = new Array();
        switch (currentTurnCardType) {
         case CardGroupType.MOT_LA:
          for (var i = 0; i < this.cards.length; i++) TienLenCardGroup.point(this.cards[i]) > TienLenCardGroup.point(maxSubmitCard) && listSuggestion.push([ this.cards[i] ]);
          break;

         case CardGroupType.MOT_DOI:
          for (var [key, value] of newMap) {
            if (1 == value.length) continue;
            if (value.length >= 2) for (var i = 0; i < value.length; i++) TienLenCardGroup.point(value[i]) > TienLenCardGroup.point(maxSubmitCard) && listSuggestion.push([ value.shift(), value.shift() ]);
          }
          break;

         case CardGroupType.SAM_CO:
          for (var [key, value] of newMap) {
            if (value.length < 3) continue;
            key > maxSubmitCard.number && listSuggestion.push([ value.shift(), value.shift(), value.shift() ]);
          }
          break;

         case CardGroupType.TU_QUY:
          listSuggestion = this.get_BON_DOI_THONG(currentTurnCards);
          if (listSuggestion.length > 0) return listSuggestion;
          listSuggestion = this.get_TU_QUY(currentTurnCards);
          break;

         case CardGroupType.HAI_TU_QUY:
          listSuggestion = this.get_TU_QUY(currentTurnCards);
          break;

         case CardGroupType.BA_DOI_THONG:
          listSuggestion = this.get_BON_DOI_THONG(currentTurnCards);
          if (listSuggestion.length > 0) return listSuggestion;
          listSuggestion = this.get_TU_QUY(currentTurnCards);
          if (listSuggestion.length > 0) return listSuggestion;
          listSuggestion = this.get_BA_DOI_THONG(currentTurnCards);
          break;

         case CardGroupType.BON_DOI_THONG:
          for (var [key, value] of newMap) if (value.length >= 2) {
            var _key = TienLenCardGroup.getNextKey(key);
            if (newMap.get(_key) && newMap.get(_key).length >= 2) {
              var __key = TienLenCardGroup.getNextKey(_key);
              if (newMap.get(__key) && newMap.get(__key).length >= 2) {
                var ___key = TienLenCardGroup.getNextKey(__key);
                if (newMap.get(___key) && newMap.get(___key).length >= 2) {
                  var orderedCards = [ value.shift(), value.shift() ];
                  var _value = newMap.get(_key);
                  orderedCards = orderedCards.concat([ _value.shift(), _value.shift() ]);
                  var __value = newMap.get(__key);
                  orderedCards = orderedCards.concat([ __value.shift(), __value.shift() ]);
                  var ___value = newMap.get(___key);
                  orderedCards = orderedCards.concat([ ___value.shift(), ___value.shift() ]);
                  var maxCard = TienLenCardGroup.getMaxCardOfCards(orderedCards);
                  TienLenCardGroup.point(maxCard) > TienLenCardGroup.point(maxSubmitCard) && listSuggestion.push(orderedCards);
                }
                break;
              }
            }
          }
          break;

         case CardGroupType.SANH:
          listSuggestion = this.getSequenceSuitByCurrentTurnCards(currentTurnCards, lastSelectedCard);
        }
        return listSuggestion;
      }
      getSequenceSuitByCurrentTurnCards(currentTurnCards, selectedCard) {
        let orderedNumbers = [ ...this.cardsByNumbers.keys() ].sort((a, b) => (1 == a ? 14 : a) - (1 == b ? 14 : b));
        let listSg = [];
        let listTmp = [];
        orderedNumbers.forEach((orderNumber, i) => {
          const cardNumber = 14 == orderNumber ? 1 : orderNumber;
          const cardsByNumber = this.cardsByNumbers.get(cardNumber);
          if (!cardsByNumber || cardsByNumber[0].isHeo) {
            if (listTmp.length >= currentTurnCards.length && listTmp.find(cardsByNumber => cardsByNumber.find(card => card.equals(selectedCard)))) for (let i = 0; i <= listTmp.length - currentTurnCards.length; i++) {
              let tmp = [];
              for (let j = i; j < i + currentTurnCards.length; j++) {
                const firstCard = listTmp[j][0];
                tmp.push(firstCard.isSameNumber(selectedCard) ? selectedCard : firstCard);
              }
              listSg.push(tmp);
            }
            listTmp = [];
            return;
          }
          listTmp.push(cardsByNumber);
          const cardsByNextSequenceNumber = i + 1 < orderedNumbers.length ? this.cardsByNumbers.get(TienLenCardDTO.nextStraightNumber(cardNumber)) : null;
          if (!cardsByNextSequenceNumber) {
            if (listTmp.length >= currentTurnCards.length && listTmp.find(cardsByNumber => cardsByNumber.find(card => card.equals(selectedCard)))) for (let i = 0; i <= listTmp.length - currentTurnCards.length; i++) {
              let tmp = [];
              for (let j = i; j < i + currentTurnCards.length; j++) {
                const firstCard = listTmp[j][0];
                tmp.push(firstCard.isSameNumber(selectedCard) ? selectedCard : firstCard);
              }
              listSg.push(tmp);
            }
            listTmp = [];
            return;
          }
        });
        return listSg;
      }
      getSequenceSuitBySelectedCards(lastSelectedCard, selectedCards) {
        if (selectedCards.length < 2) return [];
        let orderedNumbers = [ ...this.cardsByNumbers.keys() ].sort((a, b) => (1 == a ? 14 : a) - (1 == b ? 14 : b));
        let listSg = [];
        let listTmp = [];
        orderedNumbers.forEach((orderNumber, i) => {
          const cardNumber = 14 == orderNumber ? 1 : orderNumber;
          const cardsByNumber = this.cardsByNumbers.get(cardNumber);
          if (!cardsByNumber || cardsByNumber[0].isHeo) {
            if (listTmp.length >= 3 && listTmp.find(cardsByNumber => cardsByNumber.find(card => card.equals(lastSelectedCard)))) {
              let tmp = [];
              for (let j = 0; j < listTmp.length; j++) {
                const firstCard = listTmp[j][0];
                if (firstCard.isSameNumber(lastSelectedCard)) tmp.push(lastSelectedCard); else {
                  const selectedCard = selectedCards.find(card => card.isSameNumber(firstCard));
                  tmp.push(selectedCard || firstCard);
                }
              }
              selectedCards.filter(card => tmp.find(cardTmp => card.equals(cardTmp))).length >= 2 && listSg.push(tmp);
            }
            listTmp = [];
            return;
          }
          listTmp.push(cardsByNumber);
          const cardsByNextSequenceNumber = i + 1 < orderedNumbers.length ? this.cardsByNumbers.get(TienLenCardDTO.nextStraightNumber(cardNumber)) : null;
          if (!cardsByNextSequenceNumber) {
            if (listTmp.length >= 3 && listTmp.find(cardsByNumber => cardsByNumber.find(card => card.equals(lastSelectedCard)))) {
              let tmp = [];
              for (let j = 0; j < listTmp.length; j++) {
                const firstCard = listTmp[j][0];
                if (firstCard.isSameNumber(lastSelectedCard)) tmp.push(lastSelectedCard); else {
                  const selectedCard = selectedCards.find(card => card.isSameNumber(firstCard));
                  tmp.push(selectedCard || firstCard);
                }
              }
              selectedCards.filter(card => tmp.find(cardTmp => card.equals(cardTmp))).length >= 2 && listSg.push(tmp);
            }
            listTmp = [];
            return;
          }
        });
        return listSg;
      }
      get_BA_DOI_THONG(submitCards, selectedCards = null) {
        if (submitCards.length > 0) {
          let listCard = new Array();
          let listTmp2 = new Array();
          let listTmp = new Array();
          let listSg = new Array();
          for (var [key, value] of new Map(this.cardsByNumbers)) listCard.push({
            number: key,
            value: value
          });
          for (let i = 0; i < listCard.length; i++) if (i + 1 < listCard.length && TienLenCardGroup.cardRank(listCard[i].number) == TienLenCardGroup.cardRank(listCard[i + 1].number) - 1 && listCard[i].value.length >= 2 && listCard[i + 1].value.length >= 2) listTmp.push(listCard[i]); else {
            listCard[i].value.length >= 2 && listTmp.push(listCard[i]);
            listTmp.length >= 3 && listTmp2.push(listTmp);
            listTmp = new Array();
          }
          for (let i = 0; i < listTmp2.length; i++) for (let j = 0; j < listTmp2[i].length - 2; j++) {
            let tmp = new Array();
            for (let l = j; l < j + 3; l++) for (let k = 0; k < 2; k++) tmp.push(listTmp2[i][l].value[k]);
            listSg.push(tmp);
          }
          return listSg;
        }
        {
          let listSg = new Array();
          if (selectedCards.length >= 2) {
            let listCard = new Array();
            let listTmp2 = new Array();
            let listTmp = new Array();
            for (var [key, value] of new Map(this.cardsByNumbers)) listCard.push({
              number: key,
              value: value
            });
            for (let i = 0; i < listCard.length; i++) if (i + 1 < listCard.length && TienLenCardGroup.cardRank(listCard[i].number) == TienLenCardGroup.cardRank(listCard[i + 1].number) - 1 && listCard[i].value.length >= 2 && listCard[i + 1].value.length >= 2) listTmp.push(listCard[i]); else {
              listCard[i].value.length >= 2 && listTmp.push(listCard[i]);
              listTmp.length >= 3 && listTmp2.push(listTmp);
              listTmp = new Array();
            }
            for (let i = 0; i < listTmp2.length; i++) for (let j = 0; j < listTmp2[i].length - 2; j++) {
              let tmp = new Array();
              for (let l = j; l < j + 3; l++) for (let k = 0; k < 2; k++) tmp.push(listTmp2[i][l].value[k]);
              if (selectedCards.filter(e => tmp.findIndex(e2 => e.equals(e2)) >= 0).length >= 2) {
                listSg.push(tmp);
                return listSg;
              }
            }
          }
          return listSg;
        }
      }
      get_BON_DOI_THONG(submitCards, selectedCards = null) {
        if (submitCards.length > 0) {
          let listCard = new Array();
          let listTmp2 = new Array();
          let listTmp = new Array();
          let listSg = new Array();
          for (var [key, value] of new Map(this.cardsByNumbers)) listCard.push({
            number: key,
            value: value
          });
          for (let i = 0; i < listCard.length; i++) if (i + 1 < listCard.length && TienLenCardGroup.cardRank(listCard[i].number) == TienLenCardGroup.cardRank(listCard[i + 1].number) - 1 && listCard[i].value.length >= 2 && listCard[i + 1].value.length >= 2) listTmp.push(listCard[i]); else {
            listCard[i].value.length >= 2 && listTmp.push(listCard[i]);
            listTmp.length >= 3 && listTmp2.push(listTmp);
            listTmp = new Array();
          }
          for (let i = 0; i < listTmp2.length; i++) for (let j = 0; j < listTmp2[i].length - 3; j++) {
            let tmp = new Array();
            for (let l = j; l < j + 4; l++) for (let k = 0; k < 2; k++) tmp.push(listTmp2[i][l].value[k]);
            listSg.push(tmp);
          }
          return listSg;
        }
        {
          let listSg = new Array();
          if (selectedCards.length >= 2) {
            let listCard = new Array();
            let listTmp2 = new Array();
            let listTmp = new Array();
            for (var [key, value] of new Map(this.cardsByNumbers)) listCard.push({
              number: key,
              value: value
            });
            for (let i = 0; i < listCard.length; i++) if (i + 1 < listCard.length && TienLenCardGroup.cardRank(listCard[i].number) == TienLenCardGroup.cardRank(listCard[i + 1].number) - 1 && listCard[i].value.length >= 2 && listCard[i + 1].value.length >= 2) listTmp.push(listCard[i]); else {
              listCard[i].value.length >= 2 && listTmp.push(listCard[i]);
              listTmp.length >= 3 && listTmp2.push(listTmp);
              listTmp = new Array();
            }
            for (let i = 0; i < listTmp2.length; i++) for (let j = 0; j < listTmp2[i].length - 3; j++) {
              let tmp = new Array();
              for (let l = j; l < j + 4; l++) for (let k = 0; k < 2; k++) tmp.push(listTmp2[i][l].value[k]);
              if (selectedCards.filter(e => tmp.findIndex(e2 => e.equals(e2)) >= 0).length >= 2) {
                listSg.push(tmp);
                return listSg;
              }
            }
          }
          return listSg;
        }
      }
      get_TU_QUY(submitCards, selectedCards = null) {
        if (submitCards.length > 0) {
          let listSg = new Array();
          for (var [key, value] of new Map(this.cardsByNumbers)) 4 == value.length && listSg.push(value);
          return listSg;
        }
        {
          let listSg = new Array();
          if (selectedCards.length >= 2) for (var [key, value] of new Map(this.cardsByNumbers)) if (4 == value.length && selectedCards.filter(e => value.findIndex(e2 => e.equals(e2)) >= 0).length >= 2) {
            listSg.push(value);
            return listSg;
          }
          return listSg;
        }
      }
      get_SAM_CO(submitCards, selectedCards = null) {
        let listSg = new Array();
        if (selectedCards.length >= 2) for (var [key, value] of new Map(this.cardsByNumbers)) {
          let tmp = new Array();
          if (value.length < 3) continue;
          if (key > 2) {
            tmp = [ value.shift(), value.shift(), value.shift() ];
            selectedCards.filter(e => tmp.findIndex(e2 => e.equals(e2)) >= 0).length >= 2 && listSg.push(tmp);
            return listSg;
          }
        }
        return listSg;
      }
      static getMaxCardOfCards(cards) {
        return TienLenCardGroup.sortCards(cards)[cards.length - 1];
      }
      static getNextKey(key) {
        return 13 == key ? 1 : key + 1;
      }
      static subCards(cards, subCards) {
        return cards.filter(function(value) {
          var found = false;
          subCards.forEach(function(_value, i) {
            if (value.number == _value.number && value.suit == _value.suit) {
              found = true;
              return;
            }
          });
          return !found;
        });
      }
      static sortSuits(suits) {
        suits.sort(function(a, b) {
          return (a + 10) % 13 - (b + 10) % 13;
        });
      }
      static sortCards(cards) {
        return cards.sort(function(a, b) {
          return TienLenCardGroup.point(a) - TienLenCardGroup.point(b);
        });
      }
      static point(card) {
        return (card.number + 10) % 13 * 4 + card.suit;
      }
      static getFirstSequenceSuit(suits, minCount) {
        if (!suits) return null;
        if (minCount <= 1 || minCount > suits.length) return null;
        var _suits = [ ...suits ];
        TienLenCardGroup.sortSuits(_suits);
        var temp = [];
        do {
          var curr = _suits.shift();
          if (2 == curr) break;
          if (temp.length > 0 && (1 != curr && curr - temp[temp.length - 1] > 1 || 1 == curr && 13 != temp[temp.length - 1])) {
            if (temp.length >= minCount) return temp;
            temp = [];
          }
          temp.push(curr);
        } while (0 != _suits.length);
        if (temp.length >= minCount) return temp;
        return null;
      }
      static getFirstSequenceSuitBySize(map, count, maxCard) {
        if (!map) return null;
        if (count <= 1 || count > map.length) return null;
        var _suits = [ ...map.keys() ];
        TienLenCardGroup.sortSuits(_suits);
        var temp = [];
        for (var i = 0; i < _suits.length - 1; i++) {
          var curr = _suits[i];
          var next = _suits[i + 1];
          if (1 == curr) {
            var listCards = map.get(curr);
            for (let j = 0; j < listCards.length; j++) TienLenCardGroup.point(listCards[j]) > TienLenCardGroup.point(maxCard) && temp.push(listCards[j]);
          }
          if (curr < maxCard.number - count) {
            map.delete(curr);
            continue;
          }
          if (2 == curr || 2 == next) break;
          if (temp.length == count - 1) {
            var listCards = map.get(curr);
            for (let j = 0; j < listCards.length; j++) TienLenCardGroup.point(listCards[j]) > TienLenCardGroup.point(maxCard) && temp.push(listCards[j]);
            map.delete(_suits.shift());
            return TienLenCardGroup.getFirstSequenceSuitBySize(map, count, maxCard);
          }
          if (next - curr == 1 || 1 == next && 13 == curr) {
            var listCards = map.get(curr);
            temp.push(listCards[0]);
          } else {
            map.delete(_suits.shift());
            temp.push(TienLenCardGroup.getFirstSequenceSuitBySize(map, count, maxCard));
          }
        }
        if (temp.length == count) return temp;
        return null;
      }
      static cardRank(cardNumber) {
        return (cardNumber + 10) % 13;
      }
      static indexsToCards(indexs) {
        let cards = [];
        indexs.forEach(index => {
          cards.push(TienLenCardDTO.fromCardId(index));
        });
        return cards;
      }
      static cardsToIndexs(cards) {
        let indexs = [];
        cards.forEach(card => {
          indexs.push(TienLenCardGroup.cardToIndex(card));
        });
        return indexs;
      }
      static cardToIndex(card) {
        return (card.number + 10) % 13 * 4 + card.suit - 1;
      }
    }
    exports.TienLenCardGroup = TienLenCardGroup;
    cc._RF.pop();
  }, {} ],
  "TienLen.Card": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c50a54Af+5A7Ii1aiHY1pUT", "TienLen.Card");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const TienLen_InGame_1 = require("./TienLen.InGame");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let TienLenCard = class TienLenCard extends cc.Component {
      constructor() {
        super(...arguments);
        this.spr = null;
        this.posY = 0;
        this.offsetY = 20;
        this.isSelected = false;
        this.callback = null;
        this.cardDTO = null;
        this.moveAction = null;
      }
      start() {
        this.posY = this.node.y;
      }
      onSelect() {
        this.node.y += this.isSelected ? 0 : this.offsetY;
        this.isSelected = !this.isSelected;
        this.isSelected && this.callback && this.callback(this.cardDTO);
      }
      setCardData(cardDTO, callback = null) {
        this.cardDTO = cardDTO;
        this.spr.spriteFrame = TienLen_InGame_1.default.getInstance().getCardFrame(cardDTO.id);
        this.callback = callback;
      }
      getCardDTO() {
        return this.cardDTO;
      }
      select() {
        this.node.y = this.posY + this.offsetY;
        this.isSelected = true;
      }
      deSelect() {
        this.node.y = this.posY;
        this.isSelected = false;
      }
      moveCard(time, pos) {
        null != this.moveAction && this.node.stopAction(this.moveAction);
        this.moveAction = cc.moveTo(time, pos).easing(cc.easeCubicActionOut());
        this.node.runAction(this.moveAction);
      }
    };
    __decorate([ property(cc.Sprite) ], TienLenCard.prototype, "spr", void 0);
    TienLenCard = __decorate([ ccclass ], TienLenCard);
    exports.default = TienLenCard;
    cc._RF.pop();
  }, {
    "./TienLen.InGame": "TienLen.InGame"
  } ],
  "TienLen.Cmd": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e0a41YHXsZDBYEqWON2rQf/", "TienLen.Cmd");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.TienLenCmd = void 0;
    const Network_OutPacket_1 = require("../../Main/Game/src/networks/Network.OutPacket");
    const Network_InPacket_1 = require("../../Main/Game/src/networks/Network.InPacket");
    const TienLen_CardGroup_1 = require("./TienLen.CardGroup");
    const TienLen_InGame_1 = require("./TienLen.InGame");
    const {ccclass: ccclass} = cc._decorator;
    var TienLenCmd;
    (function(TienLenCmd) {
      class Code {}
      Code.LOGIN = 1;
      Code.NOTIFY_DISCONNECT = 37;
      Code.PING_PONG = 50;
      Code.JOIN_ROOM = 3001;
      Code.MONEY_BET_CONFIG = 3003;
      Code.JOIN_ROOM_FAIL = 3004;
      Code.QUICK_ROOM_SUCCEED = 3006;
      Code.CHAT_ROOM = 3008;
      Code.JOIN_GAME_ROOM_BY_ID = 3015;
      Code.DANH_BAI = 3101;
      Code.START_GAME = 3102;
      Code.END_GAME = 3103;
      Code.THANG_TRANG = 3104;
      Code.CHIA_BAI = 3105;
      Code.BO_LUOT = 3106;
      Code.AUTO_START = 3107;
      Code.FIRST_TURN = 3108;
      Code.UPDATE_GAME_INFO = 3110;
      Code.REQUEST_LEAVE_ROOM = 3111;
      Code.CHANGE_TURN = 3112;
      Code.CHAT_CHONG = 3113;
      Code.CHEAT_CARDS = 3115;
      Code.HOLD = 3116;
      Code.JOIN_ROOM_SUCCESS = 3118;
      Code.USER_LEAVE_ROOM = 3119;
      Code.NOTIFY_KICK_OFF = 3120;
      Code.USER_JOIN_ROOM = 3121;
      Code.UPDATE_MATCH = 3123;
      Code.WAIT_4_DOI_THONG = 3124;
      Code.CARDS_DEFINE = 3999;
      TienLenCmd.Code = Code;
      class SendMoneyBetConfig extends Network_OutPacket_1.default {
        constructor() {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.MONEY_BET_CONFIG);
          this.packHeader();
          this.updateSize();
        }
      }
      TienLenCmd.SendMoneyBetConfig = SendMoneyBetConfig;
      class SendJoinRoom extends Network_OutPacket_1.default {
        constructor(type, max, bet, rule) {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.JOIN_ROOM);
          this.packHeader();
          this.putInt(type);
          this.putInt(max);
          this.putLong(bet);
          this.putInt(rule);
          this.updateSize();
        }
      }
      TienLenCmd.SendJoinRoom = SendJoinRoom;
      class SendJoinRoomById extends Network_OutPacket_1.default {
        constructor(id) {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.JOIN_GAME_ROOM_BY_ID);
          this.packHeader();
          this.putInt(id);
          this.putString("");
          this.updateSize();
        }
      }
      TienLenCmd.SendJoinRoomById = SendJoinRoomById;
      class SendChatRoom extends Network_OutPacket_1.default {
        constructor(a, b) {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.CHAT_ROOM);
          this.packHeader();
          this.putByte(a ? 1 : 0);
          this.putString(encodeURI(b));
          this.updateSize();
        }
      }
      TienLenCmd.SendChatRoom = SendChatRoom;
      class SendTest extends Network_OutPacket_1.default {
        constructor(a) {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(0);
          this.packHeader();
          this.putString(a);
          this.putInt(111);
          this.putLong(2147483647);
          this.putLong(325);
          this.putLong(8686);
          this.updateSize();
        }
      }
      TienLenCmd.SendTest = SendTest;
      class SendLogin extends Network_OutPacket_1.default {
        constructor(a, b) {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.LOGIN);
          this.packHeader();
          this.putString(a);
          this.putString(b);
          this.updateSize();
        }
      }
      TienLenCmd.SendLogin = SendLogin;
      class SendReconnectRoom extends Network_OutPacket_1.default {
        constructor() {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.RECONNECT_GAME_ROOM);
          this.packHeader();
          this.updateSize();
        }
      }
      TienLenCmd.SendReconnectRoom = SendReconnectRoom;
      class SendReadyAutoStart extends Network_OutPacket_1.default {
        constructor() {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(3124);
          this.packHeader();
          this.updateSize();
        }
      }
      TienLenCmd.SendReadyAutoStart = SendReadyAutoStart;
      class SendStartGame extends Network_OutPacket_1.default {
        constructor() {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.START_GAME);
          this.packHeader();
          this.updateSize();
        }
      }
      TienLenCmd.SendStartGame = SendStartGame;
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
      TienLenCmd.SendPing = SendPing;
      class SendDanhBai extends Network_OutPacket_1.default {
        constructor(a, b) {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.DANH_BAI);
          this.packHeader();
          this.putByte(a);
          if (!a) {
            this.putShort(b.length);
            for (let c = 0; c < b.length; c++) this.putByte(b[c]);
          }
          this.updateSize();
        }
      }
      TienLenCmd.SendDanhBai = SendDanhBai;
      class SendBoLuot extends Network_OutPacket_1.default {
        constructor(a) {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.DANH_BAI);
          this.packHeader();
          this.putByte(a);
          this.updateSize();
        }
      }
      TienLenCmd.SendBoLuot = SendBoLuot;
      class SendRequestLeaveGame extends Network_OutPacket_1.default {
        constructor() {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.REQUEST_LEAVE_ROOM);
          this.packHeader();
          this.updateSize();
        }
      }
      TienLenCmd.SendRequestLeaveGame = SendRequestLeaveGame;
      class SendCardDefinations extends Network_OutPacket_1.default {
        constructor() {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.CARDS_DEFINE);
          this.packHeader();
          this.updateSize();
        }
      }
      TienLenCmd.SendCardDefinations = SendCardDefinations;
      class SendCheatCards extends Network_OutPacket_1.default {
        constructor(a, b) {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.CHEAT_CARDS);
          this.packHeader();
          this.putByte(a);
          this.putByte(0);
          this.putShort(b.length);
          if (a) for (var c = 0; c < b.length; c++) this.putByte(b[c]);
          this.updateSize();
        }
      }
      TienLenCmd.SendCheatCards = SendCheatCards;
      class ReceivedMoneyBetConfig extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.list = [];
          this.rules = [];
          let listSize = this.getShort();
          for (var a = 0; a < listSize; a++) {
            var b = {
              maxUserPerRoom: this.getInt(),
              moneyType: this.getByte(),
              moneyBet: this.getLong(),
              moneyRequire: this.getLong(),
              nPersion: this.getInt()
            };
            this.list.push(b);
          }
          for (a = 0; a < listSize; a++) this.rules.push(this.getByte());
        }
      }
      TienLenCmd.ReceivedMoneyBetConfig = ReceivedMoneyBetConfig;
      class ReceivedJoinRoomFail extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.error = 0;
          this.error = this.getError();
        }
      }
      TienLenCmd.ReceivedJoinRoomFail = ReceivedJoinRoomFail;
      class ReceivedJoinRoomSuccess extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.myChair = 0;
          this.moneyBet = 0;
          this.roomOwner = 0;
          this.roomId = 0;
          this.matchId = 0;
          this.moneyType = 0;
          this.playerSize = 0;
          this.playerInfos = [];
          this.gameAction = 0;
          this.currentChair = 0;
          this.countDownTime = 0;
          this.myChair = this.getByte();
          this.moneyBet = this.getLong();
          this.roomOwner = this.getByte();
          this.roomId = this.getInt();
          this.matchId = this.getInt();
          this.moneyType = this.getByte();
          this.playerSize = this.getShort();
          let playerStatus = [];
          for (let a = 0; a < this.playerSize; a++) playerStatus.push(this.getByte());
          this.playerSize = this.getShort();
          for (let a = 0; a < this.playerSize; a++) {
            let _playerInfo = new TienLen_InGame_1.TienLenSlotInfo();
            _playerInfo.avatar = this.getString();
            _playerInfo.nickName = this.getString();
            _playerInfo.money = this.getLong();
            _playerInfo.uID = 0;
            _playerInfo.cardSize = 0;
            _playerInfo.playerStatus = playerStatus[a];
            this.playerInfos.push(_playerInfo);
          }
          this.gameAction = this.getByte();
          let playerHandCardLength = this.getShort();
          for (let a = 0; a < playerHandCardLength; a++) {
            let cSize = this.getByte();
            cc.isValid(this.playerInfos[a]) && (this.playerInfos[a].cardSize = cSize);
          }
          this.currentChair = this.getByte();
          this.countDownTime = this.getByte();
        }
      }
      TienLenCmd.ReceivedJoinRoomSuccess = ReceivedJoinRoomSuccess;
      class ReceivedDisconnect extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
        }
      }
      TienLenCmd.ReceivedDisconnect = ReceivedDisconnect;
      class ReceivedUpdateGameInfo extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.maxPlayer = 0;
          this.myChair = 0;
          this.playerCards = [];
          this.boLuot = false;
          this.toiTrang = 0;
          this.newRound = false;
          this.gameServerState = 0;
          this.gameAction = 0;
          this.activeTimeRemain = 0;
          this.currentChair = 0;
          this.recentCards = [];
          this.moneyType = 0;
          this.moneyBet = 0;
          this.matchId = 0;
          this.roomId = 0;
          this.hasInfoList = [];
          this.playerInfos = [];
          this.maxPlayer = this.getByte();
          this.myChair = this.getByte();
          var b = this.getShort();
          for (var a = 0; a < b; a++) this.playerCards.push(TienLen_CardGroup_1.TienLenCardDTO.fromCardId(this.getByte()));
          this.boLuot = this.getBool();
          this.toiTrang = this.getInt();
          this.newRound = this.getBool();
          this.gameServerState = this.getByte();
          this.gameAction = this.getByte();
          this.activeTimeRemain = this.getByte();
          this.currentChair = this.getByte();
          b = this.getShort();
          for (var a = 0; a < b; a++) this.recentCards.push(TienLen_CardGroup_1.TienLenCardDTO.fromCardId(this.getByte()));
          this.moneyType = this.getByte();
          this.moneyBet = this.getLong();
          this.matchId = this.getInt();
          this.roomId = this.getInt();
          b = this.getShort();
          for (let a = 0; a < b; a++) this.hasInfoList.push(this.getBool());
          for (let a = 0; a < b; a++) {
            let plInfo = new TienLen_InGame_1.TienLenSlotInfo();
            if (this.hasInfoList[a]) {
              let cardSize = this.getByte();
              let playerStatus = this.getByte();
              let avatar = this.getString();
              let uID = this.getInt();
              let nickName = this.getString();
              let money = this.getLong();
              plInfo.cardSize = cardSize;
              plInfo.avatar = avatar;
              plInfo.uID = uID;
              plInfo.nickName = nickName;
              plInfo.money = money;
              plInfo.playerStatus = playerStatus;
            }
            this.playerInfos.push(plInfo);
          }
        }
      }
      TienLenCmd.ReceivedUpdateGameInfo = ReceivedUpdateGameInfo;
      class ReceivedAutoStart extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.isAutoStart = false;
          this.autoStartTime = 0;
          this.matchId = 0;
          this.isAutoStart = this.getBool();
          this.autoStartTime = this.getByte();
          this.matchId = this.getByte();
        }
      }
      TienLenCmd.ReceivedAutoStart = ReceivedAutoStart;
      class ReceivedChatRoom extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.chair = this.getByte();
          this.isIcon = this.getBool();
          this.content = decodeURI(this.getString());
          this.nickname = this.getString();
        }
      }
      TienLenCmd.ReceivedChatRoom = ReceivedChatRoom;
      class ReceivedChiaBai extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.cardSize = 0;
          this.cards = [];
          this.toiTrang = 0;
          this.timeBaoSam = 0;
          this.matchId = 0;
          this.playerSize = 0;
          this.playerStatus = [];
          var a = 0;
          this.cardSize = this.getShort();
          for (a = 0; a < this.cardSize; a++) this.cards.push(TienLen_CardGroup_1.TienLenCardDTO.fromCardId(this.getByte()));
          this.toiTrang = this.getByte();
          this.timeBaoSam = this.getByte();
          this.matchId = this.getInt();
          this.playerSize = this.getShort();
          for (var a = 0; a < this.playerSize; a++) this.playerStatus.push(this.getByte());
        }
      }
      TienLenCmd.ReceivedChiaBai = ReceivedChiaBai;
      class ReceivedDanhBai extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.chair = 0;
          this.cards = [];
          this.remainCardSize = 0;
          this.chair = this.getByte();
          var b = this.getShort();
          for (var a = 0; a < b; a++) this.cards.push(this.getByte());
          this.remainCardSize = this.getByte();
        }
      }
      TienLenCmd.ReceivedDanhBai = ReceivedDanhBai;
      class ReceivedBoluot extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.chair = 0;
          this.chair = this.getByte();
        }
      }
      TienLenCmd.ReceivedBoluot = ReceivedBoluot;
      class ReceivedChangeTurn extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.newRound = false;
          this.chair = 0;
          this.chairLastTurn = 0;
          this.time = 0;
          this.newRound = this.getBool();
          this.chair = this.getByte();
          this.chairLastTurn = this.getByte();
          this.time = this.getByte();
        }
      }
      TienLenCmd.ReceivedChangeTurn = ReceivedChangeTurn;
      class ReceivedWaitBonDoiThong extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.chair = 0;
          this.chair = this.getByte();
        }
      }
      TienLenCmd.ReceivedWaitBonDoiThong = ReceivedWaitBonDoiThong;
      class ReceivedNotifyRegOutRoom extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.outChair = this.getByte();
          this.isOutRoom = this.getBool();
        }
      }
      TienLenCmd.ReceivedNotifyRegOutRoom = ReceivedNotifyRegOutRoom;
      class ReceivedEndGame extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.winTypes = [];
          this.ketQuaTinhTienList = [];
          this.cards = [];
          this.sizeWinType = 0;
          this.kqTinhTienSize = 0;
          this.currentMoney = [];
          this.countDown = 0;
          this.sizeWinType = this.getShort();
          for (var a = 0; a < this.sizeWinType; a++) this.winTypes.push(this.getByte());
          this.kqTinhTienSize = this.getShort();
          for (a = 0; a < this.kqTinhTienSize; a++) this.ketQuaTinhTienList.push(this.getLong());
          var b = this.getShort();
          for (var a = 0; a < b; a++) this.currentMoney.push(this.getLong());
          var _b = b;
          for (var a = 0; a < _b; a++) {
            for (var b = this.getShort(), c = [], d = 0; d < b; d++) c.push(TienLen_CardGroup_1.TienLenCardDTO.fromCardId(this.getByte()));
            this.cards.push(c);
          }
          this.countDown = this.getByte();
        }
      }
      TienLenCmd.ReceivedEndGame = ReceivedEndGame;
      class ReceivedFirstTurnDecision extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.isRandom = false;
          this.chair = 0;
          this.cardSize = 0;
          this.cards = [];
          this.playerSize = 0;
          this.playerStatus = [];
          this.isRandom = this.getBool();
          this.chair = this.getByte();
          this.cardSize = this.getShort();
          for (var a = 0; a < this.cardSize; a++) {
            var b = this.getByte();
            this.cards.push(b);
          }
          this.playerSize = this.getShort();
          for (var a = 0; a < this.playerSize; a++) this.playerStatus.push(this.getByte());
        }
      }
      TienLenCmd.ReceivedFirstTurnDecision = ReceivedFirstTurnDecision;
      class ReceivedChatChong extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.winChair = 0;
          this.lostChair = 0;
          this.winMoney = 0;
          this.lostMoney = 0;
          this.winCurrentMoney = 0;
          this.lostCurrentMoney = 0;
          this.winChair = this.getByte();
          this.lostChair = this.getByte();
          this.winMoney = this.getLong();
          this.lostMoney = this.getLong();
          this.winCurrentMoney = this.getLong();
          this.lostCurrentMoney = this.getLong();
        }
      }
      TienLenCmd.ReceivedChatChong = ReceivedChatChong;
      class ReceivedPingPong2 extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.id = 0;
          this.id = this.getLong();
        }
      }
      TienLenCmd.ReceivedPingPong2 = ReceivedPingPong2;
      class UserLeaveRoom extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.chair = 0;
          this.nickName = "";
          this.chair = this.getByte();
          this.nickName = this.getString();
        }
      }
      TienLenCmd.UserLeaveRoom = UserLeaveRoom;
      class ReceiveUserJoinRoom extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.info = new TienLen_InGame_1.TienLenSlotInfo();
          this.uChair = 0;
          this.uStatus = 0;
          this.info.nickName = this.getString();
          this.info.avatar = this.getString();
          this.info.money = this.getLong();
          this.uChair = this.getByte();
          this.uStatus = this.getByte();
        }
      }
      TienLenCmd.ReceiveUserJoinRoom = ReceiveUserJoinRoom;
      class ReceivedUpdateMatch extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.myChair = 0;
          this.hasInfo = [];
          this.infos = [];
          this.myChair = this.getByte();
          var a = this.getShort();
          for (var b = 0; b < a; b++) this.hasInfo.push(this.getBool());
          for (b = 0; b < a; b++) {
            var c = {
              money: this.hasInfo[b] ? this.getLong() : null,
              status: this.hasInfo[b] ? this.getInt() : null
            };
            this.infos.push(c);
          }
        }
      }
      TienLenCmd.ReceivedUpdateMatch = ReceivedUpdateMatch;
      class ReceiveNotifyRegOutRoom extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.outChair = 0;
          this.isOutRoom = false;
          this.outChair = this.getByte();
          this.isOutRoom = this.getBool();
        }
      }
      TienLenCmd.ReceiveNotifyRegOutRoom = ReceiveNotifyRegOutRoom;
      class ReceivedKickOff extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.reason = 0;
          this.reason = this.getByte();
        }
      }
      TienLenCmd.ReceivedKickOff = ReceivedKickOff;
      class ReceivePingPong extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.test = 0;
          this.test = this.getLong();
        }
      }
      TienLenCmd.ReceivePingPong = ReceivePingPong;
      class ReceivedCardDefinations extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.strData = this.getString();
        }
      }
      TienLenCmd.ReceivedCardDefinations = ReceivedCardDefinations;
    })(TienLenCmd = exports.TienLenCmd || (exports.TienLenCmd = {}));
    exports.default = TienLenCmd;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/networks/Network.InPacket": void 0,
    "../../Main/Game/src/networks/Network.OutPacket": void 0,
    "./TienLen.CardGroup": "TienLen.CardGroup",
    "./TienLen.InGame": "TienLen.InGame"
  } ],
  "TienLen.Constant": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0f7d1OQxSZGDLP7T8ukp1Tu", "TienLen.Constant");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.TienLenConstant = void 0;
    var TienLenConstant;
    (function(TienLenConstant) {
      class GameState {}
      GameState.NONE = -1;
      GameState.AUTOSTART = 0;
      GameState.JOINROOM = 4;
      GameState.FIRSTTURN = 1;
      GameState.CHIABAI = 2;
      GameState.CHANGETURN = 3;
      GameState.USERJOIN = 5;
      GameState.DANHBAI = 6;
      GameState.BOLUOT = 7;
      GameState.QUIT = 8;
      GameState.USERLEAVE = 12;
      GameState.ENDGAME = 13;
      GameState.UPDATEMATH = 14;
      GameState.UPDATEOWNERROOM = 15;
      GameState.PLAYCONTINUE = 16;
      GameState.CHATCHONG = 17;
      GameState.JACKPOT = 18;
      GameState.REASONQUIT = 19;
      GameState.NOTIFYOUTROOM = 20;
      GameState.WAITBONDOITHONG = 21;
      TienLenConstant.GameState = GameState;
      class Config {}
      Config.MAX_PLAYER = 4;
      Config.MAX_CARDS = 13;
      TienLenConstant.Config = Config;
      class SortType {}
      SortType.kSortTangDan = 0;
      SortType.kSortGroup = 1;
      SortType.kSortUnkown = 2;
      TienLenConstant.SortType = SortType;
      class PlayerType {}
      PlayerType.MY = 0;
      PlayerType.ENEMY = 1;
      PlayerType.STATENONE = 0;
      PlayerType.STATEVIEWING = 1;
      PlayerType.STATEBAOSAM = 2;
      TienLenConstant.PlayerType = PlayerType;
      class PlayerStatus {}
      PlayerStatus.NO_LOGIN = 0;
      PlayerStatus.VIEW = 1;
      PlayerStatus.SIT = 2;
      PlayerStatus.PLAY = 3;
      TienLenConstant.PlayerStatus = PlayerStatus;
      class KickReasonCodes {}
      KickReasonCodes.ERROR_MONEY = 1;
      KickReasonCodes.ERROR_BAO_TRI = 2;
      TienLenConstant.KickReasonCodes = KickReasonCodes;
    })(TienLenConstant = exports.TienLenConstant || (exports.TienLenConstant = {}));
    exports.default = TienLenConstant;
    cc._RF.pop();
  }, {} ],
  "TienLen.InGame": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "342d3Cd3U9Nz7EQADJPgCr3", "TienLen.InGame");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var TienLenInGame_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.TienLenSlotInfo = exports.TienLenRoomInfoDTO = void 0;
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const TienLen_Player_1 = require("./TienLen.Player");
    const TienLen_Card_1 = require("./TienLen.Card");
    const TienLenNetworkClient_1 = require("../../Main/Game/src/networks/TienLenNetworkClient");
    const TienLen_Cmd_1 = require("./TienLen.Cmd");
    const TienLen_Constant_1 = require("./TienLen.Constant");
    const TienLen_CardGroup_1 = require("./TienLen.CardGroup");
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    const App_1 = require("../../Main/Game/src/common/App");
    const PopupCardDefinations_1 = require("../../Main/Game/src/games/cardgames/PopupCardDefinations");
    const TienLen_PopupMatchResult_1 = require("./TienLen.PopupMatchResult");
    const TienLen_ItemPlayerResult_1 = require("./TienLen.ItemPlayerResult");
    const CardGame_Cmd_1 = require("../../Main/Game/src/networks/CardGame.Cmd");
    const PopupChatInGame_1 = require("../../Main/Game/src/games/cardgames/PopupChatInGame");
    const PopupSettingInGame_1 = require("../../Main/Game/src/games/cardgames/PopupSettingInGame");
    const TienLen_PopupGuide_1 = require("./TienLen.PopupGuide");
    const Common_AudioManager_1 = require("../../Main/Game/src/common/Common.AudioManager");
    const BroadcastReceiver_1 = require("../../Main/Game/src/common/BroadcastReceiver");
    const TienLen_Listener_1 = require("./TienLen.Listener");
    const {ccclass: ccclass, property: property} = cc._decorator;
    class TienLenRoomInfoDTO {
      constructor() {
        this.roomId = 0;
        this.moneyBet = 0;
        this.matchId = 0;
        this.myChair = 0;
        this.slotInfos = [];
        this.recentCards = [];
        this.currentTurnChair = 0;
        this.currentTimeRemain = 0;
        this.newRound = false;
      }
      static fromReceivedJoinRoomSuccess(_receivedJoinRoomSuccess) {
        let roomInfoDTO = new TienLenRoomInfoDTO();
        roomInfoDTO.roomId = _receivedJoinRoomSuccess.roomId;
        roomInfoDTO.moneyBet = _receivedJoinRoomSuccess.moneyBet;
        roomInfoDTO.matchId = _receivedJoinRoomSuccess.matchId;
        roomInfoDTO.myChair = _receivedJoinRoomSuccess.myChair;
        roomInfoDTO.slotInfos = _receivedJoinRoomSuccess.playerInfos;
        roomInfoDTO.recentCards = [];
        roomInfoDTO.currentTurnChair = _receivedJoinRoomSuccess.currentChair;
        roomInfoDTO.currentTimeRemain = _receivedJoinRoomSuccess.countDownTime;
        roomInfoDTO.newRound = false;
        return roomInfoDTO;
      }
      static fromReceivedUpdateGameInfo(_receivedUpdateGameInfo) {
        let roomInfoDTO = new TienLenRoomInfoDTO();
        roomInfoDTO.roomId = _receivedUpdateGameInfo.roomId;
        roomInfoDTO.moneyBet = _receivedUpdateGameInfo.moneyBet;
        roomInfoDTO.matchId = _receivedUpdateGameInfo.matchId;
        roomInfoDTO.myChair = _receivedUpdateGameInfo.myChair;
        roomInfoDTO.slotInfos = _receivedUpdateGameInfo.playerInfos;
        roomInfoDTO.slotInfos[roomInfoDTO.myChair].cards = _receivedUpdateGameInfo.playerCards;
        roomInfoDTO.recentCards = _receivedUpdateGameInfo.recentCards;
        roomInfoDTO.currentTurnChair = _receivedUpdateGameInfo.currentChair;
        roomInfoDTO.currentTimeRemain = _receivedUpdateGameInfo.activeTimeRemain;
        roomInfoDTO.newRound = _receivedUpdateGameInfo.newRound;
        return roomInfoDTO;
      }
    }
    exports.TienLenRoomInfoDTO = TienLenRoomInfoDTO;
    class TienLenSlotInfo {
      constructor() {
        this.cards = [];
      }
    }
    exports.TienLenSlotInfo = TienLenSlotInfo;
    let TienLenInGame = TienLenInGame_1 = class TienLenInGame extends cc.Component {
      constructor() {
        super(...arguments);
        this.lbRoomId = null;
        this.lbRoomBet = null;
        this.lbMatchId = null;
        this.players = [];
        this.lbTimeCountDown = null;
        this.cardLine = null;
        this.board = null;
        this.btnsInGame = null;
        this.lblToast = null;
        this.fxMeWin = null;
        this.fxMeLose = null;
        this.fxWhoPlayFirst = null;
        this.btnShowCardDefinations = null;
        this.backgroundMusic = null;
        this.winSound = null;
        this.cardFrames = [];
        this.cardBackFrame = null;
        this.cardItem = null;
        this.cardsOnHand = new Map();
        this.buttons = {};
        this.myChair = 0;
        this.sortBySuit = true;
        this.currTurnCards = [];
        this.isMyTurn = false;
        this.changeTurnChair = null;
        this.countDown = null;
        this.playerUsernameByServerChair = [];
        this.cardDefinations = [];
      }
      static getInstance() {
        return this.instance;
      }
      static destroyInstance() {
        this.instance = null;
      }
      onLoad() {
        TienLenInGame_1.instance = this;
      }
      start() {
        var _a;
        null === (_a = TienLen_Listener_1.default.getInstance()) || void 0 === _a ? void 0 : _a.releasePendingCommands();
        BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.SET_SOUND, cc.find("Canvas"));
        true;
        this.getCardDefinations();
        this.btnsInGame.children.forEach(btn => {
          this.buttons[btn.name] = btn;
        });
        Common_AudioManager_1.default.getInstance().playBackgroundMusicByGame(Configs_1.default.App.BUNDLE_NAME.TIENLEN, this.backgroundMusic);
        this.enableCardTouch();
      }
      onDestroy() {
        clearInterval(this.countDown);
        TienLen_PopupMatchResult_1.default.instance = null;
        TienLenInGame_1.instance = null;
      }
      updateRoomInfo(roomInfoDTO = null) {
        this.lbTimeCountDown.node.parent.active = false;
        this.cleanCardLine();
        this.cleanCardsOnBoard();
        this.cleanCardsOnHand();
        this.players.forEach(player => player.resetPlayer());
        this.lbRoomId.string = roomInfoDTO.roomId + "";
        this.lbRoomBet.string = Utils_1.default.formatNumber(roomInfoDTO.moneyBet);
        this.lbMatchId.string = roomInfoDTO.matchId + "";
        this.myChair = roomInfoDTO.myChair;
        this.setPlayersInfo(roomInfoDTO);
      }
      setPlayersInfo(roomInfoDTO) {
        this.playerUsernameByServerChair = [];
        for (let i = 0; i < roomInfoDTO.slotInfos.length; i++) {
          let plInfo = roomInfoDTO.slotInfos[i];
          let localChair = this.convertChair(i);
          let pl = this.players[localChair];
          pl.status = plInfo.playerStatus;
          if (!pl.status || pl.status === TienLen_Constant_1.default.PlayerStatus.NO_LOGIN) continue;
          this.playerUsernameByServerChair[i] = plInfo.nickName;
          pl.setPlayerInfo(plInfo);
          pl.status == TienLen_Constant_1.default.PlayerStatus.PLAY && 0 != localChair && pl.setCardRemain(plInfo.cardSize);
        }
        if (roomInfoDTO.recentCards && roomInfoDTO.recentCards.length > 0) {
          let cardHalf = (roomInfoDTO.recentCards.length - 1) / 2;
          let ranX = Math.floor(100 * Math.random()) - 50;
          let ranY = Math.floor(100 * Math.random()) - 50;
          for (let i = 0; i < roomInfoDTO.recentCards.length; i++) {
            let cardItem = cc.instantiate(this.cardItem);
            cardItem.parent = this.board;
            cardItem.setScale(.6, .6);
            const cardComponent = cardItem.getComponent(TienLen_Card_1.default);
            cardComponent.setCardData(roomInfoDTO.recentCards[i]);
            cardItem.setPosition(30 * (i - cardHalf) + ranX, ranY);
          }
        }
        let mySlotInfo = roomInfoDTO.slotInfos[roomInfoDTO.myChair];
        if (mySlotInfo.cards && mySlotInfo.cards.length > 0) {
          this.changeTurnChair = roomInfoDTO.currentTurnChair;
          this.players.forEach(player => player.setTimeRemain(0));
          this.players[this.changeTurnChair].setTimeRemain(roomInfoDTO.currentTimeRemain);
          if (0 == this.changeTurnChair) {
            this.setActiveButtons([ "bt_submit_turn", "bt_pass_turn" ], [ true, true ]);
            this.isMyTurn = true;
          }
          if (roomInfoDTO.newRound) {
            this.cleanCardsOnBoard();
            this.currTurnCards = [];
            this.isMyTurn = false;
            for (let i = 0; i < this.players.length; i++) this.players[i].active && this.players[i].setAction();
          }
          this.cardLine.active = true;
          this.setCardsOnHand(this.sortCards(mySlotInfo.cards));
          this.setActiveButtons([ "bt_sort" ], [ true ]);
        }
      }
      receivedChatRoom(chatRoomData) {
        const localChair = this.convertChair(chatRoomData.chair);
        let isIcon = chatRoomData.isIcon;
        let content = chatRoomData.content;
        isIcon ? this.players[localChair].showChatEmotion(content) : this.players[localChair].showChatMsg(content);
      }
      receivedUserJoinRoom(userJoinRoomData) {
        if (userJoinRoomData.uStatus === TienLen_Constant_1.default.PlayerStatus.NO_LOGIN) return;
        this.playerUsernameByServerChair[userJoinRoomData.uChair] = userJoinRoomData.info.nickName;
        this.players[this.convertChair(userJoinRoomData.uChair)].setPlayerInfo(userJoinRoomData.info);
        this.players[this.convertChair(userJoinRoomData.uChair)].status = userJoinRoomData.uStatus;
      }
      receivedAutoStart(autoStartData) {
        this.lbMatchId.string = autoStartData.matchId + "";
        this.btnsInGame.children.forEach(btn => btn.active = false);
        this.setTimeCountDown("V\xe1n \u0111\u1ea5u b\u1eaft \u0111\u1ea7u sau: ", autoStartData.autoStartTime);
        TienLen_PopupMatchResult_1.default.instance && TienLen_PopupMatchResult_1.default.instance.node.active && TienLen_PopupMatchResult_1.default.instance.dismiss();
      }
      setTimeCountDown(msg, t) {
        this.lbTimeCountDown.string = msg + "" + t + "s";
        this.lbTimeCountDown.node.parent.active = true;
        clearInterval(this.countDown);
        this.countDown = setInterval(() => {
          t--;
          if (t < 0) {
            clearInterval(this.countDown);
            this.lbTimeCountDown.node.parent.active = false;
          } else this.lbTimeCountDown.string = msg + "" + t + "s";
        }, 1e3);
      }
      receivedFirstTurnDecision(firstTurnDecisionData) {
        this.cleanCardLine();
        firstTurnDecisionData.cards.forEach((card, i) => {
          var pl = this.players[this.convertChair(i)];
          pl.status = firstTurnDecisionData.playerStatus[i];
          pl.isPlaying() && pl.setFirstCard(card);
        });
        this.players.filter(player => player.isPlaying()).forEach((player, i) => {
          const playerPosition = 0 === i ? this.board.convertToNodeSpaceAR(player.node.parent.convertToWorldSpaceAR(player.node.getPosition())) : player.node.getPosition();
          const cardItem = cc.instantiate(this.cardItem);
          cardItem.parent = this.node;
          cardItem.getComponent(TienLen_Card_1.default).spr.spriteFrame = this.cardBackFrame;
          cardItem.runAction(cc.sequence(cc.delayTime(.5 + .05 * i), cc.spawn(cc.moveTo(.2, playerPosition), cc.scaleTo(.2, .76)), cc.delayTime(1), cc.callFunc(() => {
            cardItem.destroy();
          })));
        });
      }
      receivedDealCard(dealCardData) {
        this.lbMatchId.string = dealCardData.matchId + "";
        this.setCardsOnHand(this.sortCards(dealCardData.cards));
        dealCardData.toiTrang > 0;
        this.players.filter(player => player.isPlaying()).forEach(player => player.offFirstCard());
        this.players.filter(player => player.isPlaying()).filter(player => !player.isMe()).forEach(player => player.setCardRemain(dealCardData.cardSize));
        this.setActiveButtons([ "bt_sort" ], [ true ]);
        this.disableCardTouch();
        this.enableCardTouch();
      }
      receivedChangeTurn(turnData) {
        const localChair = this.convertChair(turnData.chair);
        this.changeTurnChair = localChair;
        this.players.forEach(player => player.setTimeRemain(0));
        this.players[localChair].setTimeRemain(turnData.time);
        if (0 == localChair) {
          this.setActiveButtons([ "bt_submit_turn", "bt_pass_turn" ], [ true, true ]);
          this.isMyTurn = true;
        }
        if (turnData.newRound) {
          this.cleanCardsOnBoard();
          this.currTurnCards = [];
          this.isMyTurn = false;
          this.scheduleOnce(() => {
            this.players.filter(player => player.active).forEach(player => player.setAction());
          }, 1);
        }
      }
      receivedSubmitTurn(submitTurnData) {
        this.setActiveButtons([ "bt_submit_turn", "bt_pass_turn" ], [ false, false ]);
        let cards = this.sortCards(TienLen_CardGroup_1.TienLenCardGroup.indexsToCards(submitTurnData.cards));
        let cardsType = new TienLen_CardGroup_1.TienLenCardGroup(cards).getCardGroupType();
        let notifyCards = "";
        switch (cardsType) {
         case TienLen_CardGroup_1.CardGroupType.MOT_LA:
          cards[0].isHeo && (notifyCards = "Heo!");
          break;

         case TienLen_CardGroup_1.CardGroupType.MOT_DOI:
          cards[0].isHeo && (notifyCards = "\u0110\xf4i Heo!");
          break;

         case TienLen_CardGroup_1.CardGroupType.SAM_CO:
          cards[0].isHeo && (notifyCards = "Ba con Heo!");
          break;

         case TienLen_CardGroup_1.CardGroupType.TU_QUY:
          notifyCards = "T\u1ee9 qu\xfd" + (cards[0].isHeo ? "Heo!" : "!");
          break;

         case TienLen_CardGroup_1.CardGroupType.HAI_TU_QUY:
          notifyCards = "Hai t\u1ee9 qu\xfd!";
          break;

         case TienLen_CardGroup_1.CardGroupType.BA_DOI_THONG:
          notifyCards = "Ba \u0111\xf4i th\xf4ng!";
          break;

         case TienLen_CardGroup_1.CardGroupType.BON_DOI_THONG:
          notifyCards = "B\u1ed1n \u0111\xf4i th\xf4ng!";
        }
        notifyCards && this.showNotification(notifyCards);
        let cardHalf = (cards.length - 1) / 2;
        let ranX = Math.floor(100 * Math.random()) - 50;
        let ranY = Math.floor(100 * Math.random()) - 50;
        let localChair = this.convertChair(submitTurnData.chair);
        let pl = this.players[localChair];
        if (pl.isMe()) {
          cards.forEach((card, i) => {
            let cardItem = this.cardsOnHand.get(card.id);
            let cardPosition = cardItem.parent.convertToWorldSpaceAR(cardItem.position);
            cardPosition = this.board.convertToNodeSpaceAR(cardPosition);
            cardItem.parent = this.board;
            cardItem.setPosition(cardPosition);
            cardItem.runAction(cc.moveTo(.2, cc.v2(30 * (i - cardHalf) + ranX, ranY)));
            cardItem.runAction(cc.scaleTo(.2, .6, .6));
            this.cardsOnHand.delete(card.id);
          });
          this.moveAllCardOnHand();
        } else {
          let playerPosition = pl.node.parent.convertToWorldSpaceAR(pl.node.position);
          playerPosition = this.board.convertToNodeSpaceAR(playerPosition);
          cards.forEach((card, i) => {
            let cardItem = cc.instantiate(this.cardItem);
            cardItem.parent = this.board;
            cardItem.setScale(.6, .6);
            cardItem.setPosition(playerPosition);
            cardItem.runAction(cc.moveTo(.2, cc.v2(30 * (i - cardHalf) + ranX, ranY)));
            const cardComponent = cardItem.getComponent(TienLen_Card_1.default);
            cardComponent.setCardData(card);
          });
          pl.setCardRemain(submitTurnData.remainCardSize);
          this.currTurnCards = cards;
        }
        this.board.children.forEach((card, i) => {
          card.zIndex = this.board.zIndex + i;
        });
        1 === submitTurnData.cards.length && 0 === submitTurnData.cards[0] && 0 === submitTurnData.remainCardSize && pl.showEffectKet3Bich();
      }
      receivedPassTurn(passTurnData) {
        this.players[this.convertChair(passTurnData.chair)].setAction("B\u1ecf l\u01b0\u1ee3t");
        this.setActiveButtons([ "bt_submit_turn", "bt_pass_turn" ], [ false, false ]);
      }
      actSubmitTurn() {
        var cardsSelected = [];
        this.cardLine.children.forEach(card => {
          var _card = card.getComponent(TienLen_Card_1.default);
          _card.isSelected && cardsSelected.push(_card.getCardDTO());
        });
        if (0 === cardsSelected.length) {
          this.showToast("Vui l\xf2ng ch\u1ecdn l\xe1 b\xe0i");
          return;
        }
        this.sendSubmitTurn(cardsSelected);
        this.isMyTurn = false;
      }
      sendSubmitTurn(cardsSelected) {
        TienLenNetworkClient_1.default.getInstance().send(new TienLen_Cmd_1.default.SendDanhBai(false, TienLen_CardGroup_1.TienLenCardGroup.cardsToIndexs(cardsSelected)));
      }
      actPassTurn() {
        this.sendPassTurn();
        this.isMyTurn = false;
      }
      sendPassTurn() {
        TienLenNetworkClient_1.default.getInstance().send(new TienLen_Cmd_1.default.SendBoLuot(!0));
      }
      sortCards(cards) {
        return this.sortBySuit ? new TienLen_CardGroup_1.TienLenCardGroup(cards).getOrderedBySuit() : TienLen_CardGroup_1.TienLenCardGroup.sortCards(cards);
      }
      actSort() {
        this.cardLine.children.forEach(card => card.stopAllActions());
        this.sortBySuit = !this.sortBySuit;
        let cards = this.getCardDTOsOnHand();
        cards = this.sortCards(cards);
        this.setToggleCardsOnHand();
        this.sortCardsOnHand(cards);
      }
      setCardsOnHand(cards) {
        cards.forEach(card => {
          let cardItem = cc.instantiate(this.cardItem);
          cardItem.parent = this.cardLine;
          const cardComponent = cardItem.getComponent(TienLen_Card_1.default);
          cardComponent.setCardData(card, this.onCardSelectCallback.bind(this));
          this.cardsOnHand.set(card.id, cardItem);
        });
        this.sortCardsOnHand(cards);
      }
      onCardSelectCallback(selectedCard) {
        const suggestionCards = this.detectSuggestionCards(selectedCard);
        for (let i = 0; i < suggestionCards.length; i++) for (let j = 0; j < suggestionCards[i].length; j++) TienLen_CardGroup_1.TienLenCardGroup.cardToIndex(selectedCard) == TienLen_CardGroup_1.TienLenCardGroup.cardToIndex(suggestionCards[i][j]) && this.setToggleCardsOnHand(suggestionCards[i]);
      }
      detectSuggestionCards(selectedCard) {
        const cardsOnHand = this.getCardDTOsOnHand();
        if (this.isMyTurn) {
          if (1 === this.currTurnCards.length && this.currTurnCards[0].isHeo) {
            const selectedCards = [ ...this.cardsOnHand.values() ].map(cardItem => cardItem.getComponent(TienLen_Card_1.default)).filter(cardComponent => cardComponent.isSelected).map(cardComponent => cardComponent.getCardDTO());
            return new TienLen_CardGroup_1.TienLenCardGroup(cardsOnHand).detectSuggestionBySelectedCards(selectedCards, selectedCard, true);
          }
          return new TienLen_CardGroup_1.TienLenCardGroup(cardsOnHand).detectSuggestionByCurrentTurnCards(this.currTurnCards, selectedCard);
        }
        const selectedCards = [ ...this.cardsOnHand.values() ].map(cardItem => cardItem.getComponent(TienLen_Card_1.default)).filter(cardComponent => cardComponent.isSelected).map(cardComponent => cardComponent.getCardDTO());
        return new TienLen_CardGroup_1.TienLenCardGroup(cardsOnHand).detectSuggestionBySelectedCards(selectedCards, selectedCard);
      }
      getCardDTOsOnHand() {
        var cards = [];
        this.cardsOnHand.forEach(value => {
          const cardComponent = value.getComponent(TienLen_Card_1.default);
          cards.push(cardComponent.getCardDTO());
        });
        return cards;
      }
      cleanCardsOnHand() {
        this.cardsOnHand.clear();
      }
      cleanCardsOnBoard() {
        this.board.removeAllChildren();
      }
      setToggleCardsOnHand(cards = null) {
        this.cardsOnHand.forEach(value => {
          value.getComponent(TienLen_Card_1.default).deSelect();
        });
        cards && cards.forEach(card => {
          this.cardsOnHand.get(card.id).getComponent(TienLen_Card_1.default).select();
        });
      }
      sortCardsOnHand(cards) {
        cards.forEach((card, i) => {
          const cardItem = this.cardsOnHand.get(card.id);
          cardItem.zIndex = this.cardLine.zIndex + i;
          cardItem.setSiblingIndex(i);
        });
        this.moveAllCardOnHand();
      }
      effectClean(cards) {
        for (let i = cards.length - 1; i >= 0; i--) {
          var _card = cards[i];
          var pos = _card.parent.convertToWorldSpaceAR(_card.position);
          pos = this.board.convertToNodeSpaceAR(pos);
          _card.parent = this.board;
          _card.setPosition(pos);
          var ranX = Math.floor(100 * Math.random()) - 50;
          var ranY = Math.floor(100 * Math.random()) - 50;
          _card.runAction(cc.sequence(cc.delayTime(.1 * i), cc.spawn(cc.moveTo(.2, cc.v2(ranX, ranY)), cc.scaleTo(.2, .6, .6))));
        }
      }
      cleanAllCard() {
        for (let i = 1; i < this.players.length; i++) {
          if (!this.players[i].active) continue;
          this.effectClean(this.players[i].cardLine.children);
        }
        this.effectClean(this.cardLine.children);
        this.scheduleOnce(() => {
          this.cleanCardsOnHand();
          this.cleanCardLine();
          this.cleanCardsOnBoard();
        }, 2);
      }
      cleanCardLine() {
        this.cardLine.removeAllChildren();
        this.players.forEach(player => player.clearCardLine());
      }
      setActiveButtons(btnNames, actives) {
        for (let i = 0; i < btnNames.length; i++) this.buttons[btnNames[i]] && (this.buttons[btnNames[i]].active = actives[i]);
      }
      receivedEndGame(endGameData) {
        this.disableCardTouch();
        this.players.forEach(player => player.setTimeRemain(0));
        const coinChanges = endGameData.ketQuaTinhTienList;
        this.scheduleOnce(() => {
          for (let i = 0; i < TienLen_Constant_1.default.Config.MAX_PLAYER; i++) {
            const localChair = this.convertChair(i);
            this.players[localChair].setCoinChange(coinChanges[i]);
            this.players[localChair].setCoin(endGameData.currentMoney[i]);
            if (0 !== localChair) continue;
            Configs_1.default.Login.Coin = endGameData.currentMoney[i];
            this.fxMeWin.active = coinChanges[i] > 0;
            this.fxMeLose.active = coinChanges[i] < 0;
            coinChanges[i] > 0 && Common_AudioManager_1.default.getInstance().playEffectByGame(Configs_1.default.App.BUNDLE_NAME.TIENLEN, this.winSound);
          }
        }, 2);
        endGameData.cards.forEach((card, i) => {
          const localChair = this.convertChair(i);
          if (0 != localChair && this.players[localChair].status == TienLen_Constant_1.default.PlayerStatus.PLAY) {
            this.players[localChair].setCardLine(card);
            this.players[localChair].setCardRemain(0);
          }
          1 === card.length && 0 === card[0].id && this.players[localChair].showEffectThoi3Bich();
        });
        this.setActiveButtons([ "bt_sort" ], [ false ]);
        this.scheduleOnce(() => {
          this.setTimeCountDown("V\xe1n \u0111\u1ea5u k\u1ebft th\xfac sau: ", 0 == endGameData.countDown ? 10 : endGameData.countDown - 6);
        }, 0 == endGameData.countDown ? 0 : 4);
        this.scheduleOnce(() => {
          this.cleanAllCard();
          this.players.forEach(player => player.setAction());
        }, 0 == endGameData.countDown ? 5 : 9);
        TienLenNetworkClient_1.default.getInstance().send(new TienLen_Cmd_1.default.SendReadyAutoStart());
        this.scheduleOnce(() => {
          this.fxMeWin.active = false;
          this.fxMeLose.active = false;
          let matchResult = [];
          coinChanges.forEach((coinChange, i) => {
            if (0 !== coinChange) {
              let playerResult = new TienLen_ItemPlayerResult_1.TienLenResult();
              playerResult.userName = this.playerUsernameByServerChair[i];
              playerResult.goldChange = coinChange;
              playerResult.cards = endGameData.cards[i];
              playerResult.winTypes = endGameData.winTypes[i];
              matchResult.push(playerResult);
            }
          });
          matchResult.sort((a, b) => a.cards.length - b.cards.length).forEach((result, i) => result.rank = i);
          TienLen_PopupMatchResult_1.default.createAndShow(this.node, matchResult);
        }, 4);
      }
      receivedUpdateMatch(updateMatchData) {
        this.myChair = updateMatchData.myChair;
        for (let i = 0; i < updateMatchData.hasInfo.length; i++) {
          var localChair = this.convertChair(i);
          if (updateMatchData.hasInfo[i]) {
            this.players[localChair].status = updateMatchData.infos[i].status;
            this.players[localChair].setCoin(updateMatchData.infos[i].money);
          }
        }
      }
      receivedUserLeaveRoom(userLeaveRoomData) {
        const localChair = this.convertChair(userLeaveRoomData.chair);
        this.players[localChair].resetPlayer();
        if (0 == localChair) {
          clearInterval(this.countDown);
          cc.director.loadScene("TienLen");
        }
      }
      receivedNotifyUserRegOutRoom(res) {
        let outChair = res.outChair;
        let isOutRoom = res.isOutRoom;
        let localChair = this.convertChair(outChair);
        if (-1 !== localChair) {
          let pl = this.players[localChair];
          pl.setNotify(isOutRoom ? "S\u1eafp r\u1eddi b\xe0n !" : "Kh\xf4 M\xe1u !");
        }
      }
      receivedChatChong(chatChongData) {
        let winChair = chatChongData.winChair;
        let lostChair = chatChongData.lostChair;
        let winMoney = chatChongData.winMoney;
        let lostMoney = chatChongData.lostMoney;
        let winCurrentMoney = chatChongData.winCurrentMoney;
        let lostCurrentMoney = chatChongData.lostCurrentMoney;
        let seatIdWin = this.convertChair(winChair);
        let seatIdLost = this.convertChair(lostChair);
        this.players[seatIdWin].setCoinChange(winMoney);
        this.players[seatIdLost].setCoinChange(lostMoney);
        this.players[seatIdWin].setCoin(winCurrentMoney);
        this.players[seatIdLost].setCoin(lostCurrentMoney);
        0 === seatIdWin && (Configs_1.default.Login.Coin = winCurrentMoney);
        0 === seatIdLost && (Configs_1.default.Login.Coin = lostCurrentMoney);
      }
      receivedWait4doithong(wait4doithongData) {
        this.showNotification("\u0110\u1ee3i B\u1ed1n \u0110\xf4i Th\xf4ng !");
      }
      showNotification(msg) {
        this.fxWhoPlayFirst.active = true;
        this.fxWhoPlayFirst.scale = 0;
        this.fxWhoPlayFirst.opacity = 0;
        this.fxWhoPlayFirst.stopAllActions();
        this.fxWhoPlayFirst.runAction(cc.sequence(cc.spawn(cc.scaleTo(.2, 1).easing(cc.easeBackOut()), cc.fadeIn(.2)), cc.delayTime(1.5), cc.callFunc(() => {
          this.fxWhoPlayFirst.active = false;
        })));
        this.fxWhoPlayFirst.children[0].getComponent(cc.Label).string = msg;
      }
      convertChair(serverChair) {
        return (serverChair - this.myChair + TienLen_Constant_1.default.Config.MAX_PLAYER) % TienLen_Constant_1.default.Config.MAX_PLAYER;
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
      receivedKickFromRoom(reason) {
        cc.director.loadScene("TienLen", () => {
          switch (reason) {
           case TienLen_Constant_1.default.KickReasonCodes.ERROR_MONEY:
            App_1.default.instance.actiontDialog.showMsgWithAction("S\u1ed1 d\u01b0 kh\xf4ng \u0111\u1ee7.", "N\u1ea0P NGAY", () => {
              App_1.default.instance.openShop(0);
            });
            break;

           case TienLen_Constant_1.default.KickReasonCodes.ERROR_BAO_TRI:
            App_1.default.instance.alertDialog.showMsg("H\u1ec7 th\u1ed1ng b\u1ea3o tr\xec!");
            break;

           default:
            App_1.default.instance.alertDialog.showMsg("B\u1ea1n b\u1ecb kick kh\u1ecfi b\xe0n ch\u01a1i!");
          }
        });
      }
      findTouchedCard(touchBegin) {
        for (let i = this.cardLine.children.length - 1; i >= 0; i--) {
          let card = this.cardLine.children[i];
          if (card.getBoundingBoxToWorld().contains(touchBegin)) return i;
        }
      }
      moveAllCardOnHand(cardMoving = null) {
        for (let i = 0; i < this.cardLine.children.length; i++) {
          let card = this.cardLine.children[i];
          card != cardMoving && card.runAction(cc.moveTo(.2, this.getCardPosition(this.cardLine.children.length, i)));
        }
      }
      getCardPosition(numbOfCard, cardIndex) {
        let hand = this.cardLine.position.x - 45 * (numbOfCard - 1) / 2;
        let posx = hand + 45 * cardIndex;
        let result = cc.v2(posx, 0);
        return result;
      }
      swapCard(card, cardSwap) {
        this.node.runAction(cc.spawn(cc.callFunc(() => {
          let key = this.cardLine.children[cardSwap].getComponent(TienLen_Card_1.default).getCardDTO().id;
          this.cardsOnHand.get(key).setSiblingIndex(card);
        }), cc.callFunc(() => {
          let key = this.cardLine.children[card].getComponent(TienLen_Card_1.default).getCardDTO().id;
          this.cardsOnHand.get(key).setSiblingIndex(cardSwap);
        })));
      }
      enableCardTouch() {
        let selectedCard = null;
        let touchId = null;
        let distance = null;
        let isMove = false;
        let onBeginDrag = event => {
          let touchBegin = cc.v2(event.touch.getLocation());
          touchId = this.findTouchedCard(touchBegin);
          let card = this.cardLine.children[touchId];
          selectedCard = card;
        };
        let onDrag = event => {
          let delta = event.touch.getDelta();
          distance += Math.sqrt(Math.pow(delta.x, 2));
          if (null != selectedCard) {
            isMove = false;
            selectedCard.x += delta.x;
            if (delta.x < 0 && null != this.cardLine.children[touchId - 1] && selectedCard.x <= this.cardLine.children[touchId - 1].x + 20) {
              let moveCard = this.cardLine.children[touchId - 1];
              let orgPos = this.getCardPosition(this.cardLine.children.length, touchId - 1);
              moveCard.getComponent(TienLen_Card_1.default).moveCard(.2, cc.v2(orgPos.x + 45, 0));
              moveCard.zIndex++;
              selectedCard.zIndex--;
              this.swapCard(touchId, touchId - 1);
              touchId--;
            }
            if (delta.x > 0 && null != this.cardLine.children[touchId + 1] && selectedCard.x >= this.cardLine.children[touchId + 1].x - 20) {
              let moveCard = this.cardLine.children[touchId + 1];
              let orgPos = this.getCardPosition(this.cardLine.children.length, touchId + 1);
              moveCard.getComponent(TienLen_Card_1.default).moveCard(.2, cc.v2(orgPos.x - 45, 0));
              moveCard.zIndex--;
              selectedCard.zIndex++;
              this.swapCard(touchId, touchId + 1);
              touchId++;
            }
          }
          distance > 30 && (isMove = true);
        };
        let onEndDrag = event => {
          distance = 0;
          if (null != selectedCard) {
            let pos = this.getCardPosition(this.cardLine.children.length, touchId);
            selectedCard.getComponent(TienLen_Card_1.default).moveCard(.2, pos);
            isMove || selectedCard.getComponent(TienLen_Card_1.default).onSelect();
            isMove = false;
          }
          selectedCard = null;
        };
        let onCancelDrag = event => {
          distance = 0;
          if (null != selectedCard) {
            let pos = this.getCardPosition(this.cardLine.children.length, touchId);
            selectedCard.getComponent(TienLen_Card_1.default).moveCard(.2, pos);
            !isMove;
            isMove = false;
            this.moveAllCardOnHand();
          }
          selectedCard = null;
        };
        this.node.on(cc.Node.EventType.TOUCH_START, onBeginDrag, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, onDrag, this);
        this.node.on(cc.Node.EventType.TOUCH_END, onEndDrag, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, onCancelDrag, this);
      }
      disableCardTouch() {
        this.node.off(cc.Node.EventType.TOUCH_START);
        this.node.off(cc.Node.EventType.TOUCH_MOVE);
        this.node.off(cc.Node.EventType.TOUCH_END);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL);
      }
      getCardDefinations() {
        TienLenNetworkClient_1.default.getInstance().send(new TienLen_Cmd_1.default.SendCardDefinations());
      }
      receivedCardDefinations(cardsDefineData) {
        const cardObjects = JSON.parse(cardsDefineData.strData).object || [];
        cardObjects.forEach(cardObject => this.cardDefinations.push(new CardGame_Cmd_1.default.CardDefination(cardObject)));
        this.btnShowCardDefinations.node.active = (true, this.cardDefinations.length > 0);
      }
      actShowCardDefinations() {
        PopupCardDefinations_1.default.createAndShow(this.node, this.cardDefinations, this.cardFrames);
      }
      actShowChat() {
        PopupChatInGame_1.default.createAndShow(this.node, this.cardDefinations, (chatType, content) => {
          TienLenNetworkClient_1.default.getInstance().send(new TienLen_Cmd_1.default.SendChatRoom(chatType, content));
        }, (cheatType, cardCheatIds) => {
          TienLenNetworkClient_1.default.getInstance().send(new TienLen_Cmd_1.default.SendCheatCards(cheatType, cardCheatIds));
        });
      }
      actSetting() {
        PopupSettingInGame_1.default.createAndShow(this.node, Configs_1.default.App.BUNDLE_NAME.TIENLEN, () => {
          TienLen_PopupGuide_1.default.createAndShow(this.node);
        }, () => {
          TienLenNetworkClient_1.default.getInstance().send(new TienLen_Cmd_1.default.SendRequestLeaveGame());
        });
      }
      isMePlaying() {
        return this.players[0].isPlaying();
      }
      getCardFrame(index) {
        const txtIndex = (index < 10 ? "0" : "") + index;
        const cardFrame = this.cardFrames.find(card => card.name == "labai_" + txtIndex);
        return cardFrame;
      }
      getCardBackFrame() {
        return this.cardBackFrame;
      }
      getCardItem() {
        return this.cardItem;
      }
    };
    TienLenInGame.instance = null;
    __decorate([ property(cc.Label) ], TienLenInGame.prototype, "lbRoomId", void 0);
    __decorate([ property(cc.Label) ], TienLenInGame.prototype, "lbRoomBet", void 0);
    __decorate([ property(cc.Label) ], TienLenInGame.prototype, "lbMatchId", void 0);
    __decorate([ property(TienLen_Player_1.default) ], TienLenInGame.prototype, "players", void 0);
    __decorate([ property(cc.Label) ], TienLenInGame.prototype, "lbTimeCountDown", void 0);
    __decorate([ property(cc.Node) ], TienLenInGame.prototype, "cardLine", void 0);
    __decorate([ property(cc.Node) ], TienLenInGame.prototype, "board", void 0);
    __decorate([ property(cc.Node) ], TienLenInGame.prototype, "btnsInGame", void 0);
    __decorate([ property(cc.Label) ], TienLenInGame.prototype, "lblToast", void 0);
    __decorate([ property(cc.Node) ], TienLenInGame.prototype, "fxMeWin", void 0);
    __decorate([ property(cc.Node) ], TienLenInGame.prototype, "fxMeLose", void 0);
    __decorate([ property(cc.Node) ], TienLenInGame.prototype, "fxWhoPlayFirst", void 0);
    __decorate([ property(cc.Button) ], TienLenInGame.prototype, "btnShowCardDefinations", void 0);
    __decorate([ property(cc.AudioClip) ], TienLenInGame.prototype, "backgroundMusic", void 0);
    __decorate([ property(cc.AudioClip) ], TienLenInGame.prototype, "winSound", void 0);
    __decorate([ property([ cc.SpriteFrame ]) ], TienLenInGame.prototype, "cardFrames", void 0);
    __decorate([ property(cc.SpriteFrame) ], TienLenInGame.prototype, "cardBackFrame", void 0);
    __decorate([ property(cc.Prefab) ], TienLenInGame.prototype, "cardItem", void 0);
    TienLenInGame = TienLenInGame_1 = __decorate([ ccclass ], TienLenInGame);
    exports.default = TienLenInGame;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/App": void 0,
    "../../Main/Game/src/common/BroadcastReceiver": void 0,
    "../../Main/Game/src/common/Common.AudioManager": void 0,
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/common/Utils": void 0,
    "../../Main/Game/src/games/cardgames/PopupCardDefinations": void 0,
    "../../Main/Game/src/games/cardgames/PopupChatInGame": void 0,
    "../../Main/Game/src/games/cardgames/PopupSettingInGame": void 0,
    "../../Main/Game/src/networks/CardGame.Cmd": void 0,
    "../../Main/Game/src/networks/TienLenNetworkClient": void 0,
    "./TienLen.Card": "TienLen.Card",
    "./TienLen.CardGroup": "TienLen.CardGroup",
    "./TienLen.Cmd": "TienLen.Cmd",
    "./TienLen.Constant": "TienLen.Constant",
    "./TienLen.ItemPlayerResult": "TienLen.ItemPlayerResult",
    "./TienLen.Listener": "TienLen.Listener",
    "./TienLen.Player": "TienLen.Player",
    "./TienLen.PopupGuide": "TienLen.PopupGuide",
    "./TienLen.PopupMatchResult": "TienLen.PopupMatchResult"
  } ],
  "TienLen.ItemPlayerResult": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "af49eQFqGVKnpFUqosHPApz", "TienLen.ItemPlayerResult");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.TienLenResult = void 0;
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const TienLen_InGame_1 = require("./TienLen.InGame");
    class TienLenResult {}
    exports.TienLenResult = TienLenResult;
    var WIN_TYPES;
    (function(WIN_TYPES) {
      WIN_TYPES[WIN_TYPES["KHONG_CHOI"] = 1] = "KHONG_CHOI";
      WIN_TYPES[WIN_TYPES["THANG_THONG_THUONG"] = 2] = "THANG_THONG_THUONG";
      WIN_TYPES[WIN_TYPES["THANG_BAT_TREO"] = 3] = "THANG_BAT_TREO";
      WIN_TYPES[WIN_TYPES["THANG_TRANG_SANH_RONG"] = 4] = "THANG_TRANG_SANH_RONG";
      WIN_TYPES[WIN_TYPES["THANG_TRANG_TU_HEO"] = 5] = "THANG_TRANG_TU_HEO";
      WIN_TYPES[WIN_TYPES["THANG_TRANG_NAM_DOI_THONG"] = 6] = "THANG_TRANG_NAM_DOI_THONG";
      WIN_TYPES[WIN_TYPES["THANG_TRANG_SAU_DOI"] = 7] = "THANG_TRANG_SAU_DOI";
      WIN_TYPES[WIN_TYPES["THANG_TRANG_DONG_MAU_13"] = 8] = "THANG_TRANG_DONG_MAU_13";
      WIN_TYPES[WIN_TYPES["THANG_TRANG_DONG_MAU_12"] = 9] = "THANG_TRANG_DONG_MAU_12";
      WIN_TYPES[WIN_TYPES["KET_QUA_HOA"] = 10] = "KET_QUA_HOA";
      WIN_TYPES[WIN_TYPES["THUA_THONG_THUONG"] = 11] = "THUA_THONG_THUONG";
      WIN_TYPES[WIN_TYPES["THUA_TREO"] = 12] = "THUA_TREO";
      WIN_TYPES[WIN_TYPES["THUA_TOI_TRANG"] = 13] = "THUA_TOI_TRANG";
      WIN_TYPES[WIN_TYPES["THANG_DUT_BA_BICH"] = 20] = "THANG_DUT_BA_BICH";
      WIN_TYPES[WIN_TYPES["THUA_DUT_BA_BICH"] = 30] = "THUA_DUT_BA_BICH";
      WIN_TYPES[WIN_TYPES["THUA_THOI_BA_BICH"] = 31] = "THUA_THOI_BA_BICH";
    })(WIN_TYPES || (WIN_TYPES = {}));
    const {ccclass: ccclass, property: property} = cc._decorator;
    let TienLenItemPlayerResult = class TienLenItemPlayerResult extends cc.Component {
      constructor() {
        super(...arguments);
        this.spRank = null;
        this.lbRank = null;
        this.labelUserName = null;
        this.labelMoneyChange = null;
        this.listCards = null;
        this.resultWin = null;
        this.resultLose = null;
        this.fxResult = null;
        this.matSprite = [];
        this.labelFx = null;
        this.prefabCard = null;
        this.rankFrames = [];
      }
      initItem(playerResult) {
        if (playerResult.rank < this.rankFrames.length) {
          this.spRank.node.active = true;
          this.spRank.spriteFrame = this.rankFrames[playerResult.rank];
        } else {
          this.spRank.node.active = false;
          this.lbRank.string = (playerResult.rank + 1).toString();
        }
        this.labelUserName.string = playerResult.userName;
        this.labelMoneyChange.string = playerResult.goldChange > 0 ? "+" + Utils_1.default.formatNumber(playerResult.goldChange) : Utils_1.default.formatNumber(playerResult.goldChange);
        if (playerResult.cards) for (let index = 0; index < playerResult.cards.length; index++) {
          let item = cc.instantiate(this.prefabCard);
          item.getComponent(cc.Sprite).spriteFrame = TienLen_InGame_1.default.getInstance().getCardFrame(playerResult.cards[index].id);
          this.listCards.addChild(item);
        }
        switch (playerResult.winTypes) {
         case WIN_TYPES.KHONG_CHOI:
          break;

         case WIN_TYPES.THANG_THONG_THUONG:
          this.resultLose.active = false;
          this.fxResult.active = false;
          break;

         case WIN_TYPES.THANG_BAT_TREO:
          this.resultLose.active = false;
          this.fxResult.active = true;
          this.fxResult.getComponent(cc.Sprite).setMaterial(0, this.matSprite[0]);
          this.labelFx.node.color = cc.Color.RED;
          this.labelFx.string = "Th\u1eafng B\u1eaft Treo";
          break;

         case WIN_TYPES.THANG_TRANG_SANH_RONG:
          this.resultLose.active = false;
          this.fxResult.active = true;
          this.fxResult.getComponent(cc.Sprite).setMaterial(0, this.matSprite[0]);
          this.labelFx.node.color = cc.Color.RED;
          this.labelFx.string = "Th\u1eafng Tr\u1eafng S\u1ea3nh R\u1ed3ng";
          break;

         case WIN_TYPES.THANG_TRANG_TU_HEO:
          this.resultLose.active = false;
          this.fxResult.active = true;
          this.fxResult.getComponent(cc.Sprite).setMaterial(0, this.matSprite[0]);
          this.labelFx.node.color = cc.Color.RED;
          this.labelFx.string = "Th\u1eafng Tr\u1eafng T\u1ee9 Heo";
          break;

         case WIN_TYPES.THANG_TRANG_NAM_DOI_THONG:
          this.resultLose.active = false;
          this.fxResult.active = true;
          this.fxResult.getComponent(cc.Sprite).setMaterial(0, this.matSprite[0]);
          this.labelFx.node.color = cc.Color.RED;
          this.labelFx.string = "Th\u1eafng Tr\u1eafng 5 \u0110\xf4i Th\xf4ng";
          break;

         case WIN_TYPES.THANG_TRANG_SAU_DOI:
          this.resultLose.active = false;
          this.fxResult.active = true;
          this.fxResult.getComponent(cc.Sprite).setMaterial(0, this.matSprite[0]);
          this.labelFx.node.color = cc.Color.RED;
          this.labelFx.string = "Th\u1eafng Tr\u1eafng 6 \u0110\xf4i";
          break;

         case WIN_TYPES.THANG_TRANG_DONG_MAU_13:
          this.resultLose.active = false;
          this.fxResult.active = true;
          this.fxResult.getComponent(cc.Sprite).setMaterial(0, this.matSprite[0]);
          this.labelFx.node.color = cc.Color.RED;
          this.labelFx.string = "Th\u1eafng Tr\u1eafng \u0110\u1ed3ng M\xe0u";
          break;

         case WIN_TYPES.KET_QUA_HOA:
          break;

         case WIN_TYPES.THUA_THONG_THUONG:
          if (playerResult.cards) if (this.kiemtraThoiTuQuy(playerResult.cards)) {
            this.fxResult.active = true;
            this.fxResult.getComponent(cc.Sprite).setMaterial(0, this.matSprite[1]);
            this.labelFx.node.color = cc.Color.GRAY;
            this.labelFx.string = "Th\u1ed1i T\u1ee9 Qu\xfd";
          } else if (this.kiemtraThoiHeo(playerResult.cards)) {
            this.fxResult.active = true;
            this.fxResult.getComponent(cc.Sprite).setMaterial(0, this.matSprite[1]);
            this.labelFx.node.color = cc.Color.GRAY;
            this.labelFx.string = "Th\u1ed1i Heo";
          }
          break;

         case WIN_TYPES.THUA_TREO:
          this.fxResult.active = true;
          this.fxResult.getComponent(cc.Sprite).setMaterial(0, this.matSprite[1]);
          this.labelFx.node.color = cc.Color.GRAY;
          this.labelFx.string = "C\xf3ng";
          break;

         case WIN_TYPES.THUA_TOI_TRANG:
          this.fxResult.active = true;
          this.fxResult.getComponent(cc.Sprite).setMaterial(0, this.matSprite[1]);
          this.labelFx.node.color = cc.Color.GRAY;
          this.labelFx.string = "Thua T\u1edbi Tr\u1eafng";
          break;

         case WIN_TYPES.THANG_DUT_BA_BICH:
          this.resultLose.active = false;
          this.fxResult.active = true;
          this.fxResult.getComponent(cc.Sprite).setMaterial(0, this.matSprite[0]);
          this.labelFx.node.color = cc.Color.RED;
          this.labelFx.string = "Th\u1eafng K\u1ebft 3 B\xedch";
          break;

         case WIN_TYPES.THUA_DUT_BA_BICH:
          this.fxResult.active = true;
          this.fxResult.getComponent(cc.Sprite).setMaterial(0, this.matSprite[1]);
          this.labelFx.node.color = cc.Color.GRAY;
          this.labelFx.string = "Thua K\u1ebft 3 B\xedch";
          break;

         case WIN_TYPES.THUA_THOI_BA_BICH:
          this.fxResult.active = true;
          this.fxResult.getComponent(cc.Sprite).setMaterial(0, this.matSprite[1]);
          this.labelFx.node.color = cc.Color.GRAY;
          this.labelFx.string = "Thua Th\u1ed1i 3 B\xedch";
        }
      }
      kiemtraThoiHeo(a) {
        for (var b = 0, c = 0; c < a.length; c++) 12 == Math.floor(a[c].id / 4) && b++;
        return 0 < b;
      }
      kiemtraThoiTuQuy(a) {
        a.sort(function(a, b) {
          return a.id - b.id;
        });
        if (4 <= a.length) for (var b = a.length - 1, c = 0; 0 < b; ) {
          if (Math.floor(a[b].id / 4) == Math.floor(a[b - 1].id / 4)) {
            if (c++, 3 == c) return true;
          } else c = 0;
          b--;
        }
        return false;
      }
    };
    __decorate([ property(cc.Sprite) ], TienLenItemPlayerResult.prototype, "spRank", void 0);
    __decorate([ property(cc.Label) ], TienLenItemPlayerResult.prototype, "lbRank", void 0);
    __decorate([ property(cc.Label) ], TienLenItemPlayerResult.prototype, "labelUserName", void 0);
    __decorate([ property(cc.Label) ], TienLenItemPlayerResult.prototype, "labelMoneyChange", void 0);
    __decorate([ property(cc.Node) ], TienLenItemPlayerResult.prototype, "listCards", void 0);
    __decorate([ property(cc.Node) ], TienLenItemPlayerResult.prototype, "resultWin", void 0);
    __decorate([ property(cc.Node) ], TienLenItemPlayerResult.prototype, "resultLose", void 0);
    __decorate([ property(cc.Node) ], TienLenItemPlayerResult.prototype, "fxResult", void 0);
    __decorate([ property(cc.Material) ], TienLenItemPlayerResult.prototype, "matSprite", void 0);
    __decorate([ property(cc.Label) ], TienLenItemPlayerResult.prototype, "labelFx", void 0);
    __decorate([ property(cc.Prefab) ], TienLenItemPlayerResult.prototype, "prefabCard", void 0);
    __decorate([ property([ cc.SpriteFrame ]) ], TienLenItemPlayerResult.prototype, "rankFrames", void 0);
    TienLenItemPlayerResult = __decorate([ ccclass ], TienLenItemPlayerResult);
    exports.default = TienLenItemPlayerResult;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/Utils": void 0,
    "./TienLen.InGame": "TienLen.InGame"
  } ],
  "TienLen.Listener": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "41dcbU82TpP1o8JxtKQ22sH", "TienLen.Listener");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var TienLenListener_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const App_1 = require("../../Main/Game/src/common/App");
    const BroadcastReceiver_1 = require("../../Main/Game/src/common/BroadcastReceiver");
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    const Network_InPacket_1 = require("../../Main/Game/src/networks/Network.InPacket");
    const TienLenNetworkClient_1 = require("../../Main/Game/src/networks/TienLenNetworkClient");
    const TienLen_Cmd_1 = require("./TienLen.Cmd");
    const TienLen_InGame_1 = require("./TienLen.InGame");
    const TienLen_Room_1 = require("./TienLen.Room");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let TienLenListener = TienLenListener_1 = class TienLenListener extends cc.Component {
      constructor() {
        super(...arguments);
        this.currentRoomInfo = null;
        this.pendingCommands = new Map();
      }
      static getInstance() {
        return this.instance;
      }
      static destroyInstance() {
        this.instance = null;
      }
      onLoad() {
        TienLenListener_1.instance = this;
        cc.game.addPersistRootNode(this.node);
      }
      start() {
        BroadcastReceiver_1.default.register(BroadcastReceiver_1.default.USER_UPDATE_COIN, () => {
          var _a;
          null === (_a = TienLen_Room_1.default.getInstance()) || void 0 === _a ? void 0 : _a.updateCoinPlayer();
        }, this);
        BroadcastReceiver_1.default.register(BroadcastReceiver_1.default.USER_INFO_UPDATED, () => {
          var _a, _b;
          null === (_a = TienLen_Room_1.default.getInstance()) || void 0 === _a ? void 0 : _a.updateInfoPlayer();
          null === (_b = TienLen_Room_1.default.getInstance()) || void 0 === _b ? void 0 : _b.updateCoinPlayer();
        }, this);
        BroadcastReceiver_1.default.register(BroadcastReceiver_1.default.USER_DISCONNECTED, data => {
          TienLenNetworkClient_1.default.getInstance().close();
        }, this);
        TienLenNetworkClient_1.default.getInstance().addOnClose(() => {
          var _a;
          if ((null === (_a = TienLen_Room_1.default.getInstance()) || void 0 === _a ? void 0 : _a.isClickBack) || !Configs_1.default.Login.IsLogin) this.backToLobby(); else if ("TienLen.InGame" === cc.director.getScene().name && TienLen_InGame_1.default.getInstance() && TienLen_InGame_1.default.getInstance().isMePlaying() && TienLenNetworkClient_1.default.getInstance().shouldAutoReconnect()) {
            TienLenNetworkClient_1.default.getInstance().setLoginCallback(() => {
              App_1.default.instance.showLoading(false);
              TienLenNetworkClient_1.default.getInstance().send(new TienLen_Cmd_1.default.SendJoinRoom(Configs_1.default.App.MONEY_TYPE, this.currentRoomInfo.maxUserPerRoom, this.currentRoomInfo.moneyBet, 0));
            });
            App_1.default.instance.showErrLoading("M\u1ea5t k\u1ebft n\u1ed1i, \u0111ang th\u1eed k\u1ebft n\u1ed1i l\u1ea1i...");
          } else {
            App_1.default.instance.showLoading(false);
            TienLenNetworkClient_1.default.getInstance().setForceClose(true);
            App_1.default.instance.alertDialog.showMsgWithOnDismissed("B\u1ea1n \u0111\xe3 m\u1ea5t k\u1ebft n\u1ed1i v\u1edbi server", () => {
              this.backToLobby();
            });
          }
        }, this);
        TienLenNetworkClient_1.default.getInstance().addListener(data => {
          var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
          App_1.default.instance.showLoading(false);
          let inpacket = new Network_InPacket_1.default(data);
          let cmdId = inpacket.getCmdId();
          switch (cmdId) {
           case TienLen_Cmd_1.default.Code.LOGIN:
            TienLenNetworkClient_1.default.getInstance().send(new TienLen_Cmd_1.default.SendReconnectRoom());
            break;

           case TienLen_Cmd_1.default.Code.MONEY_BET_CONFIG:
            {
              let res = new TienLen_Cmd_1.default.ReceivedMoneyBetConfig(data);
              cc.log(res);
              null === (_a = TienLen_Room_1.default.getInstance()) || void 0 === _a ? void 0 : _a.receivedMoneyBetConfig(res);
              break;
            }

           case TienLen_Cmd_1.default.Code.JOIN_ROOM_FAIL:
            {
              let res = new TienLen_Cmd_1.default.ReceivedJoinRoomFail(data);
              cc.log(res);
              App_1.default.instance.showLoading(false, 15, TienLen_Cmd_1.default.Code.JOIN_ROOM);
              null === (_b = TienLen_Room_1.default.getInstance()) || void 0 === _b ? void 0 : _b.receivedJoinRoomFail(res);
              break;
            }

           case TienLen_Cmd_1.default.Code.JOIN_ROOM_SUCCESS:
            {
              let res = new TienLen_Cmd_1.default.ReceivedJoinRoomSuccess(data);
              cc.log(res);
              App_1.default.instance.showLoading(false, 15, TienLen_Cmd_1.default.Code.JOIN_ROOM);
              null === (_c = TienLen_Room_1.default.getInstance()) || void 0 === _c ? void 0 : _c.receivedJoinRoomSuccess(res);
              break;
            }

           case TienLen_Cmd_1.default.Code.UPDATE_GAME_INFO:
            {
              let res = new TienLen_Cmd_1.default.ReceivedUpdateGameInfo(data);
              cc.log(res);
              App_1.default.instance.showLoading(false, 15, TienLen_Cmd_1.default.Code.JOIN_ROOM);
              null === (_d = TienLen_Room_1.default.getInstance()) || void 0 === _d ? void 0 : _d.receivedUpdateGameInfo(res);
              break;
            }

           case TienLen_Cmd_1.default.Code.AUTO_START:
            {
              let res = new TienLen_Cmd_1.default.ReceivedAutoStart(data);
              cc.log(res);
              TienLen_InGame_1.default.getInstance() ? TienLen_InGame_1.default.getInstance().receivedAutoStart(res) : this.pendingCommands.set(TienLen_Cmd_1.default.Code.AUTO_START, res);
            }
            break;

           case TienLen_Cmd_1.default.Code.USER_JOIN_ROOM:
            {
              let res = new TienLen_Cmd_1.default.ReceiveUserJoinRoom(data);
              cc.log(res);
              TienLen_InGame_1.default.getInstance() ? TienLen_InGame_1.default.getInstance().receivedUserJoinRoom(res) : this.pendingCommands.set(TienLen_Cmd_1.default.Code.USER_JOIN_ROOM, res);
            }
            break;

           case TienLen_Cmd_1.default.Code.FIRST_TURN:
            {
              let res = new TienLen_Cmd_1.default.ReceivedFirstTurnDecision(data);
              cc.log(res);
              TienLen_InGame_1.default.getInstance() ? TienLen_InGame_1.default.getInstance().receivedFirstTurnDecision(res) : this.pendingCommands.set(TienLen_Cmd_1.default.Code.FIRST_TURN, res);
            }
            break;

           case TienLen_Cmd_1.default.Code.CHIA_BAI:
            {
              let res = new TienLen_Cmd_1.default.ReceivedChiaBai(data);
              cc.log(res);
              TienLen_InGame_1.default.getInstance() ? TienLen_InGame_1.default.getInstance().receivedDealCard(res) : this.pendingCommands.set(TienLen_Cmd_1.default.Code.CHIA_BAI, res);
            }
            break;

           case TienLen_Cmd_1.default.Code.CHANGE_TURN:
            {
              let res = new TienLen_Cmd_1.default.ReceivedChangeTurn(data);
              cc.log(res);
              null === (_e = TienLen_InGame_1.default.getInstance()) || void 0 === _e ? void 0 : _e.receivedChangeTurn(res);
            }
            break;

           case TienLen_Cmd_1.default.Code.DANH_BAI:
            {
              let res = new TienLen_Cmd_1.default.ReceivedDanhBai(data);
              cc.log(res);
              null === (_f = TienLen_InGame_1.default.getInstance()) || void 0 === _f ? void 0 : _f.receivedSubmitTurn(res);
            }
            break;

           case TienLen_Cmd_1.default.Code.BO_LUOT:
            {
              let res = new TienLen_Cmd_1.default.ReceivedBoluot(data);
              cc.log(res);
              null === (_g = TienLen_InGame_1.default.getInstance()) || void 0 === _g ? void 0 : _g.receivedPassTurn(res);
            }
            break;

           case TienLen_Cmd_1.default.Code.END_GAME:
            {
              let res = new TienLen_Cmd_1.default.ReceivedEndGame(data);
              cc.log(res);
              null === (_h = TienLen_InGame_1.default.getInstance()) || void 0 === _h ? void 0 : _h.receivedEndGame(res);
            }
            break;

           case TienLen_Cmd_1.default.Code.UPDATE_MATCH:
            {
              let res = new TienLen_Cmd_1.default.ReceivedUpdateMatch(data);
              cc.log(res);
              null === (_j = TienLen_InGame_1.default.getInstance()) || void 0 === _j ? void 0 : _j.receivedUpdateMatch(res);
            }
            break;

           case TienLen_Cmd_1.default.Code.USER_LEAVE_ROOM:
            {
              let res = new TienLen_Cmd_1.default.UserLeaveRoom(data);
              cc.log(res);
              null === (_k = TienLen_InGame_1.default.getInstance()) || void 0 === _k ? void 0 : _k.receivedUserLeaveRoom(res);
            }
            break;

           case TienLen_Cmd_1.default.Code.CHAT_ROOM:
            {
              let res = new TienLen_Cmd_1.default.ReceivedChatRoom(data);
              cc.log(res);
              null === (_l = TienLen_InGame_1.default.getInstance()) || void 0 === _l ? void 0 : _l.receivedChatRoom(res);
            }
            break;

           case TienLen_Cmd_1.default.Code.CHAT_CHONG:
            {
              let res = new TienLen_Cmd_1.default.ReceivedChatChong(data);
              cc.log(res);
              null === (_m = TienLen_InGame_1.default.getInstance()) || void 0 === _m ? void 0 : _m.receivedChatChong(res);
            }
            break;

           case TienLen_Cmd_1.default.Code.WAIT_4_DOI_THONG:
            {
              let res = new TienLen_Cmd_1.default.ReceivedWaitBonDoiThong(data);
              cc.log(res);
            }
            break;

           case TienLen_Cmd_1.default.Code.RECONNECT_GAME_ROOM:
            {
              let res = new TienLen_Cmd_1.default.UserLeaveRoom(data);
              cc.log(res);
            }
            break;

           case TienLen_Cmd_1.default.Code.NOTIFY_KICK_OFF:
            {
              let res = new TienLen_Cmd_1.default.ReceivedKickOff(data);
              cc.log(res);
              null === (_o = TienLen_InGame_1.default.getInstance()) || void 0 === _o ? void 0 : _o.receivedKickFromRoom(res.reason);
            }
            break;

           case TienLen_Cmd_1.default.Code.REQUEST_LEAVE_ROOM:
            {
              let res = new TienLen_Cmd_1.default.ReceivedNotifyRegOutRoom(data);
              cc.log(res);
              null === (_p = TienLen_InGame_1.default.getInstance()) || void 0 === _p ? void 0 : _p.receivedNotifyUserRegOutRoom(res);
            }
            break;

           case TienLen_Cmd_1.default.Code.CARDS_DEFINE:
            {
              let res = new TienLen_Cmd_1.default.ReceivedCardDefinations(data);
              cc.log(res);
              null === (_q = TienLen_InGame_1.default.getInstance()) || void 0 === _q ? void 0 : _q.receivedCardDefinations(res);
            }
          }
        }, this);
      }
      backToLobby() {
        App_1.default.instance.loadScene("Lobby", () => {
          cc.game.removePersistRootNode(this.node);
          TienLenListener_1.destroyInstance();
          TienLen_InGame_1.default.destroyInstance();
          TienLen_Room_1.default.destroyInstance();
        });
      }
      setCurrentRoomInfo(room) {
        this.currentRoomInfo = room;
      }
      releasePendingCommands() {
        var _a, _b, _c, _d;
        for (const [key, value] of this.pendingCommands.entries()) switch (key) {
         case TienLen_Cmd_1.default.Code.AUTO_START:
          null === (_a = TienLen_InGame_1.default.getInstance()) || void 0 === _a ? void 0 : _a.receivedAutoStart(value);
          break;

         case TienLen_Cmd_1.default.Code.USER_JOIN_ROOM:
          null === (_b = TienLen_InGame_1.default.getInstance()) || void 0 === _b ? void 0 : _b.receivedUserJoinRoom(value);
          break;

         case TienLen_Cmd_1.default.Code.FIRST_TURN:
          null === (_c = TienLen_InGame_1.default.getInstance()) || void 0 === _c ? void 0 : _c.receivedFirstTurnDecision(value);
          break;

         case TienLen_Cmd_1.default.Code.CHIA_BAI:
          null === (_d = TienLen_InGame_1.default.getInstance()) || void 0 === _d ? void 0 : _d.receivedDealCard(value);
        }
        this.pendingCommands.clear();
      }
      clearPendingCommands() {
        this.pendingCommands.clear();
      }
    };
    TienLenListener.instance = null;
    TienLenListener = TienLenListener_1 = __decorate([ ccclass ], TienLenListener);
    exports.default = TienLenListener;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/App": void 0,
    "../../Main/Game/src/common/BroadcastReceiver": void 0,
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/networks/Network.InPacket": void 0,
    "../../Main/Game/src/networks/TienLenNetworkClient": void 0,
    "./TienLen.Cmd": "TienLen.Cmd",
    "./TienLen.InGame": "TienLen.InGame",
    "./TienLen.Room": "TienLen.Room"
  } ],
  "TienLen.Player": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "412f4i4blxDIrSUXZ0FQPQH", "TienLen.Player");
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
    const App_1 = require("../../Main/Game/src/common/App");
    const TienLen_Card_1 = require("./TienLen.Card");
    const TienLen_Constant_1 = require("./TienLen.Constant");
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    const TienLen_InGame_1 = require("./TienLen.InGame");
    const BroadcastReceiver_1 = require("../../Main/Game/src/common/BroadcastReceiver");
    const TURN_DURATION = 20;
    const {ccclass: ccclass, property: property} = cc._decorator;
    let Player = class Player extends cc.Component {
      constructor() {
        super(...arguments);
        this.chatEmotion = null;
        this.chatMsg = null;
        this.lblNickname = null;
        this.lblCoin = null;
        this.avatar = null;
        this.card = null;
        this.lblCardRemain = null;
        this.timeRemain = null;
        this.lbAction = null;
        this.lbCoinChange = null;
        this.cardLine = null;
        this.fxKet3Bich = null;
        this.fxThoi3Bich = null;
        this.active = false;
        this.status = TienLen_Constant_1.default.PlayerStatus.NO_LOGIN;
        this.timeTurn = 0;
      }
      start() {
        BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.SET_SOUND, this.node);
      }
      setPlayerInfo(info) {
        this.lblNickname.string = info.nickName;
        this.setCoin(info.money);
        this.avatar.spriteFrame = App_1.default.instance.getAvatarSpriteFrame(info.avatar);
        this.node.active = true;
        this.active = true;
      }
      setFirstCard(index) {
        this.card.spriteFrame = TienLen_InGame_1.default.getInstance().getCardFrame(index);
        this.card.node.active = true;
        this.lblCardRemain.node.active = false;
      }
      offFirstCard() {
        this.card.node.active = false;
        this.card.spriteFrame = TienLen_InGame_1.default.getInstance().getCardBackFrame();
      }
      setCardRemain(cardSize) {
        if (0 == cardSize) {
          this.card.node.active = false;
          return;
        }
        this.card.node.active = true;
        null === this.card.spriteFrame && (this.card.spriteFrame = TienLen_InGame_1.default.getInstance().getCardBackFrame());
        this.lblCardRemain.node.active = true;
        this.lblCardRemain.string = cardSize.toString();
      }
      setTimeRemain(remain) {
        this.timeTurn = remain;
        this.timeRemain.fillRange = this.timeTurn / TURN_DURATION;
      }
      update(dt) {
        if (this.timeTurn > 0) {
          this.timeTurn -= dt;
          this.timeRemain.fillRange = this.timeTurn / TURN_DURATION;
        }
      }
      setAction(actionName = "") {
        this.lbAction.string = actionName;
      }
      setCoin(coin) {
        this.lblCoin.string = Utils_1.default.formatNumber(coin);
      }
      setCoinChange(coinChange) {
        if (0 === coinChange) return;
        this.lbCoinChange.string = (coinChange > 0 ? "+" : "") + Utils_1.default.formatNumber(coinChange);
        this.scheduleOnce(() => {
          this.lbCoinChange.string = "";
        }, 5);
      }
      resetPlayer() {
        this.node.active = false;
        this.active = false;
        this.status = TienLen_Constant_1.default.PlayerStatus.NO_LOGIN;
        this.lblCardRemain.string = "";
        this.card.node.active = false;
        this.clearCardLine();
        this.setAction();
      }
      setCardLine(cards) {
        let layout = this.cardLine.getComponent(cc.Layout);
        if (layout.type == cc.Layout.Type.VERTICAL) if (cards.length > 5) {
          layout.resizeMode = cc.Layout.ResizeMode.CHILDREN;
          layout.node.height = 500;
        } else layout.resizeMode = cc.Layout.ResizeMode.CONTAINER;
        cards.forEach(card => {
          var item = cc.instantiate(TienLen_InGame_1.default.getInstance().getCardItem());
          item.parent = this.cardLine;
          item.removeComponent(cc.Button);
          item.getComponent(TienLen_Card_1.default).setCardData(card);
        });
      }
      clearCardLine() {
        this.cardLine.removeAllChildren();
      }
      showChatEmotion(content) {
        this.chatEmotion.active = true;
        this.chatMsg.active = false;
        this.chatEmotion.getComponent(sp.Skeleton).setAnimation(0, content, true);
        this.scheduleOnce(() => {
          this.chatEmotion.active = false;
          this.chatMsg.active = false;
        }, 3);
      }
      showChatMsg(content) {
        this.chatEmotion.active = false;
        this.chatMsg.active = true;
        this.chatMsg.children[1].getComponent(cc.Label).string = content;
        this.scheduleOnce(() => {
          this.chatEmotion.active = false;
          this.chatMsg.active = false;
        }, 3);
      }
      setNotify(msg) {
        this.lbAction.string = msg;
        this.scheduleOnce(() => {
          this.lbAction.string = "";
        }, 1);
      }
      isPlaying() {
        return this.active && this.status == TienLen_Constant_1.default.PlayerStatus.PLAY;
      }
      isMe() {
        return this.lblNickname.string === Configs_1.default.Login.Nickname;
      }
      showEffectKet3Bich() {
        this.fxKet3Bich.active = true;
        this.scheduleOnce(() => {
          this.fxKet3Bich.active = false;
        }, 4);
      }
      showEffectThoi3Bich() {
        this.fxThoi3Bich.active = true;
        this.scheduleOnce(() => {
          this.fxThoi3Bich.active = false;
        }, 4);
      }
    };
    __decorate([ property(cc.Node) ], Player.prototype, "chatEmotion", void 0);
    __decorate([ property(cc.Node) ], Player.prototype, "chatMsg", void 0);
    __decorate([ property(cc.Label) ], Player.prototype, "lblNickname", void 0);
    __decorate([ property(cc.Label) ], Player.prototype, "lblCoin", void 0);
    __decorate([ property(cc.Sprite) ], Player.prototype, "avatar", void 0);
    __decorate([ property(cc.Sprite) ], Player.prototype, "card", void 0);
    __decorate([ property(cc.Label) ], Player.prototype, "lblCardRemain", void 0);
    __decorate([ property(cc.Sprite) ], Player.prototype, "timeRemain", void 0);
    __decorate([ property(cc.Label) ], Player.prototype, "lbAction", void 0);
    __decorate([ property(cc.Label) ], Player.prototype, "lbCoinChange", void 0);
    __decorate([ property(cc.Node) ], Player.prototype, "cardLine", void 0);
    __decorate([ property(cc.Node) ], Player.prototype, "fxKet3Bich", void 0);
    __decorate([ property(cc.Node) ], Player.prototype, "fxThoi3Bich", void 0);
    Player = __decorate([ ccclass ], Player);
    exports.default = Player;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/App": void 0,
    "../../Main/Game/src/common/BroadcastReceiver": void 0,
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/common/Utils": void 0,
    "./TienLen.Card": "TienLen.Card",
    "./TienLen.Constant": "TienLen.Constant",
    "./TienLen.InGame": "TienLen.InGame"
  } ],
  "TienLen.PopupGuide": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "412f1CLBihDtYyTqllTYJqj", "TienLen.PopupGuide");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var TienLenPopupGuide_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const App_1 = require("../../Main/Game/src/common/App");
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    const Dialog_1 = require("../../Main/Game/src/common/Dialog");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let TienLenPopupGuide = TienLenPopupGuide_1 = class TienLenPopupGuide extends Dialog_1.default {
      constructor() {
        super(...arguments);
        this.scrollPopupGuide = null;
      }
      static createAndShow(parent) {
        null == this.instance || null == this.instance.node ? App_1.default.instance.loadPrefabInBundle(Configs_1.default.App.BUNDLE_NAME.TIENLEN, Configs_1.default.App.UPDATE_INFO[Configs_1.default.App.BUNDLE_NAME.TIENLEN], true, "res/prefabs/TienLenPopupGuide", (err, prefab) => {
          if (null != err) {
            App_1.default.instance.alertDialog.showMsg(err);
            return;
          }
          let go = cc.instantiate(prefab);
          go.parent = parent;
          this.instance = go.getComponent(TienLenPopupGuide_1);
          this.instance.show();
        }) : this.instance.show();
      }
      show() {
        let lbGuides = this.scrollPopupGuide.content.getComponentsInChildren(cc.Label);
        lbGuides[0].string = "LU\u1eacT CH\u01a0I:";
        lbGuides[1].string = "\u2022 S\u1ed1 ng\u01b0\u1eddi ch\u01a1i t\u1ed1i thi\u1ec3u l\xe0 2 ng\u01b0\u1eddi v\xe0 t\u1ed1i \u0111a l\xe0 4 ng\u01b0\u1eddi.\n\u2022 \u0110\u1ed9 l\u1edbn c\xe1c l\xe1 b\xe0i \u0111\u01b0\u1ee3c s\u1eafp x\u1ebfp theo th\u1ee9 t\u1ef1: 3,4,5,6,7,8,9,10,J,Q,K,A,2. Trong \u0111\xf3 nh\u1ecf nh\u1ea5t l\xe0 3 v\xe0 l\u1edbn nh\u1ea5t l\xe0 2 (Heo).\n\u2022 \u0110\u1ed9 l\u1edbn v\u1ec1 ch\u1ea5t \u0111\u01b0\u1ee3c t\xednh nh\u01b0 sau: \n  C\u01a1 > R\xf4 > T\xe9p > B\xedch\n\u2022 Khi v\xe1n b\xe0i b\u1eaft \u0111\u1ea7u, m\u1ed7i ng\u01b0\u1eddi ch\u01a1i s\u1ebd \u0111\u01b0\u1ee3c chia 13 l\xe1 b\xe0i.\n\u2022 L\u01b0\u1ee3t ch\u01a1i s\u1ebd t\xednh theo ng\u01b0\u1ee3c chi\u1ec1u kim \u0111\u1ed3ng h\u1ed3.\n\n";
        lbGuides[2].string = "CH\u1eb6T H\xc0NG:";
        lbGuides[3].string = "\u2022 Ba \u0110\xf4i Th\xf4ng ch\u1eb7t \u0111\u01b0\u1ee3c: m\u1ed9t c\xe2y 2 ho\u1eb7c Ba \u0110\xf4i Th\xf4ng nh\u1ecf h\u01a1n (Ba \u0110\xf4i Th\xf4ng \u0111\xe8).\n\u2022 T\u1ee9 Qu\xfd ch\u1eb7t \u0111\u01b0\u1ee3c: 1 c\xe2y 2 ho\u1eb7c \u0110\xf4i 2, Ba \u0110\xf4i Th\xf4ng ho\u1eb7c T\u1ee9 Qu\xfd nh\u1ecf h\u01a1n.\n\u2022 T\u1ee9 \u0110\xf4i Th\xf4ng ch\u1eb7t \u0111\u01b0\u1ee3c: m\u1ed9t c\xe2y 2 ho\u1eb7c \u0110\xf4i 2 b\u1ea5t k\u1ef3, Ba ho\u1eb7c T\u1ee9 \u0110\xf4i Th\xf4ng nh\u1ecf h\u01a1n (T\u1ee9 \u0110\xf4i Th\xf4ng \u0111\xe8) ho\u1eb7c T\u1ee9 Qu\xfd.\n\u2022 L\u01b0u \xfd: T\u1ee9 \u0110\xf4i Th\xf4ng kh\xf4ng v\xf4 v\xf2ng t\u1ef1 do.\n\u2022 \u0102n tr\u1eafng: S\u1ea3nh r\u1ed3ng \u0111\u1ed3ng hoa > S\u1ea3nh r\u1ed3ng > \u0110\u1ed3ng hoa > 6 \u0111\xf4i th\xf4ng > 5 \u0111\xf4i th\xf4ng > 6 \u0111\xf4i > t\u1ee9 qu\xfd heo.\n\n";
        lbGuides[4].string = "T\xcdNH TI\u1ec0N:";
        lbGuides[5].string = "\u2022 Heo \u0111\u1ecf: Ph\u1ea1t 6 l\xe1.\n\u2022 Heo \u0111en: Ph\u1ea1t 3 l\xe1.\n\u2022 Ba \u0110\xf4i Th\xf4ng: Ph\u1ea1t 12 l\xe1.\n\u2022 T\u1ee9 Qu\xfd: Ph\u1ea1t 12 l\xe1.\n\u2022 T\u1ee9 \u0110\xf4i Th\xf4ng: Ph\u1ea1t 16 l\xe1.\n\u2022 C\xf3ng: Thua 26 l\xe1 + t\xednh th\u1ed1i heo, ba \u0111\xf4i th\xf4ng, t\u1ee9 qu\xfd, t\u1ee9 \u0111\xf4i th\xf4ng.\n\u2022 T\u1edbi tr\u1eafng: M\u1ed7i ng\u01b0\u1eddi c\xf2n l\u1ea1i s\u1ebd b\u1ecb thua 26 l\xe1.\n\u2022 K\u1ebft 3 b\xedch: M\u1ed7i ng\u01b0\u1eddi c\xf2n l\u1ea1i s\u1ebd b\u1ecb thua 26 l\xe1.\n\u2022 Th\u1ed1i 3 b\xedch(l\xe1 cu\u1ed1i 3 b\xedch): Ph\u1ea1t 26 l\xe1.";
        super.show();
        this.scrollPopupGuide.scrollToTop(0);
      }
    };
    TienLenPopupGuide.instance = null;
    __decorate([ property(cc.ScrollView) ], TienLenPopupGuide.prototype, "scrollPopupGuide", void 0);
    TienLenPopupGuide = TienLenPopupGuide_1 = __decorate([ ccclass ], TienLenPopupGuide);
    exports.default = TienLenPopupGuide;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/App": void 0,
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/common/Dialog": void 0
  } ],
  "TienLen.PopupMatchResult": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b79afV/LRBPA6Rfy5J7Uwez", "TienLen.PopupMatchResult");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var TienLenPopupMatchResult_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const App_1 = require("../../Main/Game/src/common/App");
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    const Dialog_1 = require("../../Main/Game/src/common/Dialog");
    const TienLen_ItemPlayerResult_1 = require("./TienLen.ItemPlayerResult");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let TienLenPopupMatchResult = TienLenPopupMatchResult_1 = class TienLenPopupMatchResult extends Dialog_1.default {
      constructor() {
        super(...arguments);
        this.scrollPopupResult = null;
        this.prefabPlayerResult = null;
      }
      static createAndShow(parent, matchResult) {
        null == this.instance || null == this.instance.node ? App_1.default.instance.loadPrefabInBundle(Configs_1.default.App.BUNDLE_NAME.TIENLEN, Configs_1.default.App.UPDATE_INFO[Configs_1.default.App.BUNDLE_NAME.TIENLEN], true, "res/prefabs/TienLenPopupMatchResult", (err, prefab) => {
          if (null != err) {
            App_1.default.instance.alertDialog.showMsg(err);
            return;
          }
          let go = cc.instantiate(prefab);
          go.parent = parent;
          this.instance = go.getComponent(TienLenPopupMatchResult_1);
          this.instance.showResult(matchResult);
        }) : this.instance.showResult(matchResult);
      }
      showResult(matchResutl) {
        super.show();
        this.scrollPopupResult.content.removeAllChildren();
        matchResutl.forEach(playerResult => {
          let playerResultItem = cc.instantiate(this.prefabPlayerResult).getComponent(TienLen_ItemPlayerResult_1.default);
          playerResultItem.initItem(playerResult);
          this.scrollPopupResult.content.addChild(playerResultItem.node);
        });
        this.scrollPopupResult.scrollToTop(0);
      }
    };
    TienLenPopupMatchResult.instance = null;
    __decorate([ property(cc.ScrollView) ], TienLenPopupMatchResult.prototype, "scrollPopupResult", void 0);
    __decorate([ property(cc.Prefab) ], TienLenPopupMatchResult.prototype, "prefabPlayerResult", void 0);
    TienLenPopupMatchResult = TienLenPopupMatchResult_1 = __decorate([ ccclass ], TienLenPopupMatchResult);
    exports.default = TienLenPopupMatchResult;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/App": void 0,
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/common/Dialog": void 0,
    "./TienLen.ItemPlayerResult": "TienLen.ItemPlayerResult"
  } ],
  "TienLen.Room": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9ac265kyMdCZ6G4GL5Q1zxj", "TienLen.Room");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var TienLenRoom_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const TienLenNetworkClient_1 = require("../../Main/Game/src/networks/TienLenNetworkClient");
    const TienLen_Cmd_1 = require("./TienLen.Cmd");
    const Tween_1 = require("../../Main/Game/src/common/Tween");
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const App_1 = require("../../Main/Game/src/common/App");
    const BroadcastReceiver_1 = require("../../Main/Game/src/common/BroadcastReceiver");
    const TienLen_InGame_1 = require("./TienLen.InGame");
    const Lobby_PopupCashOut_1 = require("../../Main/Lobby/src/Lobby.PopupCashOut");
    const ItemRoom_1 = require("../../Main/Game/src/games/cardgames/ItemRoom");
    const TienLen_Listener_1 = require("./TienLen.Listener");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let TienLenRoom = TienLenRoom_1 = class TienLenRoom extends cc.Component {
      constructor() {
        super(...arguments);
        this.scrollListRoom = null;
        this.roomItem = null;
        this.lbCoin = null;
        this.lbName = null;
        this.avatar = null;
        this.listRoom = [];
        this._isClickBack = false;
      }
      static getInstance() {
        return this.instance;
      }
      static destroyInstance() {
        this.instance = null;
      }
      onLoad() {
        TienLenRoom_1.instance = this;
      }
      start() {
        BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.SET_SOUND, this.node);
        cc.director.preloadScene("TienLen.InGame");
        this.sendGetListRoom();
        this.updateInfoPlayer();
        this.updateCoinPlayer();
        this.isClickBack = false;
      }
      set isClickBack(b) {
        this._isClickBack = b;
      }
      get isClickBack() {
        return this._isClickBack;
      }
      updateCoinPlayer() {
        Tween_1.default.numberTo(this.lbCoin, Configs_1.default.Login.Coin, .3);
      }
      updateInfoPlayer() {
        this.lbName.string = Configs_1.default.Login.Nickname;
        this.avatar.spriteFrame = App_1.default.instance.getAvatarSpriteFrame(Configs_1.default.Login.Avatar);
      }
      receivedMoneyBetConfig(moneyBetConfigData) {
        this.initRooms(moneyBetConfigData.list);
      }
      initRooms(rooms) {
        this.scrollListRoom.content.removeAllChildren();
        let listBetSolo = [ ...new Set(rooms) ].filter(room => room.moneyType === Configs_1.default.App.MONEY_TYPE && 2 === room.maxUserPerRoom).map(room => room.moneyBet);
        listBetSolo.forEach((bet, index) => {
          let playerCount = 0;
          let maxUser = 0;
          let moneyRequire = 0;
          rooms.forEach(room => {
            if (room.moneyBet === bet && 2 == room.maxUserPerRoom) {
              playerCount += room.nPersion;
              maxUser = room.maxUserPerRoom;
              moneyRequire = room.moneyRequire;
            }
          });
          this.listRoom.push(new ItemRoom_1.RoomItemInfo(index + 1, bet, moneyRequire, playerCount, maxUser));
        });
        this.listRoom.sort((a, b) => a.moneyBet - b.moneyBet);
        let speed = .7;
        this.listRoom.forEach((room, index) => {
          const roomItem = cc.instantiate(this.roomItem);
          roomItem.getComponent(ItemRoom_1.default).initItem(room);
          roomItem.on(cc.Node.EventType.TOUCH_END, event => {
            var _a;
            if (Configs_1.default.Login.Coin < room.requiredMoney) {
              App_1.default.instance.actiontDialog.showMsgWithAction("S\u1ed1 d\u01b0 kh\xf4ng \u0111\u1ee7.", "N\u1ea0P NGAY", () => {
                App_1.default.instance.openShop(0);
              });
              return;
            }
            App_1.default.instance.showLoading(true, 15, TienLen_Cmd_1.default.Code.JOIN_ROOM);
            TienLenNetworkClient_1.default.getInstance().send(new TienLen_Cmd_1.default.SendJoinRoom(Configs_1.default.App.MONEY_TYPE, room.maxUserPerRoom, room.moneyBet, 0));
            null === (_a = TienLen_Listener_1.default.getInstance()) || void 0 === _a ? void 0 : _a.setCurrentRoomInfo(room);
          });
          roomItem.parent = this.scrollListRoom.content;
          roomItem.y = -30;
          let time = .2 * speed * (1 === index ? .8 : 1 - Math.pow(2, -10 * index));
          roomItem.runAction(cc.sequence(cc.fadeOut(0), cc.delayTime(.15 * (this.listRoom.length - index) * speed), cc.spawn(cc.fadeIn(time), cc.moveTo(time, cc.v2(0, -30 - 85 * index)).easing(cc.easeCircleActionOut()))));
        });
        this.scrollListRoom.scrollToBottom(0);
        this.scrollListRoom.scrollToTop(2);
      }
      actBack(event) {
        this.isClickBack = true;
        TienLenNetworkClient_1.default.getInstance().close();
      }
      show(isShow) {
        this.node.active = isShow;
        if (!isShow) return;
        BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.USER_UPDATE_COIN);
        this.sendGetListRoom();
      }
      sendGetListRoom() {
        TienLenNetworkClient_1.default.getInstance().send(new TienLen_Cmd_1.default.SendMoneyBetConfig());
      }
      actExchange() {
        Lobby_PopupCashOut_1.default.createAndShow(this.node);
      }
      actQuickPlay() {
        let listRoomToJoin = this.listRoom.filter(room => room.requiredMoney <= Configs_1.default.Login.Coin);
        if (listRoomToJoin.length <= 0) {
          App_1.default.instance.actiontDialog.showMsgWithAction("S\u1ed1 d\u01b0 kh\xf4ng \u0111\u1ee7.", "N\u1ea0P NGAY", () => {
            App_1.default.instance.openShop(0);
          });
          return;
        }
        let randomIdx = Utils_1.default.randomRangeInt(0, listRoomToJoin.length);
        let room = listRoomToJoin[randomIdx];
        App_1.default.instance.showLoading(true, 15, TienLen_Cmd_1.default.Code.JOIN_ROOM);
        TienLenNetworkClient_1.default.getInstance().send(new TienLen_Cmd_1.default.SendJoinRoom(Configs_1.default.App.MONEY_TYPE, room.maxUserPerRoom, room.moneyBet, 0));
      }
      actHideFullyRoom(toggleHide) {
        this.scrollListRoom.content.children.forEach(roomItem => {
          roomItem.active = !toggleHide.isChecked || roomItem.getComponent(ItemRoom_1.default).isFull();
        });
      }
      receivedJoinRoomFail(joinRoomFailData) {
        let errorMessage = "";
        switch (joinRoomFailData.error) {
         case 1:
          errorMessage = "L\u1ed7i ki\u1ec3m tra th\xf4ng tin!";
          break;

         case 2:
          errorMessage = "Kh\xf4ng t\xecm \u0111\u01b0\u1ee3c ph\xf2ng th\xedch h\u1ee3p. Vui l\xf2ng th\u1eed l\u1ea1i sau!";
          break;

         case 3:
          errorMessage = "B\u1ea1n kh\xf4ng \u0111\u1ee7 ti\u1ec1n v\xe0o ph\xf2ng ch\u01a1i n\xe0y!";
          break;

         case 4:
          errorMessage = "Kh\xf4ng t\xecm \u0111\u01b0\u1ee3c ph\xf2ng th\xedch h\u1ee3p. Vui l\xf2ng th\u1eed l\u1ea1i sau!";
          break;

         case 5:
          errorMessage = "M\u1ed7i l\u1ea7n v\xe0o ph\xf2ng ph\u1ea3i c\xe1ch nhau 10 gi\xe2y!";
          break;

         case 6:
          errorMessage = "H\u1ec7 th\u1ed1ng b\u1ea3o tr\xec!";
          break;

         case 7:
          errorMessage = "Kh\xf4ng t\xecm th\u1ea5y ph\xf2ng ch\u01a1i!";
          break;

         case 8:
          errorMessage = "M\u1eadt kh\u1ea9u ph\xf2ng ch\u01a1i kh\xf4ng \u0111\xfang!";
          break;

         case 9:
          errorMessage = "Ph\xf2ng ch\u01a1i \u0111\xe3 \u0111\u1ee7 ng\u01b0\u1eddi!";
          break;

         case 10:
          errorMessage = "B\u1ea1n b\u1ecb ch\u1ee7 ph\xf2ng kh\xf4ng cho v\xe0o b\xe0n!";
        }
        App_1.default.instance.alertDialog.showMsg(errorMessage);
      }
      receivedJoinRoomSuccess(joinRoomSuccessData) {
        App_1.default.instance.showLoading(true);
        cc.director.loadScene("TienLen.InGame", (error, sceneAsset) => {
          var _a;
          App_1.default.instance.showLoading(false);
          if (error) {
            null === (_a = TienLen_Listener_1.default.getInstance()) || void 0 === _a ? void 0 : _a.clearPendingCommands();
            return;
          }
          TienLen_InGame_1.default.getInstance().updateRoomInfo(TienLen_InGame_1.TienLenRoomInfoDTO.fromReceivedJoinRoomSuccess(joinRoomSuccessData));
        });
      }
      receivedUpdateGameInfo(updateGameInfoData) {
        App_1.default.instance.showLoading(true);
        cc.director.loadScene("TienLen.InGame", (error, sceneAsset) => {
          var _a;
          App_1.default.instance.showLoading(false);
          if (error) {
            null === (_a = TienLen_Listener_1.default.getInstance()) || void 0 === _a ? void 0 : _a.clearPendingCommands();
            return;
          }
          TienLen_InGame_1.default.getInstance().updateRoomInfo(TienLen_InGame_1.TienLenRoomInfoDTO.fromReceivedUpdateGameInfo(updateGameInfoData));
        });
      }
      tabRoomCheckEvent(target) {
        switch (target.node.name) {
         case "tabAll":
          this.scrollListRoom.content.children.forEach(room => {
            room.active = true;
          });
          break;

         case "tab2":
          this.scrollListRoom.content.children.forEach(room => {
            room.active = 2 === room.getComponent(ItemRoom_1.default).getRoomInfo().maxUserPerRoom;
          });
          break;

         case "tab4":
          this.scrollListRoom.content.children.forEach(room => {
            room.active = 4 === room.getComponent(ItemRoom_1.default).getRoomInfo().maxUserPerRoom;
          });
        }
      }
    };
    TienLenRoom.instance = null;
    __decorate([ property(cc.ScrollView) ], TienLenRoom.prototype, "scrollListRoom", void 0);
    __decorate([ property(cc.Prefab) ], TienLenRoom.prototype, "roomItem", void 0);
    __decorate([ property(cc.Label) ], TienLenRoom.prototype, "lbCoin", void 0);
    __decorate([ property(cc.Label) ], TienLenRoom.prototype, "lbName", void 0);
    __decorate([ property(cc.Sprite) ], TienLenRoom.prototype, "avatar", void 0);
    TienLenRoom = TienLenRoom_1 = __decorate([ ccclass ], TienLenRoom);
    exports.default = TienLenRoom;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/App": void 0,
    "../../Main/Game/src/common/BroadcastReceiver": void 0,
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/common/Tween": void 0,
    "../../Main/Game/src/common/Utils": void 0,
    "../../Main/Game/src/games/cardgames/ItemRoom": void 0,
    "../../Main/Game/src/networks/TienLenNetworkClient": void 0,
    "../../Main/Lobby/src/Lobby.PopupCashOut": void 0,
    "./TienLen.Cmd": "TienLen.Cmd",
    "./TienLen.InGame": "TienLen.InGame",
    "./TienLen.Listener": "TienLen.Listener"
  } ]
}, {}, [ "TienLen.Card", "TienLen.CardGroup", "TienLen.Cmd", "TienLen.Constant", "TienLen.InGame", "TienLen.ItemPlayerResult", "TienLen.Listener", "TienLen.Player", "TienLen.PopupGuide", "TienLen.PopupMatchResult", "TienLen.Room" ]);