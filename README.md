# THIS IS WORK IN PROGRESS :)

# Welcome to Hoodie Camp!

The Hoodie Camp is a space we created to welcome new and existing contributors.
We work together on code, design, documentation and editorial, with the common
goal to empower as many people as possible to express themselves with technology.

All teams create special starter issues for people who want to contribute to
Hoodie for the first time, and especially welcome people who never contributed
to an Open Source Project before. We try to have issues for both beginners as
well as challenges for more experienced contributors.

> You don't build a community. You build a space.  
> – [@saronyitbarek](https://twitter.com/kwugirl/status/728370365957689344)

![Hoodie Camp](https://hoodiehq.github.io/camp/images/camp.png)

## Hoodie Camp site

_this is work in progress_

This is based on the discussion at [hoodiehq/editorial#61](https://github.com/hoodiehq/editorial/issues/61#update-april-12)

We want to create a website for new and existing contributors with three main
sections:

- Contribute  
  Show open issues to new contributors, returning contributors,
  pull requests that need reviews, issues that are work in progress but have
  no update since over a week, etc.
- Roadmap & News  
  Show our overall master plan (Camp / Village / City) release, what parts we
  currently work on, and show a log of what happened lately.
- Help  
  Documentation for contributors and maintainers, e.g. how to start a pull
  request, how to rebase / squash commits, how to create a new
  contributor-friendly issues, what are starter issues, etc etc etc

The idea is to have a static website which loads data directly trough the
GitHub API, similar to [Ubersicht](http://espy.github.io/ubersicht/#hoodiehq)
for issues and [Milestones](http://gr2m.github.io/milestones/) for the roadmap.

The Contribute page would have more of a dashboard character. For example, the visitor
can switch between a "Your First PR" mode showing issues prepared for new
contributors or showing non-YFPR issues, or showing issues with a "simple"
label for people that are beginners or don’t have much time or with a label
"challenge" for harder issues. The visitor can also switch between seeing all
issues or only from one of the teams (code, design, documentation, editorial).

The visitor can switch to a "maintainer" mode, which would show all issues that
people are working on, highlighting the ones that have no recent updates and
the ones that are ready for a review (`LGTM`).

The goal is not to move all issues from the project to the camp repository, only
the ones prepared for first-time contributors and the ones that are well prepared.

The roadmap section will show something like (or exactly like) [Milestones](http://gr2m.github.io/milestones/).
These are based on high-level issues that usually consist of bullet items that
reference other issues (from camp repository or one of the others).

The Help section can load content directly from the repository’s wiki. Or not.
What ever makes sense :)
