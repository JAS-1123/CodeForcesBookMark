# CodeForcesBookMark

This is a Chrome extension that lets you save Codeforces problems into named bookmark folders, directly from the problem page, and view or manage them on your profile page.

# Features
* Add bookmark button on problem pages
  * A text input lets you choose a folder name (e.g. "DP", "Greedy", "Revision").
  * A button saves the current problem into Chrome local storage under that folder.
  * Prevents duplicate bookmarks.
* Bookmark list on profile pages
  * Automatically creates a "My Bookmarks" section under your profile.
  * Displays bookmarks grouped by folder name.
  * Shows problem code (e.g. 1234/A) with a direct link.

# How It Works

* When you open a problem page (codeforces.com/problemset/problem/...), an "ADD TO BOOKMARK" button appears in the top menu.
* Enter a folder name (or leave empty to use a default name).
* Click ADD TO BOOKMARK to save the link.
* When you open your profile page (codeforces.com/profile/...),
* The bookmarks are shown in the profile page.
* Lists problems grouped by folder/bookmarks.
* Lets you delete any bookmark. If a folder becomes empty, it disappears automatically.

# Installation

* Clone or download this repository.
* Go to chrome://extensions in your Chrome browser.
* Enable Developer mode (top-right toggle).
* Click Load unpacked.
* Select the folder containing these files.
