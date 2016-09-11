import Ember from 'ember';

export function issueColor(params) {
  const issue = params[0];
  var firstTimersOnlyLabel = getLabel(issue, 'first-timers-only');
  var yourFirstPrLabel = getLabel(issue, 'Your First PR');

  if (firstTimersOnlyLabel) {
    return firstTimersOnlyLabel.color;
  }

  if (yourFirstPrLabel) {
    return yourFirstPrLabel.color;
  }

  return '#ccc';
}

function getLabel (issue, labelName) {
  for (var i = 0; i < issue.labels.length; i++) {
    if (issue.labels[i].name === labelName) {
      return;
    }
  }
}

export default Ember.Helper.helper(issueColor);
