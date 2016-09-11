import Ember from 'ember';

export default Ember.Route.extend({
  github: Ember.inject.service('github'),
  model() {
    return this.get('github').getCampIssues();
  }
});
