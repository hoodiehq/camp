import Ember from 'ember';
import GitHub from 'npm:github-api';

export default Ember.Service.extend({
  init() {
    this._super(...arguments);
    this.reset(localStorage.getItem('token') || undefined);
  },

  reset (token) {
    this.set('token', token);
    this.set('username', localStorage.getItem('username') || undefined);
    this.set('avatar', localStorage.getItem('avatar') || undefined);

    let github = new GitHub({
      token: token,
    });

    // for debug only
    window.github = github;

    return github;
  },

  signIn (token) {
    return this.reset(token).getUser().getProfile()

    .then((response) => {
      const profile = response.data;

      this.set('username', profile.login);
      this.set('avatar', profile.avatar_url);
    });
  },

  signOut () {
    localStorage.clear();
    this.reset();
    return Ember.RSVP.resolve();
  },

  set (key, value) {
    this._super(...arguments);
    if (value) {
      localStorage.setItem(key, value);
    } else {
      localStorage.removeItem(key);
    }
  },
});
