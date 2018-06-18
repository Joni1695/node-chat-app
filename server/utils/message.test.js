var expect = require('expect');
var {generateMessage,generateLocation} = require('./message');

describe('generateMessage',() => {
  it('Should generate correct message object.',() => {
    var from = 'Jenm';
    var text = 'Some Message';
    var message = generateMessage(from,text);

    expect(typeof message.createdAt).toBe('number');
    expect(message).toInclude({from,text});
  });
});

describe('generateLocation',()=>{
  it('Generate correct location message.',() =>{
    var from = 'User';
    var lat = 1;
    var lng = 1;

    var message = generateLocation(from,lat,lng);

    expect(typeof message.createdAt).toBe('number');
    expect(typeof message.url).toBe('string');
    expect(typeof message.from).toBe('string');
  });
});
