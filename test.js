function doStuff(person, cat, mouse) {
    console.log('person is: ' + person);
    console.log('cat is: ' + cat);
    console.log('mouse is: ' + mouse);
}

const doStuff2 = doStuff.bind(this, 'pera peric');


doStuff2('cat 1', 'mouse 1');