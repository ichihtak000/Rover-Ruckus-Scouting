# Rover-Ruckus-Scouting
This repository is created for developing scouting website.
Takumi Ichihashi, member of FTC 6559 Geared Reaction, started this project in order to create efficient and effective scouting system.
This website can be sued to record match data, and display the performance of each team played in the competition.
This project is intended for FTC 2018-2019 Rover-Ruckus game.

## index.html / scorer.html
Record the performance of each team during a match.
Markup : 1. Type team number of each team
         2. Click on the buttons to record the scores
         3. Click on submit button after each match
         4. Click on Clear button or reload the page to prepare for next matches

## match.html
Display match scores
Markup : * Click on table cell to edit score in table

Update - display all match scores that are submitted in index.html file.
SaveChanges - save the changes made in table.
ClearStorage - erase all the data stored as localStorage

## analysis.html
Display the performance of each team
Each column of table is sortable by highest number to lowest number and vice versa.
