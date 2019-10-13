# Whoosh - the game

You are a GTA style car cruising through the ghetto, until you find a squeaking guinea pig in the side of the road. What is it doing here, but more importantly. Why does it think it's allowed on MY ROAD?! Among others, your goal will be to find this guinea pig and git rid of it for all. Make the road yours again! Ow and you also might find other drivers along the road, who also think they are allowed here. I don't think I need to mention what to do with them...

### Roadmap
1) First we will implement cruising through the ghetto. Just some core gameplay stuff:
- Adding visuals to the car
- Design a map that you drive through
- Visuals for road
- Visuals for top of buildings (that you crash in to)
- Adding collision points in the ghetto, so that you can actually crash
- Adding crash mechanics (something like 3 hits and you're kaboom!)
- some minor improvements on the driving mechanics
- When driving faster, you should zoom out, just like the old GTA games did
- Add whacky sounds
- getting it live (somewhere on S3 probably)

2) Next we will add some other stuff to hit or kill along the way. Mainly stuff to keep you engaged
- walking AI supported things on the sidewalk that you can use to paint your tires a new color
- driving cars on the road that you can bump into
- walking mechanics
- Weapons. Like duuhh
- Zombie mode
- Multi player option (log in with your person)
- cheats
- garage to drive a total loss car into, but you might end up with a useless bicycile


Coding notes:
- tiles of 200px / 200px
- each tile is either road or building
- collision when drive into building tile
- not too seriously tweaked mechanics
- kill it with fire