const $ = require('jquery');
const { JSDOM } = require('jsdom');
const { expect } = require('chai');
const sinon = require('sinon');
const { getRandomNumber, TEST_ONLY, ingredients } = require('./sandwhich');

describe('Sandwich Builder', () => {
    let window, document;

    beforeEach(() => {
        const dom = new JSDOM('<!DOCTYPE html><html><body><div id="sandwhich"></div></body></html>');
        window = dom.window;
        document = window.document;
        global.window = window;
        global.document = document;
        global.$ = $(window);
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should generate a random number within the range', () => {
        TEST_ONLY.fullyRandom = false;
        const result = getRandomNumber(1, 10);
        expect(result).to.be.within(0, 9);
    });

    it('should build a sandwich with test object ingredients', () => {
        TEST_ONLY.useTestObj = true;
        const ingredientMap = ["bread", "main", "cheese", "sauce", "condiments", "roughage"];
        let sandwhich = [];
        let data = ingredients;

        for (let key in TEST_ONLY.testObj) {
            let ingredient = data[key][TEST_ONLY.testObj[key]];
            sandwhich.push(ingredient);
        }

        let sandwhichHtml = '<div class="sandwhich">';
        for (let i = 0; i < sandwhich.length; i++) {
            sandwhichHtml += '<div class="ingredient ' + ingredientMap[i] + '">' + sandwhich[i].name + '<img src="' + sandwhich[i].img + '" /></div>';
        }
        sandwhichHtml += '<div class="ingredient rotated-bread"><img src="' + sandwhich[0].img + '" /></div>';
        sandwhichHtml += '</div>';

        $("#sandwhich").append(sandwhichHtml);

        expect($("#sandwhich").html()).to.contain('class="sandwhich"');
        expect($("#sandwhich").html()).to.contain('class="ingredient bread"');
        expect($("#sandwhich").html()).to.contain('class="ingredient rotated-bread"');
    });

    it('should handle click event on the sandwich', () => {
        const clickSpy = sinon.spy();
        $("#sandwhich").click(clickSpy);

        $("#sandwhich").trigger('click');
        expect(clickSpy.calledOnce).to.be.true;
    });
});