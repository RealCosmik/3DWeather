import * as THREE from "three";
import {Cache as grassModel} from "three";

export class Grass{

    grassModel;

    moveGrass(speed){

        grassMaterial.uniforms.time.value += speed;
    }
    static async CreateGrass() {

        const newGrass = new Grass();
        newGrass.grassModel = new THREE.Group();

        var grassVertexSource = sharedPrefix + `
precision mediump float;
attribute vec3 position;
attribute vec3 normal;
attribute vec3 offset;
attribute vec2 uv;
attribute vec2 halfRootAngle;
attribute float scale;
attribute float index;
uniform float time;

uniform float delta;
uniform float posX;
uniform float posZ;
uniform float radius;
uniform float width;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;
varying float frc;
varying float idx;

const float PI = 3.1415;
const float TWO_PI = 2.0 * PI;


//https://www.geeks3d.com/20141201/how-to-rotate-a-vertex-by-a-quaternion-in-glsl/
vec3 rotateVectorByQuaternion(vec3 v, vec4 q){
  return 2.0 * cross(q.xyz, v * q.w + cross(q.xyz, v)) + v;
}

float placeOnSphere(vec3 v){
  float theta = acos(v.z/radius);
  float phi = acos(v.x/(radius * sin(theta)));
  float sV = radius * sin(theta) * sin(phi);
  //If undefined, set to default value
  if(sV != sV){
    sV = v.y;
  }
  return sV;
}

void main() {

	//Vertex height in blade geometry
	frc = position.y / float(` + bladeHeight + `);
    //Scale vertices
  vec3 vPosition = position;
	vPosition.y *= scale;

	//Invert scaling for normals
	vNormal = normal;
	vNormal.y /= scale;

	//Rotate blade around Y axis
  vec4 direction = vec4(0.0, halfRootAngle.x, 0.0, halfRootAngle.y);
	vPosition = rotateVectorByQuaternion(vPosition, direction);
	vNormal = rotateVectorByQuaternion(vNormal, direction);

  //UV for texture
  vUv = uv;

	vec3 pos;
	vec3 globalPos;
	vec3 tile;

	globalPos.x = offset.x-posX*delta;
	globalPos.z = offset.z-posZ*delta;

	tile.x = floor((globalPos.x + 0.5 * width) / width);
	tile.z = floor((globalPos.z + 0.5 * width) / width);

	pos.x = globalPos.x - tile.x * width;
	pos.z = globalPos.z - tile.z * width;

	pos.y = max(0.0, placeOnSphere(pos)) - radius;
	pos.y += getYPosition(vec2(pos.x+delta*posX, pos.z+delta*posZ));
	
	//Position of the blade in the visible patch [0->1]
  vec2 fractionalPos = 0.5 + offset.xz / width;
  //To make it seamless, make it a multiple of 2*PI
  fractionalPos *= TWO_PI;

  //Wind is sine waves in time. 
  float noise = sin(fractionalPos.x + time);
  float halfAngle = noise * 0.1;
  noise = 0.5 + 0.5 * cos(fractionalPos.y + 0.25 * time);
  halfAngle -= noise * 0.2;

	direction = normalize(vec4(sin(halfAngle), 0.0, -sin(halfAngle), cos(halfAngle)));

	//Rotate blade and normals according to the wind
  vPosition = rotateVectorByQuaternion(vPosition, direction);
	vNormal = rotateVectorByQuaternion(vNormal, direction);

	//Move vertex to global location
	vPosition += pos;

	//Index of instance for varying colour in fragment shader
	idx = index;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(vPosition, 1.0);

}`;
        var grassFragmentSource = `
precision mediump float;

uniform vec3 cameraPosition;

//Light uniforms
uniform float ambientStrength;
uniform float diffuseStrength;
uniform float specularStrength;
uniform float translucencyStrength;
uniform float shininess;
uniform vec3 lightColour;
uniform vec3 sunDirection;


//Surface uniforms
uniform sampler2D map;
uniform sampler2D alphaMap;
uniform vec3 specularColour;

varying float frc;
varying float idx;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

vec3 ACESFilm(vec3 x){
	float a = 2.51;
	float b = 0.03;
	float c = 2.43;
	float d = 0.59;
	float e = 0.14;
	return clamp((x*(a*x+b))/(x*(c*x+d)+e), 0.0, 1.0);
}

void main() {

  //If transparent, don't draw
  if(texture2D(alphaMap, vUv).r < 0.15){
    discard;
  }

	vec3 normal;

	//Flip normals when viewing reverse of the blade
	if(gl_FrontFacing){
		normal = normalize(vNormal);
	}else{
		normal = normalize(-vNormal);
	}

  //Get colour data from texture
	vec3 textureColour = pow(texture2D(map, vUv).rgb, vec3(2.2));

  //Add different green tones towards root
	vec3 mixColour = idx > 0.75 ? vec3(0.07, 0.52, 0.06) : vec3(0.07, 0.43, 0.08);
  textureColour = mix(pow(mixColour, vec3(2.2)), textureColour, frc);

	vec3 lightTimesTexture = lightColour * textureColour;
  vec3 ambient = textureColour;
	vec3 lightDir = normalize(sunDirection);

  //How much a fragment faces the light
	float dotNormalLight = dot(normal, lightDir);
  float diff = max(dotNormalLight, 0.0);

  //Colour when lit by light
  vec3 diffuse = diff * lightTimesTexture;

  float sky = max(dot(normal, vec3(0,1,0)), 0.0);
	vec3 skyLight = sky * vec3(0.12, 0.29, 0.55);

  vec3 viewDirection = normalize(cameraPosition - vPosition);
  vec3 halfwayDir = normalize(lightDir + viewDirection);
  //How much a fragment directly reflects the light to the camera
  float spec = pow(max(dot(normal, halfwayDir), 0.0), shininess);
  
  //Colour of light sharply reflected into the camera
  vec3 specular = spec * specularColour * lightColour;

	//https://en.wikibooks.org/wiki/GLSL_Programming/Unity/Translucent_Surfaces
	vec3 diffuseTranslucency = vec3(0);
	vec3 forwardTranslucency = vec3(0);
	float dotViewLight = dot(-lightDir, viewDirection);
	if(dotNormalLight <= 0.0){
		diffuseTranslucency = lightTimesTexture * translucencyStrength * -dotNormalLight;
		if(dotViewLight > 0.0){
			forwardTranslucency = lightTimesTexture * translucencyStrength * pow(dotViewLight, 16.0);
		}
	}

  vec3 col = 0.3 * skyLight * textureColour + ambientStrength * ambient + diffuseStrength * diffuse + specularStrength * specular + diffuseTranslucency + forwardTranslucency;

  //Tonemapping
  col = ACESFilm(col);

  //Gamma correction 1.0/2.2 = 0.4545...
	col = pow(col, vec3(0.4545));

	//Add a shadow towards root
	col = mix(vec3(0.0, 0.2, 0.0), col, frc);

  gl_FragColor = vec4(col, 1.0);
}`;
        //Define base geometry that will be instanced. We use a plane for an individual blade of grass
        const grassBaseGeometry = new THREE.PlaneBufferGeometry(bladeWidth, bladeHeight, 1, joints);
        grassBaseGeometry.translate(0, bladeHeight/2, 0);

//Define the bend of the grass blade as the combination of three quaternion rotations
        let vertex = new THREE.Vector3();
        let quaternion0 = new THREE.Quaternion();
        let quaternion1 = new THREE.Quaternion();
        let x, y, z, w, angle, sinAngle, rotationAxis;

//Rotate around Y
        angle = 0.05;
        sinAngle = Math.sin(angle / 2.0);
        rotationAxis = new THREE.Vector3(0, 1, 0);
        x = rotationAxis.x * sinAngle;
        y = rotationAxis.y * sinAngle;
        z = rotationAxis.z * sinAngle;
        w = Math.cos(angle / 2.0);
        quaternion0.set(x, y, z, w);

//Rotate around X
        angle = 0.3;
        sinAngle = Math.sin(angle / 2.0);
        rotationAxis.set(1, 0, 0);
        x = rotationAxis.x * sinAngle;
        y = rotationAxis.y * sinAngle;
        z = rotationAxis.z * sinAngle;
        w = Math.cos(angle / 2.0);
        quaternion1.set(x, y, z, w);

//Combine rotations to a single quaternion
        quaternion0.multiply(quaternion1);

//Rotate around Z
        angle = 0.1;
        sinAngle = Math.sin(angle / 2.0);
        rotationAxis.set(0, 0, 1);
        x = rotationAxis.x * sinAngle;
        y = rotationAxis.y * sinAngle;
        z = rotationAxis.z * sinAngle;
        w = Math.cos(angle / 2.0);
        quaternion1.set(x, y, z, w);

//Combine rotations to a single quaternion
        quaternion0.multiply(quaternion1);

        let quaternion2 = new THREE.Quaternion();

//Bend grass base geometry for more organic look
        for(let v = 0; v < grassBaseGeometry.attributes.position.array.length; v += 3){
            quaternion2.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2);
            vertex.x = grassBaseGeometry.attributes.position.array[v];
            vertex.y = grassBaseGeometry.attributes.position.array[v+1];
            vertex.z = grassBaseGeometry.attributes.position.array[v+2];
            let frac = vertex.y/bladeHeight;
            quaternion2.slerp(quaternion0, frac);
            vertex.applyQuaternion(quaternion2);
            grassBaseGeometry.attributes.position.array[v] = vertex.x;
            grassBaseGeometry.attributes.position.array[v+1] = vertex.y;
            grassBaseGeometry.attributes.position.array[v+2] = vertex.z;
        }

