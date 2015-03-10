frontend-nanodegree-arcade-game
===============================

This is a Frogger clone that I'm working on for my Udacity course. Use arrow keys to move the player icon around, avoid enemy bugs and make it to the water to score. Reach 10 points to win!

There are several items on my to-do list for this game:

1. player select screen
    to do this, the reset() function would need to be used. draw a background, then draw the 5 characters, simplest way would be to label them with numbers. would need to 
    add additional keybind handling, which would then initiate a Player object with the correct .sprite value. Load sprite image in this step rather than in init...?
2. Collect gems, use special abilities
    Gems would need to be a special Gem object to handle placing, collecting, rendering. But different abilities... 
    - teleport gem
    - double point gem
    - shield gem
    - ghost gem
3. Lives instead of negative points
    simple enough. Random stars would give extra lives potentially?
4. impassible objects
    rocks - place in a central lane so you don't have to worry about the bugs moving past them
5. Two-player Battle-mode!
    really no idea how this would work, probably less bugs and some kind of attack...

Students should use this rubric: https://www.udacity.com/course/viewer#!/c-ud015/l-3072058665/m-3072588797

for self-checking their submission.
