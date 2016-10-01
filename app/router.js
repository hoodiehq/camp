import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('teams', { path: 'teams/:name' });
  this.route('help', { path: 'help/:name' });
});

export default Router;
