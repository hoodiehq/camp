import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return {
      name: params.name
    };
  }
});
