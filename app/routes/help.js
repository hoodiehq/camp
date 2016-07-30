import Ember from 'ember';

export default Ember.Route.extend({
  github: Ember.inject.service('github'),
  model(params) {
    return this.get('github').getCampWikiPage(params.name)

    .then(function (page) {
      if (page.content.trim() === '404: Not Found') {
        page.content = `
## This page does not yet exist

You can create it at [${page.url}](${page.url})`;
      }

      return page;
    });
  }
});
