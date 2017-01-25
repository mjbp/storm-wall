import should from 'should';
import Wall from '../dist/storm-wall';
import 'jsdom-global/register';

const html = `<ul class="js-wall">
            <li class="js-wall-item">
                <div role="button" tabindex="0" aria-label="Read more" class="js-wall-trigger" aria-expanded="false" aria-controls="wall-1">
                    <img src="http://placehold.it/400x400"> 
                </div>
                <div class="js-wall-child" aria-hidden="true" id="wall-1" tabindex="-1">
                    <div style="width:100%;height:250px;color:#ccc;background:red;"></div>
                </div>
            </li>
            <li class="js-wall-item">
                <div role="button" tabindex="0" class="js-wall-trigger" aria-expanded="false" aria-controls="wall-2">
                    <img src="http://placehold.it/400x400"> 
                </div>
                <div class="js-wall-child" id="wall-2" aria-hidden="true">
                    <div style="width:100%;height:250px;color:#ccc;background:green;"></div>
                </div>
            </li>
		</ul>`;

document.body.innerHTML = html;


let WallItem = Wall.init('.js-wall');


describe('Initialisation', () => {
	it('should return an object with the correct properties', () => {
		should(WallItem)
			.Array()
			.and.have.lengthOf(1);
	});

	it('should throw an error if no walls are found', () => {
		Wall.init.bind(Wall, '.js-err').should.throw();
	});

	//To do - testable assertions
	it('should attach the handleClick eventListener to DOMElement click event to toggle documentElement aria', () => {
		WallItem[0].items[0].trigger.click();
		should(WallItem[0].items[0].trigger.getAttribute('aria-expanded')).equal('true');
		
		//WallItem[0].items[1].trigger.click();
		document.querySelector(WallItem[0].settings.classNames.nextButton).click();
		//should(WallItem[0].items[0].trigger.getAttribute('aria-expanded')).equal('false');
		document.querySelector(WallItem[0].settings.classNames.previousButton).click();
		document.querySelector(WallItem[0].settings.classNames.closeButton).click();
		//should(WallItem[0].items[0].trigger.getAttribute('aria-expanded')).equal('true');
	});
});

//To do - testable assertions
describe('Keyboard interaction', () => {
	
	it('should attach keydown eventListener to each toggler', () => {

		//not a trigger
		WallItem[0].items[0].trigger.dispatchEvent(
			new window.KeyboardEvent('keydown', { 
				code : 33,
				keyCode: 33
			})
		);

		//trigger
		WallItem[0].items[0].trigger.dispatchEvent(
			new window.KeyboardEvent('keydown', { 
				code : 32,
				keyCode: 32
			})
		);
		
	});
});