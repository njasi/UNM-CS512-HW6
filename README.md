# UNM CS512 HW 6

The plan for this assignment is to make 


## Assignment Requirements
In this assignment, you are expected to create objects with texture mapping. You can create new object, new scene, or keeping use the objects you have created in your previous assignments.

1. Texture Mapping on Different Objects (6 pts)

    - [x] Implement at least 3 new geometric primitives with textures (you can use the existing brick texture or any texture you like) on them, including at least 2 curved primitives (choose from cone, sphere, torus).
        - Implemented tangents & texCoords for (bold = in scene): cone, **sphere**, **torus**, **grid (plane)**, cube, cylinder, **ngonprisms**, **bulging ngonprisms** (barrels)

2. Textures with Animations (2pts)
    - [x] At least one of the textures has animation (e.g. GIF, video) (can be one of the above three textures)
        - Skybox sphere is animated

3. Bump/Normal Mapping (4pts)
    - [x] Implement at least one additional normal mapping (you can use the existing brick texture or any texture you like, it can be one of the three objects in task 1)
        - normal maps are on the beach sphere and the stone pillars
    - [x] Implement at least one additional bump mapping (you can use the existing brick texture or any texture you like, it can be one of the three objects in task 1)
        - bump maps are applied to the wood texture and metal texture on barrels
    - NOTE: tangents are implemented for all textured primitives, and objects can all have normal or bump maps

4. Creativity and Design (+1 bonus pt)

    Outstanding effects and creativities

5. Correct submission format: (0 pt, but you will get -1 pt penalty if you fail to do it)

    Your homework must be hosted on GitHub Pages (or another hosting service) so we can run it directly. Please submit the GitHub Pages link that opens your scene right away, not the link to your GitHub repository.


## Files of interest to the grader
- Texture management: 
    - [PotatoEngine/src/materials/TexturedMaterial.js](https://github.com/njasi/UNM-CS512-PotatoEngine/blob/main/src/materials/TexturedMaterial.js)
    - [PotatoEngine/src/materials/Texture2D.js](https://github.com/njasi/UNM-CS512-PotatoEngine/blob/main/src/materials/Texture2D.js)
    - [PotatoEngine/src/Scene.js](https://github.com/njasi/UNM-CS512-PotatoEngine/blob/main/src/Scene.js#L486)
- Primitives (tangents & texCoords):
    - [PotatoEngine/src/objects/primitives.js](https://github.com/njasi/UNM-CS512-PotatoEngine/blob/main/src/objects/primitives.js)
- Shaders: 
    - [src/waterPhongTextured.vert](./src/waterPhongTextured.vert)
    - [PotatoEngine/src/shaders/vertex/phongTextured.vert](https://github.com/njasi/UNM-CS512-PotatoEngine/blob/main/src/shaders/vertex/phongTextured.vert)
    - [PotatoEngine/src/shaders/fragment/phongTextured.frag](https://github.com/njasi/UNM-CS512-PotatoEngine/blob/main/src/shaders/fragment/phongTextured.frag)

## Development

```sh
npm i
npm i ./PotatoEngine
npm run start
```

## Production Build
```sh
git checkout gh-pages
rm -rf ./dist
npm run build
```
