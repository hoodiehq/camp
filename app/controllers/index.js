import Ember from 'ember';

export default Ember.Controller.extend({
  github: Ember.inject.service('github'),
  actions: {
    reloadIssues() {
      this.get('github').getCampIssues({reload: true})

      .then((issues) => {
        this.set('model', issues);
      });
    }
  }
});