        grassBaseGeometry.computeVertexNormals();
        var baseMaterial = new THREE.MeshNormalMaterial({side: THREE.DoubleSide});
        var baseBlade = new THREE.Mesh(grassBaseGeometry, baseMaterial);
//Show grass base geometry
//scene.add(baseBlade);

        var instancedGeometry = new THREE.InstancedBufferGeometry();

        instancedGeometry.index = grassBaseGeometry.index;
        instancedGeometry.attributes.position = grassBaseGeometry.attributes.position;
        instancedGeometry.attributes.uv = grassBaseGeometry.attributes.uv;
        instancedGeometry.attributes.normal = grassBaseGeometry.attributes.normal;

// Each instance has its own data for position, orientation and scale
        var indices = [];
        var offsets = [];
        var scales = [];
        var halfRootAngles = [];

//For each instance of the grass blade
        for (let i = 0; i < instances; i++){

            indices.push(i/instances);

            //Offset of the roots
            x = Math.random() * canvas.width - canvas.width/2;
            z = Math.random() * canvas.width - canvas.width/2;
            y = 0;
            offsets.push(x, y, z);

            //Random orientation
            let angle = Math.PI - Math.random() * (2 * Math.PI);
            halfRootAngles.push(Math.sin(0.5*angle), Math.cos(0.5*angle));

            //Define variety in height
            if(i % 3 !== 0){
                scales.push(2.0+Math.random() * 1.25);
            }else{
                scales.push(2.0+Math.random());
            }
        }

