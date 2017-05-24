https://goo.gl/ROzWKC

# The Task
Build a prototype that shows a potentially very long list of messages.
Users should be able to swipe a message horizontally offscreen to dismiss it.
Messages should load automatically so that a user scrolling slowly should never see the bottom of the list.
The prototype should work well even after many messages have been loaded.

# Design Process and Implementation
Given a mockup, my first goal was to implement a prototype with a User Experince that is identical to the one described.
For the prototype implementation I chose to use React.js, with the Google Material UI guidlines, implemented with the react-material-ui framework.

[screen shot]

# Experience
As the app loads. There is a dotted loading animation (implemented with CSS). The animation is for signaling to the user that something is happening behind the scenes.

The app initially loads 20 messages. Each message is stored with an additional field marking whether it should be shown or not.
As the user scrolls through the messages, when reaching a specific height, more messages are loaded, creating an infinite scrolling experience.

Swiping a message to the right side will make the card transperant, showing that this message is going to be erased. If the message is swiped far enough. It is animated to leave the screen and then disapear. If the swipe os too short
(below a threshold) the message would return to it's origin location and opacity, giving the user the opportunity to regret.

I also added a scroll to the top button as a feature. The button would only appear after the user has scrolled below a specific height. Clicking the button shows an animation of a scroll to the top of the page.


Since when you have infinite scrolling it might be hard to go back to the things you like, I added a bookmatking option.
Swiping left stars and un-stars a message.
Clicking on the star in the header will toggle showing all massages or showing just the starred messages

Only swiping right deletes a message.




