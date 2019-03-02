import _ from 'lodash';
import show from './js/show.js';
import parent1 from './js/parent1.js';
import './css/main.css'

import data from './data/data.xml'


function component() {
  var element = document.createElement('div');
  var btn = document.createElement('button');
  element.innerHTML = _.join(['Hello3', 'webpack'], ' ');
  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = parent1;
  element.appendChild(btn);
  console.log(data);
  return element;
}

// document.body.appendChild(component());
let element = component(); // 当 parent1.js 改变导致页面重新渲染时，重新获取渲染的元素
document.body.appendChild(element);

// parent1();
show('webpack1')

if (module.hot) {
  module.hot.accept('./js/parent1.js', function() {
    console.log('Accepting the updated parent1 module!');
    // parent1();
    document.body.removeChild(element);
    element = component(); // 重新渲染页面后，component 更新 click 事件处理
    document.body.appendChild(element);
  })

  // module.hot.accept('./js/show.js', function() {
  //   console.log('Accepting the updated show module!');
  //   show('webpack1')
  // })
}