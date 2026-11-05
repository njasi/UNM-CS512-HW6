# UNM CS512 HW 6

The plan for this assignment is to make 


## Assignment Requirements
In this assignment, you are expected to create objects with texture mapping. You can create new object, new scene, or keeping use the objects you have created in your previous assignments.

1. Texture Mapping on Different Objects (6 pts)

    - [x] Implement at least 3 new geometric primitives with textures (you can use the existing brick texture or any texture you like) on them, including at least 2 curved primitives (choose from **cone**, **sphere**, **torus**).
        - Implemented tangents & texCoords for: cone, sphere, torus, grid (plane)
        - TODO: cylinder, ngonprisms

2. Textures with Animations (2pts)
    - [] At least one of the textures has animation (e.g. GIF, video) (can be one of the above three textures)
        - This is implemented, but I'm not sure where to put it in my HW6 scene.

3. Bump/Normal Mapping (4pts)
    - [] Implement at least one additional normal mapping (you can use the existing brick texture or any texture you like, it can be one of the three objects in task 1)
    - [] Implement at least one additional bump mapping (you can use the existing brick texture or any texture you like, it can be one of the three objects in task 1)
    
    These are both implemented for all textured primitives, but i need to place them into the scene.

4. Creativity and Design (+1 bonus pt)

    Outstanding effects and creativities

5. Correct submission format: (0 pt, but you will get -1 pt penalty if you fail to do it)

    Your homework must be hosted on GitHub Pages (or another hosting service) so we can run it directly. Please submit the GitHub Pages link that opens your scene right away, not the link to your GitHub repository.


## Development

```sh
npm i
npm i ./PotatoEngine
npm run start
```
