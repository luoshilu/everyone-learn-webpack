import _ from 'lodash';
import parent2 from './parent2.js';
import show from './show.js';
import parent1 from './parent1.js';
import './css/main.css'

function component() {
  var element = document.createElement('div');
  var btn = document.createElement('button');
  element.innerHTML = _.join(['Hello3', 'webpack'], ' ');
  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = parent1;
  element.appendChild(btn);
  return element;
}

document.body.appendChild(component());

parent2();
// parent1();
// show('webpack1')

if (module.hot) {
  module.hot.accept('./parent1.js', function() {
    console.log('Accepting the updated parent1 module!');
    // parent1();
    document.body.removeChild(element);
    element = component(); // 重新渲染页面后，component 更新 click 事件处理
    document.body.appendChild(element);
  })

  // module.hot.accept('./show.js', function() {
  //   console.log('Accepting the updated show module!');
  //   show('webpack1')
  // })
}