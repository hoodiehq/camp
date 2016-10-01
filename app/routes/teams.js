import Ember from 'ember';

export default Ember.Route.extend({
  github: Ember.inject.service('github'),
  model(params) {
    const teamLabel = {
      code: 'Code',
      design: 'Design',
      documentation: 'Documentation',
      editorial: 'Editorial'
    }[params.name];

    return this.get('github').getCampIssues({
      labels: [teamLabel, 'up for grabs']
    })

    .then(function (issues) {
      return {
        name: params.name,
        yourFirstPRIssues: hasLabel(issues, 'Your First PR'),
        notYourFirstPRIssues: hasntLabel(issues, 'Your First PR')
      };
    });
  },
  renderTemplate(controller, model) {
    this.render(`teams/${model.name}`, {model});
  }
});

function hasLabel(issues, label) {
  return issues.filter((issue) => {
    return issue.labels.filter((issueLabel) => {
      return issueLabel.name === label;
    }).length === 1;
  });
}

function hasntLabel(issues, label) {
  return issues.filter((issue) => {
    return issue.labels.filter((issueLabel) => {
      return issueLabel.name === label;
    }).length === 0;
  });
}
