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
  "Sam.CardGroup": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9d25d26ZWdLOqmR0BFbWkdw", "Sam.CardGroup");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.SamCardGroup = exports.SamCardDTO = void 0;
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
    })(CardGroupType || (CardGroupType = {}));
    class SamCardDTO {
      constructor(id) {
        this.id = id;
        this.suit = id + 1;
        while (this.suit > 4) this.suit -= 4;
        this.number = (id + 1 - this.suit) / 4 + 3;
        this.number > 13 && (this.number -= 13);
      }
      static fromCardId(id) {
        return new SamCardDTO(id);
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
    exports.SamCardDTO = SamCardDTO;
    class SamCardGroup {
      constructor(cards) {
        this.cards = null;
        this.cardsByNumbers = null;
        this.cards = SamCardGroup.sortCards(cards);
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
          var _key = SamCardGroup.getNextKey(key);
          if (newMap.get(_key) && newMap.get(_key).length >= 2) {
            var __key = SamCardGroup.getNextKey(_key);
            if (newMap.get(__key) && newMap.get(__key).length >= 2) {
              orderedCards = orderedCards.concat([ value.shift(), value.shift() ]);
              value.length <= 0 && newMap.delete(key);
              var _value = newMap.get(_key);
              orderedCards = orderedCards.concat([ _value.shift(), _value.shift() ]);
              _value.length <= 0 && newMap.delete(_key);
              var __value = newMap.get(__key);
              orderedCards = orderedCards.concat([ __value.shift(), __value.shift() ]);
              __value.length <= 0 && newMap.delete(__key);
              var ___key = SamCardGroup.getNextKey(__key);
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
          var sequenceSuites = SamCardGroup.getFirstSequenceSuit([ ...newMap.keys() ], 3);
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
        var newMap = new Map(this.cardsByNumbers);
        var mapSize = newMap.size;
        var keys = [ ...newMap.keys() ];
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
        const currentTurnCardGroup = new SamCardGroup(currentTurnCards);
        const currentTurnCardType = currentTurnCardGroup.getCardGroupType();
        const maxSubmitCard = SamCardGroup.getMaxCardOfCards(currentTurnCards);
        const newMap = new Map(this.cardsByNumbers);
        let listSuggestion = new Array();
        switch (currentTurnCardType) {
         case CardGroupType.MOT_LA:
          for (var i = 0; i < this.cards.length; i++) SamCardGroup.point(this.cards[i]) > SamCardGroup.point(maxSubmitCard) && listSuggestion.push([ this.cards[i] ]);
          break;

         case CardGroupType.MOT_DOI:
          for (var [key, value] of newMap) {
            if (1 == value.length) continue;
            if (value.length >= 2) for (var i = 0; i < value.length; i++) SamCardGroup.point(value[i]) > SamCardGroup.point(maxSubmitCard) && listSuggestion.push([ value.shift(), value.shift() ]);
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
            var _key = SamCardGroup.getNextKey(key);
            if (newMap.get(_key) && newMap.get(_key).length >= 2) {
              var __key = SamCardGroup.getNextKey(_key);
              if (newMap.get(__key) && newMap.get(__key).length >= 2) {
                var ___key = SamCardGroup.getNextKey(__key);
                if (newMap.get(___key) && newMap.get(___key).length >= 2) {
                  var orderedCards = [ value.shift(), value.shift() ];
                  var _value = newMap.get(_key);
                  orderedCards = orderedCards.concat([ _value.shift(), _value.shift() ]);
                  var __value = newMap.get(__key);
                  orderedCards = orderedCards.concat([ __value.shift(), __value.shift() ]);
                  var ___value = newMap.get(___key);
                  orderedCards = orderedCards.concat([ ___value.shift(), ___value.shift() ]);
                  var maxCard = SamCardGroup.getMaxCardOfCards(orderedCards);
                  SamCardGroup.point(maxCard) > SamCardGroup.point(maxSubmitCard) && listSuggestion.push(orderedCards);
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
          const cardsByNextSequenceNumber = i + 1 < orderedNumbers.length ? this.cardsByNumbers.get(SamCardDTO.nextStraightNumber(cardNumber)) : null;
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
          const cardsByNextSequenceNumber = i + 1 < orderedNumbers.length ? this.cardsByNumbers.get(SamCardDTO.nextStraightNumber(cardNumber)) : null;
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
      get_BA_DOI_THONG(submitCards, cards = null) {
        if (submitCards.length > 0) {
          let listCard = new Array();
          let listTmp2 = new Array();
          let listTmp = new Array();
          let listSg = new Array();
          for (var [key, value] of new Map(this.cardsByNumbers)) listCard.push({
            card: key,
            value: value
          });
          for (let i = 0; i < listCard.length; i++) if (i + 1 < listCard.length && SamCardGroup.cardRank(listCard[i].number) == SamCardGroup.cardRank(listCard[i + 1].number) - 1 && listCard[i].value.length >= 2 && listCard[i + 1].value.length >= 2) listTmp.push(listCard[i]); else {
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
          if (cards.length >= 2) {
            let listCard = new Array();
            let listTmp2 = new Array();
            let listTmp = new Array();
            for (var [key, value] of new Map(this.cardsByNumbers)) listCard.push({
              card: key,
              value: value
            });
            for (let i = 0; i < listCard.length; i++) if (i + 1 < listCard.length && SamCardGroup.cardRank(listCard[i].number) == SamCardGroup.cardRank(listCard[i + 1].number) - 1 && listCard[i].value.length >= 2 && listCard[i + 1].value.length >= 2) listTmp.push(listCard[i]); else {
              listCard[i].value.length >= 2 && listTmp.push(listCard[i]);
              listTmp.length >= 3 && listTmp2.push(listTmp);
              listTmp = new Array();
            }
            for (let i = 0; i < listTmp2.length; i++) for (let j = 0; j < listTmp2[i].length - 2; j++) {
              let tmp = new Array();
              for (let l = j; l < j + 3; l++) for (let k = 0; k < 2; k++) tmp.push(listTmp2[i][l].value[k]);
              if (cards.filter(e => tmp.findIndex(e2 => e.equals(e2)) >= 0).length >= 2) {
                listSg.push(tmp);
                return listSg;
              }
            }
          }
          return listSg;
        }
      }
      get_BON_DOI_THONG(submitCards, listSelected = null) {
        if (submitCards.length > 0) {
          let listCard = new Array();
          let listTmp2 = new Array();
          let listTmp = new Array();
          let listSg = new Array();
          for (var [key, value] of new Map(this.cardsByNumbers)) listCard.push({
            number: key,
            value: value
          });
          for (let i = 0; i < listCard.length; i++) if (i + 1 < listCard.length && SamCardGroup.cardRank(listCard[i].number) == SamCardGroup.cardRank(listCard[i + 1].number) - 1 && listCard[i].value.length >= 2 && listCard[i + 1].value.length >= 2) listTmp.push(listCard[i]); else {
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
          if (listSelected.length >= 2) {
            let listCard = new Array();
            let listTmp2 = new Array();
            let listTmp = new Array();
            for (var [key, value] of new Map(this.cardsByNumbers)) listCard.push({
              number: key,
              value: value
            });
            for (let i = 0; i < listCard.length; i++) if (i + 1 < listCard.length && SamCardGroup.cardRank(listCard[i].number) == SamCardGroup.cardRank(listCard[i + 1].number) - 1 && listCard[i].value.length >= 2 && listCard[i + 1].value.length >= 2) listTmp.push(listCard[i]); else {
              listCard[i].value.length >= 2 && listTmp.push(listCard[i]);
              listTmp.length >= 3 && listTmp2.push(listTmp);
              listTmp = new Array();
            }
            for (let i = 0; i < listTmp2.length; i++) for (let j = 0; j < listTmp2[i].length - 3; j++) {
              let tmp = new Array();
              for (let l = j; l < j + 4; l++) for (let k = 0; k < 2; k++) tmp.push(listTmp2[i][l].value[k]);
              if (listSelected.filter(e => tmp.findIndex(e2 => e.equals(e2)) >= 0).length >= 2) {
                listSg.push(tmp);
                return listSg;
              }
            }
          }
          return listSg;
        }
      }
      get_TU_QUY(submitCards, listSelected = null) {
        if (submitCards.length > 0) {
          let listSg = new Array();
          for (var [key, value] of new Map(this.cardsByNumbers)) 4 == value.length && listSg.push(value);
          return listSg;
        }
        {
          let listSg = new Array();
          if (listSelected.length >= 2) for (var [key, value] of new Map(this.cardsByNumbers)) if (4 == value.length && listSelected.filter(e => value.findIndex(e2 => e.equals(e2)) >= 0).length >= 2) {
            listSg.push(value);
            return listSg;
          }
          return listSg;
        }
      }
      get_SAM_CO(submitCards, listSelected = null) {
        let listSg = new Array();
        if (listSelected.length >= 2) for (var [key, value] of new Map(this.cardsByNumbers)) {
          let tmp = new Array();
          if (value.length < 3) continue;
          if (key > 2) {
            tmp = [ value.shift(), value.shift(), value.shift() ];
            listSelected.filter(e => tmp.findIndex(e2 => e.equals(e2)) >= 0).length >= 2 && listSg.push(tmp);
            return listSg;
          }
        }
        return listSg;
      }
      static getMaxCardOfCards(cards) {
        return SamCardGroup.sortCards(cards)[cards.length - 1];
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
          return SamCardGroup.point(a) - SamCardGroup.point(b);
        });
      }
      static point(card) {
        return (card.number + 10) % 13 * 4 + card.suit;
      }
      static getFirstSequenceSuit(suits, minCount) {
        if (!suits) return null;
        if (minCount <= 1 || minCount > suits.length) return null;
        var _suits = [ ...suits ];
        SamCardGroup.sortSuits(_suits);
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
        SamCardGroup.sortSuits(_suits);
        var temp = [];
        for (var i = 0; i < _suits.length - 1; i++) {
          var curr = _suits[i];
          var next = _suits[i + 1];
          if (1 == curr) {
            var listCards = map.get(curr);
            for (let j = 0; j < listCards.length; j++) SamCardGroup.point(listCards[j]) > SamCardGroup.point(maxCard) && temp.push(listCards[j]);
          }
          if (curr < maxCard.number - count) {
            map.delete(curr);
            continue;
          }
          if (2 == curr || 2 == next) break;
          if (temp.length == count - 1) {
            var listCards = map.get(curr);
            for (let j = 0; j < listCards.length; j++) SamCardGroup.point(listCards[j]) > SamCardGroup.point(maxCard) && temp.push(listCards[j]);
            map.delete(_suits.shift());
            return SamCardGroup.getFirstSequenceSuitBySize(map, count, maxCard);
          }
          if (next - curr == 1 || 1 == next && 13 == curr) {
            var listCards = map.get(curr);
            temp.push(listCards[0]);
          } else {
            map.delete(_suits.shift());
            temp.push(SamCardGroup.getFirstSequenceSuitBySize(map, count, maxCard));
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
          cards.push(SamCardDTO.fromCardId(index));
        });
        return cards;
      }
      static cardsToIndexs(cards) {
        let indexs = [];
        cards.forEach(card => {
          indexs.push(SamCardGroup.cardToIndex(card));
        });
        return indexs;
      }
      static cardToIndex(card) {
        return (card.number + 10) % 13 * 4 + card.suit - 1;
      }
    }
    exports.SamCardGroup = SamCardGroup;
    cc._RF.pop();
  }, {} ],
  "Sam.Card": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "51050MrC/lLpo88CElLQ3S9", "Sam.Card");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Sam_InGame_1 = require("./Sam.InGame");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let SamCard = class SamCard extends cc.Component {
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
        this.spr.spriteFrame = Sam_InGame_1.default.getInstance().getCardFrame(cardDTO.id);
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
      isSelect() {
        return this.isSelected;
      }
      setCardFrame(id) {
        this.spr.spriteFrame = Sam_InGame_1.default.getInstance().getCardFrame(id);
      }
    };
    __decorate([ property(cc.Sprite) ], SamCard.prototype, "spr", void 0);
    SamCard = __decorate([ ccclass ], SamCard);
    exports.default = SamCard;
    cc._RF.pop();
  }, {
    "./Sam.InGame": "Sam.InGame"
  } ],
  "Sam.Cmd": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "48adf0y0pJCGYJv4tEI3Jsv", "Sam.Cmd");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.SamCmd = void 0;
    const Network_OutPacket_1 = require("../../Main/Game/src/networks/Network.OutPacket");
    const Network_InPacket_1 = require("../../Main/Game/src/networks/Network.InPacket");
    const Sam_CardGroup_1 = require("./Sam.CardGroup");
    const Sam_InGame_1 = require("./Sam.InGame");
    const {ccclass: ccclass} = cc._decorator;
    var SamCmd;
    (function(SamCmd) {
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
      Code.QUYET_DINH_SAM = 3100;
      Code.DANH_BAI = 3101;
      Code.START_GAME = 3102;
      Code.END_GAME = 3103;
      Code.CHIA_BAI = 3105;
      Code.BO_LUOT = 3106;
      Code.AUTO_START = 3107;
      Code.FIRST_TURN = 3108;
      Code.BAO_SAM = 3109;
      Code.UPDATE_GAME_INFO = 3110;
      Code.REQUEST_LEAVE_ROOM = 3111;
      Code.CHANGE_TURN = 3112;
      Code.CHAT_CHONG = 3113;
      Code.HUY_BAO_SAM = 3114;
      Code.CHEAT_CARDS = 3115;
      Code.HOLD = 3116;
      Code.JOIN_ROOM_SUCCESS = 3118;
      Code.USER_LEAVE_ROOM = 3119;
      Code.NOTIFY_KICK_OFF = 3120;
      Code.USER_JOIN_ROOM = 3121;
      Code.UPDATE_MATCH = 3123;
      Code.WAIT_4_DOI_THONG = 3124;
      Code.CARDS_DEFINE = 3999;
      SamCmd.Code = Code;
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
      SamCmd.SendTest = SendTest;
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
      SamCmd.SendLogin = SendLogin;
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
      SamCmd.SendMoneyBetConfig = SendMoneyBetConfig;
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
      SamCmd.SendJoinRoom = SendJoinRoom;
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
      SamCmd.SendJoinRoomById = SendJoinRoomById;
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
      SamCmd.SendReconnectRoom = SendReconnectRoom;
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
      SamCmd.SendReadyAutoStart = SendReadyAutoStart;
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
      SamCmd.SendStartGame = SendStartGame;
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
      SamCmd.SendPing = SendPing;
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
      SamCmd.SendDanhBai = SendDanhBai;
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
      SamCmd.SendBoLuot = SendBoLuot;
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
      SamCmd.SendRequestLeaveGame = SendRequestLeaveGame;
      class SendBaoSam extends Network_OutPacket_1.default {
        constructor() {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.BAO_SAM);
          this.packHeader();
          this.updateSize();
        }
      }
      SamCmd.SendBaoSam = SendBaoSam;
      class SendHuyBaoSam extends Network_OutPacket_1.default {
        constructor() {
          super();
          this.initData(100);
          this.setControllerId(1);
          this.setCmdId(Code.HUY_BAO_SAM);
          this.packHeader();
          this.updateSize();
        }
      }
      SamCmd.SendHuyBaoSam = SendHuyBaoSam;
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
      SamCmd.SendChatRoom = SendChatRoom;
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
      SamCmd.SendCheatCards = SendCheatCards;
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
      SamCmd.SendCardDefinations = SendCardDefinations;
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
      SamCmd.ReceivedMoneyBetConfig = ReceivedMoneyBetConfig;
      class ReceivedJoinRoomFail extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.error = 0;
          this.error = this.getError();
        }
      }
      SamCmd.ReceivedJoinRoomFail = ReceivedJoinRoomFail;
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
          this.playerHandCardSize = [];
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
          this.playerInfos = [];
          for (let a = 0; a < this.playerSize; a++) {
            let _playerInfo = new Sam_InGame_1.SamSlotInfo();
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
          this.playerHandCardSize = [];
          for (let a = 0; a < playerHandCardLength; a++) {
            let cSize = this.getByte();
            cc.isValid(this.playerInfos[a]) && (this.playerInfos[a].cardSize = cSize);
          }
          this.currentChair = this.getByte();
          this.countDownTime = this.getByte();
        }
      }
      SamCmd.ReceivedJoinRoomSuccess = ReceivedJoinRoomSuccess;
      class ReceivedDisconnect extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
        }
      }
      SamCmd.ReceivedDisconnect = ReceivedDisconnect;
      class ReceivedUpdateGameInfo extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.maxPlayer = 0;
          this.myChair = 0;
          this.playerCards = [];
          this.baoSam = false;
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
          for (var a = 0; a < b; a++) this.playerCards.push(Sam_CardGroup_1.SamCardDTO.fromCardId(this.getByte()));
          this.baoSam = this.getBool();
          this.boLuot = this.getBool();
          this.toiTrang = this.getInt();
          this.newRound = this.getBool();
          this.gameServerState = this.getByte();
          this.gameAction = this.getByte();
          this.activeTimeRemain = this.getByte();
          this.currentChair = this.getByte();
          b = this.getShort();
          for (var a = 0; a < b; a++) this.recentCards.push(Sam_CardGroup_1.SamCardDTO.fromCardId(this.getByte()));
          this.moneyType = this.getByte();
          this.moneyBet = this.getLong();
          this.matchId = this.getInt();
          this.roomId = this.getInt();
          b = this.getShort();
          for (let a = 0; a < b; a++) this.hasInfoList.push(this.getBool());
          for (let a = 0; a < b; a++) {
            let plInfo = new Sam_InGame_1.SamSlotInfo();
            if (this.hasInfoList[a]) {
              let cardSize = this.getByte();
              let baoSam = this.getBool();
              let huyBaoSam = this.getBool();
              let playerStatus = this.getByte();
              let avatar = this.getString();
              let uID = this.getInt();
              let nickName = this.getString();
              let money = this.getLong();
              plInfo.cardSize = cardSize;
              plInfo.baoSam = baoSam;
              plInfo.huyBaoSam = huyBaoSam;
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
      SamCmd.ReceivedUpdateGameInfo = ReceivedUpdateGameInfo;
      class ReceivedAutoStart extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.isAutoStart = false;
          this.autoStartTime = 0;
          this.isAutoStart = this.getBool();
          this.autoStartTime = this.getByte();
        }
      }
      SamCmd.ReceivedAutoStart = ReceivedAutoStart;
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
          for (a = 0; a < this.cardSize; a++) this.cards.push(Sam_CardGroup_1.SamCardDTO.fromCardId(this.getByte()));
          this.toiTrang = this.getByte();
          this.timeBaoSam = this.getByte();
          this.matchId = this.getInt();
          this.playerSize = this.getShort();
          for (var a = 0; a < this.playerSize; a++) this.playerStatus.push(this.getByte());
        }
      }
      SamCmd.ReceivedChiaBai = ReceivedChiaBai;
      class ReceivedDanhBai extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.chair = 0;
          this.cards = [];
          this.remainCardSize = 0;
          this.chair = this.getByte();
          var b = this.getShort();
          this.cards = [];
          for (var a = 0; a < b; a++) this.cards.push(this.getByte());
          this.remainCardSize = this.getByte();
        }
      }
      SamCmd.ReceivedDanhBai = ReceivedDanhBai;
      class ReceivedBoluot extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.chair = 0;
          this.chair = this.getByte();
        }
      }
      SamCmd.ReceivedBoluot = ReceivedBoluot;
      class ReceivedChangeTurn extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.newRound = false;
          this.chair = 0;
          this.time = 0;
          this.newRound = this.getBool();
          this.chair = this.getByte();
          this.time = this.getByte();
        }
      }
      SamCmd.ReceivedChangeTurn = ReceivedChangeTurn;
      class ReceivedWaitBonDoiThong extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.chair = 0;
          this.chair = this.getByte();
        }
      }
      SamCmd.ReceivedWaitBonDoiThong = ReceivedWaitBonDoiThong;
      class ReceivedNotifyRegOutRoom extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.outChair = this.getByte();
          this.isOutRoom = this.getBool();
          this.reqQuitRoomReason = this.getString();
          this.listSuggestionActions = this.getString();
        }
      }
      SamCmd.ReceivedNotifyRegOutRoom = ReceivedNotifyRegOutRoom;
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
            for (var b = this.getShort(), c = [], d = 0; d < b; d++) c.push(Sam_CardGroup_1.SamCardDTO.fromCardId(this.getByte()));
            this.cards.push(c);
          }
          this.countDown = this.getByte();
        }
      }
      SamCmd.ReceivedEndGame = ReceivedEndGame;
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
          this.cards = [];
          for (var a = 0; a < this.cardSize; a++) {
            var b = this.getByte();
            this.cards.push(b);
          }
          this.playerSize = this.getShort();
          this.playerStatus = [];
          for (var a = 0; a < this.playerSize; a++) this.playerStatus.push(this.getByte());
        }
      }
      SamCmd.ReceivedFirstTurnDecision = ReceivedFirstTurnDecision;
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
      SamCmd.ReceivedChatChong = ReceivedChatChong;
      class ReceivedPingPong2 extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.id = 0;
          this.id = this.getLong();
        }
      }
      SamCmd.ReceivedPingPong2 = ReceivedPingPong2;
      class ReceivedUserLeaveRoom extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.chair = 0;
          this.nickName = "";
          this.chair = this.getByte();
          this.nickName = this.getString();
        }
      }
      SamCmd.ReceivedUserLeaveRoom = ReceivedUserLeaveRoom;
      class ReceiveUserJoinRoom extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.info = new Sam_InGame_1.SamSlotInfo();
          this.uChair = 0;
          this.uStatus = 0;
          this.info.nickName = this.getString();
          this.info.avatar = this.getString();
          this.info.money = this.getLong();
          this.uChair = this.getByte();
          this.uStatus = this.getByte();
        }
      }
      SamCmd.ReceiveUserJoinRoom = ReceiveUserJoinRoom;
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
      SamCmd.ReceivedUpdateMatch = ReceivedUpdateMatch;
      class ReceiveSamConfig extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.listSize = 0;
          this.list = [];
          this.listSize = this.getShort();
          this.list = [];
          for (var a = 0; a < this.listSize; a++) {
            var b = {
              maxUserPerRoom: this.getByte(),
              moneyType: this.getByte(),
              moneyBet: this.getLong(),
              moneyRequire: this.getLong(),
              nPersion: this.getInt()
            };
            this.list.push(b);
          }
        }
      }
      SamCmd.ReceiveSamConfig = ReceiveSamConfig;
      class ReceiveNotifyRegOutRoom extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.outChair = 0;
          this.isOutRoom = false;
          this.outChair = this.getByte();
          this.isOutRoom = this.getBool();
        }
      }
      SamCmd.ReceiveNotifyRegOutRoom = ReceiveNotifyRegOutRoom;
      class ReceivedKickOff extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.reason = 0;
          this.reason = this.getByte();
        }
      }
      SamCmd.ReceivedKickOff = ReceivedKickOff;
      class ReceivePingPong extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.test = 0;
          this.test = this.getLong();
        }
      }
      SamCmd.ReceivePingPong = ReceivePingPong;
      class ReceiveBaoSam extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.chair = 0;
          this.chair = this.getByte();
        }
      }
      SamCmd.ReceiveBaoSam = ReceiveBaoSam;
      class ReceiveHuyBaoSam extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.chair = 0;
          this.chair = this.getByte();
        }
      }
      SamCmd.ReceiveHuyBaoSam = ReceiveHuyBaoSam;
      class ReceivedQuyetDinhSam extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.chair = 0;
          this.isSam = false;
          this.chair = this.getByte();
          this.isSam = this.getBool();
        }
      }
      SamCmd.ReceivedQuyetDinhSam = ReceivedQuyetDinhSam;
      class ReceivedChatRoom extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.chair = this.getByte();
          this.isIcon = this.getBool();
          this.content = decodeURI(this.getString());
          this.nickname = this.getString();
        }
      }
      SamCmd.ReceivedChatRoom = ReceivedChatRoom;
      class ReceivedCardDefinations extends Network_InPacket_1.default {
        constructor(data) {
          super(data);
          this.strData = this.getString();
        }
      }
      SamCmd.ReceivedCardDefinations = ReceivedCardDefinations;
    })(SamCmd = exports.SamCmd || (exports.SamCmd = {}));
    exports.default = SamCmd;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/networks/Network.InPacket": void 0,
    "../../Main/Game/src/networks/Network.OutPacket": void 0,
    "./Sam.CardGroup": "Sam.CardGroup",
    "./Sam.InGame": "Sam.InGame"
  } ],
  "Sam.Constant": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5da32KQnDBClZ6olq3CkQa3", "Sam.Constant");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.SamConstant = void 0;
    var SamConstant;
    (function(SamConstant) {
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
      SamConstant.GameState = GameState;
      class Config {}
      Config.MAX_PLAYER = 5;
      Config.MAX_CARDS = 10;
      SamConstant.Config = Config;
      class SortType {}
      SortType.kSortTangDan = 0;
      SortType.kSortGroup = 1;
      SortType.kSortUnkown = 2;
      SamConstant.SortType = SortType;
      class PlayerType {}
      PlayerType.MY = 0;
      PlayerType.ENEMY = 1;
      PlayerType.STATENONE = 0;
      PlayerType.STATEVIEWING = 1;
      PlayerType.STATEBAOSAM = 2;
      SamConstant.PlayerType = PlayerType;
      class PlayerStatus {}
      PlayerStatus.NO_LOGIN = 0;
      PlayerStatus.VIEW = 1;
      PlayerStatus.SIT = 2;
      PlayerStatus.PLAY = 3;
      SamConstant.PlayerStatus = PlayerStatus;
      class KickReasonCodes {}
      KickReasonCodes.ERROR_MONEY = 1;
      KickReasonCodes.ERROR_BAO_TRI = 2;
      SamConstant.KickReasonCodes = KickReasonCodes;
    })(SamConstant = exports.SamConstant || (exports.SamConstant = {}));
    exports.default = SamConstant;
    cc._RF.pop();
  }, {} ],
  "Sam.InGame": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "41847MyakdFB7qsHvp++3gg", "Sam.InGame");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var SamInGame_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.SamSlotInfo = exports.SamRoomInfoDTO = void 0;
    const Sam_Player_1 = require("./Sam.Player");
    const SamNetworkClient_1 = require("../../Main/Game/src/networks/SamNetworkClient");
    const Sam_Cmd_1 = require("./Sam.Cmd");
    const App_1 = require("../../Main/Game/src/common/App");
    const Sam_Card_1 = require("./Sam.Card");
    const Sam_Constant_1 = require("./Sam.Constant");
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    const PopupCardDefinations_1 = require("../../Main/Game/src/games/cardgames/PopupCardDefinations");
    const CardGame_Cmd_1 = require("../../Main/Game/src/networks/CardGame.Cmd");
    const Sam_CardGroup_1 = require("./Sam.CardGroup");
    const Sam_PopupMatchResult_1 = require("./Sam.PopupMatchResult");
    const Sam_ItemPlayerResult_1 = require("./Sam.ItemPlayerResult");
    const PopupChatInGame_1 = require("../../Main/Game/src/games/cardgames/PopupChatInGame");
    const PopupSettingInGame_1 = require("../../Main/Game/src/games/cardgames/PopupSettingInGame");
    const Sam_PopupGuide_1 = require("./Sam.PopupGuide");
    const Common_AudioManager_1 = require("../../Main/Game/src/common/Common.AudioManager");
    const BroadcastReceiver_1 = require("../../Main/Game/src/common/BroadcastReceiver");
    const Sam_Listener_1 = require("./Sam.Listener");
    const {ccclass: ccclass, property: property} = cc._decorator;
    class SamRoomInfoDTO {
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
        let _roomInfoCustom = new SamRoomInfoDTO();
        _roomInfoCustom.roomId = _receivedJoinRoomSuccess.roomId;
        _roomInfoCustom.moneyBet = _receivedJoinRoomSuccess.moneyBet;
        _roomInfoCustom.matchId = _receivedJoinRoomSuccess.matchId;
        _roomInfoCustom.myChair = _receivedJoinRoomSuccess.myChair;
        _roomInfoCustom.slotInfos = _receivedJoinRoomSuccess.playerInfos;
        _roomInfoCustom.recentCards = [];
        _roomInfoCustom.currentTurnChair = _receivedJoinRoomSuccess.currentChair;
        _roomInfoCustom.currentTimeRemain = _receivedJoinRoomSuccess.countDownTime;
        _roomInfoCustom.newRound = false;
        return _roomInfoCustom;
      }
      static fromReceivedUpdateGameInfo(_receivedUpdateGameInfo) {
        let _roomInfoCustom = new SamRoomInfoDTO();
        _roomInfoCustom.roomId = _receivedUpdateGameInfo.roomId;
        _roomInfoCustom.moneyBet = _receivedUpdateGameInfo.moneyBet;
        _roomInfoCustom.matchId = _receivedUpdateGameInfo.matchId;
        _roomInfoCustom.myChair = _receivedUpdateGameInfo.myChair;
        _roomInfoCustom.slotInfos = _receivedUpdateGameInfo.playerInfos;
        _roomInfoCustom.slotInfos[_roomInfoCustom.myChair].cards = _receivedUpdateGameInfo.playerCards;
        _roomInfoCustom.recentCards = _receivedUpdateGameInfo.recentCards;
        _roomInfoCustom.currentTurnChair = _receivedUpdateGameInfo.currentChair;
        _roomInfoCustom.currentTimeRemain = _receivedUpdateGameInfo.activeTimeRemain;
        _roomInfoCustom.newRound = _receivedUpdateGameInfo.newRound;
        return _roomInfoCustom;
      }
    }
    exports.SamRoomInfoDTO = SamRoomInfoDTO;
    class SamSlotInfo {
      constructor() {
        this.baoSam = false;
        this.huyBaoSam = false;
        this.cards = [];
      }
    }
    exports.SamSlotInfo = SamSlotInfo;
    let SamInGame = SamInGame_1 = class SamInGame extends cc.Component {
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
        SamInGame_1.instance = this;
      }
      start() {
        var _a;
        null === (_a = Sam_Listener_1.default.getInstance()) || void 0 === _a ? void 0 : _a.releasePendingCommands();
        true;
        this.getCardDefinations();
        BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.SET_SOUND, cc.find("Canvas"));
        this.btnsInGame.children.forEach(btn => {
          this.buttons[btn.name] = btn;
        });
        Common_AudioManager_1.default.getInstance().playBackgroundMusicByGame(Configs_1.default.App.BUNDLE_NAME.SAM, this.backgroundMusic);
        this.enableCardTouch();
      }
      onDestroy() {
        clearInterval(this.countDown);
        Sam_PopupMatchResult_1.default.instance = null;
        SamInGame_1.instance = null;
      }
      updateRoomInfo(roomInfo) {
        this.lbRoomId.string = roomInfo.roomId + "";
        this.lbRoomBet.string = Utils_1.default.formatNumber(roomInfo.moneyBet);
        this.lbMatchId.string = roomInfo.matchId + "";
        this.cleanCardLine();
        this.cleanCardsOnBoard();
        this.cleanCardsOnHand();
        for (let index = 0; index < Sam_Constant_1.default.Config.MAX_PLAYER; index++) {
          this.players[index].setAction();
          this.players[index].resetPlayer();
        }
        this.myChair = roomInfo.myChair;
        this.setPlayersInfo(roomInfo);
      }
      receivedAutoStart(autoStartData) {
        this.btnsInGame.children.forEach(btn => btn.active = false);
        this.setTimeCountDown("V\xe1n \u0111\u1ea5u b\u1eaft \u0111\u1ea7u sau: ", autoStartData.autoStartTime);
        Sam_PopupMatchResult_1.default.instance && Sam_PopupMatchResult_1.default.instance.node.active && Sam_PopupMatchResult_1.default.instance.dismiss();
      }
      receivedUserJoinRoom(userJoinRoomData) {
        if (userJoinRoomData.uStatus === Sam_Constant_1.default.PlayerStatus.NO_LOGIN) return;
        this.playerUsernameByServerChair[userJoinRoomData.uChair] = userJoinRoomData.info.nickName;
        this.players[this.convertChair(userJoinRoomData.uChair)].setPlayerInfo(userJoinRoomData.info);
        this.players[this.convertChair(userJoinRoomData.uChair)].status = userJoinRoomData.uStatus;
      }
      receivedUserLeaveRoom(userLeaveRoom) {
        let localChair = this.convertChair(userLeaveRoom.chair);
        this.players[localChair].resetPlayer();
        if (0 == localChair) {
          clearInterval(this.countDown);
          cc.director.loadScene("Sam");
        }
      }
      setPlayersInfo(roomInfoDTO) {
        this.playerUsernameByServerChair = [];
        for (let i = 0; i < roomInfoDTO.slotInfos.length; i++) {
          let plInfo = roomInfoDTO.slotInfos[i];
          let localChair = this.convertChair(i);
          let pl = this.players[localChair];
          pl.status = plInfo.playerStatus;
          if (!pl.status || pl.status === Sam_Constant_1.default.PlayerStatus.NO_LOGIN) continue;
          this.playerUsernameByServerChair[i] = plInfo.nickName;
          pl.setPlayerInfo(plInfo);
          pl.status == Sam_Constant_1.default.PlayerStatus.PLAY && 0 != localChair && pl.setCardRemain(plInfo.cardSize);
        }
        if (roomInfoDTO.recentCards.length > 0) {
          let cardHalf = (roomInfoDTO.recentCards.length - 1) / 2;
          let ranX = Math.floor(100 * Math.random()) - 50;
          let ranY = Math.floor(100 * Math.random()) - 50;
          for (let i = 0; i < roomInfoDTO.recentCards.length; i++) {
            let cardItem = cc.instantiate(this.cardItem);
            cardItem.parent = this.board;
            cardItem.setScale(.6, .6);
            cardItem.setPosition(30 * (i - cardHalf) + ranX, ranY);
            cardItem.getComponent(Sam_Card_1.default).setCardData(roomInfoDTO.recentCards[i]);
          }
        }
        let mySlotInfo = roomInfoDTO.slotInfos[roomInfoDTO.myChair];
        if (0 === mySlotInfo.cards.length) return;
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
          this.players.filter(player => player.active).forEach(player => player.setAction());
        }
        this.cardLine.active = true;
        this.setCardsOnHand(this.sortCards(mySlotInfo.cards));
        this.setActiveButtons([ "bt_sort" ], [ true ]);
      }
      receivedFirstTurnDecision(firstTurnDecisionData) {
        this.cleanCardLine();
        firstTurnDecisionData.cards.forEach((card, i) => {
          let pl = this.players[this.convertChair(i)];
          pl.status = firstTurnDecisionData.playerStatus[i];
          pl.isPlaying() && pl.setFirstCard(card);
        });
        this.players.filter(player => player.isPlaying()).forEach((player, i) => {
          const playerPosition = 0 === i ? this.board.parent.convertToNodeSpaceAR(player.node.parent.convertToWorldSpaceAR(player.node.getPosition())) : player.node.getPosition();
          const cardItem = cc.instantiate(this.cardItem);
          cardItem.parent = this.node;
          cardItem.getComponent(Sam_Card_1.default).setCardFrame(52);
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
        this.setActiveButtons([ "bt_sort", "bt_sam", "bt_huy_sam" ], [ true, true, true ]);
        this.players.filter(player => player.isPlaying()).forEach(player => player.setTimeRemain(dealCardData.timeBaoSam));
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
          this.players.filter(player => player.active).forEach(player => player.setAction());
        }
      }
      receivedSubmitTurn(submitTurnData) {
        this.setActiveButtons([ "bt_submit_turn", "bt_pass_turn" ], [ false, false ]);
        let cards = this.sortCards(Sam_CardGroup_1.SamCardGroup.indexsToCards(submitTurnData.cards));
        let countHeo = 0;
        cards.forEach(card => {
          card.isHeo && countHeo++;
        });
        switch (countHeo) {
         case 1:
          this.setTextFirst("Heo!");
          break;

         case 2:
          this.setTextFirst("\u0110\xf4i Heo!");
          break;

         case 3:
          this.setTextFirst("Ba con Heo!");
          break;

         case 4:
          this.setTextFirst("T\u1ee9 qu\xfd Heo!");
        }
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
            const cardComponent = cardItem.getComponent(Sam_Card_1.default);
            cardComponent.setCardData(card);
          });
          pl.setCardRemain(submitTurnData.remainCardSize);
          this.currTurnCards = cards;
        }
        this.board.children.forEach((card, i) => {
          card.zIndex = this.board.zIndex + i;
        });
      }
      receivedPassTurn(passTurnData) {
        this.players[this.convertChair(passTurnData.chair)].setAction("B\u1ecf l\u01b0\u1ee3t");
        this.setActiveButtons([ "bt_submit_turn", "bt_pass_turn" ], [ false, false ]);
      }
      sortCards(cards) {
        return this.sortBySuit ? new Sam_CardGroup_1.SamCardGroup(cards).getOrderedBySuit() : Sam_CardGroup_1.SamCardGroup.sortCards(cards);
      }
      setCardsOnHand(cards) {
        cards.forEach(card => {
          let cardItem = cc.instantiate(this.cardItem);
          cardItem.parent = this.cardLine;
          const cardComponent = cardItem.getComponent(Sam_Card_1.default);
          cardComponent.setCardData(card, this.onCardSelectCallback.bind(this));
          this.cardsOnHand.set(card.id, cardItem);
        });
        this.sortCardsOnHand(cards);
      }
      onCardSelectCallback(selectedCard) {
        const suggestionCards = this.detectSuggestionCards(selectedCard);
        for (let i = 0; i < suggestionCards.length; i++) for (let j = 0; j < suggestionCards[i].length; j++) Sam_CardGroup_1.SamCardGroup.cardToIndex(selectedCard) == Sam_CardGroup_1.SamCardGroup.cardToIndex(suggestionCards[i][j]) && this.setToggleCardsOnHand(suggestionCards[i]);
      }
      detectSuggestionCards(selectedCard) {
        var cardsOnHand = this.getCardDTOsOnHand();
        if (this.isMyTurn) {
          if (1 === this.currTurnCards.length && this.currTurnCards[0].isHeo) {
            const selectedCards = [ ...this.cardsOnHand.values() ].map(cardItem => cardItem.getComponent(Sam_Card_1.default)).filter(cardComponent => cardComponent.isSelect()).map(cardComponent => cardComponent.getCardDTO());
            return new Sam_CardGroup_1.SamCardGroup(cardsOnHand).detectSuggestionBySelectedCards(selectedCards, selectedCard, true);
          }
          return new Sam_CardGroup_1.SamCardGroup(cardsOnHand).detectSuggestionByCurrentTurnCards(this.currTurnCards, selectedCard);
        }
        const selectedCards = [ ...this.cardsOnHand.values() ].map(cardItem => cardItem.getComponent(Sam_Card_1.default)).filter(cardComponent => cardComponent.isSelect()).map(cardComponent => cardComponent.getCardDTO());
        return new Sam_CardGroup_1.SamCardGroup(cardsOnHand).detectSuggestionBySelectedCards(selectedCards, selectedCard);
      }
      getCardDTOsOnHand() {
        var cards = [];
        this.cardsOnHand.forEach(value => {
          const cardComponent = value.getComponent(Sam_Card_1.default);
          cards.push(cardComponent.getCardDTO());
        });
        return cards;
      }
      setToggleCardsOnHand(cards = null) {
        this.cardsOnHand.forEach(value => {
          value.getComponent(Sam_Card_1.default).deSelect();
        });
        cards && cards.forEach(card => {
          this.cardsOnHand.get(card.id).getComponent(Sam_Card_1.default).select();
        });
      }
      cleanCardsOnHand() {
        this.cardsOnHand.clear();
      }
      cleanCardsOnBoard() {
        this.board.removeAllChildren();
      }
      cleanCardLine() {
        this.cardLine.removeAllChildren();
        this.players.forEach(player => player.clearCardLine());
      }
      cleanAllCard() {
        this.node.runAction(cc.sequence(cc.callFunc(() => {
          for (let i = 1; i < this.players.length; i++) {
            if (!this.players[i].active) continue;
            this.effectClean(this.players[i].cardLine.children);
          }
          this.effectClean(this.cardLine.children);
        }), cc.delayTime(2), cc.callFunc(() => {
          this.cleanCardsOnHand();
          this.cleanCardLine();
          this.cleanCardsOnBoard();
        })));
      }
      effectClean(cards) {
        for (let i = cards.length - 1; i >= 0; i--) {
          let _card = cards[i];
          let pos = _card.parent.convertToWorldSpaceAR(_card.position);
          pos = this.board.convertToNodeSpaceAR(pos);
          _card.parent = this.board;
          _card.setPosition(pos);
          let ranX = Math.floor(100 * Math.random()) - 50;
          let ranY = Math.floor(100 * Math.random()) - 50;
          _card.runAction(cc.sequence(cc.delayTime(.1 * i), cc.spawn(cc.moveTo(.2, cc.v2(ranX, ranY)), cc.scaleTo(.2, .6, .6))));
        }
      }
      sortCardsOnHand(cards) {
        cards.forEach((card, i) => {
          const cardItem = this.cardsOnHand.get(card.id);
          cardItem.zIndex = this.cardLine.zIndex + i;
          cardItem.setSiblingIndex(i);
        });
        this.moveAllCardOnHand();
      }
      setActiveButtons(btnNames, actives) {
        for (let i = 0; i < btnNames.length; i++) this.buttons[btnNames[i]] && (this.buttons[btnNames[i]].active = actives[i]);
      }
      actSubmitTurn() {
        let cardSelected = [];
        this.cardLine.children.forEach(card => {
          let _card = card.getComponent(Sam_Card_1.default);
          _card.isSelect() && cardSelected.push(_card.getCardDTO());
        });
        this.sendSubmitTurn(cardSelected);
        this.isMyTurn = false;
      }
      actPassTurn() {
        this.sendPassTurn();
        this.isMyTurn = false;
      }
      actSort() {
        this.cardLine.children.forEach(card => card.stopAllActions());
        this.sortBySuit = !this.sortBySuit;
        let cards = this.getCardDTOsOnHand();
        cards = this.sortCards(cards);
        this.setToggleCardsOnHand();
        this.sortCardsOnHand(cards);
      }
      sendSubmitTurn(cardSelected) {
        SamNetworkClient_1.default.getInstance().send(new Sam_Cmd_1.default.SendDanhBai(false, Sam_CardGroup_1.SamCardGroup.cardsToIndexs(cardSelected)));
      }
      sendPassTurn() {
        SamNetworkClient_1.default.getInstance().send(new Sam_Cmd_1.default.SendBoLuot(true));
      }
      actBaoSam() {
        SamNetworkClient_1.default.getInstance().send(new Sam_Cmd_1.default.SendBaoSam());
      }
      actHuyBaoSam() {
        SamNetworkClient_1.default.getInstance().send(new Sam_Cmd_1.default.SendHuyBaoSam());
      }
      receivedBaoSam(baoSamData) {
        let localChair = this.convertChair(baoSamData.chair);
        let player = this.players[localChair];
        player.setTimeRemain(0);
        player.setAction("B\xe1o S\xe2m");
        baoSamData.chair == this.myChair && this.setActiveButtons([ "bt_sam", "bt_huy_sam" ], [ false, false ]);
      }
      receivedHuyBaoSam(huyBaoSamData) {
        let localChair = this.convertChair(huyBaoSamData.chair);
        let player = this.players[localChair];
        player.setTimeRemain(0);
        player.setAction("H\u1ee7y S\xe2m");
        huyBaoSamData.chair == this.myChair && this.setActiveButtons([ "bt_sam", "bt_huy_sam" ], [ false, false ]);
      }
      onQuyetDinhSam(quyetDanhSamData) {
        this.setActiveButtons([ "bt_sam", "bt_huy_sam" ], [ false, false ]);
        if (quyetDanhSamData.isSam) {
          let localChair = this.convertChair(quyetDanhSamData.chair);
          let player = this.players[localChair];
          this.showToast(player.info.nickName + " \u0111\u01b0\u1ee3c quy\u1ec1n b\xe1o s\xe2m");
        }
      }
      receivedEndGame(endGameData) {
        this.disableCardTouch();
        this.players.forEach(player => player.setTimeRemain(0));
        const coinChanges = endGameData.ketQuaTinhTienList;
        for (let i = 0; i < coinChanges.length; i++) {
          const localChair = this.convertChair(i);
          this.players[localChair].setCoinChange(coinChanges[i]);
          this.players[localChair].setCoin(endGameData.currentMoney[i]);
          if (0 !== localChair) continue;
          Configs_1.default.Login.Coin = endGameData.currentMoney[i];
          this.fxMeWin.active = coinChanges[i] > 0;
          this.fxMeLose.active = coinChanges[i] < 0;
          coinChanges[i] > 0 && Common_AudioManager_1.default.getInstance().playEffectByGame(Configs_1.default.App.BUNDLE_NAME.SAM, this.winSound);
        }
        endGameData.cards.forEach((card, i) => {
          const localChair = this.convertChair(i);
          if (0 !== localChair && this.players[localChair].status === Sam_Constant_1.default.PlayerStatus.PLAY) {
            this.players[localChair].setCardLine(card);
            this.players[localChair].setCardRemain(0);
          }
        });
        this.setActiveButtons([ "bt_sort" ], [ false ]);
        this.scheduleOnce(() => {
          this.setTimeCountDown("V\xe1n \u0111\u1ea5u k\u1ebft th\xfac sau: ", 0 == endGameData.countDown ? 10 : endGameData.countDown - 6);
        }, 0 == endGameData.countDown ? 0 : 4);
        this.scheduleOnce(() => {
          this.cleanAllCard();
          this.players.forEach(player => player.setAction());
        }, 0 == endGameData.countDown ? 5 : 9);
        SamNetworkClient_1.default.getInstance().send(new Sam_Cmd_1.default.SendReadyAutoStart());
        this.scheduleOnce(() => {
          this.fxMeWin.active = false;
          this.fxMeLose.active = false;
          let matchResult = [];
          coinChanges.forEach((coinChange, i) => {
            if (0 !== coinChange) {
              let playerResult = new Sam_ItemPlayerResult_1.SamResult();
              playerResult.userName = this.playerUsernameByServerChair[i];
              playerResult.goldChange = coinChange;
              playerResult.cards = endGameData.cards[i];
              playerResult.winTypes = endGameData.winTypes[i];
              matchResult.push(playerResult);
            }
          });
          matchResult.sort((a, b) => a.cards.length - b.cards.length).forEach((result, i) => result.rank = i);
          Sam_PopupMatchResult_1.default.createAndShow(this.node, matchResult);
        }, 4);
      }
      receivedUpdateMatch(updateMatchData) {
        this.myChair = updateMatchData.myChair;
        for (let i = 0; i < updateMatchData.hasInfo.length; i++) {
          if (!updateMatchData.hasInfo[i]) continue;
          let localChair = this.convertChair(i);
          this.players[localChair].status = updateMatchData.infos[i].status;
          this.players[localChair].setCoin(updateMatchData.infos[i].money);
        }
      }
      receivedNotifyUserRegOutRoom(notifyUserRegOutRoomData) {
        let outChair = notifyUserRegOutRoomData.outChair;
        let isOutRoom = notifyUserRegOutRoomData.isOutRoom;
        let localChair = this.convertChair(outChair);
        -1 !== localChair && this.players[localChair].setNotify(isOutRoom ? "S\u1eafp r\u1eddi b\xe0n !" : "Kh\xf4 M\xe1u !");
      }
      receivedChatChong(chatChongData) {
        let winChair = chatChongData.winChair;
        let lostChair = chatChongData.lostChair;
        let winMoney = chatChongData.winMoney;
        let lostMoney = chatChongData.lostMoney;
        let winCurrentMoney = chatChongData.winCurrentMoney;
        let lostCurrentMoney = chatChongData.lostCurrentMoney;
        this.scheduleOnce(() => {
          let seatIdWin = this.convertChair(winChair);
          let seatIdLost = this.convertChair(lostChair);
          this.players[seatIdWin].setCoinChange(winMoney);
          this.players[seatIdLost].setCoinChange(lostMoney);
          this.players[seatIdWin].setCoin(winCurrentMoney);
          this.players[seatIdLost].setCoin(lostCurrentMoney);
          this.scheduleOnce(() => {
            this.players[seatIdWin].setAction("");
            this.players[seatIdLost].setAction("");
          }, 2);
        }, 1);
      }
      receivedChatRoom(chatRoomData) {
        const localChair = this.convertChair(chatRoomData.chair);
        const content = chatRoomData.content;
        chatRoomData.isIcon ? this.players[localChair].showChatEmotion(content) : this.players[localChair].showChatMsg(content);
      }
      setTextFirst(msg) {
        this.fxWhoPlayFirst.active = true;
        this.fxWhoPlayFirst.scale = 0;
        this.fxWhoPlayFirst.opacity = 0;
        this.fxWhoPlayFirst.stopAllActions();
        this.fxWhoPlayFirst.runAction(cc.sequence(cc.spawn(cc.scaleTo(.2, 1).easing(cc.easeBackOut()), cc.fadeIn(.2)), cc.delayTime(1.5), cc.callFunc(() => {
          this.fxWhoPlayFirst.active = false;
        })));
        this.fxWhoPlayFirst.children[0].getComponent(cc.Label).string = msg;
      }
      convertChair(a) {
        return (a - this.myChair + Sam_Constant_1.default.Config.MAX_PLAYER) % Sam_Constant_1.default.Config.MAX_PLAYER;
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
      onKickFromRoom(reason) {
        this.players[0].resetPlayer();
        cc.director.loadScene("Sam", () => {
          switch (reason) {
           case Sam_Constant_1.default.KickReasonCodes.ERROR_MONEY:
            App_1.default.instance.actiontDialog.showMsgWithAction("S\u1ed1 d\u01b0 kh\xf4ng \u0111\u1ee7.", "N\u1ea0P NGAY", () => {
              App_1.default.instance.openShop(0);
            });
            break;

           case Sam_Constant_1.default.KickReasonCodes.ERROR_BAO_TRI:
            App_1.default.instance.alertDialog.showMsg("H\u1ec7 th\u1ed1ng b\u1ea3o tr\xec!");
            break;

           default:
            App_1.default.instance.alertDialog.showMsg("B\u1ea1n b\u1ecb kick kh\u1ecfi b\xe0n ch\u01a1i!");
          }
        });
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
      findTouchedCard(touchBegin) {
        for (let i = this.cardLine.children.length - 1; i >= 0; i--) {
          let card = this.cardLine.children[i];
          if (card.getBoundingBoxToWorld().contains(touchBegin)) return i;
        }
      }
      moveAllCardOnHand() {
        this.cardLine.children.forEach((card, i) => {
          card.runAction(cc.moveTo(.2, this.getCardPosition(this.cardLine.children.length, i)));
        });
      }
      getCardPosition(numbOfCard, index) {
        let hand = this.cardLine.position.x - 45 * (numbOfCard - 1) / 2;
        let posx = hand + 45 * index;
        let result = cc.v2(posx, 0);
        return result;
      }
      swapCard(card, cardSwap) {
        this.node.runAction(cc.spawn(cc.callFunc(() => {
          let key = this.cardLine.children[cardSwap].getComponent(Sam_Card_1.default).getCardDTO().id;
          this.cardsOnHand.get(key).setSiblingIndex(card);
        }), cc.callFunc(() => {
          let key = this.cardLine.children[card].getComponent(Sam_Card_1.default).getCardDTO().id;
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
              moveCard.getComponent(Sam_Card_1.default).moveCard(.2, cc.v2(orgPos.x + 45, 0));
              moveCard.zIndex++;
              selectedCard.zIndex--;
              this.swapCard(touchId, touchId - 1);
              touchId--;
            }
            if (delta.x > 0 && null != this.cardLine.children[touchId + 1] && selectedCard.x >= this.cardLine.children[touchId + 1].x - 20) {
              let moveCard = this.cardLine.children[touchId + 1];
              let orgPos = this.getCardPosition(this.cardLine.children.length, touchId + 1);
              moveCard.getComponent(Sam_Card_1.default).moveCard(.2, cc.v2(orgPos.x - 45, 0));
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
            selectedCard.getComponent(Sam_Card_1.default).moveCard(.2, pos);
            isMove || selectedCard.getComponent(Sam_Card_1.default).onSelect();
            isMove = false;
          }
          selectedCard = null;
        };
        let onCancelDrag = event => {
          distance = 0;
          if (null != selectedCard) {
            let pos = this.getCardPosition(this.cardLine.children.length, touchId);
            selectedCard.getComponent(Sam_Card_1.default).moveCard(.2, pos);
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
        SamNetworkClient_1.default.getInstance().send(new Sam_Cmd_1.default.SendCardDefinations());
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
          SamNetworkClient_1.default.getInstance().send(new Sam_Cmd_1.default.SendChatRoom(chatType, content));
        }, (cheatType, cardCheatIds) => {
          SamNetworkClient_1.default.getInstance().send(new Sam_Cmd_1.default.SendCheatCards(cheatType, cardCheatIds));
        });
      }
      actSetting() {
        PopupSettingInGame_1.default.createAndShow(this.node, Configs_1.default.App.BUNDLE_NAME.SAM, () => {
          Sam_PopupGuide_1.default.createAndShow(this.node);
        }, () => {
          SamNetworkClient_1.default.getInstance().send(new Sam_Cmd_1.default.SendRequestLeaveGame());
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
    __decorate([ property(cc.Label) ], SamInGame.prototype, "lbRoomId", void 0);
    __decorate([ property(cc.Label) ], SamInGame.prototype, "lbRoomBet", void 0);
    __decorate([ property(cc.Label) ], SamInGame.prototype, "lbMatchId", void 0);
    __decorate([ property(Sam_Player_1.default) ], SamInGame.prototype, "players", void 0);
    __decorate([ property(cc.Label) ], SamInGame.prototype, "lbTimeCountDown", void 0);
    __decorate([ property(cc.Node) ], SamInGame.prototype, "cardLine", void 0);
    __decorate([ property(cc.Node) ], SamInGame.prototype, "board", void 0);
    __decorate([ property(cc.Node) ], SamInGame.prototype, "btnsInGame", void 0);
    __decorate([ property(cc.Label) ], SamInGame.prototype, "lblToast", void 0);
    __decorate([ property(cc.Node) ], SamInGame.prototype, "fxMeWin", void 0);
    __decorate([ property(cc.Node) ], SamInGame.prototype, "fxMeLose", void 0);
    __decorate([ property(cc.Node) ], SamInGame.prototype, "fxWhoPlayFirst", void 0);
    __decorate([ property(cc.Button) ], SamInGame.prototype, "btnShowCardDefinations", void 0);
    __decorate([ property(cc.AudioClip) ], SamInGame.prototype, "backgroundMusic", void 0);
    __decorate([ property(cc.AudioClip) ], SamInGame.prototype, "winSound", void 0);
    __decorate([ property([ cc.SpriteFrame ]) ], SamInGame.prototype, "cardFrames", void 0);
    __decorate([ property(cc.SpriteFrame) ], SamInGame.prototype, "cardBackFrame", void 0);
    __decorate([ property(cc.Prefab) ], SamInGame.prototype, "cardItem", void 0);
    SamInGame = SamInGame_1 = __decorate([ ccclass ], SamInGame);
    exports.default = SamInGame;
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
    "../../Main/Game/src/networks/SamNetworkClient": void 0,
    "./Sam.Card": "Sam.Card",
    "./Sam.CardGroup": "Sam.CardGroup",
    "./Sam.Cmd": "Sam.Cmd",
    "./Sam.Constant": "Sam.Constant",
    "./Sam.ItemPlayerResult": "Sam.ItemPlayerResult",
    "./Sam.Listener": "Sam.Listener",
    "./Sam.Player": "Sam.Player",
    "./Sam.PopupGuide": "Sam.PopupGuide",
    "./Sam.PopupMatchResult": "Sam.PopupMatchResult"
  } ],
  "Sam.ItemPlayerResult": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c619d4kEJFFio7veihjevMx", "Sam.ItemPlayerResult");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.SamResult = void 0;
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const Sam_InGame_1 = require("./Sam.InGame");
    class SamResult {}
    exports.SamResult = SamResult;
    const {ccclass: ccclass, property: property} = cc._decorator;
    let SamItemPlayerResult = class SamItemPlayerResult extends cc.Component {
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
        if (null !== playerResult.cards && void 0 !== playerResult.cards) for (let index = 0; index < playerResult.cards.length; index++) {
          let item = cc.instantiate(this.prefabCard);
          item.getComponent(cc.Sprite).spriteFrame = Sam_InGame_1.default.getInstance().getCardFrame(playerResult.cards[index].id);
          this.listCards.addChild(item);
        }
        this.resultWin.active = playerResult.winTypes < 11;
        this.resultLose.active = !this.resultWin.active;
        this.fxResult.active = false;
        switch (playerResult.winTypes) {
         case 2:
         case 5:
         case 10:
          break;

         case 3:
         case 4:
         case 6:
         case 7:
         case 8:
         case 9:
          this.fxResult.active = true;
          this.fxResult.getComponent(cc.Sprite).setMaterial(0, this.matSprite[0]);
          this.labelFx.node.color = cc.Color.RED;
          3 == playerResult.winTypes ? this.labelFx.string = "Th\u1eafng S\xe2m" : 4 == playerResult.winTypes ? this.labelFx.string = "Ch\u1eb7n S\xe2m" : this.labelFx.string = "T\u1edbi Tr\u1eafng";
          break;

         case 11:
         case 12:
          break;

         case 13:
          if (null !== playerResult.cards && void 0 !== playerResult.cards && this.kiemtraThoiTuQuy(playerResult.cards)) {
            this.fxResult.active = true;
            this.fxResult.getComponent(cc.Sprite).setMaterial(0, this.matSprite[1]);
            this.labelFx.node.color = cc.Color.GRAY;
            this.labelFx.string = "Th\u1ed1i T\u1ee9 Qu\xfd";
          }
          if (null !== playerResult.cards && void 0 !== playerResult.cards && this.kiemtraThoiHeo(playerResult.cards)) {
            this.fxResult.active = true;
            this.fxResult.getComponent(cc.Sprite).setMaterial(0, this.matSprite[1]);
            this.labelFx.node.color = cc.Color.GRAY;
            this.labelFx.string = "Th\u1ed1i 2";
          }
          break;

         case 14:
          this.fxResult.active = true;
          this.fxResult.getComponent(cc.Sprite).setMaterial(0, this.matSprite[1]);
          this.labelFx.node.color = cc.Color.GRAY;
          this.labelFx.string = "C\xf3ng";
          break;

         case 15:
          break;

         case 16:
          this.fxResult.active = true;
          this.fxResult.getComponent(cc.Sprite).setMaterial(0, this.matSprite[1]);
          this.labelFx.node.color = cc.Color.GRAY;
          this.labelFx.string = "B\u1ecb Ch\u1eb7n S\xe2m";
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
    __decorate([ property(cc.Sprite) ], SamItemPlayerResult.prototype, "spRank", void 0);
    __decorate([ property(cc.Label) ], SamItemPlayerResult.prototype, "lbRank", void 0);
    __decorate([ property(cc.Label) ], SamItemPlayerResult.prototype, "labelUserName", void 0);
    __decorate([ property(cc.Label) ], SamItemPlayerResult.prototype, "labelMoneyChange", void 0);
    __decorate([ property(cc.Node) ], SamItemPlayerResult.prototype, "listCards", void 0);
    __decorate([ property(cc.Node) ], SamItemPlayerResult.prototype, "resultWin", void 0);
    __decorate([ property(cc.Node) ], SamItemPlayerResult.prototype, "resultLose", void 0);
    __decorate([ property(cc.Node) ], SamItemPlayerResult.prototype, "fxResult", void 0);
    __decorate([ property(cc.Material) ], SamItemPlayerResult.prototype, "matSprite", void 0);
    __decorate([ property(cc.Label) ], SamItemPlayerResult.prototype, "labelFx", void 0);
    __decorate([ property(cc.Prefab) ], SamItemPlayerResult.prototype, "prefabCard", void 0);
    __decorate([ property([ cc.SpriteFrame ]) ], SamItemPlayerResult.prototype, "rankFrames", void 0);
    SamItemPlayerResult = __decorate([ ccclass ], SamItemPlayerResult);
    exports.default = SamItemPlayerResult;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/Utils": void 0,
    "./Sam.InGame": "Sam.InGame"
  } ],
  "Sam.Listener": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d5306v0VzFMmbpFxuEXMm9i", "Sam.Listener");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var SamListener_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const App_1 = require("../../Main/Game/src/common/App");
    const BroadcastReceiver_1 = require("../../Main/Game/src/common/BroadcastReceiver");
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    const Network_InPacket_1 = require("../../Main/Game/src/networks/Network.InPacket");
    const SamNetworkClient_1 = require("../../Main/Game/src/networks/SamNetworkClient");
    const Sam_Cmd_1 = require("./Sam.Cmd");
    const Sam_InGame_1 = require("./Sam.InGame");
    const Sam_Room_1 = require("./Sam.Room");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let SamListener = SamListener_1 = class SamListener extends cc.Component {
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
        SamListener_1.instance = this;
        cc.game.addPersistRootNode(this.node);
      }
      start() {
        BroadcastReceiver_1.default.register(BroadcastReceiver_1.default.USER_UPDATE_COIN, () => {
          var _a;
          null === (_a = Sam_Room_1.default.getInstance()) || void 0 === _a ? void 0 : _a.updateCoinPlayer();
        }, this);
        BroadcastReceiver_1.default.register(BroadcastReceiver_1.default.USER_INFO_UPDATED, () => {
          var _a, _b;
          null === (_a = Sam_Room_1.default.getInstance()) || void 0 === _a ? void 0 : _a.updateInfoPlayer();
          null === (_b = Sam_Room_1.default.getInstance()) || void 0 === _b ? void 0 : _b.updateCoinPlayer();
        }, this);
        BroadcastReceiver_1.default.register(BroadcastReceiver_1.default.USER_DISCONNECTED, data => {
          SamNetworkClient_1.default.getInstance().close();
        }, this);
        SamNetworkClient_1.default.getInstance().addOnClose(() => {
          var _a;
          if ((null === (_a = Sam_Room_1.default.getInstance()) || void 0 === _a ? void 0 : _a.isClickBack) || !Configs_1.default.Login.IsLogin) this.backToLobby(); else if ("Sam.InGame" === cc.director.getScene().name && Sam_InGame_1.default.getInstance() && Sam_InGame_1.default.getInstance().isMePlaying() && SamNetworkClient_1.default.getInstance().shouldAutoReconnect()) {
            SamNetworkClient_1.default.getInstance().setLoginCallback(() => {
              App_1.default.instance.showLoading(false);
              SamNetworkClient_1.default.getInstance().send(new Sam_Cmd_1.default.SendJoinRoom(Configs_1.default.App.MONEY_TYPE, this.currentRoomInfo.maxUserPerRoom, this.currentRoomInfo.moneyBet, 0));
            });
            App_1.default.instance.showErrLoading("M\u1ea5t k\u1ebft n\u1ed1i, \u0111ang th\u1eed k\u1ebft n\u1ed1i l\u1ea1i...");
          } else {
            App_1.default.instance.showLoading(false);
            SamNetworkClient_1.default.getInstance().setForceClose(true);
            App_1.default.instance.alertDialog.showMsgWithOnDismissed("B\u1ea1n \u0111\xe3 m\u1ea5t k\u1ebft n\u1ed1i v\u1edbi server", () => {
              this.backToLobby();
            });
          }
        }, this);
        SamNetworkClient_1.default.getInstance().addListener(data => {
          var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
          App_1.default.instance.showLoading(false);
          let inpacket = new Network_InPacket_1.default(data);
          let cmdId = inpacket.getCmdId();
          switch (cmdId) {
           case Sam_Cmd_1.default.Code.LOGIN:
            SamNetworkClient_1.default.getInstance().send(new Sam_Cmd_1.default.SendReconnectRoom());
            break;

           case Sam_Cmd_1.default.Code.MONEY_BET_CONFIG:
            {
              let res = new Sam_Cmd_1.default.ReceivedMoneyBetConfig(data);
              cc.log(res);
              null === (_a = Sam_Room_1.default.getInstance()) || void 0 === _a ? void 0 : _a.receivedMoneyBetConfig(res);
              break;
            }

           case Sam_Cmd_1.default.Code.JOIN_ROOM_FAIL:
            {
              let res = new Sam_Cmd_1.default.ReceivedJoinRoomFail(data);
              cc.log(res);
              App_1.default.instance.showLoading(false, 15, Sam_Cmd_1.default.Code.JOIN_ROOM);
              null === (_b = Sam_Room_1.default.getInstance()) || void 0 === _b ? void 0 : _b.receivedJoinRoomFail(res);
              break;
            }

           case Sam_Cmd_1.default.Code.JOIN_ROOM_SUCCESS:
            {
              let res = new Sam_Cmd_1.default.ReceivedJoinRoomSuccess(data);
              cc.log(res);
              App_1.default.instance.showLoading(false, 15, Sam_Cmd_1.default.Code.JOIN_ROOM);
              null === (_c = Sam_Room_1.default.getInstance()) || void 0 === _c ? void 0 : _c.receivedJoinRoomSuccess(res);
              break;
            }

           case Sam_Cmd_1.default.Code.UPDATE_GAME_INFO:
            {
              let res = new Sam_Cmd_1.default.ReceivedUpdateGameInfo(data);
              cc.log(res);
              App_1.default.instance.showLoading(false, 15, Sam_Cmd_1.default.Code.JOIN_ROOM);
              null === (_d = Sam_Room_1.default.getInstance()) || void 0 === _d ? void 0 : _d.receivedUpdateGameInfo(res);
              break;
            }

           case Sam_Cmd_1.default.Code.AUTO_START:
            {
              let res = new Sam_Cmd_1.default.ReceivedAutoStart(data);
              cc.log(res);
              Sam_InGame_1.default.getInstance() ? Sam_InGame_1.default.getInstance().receivedAutoStart(res) : this.pendingCommands.set(Sam_Cmd_1.default.Code.AUTO_START, res);
            }
            break;

           case Sam_Cmd_1.default.Code.USER_JOIN_ROOM:
            {
              let res = new Sam_Cmd_1.default.ReceiveUserJoinRoom(data);
              cc.log(res);
              Sam_InGame_1.default.getInstance() ? Sam_InGame_1.default.getInstance().receivedUserJoinRoom(res) : this.pendingCommands.set(Sam_Cmd_1.default.Code.USER_JOIN_ROOM, res);
            }
            break;

           case Sam_Cmd_1.default.Code.FIRST_TURN:
            {
              let res = new Sam_Cmd_1.default.ReceivedFirstTurnDecision(data);
              cc.log(res);
              Sam_InGame_1.default.getInstance() ? Sam_InGame_1.default.getInstance().receivedFirstTurnDecision(res) : this.pendingCommands.set(Sam_Cmd_1.default.Code.FIRST_TURN, res);
            }
            break;

           case Sam_Cmd_1.default.Code.CHIA_BAI:
            {
              let res = new Sam_Cmd_1.default.ReceivedChiaBai(data);
              cc.log(res);
              Sam_InGame_1.default.getInstance() ? null === (_e = Sam_InGame_1.default.getInstance()) || void 0 === _e ? void 0 : _e.receivedDealCard(res) : this.pendingCommands.set(Sam_Cmd_1.default.Code.CHIA_BAI, res);
            }
            break;

           case Sam_Cmd_1.default.Code.CHANGE_TURN:
            {
              let res = new Sam_Cmd_1.default.ReceivedChangeTurn(data);
              cc.log(res);
              null === (_f = Sam_InGame_1.default.getInstance()) || void 0 === _f ? void 0 : _f.receivedChangeTurn(res);
            }
            break;

           case Sam_Cmd_1.default.Code.DANH_BAI:
            {
              let res = new Sam_Cmd_1.default.ReceivedDanhBai(data);
              cc.log(res);
              null === (_g = Sam_InGame_1.default.getInstance()) || void 0 === _g ? void 0 : _g.receivedSubmitTurn(res);
            }
            break;

           case Sam_Cmd_1.default.Code.BO_LUOT:
            {
              let res = new Sam_Cmd_1.default.ReceivedBoluot(data);
              cc.log(res);
              null === (_h = Sam_InGame_1.default.getInstance()) || void 0 === _h ? void 0 : _h.receivedPassTurn(res);
            }
            break;

           case Sam_Cmd_1.default.Code.END_GAME:
            {
              let res = new Sam_Cmd_1.default.ReceivedEndGame(data);
              cc.log(res);
              null === (_j = Sam_InGame_1.default.getInstance()) || void 0 === _j ? void 0 : _j.receivedEndGame(res);
            }
            break;

           case Sam_Cmd_1.default.Code.UPDATE_MATCH:
            {
              let res = new Sam_Cmd_1.default.ReceivedUpdateMatch(data);
              cc.log(res);
              null === (_k = Sam_InGame_1.default.getInstance()) || void 0 === _k ? void 0 : _k.receivedUpdateMatch(res);
            }
            break;

           case Sam_Cmd_1.default.Code.USER_LEAVE_ROOM:
            {
              let res = new Sam_Cmd_1.default.ReceivedUserLeaveRoom(data);
              cc.log(res);
              null === (_l = Sam_InGame_1.default.getInstance()) || void 0 === _l ? void 0 : _l.receivedUserLeaveRoom(res);
            }
            break;

           case Sam_Cmd_1.default.Code.RECONNECT_GAME_ROOM:
            break;

           case Sam_Cmd_1.default.Code.BAO_SAM:
            {
              let res = new Sam_Cmd_1.default.ReceiveBaoSam(data);
              cc.log(res);
              null === (_m = Sam_InGame_1.default.getInstance()) || void 0 === _m ? void 0 : _m.receivedBaoSam(res);
            }
            break;

           case Sam_Cmd_1.default.Code.HUY_BAO_SAM:
            {
              let res = new Sam_Cmd_1.default.ReceiveHuyBaoSam(data);
              cc.log(res);
              null === (_o = Sam_InGame_1.default.getInstance()) || void 0 === _o ? void 0 : _o.receivedHuyBaoSam(res);
            }
            break;

           case Sam_Cmd_1.default.Code.QUYET_DINH_SAM:
            {
              let res = new Sam_Cmd_1.default.ReceivedQuyetDinhSam(data);
              cc.log(res);
              null === (_p = Sam_InGame_1.default.getInstance()) || void 0 === _p ? void 0 : _p.onQuyetDinhSam(res);
            }
            break;

           case Sam_Cmd_1.default.Code.CHAT_ROOM:
            {
              let res = new Sam_Cmd_1.default.ReceivedChatRoom(data);
              cc.log(res);
              null === (_q = Sam_InGame_1.default.getInstance()) || void 0 === _q ? void 0 : _q.receivedChatRoom(res);
            }
            break;

           case Sam_Cmd_1.default.Code.CHAT_CHONG:
            {
              let res = new Sam_Cmd_1.default.ReceivedChatChong(data);
              cc.log(res);
              null === (_r = Sam_InGame_1.default.getInstance()) || void 0 === _r ? void 0 : _r.receivedChatChong(res);
            }
            break;

           case Sam_Cmd_1.default.Code.NOTIFY_KICK_OFF:
            {
              let res = new Sam_Cmd_1.default.ReceivedKickOff(data);
              cc.log(res);
              null === (_s = Sam_InGame_1.default.getInstance()) || void 0 === _s ? void 0 : _s.onKickFromRoom(res.reason);
            }
            break;

           case Sam_Cmd_1.default.Code.REQUEST_LEAVE_ROOM:
            {
              let res = new Sam_Cmd_1.default.ReceivedNotifyRegOutRoom(data);
              cc.log(res);
              null === (_t = Sam_InGame_1.default.getInstance()) || void 0 === _t ? void 0 : _t.receivedNotifyUserRegOutRoom(res);
            }
            break;

           case Sam_Cmd_1.default.Code.CARDS_DEFINE:
            {
              let res = new Sam_Cmd_1.default.ReceivedCardDefinations(data);
              cc.log(res);
              null === (_u = Sam_InGame_1.default.getInstance()) || void 0 === _u ? void 0 : _u.receivedCardDefinations(res);
            }
          }
        }, this);
      }
      backToLobby() {
        App_1.default.instance.loadScene("Lobby", () => {
          cc.game.removePersistRootNode(this.node);
          SamListener_1.destroyInstance();
          Sam_InGame_1.default.destroyInstance();
          Sam_Room_1.default.destroyInstance();
        });
      }
      setCurrentRoomInfo(room) {
        this.currentRoomInfo = room;
      }
      releasePendingCommands() {
        var _a, _b, _c, _d;
        for (const [key, value] of this.pendingCommands.entries()) switch (key) {
         case Sam_Cmd_1.default.Code.AUTO_START:
          null === (_a = Sam_InGame_1.default.getInstance()) || void 0 === _a ? void 0 : _a.receivedAutoStart(value);
          break;

         case Sam_Cmd_1.default.Code.USER_JOIN_ROOM:
          null === (_b = Sam_InGame_1.default.getInstance()) || void 0 === _b ? void 0 : _b.receivedUserJoinRoom(value);
          break;

         case Sam_Cmd_1.default.Code.FIRST_TURN:
          null === (_c = Sam_InGame_1.default.getInstance()) || void 0 === _c ? void 0 : _c.receivedFirstTurnDecision(value);
          break;

         case Sam_Cmd_1.default.Code.CHIA_BAI:
          null === (_d = Sam_InGame_1.default.getInstance()) || void 0 === _d ? void 0 : _d.receivedDealCard(value);
        }
        this.pendingCommands.clear();
      }
      clearPendingCommands() {
        this.pendingCommands.clear();
      }
    };
    SamListener.instance = null;
    SamListener = SamListener_1 = __decorate([ ccclass ], SamListener);
    exports.default = SamListener;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/App": void 0,
    "../../Main/Game/src/common/BroadcastReceiver": void 0,
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/networks/Network.InPacket": void 0,
    "../../Main/Game/src/networks/SamNetworkClient": void 0,
    "./Sam.Cmd": "Sam.Cmd",
    "./Sam.InGame": "Sam.InGame",
    "./Sam.Room": "Sam.Room"
  } ],
  "Sam.Player": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "46f022AtZRFgKu5pOoSxK3G", "Sam.Player");
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
    const Sam_Card_1 = require("./Sam.Card");
    const Sam_Constant_1 = require("./Sam.Constant");
    const Sam_InGame_1 = require("./Sam.InGame");
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    const TURN_DURATION = 20;
    const {ccclass: ccclass, property: property} = cc._decorator;
    let SamPlayer = class SamPlayer extends cc.Component {
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
        this.cardLine = null;
        this.active = false;
        this.status = 0;
        this.info = null;
        this.timeTurn = 0;
      }
      setPlayerInfo(info) {
        this.lblNickname.string = info.nickName;
        this.setCoin(info.money);
        this.avatar.spriteFrame = App_1.default.instance.getAvatarSpriteFrame(info.avatar);
        this.node.active = true;
        this.active = true;
        this.info = info;
      }
      setFirstCard(index) {
        this.card.spriteFrame = Sam_InGame_1.default.getInstance().getCardFrame(index);
        this.card.node.active = true;
        this.lblCardRemain.node.active = false;
      }
      offFirstCard() {
        this.card.node.active = false;
        this.card.spriteFrame = Sam_InGame_1.default.getInstance().getCardBackFrame();
      }
      setCardRemain(cardSize) {
        if (0 == cardSize) {
          this.card.node.active = false;
          return;
        }
        this.card.node.active = true;
        null === this.card.spriteFrame && (this.card.spriteFrame = Sam_InGame_1.default.getInstance().getCardBackFrame());
        this.lblCardRemain.node.active = true;
        this.lblCardRemain.string = cardSize.toString();
        1 == cardSize && this.setAction("B\xe1o");
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
      setCoinChange(change) {
        if (0 === change) return;
        this.lbAction.string = (change > 0 ? "+" : "") + Utils_1.default.formatNumber(change);
      }
      resetPlayer() {
        this.node.active = false;
        this.active = false;
        this.status = Sam_Constant_1.default.PlayerStatus.NO_LOGIN;
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
          var item = cc.instantiate(Sam_InGame_1.default.getInstance().getCardItem());
          item.parent = this.cardLine;
          item.removeComponent(cc.Button);
          item.getComponent(Sam_Card_1.default).setCardData(card);
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
        return this.active && this.status == Sam_Constant_1.default.PlayerStatus.PLAY;
      }
      isMe() {
        return this.lblNickname.string === Configs_1.default.Login.Nickname;
      }
    };
    __decorate([ property(cc.Node) ], SamPlayer.prototype, "chatEmotion", void 0);
    __decorate([ property(cc.Node) ], SamPlayer.prototype, "chatMsg", void 0);
    __decorate([ property(cc.Label) ], SamPlayer.prototype, "lblNickname", void 0);
    __decorate([ property(cc.Label) ], SamPlayer.prototype, "lblCoin", void 0);
    __decorate([ property(cc.Sprite) ], SamPlayer.prototype, "avatar", void 0);
    __decorate([ property(cc.Sprite) ], SamPlayer.prototype, "card", void 0);
    __decorate([ property(cc.Label) ], SamPlayer.prototype, "lblCardRemain", void 0);
    __decorate([ property(cc.Sprite) ], SamPlayer.prototype, "timeRemain", void 0);
    __decorate([ property(cc.Label) ], SamPlayer.prototype, "lbAction", void 0);
    __decorate([ property(cc.Node) ], SamPlayer.prototype, "cardLine", void 0);
    SamPlayer = __decorate([ ccclass ], SamPlayer);
    exports.default = SamPlayer;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/App": void 0,
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/common/Utils": void 0,
    "./Sam.Card": "Sam.Card",
    "./Sam.Constant": "Sam.Constant",
    "./Sam.InGame": "Sam.InGame"
  } ],
  "Sam.PopupGuide": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cdf8aCse0NIZYhEmihn/b9r", "Sam.PopupGuide");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var SamPopupGuide_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const App_1 = require("../../Main/Game/src/common/App");
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    const Dialog_1 = require("../../Main/Game/src/common/Dialog");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let SamPopupGuide = SamPopupGuide_1 = class SamPopupGuide extends Dialog_1.default {
      constructor() {
        super(...arguments);
        this.scrollPopupGuide = null;
      }
      static createAndShow(parent) {
        null == this.instance || null == this.instance.node ? App_1.default.instance.loadPrefabInBundle(Configs_1.default.App.BUNDLE_NAME.SAM, Configs_1.default.App.UPDATE_INFO[Configs_1.default.App.BUNDLE_NAME.SAM], true, "res/prefabs/SamPopupGuide", (err, prefab) => {
          if (null != err) {
            App_1.default.instance.alertDialog.showMsg(err);
            return;
          }
          let go = cc.instantiate(prefab);
          go.parent = parent;
          this.instance = go.getComponent(SamPopupGuide_1);
          this.instance.show();
        }) : this.instance.show();
      }
      show() {
        let lbGuides = this.scrollPopupGuide.content.getComponentsInChildren(cc.Label);
        lbGuides[0].string = "LU\u1eacT CH\u01a0I:";
        lbGuides[1].string = "\u2022 T\u01b0\u01a1ng t\u1ef1 nh\u01b0 Ti\u1ebfn l\xean \u0111\u1ebfm l\xe1 nh\u01b0ng T\u1ee9 qu\xfd ch\u1ec9 c\xf3 th\u1ec3 ch\u1eb7t 1 qu\xe2n 2, kh\xf4ng \u0111\u01b0\u1ee3c v\u1ec1 b\u1eb1ng qu\xe2n 2.\n\u2022 Khi ng\u01b0\u1eddi ch\u01a1i c\xf2n 1 l\xe1 b\xe0i tr\xean tay s\u1ebd \u201cB\xe1o 1\u201d, nh\u1eefng ng\u01b0\u1eddi c\xf2n l\u1ea1i kh\xf4ng ra l\xe1 b\xe0i l\u1edbn nh\u1ea5t m\xecnh c\xf3 \u0111\u1ec3 ch\u1eb7n ng\u01b0\u1eddi \u201cB\xe1o 1\u201d v\u1ec1, s\u1ebd b\u1ecb ph\u1ea1t, \u0111\u1ec1n ti\u1ec1n cho nh\u1eefng ng\u01b0\u1eddi ch\u01a1i kh\xe1c.\n\n";
        lbGuides[2].string = "T\xcdNH TI\u1ec0N:";
        lbGuides[3].string = "\u2022 M\u1ed7i l\xe1 b\xe0i \u0111\u01b0\u1ee3c t\xednh b\u1eb1ng 1 l\u1ea7n ti\u1ec1n c\u01b0\u1ee3c.\n\u2022 \u0102n Tr\u1eafng: \u0102n m\u1ed7i ng\u01b0\u1eddi ch\u01a1i c\xf2n l\u1ea1i 30 l\u1ea7n ti\u1ec1n c\u01b0\u1ee3c.\n\u2022 Th\u1eafng b\xecnh th\u01b0\u1eddng: S\u1ed1 l\xe1 c\xf2n l\u1ea1i X M\u1ee9c c\u01b0\u1ee3c (T\xednh 2 v\xe0 T\u1ee9 Qu\xfd n\u1ebfu c\xf3).\n\u2022 C\xf3ng: Ph\u1ea1t 20 l\u1ea7n ti\u1ec1n c\u01b0\u1ee3c (T\xednh 2 v\xe0 T\u1ee9 Qu\xfd n\u1ebfu c\xf3).\n\u2022 B\xe1o S\xe2m: \u0102n m\u1ed7i ng\u01b0\u1eddi ch\u01a1i 30 l\u1ea7n ti\u1ec1n c\u01b0\u1ee3c (Kh\xf4ng ph\u1ea1t th\xeam 2 v\xe0 h\xe0ng).\n\u2022 B\xe1o S\xe2m th\u1ea5t b\u1ea1i: Ph\u1ea1t 30 l\u1ea7n ti\u1ec1n c\u01b0\u1ee3c x s\u1ed1 ng\u01b0\u1eddi ch\u01a1i.\n\u2022 T\u1ee9 Qu\xfd ch\u1eb7t 2 : Thua 20 l\u1ea7n ti\u1ec1n c\u01b0\u1ee3c.\n\u2022 T\u1ee9 Qu\xfd ch\u1eb7t T\u1ee9 qu\xfd : Thua 20 l\u1ea7n ti\u1ec1n c\u01b0\u1ee3c cho 1 b\u1ed9.\n\u2022 T\u1ee9 Qu\xfd ch\u1eb7t ch\u1ed3ng : Thua 20 l\u1ea7n ti\u1ec1n c\u01b0\u1ee3c cho m\u1ed7i l\u01b0\u1ee3t.\n\u2022 Th\u1ed1i Heo: Thua 10 l\u1ea7n ti\u1ec1n c\u01b0\u1ee3c cho 1 con.\n\u2022 Th\u1ed1i T\u1ee9 qu\xfd: Thua 20 l\u1ea7n ti\u1ec1n.";
        super.show();
        this.scrollPopupGuide.scrollToTop(0);
      }
    };
    SamPopupGuide.instance = null;
    __decorate([ property(cc.ScrollView) ], SamPopupGuide.prototype, "scrollPopupGuide", void 0);
    SamPopupGuide = SamPopupGuide_1 = __decorate([ ccclass ], SamPopupGuide);
    exports.default = SamPopupGuide;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/App": void 0,
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/common/Dialog": void 0
  } ],
  "Sam.PopupMatchResult": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "278d2KGvuhOf7KKsiTq13BJ", "Sam.PopupMatchResult");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var SamPopupMatchResult_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const App_1 = require("../../Main/Game/src/common/App");
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    const Dialog_1 = require("../../Main/Game/src/common/Dialog");
    const Sam_ItemPlayerResult_1 = require("./Sam.ItemPlayerResult");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let SamPopupMatchResult = SamPopupMatchResult_1 = class SamPopupMatchResult extends Dialog_1.default {
      constructor() {
        super(...arguments);
        this.scrollPopupResult = null;
        this.prefabPlayerResult = null;
      }
      static createAndShow(parent, matchResult) {
        null == this.instance || null == this.instance.node ? App_1.default.instance.loadPrefabInBundle(Configs_1.default.App.BUNDLE_NAME.SAM, Configs_1.default.App.UPDATE_INFO[Configs_1.default.App.BUNDLE_NAME.SAM], true, "res/prefabs/SamPopupMatchResult", (err, prefab) => {
          if (null != err) {
            App_1.default.instance.alertDialog.showMsg(err);
            return;
          }
          let go = cc.instantiate(prefab);
          go.parent = parent;
          this.instance = go.getComponent(SamPopupMatchResult_1);
          this.instance.showResult(matchResult);
        }) : this.instance.showResult(matchResult);
      }
      showResult(matchResutl) {
        super.show();
        this.scrollPopupResult.content.removeAllChildren();
        matchResutl.forEach(playerResult => {
          let playerResultItem = cc.instantiate(this.prefabPlayerResult).getComponent(Sam_ItemPlayerResult_1.default);
          playerResultItem.initItem(playerResult);
          this.scrollPopupResult.content.addChild(playerResultItem.node);
        });
        this.scrollPopupResult.scrollToTop(0);
      }
    };
    SamPopupMatchResult.instance = null;
    __decorate([ property(cc.ScrollView) ], SamPopupMatchResult.prototype, "scrollPopupResult", void 0);
    __decorate([ property(cc.Prefab) ], SamPopupMatchResult.prototype, "prefabPlayerResult", void 0);
    SamPopupMatchResult = SamPopupMatchResult_1 = __decorate([ ccclass ], SamPopupMatchResult);
    exports.default = SamPopupMatchResult;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/App": void 0,
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/common/Dialog": void 0,
    "./Sam.ItemPlayerResult": "Sam.ItemPlayerResult"
  } ],
  "Sam.Room": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a285b+cxFVMModVnDL7crxr", "Sam.Room");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var SamRoom_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const SamNetworkClient_1 = require("../../Main/Game/src/networks/SamNetworkClient");
    const Sam_Cmd_1 = require("./Sam.Cmd");
    const Tween_1 = require("../../Main/Game/src/common/Tween");
    const Configs_1 = require("../../Main/Game/src/common/Configs");
    const Utils_1 = require("../../Main/Game/src/common/Utils");
    const App_1 = require("../../Main/Game/src/common/App");
    const Sam_InGame_1 = require("./Sam.InGame");
    const ItemRoom_1 = require("../../Main/Game/src/games/cardgames/ItemRoom");
    const Sam_Listener_1 = require("./Sam.Listener");
    const BroadcastReceiver_1 = require("../../Main/Game/src/common/BroadcastReceiver");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let SamRoom = SamRoom_1 = class SamRoom extends cc.Component {
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
        SamRoom_1.instance = this;
      }
      start() {
        BroadcastReceiver_1.default.send(BroadcastReceiver_1.default.SET_SOUND, cc.find("Canvas"));
        cc.director.preloadScene("Sam.InGame");
        this.updateInfoPlayer();
        this.updateCoinPlayer();
        this.sendGetListRoom();
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
            App_1.default.instance.showLoading(true, 15, Sam_Cmd_1.default.Code.JOIN_ROOM);
            SamNetworkClient_1.default.getInstance().send(new Sam_Cmd_1.default.SendJoinRoom(Configs_1.default.App.MONEY_TYPE, room.maxUserPerRoom, room.moneyBet, 0));
            null === (_a = Sam_Listener_1.default.getInstance()) || void 0 === _a ? void 0 : _a.setCurrentRoomInfo(room);
          });
          roomItem.parent = this.scrollListRoom.content;
          roomItem.y = -30;
          let time = .2 * speed * (1 === index ? .8 : 1 - Math.pow(2, -10 * index));
          roomItem.runAction(cc.sequence(cc.fadeOut(0), cc.delayTime(.15 * (this.listRoom.length - index) * speed), cc.spawn(cc.fadeIn(time), cc.moveTo(time, cc.v2(0, -30 - 85 * index)).easing(cc.easeCircleActionOut()))));
        });
        this.scrollListRoom.scrollToBottom(0);
        this.scrollListRoom.scrollToTop(2);
      }
      actBack() {
        this.isClickBack = true;
        SamNetworkClient_1.default.getInstance().close();
      }
      sendGetListRoom() {
        SamNetworkClient_1.default.getInstance().send(new Sam_Cmd_1.default.SendMoneyBetConfig());
      }
      actQuickPlay() {
        let listRoomToJoin = this.listRoom.filter(room => room.requiredMoney);
        if (listRoomToJoin.length <= 0) {
          App_1.default.instance.actiontDialog.showMsgWithAction("S\u1ed1 d\u01b0 kh\xf4ng \u0111\u1ee7.", "N\u1ea0P NGAY", () => {
            App_1.default.instance.openShop(0);
          });
          return;
        }
        let randomIdx = Utils_1.default.randomRangeInt(0, listRoomToJoin.length);
        let room = listRoomToJoin[randomIdx];
        App_1.default.instance.showLoading(true, 15, Sam_Cmd_1.default.Code.JOIN_ROOM);
        SamNetworkClient_1.default.getInstance().send(new Sam_Cmd_1.default.SendJoinRoom(Configs_1.default.App.MONEY_TYPE, room.maxUserPerRoom, room.moneyBet, 0));
      }
      actHideFullyRoom(toggleHide) {
        this.scrollListRoom.content.children.forEach(roomItem => {
          roomItem.active = !toggleHide.isChecked || roomItem.getComponent(ItemRoom_1.default).isFull();
        });
      }
      receivedJoinRoomFail(joinRoomFailData) {
        let errorMsg = "";
        switch (joinRoomFailData.error) {
         case 1:
          errorMsg = "L\u1ed7i ki\u1ec3m tra th\xf4ng tin!";
          break;

         case 2:
          errorMsg = "Kh\xf4ng t\xecm \u0111\u01b0\u1ee3c ph\xf2ng th\xedch h\u1ee3p. Vui l\xf2ng th\u1eed l\u1ea1i sau!";
          break;

         case 3:
          errorMsg = "B\u1ea1n kh\xf4ng \u0111\u1ee7 ti\u1ec1n v\xe0o ph\xf2ng ch\u01a1i n\xe0y!";
          break;

         case 4:
          errorMsg = "Kh\xf4ng t\xecm \u0111\u01b0\u1ee3c ph\xf2ng th\xedch h\u1ee3p. Vui l\xf2ng th\u1eed l\u1ea1i sau!";
          break;

         case 5:
          errorMsg = "M\u1ed7i l\u1ea7n v\xe0o ph\xf2ng ph\u1ea3i c\xe1ch nhau 10 gi\xe2y!";
          break;

         case 6:
          errorMsg = "H\u1ec7 th\u1ed1ng b\u1ea3o tr\xec!";
          break;

         case 7:
          errorMsg = "Kh\xf4ng t\xecm th\u1ea5y ph\xf2ng ch\u01a1i!";
          break;

         case 8:
          errorMsg = "M\u1eadt kh\u1ea9u ph\xf2ng ch\u01a1i kh\xf4ng \u0111\xfang!";
          break;

         case 9:
          errorMsg = "Ph\xf2ng ch\u01a1i \u0111\xe3 \u0111\u1ee7 ng\u01b0\u1eddi!";
          break;

         case 10:
          errorMsg = "B\u1ea1n b\u1ecb ch\u1ee7 ph\xf2ng kh\xf4ng cho v\xe0o b\xe0n!";
        }
        App_1.default.instance.alertDialog.showMsg(errorMsg);
      }
      receivedJoinRoomSuccess(joinRoomSuccessData) {
        App_1.default.instance.showLoading(true);
        cc.director.loadScene("Sam.InGame", (error, sceneAsset) => {
          var _a;
          App_1.default.instance.showLoading(false);
          if (error) {
            null === (_a = Sam_Listener_1.default.getInstance()) || void 0 === _a ? void 0 : _a.clearPendingCommands();
            return;
          }
          Sam_InGame_1.default.getInstance().updateRoomInfo(Sam_InGame_1.SamRoomInfoDTO.fromReceivedJoinRoomSuccess(joinRoomSuccessData));
        });
      }
      receivedUpdateGameInfo(updateGameInfoData) {
        App_1.default.instance.showLoading(true);
        cc.director.loadScene("Sam.InGame", (error, sceneAsset) => {
          var _a;
          App_1.default.instance.showLoading(false);
          if (error) {
            null === (_a = Sam_Listener_1.default.getInstance()) || void 0 === _a ? void 0 : _a.clearPendingCommands();
            return;
          }
          Sam_InGame_1.default.getInstance().updateRoomInfo(Sam_InGame_1.SamRoomInfoDTO.fromReceivedUpdateGameInfo(updateGameInfoData));
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

         case "tab5":
          this.scrollListRoom.content.children.forEach(room => {
            room.active = 5 === room.getComponent(ItemRoom_1.default).getRoomInfo().maxUserPerRoom;
          });
        }
      }
    };
    __decorate([ property(cc.ScrollView) ], SamRoom.prototype, "scrollListRoom", void 0);
    __decorate([ property(cc.Prefab) ], SamRoom.prototype, "roomItem", void 0);
    __decorate([ property(cc.Label) ], SamRoom.prototype, "lbCoin", void 0);
    __decorate([ property(cc.Label) ], SamRoom.prototype, "lbName", void 0);
    __decorate([ property(cc.Sprite) ], SamRoom.prototype, "avatar", void 0);
    SamRoom = SamRoom_1 = __decorate([ ccclass ], SamRoom);
    exports.default = SamRoom;
    cc._RF.pop();
  }, {
    "../../Main/Game/src/common/App": void 0,
    "../../Main/Game/src/common/BroadcastReceiver": void 0,
    "../../Main/Game/src/common/Configs": void 0,
    "../../Main/Game/src/common/Tween": void 0,
    "../../Main/Game/src/common/Utils": void 0,
    "../../Main/Game/src/games/cardgames/ItemRoom": void 0,
    "../../Main/Game/src/networks/SamNetworkClient": void 0,
    "./Sam.Cmd": "Sam.Cmd",
    "./Sam.InGame": "Sam.InGame",
    "./Sam.Listener": "Sam.Listener"
  } ]
}, {}, [ "Sam.Card", "Sam.CardGroup", "Sam.Cmd", "Sam.Constant", "Sam.InGame", "Sam.ItemPlayerResult", "Sam.Listener", "Sam.Player", "Sam.PopupGuide", "Sam.PopupMatchResult", "Sam.Room" ]);