        var offsetAttribute = new THREE.InstancedBufferAttribute(new Float32Array(offsets), 3);
        var scaleAttribute = new THREE.InstancedBufferAttribute(new Float32Array(scales), 1);
        var halfRootAngleAttribute = new THREE.InstancedBufferAttribute(new Float32Array(halfRootAngles), 2);
        var indexAttribute = new THREE.InstancedBufferAttribute(new Float32Array(indices), 1);

        instancedGeometry.setAttribute( 'offset', offsetAttribute);
        instancedGeometry.setAttribute( 'scale', scaleAttribute);
        instancedGeometry.setAttribute( 'halfRootAngle', halfRootAngleAttribute);
        instancedGeometry.setAttribute( 'index', indexAttribute);

//Define the material, specifying attributes, uniforms, shaders etc.
        const grassMaterial = new THREE.RawShaderMaterial( {
            uniforms: {
                time: {type: 'float', value: 0},
                delta: {type: 'float', value: delta },
                posX: {type: 'float', value: pos.x },
                posZ: {type: 'float', value: pos.y },
                radius: {type: 'float', value: radius },
                width: {type: 'float', value: canvas.width },
                map: { value: grassTexture},
                alphaMap: { value: alphaMap},
                noiseTexture: { value: noiseTexture},
                ambientStrength: {type: 'float', value: ambientStrength},
                translucencyStrength: {type: 'float', value: translucencyStrength},
                diffuseStrength: {type: 'float', value: diffuseStrength},
                specularStrength: {type: 'float', value: specularStrength},
                shininess: {type: 'float', value: shininess},
                lightColour: {type: 'vec3', value: sunColour},
                specularColour: {type: 'vec3', value: specularColour},
            },
            vertexShader: grassVertexSource,
            fragmentShader: grassFragmentSource,
            side: THREE.DoubleSide
        } );

        const grass = new THREE.Mesh(instancedGeometry, grassMaterial);
        grass.position.y = 0.5;
        grass.scale.set(.06, .06, .06);

        grassModel.add(grass);

        return newGrass;
    }
}