import Ember from 'ember';

export function copyright() {
  var year = new Date().getFullYear();
  return `© 2012-${year}`;
}

export default Ember.Helper.helper(copyright);
