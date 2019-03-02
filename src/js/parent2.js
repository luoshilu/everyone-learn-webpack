import child from './child'
export default function parent2() {
  console.log('parent2 start ===>')
  console.log('parent2.js运行了：' + child());
  console.log('parent2 end ===>')
}