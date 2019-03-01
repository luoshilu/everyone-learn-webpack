import child from './child'
export default function parent2() {
   console.log('parent2.js运行了1');
   console.log(child());
   console.log('Updating print.js2..')

   if (module.hot) {
    module.hot.accept('./child.js', function() {
      console.log('Accepting the updated child module!');
      child();
    })
   }
}