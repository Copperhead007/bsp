# bsp
This is a Binary Space Partition Program to generate a Tile Map
It uses Random generation based off a known map size and mathematics for the placement of rooms within a currently 0 & 1 valued map.
This is used in many procedural generation games, visuzalization, and animation among many more. This algorithm helped Roguelike games rise in popularity for the procedural generation can provide infinite game play when paired with the right game engine.

This is a 2D BSP using a map with a size that is set at the beginning of the program. Then the spatial splitting can be found at K_Times.
Feel free to mess with this but be careful of creating too many iteration in a map where it cant fit. I currently have setup a normalization process to remove rooms that don't have a dungeon feel to them. So too many iterations may end with infinite processing. 

I will get around to fixing that shortly. Currenly my paths algorithm is a little wonky. My rooms are connected but at many points. This is currently a work in progress and this seemingly simple engine has been wildly deceptive. 

I have added and removed the padding to the edges. I can easily fix this by running a for loop that changes merely the edges to zeros but that does not reflect the changes in my rooms. When I export this to a tile map it wont be a big deal but for right now I would like to keep my rooms accurate to the information they contain.