import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Index, MinimongoEngine } from 'meteor/easy:search'

import '../imports/startup/accounts-config.js';
import '../imports/api/entry.js';
import './main.html';

const StaffIndex = new Index({
  collection: Entries,
  fields: ['username'],
  engine: new MinimongoEngine(),
})

Template.searchBox.helpers({
  staffIndex: () => StaffIndex,
});

const StaffIndex2 = new Index({
  collection: Entries,
  fields: ['administrator'],
  engine: new MinimongoEngine(),
})

Template.searchBox2.helpers({
  staffIndex: () => StaffIndex,
});


Template.entries.events({
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Entries.update(this._id, {
      $set: { checked: ! this.checked },
    });
  },
  'click .delete'() {
    Entries.remove(this._id);
  },
});

Template.eachBlock.helpers({
  skills: function(){
     date = new Date();
    return date;
} });

Template.entries.helpers({
  entries() {
    return Entries.find({username: Meteor.user().username}, { sort: { createdAt: -1 } });
  },
});

Template.supervisor.helpers({
  isAdmin() {
    result = false;
    if (Meteor.user().username === "admin@psi.com"){
      result = true;
    }
    return result;
  },
  isSuper() {
    result2 = false;
    if (Meteor.user().username === "supervisor1" || Meteor.user().username == "supervisor2" || Meteor.user().username == "supervisor3" | Meteor.user().username === "supervisor4" || Meteor.user().username === "supervisor5" || Meteor.user().username === "supervisor6"){
      result2 = true;
  }
  return result2;
},
});

Template.supervisor.events({
  'submit .search'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const employee = target.employee.value;
    employee = " ";
}
});

Template.supervisor.helpers({
  employees() {
    return Entries.find({username: employee}, { sort: { createdAt: -1 } });
  },
});

Template.eachBlock.events({
  'submit .new-task'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const month = target.month.value;
    const week = target.week.value;
    const day = target.day.value;
    const hours = target.hours.value;
    const funding = target.funding.value;
    const leave = target.leave.value;
    const administrator = target.administrator.value;
    const activity = target.activity.value;
    const approval = "pending ...";

    // Insert an entry into the collection
    Entries.insert({
      month,
      week,
      day,
      hours,
      funding,
      activity,
      leave,
      administrator,
      approval,
      createdAt: new Date(), // current time
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });


    // Clear form
    target.month.value = '';
    target.week.value = '';
    target.day.value = '';
    target.hours.value = '';
    target.leave.value = '';
  },
});
Template.searchBox.events({
  'click .approved'() {
    // Approve Entry
    Entries.update(this._id, {
      $set: { approval: "APPROVED" },
    });
  },
  'click .decline'() {
    //Decline single entry
    Entries.update(this._id, {
      $set: { approval: "DECLINED" },
    });
  },

});
Template.searchBox2.events({
  'click .approved'() {
    // Approve Entry
    Entries.update(this._id, {
      $set: { approval: "APPROVED" },
    });
  },
  'click .decline'() {
    //Decline single entry
    Entries.update(this._id, {
      $set: { approval: "DECLINED" },
    });
  },

});
