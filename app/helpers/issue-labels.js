import Ember from 'ember';
import toId from 'npm:to-id';

export function issueLabels(params) {
  const issue = params[0];

  return issue.labels.map((label) => {
    return toId(label.name);
  });
}

export default Ember.Helper.helper(issueLabels);
