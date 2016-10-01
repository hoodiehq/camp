import Ember from 'ember';
import fetch from 'fetch';
import GitHub from 'npm:github-api';

const campWikiRawPageBaseUrl = 'https://raw.githubusercontent.com/wiki/hoodiehq/camp';
const campWikiBaseUrl = 'https://github.com/hoodiehq/camp/wiki';

export default Ember.Service.extend({
  init() {
    this._super(...arguments);
    this.reset(JSON.parse(localStorage.getItem('token')) || undefined);
  },

  setAndCache (key, value) {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.removeItem(key);
    }
    this.set(key, value);
  },

  reset (token) {
    this.setAndCache('token', token);
    this.setAndCache('username', JSON.parse(localStorage.getItem('username')) || undefined);
    this.setAndCache('avatar', JSON.parse(localStorage.getItem('avatar')) || undefined);
    this.setAndCache('campIssues', JSON.parse(localStorage.getItem('campIssues')) || undefined);

    let github = new GitHub({
      token: token,
    });

    this.set('api', github);

    // for debug only
    window.github = github;

    return github;
  },

  signIn (token) {
    return this.reset(token).getUser().getProfile()

    .then((response) => {
      const profile = response.data;

      this.setAndCache('username', profile.login);
      this.setAndCache('avatar', profile.avatar_url);
    });
  },

  signOut () {
    localStorage.clear();
    this.reset();
    return Ember.RSVP.resolve();
  },

  getCampIssues (options = {}) {
    var campIssues = this.get('campIssues');
    return (campIssues && !options.reload? Ember.RSVP.resolve(campIssues) : this.fetchCamIssues())

    .then((issues) => {
      this.setAndCache('campIssues', issues);

      issues = issues.map(function (issue) {
        issue.url = 'https://github.com/hoodiehq/camp/issues/' + issue.number;
        return issue;
      });

      if (options.labels) {
        return issuesWithLabels(issues, options.labels);
      }

      let issuesMap = {
        upForGrabs: issuesWithLabels(issues, ['up for grabs']),
        yourFirstPR: issuesWithLabels(issues, ['up for grabs', 'Your First PR']),
        firstTimersOnly: issuesWithLabels(issues, ['up for grabs', 'first-timers-only']),
        code: issuesWithLabels(issues, ['Code', 'up for grabs']),
        design: issuesWithLabels(issues, ['Design', 'up for grabs']),
        documentation: issuesWithLabels(issues, ['Documentation', 'up for grabs']),
        editorial: issuesWithLabels(issues, ['Editorial', 'up for grabs'])
      };

      return issuesMap;
    });
  },

  getCampWikiPage (name) {
    const wikiPageName = name.replace(/\s/g, '-');
    return fetch(`${campWikiRawPageBaseUrl}/${wikiPageName}.md`, {
      mode: 'no-cors'
    })

    .then(function( response) {
      return response.text();
    })

    .then(function (content) {
      return {
        title: name,
        url: `${campWikiBaseUrl}/${wikiPageName}`,
        content: content
      };
    });
  },

  fetchCamIssues () {
    return this.get('api').getIssues('hoodiehq', 'camp').listIssues()

    .then((response) => {
      // filter out data we don’t need to save storage
      return response.data.map(pickRelevantIssueProperties);
    });
  }
});

function pickRelevantIssueProperties (issue) {
  const {assignee, comments, created_at, labels, milestone, number, title, updated_at, user} = issue;
  return {assignee, comments, created_at, labels, milestone, number, title, updated_at, user};
}

function issuesWithLabels (issues, labelNames) {
  if (!Array.isArray(labelNames)) {
    labelNames = [labelNames];
  }
  return issues.filter(issueHasLabels.bind(null, labelNames)).map(removeLabels.bind(null, ['up for grabs'].concat(labelNames)));
}

function issueHasLabels (labelNames, issue) {
  return issue.labels.filter(function (label) {
    return labelNames.includes(label.name);
  }).length === labelNames.length;
}

function removeLabels (labelNames, issue) {
  const labels = issue.labels.filter(function (label) {
    return !labelNames.includes(label.name);
  });

  if (labels.length !== issue.labels.length) {
    issue = Ember.copy(issue);
    issue.labels = labels;
  }

  return issue;
}
