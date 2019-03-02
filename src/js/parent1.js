import child from './child'

export default function parent1() {
  console.log('parent1 start ======>')
  console.log('parent1 get child：'+ child())
  console.log('parent1 end======>')
}