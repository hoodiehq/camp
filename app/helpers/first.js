import Ember from 'ember';

export function first(params) {
  const array = params[0];
  const limit = params[1];

  if (limit === undefined) {
    return array[0];
  }

  return array.slice(0, limit);
}

export default Ember.Helper.helper(first);
