import Ember from 'ember';

export default Ember.Controller.extend({
  showLogin: false,
  username: undefined,
  github: Ember.inject.service('github'),
  account: Ember.computed('github', function () {
    const github = this.get('github');
    return {
      username: github.username,
      avatar: github.avatar
    };
  }),
  actions: {
    toggleLogin() {
      this.set('showLogin', !this.get('showLogin'));
    },
    signOut() {
      this.get('github').signOut()

      .then( () => {
        this.notifyPropertyChange('github');
      });
    },
    signIn(token) {
      this.get('github').signIn(token)

      .then( () => {
        this.send('toggleLogin');
        this.notifyPropertyChange('github');
      });
    }
  }
});
